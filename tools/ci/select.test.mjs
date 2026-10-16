// El planner de CI (select.mjs): que corre segun lo que cambia.
// node --test tools/ci/*.test.mjs
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { areaMatches, globToRegExp, parseNameStatus, plan, reverseClosure, workspacePackages } from "./select.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const config = JSON.parse(readFileSync(join(ROOT, "tools/ci/areas.json"), "utf8"));
const lines = JSON.parse(readFileSync(join(ROOT, "tools/test-dbs/lines.json"), "utf8"));
const engines = Object.keys(lines.engines);

// El grafo del workspace tal como lo da `cargo metadata --no-deps`.
const member = (name, dir, deps = [], kind = null) => ({
  id: `path+file://${ROOT}${dir}#${name}`,
  name,
  manifest_path: join(ROOT, dir, "Cargo.toml"),
  dependencies: deps.map((dep) => ({ name: dep, path: join(ROOT, "x"), kind })),
});
const metadata = {
  workspace_members: [],
  packages: [
    member("khipu-engine", "crates/engine"),
    member("khipu-lsp", "crates/engine-lsp", ["khipu-engine"]),
    member("khipu-driver-core", "crates/driver-core"),
    member("khipu-driver-mysql", "crates/drivers/mysql", ["khipu-driver-core", "khipu-engine"]),
    member("khipu-driver-postgres", "crates/drivers/postgres", ["khipu-driver-core", "khipu-engine"]),
    member("rowly-server-tests", "crates/server-tests", ["khipu-engine", "khipu-driver-core", "khipu-driver-mysql", "khipu-driver-postgres"]),
    member("khipu-desktop", "app/src-tauri", ["khipu-engine", "khipu-driver-core", "khipu-driver-mysql", "khipu-driver-postgres"]),
    // Un paquete externo con el mismo nombre que uno del workspace no cuenta.
    { id: "registry+serde", name: "serde", manifest_path: "/registry/serde/Cargo.toml", dependencies: [] },
  ],
};
metadata.workspace_members = metadata.packages.filter((pkg) => pkg.id.startsWith("path+")).map((pkg) => pkg.id);
const packages = workspacePackages(metadata, ROOT);

const run = (paths, extra = {}) =>
  plan({ files: paths.map((path) => ({ path, status: "M" })), config, packages, engines, ...extra });

test("los globs: ** cruza directorios, * no", () => {
  assert.ok(globToRegExp("crates/**").test("crates/engine/src/lib.rs"));
  assert.ok(globToRegExp("app/src/**/*.test.ts").test("app/src/lib/a.test.ts"));
  assert.ok(globToRegExp("app/src/**/*.test.ts").test("app/src/a.test.ts"));
  assert.ok(!globToRegExp("*.md").test("docs/a.md"));
  assert.ok(globToRegExp("LICENSE*").test("LICENSE-MIT"));
  assert.ok(!globToRegExp("app/src/lib/sql*.ts").test("app/src/lib/sqlx/a.ts"));
  assert.ok(areaMatches({ paths: ["a/**"], exclude: ["a/b/**"] })("a/c"));
  assert.ok(!areaMatches({ paths: ["a/**"], exclude: ["a/b/**"] })("a/b/c"));
});

test("el grafo: dependencias de ruta del workspace, en reversa", () => {
  const desktop = packages.find((pkg) => pkg.name === "khipu-desktop");
  assert.equal(desktop.dir, "app/src-tauri");
  assert.ok(!packages.some((pkg) => pkg.name === "serde"));
  assert.deepEqual(reverseClosure(packages, ["khipu-driver-postgres"]), ["khipu-desktop", "khipu-driver-postgres", "rowly-server-tests"]);
  assert.deepEqual(reverseClosure(packages, ["khipu-lsp"]), ["khipu-lsp"]);
});

test("solo PostgreSQL: sin MySQL ni MariaDB, ni el driver de MySQL", () => {
  const result = run(["crates/drivers/postgres/src/introspect.rs"]);
  assert.equal(result.full, false);
  assert.deepEqual(result.sql, ["postgres"]);
  assert.deepEqual(result.rustPackages, ["khipu-desktop", "khipu-driver-postgres", "rowly-server-tests"]);
  assert.deepEqual(result.resources, ["reconnections", "database-idle"]);
  assert.equal(result.e2e, true);
  assert.equal(result.site, false);
});

test("MySQL selecciona tambien MariaDB; el override de MariaDB solo MariaDB", () => {
  assert.deepEqual(run(["crates/drivers/mysql/src/lib.rs"]).sql, ["mysql", "mariadb"]);
  assert.deepEqual(run(["crates/engine/src/dialects/mysql.rs"]).sql, ["mysql", "mariadb"]);
  assert.deepEqual(run(["tests/sql/mysql/common/valid.sql"]).sql, ["mysql", "mariadb"]);
  assert.deepEqual(run(["crates/engine/src/dialects/mariadb.rs"]).sql, ["mariadb"]);
  assert.deepEqual(run(["support/mariadb.json"]).sql, ["mariadb"]);
  assert.deepEqual(run(["app/src/lib/engines/mariadb.ts"]).sql, ["mariadb"]);
});

test("lo compartido (guard, splitter, contrato, arnes, autocompletado) selecciona todos los motores", () => {
  for (const path of [
    "crates/engine/src/execution_guard.rs",
    "crates/driver-core/src/lib.rs",
    "crates/server-tests/tests/safety.rs",
    "tests/engines/contract.json",
    "tools/test-dbs/lines.json",
    "app/src/lib/editor/catalogCompletions.ts",
    "app/src/lib/engines/common.ts",
    "tests/sql/common/README.md",
  ])
    assert.deepEqual(run([path]).sql, engines, path);
});

test("driver-core y engine: todo lo que depende de ellos", () => {
  assert.deepEqual(run(["crates/driver-core/src/console.rs"]).rustPackages, [
    "khipu-desktop", "khipu-driver-core", "khipu-driver-mysql", "khipu-driver-postgres", "rowly-server-tests",
  ]);
  assert.deepEqual(run(["crates/engine/src/parser.rs"]).rustPackages, [
    "khipu-desktop", "khipu-driver-mysql", "khipu-driver-postgres", "khipu-engine", "khipu-lsp", "rowly-server-tests",
  ]);
});

test("LSP: solo su paquete, sin motores ni la app", () => {
  const result = run(["crates/engine-lsp/src/main.rs"]);
  assert.deepEqual(result.rustPackages, ["khipu-lsp"]);
  assert.deepEqual(result.sql, []);
  assert.equal(result.e2e, false);
  assert.deepEqual(result.resources, []);
});

test("terminal: el escritorio, macOS/Windows y los escenarios de terminal", () => {
  const result = run(["app/src-tauri/src/terminal.rs"]);
  assert.deepEqual(result.rustPackages, ["khipu-desktop"]);
  assert.equal(result.terminal, true);
  assert.deepEqual(result.resources, ["terminal-ui", "terminal-cycles", "terminal-idle", "terminal-output"]);
  assert.deepEqual(result.sql, []);
  assert.deepEqual(run(["app/src/lib/components/TerminalSession.svelte"]).resources, ["terminal-ui", "terminal-cycles", "terminal-idle", "terminal-output"]);
});

test("solo docs: nada de Rust, E2E, SQL, recursos ni web", () => {
  const result = run(["docs/ARCHITECTURE.md", "SQL_ENGINE.es.md", "CONTRIBUTING.md"]);
  assert.equal(result.full, false);
  for (const flag of ["node", "rust", "terminal", "e2e", "site", "release", "build"]) assert.equal(result[flag], false, flag);
  assert.deepEqual(result.resources, []);
  assert.deepEqual(result.sql, []);
});

test("solo la web: el check de la web, sin Rust ni E2E", () => {
  const result = run(["site/index.html", "README.md", ".github/scripts/render-site.py"]);
  assert.equal(result.site, true);
  for (const flag of ["node", "rust", "e2e", "build"]) assert.equal(result[flag], false, flag);
});

test("UI de presentacion: Node, E2E y el escritorio, sin recursos ni motores", () => {
  const result = run(["app/src/lib/components/Button.svelte"]);
  assert.equal(result.node, true);
  assert.equal(result.e2e, true);
  assert.deepEqual(result.rustPackages, ["khipu-desktop"]);
  assert.deepEqual(result.resources, []);
  assert.deepEqual(result.sql, []);
});

test("un test de Vitest solo: Node, sin compilar Rust ni E2E", () => {
  const result = run(["app/src/lib/numpadKeys.test.ts"]);
  assert.equal(result.node, true);
  assert.equal(result.rust, false);
  assert.equal(result.e2e, false);
});

test("ciclo de vida: DataGrid y el editor llevan al escenario de consolas; el arnes a todos", () => {
  assert.deepEqual(run(["app/src/lib/components/results/DataGrid.svelte"]).resources, ["consoles"]);
  assert.deepEqual(run(["app/src/lib/SqlEditor.svelte"]).resources, ["consoles"]);
  assert.deepEqual(run(["app/tests/e2e/resources.mjs"]).resources, config.resources);
  assert.deepEqual(run(["app/src-tauri/src/lib.rs"]).resources, config.resources);
});

test("una ruta sin area corre todo y lo dice", () => {
  const result = run(["algo/nuevo.txt"]);
  assert.equal(result.full, true);
  assert.deepEqual(result.unmatched, ["algo/nuevo.txt"]);
  assert.match(result.fullReasons[0], /ningun area/);
  assert.equal(result.rustPackages, "*");
  assert.deepEqual(result.sql, engines);
  assert.deepEqual(result.resources, config.resources);
});

test("manifiestos, lockfile, workflows y el propio planner: todo", () => {
  for (const path of ["Cargo.lock", "Cargo.toml", "app/package-lock.json", ".github/workflows/ci.yml", "tools/ci/areas.json"]) {
    const result = run([path]);
    assert.equal(result.full, true, path);
    assert.equal(result.vitest.mode, "full", path);
  }
  // El manifiesto de un paquete: features inciertas, todo el workspace.
  assert.equal(run(["crates/drivers/mysql/Cargo.toml"]).rustPackages, "*");
});

test("paquete renombrado o borrado: la ruta vieja ya no tiene paquete y corre todo el workspace", () => {
  const renamed = plan({
    files: parseNameStatus("R100\tcrates/drivers/sqlite/src/lib.rs\tcrates/drivers/sqlite3/src/lib.rs"),
    config,
    packages,
    engines,
  });
  assert.equal(renamed.rustPackages, "*");
  assert.deepEqual(parseNameStatus("R090\ta\tb\nD\tc\n").map(({ path, status }) => `${status}${path}`), ["Ra", "Rb", "Dc"]);
  assert.equal(run(["crates/old-driver/src/lib.rs"]).rustPackages, "*");
});

test("sin historia o con base invalida, el CLI pide todo", () => {
  const result = run([], { full: "push sin un commit anterior conocido" });
  assert.equal(result.full, true);
  assert.deepEqual(result.fullReasons, ["push sin un commit anterior conocido"]);
});

test("push a main con cambios de la app compila la release; un PR no", () => {
  assert.equal(run(["app/src/lib/components/Button.svelte"], { event: "push", branch: "main" }).release, true);
  assert.equal(run(["docs/ARCHITECTURE.md"], { event: "push", branch: "main" }).release, false);
  assert.equal(run(["app/src/lib/components/Button.svelte"], { event: "pull_request" }).release, false);
  assert.equal(run(["packaging/arch/PKGBUILD"]).release, true);
});

test("Vitest en sombra: archivos relacionados mas los contratos; config y stubs piden todo", () => {
  const result = run(["app/src/lib/numpadKeys.ts"]);
  assert.equal(result.vitest.mode, "related");
  assert.deepEqual(result.vitest.files, ["src/lib/numpadKeys.ts"]);
  for (const test of config.vitest.always) assert.ok(result.vitest.tests.includes(test), test);
  assert.equal(run(["app/src/lib/__test-stubs__/app-environment.ts"]).vitest.mode, "full");
  // Lo que los tests leen del disco: el contrato de motores y el codigo de Rust.
  assert.ok(run(["support/postgres.json"]).vitest.tests.includes("src/lib/engines/contract.test.ts"));
  assert.ok(run(["crates/engine/src/diagnostics.rs"]).node);
});

// --- El mapa contra el repositorio -----------------------------------------------

test("cada archivo del repositorio esta en algun area: nada cae en `completo` sin querer", () => {
  const tracked = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean);
  const result = plan({ files: tracked.map((path) => ({ path, status: "M" })), config, packages, engines });
  assert.deepEqual(result.unmatched, []);
});

test("los escenarios de recursos del mapa son los de resources.mjs", () => {
  const source = readFileSync(join(ROOT, "app/tests/e2e/resources.mjs"), "utf8");
  const ids = [...source.matchAll(/^cycle\("([a-z-]+)",/gm)].map((match) => match[1]);
  assert.deepEqual(ids, config.resources);
  for (const area of config.areas)
    if (Array.isArray(area.checks.resources)) for (const id of area.checks.resources) assert.ok(ids.includes(id), `${area.id}: ${id}`);
});

test("los motores y paquetes que nombra el mapa existen", () => {
  const names = new Set(packages.map((pkg) => pkg.name));
  for (const area of config.areas) {
    if (Array.isArray(area.checks.sql)) for (const engine of area.checks.sql) assert.ok(engines.includes(engine), `${area.id}: ${engine}`);
    if (Array.isArray(area.checks.rust)) for (const name of area.checks.rust) assert.ok(names.has(name), `${area.id}: ${name}`);
  }
  // Los del fixture son los del workspace real.
  const workspace = readFileSync(join(ROOT, "Cargo.toml"), "utf8").match(/members = \[([\s\S]*?)\]/)[1].match(/"([^"]+)"/g).map((dir) => dir.slice(1, -1));
  assert.deepEqual(packages.map((pkg) => pkg.dir).sort(), workspace.sort());
});
