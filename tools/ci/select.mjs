#!/usr/bin/env node
// Planner de CI: decide que checks corren segun los archivos que cambian.
//
//   node tools/ci/select.mjs --github               en Actions (lee el evento)
//   node tools/ci/select.mjs --files a,b,c          local, con una lista
//   node tools/ci/select.mjs --diff <base> [<head>] local, con un rango de git
//   node tools/ci/select.mjs --full "<motivo>"      todo
//
// Las reglas viven en tools/ci/areas.json (area -> rutas -> checks). Un
// archivo suma los checks de cada area que lo cubre. Una ruta de `fullOn` o
// un archivo que ningun area cubre selecciona todo, y el resumen lo dice.
// Los paquetes de Rust salen de `cargo metadata`: el paquete de cada archivo
// cambiado y los que dependen de el (cualquier tipo de dependencia).
// Ante la duda (sin historia, base invalida, manifiesto de un paquete), todo.

import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

// --- Rutas --------------------------------------------------------------------

// `**` cruza directorios; `*` y `?` no.
export function globToRegExp(glob) {
  let source = "";
  for (let i = 0; i < glob.length; i += 1) {
    const char = glob[i];
    if (char === "*" && glob[i + 1] === "*") {
      i += 1;
      if (glob[i + 1] === "/") {
        i += 1;
        source += "(?:.*/)?";
      } else source += ".*";
    } else if (char === "*") source += "[^/]*";
    else if (char === "?") source += "[^/]";
    else source += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${source}$`);
}

const matcher = (globs = []) => {
  const patterns = globs.map(globToRegExp);
  return (path) => patterns.some((pattern) => pattern.test(path));
};

export const areaMatches = (area) => {
  const included = matcher(area.paths);
  const excluded = matcher(area.exclude);
  return (path) => included(path) && !excluded(path);
};

// --- Paquetes de Rust ---------------------------------------------------------

// Los miembros del workspace con su directorio y sus dependencias de ruta
// (normales, de build, de dev y de plataforma: todas cuentan).
export function workspacePackages(metadata, root = ROOT) {
  const members = new Set(metadata.workspace_members);
  const packages = metadata.packages.filter((pkg) => members.has(pkg.id));
  const names = new Set(packages.map((pkg) => pkg.name));
  return packages.map((pkg) => ({
    name: pkg.name,
    dir: relative(root, join(pkg.manifest_path, "..")).replaceAll("\\", "/"),
    deps: [...new Set(pkg.dependencies.filter((dep) => dep.path && names.has(dep.name)).map((dep) => dep.name))],
  }));
}

function cargoMetadata() {
  const out = execFileSync("cargo", ["metadata", "--no-deps", "--format-version", "1", "--locked"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return workspacePackages(JSON.parse(out));
}

// El paquete que contiene `path` (el directorio mas largo que lo contiene).
const owner = (packages, path) =>
  packages
    .filter((pkg) => path.startsWith(`${pkg.dir}/`))
    .sort((a, b) => b.dir.length - a.dir.length)[0];

// Los paquetes dados y todos los que dependen de ellos.
export function reverseClosure(packages, changed) {
  const selected = new Set(changed);
  let grew = true;
  while (grew) {
    grew = false;
    for (const pkg of packages) {
      if (!selected.has(pkg.name) && pkg.deps.some((dep) => selected.has(dep))) {
        selected.add(pkg.name);
        grew = true;
      }
    }
  }
  return [...selected].sort();
}

// --- Plan ---------------------------------------------------------------------

const CHECKS = ["node", "rust", "terminal", "e2e", "resources", "sql", "site", "release"];

// files: [{ path, status }] (status de git: A, M, D, R...; los renombres
// llegan como dos entradas, la ruta vieja y la nueva).
export function plan({ files, config, packages, engines, full = null, branch = null, event = null }) {
  const reasons = Object.fromEntries(CHECKS.map((check) => [check, new Set()]));
  const fullReasons = full ? [full] : [];
  const unmatched = [];
  const rustChanged = new Set();
  let rustAll = false;
  let resources = new Set();
  let sql = new Set();
  const vitestTests = new Set();
  let vitestFull = false;
  const vitestFiles = new Set();
  const flags = { node: false, terminal: false, e2e: false, site: false, release: false };

  const fullOn = matcher(config.fullOn);
  const vitestFullOn = matcher(config.vitest?.fullOn);
  const areas = config.areas.map((area) => ({ ...area, matches: areaMatches(area) }));

  for (const { path } of files) {
    if (fullOn(path)) fullReasons.push(`${path} (fullOn)`);
    if (vitestFullOn(path)) vitestFull = true;
    const hits = areas.filter((area) => area.matches(path));
    if (hits.length === 0 && !fullOn(path)) {
      unmatched.push(path);
      fullReasons.push(`${path} (ningun area lo cubre)`);
    }

    // Rust: el paquete del archivo, por su directorio.
    const pkg = owner(packages, path);
    if (pkg) {
      if (path === `${pkg.dir}/Cargo.toml`) {
        rustAll = true;
        reasons.rust.add(`${path} (manifiesto: features inciertas)`);
      } else {
        rustChanged.add(pkg.name);
        reasons.rust.add(pkg.name);
      }
    } else if (/^crates\//.test(path) && /\.(rs|toml)$/.test(path)) {
      // Bajo crates/ pero en ningun paquete: uno borrado o renombrado.
      rustAll = true;
      reasons.rust.add(`${path} (paquete que ya no existe)`);
    }
    if (path.startsWith("app/") && /\.(ts|svelte|js)$/.test(path) && !path.startsWith("app/tests/")) vitestFiles.add(path.slice(4));

    for (const area of hits) {
      const checks = area.checks ?? {};
      for (const flag of Object.keys(flags)) {
        if (checks[flag]) {
          flags[flag] = true;
          reasons[flag].add(area.id);
        }
      }
      if (checks.rust === "*") {
        rustAll = true;
        reasons.rust.add(area.id);
      } else if (Array.isArray(checks.rust)) {
        for (const name of checks.rust) rustChanged.add(name);
        reasons.rust.add(`${area.id}: ${checks.rust.join(", ")}`);
      }
      if (checks.resources) {
        const ids = checks.resources === "*" ? config.resources : checks.resources;
        ids.forEach((id) => resources.add(id));
        reasons.resources.add(area.id);
      }
      if (checks.sql) {
        const selected = checks.sql === "*" ? engines : checks.sql;
        selected.forEach((engine) => sql.add(engine));
        reasons.sql.add(area.id);
      }
      if (checks.vitest) checks.vitest.forEach((test) => vitestTests.add(test));
    }
  }

  // La rama de release (main) se compila como release antes de etiquetarla.
  if (event === "push" && branch === "main" && (flags.e2e || fullReasons.length)) {
    flags.release = true;
    reasons.release.add("push a main con cambios de la app");
  }

  const isFull = fullReasons.length > 0;
  if (isFull) {
    for (const flag of ["node", "terminal", "e2e", "site"]) flags[flag] = true;
    rustAll = true;
    resources = new Set(config.resources);
    sql = new Set(engines);
    for (const check of CHECKS) if (check !== "release") reasons[check].add("completo");
  }

  // Los tests de la terminal en macOS y Windows son de khipu-desktop.
  if (flags.terminal) rustChanged.add("khipu-desktop");
  const known = new Set(packages.map((pkg) => pkg.name));
  const rustPackages = rustAll ? "*" : reverseClosure(packages, [...rustChanged].filter((name) => known.has(name)));
  const rust = rustAll || rustPackages.length > 0;
  const resourceList = config.resources.filter((id) => resources.has(id));
  const sqlList = engines.filter((engine) => sql.has(engine));

  // Vitest en sombra (#119): lo que correria una seleccion por archivos
  // relacionados. npm test sigue completo mientras `selection` no sea `active`.
  const vitest = isFull || vitestFull
    ? { mode: "full", files: [], tests: [] }
    : { mode: "related", files: [...vitestFiles].sort(), tests: [...new Set([...(config.vitest?.always ?? []), ...vitestTests])].sort() };
  vitest.selection = config.vitest?.selection ?? "shadow";

  return {
    full: isFull,
    fullReasons,
    unmatched,
    node: flags.node || vitestTests.size > 0,
    rust,
    rustPackages,
    terminal: flags.terminal,
    e2e: flags.e2e,
    resources: resourceList,
    sql: sqlList,
    site: flags.site,
    release: flags.release,
    build: flags.e2e || resourceList.length > 0,
    vitest,
    reasons: Object.fromEntries(Object.entries(reasons).map(([check, set]) => [check, [...set].sort()])),
    files: files.length,
  };
}

// --- Cambios ------------------------------------------------------------------

const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();

const commitExists = (sha) => {
  if (!sha || /^0+$/.test(sha)) return false;
  try {
    git("cat-file", "-e", `${sha}^{commit}`);
    return true;
  } catch {
    return false;
  }
};

// `git diff --name-status -M`: los renombres dan las dos rutas.
export function parseNameStatus(text) {
  return text
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const [status, ...paths] = line.split("\t");
      return paths.map((path) => ({ path, status: status[0] }));
    });
}

const diff = (base, head) => parseNameStatus(git("diff", "--name-status", "-M", base, head));

// El rango segun el evento de GitHub, o el motivo para correr todo.
function githubRange() {
  const event = process.env.GITHUB_EVENT_NAME;
  const payload = process.env.GITHUB_EVENT_PATH ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
  if (event === "workflow_dispatch") {
    // nightly.yml lo pide asi cada noche sobre develop.
    if (String(payload.inputs?.full) === "true") return { full: "corrida completa pedida (full: nocturna o a mano)" };
    try {
      return { base: git("merge-base", "origin/develop", "HEAD"), head: "HEAD" };
    } catch {
      return { full: "sin merge-base con origin/develop" };
    }
  }
  if (event === "pull_request") {
    // El checkout es el merge del PR: su primer padre es la base actual.
    const parents = git("rev-list", "--parents", "-n", "1", "HEAD").split(" ");
    if (parents.length !== 3) return { full: "el checkout del PR no es un merge" };
    return { base: parents[1], head: "HEAD" };
  }
  if (event === "push") {
    if (payload.created || !commitExists(payload.before)) return { full: "push sin un commit anterior conocido" };
    return { base: payload.before, head: "HEAD" };
  }
  return { full: `evento ${event ?? "desconocido"}` };
}

// --- Salida -------------------------------------------------------------------

export function summary(result) {
  const yes = (on) => (on ? "si" : "no");
  const rows = [
    ["Node (check, test, build)", yes(result.node), result.reasons.node],
    ["Rust", result.rust ? (result.rustPackages === "*" ? "workspace" : result.rustPackages.join(", ")) : "no", result.reasons.rust],
    ["Terminal (macOS, Windows)", yes(result.terminal), result.reasons.terminal],
    ["E2E", yes(result.e2e), result.reasons.e2e],
    ["Recursos", result.resources.length ? result.resources.join(", ") : "no", result.reasons.resources],
    ["SQL", result.sql.length ? result.sql.join(", ") : "no", result.reasons.sql],
    ["Web", yes(result.site), result.reasons.site],
    ["Build de release (sin publicar)", yes(result.release), result.reasons.release],
  ];
  const vitest = result.vitest.mode === "full"
    ? "completo"
    : `relacionados con ${result.vitest.files.length} archivos, mas ${result.vitest.tests.join(", ")}`;
  return [
    `## Plan de CI (${result.files} archivos)`,
    "",
    result.full ? `**Completo**: ${result.fullReasons.join("; ")}` : "Seleccion por areas (tools/ci/areas.json).",
    ...(result.unmatched.length ? ["", `**Sin area** (corre todo): ${result.unmatched.map((p) => `\`${p}\``).join(", ")}`] : []),
    "",
    "| Check | Corre | Por |",
    "|---|---|---|",
    ...rows.map(([name, on, why]) => `| ${name} | ${on} | ${why.join("; ") || "-"} |`),
    "",
    `Vitest (${result.vitest.selection}): ${vitest}.${result.vitest.selection === "shadow" ? " npm test corre completo." : ""}`,
    "",
  ].join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const option = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const config = JSON.parse(readFileSync(join(ROOT, "tools/ci/areas.json"), "utf8"));
  const engines = Object.keys(JSON.parse(readFileSync(join(ROOT, "tools/test-dbs/lines.json"), "utf8")).engines);
  let range;
  if (args.includes("--github")) range = githubRange();
  else if (option("--full")) range = { full: option("--full") };
  else if (option("--files")) range = { files: option("--files").split(",").map((path) => ({ path, status: "M" })) };
  else if (option("--diff")) range = { base: option("--diff"), head: args[args.indexOf("--diff") + 2] ?? "HEAD" };
  else throw new Error("uso: select.mjs --github | --files a,b | --diff <base> [<head>] | --full <motivo>");

  let files = range.files ?? [];
  let full = range.full ?? null;
  if (range.base) {
    try {
      files = diff(range.base, range.head);
    } catch (error) {
      full = `rango invalido ${range.base}..${range.head}: ${error.message.split("\n")[0]}`;
    }
  }
  const branch = process.env.GITHUB_REF?.startsWith("refs/heads/") ? process.env.GITHUB_REF.slice(11) : null;
  const result = plan({ files, config, packages: cargoMetadata(), engines, full, branch, event: process.env.GITHUB_EVENT_NAME ?? null });
  const text = summary(result);
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  if (process.env.GITHUB_OUTPUT) {
    const outputs = {
      full: result.full,
      node: result.node,
      rust: result.rust,
      "rust-packages": result.rustPackages === "*" ? "*" : result.rustPackages.join(" "),
      terminal: result.terminal,
      e2e: result.e2e,
      build: result.build,
      resources: JSON.stringify(result.resources),
      sql: JSON.stringify(result.sql),
      site: result.site,
      release: result.release,
      vitest: JSON.stringify(result.vitest),
      ref: git("rev-parse", "HEAD"),
    };
    appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(outputs).map(([key, value]) => `${key}=${value}\n`).join(""));
  } else if (args.includes("--json")) console.log(JSON.stringify(result, null, 2));
}
