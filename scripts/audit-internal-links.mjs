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
//   - event pages (a noindex,follow leaf): every parent-board link lands on a
//     served canonical event page, every served event page is linked from the
//     boards that list its date, and event pages link back to live parents
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

import {
  ORIGIN,
  loadSiteFixture,
  crawlRoutes,
  computeInboundLinks,
  sitemapPathsFromXml,
  decodeEntities
} from "./lib/route-crawl.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK_MODE = process.argv.includes("--check");

// One crawler, shared with scripts/audit-indexable-surface.mjs, so the two
// audits can never disagree about which routes exist or how a page parses.
const site = await loadSiteFixture(root);
const {
  renderRoute,
  env,
  modules: { sitemapModule, routeMetadataModule, policyModule, eventPagesModule },
  data: { guideContent, events },
  cities,
  venues,
  artistCityEntries,
  paths: { guidePaths, allPaths, eventPaths }
} = site;

const robotsTxt = await site.read("public/robots.txt");
const staticHeaders = await site.read("public/_headers");

// ---------- crawl ----------

// Event pages are crawled too, so links into them are counted and checked
// (see "event pages" below); they are noindex and never counted as orphans.
const pages = computeInboundLinks(await crawlRoutes([...allPaths, ...eventPaths], renderRoute));

const problems = [];

// Keep crawlable HTML open while excluding machine endpoints and internal
// routes. Public /data/ assets must stay crawlable for Googlebot rendering.
for (const prefix of ["/api/", "/internal/"]) {
  if (!robotsTxt.includes(`Disallow: ${prefix}`)) problems.push(`robots.txt: missing Disallow for ${prefix}`);
}
// robots.txt advertises the sitemap index (per-type sitemaps under
// /sitemaps/); /sitemap.xml still serves every URL in one file.
if (!robotsTxt.includes(`Sitemap: ${ORIGIN}/sitemap-index.xml`)) {
  problems.push("robots.txt: missing the canonical sitemap index URL");
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
// and venue pages) and keeps card previews complete and self-referencing.
//
// og:image is per-page where scripts/build-og-cards.mjs has generated a card and
// the shared /og-image.png everywhere else, so the expected value comes from the
// same manifest the router reads. The referenced file is checked on disk too: a
// manifest entry pointing at a card that was never committed would otherwise
// publish an og:image that 404s for every crawler that fetched it.
const { OG_CARDS } = await import(pathToFileURL(path.join(root, "functions/_og-cards.generated.js")));
const ogCardMissingOnDisk = new Set();
for (const cardUrl of new Set(Object.values(OG_CARDS).map((card) => card.url))) {
  try {
    await fs.access(path.join(root, "public", cardUrl));
  } catch {
    ogCardMissingOnDisk.add(cardUrl);
  }
}
for (const page of rendered) {
  if (page.ogTitle !== page.title) problems.push(`social: ${page.path} og:title does not match its title`);
  if (page.ogDescription !== page.description) problems.push(`social: ${page.path} og:description does not match its description`);
  if (page.ogUrl !== page.canonical) problems.push(`social: ${page.path} og:url does not match its canonical`);
  const pageCardUrl = OG_CARDS[page.path]?.url;
  const expectedCard = `${ORIGIN}${pageCardUrl || "/og-image.png"}`;
  if (page.ogImage !== expectedCard) {
    problems.push(`social: ${page.path} og:image is "${page.ogImage}", expected "${expectedCard}"`);
  } else if (pageCardUrl && ogCardMissingOnDisk.has(pageCardUrl)) {
    problems.push(`social: ${page.path} og:image points at ${pageCardUrl}, which is not in public/og/`);
  }
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
// Two indexable pages with the same H1 are competing for the same query with
// the same headline (added 2026-09-24).
reportDuplicates("h1");

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

// Comparison data (docs/ROUTE_INDEXABILITY_POLICY.md § Comparison data),
// re-derived from the raw records and the published lane list rather than the
// derivations' own comparableCount: a date counts when it is publishable and
// carries verified, URL-bearing provenance on COMPARISON_MIN_PRICE_PROVIDERS
// listed-price lanes.
const eventsById = new Map(events.map((event) => [String(event?.id || "").trim(), event]));
function independentlyComparable(id) {
  const event = eventsById.get(String(id || "").trim());
  if (!event || !policyModule.eventPublishable(event)) return false;
  const lanes = policyModule.PRICE_SNAPSHOT_PROVIDERS.filter(
    (provider) => event.provider_links?.[provider]?.verified === true && String(event.provider_links?.[provider]?.url || "").trim()
  );
  return lanes.length >= policyModule.COMPARISON_MIN_PRICE_PROVIDERS;
}
const hasComparableShow = (shows) => (shows || []).some((show) => independentlyComparable(show.id));

// City pages are generated from changing event data, so validate the complete
// set rather than relying on a single representative smoke route. These checks
// enforce useful, evidence-backed location pages and prevent a future data
// change from silently creating thin, doorway-like sitemap entries.
for (const city of cities) {
  const path = `/cities/${city.slug}`;
  const page = pages.get(path);
  // Independently re-derived from the published policy constants, so a change
  // to deriveCities() that silently drops a gate still fails here.
  const expectedIndexable =
    city.showCount >= policyModule.CITY_MIN_SHOWS &&
    city.artistCount >= policyModule.CITY_MIN_ARTISTS &&
    city.venueCount >= policyModule.CITY_MIN_VENUES &&
    city.publishableCount >= 1 &&
    hasComparableShow(city.shows);
  if (city.indexable !== expectedIndexable) {
    problems.push(
      `city quality: ${path} indexability does not match the ${policyModule.CITY_MIN_SHOWS}-show / ${policyModule.CITY_MIN_ARTISTS}-artist / ${policyModule.CITY_MIN_VENUES}-venue / publishable-destination / comparison-data gate`
    );
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

  // What a city page must carry: who it is about, the selective-coverage
  // disclosure the policy requires, the schedule, the route to ticket options,
  // and the site byline. Nothing here asks for a section whose content is
  // the same on every city page — that filler was removed deliberately, and a
  // marker demanding it back would reinstate it.
  // Matched against mainHtml, so the byline marker is the anchor itself: "By "
  // and the name are separated by the opening tag in the raw HTML.
  const requiredCopy = [
    ">TourTicketCompare</a>",
    `Selected verified tour dates — not a complete ${city.city} events calendar.`,
    "Upcoming dates",
    `Compare tickets for a ${city.city} concert`
  ];
  for (const marker of requiredCopy) {
    if (!mainText.includes(marker)) problems.push(`city quality: ${path} is missing "${marker}"`);
  }
  const renderedDates = [...page.mainHtml.matchAll(/<time\s+datetime=/g)].length;
  if (renderedDates < city.showCount) {
    problems.push(`city quality: ${path} renders ${renderedDates} dated listings for ${city.showCount} source shows`);
  }
  // The counts belong on the page exactly once, in the lead sentence. A second
  // copy is the summary-of-the-summary pattern these pages used to have.
  const countMentions = [...mainText.matchAll(new RegExp(`${city.showCount} upcoming shows?\\b`, "g"))].length;
  if (countMentions !== 1) {
    problems.push(`city quality: ${path} states its upcoming-show count ${countMentions} times; it belongs in the lead sentence only`);
  }
  for (const type of ["Place", "CollectionPage"]) {
    if (!page.schemaTypes.includes(type)) problems.push(`city quality: ${path} is missing ${type} structured data`);
  }
  // The visible FAQ is gone, so the schema that mirrored it must be gone too —
  // structured data never describes content the page does not show.
  if (page.schemaTypes.includes("FAQPage")) {
    problems.push(`city quality: ${path} emits FAQPage structured data with no visible FAQ`);
  }
}

const cityIndexPage = pages.get("/cities");
if (!cityIndexPage?.mainHtml.includes("What makes a city page useful?")) {
  problems.push("city quality: /cities is missing its visible inclusion-method explanation");
}

for (const venue of venues) {
  const path = `/venues/${venue.slug}`;
  const page = pages.get(path);
  const expectedIndexable =
    venue.showCount >= policyModule.VENUE_MIN_SHOWS &&
    venue.artistSlugs.length >= policyModule.VENUE_MIN_ARTISTS &&
    venue.publishableCount >= 1 &&
    hasComparableShow(venue.shows);
  if (venue.indexable !== expectedIndexable) {
    problems.push(
      `venue quality: ${path} indexability does not match the ${policyModule.VENUE_MIN_SHOWS}-show / ${policyModule.VENUE_MIN_ARTISTS}-artist / publishable-destination / comparison-data gate`
    );
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

  // Same contract as the city loop above.
  for (const marker of [
    ">TourTicketCompare</a>",
    `Selected verified tour dates — not the full ${venue.venue} calendar.`,
    "Upcoming dates",
    `Getting tickets at ${venue.venue}`
  ]) {
    if (!mainText.includes(marker)) problems.push(`venue quality: ${path} is missing "${marker}"`);
  }
  const countMentions = [...mainText.matchAll(new RegExp(`${venue.showCount} upcoming shows?\\b`, "g"))].length;
  if (countMentions !== 1) {
    problems.push(`venue quality: ${path} states its upcoming-show count ${countMentions} times; it belongs in the lead sentence only`);
  }
  for (const type of ["MusicVenue", "CollectionPage"]) {
    if (!page.schemaTypes.includes(type)) problems.push(`venue quality: ${path} is missing ${type} structured data`);
  }
  if (page.schemaTypes.includes("FAQPage")) {
    problems.push(`venue quality: ${path} emits FAQPage structured data with no visible FAQ`);
  }
}

// Non-indexable location pages must not emit the structured data that only
// earns a rich result for an indexed page. This is the alignment guard: schema
// follows indexability, and visible content follows it in the same direction.
for (const record of [
  ...cities.map((city) => ({ path: `/cities/${city.slug}`, indexable: city.indexable, label: "city" })),
  ...venues.map((venue) => ({ path: `/venues/${venue.slug}`, indexable: venue.indexable, label: "venue" }))
]) {
  if (record.indexable) continue;
  const page = pages.get(record.path);
  if (!page || page.status !== 200) continue;
  for (const type of ["FAQPage", "MusicEvent"]) {
    if (page.schemaTypes.includes(type)) {
      problems.push(`${record.label} quality: noindex page ${record.path} still emits ${type} structured data`);
    }
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
  // The gate is re-derived here from the published constant so a change to
  // deriveArtistCities() cannot silently move the indexable set on its own.
  const expectedIndexable =
    entry.publishableCount >= policyModule.ARTIST_CITY_MIN_SHOWS &&
    entry.comparableCount >= 1 &&
    entry.artistCityCount >= policyModule.ARTIST_CITY_MIN_ARTIST_CITIES;
  if (page.indexable !== expectedIndexable) {
    problems.push(
      `artist-city quality: ${entry.path} renders ${page.indexable ? "index" : "noindex"} but has ${entry.publishableCount} publishable upcoming show(s) (threshold ${policyModule.ARTIST_CITY_MIN_SHOWS}), ${entry.comparableCount} with two price lanes, and the artist plays ${entry.artistCityCount} upcoming cities`
    );
  }
  const mainText = decodeEntities(page.mainHtml);
  // Required on every artist-city page, indexable or not: the local facts and
  // the crawl path back to the artist hub.
  const requiredCopy = [
    "Tickets in",
    "At a glance:",
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

  if (expectedIndexable) {
    if (!mainText.includes("ticket FAQ")) {
      problems.push(`artist-city quality: ${entry.path} is missing "ticket FAQ"`);
    }
    const faqAnswers = [...page.mainHtml.matchAll(/<details>/g)].length;
    if (faqAnswers < 3) problems.push(`artist-city quality: ${entry.path} renders only ${faqAnswers} visible FAQ answers`);
    for (const type of ["Place", "CollectionPage", "FAQPage"]) {
      if (!page.schemaTypes.includes(type)) problems.push(`artist-city quality: ${entry.path} is missing ${type} structured data`);
    }
  } else {
    // Single-date pages: schema and visible content both drop the repeated FAQ.
    for (const type of ["FAQPage", "MusicEvent"]) {
      if (page.schemaTypes.includes(type)) {
        problems.push(`artist-city quality: noindex page ${entry.path} still emits ${type} structured data`);
      }
    }
    if (page.mainHtml.includes("<details>")) {
      problems.push(`artist-city quality: noindex page ${entry.path} still renders the repeated FAQ block`);
    }
    // A noindex page that nothing links to cannot be re-crawled, so the
    // noindex signal never reaches the crawler. Every single-date combination
    // must keep its inbound link from the artist page's by-city section.
    if (!page.inboundContextual.some((from) => from === `/artists/${entry.artistSlug}`)) {
      problems.push(`artist-city quality: noindex page ${entry.path} is not linked from its artist page`);
    }
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

// ---------- event pages ----------

// Event pages are a deliberate noindex,follow leaf (docs/ROUTE_INDEXABILITY_POLICY.md
// → "Event pages"): not indexable, so never an orphan under the rule above and
// never in the sitemap, and reached through "Show details" on the artist,
// artist-city, city and venue boards. These checks are about correctness —
// every link lands on a page the router serves, and every served page can be
// reached from a board that lists its date — not about indexing. The crawl's
// env carries no wrangler.toml [vars], so the indexing pilot is off here and
// every event page is noindex; the pilot's robots, sitemap and parent-identity
// agreement is checked in a deployed-like env by
// npm run audit:indexable-surface:check (scripts/lib/event-indexability-audit.mjs).
const EVENT_PREFIX = eventPagesModule.EVENT_PATH_PREFIX;
const servedEventPaths = new Set(eventPaths);
const EVENT_PARENT_SURFACES = ["artist", "artist-city", "city", "venue"];
function surfaceOf(pathname) {
  if (/^\/artists\/[a-z0-9-]+$/.test(pathname)) return "artist";
  if (/^\/artists\/[a-z0-9-]+\/tickets\/[a-z0-9-]+$/.test(pathname)) return "artist-city";
  if (/^\/cities\/[a-z0-9-]+$/.test(pathname)) return "city";
  if (/^\/venues\/[a-z0-9-]+$/.test(pathname)) return "venue";
  if (pathname.startsWith(EVENT_PREFIX)) return "event";
  return "other";
}
// id -> the event page a card for that id must link ("" = must not link).
const servedPathById = new Map();
for (const eventPath of eventPaths) {
  const resolved = eventPagesModule.resolveEventPath(events, eventPath);
  servedPathById.set(String(resolved.event?.id || "").trim(), eventPath);
}
const eventLinkStatus = new Map();
async function statusOfEventLink(target) {
  if (!eventLinkStatus.has(target)) {
    const page = pages.get(target);
    eventLinkStatus.set(target, page ? { status: page.status, location: page.location } : await renderRoute(target));
  }
  return eventLinkStatus.get(target);
}

for (const page of rendered) {
  const surface = surfaceOf(page.path);
  for (const target of new Set(page.allLinks.filter((href) => href.startsWith(EVENT_PREFIX)))) {
    if (!EVENT_PARENT_SURFACES.includes(surface)) {
      problems.push(`event link: ${page.path} (${surface}) links event page ${target}; only artist, artist-city, city and venue boards link event pages`);
    }
    if (servedEventPaths.has(target)) {
      const resolved = eventPagesModule.resolveEventPath(events, target);
      if (eventPagesModule.nonPerformanceMarkers(resolved.event).length) {
        problems.push(`event link: ${page.path} links ${target}, a non-performance listing`);
      }
      continue;
    }
    // Not a served canonical page: a stale readable slug (301), a past or
    // destination-less date (301), or an unknown or non-performance key (404).
    const { status, location } = await statusOfEventLink(target);
    problems.push(`event link: ${page.path} links ${target}, which is not a served canonical event page (${status}${location ? ` → ${location}` : ""})`);
  }
  // Card contract on the parent boards: a card links its date's page exactly
  // when the router serves it, and only at its canonical path.
  if (!EVENT_PARENT_SURFACES.includes(surface)) continue;
  for (const match of page.mainHtml.matchAll(/<article class="info-card show-card[^"]*"[^>]*\sdata-event-id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)) {
    const id = decodeEntities(match[1]);
    const linked = decodeEntities(match[2].match(/<a class="text-link show-details-link" href="([^"]+)"/)?.[1] || "");
    const expected = servedPathById.get(id) || "";
    if (linked !== expected) {
      problems.push(
        expected
          ? `event link: ${page.path} card ${id} ${linked ? `links ${linked}` : "has no Show details link"}; expected ${expected}`
          : `event link: ${page.path} card ${id} links ${linked}, but the router serves no page for it`
      );
    }
  }
}

const eventLinkCoverage = { served: eventPaths.length, linked: 0, unlinked: [], by_surface: Object.fromEntries(EVENT_PARENT_SURFACES.map((surface) => [surface, 0])) };
for (const eventPath of eventPaths) {
  const page = pages.get(eventPath);
  if (!page || page.status !== 200) {
    problems.push(`event page: ${eventPath} is served by the router but rendered ${page?.status ?? "nothing"} in the crawl`);
    continue;
  }
  if (page.robots !== "noindex,follow") problems.push(`event page: ${eventPath} robots is "${page.robots}", expected noindex,follow`);
  if (sitemapPaths.has(eventPath)) problems.push(`event page: ${eventPath} is in the sitemap`);
  const surfaces = new Set(page.inboundContextual.map(surfaceOf).filter((surface) => EVENT_PARENT_SURFACES.includes(surface)));
  for (const surface of surfaces) eventLinkCoverage.by_surface[surface] += 1;
  if (surfaces.size) eventLinkCoverage.linked += 1;
  else eventLinkCoverage.unlinked.push(eventPath);
  // Its own artist board lists every upcoming date, so it always links here.
  const resolved = eventPagesModule.resolveEventPath(events, eventPath);
  const artistPath = `/artists/${resolved.event?.artist_slug}`;
  if (!page.inboundContextual.includes(artistPath)) {
    problems.push(`event page: ${eventPath} is not linked from its artist page ${artistPath}`);
  }
  // Event -> parent links must land on pages that render.
  for (const target of new Set(page.contextualLinks)) {
    if (target.startsWith(EVENT_PREFIX)) {
      problems.push(`event page: ${eventPath} links another event page ${target}`);
      continue;
    }
    if (!["artist", "artist-city", "city", "venue"].includes(surfaceOf(target))) continue;
    const parent = pages.get(target);
    if (!parent || parent.status !== 200) {
      problems.push(`event page: ${eventPath} links ${target}, which ${parent ? `returns ${parent.status}` : "is not a rendered route"}`);
    }
  }
}
for (const eventPath of eventLinkCoverage.unlinked) {
  problems.push(`event page: ${eventPath} is served but no artist, artist-city, city or venue board links it`);
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
    event_pages_served: eventLinkCoverage.served,
    event_pages_linked: eventLinkCoverage.linked,
    problems: problems.length
  },
  event_page_links: eventLinkCoverage,
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
      `${summary.totals.noindex} noindex, ${summary.totals.sitemap_entries} sitemap entries, ` +
      `${eventLinkCoverage.linked}/${eventLinkCoverage.served} event pages linked (${EVENT_PARENT_SURFACES.map((surface) => `${surface} ${eventLinkCoverage.by_surface[surface]}`).join(", ")}), 0 problems`
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
