import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { sanitizeMetadata } from "../functions/api/analytics.js";

const analytics = await readFile("functions/api/analytics.js", "utf8");
const server = await readFile("functions/[[path]].js", "utf8");
const client = await readFile("public/app.js", "utf8");
const shell = await readFile("public/index.html", "utf8");
const smoke = await readFile("scripts/smoke-prelaunch.mjs", "utf8");
const route = await readFile("functions/[[path]].js", "utf8");
const homeModule = await readFile("public/ttc-home.js", "utf8");
const artistModule = await readFile("public/artist-board.js", "utf8");
const sharedShell = await readFile("public/shell.js", "utf8");
const webVitals = await readFile("public/web-vitals.js", "utf8");
const vitalsReport = await readFile("scripts/report-web-vitals.mjs", "utf8");
const guideBuilder = await readFile("scripts/build-guide-content.mjs", "utf8");
const cmsConfig = await readFile("public/admin/config.yml", "utf8");

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
assert.equal(shell.match(/\/ttc-shell\.css\?v=([0-9a-z]+)/)?.[1], "20260820b");
assert.equal(route.match(/\/ttc-home\.css\?v=([0-9a-z]+)/)?.[1], "20260820b");
assert.equal(route.match(/\/ttc-home\.js\?v=([0-9a-z]+)/)?.[1], "20260820b");
assert.match(route, /\/artist-board\.js\?v=20260820b/);
assert.match(route, /\/currency-converter\.js\?v=20260820b/);

// PR #727 split the universal application bundle into route modules. These
// source-level invariants keep the smaller modules from silently dropping the
// behavior the old bundle owned while preserving the homepage's final SSR DOM.
assert.match(homeModule, /\/data\/events-index\.json/);
assert.doesNotMatch(homeModule, /\/data\/(?:events|catalog)\.json/);
assert.match(homeModule, /record\.city/);
assert.match(homeModule, /record\.venue/);
assert.doesNotMatch(homeModule, /ttc-main[^\n]*replaceChildren/);

assert.match(artistModule, /function refreshCityOptions/);
assert.match(artistModule, /\/api\/price-history\?showId=/);
assert.match(artistModule, /intent: "price_alert"/);
assert.match(route, /data-price-history=/);

for (const field of ["landingPath", "artistSlug"]) assert.match(sharedShell, new RegExp(`${field}:`));
for (const eventName of ["artist_view", "event_view", "provider_cta_view"]) assert.match(sharedShell, new RegExp(`"${eventName}"`));
assert.match(sharedShell, /mirrorToGa4/);
assert.match(sharedShell, /isAffiliate:/);

assert.match(route, /renderComparisonHubEventCards\(\s*events,\s*env\s*\)/);
assert.match(route, /ctaLocation: "comparison_hub"/);
assert.match(route, /attachApprovedMarketplacePrices\(priceCandidates, env\)/);

assert.match(guideBuilder, /SUPPORTED_COMPARISON_PROVIDER_PAIRS/);
assert.match(guideBuilder, /has no runtime renderer/);
assert.doesNotMatch(cmsConfig, /value: seatgeek/);

assert.match(webVitals, /parts\[1\] === "tags"/);
assert.match(webVitals, /return "blog-tag"/);
assert.match(vitalsReport, /group\.values\[metric\]\.length < LOW_SAMPLE/);
assert.match(vitalsReport, /provisional:/);

console.log("remediation review self-test passed (analytics, privacy, route-module parity, CTA ordering, watchlist, and asset invariants).");
