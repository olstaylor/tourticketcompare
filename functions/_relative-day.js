// @ts-check
// "Today" / "Tomorrow" for a show, read in the venue's own time zone.
//
// Every sale traced to a Sub ID so far (Don Omar Rosemont, Fuerza Regida
// Wheatland, Rawayana Chicago) was a click on a show the next day, from a
// phone. The soonest date is already what artist and price-guide pages lead
// with; this names it the way that buyer thinks about it. HTML routes are
// rendered per request (no edge cache), so the label is computed from the
// request time and cannot go stale.

/** @param {Date} date @param {string} timeZone */
function localDay(date, timeZone) {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  } catch {
    return "";
  }
}

/**
 * @param {string} iso show start (UTC instant ending in Z, or a wall-clock string)
 * @param {string} timezone IANA venue time zone
 * @param {number} [now]
 * @returns {"Today" | "Tomorrow" | ""}
 */
export function relativeShowDay(iso, timezone, now = Date.now()) {
  const raw = String(iso || "").trim();
  if (!raw) return "";
  const zoned = /Z$/.test(raw);
  const tz = zoned ? String(timezone || "").trim() : "UTC";
  if (!tz) return "";
  const show = zoned ? new Date(raw) : new Date(`${raw.replace(/[+-]\d{2}:?\d{2}$/, "")}Z`);
  if (!Number.isFinite(show.getTime())) return "";
  const showDay = zoned ? localDay(show, tz) : raw.slice(0, 10);
  const today = localDay(new Date(now), zoned ? tz : "UTC");
  const tomorrow = localDay(new Date(Date.parse(`${today}T12:00:00Z`) + 86400000), "UTC");
  if (!showDay || !today) return "";
  if (showDay === today) return "Today";
  if (showDay === tomorrow) return "Tomorrow";
  return "";
}
