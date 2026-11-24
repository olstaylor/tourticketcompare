// Nightly append-only ledger of Impact orders (actions).
//
// The Actions API is read in 45-day windows, so an order's state (pending ->
// approved -> reversed) and its lock/clearing dates vanish from every report
// once it ages out, and no report can say which commissions were ultimately
// approved. This script keeps one durable row per Impact action id in
// `impact_action_ledger`, plus one row per state change in
// `impact_action_state_history`. See docs/COMMERCIAL_FUNNEL.md.
//
// Reads: Impact Actions API (GET only) and D1 SELECTs (the retained TTC click
// for a valid SubId1). Writes: only the two tables above. It never touches
// /api/out, tracking links, analytics_events or Impact. Rows are never deleted.
//
//   node scripts/sync-impact-action-ledger.mjs [--since YYYY-MM-DD] [--dry-run] [--local] [--markdown <file>]
//   node scripts/sync-impact-action-ledger.mjs --self-test
//
// Default window is the last 45 days, enough for a nightly refresh. Use
// --since once for the first backfill (Impact returns about 12 months).

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFile } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { classifyPageType } from "../functions/_funnel.js";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
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
import { isValidClickId } from "../functions/_funnel.js";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const DAY_MS = 24 * 60 * 60 * 1000;
const BATCH = 25;

export const MIGRATION_SQL = readFileSync(path.join(REPO_ROOT, "migrations/0015_impact_action_ledger.sql"), "utf8")
  .split("\n").filter((line) => !line.trim().startsWith("--")).join("\n")
  .split(";").map((s) => s.trim()).filter(Boolean);

// ── SQL value helpers: every interpolated value is validated, not escaped ──

const SAFE_ID = /^[A-Za-z0-9_.:-]{1,64}$/;
const SAFE_SLUG = /^[a-z0-9][a-z0-9_.-]{0,119}$/;
const SAFE_PATH = /^\/[A-Za-z0-9/_.-]{0,254}$/;
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const ISO_TS = /^\d{4}-\d{2}-\d{2}T[\d:.]{8,12}Z$/;
const STATES = new Set(["PENDING", "APPROVED", "REVERSED", "UNKNOWN"]);

function lit(value, pattern) {
  return typeof value === "string" && pattern.test(value) ? `'${value}'` : "NULL";
}
function num(value, known = true) {
  return known && Number.isFinite(Number(value)) ? String(Number(value)) : "NULL";
}

// How an action relates to a retained TTC click. Never guessed: only a valid
// SubId1 that matched an eligible click with an agreeing provider is "matched".
export function attributionOf(action, matchedById, lookupFailed = false) {
  if (lookupFailed && action.subId1 && isValidClickId(action.subId1)) return "unknown";
  if (!action.subId1) return "no_sub_id";
  if (!isValidClickId(action.subId1)) return "invalid_sub_id";
  return matchedById.has(action.id) ? "matched" : "unmatched";
}

export function buildLedgerStatements(actions, matched, campaignToProvider, nowIso, { lookupFailed = false } = {}) {
  assert.match(nowIso, ISO_TS);
  const matchedById = new Map(matched.map((m) => [m.actionId, m]));
  const statements = [];
  for (const action of actions) {
    if (!SAFE_ID.test(action.id)) continue; // never write an id we cannot validate
    const state = STATES.has(action.state) ? action.state : "UNKNOWN";
    const attribution = attributionOf(action, matchedById, lookupFailed);
    const click = matchedById.get(action.id) || null;
    const id = `'${action.id}'`;
    const payout = num(action.payout, action.payoutKnown);
    const sourcePath = click && SAFE_PATH.test(click.sourcePath || "") ? click.sourcePath : null;
    // History first, so it sees the previous state. One row per new state per
    // action; a re-run in the same state adds nothing.
    statements.push(
      `INSERT OR IGNORE INTO impact_action_state_history (action_id, observed_at, from_state, to_state, payout) ` +
      `SELECT ${id}, '${nowIso}', (SELECT state FROM impact_action_ledger WHERE action_id = ${id}), '${state}', ${payout} ` +
      `WHERE NOT EXISTS (SELECT 1 FROM impact_action_ledger WHERE action_id = ${id} AND state = '${state}')`
    );
    statements.push(
      `INSERT INTO impact_action_ledger (action_id, campaign_id, provider, state, state_changed_at, first_seen_at, last_seen_at, event_date, lock_date, cleared_date, payout, currency, click_id, attribution, artist_slug, event_id, page_type, source_path, cta_location, clicked_at) VALUES (` +
      [
        id, lit(action.campaignId, SAFE_ID), lit(campaignToProvider.get(action.campaignId), SAFE_SLUG), `'${state}'`,
        `'${nowIso}'`, `'${nowIso}'`, `'${nowIso}'`, lit(action.day, ISO_DAY), lit(action.lockDate, ISO_DAY), lit(action.clearedDate, ISO_DAY),
        payout, lit(action.currency, /^[A-Z]{3}$/),
        click ? lit(action.subId1, /^[0-9a-f]{24}$/) : "NULL", `'${attribution}'`,
        lit(click?.artistSlug, SAFE_SLUG), lit(click?.eventId, SAFE_ID),
        sourcePath ? lit(classifyPageType(sourcePath), SAFE_SLUG) : "NULL", sourcePath ? `'${sourcePath}'` : "NULL",
        lit(click?.ctaLocation, SAFE_SLUG), lit(click?.clickedAt, ISO_TS)
      ].join(", ") +
      `) ON CONFLICT(action_id) DO UPDATE SET ` +
      `state_changed_at = CASE WHEN impact_action_ledger.state <> excluded.state THEN excluded.last_seen_at ELSE impact_action_ledger.state_changed_at END, ` +
      `state = excluded.state, last_seen_at = excluded.last_seen_at, ` +
      `payout = COALESCE(excluded.payout, impact_action_ledger.payout), ` +
      `event_date = COALESCE(excluded.event_date, impact_action_ledger.event_date), ` +
      `lock_date = COALESCE(excluded.lock_date, impact_action_ledger.lock_date), ` +
      `cleared_date = COALESCE(excluded.cleared_date, impact_action_ledger.cleared_date), ` +
      `currency = COALESCE(excluded.currency, impact_action_ledger.currency), ` +
      `provider = COALESCE(excluded.provider, impact_action_ledger.provider), ` +
      `click_id = COALESCE(impact_action_ledger.click_id, excluded.click_id), ` +
      `attribution = CASE WHEN impact_action_ledger.attribution = 'matched' OR excluded.attribution = 'unknown' THEN impact_action_ledger.attribution ELSE excluded.attribution END, ` +
      `artist_slug = COALESCE(impact_action_ledger.artist_slug, excluded.artist_slug), ` +
      `event_id = COALESCE(impact_action_ledger.event_id, excluded.event_id), ` +
      `page_type = COALESCE(impact_action_ledger.page_type, excluded.page_type), ` +
      `source_path = COALESCE(impact_action_ledger.source_path, excluded.source_path), ` +
      `cta_location = COALESCE(impact_action_ledger.cta_location, excluded.cta_location), ` +
      `clicked_at = COALESCE(impact_action_ledger.clicked_at, excluded.clicked_at)`
    );
  }
  return statements;
}

// Flags for an import that did not fully succeed. Any flag makes the run
// non-ok and the workflow step fails, so a partial import is never silent.
export function importFlags(actions, { lookupFailed = false } = {}) {
  const flags = [];
  const skipped = actions.filter((a) => !SAFE_ID.test(a.id)).length;
  if (lookupFailed) flags.push("attribution_lookup_failed");
  if (skipped) flags.push(`skipped_unsafe_id:${skipped}`);
  const unknownState = actions.filter((a) => !STATES.has(a.state) || a.state === "UNKNOWN").length;
  if (unknownState) flags.push(`unknown_state:${unknownState}`);
  const noPayout = actions.filter((a) => !a.payoutKnown).length;
  if (noPayout) flags.push(`missing_payout:${noPayout}`);
  return flags;
}

export function runLogStatement(nowIso, status, sinceIso, fetched, written, flags) {
  assert.match(nowIso, ISO_TS);
  assert.ok(["ok", "incomplete", "failed"].includes(status));
  const safeFlags = flags.map((f) => String(f).replace(/[^A-Za-z0-9_:.-]/g, "").slice(0, 60)).join(",").slice(0, 300);
  return `INSERT OR IGNORE INTO impact_action_import_runs (run_at, status, window_since, fetched, written, flags) VALUES ('${nowIso}', '${status}', ${lit(sinceIso, ISO_TS)}, ${Math.max(0, Number(fetched) | 0)}, ${Math.max(0, Number(written) | 0)}, ${safeFlags ? `'${safeFlags}'` : "NULL"})`;
}

export const SUMMARY_SQL = [
  "SELECT state, attribution, currency, COUNT(*) AS actions, ROUND(SUM(COALESCE(payout, 0)), 2) AS payout, SUM(CASE WHEN payout IS NULL THEN 1 ELSE 0 END) AS missing_payout, SUM(CASE WHEN lock_date IS NOT NULL THEN 1 ELSE 0 END) AS with_lock_date, MIN(event_date) AS oldest_event FROM impact_action_ledger GROUP BY 1, 2, 3 ORDER BY 1, 2",
  "SELECT COUNT(*) AS changes FROM impact_action_state_history WHERE from_state IS NOT NULL"
];

export function renderSummary(rows, changes, { dryRun = false, fetched = 0, now }) {
  const lines = [`### Impact order ledger${dryRun ? " (dry run: nothing written)" : ""}`, "",
    `Impact returned ${fetched} actions this run. Ledger totals below are all-time (rows are never deleted). Only APPROVED is earned; PENDING is not income.`, "",
    "| State | Attribution | Currency | Actions | Payout | Missing payout | With lock date | Oldest event |", "|---|---|---|---:|---:|---:|---:|---|"];
  for (const r of rows) {
    lines.push(`| ${r.state} | ${r.attribution} | ${r.currency || "n/a"} | ${r.actions} | ${Number(r.payout).toFixed(2)} | ${r.missing_payout} | ${r.with_lock_date} | ${r.oldest_event || "n/a"} |`);
  }
  if (!rows.length) lines.push("| (empty) | | | 0 | 0.00 | 0 | 0 | |");
  lines.push("", `State changes recorded since the ledger started: ${changes}.`,
    "Attribution: `matched` = valid SubId1 joined to one eligible TTC click with the same provider; `no_sub_id` / `invalid_sub_id` = cannot be tied to TTC; `unmatched` = SubId1 present but no qualifying click. None of these is assumed to be TTC revenue unless `matched`.",
    `Generated ${now}.`);
  return lines.join("\n");
}

// ── I/O ─────────────────────────────────────────────────────────────────────

async function runD1(statements, local, write) {
  const sql = statements.map((s) => `${s};`).join("\n");
  const args = write
    ? ["wrangler", "d1", "execute", DATABASE, local ? "--local" : "--remote", "--command", sql, "--json"]
    : buildD1ReadArgs({ database: DATABASE, remote: !local, statements: statements.map((s) => ({ sql: s })) });
  const { stdout } = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
  return JSON.parse(stdout);
}

async function main(argv) {
  const arg = (name, fallback = "") => { const i = argv.indexOf(name); return i === -1 ? fallback : argv[i + 1]; };
  const local = argv.includes("--local");
  const dryRun = argv.includes("--dry-run");
  const now = new Date();
  const nowIso = now.toISOString().replace(/\.\d+Z$/, "Z");
  const since = arg("--since") ? new Date(`${arg("--since")}T00:00:00Z`) : new Date(now.getTime() - 45 * DAY_MS);
  if (Number.isNaN(since.getTime())) throw new Error("--since must be YYYY-MM-DD");
  const sinceIso = since.toISOString();
  const credentials = impactCredentials({
    ...process.env,
    IMPACT_SEATGEEK_ACCOUNT_SID: process.env.IMPACT_SEATGEEK_ACCOUNT_SID || process.env.IMPACT_ACCOUNT_SID,
    IMPACT_SEATGEEK_AUTH_TOKEN: process.env.IMPACT_SEATGEEK_AUTH_TOKEN || process.env.IMPACT_AUTH_TOKEN
  });
  const finish = async (status, fetched, written, flags, summaryRows = [], changes = 0) => {
    if (!dryRun) {
      try { await runD1([...MIGRATION_SQL, runLogStatement(nowIso, status, sinceIso.replace(/\.\d+Z$/, "Z"), fetched, written, flags)], local, true); } catch { flags.push("run_log_not_written"); }
    }
    const body = [renderSummary(summaryRows, changes, { dryRun, fetched, now: nowIso }),
      "", `Import status: **${status}**${flags.length ? ` (${flags.join(", ")})` : ""}.`].join("\n");
    if (arg("--markdown")) writeFileSync(arg("--markdown"), `${body}\n`);
    console.log(body);
    return status === "ok" ? 0 : 1;
  };
  // A missing credential must be loud: a silently skipped nightly import is
  // exactly the failure this ledger exists to prevent.
  if (!credentials.configured) return finish("failed", 0, 0, ["impact_credentials_missing"]);
  let actions;
  try {
    actions = await fetchAllActions(credentials, { since: sinceIso, until: now.toISOString() });
  } catch (error) {
    return finish("failed", 0, 0, ["impact_fetch_failed"]);
  }
  const campaignToProvider = resolveCampaignProviderMap();
  const lookups = buildAttributionStatements(actions);
  let rows = [];
  let lookupFailed = false;
  if (lookups.length) {
    try {
      const results = parseWranglerJson(JSON.stringify(await runD1(lookups.map((l) => l.sql), local, false)), lookups);
      rows = Object.values(results).flat();
    } catch { lookupFailed = true; }
  }
  const { matched } = lookupFailed ? { matched: [] } : matchSubIdAttribution(actions, indexClickRows(rows), campaignToProvider);
  const statements = buildLedgerStatements(actions, matched, campaignToProvider, nowIso, { lookupFailed });
  const flags = importFlags(actions, { lookupFailed });
  const written = statements.length / 2;
  let summaryRows = [];
  let changes = 0;
  if (!dryRun) {
    try {
      await runD1(MIGRATION_SQL, local, true);
      for (let i = 0; i < statements.length; i += BATCH * 2) await runD1(statements.slice(i, i + BATCH * 2), local, true);
      const out = await runD1(SUMMARY_SQL, local, true);
      summaryRows = out[0].results;
      changes = out[1].results[0]?.changes ?? 0;
    } catch (error) {
      return finish("failed", actions.length, 0, [...flags, "d1_write_failed"]);
    }
  }
  return finish(flags.length ? "incomplete" : "ok", actions.length, written, flags, summaryRows, changes);
}

// ── Self-test ───────────────────────────────────────────────────────────────

// node:sqlite is loaded only by the self-test (Node 22+), never by a real run.
function require_sqlite() { return createRequire(import.meta.url)("node:sqlite"); }

function selfTest() {
  let failed = 0;
  const check = (name, fn) => { try { fn(); console.log(`ok  ${name}`); } catch (e) { failed += 1; console.error(`FAIL ${name}: ${e.message}`); } };
  const clickId = "0123456789abcdef01234567";
  const map = new Map([["1111", "vivid-seats"]]);
  const now = "2026-11-24T06:40:00Z";
  const base = { campaignId: "1111", currency: "GBP", payoutKnown: true, day: "2026-11-10", lockDate: null, clearedDate: null };
  const actions = [
    { ...base, id: "A1", state: "PENDING", payout: 10, subId1: clickId, lockDate: "2026-12-10" },
    { ...base, id: "A2", state: "APPROVED", payout: 4.56, subId1: null },
    { ...base, id: "A3", state: "PENDING", payout: 2, subId1: "legacy" },
    { ...base, id: "bad id;DROP", state: "PENDING", payout: 1, subId1: null },
    { ...base, id: "A5", state: "PENDING", payout: 0, payoutKnown: false, subId1: "ffffffffffffffffffffffff" }
  ];
  const matched = [{ actionId: "A1", clickId, artistSlug: "don-omar", eventId: "evt_1", provider: "vivid-seats", clickedAt: "2026-11-09T20:00:00.000Z", sourcePath: "/artists/don-omar", ctaLocation: "event_card" }];

  check("migration file parses into idempotent CREATE statements", () => {
    assert.equal(MIGRATION_SQL.length, 4);
    assert.ok(MIGRATION_SQL.every((s) => /^CREATE (TABLE|INDEX) IF NOT EXISTS/.test(s)));
    assert.ok(!MIGRATION_SQL.join(" ").match(/DROP|DELETE/i));
  });
  check("one history + one upsert per valid action; unsafe ids are skipped", () => {
    const sql = buildLedgerStatements(actions, matched, map, now);
    assert.equal(sql.length, 8);
    assert.ok(!sql.join("\n").includes("DROP"));
  });
  check("only a matched click yields page fields; others stay NULL and unattributed", () => {
    const sql = buildLedgerStatements(actions, matched, map, now);
    const a1 = sql.find((s) => s.startsWith("INSERT INTO impact_action_ledger") && s.includes("'A1'"));
    assert.ok(a1.includes("'matched'") && a1.includes("'don-omar'") && a1.includes("'artist'") && a1.includes(`'${clickId}'`));
    const a2 = sql.find((s) => s.startsWith("INSERT INTO impact_action_ledger") && s.includes("'A2'"));
    assert.ok(a2.includes("'no_sub_id'") && !a2.includes("don-omar"));
    assert.ok(sql.find((s) => s.includes("'A3'") && s.includes("'invalid_sub_id'")));
    assert.ok(sql.find((s) => s.includes("'A5'") && s.includes("'unmatched'")));
  });
  check("unknown payout is NULL, never zero", () => {
    const a5 = buildLedgerStatements(actions, matched, map, now).find((s) => s.startsWith("INSERT INTO impact_action_ledger") && s.includes("'A5'"));
    assert.ok(/'2026-11-10', NULL, NULL, NULL, 'GBP'/.test(a5));
  });
  check("upsert keeps first_seen and records state change time only on change", () => {
    const up = buildLedgerStatements([actions[0]], matched, map, now)[1];
    assert.ok(!/first_seen_at = /.test(up));
    assert.ok(up.includes("CASE WHEN impact_action_ledger.state <> excluded.state THEN excluded.last_seen_at"));
    assert.ok(up.includes("attribution = CASE WHEN impact_action_ledger.attribution = 'matched'"));
  });
  check("history is written before the upsert and only when the state is new", () => {
    const [h, u] = buildLedgerStatements([actions[0]], matched, map, now);
    assert.ok(h.startsWith("INSERT OR IGNORE INTO impact_action_state_history"));
    assert.ok(h.includes("WHERE NOT EXISTS (SELECT 1 FROM impact_action_ledger WHERE action_id = 'A1' AND state = 'PENDING')"));
    assert.ok(u.startsWith("INSERT INTO impact_action_ledger"));
  });
  check("no statement deletes or touches other tables", () => {
    const all = buildLedgerStatements(actions, matched, map, now).concat(MIGRATION_SQL).join("\n");
    assert.ok(!/DELETE|DROP|UPDATE\s+analytics_events|ALTER/i.test(all));
    assert.ok(!all.includes("analytics_events"));
  });
  check("normalizeAction keeps lock and clearing dates only as dates", () => {
    const n = normalizeAction({ Id: "1", CampaignId: "1", State: "PENDING", Payout: "1", LockingDate: "2026-12-10T00:00:00Z", ClearedDate: "garbage" });
    assert.equal(n.lockDate, "2026-12-10");
    assert.equal(n.clearedDate, null);
  });
  check("summary states what is and is not income and TTC", () => {
    const md = renderSummary([{ state: "PENDING", attribution: "matched", currency: "GBP", actions: 1, payout: 10, missing_payout: 0, with_lock_date: 1, oldest_event: "2026-11-10" }], 0, { fetched: 5, now });
    assert.ok(md.includes("PENDING is not income") && md.includes("None of these is assumed to be TTC revenue unless `matched`"));
  });
  // Real SQLite execution of the generated SQL (D1 is SQLite).
  const { DatabaseSync } = require_sqlite();
  const run = (db, sqlList) => { for (const q of sqlList) db.exec(q); };
  const fresh = () => { const db = new DatabaseSync(":memory:"); run(db, MIGRATION_SQL); return db; };
  const day1 = "2026-11-24T06:40:00Z";
  const day2 = "2026-11-25T06:40:00Z";
  const four = [
    { ...base, id: "P", state: "PENDING", payout: 10, subId1: clickId, lockDate: "2026-12-10" },
    { ...base, id: "R", state: "REVERSED", payout: 3, subId1: null },
    { ...base, id: "U", state: "PENDING", payout: 5, subId1: "ffffffffffffffffffffffff" },
    { ...base, id: "V", state: "APPROVED", payout: 7, subId1: null }
  ];
  check("sqlite: pending, approved, reversed and unmatched orders land once, unmatched stay unassigned", () => {
    const db = fresh();
    run(db, buildLedgerStatements(four, [{ ...matched[0], actionId: "P" }], map, day1));
    const rows = db.prepare("SELECT action_id, state, attribution, artist_slug, page_type, provider, payout FROM impact_action_ledger ORDER BY action_id").all();
    assert.equal(rows.length, 4);
    const by = Object.fromEntries(rows.map((r) => [r.action_id, r]));
    assert.equal(by.P.attribution, "matched"); assert.equal(by.P.artist_slug, "don-omar"); assert.equal(by.P.page_type, "artist");
    assert.equal(by.P.provider, "vivid-seats");
    for (const id of ["R", "U", "V"]) { assert.equal(by[id].artist_slug, null); assert.equal(by[id].page_type, null); }
    assert.equal(by.U.attribution, "unmatched"); assert.equal(by.R.attribution, "no_sub_id");
    assert.equal(by.R.state, "REVERSED"); assert.equal(by.V.state, "APPROVED");
  });
  check("sqlite: re-import is idempotent (no duplicate orders or history)", () => {
    const db = fresh();
    for (const t of [day1, day2]) run(db, buildLedgerStatements(four, [{ ...matched[0], actionId: "P" }], map, t));
    assert.equal(db.prepare("SELECT COUNT(*) n FROM impact_action_ledger").get().n, 4);
    assert.equal(db.prepare("SELECT COUNT(*) n FROM impact_action_state_history").get().n, 4);
    const p = db.prepare("SELECT first_seen_at, last_seen_at, state_changed_at FROM impact_action_ledger WHERE action_id = 'P'").get();
    assert.deepEqual({ ...p }, { first_seen_at: day1, last_seen_at: day2, state_changed_at: day1 });
  });
  check("sqlite: status change is preserved with history, and lock date is not erased when absent", () => {
    const db = fresh();
    run(db, buildLedgerStatements(four, [{ ...matched[0], actionId: "P" }], map, day1));
    const next = four.map((a) => (a.id === "P" ? { ...a, state: "APPROVED", lockDate: null } : a));
    run(db, buildLedgerStatements(next, [{ ...matched[0], actionId: "P" }], map, day2));
    const p = db.prepare("SELECT state, state_changed_at, first_seen_at, lock_date FROM impact_action_ledger WHERE action_id = 'P'").get();
    assert.deepEqual({ ...p }, { state: "APPROVED", state_changed_at: day2, first_seen_at: day1, lock_date: "2026-12-10" });
    const h = db.prepare("SELECT from_state, to_state FROM impact_action_state_history WHERE action_id = 'P' ORDER BY observed_at").all().map((r) => ({ ...r }));
    assert.deepEqual(h, [{ from_state: null, to_state: "PENDING" }, { from_state: "PENDING", to_state: "APPROVED" }]);
  });
  check("sqlite: matched attribution survives a later run that cannot see the click; a failed lookup never downgrades", () => {
    const db = fresh();
    run(db, buildLedgerStatements(four, [{ ...matched[0], actionId: "P" }], map, day1));
    run(db, buildLedgerStatements(four, [], map, day2, { lookupFailed: true }));
    assert.equal(db.prepare("SELECT attribution FROM impact_action_ledger WHERE action_id = 'P'").get().attribution, "matched");
    assert.equal(db.prepare("SELECT attribution FROM impact_action_ledger WHERE action_id = 'U'").get().attribution, "unmatched");
    const db2 = fresh();
    run(db2, buildLedgerStatements(four, [], map, day1, { lookupFailed: true }));
    assert.equal(db2.prepare("SELECT attribution FROM impact_action_ledger WHERE action_id = 'P'").get().attribution, "unknown");
  });
  check("import flags and run log: failed or incomplete imports are visible", () => {
    assert.deepEqual(importFlags(four), []);
    assert.deepEqual(importFlags([...four, { ...base, id: "x y", state: "UNKNOWN", payoutKnown: false }], { lookupFailed: true }).sort(),
      ["attribution_lookup_failed", "missing_payout:1", "skipped_unsafe_id:1", "unknown_state:1"]);
    const db = fresh();
    db.exec(runLogStatement(day1, "incomplete", "2026-10-10T00:00:00Z", 4, 4, ["missing_payout:1"]));
    db.exec(runLogStatement(day1, "failed", null, 0, 0, []));
    const r = db.prepare("SELECT status, flags, written FROM impact_action_import_runs").all();
    assert.equal(r.length, 1);
    assert.equal(r[0].status, "incomplete");
  });
  if (failed) { console.error(`${failed} self-test(s) failed`); return 1; }
  console.log("Impact ledger self-test passed.");
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const code = process.argv.includes("--self-test") ? selfTest() : await main(process.argv.slice(2)).catch((e) => { console.error(e.message); return 1; });
  process.exit(code);
}
