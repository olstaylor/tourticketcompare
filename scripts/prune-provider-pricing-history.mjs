#!/usr/bin/env node
// Bounded retention for provider_pricing_history (migration 0006).
//
// The snapshot writers are deliberately append-only — both assert in their own
// self-tests that the SQL they generate never emits a DELETE or UPDATE against
// this table — so retention lives here, as a separate step that is dry-run by
// default and only ever deletes rows strictly older than a cutoff.
//
// Why it exists: nothing pruned the table before. Snapshots moved to a 2h
// cadence on 2026-07-30, which adds roughly 7.4k rows/day across the three
// numeric lanes (TicketNetwork, StubHub International, Vivid Seats). The
// on-site sparkline and /api/price-history read this table, so unbounded
// growth costs D1 rows-read on every page render, not just storage.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// Ninety days comfortably covers the sparkline's useful range while keeping
// the table bounded at roughly 670k rows at the current cadence.
const DEFAULT_RETENTION_DAYS = 90;
const MIN_RETENTION_DAYS = 30;
const MAX_RETENTION_DAYS = 365;
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
// Every lane that has ever written history rows. A prune is always scoped to
// one provider so the statement seeks on the existing composite index
// idx_provider_pricing_history_provider_observed(provider, observed_at)
// instead of scanning the whole table.
const KNOWN_PROVIDERS = ["ticketnetwork", "stubhub-international", "ticket-liquidator", "vivid-seats", "seatgeek"];

function usage() {
  return `Usage: node scripts/prune-provider-pricing-history.mjs --provider <slug> [options]

Deletes provider_pricing_history rows older than the retention window for one
provider. Dry-run by default: without --apply it only counts what would go.

Options:
  --provider <slug>        Required. One of: ${KNOWN_PROVIDERS.join(", ")}
  --retention-days <n>     Retention window, ${MIN_RETENTION_DAYS} <= n <= ${MAX_RETENTION_DAYS} (default: ${DEFAULT_RETENTION_DAYS})
  --database <name>        D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local                  Run against the local D1 replica instead of --remote
  --apply                  Perform the delete (default is a counting dry run)
  --json                   Emit the summary as JSON
  --self-test              Run offline assertions and exit
  --help                   Show this message
`;
}

function parseArgs(argv) {
  const options = {
    provider: "",
    retentionDays: DEFAULT_RETENTION_DAYS,
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
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--local") options.remote = false;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (["--provider", "--retention-days", "--database"].includes(arg)) {
      const value = argv[index + 1];
      index += 1;
      if (value == null || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--provider") {
        if (!KNOWN_PROVIDERS.includes(value)) throw new Error(`--provider must be one of: ${KNOWN_PROVIDERS.join(", ")}`);
        options.provider = value;
      }
      if (arg === "--retention-days") {
        const n = Number(value);
        if (!Number.isInteger(n) || n < MIN_RETENTION_DAYS || n > MAX_RETENTION_DAYS) {
          throw new Error(`--retention-days must be an integer between ${MIN_RETENTION_DAYS} and ${MAX_RETENTION_DAYS}`);
        }
        options.retentionDays = n;
      }
      if (arg === "--database") options.database = value;
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

// observed_at is stored as a full ISO-8601 instant ("2026-07-22T17:41:08.288Z")
// and compared as text, so the cutoff must be rendered in the same shape.
// datetime() would emit "2026-05-01 21:34:18" — space-separated and with no
// fractional seconds — which only compares correctly by accident (on the
// cutoff day itself 'T' > ' ', so those rows survive an extra day). strftime
// with this format string matches the stored shape exactly.
function cutoffExpr(retentionDays) {
  return `strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${retentionDays} days')`;
}

// Both statements are provider-scoped and cutoff-bounded. There is no code
// path that builds an unqualified DELETE, and none of them name
// provider_pricing_cache — expiring a cache row is the snapshot writer's job.
function countSql(provider, retentionDays) {
  return `SELECT COUNT(*) AS prunable, MIN(observed_at) AS oldest FROM provider_pricing_history WHERE provider = '${sqlText(provider)}' AND observed_at < ${cutoffExpr(retentionDays)};`;
}

function deleteSql(provider, retentionDays) {
  return `DELETE FROM provider_pricing_history WHERE provider = '${sqlText(provider)}' AND observed_at < ${cutoffExpr(retentionDays)};`;
}

function sqlText(value) {
  return String(value ?? "").replaceAll("'", "''");
}

function firstRow(payload) {
  const root = Array.isArray(payload) ? payload[0] : payload;
  return root?.results?.[0] || {};
}

async function d1(sql, options, runner) {
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--json", "--command", sql];
  const { stdout } = await (runner ? runner(args) : execFileAsync("npx", args, { maxBuffer: 10 * 1024 * 1024 }));
  return JSON.parse(stdout);
}

async function run(options, deps = {}) {
  if (!options.provider) throw new Error("--provider is required");
  const counted = firstRow(await d1(countSql(options.provider, options.retentionDays), options, deps.runner));
  const prunable = Number(counted.prunable ?? 0);
  let deleted = 0;
  if (options.apply && prunable > 0) {
    const result = await d1(deleteSql(options.provider, options.retentionDays), options, deps.runner);
    const root = Array.isArray(result) ? result[0] : result;
    deleted = Number(root?.meta?.changes ?? 0);
  }
  return {
    provider: options.provider,
    retention_days: options.retentionDays,
    mode: options.apply ? "apply" : "dry-run",
    prunable,
    deleted,
    oldest_retained_before: counted.oldest ?? null
  };
}

function selfTest() {
  let checks = 0;
  const expect = (fn) => { fn(); checks += 1; };

  expect(() => assert.equal(parseArgs(["--provider", "vivid-seats"]).retentionDays, DEFAULT_RETENTION_DAYS));
  expect(() => assert.equal(parseArgs(["--provider", "vivid-seats"]).apply, false, "dry-run must be the default"));
  expect(() => assert.equal(parseArgs(["--provider", "vivid-seats"]).remote, true));
  expect(() => assert.throws(() => parseArgs(["--provider", "not-a-provider"]), /--provider must be one of/));
  expect(() => assert.throws(() => parseArgs(["--provider", "vivid-seats", "--retention-days", "7"]), /between/));
  expect(() => assert.throws(() => parseArgs(["--provider", "vivid-seats", "--retention-days", "400"]), /between/));
  expect(() => assert.throws(() => parseArgs(["--provider", "vivid-seats", "--retention-days", "45.5"]), /between/));
  expect(() => assert.equal(parseArgs(["--provider", "ticketnetwork", "--retention-days", "45"]).retentionDays, 45));

  const del = deleteSql("vivid-seats", 90);
  // The load-bearing shape assertions: always provider-scoped, always bounded
  // by a cutoff, never a bare table-wide delete, never the cache table.
  expect(() => assert.match(del, /WHERE provider = 'vivid-seats'/));
  expect(() => assert.match(del, /observed_at < strftime\('%Y-%m-%dT%H:%M:%fZ', 'now', '-90 days'\)/));
  // The cutoff must render in the same shape as the stored ISO instants; a
  // bare datetime() would drop the T/Z and the fractional seconds.
  expect(() => assert.doesNotMatch(del, /datetime\('now'/));
  expect(() => assert.doesNotMatch(del, /provider_pricing_cache/i));
  expect(() => assert.doesNotMatch(del, /DELETE FROM provider_pricing_history\s*;/i));
  expect(() => assert.doesNotMatch(countSql("vivid-seats", 90), /DELETE|UPDATE/i));
  expect(() => assert.match(deleteSql("o'brien", 90), /'o''brien'/));

  return checks;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) return console.log(`provider_pricing_history prune self-test passed (${selfTest()} checks).`);
  const summary = await run(options);
  console.log(options.json
    ? JSON.stringify(summary, null, 2)
    : `${summary.provider} history prune (${summary.mode}, ${summary.retention_days}d): ${summary.prunable} prunable, ${summary.deleted} deleted.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => { console.error(error?.stack || error); process.exitCode = 1; });
}

export { countSql, deleteSql, parseArgs, run, selfTest };
