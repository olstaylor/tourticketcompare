#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { onRequest } from '../functions/[[path]].js';

const assetMap = new Map([
  ['/', 'public/index.html'],
  ['/index.html', 'public/index.html'],
  ['/data/catalog.json', 'public/data/catalog.json'],
  ['/data/artists.json', 'public/data/artists.json'],
  ['/data/events.json', 'public/data/events.json'],
  ['/data/tm-cta-suppression.json', 'public/data/tm-cta-suppression.json']
]);

const contentTypes = new Map([
  ['.html', 'text/html; charset=UTF-8'],
  ['.json', 'application/json; charset=UTF-8']
]);

function contentTypeFor(filePath) {
  const ext = filePath.endsWith('.json') ? '.json' : filePath.endsWith('.html') ? '.html' : '';
  return contentTypes.get(ext) || 'text/plain; charset=UTF-8';
}

const env = {
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      const filePath = assetMap.get(url.pathname);
      if (!filePath) return new Response('Not found', { status: 404 });
      const body = await fs.readFile(filePath, 'utf8');
      return new Response(body, { headers: { 'Content-Type': contentTypeFor(filePath) } });
    }
  }
};

const response = await onRequest({
  request: new Request('https://tourticketcompare.com/artists/bruno-mars'),
  env,
  next: () => new Response('next', { status: 599 })
});

assert.equal(response.status, 200);
const html = await response.text();

const suppressedShowId = 'tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_k';
const unsuppressedShowId = 'tm-bruno-mars-2026-berlin-z7r9jz1a7oe_k';

assert.ok(
  html.includes('Ticketmaster link temporarily hidden while this event is rechecked.'),
  'suppressed event cards should explain that the Ticketmaster CTA is hidden'
);
assert.ok(
  !html.includes(`/api/out?showId=${suppressedShowId}&amp;provider=ticketmaster`),
  'suppressed review finding must not render an event-level Ticketmaster CTA'
);
assert.ok(
  html.includes(`/api/out?showId=${unsuppressedShowId}&amp;provider=ticketmaster`),
  'unaffected verified event should still render its event-level Ticketmaster CTA'
);
assert.ok(
  html.includes('/api/out?artistSlug=bruno-mars&amp;provider=ticketmaster'),
  'artist-level Ticketmaster provider link should be preserved'
);

const suppression = JSON.parse(await fs.readFile('public/data/tm-cta-suppression.json', 'utf8'));
assert.ok(suppression.suppressed_event_ids.includes(suppressedShowId));
assert.ok(!suppression.suppressed_event_ids.includes(unsuppressedShowId));

const appJs = await fs.readFile('public/app.js', 'utf8');
assert.ok(
  appJs.includes('const hasVerifiedLink = !ticketmasterCtaSuppressed(data) && Boolean(safeVerifiedEventUrl(data.ticketmaster_url));'),
  'client search event CTAs should also respect Ticketmaster CTA suppression'
);
assert.ok(
  appJs.includes('const shows = applyTicketmasterCtaSuppression(safeShowList(data), suppressedEventIds);'),
  'client show-board hydration should apply Ticketmaster CTA suppression before rendering cards'
);

console.log('Ticketmaster CTA suppression SSR checks passed.');
