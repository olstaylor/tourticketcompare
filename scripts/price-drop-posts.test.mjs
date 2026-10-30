import assert from "node:assert/strict";
import fs from "node:fs";
import { FOCUS_ARTISTS, detectPriceDrops, renderDraftText, renderDraftFile, priceDropSql } from "./lib/price-drop-posts.mjs";

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
const series = (eventId, prices, { provider = "vivid-seats", lastAt = "2026-10-26T07:30:00Z", rank = 3 } = {}) =>
  prices.map((price, i) => {
    const day = new Date(Date.parse("2026-10-26") - (prices.length - 1 - i) * 86400000).toISOString().slice(0, 10);
    return { event_id: eventId, artist_slug: slug, provider, source: "feed", currency: "USD", observed_date: day,
      low_price_min: price, low_price_last: price, observations: 3,
      last_observed_at: i === prices.length - 1 ? lastAt : `${day}T07:00:00Z`, priority_rank: rank };
  });
const run = (rows, events) => detectPriceDrops(rows, events, artistList, { now: NOW });

const ev = event("e1", 20);
// 100 -> 70 over 8 daily readings, held on the last two.
const drop = series("e1", [100, 100, 100, 100, 100, 100, 100, 72, 70].slice(1));
let out = run(drop, [ev]);
assert.equal(out.length, 1);
assert.equal(out[0].kind, "drop");
assert.equal(Math.floor(out[0].dropShare * 100), 30);
const text = renderDraftText(out[0]);
assert.match(text, /dropped 30% in a week/);
assert.match(text, /Vivid Seats/);
assert.match(text, /captured 26 Oct, 07:30 UTC/);
assert.match(text, /not the final total/);
assert.doesNotMatch(text, /\b(ever|cheapest|best|last chance|selling out|will (fall|drop)|hurry)\b/i);
assert.ok(text.includes("https://tourticketcompare.com/"));

// Too small a fall, a single-reading spike, stale data, close show, other price: all rejected.
assert.equal(run(series("e1", [100, 100, 100, 100, 100, 100, 100, 90]), [ev]).length, 0);
assert.equal(run(series("e1", [100, 100, 100, 100, 100, 100, 100, 100, 60]), [ev]).length, 0, "one reading is a spike");
assert.equal(run(drop.map((r) => ({ ...r, last_observed_at: "2026-10-24T01:00:00Z" })), [ev]).length, 0, "stale");
assert.equal(run(drop, [event("e1", 5)]).length, 0, "show under 7 days out");
assert.equal(run(drop, [event("e1", 20, { ticketmaster_status_code: "cancelled" })]).length, 0, "cancelled");
assert.equal(run(drop, []).length, 0, "unknown event");
assert.equal(run(series("e1", [100, 100, 100, 100, 100, 100, 100, 5, 5]), [ev]).length, 0, "implausible price");
assert.equal(run(drop.map((r) => ({ ...r, provider: "seatgeek" })), [ev]).length, 0, "no numeric lane");

// Week-out wording when the show is close.
out = run(drop, [event("e1", 9)]);
assert.equal(out[0].kind, "week-out");
assert.match(renderDraftText(out[0]), /about a week away/);

// Record low: 20 days of history, new low 10% under every earlier reading, no 20% weekly fall.
const rl = series("e1", [100, 98, 99, 100, 97, 99, 100, 98, 99, 100, 97, 99, 98, 100, 99, 98, 97, 96, 88, 87]);
out = run(rl, [ev]);
assert.equal(out[0].kind, "record-low");
assert.match(renderDraftText(out[0]), /lowest listed price we've recorded on Vivid Seats since [A-Z][a-z]+ is \$87/);
assert.doesNotMatch(renderDraftText(out[0]), /\bever\b/);

// One draft per artist, ranked by show priority.
const two = run([...drop, ...series("e2", [200, 200, 200, 200, 200, 200, 200, 150, 140], { rank: 1 })], [ev, event("e2", 30)]);
assert.equal(two.length, 1);
assert.equal(two[0].eventId, "e2");

// Focus artists must be real artist slugs, or the priority silently does nothing.
for (const f of FOCUS_ARTISTS) assert.ok(artistList.some((a) => a.slug === f), `focus artist ${f} exists`);

// File output.
assert.match(renderDraftFile(out, { now: NOW }), /Nothing is posted/);
assert.match(renderDraftFile([], { now: NOW }), /No drops met the rules/);
assert.throws(() => priceDropSql("x"));
assert.match(priceDropSql("2026-10-26"), /JOIN show_priority/);
console.log("price-drop-posts: ok");
