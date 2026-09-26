// @ts-check
// Artist ticket-price guides: `/artists/<artist>/ticket-prices`.
//
// One informational page per artist, kept current by the data rather than by
// rewriting copy. It answers the price questions people search before they buy
// ("<artist> ticket prices", "how much are <artist> tickets") from the same
// reviewed events and gated price snapshots the rest of the site already
// publishes: the dates and cities, the ticket sites linked for each date, each
// date's own lowest listed-price snapshot, and how those snapshots have moved.
// The artist page (`/artists/<artist>`) stays the transactional destination;
// the two link to each other and do not compete for the same query.
//
// Shared by the router ([[path]].js), the sitemap, llms.txt, the route crawl
// behind both site audits, and scripts/propose-price-guides.mjs, so none of
// them can disagree about which guides exist or are indexable. Pure and
// import-light: no HTML, no I/O, no D1.
//
// Three rules shape it and are not style preferences:
//
//   1. ONE URL PER ARTIST, NEVER ONE PER TOUR OR YEAR. The year in the title is
//      read off the upcoming dates, so the same URL rolls from one tour to the
//      next and keeps what it has earned. `tour_name` is deliberately not a key:
//      it is blank on most Ticketmaster-ingested rows by design, and is never
//      inferred (SAFE_PUBLISHING_RULES.md, issue #172).
//
//   2. OWNER-APPROVED, MACHINE-PROPOSED. A guide exists only for an artist in
//      PRICE_GUIDE_ARTISTS below. scripts/propose-price-guides.mjs watches for
//      tour launches (a run of dates whose Ticketmaster public on-sale is
//      recent or imminent) and lists candidates in the rolling
//      `automation:price-guide-candidates` issue; adding the slug here is the
//      approval. Nothing adds itself: a new page type is not one of the
//      sanctioned auto-publish paths.
//
//   3. NO FIGURE THE SITE CANNOT SOURCE. There is no approved face-value source,
//      so the page states where face value is set and sold and prints none.
//      A minimum across different dates is not covered by any provider grant
//      (docs/PROVIDER_DATA_POLICY.md § "Ranking stays same-event"), so there is
//      no "tickets from <price>", no tour-wide range and no lowest-date claim: every
//      figure belongs to one date, one provider and one capture time.

import { slugify, normalizeCountry, citySlug } from "./_cities.js";
import { eventPublishable, publicOnsalePending, priceGuideGate } from "./_route-indexability.js";

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

// Artists with an approved price guide. Adding a slug is the whole approval:
// the page, its sitemap entry, its llms.txt line and its links from the artist
// and artist-city pages all follow from the data. Removing one turns the URL
// into a 301 to the artist page (see priceGuideRouteDecision). Candidates are
// proposed in the `automation:price-guide-candidates` issue.
export const PRICE_GUIDE_ARTISTS = Object.freeze(["oasis"]);

export const PRICE_GUIDE_SEGMENT = "ticket-prices";

/** @param {string} artistSlug */
export function priceGuidePath(artistSlug) {
  return `/artists/${slugify(artistSlug)}/${PRICE_GUIDE_SEGMENT}`;
}

/** @param {string} artistSlug */
export function priceGuideRegistered(artistSlug) {
  const slug = slugify(artistSlug);
  return Boolean(slug) && PRICE_GUIDE_ARTISTS.includes(slug);
}

// The provider lanes that can carry a numeric listed-price snapshot at all.
// Mirrors SCHEMA_OFFERS_APPROVED_PROVIDERS in functions/[[path]].js (the lanes
// with owner-confirmed price display rights); scripts/price-guides.test.mjs
// holds the two lists equal. SeatGeek has no snapshot lane and Ticketmaster is
// a link source, so neither can make a date "priceable". This is a static
// readiness signal for the indexing gate only — whether a price actually
// prints is decided at render time by the full display gate, never here.
export const PRICE_GUIDE_SNAPSHOT_PROVIDERS = Object.freeze(["vivid-seats", "ticketnetwork", "stubhub-international"]);

// ---------------------------------------------------------------------------
// Tour-launch detection (proposal only)
// ---------------------------------------------------------------------------

// A "tour launch" is a run of dates whose Ticketmaster public on-sale
// (`public_onsale_at`, carried verbatim on reviewed events) opened recently or
// opens soon. That is the moment price searches spike, and it is a sourced
// fact rather than a guess about when a tour was announced.
export const PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS = 30;
export const PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS = 60;
export const PRICE_GUIDE_LAUNCH_MIN_SHOWS = 6;

const DAY_MS = 24 * 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function linkVerifiedWithUrl(event, provider) {
  const link = event?.provider_links?.[provider];
  return link?.verified === true && Boolean(String(link?.url || "").trim());
}

/**
 * @typedef {Object} PriceGuideShow
 * @property {string} id
 * @property {string} city
 * @property {string} country
 * @property {string} citySlug
 * @property {string} venue
 * @property {string} datetime_iso
 * @property {string} timezone
 * @property {number} ts
 * @property {string} public_onsale_at
 * @property {boolean} onsalePending
 * @property {boolean} publishable
 * @property {boolean} snapshotReady  Carries verified provenance on a snapshot lane.
 */

/**
 * @typedef {Object} PriceGuideCity
 * @property {string} slug
 * @property {string} city
 * @property {string} country
 * @property {string} label
 * @property {PriceGuideShow[]} shows
 * @property {string[]} venues
 */

/**
 * The data-derived half of a price guide for one artist: every upcoming date,
 * grouped by city, with the static facts the page and its gate need. The
 * editorial half (is the artist itself indexable, is the guide registered) is
 * applied by the caller, exactly as the artist-city routes do.
 *
 * @param {any[]} events Raw events.json records (any artists).
 * @param {string} artistSlug
 * @param {{ now?: number }} [options]
 */
export function derivePriceGuide(events, artistSlug, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const target = slugify(artistSlug);

  /** @type {PriceGuideShow[]} */
  const shows = [];
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object" || slugify(event.artist_slug) !== target) continue;
    const iso = String(event.datetime_iso || event.dateTimeISO || "").trim();
    const ts = Date.parse(iso);
    const city = String(event.city || "").trim();
    const country = normalizeCountry(event.country);
    const id = String(event.id || "").trim();
    if (!id || !city || !Number.isFinite(ts) || ts < now) continue;
    shows.push({
      id,
      city,
      country,
      citySlug: citySlug(city, country),
      venue: String(event.venue || "").trim(),
      datetime_iso: iso,
      timezone: String(event.timezone || "").trim(),
      ts,
      public_onsale_at: String(event.public_onsale_at || "").trim(),
      onsalePending: publicOnsalePending(event, now),
      publishable: eventPublishable(event, now),
      snapshotReady: PRICE_GUIDE_SNAPSHOT_PROVIDERS.some((provider) => linkVerifiedWithUrl(event, provider))
    });
  }
  shows.sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));

  // Cities in order of their first date, so the page reads as the tour runs.
  // A city name shared by two countries keeps the country in its label, as the
  // artist-city pages do.
  /** @type {Map<string, PriceGuideCity>} */
  const citiesBySlug = new Map();
  for (const show of shows) {
    if (!show.citySlug) continue;
    let group = citiesBySlug.get(show.citySlug);
    if (!group) {
      group = { slug: show.citySlug, city: show.city, country: show.country, label: show.city, shows: [], venues: [] };
      citiesBySlug.set(show.citySlug, group);
    }
    group.shows.push(show);
    if (show.venue && !group.venues.includes(show.venue)) group.venues.push(show.venue);
  }
  const cities = [...citiesBySlug.values()];
  const nameCounts = new Map();
  for (const group of cities) nameCounts.set(group.city.toLowerCase(), (nameCounts.get(group.city.toLowerCase()) || 0) + 1);
  for (const group of cities) {
    if (nameCounts.get(group.city.toLowerCase()) > 1 && group.country) group.label = `${group.city}, ${group.country}`;
  }

  const onsalePending = shows.filter((show) => show.onsalePending);
  const nextOnsale = onsalePending
    .map((show) => show.public_onsale_at)
    .sort((a, b) => Date.parse(a) - Date.parse(b))[0] || "";

  const lastmod = (Array.isArray(events) ? events : [])
    .filter((event) => event && slugify(event?.artist_slug) === target)
    .map((event) => String(event.last_verified_at || "").slice(0, 10))
    .filter((value) => ISO_DATE.test(value))
    .sort()
    .at(-1) || "";

  const guide = {
    artistSlug: target,
    path: priceGuidePath(target),
    shows,
    cities,
    showCount: shows.length,
    cityCount: cities.length,
    publishableCount: shows.filter((show) => show.publishable).length,
    snapshotReadyCount: shows.filter((show) => show.snapshotReady).length,
    onsalePendingCount: onsalePending.length,
    nextOnsaleAt: nextOnsale,
    lastmod
  };
  const gate = priceGuideGate(guide);
  return { ...guide, indexable: gate.indexable, reasons: gate.reasons };
}

/**
 * What the router does with `/artists/<slug>/ticket-prices` for a known artist.
 *
 *   - registered, editorially indexable artist with at least one publishable
 *     upcoming date -> render (indexable per the guide's own gate AND the
 *     artist page's, so a child page never outranks its parent);
 *   - a registered guide that does not qualify right now (artist under review,
 *     or no publishable upcoming date between tours) -> 301 to the artist
 *     page, the most relevant surviving page. The same URL renders again the
 *     moment the next run of dates lands;
 *   - an artist with no approved guide -> 404, like any unknown path. The site
 *     does not generate pages it has not been asked to publish.
 *
 * Unknown artists never reach this: the router 404s them first.
 *
 * @param {ReturnType<typeof derivePriceGuide>} guide
 * @param {{ registered: boolean, artistEditoriallyIndexable: boolean }} context
 * @returns {"render"|"redirect"|"not_found"}
 */
export function priceGuideRouteDecision(guide, { registered, artistEditoriallyIndexable }) {
  if (!registered) return "not_found";
  if (!artistEditoriallyIndexable) return "redirect";
  return guide.publishableCount > 0 ? "render" : "redirect";
}

/**
 * Every registered guide that renders, for the route crawl and audits. The
 * caller supplies the editorially indexable artist slugs.
 *
 * @param {any[]} events
 * @param {string[]} indexableArtistSlugs
 * @param {{ now?: number }} [options]
 */
export function deriveRenderedPriceGuides(events, indexableArtistSlugs, options = {}) {
  const indexable = new Set((indexableArtistSlugs || []).map((slug) => slugify(slug)));
  return PRICE_GUIDE_ARTISTS.filter((slug) => indexable.has(slug))
    .map((slug) => derivePriceGuide(events, slug, options))
    .filter((guide) => priceGuideRouteDecision(guide, { registered: true, artistEditoriallyIndexable: true }) === "render");
}

/**
 * The indexable subset — sitemap and llms.txt. `indexableArtistSlugs` must be
 * the artists whose own page is indexable (artistPageIndexable), so the guide
 * inherits every artist-level noindex.
 *
 * @param {any[]} events
 * @param {string[]} indexableArtistSlugs
 * @param {{ now?: number }} [options]
 */
export function deriveIndexablePriceGuides(events, indexableArtistSlugs, options = {}) {
  return deriveRenderedPriceGuides(events, indexableArtistSlugs, options).filter((guide) => guide.indexable);
}

/**
 * Tour-launch candidates for the proposal issue: editorially indexable artists
 * without a guide whose recent-or-imminent public on-sales cover at least
 * PRICE_GUIDE_LAUNCH_MIN_SHOWS upcoming dates, and whose data would pass the
 * guide's own indexing gate today. Ordered by launch size.
 *
 * @param {any[]} events
 * @param {Array<{slug: string, name?: string}>} indexableArtists
 * @param {{ now?: number }} [options]
 */
export function priceGuideLaunchCandidates(events, indexableArtists, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const opensAfter = now - PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS * DAY_MS;
  const opensBefore = now + PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS * DAY_MS;
  const candidates = [];
  for (const artist of indexableArtists || []) {
    const slug = slugify(artist?.slug);
    if (!slug || priceGuideRegistered(slug)) continue;
    const guide = derivePriceGuide(events, slug, { now });
    const launchShows = guide.shows.filter((show) => {
      const at = Date.parse(show.public_onsale_at);
      return Number.isFinite(at) && at >= opensAfter && at <= opensBefore;
    });
    if (launchShows.length < PRICE_GUIDE_LAUNCH_MIN_SHOWS) continue;
    const onsaleTimes = launchShows.map((show) => show.public_onsale_at).sort((a, b) => Date.parse(a) - Date.parse(b));
    candidates.push({
      slug,
      name: String(artist?.name || slug),
      path: guide.path,
      launchShowCount: launchShows.length,
      firstOnsaleAt: onsaleTimes[0],
      lastOnsaleAt: onsaleTimes.at(-1),
      showCount: guide.showCount,
      cityCount: guide.cityCount,
      snapshotReadyCount: guide.snapshotReadyCount,
      wouldIndex: guide.indexable,
      reasons: guide.reasons
    });
  }
  return candidates.sort((a, b) => b.launchShowCount - a.launchShowCount || a.slug.localeCompare(b.slug));
}
