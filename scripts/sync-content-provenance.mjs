#!/usr/bin/env node
/**
 * Content provenance sync — keeps every static page's published "Updated" date
 * honest without anyone having to remember to bump it.
 *
 * WHY THIS IS HASH-BASED AND NOT DATE-BASED
 * -----------------------------------------
 * The obvious implementations are both wrong for this repository:
 *
 *   1. "Stamp today on deploy" asserts an editorial review that did not happen.
 *      SAFE_PUBLISHING_RULES.md forbids inventing data, and a date that moves
 *      while the copy sits still is exactly that.
 *
 *   2. "Derive from git" looks rigorous and is not. This repository's history
 *      was re-rooted on 2026-07-25 in a single 187-file commit, so the last
 *      commit touching public/data/guides-content.json reports 2026-07-25 for
 *      all 17 guides — including the 11 whose prose has not changed since June.
 *      Any commit-date derivation would have backdated eleven pages to a
 *      restructure that changed none of their words.
 *
 * So the date is anchored to the copy itself. Each tracked route gets a
 * fingerprint over the text that actually renders; the recorded date advances
 * only when that fingerprint changes. Reformatting, dependency bumps, link
 * re-checks and the calendar moving all leave it alone.
 *
 * WHAT IS FINGERPRINTED
 * ---------------------
 * Guide routes:  their GUIDE_ROUTES metadata (title/h1/description) plus their
 *                guides-content.json entry (sections, source names/publishers/
 *                URLs, schema). Both of those are now GENERATED from
 *                content/guides/*.md, and the fingerprint is taken over the
 *                generated form, so the recorded hashes are unchanged by the
 *                move to Markdown.
 * Trust routes:  their TRUST_ROUTES metadata plus the render block in
 *                functions/[[path]].js that produces the page body, plus any
 *                shared copy helper that block calls (see RENDER_SPECS).
 *
 * Deliberately excluded from the fingerprint: `datePublished`, `lastmod`, and
 * the per-source `lastChecked` / `linkCheckedAt` fields. Those are provenance
 * about the copy, not the copy — including them would make the daily link
 * checker bump every guide's "Updated" date, which is the false-freshness
 * problem this script exists to prevent.
 *
 * GUIDES ARE STATE-DRIVEN
 * -----------------------
 * A trust route's lastmod is written back into functions/_route-metadata.js,
 * because that file is hand-authored. A guide's is not: content/guides/*.md is
 * hand-authored and must never be rewritten by automation — an editor's save
 * would race a bot's commit, and a date is not the editor's claim to make. So
 * this script records the guide date in data/content-provenance.json and then
 * re-runs the guide build, which reads it back out into
 * functions/_guide-routes.generated.js. The Markdown is never touched.
 *
 * The same state file carries `guide_publication`, the immutable record of when
 * each guide was first published. It is append-only: an entry survives the
 * guide being drafted, renamed or deleted, which is what lets
 * scripts/build-guide-content.mjs tell a never-published draft (no entry, may
 * omit date_published) from a withdrawn one (entry retained, needs a redirect).
 *
 * FIRST RUN SEEDS, IT DOES NOT REWRITE
 * ------------------------------------
 * A route with no recorded fingerprint adopts whatever date is already
 * published for it and records the current hash. Nothing that is live today
 * moves. Dates only start advancing on the next real copy edit.
 *
 * USAGE
 *   node scripts/sync-content-provenance.mjs             # write state + lastmod
 *   node scripts/sync-content-provenance.mjs --check     # CI: fail if stale
 *   node scripts/sync-content-provenance.mjs --dry-run   # report, write nothing
 *   node scripts/sync-content-provenance.mjs --self-test # internal assertions
 *   --today YYYY-MM-DD                                   # pin the clock
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { buildGuideOutputs } from './build-guide-content.mjs';
import { splitDocument } from './lib/content-markdown.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTE_METADATA_PATH = path.join(ROOT, 'functions', '_route-metadata.js');
// Guide metadata is generated, so its lastmod is not written back into a source
// file. See the "GUIDES ARE STATE-DRIVEN" note below.
const GUIDE_ROUTES_MODULE_PATH = path.join(ROOT, 'functions', '_guide-routes.generated.js');
const GUIDES_SOURCE_DIR = path.join(ROOT, 'content', 'guides');
const ROUTER_PATH = path.join(ROOT, 'functions', '[[path]].js');
const GUIDES_CONTENT_PATH = path.join(ROOT, 'public', 'data', 'guides-content.json');
const STATE_PATH = path.join(ROOT, 'data', 'content-provenance.json');

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// The router function that returns every page body. Trust-route branches are
// located *inside* this function, never across the whole file: `route.type ===
// "comparison-hub"` also opens a branch in routeSchema() several thousand lines
// earlier, and a naive whole-file indexOf matched that one — fingerprinting the
// hub's JSON-LD instead of its visible copy, so edits to the hub's words would
// never have advanced its date. Scoping first makes the branch unambiguous.
const RENDER_CONTAINER = 'renderMainContent';

/**
 * How to find each trust route's body copy inside renderMainContent().
 *
 * `block` is the opening line of the branch that returns the page body; the
 * extractor takes it to its matching close. Everything that block reaches — the
 * helpers it calls, the constants those read, and so on — is resolved
 * automatically by collectCopyDependencies, so this table lists only entry
 * points and never needs a hand-maintained list of helpers.
 *
 * Every entry must match, and an unmatched spec is a hard error rather than an
 * empty hash — silently fingerprinting nothing would freeze a page's date
 * forever, which is the failure mode this whole script is guarding against.
 */
const RENDER_SPECS = {
  '/': { tail: 'return `<main id="mainContent"><div id="ttc-main">' },
  '/compare-concert-ticket-prices': { block: 'if (route.type === "comparison-hub") {' },
  '/artists': { block: 'if (route.path === "/artists") {' },
  '/guides': { block: 'if (route.path === "/guides") {' },
  '/how-it-works': { block: 'if (route.path === "/how-it-works") {' },
  '/currency-converter': { block: 'if (route.path === "/currency-converter") {' },
  '/affiliate-disclosure': { block: 'if (route.path === "/affiliate-disclosure") {' },
  '/privacy': { block: 'if (route.path === "/privacy") {' },
  '/terms': { block: 'if (route.path === "/terms") {' },
  '/contact': { block: 'if (route.path === "/contact") {' },
  '/about': { block: 'if (route.path === "/about") {' },
  '/editorial-policy': { block: 'if (route.path === "/editorial-policy") {' }
};

// Provenance fields are *about* the copy, never part of it. See the header note.
const EXCLUDED_METADATA_KEYS = new Set(['datePublished', 'lastmod']);
const EXCLUDED_SOURCE_KEYS = new Set(['lastChecked', 'linkCheckedAt']);

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const option = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
};

const CHECK_MODE = flag('--check');
const DRY_RUN = flag('--dry-run');
const SELF_TEST = flag('--self-test');
const TODAY = option('--today') || new Date().toISOString().slice(0, 10);

function fail(message) {
  console.error(`CONTENT PROVENANCE FAILED: ${message}`);
  process.exit(1);
}

function hash(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex').slice(0, 16);
}

/**
 * Reduce a JavaScript render block to the part a visitor can actually perceive.
 *
 * A trust route's fingerprint is taken over source, but the promise this script
 * makes is about *copy*. Without this, adding a code comment or re-wrapping a
 * line inside a render branch would fail `--check` and force the published date
 * forward even though the rendered page is byte-identical — the exact false
 * freshness the mechanism exists to prevent.
 *
 * Only whole-line comments are stripped. A trailing `//` on a code line is left
 * alone because `//` also appears inside the URLs and template literals these
 * blocks are full of, and mis-stripping one would silently drop real copy from
 * the fingerprint. Whitespace runs then collapse, so indentation and line
 * breaks stop mattering while the words themselves still do.
 */
export function normalizeRenderSource(source) {
  return String(source || '')
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*');
    })
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract a brace-balanced region starting at the line that begins with
 * `opener`. Brace counting ignores nothing — template literals in this file do
 * contain braces via `${...}`, but those are balanced too, so a plain counter
 * terminates in the right place. Returns null when the opener is absent.
 */
export function extractBlock(source, opener) {
  const start = source.indexOf(opener);
  if (start < 0) return null;
  let depth = 0;
  let seenBrace = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') {
      depth += 1;
      seenBrace = true;
    } else if (ch === '}') {
      depth -= 1;
      if (seenBrace && depth === 0) return source.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Extract a top-level `function name(...) { ... }` declaration, body included.
 *
 * Brace counting cannot start at the declaration: a parameter list with
 * destructured or object defaults — `renderMainContent(route, catalog, events =
 * [], guideContent = {}, env = {})` — opens and closes braces before the body
 * begins, so a naive counter terminates on `guideContent = {}` and returns a
 * signature instead of a function. Match the parameter parens first, then take
 * the balanced block from the `{` that follows.
 */
export function extractFunction(source, name) {
  const marker = `function ${name}(`;
  const at = source.indexOf(marker);
  if (at < 0) return null;
  let depth = 0;
  for (let i = at + marker.length - 1; i < source.length; i += 1) {
    if (source[i] === '(') depth += 1;
    else if (source[i] === ')') {
      depth -= 1;
      if (depth === 0) {
        const brace = source.indexOf('{', i);
        if (brace < 0) return null;
        const body = extractBlock(source.slice(brace), '{');
        return body ? source.slice(at, brace) + body : null;
      }
    }
  }
  return null;
}

/**
 * Extract the trailing `return ...;` of a function, given the literal start of
 * that return statement. Used for the homepage, whose body is the fallback
 * return of renderMainContent rather than a named branch.
 */
export function extractTail(source, opener) {
  const start = source.indexOf(opener);
  if (start < 0) return null;
  // Runs to the end of the enclosing function: the next line that is a closing
  // brace in column 0.
  const end = source.indexOf('\n}', start);
  return end < 0 ? source.slice(start) : source.slice(start, end);
}

/**
 * Extract a top-level `const NAME = ...;` declaration, value included.
 * Scans with a bracket counter so array/object literals survive intact.
 */
export function extractConstant(source, name) {
  const marker = new RegExp(`(^|\\n)(?:const|let) ${name}\\s*=`);
  const found = source.match(marker);
  if (!found) return null;
  const at = source.indexOf(found[0]) + (found[1] ? 1 : 0);
  let depth = 0;
  for (let i = at; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{' || ch === '[' || ch === '(') depth += 1;
    else if (ch === '}' || ch === ']' || ch === ')') depth -= 1;
    else if (ch === ';' && depth === 0) return source.slice(at, i + 1);
  }
  return null;
}

/**
 * Index every top-level declaration in the router by name, so a render block's
 * references can be resolved back to the source that produces them.
 */
export function buildDeclarationIndex(source) {
  const names = new Set([
    ...[...source.matchAll(/^function ([A-Za-z_$][\w$]*)\s*\(/gm)].map((m) => m[1]),
    ...[...source.matchAll(/^(?:const|let) ([A-Za-z_$][\w$]*)\s*=/gm)].map((m) => m[1])
  ]);
  const index = new Map();
  for (const name of names) {
    const declaration = extractFunction(source, name) ?? extractConstant(source, name);
    if (declaration) index.set(name, declaration);
  }
  return index;
}

/**
 * Everything a render block transitively depends on for its visible copy.
 *
 * A hand-listed set of helpers cannot hold: `/guides` renders through
 * `renderGuideClusters()`, whose headings and introductions actually live in the
 * `GUIDE_CLUSTERS` constant and whose cards come from `guideCardHtml()`. Editing
 * a cluster intro is a copy change that a one-level list would have missed
 * entirely, leaving the page's published date frozen while its words changed.
 *
 * References are matched by identifier, which over-collects slightly: a name
 * appearing inside a string counts as a reference. That direction is the safe
 * one — an extra dependency can only make the fingerprint notice more, never
 * less — and normalizeRenderSource() keeps the extra source from causing
 * spurious bumps, since comments and formatting are stripped before hashing.
 */
export function collectCopyDependencies(index, startSource, maxDepth = 6) {
  const collected = new Map();
  let frontier = [startSource];
  for (let depth = 0; depth < maxDepth && frontier.length; depth += 1) {
    const next = [];
    for (const chunk of frontier) {
      for (const identifier of new Set(chunk.match(/[A-Za-z_$][\w$]*/g) || [])) {
        if (!index.has(identifier) || collected.has(identifier)) continue;
        const declaration = index.get(identifier);
        collected.set(identifier, declaration);
        next.push(declaration);
      }
    }
    frontier = next;
  }
  // Sorted by name so the fingerprint does not depend on traversal order.
  return [...collected.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, source]) => source);
}

/**
 * Pull the raw text of one `"key": { ... }` entry out of a route-metadata
 * object literal, minus the provenance fields.
 */
export function extractMetadataEntry(source, routePath) {
  const block = extractBlock(source, `"${routePath}": {`);
  if (!block) return null;
  return block
    .split('\n')
    .filter((line) => {
      const key = line.trim().split(':')[0].trim();
      return !EXCLUDED_METADATA_KEYS.has(key);
    })
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Canonical JSON for a guide's content entry, with provenance fields dropped. */
export function guideContentFingerprint(entry) {
  if (!entry || typeof entry !== 'object') return '';
  const sources = Array.isArray(entry.sources)
    ? entry.sources.map((source) => {
        const kept = {};
        for (const key of Object.keys(source || {}).sort()) {
          if (!EXCLUDED_SOURCE_KEYS.has(key)) kept[key] = source[key];
        }
        return kept;
      })
    : [];
  return JSON.stringify({ sections: entry.sections ?? null, sources, schema: entry.schema ?? null });
}

async function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') return fallback;
    throw error;
  }
}

function parseRouteObject(source, exportName) {
  const block = extractBlock(source, `export const ${exportName} = {`);
  if (!block) fail(`could not locate ${exportName} in functions/_route-metadata.js`);
  const paths = [...block.matchAll(/^ {2}"(\/[^"]*)":\s*\{/gm)].map((m) => m[1]);
  if (!paths.length) fail(`no route entries parsed from ${exportName}`);
  return { block, paths };
}

/** Current `datePublished` declared in the metadata source for a route. */
function declaredDatePublished(block, routePath) {
  const entry = extractBlock(block, `"${routePath}": {`);
  const match = entry?.match(/datePublished:\s*"([\d-]+)"/);
  return match ? match[1] : null;
}

/** Current `lastmod` recorded in the metadata source for a route. */
function declaredLastmod(block, routePath) {
  const entry = extractBlock(block, `"${routePath}": {`);
  const match = entry?.match(/lastmod:\s*"([\d-]+)"/);
  return match ? match[1] : null;
}

/**
 * Rewrite one route's `lastmod` in place. Scoped to that route's own entry so a
 * shared date value can never rewrite a neighbouring route.
 */
export function writeLastmod(source, routePath, value) {
  const entry = extractBlock(source, `"${routePath}": {`);
  if (!entry) throw new Error(`cannot write lastmod: route ${routePath} not found`);

  // Insert the field when a newly added route has none. Refusing to create it
  // would mean a contributor adding a guide had to hand-write a date first —
  // exactly the hand-maintenance this script exists to remove, and it would
  // make `npm run content:provenance` unable to onboard its own routes.
  // Indentation is copied from a sibling property so the generated line matches
  // the file's existing style.
  const updated = /lastmod:\s*"[\d-]*"/.test(entry)
    ? entry.replace(/lastmod:\s*"[\d-]*"/, () => `lastmod: "${value}"`)
    : (() => {
        const indent = entry.match(/\n(\s+)[A-Za-z_$"]/)?.[1] ?? '    ';
        const lastProperty = entry.lastIndexOf('\n');
        if (lastProperty < 0) throw new Error(`cannot write lastmod: route ${routePath} entry is not multiline`);
        const head = entry.slice(0, lastProperty);
        const tail = entry.slice(lastProperty);
        // The final property may or may not already carry a trailing comma.
        const separator = /,\s*$/.test(head) ? '' : ',';
        return `${head}${separator}\n${indent}lastmod: "${value}"${tail}`;
      })();
  // Splice by index, not String.replace: a string replacement argument
  // interprets $&, $`, $', $$ and $n, so a route whose title or description
  // ever contained one of those would be silently corrupted — in a protected
  // file where a syntax error breaks every HTML route. The callback form above
  // is safe for the same reason.
  const at = source.indexOf(entry);
  return source.slice(0, at) + updated + source.slice(at + entry.length);
}

async function buildFingerprints() {
  const [metadataSource, guideModuleSource, routerSource, guidesContent] = await Promise.all([
    fs.readFile(ROUTE_METADATA_PATH, 'utf8'),
    fs.readFile(GUIDE_ROUTES_MODULE_PATH, 'utf8'),
    fs.readFile(ROUTER_PATH, 'utf8'),
    readJson(GUIDES_CONTENT_PATH, {})
  ]);

  const guides = parseRouteObject(guideModuleSource, 'GUIDE_ROUTES');
  const trust = parseRouteObject(metadataSource, 'TRUST_ROUTES');
  const declarations = buildDeclarationIndex(routerSource);
  const renderContainer = extractFunction(routerSource, RENDER_CONTAINER);
  if (!renderContainer) {
    fail(`could not locate ${RENDER_CONTAINER}() in functions/[[path]].js — trust-route copy cannot be fingerprinted`);
  }
  const routes = new Map();

  for (const routePath of guides.paths) {
    const metadata = extractMetadataEntry(guides.block, routePath);
    if (!metadata) fail(`guide route ${routePath} could not be fingerprinted`);
    const content = guideContentFingerprint(guidesContent[routePath]);
    if (!content) fail(`guide route ${routePath} has no entry in public/data/guides-content.json`);
    routes.set(routePath, {
      kind: 'guide',
      hash: hash(`${metadata} ${content}`),
      declared: declaredLastmod(guides.block, routePath),
      datePublished: declaredDatePublished(guides.block, routePath)
    });
  }

  for (const routePath of trust.paths) {
    const spec = RENDER_SPECS[routePath];
    if (!spec) {
      fail(
        `trust route ${routePath} has no RENDER_SPECS entry. Add one so its copy is fingerprinted; ` +
          `an untracked route silently keeps a frozen date forever.`
      );
    }
    const metadata = extractMetadataEntry(trust.block, routePath);
    if (!metadata) fail(`trust route ${routePath} could not be fingerprinted`);

    const body = spec.tail ? extractTail(renderContainer, spec.tail) : extractBlock(renderContainer, spec.block);
    if (!body) {
      fail(
        `trust route ${routePath}: render block not found inside ${RENDER_CONTAINER}() ` +
          `(looked for ${JSON.stringify(spec.tail || spec.block)}). The renderer moved — update RENDER_SPECS.`
      );
    }
    // Cheap proof that we captured page copy and not some same-shaped branch
    // elsewhere (a schema builder, a redirect table). Every trust body this
    // script tracks returns the page's <main>; if one does not, the spec is
    // pointing at the wrong thing and the date would silently freeze.
    if (!body.includes('<main id="mainContent">')) {
      fail(
        `trust route ${routePath}: the matched block contains no <main id="mainContent">, so it is not ` +
          `the page body. Fix its RENDER_SPECS entry rather than fingerprinting the wrong source.`
      );
    }
    // Everything the block transitively reaches, not just what it calls
    // directly — see collectCopyDependencies for why a hand-listed set cannot
    // hold. Normalised before hashing so comments and formatting in any of that
    // source cannot advance a published date.
    const dependencies = collectCopyDependencies(declarations, body);
    routes.set(routePath, {
      kind: 'trust',
      dependencyCount: dependencies.length,
      hash: hash(normalizeRenderSource([metadata, body, ...dependencies].join('\n'))),
      declared: declaredLastmod(trust.block, routePath)
    });
  }

  return { routes, metadataSource };
}

function emptyState() {
  return {
    generated_by: 'scripts/sync-content-provenance.mjs',
    note:
      'Content fingerprints for static routes. content_updated_at advances only when content_hash ' +
      'changes, so a published "Updated" date never moves without the copy moving. Do not hand-edit; ' +
      'run `npm run content:provenance`.',
    routes: {},
    guide_publication: {}
  };
}

/**
 * The immutable first-publication ledger.
 *
 * Append-only by design. An entry is created the first time a guide is seen
 * published and is never removed, so drafting, renaming or deleting a guide
 * leaves the record of when it went live intact — which is what
 * scripts/build-guide-content.mjs reads to tell a never-published draft from a
 * withdrawn one, and to refuse a date_published that tries to move.
 */
export function nextGuidePublication(recorded, routes) {
  const next = { ...recorded };
  const problems = [];
  for (const [routePath, info] of routes) {
    if (info.kind !== 'guide' || !ISO_DATE.test(String(info.datePublished || ''))) continue;
    const existing = next[routePath]?.date_published;
    if (!existing) {
      next[routePath] = { date_published: info.datePublished };
      continue;
    }
    if (existing !== info.datePublished) {
      problems.push(
        `${routePath}: date_published is ${info.datePublished} but the ledger records ${existing}. ` +
          'A published date never moves; fix the guide, or correct the ledger in a reviewed commit.'
      );
    }
  }
  return { next, problems };
}

async function run() {
  const { routes, metadataSource } = await buildFingerprints();
  const state = (await readJson(STATE_PATH, null)) || emptyState();
  const recorded = state.routes && typeof state.routes === 'object' ? state.routes : {};

  const seeded = [];
  const changed = [];
  const unchanged = [];
  const removed = Object.keys(recorded).filter((routePath) => !routes.has(routePath));

  const nextRoutes = {};
  for (const [routePath, info] of routes) {
    const prior = recorded[routePath];
    if (!prior || !prior.content_hash) {
      // Seed: adopt the date that is already published rather than asserting a
      // review today. Falls back to today only for a route that has never had
      // a date at all.
      const date = ISO_DATE.test(String(info.declared || '')) ? info.declared : TODAY;
      nextRoutes[routePath] = { content_hash: info.hash, content_updated_at: date };
      seeded.push({ routePath, date });
      continue;
    }
    if (prior.content_hash === info.hash) {
      nextRoutes[routePath] = { content_hash: info.hash, content_updated_at: prior.content_updated_at };
      unchanged.push(routePath);
      continue;
    }
    nextRoutes[routePath] = { content_hash: info.hash, content_updated_at: TODAY };
    changed.push({ routePath, from: prior.content_updated_at, to: TODAY });
  }

  // Routes whose published date disagrees with the state file — e.g. someone
  // hand-edited a lastmod, or a previous run wrote state but not metadata.
  const drifted = [...routes.keys()].filter(
    (routePath) => routes.get(routePath).declared !== nextRoutes[routePath].content_updated_at
  );

  const recordedLedger = state.guide_publication && typeof state.guide_publication === 'object' ? state.guide_publication : {};
  const ledger = nextGuidePublication(recordedLedger, routes);
  const ledgerAdded = Object.keys(ledger.next).filter((routePath) => !recordedLedger[routePath]);

  if (CHECK_MODE) {
    const problems = [...ledger.problems];
    if (ledgerAdded.length) {
      problems.push(
        `${ledgerAdded.length} guide(s) are not in the first-publication ledger yet:\n` +
          ledgerAdded.map((routePath) => `    ${routePath}`).join('\n')
      );
    }
    if (changed.length) {
      problems.push(
        `${changed.length} route(s) have edited copy with a stale published date:\n` +
          changed.map((c) => `    ${c.routePath}  (published ${c.from})`).join('\n')
      );
    }
    if (seeded.length) {
      problems.push(
        `${seeded.length} route(s) are not tracked yet:\n` + seeded.map((s) => `    ${s.routePath}`).join('\n')
      );
    }
    if (removed.length) {
      problems.push(`${removed.length} tracked route(s) no longer exist:\n` + removed.map((r) => `    ${r}`).join('\n'));
    }
    if (drifted.length) {
      problems.push(
        `${drifted.length} route(s) have a lastmod that disagrees with the recorded fingerprint:\n` +
          drifted
            .map((r) => `    ${r}  (metadata ${routes.get(r).declared}, expected ${nextRoutes[r].content_updated_at})`)
            .join('\n')
      );
    }
    if (problems.length) {
      console.error('CONTENT PROVENANCE CHECK FAILED\n');
      for (const problem of problems) console.error(`  - ${problem}\n`);
      console.error('  Fix: npm run content:provenance   (then commit the result)\n');
      process.exit(1);
    }
    console.log(`Content provenance OK — ${routes.size} routes tracked, all published dates match their copy.`);
    return;
  }

  if (ledger.problems.length) {
    console.error('CONTENT PROVENANCE FAILED\n');
    for (const problem of ledger.problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  // Only trust routes are written back into the hand-authored metadata file. A
  // guide's lastmod is carried in the state file and re-emitted into the
  // generated route module by the guide build below, so no automation ever
  // rewrites content/guides/*.md.
  let nextMetadata = metadataSource;
  for (const [routePath, entry] of Object.entries(nextRoutes)) {
    if (routes.get(routePath).kind !== 'trust') continue;
    if (routes.get(routePath).declared !== entry.content_updated_at) {
      nextMetadata = writeLastmod(nextMetadata, routePath, entry.content_updated_at);
    }
  }

  const nextState = {
    ...state,
    generated_by: emptyState().generated_by,
    note: emptyState().note,
    routes: nextRoutes,
    guide_publication: Object.fromEntries(Object.keys(ledger.next).sort().map((key) => [key, ledger.next[key]]))
  };

  if (DRY_RUN) {
    console.log('[dry-run] no files written');
  } else {
    await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
    await fs.writeFile(STATE_PATH, `${JSON.stringify(nextState, null, 2)}\n`, 'utf8');
    if (nextMetadata !== metadataSource) await fs.writeFile(ROUTE_METADATA_PATH, nextMetadata, 'utf8');
    // The guide module's lastmod values come from the state just written, so
    // regenerate them here rather than leaving the outputs stale until someone
    // remembers to run the guide build.
    const rebuild = await buildGuideOutputs({ write: true });
    if (rebuild.problems.length) {
      console.error('CONTENT PROVENANCE FAILED: the guide rebuild did not validate\n');
      for (const problem of rebuild.problems) console.error(`  - ${problem}`);
      process.exit(1);
    }
  }

  console.log(`Content provenance — ${routes.size} routes tracked (today: ${TODAY})`);
  if (seeded.length) {
    console.log(`\n  Seeded ${seeded.length} route(s) at their already-published date (no date moved):`);
    for (const s of seeded) console.log(`    ${s.date}  ${s.routePath}`);
  }
  if (changed.length) {
    console.log(`\n  Copy changed — date advanced on ${changed.length} route(s):`);
    for (const c of changed) console.log(`    ${c.from} -> ${c.to}  ${c.routePath}`);
  }
  if (removed.length) {
    console.log(`\n  Dropped ${removed.length} route(s) no longer in route metadata:`);
    for (const r of removed) console.log(`    ${r}`);
  }
  if (!seeded.length && !changed.length && !removed.length) {
    console.log(`  No copy changes — ${unchanged.length} route(s) keep their published date.`);
  }
}

async function selfTest() {
  const failures = [];
  const assert = (label, condition) => {
    if (!condition) failures.push(label);
  };

  // extractBlock balances braces through template literals containing ${...}.
  const sample = 'if (x) {\n  return `a${ {b: 1} }c`;\n}\ntrailing';
  assert('extractBlock balances braces', extractBlock(sample, 'if (x) {') === 'if (x) {\n  return `a${ {b: 1} }c`;\n}');
  assert('extractBlock misses cleanly', extractBlock(sample, 'if (y) {') === null);

  // A parameter list with object defaults must not be mistaken for the body.
  const withDefaults = 'function f(a, b = {}, c = {}) {\n  return 1;\n}\n';
  assert('extractFunction skips object defaults in params', extractFunction(withDefaults, 'f') === 'function f(a, b = {}, c = {}) {\n  return 1;\n}');
  assert('extractFunction misses cleanly', extractFunction(withDefaults, 'g') === null);

  // Provenance fields must not reach the fingerprint.
  const meta = '  "/x": {\n    title: "T",\n    datePublished: "2026-01-01",\n    lastmod: "2026-01-02"\n  },';
  const entry = extractMetadataEntry(meta, '/x');
  assert('metadata fingerprint keeps title', entry.includes('title: "T"'));
  assert('metadata fingerprint drops lastmod', !entry.includes('lastmod'));
  assert('metadata fingerprint drops datePublished', !entry.includes('datePublished'));

  // A link re-check must not look like a copy edit — this is the property that
  // keeps the daily source checker from bumping every guide's Updated date.
  const before = { sections: [{ content: 'a' }], sources: [{ url: 'u', lastChecked: '2026-01-01' }] };
  const after = { sections: [{ content: 'a' }], sources: [{ url: 'u', lastChecked: '2026-06-06', linkCheckedAt: '2026-06-06' }] };
  assert('link re-check is not a copy change', guideContentFingerprint(before) === guideContentFingerprint(after));

  const edited = { sections: [{ content: 'b' }], sources: [{ url: 'u', lastChecked: '2026-01-01' }] };
  assert('prose edit is a copy change', guideContentFingerprint(before) !== guideContentFingerprint(edited));

  // writeLastmod is scoped to one route.
  const two = '  "/a": {\n    lastmod: "2026-01-01"\n  },\n  "/b": {\n    lastmod: "2026-01-01"\n  },';
  const written = writeLastmod(two, '/b', '2026-09-09');
  assert('writeLastmod updates the target', written.includes('"/b": {\n    lastmod: "2026-09-09"'));
  assert('writeLastmod leaves siblings alone', written.includes('"/a": {\n    lastmod: "2026-01-01"'));

  // --- normalisation: source noise must not read as a copy change -----------
  const withComment = 'return `<p>Hello</p>`;';
  const withCommentAdded = '// explain the thing\nreturn  `<p>Hello</p>`;\n';
  assert(
    'a added comment and reflow do not change the fingerprint',
    normalizeRenderSource(withComment) === normalizeRenderSource(withCommentAdded)
  );
  assert(
    'a word change does change the fingerprint',
    normalizeRenderSource(withComment) !== normalizeRenderSource('return `<p>Goodbye</p>`;')
  );
  // A URL inside copy must survive: its `//` must not be treated as a comment.
  assert(
    'a // inside a code line is preserved',
    normalizeRenderSource('const u = "https://example.com/x";').includes('https://example.com/x')
  );

  // --- transitive dependency collection --------------------------------------
  const graph = 'function a() {\n  return b() + C;\n}\nfunction b() {\n  return D;\n}\nconst C = "see";\nconst D = "deep";\n';
  const graphIndex = buildDeclarationIndex(graph);
  assert('declaration index finds functions and constants', graphIndex.has('a') && graphIndex.has('b') && graphIndex.has('C') && graphIndex.has('D'));
  const closure = collectCopyDependencies(graphIndex, 'return a();').join('\n');
  assert('closure reaches a direct call', closure.includes('function a()'));
  assert('closure reaches a transitive call', closure.includes('function b()'));
  assert('closure reaches a constant read by a transitive call', closure.includes('const D = "deep"'));
  assert('closure is order-independent', collectCopyDependencies(graphIndex, 'return a();').join('\n') === closure);
  assert('extractConstant captures the whole value', extractConstant('const X = [1, [2, 3]];\nnext();', 'X') === 'const X = [1, [2, 3]];');

  // A new route with no lastmod must be onboarded, not rejected.
  const fresh = '  "/new": {\n    title: "T"\n  },';
  const onboarded = writeLastmod(fresh, '/new', '2026-08-03');
  assert('writeLastmod inserts a missing field', onboarded.includes('lastmod: "2026-08-03"'));
  assert('writeLastmod keeps the entry valid', onboarded.includes('title: "T",'));
  assert('writeLastmod is then idempotent', writeLastmod(onboarded, '/new', '2026-08-03') === onboarded);

  // $-substitution patterns in surrounding copy must survive untouched. A
  // String.replace with a string replacement would mangle these.
  const dollars = '  "/c": {\n    title: "Save $& now $\' and $$ and $1",\n    lastmod: "2026-01-01"\n  },';
  const dollarsOut = writeLastmod(dollars, '/c', '2026-09-09');
  assert('writeLastmod does not interpret $ patterns', dollarsOut.includes('title: "Save $& now $\' and $$ and $1"'));
  assert('writeLastmod still updates alongside $ patterns', dollarsOut.includes('lastmod: "2026-09-09"'));

  // Every real route must resolve to real copy.
  const { routes } = await buildFingerprints();
  assert('all routes fingerprinted', [...routes.values()].every((r) => /^[0-9a-f]{16}$/.test(r.hash)));
  // Against the real router: the /guides page renders its cluster headings and
  // introductions out of GUIDE_CLUSTERS via renderGuideClusters() and
  // guideCardHtml(). A one-level helper list missed both, so editing a cluster
  // intro left the page's published date frozen.
  const routerSource = await fs.readFile(ROUTER_PATH, 'utf8');
  const realIndex = buildDeclarationIndex(routerSource);
  const guidesBlock = extractBlock(extractFunction(routerSource, RENDER_CONTAINER), RENDER_SPECS['/guides'].block);
  const guidesClosure = collectCopyDependencies(realIndex, guidesBlock).join('\n');
  assert('/guides reaches GUIDE_CLUSTERS transitively', guidesClosure.includes('const GUIDE_CLUSTERS'));
  assert('/guides reaches guideCardHtml transitively', guidesClosure.includes('function guideCardHtml'));
  // Bounded: a closure that swallowed the whole router would make every route's
  // date sensitive to unrelated code.
  assert(
    'closures stay well under the whole file',
    [...routes.values()].filter((r) => r.kind === 'trust').every((r) => r.dependencyCount < realIndex.size / 2)
  );
  assert('fingerprints are distinct', new Set([...routes.values()].map((r) => r.hash)).size === routes.size);
  assert('guides and trust routes both tracked', [...routes.values()].some((r) => r.kind === 'guide') && [...routes.values()].some((r) => r.kind === 'trust'));

  if (failures.length) {
    console.error('SELF-TEST FAILED:');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`sync-content-provenance self-test passed (${routes.size} routes fingerprinted).`);
}

// Run only when executed directly. Importing this module — to reuse one of its
// exported helpers, or from a test — must not write files or hit the network.
// scripts/indexnow-ping.mjs lacks this guard, and reading one of its functions
// during development fired a real IndexNow submission.
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  if (SELF_TEST) await selfTest();
  else await run();
}
