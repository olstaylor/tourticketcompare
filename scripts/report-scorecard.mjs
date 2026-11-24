#!/usr/bin/env node
// Weekly commercial scorecard (manual, read-only). Composes what the repo already
// measures into one page: it reuses report-affiliate-performance.mjs for Impact
// actions and the SubId1 join, and scripts/lib/human-clicks.mjs for page-backed
// redirects. Nothing is written anywhere, nothing is scheduled, no tracking or
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
//   action cohort          Impact actions grouped by action date (Impact EventDate). The date a
//                          commission is approved is NOT returned by the Actions API fields this repo
//                          reads, so approval-date cohorts are unavailable.
//   matched                valid SubId1 joined to exactly one retained, eligible click of the same
//                          provider. Unmatched orders are never allocated to pages.
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
import {
  buildAttributionStatements,
  fetchAllActions,
  impactCredentials,
  indexClickRows,
  matchSubIdAttribution,
  normalizeAction,
  parseWranglerJson,
  resolveCampaignProviderMap
} from "./report-affiliate-performance.mjs";

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

// Actions are grouped by action date and, within that, by currency so currencies
// are never summed together. matchedIds is the set of action ids that joined a TTC click.
export function summariseActions(actions, matchedIds, campaignToProvider, window) {
  const cohort = actions.filter((a) => inWindow(a.day, window));
  const undated = actions.filter((a) => !a.day).length;
  const byCurrency = {};
  const byProvider = {};
  for (const a of cohort) {
    const currency = a.currency || "(unknown)";
    const provider = campaignToProvider.get(a.campaignId) || "(unmapped campaign)";
    const site = matchedIds.has(a.id) ? "matched" : "unmatched";
    const state = STATES.includes(a.state) ? a.state : "UNKNOWN";
    for (const [bucketMap, key] of [[byCurrency, currency], [byProvider, `${provider}|${currency}`]]) {
      const b = (bucketMap[key] = bucketMap[key] || { matched: {}, unmatched: {} });
      const cell = (b[site][state] = b[site][state] || { count: 0, payout: 0, missingPayout: 0 });
      cell.count += 1;
      if (a.payoutKnown) cell.payout += a.payout; else cell.missingPayout += 1;
    }
  }
  return { count: cohort.length, undated, byCurrency, byProvider };
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

export function pickActions({ redirects90, actions90, coverage }) {
  const actions = [];
  const total = Object.values(actions90.byCurrency).reduce((n, b) => n + ["matched", "unmatched"].reduce((m, s) => m + Object.values(b[s]).reduce((x, c) => x + c.count, 0), 0), 0);
  const matched = Object.values(actions90.byCurrency).reduce((n, b) => n + Object.values(b.matched).reduce((x, c) => x + c.count, 0), 0);
  if (total && matched / total < 0.8) {
    actions.push({ title: "Raise attribution coverage", evidence: `${matched} of ${total} actions in the 90-day cohort match a TTC click; coverage reasons: ${JSON.stringify(coverage)}. Older actions predate SubId1 on every lane, so check whether recent weeks are clean before changing anything.`, confidence: "High (counts), the cause of older gaps is known" });
  }
  const providerLines = IMPACT_PROVIDERS.map((p) => ({ p, clicks: redirects90[p]?.pageBacked || 0 })).sort((a, b) => b.clicks - a.clicks);
  const matchedByProvider = new Set(Object.entries(actions90.byProvider).filter(([, b]) => Object.keys(b.matched).length).map(([k]) => k.split("|")[0]));
  const top = providerLines.find((l) => l.clicks >= MIN_CLICKS_FOR_RATE && !matchedByProvider.has(l.p));
  if (top) actions.push({ title: `Understand why ${top.p} clicks have no matched order`, evidence: `${top.clicks} page-backed redirects in 90 days, 0 matched orders. Redirects are an upper-bound proxy, so check the landing experience and seller coverage before drawing conclusions.`, confidence: "Medium" });
  actions.push({ title: "Read approved commission once pending orders settle", evidence: "Commission per click is indicative while recent clicks have had no time to be approved; compare again after the next lock date.", confidence: "Medium" });
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
  L.push("Impact-reported clicks: **unavailable** (the Actions API has no click list; dashboard only). Actions below are account-wide totals joined to TTC clicks only where SubId1 matches.");
  L.push("");
  for (const key of ["week", "d90"]) {
    L.push(`### ${card.windows[key].label}: orders by action date, status and match (${card.actions[key].count} actions)`);
    L.push(table(["Currency", "Site match", "Status", "Orders", "Commission"], actionRows(card.actions[key])));
    L.push("");
  }
  L.push("Approval-date cohorts: **unavailable** (action date only). Unmatched orders are never allocated to pages and are excluded from page-level revenue.");
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
  L.push("- Search Console, Impact clicks and approval dates are unavailable here (see above).");
  L.push("- SubId1 exists only on recent orders, so older actions stay unmatched.");
  L.push("- Account-level Impact actions can include other properties; only SubId1 matches count as TTC.");
  return L.join("\n");
}

// ── Assembly ────────────────────────────────────────────────────────────────

export function buildCard({ windows, d1, actions, matched, coverage, campaignToProvider, sample = false }) {
  const matchedIds = new Set(matched.map((m) => m.actionId));
  const redirects = { week: summariseRedirects(d1.redirects_week), d90: summariseRedirects(d1.redirects_d90) };
  const traffic = { week: d1.traffic_week?.[0] ?? null, d90: d1.traffic_d90?.[0] ?? null };
  const actionsSummary = {
    week: summariseActions(actions, matchedIds, campaignToProvider, windows.week),
    d90: summariseActions(actions, matchedIds, campaignToProvider, windows.d90)
  };
  const approved = Object.entries(actionsSummary.d90.byCurrency).map(([currency, b]) => ({ currency, cell: b.matched.APPROVED })).filter((x) => x.cell);
  const currencies = approved.map((x) => x.currency);
  const subIdClicks = IMPACT_PROVIDERS.reduce((n, p) => n + (redirects.d90[p]?.pageBackedSubId || 0), 0);
  const only = approved.length === 1 ? approved[0] : null;
  const cpcInputs = { currency: only?.currency || null, approvedMatchedCount: only?.cell.count || 0, approvedMatchedPayout: only?.cell.payout || 0, pageBackedSubIdClicks: subIdClicks };
  const cpc = commissionPerClick({ approvedMatchedPayout: cpcInputs.approvedMatchedPayout, approvedMatchedCount: cpcInputs.approvedMatchedCount, pageBackedSubIdClicks: subIdClicks, currencyCount: currencies.length });
  return {
    sample, windows, redirects, traffic, actions: actionsSummary, commissionPerClick: cpc, cpcInputs,
    requirements: clickRequirements(cpc.value),
    topActions: pickActions({ redirects90: redirects.d90, actions90: actionsSummary.d90, coverage })
  };
}

const SAMPLE_CAMPAIGNS = new Map([["1", "seatgeek"], ["2", "vivid-seats"], ["3", "stubhub-international"]]);

function sampleInputs() {
  const mk = (id, campaignId, state, payout, day, subId1 = null) => normalizeAction({ Id: id, CampaignId: campaignId, State: state, Payout: payout, Currency: "GBP", EventDate: `${day}T12:00:00Z`, SubId1: subId1 });
  const actions = [
    mk("a1", "2", "APPROVED", "20", "2026-10-20", "aaaaaaaaaaaaaaaaaaaaaaa1"),
    mk("a2", "2", "APPROVED", "12", "2026-11-02", "aaaaaaaaaaaaaaaaaaaaaaa2"),
    mk("a3", "1", "APPROVED", "4", "2026-11-05", "aaaaaaaaaaaaaaaaaaaaaaa3"),
    mk("a4", "2", "PENDING", "9", "2026-11-18", "aaaaaaaaaaaaaaaaaaaaaaa4"),
    mk("a5", "3", "APPROVED", "50", "2026-10-01"),
    mk("a6", "1", "REVERSED", "2", "2026-11-19", "aaaaaaaaaaaaaaaaaaaaaaa5")
  ];
  const matched = actions.filter((a) => a.subId1).map((a) => ({ actionId: a.id }));
  const d1 = {
    redirects_week: [{ provider: "stubhub-international", raw: 400, page_backed: 120, page_backed_subid: 120 }, { provider: "vivid-seats", raw: 90, page_backed: 40, page_backed_subid: 40 }, { provider: "seatgeek", raw: 25, page_backed: 10, page_backed_subid: 10 }, { provider: "ticketmaster", raw: 30, page_backed: 12, page_backed_subid: 0 }],
    redirects_d90: [{ provider: "stubhub-international", raw: 2500, page_backed: 900, page_backed_subid: 800 }, { provider: "vivid-seats", raw: 600, page_backed: 300, page_backed_subid: 280 }, { provider: "seatgeek", raw: 250, page_backed: 100, page_backed_subid: 90 }, { provider: "ticketmaster", raw: 300, page_backed: 120, page_backed_subid: 0 }],
    traffic_week: [{ visitors: 3200, search_visitors: 1700 }], traffic_d90: [{ visitors: 30000, search_visitors: 14000 }]
  };
  return { d1, actions, matched, coverage: { no_sub_id: 2 } };
}

async function main() {
  let options;
  try { options = parseArgs(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exit(2); }
  if (options.help) { console.log("Usage: node scripts/report-scorecard.mjs [--until YYYY-MM-DD] [--local] [--json] [--sample] [--self-test]"); return; }
  if (options.selfTest) { console.log(`Scorecard self-test passed (${selfTest()} checks).`); return; }
  const windows = computeWindows(options.until);
  let card;
  if (options.sample) {
    const s = sampleInputs();
    card = buildCard({ windows: computeWindows("2026-11-23T00:00:00.000Z"), ...s, campaignToProvider: SAMPLE_CAMPAIGNS, sample: true });
  } else {
    const credentials = impactCredentials(process.env);
    if (!credentials.configured) {
      console.error("IMPACT_SEATGEEK_ACCOUNT_SID and IMPACT_SEATGEEK_AUTH_TOKEN (read-only Impact credentials) and CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID must be set.");
      process.exit(1);
    }
    const campaignToProvider = resolveCampaignProviderMap(process.env);
    const [rawActions, d1] = await Promise.all([fetchAllActions(credentials, { since: windows.d90.since, until: windows.d90.until }), runD1(buildScorecardStatements(windows), options)]);
    const actions = rawActions;
    const clickRows = [];
    for (const statement of buildAttributionStatements(actions)) clickRows.push(...(await runD1([statement], options))[statement.key]);
    const { matched, coverage } = matchSubIdAttribution(actions, indexClickRows(clickRows), campaignToProvider);
    card = buildCard({ windows, d1, actions, matched, coverage, campaignToProvider });
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
  const s = sampleInputs();
  const card = buildCard({ windows: w, ...s, campaignToProvider: SAMPLE_CAMPAIGNS, sample: true });
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
  const mixed = summariseActions([normalizeAction({ Id: "x", CampaignId: "1", State: "APPROVED", Payout: "1", Currency: "GBP", EventDate: "2026-11-20" }), normalizeAction({ Id: "y", CampaignId: "1", State: "APPROVED", Payout: "1", Currency: "USD", EventDate: "2026-11-20" })], new Set(), SAMPLE_CAMPAIGNS, w.week);
  ok(Object.keys(mixed.byCurrency).sort().join() === "GBP,USD", "currencies bucketed separately");
  const text = renderScorecard(card);
  for (const part of ["SAMPLE", "unavailable", "upper-bound proxy", "Unmatched orders are never allocated", "Top three actions", "not forecasts"]) ok(text.includes(part), `render includes ${part}`);
  ok(card.topActions.length >= 1 && card.topActions.length <= 3, "at most three actions");
  const empty = buildCard({ windows: w, d1: {}, actions: [], matched: [], coverage: {}, campaignToProvider: SAMPLE_CAMPAIGNS });
  ok(empty.commissionPerClick.value === null && empty.requirements === null && renderScorecard(empty).includes("Unavailable"), "missing data renders as unavailable");
  return checks;
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => { console.error(`Scorecard failed: ${error.message}`); process.exit(1); });
}
