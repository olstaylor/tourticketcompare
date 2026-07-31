// Single source of truth for the dynamic route-usefulness policy.
//
// Every dynamic route type on this site (artist, city, venue, artist-city) is
// generated from the same reviewed `events.json` records, so without one shared
// rule the router, the sitemap, llms.txt, the internal-link audit, the roster
// forecast and the indexable-surface monitor would each drift into their own
// idea of which URLs deserve to be indexed. This module holds the thresholds,
// the shared publishability test, and the machine-readable exclusion reasons so
// all of them read the same decision.
//
// The policy itself — what each threshold is for, and why a route that misses
// it is kept accessible rather than redirected — is documented in
// docs/ROUTE_INDEXABILITY_POLICY.md. Change both together.
//
// Design rules this module exists to enforce:
//
//   1. Indexability is *derived*, never a maintained list. A route qualifies or
//      stops qualifying purely because its underlying event data changed, so
//      expiry self-heals in both directions.
//   2. A route that fails a gate is still a real page for a real visitor. The
//      gate controls robots meta and sitemap membership only; it never removes
//      content a visitor arrived for.
//   3. Every gate is about usefulness that can be checked against data —
//      distinct upcoming inventory and a reachable ticket destination. There is
//      deliberately no word-count threshold: padding a page to clear one would
//      be filler, which the content rules forbid.
//
// This module imports nothing, so it can be imported from any of the shared
// derivations without a cycle.

// ---------------------------------------------------------------------------
// Thresholds
// ---------------------------------------------------------------------------

// A city page answers "who is playing <city>". It needs enough breadth to be
// more than a restatement of one artist page or one venue page.
export const CITY_MIN_SHOWS = 4;
export const CITY_MIN_ARTISTS = 2;

// A venue page answers "what is on at <venue>". Venues turn over faster than
// cities and a venue query is narrower, so the bar is a little lower.
export const VENUE_MIN_SHOWS = 3;
export const VENUE_MIN_ARTISTS = 2;

// An artist-city page answers "<artist> tickets in <city>". With a single date
// it is the artist page filtered to one show card and holds no fact the artist
// page does not already carry, so it is only indexable for a genuine multi-date
// city run. Single-date combinations stay reachable and `noindex,follow` —
// see docs/ROUTE_INDEXABILITY_POLICY.md § Artist-city.
export const ARTIST_CITY_MIN_SHOWS = 2;

// ---------------------------------------------------------------------------
// Event publishability
// ---------------------------------------------------------------------------

// Mirrors eventLinkPublishable() in functions/[[path]].js and the equivalent
// gate in functions/api/out.js and public/app.js. A route whose upcoming shows
// are all CTA-suppressed can list dates but cannot lead anywhere, so it cannot
// serve the comparison purpose its title promises.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

/**
 * Does this reviewed event currently carry a publishable ticket destination?
 *
 * @param {any} event Raw events.json record.
 * @returns {boolean}
 */
export function eventPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

// ---------------------------------------------------------------------------
// Gate decisions
// ---------------------------------------------------------------------------

// Stable machine-readable exclusion reasons. `npm run audit:indexable-surface`
// groups non-indexable routes by these, so renaming one changes a reported
// figure — add a new code rather than repurposing an existing one.
export const EXCLUSION_REASONS = Object.freeze({
  NO_UPCOMING_SHOWS: "no_upcoming_shows",
  BELOW_SHOW_THRESHOLD: "below_show_threshold",
  BELOW_ARTIST_THRESHOLD: "below_artist_threshold",
  NO_PUBLISHABLE_DESTINATION: "no_publishable_destination",
  ARTIST_NOT_EDITORIALLY_INDEXABLE: "artist_not_editorially_indexable"
});

/**
 * @typedef {Object} GateDecision
 * @property {boolean} indexable
 * @property {string[]} reasons Empty when indexable; otherwise every failed gate.
 */

/**
 * City-page gate.
 *
 * @param {{ showCount: number, artistCount: number, publishableCount: number }} city
 * @returns {GateDecision}
 */
export function cityGate(city) {
  const reasons = [];
  if (!city?.showCount) reasons.push(EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  else if (city.showCount < CITY_MIN_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD);
  if ((city?.artistCount || 0) < CITY_MIN_ARTISTS) reasons.push(EXCLUSION_REASONS.BELOW_ARTIST_THRESHOLD);
  if (!(city?.publishableCount > 0)) reasons.push(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION);
  return { indexable: reasons.length === 0, reasons };
}

/**
 * Venue-page gate.
 *
 * @param {{ showCount: number, artistCount: number, publishableCount: number }} venue
 * @returns {GateDecision}
 */
export function venueGate(venue) {
  const reasons = [];
  if (!venue?.showCount) reasons.push(EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  else if (venue.showCount < VENUE_MIN_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD);
  if ((venue?.artistCount || 0) < VENUE_MIN_ARTISTS) reasons.push(EXCLUSION_REASONS.BELOW_ARTIST_THRESHOLD);
  if (!(venue?.publishableCount > 0)) reasons.push(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION);
  return { indexable: reasons.length === 0, reasons };
}

/**
 * Artist-city gate — the data-derived half only. The caller applies the
 * editorial half (is the artist itself indexable_with_substantial_content?),
 * exactly as it already does for the artist page.
 *
 * @param {{ showCount: number, publishableCount: number }} artistCity
 * @returns {GateDecision}
 */
export function artistCityGate(artistCity) {
  const reasons = [];
  const publishable = artistCity?.publishableCount || 0;
  if (!artistCity?.showCount) reasons.push(EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  if (publishable < 1) reasons.push(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION);
  else if (publishable < ARTIST_CITY_MIN_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD);
  return { indexable: reasons.length === 0, reasons };
}
