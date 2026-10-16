#!/usr/bin/env python3
"""Comprueba la web generada antes de fusionar (la publicación es pages.yml).

Genera site/ con render-site.py dos veces, con una versión fija: en un dominio
propio (https://example.org/) y en la subruta del proyecto en GitHub Pages
(la de por defecto). En cada salida falla si:

- quedan marcadores sin valor ({{clave}} o [[clave]]);
- un enlace o recurso local (href, src, srcset, url() de CSS, meta og:image)
  no existe en la salida, o un #ancla de una página local no existe en ella;
- la configuración de Giscus está incompleta o mal formada;
- sitemap.xml no es XML válido, o alguna de sus URLs no está bajo la URL del
  sitio o no corresponde a una página generada; robots.txt no apunta a él.

Los enlaces a otros dominios (GitHub, releases) no se siguen.

Uso: python3 .github/scripts/check-site.py
"""

import html.parser
import json
import os
import pathlib
import re
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from urllib.parse import unquote, urljoin, urlparse

ROOT = pathlib.Path(__file__).resolve().parents[2]
RENDER = ROOT / ".github/scripts/render-site.py"
VERSION = "v0.0.0-ci"
TARGETS = [
    ("dominio propio", "https://example.org/"),
    ("subruta de GitHub Pages", "https://anderson-andres-dev.github.io/rowly-db/"),
]
TOKEN = re.compile(r"\{\{\s*[\w.]+\s*\}\}|\[\[[\w.]+\]\]")
CSS_URL = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")


class Page(html.parser.HTMLParser):
    """Las referencias (atributo, valor) y los id de una página."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str]] = []
        self.ids: set[str] = set()
        self.meta: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {name: value or "" for name, value in attrs}
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "a" and "name" in values:
            self.ids.add(values["name"])
        for name in ("href", "src"):
            if name in values:
                self.refs.append((f"{tag}[{name}]", values[name]))
        if "srcset" in values:
            for candidate in values["srcset"].split(","):
                if candidate.strip():
                    self.refs.append((f"{tag}[srcset]", candidate.strip().split()[0]))
        if tag == "meta" and values.get("property", values.get("name", "")) in ("og:image", "twitter:image", "og:url"):
            self.meta.append((values.get("property") or values.get("name"), values.get("content", "")))
        if "style" in values:
            for ref in CSS_URL.findall(values["style"]):
                self.refs.append((f"{tag}[style]", ref))


def local_file(out: pathlib.Path, site: str, page_url: str, ref: str) -> tuple[pathlib.Path | None, str]:
    """El archivo de la salida al que apunta `ref` desde `page_url`, o None si es externo."""
    if ref.startswith(("mailto:", "tel:", "data:", "javascript:")):
        return None, ""
    absolute = urljoin(page_url, ref)
    target, base = urlparse(absolute), urlparse(site)
    if target.netloc != base.netloc or not target.path.startswith(base.path):
        return None, ""
    rel = unquote(target.path[len(base.path):])
    path = out / rel
    if rel == "" or rel.endswith("/"):
        path = path / "index.html"
    elif path.is_dir():
        path = path / "index.html"
    return path, target.fragment


def page_url_of(out: pathlib.Path, site: str, path: pathlib.Path) -> str:
    rel = path.relative_to(out).as_posix()
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return site + rel


def check_output(out: pathlib.Path, site: str) -> list[str]:
    problems = []
    pages: dict[pathlib.Path, Page] = {}
    for path in sorted(out.rglob("*")):
        if path.is_file() and path.suffix in (".html", ".xml", ".txt", ".css", ".js"):
            text = path.read_text(encoding="utf-8")
            rel = path.relative_to(out).as_posix()
            for token in sorted(set(TOKEN.findall(text))):
                problems.append(f"{rel}: marcador sin valor {token}")
            if path.suffix == ".html":
                page = Page()
                page.feed(text)
                pages[path] = page

    def resolve(source: pathlib.Path, base_url: str, kind: str, ref: str) -> None:
        if not ref or ref.startswith("#") and source not in pages:
            return
        target, fragment = local_file(out, site, base_url, ref)
        if target is None:
            return
        rel = source.relative_to(out).as_posix()
        if not target.is_file():
            problems.append(f"{rel}: {kind} {ref} no existe en la salida")
        elif fragment and target in pages and fragment not in pages[target].ids:
            problems.append(f"{rel}: {kind} {ref}: la página no tiene #{fragment}")

    for path, page in pages.items():
        url = page_url_of(out, site, path)
        for kind, ref in page.refs:
            resolve(path, url, kind, ref)
        for name, content in page.meta:
            resolve(path, url, f"meta[{name}]", content)

    for css in out.rglob("*.css"):
        base = site + css.parent.relative_to(out).as_posix() + "/"
        for ref in CSS_URL.findall(css.read_text(encoding="utf-8")):
            resolve(css, base, "url()", ref)

    sitemap = out / "sitemap.xml"
    try:
        tree = ET.parse(sitemap)
    except (ET.ParseError, FileNotFoundError) as error:
        problems.append(f"sitemap.xml: {error}")
    else:
        locs = [loc.text or "" for loc in tree.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
        alternates = [link.get("href", "") for link in tree.iter("{http://www.w3.org/1999/xhtml}link")]
        if not locs:
            problems.append("sitemap.xml: sin URLs")
        for loc in locs + alternates:
            if not loc.startswith(site):
                problems.append(f"sitemap.xml: {loc} no está bajo {site}")
                continue
            target, _ = local_file(out, site, site, loc)
            if target is None or not target.is_file():
                problems.append(f"sitemap.xml: {loc} no es una página generada")
        if len(set(locs)) != len(locs):
            problems.append("sitemap.xml: URLs repetidas")
    robots = (out / "robots.txt").read_text(encoding="utf-8") if (out / "robots.txt").exists() else ""
    if f"Sitemap: {site}sitemap.xml" not in robots:
        problems.append("robots.txt: no apunta al sitemap del sitio")
    return problems


def check_giscus() -> list[str]:
    config = json.loads((ROOT / "site/_community/community.json").read_text(encoding="utf-8"))
    giscus = config.get("giscus", {})
    problems = []
    rules = {
        "repo": r"[\w.-]+/[\w.-]+",
        "repoId": r"R_[\w-]+",
        "category": r".+",
        "categoryId": r"DIC_[\w-]+",
        "categoryUrl": r"https://github\.com/[\w.-]+/[\w.-]+/discussions/categories/[\w-]+",
    }
    for key, pattern in rules.items():
        if not re.fullmatch(pattern, str(giscus.get(key, ""))):
            problems.append(f"community.json: giscus.{key} falta o no tiene la forma esperada ({giscus.get(key)!r})")
    repo = giscus.get("repo", "")
    if repo and not str(giscus.get("categoryUrl", "")).startswith(f"https://github.com/{repo}/"):
        problems.append("community.json: giscus.categoryUrl no es del repositorio de giscus.repo")
    return problems


def main() -> int:
    problems = check_giscus()
    with tempfile.TemporaryDirectory() as tmp:
        for name, site in TARGETS:
            out = pathlib.Path(tmp) / re.sub(r"\W+", "-", name)
            env = {**os.environ, "VERSION": VERSION, "SITE_URL": site}
            run = subprocess.run([sys.executable, str(RENDER), str(out)], env=env, capture_output=True, text=True)
            if run.returncode != 0:
                problems.append(f"{name}: render-site.py falló: {(run.stderr or run.stdout).strip()}")
                continue
            found = check_output(out, site)
            problems += [f"{name}: {problem}" for problem in found]
            print(f"{name} ({site}): {sum(1 for _ in out.rglob('*.html'))} páginas, {len(found)} problemas")
    if problems:
        print("\n".join(problems), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
