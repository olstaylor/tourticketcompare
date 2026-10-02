// Tests for the shared spike guard (functions/_price-outliers.js) and the two
// claims it protects that live outside the price guide tests: the recorded low
// (its SQL runs here against real SQLite, not a fake) and the 7-day change
// (functions/_event-price-moves.js).
//
// Run standalone (node scripts/price-outliers.test.mjs) and in `npm run test:mvp`.

import assert from "node:assert/strict";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const { isIsolatedSpike, dropIsolatedSpikes, keepNonSpikeSql } = await load("functions/_price-outliers.js");
const { fetchEventPriceLowSeries, deriveEventPriceLow } = await load("functions/_event-price-low.js");
const {
  derivePriceMove,
  deriveWeeklyPriceChange,
  fetchEventWeeklyPriceSeries,
  withinWeeklyChangeWindow
} = await load("functions/_event-price-moves.js");

let passed = 0;
function check(condition, message) {
  assert.ok(condition, `price-outliers: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-10-02T12:00:00Z");
const DAY = 24 * 60 * 60 * 1000;
const at = (daysAgo) => new Date(NOW - daysAgo * DAY).toISOString();
const inDays = (days) => new Date(NOW + days * DAY).toISOString();

// --- The rule -------------------------------------------------------------

// The production case: StubHub International, Olivia Rodrigo, Washington.
check(isIsolatedSpike(428.16, 57.07, 414.72), "an eighth of both neighbours is a spike");
check(isIsolatedSpike(100, 260, 110), "over twice both neighbours is a spike");
check(!isIsolatedSpike(420, 300, 290), "a drop that persists into the next row is a move, not a spike");
check(!isIsolatedSpike(100, 55, 100), "just over half the lower neighbour is kept");
check(!isIsolatedSpike(undefined, 57, 414), "no earlier neighbour: never judged");
check(!isIsolatedSpike(428, 57, undefined), "no later neighbour: never judged");

const series = [400, 428.16, 57.07, 414.72, 392.64].map((price, i) => ({ price, observedAt: at(10 - i) }));
check(dropIsolatedSpikes(series).map((p) => p.price).join() === "400,428.16,414.72,392.64", "the stray point is dropped, the rest kept in order");
check(dropIsolatedSpikes([{ price: 400 }, { price: 50 }]).length === 2, "the newest row with no trailing price is never judged");
check(dropIsolatedSpikes([{ price: 400 }, { price: 50 }], { trailingPrice: 410 }).length === 1, "the live price stands in as the newest row's later neighbour");
check(dropIsolatedSpikes([{ price: 400 }, { price: 50 }], { trailingPrice: 52 }).length === 2, "a low newest row the badge agrees with is real");

// --- The recorded low, through real SQLite --------------------------------

const sqlite = new DatabaseSync(":memory:");
sqlite.exec(`CREATE TABLE provider_pricing_history (
  id TEXT PRIMARY KEY, event_id TEXT, artist_slug TEXT, provider TEXT, low_price REAL,
  currency TEXT, inventory_count INTEGER, source TEXT, observed_at TEXT, created_at TEXT, event_date TEXT)`);
const insert = sqlite.prepare("INSERT INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, source, observed_at) VALUES (?, ?, 'a', ?, ?, 'USD', ?, ?)");
let rowId = 0;
const write = (eventId, price, observedAt, provider = "stubhub-international", source = "src") =>
  insert.run(`r${(rowId += 1)}`, eventId, provider, price, source, observedAt);
// D1's prepare/bind/all over node:sqlite.
const db = { prepare: (sql) => ({ bind: (...values) => ({ all: async () => ({ results: sqlite.prepare(sql).all(...values) }) }) }) };
const lanes = [{ dbKey: "stubhub-international", approvedSource: "src" }];

// e1: the spike sits inside the window.
for (const [price, daysAgo] of [[398.4, 20], [428.16, 17], [57.07, 16.8], [414.72, 16], [392.64, 3]]) write("e1", price, at(daysAgo));
// e2: the spike is the newest row before the window opens, i.e. the carry-in.
for (const [price, daysAgo] of [[400, 45], [40, 40], [410, 20]]) write("e2", price, at(daysAgo));
// e3: a genuine, persisting drop must still be the low.
for (const [price, daysAgo] of [[400, 20], [150, 10], [160, 5]]) write("e3", price, at(daysAgo));
// e4: a row from an unapproved source must not act as anyone's neighbour or low.
write("e4", 300, at(20)); write("e4", 30, at(15), "stubhub-international", "other"); write("e4", 310, at(10));

const lowIndex = await fetchEventPriceLowSeries(db, ["e1", "e2", "e3", "e4"], lanes, { now: NOW });
check(lowIndex.get("e1|stubhub-international").windowMin.price === 392.64, "the in-window spike never becomes the 30-day low");
check(lowIndex.get("e2|stubhub-international").carryIn.price === 400, "a spike is never the carried-in price");
check(lowIndex.get("e3|stubhub-international").windowMin.price === 150, "a real drop is still the low");
check(lowIndex.get("e4|stubhub-international").windowMin.price === 300, "an unapproved source's row is neither a low nor a neighbour");

const laneNow = { provider: "stubhub-international", name: "StubHub International", price: 392.64, currency: "USD", fetchedAt: at(0.1) };
const low = deriveEventPriceLow([laneNow], (lane) => lowIndex.get(`e1|${lane.provider}`));
check(low.price === 392.64 && low.isCurrent, "the Olivia Rodrigo shape now reads 'lowest recorded', not a $57 low");
check(keepNonSpikeSql("p", "a", "b").includes("0.5") && keepNonSpikeSql("p", "a", "b").includes("2 *"), "the SQL predicate carries the same ratios");

// --- The latest recorded change -------------------------------------------

const moveRows = [
  { price: 392.64, currency: "USD", observedAt: at(3) },
  { price: 57.07, currency: "USD", observedAt: at(4) },
  { price: 414.72, currency: "USD", observedAt: at(5) }
];
const move = derivePriceMove(laneNow, moveRows);
check(move && move.from === 414.72, "the latest change skips a spike and reports the real previous price");

// --- The 7-day change -----------------------------------------------------

const lane = { provider: "vivid-seats", name: "Vivid Seats", price: 340, currency: "USD", fetchedAt: at(0.05) };
const weekRows = [
  { price: 420, currency: "USD", observedAt: at(9) },
  { price: 60, currency: "USD", observedAt: at(8) },
  { price: 415, currency: "USD", observedAt: at(7.5) },
  { price: 380, currency: "USD", observedAt: at(3) }
];
const opts = { now: NOW, showStartsAt: inDays(5) };
const change = deriveWeeklyPriceChange(lane, weekRows, opts);
check(change && change.direction === "down" && change.from === 415 && change.percent === 18, "down 18% from the standing price a week ago");
check(deriveWeeklyPriceChange(lane, weekRows.filter((r) => r.price !== 415), opts).from === 420, "a spike is never the reference price");
check(deriveWeeklyPriceChange({ ...lane, price: 470 }, weekRows, opts).direction === "up", "a rise is said the same way as a drop");
check(deriveWeeklyPriceChange({ ...lane, price: 400 }, weekRows, opts) === null, "under 10% is not said");
check(deriveWeeklyPriceChange(lane, weekRows, { now: NOW, showStartsAt: inDays(20) }) === null, "not for a date more than 14 days out");
check(deriveWeeklyPriceChange(lane, weekRows, { now: NOW, showStartsAt: at(1) }) === null, "not for a date already past");
check(deriveWeeklyPriceChange(lane, weekRows.filter((r) => Date.parse(r.observedAt) > NOW - 7 * DAY), opts) === null, "no row a week old: nothing is said");
check(deriveWeeklyPriceChange({ ...lane, currency: "GBP" }, weekRows, opts) === null, "never across currencies");
check(withinWeeklyChangeWindow(inDays(14), NOW) && !withinWeeklyChangeWindow(inDays(14.1), NOW), "the window edge is 14 days");

// The weekly read, through real SQLite: oldest first, approved source only.
write("e5", 420, at(9), "vivid-seats", "vs"); write("e5", 415, at(7.5), "vivid-seats", "vs"); write("e5", 999, at(6), "vivid-seats", "other");
const weekIndex = await fetchEventWeeklyPriceSeries(db, ["e5"], [{ dbKey: "vivid-seats", approvedSource: "vs" }]);
const e5 = weekIndex.get("e5|vivid-seats");
check(e5.length === 2 && e5[0].price === 420 && e5[1].price === 415, "weekly read returns the approved series oldest first");
check((await fetchEventWeeklyPriceSeries(null, ["e5"], lanes)).size === 0, "no database degrades to no change");

console.log(`price-outliers: ${passed} checks passed`);
