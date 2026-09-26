// @ts-check
// Event identity and future event-route derivation. Foundation only.
//
// Nothing imports this module at runtime yet: there is no /events/* route, no
// sitemap entry, no internal link and no structured data for an individual
// event. It exists so that when event pages are built, the router, sitemap and
// audits all derive the same URL for the same show from one place — the same
// reason functions/_artist-cities.js is shared. See docs/ARCHITECTURE.md →
// "Event identity".
//
// Identity vs readable slug
// -------------------------
// The permanent identity of a performance is its events.json `id`. It is what
// every existing per-event system already keys on: the D1 price cache, price
// history and price-check rows, `/api/out?showId=`, and the `#show-<id>` card
// anchors. The nightly Ticketmaster field-sync rewrites date, venue and city in
// place but never the id.
//
// A future event URL is
//
//   /events/{artist}-{venue}-{city}-{venue-local YYYY-MM-DD}-{key}
//
// where only `{key}` identifies the event. Everything before it is decorative:
// it is recomputed from the current record, so a venue rename, a city
// correction or a moved date changes the readable part and leaves the key —
// and therefore the event the URL resolves to — unchanged. A future router can
// then answer an out-of-date readable part with a redirect to the current one.
//
// The date is the *venue-local* calendar date from the strict resolver in
// functions/_event-local-date.js. Slicing `datetime_iso` would print the UTC
// date, which is the next day for most evening shows in the Americas. An event
// whose local date cannot be resolved gets no path at all rather than a guess.

import { resolveEventLocalDate } from "./_event-local-date.js";
import { slugify } from "./_cities.js";
import { INDEXABLE_ARTIST_STATUS } from "./_artist-indexability.js";
import { eventPublishable, eventStatusPublishable, publicOnsalePending } from "./_route-indexability.js";
import { PRICE_GUIDE_SNAPSHOT_PROVIDERS, linkVerifiedWithUrl } from "./_price-guides.js";

export const EVENT_PATH_PREFIX = "/events/";

// ---------------------------------------------------------------------------
// Stable key
// ---------------------------------------------------------------------------

// The key is the 64-bit FNV-1a hash of the event id's UTF-8 bytes, written as
// 16 lowercase hex digits.
//
// Why this algorithm:
//   - Synchronous and dependency-free. Route resolution will run inside the
//     router's request path; Web Crypto digests are async, and node:crypto is
//     not available in Workers without a compatibility flag.
//   - Identical in Node and Workers: it uses only 16-bit integer arithmetic
//     (no BigInt, no floating-point rounding), and hex output needs no base
//     conversion.
//   - Published and fixed. FNV-1a 64 has standard offset basis and prime
//     constants and published test vectors, so the scheme can be
//     re-implemented exactly in any language, forever. scripts/event-pages.test.mjs
//     pins those vectors and a set of real event ids, so an accidental change
//     to this function fails the build.
//   - 64 bits. At TTC's scale (thousands of events, 100k is far beyond any
//     plan) the birthday probability of any collision is below 1e-9. It is not
//     cryptographic and does not need to be: nothing secret is derived from it,
//     a collision is refused rather than resolved (buildEventKeyIndex), and a
//     resolved event must also match the URL's artist (resolveEventPath).
//
// Changing this function changes every event URL. Do not.
export const EVENT_KEY_LENGTH = 16;
const EVENT_KEY_RE = /^[0-9a-f]{16}$/;
const UTF8 = new TextEncoder();

/**
 * FNV-1a 64 over a string's UTF-8 bytes, as 16 lowercase hex digits.
 * Arithmetic is done in four 16-bit limbs, least significant first.
 *
 * @param {string} value
 * @returns {string}
 */
export function fnv1a64Hex(value) {
  // Offset basis 0xcbf29ce484222325.
  let h0 = 0x2325;
  let h1 = 0x8422;
  let h2 = 0x9ce4;
  let h3 = 0xcbf2;
  for (const byte of UTF8.encode(String(value))) {
    h0 ^= byte;
    // Multiply by the FNV prime 0x100000001b3 = 2^40 + 0x1b3, modulo 2^64:
    // h * 0x1b3, plus h shifted left 40 bits (two limbs and 8 bits).
    const t0 = h0 * 0x1b3;
    let t1 = h1 * 0x1b3 + (t0 >>> 16);
    let t2 = h2 * 0x1b3 + (h0 << 8) + (t1 >>> 16);
    const t3 = h3 * 0x1b3 + (h1 << 8) + (t2 >>> 16);
    h0 = t0 & 0xffff;
    h1 = t1 & 0xffff;
    h2 = t2 & 0xffff;
    h3 = t3 & 0xffff;
  }
  return [h3, h2, h1, h0].map((limb) => limb.toString(16).padStart(4, "0")).join("");
}

const KEY_CACHE = new Map();

/**
 * The stable key for an events.json id, or "" for an empty id.
 *
 * @param {unknown} id
 * @returns {string}
 */
export function eventKey(id) {
  const raw = String(id ?? "").trim();
  if (!raw) return "";
  let key = KEY_CACHE.get(raw);
  if (!key) {
    key = fnv1a64Hex(raw);
    KEY_CACHE.set(raw, key);
  }
  return key;
}

// ---------------------------------------------------------------------------
// Readable slug and path
// ---------------------------------------------------------------------------

// Letters that Unicode compatibility decomposition leaves intact, so the
// accent fold below would otherwise turn them into separators ("Łódź" -> "odz").
const LETTER_FOLDS = new Map([
  ["ł", "l"], ["ø", "o"], ["æ", "ae"], ["œ", "oe"], ["ß", "ss"], ["đ", "d"], ["ı", "i"]
]);

/**
 * Accent-folded slug part: the site's slugify (functions/_cities.js) applied
 * after NFKD decomposition, the same fold scripts/lib/slugify.mjs uses, so
 * "Düsseldorf" reads "dusseldorf" rather than the router's "d-sseldorf".
 * Decorative only — never part of an event's identity.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function eventSlugPart(value) {
  const folded = String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[łøæœßđı]/g, (letter) => LETTER_FOLDS.get(letter) || letter);
  return slugify(folded);
}

// Venue names run to "Veterans United Home Loans Amphitheater at Virginia
// Beach". The venue part is cut at the last word boundary within this budget.
export const EVENT_SLUG_VENUE_MAX = 48;

/**
 * @param {string} venuePart
 * @param {string} cityPart
 */
function venueSlugPart(venuePart, cityPart) {
  let venue = venuePart;
  // "House of Blues Cleveland" in Cleveland: do not print the city twice.
  if (cityPart && venue === cityPart) venue = "";
  else if (cityPart && venue.endsWith(`-${cityPart}`)) venue = venue.slice(0, -(cityPart.length + 1));
  if (venue.length > EVENT_SLUG_VENUE_MAX) {
    const cut = venue.slice(0, EVENT_SLUG_VENUE_MAX + 1);
    const boundary = cut.lastIndexOf("-");
    venue = boundary > 0 ? cut.slice(0, boundary) : venue.slice(0, EVENT_SLUG_VENUE_MAX);
  }
  // Either cut can leave "…-amphitheater-at"; drop a dangling connector word.
  return venue.replace(/-+$/, "").replace(/-(?:at|in|of|the|and)$/, "");
}

/**
 * The readable part of an event's URL (everything before the key), from the
 * current record. "" when the venue-local date cannot be resolved.
 *
 * @param {any} event Raw events.json record.
 * @returns {string}
 */
export function eventReadableSlug(event) {
  const localDate = resolveEventLocalDate(event).iso;
  const artist = eventSlugPart(event?.artist_slug);
  if (!localDate || !artist) return "";
  const city = eventSlugPart(event?.city);
  const venue = venueSlugPart(eventSlugPart(event?.venue), city);
  return [artist, venue, city, localDate].filter(Boolean).join("-");
}

/**
 * The full slug segment: readable part plus key. "" when either is missing.
 *
 * @param {any} event
 * @returns {string}
 */
export function eventSlug(event) {
  const readable = eventReadableSlug(event);
  const key = eventKey(event?.id);
  return readable && key ? `${readable}-${key}` : "";
}

/**
 * The event's future canonical path, or "" when it cannot have one.
 *
 * @param {any} event
 * @returns {string}
 */
export function eventPath(event) {
  const slug = eventSlug(event);
  return slug ? `${EVENT_PATH_PREFIX}${slug}` : "";
}

/**
 * Split a candidate event path into its readable part and key. Returns null
 * for anything that is not exactly one `/events/<slug>-<key>` segment; the key
 * is always the final 16 hex digits and is never inferred from elsewhere.
 *
 * @param {unknown} pathname
 * @returns {{ slug: string, readable: string, key: string } | null}
 */
export function parseEventPath(pathname) {
  const path = String(pathname ?? "");
  if (!path.startsWith(EVENT_PATH_PREFIX)) return null;
  const slug = path.slice(EVENT_PATH_PREFIX.length).replace(/\/$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const at = slug.lastIndexOf("-");
  if (at <= 0) return null;
  const key = slug.slice(at + 1);
  if (!EVENT_KEY_RE.test(key)) return null;
  return { slug, readable: slug.slice(0, at), key };
}

// ---------------------------------------------------------------------------
// Key index and resolution
// ---------------------------------------------------------------------------

export class EventKeyCollisionError extends Error {
  /** @param {Array<{ key: string, ids: string[] }>} collisions */
  constructor(collisions) {
    super(
      `Event key collision — refusing to resolve: ${collisions
        .map((entry) => `${entry.key} <- ${entry.ids.join(", ")}`)
        .join("; ")}`
    );
    this.name = "EventKeyCollisionError";
    this.collisions = collisions;
  }
}

/**
 * @typedef {Object} EventKeyIndex
 * @property {Map<string, any>} byKey  Only keys held by exactly one event id.
 * @property {Map<string, string[]>} collisions  Keys held by more than one distinct id.
 * @property {string[]} duplicateIds  Ids that occur on more than one record.
 */

const KEY_INDEX_MEMO = new WeakMap();

/**
 * Key -> event for a set of records, memoised per events array. A key shared
 * by two distinct ids, or an id carried by two records, is withheld from
 * `byKey` and reported instead: resolution fails closed rather than picking
 * whichever record came first.
 *
 * @param {any[]} events
 * @returns {EventKeyIndex}
 */
export function buildEventKeyIndex(events) {
  const list = Array.isArray(events) ? events : [];
  const memo = KEY_INDEX_MEMO.get(list);
  if (memo) return memo;
  const index = indexEventsByKey(list);
  KEY_INDEX_MEMO.set(list, index);
  return index;
}

/**
 * The unmemoised index. `keyOf` exists so tests can force a collision, which
 * cannot be produced on demand with a 64-bit hash; callers use the default.
 *
 * @param {any[]} list
 * @param {(id: string) => string} [keyOf]
 * @returns {EventKeyIndex}
 */
export function indexEventsByKey(list, keyOf = eventKey) {
  /** @type {Map<string, any[]>} */
  const byKeyAll = new Map();
  const seenIds = new Map();
  for (const event of list) {
    const id = String(event?.id ?? "").trim();
    const key = id ? keyOf(id) : "";
    if (!key) continue;
    seenIds.set(id, (seenIds.get(id) || 0) + 1);
    const bucket = byKeyAll.get(key);
    if (bucket) bucket.push(event);
    else byKeyAll.set(key, [event]);
  }
  const duplicateIds = [...seenIds].filter(([, count]) => count > 1).map(([id]) => id).sort();
  const duplicated = new Set(duplicateIds);
  const byKey = new Map();
  const collisions = new Map();
  for (const [key, bucket] of byKeyAll) {
    const ids = [...new Set(bucket.map((event) => String(event.id).trim()))];
    if (ids.length > 1) collisions.set(key, ids.sort());
    else if (!duplicated.has(ids[0])) byKey.set(key, bucket[0]);
  }
  return { byKey, collisions, duplicateIds };
}

/**
 * Throw when any two records share an id or any two ids share a key. For CI
 * and data validation: a collision must stop a data change, not be discovered
 * by a visitor.
 *
 * @param {any[]} events
 */
export function assertUniqueEventKeys(events) {
  const { collisions, duplicateIds } = buildEventKeyIndex(events);
  if (duplicateIds.length) throw new Error(`Duplicate event ids: ${duplicateIds.join(", ")}`);
  if (collisions.size) {
    throw new EventKeyCollisionError([...collisions].map(([key, ids]) => ({ key, ids })));
  }
}

/**
 * The event holding a key, or null when the key is unknown, malformed or
 * ambiguous.
 *
 * @param {any[]} events
 * @param {string} key
 */
export function findEventByKey(events, key) {
  if (!EVENT_KEY_RE.test(String(key || ""))) return null;
  return buildEventKeyIndex(events).byKey.get(key) || null;
}

export const EVENT_RESOLUTION = Object.freeze({
  OK: "ok",
  MALFORMED: "malformed_path",
  UNKNOWN_KEY: "unknown_key",
  KEY_COLLISION: "key_collision",
  ARTIST_MISMATCH: "artist_mismatch",
  NO_CANONICAL_PATH: "no_canonical_path"
});

/**
 * Resolve a candidate event path to one event, for a future router to act on.
 * This decides nothing about HTTP: it reports whether the supplied readable
 * part is the current canonical one (`isCanonical`) and leaves 200-vs-301 to
 * the caller.
 *
 * The readable part must begin with the resolved event's own artist slug. A
 * key that happens to match — through a collision the index missed, a typo or
 * a hand-edited URL — can therefore never serve another artist's show.
 *
 * @param {any[]} events
 * @param {unknown} pathname
 * @returns {{ status: string, event: any, key: string, canonicalPath: string, isCanonical: boolean }}
 */
export function resolveEventPath(events, pathname) {
  const fail = (status, key = "", event = null) => ({ status, event, key, canonicalPath: "", isCanonical: false });
  const parsed = parseEventPath(pathname);
  if (!parsed) return fail(EVENT_RESOLUTION.MALFORMED);
  const index = buildEventKeyIndex(events);
  if (index.collisions.has(parsed.key)) return fail(EVENT_RESOLUTION.KEY_COLLISION, parsed.key);
  const event = index.byKey.get(parsed.key);
  if (!event) return fail(EVENT_RESOLUTION.UNKNOWN_KEY, parsed.key);
  const artist = eventSlugPart(event.artist_slug);
  if (!artist || (parsed.readable !== artist && !parsed.readable.startsWith(`${artist}-`))) {
    return fail(EVENT_RESOLUTION.ARTIST_MISMATCH, parsed.key);
  }
  const canonicalPath = eventPath(event);
  if (!canonicalPath) return { ...fail(EVENT_RESOLUTION.NO_CANONICAL_PATH, parsed.key), event };
  return {
    status: EVENT_RESOLUTION.OK,
    event,
    key: parsed.key,
    canonicalPath,
    isCanonical: `${EVENT_PATH_PREFIX}${parsed.slug}` === canonicalPath
  };
}

// ---------------------------------------------------------------------------
// Non-performance listings
// ---------------------------------------------------------------------------

// Ticketmaster lists upsell products (premium seats, boxes, hospitality,
// packages) as separate "events". The new-show recogniser already withholds
// them (travel_package_listing in scripts/sync-ticketmaster-events.py); these
// constants mirror its markers exactly, and scripts/event-pages.test.mjs fails
// if the two drift. Rows ingested before those markers existed are still in
// events.json, which is why the check is repeated here.
export const RECOGNISER_TRAVEL_PACKAGE_MARKERS = Object.freeze(["travel", "hotel", "package", "parking", "shuttle", "hospitality"]);
export const RECOGNISER_PREMIUM_SEATS_NAME_RE = /\|\s*premium seats\b/i;
export const RECOGNISER_PREMIUM_SEATS_VENUE_SUFFIX = " loge";
// Two additions, each as narrow as the recogniser's own: a "| Box seat" name
// segment is the German storefront's form of "| Premium Seats" (owner
// precedent: premium-seat and box upsells are tombstoned as "not the concert
// itself"), and a listing that says the event ticket is not included is by its
// own words not admission to the concert.
export const BOX_SEAT_NAME_RE = /\|\s*box seat\b/i;
export const TICKET_NOT_INCLUDED_RE = /\bticket not included\b/i;

/**
 * Which non-performance markers a record carries. Empty for a concert.
 * Deliberately conservative: vague words ("premium", "experience", "lounge")
 * are not markers — "The Rebel Lounge" is a venue and "Venue Premium Tickets"
 * admits to the show.
 *
 * @param {any} event
 * @returns {string[]}
 */
export function nonPerformanceMarkers(event) {
  const name = String(event?.event_name || "");
  const haystack = `${name} ${String(event?.ticketmaster_url || "")}`.toLowerCase();
  const hits = RECOGNISER_TRAVEL_PACKAGE_MARKERS.filter((marker) => haystack.includes(marker));
  if (RECOGNISER_PREMIUM_SEATS_NAME_RE.test(name)) hits.push("premium_seats");
  if (String(event?.venue || "").toLowerCase().endsWith(RECOGNISER_PREMIUM_SEATS_VENUE_SUFFIX)) hits.push("loge_venue");
  if (BOX_SEAT_NAME_RE.test(name)) hits.push("box_seat");
  if (TICKET_NOT_INCLUDED_RE.test(haystack)) hits.push("ticket_not_included");
  return hits;
}

// ---------------------------------------------------------------------------
// Structural renderability
// ---------------------------------------------------------------------------

export const EVENT_ROUTE_REASONS = Object.freeze({
  MISSING_ID: "missing_id",
  ARTIST_NOT_EDITORIALLY_INDEXABLE: "artist_not_editorially_indexable",
  NOT_UPCOMING: "not_upcoming",
  LOCAL_DATE_UNRESOLVED: "local_date_unresolved",
  MISSING_VENUE_OR_CITY: "missing_venue_or_city",
  NO_PUBLISHABLE_DESTINATION: "no_publishable_destination"
});

/**
 * @typedef {Object} EventRouteState
 * @property {string} id
 * @property {string} key
 * @property {string} artistSlug
 * @property {string} localDate         Venue-local YYYY-MM-DD, "" when unresolved.
 * @property {string} localDateReason   The resolver's reason code when unresolved.
 * @property {string} path              Future canonical path, "" when none.
 * @property {boolean} upcoming
 * @property {boolean} renderable
 * @property {string[]} reasons         Every failed structural condition.
 * @property {string[]} nonPerformance  Markers; reported, not a structural condition.
 */

/**
 * Could this record structurally carry a future event route? Mirrors the
 * artist-city render gate for one show: the artist is editorially indexable,
 * the show is upcoming (the same `Date.parse` test the boards use), its venue
 * and city are present, its venue-local date resolves, and it can lead
 * somewhere (`eventPublishable`, the "can this page lead anywhere?" test).
 *
 * This is not an indexing decision and nothing serves a route from it yet.
 *
 * @param {any} event
 * @param {{ artist?: any, now?: number }} [options] `artist` is the artists.json record.
 * @returns {EventRouteState}
 */
export function eventRouteState(event, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const id = String(event?.id ?? "").trim();
  const local = resolveEventLocalDate(event);
  const ts = Date.parse(String(event?.datetime_iso || event?.dateTimeISO || "").trim());
  const upcoming = Number.isFinite(ts) && ts >= now;
  const reasons = [];
  if (!id) reasons.push(EVENT_ROUTE_REASONS.MISSING_ID);
  if (options.artist?.indexing_status !== INDEXABLE_ARTIST_STATUS) {
    reasons.push(EVENT_ROUTE_REASONS.ARTIST_NOT_EDITORIALLY_INDEXABLE);
  }
  if (!upcoming) reasons.push(EVENT_ROUTE_REASONS.NOT_UPCOMING);
  if (!local.iso) reasons.push(EVENT_ROUTE_REASONS.LOCAL_DATE_UNRESOLVED);
  if (!String(event?.venue || "").trim() || !String(event?.city || "").trim()) {
    reasons.push(EVENT_ROUTE_REASONS.MISSING_VENUE_OR_CITY);
  }
  if (!eventPublishable(event, now)) reasons.push(EVENT_ROUTE_REASONS.NO_PUBLISHABLE_DESTINATION);
  return {
    id,
    key: eventKey(id),
    artistSlug: eventSlugPart(event?.artist_slug),
    localDate: local.iso,
    localDateReason: local.reason,
    path: eventPath(event),
    upcoming,
    renderable: reasons.length === 0,
    reasons,
    nonPerformance: nonPerformanceMarkers(event)
  };
}

/**
 * Route state for every record, keyed by artists.json slug lookups.
 *
 * @param {any[]} events
 * @param {any[]} artists artists.json records.
 * @param {{ now?: number }} [options]
 * @returns {EventRouteState[]}
 */
export function deriveEventRouteStates(events, artists, options = {}) {
  const bySlug = new Map((Array.isArray(artists) ? artists : []).map((artist) => [slugify(artist?.slug), artist]));
  return (Array.isArray(events) ? events : []).map((event) =>
    eventRouteState(event, { ...options, artist: bySlug.get(slugify(event?.artist_slug)) })
  );
}

// ---------------------------------------------------------------------------
// Future indexability inputs (preview only)
// ---------------------------------------------------------------------------

// PREVIEW ONLY. Nothing in the router, sitemap, llms.txt or robots logic reads
// these. They record the signals the event-page indexability policy is
// expected to weigh, so the policy can be inspected against real data before
// it is decided (docs/ROUTE_INDEXABILITY_POLICY.md remains the policy).
export const PREVIEW_MIN_PUBLISHABLE_DESTINATIONS = 2;
export const PREVIEW_MIN_SNAPSHOT_READY_LANES = 1;

export const PREVIEW_REASONS = Object.freeze({
  NOT_RENDERABLE: "not_renderable",
  PARENT_ARTIST_NOT_INDEXABLE: "parent_artist_not_indexable",
  BELOW_DESTINATION_THRESHOLD: "below_destination_threshold",
  NO_SNAPSHOT_READY_LANE: "no_snapshot_ready_lane",
  NON_PERFORMANCE_LISTING: "non_performance_listing"
});

/**
 * Static, data-derived signals for one record. The publishable destination
 * lanes are passed in by the caller (offline: scripts/lib/event-link-coverage.mjs,
 * the mirror of the runtime CTA gate) rather than recomputed here, so this
 * module does not become a third copy of the per-provider CTA rules.
 *
 * @param {any} event
 * @param {{ publishableLanes?: string[], now?: number }} [options]
 */
export function eventIndexSignals(event, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const lanes = Array.isArray(options.publishableLanes) ? options.publishableLanes : [];
  return {
    publishableDestinations: lanes.length,
    snapshotReadyLanes: PRICE_GUIDE_SNAPSHOT_PROVIDERS.filter((provider) => linkVerifiedWithUrl(event, provider)),
    schemaEligible: eventStatusPublishable(event, now),
    onsalePending: publicOnsalePending(event, now),
    verificationStatus: String(event?.verification_status || "")
  };
}

/**
 * Would this record pass the candidate policy (≥2 publishable destinations and
 * ≥1 snapshot-ready price lane, on a renderable, performance, whose artist
 * page is itself indexable)? Lifecycle holds (cancelled/postponed) are not
 * representable in events.json yet and are therefore not evaluated.
 *
 * @param {EventRouteState} state
 * @param {ReturnType<typeof eventIndexSignals>} signals
 * @param {{ artistPageIndexable: boolean }} context
 * @returns {{ wouldQualify: boolean, reasons: string[] }}
 */
export function previewEventIndexability(state, signals, context) {
  const reasons = [];
  if (!state.renderable) reasons.push(PREVIEW_REASONS.NOT_RENDERABLE);
  if (!context.artistPageIndexable) reasons.push(PREVIEW_REASONS.PARENT_ARTIST_NOT_INDEXABLE);
  if (signals.publishableDestinations < PREVIEW_MIN_PUBLISHABLE_DESTINATIONS) {
    reasons.push(PREVIEW_REASONS.BELOW_DESTINATION_THRESHOLD);
  }
  if (signals.snapshotReadyLanes.length < PREVIEW_MIN_SNAPSHOT_READY_LANES) {
    reasons.push(PREVIEW_REASONS.NO_SNAPSHOT_READY_LANE);
  }
  if (state.nonPerformance.length) reasons.push(PREVIEW_REASONS.NON_PERFORMANCE_LISTING);
  return { wouldQualify: reasons.length === 0, reasons };
}

/**
 * Upcoming shows by one artist in one city on one venue-local date, when more
 * than one record carries them. Usually a duplicate listing (a second
 * storefront copy, a premium-seat product) rather than a matinee — reported
 * for review, never acted on.
 *
 * @param {EventRouteState[]} states
 * @param {any[]} events The records the states were derived from, same order.
 * @returns {Array<{ artistSlug: string, city: string, localDate: string, ids: string[] }>}
 */
export function possibleDuplicateGroups(states, events) {
  const groups = new Map();
  states.forEach((state, index) => {
    if (!state.upcoming || !state.localDate) return;
    const city = eventSlugPart(events[index]?.city);
    const group = `${state.artistSlug}|${city}|${state.localDate}`;
    if (!groups.has(group)) groups.set(group, { artistSlug: state.artistSlug, city, localDate: state.localDate, ids: [] });
    groups.get(group).ids.push(state.id);
  });
  return [...groups.values()].filter((group) => group.ids.length > 1);
}
