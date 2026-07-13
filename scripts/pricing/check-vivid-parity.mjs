#!/usr/bin/env node
// Read-only parity check. It deliberately never modifies legacy or normalized rows.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);
const database = process.env.D1_DATABASE_NAME || "tourticketcompare-demand";
async function query(sql) {
  const { stdout } = await execFileAsync("npx", ["wrangler", "d1", "execute", database, "--remote", "--command", sql, "--json"], { maxBuffer: 1024 * 1024 * 10 });
  const parsed = JSON.parse(stdout);
  return parsed?.[0]?.results || [];
}
async function main() {
  const rows = await query(`SELECT l.event_id, l.currency legacy_currency, l.low_price, l.verified_at legacy_checked_at,
    n.currency normalized_currency, n.lowest_price_minor, n.checked_at normalized_checked_at
    FROM provider_pricing_cache l LEFT JOIN provider_price_current n
    ON n.event_id=l.event_id AND n.provider='vivid-seats'
    WHERE l.provider='vivid-seats' AND l.source='vividseats_impact_marketplace_api'`);
  const mismatches = rows.filter((r) => !r.lowest_price_minor || r.legacy_currency !== r.normalized_currency || Math.round(Number(r.low_price) * 100) !== Number(r.lowest_price_minor));
  console.log(JSON.stringify({ checked: rows.length, parity: rows.length - mismatches.length, mismatches: mismatches.slice(0, 50), pass: mismatches.length === 0 }, null, 2));
  if (mismatches.length) process.exitCode = 2;
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
