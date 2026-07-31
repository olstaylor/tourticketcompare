// Indexable-surface monitor.
//
// Answers one question on every run: is the set of URLs this site asks search
// engines to index still the set the route-usefulness policy intends, and did
// it move for a reason we understand?
//
// It renders every HTML route through the real Pages Functions middleware (the
// same read-only in-process harness scripts/audit-internal-links.mjs and
// scripts/smoke-prelaunch.mjs use — no network, no production traffic, no
// writes to data files) and reports:
//
//   - routes by type, split indexable / non-indexable
//   - why each non-indexable route is excluded (shared reason codes from
//     functions/_route-indexability.js)
//   - routes about to lose indexability inside the warning horizon
//   - indexable routes with zero inbound internal links
//   - duplicate and near-duplicate title patterns
//   - routes with no future events
//   - routes with recorded traffic but no provider clicks (needs an analytics
//     export; see § Analytics below)
//   - material change against the stored baseline, separating expected
//     inventory decay from structural regression
//
// Usage:
//   node scripts/audit-indexable-surface.mjs                 # write the report
//   node scripts/audit-indexable-surface.mjs --check         # CI mode, no writes
//   node scripts/audit-indexable-surface.mjs --write-baseline# re-anchor the baseline
//   node scripts/audit-indexable-surface.mjs --self-test     # offline unit tests
//   node scripts/audit-indexable-surface.mjs --warn-days 30  # decay horizon
//
// § Why --check does not fail on ordinary expiry
//
// Every route type here is derived from dated event records, so the indexable
// surface shrinks on its own every single day as shows pass. Failing CI on that
// would mean failing every nightly data commit. The distinction this script
// draws instead:
//
//   inventory decay      routes disappear because their shows are in the past.
//                        The *rendered* route count falls with the indexable
//                        count, so the indexable share of each type stays put.
//                        Reported, never failed.
//   structural change    the indexable share of a type moves — routes that
//                        still have current inventory changed indexability.
//                        That is a code or policy change, and it fails --check
//                        unless the baseline is deliberately re-anchored.
//
// § Analytics
//
// Per-route views and provider clicks live in D1 (`page_view` /
// `outbound_click`), which needs Cloudflare credentials this script does not
// have and must never embed. Export them with `npm run report:funnel` (or a
// direct wrangler query) into reports/analytics/route-traffic.json shaped as
// { "generated_at": "<iso>", "routes": { "/path": { "views": n, "provider_clicks": n } } }
// and this script picks it up automatically. Without that file it reports the
// traffic sections as unavailable rather than inventing numbers.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";
const REPORT_DIR = path.join(root, "reports/indexable-surface");
const BASELINE_PATH = path.join(REPORT_DIR, "baseline.json");
const ANALYTICS_PATH = path.join(root, "reports/analytics/route-traffic.json");

const argv = process.argv.slice(2);
const CHECK_MODE = argv.includes("--check");
const WRITE_BASELINE = argv.includes("--write-baseline");
const SELF_TEST = argv.includes("--self-test");
const WARN_DAYS = Number(argv[argv.indexOf("--warn-days") + 1]) > 0 ? Number(argv[argv.indexOf("--warn-days") + 1]) : 14;

// Structural-change tolerance. The indexable share of a route type may drift a
// little as inventory turns over unevenly (a city dropping from 5 shows to 3
// crosses a gate while its route still renders), so the band is wide enough to
// absorb that and narrow enough to catch a gate being changed or bypassed.
const SHARE_TOLERANCE_POINTS = 15;
// Types with very few routes swing wildly in percentage terms, so a share
// change is only meaningful once a type has this many rendered routes.
const MIN_ROUTES_FOR_SHARE_CHECK = 8;

const DAY_MS = 86400000;

// ---------------------------------------------------------------------------
// Route typing — one function, used for both live and baseline records.
// ---------------------------------------------------------------------------

export function routeType(pathname) {
  if (pathname === "/") return "home";
  if (/^\/artists\/[^/]+\/tickets\/[^/]+$/.test(pathname)) return "artist-city";
  if (/^\/artists\/[^/]+$/.test(pathname)) return "artist";
  if (pathname === "/cities" || pathname === "/venues" || pathname === "/artists" || pathname === "/guides") return "index";
  if (pathname.startsWith("/cities/")) return "city";
  if (pathname.startsWith("/venues/")) return "venue";
  if (pathname.startsWith("/guides/")) return "guide";
  return "static";
}

export const ROUTE_TYPE_ORDER = ["home", "index", "static", "guide", "artist", "city", "venue", "artist-city"];

/**
 * Normalise a title into the template it was generated from, so two pages that
 * differ only by the values substituted into one template collapse to the same
 * key. Used for the near-duplicate report: a template shared by hundreds of
 * indexable pages is the signal, not any single title.
 *
 * The substituted values are not guessed from capitalisation — they are the
 * artist, city, and venue names the site actually holds, passed in by the
 * caller, plus any four-digit year. That keeps "Concerts in Denver 2026" and
 * "Harry Styles Tickets in London" as distinct templates instead of flattening
 * both to the same string of placeholders.
 *
 * @param {string} title
 * @param {string[]} [tokens] Known substituted values (longest matched first).
 * @returns {string}
 */
export function titlePattern(title, tokens = []) {
  let pattern = String(title || "");
  const ordered = [...tokens].filter(Boolean).sort((a, b) => b.length - a.length);
  for (const token of ordered) {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    pattern = pattern.replace(new RegExp(escaped, "gi"), "{}");
  }
  return pattern
    .replace(/\b\d{4}(?:[–-]\d{4})?\b/g, "{}")
    .replace(/\{\}(?:[\s,]+\{\})+/g, "{}")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Classify a change in a route type's indexable count.
 *
 * Inventory decay moves `rendered` and `indexable` together, leaving the
 * indexable share roughly where it was. A structural change moves the share:
 * routes that still exist changed indexability. Types below
 * MIN_ROUTES_FOR_SHARE_CHECK are exempt because a single route dominates the
 * percentage.
 *
 * @param {{rendered: number, indexable: number}} before
 * @param {{rendered: number, indexable: number}} after
 * @param {{tolerancePoints?: number, minRoutes?: number}} [options]
 * @returns {{ kind: "unchanged"|"inventory-decay"|"inventory-growth"|"structural", sharePointsDelta: number, indexableDelta: number }}
 */
export function classifyChange(before, after, options = {}) {
  const tolerance = options.tolerancePoints ?? SHARE_TOLERANCE_POINTS;
  const minRoutes = options.minRoutes ?? MIN_ROUTES_FOR_SHARE_CHECK;
  const indexableDelta = after.indexable - before.indexable;
  const shareBefore = before.rendered ? (before.indexable / before.rendered) * 100 : 0;
  const shareAfter = after.rendered ? (after.indexable / after.rendered) * 100 : 0;
  const sharePointsDelta = Number((shareAfter - shareBefore).toFixed(1));

  const bothSmall = before.rendered < minRoutes && after.rendered < minRoutes;
  if (!bothSmall && Math.abs(sharePointsDelta) > tolerance) {
    return { kind: "structural", sharePointsDelta, indexableDelta };
  }
  if (indexableDelta === 0) return { kind: "unchanged", sharePointsDelta, indexableDelta };
  return { kind: indexableDelta < 0 ? "inventory-decay" : "inventory-growth", sharePointsDelta, indexableDelta };
}

// ---------------------------------------------------------------------------
// Self-test (pure functions only — no repo data, no rendering)
// ---------------------------------------------------------------------------

if (SELF_TEST) {
  let passed = 0;
  const assert = (condition, message) => {
    if (!condition) {
      console.error(`indexable-surface self-test FAILED: ${message}`);
      process.exit(1);
    }
    passed += 1;
  };

  assert(routeType("/") === "home", "root is the homepage");
  assert(routeType("/artists/harry-styles") === "artist", "artist route");
  assert(routeType("/artists/harry-styles/tickets/london-united-kingdom") === "artist-city", "artist-city route");
  assert(routeType("/cities/london-united-kingdom") === "city", "city route");
  assert(routeType("/venues/the-o2-london") === "venue", "venue route");
  assert(routeType("/cities") === "index" && routeType("/venues") === "index", "listing pages are index routes");
  assert(routeType("/guides/how-to-avoid-ticket-scams") === "guide", "guide route");
  assert(routeType("/about") === "static", "trust pages are static routes");

  const sampleTokens = ["Harry Styles", "Doja Cat", "London", "Toronto", "Denver"];
  assert(
    titlePattern("Harry Styles Tickets in London | Compare Prices", sampleTokens) ===
      titlePattern("Doja Cat Tickets in Toronto | Compare Prices", sampleTokens),
    "two pages from one title template share a pattern"
  );
  assert(
    titlePattern("Harry Styles Tickets in London | Compare Prices", sampleTokens) === "{} Tickets in {} | Compare Prices",
    "the pattern keeps the template words and blanks only the substituted values"
  );
  assert(
    titlePattern("Concerts in Denver 2026 | Upcoming Shows & Tickets", sampleTokens) !==
      titlePattern("Harry Styles Tickets in London | Compare Prices", sampleTokens),
    "different templates do not collapse together"
  );
  assert(
    titlePattern("Concerts in Denver 2026 | Upcoming Shows & Tickets", sampleTokens) ===
      titlePattern("Concerts in Denver 2027 | Upcoming Shows & Tickets", sampleTokens),
    "a year is a substituted value, not part of the template"
  );
  assert(
    titlePattern("About TourTicketCompare", sampleTokens) === "About TourTicketCompare",
    "a title with no substituted values is returned unchanged"
  );

  // Pure inventory decay: half the routes expired, share unchanged -> not structural.
  assert(
    classifyChange({ rendered: 200, indexable: 100 }, { rendered: 100, indexable: 50 }).kind === "inventory-decay",
    "proportional shrinkage is inventory decay, not a regression"
  );
  // A gate change: routes still render, far fewer are indexable -> structural.
  assert(
    classifyChange({ rendered: 200, indexable: 180 }, { rendered: 200, indexable: 20 }).kind === "structural",
    "a collapse in indexable share is structural"
  );
  // An accidentally loosened gate is caught in the other direction too.
  assert(
    classifyChange({ rendered: 200, indexable: 20 }, { rendered: 200, indexable: 180 }).kind === "structural",
    "a jump in indexable share is structural"
  );
  // Small types are exempt from the share rule.
  assert(
    classifyChange({ rendered: 3, indexable: 3 }, { rendered: 3, indexable: 2 }).kind === "inventory-decay",
    "a tiny route type is not judged on percentage share"
  );
  assert(
    classifyChange({ rendered: 100, indexable: 50 }, { rendered: 100, indexable: 50 }).kind === "unchanged",
    "no movement is reported as unchanged"
  );
  // Within-tolerance drift from uneven turnover stays non-structural.
  assert(
    classifyChange({ rendered: 100, indexable: 50 }, { rendered: 95, indexable: 45 }).kind === "inventory-decay",
    "small share drift from uneven turnover is still decay"
  );

  console.log(`indexable-surface self-test: ${passed} assertions passed`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

async function readJsonIfPresent(absolutePath) {
  try {
    return JSON.parse(await fs.readFile(absolutePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

const middlewareModule = await import(pathToFileURL(path.join(root, "functions/_middleware.js")));
const routeMetadataModule = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));
const citiesModule = await import(pathToFileURL(path.join(root, "functions/_cities.js")));
const venuesModule = await import(pathToFileURL(path.join(root, "functions/_venues.js")));
const artistCitiesModule = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));
const artistIndexabilityModule = await import(pathToFileURL(path.join(root, "functions/_artist-indexability.js")));
const policyModule = await import(pathToFileURL(path.join(root, "functions/_route-indexability.js")));

const catalog = JSON.parse(await read("public/data/catalog.json"));
const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const events = JSON.parse(await read("public/data/events.json"));

const assetMap = new Map();
for (const file of [
  "index.html",
  "data/catalog.json",
  "data/artists.json",
  "data/events.json",
  "data/guides-content.json",
  "data/provider-configs.json"
]) {
  assetMap.set(`/${file}`, await read(`public/${file}`));
}
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
    next: () => new Response("static-asset", { status: 200 })
  });
  return { status: response.status, html: await response.text() };
}

// ---------------------------------------------------------------------------
// Inventory — derived from the same shared gates every renderer reads
// ---------------------------------------------------------------------------

const now = Date.now();
const editoriallyIndexableSlugs = artistsMeta
  .filter((artist) => artist?.indexing_status === artistIndexabilityModule.INDEXABLE_ARTIST_STATUS)
  .map((artist) => String(artist?.slug || "").trim())
  .filter(Boolean);

const cities = citiesModule.deriveCities(events, { now });
const venues = venuesModule.deriveVenues(events, { now });
const artistCities = artistCitiesModule.deriveRenderedArtistCities(events, editoriallyIndexableSlugs, { now });

// Per-route facts the report needs but a rendered page cannot cheaply give back:
// the counted evidence each gate decided on.
const evidence = new Map();

for (const artist of catalog.artists || []) {
  const slug = String(artist?.slug || "").trim();
  if (!slug) continue;
  const meta = artistsMeta.find((record) => String(record?.slug || "").trim() === slug) || {};
  const editorial = meta.indexing_status === artistIndexabilityModule.INDEXABLE_ARTIST_STATUS;
  const upcoming = events.filter((event) => {
    if (String(event?.artist_slug || "").trim() !== slug) return false;
    const ts = Date.parse(String(event?.datetime_iso || event?.dateTimeISO || "").trim());
    return Number.isFinite(ts) && ts >= now;
  });
  const reasons = [];
  if (!editorial) reasons.push(policyModule.EXCLUSION_REASONS.ARTIST_NOT_EDITORIALLY_INDEXABLE);
  if (!upcoming.length) reasons.push(policyModule.EXCLUSION_REASONS.NO_UPCOMING_SHOWS);
  evidence.set(`/artists/${slug}`, {
    showCount: upcoming.length,
    publishableCount: upcoming.filter((event) => policyModule.eventPublishable(event)).length,
    exclusionReasons: reasons,
    futureTimestamps: upcoming
      .map((event) => Date.parse(String(event?.datetime_iso || event?.dateTimeISO || "").trim()))
      .filter(Number.isFinite)
  });
}

for (const city of cities) {
  evidence.set(`/cities/${city.slug}`, {
    showCount: city.showCount,
    publishableCount: city.publishableCount,
    exclusionReasons: city.exclusionReasons,
    futureTimestamps: city.shows.map((show) => show.ts)
  });
}
for (const venue of venues) {
  evidence.set(`/venues/${venue.slug}`, {
    showCount: venue.showCount,
    publishableCount: venue.publishableCount,
    exclusionReasons: venue.exclusionReasons,
    futureTimestamps: venue.shows.map((show) => show.ts)
  });
}
for (const entry of artistCities) {
  const group = artistCitiesModule.findArtistCity(events, entry.artistSlug, entry.slug, { now });
  evidence.set(entry.path, {
    showCount: entry.showCount,
    publishableCount: entry.publishableCount,
    exclusionReasons: entry.exclusionReasons,
    futureTimestamps: (group?.shows || []).map((show) => show.ts)
  });
}

const allPaths = [
  ...new Set([
    ...Object.keys(routeMetadataModule.TRUST_ROUTES),
    ...Object.keys(routeMetadataModule.GUIDE_ROUTES),
    ...(catalog.artists || []).map((artist) => `/artists/${artist.slug}`),
    "/cities",
    ...cities.map((city) => `/cities/${city.slug}`),
    "/venues",
    ...venues.map((venue) => `/venues/${venue.slug}`),
    ...artistCities.map((entry) => entry.path)
  ])
];

// ---------------------------------------------------------------------------
// Crawl
// ---------------------------------------------------------------------------

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
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/") || href.startsWith("/data/")) continue;
    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    if (/\.[a-z0-9]+$/i.test(clean)) continue;
    hrefs.push(clean);
  }
  return hrefs;
}

const pages = new Map();
for (const pathname of allPaths) {
  const { status, html } = await renderRoute(pathname);
  const main = (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "";
  const robots = extract(html, /<meta name="robots" content="([^"]*)"/);
  const record = evidence.get(pathname) || { showCount: null, publishableCount: null, exclusionReasons: [], futureTimestamps: [] };
  pages.set(pathname, {
    path: pathname,
    type: routeType(pathname),
    status,
    indexable: status === 200 && !robots.includes("noindex"),
    title: decodeEntities(extract(html, /<title>([^<]*)<\/title>/i)),
    showCount: record.showCount,
    publishableCount: record.publishableCount,
    exclusionReasons: record.exclusionReasons,
    futureTimestamps: record.futureTimestamps,
    contextualLinks: internalHrefs(main),
    inboundContextual: 0
  });
}

for (const page of pages.values()) {
  if (page.status !== 200) continue;
  for (const target of new Set(page.contextualLinks)) {
    if (target === page.path) continue;
    const targetPage = pages.get(target);
    if (targetPage) targetPage.inboundContextual += 1;
  }
}

// ---------------------------------------------------------------------------
// Findings
// ---------------------------------------------------------------------------

const rendered = [...pages.values()].filter((page) => page.status === 200);
const indexablePages = rendered.filter((page) => page.indexable);

const byType = new Map();
for (const type of ROUTE_TYPE_ORDER) byType.set(type, { rendered: 0, indexable: 0 });
for (const page of rendered) {
  if (!byType.has(page.type)) byType.set(page.type, { rendered: 0, indexable: 0 });
  const bucket = byType.get(page.type);
  bucket.rendered += 1;
  if (page.indexable) bucket.indexable += 1;
}

// Exclusion reasons, grouped per type.
const exclusionsByType = new Map();
for (const page of rendered) {
  if (page.indexable) continue;
  if (!exclusionsByType.has(page.type)) exclusionsByType.set(page.type, new Map());
  const bucket = exclusionsByType.get(page.type);
  const reasons = page.exclusionReasons.length ? page.exclusionReasons : ["editorial_or_static_route"];
  for (const reason of reasons) bucket.set(reason, (bucket.get(reason) || 0) + 1);
}

// Routes about to lose indexability: their last future show falls inside the
// horizon, so nothing new landing means the page drops out.
const horizon = now + WARN_DAYS * DAY_MS;
const expiringSoon = indexablePages
  .filter((page) => page.futureTimestamps.length && Math.max(...page.futureTimestamps) < horizon)
  .map((page) => ({
    path: page.path,
    type: page.type,
    last_show: new Date(Math.max(...page.futureTimestamps)).toISOString().slice(0, 10),
    days_left: Math.max(0, Math.round((Math.max(...page.futureTimestamps) - now) / DAY_MS))
  }))
  .sort((a, b) => a.days_left - b.days_left || a.path.localeCompare(b.path));

// Indexable routes nothing links to. An unlinked indexable page is a page
// crawlers may never reach and users cannot navigate to.
const orphanIndexable = indexablePages
  .filter((page) => page.path !== "/" && page.inboundContextual === 0)
  .map((page) => page.path)
  .sort();

// Indexable routes with no future events at all.
const indexableWithoutFutureEvents = indexablePages
  .filter((page) => page.showCount === 0)
  .map((page) => page.path)
  .sort();

// Duplicate and near-duplicate titles among indexable pages. The values a title
// template substitutes are the site's own artist, city, and venue names, so the
// pattern key is computed against those rather than guessed from capitalisation.
const titleTokens = [
  ...(catalog.artists || []).map((artist) => String(artist?.name || "").trim()),
  ...cities.flatMap((city) => [`${city.city}, ${city.country}`, city.city, city.country]),
  ...venues.flatMap((venue) => [venue.venue, venue.city, venue.country])
].filter((token) => token && token.length > 1);

const exactTitleGroups = new Map();
const patternGroups = new Map();
for (const page of indexablePages) {
  if (!exactTitleGroups.has(page.title)) exactTitleGroups.set(page.title, []);
  exactTitleGroups.get(page.title).push(page.path);
  const pattern = titlePattern(page.title, titleTokens);
  if (!patternGroups.has(pattern)) patternGroups.set(pattern, []);
  patternGroups.get(pattern).push(page.path);
}
const duplicateTitles = [...exactTitleGroups.entries()]
  .filter(([, paths]) => paths.length > 1)
  .map(([title, paths]) => ({ title, count: paths.length, paths: paths.slice(0, 5) }));
const titlePatterns = [...patternGroups.entries()]
  .map(([pattern, paths]) => ({
    pattern,
    count: paths.length,
    share_of_indexable: indexablePages.length ? Number(((paths.length / indexablePages.length) * 100).toFixed(1)) : 0
  }))
  .sort((a, b) => b.count - a.count);

// Traffic (optional export — see the header note).
const analytics = await readJsonIfPresent(ANALYTICS_PATH);
let trafficSection = { available: false, note: `no export at ${path.relative(root, ANALYTICS_PATH)}` };
if (analytics?.routes && typeof analytics.routes === "object") {
  const trafficNoClicks = [];
  const byTypeTraffic = new Map();
  for (const [routePath, stats] of Object.entries(analytics.routes)) {
    const page = pages.get(routePath);
    if (!page) continue;
    const views = Number(stats?.views) || 0;
    const clicks = Number(stats?.provider_clicks) || 0;
    if (!byTypeTraffic.has(page.type)) byTypeTraffic.set(page.type, { views: 0, clicks: 0, routes: 0 });
    const bucket = byTypeTraffic.get(page.type);
    bucket.views += views;
    bucket.clicks += clicks;
    bucket.routes += 1;
    if (views > 0 && clicks === 0) trafficNoClicks.push({ path: routePath, type: page.type, views });
  }
  trafficSection = {
    available: true,
    generated_at: analytics.generated_at || "",
    by_type: Object.fromEntries([...byTypeTraffic].map(([type, bucket]) => [type, bucket])),
    traffic_without_provider_clicks: trafficNoClicks.sort((a, b) => b.views - a.views).slice(0, 50)
  };
}

// ---------------------------------------------------------------------------
// Baseline comparison
// ---------------------------------------------------------------------------

const currentTotals = Object.fromEntries(
  [...byType].filter(([, bucket]) => bucket.rendered > 0).map(([type, bucket]) => [type, bucket])
);

const baseline = await readJsonIfPresent(BASELINE_PATH);
const structuralChanges = [];
const changeRows = [];
if (baseline?.totals) {
  const types = [...new Set([...Object.keys(baseline.totals), ...Object.keys(currentTotals)])];
  for (const type of types.sort((a, b) => ROUTE_TYPE_ORDER.indexOf(a) - ROUTE_TYPE_ORDER.indexOf(b))) {
    const before = baseline.totals[type] || { rendered: 0, indexable: 0 };
    const after = currentTotals[type] || { rendered: 0, indexable: 0 };
    const change = classifyChange(before, after);
    changeRows.push({ type, before, after, ...change });
    if (change.kind === "structural") {
      structuralChanges.push(
        `${type}: indexable share moved ${change.sharePointsDelta > 0 ? "+" : ""}${change.sharePointsDelta} points ` +
          `(${before.indexable}/${before.rendered} -> ${after.indexable}/${after.rendered}); ` +
          `routes that still render changed indexability`
      );
    }
  }
}

const problems = [];
for (const orphan of orphanIndexable) problems.push(`orphan: indexable route ${orphan} has no inbound internal link`);
for (const route of indexableWithoutFutureEvents) problems.push(`empty: indexable route ${route} has no future events`);
for (const duplicate of duplicateTitles) {
  problems.push(`duplicate title: ${duplicate.count} indexable routes share "${duplicate.title.slice(0, 70)}"`);
}
for (const change of structuralChanges) problems.push(`structural change: ${change}`);

const totalIndexable = indexablePages.length;
const baselineIndexable = baseline?.totals
  ? Object.values(baseline.totals).reduce((sum, bucket) => sum + bucket.indexable, 0)
  : null;

// A large *total* swing that every per-type check classified as inventory decay
// is still worth a human glance — a tour ending can legitimately halve the
// surface, and so can a data bug that drops half of events.json. This is a
// warning, never a failure: it is exactly the "routine event-expiry update"
// case the policy says must not break CI.
const TOTAL_SWING_WARN_PERCENT = 25;
const warnings = [];
if (baselineIndexable) {
  const swing = ((totalIndexable - baselineIndexable) / baselineIndexable) * 100;
  if (Math.abs(swing) >= TOTAL_SWING_WARN_PERCENT) {
    warnings.push(
      `indexable surface moved ${swing > 0 ? "+" : ""}${swing.toFixed(1)}% against the stored baseline ` +
        `(${baselineIndexable} -> ${totalIndexable}) with no structural change detected. ` +
        `Expected if a tour ended or a large batch of dates landed; investigate otherwise.`
    );
  }
}

const summary = {
  generated_at: new Date().toISOString(),
  warn_days: WARN_DAYS,
  policy: {
    city_min_shows: policyModule.CITY_MIN_SHOWS,
    city_min_artists: policyModule.CITY_MIN_ARTISTS,
    venue_min_shows: policyModule.VENUE_MIN_SHOWS,
    venue_min_artists: policyModule.VENUE_MIN_ARTISTS,
    artist_city_min_shows: policyModule.ARTIST_CITY_MIN_SHOWS
  },
  totals: currentTotals,
  overall: {
    rendered: rendered.length,
    indexable: totalIndexable,
    noindex: rendered.length - totalIndexable,
    baseline_indexable: baselineIndexable
  },
  exclusion_reasons: Object.fromEntries(
    [...exclusionsByType].map(([type, bucket]) => [type, Object.fromEntries([...bucket].sort((a, b) => b[1] - a[1]))])
  ),
  expiring_within_warn_days: expiringSoon,
  orphan_indexable: orphanIndexable,
  indexable_without_future_events: indexableWithoutFutureEvents,
  duplicate_titles: duplicateTitles,
  title_patterns: titlePatterns,
  traffic: trafficSection,
  baseline_comparison: baseline?.totals
    ? { baseline_generated_at: baseline.generated_at || "", changes: changeRows }
    : { baseline_generated_at: null, changes: [], note: "no stored baseline; run --write-baseline to anchor one" },
  warnings,
  problems
};

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function markdown() {
  const lines = [
    "# Indexable-surface audit",
    "",
    `Generated: ${summary.generated_at} (read-only, rendered in-process — no live crawl)`,
    "",
    "## Totals",
    "",
    `- rendered routes: ${summary.overall.rendered}`,
    `- indexable: ${summary.overall.indexable}`,
    `- non-indexable: ${summary.overall.noindex}`,
    baselineIndexable == null
      ? "- stored baseline: none"
      : `- stored baseline indexable: ${baselineIndexable} (${totalIndexable - baselineIndexable >= 0 ? "+" : ""}${totalIndexable - baselineIndexable})`,
    "",
    "## Routes by type",
    "",
    "| Type | Rendered | Indexable | Non-indexable | Indexable share |",
    "|---|---|---|---|---|",
    ...Object.entries(summary.totals).map(
      ([type, bucket]) =>
        `| ${type} | ${bucket.rendered} | ${bucket.indexable} | ${bucket.rendered - bucket.indexable} | ${
          bucket.rendered ? Math.round((bucket.indexable / bucket.rendered) * 100) : 0
        }% |`
    ),
    "",
    "## Reasons for exclusion",
    ""
  ];
  if (!Object.keys(summary.exclusion_reasons).length) {
    lines.push("- none: every rendered route is indexable");
  } else {
    lines.push("| Type | Reason | Routes |", "|---|---|---|");
    for (const [type, reasons] of Object.entries(summary.exclusion_reasons)) {
      for (const [reason, count] of Object.entries(reasons)) lines.push(`| ${type} | ${reason} | ${count} |`);
    }
  }
  lines.push("", `## Losing indexability within ${WARN_DAYS} days`, "");
  if (!expiringSoon.length) lines.push("- none");
  else {
    lines.push("| Route | Type | Last tracked show | Days left |", "|---|---|---|---|");
    for (const entry of expiringSoon.slice(0, 40)) {
      lines.push(`| ${entry.path} | ${entry.type} | ${entry.last_show} | ${entry.days_left} |`);
    }
    if (expiringSoon.length > 40) lines.push(`| … | | | ${expiringSoon.length - 40} more |`);
  }
  lines.push("", "## Indexable routes with zero internal links", "");
  lines.push(...(orphanIndexable.length ? orphanIndexable.map((entry) => `- ${entry}`) : ["- none"]));
  lines.push("", "## Indexable routes with no future events", "");
  lines.push(...(indexableWithoutFutureEvents.length ? indexableWithoutFutureEvents.map((entry) => `- ${entry}`) : ["- none"]));
  lines.push("", "## Title patterns among indexable routes", "");
  lines.push("| Routes | Share | Pattern |", "|---|---|---|");
  for (const entry of titlePatterns.slice(0, 12)) {
    lines.push(`| ${entry.count} | ${entry.share_of_indexable}% | \`${entry.pattern}\` |`);
  }
  lines.push("", "### Exact duplicate titles", "");
  lines.push(
    ...(duplicateTitles.length
      ? duplicateTitles.map((entry) => `- ${entry.count}× "${entry.title}" (${entry.paths.join(", ")})`)
      : ["- none"])
  );
  lines.push("", "## Traffic", "");
  if (!trafficSection.available) {
    lines.push(`- not available: ${trafficSection.note}`, "- see the header of scripts/audit-indexable-surface.mjs for the export format");
  } else {
    lines.push("| Type | Routes with data | Views | Provider clicks |", "|---|---|---|---|");
    for (const [type, bucket] of Object.entries(trafficSection.by_type)) {
      lines.push(`| ${type} | ${bucket.routes} | ${bucket.views} | ${bucket.clicks} |`);
    }
    lines.push("", "### Routes with views but no provider clicks", "");
    lines.push(
      ...(trafficSection.traffic_without_provider_clicks.length
        ? trafficSection.traffic_without_provider_clicks.map((entry) => `- ${entry.path} (${entry.type}) — ${entry.views} views`)
        : ["- none"])
    );
  }
  lines.push("", "## Change against the stored baseline", "");
  if (!changeRows.length) {
    lines.push("- no stored baseline; run `npm run audit:indexable-surface:baseline` to anchor one");
  } else {
    lines.push(`Baseline generated ${summary.baseline_comparison.baseline_generated_at || "(unknown)"}.`, "");
    lines.push("| Type | Baseline | Now | Indexable delta | Share delta | Classification |", "|---|---|---|---|---|---|");
    for (const row of changeRows) {
      lines.push(
        `| ${row.type} | ${row.before.indexable}/${row.before.rendered} | ${row.after.indexable}/${row.after.rendered} | ` +
          `${row.indexableDelta >= 0 ? "+" : ""}${row.indexableDelta} | ${row.sharePointsDelta >= 0 ? "+" : ""}${row.sharePointsDelta}pp | ${row.kind} |`
      );
    }
    lines.push(
      "",
      "`inventory-decay` / `inventory-growth` are expected: dated shows pass and new ones land, moving rendered and indexable counts together. `structural` means routes that still render changed indexability, which is a code or policy change."
    );
  }
  lines.push("", "## Warnings (non-blocking)", "");
  lines.push(...(warnings.length ? warnings.map((entry) => `- ${entry}`) : ["- none"]));
  lines.push("", "## Problems", "");
  lines.push(...(problems.length ? problems.map((entry) => `- ${entry}`) : ["- none"]));
  lines.push("");
  return lines.join("\n");
}

if (WRITE_BASELINE) {
  await fs.mkdir(REPORT_DIR, { recursive: true });
  await fs.writeFile(
    BASELINE_PATH,
    `${JSON.stringify(
      {
        generated_at: summary.generated_at,
        note:
          "Anchor for scripts/audit-indexable-surface.mjs --check. Re-anchor deliberately (npm run audit:indexable-surface:baseline) whenever a route-usefulness policy change is intended; see docs/ROUTE_INDEXABILITY_POLICY.md.",
        policy: summary.policy,
        totals: summary.totals
      },
      null,
      2
    )}\n`
  );
  console.log(`indexable-surface: baseline written to ${path.relative(root, BASELINE_PATH)}`);
}

if (CHECK_MODE) {
  console.log(
    `indexable-surface: ${summary.overall.rendered} routes, ${summary.overall.indexable} indexable, ` +
      `${summary.overall.noindex} noindex` +
      (baselineIndexable == null ? " (no baseline)" : ` (baseline ${baselineIndexable})`)
  );
  for (const row of changeRows) {
    if (row.kind === "unchanged") continue;
    console.log(`  ${row.type}: ${row.before.indexable} -> ${row.after.indexable} (${row.kind})`);
  }
  // GitHub Actions renders `::warning::` as a non-blocking PR annotation; on a
  // local terminal it is just a line of output.
  for (const warning of warnings) console.log(`::warning::indexable-surface: ${warning}`);
  if (problems.length) {
    console.error(`indexable-surface: ${problems.length} problem(s)`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }
  console.log("indexable-surface: no orphans, no empty indexable routes, no duplicate titles, no structural change");
  process.exit(0);
}

await fs.mkdir(REPORT_DIR, { recursive: true });
await fs.writeFile(path.join(REPORT_DIR, "indexable-surface.json"), `${JSON.stringify(summary, null, 2)}\n`);
await fs.writeFile(path.join(REPORT_DIR, "indexable-surface.md"), markdown());
console.log(
  `indexable-surface: ${summary.overall.rendered} routes, ${summary.overall.indexable} indexable, ${problems.length} problem(s)`
);
for (const problem of problems) console.log(`  - ${problem}`);
console.log("report written to reports/indexable-surface/indexable-surface.{md,json}");
