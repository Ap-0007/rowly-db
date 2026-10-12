#!/usr/bin/env python3
"""Copia site/ a una carpeta de salida y rellena {{version}}, {{site}}, {{base}},
{{date}} y {{engines}}; además genera las páginas de comunidad.

La versión y la URL se escriben en un solo lugar: aquí. En GitHub Actions,
VERSION es el tag de la última release publicada y SITE_URL es la variable
del repositorio (sin ella, la dirección de GitHub Pages). Con un dominio
propio también se escribe CNAME.

{{engines}} son las filas de la tabla de motores verificados, tomadas del
bloque que tools/inventory/status.mjs genera en README.md: la web y el README
no pueden decir cosas distintas.

Las carpetas que empiezan por "_" no se publican. site/_community tiene las
plantillas de comunidad (layout, hub y área) y community.json, con los textos
de cada idioma y la configuración de Giscus. Dentro de las plantillas,
[[clave]] se rellena desde ese JSON (con puntos para entrar en objetos).

Uso local:  SITE_URL=https://localhost/ python3 .github/scripts/render-site.py _site
            python3 -m http.server -d _site
"""

import datetime
import html
import json
import os
import pathlib
import re
import shutil
import sys
from urllib.parse import urlparse

ROOT = pathlib.Path(__file__).resolve().parents[2]
SOURCE = ROOT / "site"
TEXT = {".html", ".xml", ".txt"}
DEFAULT_SITE = "https://anderson-andres-dev.github.io/rowly-db/"


def app_version() -> str:
    conf = json.loads((ROOT / "app/src-tauri/tauri.conf.json").read_text(encoding="utf-8"))
    return conf["version"]


def engine_rows(lines_label: str) -> str:
    """Filas <tr> de la tabla de motores, desde el bloque generado del README."""
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    block = re.search(r"<!-- generated: engines.*?-->\n(.*?)<!-- /generated: engines -->", readme, re.S)
    if not block:
        sys.exit("README.md: falta el bloque <!-- generated: engines -->")
    rows = []
    for line in block.group(1).splitlines()[2:]:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) < 3:
            continue
        engine, verified, lines = cells[0], cells[1], cells[-1]
        rows.append(
            f'                <tr><td class="engine">{html.escape(engine)}</td>'
            f'<td class="mono">{html.escape(verified)}</td>'
            f'<td class="lines mono" data-label="{lines_label}">{html.escape(lines)}</td></tr>'
        )
    if not rows:
        sys.exit("README.md: el bloque de motores no tiene filas")
    return "\n".join(rows)


# --- Comunidad ----------------------------------------------------------------


# Claves que ya son HTML armado aquí; el resto se escapa al rellenar.
RAW = {"content", "channels", "areaRows", "tabs", "warning", "commentsBlock"}


def fill(template: str, data: dict, where: str) -> str:
    def value(match: re.Match) -> str:
        current = data
        for part in match.group(1).split("."):
            if not isinstance(current, dict) or part not in current:
                sys.exit(f"{where}: falta [[{match.group(1)}]] en community.json")
            current = current[part]
        return str(current) if match.group(1) in RAW else html.escape(str(current), quote=True)

    return re.sub(r"\[\[([\w.]+)\]\]", value, template)


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def comments_block(giscus: dict, lang: dict) -> str:
    """El contenedor de Giscus: main.js carga el script con estos data-*. Sin
    IDs, o sin JavaScript, queda el enlace a GitHub."""
    fallback = (
        '<div class="comments-fallback">'
        f"<p>{esc(lang['fallback'])}</p>"
        f'<a class="btn btn-line" href="{esc(giscus["categoryUrl"])}"><svg aria-hidden="true"><use href="#i-github"/></svg>{esc(lang["fallbackLink"])}</a>'
        "</div>"
    )
    if not (giscus.get("repoId") and giscus.get("categoryId")):
        return f'        <div class="comments">{fallback}</div>'
    attrs = {
        "repo": giscus["repo"],
        "repo-id": giscus["repoId"],
        "category": giscus["category"],
        "category-id": giscus["categoryId"],
        "lang": lang["lang"],
        "theme-light": "{{site}}assets/giscus/light.css",
        "theme-dark": "{{site}}assets/giscus/dark.css",
    }
    data = " ".join(f'data-{name}="{esc(value)}"' for name, value in attrs.items())
    return f'        <div class="comments" {data}>{fallback}</div>'


def render_community(out: pathlib.Path) -> list[str]:
    """Genera hub y áreas por idioma. Devuelve las rutas para el sitemap."""
    source = SOURCE / "_community"
    config = json.loads((source / "community.json").read_text(encoding="utf-8"))
    layout = (source / "layout.html").read_text(encoding="utf-8")
    hub = (source / "hub.html").read_text(encoding="utf-8")
    area = (source / "area.html").read_text(encoding="utf-8")
    langs = config["languages"]
    paths = []

    # La misma área en el otro idioma, por id.
    def area_path(code: str, area_id: str) -> str:
        lang = langs[code]
        slug = next(a["slug"] for a in lang["areas"] if a["id"] == area_id)
        return f"{lang['path']}{slug}/"

    for code, lang in langs.items():
        other = next(c for c in langs if c != code)
        base = {
            **lang,
            "giscus": config["giscus"],
            "otherLang": other,
            "otherPath": langs[other]["path"],
        }
        channels = "\n".join(
            '          <div class="lit">'
            f"<h2>{esc(c['title'])}</h2><p>{esc(c['text'])}</p>"
            + (f'<p><a href="{esc(c["url"])}">{esc(c["link"])}</a></p>' if c.get("url") else "")
            + "</div>"
            for c in lang["channels"]
        )
        rows = "\n".join(
            f'          <li class="lit"><a href="{{{{base}}}}{lang["path"]}{a["slug"]}/">'
            f"<h3>{esc(a['title'])}</h3><p>{esc(a['text'])}</p>"
            f'<span class="go">{esc(lang["open"])}<svg aria-hidden="true"><use href="#i-arrow"/></svg></span></a></li>'
            for a in lang["areas"]
        )
        page = {
            **base,
            "channels": channels,
            "areaRows": rows,
            "pageTitle": lang["title"],
            "pageDescription": lang["description"],
            "pagePath": lang["path"],
            "pathEn": langs["en"]["path"],
            "pathEs": langs["es"]["path"],
        }
        page["content"] = fill(hub, page, f"{code} hub")
        write_page(out / lang["path"], fill(layout, page, f"{code} hub"))
        paths.append(lang["path"])

        for item in lang["areas"]:
            tabs = "\n".join(
                f'        <a class="area-tab" href="{{{{base}}}}{lang["path"]}{a["slug"]}/"'
                + (' aria-current="page"' if a["id"] == item["id"] else "")
                + f">{esc(a['title'])}</a>"
                for a in lang["areas"]
            )
            warning = (
                f'        <p class="note-line"><svg aria-hidden="true"><use href="#i-alert"/></svg>{esc(lang["warn"])}</p>'
                if item["id"] == "problems"
                else ""
            )
            path = f"{lang['path']}{item['slug']}/"
            page = {
                **base,
                "otherPath": area_path(other, item["id"]),
                "tabs": tabs,
                "warning": warning,
                "commentsBlock": comments_block(config["giscus"], lang),
                "areaTitle": item["title"],
                "areaText": item["text"],
                "areaOwn": item["own"],
                "areaOwnUrl": item["ownUrl"],
                "pageTitle": item["title"],
                "pageDescription": item["text"],
                "pagePath": path,
                "pathEn": area_path("en", item["id"]),
                "pathEs": area_path("es", item["id"]),
            }
            page["content"] = fill(area, page, f"{code} {item['id']}")
            write_page(out / path, fill(layout, page, f"{code} {item['id']}"))
            paths.append(path)
    return paths


def write_page(folder: pathlib.Path, text: str) -> None:
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "index.html").write_text(text, encoding="utf-8")


def sitemap_entries(paths: list[str]) -> str:
    """Pares EN/ES en el orden en que render_community los genera."""
    half = len(paths) // 2
    entries = []
    for en, es in zip(paths[:half], paths[half:]):
        for loc in (en, es):
            entries.append(
                "  <url>\n"
                f"    <loc>{{{{site}}}}{loc}</loc>\n"
                "    <lastmod>{{date}}</lastmod>\n"
                f'    <xhtml:link rel="alternate" hreflang="en" href="{{{{site}}}}{en}"/>\n'
                f'    <xhtml:link rel="alternate" hreflang="es" href="{{{{site}}}}{es}"/>\n'
                "  </url>"
            )
    return "\n".join(entries)


def main() -> None:
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    version = (os.environ.get("VERSION") or app_version()).removeprefix("v")
    site = os.environ.get("SITE_URL") or DEFAULT_SITE
    if not site.endswith("/"):
        site += "/"
    url = urlparse(site)
    if url.scheme != "https" or not url.netloc:
        sys.exit(f"SITE_URL tiene que ser una URL https completa: {site}")
    values = {
        "version": version,
        "site": site,
        "base": url.path or "/",
        "date": datetime.date.today().isoformat(),
    }

    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(SOURCE, out, ignore=shutil.ignore_patterns("_*"))

    community = render_community(out)
    sitemap = out / "sitemap.xml"
    sitemap.write_text(
        sitemap.read_text(encoding="utf-8").replace("{{community}}", sitemap_entries(community)),
        encoding="utf-8",
    )

    for path in out.rglob("*"):
        if path.suffix not in TEXT:
            continue
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(out).as_posix()
        page_values = {**values}
        if "{{engines}}" in text:
            page_values["engines"] = engine_rows("Líneas" if rel.startswith("es/") else "Lines")
        for key, value in page_values.items():
            text = text.replace("{{" + key + "}}", value)
        left = re.findall(r"\{\{\w+\}\}|\[\[[\w.]+\]\]", text)
        if left:
            sys.exit(f"{rel}: quedan marcadores sin valor {sorted(set(left))}")
        path.write_text(text, encoding="utf-8")

    if not url.netloc.endswith(".github.io"):
        (out / "CNAME").write_text(url.netloc + "\n", encoding="utf-8")

    print(f"Sitio en {out} · versión {version} · {site} · {len(community)} páginas de comunidad")


if __name__ == "__main__":
    main()
