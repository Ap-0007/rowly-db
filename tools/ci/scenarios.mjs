#!/usr/bin/env node
// Junta los reportes de resources.yml: cada escenario pedido tiene que haber
// corrido en su job y pasado. Un job que no subio su reporte, un reporte sin
// el escenario o con uno de mas cuentan como fallo.
//
//   node tools/ci/scenarios.mjs <dir> --expect consoles,terminal-idle
//
// <dir> tiene un directorio resources-<id> por job, con el report.json que
// escribe `resources.mjs --report`.

import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export function check(dir, expected) {
  if (expected.length === 0) return { problems: ["no se pidio ningun escenario"], rows: [] };
  const problems = [];
  const rows = [];
  for (const id of expected) {
    const path = join(dir, `resources-${id}`, "report.json");
    if (!existsSync(path)) {
      problems.push(`${id}: sin reporte (el job no corrio o no llego a escribirlo)`);
      rows.push(`| ${id} | sin reporte |`);
      continue;
    }
    let scenarios;
    try {
      ({ scenarios } = JSON.parse(readFileSync(path, "utf8")));
    } catch {
      problems.push(`${id}: reporte ilegible`);
      continue;
    }
    const ran = scenarios.filter((scenario) => scenario.id === id);
    const others = scenarios.filter((scenario) => scenario.id !== id).map((scenario) => scenario.id);
    if (others.length) problems.push(`${id}: el job corrio otros escenarios (${others.join(", ")})`);
    if (ran.length !== 1) problems.push(`${id}: corrio ${ran.length} veces`);
    else if (!ran[0].ok) problems.push(`${id}: ${ran[0].error ?? "fallo"}`);
    rows.push(`| ${id} | ${ran.length === 1 && ran[0].ok ? `ok (${Math.round(ran[0].ms / 1000)} s)` : "**fallo**"} |`);
  }
  return { problems, rows };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [dir, flag, list] = process.argv.slice(2);
  if (!dir || flag !== "--expect") throw new Error("uso: scenarios.mjs <dir> --expect a,b");
  const expected = (list ?? "").split(",").filter(Boolean);
  const { problems, rows } = check(dir, expected);
  const text = ["## Recursos", "", "| Escenario | Resultado |", "|---|---|", ...rows, ""].join("\n");
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
}
