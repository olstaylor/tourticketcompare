import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoutes = ["/", "/artists", "/guides", "/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const functionBackedStaticRoutes = ["/artists", "/guides", "/how-it-works", "/editorial-policy", "/affiliate-disclosure", "/about", "/contact"];
const functionBackedWildcardRoutes = ["/artists/*", "/guides/*"];
const expectedH1 = new Map([
  ["/", "Find verified ticket links for major tours"],
  ["/artists", "Artist watchlist"],
  ["/guides", "Ticket buying guides"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact TourTicketCompare"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"]
]);
const expectedTitle = new Map([
  ["/", "Find Verified Ticket Options for Major Tours | TourTicketCompare"],
  ["/artists", "Artists | TourTicketCompare"],
  ["/guides", "Concert Ticket Buying Guides | TourTicketCompare"],
  ["/how-it-works", "How TourTicketCompare Works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact TourTicketCompare"],
  ["/editorial-policy", "Editorial Policy | TourTicketCompare"],
  ["/affiliate-disclosure", "Affiliate Disclosure | TourTicketCompare"]
]);
const homepageDescription = "Find checked ticket links for major tours, read practical buying guidance, and confirm final prices and fees on the ticket provider site.";
const EXPECTED_CSP = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://utt.impactcdn.com; connect-src 'self' https://utt.impactcdn.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'";
const CONTROLLED_SEATGEEK_SHOW_ID = "tm-morgan-wallen-2026-gainesville-2200635d19f97a46";
const CONTROLLED_SEATGEEK_URL = "https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112";
const CONTROLLED_SEATGEEK_BASE_TRACKING_URL = "https://seatgeek.pxf.io/eK6adX";
const EXPECTED_OUT_VERSION = "seatgeek-impact-diagnostics-2026-05-13";
const SMOKE_TEST_NOW_ISO = "2026-05-14T12:00:00Z";
const SMOKE_TEST_NOW_MS = Date.parse(SMOKE_TEST_NOW_ISO);
assert(Number.isFinite(SMOKE_TEST_NOW_MS), "smoke test clock must be a valid ISO timestamp");
Date.now = () => SMOKE_TEST_NOW_MS;
const routeMarkers = new Map([
  ["/artists", "Ticket buttons appear only when the destination has been checked"],
  ["/guides", "Compare the final checkout total after fees"],
  ["/how-it-works", "Affiliate links are handled safely"],
  ["/editorial-policy", "official artist, ticketing, and approved affiliate sources"],
  ["/affiliate-disclosure", "Affiliate relationships do not control which links we show"],
  ["/about", "Why affiliate links do not change our standards"],
  ["/contact", "hello@tourticketcompare.com"]
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

async function readJson(relativePath) {
  return JSON.parse(await read(relativePath));
}

function normalizeSlug(value) {
  return String(value || "").trim();
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function missingValues(left, right) {
  const rightSet = new Set(right);
  return left.filter((value) => !rightSet.has(value));
}

async function deriveArtistSlugsFromData() {
  const catalogPath = "public/data/catalog.json";
  const artistsPath = "public/data/artists.json";
  let catalog;
  let artists;
  try {
    catalog = await readJson(catalogPath);
  } catch (error) {
    throw new Error(`failed to read ${catalogPath}: ${error.message}`);
  }
  try {
    artists = await readJson(artistsPath);
  } catch (error) {
    throw new Error(`failed to read ${artistsPath}: ${error.message}`);
  }

  assert(Array.isArray(catalog?.artists), `${catalogPath} should contain an artists array`);
  assert(Array.isArray(artists), `${artistsPath} should be an array`);

  const catalogSlugs = catalog.artists.map((artist) => normalizeSlug(artist?.slug)).filter(Boolean);
  const artistsSlugs = artists.map((artist) => normalizeSlug(artist?.slug)).filter(Boolean);
  assert(catalogSlugs.length > 0, `${catalogPath} should contain at least one artist slug`);
  assert(artistsSlugs.length > 0, `${artistsPath} should contain at least one artist slug`);

  const duplicateCatalogSlugs = duplicateValues(catalogSlugs);
  const duplicateArtistsSlugs = duplicateValues(artistsSlugs);
  assert(duplicateCatalogSlugs.length === 0, `${catalogPath} has duplicate artist slugs: ${duplicateCatalogSlugs.join(", ")}`);
  assert(duplicateArtistsSlugs.length === 0, `${artistsPath} has duplicate artist slugs: ${duplicateArtistsSlugs.join(", ")}`);

  const inCatalogNotArtists = missingValues(catalogSlugs, artistsSlugs);
  const inArtistsNotCatalog = missingValues(artistsSlugs, catalogSlugs);
  assert(
    inCatalogNotArtists.length === 0 && inArtistsNotCatalog.length === 0,
    `artist slug drift between ${catalogPath} and ${artistsPath}; only in catalog: ${inCatalogNotArtists.join(", ") || "(none)"}, only in artists: ${inArtistsNotCatalog.join(", ") || "(none)"}`
  );

  return { artistSlugs: catalogSlugs, catalog };
}

async function fileExists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function safeSeatGeekEventUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();
    const normalizedPath = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (parsed.protocol !== "https:") return null;
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (/example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i.test(raw)) return null;
    if (!normalizedPath || normalizedPath === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(normalizedPath)) return null;
    if (!/\/(concert|sports|theater|theatre)\/\d+$/i.test(normalizedPath)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function assertAbsent(haystack, terms, label) {
  const lower = haystack.toLowerCase();
  const found = terms.filter((term) => lower.includes(term.toLowerCase()));
  assert(found.length === 0, `${label} contains blocked term(s): ${found.join(", ")}`);
}

async function assertLineRulesAbsent(files, rules, label) {
  const violations = [];

  for (const file of files) {
    const lines = (await read(file)).split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const rule of rules) {
        if (!rule.pattern.test(line)) continue;
        if (rule.allowedContext?.test(line)) continue;
        violations.push(`${file}:${index + 1} ${rule.label}: ${line.trim()}`);
      }
    });
  }

  assert(violations.length === 0, `${label} contains blocked public-copy pattern(s):\n${violations.join("\n")}`);
}

async function assertPublicCopySafe(files) {
  const rules = [
    { label: "cheapest claim", pattern: /\bcheapest\b/i },
    { label: "best price claim", pattern: /\bbest\s+price\b/i },
    { label: "best deal claim", pattern: /\bbest\s+deal\b/i },
    { label: "lowest price claim", pattern: /\blowest\s+price\b/i },
    {
      label: "guaranteed claim",
      pattern: /\bguaranteed\b/i,
      allowedContext: /\b(not|is not|avoid|does not)\b/i
    },
    { label: "available now claim", pattern: /\bavailable\s+now\b/i },
    {
      label: "live prices claim",
      pattern: /\blive\s+prices\b/i,
      allowedContext: /\b(coming later|not yet|planned|not available|is not ready|being built|does not compare|do not compare)\b/i
    },
    { label: "from-price claim", pattern: /\bfrom\s*[£$€]\s*\d/i },
    {
      label: "live price comparison claim",
      pattern: /\blive\s+price\s+comparison\b/i,
      allowedContext: /\b(coming later|not yet|planned|not available|is not ready|being built)\b/i
    },
    {
      label: "price comparison claim",
      pattern: /\bprice\s+comparison\b/i,
      allowedContext: /\b(coming later|not yet|planned|not available|is not ready|being built|when approved|only when|not fake)\b/i
    },
    {
      label: "ticket comparison claim",
      pattern: /\bticket\s+comparison\b/i,
      allowedContext: /\b(not|must not|should not|does not|unless|until|without pretending)\b/i
    }
  ];
  const violations = [];

  for (const file of files) {
    const lines = (await read(file)).split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const rule of rules) {
        if (!rule.pattern.test(line)) continue;
        if (rule.allowedContext?.test(line)) continue;
        violations.push(`${file}:${index + 1} ${rule.label}: ${line.trim()}`);
      }
    });
  }

  assert(
    violations.length === 0,
    `public-facing copy contains unsupported risky wording:\n${violations.join("\n")}`
  );
}


async function assertPublicCopyRegressionGuardrails(files) {
  const rules = [
    { label: "unsupported live pricing claim", pattern: /\blive\s+prices\b/i, allowedContext: /\b(do\s+not|does\s+not|not\s+display|not\s+show|no\s+on-page|without)\b/i },
    { label: "unsupported live comparison claim", pattern: /\blive\s+price\s+comparison\b/i, allowedContext: /\b(do\s+not|does\s+not|not\s+available|not\s+supported|without)\b/i },
    { label: "unsupported realtime pricing claim", pattern: /\breal-time\s+prices\b/i, allowedContext: /\b(do\s+not|does\s+not|not\s+available|not\s+supported|without)\b/i },
    { label: "unsupported compare-live claim", pattern: /\bcompare\s+live\s+prices\b/i, allowedContext: /\b(do\s+not|does\s+not|cannot|can\'?t|not\s+available|not\s+supported|without)\b/i },
    { label: "cheapest tickets claim", pattern: /\bcheapest\s+tickets\b/i },
    { label: "best price claim", pattern: /\bbest\s+price\b/i },
    { label: "guaranteed lowest claim", pattern: /\bguaranteed\s+lowest\b/i },
    { label: "official partner claim", pattern: /\bofficial\s+partner\b/i },

    { label: "placeholder domain", pattern: /\bexample\.com\b/i },
    { label: "localhost placeholder", pattern: /\blocalhost\b/i, allowedContext: /(host\s*===|endsWith\("\.localhost"\)|127\.0\.0\.1|do\s+not\s+show\s+placeholder\s+links)/i },
    { label: "your-link-here placeholder", pattern: /\byour-link-here\b/i },
    { label: "replace-me placeholder", pattern: /\breplace-me\b/i },
    { label: "mock price placeholder", pattern: /\bmock\s+price\b/i },
    { label: "sample price placeholder", pattern: /\bsample\s+price\b/i },

    { label: "public TODO marker", pattern: /\bTODO\b/ },
    { label: "public WIP marker", pattern: /\bWIP\b/ },
    { label: "public debug marker", pattern: /\bdebug\b/i, allowedContext: /\/api\/debug-seatgeek/ },
    { label: "route shim wording", pattern: /\broute\s+shim\b/i },
    { label: "raw HTML internal wording", pattern: /\braw\s+HTML\b/i, allowedContext: /\b(include|render|response)\b/i },
    { label: "implementation detail wording", pattern: /\bimplementation\s+detail\b/i }
  ];

  await assertLineRulesAbsent(files, rules, "public copy regression guardrails");
}

async function assertGuideCopyGuardrails(files) {
  const rules = [
    { label: "currency price example", pattern: /[£$€]\s*\d/i },
    { label: "fixed percentage claim", pattern: /\b\d+(?:\.\d+)?\s*(?:%|percent)\b/i },
    { label: "fixed percentage range claim", pattern: /\b\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?\s*%/i },
    { label: "rating threshold claim", pattern: /\b\d+(?:\.\d+)?\+?\s*stars?\b/i },
    { label: "cheapest claim", pattern: /\bcheapest\b/i },
    { label: "best price claim", pattern: /\bbest\s+price\b/i },
    { label: "best deal claim", pattern: /\bbest\s+deal\b/i },
    { label: "lowest price claim", pattern: /\blowest\s+price\b/i },
    { label: "deep discount claim", pattern: /\b(?:deepest\s+discounts?|best\s+resale\s+deals?)\b/i },
    {
      label: "savings claim",
      pattern: /\bsavings?\b/i,
      allowedContext: /\b(no|not|without|do not|does not|cannot|never|unless|until|unverified|unsupported|promise|promises|claim|claims|strategy)\b/i
    },
    {
      label: "provider guarantee claim",
      pattern: /\b(?:buyer\s+guarantees?|delivery\s+guarantee|guarantee\s+that|protects\s+you\s+if|platform\s+backs|will\s+refund|will\s+resend)\b/i,
      allowedContext: /\b(no|not|without|does not|do not|cannot|never|unless|until|assuming|instead of assuming|read|review|published|terms|varies|coverage)\b/i
    },
    {
      label: "deterministic resale timing claim",
      pattern: /\b(?:prices?\s+(?:will|are\s+likely\s+to|tend\s+to|typically|often)\s+(?:drop|rise|fall|soften|increase)|resale\s+prices\s+(?:will|are\s+likely\s+to|tend\s+to|typically|often)|prices?\s+drop|price\s+drop|final\s+48\s+hours|days?\s+\d+(?:\s*[-–]\s*\d+)?)\b/i,
      allowedContext: /\b(no|not|do not|does not|cannot|never|without|avoid|predict|prediction|predictable|not predictable|not guaranteed|do not rely|cannot predict)\b/i
    },
    { label: "raw Ticketmaster affiliate URL", pattern: /https?:\/\/(?:www\.)?ticketmaster\.evyy\.net\b/i },
    { label: "raw SeatGeek affiliate URL", pattern: /https?:\/\/(?:www\.)?seatgeek\.pxf\.io\b/i },
    { label: "raw Impact affiliate URL", pattern: /https?:\/\/(?:www\.)?pxf\.io\b/i }
  ];

  await assertLineRulesAbsent(files, rules, "guide copy guardrails");
}

async function assertNoRawPublicAffiliateUrls(files) {
  const rules = [
    { label: "raw Ticketmaster affiliate host", pattern: /\b(?:https?:\/\/)?(?:www\.)?ticketmaster\.evyy\.net\b/i },
    { label: "raw SeatGeek affiliate host", pattern: /\b(?:https?:\/\/)?(?:www\.)?seatgeek\.pxf\.io\b/i },
    { label: "raw Impact affiliate host", pattern: /\b(?:https?:\/\/)?(?:www\.)?pxf\.io\b/i }
  ];

  await assertLineRulesAbsent(files, rules, "public-facing affiliate URL guardrails");
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : "";
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i);
  return match ? match[1] : "";
}

function extractDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  return match ? match[1] : "";
}

class MemoryCache {
  constructor() {
    this.items = new Map();
  }

  async match(key) {
    return this.items.get(String(key)) || null;
  }

  async put(key, response) {
    this.items.set(String(key), response.clone());
  }
}

globalThis.caches = globalThis.caches || { default: new MemoryCache() };

const publicUiFiles = [
  "public/index.html",
  "public/app.js",
  "public/impact.js",
  "public/styles.css",
  "public/robots.txt",
  "public/data/artists.json",
  "public/data/events.json",
  "public/data/events-index.json",
  "public/data/affiliate-routes.json",
  "public/data/inventory-model.json",
  "public/data/catalog.json"
];
const publicCopyFiles = [
  "public/index.html",
  "public/app.js",
  "public/impact.js",
  "functions/[[path]].js",
  "public/data/catalog.json"
];
const guideCopyFiles = [
  "public/data/guides-content.json",
  "public/app.js",
  "functions/_route-metadata.js"
];
const publicCopyRegressionFiles = [
  "public/index.html",
  "public/app.js",
  "functions/[[path]].js",
  "functions/_route-metadata.js",
  "public/data/guides-content.json",
  "public/data/catalog.json"
];
const publicAffiliateUrlFiles = [
  ...new Set(
    publicUiFiles.concat([
      "public/data/guides-content.json",
      "functions/[[path]].js",
      "functions/_route-metadata.js"
    ])
  )
];

const joinedPublic = (await Promise.all(publicAffiliateUrlFiles.map((file) => read(file)))).join("\n");
assert(
  joinedPublic.includes("Find verified ticket links for major tours"),
  "homepage public-facing copy should be present"
);
await assertPublicCopySafe(publicCopyFiles);
await assertPublicCopyRegressionGuardrails(publicCopyRegressionFiles);
await assertGuideCopyGuardrails(guideCopyFiles);
await assertNoRawPublicAffiliateUrls(publicAffiliateUrlFiles);
assertAbsent(
  joinedPublic,
  [
    "example.com",
    "preview mode",
    "debug",
    "cheapest",
    "best price",
    "best deal",
    "lowest price",
    "from £",
    "from $",
    "from €",
    "MusicEvent",
    "ticketmaster.evyy.net",
    "https://seatgeek.pxf.io/cowboycarter",
    "seatgeek.pxf.io/cowboycarter",
    "GENERIC_SEATGEEK_SEARCH_URL",
    "General SeatGeek search"
  ],
  "public files"
);
assert(!/innerHTML|insertAdjacentHTML|document\.write/.test(await read("public/app.js")), "app.js must avoid unsafe HTML injection");

const events = await readJson("public/data/events.json");
assert(Array.isArray(events), "events.json must be an array");
const eventsWithSeatGeekUrl = events.filter((event) => String(event?.seatgeek_url || "").trim());
assert(eventsWithSeatGeekUrl.length >= 1, "events.json should keep at least one verified event-level SeatGeek URL for redirect coverage");
for (const event of eventsWithSeatGeekUrl) {
  assert(safeSeatGeekEventUrl(event.seatgeek_url) === event.seatgeek_url, `${event.id} should use a strict event-level SeatGeek URL`);
}
const controlledSeatGeekEvent = events.find((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(controlledSeatGeekEvent?.seatgeek_url === CONTROLLED_SEATGEEK_URL, "controlled Morgan Wallen Gainesville SeatGeek URL should remain unchanged");
const rootSeatGeekUrlById = new Map(events.map((event) => [event.id, String(event?.seatgeek_url || "").trim()]));
const eventPartitionSlugs = [...new Set(events.map((event) => String(event?.artist_slug || "").trim()).filter(Boolean))];
for (const artistSlug of eventPartitionSlugs) {
  const partitionPath = `public/data/events/${artistSlug}.json`;
  if (!(await fileExists(partitionPath))) continue;
  const partitionEvents = await readJson(partitionPath);
  for (const partitionEvent of partitionEvents) {
    const partitionSeatGeekUrl = String(partitionEvent?.seatgeek_url || "").trim();
    const rootSeatGeekUrl = rootSeatGeekUrlById.get(partitionEvent.id) || "";
    assert(partitionSeatGeekUrl === rootSeatGeekUrl, `${partitionPath} should keep seatgeek_url in sync for ${partitionEvent.id}`);
    if (partitionSeatGeekUrl) {
      assert(safeSeatGeekEventUrl(partitionSeatGeekUrl) === partitionSeatGeekUrl, `${partitionPath} should use a strict event-level SeatGeek URL for ${partitionEvent.id}`);
    }
  }
}
const { artistSlugs, catalog } = await deriveArtistSlugsFromData();
assert(Array.isArray(catalog.artists) && catalog.artists.length === artistSlugs.length, "catalog should expose the known artist routes");
for (const slug of artistSlugs) {
  assert(catalog.artists.some((artist) => artist.slug === slug), `catalog missing artist ${slug}`);
}

const routesManifest = await readJson("public/_routes.json");
assert(routesManifest.version === 1, "_routes.json should use Cloudflare Pages routes schema version 1");
assert(
  JSON.stringify(routesManifest.include) === JSON.stringify(["/*"]),
  "_routes.json should invoke Functions for all public routes"
);
assert(
  JSON.stringify(routesManifest.exclude) === JSON.stringify(["/_assets/*", "/favicon.ico"]),
  "_routes.json should only exclude immutable assets and favicon.ico"
);
await read("public/404.html");

const middlewareModule = await import(pathToFileURL(path.join(root, "functions/_middleware.js")));
const routeMetadataModule = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));
const showsModule = await import(pathToFileURL(path.join(root, "functions/api/shows.js")));
const outModule = await import(pathToFileURL(path.join(root, "functions/api/out.js")));
const debugSeatgeekModule = await import(pathToFileURL(path.join(root, "functions/api/debug-seatgeek.js")));
const healthModule = await import(pathToFileURL(path.join(root, "functions/api/health.js")));
const impactHealthModule = await import(pathToFileURL(path.join(root, "functions/api/impact/health.js")));
const impactProductsModule = await import(pathToFileURL(path.join(root, "functions/api/impact/products.js")));
const impactTrackingModule = await import(pathToFileURL(path.join(root, "functions/api/impact/tracking-links.js")));

const assetMap = new Map();
for (const file of publicUiFiles) {
  assetMap.set(`/${file.replace(/^public\//, "")}`, await read(file));
}
assetMap.set("/index.html", await read("public/index.html"));
assetMap.set("/", await read("public/index.html"));

const env = {
  MOCK_MODE: "false",
  ALLOW_MOCK_PRICES: "false",
  TICKETMASTER_DISCOVERY_ENABLED: "false",
  CLICK_TRACKING_ENABLED: "true",
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      const body = assetMap.get(url.pathname);
      return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
    }
  }
};

async function routeResponse(pathname, envOverride = env) {
  let nextCalled = false;
  const response = await middlewareModule.onRequest({
    request: new Request(`https://tourticketcompare.com${pathname}`),
    env: envOverride,
    next: () => {
      nextCalled = true;
      return new Response("next", { status: 404 });
    }
  });
  return { response, text: await response.text(), nextCalled };
}

for (const pathname of ["/app.js", "/impact.js", "/styles.css", "/favicon.svg", "/robots.txt", "/data/events.json", "/api/health"]) {
  const { response, nextCalled } = await routeResponse(pathname);
  assert(nextCalled === true, `${pathname} should pass through middleware unchanged`);
  assert(response.status === 404, `${pathname} smoke middleware next sentinel should return 404`);
}

const indexHtml = await read("public/index.html");
assert(!/<script[^>]*type="text\/javascript"/.test(indexHtml), "index.html must not contain inline script tags — Impact script must be loaded via /impact.js");
assert(indexHtml.includes('src="/impact.js"'), "index.html must load Impact via <script src=\"/impact.js\">");

const routeRawEvidence = [];

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text, nextCalled } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);

  // CSP: must be present on function-rendered HTML responses, allow Impact CDN, no unsafe-inline
  const csp = response.headers.get("Content-Security-Policy");
  assert(csp !== null, `${pathname} function response must include Content-Security-Policy`);
  assert(csp === EXPECTED_CSP, `${pathname} CSP should match expected value, got: ${csp}`);
  assert(!csp.includes("'unsafe-inline'"), `${pathname} CSP must not contain 'unsafe-inline'`);
  assert(csp.includes("https://utt.impactcdn.com"), `${pathname} CSP must allow https://utt.impactcdn.com`);

  // Canonical URL: tag must be present and point to the exact route
  const actualCanonical = extractCanonical(text);
  assert(actualCanonical !== "", `${pathname} should include a canonical URL`);
  assert(
    actualCanonical === `https://tourticketcompare.com${pathname}`,
    `${pathname} canonical should be "https://tourticketcompare.com${pathname}", got "${actualCanonical}"`
  );

  assert(nextCalled === false, `${pathname} should be rendered by Pages Functions middleware, not passed to static assets`);

  // Meta description: tag must be present and match the route-specific source of truth.
  const actualDescription = extractDescription(text);
  assert(actualDescription !== "", `${pathname} should include a meta description`);
  const expectedDescription = routeMetadataModule.TRUST_ROUTES[pathname]?.description;
  if (expectedDescription) {
    assert(
      actualDescription === expectedDescription,
      `${pathname} description should be "${expectedDescription}", got "${actualDescription}"`
    );
  }
  if (pathname !== "/") {
    assert(
      actualDescription !== homepageDescription,
      `${pathname} should not return the homepage meta description`
    );
  }

  // H1: must match the route-specific expected value
  const h1 = extractH1(text);
  const artist = catalog.artists.find((a) => `/artists/${a.slug}` === pathname);
  const expected = expectedH1.get(pathname) || `${artist?.name} ticket links and buying guidance`;
  assert(h1 === expected, `${pathname} should render route-specific H1 "${expected}", got "${h1}"`);

  // Title: must match the route-specific expected value
  const actualTitle = extractTitle(text);
  const expectedT = expectedTitle.get(pathname) || artist?.seo_title || `${artist?.name} Tickets | Options & Availability`;
  assert(actualTitle === expectedT, `${pathname} title should be "${expectedT}", got "${actualTitle}"`);

  if (functionBackedStaticRoutes.includes(pathname)) {
    assert(h1 !== expectedH1.get("/"), `${pathname} should not return the homepage H1 in raw HTML`);
    assert(text.includes(routeMarkers.get(pathname)), `${pathname} should include route-specific raw HTML content`);
  }

  const canonicalTag = text.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>(?:\s*)/i)?.[0] || "";
  const titleTag = text.match(/<title>[\s\S]*?<\/title>/i)?.[0] || "";
  const h1Tag = text.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0] || "";
  const metaDescriptionTag = text.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>(?:\s*)/i)?.[0] || "";
  assert(canonicalTag.includes(`href="https://tourticketcompare.com${pathname}"`), `${pathname} raw canonical tag should include expected href`);
  assert(titleTag.length > 0, `${pathname} should include a raw <title> tag`);
  assert(h1Tag.length > 0, `${pathname} should include a raw <h1> tag`);
  assert(metaDescriptionTag.length > 0, `${pathname} should include a raw description meta tag`);

  routeRawEvidence.push({
    pathname,
    status: response.status,
    canonicalTag,
    titleTag,
    h1Tag,
    metaDescriptionTag
  });
}

console.log("[smoke] Route raw-response evidence:");
for (const evidence of routeRawEvidence) {
  console.log(JSON.stringify(evidence));
}

// JSON-LD: verify schema exists, parses, and contains correct types per route
function extractJsonLd(html) {
  const match = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!match) return null;
  try { return JSON.parse(match[1]); } catch { return null; }
}

const jsonLdRoutes = [
  { pathname: "/", expectTypes: ["Organization", "WebSite"], noTypes: ["BreadcrumbList", "FAQPage", "Article"] },
  { pathname: "/artists", expectTypes: ["Organization", "WebSite", "BreadcrumbList"], noTypes: ["FAQPage", "Article"] },
  { pathname: "/guides", expectTypes: ["Organization", "WebSite", "BreadcrumbList"], noTypes: ["FAQPage", "Article"] },
  { pathname: "/how-it-works", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "FAQPage"], noTypes: ["Article"] },
  { pathname: "/artists/beyonce", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "FAQPage"], noTypes: ["Article", "Event", "Product", "Offer", "AggregateRating"] },
  { pathname: "/guides/how-to-compare-concert-ticket-prices", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "Article"], noTypes: ["FAQPage", "Event", "Product", "Offer", "AggregateRating"] }
];
for (const { pathname, expectTypes, noTypes } of jsonLdRoutes) {
  const { text } = await routeResponse(pathname);
  const ld = extractJsonLd(text);
  assert(ld !== null, `${pathname} must include a parseable application/ld+json script tag`);
  assert(ld["@context"] === "https://schema.org", `${pathname} JSON-LD must use @context https://schema.org`);
  assert(Array.isArray(ld["@graph"]), `${pathname} JSON-LD must use @graph array`);
  const types = ld["@graph"].map(node => node["@type"]);
  for (const t of expectTypes) {
    assert(types.includes(t), `${pathname} JSON-LD @graph must include @type "${t}", found: ${types.join(", ")}`);
  }
  for (const t of noTypes) {
    assert(!types.includes(t), `${pathname} JSON-LD @graph must NOT include @type "${t}"`);
  }
  const forbidden = ["Event", "Product", "Offer", "AggregateRating", "Review"];
  for (const t of forbidden) {
    assert(!types.includes(t), `${pathname} JSON-LD must not include forbidden @type "${t}"`);
  }
}

const unknownArtist = await routeResponse("/artists/not-a-real-artist");
assert(unknownArtist.response.status === 404, "unknown artist route should return 404");
assert(/noindex,follow/.test(unknownArtist.text), "unknown artist route should be noindex");
assert(unknownArtist.response.headers.get("Content-Security-Policy") === EXPECTED_CSP, "404 function response must include correct Content-Security-Policy");
const legacy = await routeResponse("/beyonce");
assert(legacy.response.status === 301, "known old root artist route should redirect");
assert(legacy.response.headers.get("location") === "https://tourticketcompare.com/artists/beyonce", "known old route should target the canonical artist page");

const showsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env
});
assert(showsResponse.status === 200, "/api/shows should return 200");
const showsJson = await showsResponse.json();
assert(Array.isArray(showsJson.shows), "/api/shows should return a shows array");
assert(showsJson.mockMode === false && showsJson.allowMockPrices === false, "/api/shows should keep mock prices disabled");
assert(showsJson.providerAvailability?.seatgeek === false, "/api/shows should expose only a safe false SeatGeek availability flag without credentials");
const seatGeekApiOnlyShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: {
    ...env,
    SEATGEEK_CLIENT_ID: "sg-client-id",
    SEATGEEK_CLIENT_SECRET: "sg-client-secret"
  }
});
const seatGeekApiOnlyShowsJson = await seatGeekApiOnlyShowsResponse.json();
assert(seatGeekApiOnlyShowsJson.providerAvailability?.seatgeek === false, "/api/shows SeatGeek availability should not be enabled by SeatGeek API discovery credentials alone");
const morganShows = showsJson.shows.filter((show) => show.artist_slug === "morgan-wallen");
const expectedMorganShows = events
  .filter((event) => event?.artist_slug === "morgan-wallen")
  .filter((event) => Number.isFinite(Date.parse(event.dateTimeISO || event.datetime_iso)))
  .filter((event) => Date.parse(event.dateTimeISO || event.datetime_iso) >= SMOKE_TEST_NOW_MS)
  .sort((a, b) => Date.parse(a.dateTimeISO || a.datetime_iso) - Date.parse(b.dateTimeISO || b.datetime_iso));
const pastMorganEvents = events
  .filter((event) => event?.artist_slug === "morgan-wallen")
  .filter((event) => Number.isFinite(Date.parse(event.dateTimeISO || event.datetime_iso)))
  .filter((event) => Date.parse(event.dateTimeISO || event.datetime_iso) < SMOKE_TEST_NOW_MS);
assert(pastMorganEvents.length > 0, "/api/shows regression fixture should include at least one past Morgan Wallen event for exclusion coverage");
assert(morganShows.length === expectedMorganShows.length, `/api/shows should expose exactly the Morgan Wallen events current/upcoming as of ${SMOKE_TEST_NOW_ISO}`);
assert(
  morganShows.map((show) => show.id).join("|") === expectedMorganShows.map((event) => event.id).join("|"),
  `/api/shows should exclude past Morgan Wallen events and preserve current/upcoming event order as of ${SMOKE_TEST_NOW_ISO}`
);
for (const pastEvent of pastMorganEvents) {
  assert(!morganShows.some((show) => show.id === pastEvent.id), `${pastEvent.id} should be excluded once it is before the smoke test clock`);
}
for (const show of morganShows) {
  assert(show.ticketmaster_url && show.ticketmaster_url.includes(`/event/${show.ticketmaster_event_id}`), `${show.id} should use its exact event-specific Ticketmaster URL`);
  assert(!JSON.stringify(show).match(/example\.com|placeholder|ticketmaster\.evyy|price/i), `${show.id} should not expose placeholders, artist affiliate URLs, or prices`);
}
const verifiedMorganShow = morganShows[0];
const controlledSeatGeekShow = morganShows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(controlledSeatGeekShow, "Morgan Wallen shows should include the controlled SeatGeek test event");
const nonSeatGeekMorganShow = morganShows.find((show) => !String(show.seatgeek_url || "").trim());
assert(controlledSeatGeekShow.seatgeek_url === CONTROLLED_SEATGEEK_URL, "/api/shows should expose the controlled SeatGeek URL on the verified event");
if (nonSeatGeekMorganShow) {
  assert(!String(nonSeatGeekMorganShow.seatgeek_url || "").trim(), "/api/shows should keep SeatGeek URLs empty for Morgan Wallen events that still lack a verified event-level SeatGeek URL");
}
const seatGeekConfiguredEnv = {
  ...env,
  IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
  IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
  IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
};
const seatGeekBaseTrackingEnv = {
  ...env,
  IMPACT_SEATGEEK_BASE_TRACKING_URL: CONTROLLED_SEATGEEK_BASE_TRACKING_URL
};
const configuredShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: seatGeekConfiguredEnv
});
const configuredShowsJson = await configuredShowsResponse.json();
assert(configuredShowsJson.providerAvailability?.seatgeek === true, "/api/shows should expose only a safe true SeatGeek availability flag when the Impact API fallback is configured");
assert(
  configuredShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === Boolean(safeSeatGeekEventUrl(show.seatgeek_url))),
  "/api/shows should mark SeatGeek CTAs resolvable for every stored event-level SeatGeek URL when Impact API tracking is configured"
);
const baseTrackingShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: seatGeekBaseTrackingEnv
});
const baseTrackingShowsJson = await baseTrackingShowsResponse.json();
assert(baseTrackingShowsJson.providerAvailability?.seatgeek === true, "/api/shows should expose a safe true SeatGeek availability flag when the base tracking URL is configured");
assert(
  baseTrackingShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === Boolean(safeSeatGeekEventUrl(show.seatgeek_url))),
  "/api/shows should mark SeatGeek CTAs resolvable for every stored event-level SeatGeek URL when base tracking is configured"
);
const serverMorganWithSeatGeek = await routeResponse("/artists/morgan-wallen", seatGeekBaseTrackingEnv);
const expectedMorganSeatGeekCtas = baseTrackingShowsJson.shows.filter((show) => show.provider_ctas?.seatgeek === true).length;
const renderedMorganSeatGeekCtas = (serverMorganWithSeatGeek.text.match(/Check SeatGeek/g) || []).length;
assert(renderedMorganSeatGeekCtas > 0 && renderedMorganSeatGeekCtas <= expectedMorganSeatGeekCtas, "server-rendered Morgan Wallen page should show SeatGeek CTAs only for rendered shows with event-level SeatGeek URLs when configured");
assert(serverMorganWithSeatGeek.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "server-rendered SeatGeek CTA should target the controlled show through /api/out");
assert(serverMorganWithSeatGeek.text.includes("SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase."), "server-rendered SeatGeek CTA should include conservative supporting copy");
const invalidSeatGeekEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, seatgeek_url: "https://example.com/not-a-valid-seatgeek-event" }
  : event));
const invalidSeatGeekEnv = {
  ...seatGeekBaseTrackingEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(invalidSeatGeekEventsJson, { status: 200 });
      return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
    }
  }
};
const invalidSeatGeekPage = await routeResponse("/artists/morgan-wallen", invalidSeatGeekEnv);
assert(!invalidSeatGeekPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "server-rendered SeatGeek CTA should be hidden for an event URL that /api/out would reject");
const invalidSeatGeekShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: invalidSeatGeekEnv
});
const invalidSeatGeekShowsJson = await invalidSeatGeekShowsResponse.json();
assert(
  invalidSeatGeekShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === (show.id !== CONTROLLED_SEATGEEK_SHOW_ID && Boolean(safeSeatGeekEventUrl(show.seatgeek_url)))),
  "hydrated SeatGeek CTAs should be unavailable only for event URLs that are not accepted by the redirect allowlist"
);
const invalidSeatGeekShow = invalidSeatGeekShowsJson.shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(invalidSeatGeekShow?.seatgeek_url?.includes("example.com"), "invalid test fixture should expose a SeatGeek URL that the hydrated allowlist rejects");
const serverMorganWithoutSeatGeek = await routeResponse("/artists/morgan-wallen");
assert(!serverMorganWithoutSeatGeek.text.includes("Check SeatGeek"), "server-rendered SeatGeek CTA should stay hidden without SeatGeek Impact config");
const appJs = await read("public/app.js");
assert(appJs.includes("showEventCta"), "artist show cards should support event-specific CTAs");
assert(appJs.includes("/api/out?"), "artist show cards should route event CTAs through /api/out");
assert(appJs.includes("showId"), "artist show card CTAs should include showId");
assert(!appJs.includes("https://seatgeek.com"), "client-side app code must not hard-code direct SeatGeek public CTA links");
assert(appJs.includes("safeSeatGeekEventUrl"), "hydrated artist show cards should validate SeatGeek event URLs");
assert(appJs.includes("providerAvailability?.seatgeek"), "hydration should use the safe SeatGeek availability flag from /api/shows");
const seatGeekGateFunction = appJs.match(/function seatGeekOutAvailable\(show, options = \{\}\) \{[\s\S]*?\n\}/);
assert(seatGeekGateFunction, "client-side SeatGeek CTA gate should exist");
assert(seatGeekGateFunction[0].includes("const hasValidSeatGeekEventUrl = Boolean(safeSeatGeekEventUrl(show?.seatgeek_url));"), "SeatGeek CTA gate should require a valid stored SeatGeek event URL before rendering");
assert(seatGeekGateFunction[0].includes("if (!hasValidSeatGeekEventUrl) return false;"), "SeatGeek CTA gate should reject provider flags when SeatGeek URL validation fails");
assert(seatGeekGateFunction[0].includes("return show.provider_ctas.seatgeek === true && hasValidSeatGeekEventUrl;"), "SeatGeek CTA gate should require both the provider flag and a valid stored SeatGeek event URL");
assert(!seatGeekGateFunction[0].includes("return show.provider_ctas.seatgeek === true;"), "SeatGeek CTA gate should not trust the provider flag on its own");
assert(appJs.includes("Check SeatGeek"), "hydration should preserve the SeatGeek CTA for the controlled event when configured");
assert(appJs.includes("SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase."), "hydration should preserve the safe SeatGeek supporting copy");
assert(appJs.includes("No verified ticket link is available for this date."), "event cards should have a safe unavailable state");
assert(!appJs.includes("renderProviderButtons(artist, \"artist_hero\")"), "artist pages should not render a separate generic provider panel");

const bulkPriceResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?includePrices=true"),
  env
});
assert(bulkPriceResponse.status === 400, "bulk includePrices must be rejected without showId");

const showPriceResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(verifiedMorganShow.id)}&includePrices=true`),
  env
});
assert(showPriceResponse.status === 200, "showId includePrices should return 200");
const showPriceJson = await showPriceResponse.json();
assert(showPriceJson.shows.length === 1, "showId includePrices should return one show");
assert(!JSON.stringify(showPriceJson).match(/"price"\s*:\s*[1-9]/), "showId includePrices should not expose fake prices");
const ticketmasterLane = showPriceJson.shows[0].prices.find((lane) => lane.provider === "Ticketmaster");
assert(ticketmasterLane?.actionUrl === `/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=Ticketmaster`, "Ticketmaster lane should use the event-specific safe redirect");

const healthResponse = await healthModule.onRequestGet({ env });
const healthJson = await healthResponse.json();
assert(healthResponse.status === 200 && healthJson.ok === true, "/api/health should return safe app status");
assert(!JSON.stringify(healthJson).includes("IMPACT_AUTH_TOKEN"), "/api/health must not expose secret names as values");

const impactHealth = await impactHealthModule.onRequestGet({ env });
assert(impactHealth.status === 200, "/api/impact/health should fail safely without credentials");
const impactProducts = await impactProductsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/impact/products?q=ticket"),
  env
});
const impactProductsJson = await impactProducts.json();
assert(impactProducts.status === 200 && impactProductsJson.status === "missing_credentials", "/api/impact/products should fail safely without credentials");
const impactTracking = await impactTrackingModule.onRequestPost({
  request: new Request("https://tourticketcompare.com/api/impact/tracking-links", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ confirmCreate: true, programId: "123" })
  }),
  env
});
const impactTrackingJson = await impactTracking.json();
assert(impactTracking.status === 200 && impactTrackingJson.status === "missing_credentials", "/api/impact/tracking-links should fail safely without credentials");

async function out(pathname, method = "GET", payload = null, envOverride = env) {
  return outModule[method === "GET" ? "onRequestGet" : "onRequestPost"]({
    request: new Request(`https://tourticketcompare.com${pathname}`, {
      method,
      headers: { "content-type": "application/json", "user-agent": "smoke-test" },
      body: payload ? JSON.stringify(payload) : undefined,
      redirect: "manual"
    }),
    env: envOverride
  });
}

let outResponse = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&sourcePath=/artists/beyonce");
assert(outResponse.status === 302, "/api/out should redirect configured Ticketmaster routes");
assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "/api/out redirect responses should include the temporary production proof header");
outResponse = await out("/api/out?artistSlug=beyonce&provider=seatgeek");
assert(outResponse.status === 400, "SeatGeek redirect should fail safely without Impact tracking configured (IMPACT_SEATGEEK_PROGRAM_ID not set)");
assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "/api/out error responses should include the temporary production proof header");
outResponse = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com");
assert(outResponse.status === 400, "example.com destination should fail");
outResponse = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=http%3A%2F%2Flocalhost%3A3000");
assert(outResponse.status === 400, "localhost destination should fail");
outResponse = await out("/api/out", "POST", { artistSlug: "beyonce", provider: "ticketmaster" });
const outJson = await outResponse.json();
assert(outResponse.status === 200 && outJson.redirectUrl, "POST /api/out should keep JSON compatibility");
assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "POST /api/out JSON responses should include the temporary production proof header");
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&sourcePath=/artists/morgan-wallen`);
assert(outResponse.status === 302, "showId /api/out should redirect verified Ticketmaster event routes");
assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "showId /api/out should use the exact stored event-specific Ticketmaster URL");
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com`);
assert(outResponse.status === 302, "showId /api/out should ignore arbitrary deepLink values when the stored event URL is verified");
assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "showId /api/out must not redirect to user-supplied deepLink values");
const sourceUrlFallbackEventsJson = JSON.stringify(events.map((event) => event.id === verifiedMorganShow.id
  ? { ...event, ticketmaster_url: "", source_url: verifiedMorganShow.ticketmaster_url }
  : event));
const sourceUrlFallbackEnv = {
  ...env,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(sourceUrlFallbackEventsJson, { status: 200 });
      return env.ASSETS.fetch(request);
    }
  }
};
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster`, "GET", null, sourceUrlFallbackEnv);
assert(outResponse.status === 302, "showId /api/out should use a verified Ticketmaster source_url fallback when ticketmaster_url is missing");
assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "source_url fallback should keep the exact verified Ticketmaster event URL");
const renderedTicketmasterShowIds = [...serverMorganWithoutSeatGeek.text.matchAll(/showId=([^&"]+)&amp;provider=ticketmaster/g)].map((match) => decodeURIComponent(match[1]));
assert(renderedTicketmasterShowIds.length > 0, "regression check should find rendered Morgan Wallen Ticketmaster CTA showIds");
for (const showId of renderedTicketmasterShowIds) {
  outResponse = await out(`/api/out?showId=${encodeURIComponent(showId)}&provider=ticketmaster`);
  assert(outResponse.status === 302, `rendered Morgan Wallen Ticketmaster CTA for ${showId} should resolve through /api/out`);
}
const originalFetch = globalThis.fetch;
const renderedSeatGeekShowIds = [...serverMorganWithSeatGeek.text.matchAll(/showId=([^&"]+)&amp;provider=seatgeek/g)].map((match) => decodeURIComponent(match[1]));
const renderedSeatGeekHrefs = [...serverMorganWithSeatGeek.text.matchAll(/href="([^"]*provider=seatgeek[^"]*)"/g)].map((match) => decodeHtmlEntities(match[1]));
const seatGeekEligibleShowIds = new Set(baseTrackingShowsJson.shows.filter((show) => show.provider_ctas?.seatgeek === true).map((show) => show.id));
const expectedRenderedSeatGeekShowIds = renderedTicketmasterShowIds.filter((showId) => seatGeekEligibleShowIds.has(showId));
assert(renderedSeatGeekShowIds.length > 0, "regression check should find rendered SeatGeek CTA showIds for SeatGeek-eligible rendered events");
assert(JSON.stringify([...renderedSeatGeekShowIds].sort()) === JSON.stringify([...expectedRenderedSeatGeekShowIds].sort()), "regression check should find exactly the SeatGeek-eligible rendered showIds and no extra SeatGeek CTAs");
assert(renderedSeatGeekHrefs.length === renderedSeatGeekShowIds.length && renderedSeatGeekHrefs.every((href) => href.startsWith("/api/out?") && href.includes("provider=seatgeek")), "rendered SeatGeek CTAs must route through /api/out instead of direct SeatGeek links");
try {
  globalThis.fetch = async () => {
    throw new Error("SeatGeek base tracking redirects should not call the Impact API");
  };
  for (const showId of renderedSeatGeekShowIds) {
    outResponse = await out(`/api/out?showId=${encodeURIComponent(showId)}&provider=seatgeek`, "GET", null, seatGeekBaseTrackingEnv);
    assert(outResponse.status === 302, `rendered SeatGeek CTA for ${showId} should resolve through /api/out`);
    assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "rendered SeatGeek CTA redirects should include the temporary production proof header");
  }
} finally {
  globalThis.fetch = originalFetch;
}
const invalidSeatGeekOutResponse = await out(
  `/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`,
  "GET",
  null,
  invalidSeatGeekEnv
);
assert(invalidSeatGeekOutResponse.status === 400, "invalid stored SeatGeek event URL should not resolve through /api/out");
const invalidSeatGeekOutJson = await invalidSeatGeekOutResponse.json();
assert(invalidSeatGeekOutJson.status === "event_ticket_url_unavailable", "invalid stored SeatGeek event URL should fail with event_ticket_url_unavailable");
const genericSeatGeekUrlFixtures = [
  ["search", "https://seatgeek.com/search?q=morgan%20wallen"],
  ["artist", "https://seatgeek.com/artists/morgan-wallen"],
  ["venue", "https://seatgeek.com/venues/ben-hill-griffin-stadium/tickets"],
  ["performer", "https://seatgeek.com/performers/morgan-wallen"]
];
for (const [genericSeatGeekUrlType, genericSeatGeekUrl] of genericSeatGeekUrlFixtures) {
  const genericSeatGeekEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
    ? { ...event, seatgeek_url: genericSeatGeekUrl }
    : event));
  const genericSeatGeekEnv = {
    ...seatGeekBaseTrackingEnv,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/data/events.json") return new Response(genericSeatGeekEventsJson, { status: 200 });
        return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
      }
    }
  };
  const genericSeatGeekPage = await routeResponse("/artists/morgan-wallen", genericSeatGeekEnv);
  assert(!genericSeatGeekPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), `server-rendered SeatGeek CTA should be hidden for generic SeatGeek ${genericSeatGeekUrlType} URLs`);
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`,
    "GET",
    null,
    genericSeatGeekEnv
  );
  assert(outResponse.status === 400, `generic stored SeatGeek ${genericSeatGeekUrlType} URLs should not resolve through /api/out`);
  const genericSeatGeekOutJson = await outResponse.json();
  assert(genericSeatGeekOutJson.status === "event_ticket_url_unavailable", `generic stored SeatGeek ${genericSeatGeekUrlType} URLs should fail with event_ticket_url_unavailable`);
}
const httpSeatGeekEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, seatgeek_url: CONTROLLED_SEATGEEK_URL.replace("https://", "http://") }
  : event));
const httpSeatGeekEnv = {
  ...seatGeekConfiguredEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(httpSeatGeekEventsJson, { status: 200 });
      return seatGeekConfiguredEnv.ASSETS.fetch(request);
    }
  }
};
const httpSeatGeekPage = await routeResponse("/artists/morgan-wallen", httpSeatGeekEnv);
assert(!httpSeatGeekPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "server-rendered SeatGeek CTA should be hidden for HTTP SeatGeek event URLs");
outResponse = await out(
  `/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`,
  "GET",
  null,
  httpSeatGeekEnv
);
assert(outResponse.status === 400, "HTTP SeatGeek event URL should not resolve through /api/out");
const httpSeatGeekJson = await outResponse.json();
assert(httpSeatGeekJson.status === "event_ticket_url_unavailable", "HTTP SeatGeek event URL should fail with event_ticket_url_unavailable");
const impactTrackingUrl = "https://ticketmaster.evyy.net/c/123456/98765/101010";
try {
  globalThis.fetch = async (request, options = {}) => {
    const url = new URL(String(request.url || request));
    assert(url.hostname === "api.impact.com", "Impact tracking links should call the server-side Impact API");
    assert(url.searchParams.get("DeepLink") === verifiedMorganShow.ticketmaster_url, "Impact DeepLink should be the stored event-specific Ticketmaster URL");
    assert(url.pathname.includes("/Mediapartners/tm-account/Programs/tm-program/TrackingLinks"), "Ticketmaster Impact request should use Ticketmaster credentials");
    assert(!url.toString().includes("example.com"), "Impact request must not use request-supplied example.com deep links");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("tm-account:tm-token").toString("base64")}`, "Ticketmaster Impact request should use Ticketmaster basic auth");
    return new Response(JSON.stringify({ TrackingURL: impactTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com`,
    "GET",
    null,
    {
      ...env,
      IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
      IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program"
    }
  );
  assert(outResponse.status === 302, "Impact-enabled showId /api/out should still redirect");
  assert(outResponse.headers.get("location") === impactTrackingUrl, "Impact-enabled showId /api/out should redirect to the returned TrackingURL");

  globalThis.fetch = async () => new Response(JSON.stringify({ Message: "forbidden" }), {
    status: 403,
    headers: { "content-type": "application/json" }
  });
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster`,
    "GET",
    null,
    {
      ...env,
      IMPACT_ACCOUNT_SID: "test-account",
      IMPACT_AUTH_TOKEN: "test-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "test-program"
    }
  );
  assert(outResponse.status === 302, "Impact failure should not block verified event redirects");
  assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "Impact failure should fall back to the exact stored Ticketmaster event URL");

  globalThis.fetch = async () => new Response(JSON.stringify({ TrackingURL: "http://localhost:3000/bad" }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster`,
    "GET",
    null,
    {
      ...env,
      IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
      IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program"
    }
  );
  assert(outResponse.status === 302, "Unsafe Impact TrackingURL should not block verified event redirects");
  assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "Unsafe Impact TrackingURL should fall back to the exact stored Ticketmaster event URL");
} finally {
  globalThis.fetch = originalFetch;
}
outResponse = await out("/api/out?showId=unknown&provider=ticketmaster");
assert(outResponse.status === 400, "unknown showId should fail safely");
outResponse = await out(`/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`);
assert(outResponse.status === 400, "SeatGeek showId provider should fail safely without Impact tracking configured");
const unconfiguredSeatGeekShowJson = await outResponse.json();
assert(unconfiguredSeatGeekShowJson.status === "impact_missing_credentials", "controlled SeatGeek showId should report impact_missing_credentials when SeatGeek Impact credentials are missing");
assert(unconfiguredSeatGeekShowJson.hasProgramId === false, "missing SeatGeek credentials diagnostics should show missing program ID");
outResponse = await out(
  `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
  "GET",
  null,
  {
    ...env,
    SEATGEEK_CLIENT_ID: "sg-client-id",
    SEATGEEK_CLIENT_SECRET: "sg-client-secret"
  }
);
assert(outResponse.status === 400, "SeatGeek API discovery credentials alone should not enable controlled SeatGeek redirects");
const apiOnlySeatGeekShowJson = await outResponse.json();
assert(apiOnlySeatGeekShowJson.status === "impact_missing_credentials", "SeatGeek showId redirects should require Impact config, not SeatGeek API credentials");

try {
  globalThis.fetch = async () => {
    throw new Error("SeatGeek base tracking redirects should not call the Impact API");
  };

  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    seatGeekBaseTrackingEnv
  );
  assert(outResponse.status === 302, "SeatGeek base tracking URL should produce a 302 redirect");
  const baseLocation = outResponse.headers.get("location");
  assert(baseLocation.startsWith(CONTROLLED_SEATGEEK_BASE_TRACKING_URL), "SeatGeek base tracking redirect should start with the configured pxf.io base URL");
  const baseLocationUrl = new URL(baseLocation);
  assert(baseLocationUrl.searchParams.getAll("u").length === 1, "SeatGeek base tracking redirect should include exactly one u parameter");
  assert(baseLocationUrl.searchParams.get("u") === CONTROLLED_SEATGEEK_URL, "SeatGeek base tracking redirect should deep-link to the exact stored SeatGeek event URL");

  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_SEATGEEK_BASE_TRACKING_URL: `${CONTROLLED_SEATGEEK_BASE_TRACKING_URL}?subId=abc123&u=https%3A%2F%2Fold.example%2Fstale`
    }
  );
  assert(outResponse.status === 302, "SeatGeek base tracking URL with existing params should still redirect");
  const replacedLocationUrl = new URL(outResponse.headers.get("location"));
  assert(replacedLocationUrl.searchParams.getAll("u").length === 1, "SeatGeek base tracking redirect should replace an existing u parameter instead of duplicating it");
  assert(replacedLocationUrl.searchParams.get("u") === CONTROLLED_SEATGEEK_URL, "SeatGeek base tracking redirect should replace stale u values with the stored SeatGeek event URL");
  assert(replacedLocationUrl.searchParams.get("subId") === "abc123", "SeatGeek base tracking redirect should preserve non-u query parameters");

  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_SEATGEEK_BASE_TRACKING_URL: "not a url"
    }
  );
  assert(outResponse.status === 400, "Invalid SeatGeek base tracking URL should fail safely");
  let baseTrackingJson = await outResponse.json();
  assert(baseTrackingJson.status === "impact_base_tracking_url_invalid", "Invalid SeatGeek base tracking URL should report impact_base_tracking_url_invalid");
  assert(!JSON.stringify(baseTrackingJson).includes(CONTROLLED_SEATGEEK_BASE_TRACKING_URL), "SeatGeek base tracking diagnostics must not expose the full base tracking URL");

  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_SEATGEEK_BASE_TRACKING_URL: "https://evil.example/eK6adX"
    }
  );
  assert(outResponse.status === 400, "Disallowed SeatGeek base tracking host should fail safely");
  baseTrackingJson = await outResponse.json();
  assert(
    ["impact_base_tracking_url_host_not_allowed", "impact_base_tracking_url_unsafe"].includes(baseTrackingJson.status),
    "Disallowed SeatGeek base tracking host should report a safe base tracking URL status"
  );
  assert(!JSON.stringify(baseTrackingJson).includes("evil.example"), "SeatGeek base tracking diagnostics must not expose the configured disallowed host");
} finally {
  globalThis.fetch = originalFetch;
}

const seatGeekTrackingUrl = "https://seatgeek.com/impact-tracked/morgan-wallen";
try {
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_ACCOUNT_SID: "legacy-account",
      IMPACT_AUTH_TOKEN: "legacy-token"
    }
  );
  assert(outResponse.status === 400, "SeatGeek should fail safely when the SeatGeek Impact program ID is missing");
  const missingSeatGeekProgramJson = await outResponse.json();
  assert(missingSeatGeekProgramJson.status === "impact_missing_program_id", "SeatGeek should report impact_missing_program_id when only shared Impact credentials are present");
  assert(missingSeatGeekProgramJson.hasProgramId === false, "missing SeatGeek program diagnostics should show hasProgramId false");

  const sharedSeatGeekImpactEnv = {
    ...env,
    IMPACT_ACCOUNT_SID: "shared-account",
    IMPACT_AUTH_TOKEN: "shared-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
  };
  let sharedSeatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    sharedSeatGeekImpactCalled = true;
    assert(requestUrl.hostname === "api.impact.com", "SeatGeek shared Impact credentials should still call Impact");
    assert(requestUrl.pathname.includes("/Mediapartners/shared-account/Programs/sg-program/TrackingLinks"), "SeatGeek shared Impact request should use the shared account and SeatGeek program");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_SEATGEEK_URL, "SeatGeek shared Impact DeepLink should be the controlled SeatGeek event URL");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("shared-account:shared-token").toString("base64")}`, "SeatGeek shared Impact request should use shared basic auth");
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    sharedSeatGeekImpactEnv
  );
  assert(sharedSeatGeekImpactCalled, "SeatGeek should call Impact when shared credentials and SeatGeek program ID are configured");
  assert(outResponse.status === 302, "SeatGeek should redirect when shared Impact credentials and SeatGeek program ID succeed");
  assert(outResponse.headers.get("location") === seatGeekTrackingUrl, "SeatGeek shared Impact success should redirect to the tracking URL");

  const campaignIdSeatGeekImpactEnv = {
    ...env,
    IMPACT_ACCOUNT_SID: "shared-account",
    IMPACT_AUTH_TOKEN: "shared-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "legacy-sg-program",
    IMPACT_SEATGEEK_CAMPAIGN_ID: "campaign-sg-program"
  };
  let campaignIdSeatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    campaignIdSeatGeekImpactCalled = true;
    assert(requestUrl.pathname.includes("/Mediapartners/shared-account/Programs/campaign-sg-program/TrackingLinks"), "SeatGeek CampaignId env var should take precedence over legacy ProgramId env var");
    assert(!requestUrl.pathname.includes("legacy-sg-program"), "SeatGeek CampaignId precedence should not use the legacy ProgramId when both are present");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("shared-account:shared-token").toString("base64")}`, "SeatGeek CampaignId precedence should preserve shared basic auth");
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    campaignIdSeatGeekImpactEnv
  );
  assert(campaignIdSeatGeekImpactCalled, "SeatGeek should call Impact when the CampaignId alias is configured");
  assert(outResponse.status === 302, "SeatGeek should redirect when the CampaignId alias succeeds");

  const configuredSeatGeekImpactEnv = {
    ...env,
    IMPACT_ACCOUNT_SID: "legacy-account",
    IMPACT_AUTH_TOKEN: "legacy-token",
    IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
    IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
    IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program",
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
  };

  let seatGeekImpactCalled = false;
  const assertSeatGeekImpactRequest = (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    assert(requestUrl.hostname !== "api.seatgeek.com", "SeatGeek showId /api/out must not use broad SeatGeek API search fallback");
    assert(requestUrl.hostname === "api.impact.com", "SeatGeek tracking should call Impact with the controlled event URL");
    seatGeekImpactCalled = true;
    assert(requestUrl.pathname.includes("/Mediapartners/sg-account/Programs/sg-program/TrackingLinks"), "SeatGeek Impact request should use the configured SeatGeek account and program");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_SEATGEEK_URL, "SeatGeek Impact DeepLink should be the controlled SeatGeek event URL");
    assert(!requestUrl.pathname.includes("tm-account") && !requestUrl.pathname.includes("legacy-account"), "SeatGeek Impact request must not use Ticketmaster account IDs when SeatGeek-specific credentials are configured");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "SeatGeek Impact request should use SeatGeek basic auth");
  };

  globalThis.fetch = async (request, options = {}) => {
    assertSeatGeekImpactRequest(request, options);
    return new Response(JSON.stringify({ Message: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    configuredSeatGeekImpactEnv
  );
  assert(seatGeekImpactCalled, "SeatGeek unavailable path should still call SeatGeek Impact tracking");
  assert(outResponse.status === 400, "SeatGeek Impact failure should fail safely");
  let seatGeekImpactJson = await outResponse.json();
  assert(seatGeekImpactJson.status === "impact_program_not_accessible", "SeatGeek Impact 403 failure should report impact_program_not_accessible");
  assert(seatGeekImpactJson.impactStatusCode === 403, "SeatGeek Impact non-2xx diagnostics should include the safe status code");
  assert(seatGeekImpactJson.provider === "seatgeek", "SeatGeek Impact diagnostics should include provider");
  assert(seatGeekImpactJson.hasDestination === true, "SeatGeek Impact diagnostics should confirm a stored destination was available");
  assert(seatGeekImpactJson.destinationHost === "seatgeek.com", "SeatGeek Impact diagnostics should include only the safe destination host");
  assert(seatGeekImpactJson.impactConfigPresent === true, "SeatGeek Impact diagnostics should confirm config presence without exposing secrets");
  assert(seatGeekImpactJson.impactEndpoint?.endpointPathShape === "/Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks", "SeatGeek Impact diagnostics should include the safe endpoint path shape");
  assert(seatGeekImpactJson.impactEndpoint?.parameterLocation === "query_string", "SeatGeek Impact diagnostics should show DeepLink is sent in the query string");
  assert(!JSON.stringify(seatGeekImpactJson).includes("sg-token") && !JSON.stringify(seatGeekImpactJson).includes("sg-account"), "SeatGeek Impact diagnostics must not expose secrets or account IDs");

  seatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    assertSeatGeekImpactRequest(request, options);
    return new Response(JSON.stringify({ Message: "not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    configuredSeatGeekImpactEnv
  );
  assert(seatGeekImpactCalled, "SeatGeek 404 path should still call SeatGeek Impact tracking");
  assert(outResponse.status === 400, "SeatGeek Impact 404 should fail safely");
  seatGeekImpactJson = await outResponse.json();
  assert(seatGeekImpactJson.status === "impact_tracking_endpoint_not_found", "SeatGeek Impact 404 should report impact_tracking_endpoint_not_found");
  assert(seatGeekImpactJson.impactStatusCode === 404, "SeatGeek Impact 404 diagnostics should include the safe status code");
  assert(seatGeekImpactJson.impactResponseMessage === "not found", "SeatGeek Impact 404 diagnostics may include a sanitized safe message");
  assert(!JSON.stringify(seatGeekImpactJson).includes("sg-token") && !JSON.stringify(seatGeekImpactJson).includes("sg-account"), "SeatGeek Impact 404 diagnostics must not expose secrets or account IDs");

  seatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    assertSeatGeekImpactRequest(request, options);
    return new Response(JSON.stringify({ Message: "created without tracking URL" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    configuredSeatGeekImpactEnv
  );
  assert(seatGeekImpactCalled, "SeatGeek missing TrackingURL path should still call SeatGeek Impact tracking");
  assert(outResponse.status === 400, "SeatGeek Impact response missing TrackingURL should fail safely");
  seatGeekImpactJson = await outResponse.json();
  assert(seatGeekImpactJson.status === "impact_response_missing_tracking_url", "SeatGeek Impact response missing TrackingURL should report impact_response_missing_tracking_url");
  assert(seatGeekImpactJson.impactResponseFieldNames?.includes("Message"), "SeatGeek missing TrackingURL diagnostics should include safe Impact response field names");

  seatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    assertSeatGeekImpactRequest(request, options);
    return new Response(JSON.stringify({ TrackingURL: "http://localhost:3000/unsafe" }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    configuredSeatGeekImpactEnv
  );
  assert(seatGeekImpactCalled, "SeatGeek unsafe path should still call SeatGeek Impact tracking");
  assert(outResponse.status === 400, "Unsafe SeatGeek Impact TrackingURL should not redirect");
  seatGeekImpactJson = await outResponse.json();
  assert(seatGeekImpactJson.status === "impact_tracking_url_unsafe", "Unsafe SeatGeek Impact TrackingURL should report impact_tracking_url_unsafe");
  assert(seatGeekImpactJson.impactResponseFieldNames?.includes("TrackingURL"), "Unsafe SeatGeek diagnostics should include safe Impact response field names");
  assert(seatGeekImpactJson.provider === "seatgeek", "Unsafe SeatGeek Impact diagnostics should include provider");
  assert(seatGeekImpactJson.hasDestination === true, "Unsafe SeatGeek Impact diagnostics should confirm a stored destination was available");
  assert(seatGeekImpactJson.destinationHost === "seatgeek.com", "Unsafe SeatGeek Impact diagnostics should include only the safe destination host");
  assert(seatGeekImpactJson.impactConfigPresent === true, "Unsafe SeatGeek Impact diagnostics should confirm config presence without exposing secrets");

  seatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    assertSeatGeekImpactRequest(request, options);
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    configuredSeatGeekImpactEnv
  );
  assert(seatGeekImpactCalled, "SeatGeek configured path should call SeatGeek Impact tracking");
  assert(outResponse.status === 302, "SeatGeek configured showId /api/out should redirect");
  assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "SeatGeek configured showId /api/out should include the temporary production proof header");
  assert(outResponse.headers.get("location") === seatGeekTrackingUrl, "SeatGeek configured showId /api/out should redirect to SeatGeek Impact tracking URL");
} finally {
  globalThis.fetch = originalFetch;
}

async function debugSeatgeek(pathname, envOverride = env) {
  return debugSeatgeekModule.onRequestGet({
    request: new Request(`https://tourticketcompare.com${pathname}`),
    env: envOverride
  });
}

let debugResponse = await debugSeatgeek(`/api/debug-seatgeek?eventId=${encodeURIComponent(verifiedMorganShow.id)}`);
assert(debugResponse.status === 404, "/api/debug-seatgeek without token should return 404");
const debugJson = await debugResponse.json();
assert(debugJson.error === "Not found", "/api/debug-seatgeek unauthorised should not leak provider info");
assert(!JSON.stringify(debugJson).includes("seatgeek"), "/api/debug-seatgeek unauthorised should not mention SeatGeek");

debugResponse = await debugSeatgeek(`/api/debug-seatgeek?eventId=${encodeURIComponent(verifiedMorganShow.id)}&token=wrong-token`);
assert(debugResponse.status === 404, "/api/debug-seatgeek with wrong token should return 404");

debugResponse = await debugSeatgeek(`/api/debug-seatgeek?eventId=${encodeURIComponent(verifiedMorganShow.id)}&token=valid-debug-token`, {
  ...env,
  DEBUG_API_TOKEN: "valid-debug-token"
});
assert(debugResponse.status === 200, "/api/debug-seatgeek with valid token should return 200");
const authdDebugJson = await debugResponse.json();
assert(authdDebugJson.ok === true && authdDebugJson.event, "/api/debug-seatgeek authorised should return event details");
assert(authdDebugJson.config.seatgeek_configured === false, "/api/debug-seatgeek authorised should show SeatGeek config status");

try {
  const debugImpactCalls = [];
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    debugImpactCalls.push({ pathname: requestUrl.pathname, options });
    assert(requestUrl.hostname === "api.impact.com", "/api/debug-seatgeek impact diagnostics should only call Impact");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "/api/debug-seatgeek impact diagnostics should use server-side auth without returning it");
    if (requestUrl.pathname.includes("/Campaigns/sg-program")) {
      return new Response(JSON.stringify({
        CampaignId: "sg-program",
        ContractStatus: "Active",
        AllowsDeeplinking: "true",
        TrackingLink: "https://seatgeek.com/c/partner/ad/program",
        DeeplinkDomains: { DeeplinkDomain: "seatgeek.com" }
      }), { status: 200, headers: { "content-type": "application/json" } });
    }
    assert(requestUrl.pathname.includes("/Programs/sg-program/TrackingLinks"), "/api/debug-seatgeek impact diagnostics should use the create tracking link endpoint shape");
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  debugResponse = await debugSeatgeek(`/api/debug-seatgeek?eventId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&impact=1&token=valid-debug-token`, {
    ...env,
    DEBUG_API_TOKEN: "valid-debug-token",
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
  });
  assert(debugResponse.status === 200, "/api/debug-seatgeek impact diagnostics should return 200 with valid token");
  const debugImpactJson = await debugResponse.json();
  assert(debugImpactJson.impact_diagnostics?.programLookup?.status === "impact_program_found", "/api/debug-seatgeek should verify whether the SeatGeek program exists");
  assert(debugImpactJson.impact_diagnostics?.tracking?.status === "impact_tracking_link_created", "/api/debug-seatgeek should verify tracking link creation capability");
  assert(debugImpactJson.impact_diagnostics?.tracking?.endpoint?.endpointPathShape === "/Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks", "/api/debug-seatgeek should expose the safe Impact endpoint path shape");
  assert(debugImpactCalls.length === 2, "/api/debug-seatgeek impact diagnostics should perform one program lookup and one tracking-link attempt");
  assert(!JSON.stringify(debugImpactJson).includes("sg-token") && !JSON.stringify(debugImpactJson).includes("sg-account"), "/api/debug-seatgeek impact diagnostics must not expose secrets or account IDs");
} finally {
  globalThis.fetch = originalFetch;
}

// Verify SeatGeek CTA visibility rules
// Rule 1: SeatGeek CTA requires SeatGeek Impact config + an event-level verified SeatGeek URL.

// Test 1: Credentials present, Impact program present, but no event-level SeatGeek URL
const nonSeatGeekShow = events.find((show) => !String(show.seatgeek_url || "").trim());
assert(nonSeatGeekShow, "fixture should include at least one event without a verified SeatGeek URL");
outResponse = await out(`/api/out?showId=${encodeURIComponent(nonSeatGeekShow.id)}&provider=seatgeek`);
assert(outResponse.status === 400, "SeatGeek /api/out should fail safely when event has no verified SeatGeek URL");
const noMatchJson = await outResponse.json();
assert(noMatchJson.status === "event_ticket_url_unavailable", "SeatGeek should fail with correct status when no event-level URL");

// Test 2: Credentials missing → SeatGeek blocked
outResponse = await out("/api/out?artistSlug=beyonce&provider=seatgeek", "GET", null, env);
assert(outResponse.status === 400, "SeatGeek should fail when credentials missing");
const noCrdsJson = await outResponse.json();
assert(noCrdsJson.status === "provider_not_configured", "SeatGeek reports missing credentials");

// Test 3: Impact program missing → SeatGeek blocked
outResponse = await out("/api/out?artistSlug=beyonce&provider=seatgeek", "GET", null, {
  ...env,
  IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
  IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token"
});
assert(outResponse.status === 400, "SeatGeek should fail when Impact program missing");

// Test 4: Ticketmaster still works
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster`);
assert(outResponse.status === 302, "Ticketmaster redirect should still work");

// Test 5: stored event-level SeatGeek URLs are allowed, but config alone must not create CTAs.
assert(controlledSeatGeekShow.seatgeek_url === CONTROLLED_SEATGEEK_URL, "controlled SeatGeek event URL should remain available for the approved test show");
assert(!String(nonSeatGeekShow.seatgeek_url || "").trim(), "non-eligible show should still have no SeatGeek URL");
assert(!serverMorganWithoutSeatGeek.text.includes("Check SeatGeek"), "SeatGeek CTAs should remain hidden when SeatGeek affiliate config is absent even if an event URL exists");

console.log("SeatGeek visibility gating verified: event-level URL plus affiliate config required");

// Verified artist (Bruno Mars) must be indexable with artist-level CTA
const brunoMarsPage = await routeResponse("/artists/bruno-mars");
assert(brunoMarsPage.response.status === 200, "/artists/bruno-mars must return 200");
assert(/index,follow/.test(brunoMarsPage.text), "/artists/bruno-mars (indexable) must render index,follow robots meta");
assert(/\/api\/out\?artistSlug=bruno-mars/.test(brunoMarsPage.text), "/artists/bruno-mars must render artist-level /api/out CTA link");
assert(!brunoMarsPage.text.includes("still being reviewed"), "/artists/bruno-mars (indexable) must not show review-pending notice");

// Fully-verified artist (Morgan Wallen) must remain indexable and keep its event CTAs
assert(/index,follow/.test(serverMorganWithoutSeatGeek.text), "/artists/morgan-wallen (indexable) must remain index,follow");
assert(serverMorganWithoutSeatGeek.text.includes("View event ticket link"), "/artists/morgan-wallen (indexable) must still show event CTA buttons");

console.log("indexable artist verification passed for bruno-mars");

console.log("Cloudflare Pages MVP smoke checks passed");
