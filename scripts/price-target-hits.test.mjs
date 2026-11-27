import assert from "node:assert/strict";
import fs from "node:fs";
import { latestReadings, targetHitsFor } from "./lib/price-target-hits.mjs";

const NOW = Date.parse("2026-10-26T09:00:00Z");
const artists = JSON.parse(fs.readFileSync(new URL("../public/data/artists.json", import.meta.url), "utf8"));
const artistList = Array.isArray(artists) ? artists : artists.artists;
const indexable = artistList.find((a) => a.slug === "oasis") || artistList.find((a) => String(a.indexing_status).startsWith("indexable"));
const slug = indexable.slug;
const event = (id, daysOut, extra = {}) => ({
  id, artist_slug: slug, artist_name: indexable.name, city: "London", country: "United Kingdom", venue: "Wembley",
  datetime_iso: new Date(NOW + daysOut * 86400000).toISOString().replace(/:\d\d\.\d+Z$/, ":00Z"), timezone: "Europe/London",
  status: "announced", ticketmaster_event_id: "ABCDEF0123456789", ...extra
});
const series = (eventId, prices, { provider = "vivid-seats", currency = "USD", lastAt = "2026-10-26T07:30:00Z" } = {}) =>
  prices.map((price, i) => {
    const day = new Date(Date.parse("2026-10-26") - (prices.length - 1 - i) * 86400000).toISOString().slice(0, 10);
    return { event_id: eventId, artist_slug: slug, provider, source: "feed", currency, observed_date: day, low_price_min: price, low_price_last: price, observations: 3, last_observed_at: i === prices.length - 1 ? lastAt : `${day}T07:00:00Z` };
  });
const read = (rows, events) => latestReadings(rows, events, artistList, { now: NOW });
const ev = event("e1", 20);

// Latest reading plus the one 6-8 days earlier.
let [r] = read(series("e1", [130, 130, 130, 130, 130, 130, 130, 120, 95]), [ev]);
assert.equal(r.to, 95); assert.equal(r.from, 130); assert.equal(r.fromDate, "2026-10-19"); assert.equal(r.site, "Vivid Seats");
assert.ok(r.eventPath.startsWith("/events/") || r.eventPath === "", "links to the show page");
assert.equal(targetHitsFor([r], "e1", 100, "USD").length, 1, "at or under target");
assert.equal(targetHitsFor([r], "e1", 95, "USD").length, 1, "exactly at target");
assert.equal(targetHitsFor([r], "e1", 90, "USD").length, 0, "above target");
assert.equal(targetHitsFor([r], "e1", 100, "GBP").length, 0, "other currency");
assert.equal(targetHitsFor([r], "e2", 100, "USD").length, 0, "other show");

// No earlier reading: still reported, with no "was" price.
[r] = read(series("e1", [95, 95]), [ev]);
assert.equal(r.from, null);

// Rejected: stale, implausible, other site, past, cancelled, unknown show.
assert.equal(read(series("e1", [95], { lastAt: "2026-10-24T01:00:00Z" }), [ev]).length, 0, "stale");
assert.equal(read(series("e1", [5]), [ev]).length, 0, "implausible");
assert.equal(read(series("e1", [95], { provider: "seatgeek" }), [ev]).length, 0, "no numeric lane");
assert.equal(read(series("e1", [95]), [event("e1", -3)]).length, 0, "past show");
assert.equal(read(series("e1", [95]), [event("e1", 20, { ticketmaster_status_code: "cancelled" })]).length, 0, "cancelled");
assert.equal(read(series("e1", [95]), []).length, 0, "unknown show");
console.log("price-target-hits: all checks passed");
