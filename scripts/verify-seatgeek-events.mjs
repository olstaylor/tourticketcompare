#!/usr/bin/env node
//
// verify-seatgeek-events.mjs
//
// Identity-anchored SeatGeek event-link verification (owner-approved
// 2026-07-07 as part of the SeatGeek CTA sync automation — see
// SAFE_PUBLISHING_RULES.md "Discovery, Enrichment, and Rendering").
//
// What it does, per selected event of a registry-verified artist
// (data/provider-identities.json review_status "verified" with an integer
// seatgeek_performer_id):
//
//   1. If the event stores a seatgeek_url, confirm it against the SeatGeek
//      /2/events/<id> API record: the registry performer id must appear on
//      the record, the event instants must match (|Δ| ≤ 3h, UTC), the city
//      (exact/metro) and venue (containment/token overlap) must match, and
//      the URL must pass the event-URL shape validator mirrored from
//      functions/api/out.js.
//   2. On success (--apply): write verified provenance —
//      provider_links.seatgeek = { event_id, url, verified: true,
//      last_verified_at, availability_status: "listed" }. This is the flag
//      providerEventPublishable() reads: it lets the SeatGeek CTA render
//      standalone on a needs_recheck event (the recheck flag tracks the
//      Ticketmaster storefront URL, not the SeatGeek listing).
//   3. On failure or when no URL is stored, run a discovery query scoped to
//      the verified performer id (performers.id=<pid> + a ±12h UTC window
//      around the event instant). Exactly one qualifying candidate may be
//      applied; zero or ambiguous candidates are reported, never guessed.
//   4. Self-heal in the safe direction, on POSITIVE evidence only: a stored
//      URL is cleared (and previously-verified provenance un-verified) only
//      after a confirmed-gone id lookup (404/410) or a confirmed content
//      mismatch, AND a successful (HTTP 2xx) discovery query found no
//      qualifying replacement. Transient API failures (5xx/network/parse)
//      leave the event untouched; auth/config failures (401/403) abort the
//      whole run with exit 1 and no writes — an outage or expired client id
//      must never mass-clear valid links.
//
// Safety properties:
//   - Identity is anchored to the human-verified registry performer id;
//     nothing is matched by artist-name text search.
//   - Date matching compares UTC instants (SeatGeek datetime_utc vs the
//     event's datetime_iso). Events whose datetime_iso is date-only (time
//     TBA), or timezone-naive with no IANA timezone field, are SKIPPED as
//     ambiguous — never guessed. This is what catches wrong-night URL
//     mix-ups between back-to-back shows at the same venue.
//   - Dry-run by default; --apply writes events.json + the per-artist
//     partition files and refreshes the committed audit log. It never
//     touches verification_status, ticketmaster_*, or any other provider.
//   - Without SEATGEEK_CLIENT_ID the script exits safely with no writes.
//
// Usage:
//   node scripts/verify-seatgeek-events.mjs                  (dry-run report)
//   node scripts/verify-seatgeek-events.mjs --apply          (write mode)
//   node scripts/verify-seatgeek-events.mjs --artist <slug>  (filter)
//   node scripts/verify-seatgeek-events.mjs --self-test      (offline tests)
// Options: --limit N, --max-api-calls N, --delay-ms N, --recheck-days N,
//          --json, --log-path <path>

import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eventInstantMs } from "./lib/event-local-date.mjs";
import { eventMatchesArtistFilter } from "./lib/artist-filter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_PARTITIONS_DIR = path.join(REPO_ROOT, "public", "data", "events");
const REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const LOG_PATH = path.join(REPO_ROOT, "reports", "provider-sync", "seatgeek-cta-verify.md");
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const INSTANT_TOLERANCE_MS = 3 * 60 * 60 * 1000; // shows on adjacent nights are ≥ ~21h apart
const DISCOVERY_WINDOW_MS = 12 * 60 * 60 * 1000;
// Only future events are maintained: past shows render nowhere on the site
// and SeatGeek delists them after the night, so checking them is pure churn
// (every past listing 404s and would be pointlessly cleared).
const PAST_EVENT_GRACE_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RECHECK_DAYS = 3;
const DEFAULT_REQUEST_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 30000;
const RATE_LIMIT_RETRY_MS = 65000;
const RATE_LIMIT_MAX_RETRIES = 2;

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizeText(value) {
  return clean(value, 500)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Mirrors validateSeatGeekEventUrl in functions/api/out.js (fail-safe copy —
// out.js stays the runtime source of truth).
function isValidSeatGeekEventUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return false;
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return false;
  const p = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
  if (!p || p === "/") return false;
  if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(p)) return false;
  return /\/(concert|sports|theater|theatre)\/\d+$/i.test(p);
}

function seatGeekEventIdFromUrl(value) {
  const raw = clean(value, 2048);
  const match = raw.match(/\/(?:concert|sports|theater|theatre)\/(\d+)\/?$/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

// `eventInstantMs` is imported from scripts/lib/event-local-date.mjs — the one
// resolver every provider matcher shares. Its contract here is unchanged:
// date-only values (time-TBA rows) are always ambiguous, because treating them
// as midnight would let a ±3h comparison clear a valid evening listing, and a
// timezone-naive wall time is only interpreted through the event's own IANA
// timezone field. Nothing is guessed.

function candidateInstantMs(candidate) {
  const raw = clean(candidate?.datetime_utc, 100);
  if (!raw) return null;
  const parsed = new Date(/(?:Z|[+-]\d{2}:\d{2})$/i.test(raw) ? raw : `${raw}Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}

const METRO_PAIRS = new Set([
  "new york|east rutherford", "east rutherford|new york",
  "los angeles|inglewood", "inglewood|los angeles",
  "san francisco|santa clara", "santa clara|san francisco",
  "dallas|arlington", "arlington|dallas",
  "miami|miami gardens", "miami gardens|miami",
  "boston|foxborough", "foxborough|boston",
  "phoenix|glendale", "glendale|phoenix",
  "washington|landover", "landover|washington",
  "belmont park|elmont", "elmont|belmont park"
]);

function cityMatches(eventCity, candidate) {
  const eventNorm = normalizeText(eventCity);
  if (!eventNorm) return false;
  const candidateNorm = normalizeText(candidate?.venue?.city || "");
  const displayNorm = normalizeText(candidate?.venue?.display_location || "");
  if (candidateNorm && eventNorm === candidateNorm) return true;
  if (displayNorm && displayNorm.includes(eventNorm)) return true;
  return Boolean(candidateNorm && METRO_PAIRS.has(`${eventNorm}|${candidateNorm}`));
}

function textTokens(value) {
  return normalizeText(value).split(" ").filter((token) => token.length > 1);
}

function diceSimilarity(a, b) {
  const aTokens = new Set(textTokens(a));
  const bTokens = new Set(textTokens(b));
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) overlap += 1;
  }
  return (2 * overlap) / (aTokens.size + bTokens.size);
}

function containsNormalized(haystack, needle) {
  const h = ` ${normalizeText(haystack)} `;
  const n = ` ${normalizeText(needle)} `;
  return Boolean(n.trim()) && h.includes(n);
}

// Same-city, same-night, different-venue listings must not verify — venue is
// a mandatory anchor alongside instant and city. Naming variance is absorbed
// by normalization + containment/token overlap; a missing venue on either
// side fails safe.
function venueMatches(eventVenue, candidate) {
  const local = clean(eventVenue, 180);
  const remote = clean(candidate?.venue?.name, 180);
  if (!local || !remote) return false;
  if (containsNormalized(local, remote) || containsNormalized(remote, local)) return true;
  return diceSimilarity(local, remote) >= 0.5;
}

function candidatePerformerIds(candidate) {
  return Array.isArray(candidate?.performers)
    ? candidate.performers.map((performer) => performer?.id).filter((id) => Number.isInteger(id))
    : [];
}

// Evaluate one SeatGeek API event record against one local event.
// Returns { ok, reasons } — every mandatory check that fails is a reason.
function evaluateCandidate(event, candidate, performerId, eventInstant) {
  const reasons = [];
  const url = clean(candidate?.url, 2048);
  if (!isValidSeatGeekEventUrl(url)) reasons.push("candidate URL fails the event-URL shape validator");
  if (!candidatePerformerIds(candidate).includes(performerId)) {
    reasons.push(`registry performer id ${performerId} not on the SeatGeek record`);
  }
  const candidateInstant = candidateInstantMs(candidate);
  if (candidateInstant === null) {
    reasons.push("candidate has no parseable datetime_utc");
  } else if (Math.abs(candidateInstant - eventInstant) > INSTANT_TOLERANCE_MS) {
    const hours = ((candidateInstant - eventInstant) / 3600000).toFixed(1);
    reasons.push(`event instants differ by ${hours}h (tolerance ±3h) — likely a different night`);
  }
  if (!cityMatches(event.city, candidate)) {
    reasons.push(`city mismatch: '${clean(event.city)}' vs '${clean(candidate?.venue?.city)}'`);
  }
  if (!venueMatches(event.venue, candidate)) {
    reasons.push(`venue mismatch: '${clean(event.venue)}' vs '${clean(candidate?.venue?.name)}'`);
  }
  const status = clean(candidate?.status, 40).toLowerCase();
  if (status && status !== "normal") reasons.push(`SeatGeek status is '${status}'`);
  return { ok: reasons.length === 0, reasons, url, seatgeekId: candidate?.id ?? null };
}

// Decide what to do for one event given the verification/discovery outcome.
// Pure so the branch matrix is testable offline. Inputs:
//   storedUrl        — the event's current seatgeek_url ("" if none)
//   storedVerified   — provider_links.seatgeek.verified === true beforehand
//   idCheck          — evaluateCandidate result for the stored-id lookup (or null);
//                      the caller passes it only for HTTP 2xx (evaluated) or a
//                      confirmed-gone 404/410 — transient failures never reach here
//   discovery        — { candidates: [evaluateCandidate-passing, distinct ids] };
//                      null when not run OR when the query failed transiently, so
//                      the clear/unverify branches are unreachable without a
//                      successful zero-candidate query
// Returns { action, url, seatgeekId, notes } where action is one of:
//   verify | add | correct | clear | unverify | none | conflict
function decideOutcome({ storedUrl, storedVerified, idCheck, discovery }) {
  if (idCheck?.ok) {
    return { action: "verify", url: storedUrl, seatgeekId: idCheck.seatgeekId, notes: [] };
  }
  const notes = idCheck ? idCheck.reasons.map((reason) => `stored URL failed: ${reason}`) : [];
  if (!discovery) {
    return { action: "none", url: "", seatgeekId: null, notes: [...notes, "discovery not run"] };
  }
  const passing = discovery.candidates;
  if (passing.length === 1) {
    const winner = passing[0];
    if (!storedUrl) return { action: "add", url: winner.url, seatgeekId: winner.seatgeekId, notes };
    return { action: "correct", url: winner.url, seatgeekId: winner.seatgeekId, notes };
  }
  if (passing.length > 1) {
    const conflictNotes = [...notes, `ambiguous: ${passing.length} qualifying SeatGeek events in the window`];
    if (storedUrl) return { action: "clear", url: "", seatgeekId: null, notes: conflictNotes };
    return { action: "conflict", url: "", seatgeekId: null, notes: conflictNotes };
  }
  // Zero qualifying candidates.
  if (storedVerified) return { action: "unverify", url: "", seatgeekId: null, notes: [...notes, "previously verified record no longer matches"] };
  if (storedUrl) return { action: "clear", url: "", seatgeekId: null, notes: [...notes, "no qualifying replacement found"] };
  return { action: "none", url: "", seatgeekId: null, notes: [...notes, "no qualifying SeatGeek listing (may not be listed)"] };
}

// Mutate one event in place per the decided outcome (apply mode). Only
// seatgeek_url and provider_links.seatgeek are ever touched.
function applyOutcomeToEvent(event, outcome, today) {
  if (!event.provider_links || typeof event.provider_links !== "object") event.provider_links = {};
  const existing = (typeof event.provider_links.seatgeek === "object" && event.provider_links.seatgeek) || {};
  if (outcome.action === "verify" || outcome.action === "add" || outcome.action === "correct") {
    event.seatgeek_url = outcome.url;
    event.provider_links.seatgeek = {
      ...existing,
      event_id: outcome.seatgeekId,
      url: outcome.url,
      verified: true,
      last_verified_at: today,
      availability_status: "listed"
    };
    return true;
  }
  if (outcome.action === "clear" || outcome.action === "unverify") {
    event.seatgeek_url = "";
    event.provider_links.seatgeek = {
      ...existing,
      event_id: null,
      url: null,
      verified: false,
      last_verified_at: null,
      availability_status: "needs_recheck"
    };
    return true;
  }
  return false;
}

function isoDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function daysSince(dateString, now = new Date()) {
  const then = new Date(`${clean(dateString, 10)}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return Infinity;
  return (now.getTime() - then.getTime()) / 86400000;
}

// Selection policy: FUTURE events only (see PAST_EVENT_GRACE_MS) among:
// needs_recheck events, events holding an unverified seatgeek_url
// (provenance backfill), and stale verified provenance.
function selectEvents(events, registryBySlug, options, now = new Date()) {
  const selected = [];
  const skipped = [];
  for (const event of events) {
    const slug = clean(event?.artist_slug, 120);
    // Same `--artist` semantics as the enrichment lane (scripts/lib/artist-filter.mjs):
    // an exact artist slug or artist name, never a substring.
    if (!eventMatchesArtistFilter(event, options.artist)) continue;
    const status = clean(event?.verification_status, 64).toLowerCase();
    const storedUrl = clean(event?.seatgeek_url, 2048);
    const sgLink = event?.provider_links?.seatgeek;
    const verified = sgLink?.verified === true;
    const stale = verified && daysSince(sgLink?.last_verified_at, now) >= options.recheckDays;
    const wanted = status === "needs_recheck" || (storedUrl && !verified) || stale;
    if (!wanted) continue;
    const registry = registryBySlug.get(slug);
    if (!registry || clean(registry.review_status) !== "verified" || !Number.isInteger(registry.seatgeek_performer_id)) {
      skipped.push({ event, reason: "artist has no verified registry seatgeek_performer_id" });
      continue;
    }
    const instant = eventInstantMs(event);
    if (instant === null) {
      skipped.push({ event, reason: "datetime_iso is date-only or timezone-ambiguous — never guessed" });
      continue;
    }
    if (instant < now.getTime() - PAST_EVENT_GRACE_MS) {
      skipped.push({ event, reason: "event is in the past — SeatGeek delists finished shows; nothing to maintain" });
      continue;
    }
    selected.push(event);
  }
  return { selected: options.limit === null ? selected : selected.slice(0, options.limit), skipped };
}

// ─── API access (curl, same pattern as enrich-seatgeek-events.mjs) ─────────

function httpsJson(url) {
  return new Promise((resolve, reject) => {
    execFile(
      "curl",
      ["--silent", "--show-error", "--location", "--max-time", String(Math.ceil(REQUEST_TIMEOUT_MS / 1000)), "--write-out", "\n%{http_code}", url],
      { maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(clean(stderr || error.message, 300)));
          return;
        }
        const markerIndex = stdout.lastIndexOf("\n");
        const body = markerIndex >= 0 ? stdout.slice(0, markerIndex) : stdout;
        const status = Number.parseInt(markerIndex >= 0 ? stdout.slice(markerIndex + 1).trim() : "0", 10) || 0;
        let payload = null;
        try {
          payload = body ? JSON.parse(body) : null;
        } catch {
          if (status >= 200 && status < 300) {
            reject(new Error(`SeatGeek API JSON parse failed after HTTP ${status}`));
            return;
          }
        }
        resolve({ status, ok: status >= 200 && status < 300, payload });
      }
    );
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pacedRequest(url, options, runState) {
  if (options.maxApiCalls !== null && runState.apiCalls >= options.maxApiCalls) {
    return { stopped: true, stopReason: "api_call_limit_reached" };
  }
  if (options.delayMs > 0) await sleep(options.delayMs);
  runState.apiCalls += 1;
  let response = await httpsJson(url);
  let retries = 0;
  while (response.status === 429 && retries < RATE_LIMIT_MAX_RETRIES) {
    retries += 1;
    runState.rateLimitResponses += 1;
    await sleep(RATE_LIMIT_RETRY_MS * retries);
    response = await httpsJson(url);
  }
  if (response.status === 429) {
    runState.rateLimitResponses += 1;
    return { stopped: true, stopReason: "rate_limited" };
  }
  return response;
}

function eventByIdUrl(seatgeekId, clientId) {
  return `${SEATGEEK_EVENTS_ENDPOINT}/${seatgeekId}?${new URLSearchParams({ client_id: clientId })}`;
}

function discoveryUrl(performerId, eventInstant, clientId) {
  const params = new URLSearchParams({
    client_id: clientId,
    per_page: "25",
    "performers.id": String(performerId),
    "datetime_utc.gte": new Date(eventInstant - DISCOVERY_WINDOW_MS).toISOString().slice(0, 19),
    "datetime_utc.lte": new Date(eventInstant + DISCOVERY_WINDOW_MS).toISOString().slice(0, 19)
  });
  return `${SEATGEEK_EVENTS_ENDPOINT}?${params.toString()}`;
}

// ─── Partition sync ─────────────────────────────────────────────────────────

async function syncPartitions(events, changedIds) {
  const changedFiles = new Set();
  const bySlug = new Map();
  for (const event of events) {
    if (!changedIds.has(event.id)) continue;
    const slug = clean(event.artist_slug, 120);
    if (!slug) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug).set(event.id, event);
  }
  for (const [slug, updates] of bySlug) {
    const partitionPath = path.join(EVENTS_PARTITIONS_DIR, `${slug}.json`);
    let raw;
    try {
      raw = await fs.readFile(partitionPath, "utf8");
    } catch {
      continue;
    }
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) continue;
    let changed = false;
    for (let i = 0; i < rows.length; i += 1) {
      const update = updates.get(rows[i]?.id);
      if (update) {
        rows[i] = update;
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(partitionPath, `${JSON.stringify(rows, null, 2)}\n`);
      changedFiles.add(path.relative(REPO_ROOT, partitionPath));
    }
  }
  return [...changedFiles];
}

// ─── Reporting ──────────────────────────────────────────────────────────────

function markdownCell(value) {
  return String(Array.isArray(value) ? value.join("; ") : value ?? "").replace(/\s+/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function renderLog(results, skipped, summary) {
  const lines = [
    "# SeatGeek CTA verification log",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the",
    "registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match",
    "(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.",
    "",
    "## Run summary",
    "",
    `- Mode: ${summary.mode}`,
    `- Events selected: ${summary.selected} (needs_recheck: ${summary.selected_needs_recheck}, provenance backfill: ${summary.selected_backfill}, stale re-check: ${summary.selected_recheck})`,
    `- Events skipped before API checks: ${summary.preskipped}`,
    `- API calls made: ${summary.api_calls}`,
    `- Verified provenance written: ${summary.verified}`,
    `- URLs added: ${summary.added}`,
    `- URLs corrected: ${summary.corrected}`,
    `- URLs cleared: ${summary.cleared}`,
    `- Provenance un-verified: ${summary.unverified}`,
    `- Conflicts (ambiguous, untouched): ${summary.conflicts}`,
    `- No qualifying listing: ${summary.no_candidates}`,
    `- Transient API errors (untouched, retried next run): ${summary.api_errors}`,
    `- Stopped early: ${summary.stop_reason || "no"}`,
    "",
    "## Outcomes",
    "",
    "| showId | artist | action | SeatGeek id | url | notes |",
    "| --- | --- | --- | --- | --- | --- |",
    ...results.map((row) => `| ${markdownCell(row.showId)} | ${markdownCell(row.artist)} | ${markdownCell(row.action + (row.applied ? " (applied)" : ""))} | ${markdownCell(row.seatgeekId)} | ${markdownCell(row.url)} | ${markdownCell(row.notes)} |`),
    "",
    "## Skipped before API checks",
    "",
    ...(skipped.length
      ? ["| showId | artist | reason |", "| --- | --- | --- |", ...skipped.map((row) => `| ${markdownCell(row.event.id)} | ${markdownCell(row.event.artist_slug)} | ${markdownCell(row.reason)} |`)]
      : ["- None"]),
    ""
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });

  // URL shape + id extraction
  assert("valid concert URL accepted", isValidSeatGeekEventUrl("https://seatgeek.com/x-tickets/city-venue-2026-12-20-7-pm/concert/18211723"));
  assert("performer URL rejected", !isValidSeatGeekEventUrl("https://seatgeek.com/performers/123"));
  assert("http rejected", !isValidSeatGeekEventUrl("http://seatgeek.com/x/concert/1"));
  assert("event id extracted", seatGeekEventIdFromUrl("https://seatgeek.com/x/concert/18211723") === 18211723);

  // Instant resolution
  assert("zoned datetime parsed", eventInstantMs({ datetime_iso: "2026-12-21T03:00:00Z" }) === Date.parse("2026-12-21T03:00:00Z"));
  assert("naive datetime without timezone is ambiguous", eventInstantMs({ datetime_iso: "2026-07-06T20:00:00" }) === null);
  assert("date-only datetime is ambiguous even with a timezone", eventInstantMs({ datetime_iso: "2026-07-06", timezone: "America/New_York" }) === null);
  assert("date-only datetime without timezone is ambiguous", eventInstantMs({ datetime_iso: "2026-07-06" }) === null);
  assert(
    "naive datetime with IANA timezone resolves to venue-local instant",
    eventInstantMs({ datetime_iso: "2026-07-06T20:00:00", timezone: "America/New_York" }) === Date.parse("2026-07-07T00:00:00Z")
  );

  // Candidate evaluation — modeled on the real Las Vegas wrong-night pair:
  // the Dec 19 local show (2026-12-20T03:00:00Z) must NOT verify against the
  // Dec 20 local SeatGeek listing (datetime_utc 2026-12-21T03:00:00).
  const pid = 793855;
  const dec20LocalListing = {
    id: 18211723,
    url: "https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723",
    datetime_utc: "2026-12-21T03:00:00",
    venue: { name: "T-Mobile Arena", city: "Las Vegas", display_location: "Las Vegas, NV" },
    performers: [{ id: pid }]
  };
  const dec19Row = { city: "Las Vegas", venue: "T-Mobile Arena" };
  const wrongNight = evaluateCandidate(dec19Row, dec20LocalListing, pid, Date.parse("2026-12-20T03:00:00Z"));
  assert("wrong-night stored URL rejected", !wrongNight.ok && wrongNight.reasons.some((reason) => reason.includes("different night")));
  const rightNight = evaluateCandidate(dec19Row, dec20LocalListing, pid, Date.parse("2026-12-21T03:00:00Z"));
  assert("right-night listing verifies", rightNight.ok);
  assert("performer mismatch rejected", !evaluateCandidate(dec19Row, dec20LocalListing, 999999, Date.parse("2026-12-21T03:00:00Z")).ok);
  assert("city mismatch rejected", !evaluateCandidate({ ...dec19Row, city: "Reno" }, dec20LocalListing, pid, Date.parse("2026-12-21T03:00:00Z")).ok);
  assert(
    "metro city accepted",
    evaluateCandidate({ city: "Inglewood", venue: "Kia Forum" }, { ...dec20LocalListing, venue: { name: "Kia Forum", city: "Los Angeles", display_location: "Los Angeles, CA" } }, pid, Date.parse("2026-12-21T03:00:00Z")).ok
  );
  assert("cancelled status rejected", !evaluateCandidate(dec19Row, { ...dec20LocalListing, status: "cancelled" }, pid, Date.parse("2026-12-21T03:00:00Z")).ok);
  // Same city + same night at a DIFFERENT venue must not verify.
  const otherVenue = { ...dec20LocalListing, venue: { ...dec20LocalListing.venue, name: "Allegiant Stadium" } };
  const venueMismatch = evaluateCandidate(dec19Row, otherVenue, pid, Date.parse("2026-12-21T03:00:00Z"));
  assert("same-city different-venue rejected", !venueMismatch.ok && venueMismatch.reasons.some((reason) => reason.includes("venue mismatch")));
  assert("missing local venue fails safe", !evaluateCandidate({ city: "Las Vegas", venue: "" }, dec20LocalListing, pid, Date.parse("2026-12-21T03:00:00Z")).ok);
  assert("venue naming variance tolerated", venueMatches("Toyota Center - TX", { venue: { name: "Toyota Center" } }));

  // Decision matrix
  const good = { ok: true, reasons: [], url: dec20LocalListing.url, seatgeekId: 18211723 };
  const bad = { ok: false, reasons: ["event instants differ by 24.0h (tolerance ±3h) — likely a different night"], url: dec20LocalListing.url, seatgeekId: 18211723 };
  assert("stored URL verifies", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: good, discovery: null }).action === "verify");
  assert("failed stored URL + one candidate corrects", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: bad, discovery: { candidates: [{ ...good, seatgeekId: 999, url: "https://seatgeek.com/x/concert/999" }] } }).action === "correct");
  assert("failed stored URL + no candidates clears", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: bad, discovery: { candidates: [] } }).action === "clear");
  assert("no stored URL + one candidate adds", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [good] } }).action === "add");
  assert("no stored URL + no candidates is none", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [] } }).action === "none");
  assert("ambiguous candidates conflict", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [good, { ...good, seatgeekId: 2 }] } }).action === "conflict");
  assert("previously verified + gone unverifies", decideOutcome({ storedUrl: good.url, storedVerified: true, idCheck: bad, discovery: { candidates: [] } }).action === "unverify");

  // Write shape (must satisfy scripts/validate-events.py provider-links rules)
  const today = "2026-07-07";
  const eventToVerify = { id: "e1", seatgeek_url: good.url, provider_links: { seatgeek: { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: "not_checked" } } };
  applyOutcomeToEvent(eventToVerify, { action: "verify", url: good.url, seatgeekId: 18211723, notes: [] }, today);
  const written = eventToVerify.provider_links.seatgeek;
  assert("verify writes provenance", written.verified === true && written.url === eventToVerify.seatgeek_url && written.event_id === 18211723 && written.last_verified_at === today && written.availability_status === "listed");
  const eventToClear = { id: "e2", seatgeek_url: good.url, provider_links: { seatgeek: { verified: true, url: good.url, event_id: 18211723, last_verified_at: "2026-07-01", availability_status: "listed" } } };
  applyOutcomeToEvent(eventToClear, { action: "unverify", url: "", seatgeekId: null, notes: [] }, today);
  assert("unverify clears url and provenance", eventToClear.seatgeek_url === "" && eventToClear.provider_links.seatgeek.verified === false && eventToClear.provider_links.seatgeek.last_verified_at === null);
  assert("none action writes nothing", applyOutcomeToEvent({ id: "e3" }, { action: "none", url: "", seatgeekId: null, notes: [] }, today) === false);

  // Selection policy
  const registryBySlug = new Map([["ok-artist", { slug: "ok-artist", review_status: "verified", seatgeek_performer_id: 42 }]]);
  const selOptions = { artist: "", limit: null, recheckDays: DEFAULT_RECHECK_DAYS };
  const now = new Date("2026-07-07T12:00:00Z");
  const base = { artist_slug: "ok-artist", datetime_iso: "2026-09-01T00:00:00Z", city: "X" };
  const selection = selectEvents([
    { ...base, id: "s0", verification_status: "needs_recheck", datetime_iso: "2026-05-15T22:30:00Z", seatgeek_url: "https://seatgeek.com/x/concert/9" },
    { ...base, id: "s1", verification_status: "needs_recheck" },
    { ...base, id: "s2", verification_status: "machine_high_confidence", seatgeek_url: "https://seatgeek.com/x/concert/1" },
    { ...base, id: "s3", verification_status: "machine_high_confidence", seatgeek_url: "https://seatgeek.com/x/concert/2", provider_links: { seatgeek: { verified: true, url: "https://seatgeek.com/x/concert/2", last_verified_at: "2026-07-06" } } },
    { ...base, id: "s4", verification_status: "machine_high_confidence", seatgeek_url: "https://seatgeek.com/x/concert/3", provider_links: { seatgeek: { verified: true, url: "https://seatgeek.com/x/concert/3", last_verified_at: "2026-06-01" } } },
    { ...base, id: "s5", verification_status: "machine_high_confidence" },
    { ...base, id: "s6", verification_status: "needs_recheck", datetime_iso: "2026-09-01T20:00:00" },
    { id: "s7", artist_slug: "unknown-artist", verification_status: "needs_recheck", datetime_iso: "2026-09-01T00:00:00Z" }
  ], registryBySlug, selOptions, now);
  const selectedIds = selection.selected.map((event) => event.id);
  assert("needs_recheck selected", selectedIds.includes("s1"));
  assert("unverified stored URL selected for backfill", selectedIds.includes("s2"));
  assert("fresh provenance not re-checked", !selectedIds.includes("s3"));
  assert("stale provenance re-checked", selectedIds.includes("s4"));
  assert("publishable event without URL not selected", !selectedIds.includes("s5"));
  assert("ambiguous datetime skipped with reason", selection.skipped.some((row) => row.event.id === "s6" && row.reason.includes("ambiguous")));
  assert("unregistered artist skipped with reason", selection.skipped.some((row) => row.event.id === "s7"));
  assert("past event skipped, never touched", !selectedIds.includes("s0") && selection.skipped.some((row) => row.event.id === "s0" && row.reason.includes("past")));

  // --artist semantics, shared with the enrichment lane: exact slug or exact
  // artist name, never a substring.
  const filterRows = [
    { ...base, id: "f1", artist_name: "OK Artist", verification_status: "needs_recheck" },
    { ...base, id: "f2", artist_slug: "ok-artist-two", artist_name: "OK Artist Two", verification_status: "needs_recheck" }
  ];
  const bySlug = selectEvents(filterRows, registryBySlug, { ...selOptions, artist: "ok-artist" }, now).selected.map((event) => event.id);
  const byName = selectEvents(filterRows, registryBySlug, { ...selOptions, artist: "OK Artist" }, now).selected.map((event) => event.id);
  assert("artist filter matches the exact slug", bySlug.includes("f1") && !bySlug.includes("f2"));
  assert("artist filter matches the exact artist name", byName.includes("f1") && !byName.includes("f2"));
  assert("artist filter is not a substring match", !selectEvents(filterRows, registryBySlug, { ...selOptions, artist: "OK" }, now).selected.length);

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const options = {
    apply: false,
    artist: "",
    limit: null,
    delayMs: DEFAULT_REQUEST_DELAY_MS,
    maxApiCalls: null,
    recheckDays: DEFAULT_RECHECK_DAYS,
    json: false,
    logPath: LOG_PATH,
    selfTest: false,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      i += 1;
      return value;
    };
    if (arg === "--apply") options.apply = true;
    else if (arg === "--artist") options.artist = clean(next(), 120);
    else if (arg === "--limit") options.limit = Math.max(1, Number.parseInt(next(), 10) || 1);
    else if (arg === "--delay-ms") options.delayMs = Math.max(0, Number.parseInt(next(), 10) || 0);
    else if (arg === "--max-api-calls") options.maxApiCalls = Math.max(1, Number.parseInt(next(), 10) || 1);
    else if (arg === "--recheck-days") options.recheckDays = Math.max(0, Number.parseInt(next(), 10) || 0);
    else if (arg === "--json") options.json = true;
    else if (arg === "--log-path") options.logPath = path.resolve(REPO_ROOT, next());
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("See the header comment in scripts/verify-seatgeek-events.mjs for usage.");
    return 0;
  }
  if (options.selfTest) return selfTest();

  const clientId = clean(process.env.SEATGEEK_CLIENT_ID, 255);
  if (!clientId) {
    console.error("SEATGEEK_CLIENT_ID is not set — nothing checked, nothing written (safe no-op).");
    return 0;
  }

  const events = JSON.parse(await fs.readFile(EVENTS_PATH, "utf8"));
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");
  const registry = JSON.parse(await fs.readFile(REGISTRY_PATH, "utf8"));
  const registryBySlug = new Map((Array.isArray(registry?.artists) ? registry.artists : []).map((artist) => [clean(artist.slug), artist]));

  const now = new Date();
  const today = isoDate(now);
  const { selected, skipped } = selectEvents(events, registryBySlug, options, now);
  const runState = { apiCalls: 0, rateLimitResponses: 0, stopReason: "" };
  const results = [];
  const changedIds = new Set();

  for (const event of selected) {
    if (runState.stopReason) break;
    const registryEntry = registryBySlug.get(clean(event.artist_slug, 120));
    const performerId = registryEntry.seatgeek_performer_id;
    const eventInstant = eventInstantMs(event);
    const storedUrl = clean(event.seatgeek_url, 2048);
    const storedId = isValidSeatGeekEventUrl(storedUrl) ? seatGeekEventIdFromUrl(storedUrl) : null;
    const storedVerified = event?.provider_links?.seatgeek?.verified === true;

    // Clearing/un-verifying requires POSITIVE evidence: a confirmed-gone id
    // lookup (404/410) or a confirmed mismatch, plus a SUCCESSFUL (HTTP 2xx)
    // discovery query with zero qualifying candidates. Any transient failure
    // (5xx, network, parse) leaves the event untouched for the next run, and
    // an auth/config failure (401/403) aborts the whole run — a provider
    // outage or an expired client id must never mass-clear valid links.
    const transientNote = (label, status) => {
      results.push({
        showId: event.id,
        artist: event.artist_slug,
        verification_status: event.verification_status,
        action: "api_error",
        seatgeekId: null,
        url: "",
        notes: [`${label} failed with HTTP ${status || "0"} — transient; nothing written, retried next run`],
        applied: false
      });
    };

    let idCheck = null;
    if (storedId !== null) {
      const response = await pacedRequest(eventByIdUrl(storedId, clientId), options, runState);
      if (response.stopped) {
        runState.stopReason = response.stopReason;
        break;
      }
      if (response.status === 401 || response.status === 403) {
        runState.stopReason = "auth_or_config_error";
        break;
      }
      if (response.ok && response.payload) {
        idCheck = evaluateCandidate(event, response.payload, performerId, eventInstant);
      } else if (response.status === 404 || response.status === 410) {
        idCheck = { ok: false, reasons: [`SeatGeek /events/${storedId} returned HTTP ${response.status} (listing confirmed gone)`], url: storedUrl, seatgeekId: storedId };
      } else {
        transientNote(`SeatGeek /events/${storedId}`, response.status);
        continue;
      }
    }

    let discovery = null;
    if (!idCheck?.ok) {
      const response = await pacedRequest(discoveryUrl(performerId, eventInstant, clientId), options, runState);
      if (response.stopped) {
        runState.stopReason = response.stopReason;
        break;
      }
      if (response.status === 401 || response.status === 403) {
        runState.stopReason = "auth_or_config_error";
        break;
      }
      if (response.ok && Array.isArray(response.payload?.events)) {
        const seen = new Set();
        const candidates = [];
        for (const candidate of response.payload.events) {
          const evaluated = evaluateCandidate(event, candidate, performerId, eventInstant);
          if (evaluated.ok && !seen.has(evaluated.seatgeekId)) {
            seen.add(evaluated.seatgeekId);
            candidates.push(evaluated);
          }
        }
        discovery = { candidates };
      } else {
        // Transient or malformed response: decideOutcome({discovery: null})
        // returns "none" — no add, no clear, no unverify.
        transientNote("SeatGeek discovery query", response.status);
        continue;
      }
    }

    const outcome = decideOutcome({ storedUrl, storedVerified, idCheck, discovery });
    const applied = options.apply ? applyOutcomeToEvent(event, outcome, today) : false;
    if (applied) changedIds.add(event.id);
    if (outcome.action === "correct" && storedUrl) outcome.notes.push(`replaced ${storedUrl}`);
    results.push({
      showId: event.id,
      artist: event.artist_slug,
      verification_status: event.verification_status,
      action: outcome.action,
      seatgeekId: outcome.seatgeekId,
      url: outcome.url,
      notes: outcome.notes,
      applied
    });
  }

  const authFailure = runState.stopReason === "auth_or_config_error";
  if (options.apply && changedIds.size > 0 && !authFailure) {
    await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
    const partitionFiles = await syncPartitions(events, changedIds);
    console.error(`Wrote ${changedIds.size} event update(s) to events.json and ${partitionFiles.length} partition file(s). Run \`npm run events:update\` to refresh the inline fallback.`);
  } else if (authFailure && changedIds.size > 0) {
    console.error(`Auth/config failure mid-run — discarding ${changedIds.size} in-memory update(s); nothing written.`);
  }

  const count = (action) => results.filter((row) => row.action === action).length;
  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    selected: selected.length,
    selected_needs_recheck: selected.filter((event) => clean(event.verification_status).toLowerCase() === "needs_recheck").length,
    selected_backfill: selected.filter((event) => clean(event.verification_status).toLowerCase() !== "needs_recheck" && event?.provider_links?.seatgeek?.verified !== true).length,
    selected_recheck: selected.filter((event) => event?.provider_links?.seatgeek?.verified === true).length,
    preskipped: skipped.length,
    api_calls: runState.apiCalls,
    rate_limit_responses: runState.rateLimitResponses,
    verified: count("verify"),
    added: count("add"),
    corrected: count("correct"),
    cleared: count("clear"),
    unverified: count("unverify"),
    conflicts: count("conflict"),
    no_candidates: results.filter((row) => row.action === "none").length,
    api_errors: count("api_error"),
    stop_reason: runState.stopReason,
    wrote_events_json: options.apply && changedIds.size > 0 && !authFailure
  };

  await fs.writeFile(options.logPath, renderLog(results, skipped, summary));

  if (options.json) {
    console.log(JSON.stringify({ summary, results, skipped: skipped.map((row) => ({ showId: row.event.id, reason: row.reason })) }, null, 2));
  } else {
    console.log(`SeatGeek ${summary.mode} verification: ${summary.selected} selected, ${summary.verified} verified, ${summary.added} added, ${summary.corrected} corrected, ${summary.cleared} cleared, ${summary.unverified} un-verified, ${summary.conflicts} conflict(s), ${summary.no_candidates} without a qualifying listing, ${summary.preskipped} skipped pre-API.`);
    console.log(`API calls: ${summary.api_calls}${summary.stop_reason ? ` (stopped early: ${summary.stop_reason})` : ""}`);
    console.log(`Audit log: ${path.relative(REPO_ROOT, options.logPath)}`);
    for (const row of results) {
      if (row.action !== "none" || row.notes.length) {
        console.log(`  ${row.showId} [${row.verification_status}] → ${row.action}${row.applied ? " (applied)" : ""}${row.url ? ` ${row.url}` : ""}${row.notes.length ? ` — ${row.notes.join("; ")}` : ""}`);
      }
    }
  }
  if (authFailure) {
    console.error("SeatGeek API rejected the credentials (HTTP 401/403) — run aborted with no writes. Check SEATGEEK_CLIENT_ID.");
    return 1;
  }
  return 0;
}

main().then((code) => {
  process.exitCode = code;
}).catch((error) => {
  console.error(`Error: ${clean(error?.message || error, 500)}`);
  process.exitCode = 1;
});
