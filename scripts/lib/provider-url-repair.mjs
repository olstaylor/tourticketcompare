import { readFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { currentProviderUrlBatch, verifyProviderUrlChanges, verifierArgs } from "./provider-url-work.mjs";

// Called only after the Stage 3 clean-tree/idempotence gates. All subprocess
// arguments are arrays; no issue text can become a command or output path.
export function performProviderUrlRepair(plan, root, { env = process.env, run = spawnSync, now = new Date() } = {}) {
  const read = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));
  const before = read("public/data/events.json");
  const registry = read("data/provider-identities.json");
  const current = currentProviderUrlBatch(plan, before, registry, now);
  if (!current.ok) return { outcome: "NEEDS HUMAN", reason: current.reason };
  if (!current.events.length) return { outcome: "NO SAFE WORK", reason: "All batch gaps have already cleared or expired" };
  if (!env.SEATGEEK_CLIENT_ID) return { outcome: "BLOCKED", reason: "SEATGEEK_CLIENT_ID is required for production verification; no API calls or writes attempted" };
  const partitionPath = `public/data/events/${plan.artistSlug}.json`;
  const beforePartition = read(partitionPath);
  mkdirSync(path.join(root, ".audit"), { recursive: true });
  const verified = run(process.execPath, verifierArgs(plan, current.events.map((event) => event.id)),
    { cwd: root, env, encoding: "utf8", maxBuffer: 4 * 1024 * 1024, timeout: 10 * 60 * 1000 });
  if (verified.status !== 0) return { outcome: "BLOCKED", reason: "SeatGeek verifier failed or timed out; all attempted changes must be restored" };
  let report;
  try { report = JSON.parse(verified.stdout); } catch {
    return { outcome: "BLOCKED", reason: "SeatGeek verifier produced no complete structured report" };
  }
  if (!Array.isArray(report.results) || report.summary?.selected !== current.events.length
    || report.summary?.stop_reason || report.summary?.api_errors !== 0 || report.results.length !== current.events.length
    || new Set(report.results.map((row) => row.showId)).size !== current.events.length
    || report.results.some((row) => !current.events.some((event) => event.id === row.showId))) {
    return { outcome: "BLOCKED", reason: "SeatGeek verification was incomplete or encountered an API error; no partial API-failure batch may publish" };
  }
  // Freeze the actual currently eligible subset for the content guard.
  const activePlan = { ...plan, eventIds: current.events.map((event) => event.id) };
  const guard = () => {
    const after = read("public/data/events.json");
    const content = verifyProviderUrlChanges(before, after, activePlan, report.results);
    if (!content.ok) return content;
    const partition = read(partitionPath);
    const partitionCheck = verifyProviderUrlChanges(beforePartition, partition, activePlan, report.results);
    if (!partitionCheck.ok || !isDeepStrictEqual([...partitionCheck.changedIds].sort(), [...content.changedIds].sort())
      || partition.some((event) => !isDeepStrictEqual(event, after.find((row) => row.id === event.id)))) {
      return { ok: false, reason: "Artist partition does not mirror the bounded verified event updates", changedIds: [] };
    }
    return content;
  };
  const checked = guard();
  if (!checked.ok) return { outcome: "NEEDS HUMAN", reason: checked.reason };
  const unresolved = report.results.filter((row) => !row.applied).map((row) => `${row.showId}: ${row.action} (${(row.notes || []).join("; ")})`);
  if (!checked.changedIds.length) return { outcome: "NEEDS HUMAN", reason: `No positive exact-event matches; URLs were left untouched. ${unresolved.join(" | ")}` };
  const status = run(process.execPath, ["scripts/validate-status-counts.mjs", "--write"], { cwd: root, encoding: "utf8" });
  if (status.status !== 0) return { outcome: "BLOCKED", reason: "Generated status figure refresh failed" };
  const summary = `${checked.changedIds.length}/${current.events.length} event URLs verified. ${unresolved.length} unresolved.\n${unresolved.join("\n")}`;
  plan.providerSummary = summary;
  return { outcome: null, reason: summary, guard, checkOutputBefore: `${current.events.length} current SeatGeek gaps` };
}
