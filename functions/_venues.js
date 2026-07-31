import { venueGate, eventPublishable } from "./_route-indexability.js";

// Shared venue derivation used by the HTML router ([[path]].js) and the sitemap
// (sitemap.xml.js) so the two cannot drift. Venue pages are an aggregation layer
// over already-verified event records in public/data/events.json — they invent no
// data. Each venue page lists the upcoming shows we already track at that venue and
// links out to the artist pages, where the full event context remains available.
// The HTML router may also render the existing event CTA component on venue pages;
// provider/publishability logic stays there and is not duplicated in this module.

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// A venue is keyed by venue name + city so two cities with a similarly named venue
// stay distinct, while inconsistent country labels for the same physical venue
// (e.g. "United States" vs "United States Of America") merge into one page.
export function venueSlug(venue, city) {
  return slugify(`${String(venue || "").trim()} ${String(city || "").trim()}`);
}

function mostFrequent(values) {
  const counts = new Map();
  let best = "";
  let bestCount = 0;
  for (const raw of values) {
    const value = String(raw || "").trim();
    if (!value) continue;
    const next = (counts.get(value) || 0) + 1;
    counts.set(value, next);
    if (next > bestCount) {
      best = value;
      bestCount = next;
    }
  }
  return best;
}

// Build the full set of venues that have at least one upcoming tracked show.
// Indexing requires enough breadth to answer venue-level intent rather than
// duplicating a single artist page, plus at least one upcoming show that can
// lead somewhere. Thresholds and reasons live in _route-indexability.js.
export function deriveVenues(events, options = {}) {
  const now = Number.isFinite(options.now) ? options.now : Date.now();
  const groups = new Map();

  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object") continue;
    const venue = String(event.venue || "").trim();
    const city = String(event.city || "").trim();
    const iso = String(event.dateTimeISO || event.datetime_iso || "").trim();
    const artistSlug = slugify(event.artist_slug);
    const ts = Date.parse(iso);
    if (!venue || !city || !artistSlug || !Number.isFinite(ts) || ts < now) continue;

    const slug = venueSlug(venue, city);
    if (!slug) continue;
    if (!groups.has(slug)) {
      groups.set(slug, { slug, venueLabels: [], cityLabels: [], countryLabels: [], shows: [] });
    }
    const group = groups.get(slug);
    group.venueLabels.push(venue);
    group.cityLabels.push(city);
    group.countryLabels.push(String(event.country || "").trim());
    group.shows.push({
      id: String(event.id || "").trim(),
      artist_slug: artistSlug,
      artist_name: String(event.artist_name || "").trim(),
      event_name: String(event.event_name || "").trim(),
      tour_name: String(event.tour_name || "").trim(),
      datetime_iso: iso,
      last_verified_at: String(event.last_verified_at || "").trim(),
      publishable: eventPublishable(event),
      ts
    });
  }

  const venues = [];
  for (const group of groups.values()) {
    const shows = group.shows.sort((a, b) => a.ts - b.ts);
    const artistSlugs = [...new Set(shows.map((s) => s.artist_slug))];
    const publishableCount = shows.filter((show) => show.publishable).length;
    const record = {
      slug: group.slug,
      venue: mostFrequent(group.venueLabels),
      city: mostFrequent(group.cityLabels),
      country: mostFrequent(group.countryLabels),
      shows,
      artistSlugs,
      showCount: shows.length,
      artistCount: artistSlugs.length,
      publishableCount,
      hasPublishable: publishableCount >= 1,
      lastmod: shows
        .map((show) => show.last_verified_at)
        .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
        .sort()
        .at(-1) || ""
    };
    const gate = venueGate(record);
    venues.push({ ...record, indexable: gate.indexable, exclusionReasons: gate.reasons });
  }

  venues.sort(
    (a, b) => b.showCount - a.showCount || a.venue.localeCompare(b.venue) || a.slug.localeCompare(b.slug)
  );
  return venues;
}

export function findVenue(events, slug, options = {}) {
  const target = slugify(slug);
  if (!target) return null;
  return deriveVenues(events, options).find((venue) => venue.slug === target) || null;
}
