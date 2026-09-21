import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { onRequestGet } from '../functions/api/out.js';
import {
  buildAttributionStatements, buildD1Statements, indexClickRows,
  matchSubIdAttribution, normalizeAction, assertReadOnlySql
} from './report-affiliate-performance.mjs';

const event = {
  id: 'tm-test-artist-2026-berlin-abc123', artist_slug: 'test-artist',
  city: 'Berlin', venue: 'Test Arena', datetime_iso: '2026-11-19T19:00:00+01:00',
  verification_status: 'human_verified', ticketmaster_event_id: 'ABC123',
  ticketmaster_url: 'https://www.ticketmaster.de/test-artist-berlin/event/ABC123',
  seatgeek_url: 'https://seatgeek.com/test-artist-tickets/concert/9876543',
  provider_links: { ticketmaster: { verified: true }, seatgeek: { verified: true } }
};
const campaigns = new Map([['9012', 'seatgeek'], ['2322', 'ticketnetwork']]);
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
  const request = (query = `showId=${event.id}&provider=seatgeek&sourcePath=/cities/berlin-germany&ctaLocation=event_card`) =>
    new Request(`https://tourticketcompare.com/api/out?${query}`, { headers: { 'user-agent': 'Mozilla/5.0', 'cf-connecting-ip': '203.0.113.7' } });
  return { db, env, request };
}
function lookup(db, actions) {
  return indexClickRows(buildAttributionStatements(actions).flatMap(statement => {
    assertReadOnlySql(statement.sql);
    return db.prepare(statement.sql).all();
  }));
}

test('redirect → one stored click → eligible same-provider action with commercial dimensions', async () => {
  const { db, env, request } = fixture();
  try {
    const response = await onRequestGet({ request: request(), env });
    assert.equal(response.status, 302);
    const url = new URL(response.headers.get('Location'));
    assert.equal(url.origin + url.pathname, env.IMPACT_SEATGEEK_BASE_TRACKING_URL);
    assert.equal(url.searchParams.get('u'), event.seatgeek_url);
    const rows = db.prepare("SELECT * FROM analytics_events WHERE event_name = 'outbound_click'").all();
    assert.equal(rows.length, 1);
    const click = rows[0];
    assert.equal(url.searchParams.get('subId1'), click.click_id);
    assert.equal(click.impact_reconciliation_eligible, 1);
    assert.equal(click.is_affiliate, 1);
    assert.ok(Number.isFinite(Date.parse(click.created_at)));
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM analytics_events WHERE event_name = 'outbound_attempt' AND click_id = ?").get(click.click_id).n, 1);
    // Action arrives in a later reporting window. The click still joins.
    const actions = [normalizeAction({ Id: 'fixture-action', CampaignId: '9012', SubId1: click.click_id, State: 'PENDING', Payout: '3', Currency: 'USD' })];
    const result = matchSubIdAttribution(actions, lookup(db, actions), campaigns);
    assert.deepEqual(result.matched, [{ actionId: 'fixture-action', state: 'PENDING', payout: 3, currency: 'USD',
      clickId: click.click_id, artistSlug: event.artist_slug, eventId: event.id, provider: 'seatgeek',
      clickedAt: click.created_at, sourcePath: '/cities/berlin-germany', ctaLocation: 'event_card' }]);
    const totals = db.prepare(buildD1Statements({ since: '2099-01-01T00:00:00.000Z', until: '2099-02-01T00:00:00.000Z' })[0].sql).all();
    assert.equal(totals.length, 0, 'activity totals retain their own window');
    const currentTotals = db.prepare(buildD1Statements({})[0].sql).all();
    assert.equal(currentTotals[0].clicks, 1);
    assert.equal(currentTotals[0].eligible_clicks, 1);
  } finally { db.close(); }
});

test('default-off and direct redirects still work; unsafe destinations never get a success row', async () => {
  const { db, env, request } = fixture();
  try {
    const response = await onRequestGet({ request: request(), env: { ...env, OUT_CLICK_ID_SUBID_ENABLED: 'false' } });
    assert.equal(response.status, 302);
    assert.equal(new URL(response.headers.get('Location')).searchParams.has('subId1'), false);
    const click = db.prepare("SELECT * FROM analytics_events WHERE event_name = 'outbound_click'").get();
    const actions = [normalizeAction({ Id: 'not-propagated', CampaignId: '9012', SubId1: click.click_id })];
    const result = matchSubIdAttribution(actions, lookup(db, actions), campaigns);
    assert.equal(result.matched.length, 0);
    assert.equal(result.coverage.not_eligible, 1);
    const plain = await onRequestGet({ request: request(`showId=${event.id}&provider=ticketmaster`), env });
    assert.equal(plain.headers.get('Location'), event.ticketmaster_url);
    for (const destination of ['https://evil.example/tickets', 'http://127.0.0.1/private', 'https://seatgeek.com.evil.example/tickets']) {
      const unsafe = await onRequestGet({ request: request(`artistSlug=beyonce&provider=seatgeek&deepLink=${encodeURIComponent(destination)}`), env });
      assert.equal(unsafe.status, 400);
      assert.equal(unsafe.headers.get('Location'), null);
    }
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM analytics_events WHERE event_name = 'outbound_click'").get().n, 2);
  } finally { db.close(); }
});

test('attribution rejects missing, historical, ambiguous and wrong-provider evidence explicitly', () => {
  const id = '0123456789abcdef01234567';
  const click = { click_id: id, provider: 'seatgeek', impact_reconciliation_eligible: 1 };
  const action = normalizeAction({ Id: 'fixture', SubId1: id, CampaignId: '9012' });
  for (const [actions, index, reason] of [
    [[{ ...action, subId1: null }], indexClickRows([click]), 'no_sub_id'],
    [[{ ...action, subId1: "' OR 1=1 --" }], indexClickRows([click]), 'invalid_sub_id'],
    [[action], new Map(), 'click_not_found'],
    [[action], indexClickRows([click, click, click]), 'ambiguous_click_id'],
    [[action], indexClickRows([{ ...click, impact_reconciliation_eligible: null }]), 'not_eligible'],
    [[{ ...action, campaignId: 'unknown' }], indexClickRows([click]), 'campaign_unmapped'],
    [[{ ...action, campaignId: '2322' }], indexClickRows([click]), 'provider_mismatch']
  ]) {
    const result = matchSubIdAttribution(actions, index, campaigns);
    assert.equal(result.matched.length, 0);
    assert.equal(result.coverage[reason], 1, reason);
  }
});

test('indexed lookup batches all IDs beyond 5,000 and ignores unsafe/non-TTC values', () => {
  const actions = Array.from({ length: 5001 }, (_, i) => ({ subId1: i.toString(16).padStart(24, '0') }));
  const statements = buildAttributionStatements([...actions, actions[0], { subId1: "' OR 1=1 --" }]);
  assert.equal(statements.length, 51);
  assert.match(statements.at(-1).sql, new RegExp(actions.at(-1).subId1));
  assert.equal(statements.map(s => s.sql).join('').includes('LIMIT'), false);
  statements.forEach(s => assertReadOnlySql(s.sql));
  assert.deepEqual(buildAttributionStatements([]), []);
});
