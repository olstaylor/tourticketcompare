# Operations

Workflow schedules, secrets/bindings reference, and known infrastructure incidents. Durable architecture and contracts live in [ARCHITECTURE.md](ARCHITECTURE.md); the deploy runbook and full configuration setup steps live in [DEPLOYMENT.md](DEPLOYMENT.md) (this file does not repeat that detail — it is the live activation/schedule snapshot). Current data counts and per-artist state live in [PROJECT_STATUS.md](../PROJECT_STATUS.md). Content/data task tracking (affiliate follow-ups, storefront rechecks, roster growth, the price-alert demand gate) lives in [BACKLOG.md](../BACKLOG.md) — this file covers infrastructure/automation only.

## Scheduled workflows

All times UTC. What each lane may write, and the gated auto-merge contract every write-capable lane now publishes through, are defined in [DEPLOYMENT.md → Repository write capability](DEPLOYMENT.md#repository-write-capability); this table is only the schedule and current behavior.

| Workflow | Schedule | Behavior |
|---|---|---|
| `daily-audit.yml` | 03:00 + dispatch | URL liveness + Ticketmaster Discovery diff to the rolling `automation:daily-audit` issue; publishes `last_verified_at` bumps for clean artists through an auto-merged PR. A `status-figures` job also runs daily and publishes the generated blocks in `PROJECT_STATUS.md` (route surface, empty boards) the same way, regardless of the audit job's own outcome. |
| `nightly-data-sync.yml` | 03:30 + dispatch (queues behind `daily-audit.yml` on the shared `ticketmaster-api` concurrency group, so it starts later whenever that lane is still running) | Auto-commits lossless factual updates only (date/time, venue, `event_name`, canonical TM URL); anything needing judgement goes to `automation:data-sync`. Scheduled runs reuse fresh exact-ID audit responses where valid; dispatch defaults to dry-run and always fetches directly. |
| `tm-new-shows-pr.yml` | 02:40 and 16:20 + dispatch (the 16:20 pass, owner-approved 2026-10-02, lists tours announced that US morning the same day; 02:40 is requested before the two per-event Ticketmaster sweeps so the shared quota cannot run out before it) | New-show discovery PR; auto-merges after in-run validation. `tour_name` stays blank for human review. The run ends red when a quarter or more of the artists could not be looked up, after publishing whatever the rest found, so a quota outage is no longer a green run that found nothing. |
| `seatgeek-cta-sync.yml` | 05:00 + dispatch | High-confidence SeatGeek event-link enrichment + identity-anchored provenance verification; auto-merges after in-run validation. |
| `vividseats-cta-sync.yml` | 05:30 + dispatch | Catalog-backed Vivid Seats event-link/provenance sync; auto-merges after in-run validation. |
| `impact-marketplace-provider-sync.yml` | TicketNetwork 06:00, Ticket Liquidator 06:30, StubHub International 07:00 (serialized) | Unambiguous exact-event link PRs; scheduled runs auto-merge after in-run validation. Manual dispatch is preview-first; a manual apply opens a review-only PR. |
| `impact-marketplace-price-snapshots.yml` | hourly full roster (:17), extra final-48h pass (:47) + push to workflow/config/writer/timing helpers + dispatch | Exact-ID D1 snapshots for TicketNetwork + StubHub International; durable timing capture; 90-day change-history prune. D1 only, never the repo. |
| `vividseats-price-snapshots.yml` | hourly full roster (:47), extra final-48h pass (:17) + push to workflow/writer/timing helpers + dispatch | Exact-event D1 snapshots and durable timing capture; same change-history prune. D1 only. |
| `price-freshness-check.yml` | hourly (:35) + dispatch | Read-only probe of the live `/api/shows` cache-only price lanes; fails when no expected provider lane is serving a fresh price. Watches the site, not the writers, so a snapshot cron that silently stops firing still surfaces. Writes nothing. |
| `price-coverage-report.yml` | daily 09:15 + dispatch | Read-only probe of the live `/api/shows` price payload (`scripts/report-price-coverage.mjs`). Fails when under 90% of on-sale dates mapped on a price lane (Vivid Seats, TicketNetwork, StubHub International) show a price, or when over 25% of displayed prices are older than 12h, the partial regressions `price-freshness-check.yml` cannot see. Rewrites the rolling `automation:price-coverage` issue with the zero-price-source backlog by artist and country. Writes nothing else. |
| `site-health.yml` | daily 09:40 + dispatch | Production crawl of every URL in the live sitemap index (status, redirects, noindex, canonical, title, H1, JSON-LD, duplicate titles, 5xx under parallel load), sitemap-segment agreement, `/api/health`, the price-coverage gates, and links to the open findings of the self-closing sensors (`automation:daily-audit`, `automation:health`, `automation:prelaunch-validation`) and work-queue items. Rewrites the rolling `automation:site-health` issue and closes it when clear. Never opens a PR. Runbook: `docs/ARTIST_INGESTION.md` → Keeping it healthy. |
| `seatgeek-price-snapshots.yml` | dispatch-only | Inert escape hatch — SeatGeek's API returns null pricing stats (permanent, see [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md)). |
| `bootstrap-provider-pricing-schema.yml`, `tm-data-refresh-pr.yml` (PR-based refresh of existing events), `seatgeek-discovery-proposal.yml` | dispatch-only | Manual; never auto-merge. |
| `date-alerts.yml` | dispatch-only | Artist date-alert emails (`scripts/send-date-alerts.mjs`): `preview` counts due alerts and writes nothing, `test` sends one sample to a given address, `send` emails due signups once each, up to the run's `limit` (default 500; the log says if more remain, so run it again), and records each in D1. No schedule until the owner chooses one. |
| `weekly-digest.yml` | dispatch-only | Weekly presale and on-sale email (`scripts/send-weekly-digest.mjs`) for signups who ticked the optional updates box (`email_update_consents`): `preview` lists this week's items and how many are due, `test` sends this week's email to a given address, `send` emails each due address once per ISO week and records it in D1. Sends nothing in a week with nothing opening. Shares the date-alert secrets and concurrency group. No schedule until the owner chooses one. |
| `content-build.yml` | pushes touching `content/blog/**` + dispatch | Compiles `content/blog/*.md` and publishes `public/data/blog-content.json` through an auto-merged PR, only after the full validation suite passes in-job on exactly that output. |
| `indexnow-ping.yml` | pushes touching indexable-route data/code + dispatch | Submits the live sitemap URL list to IndexNow after the deploy lands. Writes nothing to the repo or D1. |
| `prelaunch-validation.yml` | PRs + dispatch | Validation suite (`npm run test:mvp` plus the patch-whitespace check). |
| `pr-validation-head-guard.yml` | PR opened/synchronized/reopened/edited/draft-toggled/closed, completed `Prelaunch Validation` run, every 15 minutes + dispatch | Read-only exact-head check for open non-draft PRs targeting `main`; updates the rolling `automation:prelaunch-validation` issue only for missing, failed, or over-30-minute validation. It never reruns, approves, merges, or changes a PR. |
| `automation-health.yml` | completed scheduled run of the six daily lanes, every 6 hours (:17) + dispatch | Read-only outside observer for all twelve scheduled lanes — the nine write/price lanes plus the three sensors themselves, this one included, since a watcher nobody watches turns a stale green board into apparent coverage; its self-test asserts that every workflow carrying a `schedule:` trigger is watched, with no exclusion list, so a new scheduled lane cannot ship unobserved — reporting three things none of them can detect about itself: a lane whose recent scheduled runs **failed**, a lane GitHub has **stopped invoking** (`stale`), and a lane still being invoked but no longer reaching a pass/fail verdict (`stalled` — what a job breaching `timeout-minutes` looks like, since that ends as `cancelled` rather than `failure`). Two or more lanes failing together is called out as a likely red `main` rather than several provider defects. A single failure on an hourly lane is recorded as `flaky` context and not raised unless another lane corroborates it. Updates the rolling `automation:health` issue and closes it once every finding clears. Writes nothing to the repository and never reruns, dispatches, or merges. |
| `generated-freshness.yml` | push to `main` touching content/functions/public/data or a generator, daily 04:40 + dispatch | Runs the repository's own `--check` staleness guards over a fixed allowlist of generated artefacts, and materialises a work item only once it has proved in the same run that regenerating is the repair. Restores everything it touches and asserts the tree is unchanged. Read-only over the repository. |
| `work-queue-repair.yml` | daily 04:50 + dispatch | Stage 3 of the maintenance loop. Takes **one** supported `agent:ready` issue, re-proves it, regenerates an allowlisted artefact or batch-verifies SeatGeek URLs, validates, and opens **one** human-reviewed PR. It never merges. Provider work requires `SEATGEEK_CLIENT_ID`. |
| `roster-candidates.yml` | daily 10:15 + dispatch | Propose-only auto-promote screen. It puts open owner requests from `data/artist-requests.json` first (relaxed D3/D4, `scripts/artist-requests.mjs`), then runs `roster:forecast:candidates`, then SeatGeek and Ticketmaster identity capture (`propose-onboarding-batch.mjs`), then criteria D1–D5 (`scripts/lib/artist-screen.mjs`, brand-safety denylist `data/artist-denylist.json`), and rewrites the rolling `automation:roster-candidates` issue with the artists that would qualify and the reasons the others are held. It writes no repository file and promotes nobody. |
| `price-guide-candidates.yml` | daily 11:05 + dispatch | Propose-only tour-launch queue for artist price guides (`scripts/propose-price-guides.mjs`). Lists indexable artists without a guide whose Ticketmaster public on-sales opened in the last 30 days or open in the next 60 for at least 6 dates, with the gate verdict each would get, and rewrites the rolling `automation:price-guide-candidates` issue. Writes no repository file; approving a candidate is a human PR adding its slug to `PRICE_GUIDE_ARTISTS` in `functions/_price-guides.js`. |
| `auto-promote.yml` | daily 10:45 + dispatch | Sanctioned path D (`SAFE_PUBLISHING_RULES.md`). Ends green at its first step unless `AUTOPROMOTE_ENABLED` is `true` (and `AUTOPUBLISH_ENABLED` is not `false`). When on: re-runs the forecast, identity capture and D1–D5 screen, then `scripts/auto-promote.mjs` writes template shell + promotion through `promote-artists-batch.mjs`'s writer (6/day, 40/week, `promotion_source: "auto"`), ingests each new artist's Ticketmaster dates and SeatGeek event links, checks `out.js` changed by `VERIFIED_TICKET_LINKS` additions only, runs `test:mvp` + `test:providers`, and opens an auto-merged `automation:autopromote` PR (publish class `autopromote`). To switch on: set repo variable `AUTOPROMOTE_ENABLED=true`. To undo one artist: `node scripts/demote-artist.mjs --slug <slug> --reason "<why>" --write`. |
| `autopublish-health.yml` | daily 09:00 + dispatch | Rollback sensor for auto-promoted artists (`promotion_source: "auto"`). Demotes on a `data/artist-denylist.json` match, an artist-level link answering 404/410 twice (blocks and 5xx are inconclusive), or a rendered `<title>` shared with another indexable page. Zero upcoming dates never demotes. More than 5 findings in one run is treated as a sensor fault: nothing is demoted and the run fails. A demotion (`scripts/demote-artist.mjs`) writes records only: a `review_required` shell with a `demoted` marker, and unpublished catalog links. It auto-merges as publish class `demote`, which the pause does not stop. Inert until the first auto-promoted artist exists. |
| `autopublish-digest.yml` | daily 08:30 + dispatch | Lists every PR merged in the last 24h under the `autopublish` ledger label, grouped by lane with a `git revert` command each, plus held PRs, the kill-switch values, and expected daily lanes that wrote nothing. Rewrites the rolling `automation:autopublish-digest` issue. Writes nothing to the repository and never merges or reverts. |

### Auto-publish kill switch and ledger

Every automated merge goes through one of two scripts, `scripts/open-automation-pr.mjs` or `scripts/sync-tm-events-write-pr.mjs`. Both call `scripts/lib/autopublish-guard.mjs` twice: once before the validation wait and once immediately before the merge. Each call reads the repository variables **live** from the API rather than from the job's env snapshot, so flipping a switch also stops a run that is already in progress.

- **`AUTOPUBLISH_ENABLED`** covers every automated merge. If it is unset, or set to anything but `false`, the existing lanes keep running. Setting it to `false` holds all of them. To pause everything: Settings → Secrets and variables → Actions → Variables, then set it to `false`.
- **`AUTOPROMOTE_ENABLED` / `STAGE4_ENABLED`** are the class flags for auto-promote and the future maintenance auto-merge. Both are off unless set to `true`, and the global switch overrides them. `auto-promote.yml` uses `AUTOPROMOTE_ENABLED` (it does nothing while it is not `true`); no lane uses `STAGE4_ENABLED` yet. While both switches let auto-promote publish, the digest expects `automation:autopromote` daily and lists it if it wrote nothing.
- **Held** means the PR stays open for a human. It gets the `autopublish:held` label and one comment naming the reason. A deliberate pause exits 0, so it cannot read as a red lane or trip the correlated red-`main` call. A switch the guard **cannot read** is a fault: the merge is still held (fail-closed), but the run exits 1.
- **Demotion is never paused.** The `demote` class used by `autopublish-health.yml` skips the switch read entirely, so neither a pause nor an unreadable switch can stop an unpublish. `/api/out` refuses every artist-level and event-level redirect for a record carrying `demoted`, and fails closed (503 `artist_state_unavailable`) if it cannot read `artists.json`.
- **The ledger** is GitHub's own history. The guard adds the `autopublish` label before every merge, and if the label cannot be added, the merge is withheld. The digest reads that label.

Reading variables needs **Variables: read** on the automation App installation (granted 2026-09-23). `.github/actions/automation-identity` mints with **no explicit permission list**, so the token carries exactly the installation's permissions: GitHub's token API has no `variables` key, and requesting one returns 422 for every lane. Keep the App's own permission list minimal, since every automation token now inherits it, and never grant Variables write, which would let a lane change its own switch. **Grant the permission on the App before this code reaches `main`.** A mint that asks for a permission the installation lacks fails outright, not just the switch read. Lanes that fall back to `GITHUB_TOKEN` (App rollout off) cannot read variables, so they hold every merge.

### The work queue

The rolling `automation:*` issues are **dashboards**: one per sensor, rewritten in full each run, and the complete operator view. They stay that way.

Alongside them, `scripts/materialize-work-queue.mjs` promotes the small subset of findings worth tracking as **individual units of work** into discrete issues carrying the `work-queue` label. It runs inside `automation-health.yml` and `generated-freshness.yml`, in each case after that workflow has produced its own structured output, and reads the sensor's structured JSON rather than the prose it renders for humans. It writes issues and nothing else — no branch, no commit, no pull request, no model call.

A finding is promoted only when it has a stable identity, confirmed evidence, bounded scope and acceptance criteria that can be stated in advance. Classification is a fixed table in `scripts/lib/work-queue.mjs`, never a judgement made per finding: each type declares the surfaces it touches, anything touching a surface in `RED_SURFACES` is forced to `risk:red`, and `risk:red` can never carry `agent:ready`. An unrecognised finding type is not materialised at all rather than defaulting to anything.

Labels are `work-queue`, `source:<sensor>`, `priority:P0`–`P3`, `risk:green|amber|red`, and one of `agent:ready` or `human-required`. **A queue item must never carry an `automation:*` label.** Three rolling writers — `daily-audit-report.mjs`, `report-tm-sync-review.mjs` and `report-tm-discovery-coverage.mjs` — select their dashboard as "the first open issue carrying the label" with no title filter, so a queue item wearing one would be found and overwritten with a dashboard body on the next run. The self-test asserts no queue label starts with `automation:`.

Identity is a fingerprint over `source + type + identity tuple`, recorded in an HTML comment at the top of the issue body. Evidence, ordering and prose are excluded from it, so a re-run updates the same issue rather than opening a second one. Recovery closes an issue when its finding clears, **except** while an open pull request references it — remediation in flight is exactly when closing the task would lose the context its author is working from.

**The original `agent:ready` class is stale generated output.** `scripts/check-generated-freshness.mjs` watches four artefacts — `public/data/blog-content.json`, `public/data/guides-content.json` with `functions/_guide-routes.generated.js`, the Open Graph cards with `functions/_og-cards.generated.js`, and `data/content-provenance.json`. Each is generated from sources already committed here, by a fixed command, and each already ships a `--check` guard documented as "fail if the committed file is stale". For the Open Graph cards that guard is `npm run og:coverage:check` (every current indexable route has a card), not `og:check`, which deliberately tolerates uncovered routes so CI does not fail on calendar movement — so routes that appear with an event sync get a card-rebuild pull request the next morning.

A red check is not by itself a finding. The sensor regenerates, confirms the declared artefacts changed, and confirms the same check then passes; only that proven sequence becomes a work item. A check that fails because the generator itself errored, because regenerating changed nothing, or because regenerating did not fix it, is reported in the run log and deliberately left alone — those mean a check is red for a reason this class does not understand, and "regenerate this" would be the wrong instruction. A workspace that was already dirty fails closed for the same reason: drift cannot be measured against a modified file.

The generated-output class is `risk:amber`, not green, because these artefacts reach public output — guide routes, sitemap `lastmod`, the IndexNow ping, social cards. An agent may open one pull request; a human still approves it. The allowlist is the safety boundary and is asserted to contain no event, artist, catalog, redirect or migration path, so no amount of regeneration can reach commercial or provider semantics.

Storm protection is two fixed caps: at most 5 new issues per run and at most 25 open queue items. A run wanting more than that is far more likely to be a broken sensor than a real emergency. Nothing is hidden by refusing — every finding already sits in its sensor's rolling issue, which this layer never touches, and the withheld set is printed in the run log. The cap withholds a *task*, never evidence.


**Cron times are request times, not start times.** GitHub can run these queues significantly late; the relative order the schedule encodes holds even when absolute times drift. Missing credentials make every scheduled lane no-op safely (no rows, no PR); auth/config failures in the SeatGeek lane abort with no writes.

**Late starts are queued, not raced.** The relative order only holds if a lane starts after the one before it has merged, and a late GitHub start can break that. So the scheduled event-data lanes (nightly data sync, TM new shows, SeatGeek CTA, Vivid Seats CTA, Impact marketplace sync, and the provider-capable Stage 3 worker) first run `scripts/wait-for-writer-lanes.mjs`. It waits, for up to 14 minutes (20 for Vivid Seats CTA sync after the 2026-10-07/08 timeouts), until no *older* run of any workflow that commits event data is still in flight, then fast-forwards the checkout to the branch tip. The order is first-in, first-out by run creation time, so two runs can never wait on each other. It is an ordering aid, not a gate: an API error or an exhausted budget carries on exactly as before, and at worst that day's PR conflicts. A shared `concurrency:` group is deliberately not used, because GitHub keeps one pending run per group and cancels the rest. `writer-lanes:self-test` derives the writer set from the workflow files, so a new writer cannot go unlisted.

**Provider URL coverage (`event_needs_provider_url`, P2, amber, agent-ready).** `generated-freshness.yml` also runs `scripts/report-provider-url-work.mjs` on data pushes and daily at 04:40. This read-only sensor identifies upcoming, time-resolvable events with missing or inconsistent SeatGeek URL/provenance, excluding cancelled and postponed dates. It groups exact event IDs into batches of at most 20 for one artist, anchored to that artist's registry-verified performer ID. Batches without verified identity remain in the complete report, preserve existing findings, and open no new agent task. Tour labels and historical `needs_recheck` counts are reported, never inferred or changed. The complete JSON is retained as the `provider-url-coverage` Actions artifact, including findings withheld by the queue caps.

Provider fingerprints include artist, provider and exact event IDs. Batches with no verified resale lane come first; P1 generated repairs precede P2 provider work. Coverage has additional caps of 2 new issues per run and 10 open provider issues, preserving room under the global 5/25 caps for incidents. After a partial repair merges, the sensor closes the old batch and materialises the remaining gaps as a new identity; it holds the old issue while a PR references it.

### Stage 3 — the bounded repair worker

`work-queue-repair.yml` is the only thing in the repository that consumes an `agent:ready` queue item. One run performs one contract and stops:

> take ONE supported `agent:ready` issue → revalidate that the finding still holds → perform the bounded repair its type permits → run the required validation → open ONE pull request → stop.

**It supports `generated_artifact_stale` and `event_needs_provider_url`.** Eligibility is decided in `scripts/lib/work-queue-repair.mjs` from structured input only — the labels, and the machine-readable JSON block Stage 2 writes into the issue body. No prose is read anywhere. An item must be open, carry `work-queue` and `agent:ready`, carry exactly one `risk:` label whose value is `green` or `amber`, exactly one valid `priority:`, exactly one `source:` matching the type's own sensor, and no `automation:*` dashboard label; the block must parse, agree with every one of those labels, declare `agent:ready` execution, and name an allowlisted artefact or a bounded provider batch. Any missing, contradictory or unrecognised field ends the run with no work.

**The repair comes from trusted repository code, never from the issue.** The block names an `artefact_id`; the command, the generated files and the required validation are then looked up in `GENERATED_ARTEFACTS` in `scripts/check-generated-freshness.mjs` — the same fixed allowlist the sensor runs. The issue's own copies of those strings are only ever *compared* to the trusted entry, and a disagreement stops the item rather than being followed. Commands are additionally shape-checked at the point of execution: anything that is not `npm run <script>` is refused, so a corrupted entry could not smuggle a shell fragment through either. Git is called with an argument array and no shell, and the branch name is derived from the artefact id and the finding fingerprint and refused unless it matches that exact shape.

**The diff is bounded before anything is committed.** The worker requires a clean tree, confirms the artefact's own check still fails, runs the generator once, and then compares the *whole* working tree — not just the paths it expected — against the entry's declared artefacts. A change outside them, or one touching a protected commercial, provider, routing, migration or workflow surface, ends the run as `NEEDS HUMAN` with the *whole* tree restored — not merely the declared paths, since the clean-tree precondition makes everything the run produced its own to undo, and a scoped restore would leave exactly the undeclared changes that stopped it. It then confirms the same check passes, runs the entry's required validation (which always includes `npm run test:mvp`) plus `git diff --check`, and only then commits and pushes.

**Provider batches use the existing verifier, with a field-level boundary.** The worker re-reads the events and registry, confirms the issue's performer ID and each exact event/artist identity, and drops gaps already resolved, expired, cancelled or postponed. Missing `SEATGEEK_CLIENT_ID` reports `BLOCKED`. It invokes `verify-seatgeek-events.mjs --apply --add-only` with repeated `--event-id` arguments, a fixed 40-call budget and a ten-minute subprocess timeout. This retains the verifier's performer, UTC-instant, city, venue and URL-shape checks. Only positive matches may write; the queue cannot clear or unverify a link. Auth failures, transient errors, incomplete batches and malformed reports block publication and restore changes. A completed batch with no positive matches reports `NEEDS HUMAN`; ambiguous or absent listings are never guessed.

A successful partial batch may open a PR for its positive matches while listing every unresolved event in the PR and issue outcome. Before validation and again afterwards, the worker checks that event membership/order is unchanged and only the selected events' `seatgeek_url` and `provider_links.seatgeek` differ, supported by successful verifier results. The artist partition must mirror those exact changes. Its file allowlist is `events.json`, that artist's partition, and `PROJECT_STATUS.md` refreshed by the existing status writer. Production event and partition validation, `test:providers`, `test:mvp` and `git diff --check` all run before publication. The audit is retained as the `provider-url-repair` Actions artifact. The worker joins the event-writer ordering helper before selecting work; a later nightly sync may still make a human-reviewed PR obsolete or conflicted.

Default runs skip findings with an open repair PR and provider batches already reported `NEEDS HUMAN`, so they do not starve other work. Explicit dispatch with `issue` can retry a held batch after investigation. `FIXED` means a verified repair PR passed its exact-head check, not that every gap in a partial batch has disappeared.

**It never merges.** Stage 3 opens a pull request and stops; a human reviews the diff and merges it. The worker contains no merge call and no auto-merge field, and its self-test asserts both absences, so narrow auto-merge stays what `BACKLOG.md` says it is — Stage 4, unbuilt and conditional. Because a pull request opened with the Actions token raises no `pull_request` run of its own, the worker dispatches Prelaunch Validation against the pushed branch and waits for its verdict on that exact SHA before it reports anything; that earns evidence, it does not publish. Earning it *inside* the worker rather than in a later workflow step is what keeps the outcome honest — `FIXED` means the pushed head came back green, and a dispatch that is refused, times out or goes red is `NEEDS HUMAN` with the pull request left open and unmerged.

**Every attempt reaches one explicit terminal outcome**, printed in the run log, written to the job summary, and posted once to the originating issue: `FIXED` (validated, one pull request open), `BLOCKED` (an environmental or dependency requirement stopped safe execution), `NEEDS HUMAN` (an unexpected state or a judgement), or `NO SAFE WORK` (nothing eligible, no longer reproducible, or already in flight). `BLOCKED` and `NEEDS HUMAN` fail the run so the lane goes red rather than reporting quietly. The issue comment's marker carries both the fingerprint and the outcome, so a re-run that reaches the same conclusion says nothing twice.

**It publishes only from `main`.** The finding was proved against `main` and the repair targets `main`, so a dispatch from any other ref is refused before the worker runs: it would branch the repair from that ref's tip and carry every commit `main` lacks into the pull request, which the bounded-diff test cannot see because it reads the working tree rather than the history. A dry run is still allowed from any branch — it writes nothing, and that is how a change to the worker itself is rehearsed.

**Idempotence and concurrency.** The branch name is derived from the finding's fingerprint, so a re-run collides with its own previous attempt rather than opening a second one; an open pull request from that branch, or any open pull request carrying the finding's repair marker, ends the run on `NO SAFE WORK`; and a remote branch that exists with no open pull request is `NEEDS HUMAN` rather than a guess, with two exceptions. First, a branch whose tip is exactly the head of a pull request a human already closed or merged from it: once the repair has validated, the run deletes the branch with a `--force-with-lease` pinned to that sha and publishes afresh (the old head stays reachable from the closed pull request, a tip that moved is refused by git, and deleting rather than force-pushing avoids GitHub's refusal of an App ref update that spans a workflow-file change), so a merged or closed repair no longer blocks the next one, as #1184's leftover branch did from 2026-09-28. Second, this worker's own validated push whose pull request was never opened (exactly one commit ahead of `main`, carrying the repair's own title, a diff inside the declared paths that the compare API lists in full, i.e. under its 300-file cap, a provider batch's verifier summary recoverable from that commit so the pull request still lists every unresolved event, and no pull request ever opened from it) is resumed by opening that pull request, which still has to earn Prelaunch Validation on its exact head. Opening the pull request retries transient API failures (no response, or a 5xx) and first looks for one the lost request may already have opened. The workflow holds a `work-queue-repair` concurrency group with `cancel-in-progress: false`, because a run that is mid-repair has a modified tree and possibly a pushed branch.

**The originating issue stays open.** The worker never closes it: the pull request says `refs #N` rather than a closing keyword, which is also what makes Stage 2's recovery logic *hold* the item open while remediation is in flight. It closes when the next sensor run confirms the finding has cleared.


**Production evidence is pending for the provider expansion (prepared 2026-10-02).** Local tests and a report over repository records do not count as a production verification run. After this change merges, run `generated-freshness.yml` on `main`, inspect its `provider-url-coverage` artifact and P2 issues, then dispatch `work-queue-repair.yml` on `main` with one issue and `dry_run=true`. Confirm its API evidence and rollback, then run that same issue with `dry_run=false`; inspect the event/field diff and exact-head checks before a human merge. Re-run the sensor after merge to prove recovery. Record the genuine run/PR URLs here when observed. Both workflows already have daily schedules; no Stage 4 flag enables merging provider repairs.

### The whole fleet shares one dependency: a green `main`

Every sanctioned writer gates its commit or merge on `npm run test:mvp` passing in-job against the tip of `main` — that in-job gate is what makes those exceptions safe (see [SAFE_PUBLISHING_RULES.md](../SAFE_PUBLISHING_RULES.md) → Sanctioned automated writers). The same property makes a red check on `main` a fleet-wide stop: **every** ingestion, CTA-sync and timestamp lane fails at the same step, publishes nothing, and leaves no finding on any rolling issue, because each lane reports only on a successful run.

So when two or more lanes fail together, check `main` before investigating any provider — the lanes are almost certainly reporting one shared cause, not several. `automation-health.yml` says this outright in its rolling issue when it sees a correlated failure. The cost of a red `main` is measured in dropped ingestion windows, not in a red tick: dates, resale provenance and verification timestamps that a lane would have landed that night are simply not landed, and the next run picks up only what the provider still offers.

### Automation App identity rollout (Milestone 1)

Prepared 2026-09-16. **Steps 1 and 2 are done and evidenced. Ruleset `20115269` was activated by the owner on 2026-09-21 and both of step 3's verifications are now observed and recorded below; only the ruleset snapshot is still owed, and it is owner-supplied.** `.github/actions/automation-identity/action.yml` supplies the same credential to Git pushes and the publishing scripts in all ten PR-producing jobs across nine workflows. It mints a repository-scoped, one-hour installation token immediately before publishing (before the bounded discovery/repair call for those two workers), revoked by the official action's post step. Existing validation, field/file allowlists, exact-head merge binding, preview/apply conditions and human-only PR classes remain unchanged. The explicit Prelaunch dispatch stays during rollout; natural PR runs are additional evidence, not a reason to skip the in-job suite.

**Configuration:** register a private GitHub App owned by `olstaylor`, install it on **`tourticketcompare` only**, with repository **Contents: read/write, Pull requests: read/write, Issues: read/write, Actions: read/write, Checks: read-only, Variables: read-only** (the auto-publish kill switch, read live before each merge), and Metadata's mandatory read access. These support branch/PR publication, existing issue labels and outcome comments, validation dispatch, and reading its checks. No administration, workflow-file write, organization/account permissions, webhook, or ruleset bypass is needed. Disable webhooks and user OAuth flows. Store its client ID in repository variable `AUTOMATION_APP_CLIENT_ID` and its private key in repository Actions secret `AUTOMATION_APP_PRIVATE_KEY`; never put the key in source or logs.

`AUTOMATION_APP_ENABLED` is the explicit rollout variable. Empty/`false` preserves the existing workflow token; `true` requires valid App configuration and successful token minting, with **no silent fallback**. The helper masks the token and the encoded Git header, replaces checkout's local authentication header, and exposes the same token to the publishing step. Every current job is capped below the token's one-hour lifetime. A mistyped flag, missing key/token, unexpected repository/host or untrusted event fails before publication.

Activation and proof, in order:

1. ~~Merge the tested code while the variable remains empty/`false`. Configure and install the App, then set `AUTOMATION_APP_ENABLED=true`.~~ **Done.** The App is registered, installed and enabled: publishing lanes author as `tourticketcompare-automation[bot]` ([app 330502851](https://github.com/apps/tourticketcompare-automation)), which is how this step is observable without reading repository variables — a lane still using the workflow token would author as `github-actions[bot]`.
2. ~~Observe a legitimate automation PR: App-authenticated push and PR creation, natural `pull_request` Prelaunch run with jobs and a green verdict, explicit dispatched validation on the exact head, and the existing sanctioned merge.~~ **Done — evidence recorded 2026-09-21 by agent, from four genuine scheduled lanes, none manufactured.** Each was opened and squash-merged by the App and carried **two** green `test-mvp` check runs of roughly two minutes each — the natural `pull_request` run and the dispatched one:

   | PR | Lane | Opened → merged (UTC) |
   |---|---|---|
   | [#1056](https://github.com/olstaylor/tourticketcompare/pull/1056) | SeatGeek CTA sync | 10:42:03 → 10:44:26 |
   | [#1057](https://github.com/olstaylor/tourticketcompare/pull/1057) | Vivid Seats CTA sync | 10:55:22 → 10:57:44 |
   | [#1059](https://github.com/olstaylor/tourticketcompare/pull/1059) | TicketNetwork Impact catalog sync | 12:05:54 → 12:08:02 |
   | [#1064](https://github.com/olstaylor/tourticketcompare/pull/1064) | Ticket Liquidator Impact catalog sync | 13:11:16 → 13:13:39 |

   On #1064 the API also reports `merged_by: tourticketcompare-automation[bot]`, so the App performs the merge itself rather than a human closing the loop.

   **This is the finding that unblocks step 3.** The 2026-09-11 ruleset refused every automated merge because a bot-opened PR produced a zero-job run and `test-mvp` never appeared on the head at all. Under the App it appears twice and passes, on four independent lanes, so the rule the ruleset enforces is now satisfiable by the automation rather than impossible for it. For manual provider work, retain preview-first/apply gates. Do not manufacture event changes as a test.
3. **Ruleset activated 2026-09-21 (owner-applied, reported in session). Both verifications are now observed — see the result below. Still owed: the ruleset snapshot.** Activate ruleset `20115269` with its existing `test-mvp` check bound to GitHub Actions (`integration_id: 15368`), deletion and force-push protections. **No bypass actor.** Verify a harmless failing human PR cannot merge and a genuine sanctioned automation PR can publish with the ruleset active. Record run/PR URLs and the active ruleset snapshot here. Do not mark Milestone 1 complete on configuration alone.

   **Step 3 result, recorded 2026-09-21 by agent — both verifications pass.**

   *Ruleset active.* `main` reports `"protected": true` on `GET /repos/olstaylor/tourticketcompare/branches`; it reported `false` on the same endpoint earlier the same day. The snapshot itself is owner-supplied — repository administration is deliberately outside every credential here, the App included.

   *A red human PR cannot merge — **PASS**.* [PR #1067](https://github.com/olstaylor/tourticketcompare/pull/1067) (head `ab34b10`) added one root-level Markdown file with a deliberately broken relative link, failing `docs:check` and so `test-mvp`. The failure was reproduced locally first, and the file touched no route, event record, provider surface, workflow or validator — deliberately the smallest genuine failure available, so a gate that did not hold would cost one revert and nothing else. With `test-mvp` concluded `failure`, `mergeable_state` read `blocked` and the merge was refused:

   ```
   405 Repository rule violations found
   Required status check "test-mvp" is failing.
   ```

   It refused a **repository admin** — the account that would bypass the rule if anything could, which is what makes this evidence for "no bypass actor". The PR was closed; nothing from it reached `main`.

   *An automation lane can publish under protection — **PASS**.* [PR #1068](https://github.com/olstaylor/tourticketcompare/pull/1068), `stubhub-international` Impact catalog sync, opened `13:34:09Z` and squash-merged `13:35:47Z`, both by `tourticketcompare-automation[bot]`, **while the ruleset was active** — minutes *after* #1067's refusal, so its being post-activation is not an inference from the `protected: true` read but a fact bracketed by a refusal on the same repository. Its head `a440481` carried two green `test-mvp` runs (the natural `pull_request` run and the dispatched one); the lane merged on the dispatched verdict that concluded 5 seconds earlier, with the second still running, which is the designed behaviour and not a race.

   **This settles the one thing step 2's evidence could not.** The open question was whether the ruleset would validate the *merge commit* — which a squash-merge creates carrying no check of its own — rather than the PR head. #1068 is a squash-merge that GitHub accepted, so the rule is satisfied by the head's checks and the sanctioned publishing path works unchanged under protection. It was a genuine scheduled-shape run, not manufactured for the test.

4. If protection blocks legitimate publishing, stop and inspect the natural PR/merge-ref check and exact head rather than bypassing or fabricating checks. Roll back the ruleset activation to its saved disabled state if needed to recover the fleet. If reverting identity too, restore that prior ruleset state before setting `AUTOMATION_APP_ENABLED=false`; otherwise the old approval-required token path will be blocked again. Keep the in-job and dispatched validation gates throughout.

GitHub's [current GITHUB_TOKEN documentation](https://docs.github.com/en/actions/concepts/security/github_token) explicitly describes approval-required `opened`/`synchronize`/`reopened` PR runs and recommends an App token when unattended execution is needed. The older incident narrative below incorrectly attributed these solely to event suppression. Changing the fork-approval setting did not solve them; it does not establish that approvals are impossible. Completed-run cancellation remains impossible and the reporter remains read-only.

### Price snapshot cadence

The timing foundations add a second hourly tick **only for upcoming shows inside
48 hours**, ordered by resolved UTC start before applying any event limit. Full
roster runs retain their hourly cadence and 24-hour display expiry. The extra
ticks use `--within-hours 48`; no eligible shows or a completed near-show lookup
with no supplied price is a valid outcome. Provider failures and timing import
failures still fail the collection job. This adds API requests only for the
near-show cohort; the existing request deadlines, D1 contention retries and
10-minute job budgets remain in place. Nominal half-hourly polling improves
T-1h coverage but does not guarantee delivery: keep missing observations missing.

Both writers now create migration `0012` tables within their separate check
import. Price publication happens first; a failed check/timing import leaves
those prices published but reports `timing_capture_status: failed` and a failing
CLI exit. Successful imports report `imported`; this does not imply that every
checkpoint has coverage. Existing cache, CTA and history display gates are
unchanged. The durable checkpoint tables are never pruned by the change-history
retention script. Detailed methodology and public-release limits are in
[ARCHITECTURE → Internal historical price timing foundations](ARCHITECTURE.md#internal-historical-price-timing-foundations).

Rollout: merge the reviewed changes, inspect each lane's push-triggered apply
summary for `timing_capture_status: imported`, and verify table creation and
capture near a checkpoint with the existing Cloudflare credentials. Collection
starts then; no historical backfill is supported. To roll back extra polling,
remove only the additional cron entries (marketplace `:47`, Vivid `:17`). To
roll back capture, revert the timing additions to the writers; leave the D1
tables intact so collected history survives. No public insight UI is enabled.

Both numeric-price lanes (TicketNetwork/StubHub International via the shared Impact marketplace workflow, and Vivid Seats) run hourly with a 24-hour freshness constant (`DEFAULT_FRESHNESS_HOURS`) — the interval must stay strictly below the constant, since the display gate hides any row past `expires_at`. Each scheduled apply run ends with a 90-day retention prune of `provider_pricing_history`. Ticket Liquidator stays price-disabled (no numeric `CurrentPrice` in its feed); SeatGeek has no numeric pricing lane at all (permanent API limitation).

**Size the constant against delivered runs, not the nominal cron.** On 2026-09-08 both lanes stopped being scheduled — the marketplace lane last ran 04:38Z, Vivid 05:16Z, and the following ticks never fired. GitHub drops scheduled ticks under load and never replays them, so both workflows still showed green from their last successful run while their rows aged out: every TicketNetwork and StubHub International price left the site at 10:38Z, with Vivid due to follow at 11:16Z. Measured gaps between *actual* Vivid runs over 2026-09-06..08 were 2.2h, 2.8h, 4.5h, 3.5h, 4.9h, 7.8h, 5.8h and 6.3h against a nominal 2h — two of them already past the then-current 6h constant, so this had been blanking prices intermittently for days. The hourly cron plus a 24h constant now absorbs a full day of missed ticks.

**The constant is sized for graceful degradation, not merely to bridge the gap between runs (owner-directed 2026-09-08).** A window set just wide enough for the expected cadence means any scheduling failure that outlives it blanks every price on the site, which is what visitors actually saw that day. At 24h the same failure leaves the last known price on the card instead, so the outage degrades into slightly older prices rather than into no prices. That is only honest because the age is always visible: every price prints its capture time, and past `PRICE_STALE_AFTER_HOURS` (12h, defined identically in `functions/[[path]].js` and `public/app.js`) the card's disclosure note adds an explicit "last checked N hours ago". A snapshot is never presented as a live quote, so an older one is labelled rather than disguised. Listed prices drift ~2.3%/hour, so 24h is the point where that label is doing real work — widen it further and the label stops being enough.

**Every completed lookup is also recorded** in D1 `provider_price_checks` (one row per event and lane, priced or not; `scripts/lib/price-checks.mjs`), in a separate execute after the price rows alongside timing evidence; a failed import leaves prices published and fails the collection CLI. The router reads it to date a card's "No listed price at our last check of …" note, and quotes a check only while it is under 36h old. The writers create the table themselves (`CREATE TABLE IF NOT EXISTS`), so there is no migration to apply by hand; a run summary's `checks_error` field reports a failed check write.

Because no writer failure is involved, nothing in the snapshot workflows can detect this: their freshness audit only runs when they run. `price-freshness-check.yml` covers that gap from outside, and a red run there means prices are already dark for visitors — re-run both snapshot workflows with `apply=true` to restore them immediately.

**The hourly cron did not, on its own, revive the Vivid lane.** After it shipped at 11:24Z that day the marketplace lane resumed normally, but Vivid's 11:47Z and 12:47Z ticks both failed to fire — 7h37m with no run, while its sibling ran on schedule from the same repository. So this is not general scheduler load: GitHub was simply not running that one workflow, and no cron interval can fix a workflow that is never invoked. What restored the marketplace lanes was its `push` trigger firing on merge, which Vivid lacked. Vivid now carries the same trigger on its own workflow file and `scripts/snapshot-vividseats-prices.mjs`, so any change to either bootstraps fresh rows on `main`. Treat that as a recovery lever, not a fix: it makes a stalled lane restorable by a commit rather than only by a manual dispatch, and it does nothing to make the schedule itself reliable. If ticks keep going missing, move the writers to a Cloudflare Cron Trigger and take GitHub's scheduler out of the critical path.

### Daily price rollup (`provider_pricing_daily`)

The 90-day prune above bounds `provider_pricing_history`, which is right for the sparkline and wrong for anything longitudinal — the rows that age out are the ones that can never be re-collected. `scripts/rollup-provider-pricing-daily.mjs` (migration 0012) summarises history into the never-pruned `provider_pricing_daily`: one row per event × provider × source × currency × UTC day, carrying min/max/first/last of `low_price` and the observation count behind them. It reads history and writes only the rollup.

Backfill and steady-state are the same command; it is idempotent per UTC day. Dry-run by default.

```bash
npm run prices:rollup:daily -- --since 2026-06-01          # preview a full backfill
npm run prices:rollup:daily -- --since 2026-06-01 --apply  # one-off backfill
npm run prices:rollup:daily:apply                          # steady state: the last 7 days
```

**Each day opens at the standing price.** History is change-only, so a price unchanged across midnight writes nothing on the new day. Each day is therefore seeded from the previous day's rollup row (its `low_price_last`), which makes first/min/max cover the whole day and gives an unchanged day a row of its own. A seed is not an observation: a row with `observations = 0` is a carried day, its `first_observed_at` predates the day, and it is written only while the event's known `event_date` is still ahead. Days run oldest first, so each seeds the next; a backfill must therefore start from the first day it means to rebuild.

The rules that make a re-run safe and are the reason this can be run at any time:

- A day is replaced only by a summary built from **more observations**, or from the same number with different aggregates (a seed added or corrected). A prune can only lower the count, so re-running over a window whose raw rows have since been pruned is a no-op rather than silent data loss, and re-running over an unchanged day writes nothing.
- A known `event_date` is never overwritten with NULL, and a NULL one is filled when a later run knows it.
- Steady-state runs re-check the last 7 days, so a day missed while the step was failing (it is `continue-on-error`) is recovered by the next healthy run. A partial failure exits non-zero even with `--json`, and the job summary names the failed days.

**Legacy rows carry no event date.** History written before the writers saw the column is NULL there, and events.json drops an event's record after the show. `npm run prices:event-dates:backfill` (dry-run by default; `-- --apply` to write) copies `datetime_iso` from events.json onto every NULL `event_date` in both tables, and touches nothing else. Run it once, then re-run the rollup backfill so carried days can be written for those events.

Rows below `MIN_PLAUSIBLE_LISTED_PRICE` are excluded, matching the public read path — the same floor `/api/price-history` applies on read, so the rollup never records an observation the site would refuse to display.

**Scheduled inside both price-snapshot workflows**, provider-scoped, immediately *before* each lane's retention prune — so observations about to age out are summarised rather than lost, and the three concurrent snapshot jobs never contend on the same rollup rows. The step is `continue-on-error`: a snapshot run's contract is writing prices, so a rollup failure leaves the lane green and the prices written. It surfaces as a stale rollup, never as a dark price badge, and each run prints eligible/written/zero-row-reason to the job summary.

That makes the rollup self-maintaining from the day this deploys, but it does **not** reach backwards. Run the one-off backfill once, before the prune reaches the oldest observations — the rows it would collect cannot be re-collected afterwards.

**Migration 0012 can be applied before or after the code deploys.** Both snapshot writers probe the live schema once per run and emit the column set the database actually has, so a writer never fails because a migration has not landed yet; until it does, `event_date` is simply not recorded and the rollup reports that the table is missing and exits clean. The probe fails closed to the previous column set on purpose — a failed history insert takes the cache upsert down with it, and at 24h freshness that blanks every price on the site.

### Daily audit runtime budget

The `audit` job's cost is dominated by the URL liveness check, and that cost is linear in **unique outbound URLs**, not in artists or providers. At 1,369 events the dataset carries 4,676 unique URLs across 18 hosts — 3.42 URLs per event, since each event can hold a Ticketmaster, SeatGeek, Vivid Seats and `source_url` destination plus `provider_links` entries for TicketNetwork, Ticket Liquidator and StubHub International. Measured per-URL latency is ~0.51s, HEAD plus the confirming ranged GET included.

That check ran serially until 2026-09-11, which put it at 4,676 × 0.51s ≈ 40 minutes against the job's `timeout-minutes: 40`. It is now scheduled with bounded concurrency, **capped per host** rather than globally: `LINK_CHECK_PER_HOST_CONCURRENCY` (default 3) and `LINK_CHECK_CONCURRENCY` (default 24), both env-tunable on the workflow. Per host is the important half — the URL list arrives grouped by artist and therefore by storefront, so a global-only pool would fire its full width at one provider in bursts, and an anti-bot layer answers a burst with 401/403/429. Those are correctly recorded as "blocked, not dead", so the damage would not be a false failure but a run whose evidence quietly degrades into inconclusive.

**What bounds the step now is the busiest host**, not the total: `(URLs on that host ÷ per-host limit) × per-URL latency`. Ticketmaster is the busiest, and after the skip below it is 1,120 of the 4,220 URLs actually checked, so 1,120 ÷ 3 × 0.51s ≈ 3.2 minutes (it was 961 of 4,676 when this was first measured on 2026-09-11). **Past-event URLs are no longer checked at all** (2026-09-12). A URL referenced only by events that have already happened produced failures the audit itself files as non-actionable history, which nobody acts on — 570 of today's 4,790 unique URLs, and a share that only grows as the archive does. Skipping them removes ~12% of the nightly requests and, more to the point, 177 URLs from the Ticketmaster critical path (1,297 down to 1,120, about 30 seconds). A URL is dropped only when every referencing event has a valid past date: one unknown or one upcoming date keeps it. `LINK_CHECK_INCLUDE_EXPIRED=1` restores the full sweep for an archive audit, and the run prints the skipped count rather than hiding it.

Watch that ratio rather than the event count when sizing future growth — if one provider comes to dominate the dataset, raising `LINK_CHECK_PER_HOST_CONCURRENCY` is the lever, and it should be raised deliberately rather than reflexively, since it is also the politeness setting.

`timeout-minutes` is deliberately **not** raised. It was never the constraint, and leaving it at 40 keeps it as the alarm that caught this: a step that has gone from 2.9 minutes back to 40 has regressed structurally, and should fail rather than be absorbed.

Two costs were left in place on purpose. Every URL is re-checked daily including the 553 (11.8%) referenced only by past events, which the script already classifies as non-actionable *after* fetching them; skipping those would be a coverage reduction, and the archive-only share will grow, so it is the next thing to look at if the budget tightens. The Ticketmaster Discovery diff is a separate ~6.8 minutes and scales with artists, not events.

### Shared tracked-event Ticketmaster sweep

The audit remains the first daily tracked-event sweep. It calls
`audit-tm-events.mjs --snapshot-out .audit/tm-snapshot.json` while producing its
ordinary drift/missing/error report. Scheduled runs on `main` upload the
transport as `tm-tracked-event-snapshot`, retained for **one day**, and remove
it before uploading the existing 30-day audit evidence. Nothing under `public/`
or `data/` is used to store this transport. It is never committed or served.

Scheduled nightly sync uses `find-tm-snapshot.mjs` to select an artifact from a
completed **scheduled** `daily-audit.yml` run on `main` in this same repository
whose `audit` job succeeded. Trust is anchored on that job, which alone
produces the snapshot and fails on unresolved fetch errors, not on the run's
overall conclusion: on 2026-10-02 a rejected verification-dates push failed the
run, the sync discarded a usable handoff, and fetching all 2,083 events again
exhausted the day's Discovery quota. A manual dispatch, branch/fork run, failed
or cancelled `audit` job, expired artifact or run older than six hours cannot
supply it. The lookup prints the reason it passed over each listed run, and
when it finds nothing (or the lookup errors) it looks once more after 60
seconds before giving up: on 2026-10-05 a completed, green audit run with an
unexpired artifact was passed over without explanation, the sync fetched all
2,260 events directly, exhausted the day's quota and updated nothing. A
second miss, or download failure, simply uses the existing direct fetches. The two workflows keep their existing concurrency
group and schedules; no new infrastructure, token scope or publishing lane is
introduced. If GitHub starts sync first, there may be no usable snapshot and
that day's saving will be smaller.

`scripts/lib/tm-event-snapshot.mjs` owns the versioned envelope and response
projection. Records are keyed by the **exact, case-sensitive Discovery event
ID**, bound to the Discovery base URL by its hash, and include fetch time,
HTTP status, existence verdict, response kind, integrity checksum, and the raw
fields both consumers read: event ID/name/URL, start/date/timezone/status,
public on-sale time, venue names/zones/cities/countries with full venue
cardinality, and attraction names in source order. Missing source fields stay
null and keep the existing ambiguity gates. It persists no request URL, API
key, arbitrary headers, `_links` or price fields; network error messages never
include a credential-bearing URL.

The snapshot and **each response at consumption time** have a fixed six-hour
freshness limit (`SNAPSHOT_MAX_AGE_MS`), deliberately much shorter than the
daily cadence. A partial/malformed/version-mismatched/source-mismatched
snapshot, missing entry, checksum failure, future timestamp, or stale entry
falls back to a direct request. Successful exact-ID 200s are reused; 404/410
retain their status and stay **review-only**, never permission to delete.
Transient/network/429/5xx and other HTTP failures remain explicit failed
observations in the transport and are **not reused as verdicts**: sync makes a
fresh request with its unchanged bounded retry budget. An unresolvable
storefront/numeric ID is separate from the response map, never a missing show.
Both lanes still select their own targets from their current checkout and
re-evaluate the full local audit/sync rules; a newly tracked ID is fetched.

The 14-day grace and seven-day long-past rotation from #1257 are unchanged.
Held/rescheduled/undated/recent/upcoming rows keep their daily checks, and
`TM_SWEEP_INCLUDE_PAST=1` still restores the full sweep. Cancellation/postponement
holds, identity and ambiguity blockers, reschedule/date/venue decisions,
human-only deletions/tour names, diff scope and every validation/publish gate
remain in the consumers. Errors still veto sync publication. Both scripts now
exit nonzero **after writing their evidence** on unresolved fetch errors;
the audit's existing continue-on-error step retains the rolling findings and
marks `tm-status.json` failed, then a final failure step makes the job red and
withholds verification dates. Malformed/mismatched 200s are errors, never a
clean audit.

Logs, JSON reports (`requests`) and job summaries expose `events_requested`,
`snapshot_reused`, `in_run_reused`, `direct_requests` (including retries),
`skipped_past`, `unresolvable`, `snapshot_failed_entries`, `transient_failures`
(failed attempts), `failed_events` (unresolved events), and
`estimated_calls_saved` (old one-request-per-target baseline minus actual
direct attempts; it can be negative during an outage). Sum the saved counts
across the two lanes for the two-sweep saving. Only allowlisted numeric quota
headers are recorded, when present, including Ticketmaster's `Rate-Limit` and
`Rate-Limit-Available`; missing headers are normal. They are observations,
not proof of remaining capacity later in the day.

**Committed-data estimate, 2026-10-02 at 03:00 UTC, baseline `bc1df812`:**
2,339 events, 93 indexed artists, 2,291 queryable tracked Discovery IDs and 48
unresolvable rows. The rotation excludes 208 rows that day, leaving 2,083
targets in **each** sweep, all exact-ID duplicates. Excludes retries, manual
dispatches and traffic-dependent runtime calls; assumes a usable audit
snapshot and normal provider responses. These are request estimates, not
measured production usage or a claim that the quota incident is closed.

| Scheduled consumer | Previous requests/day | With shared snapshot |
|---|---:|---:|
| Daily audit / `audit-tm-events.mjs` | 2,083 | 2,083 |
| Nightly sync / `apply-tm-updates.mjs` | 2,083 | 0 normally; direct fallback/retries as needed |
| New shows / `sync-tm-events-write-pr.mjs` → `sync-ticketmaster-events.py` | 93 (one attraction-events query per enabled verified identity) | 93 |
| Roster candidates / `report-roster-forecast.mjs` + `propose-onboarding-batch.mjs` | ~330–840 | unchanged |
| Auto-promote / same forecast + capture, `auto-promote.mjs` identity re-fetch + new-artist ingestion | ~330–840 + 0–25 | unchanged |
| Price-guide candidates and other cache-only sensors | 0 Discovery calls | 0 |
| **Scheduled fleet estimate, auto-promote on** | **~4,919–5,964** | **~2,836–3,881** |

The **2,083-call saving** halves the tracked sweeps (about **35–42%** of the
estimated scheduled fleet), adding headroom for discovery. Advancing the
unchanged data through 2–8 October's rotation gives roughly 2,063–2,083 calls
per sweep per day, averaging 2,071: two sweeps ~4,142 → ~2,071. With the
include-past override on, today's two sweeps are 4,582 → 2,291.

**Every other Discovery caller audited, intentionally outside this reuse:**

- `report-roster-forecast.mjs`: 330 currently tracked markets with supported
  country codes; one or two pages each (size 200), then up to 60 attraction
  lookups: ~330–720 per full scan. Each roster workflow separately screens up
  to 20 names with `propose-onboarding-batch.mjs`: one attraction lookup/search
  each plus up to five event pages each, up to 120 additional calls. The actual
  shortlist and page count require live data, so a precise daily total cannot
  be inferred from committed events. Those searches find untracked events and
  recapture identities; tracked-event snapshots cannot replace them.
- `auto-promote.mjs` independently re-fetches captured attraction identities
  in the promotion job for every eligible screened candidate (same-job
  verification, up to 20 before the promotion cap); its new-artist ingestion
  invokes the recogniser once per promoted artist (up to five). These
  independent verification/discovery calls remain mandatory.
- `propose-artists.mjs`: manual proposal, an attraction search then one
  attraction-events query per matched name (plus diagnostic reachability and
  attraction probe in diagnostic mode). **0 scheduled daily calls**.
- `backfill-discovery-ids.mjs`: manual exact-event resolution probes plus up
  to five attraction-event pages per artist needing recovery. Used by manual
  `tm-data-refresh-pr.yml`, followed by a direct field-sync (~2,083 today,
  depending on recovered IDs/rotation). **0 scheduled daily calls**.
- `backfill-event-timezones.mjs`: manual one exact-event request per selected
  missing-zone row. **0 scheduled daily calls**.
- `functions/api/shows.js`: opt-in live artist discovery (one keyword event
  search per cache miss, 30-minute fresh cache); optional per-event Discovery
  price checks. Repo defaults have live artist discovery off and Discovery
  price checks explicitly false, so ordinary traffic makes **0** of these
  calls. Overrides/traffic cannot be counted from git; neither path changes.
  Provider scaffolding has no implemented Discovery request. Outbound URL
  liveness checks query storefront URLs, not the Discovery quota.

**Production verification:** on the first genuine scheduled audit/sync pair,
check the one-day artifact exists and contains no credentials; the ordinary
audit still has its full findings, unresolvable and rotation counts; sync names
the selected scheduled run and reports mostly `snapshot_reused`, with direct
requests only for absent/stale/failed entries. Review the same factual diff and
human-review issue, confirm the zero-error gate and in-job/exact-head validation
still hold, and confirm the new-shows lane still performs all 93 identity
queries without sustained 429s. Do not close the quota incident from an offline
projection.

**Rollback:** set repository variable `TM_SHARED_SNAPSHOT_DISABLED=1` before
the next run. Audit still fetches and reports normally; it stops uploading the
transport and scheduled sync stops looking it up, restoring direct two-sweep
requests without changing any publishing/rotation rule. Manual dispatches
already fetch directly. Clearing the variable enables reuse again. For a code
rollback, revert the shared-snapshot PR; there is no schema/data migration and
#1257's weekly rotation remains. A running sync that already downloaded its
snapshot remains subject to all six-hour/integrity/safety gates.

## Secrets and bindings

Full setup steps: [DEPLOYMENT.md](DEPLOYMENT.md). Reference of the actual credential names in use:

| Name | Used by | Notes |
|---|---|---|
| `DEMAND_DB` | All D1 reads/writes | The only binding declared in `wrangler.toml`. |
| `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` | Network-level Impact fallback | Server-side only. |
| `IMPACT_SEATGEEK_*` / `IMPACT_VIVIDSEATS_*` | Provider-specific Impact credentials | Their approved lanes only. |
| `IMPACT_TICKETNETWORK_*`, `IMPACT_TICKETLIQUIDATOR_*`, `IMPACT_STUBHUB_INTERNATIONAL_*` | Optional provider-specific overrides | Fall back to network-level if unset. |
| `DEBUG_API_TOKEN` | `/api/debug-seatgeek`, every `/api/impact/*` diagnostic, `IMPACT_CATALOG_PROXY_URL` automation | Routes 404 without it — never expose one publicly. |
| `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` | `/admin` editor OAuth handshake | Configured 2026-08-19, alongside the `admin.tourticketcompare.com` custom domain. Pages binds these at deploy time, and the symptom differs by case: a binding added but not yet deployed reads empty and 503s at `/api/admin/auth`, while a rotated value whose deploy has not landed still redirects and then fails the token exchange with a 502 at `/api/admin/callback`. Redeploy after either change. |
| `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` | Controlled discovery/snapshot tooling | Never `/api/out`. |
| `TICKETMASTER_API_KEY` | Scheduled discovery/audit workflows; opt-in live-discovery path in `/api/shows` (default off) | Normal traffic reads the persisted catalogue. |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | Remote D1 writes from Actions | |
| `RESEND_API_KEY` / `ALERT_EMAIL_FROM` / `ALERT_POSTAL_ADDRESS` / `ALERT_REPLY_TO` | `date-alerts.yml` and `weekly-digest.yml` test and send modes (GitHub Actions secrets) | Not configured yet. `ALERT_EMAIL_FROM` is optional (the workflow defaults it to `TourTicketCompare <alerts@tourticketcompare.com>`); without `RESEND_API_KEY` and `ALERT_POSTAL_ADDRESS` both modes stop before sending. The From domain must be verified with Resend. |
| Local read-only Cloudflare CLI credential | Bounded live Pages Function error-tail diagnosis | Keep this separate from repository and Pages secrets. It must be least-privilege and sufficient only to read the selected production deployment and tail new error events; do not use a write-capable token or export request URLs. |
| `OUT_CLICK_ID_SUBID_ENABLED` / `OUT_CLICK_ID_SUBID_PARAM` | `/api/out` | Repo-managed `[vars]` in `wrangler.toml`, not dashboard settings. Currently unset (off). |
| `EVENT_PAGES_INDEXING` | Event-page robots, `/sitemaps/events.xml`, `llms.txt`, parent `MusicEvent` identity | Repo-managed `[vars]` in `wrangler.toml`: `"pilot"` activates the frozen 30-key pilot (`EVENT_INDEXING_PILOT_KEYS`) on the canonical host only — Pages previews get the value but never activate it. Removing the line is the rollback. Confirm in production from a pilot URL's robots meta, not from this table. |

The obsolete `IMPACT_TICKETMASTER_*` secrets are unused — delete from the dashboard if still present (tracked in `BACKLOG.md`). Provider `*_PUBLIC_ENABLED` / `*_PRICE_DISPLAY_ENABLED` flags are independent kill switches; a flag never substitutes for rights, provenance, URL validation, or freshness. Confirm current activation via `/api/health`, not by inferring from secret names.

## Known incidents

Infrastructure/automation issues only — dated, short, actionable. Content and data-hygiene backlog items live in `BACKLOG.md`.

- **Vivid Seats snapshots wrote prices but failed to parse their run summary (fix prepared 2026-09-30; #1060).** Run `36693448565` completed its apply step with zero failed observations, then failed `Publish Vivid Seats snapshot run summary`: the Valley catalog exceeded the pagination cap, and the writer appended its `::warning::` annotation to the JSON stdout captured by `tee`. `JSON.parse` rejected the trailing annotation, making the lane red and skipping history retention despite successful pricing. The writer now sends both catalog-cap and price-check-write warnings to stderr, preserving a single JSON document on stdout; its self-test covers both warnings together. Confirm a successful scheduled run after merging before treating #1060 as resolved.

- **Work queue repair is blocked by a superseded branch (open 2026-09-30; #966).** Run `36704411871` refused to overwrite `automation/work-queue-repair-og-cards-9709a441ce59a015`, which still points at `6a7fce7ccc6fabe71c188a39c726cf98f56b493e`. Its PR #1184 was closed unmerged as outdated on 2026-09-28; the closing note requested branch deletion, but the branch remains and has no open PR. Delete that exact obsolete branch after owner approval, then let the next repair run regenerate from current `main`. **Fix prepared 2026-10-05 (#1333):** the worker now clears such a branch itself, but only when its tip is exactly the head of a pull request a human closed or merged from it, and only by a lease-pinned delete; every other existing branch is still refused, never overwritten.

- **The Ticketmaster Discovery key ran out on 2026-09-27, and both Ticketmaster writers published nothing (open).** The daily audit's per-event TM diff (08:46–09:00Z) finished with 0 errors. The nightly sync, queued behind it, started at 09:28Z and got `HTTP 429` on 1,911 of its 2,023 per-event lookups for fifteen straight minutes, through its retry budget, so its commit gate vetoed the run. The TM new-shows lane at 09:40Z then failed all 83 artist lookups in 9 seconds: its recogniser has no retry, and its coverage issue said only "live lookup failed". A 429 that holds for a quarter of an hour across retries points to the daily quota being spent, not the per-second limit. Two full sweeps now hit the same `/events/{id}` resource each day, the audit's diff and the nightly sync, each about one call per event. `events.json` grew from 1,427 to 2,183 events in a week, so together they come close to the default 5,000-call daily allowance before the roster, auto-promote and new-shows lanes spend any. The last of those is the cheapest (one call per artist) and the one that finds new dates, and it runs last. The skip reason now carries the status the recogniser saw (`live lookup failed (HTTP 429)`). **Past events are no longer re-fetched daily (2026-10-01):** an event more than 14 days past that carries no stored `ticketmaster_status_code` is re-checked by both sweeps on one day in seven, on a fixed rotation keyed by its id (`scripts/lib/tm-sweep-window.mjs`), rather than every night. It is never dropped, because Ticketmaster can reschedule a long-past date and the new-shows recogniser withholds a row whose Ticketmaster id already exists, so these sweeps are the only path that moves it. On that day's data each sweep went from 2,138 to 1,942 calls, and the saving grows as the archive does. Each run prints the skipped count; setting the repository variable `TM_SWEEP_INCLUDE_PAST` to `1` restores the full daily sweep in `daily-audit.yml`, `nightly-data-sync.yml` and `tm-data-refresh-pr.yml`. The shared-fetch implementation and expected further saving are documented above under "Shared tracked-event Ticketmaster sweep"; genuine production verification is still required before closing this incident. A higher quota remains a separate owner decision. **The new-shows lane was still losing (2026-10-01, 2026-10-02):** both days every artist lookup came back `HTTP 429` and the run ended green with nothing checked, so no new tour dates were added after 2026-09-28 and no sensor noticed. The lane is now requested at 02:40, ahead of both sweeps, and ends red once a quarter or more of its artists could not be looked up.

- **The nightly sync's commit gate lets one error veto every clean update (open).** `commitAllowed = updated > 0 && errors === 0` counts the report total, so a single persistent error on any one of ~1363 events blocks the lossless updates on all the others, and the lane reports success while publishing nothing. This is the same failure mode the gate's own comment rejects for review items — "must not veto the clean events' lossless updates, otherwise the nightly sync can never commit" — but errors still have that property. Fixing it means an error-rate threshold rather than a binary, which changes publish behaviour and wants an explicit decision on the number. Until then, a throttled or partly-failing sweep publishes nothing and says so only in the rolling issue.

- **[Mechanism corrected 2026-09-16; see Automation App identity rollout above.] Stranded `pull_request` validation runs cannot be cancelled (open pending App activation).** Supersedes the 2026-09-14 entry below, which named the wrong mechanism and the wrong remedy. Three things are now measured rather than inferred.

  **The runs are born completed.** GitHub does not park them in a pending status: it creates them `status: "completed"`, `conclusion: "action_required"`, with zero jobs, and the conclusion flips to `failure` when the PR closes. Counted 2026-09-15 across all 37 `pull_request` Prelaunch runs on `automation/*` heads: 25 `completed`/`failure`, 9 `completed`/`success`, 3 `completed`/`action_required`, and **zero** in any non-completed status. Every predicate this repository has shipped read `run.status` — first `!== "completed"`, then `["action_required","waiting"]` — so **none of them ever matched, and no run was ever cancelled.** The lanes logged "No stranded pull_request validation run" on every single run while the reds accumulated. The 2026-09-14 ordering fix was real and necessary but was never sufficient; `scripts/lib/required-check.mjs` now reads the conclusion.

  **Cancelling is impossible, not merely mistimed.** GitHub refuses to cancel a completed run, and these are completed from birth. There is no window — before the merge or after it — in which a cancel could win. `cancelStrandedPrValidation` has been replaced by `reportStrandedPrValidation`, which names the run and its cause and writes nothing. A diagnostic that quietly fails while printing a reassuring line is worse than none.

  **The fork-approval setting did not fix it.** The owner changed the fork-contributor approval control on 2026-09-14 and the next five lanes still produced zero-job runs. GitHub's current documentation explains the separate approval requirement for PR events created or updated by `GITHUB_TOKEN`; the earlier claim that this was solely event suppression was incorrect. An installation token lets the natural PR validation run execute normally. The App rollout above is the current remedy; cancellation of already-completed runs remains impossible.

  **Validation half resolved 2026-09-18; protected-publishing half pending verification (status corrected 2026-09-21 by agent — this paragraph still read "Activation is still required" after the App had been live three days, and after the rollout section above had been corrected).** The App was activated 2026-09-18 and the stranded runs stopped at source: zero-job `action_required` runs are no longer produced on `automation/*` heads, per the evidence table above. Two things are unchanged by that. Cancelling an already-completed run remains impossible, but nothing now creates one, so `reportStrandedPrValidation` should find nothing — if it ever names a run, treat that as a regression rather than the known condition. And the incident is **not** closed: it also requires an App-authenticated PR publishing with the ruleset active, which became possible only on 2026-09-21 and has not yet been observed.

  **Known gap, recorded 2026-09-21 by agent — a required check can go *missing*, not just red.** PR #1066's head `cce916e` received no `pull_request` Prelaunch run at all: `prelaunch-validation.yml` is a bare `on: pull_request:` with no path filters, so one was due and none was created. Same class as the 2026-08-03/04 incident the workflow's own `workflow_dispatch` escape hatch exists for. The automation lanes are insulated, because `earnRequiredCheck` dispatches explicitly and waits on the exact SHA; **human- and agent-authored PRs are not.** With the ruleset active, such a PR is unmergeable with no red check to explain why. The remedy is a manual dispatch of Prelaunch Validation against the branch, never a ruleset rollback.

- **Dedup tombstone discipline (procedural, ongoing).** Deleting a duplicate row from `events.json` without adding it to `data/deleted-events.json` lets the daily new-show recognizer re-propose it. Always tombstone a dedup deletion in the same change — see `docs/PROVIDER_SYNC.md`.

- **Intermittent Pages CPU-limit failures (root cause was the Workers Free plan; account moved to Workers Paid 2026-09-24; first reported 2026-09-04).** The production dashboard recorded 1,390 `Exceeded CPU Time Limits` errors among 70,055 successful requests in its rolling seven-day view, while the simultaneous 24-hour view had no errors. Route and caller attribution is unavailable in the dashboard. Historical Log Explorer is not enabled and must not be purchased without an owner decision. A separate, local least-privilege credential may support a bounded interactive tail of new error events; do not export raw request URLs or make runtime changes until the route/error mix is evidenced.

  **Evidence and fix, 2026-09-24 (agent; merged in #1126 and deployed the same day).** After deploy, 80/80 sitemap artist-city pages answered 200 at 8 parallel requests. Close this entry once `site-health.yml` has run clean for a week. Reproduced from outside with no credentials: at 6–8 parallel requests, about 20% of `/artists/<a>/tickets/<city>` pages answered 503 "Worker exceeded resource limits", and every one answered 200 when re-fetched alone. A crawler fetching in parallel sees exactly this. A local CPU profile of warm renders (`node --cpu-prof` against `functions/_middleware.js`) showed the cost was render work, not the `events.json` parse (13 ms). The main sources:
  - `artistHasUpcomingShow`/`futureShowsForArtist` re-slugifying every event for every artist;
  - `deriveCities`/`deriveVenues` recomputed several times per request;
  - a new `Intl.DateTimeFormat` per date on every card.

  The fix, all per-isolate memoisation keyed on the cached events array, plus cached formatters:
  - `eventTimesBySlug` in `_artist-indexability.js` and `eventsForArtist` in `[[path]].js`;
  - minute-bucketed `deriveCities`/`deriveVenues`;
  - `dateFormatter` in `[[path]].js`.

  It cut warm render CPU 4–7×: home 174→26 ms, city 164→28 ms, venue 111→24 ms, artist 87→23 ms, artist-city 39→10 ms. Rendered HTML was byte-identical on the sampled routes. The daily site-health crawl now counts 5xx that recover on retry and raises a finding above 2% of the sitemap, so a regression cannot return silently.

  **Follow-up, 2026-09-24/25 (agent): #1126 was not the end of it.** 1102s continued after #1126 deployed. There were two causes.
  - `/compare-concert-ticket-prices` recomputed `publishableFutureShows` over all events once per catalog artist, costing ~1s of warm CPU per request. When it tripped the limit, the isolate was killed and the venue pages sharing it failed too. #1130 cut it to ~50 ms.
  - Even after #1130, the preview deploy failed 3, then 34, then 73 of 492 sitemap URLs across back-to-back crawls at 16 in parallel. Production also answered `error code: 1102` to single sequential artist-page requests. The account was on **Workers Free: 10 ms of CPU per request**, and Cloudflare terminates isolates that run over it consistently. Most renders needed 5–50 ms, which no code change brings reliably under 10 ms.

  The owner moved the account to **Workers Paid** on 2026-09-24. After that, a sample of 61 live URLs at 4 in parallel all answered 200.

  `wrangler.toml` now sets `[limits] cpu_ms = 2000` as a backstop against a runaway render being billed for the 30s default. Measured 2026-09-25, warm renders are ≤ 50 ms and the heaviest cold request is ~300 ms (`/api/shows?includePrices=true&…&limit=500` ~235 ms). If a legitimate route approaches 2000 ms it will answer 1102, so raise the cap before that happens. Moving back to the Free plan would bring this incident straight back; `limits` requires Paid.

### Resolved

One line each; the full write-ups are in git history (`git log -p -- docs/OPERATIONS.md`).

- One transient network error on a live TicketNetwork URL kept the daily-audit issue open and Site health red; the link check now re-checks up to 25 network errors, timeouts or 502/503/504 once, one lane per host, before reporting a URL as failing (resolved 2026-10-09).
- Vivid Seats CTA sync lost its merge race on 7 and 8 October (PRs #1398/#1412, closed as superseded) and auto-promote failed `schema:validate` on Rod Stewart's "Premium Priced Seats" listing names; the writer wait is 20 minutes and the schema guard reads property names, and both lanes ran green on 2026-10-09 (resolved 2026-10-09, #1422).
- Auto-promote failed `test:mvp` on a duplicate venue H1 when a promoted artist added a second "Paramount Theatre" (Denver, beside Seattle); a venue name used in more than one city now carries the city in its H1 (resolved 2026-10-05).
- Site health stayed red on open SeatGeek provider URL coverage items, which can stay open for good; they are now linked for context, not gating (resolved 2026-10-05).
- Site health latched itself red through its own work-queue item (resolved 2026-09-28).
- Late-started lanes branched from a `main` that was about to move, and their PRs conflicted (resolved 2026-09-28).
- A freshly minted App token is briefly refused by git, and the losing lane published nothing (resolved 2026-09-22).
- The App-identity fix gave every automation head a second `test-mvp`, and auto-merge raced it (resolved 2026-09-22).
- A throttled nightly sync published nothing and still reported success (resolved 2026-09-18).
- One 503 reddened the Impact marketplace price snapshots (resolved 2026-09-16).
- A `stale` lane no longer becomes a work item, and the remaining windows were measured (resolved 2026-09-15).
- Dependabot has not updated `sharp` since 2026-09-10 (resolved 2026-09-14).
- The hourly lanes' staleness window raised false `stale` findings (resolved 2026-09-14).
- One 503 reddened the price freshness check (resolved 2026-09-13).
- The `test-mvp` ruleset stopped every publishing lane (resolved 2026-09-12).
- Red `main` stopped four scheduled lanes (resolved 2026-09-11).
- `daily-audit.yml` was breaching its 40-minute cap (resolved 2026-09-13).
- Self-referential `node_modules` symlink tracked on `main` (resolved 2026-09-11, PR #940).
