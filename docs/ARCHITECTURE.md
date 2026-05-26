# TourTicketCompare Architecture

This document describes the repo architecture as confirmed by reading the source and live evidence. Live production state is confirmed via `/api/health` (2026-05-11).

---

## Runtime Overview

| Layer | What it is | Status |
|---|---|---|
| `public/` | Static frontend assets (HTML, CSS, JS, data) | Confirmed |
| `functions/` | Cloudflare Pages Functions (server-side routing + APIs) | Confirmed |
| Cloudflare Pages | **Production runtime** — serves `tourticketcompare.com` and `www.tourticketcompare.com` | Confirmed live 2026-05-11 |
| Standalone Worker | `tourticketcompare-live` — legacy; no longer serving production custom domains | Superseded 2026-05-11 |
| Vercel | Not production; legacy artifacts only via `api/` + `vercel.json` | Not in use |

**Production deploy path:** Changes to `functions/` or `public/` committed to `main` deploy to production via `npm run deploy:pages` (or automatically if Cloudflare Pages Git integration is active). No Worker rebuild is required for normal production changes.

---

## Confirmed Repo Structure

```
public/               Static assets served directly by Cloudflare Pages
  index.html          Shell HTML for all routes (meta, title, canonical replaced server-side)
  app.js              Client-side JS (progressive enhancement only)
  styles.css
  favicon.svg
  robots.txt
  sitemap.xml
  data/
    artists.json      Artist records (slug, name, factual_summary, ticket links)
    catalog.json      Providers, ticket_links, tours
    events.json       Reviewed event records
    events-index.json Partitioned event index

functions/            Cloudflare Pages Functions
  _middleware.js      Runs for all requests; delegates HTML routes to [[path]].js
  _route-metadata.js  Shared page metadata (TRUST_ROUTES, GUIDE_ROUTES, OLD_GUIDE_REDIRECTS)
                      — imported by both [[path]].js and scripts/build-standalone-worker.mjs
  [[path]].js         Catch-all: ALL HTML routing logic, schema injection, 404 handling
  artists.js          Re-exports onRequest from [[path]].js (fallback if middleware removed)
  guides.js           Re-exports onRequest from [[path]].js
  how-it-works.js     Re-exports onRequest from [[path]].js
  editorial-policy.js Re-exports onRequest from [[path]].js
  affiliate-disclosure.js Re-exports onRequest from [[path]].js
  contact.js          Re-exports onRequest from [[path]].js
  sitemap.xml.js      Generates sitemap
  api/
    health.js         GET /api/health — binding presence check, never exposes secrets
    shows.js          GET /api/shows — event metadata + optional provider price scaffolding
    out.js            GET/POST /api/out — verified outbound redirect (affiliate-safe)
    click.js          POST /api/click — legacy click event endpoint
    signup.js         POST /api/signup — email demand capture to D1
    analytics.js      POST /api/analytics — first-party event analytics to D1
    impact/
      _utils.js       Shared Impact API helpers
      health.js       GET /api/impact/health — credential presence check
      products.js     GET /api/impact/products — Impact product feed
      tracking-links.js POST /api/impact/tracking-links — generate Impact tracking URLs

scripts/
  build-standalone-worker.mjs   Legacy: bundles public/ + functions/ into a standalone Worker .js file (not the production path)
  smoke-prelaunch.mjs           Pre-deploy smoke checks
  validate-events.py            Validates events.json against production rules
  csv-to-events.py              Converts CSV input to events.json format
  partition-events.py           Partitions events by artist for events-index.json
  sync-events-data.py           Syncs event data files

docs/
  ARCHITECTURE.md     This file
  DEPLOYMENT.md       Deploy procedures and production Pages guidance
  CONTENT_RULES.md    Rules for what can and cannot be published
  PROVIDER_DATA_POLICY.md  Provider and affiliate data policy
  history.md          Historical context; not authoritative for current state

migrations/
  0001_demand.sql
  0002_analytics_click_fields.sql
```

---

## Routing Model

### Request flow (Cloudflare Pages)

```
Request
  → _routes.json: routes /* through Functions (excludes /_assets/* and /favicon.ico)
  → _middleware.js
      ├─ API path (/api/*, /data/*)        → context.next() → specific API handler
      ├─ Known static file (/app.js, etc.) → context.next() → served from assets
      ├─ Any file extension (.*)           → context.next() → served from assets
      └─ All other paths                  → [[path]].js onRequest (HTML rendering)
```

### HTML routing logic (all in `[[path]].js`)

| Pattern | Behaviour |
|---|---|
| `/` | Homepage |
| `/artists`, `/guides`, `/how-it-works`, etc. | Static trust pages (title/meta/content injected into `index.html`) |
| `/guides/[known-slug]` | Guide page (rendered with article schema) |
| `/guides/[old-slug]` | 301 redirect to canonical guide slug |
| `/artists/[known-slug]` | Artist page (loaded from catalog.json) |
| `/artists/[known-slug]/tickets` | 301 redirect to `/artists/[slug]` |
| `/artists/[known-slug]/[tour-slug]` | Tour page (only if verified tour record exists) |
| `/[artist-slug]-tickets[-city]` | 301 redirect to `/artists/[slug]` (legacy URLs) |
| `/[artist-slug]` | 301 redirect to `/artists/[slug]` (legacy root-level URLs) |
| Unknown path with no file extension | 404 (noindex; HTML shell injected) |
| Unknown path with file extension | Passed through to assets |

### Named route shims

`functions/artists.js` and similar files each contain exactly:

```js
export { onRequest } from "./[[path]].js";
```

**Behaviour:**
- While `_middleware.js` is in place, middleware intercepts HTML routes and calls `[[path]].js` directly. The named shims are **never invoked** for those routes because middleware returns a full Response without calling `context.next()`.
- If `_middleware.js` is removed, the named shims become the active handlers for their specific routes and will delegate to `[[path]].js` — behaviour is preserved but the routing path changes.
- **Risk:** Editing a named shim has no effect on the live site while middleware is in place. This can mislead contributors into thinking they have edited the active handler.

---

## Production Deploy Architecture

Production is served by Cloudflare Pages Functions. The deploy path is:

```
git push origin main
  → Cloudflare Pages Git integration (if active) → automatic Pages deploy
  OR
npm run deploy:pages → manual Pages deploy
```

`env.ASSETS` is provided by Cloudflare Pages at runtime and resolves requests for static files from `public/`. Data files (`/data/catalog.json`, etc.) are served the same way.

**`npm run deploy:pages` is the production deploy command.** Both `npm run deploy` and `npm run deploy:pages` run `wrangler pages deploy public` — they are identical and both update production.

### Legacy: Standalone Worker (`scripts/build-standalone-worker.mjs`)

`scripts/build-standalone-worker.mjs` is retained as an emergency rollback reference. It bundles `public/` assets and `functions/` routing into a single self-contained Worker `.js` file that can be uploaded to Worker `tourticketcompare-live` if needed.

It is **not** part of the normal production deploy path. Do not run it as part of routine feature work. See `docs/DEPLOYMENT.md` for the full legacy section.

---

## Data Bindings

| Binding | Name | Status | Notes |
|---|---|---|---|
| `DEMAND_DB` | `tourticketcompare-demand` | Active | Real database ID in wrangler.toml; stores email_subscribers, artist_interests, analytics_events, rate_limits |

`wrangler.toml` currently declares `DEMAND_DB` only. Earlier placeholder `RATE_LIMIT_DB` and `CLICKS_DB` blocks have been removed and are no longer present in the file.

---

## Known Architectural Notes

### 1. Route metadata shared module

`functions/_route-metadata.js` exports `TRUST_ROUTES`, `GUIDE_ROUTES`, and `OLD_GUIDE_REDIRECTS`. This is the single source of truth for page titles, descriptions, H1s, breadcrumbs, and guide redirect mappings used by `functions/[[path]].js`.

**When updating page metadata:** edit `functions/_route-metadata.js` only. Do not add copies in `[[path]].js`.

### 2. Routing precedence risks

`_routes.json` routes `/*` through functions. This means:

- Any uncaught exception in a Pages Function returns a blank or error response rather than falling back to the static `public/` file.
- If `_middleware.js` throws, all HTML routes fail.
- Adding a new file to `functions/` with a matching route name could silently shadow or double-handle a route.

### 3. Named shim fragility

The named shims provide a safety net if middleware is removed, but are otherwise unused. A contributor editing `functions/artists.js` expecting to affect artist route behaviour would see no change while `_middleware.js` is active.

### 4. Vercel path

`vercel.json` and `api/` exist in the repo as legacy artifacts. These are not production but could be accidentally used as a deploy target. Do not add Vercel-specific logic unless a deliberate architecture decision is made.

### 5. D1 bindings

`wrangler.toml` declares only `DEMAND_DB` (real database ID). The earlier placeholder `RATE_LIMIT_DB` and `CLICKS_DB` blocks have been removed; do not re-add them without a real D1 ID, since placeholder values would break local Pages dev and any CLI deploys that read `wrangler.toml`.

---

## What Requires Manual Cloudflare Verification

| Item | Status |
|---|---|
| Custom domains route to Cloudflare Pages (not Worker) | Confirmed live 2026-05-11 |
| Pages bindings: `DEMAND_DB`, `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN` | Confirmed via `/api/health` 2026-05-11 |
| `MOCK_MODE` and `ALLOW_MOCK_PRICES` are `false` | Confirmed via `/api/health` 2026-05-11 |
| `www.tourticketcompare.com` → 301 → apex | Confirmed via Cloudflare Redirect Rule 2026-05-11 |
| GitHub→Pages Git integration active | **Unconfirmed** — check Cloudflare Pages dashboard |
| `IMPACT_DEFAULT_PROGRAM_ID` configured | **Not required** — confirmed 2026-05-12; `IMPACT_TICKETMASTER_PROGRAM_ID` is the only Impact binding needed for current Ticketmaster affiliate links. Future SeatGeek/Vivid Seats integration may require additional program ID. |
| `IMPACT_TICKETMASTER_PROGRAM_ID` configured | Confirmed via `/api/health` 2026-05-11 |
