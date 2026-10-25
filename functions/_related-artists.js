// Artists who are playing the same cities as a given artist.
//
// Takes the lightweight events-index.json rows (city, country and date fields
// only; no provider fields), so it never needs the multi-megabyte dataset.
// Derived only from tracked events and the editorial indexable-artist set, so
// every link is a real shared city, never an invented "fans also like". Used
// for the artist page's "Also playing these cities" block, which gives each
// artist page inbound links from sibling artist pages.

import { deriveCities } from "./_cities.js";

const norm = (value) => String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * @param {Array<object>} events         All raw events.
 * @param {string} artistSlug
 * @param {Map<string, string>} linkable  slug -> display name, linkable artists only.
 * @param {number} [limit]
 * @returns {Array<{ slug: string, name: string, cities: Array<{ slug: string, label: string }> }>}
 */
export function relatedArtistsBySharedCity(events, artistSlug, linkable, limit = 6) {
  const self = norm(artistSlug);
  const cities = deriveCities(events).filter((city) => city.artistSlugs.includes(self));
  const byArtist = new Map();
  for (const city of cities) {
    for (const slug of city.artistSlugs) {
      if (slug === self || !linkable.has(slug)) continue;
      if (!byArtist.has(slug)) byArtist.set(slug, []);
      byArtist.get(slug).push({ slug: city.slug, label: city.city });
    }
  }
  return [...byArtist.entries()]
    .filter(([, shared]) => shared.length > 1)
    .map(([slug, shared]) => ({ slug, name: linkable.get(slug), cities: shared }))
    .sort((a, b) => b.cities.length - a.cities.length || a.name.localeCompare(b.name))
    .slice(0, limit);
}
