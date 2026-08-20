// Focused unit tests for the SERP-budget fitting helpers in
// functions/_route-metadata.js. Run standalone
// (node scripts/route-metadata.test.mjs) and as part of `npm run test:mvp`.
//
// The internal-link audit already fails the build on an over-budget title, but
// it can only see routes the current data produces. These tests cover the
// pathological place names that data does not contain yet — which is precisely
// the case that broke tm-new-shows-pr.yml on 2026-07-30, when three routes went
// over budget at once and the failing validation discarded a PR carrying ~183
// newly discovered events.

import { readFileSync } from "node:fs";
import {
  GUIDE_ROUTES,
  TRUST_ROUTES,
  TITLE_LENGTH_LIMIT,
  fitTitleToBudget,
  withoutParentheticalQualifier
} from "../functions/_route-metadata.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`route-metadata: ${message}`);
  passed += 1;
}

// ─── fitTitleToBudget ───────────────────────────────────────────────────────

assert(TITLE_LENGTH_LIMIT === 60, "title budget is 60 characters");

// A title already within budget must come back byte-identical, so adding the
// helper cannot change any title that was passing before.
const fine = "Concerts in Boston 2026 | Upcoming Shows & Tickets";
assert(fitTitleToBudget([fine, "shorter"]) === fine, "first candidate wins when it fits");
assert(fitTitleToBudget([fine]) === fine, "a lone fitting candidate is returned unchanged");
assert(fitTitleToBudget(fine) === fine, "a bare string is accepted as well as an array");

// Falls through to the first fitting candidate, not the shortest.
const over = "Concerts in Philadelphia 2026–2027 | Upcoming Shows & Tickets";
const mid = "Concerts in Philadelphia | Upcoming Shows & Tickets";
assert(over.length === 61, "the real Philadelphia overflow is 61 chars");
assert(fitTitleToBudget([over, mid, "Concerts in Philadelphia"]) === mid, "falls through to the first candidate that fits");

// The three real 2026-07-30 failures.
assert(
  fitTitleToBudget([over, mid]).length <= TITLE_LENGTH_LIMIT,
  "Philadelphia city title fits after dropping the year label"
);
const indy = "Concerts in Indianapolis 2026–2027 | Upcoming Shows & Tickets";
assert(indy.length === 61, "the real Indianapolis overflow is 61 chars");
assert(
  fitTitleToBudget([indy, "Concerts in Indianapolis | Upcoming Shows & Tickets"]).length <= TITLE_LENGTH_LIMIT,
  "Indianapolis city title fits after dropping the year label"
);
const casalecchio = "Niall Horan Tickets in Casalecchio di Reno (Bologna) | Compare Prices";
assert(casalecchio.length === 69, "the real Casalecchio overflow is 69 chars");
assert(
  fitTitleToBudget([casalecchio, "Niall Horan Tickets in Casalecchio di Reno | Compare Prices"]).length <=
    TITLE_LENGTH_LIMIT,
  "artist-city title fits after dropping the parenthetical qualifier"
);

// Final guarantee: no candidate list can anticipate every place name, so the
// helper must never return an over-budget string even when everything overflows.
const absurd = "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, Wales, United Kingdom";
const allOver = fitTitleToBudget([`Concerts in ${absurd} | Upcoming Shows & Tickets`, `Concerts in ${absurd}`]);
assert(allOver.length <= TITLE_LENGTH_LIMIT, "hard-truncates when every candidate overflows");
assert(allOver === allOver.trimEnd(), "truncated output has no trailing whitespace");
assert(!allOver.endsWith(" "), "truncated output does not end mid-space");

// Degenerate inputs must not throw or emit "undefined".
assert(fitTitleToBudget([]) === "", "empty candidate list yields an empty string");
assert(fitTitleToBudget([null, undefined, "", "  "]) === "", "blank candidates are discarded");
assert(fitTitleToBudget([null, fine]) === fine, "blank candidates are skipped over to a real one");
assert(!fitTitleToBudget([undefined, "Concerts in Rome"]).includes("undefined"), "never interpolates undefined");

// A custom limit is honoured (the description budget reuses the same shape).
assert(fitTitleToBudget(["abcdefghij", "abcde"], 5) === "abcde", "respects an explicit limit");

// ─── withoutParentheticalQualifier ──────────────────────────────────────────

assert(
  withoutParentheticalQualifier("Casalecchio di Reno (Bologna)") === "Casalecchio di Reno",
  "strips a trailing parenthetical province hint"
);
assert(withoutParentheticalQualifier("Boston") === "Boston", "leaves a plain city name alone");
assert(
  withoutParentheticalQualifier("Newcastle upon Tyne") === "Newcastle upon Tyne",
  "does not touch names with no parenthetical"
);
// Only a trailing qualifier is removed — a mid-string parenthetical is part of
// the name as the provider gave it, and dropping it could change the meaning.
assert(
  withoutParentheticalQualifier("Foo (Bar) Baz") === "Foo (Bar) Baz",
  "only a trailing parenthetical is stripped"
);
assert(withoutParentheticalQualifier("(Bologna)") === "(Bologna)", "never returns an empty label");
assert(withoutParentheticalQualifier("") === "", "empty input stays empty");
assert(withoutParentheticalQualifier(null) === "", "null input yields an empty string");
assert(
  withoutParentheticalQualifier("Washington, D.C. (DC)") === "Washington, D.C.",
  "keeps a comma-qualified name while dropping the parenthetical"
);

// --- the event-price guide's render fallback -------------------------------
// functions/[[path]].js renders this guide from a standalone literal when its
// GUIDE_ROUTES entry is missing, so the page never 404s or loses its provenance
// line on a stale deploy. Both objects are generated from the same Markdown by
// scripts/build-guide-content.mjs; this asserts every field agrees, not just the
// dates, so a drifted generator is caught here rather than in production.
const { EVENT_PRICE_GUIDE_PATH, EVENT_PRICE_GUIDE_FALLBACK } = await import("../functions/_guide-routes.generated.js");

assert(Boolean(GUIDE_ROUTES[EVENT_PRICE_GUIDE_PATH]), "the inline guide fallback's route exists in GUIDE_ROUTES");

const canonicalGuideEntry = GUIDE_ROUTES[EVENT_PRICE_GUIDE_PATH];
const fallbackFields = ["title", "h1", "description", "fullContent", "datePublished", "lastmod"];
for (const field of fallbackFields) {
  assert(
    EVENT_PRICE_GUIDE_FALLBACK[field] === canonicalGuideEntry[field],
    `EVENT_PRICE_GUIDE_FALLBACK.${field} (${EVENT_PRICE_GUIDE_FALLBACK[field]}) matches GUIDE_ROUTES (${canonicalGuideEntry[field]})`
  );
}
assert(
  Object.keys(EVENT_PRICE_GUIDE_FALLBACK).sort().join(",") === fallbackFields.slice().sort().join(","),
  "EVENT_PRICE_GUIDE_FALLBACK carries exactly the fields GUIDE_ROUTES does"
);

// The fallback must stay a standalone literal. If a future generator ever
// emitted it as `GUIDE_ROUTES[path]`, a missing entry would yield undefined and
// the fallback would fail in exactly the case it exists for.
const guideModuleSource = readFileSync(new URL("../functions/_guide-routes.generated.js", import.meta.url), "utf8");
assert(
  /export const EVENT_PRICE_GUIDE_FALLBACK = \{\n\s+title:/.test(guideModuleSource),
  "EVENT_PRICE_GUIDE_FALLBACK is emitted as its own object literal, not a lookup into GUIDE_ROUTES"
);
assert(
  !/EVENT_PRICE_GUIDE_FALLBACK\s*=\s*GUIDE_ROUTES/.test(guideModuleSource),
  "EVENT_PRICE_GUIDE_FALLBACK does not alias GUIDE_ROUTES"
);

// The router must import it rather than carry its own copy.
const routerSource = readFileSync(new URL("../functions/[[path]].js", import.meta.url), "utf8");
assert(
  /import \{ EVENT_PRICE_GUIDE_PATH, EVENT_PRICE_GUIDE_FALLBACK \} from "\.\/_guide-routes\.generated\.js";/.test(routerSource),
  "functions/[[path]].js imports the generated fallback"
);
assert(
  !/const EVENT_PRICE_GUIDE_FALLBACK = \{/.test(routerSource),
  "functions/[[path]].js keeps no second copy of the fallback literal"
);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Every static route the sitemap and the provenance sync depend on must carry a
// well-formed lastmod. scripts/sync-content-provenance.mjs updates these values
// in place, and the sitemap emits them.
for (const [path, route] of Object.entries(GUIDE_ROUTES)) {
  assert(ISO_DATE.test(String(route.lastmod || "")), `${path} has an ISO lastmod`);
  assert(ISO_DATE.test(String(route.datePublished || "")), `${path} has an ISO datePublished`);
  assert(
    String(route.lastmod) >= String(route.datePublished),
    `${path} was not updated before it was published`
  );
}
for (const [path, route] of Object.entries(TRUST_ROUTES)) {
  assert(ISO_DATE.test(String(route.lastmod || "")), `${path} has an ISO lastmod`);
}

console.log(`route-metadata: ${passed} assertions passed`);
