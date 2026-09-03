import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { onRequest } from "../functions/[[path]].js";

const root = new URL("../", import.meta.url);
const text = (path) => readFile(new URL(path, root), "utf8");

const assetBodies = new Map(
  await Promise.all(
    ["/", "/data/catalog.json", "/data/events.json", "/data/artists.json"].map(async (path) => [
      path,
      await text(path === "/" ? "public/index.html" : `public${path}`)
    ])
  )
);

function assetsThatCount({ failCatalogOnce = false } = {}) {
  const calls = new Map();
  return {
    calls,
    async fetch(request) {
      const path = new URL(request.url).pathname;
      calls.set(path, (calls.get(path) || 0) + 1);
      if (path === "/data/catalog.json" && failCatalogOnce && calls.get(path) === 1) {
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
assert.equal(warmAssets.calls.get("/data/events.json"), 1, "events should be parsed once per asset binding");
assert.equal(warmAssets.calls.get("/"), 2, "the HTML shell must remain freshly fetched per render");

const retryAssets = assetsThatCount({ failCatalogOnce: true });
assert.equal((await render(retryAssets)).status, 404, "a failed catalog load must fail closed");
assert.equal((await render(retryAssets)).status, 200, "a failed catalog load must be retried on the next render");
assert.equal(retryAssets.calls.get("/data/catalog.json"), 2, "failed catalog responses must not remain cached");

console.log("renderer asset cache regression checks passed");
