// Date-controlled tests for Ticketmaster presale windows: the shared
// derivation (functions/_presales.js), the /artists/<artist>/presale page, the
// presale section of /on-sale and the presale line on artist pages.
// Run standalone (node scripts/presales.test.mjs) and as part of the quick lane.
//
// These lock what the feature may and may not show: only a window's name and
// times (never a code, description or link), only windows still open or ahead,
// only on upcoming scheduled dates, grouped across dates only when identical,
// and a page that is indexable only while a presale is near.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`presales: ${message}`);
  passed += 1;
}

const NOW_ISO = "2026-10-05T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
Date.now = () => NOW_MS;
const DAY = 86400000;
const iso = (ms) => new Date(ms).toISOString().replace(".000Z", "Z");

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
const presalesModule = await load("functions/_presales.js");
const policy = await load("functions/_route-indexability.js");
const middlewareModule = await load("functions/_middleware.js");
const sitemapModule = await load("functions/sitemap.xml.js");
const { normalizePresaleWindows, deriveArtistPresales, deriveUpcomingPresales, deriveIndexablePresalePages, presalePath } = presalesModule;

// ─── part 1: normalisation ─────────────────────────────────────────────────

{
  const windows = normalizePresaleWindows(
    [
      { name: "  Artist   Presale ", startDateTime: iso(NOW_MS + 2 * DAY), endDateTime: iso(NOW_MS + 3 * DAY), description: "code LOVE", url: "https://example.com" },
      { name: "Card Presale", startDateTime: iso(NOW_MS + DAY), endDateTime: iso(NOW_MS + 2 * DAY) },
      { name: "Ended Presale", startDateTime: iso(NOW_MS - 3 * DAY), endDateTime: iso(NOW_MS - DAY) },
      { name: "Fan Presale code: LOVE24", startDateTime: iso(NOW_MS + DAY), endDateTime: iso(NOW_MS + 2 * DAY) },
      { name: "Sign up at https://example.com", startDateTime: iso(NOW_MS + DAY), endDateTime: iso(NOW_MS + 2 * DAY) },
      { name: "Backwards", startDateTime: iso(NOW_MS + 3 * DAY), endDateTime: iso(NOW_MS + 2 * DAY) },
      { name: "Placeholder", startDateTime: "9999-12-31T00:00:00Z", endDateTime: "9999-12-31T01:00:00Z" },
      { name: "No end", startDateTime: iso(NOW_MS + DAY) },
      { name: "", startDateTime: iso(NOW_MS + DAY), endDateTime: iso(NOW_MS + 2 * DAY) },
      { name: "Card Presale", startDateTime: iso(NOW_MS + DAY), endDateTime: iso(NOW_MS + 2 * DAY) }
    ],
    NOW_MS
  );
  assert(windows.length === 2, "only valid, live, safe windows survive, once each");
  assert(windows[0].name === "Card Presale" && windows[1].name === "Artist Presale", "windows sort by start and names are tidied");
  assert(windows.every((window) => Object.keys(window).join() === "name,start,end"), "only name, start and end are kept");
  assert(!JSON.stringify(windows).match(/LOVE|example\.com/), "no code, description or link survives");
  for (const name of ["Fan Presale code LOVE24", "use code LOVE24", "Password LOVE24", "Presale PIN 1234", "tickets.example.com/presale", "Sign up at Example.co"]) {
    assert(!presalesModule.presaleNameSafe(name), `an unpunctuated code or bare link is refused: ${name}`);
  }
  for (const name of ["Citi Cardmember Presale", "Verified Fan Presale", "Live Nation Presale", "Spotify Fans First"]) {
    assert(presalesModule.presaleNameSafe(name), `an ordinary presale name is kept: ${name}`);
  }
  assert(normalizePresaleWindows(null).length === 0 && normalizePresaleWindows("x").length === 0, "non-lists give no windows");
  assert(presalePath("oasis") === "/artists/oasis/presale", "one URL per artist");
}

// ─── part 2: derivation and gate ───────────────────────────────────────────

const ARTIST = { slug: "oasis", name: "Oasis" };

function fixtureEvent({ id, city, venue, iso: when, presales, onsale = "", timezone = "Europe/London", artist = ARTIST, status }) {
  const tm = `https://www.ticketmaster.com/event/${id.toUpperCase()}`;
  return {
    id,
    artist_slug: artist.slug,
    artist_name: artist.name,
    event_name: `${artist.name}: Fixture Tour`,
    city,
    country: "United Kingdom",
    venue,
    datetime_iso: when,
    timezone,
    tour_name: "",
    status: onsale ? "announced" : "on-sale",
    public_onsale_at: onsale,
    ...(presales ? { presales } : {}),
    ...(status ? { ticketmaster_status_code: status } : {}),
    ticketmaster_event_id: id.toUpperCase(),
    ticketmaster_url: tm,
    source_type: "ticketmaster",
    source_url: tm,
    last_verified_at: "2026-10-01",
    provider_links: { ticketmaster: { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-10-01" } },
    verification_status: "human_verified"
  };
}

const SHARED = { name: "Oasis Fan Presale", start: iso(NOW_MS + 2 * DAY), end: iso(NOW_MS + 3 * DAY) };
const OPEN = { name: "Card Presale", start: iso(NOW_MS - DAY), end: iso(NOW_MS + DAY) };
const FAR = { name: "Venue Presale", start: iso(NOW_MS + 45 * DAY), end: iso(NOW_MS + 46 * DAY) };
const EVENTS = [
  fixtureEvent({ id: "ps-man-1", city: "Manchester", venue: "Heaton Park", iso: iso(NOW_MS + 200 * DAY), presales: [OPEN, SHARED], onsale: iso(NOW_MS + 4 * DAY) }),
  fixtureEvent({ id: "ps-man-2", city: "Manchester", venue: "Heaton Park", iso: iso(NOW_MS + 201 * DAY), presales: [SHARED], onsale: iso(NOW_MS + 4 * DAY) }),
  fixtureEvent({ id: "ps-lon-1", city: "London", venue: "Wembley Stadium", iso: iso(NOW_MS + 210 * DAY), presales: [FAR], onsale: iso(NOW_MS + 50 * DAY) }),
  fixtureEvent({ id: "ps-lon-2", city: "London", venue: "Wembley Stadium", iso: iso(NOW_MS + 211 * DAY) }),
  fixtureEvent({ id: "ps-cdf-1", city: "Cardiff", venue: "Principality Stadium", iso: iso(NOW_MS + 220 * DAY) }),
  fixtureEvent({ id: "ps-cdf-2", city: "Cardiff", venue: "Principality Stadium", iso: iso(NOW_MS + 221 * DAY) }),
  // Never listed: a past show and a postponed one.
  fixtureEvent({ id: "ps-past", city: "Dublin", venue: "Croke Park", iso: iso(NOW_MS - DAY), presales: [SHARED] }),
  fixtureEvent({ id: "ps-held", city: "Glasgow", venue: "Hampden Park", iso: iso(NOW_MS + 230 * DAY), presales: [SHARED], status: "postponed" }),
  // Another artist's window.
  fixtureEvent({ id: "other-1", city: "Leeds", venue: "Roundhay Park", iso: iso(NOW_MS + 100 * DAY), presales: [SHARED], artist: { slug: "metallica", name: "Metallica" } })
];

{
  const view = deriveArtistPresales(EVENTS, ARTIST.slug, NOW_MS);
  assert(view.windowCount === 3, "identical windows group across dates; others stay separate");
  const shared = view.windows.find((window) => window.name === SHARED.name);
  assert(shared.shows.map((show) => show.id).join() === "ps-man-1,ps-man-2", "a window lists only this artist's upcoming scheduled dates that carry it");
  assert(view.windows[0].name === OPEN.name && view.windows[0].open, "an open window comes first and is marked open");
  assert(view.openCount === 1 && view.nextWindow?.name === SHARED.name, "the next window is the first not yet open");
  assert(view.coveredShowCount === 3 && view.showCount === 6, "counts cover the dates with windows and every upcoming date");
  assert(view.indexWindowCount === 2, "only windows open or opening within the index window count toward the gate");
  assert(view.publicOnsales.length === 3, "upcoming public on-sales are listed for the same dates");
  assert(view.indexable, "a near presale makes the page indexable");

  const farOnly = deriveArtistPresales([EVENTS[2], EVENTS[3]], ARTIST.slug, NOW_MS);
  assert(farOnly.windowCount === 1 && !farOnly.indexable, "a presale more than 30 days out lists but does not index");
  const STALE = { name: "VIP Packages Onsale", start: iso(NOW_MS - 120 * DAY), end: iso(NOW_MS + 60 * DAY) };
  const staleOnly = deriveArtistPresales([fixtureEvent({ id: "ps-stale", city: "Leeds", venue: "Roundhay Park", iso: iso(NOW_MS + 90 * DAY), presales: [STALE] })], ARTIST.slug, NOW_MS);
  assert(staleOnly.openCount === 1 && staleOnly.indexWindowCount === 0 && !staleOnly.indexable, "a window open for months lists as open but does not index");
  const none = deriveArtistPresales([EVENTS[3]], ARTIST.slug, NOW_MS);
  assert(!none.indexable && none.windowCount === 0, "no presale, no index");
  assert(policy.presalePageGate({ showCount: 0, indexWindowCount: 0 }).reasons.join() === "no_upcoming_shows,no_presale_window", "the gate reports its reasons");

  const calendar = deriveUpcomingPresales(EVENTS, NOW_MS);
  assert(calendar.artistCount === 2 && calendar.windowCount === 4, "/on-sale lists every artist's live windows within the lookahead");
  assert(calendar.artists[0].artistSlug === "oasis", "artists order by their earliest window");

  assert(deriveIndexablePresalePages(EVENTS, ["oasis"], NOW_MS).map((page) => page.path).join() === "/artists/oasis/presale", "only indexable artists' near presales are listed for the sitemap");
  assert(deriveIndexablePresalePages(EVENTS, [], NOW_MS).length === 0, "a non-indexable artist has no listed presale page");
}

// ─── part 3: rendered routes ───────────────────────────────────────────────

const baseAssets = new Map();
for (const file of ["index.html", "data/catalog.json", "data/artists.json", "data/guides-content.json", "data/blog-content.json", "data/provider-configs.json"]) {
  baseAssets.set(`/${file}`, await read(`public/${file}`));
}
baseAssets.set("/", baseAssets.get("/index.html"));

function env(events) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(events));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, events = EVENTS) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: env(events),
    next: () => new Response("static-asset", { status: 200 })
  });
  const html = await response.text();
  return {
    status: response.status,
    html,
    main: (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "",
    robots: (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "",
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ""
  };
}

const text = (html) =>
  String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

{
  const page = await render("/artists/oasis/presale");
  assert(page.status === 200, "the presale page renders");
  assert(page.title.startsWith("Oasis Presale 2026"), "the title names the presale and its year");
  assert(page.title.length <= 60, "the title fits the 60-character budget");
  assert(page.robots.startsWith("index,follow"), "a near presale under an indexable artist page is indexable");
  const body = text(page.main);
  assert(body.includes("Presales open now") && body.includes("Card Presale"), "open windows are listed");
  assert(/The first public on-sale starts [^.]+, for Manchester\./.test(body), "the opening answer names the first public on-sale and its city");
  assert(body.includes("Presales coming up") && body.includes("Oasis Fan Presale") && body.includes("Venue Presale"), "upcoming windows are listed");
  assert(body.includes("Public on-sale"), "public on-sales are listed");
  assert(!body.includes("Dublin") && !body.includes("Glasgow") && !body.includes("Leeds"), "past, held and other artists' dates are not listed");
  assert(!/ticketmaster\.com|\/api\/out/.test(page.main), "with no price on record the page links to no ticket site (priced tables: artist-city-prices.test.mjs)");
  assert(body.includes("no presale code is shown"), "the page says codes are never shown");
  assert(page.html.includes('"@type":"WebPage"') || page.html.includes('"@type": "WebPage"'), "the page carries a WebPage node");
  assert(!page.html.includes('"MusicEvent"'), "the page carries no MusicEvent");
}

{
  const page = await render("/artists/oasis/presale", EVENTS.filter((event) => !event.presales));
  assert(page.status === 200 && page.robots.startsWith("noindex"), "with nothing listed the page renders noindex");
  assert(text(page.main).includes("Ticketmaster lists no upcoming presale"), "with nothing listed the page says so");
}

{
  const page = await render("/artists/not-a-real-artist-xyz/presale");
  assert(page.status === 404, "an unknown artist is a 404");
}

{
  const page = await render("/on-sale");
  const body = text(page.main);
  assert(body.includes("Presales open now or opening soon"), "/on-sale has a presale section");
  assert(page.main.includes('href="/artists/oasis/presale"'), "/on-sale links each artist's presale page");
  assert(!body.includes("Presales aren't listed"), "/on-sale no longer says presales are untracked");
}

{
  const page = await render("/artists/oasis");
  assert(page.main.includes('href="/artists/oasis/presale"'), "the artist page links its presale page while a window is live");
  const quiet = await render("/artists/oasis", EVENTS.filter((event) => !event.presales));
  assert(!quiet.main.includes("/artists/oasis/presale"), "with nothing listed the artist page does not link it");
  const staleWindow = { name: "VIP Packages Onsale", start: iso(NOW_MS - 120 * DAY), end: iso(NOW_MS + 60 * DAY) };
  const stale = await render(
    "/artists/oasis",
    EVENTS.map((event) => (event.presales ? { ...event, presales: [staleWindow] } : event))
  );
  assert(!stale.main.includes("/artists/oasis/presale"), "a window open for months does not earn the artist page's presale-open line");
}

{
  const segments = await sitemapModule.buildSitemapSegments(env(EVENTS), ["artists"], ORIGIN);
  const xml = JSON.stringify(segments);
  assert(xml.includes("/artists/oasis/presale"), "the sitemap lists an indexable presale page");
  const quiet = JSON.stringify(await sitemapModule.buildSitemapSegments(env(EVENTS.filter((event) => !event.presales)), ["artists"], ORIGIN));
  assert(!quiet.includes("/presale"), "the sitemap drops it when nothing is near");
  const newer = EVENTS.map((event) => ({ ...event, last_verified_at: "2099-01-02" }));
  const fresh = (await sitemapModule.buildSitemapSegments(env(newer), ["artists"], ORIGIN)).artists;
  assert(
    fresh.find((entry) => entry.path === "/artists/oasis")?.lastmod === "2099-01-02",
    "an artist page's lastmod follows its newest verified upcoming row"
  );
  const pastOnly = EVENTS.concat([{ ...EVENTS[0], id: "past-row", datetime_iso: "2020-01-01T20:00:00Z", last_verified_at: "2099-01-03" }]);
  const unmoved = (await sitemapModule.buildSitemapSegments(env(pastOnly), ["artists"], ORIGIN)).artists;
  assert(
    unmoved.find((entry) => entry.path === "/artists/oasis")?.lastmod !== "2099-01-03",
    "a re-verified past row the artist page hides does not move its lastmod"
  );
}

{
  const { classifyPageType, PAGE_TYPES } = await load("functions/_funnel.js");
  assert(classifyPageType("/artists/oasis/presale") === "artist_presale" && PAGE_TYPES.includes("artist_presale"), "analytics records the presale page as its own page type");
  const snapshot = await load("scripts/lib/tm-event-snapshot.mjs");
  const projected = snapshot.snapshotFields({ id: "X", sales: { presales: [
    { name: "Fan Presale code: SECRET", startDateTime: "2027-01-01T00:00:00Z", endDateTime: "2027-01-02T00:00:00Z", description: "x" },
    { name: "Card Presale", startDateTime: "2027-01-01T00:00:00Z", endDateTime: "2027-01-02T00:00:00Z", url: "https://example.com" }
  ] } });
  assert(JSON.stringify(projected.sales.presales) === JSON.stringify([{ name: "Card Presale", startDateTime: "2027-01-01T00:00:00Z", endDateTime: "2027-01-02T00:00:00Z" }]), "the shared snapshot never holds a code, description or link");
}

console.log(`presales: ${passed} assertions passed.`);
