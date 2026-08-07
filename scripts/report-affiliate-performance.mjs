#!/usr/bin/env node
// Owner-facing commercial *performance* report: joins Impact's own affiliate
// reporting (actions, commission, order state) against TTC's own authoritative
// click count from D1 `analytics_events`.
//
// This is a different layer from `scripts/report-commercial-funnel.mjs`:
//   - report-commercial-funnel.mjs measures the on-site funnel and stops at
//     outbound_click. It never touches revenue and must not.
//   - This script starts where that one stops: it asks Impact, on the
//     account's own read-only Publisher API, what happened to those clicks —
//     orders, order state (pending/approved/reversed), and commission.
//
// `outbound_click` (this repo's own server-side redirect record) remains the
// authoritative *click* count in both reports; nothing here overrides that.
// Impact remains the sole authority for purchases and commission — this
// script only reads and reports Impact's numbers, never invents them.
//
// Impact Publisher API calls used (read-only, documented at
// https://integrations.impact.com/partner-api-reference):
//   GET /Mediapartners/{AccountSID}/Actions?ActionDateStart=...&ActionDateEnd=...
// This is the only Impact endpoint used. Two things it deliberately does NOT
// do, because the Impact Partner API does not support them:
//   - It never creates, modifies, or deletes anything in Impact (no
//     TrackingLinks POST, no write of any kind).
//   - It does not report an aggregate/list Impact-side click count. The
//     Impact Partner API's Clicks resource only retrieves one click by its
//     own ID (GET /Mediapartners/{AccountSID}/Clicks/{Id}) — there is no
//     list/filter-by-date-range endpoint. A true Impact-side click total
//     requires either the Impact dashboard UI or the async Report Export
//     job flow (`ReportExport`), which is intentionally out of scope here;
//     see "Reconciling with Impact" in docs/COMMERCIAL_FUNNEL.md.
//
// Every network call in this script is a GET against Impact's own account
// data, and every D1 statement is a SELECT. Nothing is written anywhere.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const DEFAULT_WINDOW_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";
const MAX_ACTION_WINDOW_DAYS = 45; // Impact's own documented per-request span limit.
const DEFAULT_MIN_CLICKS_FOR_RATE = 30;

function usage() {
  return `Usage: node scripts/report-affiliate-performance.mjs [options]

Owner-facing commercial performance report. Reads Impact's own read-only
Actions API (orders/commission/state per provider campaign) and joins it
against TTC's own authoritative outbound_click count from D1. Nothing is
written to Impact or to D1 — every request is a GET/SELECT.

Options:
  --days <n>            Report window in days (default: ${DEFAULT_WINDOW_DAYS})
  --since <iso-date>    Window start as YYYY-MM-DD (overrides --days)
  --until <iso-date>    Window end as YYYY-MM-DD (exclusive; defaults to now)
  --min-clicks <n>      Minimum outbound_click before a rate is reported (default: ${DEFAULT_MIN_CLICKS_FOR_RATE})
  --database <name>     D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local               Query local D1 instead of remote D1
  --json                Emit machine-readable summary JSON
  --self-test           Run local unit tests only; no network and no D1 access
  -h, --help            Show this help

Environment:
  IMPACT_SEATGEEK_ACCOUNT_SID   Required. Same Impact publisher account used by all approved lanes.
  IMPACT_SEATGEEK_AUTH_TOKEN    Required.
  IMPACT_API_BASE_URL           Optional override (default ${DEFAULT_IMPACT_API_BASE})
  IMPACT_SEATGEEK_CAMPAIGN_ID / IMPACT_SEATGEEK_PROGRAM_ID
  IMPACT_VIVIDSEATS_CAMPAIGN_ID / IMPACT_VIVIDSEATS_PROGRAM_ID
  IMPACT_TICKETNETWORK_CAMPAIGN_ID / IMPACT_TICKETNETWORK_PROGRAM_ID (default 2322)
  IMPACT_TICKETLIQUIDATOR_CAMPAIGN_ID / IMPACT_TICKETLIQUIDATOR_PROGRAM_ID (default 2085)
  IMPACT_STUBHUB_INTERNATIONAL_CAMPAIGN_ID / IMPACT_STUBHUB_INTERNATIONAL_PROGRAM_ID (default 24092)
  CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID   Required by wrangler for D1 access
  TTC_NOW                        Optional ISO timestamp override of "now" for deterministic testing

These mirror the campaign-id env vars functions/api/out.js already reads for
Impact tracking; this script never creates a tracking link, only reads
account-level reporting. Ticketmaster is never queried — it has no Impact
program and is not an affiliate provider.

Reference: docs/COMMERCIAL_FUNNEL.md
`;
}

// ── CLI parsing ──────────────────────────────────────────────────────────────

function parseIsoDate(value, flag) {
  const raw = String(value || "").trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!match) throw new Error(`${flag} requires a YYYY-MM-DD date`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`${flag} is not a real calendar date: ${raw}`);
  }
  return parsed.toISOString();
}

export function parseArgs(argv) {
  const options = {
    selfTest: false,
    days: DEFAULT_WINDOW_DAYS,
    since: "",
    until: "",
    minClicks: DEFAULT_MIN_CLICKS_FOR_RATE,
    database: DEFAULT_D1_DATABASE,
    remote: true,
    json: false,
    help: false
  };
  const positiveInt = (value, flag, min = 1) => {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < min) throw new Error(`${flag} requires an integer >= ${min}`);
    return parsed;
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--days") options.days = positiveInt(argv[++i], "--days", 0);
    else if (arg === "--since") options.since = parseIsoDate(argv[++i], "--since");
    else if (arg === "--until") options.until = parseIsoDate(argv[++i], "--until");
    else if (arg === "--min-clicks") options.minClicks = positiveInt(argv[++i], "--min-clicks", 0);
    else if (arg === "--database") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--database requires a D1 database name");
      options.database = value;
    } else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.since && options.until && options.until <= options.since) {
    throw new Error("--until must be after --since");
  }
  return options;
}

export function computeWindow(options, now = new Date()) {
  const until = options.until || "";
  if (options.since) return { since: options.since, until };
  if (!options.days) throw new Error("--days 0 (all time) is not supported here; Impact's Actions API requires a bounded date range");
  const anchor = until ? new Date(until) : now;
  return { since: new Date(anchor.getTime() - options.days * DAY_MS).toISOString(), until: until || now.toISOString() };
}

// Impact's Actions endpoint documents a maximum span per request. A wide
// operator-requested window is therefore sliced into <= MAX_ACTION_WINDOW_DAYS
// chunks and the results concatenated; this is invisible to the caller.
export function chunkDateWindow(sinceIso, untilIso, maxDays = MAX_ACTION_WINDOW_DAYS) {
  const start = new Date(sinceIso).getTime();
  const end = new Date(untilIso).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return [];
  const spanMs = maxDays * DAY_MS;
  const chunks = [];
  let cursor = start;
  while (cursor < end) {
    const chunkEnd = Math.min(cursor + spanMs, end);
    chunks.push({ start: new Date(cursor).toISOString(), end: new Date(chunkEnd).toISOString() });
    cursor = chunkEnd;
  }
  return chunks;
}

// ── Impact provider/campaign configuration ──────────────────────────────────
// Mirrors the campaign-id resolution in functions/api/out.js's impactConfig()
// so a CampaignId returned by Impact is attributed to the same provider the
// live redirect used. Ticketmaster is deliberately absent: it has no Impact
// program and /api/out never calls the Impact API for it.
const PROVIDER_CAMPAIGN_ENV = {
  seatgeek: { campaign: "IMPACT_SEATGEEK_CAMPAIGN_ID", legacy: "IMPACT_SEATGEEK_PROGRAM_ID", default: "" },
  "vivid-seats": { campaign: "IMPACT_VIVIDSEATS_CAMPAIGN_ID", legacy: "IMPACT_VIVIDSEATS_PROGRAM_ID", default: "" },
  ticketnetwork: { campaign: "IMPACT_TICKETNETWORK_CAMPAIGN_ID", legacy: "IMPACT_TICKETNETWORK_PROGRAM_ID", default: "2322" },
  "ticket-liquidator": { campaign: "IMPACT_TICKETLIQUIDATOR_CAMPAIGN_ID", legacy: "IMPACT_TICKETLIQUIDATOR_PROGRAM_ID", default: "2085" },
  "stubhub-international": { campaign: "IMPACT_STUBHUB_INTERNATIONAL_CAMPAIGN_ID", legacy: "IMPACT_STUBHUB_INTERNATIONAL_PROGRAM_ID", default: "24092" }
};

export function resolveCampaignProviderMap(env = process.env) {
  const map = new Map();
  for (const [provider, config] of Object.entries(PROVIDER_CAMPAIGN_ENV)) {
    const campaignId = String(env[config.campaign] || env[config.legacy] || config.default || "").trim();
    if (campaignId) map.set(campaignId, provider);
  }
  return map;
}

export function impactCredentials(env = process.env) {
  const accountSid = String(env.IMPACT_SEATGEEK_ACCOUNT_SID || "").trim();
  const authToken = String(env.IMPACT_SEATGEEK_AUTH_TOKEN || "").trim();
  const apiBase = String(env.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE).trim().replace(/\/+$/, "");
  return { accountSid, authToken, apiBase, configured: Boolean(accountSid && authToken) };
}

function basicAuthHeader({ accountSid, authToken }) {
  const raw = `${accountSid}:${authToken}`;
  return `Basic ${Buffer.from(raw, "utf8").toString("base64")}`;
}

// ── Impact Actions fetch + normalisation ────────────────────────────────────

const KNOWN_STATES = new Set(["PENDING", "APPROVED", "REVERSED"]);

// Extracts only the documented, low-risk fields this report actually uses.
// Anything else Impact returns is dropped rather than passed through, so an
// unexpected upstream field never ends up rendered or logged.
export function normalizeAction(raw) {
  const state = String(raw?.State || "").toUpperCase();
  const eventDate = String(raw?.EventDate || raw?.ReferringDate || "").slice(0, 10);
  return {
    id: String(raw?.Id ?? ""),
    campaignId: String(raw?.CampaignId ?? ""),
    campaignName: String(raw?.CampaignName ?? ""),
    state: KNOWN_STATES.has(state) ? state : "UNKNOWN",
    payout: Number.isFinite(Number(raw?.Payout)) ? Number(raw.Payout) : 0,
    currency: String(raw?.Currency || "").slice(0, 12) || null,
    subId1: raw?.SubId1 ? String(raw.SubId1) : null,
    day: /^\d{4}-\d{2}-\d{2}$/.test(eventDate) ? eventDate : null
  };
}

function actionsFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.Actions)) return payload.Actions;
  return [];
}

async function fetchActionsChunk(credentials, chunk) {
  const params = new URLSearchParams({
    ActionDateStart: chunk.start.slice(0, 10),
    ActionDateEnd: chunk.end.slice(0, 10)
  });
  const endpoint = `${credentials.apiBase}/Mediapartners/${encodeURIComponent(credentials.accountSid)}/Actions?${params.toString()}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: basicAuthHeader(credentials) }
  });
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = await response.json();
      if (body?.Message || body?.message) message += `: ${body.Message || body.message}`;
    } catch {
      // Non-JSON error body; the status code alone is still useful.
    }
    throw new Error(`Impact Actions request failed (${chunk.start.slice(0, 10)}..${chunk.end.slice(0, 10)}): ${message}`);
  }
  const payload = await response.json();
  return actionsFromPayload(payload).map(normalizeAction);
}

export async function fetchAllActions(credentials, window) {
  const chunks = chunkDateWindow(window.since, window.until);
  const actions = [];
  for (const chunk of chunks) {
    // Sequential, not parallel: this is an owner-run diagnostic script, not a
    // hot path, and Impact's API is not to be hammered with concurrent
    // requests against a fixed account quota.
    const chunkActions = await fetchActionsChunk(credentials, chunk);
    actions.push(...chunkActions);
  }
  return actions;
}

// ── Aggregation (pure, unit-tested by --self-test) ──────────────────────────

export function aggregateActionsByProvider(actions, campaignToProvider) {
  const byProvider = new Map();
  const unmapped = new Map();
  const get = (map, key) => {
    if (!map.has(key)) {
      map.set(key, {
        approved: { count: 0, payout: 0 },
        pending: { count: 0, payout: 0 },
        reversed: { count: 0, payout: 0 },
        unknown: { count: 0, payout: 0 },
        currency: null,
        byDay: new Map()
      });
    }
    return map.get(key);
  };
  for (const action of actions) {
    const provider = campaignToProvider.get(action.campaignId);
    const bucket = provider ? get(byProvider, provider) : get(unmapped, action.campaignId || action.campaignName || "(unknown campaign)");
    const stateKey = action.state.toLowerCase();
    const target = bucket[stateKey] || bucket.unknown;
    target.count += 1;
    target.payout += action.payout;
    if (!bucket.currency && action.currency) bucket.currency = action.currency;
    if (action.day) {
      const day = bucket.byDay.get(action.day) || { count: 0, payout: 0 };
      day.count += 1;
      if (action.state === "APPROVED" || action.state === "PENDING") day.payout += action.payout;
      bucket.byDay.set(action.day, day);
    }
  }
  return { byProvider, unmapped };
}

export function rate(numerator, denominator, minimumDenominator = 0) {
  if (!denominator || denominator < minimumDenominator) return null;
  return numerator / denominator;
}

function formatRate(value, denominator, minimum) {
  if (value === null) return denominator > 0 && denominator < minimum ? `low volume (n=${denominator})` : "n/a";
  return `${(value * 100).toFixed(3)}%`;
}

function formatMoney(value, currency) {
  return `${value.toFixed(2)}${currency ? ` ${currency}` : ""}`;
}

// ── D1 (read-only) ───────────────────────────────────────────────────────────

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

function windowClause({ since, until }, column = "created_at") {
  let clause = "";
  if (since) {
    if (!ISO_PATTERN.test(since)) throw new Error(`Refusing to interpolate non-ISO window bound: ${since}`);
    clause += ` AND ${column} >= '${since}'`;
  }
  if (until) {
    if (!ISO_PATTERN.test(until)) throw new Error(`Refusing to interpolate non-ISO window bound: ${until}`);
    clause += ` AND ${column} < '${until}'`;
  }
  return clause;
}

export function assertReadOnlySql(sql) {
  const body = sql.split("\n").filter((line) => !line.trim().startsWith("--")).join("\n").trim();
  if (!/^SELECT\b/i.test(body)) throw new Error(`Statement is not a SELECT: ${body.slice(0, 80)}`);
  if (body.replace(/;\s*$/, "").includes(";")) throw new Error("Multiple statements are not allowed in one entry");
  const forbidden = /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX)\b/i;
  if (forbidden.test(body)) throw new Error(`Statement contains a non-read-only keyword: ${body.slice(0, 80)}`);
  if (/\bemail\b/i.test(body)) throw new Error(`Statement reads the email column: ${body.slice(0, 80)}`);
  if (/\buser_agent\b/i.test(body)) throw new Error(`Statement reads the user_agent column: ${body.slice(0, 80)}`);
  if (/\brequest_key\b/i.test(body)) throw new Error(`Statement reads request_key: ${body.slice(0, 80)}`);
  return body;
}

// click_id is opaque random hex (see docs/COMMERCIAL_FUNNEL.md), not personal
// data, so it may be selected directly — that is what lets this report join a
// TTC outbound_click row to an Impact Action's SubId1 once
// OUT_CLICK_ID_SUBID_ENABLED is turned on.
export function buildD1Statements(window) {
  const since = windowClause(window, "created_at");
  return [
    {
      key: "clicksByProvider",
      sql: `SELECT COALESCE(NULLIF(TRIM(provider), ''), '(none)') AS provider, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name = 'outbound_click'${since}
GROUP BY 1`
    },
    {
      key: "clickIdRows",
      sql: `SELECT click_id, COALESCE(NULLIF(TRIM(provider), ''), '(none)') AS provider, artist_slug, event_id
FROM analytics_events
WHERE event_name = 'outbound_click' AND click_id IS NOT NULL AND TRIM(click_id) != ''${since}
LIMIT 5000`
    }
  ];
}

export function parseWranglerJson(stdout, statements) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`wrangler d1 execute did not return JSON: ${String(stdout).slice(0, 200)}`);
  }
  if (!Array.isArray(parsed) || parsed.length !== statements.length) {
    throw new Error(`Expected ${statements.length} result sets, got ${Array.isArray(parsed) ? parsed.length : typeof parsed}`);
  }
  const output = {};
  statements.forEach((statement, index) => {
    const entry = parsed[index];
    if (!entry || entry.success !== true || !Array.isArray(entry.results)) {
      throw new Error(`Query '${statement.key}' did not succeed`);
    }
    output[statement.key] = entry.results;
  });
  return output;
}

async function runD1Statements(statements, options) {
  const sql = [
    "-- Generated by scripts/report-affiliate-performance.mjs (read-only; SELECT statements only)",
    ...statements.map((statement) => `${assertReadOnlySql(statement.sql)};`),
    ""
  ].join("\n");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-affiliate-performance-"));
  const sqlPath = path.join(tempDir, "affiliate-performance.sql");
  await fs.writeFile(sqlPath, sql, "utf8");
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath, "--json"];
  try {
    const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
    return parseWranglerJson(result.stdout, statements);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

// ── Report assembly ──────────────────────────────────────────────────────────

const OUT_CLICK_ID_SUBID_ENABLED_KEY = "OUT_CLICK_ID_SUBID_ENABLED";

export function buildReport({ actionsAggregate, d1, window, options, subIdEnabled, subIdMatches = 0, subIdCandidates = 0 }) {
  const ttcClicksByProvider = new Map();
  for (const row of d1.clicksByProvider) ttcClicksByProvider.set(String(row.provider), Number(row.clicks) || 0);

  const providers = new Set([...actionsAggregate.byProvider.keys(), ...ttcClicksByProvider.keys()]);
  const byProvider = [];

  for (const provider of providers) {
    if (provider === "(none)") continue;
    const impact = actionsAggregate.byProvider.get(provider);
    const ttcClicks = ttcClicksByProvider.get(provider) || 0;
    const approved = impact?.approved || { count: 0, payout: 0 };
    const pending = impact?.pending || { count: 0, payout: 0 };
    const reversed = impact?.reversed || { count: 0, payout: 0 };
    const unknown = impact?.unknown || { count: 0, payout: 0 };
    const totalActions = approved.count + pending.count + reversed.count + unknown.count;
    const commissionEarned = approved.payout; // Only APPROVED payout is locked-in commission.
    const commissionPending = pending.payout;

    byProvider.push({
      provider,
      ttc_outbound_clicks: ttcClicks,
      impact_actions_total: totalActions,
      impact_actions_approved: approved.count,
      impact_actions_pending: pending.count,
      impact_actions_reversed: reversed.count,
      impact_actions_unknown: unknown.count,
      commission_earned_approved: commissionEarned,
      commission_pending: commissionPending,
      currency: impact?.currency || null,
      conversion_rate: rate(totalActions - reversed.count, ttcClicks, options.minClicks),
      earnings_per_click: ttcClicks > 0 ? commissionEarned / ttcClicks : null,
      trend_by_day: impact ? Array.from(impact.byDay.entries()).sort(([a], [b]) => a.localeCompare(b)) : []
    });
  }
  byProvider.sort((a, b) => b.commission_earned_approved - a.commission_earned_approved);

  return {
    window: {
      since: window.since,
      until: window.until,
      database: options.database,
      remote: options.remote,
      min_clicks_for_rate: options.minClicks
    },
    sub_id_attribution: {
      flag_enabled: subIdEnabled,
      matches: subIdMatches,
      candidates: subIdCandidates
    },
    by_provider: byProvider,
    unmapped_campaigns: Array.from(actionsAggregate.unmapped.entries()).map(([campaign, bucket]) => ({
      campaign,
      approved: bucket.approved,
      pending: bucket.pending,
      reversed: bucket.reversed
    }))
  };
}

// SubId1 on an Impact action is only meaningful once OUT_CLICK_ID_SUBID_ENABLED
// is turned on (functions/api/out.js), because that is the only code path that
// ever puts TTC's click_id on an outbound tracking URL. This join is therefore
// harmless and inert while the flag is off (it will simply find 0 candidates)
// and becomes real per-order attribution to artist/event/page the moment the
// owner enables it and Impact starts returning matching SubId1 values.
export function matchSubIdAttribution(actions, clickIdIndex) {
  const matched = [];
  let candidates = 0;
  for (const action of actions) {
    if (!action.subId1) continue;
    candidates += 1;
    const click = clickIdIndex.get(action.subId1);
    if (click) {
      matched.push({
        actionId: action.id,
        state: action.state,
        payout: action.payout,
        clickId: action.subId1,
        artistSlug: click.artist_slug || null,
        eventId: click.event_id || null,
        provider: click.provider || null
      });
    }
  }
  return { matched, candidates };
}

function renderTable(headers, rows) {
  if (!rows.length) return "(none)";
  const cells = [headers, ...rows.map((row) => row.map((value) => String(value)))];
  const widths = headers.map((_, column) => Math.max(...cells.map((row) => row[column].length)));
  return cells
    .map((row, index) => {
      const line = row.map((value, column) => value.padEnd(widths[column])).join("  ").trimEnd();
      return index === 0 ? `${line}\n${widths.map((width) => "-".repeat(width)).join("  ")}` : line;
    })
    .join("\n");
}

export function renderReport(report) {
  const lines = [];
  const windowLabel = `${report.window.since.slice(0, 10)} → ${report.window.until.slice(0, 10)}`;
  lines.push("=== Affiliate Performance Report (Impact Actions x TTC outbound_click) ===");
  lines.push(`Database: ${report.window.database} (${report.window.remote ? "remote" : "local"}) · Window: ${windowLabel}`);
  lines.push("Click counts are TTC's own outbound_click rows (authoritative, see docs/COMMERCIAL_FUNNEL.md).");
  lines.push("Actions, state and commission are Impact's own account data (Mediapartners Actions API), read-only.");
  lines.push(`Rates need >= ${report.window.min_clicks_for_rate} outbound clicks in the window.`);
  lines.push("");

  lines.push("-- By provider --");
  lines.push(renderTable(
    ["provider", "ttc_clicks", "actions", "approved", "pending", "reversed", "commission_earned", "commission_pending", "conv_rate", "epc"],
    report.by_provider.map((row) => [
      row.provider,
      row.ttc_outbound_clicks,
      row.impact_actions_total,
      row.impact_actions_approved,
      row.impact_actions_pending,
      row.impact_actions_reversed,
      formatMoney(row.commission_earned_approved, row.currency),
      formatMoney(row.commission_pending, row.currency),
      formatRate(row.conversion_rate, row.ttc_outbound_clicks, report.window.min_clicks_for_rate),
      row.ttc_outbound_clicks > 0 ? formatMoney(row.earnings_per_click, row.currency) : "n/a"
    ])
  ));
  lines.push("");

  if (report.unmapped_campaigns.length) {
    lines.push("-- Actions on campaigns not in this script's provider map (check env vars) --");
    lines.push(renderTable(
      ["campaign", "approved", "pending", "reversed"],
      report.unmapped_campaigns.map((row) => [row.campaign, row.approved.count, row.pending.count, row.reversed.count])
    ));
    lines.push("");
  }

  lines.push("-- SubId1 / click_id attribution (per-order artist/event) --");
  lines.push(`OUT_CLICK_ID_SUBID_ENABLED: ${report.sub_id_attribution.flag_enabled ? "true" : "false"}`);
  if (!report.sub_id_attribution.flag_enabled) {
    lines.push("Flag is off: no Impact action can carry a click_id SubId1 yet, so per-order artist/event");
    lines.push("attribution is not possible. See 'SubId verification procedure' in docs/COMMERCIAL_FUNNEL.md.");
  } else {
    lines.push(`Actions carrying a SubId1: ${report.sub_id_attribution.candidates} · matched to a TTC outbound_click row: ${report.sub_id_attribution.matches}`);
  }
  lines.push("");

  lines.push("-- What this report cannot show --");
  lines.push("Impact's own aggregate click count (only single-click-by-ID retrieval is available via the");
  lines.push("Partner API; a true Impact-side click total needs the dashboard UI or an async Report Export).");
  lines.push("Reconcile by pulling Impact's own click report for the same date range and comparing by eye —");
  lines.push("see 'Reconciling with affiliate dashboards' in docs/COMMERCIAL_FUNNEL.md.");

  return lines.join("\n");
}

// ── Self-test ────────────────────────────────────────────────────────────────

function selfTest() {
  let tests = 0;
  const check = (fn) => {
    fn();
    tests += 1;
  };

  check(() => {
    const chunks = chunkDateWindow("2026-01-01T00:00:00.000Z", "2026-03-01T00:00:00.000Z");
    assert.ok(chunks.length >= 2, "a 59-day window should be split into more than one 45-day chunk");
    assert.equal(chunks[0].start, "2026-01-01T00:00:00.000Z");
    assert.equal(chunks[chunks.length - 1].end, "2026-03-01T00:00:00.000Z");
    for (let i = 1; i < chunks.length; i += 1) assert.equal(chunks[i].start, chunks[i - 1].end);
  });

  check(() => {
    assert.deepEqual(chunkDateWindow("2026-03-01T00:00:00.000Z", "2026-01-01T00:00:00.000Z"), []);
  });

  check(() => {
    const map = resolveCampaignProviderMap({
      IMPACT_SEATGEEK_CAMPAIGN_ID: "1111",
      IMPACT_TICKETNETWORK_PROGRAM_ID: "9999"
    });
    assert.equal(map.get("1111"), "seatgeek");
    assert.equal(map.get("9999"), "ticketnetwork");
    // ticket-liquidator falls back to its documented default program id.
    assert.equal(map.get("2085"), "ticket-liquidator");
    assert.equal(map.get("24092"), "stubhub-international");
  });

  check(() => {
    const creds = impactCredentials({ IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token" });
    assert.equal(creds.configured, true);
    assert.equal(impactCredentials({}).configured, false);
  });

  check(() => {
    const action = normalizeAction({
      Id: "42", CampaignId: "1111", State: "approved", Payout: "3.50", Currency: "USD",
      EventDate: "2026-08-01T10:00:00Z", SubId1: "abc123"
    });
    assert.equal(action.state, "APPROVED");
    assert.equal(action.payout, 3.5);
    assert.equal(action.day, "2026-08-01");
    assert.equal(action.subId1, "abc123");
  });

  check(() => {
    const bogus = normalizeAction({ Id: "1", CampaignId: "1", State: "SOMETHING_NEW", Payout: "x" });
    assert.equal(bogus.state, "UNKNOWN");
    assert.equal(bogus.payout, 0);
  });

  check(() => {
    const campaignToProvider = new Map([["1111", "seatgeek"], ["2085", "ticket-liquidator"]]);
    const actions = [
      normalizeAction({ Id: "1", CampaignId: "1111", State: "APPROVED", Payout: "10", Currency: "USD", EventDate: "2026-08-01" }),
      normalizeAction({ Id: "2", CampaignId: "1111", State: "PENDING", Payout: "5", Currency: "USD", EventDate: "2026-08-02" }),
      normalizeAction({ Id: "3", CampaignId: "1111", State: "REVERSED", Payout: "10", Currency: "USD", EventDate: "2026-08-02" }),
      normalizeAction({ Id: "4", CampaignId: "9999", State: "APPROVED", Payout: "1", Currency: "USD", EventDate: "2026-08-01" })
    ];
    const { byProvider, unmapped } = aggregateActionsByProvider(actions, campaignToProvider);
    const sg = byProvider.get("seatgeek");
    assert.equal(sg.approved.count, 1);
    assert.equal(sg.approved.payout, 10);
    assert.equal(sg.pending.count, 1);
    assert.equal(sg.reversed.count, 1);
    assert.equal(sg.byDay.get("2026-08-01").count, 1);
    assert.equal(sg.byDay.get("2026-08-02").count, 2); // pending + reversed same day
    assert.equal(unmapped.size, 1);
    assert.equal(unmapped.get("9999").approved.count, 1);
  });

  check(() => {
    assert.equal(rate(3, 100, 30), 0.03);
    assert.equal(rate(3, 10, 30), null); // below min-clicks threshold
    assert.equal(rate(3, 0, 30), null);
  });

  check(() => {
    const clickIdIndex = new Map([["abc123", { artist_slug: "beyonce", event_id: "evt-1", provider: "seatgeek" }]]);
    const actions = [
      normalizeAction({ Id: "1", CampaignId: "1111", State: "APPROVED", Payout: "10", SubId1: "abc123" }),
      normalizeAction({ Id: "2", CampaignId: "1111", State: "APPROVED", Payout: "5", SubId1: "no-match" }),
      normalizeAction({ Id: "3", CampaignId: "1111", State: "APPROVED", Payout: "1" })
    ];
    const { matched, candidates } = matchSubIdAttribution(actions, clickIdIndex);
    assert.equal(candidates, 2); // two actions carry a SubId1 at all
    assert.equal(matched.length, 1);
    assert.equal(matched[0].artistSlug, "beyonce");
  });

  check(() => {
    const statements = buildD1Statements({ since: "2026-08-01T00:00:00.000Z", until: "2026-08-08T00:00:00.000Z" });
    for (const statement of statements) assertReadOnlySql(statement.sql);
    assert.throws(() => assertReadOnlySql("SELECT email FROM analytics_events"), /email column/);
    assert.throws(() => assertReadOnlySql("DELETE FROM analytics_events"), /not a SELECT/);
  });

  check(() => {
    const statements = buildD1Statements({ since: "", until: "" });
    const stdout = JSON.stringify(statements.map((statement, index) => ({ success: true, results: [{ marker: index }], meta: {} })));
    const parsed = parseWranglerJson(stdout, statements);
    assert.equal(parsed.clickIdRows[0].marker, statements.length - 1);
    assert.throws(() => parseWranglerJson("not json", statements), /did not return JSON/);
  });

  check(() => {
    const campaignToProvider = new Map([["1111", "seatgeek"]]);
    const actions = [normalizeAction({ Id: "1", CampaignId: "1111", State: "APPROVED", Payout: "10", Currency: "USD", EventDate: "2026-08-01" })];
    const actionsAggregate = aggregateActionsByProvider(actions, campaignToProvider);
    const report = buildReport({
      actionsAggregate,
      d1: { clicksByProvider: [{ provider: "seatgeek", clicks: 200 }], clickIdRows: [] },
      window: { since: "2026-08-01T00:00:00.000Z", until: "2026-08-08T00:00:00.000Z" },
      options: { database: DEFAULT_D1_DATABASE, remote: true, minClicks: 30 },
      subIdEnabled: false
    });
    const seatgeek = report.by_provider.find((row) => row.provider === "seatgeek");
    assert.equal(seatgeek.ttc_outbound_clicks, 200);
    assert.equal(seatgeek.commission_earned_approved, 10);
    assert.equal(seatgeek.conversion_rate, 1 / 200);
    const rendered = renderReport(report);
    assert.match(rendered, /Affiliate Performance Report/);
    assert.match(rendered, /seatgeek/);
    assert.match(rendered, /What this report cannot show/);
  });

  return { tests };
}

// ── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exit(2);
  }
  if (options.help) {
    console.log(usage());
    return;
  }
  if (options.selfTest) {
    const result = selfTest();
    console.log(`Affiliate performance report self-test passed (${result.tests} checks).`);
    return;
  }

  const credentials = impactCredentials(process.env);
  if (!credentials.configured) {
    console.error("IMPACT_SEATGEEK_ACCOUNT_SID and IMPACT_SEATGEEK_AUTH_TOKEN must be set in the environment.");
    console.error("These are the same read-only Impact Publisher API credentials functions/api/out.js uses server-side.");
    process.exit(1);
  }

  const now = process.env.TTC_NOW ? new Date(process.env.TTC_NOW) : new Date();
  if (Number.isNaN(now.getTime())) throw new Error("TTC_NOW is not a valid timestamp");
  const window = computeWindow(options, now);
  const campaignToProvider = resolveCampaignProviderMap(process.env);

  const [actions, d1] = await Promise.all([
    fetchAllActions(credentials, window),
    runD1Statements(buildD1Statements(window), options)
  ]);

  const actionsAggregate = aggregateActionsByProvider(actions, campaignToProvider);
  const subIdEnabled = String(process.env[OUT_CLICK_ID_SUBID_ENABLED_KEY] || "").trim().toLowerCase() === "true";
  const clickIdIndex = new Map();
  for (const row of d1.clickIdRows) clickIdIndex.set(String(row.click_id), row);
  const { matched, candidates } = matchSubIdAttribution(actions, clickIdIndex);

  const report = buildReport({
    actionsAggregate, d1, window, options, subIdEnabled,
    subIdMatches: matched.length,
    subIdCandidates: candidates
  });
  if (matched.length) report.sub_id_attribution.matched_orders = matched;

  console.log(options.json ? JSON.stringify(report, null, 2) : renderReport(report));
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(`Affiliate performance report failed: ${error.message}`);
    process.exit(1);
  });
}
