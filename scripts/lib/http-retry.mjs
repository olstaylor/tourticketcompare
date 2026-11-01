// One retry rule for the scheduled jobs' HTTP calls. Several runs went red on a
// single dropped connection or 5xx (a 503 on /sitemap-index.xml on 30 Oct, a 502
// from GitHub's API, one Ticketmaster lookup in 4,247 on 1 Nov). Those are not
// outages. This retries a thrown fetch and any 5xx a few times, with a growing
// pause, and hands back the final response so the caller still decides what a
// persistent failure means.
//
// Never retried: 4xx (the request is wrong) and 429 (that is a quota, and retrying
// spends more of it). A failure that repeats is still reported by the caller.

export const RETRY_ATTEMPTS = 3;
export const RETRY_DELAY_MS = 2000;

export function isRetryableStatus(status) {
  return Number.isInteger(status) && status >= 500 && status <= 599;
}

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * fetch with bounded retries. `init` is passed through unchanged each attempt, so
 * pass a body that can be sent twice (string/JSON, not a stream).
 * Resolves to the last Response; rejects with the last error if every attempt threw.
 */
export async function fetchWithRetry(url, init = {}, {
  fetchImpl = globalThis.fetch,
  attempts = RETRY_ATTEMPTS,
  delayMs = RETRY_DELAY_MS,
  sleep = defaultSleep
} = {}) {
  for (let attempt = 1; ; attempt += 1) {
    let response;
    try {
      response = await fetchImpl(url, init);
    } catch (error) {
      if (attempt >= attempts) throw error;
      await sleep(delayMs * attempt);
      continue;
    }
    if (!isRetryableStatus(response.status) || attempt >= attempts) return response;
    await sleep(delayMs * attempt);
  }
}
