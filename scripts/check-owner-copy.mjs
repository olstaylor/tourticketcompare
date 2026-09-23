#!/usr/bin/env node
// Refuses to pass while any public-facing source still carries an
// "[OWNER COPY: …]" slot.
//
// Copy that makes a claim to users — what we checked, when a date appears, what
// a subscriber is emailed — is owner-authored. An agent that changes the
// behaviour behind such a claim leaves a marked slot rather than guessing the
// wording, and this check is what stops a slot reaching production: it is the
// last step of test:mvp, so every other check still reports first.
//
//   node scripts/check-owner-copy.mjs            # fail and list every slot
//   node scripts/check-owner-copy.mjs --self-test

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MARKER = "[OWNER COPY";
// Everything that can reach a rendered page. Tests under scripts/ name the
// marker on purpose and are not scanned.
const SCAN_ROOTS = ["functions", "public", "content"];
const SKIP_DIRS = new Set(["node_modules", "admin"]);
const SCAN_EXTENSIONS = /\.(m?js|html|json|md|txt)$/;

export function findSlots(text) {
  const slots = [];
  text.split("\n").forEach((line, index) => {
    let from = 0;
    while ((from = line.indexOf(MARKER, from)) !== -1) {
      const end = line.indexOf("]", from);
      slots.push({ line: index + 1, slot: line.slice(from, end === -1 ? undefined : end + 1) });
      from += MARKER.length;
    }
  });
  return slots;
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXTENSIONS.test(name)) yield full;
  }
}

function selfTest() {
  const found = findSlots("a\nx `[OWNER COPY: heading]` y [OWNER COPY: body for ${name}]\nz");
  const ok =
    found.length === 2 &&
    found[0].line === 2 &&
    found[0].slot === "[OWNER COPY: heading]" &&
    found[1].slot === "[OWNER COPY: body for ${name}]" &&
    findSlots("no slots here").length === 0;
  console.log(ok ? "check-owner-copy: self-test passed" : "check-owner-copy: self-test FAILED");
  return ok ? 0 : 1;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());

const hits = [];
for (const root of SCAN_ROOTS) {
  for (const file of walk(join(ROOT, root))) {
    for (const hit of findSlots(readFileSync(file, "utf8"))) hits.push({ file: relative(ROOT, file), ...hit });
  }
}

if (!hits.length) {
  console.log("check-owner-copy: no [OWNER COPY: …] slots in public-facing source");
  process.exit(0);
}
console.error(`check-owner-copy: ${hits.length} unwritten owner-copy slot(s) — write the copy before merging:`);
for (const { file, line, slot } of hits) console.error(`  ${file}:${line}  ${slot}`);
process.exit(1);
