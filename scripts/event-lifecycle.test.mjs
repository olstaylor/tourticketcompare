#!/usr/bin/env node
//
// Regression tests for event lifecycle holds (`ticketmaster_status_code`).
//
// A cancelled or postponed show — or one carrying a status TTC does not
// recognise — must not show a ticket button, a price, an on-sale listing or a
// MusicEvent node anywhere, and /api/out must refuse to redirect for it. A
// rescheduled show keeps its buttons and says it was rescheduled. A show with
// no stored status behaves exactly as before. One stored value drives every
// surface, through eventLifecycleHeld in functions/_route-indexability.js.
//
// Renders real routes through the middleware with a fake D1 (the pattern of
// price-notes.test.mjs), calls /api/out and /api/shows directly, and checks
// the offline mirrors and public/app.js against the same cases.
//
// Usage: node scripts/event-lifecycle.test.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`event-lifecycle: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const policy = await load("functions/_route-indexability.js");
const middlewareModule = await load("functions/_middleware.js");
const outModule = await load("functions/api/out.js");
const showsModule = await load("functions/api/shows.js");
const coverage = await load("scripts/lib/event-link-coverage.mjs");
const { deriveCityDatePrices } = await load("functions/_artist-city-prices.js");
const { deriveOnsaleCalendar } = await load("functions/_onsale-calendar.js");
const { deriveArtistCities } = await load("functions/_artist-cities.js");
const eventPages = await load("functions/_event-pages.js");

const { EVENT_LIFECYCLE, eventLifecycle, eventLifecycleHeld, eventPublishable, eventStatusPublishable } = policy;

// ─── fixture ────────────────────────────────────────────────────────────────

const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const catalog = JSON.parse(await read("public/data/catalog.json"));
const catalogSlugs = new Set((catalog?.artists || []).map((a) => String(a?.slug || "")));
const indexableArtist = artistsMeta.find(
  (artist) => artist?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(artist.slug)) && artist.promotion_source !== "auto"
);
assert(Boolean(indexableArtist), "the fixture needs one editorially indexable artist");
const ARTIST = { slug: String(indexableArtist.slug), name: String(indexableArtist.name || indexableArtist.slug) };
const CITY_SLUG = "springfield-united-states";
const VENUE_SLUG = "fixture-arena-springfield";
const LANES = ["vivid-seats", "ticketnetwork", "stubhub-international"];
const PROVIDERS = ["seatgeek", ...LANES, "ticket-liquidator", "ticketmaster"];

function fixtureEvent(id, iso, extra = {}) {
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
    provider_links: {
      ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01", availability_status: "on_sale" },
      seatgeek: { event_id: Number(numeric), url: sg, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" }
    },
    verification_status: "human_verified",
    ...extra
  };
  for (const lane of LANES) {
    const [field, url] = urls[lane];
    event[field] = url;
    event.provider_links[lane] = { event_id: numeric, url, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" };
  }
  return event;
}

const SCHEDULED = fixtureEvent("fixture-scheduled", "2026-09-11T01:00:00Z");
const RESCHEDULED = fixtureEvent("fixture-rescheduled", "2026-09-12T01:00:00Z", { ticketmaster_status_code: "rescheduled" });
const CANCELLED = fixtureEvent("fixture-cancelled", "2026-09-13T01:00:00Z", { ticketmaster_status_code: "cancelled" });
const CANCELED = fixtureEvent("fixture-canceled", "2026-09-14T01:00:00Z", { ticketmaster_status_code: "canceled" });
const POSTPONED = fixtureEvent("fixture-postponed", "2026-09-15T01:00:00Z", { ticketmaster_status_code: "postponed" });
const UNRECOGNISED = fixtureEvent("fixture-unrecognised", "2026-09-16T01:00:00Z", { ticketmaster_status_code: "paused" });
// A pending public on-sale that is cancelled before it opens.
const CANCELLED_PENDING = fixtureEvent("fixture-cancelled-pending", "2026-09-17T01:00:00Z", {
  status: "announced",
  public_onsale_at: "2026-08-20T15:00:00Z",
  ticketmaster_status_code: "cancelled"
});
const PENDING = fixtureEvent("fixture-pending", "2026-09-18T01:00:00Z", { status: "announced", public_onsale_at: "2026-08-21T15:00:00Z" });
const HELD = [CANCELLED, CANCELED, POSTPONED, UNRECOGNISED, CANCELLED_PENDING];
const LIVE = [SCHEDULED, RESCHEDULED];
const EVENTS = [...LIVE, ...HELD, PENDING];

// Every fixture date has a fresh cached price on every lane: a held date must
// not show one even though the cache has it.
const PRICE_ROWS = EVENTS.flatMap((event) => [
  { event_id: event.id, provider: "vivid-seats", low_price: 182, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "vividseats_impact_marketplace_api" },
  { event_id: event.id, provider: "ticketnetwork", low_price: 190, currency: "USD", verified_at: "2026-08-09T09:00:00Z", expires_at: "2026-08-10T09:00:00Z", source: "ticketnetwork_impact_marketplace_api" }
]);

function fakeDb() {
  return {
    prepare(sql) {
      return {
        bind(...bindings) {
          const wanted = new Set(bindings.map(String));
          return {
            async all() {
              if (/provider_pricing_cache/.test(sql)) return { results: PRICE_ROWS.filter((row) => wanted.has(String(row.event_id))) };
              return { results: [] };
            },
            async first() {
              return null;
            },
            async run() {
              return { success: true };
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

function env(events = EVENTS) {
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
  return { status: response.status, location: response.headers.get("location") || "", html: await response.text() };
}

function card(html, eventId) {
  const marker = `data-event-id="${eventId}"`;
  const at = html.indexOf(marker);
  if (at < 0) return "";
  const start = html.lastIndexOf("<article", at);
  const end = html.indexOf("</article>", at);
  return html.slice(start, end);
}

const text = (html) => String(html).replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const outLinksFor = (html, id) => (html.match(new RegExp(`/api/out\\?showId=${id}&`, "g")) || []).length;
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const parsed = JSON.parse(match[1]);
    return Array.isArray(parsed?.["@graph"]) ? parsed["@graph"] : [parsed];
  });
const musicEventFor = (nodes, id) => nodes.find((node) => node?.["@type"] === "MusicEvent" && String(node.url || "").endsWith(`#show-${id}`));

// ─── the shared rule ────────────────────────────────────────────────────────

{
  assert(eventLifecycle({}) === EVENT_LIFECYCLE.SCHEDULED, "no stored status is scheduled");
  assert(eventLifecycle({ ticketmaster_status_code: "onsale" }) === EVENT_LIFECYCLE.SCHEDULED, "a stored onsale is scheduled");
  assert(eventLifecycle(CANCELLED) === EVENT_LIFECYCLE.CANCELLED && eventLifecycle(CANCELED) === EVENT_LIFECYCLE.CANCELLED, "both cancellation spellings are cancelled");
  assert(eventLifecycle({ ticketmaster_status_code: " Postponed " }) === EVENT_LIFECYCLE.POSTPONED, "case and whitespace are ignored");
  assert(eventLifecycle(UNRECOGNISED) === EVENT_LIFECYCLE.UNRECOGNISED, "an unknown value is reported as unrecognised");
  for (const event of HELD) assert(eventLifecycleHeld(event), `${event.id} is held`);
  for (const event of LIVE) assert(!eventLifecycleHeld(event), `${event.id} is not held`);

  for (const event of HELD) {
    assert(!eventPublishable(event), `${event.id}: no publishable destination, despite verified resale links`);
    assert(!eventStatusPublishable(event), `${event.id}: never schema-eligible`);
    for (const provider of PROVIDERS) {
      assert(!coverage.providerEventPublishable(event, provider), `${event.id}: the offline CTA mirror publishes no ${provider} lane`);
    }
    assert(coverage.publishableCtaCount(event, () => true) === 0, `${event.id}: the link-coverage report counts no button`);
  }
  assert(eventPublishable(SCHEDULED) && eventStatusPublishable(SCHEDULED), "a scheduled show is unchanged");
  assert(eventPublishable(RESCHEDULED) && eventStatusPublishable(RESCHEDULED), "a rescheduled show stays publishable");

  // Scheduled behaviour is exactly as before: every real record has no stored
  // status today, and its gates are unaffected by the field being absent.
  const realEvents = JSON.parse(await read("public/data/events.json"));
  const stored = realEvents.filter((event) => "ticketmaster_status_code" in event);
  for (const event of realEvents.filter((e) => !("ticketmaster_status_code" in e))) {
    const asRescheduled = { ...event, ticketmaster_status_code: "rescheduled" };
    if (eventPublishable(event) !== eventPublishable(asRescheduled) ||
        coverage.publishableCtaCount(event, () => true) !== coverage.publishableCtaCount(asRescheduled, () => true)) {
      assert(false, `${event.id}: a rescheduled status changed publishability`);
    }
  }
  assert(true, `every real record's gates are unaffected by a rescheduled status (${realEvents.length} checked, ${stored.length} carry a stored status)`);

  // The Ed Sheeran Foxborough case from the audit: its verified resale lanes
  // publish today and publish nothing once the cancellation is recorded.
  const foxborough = realEvents.find((event) => event.id === "tm-ed-sheeran-2026-foxborough-01006331f67e74d9");
  if (foxborough && !("ticketmaster_status_code" in foxborough)) {
    assert(coverage.publishableCtaCount(foxborough, () => true) > 0, "Foxborough publishes buttons while no status is stored");
    assert(coverage.publishableCtaCount({ ...foxborough, ticketmaster_status_code: "cancelled" }, () => true) === 0, "Foxborough publishes nothing once cancelled is stored");
  }
}

// ─── identity is untouched ──────────────────────────────────────────────────

{
  const withoutStatus = { ...CANCELLED };
  delete withoutStatus.ticketmaster_status_code;
  assert(eventPages.eventKey(CANCELLED.id) === eventPages.eventKey(withoutStatus.id), "a lifecycle change does not change the stable key");
  assert(eventPages.eventPath(CANCELLED) === eventPages.eventPath(withoutStatus), "a lifecycle change does not change the future path");
  const state = eventPages.eventRouteState(CANCELLED, { artist: { indexing_status: "indexable_with_substantial_content" }, now: NOW_MS });
  assert(!state.renderable && state.reasons.includes(eventPages.EVENT_ROUTE_REASONS.LIFECYCLE_HELD), "a held event is not structurally renderable, for the stated reason");
  assert(!state.reasons.includes(eventPages.EVENT_ROUTE_REASONS.NO_PUBLISHABLE_DESTINATION), "a held event is not mislabelled as having no destination");
  assert(state.lifecycle === EVENT_LIFECYCLE.CANCELLED, "route state carries the lifecycle");
}

// ─── derivations shared by every location page ──────────────────────────────

{
  const city = deriveArtistCities(EVENTS, ARTIST.slug).find((entry) => entry.slug === CITY_SLUG);
  // Scheduled, rescheduled, and the pre-on-sale date through its verified resale links.
  assert(city && city.publishableCount === 3, `the artist-city derivation counts only the live shows as publishable (got ${city?.publishableCount})`);
  assert(city.shows.filter((show) => !show.publishable).length === HELD.length, "held shows stay listed, as not publishable");

  const onsale = deriveOnsaleCalendar(EVENTS, NOW_MS);
  const listed = new Set([...onsale.upcoming, ...onsale.recent].flatMap((day) => day.artists.flatMap((artist) => artist.shows.map((show) => show.id))));
  assert(listed.has(PENDING.id), "a pending on-sale is still listed");
  assert(!listed.has(CANCELLED_PENDING.id), "a cancelled show is not listed as going on sale");

  const specs = () => [{ provider: "vivid-seats", name: "Vivid Seats", href: "/api/out?x", priceAmount: "$182", priceAsOf: "now", lane: { price: 182, currency: "USD", fetchedAt: NOW_ISO } }];
  const priceRows = deriveCityDatePrices(EVENTS.map((event) => ({ ...event, dateTimeISO: event.datetime_iso })), { ctaSpecsFor: specs });
  const rowIds = new Set(priceRows.rows.map((row) => row.showId));
  for (const event of HELD) assert(!rowIds.has(event.id), `${event.id}: no row in the price answer, even when a spec is supplied`);
  assert(rowIds.has(SCHEDULED.id) && rowIds.has(RESCHEDULED.id), "live dates keep their price rows");
}

// ─── held dates never count towards a route's thresholds (Codex, #1193) ─────

{
  const { deriveCities } = await load("functions/_cities.js");
  const { deriveVenues } = await load("functions/_venues.js");
  const { derivePriceGuide } = await load("functions/_price-guides.js");
  const { countUpcomingShows } = await load("functions/_artist-indexability.js");

  const city = deriveCities(EVENTS, { now: NOW_MS }).find((entry) => entry.slug === CITY_SLUG);
  assert(city.showCount === LIVE.length + 1, `a city counts only its non-held dates (got ${city.showCount})`);
  assert(city.shows.length === EVENTS.length, "held dates stay listed on the city page");

  // The case from the review: one live date plus two held dates by a second
  // artist used to clear the venue gate (3 shows, 2 artists, 1 publishable).
  const otherArtist = artistsMeta.find((artist) => artist?.indexing_status === "indexable_with_substantial_content" && artist.slug !== ARTIST.slug);
  const secondArtist = (event, id) => ({ ...event, id, artist_slug: otherArtist.slug, artist_name: otherArtist.name });
  const venueCase = [SCHEDULED, secondArtist(CANCELLED, "other-cancelled"), secondArtist(POSTPONED, "other-postponed")];
  const withoutHolds = venueCase.map(({ ticketmaster_status_code, ...event }) => event);
  const venue = deriveVenues(venueCase, { now: NOW_MS })[0];
  assert(deriveVenues(withoutHolds, { now: NOW_MS })[0].indexable, "the same venue is indexable when nothing is held");
  assert(!venue.indexable && venue.showCount === 1 && venue.artistCount === 1, `held dates cannot keep a venue indexed (got ${venue.showCount} shows, ${venue.artistCount} artists)`);
  assert(!deriveCities(venueCase, { now: NOW_MS })[0].indexable, "nor a city");

  const guide = derivePriceGuide(EVENTS, ARTIST.slug, { now: NOW_MS });
  const guideIds = new Set(guide.shows.map((show) => show.id));
  assert(HELD.every((event) => !guideIds.has(event.id)) && guide.showCount === LIVE.length + 1, "a price guide neither lists nor counts held dates");

  assert(countUpcomingShows(EVENTS, ARTIST.slug, NOW_MS) === LIVE.length + 1, "the auto-promoted artist threshold counts only non-held dates");
}

// ─── live Discovery shows carry the same field (Codex, #1193) ───────────────

{
  const discovery = (code) => showsModule.mapTicketmasterEventToShow({
    id: "Z7r9jZ1AAtest",
    name: ARTIST.name,
    url: "https://www.ticketmaster.com/event/Z7r9jZ1AAtest",
    dates: { status: { code }, start: { dateTime: "2026-09-20T01:00:00Z" }, timezone: "America/Chicago" },
    _embedded: { venues: [{ name: "Fixture Arena", city: { name: "Springfield" }, country: { name: "United States" } }] }
  }, ARTIST.slug, ARTIST.name);
  for (const code of ["cancelled", "canceled", "postponed"]) {
    const show = discovery(code);
    assert(show.ticketmaster_status_code === code && eventLifecycleHeld(show), `a live Discovery '${code}' show is held`);
    assert(!coverage.providerEventPublishable(show, "ticketmaster"), `a live Discovery '${code}' show publishes no Ticketmaster link`);
  }
  assert(discovery("rescheduled").ticketmaster_status_code === "rescheduled" && !eventLifecycleHeld(discovery("rescheduled")), "a live Discovery rescheduled show is labelled, not held");
  for (const code of ["onsale", "offsale", ""]) {
    assert(!("ticketmaster_status_code" in discovery(code)), `a live Discovery '${code || "(none)"}' show carries no lifecycle key, so it never clears a stored hold when merged`);
  }

  // Merging a live show over a persisted row (Codex, #1194): a stored hold is
  // never lifted by live Discovery; a live hold still applies.
  const persisted = (code) => showsModule.mapEventsToShows([{
    ...SCHEDULED,
    id: "fixture-merge",
    ticketmaster_discovery_event_id: "Z7r9jZ1AAtest",
    ...(code ? { ticketmaster_status_code: code } : {})
  }])[0];
  const merged = (storedCode, liveCode) => showsModule.mergeShows([persisted(storedCode)], [discovery(liveCode)]);
  for (const [stored, live] of [["cancelled", "rescheduled"], ["cancelled", "onsale"], ["postponed", "rescheduled"], ["postponed", ""]]) {
    const result = merged(stored, live);
    assert(result.length === 1 && result[0].ticketmaster_status_code === stored && eventLifecycleHeld(result[0]),
      `a stored '${stored}' survives a live '${live || "(none)"}' response (got ${result.map((show) => show.ticketmaster_status_code).join(",")})`);
  }
  assert(eventLifecycleHeld(merged("", "cancelled")[0]), "a live cancellation still holds an unheld persisted row");
  assert(eventLifecycleHeld(merged("rescheduled", "postponed")[0]), "a live postponement holds a row stored as rescheduled");
}

// ─── rendered pages ─────────────────────────────────────────────────────────

const PAGES = [`/artists/${ARTIST.slug}`, `/artists/${ARTIST.slug}/tickets/${CITY_SLUG}`, `/cities/${CITY_SLUG}`, `/venues/${VENUE_SLUG}`];
for (const pathname of PAGES) {
  const { status, html } = await render(pathname);
  assert(status === 200, `${pathname} renders (got ${status})`);
  const nodes = jsonLd(html);

  for (const event of HELD) {
    const held = card(html, event.id);
    assert(held, `${pathname}: ${event.id} is still listed`);
    assert(outLinksFor(html, event.id) === 0, `${pathname}: no /api/out link anywhere for ${event.id}`);
    assert(!/provider-cta|provider-cta-priced|\$182|\$190|price-history/.test(held), `${pathname}: ${event.id} shows no button, price or price history`);
    assert(/data-event-lifecycle=/.test(held), `${pathname}: ${event.id} states its status`);
    assert(!musicEventFor(nodes, event.id), `${pathname}: no MusicEvent for ${event.id}`);
  }
  assert(/Ticketmaster lists this date as cancelled/.test(text(card(html, CANCELLED.id))), `${pathname}: a cancelled date says so`);
  assert(/Ticketmaster lists this date as postponed/.test(text(card(html, POSTPONED.id))), `${pathname}: a postponed date says so`);
  assert(/status is being checked/.test(text(card(html, UNRECOGNISED.id))), `${pathname}: an unrecognised status withholds links neutrally`);

  assert(outLinksFor(html, SCHEDULED.id) > 0, `${pathname}: the scheduled date keeps its buttons`);
  assert(outLinksFor(html, RESCHEDULED.id) > 0, `${pathname}: the rescheduled date keeps its buttons`);
  assert(/Rescheduled: this is the date Ticketmaster now lists/.test(text(card(html, RESCHEDULED.id))), `${pathname}: the rescheduled date says so`);
  assert(!/Rescheduled/.test(card(html, SCHEDULED.id)), `${pathname}: a scheduled date says nothing about rescheduling`);

  const scheduledNode = musicEventFor(nodes, SCHEDULED.id);
  const rescheduledNode = musicEventFor(nodes, RESCHEDULED.id);
  if (scheduledNode) {
    assert(scheduledNode.eventStatus === "https://schema.org/EventScheduled", `${pathname}: a scheduled node stays EventScheduled`);
    assert(rescheduledNode?.eventStatus === "https://schema.org/EventRescheduled", `${pathname}: the rescheduled node says EventRescheduled`);
    assert(!("previousStartDate" in rescheduledNode), `${pathname}: no previousStartDate is invented`);
  }
  assert(!nodes.some((node) => node?.["@type"] === "MusicEvent" && node.eventStatus !== "https://schema.org/EventScheduled" && node.eventStatus !== "https://schema.org/EventRescheduled"),
    `${pathname}: no other eventStatus is emitted`);
}
{
  const { html } = await render(`/artists/${ARTIST.slug}`);
  assert(musicEventFor(jsonLd(html), SCHEDULED.id), "the artist page still emits the scheduled show's MusicEvent");
  const { html: cityHtml } = await render(`/artists/${ARTIST.slug}/tickets/${CITY_SLUG}`);
  const table = cityHtml.slice(cityHtml.indexOf("<table"), cityHtml.indexOf("</table>"));
  assert(table.length > 10, "the artist-city page renders its price answer");
  for (const event of HELD) assert(!table.includes(`#show-${event.id}`), `the price answer has no row for ${event.id}`);

  // An artist-city whose only dates are held has nothing to lead to: it
  // redirects to the artist page, the existing rule for a city with no
  // publishable show.
  const onlyHeld = await render(`/artists/${ARTIST.slug}/tickets/${CITY_SLUG}`, HELD);
  assert(onlyHeld.status === 301 && onlyHeld.location.endsWith(`/artists/${ARTIST.slug}`), `an artist-city with only held dates redirects to the artist page (got ${onlyHeld.status})`);
}

// ─── /api/out cannot be used to bypass the hold ─────────────────────────────

async function out(showId, provider) {
  const response = await outModule.onRequestGet({
    request: new Request(`${ORIGIN}/api/out?showId=${showId}&provider=${provider}&sourcePath=/artists/${ARTIST.slug}`),
    env: env()
  });
  const location = response.headers.get("location") || "";
  let body = null;
  if (!location) body = await response.json().catch(() => null);
  return { status: response.status, location, body };
}
{
  const scheduled = await out(SCHEDULED.id, "ticketmaster");
  assert(scheduled.status === 302 && scheduled.location.startsWith("https://www.ticketmaster.com/event/"), `a scheduled show still redirects (got ${scheduled.status})`);
  const rescheduled = await out(RESCHEDULED.id, "ticketmaster");
  assert(rescheduled.status === 302, "a rescheduled show still redirects");
  for (const event of HELD) {
    for (const provider of ["ticketmaster", "seatgeek", "vivid-seats", "ticketnetwork", "stubhub-international"]) {
      const result = await out(event.id, provider);
      assert(!result.location && result.body?.status === "event_link_not_publishable",
        `/api/out refuses ${provider} for ${event.id} (got ${result.status} ${result.location || JSON.stringify(result.body)})`);
    }
  }
}

// ─── /api/shows exposes no price or redirect for a held show ────────────────

{
  const priced = await showsModule.attachApprovedMarketplacePrices(showsModule.mapEventsToShows(EVENTS), env());
  const byId = new Map(priced.map((show) => [show.id, show]));
  assert(byId.get(SCHEDULED.id).prices.some((lane) => lane.status === "ok"), "a scheduled show still gets its cached price");
  for (const event of HELD) {
    const show = byId.get(event.id);
    assert(show.ticketmaster_status_code === event.ticketmaster_status_code, `${event.id}: /api/shows carries the stored status for the client gate`);
    assert(!show.prices.some((lane) => lane.status === "ok"), `${event.id}: no cached price is served`);
    assert(!show.prices.some((lane) => String(lane.actionUrl || lane.url || "").includes("/api/out")), `${event.id}: no redirect URL is served`);
  }
}

// ─── public/app.js keeps the same rule ──────────────────────────────────────

{
  const appJs = await read("public/app.js");
  const source = appJs.match(/function eventLifecycleHeld\(event\) \{[\s\S]*?\n\}/)?.[0] || "";
  assert(source, "public/app.js defines eventLifecycleHeld");
  const clientHeld = new Function(`${source}; return eventLifecycleHeld;`)();
  for (const code of ["", "onsale", "cancelled", "canceled", "postponed", "rescheduled", "paused", "offsale"]) {
    const event = code ? { ticketmaster_status_code: code } : {};
    assert(clientHeld(event) === eventLifecycleHeld(event), `public/app.js agrees with the server on '${code || "(none)"}'`);
  }
  assert(/function eventLinkPublishable\(event\) \{\n  if \(eventLifecycleHeld\(event\)\) return false;/.test(appJs), "public/app.js checks the hold in eventLinkPublishable");
  // The client card states the same lifecycle line the server card does
  // (Codex, #1193: the fallback renderer used to print the generic
  // "No checked ticket link" line instead).
  const labelSource = appJs.match(/function lifecycleHoldLabel\(event\) \{[\s\S]*?\n\}/)?.[0] || "";
  const clientLabel = new Function(`${labelSource}; return lifecycleHoldLabel;`)();
  const { html: boardHtml } = await render(`/artists/${ARTIST.slug}`);
  for (const event of HELD) {
    assert(text(card(boardHtml, event.id)).includes(clientLabel(event)), `public/app.js states the server's line for ${event.id}`);
  }
  assert(appJs.includes('"Rescheduled: this is the date Ticketmaster now lists."'), "public/app.js labels a rescheduled date like the server");
  assert(/function providerEventPublishable\(event, provider\) \{\n  if \(eventLifecycleHeld\(event\)\) return false;/.test(appJs), "public/app.js checks the hold in providerEventPublishable");
}

// ─── still no event route ───────────────────────────────────────────────────

{
  const path = eventPages.eventPath(SCHEDULED);
  const { status } = await render(path);
  assert(path.startsWith("/events/") && status === 404, "a derived /events/ path is still a 404");
}

console.log(`event-lifecycle: ${passed} checks passed`);
