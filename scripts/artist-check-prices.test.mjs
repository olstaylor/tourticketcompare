// Tests for the "Check prices" buttons on a show card that has no matched
// resale link: SeatGeek goes to the artist's verified page and TicketNetwork /
// Ticket Liquidator to a search for the artist, all through /api/out. Each says
// it is not this date, makes no price claim and never replaces a matched button.
//
// Renders a real /artists/<slug> route through the actual middleware, because
// the offline crawl audits attach no DEMAND_DB and miss this surface.
//
// Run standalone (node scripts/artist-check-prices.test.mjs) and as part of
// `npm run test:quick`.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-check-prices: ${message}`);
  passed += 1;
}

const NOW_MS = Date.parse("2026-08-09T12:00:00Z");
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
const middlewareModule = await load("functions/_middleware.js");
const { onRequestGet: outGet } = await load("functions/api/out.js");
const { CTA_LOCATIONS } = await load("functions/_funnel.js");

const catalog = JSON.parse(await read("public/data/catalog.json"));
const artists = JSON.parse(await read("public/data/artists.json"));
const artistList = Array.isArray(artists) ? artists : artists.artists;
const sgSlugs = new Set(
  catalog.ticket_links
    .filter((link) => link.provider === "seatgeek" && link.verified && link.public_enabled && link.affiliate_enabled && link.destination_type === "artist_page")
    .map((link) => link.artist_slug)
);
const withSg = artistList.find((artist) => artist.indexing_status === "indexable_with_substantial_content" && sgSlugs.has(artist.slug));
const withoutSg = artistList.find((artist) => artist.indexing_status === "indexable_with_substantial_content" && !sgSlugs.has(artist.slug));
assert(withSg, "fixture: an indexable artist with a verified artist-level SeatGeek link exists");

assert([...CTA_LOCATIONS].includes("event_card_check"), "event_card_check is an allowed cta_location");

function event(artist, id, iso, { seatgeek }) {
  const tm = `https://www.ticketmaster.com/${artist.slug}-tickets/event/${id.toUpperCase()}`;
  const sgUrl = `https://seatgeek.com/${artist.slug}-tickets/fixture/concert/6100${id.length}`;
  return {
    id, artist_slug: artist.slug, artist_name: artist.name, event_name: `${artist.name} Fixture`,
    city: "Austin", country: "United States", venue: "Fixture Arena", datetime_iso: iso, timezone: "America/Chicago",
    tour_name: "Fixture Tour", status: "on-sale", ticketmaster_event_id: id.toUpperCase(), ticketmaster_url: tm,
    seatgeek_url: seatgeek ? sgUrl : "", source_type: "ticketmaster", source_url: tm, last_verified_at: "2026-08-01",
    provider_links: {
      ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01", availability_status: "on_sale" },
      seatgeek: seatgeek
        ? { event_id: 61000 + id.length, url: sgUrl, verified: true, last_verified_at: "2026-08-01", availability_status: "listed" }
        : { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: "not_checked" }
    },
    verification_status: "human_verified"
  };
}

const ASSET_FILES = ["index.html", "data/catalog.json", "data/artists.json", "data/guides-content.json", "data/blog-content.json", "data/provider-configs.json"];
const baseAssets = new Map();
for (const file of ASSET_FILES) baseAssets.set(`/${file}`, await read(`public/${file}`));
baseAssets.set("/", baseAssets.get("/index.html"));

async function render(pathname, events, runtime = {}) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(events));
  const env = {
    MOCK_MODE: "false", ALLOW_MOCK_PRICES: "false", TICKETMASTER_DISCOVERY_ENABLED: "false",
    IMPACT_SEATGEEK_ACCOUNT_SID: "fixture-sid", IMPACT_SEATGEEK_AUTH_TOKEN: "fixture-token", IMPACT_SEATGEEK_CAMPAIGN_ID: "1234",
    IMPACT_ACCOUNT_SID: "fixture-sid", IMPACT_AUTH_TOKEN: "fixture-token",
    // The marketplace lanes default to enabled once credentials exist; switch
    // them off here so the SeatGeek-only cases stay isolated.
    TICKETNETWORK_PUBLIC_ENABLED: "false", TICKETLIQUIDATOR_PUBLIC_ENABLED: "false", STUBHUB_INTERNATIONAL_PUBLIC_ENABLED: "false",
    ...runtime,
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env,
    next: () => new Response("static-asset", { status: 200 })
  });
  const html = await response.text();
  return { status: response.status, html, board: (html.match(/<section class="section-grid show-board"[\s\S]*?<\/section>/) || [""])[0] };
}

const cards = (board) => board.split('<article class="info-card show-card').slice(1).map((part) => part.split("</article>")[0]);
const checkLinks = (html) => [...html.matchAll(/<a class="provider-cta[^"]*"[^>]*href="([^"]*)"[^>]*data-cta-location="event_card_check"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

// One date with no matched SeatGeek link, one with a matched link.
const UNMATCHED = event(withSg, "fixture-unmatched", "2026-09-11T01:00:00Z", { seatgeek: false });
const MATCHED = event(withSg, "fixture-matched-event", "2026-09-13T01:00:00Z", { seatgeek: true });
const page = await render(`/artists/${withSg.slug}`, [UNMATCHED, MATCHED]);
assert(page.status === 200, "the artist page renders");
const [unmatchedCard, matchedCard] = cards(page.board).sort((a, b) => (a.includes("fixture-unmatched") ? -1 : 1) - (b.includes("fixture-unmatched") ? -1 : 1));
assert(unmatchedCard && unmatchedCard.includes('data-event-id="fixture-unmatched"'), "the unmatched date has a card");

// The unmatched date gets one SeatGeek "Check prices" button to the artist page.
const unmatchedLinks = checkLinks(unmatchedCard);
assert(unmatchedLinks.length === 1, "the unmatched date offers exactly one check button");
const url = new URL(unmatchedLinks[0], ORIGIN);
assert(url.pathname === "/api/out", "the button goes through /api/out");
assert(url.searchParams.get("artistSlug") === withSg.slug && url.searchParams.get("provider") === "seatgeek", "it names the artist and SeatGeek, not a show");
assert(!url.searchParams.has("showId"), "it carries no showId, so it can never pose as a date match");
assert(url.searchParams.get("ctaLocation") === "event_card_check", "it reports its own cta_location");
assert(/Check prices/.test(unmatchedCard) && /SeatGeek/.test(unmatchedCard), "it reads Check prices on SeatGeek");
assert(/not this date/.test(unmatchedCard), "it says it is not this date");
assert(!/\$\s?\d|From \d|lowest|cheapest/i.test(unmatchedCard.replace(/data-[a-z-]+="[^"]*"/g, "")), "it makes no price claim");
assert(unmatchedCard.includes("data-cta-provider=\"seatgeek\"") && unmatchedCard.includes(`data-cta-artist="${withSg.slug}"`), "analytics attributes name the provider and artist");

// The matched date keeps its own button and gets no check button.
assert(checkLinks(matchedCard).length === 0, "a date with a matched SeatGeek link gets no check button");
assert(/showId=fixture-matched-event/.test(matchedCard.replace(/&amp;/g, "&")), "the matched date keeps its own event-level link");
assert(!/not this date/.test(matchedCard), "the matched date shows no artist-page note");

// The board carries the link for the client re-render.
assert(/data-artist-checks="[^"]*artistSlug=/.test(page.board.replace(/&amp;/g, "&")), "the board publishes the verified link for hydration");

// Without SeatGeek configured the button never renders (it would be refused).
const unconfigured = await render(`/artists/${withSg.slug}`, [UNMATCHED], { IMPACT_SEATGEEK_ACCOUNT_SID: "", IMPACT_SEATGEEK_AUTH_TOKEN: "", IMPACT_SEATGEEK_CAMPAIGN_ID: "" });
assert(checkLinks(unconfigured.html).length === 0 && !unconfigured.html.includes("data-artist-checks"), "no button when SeatGeek is not configured");

// An artist with no verified artist-level SeatGeek link gets none.
if (withoutSg) {
  const none = await render(`/artists/${withoutSg.slug}`, [event(withoutSg, "fixture-none", "2026-09-11T01:00:00Z", { seatgeek: false })]);
  assert(checkLinks(none.html).length === 0 && !none.html.includes("data-artist-checks"), "no button without a verified artist-level SeatGeek link");
}

// A held (cancelled) date offers nothing.
const held = { ...UNMATCHED, id: "fixture-held", ticketmaster_status_code: "cancelled" };
const heldPage = await render(`/artists/${withSg.slug}`, [held]);
assert(checkLinks(heldPage.board).length === 0, "a cancelled date gets no check button");

// TicketNetwork and Ticket Liquidator add a search button each when enabled.
const MARKETPLACE_ENV = {
  TICKETNETWORK_PUBLIC_ENABLED: "true", IMPACT_TICKETNETWORK_BASE_TRACKING_URL: "https://goto.ticketnetwork.com/c/1/2/3",
  TICKETLIQUIDATOR_PUBLIC_ENABLED: "true", IMPACT_TICKETLIQUIDATOR_BASE_TRACKING_URL: "https://auhm.net/c/1/2/3"
};
const multi = await render(`/artists/${withSg.slug}`, [UNMATCHED, MATCHED], MARKETPLACE_ENV);
const [multiUnmatched, multiMatched] = cards(multi.board).sort((a, b) => (a.includes("fixture-unmatched") ? -1 : 1) - (b.includes("fixture-unmatched") ? -1 : 1));
const multiLinks = checkLinks(multiUnmatched).map((href) => new URL(href, ORIGIN));
assert(multiLinks.length === 3, "SeatGeek, TicketNetwork and Ticket Liquidator each get one button");
assert(multiLinks.map((u) => u.searchParams.get("provider")).join() === "seatgeek,ticketnetwork,ticket-liquidator", "buttons are in a fixed order");
for (const link of multiLinks.slice(1)) {
  assert(link.searchParams.get("linkType") === "search" && !link.searchParams.has("showId") && !link.searchParams.has("destinationUrl"), "a search button names no show and carries no destination");
}
assert(new RegExp(`a search for ${withSg.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} on TicketNetwork and Ticket Liquidator, not this date`).test(multiUnmatched), "the note says it opens a search, not this date");
assert(checkLinks(multiMatched).length === 2 && !/SeatGeek, /.test(multiMatched), "a matched SeatGeek date still gets the two search buttons but not SeatGeek's");
const published = JSON.parse((multi.board.match(/data-artist-checks="([^"]*)"/)[1]).replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
assert(published.length === 3 && published.every((check) => check.href.startsWith("/api/out?")), "the board publishes all three links for hydration");

// /api/out builds the search destination itself and wraps it with Impact.
const outEnv = { ...MARKETPLACE_ENV, ASSETS: { fetch: async (req) => new URL(req.url).pathname === "/data/artists.json" ? Response.json(artistList) : new Response("nf", { status: 404 }) } };
const search = (provider, extra = "") => outGet({ request: new Request(`${ORIGIN}/api/out?artistSlug=${withSg.slug}&provider=${provider}&linkType=search&ctaLocation=event_card_check${extra}`), env: outEnv });
const tn = await search("ticketnetwork");
assert(tn.status === 302, "a TicketNetwork search link redirects");
const tnTarget = new URL(tn.headers.get("Location"));
assert(tnTarget.hostname === "goto.ticketnetwork.com", "it goes through the Impact tracking host");
assert(tnTarget.searchParams.get("u") === `https://www.ticketnetwork.com/results-general?kwds=${encodeURIComponent(withSg.name)}`, "the destination is the artist-name search on ticketnetwork.com");
const tl = await search("ticket-liquidator");
assert(tl.status === 302 && new URL(tl.headers.get("Location")).searchParams.get("u") === `https://www.ticketliquidator.com/search?q=${encodeURIComponent(withSg.name)}`, "Ticket Liquidator redirects to its artist-name search");
// A caller cannot steer it: a supplied destination is ignored, other providers have no search link.
const steered = await search("ticketnetwork", "&destinationUrl=https%3A%2F%2Fwww.ticketnetwork.com%2Fother");
assert(new URL(steered.headers.get("Location")).searchParams.get("u") === tnTarget.searchParams.get("u"), "a supplied destination does not change the search link");
for (const provider of ["vivid-seats", "stubhub-international", "seatgeek"]) {
  assert((await search(provider)).status === 400, `no search link exists for ${provider}`);
}
assert((await outGet({ request: new Request(`${ORIGIN}/api/out?artistSlug=not-an-artist&provider=ticketnetwork&linkType=search`), env: outEnv })).status === 400, "an unknown artist gets no search link");

console.log(`artist-check-prices: ${passed} checks passed`);
