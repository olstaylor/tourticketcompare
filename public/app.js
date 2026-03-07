const yearEl = document.getElementById("currentYear");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
