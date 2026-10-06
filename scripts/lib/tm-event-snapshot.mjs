// Short-lived transport for the two tracked-event sweeps, never business data.
// Consumers still select their own targets and run their own safety rules.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { presaleNameSafe } from '../../functions/_presales.js';

export const SNAPSHOT_VERSION = 1;
export const SNAPSHOT_MAX_AGE_MS = 6 * 60 * 60 * 1000;
export const SNAPSHOT_ARTIFACT = 'tm-tracked-event-snapshot';
const hash = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const raw = (value) => value ?? null;

// Explicit raw-field projection: includes ALL fields read by either consumer,
// including identity evidence and venue cardinality. Missing source fields stay
// missing/null; nothing is inferred. No API URLs, _links, request headers, or
// price data are persisted. Arrays retain their order and length.
export function snapshotFields(data) {
  if (!object(data)) return null;
  const list = (value, pick) => Array.isArray(value) ? value.map(pick) : null;
  return {
    id: raw(data.id), name: raw(data.name), url: raw(data.url),
    dates: {
      timezone: raw(data.dates?.timezone),
      start: { dateTime: raw(data.dates?.start?.dateTime), localDate: raw(data.dates?.start?.localDate), timeZone: raw(data.dates?.start?.timeZone) },
      status: { code: raw(data.dates?.status?.code) }
    },
    sales: {
      public: { startDateTime: raw(data.sales?.public?.startDateTime) },
      // Named presale windows: name and times only. Descriptions and URLs are
      // never kept, and a window whose name looks like it carries a code or a
      // link is left out here, so the shared artifact never holds one either.
      presales: Array.isArray(data.sales?.presales)
        ? data.sales.presales
          .filter((p) => presaleNameSafe(p?.name))
          .map((p) => ({ name: raw(p?.name), startDateTime: raw(p?.startDateTime), endDateTime: raw(p?.endDateTime) }))
        : null
    },
    _embedded: {
      venues: list(data._embedded?.venues, (v) => ({ name: raw(v?.name), timezone: raw(v?.timezone), city: { name: raw(v?.city?.name) }, country: { name: raw(v?.country?.name) } })),
      attractions: list(data._embedded?.attractions, (a) => ({ name: raw(a?.name) }))
    }
  };
}

export function responseKind(result) {
  if (result.status === 404 || result.status === 410) return 'missing';
  if (result.exists === true && result.status === 200) return 'ok';
  if (result.status === null || result.status === 429 || result.status >= 500) return 'transient_error';
  return 'http_error';
}

// Only known numeric quota headers, never arbitrary headers or credential data.
export function quotaHeaders(headers) {
  const out = {};
  for (const name of ['rate-limit', 'rate-limit-available', 'rate-limit-reset', 'rate-limit-over', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'retry-after']) {
    const value = headers?.get?.(name);
    if (typeof value === 'string' && /^\d{1,16}$/.test(value)) out[name] = value;
  }
  return out;
}

export function safeFetchError(error, timeoutMs) {
  // Network libraries may include the complete URL (and API key) in errors.
  return error?.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : 'network request failed';
}

export function makeSnapshotEntry(eventId, result, fetchedAt, secrets = []) {
  let data = snapshotFields(result.data);
  let exists = result.exists;
  let error = result.error || null;
  // A malformed/mismatched 200 must not become a clean audit or a trusted cache
  // hit. The original sync also refuses these via its identity/review gates.
  if (exists === true && (!data || data.id !== eventId || result.status !== 200)) {
    exists = null; data = null; error = 'unusable or mismatched Discovery response';
  }
  if (secrets.some((secret) => secret && [secret, encodeURIComponent(secret)].some((s) => JSON.stringify(data).includes(s)))) {
    exists = null; data = null; error = 'Discovery response contained credential data';
  }
  // Error text is deliberately bounded to known, secret-free descriptions.
  if (exists === null && !['unusable or mismatched Discovery response', 'Discovery response contained credential data'].includes(error)) {
    error = result.status === null ? 'network request failed' : `HTTP ${result.status}`;
  }
  const entry = { event_id: eventId, fetched_at: fetchedAt, status: result.status, exists, error, data, quota: result.quota || {} };
  entry.kind = responseKind(entry);
  return { ...entry, checksum: hash(entry) };
}

export function usableSnapshotEntry(entry, eventId, now = Date.now()) {
  if (!object(entry) || entry.event_id !== eventId) return false;
  const { checksum, ...record } = entry;
  if (checksum !== hash(record)) return false;
  const at = Date.parse(entry.fetched_at);
  if (!Number.isFinite(at) || at > now || now - at > SNAPSHOT_MAX_AGE_MS) return false;
  if (entry.kind === 'missing') return [404, 410].includes(entry.status) && entry.exists === false && entry.data === null && entry.error === null;
  return entry.kind === 'ok' && entry.status === 200 && entry.exists === true && entry.error === null &&
    object(entry.data) && entry.data.id === eventId && JSON.stringify(entry.data) === JSON.stringify(snapshotFields(entry.data));
}

export function validSnapshot(snapshot, base, now = Date.now()) {
  const at = Date.parse(snapshot?.created_at);
  return object(snapshot) && snapshot.version === SNAPSHOT_VERSION && snapshot.source === hash(base) &&
    snapshot.complete === true && object(snapshot.events) && Array.isArray(snapshot.unresolvable) &&
    Number.isFinite(at) && at <= now && now - at <= SNAPSHOT_MAX_AGE_MS;
}

export async function loadSnapshot(file, base, { now = Date.now(), log = console.warn } = {}) {
  if (!file) return null;
  try {
    const snapshot = JSON.parse(await fs.readFile(file, 'utf8'));
    if (!validSnapshot(snapshot, base, now)) throw new Error('invalid snapshot');
    log(`TM snapshot loaded: ${Object.keys(snapshot.events).length} recorded responses; each entry is checked again at use.`);
    return snapshot;
  } catch {
    log('TM snapshot unavailable/invalid/stale; using existing direct fetches.');
    return null;
  }
}

export function createSnapshotSweep({ base, snapshot = null, now = () => Date.now(), secrets = [] }) {
  const createdAt = new Date(now()).toISOString();
  const recorded = Object.create(null);
  const unresolvable = [];
  const stats = { events_requested: 0, snapshot_reused: 0, in_run_reused: 0, direct_requests: 0, transient_failures: 0, failed_events: 0, snapshot_failed_entries: 0, skipped_past: 0, unresolvable: 0, estimated_calls_saved: 0, quota: {} };
  return {
    stats,
    observeResponse(response) {
      stats.direct_requests += 1;
      if (!response || response.status === 429 || response.status >= 500) stats.transient_failures += 1;
      Object.assign(stats.quota, quotaHeaders(response?.headers));
    },
    unresolvable(event) {
      stats.unresolvable += 1;
      unresolvable.push({ local_event_id: event.id, kind: 'unresolvable', fetched_at: null, status: null });
    },
    async get(eventId, directFetch) {
      stats.events_requested += 1;
      const at = now();
      let entry = recorded[eventId];
      let source = 'in_run';
      if (!usableSnapshotEntry(entry, eventId, at)) {
        entry = validSnapshot(snapshot, base, at) ? snapshot.events[eventId] : null;
        source = 'snapshot';
      }
      if (usableSnapshotEntry(entry, eventId, at)) {
        stats[source === 'snapshot' ? 'snapshot_reused' : 'in_run_reused'] += 1;
      } else {
        if (entry?.exists === null) stats.snapshot_failed_entries += 1;
        source = 'direct';
        const result = await directFetch();
        entry = makeSnapshotEntry(eventId, result, new Date(now()).toISOString(), secrets);
        if (entry.exists === null) stats.failed_events += 1;
      }
      recorded[eventId] = entry;
      stats.estimated_calls_saved = stats.events_requested - stats.direct_requests;
      // A copy prevents a consumer from changing the observation itself.
      return { ...structuredClone(entry), source };
    },
    async write(file) {
      await fs.mkdir(path.dirname(file), { recursive: true });
      const output = { version: SNAPSHOT_VERSION, source: hash(base), created_at: createdAt, complete: true, producer_run_id: process.env.GITHUB_RUN_ID || null, events: recorded, unresolvable, stats };
      await fs.writeFile(`${file}.tmp`, JSON.stringify(output));
      await fs.rename(`${file}.tmp`, file);
    }
  };
}

export async function reportSnapshotStats(stats) {
  console.log(`TM requests: ${JSON.stringify(stats)}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `\n### Ticketmaster tracked-event requests\n\n${Object.entries(stats).filter(([key]) => key !== 'quota').map(([key, value]) => `- ${key}: ${value}`).join('\n')}\n- Quota headers (last observed; absent is normal): ${JSON.stringify(stats.quota)}\n`);
  }
}
