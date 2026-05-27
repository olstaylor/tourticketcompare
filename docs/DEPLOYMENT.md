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

`.github/workflows/daily-audit.yml` runs at 03:00 UTC daily (and on `workflow_dispatch`). It is the scheduled check-and-update pipeline for outbound ticket links and Ticketmaster event freshness.

### What it does

1. **URL liveness** — `scripts/verify-outbound-links.mjs --json` HEAD-checks every `ticketmaster_url`, `seatgeek_url`, `source_url`, and `provider_links[*].url` in `public/data/events.json`.
2. **TM Discovery diff** — `scripts/audit-tm-events.mjs --json` calls the Ticketmaster Discovery API per event ID for every indexed artist, flagging `404/410` (missing), date/venue/status changes, and transient errors.
3. **Report** — `scripts/daily-audit-report.mjs` writes findings into a single rolling GitHub issue labelled `automation:daily-audit`. The issue body is overwritten each run; status reads `🔴 Findings` or `🟢 All clean`.
4. **Verification dates PR** — `scripts/bump-verified-dates.mjs` bumps `last_verified_at` to today on `public/data/artists.json` for indexed artists whose URL audit and TM diff produced no findings. The change is pushed to `automation/verified-dates-YYYY-MM-DD` and opens a PR for human review.

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
