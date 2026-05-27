#!/usr/bin/env node
/**
 * validate-provider-allowlists.mjs
 *
 * Read-only cross-source consistency check for provider host allowlists.
 *
 * Sources compared:
 *   1. functions/api/out.js         PROVIDERS.*.allowedDestinationHosts / trustedAffiliateHosts
 *   2. public/data/catalog.json     providers[].allowed_destination_hosts / trusted_affiliate_hosts
 *   3. scripts/validate-events.py   PROVIDER_URL_HOSTS
 *
 * Exit codes:
 *   0  PASS / WARNs only — all public-enabled providers agree; non-public
 *      providers may have explainable gaps.
 *   1  FAIL — at least one public-enabled provider has disagreeing allowlists.
 *
 * Hard constraints honoured:
 *   - No external network calls.
 *   - No imports of runtime code (text-only file parsing).
 *   - Does not change provider state, CTA behaviour, or affiliate logic.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ─── Key normalisation ─────────────────────────────────────────────────────────
// validate-events.py uses "vividseats"; canonical slug in catalog/out.js is "vivid-seats"
const KEY_ALIASES = { vividseats: 'vivid-seats', vivid_seats: 'vivid-seats' };
const normalizeKey = k => KEY_ALIASES[k] ?? k;

// ─── Generic text-parsing helpers ──────────────────────────────────────────────

/**
 * Find markerText in text, then extract the balanced {...} block that follows it.
 * Returns the full matched string including outer braces, or null if not found.
 */
function extractBalancedBlock(text, markerText) {
  const markerPos = text.indexOf(markerText);
  if (markerPos === -1) return null;
  const start = text.indexOf('{', markerPos + markerText.length);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      if (--depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Given a text and the index of an opening '{', extract the inner content
 * (without braces) and return the index just after the closing '}'.
 */
function extractBlockAt(text, bracePos) {
  let depth = 0, closeIdx = -1;
  for (let i = bracePos; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      if (--depth === 0) { closeIdx = i; break; }
    }
  }
  if (closeIdx === -1) return null;
  return { inner: text.slice(bracePos + 1, closeIdx), end: closeIdx + 1 };
}

/**
 * Extract all single- or double-quoted string literals from text.
 * Returns an array of the captured values.
 */
function parseQuotedStrings(text) {
  return [...text.matchAll(/["']([^"'\r\n]+)["']/g)].map(m => m[1]);
}

// ─── Source 1: functions/api/out.js ────────────────────────────────────────────

/**
 * Parse the PROVIDERS constant.
 * Returns { [providerSlug]: { allowedHosts: string[], affiliateHosts: string[] } }
 */
function parseOutJs() {
  const text = readFileSync(resolve(ROOT, 'functions/api/out.js'), 'utf8');
  const outer = extractBalancedBlock(text, 'const PROVIDERS =');
  if (!outer) throw new Error('PROVIDERS block not found in functions/api/out.js');
  const inner = outer.slice(1, -1);

  const providers = {};
  // Match top-level provider entries: optionally-quoted-key : {
  const keyRe = /["']?([\w-]+)["']?\s*:\s*\{/g;
  let m;

  while ((m = keyRe.exec(inner)) !== null) {
    const key = m[1];
    const bracePos = m.index + m[0].length - 1; // index of the '{' in inner
    const block = extractBlockAt(inner, bracePos);
    if (!block) continue;

    const hostsM = block.inner.match(/allowedDestinationHosts\s*:\s*\[([\s\S]*?)\]/);
    const affM   = block.inner.match(/trustedAffiliateHosts\s*:\s*\[([\s\S]*?)\]/);

    providers[normalizeKey(key)] = {
      allowedHosts:   hostsM ? parseQuotedStrings(hostsM[1]) : [],
      affiliateHosts: affM   ? parseQuotedStrings(affM[1])   : [],
    };
    keyRe.lastIndex = block.end;
  }

  return providers;
}

// ─── Source 2: public/data/catalog.json ────────────────────────────────────────

/**
 * Parse provider records.
 * Returns { [slug]: { allowedHosts: string[], affiliateHosts: string[], publicEnabled: boolean } }
 */
function parseCatalog() {
  const data = JSON.parse(readFileSync(resolve(ROOT, 'public/data/catalog.json'), 'utf8'));
  const providers = {};
  for (const p of (data.providers ?? [])) {
    providers[normalizeKey(p.slug)] = {
      allowedHosts:   p.allowed_destination_hosts ?? [],
      affiliateHosts: p.trusted_affiliate_hosts   ?? [],
      publicEnabled:  Boolean(p.public_enabled),
    };
  }
  return providers;
}

// ─── Source 3: scripts/validate-events.py ──────────────────────────────────────

/**
 * Parse PROVIDER_URL_HOSTS (a Python dict of sets).
 * Returns { [providerSlug]: { allowedHosts: string[] } }
 */
function parsePython() {
  const text = readFileSync(resolve(ROOT, 'scripts/validate-events.py'), 'utf8');
  const outer = extractBalancedBlock(text, 'PROVIDER_URL_HOSTS =');
  if (!outer) throw new Error('PROVIDER_URL_HOSTS block not found in scripts/validate-events.py');
  const inner = outer.slice(1, -1);

  const providers = {};
  // Python dict keys are always quoted
  const keyRe = /["']([\w-]+)["']\s*:\s*\{/g;
  let m;

  while ((m = keyRe.exec(inner)) !== null) {
    const key = m[1];
    const bracePos = m.index + m[0].length - 1;
    const block = extractBlockAt(inner, bracePos);
    if (!block) continue;

    providers[normalizeKey(key)] = {
      allowedHosts: parseQuotedStrings(block.inner),
    };
    keyRe.lastIndex = block.end;
  }

  return providers;
}

// ─── Comparison logic ───────────────────────────────────────────────────────────

const PASS = 'PASS', WARN = 'WARN', FAIL = 'FAIL';

function setOf(arr)       { return new Set(arr ?? []); }
function setMinus(a, b)   { return [...a].filter(v => !b.has(v)); }
function setsEqual(a, b)  {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}
// out.js hostnameAllowed() matches subdomains, so "www.foo.com" is implicitly
// covered when "foo.com" is listed. Flag these separately so they don't mask
// real discrepancies.
const isWwwVariant = h => h.startsWith('www.');

/**
 * Compare host allowlists for a single provider across all three sources.
 * Returns { severity, issues, publicEnabled }.
 */
function compareProvider(slug, outJs, catalog, python) {
  const issues = [];
  let severity = PASS;
  const publicEnabled = catalog?.publicEnabled ?? false;

  function raise(level, msg) {
    if (level === FAIL && severity !== FAIL) severity = FAIL;
    else if (level === WARN && severity === PASS) severity = WARN;
    issues.push({ level, msg });
  }

  const outAllowed = outJs   ? setOf(outJs.allowedHosts)   : null;
  const catAllowed = catalog ? setOf(catalog.allowedHosts)  : null;
  const pyAllowed  = python  ? setOf(python.allowedHosts)   : null;

  // ── Presence checks ──────────────────────────────────────────────────────────
  if (!outJs && (catalog || python)) {
    raise(WARN, 'Not in out.js PROVIDERS (expected for providers not yet wired into /api/out)');
  }
  if (!python && (outJs || catalog)) {
    raise(WARN, 'Not in validate-events.py PROVIDER_URL_HOSTS');
  }

  // ── out.js vs catalog (primary safety-gate comparison) ──────────────────────
  if (outAllowed && catAllowed && !setsEqual(outAllowed, catAllowed)) {
    const level = publicEnabled ? FAIL : WARN;
    const onlyOut = setMinus(outAllowed, catAllowed);
    const onlyCat = setMinus(catAllowed, outAllowed);
    if (onlyOut.length) raise(level, `out.js only (vs catalog.json): ${onlyOut.join(', ')}`);
    if (onlyCat.length) raise(level, `catalog.json only (vs out.js): ${onlyCat.join(', ')}`);
  }

  // ── out.js vs validate-events.py ────────────────────────────────────────────
  if (outAllowed && pyAllowed && !setsEqual(outAllowed, pyAllowed)) {
    const level = publicEnabled ? FAIL : WARN;
    const onlyOut = setMinus(outAllowed, pyAllowed);
    const onlyPy  = setMinus(pyAllowed,  outAllowed);
    const wwwOnly = onlyPy.filter(isWwwVariant);
    const other   = onlyPy.filter(h => !isWwwVariant(h));
    if (onlyOut.length) raise(level, `out.js only (vs validate-events.py): ${onlyOut.join(', ')}`);
    if (other.length)   raise(level, `validate-events.py only (vs out.js): ${other.join(', ')}`);
    if (wwwOnly.length) raise(WARN,  `validate-events.py lists www. variants implicitly covered by out.js subdomain matching: ${wwwOnly.join(', ')}`);
  }

  // ── catalog vs validate-events.py ───────────────────────────────────────────
  if (catAllowed && pyAllowed && !setsEqual(catAllowed, pyAllowed)) {
    const level = publicEnabled ? FAIL : WARN;
    const onlyCat = setMinus(catAllowed, pyAllowed);
    const onlyPy  = setMinus(pyAllowed,  catAllowed);
    const wwwOnly = onlyPy.filter(isWwwVariant);
    const other   = onlyPy.filter(h => !isWwwVariant(h));
    if (onlyCat.length) raise(WARN,  `catalog.json only (vs validate-events.py): ${onlyCat.join(', ')}`);
    if (other.length)   raise(level, `validate-events.py only (vs catalog.json): ${other.join(', ')}`);
    if (wwwOnly.length) raise(WARN,  `validate-events.py lists www. variants not in catalog.json (covered by out.js subdomain matching): ${wwwOnly.join(', ')}`);
  }

  // ── Affiliate host comparison (out.js vs catalog, informational) ─────────────
  if (outJs && catalog) {
    const outAff = setOf(outJs.affiliateHosts);
    const catAff = setOf(catalog.affiliateHosts);
    if (!setsEqual(outAff, catAff)) {
      const onlyOut = setMinus(outAff, catAff);
      const onlyCat = setMinus(catAff, outAff);
      if (onlyOut.length) raise(WARN, `trustedAffiliateHosts in out.js not in catalog.json trusted_affiliate_hosts: ${onlyOut.join(', ')}`);
      if (onlyCat.length) raise(WARN, `trusted_affiliate_hosts in catalog.json not in out.js trustedAffiliateHosts: ${onlyCat.join(', ')}`);
    }
  }

  return { severity, issues, publicEnabled };
}

// ─── Main ───────────────────────────────────────────────────────────────────────

function main() {
  console.log('=== Provider Allowlist Consistency Check ===\n');

  let outJs, catalog, python;
  try { outJs   = parseOutJs();   } catch (e) { console.error(`FATAL: ${e.message}`); process.exit(1); }
  try { catalog = parseCatalog(); } catch (e) { console.error(`FATAL: ${e.message}`); process.exit(1); }
  try { python  = parsePython();  } catch (e) { console.error(`FATAL: ${e.message}`); process.exit(1); }

  const allSlugs = [...new Set([
    ...Object.keys(outJs),
    ...Object.keys(catalog),
    ...Object.keys(python),
  ])].sort();

  const results = allSlugs.map(slug => ({
    slug,
    ...compareProvider(slug, outJs[slug], catalog[slug], python[slug]),
  }));

  let hasFailure = false;
  for (const { slug, severity, issues, publicEnabled } of results) {
    const icon   = severity === PASS ? '✓' : severity === WARN ? '⚠' : '✗';
    const label  = severity.padEnd(4);
    const gating = publicEnabled ? '[public-enabled]' : '[gated]';
    console.log(`${icon} ${label}  ${slug}  ${gating}`);
    for (const { level, msg } of issues) {
      const prefix = level === FAIL ? '     ✗' : level === WARN ? '     ⚠' : '     ✓';
      console.log(`${prefix} ${msg}`);
    }
    if (issues.length) console.log();
    if (severity === FAIL) hasFailure = true;
  }

  const counts = results.reduce(
    (acc, r) => { acc[r.severity]++; return acc; },
    { PASS: 0, WARN: 0, FAIL: 0 },
  );

  console.log('=== Summary ===');
  console.log(`Providers checked: ${results.length}  |  PASS: ${counts.PASS}  WARN: ${counts.WARN}  FAIL: ${counts.FAIL}`);

  if (hasFailure) {
    console.error('\n✗ FAIL: one or more public-enabled providers have disagreeing host allowlists.');
    console.error('  Resolve the discrepancy before deploying.');
    process.exit(1);
  }

  if (counts.WARN > 0) {
    console.log('\n✓ All public-enabled providers pass. WARN items are for gated/future providers and do not block deploy.');
  } else {
    console.log('\n✓ All checks pass.');
  }
  process.exit(0);
}

main();
