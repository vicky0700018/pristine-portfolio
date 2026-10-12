// Centralised browser localStorage utilities for the frontend-only demo.
import { initialData, DATA_VERSION } from "../data/initialData";

export const STORAGE_KEY = "caspira_demo_data_v1";

const clone = (v) => JSON.parse(JSON.stringify(v));
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

export function getDefaults() {
  return clone(initialData);
}

/** Merge stored data onto defaults so missing / malformed keys fall back safely. */
export function normalizeData(raw) {
  const base = getDefaults();
  if (!isObj(raw)) return base;
  const out = { ...base };
  for (const key of Object.keys(base)) {
    const def = base[key];
    const val = raw[key];
    if (Array.isArray(def)) out[key] = Array.isArray(val) ? val.filter(isObj) : def;
    else if (isObj(def)) out[key] = isObj(val) ? { ...def, ...val } : def;
    else out[key] = val ?? def;
  }
  // nested arrays inside objects
  for (const [k, sub] of [["about", "sections"], ["about", "values"], ["manufacturing", "steps"], ["quality", "sections"], ["quality", "certifications"]]) {
    if (!Array.isArray(out[k][sub])) out[k][sub] = base[k][sub];
  }
  out.version = DATA_VERSION;
  return out;
}

export function loadData() {
  try {
    const text = window.localStorage.getItem(STORAGE_KEY);
    if (!text) return getDefaults();
    return normalizeData(JSON.parse(text));
  } catch {
    return getDefaults();
  }
}

export function saveData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearData() {
  try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

/** Validates an imported backup. Returns { ok, error }. */
export function validateBackup(obj) {
  if (!isObj(obj)) return { ok: false, error: "File does not contain a JSON object." };
  const required = { settings: "object", seo: "object", products: "array", gallery: "array", announcements: "array" };
  for (const [k, t] of Object.entries(required)) {
    if (t === "array" ? !Array.isArray(obj[k]) : !isObj(obj[k])) return { ok: false, error: `Missing or invalid "${k}" section.` };
  }
  if (obj.products.some((p) => !isObj(p) || typeof p.name !== "string" || !p.id)) return { ok: false, error: "One or more products are invalid." };
  if (obj.gallery.some((g) => !isObj(g) || !g.id)) return { ok: false, error: "One or more gallery items are invalid." };
  return { ok: true };
}

export function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export const uid = (prefix = "id") => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
