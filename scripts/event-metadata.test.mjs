import assert from 'node:assert/strict';
import { officialEventMetadata, eventEndDate, organizerNames } from '../functions/_event-metadata.js';
import { snapshotFields } from './lib/tm-event-snapshot.mjs';
const source = { promoters: [{ name: 'Official Promoter' }, { name: 'Official Promoter' }], dates: { start: { dateTime: '2026-10-20T18:00:00Z' }, end: { dateTime: '2026-10-20T21:00:00Z' } }, sales: { public: { endDateTime: '2026-10-20T20:00:00Z' } } };
assert.deepEqual(officialEventMetadata(snapshotFields(source)), { organizer_names: ['Official Promoter'], end_datetime_iso: '2026-10-20T21:00:00Z' });
assert.deepEqual(officialEventMetadata({ sales: source.sales }), {});
assert.deepEqual(officialEventMetadata({ promoter: { name: 'Single Promoter' } }), { organizer_names: ['Single Promoter'] });
assert.equal(eventEndDate({ datetime_iso: '2026-10-20T18:00:00Z', end_datetime_iso: '2026-10-20T17:00:00Z' }), '');
assert.equal(eventEndDate({ datetime_iso: '2026-10-20T18:00:00Z', end_datetime_iso: '2026-10-20' }), '');
assert.deepEqual(organizerNames(['<script>', 'https://example.com', null, 'Good']), ['Good']);
assert.deepEqual(officialEventMetadata({}), {});
console.log('PASS official metadata projection, exact source fields, deduplication, invalid ends, absent facts and unsafe names');

assert.equal(eventEndDate({ datetime_iso: '2026-10-20T19:00:00', timezone: 'America/New_York', end_datetime_iso: '2026-10-21T02:00:00Z' }), '2026-10-21T02:00:00Z');
assert.equal(eventEndDate({ datetime_iso: '2026-10-20T19:00:00', end_datetime_iso: '2026-10-21T02:00:00Z' }), '');
