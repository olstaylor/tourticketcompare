// D1 storage for the daily show-priority list (scripts/report-show-priority.mjs).
//
// One small table, rewritten once a day. Every reader is fail-open: an empty
// table, a missing table or a failed read means "no priority", and the caller
// falls back to its own order. Priority never decides whether something runs,
// only what goes first.

import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./d1-read.mjs";
import { prioritizeFinalHours } from "./price-timing-capture.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export const PRIORITY_TABLE = "show_priority";

export const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS ${PRIORITY_TABLE} (
  event_id TEXT PRIMARY KEY,
  rank INTEGER NOT NULL,
  artist_slug TEXT NOT NULL,
  event_date TEXT,
  expected_gbp REAL NOT NULL,
  potential_gbp REAL NOT NULL,
  lanes TEXT NOT NULL,
  missing_lanes TEXT NOT NULL,
  computed_at TEXT NOT NULL
)`;

const literal = (value) => (value == null ? "NULL" : typeof value === "number" ? String(value) : `'${String(value).replace(/'/g, "''")}'`);

/** Statements that replace the stored list with `rows` (already ranked). */
export function buildReplaceSql(rows, computedAt) {
  const statements = [CREATE_TABLE_SQL, `DELETE FROM ${PRIORITY_TABLE}`];
  for (let i = 0; i < rows.length; i += 50) {
    const values = rows.slice(i, i + 50).map((row) => `(${[
      row.event_id, row.rank, row.artist_slug, row.date, row.expected_gbp, row.potential_gbp,
      row.lanes.join(","), row.missing_high_paying_lanes.join(","), computedAt
    ].map(literal).join(", ")})`);
    statements.push(`INSERT INTO ${PRIORITY_TABLE} (event_id, rank, artist_slug, event_date, expected_gbp, potential_gbp, lanes, missing_lanes, computed_at) VALUES ${values.join(", ")}`);
  }
  return statements;
}

export function priorityReadSql({ top = 25, maxAgeHours = 72 } = {}) {
  return `SELECT event_id, rank, artist_slug, event_date, expected_gbp, potential_gbp, lanes, missing_lanes, computed_at FROM ${PRIORITY_TABLE} WHERE computed_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${Number(maxAgeHours)} hours') ORDER BY rank LIMIT ${Number(top)}`;
}

/**
 * Stored rows, best first. Never throws: returns [] (and says why on stderr)
 * when the list is missing, stale or unreadable.
 */
export async function readPriorityRows({ database = "tourticketcompare-demand", remote = true, top = 25, exec = execFileAsync } = {}) {
  try {
    const args = buildD1ReadArgs({ database, remote, statements: [{ sql: priorityReadSql({ top }) }] });
    const { stdout } = await exec("npx", args, { cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024, timeout: 60000 });
    const parsed = JSON.parse(stdout);
    const rows = Array.isArray(parsed) && parsed[0]?.success ? parsed[0].results : [];
    return rows.map((row) => ({
      ...row,
      lanes: String(row.lanes || "").split(",").filter(Boolean),
      missing_lanes: String(row.missing_lanes || "").split(",").filter(Boolean)
    }));
  } catch (error) {
    console.error(`::notice::show priority unavailable, using default order (${String(error?.message || error).split("\n")[0].slice(0, 160)})`);
    return [];
  }
}

const idOf = (event) => String(event?.id ?? "").trim();

/** Read completed checks for one lane; failure preserves the existing order. */
export async function readPriceChecks({ provider, database = "tourticketcompare-demand", remote = true, exec = execFileAsync } = {}) {
  try {
    const sql = `SELECT event_id, checked_at FROM provider_price_checks WHERE provider = ${literal(provider)}`;
    const { stdout } = await exec("npx", buildD1ReadArgs({ database, remote, statements: [{ sql }] }), {
      cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024, timeout: 30000
    });
    const parsed = JSON.parse(stdout);
    if (!Array.isArray(parsed) || !parsed[0]?.success || !Array.isArray(parsed[0].results)) throw new Error("no price-check result set");
    return parsed[0].results;
  } catch {
    console.error(`::notice::price-check order unavailable for ${provider}, using default order`);
    return [];
  }
}

/**
 * The order a price-snapshot run visits events in. Shows on the priority list
 * go first, so a run cut short by its fetch deadline still refreshes them. On
 * a final-hours tick (`withinHours`) they follow the final-hours shows, which
 * makes them the most often refreshed shows outside their last 48 hours.
 * Order only: each caller still applies its own eligibility rules.
 */
export function priorityCandidates(events, { withinHours = null, priorityIds = [], priceChecks = [] } = {}, now = new Date()) {
  const byId = new Map(events.map((event) => [idOf(event), event]));
  const first = (priorityIds || []).map((id) => byId.get(String(id).trim())).filter(Boolean);
  if (withinHours) {
    const finalHours = prioritizeFinalHours(events, now, withinHours);
    const seen = new Set(finalHours);
    return [...finalHours, ...first.filter((event) => !seen.has(event))];
  }
  // A capped writer must not repeatedly price the same prefix. Completed
  // lookups (including no-price results) move back; untouched shows go first.
  const checkedAt = new Map(priceChecks.map((row) => [String(row.event_id), Date.parse(row.checked_at)]));
  const age = (event) => Number.isFinite(checkedAt.get(idOf(event))) ? checkedAt.get(idOf(event)) : -Infinity;
  const ordered = priceChecks.length ? [...events].sort((a, b) => age(a) - age(b)) : events;
  if (!first.length) return ordered;
  const seen = new Set(first);
  return [...first, ...ordered.filter((event) => !seen.has(event))];
}
