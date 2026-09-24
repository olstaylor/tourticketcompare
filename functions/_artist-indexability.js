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

// Artists promoted by the automated lane (`promotion_source: "auto"` in
// artists.json) have no human editorial judgement behind them, so their page is
// indexable only while it carries this many upcoming dates. Below it the page
// stays live as `noindex,follow` and leaves the sitemap — it is never demoted
// on this count. No record carries the marker until the auto-promote lane ships.
export const AUTO_PROMOTED_ARTIST_SOURCE = "auto";
export const AUTO_PROMOTED_MIN_UPCOMING_SHOWS = 3;

/**
 * How many upcoming (future-dated) shows the artist has, using the same
 * future-date filter as artistHasUpcomingShow().
 *
 * @param {Array<object>} events
 * @param {string} artistSlug
 * @param {number} [now]
 * @returns {number}
 */
export function countUpcomingShows(events, artistSlug, now = Date.now()) {
  const slug = normalizeSlug(artistSlug);
  if (!slug || !Array.isArray(events)) return 0;
  let count = 0;
  for (const ev of events) {
    if (!ev || typeof ev !== "object" || normalizeSlug(ev.artist_slug) !== slug) continue;
    const ts = Date.parse(String(ev.datetime_iso || ev.dateTimeISO || "").trim());
    if (Number.isFinite(ts) && ts >= now) count += 1;
  }
  return count;
}

/**
 * Is the artist page currently indexable? For an owner-promoted artist,
 * future-date availability does not remove the page from search: it is a
 * presentation state, not an indexability gate. An auto-promoted artist
 * additionally needs AUTO_PROMOTED_MIN_UPCOMING_SHOWS upcoming dates.
 *
 * The first argument is either the artists.json record or, for callers of the
 * previous API, its indexing_status string (which can never be auto-promoted).
 *
 * @param {object|string} artistOrStatus artists.json record, or indexing_status.
 * @param {Array<object>} events    Raw events.json records.
 * @param {string} [artistSlug]     Defaults to the record's slug.
 * @param {number} [now]
 * @returns {boolean}
 */
// An owner-promoted artist needs at least one tracked date, upcoming or past,
// to be indexable (owner-approved 2026-09-24). A page that has never carried a
// date says nothing but "no dates", which search engines classify as a soft
// 404; it stays live as noindex,follow and indexes the day its first date
// lands. A page whose tour has ended keeps its index entry and shows that
// tour's history instead.
export function countTrackedShows(events, artistSlug) {
  const slug = normalizeSlug(artistSlug);
  if (!slug || !Array.isArray(events)) return 0;
  let count = 0;
  for (const ev of events) {
    if (ev && typeof ev === "object" && normalizeSlug(ev.artist_slug) === slug) count += 1;
  }
  return count;
}

export function artistPageIndexable(artistOrStatus, events, artistSlug, now = Date.now()) {
  const record = artistOrStatus && typeof artistOrStatus === "object" ? artistOrStatus : null;
  const indexingStatus = record ? record.indexing_status : artistOrStatus;
  if (indexingStatus !== INDEXABLE_ARTIST_STATUS) return false;
  if (record?.promotion_source !== AUTO_PROMOTED_ARTIST_SOURCE) {
    const slug = artistSlug || record?.slug;
    // Callers without a slug (legacy status-string form) cannot be counted.
    return slug ? countTrackedShows(events, slug) > 0 : true;
  }
  return countUpcomingShows(events, artistSlug || record.slug, now) >= AUTO_PROMOTED_MIN_UPCOMING_SHOWS;
}
