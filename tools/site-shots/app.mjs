// Maneja la app real por el inspector de WebKitGTK para preparar cada escena
// de las capturas de la web. Lo llama shots.sh; cada orden es un paso:
//
//   node app.mjs setup <light|dark> <en|es>   perfil, tema, idioma, conexión
//   node app.mjs split <porcentaje>           alto del editor frente al resultado
//   node app.mjs scene <escena> <sufijo>      prepara y captura una escena
//
// Escenas: hero, editor (autocompletado y diagnóstico), review (grilla editada
// y diálogo de cambios pendientes), terminal, mosaic. Las capturas en bruto van
// a $SHOTS_WORK/raw/<nombre>-<sufijo>.png.

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { connectInspector } from "../../app/tests/e2e/inspector.mjs";

const WORK = process.env.SHOTS_WORK;
const DISPLAY = process.env.SHOTS_DISPLAY ?? ":97";
const INSPECTOR = process.env.SHOTS_INSPECTOR ?? "127.0.0.1:9399";
const DB_PORT = Number(process.env.SHOTS_DB_PORT ?? 55499);
if (!WORK) throw new Error("falta SHOTS_WORK");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Ayudas que se inyectan en la página. El EditorView de CodeMirror se alcanza
// por el cmTile de .cm-content; las teclas se despachan como KeyboardEvent.
const PRELUDE = `
window.$v = () => document.querySelector(".cm-editor.cm-focused .cm-content, .cm-content").cmTile.view;
window.$views = () => [...document.querySelectorAll(".cm-content")].map((c) => c.cmTile.view);
window.$key = (key, mods = {}, target) => {
  const t = target || document.activeElement || document.body;
  const code = key.length === 1 ? (/[a-z]/i.test(key) ? "Key" + key.toUpperCase() : /[0-9]/.test(key) ? "Digit" + key : key) : key;
  for (const type of ["keydown", "keyup"]) t.dispatchEvent(new KeyboardEvent(type, { key, code, bubbles: true, cancelable: true, composed: true, ctrlKey: !!mods.ctrl, shiftKey: !!mods.shift, altKey: !!mods.alt, metaKey: !!mods.meta }));
};
window.$set = (text, view) => { const v = view || $v(); v.focus(); v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: text }, selection: { anchor: text.length } }); };
window.$wait = async (fn, ms = 8000) => { const end = Date.now() + ms; while (Date.now() < end) { const r = fn(); if (r) return r; await new Promise((r) => setTimeout(r, 100)); } throw new Error("timeout " + fn); };
window.$pause = (ms) => new Promise((r) => setTimeout(r, ms));
1`;

// Evalúa una expresión (puede ser una promesa) y espera su resultado sin
// depender de awaitPromise, que el inspector de WebKitGTK no respeta siempre.
async function run(code) {
  const page = await connectInspector(INSPECTOR);
  try {
    await page.evaluate(PRELUDE);
    await page.evaluate(`window.__r = undefined; Promise.resolve(${code}).then((v) => (window.__r = { v }), (e) => (window.__r = { e: String((e && e.stack) || e) })); 1`);
    for (let i = 0; i < 600; i++) {
      const result = await page.evaluate("window.__r");
      if (result) {
        if (result.e) throw new Error(result.e);
        return result.v;
      }
      await sleep(100);
    }
    throw new Error("la página no respondió en 60 s");
  } finally {
    page.close();
  }
}

function shot(name) {
  mkdirSync(`${WORK}/raw`, { recursive: true });
  execFileSync("import", ["-window", "root", `${WORK}/raw/${name}.png`], { env: { ...process.env, DISPLAY } });
}

async function setup(scheme, locale) {
  const folder = `${WORK}/home/shop-queries`;
  const profile = [{ id: "shop-demo", name: "Shop", driver: "postgres", host: "127.0.0.1", port: DB_PORT, database: "shop", username: "demo", passwordPolicy: "never", tlsMode: "disabled", environment: "development" }];
  await run(`(() => {
    localStorage.setItem("khipu:connection-profiles", ${JSON.stringify(JSON.stringify(profile))});
    localStorage.setItem("khipu:theme", JSON.stringify({ family: "rowly", scheme: "${scheme}" }));
    localStorage.setItem("khipu:locale", "${locale}");
    localStorage.setItem("khipu:updates:v1", JSON.stringify({ autoCheck: false, includePrereleases: false, skippedTag: null }));
    localStorage.setItem("khipu:sql-folders:v1", ${JSON.stringify(JSON.stringify({ folderByProfile: { "shop-demo": folder }, expandedByProfile: { "shop-demo": [`${folder}/maintenance`, `${folder}/reports`] }, panelHeight: 200, collapsed: false }))});
    location.reload();
    return 1;
  })()`);
  await sleep(2500);
  await run(`(async () => {
    await $wait(() => document.querySelector(".card-main"));
    document.querySelector(".card-main").click();
    const pw = await $wait(() => document.querySelector("#password"));
    pw.value = "demo";
    pw.dispatchEvent(new Event("input", { bubbles: true }));
    document.querySelector("form button[type=submit]").click();
    await $wait(() => document.querySelector(".cm-content"), 20000);
    return 1;
  })()`);
  // Sin gestor de ventanas, maximizar no hace nada: la ventana se lleva al
  // tamaño de la pantalla virtual (1440x900 lógicos a escala 2).
  await sleep(1500);
  execFileSync("python3", [new URL("xresize.py", import.meta.url).pathname, "2880", "1800"], { env: { ...process.env, DISPLAY } });
  await sleep(1200);
  console.log(await run(`innerWidth + "x" + innerHeight`));
}

async function split(target) {
  await run(`(async () => {
    const s = document.querySelector(".splitter");
    s.focus();
    for (let i = 0; i < 60 && Number(s.getAttribute("aria-valuenow")) > ${target}; i++) { $key("ArrowUp", {}, s); await $pause(20); }
    for (let i = 0; i < 60 && Number(s.getAttribute("aria-valuenow")) < ${target}; i++) { $key("ArrowDown", {}, s); await $pause(20); }
    s.blur();
    return 1;
  })()`);
}

const scenes = {
  async hero(suffix) {
    const sql = "SELECT c.id, c.name, c.city,\n       COUNT(o.id)       AS orders,\n       SUM(o.total)      AS spent,\n       MAX(o.created_at) AS last_order\nFROM shop.customers c\nJOIN shop.orders o ON o.customer_id = c.id\nWHERE o.paid\nGROUP BY c.id, c.name, c.city\nORDER BY spent DESC\nLIMIT 25;";
    await run(`(async () => {
      $set(${JSON.stringify(sql)});
      $key("Enter", { ctrl: true }, $v().contentDOM);
      await $wait(() => document.querySelector(".data-grid"), 10000);
      await $pause(700);
      return 1;
    })()`);
    await sleep(500);
    shot(`hero-${suffix}`);
  },

  async editor(suffix) {
    // Autocompletado: escribir "JOIN cu" deja la sugerencia del JOIN por la clave foránea.
    await run(`(async () => {
      $set("SELECT o.id, o.total, c.name, c.city\\nFROM shop.orders o\\nJOIN");
      const v = $v();
      v.focus();
      for (const ch of " cu") { const at = v.state.doc.length; v.dispatch({ changes: { from: at, insert: ch }, selection: { anchor: at + 1 }, userEvent: "input.type" }); await $pause(120); }
      await $wait(() => document.querySelector(".cm-tooltip-autocomplete"), 5000);
      await $pause(400);
      return 1;
    })()`);
    await sleep(200);
    shot(`autocomplete-${suffix}`);
    // Diagnóstico: una columna mal escrita y su detalle con Ctrl+.
    await run(`(async () => {
      $key("Escape", {}, $v().contentDOM);
      await $pause(300);
      const text = "SELECT id, name, emial\\nFROM shop.customers\\nWHERE city = 'Quito';";
      $set(text);
      const v = $v();
      v.dispatch({ selection: { anchor: text.indexOf("emial") + 2 } });
      await $pause(2100);
      $key(".", { ctrl: true }, v.contentDOM);
      await $pause(700);
      return 1;
    })()`);
    await sleep(200);
    shot(`diagnostics-${suffix}`);
  },

  async review(suffix) {
    // Un correo editado, una fila marcada para borrar y dos filas nuevas. Los
    // índices son filas de la consulta (cliente 44, cliente 49 sin pedidos).
    await run(`(async () => {
      $set("SELECT id, name, email, city\\nFROM shop.customers\\nORDER BY id;");
      $key("Enter", { ctrl: true }, $v().contentDOM);
      await $wait(() => document.querySelectorAll(".grid-body-rows.chunked tbody tr").length >= 50);
      await $pause(400);
      const cell = (row, col) => {
        const tb = [...document.querySelectorAll(".grid-body-rows tbody")].find((t) => { const f = Number(t.dataset.firstRow); return row >= f && row < f + t.rows.length; });
        return tb.rows[row - Number(tb.dataset.firstRow)].cells[col];
      };
      const press = (td) => {
        td.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerId: 1, isPrimary: true }));
        td.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, button: 0, pointerId: 1, isPrimary: true }));
        window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      };
      const type = async (text) => {
        const input = await $wait(() => document.querySelector(".cell-editor input"));
        input.value = text;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        $key("Enter", {}, input);
        await $pause(150);
      };
      const edit = async (row, col, text) => { const td = cell(row, col); press(td); await $pause(80); td.dispatchEvent(new MouseEvent("dblclick", { bubbles: true })); await $pause(120); await type(text); };
      await edit(43, 2, "emilia.silva@example.org");
      press(cell(48, 1)); await $pause(80); $key("Delete", { ctrl: true }, cell(48, 1)); await $pause(150);
      $key("i", { ctrl: true }, cell(48, 1)); await $pause(250);
      await type("Lucía Paredes"); await edit(50, 2, "lucia.paredes@example.com"); await edit(50, 3, "Quito");
      press(cell(50, 1)); await $pause(80); $key("i", { ctrl: true }, cell(50, 1)); await $pause(250);
      await type("Tomás Herrera"); await edit(51, 2, "tomas.herrera@example.com"); await edit(51, 3, "Lima");
      press(cell(46, 0)); await $pause(150);
      document.activeElement?.blur();
      return 1;
    })()`);
    await sleep(400);
    shot(`edit-${suffix}`);
    // El diálogo se abre con el botón de la barra: Ctrl+Enter sintético en la
    // grilla, además de abrirlo, aplica los cambios.
    await run(`(async () => {
      [...document.querySelectorAll("button.toolbar-button")].find((b) => /pending change|cambios? pendientes?/i.test(b.getAttribute("aria-label") || "")).click();
      await $wait(() => document.querySelector("dialog[open]"));
      await $pause(500);
      return 1;
    })()`);
    await sleep(300);
    shot(`review-${suffix}`);
  },

  async terminal(suffix) {
    await run(`(async () => {
      const row = await $wait(() => [...document.querySelectorAll(".row.leaf")].find((e) => e.textContent.trim() === "monthly-revenue.sql"));
      row.click();
      await $pause(800);
      if (!document.querySelector(".xterm")) $key("t", { ctrl: true }, $v().contentDOM);
      const ta = await $wait(() => document.querySelector(".xterm-helper-textarea"), 8000);
      await $pause(1500);
      for (const line of ["git log --oneline", "ls"]) {
        ta.focus();
        ta.value = line;
        ta.dispatchEvent(new InputEvent("input", { data: line, inputType: "insertText", bubbles: true }));
        await $pause(80);
        const enter = new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true, cancelable: true });
        Object.defineProperty(enter, "keyCode", { get: () => 13 });
        ta.dispatchEvent(enter);
        ta.value = "";
        await $pause(700);
      }
      await $pause(800);
      return 1;
    })()`);
    await sleep(300);
    shot(`terminal-${suffix}`);
  },

  async mosaic(suffix) {
    const q1 = "SELECT date_trunc('month', created_at)::date AS month,\n       count(*)   AS orders,\n       sum(total) AS revenue\nFROM shop.orders\nWHERE paid\nGROUP BY 1\nORDER BY 1;";
    const q2 = "SELECT c.city, count(*) AS orders, sum(o.total) AS revenue\nFROM shop.orders o\nJOIN shop.customers c ON c.id = o.customer_id\nWHERE o.paid\nGROUP BY c.city\nORDER BY revenue DESC;";
    const q3 = "SELECT p.name, sum(i.quantity * i.unit_price) AS revenue\nFROM shop.order_items i\nJOIN shop.products p ON p.id = i.product_id\nGROUP BY p.name\nORDER BY revenue DESC;";
    await run(`(async () => {
      const pin = () => [...document.querySelectorAll("button.toolbar-button")].find((b) => /^(Pin tab|Fijar)/i.test(b.getAttribute("aria-label") || "")).click();
      if (document.querySelector(".xterm")) { $key("t", { ctrl: true }, $views()[0].contentDOM); await $pause(500); }
      const v1 = $views()[0];
      $set(${JSON.stringify(q1)}, v1); $key("Enter", { ctrl: true }, v1.contentDOM); await $pause(1200);
      v1.focus(); $key("m", { ctrl: true, alt: true }, v1.contentDOM); await $pause(500);
      $key("Enter", {}, document.activeElement); await $pause(800);
      const v2 = $views().find((v) => v !== v1);
      $set(${JSON.stringify(q2)}, v2); $key("Enter", { ctrl: true }, v2.contentDOM); await $pause(1200);
      pin(); await $pause(300);
      const both = ${JSON.stringify(q2 + "\n\n" + q3)};
      $set(both, v2); v2.dispatch({ selection: { anchor: both.length } });
      $key("Enter", { ctrl: true }, v2.contentDOM); await $pause(1200);
      const td = document.querySelector(".grid-body-rows tbody td"); td.focus(); await $pause(150);
      $key("m", { ctrl: true, alt: true }, td); await $pause(500);
      $key("Enter", {}, document.activeElement); await $pause(800);
      document.activeElement?.blur();
      return 1;
    })()`);
    await sleep(300);
    shot(`mosaic-${suffix}`);
  },
};

const [command, ...args] = process.argv.slice(2);
if (command === "setup") await setup(args[0], args[1]);
else if (command === "split") await split(Number(args[0]));
else if (command === "scene" && scenes[args[0]]) await scenes[args[0]](args[1]);
else throw new Error(`orden desconocida: ${command} ${args.join(" ")}`);
process.exit(0);
