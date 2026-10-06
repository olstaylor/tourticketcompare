import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { onRequest } from "../functions/[[path]].js";

const root = new URL("../", import.meta.url);
const text = (path) => readFile(new URL(path, root), "utf8");

const assetBodies = new Map(
  await Promise.all(
    ["/", "/data/catalog.json", "/data/events.json", "/data/events/harry-styles.json", "/data/artists.json"].map(async (path) => [
      path,
      await text(path === "/" ? "public/index.html" : `public${path}`)
    ])
  )
);

function assetsThatCount({ failCatalogOnce = false, failArtistPartitionOnce = false } = {}) {
  const calls = new Map();
  return {
    calls,
    async fetch(request) {
      const path = new URL(request.url).pathname;
      calls.set(path, (calls.get(path) || 0) + 1);
      if (path === "/data/catalog.json" && failCatalogOnce && calls.get(path) === 1) {
        return new Response("temporary asset failure", { status: 503 });
      }
      if (path === "/data/events/harry-styles.json" && failArtistPartitionOnce && calls.get(path) === 1) {
        return new Response("temporary asset failure", { status: 503 });
      }
      const body = assetBodies.get(path);
      return body === undefined
        ? new Response("Not found", { status: 404 })
        : new Response(body, { headers: { "Content-Type": path.endsWith(".json") ? "application/json" : "text/html" } });
    }
  };
}

async function render(ASSETS) {
  return onRequest({
    request: new Request("https://tourticketcompare.com/artists/harry-styles"),
    env: { ASSETS },
    next: () => new Response("unexpected pass-through", { status: 500 })
  });
}

const warmAssets = assetsThatCount();
assert.equal((await render(warmAssets)).status, 200);
assert.equal((await render(warmAssets)).status, 200);
assert.equal(warmAssets.calls.get("/data/catalog.json"), 1, "catalog should be parsed once per asset binding");
assert.equal(warmAssets.calls.get("/data/artists.json"), 1, "artist metadata should be parsed once per asset binding");
assert.equal(warmAssets.calls.get("/data/events/harry-styles.json"), 1, "artist partition should be parsed once per asset binding");
assert.equal(warmAssets.calls.get("/data/events.json") || 0, 0, "artist routes should not load the aggregate events dataset when their partition is available");
assert.equal(warmAssets.calls.get("/"), 2, "the HTML shell must remain freshly fetched per render");

const retryAssets = assetsThatCount({ failCatalogOnce: true });
assert.equal((await render(retryAssets)).status, 404, "a failed catalog load must fail closed");
assert.equal((await render(retryAssets)).status, 200, "a failed catalog load must be retried on the next render");
assert.equal(retryAssets.calls.get("/data/catalog.json"), 2, "failed catalog responses must not remain cached");

const partitionRetryAssets = assetsThatCount({ failArtistPartitionOnce: true });
assert.equal((await render(partitionRetryAssets)).status, 200, "a failed artist partition should fall back to the aggregate dataset");
assert.equal((await render(partitionRetryAssets)).status, 200, "a failed artist partition should be retried on the next render");
assert.equal(partitionRetryAssets.calls.get("/data/events/harry-styles.json"), 2, "failed artist partitions must not remain cached");
assert.equal(partitionRetryAssets.calls.get("/data/events.json"), 1, "aggregate fallback should be cached after a partition failure");

// Every-event routes read events.json's small shards (scripts/lib/event-shards.mjs),
// never the multi-megabyte aggregate, and fall back to it when the shards
// cannot be trusted.
const shardManifestText = await text("public/data/events/_shards/manifest.json");
const shardManifest = JSON.parse(shardManifestText);
const shardBodies = new Map(
  await Promise.all(shardManifest.shards.map(async (shard) => [shard.path, await text(`public${shard.path}`)]))
);

function shardedAssets({ manifest = shardManifestText, failShardOnce = false } = {}) {
  const calls = new Map();
  return {
    calls,
    async fetch(request) {
      const path = new URL(request.url).pathname;
      calls.set(path, (calls.get(path) || 0) + 1);
      if (path === "/data/events/_shards/manifest.json") return new Response(manifest);
      if (failShardOnce && path === shardManifest.shards[0].path && calls.get(path) === 1) {
        return new Response("temporary asset failure", { status: 503 });
      }
      const body = shardBodies.get(path) ?? assetBodies.get(path);
      return body === undefined ? new Response("Not found", { status: 404 }) : new Response(body);
    }
  };
}

async function renderOnsale(ASSETS) {
  const response = await onRequest({
    request: new Request("https://tourticketcompare.com/on-sale"),
    env: { ASSETS },
    next: () => new Response("unexpected pass-through", { status: 500 })
  });
  return { status: response.status, html: (await response.text()).replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/g, "") };
}

const aggregateOnly = assetsThatCount();
const aggregatePage = await renderOnsale(aggregateOnly);
assert.equal(aggregatePage.status, 200);
assert.equal(aggregateOnly.calls.get("/data/events.json"), 1, "without shards the aggregate dataset is the fallback");

const sharded = shardedAssets();
const shardedPage = await renderOnsale(sharded);
await renderOnsale(sharded);
assert.equal(shardedPage.html, aggregatePage.html, "the sharded events list must render exactly what events.json renders");
assert.equal(sharded.calls.get("/data/events.json") || 0, 0, "every-event routes must not load the aggregate when shards are available");
for (const shard of shardManifest.shards) {
  assert.equal(sharded.calls.get(shard.path), 1, `${shard.path} should be parsed once per asset binding`);
}

const staleManifest = shardedAssets({ manifest: JSON.stringify({ ...shardManifest, count: shardManifest.count + 1 }) });
assert.equal((await renderOnsale(staleManifest)).html, aggregatePage.html, "a manifest that disagrees with its shards falls back to events.json");
assert.equal(staleManifest.calls.get("/data/events.json"), 1, "a disagreeing manifest must fall back to the aggregate");

const shardRetry = shardedAssets({ failShardOnce: true });
assert.equal((await renderOnsale(shardRetry)).html, aggregatePage.html, "a failed shard falls back to events.json");
await renderOnsale(shardRetry);
assert.equal(shardRetry.calls.get(shardManifest.shards[0].path), 2, "a failed shard must be retried on the next render");

console.log("renderer asset cache regression checks passed");
