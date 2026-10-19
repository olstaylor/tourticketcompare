// A snapshot run is unhealthy when provider failures are more than isolated
// noise. One Impact timeout or a handful of 503s among hundreds of lookups
// used to turn the whole lane red; those events keep their previous cached
// price and are retried on the next run. A broad outage (no usable price, or
// more than 5% of attempted lookups failing, with at least 3 failures) still
// fails the run.
export const FAILURE_SHARE_LIMIT = 0.05;
export const FAILURE_COUNT_FLOOR = 3;

export function failuresAreUnhealthy(summary = {}) {
  const failed = Number(summary.failed) || 0;
  if (failed <= 0) return false;
  const usable = Number(summary.usable) || 0;
  if (usable === 0) return true;
  const attempted = Math.max(Number(summary.eligible) || 0, usable + failed);
  return failed >= FAILURE_COUNT_FLOOR && failed / attempted > FAILURE_SHARE_LIMIT;
}
