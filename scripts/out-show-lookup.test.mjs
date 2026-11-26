// /api/out showId lookup: reading the small events-index + per-artist partition
// instead of the 18 MB events.json must not change any redirect, Sub ID or
// analytics row. Compares the new lookup against the full-file fallback (which
// is the previous behaviour) on real data.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { onRequestGet } from '../functions/api/out.js';

const dataUrl = (p) => new URL(`../public${p}`, import.meta.url);
const read = (p) => readFileSync(dataUrl(p), 'utf8');
const events = JSON.parse(read('/data/events.json'));

test('every event is identical in its artist partition', () => {
  const partitions = new Map();
  for (const event of events) {
    if (!partitions.has(event.artist_slug)) partitions.set(event.artist_slug, JSON.parse(read(`/data/events/${event.artist_slug}.json`)));
    const match = partitions.get(event.artist_slug).filter((candidate) => candidate.id === event.id);
    assert.equal(match.length, 1, `${event.id} appears once in its partition`);
    assert.deepEqual(match[0], event, `${event.id} matches events.json`);
  }
  const index = JSON.parse(read('/data/events-index.json'));
  assert.equal(index.length, events.length);
  const byId = new Map(index.map((row) => [row.id, row.artist_slug]));
  for (const event of events) assert.equal(byId.get(event.id), event.artist_slug, `${event.id} indexed under its artist`);
});

function assets({ partial }) {
  const calls = [];
  return {
    calls,
    fetch: async (request) => {
      const pathname = new URL(request.url).pathname;
      calls.push(pathname);
      if (partial && pathname !== '/data/events.json' && pathname !== '/data/artists.json') return new Response('', { status: 404 });
      try { return new Response(read(pathname), { headers: { 'content-type': 'application/json' } }); } catch { return new Response('', { status: 404 }); }
    }
  };
}

function db() {
  const sqlite = new DatabaseSync(':memory:');
  for (const file of ['0001_demand', '0002_analytics_click_fields', '0008_analytics_commercial_funnel', '0009_impact_reconciliation_eligibility']) {
    sqlite.exec(readFileSync(new URL(`../migrations/${file}.sql`, import.meta.url), 'utf8'));
  }
  return sqlite;
}

async function click(event, provider, assetsMock) {
  const sqlite = db();
  const env = {
    DEMAND_DB: { prepare: (sql) => ({ bind: (...values) => ({ run: async () => sqlite.prepare(sql.replace(/\?\d+/g, '?')).run(...values) }) }) },
    ASSETS: assetsMock,
    IMPACT_SEATGEEK_BASE_TRACKING_URL: 'https://seatgeek.pxf.io/c/1234/5678/9012',
    OUT_CLICK_ID_SUBID_ENABLED: 'true'
  };
  const request = new Request(`https://tourticketcompare.com/api/out?showId=${encodeURIComponent(event.id)}&provider=${provider}&sourcePath=/artists/${event.artist_slug}&ctaLocation=event_card`, {
    headers: { 'user-agent': 'Mozilla/5.0', 'cf-connecting-ip': '203.0.113.7', 'sec-fetch-user': '?1' }
  });
  const response = await onRequestGet({ request, env });
  const rows = sqlite.prepare('SELECT * FROM analytics_events ORDER BY event_name').all();
  sqlite.close();
  const clickIds = new Set(rows.map((row) => row.click_id).filter(Boolean));
  const mask = (value) => { let text = String(value ?? ''); for (const id of clickIds) text = text.split(id).join('<click-id>'); return text; };
  return {
    status: response.status,
    location: mask(response.headers.get('Location')),
    body: response.status === 302 ? '' : await response.text(),
    rows: rows.map((row) => Object.fromEntries(Object.entries(row).filter(([key]) => !['id', 'click_id', 'created_at'].includes(key)).map(([key, value]) => [key, mask(value)])))
  };
}

test('sampled showId redirects, Sub IDs and analytics rows are identical to the full-file lookup', async () => {
  const withSeatGeek = events.filter((event) => event.seatgeek_url || event.provider_links?.seatgeek?.url);
  const sample = [
    ...events.filter((_, index) => index % 400 === 0),
    ...withSeatGeek.filter((_, index) => index % 300 === 0)
  ];
  assert.ok(sample.length >= 20);
  let redirects = 0;
  for (const event of sample) {
    for (const provider of ['ticketmaster', 'seatgeek']) {
      const fast = assets({ partial: false });
      const full = assets({ partial: true });
      const a = await click(event, provider, fast);
      const b = await click(event, provider, full);
      assert.deepEqual(a, b, `${event.id} ${provider}`);
      assert.ok(!fast.calls.includes('/data/events.json'), 'the 18 MB file is not read when the partition has the event');
      if (a.status === 302) redirects += 1;
    }
  }
  assert.ok(redirects >= 20, `exercised ${redirects} real redirects`);
});

test('a missing partition or unknown id falls back to the full file', async () => {
  const event = events.find((candidate) => candidate.provider_links?.ticketmaster || candidate.ticketmaster_url) || events[0];
  const noPartition = { calls: [], fetch: async (request) => { const p = new URL(request.url).pathname; noPartition.calls.push(p); return p.startsWith('/data/events/') ? new Response('', { status: 404 }) : (() => { try { return new Response(read(p)); } catch { return new Response('', { status: 404 }); } })(); } };
  const a = await click(event, 'ticketmaster', noPartition);
  const b = await click(event, 'ticketmaster', assets({ partial: true }));
  assert.deepEqual(a, b);
  assert.ok(noPartition.calls.includes('/data/events.json'));
  const ghost = { id: 'tm-nobody-2099-nowhere-0000', artist_slug: 'nobody' };
  const unknownFast = await click(ghost, 'ticketmaster', assets({ partial: false }));
  const unknownFull = await click(ghost, 'ticketmaster', assets({ partial: true }));
  assert.deepEqual(unknownFast, unknownFull);
  assert.notEqual(unknownFast.status, 302);
});
