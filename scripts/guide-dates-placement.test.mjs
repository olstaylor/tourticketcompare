import assert from "node:assert/strict";
import { guideDatesInsertIndex, renderGuideUpcomingArtists, GUIDE_UPCOMING_ARTIST_PATHS } from "../functions/[[path]].js";

// Dated cards sit after "Find your concert", else after the opening answer.
const withFind = [
  { type: "intro", content: "x" },
  { type: "section", title: "Quick answer", content: "x" },
  { type: "section", title: "Find your concert", content: "x" },
  { type: "section", title: "FAQ", content: "x" }
];
assert.equal(guideDatesInsertIndex(withFind), 2);
assert.equal(guideDatesInsertIndex(withFind.filter((section) => section.title !== "Find your concert")), 1);
assert.equal(guideDatesInsertIndex([]), -1);
assert.equal(guideDatesInsertIndex(null), -1);

// StubHub US guides link soon-touring indexable artists, one card each, no provider links.
const now = Date.parse("2026-10-10T12:00:00Z");
const artistsMeta = [
    { slug: "artist-a", name: "Artist A", indexing_status: "indexable_with_substantial_content" },
    { slug: "artist-b", name: "Artist B", indexing_status: "shell" }
];
const events = [
  { id: "a1", artist_slug: "artist-a", datetime_iso: "2026-10-20T19:00:00-05:00", venue: "Hall", city: "Boston" },
  { id: "a2", artist_slug: "artist-a", datetime_iso: "2026-10-22T19:00:00-05:00", venue: "Hall", city: "Boston" },
  { id: "b1", artist_slug: "artist-b", datetime_iso: "2026-10-15T19:00:00-05:00", venue: "Hall", city: "Boston" },
  { id: "old", artist_slug: "artist-a", datetime_iso: "2026-09-01T19:00:00-05:00", venue: "Hall", city: "Boston" }
];
const path = [...GUIDE_UPCOMING_ARTIST_PATHS][0];
const html = renderGuideUpcomingArtists({ path, artistsMeta }, events, now);
assert.match(html, /href="\/artists\/artist-a"/);
assert.doesNotMatch(html, /artist-b/, "non-indexable artists are not linked");
assert.equal((html.match(/guide-provider-pair-card/g) || []).length, 1, "one card per artist");
assert.doesNotMatch(html, /\/api\/out/, "no provider links");
assert.equal(renderGuideUpcomingArtists({ path: "/guides/is-seatgeek-legit", artistsMeta }, events, now), "");
assert.equal(renderGuideUpcomingArtists({ path, artistsMeta }, [], now), "");

console.log("guide dates placement tests passed");
