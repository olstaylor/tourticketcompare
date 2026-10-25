#!/usr/bin/env node
// Price-drop post drafts for the owner (stage B). Reads the daily price rollup
// for the stored top-priority shows, applies the rules in
// scripts/lib/price-drop-posts.mjs, and writes a draft file. It posts nothing
// and writes nothing to D1 or the repository unless --out names a path.
//
//   node scripts/report-price-drops.mjs [--out drafts.md] [--seen seen.json] [--rows rows.json] [--local] [--now 2026-10-26T08:00:00Z]
//
// --seen: JSON array of drop keys already drafted; new keys are appended so a
//         drop is offered once, not every day it persists.
// --rows: a saved priceDropSql result (array of rows) instead of querying D1.

import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { detectPriceDrops, priceDropSql, renderDraftFile } from "./lib/price-drop-posts.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";

function parseArgs(argv) {
  const args = { out: "", seen: "", rows: "", local: false, now: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === "--local") args.local = true;
    else if (["--out", "--seen", "--rows", "--now"].includes(flag)) args[flag.slice(2)] = argv[++i] ?? "";
    else throw new Error(`Unknown option ${flag}`);
  }
  return args;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT" && fallback !== undefined) return fallback;
    throw error;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const now = args.now ? Date.parse(args.now) : Date.now();
  if (!Number.isFinite(now)) throw new Error(`Bad --now "${args.now}"`);
  const asOf = new Date(now).toISOString().slice(0, 10);

  let rows;
  if (args.rows) rows = await readJson(args.rows);
  else {
    const execArgs = buildD1ReadArgs({ database: DATABASE, remote: !args.local, statements: [{ sql: priceDropSql(asOf) }] });
    const { stdout } = await execFileAsync("npx", execArgs, { cwd: REPO_ROOT, maxBuffer: 64 * 1024 * 1024, timeout: 120000 });
    const parsed = JSON.parse(stdout);
    if (!Array.isArray(parsed) || !parsed[0]?.success) throw new Error("price rollup query failed");
    rows = parsed[0].results;
  }

  const [events, artists] = await Promise.all([
    readJson(path.join(REPO_ROOT, "public/data/events.json")),
    readJson(path.join(REPO_ROOT, "public/data/artists.json"))
  ]);
  const seen = args.seen ? new Set(await readJson(args.seen, [])) : new Set();
  const detected = detectPriceDrops(rows, Array.isArray(events) ? events : events.events, Array.isArray(artists) ? artists : artists.artists, { now });
  const drafts = detected.filter((d) => !seen.has(d.key));

  const text = renderDraftFile(drafts, { now });
  if (args.out) await writeFile(args.out, text);
  else process.stdout.write(text);
  if (args.seen && drafts.length) await writeFile(args.seen, `${JSON.stringify([...seen, ...drafts.map((d) => d.key)], null, 1)}\n`);
  console.error(`price drops: ${rows.length} rows, ${detected.length} detected, ${drafts.length} new drafts`);
}

main().catch((error) => {
  console.error(error?.message || error);
  process.exit(1);
});
