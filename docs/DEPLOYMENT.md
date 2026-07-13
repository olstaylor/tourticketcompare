# TourTicketCompare Deployment

Production runtime: **Cloudflare Pages Functions** (confirmed 2026-05-11).

- Production custom domains: `tourticketcompare.com` and `www.tourticketcompare.com`
- `www` redirects to apex via a Cloudflare Redirect Rule (confirmed 2026-05-11)
- Deploy path: `npm run deploy:pages` or automatic via Cloudflare Pages Git integration
- Vercel: not production — do not reintroduce without an explicit architecture decision

---

## Local Development

Install dependencies:

```bash
npm install
```

Run syntax checks:

```bash
node --check "functions/[[path]].js"
node --check functions/api/shows.js
node --check functions/api/health.js
node --check functions/sitemap.xml.js
node --check public/app.js
```

Run the available data validation:

```bash
npm run events:validate
```

Run local Pages preview:

```bash
npm run dev
```

Then open `http://localhost:3000/api/health`.

---

## Production Deploy

### Option A — GitHub→Pages CI (active — preferred)

The Cloudflare Pages project is connected to the GitHub repo via Git integration (confirmed 2026-05-11). Every merge to `main` automatically deploys to production. No manual step needed for normal changes.

### Option B — Manual CLI deploy

```bash
npm run deploy:pages:safe
```

This runs the smoke check suite and then deploys. Or without pre-flight checks:

```bash
npm run deploy:pages
```

Both commands run `wrangler pages deploy public` and deploy the current `public/` and `functions/` to the production Cloudflare Pages project.

### Before any production deploy

1. Confirm no fake prices, placeholder CTAs, or invented event data are present.
2. Run syntax checks and event validation (see Local Development above).
3. Run the smoke check suite: `node scripts/smoke-prelaunch.mjs`
4. Confirm `git diff --check` is clean.

---

## Verify Health After Deploy

```bash
curl -fsS https://tourticketcompare.com/api/health
curl -fsSI https://www.tourticketcompare.com/
```

Expected health shape:

```json
{
  "ok": true,
  "service": "tourticketcompare",
  "runtime": "cloudflare-pages-functions",
  "status": "ok",
  "config": {
    "mockMode": false,
    "allowMockPrices": false,
    "clickTrackingEnabled": true
  },
  "bindings": {
    "demandDb": true,
    "impactAccountSid": true,
    "impactAuthToken": true
  }
}
```

The `www` check should return HTTP 301 to the apex domain. Secret values must never appear in the health response.

---

## Required Dashboard Bindings (Cloudflare Pages → Settings → Functions)

These must be configured in the Cloudflare Pages dashboard for the project to function in production. They are not set automatically from `wrangler.toml` for Git-connected deploys.

| Type | Binding name | Value |
|---|---|---|
| D1 database | `DEMAND_DB` | `tourticketcompare-demand` (ID: `19b314b8-10f1-4504-a3bc-963f7ecbe9f6`) |
| Secret | `IMPACT_ACCOUNT_SID` | From Cloudflare Worker environment (do not store in repo) |
| Secret | `IMPACT_AUTH_TOKEN` | From Cloudflare Worker environment (do not store in repo) |
| Secret | `IMPACT_SEATGEEK_*` | SeatGeek Impact program (account SID / auth token / program or campaign id, optional base tracking URL) |
| Secret | `IMPACT_VIVIDSEATS_*` | Vivid Seats Impact program (account SID / auth token / program or campaign id, optional base tracking URL) |

`IMPACT_TICKETMASTER_*` secrets are no longer read by any code (Ticketmaster affiliate ended 2026-07) — delete them from the dashboard after verifying the pivot deploy.

Environment variables (set in dashboard or `wrangler.toml [vars]` for CLI deploys):

| Variable | Production value |
|---|---|
| `MOCK_MODE` | `false` |
| `ALLOW_MOCK_PRICES` | `false` |
| `CLICK_TRACKING_ENABLED` | `true` |
| `SEATGEEK_PRICE_DISPLAY_ENABLED` | `true` |
| `VIVIDSEATS_PRICE_DISPLAY_ENABLED` | `true` |

### Price snapshot operations

The SeatGeek and Vivid Seats snapshot workflows run every four hours and write only approved, exact-event observations to `provider_pricing_cache`. Public requests read this D1 cache in one batch; they never fan out to provider APIs.

Required GitHub Actions configuration:

| Setting | Where configured | Verification |
|---|---|---|
| `SEATGEEK_CLIENT_ID` | Repository → Settings → Secrets and variables → Actions → Secrets | Dispatch **SeatGeek price snapshots** with `apply=true`; the configuration step must report the client ID as present. |
| `SEATGEEK_CLIENT_SECRET` | Repository → Settings → Secrets and variables → Actions → Secrets | The same run must report the client secret as present. If all fetched events still have null pricing statistics, request pricing-stat entitlement from SeatGeek; rotating or exposing the secret is not a code fix. |
| `IMPACT_VIVIDSEATS_*` | Repository → Settings → Secrets and variables → Actions → Secrets | Dispatch **Vivid Seats price snapshots** with `apply=true`; configuration must pass and the summary should report non-zero eligible/fetched/usable/written counts. |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | Repository → Settings → Secrets and variables → Actions → Secrets | Required for the remote D1 write and post-run cache audit. |

A successful apply run reports `eligible`, `fetched`, `usable`, `written`, `skipped`, `stale`, and `failed`, with `failed: 0` and no `zero_row_reason`. Confirm safely in production by checking the workflow's D1 cache audit, then request `/api/shows?artist=<slug>&includePrices=true&priceProviders=approved-marketplaces` for a representative verified artist. A displayed lane must have the expected provider/source, a `fetchedAt` timestamp, and an unexpired row. Never paste secrets or raw affiliate credentials into logs or browser requests.

---

## Daily Data Audit

`.github/workflows/daily-audit.yml` runs at 03:00 UTC daily (and on `workflow_dispatch`). It is the scheduled check-and-update pipeline for outbound ticket links and Ticketmaster event freshness.

### What it does

1. **URL liveness** — `scripts/verify-outbound-links.mjs --json` HEAD-checks every `ticketmaster_url`, `seatgeek_url`, `source_url`, and `provider_links[*].url` in `public/data/events.json`. Storefront WAF challenges (401/403/429) are reported as `blocked` (inconclusive), never as failures.
2. **TM Discovery diff** — `scripts/audit-tm-events.mjs --json` calls the Ticketmaster Discovery API for every indexed artist's events. It queries by the **Discovery event id** (`ticketmaster_discovery_event_id`, falling back to `provider_links.ticketmaster.discovery_event_id`, then to `ticketmaster_event_id` only when that is itself Discovery-format). It flags:
   - `missing` — Discovery returns `404/410` (the show is genuinely gone);
   - `changed` — resolves but the venue-local date, venue name, or an **actionable** status (cancelled/postponed/rescheduled) differs. Date comparison is timezone-aware and venue comparison ignores case/punctuation, so representation differences are not flagged;
   - `unresolvable` — no Discovery-format id is stored (a legacy consumer-website `/event/<hex>` code or an international numeric storefront id). These **cannot** be checked against the API and are surfaced for backfill, **not** counted as failures or missing;
   - `errors` — transient (timeout/5xx), retried next run.

   > **Why the split id model matters:** the Discovery API is keyed by the Discovery event id, not the `/event/<id>` code in storefront URLs. Events that only carry the storefront code return `404` and would otherwise be reported as false "missing". `scripts/backfill-discovery-ids.mjs` (`npm run audit:backfill-discovery-ids`; dry-run by default, `--apply` to write) repairs legacy rows by recovering the Discovery id from each artist's verified attraction feed on an unambiguous venue-local-date + city match. New rows added by the discovery loop already carry the Discovery id, so this is a one-time legacy repair.
3. **Report** — `scripts/daily-audit-report.mjs` writes findings into a single rolling GitHub issue labelled `automation:daily-audit`. The issue body is overwritten each run; status reads `🔴 Findings` or `🟢 All clean`. The `unresolvable` count is shown but does not turn the issue red.
4. **Verification dates PR** — `scripts/bump-verified-dates.mjs` bumps `last_verified_at` to today on `public/data/artists.json` for indexed artists whose URL audit and TM diff produced no findings. It conservatively **skips** any artist with a link failure, a `blocked` link, or a `missing`/`changed`/`error` event (an `unresolvable` event does not block a bump). The change is pushed to `automation/verified-dates-YYYY-MM-DD` and opens a PR for human review.

### Required secrets

| Secret | Where set | Used by |
|---|---|---|
| `TICKETMASTER_API_KEY` | Repo settings → Actions secrets | TM Discovery diff (without it, the diff job is skipped, link liveness still runs) |
| `GITHUB_TOKEN` | Provided automatically | Rolling issue + daily PR |

### What it does **not** do

- Does **not** auto-edit `events.json`, `catalog.json`, or any event-level record. Diffs are reported for human review.
- Does **not** scrape provider pages. Link checks use `HEAD`/`Range: 0-0` per the existing `verify-outbound-links.mjs` policy; TM data uses the official Discovery API.
- Does **not** modify `functions/api/out.js` or affiliate logic.

### PR stale-sync guard

`prelaunch-validation.yml` includes a `stale-sync-guard` job that runs on every PR. When `public/data/*.json` changes, it runs `npm run events:sync` and fails the PR if `public/index.html` is stale. This prevents JSON edits from shipping without the inlined-fallback being refreshed — see issue #174 for the underlying caching/refresh model.

---

## Ticketmaster new-shows discovery PR (how new links reach you)

`.github/workflows/tm-new-shows-pr.yml` runs at **04:00 UTC daily** (after the audit) and on `workflow_dispatch`. This is the workflow that **proposes newly-announced shows as a PR for you to review and merge** — the primary path by which fresh ticket links arrive on the site.

### What it does

1. Runs `scripts/sync-tm-events-write-pr.mjs --all-approved --write-pr`, which runs the Ticketmaster Discovery recogniser for **every artist in `data/provider-identities.json` with `review_status: "verified"` and `sync_enabled: true`** (currently all 16 indexed artists).
2. The recogniser **withholds events already in `events.json`** (matched by Discovery id), so only genuinely new shows are proposed. New rows carry `ticketmaster_discovery_event_id` (so the daily audit can verify them) and a **blank `tour_name`** (never inferred — a required human follow-up, #172).
3. Risky rows (missing venue/date, non-allowlisted host, support-act/festival/upsell listings) are withheld for human review and listed in `withheld-review.md`, never written.
4. It opens **one review PR** labelled `automation:tm-events`. It never commits to `main` and never auto-merges. A quiet day (no new shows) produces **no PR**.

### Coverage and gating

- **All 16 artists are in scope** (`sync_enabled: true`, `review_status: verified`, attraction id present). Onboarding a new artist requires a verified `data/provider-identities.json` entry, or that artist is silently skipped.
- Manual runs default to a safe `preview` (no PR); scheduled runs always open the PR. A single artist can be targeted via the `artist` input.
- Without `TICKETMASTER_API_KEY` the recogniser no-ops safely (no rows, no PR). See `docs/PROVIDER_SYNC.md`.

A scheduled run also maintains a rolling **`automation:tm-discovery`** coverage issue (via `scripts/report-tm-discovery-coverage.mjs`): it records which indexed artists were checked, how many new shows were proposed, links the PR, and **flags any artist that was skipped or absent from the run**. A quiet day still updates the issue, so a partial or failed run is never silent. (See "Discovery coverage heartbeat" below.)

### Automation map — the standing workflows

| Workflow | Schedule | Purpose | Output |
|---|---|---|---|
| **Daily data audit** (`daily-audit.yml`) | 03:00 UTC | Detect dead links and drift in **existing** events; bump verified dates for clean artists | Rolling `automation:daily-audit` issue + `automation/verified-dates-*` PR |
| **TM new-shows PR** (`tm-new-shows-pr.yml`) | 04:00 UTC | Propose **new** shows/links for every verified artist + maintain the coverage heartbeat | `automation:tm-events` review PR + `automation:tm-discovery` issue |
| **TM data refresh PR** (`tm-data-refresh-pr.yml`) | manual | Refresh **existing** events (genuine date/venue/city moves, canonical URL) and recover missing Discovery ids, as one review PR | `automation:tm-events` review PR + `automation:data-sync` issue |
| **Nightly data sync** (`nightly-data-sync.yml`) | 03:30 UTC (cron re-enabled 2026-07-07) | Lossless factual field sync of existing events, auto-committed to `main` per event under its commit gate | Direct `main` commit (gated) or `automation:data-sync` issue |
| **SeatGeek CTA sync** (`seatgeek-cta-sync.yml`) | 05:00 UTC (added 2026-07-08) | Add missing event-level `seatgeek_url` values (high-confidence) and write identity-anchored `provider_links.seatgeek` verified provenance (standalone SeatGeek CTAs on `needs_recheck` events, wrong-night self-heal) | Auto-merged `automation:seatgeek-cta` PR + committed audit logs |
| **Vivid Seats CTA sync** (`vividseats-cta-sync.yml`) | 05:30 UTC | Maintain verified event-level Vivid Seats destinations | Auto-merged `automation:vividseats-cta` PR + committed audit log |
| **SeatGeek price snapshots** (`seatgeek-price-snapshots.yml`) | Every 4 hours | Fetch approved exact-event SeatGeek statistics and write fresh cache rows | Run summary + D1 cache audit; fails blocked/failed zero-row runs |
| **Vivid Seats price snapshots** (`vividseats-price-snapshots.yml`) | Every 4 hours | Fetch approved exact-event Vivid Seats statistics and write fresh cache rows | Run summary + D1 cache audit; fails blocked/failed zero-row runs |

In short: **new** links → the 04:00 new-shows PR; **drift in existing** links → the audit issue (detection), the 03:30 nightly field sync (lossless fixes), and the manual refresh-PR workflow (reviewed fixes); **SeatGeek CTAs** → the 05:00 SeatGeek CTA sync; **link death** → the audit issue.

### Discovery coverage heartbeat

`scripts/report-tm-discovery-coverage.mjs` (`npm run providers:sync:tm:coverage`) consumes the `coverage.json` emitted by every new-shows run and maintains the rolling `automation:tm-discovery` issue. The guarantee it provides: **every indexed artist is positively accounted for on each run** — checked-with-new-shows, checked-no-new, skipped (with reason), or flagged as absent from the run (e.g. a `data/provider-identities.json` entry that lost `verified`/`sync_enabled`). This turns "no PR today" from an ambiguous silence into an explicit, auditable signal.

### TM data refresh PR (manual)

`tm-data-refresh-pr.yml` is **manual** (`workflow_dispatch`), defaulting to a safe `dry_run: true` preview. With `dry_run: false` it:

1. Runs `scripts/apply-tm-updates.mjs` — lossless factual refresh of existing events from the Discovery API. The comparison is **representation-aware**: it ignores country-name synonyms (`United States` ≈ `United States Of America`, `Great Britain` ≈ `United Kingdom`), venue-local-vs-UTC datetime representations of the same instant, and venue case/punctuation — so it proposes only **genuine** date moves, venue/city corrections, and canonical URL refreshes, not cosmetic churn.
2. Runs `scripts/backfill-discovery-ids.mjs --apply` to recover Discovery ids for events that newly resolve (shrinking the audit's `unresolvable` bucket).
3. Regenerates partitions/index, validates (`events:validate:prod`, `events:validate:partitions`, `test:mvp`), and opens **one review PR** (`automation:tm-events`) — never a direct `main` commit, never an auto-merge.
4. Surfaces cancelled/deleted/status items (never auto-applied) into the rolling `automation:data-sync` issue.

Restoring a CTA-suppressed (`needs_recheck`) event is deliberately **not** automated — those require human browser verification (see `PROJECT_STATUS.md` → Active risks).

---

## Nightly data sync operational state

`.github/workflows/nightly-data-sync.yml` runs at **03:30 UTC** and on `workflow_dispatch`. Manual runs default to `dry_run: true`; scheduled runs retain the workflow's validated commit gate.

### Safe manual dry-run

Use the manual `dry_run` input and leave it set to `true` (the safe default):

```text
Actions → Nightly data sync → Run workflow → dry_run: true
```

A dry-run passes `--dry-run --json .audit/tm-sync.json` to `scripts/apply-tm-updates.mjs`. The script calls Ticketmaster for already-tracked events and writes the report, but it does not write `public/data/events.json`; the commit step is also blocked by `inputs.dry_run != true`.

`TICKETMASTER_API_KEY` is required for a useful live Ticketmaster check. If the repository secret is missing, `scripts/apply-tm-updates.mjs` emits a GitHub Actions warning, makes no Ticketmaster calls, writes `.audit/tm-sync.json` with `status: "skipped"`, and exits 0. That is safe, but it is not evidence that the sync is healthy.

### Report artifact

The workflow creates `.audit/` and writes `.audit/tm-sync.json`. The final artifact step runs with `if: always()` and uploads that file as `nightly-data-sync-${{ github.run_id }}` with `include-hidden-files: true` and `retention-days: 30`. Download the artifact from the workflow run summary and inspect:

- `status` / `reason` for skipped runs, especially missing `TICKETMASTER_API_KEY`;
- `summary.checked`;
- `summary.updated`;
- `summary.reviewItems`;
- `summary.errors`;
- `summary.blockedUpdateIds`;
- each `updates[]`, `reviewItems[]`, `errors[]`, and `blockedUpdateIds[]` entry.

### Commit gate

The workflow commits directly to `main` only when all of these are true:

1. the run is not a dry-run (`inputs.dry_run != true`);
2. `public/data/events.json` changed;
3. `.audit/tm-sync.json` exists;
4. `updated > 0`;
5. `errors === 0`;
6. `blockedUpdateIds === 0`;
7. `reviewItems === 0`;
8. `npm run events:validate:prod`, `npm run events:sync`, `npm run events:partition`, `npm run events:validate:partitions`, and `npm run test:mvp` all pass.

Any review item, blocked update, script error, validation failure, smoke-test failure, missing report, dry-run input, or lack of an `events.json` diff blocks the commit/push. Non-dry-run runs also invoke `scripts/report-tm-sync-review.mjs`, which updates or creates the rolling `automation:data-sync` issue when review findings need human attention.

### Scheduled-state evidence to monitor

Keep the schedule enabled only while recent runs continue to show that:

- `TICKETMASTER_API_KEY` is present in Actions secrets and the report is not skipped;
- the dry-run checks a non-zero number of tracked events;
- `summary.errors`, `summary.reviewItems`, and `summary.blockedUpdateIds` are all zero, or any findings have been resolved by human-reviewed PRs;
- the commit gate and validation/smoke commands are still appropriate for every file the workflow may touch;
- CTA rendering regression guards remain green, so a sync cannot hide working public CTAs;
- artifact upload works and the `.audit/tm-sync.json` evidence is retained for review.

### Difference from provider-sync dry-run recognition

This workflow is the legacy authoritative field-sync for events that already exist in `public/data/events.json`. It looks up each event by `ticketmaster_discovery_event_id` when present, then by legacy `provider_links.ticketmaster.discovery_event_id` or `ticketmaster_event_id`, and may auto-apply only narrow factual field refreshes for that same existing event when the commit gate is clean.

The newer provider-sync recogniser (`scripts/sync-ticketmaster-events.py`, documented in `docs/PROVIDER_SYNC.md`) works at the artist/attraction level for human-verified `data/provider-identities.json` entries. It is dry-run-only, refuses to run without `--dry-run`, writes no files, adds no CTAs, and has no write mode. Its `PROPOSE` rows are evidence for a future PR-based write-mode design, not authorization for direct data changes or `main` commits.

---

## How a data change reaches production

This section describes the full path from a JSON edit to a live user seeing the update. Understanding it prevents the most common failure mode — shipping JSON edits without refreshing the inlined fallback (issue #174).

### The data sources a user can receive

A user visiting an artist page or the homepage can receive event and artist data from three places, in this priority order:

1. **Server-rendered HTML** (`functions/[[path]].js` reads `public/data/*.json` via `env.ASSETS` at request time). This is the primary path for most users.
2. **Client-side fetch** (`public/app.js` fetches `/data/catalog.json` and `/data/events.json` via XHR after page load for progressive enhancement).
3. **Inlined fallback in `public/index.html`** — two `<script type="application/json">` blocks (`#fallbackArtistsData`, `#fallbackEventsData`) that `app.js` reads synchronously if the XHR fails or the page is served without JavaScript. These are generated by `scripts/sync-events-data.py` and are static at deploy time.

### Step-by-step: editing a JSON data file

1. **Edit** `public/data/artists.json`, `catalog.json`, `events.json`, or an event partition.
2. **Run sync** — `npm run events:sync` (`python3 scripts/sync-events-data.py`) — to regenerate the inlined fallback blocks in `public/index.html`. Without this step, the inline fallback reflects the old data even after deploy.
3. **Open a PR.** `prelaunch-validation.yml` runs the `stale-sync-guard` job: it detects that `public/data/*.json` changed, runs `npm run events:sync`, and **fails the PR** if `public/index.html` is now different from the committed version. This is the automated check that catches forgotten sync runs.
4. **Merge to `main`.** Cloudflare Pages automatically deploys the updated `public/` and `functions/` directories. The Functions layer starts serving the new `public/data/*.json` via `env.ASSETS` immediately.
5. **CDN cache lag.** The `public/_headers` file sets the following `Cache-Control` TTLs on data files:
   - `/data/events.json`, `/data/events-index.json`, `/data/events/*`: `max-age=600` (10 minutes)
   - `/data/catalog.json`: `max-age=1800` (30 minutes)
   - `/data/artists.json`: `max-age=3600` (1 hour)
   Until these caches expire, CDN edge nodes and browsers may serve the previous version of each file to client-side fetches. The server-rendered HTML path is not affected by this lag (it reads assets fresh at request time).
6. **Cold-start / no-JS users** receive the inline fallback from `public/index.html`. This is refreshed at step 2 and deployed at step 4, so it is always in sync with the JSON data as long as the sync step was not skipped.

### Summary of failure modes

| What you forgot | Symptom | How it is caught |
|---|---|---|
| `npm run events:sync` | Inline fallback in `index.html` is stale | `stale-sync-guard` in PR CI (hard fail) |
| Merging before CI passes | Stale fallback or invalid data in production | `prelaunch-validation.yml` gate |
| Editing partition files directly | Partitions diverge from `events.json` | `npm run artist:check` count/ID diff check |
| CDN cache not yet expired | Client-side fetches serve old data for up to 30 min | Expected; not a failure mode |

**The `stale-sync-guard` prevents the most common failure mode (forgotten sync) but cannot prevent CDN cache lag.** If an urgent data correction needs to reach users faster than the CDN TTL, a Cloudflare cache purge is required from the dashboard.

---

## Vercel

Vercel is not production for this project. Do not add `vercel.json`, `api/**/*.mjs`, or Vercel deployment commands unless a future architecture decision explicitly reintroduces Vercel as an experimental preview path.

---

## Legacy: Standalone Worker (builder removed)

> **This section documents the previous production path. The standalone Worker is no longer the production runtime as of 2026-05-11, and its builder script was removed from the repo in the #176 deletion pass (2026-06-19). Do not follow these steps for normal production changes.**

Previously, production was served by Cloudflare Worker `tourticketcompare-live`, generated by `scripts/build-standalone-worker.mjs`. That builder script has now been removed from the repo. If a Worker rollback is ever genuinely required, recover the builder from git history (it bundled `public/` assets and `functions/` routing into a single self-contained Worker `.js` file), rebuild, `node --check` the output, and upload to Worker `tourticketcompare-live` via the Cloudflare dashboard or Wrangler CLI, preserving all existing bindings and secrets. This is an emergency action only — Pages is the normal production path.

Last known Worker deploy: 2026-05-01, build `d3cc71487403`. Pages took over production on or before 2026-05-11 (exact date unconfirmed from repo history).
