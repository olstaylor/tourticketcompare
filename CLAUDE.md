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
| `RATE_LIMIT_DB` | D1 | Not configured in wrangler.toml | Inactive | Removed; do not re-add without a real D1 ID |
| `CLICKS_DB` | D1 | Not configured in wrangler.toml | Inactive | Removed; do not re-add without a real D1 ID |

Impact credentials are never exposed client-side; they're used only in `functions/api/out.js`.

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
| **Raw HTML routing** | Medium (SEO) | Non-root routes serve correct server-injected HTML but client-side re-rendering on load can expose intermediate state to crawlers. Must be fixed before SEO scaling. |
| **Named route shims inactive** | Low | Editing `functions/artists.js` etc. has no effect while middleware is active. Edit `[[path]].js` instead. |
| **Legacy deploy paths** | Low | `vercel.json`, `api/` directory, and `scripts/build-standalone-worker.mjs` are not production but could be accidentally used. Do not add Vercel-specific logic. |

Do not action these without explicit scope:
- Raw HTML routing fix (parked for SEO scaling decision)
- `vercel.json`, `api/`, `build-standalone-worker.mjs` retirement
- Tour-level pages (routing supports them; no verified records exist)
- Event-level show cards on artist pages (data exists; UI not wired)

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
- **Before starting any session:** read `AGENTS.md`, `PROJECT_STATUS.md`, and `BACKLOG.md` for context.

---

## Key Documentation

- **`AGENTS.md`** — rules for AI/Codex sessions: protected areas, working style, validation
- **`PROJECT_STATUS.md`** — current known-good state, risks, priorities, confirmed live features
- **`BACKLOG.md`** — prioritised work by area
- **`PROJECT_BRIEF.md`** — product positioning, safety rules, affiliate constraints, success criteria
- **`HANDOVER.md`** — current live state, confirmed bindings, latest smoke check results
- **`docs/ARCHITECTURE.md`** — detailed routing model, Pages Functions structure, data bindings
- **`docs/DEPLOYMENT.md`** — local dev, production Pages deploy, CI guidance
- **`docs/CONTENT_RULES.md`** — what can and cannot be published
- **`docs/PROVIDER_DATA_POLICY.md`** — Ticketmaster, SeatGeek, Vivid Seats, Impact affiliate policy
- **`docs/LIVE_PRODUCTION_VERIFICATION.md`** — production readiness checklist and smoke test results

---

## Safe Next Steps

When starting a new task:

1. Check `PROJECT_STATUS.md` § 4 "Safe Next Roadmap" for priority
2. Read `BACKLOG.md` to understand work ordering
3. If modifying routes, page metadata, or HTML rendering, review `docs/ARCHITECTURE.md` § "Routing Model"
4. If adding/modifying data files, review `docs/CONTENT_RULES.md` and `docs/PROVIDER_DATA_POLICY.md`
5. If touching `functions/api/out.js`, affiliate routing, or provider links, confirm the change is explicitly scoped
6. Run validation checks before committing
7. Push to the feature branch; do not push to `main` unless explicitly asked
