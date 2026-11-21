// Ticketmaster and SeatGeek answer the audit runner 403 for every storefront URL,
// so the link check can never open them. An artist used to be held for that alone.
// A blocked URL is treated as confirmed here ONLY when an authenticated API check
// of the very same event is on record; anything short of that stays blocked.
//
//   ticketmaster  the URL carries the event's own ticketmaster_event_id, and that
//                 day's Discovery API audit (tm.json) fetched the event and found it
//                 neither missing, changed, errored nor unresolvable. The URL itself
//                 is not opened, so this confirms the event, not the page.
//   seatgeek      provider_links.seatgeek is `verified` for this exact URL, stamped
//                 by the SeatGeek API verifier (verify-seatgeek-events.mjs) within
//                 SEATGEEK_MAX_AGE_DAYS of the audit day.
//
// Only upcoming events qualify. No new date is ever written for an event.

export const SEATGEEK_MAX_AGE_DAYS = 3;

function dayNumber(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || ''));
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000 : null;
}

export function buildTmFindingIds(tm) {
  const ids = new Set();
  for (const artist of tm?.artists || []) {
    for (const key of ['missing', 'changed', 'errors', 'unresolvable']) {
      for (const item of artist[key] || []) if (item?.id) ids.add(item.id);
    }
  }
  return ids;
}

export function isApiConfirmed(entry, { eventsById, tmFindingIds, today }) {
  if (entry?.reviewScope !== 'upcoming') return false;
  if (entry.provider !== 'ticketmaster' && entry.provider !== 'seatgeek') return false;
  const eventIds = Array.isArray(entry.eventIds) ? entry.eventIds : [];
  if (!eventIds.length || !entry.url) return false;
  const todayNumber = dayNumber(today);
  return eventIds.every((id) => {
    const event = eventsById.get(id);
    if (!event) return false;
    if (entry.provider === 'ticketmaster') {
      const tmId = String(event.ticketmaster_event_id || '').trim();
      return Boolean(tmId) && entry.url.includes(tmId) && !tmFindingIds.has(id);
    }
    const link = event.provider_links?.seatgeek;
    if (!link || link.verified !== true || link.url !== entry.url) return false;
    const checked = dayNumber(link.last_verified_at);
    return checked !== null && todayNumber !== null && todayNumber - checked >= 0 && todayNumber - checked <= SEATGEEK_MAX_AGE_DAYS;
  });
}
