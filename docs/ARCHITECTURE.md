# TourTicketCompare Architecture

This document describes the repo architecture as confirmed by reading the source and live evidence. Live production state is confirmed via `/api/health` (first confirmed 2026-05-11; structure re-verified against the repo 2026-07-13). Live counts and binding state belong in `PROJECT_STATUS.md`, not here.

---

## Runtime Overview

| Layer | What it is | Status |
|---|---|---|
| `public/` | Static frontend assets (HTML, CSS, JS, data) | Confirmed |
| `functions/` | Cloudflare Pages Functions (server-side routing + APIs) | Confirmed |
| Cloudflare Pages | **Production runtime** — serves `tourticketcompare.com` and `www.tourticketcompare.com` | Confirmed live 2026-05-11 |
| Standalone Worker | `tourticketcompare-live` — legacy; no longer serving production custom domains | Superseded 2026-05-11 |
| Vercel | Never production; deploy artefacts removed from the repo (#176) | Not in use |

**Canonical deployment model (issue #176): Cloudflare Pages + Pages Functions is the only production deployment path.** The Vercel deploy artefacts (`vercel.json`, root `api/`) and the standalone Worker builder (`scripts/build-standalone-worker.mjs`) were removed from the repo in the #176 deletion pass (2026-06-19); only `archive/vercel-experimental/README.md` remains as a historical marker. Do not add Vercel- or Worker-specific logic. D1 bindings are limited to `DEMAND_DB` (no `RATE_LIMIT_DB`, no `CLICKS_DB`).

**Production deploy path:** Changes to `functions/` or `public/` merged to `main` deploy to production automatically via the Cloudflare Pages Git integration (`npm run deploy:pages` exists for emergencies only). No Worker rebuild is required for normal production changes.

---

## Confirmed Repo Structure

```
public/               Static assets served directly by Cloudflare Pages
  index.html          Shell HTML for all routes (meta, title, canonical replaced server-side);
                      carries an inlined data fallback written by scripts/sync-events-data.py
  app.js              Client-side JS (progressive enhancement only)
  ttc-home.js         Homepage client-side JS
  styles.css, ttc-home.css
  404.html, _headers, _routes.json, favicon.svg, og-image.png, robots.txt
  assets/, fonts/, internal/
  data/
    artists.json      Artist records (slug, name, factual_summary, ticket links)
    catalog.json      Providers, ticket_links, tours
    fallback-catalog.json  Client-side fallback if /data/catalog.json fails to load
    provider-configs.json  Per-provider display/cache/safety configuration
    events.json       Reviewed event records
    events/           Per-artist partitioned event files (generated)
    events-index.json Generated index over the partitions
    guides-content.json    Guide page content (topic guides)

functions/            Cloudflare Pages Functions
  _middleware.js      Runs for all requests; delegates HTML routes to [[path]].js
  _route-metadata.js  Shared page metadata (TRUST_ROUTES, GUIDE_ROUTES, OLD_GUIDE_REDIRECTS)
                      — imported by [[path]].js
  [[path]].js         Catch-all: ALL HTML routing logic, schema injection, 404 handling
  _impact-marketplace-config.js  Shared config for the Impact marketplace providers
                      (TicketNetwork, Ticket Liquidator, StubHub International)
  _provider-registry.js  Parked provider-abstraction scaffolding — do not build on
  artists.js          Re-exports onRequest from [[path]].js (fallback if middleware removed)
  guides.js           Re-exports onRequest from [[path]].js
  how-it-works.js     Re-exports onRequest from [[path]].js
  editorial-policy.js Re-exports onRequest from [[path]].js
  affiliate-disclosure.js Re-exports onRequest from [[path]].js
  contact.js          Re-exports onRequest from [[path]].js
  sitemap.xml.js      Generates sitemap
  llms.txt.js         Generates /llms.txt
  api/
    health.js         GET /api/health — binding presence check, never exposes secrets
    shows.js          GET /api/shows — event metadata + approved cache-only price snapshots
    out.js            GET/POST /api/out — verified outbound redirect (affiliate-safe)
    signup.js         POST /api/signup — email demand capture to D1
    analytics.js      POST /api/analytics — first-party event analytics to D1
    debug-seatgeek.js Internal diagnostic (kept deliberately)
    _providers/       Parked provider-abstraction scaffolding — do not build on
    impact/
      _utils.js       Shared Impact API helpers
      health.js       GET /api/impact/health — credential presence check
      catalogs.js     GET /api/impact/catalogs — Impact catalog diagnostics
      products.js     GET /api/impact/products — Impact product feed
      tracking-links.js POST /api/impact/tracking-links — generate Impact tracking URLs

data/
  provider-identities.json  Verified provider identity registry (human-verified only)

scripts/              Validation, discovery, snapshot, and automation tooling — the
                      command map lives in CONTRIBUTING.md and package.json; do not
                      duplicate the full listing here

docs/                 Reference docs (see CLAUDE.md § Key Documentation);
                      docs/archive/ is historical, indexed in docs/archive/INDEX.md

migrations/           Numbered D1 migrations — applied state recorded in
                      migrations/README.md
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

### Legacy: Standalone Worker (removed)

The standalone Worker builder (`scripts/build-standalone-worker.mjs`) was removed from the repo in the #176 deletion pass (2026-06-19). It had bundled `public/` assets and `functions/` routing into a single self-contained Worker `.js` file for the superseded `tourticketcompare-live` Worker, and was never part of the Pages production deploy path. If a Worker rollback is ever needed again, rebuild the bundler from git history rather than re-adding it speculatively.

---

## Data Bindings

| Binding | Name | Status | Notes |
|---|---|---|---|
| `DEMAND_DB` | `tourticketcompare-demand` | Active | Real database ID in wrangler.toml; stores email_subscribers, artist_interests, analytics_events, rate_limits, and the provider pricing cache/history tables (see `migrations/README.md`) |

`wrangler.toml` currently declares `DEMAND_DB` only. Earlier placeholder `RATE_LIMIT_DB` and `CLICKS_DB` blocks have been removed and are no longer present in the file.

Secret bindings (Impact affiliate credentials per provider, SeatGeek API discovery credentials, and the per-provider `*_PUBLIC_ENABLED` / `*_PRICE_DISPLAY_ENABLED` flags) are configured in the Cloudflare dashboard, never in the repo. The authoritative binding list and current runtime state live in `CLAUDE.md` § Bindings and `PROJECT_STATUS.md`; confirm live state through `/api/health` rather than inferring it from the repository.

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

`vercel.json` and the root `api/` Vercel-style handlers were removed from the repo in the #176 deletion pass (2026-06-19). Vercel is not a production target. Do not re-add Vercel deploy config or root `api/**/*.mjs` handlers unless a deliberate architecture decision reintroduces Vercel.

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
| GitHub→Pages Git integration active | Confirmed — merges to `main` auto-deploy to production (standing behaviour; see `CLAUDE.md` § Project Overview) |
| `IMPACT_DEFAULT_PROGRAM_ID` configured | **Not required** — confirmed 2026-05-12. |
| `IMPACT_TICKETMASTER_PROGRAM_ID` | **Removed from code 2026-07-02** — the site left the Ticketmaster affiliate programme; Ticketmaster redirects are plain. Delete the unused secret from the dashboard. SeatGeek uses `IMPACT_SEATGEEK_*`; Vivid Seats (`IMPACT_VIVIDSEATS_*`) is live for event-level CTAs (activated 2026-07-10). |
| TicketNetwork / Ticket Liquidator / StubHub International lanes | **Active since 2026-07-13** — verified through the SeatGeek-scoped Impact account (pinned campaigns `2322`, `2085`, `24092`) with optional per-provider overrides and independent `*_PUBLIC_ENABLED` kill switches. See `CLAUDE.md` § Bindings and `PROJECT_STATUS.md` for current state. |
