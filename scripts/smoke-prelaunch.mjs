import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artistSlugs = ["beyonce", "harry-styles", "bts", "ariana-grande", "bad-bunny", "morgan-wallen", "jay-z"];
const publicRoutes = ["/", "/artists", "/guides", "/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const expectedH1 = new Map([
  ["/", "2026/27 stadium tour market watch"],
  ["/artists", "Artists"],
  ["/guides", "Concert ticket buying guides"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"]
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

const joinedPublic = (await Promise.all(publicUiFiles.map((file) => read(file)))).join("\n");
assert(joinedPublic.includes("2026/27 stadium tour market watch"), "homepage MVP copy should be present");
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

const routeModule = await import(pathToFileURL(path.join(root, "functions/[[path]].js")));
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
  const response = await routeModule.onRequest({
    request: new Request(`https://tourticketcompare.com${pathname}`),
    env,
    next: () => {
      nextCalled = true;
      return new Response("next", { status: 404 });
    }
  });
  return { response, text: await response.text(), nextCalled };
}

for (const pathname of publicRoutes.concat(artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);
  assert(/<link rel="canonical"/.test(text), `${pathname} should include a canonical URL`);
  assert(/<meta name="description"/.test(text), `${pathname} should include a meta description`);
  const h1 = extractH1(text);
  const expected = expectedH1.get(pathname) || `${catalog.artists.find((artist) => `/artists/${artist.slug}` === pathname)?.name} stadium tour watch`;
  assert(h1 === expected, `${pathname} should render route-specific H1 "${expected}", got "${h1}"`);
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
const appJs = await read("public/app.js");
assert(appJs.includes("showEventCta"), "artist show cards should support event-specific CTAs");
assert(appJs.includes("No verified ticket link is available for this specific date yet."), "event cards should have a safe unavailable state");
assert(!appJs.includes("renderProviderButtons(artist, \"artist_hero\")"), "artist pages should not render a separate generic provider panel");

const bulkPriceResponse = await showsModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/api/shows?includePrices=true"),
  env
});
assert(bulkPriceResponse.status === 400, "bulk includePrices must be rejected without showId");

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

async function out(pathname, method = "GET", payload = null) {
  return outModule[method === "GET" ? "onRequestGet" : "onRequestPost"]({
    request: new Request(`https://tourticketcompare.com${pathname}`, {
      method,
      headers: { "content-type": "application/json", "user-agent": "smoke-test" },
      body: payload ? JSON.stringify(payload) : undefined,
      redirect: "manual"
    }),
    env: {}
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

console.log("Cloudflare Pages MVP smoke checks passed");
