import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sanitizeMetadata } from "../functions/api/analytics.js";

const analytics = await readFile("functions/api/analytics.js", "utf8");
const server = await readFile("functions/[[path]].js", "utf8");
const client = await readFile("public/app.js", "utf8");
const shell = await readFile("public/index.html", "utf8");
const smoke = await readFile("scripts/smoke-prelaunch.mjs", "utf8");
const route = await readFile("functions/[[path]].js", "utf8");

const metadata = sanitizeMetadata({
  priceSnapshot: "present",
  ctaLocation: "event_card",
  rawUrl: "https://provider.example/listing",
  destinationPath: "/api/out?showId=secret",
  oversized: "x".repeat(500)
});
assert.deepEqual(metadata, { priceSnapshot: "present", ctaLocation: "event_card" });
assert.match(analytics, /"priceSnapshot"/);
assert.match(analytics, /"ctaLocation"/);

// A no-JavaScript browser must get a working, safe native form: it POSTs to
// /api/signup (never a GET that would leak the email into the artist-page URL),
// carries hidden artistSlug/sourcePath, and has an enabled submit button. With
// JavaScript, the client intercepts the submit via the data-watchlist-shell
// hook and posts JSON for inline status instead.
assert.match(server, /data-watchlist-shell=/);
assert.match(server, /<form class="watchlist-signup" method="post" action="\/api\/signup"/);
assert.match(server, /<input type="hidden" name="sourcePath"/);
assert.match(server, /type="submit">Notify me<\/button>/);
assert.doesNotMatch(server, /Enable JavaScript to join/);
assert.match(client, /form\.method = "post"/);
assert.match(client, /form\.action = "\/api\/signup"/);
assert.match(client, /dataset\.signupSubmitting === "true"/);
assert.match(client, /submitButton\.disabled = true/);

// Every checked provider stays in the fixed provider order. A fresh numeric
// snapshot changes only the right-hand value; it does not split or reorder rows.
assert.match(server, /const buttonsHtml = ctaSpecs/);
assert.match(client, /for \(const spec of ctaSpecs\)/);
assert.doesNotMatch(server, /More providers — no current price snapshot/);
assert.doesNotMatch(client, /More providers — no current price snapshot/);
// The hub's price section must keep snapshot framing (a captured listed price),
// never a live-comparison claim.
assert.match(server, /<h2>Prices on upcoming shows<\/h2>/);
assert.match(server, /that's a listed price, not your final total/);
assert.doesNotMatch(server, /Current provider price comparisons/);
assert.doesNotMatch(server, /data-watchlist-signup="\$\{escapeAttr\(artistSlug\)\}"/);

const appVersion = shell.match(/\/app\.js\?v=([0-9a-z]+)/)?.[1];
const smokeVersion = smoke.match(/const APP_ASSET_VERSION = "([0-9a-z]+)"/)?.[1];
assert.equal(appVersion, smokeVersion);
assert.equal(shell.match(/\/ttc-home\.css\?v=([0-9a-z]+)/)?.[1], "20260729b");
assert.equal(route.match(/\/ttc-home\.js\?v=([0-9a-z]+)/)?.[1], "20260729b");

console.log("remediation review self-test passed (analytics, privacy, CTA ordering, watchlist, and asset invariants).");
