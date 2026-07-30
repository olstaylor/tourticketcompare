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

import {
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

console.log(`route-metadata: ${passed} assertions passed`);
