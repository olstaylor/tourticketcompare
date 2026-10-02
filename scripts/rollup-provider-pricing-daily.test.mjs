// End-to-end tests for the daily price rollup (scripts/rollup-provider-pricing-daily.mjs):
// its real SQL, run through its real run() loop, against SQLite built from the
// real migrations. The script's own --self-test checks the SQL's shape; this
// checks what the SQL does to data.
//
// Run standalone (node --no-warnings scripts/rollup-provider-pricing-daily.test.mjs)
// and in `npm run test:mvp`.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { run, parseArgs } = await import(pathToFileURL(path.join(root, "scripts/rollup-provider-pricing-daily.mjs")));

let passed = 0;
function check(condition, message) {
  assert.ok(condition, `pricing-rollup: ${message}`);
  passed += 1;
}

function freshDb() {
  const db = new DatabaseSync(":memory:");
  for (const file of ["0006_provider_pricing_history.sql", "0012_provider_pricing_daily_rollup.sql"]) {
    db.exec(fs.readFileSync(path.join(root, "migrations", file), "utf8"));
  }
  return db;
}

// Stands in for `npx wrangler d1 execute --json --command <sql>`.
const runnerFor = (db) => async (args) => {
  const sql = args[args.indexOf("--command") + 1];
  const statement = db.prepare(sql.replace(/;\s*$/, ""));
  if (/^\s*(SELECT|PRAGMA)/i.test(sql)) return { stdout: JSON.stringify([{ results: statement.all(), meta: { changes: 0 } }]) };
  const info = statement.run();
  return { stdout: JSON.stringify([{ results: [], meta: { changes: Number(info.changes) } }]) };
};

let rowId = 0;
function observe(db, { event = "e1", price, at, eventDate = "2026-09-20T19:00:00Z", provider = "vivid-seats" }) {
  db.prepare(
    `INSERT INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, source, observed_at, event_date)
     VALUES (?, ?, 'a', ?, ?, 'USD', 'src', ?, ?)`
  ).run(`r${(rowId += 1)}`, event, provider, price, at, eventDate);
}

async function rollup(db, since, until) {
  const options = { ...parseArgs(["--since", since, "--until", until, "--apply"], until), remote: false };
  return run(options, { runner: runnerFor(db), rollupExists: async () => true });
}
const day = (db, event, date) =>
  db.prepare("SELECT * FROM provider_pricing_daily WHERE event_id = ? AND observed_date = ?").get(event, date);

// --- A price that stands across midnight ----------------------------------
{
  const db = freshDb();
  observe(db, { price: 100, at: "2026-09-01T10:00:00.000Z" });
  observe(db, { price: 90, at: "2026-09-01T15:00:00.000Z" });
  observe(db, { price: 80, at: "2026-09-03T12:00:00.000Z" });
  // e2's show was on 1 Sept: it must not be carried past it.
  observe(db, { event: "e2", price: 50, at: "2026-09-01T08:00:00.000Z", eventDate: "2026-09-01T23:00:00Z" });

  const summary = await rollup(db, "2026-09-01", "2026-09-04");
  check(summary.failed === 0, "the run succeeds");

  const d1 = day(db, "e1", "2026-09-01");
  check(d1.low_price_first === 100 && d1.low_price_min === 90 && d1.observations === 2, "a day of changes summarises them");
  const d2 = day(db, "e1", "2026-09-02");
  check(d2 && d2.observations === 0, "an unchanged day gets a carried row, marked by zero observations");
  check(d2.low_price_first === 90 && d2.low_price_last === 90 && d2.first_observed_at === "2026-09-01T15:00:00.000Z", "the carried row holds the standing price and when it was recorded");
  const d3 = day(db, "e1", "2026-09-03");
  check(d3.low_price_first === 90 && d3.low_price_max === 90 && d3.low_price_min === 80 && d3.observations === 1, "a day that changes later opens at the carried price, not the later one");
  check(day(db, "e2", "2026-09-02") === undefined, "a date that has passed is not carried");

  // Hourly re-runs over unchanged days write nothing.
  const again = await rollup(db, "2026-09-01", "2026-09-04");
  check(again.written === 0, `an unchanged re-run writes nothing (wrote ${again.written})`);
}

// --- Correcting rows written before the seed existed ----------------------
{
  const db = freshDb();
  observe(db, { price: 100, at: "2026-09-01T10:00:00.000Z" });
  observe(db, { price: 80, at: "2026-09-02T12:00:00.000Z" });
  await rollup(db, "2026-09-01", "2026-09-02");
  // The old rule's row for 2 Sept: opened at the later price.
  db.prepare(
    `INSERT INTO provider_pricing_daily (id, observed_date, event_id, artist_slug, provider, source, currency, event_date,
       low_price_min, low_price_max, low_price_first, low_price_last, observations, first_observed_at, last_observed_at)
     VALUES ('old', '2026-09-02', 'e1', 'a', 'vivid-seats', 'src', 'USD', NULL, 80, 80, 80, 80, 1, '2026-09-02T12:00:00.000Z', '2026-09-02T12:00:00.000Z')`
  ).run();
  await rollup(db, "2026-09-02", "2026-09-03");
  const fixed = day(db, "e1", "2026-09-02");
  check(fixed.low_price_first === 100 && fixed.low_price_max === 100 && fixed.observations === 1, "a same-count re-run replaces a row that lacked its opening price");
  check(fixed.event_date === "2026-09-20T19:00:00Z", "a NULL event date is enriched");
}

// --- A prune never shrinks a summary --------------------------------------
{
  const db = freshDb();
  observe(db, { price: 100, at: "2026-09-01T10:00:00.000Z" });
  observe(db, { price: 90, at: "2026-09-01T15:00:00.000Z" });
  await rollup(db, "2026-09-01", "2026-09-02");
  db.prepare("DELETE FROM provider_pricing_history WHERE observed_at < '2026-09-01T12:00:00'").run();
  await rollup(db, "2026-09-01", "2026-09-02");
  const kept = day(db, "e1", "2026-09-01");
  check(kept.observations === 2 && kept.low_price_first === 100, "a re-run after a partial prune leaves the fuller summary alone");
}

// --- Failures surface ------------------------------------------------------
{
  const db = freshDb();
  observe(db, { price: 100, at: "2026-09-01T10:00:00.000Z" });
  const failing = async () => { throw new Error("D1 down"); };
  const options = { ...parseArgs(["--since", "2026-09-01", "--until", "2026-09-03", "--apply"], "2026-09-03"), remote: false };
  const summary = await run(options, { runner: failing, rollupExists: async () => true });
  check(summary.failed === 2 && summary.days_failed.length === 2, "failed days are counted and named");
}

console.log(`pricing-rollup: ${passed} checks passed`);
