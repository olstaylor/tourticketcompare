#!/usr/bin/env node
// One-off: give legacy price history its event date.
//
// Migration 0012 added provider_pricing_history.event_date (and the daily
// rollup's copy of it), and the snapshot writers fill it from the moment they
// see the column. Every row written before that is NULL. Those rows are what a
// time-to-show analysis is built from, the raw table ages out at 90 days, and
// events.json drops an event's record soon after the show. So the date has to
// be copied onto the rows now, from the same field the writers use
// (events.json `datetime_iso`), while both still exist.
//
// Only NULLs are filled. A date a writer already recorded is never touched, and
// no other column is. Dry-run by default: without --apply it only counts.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const TABLES = ["provider_pricing_history", "provider_pricing_daily"];
// Events per statement: keeps each UPDATE's CASE and IN lists well under D1's
// statement-size limit.
const CHUNK = 100;

function sqlText(value) {
  return String(value ?? "").replaceAll("'", "''");
}

// The writers' own rule (snapshot-*-prices.mjs): datetime_iso, trimmed, at most
// 64 characters. Anything else is skipped rather than guessed.
export function eventDates(events) {
  const dates = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    const id = String(event?.id || "").trim();
    const iso = String(event?.datetime_iso || "").trim().slice(0, 64);
    if (id && iso && Number.isFinite(Date.parse(iso))) dates.set(id, iso);
  }
  return dates;
}

export function updateStatements(dates) {
  const entries = [...dates.entries()];
  const statements = [];
  for (let offset = 0; offset < entries.length; offset += CHUNK) {
    const chunk = entries.slice(offset, offset + CHUNK);
    const cases = chunk.map(([id, iso]) => `WHEN '${sqlText(id)}' THEN '${sqlText(iso)}'`).join(" ");
    const ids = chunk.map(([id]) => `'${sqlText(id)}'`).join(", ");
    for (const table of TABLES) {
      statements.push(
        `UPDATE ${table} SET event_date = CASE event_id ${cases} END WHERE event_date IS NULL AND event_id IN (${ids});`
      );
    }
  }
  return statements;
}

export function countSql() {
  return TABLES.map((table) => `SELECT '${table}' AS table_name, COUNT(*) AS null_rows FROM ${table} WHERE event_date IS NULL`).join(" UNION ALL ") + ";";
}

async function d1(sql, options) {
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--json", "--command", sql];
  const { stdout } = await execFileAsync("npx", args, { cwd: ROOT, maxBuffer: 32 * 1024 * 1024 });
  return JSON.parse(stdout);
}

function selfTest() {
  const dates = eventDates([
    { id: "a", datetime_iso: "2026-10-03T23:00:00Z" },
    { id: "o'b", datetime_iso: "2026-10-04T00:00:00Z" },
    { id: "c", datetime_iso: "" },
    { id: "", datetime_iso: "2026-10-05T00:00:00Z" },
    { id: "d", datetime_iso: "not a date" }
  ]);
  assert.deepEqual([...dates.keys()], ["a", "o'b"], "only events with an id and a parseable date");
  const statements = updateStatements(dates);
  assert.equal(statements.length, 2, "one statement per table per chunk");
  for (const sql of statements) {
    assert.match(sql, /WHERE event_date IS NULL AND event_id IN \('a', 'o''b'\);$/, "only NULLs, only these events, quoted");
    assert.match(sql, /SET event_date = CASE event_id WHEN 'a' THEN '2026-10-03T23:00:00Z'/);
    assert.doesNotMatch(sql, /DELETE|INSERT|DROP|low_price|observed_at/i, "touches event_date and nothing else");
  }
  assert.equal(updateStatements(eventDates(Array.from({ length: 250 }, (_, i) => ({ id: `e${i}`, datetime_iso: "2026-10-03T00:00:00Z" })))).length, 6, "chunked at 100 events");
  return 7;
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--self-test")) return console.log(`pricing event-date backfill self-test passed (${selfTest()} checks).`);
  const options = {
    apply: argv.includes("--apply"),
    remote: !argv.includes("--local"),
    database: argv.includes("--database") ? argv[argv.indexOf("--database") + 1] : DEFAULT_D1_DATABASE
  };
  const events = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/events.json"), "utf8"));
  const dates = eventDates(events);
  const before = (await d1(countSql(), options))[0]?.results || [];
  console.log(`[event-date-backfill] ${dates.size} events with a date; NULL rows before: ${before.map((r) => `${r.table_name}=${r.null_rows}`).join(", ")}`);
  if (!options.apply) return console.log("[event-date-backfill] dry run — re-run with --apply to write");
  let changed = 0;
  for (const sql of updateStatements(dates)) changed += Number((await d1(sql, options))[0]?.meta?.changes ?? 0);
  const after = (await d1(countSql(), options))[0]?.results || [];
  console.log(`[event-date-backfill] rows dated: ${changed}; NULL rows after: ${after.map((r) => `${r.table_name}=${r.null_rows}`).join(", ")}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`[event-date-backfill] ${error.message}`);
    process.exitCode = 1;
  });
}
