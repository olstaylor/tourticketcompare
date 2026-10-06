// Argument builder for the read-only D1 report scripts
// (report-analytics-funnel, report-commercial-funnel, report-affiliate-performance).
//
// Reads must go through `wrangler d1 execute --command`, never `--file`.
// With --remote, wrangler sends a --file to D1's bulk import API: the database
// is briefly unavailable to live traffic, and the only result set that comes
// back is one import summary ("Total queries executed", "Rows read", ...), not
// the SELECT rows. That made the reports fail or read nothing. --command goes
// to D1's /query endpoint, which returns one result set per statement, and the
// local path splits a --command into statements the same way it splits a file.

export function buildD1ReadArgs({ database, remote, statements }) {
  const sql = statements.map((statement) => `${statement.sql};`).join("\n");
  return ["wrangler", "d1", "execute", database, remote ? "--remote" : "--local", "--command", sql, "--json"];
}
