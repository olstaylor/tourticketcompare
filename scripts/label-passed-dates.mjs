#!/usr/bin/env node
// Marks table cells whose date has passed, so a data table never presents a past
// show as "next". It is the mechanical half of the stale-dates job (the part that
// needs no judgement); the prose half is left for an editor.
//
//   node scripts/label-passed-dates.mjs            fix content/blog in place
//   node scripts/label-passed-dates.mjs --check    report only, exit 1 if anything would change
//   node scripts/label-passed-dates.mjs --self-test
//
// What it changes: a Markdown table cell that holds nothing but a date ("31 October
// 2026") which date-staleness.mjs reports as passed since the post was written
// becomes "31 October 2026 (has passed)", the form the tables already use. Then it
// sets `updated` to today (or the day before the earliest date still to come, so that
// date can be flagged when it passes), which clears the finding. It adds no fact: the date was
// already there and the show has happened.
//
// What it never changes: sentences. "Twelve nights remain to 31 October" needs a
// person to put it in the past tense, so those are listed and left alone. Guides
// are not touched (their freshness lives in the provenance ledger).
//
// After a fix run `npm run blog:build` to regenerate public/data/blog-content.json.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { namedDates, staleDatedCopy } from "./lib/date-staleness.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MARK = "(has passed)";

/** Label passed date-only table cells. Returns { source, labelled } (labelled = count). */
export function labelPassedTableDates(source, passedDates) {
  const passed = new Set(passedDates);
  let labelled = 0;
  const lines = String(source).split("\n").map((line) => {
    if (!/^\s*\|/.test(line)) return line;
    return line.replace(/\|([^|\n]*)(?=\|)/g, (cell, inner) => {
      const text = inner.trim();
      if (!text || text.includes(MARK)) return cell;
      const dates = namedDates(text);
      // The whole cell must be one date, possibly with a linked label: no other words.
      const bare = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
      const isDateOnly = new RegExp(`^(\\d{1,2} (${MONTHS.join("|")}) 20\\d\\d|(${MONTHS.join("|")}) \\d{1,2},? 20\\d\\d)$`).test(bare);
      if (!isDateOnly || dates.length !== 1 || !passed.has(dates[0])) return cell;
      labelled += 1;
      return `| ${text} ${MARK} `;
    });
  });
  return { source: lines.join("\n"), labelled };
}

/**
 * The `updated` value that clears today's findings without hiding tomorrow's.
 * staleDatedCopy() reports only dates strictly after `updated`, so setting it to
 * today would exempt a show dated today for good: it could never be flagged when
 * it passes. Keep `updated` below the earliest date that has not passed yet
 * (still at or after every date just labelled, which are all before today).
 */
export function updatedFor(source, today) {
  const upcoming = namedDates(source).filter((date) => date >= today);
  if (!upcoming.length) return today;
  const dayBefore = new Date(Date.parse(`${upcoming[0]}T00:00:00Z`) - 86400000).toISOString().slice(0, 10);
  return dayBefore < today ? dayBefore : today;
}

export function setUpdated(source, today) {
  if (/^updated:\s*.*$/m.test(source.split(/\n---/)[0])) return source.replace(/^updated:\s*.*$/m, `updated: ${today}`);
  return source.replace(/^(date:\s*.*)$/m, `$1\nupdated: ${today}`);
}

export function run({ root = ROOT, today = new Date().toISOString().slice(0, 10), check = false } = {}) {
  const findings = staleDatedCopy({ root, today }).filter((finding) => finding.file.startsWith("content/blog/"));
  const changed = [];
  const needsEditor = [];
  for (const finding of findings) {
    const file = path.join(root, finding.file);
    const before = fs.readFileSync(file, "utf8");
    const { source, labelled } = labelPassedTableDates(before, finding.dates);
    if (!labelled) { needsEditor.push(finding); continue; }
    const after = setUpdated(source, updatedFor(source, today));
    // Whatever is left (prose) would still be reported once `updated` moves, so
    // list it for an editor rather than hiding it behind the new date.
    const remaining = finding.dates.filter((date) => namedDates(after.split(/\n---\n/).slice(1).join("\n---\n").split("\n").filter((l) => !/^\s*\|/.test(l)).join("\n")).includes(date));
    if (remaining.length) needsEditor.push({ ...finding, dates: remaining });
    changed.push({ file: finding.file, labelled });
    if (!check) fs.writeFileSync(file, after);
  }
  return { changed, needsEditor };
}

function selfTest() {
  const checks = [];
  const ok = (name, value) => checks.push([name, Boolean(value)]);
  const table = [
    "| City | Next date | Venue |",
    "|---|---|---|",
    "| Birmingham | 31 October 2026 | Arena |",
    "| Knoxville | 28 October 2026 (has passed) | Arena |",
    "| Mobile | 25 March 2027 | Arena |",
    "| [Sunrise](/x) | October 31, 2026 | Arena |"
  ].join("\n");
  const out = labelPassedTableDates(table, ["2026-10-31", "2026-10-28"]);
  ok("a passed date-only cell is labelled", out.source.includes("| Birmingham | 31 October 2026 (has passed) | Arena |"));
  ok("month-first dates are labelled", out.source.includes("October 31, 2026 (has passed)"));
  ok("an already-labelled cell is left alone", out.source.includes("28 October 2026 (has passed) |") && !out.source.includes("(has passed) (has passed)"));
  ok("a future date is left alone", out.source.includes("| Mobile | 25 March 2027 | Arena |"));
  ok("two cells labelled", out.labelled === 2);
  const prose = "Twelve nights remain, to 31 October 2026.\n";
  ok("prose is never rewritten", labelPassedTableDates(prose, ["2026-10-31"]).source === prose);
  const mixed = "| Note | 31 October 2026 is the last night |\n";
  ok("a cell with other words is left alone", labelPassedTableDates(mixed, ["2026-10-31"]).labelled === 0);
  ok("updated is replaced", setUpdated("---\ndate: 2026-10-01\nupdated: 2026-10-02\n---\nx", "2026-11-01").includes("updated: 2026-11-01"));
  ok("updated is added after date", setUpdated("---\ndate: 2026-10-01\nstatus: published\n---\nx", "2026-11-01").includes("date: 2026-10-01\nupdated: 2026-11-01"));
  ok("updated is today when nothing is upcoming", updatedFor("| a | 31 October 2026 |", "2026-11-10") === "2026-11-10");
  ok("updated stays below a date that is today", updatedFor("| a | 31 October 2026 |\n| b | 10 November 2026 |", "2026-11-10") === "2026-11-09");
  ok("updated stays below a date in the future", updatedFor("| b | 12 November 2026 |", "2026-11-10") === "2026-11-10");
  const failed = checks.filter(([, pass]) => !pass);
  for (const [name, pass] of checks) console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  if (failed.length) process.exit(1);
  console.log(`${checks.length}/${checks.length} checks passed.`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) selfTest();
  else {
    const { changed, needsEditor } = run({ check: args.includes("--check") });
    for (const item of changed) console.log(`${args.includes("--check") ? "would label" : "labelled"} ${item.labelled} passed date(s) in ${item.file}`);
    for (const item of needsEditor) console.log(`needs an editor (prose): ${item.file} names ${item.dates.join(", ")}`);
    if (changed.length && !args.includes("--check")) console.log("Now run: npm run blog:build");
    if (args.includes("--check") && (changed.length || needsEditor.length)) process.exit(1);
  }
}
