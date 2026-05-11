# Pages Production Migration Plan

Audit date: 2026-05-11
Branch: `claude/plan-pages-production-migration`
Target state: GitHub `main` → Cloudflare Pages → `tourticketcompare.com` / `www.tourticketcompare.com`

---

## Status Update — 2026-05-11

**Migration is complete.** Production is confirmed running on Cloudflare Pages Functions (`runtime: "cloudflare-pages-functions"`). All critical bindings are active. The www→apex 301 redirect is confirmed working after a Cloudflare Redirect Rule was added 2026-05-11.

**Phase 1 (Worker upload) was skipped.** The standalone Worker is no longer serving production traffic. Do not upload a new Worker.

**One remaining operational check:** Confirm whether the Cloudflare Pages project is connected to the GitHub repo (Git integration). If not, deploys are currently manual via `npm run deploy:pages`. This must be confirmed before treating `main → Pages` as automatic.

See `docs/LIVE_PRODUCTION_VERIFICATION.md` for the full live evidence audit and production readiness checklist.

---

## Original Recommendation (superseded)

~~**Option B — do one final Worker upload first, then migrate to Pages.**~~

**Superseded.** Production moved to Pages before this plan was actioned. The recommendation below is preserved for reference only. Phase 1 (Worker upload) is no longer applicable.

### ~~Why Option B was safer~~

~~Option B sequences the work so that each step is independently verifiable before the next:~~

~~1. Upload Worker BUILD_ID `39fb2f948e27` → gets structural improvements live, establishes a known-good rollback point~~
~~2. Configure Pages dashboard (bindings, env vars, www redirect, custom domains) → verified on the `*.pages.dev` preview URL~~
~~3. Set up GitHub→Pages CI pipeline → confirmed working on preview~~
~~4. Confirm the Pages preview URL serves all pages correctly~~
~~5. Switch custom domain routing from Worker to Pages~~
~~6. Verify live, then retire the Worker~~

At any point before step 5, the Worker is live and unaffected. At step 5, rollback is re-routing to the Worker in the dashboard — a single change.

---

## Current Confirmed Repo State

| Item | State |
|---|---|
| `functions/` directory | Pages-compatible: `_middleware.js`, `[[path]].js`, `_route-metadata.js`, full API handlers |
| `public/_routes.json` | `include: ["/*"], exclude: ["/_assets/*", "/favicon.ico"]` — correct catch-all for Pages |
| `wrangler.toml` | `pages_build_output_dir = "public"` — correct for CLI deploys; real `DEMAND_DB` ID present |
| `package.json` | `npm run deploy` and `npm run deploy:pages` both run `wrangler pages deploy public` |
| GitHub Actions | None — no `.github/` directory exists |
| `vercel.json` + `api/` | Present in repo; not production; low-risk but not cleaned up |
| `scripts/build-standalone-worker.mjs` | Still present; to be retired after migration |

---

## Pages-Readiness Assessment

### Ready

- **`functions/` structure** — all Pages Functions conventions are in use: `_middleware.js` intercepts all requests, `[[path]].js` is the catch-all HTML renderer, named route shims exist as safety nets, API handlers are in `functions/api/`
- **Asset loading** — `loadCatalog` uses `env.ASSETS.fetch("https://assets.local/data/catalog.json")` — the standard Pages pattern for reading static assets from within a Function
- **HTML shell fetch** — `[[path]].js` fetches `env.ASSETS.fetch(new Request(new URL("/", request.url), request))` — Pages resolves "/" to `/index.html` correctly
- **`_routes.json`** — `include: ["/*"]` routes everything through Functions; `exclude: ["/_assets/*", "/favicon.ico"]` correctly passes through Cloudflare's internal asset CDN path and favicon
- **`wrangler.toml`** — `pages_build_output_dir = "public"` is the correct Pages configuration; `DEMAND_DB` has a real database ID

### Gaps (must be resolved before cutover)

| Gap | Severity | Resolution path |
|---|---|---|
| **www→apex redirect missing in Functions** | **Blocking** | Add a Cloudflare Redirect Rule in the dashboard (no code change required), or configure `www` as a redirect-only custom domain in the Pages project |
| **No GitHub→Pages CI pipeline** | **Blocking** | Connect repo to Cloudflare Pages via their Git integration in the dashboard, OR add a GitHub Actions workflow |
| **Pages dashboard bindings not confirmed** | **Blocking** | Must configure `DEMAND_DB`, `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN` in the Pages project settings before cutover |
| **Custom domain attachment to Pages not confirmed** | **Blocking** | Custom domains may still point only to the Worker; Pages project may not have `tourticketcompare.com` and `www.tourticketcompare.com` attached |
| **`vercel.json` + `api/` cleanup** | Low | Not blocking; leave until explicitly scoped |

---

## Manual Cloudflare Dashboard Checks Required

Perform all of these before beginning migration. None can be done from the repo.

### Cloudflare Workers & Pages — Pages project

1. Confirm a Pages project named `tourticketcompare` (or equivalent) exists
2. Confirm the Pages project is NOT already serving the custom domains (or confirm it is — either matters for sequencing)
3. Confirm the Pages project's current production deployment URL (the `*.pages.dev` preview URL)
4. Check what bindings are configured in the Pages project:
   - `DEMAND_DB` → must point to `tourticketcompare-demand` (ID `19b314b8-10f1-4504-a3bc-963f7ecbe9f6`)
   - `IMPACT_ACCOUNT_SID` → must be present (value from Worker environment)
   - `IMPACT_AUTH_TOKEN` → must be present (value from Worker environment)
5. Check what environment variables are set in the Pages project:
   - `MOCK_MODE` = `false`
   - `ALLOW_MOCK_PRICES` = `false`
   - `CLICK_TRACKING_ENABLED` = `true`
   - `CACHE_TTL_MINUTES` = `60`
   - Any other vars currently active in the Worker environment
6. Check if `tourticketcompare.com` and `www.tourticketcompare.com` are attached as custom domains to the Pages project
7. Check whether `www.tourticketcompare.com` is configured as a redirect-only domain (redirecting to apex) or as a full custom domain

### Cloudflare Workers — tourticketcompare-live

8. Confirm Worker `tourticketcompare-live` is still active
9. Confirm the Worker has routes for `tourticketcompare.com/*` and `www.tourticketcompare.com/*`
10. Note the Worker's bindings: `DEMAND_DB`, `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN` — these are the values Pages must replicate
11. Note any other environment variables set in the Worker that are not in `wrangler.toml [vars]`

### Cloudflare DNS

12. Confirm `tourticketcompare.com` A/AAAA records are Cloudflare-proxied
13. Confirm `www.tourticketcompare.com` is a CNAME to the apex (or similar) and is Cloudflare-proxied
14. Confirm no stale page rules or redirect rules that could conflict

### Cloudflare D1

15. Confirm database `tourticketcompare-demand` (ID `19b314b8-10f1-4504-a3bc-963f7ecbe9f6`) is active and accessible
16. Confirm all four tables exist: `email_subscribers`, `artist_interests`, `analytics_events`, `rate_limits`

---

## Environment Variables and Bindings Pages Must Have

Copy these exactly from the Worker's current configuration.

### D1 Bindings (set in Pages dashboard → Settings → Functions → D1 database bindings)

| Binding name | Database name | Database ID |
|---|---|---|
| `DEMAND_DB` | `tourticketcompare-demand` | `19b314b8-10f1-4504-a3bc-963f7ecbe9f6` |

### Secrets (set in Pages dashboard → Settings → Environment variables, marked as encrypted)

| Variable | Notes |
|---|---|
| `IMPACT_ACCOUNT_SID` | Copy from Worker; do not store in repo |
| `IMPACT_AUTH_TOKEN` | Copy from Worker; do not store in repo |

### Environment Variables (set in Pages dashboard → Settings → Environment variables)

| Variable | Value | Notes |
|---|---|---|
| `MOCK_MODE` | `false` | Must be false in production |
| `ALLOW_MOCK_PRICES` | `false` | Must be false in production |
| `CLICK_TRACKING_ENABLED` | `true` | Enables outbound click analytics |
| `CACHE_TTL_MINUTES` | `60` | Match Worker |
| `TICKETMASTER_DAILY_CAP` | `1000` | Match Worker |
| `TICKETMASTER_STALE_TTL_HOURS` | `168` | Match Worker |
| `TICKETMASTER_EVENTS_TTL_MINUTES` | `30` | Match Worker |
| `TICKETMASTER_ARTIST_EVENTS_LIMIT` | `100` | Match Worker |
| `TICKETMASTER_DISCOVERY_ENABLED` | `true` | Match Worker |
| `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` | `false` | Match Worker |
| `TICKETMASTER_DISCOVERY_COUNTRY` | `` (empty) | Match Worker |

**Note:** `wrangler.toml [vars]` applies to CLI-based Pages deploys only. For Git-connected Pages deploys (the target architecture), all vars must be set in the dashboard. The `wrangler.toml` values are correct references but are not automatically synced to the dashboard.

---

## Pre-Migration Smoke Tests

Run these before beginning any dashboard changes.

### Local (no network required)

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/_route-metadata.js
node --check functions/_middleware.js
node --check functions/api/out.js
node --check functions/api/health.js
node --check functions/api/shows.js
python3 scripts/validate-events.py --for-production
git diff --check
```

### Pages preview URL (before routing custom domains)

After configuring bindings in the Pages dashboard and deploying to the `*.pages.dev` preview URL, verify all of these before touching custom domain routing:

```bash
PREVIEW=https://tourticketcompare.pages.dev   # replace with actual preview URL

# HTML routes
curl -fsS $PREVIEW/ | grep -o '<title>[^<]*</title>'
curl -fsS $PREVIEW/artists | grep -o '<title>[^<]*</title>'
curl -fsS $PREVIEW/artists/beyonce | grep -o '<title>[^<]*</title>'
curl -fsS $PREVIEW/guides/how-to-compare-concert-ticket-prices | grep -o '<title>[^<]*</title>'

# API
curl -fsS $PREVIEW/api/health | python3 -m json.tool
# Expected: ok=true, demandDb=true, mockMode=false, allowMockPrices=false

# Affiliate redirect
curl -fsS -o /dev/null -w "%{http_code} %{redirect_url}" "$PREVIEW/api/out?artistSlug=beyonce&provider=ticketmaster&sourcePath=/"
# Expected: 302 to ticketmaster.evyy.net/...

# 404 behaviour
curl -fsS -o /dev/null -w "%{http_code}" $PREVIEW/nonexistent-page
# Expected: 404

# Static assets
curl -fsS -o /dev/null -w "%{http_code}" $PREVIEW/app.js
# Expected: 200

# Sitemap
curl -fsS $PREVIEW/sitemap.xml | grep '<loc>'
```

---

## Migration Steps

Complete the dashboard checks above first. Each step should be verified before proceeding.

### Phase 1 — Final Worker upload (do this first; maintains stable production throughout)

1. Rebuild Worker from current `main`: `node scripts/build-standalone-worker.mjs /tmp/tourticketcompare-worker.js`
2. Verify: `node --check /tmp/tourticketcompare-worker.js`
3. Upload to Worker `tourticketcompare-live` via Cloudflare dashboard, preserving all bindings and secrets
4. Verify live: `curl -fsS https://tourticketcompare.com/api/health`
5. Confirm `buildId` in health response is `39fb2f948e27`

### Phase 2 — Configure Pages dashboard

6. In the Cloudflare Pages project, configure all bindings and environment variables listed above
7. Verify `DEMAND_DB` is correctly bound to the real D1 database
8. Verify `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are set as encrypted secrets (do not log or print them)
9. Do NOT yet attach custom domains to Pages (Worker still serves production)

### Phase 3 — Set up GitHub→Pages CI pipeline

Choose one:

**Option 3A — Cloudflare Pages Git integration (recommended)**
- In Cloudflare Pages dashboard: Settings → Connect to Git → connect `olstaylor/tourticketcompare` repository
- Set production branch: `main`
- Build command: (none — Pages Functions do not need a build step; leave blank or use `echo ok`)
- Build output directory: `public`
- This causes every push to `main` to trigger a Pages deploy automatically

**Option 3B — GitHub Actions**
- Add `.github/workflows/deploy-pages.yml` that runs `npm run deploy:pages:safe` on push to `main`
- Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets
- This approach keeps CI visible in the GitHub Actions tab

After setting up CI, push a test commit (a whitespace change to a doc file) and confirm the Pages preview URL reflects it.

### Phase 4 — Verify Pages on preview URL

10. Run all pre-migration smoke tests against the `*.pages.dev` preview URL (see above)
11. Confirm API health shows `demandDb: true` — confirms the `DEMAND_DB` binding is working
12. Confirm the affiliate redirect `/api/out?artistSlug=beyonce&provider=ticketmaster` returns 302 to the correct destination
13. Confirm 404 pages return status 404 and `noindex`
14. Confirm all seven artist pages render with correct title and H1
15. If any check fails, do not proceed to Phase 5

### Phase 5 — Resolve the www redirect gap

Before attaching custom domains, decide how to handle `www.tourticketcompare.com → tourticketcompare.com`:

**Option 5A — Cloudflare Redirect Rule (no code change)**
- In Cloudflare dashboard → `tourticketcompare.com` zone → Rules → Redirect Rules
- Add rule: hostname `www.tourticketcompare.com` → redirect to `https://tourticketcompare.com${uri.path}` (301)
- This fires before Pages Functions are invoked and requires no code change

**Option 5B — Pages custom domain redirect-only**
- When attaching `www.tourticketcompare.com` as a custom domain in the Pages project, Cloudflare Pages has an option to configure it as a redirect to the primary domain
- Check whether this option is available in the Pages dashboard for this project

Confirm the www redirect is in place before cutting custom domain routing.

### Phase 6 — Attach custom domains to Pages and cut over

16. In Cloudflare Pages project: Settings → Custom Domains → Add `tourticketcompare.com`
17. Add `www.tourticketcompare.com` (as redirect-only if Option 5B, or as full domain if using Option 5A)
18. Cloudflare will update DNS/routing automatically when custom domains are attached to Pages
19. If the Worker has explicit routes (`tourticketcompare.com/*`, `www.tourticketcompare.com/*`), Cloudflare may present a conflict — remove the Worker routes or disable them when prompted
20. Verify: `curl -fsS https://tourticketcompare.com/api/health`
21. Confirm health response shows `"runtime"` field (if present) is `cloudflare-pages` or similar, NOT `cloudflare-standalone-worker`

---

## Rollback Steps

At any point before Phase 6 step 18 is confirmed working, rollback is: do nothing. The Worker is still live.

After Phase 6 step 18 (custom domains cut to Pages):

1. In Cloudflare Pages project: remove `tourticketcompare.com` and `www.tourticketcompare.com` custom domains
2. Re-add Worker routes for `tourticketcompare.com/*` and `www.tourticketcompare.com/*` pointing to `tourticketcompare-live`
   - Worker `tourticketcompare-live` should still exist with BUILD_ID `39fb2f948e27` from Phase 1
3. Verify: `curl -fsS https://tourticketcompare.com/api/health` returns `buildId: "39fb2f948e27"`

**Rollback is fast** (a few dashboard clicks) as long as the Worker is not deleted. Do not delete or overwrite `tourticketcompare-live` until Pages has been live and stable for at least 48 hours.

---

## Post-Migration Smoke Tests

Run after Phase 6 is confirmed.

```bash
# Production health
curl -fsS https://tourticketcompare.com/api/health | python3 -m json.tool

# www redirect
curl -fsS -o /dev/null -w "%{http_code} %{redirect_url}" https://www.tourticketcompare.com/
# Expected: 301 to https://tourticketcompare.com/

# Homepage title
curl -fsS https://tourticketcompare.com/ | grep -o '<title>[^<]*</title>'
# Expected: Find Verified Ticket Options for Major Tours | TourTicketCompare

# Artist page
curl -fsS https://tourticketcompare.com/artists/beyonce | grep -o '<title>[^<]*</title>'

# Guide page
curl -fsS https://tourticketcompare.com/guides/how-to-compare-concert-ticket-prices | grep -o '<title>[^<]*</title>'

# Affiliate redirect
curl -fsS -o /dev/null -w "%{http_code} %{redirect_url}" "https://tourticketcompare.com/api/out?artistSlug=beyonce&provider=ticketmaster&sourcePath=/"
# Expected: 302 to ticketmaster.evyy.net/...

# 404
curl -fsS -o /dev/null -w "%{http_code}" https://tourticketcompare.com/nonexistent-page
# Expected: 404

# Sitemap
curl -fsS https://tourticketcompare.com/sitemap.xml | grep -c '<loc>'
# Expected: 20 (matches the 20-URL sitemap)

# D1 analytics (verify a real outbound click is recorded)
# Click through to /api/out?... and then check D1 via:
# npm run demand:export (or wrangler d1 execute)
```

Also verify in the Cloudflare Pages dashboard:
- Deployment history shows the latest `main` commit as the active production deployment
- No errors in the Pages Functions log for the health check request

---

## When and How to Retire scripts/build-standalone-worker.mjs

**Condition:** Pages has been serving production traffic for at least 48–72 hours with no issues. All post-migration smoke tests pass. D1 analytics are recording correctly.

**Steps:**
1. Confirm Worker `tourticketcompare-live` is no longer serving any custom domain traffic
2. Open a dedicated branch; remove `scripts/build-standalone-worker.mjs` from the repo
3. Update `docs/DEPLOYMENT.md` to remove all Worker build and upload instructions and replace with the Pages deploy workflow
4. Update `docs/ARCHITECTURE.md` to remove the "Worker vs Pages production ownership" ambiguity section
5. Update `PROJECT_STATUS.md` to mark the Worker version gap as closed
6. Update `AGENTS.md` to remove `scripts/build-standalone-worker.mjs` from the protected-areas list
7. Commit, push, and merge
8. Archive (do not delete) Worker `tourticketcompare-live` in the Cloudflare dashboard for 30 days before deactivating

**Do not** remove the Worker script until Pages has been stable in production. The script is the only rollback path if Pages develops a runtime issue.

---

## What Not to Touch During Migration

- `/api/out` — verified affiliate redirect logic; no changes during migration
- `VERIFIED_TICKET_LINKS` in `functions/api/out.js` — approved affiliate URLs
- `public/data/events.json`, `artists.json`, `catalog.json` — no data changes during migration
- `functions/_route-metadata.js` — single source of truth for page metadata
- `_routes.json` — already correct for Pages; do not modify
- `functions/_middleware.js` — a bug here fails all HTML routes; no changes during migration
- Cloudflare D1 database `tourticketcompare-demand` — do not drop, recreate, or run new migrations during migration window
- Worker `tourticketcompare-live` — do not delete until Pages is confirmed stable

---

## Sequencing Summary (Final — 2026-05-11)

```
[✓ DONE] Phase 1: Final Worker upload          ← SKIPPED: Pages already live
[✓ DONE] Phase 2: Pages dashboard bindings     ← Confirmed via /api/health
[?      ] Phase 3: GitHub→Pages CI pipeline    ← Unconfirmed; check dashboard
[✓ DONE] Phase 4: Pages preview verification   ← Pages is now production
[✓ DONE] Phase 5: www redirect                 ← 301 confirmed 2026-05-11
[✓ DONE] Phase 6: Custom domains → cut over    ← Confirmed live
  ↓ Confirm CI pipeline (dashboard check)
  ↓ Complete remaining route smoke checks
  ↓ Retire Worker script (when stable ≥48h)
[Effectively done — CI pipeline confirmation pending]
```

No application code changes are required to complete the migration. All remaining items are dashboard checks or operational verification steps.
