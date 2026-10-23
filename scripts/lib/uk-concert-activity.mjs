// Internal research only. Pure calculations over dated observations; no API,
// publication, affiliate or production-data writes. Only the 2027 UK report.
import { eventInstantMs, eventLocalDateIso } from './event-local-date.mjs';
import { normalizeCountry, metroCity } from '../../functions/_cities.js';
import { eventLifecycleHeld } from '../../functions/_route-indexability.js';
import { nonPerformanceMarkers } from '../../functions/_event-pages.js';

export const REPORT_ID = 'uk-concert-activity-2027';
export const MAX_OBSERVATION_AGE_DAYS = 14;
const DAY = 86400000;
const text = (value) => typeof value === 'string' ? value.trim() : '';
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const key = (value) => text(value).normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
const unique = (values) => [...new Set(values)].sort(compare);

// Recognized English country labels in the MVP's existing TTC inputs. Keep
// this explicit so ICU version changes cannot alter exclusion accounting.
// Adapters supply canonical names; new/unresolved labels remain reviewable
// until confirmed, rather than being assumed to describe a non-UK location.
const countryNames = new Set([
  'Australia', 'Austria', 'Belgium', 'Canada', 'Czech Republic', 'Czechia',
  'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Italy', 'Mexico',
  'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Singapore', 'South Africa',
  'Spain', 'Sweden', 'Switzerland', 'United Arab Emirates', 'United Kingdom', 'United States',
].map(key));
const countryResolved = (value) => countryNames.has(key(value));

export function validDay(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

function validInstant(value) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-](\d{2}):?(\d{2}))$/.exec(text(value));
  return !!match && validDay(match[1]) && +match[2] < 24 && +match[3] < 60 && +match[4] < 60 &&
    (match[5] === 'Z' || (+match[6] < 24 && +match[7] < 60)) && Number.isFinite(Date.parse(value));
}

function sourceUrlValid(value, hosts) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.includes(url.hostname) &&
      !url.username && !url.password && !url.port && !url.search && !url.hash;
  } catch { return false; }
}

export const TTC_RESEARCH_SOURCE = Object.freeze({
  id: 'ttc-reviewed-catalogue',
  attribution: 'TTC reviewed catalogue; original event evidence: Ticketmaster',
  allowed_hosts: ['www.ticketmaster.co.uk', 'www.ticketmaster.com', 'ticketmaster.co.uk', 'ticketmaster.com', 'www.ticketmaster.ie', 'ticketmaster.ie'],
  internal_analysis_permitted: true,
  public_research_rights: 'not_established',
  coverage: 'Selected TTC music artists and reviewed events, not a country-wide feed.',
  observation_basis: 'Stored event last_verified_at (day precision), not a fresh API check. Record verification is separate from provider-link CTA flags.',
});

// Adapter for the existing catalogue. Another permitted source can supply the
// same small observation shape without writing to TTC's discovery catalogue.
// No time or fresh check is inferred from a URL or artist name. The catalogue's
// music-artist scope supplies only the disclosed provisional classification.
export function ttcResearchObservations(events, artists) {
  const registry = new Map(artists.filter((a) => a && text(a.slug) && text(a.name)).map((a) => [a.slug, a.name]));
  return events.map((event) => {
    const e = event && typeof event === 'object' ? event : {};
    const tm = e.provider_links?.ticketmaster;
    const rawDate = text(e.datetime_iso);
    // The shared resolver can parse JS rollover dates; research rejects those
    // before resolving the venue-local day. Naive/time-TBA dates stay unknown.
    const instant = validInstant(rawDate) ? eventInstantMs(e) : null;
    const sourceId = text(e.ticketmaster_event_id);
    const url = text(e.source_url);
    let urlId = '';
    try { urlId = new URL(url).pathname.match(/\/event\/([^/]+)\/?$/i)?.[1] || ''; } catch { /* rejected below */ }
    return {
      record_id: text(e.id), source: TTC_RESEARCH_SOURCE.id, source_event_id: sourceId,
      source_url: url, observed_at: text(e.last_verified_at), observation_precision: 'day',
      verified: ['human_verified', 'machine_high_confidence'].includes(e.verification_status) &&
        e.source_type === 'ticketmaster' &&
        text(tm?.event_id) === sourceId && !!sourceId && urlId.toLowerCase() === sourceId.toLowerCase() &&
        url === text(e.ticketmaster_url) && url === text(tm?.url),
      country: normalizeCountry(text(e.country)), raw_city: text(e.city),
      city: metroCity(text(e.city), text(e.country)), venue: text(e.venue),
      artist_id: text(e.artist_slug), artist_name: registry.get(e.artist_slug) || '',
      event_name: text(e.event_name), starts_at: instant === null ? '' : new Date(instant).toISOString(),
      local_date: instant === null ? '' : eventLocalDateIso(e),
      // Classification is catalogue-based, explicitly disclosed in the report.
      kind: registry.has(e.artist_slug) && text(e.event_name) &&
        !nonPerformanceMarkers(e).length &&
        !/\b(festival|weekend|multi[ -]?day|season pass|venue premium|premium priced seat|premium suite|upgrade)\b/i.test(e.event_name)
        ? 'concert' : 'unconfirmed_or_non_concert',
      status: eventLifecycleHeld(e) ? 'held' :
        ['announced', 'on-sale'].includes(e.status) ? 'scheduled' : 'unknown',
    };
  });
}

function observationTime(row) {
  if (row.observation_precision === 'day' && validDay(row.observed_at)) return Date.parse(row.observed_at);
  if (row.observation_precision === 'instant' && validInstant(row.observed_at)) return Date.parse(row.observed_at);
  return null;
}

const performanceKey = (row) => JSON.stringify([key(row.country), key(row.city), key(row.venue), new Date(row.starts_at).toISOString()]);
const evidenceKey = (row) => JSON.stringify([row.source, row.source_event_id]);
const rowOrder = (a, b) => compare(JSON.stringify(a), JSON.stringify(b));

/** Source-agnostic observation calculation; all permissions and time supplied.
 * Returns an internal report even for zero eligible events. Never a public gate.
 */
export function buildUkConcertActivity(observations, { snapshotAt, sources }) {
  if (!validInstant(snapshotAt)) throw new Error('snapshotAt must be an explicit ISO instant');
  if (!Array.isArray(observations) || !Array.isArray(sources)) throw new Error('observations and sources must be arrays');
  const sourceMap = new Map();
  for (const source of sources) {
    if (!text(source?.id) || sourceMap.has(source.id) || !Array.isArray(source.allowed_hosts)) throw new Error('Invalid or duplicate source');
    sourceMap.set(source.id, source);
  }
  const now = Date.parse(snapshotAt);
  const excluded = new Map();
  const decisions = [];
  const reject = (row, reason, detail = {}) => {
    excluded.set(reason, (excluded.get(reason) || 0) + 1);
    // Outside-scope rows have summary counts only. Unresolved UK dates remain
    // reviewable instead of silently being assumed outside the target year.
    if (!['outside_uk', 'outside_2027'].includes(reason)) decisions.push({
      record_id: text(row.record_id), source: text(row.source), source_event_id: text(row.source_event_id),
      observed_at: text(row.observed_at), reason, ...detail,
    });
  };
  // Resolve repeated source IDs BEFORE eligibility. A newer cancellation or
  // invalid observation cannot fall back to an older eligible record.
  const groups = new Map();
  for (const raw of observations) {
    const row = raw && typeof raw === 'object' ? raw : {};
    const id = text(row.source_event_id) ? evidenceKey(row) : JSON.stringify(['missing', row]);
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(row);
  }
  const candidates = [];
  for (const rows of groups.values()) {
    rows.sort((a, b) => (observationTime(b) ?? Infinity) - (observationTime(a) ?? Infinity) || rowOrder(a, b));
    const chosen = rows[0];
    const latest = rows.filter((row) => observationTime(row) === observationTime(chosen));
    const signature = (row) => JSON.stringify([
      row.source, row.source_event_id, row.source_url, row.observed_at, row.observation_precision,
      row.verified, row.country, row.raw_city, row.city, row.venue, row.artist_id,
      row.artist_name, row.event_name, row.starts_at, row.local_date, row.kind, row.status,
    ]);
    const conflict = new Set(latest.map(signature)).size > 1;
    for (const row of rows.slice(conflict ? 0 : 1)) reject(row, conflict ? 'conflicting_source_observations' : 'duplicate_source_event', { retained_record_id: conflict ? null : chosen.record_id });
    if (!conflict) candidates.push(chosen);
  }
  const performances = new Map();
  for (const row of candidates.sort(rowOrder)) {
    const source = sourceMap.get(row.source);
    const observed = observationTime(row);
    let reason = '';
    if (!countryResolved(row.country)) reason = 'unresolved_country';
    else if (key(row.country) !== 'united kingdom') reason = 'outside_uk';
    else if (validDay(row.local_date) && !row.local_date.startsWith('2027-')) reason = 'outside_2027';
    else if (!source || source.internal_analysis_permitted !== true) reason = 'source_not_permitted';
    else if (!text(row.record_id) || !text(row.source_event_id) || !sourceUrlValid(row.source_url, source.allowed_hosts)) reason = 'invalid_provenance';
    else if (row.verified !== true) reason = 'unverified';
    else if (observed === null || observed > now) reason = 'invalid_observation_date';
    else if (now - observed > MAX_OBSERVATION_AGE_DAYS * DAY) reason = 'stale_observation';
    else if (row.status !== 'scheduled') reason = 'held_or_unknown_status';
    else if (row.kind !== 'concert') reason = 'unconfirmed_or_non_concert';
    else if (![row.city, row.raw_city, row.venue, row.artist_id, row.artist_name, row.event_name].every((v) => text(v))) reason = 'missing_identity_or_location';
    else if (!validDay(row.local_date) || !validInstant(row.starts_at) || Date.parse(row.starts_at) <= now ||
      Math.abs(Date.parse(row.local_date) - Date.parse(row.starts_at)) > 2 * DAY) reason = 'invalid_event_date';
    if (reason) { reject(row, reason); continue; }
    const id = performanceKey(row);
    if (!performances.has(id)) performances.set(id, []);
    performances.get(id).push(row);
  }
  const supportingEvents = [...performances.values()].map((rows) => {
    rows.sort(rowOrder);
    const row = rows[0];
    for (const duplicate of rows.slice(1)) reject(duplicate, 'duplicate_performance', { retained_record_id: row.record_id });
    return {
      city: row.city, raw_city_labels: unique(rows.map((r) => r.raw_city)), venue: row.venue,
      local_date: row.local_date, starts_at: new Date(row.starts_at).toISOString(),
      artists: unique(rows.map((r) => r.artist_name)), artist_ids: unique(rows.map((r) => r.artist_id)),
      event_names: unique(rows.map((r) => r.event_name)),
      evidence: rows.map((r) => ({ record_id: r.record_id, source: r.source, source_event_id: r.source_event_id,
        source_url: r.source_url, observed_at: r.observed_at, observation_precision: r.observation_precision })),
    };
  }).sort((a, b) => compare(a.starts_at, b.starts_at) || rowOrder(a, b));
  const cityMap = new Map();
  for (const event of supportingEvents) {
    const id = key(event.city);
    if (!cityMap.has(id)) cityMap.set(id, { city: event.city, concert_count: 0, venues: new Set(), artists: new Set() });
    const city = cityMap.get(id);
    // Use one recorded label for every supporting row in the same group, so
    // editors can reproduce the ranking with an ordinary group-by-city.
    event.city = city.city;
    city.concert_count += 1;
    city.venues.add(key(event.venue));
    event.artist_ids.forEach((id) => city.artists.add(id));
  }
  const rankings = [...cityMap.values()].sort((a, b) => b.concert_count - a.concert_count || compare(a.city, b.city))
    .map(({ venues, artists, ...row }) => ({ ...row, venue_count: venues.size, artist_count: artists.size }));
  rankings.forEach((row, i) => { row.rank = i && row.concert_count === rankings[i - 1].concert_count ? rankings[i - 1].rank : i + 1; });
  const observedDates = supportingEvents.flatMap((e) => e.evidence.map((r) => r.observed_at)).sort(compare);
  const limitations = [
    'Selected TTC artist coverage is not the UK concert market. Unrepresented cities are unobserved, not zero-concert cities.',
    'Counts describe recorded scheduled performances in 2027, known at the repository snapshot; they are not announcements made during 2027, attendance, demand, inventory or affordability.',
    'Classification uses the reviewed music-artist catalogue and conservative title exclusions, not a provider concert taxonomy. Festivals, multi-day and uncertain products are excluded; manual classification review is still needed.',
    'City labels reuse TTC location normalization, not official city boundaries or population areas. No new geographic or regional assignments are inferred.',
    'Deduplication uses source IDs, then normalized city, venue and exact start instant. Venue aliases and differing doors/start times can leave duplicates; same-time listings at a venue collapse conservatively.',
    'Stored verification dates are day precision and are not current live API checks. Every counted observation must be at most 14 days old at the snapshot; time-TBA and unresolved dates are excluded.',
    'Research publication, redistribution and archive rights are not established. Output is for internal review only; no feed data was collected or retained.',
  ];
  return {
    schema_version: 1, report_id: REPORT_ID,
    title: 'UK cities with the most announced concerts for 2027 — TTC catalogue sample (internal prototype)',
    snapshot_at: snapshotAt, snapshot_basis: 'Repository inspection; not a simultaneous live provider check',
    scope: { country: 'United Kingdom', venue_local_year: 2027, counting_unit: 'Distinct scheduled concert performance', max_observation_age_days: MAX_OBSERVATION_AGE_DAYS },
    publication: { status: 'internal_only', blockers: ['Insufficient UK geographic and artist coverage', 'Research publication and retention rights not established', 'Concert classification and city boundaries require editorial validation'] },
    sources: sources.slice().sort((a, b) => compare(a.id, b.id)),
    coverage: {
      input_observations: observations.length,
      uk_input_observations: observations.filter((r) => key(r?.country) === 'united kingdom').length,
      uk_2027_dated_observations: observations.filter((r) => key(r?.country) === 'united kingdom' && validDay(r?.local_date) && r.local_date.startsWith('2027-')).length,
      uk_unresolved_date_observations: observations.filter((r) => key(r?.country) === 'united kingdom' && !validDay(r?.local_date)).length,
      counted_concerts: supportingEvents.length,
      represented_cities: rankings.length, represented_artists: unique(supportingEvents.flatMap((e) => e.artist_ids)).length,
      represented_venues: unique(supportingEvents.map((e) => JSON.stringify([key(e.city), key(e.venue)]))).length,
      oldest_counted_observation: observedDates[0] || null, newest_counted_observation: observedDates.at(-1) || null,
      uk_market_coverage_percent: null, excluded_observations: Object.fromEntries([...excluded].sort(([a], [b]) => compare(a, b))),
    },
    headline: rankings.length ? `Within this TTC catalogue sample, ${rankings.filter((r) => r.rank === 1).map((r) => r.city).join(' and ')} ${rankings.filter((r) => r.rank === 1).length > 1 ? 'jointly lead' : 'leads'} with ${rankings[0].concert_count} recorded 2027 concerts.` : 'No eligible 2027 UK concerts in this snapshot; no ranking claim is supported.',
    rankings,
    methodology: [
      'Read the pinned repository revision and record SHA-256 hashes of both inputs. Keep the snapshot time separate from original observation dates.',
      'Resolve repeated source IDs using the latest observation before eligibility; conflicting equal-time observations are withheld. An invalid observation date blocks fallback to an older row.',
      'Count only permitted, verified UK concert observations with complete provenance, artist, venue, city, exact start and venue-local 2027 date; exclude held/unknown statuses and each stale or future-dated observation.',
      'Collapse identical city/venue/start performances, retaining all eligible source evidence. Count separate dates and same-day performances with different start instants separately.',
      'Rank by distinct concert count descending; ties share competition rank (1, 1, 3) and sort by city using fixed code-point order. All supporting events and exclusions are supplied for verification.',
    ],
    limitations,
    regional_pr_angles: rankings.map((row) => ({ city: row.city, status: 'internal_candidate_do_not_pitch',
      angle: row.artist_count === 1
        ? `${row.city}: one tracked artist accounts for this sample's ${row.concert_count} performances. Explore the confirmed run of dates with the venue before developing a local programme story.`
        : `${row.city}: a local 2027 concert-planning story could examine the ${row.concert_count} recorded performances from ${row.artist_count} artists across ${row.venue_count} venues in this TTC sample. Verify the programme with those venues.`,
      caveat: 'No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.',
    })),
    supporting_events: supportingEvents, decisions: decisions.sort(rowOrder),
  };
}

// Text stays local under reports/, never blog/content or public/.
export function renderUkConcertActivity(report) {
  const cell = (value) => String(value ?? '').replace(/[\r\n]/g, ' ').replace(/\|/g, '\\|').replace(/[<>]/g, '');
  const bullets = (rows) => rows.map((row) => `- ${row}`).join('\n');
  return `# ${report.title}\n\nINTERNAL ONLY — not cleared for publication or outreach.\n\nSnapshot: ${report.snapshot_at}. ${report.snapshot_basis}.\n\n${report.headline}\n\n## Ranking within the source sample\n\n| Rank | City label | Concerts | Artists | Venues |\n| --- | --- | --- | --- | --- |\n${report.rankings.map((r) => `| ${r.rank} | ${cell(r.city)} | ${r.concert_count} | ${r.artist_count} | ${r.venue_count} |`).join('\n')}\n\n## Coverage\n\n${bullets(Object.entries(report.coverage).filter(([k]) => k !== 'excluded_observations').map(([k, v]) => `${k}: ${v ?? 'unknown / not measured'}`))}\n\nExcluded observations (one disposition per input row):\n\n${bullets(Object.entries(report.coverage.excluded_observations).map(([k, v]) => `${k}: ${v}`))}\n\n## Sources and observation dates\n\n${bullets(report.sources.map((s) => `${s.attribution}. ${s.coverage} ${s.observation_basis}`))}\n\n## Methodology\n\n${bullets(report.methodology)}\n\n## Limitations and release blockers\n\n${bullets(report.limitations)}\n\n${bullets(report.publication.blockers)}\n\n## Supporting data\n\nEvery counted performance is below; report.json includes source IDs, raw city labels, observation precision and excluded-record decisions.\n\n| Local date | City | Venue | Artist | Source record | Observed |\n| --- | --- | --- | --- | --- | --- |\n${report.supporting_events.flatMap((e) => e.evidence.map((p) => `| ${e.local_date} | ${cell(e.city)} | ${cell(e.venue)} | ${cell(e.artists.join(', '))} | [${cell(p.record_id)}](${p.source_url}) | ${cell(p.observed_at)} (${p.observation_precision}) |`)).join('\n')}\n\n## Possible local PR angles — withheld\n\n${bullets(report.regional_pr_angles.map((a) => `${a.angle} ${a.caveat}`)) || 'No eligible city angle.'}\n\n## Reproduce and verify\n\nInput revision: ${report.inputs.revision}\n\n${bullets(report.inputs.files.map((f) => `${f.path}: SHA-256 ${f.sha256}`))}\n\n\`npm run research:uk-concerts -- --revision ${report.inputs.revision} --snapshot-at ${report.snapshot_at} --output /tmp/ttc-uk-concert-review\`\n\nReview report.json, group supporting_events by city and count performances; compare those totals with rankings. Check excluded decisions against the pinned source records. A later snapshot may exclude older observations; a rerun does not reverify them.\n`;
}
