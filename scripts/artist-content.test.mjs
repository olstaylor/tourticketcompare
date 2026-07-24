// Focused unit tests for the reusable artist-page content model in
// functions/_artist-content.js. Run standalone (node scripts/artist-content.test.mjs)
// and as part of `npm run test:mvp`.

import {
  artistSearchIntro,
  deriveTourSummaries,
  artistBuyingGuide,
  artistPricingExplanation,
  buildArtistContentModel
} from "../functions/_artist-content.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-content: ${message}`);
  passed += 1;
}

// Copy-safety guard mirroring the smoke public-copy rules: derived content must
// never make cheapest/lowest/ranking or invented-price claims.
const BANNED = [/\bcheapest\b/i, /\bbest\s+price\b/i, /\blowest\s+price\b/i, /\bfrom\s*[£$€]\s*\d/i, /\bguaranteed\b/i];
function assertCopySafe(text, label) {
  for (const rule of BANNED) {
    assert(!rule.test(text), `${label} must not contain banned copy (${rule})`);
  }
}

// --- Search intro -----------------------------------------------------------
const intro = artistSearchIntro({ name: "Harry Styles" });
assert(intro.includes("Harry Styles"), "intro should include the artist name");
assert(
  intro.includes("tour dates, compare available ticket options from checked providers, and use practical buying guidance before you book."),
  "intro should carry the shared invariant phrase (kept in sync with public/app.js)"
);
assert(artistSearchIntro({}).includes("this artist"), "intro should degrade gracefully with no name");
assertCopySafe(intro, "intro");

// --- Tour summaries ---------------------------------------------------------
const shows = [
  { tour_name: "Tour A", city: "London", dateTimeISO: "2026-08-01T19:00:00Z", publishable: true },
  { tour_name: "Tour A", city: "Paris", dateTimeISO: "2026-08-05T19:00:00Z", publishable: true },
  { tour_name: "Tour A", city: "London", dateTimeISO: "2026-07-20T19:00:00Z", publishable: true },
  { tour_name: "Tour B", city: "Berlin", dateTimeISO: "2026-09-01T19:00:00Z", publishable: true },
  // Excluded: blank tour name.
  { tour_name: "", city: "Rome", dateTimeISO: "2026-08-10T19:00:00Z", publishable: true },
  // Excluded: not publishable.
  { tour_name: "Tour C", city: "Madrid", dateTimeISO: "2026-08-11T19:00:00Z", publishable: false },
  // Excluded: unparseable date.
  { tour_name: "Tour D", city: "Oslo", dateTimeISO: "not-a-date", publishable: true }
];
const tours = deriveTourSummaries(shows);
assert(tours.length === 2, "only tours with publishable, dated, named shows should appear");
assert(tours[0].name === "Tour A", "larger tour should sort first");
assert(tours[0].showCount === 3, "Tour A should count all three publishable shows");
assert(tours[0].cityCount === 2, "Tour A should count distinct cities (London, Paris)");
assert(tours[0].startISO === "2026-07-20T19:00:00Z", "startISO should be the earliest show");
assert(tours[0].endISO === "2026-08-05T19:00:00Z", "endISO should be the latest show");
assert(
  tours[0].sampleCities[0] === "London" && tours[0].sampleCities.includes("Paris"),
  "sample cities should be date-ordered and distinct"
);
assert(!tours.some((tour) => tour.name === "Tour C"), "non-publishable tours must be excluded");
assert(!tours.some((tour) => tour.name === "Tour D"), "tours with unparseable dates must be excluded");
assert(deriveTourSummaries(undefined).length === 0, "undefined input should yield no tours");
assert(deriveTourSummaries([]).length === 0, "empty input should yield no tours");

// --- Buying guide + pricing -------------------------------------------------
const guide = artistBuyingGuide({ name: "Harry Styles" });
assert(guide.intro.includes("Harry Styles"), "buying guide intro should mention the artist");
assert(guide.steps.length >= 4, "buying guide should provide multiple actionable steps");
guide.steps.forEach((step) => assertCopySafe(step, "buying-guide step"));
assertCopySafe(guide.intro, "buying-guide intro");

const pricing = artistPricingExplanation();
assert(pricing.points.length >= 3, "pricing explanation should list several safe points");
assert(
  pricing.points.some((point) => /snapshot/i.test(point)),
  "pricing explanation should use snapshot framing"
);
assertCopySafe(pricing.intro, "pricing intro");
pricing.points.forEach((point) => assertCopySafe(point, "pricing point"));

// --- Full model -------------------------------------------------------------
const model = buildArtistContentModel({ name: "Harry Styles" }, shows);
assert(model.intro === intro, "model intro should match artistSearchIntro");
assert(model.tours.length === 2, "model should carry derived tours");
assert(model.buyingGuide && model.pricing, "model should include buying guide and pricing");

console.log(`artist-content: ${passed} assertions passed`);
