// Tests for the "Check prices" button on a show card that has no matched
// SeatGeek link: it goes to the artist's verified SeatGeek page through
// /api/out, says so, makes no price claim and never replaces a matched button.
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
assert(/data-artist-check-href="[^"]*artistSlug=/.test(page.board.replace(/&amp;/g, "&")), "the board publishes the verified link for hydration");

// Without SeatGeek configured the button never renders (it would be refused).
const unconfigured = await render(`/artists/${withSg.slug}`, [UNMATCHED], { IMPACT_SEATGEEK_ACCOUNT_SID: "", IMPACT_SEATGEEK_AUTH_TOKEN: "", IMPACT_SEATGEEK_CAMPAIGN_ID: "" });
assert(checkLinks(unconfigured.html).length === 0 && !unconfigured.html.includes("data-artist-check-href"), "no button when SeatGeek is not configured");

// An artist with no verified artist-level SeatGeek link gets none.
if (withoutSg) {
  const none = await render(`/artists/${withoutSg.slug}`, [event(withoutSg, "fixture-none", "2026-09-11T01:00:00Z", { seatgeek: false })]);
  assert(checkLinks(none.html).length === 0 && !none.html.includes("data-artist-check-href"), "no button without a verified artist-level SeatGeek link");
}

// A held (cancelled) date offers nothing.
const held = { ...UNMATCHED, id: "fixture-held", ticketmaster_status_code: "cancelled" };
const heldPage = await render(`/artists/${withSg.slug}`, [held]);
assert(checkLinks(heldPage.board).length === 0, "a cancelled date gets no check button");

console.log(`artist-check-prices: ${passed} checks passed`);
