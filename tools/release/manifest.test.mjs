// El latest.json que arma la release (manifest.mjs): las mismas entradas que
// publico v0.4.2 mas pacman, cada una con su firma.
import assert from "node:assert/strict";
import { test } from "node:test";
import { manifest, PLATFORMS } from "./manifest.mjs";

const SIG = Buffer.from("untrusted comment: signature from tauri secret key\nRUQ=\ntrusted comment: timestamp:1\tfile:x\nAA==\n").toString("base64");
const FILES = [
  "Rowly.DB_aarch64.app.tar.gz",
  "Rowly.DB_x64.app.tar.gz",
  "Rowly.DB_0.5.0_aarch64.dmg",
  "Rowly.DB_0.5.0_x64.dmg",
  "Rowly.DB_0.5.0_amd64.AppImage",
  "Rowly.DB_0.5.0_amd64.deb",
  "Rowly.DB-0.5.0-1.x86_64.rpm",
  "Rowly.DB_0.5.0_x64_en-US.msi",
  "Rowly.DB_0.5.0_x64-setup.exe",
  "rowly-db_0.5.0_x86_64.pkg.tar.zst",
];
const withSigs = (files) => [...files, ...files.filter((name) => !name.endsWith(".dmg")).map((name) => `${name}.sig`)];
const build = (files, read = () => SIG) => manifest({ files, read, tag: "v0.5.0", repo: "o/r", notes: "Commit x.", pubDate: "2026-01-01T00:00:00Z" });

test("todas las plataformas de v0.4.2 y pacman, con su firma y su URL", () => {
  const { problems, latest } = build(withSigs(FILES));
  assert.deepEqual(problems, []);
  assert.equal(latest.version, "0.5.0");
  assert.deepEqual(Object.keys(latest.platforms), PLATFORMS.map(([key]) => key));
  assert.equal(latest.platforms["linux-x86_64-pacman"].url, "https://github.com/o/r/releases/download/v0.5.0/rowly-db_0.5.0_x86_64.pkg.tar.zst");
  assert.equal(latest.platforms["darwin-aarch64"].url, latest.platforms["darwin-aarch64-app"].url);
  assert.equal(latest.platforms["windows-x86_64-nsis"].signature, SIG);
});

test("un build que falto, una firma ausente o rota, o dos candidatos: no hay latest.json", () => {
  const files = withSigs(FILES.filter((name) => !name.endsWith(".msi"))).filter((name) => name !== "Rowly.DB_0.5.0_amd64.deb.sig");
  files.push("Otro_amd64.AppImage", "Otro_amd64.AppImage.sig");
  const { problems } = build(files, (name) => (name.startsWith("rowly-db") ? "basura" : SIG));
  assert.deepEqual(problems, [
    "linux-x86_64: varios candidatos (Rowly.DB_0.5.0_amd64.AppImage, Otro_amd64.AppImage)",
    "linux-x86_64-appimage: varios candidatos (Rowly.DB_0.5.0_amd64.AppImage, Otro_amd64.AppImage)",
    "linux-x86_64-deb: Rowly.DB_0.5.0_amd64.deb sin firma",
    "windows-x86_64: sin archivo",
    "windows-x86_64-msi: sin archivo",
    "linux-x86_64-pacman: rowly-db_0.5.0_x86_64.pkg.tar.zst.sig no es una firma de minisign",
  ]);
});

test("las claves son las de la release v0.4.2 publicada, mas pacman", () => {
  const published = [
    "darwin-aarch64", "darwin-aarch64-app", "darwin-x86_64", "darwin-x86_64-app", "linux-x86_64", "linux-x86_64-appimage",
    "linux-x86_64-deb", "linux-x86_64-rpm", "windows-x86_64", "windows-x86_64-msi", "windows-x86_64-nsis", "linux-x86_64-pacman",
  ];
  assert.deepEqual(PLATFORMS.map(([key]) => key).sort(), published.sort());
});
