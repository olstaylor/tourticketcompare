#!/usr/bin/env node
//
// Tests for the noindex individual event page, /events/<slug>-<key>.
//
// Renders real routes through the middleware with a fake D1 (the pattern of
// price-notes.test.mjs and event-lifecycle.test.mjs) and checks: routing (200,
// 301 for an out-of-date slug or a past event, 404 for anything that does not
// resolve to exactly one genuine performance), noindex and self-canonical on
// every page, venue-local dates, lifecycle holds, and — the parity guarantee —
// that the event page's buttons and prices are the parent show card's, never a
// second interpretation of them.
//
// Usage: node scripts/event-page.test.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`event-page: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const middlewareModule = await load("functions/_middleware.js");
const eventPages = await load("functions/_event-pages.js");
const { resolveEventLocalDate } = await load("functions/_event-local-date.js");
const { classifyPageType } = await load("functions/_funnel.js");

// ─── fixture ────────────────────────────────────────────────────────────────

const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const catalog = JSON.parse(await read("public/data/catalog.json"));
const catalogSlugs = new Set((catalog?.artists || []).map((a) => String(a?.slug || "")));
const indexableArtist = artistsMeta.find(
  (artist) => artist?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(artist.slug)) && artist.promotion_source !== "auto"
);
const shellArtist = artistsMeta.find((artist) => artist?.indexing_status === "review_required" && catalogSlugs.has(String(artist.slug)));
assert(Boolean(indexableArtist) && Boolean(shellArtist), "the fixture needs an indexable artist and a review_required shell");
const ARTIST = { slug: String(indexableArtist.slug), name: String(indexableArtist.name || indexableArtist.slug) };
const CITY_SLUG = "springfield-united-states";
const LANES = ["vivid-seats", "ticketnetwork", "stubhub-international"];

function fixtureEvent(id, iso, extra = {}, { lanes = LANES, seatgeek = true, ticketmaster = true } = {}) {
  const tm = ticketmaster ? `https://www.ticketmaster.com/event/${id.toUpperCase()}` : "";
  const numeric = String(Math.abs([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) % 9000000 + 1000000);
  const sg = seatgeek ? `https://seatgeek.com/fixture-tickets/springfield-${numeric}/concert/${numeric}` : "";
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
    city: "Springfield",
    country: "United States",
    venue: "Fixture Arena",
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
    provider_links: {},
    verification_status: "human_verified",
    ...extra
  };
  if (tm) event.provider_links.ticketmaster = { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01", availability_status: "on_sale" };
  if (sg) event.provider_links.seatgeek = { event_id: Number(numeric), url: sg, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" };
  for (const lane of lanes) {
    const [field, url] = urls[lane];
    event[field] = url;
    event.provider_links[lane] = { event_id: numeric, url, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" };
  }
  return event;
}

// Springfield, CT: a 20:00 show is already the next day in UTC.
const PRICED = fixtureEvent("fixture-priced", "2026-09-11T01:00:00Z");
const STALE = fixtureEvent("fixture-stale", "2026-09-12T01:00:00Z");
const RESCHEDULED = fixtureEvent("fixture-rescheduled", "2026-09-13T01:00:00Z", { ticketmaster_status_code: "rescheduled" });
const CANCELLED = fixtureEvent("fixture-cancelled", "2026-09-14T01:00:00Z", { ticketmaster_status_code: "cancelled" });
const POSTPONED = fixtureEvent("fixture-postponed", "2026-09-15T01:00:00Z", { ticketmaster_status_code: "postponed" });
const UNRECOGNISED = fixtureEvent("fixture-unrecognised", "2026-09-16T01:00:00Z", { ticketmaster_status_code: "paused" });
const PENDING_BARE = fixtureEvent("fixture-pending-bare", "2026-09-17T01:00:00Z", { status: "announced", public_onsale_at: "2026-08-20T15:00:00Z" }, { lanes: [], seatgeek: false });
const NO_DESTINATION = fixtureEvent("fixture-no-destination", "2026-09-18T01:00:00Z", {}, { lanes: [], seatgeek: false, ticketmaster: false });
const UPSELL = fixtureEvent("fixture-upsell", "2026-09-19T01:00:00Z", { event_name: `${ARTIST.name} | Box seat in the Ticketmaster Suite` });
const PAST_HERE = fixtureEvent("fixture-past-here", "2026-07-01T01:00:00Z");
const PAST_ELSEWHERE = fixtureEvent("fixture-past-elsewhere", "2026-07-02T01:00:00Z", { city: "Shelbyville", venue: "Shelby Hall" });
const PAST_CANCELLED = fixtureEvent("fixture-past-cancelled", "2026-07-03T01:00:00Z", { ticketmaster_status_code: "cancelled" });
// Düsseldorf, 00:30 local on 30 Aug: still 29 Aug in UTC.
const DUSSELDORF = fixtureEvent("fixture-dusseldorf", "2026-08-29T22:30:00Z", { city: "Düsseldorf", country: "Germany", venue: "Merkur Spiel-Arena", timezone: "Europe/Berlin" });
const SHELL = fixtureEvent("fixture-shell", "2026-09-20T01:00:00Z", { artist_slug: String(shellArtist.slug), artist_name: String(shellArtist.name || shellArtist.slug) });
const EVENTS = [PRICED, STALE, RESCHEDULED, CANCELLED, POSTPONED, UNRECOGNISED, PENDING_BARE, NO_DESTINATION, UPSELL, PAST_HERE, PAST_ELSEWHERE, PAST_CANCELLED, DUSSELDORF, SHELL];
const HELD = [CANCELLED, POSTPONED, UNRECOGNISED];

const cacheRow = (event, provider, price, source, expires = "2026-08-10T09:00:00Z") => ({
  event_id: event.id, provider, low_price: price, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: expires, source
});
const PRICE_ROWS = [
  cacheRow(PRICED, "vivid-seats", 182, "vividseats_impact_marketplace_api"),
  cacheRow(PRICED, "ticketnetwork", 190, "ticketnetwork_impact_marketplace_api"),
  cacheRow(RESCHEDULED, "vivid-seats", 205, "vividseats_impact_marketplace_api"),
  // Expired: must be invisible on both surfaces.
  cacheRow(STALE, "vivid-seats", 99, "vividseats_impact_marketplace_api", "2026-08-02T09:00:00Z"),
  // Held dates have fresh rows; neither surface may show them.
  ...HELD.map((event) => cacheRow(event, "vivid-seats", 150, "vividseats_impact_marketplace_api"))
];
// History for PRICED/Vivid Seats: a lower in-window figure and an earlier,
// higher one, so the page has a 30-day low and a recorded move to state.
const WINDOW_MIN_ROWS = [{ event_id: PRICED.id, provider: "vivid-seats", currency: "USD", low_price: 150, observed_at: "2026-07-20T09:00:00Z" }];
const SERIES_ROWS = [
  { event_id: PRICED.id, provider: "vivid-seats", currency: "USD", low_price: 182, observed_at: "2026-08-09T09:00:00Z" },
  { event_id: PRICED.id, provider: "vivid-seats", currency: "USD", low_price: 200, observed_at: "2026-08-01T09:00:00Z" }
];

const queriedIds = [];
function fakeDb() {
  return {
    prepare(sql) {
      return {
        bind(...bindings) {
          const wanted = new Set(bindings.map(String));
          return {
            async all() {
              if (/provider_pricing_cache/.test(sql)) {
                queriedIds.push(...bindings.map(String).filter((b) => b.startsWith("fixture-")));
                return { results: PRICE_ROWS.filter((row) => wanted.has(String(row.event_id))) };
              }
              if (/ROW_NUMBER/.test(sql)) return { results: SERIES_ROWS.filter((row) => wanted.has(row.event_id)) };
              if (/MIN\(low_price\)/.test(sql)) return { results: WINDOW_MIN_ROWS.filter((row) => wanted.has(row.event_id)) };
              return { results: [] };
            },
            async first() { return null; },
            async run() { return { success: true }; }
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

function env(events) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(events));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    SCHEMA_OFFERS_ENABLED: "true",
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
    DEMAND_DB: fakeDb(),
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, events = EVENTS) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: env(events),
    next: () => new Response("static-asset", { status: 200 })
  });
  const location = response.headers.get("location") || "";
  return { status: response.status, location: location.replace(ORIGIN, ""), html: await response.text() };
}

const pathOf = (event) => eventPages.eventPath(event);
const meta = (html, pattern) => html.match(pattern)?.[1] || "";
const robots = (html) => meta(html, /<meta name="robots" content="([^"]+)"/);
const canonical = (html) => meta(html, /<link rel="canonical" href="([^"]+)"/);
const title = (html) => meta(html, /<title>([^<]*)<\/title>/);
const description = (html) => meta(html, /<meta name="description" content="([^"]*)"/);
const h1 = (html) => meta(html, /<h1[^>]*>([^<]*)<\/h1>/).replace(/&amp;/g, "&");
const text = (html) => String(html).replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const mainOf = (html) => html.slice(html.indexOf("<main"), html.indexOf("</main>"));
function card(html, eventId) {
  const at = html.indexOf(`data-event-id="${eventId}"`);
  if (at < 0) return "";
  return html.slice(html.lastIndexOf("<article", at), html.indexOf("</article>", at));
}
// The outbound buttons of one card: href and visible text, in order.
const buttons = (cardHtml) => [...cardHtml.matchAll(/<a\b[^>]*href="(\/api\/out\?[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => `${m[1]} :: ${text(m[2])}`);
const outLinks = (html, id) => (html.match(new RegExp(`/api/out\\?showId=${id}&`, "g")) || []).length;

// ─── a live, priced date ────────────────────────────────────────────────────

const ARTIST_CITY = `/artists/${ARTIST.slug}/tickets/${CITY_SLUG}`;
{
  queriedIds.length = 0;
  const page = await render(pathOf(PRICED));
  assert(page.status === 200, `the canonical live event URL serves 200 (got ${page.status})`);
  assert(robots(page.html) === "noindex,follow", "an event page is noindex,follow");
  assert(canonical(page.html) === `${ORIGIN}${pathOf(PRICED)}`, "an event page's canonical is its own current path");
  assert(new Set(queriedIds).size === 1 && queriedIds[0] === PRICED.id, `only this one event's prices are queried (got ${[...new Set(queriedIds)].join(", ")})`);

  const localDate = resolveEventLocalDate(PRICED).iso;
  assert(localDate === "2026-09-10" && PRICED.datetime_iso.startsWith("2026-09-11"), "the fixture's venue-local date differs from its UTC date");
  assert(pathOf(PRICED).includes("-2026-09-10-"), "the path carries the venue-local date");
  assert(h1(page.html) === `${ARTIST.name} at Fixture Arena, Springfield — Thu, Sep 10, 2026`, `the H1 names artist, venue, city and venue-local date (got ${h1(page.html)})`);
  assert(!/Sep 11/.test(h1(page.html) + title(page.html)), "the UTC date never appears in the H1 or title");
  assert(/Sep 10, 2026/.test(title(page.html)) && / Tickets/.test(title(page.html)), `the title is factual (got ${title(page.html)})`);
  assert(!/\$/.test(title(page.html)) && !/\$/.test(description(page.html)), "no price in the title or description");
  assert(/Event details/.test(page.html) && /Fixture Arena/.test(text(mainOf(page.html))) && /Springfield, United States/.test(text(mainOf(page.html))), "the page states venue, city and country");
  assert(/8:00 PM local time/.test(text(mainOf(page.html))), "the page states the local start time");
  assert(/How this site makes money/.test(page.html), "the money disclosure sits with the buttons");

  // Parity: the event card is the parent card, button for button.
  const parent = await render(ARTIST_CITY);
  assert(parent.status === 200, "the parent artist-city page renders");
  const eventButtons = buttons(card(page.html, PRICED.id));
  const parentButtons = buttons(card(parent.html, PRICED.id));
  assert(eventButtons.length >= 4, `the event page has the date's ticket buttons (got ${eventButtons.length})`);
  assert(JSON.stringify(eventButtons) === JSON.stringify(parentButtons), `event and parent cards carry identical buttons, hrefs and prices\n  event:  ${eventButtons.join("\n          ")}\n  parent: ${parentButtons.join("\n          ")}`);
  assert(eventButtons.some((b) => /\$182/.test(b)) && eventButtons.some((b) => /\$190/.test(b)), "the approved snapshots print on both");
  const artistPage = await render(`/artists/${ARTIST.slug}`);
  assert(JSON.stringify(buttons(card(artistPage.html, PRICED.id))) === JSON.stringify(eventButtons), "the artist page's card matches too");

  // Recorded prices: the same figures the artist-city price answer states.
  const prices = text(meta(page.html, /(<section[^>]*aria-labelledby="eventPricesTitle"[\s\S]*?<\/section>)/));
  assert(/Lowest listed price now: \$182 on Vivid Seats/.test(prices), `the lowest current price matches the button (got ${prices.slice(0, 200)})`);
  assert(/30-day low \$150 · Vivid Seats/.test(prices), "the recorded 30-day low is stated");
  assert(text(parent.html).includes("30-day low $150 · Vivid Seats"), "the parent price answer states the same low");
  assert(/Latest recorded change: Vivid Seats down \$18: \$200 when recorded/.test(prices), "the latest recorded move is stated");

  // Links back to existing pages only.
  assert(page.html.includes(`href="${ARTIST_CITY}"`) && page.html.includes(`href="/artists/${ARTIST.slug}"`), "the page links back to the artist-city and artist pages");
  assert(!/href="\/events\//.test(mainOf(page.html)), "the page links to no other event page");

  // Structured data: the site graph and a breadcrumb only.
  const graph = JSON.parse(meta(page.html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/))["@graph"] || [];
  assert(!graph.some((node) => node?.["@type"] === "MusicEvent" || node?.["@type"] === "Offer"), "no MusicEvent or Offer structured data on an event page");
  assert(graph.some((node) => node?.["@type"] === "BreadcrumbList"), "the visible breadcrumb is mirrored");

  // Stale snapshot: invisible on both surfaces.
  const stale = await render(pathOf(STALE));
  assert(!/\$99/.test(stale.html) && !/\$99/.test(card(parent.html, STALE.id)), "an expired snapshot shows on neither surface");
  assert(JSON.stringify(buttons(card(stale.html, STALE.id))) === JSON.stringify(buttons(card(parent.html, STALE.id))), "the stale date's buttons match the parent's");
}

// ─── out-of-date readable slugs and reschedules ─────────────────────────────

{
  const moved = { ...PRICED, venue: "Fixture Stadium" };
  const events = EVENTS.map((event) => (event.id === PRICED.id ? moved : event));
  const redirect = await render(pathOf(PRICED), events);
  assert(redirect.status === 301 && redirect.location === pathOf(moved), `a venue change 301s the old path to the current one (got ${redirect.status} ${redirect.location})`);
  const current = await render(pathOf(moved), events);
  assert(current.status === 200 && canonical(current.html) === `${ORIGIN}${pathOf(moved)}`, "the current path serves with itself as canonical");

  const rescheduledPage = await render(pathOf(RESCHEDULED));
  assert(rescheduledPage.status === 200 && outLinks(rescheduledPage.html, RESCHEDULED.id) > 0, "a rescheduled date keeps its page and buttons");
  assert(/Rescheduled, per Ticketmaster/.test(text(rescheduledPage.html)) && /Rescheduled: this is the date Ticketmaster now lists/.test(text(rescheduledPage.html)), "a rescheduled date says so");
  const newDate = { ...RESCHEDULED, datetime_iso: "2026-10-02T01:00:00Z" };
  const redated = EVENTS.map((event) => (event.id === RESCHEDULED.id ? newDate : event));
  const redirected = await render(pathOf(RESCHEDULED), redated);
  assert(redirected.status === 301 && redirected.location === pathOf(newDate) && pathOf(newDate).includes("-2026-10-01-"), "a moved date 301s to the path carrying the new local date");
  assert(eventPages.eventKey(newDate.id) === eventPages.eventKey(RESCHEDULED.id), "the key survives the move");
}

// ─── held dates ─────────────────────────────────────────────────────────────

for (const event of HELD) {
  const page = await render(pathOf(event));
  assert(page.status === 200, `${event.id}: a held future date keeps its page (got ${page.status})`);
  assert(robots(page.html) === "noindex,follow", `${event.id}: noindex,follow`);
  assert(outLinks(page.html, event.id) === 0 && !/\/api\/out/.test(mainOf(page.html)), `${event.id}: no ticket button`);
  assert(!/\$\d/.test(mainOf(page.html)) && !/price-history|eventPricesTitle|How this site makes money/.test(page.html), `${event.id}: no price, price history or buying disclosure`);
  assert(/Ticket status/.test(page.html) && !/ Tickets/.test(title(page.html)), `${event.id}: no ticket-buying framing in the heading or title (got ${title(page.html)})`);
}
{
  const cancelled = await render(pathOf(CANCELLED));
  assert(/\(Cancelled\)/.test(title(cancelled.html)) && /as cancelled/.test(description(cancelled.html)), "a cancelled page's title and description say cancelled");
  assert(/Cancelled, per Ticketmaster/.test(text(cancelled.html)) && /Ticketmaster lists this date as cancelled/.test(text(cancelled.html)), "a cancelled page states the status");
  const postponed = await render(pathOf(POSTPONED));
  assert(/\(Postponed\)/.test(title(postponed.html)) && /Postponed, per Ticketmaster/.test(text(postponed.html)), "a postponed page states postponed");
  const unknown = await render(pathOf(UNRECOGNISED));
  assert(/Being checked/.test(text(unknown.html)) && /status is being checked/.test(description(unknown.html)), "an unrecognised status fails closed with neutral wording");
}

// ─── not a concert page, or nowhere to lead ─────────────────────────────────

{
  const upsell = await render(pathOf(UPSELL));
  assert(upsell.status === 404 && /noindex/.test(robots(upsell.html)), "a non-performance listing gets no page");
  const shell = await render(pathOf(SHELL));
  assert(shell.status === 404, "an event of an artist under review gets no page");
  const nowhere = await render(pathOf(NO_DESTINATION));
  assert(nowhere.status === 301 && nowhere.location === ARTIST_CITY, `a date with no ticket destination 301s to its artist-city page (got ${nowhere.status} ${nowhere.location})`);
  const pending = await render(pathOf(PENDING_BARE));
  assert(pending.status === 200 && /Public on-sale/.test(text(pending.html)) && outLinks(pending.html, PENDING_BARE.id) === 0, "a pre-on-sale date with no resale link states its on-sale time");
}

// ─── past events ────────────────────────────────────────────────────────────

{
  const here = await render(pathOf(PAST_HERE));
  assert(here.status === 301 && here.location === ARTIST_CITY, `a past date 301s to the artist-city page while it renders (got ${here.location})`);
  const elsewhere = await render(pathOf(PAST_ELSEWHERE));
  assert(elsewhere.status === 301 && elsewhere.location === `/artists/${ARTIST.slug}`, `a past date with no live city page 301s to the artist page (got ${elsewhere.location})`);
  const pastCancelled = await render(pathOf(PAST_CANCELLED));
  assert(pastCancelled.status === 301 && pastCancelled.location === ARTIST_CITY, "a past cancelled date expires like any other");
  const stalePast = await render(pathOf({ ...PAST_HERE, venue: "Renamed Hall" }));
  assert(stalePast.status === 301 && stalePast.location === ARTIST_CITY, "an old slug of a past date takes one hop, straight to the parent");
}

// ─── non-US timezone, non-ASCII names ───────────────────────────────────────

{
  const p = pathOf(DUSSELDORF);
  assert(p.includes("-merkur-spiel-arena-dusseldorf-2026-08-30-"), `the path folds the accent and carries the local date (got ${p})`);
  const page = await render(p);
  assert(page.status === 200 && /Sun, Aug 30, 2026/.test(h1(page.html)) && !/Aug 29/.test(h1(page.html)), `the H1 carries the local date, not UTC (got ${h1(page.html)})`);
  assert(/Düsseldorf, Germany/.test(text(mainOf(page.html))) && /12:30 AM local time/.test(text(mainOf(page.html))), "the page keeps the real city name and local time");
}

// ─── resolution failures ────────────────────────────────────────────────────

{
  const key = eventPages.eventKey(PRICED.id);
  const cases = [
    [`/events/${ARTIST.slug}-fixture-arena-springfield-2026-09-10-0123456789abcdef`, "an unknown key"],
    [`/events/another-artist-fixture-arena-springfield-2026-09-10-${key}`, "another artist's readable part"],
    [`/events/${key}`, "a bare key"],
    [`/events/${ARTIST.slug}-${key.slice(2)}`, "a short key"],
    ["/events/", "the bare prefix"],
    ["/events", "the prefix without a slash"]
  ];
  for (const [candidate, label] of cases) {
    const page = await render(candidate);
    assert(page.status === 404 || (page.status === 301 && candidate.endsWith("/")), `${label} does not resolve (got ${page.status} for ${candidate})`);
  }
  const duplicated = [...EVENTS, { ...PRICED, venue: "Somewhere Else" }];
  const collided = await render(pathOf(PRICED), duplicated);
  assert(collided.status === 404, "a key held by two records fails closed");
}

// ─── analytics page type ────────────────────────────────────────────────────

assert(classifyPageType(pathOf(PRICED)) === "event", "analytics classifies an event page as its own page type");
assert(classifyPageType("/events") === "other", "the bare prefix is not an event page");

console.log(`event-page: ${passed} checks passed`);
