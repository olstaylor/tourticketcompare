// Tests for the /on-sale "Playing in the next 8 weeks" block (functions/_playing-soon.js).
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`playing-soon: ${message}`);
  passed += 1;
}
const NOW = Date.parse("2026-11-22T12:00:00Z");
const DAY = 86400000;
const iso = (d) => new Date(NOW + d * DAY).toISOString();
const { derivePlayingSoon, renderPlayingSoonHtml } = await import(pathToFileURL(path.join(root, "functions/_playing-soon.js")));
const ev = (slug, d, extra = {}) => ({ artist_slug: slug, artist_name: slug.toUpperCase(), city: "Austin", datetime_iso: iso(d), status: "on-sale", verification_status: "machine_high_confidence", ...extra });

const events = [
  ev("a", 10), ev("a", 12, { city: "Dallas" }), ev("b", 5),
  ev("late", 90), ev("past", -2), ev("nolink", 6),
  ev("unver", 7, { verification_status: "needs_recheck" }),
  ev("cx", 8, { status: "cancelled" })
];
const items = derivePlayingSoon(events, new Set(["a", "b", "late", "past", "unver", "cx"]), NOW);
assert(items.map((i) => i.artistSlug).join() === "a,b", "only linkable, trusted, in-window, not cancelled; most dates first");
assert(items[0].dates === 2 && items[0].cities === 2, "counts dates and cities");
assert(renderPlayingSoonHtml([]) === "", "empty renders nothing");
const html = renderPlayingSoonHtml(items);
assert(html.includes('href="/artists/a"') && !/\$|price|ticketmaster\.com/i.test(html), "links only, no price or ticket link");
console.log(`playing-soon tests passed (${passed} assertions)`);
