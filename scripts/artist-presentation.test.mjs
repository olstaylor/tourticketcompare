// Date-controlled tests for the artist presentation contract.

import fs from "node:fs";
import {
  AUTO_PROMOTED_MIN_UPCOMING_SHOWS,
  artistHasUpcomingShow,
  artistPageIndexable,
  countUpcomingShows,
  splitArtistsByUpcoming
} from "../functions/_artist-indexability.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-presentation: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-08-09T12:00:00Z");
const artists = [
  { slug: "active-artist", name: "Active Artist" },
  { slug: "returning-artist", name: "Returning Artist" },
  { slug: "past-artist", name: "Past Artist" },
  { slug: "empty-artist", name: "Empty Artist" }
];
const events = [
  { id: "future", artist_slug: "active-artist", datetime_iso: "2026-08-10T19:00:00Z" },
  { id: "boundary", artist_slug: "returning-artist", datetime_iso: "2026-08-09T12:00:00Z" },
  { id: "past", artist_slug: "past-artist", datetime_iso: "2026-08-08T19:00:00Z" },
  { id: "malformed", artist_slug: "empty-artist", datetime_iso: "not-a-date" }
];

assert(artistHasUpcomingShow(events, "active-artist", NOW), "future event is active");
assert(artistHasUpcomingShow(events, "returning-artist", NOW), "event at the reference instant is active");
assert(!artistHasUpcomingShow(events, "past-artist", NOW), "past-only artist is secondary");
assert(!artistHasUpcomingShow(events, "empty-artist", NOW), "malformed date is not active");

const split = splitArtistsByUpcoming(artists, events, NOW);
assert(split.primary.map((artist) => artist.slug).join(",") === "active-artist,returning-artist", "primary section contains only future-date artists in catalog order");
assert(split.secondary.map((artist) => artist.slug).join(",") === "past-artist,empty-artist", "secondary section contains every artist without a future date");

// Owner-approved 2026-09-24: an owner-promoted artist is indexable once it has
// any tracked date, upcoming or past. A finished tour keeps the page indexed
// (it shows the tour history); a page that has never carried a date is
// noindex until one lands, because "no dates" alone reads as a soft 404.
assert(!artistPageIndexable("indexable_with_substantial_content", [], "empty-artist", NOW), "an artist that has never had a tracked date is noindex");
assert(
  artistPageIndexable("indexable_with_substantial_content", [{ artist_slug: "past-only", datetime_iso: "2020-01-01T00:00:00Z" }], "past-only", NOW),
  "an artist whose tracked dates are all past stays indexable"
);
assert(artistPageIndexable("indexable_with_substantial_content", [], undefined, NOW), "a status-only caller with no slug cannot be counted and keeps the editorial verdict");
assert(!artistPageIndexable("review_required", [], "empty-artist", NOW), "review-required artist remains non-indexable");

// An owner-promoted record (no promotion_source) keeps the durable rule.
const indexable = "indexable_with_substantial_content";
assert(!artistPageIndexable({ slug: "empty-artist", indexing_status: indexable }, [], undefined, NOW), "an owner-promoted record with no tracked date is noindex");
assert(artistPageIndexable({ slug: "empty-artist", indexing_status: indexable }, [{ artist_slug: "empty-artist", datetime_iso: "2020-01-01T00:00:00Z" }], undefined, NOW), "an owner-promoted record with only past dates stays indexable");
assert(!artistPageIndexable({ slug: "empty-artist", indexing_status: "review_required", promotion_source: "auto" }, [], undefined, NOW), "an auto-promoted shell is never indexable");

// An auto-promoted artist is indexable only with at least three upcoming dates.
const autoEvents = [
  { id: "a1", artist_slug: "auto-artist", datetime_iso: "2026-09-01T19:00:00Z" },
  { id: "a2", artist_slug: "auto-artist", datetime_iso: "2026-09-02T19:00:00Z" },
  { id: "a3", artist_slug: "auto-artist", datetime_iso: "2026-09-03T19:00:00Z" },
  { id: "a0", artist_slug: "auto-artist", datetime_iso: "2026-08-01T19:00:00Z" }
];
const autoArtist = { slug: "auto-artist", indexing_status: indexable, promotion_source: "auto" };
assert(countUpcomingShows(autoEvents, "auto-artist", NOW) === 3, "the past date is not counted as upcoming");
assert(artistPageIndexable(autoArtist, autoEvents, undefined, NOW), "auto-promoted artist with three upcoming dates is indexable");
assert(!artistPageIndexable(autoArtist, autoEvents.slice(1), undefined, NOW), "auto-promoted artist with two upcoming dates is noindex");
assert(!artistPageIndexable(autoArtist, [], undefined, NOW), "auto-promoted artist with no dates is noindex, not an error");
assert(AUTO_PROMOTED_MIN_UPCOMING_SHOWS === 3, "the auto-promoted threshold is three upcoming dates");

const server = fs.readFileSync(new URL("../functions/[[path]].js", import.meta.url), "utf8");
const client = fs.readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
assert(server.includes("Artists with upcoming dates") && server.includes("No dates currently listed"), "server exposes both artist sections");
assert(client.includes("Artists with upcoming dates") && client.includes("No dates currently listed"), "client exposes both artist sections");
assert(server.includes("shows.length ? `${artist.name} tickets and tour dates` : `${artist.name} tickets`"), "server removes tour wording from empty artist headings");
assert(
  client.includes('const shouldNoindex = isReviewRequired || (artist.promotion_source === "auto" && /noindex/i.test(serverRobots));'),
  "client does not noindex an owner-promoted artist only because it has no future dates"
);
assert(!server.includes("function artistCardTier") && !client.includes("function artistCardTier"), "the old mixed artist tier is removed");

// The "About these links" note and generic supporting sections describe a
// populated ticket board. Empty pages keep their honest empty state instead.
assert(
  server.includes("const linksNoteHtml = isIndexableArtist && shows.length"),
  "server gates the links note on editorial status and a populated board"
);
assert(
  server.includes("const usefulLinksHtml = shows.length") && server.includes("const faqHtml = shows.length"),
  "server omits generic useful links and FAQ from empty boards"
);
assert(
  client.includes("if (serverShows.length || !isReviewRequired)") &&
    client.includes("if (serverShows.length && !isReviewRequired)"),
  "client mirrors the server's empty-board supporting-content gates"
);
assert(
  client.includes("if (serverShows.length)") && client.includes("else if (summary)"),
  "client appends generic supporting sections only for populated boards"
);
// The notice reads "the dates are here for reference". The client renders on
// every artist page, so an ungated notice would overwrite the server's clean
// empty state with a claim about dates the board does not have.
assert(
  client.includes("if (isReviewRequired && serverShows.length) {"),
  "client only shows the review notice when there are dates to explain"
);

// The FAQ must not promise an inspection the interface cannot deliver: every
// CTA routes through /api/out, so hovering exposes the internal redirect rather
// than the provider hostname.
const catalogText = fs.readFileSync(new URL("../public/data/catalog.json", import.meta.url), "utf8");
assert(
  !catalogText.includes("Hover over the link to see the full URL"),
  "no artist FAQ tells users to hover a button to inspect the provider URL"
);

console.log(`artist-presentation: ${passed} assertions passed`);
