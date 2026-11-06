import assert from 'node:assert/strict';
import { officialEventMetadata, eventEndDate, organizerNames, ticketLimitFromText, genreFromClassifications, buyingFacts } from '../functions/_event-metadata.js';
import { snapshotFields } from './lib/tm-event-snapshot.mjs';
const source = { promoters: [{ name: 'Official Promoter' }, { name: 'Official Promoter' }], dates: { start: { dateTime: '2026-10-20T18:00:00Z' }, end: { dateTime: '2026-10-20T21:00:00Z', approximate: false, noSpecificTime: false } }, sales: { public: { endDateTime: '2026-10-20T20:00:00Z' } } };
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

for (const qualifiers of [{ approximate: true, noSpecificTime: false }, { approximate: false, noSpecificTime: true }, {}]) {
  const dates = { ...source.dates, end: { dateTime: source.dates.end.dateTime, ...qualifiers } };
  assert.equal(officialEventMetadata(snapshotFields({ dates })).end_datetime_iso, undefined);
}

// Execute the browser's actual formatter and metadata block in a viewer zone
// where parsing a naive New York start as local would incorrectly hide the end.
const { readFile } = await import('node:fs/promises');
const app = await readFile(new URL('../public/app.js', import.meta.url), 'utf8');
const browserFunctions = ['venueDateParts', 'formatShowDate', 'showLocalTime'].map((name) => {
  const source = app.match(new RegExp(`function ${name}\\([^]*?\\n\\}`))?.[0];
  assert.ok(source, `browser defines ${name}`);
  return source;
}).join('\n');
const block = app.match(/  \/\/ Organizer names stay in structured data only[\s\S]*?(?=  \/\/ Keep in sync with rescheduledHtml)/)?.[0];
assert.ok(block, 'browser defines official metadata rendering');
const render = new Function('show', 'body', 'text', `${browserFunctions}\n${block}`);
const savedTimezone = process.env.TZ;
try {
  process.env.TZ = 'America/Los_Angeles';
  for (const [end, clock] of [['2026-10-21T02:00:00Z', '10:00 PM'], ['2026-10-21T04:00:00Z', '12:00 AM']]) {
    const lines = [];
    render({ dateTimeISO: '2026-10-20T19:00:00', timezone: 'America/New_York', end_datetime_iso: end, organizer_names: ['LIVE NATION MUSIC'] }, {}, (_body, _tag, line) => lines.push(line));
    assert.ok(!lines.some((line) => line.startsWith('Organizer:')), 'browser card shows no promoter account label');
    assert.ok(lines.some((line) => line.startsWith('Ends:') && line.includes(clock)), `browser retains venue-aware ${clock} ending`);
  }
} finally {
  if (savedTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = savedTimezone;
}
console.log('PASS qualified ends, Pacific viewer rendering and explicit midnight endings');

for (const name of ['PROMOTED BY VENUE', 'promoter not defined', ' MISCELLANEOUS   PROMOTER ', 'DO NOT USE', 'MONDIAL PRICE 1', 'CHARLI XCX OFFICIAL MAILING LIST (WARNER MUSIC GROUP)', 'LIVE NATION UK FOR ARTIST, TOUR, FESTIVAL AND PRESALE NEWS']) {
  assert.deepEqual(officialEventMetadata(snapshotFields({ promoters: [{ name }] })), {}, `withhold account label ${name}`);
  assert.deepEqual(organizerNames([name, 'Live Nation']), ['Live Nation'], 'retain independently named co-organizers');
}
console.log('PASS anonymous/internal promoter labels never become organizations');

const artistVenueSource = snapshotFields({ promoters: [{ name: 'FONTAINES D.C.' }, { name: 'CO-OP LIVE' }, { name: 'SJM LIMITED' }], _embedded: { attractions: [{ name: 'Fontaines D.C.' }], venues: [{ name: 'Co-op Live' }] } });
assert.deepEqual(officialEventMetadata(artistVenueSource, { artist_name: 'Fontaines D.C.', venue: 'Co-op Live' }), { organizer_names: ['SJM LIMITED'] });
assert.deepEqual(organizerNames(['OASIS', 'Melkweg', 'SJM'], ['Oasis', 'Mélkweg']), ['SJM']);
console.log('PASS artist/venue identities are withheld while independent co-organizers remain');

// Buying facts (owner pick 2026-11-06), from real Discovery wording.
assert.equal(ticketLimitFromText('There is a 4 Ticket Limit on this event'), 4);
assert.equal(ticketLimitFromText('Please note: There is a ticket limit of 4 tickets per person and per credit card on this event.'), 4);
assert.equal(ticketLimitFromText('Please note: There is a ticket limit of 20 tickets per person and per credit card on this event. Raiders PSL Member Presale has a ticket limit of 4'), null, 'two different limits are not one limit');
assert.equal(ticketLimitFromText('Tickets are limited to 8 tickets per household.'), 8);
assert.equal(ticketLimitFromText('There is an overall 6 ticket limit for this event.'), 6);
assert.equal(ticketLimitFromText('Limit 999 tickets'), null);
assert.equal(ticketLimitFromText('No limit stated'), null);
assert.equal(ticketLimitFromText(null), null);
const music = (genre, extra = {}) => ({ primary: true, segment: { name: 'Music' }, genre: { name: genre }, ...extra });
assert.equal(genreFromClassifications([music('Rock')]), 'Rock');
assert.equal(genreFromClassifications([music('R&B')]), 'R&B');
assert.equal(genreFromClassifications([music('Undefined')]), '');
assert.equal(genreFromClassifications([{ ...music('Rock'), segment: { name: 'Sports' } }]), '');
assert.equal(genreFromClassifications([music('Rock'), music('Pop')]), '', 'two primaries are ambiguous');
assert.equal(genreFromClassifications([music('<b>Rock</b>')]), '');
assert.deepEqual(buyingFacts({}), {}, 'an older snapshot without the fields changes nothing');
assert.deepEqual(buyingFacts(snapshotFields({ ticketLimit: { info: 'There is a 4 Ticket Limit on this event' }, ageRestrictions: { legalAgeEnforced: true }, classifications: [music('Country')], pleaseNote: 'free text is not kept' })), { ticket_limit: 4, legal_age_enforced: true, genre: 'Country' });
assert.deepEqual(buyingFacts(snapshotFields({ ticketLimit: { info: 'Call the box office' }, ageRestrictions: { legalAgeEnforced: false }, classifications: [] })), { ticket_limit: null, legal_age_enforced: null, genre: null }, 'present fields without a usable value clear stored facts');
assert.equal(snapshotFields({ pleaseNote: 'x', info: 'y' }).pleaseNote, undefined, 'snapshot keeps no free-text notes');
assert.deepEqual(officialEventMetadata(snapshotFields({ ticketLimit: { info: 'There is a 6 Ticket Limit on this event' } })), { ticket_limit: 6 });
console.log('PASS ticket limit, legal-age and genre facts: single stated limit only, explicit true only, primary music genre only, absent fields preserved');
