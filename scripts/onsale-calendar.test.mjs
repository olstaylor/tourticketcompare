// Date-controlled tests for the /on-sale calendar derivation and page body.
// Run standalone (node scripts/onsale-calendar.test.mjs) and as part of
// `npm run test:mvp`.
//
// The calendar lists Ticketmaster public on-sale times already carried on
// reviewed events. These tests lock what it may and may not list: only shows
// still ahead, only real on-sale times inside the window (never the far-future
// "to be announced" placeholder), days in each venue's local time, and a page
// that links to artist pages but never to a ticket site before the on-sale.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`onsale-calendar: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-09-25T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;

const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
const { deriveOnsaleCalendar, ONSALE_LOOKAHEAD_DAYS, ONSALE_RECENT_DAYS } = await load("functions/_onsale-calendar.js");
const { onsaleCalendarGate } = await load("functions/_route-indexability.js");
const { renderOnsaleCalendarBody } = await load("functions/[[path]].js");

const DAY = 86400000;
const iso = (ms) => new Date(ms).toISOString();

function event(id, artist, { onsale, show = NOW_MS + 120 * DAY, timezone = "America/Chicago", city = "Springfield" } = {}) {
  return {
    id,
    artist_slug: artist,
    artist_name: artist === "artist-a" ? "Artist A" : "Artist B",
    city,
    country: "United States",
    venue: `${city} Arena`,
    datetime_iso: iso(show),
    timezone,
    public_onsale_at: onsale === undefined ? "" : onsale,
    ticketmaster_url: `https://www.ticketmaster.com/event/${id}`
  };
}

const events = [
  event("upcoming-1", "artist-a", { onsale: iso(NOW_MS + 2 * DAY) }),
  event("upcoming-2", "artist-a", { onsale: iso(NOW_MS + 2 * DAY + 3600000) }),
  // 03:00Z on Oct 2 is still Oct 1 in Los Angeles.
  event("upcoming-la", "artist-b", { onsale: "2026-10-02T03:00:00Z", timezone: "America/Los_Angeles", city: "Los Angeles" }),
  event("recent-1", "artist-b", { onsale: iso(NOW_MS - 2 * DAY) }),
  event("too-far", "artist-a", { onsale: iso(NOW_MS + (ONSALE_LOOKAHEAD_DAYS + 1) * DAY) }),
  event("placeholder", "artist-a", { onsale: "9999-12-31T00:00:00Z" }),
  event("too-old", "artist-b", { onsale: iso(NOW_MS - (ONSALE_RECENT_DAYS + 1) * DAY) }),
  event("show-past", "artist-a", { onsale: iso(NOW_MS + DAY), show: NOW_MS - DAY }),
  event("no-onsale", "artist-a", {}),
  event("bad-onsale", "artist-a", { onsale: "soon" })
];

const calendar = deriveOnsaleCalendar(events);
const listedIds = (groups) => groups.flatMap((group) => group.artists.flatMap((artist) => artist.shows.map((show) => show.id)));
const upcomingIds = listedIds(calendar.upcoming);
const recentIds = listedIds(calendar.recent);

assert(upcomingIds.length === 3 && calendar.upcomingCount === 3, `three upcoming on-sales are listed (got ${upcomingIds.join(", ")})`);
assert(recentIds.length === 1 && recentIds[0] === "recent-1", "one on-sale from the recent window is listed");
for (const id of ["too-far", "placeholder", "too-old", "show-past", "no-onsale", "bad-onsale"]) {
  assert(!upcomingIds.includes(id) && !recentIds.includes(id), `${id} is not listed`);
}
assert(calendar.upcoming[0].day === "2026-09-27", "upcoming days run earliest first");
assert(
  calendar.upcoming.some((group) => group.day === "2026-10-01" && listedIds([group]).includes("upcoming-la")),
  "an on-sale is filed under its venue's local day, not the UTC day"
);
const sameDay = calendar.upcoming.find((group) => group.day === "2026-09-27");
assert(sameDay.artists.length === 1 && sameDay.artists[0].shows.length === 2, "one artist's dates on the same day group together");
assert(calendar.artistCount === 2 && calendar.showCount === 4, "counts cover both windows");
assert(calendar.indexable === true, "four dates across two artists clear the gate");
assert(calendar.lastOpenedDate === "2026-09-23", "lastOpenedDate is the newest on-sale that has already opened");
assert(deriveOnsaleCalendar([]).lastOpenedDate === null, "no opened on-sale leaves lastOpenedDate null");

assert(!onsaleCalendarGate({ showCount: 2, artistCount: 2 }).indexable, "two dates do not clear the gate");
assert(!onsaleCalendarGate({ showCount: 5, artistCount: 1 }).indexable, "one artist does not clear the gate");
assert(!onsaleCalendarGate({ showCount: 0, artistCount: 0 }).indexable, "an empty calendar is not indexable");
assert(!deriveOnsaleCalendar([]).indexable, "no events derives a non-indexable calendar");

const html = renderOnsaleCalendarBody({ path: "/on-sale", calendar, breadcrumb: [{ name: "On-sale calendar", path: "/on-sale" }] });
assert((html.match(/<h1\b/g) || []).length === 1 && html.includes("Concert tickets going on sale"), "the page has one H1");
assert(html.includes('href="/artists/artist-a"') && html.includes('href="/artists/artist-b"'), "each listed artist links to its artist page");
assert(!/href="https?:\/\//.test(html), "the page links to no external ticket site");
assert(html.includes("PDT"), "an on-sale time is shown in the venue's local zone");
assert(html.includes("Just went on sale"), "the recent window renders when it has dates");
assert(!/cheapest|lowest price|sold out|selling fast/i.test(html), "the page makes no banned price or availability claim");

const empty = renderOnsaleCalendarBody({ path: "/on-sale", calendar: deriveOnsaleCalendar([]), breadcrumb: [] });
assert(empty.includes("No tracked date has a public on-sale") && !empty.includes("Just went on sale"), "an empty calendar renders a short empty state");

console.log(`onsale-calendar: ${passed} assertions passed.`);
