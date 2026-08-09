import { TRUST_ROUTES, GUIDE_ROUTES, canonicalOrigin } from "./_route-metadata.js";
import { deriveVenues } from "./_venues.js";
import { deriveCities } from "./_cities.js";
import { deriveIndexableArtistCities } from "./_artist-cities.js";
import { deriveIndexableBlogEntries } from "./_blog.js";

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

// Static and guide routes carry their own `lastmod`, maintained by
// scripts/sync-content-provenance.mjs: it fingerprints each page's copy and
// advances the date only when the copy actually changes. This replaces a
// hardcoded constant that nobody remembered to bump — it had been frozen at
// 2026-07-13 while eleven guides were separately declaring dates from June.
//
// `lastmod` is optional per the sitemap protocol, so a route with no verifiable
// modification date now omits the element entirely rather than inheriting a
// shared date that was true for none of them. A wrong lastmod is worse than an
// absent one: crawlers learn to distrust the whole file.
const lastmodOf = (value) => (ISO_DATE.test(String(value || "")) ? String(value) : null);

/** Newest of a set of ISO dates, or null when none are usable. */
const newestDate = (...values) => values.map(lastmodOf).filter(Boolean).sort().at(-1) || null;

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

// Blog index, posts, and tag pages. deriveIndexableBlogEntries applies the same
// gates the router applies, so a noindex post or a one-post tag page can never
// enter the sitemap.
async function loadIndexableBlogEntries(env) {
  try {
    return deriveIndexableBlogEntries(await loadJsonAsset(env, "/data/blog-content.json"));
  } catch (error) {
    return [];
  }
}

/**
 * slug -> last_verified_at for every artist that has one, unfiltered.
 *
 * Location pages take their lastmod from the newest `last_verified_at` among
 * the event rows they aggregate, but 269 of 607 event records carry no such
 * field, which left 54 city/venue/artist-city routes with no date at all. They
 * used to inherit the shared static constant, which asserted a verification
 * date those pages had never had.
 *
 * The honest fallback is the artist-level verification date for the artists
 * whose shows the page is built from: a real date, produced by the same daily
 * audit, describing the same underlying records. It is the date the artist page
 * itself publishes for that content.
 */
async function loadArtistVerificationDates(env) {
  try {
    const artistsMeta = await loadJsonAsset(env, "/data/artists.json");
    if (!Array.isArray(artistsMeta)) return new Map();
    return new Map(
      artistsMeta
        .map((artist) => [String(artist?.slug || "").trim(), lastmodOf(artist?.last_verified_at)])
        .filter(([slug, date]) => slug && date)
    );
  } catch (error) {
    return new Map();
  }
}

/** Newest artist verification date across a page's contributing artists. */
const artistFallbackLastmod = (dates, slugs) => newestDate(...(slugs || []).map((slug) => dates.get(slug)));

async function loadIndexableArtists(env) {
  try {
    const [catalog, artistsMeta] = await Promise.all([
      loadJsonAsset(env, "/data/catalog.json"),
      loadJsonAsset(env, "/data/artists.json")
    ]);

    if (!Array.isArray(catalog?.artists) || !Array.isArray(artistsMeta)) return [];

    // Map slug -> last_verified_at so each editorially indexable artist URL
    // gets a real freshness date. Empty boards remain valid artist pages, so
    // event availability is deliberately not used to remove them.
    const verifiedBySlug = new Map(
      artistsMeta
        .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
        .map((artist) => [String(artist?.slug || "").trim(), String(artist?.last_verified_at || "").trim()])
        .filter(([slug]) => slug)
    );

    return catalog.artists
      .map((artist) => String(artist?.slug || "").trim())
      .filter((slug) => slug && verifiedBySlug.has(slug))
      .map((slug) => ({ slug, lastmod: lastmodOf(verifiedBySlug.get(slug)) }));
  } catch (error) {
    return [];
  }
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);
  const [indexableArtists, artistVerificationDates] = await Promise.all([
    loadIndexableArtists(env),
    loadArtistVerificationDates(env)
  ]);
  // Index pages are as fresh as the newest thing they list, which is a real
  // date rather than an assertion about their own copy. Their own content
  // fingerprint still counts — whichever is newer wins.
  const newestArtistLastmod = newestDate(...indexableArtists.map((artist) => artist.lastmod));
  const newestGuideLastmod = newestDate(...Object.values(GUIDE_ROUTES).map((route) => route.lastmod));
  const DATA_DERIVED_INDEX_LASTMOD = {
    "/": newestArtistLastmod,
    "/artists": newestArtistLastmod,
    "/compare-concert-ticket-prices": newestArtistLastmod,
    "/guides": newestGuideLastmod
  };
  const staticEntries = STATIC_INDEXABLE_PATHS.map((path) => ({
    path,
    lastmod: newestDate(
      GUIDE_ROUTES[path]?.lastmod ?? TRUST_ROUTES[path]?.lastmod,
      DATA_DERIVED_INDEX_LASTMOD[path]
    ),
    changefreq: "monthly",
    priority: path === "/" ? "1.0" : "0.6"
  }));
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
      lastmod: newestDate(lastmod, artistFallbackLastmod(artistVerificationDates, [path.split("/")[2]])),
      changefreq: "weekly",
      priority: "0.7"
    })
  );
  const [indexableCities, indexableVenues] = await Promise.all([
    loadIndexableCities(env),
    loadIndexableVenues(env)
  ]);
  const cityLastmod = newestDate(
    ...indexableCities.map((city) => newestDate(city.lastmod, artistFallbackLastmod(artistVerificationDates, city.artistSlugs)))
  );
  const cityEntries = indexableCities.length
    ? [{ path: "/cities", lastmod: cityLastmod, changefreq: "weekly", priority: "0.7" }].concat(
        indexableCities.map((city) => ({
          path: `/cities/${city.slug}`,
          lastmod: newestDate(city.lastmod, artistFallbackLastmod(artistVerificationDates, city.artistSlugs)),
          changefreq: "weekly",
          priority: "0.7"
        }))
      )
    : [];
  const venueLastmod = newestDate(
    ...indexableVenues.map((venue) => newestDate(venue.lastmod, artistFallbackLastmod(artistVerificationDates, venue.artistSlugs)))
  );
  const venueEntries = indexableVenues.length
    ? [{ path: "/venues", lastmod: venueLastmod, changefreq: "weekly", priority: "0.6" }].concat(
        indexableVenues.map((venue) => ({
          path: `/venues/${venue.slug}`,
          lastmod: newestDate(venue.lastmod, artistFallbackLastmod(artistVerificationDates, venue.artistSlugs)),
          changefreq: "weekly",
          priority: "0.6"
        }))
      )
    : [];
  // A blog lastmod is the post's own authored date, so it needs no fallback:
  // lastmodOf returns null for anything malformed and the entry simply omits
  // <lastmod>, per the shared rule above.
  const blogEntries = (await loadIndexableBlogEntries(env)).map((entry) => ({
    path: entry.path,
    lastmod: lastmodOf(entry.lastmod),
    changefreq: entry.type === "blog-post" ? "monthly" : "weekly",
    priority: entry.type === "blog-post" ? "0.6" : "0.5"
  }));
  const entries = staticEntries.concat(artistEntries, artistCityEntries, cityEntries, venueEntries, blogEntries);

  const urlsXml = entries
    .map((entry) => {
      // <lastmod> is optional in the protocol. Emit it only when a real date
      // backs it, rather than falling back to a shared constant that would be
      // wrong for every route that inherited it.
      return [
        "  <url>",
        `    <loc>${escapeXml(`${origin}${entry.path}`)}</loc>`,
        entry.lastmod ? `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : null,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>"
      ]
        .filter(Boolean)
        .join("\n");
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
