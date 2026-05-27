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

These are non-negotiable — violations compromise the site's integrity:

1. **Never invent data:** tours, dates, venues, prices, availability, or ticket inventory
2. **Never scrape** ticket providers
3. **Never claim live price comparison** unless approved provider feeds supply it
4. **Provider pricing** may only be displayed with explicit usage rights from an approved provider feed
5. **No fake CTAs:** placeholder or example affiliate links must never be shown as real calls-to-action
6. **Affiliates are protected:** `/api/out` redirect logic, `VERIFIED_TICKET_LINKS`, and Impact credential handling are locked — do not modify without explicit scope

See `docs/CONTENT_RULES.md` and `docs/PROVIDER_DATA_POLICY.md` for full rules.

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

### Local Development

```bash
npm install          # Install dependencies

npm run dev          # Run local Pages preview (includes Functions)
                     # Opens http://localhost:3000 and http://localhost:3000/api/health
```

### Validation & Testing

```bash
# Syntax checks (always run these before committing)
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js

# Python event data validation
python3 scripts/validate-events.py --for-production

# Smoke test suite
node scripts/smoke-prelaunch.mjs

# Whitespace/conflict marker check
git diff --check

# When named route shims are touched, also check:
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

### Event Data Management

```bash
npm run events:csv       # Convert CSV input to events.json
npm run events:validate  # Validate events.json against production rules
npm run events:partition # Partition events by artist for events-index.json
npm run events:sync      # Sync event data files
npm run events:update    # Run csv→validate→partition→sync pipeline
```

### Deployment

```bash
# Manual deploy to production (no pre-flight checks)
npm run deploy:pages

# Deploy with smoke tests first (recommended)
npm run deploy:pages:safe

# Note: Merges to main auto-deploy via Cloudflare Pages Git integration
#       Manual deploy is only needed for emergency or off-schedule deploys
```

### Database (D1)

```bash
npm run demand:migrate   # Run migrations on production D1
npm run demand:export    # Export email_subscribers from production D1
```

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

## Working Style

- **Read only files relevant to the task.** Do not scan or rewrite the whole repo.
- **Make small, isolated changes.** One task = one or a few related commits.
- **Validate before committing.** Run the relevant checks from the Validation section above.
- **Summarise after changes:** which files changed, what was changed, which checks passed, what was not touched.
- **Before starting any session:** read this file, then `PROJECT_STATUS.md`, then `BACKLOG.md`. Those three files are the current source of truth for product state and active priorities — do not rely on `HANDOVER.md` or any historical audit (`CLEANUP_AUDIT.md`, `AUDIT_PARKING_LOT.md`, `SEO_ARCHITECTURE_AUDIT.md`, `docs/LIVE_PRODUCTION_VERIFICATION.md`, etc.) as a source of priorities.

---

## Key Documentation

**Current source of truth (read first, in this order):**

- **`CLAUDE.md`** (this file) — protected areas, hard product rules, validation, working style.
- **`PROJECT_STATUS.md`** — current state of the site and data; active risks.
- **`BACKLOG.md`** — active priorities, each tied to a live GitHub issue.

**Reference docs:**

- **`docs/ARCHITECTURE.md`** — routing model, Pages Functions structure, data bindings.
- **`docs/DEPLOYMENT.md`** — local dev, production Pages deploy, daily audit pipeline.
- **`docs/CONTENT_RULES.md`** — what can and cannot be published.
- **`docs/PROVIDER_DATA_POLICY.md`** — Ticketmaster, SeatGeek, Vivid Seats, Impact affiliate policy.
- **`docs/ADDING_ARTISTS.md`** — artist onboarding runbook.
- **`README.md`** — public front door; deploy commands; links to canonical docs.

**Not authoritative** (do not use as a source of current priorities or state):

- `HANDOVER.md` — stub pointing here.
- `AGENTS.md`, `PROJECT_BRIEF.md` — historical AI briefs; current rules live here and in `docs/CONTENT_RULES.md` / `docs/PROVIDER_DATA_POLICY.md`.
- Audits and one-off reports (`CLEANUP_AUDIT.md`, `AUDIT_PARKING_LOT.md`, `SEO_ARCHITECTURE_AUDIT.md`, `docs/LIVE_PRODUCTION_VERIFICATION.md`, `docs/OLIVIA_RODRIGO_LINK_REVIEW.md`, `docs/TOUR_NAME_AUDIT.md`, `docs/PROVIDER_ABSTRACTION_*.md`, `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md`) — historical evidence only; treat as current only if `PROJECT_STATUS.md` or `BACKLOG.md` explicitly references them.

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
