import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import YAML from "yaml";
import { PRICE_TIMING_CHECKPOINTS, PRICE_TIMING_SOURCES, timingWindows, deriveEventPriceCheckpoints, calculatePriceTimingStats, getPriceTimingStats } from "../functions/_price-timing.js";
import { PRICE_TIMING_SCHEMA_SQL, buildPriceTimingSql, timingObservation, prioritizeFinalHours } from "./lib/price-timing-capture.mjs";
import { run as runImpact, parseArgs as impactArgs, selectEligible } from "./snapshot-impact-marketplace-prices.mjs";
import { APPROVED_SOURCE, runIngestion as runVivid, selectEligibleEvents } from "./snapshot-vividseats-prices.mjs";
import { PROVIDERS } from "./lib/impact-marketplace-providers.mjs";

const HOUR = 3600000, provider = "vivid-seats";
const event = {
  id: "fixture-event", artist_slug: "fixture-artist", artist_name: "Fixture Artist", country: "GB",
  datetime_iso: "2027-01-20T20:00:00.000Z", timezone: "Europe/London",
  vividseats_url: "https://www.vividseats.com/fixture-tickets/production/123",
  provider_links: { "vivid-seats": { verified: true }, ticketnetwork: { verified: true, event_id: "tn123" }, "stubhub-international": { verified: true, event_id: "sh123" } }
};
const instant = (hours, e = event) => new Date(Date.parse(e.datetime_iso) - hours * HOUR);
const observation = (hours, price, e = event, p = provider, outcome = "priced") => timingObservation(e, p, p === provider ? "123" : "tn123", outcome, instant(hours, e), price == null ? null : { price, currency: "GBP", inventoryCount: null });
const cohort = { artistId: event.artist_slug, checkpoint: "24h", currency: "GBP", country: "GB", providers: [provider] };
const after = "2027-01-22T20:00:00.000Z";
let checks = 0;
const check = (name, fn) => { fn(); checks++; console.log(`PASS ${name}`); };

// Run actual D1-compatible SQLite statements using Node 22+, the workflow's
// existing runtime. No credentials, subprocess pipes or network are needed.
function database(sqls) {
  const db = new DatabaseSync(":memory:"), changes = [];
  for (const sql of sqls) {
    const before = db.prepare("SELECT total_changes() AS n").get().n;
    db.exec(sql);
    changes.push(db.prepare("SELECT total_changes() AS n").get().n - before);
  }
  const result = { events: db.prepare("SELECT * FROM event_price_timing_events").all(), rows: db.prepare("SELECT * FROM event_price_timing_checkpoints").all(), changes };
  db.close();
  return result;
}
const capture = (observations, events = [event], metadataAt = observations[0]?.observedAt || after) => buildPriceTimingSql({ events, observations, metadataAt });
const reconcile = (events = [event], metadataAt = after) => capture([], events, metadataAt);
const stats = (data, options = {}) => calculatePriceTimingStats({ ...data, ...cohort, now: after, ...options });

check("migration matches the self-applying schema", () => {
  assert.ok(fs.readFileSync(new URL("../migrations/0012_event_price_timing.sql", import.meta.url), "utf8").endsWith(PRICE_TIMING_SCHEMA_SQL + "\n"));
});
check("approved sources match existing provider writers", () => {
  assert.equal(PRICE_TIMING_SOURCES[provider], APPROVED_SOURCE);
  for (const p of ["ticketnetwork", "stubhub-international"]) assert.equal(PRICE_TIMING_SOURCES[p], PROVIDERS[p].priceSource);
});
check("all exact checkpoints and inclusive tolerance boundaries", () => {
  for (const c of PRICE_TIMING_CHECKPOINTS) {
    const target = Date.parse(event.datetime_iso) - c.beforeMs;
    for (const offset of [-c.toleranceMs, 0, c.toleranceMs]) assert.equal(timingWindows(event.datetime_iso, new Date(target + offset).toISOString())[0]?.checkpoint, c.checkpoint);
    for (const offset of [-c.toleranceMs - 1, c.toleranceMs + 1]) assert.equal(timingWindows(event.datetime_iso, new Date(target + offset).toISOString()).length, 0);
  }
  assert.equal(timingWindows(event.datetime_iso, event.datetime_iso).length, 0);
  assert.equal(timingWindows("bad", after).length, 0);
  assert.equal(timingWindows(event.datetime_iso, "2027-01-19T20:00:00").length, 0);
});

const declining = database([capture([observation(336, 100), observation(24, 80)]), reconcile()]);
check("normal declining prices and actual single-event sample", () => {
  const result = stats(declining);
  assert.equal(result.sampleSize, 1); assert.equal(result.medianChangeVs14d, -20); assert.equal(result.cheaperEventRate, 100);
  assert.equal(result.confidence, "insufficient"); assert.equal(result.claimEligible, false);
  assert.equal(result.publicReady, false);
});
check("rising prices", () => {
  const result = stats(database([capture([observation(336, 100), observation(24, 120)]), reconcile()]));
  assert.equal(result.medianChangeVs14d, 20); assert.equal(result.cheaperEventRate, 0);
});
check("missing checkpoint never interpolates or uses another point", () => {
  const data = database([capture([observation(336, 100), observation(23 - 1 / HOUR, 80)]), reconcile()]);
  assert.equal(stats(data).sampleSize, 0); assert.equal(stats(data).medianChangeVs14d, null);
  assert.equal(stats(data).exclusions.checkpoint_incomplete, 1);
});
check("a closer provider failure preserves price evidence but excludes the pair", () => {
  const data = database([capture([observation(336, 100), observation(24.5, 80), observation(24, null, event, provider, "failed")]), reconcile()]);
  const points = deriveEventPriceCheckpoints(data.events[0], data.rows, cohort);
  assert.equal(points[3].lowestPrice, 80); assert.equal(points[3].status, "partial");
  assert.equal(stats(data).sampleSize, 0); assert.equal(data.rows.find((r) => r.checkpoint === "24h").outcome, "failed");
});
check("no price does not become zero or a sold-out claim", () => {
  const data = database([capture([observation(336, 100), observation(24, null, event, provider, "no_price")]), reconcile()]);
  const point = deriveEventPriceCheckpoints(data.events[0], data.rows, cohort)[3];
  assert.equal(point.lowestPrice, null); assert.equal(point.providerCount, 0); assert.equal(stats(data).sampleSize, 0);
});
check("zero inventory and implausible prices cannot qualify", () => {
  for (const changed of [{ ...observation(24, 80), inventoryCount: 0 }, observation(24, 3.8)]) {
    const data = database([capture([observation(336, 100), changed]), reconcile()]);
    assert.equal(data.rows.find((r) => r.checkpoint === "24h").low_price, null);
    assert.equal(stats(data).sampleSize, 0);
  }
});
check("multiple marketplaces: same-currency minimum within a fixed panel", () => {
  const data = database([capture([observation(336, 100), observation(336, 90, event, "ticketnetwork"), observation(24, 80), observation(24, 100, event, "ticketnetwork")]), reconcile()]);
  const options = { ...cohort, providers: [provider, "ticketnetwork"] };
  const points = deriveEventPriceCheckpoints(data.events[0], data.rows, options);
  assert.equal(points[0].lowestPrice, 90); assert.equal(points[3].lowestPrice, 80); assert.equal(points[3].providerCount, 2);
  assert.equal(stats(data, options).medianChangeVs14d, -11.11);
  assert.equal(stats(declining, options).sampleSize, 0, "missing marketplaces make the fixed panel incomplete");
});
check("currency mismatch is excluded without FX conversion", () => {
  const data = database([capture([observation(336, 100), { ...observation(24, 80), currency: "USD" }]), reconcile()]);
  assert.equal(stats(data).sampleSize, 0);
});
check("provider product identity must match at both checkpoints", () => {
  const data = database([capture([observation(336, 100), { ...observation(24, 80), externalId: "456" }]), reconcile()]);
  assert.equal(stats(data).exclusions.provider_identity_changed, 1);
});
check("unchanged prices remain valid observations and replay is a no-op", () => {
  const sql = capture([observation(336, 100), observation(24, 100)]);
  const data = database([sql, sql, reconcile()]);
  assert.equal(data.changes[1], 0); assert.equal(data.rows.length, 2);
  assert.equal(stats(data).medianChangeVs14d, 0); assert.equal(stats(data).cheaperEventRate, 0);
});
check("nearest selection is independent of arrival order and ties choose earlier", () => {
  const candidates = [observation(24.25, 70), observation(23.75, 80), observation(24.8, 50)];
  const first = database([capture(candidates, [event], instant(336).toISOString())]);
  const second = database([capture([...candidates].reverse(), [event], instant(336).toISOString())]);
  assert.deepEqual(first.rows, second.rows); assert.equal(first.rows[0].low_price, 70);
});
check("event time changes preserve the ID and old evidence, invalidate the baseline", () => {
  const moved = { ...event, datetime_iso: "2027-02-20T20:00:00.000Z" };
  const data = database([capture([observation(336, 100)]), capture([observation(24, 80, moved)], [moved]), reconcile([moved], "2027-02-22T20:00:00.000Z")]);
  assert.equal(data.events[0].event_id, event.id); assert.equal(data.events[0].schedule_revision, 2);
  assert.equal(data.rows.length, 2); assert.equal(data.rows[0].schedule_revision, 1);
  assert.equal(data.rows[0].event_start_at, event.datetime_iso, "old showtimes remain attached to old revision evidence");
  assert.equal(stats(data, { now: "2027-02-22T20:00:00.000Z" }).exclusions.baseline_incomplete, 1);
});
check("schedule moved away and back does not resurrect an old baseline", () => {
  const moved = { ...event, datetime_iso: "2027-02-20T20:00:00.000Z" };
  const old = capture([observation(336, 100)]);
  const data = database([old, capture([], [moved], instant(300).toISOString()), capture([], [event], instant(290).toISOString()), old, reconcile()]);
  assert.equal(data.events[0].schedule_revision, 3); assert.equal(data.rows.length, 1);
  assert.equal(stats(data).exclusions.baseline_incomplete, 1);
});
check("cancelled/postponed events cannot become eligible samples", () => {
  for (const code of ["cancelled", "postponed", "unrecognised"]) {
    const held = { ...event, ticketmaster_status_code: code };
    const data = database([capture([observation(336, 100), observation(24, 80)]), reconcile([held])]);
    assert.equal(stats(data).sampleSize, 0); assert.equal(stats(data).exclusions.lifecycle_held, 1);
  }
});
check("incomplete history and unreconciled events are excluded", () => {
  assert.equal(stats(database([capture([observation(24, 80)]), reconcile()])).exclusions.baseline_incomplete, 1);
  assert.equal(stats(database([capture([observation(336, 100), observation(24, 80)])])).sampleSize, 0);
});
check("previous checkpoint means the immediately preceding checkpoint", () => {
  const data = database([capture([observation(336, 100), observation(48, 90), observation(24, 81)]), reconcile()]);
  assert.equal(stats(data).medianChangeVsPrevious, -10); assert.equal(stats(data).previousSampleSize, 1);
  assert.equal(stats(declining).medianChangeVsPrevious, null); assert.equal(stats(declining).previousSampleSize, 0);
});
check("medians resist outliers; sample thresholds use complete pairs", () => {
  for (const n of [9, 10, 49, 50]) {
    const events = Array.from({ length: n }, (_, i) => ({ ...event, id: `fixture-${i}` }));
    const observations = events.flatMap((e, i) => [observation(336, 100, e), observation(24, i === n - 1 ? 100000 : 80, e)]);
    const result = stats(database([capture(observations, events), reconcile(events)]));
    assert.equal(result.sampleSize, n); assert.equal(result.medianChangeVs14d, -20);
    assert.equal(result.confidence, n < 10 ? "insufficient" : n < 50 ? "indicative" : "stronger_sample");
    assert.equal(result.claimEligible, n >= 10); assert.equal(result.cheaperEventRate, Number(((n - 1) / n * 100).toFixed(2)));
  }
});
check("unsupported providers, unresolved times and post-show observations do not capture prices", () => {
  const invalid = { ...event, datetime_iso: "2027-01-20" };
  const data = database([capture([observation(-1, 80), observation(24, 80, event, "seatgeek"), { ...observation(24, 80), event: invalid }])]);
  assert.equal(data.rows.length, 0);
});
check("targeted collection filters and orders UTC instants before applying limits", () => {
  const events = [ { ...event, id: "later", datetime_iso: instant(-40).toISOString() }, { ...event, id: "nearer", datetime_iso: instant(-2).toISOString() }, { ...event, id: "far", datetime_iso: instant(-60).toISOString() } ];
  const now = new Date(event.datetime_iso);
  assert.deepEqual(prioritizeFinalHours(events, now, 48).map((e) => e.id), ["nearer", "later"]);
  assert.equal(selectEligibleEvents(events, new Map(), { withinHours: 48, limit: 1 }, now).selected[0].localId, "nearer");
  assert.equal(selectEligible(events, [], PROVIDERS.ticketnetwork, { withinHours: 48, limit: 1 }, now)[0].id, "nearer");
  assert.throws(() => impactArgs(["--within-hours", "49"]));
});

// Ingestion tests prove failure/absence evidence is passed through the real
// apply path without changing the old price-check semantics or cache writer.
for (const type of ["vivid", "impact"]) {
  for (const outcome of ["priced", "failed", "no_price", "unusable", "incomplete"]) {
    if (type === "impact" && outcome === "incomplete") continue;
    let recorded, priceRows;
    const now = instant(24);
    const deps = {
      now,
      async writer(rows) { priceRows = rows; return type === "vivid" ? { written: rows.length } : rows.length; },
      async checksWriter(checks, checkedAt, options, timing) { recorded = { checks, timing }; return { recorded: checks.length }; }
    };
    let result;
    if (type === "vivid") {
      result = await runVivid({ apply: true, freshnessHours: 24 }, { ...deps, catalog: { events: [event], artistsBySlug: new Map() },
        async fetchArtistCatalog() { return outcome === "failed" || outcome === "incomplete" ? { ok: false, incomplete: outcome === "incomplete", reason: "fixture" } : { ok: true, data: outcome === "no_price" ? [] : [{ CurrentPrice: 80, Currency: "GBP", Offers: [{ Sku: "123" }] }, ...(outcome === "unusable" ? [{ CurrentPrice: 90, Currency: "GBP", Offers: [{ Sku: "123" }] }] : [])] }; }
      });
    } else {
      result = await runImpact({ provider: "ticketnetwork", apply: true, freshnessHours: 24 }, { ...deps, data: [[event], []],
        async fetchArtistCatalog() { return outcome === "failed" ? { ok: false, reason: "fixture" } : { ok: true, candidates: outcome === "no_price" ? [] : [{ externalId: "tn123", price: outcome === "unusable" ? 3.8 : 80, currency: "GBP", inventoryCount: null }] }; }
      });
    }
    check(`${type} ingestion retains ${outcome} evidence and preserves cache behaviour`, () => {
      assert.equal(recorded.timing.observations[0].outcome, outcome);
      assert.equal(priceRows.length, outcome === "priced" ? 1 : 0);
      assert.equal(recorded.checks.length, outcome === "failed" || outcome === "incomplete" ? 0 : 1);
      assert.equal(result.timing_capture_status, "imported");
      const data = database([buildPriceTimingSql(recorded.timing)]);
      assert.equal(data.rows[0].outcome, outcome);
    });
  }
}

let queries = [];
const fakeDb = { prepare(sql) { return { bind(...args) { queries.push({ sql, args }); return { async all() { return { results: sql.includes("SELECT * FROM event_price_timing_events") ? declining.events : declining.rows }; } }; } }; } };
const loaded = await getPriceTimingStats({ db: fakeDb, ...cohort, now: after });
check("internal D1 function uses bounded artist and checkpoint reads", () => {
  assert.equal(loaded.sampleSize, 1); assert.equal(loaded.medianChangeVs14d, -20);
  assert.ok(queries[0].sql.includes("artist_slug = ? AND country = ?")); assert.equal(queries[0].args.at(-1), 501);
  assert.ok(queries[1].sql.includes("e.schedule_revision = c.schedule_revision"));
  assert.ok(queries.every((q) => !q.sql.includes("provider_pricing_history")));
});
const oversized = await getPriceTimingStats({ db: { prepare() { return { bind() { return { async all() { return { results: [declining.events[0], declining.events[0]] }; } }; } }; } }, ...cohort, maxEvents: 1, now: after });
check("oversized and unavailable datasets never manufacture statistics", () => {
  assert.equal(oversized.status, "analysis_limit_exceeded"); assert.equal(oversized.medianChangeVs14d, null); assert.equal(oversized.claimEligible, false);
  assert.equal(oversized.sampleSize, null, "an uncomputed sample is unknown, not zero");
  assert.throws(() => calculatePriceTimingStats({ events: [], rows: [], ...cohort, providers: [] }));
});
await assert.rejects(() => getPriceTimingStats({ ...cohort, db: null }), /D1/);
await assert.rejects(() => getPriceTimingStats({ ...cohort, db: { prepare() { throw new Error("database unavailable"); } } }), /unavailable/);

check("workflow extra ticks target only the final 48h and retain hourly full passes", () => {
  for (const [file, full, extra] of [["impact-marketplace-price-snapshots.yml", "17 * * * *", "47 * * * *"], ["vividseats-price-snapshots.yml", "47 * * * *", "17 * * * *"]]) {
    const text = fs.readFileSync(new URL(`../.github/workflows/${file}`, import.meta.url), "utf8"), workflow = YAML.parse(text);
    assert.deepEqual(workflow.on.schedule.map((s) => s.cron), [full, extra]);
    assert.ok(text.includes(`= '${extra}' ]; then args+=(--within-hours 48)`));
    assert.ok(text.includes("npm run test:price-timing"));
  }
});
console.log(`price timing: ${checks} tests passed`);
