#!/usr/bin/env node
/**
 * Guide source link checker.
 *
 * Every guide cites primary provider and regulator sources, and each citation
 * carries a `lastChecked` date that is rendered to visitors. That date is an
 * *editorial* claim — a person read the source and confirmed the guide still
 * describes it correctly — and nothing automated may touch it.
 *
 * What an automated job can honestly assert is narrower: that the cited URL
 * still resolves. This script establishes that and records it separately as
 * `linkCheckedAt`, which the guide renders as "link checked <date>" beside the
 * editorial "reviewed <date>". Two dates, two different claims, neither
 * pretending to be the other.
 *
 * Conservatism, mirroring scripts/bump-verified-dates.mjs:
 *   - Only a confirmed 2xx/3xx advances `linkCheckedAt`.
 *   - 401/403/429 is "blocked", not "dead". Anti-bot WAFs return these to
 *     datacenter IPs for URLs that are perfectly alive; we never loaded the
 *     page, so we record nothing.
 *   - 404/410/5xx and transport errors leave the date untouched and are
 *     reported for human follow-up. A broken citation is a content problem, not
 *     something to paper over with a fresh timestamp.
 *
 * The `lastChecked` / `linkCheckedAt` fields are excluded from the content
 * fingerprint in scripts/sync-content-provenance.mjs, so a nightly run here can
 * never bump a guide's published "Updated" date.
 *
 * USAGE
 *   node scripts/check-guide-source-links.mjs                  # check + write
 *   node scripts/check-guide-source-links.mjs --dry-run        # check only
 *   node scripts/check-guide-source-links.mjs --json out.json  # machine report
 *   node scripts/check-guide-source-links.mjs --self-test      # no network
 *   --today YYYY-MM-DD   --timeout <ms>   --concurrency <n>
 */

import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES_CONTENT_PATH = path.join(ROOT, 'public', 'data', 'guides-content.json');

const USER_AGENT =
  'Mozilla/5.0 (compatible; TourTicketCompareLinkCheck/1.0; +https://tourticketcompare.com/contact)';

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const option = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
};

const DRY_RUN = flag('--dry-run');
const SELF_TEST = flag('--self-test');
const JSON_OUT = option('--json');
const TODAY = option('--today') || new Date().toISOString().slice(0, 10);
const TIMEOUT_MS = Number(option('--timeout') || 15000);
const CONCURRENCY = Number(option('--concurrency') || 4);

/**
 * Classify an HTTP outcome into the only three verdicts that matter here.
 * Pure — the self-test exercises it without touching the network.
 */
export function classify(status, transportError) {
  if (transportError) return { verdict: 'error', detail: String(transportError) };
  if (status >= 200 && status < 400) return { verdict: 'ok', detail: String(status) };
  if (status === 401 || status === 403 || status === 429) return { verdict: 'blocked', detail: String(status) };
  return { verdict: 'failed', detail: String(status) };
}

/** Only an `ok` verdict may advance a stamped date. */
export function shouldStamp(verdict) {
  return verdict === 'ok';
}

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const request = (method) =>
    fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' }
    });
  try {
    // HEAD first (cheap); a surprising number of help centres reject it, so a
    // non-2xx HEAD is retried as GET before being believed.
    let response = await request('HEAD');
    if (!response.ok) response = await request('GET');
    return classify(response.status, null);
  } catch (error) {
    return classify(0, error?.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : error?.message || error);
  } finally {
    clearTimeout(timer);
  }
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

/**
 * Apply stamps to the guide content tree. Pure, so the self-test can prove that
 * a blocked or failed URL leaves the document untouched.
 */
export function applyStamps(guides, stampsByUrl, today) {
  let stamped = 0;
  for (const guide of Object.values(guides || {})) {
    for (const source of guide?.sources || []) {
      const verdict = stampsByUrl.get(source?.url);
      if (verdict && shouldStamp(verdict) && source.linkCheckedAt !== today) {
        source.linkCheckedAt = today;
        stamped += 1;
      }
    }
  }
  return stamped;
}

/**
 * Stamp the file as text rather than reserialising it.
 *
 * guides-content.json is hand-formatted and inconsistent about it: some
 * `sources` arrays put each citation on one compact line, others expand every
 * key. `JSON.stringify(..., 2)` normalises all of them, which would turn this
 * job's first nightly run into a 180-line reformat commit and bury the one-word
 * change it actually made. Editing in place keeps the diff to the lines that
 * gained a date, and leaves the author's chosen layout alone.
 *
 * Source objects never nest, so a brace-to-brace match delimits one exactly.
 */
export function applyStampsToText(raw, stampsByUrl, today) {
  let stamped = 0;

  // Only ever edit inside a `"sources": [ ... ]` array. A guide's `schema`
  // block is JSON-LD and can legitimately carry its own `url` key; without this
  // scope, a schema node whose url happened to match a cited source would have
  // had a linkCheckedAt field injected into the structured data.
  const stampSourcesArray = (arrayText) =>
    arrayText.replace(/\{[^{}]*"url"\s*:\s*"([^"]+)"[^{}]*\}/g, (objectText, url) => {
    const verdict = stampsByUrl.get(url);
    if (!verdict || !shouldStamp(verdict)) return objectText;

    const existing = objectText.match(/"linkCheckedAt"\s*:\s*"([^"]*)"/);
    if (existing) {
      if (existing[1] === today) return objectText;
      stamped += 1;
      return objectText.replace(/("linkCheckedAt"\s*:\s*)"[^"]*"/, `$1"${today}"`);
    }

    // Insert after `lastChecked` where present (keeps provenance fields
    // together), otherwise before the closing brace.
    const anchor = objectText.match(/(^|\n)(\s*)"lastChecked"\s*:\s*"[^"]*"/);
    stamped += 1;
    if (anchor) {
      const indent = anchor[2];
      const multiline = anchor[1] === "\n";
      const insertion = multiline ? `,\n${indent}"linkCheckedAt": "${today}"` : `, "linkCheckedAt": "${today}"`;
      return objectText.replace(/("lastChecked"\s*:\s*"[^"]*")/, `$1${insertion}`);
    }
    const multiline = objectText.includes("\n");
    const indentMatch = objectText.match(/\n(\s*)"[^"]+"\s*:/);
    const indent = indentMatch ? indentMatch[1] : "  ";
    return objectText.replace(/\s*\}$/, multiline ? `,\n${indent}"linkCheckedAt": "${today}"\n${indent.slice(2)}}` : `, "linkCheckedAt": "${today}" }`);
    });

  // Walk each `"sources": [` to its balanced `]` and stamp only within it.
  // Source arrays contain no nested arrays, so a depth counter is sufficient.
  let text = '';
  let cursor = 0;
  const opener = /"sources"\s*:\s*\[/g;
  let match;
  while ((match = opener.exec(raw)) !== null) {
    const arrayStart = match.index + match[0].length - 1;
    let depth = 0;
    let arrayEnd = -1;
    for (let i = arrayStart; i < raw.length; i += 1) {
      if (raw[i] === '[') depth += 1;
      else if (raw[i] === ']') {
        depth -= 1;
        if (depth === 0) {
          arrayEnd = i + 1;
          break;
        }
      }
    }
    if (arrayEnd < 0) break;
    text += raw.slice(cursor, arrayStart) + stampSourcesArray(raw.slice(arrayStart, arrayEnd));
    cursor = arrayEnd;
    opener.lastIndex = arrayEnd;
  }
  text += raw.slice(cursor);

  return { text, stamped };
}

async function run() {
  const raw = await fs.readFile(GUIDES_CONTENT_PATH, 'utf8');
  const guides = JSON.parse(raw);

  const urls = [...new Set(Object.values(guides).flatMap((g) => (g?.sources || []).map((s) => s?.url).filter(Boolean)))];
  console.log(`Checking ${urls.length} unique guide source URLs (timeout ${TIMEOUT_MS}ms, concurrency ${CONCURRENCY})`);

  const outcomes = await mapWithConcurrency(urls, CONCURRENCY, async (url) => ({ url, ...(await probe(url)) }));

  const byVerdict = { ok: [], blocked: [], failed: [], error: [] };
  for (const outcome of outcomes) byVerdict[outcome.verdict].push(outcome);

  const stampsByUrl = new Map(outcomes.map((o) => [o.url, o.verdict]));
  const { text: stampedText, stamped } = applyStampsToText(raw, stampsByUrl, TODAY);

  console.log(
    `  ok ${byVerdict.ok.length} · blocked ${byVerdict.blocked.length} · failed ${byVerdict.failed.length} · error ${byVerdict.error.length}`
  );
  for (const outcome of [...byVerdict.failed, ...byVerdict.error]) {
    console.log(`  NEEDS REVIEW  [${outcome.detail}] ${outcome.url}`);
  }
  for (const outcome of byVerdict.blocked) {
    console.log(`  blocked (not stamped, not a failure)  [${outcome.detail}] ${outcome.url}`);
  }
  console.log(`  ${stamped} citation${stamped === 1 ? '' : 's'} stamped linkCheckedAt=${TODAY}`);

  const report = {
    generated_at: new Date().toISOString(),
    today: TODAY,
    checked: urls.length,
    stamped,
    ok: byVerdict.ok.map((o) => o.url),
    blocked: byVerdict.blocked.map((o) => ({ url: o.url, detail: o.detail })),
    needs_review: [...byVerdict.failed, ...byVerdict.error].map((o) => ({ url: o.url, detail: o.detail }))
  };
  if (JSON_OUT) {
    await fs.mkdir(path.dirname(path.resolve(JSON_OUT)), { recursive: true });
    await fs.writeFile(path.resolve(JSON_OUT), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  }

  if (DRY_RUN) {
    console.log('[dry-run] guides-content.json not written');
    return;
  }
  if (stamped) {
    // Parse before writing: text surgery must never be able to emit invalid
    // JSON into a file the site reads at request time.
    JSON.parse(stampedText);
    await fs.writeFile(GUIDES_CONTENT_PATH, stampedText, 'utf8');
  }
}

function selfTest() {
  const failures = [];
  const assert = (label, condition) => {
    if (!condition) failures.push(label);
  };

  assert('200 is ok', classify(200, null).verdict === 'ok');
  assert('301 is ok', classify(301, null).verdict === 'ok');
  assert('403 is blocked, not failed', classify(403, null).verdict === 'blocked');
  assert('429 is blocked, not failed', classify(429, null).verdict === 'blocked');
  assert('404 is failed', classify(404, null).verdict === 'failed');
  assert('500 is failed', classify(500, null).verdict === 'failed');
  assert('transport error is error', classify(0, 'ECONNRESET').verdict === 'error');

  assert('only ok stamps', shouldStamp('ok') && !shouldStamp('blocked') && !shouldStamp('failed') && !shouldStamp('error'));

  // A blocked or dead source must leave the document untouched.
  const doc = { '/g': { sources: [{ url: 'a', lastChecked: '2026-01-01' }, { url: 'b', lastChecked: '2026-01-01' }] } };
  const before = JSON.stringify(doc);
  applyStamps(doc, new Map([['a', 'blocked'], ['b', 'failed']]), '2026-08-03');
  assert('blocked/failed sources are not stamped', JSON.stringify(doc) === before);

  const stamped = applyStamps(doc, new Map([['a', 'ok']]), '2026-08-03');
  assert('ok source is stamped', stamped === 1 && doc['/g'].sources[0].linkCheckedAt === '2026-08-03');
  assert('editorial lastChecked is never touched', doc['/g'].sources[0].lastChecked === '2026-01-01');
  assert('unchecked sibling untouched', doc['/g'].sources[1].linkCheckedAt === undefined);

  assert('stamping is idempotent', applyStamps(doc, new Map([['a', 'ok']]), '2026-08-03') === 0);

  // A url outside a sources array — a JSON-LD node, say — must never be stamped.
  const withSchema =
    '{\n  "/g": {\n    "schema": { "@type": "Article", "url": "u1" },\n    "sources": [\n      { "name": "N", "url": "u1", "lastChecked": "2026-01-01" }\n    ]\n  }\n}\n';
  const schemaOut = applyStampsToText(withSchema, new Map([['u1', 'ok']]), '2026-08-03');
  assert('schema node with a matching url is not stamped', schemaOut.text.includes('"schema": { "@type": "Article", "url": "u1" }'));
  assert('the real citation is still stamped', schemaOut.stamped === 1 && schemaOut.text.includes('"lastChecked": "2026-01-01", "linkCheckedAt": "2026-08-03"'));

  // --- text writer: preserves each citation's existing layout ---------------
  const compact = '{\n  "/g": {\n    "sources": [\n      { "name": "N", "url": "u1", "lastChecked": "2026-01-01" }\n    ]\n  }\n}\n';
  const compactOut = applyStampsToText(compact, new Map([['u1', 'ok']]), '2026-08-03');
  assert('compact citation stays on one line', compactOut.text.includes('{ "name": "N", "url": "u1", "lastChecked": "2026-01-01", "linkCheckedAt": "2026-08-03" }'));
  assert('compact stamp counted', compactOut.stamped === 1);
  assert('compact output is valid JSON', (() => { try { JSON.parse(compactOut.text); return true; } catch { return false; } })());

  const expanded = '{\n  "/g": {\n    "sources": [\n      {\n        "name": "N",\n        "url": "u1",\n        "lastChecked": "2026-01-01"\n      }\n    ]\n  }\n}\n';
  const expandedOut = applyStampsToText(expanded, new Map([['u1', 'ok']]), '2026-08-03');
  assert('expanded citation stays expanded', expandedOut.text.includes('        "lastChecked": "2026-01-01",\n        "linkCheckedAt": "2026-08-03"'));
  assert('expanded output is valid JSON', (() => { try { JSON.parse(expandedOut.text); return true; } catch { return false; } })());

  // The property that keeps nightly runs quiet: nothing else in the file moves.
  const untouched = applyStampsToText(expanded, new Map([['u1', 'blocked']]), '2026-08-03');
  assert('blocked leaves the file byte-identical', untouched.text === expanded && untouched.stamped === 0);

  const rerun = applyStampsToText(expandedOut.text, new Map([['u1', 'ok']]), '2026-08-03');
  assert('text stamping is idempotent', rerun.text === expandedOut.text && rerun.stamped === 0);

  const nextDay = applyStampsToText(expandedOut.text, new Map([['u1', 'ok']]), '2026-08-04');
  assert('existing stamp is updated in place', nextDay.text.includes('"linkCheckedAt": "2026-08-04"') && nextDay.stamped === 1);
  assert('editorial lastChecked survives a re-stamp', nextDay.text.includes('"lastChecked": "2026-01-01"'));

  // Against the real file: the invariant that matters is that text surgery
  // changes the document in exactly one respect and no other. Stamp every
  // citation, then prove the parsed tree is identical once linkCheckedAt is
  // removed from both sides — no reordering, no dropped key, no mangled prose.
  const realRaw = fsSync.readFileSync(GUIDES_CONTENT_PATH, 'utf8');
  const realUrls = [...realRaw.matchAll(/"url"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  const realOut = applyStampsToText(realRaw, new Map(realUrls.map((u) => [u, 'ok'])), '2999-01-01');
  let realParsed = null;
  try { realParsed = JSON.parse(realOut.text); } catch { /* reported below */ }
  assert('real file stays valid JSON after stamping', realParsed !== null);

  const withoutStamps = (value) =>
    JSON.stringify(value, (key, inner) => (key === 'linkCheckedAt' ? undefined : inner));
  assert(
    'stamping the real file changes nothing but linkCheckedAt',
    realParsed !== null && withoutStamps(realParsed) === withoutStamps(JSON.parse(realRaw))
  );
  assert(
    'every real citation received the stamp',
    realParsed !== null &&
      Object.values(realParsed).flatMap((g) => g.sources || []).every((s) => s.linkCheckedAt === '2999-01-01')
  );

  if (failures.length) {
    console.error('SELF-TEST FAILED:');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log('check-guide-source-links self-test passed.');
}

if (SELF_TEST) {
  selfTest();
} else {
  await run();
}
