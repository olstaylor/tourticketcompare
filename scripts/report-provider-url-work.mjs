#!/usr/bin/env node
// Read-only sensor. Complete evidence is retained as an Actions artifact even
// when Stage 2's storm caps withhold an issue. Tour labels are counted, never inferred.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildProviderUrlReport } from "./lib/provider-url-work.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export async function readProviderUrlInputs() {
  const [events, registry] = await Promise.all([
    readFile(path.join(ROOT, "public/data/events.json"), "utf8"),
    readFile(path.join(ROOT, "data/provider-identities.json"), "utf8")
  ]);
  return { events: JSON.parse(events), registry: JSON.parse(registry) };
}
async function main() {
  const argv = process.argv.slice(2);
  const { events, registry } = await readProviderUrlInputs();
  const report = buildProviderUrlReport(events, registry);
  const at = argv.indexOf("--json");
  if (at >= 0) {
    const target = argv[at + 1];
    if (!target || target.startsWith("--")) throw new Error("--json requires an output path");
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, `${JSON.stringify(report, null, 2)}\n`);
  }
  console.log(JSON.stringify(report.summary, null, 2));
  for (const batch of report.batches) console.log(`${batch.artist_slug}: ${batch.event_ids.length} SeatGeek gaps, ${batch.no_verified_resale} without verified resale — ${batch.eligible ? "agent-ready" : batch.blocked_reason}`);
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
