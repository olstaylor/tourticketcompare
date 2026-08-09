// Shared artist-page indexability gate.
//
// An artist page (/artists/<slug>) remains a durable destination even when its
// artist has no upcoming shows. That page renders an explicit empty state.
// Future-date availability is presentation state, not a reason to delete or
// noindex the artist URL; the same URL fills again when a future event is added.
//
// This module is the single source of truth for future-date state used by the
// presentation layer.

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
 * genuine unique content even if its CTA is suppressed. A zero-date board is
 * still a valid artist page with an explicit empty state.
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
 * Split catalog artists into the two presentation sections used by the
 * homepage and artist index. `now` is injectable so rollover behaviour is
 * tested without relying on the wall clock.
 */
export function splitArtistsByUpcoming(artists, events, now = Date.now()) {
  const primary = [];
  const secondary = [];
  for (const artist of Array.isArray(artists) ? artists : []) {
    (artistHasUpcomingShow(events, artist?.slug, now) ? primary : secondary).push(artist);
  }
  return { primary, secondary };
}

/**
 * Is the artist page currently indexable? Future-date availability does not
 * remove the page from search: it is a presentation state, not an indexability
 * gate. Extra arguments are retained for callers of the previous API.
 *
 * @param {string} indexingStatus   artists.json indexing_status.
 * @param {Array<object>} events    Raw events.json records.
 * @param {string} artistSlug
 * @param {number} [now]
 * @returns {boolean}
 */
export function artistPageIndexable(indexingStatus, events, artistSlug, now = Date.now()) {
  void events;
  void artistSlug;
  void now;
  return indexingStatus === INDEXABLE_ARTIST_STATUS;
}
