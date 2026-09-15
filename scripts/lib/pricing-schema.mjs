// Runtime detection of optional pricing-schema columns and tables.
//
// Migration 0010 adds provider_pricing_history.event_date and the
// provider_pricing_daily rollup. Both snapshot writers deploy the moment their
// branch merges, but a migration is applied by hand — so for some window the
// code and the database disagree, in whichever direction the operator happens
// to pick.
//
// That window must not be able to cost a price write. A snapshot run's whole
// contract is keeping provider_pricing_cache fresh; with a 24-hour freshness
// constant, a writer that throws for an hour is invisible and a writer that
// throws for a day takes every price on the site dark. So the writers probe
// once per run and emit the column set the database actually has, exactly as
// the analytics writers do for the 0008 columns (see migrations/README.md).
//
// Every probe here is a PRAGMA — a read, and not one that can be made to
// return anything but schema.
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const HISTORY_COLUMNS_PRAGMA = "PRAGMA table_info(provider_pricing_history);";
export const DAILY_COLUMNS_PRAGMA = "PRAGMA table_info(provider_pricing_daily);";

// PRAGMA table_info returns one row per column, so an absent table is an empty
// result rather than an error — which is why `columnNames` doubles as the
// existence check for provider_pricing_daily.
export function columnNames(payload) {
  const root = Array.isArray(payload) ? payload[0] : payload;
  const rows = Array.isArray(root?.results) ? root.results : [];
  return rows.map((row) => String(row?.name ?? "")).filter(Boolean);
}

export function hasColumn(payload, column) {
  return columnNames(payload).includes(column);
}

async function pragma(sql, options, runner) {
  const args = [
    "wrangler", "d1", "execute", options.database,
    options.remote ? "--remote" : "--local",
    "--json", "--command", sql
  ];
  const { stdout } = await (runner ? runner(args) : execFileAsync("npx", args, { maxBuffer: 10 * 1024 * 1024 }));
  return JSON.parse(stdout);
}

// Fail closed to the *previous* column set. A probe that cannot run must never
// be the reason a price write fails: the cost of wrongly omitting event_date is
// one hour of history rows missing an optional field, and the cost of wrongly
// including it is a failed write. Those are not comparable.
export async function historySupportsEventDate(options, runner) {
  try {
    return hasColumn(await pragma(HISTORY_COLUMNS_PRAGMA, options, runner), "event_date");
  } catch {
    return false;
  }
}

// The rollup table is all-or-nothing: without it there is nothing to write, and
// the caller reports that as an explicit reason rather than throwing.
export async function dailyRollupExists(options, runner) {
  try {
    return columnNames(await pragma(DAILY_COLUMNS_PRAGMA, options, runner)).length > 0;
  } catch {
    return false;
  }
}
