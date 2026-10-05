#!/usr/bin/env node
// Metadata and structured-data accuracy audit.
//
// Renders every indexable route, plus every served event page, through the real
// middleware (scripts/lib/route-crawl.mjs) and checks what the page tells a
// search engine against the reviewed events.json records it was built from:
//
//   - MusicEvent fields: every node resolves to one tracked event (by its
//     `#show-<id>` url or its canonical event-page url) and its name, startDate,
//     venue, city and eventStatus agree with that record. A node for an event
//     that is past, held on a board, or not in the data is a failure.
//   - Titles and descriptions: present; every year they name is a year one of
//     the page's own upcoming dates falls in; every "N upcoming shows" /
//     "N artists" / "N venues" count matches the page's derived record; a
//     price-comparison claim appears only on a page that can show one (a date
//     with at least two listed-price lanes, COMPARISON_MIN_PRICE_PROVIDERS).
//   - Duplicates: no two indexable pages share a title or a meta description.
//
// Read-only: no network, no writes. `--check` exits non-zero on any failure;
// without it the findings are printed and the exit code is 0. `--json` prints
// the findings as JSON.
//
//   npm run audit:metadata-accuracy
//   npm run audit:metadata-accuracy:check

import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadSiteFixture, crawlRoutes } from "./lib/route-crawl.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const CHECK = args.has("--check");
const JSON_OUT = args.has("--json");

const fixture = await loadSiteFixture(ROOT);
const { events, artistsMeta, catalog } = fixture.data;
const { policyModule, artistCitiesModule, eventPagesModule, citiesModule } = fixture.modules;
const now = Date.now();

const findings = [];
const fail = (page, check, detail) => findings.push({ page, check, detail });

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

const eventsById = new Map(events.map((event) => [String(event.id || "").trim(), event]));
// Board nodes identify a show by its card anchor, `#show-<slugified id>`
// (showAnchorId in functions/[[path]].js).
const eventsByAnchor = new Map(events.map((event) => [citiesModule.slugify(event.id), event]));
const artistNames = new Map();
for (const artist of [...(catalog.artists || []), ...artistsMeta]) {
  if (artist?.slug && artist?.name && !artistNames.has(artist.slug)) artistNames.set(artist.slug, artist.name);
}
const eventIdByPath = new Map();
for (const state of eventPagesModule.deriveEventRouteStates(events, artistsMeta, { now })) {
  if (state.path) eventIdByPath.set(state.path, state.id);
}

const instant = (event) => Date.parse(String(event?.dateTimeISO || event?.datetime_iso || ""));
const upcoming = (event) => Number.isFinite(instant(event)) && instant(event) >= now;

function localYear(event) {
  const iso = String(event?.dateTimeISO || event?.datetime_iso || "");
  const tz = String(event?.timezone || "").trim();
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return null;
  if (tz) {
    try {
      return Number(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric" }).format(new Date(ms)));
    } catch {
      // Unknown zone: fall through to the record's own written date.
    }
  }
  return Number(iso.slice(0, 4));
}

const fold = (value) =>
  String(value || "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/^the /, "")
    .trim();

const EXPECTED_STATUS = {
  scheduled: "https://schema.org/EventScheduled",
  rescheduled: "https://schema.org/EventRescheduled",
  cancelled: "https://schema.org/EventCancelled",
  postponed: "https://schema.org/EventPostponed"
};

// ---------------------------------------------------------------------------
// Per-route context: the upcoming events each page is built from, and the
// counts its metadata may state.
// ---------------------------------------------------------------------------

const contexts = new Map();
const add = (pathname, context) => contexts.set(pathname, context);
const byIds = (ids) => ids.map((id) => eventsById.get(id)).filter(Boolean);

for (const city of fixture.cities) {
  add(`/cities/${city.slug}`, {
    type: "city",
    events: byIds(city.shows.map((show) => show.id)),
    counts: { show: city.showCount, artist: city.artistCount, venue: city.venueCount }
  });
}
for (const venue of fixture.venues) {
  add(`/venues/${venue.slug}`, {
    type: "venue",
    events: byIds(venue.shows.map((show) => show.id)),
    counts: { show: venue.showCount, artist: venue.artistCount }
  });
}
const artistCityRecords = new Map();
for (const slug of new Set(fixture.artistCityEntries.map((entry) => entry.artistSlug))) {
  for (const record of artistCitiesModule.deriveArtistCities(events, slug, { now })) {
    artistCityRecords.set(`/artists/${slug}/tickets/${record.slug}`, record);
  }
}
for (const entry of fixture.artistCityEntries) {
  const record = artistCityRecords.get(entry.path);
  add(entry.path, {
    type: "artist-city",
    events: byIds((record?.shows || []).map((show) => show.id)),
    counts: { show: entry.showCount }
  });
}
for (const pathname of fixture.paths.artistPaths) {
  const slug = pathname.split("/")[2];
  add(pathname, { type: "artist", events: events.filter((event) => event.artist_slug === slug), allowPastYears: true });
}
for (const entry of fixture.priceGuideEntries) {
  add(entry.path, { type: "price-guide", events: events.filter((event) => event.artist_slug === entry.artistSlug) });
}
for (const pathname of fixture.paths.eventPaths) {
  const event = eventsById.get(eventIdByPath.get(pathname));
  add(pathname, { type: "event", events: event ? [event] : [] });
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function jsonLdNodes(html) {
  const nodes = [];
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let parsed;
    try {
      parsed = JSON.parse(match[1]);
    } catch {
      continue;
    }
    const stack = [parsed];
    while (stack.length) {
      const node = stack.pop();
      if (Array.isArray(node)) stack.push(...node);
      else if (node && typeof node === "object") {
        nodes.push(node);
        for (const value of Object.values(node)) if (value && typeof value === "object") stack.push(value);
      }
    }
  }
  return nodes;
}

function eventForNode(node) {
  for (const raw of [node["@id"], node.url]) {
    const value = String(raw || "");
    const show = value.match(/#show-(.+)$/);
    if (show) return eventsByAnchor.get(decodeURIComponent(show[1])) || null;
    try {
      const id = eventIdByPath.get(new URL(value).pathname);
      if (id) return eventsById.get(id) || null;
    } catch {
      // not a URL
    }
  }
  return null;
}

function checkMusicEvent(page, node, context) {
  const label = `MusicEvent ${node["@id"] || node.url || node.name}`;
  const event = eventForNode(node);
  if (!event) return fail(page, "music-event:unresolved", `${label} names no tracked event`);
  if (!upcoming(event)) fail(page, "music-event:past", `${label} describes a past date (${event.datetime_iso})`);

  const artist = artistNames.get(event.artist_slug) || event.artist_name || "";
  if (artist && !fold(node.name).includes(fold(artist))) {
    fail(page, "music-event:name", `${label} name "${node.name}" does not name the artist "${artist}"`);
  }

  const start = String(node.startDate || "");
  if (/T/.test(start)) {
    if (Date.parse(start) !== instant(event)) fail(page, "music-event:date", `${label} startDate ${start} != record ${event.datetime_iso}`);
  } else {
    const localDate = eventPagesModule.deriveEventRouteStates([event], artistsMeta, { now })[0]?.localDate;
    if (start !== localDate) fail(page, "music-event:date", `${label} startDate ${start} != venue-local date ${localDate}`);
  }

  if (node.location?.name !== String(event.venue || "").trim()) {
    fail(page, "music-event:venue", `${label} location "${node.location?.name}" != record venue "${event.venue}"`);
  }
  if (node.location?.address?.addressLocality !== String(event.city || "").trim()) {
    fail(page, "music-event:city", `${label} locality "${node.location?.address?.addressLocality}" != record city "${event.city}"`);
  }

  const lifecycle = policyModule.eventLifecycle(event);
  const expected = EXPECTED_STATUS[lifecycle];
  if (!expected) fail(page, "music-event:status", `${label} emitted for an unrecognised Ticketmaster status`);
  else if (node.eventStatus !== expected) fail(page, "music-event:status", `${label} eventStatus ${node.eventStatus} != ${expected} (${lifecycle})`);
  if (context.type !== "event" && policyModule.eventLifecycleHeld(event)) {
    fail(page, "music-event:held", `${label} emitted on a board for a ${lifecycle} date`);
  }
}

const COUNT_PATTERNS = [
  { key: "show", regex: /\b(\d+) (?:reviewed )?upcoming (?:shows?|concerts?|dates?)\b/gi },
  { key: "artist", regex: /\b(\d+) artists?\b/gi },
  { key: "venue", regex: /\b(\d+) venues?\b/gi }
];
const PRICE_CLAIM = /\bcompare (?:current )?(?:listed )?(?:ticket )?prices\b|\| (?:compare )?prices\b/i;

function checkText(page, field, text, context) {
  if (!text) return fail(page, `${field}:missing`, `no ${field}`);

  const years = context.events.filter((event) => context.allowPastYears || upcoming(event)).map(localYear).filter(Boolean);
  for (const match of text.matchAll(/\b(20\d\d)\b/g)) {
    const year = Number(match[1]);
    if (!years.includes(year)) fail(page, `${field}:year`, `${field} names ${year}; the page's dates fall in ${[...new Set(years)].sort().join(", ") || "no year"}`);
  }

  for (const { key, regex } of COUNT_PATTERNS) {
    const expected = context.counts?.[key];
    if (expected == null) continue;
    for (const match of text.matchAll(regex)) {
      if (Number(match[1]) !== expected) fail(page, `${field}:count`, `${field} says "${match[0]}"; the record has ${expected}`);
    }
  }

  if (PRICE_CLAIM.test(text)) {
    const comparable = context.events.filter((event) => upcoming(event) && policyModule.eventPriceComparable(event, now)).length;
    if (comparable < 1) fail(page, `${field}:price-claim`, `${field} promises a price comparison; no date on the page has ${policyModule.COMPARISON_MIN_PRICE_PROVIDERS} listed-price lanes`);
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const paths = [...new Set([...fixture.paths.allPaths, ...fixture.paths.eventPaths])];
const jsonLd = new Map();
const pages = await crawlRoutes(paths, async (pathname) => {
  const rendered = await fixture.renderRoute(pathname);
  if (rendered.status === 200) jsonLd.set(pathname, jsonLdNodes(rendered.html));
  return rendered;
});

const indexable = [...pages.values()].filter((page) => page.indexable);
const audited = [...pages.values()].filter((page) => page.status === 200 && (page.indexable || contexts.get(page.path)?.type === "event"));

let musicEvents = 0;
for (const page of audited) {
  const context = contexts.get(page.path);
  if (context) {
    checkText(page.path, "title", page.title, context);
    checkText(page.path, "description", page.description, context);
  }
  for (const node of jsonLd.get(page.path) || []) {
    if (node["@type"] !== "MusicEvent") continue;
    musicEvents += 1;
    checkMusicEvent(page.path, node, context || { type: "other", events: [] });
  }
}

for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const page of indexable) {
    const value = page[field];
    if (!value) continue;
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(page.path);
  }
  for (const [value, owners] of seen) {
    if (owners.length > 1) fail(owners.join(" + "), `${field}:duplicate`, `${owners.length} indexable pages share the ${field} "${value}"`);
  }
}

const summary = {
  pages_audited: audited.length,
  indexable_pages: indexable.length,
  event_pages: audited.filter((page) => contexts.get(page.path)?.type === "event").length,
  music_event_nodes: musicEvents,
  findings: findings.length,
  by_check: Object.fromEntries(
    [...findings.reduce((map, finding) => map.set(finding.check, (map.get(finding.check) || 0) + 1), new Map())].sort()
  )
};

if (JSON_OUT) {
  console.log(JSON.stringify({ summary, findings }, null, 2));
} else {
  console.log(`Metadata accuracy: ${summary.pages_audited} pages (${summary.indexable_pages} indexable, ${summary.event_pages} event pages), ${summary.music_event_nodes} MusicEvent nodes.`);
  if (!findings.length) console.log("No findings.");
  for (const finding of findings) console.log(`- [${finding.check}] ${finding.page}: ${finding.detail}`);
}

if (CHECK && findings.length) process.exit(1);
