import assert from "node:assert/strict";
import { faceValueFor, faceValueLineHtml, formatFaceAmount, formatFaceDate, validFaceValue } from "../functions/_face-values.js";

import { FACE_VALUES as data } from "../functions/_face-values.data.js";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const seen = new Set();
for (const e of data.entries) {
  assert.ok(validFaceValue(e), `entry needs https source, date, amount: ${e.artist_slug}/${e.city_slug}`);
  assert.ok(e.source_name, "source_name required");
  const k = `${e.artist_slug}|${e.city_slug}`;
  assert.ok(!seen.has(k), `duplicate ${k}`);
  seen.add(k);
}
assert.equal(formatFaceAmount(79.4, "GBP"), "£79.40");
assert.equal(formatFaceAmount(181.25, "EUR"), "€181.25");
assert.equal(formatFaceAmount(75, "GBP"), "£75");
assert.equal(formatFaceAmount(75, "XXX"), "");
assert.equal(formatFaceDate("2026-09-01"), "1 Sep 2026");
assert.equal(faceValueFor("nobody", "london-united-kingdom"), null);
assert.equal(faceValueLineHtml("nobody", "x", esc), "");
const line = faceValueLineHtml("olivia-rodrigo", "london-united-kingdom", esc);
assert.match(line, /Face value from £79\.40, general sale, lowest \(<a href="https:\/\/www\.timeout\.com/);
assert.match(line, /1 Sep 2026/);
assert.doesNotMatch(line, /sav|cheaper|less than/i);
// unsourced or malformed entries never render
assert.equal(faceValueLineHtml("a", "b", esc, [{ artist_slug: "a", city_slug: "b", amount: 50, currency: "GBP", published_at: "2026-01-01" }]), "");
console.log("face-values tests passed");
