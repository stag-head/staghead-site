/* =========================================================
   Stag Head — app controller (V2 as Home + About)
   ========================================================= */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accentHue": 70
}/*EDITMODE-END*/;

const ACCENTS = [
  { name: "Amber",  hue: 70,  swatch: "oklch(0.72 0.14 70)"  },
  { name: "Copper", hue: 45,  swatch: "oklch(0.72 0.14 45)"  },
  { name: "Moss",   hue: 140, swatch: "oklch(0.72 0.12 140)" },
  { name: "Sky",    hue: 230, swatch: "oklch(0.72 0.12 230)" },
  { name: "Plum",   hue: 320, swatch: "oklch(0.72 0.12 320)" }
];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("sh.tweaks") || "null");
    return { ...TWEAK_DEFAULTS, ...(saved || {}) };
  } catch (e) { return { ...TWEAK_DEFAULTS }; }
}
function saveState(s) { localStorage.setItem("sh.tweaks", JSON.stringify(s)); }

let state = loadState();

function applyState() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.style.setProperty("--accent-h", state.accentHue);

  document.querySelectorAll("#themeToggle button").forEach(b => {
    b.classList.toggle("is-active", b.dataset.themeVal === state.theme);
  });
  document.querySelectorAll(".sw").forEach(sw => {
    sw.classList.toggle("is-active", +sw.dataset.hue === +state.accentHue);
  });
}

function buildSwatches() {
  const wrap = document.getElementById("accentSwatches");
  if (!wrap) return;
  wrap.innerHTML = "";
  ACCENTS.forEach(a => {
    const b = document.createElement("button");
    b.className = "sw";
    b.dataset.hue = a.hue;
    b.style.background = a.swatch;
    b.title = a.name;
    b.addEventListener("click", () => {
      state.accentHue = a.hue;
      saveState(state);
      applyState();
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { accentHue: a.hue } }, "*");
    });
    wrap.appendChild(b);
  });
}

function wireTweaks() {
  document.querySelectorAll("#themeToggle button").forEach(b => {
    b.addEventListener("click", () => {
      state.theme = b.dataset.themeVal;
      saveState(state);
      applyState();
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { theme: state.theme } }, "*");
    });
  });
  buildSwatches();
}

window.addEventListener("message", (ev) => {
  const d = ev.data || {};
  if (d.type === "__activate_edit_mode") {
    document.getElementById("tweaks").classList.add("is-open");
  } else if (d.type === "__deactivate_edit_mode") {
    document.getElementById("tweaks").classList.remove("is-open");
  }
});
requestAnimationFrame(() => {
  window.parent.postMessage({ type: "__edit_mode_available" }, "*");
});

const routes = ["home", "about", "akahu-marketing", "akahu-consumer", "akahu-setup"];

function render(route) {
  if (!routes.includes(route)) route = "home";
  routes.forEach(r => {
    const el = document.getElementById("route-" + r);
    if (el) el.classList.toggle("is-active", r === route);
  });
  document.querySelectorAll(".nav-variants a").forEach(a => {
    a.classList.toggle("is-active", a.dataset.route === route);
  });
  localStorage.setItem("sh.route", route);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function routeFromHash() {
  const h = (location.hash || "").replace("#", "");
  return routes.includes(h) ? h : (localStorage.getItem("sh.route") || "home");
}

window.addEventListener("hashchange", () => render(routeFromHash()));

document.addEventListener("DOMContentLoaded", () => {
  if (window.SH_Monolith)        document.getElementById("route-home").innerHTML           = window.SH_Monolith();
  if (window.SH_About)           document.getElementById("route-about").innerHTML          = window.SH_About();
  if (window.SH_AkahuMarketing)  document.getElementById("route-akahu-marketing").innerHTML = window.SH_AkahuMarketing();
  if (window.SH_AkahuConsumer)   document.getElementById("route-akahu-consumer").innerHTML = window.SH_AkahuConsumer();
  if (window.SH_AkahuSetup)     document.getElementById("route-akahu-setup").innerHTML     = window.SH_AkahuSetup();

  wireTweaks();
  applyState();

  if (!location.hash) {
    const last = localStorage.getItem("sh.route") || "home";
    location.hash = "#" + last;
  } else {
    render(routeFromHash());
  }

  document.body.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#contact"]');
    if (!a) return;
    e.preventDefault();
    const active = document.querySelector(".route.is-active");
    const target = active && active.querySelector('[data-contact]');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});
