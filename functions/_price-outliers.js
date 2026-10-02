// @ts-check
// One rule for "this recorded price is a glitch, not a market", shared by every
// surface that turns provider_pricing_history into a claim: the recorded low,
// the latest recorded change, the 7-day change and /api/price-history.
//
// The case that motivated it: the Olivia Rodrigo Washington StubHub
// International series reads 398.40, 428.16, 57.07, 414.72, 392.64 around
// 2026-09-15. One feed reading at an eighth of the price either side of it,
// gone at the next change, then published as "30-day low $57.07". A floor
// cannot catch that (57.07 is a plausible price for some other show), and a
// band around the series median would also delete genuine final-week drops,
// which are exactly what the 7-day change exists to report.
//
// So the test is local and needs both neighbours: a row is an ISOLATED SPIKE
// when the rows either side of it exist and it sits below half the lower of
// them, or above twice the higher. A real move persists into the next
// observation and is never caught; a reading that reverts at once is. A row
// with no later neighbour is never judged here; callers that know the live
// badge price pass it as the trailing neighbour, since the badge is the
// standing observation after the newest history row.
//
// Measured against production on 2026-10-02: 89 of 436,850 history rows
// (0.02%) match this rule.

export const SPIKE_LOW_RATIO = 0.5;
export const SPIKE_HIGH_RATIO = 2;

/**
 * @param {number} prev
 * @param {number} price
 * @param {number} next
 * @returns {boolean}
 */
export function isIsolatedSpike(prev, price, next) {
  if (![prev, price, next].every((value) => Number.isFinite(value) && value > 0)) return false;
  return price < SPIKE_LOW_RATIO * Math.min(prev, next) || price > SPIKE_HIGH_RATIO * Math.max(prev, next);
}

/**
 * Drop isolated spikes from one series. Neighbours are judged on the input as
 * given, not on the already-filtered output, so two adjacent glitches are not
 * able to vouch for each other in a way that depends on scan order.
 *
 * @template {{price: number}} T
 * @param {T[]} points Oldest first, one series (same event, provider, source, currency).
 * @param {{ trailingPrice?: number }} [options] The live badge price, used as the newest point's later neighbour.
 * @returns {T[]}
 */
export function dropIsolatedSpikes(points, options = {}) {
  const list = Array.isArray(points) ? points : [];
  const trailing = Number(options.trailingPrice);
  return list.filter((point, index) => {
    if (index === 0) return true;
    const prev = Number(list[index - 1]?.price);
    const next = index < list.length - 1 ? Number(list[index + 1]?.price) : trailing;
    return !isIsolatedSpike(prev, Number(point?.price), next);
  });
}

/**
 * The same rule as a SQL predicate that is TRUE for rows to KEEP, for reads
 * that aggregate in D1 rather than in JS. The columns are the row's price and
 * its LAG/LEAD over the series ordered by observed_at; a NULL neighbour keeps
 * the row, exactly as a missing neighbour does in isIsolatedSpike.
 *
 * @param {string} price
 * @param {string} prev
 * @param {string} next
 * @returns {string}
 */
export function keepNonSpikeSql(price, prev, next) {
  return `NOT (${prev} IS NOT NULL AND ${next} IS NOT NULL AND ${prev} > 0 AND ${next} > 0 AND (` +
    `${price} < ${SPIKE_LOW_RATIO} * MIN(${prev}, ${next}) OR ${price} > ${SPIKE_HIGH_RATIO} * MAX(${prev}, ${next})))`;
}
