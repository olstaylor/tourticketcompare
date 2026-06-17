#!/usr/bin/env node
/**
 * report-provider-parity.mjs — Phase 1 dry-run provider parity reporter (READ-ONLY).
 *
 * For every event in public/data/events.json, reports whether a public CTA WOULD
 * render today for Ticketmaster and SeatGeek, and — when it would not — exactly why.
 *
 * This script makes NO changes. It does not write data, does not touch the renderer
 * or functions/api/out.js, does not call any external API, and never reads or prints
 * secret values (only booleans describing whether env config is present).
 *
 * The eligibility rules below intentionally MIRROR the live renderer in
 * functions/[[path]].js (safeShowTicketUrl, safeSeatGeekTicketUrl, seatGeekOutAvailable,
 * isSeatGeekConfigured, futureShowsForArtist) and the artist indexing gate. If those
 * change, update this file to match — it is a reflection of production behaviour, not a
 * second source of truth.
 *
 * Usage:
 *   node scripts/report-provider-parity.mjs [--artist <slug>] [--limit <n>] [--json]
 *                                           [--now <ISO>] [--all] [--events <path>]
 *                                           [--artists <path>]
 *
 *   --artist <slug>   Restrict the report to a single artist slug.
 *   --limit <n>       Cap the number of events printed (text mode only).
 *   --json            Emit a machine-readable JSON summary instead of text.
 *   --now <ISO>       Override "now" for the future-date filter (else TTC_TODAY or system clock).
 *   --all             Include past events too (default reports future events only, like the renderer).
 *   --events <path>   Override events.json path (default public/data/events.json).
 *   --artists <path>  Override artists.json path (default public/data/artists.json).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { slugify } from "./lib/slugify.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

// Mirrors DISPLAY limit in functions/[[path]].js: futureShowsForArtist(events, slug, 6)
const DISPLAY_LIMIT = 6;

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { json: false, all: false, artist: null, limit: null, now: null,
    events: null, artists: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--all") args.all = true;
    else if (a === "--artist") args.artist = String(argv[++i] || "").trim();
    else if (a === "--limit") args.limit = Number.parseInt(argv[++i], 10);
    else if (a === "--now") args.now = String(argv[++i] || "").trim();
    else if (a === "--events") args.events = String(argv[++i] || "").trim();
    else if (a === "--artists") args.artists = String(argv[++i] || "").trim();
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

// ---------------------------------------------------------------------------
// Validation rules — copied to mirror functions/[[path]].js (keep in sync)
// ---------------------------------------------------------------------------
function safeShowTicketUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    if (/example/.test(host) || raw.includes("placeholder")) return null;
    return raw;
  } catch (error) {
    return null;
  }
}

function safeSeatGeekTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

// Mirrors isSeatGeekConfigured(env) in functions/[[path]].js. Reads only presence
// (booleans) from process.env — never prints secret values.
function isSeatGeekConfigured(env) {
  const baseTrackingUrl = clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048);
  const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
  const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
  const programId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
  return Boolean(baseTrackingUrl || (accountSid && authToken && programId));
}

// ---------------------------------------------------------------------------
// Data loading (read-only)
// ---------------------------------------------------------------------------
function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function asEventArray(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.events)) return raw.events;
  return [];
}

function asArtistArray(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.artists)) return raw.artists;
  return [];
}

// ---------------------------------------------------------------------------
// Eligibility evaluation
// ---------------------------------------------------------------------------
function evaluate({ events, indexableSlugs, nowMs, seatGeekConfigured, includeAll }) {
  // Group by artist + future-order so we can mirror the DISPLAY_LIMIT (top 6) slice.
  const futureRank = new Map(); // eventId -> rank within its artist's future-sorted list
  const byArtist = new Map();
  for (const ev of events) {
    const slug = slugify(ev?.artist_slug);
    if (!byArtist.has(slug)) byArtist.set(slug, []);
    byArtist.get(slug).push(ev);
  }
  for (const [, list] of byArtist) {
    const futureSorted = list
      .filter((ev) => {
        const t = Date.parse(String(ev?.datetime_iso || ev?.dateTimeISO || "").trim());
        return Number.isFinite(t) && t >= nowMs && String(ev?.id || "").trim();
      })
      .sort((a, b) =>
        Date.parse(a.datetime_iso || a.dateTimeISO) - Date.parse(b.datetime_iso || b.dateTimeISO));
    futureSorted.forEach((ev, idx) => futureRank.set(String(ev.id).trim(), idx));
  }

  const rows = [];
  for (const ev of events) {
    const id = String(ev?.id || "").trim();
    const artistSlug = slugify(ev?.artist_slug);
    const dt = String(ev?.datetime_iso || ev?.dateTimeISO || "").trim();
    const dtMs = Date.parse(dt);
    const isFuture = Number.isFinite(dtMs) && dtMs >= nowMs;
    const artistIndexable = indexableSlugs.has(artistSlug);
    const rank = futureRank.has(id) ? futureRank.get(id) : null;
    const withinDisplay = rank !== null && rank < DISPLAY_LIMIT;

    const tmValid = Boolean(safeShowTicketUrl(ev?.ticketmaster_url));
    const sgValid = Boolean(safeSeatGeekTicketUrl(ev?.seatgeek_url));

    // Ticketmaster CTA gate (mirrors renderShowCardServerHtml + futureShowsForArtist):
    //   indexable artist AND valid id AND parseable future date AND within top-6 display AND valid TM url.
    const tmReasons = [];
    if (!artistIndexable) tmReasons.push("artist_not_indexable");
    if (!id) tmReasons.push("missing_event_id");
    if (!isFuture) tmReasons.push("event_in_past_or_undated");
    if (isFuture && id && !withinDisplay) tmReasons.push("beyond_top6_display_limit");
    if (!tmValid) tmReasons.push("ticketmaster_url_invalid_or_missing");
    const tmWouldRender = tmReasons.length === 0;

    // SeatGeek CTA is nested inside a rendered TM CTA (see renderShowCardServerHtml),
    // and additionally requires a valid event-level seatgeek_url plus configured env.
    const sgReasons = [];
    if (!tmWouldRender) sgReasons.push("no_ticketmaster_cta_to_attach_to");
    if (!sgValid) sgReasons.push("seatgeek_url_invalid_or_missing");
    // URL/render eligibility independent of local env (what would render where env IS configured):
    const sgUrlEligible = tmWouldRender && sgValid;
    if (sgUrlEligible && !seatGeekConfigured) sgReasons.push("seatgeek_env_not_configured");
    const sgWouldRender = sgUrlEligible && seatGeekConfigured;

    rows.push({
      id,
      artist_slug: artistSlug,
      date: dt,
      city: String(ev?.city || "").trim(),
      venue: String(ev?.venue || "").trim(),
      isFuture,
      artistIndexable,
      ticketmaster: { wouldRender: tmWouldRender, urlValid: tmValid, reasons: tmReasons },
      seatgeek: {
        wouldRender: sgWouldRender,
        urlEligible: sgUrlEligible,
        urlValid: sgValid,
        reasons: sgReasons
      }
    });
  }

  if (!includeAll) return rows.filter((r) => r.isFuture);
  return rows;
}

function summarize(rows) {
  const tmReasonCounts = {};
  const sgReasonCounts = {};
  let tmRender = 0;
  let sgRender = 0;
  let sgUrlEligible = 0;
  for (const r of rows) {
    if (r.ticketmaster.wouldRender) tmRender++;
    else for (const reason of r.ticketmaster.reasons) tmReasonCounts[reason] = (tmReasonCounts[reason] || 0) + 1;
    if (r.seatgeek.wouldRender) sgRender++;
    if (r.seatgeek.urlEligible) sgUrlEligible++;
    if (!r.seatgeek.wouldRender) for (const reason of r.seatgeek.reasons) sgReasonCounts[reason] = (sgReasonCounts[reason] || 0) + 1;
  }
  return {
    total: rows.length,
    ticketmaster: { wouldRender: tmRender, suppressedReasons: tmReasonCounts },
    seatgeek: { wouldRender: sgRender, urlEligible: sgUrlEligible, suppressedReasons: sgReasonCounts }
  };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
function printText(rows, summary, ctx) {
  const fmtReasons = (reasons) => (reasons.length ? reasons.join(", ") : "—");
  console.log("Provider CTA parity report (READ-ONLY, dry run) — no changes made.");
  console.log(`events: ${ctx.eventsPath}`);
  console.log(`now (future filter): ${new Date(ctx.nowMs).toISOString()}${ctx.includeAll ? "  [--all: past events included]" : ""}`);
  console.log(`SeatGeek env configured locally: ${ctx.seatGeekConfigured ? "yes" : "no (URL-eligible events would render where env IS configured, e.g. production)"}`);
  console.log("");
  let shown = 0;
  for (const r of rows) {
    if (Number.isFinite(ctx.limit) && shown >= ctx.limit) break;
    shown++;
    const tm = r.ticketmaster.wouldRender ? "TM:RENDER " : "TM:hidden ";
    const sg = r.seatgeek.wouldRender
      ? "SG:RENDER "
      : r.seatgeek.urlEligible
        ? "SG:eligible"
        : "SG:hidden ";
    console.log(`${tm}${sg}  ${r.artist_slug}  ${r.date}  ${[r.city, r.venue].filter(Boolean).join(" · ")}  (${r.id})`);
    if (!r.ticketmaster.wouldRender) console.log(`           TM why: ${fmtReasons(r.ticketmaster.reasons)}`);
    if (!r.seatgeek.wouldRender) console.log(`           SG why: ${fmtReasons(r.seatgeek.reasons)}`);
  }
  console.log("");
  console.log("── Summary ─────────────────────────────────────────────");
  console.log(`events evaluated: ${summary.total}`);
  console.log(`Ticketmaster CTAs that would render: ${summary.ticketmaster.wouldRender}`);
  for (const [reason, n] of Object.entries(summary.ticketmaster.suppressedReasons).sort((a, b) => b[1] - a[1]))
    console.log(`  TM suppressed — ${reason}: ${n}`);
  console.log(`SeatGeek CTAs URL-eligible: ${summary.seatgeek.urlEligible}`);
  console.log(`SeatGeek CTAs that would render now (env-gated): ${summary.seatgeek.wouldRender}`);
  for (const [reason, n] of Object.entries(summary.seatgeek.suppressedReasons).sort((a, b) => b[1] - a[1]))
    console.log(`  SG suppressed — ${reason}: ${n}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 33).join("\n").replace(/^ \*?/gm, "").trim());
    return;
  }

  const eventsPath = args.events || resolve(REPO_ROOT, "public/data/events.json");
  const artistsPath = args.artists || resolve(REPO_ROOT, "public/data/artists.json");

  let events;
  let artists;
  try {
    events = asEventArray(loadJson(eventsPath));
    artists = asArtistArray(loadJson(artistsPath));
  } catch (error) {
    console.error(`report-provider-parity: failed to read input data: ${error.message}`);
    process.exit(2);
  }

  const indexableSlugs = new Set(
    artists
      .filter((a) => a && a.indexing_status === "indexable_with_substantial_content")
      .map((a) => slugify(a.slug))
  );

  const nowMs = args.now && Number.isFinite(Date.parse(args.now))
    ? Date.parse(args.now)
    : process.env.TTC_TODAY && Number.isFinite(Date.parse(process.env.TTC_TODAY))
      ? Date.parse(process.env.TTC_TODAY)
      : Date.now();

  const seatGeekConfigured = isSeatGeekConfigured(process.env);

  let rows = evaluate({ events, indexableSlugs, nowMs, seatGeekConfigured, includeAll: args.all });
  if (args.artist) {
    const wanted = slugify(args.artist);
    rows = rows.filter((r) => r.artist_slug === wanted);
  }

  const summary = summarize(rows);
  const ctx = { eventsPath, nowMs, seatGeekConfigured, includeAll: args.all, limit: args.limit };

  if (args.json) {
    console.log(JSON.stringify({ generated_at: new Date().toISOString(), now: new Date(nowMs).toISOString(), seatgeek_env_configured: seatGeekConfigured, summary, rows }, null, 2));
  } else {
    printText(rows, summary, ctx);
  }
}

main();
