#!/usr/bin/env node
// Read-only health sensor for the scheduled automation lanes.
//
// Every sanctioned write lane runs `npm run test:mvp` in-job against the tip of
// main before it commits or merges (SAFE_PUBLISHING_RULES.md -> Sanctioned
// automated writers). That is what makes those exceptions safe, and it also
// means a single red check on main stops all of them at once: on 2026-09-11 a
// stale data/content-provenance.json took out three Impact marketplace runs and
// a Vivid Seats CTA sync before a human noticed the Actions tab.
//
// Two failure modes went unwatched until this existed:
//
//   1. A lane that RUNS AND FAILS. Nothing in the repository reported it. The
//      lanes report their findings to rolling issues only on success; a failed
//      run writes nothing anywhere.
//   2. A lane that IS NEVER INVOKED. GitHub drops scheduled ticks under load and
//      never replays them, so a workflow's last run stays green while its
//      schedule has silently stopped (docs/OPERATIONS.md -> Price snapshot
//      cadence records this happening to the Vivid Seats lane for 7h37m). A
//      workflow cannot detect its own missing ticks; only an outside observer
//      can. `price-freshness-check.yml` already covers that for prices by
//      probing the live site. Nothing covered it for the event/data lanes.
//
// Like `check-pr-validation-heads.mjs`, this is a sensor and nothing more: it
// reads the Actions API and writes one rolling GitHub issue. It never reruns,
// dispatches, merges, commits, or changes a workflow. A GitHub API error aborts
// with exit 2 rather than being rendered as a lane failure — an unreachable API
// is not evidence that a lane is broken, the same rule the outbound link audit
// applies to 401/403/429.

const SELF_TEST = process.argv.includes("--self-test");
const DRY_RUN = process.argv.includes("--dry-run");
const jsonFlagIndex = process.argv.indexOf("--json");
const JSON_OUT = jsonFlagIndex >= 0 ? process.argv[jsonFlagIndex + 1] : null;

const ROLLING_ISSUE_TITLE = "Automation health — scheduled lane failures";
const ROLLING_ISSUE_LABEL = "automation:health";

// The lanes worth watching, with the age past which a missing tick is a finding.
//
// `maxAgeHours` is deliberately far looser than the nominal cron. GitHub runs
// these queues late as a matter of course, and a sensor that cries wolf on
// ordinary lateness gets ignored — which costs more than the miss it prevents.
// Daily lanes get 30h (a full extra cycle plus 6h of slack). The hourly price
// lanes get 6h, comfortably inside the 24h DEFAULT_FRESHNESS_HOURS display
// constant, so a finding still arrives well before a visitor could see a price
// disappear.
//
// `eventDriven` buys minutes-level detection for one CI run per lane run, so it
// is spent only where it pays. The six daily lanes carry it: each is a data
// writer, a failure there costs an ingestion window, and together they fire
// about fourteen times a day. The three hourly lanes do not: they would fire
// this sensor another seventy-odd times a day, and the visitor-facing symptom
// they guard — prices going dark — is already probed from outside by
// `price-freshness-check.yml`. The 6-hourly poll covers them, well inside the
// 24h display window.
export const WATCHED_LANES = [
  { file: "daily-audit.yml", name: "Daily data audit", cadence: "daily 03:00", maxAgeHours: 30, eventDriven: true },
  { file: "nightly-data-sync.yml", name: "Nightly data sync", cadence: "daily 03:30", maxAgeHours: 30, eventDriven: true },
  { file: "tm-new-shows-pr.yml", name: "Ticketmaster new shows PR", cadence: "daily 04:00", maxAgeHours: 30, eventDriven: true },
  { file: "seatgeek-cta-sync.yml", name: "SeatGeek CTA sync", cadence: "daily 05:00", maxAgeHours: 30, eventDriven: true },
  { file: "vividseats-cta-sync.yml", name: "Vivid Seats CTA sync", cadence: "daily 05:30", maxAgeHours: 30, eventDriven: true },
  { file: "impact-marketplace-provider-sync.yml", name: "Impact marketplace provider sync", cadence: "daily 06:00/06:30/07:00", maxAgeHours: 30, eventDriven: true },
  { file: "impact-marketplace-price-snapshots.yml", name: "Impact marketplace price snapshots", cadence: "hourly", maxAgeHours: 6, eventDriven: false },
  { file: "vividseats-price-snapshots.yml", name: "Vivid Seats price snapshots", cadence: "hourly", maxAgeHours: 6, eventDriven: false },
  { file: "price-freshness-check.yml", name: "Price freshness check", cadence: "hourly :35", maxAgeHours: 6, eventDriven: false }
];

// A cancelled run is usually the concurrency group doing its job, not a defect,
// so it is neither a failure nor proof of health — it is skipped when looking
// for the lane's last real verdict.
const FAILING_CONCLUSIONS = new Set(["failure", "timed_out"]);
const NEUTRAL_CONCLUSIONS = new Set(["cancelled", "skipped"]);

/**
 * Classify one lane from its recent scheduled runs.
 *
 * Ordering is established here rather than assumed from the API response, so a
 * change in GitHub's default sort cannot quietly turn "the newest run" into some
 * other run and invert every verdict below.
 *
 * Pure and offline so the self-test can pin every branch without the network.
 */
export function classifyLane(runs, { now, maxAgeHours }) {
  const completed = runs
    .filter((run) => run.status === "completed")
    .slice()
    .sort((a, b) => Date.parse(b.created_at ?? "") - Date.parse(a.created_at ?? ""));
  if (completed.length === 0) {
    return { status: "never", detail: "No completed scheduled run found.", consecutiveFailures: 0, latest: null };
  }

  const latest = completed[0];
  const ageHours = (now - Date.parse(latest.created_at)) / 3_600_000;
  const ageDetail = `Last scheduled run was ${ageHours.toFixed(1)}h ago (expected within ${maxAgeHours}h).`;

  // A dropped schedule is reported ahead of a failing run: if the lane is not
  // being invoked at all, "the last run failed" describes history, not the
  // problem the operator has to act on.
  if (ageHours > maxAgeHours) {
    return { status: "stale", detail: ageDetail, consecutiveFailures: 0, latest };
  }

  const verdicts = completed.filter((run) => !NEUTRAL_CONCLUSIONS.has(run.conclusion));
  if (verdicts.length === 0) {
    return { status: "ok", detail: "Recent runs were cancelled or skipped; no failing verdict.", consecutiveFailures: 0, latest };
  }

  let consecutiveFailures = 0;
  for (const run of verdicts) {
    if (!FAILING_CONCLUSIONS.has(run.conclusion)) break;
    consecutiveFailures += 1;
  }

  if (consecutiveFailures === 0) {
    return { status: "ok", detail: `Last scheduled verdict: ${verdicts[0].conclusion}.`, consecutiveFailures: 0, latest: verdicts[0] };
  }

  // The repeat count is the evidence that separates a flake from a defect, and
  // it is what a downstream worker needs in order not to re-derive it.
  const plural = consecutiveFailures === 1 ? "run" : "runs in a row";
  return {
    status: "failing",
    detail: `Last ${consecutiveFailures} scheduled ${plural} concluded ${verdicts[0].conclusion}.`,
    consecutiveFailures,
    latest: verdicts[0]
  };
}

/**
 * Several lanes failing inside the same window is the signature of a red tip of
 * main rather than of several independent provider defects, because every lane
 * gates its own write on `test:mvp` passing against that tree. Saying so here
 * saves the next reader the deduction; it is stated as a likelihood, never as a
 * verified fact, since this sensor does not run the suite.
 */
export function correlatedMainFailure(findings) {
  const failing = findings.filter((row) => row.status === "failing");
  return failing.length >= 2;
}

export function renderBody(rows, { repo, now }) {
  const findings = rows.filter((row) => row.status !== "ok");
  const header = findings.length
    ? `🔴 ${findings.length} of ${rows.length} scheduled lanes need attention`
    : `🟢 All ${rows.length} scheduled lanes healthy`;

  let body = "<!-- automation-health -->\n";
  body += `**Last check:** ${new Date(now).toISOString()}\n`;
  body += `**Status:** ${header}\n\n`;
  body += "Read-only sensor over the scheduled write lanes. It never reruns, dispatches, merges, or changes a workflow. ";
  body += "`stale` means GitHub has not invoked the workflow recently enough, which no workflow can detect about itself.\n\n";

  if (correlatedMainFailure(rows)) {
    body += "> **Check the tip of `main` first.** Two or more lanes are failing at once. ";
    body += "Every sanctioned writer gates its commit on `npm run test:mvp` passing in-job against `main`, ";
    body += "so one red check there stops all of them together and each lane's own log will show the same failing step. ";
    body += "Confirm by running `npm run test:mvp` on `main` before investigating any provider.\n\n";
  }

  body += "| Lane | Cadence | Status | Detail | Last run |\n|---|---|---|---|---|\n";
  for (const row of rows) {
    const link = row.latest ? `[${row.latest.conclusion ?? row.latest.status}](${row.latest.html_url})` : "—";
    body += `| ${row.name} | ${row.cadence} | ${row.status} | ${row.detail} | ${link} |\n`;
  }

  // Machine-readable findings so a downstream worker can select and scope a task
  // without re-deriving any of this from the repository.
  body += "\n<details><summary>Machine-readable findings</summary>\n\n```json\n";
  body += JSON.stringify(
    {
      generated_at: new Date(now).toISOString(),
      repo,
      likely_main_failure: correlatedMainFailure(rows),
      findings: findings.map((row) => ({
        lane: row.file,
        workflow: row.name,
        status: row.status,
        consecutive_failures: row.consecutiveFailures,
        detail: row.detail,
        run_url: row.latest?.html_url ?? null,
        failing_jobs: row.failingJobs ?? []
      }))
    },
    null,
    2
  );
  body += "\n```\n\n</details>\n\n_Generated by `scripts/check-automation-health.mjs`._";
  return body;
}

if (SELF_TEST) {
  const { default: assert } = await import("node:assert/strict");
  const now = Date.parse("2026-09-11T12:00:00Z");
  const run = (overrides) => ({
    status: "completed",
    conclusion: "success",
    created_at: "2026-09-11T11:00:00Z",
    html_url: "https://example.invalid/run",
    ...overrides
  });

  assert.equal(classifyLane([], { now, maxAgeHours: 30 }).status, "never");
  assert.equal(classifyLane([run({})], { now, maxAgeHours: 30 }).status, "ok");

  // A queued run is not a verdict, and must not be mistaken for a fresh one.
  assert.equal(classifyLane([{ status: "queued", created_at: "2026-09-11T11:59:00Z" }], { now, maxAgeHours: 6 }).status, "never");

  const failing = classifyLane(
    [run({ conclusion: "failure" }), run({ conclusion: "failure", created_at: "2026-09-11T10:00:00Z" }), run({ created_at: "2026-09-11T09:00:00Z" })],
    { now, maxAgeHours: 30 }
  );
  assert.equal(failing.status, "failing");
  assert.equal(failing.consecutiveFailures, 2);

  // A cancelled run is the concurrency group working, so it neither counts as a
  // failure nor breaks the failure streak behind it.
  const cancelled = classifyLane([run({ conclusion: "cancelled" }), run({ conclusion: "failure", created_at: "2026-09-11T10:00:00Z" })], { now, maxAgeHours: 30 });
  assert.equal(cancelled.status, "failing");
  assert.equal(cancelled.consecutiveFailures, 1);
  assert.equal(classifyLane([run({ conclusion: "cancelled" })], { now, maxAgeHours: 30 }).status, "ok");

  // A dropped schedule outranks a historical failure: the actionable fact is
  // that the lane is not running, not what its last run concluded.
  const stale = classifyLane([run({ conclusion: "failure", created_at: "2026-09-10T11:00:00Z" })], { now, maxAgeHours: 6 });
  assert.equal(stale.status, "stale");
  assert.equal(stale.consecutiveFailures, 0);
  assert.equal(classifyLane([run({ created_at: "2026-09-11T05:00:00Z" })], { now, maxAgeHours: 6 }).status, "stale");
  assert.equal(classifyLane([run({ created_at: "2026-09-11T07:00:00Z" })], { now, maxAgeHours: 6 }).status, "ok");
  assert.equal(classifyLane([run({ conclusion: "timed_out" })], { now, maxAgeHours: 30 }).status, "failing");

  assert.equal(correlatedMainFailure([{ status: "failing" }, { status: "failing" }]), true);
  assert.equal(correlatedMainFailure([{ status: "failing" }, { status: "stale" }]), false);

  const body = renderBody(
    [
      { file: "a.yml", name: "A", cadence: "daily", status: "failing", detail: "d", consecutiveFailures: 3, latest: { conclusion: "failure", html_url: "https://example.invalid/1" }, failingJobs: ["sync"] },
      { file: "b.yml", name: "B", cadence: "hourly", status: "ok", detail: "d", consecutiveFailures: 0, latest: { conclusion: "success", html_url: "https://example.invalid/2" } }
    ],
    { repo: "o/r", now }
  );
  assert.match(body, /1 of 2 scheduled lanes need attention/);
  assert.match(body, /"consecutive_failures": 3/);
  // Only findings reach the machine-readable block; a healthy lane is context.
  assert.doesNotMatch(body, /"lane": "b\.yml"/);

  assert.ok(WATCHED_LANES.every((lane) => lane.file && lane.name && lane.maxAgeHours > 0));

  // A renamed or deleted workflow would otherwise make this sensor report
  // "never" forever against a file that no longer exists — a watcher quietly
  // watching nothing is worse than no watcher, because the green board is read
  // as coverage. Fail here instead, at the point someone can still fix it.
  const { readdir, readFile } = await import("node:fs/promises");
  const workflowDir = new URL("../.github/workflows/", import.meta.url);
  const present = new Set(await readdir(workflowDir));
  const missing = WATCHED_LANES.map((lane) => lane.file).filter((file) => !present.has(file));
  assert.deepEqual(missing, [], `WATCHED_LANES names workflow files that do not exist: ${missing.join(", ")}`);

  // The display names are what this sensor's own workflow_run trigger matches
  // on, and GitHub matches them by string with no error when one is wrong. Pin
  // both copies to the workflow files so a rename cannot silently unsubscribe
  // the event-driven half of the sensor and leave only the 6-hourly poll.
  for (const lane of WATCHED_LANES) {
    const source = await readFile(new URL(lane.file, workflowDir), "utf8");
    const declared = source.match(/^name:[ \t]*(.+)$/m)?.[1].trim();
    assert.equal(declared, lane.name, `${lane.file} declares name "${declared}", WATCHED_LANES expects "${lane.name}"`);
  }

  const ownWorkflow = await readFile(new URL("automation-health.yml", workflowDir), "utf8");
  const subscribed = ownWorkflow
    .match(/workflows:\n((?:[ \t]*-[ \t]*.+\n)+)/)?.[1]
    .split("\n")
    .map((line) => line.replace(/^[ \t]*-[ \t]*/, "").trim())
    .filter(Boolean);
  assert.deepEqual(
    subscribed,
    WATCHED_LANES.filter((lane) => lane.eventDriven).map((lane) => lane.name),
    "automation-health.yml workflow_run list is out of step with the eventDriven lanes in WATCHED_LANES"
  );

  // Unordered input must reach the same verdict as ordered input, or a change in
  // GitHub's default sort silently inverts every classification above.
  const shuffled = classifyLane(
    [run({ conclusion: "success", created_at: "2026-09-11T09:00:00Z" }), run({ conclusion: "failure", created_at: "2026-09-11T11:30:00Z" })],
    { now, maxAgeHours: 30 }
  );
  assert.equal(shuffled.status, "failing");
  assert.equal(shuffled.consecutiveFailures, 1);

  console.log(`OK: automation health self-test (${WATCHED_LANES.length} lanes watched)`);
  process.exit(0);
}

// Everything below talks to the network. Guarding it on "this file is the entry
// point" keeps `classifyLane`, `correlatedMainFailure` and `renderBody`
// importable — by a test, or by whatever eventually consumes these findings —
// without a bare import demanding credentials and hitting the API.
const { pathToFileURL } = await import("node:url");
const IS_ENTRY_POINT = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;

if (IS_ENTRY_POINT) await report();

async function report() {
const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
if (!repo || !token) {
  console.error("GITHUB_REPOSITORY and GITHUB_TOKEN are required.");
  process.exit(2);
}

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28"
};

async function github(path, options = {}) {
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers ?? {}) }
  });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${path}: ${await response.text()}`);
  }
  return response.json();
}

const now = Date.now();
const rows = [];

for (const lane of WATCHED_LANES) {
  // Scheduled runs only. A manual dispatch or a push-triggered run proves the
  // workflow works; it does not prove the schedule is still being delivered,
  // which is the thing this sensor exists to see.
  let runs = [];
  try {
    const response = await github(`/actions/workflows/${encodeURIComponent(lane.file)}/runs?event=schedule&per_page=10`);
    runs = response.workflow_runs ?? [];
  } catch (error) {
    // A workflow file that has never run returns 404. That is a real finding
    // ("never"), not an API fault, so it falls through to classifyLane.
    if (!/GitHub API 404/.test(String(error))) throw error;
  }

  const verdict = classifyLane(runs, { now, maxAgeHours: lane.maxAgeHours });
  const row = { ...lane, ...verdict };

  // Name the failing jobs only for lanes that are actually failing, so the cost
  // stays proportional to the findings rather than to the number of lanes.
  if (verdict.status === "failing" && verdict.latest?.id) {
    const jobs = await github(`/actions/runs/${verdict.latest.id}/jobs?per_page=50`).catch(() => null);
    row.failingJobs = (jobs?.jobs ?? [])
      .filter((job) => FAILING_CONCLUSIONS.has(job.conclusion))
      .map((job) => job.name);
  }

  rows.push(row);
}

const findings = rows.filter((row) => row.status !== "ok");
const body = renderBody(rows, { repo, now });

if (JSON_OUT) {
  const { writeFile } = await import("node:fs/promises");
  await writeFile(JSON_OUT, JSON.stringify({ checked_at: new Date(now).toISOString(), lanes: rows }, null, 2));
}

if (DRY_RUN) {
  console.log(body);
} else {
  const issues = await github(`/issues?state=open&labels=${encodeURIComponent(ROLLING_ISSUE_LABEL)}&per_page=100`);
  const existing = issues.find((issue) => !issue.pull_request && issue.title === ROLLING_ISSUE_TITLE);
  const payload = {
    title: ROLLING_ISSUE_TITLE,
    body,
    labels: [ROLLING_ISSUE_LABEL],
    state: findings.length ? "open" : "closed"
  };
  if (existing) {
    await github(`/issues/${existing.number}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
  } else if (findings.length) {
    // Nothing is opened while every lane is healthy: an always-open green issue
    // trains the operator to ignore the label.
    await github("/issues", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
  }
}

console.log(
  JSON.stringify({
    checked: rows.length,
    likely_main_failure: correlatedMainFailure(rows),
    findings: findings.map(({ file, status, consecutiveFailures }) => ({ lane: file, status, consecutiveFailures }))
  })
);
}
