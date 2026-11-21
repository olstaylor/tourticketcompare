// Backstop for the hourly price-snapshot workflows. GitHub drops scheduled
// ticks under load and never replays them (7, 9, 10-13 and 16 Nov 2026), so
// prices age past the stale gate. This Worker runs on a Cloudflare Cron
// Trigger, looks at when each writer workflow last started (any trigger), and
// dispatches it with apply=true only when it has gone quiet. It reads and
// dispatches workflows only; it writes no data itself and never touches D1,
// Impact, /api/out or any CTA.

export const REPO = "olstaylor/tourticketcompare";
export const REF = "main";
// The hourly cadence plus a 24h freshness constant leaves a lot of margin; 75
// minutes means a single missed hourly tick is covered before the next one.
export const STALE_AFTER_MINUTES = 75;

export const LANES = [
  { workflow: "vividseats-price-snapshots.yml", inputs: [{ apply: "true" }] },
  {
    workflow: "impact-marketplace-price-snapshots.yml",
    inputs: [
      { provider: "ticketnetwork", apply: "true" },
      { provider: "stubhub-international", apply: "true" },
    ],
  },
];

export function isStale(lastRunIso, nowMs, staleAfterMinutes = STALE_AFTER_MINUTES) {
  if (!lastRunIso) return true;
  const t = Date.parse(lastRunIso);
  if (!Number.isFinite(t)) return true;
  return nowMs - t > staleAfterMinutes * 60 * 1000;
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ttc-price-snapshot-cron",
  };
}

export async function checkLane(lane, { token, fetchImpl = fetch, now = Date.now() }) {
  const base = `https://api.github.com/repos/${REPO}/actions/workflows/${lane.workflow}`;
  const res = await fetchImpl(`${base}/runs?per_page=1&exclude_pull_requests=true`, { headers: headers(token) });
  if (!res.ok) return { workflow: lane.workflow, action: "error", detail: `list runs ${res.status}` };
  const body = await res.json();
  const last = body.workflow_runs?.[0]?.created_at || null;
  if (!isStale(last, now)) return { workflow: lane.workflow, action: "skip", last };
  const results = [];
  for (const inputs of lane.inputs) {
    const r = await fetchImpl(`${base}/dispatches`, {
      method: "POST",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({ ref: REF, inputs }),
    });
    results.push({ inputs, status: r.status });
  }
  const ok = results.every((r) => r.status === 204);
  return { workflow: lane.workflow, action: ok ? "dispatched" : "error", last, results };
}

export async function run(env, opts = {}) {
  if (!env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN secret is not set");
  const out = [];
  for (const lane of LANES) out.push(await checkLane(lane, { token: env.GITHUB_TOKEN, ...opts }));
  console.log(JSON.stringify({ at: new Date().toISOString(), lanes: out }));
  if (out.some((l) => l.action === "error")) throw new Error(`dispatch failed: ${JSON.stringify(out)}`);
  return out;
}

export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(run(env));
  },
  // Read-only status page so a tick can be seen without waiting for logs.
  async fetch() {
    return new Response("price-snapshot-cron: scheduled backstop, no public routes\n", { status: 200 });
  },
};
