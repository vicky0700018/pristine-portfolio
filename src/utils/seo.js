// Updates document metadata with standard browser APIs (no SEO library).
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

export function applySeo(seo, pageTitle) {
  if (typeof document === "undefined" || !seo) return;
  document.title = pageTitle ? `${pageTitle} | ${seo.siteTitle}` : seo.homeTitle || seo.siteTitle;
  setMeta("name", "description", seo.metaDescription);
  setMeta("property", "og:title", seo.ogTitle);
  setMeta("property", "og:description", seo.ogDescription);
  if (seo.favicon) {
    let link = document.head.querySelector('link[rel="icon"]');
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = seo.favicon;
  }
}
