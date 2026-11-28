import assert from "node:assert/strict";
import fs from "node:fs";
import { renderGuide } from "./build-cheapest-guide.mjs";
import { UNSUPPORTED_CHEAPEST_CLAIM } from "../functions/_price-wording.js";

const base = new URL("../reports/cheapest-guides/", import.meta.url);
const slugs = fs.readdirSync(base).filter((name) => fs.existsSync(new URL(`${name}/figures.json`, base)));
assert.ok(slugs.length >= 1, "at least one figures file");

for (const slug of slugs) {
  const figures = JSON.parse(fs.readFileSync(new URL(`${slug}/figures.json`, base), "utf8"));
  // Counts add up: every comparison is lower, higher or about the same.
  for (const row of figures.runUp.bySeller) {
    assert.equal(row.lower + row.higher + row.same, row.comparisons, `${slug} ${row.site}: counts add up`);
  }
  // The committed post is exactly what the figures render, so no number is hand-edited.
  const text = renderGuide(figures);
  const onDisk = fs.readFileSync(new URL(`../content/blog/how-to-get-the-cheapest-${slug}-tickets.md`, import.meta.url), "utf8");
  assert.equal(onDisk, text, `${slug}: post matches its figures`);
  // Only the approved wording: no blanket promise, no savings claim, no forecast.
  assert.ok(!UNSUPPORTED_CHEAPEST_CLAIM.test(text), `${slug}: no unsupported cheapest claim`);
  assert.ok(!/\b(save|saving|guarantee|price match|will (drop|fall|rise))\b/i.test(text), `${slug}: no savings, guarantee or forecast wording`);
}
console.log(`cheapest-guide: ${slugs.length} post(s) match their figures`);
