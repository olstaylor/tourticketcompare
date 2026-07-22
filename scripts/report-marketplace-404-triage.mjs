#!/usr/bin/env node
/**
 * report-marketplace-404-triage.mjs — one-off triage report for the 2026-07-17
 * revenue-leakage review (READ-ONLY).
 *
 * The 2026-07-17 review (reports/status-history/2026-07-17-audit-reconciliation.md;
 * daily-audit rolling issue #457) lists 10 marketplace destinations that
 * return 404 but remain published
 * because their provider catalog state still says `listed`, across 4 events:
 * Ariana Grande Brooklyn 13 July, Bad Bunny Warsaw, Shakira Newark, and
 * Post Malone Kansas City. For each of those events this script reports:
 *
 *   - the event id and per-lane current URL / catalog state / verification,
 *   - the last D1 price-snapshot timestamp per lane (provider_pricing_cache),
 *   - whether an alternative verified lane exists for the same event, and
 *   - which CTAs the page currently renders (mirroring functions/[[path]].js).
 *
 * This script makes NO changes: it never writes to events.json, D1, or any
 * provider data. The snapshot lookup is a read-only SELECT via wrangler; pass
 * --skip-snapshots to run fully offline.
 *
 * The render rules below intentionally MIRROR the live renderer in
 * functions/[[path]].js (eventLinkPublishable, providerEventPublishable,
 * safeShowTicketUrl, safeSeatGeekTicketUrl, safeVividSeatsTicketUrl,
 * safeImpactMarketplaceTicketUrl). If those change, update this file to match —
 * it is a reflection of production behaviour, not a second source of truth.
 * Rendering additionally assumes the runtime provider config that /api/health
 * reports live today (Impact credentials present, public flags at defaults).
 *
 * Usage:
 *   node scripts/report-marketplace-404-triage.mjs [--json] [--skip-snapshots]
 *                                                  [--local] [--database <name>]
 *                                                  [--events <path>] [--self-test]
 *
 *   --json             Emit a machine-readable JSON report instead of text.
 *   --skip-snapshots   Do not query D1; snapshot timestamps report as unavailable.
 *   --local            Query the local wrangler D1 database instead of --remote.
 *   --database <name>  D1 database name (default tourticketcompare-demand).
 *   --events <path>    Override events.json path (default public/data/events.json).
 *   --now <ISO>        Override "now" for the future-show render window and
 *                      snapshot freshness (else TTC_TODAY or system clock).
 *   --self-test        Run built-in assertions against fixtures and exit.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const execFileAsync = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_EVENTS_PATH = join(ROOT, "public", "data", "events.json");

// ---------------------------------------------------------------------------
// Review scope — the 10 audit-404 marketplace destinations of the 2026-07-17
// review (reports/status-history/2026-07-17-audit-reconciliation.md; daily-audit
// issue #457 URL-liveness table). One-off: this is the fixed triage scope, not
// a live liveness check.
// ---------------------------------------------------------------------------
const REVIEW_SCOPE = [
  {
    eventId: "tm-ariana-grande-2026-brooklyn-30006319f34a4abb",
    label: "Ariana Grande — Barclays Center, Brooklyn, 13 July 2026",
    audit404Lanes: ["ticketnetwork", "ticket-liquidator", "stubhub-international"]
  },
  {
    eventId: "tm-bad-bunny-2026-warsaw-1844913130",
    label: "Bad Bunny — PGE Narodowy, Warsaw, 14 July 2026",
    audit404Lanes: ["ticketnetwork", "ticket-liquidator"]
  },
  {
    eventId: "tm-shakira-2026-newark-vv1aezkosgketdd_b",
    label: "Shakira — Prudential Center, Newark, 14 July 2026",
    audit404Lanes: ["ticketnetwork", "ticket-liquidator", "stubhub-international"]
  },
  {
    eventId: "tm-post-malone-2026-kansas-city-vv17bz_dgkhumcmx",
    label: "Post Malone — Kauffman Stadium, Kansas City, 15 July 2026",
    audit404Lanes: ["ticketnetwork", "ticket-liquidator"]
  }
];

// Mirrors IMPACT_MARKETPLACE_PROVIDERS / PROVIDER_DISPLAY_ORDER in
// functions/[[path]].js (keep in sync).
const MARKETPLACE_PROVIDERS = [
  { slug: "ticketnetwork", name: "TicketNetwork", urlField: "ticketnetwork_url", allowedHosts: ["ticketnetwork.com"] },
  { slug: "ticket-liquidator", name: "Ticket Liquidator", urlField: "ticketliquidator_url", allowedHosts: ["ticketliquidator.com"] },
  { slug: "stubhub-international", name: "StubHub International", urlField: "stubhub_international_url", allowedHosts: ["stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"] }
];
const LANE_ORDER = ["seatgeek", "vivid-seats", ...MARKETPLACE_PROVIDERS.map((p) => p.slug), "ticketmaster"];
const LANE_NAMES = {
  ticketmaster: "Ticketmaster",
  seatgeek: "SeatGeek",
  "vivid-seats": "Vivid Seats",
  ...Object.fromEntries(MARKETPLACE_PROVIDERS.map((p) => [p.slug, p.name]))
};
const LANE_URL_FIELDS = {
  ticketmaster: "ticketmaster_url",
  seatgeek: "seatgeek_url",
  "vivid-seats": "vividseats_url",
  ...Object.fromEntries(MARKETPLACE_PROVIDERS.map((p) => [p.slug, p.urlField]))
};

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { json: false, selfTest: false, skipSnapshots: false, remote: true, database: "tourticketcompare-demand", events: null, now: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--self-test") args.selfTest = true;
    else if (a === "--skip-snapshots") args.skipSnapshots = true;
    else if (a === "--local") args.remote = false;
    else if (a === "--database" || a === "--events" || a === "--now") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`${a} requires a value`);
      if (a === "--database") args.database = value.trim();
      else if (a === "--now") args.now = value.trim();
      else args.events = value.trim();
    } else if (a === "--help" || a === "-h") args.help = true;
    else throw new Error(`Unknown option: ${a}`);
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
  } catch {
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
  } catch {
    return null;
  }
}

function safeVividSeatsTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
    return /\/production\/\d+$/i.test(path) ? safeUrl : null;
  } catch {
    return null;
  }
}

function safeImpactMarketplaceTicketUrl(value, provider) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl || !provider) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!provider.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (!path || path === "/" || /^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
    return safeUrl;
  } catch {
    return null;
  }
}

const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventLinkPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

function providerEventPublishable(event, provider) {
  if (MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
  return eventLinkPublishable(event);
}

// Would the page render a CTA for this lane today? Mirrors the per-lane gate
// chain in functions/[[path]].js (publishability + stored-URL validation).
function laneRenders(event, lane) {
  const url = event?.[LANE_URL_FIELDS[lane]];
  if (!providerEventPublishable(event, lane)) return false;
  if (lane === "ticketmaster") return Boolean(safeShowTicketUrl(url));
  if (lane === "seatgeek") return Boolean(safeSeatGeekTicketUrl(url));
  if (lane === "vivid-seats") return Boolean(safeVividSeatsTicketUrl(url));
  const marketplace = MARKETPLACE_PROVIDERS.find((candidate) => candidate.slug === lane);
  return Boolean(marketplace && safeImpactMarketplaceTicketUrl(url, marketplace));
}

// ---------------------------------------------------------------------------
// Triage assembly
// ---------------------------------------------------------------------------
function buildLaneReport(event, scope, snapshots, nowMs) {
  return LANE_ORDER.map((lane) => {
    const link = event?.provider_links?.[lane] || {};
    const snapshot = snapshots?.get(`${event.id}:${lane}`) || null;
    const expires = Date.parse(snapshot?.expires_at || "");
    return {
      lane,
      name: LANE_NAMES[lane],
      url: String(event?.[LANE_URL_FIELDS[lane]] || "").trim() || null,
      catalog_state: link.availability_status ?? null,
      verified: link.verified === true,
      last_verified_at: link.last_verified_at ?? null,
      last_snapshot_at: snapshot?.verified_at ?? null,
      snapshot_expires_at: snapshot?.expires_at ?? null,
      snapshot_fresh: Number.isFinite(expires) && expires > nowMs,
      audit_404: scope.audit404Lanes.includes(lane),
      link_publishable: laneRenders(event, lane)
    };
  });
}

function triageEvent(event, scope, snapshots, nowMs = Date.now()) {
  const lanes = buildLaneReport(event, scope, snapshots, nowMs);
  // The renderer's show list is future-only (futureShowsForArtist filters
  // Date.parse(dateTimeISO) >= Date.now()), so a past event renders no show
  // card at all; its stored destinations stay reachable only via /api/out
  // deep links, stale caches, and browser history.
  const eventDate = Date.parse(String(event?.datetime_iso || ""));
  const in_future_render_window = Number.isFinite(eventDate) && eventDate >= nowMs;
  const dead_lanes_publishable = lanes.filter((l) => l.audit_404 && l.link_publishable).map((l) => l.lane);
  const resale_fallbacks = lanes.filter((l) => !l.audit_404 && l.link_publishable && l.lane !== "ticketmaster" && l.verified).map((l) => l.lane);
  const ticketmaster_fallback = lanes.some((l) => l.lane === "ticketmaster" && l.link_publishable);
  const linkState = resale_fallbacks.length
    ? "dead_marketplace_links_with_verified_resale_fallback"
    : ticketmaster_fallback
      ? "dead_marketplace_links_ticketmaster_plain_link_only"
      : "dead_marketplace_links_no_alternative";
  return {
    event_id: event.id,
    label: scope.label,
    artist_slug: event.artist_slug,
    venue: event.venue,
    city: event.city,
    datetime_iso: event.datetime_iso,
    verification_status: event.verification_status,
    in_future_render_window,
    renders_show_card_today: in_future_render_window && lanes.some((l) => l.link_publishable),
    lanes,
    dead_lanes_publishable,
    resale_fallbacks,
    ticketmaster_fallback,
    classification: in_future_render_window ? linkState : `past_event_not_rendered__${linkState}`
  };
}

function buildReport(events, snapshots, { missingOk = false, nowMs = Date.now() } = {}) {
  const byId = new Map(events.map((event) => [String(event?.id || ""), event]));
  const results = [];
  for (const scope of REVIEW_SCOPE) {
    const event = byId.get(scope.eventId);
    if (!event) {
      if (!missingOk) throw new Error(`Review-scope event not found in events data: ${scope.eventId}`);
      continue;
    }
    results.push(triageEvent(event, scope, snapshots, nowMs));
  }
  return results;
}

// ---------------------------------------------------------------------------
// D1 snapshot lookup (read-only SELECT via wrangler)
// ---------------------------------------------------------------------------
function snapshotSql(eventIds) {
  const list = eventIds.map((id) => `'${String(id).replaceAll("'", "''")}'`).join(", ");
  return `SELECT event_id, provider, verified_at, expires_at, updated_at FROM provider_pricing_cache WHERE event_id IN (${list});`;
}

function parseWranglerRows(stdout) {
  const start = stdout.indexOf("[");
  if (start < 0) return [];
  const payload = JSON.parse(stdout.slice(start));
  const rows = [];
  for (const block of Array.isArray(payload) ? payload : []) {
    for (const row of block?.results || []) rows.push(row);
  }
  return rows;
}

function snapshotMap(rows) {
  return new Map(rows.map((row) => [`${row.event_id}:${row.provider}`, row]));
}

async function fetchSnapshots(args) {
  const sql = snapshotSql(REVIEW_SCOPE.map((scope) => scope.eventId));
  try {
    const { stdout } = await execFileAsync(
      "npx",
      ["wrangler", "d1", "execute", args.database, args.remote ? "--remote" : "--local", "--json", "--command", sql],
      { cwd: ROOT, maxBuffer: 10 * 1024 * 1024 }
    );
    return { ok: true, map: snapshotMap(parseWranglerRows(stdout)) };
  } catch (error) {
    return { ok: false, map: null, reason: `wrangler d1 query failed: ${String(error?.message || error).split("\n")[0]}` };
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
function printText(results, snapshotStatus, nowIso) {
  console.log("Marketplace 404 triage — 2026-07-17 review scope (report only; no data written)");
  console.log(`Now: ${nowIso} | Snapshot lookup: ${snapshotStatus}`);
  console.log("Publishability mirrors functions/[[path]].js gates and assumes live runtime provider config (confirm via /api/health).");
  console.log("The renderer lists FUTURE shows only: a past event renders no show card, so its links are reachable only via /api/out deep links, stale caches, and history.\n");
  for (const result of results) {
    console.log(`## ${result.label}`);
    console.log(`   event id: ${result.event_id}  (${result.verification_status}) | event date: ${result.datetime_iso} | show card renders today: ${result.renders_show_card_today ? "YES" : "no (past event)"}`);
    for (const lane of result.lanes) {
      const flags = [
        lane.audit_404 ? "AUDIT-404" : null,
        lane.link_publishable ? "PUBLISHABLE" : "suppressed",
        lane.verified ? "verified" : "unverified"
      ].filter(Boolean).join(", ");
      console.log(`   - ${lane.name} [${flags}]`);
      console.log(`       url: ${lane.url || "(none)"}`);
      console.log(`       catalog state: ${lane.catalog_state || "(none)"} | last verified: ${lane.last_verified_at || "—"} | last snapshot: ${lane.last_snapshot_at ? `${lane.last_snapshot_at}${lane.snapshot_fresh ? " (fresh)" : " (stale — hidden)"}` : "—"}`);
    }
    const fallback = result.resale_fallbacks.length
      ? `verified resale fallback: ${result.resale_fallbacks.map((lane) => LANE_NAMES[lane]).join(", ")}`
      : result.ticketmaster_fallback
        ? "no verified resale fallback — only the plain Ticketmaster link remains"
        : "NO alternative lane is publishable";
    console.log(`   => dead lanes still link-publishable: ${result.dead_lanes_publishable.map((lane) => LANE_NAMES[lane]).join(", ") || "none"}`);
    console.log(`   => ${fallback}  [${result.classification}]\n`);
  }
}

// ---------------------------------------------------------------------------
// Self-test
// ---------------------------------------------------------------------------
function fixtureEvent(overrides = {}) {
  return {
    id: "tm-fixture-1",
    artist_slug: "raye",
    venue: "Fixture Arena",
    city: "London",
    datetime_iso: "2027-07-09T19:00:00Z",
    verification_status: "human_verified",
    ticketmaster_url: "https://www.ticketmaster.com/fixture/event/ABC123",
    seatgeek_url: "",
    vividseats_url: "https://www.vividseats.com/fixture-tickets--concerts/production/12345",
    ticketnetwork_url: "https://www.ticketnetwork.com/en/p/999",
    ticketliquidator_url: "",
    stubhub_international_url: "",
    provider_links: {
      ticketmaster: { verified: true, availability_status: "on_sale", last_verified_at: "2026-05-01" },
      seatgeek: { verified: false, availability_status: "not_checked", last_verified_at: null },
      "vivid-seats": { verified: true, availability_status: "listed", last_verified_at: "2026-07-13" },
      ticketnetwork: { verified: true, availability_status: "listed", last_verified_at: "2026-07-13" },
      "ticket-liquidator": { verified: false, availability_status: "not_checked", last_verified_at: null }
    },
    ...overrides
  };
}

function selfTest() {
  let checks = 0;
  const check = (fn) => { fn(); checks += 1; };

  // URL validators mirror the renderer: exact-event paths pass, storefront/root paths fail.
  check(() => assert.equal(safeImpactMarketplaceTicketUrl("https://www.ticketnetwork.com/en/p/999", MARKETPLACE_PROVIDERS[0]), "https://www.ticketnetwork.com/en/p/999"));
  check(() => assert.equal(safeImpactMarketplaceTicketUrl("https://www.evil.example/en/p/999", MARKETPLACE_PROVIDERS[0]), null));
  check(() => assert.equal(safeImpactMarketplaceTicketUrl("https://www.stubhub.ie/", MARKETPLACE_PROVIDERS[2]), null));
  check(() => assert.equal(safeVividSeatsTicketUrl("https://www.vividseats.com/x--concerts/production/12345"), "https://www.vividseats.com/x--concerts/production/12345"));
  check(() => assert.equal(safeVividSeatsTicketUrl("https://www.vividseats.com/performers/58365"), null));
  check(() => assert.equal(safeSeatGeekTicketUrl("https://seatgeek.com/a-tickets/x/concert/18157380"), "https://seatgeek.com/a-tickets/x/concert/18157380"));

  // Render gates: marketplace lanes require their own verified provenance;
  // needs_recheck suppresses Ticketmaster but not independently verified resale.
  const event = fixtureEvent();
  check(() => assert.equal(laneRenders(event, "ticketnetwork"), true));
  check(() => assert.equal(laneRenders(event, "ticket-liquidator"), false));
  check(() => assert.equal(laneRenders(event, "ticketmaster"), true));
  const recheck = fixtureEvent({ verification_status: "needs_recheck" });
  check(() => assert.equal(laneRenders(recheck, "ticketmaster"), false));
  check(() => assert.equal(laneRenders(recheck, "vivid-seats"), true));
  const unverifiedLane = fixtureEvent({ provider_links: { ...fixtureEvent().provider_links, ticketnetwork: { verified: false } } });
  check(() => assert.equal(laneRenders(unverifiedLane, "ticketnetwork"), false));

  // Triage classification: dead TicketNetwork with a verified Vivid fallback,
  // then with the fallback removed (plain TM link only), then no lanes at all.
  const scope = { eventId: "tm-fixture-1", label: "Fixture", audit404Lanes: ["ticketnetwork"] };
  const now = Date.parse("2026-07-16T08:00:00Z");
  const snapshots = snapshotMap([{ event_id: "tm-fixture-1", provider: "ticketnetwork", verified_at: "2026-07-16T06:00:00Z", expires_at: "2026-07-16T12:00:00Z" }]);
  const triaged = triageEvent(event, scope, snapshots, now);
  check(() => assert.deepEqual(triaged.dead_lanes_publishable, ["ticketnetwork"]));
  check(() => assert.deepEqual(triaged.resale_fallbacks, ["vivid-seats"]));
  check(() => assert.equal(triaged.classification, "dead_marketplace_links_with_verified_resale_fallback"));
  check(() => assert.equal(triaged.renders_show_card_today, true));
  const tnLane = triaged.lanes.find((lane) => lane.lane === "ticketnetwork");
  check(() => assert.equal(tnLane.last_snapshot_at, "2026-07-16T06:00:00Z"));
  check(() => assert.equal(tnLane.snapshot_fresh, true));
  const noVivid = fixtureEvent({ vividseats_url: "", provider_links: { ...fixtureEvent().provider_links, "vivid-seats": { verified: false } } });
  check(() => assert.equal(triageEvent(noVivid, scope, null, now).classification, "dead_marketplace_links_ticketmaster_plain_link_only"));
  const noTm = fixtureEvent({ ticketmaster_url: "", vividseats_url: "", provider_links: { ...fixtureEvent().provider_links, "vivid-seats": { verified: false } } });
  check(() => assert.equal(triageEvent(noTm, scope, null, now).classification, "dead_marketplace_links_no_alternative"));

  // Past events fall out of the future-only show list: nothing renders even
  // though the stored links remain publishable, and stale snapshots stay hidden.
  const past = triageEvent(event, scope, snapshots, Date.parse("2027-08-01T00:00:00Z"));
  check(() => assert.equal(past.in_future_render_window, false));
  check(() => assert.equal(past.renders_show_card_today, false));
  check(() => assert.equal(past.classification, "past_event_not_rendered__dead_marketplace_links_with_verified_resale_fallback"));
  check(() => assert.equal(past.lanes.find((lane) => lane.lane === "ticketnetwork").snapshot_fresh, false));

  // Report assembly + snapshot plumbing.
  check(() => assert.equal(buildReport([event], null, { missingOk: true }).length, 0));
  check(() => assert.throws(() => buildReport([event], null), /not found/));
  check(() => assert.match(snapshotSql(["a'b"]), /IN \('a''b'\)/));
  check(() => assert.equal(parseWranglerRows('🌀 text\n[{"results":[{"event_id":"e","provider":"p"}],"success":true}]').length, 1));

  return checks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log("Usage: node scripts/report-marketplace-404-triage.mjs [--json] [--skip-snapshots] [--local] [--database <name>] [--events <path>] [--now <ISO>] [--self-test]");
    return;
  }
  if (args.selfTest) {
    console.log(`Marketplace 404 triage self-test passed (${selfTest()} checks).`);
    return;
  }
  const nowMs = Date.parse(args.now || process.env.TTC_TODAY || "") || Date.now();
  const events = JSON.parse(readFileSync(args.events ? resolve(ROOT, args.events) : DEFAULT_EVENTS_PATH, "utf8"));
  let snapshots = null;
  let snapshotStatus = "skipped (--skip-snapshots); timestamps unavailable";
  if (!args.skipSnapshots) {
    const fetched = await fetchSnapshots(args);
    snapshots = fetched.map;
    snapshotStatus = fetched.ok
      ? `provider_pricing_cache queried via wrangler (${args.remote ? "remote" : "local"} ${args.database})`
      : `unavailable — ${fetched.reason}`;
  }
  const results = buildReport(events, snapshots, { nowMs });
  if (args.json) {
    console.log(JSON.stringify({ generated_at: new Date().toISOString(), now: new Date(nowMs).toISOString(), review: "2026-07-17 revenue leakage and data-risk review", snapshot_lookup: snapshotStatus, events: results }, null, 2));
    return;
  }
  printText(results, snapshotStatus, new Date(nowMs).toISOString());
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error?.stack || error);
    process.exitCode = 1;
  });
}

export { buildReport, laneRenders, parseWranglerRows, snapshotSql, triageEvent };
