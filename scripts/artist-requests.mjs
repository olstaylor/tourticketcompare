#!/usr/bin/env node
// Owner artist requests: data/artist-requests.json → the daily candidate list.
//
// Adding an artist is one data change: put its name in data/artist-requests.json.
// The daily roster screen and auto-promote jobs call this script to put the
// open requests at the front of the day's candidate list, marked "requested"
// (third tab-separated column), ahead of the forecast-ranked names. From there
// the existing pipeline does the rest: provider identity capture
// (propose-onboarding-batch.mjs), the D1–D5 screen with requests' relaxed
// D3/D4 (lib/artist-screen.mjs), promotion and same-job date ingestion
// (auto-promote.mjs / auto-promote.yml). Runbook: docs/ARTIST_INGESTION.md.
//
//   node scripts/artist-requests.mjs --merge <names.txt> [--limit 20]
//       rewrite names.txt with open requests first, then the forecast names
//   node scripts/artist-requests.mjs --check      validate the request file
//   node scripts/artist-requests.mjs --list       print the open requests
//   node scripts/artist-requests.mjs --self-test

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeName, parseDenylist } from "./lib/artist-screen.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUESTS_PATH = path.join(root, "data/artist-requests.json");
const ARTISTS_PATH = path.join(root, "public/data/artists.json");
const DENYLIST_PATH = path.join(root, "data/artist-denylist.json");
export const DEFAULT_LIMIT = 20;
const TM_ID = /^[A-Za-z0-9]{6,32}$/;

/** Structural problems in the request file. Empty means valid. */
export function validateRequests(doc, { denylist = {} } = {}) {
  const problems = [];
  if (!doc || typeof doc !== "object" || !Array.isArray(doc.requests)) return ["data/artist-requests.json must be an object with a `requests` array"];
  const seen = new Set();
  const denied = new Set((denylist.names || []).map(normalizeName));
  doc.requests.forEach((request, index) => {
    const where = `requests[${index}]`;
    if (!request || typeof request !== "object") return problems.push(`${where} must be an object`);
    const name = String(request.name || "").trim();
    if (!name) problems.push(`${where} has no name`);
    if (/\t|\n/.test(name)) problems.push(`${where} name contains a tab or newline`);
    const key = normalizeName(name);
    if (key && seen.has(key)) problems.push(`${where} "${name}" is listed twice`);
    seen.add(key);
    if (key && denied.has(key)) problems.push(`${where} "${name}" is on the brand-safety denylist (data/artist-denylist.json)`);
    const id = String(request.ticketmaster_attraction_id || "").trim();
    if (id && !TM_ID.test(id)) problems.push(`${where} ticketmaster_attraction_id "${id}" is not a Ticketmaster attraction id`);
    for (const field of Object.keys(request)) {
      if (!["name", "ticketmaster_attraction_id", "requested", "note"].includes(field)) problems.push(`${where} has an unknown field "${field}"`);
    }
  });
  return problems;
}

/** Requests whose artist is not already on the site (any record, shell or promoted). */
export function openRequests(doc, artists) {
  const onSite = new Set();
  for (const artist of Array.isArray(artists) ? artists : []) {
    onSite.add(normalizeName(artist?.name));
    onSite.add(String(artist?.slug || ""));
  }
  const slugOf = (name) => normalizeName(name).replace(/\s+/g, "-");
  return (doc?.requests || [])
    .map((request) => ({ name: String(request?.name || "").trim(), id: String(request?.ticketmaster_attraction_id || "").trim() }))
    .filter((request) => request.name && !onSite.has(normalizeName(request.name)) && !onSite.has(slugOf(request.name)));
}

/** Requests first (flagged), then forecast lines not already requested, capped. */
export function mergeNames(requests, forecastText, limit = DEFAULT_LIMIT) {
  const lines = requests.map((request) => `${request.name}\t${request.id}\trequested`);
  const requested = new Set(requests.map((request) => normalizeName(request.name)));
  for (const line of String(forecastText || "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (requested.has(normalizeName(trimmed.split("\t")[0]))) continue;
    lines.push(trimmed);
  }
  return lines.slice(0, limit).join("\n") + (lines.length ? "\n" : "");
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

function selfTest() {
  const artists = [{ slug: "oasis", name: "Oasis" }, { slug: "the-warning", name: "The Warning" }];
  const doc = { requests: [{ name: "Dua Lipa" }, { name: "Oasis" }, { name: "Fontaines D.C.", ticketmaster_attraction_id: "K8vZ917abcD" }] };
  assert.deepEqual(validateRequests(doc), []);
  assert.deepEqual(openRequests(doc, artists).map((r) => r.name), ["Dua Lipa", "Fontaines D.C."], "an artist already on the site is ignored");
  const merged = mergeNames(openRequests(doc, artists), "Kenny Chesney\tK1\nDua Lipa\tK2\n# comment\n\nHans Zimmer\t", 3);
  assert.equal(merged, "Dua Lipa\t\trequested\nFontaines D.C.\tK8vZ917abcD\trequested\nKenny Chesney\tK1\n", "requests lead, a forecast duplicate is dropped, the cap applies");
  assert.equal(mergeNames([], ""), "", "nothing in, nothing out");
  assert.ok(validateRequests({ requests: [{ name: "A" }, { name: "a" }] }).some((p) => /twice/.test(p)), "duplicates are rejected");
  assert.ok(validateRequests({ requests: [{ name: "" }] }).some((p) => /no name/.test(p)));
  assert.ok(validateRequests({ requests: [{ name: "X", ticketmaster_attraction_id: "not an id!" }] }).some((p) => /not a Ticketmaster/.test(p)));
  assert.ok(validateRequests({ requests: [{ name: "X", colour: "red" }] }).some((p) => /unknown field/.test(p)));
  assert.ok(validateRequests({ requests: [{ name: "Brit Floyd" }] }, { denylist: { names: ["Brit Floyd"] } }).some((p) => /denylist/.test(p)), "a denylisted request is refused at the file");
  assert.ok(validateRequests({}).length === 1, "a malformed file is refused");
  return 10;
}

async function main(argv) {
  if (argv.includes("--self-test")) return console.log(`artist-requests self-test: ${selfTest()} checks passed`);
  const doc = await readJson(REQUESTS_PATH);
  const problems = validateRequests(doc, { denylist: parseDenylist(await fs.readFile(DENYLIST_PATH, "utf8")) });
  if (problems.length) {
    for (const problem of problems) console.error(`artist-requests: ${problem}`);
    process.exitCode = 1;
    return;
  }
  const open = openRequests(doc, await readJson(ARTISTS_PATH));
  if (argv.includes("--check")) return console.log(`artist-requests: OK — ${doc.requests.length} request(s), ${open.length} not yet on the site.`);
  if (argv.includes("--list")) return console.log(open.map((r) => `${r.name}${r.id ? ` (${r.id})` : ""}`).join("\n") || "No open requests.");
  if (argv.includes("--merge")) {
    const target = argv[argv.indexOf("--merge") + 1];
    if (!target) throw new Error("--merge needs the names file to rewrite");
    const limit = argv.includes("--limit") ? Math.max(1, Number(argv[argv.indexOf("--limit") + 1]) || DEFAULT_LIMIT) : DEFAULT_LIMIT;
    let forecast = "";
    try { forecast = await fs.readFile(target, "utf8"); } catch { forecast = ""; }
    await fs.writeFile(target, mergeNames(open, forecast, limit));
    return console.log(`artist-requests: ${open.length} open request(s) placed ahead of the forecast in ${target}.`);
  }
  console.error("Usage: --merge <names.txt> | --check | --list | --self-test");
  process.exitCode = 2;
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
