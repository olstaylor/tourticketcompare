#!/usr/bin/env node
// Dry-run matcher for a new seller's event feed (Gigsberg, Ticombo, any other
// programme that supplies event-level rows). Prepared before approval so the
// first real feed can be measured the day it arrives.
//
// It reads a LOCAL normalized JSON file and reports how many existing events
// have exactly one listing whose artist, venue, city and venue-local date all
// agree, using the same matcher the Impact lanes use. It never fetches
// anything, never writes public/data/events.json, and never creates a link.
// Turning a lane on (provider entry, allowlist, /api/out, flags) is a separate,
// owner-approved change: docs/ADDING_PROVIDERS.md.
//
// Input row shape (one object per listing):
//   { "id": "...", "name": "Artist - Tour", "venue": "...", "city": "...",
//     "date": "YYYY-MM-DD", "url": "https://...", "price": 123.4, "currency": "GBP" }
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { decideOutcome, evaluateCandidate, selectEvents } from "./sync-impact-marketplace-events.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function clean(value, max = 500) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function rowToCandidate(row, allowedHosts = []) {
  let url = "";
  try {
    const parsed = new URL(clean(row?.url, 2000));
    const host = parsed.hostname.toLowerCase();
    const hostOk = allowedHosts.length === 0 || allowedHosts.some((h) => host === h || host.endsWith(`.${h}`));
    if (parsed.protocol === "https:" && hostOk) url = parsed.toString();
  } catch { /* invalid URL stays empty and fails the match */ }
  const price = Number(row?.price);
  const currency = clean(row?.currency, 12).toUpperCase();
  return {
    externalId: clean(row?.id, 255),
    normalizedUrl: url,
    name: clean(row?.name, 200),
    searchableText: [row?.name, row?.venue, row?.city, row?.date].map((v) => clean(v, 1000)).filter(Boolean).join(" "),
    localStartTimes: [],
    price: Number.isFinite(price) && price >= 0 ? price : null,
    currency: /^[A-Z]{3}$/.test(currency) ? currency : ""
  };
}

export function matchFeed({ rows, events, registry, artists, allowedHosts = [], now = new Date() }) {
  const candidates = rows.map((row) => rowToCandidate(row, allowedHosts)).filter((c) => c.externalId && c.normalizedUrl);
  const selected = selectEvents(events, registry, artists, {}, now);
  const outcomes = [];
  for (const { event, artistName } of selected) {
    const evaluations = candidates.map((c) => evaluateCandidate(event, artistName, c, { matchStartTime: false }));
    const passing = evaluations.filter((e) => e.ok);
    const { action } = decideOutcome({ storedUrl: "", storedVerified: false, storedCandidate: null, passing, catalogComplete: true });
    outcomes.push({ id: event.id, artist: artistName, city: event.city, venue: event.venue, action, url: passing.length === 1 ? passing[0].url : "" });
  }
  const count = (a) => outcomes.filter((o) => o.action === a).length;
  return { feedRows: rows.length, usableRows: candidates.length, eventsChecked: selected.length, wouldAdd: count("add"), ambiguous: count("conflict"), none: count("none"), outcomes };
}

function usage() {
  return `Usage: node scripts/match-seller-feed.mjs --feed <file.json> [--hosts a.com,b.com] [--json]
       node scripts/match-seller-feed.mjs --self-test

Offline dry run only. Prints how many existing events a seller feed would
cover. Writes nothing and makes no network calls.`;
}

function selfTest() {
  const events = [
    { id: "e1", artist_slug: "demo", city: "London", venue: "O2 Arena", datetime_iso: "2099-03-01T19:30:00Z", timezone: "Europe/London" },
    { id: "e2", artist_slug: "demo", city: "Dublin", venue: "3Arena", datetime_iso: "2099-03-03T19:30:00Z", timezone: "Europe/Dublin" },
    { id: "e3", artist_slug: "demo", city: "Paris", venue: "Accor Arena", datetime_iso: "2099-03-05T19:30:00Z", timezone: "Europe/Paris" }
  ];
  const registry = [{ slug: "demo", review_status: "verified" }];
  const artists = [{ slug: "demo", name: "Demo Band" }];
  const rows = [
    { id: "1", name: "Demo Band", venue: "O2 Arena", city: "London", date: "2099-03-01", url: "https://seller.example/e/1", price: 90, currency: "GBP" },
    { id: "2", name: "Demo Band", venue: "3Arena", city: "Dublin", date: "2099-03-03", url: "https://seller.example/e/2" },
    { id: "3", name: "Demo Band", venue: "3Arena", city: "Dublin", date: "2099-03-03", url: "https://seller.example/e/3" },
    { id: "4", name: "Demo Band", venue: "Accor Arena", city: "Paris", date: "2099-03-06", url: "https://seller.example/e/4" },
    { id: "5", name: "Other Band", venue: "Accor Arena", city: "Paris", date: "2099-03-05", url: "https://seller.example/e/5" }
  ];
  const result = matchFeed({ rows, events, registry, artists, allowedHosts: ["seller.example"], now: new Date("2099-01-01") });
  assert.equal(result.wouldAdd, 1, "one exact match");
  assert.equal(result.ambiguous, 1, "two listings for one show is ambiguous, not written");
  assert.equal(result.none, 1, "wrong date or wrong artist is no match");
  assert.equal(result.outcomes.find((o) => o.id === "e1").url, "https://seller.example/e/1");
  const wrongHost = matchFeed({ rows, events, registry, artists, allowedHosts: ["other.example"], now: new Date("2099-01-01") });
  assert.equal(wrongHost.wouldAdd, 0, "URLs off the allowed host are dropped");
  return 5;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) return console.log(usage());
  if (args.includes("--self-test")) return console.log(`Seller feed matcher self-test passed (${selfTest()} checks).`);
  const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : ""; };
  const feedPath = get("--feed");
  if (!feedPath) throw new Error("--feed is required");
  const read = async (p) => JSON.parse(await fs.readFile(p, "utf8"));
  const result = matchFeed({
    rows: await read(path.resolve(feedPath)),
    events: await read(path.join(ROOT, "public", "data", "events.json")),
    registry: (([payload]) => (Array.isArray(payload) ? payload : payload?.artists))([await read(path.join(ROOT, "data", "provider-identities.json"))]),
    artists: await read(path.join(ROOT, "public", "data", "artists.json")),
    allowedHosts: get("--hosts").split(",").map((h) => h.trim().toLowerCase()).filter(Boolean)
  });
  if (args.includes("--json")) return console.log(JSON.stringify(result, null, 2));
  console.log(`${result.feedRows} feed rows (${result.usableRows} usable), ${result.eventsChecked} events checked: ${result.wouldAdd} would match exactly, ${result.ambiguous} ambiguous (no write), ${result.none} no listing.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(error?.message || error); process.exitCode = 1; });
