/* Alternancia manual de tema (padrao segue o sistema; escolha fica em localStorage). */
(function () {
  "use strict";

  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function apply(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      const isDark = theme === "dark" || (theme !== "light" && systemPrefersDark());
      btn.textContent = isDark ? "☀" : "☾";
      btn.setAttribute("aria-label", isDark ? "Mudar para tema claro" : "Mudar para tema escuro");
    }
  }

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    apply(stored);
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const current = localStorage.getItem(STORAGE_KEY) || (systemPrefersDark() ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
