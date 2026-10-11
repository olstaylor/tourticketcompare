// The one definition of "upcoming" for every page that lists dates: a show is
// upcoming while its start instant is at or after the request time. Artist,
// city, venue and compare-hub boards all filter through this, so "Prices on
// upcoming shows" can never disagree with an artist page about whether a date
// has passed (owner review, 2026-10-06). Tests pass a fixed `now`.
//
// The start instant is read in the venue's own clock (2026-10-10). About 2% of
// stored datetimes are naive venue wall times ("2026-07-06T20:00:00") with an
// IANA timezone beside them. A bare Date.parse reads those in the host's zone,
// which is UTC on Workers, so a 20:00 New York show vanished four hours before
// doors and a 21:00 Madrid show stayed "upcoming" two hours after it started.
// eventInstantMs resolves them through the stored zone, the same resolution
// the provider matchers use.
import { eventInstantMs } from "./_event-local-date.js";

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function rawStart(show) {
  return String(show?.dateTimeISO || show?.datetime_iso || "").trim();
}

/**
 * Start instant in ms, or NaN when the stored datetime does not parse.
 *
 * Zoned values and naive wall times with an IANA timezone resolve exactly. A
 * date-only value (time TBA) counts until the end of that calendar day, so a
 * show is never dropped on its own day for want of a door time. Anything else
 * falls back to Date.parse, as before.
 */
export function showStartMs(show) {
  const raw = rawStart(show);
  if (!raw) return Number.NaN;
  const exact = eventInstantMs({ datetime_iso: raw, timezone: show?.timezone });
  if (exact !== null) return exact;
  if (DATE_ONLY_RE.test(raw)) {
    const midnight = Date.parse(`${raw}T00:00:00Z`);
    return Number.isFinite(midnight) ? midnight + DAY_MS - 1 : Number.NaN;
  }
  return Date.parse(raw);
}

/** True while the show has not started. Unparseable dates are never upcoming. */
export function isUpcomingShow(show, now = Date.now()) {
  const start = showStartMs(show);
  return Number.isFinite(start) && start >= now;
}
