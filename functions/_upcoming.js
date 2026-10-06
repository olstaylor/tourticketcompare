// The one definition of "upcoming" for every page that lists dates: a show is
// upcoming while its start instant is at or after the request time. Artist,
// city, venue and compare-hub boards all filter through this, so "Prices on
// upcoming shows" can never disagree with an artist page about whether a date
// has passed (owner review, 2026-10-06). Tests pass a fixed `now`.

/** Start instant in ms, or NaN when the stored datetime does not parse. */
export function showStartMs(show) {
  return Date.parse(String(show?.dateTimeISO || show?.datetime_iso || "").trim());
}

/** True while the show has not started. Unparseable dates are never upcoming. */
export function isUpcomingShow(show, now = Date.now()) {
  const start = showStartMs(show);
  return Number.isFinite(start) && start >= now;
}
