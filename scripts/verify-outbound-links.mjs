#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const EVENTS_PATH = new URL('../public/data/events.json', import.meta.url);

// Ticket storefronts (Ticketmaster, SeatGeek, etc.) sit behind anti-bot WAFs
// (Akamai/Cloudflare/PerimeterX) that reject non-browser or datacenter clients.
// Present a realistic browser fingerprint so live pages aren't misreported.
const BROWSER_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9'
};

// Even with a browser fingerprint, WAFs frequently return these to CI runners
// for live pages. Treat them as "blocked" (inconclusive), not a dead link.
const BLOCKED_STATUSES = new Set([401, 403, 429]);

// A HEAD response is not authoritative for a storefront URL. Some providers
// return 404/410 to HEAD from CI while the same URL succeeds in a browser GET.
// Confirm every negative HEAD status with a small GET before classifying it.
const HEAD_RETRY_STATUSES = new Set([404, 405, 410, 501, ...BLOCKED_STATUSES]);

// Checking was strictly serial: one URL, awaited, then the next. At the measured
// ~0.51s per URL that put the step at 4676 x 0.51s = 39.7 minutes against the
// job's 40-minute cap, which is exactly where it died on 2026-09-10 and
// 2026-09-11 (see docs/OPERATIONS.md -> Known incidents). The cost is linear in
// unique URLs, which is linear in events: this dataset carries 3.42 URLs per
// event across 18 hosts, so the wall reached itself as ingestion landed 272 new
// events, and no timeout-minutes value survives the roster growing another order
// of magnitude.
//
// The limit is per host rather than global on purpose. The URLs arrive grouped
// by artist and therefore by storefront, so a single global pool would fire its
// whole width at one provider in bursts. Anti-bot layers answer a burst with
// 401/403/429, which this script correctly refuses to read as a dead link — so
// the damage would not be a false failure but something subtler and worse: a run
// whose evidence quietly degrades into "blocked" and stops telling us anything.
// Per host, the concurrency is spent across providers instead of at one.
//
// Both are env-tunable because the busiest host is now the bound on the whole
// step: the critical path is (URLs on the busiest host / PER_HOST) x per-URL
// latency, currently 1,120 / 3 x 0.51s, about 3.2 minutes — the Ticketmaster
// URLs still in scope once past-event ones are skipped (1,297 before that).
const PER_HOST_CONCURRENCY = Math.max(1, Number.parseInt(process.env.LINK_CHECK_PER_HOST_CONCURRENCY || '3', 10));
const GLOBAL_CONCURRENCY = Math.max(1, Number.parseInt(process.env.LINK_CHECK_CONCURRENCY || '24', 10));
const INCLUDE_EXPIRED = process.env.LINK_CHECK_INCLUDE_EXPIRED === '1';

export function hostKeyFor(value) {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    // Unparseable URLs share one queue. collectLinks already filters to
    // http(s), so this is a guard rather than an expected path.
    return 'invalid';
  }
}

function createSemaphore(max) {
  let active = 0;
  const waiting = [];
  return {
    async acquire() {
      if (active < max) {
        active += 1;
        return;
      }
      await new Promise((resolve) => waiting.push(resolve));
      // No increment here. `release` hands this lane its slot without giving the
      // count back, so the slot is already ours. Decrementing on release and
      // re-incrementing here would open a window between the waiter being
      // resolved and its continuation running, in which a fresh `acquire` sees a
      // free slot and takes it too — which overshoots the cap by one per wake.
    },
    release() {
      const next = waiting.shift();
      if (next) next();
      else active -= 1;
    }
  };
}

/**
 * Run `worker` over `items` with at most `perHost` in flight against any one
 * host and at most `global` in flight overall.
 *
 * Results are written by index, so the returned array is in input order no
 * matter what order the network answers in. Everything downstream — the entry
 * arrays, the log lines, the JSON artefact — therefore stays byte-identical to
 * the serial version for the same inputs, which is what makes this a scheduling
 * change and not a behaviour change.
 *
 * A worker that throws rejects the whole run rather than being recorded as a
 * result. `checkUrl` catches everything and returns a result object, so a throw
 * here means a defect in this script; failing the audit loudly is correct, and
 * far better than turning a bug into a page full of phantom dead links.
 */
export async function mapWithHostLimits(items, { perHost, global: globalLimit }, worker) {
  const results = new Array(items.length);
  const queues = new Map();
  items.forEach((item, index) => {
    const key = hostKeyFor(item.url);
    if (!queues.has(key)) queues.set(key, []);
    queues.get(key).push(index);
  });

  const gate = createSemaphore(globalLimit);
  const lanes = [];

  for (const indices of queues.values()) {
    let cursor = 0;
    // One lane per concurrent slot this host is allowed, each pulling from the
    // host's own queue. Taking the cursor is atomic: there is no await between
    // the read and the increment.
    for (let lane = 0; lane < Math.min(perHost, indices.length); lane += 1) {
      lanes.push(
        (async () => {
          while (cursor < indices.length) {
            const index = indices[cursor];
            cursor += 1;
            await gate.acquire();
            try {
              results[index] = await worker(items[index], index);
            } finally {
              gate.release();
            }
          }
        })()
      );
    }
  }

  await Promise.all(lanes);
  return results;
}

function asUrl(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return null;
  return trimmed;
}

function providerForUrl(value) {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    if (host.includes("ticketmaster.")) return "ticketmaster";
    if (host.includes("seatgeek.")) return "seatgeek";
    if (host.includes("vividseats.")) return "vivid-seats";
    if (host.includes("ticketnetwork.")) return "ticketnetwork";
    if (host.includes("ticketliquidator.")) return "ticket-liquidator";
    if (host.includes("stubhub.")) return "stubhub-international";
    return "other";
  } catch {
    return "other";
  }
}

function summarizeProviders(entries) {
  const summary = {};
  for (const entry of entries) {
    const provider = entry.provider || "other";
    summary[provider] ||= { checked: 0, failures: 0, expiredFailures: 0, blocked: 0, redirects: 0 };
    summary[provider].checked += 1;
    if (!entry.blocked && (entry.error || (entry.status != null && entry.status >= 400))) {
      if (entry.actionable === false) summary[provider].expiredFailures += 1;
      else summary[provider].failures += 1;
    }
    if (entry.blocked) summary[provider].blocked += 1;
    if (entry.redirected) summary[provider].redirects += 1;
  }
  return summary;
}

// A dead storefront URL matters to the live site only while at least one event
// that references it is still upcoming. Historical records stay in the audit
// artefact for maintenance, but they must not create a red rolling issue or
// block an artist verification-date bump. Unknown/malformed dates remain
// actionable so bad data can never be hidden by this classification.
function reviewScopeForEventIds(eventIds, eventIndex, now = Date.now()) {
  let sawValidPastDate = false;
  let sawUnknownDate = false;

  for (const id of eventIds) {
    const event = eventIndex.get(id);
    const value = event?.datetime_iso || event?.dateTimeISO || "";
    const text = String(value || "").trim();
    const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(text)
      ? Date.parse(`${text}T23:59:59Z`)
      : Date.parse(text);
    if (!Number.isFinite(timestamp)) {
      sawUnknownDate = true;
      continue;
    }
    if (timestamp >= now) return "upcoming";
    sawValidPastDate = true;
  }

  return sawValidPastDate && !sawUnknownDate ? "expired" : "unknown";
}

/**
 * Split the link set into what is worth checking tonight and what is not.
 *
 * A URL referenced only by events that have already happened produces findings
 * the audit itself marks `actionable: false` and files under "historical" — the
 * report tells nobody to act on them, and nobody does. Today that is 570 of
 * 4,790 unique URLs, and the share only grows as the archive does, so it is
 * ~12% of the nightly request budget spent on nothing. Expired-only URLs are
 * skipped by default, and counted so the skip is visible rather than silent.
 *
 * Anything else stays in: a URL is dropped only when every referencing event
 * has a valid past date. One unknown or one upcoming date keeps it, which is
 * the same fail-open rule `reviewScopeForEventIds` already applies.
 *
 * `LINK_CHECK_INCLUDE_EXPIRED=1` restores the full sweep for an archive audit.
 *
 * Pure, so the self-test can pin the boundary without the network.
 */
export function partitionByReviewScope(links, eventIndex, { now = Date.now(), includeExpired = false } = {}) {
  if (includeExpired) return { checked: links, skipped: [] };
  const checked = [];
  const skipped = [];
  for (const item of links) {
    const eventIds = [...new Set(item.refs.map((ref) => ref.split(':')[0]))];
    (reviewScopeForEventIds(eventIds, eventIndex, now) === 'expired' ? skipped : checked).push(item);
  }
  return { checked, skipped };
}

function collectLinks(events) {
  const found = new Map();
  for (const event of events) {
    const eventId = event?.id || event?.show_id || 'unknown-id';

    for (const key of ['ticketmaster_url', 'seatgeek_url', 'vividseats_url', 'source_url']) {
      const value = asUrl(event?.[key]);
      if (!value) continue;
      if (!found.has(value)) found.set(value, new Set());
      found.get(value).add(`${eventId}:${key}`);
    }

    if (event?.provider_links && typeof event.provider_links === 'object') {
      for (const [provider, meta] of Object.entries(event.provider_links)) {
        const value = asUrl(meta?.url);
        if (!value) continue;
        if (!found.has(value)) found.set(value, new Set());
        found.get(value).add(`${eventId}:provider_links.${provider}.url`);
      }
    }
  }

  return [...found.entries()].map(([url, refs]) => ({ url, refs: [...refs] }));
}

async function checkUrl(url, timeoutMs, fetchImpl = fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetchImpl(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: BROWSER_HEADERS
    });

    // HEAD is only a cheap first pass. Confirm 404/410 as well as explicit
    // method/WAF responses with a ranged GET before declaring a link dead.
    if (HEAD_RETRY_STATUSES.has(response.status)) {
      response = await fetchImpl(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { ...BROWSER_HEADERS, Range: 'bytes=0-0' }
      });
    }

    return {
      ok: response.status >= 200 && response.status < 400,
      blocked: BLOCKED_STATUSES.has(response.status),
      status: response.status,
      finalUrl: response.url
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error?.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : String(error?.message || error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

const argv = process.argv.slice(2);
const args = new Set(argv);
const failOnRedirect = args.has('--fail-on-redirect');
const jsonFlagIndex = argv.indexOf('--json');
const jsonOutPath = jsonFlagIndex >= 0 ? (argv[jsonFlagIndex + 1] || null) : null;
const emitJson = jsonFlagIndex >= 0;
const timeoutMs = Number.parseInt(process.env.LINK_CHECK_TIMEOUT_MS || '12000', 10);

if (args.has('--self-test')) {
  const sequenceFetch = (statuses, calls) => async (_url, options = {}) => {
    calls.push(options.method || 'GET');
    const status = statuses.shift();
    return new Response(null, { status });
  };

  const recoveredCalls = [];
  const recovered = await checkUrl(
    'https://www.vividseats.com/example/production/123',
    1000,
    sequenceFetch([404, 200], recoveredCalls)
  );
  assert.equal(recovered.ok, true);
  assert.equal(recovered.blocked, false);
  assert.deepEqual(recoveredCalls, ['HEAD', 'GET']);

  const deadCalls = [];
  const dead = await checkUrl(
    'https://www.vividseats.com/example/production/456',
    1000,
    sequenceFetch([404, 404], deadCalls)
  );
  assert.equal(dead.ok, false);
  assert.equal(dead.blocked, false);
  assert.equal(dead.status, 404);
  assert.deepEqual(deadCalls, ['HEAD', 'GET']);

  const blockedCalls = [];
  const blockedResult = await checkUrl(
    'https://www.vividseats.com/example/production/789',
    1000,
    sequenceFetch([403, 403], blockedCalls)
  );
  assert.equal(blockedResult.ok, false);
  assert.equal(blockedResult.blocked, true);
  assert.deepEqual(blockedCalls, ['HEAD', 'GET']);

  const now = Date.parse('2026-07-30T12:00:00Z');
  const events = new Map([
    ['past-a', { datetime_iso: '2026-07-29T12:00:00Z' }],
    ['past-b', { datetime_iso: '2026-07-01T12:00:00Z' }],
    ['future', { datetime_iso: '2026-08-01T12:00:00Z' }],
    ['today-date-only', { datetime_iso: '2026-07-30' }],
    ['unknown', { datetime_iso: 'not-a-date' }]
  ]);
  assert.equal(reviewScopeForEventIds(['past-a', 'past-b'], events, now), 'expired');
  assert.equal(reviewScopeForEventIds(['past-a', 'future'], events, now), 'upcoming');
  assert.equal(reviewScopeForEventIds(['today-date-only'], events, now), 'upcoming');
  assert.equal(reviewScopeForEventIds(['past-a', 'unknown'], events, now), 'unknown');
  assert.equal(reviewScopeForEventIds(['missing'], events, now), 'unknown');

  // --- skipping the archive --------------------------------------------------
  //
  // A URL referenced only by past events is dropped before the network, because
  // its failures are the ones the report already files as non-actionable
  // history. Everything else is kept, and the fail-open cases are kept
  // deliberately: one unknown date, or one upcoming event, and the URL stays in.
  const link = (url, ids) => ({ url, refs: ids.map((id) => `${id}:ticketmaster_url`) });
  const scoped = partitionByReviewScope(
    [
      link('https://example.invalid/past', ['past-a', 'past-b']),
      link('https://example.invalid/mixed', ['past-a', 'future']),
      link('https://example.invalid/future', ['future']),
      link('https://example.invalid/unknown-date', ['past-a', 'unknown']),
      link('https://example.invalid/missing-event', ['missing']),
      link('https://example.invalid/today', ['today-date-only'])
    ],
    events,
    { now }
  );
  assert.deepEqual(scoped.skipped.map((item) => item.url), ['https://example.invalid/past']);
  assert.deepEqual(
    scoped.checked.map((item) => item.url),
    [
      'https://example.invalid/mixed',
      'https://example.invalid/future',
      'https://example.invalid/unknown-date',
      'https://example.invalid/missing-event',
      'https://example.invalid/today'
    ]
  );

  // The opt-out is what makes an archive sweep still possible, so it must skip
  // nothing at all rather than merely widen the window.
  const fullSweep = partitionByReviewScope(
    [link('https://example.invalid/past', ['past-a'])],
    events,
    { now, includeExpired: true }
  );
  assert.equal(fullSweep.skipped.length, 0);
  assert.equal(fullSweep.checked.length, 1);

  // An empty input must not report a skip, or the "all links are historical"
  // message would fire on a dataset that simply has no links.
  assert.deepEqual(partitionByReviewScope([], events, { now }), { checked: [], skipped: [] });

  // --- scheduling ------------------------------------------------------------
  //
  // The step died at its timeout because this was a serial loop. These pin the
  // three properties that make concurrency safe to keep: the caps are honoured,
  // the output does not depend on completion order, and the work really is
  // overlapped rather than quietly serial again.
  assert.equal(hostKeyFor('https://www.ticketmaster.com/x'), 'ticketmaster.com');
  assert.equal(hostKeyFor('HTTPS://WWW.SeatGeek.com/y'), 'seatgeek.com');
  assert.equal(hostKeyFor('not a url'), 'invalid');

  const buildItems = (spec) => spec.flatMap(([host, count]) =>
    Array.from({ length: count }, (_, i) => ({ url: `https://${host}/path/${i}` }))
  );

  // Completion order is deliberately the reverse of input order, and staggered
  // across hosts, so an implementation that returned results in the order the
  // network answered would fail this outright.
  const ordered = buildItems([['a.example', 4], ['b.example', 4]]);
  const orderedResults = await mapWithHostLimits(ordered, { perHost: 2, global: 4 }, async (item, index) => {
    await new Promise((resolve) => setTimeout(resolve, (ordered.length - index) * 2));
    return { url: item.url, index };
  });
  assert.deepEqual(orderedResults.map((r) => r.index), ordered.map((_, i) => i));
  assert.deepEqual(orderedResults.map((r) => r.url), ordered.map((item) => item.url));

  const observeLimits = async (items, limits) => {
    let inFlight = 0;
    let peakGlobal = 0;
    const perHostActive = new Map();
    const perHostPeak = new Map();
    await mapWithHostLimits(items, limits, async (item) => {
      const host = hostKeyFor(item.url);
      inFlight += 1;
      perHostActive.set(host, (perHostActive.get(host) || 0) + 1);
      peakGlobal = Math.max(peakGlobal, inFlight);
      perHostPeak.set(host, Math.max(perHostPeak.get(host) || 0, perHostActive.get(host)));
      await new Promise((resolve) => setTimeout(resolve, 5));
      inFlight -= 1;
      perHostActive.set(host, perHostActive.get(host) - 1);
      return { ok: true };
    });
    return { peakGlobal, perHostPeak };
  };

  // Skewed on purpose: one dominant host plus a tail, which is the real shape —
  // ticketmaster.com alone is 961 of 4676 URLs.
  const skewed = buildItems([['big.example', 20], ['mid.example', 6], ['small.example', 2]]);
  const skewedLimits = await observeLimits(skewed, { perHost: 3, global: 24 });
  for (const [host, peak] of skewedLimits.perHostPeak) {
    assert.ok(peak <= 3, `per-host concurrency exceeded on ${host}: ${peak}`);
  }
  // Three hosts capped at 3 each cannot exceed 8 in flight (the smallest host
  // only has 2 items), and must reach more than one or the pool is serial.
  assert.ok(skewedLimits.peakGlobal <= 8, `global concurrency exceeded: ${skewedLimits.peakGlobal}`);
  assert.ok(skewedLimits.peakGlobal > 1, 'scheduler ran serially; the timeout regression is back');

  // The dominant host must actually reach its per-host budget. Peak *global*
  // concurrency above 1 is too weak a guard on its own: one lane per host across
  // several hosts satisfies it while leaving the busiest host serial, and the
  // busiest host is precisely what bounds the step — 961 Ticketmaster URLs at
  // one lane is 8 minutes, at three it is under three. A mutation collapsing the
  // per-host limit to 1 passes the global check and fails this one.
  assert.equal(
    skewedLimits.perHostPeak.get('big.example'),
    3,
    `the dominant host never reached its per-host budget: ${skewedLimits.perHostPeak.get('big.example')}`
  );

  // The global cap must bind even when the per-host budgets would allow more:
  // 10 hosts x 3 per host is 30 lanes, held to 5.
  const wide = buildItems(Array.from({ length: 10 }, (_, i) => [`host${i}.example`, 4]));
  const wideLimits = await observeLimits(wide, { perHost: 3, global: 5 });
  assert.ok(wideLimits.peakGlobal <= 5, `global cap not enforced: ${wideLimits.peakGlobal}`);
  assert.ok(wideLimits.peakGlobal > 1, 'global cap collapsed the pool to serial');

  // A single host with perHost 1 is the serial case, and must still complete in
  // order rather than deadlock on the semaphore.
  const single = buildItems([['only.example', 5]]);
  const singleResults = await mapWithHostLimits(single, { perHost: 1, global: 24 }, async (item) => item.url);
  assert.deepEqual(singleResults, single.map((item) => item.url));

  assert.deepEqual(await mapWithHostLimits([], { perHost: 3, global: 24 }, async () => 'x'), []);

  // Every index must be filled. A hole would pair link[i] with a missing result
  // and crash classification on `result.blocked` — loudly, which is right, but
  // the scheduler should never produce one in the first place.
  const dense = await mapWithHostLimits(skewed, { perHost: 3, global: 24 }, async (item) => item.url);
  assert.equal(dense.length, skewed.length);
  assert.equal(dense.filter((value) => value === undefined).length, 0);
  assert.equal(new Set(dense).size, skewed.length);

  // A throwing worker must reject rather than record a phantom result: a defect
  // in this script must never reach the report as a dead link.
  await assert.rejects(
    () => mapWithHostLimits(buildItems([['boom.example', 3]]), { perHost: 2, global: 4 }, async () => {
      throw new Error('worker defect');
    }),
    /worker defect/
  );

  console.log('verify-outbound-links self-test passed');
  process.exit(0);
}

// Importing this file must not start a 40-minute network audit. The pure
// helpers above are exported so a test can exercise them; without this guard a
// bare `import` would run the whole check against every provider as a side
// effect, which is exactly what happened while benchmarking this change.
//
// `main` keeps its body at the original indentation deliberately: re-indenting
// would bury a three-line behaviour change in a hundred lines of whitespace, on
// a script whose classification rules a reviewer needs to see are untouched.
const { pathToFileURL } = await import('node:url');
const isEntryPoint = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isEntryPoint) await main();

async function main() {
const raw = await fs.readFile(EVENTS_PATH, 'utf8');
const events = JSON.parse(raw);
const collected = collectLinks(events);

const eventIndex = new Map();
for (const event of events) {
  const id = event?.id || event?.show_id;
  if (id) eventIndex.set(id, event);
}

// Drop URLs referenced only by past events before spending a request on them.
// The audit already classes their failures as non-actionable history, so this
// removes work rather than coverage. See partitionByReviewScope.
const { checked: links, skipped: skippedExpired } = partitionByReviewScope(collected, eventIndex, {
  includeExpired: INCLUDE_EXPIRED
});
if (skippedExpired.length) {
  console.log(
    `Skipping ${skippedExpired.length} of ${collected.length} URLs referenced only by past events ` +
      `(set LINK_CHECK_INCLUDE_EXPIRED=1 to sweep the archive too).`
  );
}

if (!links.length) {
  console.log(
    skippedExpired.length
      ? `No outbound links to check: all ${skippedExpired.length} are referenced only by past events.`
      : 'No outbound links found in events dataset.'
  );
  if (emitJson) {
    const summary = { checked: 0, failures: [], expired_failures: [], blocked: [], passes: [], redirects: [], provider_summary: {}, skipped_expired: skippedExpired.length };
    if (jsonOutPath) await fs.writeFile(jsonOutPath, JSON.stringify(summary, null, 2));
    else console.log(JSON.stringify(summary, null, 2));
  }
  process.exit(0);
}

const failureEntries = [];
const expiredFailureEntries = [];
const passEntries = [];
const redirectEntries = [];
const blockedEntries = [];

console.log(
  `Checking ${links.length} unique outbound links from public/data/events.json ` +
    `(<=${PER_HOST_CONCURRENCY}/host, <=${GLOBAL_CONCURRENCY} overall) ...`
);

// Phase one is the network, run concurrently. Phase two replays the results in
// input order, so classification, logging and the artefact are unchanged.
const results = await mapWithHostLimits(
  links,
  { perHost: PER_HOST_CONCURRENCY, global: GLOBAL_CONCURRENCY },
  (item) => checkUrl(item.url, timeoutMs)
);

for (const [index, item] of links.entries()) {
  const result = results[index];
  const refs = item.refs.slice(0, 2).join(', ');
  const eventIds = [...new Set(item.refs.map((ref) => ref.split(':')[0]))];
  const artistSlugs = [...new Set(eventIds.map((id) => eventIndex.get(id)?.artist_slug).filter(Boolean))];
  const eventDates = [...new Set(eventIds.map((id) => eventIndex.get(id)?.datetime_iso || eventIndex.get(id)?.dateTimeISO).filter(Boolean))];
  const reviewScope = reviewScopeForEventIds(eventIds, eventIndex);
  const eventMetadata = {
    eventIds,
    artistSlugs,
    eventDates,
    reviewScope,
    actionable: reviewScope !== 'expired'
  };

  if (result.blocked) {
    blockedEntries.push({
      url: item.url,
      provider: providerForUrl(item.url),
      status: result.status,
      blocked: true,
      refs: item.refs,
      ...eventMetadata
    });
    console.log(`BLOCKED ${result.status} ${item.url} (${refs}) :: anti-bot/WAF, not confirmed dead`);
    continue;
  }

  if (!result.ok) {
    const failure = {
      url: item.url,
      provider: providerForUrl(item.url),
      status: result.status,
      error: result.error || null,
      refs: item.refs,
      ...eventMetadata
    };
    if (reviewScope === 'expired') {
      expiredFailureEntries.push(failure);
      console.log(`HISTORICAL ${result.status ?? 'ERR'} ${item.url} (${refs}) :: referenced only by past events`);
    } else {
      failureEntries.push(failure);
      console.log(`FAIL ${result.status ?? 'ERR'} ${item.url} (${refs})${result.error ? ` :: ${result.error}` : ''}`);
    }
    continue;
  }

  const redirected = Boolean(result.finalUrl && result.finalUrl !== item.url);
  if (redirected) {
    redirectEntries.push({ url: item.url, provider: providerForUrl(item.url), finalUrl: result.finalUrl, status: result.status, refs: item.refs, ...eventMetadata });
  }
  passEntries.push({ url: item.url, provider: providerForUrl(item.url), status: result.status, redirected, finalUrl: result.finalUrl || null, ...eventMetadata });

  const marker = redirected ? 'REDIRECT' : 'OK';
  console.log(`${marker} ${result.status} ${item.url}`);

  if (redirected && failOnRedirect) {
    const redirectFailure = {
      url: item.url,
      provider: providerForUrl(item.url),
      status: result.status,
      error: `unexpected redirect to ${result.finalUrl}`,
      refs: item.refs,
      ...eventMetadata
    };
    if (reviewScope === 'expired') expiredFailureEntries.push(redirectFailure);
    else failureEntries.push(redirectFailure);
    console.log(`  redirect target: ${result.finalUrl}`);
  }
}

const failures = failureEntries.length;
const expiredFailures = expiredFailureEntries.length;
const redirects = redirectEntries.length;
const blocked = blockedEntries.length;
const providerSummary = summarizeProviders([
  ...passEntries,
  ...failureEntries,
  ...expiredFailureEntries,
  ...blockedEntries
]);

console.log(`\nSummary: ${links.length} checked, ${skippedExpired.length} skipped (past events only), ${failures} current failures, ${expiredFailures} historical failures, ${blocked} blocked (anti-bot), ${redirects} redirects.`);

if (emitJson) {
  const summary = {
    checked_at: new Date().toISOString(),
    checked: links.length,
    // Non-zero once past-event URLs stop being checked; `expired_failures` is
    // then empty by construction rather than by luck.
    skipped_expired: skippedExpired.length,
    failures: failureEntries,
    expired_failures: expiredFailureEntries,
    blocked: blockedEntries,
    passes: passEntries,
    redirects: redirectEntries,
    provider_summary: providerSummary
  };
  if (jsonOutPath) {
    await fs.writeFile(jsonOutPath, JSON.stringify(summary, null, 2));
    console.log(`JSON summary written to ${jsonOutPath}`);
  } else {
    console.log(JSON.stringify(summary, null, 2));
  }
}

if (failures > 0) process.exit(1);
} // end main
