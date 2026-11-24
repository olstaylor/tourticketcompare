#!/usr/bin/env node
// Weekly commercial scorecard (manual, read-only). Composes what the repo already
// measures into one page: Impact orders come from the D1 impact_action_ledger
// (scripts/sync-impact-action-ledger.mjs, so no Impact credentials are needed
// here) and scripts/lib/human-clicks.mjs gives page-backed redirects. Nothing is written anywhere, nothing is scheduled, no tracking or
// redirect behaviour is touched. Every D1 statement is a SELECT.
//
//   node scripts/report-scorecard.mjs [--until YYYY-MM-DD] [--local] [--json]
//   node scripts/report-scorecard.mjs --sample      # fixture data, no network
//   node scripts/report-scorecard.mjs --self-test
//
// Definitions (kept deliberately conservative):
//   week / 90d window      UTC, [until-7d, until) and [until-90d, until); `until` defaults to today 00:00 UTC.
//   page-backed redirect   humanRedirectSql: the same anonymous visitor-day sent a page event, and the
//                          source is not a suspected forged home-page source. An UPPER-BOUND PROXY,
//                          not a human count.
//   action cohort          ledger orders grouped by action date (event_date).
//   lock-date cohort       the same orders grouped by lock_date, the date Impact locks the commission
//                          (approved orders become payable after it). It is not a payment date: the
//                          ledger stores no payment status.
//   matched                ledger attribution = matched: valid SubId1, one eligible click, provider
//                          agrees. Unmatched orders are never allocated to pages.
//   commission per click   (approved matched commission, actions dated in the 90d window) /
//                          (page-backed redirects that carried a SubId1, same window, Impact lanes).
//                          Indicative only: actions lag clicks, so recent clicks are under-credited.

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { pageBackedSql, suspectedBotRedirectSql } from "./lib/human-clicks.mjs";
import { parseWranglerJson } from "./report-affiliate-performance.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DATABASE = "tourticketcompare-demand";
const MIN_CLICKS_FOR_RATE = 30;
const MIN_APPROVED_FOR_RATE = 3;
const TARGETS = [500, 1000];
const PROVIDERS = ["seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international", "ticketmaster"];
const IMPACT_PROVIDERS = PROVIDERS.filter((p) => p !== "ticketmaster");
const STATES = ["APPROVED", "PENDING", "REVERSED", "UNKNOWN"];

// ── Arguments and windows ───────────────────────────────────────────────────

export function parseArgs(argv) {
  const options = { until: "", database: DEFAULT_DATABASE, remote: true, json: false, sample: false, selfTest: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--until") {
      const value = String(argv[++i] || "");
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      const d = m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
      if (!d || Number.isNaN(d.getTime()) || d.getUTCDate() !== +m[3]) throw new Error("--until requires a real YYYY-MM-DD date");
      options.until = d.toISOString();
    } else if (arg === "--database") options.database = String(argv[++i] || "");
    else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "--sample") options.sample = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!options.database || options.database.startsWith("--")) throw new Error("--database requires a name");
  return options;
}

export function computeWindows(untilIso, now = new Date()) {
  const until = untilIso ? new Date(untilIso) : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const iso = (ms) => new Date(ms).toISOString();
  return {
    week: { label: "Last full week", since: iso(until.getTime() - 7 * DAY_MS), until: until.toISOString() },
    d90: { label: "Trailing 90 days", since: iso(until.getTime() - 90 * DAY_MS), until: until.toISOString() }
  };
}

// ── D1 (read only) ──────────────────────────────────────────────────────────

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

export function assertScorecardSql(sql) {
  if (!/^\s*SELECT\b/i.test(sql)) throw new Error(`Not a SELECT: ${sql.slice(0, 60)}`);
  if (sql.replace(/;\s*$/, "").includes(";")) throw new Error("Multiple statements are not allowed");
  if (/\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX)\b/i.test(sql)) throw new Error("Non-read-only keyword");
  if (/\b(email|user_agent|ip_hash)\b/i.test(sql)) throw new Error("Statement reads a private column");
  return sql;
}

export function buildScorecardStatements(windows) {
  const statements = [];
  for (const [name, w] of Object.entries(windows)) {
    if (!ISO.test(w.since) || !ISO.test(w.until)) throw new Error("Refusing to interpolate a non-ISO bound");
    const range = `created_at >= '${w.since}' AND created_at < '${w.until}'`;
    statements.push({
      key: `redirects_${name}`,
      sql: `SELECT provider, COUNT(*) AS raw, SUM(CASE WHEN ${pageBackedSql()} AND NOT ${suspectedBotRedirectSql()} THEN 1 ELSE 0 END) AS page_backed, SUM(CASE WHEN ${pageBackedSql()} AND NOT ${suspectedBotRedirectSql()} AND impact_reconciliation_eligible = 1 THEN 1 ELSE 0 END) AS page_backed_subid FROM analytics_events WHERE event_name = 'outbound_click' AND ${range} GROUP BY provider`
    });
    statements.push({
      key: `traffic_${name}`,
      sql: `SELECT COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN request_key END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'page_view' AND acquisition_source = 'organic_search' THEN request_key END) AS search_visitors FROM analytics_events WHERE event_name = 'page_view' AND ${range}`
    });
  }
  const since = windows.d90.since.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error("Refusing to interpolate a non-date bound");
  statements.push({
    key: "ledger",
    sql: `SELECT provider, state, attribution, currency, payout, event_date, lock_date FROM impact_action_ledger WHERE substr(event_date, 1, 10) >= '${since}' OR substr(lock_date, 1, 10) >= '${since}'`
  });
  statements.push({
    key: "import_run",
    sql: "SELECT run_at, status, flags FROM impact_action_import_runs ORDER BY run_at DESC LIMIT 1"
  });
  return statements;
}

async function runD1(statements, options) {
  for (const statement of statements) assertScorecardSql(statement.sql);
  const args = buildD1ReadArgs({ database: options.database, remote: options.remote, statements });
  const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
  return parseWranglerJson(result.stdout, statements);
}

// ── Pure summaries ──────────────────────────────────────────────────────────

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function summariseRedirects(rows = []) {
  const out = {};
  for (const provider of PROVIDERS) out[provider] = { raw: 0, pageBacked: 0, pageBackedSubId: 0 };
  for (const row of rows) {
    const key = out[row.provider] ? row.provider : "other";
    out[key] = out[key] || { raw: 0, pageBacked: 0, pageBackedSubId: 0 };
    out[key].raw += num(row.raw);
    out[key].pageBacked += num(row.page_backed);
    out[key].pageBackedSubId += num(row.page_backed_subid);
  }
  return out;
}

const inWindow = (day, w) => Boolean(day) && day >= w.since.slice(0, 10) && day < w.until.slice(0, 10);

// Ledger rows -> comparable orders. Raw Impact ids are never needed or printed.
export function ledgerOrders(rows = []) {
  return rows.map((r) => ({
    provider: r.provider || "(unmapped campaign)",
    state: STATES.includes(String(r.state).toUpperCase()) ? String(r.state).toUpperCase() : "UNKNOWN",
    matched: r.attribution === "matched",
    attribution: r.attribution || "unknown",
    currency: r.currency || "(unknown)",
    payout: r.payout === null || r.payout === undefined ? null : Number(r.payout),
    eventDay: r.event_date ? String(r.event_date).slice(0, 10) : null,
    lockDay: r.lock_date ? String(r.lock_date).slice(0, 10) : null
  }));
}

// Orders are grouped by currency so currencies are never summed together, and by
// matched / unmatched so unmatched revenue never reaches a page. `field` selects the
// cohort date: eventDay (action date) or lockDay (commission lock date).
export function summariseOrders(orders, window, field = "eventDay") {
  const cohort = orders.filter((o) => inWindow(o[field], window));
  const byCurrency = {};
  const attribution = {};
  for (const o of cohort) {
    const site = o.matched ? "matched" : "unmatched";
    const b = (byCurrency[o.currency] = byCurrency[o.currency] || { matched: {}, unmatched: {} });
    const cell = (b[site][o.state] = b[site][o.state] || { count: 0, payout: 0, missingPayout: 0 });
    cell.count += 1;
    if (o.payout === null || !Number.isFinite(o.payout)) cell.missingPayout += 1; else cell.payout += o.payout;
    attribution[o.attribution] = (attribution[o.attribution] || 0) + 1;
  }
  return { count: cohort.length, byCurrency, attribution };
}

export function commissionPerClick({ approvedMatchedPayout, approvedMatchedCount, pageBackedSubIdClicks, currencyCount }) {
  if (currencyCount !== 1) return { value: null, reason: currencyCount > 1 ? "mixed currencies" : "no approved matched orders" };
  if (pageBackedSubIdClicks < MIN_CLICKS_FOR_RATE) return { value: null, reason: `fewer than ${MIN_CLICKS_FOR_RATE} page-backed redirects` };
  if (approvedMatchedCount < MIN_APPROVED_FOR_RATE) return { value: null, reason: `fewer than ${MIN_APPROVED_FOR_RATE} approved matched orders (n=${approvedMatchedCount})` };
  return { value: approvedMatchedPayout / pageBackedSubIdClicks, reason: "" };
}

// Illustrative click requirements, not forecasts. low = half the observed rate, high = double.
export function clickRequirements(perClick) {
  if (!Number.isFinite(perClick) || perClick <= 0) return null;
  const rows = [];
  for (const [label, factor] of [["lower (0.5x observed)", 0.5], ["observed", 1], ["higher (2x observed)", 2]]) {
    const rate = perClick * factor;
    rows.push({ scenario: label, rate, needed: TARGETS.map((target) => ({ target, clicks: Math.ceil(target / rate) })) });
  }
  return rows;
}

export function pickActions({ redirects90, actions90, orders90 }) {
  const actions = [];
  const total = Object.values(actions90.byCurrency).reduce((n, b) => n + ["matched", "unmatched"].reduce((m, s) => m + Object.values(b[s]).reduce((x, c) => x + c.count, 0), 0), 0);
  const matched = Object.values(actions90.byCurrency).reduce((n, b) => n + Object.values(b.matched).reduce((x, c) => x + c.count, 0), 0);
  if (total && matched / total < 0.8) {
    actions.push({ title: "Raise attribution coverage", evidence: `${matched} of ${total} actions in the 90-day cohort match a TTC click; attribution mix: ${JSON.stringify(actions90.attribution)}. Older actions predate SubId1 on every lane, so check whether recent weeks are clean before changing anything.`, confidence: "High (counts), the cause of older gaps is known" });
  }
  const providerLines = IMPACT_PROVIDERS.map((p) => ({ p, clicks: redirects90[p]?.pageBacked || 0 })).sort((a, b) => b.clicks - a.clicks);
  const matchedByProvider = new Set(orders90.filter((o) => o.matched).map((o) => o.provider));
  const top = providerLines.find((l) => l.clicks >= MIN_CLICKS_FOR_RATE && !matchedByProvider.has(l.p));
  if (top) actions.push({ title: `Understand why ${top.p} clicks have no matched order`, evidence: `${top.clicks} page-backed redirects in 90 days, 0 matched orders. Redirects are an upper-bound proxy, so check the landing experience and seller coverage before drawing conclusions.`, confidence: "Medium" });
  actions.push({ title: "Read approved commission once pending orders lock", evidence: "Matched orders are still pending, so approved commission per click stays withheld until their lock dates pass; compare again then.", confidence: "Medium" });
  return actions.slice(0, 3);
}

// ── Rendering ───────────────────────────────────────────────────────────────

const fmt = (v) => (v === null || v === undefined ? "unavailable" : Number(v).toLocaleString("en-GB"));
const money = (v, c, dp = 2) => `${Number(v).toFixed(dp)} ${c}`;

function table(headers, rows) {
  return [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

function actionRows(summary) {
  const rows = [];
  for (const [currency, b] of Object.entries(summary.byCurrency)) {
    for (const site of ["matched", "unmatched"]) {
      for (const state of STATES) {
        const cell = b[site][state];
        if (!cell) continue;
        rows.push([currency, site, state.toLowerCase(), String(cell.count), cell.missingPayout ? `${money(cell.payout, currency)} (+${cell.missingPayout} without amount)` : money(cell.payout, currency)]);
      }
    }
  }
  return rows.length ? rows : [["unavailable", "", "", "0", ""]];
}

export function renderScorecard(card) {
  const L = [];
  L.push(`# Weekly commercial scorecard`);
  L.push(`Windows (UTC): week ${card.windows.week.since.slice(0, 10)} to ${card.windows.week.until.slice(0, 10)} (exclusive); trailing 90 days from ${card.windows.d90.since.slice(0, 10)}.${card.sample ? " **SAMPLE: fixture data, not real results.**" : ""}`);
  L.push("");
  L.push("## 1. Search and landing traffic");
  L.push("Search Console clicks by landing-page type: **unavailable** (no authorised pull in this repo; use a pasted Search Console export).");
  L.push(table(["Window", "Visitor keys (all)", "From organic search"], ["week", "d90"].map((k) => [card.windows[k].label, fmt(card.traffic[k]?.visitors ?? null), fmt(card.traffic[k]?.search_visitors ?? null)])));
  L.push("Visitor keys are anonymous IP+user-agent hashes seen on page views, not people.");
  L.push("");
  L.push("## 2. Page-backed seller redirects by provider (upper-bound proxy, not a human count)");
  L.push(table(["Provider", "Week page-backed", "Week raw", "90d page-backed", "90d raw"], PROVIDERS.map((p) => [p, fmt(card.redirects.week[p]?.pageBacked), fmt(card.redirects.week[p]?.raw), fmt(card.redirects.d90[p]?.pageBacked), fmt(card.redirects.d90[p]?.raw)])));
  L.push("Raw counts include automation; page-backed means the same visitor-day also sent a page event.");
  L.push("");
  L.push("## 3. Impact-reported clicks and actions");
  L.push("Impact-reported clicks: **unavailable** (the Actions API has no click list; dashboard only). Orders below are account-wide ledger rows, treated as TTC only where attribution is matched.");
  L.push("");
  for (const key of ["week", "d90"]) {
    L.push(`### ${card.windows[key].label}: orders by action date, status and match (${card.actions[key].count} orders)`);
    L.push(table(["Currency", "Site match", "Status", "Orders", "Commission"], actionRows(card.actions[key])));
    L.push("");
    L.push(`### ${card.windows[key].label}: orders by commission lock date (${card.locks[key].count} orders)`);
    L.push(table(["Currency", "Site match", "Status", "Orders", "Commission"], actionRows(card.locks[key])));
    L.push("");
  }
  L.push(`Ledger source: ${card.ledgerRun ? `last import ${card.ledgerRun.run_at} (${card.ledgerRun.status})` : "**unavailable** (no import run found)"}. A lock date is when Impact locks the commission, not when it is paid: payment status is **unavailable**. Unmatched orders are never allocated to pages and are excluded from page-level revenue.`);
  L.push("");
  L.push("## 4. Approved commission per page-backed seller click (indicative)");
  const cpc = card.commissionPerClick;
  L.push(cpc.value === null
    ? `Withheld: ${cpc.reason}. Sample: ${fmt(card.cpcInputs.pageBackedSubIdClicks)} page-backed SubId1 redirects, ${fmt(card.cpcInputs.approvedMatchedCount)} approved matched orders.`
    : `${money(cpc.value, card.cpcInputs.currency)} per page-backed SubId1 redirect (n=${fmt(card.cpcInputs.pageBackedSubIdClicks)} redirects, ${fmt(card.cpcInputs.approvedMatchedCount)} approved matched orders, ${card.windows.d90.label.toLowerCase()}).`);
  L.push("Limits: matched orders only, so it understates anything unmatched; actions are dated by action date while clicks are dated by click date, so recent clicks are under-credited; not a cohort conversion rate.");
  L.push("");
  L.push("## 5. Illustrative clicks needed per month (not forecasts)");
  if (!card.requirements) L.push("Unavailable: no observed commission per click yet.");
  else {
    L.push(table(["Scenario", "Rate per click", ...TARGETS.map((t) => `Clicks for ${t}`)], card.requirements.map((r) => [r.scenario, money(r.rate, card.cpcInputs.currency, 4), ...r.needed.map((n) => fmt(n.clicks))])));
    L.push("Commission target in the same currency per month. Observed rate is from the 90-day window above.");
  }
  L.push("");
  L.push("## 6. Top three actions");
  card.topActions.forEach((a, i) => L.push(`${i + 1}. **${a.title}.** ${a.evidence} Confidence: ${a.confidence}.`));
  L.push("");
  L.push("## Data gaps");
  L.push("- Search Console, Impact clicks and payment status are unavailable here (see above).");
  L.push("- SubId1 exists only on recent orders, so older actions stay unmatched.");
  L.push("- Account-level Impact actions can include other properties; only SubId1 matches count as TTC.");
  return L.join("\n");
}

// ── Assembly ────────────────────────────────────────────────────────────────

export function buildCard({ windows, d1, sample = false }) {
  const orders = ledgerOrders(d1.ledger);
  const redirects = { week: summariseRedirects(d1.redirects_week), d90: summariseRedirects(d1.redirects_d90) };
  const traffic = { week: d1.traffic_week?.[0] ?? null, d90: d1.traffic_d90?.[0] ?? null };
  const actions = { week: summariseOrders(orders, windows.week), d90: summariseOrders(orders, windows.d90) };
  const locks = { week: summariseOrders(orders, windows.week, "lockDay"), d90: summariseOrders(orders, windows.d90, "lockDay") };
  const approved = Object.entries(actions.d90.byCurrency).map(([currency, b]) => ({ currency, cell: b.matched.APPROVED })).filter((x) => x.cell);
  const subIdClicks = IMPACT_PROVIDERS.reduce((n, p) => n + (redirects.d90[p]?.pageBackedSubId || 0), 0);
  const only = approved.length === 1 ? approved[0] : null;
  const cpcInputs = { currency: only?.currency || null, approvedMatchedCount: only?.cell.count || 0, approvedMatchedPayout: only?.cell.payout || 0, pageBackedSubIdClicks: subIdClicks };
  const cpc = commissionPerClick({ approvedMatchedPayout: cpcInputs.approvedMatchedPayout, approvedMatchedCount: cpcInputs.approvedMatchedCount, pageBackedSubIdClicks: subIdClicks, currencyCount: approved.length });
  return {
    sample, windows, redirects, traffic, actions, locks, ledgerRun: d1.import_run?.[0] ?? null, commissionPerClick: cpc, cpcInputs,
    requirements: clickRequirements(cpc.value),
    topActions: pickActions({ redirects90: redirects.d90, actions90: actions.d90, orders90: orders })
  };
}

function sampleInputs() {
  const row = (provider, state, attribution, payout, event_date, lock_date) => ({ provider, state, attribution, currency: "GBP", payout, event_date, lock_date });
  return {
    ledger: [
      row("vivid-seats", "APPROVED", "matched", 20, "2026-10-20", "2026-11-20"),
      row("vivid-seats", "APPROVED", "matched", 12, "2026-11-02", "2026-12-02"),
      row("seatgeek", "APPROVED", "matched", 4, "2026-11-05", "2026-12-05"),
      row("vivid-seats", "PENDING", "matched", 9, "2026-11-18", "2026-12-18"),
      row("stubhub-international", "APPROVED", "no_sub_id", 50, "2026-10-01", "2026-11-01"),
      row("seatgeek", "REVERSED", "matched", 2, "2026-11-19", "2026-12-19")
    ],
    import_run: [{ run_at: "2026-11-23T06:45:00Z", status: "ok" }],
    redirects_week: [{ provider: "stubhub-international", raw: 400, page_backed: 120, page_backed_subid: 120 }, { provider: "vivid-seats", raw: 90, page_backed: 40, page_backed_subid: 40 }, { provider: "seatgeek", raw: 25, page_backed: 10, page_backed_subid: 10 }, { provider: "ticketmaster", raw: 30, page_backed: 12, page_backed_subid: 0 }],
    redirects_d90: [{ provider: "stubhub-international", raw: 2500, page_backed: 900, page_backed_subid: 800 }, { provider: "vivid-seats", raw: 600, page_backed: 300, page_backed_subid: 280 }, { provider: "seatgeek", raw: 250, page_backed: 100, page_backed_subid: 90 }, { provider: "ticketmaster", raw: 300, page_backed: 120, page_backed_subid: 0 }],
    traffic_week: [{ visitors: 3200, search_visitors: 1700 }], traffic_d90: [{ visitors: 30000, search_visitors: 14000 }]
  };
}

async function main() {
  let options;
  try { options = parseArgs(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exit(2); }
  if (options.help) { console.log("Usage: node scripts/report-scorecard.mjs [--until YYYY-MM-DD] [--local] [--json] [--sample] [--self-test]"); return; }
  if (options.selfTest) { console.log(`Scorecard self-test passed (${selfTest()} checks).`); return; }
  let card;
  if (options.sample) {
    card = buildCard({ windows: computeWindows("2026-11-23T00:00:00.000Z"), d1: sampleInputs(), sample: true });
  } else {
    const windows = computeWindows(options.until);
    if (options.remote && !(process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID)) {
      console.error("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID (read access to D1) must be set. No Impact credentials are needed: orders come from the impact_action_ledger.");
      process.exit(1);
    }
    card = buildCard({ windows, d1: await runD1(buildScorecardStatements(windows), options) });
  }
  console.log(options.json ? JSON.stringify(card, null, 2) : renderScorecard(card));
}

// ── Self-test ───────────────────────────────────────────────────────────────

export function selfTest() {
  let checks = 0;
  const ok = (cond, msg) => { assert.ok(cond, msg); checks += 1; };
  const w = computeWindows("2026-11-23T00:00:00.000Z");
  ok(w.week.since === "2026-11-16T00:00:00.000Z" && w.d90.since === "2026-08-25T00:00:00.000Z", "windows are 7 and 90 days back");
  assert.throws(() => parseArgs(["--until", "2026-02-31"])); checks += 1;
  assert.throws(() => parseArgs(["--write"])); checks += 1;
  for (const s of buildScorecardStatements(w)) { assertScorecardSql(s.sql); checks += 1; }
  assert.throws(() => assertScorecardSql("DELETE FROM analytics_events")); checks += 1;
  assert.throws(() => assertScorecardSql("SELECT user_agent FROM analytics_events")); checks += 1;
  const card = buildCard({ windows: w, d1: sampleInputs(), sample: true });
  ok(card.actions.d90.count === 6 && card.actions.week.count === 2, "cohorts group by action date");
  ok(card.actions.d90.byCurrency.GBP.matched.APPROVED.count === 3 && card.actions.d90.byCurrency.GBP.unmatched.APPROVED.count === 1, "matched and unmatched stay separate");
  ok(card.actions.d90.byCurrency.GBP.matched.PENDING.count === 1 && card.actions.d90.byCurrency.GBP.matched.REVERSED.count === 1, "statuses stay separate");
  ok(card.cpcInputs.approvedMatchedPayout === 36 && card.cpcInputs.pageBackedSubIdClicks === 1170, "indicative rate uses approved matched payout and SubId1 page-backed redirects only");
  ok(Math.abs(card.commissionPerClick.value - 36 / 1170) < 1e-12, "commission per click arithmetic");
  ok(card.requirements.length === 3 && card.requirements[1].needed[0].clicks === Math.ceil(500 / (36 / 1170)), "click requirements use the observed rate");
  ok(card.requirements[0].needed[0].clicks > card.requirements[1].needed[0].clicks, "lower scenario needs more clicks");
  ok(commissionPerClick({ approvedMatchedPayout: 5, approvedMatchedCount: 1, pageBackedSubIdClicks: 500, currencyCount: 1 }).value === null, "rate withheld on small order sample");
  ok(commissionPerClick({ approvedMatchedPayout: 5, approvedMatchedCount: 5, pageBackedSubIdClicks: 10, currencyCount: 1 }).value === null, "rate withheld on small click sample");
  ok(commissionPerClick({ approvedMatchedPayout: 5, approvedMatchedCount: 5, pageBackedSubIdClicks: 100, currencyCount: 2 }).reason === "mixed currencies", "mixed currencies are never combined");
  const mixed = summariseOrders(ledgerOrders([
    { provider: "seatgeek", state: "APPROVED", attribution: "matched", currency: "GBP", payout: 1, event_date: "2026-11-20" },
    { provider: "seatgeek", state: "APPROVED", attribution: "matched", currency: "USD", payout: 1, event_date: "2026-11-20" }]), w.week);
  ok(Object.keys(mixed.byCurrency).sort().join() === "GBP,USD", "currencies bucketed separately");
  const noPayout = summariseOrders(ledgerOrders([{ provider: "seatgeek", state: "PENDING", attribution: "unmatched", currency: "GBP", payout: null, event_date: "2026-11-20" }]), w.week);
  ok(noPayout.byCurrency.GBP.unmatched.PENDING.missingPayout === 1 && noPayout.byCurrency.GBP.unmatched.PENDING.payout === 0, "missing payout is counted, not guessed");
  ok(card.locks.d90.count === 2 && card.locks.week.count === 1, "lock-date cohort is separate from action-date cohort");
  ok(card.ledgerRun.status === "ok" && renderScorecard(card).includes("payment status is **unavailable**"), "ledger source and payment status are labelled");
  const pendingOnly = buildCard({ windows: w, d1: { ...sampleInputs(), ledger: [{ provider: "vivid-seats", state: "PENDING", attribution: "matched", currency: "GBP", payout: 100.25, event_date: "2026-11-10", lock_date: "2026-12-10" }] } });
  ok(pendingOnly.commissionPerClick.value === null && /no approved matched/.test(pendingOnly.commissionPerClick.reason), "pending matched orders never become approved commission per click");
  const text = renderScorecard(card);
  for (const part of ["SAMPLE", "unavailable", "upper-bound proxy", "Unmatched orders are never allocated", "Top three actions", "not forecasts"]) ok(text.includes(part), `render includes ${part}`);
  ok(card.topActions.length >= 1 && card.topActions.length <= 3, "at most three actions");
  const empty = buildCard({ windows: w, d1: {} });
  ok(empty.commissionPerClick.value === null && empty.requirements === null && renderScorecard(empty).includes("Unavailable"), "missing data renders as unavailable");
  return checks;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => { console.error(`Scorecard failed: ${error.message}`); process.exit(1); });
}
