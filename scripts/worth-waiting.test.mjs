// Tests for /is-it-worth-waiting: per-artist direction counts from paired daily prices.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DatabaseSync } from "node:sqlite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`worth-waiting: ${message}`);
  passed += 1;
}
const load = (p) => import(pathToFileURL(path.join(root, p)));
const { deriveWorthWaiting, fetchWorthWaitingPairs, worthWaitingDays, WORTH_WAITING_MIN_SHOWS, WORTH_WAITING_PATH, dayOneSummary } = await load("functions/_worth-waiting.js");
const { renderWorthWaitingBody } = await load("functions/[[path]].js");

const now = Date.parse("2026-11-06T12:00:00Z");
const days = worthWaitingDays(now);
assert(days.latest === "2026-11-05" && days.earlier === "2026-10-22", "compares yesterday with 14 days before it");

const events = [];
const pairs = [];
for (let i = 0; i < 6; i++) {
  events.push({ id: `a${i}`, artist_slug: "amy", country: "United States", datetime_iso: "2027-05-01T20:00:00Z", timezone: "UTC" });
  pairs.push({ eventId: `a${i}`, provider: "vivid-seats", now: i < 3 ? 80 : 101, then: 100 });
}
events.push({ id: "uk1", artist_slug: "amy", country: "United Kingdom", datetime_iso: "2027-05-01T20:00:00Z", timezone: "UTC" });
pairs.push({ eventId: "uk1", provider: "vivid-seats", now: 50, then: 100 });
events.push({ id: "few", artist_slug: "bo", country: "United States", datetime_iso: "2027-05-01T20:00:00Z", timezone: "UTC" });
pairs.push({ eventId: "few", provider: "vivid-seats", now: 50, then: 100 });
const catalog = { artists: [{ slug: "amy", name: "Amy" }, { slug: "bo", name: "Bo" }] };
const out = deriveWorthWaiting({ pairs, ...days }, events, catalog, ["amy", "bo"], now);
assert(out.artists.length === 1 && out.artists[0].slug === "amy", "small samples and non-US shows are not listed");
assert(out.artists[0].shows === 6 && out.artists[0].lower === 3 && out.artists[0].same === 3 && out.artists[0].higher === 0, "counts, 2% band");
assert(out.artists[0].shows >= WORTH_WAITING_MIN_SHOWS, "minimum sample");
assert(deriveWorthWaiting({ pairs, ...days }, events, catalog, ["bo"], now).artists.length === 0, "only indexable artists listed");

const edgeEvents = ["cancelled", "postponed", "unknown", "past", "up", "down", "rise", "fall"].map((id) => ({
  ...events[0], id,
  ...(id === "past" ? { datetime_iso: "2026-11-01T20:00:00Z" } : {}),
  ...(["cancelled", "postponed", "unknown"].includes(id) ? { ticketmaster_status_code: id } : {})
}));
const edgePairs = edgeEvents.map((event) => ({ eventId: event.id, provider: "vivid-seats", then: 100,
  now: event.id === "up" ? 102 : event.id === "down" ? 98 : event.id === "rise" ? 103 : 97 }));
const edge = deriveWorthWaiting({ pairs: edgePairs, ...days }, edgeEvents, catalog, null, now);
assert(edge.totals.shows === 4, "past, cancelled, postponed and held shows are excluded");
assert(edge.totals.same === 2 && edge.totals.higher === 1 && edge.totals.lower === 1, "exact +/-2% stays inside the same-price band");
const med = deriveWorthWaiting({ pairs: [
  { eventId: "a0", provider: "vivid-seats", now: 90, then: 100 },
  { eventId: "a0", provider: "ticketnetwork", now: 110, then: 100 }
], ...days }, events, catalog, null, now);
assert(med.totals.shows === 1 && med.totals.same === 1, "multiple sites count once per show using their median change");

// Exercise the production reader's SQL against SQLite, including the repeated
// numbered floor parameter and the exact provider/source/currency join.
const sqlite = new DatabaseSync(":memory:");
sqlite.exec(`CREATE TABLE provider_pricing_daily (
  event_id TEXT, provider TEXT, source TEXT, currency TEXT,
  observed_date TEXT, low_price_last REAL
);`);
const insert = sqlite.prepare("INSERT INTO provider_pricing_daily VALUES (?, ?, ?, ?, ?, ?)");
for (const [id, provider, source, currency, before, after] of [
  ["a0", "vivid-seats", "approved", "USD", 100, 80],
  ["unapproved", "vivid-seats", "other", "USD", 100, 80],
  ["currency", "vivid-seats", "approved", "GBP", 100, 80],
  ["floor", "vivid-seats", "approved", "USD", 9, 80],
  ["seatgeek", "seatgeek", "approved", "USD", 100, 80],
  ["missing", "vivid-seats", "approved", "USD", null, 80]
]) {
  if (before !== null) insert.run(id, provider, source, currency, days.earlier, before);
  insert.run(id, provider, source, currency, days.latest, after);
}
const db = { prepare: (sql) => ({ bind: (...values) => ({ all: async () => ({
  results: sqlite.prepare(sql).all(Object.fromEntries(values.map((value, i) => [`?${i + 1}`, value])))
}) }) }) };
const fetched = await fetchWorthWaitingPairs(db, [
  { dbKey: "vivid-seats", approvedSource: "approved" },
  { dbKey: "seatgeek", approvedSource: "approved" }
], now);
assert(fetched.pairs.length === 1 && fetched.pairs[0].eventId === "a0", "the database reader admits only complete, approved USD pairs above the floor and excludes SeatGeek");
assert(deriveWorthWaiting(fetched, events, catalog, null, now).totals.lower === 1, "database pairs reach the direction counts");
for (const [id, readings] of [
  ["earlier-spike", [["2026-10-21", 100], [days.earlier, 1000], ["2026-10-23", 100], [days.latest, 100]]],
  ["latest-spike", [[days.earlier, 100], ["2026-11-04", 100], [days.latest, 1000], ["2026-11-06", 100]]],
  ["low-spike", [[days.earlier, 100], ["2026-11-04", 100], [days.latest, 10], ["2026-11-06", 100]]],
  ["real-move", [["2026-10-21", 1000], [days.earlier, 1000], ["2026-10-23", 1000], [days.latest, 100], ["2026-11-06", 100]]]
]) {
  for (const [day, price] of readings) insert.run(id, "vivid-seats", "approved", "USD", day, price);
}
const cleaned = await fetchWorthWaitingPairs(db, [{ dbKey: "vivid-seats", approvedSource: "approved" }], now);
assert(cleaned.pairs.length === 2 && !cleaned.pairs.some((pair) => pair.eventId.endsWith("spike")), "a reverted spike on either comparison day is excluded using neighbours outside those two days");
assert(cleaned.pairs.some((pair) => pair.eventId === "real-move" && pair.now === 100 && pair.then === 1000), "a large price move that persists remains eligible");
sqlite.close();

const html = renderWorthWaitingBody({ path: WORTH_WAITING_PATH, worth: out, breadcrumb: [{ name: "Is it worth waiting?", path: WORTH_WAITING_PATH }] });
assert(html.includes("/artists/amy") && html.includes("Not a forecast") === false && html.includes("not a forecast"), "renders row and disclaimer");
assert(!/guarantee|you will save|save \$/i.test(html), "no guarantee or savings wording");
assert(dayOneSummary().includes("49%"), "day-one summary uses the published count");
console.log(`worth-waiting: ${passed} checks passed`);
