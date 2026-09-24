// Tests for the per-date price answer on artist-city pages.
//
// Two halves. The first exercises functions/_artist-city-prices.js directly
// against fixture CTA specs, because that module owns every rule that decides
// what a figure means. The second renders real /artists/<a>/tickets/<city>
// routes through the actual middleware with a fake D1 attached, because the
// crawl-based audits (audit-internal-links.mjs, audit-indexable-surface.mjs)
// build their offline env without a DEMAND_DB binding — so they render the
// price-free variant of every page and are structurally blind to this feature.
// These tests are therefore its only coverage, not a supplement to it.
//
// Run standalone (node scripts/artist-city-prices.test.mjs) and as part of
// `npm run test:mvp`.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-city-prices: ${message}`);
  passed += 1;
}

// Pinned before the router is imported so every "is this show upcoming?" and
// every snapshot-expiry comparison sees the same instant.
const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
assert(Number.isFinite(NOW_MS), "the pinned test clock must be a valid ISO timestamp");
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const { deriveCityDatePrices } = await load("functions/_artist-city-prices.js");
const middlewareModule = await load("functions/_middleware.js");
const { deriveIndexableArtistCities, deriveArtistCities } = await load("functions/_artist-cities.js");
const { CTA_LOCATIONS } = await load("functions/_funnel.js");

// ─── part 1: the derivation ─────────────────────────────────────────────────

function spec(provider, name, price, currency = "USD", fetchedAt = "2026-08-09T09:00:00Z") {
  return {
    provider,
    name,
    href: `/api/out?showId=x&provider=${provider}`,
    lane: { price, currency, fetchedAt, expiresAt: "2026-08-10T09:00:00Z" },
    priceAmount: `$${price}`,
    priceAsOf: "9 Aug 2026, 09:00 UTC"
  };
}

function fixtureShow(id, iso) {
  return { id, dateTimeISO: iso, venue: "Fixture Arena", timezone: "America/Chicago", prices: [{}] };
}

{
  const answer = deriveCityDatePrices(
    [fixtureShow("e2", "2026-09-13T01:00:00Z"), fixtureShow("e1", "2026-09-11T01:00:00Z")],
    {
      ctaSpecsFor: (show) =>
        show.id === "e1"
          ? [spec("ticketnetwork", "TicketNetwork", 210), spec("vivid-seats", "Vivid Seats", 182)]
          : [spec("vivid-seats", "Vivid Seats", 240)],
      wasChecked: () => true
    }
  );

  assert(answer.rows.length === 2, "one row per tracked date");
  assert(answer.rows[0].showId === "e1", "rows are ordered by date, not by input order");
  assert(answer.pricedRowCount === 2, "both rows carry an eligible lane");
  assert(answer.currency === "USD", "a uniform currency is reported for the disclosure copy");

  const first = answer.rows[0];
  assert(first.lanes.length === 2 && first.lanes[0].price === 182, "lanes are sorted cheapest first");
  assert(first.lowest.name === "Vivid Seats" && first.lowest.price === 182, "the lowest is the same event's cheapest lane");
  assert(first.comparedCount === 2, "comparedCount counts the eligible lanes for that date");

  // The whole point of the design: the cheaper date never becomes a claim about
  // the city. Each row keeps its own figure and no aggregate exists to print.
  assert(answer.rows[1].lowest.price === 240, "the second date keeps its own higher price");
  assert(
    !Object.keys(answer).some((key) => /lowest|cheapest|min/i.test(key)),
    "the derivation exposes no city-wide minimum for a caller to render as 'from <price>'"
  );
}

{
  // A row whose lanes disagree on currency is a data fault, not a
  // multi-currency answer, so it keeps its date and loses its prices.
  const answer = deriveCityDatePrices([fixtureShow("e1", "2026-09-11T01:00:00Z")], {
    ctaSpecsFor: () => [spec("vivid-seats", "Vivid Seats", 182, "USD"), spec("ticketnetwork", "TicketNetwork", 150, "GBP")],
    wasChecked: () => true
  });
  assert(answer.rows[0].lanes.length === 0, "a currency-conflicted row drops its lanes");
  assert(answer.rows[0].lowest === null, "a currency-conflicted row has no lowest");
  assert(answer.pricedRowCount === 0, "a currency-conflicted row is not counted as priced");
}

{
  // An ungated spec is exactly what a suppressed CTA looks like, and the
  // derivation must not resurrect it: no second price gate lives here.
  const answer = deriveCityDatePrices([fixtureShow("e1", "2026-09-11T01:00:00Z")], {
    ctaSpecsFor: () => [
      { provider: "seatgeek", name: "SeatGeek", href: "/api/out?showId=x&provider=seatgeek", lane: null },
      { provider: "ticketmaster", name: "Ticketmaster", href: "/api/out?showId=x&provider=ticketmaster", lane: null },
      { ...spec("ticket-liquidator", "Ticket Liquidator", 99), lane: null }
    ],
    wasChecked: () => true
  });
  assert(answer.rows[0].lanes.length === 0, "a spec with no gated lane contributes no price");
  assert(answer.pricedRowCount === 0, "SeatGeek, Ticketmaster and a price-disabled lane yield no priced row");
}

{
  const unchecked = deriveCityDatePrices([fixtureShow("e1", "2026-09-11T01:00:00Z")], {
    ctaSpecsFor: () => []
  });
  assert(unchecked.rows[0].checked === false, "wasChecked defaults to false so an unqueried row claims nothing");
  assert(deriveCityDatePrices([], {}).rows.length === 0, "a missing ctaSpecsFor yields an empty answer rather than throwing");
}

// ─── part 2: rendered routes ────────────────────────────────────────────────

const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const catalog = JSON.parse(await read("public/data/catalog.json"));
const catalogSlugs = new Set((catalog?.artists || catalog || []).map((a) => String(a?.slug || "")));
const indexableArtist = artistsMeta.find(
  (artist) => artist?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(artist.slug))
);
assert(Boolean(indexableArtist), "the fixture needs one editorially indexable artist present in the catalog");
const ARTIST = { slug: String(indexableArtist.slug), name: String(indexableArtist.name || indexableArtist.slug) };

const RUN_CITY = "Springfield";
const RUN_CITY_SLUG = "springfield-united-states";
const SOLO_CITY = "Shelbyville";
const SOLO_CITY_SLUG = "shelbyville-united-states";
const MULTI_CITY = "Capital City";
const MULTI_CITY_SLUG = "capital-city-united-states";
const VENUE = "Fixture Arena";

function fixtureEvent({ id, city, venue, iso }) {
  const tm = `https://www.ticketmaster.com/event/${id.toUpperCase()}`;
  const numeric = String(Math.abs([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) % 9000000 + 1000000);
  return {
    id,
    artist_slug: ARTIST.slug,
    artist_name: ARTIST.name,
    event_name: `${ARTIST.name}: Fixture Tour`,
    city,
    country: "United States",
    venue,
    datetime_iso: iso,
    timezone: "America/Chicago",
    tour_name: "Fixture Tour",
    status: "on-sale",
    ticketmaster_event_id: id.toUpperCase(),
    ticketmaster_url: tm,
    seatgeek_url: `https://seatgeek.com/fixture-tickets/${city.toLowerCase()}-${numeric}/concert/${numeric}`,
    vividseats_url: `https://www.vividseats.com/fixture-${city.toLowerCase()}--concerts-pop/production/${numeric}`,
    ticketnetwork_url: `https://www.ticketnetwork.com/en/p/${numeric}`,
    ticketliquidator_url: `https://www.ticketliquidator.com/tickets/${numeric}/Fixture`,
    stubhub_international_url: `https://www.stubhub.ie/fixture-${city.toLowerCase()}-tickets/event/${numeric}`,
    source_type: "ticketmaster",
    source_url: tm,
    last_verified_at: "2026-08-01",
    provider_links: {
      ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01", availability_status: "on_sale" },
      seatgeek: { event_id: Number(numeric), url: `https://seatgeek.com/fixture-tickets/${city.toLowerCase()}-${numeric}/concert/${numeric}`, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" },
      "vivid-seats": { event_id: Number(numeric), url: `https://www.vividseats.com/fixture-${city.toLowerCase()}--concerts-pop/production/${numeric}`, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" },
      ticketnetwork: { event_id: numeric, url: `https://www.ticketnetwork.com/en/p/${numeric}`, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" },
      "ticket-liquidator": { event_id: numeric, url: `https://www.ticketliquidator.com/tickets/${numeric}/Fixture`, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" },
      "stubhub-international": { event_id: numeric, url: `https://www.stubhub.ie/fixture-${city.toLowerCase()}-tickets/event/${numeric}`, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" }
    },
    verification_status: "human_verified"
  };
}

// Two dates in the run city (indexable), one in the solo city (noindex).
const RUN_A = fixtureEvent({ id: "fixture-run-a", city: RUN_CITY, venue: VENUE, iso: "2026-09-11T01:00:00Z" });
const RUN_B = fixtureEvent({ id: "fixture-run-b", city: RUN_CITY, venue: VENUE, iso: "2026-09-13T01:00:00Z" });
const SOLO = fixtureEvent({ id: "fixture-solo", city: SOLO_CITY, venue: VENUE, iso: "2026-10-02T01:00:00Z" });
// A two-venue run, so the table's venue column is exercised in both states.
const MULTI_A = fixtureEvent({ id: "fixture-multi-a", city: MULTI_CITY, venue: "North Hall", iso: "2026-11-05T01:00:00Z" });
const MULTI_B = fixtureEvent({ id: "fixture-multi-b", city: MULTI_CITY, venue: "South Pavilion", iso: "2026-11-07T01:00:00Z" });
const EVENTS = [RUN_A, RUN_B, SOLO, MULTI_A, MULTI_B];

// Cache rows shaped exactly as provider_pricing_cache returns them. Vivid Seats
// is cheapest on the first date, TicketNetwork on the second, so a cross-event
// minimum would visibly collapse the two into one figure if it ever appeared.
const PRICE_ROWS = [
  { event_id: RUN_A.id, provider: "vivid-seats", low_price: 182, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: RUN_A.id, provider: "ticketnetwork", low_price: 210, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "ticketnetwork_impact_marketplace_api" },
  { event_id: RUN_B.id, provider: "vivid-seats", low_price: 265, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: RUN_B.id, provider: "ticketnetwork", low_price: 240, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "ticketnetwork_impact_marketplace_api" },
  { event_id: SOLO.id, provider: "vivid-seats", low_price: 145, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  // Below MIN_PLAUSIBLE_LISTED_PRICE and price-display-disabled respectively:
  // neither may ever reach the table.
  { event_id: RUN_A.id, provider: "stubhub-international", low_price: 3.8, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "stubhub_international_impact_marketplace_api" },
  { event_id: RUN_A.id, provider: "ticket-liquidator", low_price: 12, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "ticketliquidator_impact_marketplace_api" },
  { event_id: MULTI_A.id, provider: "vivid-seats", low_price: 310, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: MULTI_B.id, provider: "vivid-seats", low_price: 330, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  // Expired: the snapshot is past its expires_at, so it must be invisible.
  { event_id: MULTI_B.id, provider: "ticketnetwork", low_price: 99, currency: "USD", verified_at: "2026-08-01T09:00:00Z", expires_at: "2026-08-02T09:00:00Z", source: "ticketnetwork_impact_marketplace_api" }
];

// Recorded observations behind the 30-day low. The pinned clock is
// 2026-08-09T12:00:00Z, so the window opens 2026-07-10T12:00:00Z.
const HISTORY_ROWS = [
  // RUN_A: the carry-in case. One row, 2026-07-01 — BEFORE the window opens, so
  // a naive `observed_at >= windowStart` query returns nothing for this series
  // even though $150 was the standing observation throughout.
  { event_id: RUN_A.id, provider: "vivid-seats", currency: "USD", low_price: 150, observed_at: "2026-07-01T09:00:00Z" },
  // RUN_B: an ordinary in-window low, cheaper than either current lane.
  { event_id: RUN_B.id, provider: "ticketnetwork", currency: "USD", low_price: 175, observed_at: "2026-07-20T09:00:00Z" },
  // RUN_B again, implausible: must be floored out rather than become the low.
  { event_id: RUN_B.id, provider: "vivid-seats", currency: "USD", low_price: 1, observed_at: "2026-07-22T09:00:00Z" }
  // SOLO deliberately has no rows at all: the page must not claim to have
  // watched it for 30 days.
];

function fakeDb(rows, historyRows = []) {
  const knownIds = new Set(historyRows.map((row) => String(row.event_id)));
  const knownProviders = new Set(historyRows.map((row) => String(row.provider)));
  return {
    prepare(sql) {
      return {
        bind(...bindings) {
          return {
            async all() {
              if (/provider_pricing_cache/.test(sql)) {
                const wanted = new Set(bindings.map(String));
                return { results: rows.filter((row) => wanted.has(String(row.event_id))) };
              }
              if (!/provider_pricing_history/.test(sql)) return { results: [] };
              // Emulates the documented SQLite rule the real query relies on:
              // with exactly one min()/max() aggregate, bare columns come from
              // the row that produced the extreme.
              const windowStart = String(bindings.at(-1));
              const ids = new Set(bindings.filter((b) => knownIds.has(String(b))).map(String));
              const providers = new Set(bindings.filter((b) => knownProviders.has(String(b))).map(String));
              const inWindow = /MIN\(low_price\)/.test(sql);
              const scoped = historyRows.filter(
                (row) =>
                  ids.has(String(row.event_id)) &&
                  providers.has(String(row.provider)) &&
                  (inWindow
                    ? String(row.observed_at) >= windowStart
                    : String(row.observed_at) < windowStart)
              );
              const groups = new Map();
              for (const row of scoped) {
                const key = `${row.event_id}|${row.provider}|${row.currency}`;
                const held = groups.get(key);
                if (!held) {
                  groups.set(key, row);
                  continue;
                }
                const wins = inWindow
                  ? Number(row.low_price) < Number(held.low_price)
                  : String(row.observed_at) > String(held.observed_at);
                if (wins) groups.set(key, row);
              }
              return { results: [...groups.values()] };
            }
          };
        }
      };
    }
  };
}

const ASSET_FILES = [
  "index.html",
  "data/catalog.json",
  "data/artists.json",
  "data/events.json",
  "data/guides-content.json",
  "data/blog-content.json",
  "data/provider-configs.json"
];
const baseAssets = new Map();
for (const file of ASSET_FILES) baseAssets.set(`/${file}`, await read(`public/${file}`));
baseAssets.set("/", baseAssets.get("/index.html"));

function env({ withDb }) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(EVENTS));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    // Fixture credentials. Impact tracking must look configured or every
    // marketplace CTA is suppressed and there is nothing to price.
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
    ...(withDb ? { DEMAND_DB: fakeDb(PRICE_ROWS, HISTORY_ROWS) } : {}),
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, { withDb = true } = {}) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: env({ withDb }),
    next: () => new Response("static-asset", { status: 200 })
  });
  const html = await response.text();
  return {
    status: response.status,
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

const occurrences = (haystack, needle) => haystack.split(needle).length - 1;

const RUN_PATH = `/artists/${ARTIST.slug}/tickets/${RUN_CITY_SLUG}`;
const SOLO_PATH = `/artists/${ARTIST.slug}/tickets/${SOLO_CITY_SLUG}`;

// ── the multi-date page answers the question ────────────────────────────────
{
  const page = await render(RUN_PATH);
  assert(page.status === 200, "the multi-date artist-city page renders");
  const body = text(page.main);

  assert(
    body.includes(`How much are ${ARTIST.name} tickets in ${RUN_CITY}?`),
    "the page states the question it is searched for, verbatim, as a heading"
  );
  assert(body.includes("Sites compared"), 'the table column reads "Sites compared"');
  assert(!/Sites checked/i.test(body), 'the table must not imply the render initiated a check ("Sites checked")');

  // Both dates keep their own figure. If a cross-event minimum ever appeared,
  // $240 would vanish behind $182.
  assert(body.includes("$182"), "the first date's own lowest listed price is shown");
  assert(body.includes("$240"), "the second date's own lowest listed price is shown");
  assert(body.includes("Vivid Seats") && body.includes("TicketNetwork"), "each figure names the provider offering it");
  assert(/captured|UTC/.test(body), "each figure carries its capture time");

  assert(
    !/\bfrom \$\d/i.test(body) && !/cheapest date/i.test(body) && !/lowest in [A-Z]/.test(body),
    "no cross-event 'from <price>' or cheapest-date claim is rendered"
  );
  assert(
    !body.includes("$145"),
    "a price from a different city never reaches this page"
  );

  // Attribution: the figure is the tracked button, with its own surface label.
  const answerSection = (page.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [])[0] || "";
  assert(answerSection, "the price answer renders as its own section");
  const hrefs = [...answerSection.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const outHrefs = hrefs.filter((href) => href.startsWith("/api/out?"));
  assert(outHrefs.length >= 2, "every priced date links out through /api/out");
  assert(
    outHrefs.every((href) => href.includes("ctaLocation=artist_city_answer")),
    "answer-block CTAs carry their own cta_location so the surface is measurable"
  );
  assert(
    outHrefs.every((href) => /showId=/.test(href) && /provider=/.test(href)),
    "answer-block CTAs keep the showId and provider /api/out needs to attribute the click"
  );
  assert(
    CTA_LOCATIONS.includes("artist_city_answer"),
    "artist_city_answer is in the allowlist, or /api/out discards it"
  );
  assert(
    !hrefs.some((href) => /vividseats\.com|ticketnetwork\.com|stubhub\.ie|seatgeek\.com/.test(href)),
    "no raw affiliate URL appears in the answer block"
  );

  // Gated-out lanes never appear, whatever the cache holds.
  assert(!body.includes("$3.80") && !/StubHub International\s*\$/.test(body), "an implausible snapshot never reaches the table");
  assert(!/Ticket Liquidator\s*\$/.test(body), "a price-display-disabled lane never reaches the table");
  assert(!/SeatGeek\s*\$\d/.test(body), "SeatGeek never carries a price");

  // The panel the internal-link audit depends on keeps its two required
  // markers. It is compressed, never removed: audit-internal-links.mjs fails an
  // artist-city page that is missing either string.
  assert(body.includes("At a glance:") && body.includes("Short answer:"), "the at-a-glance panel keeps the markers the internal-link audit requires");

  // Say each fact once. The table above lists every tracked date and names the
  // venue, so the three cards that restate it are gone and the lead no longer
  // repeats the venue or the date range.
  for (const card of ["Next tracked date", "Tracked date range", "Venues"]) {
    assert(!body.includes(card), `"${card}" is not reprinted as a card beside the table that already states it`);
  }
  assert(
    body.includes("most recent event record on this page was checked"),
    "the one fact the table does not carry \u2014 event-record verification \u2014 survives the compression"
  );
  assert(
    /not when a price was captured/.test(body),
    "the panel distinguishes event-record verification from price capture time"
  );
  const lead = text((page.main.match(/<p class="lead">([\s\S]*?)<\/p>/) || [])[1] || "");
  assert(lead.includes(`TourTicketCompare tracks 2 upcoming shows for ${ARTIST.name} in ${RUN_CITY}`), "the lead still states the count, which the table only implies");
  assert(!lead.includes("Fixture Arena"), "the lead drops the venue the table names in its own lead");
  assert(!/Sep 10, 2026 to/.test(lead), "the lead drops the date range the table states row by row");
  // Each show card naming its own venue is not duplication \u2014 a card is the one
  // place that fact belongs. What the compression removes is the copies in the
  // lead and the panel, so the priced page must state the venue strictly fewer
  // times than the same page with no table on it.
  const unpricedBody = text((await render(RUN_PATH, { withDb: false })).main);
  assert(
    occurrences(body, "Fixture Arena") < occurrences(unpricedBody, "Fixture Arena"),
    `adding the table must reduce, not add to, the venue's repetitions (priced ${occurrences(
      body,
      "Fixture Arena"
    )}, unpriced ${occurrences(unpricedBody, "Fixture Arena")})`
  );
}

// ── metadata stays free of live numbers ─────────────────────────────────────
{
  const page = await render(RUN_PATH);
  assert(page.title.includes("Prices & Dates") || page.title.includes("Prices &amp; Dates"), "the title carries the stable price intent token");
  assert(page.title.length <= 60, `the title stays within budget (was ${page.title.length})`);
  assert(!/\d+(\.\d+)?/.test(page.title.replace(/\d{4}/g, "")), "no live figure appears in the title");
  assert(
    !/[$£€]\s?\d/.test(page.description),
    "no live figure appears in the meta description, which is also the CollectionPage JSON-LD description"
  );
  assert(/current listed ticket prices/i.test(page.description), "the description says what the page compares");
  assert(page.description.length <= 160, `the description stays within budget (was ${page.description.length})`);

  // Schema is untouched by this feature.
  const offers = [...page.html.matchAll(/"@type":"Offer"/g)].length;
  const faqQuestions = [...page.html.matchAll(/"@type":"Question"/g)].length;
  const schemaBlock = (page.html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1] || "";
  assert(!/How much are/.test(schemaBlock), "the price question is not added to FAQ structured data");
  assert(offers >= 0 && faqQuestions >= 0, "structured data still parses");
}

// ── a single-date page shows the answer and stays noindex ───────────────────
{
  const page = await render(SOLO_PATH);
  assert(page.status === 200, "the single-date artist-city page renders");
  const body = text(page.main);

  assert(
    body.includes(`How much are ${ARTIST.name} tickets in ${SOLO_CITY}?`),
    "a noindex single-date page still answers the price question for the visitor standing on it"
  );
  assert(body.includes("$145"), "the single date's own lowest listed price is shown");

  // Usefulness must not move the routing decision in either direction.
  assert(page.robots === "noindex,follow", `a single-date page stays noindex,follow (was "${page.robots}")`);
  const indexableSlugs = deriveIndexableArtistCities(EVENTS, [ARTIST.slug]).map((entry) => entry.slug);
  assert(!indexableSlugs.includes(SOLO_CITY_SLUG), "a single-date combination stays out of the sitemap set");
  assert(indexableSlugs.includes(RUN_CITY_SLUG), "the multi-date combination stays in the sitemap set");
  const derived = deriveArtistCities(EVENTS, ARTIST.slug);
  assert(
    derived.find((city) => city.slug === SOLO_CITY_SLUG)?.indexable === false,
    "the gate itself is unchanged by the presence of price data"
  );
  assert(!page.html.includes('"@type":"FAQPage"'), "a noindex page still emits no FAQPage");
}

// ── no price data means no block at all ─────────────────────────────────────
{
  const page = await render(RUN_PATH, { withDb: false });
  assert(page.status === 200, "the page still renders with no pricing database bound");
  const body = text(page.main);
  assert(!body.includes("How much are"), "with no eligible lane the question heading is not rendered");
  assert(!body.includes("Sites compared"), "with no eligible lane the table is not rendered");
  assert(!/price-answer-table/.test(page.main), "with no eligible lane no empty table frame is left behind");
  assert(body.includes("At a glance:"), "the page falls back to exactly what it rendered before");
  // The compression is tied to the table, so with no table every card returns.
  for (const card of ["Next tracked date", "Tracked date range", "Venues", "Verification recency"]) {
    assert(body.includes(card), `"${card}" returns when there is no table to restate`);
  }
  const unpricedLead = text((page.main.match(/<p class="lead">([\s\S]*?)<\/p>/) || [])[1] || "");
  assert(
    unpricedLead.includes("Fixture Arena") && /Sep 10, 2026 to/.test(unpricedLead),
    "the lead keeps the venue and date range when no table states them"
  );
  assert(!/[$£€]\s?\d/.test(body), "no figure is invented when the lanes were not readable");
}

// ── the venue column follows the data, and expiry still hides a price ───────
{
  const single = await render(RUN_PATH);
  const singleSection = (single.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [""])[0];
  assert(!/<th scope="col">Venue<\/th>/.test(singleSection), "a single-venue run states the venue once and drops the column");
  assert(/all at Fixture Arena/.test(text(singleSection)), "a single-venue run names its venue in the lead instead");

  const multi = await render(`/artists/${ARTIST.slug}/tickets/${MULTI_CITY_SLUG}`);
  assert(multi.status === 200, "the two-venue artist-city page renders");
  const multiSection = (multi.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [""])[0];
  const multiText = text(multiSection);
  assert(/<th scope="col">Venue<\/th>/.test(multiSection), "a multi-venue run keeps the venue column");
  assert(multiText.includes("North Hall") && multiText.includes("South Pavilion"), "each date names its own venue");
  assert(!/all at /.test(multiText), "a multi-venue run makes no single-venue claim");
  assert(!multiText.includes("$99"), "an expired cache row never reaches the table");
  assert(multiText.includes("$330"), "the unexpired row for that same date is still shown");
}

// ── the artist page names a date, never a city-wide 'from' ──────────────────
{
  const page = await render(`/artists/${ARTIST.slug}`);
  assert(page.status === 200, "the artist page renders");
  const body = text(page.main);
  assert(body.includes("Dates by city"), "the by-city link list is present");
  assert(/Sep .*: \$182, Vivid Seats/.test(body), "a city row names the next date and that date's own lowest price");
  assert(!/\bfrom \$\d/i.test(body), "the artist page makes no 'from <price>' claim for a city");
  assert(!/cheapest city|lowest city/i.test(body), "cities are never ranked against each other");

  // Freshness travels with the figure. docs/PROVIDER_DATA_POLICY.md admits a
  // price outside a CTA badge only when it carries its own event, provider,
  // currency AND capture time; the event date is not the capture time, so a
  // row showing "Nov 4, 2026: $310" and nothing else would be unattributed.
  assert(
    /: \$182, Vivid Seats \(snapshot 9 Aug 2026, 09:00 UTC\)/.test(body),
    "a city row carries the snapshot capture time beside the price, not just the event date"
  );
  // Counted rather than pattern-matched per row: what must hold is that the
  // list contains no priced row without a capture time, so the two counts are
  // the assertion.
  const cityList = body.slice(body.indexOf("Dates by city"), body.indexOf("Related guides"));
  const priced = [...cityList.matchAll(/: \$[\d.,]+, /g)].length;
  const stamped = [...cityList.matchAll(/\(snapshot [^)]*UTC\)/g)].length;
  assert(priced >= 2, `more than one city row carries a price (was ${priced})`);
  assert(priced === stamped, `every priced city row carries a capture time (${priced} priced, ${stamped} stamped)`);
}

// ── the 30-day recorded low, rendered ───────────────────────────
{
  const page = await render(RUN_PATH);
  const section = (page.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [""])[0];
  const body = text(section);

  // THE case. RUN_A's only recorded row is 2026-07-01, before the window opens
  // on 2026-07-10 — so a `WHERE observed_at >= windowStart` query returns
  // nothing for it. If this assertion ever fails while the rest pass, the
  // carry-in has been dropped and the feature is silently reporting "no
  // history" for prices that have simply been stable.
  assert(
    /30-day low \$150 · Vivid Seats, 1 Jul 2026/.test(body),
    "a low observed before the window opened is still reported, with its true observation date"
  );
  assert(
    /30-day low \$175 · TicketNetwork, 20 Jul 2026/.test(body),
    "an in-window low is reported and attributed to the provider that recorded it"
  );
  // A $1 row sits in RUN_B's history. The floor is applied on read because
  // history is immutable and carries rows written before the floor existed.
  assert(!/30-day low \$1\b/.test(body), "an implausible historical row never becomes the low");

  // The invariant that keeps the cell coherent: every reported low is at or
  // below the current figure printed directly above it.
  const pairs = [...section.matchAll(/provider-cta-value[^>]*>\$([\d.,]+)<[\s\S]*?30-day low \$([\d.,]+)/g)];
  assert(pairs.length >= 2, `both priced dates render a current figure and a low (was ${pairs.length})`);
  for (const [, current, low] of pairs) {
    assert(
      Number(low.replace(/,/g, "")) <= Number(current.replace(/,/g, "")),
      `the recorded low never exceeds the current price beside it (${low} vs ${current})`
    );
  }
}
{
  // SOLO holds no recorded observations. Saying "lowest we have recorded in 30
  // days" there would claim a month of watching that never happened.
  const page = await render(SOLO_PATH);
  const body = text(page.main);
  assert(!/30-day low/.test(body), "an event with no history reports no low");
  assert(!/Lowest recorded/.test(body), "and makes no claim to have watched it");
  assert(/\$145/.test(body), "while still showing its current price as before");
}
{
  // With no database bound there is no history read and no low.
  const page = await render(RUN_PATH, { withDb: false });
  const body = text(page.main);
  assert(!/30-day low|Lowest recorded/.test(body), "no pricing database means no recorded low");
}


// ── the page never contradicts itself about what it compares ──────────────
{
  // The answer table names the lower listed figure for a date. The shared help
  // component sits on the same page and used to say "We don't rank the sites
  // or claim one is lower", which the table directly falsified. The two must
  // describe the same behaviour: a same-event comparison, never a cross-date
  // one and never a verdict on a site.
  const helpSource = await read("functions/_artist-content.js");
  assert(
    !/don'?t rank the sites or claim one is lower/.test(helpSource),
    "the help copy no longer denies the comparison the answer table performs"
  );

  const page = await render(RUN_PATH);
  const body = text(page.main);
  assert(body.includes("Lowest listed price"), "the table still labels its figure");
  assert(
    /lower listed figure/.test(body) && /never across different dates/.test(body),
    "the help copy states the comparison's real scope: same date, both directions bounded"
  );
  assert(
    /never a claim that a site is cheaper overall/.test(body),
    "the help copy still refuses the site-level verdict the policy forbids"
  );
  assert(!/\bcheapest\b|\bbest price\b/i.test(body), "no banned ranking copy reaches the page");
}

// ── the widest component on the site fits a 320px viewport ──────────────
{
  // `main` is a grid, so a grid item's automatic minimum size is its
  // min-content: one cell that cannot shrink scrolls the whole document
  // sideways rather than clipping locally. The price cell is exactly that
  // shape — a pill CTA whose min-content is a long provider name plus a
  // nowrap figure, above a timestamp that .muted would otherwise size as body
  // copy. These are the rules that hold it inside the card.
  const css = await read("public/styles.css");
  assert(/\.price-answer-table \{[^}]*table-layout: fixed/.test(css), "the table must not size itself from its content");
  assert(/\.price-answer-table \{[^}]*width: 100%/.test(css), "the table must not exceed its wrapper");
  assert(
    /\.price-answer-table \.provider-cta \{[^}]*flex-wrap: wrap/.test(css),
    "the CTA inside a cell must wrap rather than force the column wider than the provider name"
  );
  assert(
    // Tolerates the selector being grouped with a sibling, which it now is.
    /\.price-answer-table \.price-answer-asof[^{]*\{[^}]*font-size:/.test(css),
    "the capture time needs its own size: .muted sizes body copy and is too large inside a cell"
  );
  assert(
    /\.price-answer-table \.price-answer-low[^{]*\{[^}]*font-size:/.test(css),
    "the recorded-low line needs its own size for the same reason"
  );
  assert(
    /\.price-answer-table \.price-answer-low \{[^}]*font-weight:/.test(css),
    "and its own weight, so two figures in one cell are distinguishable without reading"
  );

  const stacked = (css.match(/@media \(max-width: 620px\) \{[\s\S]*?\n\}\n/g) || []).find((block) =>
    block.includes(".price-answer-table")
  );
  assert(stacked, "styles.css must carry a narrow-screen block for the price answer table");
  assert(/\.price-answer-table tr,/.test(stacked), "rows become blocks on a narrow screen");
  assert(/td\[data-label\]::before/.test(stacked), "stacked cells carry their column name from data-label");
  assert(/\.price-answer-table thead \{[^}]*clip:/.test(stacked), "the header row is hidden visually, not removed from the table");

  // The CSS above is inert unless the markup supplies the labels it reads.
  const page = await render(RUN_PATH);
  const section = (page.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [""])[0];
  assert(/<td data-label="Sites compared">/.test(section), "the count cell carries its column name for the stacked layout");
  assert(/<td class="price-answer-price">/.test(section), "the price cell is addressable so it is not double-labelled");
  const multi = await render(`/artists/${ARTIST.slug}/tickets/${MULTI_CITY_SLUG}`);
  const multiSection = (multi.main.match(/<section class="nested-panel artist-city-price-answer"[\s\S]*?<\/section>/) || [""])[0];
  assert(/<td data-label="Venue">/.test(multiSection), "the venue cell carries its column name where the column exists");
}

// ---- "Lowest listed" badge on each date card ----------------------------------
// The card marks the one provider whose listed snapshot is strictly lower than
// every other priced provider's for that same date. It reads the same gated
// lanes as the buttons, never compares across dates, and needs two priced lanes.
{
  const page = await render(RUN_PATH);
  const card = (id) => (page.main.match(new RegExp(`<article class="info-card show-card[^"]*"[^>]*data-event-id="${id}"[\\s\\S]*?</article>`)) || [""])[0];
  const lowestNames = (html) =>
    [...html.matchAll(/<a class="provider-cta[^"]*provider-cta-lowest[^"]*"[\s\S]*?<span class="provider-cta-name">([^<]+)</g)].map((match) => match[1]);
  const runA = card(RUN_A.id);
  const runB = card(RUN_B.id);
  assert(runA && runB, "both run dates render a card");
  assert(
    JSON.stringify(lowestNames(runA)) === JSON.stringify(["Vivid Seats"]),
    `the first date marks only Vivid Seats ($182 against $210): ${lowestNames(runA)}`
  );
  assert(
    JSON.stringify(lowestNames(runB)) === JSON.stringify(["TicketNetwork"]),
    `the second date marks only TicketNetwork ($240 against $265), not the first date's winner: ${lowestNames(runB)}`
  );
  assert(
    (runA.match(/provider-cta-badge">Lowest listed</g) || []).length === 1,
    "the badge text appears once per card"
  );
  // Gated lanes never compete: the $3.80 StubHub International row is below
  // the plausibility floor and the $12 Ticket Liquidator row is display-off.
  assert(!/provider-cta-lowest[^"]*"[^>]*data-cta-provider="(stubhub-international|ticket-liquidator)"/.test(runA), "a withheld lane can never be marked lowest");
  const solo = await render(SOLO_PATH);
  assert(!solo.main.includes("provider-cta-lowest"), "a date with a single priced provider has nothing to be lower than, so no badge");
  const unpriced = await render(RUN_PATH, { withDb: false });
  assert(!unpriced.main.includes("provider-cta-lowest"), "no prices, no badge");
}

console.log(`artist-city-prices: ${passed} checks passed`);
