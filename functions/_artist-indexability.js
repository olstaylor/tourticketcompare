// Shared artist-page indexability gate.
//
// An artist page (/artists/<slug>) is a "tickets and tour dates" page. When the
// artist has no upcoming shows, that page renders an empty board with no dates
// and no event ticket links — thin, doorway-like content for the query it
// targets. Following the same self-healing pattern the city and venue
// aggregations already use (functions/_cities.js / _venues.js), an artist page
// is treated as indexable only when BOTH hold right now:
//
//   1. its editorial record is marked indexable_with_substantial_content, and
//   2. it currently has at least one upcoming show.
//
// The moment a new verified date lands (via the nightly discovery lanes) the
// page flips back to index,follow and re-enters the sitemap automatically; the
// moment the last date passes it drops to noindex,follow and leaves the
// sitemap. No data is invented and no manual list is maintained — the gate is
// derived from the same reviewed events.json every other page type reads.
//
// This module is the single source of truth for that gate so the router (robots
// meta in functions/[[path]].js) and the sitemap (functions/sitemap.xml.js)
// cannot drift — scripts/audit-internal-links.mjs --check fails CI if a page's
// robots state ever disagrees with its sitemap membership.

export const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

// Local slug normaliser mirroring slugify() in functions/[[path]].js. Kept
// inline so this module has no import dependency on the router.
function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Does the artist have at least one upcoming (future-dated) reviewed show?
 * Mirrors the future-date filter in futureShowsForArtist(): a parseable
 * datetime_iso at or after `now`. Publishability is deliberately NOT required —
 * a future date still renders a real card with city/venue/date, which is
 * genuine unique content even if its CTA is suppressed. Only a truly empty
 * board (zero upcoming shows) downgrades the page.
 *
 * @param {Array<object>} events    Raw events.json records.
 * @param {string} artistSlug
 * @param {number} [now]            Reference epoch ms (defaults to Date.now()).
 * @returns {boolean}
 */
export function artistHasUpcomingShow(events, artistSlug, now = Date.now()) {
  const slug = normalizeSlug(artistSlug);
  if (!slug || !Array.isArray(events)) return false;
  return events.some((ev) => {
    if (!ev || typeof ev !== "object" || normalizeSlug(ev.artist_slug) !== slug) return false;
    const iso = String(ev.datetime_iso || ev.dateTimeISO || "").trim();
    const ts = Date.parse(iso);
    return Number.isFinite(ts) && ts >= now;
  });
}

/**
 * Is the artist page currently indexable? True only when the editorial record
 * is indexable_with_substantial_content AND the artist has an upcoming show.
 *
 * @param {string} indexingStatus   artists.json indexing_status.
 * @param {Array<object>} events    Raw events.json records.
 * @param {string} artistSlug
 * @param {number} [now]
 * @returns {boolean}
 */
export function artistPageIndexable(indexingStatus, events, artistSlug, now = Date.now()) {
  return indexingStatus === INDEXABLE_ARTIST_STATUS && artistHasUpcomingShow(events, artistSlug, now);
}
