// Tests for artist price guides (/artists/<artist>/ticket-prices).
//
// Three parts: the pure derivation and gate (functions/_price-guides.js), the
// price-move rule (functions/_event-price-moves.js), and real renders through
// the middleware with a fake D1 attached. The crawl-based audits render with no
// DEMAND_DB binding, so they only ever see the price-free variant of the page;
// every priced assertion here is this feature's only coverage.
//
// Run standalone (node scripts/price-guides.test.mjs) and in test:quick.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`price-guides: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const guides = await load("functions/_price-guides.js");
const moves = await load("functions/_event-price-moves.js");
const policy = await load("functions/_route-indexability.js");
const router = await load("functions/[[path]].js");
const middlewareModule = await load("functions/_middleware.js");
const { CTA_LOCATIONS, classifyPageType } = await load("functions/_funnel.js");

// ─── part 1: derivation and gate ────────────────────────────────────────────

assert(
  JSON.stringify([...guides.PRICE_GUIDE_SNAPSHOT_PROVIDERS].sort()) ===
    JSON.stringify([...router.SCHEMA_OFFERS_APPROVED_PROVIDERS].sort()),
  "the snapshot-ready lanes match the lanes with owner-confirmed price display rights"
);
assert(guides.priceGuidePath("Oasis") === "/artists/oasis/ticket-prices", "one URL per artist, no year and no tour");
assert(guides.PRICE_GUIDE_ARTISTS.every((slug) => /^[a-z0-9-]+$/.test(slug)), "registry entries are slugs");
assert(new Set(guides.PRICE_GUIDE_ARTISTS).size === guides.PRICE_GUIDE_ARTISTS.length, "registry entries are unique");
{
  const catalog = JSON.parse(await read("public/data/catalog.json"));
  const slugs = new Set((catalog.artists || []).map((artist) => artist.slug));
  assert(guides.PRICE_GUIDE_ARTISTS.every((slug) => slugs.has(slug)), "every registered guide names a catalog artist");
}

{
  const gate = policy.priceGuideGate({ showCount: 6, cityCount: 2, publishableCount: 6, snapshotReadyCount: 3 });
  assert(gate.indexable && gate.reasons.length === 0, "a multi-city run with snapshot-ready dates is indexable");
  const thin = policy.priceGuideGate({ showCount: 5, cityCount: 1, publishableCount: 5, snapshotReadyCount: 2 });
  assert(!thin.indexable, "a short single-city run is not indexable");
  for (const reason of ["below_show_threshold", "below_city_threshold", "below_price_coverage_threshold"]) {
    assert(thin.reasons.includes(reason), `the gate reports ${reason}`);
  }
}

// ─── part 2: price moves ────────────────────────────────────────────────────

{
  const lane = { provider: "vivid-seats", name: "Vivid Seats", price: 180, currency: "USD", fetchedAt: "2026-08-09T10:00:00Z" };
  const move = moves.derivePriceMove(lane, [
    { price: 180, currency: "USD", observedAt: "2026-08-05T10:00:00Z" },
    { price: 240, currency: "USD", observedAt: "2026-08-01T10:00:00Z" }
  ]);
  assert(move && move.direction === "down" && move.delta === -60, "a lower current price is a move down by the difference");
  assert(move.from === 240 && move.fromObservedAt === "2026-08-01T10:00:00Z", "the previous figure keeps its own observation time");
  assert(move.changedAt === "2026-08-05T10:00:00Z", "the change is dated to when the current price was first recorded");
  assert(move.name === "Vivid Seats", "a move keeps its provider attribution");

  const lagging = moves.derivePriceMove(lane, [{ price: 150, currency: "USD", observedAt: "2026-08-03T10:00:00Z" }]);
  assert(lagging?.direction === "up" && lagging.changedAt === lane.fetchedAt, "history behind the cache dates the move to the capture time");

  assert(moves.derivePriceMove(lane, [{ price: 180, currency: "USD", observedAt: "2026-08-01T10:00:00Z" }]) === null, "an unchanged price is not a move");
  assert(moves.derivePriceMove(lane, [{ price: 99, currency: "EUR", observedAt: "2026-08-01T10:00:00Z" }]) === null, "another currency is never compared");
  assert(moves.derivePriceMove(lane, [{ price: 3.8, currency: "USD", observedAt: "2026-08-01T10:00:00Z" }]) === null, "an implausible row is floored out");
  assert(moves.derivePriceMove(lane, []) === null, "no history, no move");
}

// ─── part 3: rendered routes ────────────────────────────────────────────────

const ARTIST = { slug: "oasis", name: "Oasis" };
assert(guides.priceGuideRegistered(ARTIST.slug), "the fixture artist has an approved guide");

function fixtureEvent({ id, city, venue, iso, onsale = "" }) {
  const tm = `https://www.ticketmaster.com/event/${id.toUpperCase()}`;
  const numeric = String(Math.abs([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) % 9000000 + 1000000);
  const vivid = `https://www.vividseats.com/fixture-${city.toLowerCase()}--concerts-pop/production/${numeric}`;
  const tn = `https://www.ticketnetwork.com/en/p/${numeric}`;
  return {
    id,
    artist_slug: ARTIST.slug,
    artist_name: ARTIST.name,
    event_name: `${ARTIST.name}: Fixture Tour`,
    city,
    country: "United Kingdom",
    venue,
    datetime_iso: iso,
    timezone: "Europe/London",
    tour_name: "",
    status: onsale ? "announced" : "on-sale",
    public_onsale_at: onsale,
    ticketmaster_event_id: id.toUpperCase(),
    ticketmaster_url: tm,
    vividseats_url: vivid,
    ticketnetwork_url: tn,
    source_type: "ticketmaster",
    source_url: tm,
    last_verified_at: "2026-08-01",
    provider_links: {
      ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01" },
      "vivid-seats": { event_id: Number(numeric), url: vivid, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" },
      ticketnetwork: { event_id: numeric, url: tn, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" }
    },
    verification_status: "human_verified"
  };
}

const EVENTS = [
  fixtureEvent({ id: "pg-man-1", city: "Manchester", venue: "Heaton Park", iso: "2026-09-11T18:00:00Z" }),
  fixtureEvent({ id: "pg-man-2", city: "Manchester", venue: "Heaton Park", iso: "2026-09-12T18:00:00Z" }),
  fixtureEvent({ id: "pg-man-3", city: "Manchester", venue: "Heaton Park", iso: "2026-09-13T18:00:00Z" }),
  fixtureEvent({ id: "pg-lon-1", city: "London", venue: "Wembley Stadium", iso: "2026-09-18T18:00:00Z" }),
  fixtureEvent({ id: "pg-lon-2", city: "London", venue: "Wembley Stadium", iso: "2026-09-19T18:00:00Z" }),
  fixtureEvent({ id: "pg-cdf-1", city: "Cardiff", venue: "Principality Stadium", iso: "2026-10-02T18:00:00Z", onsale: "2026-08-20T09:00:00Z" }),
  // Past: must never appear.
  fixtureEvent({ id: "pg-past", city: "Dublin", venue: "Croke Park", iso: "2026-07-01T18:00:00Z" })
];

const snapshot = (eventId, provider, price, currency = "GBP") => ({
  event_id: eventId,
  provider,
  low_price: price,
  currency,
  verified_at: "2026-08-09T09:00:00Z",
  expires_at: "2026-08-10T09:00:00Z",
  source: provider === "vivid-seats" ? "vividseats_impact_marketplace_api" : "ticketnetwork_impact_marketplace_api"
});
// Two dates priced very differently, so any cross-date minimum or range would
// show up as a figure that belongs to neither.
const PRICE_ROWS = [
  snapshot("pg-man-1", "vivid-seats", 182),
  snapshot("pg-man-1", "ticketnetwork", 210),
  snapshot("pg-lon-1", "vivid-seats", 420),
  snapshot("pg-lon-1", "ticketnetwork", 395)
];
const HISTORY_ROWS = [
  // pg-man-1 on Vivid Seats: 240 → 182, the current price first recorded 5 Aug.
  { event_id: "pg-man-1", provider: "vivid-seats", currency: "GBP", low_price: 182, observed_at: "2026-08-05T09:00:00Z" },
  { event_id: "pg-man-1", provider: "vivid-seats", currency: "GBP", low_price: 240, observed_at: "2026-08-01T09:00:00Z" },
  // pg-lon-1 on TicketNetwork (its lowest lane): 350 → 395.
  { event_id: "pg-lon-1", provider: "ticketnetwork", currency: "GBP", low_price: 395, observed_at: "2026-08-07T09:00:00Z" },
  { event_id: "pg-lon-1", provider: "ticketnetwork", currency: "GBP", low_price: 350, observed_at: "2026-07-30T09:00:00Z" }
];

function fakeDb() {
  return {
    prepare(sql) {
      return {
        bind(...bindings) {
          return {
            async all() {
              const wanted = new Set(bindings.map(String));
              if (/provider_pricing_cache/.test(sql)) return { results: PRICE_ROWS.filter((row) => wanted.has(row.event_id)) };
              // The move query (ROW_NUMBER over the window): newest rows per series.
              if (/ROW_NUMBER\(\)/.test(sql)) {
                const windowStart = String(bindings.at(-1));
                return { results: HISTORY_ROWS.filter((row) => wanted.has(row.event_id) && row.observed_at >= windowStart) };
              }
              return { results: [] };
            }
          };
        }
      };
    }
  };
}

// A D1 whose every read throws: the cache read failing must leave every card in
// the "never queried" state, so the page says nothing about prices at all.
function failingDb() {
  return {
    prepare() {
      return {
        bind() {
          return {
            async all() {
              throw new Error("D1 unavailable");
            }
          };
        }
      };
    }
  };
}

const baseAssets = new Map();
for (const file of ["index.html", "data/catalog.json", "data/artists.json", "data/guides-content.json", "data/blog-content.json", "data/provider-configs.json"]) {
  baseAssets.set(`/${file}`, await read(`public/${file}`));
}
baseAssets.set("/", baseAssets.get("/index.html"));

function env({ withDb, events = EVENTS }) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(events));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    IMPACT_SEATGEEK_ACCOUNT_SID: "fixture-sid",
    IMPACT_SEATGEEK_AUTH_TOKEN: "fixture-token",
    IMPACT_SEATGEEK_CAMPAIGN_ID: "1234",
    IMPACT_ACCOUNT_SID: "fixture-sid",
    IMPACT_AUTH_TOKEN: "fixture-token",
    IMPACT_VIVIDSEATS_CAMPAIGN_ID: "5678",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true",
    TICKETNETWORK_PUBLIC_ENABLED: "true",
    TICKETNETWORK_PRICE_DISPLAY_ENABLED: "true",
    ...(withDb === "failing" ? { DEMAND_DB: failingDb() } : withDb ? { DEMAND_DB: fakeDb() } : {}),
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, options = { withDb: true }) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: env(options),
    next: () => new Response("static-asset", { status: 200 })
  });
  const html = await response.text();
  return {
    status: response.status,
    location: response.headers.get("location") || "",
    html,
    main: (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "",
    robots: (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "",
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "",
    description: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ""
  };
}

const text = (html) =>
  String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const GUIDE_PATH = "/artists/oasis/ticket-prices";

{
  const page = await render(GUIDE_PATH);
  assert(page.status === 200, "an approved guide renders");
  assert(page.robots.startsWith("index,follow"), "a guide passing its gate is indexable");
  assert(page.title.startsWith("Oasis 2026 Ticket Prices"), "the title carries the year read off the upcoming dates");
  assert(!/[£$€]\s?\d/.test(page.title + page.description), "no figure in the title or description");

  const body = text(page.main);
  assert(body.includes("Face value: the official ticket price"), "the page answers the face-value question");
  assert(body.includes("has no approved source for face-value prices"), "and says plainly that it prints no face value");
  assert(body.includes("£182") && body.includes("£395"), "each date keeps its own lowest listed price");
  assert(!body.includes("£210") && !body.includes("£420"), "only the same-event lowest lane is printed as the answer");
  assert(!/\bfrom £\d/i.test(body) && !/cheapest date/i.test(body) && !/price range/i.test(body), "no cross-date minimum, range or cheapest date");
  assert(!body.includes("Dublin"), "past dates never appear");
  assert(body.includes("Public on-sale"), "a date before its public on-sale says so");
  assert(body.includes("2 of 6 dates show a listed resale price right now"), "the at-a-glance count covers the checked dates");

  // Moves: one per priced date, attributed, newest change first.
  assert(body.includes("Vivid Seats down £58: £240 when recorded 1 Aug 2026, now £182 since 5 Aug 2026"), "a fall is stated with its provider, size, previous figure and dates");
  assert(body.includes("TicketNetwork up £45: £350 when recorded 30 Jul 2026, now £395"), "a rise is stated the same way");
  assert(body.indexOf("TicketNetwork up £45") < body.indexOf("Vivid Seats down £58"), "moves are ordered by when the price changed");
  assert(body.includes("1 lower and 1 higher"), "the summary counts per-date moves");

  // Every priced button is the tracked /api/out link with its own location.
  const outHrefs = [...page.main.matchAll(/href="(\/api\/out\?[^"]+)"/g)].map((m) => m[1]);
  assert(outHrefs.length >= 2, "priced dates link out through /api/out");
  assert(outHrefs.every((href) => href.includes("ctaLocation=price_guide")), "the guide's CTAs carry the price_guide location");
  assert(CTA_LOCATIONS.includes("price_guide"), "price_guide is in the allowlist, or /api/out discards it");
  assert(!/href="https:\/\/www\.(vividseats|ticketnetwork)/.test(page.main), "no raw affiliate URL on the page");
  assert(page.main.includes("How this site makes money"), "a page with ticket buttons carries the money disclosure");

  // Cross-links: up to the artist page and across to the multi-date city page.
  assert(page.main.includes('href="/artists/oasis"'), "the guide links the transactional artist page");
  assert(page.main.includes('href="/artists/oasis/tickets/manchester-united-kingdom"'), "the guide links an indexable artist-city page");
  assert(!page.main.includes('href="/artists/oasis/tickets/cardiff-united-kingdom"'), "a single-date city is not linked");

  const schema = page.html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  const ld = schema.join("");
  assert(ld.includes('"WebPage"') && ld.includes('"BreadcrumbList"'), "the guide emits WebPage and BreadcrumbList");
  assert(!ld.includes('"MusicEvent"') && !ld.includes('"Offer"') && !ld.includes('"FAQPage"'), "the guide emits no MusicEvent, Offer or FAQPage");
  assert(classifyPageType(GUIDE_PATH) === "artist_price_guide", "analytics records the guide as its own page type");
}

{
  const page = await render(GUIDE_PATH, { withDb: "failing" });
  const body = text(page.main);
  assert(page.status === 200, "the guide renders when D1 fails");
  assert(!body.includes("No listed-price snapshot right now"), "a failed read never reports a snapshot as absent");
  assert(!body.includes("show a listed resale price right now"), "with no price read, the page claims nothing about prices");
  assert(!body.includes("How Oasis resale prices have moved"), "and renders no move section");
}

{
  const artist = await render("/artists/oasis");
  assert(artist.main.includes(`href="${GUIDE_PATH}"`), "the artist page links its price guide");
  const city = await render("/artists/oasis/tickets/manchester-united-kingdom");
  assert(city.main.includes(`href="${GUIDE_PATH}"`), "the artist-city page links the price guide");
}

{
  const missing = await render("/artists/metallica/ticket-prices");
  assert(missing.status === 404, "an artist without an approved guide 404s");
  const unknown = await render("/artists/not-an-artist/ticket-prices");
  assert(unknown.status === 404, "an unknown artist 404s");
  const between = await render(GUIDE_PATH, { withDb: true, events: EVENTS.filter((event) => event.id === "pg-past") });
  assert(between.status === 301 && between.location.endsWith("/artists/oasis"), "a guide with no upcoming date redirects to the artist page");
}

{
  const onlyOneCity = EVENTS.filter((event) => event.city === "Manchester");
  const page = await render(GUIDE_PATH, { withDb: true, events: onlyOneCity });
  assert(page.status === 200 && page.robots.startsWith("noindex"), "a guide below its gate renders noindex,follow");
}

// ─── part 4: the launch queue ───────────────────────────────────────────────

{
  const launch = EVENTS.slice(0, 6).map((event, index) => ({
    ...event,
    id: `launch-${index}`,
    artist_slug: "fixture-launch",
    public_onsale_at: "2026-08-01T09:00:00Z"
  }));
  const candidates = guides.priceGuideLaunchCandidates([...EVENTS, ...launch], [
    { slug: "oasis", name: "Oasis" },
    { slug: "fixture-launch", name: "Fixture Launch" }
  ]);
  assert(candidates.length === 1 && candidates[0].slug === "fixture-launch", "a fresh on-sale run is proposed and a live guide is not");
  assert(candidates[0].launchShowCount === 6 && candidates[0].wouldIndex, "the proposal carries its launch size and gate verdict");
}

console.log(`price-guides: ${passed} assertions passed.`);
