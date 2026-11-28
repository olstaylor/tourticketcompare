// Cheapest-first pilot (owner approved 2026-11-27). Server and browser must
// agree, the split must be near the set percent, only cards that already name a
// lowest listed price may change, and no outcome may depend on commission.
import { readFile } from "node:fs/promises";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`cheapest-first-pilot: ${message}`);
  passed += 1;
}
const serverSrc = await readFile(new URL("../functions/[[path]].js", import.meta.url), "utf8");
const appSrc = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
const norm = (text) => text.replace(/\s+/g, " ").trim();

function extract(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start !== -1, `${name} exists`);
  let depth = 0;
  for (let i = source.indexOf("{", start); i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}" && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`cheapest-first-pilot: ${name} is not closed`);
}
const constant = (source) => (source.match(/const CHEAPEST_FIRST_PILOT_PERCENT = (\d+);/) || [])[1];

for (const name of ["cheapestFirstBucket", "applyCheapestFirst", "lowestListedSpec"]) {
  assert(norm(extract(serverSrc, name)) === norm(extract(appSrc, name)), `${name} is identical on server and in public/app.js`);
}
assert(constant(serverSrc) === constant(appSrc), "pilot percent matches on server and in the browser");
assert(!/commission|affiliate/i.test(extract(serverSrc, "applyCheapestFirst")), "the pilot ordering never reads commission");

const load = (percent) =>
  new Function(
    `const CHEAPEST_FIRST_PILOT_PERCENT = ${percent};\n${extract(serverSrc, "lowestListedSpec")}\n${extract(serverSrc, "cheapestFirstBucket")}\n${extract(serverSrc, "applyCheapestFirst")}\nreturn { applyCheapestFirst, cheapestFirstBucket };`
  )();

const spec = (provider, price, currency = "USD") => ({
  provider,
  name: provider,
  priceAmount: price == null ? "" : `${currency} ${price}`,
  priceAsOf: price == null ? "" : "now",
  lane: price == null ? null : { price, currency }
});
const providers = (result) => result.specs.map((s) => s.provider);
const all = load(100);
const none = load(0);

// Treatment: lowest first, the rest keep their relative order.
let r = all.applyCheapestFirst([spec("ticketmaster", null), spec("seatgeek", 90), spec("vivid-seats", 70), spec("stubhub", 80)], "e1");
assert(providers(r).join() === "vivid-seats,ticketmaster,seatgeek,stubhub" && r.variant === "cheapest_first", "lowest moves to slot 1, others keep order, Ticketmaster stays");
assert(r.specs.length === 4, "no button removed");
// Tie: the lane already earlier wins; never commission.
r = all.applyCheapestFirst([spec("ticketmaster", null), spec("seatgeek", 70), spec("vivid-seats", 70)], "e1");
assert(providers(r)[0] === "seatgeek", "tie keeps the existing order");
// Fallbacks: card unchanged, no variant.
const base = [spec("ticketmaster", null), spec("seatgeek", 70), spec("vivid-seats", 60, "EUR")];
r = all.applyCheapestFirst(base, "e1");
assert(r.variant === "" && r.specs === base, "mixed currencies: unchanged");
const one = [spec("ticketmaster", null), spec("seatgeek", 70), spec("vivid-seats", null)];
r = all.applyCheapestFirst(one, "e1");
assert(r.variant === "" && r.specs === one, "one priced lane (missing, stale or errored others): unchanged");
const zero = [spec("ticketmaster", null), spec("seatgeek", 0), spec("vivid-seats", 50)];
assert(all.applyCheapestFirst(zero, "e1").variant === "", "a zero price is not eligible");
assert(all.applyCheapestFirst([], "e1").variant === "", "no specs: unchanged");
// StubHub International's understated cached price is never promoted.
const sh = [spec("ticketmaster", null), spec("seatgeek", 90), spec("stubhub-international", 70)];
r = all.applyCheapestFirst(sh, "e1");
assert(r.variant === "" && r.specs === sh, "StubHub International as the lowest lane: card unchanged");
r = all.applyCheapestFirst([spec("ticketmaster", null), spec("seatgeek", 60), spec("stubhub-international", 70)], "e1");
assert(r.variant === "cheapest_first" && r.specs[0].provider === "seatgeek", "another seller lowest: promoted as normal");
// Off switch.
const two = [spec("ticketmaster", null), spec("seatgeek", 90), spec("vivid-seats", 70)];
r = none.applyCheapestFirst(two, "e1");
assert(r.variant === "" && r.specs === two, "percent 0 changes nothing");
// Split.
const sample = load(50);
let treat = 0;
const total = 4000;
for (let i = 0; i < total; i += 1) if (sample.applyCheapestFirst(two, `tm-event-${i}`).variant === "cheapest_first") treat += 1;
assert(treat > total * 0.46 && treat < total * 0.54, `split near 50/50 (${treat}/${total})`);
assert(sample.applyCheapestFirst(two, "tm-event-7").variant === sample.applyCheapestFirst(two, "tm-event-7").variant, "an event always gets the same variant");
r = sample.applyCheapestFirst(two, "tm-event-9");
assert(["cheapest_first", "control"].includes(r.variant), "eligible card always carries a variant");
if (r.variant === "control") assert(r.specs === two, "control keeps today's order");
// Pending on-sale cards, links and routing are out of scope.
assert(!/applyCheapestFirst/.test(serverSrc.slice(serverSrc.indexOf("publicOnsalePending(show)) {"), serverSrc.indexOf("} else if (show.id) {", serverSrc.indexOf("publicOnsalePending(show)) {")))), "pending on-sale cards are not in the pilot");
console.log(`cheapest-first-pilot: ${passed} checks passed`);
