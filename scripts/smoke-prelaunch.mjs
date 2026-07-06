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
const EXPECTED_CSP = "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self'; script-src 'self' 'sha256-NA6Fs6EENO5v4wTsp2imB+jef7W4UHySG38JuT59oy0=' https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'";
const CONTROLLED_SEATGEEK_SHOW_ID = "tm-morgan-wallen-2026-gainesville-2200635d19f97a46";
const CONTROLLED_SEATGEEK_URL = "https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112";
const CONTROLLED_SEATGEEK_BASE_TRACKING_URL = "https://seatgeek.pxf.io/eK6adX";
const EXPECTED_OUT_VERSION = "tm-plain-redirects-2026-07-02";
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

  return { artistSlugs: catalogSlugs, catalog, artists };
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

// Mirrors providerEventPublishable in functions/api/out.js /
// functions/[[path]].js / public/app.js for the SeatGeek lane.
function seatGeekEventPublishable(event) {
  if (event?.provider_links?.seatgeek?.verified === true) return true;
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return status === "human_verified" || status === "machine_high_confidence";
  return event?.provider_links?.ticketmaster?.verified === true;
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
    const response = this.items.get(String(key));
    return response ? response.clone() : null;
  }

  async put(key, response) {
    this.items.set(String(key), response.clone());
  }
}

function createProviderPricingDb(rows) {
  const pricingRows = Array.isArray(rows) ? rows : [];
  return {
    prepare(sql) {
      const text = String(sql || "");
      return {
        bind(...values) {
          return {
            async first() {
              if (text.includes("provider_pricing_cache")) {
                const [eventId, provider, source] = values;
                return pricingRows.find((row) =>
                  row.event_id === eventId &&
                  row.provider === provider &&
                  row.source === source
                ) || null;
              }
              return null;
            },
            async run() {
              return { success: true };
            }
          };
        },
        async run() {
          return { success: true };
        }
      };
    }
  };
}

globalThis.caches = globalThis.caches || { default: new MemoryCache() };

const publicUiFiles = [
  "public/index.html",
  "public/app.js",
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
    "ticketmaster.evyy.net",
    "https://seatgeek.pxf.io/cowboycarter",
    "seatgeek.pxf.io/cowboycarter",
    "GENERIC_SEATGEEK_SEARCH_URL",
    "General SeatGeek search"
  ],
  "public files"
);
// MusicEvent JSON-LD is allowed only inside the gated schema builder in
// functions/[[path]].js, which must filter shows on the same publishable gate
// as the visible show board before emitting nodes. Everywhere else the term
// stays banned so unverified event schema cannot creep into client JS or data.
const musicEventScanFiles = publicAffiliateUrlFiles.filter((file) => file !== "functions/[[path]].js");
assertAbsent(
  (await Promise.all(musicEventScanFiles.map((file) => read(file)))).join("\n"),
  ["MusicEvent"],
  "public files outside the gated schema builder"
);
assert(
  /futureShowsForArtist\(events, route\.artist\.slug, 6\)\s*\.filter\(\(show\) => show\.publishable/.test(
    await read("functions/[[path]].js")
  ),
  "[[path]].js MusicEvent schema must gate on show.publishable"
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
const { artistSlugs, catalog, artists } = await deriveArtistSlugsFromData();
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
const sitemapModule = await import(pathToFileURL(path.join(root, "functions/sitemap.xml.js")));
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


function extractSitemapLocs(xml) {
  return [...String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function sitemapLocs(envOverride = env) {
  const response = await sitemapModule.onRequestGet({
    request: new Request("https://tourticketcompare.com/sitemap.xml"),
    env: envOverride
  });
  assert(response.status === 200, "/sitemap.xml should return 200");
  return extractSitemapLocs(await response.text());
}

const sitemapLocations = await sitemapLocs();
const indexableArtistSlugs = artists
  .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
  .map((artist) => normalizeSlug(artist?.slug))
  .filter(Boolean);
for (const slug of indexableArtistSlugs) {
  assert(
    sitemapLocations.includes(`https://tourticketcompare.com/artists/${slug}`),
    `/sitemap.xml should include currently indexable artist ${slug}`
  );
}

const reviewRequiredSlug = "smoke-review-required-artist";
const missingMetadataSlug = "smoke-missing-metadata-artist";
const syntheticCatalog = {
  ...catalog,
  artists: catalog.artists.concat([
    { slug: reviewRequiredSlug, name: "Smoke Review Required Artist" },
    { slug: missingMetadataSlug, name: "Smoke Missing Metadata Artist" }
  ])
};
const syntheticArtists = artists.concat([
  {
    slug: reviewRequiredSlug,
    name: "Smoke Review Required Artist",
    indexing_status: "review_required",
    verified_provider_count: 0,
    verified_providers: [],
    last_verified_at: null
  }
]);
const syntheticSitemapEnv = {
  ...env,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/catalog.json") return new Response(JSON.stringify(syntheticCatalog), { status: 200 });
      if (url.pathname === "/data/artists.json") return new Response(JSON.stringify(syntheticArtists), { status: 200 });
      return env.ASSETS.fetch(request);
    }
  }
};
const syntheticSitemapLocations = await sitemapLocs(syntheticSitemapEnv);
for (const slug of indexableArtistSlugs) {
  assert(
    syntheticSitemapLocations.includes(`https://tourticketcompare.com/artists/${slug}`),
    `/sitemap.xml should preserve currently indexable artist ${slug} with synthetic shell fixture`
  );
}
assert(
  !syntheticSitemapLocations.includes(`https://tourticketcompare.com/artists/${reviewRequiredSlug}`),
  "/sitemap.xml must exclude review_required artist shells"
);
assert(
  !syntheticSitemapLocations.includes(`https://tourticketcompare.com/artists/${missingMetadataSlug}`),
  "/sitemap.xml must exclude catalog artists with no artists.json metadata"
);
console.log("sitemap artist indexability filtering verified");

for (const pathname of ["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/data/events.json", "/api/health"]) {
  const { response, nextCalled } = await routeResponse(pathname);
  assert(nextCalled === true, `${pathname} should pass through middleware unchanged`);
  assert(response.status === 404, `${pathname} smoke middleware next sentinel should return 404`);
}

const indexHtml = await read("public/index.html");
assert(!/<script[^>]*type="text\/javascript"/.test(indexHtml), "index.html must not contain inline script tags");
// The Google tag (gtag.js) snippet is the only bare inline script; its CSP sha256 hash
// must stay in sync with the snippet body or browsers will refuse to run it.
{
  const inlineScripts = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert(inlineScripts.length === 1, "index.html should contain exactly one bare inline script (the Google tag snippet)");
  assert(inlineScripts[0][1].includes("gtag('config', 'G-Q7R1NQY8YH')"), "index.html inline script should be the Google tag snippet");
  const { createHash } = await import("node:crypto");
  const inlineHash = createHash("sha256").update(inlineScripts[0][1], "utf8").digest("base64");
  assert(
    EXPECTED_CSP.includes(`'sha256-${inlineHash}'`),
    `CSP sha256 hash must match the inline Google tag snippet — expected 'sha256-${inlineHash}' in EXPECTED_CSP (update functions/[[path]].js, public/_headers, and EXPECTED_CSP together)`
  );
}
assert(!indexHtml.includes("impact.js"), "index.html must not reference the removed Ticketmaster Impact Publisher Tag (/impact.js)");
assert(!indexHtml.includes("impactcdn.com"), "index.html must not reference impactcdn.com — the Ticketmaster affiliate tag was removed");

const routeRawEvidence = [];

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text, nextCalled } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);

  // CSP: must be present on function-rendered HTML responses, same-origin only, no unsafe-inline
  const csp = response.headers.get("Content-Security-Policy");
  assert(csp !== null, `${pathname} function response must include Content-Security-Policy`);
  assert(csp === EXPECTED_CSP, `${pathname} CSP should match expected value, got: ${csp}`);
  assert(!csp.includes("'unsafe-inline'"), `${pathname} CSP must not contain 'unsafe-inline'`);
  assert(!csp.includes("impactcdn.com"), `${pathname} CSP must not allow impactcdn.com — the Ticketmaster affiliate tag was removed`);

  // Google tag: every rendered page keeps the shell's gtag.js snippet
  assert(
    text.includes('src="https://www.googletagmanager.com/gtag/js?id=G-Q7R1NQY8YH"'),
    `${pathname} should include the Google tag (gtag.js) loader from the shell <head>`
  );

  // Canonical URL: tag must be present and point to the exact route
  const actualCanonical = extractCanonical(text);
  assert(actualCanonical !== "", `${pathname} should include a canonical URL`);
  assert(
    actualCanonical === `https://tourticketcompare.com${pathname}`,
    `${pathname} canonical should be "https://tourticketcompare.com${pathname}", got "${actualCanonical}"`
  );

  assert(nextCalled === false, `${pathname} should be rendered by Pages Functions middleware, not passed to static assets`);

  // Social share image: every route must expose an absolute og:image + twitter:image
  // pointing at the shared brand card, and use the large summary card.
  const ogImage = text.match(/<meta\s+property="og:image"\s+content="([^"]*)"\s*\/?>/i)?.[1] || "";
  const twitterImage = text.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"\s*\/?>/i)?.[1] || "";
  const twitterCard = text.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"\s*\/?>/i)?.[1] || "";
  assert(
    ogImage === "https://tourticketcompare.com/og-image.png",
    `${pathname} og:image should be the absolute brand image URL, got "${ogImage}"`
  );
  assert(
    twitterImage === "https://tourticketcompare.com/og-image.png",
    `${pathname} twitter:image should be the absolute brand image URL, got "${twitterImage}"`
  );
  assert(
    twitterCard === "summary_large_image",
    `${pathname} twitter:card should be "summary_large_image", got "${twitterCard}"`
  );

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
  configuredShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === Boolean(seatGeekEventPublishable(show) && safeSeatGeekEventUrl(show.seatgeek_url))),
  "/api/shows should mark SeatGeek CTAs resolvable for every publishable stored event-level SeatGeek URL when Impact API tracking is configured"
);
const baseTrackingShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: seatGeekBaseTrackingEnv
});
const baseTrackingShowsJson = await baseTrackingShowsResponse.json();
assert(baseTrackingShowsJson.providerAvailability?.seatgeek === true, "/api/shows should expose a safe true SeatGeek availability flag when the base tracking URL is configured");
assert(
  baseTrackingShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === Boolean(seatGeekEventPublishable(show) && safeSeatGeekEventUrl(show.seatgeek_url))),
  "/api/shows should mark SeatGeek CTAs resolvable for every publishable stored event-level SeatGeek URL when base tracking is configured"
);
const serverMorganWithSeatGeek = await routeResponse("/artists/morgan-wallen", seatGeekBaseTrackingEnv);
const expectedMorganSeatGeekCtas = baseTrackingShowsJson.shows.filter((show) => show.provider_ctas?.seatgeek === true).length;
const renderedMorganSeatGeekCtas = (serverMorganWithSeatGeek.text.match(/View tickets on SeatGeek/g) || []).length;
assert(renderedMorganSeatGeekCtas > 0 && renderedMorganSeatGeekCtas <= expectedMorganSeatGeekCtas, "server-rendered Morgan Wallen page should show SeatGeek CTAs only for rendered shows with event-level SeatGeek URLs when configured");
assert(serverMorganWithSeatGeek.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "server-rendered SeatGeek CTA should target the controlled show through /api/out");
assert(serverMorganWithSeatGeek.text.includes("SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase."), "server-rendered SeatGeek CTA should include conservative supporting copy");
// CTA inversion: SeatGeek is the primary CTA and renders before the plain
// (unmonetized) Ticketmaster secondary CTA inside the same cta-group.
const controlledCardCtaGroup = serverMorganWithSeatGeek.text
  .split("<div class=\"cta-group\">")
  .find((chunk) => chunk.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`));
assert(controlledCardCtaGroup, "controlled show card should render a cta-group when both providers are available");
const sgIndexInGroup = controlledCardCtaGroup.indexOf("View tickets on SeatGeek");
const tmIndexInGroup = controlledCardCtaGroup.indexOf("Check Ticketmaster");
assert(sgIndexInGroup !== -1 && tmIndexInGroup !== -1 && sgIndexInGroup < tmIndexInGroup, "SeatGeek CTA must render before the Ticketmaster CTA on paired cards");
const sgAnchorInGroup = controlledCardCtaGroup.slice(0, controlledCardCtaGroup.indexOf(">View tickets on SeatGeek</a>"));
assert(sgAnchorInGroup.includes("button-primary"), "SeatGeek CTA must be the primary button on paired cards");
const tmAnchorInGroup = controlledCardCtaGroup.slice(sgIndexInGroup, tmIndexInGroup);
assert(tmAnchorInGroup.includes("button-secondary"), "Ticketmaster CTA must be the secondary button on paired cards");
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
  invalidSeatGeekShowsJson.shows.every((show) => show.provider_ctas?.seatgeek === (show.id !== CONTROLLED_SEATGEEK_SHOW_ID && Boolean(seatGeekEventPublishable(show) && safeSeatGeekEventUrl(show.seatgeek_url)))),
  "hydrated SeatGeek CTAs should be unavailable only for event URLs that are not accepted by the redirect allowlist"
);
const invalidSeatGeekShow = invalidSeatGeekShowsJson.shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(invalidSeatGeekShow?.seatgeek_url?.includes("example.com"), "invalid test fixture should expose a SeatGeek URL that the hydrated allowlist rejects");
const serverMorganWithoutSeatGeek = await routeResponse("/artists/morgan-wallen");
assert(!serverMorganWithoutSeatGeek.text.includes("View tickets on SeatGeek"), "server-rendered SeatGeek CTA should stay hidden without SeatGeek Impact config");
assert(!serverMorganWithoutSeatGeek.text.includes("provider=seatgeek"), "server-rendered pages should not link /api/out SeatGeek redirects without SeatGeek Impact config");
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
assert(seatGeekGateFunction[0].includes('if (!providerEventPublishable(show, "seatgeek")) return false;'), "SeatGeek CTA gate should require per-provider event publishability");
assert(seatGeekGateFunction[0].includes("return show.provider_ctas.seatgeek === true && hasValidSeatGeekEventUrl;"), "SeatGeek CTA gate should require both the provider flag and a valid stored SeatGeek event URL");
assert(!seatGeekGateFunction[0].includes("return show.provider_ctas.seatgeek === true;"), "SeatGeek CTA gate should not trust the provider flag on its own");
assert(appJs.includes("View tickets on SeatGeek"), "hydration should preserve the SeatGeek CTA for the controlled event when configured");
assert(appJs.includes("SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase."), "hydration should preserve the safe SeatGeek supporting copy");
assert(appJs.includes("No verified ticket link is available for this date."), "event cards should have a safe unavailable state");
assert(!appJs.includes("renderProviderButtons(artist, \"artist_hero\")"), "artist pages should not render a separate generic provider panel");

// --- Regression guard: transient Ticketmaster sync/recheck state must never
// suppress public CTAs (production regression 2026-06-03). A data-sync or audit
// workflow must not be able to hide working provider CTAs. CTA suppression may
// only come from explicit, reviewed provider/link fields — never from
// transient review state, and never globally across providers. ---
const TM_RECHECK_HIDDEN_COPY = "Ticketmaster link temporarily hidden while";

// 1. Source-level guard: the renderer-facing CTA kill-switch artifact and the
//    code that read it must not be reintroduced. The original regression slipped
//    past behavioural tests because the suppression artifact (`/data/tm-cta-suppression.json`)
//    was served in production but not mocked in this smoke env, so suppression
//    silently no-op'd in tests while hiding ~256/272 CTAs in production. Guard at
//    the source so the pattern cannot return unnoticed.
const pathSource = await read("functions/[[path]].js");
assert(!(await fileExists("public/data/tm-cta-suppression.json")), "renderer-facing Ticketmaster CTA suppression artifact must not exist; CTA suppression must come from reviewed provider/link fields only");
for (const [label, src] of [["functions/[[path]].js", pathSource], ["public/app.js", appJs]]) {
  assert(!/tm-cta-suppression/i.test(src), `${label} must not load a transient Ticketmaster CTA suppression artifact`);
  assert(!/ticketmaster_cta_suppressed|ticketmasterCtaSuppress/i.test(src), `${label} must not gate CTAs on transient Ticketmaster suppression state`);
  assert(!src.includes(TM_RECHECK_HIDDEN_COPY), `${label} must not render broad "Ticketmaster link temporarily hidden" recheck copy that can blanket-hide CTAs`);
}

// 2a. Behavioural guard: stray transient suppression flags alone (without an
//     explicit reviewed verification_status) must NOT hide the verified
//     Ticketmaster or SeatGeek CTAs, and must NOT render the recheck-hidden
//     copy. This is the incident guard: blanket/transient suppression state
//     can never blanket-hide CTAs — only the reviewed, row-level
//     verification_status (2b below) or the provider verified flag may.
const strayFlaggedEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, ticketmaster_cta_suppressed: true, needs_recheck: true }
  : event));
const strayFlaggedEnv = {
  ...seatGeekBaseTrackingEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(strayFlaggedEventsJson, { status: 200 });
      return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
    }
  }
};
const strayFlaggedPage = await routeResponse("/artists/morgan-wallen", strayFlaggedEnv);
assert(!strayFlaggedPage.text.includes(TM_RECHECK_HIDDEN_COPY), "stray suppression flags must not render the Ticketmaster-hidden recheck copy on public pages");
assert(strayFlaggedPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "verified Ticketmaster CTA must survive stray transient suppression flags");
assert(strayFlaggedPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "SeatGeek CTA must never be hidden by stray transient suppression flags");

// 2b. Behavioural guard: an explicit, reviewed verification_status of
//     needs_recheck IS the supported row-level suppression state — the event's
//     CTAs must NOT render (eventLinkPublishable gate), and the recheck-hidden
//     copy must still never render.
const recheckStatusEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, verification_status: "needs_recheck" }
  : event));
const recheckStatusEnv = {
  ...seatGeekBaseTrackingEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(recheckStatusEventsJson, { status: 200 });
      return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
    }
  }
};
const recheckStatusPage = await routeResponse("/artists/morgan-wallen", recheckStatusEnv);
assert(!recheckStatusPage.text.includes(TM_RECHECK_HIDDEN_COPY), "explicit needs_recheck must not render the Ticketmaster-hidden recheck copy");
assert(!recheckStatusPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "explicit verification_status=needs_recheck must suppress the event's Ticketmaster CTA");
assert(!recheckStatusPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "explicit verification_status=needs_recheck must suppress the event's SeatGeek CTA when the SeatGeek link has no verified provenance of its own");
// The needs_recheck event must not resolve through /api/out for either provider.
const recheckSgOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`, "GET", null, recheckStatusEnv);
assert(recheckSgOut.status === 400, "needs_recheck event without SeatGeek provenance must not resolve a SeatGeek redirect");
assert((await recheckSgOut.json()).status === "event_link_not_publishable", "needs_recheck SeatGeek redirect should fail with event_link_not_publishable");

// 2b-ii. Standalone SeatGeek: a needs_recheck event whose SeatGeek link carries
//        its own verified provenance (provider_links.seatgeek.verified) renders
//        the SeatGeek CTA standalone — the suppressed Ticketmaster CTA stays
//        hidden — and /api/out resolves SeatGeek but not Ticketmaster.
const recheckSgVerifiedEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      verification_status: "needs_recheck",
      provider_links: {
        ...event.provider_links,
        seatgeek: { ...event.provider_links?.seatgeek, url: event.seatgeek_url, verified: true }
      }
    }
  : event));
const recheckSgVerifiedEnv = {
  ...seatGeekBaseTrackingEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(recheckSgVerifiedEventsJson, { status: 200 });
      return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
    }
  }
};
const recheckSgVerifiedPage = await routeResponse("/artists/morgan-wallen", recheckSgVerifiedEnv);
assert(recheckSgVerifiedPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "needs_recheck event with verified SeatGeek provenance must render the standalone SeatGeek CTA");
assert(!recheckSgVerifiedPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "needs_recheck event with verified SeatGeek provenance must still suppress the Ticketmaster CTA");
const standaloneSgOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`, "GET", null, recheckSgVerifiedEnv);
assert(standaloneSgOut.status === 302, "needs_recheck event with verified SeatGeek provenance must resolve the SeatGeek redirect");
assert(new URL(standaloneSgOut.headers.get("location")).searchParams.get("u") === CONTROLLED_SEATGEEK_URL, "standalone SeatGeek redirect must deep-link to the stored SeatGeek event URL");
const standaloneTmOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=ticketmaster`, "GET", null, recheckSgVerifiedEnv);
assert(standaloneTmOut.status === 400, "needs_recheck event must not resolve a Ticketmaster redirect even when the SeatGeek link is independently verified");
assert((await standaloneTmOut.json()).status === "event_link_not_publishable", "needs_recheck Ticketmaster redirect should fail with event_link_not_publishable");

// 2c. Behavioural guard: machine_high_confidence is CTA-publishable without
//     the human-verified provider flag — the explicit status alone must keep
//     the event CTA rendering.
const machineStatusEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      verification_status: "machine_high_confidence",
      provider_links: {
        ...event.provider_links,
        ticketmaster: { ...event.provider_links?.ticketmaster, verified: false }
      }
    }
  : event));
const machineStatusEnv = {
  ...seatGeekBaseTrackingEnv,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(machineStatusEventsJson, { status: 200 });
      return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
    }
  }
};
const machineStatusPage = await routeResponse("/artists/morgan-wallen", machineStatusEnv);
assert(machineStatusPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "verification_status=machine_high_confidence must keep the event Ticketmaster CTA rendering without the human-verified provider flag");

// 3. Whole-page guard: no public artist page should ever ship the recheck-hidden
//    copy while verified provider links exist on it.
assert(!serverMorganWithSeatGeek.text.includes(TM_RECHECK_HIDDEN_COPY), "server-rendered artist page with verified links must not contain Ticketmaster recheck-hidden copy");

// 4. Cache-bust guard: app.js is loaded unhashed on this no-build static site, so
//    a fix that lives only in app.js (e.g. removing client-side suppression) does
//    not reach returning visitors until their cached copy expires — the bundle
//    must carry a version query so the HTML (served fresh) forces every browser
//    onto the new file immediately. Regression 2026-06-03: the suppression fix
//    shipped but stale cached app.js kept re-hiding CTAs during hydration.
const shellHtml = await read("public/index.html");
const appScriptRef = shellHtml.match(/<script\s+src="\/app\.js[^"]*"/);
assert(appScriptRef, "index.html must load /app.js");
assert(/\/app\.js\?v=/.test(appScriptRef[0]), "index.html must load app.js with a ?v= cache-busting version so app.js-only fixes reach returning visitors without waiting for cache expiry");

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

function seatGeekLaneFrom(showPricesJson) {
  return showPricesJson.shows[0].prices.find((lane) => lane.provider === "SeatGeek");
}

const freshSeatGeekPriceRow = {
  event_id: CONTROLLED_SEATGEEK_SHOW_ID,
  provider: "seatgeek",
  low_price: 123.45,
  avg_price: 150.25,
  high_price: 240,
  currency: "USD",
  inventory_count: 42,
  verified_at: "2026-05-14T11:00:00Z",
  expires_at: "2026-05-14T13:00:00Z",
  source: "seatgeek_partner_api"
};
const staleSeatGeekPriceRow = {
  ...freshSeatGeekPriceRow,
  expires_at: "2026-05-14T11:30:00Z"
};
const flagOffFreshSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: {
    ...env,
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "false"
  }
});
const flagOffFreshSeatGeekJson = await flagOffFreshSeatGeekResponse.json();
const flagOffSeatGeekLane = seatGeekLaneFrom(flagOffFreshSeatGeekJson);
assert(flagOffSeatGeekLane?.price === null && flagOffSeatGeekLane?.providerStatus === "unavailable", "SeatGeek price should stay hidden when SEATGEEK_PRICE_DISPLAY_ENABLED is false even if a fresh D1 row exists");

const flagOnFreshSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: {
    ...env,
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  }
});
const flagOnFreshSeatGeekJson = await flagOnFreshSeatGeekResponse.json();
const flagOnFreshSeatGeekLane = seatGeekLaneFrom(flagOnFreshSeatGeekJson);
assert(flagOnFreshSeatGeekLane?.price === freshSeatGeekPriceRow.low_price, "SeatGeek price should be returned from a fresh approved D1 latest snapshot when the feature flag is enabled");
assert(flagOnFreshSeatGeekLane?.providerStatus === "ok" && flagOnFreshSeatGeekLane?.status === "ok", "fresh SeatGeek snapshot should return an ok provider lane");
assert(flagOnFreshSeatGeekLane?.fetchedAt === freshSeatGeekPriceRow.verified_at, "SeatGeek price lane should use verified_at as its as-of timestamp");
assert(flagOnFreshSeatGeekLane?.source === "seatgeek_partner_api", "SeatGeek price lane should expose only the approved source attribution");
assert(flagOnFreshSeatGeekLane?.expiresAt === freshSeatGeekPriceRow.expires_at, "SeatGeek price lane should expose the snapshot expiry for freshness checks");

const flagOnStaleSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: {
    ...env,
    DEMAND_DB: createProviderPricingDb([staleSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  }
});
const flagOnStaleSeatGeekLane = seatGeekLaneFrom(await flagOnStaleSeatGeekResponse.json());
assert(flagOnStaleSeatGeekLane?.price === null && flagOnStaleSeatGeekLane?.providerStatus === "unavailable", "stale SeatGeek D1 snapshots should be hidden and should not fall back to stale data");

if (nonSeatGeekMorganShow) {
  const missingUrlRow = { ...freshSeatGeekPriceRow, event_id: nonSeatGeekMorganShow.id };
  const missingUrlSeatGeekResponse = await showsModule.onRequestGet({
    request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(nonSeatGeekMorganShow.id)}&includePrices=true`),
    env: {
      ...env,
      DEMAND_DB: createProviderPricingDb([missingUrlRow]),
      SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
    }
  });
  const missingUrlSeatGeekLane = seatGeekLaneFrom(await missingUrlSeatGeekResponse.json());
  assert(missingUrlSeatGeekLane?.price === null && missingUrlSeatGeekLane?.providerStatus === "unavailable", "SeatGeek price should stay hidden when the event has no verified SeatGeek URL");
}

const malformedUrlSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: {
    ...invalidSeatGeekEnv,
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  }
});
const malformedUrlSeatGeekLane = seatGeekLaneFrom(await malformedUrlSeatGeekResponse.json());
assert(malformedUrlSeatGeekLane?.price === null && malformedUrlSeatGeekLane?.providerStatus === "unavailable", "SeatGeek price should stay hidden when the stored SeatGeek URL is malformed or rejected");

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
assert((await outResponse.json()).status === "provider_not_configured", "unconfigured artist-level SeatGeek should report provider_not_configured");
assert(outResponse.headers.get("X-TTC-Out-Version") === EXPECTED_OUT_VERSION, "/api/out error responses should include the temporary production proof header");
// Artist-level SeatGeek performer-page redirects are Impact-wrapped: base
// tracking mode deep-links the exact verified performer URL, and an Impact
// failure returns diagnostic JSON rather than an untracked redirect.
const preArtistSgFetch = globalThis.fetch;
try {
  globalThis.fetch = async () => {
    throw new Error("artist-level SeatGeek base tracking redirects should not call the Impact API");
  };
  outResponse = await out("/api/out?artistSlug=bruno-mars&provider=seatgeek&sourcePath=/artists/bruno-mars", "GET", null, {
    ...env,
    IMPACT_SEATGEEK_BASE_TRACKING_URL: CONTROLLED_SEATGEEK_BASE_TRACKING_URL
  });
  assert(outResponse.status === 302, "artist-level SeatGeek /api/out should redirect when base tracking is configured");
  const artistSgLocation = new URL(outResponse.headers.get("location"));
  assert(outResponse.headers.get("location").startsWith(CONTROLLED_SEATGEEK_BASE_TRACKING_URL), "artist-level SeatGeek redirect should start with the configured pxf.io base URL");
  assert(artistSgLocation.searchParams.get("u") === "https://seatgeek.com/bruno-mars-tickets", "artist-level SeatGeek redirect should deep-link the exact verified performer-page URL");

  globalThis.fetch = async () => new Response(JSON.stringify({ Message: "forbidden" }), {
    status: 403,
    headers: { "content-type": "application/json" }
  });
  outResponse = await out("/api/out?artistSlug=bruno-mars&provider=seatgeek", "GET", null, {
    ...env,
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
  });
  assert(outResponse.status === 400, "artist-level SeatGeek Impact failure should fail safely, not redirect untracked");
  const artistSgFailure = await outResponse.json();
  assert(artistSgFailure.status === "impact_program_not_accessible", "artist-level SeatGeek Impact 403 should report impact_program_not_accessible");
  assert(artistSgFailure.provider === "seatgeek", "artist-level SeatGeek Impact diagnostics should include provider");
} finally {
  globalThis.fetch = preArtistSgFetch;
}
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
const allRenderedSeatGeekHrefs = [...serverMorganWithSeatGeek.text.matchAll(/href="([^"]*provider=seatgeek[^"]*)"/g)].map((match) => decodeHtmlEntities(match[1]));
const renderedSeatGeekHrefs = allRenderedSeatGeekHrefs.filter((href) => href.includes("showId="));
const renderedArtistSeatGeekHrefs = allRenderedSeatGeekHrefs.filter((href) => href.includes("artistSlug="));
const seatGeekEligibleShowIds = new Set(baseTrackingShowsJson.shows.filter((show) => show.provider_ctas?.seatgeek === true).map((show) => show.id));
const expectedRenderedSeatGeekShowIds = renderedTicketmasterShowIds.filter((showId) => seatGeekEligibleShowIds.has(showId));
assert(renderedSeatGeekShowIds.length > 0, "regression check should find rendered SeatGeek CTA showIds for SeatGeek-eligible rendered events");
assert(JSON.stringify([...renderedSeatGeekShowIds].sort()) === JSON.stringify([...expectedRenderedSeatGeekShowIds].sort()), "regression check should find exactly the SeatGeek-eligible rendered showIds and no extra SeatGeek CTAs");
assert(allRenderedSeatGeekHrefs.every((href) => href.startsWith("/api/out?") && href.includes("provider=seatgeek")), "rendered SeatGeek CTAs must route through /api/out instead of direct SeatGeek links");
assert(renderedSeatGeekHrefs.length === renderedSeatGeekShowIds.length, "every event-level SeatGeek href must carry a showId");
assert(renderedArtistSeatGeekHrefs.length === 1 && renderedArtistSeatGeekHrefs[0].includes("artistSlug=morgan-wallen"), "the artist-level SeatGeek performer-page CTA must render exactly once through /api/out when configured");
// Provider panel: SeatGeek card renders before the Ticketmaster card when
// configured, and not at all when unconfigured.
const sgCardIdx = serverMorganWithSeatGeek.text.indexOf("Open SeatGeek artist page");
const tmCardIdx = serverMorganWithSeatGeek.text.indexOf("Open Ticketmaster artist page");
assert(sgCardIdx !== -1 && tmCardIdx !== -1 && sgCardIdx < tmCardIdx, "provider panel must show the SeatGeek artist card before the Ticketmaster artist card when configured");
assert(!serverMorganWithoutSeatGeek.text.includes("Open SeatGeek artist page"), "provider panel must not show a SeatGeek artist card without SeatGeek Impact config");
assert(serverMorganWithoutSeatGeek.text.includes("Open Ticketmaster artist page"), "provider panel must keep the plain Ticketmaster artist card without SeatGeek Impact config");
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
// Ticketmaster redirects are plain, unmonetized links: the site was removed
// from the Ticketmaster affiliate programme, so no Impact API call may be
// made for a Ticketmaster redirect even when legacy Impact env vars exist.
try {
  globalThis.fetch = async () => {
    throw new Error("Ticketmaster redirects must not call the Impact API");
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com`,
    "GET",
    null,
    {
      ...env,
      IMPACT_ACCOUNT_SID: "legacy-account",
      IMPACT_AUTH_TOKEN: "legacy-token",
      IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
      IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program"
    }
  );
  assert(outResponse.status === 302, "Ticketmaster showId /api/out should redirect");
  assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "Ticketmaster showId /api/out should redirect to the exact stored event URL with no Impact wrapping");
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

// --- Vivid Seats wiring: dormant without Impact config + verified event URLs,
//     Impact-wrapped (never a raw redirect) once configured. ---
const CONTROLLED_VIVIDSEATS_URL = "https://www.vividseats.com/morgan-wallen-tickets--concerts-country-and-folk/production/5240001";
const CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL = "https://vividseats.pxf.io/testcode";
const vividSeatsEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, vividseats_url: CONTROLLED_VIVIDSEATS_URL }
  : event));
function withVividSeatsEventsFixture(baseEnv) {
  return {
    ...baseEnv,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/data/events.json") return new Response(vividSeatsEventsJson, { status: 200 });
        return baseEnv.ASSETS.fetch(request);
      }
    }
  };
}

// 1. Dormancy: a stored vividseats_url alone (no Vivid Seats Impact config)
//    must not surface anything.
const vsDormantEnv = withVividSeatsEventsFixture(env);
const vsDormantShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: vsDormantEnv
});
const vsDormantShowsJson = await vsDormantShowsResponse.json();
assert(vsDormantShowsJson.providerAvailability?.vividseats === false, "/api/shows should report vividseats availability false without Vivid Seats Impact config");
assert(vsDormantShowsJson.shows.every((show) => show.provider_ctas?.vividseats === false), "/api/shows should mark every Vivid Seats CTA unresolvable without Vivid Seats Impact config");
const vsDormantPage = await routeResponse("/artists/morgan-wallen", vsDormantEnv);
assert(!vsDormantPage.text.includes("Vivid Seats sets prices"), "server-rendered Vivid Seats CTA copy should stay hidden without Vivid Seats Impact config");
assert(!vsDormantPage.text.includes("provider=vivid-seats"), "server-rendered pages should not link /api/out Vivid Seats redirects without Vivid Seats Impact config");
const vsDormantOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=vivid-seats`, "GET", null, vsDormantEnv);
assert(vsDormantOut.status === 400, "Vivid Seats showId redirect should fail safely without Impact config");

// 2. Configured (base tracking) + verified event URL: the CTA renders and the
//    redirect is Impact-wrapped through the configured pxf.io base URL.
const vsConfiguredEnv = withVividSeatsEventsFixture({
  ...env,
  IMPACT_VIVIDSEATS_BASE_TRACKING_URL: CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL
});
const vsConfiguredShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: vsConfiguredEnv
});
const vsConfiguredShowsJson = await vsConfiguredShowsResponse.json();
assert(vsConfiguredShowsJson.providerAvailability?.vividseats === true, "/api/shows should report vividseats availability true when the base tracking URL is configured");
const vsControlledShow = vsConfiguredShowsJson.shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(vsControlledShow?.provider_ctas?.vividseats === true, "/api/shows should mark the controlled Vivid Seats CTA resolvable when configured");
const vsConfiguredPage = await routeResponse("/artists/morgan-wallen", vsConfiguredEnv);
assert(vsConfiguredPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=vivid-seats`), "server-rendered Vivid Seats CTA should target the controlled show through /api/out when configured");
assert(vsConfiguredPage.text.includes("View tickets on Vivid Seats"), "Vivid Seats should be the primary CTA when SeatGeek is not configured");
assert(vsConfiguredPage.text.includes("Vivid Seats sets prices, fees, availability, and checkout terms. Confirm details on Vivid Seats before purchase."), "server-rendered Vivid Seats CTA should include conservative supporting copy");
try {
  globalThis.fetch = async () => {
    throw new Error("Vivid Seats base tracking redirects should not call the Impact API");
  };
  const vsBaseOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=vivid-seats`, "GET", null, vsConfiguredEnv);
  assert(vsBaseOut.status === 302, "Vivid Seats base tracking URL should produce a 302 redirect");
  const vsBaseLocation = new URL(vsBaseOut.headers.get("location"));
  assert(vsBaseOut.headers.get("location").startsWith(CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL), "Vivid Seats base tracking redirect should start with the configured pxf.io base URL");
  assert(vsBaseLocation.searchParams.get("u") === CONTROLLED_VIVIDSEATS_URL, "Vivid Seats base tracking redirect should deep-link to the exact stored Vivid Seats event URL");
} finally {
  globalThis.fetch = originalFetch;
}

// 3. Both affiliate providers configured: CTA order is SeatGeek (primary),
//    Vivid Seats, then the plain Ticketmaster link.
const vsAndSgEnv = withVividSeatsEventsFixture({
  ...env,
  IMPACT_SEATGEEK_BASE_TRACKING_URL: CONTROLLED_SEATGEEK_BASE_TRACKING_URL,
  IMPACT_VIVIDSEATS_BASE_TRACKING_URL: CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL
});
const vsAndSgPage = await routeResponse("/artists/morgan-wallen", vsAndSgEnv);
const vsAndSgGroup = vsAndSgPage.text
  .split("<div class=\"cta-group\">")
  .find((chunk) => chunk.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=vivid-seats`));
assert(vsAndSgGroup, "controlled show card should render a cta-group including the Vivid Seats CTA when both affiliate providers are configured");
const sgIdx = vsAndSgGroup.indexOf("View tickets on SeatGeek");
const vsIdx = vsAndSgGroup.indexOf("Check Vivid Seats");
const tmIdx = vsAndSgGroup.indexOf("Check Ticketmaster");
assert(sgIdx !== -1 && vsIdx !== -1 && tmIdx !== -1 && sgIdx < vsIdx && vsIdx < tmIdx, "CTA order must be SeatGeek, Vivid Seats, Ticketmaster");

// 4. Impact API failure must return diagnostic JSON, never a raw redirect.
const vsApiConfigEnv = withVividSeatsEventsFixture({
  ...env,
  IMPACT_VIVIDSEATS_ACCOUNT_SID: "vs-account",
  IMPACT_VIVIDSEATS_AUTH_TOKEN: "vs-token",
  IMPACT_VIVIDSEATS_CAMPAIGN_ID: "vs-campaign"
});
try {
  let vividSeatsImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    vividSeatsImpactCalled = true;
    assert(requestUrl.hostname === "api.impact.com", "Vivid Seats tracking should call Impact with the controlled event URL");
    assert(requestUrl.pathname.includes("/Mediapartners/vs-account/Programs/vs-campaign/TrackingLinks"), "Vivid Seats Impact request should use the configured Vivid Seats account and campaign");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_VIVIDSEATS_URL, "Vivid Seats Impact DeepLink should be the controlled Vivid Seats event URL");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("vs-account:vs-token").toString("base64")}`, "Vivid Seats Impact request should use Vivid Seats basic auth");
    return new Response(JSON.stringify({ Message: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" }
    });
  };
  const vsFailureOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=vivid-seats`, "GET", null, vsApiConfigEnv);
  assert(vividSeatsImpactCalled, "Vivid Seats configured path should call Impact tracking");
  assert(vsFailureOut.status === 400, "Vivid Seats Impact failure should fail safely, not redirect");
  const vsFailureJson = await vsFailureOut.json();
  assert(vsFailureJson.status === "impact_program_not_accessible", "Vivid Seats Impact 403 failure should report impact_program_not_accessible");
  assert(vsFailureJson.provider === "vivid-seats", "Vivid Seats Impact diagnostics should include provider");
  assert(vsFailureJson.destinationHost === "www.vividseats.com", "Vivid Seats Impact diagnostics should include only the safe destination host");
  assert(!JSON.stringify(vsFailureJson).includes("vs-token"), "Vivid Seats Impact diagnostics must not expose secrets");
} finally {
  globalThis.fetch = originalFetch;
}

// 5. A generic (non-production) Vivid Seats URL must never surface: CTA hidden
//    and /api/out rejects it.
const vsInvalidEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, vividseats_url: "https://www.vividseats.com/morgan-wallen-tickets" }
  : event));
const vsInvalidEnv = {
  ...env,
  IMPACT_VIVIDSEATS_BASE_TRACKING_URL: CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL,
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/data/events.json") return new Response(vsInvalidEventsJson, { status: 200 });
      return env.ASSETS.fetch(request);
    }
  }
};
const vsInvalidPage = await routeResponse("/artists/morgan-wallen", vsInvalidEnv);
assert(!vsInvalidPage.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=vivid-seats`), "server-rendered Vivid Seats CTA should be hidden for a Vivid Seats URL that /api/out would reject");
const vsInvalidOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=vivid-seats`, "GET", null, vsInvalidEnv);
assert(vsInvalidOut.status === 400, "generic Vivid Seats URL should not resolve through /api/out");
assert((await vsInvalidOut.json()).status === "event_ticket_url_unavailable", "generic Vivid Seats URL should fail with event_ticket_url_unavailable");

// app.js must gate Vivid Seats CTAs the same way as SeatGeek.
const vividSeatsGateFunction = appJs.match(/function vividSeatsOutAvailable\(show, options = \{\}\) \{[\s\S]*?\n\}/);
assert(vividSeatsGateFunction, "client-side Vivid Seats CTA gate should exist");
assert(vividSeatsGateFunction[0].includes('if (!providerEventPublishable(show, "vivid-seats")) return false;'), "Vivid Seats CTA gate should require per-provider event publishability");
assert(vividSeatsGateFunction[0].includes("return show.provider_ctas.vividseats === true && hasValidVividSeatsEventUrl;"), "Vivid Seats CTA gate should require both the provider flag and a valid stored Vivid Seats event URL");
assert(appJs.includes("safeVividSeatsEventUrl"), "hydrated artist show cards should validate Vivid Seats event URLs");
assert(appJs.includes("providerAvailability?.vividseats"), "hydration should use the safe Vivid Seats availability flag from /api/shows");
assert(!appJs.includes("https://vividseats.com") && !appJs.includes("https://www.vividseats.com"), "client-side app code must not hard-code direct Vivid Seats public CTA links");

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
assert(!serverMorganWithoutSeatGeek.text.includes("View tickets on SeatGeek"), "SeatGeek CTAs should remain hidden when SeatGeek affiliate config is absent even if an event URL exists");

console.log("SeatGeek visibility gating verified: event-level URL plus affiliate config required");

// Verified artist (Bruno Mars) must be indexable with artist-level CTA
const brunoMarsPage = await routeResponse("/artists/bruno-mars");
assert(brunoMarsPage.response.status === 200, "/artists/bruno-mars must return 200");
assert(/index,follow/.test(brunoMarsPage.text), "/artists/bruno-mars (indexable) must render index,follow robots meta");
assert(/\/api\/out\?artistSlug=bruno-mars/.test(brunoMarsPage.text), "/artists/bruno-mars must render artist-level /api/out CTA link");
assert(!brunoMarsPage.text.includes("still being reviewed"), "/artists/bruno-mars (indexable) must not show review-pending notice");

// Fully-verified artist (Morgan Wallen) must remain indexable and keep its event CTAs
assert(/index,follow/.test(serverMorganWithoutSeatGeek.text), "/artists/morgan-wallen (indexable) must remain index,follow");
assert(serverMorganWithoutSeatGeek.text.includes(">View tickets</a>"), "/artists/morgan-wallen (indexable) must still show event CTA buttons with the 'View tickets' label");
assert(/provider=ticketmaster"\s+target="_blank"\s+rel="noopener"/.test(serverMorganWithoutSeatGeek.text), "server-rendered verified event CTA should open in a new tab to match client behaviour");

console.log("indexable artist verification passed for bruno-mars");

// Indexable artist with zero verified upcoming events (Beyoncé) must render the improved empty state
const beyonceEmptyStatePage = await routeResponse("/artists/beyonce");
assert(beyonceEmptyStatePage.response.status === 200, "/artists/beyonce must return 200");
assert(/index,follow/.test(beyonceEmptyStatePage.text), "/artists/beyonce (indexable) must render index,follow robots meta");
const beyonceShowBoardMatch = beyonceEmptyStatePage.text.match(/<section class="section-grid show-board"[\s\S]*?<\/section>/);
assert(beyonceShowBoardMatch, "zero-event artist page must render the show board section");
const beyonceShowBoard = beyonceShowBoardMatch[0];
assert(beyonceShowBoard.includes("No verified Beyoncé ticket links yet"), "zero-event artist page must render the improved empty-state heading with the artist name");
assert(beyonceShowBoard.includes("we haven't verified an event-specific ticket destination"), "zero-event empty state must explain why no ticket links are shown");
assert(!beyonceShowBoard.includes("No verified show dates are currently listed"), "zero-event empty state must not use the old generic copy");
assert(!beyonceShowBoard.includes("View tickets") && !beyonceShowBoard.includes("/api/out"), "zero-event empty state must not include any ticket CTA");
assert(beyonceShowBoard.includes('href="/artists"') && beyonceShowBoard.includes("Browse artists with ticket links"), "zero-event empty state must link users to the artists index");
assert(beyonceShowBoard.includes('href="/guides"') && beyonceShowBoard.includes("Read ticket buying guide"), "zero-event empty state must link users to the buying guides");
console.log("zero-event empty-state verification passed for beyonce");

console.log("Cloudflare Pages MVP smoke checks passed");
