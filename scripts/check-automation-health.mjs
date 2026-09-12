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
//
// `failuresBeforeIncident` is the false-positive guard, and it is set by what a
// single failure actually costs rather than by taste. A daily lane that fails
// once has lost a whole ingestion window — dates, provenance or timestamps that
// will not be landed until tomorrow — so one failure is worth surfacing even
// though its cause may well be an upstream blip. An hourly price lane that
// fails once has spent one hour of a 24h display budget, which is absorbed
// silently by design, so it takes two consecutive failures before that is a
// finding. Either way the sensor reports only what the run concluded: it never
// attributes a failure to a provider, a rate limit or a WAF, because the run
// list is not evidence of any of those.
export const WATCHED_LANES = [
  { file: "daily-audit.yml", name: "Daily data audit", cadence: "daily 03:00", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "nightly-data-sync.yml", name: "Nightly data sync", cadence: "daily 03:30", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "tm-new-shows-pr.yml", name: "Ticketmaster new shows PR", cadence: "daily 04:00", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "seatgeek-cta-sync.yml", name: "SeatGeek CTA sync", cadence: "daily 05:00", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "vividseats-cta-sync.yml", name: "Vivid Seats CTA sync", cadence: "daily 05:30", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "impact-marketplace-provider-sync.yml", name: "Impact marketplace provider sync", cadence: "daily 06:00/06:30/07:00", maxAgeHours: 30, eventDriven: true, failuresBeforeIncident: 1, sharesMainGate: true },
  { file: "impact-marketplace-price-snapshots.yml", name: "Impact marketplace price snapshots", cadence: "hourly", maxAgeHours: 6, eventDriven: false, failuresBeforeIncident: 2, sharesMainGate: true },
  { file: "vividseats-price-snapshots.yml", name: "Vivid Seats price snapshots", cadence: "hourly", maxAgeHours: 6, eventDriven: false, failuresBeforeIncident: 2, sharesMainGate: true },
  { file: "price-freshness-check.yml", name: "Price freshness check", cadence: "hourly :35", maxAgeHours: 6, eventDriven: false, failuresBeforeIncident: 2, sharesMainGate: true },
  // The three sensors, this one included. Watching them was missing when this
  // shipped, and a watcher nobody watches is the gap that hides every other
  // gap: if this workflow stops running, the board it writes simply stops
  // changing, and a stale green board reads exactly like a healthy fleet.
  //
  // Self-watching is partial by construction and worth saying plainly: a run
  // that dies cannot report itself. What it does catch is the case that
  // actually happens — a sensor that has stopped being invoked, or that failed
  // on an earlier tick and is seen by a later one.
  //
  // The windows are set from measured delivery, not from the cron. GitHub
  // throttles frequent schedules hard: the `*/15` guard really arrives every
  // 2-5 hours (measured 2026-09-11/12: gaps of 3h41, 4h57, 4h37), and this
  // workflow's own 6-hourly poll landed 2h44 to 4h37 late on each of its first
  // three ticks. The window has to cover one dropped tick PLUS that lateness on
  // the run either side of it, and for the 6-hourly poll that is 6 + 4h37 +
  // 2h44 ~ 13h20 in the worst case already observed, so 12h would have raised a
  // false `stale` on the very run that recovered — which also excludes itself,
  // being still in progress. 20h leaves real margin and still catches a
  // schedule that has stopped. The guard's 12h is 2.4x its worst observed gap.
  //
  // None carry `eventDriven`: subscribing this workflow to its own completion
  // would recurse, and the freshness lane is push-driven on main, where a
  // dropped tick is already covered by its daily backstop.
  //
  // None `sharesMainGate` either. Correlation exists because every sanctioned
  // writer gates its commit on `test:mvp` against the tip of `main`, so two of
  // them failing together is evidence of one red check there. These three gate
  // nothing and publish nothing, so counting them as corroboration would point
  // an operator at `main` on the strength of two sensors wobbling, and would
  // promote an unrelated single price failure into a finding on that same false
  // evidence.
  { file: "automation-health.yml", name: "Automation health", cadence: "every 6h (:17) + lane completions", maxAgeHours: 20, eventDriven: false, failuresBeforeIncident: 1, sharesMainGate: false },
  { file: "generated-freshness.yml", name: "Generated freshness", cadence: "daily 04:40 + push to main", maxAgeHours: 30, eventDriven: false, failuresBeforeIncident: 1, sharesMainGate: false },
  { file: "pr-validation-head-guard.yml", name: "PR validation head guard", cadence: "every 15m (delivered every 2-5h) + PR events", maxAgeHours: 12, eventDriven: false, failuresBeforeIncident: 1, sharesMainGate: false },
  // The Stage 3 repair worker is not a sensor: it runs `test:mvp` against the
  // tip of `main` before it will open anything, so a red check there fails it
  // for exactly the reason it fails every writer. It therefore `sharesMainGate`
  // and counts towards the correlated-failure call. Not `eventDriven`: it runs
  // once a day and most runs end on NO SAFE WORK in seconds.
  { file: "work-queue-repair.yml", name: "Work queue repair", cadence: "daily 04:50", maxAgeHours: 30, eventDriven: false, failuresBeforeIncident: 1, sharesMainGate: true }
];

// A cancelled or skipped run is not a failure, but it is not proof of health
// either: it means that tick produced no verdict at all. One of them among fresh
// successes is a concurrency group doing its job. A run of them is a lane that
// has stopped completing — a job creeping past its `timeout-minutes` cap
// concludes `cancelled`, not `failure`, so treating neutrals as merely "skip and
// look further back" would report a lane that has not finished for days as
// healthy on the strength of an old success. `stalled` is that case.
// Both extensions GitHub accepts. Scanning only `.yml` would let a scheduled
// `.yaml` workflow pass the coverage assertion below while going unwatched —
// exactly the gap that assertion exists to close.
export const WORKFLOW_FILE = /\.ya?ml$/;

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
export function classifyLane(runs, { now, maxAgeHours, failuresBeforeIncident = 1 }) {
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

  // A verdict is a run that actually concluded pass or fail. Neutrals are not
  // verdicts, so the lane's health is judged on the age of the last real one.
  const verdicts = completed.filter((run) => !NEUTRAL_CONCLUSIONS.has(run.conclusion));
  if (verdicts.length === 0) {
    return {
      status: "stalled",
      detail: "Every recent scheduled run was cancelled or skipped; the lane has produced no pass/fail verdict.",
      consecutiveFailures: 0,
      latest
    };
  }

  const verdictAgeHours = (now - Date.parse(verdicts[0].created_at)) / 3_600_000;
  if (verdictAgeHours > maxAgeHours) {
    return {
      status: "stalled",
      detail: `Runs are still being scheduled, but the last one to reach a pass/fail verdict was ${verdictAgeHours.toFixed(1)}h ago (expected within ${maxAgeHours}h); the ticks since were cancelled or skipped. A job passing its timeout-minutes cap ends this way.`,
      consecutiveFailures: 0,
      latest: verdicts[0]
    };
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
  const detail = `Last ${consecutiveFailures} scheduled ${plural} concluded ${verdicts[0].conclusion}.`;

  // Below the lane's threshold this is recorded as context, not raised as a
  // finding: one failure on a lane that runs again within the hour is not yet
  // evidence of anything, and a sensor that opens an incident on it trains the
  // reader to ignore the label. `applyCorrelation` can still promote it, on the
  // evidence of another lane failing in the same window.
  if (consecutiveFailures < failuresBeforeIncident) {
    return {
      status: "flaky",
      detail: `${detail} Below this lane's ${failuresBeforeIncident}-failure threshold, so recorded but not raised.`,
      consecutiveFailures,
      latest: verdicts[0]
    };
  }

  return { status: "failing", detail, consecutiveFailures, latest: verdicts[0] };
}

/**
 * Two lanes failing in the same window is itself the evidence a single failure
 * lacks. Independent providers do not break together by chance, and every lane
 * gates its own write on `test:mvp` passing against the tip of `main`, so the
 * shared cause is usually one red check there rather than several provider
 * defects. On that evidence a sub-threshold `flaky` lane is promoted to a
 * finding — the corroboration is what the threshold was waiting for.
 *
 * Stated as a likelihood with a verification step, never as a verified cause:
 * this sensor reads the run list and does not run the suite.
 */
export function applyCorrelation(rows) {
  // Only lanes that actually share the gate can corroborate each other, or be
  // promoted on the strength of it. The sensors gate nothing and publish
  // nothing: two of them wobbling together says nothing whatever about `main`.
  const gated = (row) => row.sharesMainGate !== false;
  const failingNow = rows.filter((row) => gated(row) && (row.status === "failing" || row.status === "flaky"));
  if (failingNow.length < 2) return rows;
  return rows.map((row) =>
    gated(row) && row.status === "flaky"
      ? { ...row, status: "failing", detail: `${row.detail.split(" Below this lane's")[0]} Raised because ${failingNow.length - 1} other lane(s) are failing in the same window.` }
      : row
  );
}

/**
 * Whether the board should tell its reader to check `main` before investigating
 * any provider. Call it on rows that have already been through
 * `applyCorrelation`, where every corroborated lane is `failing`.
 */
export function correlatedMainFailure(rows) {
  return rows.filter((row) => row.sharesMainGate !== false && row.status === "failing").length >= 2;
}

// `flaky` is deliberately not a finding. It is printed on the board as context
// so a reader can see a lane wobbled, and it neither opens the rolling issue nor
// keeps it open — which is also what makes recovery work: once the failures stop
// the lane returns to `ok`, the finding set empties, and the issue closes.
const FINDING_STATUSES = new Set(["failing", "stalled", "stale", "never"]);
export const findingsOf = (rows) => rows.filter((row) => FINDING_STATUSES.has(row.status));

export function renderBody(rows, { repo, now }) {
  const findings = findingsOf(rows);
  const flaky = rows.filter((row) => row.status === "flaky");
  const header = findings.length
    ? `🔴 ${findings.length} of ${rows.length} scheduled lanes need attention`
    : `🟢 All ${rows.length} scheduled lanes healthy`;

  let body = "<!-- automation-health -->\n";
  body += `**Last check:** ${new Date(now).toISOString()}\n`;
  body += `**Status:** ${header}`;
  if (!findings.length && flaky.length) {
    body += ` (${flaky.length} recorded a single failure, below threshold)`;
  }
  body += "\n\n";
  body += "Read-only sensor over the scheduled write lanes. It never reruns, dispatches, merges, or changes a workflow. ";
  body += "`stale` means GitHub has not invoked the workflow recently enough, which no workflow can detect about itself; ";
  body += "`stalled` means it is being invoked but no longer reaching a pass/fail verdict. ";
  body += "`flaky` is a single failure on a lane that absorbs one — recorded as context, not raised, and not a reason this issue stays open.\n\n";

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

/**
 * The complete rolling-issue write, as data. Everything the sensor is permitted
 * to change lives in this object and nowhere else, which is what keeps "it only
 * maintains one issue" a property you can test rather than a claim in a comment.
 *
 * `state` is the recovery path: the moment the last finding clears, the same
 * upsert that raised the issue closes it, so a fixed lane cannot leave a stale
 * finding sitting open and permanently actionable.
 */
export function buildIssuePayload(rows, { repo, now }) {
  return {
    title: ROLLING_ISSUE_TITLE,
    body: renderBody(rows, { repo, now }),
    labels: [ROLLING_ISSUE_LABEL],
    state: findingsOf(rows).length ? "open" : "closed"
  };
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

  // One cancelled run among fresh verdicts is the concurrency group working: it
  // neither counts as a failure nor breaks the failure streak behind it.
  const cancelled = classifyLane([run({ conclusion: "cancelled" }), run({ conclusion: "failure", created_at: "2026-09-11T10:00:00Z" })], { now, maxAgeHours: 30 });
  assert.equal(cancelled.status, "failing");
  assert.equal(cancelled.consecutiveFailures, 1);
  assert.equal(classifyLane([run({ conclusion: "cancelled" }), run({ conclusion: "success", created_at: "2026-09-11T10:00:00Z" })], { now, maxAgeHours: 30 }).status, "ok");

  // --- stalled: invoked, but no longer finishing -----------------------------
  //
  // Drawn from the real case this caught. `daily-audit.yml` concluded
  // `cancelled` on two consecutive days by running 42 minutes against a
  // 40-minute `timeout-minutes` cap, with its last success two days back. A cap
  // breach ends as `cancelled`, not `failure`, so skipping neutrals and reading
  // the older success would have called a lane that had not completed for two
  // days healthy.
  assert.equal(classifyLane([run({ conclusion: "cancelled" })], { now, maxAgeHours: 30 }).status, "stalled");
  const stalled = classifyLane(
    [
      run({ conclusion: "cancelled", created_at: "2026-09-11T07:33:00Z" }),
      run({ conclusion: "cancelled", created_at: "2026-09-10T07:35:00Z" }),
      run({ conclusion: "success", created_at: "2026-09-09T07:38:00Z" })
    ],
    { now: Date.parse("2026-09-11T12:30:00Z"), maxAgeHours: 30 }
  );
  assert.equal(stalled.status, "stalled");
  assert.match(stalled.detail, /last one to reach a pass\/fail verdict was 52\.9h ago/);
  assert.equal(findingsOf([stalled]).length, 1);

  // A cancelled tick with a verdict still inside the window is not stalled.
  assert.equal(
    classifyLane([run({ conclusion: "cancelled" }), run({ conclusion: "success", created_at: "2026-09-10T11:00:00Z" })], { now, maxAgeHours: 30 }).status,
    "ok"
  );

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

  // --- false-positive guard -------------------------------------------------
  //
  // One failure on an hourly lane is recorded, not raised: it costs an hour of a
  // 24h display budget, and the lane runs again within the hour. Two in a row is
  // a finding, because that is no longer a wobble.
  const oneHourlyFailure = classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 6, failuresBeforeIncident: 2 });
  assert.equal(oneHourlyFailure.status, "flaky");
  assert.match(oneHourlyFailure.detail, /recorded but not raised/);
  assert.equal(findingsOf([oneHourlyFailure]).length, 0);
  assert.equal(
    classifyLane([run({ conclusion: "failure" }), run({ conclusion: "failure", created_at: "2026-09-11T10:00:00Z" })], { now, maxAgeHours: 6, failuresBeforeIncident: 2 }).status,
    "failing"
  );

  // A daily lane does not absorb a failure: one lost run is a lost ingestion
  // window, so its threshold is 1 and the same single failure is a finding.
  assert.equal(classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 30, failuresBeforeIncident: 1 }).status, "failing");

  // --- correlation ----------------------------------------------------------
  //
  // A lone sub-threshold failure stays context. Corroboration from a second lane
  // in the same window is the evidence the threshold was waiting for, so both
  // become findings and the board tells the reader to check main first.
  const loneFlake = applyCorrelation([{ ...oneHourlyFailure, file: "a.yml" }, { status: "ok", file: "b.yml" }]);
  assert.equal(loneFlake[0].status, "flaky");
  assert.equal(correlatedMainFailure(loneFlake), false);

  const corroborated = applyCorrelation([
    { ...oneHourlyFailure, file: "a.yml" },
    { ...oneHourlyFailure, file: "b.yml" },
    { status: "ok", file: "c.yml" }
  ]);
  assert.equal(corroborated[0].status, "failing");
  assert.equal(corroborated[1].status, "failing");
  assert.match(corroborated[0].detail, /other lane\(s\) are failing in the same window/);
  assert.doesNotMatch(corroborated[0].detail, /recorded but not raised/);
  assert.equal(corroborated[2].status, "ok");
  assert.equal(correlatedMainFailure(corroborated), true);

  // The sensors are not part of that evidence. Correlation says "check main"
  // because every sanctioned writer gates its commit on `test:mvp` there; the
  // sensors gate nothing, so two of them failing together is not evidence of
  // anything about main, and must not promote an unrelated price wobble either.
  const sensorsFailing = applyCorrelation([
    { file: "automation-health.yml", sharesMainGate: false, ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 20, failuresBeforeIncident: 1 }) },
    { file: "pr-validation-head-guard.yml", sharesMainGate: false, ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 12, failuresBeforeIncident: 1 }) },
    { ...oneHourlyFailure, file: "prices.yml", sharesMainGate: true }
  ]);
  assert.equal(correlatedMainFailure(sensorsFailing), false, "two failing sensors must not be read as a red main");
  assert.equal(sensorsFailing[2].status, "flaky", "a sensor failure must not promote a sub-threshold writer failure");
  // A sensor failure is still reported on its own terms — excluded from the
  // correlation, not from the board.
  assert.equal(findingsOf(sensorsFailing).length, 2);

  // One real writer failure plus two sensor failures is still one writer
  // failure: the corroboration threshold is counted among gated lanes only.
  const oneWriterTwoSensors = applyCorrelation([
    { file: "a.yml", sharesMainGate: true, ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 30, failuresBeforeIncident: 1 }) },
    { file: "automation-health.yml", sharesMainGate: false, ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 20, failuresBeforeIncident: 1 }) },
    { file: "generated-freshness.yml", sharesMainGate: false, ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 30, failuresBeforeIncident: 1 }) }
  ]);
  assert.equal(correlatedMainFailure(oneWriterTwoSensors), false);

  // --- recovery -------------------------------------------------------------
  //
  // The finding must not outlive the problem. Once a lane's failures stop it
  // returns to `ok`, the finding set empties, and the same upsert that raised
  // the rolling issue closes it — so a fixed lane cannot leave a stale finding
  // sitting open and permanently actionable.
  const brokenBoard = [{ file: "a.yml", name: "A", cadence: "daily", ...classifyLane([run({ conclusion: "failure" })], { now, maxAgeHours: 30, failuresBeforeIncident: 1 }) }];
  assert.equal(buildIssuePayload(brokenBoard, { repo: "o/r", now }).state, "open");

  const recoveredBoard = [{ file: "a.yml", name: "A", cadence: "daily", ...classifyLane([run({ conclusion: "success" }), run({ conclusion: "failure", created_at: "2026-09-11T10:00:00Z" })], { now, maxAgeHours: 30, failuresBeforeIncident: 1 }) }];
  assert.equal(recoveredBoard[0].status, "ok");
  assert.equal(buildIssuePayload(recoveredBoard, { repo: "o/r", now }).state, "closed");
  assert.match(buildIssuePayload(recoveredBoard, { repo: "o/r", now }).body, /All 1 scheduled lanes healthy/);

  // A lane that recovers but is still wobbling closes the issue too: `flaky` is
  // context, never a reason to keep a finding open.
  const wobblingBoard = [{ file: "a.yml", name: "A", cadence: "hourly", ...oneHourlyFailure }];
  assert.equal(buildIssuePayload(wobblingBoard, { repo: "o/r", now }).state, "closed");
  assert.match(buildIssuePayload(wobblingBoard, { repo: "o/r", now }).body, /below threshold/);

  // Every write this sensor is permitted to make is in that payload: one title,
  // one body, one label, one state. Nothing addresses another issue or the repo.
  assert.deepEqual(Object.keys(buildIssuePayload(recoveredBoard, { repo: "o/r", now })).sort(), ["body", "labels", "state", "title"]);
  assert.deepEqual(buildIssuePayload(recoveredBoard, { repo: "o/r", now }).labels, [ROLLING_ISSUE_LABEL]);

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
  // Declared explicitly on every lane rather than defaulted, so adding a lane
  // forces the question "does this one gate a write on main?" to be answered.
  assert.ok(
    WATCHED_LANES.every((lane) => typeof lane.sharesMainGate === "boolean"),
    "every lane must declare sharesMainGate"
  );
  assert.deepEqual(
    WATCHED_LANES.filter((lane) => !lane.sharesMainGate).map((lane) => lane.file).sort(),
    ["automation-health.yml", "generated-freshness.yml", "pr-validation-head-guard.yml"],
    "the sensors, and only the sensors, are excluded from writer correlation"
  );
  // GitHub accepts either extension for a workflow file, so the coverage scan
  // below must recognise both or a scheduled `.yaml` lane slips past it.
  assert.ok(WORKFLOW_FILE.test("scheduled-lane.yaml"));
  assert.ok(WORKFLOW_FILE.test("scheduled-lane.yml"));
  assert.equal(WORKFLOW_FILE.test("notes.md"), false);
  // A lane that absorbs a single failure must be one that runs again soon. Tying
  // the threshold to the staleness window stops the two drifting apart into a
  // daily lane that quietly swallows a whole lost day.
  for (const lane of WATCHED_LANES) {
    assert.ok(lane.failuresBeforeIncident >= 1, `${lane.file} needs a failuresBeforeIncident of at least 1`);
    if (lane.maxAgeHours > 6) {
      assert.equal(lane.failuresBeforeIncident, 1, `${lane.file} runs at most daily, so one failure is already a lost window`);
    }
  }

  // A renamed or deleted workflow would otherwise make this sensor report
  // "never" forever against a file that no longer exists — a watcher quietly
  // watching nothing is worse than no watcher, because the green board is read
  // as coverage. Fail here instead, at the point someone can still fix it.
  const { readdir, readFile } = await import("node:fs/promises");
  const workflowDir = new URL("../.github/workflows/", import.meta.url);
  const present = new Set(await readdir(workflowDir));
  const missing = WATCHED_LANES.map((lane) => lane.file).filter((file) => !present.has(file));
  assert.deepEqual(missing, [], `WATCHED_LANES names workflow files that do not exist: ${missing.join(", ")}`);

  // The converse, which is the gap this sensor shipped with: a scheduled
  // workflow nobody watches. Coverage was a list maintained by hand, so the two
  // sensors added the day after this one — and this one itself — were simply
  // never added to it, and the board read as full coverage while three lanes
  // ran unobserved. Every workflow carrying a `schedule:` trigger must appear
  // in WATCHED_LANES; there is deliberately no exclusion list, so adding a
  // scheduled workflow fails here until it is either watched or unscheduled.
  const scheduledFiles = [];
  for (const file of [...present].filter((name) => WORKFLOW_FILE.test(name)).sort()) {
    const source = await readFile(new URL(file, workflowDir), "utf8");
    if (/^[ \t]*schedule:[ \t]*$/m.test(source)) scheduledFiles.push(file);
  }
  const watchedFiles = new Set(WATCHED_LANES.map((lane) => lane.file));
  const unwatched = scheduledFiles.filter((file) => !watchedFiles.has(file));
  assert.deepEqual(unwatched, [], `scheduled workflows missing from WATCHED_LANES: ${unwatched.join(", ")}`);

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
    // 50, not 10. `stalled` is judged on the age of the last pass/fail verdict,
    // so the page has to reach back past every neutral run inside the lane's
    // window. Ten runs is 2.5h of a `*/15` schedule delivered on time, well
    // short of a 12h window, and a lane whose last ten ticks were cancelled
    // would read as stalled while a success sat just off the end of the page.
    // One request either way; only the payload grows.
    const response = await github(`/actions/workflows/${encodeURIComponent(lane.file)}/runs?event=schedule&per_page=50`);
    runs = response.workflow_runs ?? [];
  } catch (error) {
    // A workflow file that has never run returns 404. That is a real finding
    // ("never"), not an API fault, so it falls through to classifyLane.
    if (!/GitHub API 404/.test(String(error))) throw error;
  }

  const verdict = classifyLane(runs, {
    now,
    maxAgeHours: lane.maxAgeHours,
    failuresBeforeIncident: lane.failuresBeforeIncident
  });
  rows.push({ ...lane, ...verdict });
}

// Corroboration across lanes is evidence a single lane cannot supply, so it is
// applied once the whole board is known rather than per lane.
const correlated = applyCorrelation(rows);
const findings = findingsOf(correlated);

// Name the failing jobs only for lanes that ended up as findings, so the API
// cost stays proportional to what is wrong rather than to how many lanes exist.
for (const row of correlated) {
  if (row.status !== "failing" || !row.latest?.id) continue;
  const jobs = await github(`/actions/runs/${row.latest.id}/jobs?per_page=50`).catch(() => null);
  row.failingJobs = (jobs?.jobs ?? [])
    .filter((job) => FAILING_CONCLUSIONS.has(job.conclusion))
    .map((job) => job.name);
}

const payload = buildIssuePayload(correlated, { repo, now });

if (JSON_OUT) {
  const { writeFile } = await import("node:fs/promises");
  await writeFile(JSON_OUT, JSON.stringify({ checked_at: new Date(now).toISOString(), lanes: correlated }, null, 2));
}

if (DRY_RUN) {
  console.log(payload.body);
} else {
  const issues = await github(`/issues?state=open&labels=${encodeURIComponent(ROLLING_ISSUE_LABEL)}&per_page=100`);
  const existing = issues.find((issue) => !issue.pull_request && issue.title === ROLLING_ISSUE_TITLE);
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
    checked: correlated.length,
    likely_main_failure: correlatedMainFailure(correlated),
    findings: findings.map(({ file, status, consecutiveFailures }) => ({ lane: file, status, consecutiveFailures }))
  })
);
}
