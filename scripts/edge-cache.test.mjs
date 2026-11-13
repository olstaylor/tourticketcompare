// Tests for functions/_edge-cache.js: serve the stored copy, refresh in the
// background when it is old, keep the last good copy when a rebuild fails.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`edge-cache: ${message}`);
  passed += 1;
}
const { withEdgeCache, EDGE_CACHE_FRESH_SECONDS } = await import(pathToFileURL(path.join(root, "functions/_edge-cache.js")));

let calls = 0;
let fail = false;
const handler = withEdgeCache(async () => {
  calls += 1;
  if (fail) throw new Error("cut off");
  return new Response(`build ${calls}`, { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600" } });
});
const request = new Request("https://example.com/llms.txt?x=1");

// No Cache API (tests, scripts): the handler runs directly every time.
assert((await (await handler({ request })).text()) === "build 1", "runs the handler without a cache");
assert((await (await handler({ request })).text()) === "build 2", "no cache means no reuse");

const store = new Map();
globalThis.caches = {
  default: {
    match: async (key) => (store.has(key.url) ? store.get(key.url).clone() : undefined),
    put: async (key, response) => void store.set(key.url, response)
  }
};
const pending = [];
const context = { request, waitUntil: (promise) => pending.push(promise) };
const settle = async () => { await Promise.all(pending.splice(0)); };

const first = await handler(context);
await settle();
assert((await first.text()) === "build 3" && !first.headers.has("x-ttc-built-at"), "a miss builds and hides the internal header");
assert(store.has("https://example.com/llms.txt"), "stored without the query string");
const second = await handler(context);
await settle();
assert((await second.text()) === "build 3" && calls === 3, "a fresh copy is served without rebuilding");
assert(second.headers.get("Cache-Control") === `public, max-age=${EDGE_CACHE_FRESH_SECONDS}`, "client cache lifetime is the fresh window");

// Age the copy past the fresh window: served at once, rebuilt in the background.
const realNow = Date.now;
Date.now = () => realNow() + (EDGE_CACHE_FRESH_SECONDS + 5) * 1000;
const stale = await handler(context);
assert((await stale.text()) === "build 3", "an old copy is still served immediately");
await settle();
assert(calls === 4, "and a rebuild ran in the background");
fail = true;
Date.now = () => realNow() + 2 * (EDGE_CACHE_FRESH_SECONDS + 5) * 1000;
const afterFailure = await handler(context);
await settle();
assert(afterFailure.status === 200 && (await afterFailure.text()) === "build 4", "a failed rebuild leaves the last good copy in place");
Date.now = realNow;

// A non-200 build is returned but never stored.
store.clear();
fail = false;
const notFound = withEdgeCache(async () => new Response("nope", { status: 503 }));
assert((await notFound(context)).status === 503 && store.size === 0, "errors are not cached");
delete globalThis.caches;
console.log(`edge-cache: ${passed} checks passed`);
