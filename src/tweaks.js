const TWEAK_DEFAULTS = { theme: "light", accentHue: 70 };

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

window.addEventListener("message", ev => {
  const d = ev.data || {};
  if (d.type === "__activate_edit_mode")   document.getElementById("tweaks").classList.add("is-open");
  if (d.type === "__deactivate_edit_mode") document.getElementById("tweaks").classList.remove("is-open");
});

requestAnimationFrame(() => window.parent.postMessage({ type: "__edit_mode_available" }, "*"));

document.addEventListener("DOMContentLoaded", () => {
  wireTweaks();
  applyState();
});
