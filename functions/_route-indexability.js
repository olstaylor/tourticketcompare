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

// The on-sale calendar (/on-sale) answers "what goes on sale soon". It lists
// Ticketmaster public on-sale times already carried on reviewed events, so it
// is only worth indexing while it lists more than one artist's run.
export const ONSALE_CALENDAR_MIN_SHOWS = 3;
export const ONSALE_CALENDAR_MIN_ARTISTS = 2;

// An artist price guide (/artists/<artist>/ticket-prices) answers "how much are
// <artist> tickets". It only says something the artist page does not when it
// covers a genuine run of dates in more than one city, and when enough of those
// dates can carry a listed-price snapshot at all (verified provenance on a
// snapshot lane). Below that it is the artist page with fewer buttons, so it
// renders noindex,follow — see docs/ROUTE_INDEXABILITY_POLICY.md § Price guide.
export const PRICE_GUIDE_MIN_SHOWS = 6;
export const PRICE_GUIDE_MIN_CITIES = 2;
export const PRICE_GUIDE_MIN_SNAPSHOT_READY_SHOWS = 3;

// ---------------------------------------------------------------------------
// Event lifecycle (Ticketmaster status)
// ---------------------------------------------------------------------------

// `ticketmaster_status_code` carries the verbatim Discovery API
// `dates.status.code` for an event whose Ticketmaster status is not a normal
// sale state. The nightly field-sync (scripts/apply-tm-updates.mjs) writes it
// from the event's own Discovery record and removes it when Ticketmaster
// reports the event on sale again. Absent means nothing is known against the
// event — the existing sale-state rules (`status`, `public_onsale_at`) apply
// unchanged. It is a separate field from `status`, which is TTC's own sale
// state and stays within its validated enum.
export const TICKETMASTER_STATUS_FIELD = "ticketmaster_status_code";

export const EVENT_LIFECYCLE = Object.freeze({
  SCHEDULED: "scheduled",
  CANCELLED: "cancelled",
  POSTPONED: "postponed",
  RESCHEDULED: "rescheduled",
  UNRECOGNISED: "unrecognised"
});

/**
 * The event's lifecycle as stored. Ticketmaster spells cancellation both ways.
 * A stored value this module does not recognise is reported as such, and is
 * treated as a hold below: an unknown status must fail closed, not open.
 *
 * @param {any} event
 * @returns {string} One of EVENT_LIFECYCLE.
 */
export function eventLifecycle(event) {
  const code = String(event?.[TICKETMASTER_STATUS_FIELD] ?? "").trim().toLowerCase();
  if (!code || code === "onsale") return EVENT_LIFECYCLE.SCHEDULED;
  if (code === "cancelled" || code === "canceled") return EVENT_LIFECYCLE.CANCELLED;
  if (code === "postponed") return EVENT_LIFECYCLE.POSTPONED;
  if (code === "rescheduled") return EVENT_LIFECYCLE.RESCHEDULED;
  return EVENT_LIFECYCLE.UNRECOGNISED;
}

/**
 * Must every ticket destination for this event be withheld? True for a
 * cancelled or postponed show, and for any stored status this module does not
 * recognise. A rescheduled show is not held: Ticketmaster has confirmed its
 * new date, which the field-sync applies from the same record.
 *
 * Every CTA gate — the renderer's providerEventPublishable, /api/shows,
 * /api/out, public/app.js and the offline mirror in
 * scripts/lib/event-link-coverage.mjs — checks this first, so one stored value
 * governs every surface.
 *
 * @param {any} event
 * @returns {boolean}
 */
export function eventLifecycleHeld(event) {
  const lifecycle = eventLifecycle(event);
  return lifecycle !== EVENT_LIFECYCLE.SCHEDULED && lifecycle !== EVENT_LIFECYCLE.RESCHEDULED;
}

// ---------------------------------------------------------------------------
// Event publishability
// ---------------------------------------------------------------------------

// A route whose upcoming shows are all CTA-suppressed can list dates but cannot
// lead anywhere, so it cannot serve the comparison purpose its title promises.
// "Can lead anywhere" must mean exactly what the renderer means by it.
//
// This mirrors providerEventPublishable() in functions/[[path]].js (and the
// equivalent gate in functions/api/out.js and public/app.js), which publishes a
// CTA when EITHER of two independent things holds:
//
//   1. the row has a stored Ticketmaster destination — this governs the
//      Ticketmaster link; or
//   2. any non-Ticketmaster provider link carries its own verified provenance —
//      the standalone resale CTA, which publishes on a `needs_recheck` row
//      precisely because that provider verified the destination independently
//      of the Ticketmaster storefront recheck.
//
// Case 2 is not an edge case in this data: every upcoming show in Arlington,
// Houston and Sunrise is `needs_recheck` with a verified SeatGeek link, and all
// of them render a live SeatGeek CTA. Testing only the row status would call
// those pages dead ends and de-index them while their buttons still work.
/**
 * Is the event announced but not yet on public sale? Ticketmaster's verbatim
 * `sales.public.startDateTime`, carried as `public_onsale_at`, is still in the
 * future. Such a date renders as a card with no ticket CTA, so it is never a
 * publishable destination and never gets a MusicEvent node. Single source for
 * the router, the route gates and the schema validator.
 *
 * @param {any} event
 * @param {number} [now]
 * @returns {boolean}
 */
export function publicOnsalePending(event, now = Date.now()) {
  const at = Date.parse(String(event?.public_onsale_at || ""));
  return Number.isFinite(at) && at > now;
}

/**
 * Does this reviewed event currently carry at least one publishable ticket
 * destination, from any provider?
 *
 * @param {any} event Raw events.json record.
 * @param {number} [now] Evaluation instant; derivations pass their own clock.
 * @returns {boolean}
 */
export function eventPublishable(event, now = Date.now()) {
  // Before the public on-sale only a verified resale destination leads
  // anywhere — the same rule the card renderer applies since 2026-09-24
  // (providerEventPublishable in [[path]].js) — so it is checked first, and
  // only the Ticketmaster fallback below waits for the on-sale.
  // A cancelled or postponed show leads nowhere, whatever links it still has.
  if (eventLifecycleHeld(event)) return false;
  const links = event?.provider_links && typeof event.provider_links === "object" ? event.provider_links : {};
  // A standalone verified resale destination is enough on its own — but only
  // when it actually has a stored URL to send the visitor to. `verified: true`
  // with no `url` is provenance without a destination, and the renderer's
  // safe-URL check would drop the button, so counting it would claim a
  // reachable page that has no reachable link.
  for (const [provider, link] of Object.entries(links)) {
    if (provider === "ticketmaster") continue;
    if (link?.verified === true && String(link?.url || "").trim()) return true;
  }
  if (publicOnsalePending(event, now)) return false;
  return eventStatusPublishable(event, now);
}

/**
 * Does this event have a Ticketmaster destination suitable for the route's
 * event-level representation? verification_status remains useful provenance,
 * but no longer creates a manual review gate. The outbound redirect performs
 * the strict host and event-id validation before sending a visitor away.
 *
 * Callers must be explicit about which of the two they mean:
 *
 *   eventPublishable()       -> "can this page lead anywhere?"  (indexability)
 *   eventStatusPublishable() -> "does this event get a MusicEvent node?" (schema)
 *
 * @param {any} event Raw events.json record.
 * @returns {boolean}
 */
export function eventStatusPublishable(event, now = Date.now()) {
  if (eventLifecycleHeld(event)) return false;
  if (publicOnsalePending(event, now)) return false;
  const destination = String(event?.ticketmaster_url || event?.source_url || "").trim();
  if (destination) return true;
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
  ARTIST_NOT_EDITORIALLY_INDEXABLE: "artist_not_editorially_indexable",
  BELOW_CITY_THRESHOLD: "below_city_threshold",
  BELOW_PRICE_COVERAGE_THRESHOLD: "below_price_coverage_threshold"
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
 * On-sale calendar gate. Counts the dates the page lists: upcoming public
 * on-sales plus those that opened in the recent window.
 *
 * @param {{ showCount: number, artistCount: number }} calendar
 * @returns {GateDecision}
 */
export function onsaleCalendarGate(calendar) {
  const reasons = [];
  if (!calendar?.showCount) reasons.push(EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  else if (calendar.showCount < ONSALE_CALENDAR_MIN_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD);
  if ((calendar?.artistCount || 0) < ONSALE_CALENDAR_MIN_ARTISTS) reasons.push(EXCLUSION_REASONS.BELOW_ARTIST_THRESHOLD);
  return { indexable: reasons.length === 0, reasons };
}

/**
 * Price-guide gate — the data-derived half. The caller applies the editorial
 * half (registered guide, artist page itself indexable).
 *
 * @param {{ showCount: number, cityCount: number, publishableCount: number, snapshotReadyCount: number }} guide
 * @returns {GateDecision}
 */
export function priceGuideGate(guide) {
  const reasons = [];
  if (!guide?.showCount) reasons.push(EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  else if (guide.showCount < PRICE_GUIDE_MIN_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD);
  if ((guide?.cityCount || 0) < PRICE_GUIDE_MIN_CITIES) reasons.push(EXCLUSION_REASONS.BELOW_CITY_THRESHOLD);
  if (!(guide?.publishableCount > 0)) reasons.push(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION);
  if ((guide?.snapshotReadyCount || 0) < PRICE_GUIDE_MIN_SNAPSHOT_READY_SHOWS) reasons.push(EXCLUSION_REASONS.BELOW_PRICE_COVERAGE_THRESHOLD);
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
