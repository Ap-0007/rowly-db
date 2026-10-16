#!/usr/bin/env node
// Arma el latest.json de una release (el que lee Ajustes > Actualizaciones)
// una sola vez, con los instaladores que dejaron los builds de cada sistema
// (.github/workflows/release-build.yml). Antes cada build lo leia, mezclaba y
// volvia a subir, y por eso corrian de a uno.
//
//   node tools/release/manifest.mjs <dir> --tag v0.4.2 --repo owner/name --notes "..." [--out latest.json]
//
// Falla si a una plataforma le falta su archivo o su firma, si hay dos
// candidatos para la misma, o si una firma no es una firma de minisign.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Las entradas de la release v0.4.2 (tauri-action) mas la de pacman: la app
// instalada elige la suya por esta clave.
export const PLATFORMS = [
  ["darwin-aarch64", /_aarch64\.app\.tar\.gz$/],
  ["darwin-aarch64-app", /_aarch64\.app\.tar\.gz$/],
  ["darwin-x86_64", /_x64\.app\.tar\.gz$/],
  ["darwin-x86_64-app", /_x64\.app\.tar\.gz$/],
  ["linux-x86_64", /_amd64\.AppImage$/],
  ["linux-x86_64-appimage", /_amd64\.AppImage$/],
  ["linux-x86_64-deb", /_amd64\.deb$/],
  ["linux-x86_64-rpm", /\.x86_64\.rpm$/],
  ["windows-x86_64", /_x64_en-US\.msi$/],
  ["windows-x86_64-msi", /_x64_en-US\.msi$/],
  ["windows-x86_64-nsis", /_x64-setup\.exe$/],
  ["linux-x86_64-pacman", /_x86_64\.pkg\.tar\.zst$/],
];

// Una firma de `tauri signer` es el .minisig en base64.
function signatureProblem(text) {
  try {
    const decoded = Buffer.from(text, "base64").toString("utf8");
    return /^untrusted comment: .*\n[A-Za-z0-9+/=]+\ntrusted comment: /.test(decoded) ? null : "no es una firma de minisign";
  } catch {
    return "no es base64";
  }
}

export function manifest({ files, read, tag, repo, notes, pubDate = new Date().toISOString() }) {
  const problems = [];
  const platforms = {};
  for (const [key, pattern] of PLATFORMS) {
    const found = files.filter((name) => pattern.test(name));
    if (found.length !== 1) {
      problems.push(`${key}: ${found.length ? `varios candidatos (${found.join(", ")})` : "sin archivo"}`);
      continue;
    }
    const [name] = found;
    if (!files.includes(`${name}.sig`)) {
      problems.push(`${key}: ${name} sin firma`);
      continue;
    }
    const signature = read(`${name}.sig`).trim();
    const bad = signatureProblem(signature);
    if (bad) problems.push(`${key}: ${name}.sig ${bad}`);
    platforms[key] = { signature, url: `https://github.com/${repo}/releases/download/${tag}/${name}` };
  }
  return { problems, latest: { version: tag.replace(/^v/, ""), notes, pub_date: pubDate, platforms } };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const option = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const dir = args[0];
  const [tag, repo, notes] = [option("--tag"), option("--repo"), option("--notes")];
  if (!dir || !tag || !repo || notes === undefined) throw new Error("uso: manifest.mjs <dir> --tag vX.Y.Z --repo owner/name --notes <texto> [--out latest.json]");
  const { problems, latest } = manifest({ files: readdirSync(dir), read: (name) => readFileSync(join(dir, name), "utf8"), tag, repo, notes });
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  writeFileSync(option("--out") ?? "latest.json", JSON.stringify(latest, null, 2) + "\n");
  console.log(`latest.json: ${Object.keys(latest.platforms).length} plataformas para ${tag}`);
}
