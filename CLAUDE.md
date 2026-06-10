# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**TourTicketCompare** is an independent, unofficial fan-facing ticket research site for major live music tours. It provides verified ticket links, buying guidance, and artist watchlist pages for major tours.

- **Live:** https://tourticketcompare.com and https://www.tourticketcompare.com
- **Tech Stack:** Cloudflare Pages + Pages Functions (no build step; frontend is static HTML/CSS/JS)
- **Source of Truth:** GitHub `main` branch (auto-deploys to production via Cloudflare Pages Git integration)
- **Current Team:** Codex/Claude-assisted development

---

## Critical Product Rules

See [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) for the full non-negotiable list. In brief: never invent data, never scrape, never show fake CTAs or price comparison, never expose credentials client-side, never modify `/api/out` or affiliate logic without explicit scope.

---

## Repository Structure

```
public/                    Static frontend (served as-is by Cloudflare Pages)
  index.html              Shell HTML; title/meta/canonical replaced server-side per route
  app.js                  Client-side JS (progressive enhancement)
  styles.css
  data/
    artists.json          Artist records (slug, name, factual_summary, ticket links)
    catalog.json          Providers, ticket_links, tours
    events.json           Reviewed event records (Ticketmaster-sourced)
    events/               Per-artist partitioned event files

functions/                Cloudflare Pages Functions (server-side routing + APIs)
  _middleware.js          Entry point; delegates API/static paths to context.next(),
                          sends all HTML routes to [[path]].js
  [[path]].js             HTML routing logic: renders titles, meta, schemas, 404s
  _route-metadata.js      Single source of truth for page metadata, guide routes,
                          old guide redirects — edit here, not in [[path]].js
  [named-shims].js        artists.js, guides.js, how-it-works.js, etc.
                          Re-export from [[path]].js; inactive while _middleware.js exists
  api/
    out.js                Verified affiliate redirect (GET/POST)
    health.js             Runtime config status (no secrets exposed)
    shows.js              Event metadata by artistSlug
    analytics.js          D1-backed event analytics
    signup.js             Email demand capture to D1
    click.js              Legacy click event tracking
    impact/               Impact API integration helpers

scripts/
  smoke-prelaunch.mjs     Pre-deploy smoke checks
  validate-events.py      Validates events.json against production rules
  csv-to-events.py        Converts CSV to events.json format
  partition-events.py     Partitions events by artist for events-index.json
  sync-events-data.py     Syncs event data files

docs/
  ARCHITECTURE.md         Detailed routing model, data bindings, deployment path
  DEPLOYMENT.md           Local dev, production Pages deploy, CI guidance
  CONTENT_RULES.md        What can and cannot be published
  PROVIDER_DATA_POLICY.md Ticketmaster, SeatGeek, Vivid Seats, Impact affiliate policy
```

---

## High-Level Architecture

### Request Routing (Cloudflare Pages)

```
Request
  → _routes.json: routes /* through Functions (excludes /_assets/*, /favicon.ico)
  → _middleware.js
      ├─ API path (/api/*, /data/*)              → context.next() → handler
      ├─ Known static file (app.js, styles.css)  → context.next() → asset
      ├─ Any file extension (.*)                 → context.next() → asset
      └─ All other paths (HTML routes)           → [[path]].js onRequest
```

### HTML Routing Logic

All HTML route handling lives in `functions/[[path]].js`. It:
- Serves correct server-injected `<title>`, `<meta>`, canonical, JSON-LD schema
- Renders full `<main>` content for each route (artist pages, guides, trust pages, 404s)
- Handles legacy URL redirects (old guide slugs, root-level artist paths)
- Returns 404 with noindex for unknown routes (no auto-generated pages)

**Critical:** `functions/_route-metadata.js` is the single source of truth for page metadata (titles, descriptions, H1s, breadcrumbs, guide slugs, old-guide redirects). Edit metadata there, not in `[[path]].js`.

### Data Bindings (Cloudflare Pages)

| Binding | Type | ID | Status | Used for |
|---------|------|----|---------|-----------| 
| `DEMAND_DB` | D1 | `tourticketcompare-demand` | Active | Analytics, email signups, rate limiting |
| `IMPACT_ACCOUNT_SID` | Secret | (Cloudflare) | Active | Affiliate tracking (server-side only) |
| `IMPACT_AUTH_TOKEN` | Secret | (Cloudflare) | Active | Affiliate tracking (server-side only) |
| `IMPACT_TICKETMASTER_PROGRAM_ID` | Secret | (Cloudflare) | Active | Ticketmaster Impact program (server-side only) |

`wrangler.toml` declares `DEMAND_DB` only. There are no longer any `RATE_LIMIT_DB` or `CLICKS_DB` placeholder blocks in the file. Impact credentials are never exposed client-side; they're used only in `functions/api/out.js`.

### Named Route Shims

Files like `functions/artists.js`, `functions/guides.js`, etc. each contain:

```js
export { onRequest } from "./[[path]].js";
```

**While `_middleware.js` is active, these shims are never invoked.** Middleware intercepts all HTML routes and calls `[[path]].js` directly. If middleware is removed, the shims become the active handlers and delegate to `[[path]].js` — behaviour is preserved but the routing path changes.

**Risk:** Editing a shim while middleware is active has no effect on production. This can mislead contributors.

---

## Development Commands

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, validation commands, event data management, and deploy commands.

---

## Known Risks & Parked Issues

Review before starting work. (Issues **#171** Olivia Rodrigo verified links and **#175** onboarding runbook are now **closed/delivered** — `olivia-rodrigo` is verified `["ticketmaster"]` and `scripts/validate-artist.mjs` ships. See `BACKLOG.md` → "Recently completed". The rows below are the remaining live risks only.)

| Issue | Severity | Impact |
|-------|----------|--------|
| **Olivia Rodrigo residual event verification** | Medium | Artist-level Ticketmaster verification is restored (`verified_providers: ["ticketmaster"]`, in `VERIFIED_TICKET_LINKS`; issue #171 closed via PR #190). Remaining: **8 short-form events flagged `needs_recheck`** — CTAs suppressed until a human confirms each URL in a browser. See `PROJECT_STATUS.md` → Active risks. |
| **Blank `tour_name` (Olivia Rodrigo)** | Medium | All 86 Olivia Rodrigo events have blank `tour_name`. The validator already warns (blank) and hard-errors (missing key) per PR #186. Populating is blocked on human verification of the official tour name — URL slugs are evidence, not proof. Issue #172. |
| **Data refresh (#174 Phase B)** | Medium | `scripts/sync-events-data.py` inlines fallback data into `public/index.html`. Phase A (data-refresh flow) is now documented in `docs/DEPLOYMENT.md`; the `stale-sync-guard` PR job catches the common failure mode. Phase B (build-time cache-bust / stronger hook) remains parked. Issue #174. |
| **Raw HTML routing (production proof)** | Low–Medium (SEO) | Local proof passed 2026-05-19 on 17 representative routes; PR #184 added guide route / content / sitemap drift validation in CI. Production browser proof remains optional (issue #10). |
| **Named route shims inactive** | Low | Editing `functions/artists.js` etc. has no effect while middleware is active. Edit `[[path]].js` instead. |
| **Legacy deploy paths** | Low | `vercel.json`, `api/`, `scripts/build-standalone-worker.mjs`, and `archive/vercel-experimental/` are not production. Do not add Vercel-specific logic. Audit-only deletion plan tracked under issue #176. |

Do not action these without explicit scope (also tracked as "parked" in `BACKLOG.md`):
- `vercel.json`, `api/`, `build-standalone-worker.mjs`, `archive/vercel-experimental/` retirement (waits on issue #176 audit)
- Provider abstraction implementation (`functions/api/_providers/index.js`, `functions/_provider-registry.js`)
- Tour-level pages, city pages, event landing pages
- Artist-level SeatGeek links or SeatGeek price display (SeatGeek is configured and live in production, but **event-level only** — destinations come from a verified `seatgeek_url` in `events.json`, never from artist-level allowlist entries)
- Live price aggregation or "cheapest" / "guaranteed availability" claims

Unparked 2026-06-10 (no longer blocked, but the standard gates still apply):
- **New artists** may be onboarded via `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` + `docs/ADDING_ARTISTS.md` (phase gates, human browser verification, `npm run artist:check`). Never auto-published.
- **Public Vivid Seats CTAs** may be scoped and enabled — but only with a verified `vividseats.com` destination URL routed through `/api/out` (see `docs/PROVIDER_DATA_POLICY.md` → Vivid Seats). No verified destinations exist yet, so no CTAs render until they do.

---

## Protected Areas

Do not modify without explicit task scope:

- **`functions/api/out.js`** — verified affiliate redirect logic; contains `VERIFIED_TICKET_LINKS`
- **`functions/_middleware.js`** — entry point for all requests; a bug here breaks all HTML routes
- **`functions/[[path]].js`** — all HTML routing; changes affect every public page
- **`functions/_route-metadata.js`** — single source of truth for page titles, H1s, descriptions, breadcrumbs, guide slugs
- **`public/data/events.json`, `artists.json`, `catalog.json`** — do not add, modify, or remove records without verified source
- **`public/_routes.json`** — incorrect changes cause site-wide failures
- **Impact credentials** (`IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`) and affiliate tracking logic
- **Cloudflare dashboard settings** (routes, bindings, secrets)

---

## Working Style

- **Read only files relevant to the task.** Do not scan or rewrite the whole repo.
- **Make small, isolated changes.** One task = one or a few related commits.
- **Validate before committing.** Run the relevant checks from [CONTRIBUTING.md](CONTRIBUTING.md).
- **Summarise after changes:** which files changed, what was changed, which checks passed, what was not touched.
- **Before starting any session:** read this file, then `PROJECT_STATUS.md`, then `BACKLOG.md`. Those three files are the current source of truth for product state and active priorities — do not rely on `HANDOVER.md` or any historical audit (`CLEANUP_AUDIT.md`, `AUDIT_PARKING_LOT.md`, `SEO_ARCHITECTURE_AUDIT.md`, `docs/LIVE_PRODUCTION_VERIFICATION.md`, etc.) as a source of priorities.

---

## Key Documentation

Read in order: **`CLAUDE.md`** (this file) → **`PROJECT_STATUS.md`** → **`BACKLOG.md`**.

Reference: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) · [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) · [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) · [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md) · [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md) · [docs/ARTIST_SCALING_MAP.md](docs/ARTIST_SCALING_MAP.md)

Not authoritative: `HANDOVER.md`, `AGENTS.md` — superseded; `CLEANUP_AUDIT.md`, `AUDIT_PARKING_LOT.md`, `SEO_ARCHITECTURE_AUDIT.md`, `docs/PROVIDER_ABSTRACTION_*.md` — parked/historical.

---

## Safe Next Steps

When starting a new task:

1. Read this file, `PROJECT_STATUS.md`, and `BACKLOG.md` in that order.
2. Pick the highest active priority from `BACKLOG.md` that matches the user's request.
3. If modifying routes, page metadata, or HTML rendering, review `docs/ARCHITECTURE.md` § "Routing Model".
4. If adding/modifying data files, review `docs/CONTENT_RULES.md` and `docs/PROVIDER_DATA_POLICY.md`.
5. If touching `functions/api/out.js`, affiliate routing, or provider links, confirm the change is explicitly scoped — these are protected.
6. Run the relevant validation checks before committing.
7. Push to the feature branch; do not push to `main` unless explicitly asked.
