const yearEl = document.getElementById("currentYear");
const lastUpdatedEl = document.getElementById("lastUpdated");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (lastUpdatedEl) {
  lastUpdatedEl.textContent = new Date(document.lastModified).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
