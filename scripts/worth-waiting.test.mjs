// Tests for /is-it-worth-waiting: per-artist direction counts from paired daily prices.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`worth-waiting: ${message}`);
  passed += 1;
}
const load = (p) => import(pathToFileURL(path.join(root, p)));
const { deriveWorthWaiting, worthWaitingDays, WORTH_WAITING_MIN_SHOWS, WORTH_WAITING_PATH, dayOneSummary } = await load("functions/_worth-waiting.js");
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

const html = renderWorthWaitingBody({ path: WORTH_WAITING_PATH, worth: out, breadcrumb: [{ name: "Is it worth waiting?", path: WORTH_WAITING_PATH }] });
assert(html.includes("/artists/amy") && html.includes("Not a forecast") === false && html.includes("not a forecast"), "renders row and disclaimer");
assert(!/guarantee|you will save|save \$/i.test(html), "no guarantee or savings wording");
assert(dayOneSummary().includes("49%"), "day-one summary uses the published count");
console.log(`worth-waiting: ${passed} checks passed`);
