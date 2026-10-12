// Shared navigation helpers.
export const PUBLIC_PATHS = ["/", "/about", "/products", "/manufacturing", "/quality", "/gallery", "/contact"];

export function isActivePath(current, path) {
  if (path === "/") return current === "/";
  return current === path || current.startsWith(path + "/");
}

export function telHref(phone) {
  return `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
}

export function contactHref(settings) {
  const digits = String(settings.phone || "").replace(/[^\d]/g, "");
  if (settings.contactAction === "whatsapp" && digits) return `https://wa.me/${digits}`;
  if (settings.contactAction === "email") return `mailto:${settings.email}`;
  return telHref(settings.phone);
}

export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
