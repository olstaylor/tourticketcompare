// The price vocabulary lives in functions/_price-wording.js. public/app.js is a
// classic script and mirrors it; this fails when the two drift, and when a
// rendered page's visible copy slips back to the retired price words.
import { readFile } from "node:fs/promises";
import * as wording from "../functions/_price-wording.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`price-wording: ${message}`);
  passed += 1;
}

const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
for (const name of ["PRICE_DISCLOSURE", "NO_PRICE_NOTE", "PRICE_HISTORY_LABEL", "CARD_PRICE_TAIL", "MONEY_DISCLOSURE"]) {
  assert(appJs.includes(JSON.stringify(wording[name])), `public/app.js mirrors ${name} (${JSON.stringify(wording[name])})`);
}
assert(appJs.includes('"Lowest listed price"') && appJs.includes('"Lowest listed prices"'), "public/app.js mirrors lowestPriceLabel");
assert(wording.lowestPriceLabel(0) === "" && wording.lowestPriceLabel(1) === "Lowest listed price" && wording.lowestPriceLabel(3) === "Lowest listed prices", "lowestPriceLabel");
const now = Date.parse("2026-10-06T12:00:00Z");
assert(wording.relativeCheckAge("2026-10-06T11:30:00Z", now) === "under an hour ago", "age under an hour");
assert(wording.relativeCheckAge("2026-10-06T07:00:00Z", now) === "5 hours ago", "age in hours");
assert(wording.relativeCheckAge("2026-10-03T12:00:00Z", now) === "3 days ago", "age in days");
assert(wording.relativeCheckAge("", now) === "recently", "unparseable age");

// Retired wording in the page templates' visible strings: "current"/"recent"
// prices (a ticket site can move a price seconds after the check) and the
// old per-card caveat.
const pathSource = await readFile(new URL("../functions/[[path]].js", import.meta.url), "utf8");
const visible = pathSource
  .split("\n")
  .filter((line) => !/^\s*(\/\/|\*)/.test(line))
  .join("\n");
for (const phrase of ["Listed prices, not final totals", "Listed prices, not your final total", "Show price snapshot history", "isn't matched yet", "Lowest current listed price", "currently on record", "recent listed prices", "current listed prices", "current listed-price", "eligible provider listed-price"]) {
  assert(!visible.includes(phrase), `functions/[[path]].js no longer prints "${phrase}"`);
}
assert(!appJs.includes("Show price snapshot history") && !appJs.includes("Listed prices, not final totals"), "public/app.js no longer prints retired price wording");

console.log(`price-wording: ${passed} assertions passed`);
