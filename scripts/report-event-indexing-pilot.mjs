#!/usr/bin/env node
//
// Read-only measurement report for the frozen event-page indexing pilot
// ("event-page-indexing-pilot-1"): how are the 30 pilot pages doing?
//
// The experimental population comes ONLY from data/event-indexing-pilot.json —
// never from today's eligibility, so the cohort can shrink (a member stops
// being indexed) but can never gain a member. For each member the report keeps
// the facts frozen in that record (launch_*) apart from what the repo says now
// (current_*): current_* is never written back over launch_*.
//
// Inputs, all read-only:
//   data/event-indexing-pilot.json   the frozen cohort and launch_date (required)
//   public/data/{events,artists,catalog}.json, wrangler.toml [vars]
//                                    current runtime state, through the same
//                                    policy the router, sitemap and llms.txt use
//                                    (deriveEventIndexingPilot)
//   reports/analytics/route-traffic.json (optional; --route-traffic <file>)
//                                    TTC page views and outbound clicks per
//                                    route, exported from D1 by
//                                    npm run report:funnel -- --route-traffic <file>
//   --search-console <file>          (optional) a Google Search Console export,
//                                    CSV or JSON, rows keyed by page URL
//   --live                           (optional) GET each pilot page from
//                                    production to record page-template facts
//                                    (prices, freshness, 30-day low, movement)
//                                    that exist only at render time
//
// Writes nothing: no file, no D1, no robots, sitemap, structured data,
// analytics or Search Console state, and it never changes pilot membership.
// Descriptive only — no score, no pass/fail, no rollout decision.
//
// Usage:
//   npm run report:event-indexing-pilot
//   npm run report:event-indexing-pilot -- --json
//   npm run report:event-indexing-pilot -- --search-console gsc.csv --search-console-period 2026-09-27..2026-10-25
//   npm run report:event-indexing-pilot -- --route-traffic reports/analytics/route-traffic.json --live

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EVENT_ROUTE_ACTION, eventKey, parseEventPath, resolveEventRoute } from "../functions/_event-pages.js";
import { EVENT_INDEXING_PILOT_KEYS, deriveEventIndexingPilot, eventArtistCityRelation } from "../functions/_event-indexability.js";
import { providerConfiguredTest, publishableLaneSlugs } from "./lib/event-link-coverage.mjs";
import { wranglerVars } from "./lib/event-indexability-audit.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const PILOT_RECORD_PATH = "data/event-indexing-pilot.json";
export const DEFAULT_ROUTE_TRAFFIC_PATH = "reports/analytics/route-traffic.json";
export const CANONICAL_ORIGIN = "https://tourticketcompare.com";
const CANONICAL_HOSTS = new Set(["tourticketcompare.com", "www.tourticketcompare.com"]);
const DAY_MS = 86400000;
// Below this many page views an outbound rate is arithmetic, not evidence
// (the same floor as report:commercial-funnel's DEFAULT_MIN_VIEWS_FOR_RATE).
const MIN_VIEWS_FOR_RATE = 30;
const EXAMPLES_PER_GROUP = 5;

// Non-binding checkpoints for a human reading the report. Nothing reads these
// to change rollout state; they only say what to look at, when.
export const CHECKPOINTS = Object.freeze([
  Object.freeze({ day: 14, label: "~2 weeks", look_for: "discovery, crawling and indexing of the pilot URLs; first impressions" }),
  Object.freeze({ day: 28, label: "~4 weeks", look_for: "growing impressions, query diversity, some pages entering the top 50 / top 20" }),
  Object.freeze({ day: 42, until: 56, label: "6–8 weeks", look_for: "whether enough pages earn meaningful exact-event visibility to justify a larger, separately reviewed rollout" })
]);

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

export function parseArgs(argv) {
  const options = { json: false, help: false, live: false, baseUrl: CANONICAL_ORIGIN, searchConsole: "", searchConsolePeriod: "", routeTraffic: "" };
  const value = (flag, index) => {
    const next = argv[index];
    if (!next || next.startsWith("--")) throw new Error(`${flag} requires a value`);
    return next;
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") options.json = true;
    else if (arg === "--live") options.live = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (arg === "--search-console") options.searchConsole = value(arg, ++i);
    else if (arg === "--search-console-period") options.searchConsolePeriod = value(arg, ++i);
    else if (arg === "--route-traffic") options.routeTraffic = value(arg, ++i);
    else if (arg === "--base-url") options.baseUrl = value(arg, ++i).replace(/\/+$/, "");
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.searchConsolePeriod && !parsePeriod(options.searchConsolePeriod)) {
    throw new Error("--search-console-period must be YYYY-MM-DD..YYYY-MM-DD");
  }
  return options;
}

function usage() {
  return `Usage: npm run report:event-indexing-pilot [-- options]

Read-only measurement report for the frozen 30-page event indexing pilot
(${PILOT_RECORD_PATH}). Writes nothing and never changes pilot membership.

Options:
  --json                          Machine-readable report
  --search-console <file>         Search Console export (CSV or JSON) with a page
                                  column and clicks/impressions/position; a query
                                  column enables query classification
  --search-console-period <a..b>  Measurement period of that export, YYYY-MM-DD..YYYY-MM-DD
  --route-traffic <file>          TTC route traffic export (default ${DEFAULT_ROUTE_TRAFFIC_PATH},
                                  written by npm run report:funnel -- --route-traffic <file>)
  --live                          GET each pilot page from production and record
                                  page-template facts (read-only HTTP GETs)
  --base-url <url>                Origin for --live (default ${CANONICAL_ORIGIN})

Reference: docs/ROUTE_INDEXABILITY_POLICY.md → "Measuring the pilot"`;
}

// ---------------------------------------------------------------------------
// The frozen record
// ---------------------------------------------------------------------------

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** A YYYY-MM-DD string naming a real calendar date, as UTC-midnight ms; else null. */
export function parseIsoDate(value) {
  const match = ISO_DATE_RE.exec(String(value ?? ""));
  if (!match) return null;
  const ms = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Date(ms).toISOString().slice(0, 10) === match[0] ? ms : null;
}

/** The record's launch date, or null when it is not a real YYYY-MM-DD date. */
export function parseLaunchDate(record) {
  const ms = parseIsoDate(record?.launch_date);
  return ms === null ? null : { date: String(record.launch_date), ms };
}

export function parsePeriod(text) {
  const match = /^(\d{4}-\d{2}-\d{2})\.\.(\d{4}-\d{2}-\d{2})$/.exec(String(text ?? "").trim());
  if (!match || parseIsoDate(match[1]) === null || parseIsoDate(match[2]) === null || match[1] > match[2]) return null;
  return { start: match[1], end: match[2] };
}

/** Whole calendar days from `fromDate` (YYYY-MM-DD) to the UTC day holding `nowMs`. */
export function daysSince(fromDate, nowMs) {
  const from = parseIsoDate(fromDate);
  if (from === null) return null;
  const today = Date.UTC(new Date(nowMs).getUTCFullYear(), new Date(nowMs).getUTCMonth(), new Date(nowMs).getUTCDate());
  return Math.round((today - from) / DAY_MS);
}

/**
 * The experimental population: the record's members, validated and copied.
 * Throws on anything that would make the cohort ambiguous — the report never
 * guesses a member.
 */
export function cohortFromRecord(record) {
  const members = Array.isArray(record?.members) ? record.members : null;
  if (!members || members.length === 0) throw new Error(`${PILOT_RECORD_PATH}: no members`);
  const seen = new Set();
  return Object.freeze(
    members.map((member, index) => {
      const key = String(member?.key ?? "");
      if (!/^[0-9a-f]{16}$/.test(key)) throw new Error(`${PILOT_RECORD_PATH}: member ${index} has no 16-hex key`);
      if (seen.has(key)) throw new Error(`${PILOT_RECORD_PATH}: duplicate key ${key}`);
      seen.add(key);
      if (eventKey(member.event_id) !== key) throw new Error(`${PILOT_RECORD_PATH}: member ${key} key is not eventKey(event_id)`);
      if (!String(member.canonical_path || "").endsWith(`-${key}`)) throw new Error(`${PILOT_RECORD_PATH}: member ${key} canonical_path does not end in its key`);
      return Object.freeze({ ...member, destination_lanes: Object.freeze([...(member.destination_lanes || [])]) });
    })
  );
}

// ---------------------------------------------------------------------------
// Current runtime state
// ---------------------------------------------------------------------------

const HTTP_BY_ACTION = { [EVENT_ROUTE_ACTION.RENDER]: 200, [EVENT_ROUTE_ACTION.REDIRECT]: 301, [EVENT_ROUTE_ACTION.NOT_FOUND]: 404 };
const localDateOfPath = (pathname) => (/-(\d{4}-\d{2}-\d{2})-[0-9a-f]{16}$/.exec(String(pathname || "")) || [])[1] || "";

/**
 * Current state for every cohort member, evaluated for exactly the cohort's
 * keys through deriveEventIndexingPilot (the function the router, sitemap and
 * llms.txt read), on the canonical host with the repo-managed flag.
 */
export function currentStates(cohort, { events, artists, catalog, vars, now }) {
  const isConfigured = providerConfiguredTest(catalog);
  const lanesFor = (event) => publishableLaneSlugs(event, isConfigured, now);
  const pilot = deriveEventIndexingPilot(events, artists, vars, { hostIndexable: true, lanesFor, now, pilotKeys: cohort.map((member) => member.key) });
  const byKey = new Map(pilot.members.map((entry) => [entry.key, entry]));
  const upcomingByArtist = new Map();
  for (const event of events) {
    if (Date.parse(event?.datetime_iso || "") > now) upcomingByArtist.set(event.artist_slug, (upcomingByArtist.get(event.artist_slug) || 0) + 1);
  }
  return new Map(
    cohort.map((member) => {
      const entry = byKey.get(member.key);
      const decision = entry?.decision || null;
      const event = entry?.event || null;
      const launchRoute = resolveEventRoute(events, artists, member.canonical_path, { now });
      const currentPath = decision?.path || "";
      const localDate = localDateOfPath(currentPath) || member.local_date;
      const lanes = decision?.inputs.publishableLanes || [];
      const state = {
        exists: Boolean(event),
        current_canonical_path: currentPath,
        canonical_path_changed: Boolean(currentPath) && currentPath !== member.canonical_path,
        current_local_date: localDateOfPath(currentPath),
        route_action: decision ? decision.inputs.routeAction : EVENT_ROUTE_ACTION.NOT_FOUND,
        route_reason: decision ? decision.inputs.routeReason : "unknown_key",
        // What the router's pure decision answers for the URL Google was given
        // at launch. Derived offline; --live observes the deployed response.
        launch_url_http: HTTP_BY_ACTION[launchRoute.action] || null,
        launch_url_location: launchRoute.location || "",
        eligible: Boolean(decision?.eligible),
        eligibility_reasons: decision?.reasons || [],
        indexed: Boolean(entry?.indexable),
        not_indexed_reason: pilot.active ? entry?.reason || "" : pilot.reason,
        // The events sitemap lists exactly the indexed members of the same
        // derivation, so membership follows from it.
        in_events_sitemap: Boolean(entry?.indexable),
        lifecycle: decision?.inputs.lifecycle || "",
        event_schema_eligible: Boolean(decision?.inputs.schemaEligible),
        event_schema_reason: decision?.inputs.schemaReason || "",
        destinations: lanes.length,
        destination_lanes: lanes,
        snapshot_ready_lanes: decision?.inputs.snapshotReadyLanes?.length || 0,
        artist_city: event ? eventArtistCityRelation(events, event, { now }) : "",
        artist_upcoming_events: upcomingByArtist.get(member.artist_slug) || 0,
        days_until_event: localDate ? -daysSince(localDate, now) : null
      };
      return [member.key, state];
    })
  );
}

// ---------------------------------------------------------------------------
// Page URLs from outside sources
// ---------------------------------------------------------------------------

/**
 * A site path from a URL or path in an export: canonical host only (with or
 * without www, as a Search Console domain property reports it), query and
 * fragment dropped, trailing slash removed. "" for anything else.
 */
export function normalisePagePath(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  let pathname = "";
  if (text.startsWith("/")) pathname = text;
  else {
    try {
      const url = new URL(text);
      if (url.protocol !== "https:" && url.protocol !== "http:") return "";
      if (!CANONICAL_HOSTS.has(url.hostname)) return "";
      pathname = url.pathname;
    } catch {
      return "";
    }
  }
  pathname = pathname.split("#")[0].split("?")[0];
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/**
 * Path -> member key for the paths that identify a member: its launch
 * canonical path and, if the readable slug has since changed, its current
 * canonical path. Nothing else maps — an unknown URL can never join the cohort.
 */
export function cohortPathIndex(cohort, states) {
  const index = new Map();
  for (const member of cohort) {
    index.set(member.canonical_path, member.key);
    const current = states?.get(member.key)?.current_canonical_path;
    if (current) index.set(current, member.key);
  }
  return index;
}

// ---------------------------------------------------------------------------
// Search Console export
// ---------------------------------------------------------------------------

const COLUMN_ALIASES = {
  page: ["page", "url", "landing page", "top pages", "address"],
  query: ["query", "queries", "top queries", "search query"],
  date: ["date"],
  clicks: ["clicks", "url clicks"],
  impressions: ["impressions"],
  position: ["position", "average position", "avg position", "avg. position"]
};
const canonicalColumn = (name) => {
  const clean = String(name ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  for (const [column, aliases] of Object.entries(COLUMN_ALIASES)) if (aliases.includes(clean)) return column;
  return "";
};

/** RFC 4180-style CSV: quoted fields, doubled quotes, CRLF or LF. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const body = String(text ?? "").replace(/^﻿/, "");
  for (let i = 0; i < body.length; i += 1) {
    const char = body[i];
    if (quoted) {
      if (char === '"' && body[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && body[i + 1] === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

const toCount = (value) => {
  const text = String(value ?? "").trim().replace(/,/g, "");
  if (!/^\d+(?:\.0+)?$/.test(text)) return null;
  return Number(text);
};
const toPosition = (value) => {
  const number = Number(String(value ?? "").trim());
  return String(value ?? "").trim() !== "" && Number.isFinite(number) && number >= 1 ? number : null;
};

/**
 * Parse a Search Console export into flat rows. Accepts CSV with a header row,
 * a JSON array of objects, or JSON { start_date|startDate, end_date|endDate,
 * dimensions?, rows } where rows are objects or API rows ({ keys, clicks,
 * impressions, position }) named by `dimensions`. A row needs a page, clicks
 * and impressions; anything unreadable is counted as invalid, never repaired.
 * CTR in the file is ignored and recomputed from clicks / impressions.
 */
export function parseSearchConsoleExport(text, fileName = "") {
  const trimmed = String(text ?? "").trim();
  let objects = [];
  let period = null;
  if (/\.json$/i.test(fileName) || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    const data = JSON.parse(trimmed);
    const list = Array.isArray(data) ? data : Array.isArray(data?.rows) ? data.rows : [];
    const dimensions = Array.isArray(data?.dimensions) ? data.dimensions.map(canonicalColumn) : [];
    const start = data?.start_date || data?.startDate;
    const end = data?.end_date || data?.endDate;
    if (start && end) period = parsePeriod(`${start}..${end}`);
    objects = list.map((row) => {
      const flat = {};
      if (Array.isArray(row?.keys)) row.keys.forEach((value, i) => dimensions[i] && (flat[dimensions[i]] = value));
      for (const [name, value] of Object.entries(row || {})) {
        const column = canonicalColumn(name);
        if (column && !(column in flat)) flat[column] = value;
      }
      return flat;
    });
  } else {
    const [header = [], ...body] = parseCsv(trimmed);
    const columns = header.map(canonicalColumn);
    objects = body.map((cells) => Object.fromEntries(columns.map((column, i) => [column, cells[i]]).filter(([column]) => column)));
  }
  const rows = [];
  let invalid = 0;
  for (const object of objects) {
    const clicks = toCount(object.clicks);
    const impressions = toCount(object.impressions);
    const page = String(object.page ?? "").trim();
    if (!page || clicks === null || impressions === null || clicks > impressions) {
      invalid += 1;
      continue;
    }
    rows.push({
      page,
      query: "query" in object ? String(object.query ?? "").trim() : null,
      date: parseIsoDate(object.date) !== null ? String(object.date) : "",
      clicks,
      impressions,
      position: toPosition(object.position)
    });
  }
  return { rows, invalid, period, hasQueries: rows.some((row) => row.query !== null) };
}

/**
 * Keep one row per (page, query, date). The survivor is chosen by value, not
 * by file order — most impressions, then most clicks, then best position — so
 * the same export sorted differently gives the same report.
 */
export function dedupeRows(rows) {
  const kept = new Map();
  let duplicates = 0;
  const better = (a, b) => a.impressions - b.impressions || a.clicks - b.clicks || (b.position ?? Infinity) - (a.position ?? Infinity);
  for (const row of rows) {
    const id = JSON.stringify([normalisePagePath(row.page) || row.page, row.query === null ? null : row.query.toLowerCase(), row.date]);
    const existing = kept.get(id);
    if (!existing) kept.set(id, row);
    else {
      duplicates += 1;
      if (better(row, existing) > 0) kept.set(id, row);
    }
  }
  return { rows: [...kept.values()], duplicates };
}

const weightedPosition = (rows) => {
  const withPosition = rows.filter((row) => row.position !== null && row.impressions > 0);
  const weight = withPosition.reduce((sum, row) => sum + row.impressions, 0);
  return weight ? Number((withPosition.reduce((sum, row) => sum + row.position * row.impressions, 0) / weight).toFixed(1)) : null;
};

/**
 * Join an export to the cohort by canonical URL. Rows for any other URL are
 * counted and set aside; a URL carrying a pilot key under a non-canonical slug
 * is reported separately and does not join either.
 */
export function joinSearchConsole(cohort, states, parsed, { period = null } = {}) {
  const index = cohortPathIndex(cohort, states);
  const cohortKeys = new Set(cohort.map((member) => member.key));
  const { rows, duplicates } = dedupeRows(parsed.rows);
  const byKey = new Map(cohort.map((member) => [member.key, []]));
  const unmatched = { rows: 0, pilot_key_noncanonical: [], other_event_urls: [], other_urls: [] };
  const note = (list, value) => list.length < 10 && !list.includes(value) && list.push(value);
  for (const row of rows) {
    const pagePath = normalisePagePath(row.page);
    const key = pagePath ? index.get(pagePath) : undefined;
    if (key) {
      byKey.get(key).push(row);
      continue;
    }
    unmatched.rows += 1;
    const parsedPath = parseEventPath(pagePath);
    if (parsedPath && cohortKeys.has(parsedPath.key)) note(unmatched.pilot_key_noncanonical, row.page);
    else if (pagePath.startsWith("/events/")) note(unmatched.other_event_urls, row.page);
    else note(unmatched.other_urls, row.page);
  }
  const dates = rows.map((row) => row.date).filter(Boolean).sort();
  const effectivePeriod = period || parsed.period || null;
  const perKey = new Map();
  for (const member of cohort) {
    const memberRows = byKey.get(member.key);
    const pageRows = memberRows.filter((row) => row.query === null);
    const queryRows = memberRows.filter((row) => row.query !== null && row.query !== "");
    // Page-level rows are Search Console's own totals; summing query rows
    // undercounts (anonymised queries are withheld), so they are the fallback.
    const totalsFrom = pageRows.length ? pageRows : queryRows;
    const impressions = totalsFrom.reduce((sum, row) => sum + row.impressions, 0);
    const clicks = totalsFrom.reduce((sum, row) => sum + row.clicks, 0);
    const queries = new Map();
    for (const row of queryRows) {
      const id = row.query.toLowerCase();
      const entry = queries.get(id) || { query: row.query, impressions: 0, clicks: 0, rows: [] };
      entry.impressions += row.impressions;
      entry.clicks += row.clicks;
      entry.rows.push(row);
      queries.set(id, entry);
    }
    const positions = memberRows.map((row) => row.position).filter((position) => position !== null);
    perKey.set(member.key, {
      rows: memberRows.length,
      totals_source: pageRows.length ? "page_rows" : queryRows.length ? "query_rows" : "none",
      impressions,
      clicks,
      ctr: impressions > 0 ? Number((clicks / impressions).toFixed(4)) : null,
      average_position: weightedPosition(totalsFrom),
      // The best row-level average position in the export (per query or per
      // day), not an individual ranking.
      best_position: positions.length ? Math.min(...positions) : null,
      distinct_queries: queries.size,
      top_queries: [...queries.values()]
        .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks || a.query.localeCompare(b.query))
        .slice(0, EXAMPLES_PER_GROUP)
        .map((entry) => ({ query: entry.query, impressions: entry.impressions, clicks: entry.clicks, position: weightedPosition(entry.rows) })),
      query_rows: [...queries.values()].map((entry) => ({ query: entry.query, impressions: entry.impressions, clicks: entry.clicks }))
    });
  }
  return {
    available: true,
    period: effectivePeriod ? { ...effectivePeriod, source: period ? "--search-console-period" : "export" } : dates.length ? { start: dates[0], end: dates[dates.length - 1], source: "row dates" } : null,
    has_queries: parsed.hasQueries,
    rows_read: parsed.rows.length + parsed.invalid,
    rows_invalid: parsed.invalid,
    rows_duplicate: duplicates,
    rows_matched: rows.length - unmatched.rows,
    unmatched,
    perKey
  };
}

// ---------------------------------------------------------------------------
// Query classification
// ---------------------------------------------------------------------------

const normaliseText = (value) =>
  ` ${String(value ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
const containsPhrase = (haystack, phrase) => {
  const needle = normaliseText(phrase);
  return needle.trim().length > 0 && haystack.includes(needle);
};
const withoutThe = (phrase) => String(phrase ?? "").replace(/^the\s+/i, "");
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTH_TOKENS = new Map(MONTHS.flatMap((name, i) => [[name, i + 1], [name.slice(0, 3), i + 1], ...(name === "september" ? [["sept", 9]] : [])]));
// Words that add no event detail to an artist query.
const GENERIC_WORDS = new Set(["ticket", "tickets", "tour", "tours", "concert", "concerts", "live", "show", "shows", "date", "dates", "presale", "resale", "price", "prices", "cheap", "buy", "seats", "the", "a", "an", "of", "for", "at", "in", "on", "to", "and"]);

/** Month-day mentions in a query, as [month, day] pairs. */
function dateMentions(raw) {
  const text = String(raw ?? "").toLowerCase();
  const mentions = [];
  for (const match of text.matchAll(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g)) mentions.push({ pairs: [[Number(match[2]), Number(match[3])]] });
  for (const match of text.matchAll(/(?<![\d-])(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?(?![\d-])/g)) {
    // 5/1 is 1 May in the US and 5 January elsewhere: either reading counts.
    mentions.push({ pairs: [[Number(match[1]), Number(match[2])], [Number(match[2]), Number(match[1])]] });
  }
  const tokens = normaliseText(raw).trim().split(" ");
  tokens.forEach((token, i) => {
    const month = MONTH_TOKENS.get(token);
    if (!month) return;
    for (const neighbour of [tokens[i + 1], tokens[i - 1]]) {
      const day = /^(\d{1,2})(?:st|nd|rd|th)?$/.exec(neighbour || "");
      if (day) {
        mentions.push({ pairs: [[month, Number(day[1])]] });
        return;
      }
    }
  });
  return mentions;
}

export const QUERY_CLASSES = Object.freeze(["artist_venue_date", "artist_city_date", "artist_venue", "artist_date", "artist_city", "artist_generic", "no_artist", "other"]);

/**
 * One query, classified against the pilot page it was shown for. Conservative:
 * a phrase counts only when the member's full artist, venue or city name
 * appears; a date only when a month-day in the query is the event's own
 * venue-local date. A query naming some other date, or carrying unexplained
 * words next to the artist alone, is "other" rather than forced into a class.
 */
export function classifyQuery(query, member) {
  const text = normaliseText(query);
  const artist = containsPhrase(text, member.artist) || containsPhrase(text, withoutThe(member.artist));
  const venue = containsPhrase(text, member.venue) || containsPhrase(text, withoutThe(member.venue));
  const city = containsPhrase(text, member.city);
  const [, , month, day] = (ISO_DATE_RE.exec(member.local_date) || []).map(Number);
  const mentions = dateMentions(query);
  const date = mentions.some((mention) => mention.pairs.some(([m, d]) => m === month && d === day));
  const otherDate = !date && mentions.length > 0;
  if (!artist) return "no_artist";
  if (otherDate) return "other";
  if (venue && date) return "artist_venue_date";
  if (city && date) return "artist_city_date";
  if (venue) return "artist_venue";
  if (date) return "artist_date";
  if (city) return "artist_city";
  let rest = text;
  for (const phrase of [member.artist, withoutThe(member.artist)]) rest = rest.replace(normaliseText(phrase), " ");
  const leftovers = rest.trim().split(/\s+/).filter(Boolean);
  return leftovers.every((word) => GENERIC_WORDS.has(word) || /^20\d\d$/.test(word)) ? "artist_generic" : "other";
}

// ---------------------------------------------------------------------------
// TTC route traffic and live page facts
// ---------------------------------------------------------------------------

/** Route-traffic export -> per member, joined by canonical path only. */
export function joinRouteTraffic(cohort, states, traffic) {
  if (!traffic?.routes || typeof traffic.routes !== "object") return { available: false, perKey: new Map() };
  const index = cohortPathIndex(cohort, states);
  const perKey = new Map(cohort.map((member) => [member.key, { views: 0, provider_clicks: 0, outbound_clicks: 0, outbound_by_provider: {} }]));
  const hasProviders = Object.values(traffic.routes).some((stats) => stats && typeof stats.outbound_by_provider === "object");
  for (const [routePath, stats] of Object.entries(traffic.routes)) {
    const key = index.get(normalisePagePath(routePath));
    if (!key) continue;
    const entry = perKey.get(key);
    entry.views += Number(stats?.views) || 0;
    entry.provider_clicks += Number(stats?.provider_clicks) || 0;
    entry.outbound_clicks += Number(stats?.outbound_clicks) || 0;
    for (const [provider, count] of Object.entries(stats?.outbound_by_provider || {})) entry.outbound_by_provider[provider] = (entry.outbound_by_provider[provider] || 0) + (Number(count) || 0);
  }
  for (const entry of perKey.values()) {
    entry.outbound_rate = entry.views >= MIN_VIEWS_FOR_RATE ? Number((entry.outbound_clicks / entry.views).toFixed(4)) : null;
    if (!hasProviders) entry.outbound_by_provider = null;
  }
  return { available: true, generated_at: traffic.generated_at || "", since: typeof traffic.since === "string" ? traffic.since : null, providers_available: hasProviders, perKey };
}

const mainOf = (html) => (String(html).match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "";

/** Page-template facts from one rendered event page (strictly descriptive). */
export function livePageFacts(status, html) {
  const main = mainOf(html);
  const prices = (main.match(/<section class="nested-panel" aria-labelledby="eventPricesTitle">([\s\S]*?)<\/section>/) || [])[1] || "";
  // Priced buttons carry extra classes (provider-cta-priced, -lowest), so the
  // class attribute is matched by prefix.
  const ctas = [...new Set([...main.matchAll(/<a class="provider-cta(?:\s[^"]*)?"[^>]*data-cta-provider="([^"]+)"/g)].map((match) => match[1]))];
  return {
    status,
    robots: (String(html).match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "",
    canonical: (String(html).match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "",
    current_price: /class="provider-cta provider-cta-priced/.test(main) || /Lowest listed price: /.test(prices),
    freshness_timestamp: /Lowest listed price: [^<]*, as of /.test(prices),
    thirty_day_low: /\d+-day low |Lowest recorded in \d+ days/.test(prices),
    price_movement: /Latest recorded change: /.test(prices),
    price_history_panel: /data-price-history="/.test(main),
    rendered_ctas: ctas.length,
    marketplace_ctas: ctas.filter((provider) => provider !== "ticketmaster").length,
    priced_ctas: (main.match(/<a class="provider-cta provider-cta-priced/g) || []).length
  };
}

async function fetchLiveFacts(baseUrl, cohort, states) {
  const facts = new Map();
  for (const member of cohort) {
    const pathname = states.get(member.key)?.current_canonical_path || member.canonical_path;
    try {
      const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual", headers: { accept: "text/html" } });
      facts.set(member.key, { path: pathname, ...livePageFacts(response.status, response.status === 200 ? await response.text() : "") });
    } catch (error) {
      facts.set(member.key, { path: pathname, error: String(error?.message || error) });
    }
  }
  return facts;
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const tally = (values) => values.reduce((counts, value) => ({ ...counts, [value]: (counts[value] || 0) + 1 }), {});
const scaleBucket = (count) => (count <= 20 ? "1-20" : count <= 50 ? "21-50" : "51+");

function checkpointFor(days) {
  if (days === null) return { current: "launch date not recorded", next: null };
  if (days < 0) return { current: "not launched yet", next: CHECKPOINTS[0] };
  const reached = CHECKPOINTS.filter((checkpoint) => days >= checkpoint.day);
  const latest = reached[reached.length - 1];
  const next = CHECKPOINTS.find((checkpoint) => days < checkpoint.day) || null;
  if (!latest) return { current: `before the ${CHECKPOINTS[0].label} checkpoint`, next };
  if (latest.until && days > latest.until) return { current: `past the ${latest.label} window`, next: null };
  return { current: latest.label, next };
}

/** Descriptive comparison of a subgroup: counts, never a significance claim. */
function groupSummary(rows, groupOf) {
  const groups = new Map();
  for (const row of rows) {
    const id = groupOf(row);
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(row);
  }
  return Object.fromEntries(
    [...groups.entries()]
      .sort(([a], [b]) => String(a).localeCompare(String(b), undefined, { numeric: true }))
      .map(([id, members]) => [
        id,
        {
          pages: members.length,
          indexed: members.filter((row) => row.current.indexed).length,
          with_impressions: members.some((row) => row.search) ? members.filter((row) => row.search?.impressions > 0).length : null,
          impressions: members.some((row) => row.search) ? members.reduce((sum, row) => sum + (row.search?.impressions || 0), 0) : null,
          clicks: members.some((row) => row.search) ? members.reduce((sum, row) => sum + (row.search?.clicks || 0), 0) : null,
          with_views: members.some((row) => row.engagement) ? members.filter((row) => row.engagement?.views > 0).length : null,
          with_outbound_clicks: members.some((row) => row.engagement) ? members.filter((row) => row.engagement?.outbound_clicks > 0).length : null
        }
      ])
  );
}

/**
 * The whole report from already-loaded inputs. Pure: nothing is read or
 * written here, so tests drive it with fixtures.
 */
export function buildReport({ record, events, artists, catalog, vars, now, searchConsole = null, searchConsolePeriod = null, routeTraffic = null, live = null, inputs = {} }) {
  const cohort = cohortFromRecord(record);
  const launch = parseLaunchDate(record);
  const daysSinceLaunch = launch ? daysSince(launch.date, now) : null;
  const states = currentStates(cohort, { events, artists, catalog, vars, now });
  const sc = searchConsole ? joinSearchConsole(cohort, states, searchConsole, { period: searchConsolePeriod }) : { available: false, perKey: new Map() };
  const traffic = joinRouteTraffic(cohort, states, routeTraffic);

  const rows = cohort.map((member) => {
    const current = states.get(member.key);
    const search = sc.available ? sc.perKey.get(member.key) : null;
    const queryClasses = search && sc.has_queries ? search.query_rows.map((entry) => ({ ...entry, class: classifyQuery(entry.query, member) })) : null;
    const liveFacts = live?.get(member.key) || null;
    return {
      key: member.key,
      event_id: member.event_id,
      canonical_url: `${CANONICAL_ORIGIN}${member.canonical_path}`,
      artist: member.artist,
      artist_slug: member.artist_slug,
      venue: member.venue,
      city: member.city,
      country: member.country,
      local_date: member.local_date,
      launch: {
        date: launch?.date || null,
        artist_city: member.artist_city,
        destinations: member.destinations ?? null,
        destination_lanes: member.destination_lanes,
        snapshot_ready_lanes: member.snapshot_ready_lanes ?? null,
        days_out_at_selection: member.days_out_at_selection ?? null
      },
      current,
      search: search ? { ...search, query_rows: undefined, query_classes: queryClasses ? tally(queryClasses.map((entry) => entry.class)) : null, classified: queryClasses } : null,
      engagement: traffic.available ? traffic.perKey.get(member.key) : null,
      content: {
        // From canonical data: what the page's ticket block can offer.
        current_destinations: current.destinations,
        current_marketplace_lanes: current.destination_lanes.filter((lane) => lane !== "ticketmaster").length,
        multiple_marketplace_choices: current.destination_lanes.filter((lane) => lane !== "ticketmaster").length >= 2,
        snapshot_ready_lanes: current.snapshot_ready_lanes,
        // Render-time facts (D1 price cache and history): only with --live.
        live: liveFacts
      }
    };
  });

  const active = rows.filter((row) => row.current.indexed);
  const dropped = rows.filter((row) => !row.current.indexed);
  const withSearch = rows.filter((row) => row.search);
  const reached = (limit) => (sc.available ? rows.filter((row) => row.search?.best_position !== null && row.search?.best_position !== undefined && row.search.best_position <= limit).length : null);
  const avgBucket = (row) => {
    const position = row.search?.average_position;
    if (position === null || position === undefined) return "no_position";
    return position <= 10 ? "top_10" : position <= 20 ? "11_20" : position <= 50 ? "21_50" : "below_50";
  };
  const classified = withSearch.flatMap((row) => (row.search.classified || []).map((entry) => ({ ...entry, page: row.canonical_url })));
  const queryForms = sc.available && sc.has_queries
    ? Object.fromEntries(
        QUERY_CLASSES.map((cls) => {
          const entries = classified.filter((entry) => entry.class === cls);
          return [
            cls,
            {
              queries: entries.length,
              impressions: entries.reduce((sum, entry) => sum + entry.impressions, 0),
              clicks: entries.reduce((sum, entry) => sum + entry.clicks, 0),
              pages: new Set(entries.map((entry) => entry.page)).size,
              examples: entries
                .sort((a, b) => b.impressions - a.impressions || a.query.localeCompare(b.query))
                .slice(0, EXAMPLES_PER_GROUP)
                .map((entry) => entry.query)
            }
          ];
        })
      )
    : null;
  const totalImpressions = sc.available ? withSearch.reduce((sum, row) => sum + row.search.impressions, 0) : null;
  const strongest = sc.available
    ? [...rows].filter((row) => row.search.impressions > 0).sort((a, b) => b.search.impressions - a.search.impressions || b.search.clicks - a.search.clicks || a.key.localeCompare(b.key))
    : traffic.available
      ? [...rows].filter((row) => row.engagement.views > 0).sort((a, b) => b.engagement.views - a.engagement.views || a.key.localeCompare(b.key))
      : [];

  const summary = {
    cohort_size: rows.length,
    active_indexed: active.length,
    dropped_out: dropped.length,
    dropped_out_reasons: tally(dropped.flatMap((row) => (row.current.eligibility_reasons.length ? row.current.eligibility_reasons : [row.current.not_indexed_reason || "unknown"]))),
    pages_with_impressions: sc.available ? rows.filter((row) => row.search.impressions > 0).length : null,
    pages_with_clicks: sc.available ? rows.filter((row) => row.search.clicks > 0).length : null,
    total_impressions: totalImpressions,
    total_clicks: sc.available ? withSearch.reduce((sum, row) => sum + row.search.clicks, 0) : null,
    // Impression-weighted, as Search Console aggregates position.
    weighted_average_position: sc.available ? weightedPosition(withSearch.filter((row) => row.search.average_position !== null).map((row) => ({ position: row.search.average_position, impressions: row.search.impressions }))) : null,
    reached_top_50: reached(50),
    reached_top_20: reached(20),
    reached_top_10: reached(10),
    by_average_position: sc.available ? { top_10: 0, "11_20": 0, "21_50": 0, below_50: 0, no_position: 0, ...tally(rows.map(avgBucket)) } : null,
    query_forms: queryForms,
    strongest: strongest.slice(0, 5).map((row) => ({ key: row.key, url: row.canonical_url, impressions: row.search?.impressions ?? null, clicks: row.search?.clicks ?? null, average_position: row.search?.average_position ?? null, views: row.engagement?.views ?? null })),
    strongest_by: sc.available ? "search_console_impressions" : traffic.available ? "ttc_page_views" : null,
    no_search_visibility: sc.available ? rows.filter((row) => row.search.impressions === 0).map((row) => row.key) : null,
    pages_with_views: traffic.available ? rows.filter((row) => row.engagement.views > 0).length : null,
    total_views: traffic.available ? rows.reduce((sum, row) => sum + row.engagement.views, 0) : null,
    pages_with_outbound_clicks: traffic.available ? rows.filter((row) => row.engagement.outbound_clicks > 0).length : null,
    total_outbound_clicks: traffic.available ? rows.reduce((sum, row) => sum + row.engagement.outbound_clicks, 0) : null,
    providers_clicked: traffic.available && traffic.providers_available
      ? rows.reduce((counts, row) => {
          for (const [provider, count] of Object.entries(row.engagement.outbound_by_provider || {})) counts[provider] = (counts[provider] || 0) + count;
          return counts;
        }, {})
      : null,
    content_facts: {
      multiple_marketplace_choices: rows.filter((row) => row.content.multiple_marketplace_choices).length,
      ...(live
        ? Object.fromEntries(
            ["current_price", "freshness_timestamp", "thirty_day_low", "price_movement", "price_history_panel"].map((fact) => [fact, rows.filter((row) => row.content.live?.[fact] === true).length])
          )
        : {}),
      live_fetch_failed: live ? rows.filter((row) => !row.content.live || row.content.live.error).length : null
    },
    // A page whose production robots meta disagrees with the derived indexing
    // state: usually a deploy that has not caught up with the repo.
    live_robots_disagree: live
      ? rows.filter((row) => row.content.live && !row.content.live.error && String(row.content.live.robots).startsWith("index,") !== row.current.indexed).map((row) => row.key)
      : null,
    by_artist_city: groupSummary(rows, (row) => row.launch.artist_city),
    by_launch_destinations: groupSummary(rows, (row) => String(row.launch.destinations)),
    // Artist scale has no recorded measure; the artist's current upcoming
    // events in events.json is the proxy used here, and is labelled as such.
    by_artist_upcoming_events_proxy: groupSummary(rows, (row) => scaleBucket(row.current.artist_upcoming_events))
  };

  return {
    generated_at: new Date(now).toISOString(),
    read_only: true,
    experiment: record.experiment,
    inputs: {
      pilot_record: PILOT_RECORD_PATH,
      events: "public/data/events.json",
      artists: "public/data/artists.json",
      catalog: "public/data/catalog.json",
      rollout_flag: vars.EVENT_PAGES_INDEXING ?? "",
      runtime_keys_match_record: JSON.stringify([...EVENT_INDEXING_PILOT_KEYS]) === JSON.stringify(cohort.map((member) => member.key)),
      ...inputs
    },
    launch: {
      selected_on: record.selected_on || null,
      launch_date: launch?.date || null,
      days_since_launch: daysSinceLaunch,
      checkpoint: checkpointFor(daysSinceLaunch),
      checkpoints: CHECKPOINTS,
      checkpoint_note: "Non-binding guidance for human review. Nothing reads these to change rollout state."
    },
    search_console: sc.available
      ? { available: true, period: sc.period, has_queries: sc.has_queries, rows_read: sc.rows_read, rows_invalid: sc.rows_invalid, rows_duplicate: sc.rows_duplicate, rows_matched: sc.rows_matched, unmatched: sc.unmatched }
      : { available: false, note: "no --search-console export supplied; search metrics are unknown, not zero" },
    ttc_engagement: traffic.available
      ? { available: true, generated_at: traffic.generated_at, since: traffic.since, providers_available: traffic.providers_available, min_views_for_rate: MIN_VIEWS_FOR_RATE }
      : { available: false, note: `no route-traffic export (${inputs.route_traffic || DEFAULT_ROUTE_TRAFFIC_PATH}); page views and outbound clicks are unknown, not zero` },
    revenue: { available: false, note: "not reported: TTC has no reliable event-level affiliate revenue attribution" },
    content_quality: { live: Boolean(live), note: live ? "live facts are one production render per page at generated_at" : "price, freshness, 30-day low, movement and history facts exist only at render time; run with --live to record them" },
    summary,
    members: rows.map((row) => ({ ...row, search: row.search ? { ...row.search, classified: undefined } : null }))
  };
}

// ---------------------------------------------------------------------------
// Text rendering
// ---------------------------------------------------------------------------

const show = (value, suffix = "") => (value === null || value === undefined ? "n/a" : `${value}${suffix}`);
const pct = (value) => (value === null || value === undefined ? "n/a" : `${(value * 100).toFixed(1)}%`);

const renderGroups = (groups) =>
  Object.entries(groups).map(
    ([id, group]) =>
      `        ${id}: ${group.pages} pages, ${group.indexed} indexed · with impressions ${show(group.with_impressions)} (impressions ${show(group.impressions)}, clicks ${show(group.clicks)}) · with views ${show(group.with_views)} · with outbound clicks ${show(group.with_outbound_clicks)}`
  );

export function renderText(report) {
  const s = report.summary;
  const L = report.launch;
  const lines = [
    `Event indexing pilot — ${report.experiment} — ${report.generated_at} (read-only; descriptive, no score)`,
    "",
    `Cohort: ${s.cohort_size} frozen members from ${report.inputs.pilot_record} · runtime list matches record: ${report.inputs.runtime_keys_match_record ? "yes" : "NO"} · EVENT_PAGES_INDEXING "${report.inputs.rollout_flag}"`,
    `Launch: ${show(L.launch_date)} (selected ${show(L.selected_on)}) · ${show(L.days_since_launch)} days since launch · checkpoint: ${L.checkpoint.current}${L.checkpoint.next ? ` · next: ${L.checkpoint.next.label} (day ${L.checkpoint.next.day})` : ""}`,
    ...L.checkpoints.map((checkpoint) => `  ${checkpoint.label.padEnd(9)} look for ${checkpoint.look_for}`),
    `  (${L.checkpoint_note})`,
    "",
    "Inputs:",
    `  Search Console: ${report.search_console.available ? `${report.search_console.period ? `${report.search_console.period.start}..${report.search_console.period.end} (${report.search_console.period.source})` : "PERIOD NOT STATED"} · rows ${report.search_console.rows_read} read, ${report.search_console.rows_matched} matched, ${report.search_console.unmatched.rows} other URLs (never joined), ${report.search_console.rows_duplicate} duplicates, ${report.search_console.rows_invalid} invalid` : report.search_console.note}`,
    `  TTC analytics: ${report.ttc_engagement.available ? `route traffic generated ${report.ttc_engagement.generated_at || "?"}, window from ${report.ttc_engagement.since === null ? "unstated" : report.ttc_engagement.since || "all time"}${report.ttc_engagement.providers_available ? "" : " · no per-provider split in this export"}` : report.ttc_engagement.note}`,
    `  Revenue: ${report.revenue.note}`,
    `  Content facts: ${report.content_quality.note}`,
    "",
    "Summary:",
    `   1. still active/indexable: ${s.active_indexed} of ${s.cohort_size}`,
    `   2. dropped out: ${s.dropped_out}${s.dropped_out ? ` — ${JSON.stringify(s.dropped_out_reasons)} (not replaced)` : ""}`,
    `   3. pages with Google impressions: ${show(s.pages_with_impressions)} · total ${show(s.total_impressions)}`,
    `   4. pages with Google clicks: ${show(s.pages_with_clicks)} · total ${show(s.total_clicks)} · impression-weighted position ${show(s.weighted_average_position)}`,
    `   5–7. reached top 50 / 20 / 10 (best row position): ${show(s.reached_top_50)} / ${show(s.reached_top_20)} / ${show(s.reached_top_10)}${s.by_average_position ? ` · by average position ${JSON.stringify(s.by_average_position)}` : ""}`,
    `   8. query forms: ${s.query_forms ? "" : "n/a (needs an export with a query column)"}`,
    ...(s.query_forms ? Object.entries(s.query_forms).filter(([, group]) => group.queries).map(([cls, group]) => `        ${cls}: ${group.queries} queries, ${group.impressions} impressions, ${group.clicks} clicks, ${group.pages} pages — e.g. ${group.examples.map((q) => `"${q}"`).join(", ")}`) : []),
    `   9. strongest pages${s.strongest_by ? ` (by ${s.strongest_by})` : ""}: ${s.strongest.length ? "" : "n/a"}`,
    ...s.strongest.map((row) => `        ${row.url} — impressions ${show(row.impressions)}, clicks ${show(row.clicks)}, position ${show(row.average_position)}, views ${show(row.views)}`),
    `  10. no measurable search visibility: ${s.no_search_visibility === null ? "unknown (no Search Console input)" : `${s.no_search_visibility.length} pages`}`,
    `  11. pages with TTC page views: ${show(s.pages_with_views)} · total views ${show(s.total_views)}`,
    `  12. pages with marketplace outbound clicks: ${show(s.pages_with_outbound_clicks)} · total ${show(s.total_outbound_clicks)}${s.providers_clicked ? ` · by provider ${JSON.stringify(s.providers_clicked)}` : ""}`,
    "  13. by artist-city at launch:",
    ...renderGroups(s.by_artist_city),
    "  14. by launch destination count:",
    ...renderGroups(s.by_launch_destinations),
    "  15. by the artist's current upcoming events in events.json (artist-scale proxy):",
    ...renderGroups(s.by_artist_upcoming_events_proxy),
    "  (30 pages: descriptive differences only, never statistical significance.)",
    `  content: multiple marketplace choices ${s.content_facts.multiple_marketplace_choices}${
      report.content_quality.live
        ? ` · live: price ${s.content_facts.current_price} · as-of time ${s.content_facts.freshness_timestamp} · 30-day low ${s.content_facts.thirty_day_low} · movement ${s.content_facts.price_movement} · history panel ${s.content_facts.price_history_panel} · fetch failed ${s.content_facts.live_fetch_failed} · robots disagreeing with derived state ${s.live_robots_disagree.length}`
        : " · render-time facts need --live"
    }`,
    "",
    "Members (launch → current):"
  ];
  for (const row of report.members) {
    const c = row.current;
    lines.push(
      `  ${row.key} ${row.artist} · ${row.venue}, ${row.city}, ${row.country} · ${row.local_date} (${show(c.days_until_event)}d) · ${row.launch.artist_city}`,
      `      ${row.canonical_url}`,
      `      ${c.indexed ? "INDEXED" : `NOT INDEXED (${c.eligibility_reasons.join(", ") || c.not_indexed_reason})`} · exists ${c.exists ? "yes" : "no"} · route ${c.route_action}${c.route_reason ? `/${c.route_reason}` : ""} · launch URL → ${show(c.launch_url_http)}${c.launch_url_location ? ` ${c.launch_url_location}` : ""}${c.canonical_path_changed ? ` · canonical now ${c.current_canonical_path}` : ""} · lifecycle ${c.lifecycle || "n/a"} · MusicEvent ${c.event_schema_eligible ? "yes" : `no (${c.event_schema_reason})`} · sitemap ${c.in_events_sitemap ? "yes" : "no"}`,
      `      destinations ${show(row.launch.destinations)} → ${c.destinations} · snapshot lanes ${show(row.launch.snapshot_ready_lanes)} → ${c.snapshot_ready_lanes} · artist upcoming events ${c.artist_upcoming_events}`
    );
    if (row.search) {
      lines.push(`      search: impressions ${row.search.impressions}, clicks ${row.search.clicks}, CTR ${pct(row.search.ctr)}, position ${show(row.search.average_position)} (best ${show(row.search.best_position)}), queries ${row.search.distinct_queries}${row.search.top_queries.length ? ` — ${row.search.top_queries.map((q) => `"${q.query}" ${q.impressions}`).join(", ")}` : ""}`);
    }
    if (row.engagement) {
      lines.push(`      TTC: views ${row.engagement.views}, outbound ${row.engagement.outbound_clicks} (rate ${row.engagement.outbound_rate === null ? "low volume" : pct(row.engagement.outbound_rate)})${row.engagement.outbound_by_provider ? ` ${JSON.stringify(row.engagement.outbound_by_provider)}` : ""}`);
    }
    const live = row.content.live;
    lines.push(
      `      content: marketplace lanes ${row.content.current_marketplace_lanes}${row.content.multiple_marketplace_choices ? " (multiple)" : ""}${
        live
          ? live.error
            ? ` · live fetch failed: ${live.error}`
            : ` · live ${live.status} ${live.robots || "-"} · price ${live.current_price ? "yes" : "no"} · as-of ${live.freshness_timestamp ? "yes" : "no"} · 30-day low ${live.thirty_day_low ? "yes" : "no"} · movement ${live.price_movement ? "yes" : "no"} · history panel ${live.price_history_panel ? "yes" : "no"} · CTAs ${live.rendered_ctas} (${live.priced_ctas} priced)`
          : ""
      }`
    );
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
const resolvePath = (file) => (path.isAbsolute(file) ? file : path.resolve(process.cwd(), file));

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    console.log(usage());
    return;
  }
  const now = process.env.TTC_NOW ? Date.parse(process.env.TTC_NOW) : Date.now();
  if (!Number.isFinite(now)) throw new Error("TTC_NOW is not a valid timestamp");
  const record = readJson(PILOT_RECORD_PATH);
  const events = readJson("public/data/events.json");
  const artists = readJson("public/data/artists.json");
  const catalog = readJson("public/data/catalog.json");
  const vars = wranglerVars(fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8"));

  let searchConsole = null;
  if (options.searchConsole) {
    const file = resolvePath(options.searchConsole);
    searchConsole = parseSearchConsoleExport(fs.readFileSync(file, "utf8"), file);
  }
  const trafficFile = options.routeTraffic ? resolvePath(options.routeTraffic) : path.join(ROOT, DEFAULT_ROUTE_TRAFFIC_PATH);
  if (options.routeTraffic && !fs.existsSync(trafficFile)) throw new Error(`--route-traffic: no file at ${trafficFile}`);
  const routeTraffic = fs.existsSync(trafficFile) ? JSON.parse(fs.readFileSync(trafficFile, "utf8")) : null;

  const cohort = cohortFromRecord(record);
  const live = options.live ? await fetchLiveFacts(options.baseUrl, cohort, currentStates(cohort, { events, artists, catalog, vars, now })) : null;
  const report = buildReport({
    record,
    events,
    artists,
    catalog,
    vars,
    now,
    searchConsole,
    searchConsolePeriod: options.searchConsolePeriod ? parsePeriod(options.searchConsolePeriod) : null,
    routeTraffic,
    live,
    inputs: {
      search_console: options.searchConsole || null,
      route_traffic: routeTraffic ? path.relative(ROOT, trafficFile) || trafficFile : null,
      live: options.live ? options.baseUrl : null
    }
  });
  console.log(options.json ? JSON.stringify(report, null, 2) : renderText(report));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Event indexing pilot report failed: ${error.message}`);
    process.exit(1);
  });
}
