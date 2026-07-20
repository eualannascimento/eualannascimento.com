/* Renderiza listas de dados estruturados (CertifData/SetupData) no DOM */
const SiteRender = (function () {
  "use strict";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderEntry(item) {
    const parts = [];
    if (item.badge) parts.push('<span class="badge-chip">' + escapeHtml(item.badge) + "</span>");
    if (item.date) parts.push("<strong>" + escapeHtml(item.date) + "</strong>: ");
    parts.push(escapeHtml(item.text));
    if (item.evidence) {
      const icon = item.evidence.type === "link" ? "🔗" : "📄";
      const href = escapeHtml(item.evidence.href);
      parts.push(' <a href="' + href + '"' + (item.evidence.type === "link" ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + icon + "</a>");
    }
    return "<li>" + parts.join("") + "</li>";
  }

  function renderEntries(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map(renderEntry).join("");
  }

  function renderPlainList(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map((text) => "<li>" + escapeHtml(text) + "</li>").join("");
  }

  return { renderEntries, renderPlainList, renderEntry, escapeHtml };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = SiteRender;
}
