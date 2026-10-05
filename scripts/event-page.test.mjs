#!/usr/bin/env node
//
// Tests for the noindex individual event page, /events/<slug>-<key>.
//
// Renders real routes through the middleware with a fake D1 (the pattern of
// price-notes.test.mjs and event-lifecycle.test.mjs) and checks: routing (200,
// 301 for an out-of-date slug or a past event, 404 for anything that does not
// resolve to exactly one genuine performance), noindex and self-canonical on
// every page, venue-local dates, lifecycle holds, the page's one MusicEvent
// node (never an offer), and — the parity guarantee —
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
// Six days out at NOW: close enough to show day for the 7-day change. Kept out of
// EVENTS and rendered only by its own block, so no other assertion sees it.
const NEAR = fixtureEvent("fixture-near", "2026-08-15T01:00:00Z");
const EVENTS = [PRICED, STALE, RESCHEDULED, CANCELLED, POSTPONED, UNRECOGNISED, PENDING_BARE, NO_DESTINATION, UPSELL, PAST_HERE, PAST_ELSEWHERE, PAST_CANCELLED, DUSSELDORF, SHELL];
const HELD = [CANCELLED, POSTPONED, UNRECOGNISED];

const cacheRow = (event, provider, price, source, expires = "2026-08-10T09:00:00Z") => ({
  event_id: event.id, provider, low_price: price, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: expires, source
});
const PRICE_ROWS = [
  cacheRow(PRICED, "vivid-seats", 182, "vividseats_impact_marketplace_api"),
  cacheRow(PRICED, "ticketnetwork", 190, "ticketnetwork_impact_marketplace_api"),
  cacheRow(RESCHEDULED, "vivid-seats", 205, "vividseats_impact_marketplace_api"),
  cacheRow(NEAR, "vivid-seats", 182, "vividseats_impact_marketplace_api"),
  cacheRow(NEAR, "ticketnetwork", 190, "ticketnetwork_impact_marketplace_api"),
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
  { event_id: PRICED.id, provider: "vivid-seats", currency: "USD", low_price: 200, observed_at: "2026-08-01T09:00:00Z" },
  // NEAR/Vivid Seats: 224 standing a week ago, after a one-reading $40 glitch
  // that must never surface, then 182 now.
  { event_id: NEAR.id, provider: "vivid-seats", currency: "USD", low_price: 220, observed_at: "2026-07-30T09:00:00Z" },
  { event_id: NEAR.id, provider: "vivid-seats", currency: "USD", low_price: 40, observed_at: "2026-07-31T09:00:00Z" },
  { event_id: NEAR.id, provider: "vivid-seats", currency: "USD", low_price: 224, observed_at: "2026-08-01T09:00:00Z" },
  { event_id: NEAR.id, provider: "vivid-seats", currency: "USD", low_price: 182, observed_at: "2026-08-09T09:00:00Z" }
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
const graphOf = (html) => JSON.parse(meta(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || "{}")["@graph"] || [];
const musicEventOf = (html) => graphOf(html).filter((node) => node?.["@type"] === "MusicEvent");
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
  assert(/Lowest listed price: \$182 on Vivid Seats, as of 9 Aug 2026, 09:00 UTC/.test(prices), `the lowest listed price matches the button and states its capture time (got ${prices.slice(0, 200)})`);
  assert(!/\bnow:/.test(prices), "a cached price is never labelled as current");
  assert(/30-day low \$150 · Vivid Seats/.test(prices), "the recorded 30-day low is stated");
  assert(text(parent.html).includes("30-day low $150 · Vivid Seats"), "the parent price answer states the same low");
  assert(/Latest recorded change: Vivid Seats down \$18: \$200 when recorded/.test(prices), "the latest recorded move is stated");

  // public/shell.js reads this to credit the page view to the artist (Codex, #1195).
  assert(page.html.includes(`data-page-artist="${ARTIST.slug}"`), "the event page names its artist for analytics");

  // Links back to existing pages only.
  assert(page.html.includes(`href="${ARTIST_CITY}"`) && page.html.includes(`href="/artists/${ARTIST.slug}"`), "the page links back to the artist-city and artist pages");
  assert(!/href="\/events\//.test(mainOf(page.html)), "the page links to no other event page");

  // Structured data: the site graph, the breadcrumb, and one MusicEvent for
  // this performance, identified by this page, with an Offer for each price
  // badge the page's own ticket buttons show (SCHEMA_OFFERS_ENABLED is on).
  // scripts/validate-route-schema.mjs checks every property against the page.
  const graph = graphOf(page.html);
  const nodes = graph.filter((node) => node?.["@type"] === "MusicEvent");
  assert(nodes.length === 1, `one MusicEvent on an event page (got ${nodes.length})`);
  const [node] = nodes;
  assert(node["@id"] === `${ORIGIN}${pathOf(PRICED)}#event` && node.url === `${ORIGIN}${pathOf(PRICED)}`, "the node is identified by the canonical event URL");
  assert(node.startDate === "2026-09-10T20:00:00-05:00", `startDate is the venue-local time the page states (got ${node.startDate})`);
  assert(node.eventStatus === "https://schema.org/EventScheduled", "a scheduled date is EventScheduled");
  assert(node.performer?.["@id"] === `${ORIGIN}/artists/${ARTIST.slug}#artist`, "the performer is the artist page's own entity");
  assert(node.name === `${ARTIST.name} at Fixture Arena` && node.location?.name === "Fixture Arena" && node.location?.address?.addressLocality === "Springfield", "name and location are the visible venue and city");
  const offers = Array.isArray(node.offers) ? node.offers : [];
  assert(offers.length >= 1, "a priced event page carries an Offer");
  assert(offers.every((offer) => offer["@type"] === "Offer" && mainOf(page.html).includes(String(Math.round(offer.price))) && offer.url.startsWith(`${ORIGIN}/api/out?`) && offer.priceValidUntil), "each Offer is a visible price with its tracked link and expiry");
  assert(!/availability/i.test(JSON.stringify(node)), "no availability claim in the event page's structured data");
  assert(graph.some((entry) => entry?.["@type"] === "BreadcrumbList"), "the visible breadcrumb is mirrored");

  // Stale snapshot: invisible on both surfaces.
  const stale = await render(pathOf(STALE));
  assert(!/\$99/.test(stale.html) && !/\$99/.test(card(parent.html, STALE.id)), "an expired snapshot shows on neither surface");
  assert(JSON.stringify(buttons(card(stale.html, STALE.id))) === JSON.stringify(buttons(card(parent.html, STALE.id))), "the stale date's buttons match the parent's");
}

// ─── the 7-day change close to show day ─────────────────────────────────────

{
  const WEEK_LINE = "Lowest listed price on Vivid Seats down 19% over the last 7 days: $224 a week ago, $182 at the latest check.";
  const withNear = [...EVENTS, NEAR];
  const page = await render(pathOf(NEAR), withNear);
  const prices = text(meta(page.html, /(<section[^>]*aria-labelledby="eventPricesTitle"[\s\S]*?<\/section>)/));
  assert(prices.includes(`This week: ${WEEK_LINE}`), `a date six days out states its 7-day change (got ${prices.slice(0, 400)})`);
  assert(!/TicketNetwork (up|down) \d+%/.test(prices), "a lane with no history a week old says nothing");
  assert(!/\$40\b/.test(page.html), "the one-reading glitch never reaches the page");
  const parent = await render(ARTIST_CITY, withNear);
  assert(text(parent.html).includes(WEEK_LINE), "the parent price answer states the same change");
  const far = await render(pathOf(PRICED), withNear);
  assert(!/This week:/.test(far.html) && !/over the last 7 days/.test(far.html), "a date a month out states no weekly change");
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
  const [rescheduledNode] = musicEventOf(rescheduledPage.html);
  assert(rescheduledNode?.eventStatus === "https://schema.org/EventRescheduled" && !("previousStartDate" in rescheduledNode), "a rescheduled date is EventRescheduled, with no invented previousStartDate");
  const newDate = { ...RESCHEDULED, datetime_iso: "2026-10-02T01:00:00Z" };
  const redated = EVENTS.map((event) => (event.id === RESCHEDULED.id ? newDate : event));
  const redirected = await render(pathOf(RESCHEDULED), redated);
  assert(redirected.status === 301 && redirected.location === pathOf(newDate) && pathOf(newDate).includes("-2026-10-01-"), "a moved date 301s to the path carrying the new local date");
  assert(!/application\/ld\+json/.test(redirected.html), "the old path answers with no structured data");
  const [movedNode] = musicEventOf((await render(pathOf(newDate), redated)).html);
  assert(movedNode?.url === `${ORIGIN}${pathOf(newDate)}` && movedNode.startDate.startsWith("2026-10-01"), "the current path's node carries the new date and URL");
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
  assert(!/ plays /.test(mainOf(page.html)) && !/before you travel/.test(mainOf(page.html)), `${event.id}: the buying notes never say the held show goes ahead`);
  // Structured data agrees with the hold: a factual cancelled or postponed
  // node, never an unrecognised status, and never an offer, price or
  // availability, although a fresh approved row exists and the flag is on.
  const expected = { [CANCELLED.id]: "https://schema.org/EventCancelled", [POSTPONED.id]: "https://schema.org/EventPostponed" }[event.id];
  const nodes = musicEventOf(page.html);
  assert(expected ? nodes.length === 1 && nodes[0].eventStatus === expected : nodes.length === 0, `${event.id}: ${expected ? `one ${expected} node` : "no MusicEvent"} (got ${nodes.map((node) => node.eventStatus).join(", ") || "none"})`);
  assert(!graphOf(page.html).some((node) => node?.["@type"] === "Offer") && !nodes.some((node) => "offers" in node || /price|availability/i.test(JSON.stringify(node))), `${event.id}: no Offer, price or availability in structured data`);
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
  assert(musicEventOf(pending.html).length === 0, "a pre-on-sale date gets no MusicEvent, as on every parent board");
  assert(!/application\/ld\+json/.test(upsell.html) || musicEventOf(upsell.html).length === 0, "a non-performance listing has no event structured data");
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
  const [node] = musicEventOf(page.html);
  assert(node?.startDate === "2026-08-30T00:30:00+02:00" && node.location?.address?.addressLocality === "Düsseldorf" && node.location?.address?.addressCountry === "DE", `the node carries the local date, time and real city name (got ${node?.startDate})`);
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

// ─── parent boards link each date to its page ───────────────────────────────
//
// "Show details" on the artist, artist-city, city and venue cards: only to a
// page the router serves (200), always the event's current canonical path, and
// always beside — never instead of — the date's ticket buttons.

const CITY_PATH = `/cities/${CITY_SLUG}`;
const VENUE_PATH = "/venues/fixture-arena-springfield";
const PARENTS = [`/artists/${ARTIST.slug}`, ARTIST_CITY, CITY_PATH, VENUE_PATH];
const detailsLinks = (html) => [...mainOf(html).matchAll(/<a class="text-link show-details-link" href="([^"]+)"/g)].map((m) => m[1]);
const detailsLinkOf = (cardHtml) => cardHtml.match(/<a class="text-link show-details-link" href="([^"]+)"/)?.[1] || "";
{
  const pages = new Map();
  for (const parent of PARENTS) {
    const page = await render(parent);
    assert(page.status === 200, `${parent} renders (got ${page.status})`);
    pages.set(parent, page);
  }
  const served = [PRICED, STALE, RESCHEDULED, ...HELD, PENDING_BARE];
  for (const [parent, page] of pages) {
    for (const event of served) {
      const eventCard = card(page.html, event.id);
      assert(Boolean(eventCard), `${parent}: ${event.id} has a card`);
      assert(detailsLinkOf(eventCard) === pathOf(event), `${parent}: ${event.id} links its canonical event page (got "${detailsLinkOf(eventCard)}")`);
      assert(/>Show details<span class="sr-only">/.test(eventCard), `${parent}: the link reads "Show details"`);
      // The fragment anchor stays the card's id, whatever else links to it.
      assert(eventCard.includes(`id="show-${event.id}"`), `${parent}: ${event.id} keeps its #show- anchor`);
    }
    for (const event of [UPSELL, NO_DESTINATION]) {
      const eventCard = card(page.html, event.id);
      if (eventCard) assert(!detailsLinkOf(eventCard), `${parent}: ${event.id} (no page of its own) gets no event link`);
    }
    // Only real, served paths: every link is one of the served events' own
    // (the artist board also carries the Düsseldorf date).
    const expected = parent === `/artists/${ARTIST.slug}` ? [...served, DUSSELDORF] : served;
    const links = detailsLinks(page.html);
    assert(links.length === expected.length, `${parent}: one event link per served date (got ${links.length})`);
    assert(links.every((link) => expected.some((event) => pathOf(event) === link)), `${parent}: every event link is a served event's canonical path`);
  }

  // The link sits after the buttons and price notes, is plain navigation
  // (no /api/out, no CTA tracking), and leaves the buttons as they were: the
  // card's buttons still equal the event page's, which the parity check above
  // pins to the pre-link card.
  const artistCity = pages.get(ARTIST_CITY);
  const pricedCard = card(artistCity.html, PRICED.id);
  const linkAt = pricedCard.indexOf("show-details-link");
  assert(linkAt > pricedCard.lastIndexOf("/api/out?") && linkAt > pricedCard.indexOf("provider-cta-notes"), "Show details follows the ticket buttons and price notes");
  assert(!/show-details-link[^>]*data-cta-/.test(pricedCard) && !/show-details-link" href="\/api\//.test(pricedCard), "Show details is not a CTA");
  assert(buttons(pricedCard).length >= 4 && buttons(pricedCard).some((b) => /\$182/.test(b)), "the priced card keeps every ticket button and its price inline");
  assert(text(artistCity.html).includes("30-day low $150 · Vivid Seats"), "the artist-city price answer still compares the dates inline");
  const eventPage = await render(pathOf(PRICED));
  assert(JSON.stringify(buttons(pricedCard)) === JSON.stringify(buttons(card(eventPage.html, PRICED.id))), "parent and event cards still carry identical buttons");
  for (const parent of PARENTS) {
    const page = pages.get(parent);
    for (const event of [PRICED, STALE, RESCHEDULED]) {
      assert(outLinks(page.html, event.id) >= 4, `${parent}: ${event.id} keeps its ticket buttons beside Show details`);
    }
  }

  // Held dates link to the page that states their status; still no buttons.
  for (const event of HELD) {
    const heldCard = card(artistCity.html, event.id);
    assert(detailsLinkOf(heldCard) === pathOf(event) && outLinks(heldCard, event.id) === 0 && !/\$\d/.test(heldCard), `${event.id}: linked, with no ticket button or price`);
  }

  // The artist board keeps its fragment deep links and copy-link action.
  const artistPage = pages.get(`/artists/${ARTIST.slug}`);
  const artistCard = card(artistPage.html, PRICED.id);
  assert(artistCard.includes(`data-copy-show-link="show-${PRICED.id}"`) && artistCard.includes(`href="#show-${PRICED.id}"`), "the copy-link action still targets the card's #show- anchor");

  // City cards: one "details" link. The artist-page link keeps its fragment
  // and is named for what it adds.
  const cityCard = card(pages.get(CITY_PATH).html, PRICED.id);
  assert((text(cityCard).match(/details/gi) || []).length === 1, "a city card carries a single details link");
  // A single-date city has no indexable artist-city page, so its card keeps the
  // artist-page link, deep-linked to the date, now named "All <artist> dates".
  const { citySlug } = await load("functions/_cities.js");
  const single = await render(`/cities/${citySlug(DUSSELDORF.city, DUSSELDORF.country)}`);
  const singleCard = card(single.html, DUSSELDORF.id);
  assert(single.status === 200 && detailsLinkOf(singleCard) === pathOf(DUSSELDORF), "a single-date city card links its event page");
  assert(singleCard.includes(`href="/artists/${ARTIST.slug}#show-${DUSSELDORF.id}">All ${ARTIST.name} dates</a>`), "and keeps its artist-page deep link, renamed");
  assert((text(singleCard).match(/details/gi) || []).length === 1, "with a single details link");

  // Every link any parent emits renders 200 and is noindex,follow.
  for (const link of new Set([...pages.values()].flatMap((page) => detailsLinks(page.html)))) {
    const target = await render(link);
    assert(target.status === 200 && robots(target.html) === "noindex,follow", `${link} serves 200 noindex,follow (got ${target.status})`);
  }

  // Parent structured data does not point at event pages: their MusicEvent
  // nodes keep their #show-<id> urls until the event-indexing rollout decides.
  for (const [parent, page] of pages) {
    const jsonLd = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("");
    assert(!jsonLd.includes("/events/"), `${parent}: no structured data references an event page`);
  }
}
{
  // A shell artist's dates have no page, so their cards link nowhere.
  const shellPage = await render(`/artists/${shellArtist.slug}`);
  const shellCard = card(shellPage.html, SHELL.id);
  assert(!shellCard || !detailsLinkOf(shellCard), "a review_required artist's card has no event link");

  // The linker is the router's decision: no link for a past date (301), a date
  // with nowhere to lead (301), a non-performance listing or a shell (404).
  const link = eventPages.eventPageLinker(EVENTS, artistsMeta);
  for (const event of [PAST_HERE, PAST_CANCELLED, NO_DESTINATION, UPSELL, SHELL]) {
    assert(link(event.id) === "", `${event.id}: no event link`);
  }
  assert(link(PRICED.id) === pathOf(PRICED) && link(CANCELLED.id) === pathOf(CANCELLED), "a live or held date links its canonical path");
  assert(link("no-such-id") === "", "an unknown id links nowhere");
  assert(eventPages.eventPageLinkPath(EVENTS, [], PRICED) === "", "without the artist's record, no link (the router would 404)");

  // After a venue rename the board emits the current path, never the old one.
  const moved = { ...PRICED, venue: "Fixture Stadium" };
  const events = EVENTS.map((event) => (event.id === PRICED.id ? moved : event));
  const movedBoard = await render(ARTIST_CITY, events);
  const movedLink = detailsLinkOf(card(movedBoard.html, PRICED.id));
  assert(movedLink === pathOf(moved) && movedLink !== pathOf(PRICED), `a renamed venue's card links the current slug (got ${movedLink})`);
  const followed = await render(movedLink, events);
  assert(followed.status === 200, "and that path serves 200");
}
{
  // Indexing is unchanged: no event URL in the sitemap or llms.txt.
  const { onRequestGet: sitemapGet } = await load("functions/sitemap.xml.js");
  const { onRequestGet: llmsGet } = await load("functions/llms.txt.js");
  const sitemap = await (await sitemapGet({ request: new Request(`${ORIGIN}/sitemap.xml`), env: env(EVENTS) })).text();
  const llms = await (await llmsGet({ request: new Request(`${ORIGIN}/llms.txt`), env: env(EVENTS) })).text();
  assert(sitemap.includes("<urlset") && !sitemap.includes("/events/"), "the sitemap lists no event page");
  assert(llms.length > 0 && !llms.includes("/events/"), "llms.txt lists no event page");
}

// ─── analytics page type ────────────────────────────────────────────────────

assert(classifyPageType(pathOf(PRICED)) === "event", "analytics classifies an event page as its own page type");
assert(classifyPageType("/events") === "other", "the bare prefix is not an event page");

console.log(`event-page: ${passed} checks passed`);
