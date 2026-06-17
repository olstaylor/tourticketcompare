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
node --check functions/api/click.js
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
| Secret | `IMPACT_TICKETMASTER_PROGRAM_ID` | From Cloudflare Worker environment (do not store in repo) |

Environment variables (set in dashboard or `wrangler.toml [vars]` for CLI deploys):

| Variable | Production value |
|---|---|
| `MOCK_MODE` | `false` |
| `ALLOW_MOCK_PRICES` | `false` |
| `CLICK_TRACKING_ENABLED` | `true` |

---

## Daily Data Audit

`.github/workflows/daily-audit.yml` runs at 03:00 UTC daily (and on `workflow_dispatch`). It is the scheduled check-and-update pipeline that verifies outbound ticket links against the official provider APIs.

### What it does

1. **TM Discovery diff** — `scripts/audit-tm-events.mjs --json` calls the Ticketmaster Discovery API per event ID for every indexed artist, flagging `404/410` (missing), date/venue/status changes, and transient errors.
2. **SeatGeek Discovery diff** — `scripts/audit-seatgeek-events.mjs --json` calls the SeatGeek Platform API for every event carrying a `seatgeek_url` (ID parsed from the `/concert/<id>` path), flagging the same missing/changed/error conditions.
3. **Report** — `scripts/daily-audit-report.mjs` writes findings into a single rolling GitHub issue labelled `automation:daily-audit`. The issue body is overwritten each run; status reads `🔴 Findings` or `🟢 All clean`.
4. **Verification dates PR** — `scripts/bump-verified-dates.mjs` bumps `last_verified_at` to today on `public/data/artists.json` only for indexed artists that were **positively confirmed** — at least one event actually checked, and no findings on **either** the TM or SeatGeek API. Artists with no checkable events are never auto-verified. The change is pushed to `automation/verified-dates-YYYY-MM-DD` and opens a PR for human review.

> **Note:** earlier versions HEAD-checked storefront URLs directly (`scripts/verify-outbound-links.mjs`). That was removed from the pipeline: Ticketmaster/SeatGeek sit behind anti-bot WAFs that return `403` to CI runners, so an HTTP check could never confirm a live link, and scraping is against project policy. The script remains for manual use (`npm run audit:links`) but is not part of the daily audit. Verification is now API-only.

### Required secrets

| Secret | Where set | Used by |
|---|---|---|
| `TICKETMASTER_API_KEY` | Repo settings → Actions secrets | TM Discovery diff (without it the TM diff is skipped, and no date bumps occur) |
| `SEATGEEK_CLIENT_ID` | Repo settings → Actions secrets | SeatGeek Discovery diff (without it the SeatGeek diff is skipped, and no date bumps occur) |
| `GITHUB_TOKEN` | Provided automatically | Rolling issue + daily PR |

### What it does **not** do

- Does **not** auto-edit `events.json`, `catalog.json`, or any event-level record. Diffs are reported for human review.
- Does **not** scrape provider pages. Verification uses only the official Ticketmaster Discovery and SeatGeek Platform APIs.
- Does **not** modify `functions/api/out.js` or affiliate logic.
- Does **not** bump `last_verified_at` unless **both** provider audits ran cleanly that day; if either is skipped or fails, all date bumps are skipped.

### PR stale-sync guard

`prelaunch-validation.yml` includes a `stale-sync-guard` job that runs on every PR. When `public/data/*.json` changes, it runs `npm run events:sync` and fails the PR if `public/index.html` is stale. This prevents JSON edits from shipping without the inlined-fallback being refreshed — see issue #174 for the underlying caching/refresh model.

---

## Nightly data sync operational state

`.github/workflows/nightly-data-sync.yml` is currently **manual-only**. Its historical `schedule` cron (`30 3 * * *`) remains commented out, so no nightly run happens until a maintainer deliberately re-enables that event. The workflow can still be launched from **Actions → Nightly data sync → Run workflow**.

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

### Evidence required before re-enabling cron

Do not uncomment the schedule until there is clean evidence from recent manual runs that:

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

## Legacy: Standalone Worker

> **This section documents the previous production path. The standalone Worker is no longer the production runtime as of 2026-05-11. Do not follow these steps for normal production changes.**

Previously, production was served by Cloudflare Worker `tourticketcompare-live`, generated by `scripts/build-standalone-worker.mjs`. The Worker has not been deleted and remains available as an emergency rollback reference only.

To rebuild the Worker if needed for rollback purposes:

```bash
node scripts/build-standalone-worker.mjs /tmp/tourticketcompare-worker.js
node --check /tmp/tourticketcompare-worker.js
```

Then upload `/tmp/tourticketcompare-worker.js` to Worker `tourticketcompare-live` via the Cloudflare dashboard or Wrangler CLI, preserving all existing bindings and secrets. This is an emergency action only — Pages is the normal production path.

Last known Worker deploy: 2026-05-01, build `d3cc71487403`. Pages took over production on or before 2026-05-11 (exact date unconfirmed from repo history).
