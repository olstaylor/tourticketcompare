// Tests for /price-movers: real held one-site price falls only, noindex at launch.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DatabaseSync } from "node:sqlite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function assert(condition, message) {
  if (!condition) throw new Error(`price-movers: ${message}`);
}
const load = (p) => import(pathToFileURL(path.join(root, p)));
const { derivePriceMovers, fetchPriceMoverRows, PRICE_MOVERS_INDEXABLE } = await load("functions/_price-movers.js");
const { renderPriceMoversBody } = await load("functions/[[path]].js");

const now = Date.parse("2026-11-24T12:00:00Z");
assert(PRICE_MOVERS_INDEXABLE === false, "launches noindex");

const mk = (id, readings, extra = {}) => readings.map(([d, last]) => ({
  event_id: id, artist_slug: "amy", provider: extra.provider || "vivid-seats", source: "s", currency: extra.currency || "USD",
  observed_date: d, low_price_min: last, low_price_last: last, last_observed_at: `${d}T09:00:00Z`, priority_rank: extra.rank ?? 1
}));
const days = ["2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21", "2026-11-22", "2026-11-23", "2026-11-24"];
const fall = (hi, lo) => days.map((d, i) => [d, i < 5 ? hi : lo]);
const ev = (id, extra = {}) => ({ id, artist_slug: "amy", city: "Austin", venue: "Moody Center", country: "United States", datetime_iso: "2026-12-20T20:00:00Z", timezone: "America/Chicago", ...extra });
const events = [ev("drop"), ev("small"), ev("soon", { datetime_iso: "2026-11-25T20:00:00Z" }), ev("cxl", { ticketmaster_status_code: "cancelled" }), ev("flat"), ev("gbp"), ev("single"), ev("nosite"), ev("other", { artist_slug: "bo" })];
const rows = [
  ...mk("drop", fall(200, 120)),
  ...mk("small", fall(200, 170)),
  ...mk("soon", fall(200, 100)),
  ...mk("cxl", fall(200, 100)),
  ...mk("flat", fall(200, 200)),
  ...mk("gbp", fall(200, 100), { currency: "GBP" }),
  ...mk("single", [["2026-11-17", 200], ["2026-11-24", 100]]),
  ...mk("nosite", fall(200, 100), { provider: "seatgeek" }),
  ...mk("other", fall(200, 100))
];
const catalog = { artists: [{ slug: "amy", name: "Amy" }, { slug: "bo", name: "Bo" }] };
const out = derivePriceMovers(rows, events, catalog, ["amy"], now);
const ids = out.movers.map((m) => m.eventId).sort();
assert(ids.join() === "drop,gbp", `expected only held 20%+ falls on upcoming indexable shows, got ${ids}`);
const drop = out.movers.find((m) => m.eventId === "drop");
assert(drop.from === 200 && drop.to === 120 && drop.site === "Vivid Seats" && drop.fromDate === "2026-11-17" && drop.toDate === "2026-11-24", "both dated prices kept");
assert(drop.path === "/artists/amy#show-drop", "links to the show on its artist page");
// A one-day dip (not held on two readings) and a stale reading are not listed.
const dip = days.map((d, i) => [d, i === 7 ? 100 : 200]);
assert(derivePriceMovers(mk("drop", dip), events, catalog, ["amy"], now).movers.length === 0, "a single-day dip is not a drop");
assert(derivePriceMovers(rows, events, catalog, ["amy"], now + 3 * 86400000).movers.length === 0, "stale readings are not listed");
assert(derivePriceMovers([], events, catalog, ["amy"], now).movers.length === 0, "no rows, no movers");

const html = renderPriceMoversBody({ path: "/price-movers", breadcrumb: [{ name: "Price drops", path: "/price-movers" }], movers: out });
assert(html.includes("Vivid Seats") && html.includes("$200") && html.includes("$120") && html.includes("Fees not confirmed"), "row shows site, both prices, caveat");
assert(!/cheapest|save |guarantee/i.test(html), "no cheapest, savings or guarantee wording");
assert(renderPriceMoversBody({ path: "/price-movers", movers: { movers: [], total: 0 } }).includes("No qualifying drops"), "empty state");

// The production SQL runs against SQLite with bound parameters.
const sqlite = new DatabaseSync(":memory:");
sqlite.exec("CREATE TABLE provider_pricing_daily (event_id, artist_slug, provider, source, currency, observed_date, low_price_min, low_price_last, last_observed_at); CREATE TABLE show_priority (event_id, rank);");
const ins = sqlite.prepare("INSERT INTO provider_pricing_daily VALUES (?,?,?,?,?,?,?,?,?)");
for (const r of rows) ins.run(r.event_id, r.artist_slug, r.provider, r.source, r.currency, r.observed_date, r.low_price_min, r.low_price_last, r.last_observed_at);
sqlite.prepare("INSERT INTO show_priority VALUES ('drop', 1)").run();
const db = { prepare: (sql) => ({ bind: (...v) => ({ all: async () => ({ results: sqlite.prepare(sql).all(Object.fromEntries(v.map((x, i) => [`?${i + 1}`, x]))) }) }) }) };
const fetched = await fetchPriceMoverRows(db, now);
assert(fetched.length === 8 && fetched.every((r) => r.event_id === "drop"), "reader joins the priority list and keeps approved sites");
assert(derivePriceMovers(fetched, events, catalog, ["amy"], now).movers.length === 1, "database rows reach the page");
console.log("price-movers: ok");
