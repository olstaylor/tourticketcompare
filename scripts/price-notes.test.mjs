// Tests for how a show card explains its price, or the lack of one.
//
// Covers the 2026-09-24 Phase 1 changes (docs/audits/2026-09-launch-readiness.md §1):
//   - city pages query the price cache, so their cards print snapshots the way
//     venue and artist pages already did;
//   - a card with no price says why: the lanes and time of the last recorded
//     check, or that the date is not matched on any price-supplying site;
//   - a check older than the quote window is not quoted;
//   - a failed cache read renders the unchecked (silent) state instead of
//     claiming no snapshot exists;
//   - the writers' price-check SQL (scripts/lib/price-checks.mjs).
//
// Renders real routes through the middleware with a fake D1, like
// artist-city-prices.test.mjs, because the crawl-based audits run without a
// DEMAND_DB binding and never see a priced card.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`price-notes: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const middlewareModule = await load("functions/_middleware.js");
const { buildPriceChecksSql, PRICE_CHECKS_SCHEMA_SQL } = await load("scripts/lib/price-checks.mjs");

// ─── part 1: the writers' SQL ───────────────────────────────────────────────

{
  assert(buildPriceChecksSql([], NOW_ISO) === "", "nothing to record writes nothing");
  const sql = buildPriceChecksSql(
    [
      { event_id: "e1", provider: "vivid-seats", outcome: "priced" },
      { event_id: "o'brien", provider: "ticketnetwork", outcome: "no_price" },
      { event_id: "e3", provider: "ticketnetwork", outcome: "made_up" }
    ],
    NOW_ISO
  );
  assert(sql.startsWith(PRICE_CHECKS_SCHEMA_SQL), "the SQL creates its own table idempotently");
  assert(/CREATE TABLE IF NOT EXISTS provider_price_checks/.test(sql), "the schema is IF NOT EXISTS");
  assert(/ON CONFLICT\(event_id, provider\) DO UPDATE/.test(sql), "a re-check upserts rather than duplicating");
  assert(sql.includes("'o''brien'"), "text values are SQL-escaped");
  assert(!sql.includes("e3"), "an unknown outcome is dropped rather than written");
  assert(!/DELETE|DROP/i.test(sql), "no destructive statements");
  const many = buildPriceChecksSql(
    Array.from({ length: 250 }, (_, i) => ({ event_id: `e${i}`, provider: "vivid-seats", outcome: "no_price" })),
    NOW_ISO
  );
  assert((many.match(/INSERT INTO provider_price_checks/g) || []).length === 3, "rows are chunked 100 per statement");
  let threw = false;
  try { buildPriceChecksSql([{ event_id: "e1", provider: "vivid-seats", outcome: "priced" }], "not-a-date"); } catch { threw = true; }
  assert(threw, "an invalid check time is refused, not written");
}

// ─── part 2: rendered routes ────────────────────────────────────────────────

const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const catalog = JSON.parse(await read("public/data/catalog.json"));
const catalogSlugs = new Set((catalog?.artists || catalog || []).map((a) => String(a?.slug || "")));
const indexableArtist = artistsMeta.find(
  (artist) => artist?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(artist.slug)) && artist.promotion_source !== "auto"
);
assert(Boolean(indexableArtist), "the fixture needs one editorially indexable artist");
const ARTIST = { slug: String(indexableArtist.slug), name: String(indexableArtist.name || indexableArtist.slug) };
const CITY = "Springfield";
const CITY_SLUG = "springfield-united-states";
const VENUE = "Fixture Arena";
const VENUE_SLUG = "fixture-arena-springfield";

// lanes: which of the three price-supplying lanes the date is mapped on.
function fixtureEvent(id, iso, { lanes = ["vivid-seats", "ticketnetwork", "stubhub-international"], seatgeek = true, onsaleAt = "" } = {}) {
  const tm = `https://www.ticketmaster.com/event/${id.toUpperCase()}`;
  const numeric = String(Math.abs([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) % 9000000 + 1000000);
  const sg = `https://seatgeek.com/fixture-tickets/springfield-${numeric}/concert/${numeric}`;
  const urls = {
    "vivid-seats": ["vividseats_url", `https://www.vividseats.com/fixture-springfield--concerts-pop/production/${numeric}`],
    ticketnetwork: ["ticketnetwork_url", `https://www.ticketnetwork.com/en/p/${numeric}`],
    "stubhub-international": ["stubhub_international_url", `https://www.stubhub.ie/fixture-springfield-tickets/event/${numeric}`]
  };
  const event = {
    id,
    artist_slug: ARTIST.slug,
    artist_name: ARTIST.name,
    event_name: `${ARTIST.name}: Fixture Tour`,
    city: CITY,
    country: "United States",
    venue: VENUE,
    datetime_iso: iso,
    timezone: "America/Chicago",
    tour_name: "Fixture Tour",
    status: "on-sale",
    ticketmaster_event_id: id.toUpperCase(),
    ticketmaster_url: tm,
    seatgeek_url: sg,
    source_type: "ticketmaster",
    source_url: tm,
    last_verified_at: "2026-08-01",
    provider_links: {
      ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01", availability_status: "on_sale" },
      seatgeek: { event_id: Number(numeric), url: sg, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" }
    },
    verification_status: "human_verified"
  };
  if (!seatgeek) {
    event.seatgeek_url = "";
    delete event.provider_links.seatgeek;
  }
  if (onsaleAt) {
    event.status = "announced";
    event.public_onsale_at = onsaleAt;
  }
  for (const lane of lanes) {
    const [field, url] = urls[lane];
    event[field] = url;
    event.provider_links[lane] = { event_id: numeric, url, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" };
  }
  return event;
}

const PRICED = fixtureEvent("fixture-priced", "2026-09-11T01:00:00Z");
const CHECKED = fixtureEvent("fixture-checked", "2026-09-12T01:00:00Z", { lanes: ["vivid-seats", "ticketnetwork"] });
const UNMAPPED = fixtureEvent("fixture-unmapped", "2026-09-13T01:00:00Z", { lanes: [] });
const UNCHECKED = fixtureEvent("fixture-unchecked", "2026-09-14T01:00:00Z", { lanes: ["vivid-seats"] });
const STALE_CHECK = fixtureEvent("fixture-stale-check", "2026-09-15T01:00:00Z", { lanes: ["ticketnetwork"] });
// Before the public on-sale: verified resale lanes render, Ticketmaster does not.
const PENDING_RESALE = fixtureEvent("fixture-pending-resale", "2026-09-16T01:00:00Z", { lanes: ["vivid-seats"], seatgeek: false, onsaleAt: "2026-08-20T15:00:00Z" });
const PENDING_BARE = fixtureEvent("fixture-pending-bare", "2026-09-17T01:00:00Z", { lanes: [], seatgeek: false, onsaleAt: "2026-08-20T15:00:00Z" });
const EVENTS = [PRICED, CHECKED, UNMAPPED, UNCHECKED, STALE_CHECK, PENDING_RESALE, PENDING_BARE];

const PRICE_ROWS = [
  { event_id: PRICED.id, provider: "vivid-seats", low_price: 182, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: PENDING_RESALE.id, provider: "vivid-seats", low_price: 240, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: PRICED.id, provider: "ticketnetwork", low_price: 190, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "ticketnetwork_impact_marketplace_api" }
];
const CHECK_ROWS = [
  { event_id: PRICED.id, provider: "vivid-seats", checked_at: "2026-08-09T09:00:00.000Z", outcome: "priced" },
  { event_id: CHECKED.id, provider: "vivid-seats", checked_at: "2026-08-09T09:30:00.000Z", outcome: "no_price" },
  { event_id: CHECKED.id, provider: "ticketnetwork", checked_at: "2026-08-09T10:05:00.000Z", outcome: "no_price" },
  // A 'priced' check whose row the display gate withholds: never quoted as "no listed price".
  { event_id: UNCHECKED.id, provider: "vivid-seats", checked_at: "2026-08-09T11:00:00.000Z", outcome: "priced" },
  // 60h old: past the 36h quote window, so it must not be quoted.
  { event_id: STALE_CHECK.id, provider: "ticketnetwork", checked_at: "2026-08-07T00:00:00.000Z", outcome: "no_price" }
];

function fakeDb({ failCache = false, failChecks = false } = {}) {
  return {
    prepare(sql) {
      return {
        bind(...bindings) {
          const wanted = new Set(bindings.map(String));
          return {
            async all() {
              if (/provider_pricing_cache/.test(sql)) {
                if (failCache) throw new Error("D1_ERROR: simulated cache read failure");
                return { results: PRICE_ROWS.filter((row) => wanted.has(String(row.event_id))) };
              }
              if (/provider_price_checks/.test(sql)) {
                if (failChecks) throw new Error("D1_ERROR: no such table: provider_price_checks");
                const onlyNoPrice = /outcome = 'no_price'/.test(sql);
                return { results: CHECK_ROWS.filter((row) => wanted.has(String(row.event_id)) && (!onlyNoPrice || row.outcome === "no_price")) };
              }
              return { results: [] };
            }
          };
        }
      };
    }
  };
}

const ASSET_FILES = ["index.html", "data/catalog.json", "data/artists.json", "data/guides-content.json", "data/blog-content.json", "data/provider-configs.json"];
const baseAssets = new Map();
for (const file of ASSET_FILES) baseAssets.set(`/${file}`, await read(`public/${file}`));
baseAssets.set("/", baseAssets.get("/index.html"));

function env(db) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(EVENTS));
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
    TICKETLIQUIDATOR_PUBLIC_ENABLED: "true",
    TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED: "false",
    STUBHUB_INTERNATIONAL_PUBLIC_ENABLED: "true",
    STUBHUB_INTERNATIONAL_PRICE_DISPLAY_ENABLED: "true",
    ...(db ? { DEMAND_DB: db } : {}),
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, db) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: env(db),
    next: () => new Response("static-asset", { status: 200 })
  });
  return { status: response.status, html: await response.text() };
}

const text = (html) =>
  String(html).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

// The show card for one event: the smallest <article> holding its buttons.
function card(html, eventId) {
  const marker = `data-cta-show-id="${eventId}"`;
  const at = html.indexOf(marker);
  if (at < 0) return "";
  const start = html.lastIndexOf("<article", at);
  const end = html.indexOf("</article>", at);
  return html.slice(start, end);
}

const PRICE_UNAVAILABLE_NOTE = "No listed-price snapshot is available for this date. Check current prices using the provider buttons above.";

for (const pathname of [`/cities/${CITY_SLUG}`, `/venues/${VENUE_SLUG}`, `/artists/${ARTIST.slug}`]) {
  const { status, html } = await render(pathname, fakeDb());
  assert(status === 200, `${pathname} renders`);

  const priced = card(html, PRICED.id);
  assert(/provider-cta-priced/.test(priced), `${pathname}: the priced date shows its snapshot on the button`);
  assert(/\$182/.test(priced), `${pathname}: the Vivid Seats figure is the cached one`);

  const checked = text(card(html, CHECKED.id));
  assert(
    checked.includes("No listed price at our last check of Vivid Seats and TicketNetwork (9 Aug 2026, 10:05 UTC)."),
    `${pathname}: an unpriced date names the checked lanes and the latest check time — got: ${checked.slice(-260)}`
  );
  assert(!/available|sold out/i.test(checked.replace(PRICE_UNAVAILABLE_NOTE, "")), `${pathname}: the checked note makes no availability claim`);

  const unmapped = text(card(html, UNMAPPED.id));
  assert(
    unmapped.includes("isn't matched yet on the sites we collect prices from (Vivid Seats, TicketNetwork and StubHub International)"),
    `${pathname}: a date with no price-supplying lane says it is unmatched`
  );

  assert(text(card(html, UNCHECKED.id)).includes(PRICE_UNAVAILABLE_NOTE), `${pathname}: a mapped date with no recorded no-price check keeps the undated note (a 'priced' check is never quoted)`);
  assert(text(card(html, STALE_CHECK.id)).includes(PRICE_UNAVAILABLE_NOTE), `${pathname}: a check older than the quote window is not quoted`);

  const pending = card(html, PENDING_RESALE.id);
  assert(/provider=vivid-seats/.test(pending), `${pathname}: a verified resale lane renders before the public on-sale`);
  assert(!/provider=ticketmaster/.test(pending), `${pathname}: Ticketmaster stays hidden until the public on-sale`);
  assert(/\$240/.test(pending), `${pathname}: a pre-on-sale resale lane carries its gated snapshot`);
  assert(text(pending).includes("Public on-sale Aug 20, 2026") && text(pending).includes("resale listings"), `${pathname}: the pre-on-sale card states the on-sale time and that these are resale listings`);
  assert(!html.includes(`showId=${PENDING_BARE.id}`), `${pathname}: a pre-on-sale date with no verified resale lane renders no button`);
  assert(text(html).includes("Public on-sale Aug 20, 2026"), `${pathname}: it still states the on-sale time`);
}

// A cache read that throws establishes nothing: no card may claim absence.
{
  const { status, html } = await render(`/cities/${CITY_SLUG}`, fakeDb({ failCache: true }));
  assert(status === 200, "the page survives a failed cache read");
  assert(!/provider-cta-priced/.test(html), "a failed read prints no price");
  assert(!/No listed-price snapshot|No listed price at our last check/.test(html), "a failed read renders the unchecked state, not a claim that no snapshot exists");
}

// A missing check table (before the first writer run) falls back cleanly.
{
  const { html } = await render(`/cities/${CITY_SLUG}`, fakeDb({ failChecks: true }));
  assert(/provider-cta-priced/.test(card(html, PRICED.id)), "prices still render when the check table is missing");
  assert(text(card(html, CHECKED.id)).includes(PRICE_UNAVAILABLE_NOTE), "without the check table the note is the undated one");
}

console.log(`price-notes: ${passed} assertions passed`);
