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

function asUrl(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return null;
  return trimmed;
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

  console.log('verify-outbound-links self-test passed');
  process.exit(0);
}

const raw = await fs.readFile(EVENTS_PATH, 'utf8');
const events = JSON.parse(raw);
const links = collectLinks(events);

const eventIndex = new Map();
for (const event of events) {
  const id = event?.id || event?.show_id;
  if (id) eventIndex.set(id, event);
}

if (!links.length) {
  console.log('No outbound links found in events dataset.');
  if (emitJson) {
    const summary = { checked: 0, failures: [], passes: [], redirects: [] };
    if (jsonOutPath) await fs.writeFile(jsonOutPath, JSON.stringify(summary, null, 2));
    else console.log(JSON.stringify(summary, null, 2));
  }
  process.exit(0);
}

const failureEntries = [];
const passEntries = [];
const redirectEntries = [];
const blockedEntries = [];

console.log(`Checking ${links.length} unique outbound links from public/data/events.json ...`);
for (const item of links) {
  const result = await checkUrl(item.url, timeoutMs);
  const refs = item.refs.slice(0, 2).join(', ');
  const eventIds = [...new Set(item.refs.map((ref) => ref.split(':')[0]))];
  const artistSlugs = [...new Set(eventIds.map((id) => eventIndex.get(id)?.artist_slug).filter(Boolean))];

  if (result.blocked) {
    blockedEntries.push({
      url: item.url,
      status: result.status,
      refs: item.refs,
      eventIds,
      artistSlugs
    });
    console.log(`BLOCKED ${result.status} ${item.url} (${refs}) :: anti-bot/WAF, not confirmed dead`);
    continue;
  }

  if (!result.ok) {
    failureEntries.push({
      url: item.url,
      status: result.status,
      error: result.error || null,
      refs: item.refs,
      eventIds,
      artistSlugs
    });
    console.log(`FAIL ${result.status ?? 'ERR'} ${item.url} (${refs})${result.error ? ` :: ${result.error}` : ''}`);
    continue;
  }

  const redirected = Boolean(result.finalUrl && result.finalUrl !== item.url);
  if (redirected) {
    redirectEntries.push({ url: item.url, finalUrl: result.finalUrl, status: result.status, refs: item.refs });
  }
  passEntries.push({ url: item.url, status: result.status, redirected, finalUrl: result.finalUrl || null, eventIds, artistSlugs });

  const marker = redirected ? 'REDIRECT' : 'OK';
  console.log(`${marker} ${result.status} ${item.url}`);

  if (redirected && failOnRedirect) {
    failureEntries.push({
      url: item.url,
      status: result.status,
      error: `unexpected redirect to ${result.finalUrl}`,
      refs: item.refs,
      eventIds,
      artistSlugs
    });
    console.log(`  redirect target: ${result.finalUrl}`);
  }
}

const failures = failureEntries.length;
const redirects = redirectEntries.length;
const blocked = blockedEntries.length;

console.log(`\nSummary: ${links.length} checked, ${failures} failures, ${blocked} blocked (anti-bot), ${redirects} redirects.`);

if (emitJson) {
  const summary = {
    checked_at: new Date().toISOString(),
    checked: links.length,
    failures: failureEntries,
    blocked: blockedEntries,
    passes: passEntries,
    redirects: redirectEntries
  };
  if (jsonOutPath) {
    await fs.writeFile(jsonOutPath, JSON.stringify(summary, null, 2));
    console.log(`JSON summary written to ${jsonOutPath}`);
  } else {
    console.log(JSON.stringify(summary, null, 2));
  }
}

if (failures > 0) process.exit(1);

