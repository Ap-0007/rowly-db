#!/usr/bin/env node
// Reporte de la compuerta de motor (SQL_ENGINE §7): junta la evidencia de
// cada job de .github/workflows/sql-engine.yml y falla si alguna version
// exacta de `verified` (lines.json) o alguna linea (D7/D8) no la tiene
// completa y del commit que se prueba.
//
//   node tools/test-dbs/evidence.mjs <dir> [--commit <sha>] [--gate <nombre>=<resultado>]... [--out <verification.json>]
//   node tools/test-dbs/evidence.mjs <dir> --engines postgres          (PR: solo esos motores)
//   node tools/test-dbs/evidence.mjs <dir> --release ...               (release: todo y las semillas)
//
// <dir> tiene un directorio real-<motor>-<version> por job de version, con
// origin.json (commit y corrida que la produjo), evidence.jsonl (lo que
// escribe ROWLY_EVIDENCE) y real.log (la salida de cargo test), y un
// directorio lines-<motor> por motor con origin.json y lines.log.
// Completa quiere decir: la produjo el commit `--commit` (por defecto el
// HEAD del checkout), el servidor que corrio es el que lines.json declara
// (version y digest) y pasaron todas las pruebas de safety.rs, analysis.rs,
// generated.rs y contract.rs, o de version_lines.rs, sin ninguna ignorada.
// Cada `--gate` (Quality, E2E) tiene que ser `success`. Lo que una version
// no tiene sale como N/A, con su prueba. Con GITHUB_STEP_SUMMARY el resumen
// va ahi; con --out, la verificacion que acompana a la release.
//
// Un PR que solo toca algunos motores corre la matriz de esos (--engines) y
// su reporte dice el alcance: `scope` es la lista, no "full". La release
// (--release) no acepta alcance: exige todos los motores y, en cada version,
// el fuzz con cada semilla de RELEASE_SEEDS y al menos RELEASE_FUZZ_CASES
// casos (SQL_ENGINE §7).

import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../..", import.meta.url).pathname;
// Las suites que corre cada job de version y cada job de lineas (sql-engine.yml).
export const SUITES = ["safety", "analysis", "generated", "contract", "filters"];
export const LINE_SUITES = ["version_lines"];
const ENGINE = { mysql: "MySql", mariadb: "MariaDb", postgres: "Postgres" };
// Las semillas del fuzz que exige la release (SQL_ENGINE §7).
export const RELEASE_SEEDS = [0, 1, 2];
export const RELEASE_FUZZ_CASES = 4000;

// Cuantas pruebas tiene cada grupo de suites, contadas en su codigo.
export function testCount(suites, root = ROOT) {
  return suites
    .map((suite) => readFileSync(join(root, `crates/server-tests/tests/${suite}.rs`), "utf8"))
    .map((source) => (source.match(/#\[tokio::test\]/g) ?? []).length)
    .reduce((sum, count) => sum + count, 0);
}

// Lo que la release exige con evidencia: exactamente lo que README y
// SQL_ENGINE llaman verificado (status.mjs lee la misma lista).
export const requiredVersions = (lines) =>
  Object.entries(lines.verified).flatMap(([engine, servers]) => servers.map((server) => ({ engine, ...server })));

const read = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "");

// El origen de un job: tiene que ser el commit que se verifica.
function origin(job, commit) {
  const text = read(join(job, "origin.json"));
  if (!text) return { problem: "sin origin.json (no se sabe que commit la produjo)" };
  let found;
  try {
    found = JSON.parse(text);
  } catch {
    return { problem: "origin.json ilegible" };
  }
  if (found.commit !== commit) return { found, problem: `es del commit ${found.commit ?? "?"}, no de ${commit}` };
  return { found };
}

// Las lineas "test result" de cargo test, sumadas: [ok?, passed, failed, ignored].
function results(log, suites) {
  const found = [...log.matchAll(/test result: (\w+)\. (\d+) passed; (\d+) failed; (\d+) ignored/g)];
  if (found.length !== suites) return { problem: `sin el resultado de las ${suites} suites (${found.length})` };
  const sum = (at) => found.reduce((total, r) => total + Number(r[at]), 0);
  return { ok: found.every((r) => r[1] === "ok"), passed: sum(2), failed: sum(3), ignored: sum(4) };
}

function suiteProblem(result, expected) {
  if (result.problem) return result.problem;
  if (!result.ok || result.passed !== expected || result.ignored !== 0)
    return `${result.passed} de ${expected} pruebas, ${result.failed} fallidas, ${result.ignored} ignoradas`;
  return null;
}

export function verify({
  lines,
  dir,
  commit,
  gates = {},
  expected = testCount(SUITES),
  expectedLines = testCount(LINE_SUITES),
  engines = null,
  seeds = [],
  minCases = RELEASE_FUZZ_CASES,
}) {
  if (!/^[0-9a-f]{40}$/.test(commit ?? "")) throw new Error(`commit invalido: ${commit}`);
  const known = Object.keys(lines.engines);
  const unknown = (engines ?? []).filter((engine) => !known.includes(engine));
  if (engines && (engines.length === 0 || unknown.length)) throw new Error(`motores invalidos: ${unknown.join(", ") || "ninguno"}`);
  const scope = engines ? known.filter((engine) => engines.includes(engine)) : null;
  const inScope = (engine) => !scope || scope.includes(engine);
  const problems = [];
  const rows = [];
  const na = [];
  const versions = [];
  for (const [gate, result] of Object.entries(gates)) {
    if (result !== "success") problems.push(`${gate}: ${result || "sin resultado"}`);
  }
  for (const server of requiredVersions(lines).filter(({ engine }) => inScope(engine))) {
    const { engine } = server;
    const name = `${engine} ${server.version}`;
    const job = join(dir, `real-${engine}-${server.version}`);
    const missing = [];
    const from = origin(job, commit);
    if (from.problem) missing.push(from.problem);
    // upload-artifact conserva la ruta desde la raiz del repositorio.
    const records = (read(join(job, "evidence.jsonl")) || read(join(job, "crates/server-tests/evidence.jsonl")))
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .filter((record) => record.engine === ENGINE[engine]);
    const ran = records.find((record) => record.digest);
    if (!ran) missing.push("sin registro del servidor");
    else if (ran.version !== server.version || ran.digest !== server.digest)
      missing.push(`corrio ${ran.version} ${ran.digest}, lines.json declara ${server.digest}`);
    const result = results(read(join(job, "real.log")), SUITES.length);
    const suites = suiteProblem(result, expected);
    if (suites) missing.push(suites);
    const fuzz = records.filter((record) => record.fuzz).map((record) => record.fuzz);
    for (const seed of seeds) {
      if (!fuzz.some((run) => run.seed === seed && run.cases >= minCases)) missing.push(`sin fuzz con la semilla ${seed} (${minCases} casos)`);
    }
    const fuzzText = fuzz.length ? `; fuzz ${fuzz.map((run) => `semilla ${run.seed} (${run.cases})`).join(", ")}` : "";
    for (const record of records.filter((record) => record.na)) {
      na.push(`| ${name} | ${record.row} | ${record.na} | ${record.since} | \`${record.proof}\` |`);
    }
    rows.push(`| ${name} | ${missing.length ? "**incompleta**: " + missing.join("; ") : `completa (${expected}/${expected})${fuzzText}`} |`);
    if (missing.length) problems.push(`${name}: ${missing.join("; ")}`);
    versions.push({
      engine,
      version: server.version,
      digest: server.digest,
      passed: result.passed ?? 0,
      expected,
      na: records.filter((record) => record.na).map(({ row, na: capability, since }) => ({ row, capability, since })),
      fuzz: fuzz.map(({ seed, cases }) => ({ seed, cases })),
      run: from.found?.run ?? null,
    });
  }
  const lineResults = [];
  for (const engine of known.filter(inScope)) {
    const job = join(dir, `lines-${engine}`);
    const missing = [];
    const from = origin(job, commit);
    if (from.problem) missing.push(from.problem);
    const result = results(read(join(job, "lines.log")), LINE_SUITES.length);
    const suites = suiteProblem(result, expectedLines);
    if (suites) missing.push(suites);
    rows.push(`| lineas ${engine} (D7/D8) | ${missing.length ? "**incompleta**: " + missing.join("; ") : `completa (${expectedLines}/${expectedLines})`} |`);
    if (missing.length) problems.push(`lineas ${engine}: ${missing.join("; ")}`);
    lineResults.push({ engine, passed: result.passed ?? 0, expected: expectedLines, run: from.found?.run ?? null });
  }

  const summary = [
    `## Evidencia por version exacta (commit ${commit})`,
    "",
    scope
      ? `**Alcance del PR: ${scope.join(", ")}.** Las demas versiones no se probaron en esta corrida; esta evidencia no sirve para una release.`
      : `Alcance: todos los motores${seeds.length ? `, fuzz con las semillas ${seeds.join(", ")}` : ""}.`,
    "",
    "| Version | Matriz |",
    "|---|---|",
    ...rows,
    "",
    na.length ? "### N/A (el servidor rechazo lo que usa una capacidad que llega despues)" : "Sin N/A.",
    ...(na.length ? ["", "| Version | Fila | Capacidad | Desde | Prueba (D7) |", "|---|---|---|---|---|", ...na] : []),
    "",
  ].join("\n");
  // Lo verificado antes y ya fuera de soporte (lines.json `retired`), con su evidencia: viaja con cada release.
  const verification = {
    format: 1,
    commit,
    date: new Date().toISOString(),
    scope: scope ?? "full",
    seeds,
    gates,
    versions,
    lines: lineResults,
    retired: lines.retired ?? {},
  };
  return { problems, summary, verification };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const option = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const dir = args[0];
  if (!dir || dir.startsWith("--"))
    throw new Error("uso: evidence.mjs <dir> [--commit <sha>] [--gate nombre=resultado]... [--engines a,b | --release] [--out <archivo>]");
  const release = args.includes("--release");
  const engines = option("--engines")?.split(",").filter(Boolean);
  if (release && engines) throw new Error("la release no acepta --engines: exige todos los motores");
  const commit = option("--commit") ?? execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
  const gates = Object.fromEntries(
    args.flatMap((arg, i) => (args[i - 1] === "--gate" ? [arg.split("=")] : [])).map(([name, result]) => [name, result ?? ""]),
  );
  const lines = JSON.parse(readFileSync(join(ROOT, "tools/test-dbs/lines.json"), "utf8"));
  const { problems, summary, verification } = verify({ lines, dir, commit, gates, engines: engines ?? null, seeds: release ? RELEASE_SEEDS : [] });
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  const out = option("--out");
  if (out) writeFileSync(out, JSON.stringify(verification, null, 2) + "\n");
}
