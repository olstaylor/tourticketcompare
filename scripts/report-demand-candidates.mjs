// Demand-ranked roster candidates for the auto-promote and roster-candidates
// jobs. The forecast (report-roster-forecast.mjs) ranks acts by how many of the
// site's existing cities they cover, so the biggest tours often never reach
// the screen: on 2026-10-09, 130 of the 163 highest-demand touring headliners
// on SeatGeek had no page. This asks the SeatGeek API for upcoming concerts
// sorted by its own demand score, keeps each event's primary performer, drops
// acts already on the site, and puts the highest-scoring names ahead of the
// forecast lines in the day's names file.
//
// It only reorders who is screened. Every name still goes through the full
// D1-D5 screen (no relaxed thresholds: no "requested" flag is written), and
// the auto-promote daily/weekly caps are unchanged. Owner requests still lead,
// because artist-requests.mjs --merge runs after this.
//
//   node scripts/report-demand-candidates.mjs --merge <names.txt> [--top 10] [--pages 4]
//   node scripts/report-demand-candidates.mjs --list [--top 30]
//   node scripts/report-demand-candidates.mjs --self-test
//
// Env: SEATGEEK_CLIENT_ID (required for a live run), SEATGEEK_CLIENT_SECRET (optional).
// A failed lookup leaves the names file unchanged and exits 0 with a warning:
// demand ranking is an improvement to the forecast, not a dependency of it.

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeName } from "./lib/artist-screen.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTISTS_PATH = path.join(root, "public/data/artists.json");
const IDENTITIES_PATH = path.join(root, "data/provider-identities.json");
export const DEFAULT_TOP = 10;
const DEFAULT_PAGES = 4;
const PER_PAGE = 100;

/**
 * Rank the primary performers of SeatGeek events by their best event score.
 * Skips performers already on the site (by normalized name, slug or SeatGeek
 * performer id) and anything SeatGeek does not type as a band/musician
 * performer of a concert (festivals, packages, venues).
 */
export function rankPerformers(events, { onSiteNames = new Set(), onSiteSeatgeekIds = new Set() } = {}) {
  const best = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    const score = Number(event?.score) || 0;
    for (const performer of event?.performers || []) {
      if (!performer?.primary) continue;
      const name = String(performer.name || "").trim();
      if (!name || /\t|\n/.test(name)) continue;
      const type = String(performer.type || "");
      if (type && !["band", "concert"].includes(type)) continue;
      const key = normalizeName(name);
      if (onSiteNames.has(key) || onSiteNames.has(String(performer.slug || ""))) continue;
      if (performer.id != null && onSiteSeatgeekIds.has(Number(performer.id))) continue;
      const row = best.get(key) || { name, seatgeek_performer_id: performer.id ?? null, score: 0, events: 0 };
      row.score = Math.max(row.score, score);
      row.events += 1;
      best.set(key, row);
    }
  }
  return [...best.values()].sort((a, b) => b.score - a.score || b.events - a.events || a.name.localeCompare(b.name));
}

/**
 * Demand names first, then the existing lines that are not already listed.
 * A forecast line for a demand name keeps its place at the front but carries
 * its Ticketmaster attraction id, so the screen re-fetches by id.
 */
export function mergeDemand(ranked, existingText, top = DEFAULT_TOP) {
  const lines = ranked.slice(0, top).map((row) => `${row.name}\t`);
  const demandIndex = new Map(ranked.slice(0, top).map((row, i) => [normalizeName(row.name), i]));
  const seen = new Set(demandIndex.keys());
  for (const line of String(existingText || "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const key = normalizeName(trimmed.split("\t")[0]);
    if (demandIndex.has(key) && trimmed.split("\t")[1]) {
      lines[demandIndex.get(key)] = trimmed;
      demandIndex.delete(key);
    }
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(trimmed);
  }
  return lines.join("\n") + (lines.length ? "\n" : "");
}

function onSiteSets(artists, identities) {
  const onSiteNames = new Set();
  for (const artist of Array.isArray(artists) ? artists : []) {
    onSiteNames.add(normalizeName(artist?.name));
    onSiteNames.add(String(artist?.slug || ""));
  }
  const onSiteSeatgeekIds = new Set();
  for (const entry of identities?.artists || []) {
    if (entry?.seatgeek_performer_id != null) onSiteSeatgeekIds.add(Number(entry.seatgeek_performer_id));
  }
  return { onSiteNames, onSiteSeatgeekIds };
}

async function fetchDemandEvents({ clientId, clientSecret, pages }) {
  const events = [];
  const now = new Date().toISOString().slice(0, 19);
  for (let page = 1; page <= pages; page += 1) {
    const params = new URLSearchParams({
      client_id: clientId,
      "taxonomies.name": "concert",
      sort: "score.desc",
      per_page: String(PER_PAGE),
      page: String(page),
      "datetime_utc.gte": now
    });
    if (clientSecret) params.set("client_secret", clientSecret);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(`https://api.seatgeek.com/2/events?${params.toString()}`, { signal: controller.signal });
      if (!res.ok) throw new Error(`SeatGeek events returned HTTP ${res.status} on page ${page}`);
      const data = await res.json();
      if (!Array.isArray(data?.events)) throw new Error(`SeatGeek events response had no events list on page ${page}`);
      const batch = data.events;
      events.push(...batch);
      if (batch.length < PER_PAGE) break;
    } finally {
      clearTimeout(timer);
    }
  }
  return events;
}

function numberArg(argv, flag, fallback) {
  if (!argv.includes(flag)) return fallback;
  return Math.max(1, Number(argv[argv.indexOf(flag) + 1]) || fallback);
}

function selfTest() {
  const events = [
    { score: 0.9, performers: [{ name: "Jonas Brothers", slug: "jonas-brothers", id: 1, type: "band", primary: true }, { name: "Opener", id: 2, type: "band" }] },
    { score: 0.95, performers: [{ name: "Eagles", slug: "eagles", id: 3, type: "band", primary: true }] },
    { score: 0.8, performers: [{ name: "Jonas Brothers", slug: "jonas-brothers", id: 1, type: "band", primary: true }] },
    { score: 0.99, performers: [{ name: "Oasis", slug: "oasis", id: 4, type: "band", primary: true }] },
    { score: 0.97, performers: [{ name: "Renamed Act", slug: "renamed", id: 5, type: "band", primary: true }] },
    { score: 0.96, performers: [{ name: "CMA Fest", slug: "cma-fest", id: 6, type: "music_festival", primary: true }] }
  ];
  const ranked = rankPerformers(events, { onSiteNames: new Set([normalizeName("Oasis"), "oasis"]), onSiteSeatgeekIds: new Set([5]) });
  assert.deepEqual(ranked.map((r) => r.name), ["Eagles", "Jonas Brothers"], "on-site acts, known performer ids, support acts and festivals are dropped; best score ranks");
  assert.equal(ranked[1].events, 2, "events are counted per performer");
  assert.equal(
    mergeDemand(ranked, "Def Leppard\tK1\nEagles\tK2\n# note\n\nRod Stewart\t", 10),
    "Eagles\tK2\nJonas Brothers\t\nDef Leppard\tK1\nRod Stewart\n",
    "demand names lead, a later duplicate is dropped but its attraction id moves to the demand line"
  );
  assert.equal(mergeDemand(ranked, "", 1), "Eagles\t\n", "top caps the demand names");
  assert.equal(mergeDemand([], ""), "", "nothing in, nothing out");
  assert.ok(!mergeDemand(ranked, "").includes("requested"), "demand names are never marked requested (no relaxed screen)");
  return 6;
}

async function main(argv) {
  if (argv.includes("--self-test")) return console.log(`demand-candidates self-test: ${selfTest()} checks passed`);
  const clientId = String(process.env.SEATGEEK_CLIENT_ID || "").trim();
  const clientSecret = String(process.env.SEATGEEK_CLIENT_SECRET || "").trim();
  const top = numberArg(argv, "--top", DEFAULT_TOP);
  const pages = numberArg(argv, "--pages", DEFAULT_PAGES);
  const merging = argv.includes("--merge");
  const target = merging ? argv[argv.indexOf("--merge") + 1] : "";
  if (merging && !target) throw new Error("--merge needs the names file to rewrite");
  if (!merging && !argv.includes("--list")) {
    console.error("Usage: --merge <names.txt> [--top n] [--pages n] | --list [--top n] | --self-test");
    process.exitCode = 2;
    return;
  }
  if (!clientId) {
    console.warn("::warning::demand-candidates: SEATGEEK_CLIENT_ID not set; names file left as the forecast wrote it.");
    return;
  }
  let ranked;
  try {
    const [artists, identities] = await Promise.all([
      fs.readFile(ARTISTS_PATH, "utf8").then(JSON.parse),
      fs.readFile(IDENTITIES_PATH, "utf8").then(JSON.parse)
    ]);
    ranked = rankPerformers(await fetchDemandEvents({ clientId, clientSecret, pages }), onSiteSets(artists, identities));
  } catch (error) {
    const message = String(error?.message || error).replace(/(client_id|client_secret)=[^&\s]+/gi, "$1=<redacted>");
    console.warn(`::warning::demand-candidates: lookup failed (${message}); names file left as the forecast wrote it.`);
    return;
  }
  if (!merging) {
    return console.log(ranked.slice(0, top).map((r) => `${r.score.toFixed(3)}\t${r.events}\t${r.name}`).join("\n") || "No demand candidates.");
  }
  let existing = "";
  try { existing = await fs.readFile(target, "utf8"); } catch { existing = ""; }
  await fs.writeFile(target, mergeDemand(ranked, existing, top));
  console.log(`demand-candidates: ${Math.min(top, ranked.length)} demand-ranked name(s) placed ahead of the forecast in ${target}: ${ranked.slice(0, top).map((r) => r.name).join(", ")}`);
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
