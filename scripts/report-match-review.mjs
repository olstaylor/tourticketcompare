#!/usr/bin/env node
// Read-only: builds reports/provider-sync/match-review.md from the sync logs.
// usage: node scripts/report-match-review.mjs [--check] [--self-test]
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REPORTS, buildQueue, renderQueue } from "./lib/match-review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "reports/provider-sync/match-review.md");
const read = async (p, fallback) => { try { return await readFile(path.join(ROOT, p), "utf8"); } catch { return fallback; } };

const reports = [];
for (const r of REPORTS) reports.push({ ...r, markdown: await read(`reports/provider-sync/${r.file}`, "") });
const events = JSON.parse(await read("public/data/events.json", "[]"));
const decisions = JSON.parse(await read("data/match-review-decisions.json", '{"decisions":[]}')).decisions || [];
const queue = buildQueue({ reports, events: Array.isArray(events) ? events : events.events || [], decisions, now: new Date() });
const text = renderQueue(queue);
if (process.argv.includes("--check")) { console.log(`open ${queue.open.length}, decided ${queue.resolved.length}`); process.exit(0); }
await writeFile(OUT, text);
console.log(`open ${queue.open.length}, decided ${queue.resolved.length} -> ${path.relative(ROOT, OUT)}`);
