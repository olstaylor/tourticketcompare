// Date-controlled tests for the artist presentation contract.

import fs from "node:fs";
import { artistHasUpcomingShow, artistPageIndexable, splitArtistsByUpcoming } from "../functions/_artist-indexability.js";

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

// Empty artist pages remain durable and indexable when their editorial record
// is indexable; the old dynamic noindex gate must not return.
assert(artistPageIndexable("indexable_with_substantial_content", [], "empty-artist", NOW), "editorially indexable empty artist page remains indexable");
assert(!artistPageIndexable("review_required", [], "empty-artist", NOW), "review-required artist remains non-indexable");

const server = fs.readFileSync(new URL("../functions/[[path]].js", import.meta.url), "utf8");
const client = fs.readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
assert(server.includes("Artists with upcoming dates") && server.includes("No dates currently listed"), "server exposes both artist sections");
assert(client.includes("Artists with upcoming dates") && client.includes("No dates currently listed"), "client exposes both artist sections");
assert(server.includes("shows.length ? `${artist.name} tickets and tour dates` : `${artist.name} tickets`"), "server removes tour wording from empty artist headings");
assert(client.includes("const shouldNoindex = isReviewRequired;"), "client does not noindex an artist only because it has no future dates");
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
