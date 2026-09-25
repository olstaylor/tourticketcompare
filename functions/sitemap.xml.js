import { TRUST_ROUTES, GUIDE_ROUTES, canonicalOrigin } from "./_route-metadata.js";
import { deriveVenues } from "./_venues.js";
import { deriveCities } from "./_cities.js";
import { deriveIndexableArtistCities } from "./_artist-cities.js";
import { deriveIndexableBlogEntries } from "./_blog.js";
import { artistPageIndexable } from "./_artist-indexability.js";
import { deriveOnsaleCalendar } from "./_onsale-calendar.js";

// Derived from _route-metadata.js (single source of truth) so the sitemap
// cannot silently drift from the routes the site actually renders.
const STATIC_INDEXABLE_PATHS = [
  ...Object.keys(TRUST_ROUTES).filter((path) => TRUST_ROUTES[path].indexable),
  ...Object.keys(GUIDE_ROUTES)
];

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

// events.json is ~4 MB and every derivation below needs it. Parse it once per
// request (env is a fresh object per invocation) instead of once per section,
// which was four full parses of the same file on every sitemap fetch.
const eventsByEnv = new WeakMap();
function loadEvents(env) {
  if (!env || typeof env !== "object") return loadJsonAsset(env, "/data/events.json");
  if (!eventsByEnv.has(env)) eventsByEnv.set(env, loadJsonAsset(env, "/data/events.json").catch(() => null));
  return eventsByEnv.get(env);
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
    const events = await loadEvents(env);
    if (!Array.isArray(events)) return [];
    return deriveVenues(events).filter((venue) => venue.indexable);
  } catch (error) {
    return [];
  }
}

async function loadIndexableCities(env) {
  try {
    const events = await loadEvents(env);
    if (!Array.isArray(events)) return [];
    return deriveCities(events).filter((city) => city.indexable);
  } catch (error) {
    return [];
  }
}

async function loadIndexableArtistCities(env, indexableArtistSlugs) {
  try {
    const events = await loadEvents(env);
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

    // Map slug -> last_verified_at so each indexable artist URL gets a real
    // freshness date. Empty boards remain valid artist pages for owner-promoted
    // artists; only an auto-promoted artist is gated on upcoming dates, so the
    // event file is read only when one exists.
    // Every artist gate now reads events: an owner-promoted artist needs one
    // tracked date, an auto-promoted one three upcoming (artistPageIndexable).
    const events = await loadEvents(env);
    const verifiedBySlug = new Map(
      artistsMeta
        .filter((artist) => artist && artistPageIndexable(artist, Array.isArray(events) ? events : []))
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

// Sitemap segments, in /sitemap.xml order. Each is also served on its own at
// /sitemaps/<segment>.xml and listed by /sitemap-index.xml, so Search Console
// and Bing report coverage per page type (added 2026-09-24).
export const SITEMAP_SEGMENTS = Object.freeze(["pages", "artists", "artist-cities", "cities", "venues", "blog"]);

// `only` limits the work to the segments a request serves: /sitemaps/blog.xml
// reads no event data at all, and /sitemaps/artists.xml derives no city or
// venue. Segments not asked for come back empty.
async function buildSegments(env, only = SITEMAP_SEGMENTS) {
  const need = new Set(only);
  const needArtists = need.has("pages") || need.has("artists") || need.has("artist-cities");
  const [indexableArtists, artistVerificationDates] = await Promise.all([
    needArtists ? loadIndexableArtists(env) : [],
    need.has("artist-cities") || need.has("cities") || need.has("venues") ? loadArtistVerificationDates(env) : new Map()
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
  // The on-sale calendar joins the pages segment only while its own gate
  // passes, read from the same derivation the router uses. Its lastmod is the
  // newer of the latest on-sale that has already opened (the page moves with
  // the clock) and the newest artist verification, like the other
  // data-derived index pages.
  if (need.has("pages")) {
    const events = await loadEvents(env).catch(() => null);
    const calendar = Array.isArray(events) ? deriveOnsaleCalendar(events) : null;
    if (calendar?.indexable) {
      staticEntries.push({
        path: "/on-sale",
        lastmod: newestDate(calendar.lastOpenedDate, newestArtistLastmod),
        changefreq: "daily",
        priority: "0.6"
      });
    }
  }
  const artistEntries = indexableArtists.map(({ slug, lastmod }) => ({
    path: `/artists/${slug}`,
    lastmod,
    changefreq: "weekly",
    priority: "0.8"
  }));
  // Artist-city landing pages, gated on the same derivation the router uses so
  // only combinations with qualifying upcoming inventory ever enter the sitemap.
  const artistCityEntries = (need.has("artist-cities") ? await loadIndexableArtistCities(env, indexableArtists.map((artist) => artist.slug)) : []).map(
    ({ path, lastmod }) => ({
      path,
      lastmod: newestDate(lastmod, artistFallbackLastmod(artistVerificationDates, [path.split("/")[2]])),
      changefreq: "weekly",
      priority: "0.7"
    })
  );
  const [indexableCities, indexableVenues] = await Promise.all([
    need.has("cities") ? loadIndexableCities(env) : [],
    need.has("venues") ? loadIndexableVenues(env) : []
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
  const blogEntries = (need.has("blog") ? await loadIndexableBlogEntries(env) : []).map((entry) => ({
    path: entry.path,
    lastmod: lastmodOf(entry.lastmod),
    changefreq: entry.type === "blog-post" ? "monthly" : "weekly",
    priority: entry.type === "blog-post" ? "0.6" : "0.5"
  }));
  return {
    pages: need.has("pages") ? staticEntries : [],
    artists: need.has("artists") ? artistEntries : [],
    "artist-cities": artistCityEntries,
    cities: cityEntries,
    venues: venueEntries,
    blog: blogEntries
  };
}

// The index and its six children are usually fetched back to back, so a full
// build is kept for the rest of the minute per assets binding (stable within a
// Pages isolate, like the router's JSON asset cache). A child request reuses
// it when present and otherwise builds only its own segment.
const FULL_BUILD_MEMO = new WeakMap();
export async function buildSitemapSegments(env, only = SITEMAP_SEGMENTS) {
  const binding = env?.ASSETS;
  const minute = Math.floor(Date.now() / 60000);
  const hit = binding && typeof binding === "object" ? FULL_BUILD_MEMO.get(binding) : null;
  if (hit && hit.minute === minute) return hit.build;
  const full = SITEMAP_SEGMENTS.every((segment) => only.includes(segment));
  const build = buildSegments(env, only);
  if (full && binding && typeof binding === "object") {
    FULL_BUILD_MEMO.set(binding, { minute, build });
    build.catch(() => FULL_BUILD_MEMO.delete(binding));
  }
  return build;
}

export function requestOrigin(request) {
  const requestUrl = new URL(request.url);
  return canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);
}

export function xmlResponse(xml) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

export function renderUrlset(entries, origin) {
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

/** Newest lastmod in a segment, for its <sitemap> entry in the index. */
export function segmentLastmod(entries) {
  return newestDate(...entries.map((entry) => entry.lastmod));
}

// /sitemap.xml keeps serving every indexable URL in one urlset: IndexNow, the
// site audits and any engine that already has it submitted read it as before.
export async function onRequestGet({ request, env }) {
  const segments = await buildSitemapSegments(env);
  const entries = SITEMAP_SEGMENTS.flatMap((segment) => segments[segment]);
  return xmlResponse(renderUrlset(entries, requestOrigin(request)));
}

/** Handler for one /sitemaps/<segment>.xml file. */
export function segmentHandler(segment) {
  return async function onRequestGet({ request, env }) {
    const segments = await buildSitemapSegments(env, [segment]);
    return xmlResponse(renderUrlset(segments[segment] || [], requestOrigin(request)));
  };
}

/** Handler for /sitemap-index.xml: one <sitemap> per non-empty segment. */
export async function sitemapIndexHandler({ request, env }) {
  const origin = requestOrigin(request);
  const segments = await buildSitemapSegments(env);
  const items = SITEMAP_SEGMENTS.filter((segment) => segments[segment].length)
    .map((segment) => {
      const lastmod = segmentLastmod(segments[segment]);
      return [
        "  <sitemap>",
        `    <loc>${escapeXml(`${origin}/sitemaps/${segment}.xml`)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
        "  </sitemap>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`);
}
