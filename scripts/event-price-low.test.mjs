// Tests for the per-event 30-day lowest recorded price (functions/_event-price-low.js).
//
// The module's whole reason to exist is that provider_pricing_history is
// change-only, so most of these tests are about the boundary: what a window
// query sees, what it misses, and what must never reach a page.
//
// Run standalone (node scripts/event-price-low.test.mjs) and in `npm run test:mvp`.

import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

let passed = 0;
function check(condition, message) {
  if (!condition) throw new Error(`event-price-low: ${message}`);
  passed += 1;
}

const { deriveEventPriceLow, fetchEventPriceLowSeries, PRICE_LOW_WINDOW_DAYS } = await load(
  "functions/_event-price-low.js"
);
const { MIN_PLAUSIBLE_LISTED_PRICE } = await load("functions/api/shows.js");

const NOW = Date.parse("2026-09-21T12:00:00Z");
const daysAgo = (n) => new Date(NOW - n * 24 * 60 * 60 * 1000).toISOString();

const lane = (overrides = {}) => ({
  provider: "vivid-seats",
  name: "Vivid Seats",
  price: 200,
  currency: "USD",
  fetchedAt: daysAgo(0),
  ...overrides
});

// ── the carry-in row: the defect a naive window query has ────────────────────
{
  // Price set 45 days ago, unchanged since. A `WHERE observed_at >= windowStart`
  // query returns nothing at all for this series, which is the single most
  // certain case in the whole table.
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: { price: 150, currency: "USD", observedAt: daysAgo(45) },
    windowMin: null
  }));
  check(low !== null, "a series whose only row predates the window still yields a low");
  check(low.price === 150, `the carry-in price is the low (was ${low?.price})`);
  check(low.carriedIn === true, "the result marks the figure as carried in from before the window");
  check(low.observedAt === daysAgo(45), "the carry-in keeps its true observation time, not the window start");
}

{
  // Same series with the carry-in withheld — proving the previous test passes
  // because of the carry-in and not by accident through the live lane.
  const low = deriveEventPriceLow([lane()], () => ({ carryIn: null, windowMin: null }));
  check(low.price === 200, "with no history at all the low falls back to the live price");
  check(low.isCurrent === true, "and is marked as the current figure");
}

// ── which candidate wins ─────────────────────────────────────────────────────
{
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: { price: 150, currency: "USD", observedAt: daysAgo(45) },
    windowMin: { price: 120, currency: "USD", observedAt: daysAgo(10) }
  }));
  check(low.price === 120 && low.carriedIn === false, "a cheaper in-window row beats the carry-in");
}
{
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: { price: 90, currency: "USD", observedAt: daysAgo(45) },
    windowMin: { price: 120, currency: "USD", observedAt: daysAgo(10) }
  }));
  check(low.price === 90 && low.carriedIn === true, "a cheaper carry-in beats every in-window row");
}
{
  const low = deriveEventPriceLow([lane({ price: 120 })], () => ({
    carryIn: null,
    windowMin: { price: 120, currency: "USD", observedAt: daysAgo(10) }
  }));
  check(low.isCurrent === true, "a tie resolves to the live badge's own figure, not an equal historical row");
}

// ── the invariant that keeps the page coherent ───────────────────────────────
{
  // If the low could exceed the price on the button beside it, the feature
  // reads as broken. Including the live price as a candidate makes that
  // impossible even when history is thin, pruned, or new for the lane.
  const cases = [
    { carryIn: null, windowMin: null },
    { carryIn: { price: 999, currency: "USD", observedAt: daysAgo(40) }, windowMin: null },
    { carryIn: null, windowMin: { price: 999, currency: "USD", observedAt: daysAgo(3) } }
  ];
  for (const series of cases) {
    const low = deriveEventPriceLow([lane({ price: 87 })], () => series);
    check(low.price <= 87, `the low never exceeds the current displayed price (was ${low?.price})`);
  }
}

// ── implausible rows never reach a page ──────────────────────────────────────
{
  // History is immutable and carries rows written before the floor existed: the
  // JAY-Z / Tottenham StubHub International lane reads 3.80 for every
  // observation since 2026-07-22.
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: { price: 3.8, currency: "USD", observedAt: daysAgo(40) },
    windowMin: { price: 3.8, currency: "USD", observedAt: daysAgo(5) }
  }));
  check(low.price === 200, "an implausible historical row is floored out, leaving the live price");
  check(MIN_PLAUSIBLE_LISTED_PRICE === 10, "the floor is the same constant the live badge uses");
}
{
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: { price: Number.NaN, currency: "USD", observedAt: daysAgo(40) },
    windowMin: { price: 120, currency: "USD", observedAt: "not-a-date" }
  }));
  check(low.price === 200, "unparseable price or observation time is discarded rather than guessed");
}

// ── currency ─────────────────────────────────────────────────────────────────
{
  const lanes = [lane({ currency: "USD" }), lane({ provider: "ticketnetwork", name: "TicketNetwork", currency: "GBP" })];
  const low = deriveEventPriceLow(lanes, () => ({ carryIn: null, windowMin: null }));
  check(low === null, "lanes disagreeing on currency suppress the answer rather than pick one");
}
{
  // A history row in another currency is a different market's figure.
  const low = deriveEventPriceLow([lane({ currency: "USD" })], () => ({
    carryIn: { price: 50, currency: "GBP", observedAt: daysAgo(40) },
    windowMin: null
  }));
  check(low.price === 200, "a history row in a different currency is dropped, never converted");
}

// ── same event, across providers ─────────────────────────────────────────────
{
  const lanes = [
    lane({ provider: "vivid-seats", name: "Vivid Seats", price: 200 }),
    lane({ provider: "stubhub-international", name: "StubHub International", price: 180 })
  ];
  const low = deriveEventPriceLow(lanes, (l) =>
    l.provider === "stubhub-international"
      ? { carryIn: null, windowMin: { price: 95, currency: "USD", observedAt: daysAgo(12) } }
      : { carryIn: null, windowMin: { price: 140, currency: "USD", observedAt: daysAgo(4) } }
  );
  check(low.price === 95, "the low is the cheapest across this event's lanes");
  check(low.provider === "stubhub-international", "attributed to the provider that recorded it");
  check(low.name === "StubHub International", "carrying the display name the page prints");
  check(low.observedAt === daysAgo(12), "and the instant it was observed");
}

// ── no second gate ───────────────────────────────────────────────────────────
{
  // A lane whose badge is withheld this render contributes nothing, whatever
  // history holds. The caller passes only gated lanes, so absence is the test.
  const low = deriveEventPriceLow([], () => ({
    carryIn: { price: 5, currency: "USD", observedAt: daysAgo(40) },
    windowMin: { price: 5, currency: "USD", observedAt: daysAgo(1) }
  }));
  check(low === null, "with no displayable lane there is no low, however cheap the history");
}

// ── attribution is structural, not optional ──────────────────────────────────
{
  const low = deriveEventPriceLow([lane()], () => ({
    carryIn: null,
    windowMin: { price: 120, currency: "USD", observedAt: daysAgo(9) }
  }));
  for (const field of ["provider", "name", "observedAt", "currency"]) {
    check(typeof low[field] === "string" && low[field].length > 0, `the result always carries ${field}`);
  }
  check(
    !Object.keys(low).some((key) => /city|event|across|aggregate/i.test(key)),
    "the return shape exposes nothing a cross-event 'from <price>' could be built from"
  );
}

// ── "we have watched" vs "we have never looked" ──────────────────────────────
{
  // Both cases have the live price winning. They are not the same claim and the
  // renderer must be able to tell them apart.
  const noHistory = deriveEventPriceLow([lane({ price: 87 })], () => ({ carryIn: null, windowMin: null }));
  check(noHistory.isCurrent && noHistory.backedByHistory === false, "a win with no history is marked unbacked");

  const watched = deriveEventPriceLow([lane({ price: 87 })], () => ({
    carryIn: null,
    windowMin: { price: 140, currency: "USD", observedAt: daysAgo(8) }
  }));
  check(watched.isCurrent && watched.backedByHistory === true, "a win against real observations is marked backed");

  // A series of nothing but implausible rows is not history either.
  const junkOnly = deriveEventPriceLow([lane({ price: 87 })], () => ({
    carryIn: { price: 3.8, currency: "USD", observedAt: daysAgo(40) },
    windowMin: { price: 3.8, currency: "USD", observedAt: daysAgo(2) }
  }));
  check(junkOnly.backedByHistory === false, "rows that fail the floor do not count as history");

  // Nor does a series recorded in another currency.
  const otherCurrency = deriveEventPriceLow([lane({ price: 87, currency: "USD" })], () => ({
    carryIn: { price: 50, currency: "GBP", observedAt: daysAgo(40) },
    windowMin: null
  }));
  check(otherCurrency.backedByHistory === false, "rows in another currency do not count as history");
}

// ── the reader: window boundary, pairing and batching ────────────────────────
{
  const calls = [];
  const db = {
    prepare(sql) {
      const call = { sql, bindings: null };
      return {
        bind(...bindings) {
          call.bindings = bindings;
          calls.push(call);
          return this;
        },
        async all() {
          return { results: [] };
        }
      };
    }
  };
  const lanes = [
    { dbKey: "vivid-seats", approvedSource: "vividseats_impact_marketplace_api" },
    { dbKey: "ticketnetwork", approvedSource: "ticketnetwork_impact_marketplace_api" }
  ];
  await fetchEventPriceLowSeries(db, ["e1", "e2"], lanes, { now: NOW });

  check(calls.length === 2, `one chunk issues exactly two statements (was ${calls.length})`);
  const windowCall = calls.find((c) => /MIN\(low_price\)/.test(c.sql));
  const carryCall = calls.find((c) => /MAX\(observed_at\)/.test(c.sql));
  check(Boolean(windowCall && carryCall), "one statement per question");

  // The two windows must abut exactly: no observation counted twice, none lost
  // in a gap between them.
  check(/observed_at >= \?/.test(windowCall.sql), "the in-window statement is inclusive of the window start");
  check(/observed_at < \?/.test(carryCall.sql), "the carry-in statement is exclusive of it");
  const windowStart = windowCall.bindings.at(-1);
  check(windowStart === carryCall.bindings.at(-1), "both use the same boundary instant");
  const expected = new Date(NOW - PRICE_LOW_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  check(windowStart === expected, `the boundary is ${PRICE_LOW_WINDOW_DAYS} days back (was ${windowStart})`);

  // Provider and source are bound as pairs: filtering on provider alone would
  // admit rows an unapproved source wrote for that same provider.
  check(
    (windowCall.sql.match(/\(provider = \? AND source = \?\)/g) || []).length === 2,
    "each lane binds provider and source together"
  );
  check(
    windowCall.bindings.includes("vividseats_impact_marketplace_api") &&
      windowCall.bindings.includes("ticketnetwork_impact_marketplace_api"),
    "the approved source of each lane is bound"
  );
  check(/GROUP BY event_id, provider, currency/.test(windowCall.sql), "series are grouped per event, provider and currency");
}
{
  // Batching: 120 ids is three chunks of at most 50, so six statements.
  let statements = 0;
  const db = {
    prepare() {
      statements += 1;
      return { bind() { return this; }, async all() { return { results: [] }; } };
    }
  };
  const ids = Array.from({ length: 120 }, (_, i) => `e${i}`);
  await fetchEventPriceLowSeries(db, ids, [{ dbKey: "vivid-seats", approvedSource: "src" }], { now: NOW });
  check(statements === 6, `120 ids cost six statements, not one per id (was ${statements})`);
}
{
  const index = await fetchEventPriceLowSeries(null, ["e1"], [{ dbKey: "v", approvedSource: "s" }], { now: NOW });
  check(index.size === 0, "no database binding yields an empty index rather than throwing");
}
{
  const db = { prepare() { throw new Error("should not be reached"); } };
  const empty = await fetchEventPriceLowSeries(db, [], [{ dbKey: "v", approvedSource: "s" }], { now: NOW });
  check(empty.size === 0, "no event ids issues no query at all");
  const noLanes = await fetchEventPriceLowSeries(db, ["e1"], [], { now: NOW });
  check(noLanes.size === 0, "no approved lane issues no query at all");
}

// ── rows come back keyed for the derivation to consume ───────────────────────
{
  const db = {
    prepare(sql) {
      const isWindow = /MIN\(low_price\)/.test(sql);
      return {
        bind() { return this; },
        async all() {
          return {
            results: isWindow
              ? [{ event_id: "e1", provider: "vivid-seats", currency: "USD", low_price: 120, observed_at: daysAgo(6) }]
              : [{ event_id: "e1", provider: "vivid-seats", currency: "USD", low_price: 150, observed_at: daysAgo(44) }]
          };
        }
      };
    }
  };
  const index = await fetchEventPriceLowSeries(db, ["e1"], [{ dbKey: "vivid-seats", approvedSource: "s" }], { now: NOW });
  const series = index.get("e1|vivid-seats");
  check(Boolean(series), "the index is keyed by event id and provider slug");
  check(series.windowMin.price === 120 && series.carryIn.price === 150, "both halves land on the same entry");

  // End to end through the derivation, with the reader's own output.
  const low = deriveEventPriceLow([lane()], () => series);
  check(low.price === 120 && low.observedAt === daysAgo(6), "the reader's shape feeds the derivation unchanged");
}

console.log(`event-price-low: ${passed} checks passed`);
