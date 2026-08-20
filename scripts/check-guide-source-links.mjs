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

import { buildGuideOutputs } from './build-guide-content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIDES_CONTENT_PATH = path.join(ROOT, 'public', 'data', 'guides-content.json');
const LINK_CHECKS_PATH = path.join(ROOT, 'data', 'guide-source-link-checks.json');
const SIDECAR_NOTE =
  'Machine-owned. Records only that a cited URL still resolved, never that a human re-read it — the ' +
  'editorial claim is `last_checked` in content/guides/*.md. Do not hand-edit.';

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
// Apply stamps from a report a previous run produced, without re-probing.
// The daily audit probes in its first job — where the report is uploaded as an
// artefact and folded into the rolling issue — and stamps in the second, so
// findings are actually delivered rather than left in transient step logs.
const FROM_REPORT = option('--from-report');
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
 * Every citation in the compiled guides, as (slug, url) pairs.
 *
 * Keyed by guide as well as URL because two guides may cite the same source and
 * be checked on different days: a URL-only record would back-date one of them,
 * or silently assert a check that never happened for that citation.
 */
export function citationsFrom(guides) {
  const citations = [];
  for (const [routePath, guide] of Object.entries(guides || {})) {
    const slug = String(routePath).replace(/^\/guides\//, '');
    for (const source of guide?.sources || []) {
      if (source?.url) citations.push({ slug, url: source.url });
    }
  }
  return citations;
}

/**
 * Record confirmed checks in the machine-owned sidecar.
 *
 * The sidecar — data/guide-source-link-checks.json — is the only thing this
 * script writes. It does NOT edit content/guides/*.md (that is human-authored;
 * a bot commit there would race an editor's save and would be asserting a
 * review no one performed) and it does NOT edit the generated
 * public/data/guides-content.json directly (that would leave the generated file
 * ahead of its source). The guide build merges the sidecar back in.
 *
 * Pure, so the self-test can prove a blocked or failed URL changes nothing.
 */
export function applySidecarStamps(sidecar, citations, stampsByUrl, today) {
  const next = { ...sidecar, guides: { ...(sidecar?.guides || {}) } };
  let stamped = 0;
  for (const { slug, url } of citations) {
    const verdict = stampsByUrl.get(url);
    if (!verdict || !shouldStamp(verdict)) continue;
    const current = next.guides[slug]?.[url];
    if (current === today) continue;
    next.guides[slug] = { ...(next.guides[slug] || {}), [url]: today };
    stamped += 1;
  }
  // Drop records for citations that no longer exist, so a removed source does
  // not leave a stale date behind to be re-merged if the URL comes back.
  const live = new Map();
  for (const { slug, url } of citations) {
    if (!live.has(slug)) live.set(slug, new Set());
    live.get(slug).add(url);
  }
  const pruned = {};
  for (const slug of Object.keys(next.guides).sort()) {
    const keep = live.get(slug);
    if (!keep) continue;
    const urls = Object.keys(next.guides[slug]).filter((url) => keep.has(url)).sort();
    if (urls.length) pruned[slug] = Object.fromEntries(urls.map((url) => [url, next.guides[slug][url]]));
  }
  next.guides = pruned;
  return { next, stamped };
}

/** Rebuild per-URL verdicts from a stored report, so stamping needs no network. */
export function outcomesFromReport(report) {
  const outcomes = [];
  for (const url of report?.ok || []) outcomes.push({ url, verdict: 'ok', detail: 'from report' });
  for (const entry of report?.blocked || []) outcomes.push({ url: entry.url, verdict: 'blocked', detail: entry.detail });
  for (const entry of report?.needs_review || []) outcomes.push({ url: entry.url, verdict: 'failed', detail: entry.detail });
  return outcomes;
}

async function run() {
  const guides = JSON.parse(await fs.readFile(GUIDES_CONTENT_PATH, 'utf8'));
  const citations = citationsFrom(guides);
  let sidecar;
  try {
    sidecar = JSON.parse(await fs.readFile(LINK_CHECKS_PATH, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    sidecar = { generated_by: 'scripts/check-guide-source-links.mjs', note: SIDECAR_NOTE, guides: {} };
  }

  const urls = [...new Set(Object.values(guides).flatMap((g) => (g?.sources || []).map((s) => s?.url).filter(Boolean)))];

  let outcomes;
  if (FROM_REPORT) {
    const report = JSON.parse(await fs.readFile(path.resolve(FROM_REPORT), 'utf8'));
    outcomes = outcomesFromReport(report);
    console.log(`Applying ${outcomes.length} verdict(s) from ${FROM_REPORT} (no network)`);
  } else {
    console.log(`Checking ${urls.length} unique guide source URLs (timeout ${TIMEOUT_MS}ms, concurrency ${CONCURRENCY})`);
    outcomes = await mapWithConcurrency(urls, CONCURRENCY, async (url) => ({ url, ...(await probe(url)) }));
  }

  const byVerdict = { ok: [], blocked: [], failed: [], error: [] };
  for (const outcome of outcomes) byVerdict[outcome.verdict].push(outcome);

  const stampsByUrl = new Map(outcomes.map((o) => [o.url, o.verdict]));
  const { next: nextSidecar, stamped } = applySidecarStamps(sidecar, citations, stampsByUrl, TODAY);

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

  // Surface findings in the job summary as well as the report file, so a broken
  // citation is visible on the run page without downloading an artefact.
  if (process.env.GITHUB_STEP_SUMMARY && report.needs_review.length) {
    const lines = [
      '### Guide source links needing review',
      '',
      '| Source URL | Result |',
      '| --- | --- |',
      ...report.needs_review.map((entry) => `| ${entry.url} | ${entry.detail} |`),
      ''
    ];
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`, 'utf8');
  }

  if (DRY_RUN) {
    console.log('[dry-run] data/guide-source-link-checks.json not written');
    return;
  }
  const serialized = `${JSON.stringify(
    { generated_by: 'scripts/check-guide-source-links.mjs', note: SIDECAR_NOTE, guides: nextSidecar.guides },
    null,
    2
  )}\n`;
  const current = await fs.readFile(LINK_CHECKS_PATH, 'utf8').catch(() => '');
  if (serialized === current) {
    console.log('  sidecar unchanged; nothing to rebuild');
    return;
  }
  await fs.writeFile(LINK_CHECKS_PATH, serialized, 'utf8');

  // Merge the sidecar back into the generated guide content. The rebuild is
  // gated on the same validation as any other guide change, and it can only
  // move `linkCheckedAt`: `lastmod` comes from data/content-provenance.json,
  // which this script never writes, and the daily audit asserts that file and
  // the generated route module are unchanged before it commits.
  const rebuild = await buildGuideOutputs({ write: true });
  if (rebuild.problems.length) {
    console.error('GUIDE REBUILD FAILED after stamping link checks:');
    for (const problem of rebuild.problems) console.error(`  - ${problem}`);
    process.exit(1);
  }
  console.log('  rebuilt public/data/guides-content.json from the updated sidecar');
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

  // --- sidecar stamping ---------------------------------------------------
  const citations = [
    { slug: 'g', url: 'a' },
    { slug: 'g', url: 'b' },
    { slug: 'h', url: 'a' }
  ];
  const empty = { guides: {} };

  const blockedRun = applySidecarStamps(empty, citations, new Map([['a', 'blocked'], ['b', 'failed']]), '2026-08-03');
  assert('blocked/failed sources are not stamped', blockedRun.stamped === 0 && Object.keys(blockedRun.next.guides).length === 0);

  const okRun = applySidecarStamps(empty, citations, new Map([['a', 'ok']]), '2026-08-03');
  assert('an ok url stamps every citation of it', okRun.stamped === 2);
  assert('stamps are recorded per guide', okRun.next.guides.g.a === '2026-08-03' && okRun.next.guides.h.a === '2026-08-03');
  assert('an unchecked sibling citation is not recorded', okRun.next.guides.g.b === undefined);

  assert('stamping is idempotent', applySidecarStamps(okRun.next, citations, new Map([['a', 'ok']]), '2026-08-03').stamped === 0);

  const nextDay = applySidecarStamps(okRun.next, citations, new Map([['a', 'ok']]), '2026-08-04');
  assert('an existing record is advanced in place', nextDay.stamped === 2 && nextDay.next.guides.g.a === '2026-08-04');

  // Two guides citing one URL, checked on different days, must not back-date or
  // forward-date each other — the reason the record is keyed by guide.
  const perGuide = applySidecarStamps(
    { guides: { g: { a: '2026-01-01' } } },
    citations,
    new Map([['a', 'ok']]),
    '2026-08-05'
  );
  assert('each guide keeps its own record', perGuide.next.guides.g.a === '2026-08-05' && perGuide.next.guides.h.a === '2026-08-05');

  const pruned = applySidecarStamps(
    { guides: { g: { a: '2026-08-03', 'gone-url': '2026-08-03' }, 'deleted-guide': { a: '2026-08-03' } } },
    citations,
    new Map(),
    '2026-08-04'
  );
  assert('a removed citation drops out of the sidecar', pruned.next.guides.g['gone-url'] === undefined);
  assert('a removed guide drops out of the sidecar', pruned.next.guides['deleted-guide'] === undefined);
  assert('surviving records are kept', pruned.next.guides.g.a === '2026-08-03');

  // This script may not touch the editorial claim, nor the Markdown that holds
  // it. The sidecar has no lastChecked key at all, which is the structural
  // guarantee: there is nothing here for automation to overwrite.
  assert(
    'the sidecar carries no editorial field to overwrite',
    !JSON.stringify(okRun.next).includes('lastChecked')
  );

  // --- citations --------------------------------------------------------
  const extracted = citationsFrom({
    '/guides/one': { sources: [{ url: 'u1' }, { url: 'u2' }] },
    '/guides/two': { sources: [{ url: 'u1' }] }
  });
  assert('citations are (slug, url) pairs', extracted.length === 3 && extracted[0].slug === 'one' && extracted[2].slug === 'two');
  assert('a schema url is not a citation', citationsFrom({ '/guides/one': { schema: { url: 'u9' }, sources: [] } }).length === 0);

  // A report round-trips into the same verdicts, so the probe/stamp split in
  // the daily audit cannot change what gets stamped.
  const report = { ok: ['a'], blocked: [{ url: 'b', detail: '403' }], needs_review: [{ url: 'c', detail: '404' }] };
  const restored = new Map(outcomesFromReport(report).map((o) => [o.url, o.verdict]));
  assert('report restores ok verdicts', restored.get('a') === 'ok');
  assert('report restores blocked verdicts', restored.get('b') === 'blocked');
  assert('report restores failed verdicts', restored.get('c') === 'failed');
  assert(
    'only the ok url stamps from a report',
    applySidecarStamps(empty, [{ slug: 'g', url: 'a' }, { slug: 'g', url: 'b' }, { slug: 'g', url: 'c' }], restored, '2026-08-03').stamped === 1
  );

  // Against the real corpus: every cited URL is reachable from the compiled
  // guides, and stamping them all changes nothing outside `guides`.
  const realGuides = JSON.parse(fsSync.readFileSync(GUIDES_CONTENT_PATH, 'utf8'));
  const realCitations = citationsFrom(realGuides);
  assert('the real corpus has citations to check', realCitations.length > 0);
  const realSidecar = fsSync.existsSync(LINK_CHECKS_PATH)
    ? JSON.parse(fsSync.readFileSync(LINK_CHECKS_PATH, 'utf8'))
    : { guides: {} };
  const realRun = applySidecarStamps(realSidecar, realCitations, new Map(realCitations.map((c) => [c.url, 'ok'])), '2999-01-01');
  assert(
    'stamping the real corpus records every citation',
    realCitations.every((c) => realRun.next.guides[c.slug]?.[c.url] === '2999-01-01')
  );
  assert(
    'stamping the real corpus touches nothing but `guides`',
    JSON.stringify({ ...realRun.next, guides: null }) === JSON.stringify({ ...realSidecar, guides: null })
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
