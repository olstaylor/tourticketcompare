// Shared in-process route crawl.
//
// Both site-wide audits — scripts/audit-internal-links.mjs (per-page
// correctness) and scripts/audit-indexable-surface.mjs (surface movement over
// time) — need the same thing first: every HTML route rendered through the real
// Pages Functions middleware, parsed into a comparable record. That crawl lives
// here so there is one crawler, one route inventory, and one definition of
// "what the site currently renders", rather than two that can drift apart or
// disagree about how many routes exist.
//
// The audits stay separate because they answer different questions and fail on
// different things; only the mechanical part is shared.
//
// Everything here is read-only: no network, no production traffic, no writes to
// data files. Assets are served from the repository's own public/ directory
// through a stub ASSETS binding, exactly as the smoke suite does.

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const ORIGIN = "https://tourticketcompare.com";

// Static assets the router may request while rendering.
const ASSET_FILES = [
  "index.html",
  "data/catalog.json",
  "data/artists.json",
  "data/events.json",
  "data/guides-content.json",
  "data/provider-configs.json"
];

// ---------------------------------------------------------------------------
// Parsing helpers (shared so both audits read a page the same way)
// ---------------------------------------------------------------------------

export function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

export function decodeEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Internal, crawlable hrefs in a fragment. Query and hash are stripped and a
 * trailing slash removed so one destination is always one key; API and data
 * endpoints and anything with a file extension are skipped.
 */
export function internalHrefs(fragment) {
  const hrefs = [];
  for (const match of String(fragment || "").matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = decodeEntities(match[1]);
    if (!href.startsWith("/")) continue;
    if (href.startsWith("/api/") || href.startsWith("/data/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    if (clean === "" || /\.[a-z0-9]+$/i.test(clean)) continue;
    hrefs.push(clean);
  }
  return hrefs;
}

export function schemaTypes(html) {
  const types = new Set();
  for (const match of String(html || "").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [parsed];
      for (const node of nodes) {
        if (node && node["@type"]) types.add(String(node["@type"]));
      }
    } catch (error) {
      types.add(`(unparseable: ${error.message})`);
    }
  }
  return [...types].sort();
}

export function visibleWordCount(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Fixture: data, modules, env, and the route inventory
// ---------------------------------------------------------------------------

/**
 * Load the repository's data files and shared function modules, build the stub
 * env, and derive the full route inventory the site currently renders.
 *
 * The inventory deliberately includes non-indexable routes (noindex artist
 * pages, below-threshold city/venue pages, single-date artist-city pages): both
 * audits need to see a page to check that it renders, is excluded for the right
 * reason, and is absent from the sitemap.
 *
 * @param {string} root Repository root.
 */
export async function loadSiteFixture(root) {
  const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
  const load = async (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

  const [middlewareModule, sitemapModule, routeMetadataModule, venuesModule, citiesModule, artistCitiesModule, artistIndexabilityModule, policyModule] =
    await Promise.all([
      load("functions/_middleware.js"),
      load("functions/sitemap.xml.js"),
      load("functions/_route-metadata.js"),
      load("functions/_venues.js"),
      load("functions/_cities.js"),
      load("functions/_artist-cities.js"),
      load("functions/_artist-indexability.js"),
      load("functions/_route-indexability.js")
    ]);

  const catalog = JSON.parse(await read("public/data/catalog.json"));
  const artistsMeta = JSON.parse(await read("public/data/artists.json"));
  const events = JSON.parse(await read("public/data/events.json"));
  const guideContent = JSON.parse(await read("public/data/guides-content.json"));

  const assetMap = new Map();
  for (const file of ASSET_FILES) assetMap.set(`/${file}`, await read(`public/${file}`));
  assetMap.set("/", assetMap.get("/index.html"));

  const env = {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    ASSETS: {
      async fetch(request) {
        const body = assetMap.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };

  async function renderRoute(pathname) {
    const response = await middlewareModule.onRequest({
      request: new Request(`${ORIGIN}${pathname}`),
      env,
      next: () => new Response("static-asset", { status: 200, headers: { "x-audit-next": "1" } })
    });
    return {
      status: response.status,
      location: response.headers.get("location") || "",
      html: await response.text()
    };
  }

  const indexableArtistSlugs = artistsMeta
    .filter((artist) => artist?.indexing_status === artistIndexabilityModule.INDEXABLE_ARTIST_STATUS)
    .map((artist) => String(artist?.slug || "").trim())
    .filter(Boolean);

  const cities = citiesModule.deriveCities(events);
  const venues = venuesModule.deriveVenues(events);
  // Every artist-city combination that renders, not just the indexable subset.
  const artistCityEntries = artistCitiesModule.deriveRenderedArtistCities(events, indexableArtistSlugs);

  const staticPaths = Object.keys(routeMetadataModule.TRUST_ROUTES);
  const guidePaths = Object.keys(routeMetadataModule.GUIDE_ROUTES);
  const artistPaths = (catalog.artists || []).map((artist) => `/artists/${artist.slug}`);
  const cityPaths = cities.map((city) => `/cities/${city.slug}`);
  const venuePaths = venues.map((venue) => `/venues/${venue.slug}`);
  const artistCityPaths = artistCityEntries.map((entry) => entry.path);

  const allPaths = [
    ...new Set([...staticPaths, ...guidePaths, ...artistPaths, "/cities", ...cityPaths, "/venues", ...venuePaths, ...artistCityPaths])
  ];

  return {
    root,
    read,
    env,
    renderRoute,
    modules: {
      middlewareModule,
      sitemapModule,
      routeMetadataModule,
      venuesModule,
      citiesModule,
      artistCitiesModule,
      artistIndexabilityModule,
      policyModule
    },
    data: { catalog, artistsMeta, events, guideContent },
    indexableArtistSlugs,
    cities,
    venues,
    artistCityEntries,
    paths: { staticPaths, guidePaths, artistPaths, cityPaths, venuePaths, artistCityPaths, allPaths }
  };
}

// ---------------------------------------------------------------------------
// Crawl
// ---------------------------------------------------------------------------

/**
 * Render each path and parse it into one record. The record carries the union
 * of what both audits need — the extra fields cost one regex each and keep the
 * two consumers reading identical data.
 *
 * @param {string[]} paths
 * @param {(pathname: string) => Promise<{status: number, location: string, html: string}>} renderRoute
 * @returns {Promise<Map<string, object>>}
 */
export async function crawlRoutes(paths, renderRoute) {
  const pages = new Map();
  for (const pathname of paths) {
    const { status, location, html } = await renderRoute(pathname);
    const main = (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "";
    const robots = extract(html, /<meta name="robots" content="([^"]*)"/);
    pages.set(pathname, {
      path: pathname,
      status,
      location,
      robots,
      indexable: status === 200 && !robots.includes("noindex"),
      title: decodeEntities(extract(html, /<title>([^<]*)<\/title>/i)),
      description: decodeEntities(extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i)),
      canonical: decodeEntities(extract(html, /<link rel="canonical" href="([^"]*)"/)),
      ogTitle: decodeEntities(extract(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i)),
      ogDescription: decodeEntities(extract(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i)),
      ogUrl: decodeEntities(extract(html, /<meta\s+property="og:url"\s+content="([^"]*)"/i)),
      ogImage: decodeEntities(extract(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i)),
      ogImageType: decodeEntities(extract(html, /<meta\s+property="og:image:type"\s+content="([^"]*)"/i)),
      ogImageAlt: decodeEntities(extract(html, /<meta\s+property="og:image:alt"\s+content="([^"]*)"/i)),
      twitterTitle: decodeEntities(extract(html, /<meta\s+name="twitter:title"\s+content="([^"]*)"/i)),
      twitterDescription: decodeEntities(extract(html, /<meta\s+name="twitter:description"\s+content="([^"]*)"/i)),
      twitterImage: decodeEntities(extract(html, /<meta\s+name="twitter:image"\s+content="([^"]*)"/i)),
      twitterImageAlt: decodeEntities(extract(html, /<meta\s+name="twitter:image:alt"\s+content="([^"]*)"/i)),
      twitterCard: decodeEntities(extract(html, /<meta\s+name="twitter:card"\s+content="([^"]*)"/i)),
      schemaTypes: status === 200 ? schemaTypes(html) : [],
      mainHtml: main,
      mainWordCount: visibleWordCount(main),
      contextualLinks: internalHrefs(main),
      allLinks: internalHrefs(html)
    });
  }
  return pages;
}

/**
 * Annotate each page with its inbound internal links.
 *
 * `inboundContextual` is the list of pages linking to it from inside
 * <main> (rendered content), which is what "is this page actually linked"
 * means; `inboundAny` counts every link including the header/footer shell.
 * Self-links are excluded.
 *
 * @param {Map<string, object>} pages
 */
export function computeInboundLinks(pages) {
  for (const page of pages.values()) {
    page.inboundContextual = [];
    page.inboundAny = 0;
  }
  for (const page of pages.values()) {
    if (page.status !== 200) continue;
    for (const target of new Set(page.contextualLinks)) {
      const targetPage = pages.get(target);
      if (targetPage && target !== page.path) targetPage.inboundContextual.push(page.path);
    }
    for (const target of new Set(page.allLinks)) {
      const targetPage = pages.get(target);
      if (targetPage && target !== page.path) targetPage.inboundAny += 1;
    }
  }
  return pages;
}

/**
 * Path set from a rendered sitemap.xml response.
 *
 * @param {string} xml
 */
export function sitemapPathsFromXml(xml) {
  return new Set(
    [...String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname.replace(/\/$/, "") || "/"
    )
  );
}
