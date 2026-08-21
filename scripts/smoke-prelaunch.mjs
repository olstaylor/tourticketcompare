import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoutes = ["/", "/artists", "/cities", "/guides", "/guides/vivid-seats-vs-ticketmaster", "/blog", "/compare-concert-ticket-prices", "/how-it-works", "/currency-converter", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const functionBackedStaticRoutes = ["/artists", "/cities", "/guides", "/blog", "/compare-concert-ticket-prices", "/how-it-works", "/currency-converter", "/editorial-policy", "/affiliate-disclosure", "/about", "/contact"];
const functionBackedWildcardRoutes = ["/artists/*", "/cities/*", "/guides/*", "/blog/*"];
const expectedH1 = new Map([
  ["/", "Compare ticket prices for the show you want."],
  ["/artists", "Artists we track"],
  ["/cities", "Concerts by city"],
  ["/guides", "Ticket buying guides"],
  ["/guides/vivid-seats-vs-ticketmaster", "Vivid Seats vs Ticketmaster (2026): fees, safety and delivery"],
  ["/blog", "TourTicketCompare blog"],
  ["/compare-concert-ticket-prices", "Compare concert ticket prices across ticket sites"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/currency-converter", "Currency converter"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact us"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"]
]);
const expectedTitle = new Map([
  ["/", "Compare Concert Tickets & Tour Dates | TourTicketCompare"],
  ["/artists", "Artists | TourTicketCompare"],
  ["/cities", "Concerts by City | Upcoming Tour Dates | TourTicketCompare"],
  ["/guides", "Concert Ticket Buying Guides | TourTicketCompare"],
  ["/guides/vivid-seats-vs-ticketmaster", "Vivid Seats vs Ticketmaster: Fees, Safety & Delivery"],
  ["/blog", "Ticket Research Blog | TourTicketCompare"],
  ["/compare-concert-ticket-prices", "Compare Concert Ticket Prices Across Ticket Sites | TourTicketCompare"],
  ["/how-it-works", "How TourTicketCompare Works"],
  ["/currency-converter", "Currency Converter for Concert Tickets | TourTicketCompare"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact TourTicketCompare"],
  ["/editorial-policy", "Editorial Policy | TourTicketCompare"],
  ["/affiliate-disclosure", "Affiliate Disclosure | TourTicketCompare"]
]);
const homepageDescription = "Compare ticket prices for the show you want. Choose an artist and date, see current listed prices from ticket sites where available, then check the total.";
const APP_ASSET_VERSION = "20260820b";
const TTC_HOME_ASSET_VERSION = "20260820b";
const TTC_SHELL_ASSET_VERSION = "20260820b";
const EXPECTED_CSP = "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self'; script-src 'self' 'sha256-p0R1STvFKL0RAzEJmT9k4b8JKBKWzcJJtA+S5ktYPqc=' 'sha256-HvWK2bdlS3tIjA99SF0iSFMCH60ZHReAEE7XB6qwLXI=' https://*.googletagmanager.com https://utt.impactcdn.com; connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com https://utt.impactcdn.com; frame-src https://www.googletagmanager.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'";
const CONTROLLED_SEATGEEK_SHOW_ID = "tm-morgan-wallen-2026-gainesville-2200635d19f97a46";
const CONTROLLED_SEATGEEK_URL = "https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112";
const CONTROLLED_SEATGEEK_BASE_TRACKING_URL = "https://seatgeek.pxf.io/eK6adX";
const CONTROLLED_VIVIDSEATS_PRICE_URL = "https://www.vividseats.com/morgan-wallen-tickets/production/5432101";
const CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL = "https://vividseats.pxf.io/testcode";
// Monetized CTAs route through /api/out for server-side Impact tracking; the
// stored provider destination is resolved and Impact-wrapped by out.js, not
// rendered raw in the page. In server-rendered markup "&" is escaped to "&amp;".
const RENDERED_SG_EVENT_OUT_HREF = `/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`;
const RENDERED_VS_EVENT_OUT_HREF = `/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=vivid-seats`;
const EXPECTED_OUT_VERSION = "tm-plain-redirects-2026-07-02";
const SMOKE_TEST_NOW_ISO = "2026-05-14T12:00:00Z";
const SMOKE_TEST_NOW_MS = Date.parse(SMOKE_TEST_NOW_ISO);
assert(Number.isFinite(SMOKE_TEST_NOW_MS), "smoke test clock must be a valid ISO timestamp");
Date.now = () => SMOKE_TEST_NOW_MS;
const routeMarkers = new Map([
  ["/artists", "Choose an artist, then pick the date you want to compare ticket prices for."],
  ["/cities", "at least four upcoming reviewed shows across at least two artists"],
  ["/guides", "Compare the total at checkout for that exact ticket"],
  ["/guides/vivid-seats-vs-ticketmaster", "A like-for-like purchase checklist"],
  ["/blog", "what a price snapshot does and does not claim"],
  ["/compare-concert-ticket-prices", "We only compare prices captured for the same event, each with the time it was taken"],
  ["/how-it-works", "A button only goes up when we can confirm where it lands"],
  ["/currency-converter", "European Central Bank daily reference rates"],
  ["/editorial-policy", "the link has to pass our outbound safety checks"],
  ["/affiliate-disclosure", "Whether a link pays us has nothing to do with whether we show it"],
  ["/about", "it has no say in what we publish"],
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
  const destination = String(event?.ticketmaster_url || event?.source_url || "").trim();
  if (destination) return true;
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
      allowedContext: /\b(coming later|not yet|planned|not available|is not ready|being built|when approved|only when|not fake|approved|provider|snapshot)\b/i
    },
    {
      label: "ticket comparison claim",
      pattern: /\bticket\s+comparison\b/i,
      allowedContext: /\b(not|must not|should not|does not|unless|until|without pretending|comparison site|helps you review)\b/i
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

// SeatGeek is a CTA-only provider: its API returns null pricing statistics for
// this client (owner-confirmed 2026-07-15), so it has no numeric price-snapshot
// lane and public copy must not claim SeatGeek price snapshots. This guard is
// keyed off the snapshot workflow: if seatgeek-price-snapshots.yml ever regains
// a schedule trigger (the lane's reactivation switch), the guard stands down.
// The unified dynamic disclosure is exempt: it renders provider names and
// timestamps only from actual approved, fresh lane data.
async function assertNoStaticSeatGeekPriceClaims(files) {
  const snapshotWorkflow = await read(".github/workflows/seatgeek-price-snapshots.yml");
  const seatGeekSnapshotLaneScheduled = /^\s*schedule:\s*$/m.test(snapshotWorkflow);
  if (seatGeekSnapshotLaneScheduled) return;

  const rules = [
    {
      label: "hard-coded SeatGeek/Vivid Seats snapshot-pair claim",
      pattern: /\bSeatGeek\s+(?:and|&|\+)\s+Vivid\s+Seats\b[^.\n]{0,120}\bsnapshots?\b/i
    },
    {
      label: "SeatGeek-vs-Vivid price-comparison title claim",
      pattern: /\bSeatGeek\s+vs\.?\s+Vivid\s+Seats\b/i,
      allowedContext: /Ticketmaster\s+vs\.?\s+SeatGeek\s+vs\.?\s+Vivid\s+Seats/i
    },
    {
      label: "static SeatGeek price-snapshot claim",
      pattern: /\b(?:timestamped|approved|available|fresh)\s+SeatGeek\b[^.\n]{0,120}\bsnapshots?\b/i
    },
    {
      label: "plural SeatGeek price-snapshots claim",
      pattern: /\bSeatGeek\s+(?:listed-price|price)\s+snapshots\b/i
    }
  ];

  await assertLineRulesAbsent(files, rules, "static SeatGeek price-claim guard (SeatGeek has no numeric snapshot lane)");
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
  return match ? decodeHtmlEntities(match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()) : "";
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

function createProviderPricingDb(rows, historyRows = []) {
  const pricingRows = Array.isArray(rows) ? rows : [];
  const pricingHistoryRows = Array.isArray(historyRows) ? historyRows : [];
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
            async all() {
              if (text.includes("provider_pricing_cache")) {
                // Batched approved-marketplaces read: bound values are local
                // event ids; the provider filter is inlined in the SQL.
                const results = pricingRows.filter((row) =>
                  values.includes(row.event_id) &&
                  (row.provider === "seatgeek" || row.provider === "vivid-seats")
                );
                return { results };
              }
              if (text.includes("provider_pricing_history")) {
                const [eventId, provider, source, since] = values;
                const results = pricingHistoryRows
                  .filter((row) =>
                    row.event_id === eventId &&
                    row.provider === provider &&
                    row.source === source &&
                    String(row.observed_at || "") >= String(since || "")
                  )
                  .sort((a, b) => String(b.observed_at || "").localeCompare(String(a.observed_at || "")))
                  .slice(0, 2);
                return { results };
              }
              return { results: [] };
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
  "public/data/catalog.json",
  "public/data/guides-content.json",
  "public/data/blog-content.json",
  "public/ttc-home.js"
];
const publicCopyFiles = [
  "public/index.html",
  "public/app.js",
  "functions/[[path]].js",
  "functions/_artist-content.js",
  "functions/_artist-cities.js",
  "public/data/catalog.json",
  "public/ttc-home.js"
];
const guideCopyFiles = [
  "public/data/guides-content.json",
  "public/app.js",
  "functions/_route-metadata.js",
  // Guide titles, H1s and descriptions live here now (generated from
  // content/guides/*.md). Without this entry they would drop out of every copy
  // scan below the moment they stopped being literals in _route-metadata.js.
  "functions/_guide-routes.generated.js"
];
const publicCopyRegressionFiles = [
  "public/index.html",
  "public/app.js",
  "functions/[[path]].js",
  "functions/_artist-content.js",
  "functions/_artist-cities.js",
  "functions/_route-metadata.js",
  "functions/_guide-routes.generated.js",
  "public/data/guides-content.json",
  "public/data/catalog.json",
  "public/ttc-home.js"
];
const publicAffiliateUrlFiles = [
  ...new Set(
    publicUiFiles.concat([
      "public/data/guides-content.json",
      "functions/[[path]].js",
      "functions/_route-metadata.js",
      "functions/_guide-routes.generated.js"
    ])
  )
];

const joinedPublic = (await Promise.all(publicAffiliateUrlFiles.map((file) => read(file)))).join("\n");
assert(
  joinedPublic.includes("Compare ticket prices for the show you want."),
  "homepage public-facing copy should be present"
);
const clientApp = await read("public/app.js");
const clientIndexHtml = await read("public/index.html");
assert(
  !clientIndexHtml.includes('"@type": "SearchAction"') && !clientIndexHtml.includes("search_term_string"),
  "index.html must not advertise the retired sitelinks SearchAction or create a crawlable template-query URL"
);
const expectedClientMetadata = [
  "Compare Concert Tickets & Tour Dates | TourTicketCompare",
  homepageDescription,
  "Compare Concert Ticket Prices Across Ticket Sites | TourTicketCompare",
  "Compare concert ticket prices for the same checked show across ticket sites where provider listed-price snapshots are eligible, then confirm fees and the total with the provider.",
  "How to Compare Concert Ticket Prices | TourTicketCompare",
  "Vivid Seats vs Ticketmaster vs SeatGeek: Which Is Better? | TourTicketCompare",
  "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices | TourTicketCompare",
  "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices",
  "Compare SeatGeek vs Ticketmaster for fees, price differences, delivery and buyer protection—whether they are the same company, and which suits your concert."
];
for (const value of expectedClientMetadata) {
  assert(clientApp.includes(value), `public/app.js should preserve client metadata parity for "${value}"`);
}
assert(
  clientIndexHtml.includes("<title>Compare Concert Tickets &amp; Tour Dates | TourTicketCompare</title>"),
  "public/index.html fallback title should match the homepage metadata source of truth"
);
assert(
  clientIndexHtml.includes(`content="${homepageDescription}"`),
  "public/index.html fallback description should match the homepage metadata source of truth"
);
for (const staleTitle of [
  "Compare Concert Ticket Prices & Find Tour Dates | TourTicketCompare",
  "Find Tour Dates and Compare Ticket Prices | TourTicketCompare",
  "Compare Concert Ticket Prices Across Trusted Sites | Tour Ticket Compare",
  "How to Compare Concert Ticket Prices Safely | TourTicketCompare",
  "Why Ticket Prices Vary Between Sites | TourTicketCompare"
]) {
  assert(!clientApp.includes(staleTitle), `public/app.js should not restore stale title "${staleTitle}" after hydration`);
}
await assertPublicCopySafe(publicCopyFiles);
await assertPublicCopyRegressionGuardrails(publicCopyRegressionFiles);
await assertNoStaticSeatGeekPriceClaims([...publicCopyRegressionFiles, "functions/llms.txt.js"]);
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
const harryStylesArtist = catalog.artists.find((artist) => artist.slug === "harry-styles");
assert(harryStylesArtist?.seo_title === "Harry Styles Tickets & Tour Dates | TourTicketCompare", "Harry Styles metadata should target the observed tickets-and-tour-dates search intent");
assert(harryStylesArtist?.meta_description?.includes("available price snapshots"), "Harry Styles search copy should explain the page's distinctive comparison value");

const routesManifest = await readJson("public/_routes.json");
assert(routesManifest.version === 1, "_routes.json should use Cloudflare Pages routes schema version 1");
assert(
  JSON.stringify(routesManifest.include) === JSON.stringify(["/*"]),
  "_routes.json should invoke Functions for all public routes"
);
// The exclude list is deliberately tiny and pinned: anything listed here
// bypasses Functions entirely, so an accidental addition would silently strip
// routing, security headers, and metadata injection from that path. The
// content-editor bundle is deliberately NOT excluded — excluding it would let
// the apex serve it as a plain asset, around the middleware host check that
// keeps the editor off the public origin.
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

function envWithEventsJson(eventsJson, overrides = {}) {
  const customAssetMap = new Map(assetMap);
  customAssetMap.set("/data/events.json", eventsJson);
  return {
    ...env,
    ...overrides,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        const body = customAssetMap.get(url.pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function routeResponse(pathname, envOverride = env, origin = "https://tourticketcompare.com") {
  let nextCalled = false;
  const response = await middlewareModule.onRequest({
    request: new Request(`${origin}${pathname}`),
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
assert(
  sitemapLocations.includes("https://tourticketcompare.com/guides/seatgeek-vs-ticketmaster"),
  "/sitemap.xml should include the focused SeatGeek vs Ticketmaster guide"
);
// Artist-page indexability is editorial. Future-date state controls the
// primary/secondary presentation sections but does not remove durable artist
// URLs from the sitemap.
const { artistHasUpcomingShow } = await import(pathToFileURL(path.join(root, "functions/_artist-indexability.js")));
const editoriallyIndexableSlugs = artists
  .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
  .map((artist) => normalizeSlug(artist?.slug))
  .filter(Boolean);
for (const slug of editoriallyIndexableSlugs) {
  assert(
    sitemapLocations.includes(`https://tourticketcompare.com/artists/${slug}`),
    `/sitemap.xml should include editorially indexable artist ${slug}`
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
for (const slug of editoriallyIndexableSlugs) {
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
// The Google Tag Manager loader and Google tag bootstrap are the only bare
// inline scripts; each one's CSP sha256 hash must stay in sync with its body or browsers
// will refuse to run it.
{
  const { createHash } = await import("node:crypto");
  const inlineScripts = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert(inlineScripts.length === 2, "index.html should contain exactly two bare inline scripts (Google Tag Manager and the Google tag bootstrap)");
  assert(
    inlineScripts.some((body) => body.includes("'script','dataLayer','GTM-MZ42TPMM'")),
    "index.html should contain the Google Tag Manager container loader"
  );
  assert(
    inlineScripts.some((body) => body.includes("dataLayer.push({'event': 'ttc_google_tag_init'})")),
    "index.html should contain the GTM activation event"
  );
  for (const body of inlineScripts) {
    const inlineHash = createHash("sha256").update(body, "utf8").digest("base64");
    assert(
      EXPECTED_CSP.includes(`'sha256-${inlineHash}'`),
      `CSP sha256 hash must match every inline snippet in index.html — expected 'sha256-${inlineHash}' in EXPECTED_CSP (update functions/[[path]].js, public/_headers, and EXPECTED_CSP together)`
    );
  }
}
// The GTM no-JavaScript frame must load from the container host, and must be hidden by a
// stylesheet rule rather than the inline style attribute CSP style-src 'self' would block.
assert(
  indexHtml.includes('src="https://www.googletagmanager.com/ns.html?id=GTM-MZ42TPMM"'),
  "index.html must include the Google Tag Manager noscript frame"
);
assert(
  /<noscript><iframe class="gtm-noscript"/.test(indexHtml),
  "the GTM noscript frame must be hidden via the .gtm-noscript stylesheet rule"
);
assert(
  !/<noscript><iframe[^>]*\sstyle=/.test(indexHtml),
  "the GTM noscript frame must not use an inline style attribute (blocked by style-src 'self')"
);
assert(
  (await read("public/styles.css")).includes(".gtm-noscript"),
  "public/styles.css must define the .gtm-noscript hiding rule"
);
assert(
  EXPECTED_CSP.includes("frame-src https://www.googletagmanager.com"),
  "CSP must allow the Google Tag Manager noscript frame"
);
assert(!indexHtml.includes("impact.js"), "index.html must not reference the removed Ticketmaster Impact Publisher Tag (/impact.js)");
assert(indexHtml.includes('/impact-publisher-tag.js?v=20260714a'), "index.html must load the account Publisher Tag loader");
const publisherTagLoader = await read("public/impact-publisher-tag.js");
assert(publisherTagLoader.includes("https://utt.impactcdn.com/P-A3977745-d128-4905-97f4-b5b676ba4a171.js"), "Publisher Tag loader must use the account snippet from Impact Ad Tools");
assert(publisherTagLoader.includes('impactStat("trackImpression")'), "Publisher Tag loader must request impression tracking");

const routeRawEvidence = [];

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text, nextCalled } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);

  // CSP: must be present on function-rendered HTML responses, same-origin only, no unsafe-inline
  const csp = response.headers.get("Content-Security-Policy");
  assert(csp !== null, `${pathname} function response must include Content-Security-Policy`);
  assert(csp === EXPECTED_CSP, `${pathname} CSP should match expected value, got: ${csp}`);
  assert(!csp.includes("'unsafe-inline'"), `${pathname} CSP must not contain 'unsafe-inline'`);
  assert(csp.includes("https://utt.impactcdn.com"), `${pathname} CSP must allow the account Publisher Tag loader`);
  assert(text.includes('/impact-publisher-tag.js?v=20260714a'), `${pathname} must load the account Publisher Tag loader`);
  assert(
    response.headers.get("Cache-Control") === "no-cache, max-age=0, must-revalidate",
    `${pathname} must revalidate rendered HTML so new client asset versions reach returning visitors immediately`
  );

  // Google tag: every rendered page keeps the shell's GTM activation event and does
  // not also load gtag.js directly (which would duplicate the GTM-managed page view).
  assert(
    text.includes("dataLayer.push({'event': 'ttc_google_tag_init'})"),
    `${pathname} should include the Google tag GTM activation event from the shell <head>`
  );
  assert(
    !text.includes('src="https://www.googletagmanager.com/gtag/js?id=G-Q7R1NQY8YH"'),
    `${pathname} should not load gtag.js directly alongside the GTM-managed Google tag`
  );

  // Canonical URL: tag must be present and point to the exact route
  const actualCanonical = extractCanonical(text);
  assert(actualCanonical !== "", `${pathname} should include a canonical URL`);
  assert(
    actualCanonical === `https://tourticketcompare.com${pathname}`,
    `${pathname} canonical should be "https://tourticketcompare.com${pathname}", got "${actualCanonical}"`
  );
  assert(
    !text.includes('"@type":"SearchAction"') && !text.includes("search_term_string"),
    `${pathname} must not advertise the retired sitelinks SearchAction or create a crawlable template-query URL`
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
  const expected =
    expectedH1.get(pathname) ||
    (artist && !artistHasUpcomingShow(events, artist.slug) ? `${artist.name} tickets` : `${artist?.name} tickets and tour dates`);
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

// Guide Markdown accepts internal and HTTPS links. Verify a published guide
// renders an accepted internal link as HTML rather than leaking literal Markdown.
const guideLinkSmoke = await routeResponse("/guides/primary-vs-resale-concert-tickets");
assert(
  /<a class="text-link" href="\/artists">artist page<\/a>/.test(guideLinkSmoke.text),
  "guide internal links should render as HTML anchors"
);
assert(
  !guideLinkSmoke.text.includes("[artist page](/artists)"),
  "guide internal links must not leak literal Markdown"
);

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
  // ItemList is nested inside the Blog node's mainEntity, not a top-level
  // @graph member, so it is not asserted here (same shape as /cities).
  { pathname: "/blog", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "Blog"], noTypes: ["FAQPage", "Article", "BlogPosting"] },
  { pathname: "/compare-concert-ticket-prices", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "FAQPage"], noTypes: ["Article", "Event", "Product", "Offer", "AggregateRating"] },
  { pathname: "/how-it-works", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "FAQPage"], noTypes: ["Article"] },
  { pathname: "/artists/beyonce", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "FAQPage"], noTypes: ["Article", "Event", "Product", "Offer", "AggregateRating"] },
  { pathname: "/guides/how-to-compare-concert-ticket-prices", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "Article", "FAQPage"], noTypes: ["Event", "Product", "Offer", "AggregateRating"] },
  { pathname: "/guides/seatgeek-vs-ticketmaster", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "Article", "FAQPage"], noTypes: ["Event", "Product", "Offer", "AggregateRating"] },
  { pathname: "/blog/what-a-price-snapshot-actually-is", expectTypes: ["Organization", "WebSite", "BreadcrumbList", "BlogPosting"], noTypes: ["Article", "Event", "Product", "Offer", "AggregateRating"] }
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

const seoGuide = await routeResponse("/guides/how-to-compare-concert-ticket-prices");
assert(seoGuide.text.includes("TourTicketCompare editorial team"), "guide raw HTML should expose a visible editorial byline");
assert(seoGuide.text.includes("<h2>Sources</h2>"), "guide raw HTML should expose primary sources");
const seoGuideLd = extractJsonLd(seoGuide.text);
const seoGuideArticle = seoGuideLd?.["@graph"]?.find((node) => node?.["@type"] === "Article");
assert(
  seoGuideArticle?.dateModified === routeMetadataModule.GUIDE_ROUTES["/guides/how-to-compare-concert-ticket-prices"]?.lastmod,
  "guide Article schema should expose the current modification date"
);
assert(Array.isArray(seoGuideArticle?.citation) && seoGuideArticle.citation.length >= 4, "guide Article schema should cite its visible primary sources");
assert(seoGuideArticle?.author?.url === "https://tourticketcompare.com/about", "guide Article schema author should resolve to the About page");
const seoOrganization = seoGuideLd?.["@graph"]?.find((node) => node?.["@type"] === "Organization");
assert(seoOrganization?.["@id"] === "https://tourticketcompare.com/#organization", "Organization schema should expose a stable @id");

const pairwiseGuide = await routeResponse("/guides/seatgeek-vs-ticketmaster");
assert(pairwiseGuide.response.status === 200, "focused SeatGeek vs Ticketmaster guide should return 200");
assert(extractCanonical(pairwiseGuide.text) === "https://tourticketcompare.com/guides/seatgeek-vs-ticketmaster", "focused guide should expose its own canonical");
assert(
  extractTitle(pairwiseGuide.text) === "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices",
  "focused guide should expose exact pairwise decision title metadata"
);
assert(extractH1(pairwiseGuide.text) === "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices", "focused guide should expose the pairwise decision H1");
for (const expectedCopy of [
  "Short answer:",
  "SeatGeek vs Ticketmaster at a glance",
  "Is SeatGeek cheaper than Ticketmaster?",
  "Why does SeatGeek have tickets when Ticketmaster does not?",
  "Why is SeatGeek sometimes cheaper than Ticketmaster?",
  "Is SeatGeek legit like Ticketmaster?",
  "How does SeatGeek have tickets but not Ticketmaster?",
  "What is the most trusted concert ticket site?"
]) {
  assert(pairwiseGuide.text.includes(expectedCopy), `focused guide should cover AI-answer intent: ${expectedCopy}`);
}
assert(pairwiseGuide.text.includes("<h2>Sources</h2>"), "focused guide should expose visible primary sources");
const pairwiseLd = extractJsonLd(pairwiseGuide.text);
const pairwiseArticle = pairwiseLd?.["@graph"]?.find((node) => node?.["@type"] === "Article");
const pairwiseFaq = pairwiseLd?.["@graph"]?.find((node) => node?.["@type"] === "FAQPage");
assert(Array.isArray(pairwiseArticle?.citation) && pairwiseArticle.citation.length === 8, "focused guide Article schema should cite all eight visible primary sources");
assert(pairwiseArticle?.articleSection === "Compare prices and fees", "focused guide should join the comparison topic cluster");
assert(pairwiseArticle?.dateModified === routeMetadataModule.GUIDE_ROUTES["/guides/seatgeek-vs-ticketmaster"]?.lastmod, "focused guide Article schema should expose the SEO review date");
assert(Array.isArray(pairwiseFaq?.mainEntity) && pairwiseFaq.mainEntity.length === 8, "focused guide FAQ schema should mirror all eight visible answers");

const comparisonHub = await routeResponse("/compare-concert-ticket-prices");
assert(
  comparisonHub.text.includes('href="/guides/seatgeek-vs-ticketmaster"'),
  "comparison hub should link directly to the focused SeatGeek vs Ticketmaster guide"
);

const homepageSeo = await routeResponse("/");
const pairwiseHomepageLink = homepageSeo.text.indexOf('href="/guides/seatgeek-vs-ticketmaster"');
const threeWayHomepageLink = homepageSeo.text.indexOf('href="/guides/ticketmaster-vs-seatgeek-vs-vivid-seats"');
assert(pairwiseHomepageLink >= 0, "homepage should link to the focused SeatGeek vs Ticketmaster guide");
assert(
  pairwiseHomepageLink < threeWayHomepageLink,
  "homepage should prioritize the focused pairwise guide before the broader three-provider guide"
);

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
const renderedMorganSeatGeekCtas = (serverMorganWithSeatGeek.text.match(/provider-cta-name">SeatGeek</g) || []).length;
assert(renderedMorganSeatGeekCtas > 0 && renderedMorganSeatGeekCtas <= expectedMorganSeatGeekCtas, "server-rendered Morgan Wallen page should show SeatGeek CTAs only for rendered shows with event-level SeatGeek URLs when configured");
assert(serverMorganWithSeatGeek.text.includes(RENDERED_SG_EVENT_OUT_HREF), "server-rendered SeatGeek CTA should route the controlled show through /api/out");
assert(!serverMorganWithSeatGeek.text.includes(CONTROLLED_SEATGEEK_URL), "server-rendered SeatGeek CTA must not expose the raw affiliate URL; it routes through /api/out");
assert(serverMorganWithSeatGeek.text.includes("Some links earn us a commission — this never affects your price."), "server-rendered show board should include one concise provider-change disclosure");
assert(!serverMorganWithSeatGeek.text.includes("SeatGeek controls prices, fees, availability, and checkout terms for this link."), "server-rendered cards should not repeat provider caution copy per SeatGeek link");
// CTA order: SeatGeek (primary affiliate) renders first, before the plain
// (unmonetized) Ticketmaster link, inside the same provider-cta-group.
const controlledCardCtaGroup = serverMorganWithSeatGeek.text
  .split("<div class=\"provider-cta-group\">")
  .find((chunk) => chunk.includes(RENDERED_SG_EVENT_OUT_HREF));
assert(controlledCardCtaGroup, "controlled show card should render a provider-cta-group when both providers are available");
const sgIndexInGroup = controlledCardCtaGroup.indexOf("provider-cta-name\">SeatGeek<");
const tmIndexInGroup = controlledCardCtaGroup.indexOf("provider-cta-name\">Ticketmaster<");
assert(sgIndexInGroup !== -1 && tmIndexInGroup !== -1 && sgIndexInGroup < tmIndexInGroup, "SeatGeek CTA must render before the Ticketmaster CTA on paired cards");
const firstCtaInGroup = controlledCardCtaGroup.slice(controlledCardCtaGroup.indexOf("provider-cta-name\">"));
assert(firstCtaInGroup.startsWith("provider-cta-name\">SeatGeek<"), "SeatGeek CTA must be the first button on paired cards");
// The count line above the buttons must state what the card actually offers.
// "Compare" is only true of two or more sites; a one-provider card must never
// use comparison wording, because one site is not a comparison.
const controlledCardCountLines = serverMorganWithSeatGeek.text.match(/<p class="provider-cta-count muted">([^<]*)<\/p>/g) || [];
assert(controlledCardCountLines.length > 0, "server-rendered show cards with CTAs should carry a checked-ticket-site count line");
for (const line of controlledCardCountLines) {
  assert(
    /^<p class="provider-cta-count muted">(1 checked ticket site for this date|Compare [2-9]\d* checked ticket sites for this date)<\/p>$/.test(line),
    `show-card CTA count line should read as one site or a comparison of N: ${line}`
  );
}
const controlledCardChunk = serverMorganWithSeatGeek.text
  .split('<article class="info-card show-card')
  .find((chunk) => chunk.includes(RENDERED_SG_EVENT_OUT_HREF));
const controlledCardButtonCount = (controlledCardChunk.match(/provider-cta-name">/g) || []).length;
assert(
  controlledCardButtonCount >= 2 && controlledCardChunk.includes(`Compare ${controlledCardButtonCount} checked ticket sites for this date`),
  `a card rendering ${controlledCardButtonCount} provider buttons should say it compares exactly that many checked ticket sites`
);
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
assert(!invalidSeatGeekPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), "server-rendered SeatGeek CTA should be hidden for an event URL that /api/out would reject");
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
assert(!serverMorganWithoutSeatGeek.text.includes("provider-cta-name\">SeatGeek<"), "server-rendered SeatGeek CTA should stay hidden without SeatGeek Impact config");
assert(!serverMorganWithoutSeatGeek.text.includes("provider=seatgeek"), "server-rendered pages should not link /api/out SeatGeek redirects without SeatGeek Impact config");
const ttcHomeJs = await read("public/ttc-home.js");
assert(ttcHomeJs.includes('new URLSearchParams(window.location.search).get("q")'), "homepage enhancement should read the q query parameter");
assert(ttcHomeJs.includes('document.querySelector("#search-widget .search-results")'), "homepage enhancement should preserve and populate the server-rendered search-widget target");
assert(ttcHomeJs.includes('input[type=search]'), "homepage enhancement should bind the existing accessible search input");
assert(ttcHomeJs.includes('results.scrollIntoView({ behavior: "smooth", block: "start" })'), "homepage query submission should scroll to the preserved search-widget anchor");
assert(ttcHomeJs.includes('document.querySelectorAll("#ttc-main a[href]")'), "homepage search should build its index from compiled server-rendered links");
assert(ttcHomeJs.includes('fetch("/data/events-index.json"'), "homepage search should lazy-load the purpose-built lightweight event index");
assert(!ttcHomeJs.includes('fetch("/data/events.json"') && !ttcHomeJs.includes('fetch("/data/catalog.json"'), "homepage enhancement must not request the full event or catalogue payload");
assert(ttcHomeJs.includes("record.city") && ttcHomeJs.includes("record.venue"), "homepage event search should preserve city and venue matching");
assert(!ttcHomeJs.includes("main.replaceChildren") && !ttcHomeJs.includes('getElementById("ttc-main").innerHTML'), "homepage enhancement must not replace the server-rendered visual DOM");
assert(ttcHomeJs.includes("Compare ticket prices for the show you want."), "homepage should lead with the comparison intent");
assert(ttcHomeJs.includes("then check the final total with the provider."), "homepage should tell fans where the final total is confirmed");
assert(!ttcHomeJs.includes("human-checked") && !ttcHomeJs.includes("reviewed by a human"), "homepage should not claim every automated verification is performed by a human");
assert(!ttcHomeJs.includes("statsSection(DATA)"), "homepage should not render the stale statistics strip");
assert(!ttcHomeJs.includes("never show live prices"), "homepage should not make an absolute no-price claim that contradicts approved snapshot support");
assert(!ttcHomeJs.includes("No live prices, ever"), "homepage trust copy should not contradict approved snapshot support");

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
assert(appJs.includes('name: "SeatGeek"'), "hydration should preserve the SeatGeek CTA for the controlled event when configured");
assert(appJs.includes("Some links earn us a commission — this never affects your price."), "hydration should preserve the concise show-board provider disclosure");
assert(!appJs.includes("Event last checked:"), "hydration should rely on the consolidated verification panel instead of repeating check dates on every show card");
assert(!appJs.includes("SeatGeek controls prices, fees, availability, and checkout terms for this link."), "hydration should not repeat provider caution copy on every SeatGeek card");
assert(!appJs.includes("Vivid Seats controls prices, fees, availability, and checkout terms for this link."), "hydration should not repeat provider caution copy on every Vivid Seats card");
assert(appJs.includes("Listed-price snapshots, not live availability."), "hydration should include the unified listed-price snapshot disclosure");
assert(appJs.includes("No listed-price snapshot is available for this date. Check current prices using the provider buttons above."), "hydration should state the price-unavailable case");
assert(appJs.includes("renderShowCardPriceNotes(ctaSpecs, pricesWereChecked(show))"), "hydration must only claim a snapshot is unavailable for a card whose lanes were actually queried");
assert(appJs.includes("Array.isArray(show?.prices) && show.prices.length > 0"), "the hydrated priced-lane check must treat an empty lane array as unchecked, not as a confirmed absence");
assert(appJs.includes("show?.provider_links?.seatgeek?.verified !== true"), "hydrated SeatGeek price snapshots should require explicit provider verification");
assert(appJs.includes("source !== \"seatgeek_partner_api\""), "hydrated SeatGeek price snapshot should require the approved source attribution");
assert(appJs.includes("expiresAtMs <= Date.now()"), "hydrated SeatGeek price snapshot should hide expired data");
assert(appJs.includes("function approvedVividSeatsPriceLane(show)"), "hydration should include an approved Vivid Seats price lane helper");
assert(appJs.includes("safeVividSeatsEventUrl(show?.vividseats_url)"), "hydrated Vivid Seats price snapshots should require a valid stored Vivid Seats event URL");
assert(appJs.includes('item?.provider === "Vivid Seats"'), "hydrated Vivid Seats price snapshots should require the provider-attributed Vivid Seats lane");
assert(appJs.includes("source !== \"vividseats_impact_marketplace_api\""), "hydrated Vivid Seats price snapshots should require the approved source attribution");
assert(appJs.includes("isValidIsoDateTime(lane.fetchedAt) || !isValidIsoDateTime(lane.expiresAt)"), "hydrated Vivid Seats price snapshots should require ISO timestamps before checking freshness");
assert(appJs.includes("lane: approvedVividSeatsPriceLane(show)"), "hydration should attach Vivid Seats snapshots only through the approved lane helper");
assert(appJs.includes("snapshotTimes"), "hydration should include provider capture times in the unified snapshot disclosure");
assert(appJs.includes('show?.provider_links?.["vivid-seats"]?.verified !== true'), "hydrated Vivid Seats price snapshots should require explicit provider verification");
assert(!appJs.includes("More providers — no current price snapshot"), "hydration should keep priced and unpriced providers in one list");
assert(appJs.includes('priceProviders: "approved-marketplaces"'), "comparison hydration should request only approved marketplace price lanes");
assert(appJs.includes("function hydrateComparisonHubPriceSnapshots()"), "comparison hub should hydrate its exact-event price cards");
assert(appJs.includes("function hydrateShowBoardPriceSnapshots(shows, cardOptions)"), "artist show boards should hydrate approved provider prices across the site");
assert(!appJs.includes("Checked ticket links are temporarily unavailable"), "show boards must not replace verified ticket access with a generic API-failure message");
assert(appJs.includes("const fallbackShows = sortEventsForSearch(await loadEventsForSearch())"), "show boards must render public event-feed fallback cards when /api/shows is unavailable");
assert(!(await read("functions/[[path]].js")).includes("futureShowsForArtist(events, artist.slug, 6)"), "artist pages must not cap server-rendered upcoming shows at six");
assert(appJs.includes("fetchShowBoardData(params, Boolean(filters.artistSlug))"), "artist boards must page through every available API result");
assert(!appJs.includes("directEventTicketUrl"), "hydrated event CTAs must use the defined eventTicketHref helper");
assert(appJs.includes("schedulePriceHydration(visible);"), "artist filters should debounce approved provider price hydration");
assert(appJs.includes("function hasApprovedMarketplacePrice(show)"), "current-card hydration should use the approved marketplace lane gate");
assert(appJs.includes("!hasApprovedMarketplacePrice(pricedShow)"), "current-card hydration should accept any approved marketplace snapshot lane");
assert(appJs.includes("showId: String(show.id)") && appJs.includes('priceProviders: "approved-marketplaces"'), "price hydration should request only approved marketplace lanes for exact show IDs");
const boardPriceFetch = appJs.match(/function fetchApprovedBoardPrices\(artistSlug, limit\) \{[\s\S]*?\n\}/);
assert(boardPriceFetch, "board price hydration should fetch one memoized bulk payload per board instead of per-card fan-out");
assert(boardPriceFetch[0].includes('priceProviders: "approved-marketplaces"'), "bulk board price requests must ask for the approved cached marketplace lanes only");
const boardPriceHydration = appJs.match(/async function hydrateShowBoardPriceSnapshots\(shows, cardOptions\) \{[\s\S]*?\n\}/);
assert(boardPriceHydration && !boardPriceHydration[0].includes(".slice(0, 6)"), "board price hydration must not cap approved snapshots to the first six cards");
assert(!appJs.match(/lowest\s+overall\s+price|cheapest/i), "hydration must not label SeatGeek snapshots as lowest overall or cheapest");
assert(appJs.includes("No checked ticket link is available for this date yet."), "event cards should have a safe unavailable state that says no link has been checked yet");
assert(!appJs.includes("renderProviderButtons(artist, \"artist_hero\")"), "artist pages should not render a separate generic provider panel");
assert(appJs.includes('text(relatedGuides, "h2", "Related guides")'), "artist hydration should preserve the server-rendered related-guide cluster");
assert(appJs.includes('link("Compare concert ticket prices", "/compare-concert-ticket-prices", "mini-link")'), "artist hydration should preserve a descriptive internal link to the comparison hub");
assert(appJs.includes('link("Affiliate disclosure", "/affiliate-disclosure", "mini-link")'), "artist hydration should preserve the server-rendered trust link set");

// --- Artist SEO content architecture (functions/_artist-content.js) ---------
// Artist-page editorial copy (the data-grounded lead + fact strip, the one
// shared price/link help component, the provenance block, and the FAQ) is
// derived once on the server from the annotated board and transplanted on
// hydration. Reimplementing that copy client-side is what let the two versions
// drift, so the hydration path must transplant every block, not rebuild it.
const artistPathSource = await read("functions/[[path]].js");
for (const hook of ["[data-artist-lead]", "[data-artist-ticket-help]", "[data-artist-trust]", "[data-artist-faq]", "[data-artist-extra-content]"]) {
  assert(appJs.includes(`transplantServerNode("${hook}")`) || appJs.includes(`main.querySelector("${hook}")`),
    `artist hydration must transplant the server-rendered ${hook} block`);
}
assert(!appJs.includes("function artistPageIntro("), "the artist lead must be derived server-side only, not duplicated in client copy");
assert(!appJs.includes("function buildVerificationDisclosurePanel("), "the artist provenance block must be derived server-side only");
assert(!appJs.match(/text\(checklist, "h2", "Before you buy"\)/), "the artist 'Before you buy' checklist should be consolidated into the shared help component");
assert(
  (await read("functions/_artist-content.js")).includes("export function artistTicketHelp("),
  "artist content module should expose the one shared ticket/price help component"
);
assert(
  artistPathSource.includes("artistBoardModel(route, events, env)"),
  "server artist page should build its board + content model once per request"
);
for (const [label, page] of [["with SeatGeek", serverMorganWithSeatGeek.text], ["without SeatGeek", serverMorganWithoutSeatGeek.text]]) {
  assert(page.includes("data-artist-extra-content"), `server-rendered artist page (${label}) should include the derived SEO content container`);
  assert(page.includes("data-artist-lead"), `server-rendered artist page (${label}) should include the derived lead block`);
  assert(page.includes("data-artist-facts"), `server-rendered artist page (${label}) should include the board fact strip`);
  assert(page.includes("How prices and links work here"), `server-rendered artist page (${label}) should include the shared price/link help component`);
  assert(page.includes("tours and dates"), `server-rendered artist page (${label}) should include data-derived tour summaries`);
  // The three overlapping generic blocks this replaced must not come back.
  assert(!page.includes("How to buy Morgan Wallen tickets"), `server-rendered artist page (${label}) should not restate a per-artist buying guide`);
  assert(!page.includes("How ticket prices are shown here"), `server-rendered artist page (${label}) should not carry a second pricing explanation`);
  assert(!page.includes("<h2>Before you buy</h2>"), `server-rendered artist page (${label}) should not carry a third generic checklist`);
  // Interchangeable copy: the lead must count this page's own data.
  const lead = page.match(/<p class="lead">([^<]*)<\/p>/);
  assert(lead, `server-rendered artist page (${label}) should render a lead paragraph`);
  assert(/\d/.test(lead[1]), `artist page lead (${label}) should be data-grounded, not interchangeable prose`);
}

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
// The artist provenance block is server-rendered once and transplanted on
// hydration, so the substance is asserted against the server source only: what
// is verified, what is not, and that some links pay a commission.
const absoluteNoPriceCopy = "We do not display ticket prices or guarantee availability";
assert(
  pathSource.includes("<strong>What we verify:</strong>") && pathSource.includes("<strong>What we don't verify:</strong>"),
  "server-rendered trust copy should state both what is and is not verified"
);
assert(
  pathSource.includes("Some outbound links earn us a commission, which never changes what you pay"),
  "server-rendered trust copy should keep the affiliate-commission disclosure"
);
assert(
  pathSource.includes("prices, fees, seat locations, delivery, availability"),
  "server-rendered trust copy should keep the provider-control disclosure"
);
assert(!pathSource.includes(absoluteNoPriceCopy), "server-rendered trust copy must not say prices are never displayed when approved snapshot flags may be enabled");
assert(!appJs.includes(absoluteNoPriceCopy), "hydrated trust copy must not say prices are never displayed when approved snapshot flags may be enabled");
assert(pathSource.includes('providerEventPublishable(ev, "vivid-seats") && safeVividSeatsTicketUrl(ev.vividseats_url)'), "comparison-hub show counts should include independently verified Vivid Seats links");
assert(pathSource.includes('providerEventPublishable(ev, "seatgeek") && safeSeatGeekTicketUrl(ev.seatgeek_url)'), "comparison-hub show counts should include independently verified SeatGeek links");
assert(appJs.includes('vividSeatsAvailable = providerEventPublishable(event, "vivid-seats")'), "artist status cards should recognize independently verified Vivid Seats event links");
assert(appJs.includes('seatGeekAvailable = providerEventPublishable(event, "seatgeek")'), "artist status cards should recognize independently verified SeatGeek event links");
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
assert(strayFlaggedPage.text.includes(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "verified Ticketmaster CTA must survive stray transient suppression flags");
assert(strayFlaggedPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), "SeatGeek CTA must never be hidden by stray transient suppression flags");

// 2b. Behavioural guard: needs_recheck is retained as provenance metadata but
//     no longer suppresses a checked stored Ticketmaster destination. Provider
//     URL and provenance gates still apply independently.
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
assert(recheckStatusPage.text.includes(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "explicit verification_status=needs_recheck must not suppress the checked Ticketmaster CTA");
assert(recheckStatusPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), "explicit verification_status=needs_recheck must not suppress a checked SeatGeek destination");
// The needs_recheck event resolves through /api/out for Ticketmaster when its
// stored destinations pass strict redirect checks.
const recheckTmOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=ticketmaster`, "GET", null, recheckStatusEnv);
assert(recheckTmOut.status === 302, "needs_recheck event with a checked Ticketmaster destination must resolve");
const recheckSgOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`, "GET", null, recheckStatusEnv);
assert(recheckSgOut.status === 302, "needs_recheck event with a checked SeatGeek destination must resolve");

// 2b-ii. Standalone SeatGeek: a needs_recheck event whose SeatGeek link carries
//        its own verified provenance (provider_links.seatgeek.verified) renders
//        both provider CTAs — and /api/out resolves both destinations.
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
assert(recheckSgVerifiedPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), "needs_recheck event with verified SeatGeek provenance must render the standalone SeatGeek CTA");
assert(recheckSgVerifiedPage.text.includes(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "needs_recheck event with verified SeatGeek provenance must keep the Ticketmaster CTA");
const standaloneSgOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=seatgeek`, "GET", null, recheckSgVerifiedEnv);
assert(standaloneSgOut.status === 302, "needs_recheck event with verified SeatGeek provenance must resolve the SeatGeek redirect");
assert(new URL(standaloneSgOut.headers.get("location")).searchParams.get("u") === CONTROLLED_SEATGEEK_URL, "standalone SeatGeek redirect must deep-link to the stored SeatGeek event URL");
const standaloneTmOut = await out(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&provider=ticketmaster`, "GET", null, recheckSgVerifiedEnv);
assert(standaloneTmOut.status === 302, "needs_recheck event must resolve its checked Ticketmaster redirect even when the SeatGeek link is independently verified");

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
assert(machineStatusPage.text.includes(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "verification_status=machine_high_confidence must keep the event Ticketmaster CTA rendering without the human-verified provider flag");

// 2d. Venue-local date rendering. datetime_iso carries two shapes and they are
//     not interchangeable: a naive wall-time string already spells out the
//     venue's date, while a Z-suffixed instant does not. Rendering an instant in
//     UTC shows the following calendar day for any evening show west of
//     Greenwich. Regression 2026-07-30: /artists/jay-z advertised
//     "Sat 24 Oct 2026" for a SoFi Stadium show that happens Fri 23 Oct, and 164
//     of 423 live events were a day late.
const dateRenderCases = [
  { iso: "2026-10-24T03:00:00Z", timezone: "America/Los_Angeles", day: "23", monthYear: "Oct 2026", weekday: "Fri", label: "US evening instant resolves to the venue's day" },
  // Wall time WITH an explicit offset: the venue's clock is written literally in
  // the text, so it renders as written while Date.parse still yields the exact
  // instant. This is the shape the 47 timezone-less rows were migrated to — a
  // naive string would have been reverted by the nightly sync, and a bare Z
  // instant cannot recover the venue's day without a timezone.
  { iso: "2026-11-19T19:00:00-05:00", timezone: "", day: "19", monthYear: "Nov 2026", weekday: "Thu", label: "offset-bearing wall time renders as written, with no timezone field" },
  { iso: "2026-11-19T19:00:00-05:00", timezone: "America/New_York", day: "19", monthYear: "Nov 2026", weekday: "Thu", label: "offset-bearing wall time agrees with its own timezone field" },
  { iso: "2026-09-05T16:00:00Z", timezone: "Europe/London", day: "5", monthYear: "Sep 2026", weekday: "Sat", label: "UK instant is unchanged (BST is UTC+1)" },
  { iso: "2026-05-15T17:30:00", timezone: "America/New_York", day: "15", monthYear: "May 2026", weekday: "Fri", label: "naive wall time is never re-interpreted against a zone" },
  { iso: "2026-10-24T03:00:00Z", timezone: "", day: "24", monthYear: "Oct 2026", weekday: "Sat", label: "instant with no timezone falls back to UTC rather than guessing" },
  { iso: "2026-10-24T03:00:00Z", timezone: "Not/AZone", day: "24", monthYear: "Oct 2026", weekday: "Sat", label: "unparseable timezone falls back to UTC instead of throwing" }
];
for (const testCase of dateRenderCases) {
  const datedEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
    ? { ...event, datetime_iso: testCase.iso, timezone: testCase.timezone }
    : event));
  const datedEnv = {
    ...seatGeekBaseTrackingEnv,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/data/events.json") return new Response(datedEventsJson, { status: 200 });
        return seatGeekBaseTrackingEnv.ASSETS.fetch(request);
      }
    }
  };
  const datedPage = await routeResponse("/artists/morgan-wallen", datedEnv);
  const badge = `<span class="show-date-weekday">${testCase.weekday}</span><span class="show-date-day">${testCase.day}</span><span class="show-date-monthyear">${testCase.monthYear}</span>`;
  assert(datedPage.text.includes(badge), `${testCase.label} (expected badge ${testCase.weekday} ${testCase.day} ${testCase.monthYear} for ${testCase.iso} / ${testCase.timezone || "no timezone"})`);
}

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
assert(
  appScriptRef[0].includes(`/app.js?v=${APP_ASSET_VERSION}`),
  "index.html must bump the app.js version whenever client metadata or hydration behavior changes"
);
assert(
  shellHtml.includes(`/ttc-shell.css?v=${TTC_SHELL_ASSET_VERSION}`),
  "index.html must version the shared shell stylesheet"
);
const cacheBustedHome = await routeResponse("/");
assert(
  cacheBustedHome.text.includes(`/ttc-home.css?v=${TTC_HOME_ASSET_VERSION}`),
  "server-rendered homepage must version its route-specific stylesheet"
);
assert(
  cacheBustedHome.text.includes(`/ttc-home.js?v=${TTC_HOME_ASSET_VERSION}`),
  "server-rendered homepage must version ttc-home.js so stale cached hydration cannot replace current search content"
);
assert(cacheBustedHome.text.includes(`/shell.js?v=${TTC_SHELL_ASSET_VERSION}`), "server-rendered routes must load the shared shell script");
assert(!cacheBustedHome.text.includes(`/app.js?v=${APP_ASSET_VERSION}`), "the routed homepage must not load the universal app bundle");
const lightweightGuide = await routeResponse("/guides/seatgeek-vs-ticketmaster");
assert(lightweightGuide.text.includes(`/shell.js?v=${TTC_SHELL_ASSET_VERSION}`), "guide routes must load the shared shell");
assert(!lightweightGuide.text.includes("/app.js?v="), "guide routes must not load the universal app bundle");
assert(!lightweightGuide.text.includes("/ttc-home.css?v="), "guide routes must not download homepage presentation CSS");
assert(serverMorganWithSeatGeek.text.includes("/artist-board.js?v=20260820b"), "artist routes must load only the artist-board route module");
assert(!serverMorganWithSeatGeek.text.includes("/app.js?v="), "artist routes must not load the universal app bundle");
const converterAssets = await routeResponse("/currency-converter");
assert(converterAssets.text.includes("/currency-converter.js?v=20260820b"), "currency converter must load its route module");
assert(!converterAssets.text.includes("/app.js?v="), "currency converter must not load the universal app bundle");

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

const seatGeekPriceEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      provider_links: {
        ...(event.provider_links || {}),
        seatgeek: { ...(event.provider_links?.seatgeek || {}), url: event.seatgeek_url, verified: true }
      }
    }
  : event));
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
const freshSeatGeekHistoryRows = [
  {
    event_id: CONTROLLED_SEATGEEK_SHOW_ID,
    provider: "seatgeek",
    low_price: 123.45,
    currency: "USD",
    inventory_count: 42,
    observed_at: "2026-05-14T11:00:00Z",
    source: "seatgeek_partner_api"
  },
  {
    event_id: CONTROLLED_SEATGEEK_SHOW_ID,
    provider: "seatgeek",
    low_price: 150,
    currency: "USD",
    inventory_count: 45,
    observed_at: "2026-05-13T11:00:00Z",
    source: "seatgeek_partner_api"
  },
  {
    event_id: CONTROLLED_SEATGEEK_SHOW_ID,
    provider: "vivid-seats",
    low_price: 25,
    currency: "USD",
    inventory_count: 99,
    observed_at: "2026-05-14T11:30:00Z",
    source: "vividseats_partner_api"
  }
];
const flagOffFreshSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(seatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "false",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "false"
  })
});
const flagOffFreshSeatGeekJson = await flagOffFreshSeatGeekResponse.json();
const flagOffSeatGeekLane = seatGeekLaneFrom(flagOffFreshSeatGeekJson);
assert(flagOffSeatGeekLane?.price === null && flagOffSeatGeekLane?.providerStatus === "unavailable", "SeatGeek price should stay hidden when SEATGEEK_PRICE_DISPLAY_ENABLED is false even if a fresh D1 row exists");
assert(!JSON.stringify(flagOffFreshSeatGeekJson).includes("seatgeek_partner_api"), "SeatGeek source attribution should not appear when the display flag is disabled");

globalThis.caches.default = new MemoryCache();
const flagOnFreshSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(seatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow], freshSeatGeekHistoryRows),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  })
});
const flagOnFreshSeatGeekJson = await flagOnFreshSeatGeekResponse.json();
const flagOnFreshSeatGeekLane = seatGeekLaneFrom(flagOnFreshSeatGeekJson);
assert(flagOnFreshSeatGeekLane?.price === freshSeatGeekPriceRow.low_price, "SeatGeek price should be returned from a fresh approved D1 latest snapshot when the feature flag is enabled");
assert(flagOnFreshSeatGeekLane?.providerStatus === "ok" && flagOnFreshSeatGeekLane?.status === "ok", "fresh SeatGeek snapshot should return an ok provider lane");
assert(flagOnFreshSeatGeekLane?.fetchedAt === freshSeatGeekPriceRow.verified_at, "SeatGeek price lane should use verified_at as its as-of timestamp");
assert(flagOnFreshSeatGeekLane?.source === "seatgeek_partner_api", "SeatGeek price lane should expose only the approved source attribution");
assert(flagOnFreshSeatGeekLane?.expiresAt === freshSeatGeekPriceRow.expires_at, "SeatGeek price lane should expose the snapshot expiry for freshness checks");
assert(flagOnFreshSeatGeekLane?.note.includes("SeatGeek price snapshot"), "SeatGeek timestamp/source copy should appear only after a fresh approved D1 row passes the enabled API gate");
globalThis.caches.default = new MemoryCache();
const seatGeekHistoryRoute = await routeResponse("/artists/morgan-wallen", envWithEventsJson(seatGeekPriceEventsJson, {
  DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow], freshSeatGeekHistoryRows),
  SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
  IMPACT_SEATGEEK_BASE_TRACKING_URL: CONTROLLED_SEATGEEK_BASE_TRACKING_URL
}));
assert(seatGeekHistoryRoute.text.includes(`data-price-history="${CONTROLLED_SEATGEEK_SHOW_ID}"`), "an approved SeatGeek snapshot should retain the on-site history tracker even though its CTA stays price-free");

const flagOnStaleSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(seatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([staleSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  })
});
const flagOnStaleSeatGeekLane = seatGeekLaneFrom(await flagOnStaleSeatGeekResponse.json());
assert(flagOnStaleSeatGeekLane?.price === null && flagOnStaleSeatGeekLane?.providerStatus === "unavailable", "stale SeatGeek D1 snapshots should be hidden and should not fall back to stale data");

// Sanity floor. A fresh, approved, correctly-sourced row is still withheld
// when its low_price is too low to be a real ticket listing. 3.80 is the value
// that reached production on the JAY-Z Tottenham Hotspur Stadium event via the
// StubHub International lane, displayed beside a $211.82 Vivid Seats badge.
for (const implausible of [3.8, 0]) {
  const implausibleResponse = await showsModule.onRequestGet({
    request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
    env: envWithEventsJson(seatGeekPriceEventsJson, {
      DEMAND_DB: createProviderPricingDb([{ ...freshSeatGeekPriceRow, low_price: implausible }]),
      SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
    })
  });
  const implausibleJson = await implausibleResponse.json();
  const implausibleLane = seatGeekLaneFrom(implausibleJson);
  assert(implausibleLane?.price === null && implausibleLane?.providerStatus === "unavailable", `an implausible listed price (${implausible}) must be withheld even from a fresh approved snapshot`);
  // Only assert non-leakage for the distinctive value; "0" is a substring of
  // timestamps, ids and counts throughout the payload.
  //
  // ISO timestamps carry a millisecond fraction, so a payload generated at a
  // second ending in 3 with milliseconds starting with 8 ("...:33.854Z")
  // contains the literal "3.8" with no price involved. That made this a real
  // (roughly 1-in-100 per timestamp) flake, observed failing CI on run
  // 30816574427 at 13:09:33.854. Strip timestamps first so the check tests
  // price leakage, which is what it is for.
  if (implausible === 3.8) {
    const payloadWithoutTimestamps = JSON.stringify(implausibleJson).replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/g, "");
    assert(!payloadWithoutTimestamps.includes("3.8"), "a withheld implausible price must not leak into the response payload");
  }
  globalThis.caches.default = new MemoryCache();
}
// The floor is a floor, not a band: the boundary value still publishes.
const atFloorResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(seatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([{ ...freshSeatGeekPriceRow, low_price: showsModule.MIN_PLAUSIBLE_LISTED_PRICE }]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  })
});
const atFloorLane = seatGeekLaneFrom(await atFloorResponse.json());
assert(atFloorLane?.price === showsModule.MIN_PLAUSIBLE_LISTED_PRICE && atFloorLane?.providerStatus === "ok", "a price exactly at the sanity floor should still publish");
globalThis.caches.default = new MemoryCache();

const missingSourceSeatGeekResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(seatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([{ ...freshSeatGeekPriceRow, source: null }]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  })
});
const missingSourceSeatGeekLane = seatGeekLaneFrom(await missingSourceSeatGeekResponse.json());
assert(missingSourceSeatGeekLane?.price === null && missingSourceSeatGeekLane?.providerStatus === "unavailable", "SeatGeek price should stay hidden when source attribution is missing or not the approved source");

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

const unverifiedSeatGeekPriceEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      provider_links: {
        ...(event.provider_links || {}),
        seatgeek: { ...(event.provider_links?.seatgeek || {}), verified: false }
      }
    }
  : event));
const unverifiedSeatGeekPriceResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(unverifiedSeatGeekPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true"
  })
});
const unverifiedSeatGeekPriceLane = seatGeekLaneFrom(await unverifiedSeatGeekPriceResponse.json());
assert(unverifiedSeatGeekPriceLane?.price === null && unverifiedSeatGeekPriceLane?.providerStatus === "unavailable", "SeatGeek cache rows must stay hidden after exact provider verification is revoked");

function vividSeatsLaneFrom(showPricesJson) {
  return showPricesJson.shows[0].prices.find((lane) => lane.provider === "Vivid Seats");
}

const vividSeatsPriceEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      vividseats_url: CONTROLLED_VIVIDSEATS_PRICE_URL,
      provider_links: {
        ...(event.provider_links || {}),
        "vivid-seats": { verified: true }
      }
    }
  : event));
const approvedPriceEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      vividseats_url: CONTROLLED_VIVIDSEATS_PRICE_URL,
      provider_links: {
        ...(event.provider_links || {}),
        seatgeek: { ...(event.provider_links?.seatgeek || {}), url: event.seatgeek_url, verified: true },
        "vivid-seats": { verified: true }
      }
    }
  : event));
const freshVividSeatsPriceRow = {
  event_id: CONTROLLED_SEATGEEK_SHOW_ID,
  provider: "vivid-seats",
  low_price: 98.75,
  avg_price: 135,
  high_price: 220,
  currency: "USD",
  inventory_count: 17,
  verified_at: "2026-05-14T11:05:00Z",
  expires_at: "2026-05-14T13:05:00Z",
  source: "vividseats_impact_marketplace_api"
};
const flagOffFreshVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(approvedPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshVividSeatsPriceRow]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "false"
  })
});
const flagOffVividSeatsLane = vividSeatsLaneFrom(await flagOffFreshVividSeatsResponse.json());
assert(flagOffVividSeatsLane?.price === null && flagOffVividSeatsLane?.providerStatus === "unavailable", "Vivid Seats price should stay hidden when VIVIDSEATS_PRICE_DISPLAY_ENABLED is false even if a fresh approved D1 row exists");

const flagOnFreshVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(vividSeatsPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshVividSeatsPriceRow]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const flagOnVividSeatsLane = vividSeatsLaneFrom(await flagOnFreshVividSeatsResponse.json());
assert(flagOnVividSeatsLane?.price === freshVividSeatsPriceRow.low_price, "Vivid Seats price should be returned from a fresh approved D1 latest snapshot when the feature flag is enabled");
assert(flagOnVividSeatsLane?.providerStatus === "ok" && flagOnVividSeatsLane?.source === "vividseats_impact_marketplace_api", "fresh Vivid Seats snapshot should expose only the approved source attribution");

// The route-module split must retain both surfaces that consume approved price
// data: artist cards keep the on-demand history tracker, and the comparison hub
// keeps exact-event provider buttons with the same snapshot framing.
globalThis.caches.default = new MemoryCache();
const pricedRouteEnv = envWithEventsJson(vividSeatsPriceEventsJson, {
  DEMAND_DB: createProviderPricingDb([freshVividSeatsPriceRow]),
  VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true",
  IMPACT_VIVIDSEATS_BASE_TRACKING_URL: CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL
});
const pricedArtistRoute = await routeResponse("/artists/morgan-wallen", pricedRouteEnv);
assert(pricedArtistRoute.text.includes(`data-price-history="${CONTROLLED_SEATGEEK_SHOW_ID}"`), "a priced artist event should server-render its price snapshot history control");
assert(pricedArtistRoute.text.includes("Show price snapshot history"), "the restored artist price tracker should be visible as a collapsed control");
assert(pricedArtistRoute.text.includes("data-price-alert-interest"), "the price tracker should retain the price-drop demand instrument");
const pricedComparisonHub = await routeResponse("/compare-concert-ticket-prices", pricedRouteEnv);
assert(pricedComparisonHub.text.includes('data-cta-location="comparison_hub"'), "the comparison hub should server-render tracked exact-event provider CTAs");
assert(pricedComparisonHub.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}`), "the comparison hub should link the exact reviewed event through /api/out");
assert(pricedComparisonHub.text.includes("$98.75"), "the comparison hub should retain the approved exact-event price snapshot");

const staleVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(vividSeatsPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([{ ...freshVividSeatsPriceRow, expires_at: "2026-05-14T11:30:00Z" }]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const staleVividSeatsLane = vividSeatsLaneFrom(await staleVividSeatsResponse.json());
assert(staleVividSeatsLane?.price === null && staleVividSeatsLane?.providerStatus === "unavailable", "stale Vivid Seats D1 snapshots should be hidden");

const wrongSourceVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(vividSeatsPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([{ ...freshVividSeatsPriceRow, source: "scraped_vividseats_page" }]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const wrongSourceVividSeatsLane = vividSeatsLaneFrom(await wrongSourceVividSeatsResponse.json());
assert(wrongSourceVividSeatsLane?.price === null && wrongSourceVividSeatsLane?.providerStatus === "unavailable", "Vivid Seats price should stay hidden without approved source rows");

const missingUrlVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: {
    ...env,
    DEMAND_DB: createProviderPricingDb([freshVividSeatsPriceRow]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  }
});
const missingUrlVividSeatsLane = vividSeatsLaneFrom(await missingUrlVividSeatsResponse.json());
assert(missingUrlVividSeatsLane?.price === null && missingUrlVividSeatsLane?.providerStatus === "unavailable", "Vivid Seats price should stay hidden without a verified vividseats_url on the event");

const unverifiedVividSeatsEventsJson = JSON.stringify(JSON.parse(vividSeatsPriceEventsJson).map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      provider_links: {
        ...(event.provider_links || {}),
        "vivid-seats": { ...(event.provider_links?.["vivid-seats"] || {}), verified: false }
      }
    }
  : event));
const unverifiedVividSeatsResponse = await showsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/shows?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&includePrices=true`),
  env: envWithEventsJson(unverifiedVividSeatsEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshVividSeatsPriceRow]),
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const unverifiedVividSeatsLane = vividSeatsLaneFrom(await unverifiedVividSeatsResponse.json());
assert(unverifiedVividSeatsLane?.price === null && unverifiedVividSeatsLane?.providerStatus === "unavailable", "Vivid Seats cache rows must stay hidden after exact provider verification is revoked");

// --- Bulk approved cached marketplace lanes: list-mode includePrices is
// permitted only with priceProviders=approved-marketplaces because those
// lanes read the D1 snapshot cache and never fan out to a provider API. ---
const bulkApprovedResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen&includePrices=true&priceProviders=approved-marketplaces"),
  env: envWithEventsJson(approvedPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow, freshVividSeatsPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
assert(bulkApprovedResponse.status === 200, "bulk approved-marketplaces includePrices should return 200 without showId");
const bulkApprovedJson = await bulkApprovedResponse.json();
assert(bulkApprovedJson.shows.length > 1, "bulk approved-marketplaces pricing should return the whole artist board");
for (const show of bulkApprovedJson.shows) {
  const laneProviders = (show.prices || []).map((lane) => lane.provider).sort();
  assert(
    JSON.stringify(laneProviders) === JSON.stringify(["SeatGeek", "StubHub International", "Ticket Liquidator", "TicketNetwork", "Vivid Seats"]),
    "bulk approved-marketplaces lanes must contain only cache-backed marketplace lanes (no Ticketmaster fan-out lane)"
  );
}
const bulkPricedShow = bulkApprovedJson.shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
const bulkSeatGeekLane = bulkPricedShow?.prices.find((lane) => lane.provider === "SeatGeek");
const bulkVividSeatsLane = bulkPricedShow?.prices.find((lane) => lane.provider === "Vivid Seats");
assert(bulkSeatGeekLane?.price === freshSeatGeekPriceRow.low_price && bulkSeatGeekLane?.source === "seatgeek_partner_api" && bulkSeatGeekLane?.status === "ok", "bulk SeatGeek lane should serve the fresh approved D1 snapshot");
assert(bulkVividSeatsLane?.price === freshVividSeatsPriceRow.low_price && bulkVividSeatsLane?.source === "vividseats_impact_marketplace_api" && bulkVividSeatsLane?.status === "ok", "bulk Vivid Seats lane should serve the fresh approved D1 snapshot");
const bulkUnpricedShow = bulkApprovedJson.shows.find((show) => show.id !== CONTROLLED_SEATGEEK_SHOW_ID);
assert(bulkUnpricedShow.prices.every((lane) => lane.price === null && lane.providerStatus === "unavailable"), "bulk lanes for shows without fresh approved rows must stay unavailable");

const bulkUnverifiedResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen&includePrices=true&priceProviders=approved-marketplaces"),
  env: envWithEventsJson(unverifiedVividSeatsEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow, freshVividSeatsPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const bulkUnverifiedShow = (await bulkUnverifiedResponse.json()).shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(bulkUnverifiedShow.prices.find((lane) => lane.provider === "Vivid Seats")?.price === null, "bulk cached Vivid Seats prices must require exact provider verification");

const serverPricedMorgan = await routeResponse("/artists/morgan-wallen", envWithEventsJson(approvedPriceEventsJson, {
  DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow, freshVividSeatsPriceRow]),
  SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
  VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true",
  IMPACT_SEATGEEK_BASE_TRACKING_URL: CONTROLLED_SEATGEEK_BASE_TRACKING_URL,
  IMPACT_VIVIDSEATS_BASE_TRACKING_URL: "https://example.test/vivid?u="
}));
assert(serverPricedMorgan.text.includes("provider-cta-price") && serverPricedMorgan.text.includes("Listed-price snapshots, not live availability."), "server-rendered artist cards should show eligible provider snapshots with one unified note before client hydration");
assert(!serverPricedMorgan.text.includes("SeatGeek price snapshot as of"), "SeatGeek must remain CTA-only in server-rendered cards");
assert(serverPricedMorgan.text.includes("may exclude fees"), "server-rendered snapshots should keep the fees disclaimer");

const bulkFlagsOffResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen&includePrices=true&priceProviders=approved-marketplaces"),
  env: envWithEventsJson(vividSeatsPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([freshSeatGeekPriceRow, freshVividSeatsPriceRow]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "false",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "false"
  })
});
const bulkFlagsOffJson = await bulkFlagsOffResponse.json();
assert(bulkFlagsOffJson.shows.every((show) => (show.prices || []).every((lane) => lane.price === null && lane.providerStatus === "unavailable")), "bulk approved-marketplaces lanes must stay hidden while the display flags are off");
assert(!JSON.stringify(bulkFlagsOffJson).includes("seatgeek_partner_api") && !JSON.stringify(bulkFlagsOffJson).includes("vividseats_impact_marketplace_api"), "bulk responses must not leak approved source attributions while the display flags are off");

const bulkStaleRowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen&includePrices=true&priceProviders=approved-marketplaces"),
  env: envWithEventsJson(vividSeatsPriceEventsJson, {
    DEMAND_DB: createProviderPricingDb([staleSeatGeekPriceRow, { ...freshVividSeatsPriceRow, expires_at: "2026-05-14T11:30:00Z" }]),
    SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  })
});
const bulkStaleRowsJson = await bulkStaleRowsResponse.json();
assert(bulkStaleRowsJson.shows.every((show) => (show.prices || []).every((lane) => lane.price === null && lane.providerStatus === "unavailable")), "bulk approved-marketplaces lanes must hide expired snapshots");

const healthResponse = await healthModule.onRequestGet({ env });
const healthJson = await healthResponse.json();
assert(healthResponse.status === 200 && healthJson.ok === true, "/api/health should return safe app status");
assert(!JSON.stringify(healthJson).includes("IMPACT_AUTH_TOKEN"), "/api/health must not expose secret names as values");
assert(healthJson.config.ticketNetworkPublicEnabled === true, "TicketNetwork should default public after verified activation");
assert(healthJson.config.ticketLiquidatorPublicEnabled === true, "Ticket Liquidator should default public after verified activation");
assert(healthJson.config.stubHubInternationalPublicEnabled === true, "StubHub International should default public after verified activation");
assert(healthJson.config.ticketNetworkPriceDisplayEnabled === true, "TicketNetwork price snapshots should default enabled after exact-ID proof");
assert(healthJson.config.ticketLiquidatorPriceDisplayEnabled === false, "Ticket Liquidator price snapshots must stay disabled while CurrentPrice is absent");
assert(healthJson.config.stubHubInternationalPriceDisplayEnabled === true, "StubHub International price snapshots should default enabled after exact-ID proof");

// bindings.debugApiToken is what an operator checks to confirm the
// /api/impact/* gate is live, so it must track the gate's own notion of a
// usable token — a declared-but-empty variable denies every request and must
// not read as configured here.
for (const [label, tokenEnv, expected] of [
  ["unset", {}, false],
  ["declared but empty", { DEBUG_API_TOKEN: "" }, false],
  ["whitespace only", { DEBUG_API_TOKEN: "   " }, false],
  ["configured", { DEBUG_API_TOKEN: "valid-debug-token" }, true]
]) {
  const response = await healthModule.onRequestGet({ env: { ...env, ...tokenEnv } });
  const body = await response.json();
  assert(
    body.bindings.debugApiToken === expected,
    `/api/health debugApiToken must report ${expected} when DEBUG_API_TOKEN is ${label}`
  );
  assert(!JSON.stringify(body).includes("valid-debug-token"), "/api/health must never echo the debug token value");
}

const fallbackHealthResponse = await healthModule.onRequestGet({
  env: {
    ...env,
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token"
  }
});
const fallbackHealthJson = await fallbackHealthResponse.json();
assert(fallbackHealthJson.bindings.impactTicketNetworkConfigured === true, "TicketNetwork health should recognize the verified SeatGeek-scoped credential fallback");
assert(fallbackHealthJson.bindings.impactTicketLiquidatorConfigured === true, "Ticket Liquidator health should recognize the verified SeatGeek-scoped credential fallback");
assert(fallbackHealthJson.bindings.impactStubHubInternationalConfigured === true, "StubHub International health should recognize the verified SeatGeek-scoped credential fallback");

// /api/impact/* are internal diagnostics that proxy authenticated Publisher API
// calls on the account's own credentials. Ungated they are an open proxy, so
// every route must 404 without DEBUG_API_TOKEN — including the POST route that
// creates a real tracking link, which must be refused before confirmCreate is
// even read. `env` deliberately carries no token, so it doubles as the
// unauthorised fixture.
const impactGateFixtures = [
  ["/api/impact/health", () => impactHealthModule.onRequestGet({
    request: new Request("https://tourticketcompare.com/api/impact/health"),
    env
  })],
  ["/api/impact/products", () => impactProductsModule.onRequestGet({
    request: new Request("https://tourticketcompare.com/api/impact/products?q=ticket"),
    env
  })],
  ["/api/impact/tracking-links", () => impactTrackingModule.onRequestPost({
    request: new Request("https://tourticketcompare.com/api/impact/tracking-links", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ confirmCreate: true, programId: "123" })
    }),
    env
  })]
];
for (const [route, invoke] of impactGateFixtures) {
  const response = await invoke();
  const payload = await response.json();
  assert(response.status === 404, `${route} must 404 without DEBUG_API_TOKEN`);
  assert(payload.error === "Not found" && payload.ok === false, `${route} must not confirm its own existence to unauthorised callers`);
  assert(!JSON.stringify(payload).includes("impact"), `${route} 404 body must not disclose the Impact integration`);
}

const impactDebugEnv = { ...env, DEBUG_API_TOKEN: "valid-debug-token" };
const impactToken = "?token=valid-debug-token";
const impactHealth = await impactHealthModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/impact/health${impactToken}`),
  env: impactDebugEnv
});
assert(impactHealth.status === 200, "/api/impact/health should fail safely without credentials");
const impactProducts = await impactProductsModule.onRequestGet({
  request: new Request(`https://tourticketcompare.com/api/impact/products${impactToken}&q=ticket`),
  env: impactDebugEnv
});
const impactProductsJson = await impactProducts.json();
assert(impactProducts.status === 200 && impactProductsJson.status === "missing_credentials", "/api/impact/products should fail safely without credentials");
const impactTracking = await impactTrackingModule.onRequestPost({
  request: new Request(`https://tourticketcompare.com/api/impact/tracking-links${impactToken}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ confirmCreate: true, programId: "123" })
  }),
  env: impactDebugEnv
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

const ticketNetworkUrl = "https://www.ticketnetwork.com/performers/morgan-wallen-tickets/events/12345";
const ticketNetworkEvent = {
  ...events.find((event) => event.id === verifiedMorganShow.id),
  id: "smoke-ticketnetwork-event",
  ticketnetwork_url: ticketNetworkUrl,
  provider_links: {
    ...(events.find((event) => event.id === verifiedMorganShow.id)?.provider_links || {}),
    ticketnetwork: {
      event_id: "TN-12345",
      url: ticketNetworkUrl,
      verified: true,
      last_verified_at: "2026-07-13",
      availability_status: "listed"
    }
  }
};
const ticketNetworkAssets = JSON.stringify([ticketNetworkEvent]);
const ticketNetworkBaseEnv = envWithEventsJson(ticketNetworkAssets, {
  IMPACT_TICKETNETWORK_BASE_TRACKING_URL: "https://ticketnetwork.pxf.io/smoke"
});
outResponse = await out("/api/out?showId=smoke-ticketnetwork-event&provider=ticketnetwork", "GET", null, ticketNetworkBaseEnv);
assert(outResponse.status === 302, "TicketNetwork should redirect a verified event by default after activation");
const defaultTicketNetworkLocation = new URL(outResponse.headers.get("location"));
assert(defaultTicketNetworkLocation.searchParams.get("u") === ticketNetworkUrl, "default-on TicketNetwork tracking should preserve the exact verified event URL");
outResponse = await out("/api/out?showId=smoke-ticketnetwork-event&provider=ticketnetwork", "GET", null, {
  ...ticketNetworkBaseEnv,
  TICKETNETWORK_PUBLIC_ENABLED: "false"
});
assert(outResponse.status === 400 && (await outResponse.json()).status === "provider_not_configured", "an explicit false flag must remain a TicketNetwork kill switch");
const renderedTicketNetworkOutHref = `/api/out?showId=smoke-ticketnetwork-event&amp;provider=ticketnetwork`;
const ticketNetworkPage = await routeResponse("/artists/morgan-wallen", ticketNetworkBaseEnv);
assert(ticketNetworkPage.text.includes(renderedTicketNetworkOutHref), "SSR should route the activated TicketNetwork event CTA through /api/out without a dashboard flag");
assert(!ticketNetworkPage.text.includes(ticketNetworkUrl), "SSR TicketNetwork CTA must not expose the raw affiliate URL; it routes through /api/out");
const disabledTicketNetworkPage = await routeResponse("/artists/morgan-wallen", {
  ...ticketNetworkBaseEnv,
  TICKETNETWORK_PUBLIC_ENABLED: "false"
});
assert(!disabledTicketNetworkPage.text.includes(renderedTicketNetworkOutHref), "SSR must honor the explicit TicketNetwork kill switch");
const unverifiedTicketNetworkEvent = {
  ...ticketNetworkEvent,
  provider_links: { ...ticketNetworkEvent.provider_links, ticketnetwork: { ...ticketNetworkEvent.provider_links.ticketnetwork, verified: false } }
};
outResponse = await out("/api/out?showId=smoke-ticketnetwork-event&provider=ticketnetwork", "GET", null, envWithEventsJson(JSON.stringify([unverifiedTicketNetworkEvent]), {
  IMPACT_TICKETNETWORK_BASE_TRACKING_URL: "https://ticketnetwork.pxf.io/smoke",
  TICKETNETWORK_PUBLIC_ENABLED: "true"
}));
assert(outResponse.status === 400 && (await outResponse.json()).status === "event_link_not_publishable", "TicketNetwork must require provider-specific verified provenance even on an otherwise publishable event");
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
const renderedTicketmasterHrefs = [...serverMorganWithoutSeatGeek.text.matchAll(/href="([^"]+)"/g)]
  .map((match) => decodeHtmlEntities(match[1]))
  .filter((href) => href.startsWith("/api/out?showId=") && href.includes("provider=ticketmaster"));
assert(renderedTicketmasterHrefs.length > 0, "regression check should find rendered Morgan Wallen Ticketmaster redirect CTAs");
assert(renderedTicketmasterHrefs.every((href) => !href.includes("ticketmaster.com")), "rendered Ticketmaster CTAs must retain the safe /api/out redirect");

const originalFetch = globalThis.fetch;
const seatGeekEligibleShows = baseTrackingShowsJson.shows.filter((show) => show.provider_ctas?.seatgeek === true);
const seatGeekEligibleShowIds = seatGeekEligibleShows.map((show) => String(show.id));
// No monetized CTA may render as a raw affiliate URL any more; every SeatGeek,
// Vivid Seats, and marketplace click is Impact-tracked server-side via /api/out.
const rawSeatGeekHrefs = [...serverMorganWithSeatGeek.text.matchAll(/href="([^"]+)"/g)]
  .map((match) => decodeHtmlEntities(match[1]))
  .filter((href) => href.includes("seatgeek.com"));
assert(rawSeatGeekHrefs.length === 0, "monetized SeatGeek CTAs must not render as raw affiliate links; they route through /api/out for server-side tracking");
const parsedRenderedOutHrefs = [...serverMorganWithSeatGeek.text.matchAll(/href="([^"]+)"/g)]
  .map((match) => decodeHtmlEntities(match[1]))
  .filter((href) => href.startsWith("/api/out?"))
  .map((href) => new URL(href, "https://tourticketcompare.com"));
// Event-level SeatGeek CTAs carry a showId; the artist-level SeatGeek card CTA
// carries artistSlug instead and is validated by the provider allowlist below.
const renderedSeatGeekOutHrefs = parsedRenderedOutHrefs.filter((u) => u.searchParams.get("provider") === "seatgeek" && u.searchParams.get("showId"));
assert(renderedSeatGeekOutHrefs.length > 0, "regression check should find /api/out SeatGeek CTA redirects for SeatGeek-eligible events");
assert(renderedSeatGeekOutHrefs.every((u) => seatGeekEligibleShowIds.includes(u.searchParams.get("showId"))), "rendered SeatGeek CTAs must route only verified event shows through /api/out");
assert(renderedSeatGeekOutHrefs.length <= seatGeekEligibleShows.length, "rendered SeatGeek CTA count must not exceed the verified event set");
assert(parsedRenderedOutHrefs.length > 0, "Ticketmaster and monetized CTAs should route through the safe /api/out redirect");
const ALLOWED_OUT_PROVIDERS = new Set(["ticketmaster", "seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"]);
assert(parsedRenderedOutHrefs.every((u) => ALLOWED_OUT_PROVIDERS.has(String(u.searchParams.get("provider") || "").toLowerCase())), "every /api/out CTA must target a known allowlisted provider");
const renderedSeatGeekShowIds = seatGeekEligibleShows.map((show) => show.id);

// Provider panel: SeatGeek card renders before the Ticketmaster card when
// configured, and not at all when unconfigured.
const sgCardIdx = serverMorganWithSeatGeek.text.indexOf("<h3>SeatGeek</h3>");
const tmCardIdx = serverMorganWithSeatGeek.text.indexOf("<h3>Ticketmaster</h3>");
assert(sgCardIdx !== -1 && tmCardIdx !== -1 && sgCardIdx < tmCardIdx, "provider panel must show the SeatGeek artist card before the Ticketmaster artist card when configured");
assert(!serverMorganWithoutSeatGeek.text.includes("<h3>SeatGeek</h3>"), "provider panel must not show a SeatGeek artist card without SeatGeek Impact config");
assert(serverMorganWithoutSeatGeek.text.includes("<h3>Ticketmaster</h3>"), "provider panel must keep the plain Ticketmaster artist card without SeatGeek Impact config");
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
  assert(!genericSeatGeekPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), `server-rendered SeatGeek CTA should be hidden for generic SeatGeek ${genericSeatGeekUrlType} URLs`);
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
assert(!httpSeatGeekPage.text.includes(RENDERED_SG_EVENT_OUT_HREF), "server-rendered SeatGeek CTA should be hidden for HTTP SeatGeek event URLs");
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
  assert(outResponse.status === 400, "SeatGeek should fail safely when its approved credentials are missing");
  const missingSeatGeekProgramJson = await outResponse.json();
  assert(missingSeatGeekProgramJson.status === "impact_missing_credentials", "SeatGeek should ignore retired Ticketmaster credentials");
  assert(missingSeatGeekProgramJson.hasProgramId === false, "missing SeatGeek program diagnostics should show hasProgramId false");

  const approvedSeatGeekImpactEnv = {
    ...env,
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
  };
  let approvedSeatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    approvedSeatGeekImpactCalled = true;
    assert(requestUrl.hostname === "api.impact.com", "SeatGeek approved SeatGeek credentials should still call Impact");
    assert(requestUrl.pathname.includes("/Mediapartners/sg-account/Programs/sg-program/TrackingLinks"), "SeatGeek approved SeatGeek request should use the SeatGeek account and SeatGeek program");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_SEATGEEK_URL, "SeatGeek approved SeatGeek DeepLink should be the controlled SeatGeek event URL");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "SeatGeek approved SeatGeek request should use SeatGeek basic auth");
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    approvedSeatGeekImpactEnv
  );
  assert(approvedSeatGeekImpactCalled, "SeatGeek should call Impact when approved SeatGeek credentials and SeatGeek program ID are configured");
  assert(outResponse.status === 302, "SeatGeek should redirect when approved SeatGeek credentials and SeatGeek program ID succeed");
  assert(outResponse.headers.get("location") === seatGeekTrackingUrl, "SeatGeek approved SeatGeek success should redirect to the tracking URL");

  const campaignIdSeatGeekImpactEnv = {
    ...env,
    IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
    IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
    IMPACT_SEATGEEK_PROGRAM_ID: "legacy-sg-program",
    IMPACT_SEATGEEK_CAMPAIGN_ID: "campaign-sg-program"
  };
  let campaignIdSeatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    campaignIdSeatGeekImpactCalled = true;
    assert(requestUrl.pathname.includes("/Mediapartners/sg-account/Programs/campaign-sg-program/TrackingLinks"), "SeatGeek CampaignId env var should take precedence over legacy ProgramId env var");
    assert(!requestUrl.pathname.includes("legacy-sg-program"), "SeatGeek CampaignId precedence should not use the legacy ProgramId when both are present");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "SeatGeek CampaignId precedence should preserve SeatGeek basic auth");
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
const vividSeatsEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? { ...event, vividseats_url: CONTROLLED_VIVIDSEATS_URL }
  : event));
const vividSeatsRecheckEventsJson = JSON.stringify(events.map((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID
  ? {
      ...event,
      verification_status: "needs_recheck",
      vividseats_url: CONTROLLED_VIVIDSEATS_URL,
      provider_links: {
        ...(event.provider_links || {}),
        "vivid-seats": {
          ...(event.provider_links?.["vivid-seats"] || {}),
          verified: true,
          url: CONTROLLED_VIVIDSEATS_URL
        }
      }
    }
  : event));
function withVividSeatsEventsFixture(baseEnv, eventsJson = vividSeatsEventsJson) {
  return {
    ...baseEnv,
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/data/events.json") return new Response(eventsJson, { status: 200 });
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
assert(vsConfiguredPage.text.includes(RENDERED_VS_EVENT_OUT_HREF), "server-rendered Vivid Seats CTA should route the controlled show through /api/out when configured");
assert(!vsConfiguredPage.text.includes(CONTROLLED_VIVIDSEATS_URL), "server-rendered Vivid Seats CTA must not expose the raw affiliate URL; it routes through /api/out");
assert(vsConfiguredPage.text.includes("provider-cta-name\">Vivid Seats<"), "Vivid Seats should render its own CTA when SeatGeek is not configured");
assert(vsConfiguredPage.text.includes("Some links earn us a commission — this never affects your price."), "server-rendered Vivid Seats CTA page should include the concise show-board provider disclosure");
assert(!vsConfiguredPage.text.includes("Vivid Seats controls prices, fees, availability, and checkout terms for this link."), "server-rendered cards should not repeat provider caution copy per Vivid Seats link");

const vsRecheckEnv = withVividSeatsEventsFixture(
  {
    ...env,
    IMPACT_VIVIDSEATS_BASE_TRACKING_URL: CONTROLLED_VIVIDSEATS_BASE_TRACKING_URL
  },
  vividSeatsRecheckEventsJson
);
const vsRecheckShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: vsRecheckEnv
});
const vsRecheckShowsJson = await vsRecheckShowsResponse.json();
const vsRecheckShow = vsRecheckShowsJson.shows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(vsRecheckShow?.provider_ctas?.vividseats === true, "needs_recheck event with verified Vivid Seats provenance should remain publishable through /api/shows");
const vsRecheckPage = await routeResponse("/artists/morgan-wallen", vsRecheckEnv);
assert(vsRecheckPage.text.includes(RENDERED_VS_EVENT_OUT_HREF), "SSR should render a standalone Vivid Seats CTA when its needs_recheck event has verified provider provenance");
assert(vsRecheckPage.text.includes(`/api/out?showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=ticketmaster`), "SSR should keep Ticketmaster available for the independently verified Vivid Seats needs_recheck event");
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
  .split("<div class=\"provider-cta-group\">")
  .find((chunk) => chunk.includes(RENDERED_VS_EVENT_OUT_HREF));
assert(vsAndSgGroup, "controlled show card should render a provider-cta-group including the Vivid Seats CTA when both affiliate providers are configured");
const sgIdx = vsAndSgGroup.indexOf("provider-cta-name\">SeatGeek<");
const vsIdx = vsAndSgGroup.indexOf("provider-cta-name\">Vivid Seats<");
const tmIdx = vsAndSgGroup.indexOf("provider-cta-name\">Ticketmaster<");
assert(sgIdx !== -1 && vsIdx !== -1 && tmIdx !== -1 && sgIdx < vsIdx && vsIdx < tmIdx, "CTA order must be SeatGeek, Vivid Seats, Ticketmaster");

// 4. Impact API failure must return diagnostic JSON, never a raw redirect.
const vsApiConfigEnv = withVividSeatsEventsFixture({
  ...env,
  IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
  IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
  IMPACT_VIVIDSEATS_CAMPAIGN_ID: "vs-campaign"
});
try {
  let vividSeatsImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    vividSeatsImpactCalled = true;
    assert(requestUrl.hostname === "api.impact.com", "Vivid Seats tracking should call Impact with the controlled event URL");
    assert(requestUrl.pathname.includes("/Mediapartners/sg-account/Programs/vs-campaign/TrackingLinks"), "Vivid Seats Impact request should use the approved SeatGeek publisher account and the Vivid Seats campaign");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_VIVIDSEATS_URL, "Vivid Seats Impact DeepLink should be the controlled Vivid Seats event URL");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "Vivid Seats Impact request should use approved SeatGeek publisher basic auth");
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
assert(!vsInvalidPage.text.includes(RENDERED_VS_EVENT_OUT_HREF), "server-rendered Vivid Seats CTA should be hidden for a Vivid Seats URL that /api/out would reject");
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
assert(!serverMorganWithoutSeatGeek.text.includes("Check SeatGeek"), "SeatGeek CTAs should remain hidden when SeatGeek affiliate config is absent even if an event URL exists");

console.log("SeatGeek visibility gating verified: event-level URL plus affiliate config required");

// Verified artist (Bruno Mars) must be indexable with artist-level CTA
const brunoMarsPage = await routeResponse("/artists/bruno-mars");
assert(brunoMarsPage.response.status === 200, "/artists/bruno-mars must return 200");
assert(/index,follow/.test(brunoMarsPage.text), "/artists/bruno-mars (indexable) must render index,follow robots meta");
assert(brunoMarsPage.text.includes('href="/api/out?artistSlug=bruno-mars&amp;provider=ticketmaster'), "/artists/bruno-mars must keep its existing Ticketmaster redirect path");
assert(!brunoMarsPage.text.includes("still being reviewed"), "/artists/bruno-mars (indexable) must not show review-pending notice");

// Fully-verified artist (Morgan Wallen) must remain indexable and keep its event CTAs.
// With Ticketmaster as the only available provider, the card renders a single
// Ticketmaster provider-cta button reading "Check prices".
assert(/index,follow/.test(serverMorganWithoutSeatGeek.text), "/artists/morgan-wallen (indexable) must remain index,follow");
assert(serverMorganWithoutSeatGeek.text.includes("provider-cta-name\">Ticketmaster<"), "/artists/morgan-wallen (indexable) must show the Ticketmaster event CTA button");
assert(serverMorganWithoutSeatGeek.text.includes("provider-cta-check\">Check prices<"), "an unpriced provider button must read 'Check prices'");
// A card with checked destinations but no eligible snapshot must say so and
// name where to look, rather than leaving the price slot silently empty.
assert(
  serverMorganWithoutSeatGeek.text.includes("No listed-price snapshot is available for this date. Check current prices using the provider buttons above."),
  "a card whose queried lanes all lack an eligible snapshot must state the unavailable case"
);

// Coverage contract: onRequest queries prices for every card the route renders,
// not a fixed prefix of the board, so a card carrying provider buttons must
// resolve to either a snapshot or the unavailable note. Silence means it was
// never queried — the state this replaced, where a long board went blank past
// its sixth date for no-JS visitors and crawlers.
const fullyPricedBoard = await routeResponse("/artists/olivia-rodrigo");
if (fullyPricedBoard.response.status === 200) {
  const boardCards = fullyPricedBoard.text
    .split("<article")
    .map((card) => card.split("</article>")[0])
    .filter((card) => card.includes("info-card show-card"));
  const cardsWithButtons = boardCards.filter((card) => card.includes('class="provider-cta-group"'));
  const silentCards = cardsWithButtons.filter(
    (card) =>
      !card.includes("No listed-price snapshot is available for this date.") &&
      !card.includes("provider-cta-price")
  );
  assert(cardsWithButtons.length > 6, "the coverage check needs a board longer than the old six-show slice to be meaningful");
  assert(
    silentCards.length === 0,
    `every rendered card must be price-checked; ${silentCards.length} of ${cardsWithButtons.length} showed neither a snapshot nor the unavailable note`
  );
}
// Per card, not per page: one board legitimately mixes both states, so the
// invariant is that a card carrying a price never also carries the note.
const pricedMorganCards = serverPricedMorgan.text
  .split("<article")
  .map((card) => card.split("</article>")[0])
  .filter((card) => card.includes("provider-cta-price"));
assert(pricedMorganCards.length > 0, "the priced Morgan Wallen board should render at least one card with a snapshot");
assert(
  pricedMorganCards.every((card) => !card.includes("No listed-price snapshot is available for this date.")),
  "a card carrying an eligible snapshot must keep the snapshot disclosure, not the unavailable note"
);
assert(serverMorganWithoutSeatGeek.text.includes(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&amp;provider=ticketmaster`), "server-rendered verified Ticketmaster event CTA should use its existing safe redirect");

console.log("indexable artist verification passed for bruno-mars");

// Editorially-indexable artist with zero upcoming events (Beyoncé) keeps its
// durable URL and renders a concise, truthful empty state. A future event will
// move it back into the primary artist section automatically.
const beyonceEmptyStatePage = await routeResponse("/artists/beyonce");
assert(beyonceEmptyStatePage.response.status === 200, "/artists/beyonce must return 200");
assert(/<meta name="robots" content="index,follow/.test(beyonceEmptyStatePage.text), "/artists/beyonce (zero upcoming shows) must remain indexable");
const beyonceShowBoardMatch = beyonceEmptyStatePage.text.match(/<section class="section-grid show-board"[\s\S]*?<\/section>/);
assert(beyonceShowBoardMatch, "zero-event artist page must render the show board section");
const beyonceShowBoard = beyonceShowBoardMatch[0];
assert(beyonceShowBoard.includes("No upcoming dates listed"), "zero-event artist page must render the empty-state heading");
assert(
  beyonceShowBoard.includes("followed the ticket link to that exact event, it appears on this page"),
  "zero-event empty state must explain what happens when a date is verified"
);
assert(!beyonceShowBoard.includes("No verified show dates are currently listed"), "zero-event empty state must not use the old generic copy");
// An empty page must not imply an announcement is coming, and must not turn
// into a generic ticket-buying course.
assert(
  beyonceShowBoard.includes("t say whether more are coming"),
  "zero-event empty state must not imply a tour announcement is imminent"
);
assert(
  !/coming soon|stay tuned|announced soon|any day now/i.test(beyonceEmptyStatePage.text),
  "zero-event artist page must not hint that dates are about to be announced"
);
assert(
  !beyonceEmptyStatePage.text.includes("How prices and links work here"),
  "zero-event artist page must not carry the price/fee help component — there is nothing to compare"
);
assert(
  beyonceEmptyStatePage.text.includes("data-watchlist-shell"),
  "zero-event artist page must offer the watchlist signup"
);
assert(
  /<meta name="description" content="No verified upcoming Beyonc[^"]*dates are listed right now/.test(beyonceEmptyStatePage.text),
  "zero-event artist page description must not promise dates the page does not have"
);
// The empty state may link the artist-level provider page ("Check <Provider>
// for updates") but must never render an event-level ticket CTA — there are
// no verified dates to sell.
assert(!/View Tickets|Check \w[\w ]* for tickets|showId=/i.test(beyonceShowBoard), "zero-event empty state must not include any event-level ticket CTA");
assert(!beyonceShowBoard.includes("provider="), "zero-event empty state must not surface an outbound provider claim");
assert(beyonceShowBoard.includes('href="/artists"') && beyonceShowBoard.includes("Browse artists"), "zero-event empty state must link users to the artists index");
console.log("zero-event empty-state verification passed for beyonce");

// --- Artist-page comparison UX (synthetic boards) ---------------------------
// The shapes below are the artist pages the site actually has: a large
// multi-country board, a single date, a multi-night stand at one venue, and a
// board where only some dates have a checked link. They are rendered from
// synthetic events for an existing indexable artist so the assertions describe
// the page structure rather than whichever tour happens to be on sale today.
function syntheticShow({ id, city, venue, country = "United States", iso, timezone = "America/New_York", verified = true, tour = "Synthetic Run" }) {
  const eventId = id.toUpperCase();
  return {
    id,
    artist_slug: "bruno-mars",
    artist_name: "Bruno Mars",
    event_name: `Bruno Mars in ${city}`,
    tour_name: tour,
    city,
    country,
    venue,
    datetime_iso: iso,
    timezone,
    ticketmaster_event_id: eventId,
    ticketmaster_url: verified
      ? `https://www.ticketmaster.com/bruno-mars-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/event/${eventId}`
      : "",
    seatgeek_url: "",
    vividseats_url: "",
    source_type: "ticketmaster",
    verification_status: verified ? "human_verified" : "needs_recheck",
    last_verified_at: "2026-07-20",
    provider_links: {
      ticketmaster: { event_id: eventId, url: "", verified, last_verified_at: "2026-07-20", availability_status: "listed" }
    }
  };
}

function futureIso(daysFromNow, hourUtc = 23) {
  const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  date.setUTCHours(hourUtc, 0, 0, 0);
  return date.toISOString();
}

async function renderSyntheticArtistBoard(shows) {
  const { text: html } = await routeResponse("/artists/bruno-mars", envWithEventsJson(JSON.stringify(shows)));
  return { html, cards: (html.match(/<article class="info-card show-card/g) || []).length };
}

// (1) Many events, several cities and countries, with multi-night runs.
const manyShows = [
  syntheticShow({ id: "syn-many-1", city: "New York", venue: "Madison Square Garden", iso: futureIso(30) }),
  syntheticShow({ id: "syn-many-2", city: "New York", venue: "Madison Square Garden", iso: futureIso(31) }),
  syntheticShow({ id: "syn-many-3", city: "New York", venue: "Madison Square Garden", iso: futureIso(32) }),
  syntheticShow({ id: "syn-many-4", city: "Chicago", venue: "United Center", iso: futureIso(45), timezone: "America/Chicago" }),
  syntheticShow({ id: "syn-many-5", city: "Los Angeles", venue: "Kia Forum", iso: futureIso(60), timezone: "America/Los_Angeles" }),
  syntheticShow({ id: "syn-many-6", city: "London", venue: "The O2", country: "United Kingdom", iso: futureIso(90), timezone: "Europe/London" }),
  syntheticShow({ id: "syn-many-7", city: "Paris", venue: "Accor Arena", country: "France", iso: futureIso(95), timezone: "Europe/Paris" }),
  syntheticShow({ id: "syn-many-8", city: "Berlin", venue: "Uber Arena", country: "Germany", iso: futureIso(120), timezone: "Europe/Berlin" }),
  syntheticShow({ id: "syn-many-9", city: "Madrid", venue: "Movistar Arena", country: "Spain", iso: futureIso(150), timezone: "Europe/Madrid" })
];
const manyBoard = await renderSyntheticArtistBoard(manyShows);
assert(manyBoard.cards === manyShows.length, "a large artist board should render every upcoming date server-side");
assert(manyBoard.html.includes("9 upcoming Bruno Mars dates"), "a large board's lead should count its own dates");
assert(manyBoard.html.includes("7 cities") && manyBoard.html.includes("5 countries"), "a large board's lead should state its geographic spread");
assert(manyBoard.html.includes("data-artist-facts"), "a large board should render the fact strip above the dates");
// Search/filter affordances appear only when the number of dates warrants them,
// and the month jump list works with JavaScript off.
assert(manyBoard.html.includes('class="show-board-jump"'), "a long board should render a no-JS month jump list");
const firstJumpAnchor = manyBoard.html.match(/<nav class="show-board-jump"[\s\S]*?href="#(show-[a-z0-9-]+)"/);
assert(firstJumpAnchor, "the month jump list should link to a show anchor");
assert(manyBoard.html.includes(`id="${firstJumpAnchor[1]}"`), "every month jump target must exist on the page");
// Dates come before generic help in the source order.
assert(
  manyBoard.html.indexOf('class="section-grid show-board"') < manyBoard.html.indexOf("How prices and links work here"),
  "dates and provider options must precede the generic price/fee help"
);
assert(
  manyBoard.html.indexOf("How prices and links work here") < manyBoard.html.indexOf("About Bruno Mars"),
  "the compact price/fee help should precede the supporting editorial content"
);

// (2) One event: no filter furniture, no plural-count copy.
const oneBoard = await renderSyntheticArtistBoard([
  syntheticShow({ id: "syn-one-1", city: "Nashville", venue: "Bridgestone Arena", iso: futureIso(40), timezone: "America/Chicago" })
]);
assert(oneBoard.cards === 1, "a single-date board should render exactly one card");
assert(oneBoard.html.includes("One upcoming Bruno Mars date is verified"), "a single-date lead should read as one date");
assert(!oneBoard.html.includes('class="show-filter-intro"'), "a single-date board should not offer filter controls");
assert(!oneBoard.html.includes('class="show-board-jump"'), "a single-date board should not offer a month jump list");
assert(!/All 1 dates/.test(oneBoard.html), "a single-date board must not render pluralised counts");

// (3) Multi-night run at one venue: the differing date must be prominent.
const runBoard = await renderSyntheticArtistBoard([
  syntheticShow({ id: "syn-run-1", city: "Toronto", venue: "Rogers Stadium", country: "Canada", iso: futureIso(50), timezone: "America/Toronto" }),
  syntheticShow({ id: "syn-run-2", city: "Toronto", venue: "Rogers Stadium", country: "Canada", iso: futureIso(51), timezone: "America/Toronto" })
]);
assert(runBoard.html.includes("Night 1 of 2") && runBoard.html.includes("Night 2 of 2"), "multi-night runs should number each night");
assert(runBoard.html.includes('class="show-run-chip"'), "the night number should render as a visible chip, not a muted aside");
// The run line must add only the night number — the full date is already
// shown by the date badge and meta line above, so restating it here is
// clutter (and previously read "... at this venue — this card is <date>").
assert(!runBoard.html.includes("this card is "), "multi-night run text must not repeat the full date already shown in the card's meta line");
const runParagraphs = runBoard.html.match(/<p class="show-card-run">[\s\S]*?<\/p>/g) || [];
assert(runParagraphs.length === 2, "each night in a run should render exactly one run line");
for (const runParagraph of runParagraphs) {
  assert(
    /^<p class="show-card-run"><span class="show-run-chip">Night \d+ of \d+<\/span> at this venue<\/p>$/.test(runParagraph),
    `multi-night run text should contain only the night chip and venue context, not a restated date: ${runParagraph}`
  );
}
assert(runBoard.html.includes("nights at Rogers Stadium"), "a single multi-night run should be called out in the lead");
// Every card carries the facts that identify one date apart from another.
assert((runBoard.html.match(/class="show-card-meta"/g) || []).length === 2, "each date card should carry a meta line");
assert(/class="show-card-meta">[\s\S]*?Canada/.test(runBoard.html), "the card meta line should include the country");
assert(/\d{1,2}:\d{2}\s?(AM|PM) local/.test(runBoard.html), "the card meta line should include the venue-local start time when the source has one");

// The provider-button row's uppercase "Compare ticket options for this date"
// label was pure clutter above buttons that are self-explanatory — it, and
// the CSS that only styled it, must not come back on either rendering path.
// What replaced it is a single line stating the COUNT, which is the one thing
// the buttons do not say; the count is what makes "compare" honest or not.
assert(manyBoard.cards > 0 && manyBoard.html.includes('class="provider-cta-group"'), "the many-show board should still render provider CTA buttons");
assert(!manyBoard.html.includes("Compare ticket options for this date"), "server-rendered show cards must not render the removed provider CTA label");
// This board is rendered without affiliate credentials, so each card has only
// the plain Ticketmaster link: exactly the one-provider case that must never
// claim to be a comparison.
const manyBoardCountLines = manyBoard.html.match(/<p class="provider-cta-count muted">([^<]*)<\/p>/g) || [];
assert(
  manyBoardCountLines.length === manyBoard.cards,
  "every server-rendered card with a CTA should carry exactly one checked-ticket-site count line"
);
assert(
  manyBoardCountLines.every((line) => line.includes("1 checked ticket site for this date")),
  "a card offering a single provider must say '1 checked ticket site for this date'"
);
assert(
  !manyBoard.html.includes("Compare 1 checked ticket site"),
  "a one-provider card must never use comparison wording"
);
assert(
  !/Compare 1 checked/.test(appJs),
  "client-rendered cards (public/app.js) must never use comparison wording for a single provider"
);
// Both renderers must produce the same three strings from the same count.
assert(
  appJs.includes("1 checked ticket site for this date") && appJs.includes("checked ticket sites for this date"),
  "client-rendered cards should carry the same checked-ticket-site count wording as the server"
);
assert(
  pathSource.includes("1 checked ticket site for this date") && pathSource.includes("checked ticket sites for this date"),
  "server-rendered cards should carry the checked-ticket-site count wording"
);
assert(
  appJs.includes('"provider-cta-count muted"') && pathSource.includes('"provider-cta-count muted"'),
  "both rendering paths should mark the count line with the same class, so SSR and hydration match"
);
assert(
  (await read("public/styles.css")).includes(".show-card .provider-cta-count"),
  "the checked-ticket-site count line should be styled"
);
// The count line is about links, not prices: price availability has its own
// copy in .provider-cta-notes and must not be folded into this one.
assert(
  !/checked ticket site[s]? for this date[^<]*price/i.test(manyBoard.html),
  "the CTA count line must not carry price wording"
);
assert(!manyBoard.html.includes('class="provider-cta-label"'), "server-rendered show cards must not carry the removed provider-cta-label element");
assert(!appJs.includes("Compare ticket options for this date"), "client-rendered show cards (public/app.js) must not render the removed provider CTA label");
assert(!appJs.includes('"provider-cta-label"'), "client-rendered show cards (public/app.js) must not carry the removed provider-cta-label class");
assert(!appJs.includes("this card is"), "client-rendered multi-night run text (public/app.js) must not repeat the full date already shown in the card's meta line");
assert(!(await read("public/styles.css")).includes(".provider-cta-label"), "styles.css must not keep CSS that only styled the removed provider CTA label");

// A date-only source record must not be given an invented midnight start time.
// Checked in several zones because the midnight guard reads a locale-formatted
// hour, and en-US with hour12:false renders midnight as "24" under an h24 hour
// cycle — which the Workers ICU build may use even where Node's does not.
for (const timezone of ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"]) {
  const midnightBoard = await renderSyntheticArtistBoard([
    syntheticShow({ id: "syn-midnight-1", city: "Boston", venue: "TD Garden", iso: futureIso(70, 0), timezone })
  ]);
  assert(
    !midnightBoard.html.includes("12:00 AM local"),
    `a midnight (date-only) record must not print an invented start time (${timezone})`
  );
}
// Both hour-cycle spellings of midnight must be treated as "no time recorded".
for (const [hourCycle, label] of [["h23", "0"], ["h24", "24"]]) {
  const midnightHour = Number(
    new Date("2026-12-03T00:00:00Z").toLocaleString("en-US", { hour: "numeric", hourCycle, timeZone: "UTC" })
  );
  assert(
    midnightHour === 0 || midnightHour === 24,
    `midnight under ${hourCycle} should read as 0 or 24 (got ${midnightHour}, expected around ${label})`
  );
}
assert(
  pathSource.includes('hourCycle: "h23"') && pathSource.includes("hour === 0 || hour === 24"),
  "the server midnight guard should pin the hour cycle and accept both spellings of midnight"
);
assert(
  appJs.includes('hourCycle: "h23"') && appJs.includes("hour === 0 || hour === 24"),
  "the client midnight guard should mirror the server's"
);

// (4) Weak provider coverage: partial link coverage is stated, not hidden, and
// the dates with no checked link stay listed with no button.
const weakBoard = await renderSyntheticArtistBoard([
  syntheticShow({ id: "syn-weak-1", city: "Denver", venue: "Ball Arena", iso: futureIso(35), timezone: "America/Denver" }),
  syntheticShow({ id: "syn-weak-2", city: "Seattle", venue: "Climate Pledge Arena", iso: futureIso(38), timezone: "America/Los_Angeles", verified: false }),
  syntheticShow({ id: "syn-weak-3", city: "Portland", venue: "Moda Center", iso: futureIso(41), timezone: "America/Los_Angeles", verified: false })
]);
assert(weakBoard.html.includes("1 of the 3 have a checked ticket link"), "partial provider coverage must be stated in the lead");
assert(weakBoard.html.includes("1 of 3 dates"), "the fact strip should quantify partial link coverage");
assert(
  (weakBoard.html.match(/No checked ticket link is available for this date yet/g) || []).length === 2,
  "dates without a checked link must render the safe no-link state"
);
assert(
  weakBoard.html.includes("It stays listed so the date itself is still visible"),
  "the no-link state should explain why the date is still shown"
);

// (5) No fabricated price or ranking claims on any of these boards, and no
// implication that the site sees the whole market.
for (const [label, page] of [
  ["many", manyBoard.html],
  ["one", oneBoard.html],
  ["run", runBoard.html],
  ["weak", weakBoard.html],
  ["empty", beyonceEmptyStatePage.text]
]) {
  const body = (page.match(/<main id="mainContent">[\s\S]*?<\/main>/) || [""])[0];
  for (const rule of [
    /\bcheapest\b/i,
    /\blowest price\b/i,
    /\bbest price\b/i,
    /\bevery ticket site\b/i,
    /\ball available tickets\b/i,
    /\bwhole market\b/i,
    /\bguaranteed\b/i,
    /\bselling out\b/i,
    /\bdemand is\b/i,
    /\bunforgettable\b/i,
    /\bsecure your seats\b/i,
    /\bprices can vary depending on\b/i,
    /\bnavigating the ticket market\b/i
  ]) {
    assert(!rule.test(body), `artist page (${label}) must not contain banned copy ${rule}`);
  }
  // A price may only ever appear beside a provider button, never in prose.
  assert(!/\bfrom (only )?[£$€]\s?\d/i.test(body), `artist page (${label}) must not advertise a "from" price`);
}

// (6) Canonical, robots, and structured data must all describe the same board.
assert(
  extractCanonical(manyBoard.html) === "https://tourticketcompare.com/artists/bruno-mars",
  "an artist page must keep the bare artist canonical"
);
assert(/<meta name="robots" content="index,follow/.test(manyBoard.html), "an artist page with upcoming dates should be indexable");
assert(/<meta name="robots" content="index,follow/.test(beyonceEmptyStatePage.text), "an empty artist board must remain indexable");
const manyGraph = JSON.parse(manyBoard.html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const manyMusicEvents = manyGraph["@graph"].filter((node) => node["@type"] === "MusicEvent");
assert(manyMusicEvents.length > 0, "an indexable artist page should emit MusicEvent structured data");
for (const node of manyMusicEvents) {
  const nodeAnchor = String(node.url || "").split("#")[1] || "";
  assert(nodeAnchor && manyBoard.html.includes(`id="${nodeAnchor}"`), `MusicEvent ${node.name} must correspond to a visible show card`);
  assert(manyBoard.html.includes(node.location?.name || " "), `MusicEvent ${node.name} venue must be visible on the page`);
}
const manyFaqNode = manyGraph["@graph"].find((node) => node["@type"] === "FAQPage");
assert(manyFaqNode, "an artist page should emit FAQPage structured data for its visible FAQ");
for (const question of manyFaqNode.mainEntity) {
  assert(
    manyBoard.html.includes(`<summary>${question.name.replace(/&/g, "&amp;")}</summary>`),
    `FAQ question "${question.name}" must be visible on the page`
  );
}
assert(
  manyFaqNode.mainEntity[0].acceptedAnswer.text.includes("9 upcoming dates"),
  "the FAQ's lead answer should be derived from the same board as the page"
);
const emptyGraph = JSON.parse(beyonceEmptyStatePage.text.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert(
  !emptyGraph["@graph"].some((node) => node["@type"] === "MusicEvent"),
  "an artist page with no verified dates must emit no MusicEvent structured data"
);

// (7) Editorial provenance: populated boards carry the dated verification
// disclosure; empty boards omit it so no stale link-check claim is shown.
for (const [label, page] of [["many", manyBoard.html]]) {
  assert(page.includes("data-artist-trust"), `artist page (${label}) should carry the provenance block`);
  assert(page.includes("<strong>Data checked:</strong>"), `artist page (${label}) provenance should state when the data was checked`);
  assert(page.includes("<strong>What we verify:</strong>"), `artist page (${label}) provenance should state what is verified`);
  assert(page.includes("<strong>What we don't verify:</strong>"), `artist page (${label}) provenance should state what is not verified`);
  assert(page.includes('href="/affiliate-disclosure"'), `artist page (${label}) provenance should link the affiliate disclosure`);
  assert(page.includes('href="/contact"'), `artist page (${label}) provenance should link a corrections route`);
  assert(page.includes("TourTicketCompare editorial team"), `artist page (${label}) should name its publisher`);
  // Automated verification must never be presented as a human editorial review.
  assert(!/reviewed by (a|our) (human|editor)/i.test(page), `artist page (${label}) must not claim a human review it cannot evidence`);
  assert(!/Page reviewed:/i.test(page), `artist page (${label}) must not print a human review timestamp`);
}
assert(!beyonceEmptyStatePage.text.includes("data-artist-trust"), "empty artist pages should omit dated provenance claims");
assert(!beyonceEmptyStatePage.text.includes("Data checked:"), "empty artist pages should omit last-checked claims");
assert(
  manyBoard.html.includes("no separate human editorial review date"),
  "the provenance block should distinguish automated checks from human review"
);
// The event-record date range (derived from mixed-semantics event
// last_verified_at values, which could produce a misleading or reversed
// span) must never be folded into the artist page's "Data checked" line —
// only the artist-level verification date renders.
assert(!manyBoard.html.includes("event records"), "artist page provenance must not fold event last_verified_at into a date range");
assert(!beyonceEmptyStatePage.text.includes("event records"), "empty-board artist page provenance must not fold event last_verified_at into a date range");
{
  const reversedRangeShows = [
    syntheticShow({ id: "syn-freshness-1", city: "Miami", venue: "Kaseya Center", iso: futureIso(20) }),
    syntheticShow({ id: "syn-freshness-2", city: "Miami", venue: "Kaseya Center", iso: futureIso(21) })
  ];
  reversedRangeShows[0].last_verified_at = "2026-08-01";
  reversedRangeShows[1].last_verified_at = "2026-01-15";
  const freshnessBoard = await renderSyntheticArtistBoard(reversedRangeShows);
  assert(
    !freshnessBoard.html.includes("Aug 1, 2026") && !freshnessBoard.html.includes("Jan 15, 2026"),
    "per-event last_verified_at dates must never surface in the artist page's Data checked line, even out of chronological order"
  );
}
// An artist with no future dates must omit dated provenance claims entirely,
// including when it has no artist-level verification date.
{
  const noVerifiedDatePage = await routeResponse("/artists/sabrina-carpenter");
  assert(noVerifiedDatePage.response.status === 200, "an artist with no verified-link date should still render its page");
  assert(!noVerifiedDatePage.text.includes("data-artist-trust"), "an empty artist page should omit dated provenance claims");
  assert(
    !noVerifiedDatePage.text.includes("<strong>Data checked:</strong>"),
    "an empty artist page must not render a generic 'Data checked' filler line"
  );
}
// Artist-level provider buttons land on the artist's page, not on one date, so
// neither the provenance block nor the shared help may claim otherwise.
assert(
  manyBoard.html.includes("every button on a date card resolves to that exact event"),
  "the provenance block should scope the exact-event claim to date-card buttons"
);
assert(
  !/every ticket button we publish resolves to that exact event/.test(manyBoard.html),
  "the provenance block must not claim artist-level buttons resolve to a specific date"
);
assert(
  manyBoard.html.includes("they open the artist&#39;s page on a ticket site, not a specific date"),
  "the shared help should describe where artist-level provider buttons land"
);

// The client must not restore the authored, date-promising description on a
// board with no dates — that would undo the empty-board metadata for any
// crawler or preview consumer that executes the page script.
assert(
  appJs.includes("const hasServerDates = main.querySelectorAll"),
  "artist hydration should read the server's board state before rewriting metadata"
);
const renderArtistSource = appJs.match(/function renderArtist\(artist\) \{[\s\S]*?\n  \);/);
assert(renderArtistSource, "renderArtist should still call setMeta");
assert(
  renderArtistSource[0].includes("hasServerDates"),
  "artist hydration's setMeta call must branch on whether the server rendered any dates"
);
assert(
  renderArtistSource[0].includes("No verified upcoming"),
  "artist hydration must keep an empty-board description that does not promise dates"
);
// Hydration must preserve editorial indexability while the board is empty.
assert(
  appJs.includes("const shouldNoindex = isReviewRequired;"),
  "artist hydration must not noindex solely because the board is empty"
);
assert(
  !/setMeta\(\s*\{[\s\S]*?\},\s*isReviewRequired\s*\)/.test(appJs),
  "artist hydration must not pass the editorial status straight to setMeta as the noindex flag"
);

// (8) Mobile rendering of the comparison UI: the styles that keep the date
// cards, fact strip, and provider buttons usable on a narrow screen.
const artistStylesCss = await read("public/styles.css");
const narrowBlocks = [...artistStylesCss.matchAll(/@media \(max-width: 6\d\dpx\) \{[\s\S]*?\n\}\n/g)].map((match) => match[0]);
assert(narrowBlocks.length, "styles.css should carry a narrow-screen block for the show board");
const narrowBlock = [narrowBlocks.find((block) => block.includes(".artist-fact-strip")) || ""];
assert(narrowBlock[0].includes(".artist-fact-strip"), "the fact strip should reflow on narrow screens");
assert(narrowBlocks.some((block) => block.includes(".show-card-body")), "show cards should go full-width on narrow screens");
assert(artistStylesCss.includes(".provider-cta-group {"), "provider buttons should be laid out as their own group");
assert(artistStylesCss.includes(".show-board-jump-list"), "the month jump list should be styled as a wrapping row");
assert(
  narrowBlock[0].includes("min-height: 40px") || narrowBlock[0].includes("min-height: 44px"),
  "narrow-screen tap targets should meet a minimum height"
);

// Horizontal-overflow guards. `main` is a grid, so a grid item's automatic
// minimum size is its min-content: one wide thing inside a section makes the
// whole page scroll sideways. The empty artist board hit this through the
// watchlist email input, whose intrinsic width comes from the `size` attribute
// it does not set (defaulting to 20 characters) and which neither flex-basis
// nor min-width affects.
assert(
  /main > \*\s*\{[^}]*min-width:\s*0/.test(artistStylesCss),
  "main's grid items must be allowed to shrink below their min-content width"
);
assert(
  /\.watchlist-signup-row input\[type="email"\]\s*\{[^}]*\bwidth:\s*0/.test(artistStylesCss),
  "the watchlist email input must not contribute its default size=20 intrinsic width to the page"
);

// The page shell must not carry an inline <style> block: the Content Security
// Policy this site sends is `style-src 'self'`, which refuses inline styles
// outright, so such a block is dead weight that never applies and logs a
// violation on every page load.
assert(!/<style[\s>]/i.test(shellHtml), "public/index.html must not carry an inline <style> block — style-src 'self' blocks it");
assert(
  !/\sstyle="/i.test(shellHtml),
  "public/index.html must not carry inline style attributes — style-src 'self' blocks them"
);
const cspStyleSrc = (await read("functions/[[path]].js")).match(/"style-src ([^"]*)"/);
assert(cspStyleSrc, "the CSP should still declare a style-src directive");
assert(
  !cspStyleSrc[1].includes("unsafe-inline"),
  "style-src must not be relaxed to unsafe-inline; remove inline styles instead"
);

console.log("artist-page comparison UX verified: many / one / multi-night / weak-coverage / empty");

// --- Artist-board engagement analytics --------------------------------------
// Date filtering and opening a date's detail panel are measured through the
// existing first-party analytics endpoint, and neither duplicates the
// outbound-click counting that provider_click / /api/out already do.
const analyticsSource = await read("functions/api/analytics.js");
assert(analyticsSource.includes('"show_filter"'), "analytics should accept the date-filter engagement event");
assert(analyticsSource.includes('"event_expand"'), "analytics should accept the event-expansion engagement event");
// An allowlisted event name is only half the contract: sanitizeMetadata drops
// any key not in SAFE_METADATA_KEYS, so without these the rows would record an
// artist slug and nothing the events were added to measure.
const { sanitizeMetadata } = await import(pathToFileURL(path.join(root, "functions/api/analytics.js")));
const filterMetadata = sanitizeMetadata({
  artistSlug: "olivia-rodrigo",
  control: "city",
  hasQuery: "yes",
  city: "London",
  country: "United Kingdom",
  sort: "soonest",
  visibleCount: 11,
  totalCount: 84
});
for (const key of ["control", "hasQuery", "city", "country", "sort", "visibleCount", "totalCount"]) {
  assert(key in filterMetadata, `show_filter metadata key "${key}" must survive sanitizeMetadata`);
}
assert(filterMetadata.visibleCount === 11 && filterMetadata.totalCount === 84, "filter result counts must survive as numbers");
const expandMetadata = sanitizeMetadata({ artistSlug: "olivia-rodrigo", showId: "tm-x", panel: "price_history" });
assert(expandMetadata.panel === "price_history", "event_expand must record which panel was opened");
// The raw search string is deliberately never sent, so it can never be stored.
assert(!appJs.includes("query: state.query"), "the raw filter query must not be sent to analytics");
assert(appJs.includes('sendAnalytics("show_filter"'), "date filter use should report to the existing analytics endpoint");
assert(appJs.includes('sendAnalytics("event_expand"'), "opening a date's price-history panel should report as an expansion");
assert(
  (appJs.match(/sendAnalytics\("provider_click"/g) || []).length === 1,
  "provider CTA clicks must be counted exactly once, by the single delegated listener"
);
assert(
  !appJs.includes('sendAnalytics("outbound_click"'),
  "outbound clicks stay server-side in /api/out — the client must not double-count them"
);
console.log("artist-board engagement analytics verified: filter + expansion, no duplicate outbound counting");

// City landing pages: substantial aggregation over reviewed event records.
const cityEnv = envWithEventsJson(await read("public/data/events.json"));
const citiesIndex = await routeResponse("/cities", cityEnv);
assert(citiesIndex.response.status === 200, "/cities index should return 200");
assert(citiesIndex.nextCalled === false, "/cities index should be function-rendered, not passed to static assets");
assert(citiesIndex.text.includes("<h1 id=\"citiesTitle\">Concerts by city</h1>"), "/cities index should render the cities heading");
assert(/<meta name="robots" content="index,follow/.test(citiesIndex.text), "/cities index should be indexable");
const cityDetailSlug = (citiesIndex.text.match(/href="\/cities\/([a-z0-9-]+)"/) || [])[1];
assert(cityDetailSlug, "/cities index should link at least one substantial city detail page");
const cityDetail = await routeResponse(`/cities/${cityDetailSlug}`, cityEnv);
assert(cityDetail.response.status === 200, `/cities/${cityDetailSlug} should return 200`);
assert(cityDetail.text.includes('"@type":"Place"'), "city detail page should emit Place structured data");
// The templated city FAQ was removed, so its FAQPage mirror goes with it:
// structured data never describes content the page does not show.
assert(!cityDetail.text.includes('"@type":"FAQPage"'), "city detail page should not emit FAQPage structured data without a visible FAQ");
assert(!cityDetail.text.includes("<details>"), "city detail page should not render a templated FAQ");
assert(/href="\/artists\/[a-z0-9-]+#show-/.test(cityDetail.text), "city detail page should deep-link to artist show cards");
assert(
  extractCanonical(cityDetail.text) === `https://tourticketcompare.com/cities/${cityDetailSlug}`,
  "city detail canonical should point to the city route"
);
const missingCity = await routeResponse("/cities/no-such-city-anywhere-xyz", cityEnv);
assert(missingCity.response.status === 404, "unknown city slug should return 404");
const citySitemap = await sitemapLocs(cityEnv);
assert(citySitemap.includes("https://tourticketcompare.com/cities"), "/sitemap.xml should include the cities index when substantial cities exist");
assert(
  citySitemap.includes(`https://tourticketcompare.com/cities/${cityDetailSlug}`),
  "/sitemap.xml should include substantial city detail pages"
);
console.log("city landing-page verification passed");

// Venue landing pages: aggregation layer over verified events. Rendered from the
// real events.json so the derived slugs, indexing gate, and cross-links match
// production behaviour.
const venueEnv = envWithEventsJson(await read("public/data/events.json"));
const venuesIndex = await routeResponse("/venues", venueEnv);
assert(venuesIndex.response.status === 200, "/venues index should return 200");
assert(venuesIndex.nextCalled === false, "/venues index should be function-rendered, not passed to static assets");
assert(venuesIndex.text.includes("<h1 id=\"venuesTitle\">Concert venues</h1>"), "/venues index should render the venues heading");
assert(venuesIndex.text.includes("at least three reviewed upcoming shows across at least two artists"), "/venues should explain its substantial-content threshold");
assert(/<meta name="robots" content="index,follow/.test(venuesIndex.text), "/venues index should be indexable");
const venueDetailSlug = (venuesIndex.text.match(/href="\/venues\/([a-z0-9-]+)"/) || [])[1];
assert(venueDetailSlug, "/venues index should link at least one venue detail page");
const venueDetail = await routeResponse(`/venues/${venueDetailSlug}`, venueEnv);
assert(venueDetail.response.status === 200, `/venues/${venueDetailSlug} should return 200`);
assert(venueDetail.text.includes('"@type":"MusicVenue"'), "venue detail page should emit MusicVenue structured data");
assert(!venueDetail.text.includes('"@type":"FAQPage"'), "venue detail page should not emit FAQPage structured data without a visible FAQ");
assert(!venueDetail.text.includes("<details>"), "venue detail page should not render a templated FAQ");
assert(venueDetail.text.includes("Maintained by the TourTicketCompare editorial team."), "venue detail page should show editorial provenance");
assert(/href="\/artists\/[a-z0-9-]+"/.test(venueDetail.text), "venue detail page should link out to artist pages");
assert(/href="\/api\/out\?showId=[^\"]+&amp;provider=/.test(venueDetail.text), "venue detail page should surface a gated event-level provider CTA");
assert(
  extractCanonical(venueDetail.text) === `https://tourticketcompare.com/venues/${venueDetailSlug}`,
  "venue detail canonical should point to the venue route"
);
const missingVenue = await routeResponse("/venues/no-such-venue-anywhere-xyz", venueEnv);
assert(missingVenue.response.status === 404, "unknown venue slug should return 404");
const venueSitemap = await sitemapLocs(venueEnv);
assert(
  venueSitemap.includes("https://tourticketcompare.com/venues"),
  "/sitemap.xml should include the venues index when venues exist"
);
assert(
  venueSitemap.includes(`https://tourticketcompare.com/venues/${venueDetailSlug}`),
  "/sitemap.xml should include indexable venue detail pages"
);
console.log("venue landing-page verification passed");

// Artist-city landing pages: /artists/<artist>/tickets/<city>. Server-rendered
// aggregation over one artist's reviewed upcoming shows in one city, gated on
// the same derivation the sitemap and internal-link audit use.
const artistCityEnv = envWithEventsJson(await read("public/data/events.json"));
const artistCitiesModule = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));
const smokeIndexableArtistSlugs = artists
  .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
  .map((artist) => normalizeSlug(artist?.slug))
  .filter(Boolean);
const smokeArtistCityEntries = artistCitiesModule.deriveIndexableArtistCities(
  JSON.parse(await read("public/data/events.json")),
  smokeIndexableArtistSlugs
);
assert(smokeArtistCityEntries.length > 0, "current data should produce qualifying artist-city pages");
// Prefer a multi-show, multi-venue combination when available so the assertions
// exercise the richest path; otherwise the first qualifying entry.
const smokeArtistCity =
  smokeArtistCityEntries.find((entry) => entry.venueCount >= 2 && entry.showCount >= 2) ||
  smokeArtistCityEntries.find((entry) => entry.showCount >= 2) ||
  smokeArtistCityEntries[0];
const artistCityPath = smokeArtistCity.path;
const artistCityPage = await routeResponse(artistCityPath, artistCityEnv);
assert(artistCityPage.response.status === 200, `${artistCityPath} should return 200`);
assert(artistCityPage.nextCalled === false, `${artistCityPath} should be function-rendered, not passed to static assets`);
assert(/<meta name="robots" content="index,follow/.test(artistCityPage.text), `${artistCityPath} should be indexable`);
assert(
  extractCanonical(artistCityPage.text) === `https://tourticketcompare.com${artistCityPath}`,
  "artist-city canonical should be self-referencing"
);
assert(/<h1[^>]*>[^<]*Tickets in /.test(artistCityPage.text), "artist-city page should render the '[Artist] Tickets in [City]' H1");
assert(extractTitle(artistCityPage.text).endsWith("| Compare Prices"), "artist-city title should follow the '| Compare Prices' pattern");
assert(artistCityPage.text.includes('"@type":"Place"'), "artist-city page should emit Place structured data");
assert(artistCityPage.text.includes('"@type":"CollectionPage"'), "artist-city page should emit CollectionPage structured data");
assert(artistCityPage.text.includes('"@type":"FAQPage"'), "artist-city page should emit FAQPage structured data matching visible answers");
assert(artistCityPage.text.includes('"@type":"MusicEvent"'), "artist-city page should emit MusicEvent structured data for its publishable shows");
// The visible show board and gated schema must never leak an Offer/price node
// or a "cheapest" claim on these pages.
const artistCityLd = extractJsonLd(artistCityPage.text);
assert(artistCityLd, "artist-city JSON-LD must parse");
const artistCityTypes = artistCityLd["@graph"].map((node) => node["@type"]);
for (const forbidden of ["Offer", "Product", "AggregateRating", "Review"]) {
  assert(!artistCityTypes.includes(forbidden), `artist-city JSON-LD must not include forbidden @type "${forbidden}"`);
}
assert(!/"@type":"Offer"/.test(artistCityPage.text), "artist-city page must not emit Offer nodes in the default environment");
assert(/href="\/artists\/[a-z0-9-]+"/.test(artistCityPage.text), "artist-city page should link back to the main artist page");
assert(/href="\/api\/out\?showId=[^\"]+&amp;provider=/.test(artistCityPage.text), "artist-city page should surface the gated event-level provider CTA (affiliate tracking preserved)");
assert([...artistCityPage.text.matchAll(/<details>/g)].length >= 3, "indexable artist-city page should render visible artist-city FAQs");
// The templated "How to buy <artist> tickets in <city>" checklist was removed:
// it repeated verbatim on every artist-city page and duplicated both the artist
// page's own buying guide and /guides/how-to-compare-concert-ticket-prices.
assert(!artistCityPage.text.includes("How to buy"), "artist-city page must not reintroduce the templated local buying checklist");
assert(
  artistCityPage.text.includes('href="/guides/how-to-compare-concert-ticket-prices"'),
  "artist-city page should link the shared buying guide instead of restating it"
);

// A single-date artist-city combination renders for visitors but is
// noindex,follow and drops the repeated FAQ block and its FAQPage/MusicEvent
// schema (docs/ROUTE_INDEXABILITY_POLICY.md § Artist-city).
const smokeSingleDateArtistCity = artistCitiesModule
  .deriveRenderedArtistCities(JSON.parse(await read("public/data/events.json")), smokeIndexableArtistSlugs)
  .find((entry) => !entry.indexable);
if (smokeSingleDateArtistCity) {
  const singleDatePage = await routeResponse(smokeSingleDateArtistCity.path, artistCityEnv);
  assert(singleDatePage.response.status === 200, `${smokeSingleDateArtistCity.path} (single date) should still return 200`);
  assert(
    /<meta name="robots" content="noindex,follow"/.test(singleDatePage.text),
    `${smokeSingleDateArtistCity.path} (single date) should render noindex,follow`
  );
  assert(
    extractCanonical(singleDatePage.text) === `https://tourticketcompare.com${smokeSingleDateArtistCity.path}`,
    "single-date artist-city canonical should stay self-referencing (no cross-canonical to the artist hub)"
  );
  assert(!singleDatePage.text.includes('"@type":"FAQPage"'), "single-date artist-city page must not emit FAQPage structured data");
  assert(!singleDatePage.text.includes('"@type":"MusicEvent"'), "single-date artist-city page must not emit MusicEvent structured data");
  assert(!singleDatePage.text.includes("<details>"), "single-date artist-city page must not render the repeated FAQ block");
  assert(/<div class="show-date-badge">/.test(singleDatePage.text), "single-date artist-city page must still render its show card");
  assert(
    /href="\/artists\/[a-z0-9-]+"/.test(singleDatePage.text),
    "single-date artist-city page must still link back to the artist hub"
  );
  const singleDateSitemap = await sitemapLocs(artistCityEnv);
  assert(
    !singleDateSitemap.includes(`https://tourticketcompare.com${smokeSingleDateArtistCity.path}`),
    "single-date artist-city page must not appear in the sitemap"
  );
  console.log(`single-date artist-city noindex verification passed for ${smokeSingleDateArtistCity.path}`);
}

// Unknown artist-city slug for a real, indexable artist must 404 (no soft 404,
// no doorway page for arbitrary cities).
const unknownArtistCity = await routeResponse(`/artists/${smokeArtistCity.artistSlug}/tickets/no-such-city-anywhere-xyz`, artistCityEnv);
assert(unknownArtistCity.response.status === 404, "unknown artist-city slug should return 404");

// A real-but-inactive combination (a city the artist has played, but with no
// qualifying upcoming show) selectively 301s to the artist hub instead of
// leaving a misleading empty page.
// Compared against the *rendered* set, not the indexable set: a single-date
// combination renders 200 (noindex,follow) and must not be mistaken for an
// inactive one that redirects.
const smokeRenderedArtistCities = artistCitiesModule.deriveRenderedArtistCities(
  JSON.parse(await read("public/data/events.json")),
  smokeIndexableArtistSlugs
);
const footprintOnly = [...artistCitiesModule.artistCityFootprint(JSON.parse(await read("public/data/events.json")), smokeArtistCity.artistSlug)]
  .filter((slug) => !smokeRenderedArtistCities.some((entry) => entry.artistSlug === smokeArtistCity.artistSlug && entry.slug === slug));
if (footprintOnly.length) {
  const expiredCombo = await routeResponse(`/artists/${smokeArtistCity.artistSlug}/tickets/${footprintOnly[0]}`, artistCityEnv);
  assert(expiredCombo.response.status === 301, "an inactive but real artist-city combination should 301, not 404 or soft-404");
  assert(
    (expiredCombo.response.headers.get("location") || "").endsWith(`/artists/${smokeArtistCity.artistSlug}`),
    "an inactive artist-city combination should redirect to the artist hub"
  );
  console.log("artist-city expired-combination redirect verified");
}

// Sitemap gating: qualifying artist-city pages are included; the sitemap never
// carries a non-qualifying combination.
const artistCitySitemap = await sitemapLocs(artistCityEnv);
assert(
  artistCitySitemap.includes(`https://tourticketcompare.com${artistCityPath}`),
  "/sitemap.xml should include qualifying artist-city pages"
);
for (const slug of footprintOnly) {
  assert(
    !artistCitySitemap.includes(`https://tourticketcompare.com/artists/${smokeArtistCity.artistSlug}/tickets/${slug}`),
    "/sitemap.xml must exclude inactive artist-city combinations"
  );
}
// The main artist page must link to its active artist-city pages (crawl path).
const artistHubPage = await routeResponse(`/artists/${smokeArtistCity.artistSlug}`, artistCityEnv);
assert(
  artistHubPage.text.includes(`href="/artists/${smokeArtistCity.artistSlug}/tickets/${smokeArtistCity.slug}`),
  "main artist page should link to its active artist-city pages"
);
console.log("artist-city landing-page verification passed");

// Non-canonical-host indexability: Cloudflare serves the production deployment
// on <project>.pages.dev permanently, so that host is a crawlable duplicate of
// the live site. It must never emit an indexable page or a self-referencing
// canonical, or it competes with the apex for the same queries.
{
  const indexablePath = "/guides/seatgeek-vs-ticketmaster";
  const apex = await routeResponse(indexablePath);
  assert(
    /<meta\s+name="robots"\s+content="index,follow[^"]*"/i.test(apex.text),
    "apex host should still serve index,follow on an indexable route"
  );

  for (const previewOrigin of [
    "https://tourticketcompare.pages.dev",
    "https://a1b2c3.tourticketcompare.pages.dev"
  ]) {
    const preview = await routeResponse(indexablePath, env, previewOrigin);
    assert(
      /<meta\s+name="robots"\s+content="noindex/i.test(preview.text),
      `${previewOrigin} must serve noindex on an otherwise-indexable route`
    );
    assert(
      preview.text.includes(`<link rel="canonical" href="https://tourticketcompare.com${indexablePath}" />`),
      `${previewOrigin} must canonicalise to the apex, never to itself`
    );
    assert(
      !preview.text.includes(`href="${previewOrigin}`),
      `${previewOrigin} must not emit self-referencing absolute URLs`
    );
  }
  console.log("non-canonical host noindex + apex canonical verified");
}

// ---------------------------------------------------------------------------
// Blog gates. The internal-link and indexable-surface audits already crawl the
// blog routes; what they cannot show is that each gate holds for the reason it
// was written. Each assertion below fixes one behaviour that would otherwise be
// easy to regress silently.
// ---------------------------------------------------------------------------
{
  const blogModule = await import(pathToFileURL(path.join(root, "functions/_blog.js")));
  const blogContent = JSON.parse(await read("public/data/blog-content.json"));
  const allPosts = blogModule.derivePosts(blogContent);
  const blogSitemap = new Set((await sitemapLocs()).map((loc) => new URL(loc).pathname));

  // A draft is committed but has no route at all.
  const rawSlugs = (blogContent.posts || []).map((post) => post.slug);
  const draftSlugs = (blogContent.posts || []).filter((post) => post.status !== "published").map((post) => post.slug);
  assert(rawSlugs.length > 0, "blog content should contain at least one post");
  for (const slug of draftSlugs) {
    const draft = await routeResponse(`/blog/${slug}`);
    assert(draft.response.status === 404, `draft post /blog/${slug} must not render`);
    assert(!blogSitemap.has(`/blog/${slug}`), `draft post /blog/${slug} must not be in the sitemap`);
  }

  const indexResponse = await routeResponse("/blog");
  assert(indexResponse.response.status === 200, "/blog should return 200");
  assert(blogSitemap.has("/blog"), "/blog should be in the sitemap while it has an indexable post");

  for (const post of allPosts) {
    const page = await routeResponse(post.path);
    assert(page.response.status === 200, `${post.path} should return 200`);
    const noindex = page.text.includes('content="noindex,follow"');
    const indexable = blogModule.postIndexable(post);
    assert(indexable !== noindex, `${post.path} robots meta must match its indexability gate`);
    assert(
      blogSitemap.has(post.path) === indexable,
      `${post.path} sitemap membership must match its indexability gate`
    );
    assert(
      page.text.includes(`<link rel="canonical" href="https://tourticketcompare.com${post.path}" />`),
      `${post.path} must carry a self-referencing canonical even when noindex`
    );
  }

  // A tag page below the two-post threshold renders, stays linked, and stays
  // out of the index — the same treatment single-date artist-city pages get.
  for (const tag of blogModule.deriveTags(allPosts)) {
    const page = await routeResponse(tag.path);
    assert(page.response.status === 200, `${tag.path} should return 200`);
    assert(
      page.text.includes('content="noindex,follow"') !== tag.indexable,
      `${tag.path} robots meta must match the tag indexability gate`
    );
    assert(blogSitemap.has(tag.path) === tag.indexable, `${tag.path} sitemap membership must match its gate`);
  }

  const unknownPost = await routeResponse("/blog/not-a-real-post");
  assert(unknownPost.response.status === 404, "an unknown blog slug must 404, never render an empty shell");

  const rssModule = await import(pathToFileURL(path.join(root, "functions/blog/rss.xml.js")));
  const rss = await rssModule.onRequestGet({ request: new Request("https://tourticketcompare.com/blog/rss.xml"), env });
  const rssXml = await rss.text();
  assert(rss.status === 200, "/blog/rss.xml should return 200");
  assert(rss.headers.get("Content-Type")?.includes("application/rss+xml"), "the feed should be served as RSS");
  for (const post of allPosts) {
    const present = rssXml.includes(`<link>https://tourticketcompare.com${post.path}</link>`);
    assert(
      present === blogModule.postIndexable(post),
      `the feed should carry ${post.path} only when the site would index it`
    );
  }
  for (const slug of draftSlugs) {
    assert(!rssXml.includes(`/blog/${slug}<`), `the feed must not carry draft post ${slug}`);
  }

  // The content editor lives on its own origin so its localStorage — which
  // holds a GitHub token — is not shared with the public site and its
  // third-party tags. Both halves of that boundary are asserted here.
  const { ADMIN_ORIGIN } = routeMetadataModule;
  const adminModule = await import(pathToFileURL(path.join(root, "functions/admin.js")));

  const adminResponse = await adminModule.onRequestGet({ request: new Request(`${ADMIN_ORIGIN}/admin`) });
  assert(adminResponse.status === 200, "/admin should render the editor shell on the admin host");
  assert(adminResponse.headers.get("X-Robots-Tag")?.includes("noindex"), "/admin must be noindex");
  assert(
    /script-src 'self'/.test(adminResponse.headers.get("Content-Security-Policy") || ""),
    "/admin must load scripts only from its own origin"
  );
  const adminOnApex = await adminModule.onRequestGet({ request: new Request("https://tourticketcompare.com/admin") });
  assert(adminOnApex.status === 404, "the editor shell must not be served on the public origin");

  // Routed through the real middleware: the apex must not serve the editor, and
  // the admin host must not serve the public site (which is what would put a
  // tag-manager script on the editor's origin).
  // Every editor path, including the vendored bundle — which only reaches the
  // middleware because it is not in the _routes.json exclude list.
  for (const adminPath of ["/admin", "/admin/config.yml", "/admin/sveltia-cms.js", "/api/admin/auth", "/api/admin/callback"]) {
    const onApex = await routeResponse(adminPath);
    assert(onApex.response.status === 404, `${adminPath} must 404 on the public origin`);
  }
  for (const publicPath of ["/", "/artists", "/blog"]) {
    const onAdmin = await routeResponse(publicPath, env, ADMIN_ORIGIN);
    assert(onAdmin.response.status === 301, `${publicPath} must redirect off the editor origin`);
    assert(
      (onAdmin.response.headers.get("location") || "").startsWith("https://tourticketcompare.com"),
      `${publicPath} must redirect to the apex, keeping public pages off the editor origin`
    );
  }
  const adminRobots = await routeResponse("/robots.txt", env, ADMIN_ORIGIN);
  assert(adminRobots.text.includes("Disallow: /"), "the editor origin must disallow all crawling");
  assert((await read("public/robots.txt")).includes("Disallow: /admin"), "robots.txt must disallow /admin");

  const authModule = await import(pathToFileURL(path.join(root, "functions/api/admin/auth.js")));
  const unconfigured = await authModule.onRequestGet({
    request: new Request(`${ADMIN_ORIGIN}/api/admin/auth`),
    env: {}
  });
  assert(unconfigured.status === 503, "the editor sign-in must fail closed when the OAuth app is not configured");
  const unconfiguredBody = await unconfigured.text();
  assert(
    unconfiguredBody.includes("GITHUB_OAUTH_CLIENT_ID") && !unconfiguredBody.includes("client_secret="),
    "the unconfigured sign-in response should name the missing settings without leaking a value"
  );
  for (const badOrigin of ["https://tourticketcompare.com", "https://tourticketcompare.pages.dev"]) {
    const wrongHost = await authModule.onRequestGet({
      request: new Request(`${badOrigin}/api/admin/auth`),
      env: { GITHUB_OAUTH_CLIENT_ID: "id", GITHUB_OAUTH_CLIENT_SECRET: "secret" }
    });
    assert(wrongHost.status === 403, `the editor sign-in must refuse ${badOrigin} — a token there would share storage with the public site`);
  }

  console.log("blog + content editor verification passed (editor origin isolated)");
}

console.log("Cloudflare Pages MVP smoke checks passed");
