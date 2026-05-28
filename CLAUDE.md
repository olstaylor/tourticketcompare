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

Review before starting work:

| Issue | Severity | Impact |
|-------|----------|--------|
| **Olivia Rodrigo trust gap** | High | No artist-level Ticketmaster verification (`verified_providers: []`); 8 short-form events flagged `needs_recheck` per PR #177. Top active priority — issue #171. See `BACKLOG.md`. |
| **Data refresh opacity** | Medium | `scripts/sync-events-data.py` inlines fallback data into `public/index.html`; user-facing refresh flow not yet documented in `docs/DEPLOYMENT.md`. The `stale-sync-guard` PR job catches the most common failure mode. Issue #174. |
| **Onboarding drift** | Medium | Adding an artist touches 5+ files with no single-command end-to-end validator. Issue #175. |
| **Raw HTML routing (production proof)** | Low–Medium (SEO) | Local proof passed 2026-05-19 on 17 representative routes; PR #184 added guide route / content / sitemap drift validation in CI. Production browser proof remains optional (issue #10). |
| **Named route shims inactive** | Low | Editing `functions/artists.js` etc. has no effect while middleware is active. Edit `[[path]].js` instead. |
| **Legacy deploy paths** | Low | `vercel.json`, `api/`, `scripts/build-standalone-worker.mjs`, and `archive/vercel-experimental/` are not production. Do not add Vercel-specific logic. Audit-only deletion plan tracked under issue #176. |

Do not action these without explicit scope (also tracked as "parked" in `BACKLOG.md`):
- Adding new artists, including The Weeknd
- `vercel.json`, `api/`, `build-standalone-worker.mjs`, `archive/vercel-experimental/` retirement (waits on issue #176 audit)
- Provider abstraction implementation (`functions/api/_providers/index.js`, `functions/_provider-registry.js`)
- Tour-level pages, city pages, event landing pages
- Public SeatGeek or Vivid Seats CTAs
- Live price aggregation or "cheapest" / "guaranteed availability" claims

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

## Session Protocol

Run at the start of every session, in this order:

1. Read `CLAUDE.md` (this file) → `PROJECT_STATUS.md` → `BACKLOG.md`.
2. Identify the task. If unspecified, pick the top unblocked item from `BACKLOG.md`.
3. Read only the files relevant to the task scope. Do not scan the whole repo.
4. Make the change. Touch only files within the explicit task scope.
5. Run the validation checks for the task type (see [CONTRIBUTING.md](CONTRIBUTING.md) for the full command list).
6. All checks must pass before committing.
7. Commit and push to the feature branch. Do not push to `main` or open a PR unless explicitly asked.
8. Summarise: files changed, checks passed, what was not touched.

---

## Task Routing

| Task type | Read first | Protected files involved |
|-----------|-----------|--------------------------|
| Route or page metadata | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | `functions/[[path]].js`, `functions/_route-metadata.js` |
| Data file change | [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md), [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) | `public/data/*.json` — run `npm run events:sync` after any edit |
| Add or promote an artist | [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md) | `functions/api/out.js`, `public/data/artists.json`, `public/data/catalog.json` |
| Add a ticket provider | [docs/ADDING_PROVIDERS.md](docs/ADDING_PROVIDERS.md) | `functions/api/out.js` |
| Affiliate or redirect change | [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) | `functions/api/out.js` |
| Deployment or infrastructure | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | `functions/_middleware.js`, `public/_routes.json` |

---

## Key Documentation

Read in order: **`CLAUDE.md`** (this file) → **`PROJECT_STATUS.md`** → **`BACKLOG.md`**.

Reference: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) · [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) · [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) · [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md) · [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md) · [docs/ADDING_PROVIDERS.md](docs/ADDING_PROVIDERS.md)

Not authoritative: `HANDOVER.md`, `AGENTS.md` — superseded; anything in `docs/archive/` — parked/historical.
