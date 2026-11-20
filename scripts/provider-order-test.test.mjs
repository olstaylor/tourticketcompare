// Seller-order test (owner approved 2026-11-20). Half of all dates show the
// marketplaces in reverse alphabetical order, chosen by a hash of the event id.
// Server and browser must pick the same arm and order, the split must be near
// 50/50, and neither arm may depend on commission.
import { readFile } from "node:fs/promises";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`provider-order-test: ${message}`);
  passed += 1;
}

const serverSrc = await readFile(new URL("../functions/[[path]].js", import.meta.url), "utf8");
const appSrc = await readFile(new URL("../public/app.js", import.meta.url), "utf8");

function extract(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start !== -1, `${name} exists`);
  let depth = 0;
  for (let i = source.indexOf("{", start); i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}" && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`provider-order-test: ${name} is not closed`);
}

const norm = (text) => text.replace(/\s+/g, " ").trim();
for (const name of ["providerOrderArm", "providerDisplayRankForArm"]) {
  assert(norm(extract(serverSrc, name)) === norm(extract(appSrc, name)), `${name} is identical on server and in public/app.js`);
}

const order = ["ticketmaster", "seatgeek", "stubhub-international", "ticket-liquidator", "ticketnetwork", "vivid-seats"];
const factory = new Function(
  "PROVIDER_DISPLAY_ORDER",
  `${extract(appSrc, "providerDisplayRank")}\n${extract(appSrc, "providerOrderArm")}\n${extract(appSrc, "providerDisplayRankForArm")}\nreturn { providerOrderArm, providerDisplayRankForArm };`
);
const { providerOrderArm, providerDisplayRankForArm } = factory(order);

const sorted = (arm) => [...order].sort((a, b) => providerDisplayRankForArm(a, arm) - providerDisplayRankForArm(b, arm));
assert(sorted("alphabetical").join() === order.join(), "the control arm keeps the existing order");
assert(sorted("reverse").join() === ["ticketmaster", ...order.slice(1).reverse()].join(), "the reverse arm leads with the primary site, then marketplaces reversed");
assert(providerDisplayRankForArm("unknown-seller", "reverse") === order.length, "an unknown provider stays last in both arms");

const events = JSON.parse(await readFile(new URL("../public/data/events.json", import.meta.url), "utf8"));
const arms = events.map((event) => providerOrderArm(event.id));
const reverse = arms.filter((arm) => arm === "reverse").length;
assert(reverse / arms.length > 0.47 && reverse / arms.length < 0.53, `the split is near 50/50 (${reverse} of ${arms.length} reverse)`);
assert(providerOrderArm("tm-x-1") === providerOrderArm("tm-x-1"), "an event always gets the same arm");
const byArtist = new Map();
for (const event of events) {
  const entry = byArtist.get(event.artist_slug) || { reverse: 0, total: 0 };
  entry.total += 1;
  if (providerOrderArm(event.id) === "reverse") entry.reverse += 1;
  byArtist.set(event.artist_slug, entry);
}
const bigArtists = [...byArtist.values()].filter((entry) => entry.total >= 20);
assert(bigArtists.length > 0 && bigArtists.every((entry) => entry.reverse > 0 && entry.reverse < entry.total), "artists with many dates get both arms");

console.log(`provider-order-test passed (${passed} checks)`);
