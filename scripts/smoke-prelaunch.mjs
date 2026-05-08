import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artistSlugs = ["beyonce", "harry-styles", "bts", "ariana-grande", "bad-bunny", "morgan-wallen", "jay-z"];
const publicRoutes = ["/", "/artists", "/guides", "/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const functionBackedStaticRoutes = ["/artists", "/guides", "/how-it-works", "/editorial-policy", "/affiliate-disclosure", "/about", "/contact"];
const functionBackedWildcardRoutes = ["/artists/*", "/guides/*"];
const expectedH1 = new Map([
  ["/", "Find verified ticket options for major tours"],
  ["/artists", "Artist watchlist"],
  ["/guides", "Ticket buying guides"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact TourTicketCompare"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"]
]);
const routeMarkers = new Map([
  ["/artists", "Ticket buttons appear only when the destination has been checked"],
  ["/guides", "Live price comparison is coming later"],
  ["/how-it-works", "affiliate links are handled safely"],
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
    { label: "guaranteed claim", pattern: /\bguaranteed\b/i },
    { label: "available now claim", pattern: /\bavailable\s+now\b/i },
    {
      label: "live prices claim",
      pattern: /\blive\s+prices\b/i,
      allowedContext: /\b(coming later|not yet|planned|not available|is not ready|being built)\b/i
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

const joinedPublic = (await Promise.all(publicUiFiles.map((file) => read(file)))).join("\n");
assert(
  joinedPublic.includes("Find verified ticket options for major tours"),
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

async function routeResponse(pathname) {
  let nextCalled = false;
  const response = await catchAllModule.onRequest({
    request: new Request(`https://tourticketcompare.com${pathname}`),
    env,
    next: () => {
      nextCalled = true;
      return new Response("next", { status: 404 });
    }
  });
  return { response, text: await response.text(), nextCalled };
}

for (const pathname of ["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/data/events.json", "/api/health"]) {
  const { response, nextCalled } = await routeResponse(pathname);
  assert(nextCalled === true, `${pathname} should pass through middleware unchanged`);
  assert(response.status === 404, `${pathname} smoke middleware next sentinel should return 404`);
}

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);
  assert(/<link rel="canonical"/.test(text), `${pathname} should include a canonical URL`);
  assert(/<meta name="description"/.test(text), `${pathname} should include a meta description`);
  const h1 = extractH1(text);
  const expected = expectedH1.get(pathname) || `${catalog.artists.find((artist) => `/artists/${artist.slug}` === pathname)?.name} stadium tour watch`;
  assert(h1 === expected, `${pathname} should render route-specific H1 "${expected}", got "${h1}"`);
  if (functionBackedStaticRoutes.includes(pathname)) {
    assert(h1 !== expectedH1.get("/"), `${pathname} should not return the homepage H1 in raw HTML`);
    assert(text.includes(routeMarkers.get(pathname)), `${pathname} should include route-specific raw HTML content`);
  }
}

const unknownArtist = await routeResponse("/artists/not-a-real-artist");
assert(unknownArtist.response.status === 404, "unknown artist route should return 404");
assert(/noindex,follow/.test(unknownArtist.text), "unknown artist route should be noindex");
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
const morganShows = showsJson.shows.filter((show) => show.artist_slug === "morgan-wallen");
assert(morganShows.length === 18, "/api/shows should expose the eighteen current/upcoming verified Morgan Wallen events");
for (const show of morganShows) {
  assert(show.ticketmaster_url && show.ticketmaster_url.includes(`/event/${show.ticketmaster_event_id}`), `${show.id} should use its exact event-specific Ticketmaster URL`);
  assert(!JSON.stringify(show).match(/example\.com|placeholder|ticketmaster\.evyy|price/i), `${show.id} should not expose placeholders, artist affiliate URLs, or prices`);
}
const verifiedMorganShow = morganShows[0];
const appJs = await read("public/app.js");
assert(appJs.includes("showEventCta"), "artist show cards should support event-specific CTAs");
assert(appJs.includes("/api/out?"), "artist show cards should route event CTAs through /api/out");
assert(appJs.includes("showId"), "artist show card CTAs should include showId");
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
assert(outResponse.status === 400, "unconfigured SeatGeek should fail");
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
    assert(!url.toString().includes("example.com"), "Impact request must not use request-supplied example.com deep links");
    assert(options.headers?.Authorization?.startsWith("Basic "), "Impact request should use server-side basic auth");
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
      IMPACT_ACCOUNT_SID: "test-account",
      IMPACT_AUTH_TOKEN: "test-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "test-program"
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
      IMPACT_ACCOUNT_SID: "test-account",
      IMPACT_AUTH_TOKEN: "test-token",
      IMPACT_TICKETMASTER_PROGRAM_ID: "test-program"
    }
  );
  assert(outResponse.status === 302, "Unsafe Impact TrackingURL should not block verified event redirects");
  assert(outResponse.headers.get("location") === verifiedMorganShow.ticketmaster_url, "Unsafe Impact TrackingURL should fall back to the exact stored Ticketmaster event URL");
} finally {
  globalThis.fetch = originalFetch;
}
outResponse = await out("/api/out?showId=unknown&provider=ticketmaster");
assert(outResponse.status === 400, "unknown showId should fail safely");
outResponse = await out(`/api/out?showId=${encodeURIComponent(verifiedMorganShow.id)}&provider=seatgeek`);
assert(outResponse.status === 400, "unconfigured showId provider should fail safely");

console.log("Cloudflare Pages MVP smoke checks passed");
