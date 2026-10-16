// La compuerta de release (evidence.mjs): solo deja publicar con la evidencia
// completa del mismo commit. node --test tools/test-dbs/*.test.mjs
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { RELEASE_SEEDS, requiredVersions, verify } from "./evidence.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const SHA = "a".repeat(40);
const OTHER = "b".repeat(40);
const LINES = {
  verified: { mysql: [{ version: "8.4.11", digest: "sha256:84" }], postgres: [{ version: "18.6", digest: "sha256:18" }] },
  engines: { mysql: [], postgres: [] },
};
const ENGINE = { mysql: "MySql", postgres: "Postgres" };
const GATES = { quality: "success", e2e: "success" };

// La evidencia que deja una corrida verde de sql-engine.yml en `commit`.
function evidence(commit = SHA) {
  const dir = mkdtempSync(join(tmpdir(), "rowly-evidence-"));
  const job = (name, files) => {
    mkdirSync(join(dir, name));
    for (const [file, text] of Object.entries({ "origin.json": JSON.stringify({ commit, run: "1" }), ...files }))
      writeFileSync(join(dir, name, file), text);
  };
  for (const { engine, version, digest } of requiredVersions(LINES)) {
    job(`real-${engine}-${version}`, {
      "evidence.jsonl": JSON.stringify({ engine: ENGINE[engine], version, image: `${engine}:${version}`, digest }) + "\n",
      // Cinco suites, 3 pruebas en total.
      "real.log": ["2 passed; 0 failed; 0 ignored", "1 passed; 0 failed; 0 ignored", "0 passed; 0 failed; 0 ignored", "0 passed; 0 failed; 0 ignored", "0 passed; 0 failed; 0 ignored"]
        .map((counts) => `test result: ok. ${counts}; 0 measured; 0 filtered out`)
        .join("\n"),
    });
  }
  for (const engine of Object.keys(LINES.engines))
    job(`lines-${engine}`, { "lines.log": "test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out" });
  return dir;
}

const check = (dir, overrides = {}) => verify({ lines: LINES, dir, commit: SHA, gates: GATES, expected: 3, expectedLines: 2, ...overrides });

test("SHA correcto y compuertas verdes: la release se permite y la verificacion nombra el commit", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  const { problems, verification } = check(dir);
  assert.deepEqual(problems, []);
  assert.equal(verification.commit, SHA);
  assert.deepEqual(verification.gates, GATES);
  assert.deepEqual(
    verification.versions.map(({ engine, version, digest, passed }) => [engine, version, digest, passed]),
    [["mysql", "8.4.11", "sha256:84", 3], ["postgres", "18.6", "sha256:18", 3]],
  );
  assert.deepEqual(verification.lines.map(({ engine, passed }) => [engine, passed]), [["mysql", 2], ["postgres", 2]]);
});

test("evidencia de otro SHA: rechazada", (t) => {
  const dir = evidence(OTHER);
  t.after(() => rmSync(dir, { recursive: true }));
  const { problems } = check(dir);
  assert.equal(problems.length, 4);
  assert.ok(problems.every((problem) => problem.includes(`es del commit ${OTHER}, no de ${SHA}`)), problems.join("\n"));
});

test("una sola version vieja entre las del commit: rechazada", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  writeFileSync(join(dir, "real-postgres-18.6", "origin.json"), JSON.stringify({ commit: OTHER }));
  assert.deepEqual(check(dir).problems, [`postgres 18.6: es del commit ${OTHER}, no de ${SHA}`]);
});

test("evidencia ausente: rechazada", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  rmSync(join(dir, "real-mysql-8.4.11"), { recursive: true });
  rmSync(join(dir, "lines-postgres", "origin.json"));
  const { problems } = check(dir);
  assert.match(problems[0], /^mysql 8\.4\.11: sin origin\.json.*sin registro del servidor; sin el resultado de las 5 suites/);
  assert.match(problems[1], /^lineas postgres: sin origin\.json/);
  assert.equal(problems.length, 2);
});

test("matriz no satisfecha: rechazada", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  const log = join(dir, "real-postgres-18.6", "real.log");
  writeFileSync(log, readFileSync(log, "utf8").replace("2 passed; 0 failed", "1 passed; 1 failed").replace("test result: ok", "test result: FAILED"));
  writeFileSync(join(dir, "lines-mysql", "lines.log"), "test result: ok. 1 passed; 0 failed; 1 ignored");
  assert.deepEqual(check(dir).problems, [
    "postgres 18.6: 2 de 3 pruebas, 1 fallidas, 0 ignoradas",
    "lineas mysql: 1 de 2 pruebas, 0 fallidas, 1 ignoradas",
  ]);
});

test("otro servidor que el declarado: rechazado", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  writeFileSync(join(dir, "real-mysql-8.4.11", "evidence.jsonl"), JSON.stringify({ engine: "MySql", version: "8.4.11", digest: "sha256:otro" }));
  assert.deepEqual(check(dir).problems, ["mysql 8.4.11: corrio 8.4.11 sha256:otro, lines.json declara sha256:84"]);
});

test("Quality o E2E sin exito: rechazada", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  assert.deepEqual(check(dir, { gates: { quality: "success", e2e: "failure" } }).problems, ["e2e: failure"]);
  assert.deepEqual(check(dir, { gates: { quality: "", e2e: "success" } }).problems, ["quality: sin resultado"]);
});

test("sin un commit completo no se verifica nada", () => {
  assert.throws(() => check("/nada", { commit: "abc123" }), /commit invalido/);
});

// README y SQL_ENGINE no pueden llamar verificada a una version que la
// release no exige con evidencia: las dos listas son la misma.
test("lo que README anuncia como verificado es exactamente lo que la release exige", () => {
  const lines = JSON.parse(readFileSync(join(ROOT, "tools/test-dbs/lines.json"), "utf8"));
  const required = requiredVersions(lines).map(({ engine, version }) => `${engine} ${version}`).sort();
  const names = { MySQL: "mysql", MariaDB: "mariadb", PostgreSQL: "postgres" };
  for (const doc of ["README.md", "README.es.md"]) {
    const block = readFileSync(join(ROOT, doc), "utf8").match(/<!-- generated: engines [^>]*-->([\s\S]*?)<!-- \/generated: engines -->/)[1];
    const announced = block
      .split("\n")
      .filter((row) => row.startsWith("|") && !/^\|\s*-/.test(row))
      .slice(1)
      .flatMap((row) => {
        const [, engine, verified] = row.split("|").map((cell) => cell.trim());
        return verified.split(",").map((version) => `${names[engine]} ${version.trim()}`);
      })
      .sort();
    assert.deepEqual(announced, required, doc);
  }
});

// Un PR de un solo motor (#115): su reporte dice el alcance y no sirve para
// la release, que pide todos los motores.
test("alcance de PR: solo los motores elegidos, y la verificacion lo dice", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  rmSync(join(dir, "real-mysql-8.4.11"), { recursive: true });
  rmSync(join(dir, "lines-mysql"), { recursive: true });
  const scoped = check(dir, { engines: ["postgres"] });
  assert.deepEqual(scoped.problems, []);
  assert.deepEqual(scoped.verification.scope, ["postgres"]);
  assert.deepEqual(scoped.verification.versions.map(({ engine }) => engine), ["postgres"]);
  assert.match(scoped.summary, /Alcance del PR: postgres\..*no sirve para una release/);
  // La misma evidencia parcial, sin alcance (lo que hace la release): rechazada.
  const full = check(dir);
  assert.equal(full.verification.scope, "full");
  assert.deepEqual(full.problems.map((problem) => problem.split(":")[0]), ["mysql 8.4.11", "lineas mysql"]);
});

test("un alcance vacio o con un motor desconocido no se acepta", () => {
  assert.throws(() => check("/nada", { engines: [] }), /motores invalidos: ninguno/);
  assert.throws(() => check("/nada", { engines: ["oracle"] }), /motores invalidos: oracle/);
});

// La release exige las semillas documentadas (#118).
test("release: sin cada semilla de fuzz con sus casos, rechazada", (t) => {
  const dir = evidence();
  t.after(() => rmSync(dir, { recursive: true }));
  const fuzz = (engine, seed, cases = 4000) => JSON.stringify({ engine, fuzz: { seed, cases, dangerous: 40, accepted: 900 } });
  const add = (job, engine, runs) => {
    const path = join(dir, job, "evidence.jsonl");
    writeFileSync(path, readFileSync(path, "utf8") + runs.map(([seed, cases]) => fuzz(engine, seed, cases)).join("\n") + "\n");
  };
  add("real-mysql-8.4.11", "MySql", [[0], [1], [2]]);
  add("real-postgres-18.6", "Postgres", [[0], [1, 200]]);
  const { problems, verification, summary } = check(dir, { seeds: RELEASE_SEEDS });
  assert.deepEqual(problems, ["postgres 18.6: sin fuzz con la semilla 1 (4000 casos); sin fuzz con la semilla 2 (4000 casos)"]);
  assert.deepEqual(verification.seeds, RELEASE_SEEDS);
  assert.deepEqual(verification.versions[0].fuzz, [{ seed: 0, cases: 4000 }, { seed: 1, cases: 4000 }, { seed: 2, cases: 4000 }]);
  assert.match(summary, /mysql 8\.4\.11 \| completa \(3\/3\); fuzz semilla 0 \(4000\), semilla 1 \(4000\), semilla 2 \(4000\)/);
  // Fuera de la release, las semillas se informan pero no se exigen.
  assert.deepEqual(check(dir).problems, []);
});

test("las semillas de la release son las que documenta SQL_ENGINE", () => {
  for (const doc of ["SQL_ENGINE.md", "SQL_ENGINE.es.md"]) {
    const text = readFileSync(join(ROOT, doc), "utf8");
    const row = text.split("\n").find((line) => /^\| \*\*(App release|Release)\*\* \|/.test(line));
    assert.ok(row, doc);
    assert.match(row, new RegExp(`ROWLY_FUZZ_SEEDS=${RELEASE_SEEDS.join(",")}`), doc);
  }
});
