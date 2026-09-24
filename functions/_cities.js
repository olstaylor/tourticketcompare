import { venueSlug } from "./_venues.js";
import { cityGate, eventPublishable, eventStatusPublishable } from "./_route-indexability.js";

// Shared city derivation used by the HTML router, sitemap, llms.txt, and
// internal-link audit. City pages aggregate only upcoming records already
// present in public/data/events.json; no location or event facts are inferred.
//
// The indexability decision itself lives in functions/_route-indexability.js
// (shared with the venue and artist-city derivations); this module supplies the
// counted evidence it needs.

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const COUNTRY_ALIASES = new Map([
  ["us", "United States"],
  ["usa", "United States"],
  ["united states of america", "United States"],
  ["uk", "United Kingdom"],
  ["great britain", "United Kingdom"]
]);

export function normalizeCountry(value) {
  const raw = String(value || "").trim();
  return COUNTRY_ALIASES.get(raw.toLowerCase()) || raw;
}

export function citySlug(city, country) {
  return slugify(`${String(city || "").trim()} ${normalizeCountry(country)}`);
}

function latestVerifiedDate(shows) {
  return shows
    .map((show) => String(show.last_verified_at || "").trim())
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort()
    .at(-1) || "";
}

// A city is indexable only when it has enough distinct, useful coverage to be
// more than a duplicate of one artist or venue page, and when at least one of
// its upcoming shows can actually lead somewhere (see cityGate).
// Memoised per events array and wall-clock minute (added 2026-09-24). A Pages
// isolate keeps one parsed events.json across requests, and a single render
// used to derive the same set several times over (router, links, schema), each
// a full pass over every event. Only the default clock is cached; an explicit
// `options.now` (audits, forecasts, tests) always computes fresh. The result is
// frozen, so a caller that tried to sort or splice the shared array would throw
// in tests rather than corrupt another request's view.
const DERIVECITIES_MEMO = new WeakMap();
export function deriveCities(events, options = {}) {
  if (Number.isFinite(options.now) || !Array.isArray(events)) return deriveCitiesUncached(events, options);
  const minute = Math.floor(Date.now() / 60000);
  const hit = DERIVECITIES_MEMO.get(events);
  if (hit && hit.minute === minute) return hit.result;
  const result = Object.freeze(deriveCitiesUncached(events, options));
  DERIVECITIES_MEMO.set(events, { minute, result });
  return result;
}

function deriveCitiesUncached(events, options = {}) {
  const now = Number.isFinite(options.now) ? options.now : Date.now();
  const groups = new Map();

  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object") continue;
    const city = String(event.city || "").trim();
    const country = normalizeCountry(event.country);
    const venue = String(event.venue || "").trim();
    const artistSlug = slugify(event.artist_slug);
    const iso = String(event.dateTimeISO || event.datetime_iso || "").trim();
    const ts = Date.parse(iso);
    if (!city || !country || !venue || !artistSlug || !Number.isFinite(ts) || ts < now) continue;

    const slug = citySlug(city, country);
    if (!slug) continue;
    if (!groups.has(slug)) groups.set(slug, { slug, city, country, shows: [] });
    groups.get(slug).shows.push({
      id: String(event.id || "").trim(),
      artist_slug: artistSlug,
      artist_name: String(event.artist_name || "").trim(),
      event_name: String(event.event_name || "").trim(),
      tour_name: String(event.tour_name || "").trim(),
      venue,
      venue_slug: venueSlug(venue, city),
      datetime_iso: iso,
      // Carried so the page can label a show with the date it happens locally.
      // Without it the renderer falls back to UTC, which prints the wrong
      // calendar day for the majority of records — a US evening show is already
      // "tomorrow" in UTC — and disagreed with the same show's card on the
      // artist page.
      timezone: String(event.timezone || "").trim(),
      last_verified_at: String(event.last_verified_at || "").trim(),
      publishable: eventPublishable(event, now),
      statusPublishable: eventStatusPublishable(event, now),
      ts
    });
  }

  const cities = [];
  for (const group of groups.values()) {
    const shows = group.shows.sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));
    const artistSlugs = [...new Set(shows.map((show) => show.artist_slug))];
    const venueSlugs = [...new Set(shows.map((show) => show.venue_slug))];
    const publishableCount = shows.filter((show) => show.publishable).length;
    // Shows that also clear the row-status gate, i.e. the ones that get a
    // MusicEvent node. Distinct from publishableCount by design.
    const schemaEventCount = shows.filter((show) => show.statusPublishable).length;
    const record = {
      ...group,
      shows,
      artistSlugs,
      venueSlugs,
      showCount: shows.length,
      artistCount: artistSlugs.length,
      venueCount: venueSlugs.length,
      publishableCount,
      schemaEventCount,
      hasPublishable: publishableCount >= 1,
      lastmod: latestVerifiedDate(shows)
    };
    const gate = cityGate(record);
    cities.push({ ...record, indexable: gate.indexable, exclusionReasons: gate.reasons });
  }

  cities.sort((a, b) => b.showCount - a.showCount || a.city.localeCompare(b.city) || a.slug.localeCompare(b.slug));
  return cities;
}

export function findCity(events, slug, options = {}) {
  const target = slugify(slug);
  if (!target) return null;
  return deriveCities(events, options).find((city) => city.slug === target) || null;
}
