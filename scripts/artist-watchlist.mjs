#!/usr/bin/env node
// Artist watchlist: data/artist-watchlist.json → the daily candidate list.
//
// The watchlist holds major acts with no tour on sale yet: rumoured 2027 tours
// and big names between tours. They get no page while they have no dates (a
// page with no shows would read as a tour that does not exist). Each day the
// roster screen and auto-promote jobs call this script; it asks Ticketmaster
// how many upcoming events each open entry has, and only an entry with at
// least THRESHOLDS.minPrimaryEvents (a real tour, not a festival slot) goes to
// the front of the day's names file. From there it gets the FULL D1-D5 screen:
// unlike artist-requests.mjs it never writes the "requested" flag, so the
// volume thresholds still apply and the daily/weekly caps are unchanged.
//
// Watchlist hits lead the names file (ahead of requests) because a newly
// announced tour is the highest-intent moment; run this after
// artist-requests.mjs --merge. Runbook: docs/ARTIST_INGESTION.md.
//
//   node scripts/artist-watchlist.mjs --merge <names.txt> [--limit 20]
//   node scripts/artist-watchlist.mjs --check      validate the watchlist file
//   node scripts/artist-watchlist.mjs --list       print the open entries
//   node scripts/artist-watchlist.mjs --self-test
//
// Env: TICKETMASTER_API_KEY (required for --merge). A failed lookup skips that
// entry; a run with no key leaves the names file unchanged and exits 0, since
// the watchlist adds to the day's list and is never a dependency of it.

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COLLISION_PATTERN, THRESHOLDS, normalizeName, parseDenylist } from "./lib/artist-screen.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WATCHLIST_PATH = path.join(root, "data/artist-watchlist.json");
const REQUESTS_PATH = path.join(root, "data/artist-requests.json");
const ARTISTS_PATH = path.join(root, "public/data/artists.json");
const DENYLIST_PATH = path.join(root, "data/artist-denylist.json");
export const DEFAULT_LIMIT = 20;
const TM_ID = /^[A-Za-z0-9]{6,32}$/;
const REASONS = ["rumoured", "between-tours"];
const FIELDS = ["name", "ticketmaster_attraction_id", "reason", "source_url", "note", "added"];

/** Structural problems in the watchlist file. Empty means valid. */
export function validateWatchlist(doc, { denylist = {}, requests = [] } = {}) {
  const problems = [];
  if (!doc || typeof doc !== "object" || !Array.isArray(doc.artists)) return ["data/artist-watchlist.json must be an object with an `artists` array"];
  const seen = new Set();
  const denied = new Set((denylist.names || []).map(normalizeName));
  const requested = new Set(requests.map((request) => normalizeName(request?.name)));
  doc.artists.forEach((entry, index) => {
    const where = `artists[${index}]`;
    if (!entry || typeof entry !== "object") return problems.push(`${where} must be an object`);
    const name = String(entry.name || "").trim();
    if (!name) problems.push(`${where} has no name`);
    if (/\t|\n/.test(name)) problems.push(`${where} name contains a tab or newline`);
    const key = normalizeName(name);
    if (key && seen.has(key)) problems.push(`${where} "${name}" is listed twice`);
    seen.add(key);
    if (key && denied.has(key)) problems.push(`${where} "${name}" is on the brand-safety denylist (data/artist-denylist.json)`);
    if (key && requested.has(key)) problems.push(`${where} "${name}" is already in data/artist-requests.json; keep it in one file`);
    if (!REASONS.includes(entry.reason)) problems.push(`${where} reason must be one of ${REASONS.join(", ")}`);
    if (entry.reason === "rumoured" && !/^https:\/\//.test(String(entry.source_url || ""))) problems.push(`${where} "${name}" is rumoured, so it needs an https source_url for the report`);
    if (entry.added && !/^\d{4}-\d{2}-\d{2}$/.test(String(entry.added))) problems.push(`${where} added must be YYYY-MM-DD`);
    const id = String(entry.ticketmaster_attraction_id || "").trim();
    if (id && !TM_ID.test(id)) problems.push(`${where} ticketmaster_attraction_id "${id}" is not a Ticketmaster attraction id`);
    for (const field of Object.keys(entry)) {
      if (!FIELDS.includes(field)) problems.push(`${where} has an unknown field "${field}"`);
    }
  });
  return problems;
}

/** Entries whose artist is not already on the site (any record, shell or promoted). */
export function openEntries(doc, artists) {
  const onSite = new Set();
  for (const artist of Array.isArray(artists) ? artists : []) {
    onSite.add(normalizeName(artist?.name));
    onSite.add(String(artist?.slug || ""));
  }
  const slugOf = (name) => normalizeName(name).replace(/\s+/g, "-");
  return (doc?.artists || [])
    .map((entry) => ({ name: String(entry?.name || "").trim(), id: String(entry?.ticketmaster_attraction_id || "").trim() }))
    .filter((entry) => entry.name && !onSite.has(normalizeName(entry.name)) && !onSite.has(slugOf(entry.name)));
}

/**
 * The one exact-name Ticketmaster attraction for an entry (by pinned id, or a
 * keyword search with exactly one exact-name match), or null.
 */
export function pickAttraction(entry, attractions) {
  const exact = (attractions || []).filter(
    (a) => normalizeName(a?.name) === normalizeName(entry.name) && !COLLISION_PATTERN.test(String(a?.name || "")) && (!entry.id || a?.id === entry.id)
  );
  return exact.length === 1 ? exact[0] : null;
}

/**
 * Upcoming events Discovery can list. `_total` also counts sources the event
 * search never returns ("trium": Celine Dion showed 23 there and 0 events on
 * 2026-10-11), which would put an act with nothing on sale first every day.
 */
export function listedEvents(upcoming = {}) {
  return Math.max(0, (Number(upcoming?._total) || 0) - (Number(upcoming?.trium) || 0));
}

/** Entries whose tour is now on Ticketmaster, as names-file lines (no "requested" flag). */
export function tourLines(hits) {
  return hits.filter((hit) => hit.upcoming >= THRESHOLDS.minPrimaryEvents).map((hit) => `${hit.name}\t${hit.id}`);
}

/** Watchlist lines first, then the existing lines not already listed, capped. */
export function mergeNames(lines, existingText, limit = DEFAULT_LIMIT) {
  const out = [...lines];
  const listed = new Set(lines.map((line) => normalizeName(line.split("\t")[0])));
  for (const line of String(existingText || "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (listed.has(normalizeName(trimmed.split("\t")[0]))) continue;
    out.push(trimmed);
  }
  return out.slice(0, limit).join("\n") + (out.length ? "\n" : "");
}

async function lookup(entry, apiKey) {
  const params = new URLSearchParams({ apikey: apiKey });
  let attractions;
  if (entry.id) {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${encodeURIComponent(entry.id)}.json?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    attractions = [await res.json()];
  } else {
    params.set("keyword", entry.name);
    params.set("size", "10");
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    attractions = (await res.json())?._embedded?.attractions || [];
  }
  const match = pickAttraction(entry, attractions);
  return match ? { name: entry.name, id: match.id, upcoming: listedEvents(match.upcomingEvents) } : null;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

function selfTest() {
  const artists = [{ slug: "oasis", name: "Oasis" }];
  const doc = {
    artists: [
      { name: "Taylor Swift", reason: "rumoured", source_url: "https://example.com/report", added: "2026-10-11" },
      { name: "Oasis", reason: "between-tours" },
      { name: "Adele", reason: "between-tours", ticketmaster_attraction_id: "K8vZ917Gku7" },
    ],
  };
  assert.deepEqual(validateWatchlist(doc), []);
  assert.deepEqual(openEntries(doc, artists).map((e) => e.name), ["Taylor Swift", "Adele"], "an artist already on the site is ignored");
  assert.ok(validateWatchlist({ artists: [{ name: "X", reason: "rumoured" }] }).some((p) => /source_url/.test(p)), "a rumour needs a source");
  assert.ok(validateWatchlist({ artists: [{ name: "X", reason: "hunch" }] }).some((p) => /reason/.test(p)));
  assert.ok(validateWatchlist({ artists: [{ name: "X", reason: "between-tours" }] }, { requests: [{ name: "x" }] }).some((p) => /artist-requests/.test(p)), "one file per artist");
  assert.ok(validateWatchlist({ artists: [{ name: "Brit Floyd", reason: "between-tours" }] }, { denylist: { names: ["Brit Floyd"] } }).some((p) => /denylist/.test(p)));
  assert.ok(validateWatchlist({ artists: [{ name: "A", reason: "between-tours" }, { name: "a", reason: "between-tours" }] }).some((p) => /twice/.test(p)));
  assert.ok(validateWatchlist({ artists: [{ name: "X", reason: "between-tours", colour: "red" }] }).some((p) => /unknown field/.test(p)));
  assert.equal(pickAttraction({ name: "Tom Jones", id: "" }, [{ id: "A", name: "Tom Jones" }, { id: "B", name: "Tom Jones" }]), null, "two exact-name attractions are ambiguous");
  assert.equal(pickAttraction({ name: "Tom Jones", id: "A" }, [{ id: "A", name: "Tom Jones" }])?.id, "A", "a pinned id resolves");
  assert.equal(pickAttraction({ name: "Adele", id: "" }, [{ id: "T", name: "Adele Tribute" }]), null, "a tribute never matches");
  const lines = tourLines([{ name: "Taylor Swift", id: "K1", upcoming: 40 }, { name: "Adele", id: "K2", upcoming: 1 }]);
  assert.deepEqual(lines, ["Taylor Swift\tK1"], "a festival slot or one-off date is not a tour; no requested flag is written");
  assert.equal(mergeNames(lines, "Slipknot\t\trequested\nTaylor Swift\t\nWeezer\t", 2), "Taylor Swift\tK1\nSlipknot\t\trequested\n", "watchlist hits lead, duplicates drop, the cap applies");
  assert.equal(mergeNames([], ""), "", "nothing in, nothing out");
  assert.equal(listedEvents({ trium: 23, _total: 23, _filtered: 0 }), 0, "events Discovery cannot list do not count (Celine Dion)");
  assert.equal(listedEvents({ ticketmaster: 20, "mfx-de": 3, trium: 1, _total: 24 }), 23);
  return 16;
}

async function main(argv) {
  if (argv.includes("--self-test")) return console.log(`artist-watchlist self-test: ${selfTest()} checks passed`);
  const doc = await readJson(WATCHLIST_PATH);
  const requests = (await readJson(REQUESTS_PATH)).requests || [];
  const problems = validateWatchlist(doc, { denylist: parseDenylist(await fs.readFile(DENYLIST_PATH, "utf8")), requests });
  if (problems.length) {
    for (const problem of problems) console.error(`artist-watchlist: ${problem}`);
    process.exitCode = 1;
    return;
  }
  const open = openEntries(doc, await readJson(ARTISTS_PATH));
  if (argv.includes("--check")) return console.log(`artist-watchlist: OK — ${doc.artists.length} entr${doc.artists.length === 1 ? "y" : "ies"}, ${open.length} not yet on the site.`);
  if (argv.includes("--list")) return console.log(open.map((e) => `${e.name}${e.id ? ` (${e.id})` : ""}`).join("\n") || "No open watchlist entries.");
  if (argv.includes("--merge")) {
    const target = argv[argv.indexOf("--merge") + 1];
    if (!target) throw new Error("--merge needs the names file to rewrite");
    const limit = argv.includes("--limit") ? Math.max(1, Number(argv[argv.indexOf("--limit") + 1]) || DEFAULT_LIMIT) : DEFAULT_LIMIT;
    const apiKey = process.env.TICKETMASTER_API_KEY;
    if (!apiKey) return console.warn("artist-watchlist: TICKETMASTER_API_KEY is not set; names file left unchanged.");
    const hits = [];
    for (const entry of open) {
      try {
        const hit = await lookup(entry, apiKey);
        if (hit) hits.push(hit);
      } catch (error) {
        console.warn(`artist-watchlist: lookup failed for ${entry.name} (${error.message}); skipped today.`);
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    const lines = tourLines(hits);
    let existing = "";
    try { existing = await fs.readFile(target, "utf8"); } catch { existing = ""; }
    await fs.writeFile(target, mergeNames(lines, existing, limit));
    return console.log(`artist-watchlist: ${open.length} open entr${open.length === 1 ? "y" : "ies"} checked; ${lines.length} now touring (${lines.map((l) => l.split("\t")[0]).join(", ") || "none"}) placed first in ${target}.`);
  }
  console.error("Usage: --merge <names.txt> | --check | --list | --self-test");
  process.exitCode = 2;
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
