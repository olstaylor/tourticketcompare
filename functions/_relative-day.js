// @ts-check
// "Today" / "Tomorrow" for a show, read in the venue's own time zone.
//
// Every sale traced to a Sub ID so far (Don Omar Rosemont, Fuerza Regida
// Wheatland, Rawayana Chicago) was a click on a show the next day, from a
// phone. The soonest date is already what artist and price-guide pages lead
// with; this names it the way that buyer thinks about it. "Today" is always
// the venue's today: from its IANA zone, or else from the offset the start
// time carries. With neither, there is no word. Price guides are held in the
// edge cache, so nextVenueMidnightMs bounds a render that carries a word.

const DAY_MS = 86400000;
const OFFSET_RE = /([+-])(\d{2}):?(\d{2})$/;

/** @param {string} timeZone */
function validZone(timeZone) {
  if (!timeZone) return "";
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone });
    return timeZone;
  } catch {
    return "";
  }
}

/**
 * The venue's clock: its IANA zone, or the fixed offset on the start time.
 * @param {string} raw @param {string} timezone
 * @returns {{ tz: string } | { offsetMin: number } | null}
 */
function venueClock(raw, timezone) {
  const tz = validZone(String(timezone || "").trim());
  if (tz) return { tz };
  const match = /Z$/i.test(raw) ? null : raw.match(OFFSET_RE);
  if (!match) return null;
  const sign = match[1] === "-" ? -1 : 1;
  return { offsetMin: sign * (Number(match[2]) * 60 + Number(match[3])) };
}

/** Venue-local wall-clock time of an instant, as if it were UTC. */
function wallMs(ms, clock) {
  if ("offsetMin" in clock) return ms + clock.offsetMin * 60000;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: clock.tz, hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).formatToParts(new Date(ms)).map((part) => [part.type, part.value])
  );
  return Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`) + (ms % 1000);
}

function dayOf(ms, clock) {
  return new Date(wallMs(ms, clock)).toISOString().slice(0, 10);
}

/**
 * @param {string} iso show start (UTC instant ending in Z, or venue wall clock with or without offset)
 * @param {string} timezone IANA venue time zone
 * @param {number} [now]
 * @returns {"Today" | "Tomorrow" | ""}
 */
export function relativeShowDay(iso, timezone, now = Date.now()) {
  const raw = String(iso || "").trim();
  if (!raw) return "";
  const clock = venueClock(raw, timezone);
  if (!clock) return "";
  let showDay = "";
  if (/Z$/i.test(raw)) {
    const show = Date.parse(raw);
    if (!Number.isFinite(show)) return "";
    showDay = dayOf(show, clock);
  } else {
    // A wall-clock start already names the venue's date.
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(raw) || !Number.isFinite(Date.parse(`${raw.slice(0, 10)}T00:00:00Z`))) return "";
    showDay = raw.slice(0, 10);
  }
  const today = dayOf(now, clock);
  const tomorrow = new Date(Date.parse(`${today}T00:00:00Z`) + DAY_MS).toISOString().slice(0, 10);
  if (showDay === today) return "Today";
  if (showDay === tomorrow) return "Tomorrow";
  return "";
}

/**
 * The next venue-local midnight after now, when "Today"/"Tomorrow" flips.
 * NaN when the venue's clock is unknown (no word is shown then either).
 * @param {string} iso @param {string} timezone @param {number} [now]
 */
export function nextVenueMidnightMs(iso, timezone, now = Date.now()) {
  const clock = venueClock(String(iso || "").trim(), timezone);
  if (!clock) return Number.NaN;
  const wall = wallMs(now, clock);
  const nextWallMidnight = Date.parse(`${new Date(wall).toISOString().slice(0, 10)}T00:00:00Z`) + DAY_MS;
  return now + (nextWallMidnight - wall);
}
