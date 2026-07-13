#!/usr/bin/env node
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { isFutureEvent, normalizeObservation } from "./core.mjs";
import { extractTicketmasterPrice } from "./providers/ticketmaster.mjs";
import { extractSeatGeekPrice } from "./providers/seatgeek.mjs";

const execFileAsync = promisify(execFile);
const ROOT = new URL("../../", import.meta.url);
const endpoint = String(process.env.PRICING_INGEST_URL || "").replace(/\/$/, "");
const token = String(process.env.PRICING_INGEST_TOKEN || "");
const concurrency = Math.max(1, Math.min(4, Number(process.env.PRICING_BROWSER_CONCURRENCY || 3)));

function summary(rows) {
  const value = { attempted: 0, available: 0, unavailable: 0, sold_out: 0, blocked: 0, extractor_error: 0 };
  for (const row of rows) { value.attempted++; value[row.status] = (value[row.status] || 0) + 1; }
  return value;
}
async function post(observations) {
  if (!observations.length) return { accepted: 0 };
  if (!endpoint || !token) throw new Error("PRICING_INGEST_URL and PRICING_INGEST_TOKEN are required");
  const response = await fetch(endpoint + "/api/internal/pricing-ingest", {
    method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" },
    body: JSON.stringify({ observations })
  });
  if (!response.ok) throw new Error("ingest_http_" + response.status);
  return response.json();
}
async function runSeatGeekApi() {
  const { stdout } = await execFileAsync("node", ["scripts/snapshot-seatgeek-prices.mjs", "--json"], { cwd: new URL("../../", import.meta.url).pathname });
  const result = JSON.parse(stdout);
  return new Map((result.proposed_rows || []).map((row) => [row.event_id, normalizeObservation({
    eventId: row.event_id, provider: "seatgeek", currency: row.currency, lowestPriceMinor: Math.round(Number(row.low_price) * 100),
    priceType: "api", includesFees: false, checkedAt: row.verified_at, sourceUrl: row.source_url || "", status: "available"
  })]).filter(([, value]) => value));
}
async function browserRows(events) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const queue = [...events];
  const output = [];
  async function worker() {
    const page = await browser.newPage({ locale: "en-US", timezoneId: "UTC" });
    await page.route("**/*", (route) => ["image", "media", "font"].includes(route.request().resourceType()) ? route.abort() : route.continue());
    while (queue.length) {
      const { event, provider, extractor } = queue.shift();
      const sourceUrl = event[provider + "_url"];
      let row;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await page.goto(sourceUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
          const text = await page.locator("body").innerText({ timeout: 10000 });
          row = extractor(text, event);
          if (row?.status !== "unavailable" || attempt) break;
        } catch {
          row = normalizeObservation({ eventId: event.id, provider, currency: "USD", lowestPriceMinor: null, priceType: "displayed_from", includesFees: null, checkedAt: new Date().toISOString(), sourceUrl, status: "extractor_error" });
        }
        await new Promise((resolve) => setTimeout(resolve, 250 + Math.floor(Math.random() * 500)));
      }
      if (row) output.push(row);
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  await browser.close();
  return output;
}
async function main() {
  const events = JSON.parse(await fs.readFile(new URL("../../public/data/events.json", import.meta.url), "utf8"));
  const seatGeekApi = await runSeatGeekApi();
  const apiRows = [...seatGeekApi.values()];
  const browserTargets = [];
  for (const event of events.filter(isFutureEvent)) {
    if (event?.provider_links?.ticketmaster?.verified && event.ticketmaster_url) browserTargets.push({ event, provider: "ticketmaster", extractor: extractTicketmasterPrice });
    if (event?.provider_links?.seatgeek?.verified && event.seatgeek_url && !seatGeekApi.has(event.id)) browserTargets.push({ event, provider: "seatgeek", extractor: extractSeatGeekPrice });
  }
  const browser = await browserRows(browserTargets);
  const observations = [...apiRows, ...browser].filter(Boolean);
  const result = await post(observations);
  console.log(JSON.stringify({ ingest: result, seatgeek_api: summary(apiRows), browser: summary(browser) }, null, 2));
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
