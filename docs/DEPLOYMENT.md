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
