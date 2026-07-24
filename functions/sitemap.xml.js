import { TRUST_ROUTES, GUIDE_ROUTES, canonicalOrigin } from "./_route-metadata.js";
import { deriveVenues } from "./_venues.js";
import { deriveCities } from "./_cities.js";
import { deriveIndexableArtistCities } from "./_artist-cities.js";

// Derived from _route-metadata.js (single source of truth) so the sitemap
// cannot silently drift from the routes the site actually renders.
const STATIC_INDEXABLE_PATHS = [
  ...Object.keys(TRUST_ROUTES).filter((path) => TRUST_ROUTES[path].indexable),
  ...Object.keys(GUIDE_ROUTES)
];

const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function loadJsonAsset(env, pathname) {
  const response = await env?.ASSETS?.fetch(new Request(`https://assets.local${pathname}`));
  if (!response?.ok) return null;
  return response.json();
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Stable freshness date for static/guide routes. These pages change rarely, so
// stamping them with "today" on every request is a noisy/false signal to crawlers.
// Bump this when the static page content or guides are meaningfully revised.
const STATIC_LASTMOD = "2026-07-13";

async function loadIndexableVenues(env) {
  try {
    const events = await loadJsonAsset(env, "/data/events.json");
    if (!Array.isArray(events)) return [];
    return deriveVenues(events).filter((venue) => venue.indexable);
  } catch (error) {
    return [];
  }
}

async function loadIndexableCities(env) {
  try {
    const events = await loadJsonAsset(env, "/data/events.json");
    if (!Array.isArray(events)) return [];
    return deriveCities(events).filter((city) => city.indexable);
  } catch (error) {
    return [];
  }
}

async function loadIndexableArtistCities(env, indexableArtistSlugs) {
  try {
    const events = await loadJsonAsset(env, "/data/events.json");
    if (!Array.isArray(events)) return [];
    return deriveIndexableArtistCities(events, indexableArtistSlugs);
  } catch (error) {
    return [];
  }
}

async function loadIndexableArtists(env) {
  try {
    const [catalog, artistsMeta] = await Promise.all([
      loadJsonAsset(env, "/data/catalog.json"),
      loadJsonAsset(env, "/data/artists.json")
    ]);

    if (!Array.isArray(catalog?.artists) || !Array.isArray(artistsMeta)) return [];

    // Map slug -> last_verified_at so each artist URL gets a real freshness date.
    const verifiedBySlug = new Map(
      artistsMeta
        .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
        .map((artist) => [String(artist?.slug || "").trim(), String(artist?.last_verified_at || "").trim()])
        .filter(([slug]) => slug)
    );

    return catalog.artists
      .map((artist) => String(artist?.slug || "").trim())
      .filter((slug) => slug && verifiedBySlug.has(slug))
      .map((slug) => {
        const verified = verifiedBySlug.get(slug);
        return { slug, lastmod: ISO_DATE.test(verified) ? verified : STATIC_LASTMOD };
      });
  } catch (error) {
    return [];
  }
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);
  const staticEntries = STATIC_INDEXABLE_PATHS.map((path) => {
    const guideLastmod = GUIDE_ROUTES[path]?.lastmod;
    return {
      path,
      lastmod: ISO_DATE.test(String(guideLastmod || "")) ? guideLastmod : STATIC_LASTMOD,
      changefreq: "monthly",
      priority: path === "/" ? "1.0" : "0.6"
    };
  });
  const indexableArtists = await loadIndexableArtists(env);
  const artistEntries = indexableArtists.map(({ slug, lastmod }) => ({
    path: `/artists/${slug}`,
    lastmod,
    changefreq: "weekly",
    priority: "0.8"
  }));
  // Artist-city landing pages, gated on the same derivation the router uses so
  // only combinations with qualifying upcoming inventory ever enter the sitemap.
  const artistCityEntries = (await loadIndexableArtistCities(env, indexableArtists.map((artist) => artist.slug))).map(
    ({ path, lastmod }) => ({
      path,
      lastmod: ISO_DATE.test(String(lastmod || "")) ? lastmod : STATIC_LASTMOD,
      changefreq: "weekly",
      priority: "0.7"
    })
  );
  const [indexableCities, indexableVenues] = await Promise.all([
    loadIndexableCities(env),
    loadIndexableVenues(env)
  ]);
  const cityLastmod = indexableCities.map((city) => city.lastmod).filter((value) => ISO_DATE.test(value)).sort().at(-1) || STATIC_LASTMOD;
  const cityEntries = indexableCities.length
    ? [{ path: "/cities", lastmod: cityLastmod, changefreq: "weekly", priority: "0.7" }].concat(
        indexableCities.map((city) => ({
          path: `/cities/${city.slug}`,
          lastmod: ISO_DATE.test(city.lastmod) ? city.lastmod : STATIC_LASTMOD,
          changefreq: "weekly",
          priority: "0.7"
        }))
      )
    : [];
  const venueLastmod = indexableVenues.map((venue) => venue.lastmod).filter((value) => ISO_DATE.test(value)).sort().at(-1) || STATIC_LASTMOD;
  const venueEntries = indexableVenues.length
    ? [{ path: "/venues", lastmod: venueLastmod, changefreq: "weekly", priority: "0.6" }].concat(
        indexableVenues.map((venue) => ({
          path: `/venues/${venue.slug}`,
          lastmod: ISO_DATE.test(venue.lastmod) ? venue.lastmod : STATIC_LASTMOD,
          changefreq: "weekly",
          priority: "0.6"
        }))
      )
    : [];
  const entries = staticEntries.concat(artistEntries, artistCityEntries, cityEntries, venueEntries);

  const urlsXml = entries
    .map((entry) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(`${origin}${entry.path}`)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
