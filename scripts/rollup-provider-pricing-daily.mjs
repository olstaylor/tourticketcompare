#!/usr/bin/env node
// Daily rollup of provider_pricing_history into provider_pricing_daily
// (migration 0010). Backfill and steady-state are the same operation: this
// script is idempotent per UTC day, so running it once over a wide --since
// window backfills, and running it over the last day or two keeps the rollup
// current.
//
// Why it exists: every scheduled snapshot apply run prunes
// provider_pricing_history to 90 days. That window is right for the on-page
// sparkline and wrong for anything longitudinal — a stadium date goes on sale
// six to twelve months out, so no 90-day window holds one full
// announce-to-door cycle, and the rows that age out are exactly the ones that
// cannot be re-collected. provider_pricing_daily is never pruned.
//
// It reads provider_pricing_history and writes only provider_pricing_daily.
// There is no code path here that deletes or updates a history row, and the
// self-test asserts it.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { MIN_PLAUSIBLE_LISTED_PRICE } from "../functions/api/shows.js";

const execFileAsync = promisify(execFile);

const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
// Same lane list as the retention prune. A scheduled caller scopes to its own
// provider so that concurrent snapshot jobs never contend on the same rollup
// rows, and so the statement seeks the history table's composite index
// idx_provider_pricing_history_provider_observed(provider, observed_at) rather
// than scanning a day across every lane. A backfill normally leaves it unset.
const KNOWN_PROVIDERS = ["ticketnetwork", "stubhub-international", "ticket-liquidator", "vivid-seats", "seatgeek"];
// Steady-state default. Today's UTC day is still accumulating observations and
// yesterday's may have been closed out after the last run, so both are
// recomputed. Re-running a day is safe by construction (see the conflict rule).
const DEFAULT_DAYS = 2;
// A backfill that reaches further than the raw table can possibly go is a
// typo, not a request. The retention prune caps history at 365 days even at
// its most generous setting.
const MAX_BACKFILL_DAYS = 400;

function usage() {
  return `Usage: node scripts/rollup-provider-pricing-daily.mjs [options]

Aggregates provider_pricing_history into the never-pruned provider_pricing_daily
rollup, one row per event x provider x source x currency x UTC day. Dry-run by
default: without --apply it only counts what would be written.

Options:
  --days <n>           Roll up the last n UTC days including today (default: ${DEFAULT_DAYS})
  --since <YYYY-MM-DD> First UTC day to roll up, inclusive. Overrides --days
  --until <YYYY-MM-DD> Day to stop before, exclusive (default: tomorrow)
  --provider <slug>    Roll up one lane only: ${KNOWN_PROVIDERS.join(", ")}
  --database <name>    D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local              Run against the local D1 replica instead of --remote
  --apply              Write the rollup rows (default is a counting dry run)
  --json               Emit the summary as JSON
  --self-test          Run offline assertions and exit
  --help               Show this message

Backfill everything the raw table still holds, then keep it current hourly:
  node scripts/rollup-provider-pricing-daily.mjs --since 2026-06-01 --apply
  node scripts/rollup-provider-pricing-daily.mjs --apply
`;
}

function isDay(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function addDays(day, delta) {
  const ms = Date.parse(`${day}T00:00:00Z`) + delta * 86400000;
  return new Date(ms).toISOString().slice(0, 10);
}

function parseArgs(argv, today = new Date().toISOString().slice(0, 10)) {
  const options = {
    days: DEFAULT_DAYS,
    since: "",
    until: "",
    provider: "",
    database: DEFAULT_D1_DATABASE,
    remote: true,
    apply: false,
    json: false,
    selfTest: false,
    help: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--local") options.remote = false;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (["--days", "--since", "--until", "--provider", "--database"].includes(arg)) {
      const value = argv[index + 1];
      index += 1;
      if (value == null) throw new Error(`${arg} requires a value`);
      if (arg === "--database") options.database = String(value);
      if (arg === "--provider") {
        if (!KNOWN_PROVIDERS.includes(String(value))) {
          throw new Error(`--provider must be one of: ${KNOWN_PROVIDERS.join(", ")}`);
        }
        options.provider = String(value);
      }
      if (arg === "--since" || arg === "--until") {
        if (!isDay(value)) throw new Error(`${arg} must be a YYYY-MM-DD date`);
        options[arg.slice(2)] = String(value);
      }
      if (arg === "--days") {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 1 || n > MAX_BACKFILL_DAYS) {
          throw new Error(`--days must be an integer between 1 and ${MAX_BACKFILL_DAYS}`);
        }
        options.days = n;
      }
    } else throw new Error(`Unknown argument: ${arg}`);
  }

  // --until defaults to tomorrow so that "today" is always included; --since
  // defaults to the --days window counted back from that end.
  const until = options.until || addDays(today, 1);
  const since = options.since || addDays(until, -options.days);
  if (Date.parse(`${since}T00:00:00Z`) >= Date.parse(`${until}T00:00:00Z`)) {
    throw new Error("--since must be earlier than --until");
  }
  const span = Math.round((Date.parse(`${until}T00:00:00Z`) - Date.parse(`${since}T00:00:00Z`)) / 86400000);
  if (span > MAX_BACKFILL_DAYS) throw new Error(`window spans ${span} days, more than the ${MAX_BACKFILL_DAYS}-day cap`);
  return { ...options, since, until, span };
}

function sqlText(value) {
  return String(value ?? "").replaceAll("'", "''");
}

function daysInWindow(since, until) {
  const days = [];
  for (let day = since; Date.parse(`${day}T00:00:00Z`) < Date.parse(`${until}T00:00:00Z`); day = addDays(day, 1)) {
    days.push(day);
  }
  return days;
}

// One UTC day per statement. Chunking keeps each statement bounded regardless
// of how wide a backfill window is, and means a failure mid-backfill leaves
// whole days done rather than a partial day.
//
// The window frame is UNBOUNDED PRECEDING TO UNBOUNDED FOLLOWING so every
// aggregate covers the whole partition — without it LAST_VALUE would return the
// current row, which is the classic SQL window bug. ROW_NUMBER ignores the
// frame, so `rn = 1` collapses each partition to a single output row.
//
// The partition key matches the public read path exactly
// (functions/api/price-history.js filters on event_id + provider + source +
// currency), so a rollup row is never an aggregate across two things the site
// would not show side by side. Currency is in the key deliberately: every
// observation today is USD including events outside the US, where the figure is
// provider-converted rather than local, and those must never be merged.
//
// MAX() rather than FIRST_VALUE() for artist_slug and event_date because MAX
// skips NULLs: rows written before the writers carried event_date sit beside
// newer rows that do, and the day should keep the known value.
function providerClause(provider) {
  return provider ? `\n    AND provider = '${sqlText(provider)}'` : "";
}

function rollupSql(day, provider = "") {
  const since = sqlText(`${day}T00:00:00`);
  const until = sqlText(`${addDays(day, 1)}T00:00:00`);
  return `INSERT INTO provider_pricing_daily
  (id, observed_date, event_id, artist_slug, provider, source, currency, event_date,
   low_price_min, low_price_max, low_price_first, low_price_last,
   observations, first_observed_at, last_observed_at, updated_at)
SELECT
  provider || ':' || event_id || ':' || source || ':' || currency || ':' || observed_date,
  observed_date, event_id, artist_slug, provider, source, currency, event_date,
  low_price_min, low_price_max, low_price_first, low_price_last,
  observations, first_observed_at, last_observed_at, CURRENT_TIMESTAMP
FROM (
  SELECT
    substr(observed_at, 1, 10) AS observed_date,
    event_id, provider, source,
    COALESCE(currency, 'USD') AS currency,
    MAX(artist_slug) OVER w AS artist_slug,
    MAX(event_date) OVER w AS event_date,
    MIN(low_price) OVER w AS low_price_min,
    MAX(low_price) OVER w AS low_price_max,
    FIRST_VALUE(low_price) OVER w AS low_price_first,
    LAST_VALUE(low_price) OVER w AS low_price_last,
    COUNT(*) OVER w AS observations,
    FIRST_VALUE(observed_at) OVER w AS first_observed_at,
    LAST_VALUE(observed_at) OVER w AS last_observed_at,
    ROW_NUMBER() OVER w AS rn
  FROM provider_pricing_history
  WHERE observed_at >= '${since}' AND observed_at < '${until}'
    AND low_price IS NOT NULL AND low_price >= ${MIN_PLAUSIBLE_LISTED_PRICE}${providerClause(provider)}
  WINDOW w AS (
    PARTITION BY event_id, provider, source, COALESCE(currency, 'USD'), substr(observed_at, 1, 10)
    ORDER BY observed_at
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )
)
WHERE rn = 1
ON CONFLICT(event_id, provider, source, currency, observed_date) DO UPDATE SET
  artist_slug = excluded.artist_slug,
  event_date = COALESCE(excluded.event_date, provider_pricing_daily.event_date),
  low_price_min = excluded.low_price_min,
  low_price_max = excluded.low_price_max,
  low_price_first = excluded.low_price_first,
  low_price_last = excluded.low_price_last,
  observations = excluded.observations,
  first_observed_at = excluded.first_observed_at,
  last_observed_at = excluded.last_observed_at,
  updated_at = CURRENT_TIMESTAMP
WHERE excluded.observations >= provider_pricing_daily.observations;`;
}

// The load-bearing safeguard. Re-running the rollup over a day whose raw rows
// have since been pruned would otherwise overwrite a complete summary with a
// thinner one — silently destroying the very history the table exists to keep.
// A day can only ever be replaced by a summary built from at least as many
// observations, so a post-prune re-run is a no-op rather than data loss.
// COALESCE on event_date is the same instinct: a known date is never replaced
// by NULL.

function previewSql(day, provider = "") {
  const since = sqlText(`${day}T00:00:00`);
  const until = sqlText(`${addDays(day, 1)}T00:00:00`);
  return `SELECT COUNT(*) AS rollup_rows, COALESCE(SUM(n), 0) AS observations FROM (
  SELECT COUNT(*) AS n FROM provider_pricing_history
  WHERE observed_at >= '${since}' AND observed_at < '${until}'
    AND low_price IS NOT NULL AND low_price >= ${MIN_PLAUSIBLE_LISTED_PRICE}${providerClause(provider)}
  GROUP BY event_id, provider, source, COALESCE(currency, 'USD')
);`;
}

function firstRow(payload) {
  const root = Array.isArray(payload) ? payload[0] : payload;
  return root?.results?.[0] || {};
}

function changes(payload) {
  const root = Array.isArray(payload) ? payload[0] : payload;
  return Number(root?.meta?.changes ?? 0);
}

async function d1(sql, options, runner) {
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--json", "--command", sql];
  const { stdout } = await (runner ? runner(args) : execFileAsync("npx", args, { maxBuffer: 32 * 1024 * 1024 }));
  return JSON.parse(stdout);
}

async function run(options, deps = {}) {
  const days = daysInWindow(options.since, options.until);
  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    provider: options.provider || "all",
    since: options.since,
    until: options.until,
    days: days.length,
    eligible_rollup_rows: 0,
    observations_summarised: 0,
    written: 0,
    failed: 0,
    days_failed: [],
    // An explicit reason whenever a run writes nothing, so a healthy empty run
    // is never mistaken for a broken one.
    zero_row_reason: null
  };

  for (const day of days) {
    try {
      const preview = firstRow(await d1(previewSql(day, options.provider), options, deps.runner));
      summary.eligible_rollup_rows += Number(preview.rollup_rows ?? 0);
      summary.observations_summarised += Number(preview.observations ?? 0);
      if (options.apply && Number(preview.rollup_rows ?? 0) > 0) {
        summary.written += changes(await d1(rollupSql(day, options.provider), options, deps.runner));
      }
    } catch (error) {
      summary.failed += 1;
      summary.days_failed.push(day);
    }
  }

  if (summary.written === 0) {
    if (summary.failed > 0) summary.zero_row_reason = `every statement failed for ${summary.failed} of ${days.length} day(s)`;
    else if (!options.apply) summary.zero_row_reason = "dry run — re-run with --apply to write";
    else if (summary.eligible_rollup_rows === 0) summary.zero_row_reason = "no history rows in the window cleared the plausibility floor";
    else summary.zero_row_reason = "every day already held a summary built from at least as many observations";
  }
  return summary;
}

function selfTest() {
  let checks = 0;
  const expect = (fn) => { fn(); checks += 1; };

  expect(() => assert.equal(parseArgs([], "2026-09-14").apply, false, "dry-run must be the default"));
  expect(() => assert.equal(parseArgs([], "2026-09-14").remote, true));
  expect(() => assert.equal(parseArgs([], "2026-09-14").since, "2026-09-13"));
  expect(() => assert.equal(parseArgs([], "2026-09-14").until, "2026-09-15", "today must be inside the window"));
  expect(() => assert.equal(parseArgs(["--days", "30"], "2026-09-14").since, "2026-08-16"));
  expect(() => assert.equal(parseArgs(["--since", "2026-06-01"], "2026-09-14").span, 106));
  expect(() => assert.throws(() => parseArgs(["--since", "01-06-2026"]), /YYYY-MM-DD/));
  expect(() => assert.throws(() => parseArgs(["--days", "0"]), /between 1 and/));
  expect(() => assert.throws(() => parseArgs(["--days", "2.5"]), /between 1 and/));
  expect(() => assert.throws(() => parseArgs(["--since", "2026-09-14", "--until", "2026-09-14"]), /earlier than/));
  expect(() => assert.throws(() => parseArgs(["--since", "2020-01-01", "--until", "2026-09-14"]), /more than the/));
  expect(() => assert.throws(() => parseArgs(["--nope"]), /Unknown argument/));
  expect(() => assert.equal(parseArgs([], "2026-09-14").provider, "", "unscoped is the default"));
  expect(() => assert.equal(parseArgs(["--provider", "vivid-seats"], "2026-09-14").provider, "vivid-seats"));
  expect(() => assert.throws(() => parseArgs(["--provider", "not-a-provider"]), /--provider must be one of/));

  expect(() => assert.deepEqual(daysInWindow("2026-09-12", "2026-09-15"), ["2026-09-12", "2026-09-13", "2026-09-14"]));

  const sql = rollupSql("2026-09-13");
  // Writes the rollup and nothing else. A regression that let this statement
  // touch the raw table would destroy the observations it exists to preserve.
  expect(() => assert.match(sql, /^INSERT INTO provider_pricing_daily/));
  expect(() => assert.doesNotMatch(sql, /(DELETE|DROP|ALTER)/i));
  expect(() => assert.doesNotMatch(sql, /UPDATE provider_pricing_history/i));
  expect(() => assert.doesNotMatch(sql, /provider_pricing_cache/i));
  // Day-bounded on both sides, so one statement can never scan the whole table.
  expect(() => assert.match(sql, /observed_at >= '2026-09-13T00:00:00' AND observed_at < '2026-09-14T00:00:00'/));
  // The frame is what makes LAST_VALUE mean "last in the day" rather than
  // "this row", and the floor must match the public read path.
  expect(() => assert.match(sql, /ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING/));
  expect(() => assert.match(sql, new RegExp(`low_price >= ${MIN_PLAUSIBLE_LISTED_PRICE}\\b`)));
  expect(() => assert.equal(MIN_PLAUSIBLE_LISTED_PRICE, 10, "floor drifted from the public price gate"));
  // Currency is partitioned, never collapsed.
  expect(() => assert.match(sql, /PARTITION BY event_id, provider, source, COALESCE\(currency, 'USD'\), substr\(observed_at, 1, 10\)/));
  // The two rules that make a re-run safe after a prune.
  expect(() => assert.match(sql, /WHERE excluded\.observations >= provider_pricing_daily\.observations;$/));
  expect(() => assert.match(sql, /event_date = COALESCE\(excluded\.event_date, provider_pricing_daily\.event_date\)/));
  expect(() => assert.doesNotMatch(previewSql("2026-09-13"), /INSERT|UPDATE|DELETE/i));

  // Provider scoping narrows the read and nothing else: it must not reach the
  // partition key, or one lane's run would collapse rows belonging to another.
  const scoped = rollupSql("2026-09-13", "vivid-seats");
  expect(() => assert.match(scoped, /AND provider = 'vivid-seats'\n  WINDOW w AS/));
  expect(() => assert.match(scoped, /PARTITION BY event_id, provider, source/));
  expect(() => assert.match(previewSql("2026-09-13", "vivid-seats"), /AND provider = 'vivid-seats'/));
  expect(() => assert.doesNotMatch(rollupSql("2026-09-13"), /AND provider = '/));

  return checks;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) return console.log(`Provider pricing daily rollup self-test passed (${selfTest()} checks).`);
  const summary = await run(options);
  if (options.json) return console.log(JSON.stringify(summary, null, 2));
  console.log(`[pricing-rollup] ${summary.mode} ${summary.provider} ${summary.since} -> ${summary.until} (${summary.days} day(s))`);
  console.log(`[pricing-rollup] eligible rollup rows: ${summary.eligible_rollup_rows} from ${summary.observations_summarised} observations`);
  console.log(`[pricing-rollup] written: ${summary.written}${summary.failed ? `, failed days: ${summary.days_failed.join(", ")}` : ""}`);
  if (summary.zero_row_reason) console.log(`[pricing-rollup] zero rows written — ${summary.zero_row_reason}`);
  if (summary.failed > 0) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`[pricing-rollup] ${error.message}`);
    process.exitCode = 1;
  });
}

export { parseArgs, rollupSql, previewSql, daysInWindow, run, selfTest };
