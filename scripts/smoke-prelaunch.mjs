import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artistSlugs = ["beyonce", "harry-styles", "bts", "ariana-grande", "bad-bunny", "morgan-wallen", "jay-z"];
const publicRoutes = ["/", "/artists", "/guides", "/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const functionBackedStaticRoutes = ["/artists", "/guides", "/how-it-works", "/editorial-policy", "/affiliate-disclosure", "/about", "/contact"];
const functionBackedWildcardRoutes = ["/artists/*", "/guides/*"];
const expectedH1 = new Map([
  ["/", "Find verified ticket links and buying guidance for major tours"],
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
const routeMarkers = new Map([
  ["/artists", "Ticket buttons appear only when the destination has been checked"],
  ["/guides", "Compare the final checkout total after fees"],
  ["/how-it-works", "Affiliate links are handled safely"],
  ["/editorial-policy", "official artist, ticketing, and approved affiliate sources"],
  ["/affiliate-disclosure", "Affiliate relationships do not control which links we show"],
  ["/about", "avoid fake prices"],
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

function assertAbsent(haystack, terms, label) {
  const lower = haystack.toLowerCase();
  const found = terms.filter((term) => lower.includes(term.toLowerCase()));
  assert(found.length === 0, `${label} contains blocked term(s): ${found.join(", ")}`);
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

const joinedPublic = (await Promise.all(publicUiFiles.concat(["functions/[[path]].js"]).map((file) => read(file)))).join("\n");
assert(
  joinedPublic.includes("Find verified ticket links and buying guidance for major tours"),
  "homepage public-facing copy should be present"
);
await assertPublicCopySafe(publicCopyFiles);
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
    "ticketmaster.evyy.net"
  ],
  "public files"
);
assert(!/innerHTML|insertAdjacentHTML|document\.write/.test(await read("public/app.js")), "app.js must avoid unsafe HTML injection");

const events = await readJson("public/data/events.json");
assert(Array.isArray(events), "events.json must be an array");
const eventsWithSeatGeekUrl = events.filter((event) => String(event?.seatgeek_url || "").trim());
assert(eventsWithSeatGeekUrl.length <= 1, "events.json may contain at most one controlled event-level SeatGeek URL");
if (eventsWithSeatGeekUrl.length === 1) {
  const [seatGeekEvent] = eventsWithSeatGeekUrl;
  assert(seatGeekEvent.id === CONTROLLED_SEATGEEK_SHOW_ID, "only the controlled Morgan Wallen Gainesville show may have a SeatGeek URL");
  assert(seatGeekEvent.seatgeek_url === CONTROLLED_SEATGEEK_URL, "controlled SeatGeek URL must match the verified event URL");
}
assert(
  events.every((event) => event.id === CONTROLLED_SEATGEEK_SHOW_ID || !String(event?.seatgeek_url || "").trim()),
  "all non-controlled events must keep top-level seatgeek_url empty"
);
const catalog = await readJson("public/data/catalog.json");
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

const catchAllModule = await import(pathToFileURL(path.join(root, "functions/[[path]].js")));
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
  const response = await catchAllModule.onRequest({
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

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text } = await routeResponse(pathname);
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

  // Meta description: tag must be present and non-empty
  const actualDescription = extractDescription(text);
  assert(actualDescription !== "", `${pathname} should include a meta description`);
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
const morganShows = showsJson.shows.filter((show) => show.artist_slug === "morgan-wallen");
assert(morganShows.length === 16, "/api/shows should expose the sixteen current/upcoming verified Morgan Wallen events");
for (const show of morganShows) {
  assert(show.ticketmaster_url && show.ticketmaster_url.includes(`/event/${show.ticketmaster_event_id}`), `${show.id} should use its exact event-specific Ticketmaster URL`);
  assert(!JSON.stringify(show).match(/example\.com|placeholder|ticketmaster\.evyy|price/i), `${show.id} should not expose placeholders, artist affiliate URLs, or prices`);
}
const verifiedMorganShow = morganShows[0];
const controlledSeatGeekShow = morganShows.find((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID);
assert(controlledSeatGeekShow, "Morgan Wallen shows should include the controlled SeatGeek test event");
const nonSeatGeekMorganShow = morganShows.find((show) => show.id !== CONTROLLED_SEATGEEK_SHOW_ID);
assert(nonSeatGeekMorganShow, "Morgan Wallen shows should include a non-controlled event without SeatGeek URL");
assert(controlledSeatGeekShow.seatgeek_url === CONTROLLED_SEATGEEK_URL, "/api/shows should expose the controlled SeatGeek URL only on the test event");
assert(morganShows.every((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID || !String(show.seatgeek_url || "").trim()), "Morgan Wallen shows should not expose SeatGeek URLs on non-controlled events");
const seatGeekConfiguredEnv = {
  ...env,
  IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
  IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
  IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
};
const configuredShowsResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?artistSlug=morgan-wallen"),
  env: seatGeekConfiguredEnv
});
const configuredShowsJson = await configuredShowsResponse.json();
assert(configuredShowsJson.providerAvailability?.seatgeek === true, "/api/shows should expose only a safe true SeatGeek availability flag when configured");
const serverMorganWithSeatGeek = await routeResponse("/artists/morgan-wallen", seatGeekConfiguredEnv);
assert((serverMorganWithSeatGeek.text.match(/Check SeatGeek/g) || []).length === 1, "server-rendered Morgan Wallen page should show exactly one SeatGeek CTA when configured");
assert(serverMorganWithSeatGeek.text.includes(`showId=${encodeURIComponent(CONTROLLED_SEATGEEK_SHOW_ID)}&amp;provider=seatgeek`), "server-rendered SeatGeek CTA should target the controlled show through /api/out");
assert(serverMorganWithSeatGeek.text.includes("Prices, fees and availability are confirmed on SeatGeek."), "server-rendered SeatGeek CTA should include safe supporting copy");
const serverMorganWithoutSeatGeek = await routeResponse("/artists/morgan-wallen");
assert(!serverMorganWithoutSeatGeek.text.includes("Check SeatGeek"), "server-rendered SeatGeek CTA should stay hidden without SeatGeek Impact config");
const appJs = await read("public/app.js");
assert(appJs.includes("showEventCta"), "artist show cards should support event-specific CTAs");
assert(appJs.includes("/api/out?"), "artist show cards should route event CTAs through /api/out");
assert(appJs.includes("showId"), "artist show card CTAs should include showId");
assert(appJs.includes("safeSeatGeekEventUrl"), "hydrated artist show cards should validate SeatGeek event URLs");
assert(appJs.includes("providerAvailability?.seatgeek"), "hydration should use the safe SeatGeek availability flag from /api/shows");
assert(appJs.includes("Check SeatGeek"), "hydration should preserve the SeatGeek CTA for the controlled event when configured");
assert(appJs.includes("Prices, fees and availability are confirmed on SeatGeek."), "hydration should preserve the safe SeatGeek supporting copy");
assert(appJs.includes("No event-specific ticket link is available for this date yet."), "event cards should have a safe unavailable state");
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
outResponse = await out("/api/out?artistSlug=beyonce&provider=seatgeek");
assert(outResponse.status === 400, "SeatGeek redirect should fail safely without Impact tracking configured (IMPACT_SEATGEEK_PROGRAM_ID not set)");
outResponse = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com");
assert(outResponse.status === 400, "example.com destination should fail");
outResponse = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=http%3A%2F%2Flocalhost%3A3000");
assert(outResponse.status === 400, "localhost destination should fail");
outResponse = await out("/api/out", "POST", { artistSlug: "beyonce", provider: "ticketmaster" });
const outJson = await outResponse.json();
assert(outResponse.status === 200 && outJson.redirectUrl, "POST /api/out should keep JSON compatibility");
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&sourcePath=/artists/morgan-wallen`);
assert(outResponse.status === 302, "showId /api/out should redirect verified Ticketmaster event routes");
assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "showId /api/out should use the exact stored event-specific Ticketmaster URL");
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com`);
assert(outResponse.status === 302, "showId /api/out should ignore arbitrary deepLink values when the stored event URL is verified");
assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "showId /api/out must not redirect to user-supplied deepLink values");
const originalFetch = globalThis.fetch;
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
assert(unconfiguredSeatGeekShowJson.status === "provider_not_configured", "controlled SeatGeek showId should report provider_not_configured when SeatGeek Impact credentials are missing");

const seatGeekTrackingUrl = "https://seatgeek.com/impact-tracked/morgan-wallen";
try {
  globalThis.fetch = async () => {
    throw new Error("SeatGeek should not call external APIs without SeatGeek-specific Impact account credentials");
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_ACCOUNT_SID: "legacy-account",
      IMPACT_AUTH_TOKEN: "legacy-token",
      IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
      IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program",
      IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
    }
  );
  assert(outResponse.status === 400, "SeatGeek must not fall back to generic or Ticketmaster Impact credentials");
  const missingSpecificSeatGeekJson = await outResponse.json();
  assert(missingSpecificSeatGeekJson.status === "provider_not_configured", "SeatGeek should report missing provider config without SeatGeek-specific Impact account credentials");

  let seatGeekImpactCalled = false;
  globalThis.fetch = async (request, options = {}) => {
    const requestUrl = new URL(String(request.url || request));
    assert(requestUrl.hostname !== "api.seatgeek.com", "SeatGeek showId /api/out must not use broad SeatGeek API search fallback");
    assert(requestUrl.hostname === "api.impact.com", "SeatGeek tracking should call Impact with the controlled event URL");
    seatGeekImpactCalled = true;
    assert(requestUrl.pathname.includes("/Mediapartners/sg-account/Programs/sg-program/TrackingLinks"), "SeatGeek Impact request should use SeatGeek credentials");
    assert(requestUrl.searchParams.get("DeepLink") === CONTROLLED_SEATGEEK_URL, "SeatGeek Impact DeepLink should be the controlled SeatGeek event URL");
    assert(!requestUrl.pathname.includes("tm-account") && !requestUrl.pathname.includes("legacy-account"), "SeatGeek Impact request must not use Ticketmaster or generic account IDs");
    assert(options.headers?.Authorization === `Basic ${Buffer.from("sg-account:sg-token").toString("base64")}`, "SeatGeek Impact request should use SeatGeek basic auth");
    return new Response(JSON.stringify({ TrackingURL: seatGeekTrackingUrl }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };
  outResponse = await out(
    `/api/out?showId=${encodeURIComponent(controlledSeatGeekShow.id)}&provider=seatgeek`,
    "GET",
    null,
    {
      ...env,
      IMPACT_ACCOUNT_SID: "legacy-account",
      IMPACT_AUTH_TOKEN: "legacy-token",
      IMPACT_TICKETMASTER_ACCOUNT_SID: "tm-account",
      IMPACT_TICKETMASTER_AUTH_TOKEN: "tm-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "tm-program",
      IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
      IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token",
      IMPACT_SEATGEEK_PROGRAM_ID: "sg-program"
    }
  );
  assert(seatGeekImpactCalled, "SeatGeek configured path should call SeatGeek Impact tracking");
  assert(outResponse.status === 302, "SeatGeek configured showId /api/out should redirect");
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

// Verify SeatGeek CTA visibility rules
// Rule 1: SeatGeek CTA requires SeatGeek Impact config + an event-level verified SeatGeek URL.

// Test 1: Credentials present, Impact program present, but no event-level SeatGeek URL
outResponse = await out(`/api/out?showId=${encodeURIComponent(nonSeatGeekMorganShow.id)}&provider=seatgeek`);
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

// Test 5: controlled SeatGeek event URL is allowed, but only for the approved show.
assert(controlledSeatGeekShow.seatgeek_url === CONTROLLED_SEATGEEK_URL, "controlled SeatGeek event URL should remain available for the approved test show");
assert(morganShows.every((show) => show.id === CONTROLLED_SEATGEEK_SHOW_ID || !String(show.seatgeek_url || "").trim()), "SeatGeek event URLs should remain hidden for every non-controlled Morgan Wallen show");

console.log("SeatGeek visibility gating verified: controlled event only");

console.log("Cloudflare Pages MVP smoke checks passed");
