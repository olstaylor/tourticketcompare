#!/usr/bin/env node
// Additive Vivid adapter: do not replace or modify the legacy Impact workflow.
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { normalizeObservation } from "./core.mjs";
const execFileAsync = promisify(execFile);
async function main() {
  const url = String(process.env.PRICING_INGEST_URL || "").replace(/\/$/, ""), token = String(process.env.PRICING_INGEST_TOKEN || "");
  if (!url || !token) throw new Error("PRICING_INGEST_URL and PRICING_INGEST_TOKEN are required");
  const events = JSON.parse(await fs.readFile(new URL("../../public/data/events.json", import.meta.url), "utf8")), byId = new Map(events.map((event) => [event.id, event]));
  const { stdout } = await execFileAsync("node", ["scripts/snapshot-vividseats-prices.mjs", "--json"], { cwd: new URL("../../", import.meta.url).pathname });
  const report = JSON.parse(stdout);
  const observations = (report.proposed_rows || []).map((row) => normalizeObservation({ eventId: row.event_id, provider: "vivid-seats", currency: row.currency, lowestPriceMinor: Math.round(Number(row.low_price) * 100), priceType: "api", includesFees: false, checkedAt: row.verified_at, sourceUrl: byId.get(row.event_id)?.vividseats_url || "", status: "available" })).filter(Boolean);
  const response = await fetch(url + "/api/internal/pricing-ingest", { method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" }, body: JSON.stringify({ observations }) });
  if (!response.ok) throw new Error("ingest_http_" + response.status);
  console.log(JSON.stringify({ legacy_workflow_unchanged: true, normalized_accepted: (await response.json()).accepted }, null, 2));
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
