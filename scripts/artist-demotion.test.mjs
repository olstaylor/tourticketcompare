// /api/out refuses every redirect for a demoted artist, and fails closed when
// it cannot read artists.json (auto-ingest plan, owner amendment 2).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { onRequestGet } from '../functions/api/out.js';

const event = { id: 'tm-beyonce-2027-berlin-abc123', artist_slug: 'beyonce', city: 'Berlin', venue: 'Test Arena',
  datetime_iso: '2027-06-19T19:00:00+02:00', verification_status: 'human_verified', ticketmaster_event_id: 'ABC123',
  ticketmaster_url: 'https://www.ticketmaster.de/beyonce-berlin/event/ABC123', provider_links: { ticketmaster: { verified: true } } };
const env = (artists) => ({
  ASSETS: {
    fetch: async (req) => {
      const path = new URL(req.url).pathname;
      if (path === '/data/events.json') return Response.json([event]);
      if (path === '/data/artists.json') return artists === null ? new Response('gone', { status: 500 }) : Response.json(artists);
      return new Response('not found', { status: 404 });
    }
  }
});
const get = (query, artists) =>
  onRequestGet({ request: new Request(`https://tourticketcompare.com/api/out?${query}`), env: env(artists) });
const artistLevel = 'artistSlug=beyonce&provider=ticketmaster';
const eventLevel = `showId=${event.id}&provider=ticketmaster`;
const live = [{ slug: 'beyonce', indexing_status: 'indexable_with_substantial_content' }];
const demoted = [{ slug: 'beyonce', indexing_status: 'review_required', demoted: { at: '2027-01-01', reason: 'denylist' } }];

test('a published artist still redirects at artist and event level', async () => {
  assert.equal((await get(artistLevel, live)).status, 302);
  assert.equal((await get(eventLevel, live)).status, 302);
});

test('a demoted artist gets no redirect at either level', async () => {
  for (const query of [artistLevel, eventLevel]) {
    const response = await get(query, demoted);
    assert.equal(response.status, 410);
    assert.equal((await response.json()).status, 'artist_demoted');
    assert.equal(response.headers.get('Location'), null);
  }
});

test('an unreadable artists.json fails closed at both levels', async () => {
  for (const query of [artistLevel, eventLevel]) {
    const response = await get(query, null);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).status, 'artist_state_unavailable');
  }
});
