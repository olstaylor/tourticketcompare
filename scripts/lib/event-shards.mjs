// public/data/events.json split into small contiguous shards, in one place.
//
// Server routes that need every event (/on-sale, /artists, city, venue and
// event pages) read these shards instead of the full file: loadEvents in
// functions/[[path]].js. A single multi-megabyte env.ASSETS.fetch of
// events.json intermittently stalled for exactly 10s on live isolates
// (2026-10-02), while files of a few hundred KB never did.
//
// The shards are a generated view of events.json, like the per-artist
// partitions and events-index.json beside them. They live under
// public/data/events/_shards/ so every lane that already stages
// public/data/events picks them up. scripts/partition-events.py writes them
// with the same rule as this module (keep EVENT_SHARD_SIZE in step), and the
// incremental writers that patch partitions in place call writeEventShards.
// validate-partitions.mjs checks they concatenate back to events.json exactly;
// the router also falls back to events.json if the manifest's counts disagree.

import fs from "node:fs/promises";
import path from "node:path";

export const EVENT_SHARD_SIZE = 200;
export const EVENT_SHARD_DIR = path.join("public", "data", "events", "_shards");
export const EVENT_SHARD_MANIFEST = "manifest.json";

export const shardFileName = (number) => `${String(number).padStart(3, "0")}.json`;

/** Contiguous slices of the parsed events.json array, in file order. */
export function buildEventShards(events) {
  const shards = [];
  for (let start = 0; start < events.length; start += EVENT_SHARD_SIZE) {
    shards.push(events.slice(start, start + EVENT_SHARD_SIZE));
  }
  return shards;
}

export function buildEventShardManifest(events) {
  return {
    count: events.length,
    shards: buildEventShards(events).map((shard, number) => ({
      path: `/data/events/_shards/${shardFileName(number)}`,
      count: shard.length
    }))
  };
}

/**
 * Rewrite every shard and the manifest from `events`, removing shard files
 * the new set no longer has. Returns the repo-relative paths it changed.
 */
export async function writeEventShards(root, events) {
  const dir = path.join(root, EVENT_SHARD_DIR);
  await fs.mkdir(dir, { recursive: true });
  const wanted = new Map();
  buildEventShards(events).forEach((shard, number) => wanted.set(shardFileName(number), `${JSON.stringify(shard)}\n`));
  wanted.set(EVENT_SHARD_MANIFEST, `${JSON.stringify(buildEventShardManifest(events), null, 2)}\n`);

  const changed = [];
  for (const name of await fs.readdir(dir)) {
    if (name.endsWith(".json") && !wanted.has(name)) {
      await fs.unlink(path.join(dir, name));
      changed.push(path.join(EVENT_SHARD_DIR, name));
    }
  }
  for (const [name, body] of wanted) {
    const file = path.join(dir, name);
    const current = await fs.readFile(file, "utf8").catch(() => null);
    if (current === body) continue;
    await fs.writeFile(file, body);
    changed.push(path.join(EVENT_SHARD_DIR, name));
  }
  return changed.sort();
}
