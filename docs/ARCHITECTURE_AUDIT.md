# TourTicketCompare Architecture Audit

Last audited: 2026-05-05

## Summary

TourTicketCompare has drifted across several deployment and API models. The tracked `main` branch is still shaped like a Cloudflare Pages + Pages Functions project, while the known live custom domains currently route to Cloudflare Worker `tourticketcompare-live`.

Production changes should therefore target the standalone Worker path until routing is intentionally changed. Cloudflare Pages can remain a preview/fallback path, but it should not be treated as production while Worker routes own `tourticketcompare.com/*` and `www.tourticketcompare.com/*`.

## Current Runtime Inventory

### Production runtime

- Confirmed production target from project context: Cloudflare Worker `tourticketcompare-live`.
- The tracked `main` branch does not currently contain a committed standalone Worker entrypoint or Worker build script.
- A dirty local workspace contains a later standalone Worker generator at `scripts/build-standalone-worker.mjs`; that path appears to be the current live-deploy mechanism but is not part of tracked `main`.

### Preview/fallback runtime

- Cloudflare Pages is configured in `wrangler.toml` with `pages_build_output_dir = "public"`.
- Pages Functions live in `functions/`.
- `npm run dev` starts local Pages dev.
- `npm run deploy` and `npm run deploy:safe` currently deploy Cloudflare Pages, not the live Worker route.

### Vercel runtime

- Tracked `main` does not contain Vercel files.
- The dirty local workspace contains `vercel.json` and `api/**/*.mjs` route handlers from previous work.
- Vercel is not a confirmed production path and should be quarantined or clearly documented as experimental before any future merge.

## Commands

Tracked `package.json` commands:

- `npm run dev`: `wrangler pages dev public --compatibility-date=2025-01-01 --port 3000`
- `npm run deploy`: `wrangler pages deploy public`
- `npm run deploy:safe`: validates production event data, then deploys Pages.
- `npm run events:*`: CSV, partition, sync, and validation tooling for static event JSON.

Risk: the current `deploy` script name implies production, but it deploys Pages. While production domains route to `tourticketcompare-live`, that command does not update the live site.

## Entrypoints

### Cloudflare Pages Functions

- `functions/[[path]].js`: path-based static route fallback for Pages.
- `functions/api/shows.js`: show metadata and provider-price API, including Ticketmaster Discovery support.
- `functions/api/click.js`: click tracking endpoint.
- `functions/sitemap.xml.js`: sitemap generation.

### Standalone Worker

- Not committed on tracked `main`.
- Dirty local workspace indicates `scripts/build-standalone-worker.mjs` generates a compact Worker bundle and embeds static assets/routes/API behavior.
- This should become the explicit production entrypoint if the Worker remains attached to the live domains.

### Vercel

- Not committed on tracked `main`.
- Dirty local workspace contains:
  - `vercel.json`
  - `api/*.mjs`
  - `api/impact/*.mjs`
  - `api/_lib/*.mjs`
- These routes duplicate some Pages/Worker logic and should not be considered production without an explicit architecture decision.

## API Routes

Tracked Pages Functions:

- `GET /api/shows`
- `POST /api/click`
- `GET /sitemap.xml`
- Static/app fallback through `functions/[[path]].js`

Dirty local workspace additions observed:

- `GET /api/health`
- `POST /api/signup`
- `POST /api/analytics`
- `GET/POST /api/out`
- Impact API helpers for health, products, and tracking links.
- Vercel equivalents under `api/`.

Risk: `/api/out`, `/api/health`, signup, analytics, Impact helpers, and show/provider logic exist in multiple runtime styles in the dirty workspace. Production behavior can drift if only one runtime is updated.

## Data Files

Tracked static data:

- `data/events.csv`
- `public/data/events.json`
- `public/data/events-index.json`
- `public/data/events/*.json`
- `public/data/artists.json`

Tracked migration:

- `migrations/001_daily_provider_calls.sql`

Dirty local workspace additions observed:

- `public/data/catalog.json`
- `public/data/affiliate-routes.json`
- `public/data/inventory-model.json`
- `migrations/0001_demand.sql`
- `migrations/0002_analytics_click_fields.sql`

Risk: static event JSON and legacy provider APIs must not be treated as verified live inventory. Do not publish invented events, prices, venues, dates, tours, or availability.

## Environment Variables And Bindings

Tracked source references:

- `MOCK_MODE`
- `ALLOW_MOCK_PRICES`
- `CACHE_TTL_MINUTES`
- `CLICK_TRACKING_ENABLED`
- `TICKETMASTER_API_KEY`
- `TICKETMASTER_DISCOVERY_BASE_URL`
- `TICKETMASTER_DISCOVERY_ENABLED`
- `TICKETMASTER_EVENTS_TTL_MINUTES`
- `TICKETMASTER_ARTIST_EVENTS_LIMIT`
- `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED`
- `TICKETMASTER_DISCOVERY_COUNTRY`
- `TICKETMASTER_DAILY_CAP`
- `TICKETMASTER_STALE_TTL_HOURS`
- `RATE_LIMIT_DB`
- `CLICKS_DB`
- `DB`
- `SEATGEEK_CLIENT_ID`
- `SEATGEEK_CLIENT_SECRET`
- `VIVID_SEATS_API_KEY`

Dirty local workspace additionally references:

- `DEMAND_DB`
- `IMPACT_ACCOUNT_SID`
- `IMPACT_AUTH_TOKEN`
- `IMPACT_DEFAULT_PROGRAM_ID`
- `IMPACT_TICKETMASTER_PROGRAM_ID`
- provider-specific Impact program IDs.

Secrets must be configured through Cloudflare bindings/secrets or local ignored files only. Do not commit real API keys, auth tokens, account SIDs, or database IDs.

## Duplicated Or Conflicting Logic

- Deployment conflict: tracked `npm run deploy` deploys Pages, while live production is known to be Worker `tourticketcompare-live`.
- Runtime conflict: Pages Functions exist in tracked source; dirty workspace adds standalone Worker and Vercel APIs.
- Provider logic conflict: `functions/api/shows.js` contains provider and price-fetch behavior, while dirty workspace adds `/api/out` and separate provider route logic.
- Data conflict: old static event partitions coexist with newer catalog-style files in dirty workspace.
- Product-positioning conflict: tracked README still describes a ticket comparison MVP. Current product rules require avoiding ticket/price comparison claims unless verified multi-provider live data exists.

## Obsolete, Risky, Or Wrong-Path Files

Clearly generated junk:

- `.DS_Store`
- `functions/.DS_Store`

Potentially wrong production path unless intentionally retained:

- `api/**/*.mjs` and `vercel.json` from dirty local workspace.
- Pages deploy scripts named as production deploy scripts while Worker owns live domains.

Risky until reconciled:

- Static event JSON that could be mistaken for verified live inventory.
- Legacy `/api/shows` provider-price behavior if public UI implies live comparison.
- Hardcoded affiliate route data duplicated across runtime-specific files in dirty workspace.

## Secret Scan Result

Tracked `main` was scanned for common secret names and committed credentials. No real secret values were found in tracked committed files during this audit.

Notes:

- `.dev.vars` is ignored and was not printed.
- `wrangler.toml` contains placeholder `database_id = "replace-with-d1-database-id"` comments only on tracked `main`.
- The dirty local workspace was observed to contain a concrete D1 database ID in docs/config. Treat database IDs as configuration, not source. Remove them before merging any related files. If any real API key, auth token, or account SID was ever committed, rotate it.

## Recommended Target Architecture

- Cloudflare Worker is production.
- Cloudflare Pages remains preview/fallback only unless routing is deliberately changed.
- D1 stores persistent event, sync, demand, and analytics data.
- Ticketmaster Discovery API is the official event source for future event sync.
- Impact Publisher Tag handles eligible link transformation where appropriate.
- Impact API remains optional later and is not required for the first public version.
- Vercel is not production and should be archived, removed, or explicitly marked experimental before merge.

## Cleanup Plan

1. Make production deployment unambiguous:
   - Add a committed Worker build/deploy path for `tourticketcompare-live`.
   - Rename Pages deploy scripts to make preview/fallback status clear.
   - Ensure `npm run deploy` cannot accidentally deploy the wrong platform.
2. Reconcile runtime code:
   - Keep Worker production logic as the source of truth.
   - Keep Pages Functions only if they are intentionally maintained as preview/fallback.
   - Archive or remove Vercel files unless there is a deliberate Vercel preview plan.
3. Reconcile data:
   - Add one canonical featured-artist/catalog source.
   - Move event/sync state to D1 once verified sync exists.
   - Keep static JSON only for safe public metadata or local fallback.
4. Reconcile APIs:
   - Keep `/api/out` server-side only for verified outbound links.
   - Keep `/api/health` on the production Worker path.
   - Do not expose Impact credentials or Ticketmaster API keys to the browser.
5. Reconcile product copy:
   - Replace unsupported ticket/price comparison claims with trust-safe guide/resource language.
   - Keep no-scraping, official-API/feed-only, no-invented-data rules prominent.

## Non-Goals For This Audit

- No deployment.
- No new public product features.
- No Ticketmaster API calls added.
- No Vercel functionality added.
- No public UI changes.
