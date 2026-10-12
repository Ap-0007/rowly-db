// Web de Rowly DB. Todo lo de aquí es una mejora: sin JavaScript la página se
// lee entera, sigue el tema del sistema y los enlaces de descarga funcionan.

const root = document.documentElement;

// --- Tema -------------------------------------------------------------------
// El script del <head> ya fijó data-theme antes de pintar (sin parpadeo). Aquí
// solo se cambia y se recuerda. Las capturas no se tocan: las dos variantes
// están en la misma celda y el CSS muestra la del tema activo.
const THEME_KEY = "rowly:theme";
const systemDark = matchMedia("(prefers-color-scheme: dark)");

function storedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function currentTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const next = theme === "dark" ? "light" : "dark";
    const label = button.dataset[next === "dark" ? "labelDark" : "labelLight"];
    if (label) button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(theme === "dark"));
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0B1A1D" : "#F5FAFA");
  giscusTheme(theme);
}

systemDark.addEventListener("change", () => {
  if (!storedTheme()) applyTheme(systemDark.matches ? "dark" : "light");
});

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Sin almacenamiento el cambio vale para esta visita.
    }
    applyTheme(next);
  });
});

// --- Sistema sugerido -------------------------------------------------------
// Solo sugiere el sistema; la arquitectura no se adivina y ningún paquete se
// presenta como preferido. En móviles o si no está claro, los botones siguen
// diciendo "Download".
function detectPlatform() {
  const ua = navigator.userAgent;
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return null;
  if (navigator.maxTouchPoints > 1 && /Mac/i.test(platform)) return null; // iPadOS
  if (/Win/i.test(platform)) return "windows";
  if (/Mac/i.test(platform)) return "macos";
  if (/Linux/i.test(platform) && !/CrOS/i.test(ua)) return "linux";
  return null;
}

const detected = detectPlatform();

if (detected) {
  const key = `label${detected[0].toUpperCase()}${detected.slice(1)}`;
  document.querySelectorAll("[data-cta]").forEach((cta) => {
    const label = cta.querySelector("[data-cta-label]");
    if (label && cta.dataset[key]) label.textContent = cta.dataset[key];
  });
  document.querySelector(`[data-platform="${detected}"]`)?.classList.add("is-suggested");
}

// --- Descarga en la barra -----------------------------------------------------
// Con la portada a la vista basta su botón; el de la barra aparece al bajar.
const heroCta = document.querySelector(".cover [data-cta]");
const barCta = document.querySelector(".bar-cta");
if (heroCta && barCta && "IntersectionObserver" in window) {
  root.classList.add("has-hero");
  new IntersectionObserver(([entry]) => barCta.classList.toggle("is-shown", !entry.isIntersecting)).observe(heroCta);
}

// --- Parallax de la portada -----------------------------------------------------
// Solo ahí hay capas reales: el texto se queda un poco atrás y la captura sube
// algo más rápido, como si estuviera por delante. Solo transform, solo
// mientras la portada se ve y nunca con movimiento reducido.
const cover = document.querySelector(".cover");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
if (cover && "IntersectionObserver" in window) {
  const text = [...cover.querySelectorAll(".cover-head > *")];
  const shot = cover.querySelector(".cover-shot");
  let visible = true;
  let frame = 0;
  const update = () => {
    frame = 0;
    if (reducedMotion.matches || !visible) {
      text.forEach((el) => (el.style.transform = ""));
      if (shot) shot.style.transform = "";
      return;
    }
    const y = Math.min(Math.max(scrollY, 0), cover.offsetHeight);
    const k = innerWidth < 600 ? 0.5 : 1;
    const back = `translate3d(0, ${Math.min(y * 0.12 * k, 40).toFixed(1)}px, 0)`;
    text.forEach((el) => (el.style.transform = back));
    if (shot) shot.style.transform = `translate3d(0, ${(-y * 0.06 * k).toFixed(1)}px, 0)`;
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    request();
  }).observe(cover);
  addEventListener("scroll", request, { passive: true });
  addEventListener("resize", request);
  reducedMotion.addEventListener("change", request);
  update();
}

// --- Pestañas accesibles ------------------------------------------------------
// Las de los comandos de instalación. Flechas, Inicio y Fin mueven el foco y
// activan la pestaña (patrón WAI-ARIA).
function setupTabs(list) {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  function select(index, focus) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i, false));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next < 0 ? last : next > last ? 0 : next, true);
    });
  });

  select(Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true")), false);
}

document.querySelectorAll('[role="tablist"]').forEach(setupTabs);

// --- Copiar comandos ------------------------------------------------------------
const live = document.querySelector(".live");

document.querySelectorAll("[data-copy]").forEach((button) => {
  const label = button.textContent;
  button.addEventListener("click", async () => {
    const text = button.parentElement.querySelector("pre").textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = button.dataset.done || "Copied";
      if (live) live.textContent = live.dataset.copied;
    } catch {
      if (live) live.textContent = live.dataset.failed;
    }
    setTimeout(() => {
      button.textContent = label;
    }, 2000);
  });
});

// --- Menú móvil -----------------------------------------------------------------
// Al elegir un enlace el menú se cierra; Escape también.
const menu = document.querySelector(".menu");
if (menu) {
  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) menu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
}

// --- Pestañas de área -----------------------------------------------------------
// En pantallas estrechas, la elegida a la vista.
document.querySelector('.area-tab[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });

// --- Giscus -----------------------------------------------------------------------
// Una instancia por página de conversación. La configuración llega en los
// data-* del contenedor (los escribe render-site.py desde site/community.json);
// el script se carga desde giscus.app con el tema activo, y al cambiar el tema
// se le avisa con setConfig, sin recargar.
const comments = document.querySelector(".comments[data-repo-id]");

function giscusThemeUrl(theme) {
  return comments?.dataset[theme === "dark" ? "themeDark" : "themeLight"];
}

function giscusTheme(theme) {
  const frame = document.querySelector("iframe.giscus-frame");
  const url = giscusThemeUrl(theme);
  if (frame && url) frame.contentWindow.postMessage({ giscus: { setConfig: { theme: url } } }, "https://giscus.app");
}

if (comments) {
  const config = comments.dataset;
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  Object.entries({
    repo: config.repo,
    repoId: config.repoId,
    category: config.category,
    categoryId: config.categoryId,
    mapping: "pathname",
    strict: "1",
    reactionsEnabled: "0",
    emitMetadata: "1",
    inputPosition: "top",
    theme: giscusThemeUrl(currentTheme()),
    lang: config.lang,
    loading: "lazy",
  }).forEach(([name, value]) => (script.dataset[name] = value));
  comments.querySelector(".comments-fallback")?.remove();
  comments.classList.add("giscus");
  comments.append(script);

  // Con la discusión creada, el enlace de imágenes lleva a ella en GitHub.
  const discussionLink = document.querySelector("[data-discussion-link]");
  addEventListener("message", (event) => {
    if (event.origin !== "https://giscus.app") return;
    const url = event.data?.giscus?.discussion?.url;
    if (url && discussionLink) discussionLink.href = url;
  });
}

applyTheme(storedTheme() || currentTheme());
