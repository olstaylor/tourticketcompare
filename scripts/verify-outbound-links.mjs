#!/usr/bin/env node
import fs from 'node:fs/promises';

const EVENTS_PATH = new URL('../public/data/events.json', import.meta.url);

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

    for (const key of ['ticketmaster_url', 'seatgeek_url', 'source_url']) {
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
      headers: { 'user-agent': 'TourTicketCompareLinkVerifier/1.0 (+https://tourticketcompare.com)' }
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          Range: 'bytes=0-0',
          'user-agent': 'TourTicketCompareLinkVerifier/1.0 (+https://tourticketcompare.com)'
        }
      });
    }

    return {
      ok: response.status >= 200 && response.status < 400,
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

const args = new Set(process.argv.slice(2));
const failOnRedirect = args.has('--fail-on-redirect');
const timeoutMs = Number.parseInt(process.env.LINK_CHECK_TIMEOUT_MS || '12000', 10);

const raw = await fs.readFile(EVENTS_PATH, 'utf8');
const events = JSON.parse(raw);
const links = collectLinks(events);

if (!links.length) {
  console.log('No outbound links found in events dataset.');
  process.exit(0);
}

let failures = 0;
let redirects = 0;

console.log(`Checking ${links.length} unique outbound links from public/data/events.json ...`);
for (const item of links) {
  const result = await checkUrl(item.url, timeoutMs);
  const refs = item.refs.slice(0, 2).join(', ');

  if (!result.ok) {
    failures += 1;
    console.log(`FAIL ${result.status ?? 'ERR'} ${item.url} (${refs})${result.error ? ` :: ${result.error}` : ''}`);
    continue;
  }

  const redirected = result.finalUrl && result.finalUrl !== item.url;
  if (redirected) redirects += 1;
  const marker = redirected ? 'REDIRECT' : 'OK';
  console.log(`${marker} ${result.status} ${item.url}`);

  if (redirected && failOnRedirect) {
    failures += 1;
    console.log(`  redirect target: ${result.finalUrl}`);
  }
}

console.log(`\nSummary: ${links.length} checked, ${failures} failures, ${redirects} redirects.`);
if (failures > 0) process.exit(1);
