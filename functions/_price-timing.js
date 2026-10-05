// Internal analysis only. Feed values are recorded listed prices, not verified
// lowest available inventory or checkout totals. Never read legacy change-only
// history here: an unchanged price is evidence only when actually observed.
export const PRICE_TIMING_VERSION = 1;
const HOUR = 3600000;
export const PRICE_TIMING_CHECKPOINTS = Object.freeze([
  { checkpoint: "14d", beforeMs: 336 * HOUR, toleranceMs: 12 * HOUR },
  { checkpoint: "7d", beforeMs: 168 * HOUR, toleranceMs: 6 * HOUR },
  { checkpoint: "48h", beforeMs: 48 * HOUR, toleranceMs: 2 * HOUR },
  { checkpoint: "24h", beforeMs: 24 * HOUR, toleranceMs: HOUR },
  { checkpoint: "12h", beforeMs: 12 * HOUR, toleranceMs: HOUR },
  { checkpoint: "1h", beforeMs: HOUR, toleranceMs: HOUR / 2 }
]);
export const PRICE_TIMING_SOURCES = Object.freeze({
  "vivid-seats": "vividseats_impact_marketplace_api",
  ticketnetwork: "ticketnetwork_impact_marketplace_api",
  "stubhub-international": "stubhub_international_impact_marketplace_api"
});
export const PRICE_TIMING_COMPLETION_GRACE_MS = 24 * HOUR;

export function timingWindows(eventStartAt, observedAt) {
  // Never let Date.parse interpret a timezone-naive capture in the host zone.
  if (![eventStartAt, observedAt].every((value) => typeof value === "string" && /T.*(?:Z|[+-]\d{2}:\d{2})$/i.test(value))) return [];
  const start = Date.parse(eventStartAt), observed = Date.parse(observedAt);
  if (!Number.isFinite(start) || !Number.isFinite(observed) || observed >= start) return [];
  return PRICE_TIMING_CHECKPOINTS.filter((c) => Math.abs(observed - (start - c.beforeMs)) <= c.toleranceMs)
    .map((c) => ({ ...c, distanceMs: Math.abs(observed - (start - c.beforeMs)) }));
}

function percentile(sorted, fraction) {
  if (!sorted.length) return null;
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position), upper = Math.ceil(position);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}
const rounded = (n) => n == null ? null : Number(n.toFixed(2));
const change = (price, baseline) => baseline > 0 && price != null ? 100 * (price / baseline - 1) : null;

// A fixed provider panel, currency and country is part of the metric's identity.
// This prevents a new cheaper provider or a different currency being interpreted
// as a falling price. Missing provider data is disclosed, never a zero price.
function cohortOptions(options) {
  const { artistId, checkpoint, currency, country, providers } = options;
  if (!artistId || !country || !/^[A-Z]{3}$/.test(currency || "")) throw new Error("artistId, country and uppercase currency are required");
  if (!PRICE_TIMING_CHECKPOINTS.some((c) => c.checkpoint === checkpoint)) throw new Error("Unknown price timing checkpoint");
  if (!Array.isArray(providers) || !providers.length || providers.some((p) => !PRICE_TIMING_SOURCES[p])) throw new Error("An explicit approved provider panel is required");
  return { artistId, checkpoint, currency, country, providers: [...new Set(providers)].sort() };
}

export function deriveEventPriceCheckpoints(event, rows, options) {
  const cohort = cohortOptions(options);
  const matching = rows.filter((r) => r.event_id === event.event_id && Number(r.schedule_revision) === Number(event.schedule_revision) && r.event_start_at === event.event_start_at && r.methodology_version === PRICE_TIMING_VERSION);
  const checkpoints = [];
  for (const definition of PRICE_TIMING_CHECKPOINTS) {
    const observations = [], missingProviders = [];
    for (const provider of cohort.providers) {
      const row = matching.find((r) => r.checkpoint === definition.checkpoint && r.provider === provider);
      const price = row?.low_price;
      const validPrice = typeof price === "number" && Number.isFinite(price) && price >= 10 && row.currency === cohort.currency &&
        row.source === PRICE_TIMING_SOURCES[provider] && row.external_id && row.inventory_count !== 0 &&
        timingWindows(event.event_start_at, row.observed_at).some((c) => c.checkpoint === definition.checkpoint);
      if (!validPrice) { missingProviders.push({ provider, reason: row?.outcome || "missing_observation" }); continue; }
      observations.push({ provider, price, observedAt: row.observed_at, externalId: row.external_id });
      // A closer non-price attempt makes availability/coverage uncertain. Keep
      // the actual valid observation for diagnosis but exclude partial pairs.
      if (row.outcome !== "priced" || row.attempt_at !== row.observed_at || row.attempt_external_id !== row.external_id) {
        missingProviders.push({ provider, reason: row.outcome || "missing_attempt" });
      }
    }
    const price = observations.length ? Math.min(...observations.map((o) => o.price)) : null;
    const times = observations.map((o) => o.observedAt).sort();
    checkpoints.push({
      checkpoint: definition.checkpoint, lowestPrice: price, currency: cohort.currency,
      providerCount: observations.length, expectedProviderCount: cohort.providers.length,
      status: !observations.length ? "missing" : missingProviders.length ? "partial" : "complete",
      observedFrom: times[0] || null, observedTo: times.at(-1) || null, observations, missingProviders
    });
  }
  for (const [index, point] of checkpoints.entries()) {
    point.changeVs14d = change(point.lowestPrice, checkpoints[0].lowestPrice);
    point.changeVsPrevious = index ? change(point.lowestPrice, checkpoints[index - 1].lowestPrice) : null;
  }
  return checkpoints;
}

export function calculatePriceTimingStats({ events, rows, now = new Date().toISOString(), ...options }) {
  const cohort = cohortOptions(options), nowMs = Date.parse(now);
  if (!Number.isFinite(nowMs)) throw new Error("now must be a valid instant");
  const exclusions = {}, changes = [], previousChanges = [];
  let eligibleEventCount = 0;
  const rowsByEvent = new Map();
  for (const row of rows) {
    const list = rowsByEvent.get(row.event_id) || [];
    list.push(row); rowsByEvent.set(row.event_id, list);
  }
  const seen = new Set();
  const exclude = (reason) => { exclusions[reason] = (exclusions[reason] || 0) + 1; };
  for (const event of events) {
    if (seen.has(event.event_id)) continue;
    seen.add(event.event_id);
    if (event.artist_slug !== cohort.artistId || event.country !== cohort.country) continue;
    const start = Date.parse(event.event_start_at), completed = Date.parse(event.completed_at);
    if (event.lifecycle !== "scheduled" && event.lifecycle !== "rescheduled") { exclude("lifecycle_held"); continue; }
    if (!Number.isFinite(start) || !Number.isFinite(completed) || completed < start + PRICE_TIMING_COMPLETION_GRACE_MS || completed > nowMs) { exclude("not_reconciled_after_show"); continue; }
    eligibleEventCount++;
    const points = deriveEventPriceCheckpoints(event, rowsByEvent.get(event.event_id) || [], cohort);
    const baseline = points[0], index = points.findIndex((p) => p.checkpoint === cohort.checkpoint), point = points[index];
    if (baseline.status !== "complete") { exclude("baseline_incomplete"); continue; }
    if (point.status !== "complete") { exclude("checkpoint_incomplete"); continue; }
    // A provider mapping change must not silently compare different products.
    if (baseline.observations.some((b) => point.observations.find((p) => p.provider === b.provider)?.externalId !== b.externalId)) { exclude("provider_identity_changed"); continue; }
    changes.push(point.changeVs14d);
    if (index && points[index - 1].status === "complete" && points[index - 1].observations.every((p) => point.observations.find((b) => b.provider === p.provider)?.externalId === p.externalId)) previousChanges.push(point.changeVsPrevious);
  }
  changes.sort((a, b) => a - b); previousChanges.sort((a, b) => a - b);
  const sampleSize = changes.length;
  return {
    ...cohort, metric: "median_recorded_lowest_listed_price_movement", methodologyVersion: PRICE_TIMING_VERSION,
    checkpoint: cohort.checkpoint, sampleSize, eligibleEventCount,
    medianChangeVs14d: rounded(percentile(changes, 0.5)),
    cheaperEventRate: sampleSize ? rounded(100 * changes.filter((c) => c < 0).length / sampleSize) : null,
    p25ChangeVs14d: rounded(percentile(changes, 0.25)), p75ChangeVs14d: rounded(percentile(changes, 0.75)),
    medianChangeVsPrevious: rounded(percentile(previousChanges, 0.5)), previousSampleSize: previousChanges.length,
    confidence: sampleSize < 10 ? "insufficient" : sampleSize < 50 ? "indicative" : "stronger_sample",
    claimEligible: sampleSize >= 10, publicReady: false, exclusions, generatedAt: new Date(nowMs).toISOString()
  };
}

// Caller supplies D1; there is deliberately no public route. Reads are bounded
// and artist-scoped and never parse events.json. Large cohorts fail explicitly
// instead of publishing an aggregate over a silently truncated sample.
export async function getPriceTimingStats({ db, now = new Date().toISOString(), maxEvents = 500, ...options }) {
  const cohort = cohortOptions(options);
  if (!db?.prepare) throw new Error("A D1 database is required");
  if (!Number.isFinite(Date.parse(now))) throw new Error("now must be a valid instant");
  if (!Number.isInteger(maxEvents) || maxEvents < 1 || maxEvents > 1000) throw new Error("maxEvents must be between 1 and 1000");
  const result = await db.prepare(`SELECT * FROM event_price_timing_events
    WHERE artist_slug = ? AND country = ? AND completed_at IS NOT NULL
    ORDER BY event_id LIMIT ?`).bind(cohort.artistId, cohort.country, maxEvents + 1).all();
  const events = result.results || [];
  if (events.length > maxEvents) return { ...cohort, status: "analysis_limit_exceeded", sampleSize: null, eligibleEventCount: null, observedEventCountAtLeast: maxEvents + 1, medianChangeVs14d: null, cheaperEventRate: null, confidence: "unavailable", claimEligible: false, publicReady: false, generatedAt: new Date(now).toISOString() };
  const rows = [];
  for (let i = 0; i < events.length; i += 40) {
    const ids = events.slice(i, i + 40).map((e) => e.event_id);
    const found = await db.prepare(`SELECT c.* FROM event_price_timing_checkpoints c
      JOIN event_price_timing_events e ON e.event_id = c.event_id AND e.schedule_revision = c.schedule_revision
      WHERE c.event_id IN (${ids.map(() => "?").join(",")})`).bind(...ids).all();
    rows.push(...(found.results || []));
  }
  return { status: "ok", ...calculatePriceTimingStats({ events, rows, now, ...cohort }) };
}
