#!/usr/bin/env node
//
// Tests for functions/_event-pages.js — event identity (stable key), readable
// slug and future path derivation, key resolution, structural renderability,
// the non-performance classifier and the preview-only indexability signals.
//
// Pure fixture checks first, then invariants over the real events.json, then
// the foundation-only guarantees: nothing in the live router, sitemap or
// llms.txt serves or lists an /events/ URL yet.
//
// Usage: node scripts/event-pages.test.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EVENT_KEY_LENGTH,
  EVENT_PATH_PREFIX,
  EVENT_RESOLUTION,
  EVENT_ROUTE_REASONS,
  EVENT_SLUG_VENUE_MAX,
  EventKeyCollisionError,
  PREVIEW_REASONS,
  RECOGNISER_PREMIUM_SEATS_NAME_RE,
  RECOGNISER_PREMIUM_SEATS_VENUE_SUFFIX,
  RECOGNISER_TRAVEL_PACKAGE_MARKERS,
  assertUniqueEventKeys,
  buildEventKeyIndex,
  deriveEventRouteStates,
  eventIndexSignals,
  eventKey,
  eventPath,
  eventReadableSlug,
  eventRouteState,
  eventSlugPart,
  findEventByKey,
  fnv1a64Hex,
  indexEventsByKey,
  nonPerformanceMarkers,
  parseEventPath,
  possibleDuplicateGroups,
  previewEventIndexability,
  resolveEventPath
} from "../functions/_event-pages.js";
import * as runtimeLocalDate from "../functions/_event-local-date.js";
import * as scriptsLocalDate from "./lib/event-local-date.mjs";
import { resolveEventLocalDate } from "./lib/event-local-date.mjs";
import { loadSiteFixture } from "./lib/route-crawl.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];
const assert = (label, pass) => checks.push({ label, pass: !!pass });
const throwsWith = (fn, ErrorType) => {
  try {
    fn();
    return false;
  } catch (error) {
    return !ErrorType || error instanceof ErrorType;
  }
};

const NOW = Date.parse("2026-09-26T12:00:00Z");
const ARTIST = { slug: "test-artist", indexing_status: "indexable_with_substantial_content" };

// A publishable upcoming show: an evening in Los Angeles, which is already the
// next day in UTC — the case a naive date slice gets wrong.
function show(overrides = {}) {
  return {
    id: "tm-test-artist-2026-los-angeles-abc123",
    artist_slug: "test-artist",
    artist_name: "Test Artist",
    event_name: "Test Artist",
    venue: "Crypto.com Arena",
    city: "Los Angeles",
    country: "United States Of America",
    datetime_iso: "2026-12-20T03:00:00Z",
    timezone: "America/Los_Angeles",
    status: "on-sale",
    verification_status: "machine_high_confidence",
    ticketmaster_url: "https://www.ticketmaster.com/event/ABC123",
    source_url: "https://www.ticketmaster.com/event/ABC123",
    provider_links: {},
    ...overrides
  };
}

// ── Stable key: algorithm ───────────────────────────────────────────────────
// Published FNV-1a 64 test vectors. If these fail, the hash changed and every
// event URL with it.
assert("FNV-1a 64 vector: empty string", fnv1a64Hex("") === "cbf29ce484222325");
assert("FNV-1a 64 vector: \"a\"", fnv1a64Hex("a") === "af63dc4c8601ec8c");
assert("FNV-1a 64 vector: \"foobar\"", fnv1a64Hex("foobar") === "85944171f73967e8");

// Independent BigInt reference, to prove the 16-bit limb arithmetic exactly.
function fnv1a64Reference(value) {
  let hash = 0xcbf29ce484222325n;
  for (const byte of new TextEncoder().encode(value)) {
    hash ^= BigInt(byte);
    hash = (hash * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

// ── Stable key: golden event ids ────────────────────────────────────────────
// Pinned forever: a changed value here means every event URL changed. Covers
// the id shapes in events.json — underscore, trailing hyphen, a legacy id with
// dots, two Ticketmaster ids that differ only by case upstream, and UTF-8.
const GOLDEN_KEYS = [
  ["tm-harry-styles-2027-london-1avoz_3gkn1nb3y", "f4d249862fde1448"],
  ["tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri-", "162f132af022db2c"],
  ["tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html", "c27b98e2cfc32fe4"],
  ["tm-ha-ash-2027-highland-z7r9jz1aavz-m", "61a3f11342e5eab7"],
  ["tm-trivium-2026-atlanta-z7r9jz1aazdby", "45a19cec7c1ceb3d"],
  ["tm-trivium-2026-denver-z7r9jz1aazdby", "3bc4c50970a258c0"],
  ["tm-beyoncé-2027-são-paulo-x", "5234820e541a05ed"]
];
for (const [id, key] of GOLDEN_KEYS) {
  assert(`golden key for ${id}`, eventKey(id) === key);
}
assert("eventKey is deterministic across calls", eventKey(GOLDEN_KEYS[0][0]) === eventKey(`${GOLDEN_KEYS[0][0]}`));
assert("eventKey ignores surrounding whitespace in the id", eventKey(`  ${GOLDEN_KEYS[0][0]} `) === GOLDEN_KEYS[0][1]);
assert("eventKey of an empty id is empty", eventKey("") === "" && eventKey(null) === "");
assert("keys are fixed-length lowercase hex", GOLDEN_KEYS.every(([id]) => new RegExp(`^[0-9a-f]{${EVENT_KEY_LENGTH}}$`).test(eventKey(id))));

// ── Collisions fail closed ──────────────────────────────────────────────────
{
  const a = show({ id: "a-1" });
  const b = show({ id: "b-2" });
  const c = show({ id: "c-3" });
  // A 64-bit collision cannot be produced on demand, so the index is driven
  // with a key function that forces one.
  const forced = indexEventsByKey([a, b, c], (id) => (id === "c-3" ? "0000000000000002" : "0000000000000001"));
  assert("a forced key collision is reported", forced.collisions.get("0000000000000001")?.join(",") === "a-1,b-2");
  assert("a colliding key resolves to neither event", !forced.byKey.has("0000000000000001"));
  assert("an uncontested key still resolves", forced.byKey.get("0000000000000002") === c);

  const duplicated = [show({ id: "dup" }), show({ id: "dup", venue: "Elsewhere" })];
  const dupIndex = buildEventKeyIndex(duplicated);
  assert("a duplicated id is reported", dupIndex.duplicateIds.join(",") === "dup");
  assert("a duplicated id resolves to neither record", findEventByKey(duplicated, eventKey("dup")) === null);
  assert("assertUniqueEventKeys throws on a duplicated id", throwsWith(() => assertUniqueEventKeys(duplicated)));
  assert(
    "EventKeyCollisionError names every colliding id",
    new EventKeyCollisionError([{ key: "k", ids: ["x", "y"] }]).message.includes("x, y")
  );
}

// ── Readable slug and path ──────────────────────────────────────────────────
{
  const event = show();
  const key = eventKey(event.id);
  assert(
    "path is /events/{artist}-{venue}-{city}-{local date}-{key}",
    eventPath(event) === `/events/test-artist-crypto-com-arena-los-angeles-2026-12-19-${key}`
  );
  assert("the URL date is the venue-local date, not the UTC date", !eventPath(event).includes("2026-12-20"));
  assert(
    "a UTC instant without an IANA timezone gets no path (never the UTC date)",
    eventPath(show({ timezone: "" })) === "" && eventReadableSlug(show({ timezone: "" })) === ""
  );
  assert("a date-only record gets no path", eventPath(show({ datetime_iso: "2026-12-20", timezone: "" })) === "");
  assert(
    "a numeric offset states the local date outright",
    eventPath(show({ datetime_iso: "2026-07-01T20:00:00+02:00", timezone: "" })).includes("-2026-07-01-")
  );
  assert("a record with no id gets no path", eventPath(show({ id: "" })) === "");
  assert(
    "the venue does not repeat the city",
    eventReadableSlug(show({ venue: "House of Blues Cleveland", city: "Cleveland" })).startsWith("test-artist-house-of-blues-cleveland-2026")
  );
}

// ── Readable changes never change identity ──────────────────────────────────
{
  const original = show();
  const cases = [
    ["venue change", show({ venue: "Kia Forum", city: "Inglewood" })],
    ["city correction", show({ city: "LA" })],
    ["date change (reschedule)", show({ datetime_iso: "2027-01-15T03:00:00Z" })]
  ];
  for (const [label, changed] of cases) {
    assert(`${label}: same stable key`, eventKey(changed.id) === eventKey(original.id));
    assert(`${label}: different readable path`, eventPath(changed) !== eventPath(original));
    const resolved = resolveEventPath([changed], eventPath(original));
    assert(
      `${label}: the old path resolves to the same event, flagged non-canonical, with the new canonical path`,
      resolved.status === EVENT_RESOLUTION.OK && resolved.event === changed && !resolved.isCanonical && resolved.canonicalPath === eventPath(changed)
    );
  }
  const current = resolveEventPath([original], eventPath(original));
  assert("the current path resolves as canonical", current.status === EVENT_RESOLUTION.OK && current.isCanonical);
  assert("a trailing slash still parses", resolveEventPath([original], `${eventPath(original)}/`).status === EVENT_RESOLUTION.OK);
}

// ── Non-ASCII and long names ────────────────────────────────────────────────
{
  assert("Łódź folds to lodz", eventSlugPart("Łódź") === "lodz");
  assert("Düsseldorf folds to dusseldorf", eventSlugPart("Düsseldorf") === "dusseldorf");
  assert("Estadi Olímpic folds its accent", eventSlugPart("Estadi Olímpic Lluis Companys") === "estadi-olimpic-lluis-companys");
  assert("Théâtre Capitole folds", eventSlugPart("Théâtre Capitole") === "theatre-capitole");
  assert("symbols become separators", eventSlugPart("Levi's® Stadium") === "levi-s-stadium");
  assert("ROSALÍA folds like the artist slugs", eventSlugPart("ROSALÍA") === "rosalia");
  const nonAscii = show({ venue: "Atlas Arena", city: "Łódź", datetime_iso: "2027-01-20T18:00:00Z", timezone: "Europe/Warsaw" });
  assert("a non-ASCII city yields a safe path", /^\/events\/[a-z0-9-]+$/.test(eventPath(nonAscii)) && eventPath(nonAscii).includes("-atlas-arena-lodz-2027-01-20-"));
  assert("non-ASCII derivation is deterministic", eventPath(nonAscii) === eventPath({ ...nonAscii }));

  const longVenue = show({ venue: "The Cynthia Woods Mitchell Pavilion sponsored by Huntsman", city: "The Woodlands" });
  const readable = eventReadableSlug(longVenue);
  const venuePart = readable.slice("test-artist-".length, readable.indexOf("-the-woodlands-"));
  assert("a long venue is cut to the budget", venuePart.length <= EVENT_SLUG_VENUE_MAX);
  assert("a long venue is cut at a word boundary", "the-cynthia-woods-mitchell-pavilion-sponsored-by-huntsman".startsWith(`${venuePart}-`));
  assert("truncation is deterministic", eventReadableSlug(longVenue) === eventReadableSlug({ ...longVenue }));
  assert("truncation never touches the key", eventPath(longVenue).endsWith(`-${eventKey(longVenue.id)}`));
  const connector = show({ venue: "Veterans United Home Loans Amphitheater at Virginia Beach", city: "Virginia Beach" });
  assert("a dangling connector word is dropped", eventReadableSlug(connector).includes("-amphitheater-virginia-beach-"));
}

// ── Parsing and resolution fail closed ──────────────────────────────────────
{
  const a = show();
  const b = show({ id: "tm-other-artist-2026-london-zzz", artist_slug: "other-artist", venue: "The O2", city: "London" });
  const events = [a, b];
  const keyA = eventKey(a.id);
  const unknownKey = "0123456789abcdef";
  assert("an unknown key fails closed", resolveEventPath(events, `/events/test-artist-2026-12-19-${unknownKey}`).status === EVENT_RESOLUTION.UNKNOWN_KEY);
  assert("findEventByKey returns null for an unknown key", findEventByKey(events, unknownKey) === null);
  assert("findEventByKey rejects a malformed key", findEventByKey(events, "ZZZ") === null);
  assert(
    "another artist's readable part cannot resolve this key",
    resolveEventPath(events, `/events/other-artist-the-o2-london-2026-12-19-${keyA}`).status === EVENT_RESOLUTION.ARTIST_MISMATCH
  );
  assert(
    "an artist-slug prefix is not enough (test-artist vs test-artist-two)",
    resolveEventPath([show({ artist_slug: "test-artist-two" })], `/events/test-artist-x-2026-12-19-${keyA}`).status === EVENT_RESOLUTION.ARTIST_MISMATCH
  );
  const malformed = [
    "/events/",
    `/events/${keyA}`,
    `/events/test-artist-${keyA.slice(1)}`,
    `/events/test-artist-${keyA}0`,
    `/events/Test-Artist-${keyA}`,
    `/events/test-artist/${keyA}`,
    `/events/test_artist-${keyA}`,
    `/events/test-artist--${keyA}`,
    `/artists/test-artist-${keyA}`,
    `/events/test-artist-${keyA}?x=1`,
    `/events/test-artist-${keyA.toUpperCase()}`
  ];
  for (const candidate of malformed) {
    assert(`malformed path fails closed: ${candidate}`, parseEventPath(candidate) === null && resolveEventPath(events, candidate).status === EVENT_RESOLUTION.MALFORMED);
  }
  const noDate = show({ timezone: "" });
  const undated = resolveEventPath([noDate], `/events/test-artist-2026-12-20-${eventKey(noDate.id)}`);
  assert("a resolved event with no local date has no canonical path", undated.status === EVENT_RESOLUTION.NO_CANONICAL_PATH && undated.canonicalPath === "");
}

// ── Structural renderability ────────────────────────────────────────────────
{
  const ok = eventRouteState(show(), { artist: ARTIST, now: NOW });
  assert("a publishable upcoming show on an indexable artist is renderable", ok.renderable && ok.reasons.length === 0);
  assert("its state carries the path and local date", ok.path === eventPath(show()) && ok.localDate === "2026-12-19");
  const reasonsFor = (event, artist = ARTIST) => eventRouteState(event, { artist, now: NOW }).reasons;
  assert("a shell artist is not renderable", reasonsFor(show(), { ...ARTIST, indexing_status: "review_required" }).includes(EVENT_ROUTE_REASONS.ARTIST_NOT_EDITORIALLY_INDEXABLE));
  assert("an unknown artist is not renderable", eventRouteState(show(), { now: NOW }).reasons.includes(EVENT_ROUTE_REASONS.ARTIST_NOT_EDITORIALLY_INDEXABLE));
  assert("a past show is not renderable", reasonsFor(show({ datetime_iso: "2026-01-10T03:00:00Z" })).includes(EVENT_ROUTE_REASONS.NOT_UPCOMING));
  assert("an unresolved local date is not renderable", reasonsFor(show({ timezone: "" })).includes(EVENT_ROUTE_REASONS.LOCAL_DATE_UNRESOLVED));
  assert("a missing venue is not renderable", reasonsFor(show({ venue: "" })).includes(EVENT_ROUTE_REASONS.MISSING_VENUE_OR_CITY));
  assert(
    "a show with nowhere to send a visitor is not renderable",
    reasonsFor(show({ ticketmaster_url: "", source_url: "" })).includes(EVENT_ROUTE_REASONS.NO_PUBLISHABLE_DESTINATION)
  );
  assert(
    "a verified resale link alone makes a show renderable (same rule as the artist-city gate)",
    eventRouteState(show({ ticketmaster_url: "", source_url: "", provider_links: { "vivid-seats": { verified: true, url: "https://www.vividseats.com/x/production/1" } } }), { artist: ARTIST, now: NOW }).renderable
  );
  assert("a missing id is reported", reasonsFor(show({ id: "" })).includes(EVENT_ROUTE_REASONS.MISSING_ID));
}

// ── Non-performance classifier ──────────────────────────────────────────────
{
  const flagged = (overrides) => nonPerformanceMarkers(show(overrides)).length > 0;
  assert("\"Venue Premium Packages\" is flagged (recogniser marker)", flagged({ event_name: "Olivia Rodrigo | Venue Premium Packages" }));
  assert("\"| Premium Seats\" is flagged (recogniser marker)", flagged({ event_name: "Passenger | Premium Seats" }));
  assert("a Loge venue is flagged (recogniser marker)", flagged({ venue: "AFAS Live Loge" }));
  assert("a travel package in the URL is flagged (recogniser haystack)", flagged({ ticketmaster_url: "https://www.ticketmaster.com/raye-hotel-package/event/X" }));
  assert("\"| Box seat in the Ticketmaster Suite\" is flagged", flagged({ event_name: "Five Finger Death Punch | Box seat in the Ticketmaster Suite" }));
  assert("\"(Event Ticket Not Included)\" is flagged", flagged({ event_name: "Latto VIP Upgrades (Event Ticket Not Included)" }));
  assert("a plain concert is not flagged", !flagged({}));
  assert("a Lounge venue is not flagged", !flagged({ venue: "The Rebel Lounge" }));
  assert("\"Venue Premium Tickets\" admits to the show and is not flagged", !flagged({ event_name: "The Warning - Venue Premium Tickets" }));
  assert("a tour called Premium is not flagged", !flagged({ event_name: "RAYE: Premium Tour" }));
  assert("\"Box seat\" outside a name segment is not flagged", !flagged({ event_name: "Box Seat Records Showcase" }));
  assert("non-performance does not change structural renderability", eventRouteState(show({ event_name: "X | Premium Seats" }), { artist: ARTIST, now: NOW }).renderable);

  // The first three markers are the new-show recogniser's own; they must not
  // drift from scripts/sync-ticketmaster-events.py.
  const python = fs.readFileSync(path.join(ROOT, "scripts/sync-ticketmaster-events.py"), "utf8");
  const tuple = python.match(/^TRAVEL_PACKAGE_MARKERS = \(([^)]*)\)/m)?.[1] || "";
  const pyMarkers = [...tuple.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  assert("travel/package markers match the recogniser", pyMarkers.join(",") === RECOGNISER_TRAVEL_PACKAGE_MARKERS.join(","));
  const pyRe = python.match(/^PREMIUM_SEATS_NAME_RE = re\.compile\(r"([^"]+)", re\.IGNORECASE\)/m)?.[1] || "";
  assert("premium-seats pattern matches the recogniser", pyRe === RECOGNISER_PREMIUM_SEATS_NAME_RE.source && RECOGNISER_PREMIUM_SEATS_NAME_RE.flags === "i");
  const pySuffix = python.match(/^PREMIUM_SEATS_VENUE_SUFFIX = "([^"]*)"/m)?.[1];
  assert("loge venue suffix matches the recogniser", pySuffix === RECOGNISER_PREMIUM_SEATS_VENUE_SUFFIX);
}

// ── Preview-only indexability signals ───────────────────────────────────────
{
  const priced = show({ provider_links: { "vivid-seats": { verified: true, url: "https://www.vividseats.com/x/production/1" } } });
  const state = eventRouteState(priced, { artist: ARTIST, now: NOW });
  const twoLanes = eventIndexSignals(priced, { publishableLanes: ["vivid-seats", "ticketmaster"], now: NOW });
  assert("signals count the lanes supplied by the caller", twoLanes.publishableDestinations === 2);
  assert("a verified Vivid Seats link is snapshot-ready", twoLanes.snapshotReadyLanes.join(",") === "vivid-seats");
  assert("two lanes plus a snapshot-ready lane would qualify", previewEventIndexability(state, twoLanes, { artistPageIndexable: true }).wouldQualify);
  const oneLane = eventIndexSignals(priced, { publishableLanes: ["vivid-seats"], now: NOW });
  assert("one lane is below the preview threshold", previewEventIndexability(state, oneLane, { artistPageIndexable: true }).reasons.includes(PREVIEW_REASONS.BELOW_DESTINATION_THRESHOLD));
  const seatgeekOnly = eventIndexSignals(show({ provider_links: { seatgeek: { verified: true, url: "https://seatgeek.com/x" } } }), { publishableLanes: ["seatgeek", "ticketmaster"], now: NOW });
  assert("SeatGeek is never snapshot-ready", seatgeekOnly.snapshotReadyLanes.length === 0);
  assert("a noindex parent artist blocks the preview", previewEventIndexability(state, twoLanes, { artistPageIndexable: false }).reasons.includes(PREVIEW_REASONS.PARENT_ARTIST_NOT_INDEXABLE));
  const upsell = eventRouteState({ ...priced, event_name: "X | Premium Seats" }, { artist: ARTIST, now: NOW });
  assert("a non-performance listing never qualifies", previewEventIndexability(upsell, twoLanes, { artistPageIndexable: true }).reasons.includes(PREVIEW_REASONS.NON_PERFORMANCE_LISTING));
}

// ── Possible duplicate groups ───────────────────────────────────────────────
{
  const events = [
    show({ id: "main", venue: "Ziggo Dome", city: "Amsterdam", datetime_iso: "2027-03-23T18:00:00Z", timezone: "Europe/Amsterdam" }),
    show({ id: "club", venue: "Ziggo Dome Club", city: "Amsterdam", datetime_iso: "2027-03-23T19:01:00Z", timezone: "Europe/Amsterdam" }),
    show({ id: "next", venue: "Ziggo Dome", city: "Amsterdam", datetime_iso: "2027-03-24T18:00:00Z", timezone: "Europe/Amsterdam" })
  ];
  const groups = possibleDuplicateGroups(deriveEventRouteStates(events, [ARTIST], { now: NOW }), events);
  assert("same artist, city and local date is reported once", groups.length === 1 && groups[0].ids.join(",") === "main,club");
}

// ── Local-date consumers are unchanged ──────────────────────────────────────
{
  const runtimeNames = Object.keys(runtimeLocalDate).sort();
  const scriptNames = Object.keys(scriptsLocalDate).sort();
  assert("scripts/lib/event-local-date.mjs re-exports every runtime export", runtimeNames.join(",") === scriptNames.join(","));
  assert(
    "the re-export is the same implementation, not a copy",
    runtimeNames.every((name) => runtimeLocalDate[name] === scriptsLocalDate[name])
  );
}

// ── Invariants over the real dataset ────────────────────────────────────────
const events = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/events.json"), "utf8"));
const artists = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/artists.json"), "utf8"));
{
  assert("every current event has a unique stable key", !throwsWith(() => assertUniqueEventKeys(events)));
  assert("the limb hash equals the BigInt reference for every current id", events.every((event) => fnv1a64Hex(String(event.id).trim()) === fnv1a64Reference(String(event.id).trim())));
  const index = buildEventKeyIndex(events);
  assert("every current event resolves by its own key", index.byKey.size === events.length && events.every((event) => findEventByKey(events, eventKey(event.id)) === event));

  const states = deriveEventRouteStates(events, artists);
  const upcoming = states.filter((state) => state.upcoming);
  const renderable = states.filter((state) => state.renderable);
  const withPath = states.filter((state) => state.path);
  assert("every renderable event has a path", renderable.every((state) => state.path));
  assert("every path resolves back to its own event as canonical", withPath.every((state, i) => {
    const resolved = resolveEventPath(events, state.path);
    return resolved.status === EVENT_RESOLUTION.OK && resolved.isCanonical && String(resolved.event.id).trim() === state.id;
  }));
  assert("paths are unique", new Set(withPath.map((state) => state.path)).size === withPath.length);
  const byId = new Map(events.map((event) => [String(event.id).trim(), event]));
  assert("every path carries the strict venue-local date", withPath.every((state) => state.path.endsWith(`-${resolveEventLocalDate(byId.get(state.id)).iso}-${state.key}`)));
  const utcDiffers = withPath.filter((state) => String(byId.get(state.id).datetime_iso).slice(0, 10) !== state.localDate);
  assert("the dataset exercises UTC-vs-local date differences", utcDiffers.length > 0);
  assert("every path is lowercase ASCII", withPath.every((state) => /^\/events\/[a-z0-9-]+$/.test(state.path)));

  const readableCollisions = new Map();
  for (const state of withPath) {
    const readable = state.path.slice(EVENT_PATH_PREFIX.length, -(EVENT_KEY_LENGTH + 1));
    readableCollisions.set(readable, (readableCollisions.get(readable) || 0) + 1);
  }
  const sharedReadable = [...readableCollisions.values()].filter((count) => count > 1).length;
  console.log(
    `dataset: ${events.length} events · ${index.byKey.size} unique keys · 0 key collisions · ` +
      `${withPath.length} with a path (${events.length - withPath.length} unresolved local date) · ` +
      `${upcoming.length} upcoming · ${renderable.length} renderable · ` +
      `${utcDiffers.length} whose UTC date differs from the venue-local date · ` +
      `${sharedReadable} readable slugs shared by more than one event (disambiguated by key)\n`
  );
}

// ── Foundation only: nothing serves or lists an event route yet ─────────────
// These assert this PR's scope. The PR that adds the route replaces them.
{
  const site = await loadSiteFixture(ROOT);
  const sample = deriveEventRouteStates(events, artists).find((state) => state.renderable);
  const rendered = await site.renderRoute(sample.path);
  assert("a derived event path is still a real 404 on the live router", rendered.status === 404 && /noindex/.test(rendered.html));
  const sitemap = await site.modules.sitemapModule.onRequestGet({ request: new Request("https://tourticketcompare.com/sitemap.xml"), env: site.env });
  assert("the sitemap lists no /events/ URL", sitemap.status === 200 && !(await sitemap.text()).includes("/events/"));
  const { onRequestGet: llms } = await import("../functions/llms.txt.js");
  const llmsText = await (await llms({ request: new Request("https://tourticketcompare.com/llms.txt"), env: site.env })).text();
  assert("llms.txt lists no /events/ URL", llmsText.length > 0 && !llmsText.includes("/events/"));
  const importers = fs
    .readdirSync(path.join(ROOT, "functions"), { recursive: true })
    .filter((file) => String(file).endsWith(".js") && !String(file).endsWith("_event-pages.js"))
    .filter((file) => /(?:from|import)\s*\(?\s*["'][^"']*_event-pages\.js["']/.test(fs.readFileSync(path.join(ROOT, "functions", String(file)), "utf8")));
  assert("no runtime module imports the event identity module yet", importers.length === 0);
}

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
