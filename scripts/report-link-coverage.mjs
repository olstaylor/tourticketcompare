#!/usr/bin/env node
//
// report-link-coverage.mjs
//
// How many checked ticket sites does each upcoming date actually lead to?
//
// The show card's CTA row is decided by `serverShowCtaSpecs` in
// functions/[[path]].js, mirrored in public/app.js, functions/api/shows.js and
// functions/api/out.js. This report answers the same question with the same
// rules — they live in scripts/lib/event-link-coverage.mjs, which is also what
// the SeatGeek enrichment prioritiser reads, so the report and the scheduler
// cannot disagree about which events need help.
//
// It reports the coverage distribution (0 / 1 / 2 / 3+ publishable exact-event
// CTAs), and for every low-coverage upcoming event it says WHY each provider
// lane is not publishing, grouped by artist, by country, and by cause.
//
// Validation contract:
//   - An upcoming event with ZERO publishable exact-event CTAs is a FAILURE.
//     A date on the board that leads nowhere is the one state the pipeline is
//     supposed to make impossible.
//   - An upcoming event with exactly ONE is a reported WARNING, never a
//     failure. A provider genuinely not listing a show is a real and allowed
//     outcome; forcing a second link would mean inventing one.
//
// Nothing here is generated into the repository. `--json` is for tooling and
// the human view is for a terminal; the automation evidence that belongs in
// git already lives in reports/provider-sync/.
//
// Usage:
//   npm run report:link-coverage              (human report)
//   npm run report:link-coverage -- --json    (machine-readable)
//   npm run report:link-coverage:check        (fails on zero-link upcoming events)
//   npm run report:link-coverage -- --recheck-review   (owner-only recheck list)
//   npm run report:link-coverage:self-test

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PROVIDER_LANES,
  LANE_BLOCKERS,
  evaluateEventLanes,
  isUpcoming,
  providerConfiguredTest,
  safeLaneUrl
} from "./lib/event-link-coverage.mjs";
import { resolveEventLocalDate, localDateSkipReason } from "./lib/event-local-date.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const CATALOG_PATH = path.join(REPO_ROOT, "public", "data", "catalog.json");
const PROVIDER_REPORTS_DIR = path.join(REPO_ROOT, "reports", "provider-sync");

// ─── Causes ─────────────────────────────────────────────────────────────────

// Stable machine-readable cause codes. `--check` and the grouped output both
// key on these, so add a new one rather than repurposing an existing code.
export const CAUSES = Object.freeze({
  TIME_DATA: "missing_or_invalid_time_data",
  NEEDS_RECHECK: "ticketmaster_needs_recheck",
  NOT_CONFIGURED: "provider_not_configured",
  NO_LISTING: "no_qualifying_provider_listing",
  AMBIGUOUS: "ambiguous_match",
  UNPROCESSED: "unprocessed_or_api_cap",
  URL_SHAPE: "stored_url_fails_provider_shape"
});

export const CAUSE_LABELS = Object.freeze({
  [CAUSES.TIME_DATA]: "missing/invalid time data (venue-local date unresolvable, so no matcher can run)",
  [CAUSES.NEEDS_RECHECK]: "needs_recheck (Ticketmaster storefront suppressed pending human review)",
  [CAUSES.NOT_CONFIGURED]: "provider not configured at runtime",
  [CAUSES.NO_LISTING]: "no qualifying provider listing (checked; the provider does not list this show)",
  [CAUSES.AMBIGUOUS]: "ambiguous match (multiple plausible listings — never guessed)",
  [CAUSES.UNPROCESSED]: "unprocessed or stopped by an API cap (not yet checked)",
  [CAUSES.URL_SHAPE]: "stored provider URL fails that provider's event-URL shape check"
});

// ─── Provider audit-log evidence ────────────────────────────────────────────
//
// Whether a lane found nothing or found too much is a fact about a RUN, not
// about the event record, so it can only come from that run's committed audit
// log. Parsing is deliberately tolerant: an absent, renamed or restructured log
// contributes no evidence, and the report falls back to what the event data
// alone can say. It never invents an outcome.

const LOG_SOURCES = Object.freeze([
  { file: "seatgeek-cta-verify.md", provider: "seatgeek", kind: "outcome-table" },
  { file: "vividseats-cta-sync.md", provider: "vivid-seats", kind: "outcome-table" },
  { file: "seatgeek-cta-auto-add.md", provider: "seatgeek", kind: "enrichment-log" }
]);

/**
 * Map a provider run's outcome word/reason onto a cause code, or "" when the
 * outcome says nothing about coverage (a success, or a transient error).
 */
export function outcomeToCause(text) {
  const value = String(text || "").toLowerCase();
  // Pre-API skips (unresolvable local date, past event, no registry entry) are
  // facts about the event record at the time of that run, not about provider
  // inventory — and the live data is the authority on all of them, so a stale
  // log must not override it. Checked first, because "unambiguous local date"
  // contains the word the ambiguity test looks for.
  if (/unambiguous local date|local date unresolved|in the past|apostrophe|registry/.test(value)) return "";
  if (/\bconflict|\bambiguous:|conflicting_same_date_city_candidates/.test(value)) return CAUSES.AMBIGUOUS;
  if (/api_call_limit|rate_limited|not checked|not_checked/.test(value)) return CAUSES.UNPROCESSED;
  if (/no qualifying|no_candidates_returned|may not be listed/.test(value)) return CAUSES.NO_LISTING;
  if (/date_match_failed|artist_match_failed|city_or_metro_match_failed|below_high_confidence/.test(value)) return CAUSES.NO_LISTING;
  return "";
}

/**
 * Extract { showId -> { provider -> cause } } from one audit log's text.
 * Pure and tolerant — anything it does not recognise is simply not evidence.
 */
export function parseProviderLog(text, provider, kind) {
  const evidence = new Map();
  const record = (showId, cause) => {
    const id = String(showId || "").trim();
    if (!id || !cause) return;
    if (!evidence.has(id)) evidence.set(id, {});
    // First mention wins: the run's own table is ordered, and a later restatement
    // of the same row is a summary, not a fresh outcome.
    if (!evidence.get(id)[provider]) evidence.get(id)[provider] = cause;
  };
  for (const line of String(text || "").split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 3) continue;
    const showId = cells[0];
    if (!showId || showId === "showId" || /^-+$/.test(showId)) continue;
    if (kind === "outcome-table") {
      // | showId | artist | action | id | url | notes |
      record(showId, outcomeToCause(`${cells[2]} ${cells[cells.length - 1]}`));
    } else {
      // | showId | artist | date | city | reason | best candidate |
      record(showId, outcomeToCause(`${cells[4] ?? ""} ${cells[cells.length - 1]}`));
    }
  }
  return evidence;
}

async function loadProviderEvidence(dir = PROVIDER_REPORTS_DIR) {
  const merged = new Map();
  for (const source of LOG_SOURCES) {
    let text;
    try {
      text = await fs.readFile(path.join(dir, source.file), "utf8");
    } catch {
      continue;
    }
    for (const [showId, byProvider] of parseProviderLog(text, source.provider, source.kind)) {
      if (!merged.has(showId)) merged.set(showId, {});
      Object.assign(merged.get(showId), { ...byProvider, ...merged.get(showId) });
    }
  }
  return merged;
}

// ─── Per-event diagnosis ────────────────────────────────────────────────────

/**
 * Why is each non-publishing lane not publishing for this event?
 *
 * @param {any} event Raw events.json record.
 * @param {(slug: string) => boolean} isConfigured
 * @param {Record<string,string>} evidence Provider-run evidence for this event.
 * @returns {{ctaCount: number, publishing: string[], blocked: Array<{provider: string, cause: string, detail: string}>}}
 */
export function diagnoseEvent(event, isConfigured, evidence = {}) {
  const lanes = evaluateEventLanes(event, isConfigured);
  const localDate = resolveEventLocalDate(event);
  const timeDataDetail = localDate.iso ? "" : localDateSkipReason(localDate.reason);
  const publishing = lanes.filter((lane) => lane.publishes).map((lane) => lane.slug);
  const blocked = [];

  for (const lane of lanes) {
    if (lane.publishes) continue;
    let cause;
    let detail = "";
    if (lane.blocker === LANE_BLOCKERS.PROVIDER_NOT_CONFIGURED) {
      cause = CAUSES.NOT_CONFIGURED;
      detail = `${lane.name} is not enabled/configured for public CTAs`;
    } else if (lane.blocker === LANE_BLOCKERS.TICKETMASTER_NEEDS_RECHECK) {
      cause = CAUSES.NEEDS_RECHECK;
      detail = `verification_status is '${String(event?.verification_status || "(absent)")}' — the Ticketmaster CTA stays suppressed until a human restores it`;
    } else if (lane.blocker === LANE_BLOCKERS.URL_SHAPE) {
      cause = CAUSES.URL_SHAPE;
      detail = `stored ${lane.slug} URL does not pass that provider's event-URL check`;
    } else if (timeDataDetail) {
      // A lane that could otherwise run is blocked upstream: with no resolvable
      // venue-local date the matcher refuses to search rather than guess a
      // night, so this is a data problem, not a provider-inventory one.
      cause = CAUSES.TIME_DATA;
      detail = timeDataDetail;
    } else if (evidence[lane.slug]) {
      cause = evidence[lane.slug];
      detail = `${lane.name} run evidence: ${CAUSE_LABELS[evidence[lane.slug]]}`;
    } else {
      const status = String(event?.provider_links?.[lane.slug]?.availability_status || "").trim().toLowerCase();
      if (status === "not_listed" || status === "needs_recheck") {
        cause = CAUSES.NO_LISTING;
        detail = `${lane.name} provenance records availability_status '${status}'`;
      } else {
        cause = CAUSES.UNPROCESSED;
        detail = `${lane.name} has no recorded check for this event yet`;
      }
    }
    blocked.push({ provider: lane.slug, cause, detail });
  }

  return { ctaCount: publishing.length, publishing, blocked };
}

// ─── Aggregation ────────────────────────────────────────────────────────────

function bucketFor(count) {
  if (count === 0) return "0";
  if (count === 1) return "1";
  if (count === 2) return "2";
  return "3+";
}

function tally(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function sortedEntries(map) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

/**
 * Full coverage analysis over the event set.
 *
 * @param {any[]} events
 * @param {(slug: string) => boolean} isConfigured
 * @param {Map<string, Record<string,string>>} evidence
 * @param {number} now
 */
export function analyse(events, isConfigured, evidence = new Map(), now = Date.now()) {
  const upcoming = events.filter((event) => isUpcoming(event, now));
  const distribution = { 0: 0, 1: 0, 2: 0, "3+": 0 };
  const rows = [];
  for (const event of upcoming) {
    const diagnosis = diagnoseEvent(event, isConfigured, evidence.get(String(event?.id)) || {});
    distribution[bucketFor(diagnosis.ctaCount)] += 1;
    rows.push({ event, ...diagnosis });
  }

  const low = rows.filter((row) => row.ctaCount <= 1);
  const byArtist = new Map();
  const byCountry = new Map();
  const byCause = new Map();
  for (const row of low) {
    tally(byArtist, String(row.event?.artist_slug || "(unknown)"));
    tally(byCountry, String(row.event?.country || "(unknown)"));
    for (const cause of new Set(row.blocked.map((blocker) => blocker.cause))) tally(byCause, cause);
  }

  return {
    upcoming: upcoming.length,
    total: events.length,
    distribution,
    rows,
    zeroLink: rows.filter((row) => row.ctaCount === 0),
    oneLink: rows.filter((row) => row.ctaCount === 1),
    lowCoverage: low,
    byArtist: sortedEntries(byArtist),
    byCountry: sortedEntries(byCountry),
    byCause: sortedEntries(byCause)
  };
}

// ─── Owner-review list for upcoming needs_recheck rows ──────────────────────
//
// A needs_recheck row's Ticketmaster storefront link is suppressed on purpose
// and stays suppressed: restoring it requires a human to open the URL and
// confirm it lands on that exact event (SAFE_PUBLISHING_RULES.md). Nothing here
// changes any state — it is a worklist, so the owner can see at a glance which
// rows are still leaning on independently verified marketplace links.

export function recheckReview(events, isConfigured, now = Date.now()) {
  return events
    .filter((event) => isUpcoming(event, now))
    .filter((event) => String(event?.verification_status || "").trim().toLowerCase() === "needs_recheck")
    .map((event) => {
      const lanes = evaluateEventLanes(event, isConfigured);
      return {
        showId: String(event?.id || ""),
        artist: String(event?.artist_slug || ""),
        date: String(event?.datetime_iso || ""),
        city: String(event?.city || ""),
        country: String(event?.country || ""),
        venue: String(event?.venue || ""),
        ticketmaster_event_id: String(event?.ticketmaster_event_id || ""),
        // The stored destination a human has to open and confirm. It is printed
        // for review only — it is not published while the row is needs_recheck.
        ticketmaster_url: String(event?.ticketmaster_url || ""),
        ticketmaster_url_shape_ok: Boolean(safeLaneUrl(event, PROVIDER_LANES.find((lane) => lane.slug === "ticketmaster"))),
        independently_verified_providers: lanes.filter((lane) => lane.publishes && lane.slug !== "ticketmaster").map((lane) => lane.name),
        publishable_cta_count: lanes.filter((lane) => lane.publishes).length
      };
    })
    .sort((a, b) => a.publishable_cta_count - b.publishable_cta_count || a.date.localeCompare(b.date));
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const allConfigured = () => true;
  const sgUrl = "https://seatgeek.com/x-tickets/y/concert/1";
  const vsUrl = "https://vividseats.com/x-tickets-y-1-1-2027--floor/production/2";
  const tnUrl = "https://www.ticketnetwork.com/en/p/tn-1";
  const base = {
    id: "e1",
    artist_slug: "ok-artist",
    country: "United States",
    city: "Hartford",
    venue: "PeoplesBank Arena",
    datetime_iso: "2027-01-01T20:00:00Z",
    timezone: "America/New_York",
    verification_status: "human_verified",
    ticketmaster_event_id: "ABC123",
    ticketmaster_url: "https://www.ticketmaster.com/ok-artist-hartford/event/ABC123",
    provider_links: { ticketmaster: { verified: true } }
  };

  // Counting mirrors the renderer.
  assert("a Ticketmaster-only publishable event counts one CTA", diagnoseEvent(base, allConfigured).ctaCount === 1);
  assert(
    "a verified SeatGeek link adds a second CTA",
    diagnoseEvent({ ...base, seatgeek_url: sgUrl, provider_links: { ...base.provider_links, seatgeek: { verified: true, url: sgUrl } } }, allConfigured).ctaCount === 2
  );
  assert(
    "a needs_recheck row with a verified SeatGeek link still publishes one CTA",
    diagnoseEvent({ ...base, verification_status: "needs_recheck", seatgeek_url: sgUrl, provider_links: { seatgeek: { verified: true, url: sgUrl } } }, allConfigured).ctaCount === 1
  );
  assert(
    "a needs_recheck row with nothing verified publishes none",
    diagnoseEvent({ ...base, verification_status: "needs_recheck" }, allConfigured).ctaCount === 0
  );
  assert(
    "verified provenance with no stored URL publishes nothing",
    diagnoseEvent({ ...base, seatgeek_url: "", provider_links: { ...base.provider_links, seatgeek: { verified: true, url: null } } }, allConfigured).publishing.includes("seatgeek") === false
  );
  assert(
    "a verified marketplace link with a generic URL publishes nothing",
    diagnoseEvent({ ...base, ticketnetwork_url: "https://www.ticketnetwork.com/search", provider_links: { ...base.provider_links, ticketnetwork: { verified: true } } }, allConfigured).publishing.includes("ticketnetwork") === false
  );
  assert(
    "an unverified marketplace lane never publishes on a URL alone",
    diagnoseEvent({ ...base, ticketnetwork_url: tnUrl }, allConfigured).publishing.includes("ticketnetwork") === false
  );
  assert(
    "a verified Vivid Seats production URL publishes",
    diagnoseEvent({ ...base, vividseats_url: vsUrl, provider_links: { ...base.provider_links, "vivid-seats": { verified: true } } }, allConfigured).publishing.includes("vivid-seats")
  );

  // Causes.
  const causesOf = (event, evidence = {}, isConfigured = allConfigured) =>
    new Set(diagnoseEvent(event, isConfigured, evidence).blocked.map((blocker) => blocker.cause));
  assert("a needs_recheck row reports the recheck cause", causesOf({ ...base, verification_status: "needs_recheck" }).has(CAUSES.NEEDS_RECHECK));
  assert(
    "an unresolvable local date reports the time-data cause",
    causesOf({ ...base, datetime_iso: "2027-01-01T20:00:00Z", timezone: "" }).has(CAUSES.TIME_DATA)
  );
  assert(
    "a resolvable numeric-offset date does NOT report a time-data cause",
    !causesOf({ ...base, datetime_iso: "2027-01-01T20:00:00-05:00", timezone: "" }).has(CAUSES.TIME_DATA)
  );
  assert(
    "a disabled lane reports the not-configured cause",
    causesOf(base, {}, (slug) => slug !== "seatgeek").has(CAUSES.NOT_CONFIGURED)
  );
  assert("run evidence of an ambiguous match is reported as such", causesOf(base, { seatgeek: CAUSES.AMBIGUOUS }).has(CAUSES.AMBIGUOUS));
  assert("run evidence of no listing is reported as such", causesOf(base, { seatgeek: CAUSES.NO_LISTING }).has(CAUSES.NO_LISTING));
  assert(
    "a lane with a not_listed provenance status reports no-listing without any log",
    causesOf({ ...base, provider_links: { ...base.provider_links, seatgeek: { verified: false, availability_status: "not_listed" } } }).has(CAUSES.NO_LISTING)
  );
  assert("a lane with no record at all reports unprocessed", causesOf(base).has(CAUSES.UNPROCESSED));
  assert(
    "a broken stored URL reports the URL-shape cause",
    causesOf({ ...base, seatgeek_url: "https://seatgeek.com/performers/1", provider_links: { ...base.provider_links, seatgeek: { verified: true } } }).has(CAUSES.URL_SHAPE)
  );
  assert("every cause code has a label", Object.values(CAUSES).every((cause) => Boolean(CAUSE_LABELS[cause])));

  // Log parsing.
  const verifyLog = [
    "| showId | artist | action | SeatGeek id | url | notes |",
    "| --- | --- | --- | --- | --- | --- |",
    "| ok-1 | a | verify (applied) | 1 | https://seatgeek.com/x/concert/1 | - |",
    "| none-1 | a | none | - | - | no qualifying SeatGeek listing (may not be listed) |",
    "| conflict-1 | a | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |"
  ].join("\n");
  const parsed = parseProviderLog(verifyLog, "seatgeek", "outcome-table");
  assert("a successful verify contributes no cause", !parsed.has("ok-1"));
  assert("a no-qualifying-listing row is parsed", parsed.get("none-1")?.seatgeek === CAUSES.NO_LISTING);
  assert("a conflict row is parsed as ambiguous", parsed.get("conflict-1")?.seatgeek === CAUSES.AMBIGUOUS);
  const enrichLog = [
    "| showId | artist | date | city | reason | best candidate |",
    "| --- | --- | --- | --- | --- | --- |",
    "| cap-1 | a | 2027-01-01 | X | api_call_limit_not_checked |  |",
    "| empty-1 | a | 2027-01-01 | X | no_candidates_returned |  |"
  ].join("\n");
  const parsedEnrich = parseProviderLog(enrichLog, "seatgeek", "enrichment-log");
  assert("an API-cap row is parsed as unprocessed", parsedEnrich.get("cap-1")?.seatgeek === CAUSES.UNPROCESSED);
  assert("a zero-candidate row is parsed as no listing", parsedEnrich.get("empty-1")?.seatgeek === CAUSES.NO_LISTING);
  assert("a non-table log contributes nothing", parseProviderLog("# Heading\n\nsome prose\n", "seatgeek", "outcome-table").size === 0);
  assert("an empty log contributes nothing", parseProviderLog("", "seatgeek", "outcome-table").size === 0);
  // A stale pre-API skip must not be read as a provider outcome — least of all
  // as an ambiguous MATCH, which "unambiguous local date" literally contains.
  assert("an unresolvable-local-date skip is not provider evidence", outcomeToCause("datetime_iso/timezone cannot resolve to an unambiguous local date — never guessed") === "");
  assert("a past-event skip is not provider evidence", outcomeToCause("event is in the past — nothing to maintain") === "");
  assert("a missing-registry skip is not provider evidence", outcomeToCause("artist has no verified provider-identity registry entry") === "");
  assert("a real ambiguity note is still recognised", outcomeToCause("ambiguous: 2 qualifying SeatGeek events in the window") === CAUSES.AMBIGUOUS);
  assert("a conflict action is still recognised", outcomeToCause("conflict") === CAUSES.AMBIGUOUS);
  assert(
    "a stale pre-API skip leaves the lane reported as unprocessed, from live data",
    (() => {
      const staleLog = [
        "| showId | artist | reason |",
        "| --- | --- | --- |",
        "| e1 | ok-artist | datetime_iso/timezone cannot resolve to an unambiguous local date — never guessed |"
      ].join("\n");
      const stale = parseProviderLog(staleLog, "vivid-seats", "outcome-table");
      return stale.size === 0 && causesOf(base, Object.fromEntries(Object.entries(stale.get("e1") || {}))).has(CAUSES.UNPROCESSED);
    })()
  );

  // Aggregation + the validation contract.
  const now = Date.parse("2026-08-08T00:00:00Z");
  const analysis = analyse([
    { ...base, id: "u-two", seatgeek_url: sgUrl, provider_links: { ...base.provider_links, seatgeek: { verified: true, url: sgUrl } } },
    { ...base, id: "u-one" },
    { ...base, id: "u-zero", verification_status: "needs_recheck" },
    { ...base, id: "past-zero", datetime_iso: "2026-01-01T20:00:00Z", verification_status: "needs_recheck" }
  ], allConfigured, new Map(), now);
  assert("past events are outside the report", analysis.upcoming === 3);
  assert("the distribution buckets 0/1/2", analysis.distribution["0"] === 1 && analysis.distribution["1"] === 1 && analysis.distribution["2"] === 1);
  assert("zero-link upcoming events are collected", analysis.zeroLink.map((row) => row.event.id).join(",") === "u-zero");
  assert("one-link upcoming events are collected separately", analysis.oneLink.map((row) => row.event.id).join(",") === "u-one");
  assert("low coverage is the union of the two", analysis.lowCoverage.length === 2);
  assert("low coverage groups by artist", analysis.byArtist[0][0] === "ok-artist" && analysis.byArtist[0][1] === 2);
  assert("low coverage groups by country", analysis.byCountry[0][0] === "United States");
  assert("low coverage groups by cause", analysis.byCause.some(([cause]) => cause === CAUSES.NEEDS_RECHECK));
  const threePlus = analyse([{
    ...base, id: "u-three", seatgeek_url: sgUrl, vividseats_url: vsUrl, ticketnetwork_url: tnUrl,
    provider_links: { ticketmaster: { verified: true }, seatgeek: { verified: true }, "vivid-seats": { verified: true }, ticketnetwork: { verified: true } }
  }], allConfigured, new Map(), now);
  assert("four lanes land in the 3+ bucket", threePlus.distribution["3+"] === 1);

  // Owner recheck review.
  const review = recheckReview([
    { ...base, id: "r-1", verification_status: "needs_recheck", seatgeek_url: sgUrl, provider_links: { seatgeek: { verified: true, url: sgUrl } } },
    { ...base, id: "r-2", verification_status: "needs_recheck" },
    { ...base, id: "r-3" },
    { ...base, id: "r-past", verification_status: "needs_recheck", datetime_iso: "2026-01-01T20:00:00Z" }
  ], allConfigured, now);
  assert("only upcoming needs_recheck rows are listed", review.map((row) => row.showId).sort().join(",") === "r-1,r-2");
  assert("the fully suppressed row sorts first", review[0].showId === "r-2");
  assert("the stored Ticketmaster destination is shown for review", review[0].ticketmaster_url === base.ticketmaster_url);
  assert("independently verified providers are named", review.find((row) => row.showId === "r-1").independently_verified_providers.join(",") === "SeatGeek");
  assert("a fully suppressed row names none", review.find((row) => row.showId === "r-2").independently_verified_providers.length === 0);
  assert("the review changes no state", review.every((row) => typeof row.publishable_cta_count === "number"));

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Output ─────────────────────────────────────────────────────────────────

function describeEvent(event) {
  return [
    String(event?.id || ""),
    `${String(event?.artist_slug || "?")} · ${String(event?.datetime_iso || "?").slice(0, 10)} · ${String(event?.city || "?")}, ${String(event?.country || "?")} · ${String(event?.venue || "?")}`
  ];
}

function printHuman(analysis, options) {
  const { distribution } = analysis;
  console.log("Exact-event ticket-link coverage (mirrors the show-card CTA gate)\n");
  console.log(`  upcoming events: ${analysis.upcoming} of ${analysis.total} reviewed records`);
  console.log(`  publishable exact-event CTAs per upcoming event:`);
  console.log(`    0 links : ${distribution["0"]}   ${distribution["0"] ? "← FAIL: these dates lead nowhere" : ""}`);
  console.log(`    1 link  : ${distribution["1"]}   ${distribution["1"] ? "← warning: a single provider is not a comparison" : ""}`);
  console.log(`    2 links : ${distribution["2"]}`);
  console.log(`    3+ links: ${distribution["3+"]}`);

  if (!analysis.lowCoverage.length) {
    console.log("\nNo upcoming event has fewer than two publishable exact-event CTAs.");
    return;
  }

  console.log(`\nLow-coverage upcoming events (0 or 1 link): ${analysis.lowCoverage.length}`);
  console.log("\n  by artist:");
  for (const [artist, count] of analysis.byArtist) console.log(`    ${String(count).padStart(4)}  ${artist}`);
  console.log("\n  by country:");
  for (const [country, count] of analysis.byCountry) console.log(`    ${String(count).padStart(4)}  ${country}`);
  console.log("\n  by cause (an event can have more than one blocked lane):");
  for (const [cause, count] of analysis.byCause) console.log(`    ${String(count).padStart(4)}  ${CAUSE_LABELS[cause] || cause}`);

  if (analysis.zeroLink.length) {
    console.log("\n  ZERO-LINK upcoming events:");
    for (const row of analysis.zeroLink) {
      const [id, detail] = describeEvent(row.event);
      console.log(`    ${id}\n      ${detail}`);
      for (const blocker of row.blocked) console.log(`      - ${blocker.provider}: ${blocker.detail}`);
    }
  }

  if (options.verbose && analysis.oneLink.length) {
    console.log("\n  ONE-LINK upcoming events (reported, not a failure):");
    for (const row of analysis.oneLink) {
      const [id, detail] = describeEvent(row.event);
      console.log(`    ${id}\n      ${detail}\n      publishing: ${row.publishing.join(", ") || "none"}`);
      for (const blocker of row.blocked) console.log(`      - ${blocker.provider}: ${blocker.detail}`);
    }
  } else if (analysis.oneLink.length) {
    console.log(`\n  ${analysis.oneLink.length} one-link event(s) — re-run with --verbose for the per-event breakdown.`);
  }
}

function printRecheckReview(review) {
  console.log("Owner review: upcoming needs_recheck records\n");
  console.log("Each row's Ticketmaster storefront link stays suppressed until a human opens the");
  console.log("stored destination and confirms it lands on that exact event. Nothing here changes");
  console.log("any state, and no tool in this pipeline restores a Ticketmaster CTA automatically.\n");
  if (!review.length) {
    console.log("No upcoming needs_recheck records.");
    return;
  }
  for (const row of review) {
    console.log(`${row.showId}`);
    console.log(`  ${row.artist} · ${row.date.slice(0, 10)} · ${row.city}, ${row.country} · ${row.venue}`);
    console.log(`  stored Ticketmaster destination: ${row.ticketmaster_url || "(none)"}${row.ticketmaster_url_shape_ok ? "" : "  [fails the redirect URL check]"}`);
    console.log(`  independently verified providers publishing now: ${row.independently_verified_providers.join(", ") || "NONE — this date currently leads nowhere"}`);
    console.log("");
  }
  console.log(`${review.length} record(s). ${review.filter((row) => !row.independently_verified_providers.length).length} with no other publishable link.`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const options = { json: false, check: false, verbose: false, recheckReview: false, selfTest: false, fromEnv: false, help: false };
  for (const arg of argv) {
    if (arg === "--json") options.json = true;
    else if (arg === "--check") options.check = true;
    else if (arg === "--verbose") options.verbose = true;
    else if (arg === "--recheck-review") options.recheckReview = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--from-env") options.fromEnv = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("See the header comment in scripts/report-link-coverage.mjs for usage.");
    return 0;
  }
  if (options.selfTest) return selfTest();

  const [events, catalog] = await Promise.all([
    fs.readFile(EVENTS_PATH, "utf8").then(JSON.parse),
    fs.readFile(CATALOG_PATH, "utf8").then(JSON.parse)
  ]);
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");
  // By default a lane the catalog marks public_enabled is treated as configured,
  // which is the deployed state recorded in PROJECT_STATUS.md. `--from-env`
  // additionally requires this shell's Impact credentials, for checking the
  // effect of a kill switch.
  const isConfigured = providerConfiguredTest(catalog, options.fromEnv ? process.env : null);

  if (options.recheckReview) {
    const review = recheckReview(events, isConfigured);
    if (options.json) console.log(JSON.stringify({ recheck_review: review }, null, 2));
    else printRecheckReview(review);
    return 0;
  }

  const evidence = await loadProviderEvidence();
  const analysis = analyse(events, isConfigured, evidence);

  if (options.json) {
    console.log(JSON.stringify({
      ok: analysis.zeroLink.length === 0,
      upcoming: analysis.upcoming,
      total: analysis.total,
      distribution: analysis.distribution,
      low_coverage: analysis.lowCoverage.length,
      by_artist: Object.fromEntries(analysis.byArtist),
      by_country: Object.fromEntries(analysis.byCountry),
      by_cause: Object.fromEntries(analysis.byCause),
      zero_link: analysis.zeroLink.map((row) => ({
        showId: row.event.id, artist: row.event.artist_slug, date: row.event.datetime_iso,
        city: row.event.city, country: row.event.country, venue: row.event.venue, blocked: row.blocked
      })),
      one_link: analysis.oneLink.map((row) => ({
        showId: row.event.id, artist: row.event.artist_slug, date: row.event.datetime_iso,
        city: row.event.city, country: row.event.country, venue: row.event.venue,
        publishing: row.publishing, blocked: row.blocked
      }))
    }, null, 2));
  } else {
    printHuman(analysis, options);
  }

  if (options.check) {
    if (analysis.zeroLink.length) {
      console.error(`\nFAIL: ${analysis.zeroLink.length} upcoming event(s) have no publishable exact-event ticket link.`);
      return 1;
    }
    if (!options.json) {
      console.log(
        analysis.oneLink.length
          ? `\nOK (with ${analysis.oneLink.length} warning(s)): every upcoming event leads somewhere; ${analysis.oneLink.length} lead to a single provider.`
          : "\nOK: every upcoming event has at least two publishable exact-event ticket links."
      );
    }
  }
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((code) => {
    process.exitCode = code;
  }).catch((error) => {
    console.error(`ERROR: ${error?.message || error}`);
    process.exitCode = 2;
  });
}
