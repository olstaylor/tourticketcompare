#!/usr/bin/env node
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { isFutureEvent, normalizeObservation } from "./core.mjs";
import { extractTicketmasterPrice } from "./providers/ticketmaster.mjs";
import { extractSeatGeekPrice } from "./providers/seatgeek.mjs";

const execFileAsync = promisify(execFile);
const endpoint = String(process.env.PRICING_INGEST_URL || "").replace(/\/$/, "");
const token = String(process.env.PRICING_INGEST_TOKEN || "");
const concurrency = Math.max(1, Math.min(4, Number(process.env.PRICING_BROWSER_CONCURRENCY || 3)));
function summary(rows) { const out = { attempted: 0, available: 0, unavailable: 0, sold_out: 0, blocked: 0, extractor_error: 0 }; for (const row of rows) { out.attempted++; out[row.status] = (out[row.status] || 0) + 1; } return out; }
async function post(observations) {
  if (!observations.length) return { accepted: 0 };
  if (!endpoint || !token) throw new Error("PRICING_INGEST_URL and PRICING_INGEST_TOKEN are required");
  const response = await fetch(endpoint + "/api/internal/pricing-ingest", { method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" }, body: JSON.stringify({ observations }) });
  if (!response.ok) throw new Error("ingest_http_" + response.status);
  return response.json();
}
async function runSeatGeekApi(eventsById) {
  const { stdout } = await execFileAsync("node", ["scripts/snapshot-seatgeek-prices.mjs", "--json"], { cwd: new URL("../../", import.meta.url).pathname });
  const report = JSON.parse(stdout);
  return new Map((report.proposed_rows || []).map((row) => {
    const event = eventsById.get(row.event_id);
    return [row.event_id, normalizeObservation({ eventId: row.event_id, provider: "seatgeek", currency: row.currency, lowestPriceMinor: Math.round(Number(row.low_price) * 100), priceType: "api", includesFees: false, checkedAt: row.verified_at, sourceUrl: event?.seatgeek_url || "", status: "available" })];
  }).filter(([, row]) => row));
}
async function browserRows(targets) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const queue = [...targets], output = [];
  async function worker() {
    const page = await browser.newPage({ locale: "en-US", timezoneId: "UTC" });
    await page.route("**/*", (route) => ["image", "media", "font"].includes(route.request().resourceType()) ? route.abort() : route.continue());
    while (queue.length) {
      const { event, provider, extractor } = queue.shift(), sourceUrl = event[provider + "_url"];
      let row;
      for (let attempt = 0; attempt < 2; attempt++) {
        try { await page.goto(sourceUrl, { waitUntil: "domcontentloaded", timeout: 30000 }); row = extractor(await page.locator("body").innerText({ timeout: 10000 }), event); if (row?.status !== "unavailable" || attempt) break; }
        catch { row = normalizeObservation({ eventId: event.id, provider, currency: "USD", lowestPriceMinor: null, priceType: "displayed_from", includesFees: null, checkedAt: new Date().toISOString(), sourceUrl, status: "extractor_error" }); }
        await new Promise((resolve) => setTimeout(resolve, 250 + Math.floor(Math.random() * 500)));
      }
      if (row) output.push(row);
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: concurrency }, worker)); await browser.close(); return output;
}
async function main() {
  const events = JSON.parse(await fs.readFile(new URL("../../public/data/events.json", import.meta.url), "utf8"));
  const byId = new Map(events.map((event) => [event.id, event]));
  const seatGeekApi = await runSeatGeekApi(byId), apiRows = [...seatGeekApi.values()], browserTargets = [];
  for (const event of events.filter(isFutureEvent)) {
    if (event?.provider_links?.ticketmaster?.verified && event.ticketmaster_url) browserTargets.push({ event, provider: "ticketmaster", extractor: extractTicketmasterPrice });
    if (event?.provider_links?.seatgeek?.verified && event.seatgeek_url && !seatGeekApi.has(event.id)) browserTargets.push({ event, provider: "seatgeek", extractor: extractSeatGeekPrice });
  }
  const browser = await browserRows(browserTargets), ingest = await post([...apiRows, ...browser].filter(Boolean));
  console.log(JSON.stringify({ ingest, seatgeek_api: summary(apiRows), browser: summary(browser) }, null, 2));
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
