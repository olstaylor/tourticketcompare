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
 *                URLs, schema).
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
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTE_METADATA_PATH = path.join(ROOT, 'functions', '_route-metadata.js');
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
 * extractor takes it to its matching close. `also` names shared helpers whose
 * source is part of that page's visible copy even though it lives elsewhere.
 *
 * Every entry must match, and an unmatched spec is a hard error rather than an
 * empty hash — silently fingerprinting nothing would freeze a page's date
 * forever, which is the failure mode this whole script is guarding against.
 */
const RENDER_SPECS = {
  '/': { tail: 'return `<main id="mainContent"><div id="ttc-main">' },
  '/compare-concert-ticket-prices': {
    block: 'if (route.type === "comparison-hub") {',
    also: ['comparisonHubFaqEntries']
  },
  '/artists': { block: 'if (route.path === "/artists") {' },
  '/guides': { block: 'if (route.path === "/guides") {', also: ['renderGuideClusters'] },
  '/how-it-works': { block: 'if (route.path === "/how-it-works") {', also: ['faqSchema'] },
  '/currency-converter': { block: 'if (route.path === "/currency-converter") {' },
  '/affiliate-disclosure': { block: 'if (route.path === "/affiliate-disclosure") {' },
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
  if (!/lastmod:\s*"[\d-]*"/.test(entry)) {
    throw new Error(`cannot write lastmod: route ${routePath} has no lastmod field to update`);
  }
  const updated = entry.replace(/lastmod:\s*"[\d-]*"/, () => `lastmod: "${value}"`);
  // Splice by index, not String.replace: a string replacement argument
  // interprets $&, $`, $', $$ and $n, so a route whose title or description
  // ever contained one of those would be silently corrupted — in a protected
  // file where a syntax error breaks every HTML route. The callback form above
  // is safe for the same reason.
  const at = source.indexOf(entry);
  return source.slice(0, at) + updated + source.slice(at + entry.length);
}

async function buildFingerprints() {
  const [metadataSource, routerSource, guidesContent] = await Promise.all([
    fs.readFile(ROUTE_METADATA_PATH, 'utf8'),
    fs.readFile(ROUTER_PATH, 'utf8'),
    readJson(GUIDES_CONTENT_PATH, {})
  ]);

  const guides = parseRouteObject(metadataSource, 'GUIDE_ROUTES');
  const trust = parseRouteObject(metadataSource, 'TRUST_ROUTES');
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
      hash: hash(`${metadata} ${content}`),
      declared: declaredLastmod(guides.block, routePath)
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
    const helpers = (spec.also || []).map((name) => {
      const fn = extractFunction(routerSource, name);
      if (!fn) fail(`trust route ${routePath}: shared copy helper ${name}() not found in functions/[[path]].js`);
      return fn;
    });
    routes.set(routePath, {
      kind: 'trust',
      hash: hash([metadata, body, ...helpers].join(' ')),
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
    routes: {}
  };
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

  if (CHECK_MODE) {
    const problems = [];
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

  let nextMetadata = metadataSource;
  for (const [routePath, entry] of Object.entries(nextRoutes)) {
    if (routes.get(routePath).declared !== entry.content_updated_at) {
      nextMetadata = writeLastmod(nextMetadata, routePath, entry.content_updated_at);
    }
  }

  const nextState = { ...state, generated_by: emptyState().generated_by, note: emptyState().note, routes: nextRoutes };

  if (DRY_RUN) {
    console.log('[dry-run] no files written');
  } else {
    await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
    await fs.writeFile(STATE_PATH, `${JSON.stringify(nextState, null, 2)}\n`, 'utf8');
    if (nextMetadata !== metadataSource) await fs.writeFile(ROUTE_METADATA_PATH, nextMetadata, 'utf8');
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

  // $-substitution patterns in surrounding copy must survive untouched. A
  // String.replace with a string replacement would mangle these.
  const dollars = '  "/c": {\n    title: "Save $& now $\' and $$ and $1",\n    lastmod: "2026-01-01"\n  },';
  const dollarsOut = writeLastmod(dollars, '/c', '2026-09-09');
  assert('writeLastmod does not interpret $ patterns', dollarsOut.includes('title: "Save $& now $\' and $$ and $1"'));
  assert('writeLastmod still updates alongside $ patterns', dollarsOut.includes('lastmod: "2026-09-09"'));

  // Every real route must resolve to real copy.
  const { routes } = await buildFingerprints();
  assert('all routes fingerprinted', [...routes.values()].every((r) => /^[0-9a-f]{16}$/.test(r.hash)));
  assert('fingerprints are distinct', new Set([...routes.values()].map((r) => r.hash)).size === routes.size);
  assert('guides and trust routes both tracked', [...routes.values()].some((r) => r.kind === 'guide') && [...routes.values()].some((r) => r.kind === 'trust'));

  if (failures.length) {
    console.error('SELF-TEST FAILED:');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`sync-content-provenance self-test passed (${routes.size} routes fingerprinted).`);
}

if (SELF_TEST) {
  await selfTest();
} else {
  await run();
}
