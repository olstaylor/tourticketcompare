// Renders every audited route once into ROUTE_RENDER_CACHE_DIR, spread across
// worker processes, so the site-crawl audits that follow read pages instead of
// each rendering ~10k of them (scripts/lib/render-cache.mjs). No-op without the
// variable. Never fails the run: a route it cannot render is simply left for the
// audit to render, and fail on, itself.
//
//   node scripts/prewarm-route-cache.mjs            # coordinator
//   (workers are this same file with --shard i/n)

import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSiteFixture } from "./lib/route-crawl.mjs";
import { RENDER_CACHE_ENV } from "./lib/render-cache.mjs";
import { eventAuditRenderer } from "./lib/event-indexability-audit.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const self = fileURLToPath(import.meta.url);

if (!process.env[RENDER_CACHE_ENV]) {
  console.log(`prewarm-route-cache: ${RENDER_CACHE_ENV} not set; nothing to do`);
  process.exit(0);
}

const shardArg = process.argv.find((arg) => arg.startsWith("--shard="));

if (shardArg) {
  const [index, total] = shardArg.slice("--shard=".length).split("/").map(Number);
  const site = await loadSiteFixture(root);
  const paths = [...new Set([...site.paths.allPaths, ...site.paths.eventPaths])];
  // Event pages are also rendered by the event-indexing audit under its own env.
  const eventAudit = await eventAuditRenderer(site, root);
  const eventPaths = new Set(site.paths.eventPaths);
  let count = 0;
  for (let i = index; i < paths.length; i += total) {
    try {
      await site.renderRoute(paths[i]);
      if (eventPaths.has(paths[i])) await eventAudit.render(paths[i]);
      count += 1;
    } catch {
      // Left for the audit to render and report.
    }
  }
  console.log(`prewarm-route-cache: shard ${index + 1}/${total} rendered ${count} routes`);
  process.exit(0);
}

const workers = Math.max(1, Math.min(8, os.availableParallelism?.() ?? os.cpus().length));
const started = Date.now();
await Promise.all(
  Array.from({ length: workers }, (_, index) =>
    new Promise((resolve) => {
      const child = spawn(process.execPath, [self, `--shard=${index}/${workers}`], { cwd: root, stdio: "inherit" });
      child.on("close", () => resolve());
      child.on("error", () => resolve());
    })
  )
);
console.log(`prewarm-route-cache: ${workers} workers finished in ${((Date.now() - started) / 1000).toFixed(1)}s`);
