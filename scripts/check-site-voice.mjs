#!/usr/bin/env node
// Refuses to pass while guide or blog copy speaks as "we".
//
// Owner direction 2026-09-24: the site does not speak in the first person.
// Copy names the site ("TourTicketCompare", "the site", "this site") or uses a
// plain construction instead. The reader's own voice is fine — "How do I…?",
// "Notify me" — so only first-person plural is blocked: we, we're, we've,
// we'll, we'd, our, ours, ourselves, and lowercase "us" ("US" is the country).
//
// Quoted text is exempt, because a quotation from a provider's own help page
// ("within the safety of our platform") is theirs to word. URLs and hyphenated
// slugs (the "how-we-work" blog tag) are exempt, because a published slug is an
// address, not copy.
//
// scripts/smoke-prelaunch.mjs applies findFirstPersonPlural() to the rendered
// <main> of every public route and artist page, so the server-rendered copy is
// held to the same rule.
//
//   node scripts/check-site-voice.mjs            # fail and list every hit
//   node scripts/check-site-voice.mjs --self-test

import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIRS = ["content/guides", "content/blog"];

const PLURAL = /\b(?:we|we['’](?:re|ve|ll|d)|our|ours|ourselves)\b/gi;
const LOWERCASE_US = /\bus\b/g;

function withoutExemptText(text) {
  return String(text)
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\]\([^)]*\)/g, "] ")
    .replace(/(?:^|\s)\/[a-z0-9/_-]+/gi, " ")
    .replace(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g, " ")
    .replace(/"[^"\n]*"/g, " ")
    .replace(/“[^”\n]*”/g, " ")
    .replace(/&quot;[^\n]*?&quot;/g, " ")
    .replace(/&ldquo;[^\n]*?&rdquo;/g, " ");
}

/**
 * Every first-person-plural word in `text`, one entry per line hit.
 *
 * @param {string} text
 * @returns {Array<{ line: number, word: string, context: string }>}
 */
export function findFirstPersonPlural(text) {
  const hits = [];
  String(text)
    .split("\n")
    .forEach((line, index) => {
      const scanned = withoutExemptText(line);
      for (const pattern of [PLURAL, LOWERCASE_US]) {
        for (const match of scanned.matchAll(pattern)) {
          const start = Math.max(0, match.index - 50);
          hits.push({
            line: index + 1,
            word: match[0],
            context: scanned.slice(start, match.index + match[0].length + 50).trim()
          });
        }
      }
    });
  return hits;
}

function selfTest() {
  const cases = [
    ["We check every few hours.", 1],
    ["the time we checked it", 1],
    ["We're independent and we don't sell tickets.", 2],
    ["See our guide, and tell us.", 2],
    ["Prices are shown in US dollars.", 0],
    ["How do I avoid overpaying? Notify me.", 0],
    ['Ticketmaster says "within the safety of our platform".', 0],
    ["Read the [about page](https://example.com/about-us).", 0],
    ["See /blog/tag/how-we-work for more.", 0],
    ["tags:\n  - how-we-work", 0],
    ["TourTicketCompare checks each link.", 0],
    ["The weekend show is well reviewed.", 0]
  ];
  const failures = cases.filter(([text, expected]) => findFirstPersonPlural(text).length !== expected);
  for (const [text, expected] of failures) {
    console.error(`  expected ${expected} hit(s), got ${findFirstPersonPlural(text).length}: ${text}`);
  }
  console.log(failures.length ? "check-site-voice: self-test FAILED" : "check-site-voice: self-test passed");
  return failures.length ? 1 : 0;
}

function main() {
  if (process.argv.includes("--self-test")) return selfTest();
  const hits = [];
  for (const dir of CONTENT_DIRS) {
    for (const name of readdirSync(join(ROOT, dir)).filter((file) => file.endsWith(".md")).sort()) {
      const file = join(ROOT, dir, name);
      for (const hit of findFirstPersonPlural(readFileSync(file, "utf8"))) {
        hits.push({ file: relative(ROOT, file), ...hit });
      }
    }
  }
  if (!hits.length) {
    console.log("check-site-voice: no first-person-plural copy in content/guides or content/blog");
    return 0;
  }
  console.error(
    `check-site-voice: ${hits.length} first-person-plural word(s). Name the site ("TourTicketCompare", "the site") or rephrase:`
  );
  for (const { file, line, word, context } of hits) console.error(`  ${file}:${line}  "${word}"  …${context}…`);
  return 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main());
