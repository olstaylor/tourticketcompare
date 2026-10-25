// Tests for /tours/2027/rumoured: only sourced "rumoured" watchlist entries,
// never an artist that already has a page, no ticket links, noindex when empty.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`rumoured-tours: ${message}`);
  passed += 1;
}
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
const { deriveRumouredTours, RUMOURED_TOURS_PATH } = await load("functions/_rumoured-tours.js");
const { renderRumouredToursBody } = await load("functions/[[path]].js");

const list = {
  artists: [
    { name: "Zed", reason: "rumoured", source_url: "https://example.com/zed-report", note: "Reported to tour." },
    { name: "Amy", reason: "rumoured", source_url: "https://www.example.org/amy", note: "Teased a tour." },
    { name: "Between", reason: "between-tours", source_url: "https://example.com/b", note: "x" },
    { name: "NoSource", reason: "rumoured", source_url: "", note: "x" },
    { name: "HttpOnly", reason: "rumoured", source_url: "http://example.com/h", note: "x" },
    { name: "Announced", reason: "rumoured", source_url: "https://example.com/a", note: "x" }
  ]
};
const result = deriveRumouredTours({ artists: [{ slug: "announced", name: "Announced" }] }, list);
assert(result.entries.map((e) => e.name).join() === "Amy,Zed", "keeps only sourced rumoured entries without a page, sorted");
assert(result.indexable === true, "indexable with entries");
assert(result.entries[0].sourceName === "example.org", "source host drops www");
assert(deriveRumouredTours({ artists: [] }, { artists: [] }).indexable === false, "noindex when empty");

const html = renderRumouredToursBody({ path: RUMOURED_TOURS_PATH, rumoured: result, breadcrumb: [] });
assert(html.includes("Unconfirmed") && html.includes("https://example.com/zed-report"), "marks unconfirmed and links the source");
assert(!/ticketmaster|seatgeek|\/api\/out/i.test(html), "no ticket or affiliate links");
console.log(`rumoured-tours: ${passed} checks passed`);
