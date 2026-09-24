// Record of when each price lane last looked for a listed price on an event.
//
// The snapshot writers only upsert provider_pricing_cache when a usable price
// comes back, so a card with no price could never say when anyone last looked.
// Every event a writer queries successfully now leaves one row here, priced or
// not, which is what lets the router print "No listed price at our last check
// of Vivid Seats (<time>)" instead of an undated absence
// (priceUnavailableNote in functions/[[path]].js, read through
// fetchProviderPriceChecks in functions/api/shows.js).
//
// Only a completed lookup is recorded. A failed catalog fetch establishes
// nothing about the listing, so it writes no row and the card keeps its
// previous check time (which then ages out of the 36h quote window).
//
// The table is created by the same SQL file that writes to it
// (CREATE TABLE IF NOT EXISTS), so no separate migration run is needed before
// the first writer run. migrations/0010_provider_price_checks.sql records the
// same schema for the ledger.

export const PRICE_CHECK_OUTCOMES = Object.freeze(["priced", "no_price"]);

export const PRICE_CHECKS_SCHEMA_SQL = `CREATE TABLE IF NOT EXISTS provider_price_checks (
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  outcome TEXT NOT NULL,
  PRIMARY KEY (event_id, provider)
);`;

// Rows per multi-row INSERT. Small enough to stay far below D1's statement
// size limit, large enough that ~1,500 events is ~15 statements.
const ROWS_PER_STATEMENT = 100;

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

/**
 * @param {Array<{event_id: string, provider: string, outcome: string}>} checks
 * @param {string} checkedAt ISO timestamp shared by the whole run.
 * @returns {string} SQL (empty string when there is nothing to record).
 */
export function buildPriceChecksSql(checks, checkedAt) {
  const rows = (Array.isArray(checks) ? checks : []).filter(
    (check) => check?.event_id && check?.provider && PRICE_CHECK_OUTCOMES.includes(check.outcome)
  );
  if (!rows.length) return "";
  if (!Number.isFinite(Date.parse(String(checkedAt || "")))) throw new Error("buildPriceChecksSql: checkedAt must be an ISO timestamp");
  const statements = [PRICE_CHECKS_SCHEMA_SQL];
  for (let i = 0; i < rows.length; i += ROWS_PER_STATEMENT) {
    const values = rows
      .slice(i, i + ROWS_PER_STATEMENT)
      .map((row) => `(${[row.event_id, row.provider, checkedAt, row.outcome].map(sqlText).join(", ")})`)
      .join(",\n");
    statements.push(`INSERT INTO provider_price_checks (event_id, provider, checked_at, outcome) VALUES
${values}
ON CONFLICT(event_id, provider) DO UPDATE SET checked_at=excluded.checked_at, outcome=excluded.outcome;`);
  }
  return statements.join("\n");
}
