// @ts-check
// Shared artist-city derivation used by the HTML router ([[path]].js), the
// sitemap (sitemap.xml.js), llms.txt, and the internal-link audit so none of
// them can drift. Artist-city landing pages (`/artists/<artist>/tickets/<city>`)
// are a server-rendered aggregation over reviewed upcoming `events.json`
// records for one artist in one city — they invent no location facts. Every
// field here is composed only from already-verified event data (venue, city,
// country, date, tour name, verified provider links).
//
// This module owns the *data-derived* half of the indexability decision (does
// the artist have qualifying upcoming shows in this city?). The *editorial*
// half — whether the artist itself is indexable_with_substantial_content — is
// applied by the caller, exactly as the artist page router already gates on
// artists.json `indexing_status`. Keeping both halves in one deterministic
// derivation is what lets the router, sitemap, and audit agree on the same set
// of URLs.

import { slugify, normalizeCountry, citySlug } from "./_cities.js";
import { venueSlug } from "./_venues.js";

// Event-link publishability, mirrored from functions/[[path]].js /
// functions/api/out.js / public/app.js. A city page is only worth indexing when
// at least one upcoming show carries a publishable ticket destination, so the
// visible show board and MusicEvent schema have real content to render.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

// Providers, in a stable display order, that carry a verified stored link on an
// event. Data-backed only: a provider appears when its provider_links entry is
// verified === true. Runtime CTA availability (Impact configuration) is still
// gated at render time; this list only reports which checked links exist in the
// reviewed data.
const PROVIDER_DISPLAY_ORDER = [
  ["seatgeek", "SeatGeek"],
  ["vivid-seats", "Vivid Seats"],
  ["ticketnetwork", "TicketNetwork"],
  ["ticketliquidator", "Ticket Liquidator"],
  ["stubhub-international", "StubHub International"],
  ["ticketmaster", "Ticketmaster"]
];

function verifiedProvidersForEvent(event) {
  const links = event?.provider_links && typeof event.provider_links === "object" ? event.provider_links : {};
  const names = [];
  for (const [slug, name] of PROVIDER_DISPLAY_ORDER) {
    if (links?.[slug]?.verified === true) names.push(name);
  }
  return names;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * @typedef {Object} ArtistCityShow
 * @property {string} id
 * @property {string} venue
 * @property {string} venue_slug
 * @property {string} datetime_iso
 * @property {number} ts
 * @property {string} tour_name
 * @property {string} event_name
 * @property {string} last_verified_at
 * @property {string} artist_name
 * @property {boolean} publishable
 */

/**
 * @typedef {Object} ArtistCity
 * @property {string} artistSlug
 * @property {string} slug          City slug (city + normalized country), matches /cities/<slug>.
 * @property {string} city
 * @property {string} country
 * @property {string} label         Display label ("City" or "City, Country" when the artist plays a same-named city in more than one country).
 * @property {ArtistCityShow[]} shows
 * @property {string[]} venues
 * @property {string[]} venueSlugs
 * @property {number} showCount
 * @property {number} venueCount
 * @property {number} publishableCount
 * @property {boolean} hasPublishable
 * @property {boolean} multiNightSameVenue
 * @property {string[]} providers
 * @property {string} earliestISO
 * @property {string} latestISO
 * @property {string} lastmod
 */

/**
 * All upcoming artist-city groups for one artist, most shows first. Data-derived
 * only; the caller decides whether the artist is editorially indexable.
 *
 * @param {any[]} events
 * @param {string} artistSlug
 * @param {{ now?: number }} [options]
 * @returns {ArtistCity[]}
 */
export function deriveArtistCities(events, artistSlug, options = {}) {
  const now = Number.isFinite(options.now) ? options.now : Date.now();
  const target = slugify(artistSlug);
  if (!target) return [];

  const groups = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object") continue;
    if (slugify(event.artist_slug) !== target) continue;
    const city = String(event.city || "").trim();
    const country = normalizeCountry(event.country);
    const venue = String(event.venue || "").trim();
    const iso = String(event.dateTimeISO || event.datetime_iso || "").trim();
    const ts = Date.parse(iso);
    if (!city || !country || !venue || !Number.isFinite(ts) || ts < now) continue;

    const slug = citySlug(city, country);
    if (!slug) continue;
    if (!groups.has(slug)) groups.set(slug, { slug, city, country, shows: [] });
    groups.get(slug).shows.push({
      id: String(event.id || "").trim(),
      venue,
      venue_slug: venueSlug(venue, city),
      datetime_iso: iso,
      ts,
      tour_name: String(event.tour_name || "").trim(),
      event_name: String(event.event_name || event.name || "").trim(),
      last_verified_at: String(event.last_verified_at || "").trim(),
      artist_name: String(event.artist_name || "").trim(),
      publishable: eventPublishable(event),
      providers: verifiedProvidersForEvent(event)
    });
  }

  // City-name disambiguation within this artist: if the same city name occurs
  // for more than one country (e.g. a same-named city abroad), the display
  // label carries the country so titles/descriptions stay unique.
  const nameCounts = new Map();
  for (const group of groups.values()) {
    nameCounts.set(group.city, (nameCounts.get(group.city) || 0) + 1);
  }

  const cities = [];
  for (const group of groups.values()) {
    const shows = group.shows.sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));
    const venues = [...new Set(shows.map((show) => show.venue))];
    const venueSlugs = [...new Set(shows.map((show) => show.venue_slug))];
    const providers = [];
    for (const show of shows) {
      for (const name of show.providers) {
        if (!providers.includes(name)) providers.push(name);
      }
    }
    const lastmod = shows
      .map((show) => show.last_verified_at)
      .filter((value) => ISO_DATE.test(value))
      .sort()
      .at(-1) || "";
    const publishableCount = shows.filter((show) => show.publishable).length;
    const ambiguous = (nameCounts.get(group.city) || 0) > 1;
    cities.push({
      artistSlug: target,
      slug: group.slug,
      city: group.city,
      country: group.country,
      label: ambiguous ? `${group.city}, ${group.country}` : group.city,
      shows,
      venues,
      venueSlugs,
      showCount: shows.length,
      venueCount: venueSlugs.length,
      publishableCount,
      hasPublishable: publishableCount >= 1,
      multiNightSameVenue: venueSlugs.length === 1 && shows.length > 1,
      providers,
      earliestISO: shows[0]?.datetime_iso || "",
      latestISO: shows[shows.length - 1]?.datetime_iso || "",
      lastmod
    });
  }

  cities.sort((a, b) => b.showCount - a.showCount || a.city.localeCompare(b.city) || a.slug.localeCompare(b.slug));
  return cities;
}

/**
 * A single artist-city group by slug, or null when the artist has no upcoming
 * shows in that city.
 *
 * @param {any[]} events
 * @param {string} artistSlug
 * @param {string} slug
 * @param {{ now?: number }} [options]
 * @returns {ArtistCity | null}
 */
export function findArtistCity(events, artistSlug, slug, options = {}) {
  const target = slugify(slug);
  if (!target) return null;
  return deriveArtistCities(events, artistSlug, options).find((entry) => entry.slug === target) || null;
}

/**
 * Every city slug the artist has *any* event in (past or future). Used by the
 * router to tell a genuinely expired artist-city combination (redirect to the
 * artist hub) apart from a slug that was never real (404).
 *
 * @param {any[]} events
 * @param {string} artistSlug
 * @returns {Set<string>}
 */
export function artistCityFootprint(events, artistSlug) {
  const target = slugify(artistSlug);
  const slugs = new Set();
  if (!target) return slugs;
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object") continue;
    if (slugify(event.artist_slug) !== target) continue;
    const city = String(event.city || "").trim();
    const country = normalizeCountry(event.country);
    if (!city || !country) continue;
    const slug = citySlug(city, country);
    if (slug) slugs.add(slug);
  }
  return slugs;
}

/**
 * Flat list of qualifying, indexable artist-city entries across every indexable
 * artist. An entry qualifies when the artist is editorially indexable AND the
 * city has at least one upcoming publishable show. Shared by the sitemap,
 * llms.txt, and the internal-link audit so the indexable URL set is identical
 * everywhere.
 *
 * @param {any[]} events
 * @param {Iterable<string>} indexableArtistSlugs
 * @param {{ now?: number }} [options]
 * @returns {Array<{ artistSlug: string, slug: string, city: string, country: string, label: string, path: string, lastmod: string, showCount: number, venueCount: number }>}
 */
export function deriveIndexableArtistCities(events, indexableArtistSlugs, options = {}) {
  const indexable = new Set([...(indexableArtistSlugs || [])].map((slug) => slugify(slug)).filter(Boolean));
  const entries = [];
  for (const artistSlug of indexable) {
    for (const city of deriveArtistCities(events, artistSlug, options)) {
      if (!city.hasPublishable) continue;
      entries.push({
        artistSlug,
        slug: city.slug,
        city: city.city,
        country: city.country,
        label: city.label,
        path: `/artists/${artistSlug}/tickets/${city.slug}`,
        lastmod: city.lastmod,
        showCount: city.showCount,
        venueCount: city.venueCount
      });
    }
  }
  entries.sort((a, b) => a.path.localeCompare(b.path));
  return entries;
}
