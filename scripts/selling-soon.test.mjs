import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sellingSoonCandidates, sellingSoonLinks, loadSellingSoon } from "../functions/_selling-soon.js";

// "Selling soon" picks priority-list shows 1 to 14 days out, publishable, on an
// indexable, non-demoted artist page, with a current price; one per artist.
const now = Date.parse("2026-10-16T12:00:00Z");
const link = { "vivid-seats": { verified: true, url: "https://www.vividseats.com/x/production/1" } };
const ev = (id, artist, iso, extra = {}) => ({ id, artist_slug: artist, artist_name: artist.toUpperCase(), datetime_iso: iso, timezone: "America/New_York", venue: "Hall", city: "Boston", provider_links: link, ...extra });
const events = [
  ev("a1", "artist-a", "2026-10-18T19:00:00-04:00"),
  ev("a2", "artist-a", "2026-10-19T19:00:00-04:00"),
  ev("b-tonight", "artist-b", "2026-10-16T19:00:00-04:00"),
  ev("b-far", "artist-b", "2026-11-20T19:00:00-04:00"),
  ev("c1", "artist-c", "2026-10-20T19:00:00-04:00"),
  ev("d1", "artist-d", "2026-10-21T19:00:00-04:00"),
  ev("e1", "artist-e", "2026-10-22T19:00:00-04:00", { ticketmaster_status_code: "cancelled" }),
  ev("f1", "artist-f", "2026-10-23T19:00:00-04:00", { provider_links: {} }),
  ev("g1", "artist-g", "2026-10-24T19:00:00-04:00")
];
const status = "indexable_with_substantial_content";
const artistsBySlug = new Map([
  ["artist-a", { slug: "artist-a", name: "Artist A", indexing_status: status }],
  ["artist-b", { slug: "artist-b", name: "Artist B", indexing_status: status }],
  ["artist-c", { slug: "artist-c", name: "Artist C", indexing_status: status, demoted: true }],
  ["artist-d", { slug: "artist-d", name: "Artist D", indexing_status: "shell" }],
  ["artist-e", { slug: "artist-e", name: "Artist E", indexing_status: status }],
  ["artist-f", { slug: "artist-f", name: "Artist F", indexing_status: status }],
  ["artist-g", { slug: "artist-g", name: "Artist G", indexing_status: status }]
]);
const eventsById = new Map(events.map((event) => [event.id, event]));
const eventsByArtist = new Map([...artistsBySlug.keys()].map((slug) => [slug, events.filter((event) => event.artist_slug === slug)]));
const rows = ["g1", "b-tonight", "b-far", "c1", "d1", "e1", "f1", "a2", "a1", "missing"].map((event_id, index) => ({ event_id, rank: index + 1 }));

const candidates = sellingSoonCandidates({ rows, eventsById, artistsBySlug, eventsByArtist, now });
assert.deepEqual(candidates.map(({ event }) => event.id), ["g1", "a2", "a1"], "window, lifecycle, publishability, demotion and indexability gates");

const links = sellingSoonLinks(candidates, new Set(["a2", "a1"]));
assert.equal(links.length, 1, "unpriced shows are skipped; one link per artist");
assert.deepEqual(links[0], { artist_slug: "artist-a", artist_name: "Artist A", date: "Mon, Oct 19", venue: "Hall", city: "Boston", href: "/artists/artist-a#show-a2" });
assert.deepEqual(sellingSoonLinks(candidates, new Set(["g1", "a1", "a2"]), 1).map((item) => item.artist_slug), ["artist-g"], "limit");

// Fail-open: no database, a failing database or an empty list gives [].
assert.deepEqual(await loadSellingSoon({}, now), []);
assert.deepEqual(await loadSellingSoon({ DEMAND_DB: { prepare() { throw new Error("down"); } } }, now), []);
assert.deepEqual(await loadSellingSoon({ DEMAND_DB: { prepare: () => ({ all: async () => ({ results: [] }) }) } }, now), []);

// The shell only places links on the fixed cohort of high-impression pages.
const shell = await readFile(new URL("../public/shell.js", import.meta.url), "utf8");
for (const path of ["/artists/lizzy-mcalpine", "/guides/seatgeek-vs-ticketmaster", "/compare-concert-ticket-prices", "/"]) {
  assert.ok(shell.includes(`"${path}"`), `shell.js lists ${path}`);
}
assert.ok(!/data-cta-provider|\/api\/out/.test(shell.slice(shell.indexOf("SELLING_SOON_PATHS"))), "selling-soon links are internal, never CTAs");

console.log("selling-soon tests passed");
