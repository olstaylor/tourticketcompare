import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describeNavigation, isLikelyBot } from '../functions/_bot-detection.js';
import { onRequestGet } from '../functions/api/out.js';
import { onRequest as middleware } from '../functions/_middleware.js';
import { humanRedirectSql, pageBackedSql } from './lib/human-clicks.mjs';

const event = {
  id: 'tm-test-artist-2026-berlin-abc123', artist_slug: 'test-artist',
  city: 'Berlin', venue: 'Test Arena', datetime_iso: '2026-11-19T19:00:00+01:00',
  verification_status: 'human_verified', ticketmaster_event_id: 'ABC123',
  ticketmaster_url: 'https://www.ticketmaster.de/test-artist-berlin/event/ABC123',
  seatgeek_url: 'https://seatgeek.com/test-artist-tickets/concert/9876543',
  provider_links: { ticketmaster: { verified: true }, seatgeek: { verified: true } }
};
const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';
const nav = headers => describeNavigation(new Request('https://tourticketcompare.com/api/out', { headers }));

function fixture() {
  const db = new DatabaseSync(':memory:');
  for (const file of ['0001_demand', '0002_analytics_click_fields', '0008_analytics_commercial_funnel', '0009_impact_reconciliation_eligibility']) {
    db.exec(readFileSync(new URL(`../migrations/${file}.sql`, import.meta.url), 'utf8'));
  }
  const env = {
    DEMAND_DB: { prepare: sql => ({ bind: (...values) => ({ run: async () => db.prepare(sql.replace(/\?\d+/g, '?')).run(...values) }) }) },
    ASSETS: { fetch: async () => Response.json([event]) },
    IMPACT_SEATGEEK_BASE_TRACKING_URL: 'https://seatgeek.pxf.io/c/1234/5678/9012',
    OUT_CLICK_ID_SUBID_ENABLED: 'true'
  };
  return { db, env };
}
const out = headers => new Request(`https://tourticketcompare.com/api/out?showId=${event.id}&provider=seatgeek&ctaLocation=event_card`, { headers: { 'user-agent': CHROME, 'cf-connecting-ip': '203.0.113.7', ...headers } });

test('a click on a TTC page is never flagged direct', () => {
  const click = nav({ 'sec-fetch-site': 'same-origin', 'sec-fetch-mode': 'navigate', 'sec-fetch-user': '?1', referer: 'https://tourticketcompare.com/artists/test-artist' });
  assert.deepEqual(click, { fetchSite: 'same-origin', fetchMode: 'navigate', fetchUser: true, referer: 'same_origin', direct: false });
  // Older browsers without Sec-Fetch still send the same-origin Referer.
  assert.equal(nav({ referer: 'https://tourticketcompare.com/' }).direct, false);
  // A stripped Referer is fine when the browser reports a same-origin fetch.
  assert.equal(nav({ 'sec-fetch-site': 'same-origin' }).direct, false);
  assert.equal(nav({ referer: 'https://www.tourticketcompare.com/cities/x' }).referer, 'same_origin');
});

test('direct hits on the redirect URL are flagged', () => {
  assert.equal(nav({}).direct, true);
  assert.equal(nav({ 'sec-fetch-site': 'none', 'sec-fetch-mode': 'navigate' }).direct, true);
  assert.equal(nav({ 'sec-fetch-site': 'cross-site', referer: 'https://example.com/' }).referer, 'other');
  assert.equal(nav({ referer: 'not a url' }).referer, 'other');
  assert.equal(nav({ referer: 'https://tourticketcompare.com.evil.example/' }).direct, true);
  assert.equal(describeNavigation(undefined).direct, true);
});

test('declared crawlers are still dropped by user agent only', () => {
  assert.equal(isLikelyBot('Mozilla/5.0 (compatible; GPTBot/1.2)'), true);
  assert.equal(isLikelyBot(CHROME), false);
  assert.equal(isLikelyBot(''), false);
});

test('redirect receipts carry navigation evidence and the redirect is unchanged', async () => {
  // Receipts need Sec-Fetch-User (functions/api/out.js); a browser opening the
  // redirect URL directly still sends it, with Sec-Fetch-Site: none.
  for (const [headers, direct] of [[{ 'sec-fetch-user': '?1', 'sec-fetch-site': 'same-origin', referer: 'https://tourticketcompare.com/artists/test-artist' }, false], [{ 'sec-fetch-user': '?1', 'sec-fetch-site': 'none' }, true]]) {
    const { db, env } = fixture();
    try {
      const response = await onRequestGet({ request: out(headers), env });
      assert.equal(response.status, 302);
      const location = new URL(response.headers.get('Location'));
      assert.equal(location.origin + location.pathname, env.IMPACT_SEATGEEK_BASE_TRACKING_URL);
      for (const name of ['outbound_attempt', 'outbound_click']) {
        const row = db.prepare('SELECT metadata_json FROM analytics_events WHERE event_name = ?').get(name);
        assert.ok(row, `${name} is still recorded`);
        assert.equal(JSON.parse(row.metadata_json).navigation.direct, direct, name);
      }
    } finally { db.close(); }
  }
});

test('reports count a redirect only when its visitor sent a page event that day', () => {
  const db = new DatabaseSync(':memory:');
  try {
    db.exec(readFileSync(new URL('../migrations/0001_demand.sql', import.meta.url), 'utf8'));
    const insert = db.prepare('INSERT INTO analytics_events (created_at, event_name, request_key) VALUES (?, ?, ?)');
    insert.run('2026-10-08T10:00:00Z', 'page_view', 'person');
    insert.run('2026-10-08T10:01:00Z', 'outbound_click', 'person');
    insert.run('2026-10-08T11:00:00Z', 'web_vitals', 'person-2');
    insert.run('2026-10-08T11:01:00Z', 'outbound_click', 'person-2');
    for (let i = 0; i < 20; i++) insert.run('2026-10-08T12:00:00Z', 'outbound_click', `crawler-${i}`);
    insert.run('2026-10-08T12:00:00Z', 'outbound_click', null);
    // Page evidence from another day does not qualify a redirect.
    insert.run('2026-10-01T09:00:00Z', 'page_view', 'returning-ip');
    insert.run('2026-10-08T13:00:00Z', 'outbound_click', 'returning-ip');
    // Another redirect is not page evidence.
    insert.run('2026-10-08T12:00:00Z', 'outbound_attempt', 'crawler-0');
    assert.equal(db.prepare(`SELECT COUNT(*) AS n FROM analytics_events WHERE ${humanRedirectSql()}`).get().n, 2);
    assert.equal(db.prepare(`SELECT COUNT(*) AS n FROM analytics_events click WHERE ${humanRedirectSql('click')}`).get().n, 2);
    assert.equal(db.prepare(`SELECT COUNT(*) AS n FROM analytics_events WHERE event_name = 'outbound_click' AND NOT (${pageBackedSql()})`).get().n, 21);
  } finally { db.close(); }
});

test('/api/out is not served on *.pages.dev hosts, where the WAF rules do not apply', async () => {
  const query = '/api/out?provider=vivid-seats&artistSlug=test-artist&showId=x';
  const headers = { 'Sec-Fetch-Site': 'none', 'Sec-Fetch-Mode': 'navigate', 'Sec-Fetch-User': '?1' };
  for (const host of ['tourticketcompare.pages.dev', 'claude-project-thread.tourticketcompare.pages.dev', 'TOURTICKETCOMPARE.PAGES.DEV']) {
    for (const pathAndQuery of [query, query.replace('/api/out?', '/api/out/?')]) {
      let reachedFunction = false;
      const response = await middleware({
        request: new Request(`https://${host}${pathAndQuery}`, { headers }),
        env: {},
        next: async () => { reachedFunction = true; return new Response('redirect'); }
      });
      assert.equal(response.status, 404, `${host}${pathAndQuery}`);
      assert.equal(reachedFunction, false, 'the redirect function never runs');
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
    }
  }
  // The canonical host and other API paths on pages.dev are untouched.
  for (const url of ['https://tourticketcompare.com/api/out?x=1', 'https://tourticketcompare.pages.dev/api/health', 'https://tourticketcompare.pages.dev/api/analytics']) {
    let reached = false;
    const response = await middleware({ request: new Request(url), env: {}, next: async () => { reached = true; return new Response('ok'); } });
    assert.equal(reached, true, url);
    assert.equal(response.status, 200, url);
  }
});

test('/api/out refuses requests whose Sec-Fetch-Site is present and not same-origin', async () => {
  const run = async (headers, path = '/api/out?provider=seatgeek&showId=x') => {
    let reached = false;
    const response = await middleware({
      request: new Request(`https://tourticketcompare.com${path}`, { headers }),
      env: {},
      next: async () => { reached = true; return new Response('redirect'); }
    });
    return { response, reached };
  };
  for (const site of ['none', 'cross-site', 'same-site', ' None ']) {
    const { response, reached } = await run({ 'Sec-Fetch-Site': site });
    assert.equal(response.status, 403, site);
    assert.equal(reached, false, `${site} never reaches the redirect`);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
  // Trailing-slash spelling is refused too.
  assert.equal((await run({ 'Sec-Fetch-Site': 'none' }, '/api/out/?provider=seatgeek')).response.status, 403);
  // Real clicks (same-origin) and browsers that send no Sec-Fetch header pass.
  for (const headers of [{ 'Sec-Fetch-Site': 'same-origin' }, { 'Sec-Fetch-Site': 'SAME-ORIGIN' }, {}]) {
    const { response, reached } = await run(headers);
    assert.equal(reached, true, JSON.stringify(headers));
    assert.equal(response.status, 200);
  }
  // Other API paths are not affected by a cross-site header.
  const analytics = await run({ 'Sec-Fetch-Site': 'cross-site' }, '/api/analytics');
  assert.equal(analytics.reached, true);
});
