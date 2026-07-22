import { venueSlug } from "./_venues.js";

// Shared city derivation used by the HTML router, sitemap, llms.txt, and
// internal-link audit. City pages aggregate only upcoming records already
// present in public/data/events.json; no location or event facts are inferred.

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
// more than a duplicate of one artist or venue page.
export function deriveCities(events, options = {}) {
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
      last_verified_at: String(event.last_verified_at || "").trim(),
      ts
    });
  }

  const cities = [];
  for (const group of groups.values()) {
    const shows = group.shows.sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id));
    const artistSlugs = [...new Set(shows.map((show) => show.artist_slug))];
    const venueSlugs = [...new Set(shows.map((show) => show.venue_slug))];
    cities.push({
      ...group,
      shows,
      artistSlugs,
      venueSlugs,
      showCount: shows.length,
      artistCount: artistSlugs.length,
      venueCount: venueSlugs.length,
      lastmod: latestVerifiedDate(shows),
      indexable: shows.length >= 4 && artistSlugs.length >= 2
    });
  }

  cities.sort((a, b) => b.showCount - a.showCount || a.city.localeCompare(b.city) || a.slug.localeCompare(b.slug));
  return cities;
}

export function findCity(events, slug, options = {}) {
  const target = slugify(slug);
  if (!target) return null;
  return deriveCities(events, options).find((city) => city.slug === target) || null;
}
