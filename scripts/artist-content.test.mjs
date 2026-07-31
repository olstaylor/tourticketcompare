// Focused unit tests for the reusable artist-page content model in
// functions/_artist-content.js. Run standalone (node scripts/artist-content.test.mjs)
// and as part of `npm run test:mvp`.
//
// The cases mirror the artist pages that actually exist on the site: a large
// multi-country board, a single-date board, a multi-night venue run, a board
// with weak provider coverage, and an artist with no dates at all.

import {
  artistSearchIntro,
  artistStatusFacts,
  artistTicketHelp,
  artistEmptyBoardCopy,
  artistFaqEntries,
  deriveArtistBoardStatus,
  deriveTourSummaries,
  buildArtistContentModel
} from "../functions/_artist-content.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-content: ${message}`);
  passed += 1;
}

// Copy-safety guard mirroring the smoke public-copy rules: derived content must
// never make cheapest/lowest/ranking or invented-price claims, and must never
// manufacture demand, scarcity, or a hint that an announcement is coming.
const BANNED = [
  /\bcheapest\b/i,
  /\bbest\s+price\b/i,
  /\blowest\s+price\b/i,
  /\bfrom\s*[£$€]\s*\d/i,
  /\bguaranteed\b/i,
  /\bsell(ing)?\s+out\b/i,
  /\bdemand\b/i,
  /\bhurry\b/i,
  /\bdon'?t\s+miss\b/i,
  /\bunforgettable\b/i,
  /\bsecure\s+your\s+seats\b/i,
  /\bcoming\s+soon\b/i,
  /\bstay\s+tuned\b/i
];
function assertCopySafe(text, label) {
  for (const rule of BANNED) {
    assert(!rule.test(text), `${label} must not contain banned copy (${rule}): "${text}"`);
  }
}

const formatDate = (iso) => (iso ? String(iso).slice(0, 10) : "");
const options = { formatDate, formatShortDate: formatDate };

function show(overrides = {}) {
  return {
    id: overrides.id || `show-${Math.random().toString(36).slice(2)}`,
    publishable: true,
    ctaProviderCount: 1,
    hasPriceSnapshot: false,
    ...overrides
  };
}

// --- Large board: many dates, several countries, multi-night runs -----------
const bigBoard = [
  show({ id: "a1", city: "London", country: "United Kingdom", venue: "The O2", dateTimeISO: "2026-09-01T19:00:00Z", ctaProviderCount: 3, hasPriceSnapshot: true }),
  show({ id: "a2", city: "London", country: "United Kingdom", venue: "The O2", dateTimeISO: "2026-09-02T19:00:00Z", ctaProviderCount: 3 }),
  show({ id: "a3", city: "London", country: "United Kingdom", venue: "The O2", dateTimeISO: "2026-09-03T19:00:00Z", ctaProviderCount: 2 }),
  show({ id: "a4", city: "Paris", country: "France", venue: "Accor Arena", dateTimeISO: "2026-09-10T19:00:00Z", ctaProviderCount: 1 }),
  show({ id: "a5", city: "Berlin", country: "Germany", venue: "Uber Arena", dateTimeISO: "2026-09-15T19:00:00Z", ctaProviderCount: 1 })
];
const bigStatus = deriveArtistBoardStatus(bigBoard);
assert(bigStatus.showCount === 5, "board status should count every dated show");
assert(bigStatus.cityCount === 3, "board status should count distinct cities");
assert(bigStatus.countryCount === 3, "board status should count distinct countries");
assert(bigStatus.venueCount === 3, "board status should count distinct venues");
assert(bigStatus.first.iso === "2026-09-01T19:00:00Z", "first should be the earliest date");
assert(bigStatus.last.iso === "2026-09-15T19:00:00Z", "last should be the latest date");
assert(bigStatus.next.city === "London", "next should carry the soonest show's place");
assert(bigStatus.multiNightRuns.length === 1 && bigStatus.multiNightRuns[0].count === 3, "a three-night stand is one multi-night run");
assert(bigStatus.multiNightShowCount === 3, "multi-night show count should total the run");
assert(bigStatus.showsWithCta === 5 && bigStatus.showsWithoutCta === 0, "every annotated show has a CTA here");
assert(bigStatus.providerCoverageVaries === true, "1..3 providers per date is uneven coverage");
assert(bigStatus.snapshotShowCount === 1, "snapshot count should follow the annotation");

const bigIntro = artistSearchIntro({ name: "Harry Styles" }, bigStatus, options);
assert(bigIntro.includes("5 upcoming Harry Styles dates"), "intro should state the tracked count");
assert(bigIntro.includes("3 cities") && bigIntro.includes("3 countries"), "intro should state the geographic spread");
assert(bigIntro.includes("2026-09-01") && bigIntro.includes("2026-09-15"), "intro should state the run's range");
assert(bigIntro.includes("The O2"), "a single multi-night run should be named in the intro");
assertCopySafe(bigIntro, "large-board intro");

// --- Single-date board ------------------------------------------------------
const oneStatus = deriveArtistBoardStatus([
  show({ id: "b1", city: "Colorado Springs", country: "United States", venue: "Weidner Field", dateTimeISO: "2026-07-30T23:30:00Z" })
]);
const oneIntro = artistSearchIntro({ name: "Jelly Roll" }, oneStatus, options);
assert(oneIntro.startsWith("One upcoming Jelly Roll date is verified"), "a single date gets its own sentence shape");
assert(oneIntro.includes("Weidner Field"), "a single date names its venue");
assert(!/\d+ cities/.test(oneIntro), "a single date must not claim a city spread");
assertCopySafe(oneIntro, "single-date intro");
const oneFacts = artistStatusFacts(oneStatus, options);
assert(oneFacts.some((fact) => fact.label === "Date"), "a single-date board labels the fact 'Date', not 'Next date'");
assert(
  oneFacts.find((fact) => fact.label === "Checked ticket links")?.value === "This date",
  "a single-date board must not read 'All 1 dates'"
);
assert(!oneFacts.some((fact) => fact.label === "Cities"), "a one-city board should not show a Cities count");

// --- Weak provider coverage -------------------------------------------------
const weakStatus = deriveArtistBoardStatus([
  show({ id: "c1", city: "Denver", country: "United States", venue: "Ball Arena", dateTimeISO: "2026-12-03T03:00:00Z", ctaProviderCount: 1 }),
  show({ id: "c2", city: "Oakland", country: "United States", venue: "Oakland Arena", dateTimeISO: "2026-12-07T03:00:00Z", ctaProviderCount: 0 }),
  show({ id: "c3", city: "Austin", country: "United States", venue: "Moody Center", dateTimeISO: "2026-12-09T03:00:00Z", ctaProviderCount: 0 })
]);
const weakIntro = artistSearchIntro({ name: "Gracie Abrams" }, weakStatus, options);
assert(weakIntro.includes("1 of the 3 have a checked ticket link"), "partial coverage must be stated, not hidden");
assertCopySafe(weakIntro, "weak-coverage intro");
assert(
  artistStatusFacts(weakStatus, options).find((fact) => fact.label === "Checked ticket links")?.value === "1 of 3 dates",
  "the fact strip should quantify partial link coverage"
);

const noCtaStatus = deriveArtistBoardStatus([
  show({ id: "d1", city: "Madrid", country: "Spain", venue: "Movistar Arena", dateTimeISO: "2026-11-01T19:00:00Z", ctaProviderCount: 0 }),
  show({ id: "d2", city: "Lisbon", country: "Portugal", venue: "Altice Arena", dateTimeISO: "2026-11-04T19:00:00Z", ctaProviderCount: 0 })
]);
const noCtaIntro = artistSearchIntro({ name: "Bad Bunny" }, noCtaStatus, options);
assert(noCtaIntro.includes("None of them have a checked ticket link yet"), "a board with no links must say so plainly");
assertCopySafe(noCtaIntro, "no-cta intro");

// --- Empty board ------------------------------------------------------------
const emptyStatus = deriveArtistBoardStatus([]);
assert(emptyStatus.showCount === 0 && emptyStatus.next === null, "an empty board has no counts and no next date");
const emptyIntro = artistSearchIntro({ name: "Latto" }, emptyStatus, options);
assert(emptyIntro.includes("No verified upcoming Latto dates are listed"), "the empty intro states the position plainly");
assertCopySafe(emptyIntro, "empty intro");
assert(artistStatusFacts(emptyStatus, options).length === 0, "an empty board renders no fact strip");
const emptyCopy = artistEmptyBoardCopy({ name: "Latto" }, { pastShowCount: 0 });
assert(emptyCopy.heading === "No upcoming dates listed", "empty heading should not imply dates are pending");
assert(emptyCopy.body.includes("can't say whether more are coming"), "empty copy must not imply an announcement is imminent");
assertCopySafe(emptyCopy.body, "empty body");
assertCopySafe(emptyCopy.next, "empty next-step");
assert(
  artistEmptyBoardCopy({ name: "Post Malone" }, { pastShowCount: 3 }).body.includes("already taken place"),
  "an empty board with past dates should acknowledge them"
);

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

// --- Shared help component --------------------------------------------------
const help = artistTicketHelp();
assert(help.points.length >= 3, "the shared help component should list the safe points once");
assert(help.points.some((point) => /snapshot/i.test(point)), "help should use snapshot framing");
assert(help.points.some((point) => /Fees/i.test(point)), "help should tell the reader where fees land");
assertCopySafe(help.intro, "help intro");
help.points.forEach((point) => assertCopySafe(point, "help point"));
// The component is universal by design: it takes no arguments and cannot be
// personalised per artist. Personalising this copy is exactly what made the
// three blocks it replaced read as interchangeable filler.
assert(artistTicketHelp.length === 0, "the shared help component must not accept page state to interpolate");
assert(
  JSON.stringify(artistTicketHelp()) === JSON.stringify(help),
  "the shared help component must render identically on every page"
);

// --- FAQ --------------------------------------------------------------------
const authoredFaq = [
  { question: "Where can I find Harry Styles tour dates?", answer: "Check the verified ticket platform links on this page." },
  { question: "How do I know if a ticket link is real?", answer: "We only show buttons that link directly to checked destinations." },
  { question: "What ticket prices can I see here?", answer: "A timestamped listed-price snapshot may appear." },
  { question: "Is TourTicketCompare official?", answer: "No. TourTicketCompare is independent and unofficial." }
];
const faq = artistFaqEntries({ name: "Harry Styles", faq: authoredFaq }, bigStatus, options);
assert(faq[0][0] === "How many Harry Styles dates are listed on this page?", "the FAQ should lead with the data-grounded question");
assert(faq[0][1].includes("5 upcoming dates"), "the lead FAQ answer should count this page's own dates");
assert(
  !faq.some(([question]) => /tour dates\?/i.test(question)),
  "the authored 'where do I find tour dates' question is superseded by the visible board"
);
assert(
  !faq.some(([question]) => /prices can i see/i.test(question)),
  "the authored pricing question is superseded by the shared help component"
);
assert(faq.some(([question]) => question === "Is TourTicketCompare official?"), "authored questions the page does not answer are kept");
faq.forEach(([question, answer]) => assertCopySafe(`${question} ${answer}`, "faq entry"));

const emptyFaq = artistFaqEntries({ name: "Latto", faq: authoredFaq }, emptyStatus, options);
assert(emptyFaq[0][0] === "Are there upcoming Latto dates?", "an empty board asks (and answers) the question a visitor actually has");
assert(emptyFaq[0][1].startsWith("Not on this page."), "the empty-board answer should be direct");
assert(
  artistFaqEntries({ name: "Latto" }, emptyStatus, options).length >= 2,
  "an artist with no authored FAQ still gets a usable FAQ"
);

// --- Full model -------------------------------------------------------------
const model = buildArtistContentModel({ name: "Harry Styles", faq: authoredFaq }, bigBoard, options);
assert(model.intro === bigIntro, "model intro should match artistSearchIntro");
assert(model.status.showCount === 5, "model should carry the board status");
assert(model.facts.length >= 4, "model should carry the fact strip");
assert(model.help && model.faq.length >= 2, "model should carry the shared help and the FAQ");
assert(model.emptyBoard.heading === "No upcoming dates listed", "model should carry empty-board copy for the zero-date render");
assert(
  buildArtistContentModel({ name: "Nobody" }, [], options).facts.length === 0,
  "an empty board yields no fact strip through the model"
);

console.log(`artist-content: ${passed} assertions passed`);
