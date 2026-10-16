// La agregacion de resources.yml: cada escenario pedido corrio y paso.
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { check } from "./scenarios.mjs";

function reports(entries) {
  const dir = mkdtempSync(join(tmpdir(), "rowly-scenarios-"));
  for (const [id, scenarios] of Object.entries(entries)) {
    mkdirSync(join(dir, `resources-${id}`));
    writeFileSync(join(dir, `resources-${id}`, "report.json"), JSON.stringify({ scenarios }));
  }
  return dir;
}

test("todos los pedidos corrieron y pasaron", (t) => {
  const dir = reports({ consoles: [{ id: "consoles", ok: true, ms: 1000 }], "terminal-ui": [{ id: "terminal-ui", ok: true, ms: 4000 }] });
  t.after(() => rmSync(dir, { recursive: true }));
  assert.deepEqual(check(dir, ["consoles", "terminal-ui"]).problems, []);
});

test("un job sin reporte, uno que fallo o uno que corrio otra cosa: rechazado", (t) => {
  const dir = reports({
    consoles: [{ id: "consoles", ok: false, ms: 1, error: "el heap crecio" }],
    "terminal-ui": [{ id: "terminal-idle", ok: true, ms: 1 }],
  });
  t.after(() => rmSync(dir, { recursive: true }));
  assert.deepEqual(check(dir, ["consoles", "terminal-ui", "reconnections"]).problems, [
    "consoles: el heap crecio",
    "terminal-ui: el job corrio otros escenarios (terminal-idle)",
    "terminal-ui: corrio 0 veces",
    "reconnections: sin reporte (el job no corrio o no llego a escribirlo)",
  ]);
});

test("pedir ningun escenario no es un exito", () => {
  assert.deepEqual(check("/nada", []).problems, ["no se pidio ningun escenario"]);
});
