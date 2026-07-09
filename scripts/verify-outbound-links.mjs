#!/usr/bin/env node
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

async function checkUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: BROWSER_HEADERS
    });

    // Some WAFs reject HEAD specifically (405/501) or challenge it (401/403/429);
    // retry with a ranged GET, which browsers use and WAFs are more likely to allow.
    if (response.status === 405 || response.status === 501 || BLOCKED_STATUSES.has(response.status)) {
      response = await fetch(url, {
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
