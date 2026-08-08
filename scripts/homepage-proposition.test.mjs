#!/usr/bin/env node

// Homepage proposition parity tests (npm run test:homepage-proposition).
//
// The homepage is rendered three times by three different files:
//   1. functions/[[path]].js  — the server template every crawler and every
//                               no-JS visitor sees, and the first paint for
//                               everyone else.
//   2. public/ttc-home.js     — the hydrated homepage, which replaces the
//                               server markup inside #ttc-main.
//   3. public/app.js          — the client fallback used when the server shell
//                               was not injected.
// Nothing forced them to agree, and they drifted into three different promises
// ("Find your show, then compare the ticket sites that have it.", "Compare
// concert ticket prices for the same show.", three different step lists). The
// wording now lives in one marked block that is copied verbatim into each file,
// and these tests fail the build the moment a copy drifts.
//
// The same applies to the two other surfaces that state the proposition — the
// artists index and the how-it-works page — which the server owns and app.js
// re-renders when the server markup is absent.
//
// The tests are text-level on purpose: the three renderers cannot share a
// module (one is bundled by Cloudflare, two are classic browser scripts loaded
// on the same page), so the block is the contract.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SERVER_FILE = "functions/[[path]].js";
const HYDRATED_FILE = "public/ttc-home.js";
const FALLBACK_FILE = "public/app.js";

// Files that must carry each marked block, in the order the renderers run.
const HOMEPAGE_BLOCK_FILES = [SERVER_FILE, HYDRATED_FILE, FALLBACK_FILE];
const SITE_BLOCK_FILES = [SERVER_FILE, FALLBACK_FILE];

let passed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passed += 1;
    return;
  }
  failures.push(message);
}

const sources = new Map();
for (const file of new Set([...HOMEPAGE_BLOCK_FILES, ...SITE_BLOCK_FILES, "public/index.html", "functions/_route-metadata.js"])) {
  sources.set(file, await readFile(path.join(ROOT, file), "utf8"));
}

// ─── Block extraction ───────────────────────────────────────────────────────

// ttc-home.js keeps its copy inside an IIFE, so the block is indented there.
// Compare the dedented text: indentation is formatting, the copy is the
// contract.
function dedent(text) {
  const lines = text.split("\n");
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)[0].length);
  const common = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(common).trimEnd()).join("\n").trim();
}

function extractBlock(source, name, file) {
  const start = source.indexOf(`>>> ${name} >>>`);
  const end = source.indexOf(`<<< ${name} <<<`);
  if (start === -1 || end === -1 || end < start) return null;
  const body = source.slice(source.indexOf("\n", start) + 1, source.lastIndexOf("\n", end));
  if (!body.trim()) throw new Error(`${file}: '${name}' block is empty`);
  return dedent(body);
}

function blocks(name, files) {
  return files.map((file) => {
    const block = extractBlock(sources.get(file), name, file);
    assert(block !== null, `${file}: missing the '${name}' block markers`);
    return { file, block };
  });
}

const homepageBlocks = blocks("homepage-proposition", HOMEPAGE_BLOCK_FILES);
const siteBlocks = blocks("site-proposition", SITE_BLOCK_FILES);

for (const group of [homepageBlocks, siteBlocks]) {
  const [reference, ...rest] = group;
  if (!reference?.block) continue;
  for (const other of rest) {
    if (!other.block) continue;
    assert(
      other.block === reference.block,
      `${other.file} has drifted from ${reference.file} — copy the block across verbatim.\n` +
        `--- ${reference.file}\n${reference.block}\n--- ${other.file}\n${other.block}`
    );
  }
}

// ─── The proposition itself ─────────────────────────────────────────────────

// Read the values out of the server block, which the assertions above have
// already pinned to the other two renderers.
const serverBlock = homepageBlocks[0].block || "";
const siteBlock = siteBlocks[0].block || "";

function literal(block, constName) {
  const match = block.match(new RegExp(`const ${constName} =\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)";`));
  return match ? match[1].replace(/\\"/g, '"') : null;
}

const headline = literal(serverBlock, "HOME_HEADLINE");
const subcopy = literal(serverBlock, "HOME_SUBCOPY");
const primaryCtaLabel = literal(serverBlock, "HOME_PRIMARY_CTA_LABEL");
const primaryCtaHref = literal(serverBlock, "HOME_PRIMARY_CTA_HREF");

assert(headline === "Compare ticket prices for the show you want.", "the homepage headline is the agreed proposition");
assert(
  subcopy ===
    "Choose an artist and date, see current listed prices from ticket sites where available, then check the final total with the provider.",
  "the homepage supporting copy is the agreed proposition"
);
assert(primaryCtaLabel === "Find a show", "the homepage primary action is 'Find a show'");
assert(primaryCtaHref === "/artists", "the primary action goes to the artists index, where a show is chosen");

// Three steps, each with a body and its own destination.
const stepTitles = [...serverBlock.matchAll(/title: "([^"]+)"/g)].map((match) => match[1]);
const stepBodies = [...serverBlock.matchAll(/body: "([^"]+)"/g)].map((match) => match[1]);
const stepHrefs = [...serverBlock.matchAll(/href: "(\/[^"]*)"/g)].map((match) => match[1]);
assert(stepTitles.length === 3, "the how-it-works strip has exactly three steps");
assert(stepBodies.length === 3 && stepBodies.every(Boolean), "every step has supporting copy");
assert(new Set(stepHrefs).size === stepHrefs.length, "each step links somewhere different");
assert(stepTitles[0] === "1. Find a show", "step one repeats the primary action, so the page says one thing");

// ─── Claims we must not make ────────────────────────────────────────────────

// SAFE_PUBLISHING_RULES.md: we do not claim complete provider coverage, that a
// displayed price is the final total, or that we find the cheapest ticket. The
// proposition is the most-read copy on the site, so it is checked directly.
const BANNED = [
  { pattern: /\bcheapest\b/i, why: "must not claim we find the cheapest ticket" },
  { pattern: /\blowest price\b/i, why: "must not claim a lowest price" },
  { pattern: /\bbest price\b/i, why: "must not claim a best price" },
  { pattern: /\ball (?:the )?(?:major )?(?:ticket sites|providers|sellers)\b/i, why: "must not claim every provider is covered" },
  { pattern: /\bevery (?:ticket site|provider|seller)\b/i, why: "must not claim every provider is covered" },
  { pattern: /\bfees included\b/i, why: "must not claim displayed prices include fees" },
  { pattern: /\bincluding (?:all )?fees\b/i, why: "must not claim displayed prices include fees" },
  { pattern: /\bguarantee/i, why: "must not guarantee an outcome" },
  { pattern: /\bwe sell\b/i, why: "we do not sell tickets" }
];

// Every authored string in the block, so the claim checks read the copy rather
// than the code around it.
function copyStrings(block) {
  return [...block.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((match) => match[1]).filter((value) => /\s/.test(value));
}

for (const [label, block] of [["homepage-proposition", serverBlock], ["site-proposition", siteBlock]]) {
  const copy = copyStrings(block).join(" ");
  for (const { pattern, why } of BANNED) {
    assert(!pattern.test(copy), `${label} ${why} (matched ${pattern})`);
  }
  // A final total is only ever something the ticket site shows you at checkout,
  // never something this site displays — so each sentence that mentions one has
  // to name where it is confirmed.
  const totalSentences = copy.split(/(?<=[.!?])\s+/).filter((sentence) => /\b(?:final )?total\b/i.test(sentence));
  for (const sentence of totalSentences) {
    assert(
      /\bprovider\b|\bticket site\b/i.test(sentence),
      `${label} mentions a total without saying where it is confirmed: "${sentence}"`
    );
  }
}

// The proposition is deliberately conditional about price coverage; losing that
// hedge would turn it into a coverage claim.
assert(/where available/.test(subcopy), "the supporting copy keeps the 'where available' hedge on price coverage");

// ─── The blocks are actually used ───────────────────────────────────────────

// A block that no renderer reads would pass every check above while the page
// still said something else, so each file must reference its constants outside
// the block.
function usesOutsideBlock(file, constName, blockName) {
  const source = sources.get(file);
  const start = source.indexOf(`>>> ${blockName} >>>`);
  const end = source.indexOf(`<<< ${blockName} <<<`);
  const outside = source.slice(0, start) + source.slice(end);
  return outside.includes(constName);
}

for (const file of HOMEPAGE_BLOCK_FILES) {
  for (const constName of ["HOME_HEADLINE", "HOME_SUBCOPY", "HOME_PRIMARY_CTA_LABEL", "HOME_PRIMARY_CTA_HREF", "HOME_STEPS"]) {
    assert(usesOutsideBlock(file, constName, "homepage-proposition"), `${file} must render ${constName} rather than its own wording`);
  }
}
for (const file of SITE_BLOCK_FILES) {
  for (const constName of ["ARTISTS_INDEX_LEAD", "ARTISTS_INDEX_NOTE", "HOW_IT_WORKS_LEAD"]) {
    assert(usesOutsideBlock(file, constName, "site-proposition"), `${file} must render ${constName} rather than its own wording`);
  }
}

// ─── No renderer keeps a superseded headline ────────────────────────────────

const SUPERSEDED = [
  "Find your show, then compare the ticket sites that have it.",
  "Compare concert ticket prices <em>for the same show.</em>",
  "Search an artist, pick your date, and see the prices we have from each ticket site."
];
for (const file of HOMEPAGE_BLOCK_FILES) {
  for (const stale of SUPERSEDED) {
    assert(!sources.get(file).includes(stale), `${file} still carries superseded homepage copy: ${stale}`);
  }
}

// ─── The SERP proposition matches the page ──────────────────────────────────

// The homepage meta description is the same promise, read before the page is
// opened. index.html ships it statically and functions/_route-metadata.js
// injects it per request, so both must say it.
const metadata = sources.get("functions/_route-metadata.js");
const homeDescription = metadata
  .slice(metadata.indexOf('"/": {'))
  .match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
assert(Boolean(homeDescription), "functions/_route-metadata.js exposes a homepage description");
assert(
  homeDescription?.startsWith("Compare ticket prices for the show you want."),
  "the homepage meta description opens with the same proposition as the page"
);
assert(
  sources.get("public/index.html").includes(homeDescription || " "),
  "public/index.html ships the same homepage description the route metadata injects"
);
for (const { pattern, why } of BANNED) {
  assert(!pattern.test(homeDescription || ""), `homepage meta description ${why}`);
}

// ─── Report ─────────────────────────────────────────────────────────────────

if (failures.length) {
  console.error(`homepage-proposition: ${failures.length} failure(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`homepage-proposition: ${passed} checks passed`);
