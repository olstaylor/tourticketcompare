// Read-only internal-link and indexability audit.
//
// Renders every HTML route through the real Pages Functions middleware (the
// same in-process harness scripts/smoke-prelaunch.mjs uses — no network, no
// production traffic) and reports, per page:
//   - indexability (robots meta) and route agreement
//   - canonical URL and drift from the request path
//   - title / meta-description uniqueness and SERP length budgets
//   - inbound internal-link counts, split into contextual links (inside
//     <main id="mainContent">, i.e. rendered page content) and shell links
//     (header/footer nav present on every page)
//   - orphan or weakly linked indexable pages
//   - JSON-LD structured-data types
//   - sitemap inclusion vs indexability
//
// Usage:
//   node scripts/audit-internal-links.mjs            # write report to reports/internal-links/
//   node scripts/audit-internal-links.mjs --check    # regression mode: exit 1 on
//                                                    # orphans, canonical drift, duplicate
//                                                    # or over-length titles/descriptions,
//                                                    # robots/route disagreement, or
//                                                    # sitemap/indexability mismatches
//                                                    # (no report files written)
//
// The audit never fetches external URLs and never mutates data files.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK_MODE = process.argv.includes("--check");
const ORIGIN = "https://tourticketcompare.com";

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

const middlewareModule = await import(pathToFileURL(path.join(root, "functions/_middleware.js")));
const sitemapModule = await import(pathToFileURL(path.join(root, "functions/sitemap.xml.js")));
const routeMetadataModule = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));
const venuesModule = await import(pathToFileURL(path.join(root, "functions/_venues.js")));
const citiesModule = await import(pathToFileURL(path.join(root, "functions/_cities.js")));
const artistCitiesModule = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));

const catalog = JSON.parse(await read("public/data/catalog.json"));
const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const events = JSON.parse(await read("public/data/events.json"));
const guideContent = JSON.parse(await read("public/data/guides-content.json"));
const robotsTxt = await read("public/robots.txt");
const staticHeaders = await read("public/_headers");

const assetMap = new Map();
for (const file of ["index.html", "data/catalog.json", "data/artists.json", "data/events.json", "data/guides-content.json", "data/provider-configs.json"]) {
  assetMap.set(`/${file}`, await read(`public/${file}`));
}
assetMap.set("/", assetMap.get("/index.html"));

const env = {
  MOCK_MODE: "false",
  ALLOW_MOCK_PRICES: "false",
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      const body = assetMap.get(url.pathname);
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
  return { status: response.status, location: response.headers.get("location") || "", html: await response.text() };
}

// ---------- route inventory (derived from the same sources the router uses) ----------

const staticPaths = Object.keys(routeMetadataModule.TRUST_ROUTES);
const guidePaths = Object.keys(routeMetadataModule.GUIDE_ROUTES);
const artistPaths = (catalog.artists || []).map((artist) => `/artists/${artist.slug}`);
const cities = citiesModule.deriveCities(events);
const cityPaths = cities.map((city) => `/cities/${city.slug}`);
const venues = venuesModule.deriveVenues(events);
const venuePaths = venues.map((venue) => `/venues/${venue.slug}`);
const indexableArtistSlugs = artistsMeta
  .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
  .map((artist) => String(artist?.slug || "").trim())
  .filter(Boolean);
const artistCityEntries = artistCitiesModule.deriveIndexableArtistCities(events, indexableArtistSlugs);
const artistCityPaths = artistCityEntries.map((entry) => entry.path);
const allPaths = [...new Set([...staticPaths, ...guidePaths, ...artistPaths, "/cities", ...cityPaths, "/venues", ...venuePaths, ...artistCityPaths])];

// ---------- parsing helpers ----------

function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function internalHrefs(fragment) {
  const hrefs = [];
  for (const match of fragment.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = decodeEntities(match[1]);
    if (!href.startsWith("/")) continue;
    if (href.startsWith("/api/") || href.startsWith("/data/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    if (clean === "" || /\.[a-z0-9]+$/i.test(clean)) continue;
    hrefs.push(clean);
  }
  return hrefs;
}

function schemaTypes(html) {
  const types = new Set();
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
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

function visibleWordCount(html) {
  return decodeEntities(String(html || "").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

// ---------- crawl ----------

const pages = new Map();
for (const pathname of allPaths) {
  const { status, location, html } = await renderRoute(pathname);
  const mainMatch = html.match(/<main id="mainContent">([\s\S]*?)<\/main>/);
  const main = mainMatch ? mainMatch[1] : "";
  const robots = extract(html, /<meta name="robots" content="([^"]*)"/);
  const title = decodeEntities(extract(html, /<title>([^<]*)<\/title>/i));
  const description = decodeEntities(extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i));
  const canonical = decodeEntities(extract(html, /<link rel="canonical" href="([^"]*)"/));
  pages.set(pathname, {
    path: pathname,
    status,
    location,
    title,
    description,
    robots,
    indexable: status === 200 && !robots.includes("noindex"),
    canonical,
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

// ---------- inbound counts ----------

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

const problems = [];

// Keep crawlable HTML open while excluding machine endpoints and raw data
// assets that duplicate information already presented on indexable pages.
for (const prefix of ["/api/", "/data/", "/internal/"]) {
  if (!robotsTxt.includes(`Disallow: ${prefix}`)) problems.push(`robots.txt: missing Disallow for ${prefix}`);
}
if (!robotsTxt.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) {
  problems.push("robots.txt: missing the canonical sitemap URL");
}
for (const prefix of ["/data/*", "/internal/*"]) {
  const block = staticHeaders.match(new RegExp(`(?:^|\\n)${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n([\\s\\S]*?)(?=\\n\\S|$)`, "m"))?.[1] || "";
  if (!/X-Robots-Tag:\s*noindex,\s*nofollow/i.test(block)) {
    problems.push(`_headers: ${prefix} is missing X-Robots-Tag: noindex, nofollow`);
  }
}

// ---------- legacy redirects ----------

// Old guide URLs must keep redirecting to a route that still renders and is
// indexable, so retired paths never decay into 404s or noindex targets.
for (const [from, to] of Object.entries(routeMetadataModule.OLD_GUIDE_REDIRECTS)) {
  const { status, location } = await renderRoute(from);
  if (status < 300 || status >= 400 || !location.endsWith(to)) {
    problems.push(`redirect: ${from} should redirect to ${to} (got ${status} ${location || "no location"})`);
  } else if (!pages.get(to) || pages.get(to).status !== 200 || !pages.get(to).indexable) {
    problems.push(`redirect: ${from} points at ${to}, which is missing, non-200, or noindex`);
  }
}

// ---------- sitemap ----------

const sitemapResponse = await sitemapModule.onRequestGet({ request: new Request(`${ORIGIN}/sitemap.xml`), env });
const sitemapXml = await sitemapResponse.text();
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.replace(/\/$/, "") || "/")
);

// ---------- findings ----------

const rendered = [...pages.values()].filter((page) => page.status === 200);
const indexablePages = rendered.filter((page) => page.indexable);

// Orphans: every indexable page (except the homepage) needs at least one
// contextual inbound link from another indexable page.
for (const page of indexablePages) {
  if (page.path === "/") continue;
  const substantialInbound = page.inboundContextual.filter((from) => pages.get(from)?.indexable);
  if (!substantialInbound.length) {
    problems.push(`orphan: indexable page ${page.path} has no contextual inbound link from another indexable page`);
  }
}

// Canonical drift.
for (const page of rendered) {
  const expected = `${ORIGIN}${page.path === "/" ? "/" : page.path}`;
  if (page.canonical !== expected) {
    problems.push(`canonical drift: ${page.path} declares canonical ${page.canonical || "(none)"} (expected ${expected})`);
  }
}

// Social metadata must mirror each route's search metadata. This catches
// regressions on routes outside the smaller smoke-test sample (notably guides
// and venue pages) and keeps shared-card previews complete and self-referencing.
for (const page of rendered) {
  if (page.ogTitle !== page.title) problems.push(`social: ${page.path} og:title does not match its title`);
  if (page.ogDescription !== page.description) problems.push(`social: ${page.path} og:description does not match its description`);
  if (page.ogUrl !== page.canonical) problems.push(`social: ${page.path} og:url does not match its canonical`);
  if (page.ogImage !== `${ORIGIN}/og-image.png`) problems.push(`social: ${page.path} has a missing or unexpected og:image`);
  if (page.ogImageType !== "image/png") problems.push(`social: ${page.path} og:image:type should be image/png`);
  if (!page.ogImageAlt) problems.push(`social: ${page.path} is missing og:image:alt`);
  if (page.twitterTitle !== page.title) problems.push(`social: ${page.path} twitter:title does not match its title`);
  if (page.twitterDescription !== page.description) problems.push(`social: ${page.path} twitter:description does not match its description`);
  if (page.twitterImage !== page.ogImage) problems.push(`social: ${page.path} twitter:image does not match og:image`);
  if (page.twitterImageAlt !== page.ogImageAlt) problems.push(`social: ${page.path} twitter:image:alt does not match og:image:alt`);
  if (page.twitterCard !== "summary_large_image") problems.push(`social: ${page.path} twitter:card should be summary_large_image`);
}

// Robots/indexability agreement with route intent: noindex pages must say
// noindex,follow; indexable pages must say index.
for (const page of rendered) {
  if (!page.robots) problems.push(`robots: ${page.path} has no robots meta`);
  else if (!page.indexable && !page.robots.includes("noindex")) problems.push(`robots: ${page.path} inconsistent robots meta "${page.robots}"`);
}

// Duplicate titles / descriptions among indexable pages.
function reportDuplicates(field) {
  const byValue = new Map();
  for (const page of indexablePages) {
    const value = page[field];
    if (!value) {
      problems.push(`${field}: indexable page ${page.path} has an empty ${field}`);
      continue;
    }
    if (!byValue.has(value)) byValue.set(value, []);
    byValue.get(value).push(page.path);
  }
  for (const [value, paths] of byValue) {
    if (paths.length > 1) problems.push(`duplicate ${field}: ${paths.join(", ")} share "${value.slice(0, 80)}"`);
  }
}
reportDuplicates("title");
reportDuplicates("description");

// SERP display budgets. Google truncates a title link at roughly 60 characters
// and a meta description at roughly 155-160, so anything longer is written but
// never read. Fixed metadata lives in functions/_route-metadata.js; city,
// venue, and artist-city metadata is generated from event data, so this check
// is what stops a future long venue name or wide date range from silently
// reintroducing an overflowing tag.
const { TITLE_LENGTH_LIMIT, META_DESCRIPTION_LENGTH_LIMIT } = routeMetadataModule;
for (const page of indexablePages) {
  if (page.title.length > TITLE_LENGTH_LIMIT) {
    problems.push(`title length: ${page.path} title is ${page.title.length} chars (budget ${TITLE_LENGTH_LIMIT}) — "${page.title}"`);
  }
  if (page.description.length > META_DESCRIPTION_LENGTH_LIMIT) {
    problems.push(
      `description length: ${page.path} meta description is ${page.description.length} chars (budget ${META_DESCRIPTION_LENGTH_LIMIT})`
    );
  }
}

// City pages are generated from changing event data, so validate the complete
// set rather than relying on a single representative smoke route. These checks
// enforce useful, evidence-backed location pages and prevent a future data
// change from silently creating thin, doorway-like sitemap entries.
for (const city of cities) {
  const path = `/cities/${city.slug}`;
  const page = pages.get(path);
  const expectedIndexable = city.showCount >= 4 && city.artistCount >= 2;
  if (city.indexable !== expectedIndexable) {
    problems.push(`city quality: ${path} indexability does not match the 4-show / 2-artist threshold`);
  }
  if (!page || page.status !== 200) {
    problems.push(`city quality: ${path} did not render successfully`);
    continue;
  }
  if (page.indexable !== expectedIndexable) {
    problems.push(`city quality: ${path} robots state does not match its substantial-content threshold`);
  }
  if (!expectedIndexable) continue;
  const mainText = decodeEntities(page.mainHtml);

  const requiredCopy = [
    "Maintained by the TourTicketCompare editorial team.",
    "Short answer:",
    `Which artists have upcoming concerts in ${city.city}?`,
    `Upcoming concerts in ${city.city}`,
    `How to compare tickets for a ${city.city} concert`,
    `${city.city} concert FAQ`
  ];
  for (const marker of requiredCopy) {
    if (!mainText.includes(marker)) problems.push(`city quality: ${path} is missing "${marker}"`);
  }
  const renderedDates = [...page.mainHtml.matchAll(/<time\s+datetime=/g)].length;
  if (renderedDates < city.showCount) {
    problems.push(`city quality: ${path} renders ${renderedDates} dated listings for ${city.showCount} source shows`);
  }
  const faqAnswers = [...page.mainHtml.matchAll(/<details>/g)].length;
  if (faqAnswers < 6) problems.push(`city quality: ${path} renders only ${faqAnswers} visible FAQ answers`);
  for (const type of ["Place", "CollectionPage", "FAQPage"]) {
    if (!page.schemaTypes.includes(type)) problems.push(`city quality: ${path} is missing ${type} structured data`);
  }
  if (page.mainWordCount < 350) {
    problems.push(`city quality: ${path} has only ${page.mainWordCount} visible words; investigate missing useful sections`);
  }
}

const cityIndexPage = pages.get("/cities");
if (!cityIndexPage?.mainHtml.includes("What makes a city page useful?")) {
  problems.push("city quality: /cities is missing its visible inclusion-method explanation");
}

for (const venue of venues) {
  const path = `/venues/${venue.slug}`;
  const page = pages.get(path);
  const expectedIndexable = venue.showCount >= 3 && venue.artistSlugs.length >= 2;
  if (venue.indexable !== expectedIndexable) {
    problems.push(`venue quality: ${path} indexability does not match the 3-show / 2-artist threshold`);
  }
  if (!page || page.status !== 200) {
    problems.push(`venue quality: ${path} did not render successfully`);
    continue;
  }
  if (page.indexable !== expectedIndexable) {
    problems.push(`venue quality: ${path} robots state does not match its substantial-content threshold`);
  }
  if (!expectedIndexable) continue;
  const mainText = decodeEntities(page.mainHtml);

  for (const marker of [
    "Maintained by the TourTicketCompare editorial team.",
    "Short answer:",
    `Upcoming shows at ${venue.venue}`,
    `Getting tickets at ${venue.venue}`,
    `${venue.venue} concert FAQ`
  ]) {
    if (!mainText.includes(marker)) problems.push(`venue quality: ${path} is missing "${marker}"`);
  }
  const faqAnswers = [...page.mainHtml.matchAll(/<details>/g)].length;
  if (faqAnswers < 6) problems.push(`venue quality: ${path} renders only ${faqAnswers} visible FAQ answers`);
  for (const type of ["MusicVenue", "CollectionPage", "FAQPage"]) {
    if (!page.schemaTypes.includes(type)) problems.push(`venue quality: ${path} is missing ${type} structured data`);
  }
  if (page.mainWordCount < 450) {
    problems.push(`venue quality: ${path} has only ${page.mainWordCount} visible words; investigate missing useful sections`);
  }
}

const venueIndexPage = pages.get("/venues");
if (!venueIndexPage?.mainHtml.includes("Why the coverage threshold matters")) {
  problems.push("venue quality: /venues is missing its visible inclusion-method explanation");
}

// Artist-city landing pages are generated from changing event data, so validate
// the complete qualifying set rather than a single representative route. These
// guards enforce useful, event-specific local pages and stop a future data
// change from silently creating thin token-swapped or doorway entries.
for (const entry of artistCityEntries) {
  const page = pages.get(entry.path);
  if (!page || page.status !== 200) {
    problems.push(`artist-city quality: ${entry.path} did not render successfully`);
    continue;
  }
  if (!page.indexable) {
    problems.push(`artist-city quality: ${entry.path} is a qualifying page but renders noindex`);
  }
  const mainText = decodeEntities(page.mainHtml);
  const requiredCopy = [
    "Tickets in",
    "At a glance:",
    "Short answer:",
    "How to buy",
    "ticket FAQ",
    // A crawl path back to the artist hub is mandatory on every artist-city page.
    `href="/artists/${entry.artistSlug}"`
  ];
  for (const marker of requiredCopy) {
    if (!(mainText.includes(marker) || page.mainHtml.includes(marker))) {
      problems.push(`artist-city quality: ${entry.path} is missing "${marker}"`);
    }
  }
  const renderedDates = [...page.mainHtml.matchAll(/<div class="show-date-badge">/g)].length;
  if (renderedDates < 1) {
    problems.push(`artist-city quality: ${entry.path} renders no dated show cards`);
  }
  const faqAnswers = [...page.mainHtml.matchAll(/<details>/g)].length;
  if (faqAnswers < 6) problems.push(`artist-city quality: ${entry.path} renders only ${faqAnswers} visible FAQ answers`);
  for (const type of ["Place", "CollectionPage", "FAQPage"]) {
    if (!page.schemaTypes.includes(type)) problems.push(`artist-city quality: ${entry.path} is missing ${type} structured data`);
  }
}

// Long-form guides must retain meaningful depth, visible authorship/review
// information, visible primary-source citations, and answer-oriented FAQ
// markup. This is a completeness guard, not a claim that word count ranks.
for (const path of guidePaths) {
  const page = pages.get(path);
  const entry = guideContent[path];
  if (!page || !entry) {
    problems.push(`guide quality: ${path} is missing its rendered page or authored content`);
    continue;
  }
  const sources = Array.isArray(entry.sources) ? entry.sources : [];
  if (sources.length < 2) problems.push(`guide quality: ${path} has fewer than two reviewed primary sources`);
  for (const source of sources) {
    if (!source?.name || !source?.publisher || !/^https:\/\//.test(source?.url || "") || !/^\d{4}-\d{2}-\d{2}$/.test(source?.lastChecked || "")) {
      problems.push(`guide quality: ${path} has an incomplete or non-HTTPS source record`);
    }
  }
  if (!page.mainHtml.includes('class="guide-provenance"')) problems.push(`guide quality: ${path} is missing visible editorial provenance`);
  if (!page.mainHtml.includes('class="nested-panel guide-sources"')) problems.push(`guide quality: ${path} is missing its visible source list`);
  if (!page.schemaTypes.includes("Article")) problems.push(`guide quality: ${path} is missing Article structured data`);
  if (!page.schemaTypes.includes("FAQPage")) problems.push(`guide quality: ${path} is missing FAQPage structured data`);
  if (page.mainWordCount < 700) problems.push(`guide quality: ${path} has only ${page.mainWordCount} visible words; investigate missing authored sections`);
}

// Sitemap vs indexability agreement.
for (const sitemapPath of sitemapPaths) {
  const page = pages.get(sitemapPath);
  if (!page) problems.push(`sitemap: ${sitemapPath} is in the sitemap but not in the crawled route inventory`);
  else if (page.status !== 200) problems.push(`sitemap: ${sitemapPath} is in the sitemap but returns ${page.status}`);
  else if (!page.indexable) problems.push(`sitemap: ${sitemapPath} is in the sitemap but renders noindex`);
}
for (const page of indexablePages) {
  if (!sitemapPaths.has(page.path)) {
    problems.push(`sitemap: indexable page ${page.path} is missing from the sitemap`);
  }
}

// ---------- output ----------

const summary = {
  generated_at: new Date().toISOString(),
  totals: {
    routes_crawled: pages.size,
    rendered_200: rendered.length,
    redirects: [...pages.values()].filter((page) => page.status >= 300 && page.status < 400).length,
    indexable: indexablePages.length,
    noindex: rendered.length - indexablePages.length,
    sitemap_entries: sitemapPaths.size,
    problems: problems.length
  },
  problems,
  pages: [...pages.values()].map((page) => ({
    path: page.path,
    status: page.status,
    indexable: page.indexable,
    robots: page.robots,
    canonical: page.canonical,
    title: page.title,
    description: page.description,
    main_word_count: page.mainWordCount,
    in_sitemap: sitemapPaths.has(page.path),
    schema_types: page.schemaTypes,
    inbound_contextual: page.inboundContextual.length,
    inbound_contextual_from: page.inboundContextual.slice().sort(),
    inbound_any: page.inboundAny,
    outbound_contextual: [...new Set(page.contextualLinks)].length
  }))
};

if (CHECK_MODE) {
  if (problems.length) {
    console.error(`internal-link audit: ${problems.length} problem(s) found`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }
  console.log(
    `internal-link audit passed: ${summary.totals.routes_crawled} routes, ${summary.totals.indexable} indexable, ` +
      `${summary.totals.noindex} noindex, ${summary.totals.sitemap_entries} sitemap entries, 0 problems`
  );
  process.exit(0);
}

const reportDir = path.join(root, "reports/internal-links");
await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(path.join(reportDir, "internal-links-audit.json"), `${JSON.stringify(summary, null, 2)}\n`);

const weak = summary.pages
  .filter((page) => page.indexable && page.path !== "/" && page.inbound_contextual <= 1)
  .sort((a, b) => a.inbound_contextual - b.inbound_contextual);
const markdown = [
  "# Internal links & indexability audit",
  "",
  `Generated: ${summary.generated_at} (read-only, rendered in-process — no live crawl)`,
  "",
  "## Totals",
  "",
  ...Object.entries(summary.totals).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Problems",
  "",
  ...(problems.length ? problems.map((problem) => `- ${problem}`) : ["- none"]),
  "",
  "## Weakly linked indexable pages (≤1 contextual inbound link)",
  "",
  ...(weak.length
    ? ["| Page | Contextual inbound | Total inbound | In sitemap |", "|---|---|---|---|",
       ...weak.map((page) => `| ${page.path} | ${page.inbound_contextual} | ${page.inbound_any} | ${page.in_sitemap ? "yes" : "no"} |`)]
    : ["- none"]),
  "",
  "## Pages",
  "",
  "| Page | Status | Indexable | Sitemap | Words | Contextual in | Schema types |",
  "|---|---|---|---|---|---|---|",
  ...summary.pages.map(
    (page) =>
      `| ${page.path} | ${page.status} | ${page.indexable ? "yes" : "no"} | ${page.in_sitemap ? "yes" : "no"} | ${page.main_word_count} | ${page.inbound_contextual} | ${page.schema_types.join(", ")} |`
  ),
  ""
].join("\n");
await fs.writeFile(path.join(reportDir, "internal-links-audit.md"), markdown);

console.log(`internal-link audit: ${pages.size} routes crawled, ${problems.length} problem(s)`);
for (const problem of problems) console.log(`  - ${problem}`);
console.log(`report written to reports/internal-links/internal-links-audit.{md,json}`);
