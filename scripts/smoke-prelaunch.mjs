import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const artistSlugs = ["beyonce", "harry-styles", "bts", "ariana-grande", "bad-bunny", "morgan-wallen", "jay-z"];
const guidePaths = [
  "/guides/how-to-compare-concert-ticket-prices",
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
  "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/when-is-the-best-time-to-buy-concert-tickets",
  "/guides/primary-vs-resale-concert-tickets"
];
const trustPaths = ["/", "/artists", "/guides", "/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure"];
const expectedH1 = new Map([
  ["/", "Find ticket options for major artists"],
  ["/artists", "Artists"],
  ["/guides", "Concert ticket buying guides"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"],
  ["/guides/how-to-compare-concert-ticket-prices", "How to compare concert ticket prices"],
  ["/guides/ticketmaster-vs-seatgeek-vs-vivid-seats", "Ticketmaster vs SeatGeek vs Vivid Seats"],
  ["/guides/how-to-avoid-overpaying-for-concert-tickets", "How to avoid overpaying for concert tickets"],
  ["/guides/when-is-the-best-time-to-buy-concert-tickets", "When is the best time to buy concert tickets?"],
  ["/guides/primary-vs-resale-concert-tickets", "Primary vs resale concert tickets"]
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
assertAbsent(
  joinedPublic,
  [
    "example.com",
    "market watch",
    "source desk",
    "feed pending",
    "preview mode",
    "debug",
    "cheapest",
    "best price",
    "best deal",
    "lowest price",
    "sold out",
    "guaranteed",
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
const index = await readJson("public/data/events-index.json");
assert(Array.isArray(events) && events.length === 0, "events.json must stay empty until verified event data exists");
assert(Array.isArray(index) && index.length === 0, "events-index.json must stay empty until verified event data exists");

const catalog = await readJson("public/data/catalog.json");
assert(catalog.artists.length === 7, "catalog should expose seven artist pages");
assert(catalog.tours.length === 0, "no tour pages should be published until verified tour records exist");
for (const slug of artistSlugs) {
  assert(catalog.artists.some((artist) => artist.slug === slug), `catalog missing artist ${slug}`);
  const ticketLinks = catalog.ticket_links.filter((link) => link.artist_slug === slug && link.provider === "ticketmaster");
  assert(ticketLinks.length === 1 && ticketLinks[0].verified === true, `catalog missing verified Ticketmaster marker for ${slug}`);
}
assert(
  catalog.providers.filter((provider) => provider.slug !== "ticketmaster").every((provider) => provider.public_enabled === false),
  "SeatGeek and Vivid Seats should remain hidden until verified links are configured"
);

const sitemapModule = await import(pathToFileURL(path.join(root, "functions/sitemap.xml.js")));
const routeModule = await import(pathToFileURL(path.join(root, "functions/[[path]].js")));
const outModule = await import(pathToFileURL(path.join(root, "functions/api/out.js")));
const healthModule = await import(pathToFileURL(path.join(root, "functions/api/health.js")));

const assetMap = new Map();
for (const file of publicUiFiles) {
  const webPath = `/${file.replace(/^public\//, "")}`;
  assetMap.set(webPath, await read(file));
}
assetMap.set("/index.html", await read("public/index.html"));

const env = {
  MOCK_MODE: "false",
  ALLOW_MOCK_PRICES: "false",
  CLICK_TRACKING_ENABLED: "true",
  IMPACT_ACCOUNT_SID: "configured-for-smoke",
  IMPACT_AUTH_TOKEN: "configured-for-smoke",
  IMPACT_DEFAULT_PROGRAM_ID: "configured-for-smoke",
  IMPACT_TICKETMASTER_PROGRAM_ID: "configured-for-smoke",
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

const sitemapResponse = await sitemapModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/sitemap.xml"),
  env
});
const sitemap = await sitemapResponse.text();
for (const pathName of trustPaths.concat(guidePaths, artistSlugs.map((slug) => `/artists/${slug}`))) {
  assert(sitemap.includes(`https://tourticketcompare.com${pathName}`), `sitemap missing ${pathName}`);
}
assert(!sitemap.includes("/artists/beyonce/tickets"), "sitemap must exclude duplicate ticket routes");
assert(!sitemap.includes("/beyonce-tickets"), "sitemap must exclude old root-level ticket routes");

for (const pathname of trustPaths.concat(guidePaths, artistSlugs.map((slug) => `/artists/${slug}`))) {
  const { response, text } = await routeResponse(pathname);
  assert(response.status === 200, `${pathname} should return 200`);
  assert(/index,follow/.test(text), `${pathname} should be indexable`);
  assert(/<link rel="canonical"/.test(text), `${pathname} should include a canonical URL`);
  assert(/<meta name="description"/.test(text), `${pathname} should include a meta description`);
  const h1 = extractH1(text);
  const expected =
    expectedH1.get(pathname) ||
    `${catalog.artists.find((artist) => `/artists/${artist.slug}` === pathname)?.name} tickets: check verified ticket options`;
  assert(h1 === expected, `${pathname} should render route-specific H1 "${expected}", got "${h1}"`);
  if (pathname !== "/") {
    assert(h1 !== "Find ticket options for major artists", `${pathname} must not reuse the homepage H1`);
  }
  if (pathname === "/artists") {
    assert(text.includes("verified destination links only"), "/artists should explain verified-destination-only pages");
  }
  if (pathname.startsWith("/artists/")) {
    assert(text.includes("Final prices, fees and availability are confirmed on the ticketing platform."), `${pathname} should show cautious provider helper text`);
    assert(text.includes("This page does not list unverified tour dates, invented prices"), `${pathname} should explain that unverified event data is not listed`);
    assert(text.includes("/affiliate-disclosure"), `${pathname} should link to the affiliate disclosure`);
  }
}

let duplicate = await routeResponse("/artists/beyonce/tickets");
assert(duplicate.response.status === 301, "/artists/beyonce/tickets should redirect to the artist page");
assert(duplicate.response.headers.get("location") === "https://tourticketcompare.com/artists/beyonce", "ticket duplicate redirect should target canonical artist page");
duplicate = await routeResponse("/beyonce-tickets-london");
assert(duplicate.response.status === 301, "old city SEO route should redirect");
assert(duplicate.response.headers.get("location") === "https://tourticketcompare.com/artists/beyonce", "old city SEO route should target canonical artist page");
const unknown = await routeResponse("/artists/beyonce/fake-tour");
assert(unknown.nextCalled || unknown.response.status === 404, "unknown tour route should not be published");
assert(unknown.response.status === 404, "unknown tour route should return a useful 404 response");
assert(extractH1(unknown.text) === "Page not found", "unknown route should render the 404 page content");
assert(/noindex,follow/.test(unknown.text), "unknown route should be noindex");

class MockStatement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql;
    this.args = [];
  }

  bind(...args) {
    this.args = args;
    return this;
  }

  async first() {
    if (this.sql.includes("SELECT count FROM rate_limits")) {
      return { count: this.db.rateLimits.get(this.args[0]) || 0 };
    }
    if (this.sql.includes("SELECT email FROM email_subscribers")) {
      const row = this.db.subscribers.get(this.args[0]);
      return row ? { email: row.email } : null;
    }
    return null;
  }

  async run() {
    if (this.sql.includes("INSERT INTO rate_limits")) {
      this.db.rateLimits.set(this.args[0], (this.db.rateLimits.get(this.args[0]) || 0) + 1);
    } else if (this.sql.includes("INSERT INTO email_subscribers")) {
      this.db.subscribers.set(this.args[0], {
        email: this.args[0],
        created_at: this.args[1],
        source_path: this.args[2],
        latest_artist_slug: this.args[3]
      });
    } else if (this.sql.includes("INSERT INTO artist_interests")) {
      this.db.artistInterests.set(`${this.args[0]}:${this.args[1]}`, {
        email: this.args[0],
        artist_slug: this.args[1]
      });
    } else if (this.sql.includes("INSERT INTO analytics_events")) {
      this.db.analytics.push({
        event_name: this.args[1],
        source_path: this.args[2],
        artist_slug: this.args[3],
        provider: this.args[9] || null,
        destination_host: this.args[11] || null
      });
    }
    return { success: true };
  }
}

class MockD1 {
  constructor() {
    this.rateLimits = new Map();
    this.subscribers = new Map();
    this.artistInterests = new Map();
    this.analytics = [];
  }

  prepare(sql) {
    return new MockStatement(this, sql);
  }
}

const healthResponse = await healthModule.onRequestGet({ env: { ...env, DEMAND_DB: new MockD1() } });
const healthJson = await healthResponse.json();
assert(healthResponse.status === 200, "/api/health should return 200");
assert(healthJson.ok === true && healthJson.service === "tourticketcompare", "/api/health should report app status");
assert(healthJson.config.mockMode === false && healthJson.config.allowMockPrices === false, "/api/health should report safe public config");
assert(healthJson.bindings.demandDb === true, "/api/health should report whether DEMAND_DB is bound");
assert(!JSON.stringify(healthJson).includes("configured-for-smoke"), "/api/health must not expose secret/config values");

async function out(pathname, method = "GET", payload = null, db = new MockD1()) {
  return outModule[method === "GET" ? "onRequestGet" : "onRequestPost"]({
    request: new Request(`https://tourticketcompare.com${pathname}`, {
      method,
      headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10", "user-agent": "smoke-test" },
      body: payload ? JSON.stringify(payload) : undefined,
      redirect: "manual"
    }),
    env: { DEMAND_DB: db }
  });
}

const expectedTicketmaster = {
  beyonce: "https://ticketmaster.evyy.net/beyonce",
  "harry-styles": "https://ticketmaster.evyy.net/vD4B5y",
  bts: "https://ticketmaster.evyy.net/OY9gkr",
  "ariana-grande": "https://ticketmaster.evyy.net/bkDx6b",
  "bad-bunny": "https://ticketmaster.evyy.net/zzeEWW",
  "morgan-wallen": "https://ticketmaster.evyy.net/morganwallenus",
  "jay-z": "https://ticketmaster.evyy.net/5kM6W3"
};

for (const [slug, expected] of Object.entries(expectedTicketmaster)) {
  const db = new MockD1();
  const response = await out(`/api/out?artistSlug=${slug}&provider=ticketmaster&sourcePath=/artists/${slug}`, "GET", null, db);
  assert(response.status === 302, `/api/out GET should redirect for ${slug}`);
  assert(response.headers.get("location") === expected, `/api/out should return expected Ticketmaster URL for ${slug}`);
  assert(db.analytics.some((event) => event.event_name === "outbound_click" && event.artist_slug === slug), "outbound click should be tracked");
}

let response = await out("/api/out?artistSlug=beyonce&provider=seatgeek");
assert(response.status === 400, "unconfigured SeatGeek should fail");
response = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=https%3A%2F%2Fexample.com");
assert(response.status === 400, "example.com destination should fail");
response = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=http%3A%2F%2Flocalhost%3A3000");
assert(response.status === 400, "localhost destination should fail");
response = await out("/api/out?artistSlug=beyonce&provider=ticketmaster&deepLink=https%3A%2F%2Fmalicious.invalid%2F");
assert(response.status === 400, "unknown destination domain should fail");
response = await out("/api/out", "POST", { artistSlug: "beyonce", provider: "ticketmaster" });
const json = await response.json();
assert(response.status === 200 && json.redirectUrl === expectedTicketmaster.beyonce, "POST /api/out should keep JSON compatibility");

console.log("SEO affiliate smoke checks passed");
