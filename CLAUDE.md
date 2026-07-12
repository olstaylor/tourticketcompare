# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) — and any other AI or human contributor — when working in this repository. It is the **single instruction source of truth**: stable rules, protected areas, and working style live here. Anything that changes week to week (data counts, artist states, active risks) lives **only** in `PROJECT_STATUS.md`.

**Read in order at session start:** `CLAUDE.md` (this file) → `PROJECT_STATUS.md` → `BACKLOG.md`.

---

## Project Overview

**TourTicketCompare** is an independent, unofficial fan-facing ticket research site for major live music tours. It provides verified ticket links, buying guidance, and artist watchlist pages.

- **Live:** https://tourticketcompare.com (www redirects to apex)
- **Stack:** Cloudflare Pages + Pages Functions. No build step — `public/` is served as-is; `functions/` is bundled by Cloudflare Pages.
- **Deploy:** GitHub `main` is the source of truth; merges auto-deploy to production via the Cloudflare Pages Git integration.
- **Storage:** Cloudflare D1 (`DEMAND_DB`) for analytics, signups, rate caps, and price-snapshot cache.

## Affiliate & Provider Model (2026-07)

- **SeatGeek is the primary, monetized CTA** (Impact network, server-side only), artist-level **and** event-level. Artist-level destinations are performer-page URLs captured from the SeatGeek `/2/performers/{id}` API for registry-verified performer ids — never constructed from names.
- **Vivid Seats is live for verified event-level CTAs** (second Impact provider): 218 events have independently verified Vivid Seats provenance. Artist-level Vivid Seats entries are not configured. Runtime Impact configuration and a verified `/production/<numeric id>` destination remain mandatory.
- **Ticketmaster affiliate access is gone** (site removed from the programme, 2026-07). Ticketmaster links are plain, unmonetized verified redirects, rendered after the affiliate providers. **Never re-add** Impact wrapping, the Publisher Tag, or `evyy.net` shortlinks for Ticketmaster.
- **Price comparison:** SeatGeek and Vivid Seats snapshots are collected on four-hour workflows so their six-hour cache rows refresh before expiry. Written provider agreements confirmed on 2026-07-10 allow fresh, approved SeatGeek and Vivid Seats snapshots to be displayed side by side for the same verified event, including lower-snapshot and price-difference calculations plus history. Both lanes still require the provider feature flag, a verified event URL, an approved source, and fresh timestamped cache data. Fees, taxes, availability, delivery, and checkout totals remain provider-controlled. See `docs/PROVIDER_DATA_POLICY.md`.

## Critical Product Rules

See [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) for the full non-negotiable list. In brief: never invent data, never scrape, never show fake CTAs or price comparisons, never expose credentials client-side, never modify `/api/out` or affiliate logic without explicit scope. Approved SeatGeek/Vivid comparisons remain gated by exact-event matching, source, and freshness checks.

---

## Repository Structure

```
public/                    Static frontend (served as-is by Cloudflare Pages)
  index.html              Shell HTML; title/meta/canonical replaced server-side per route.
                          Carries an inlined data fallback written by scripts/sync-events-data.py
                          — regenerate with `npm run events:sync`, never hand-edit.
  app.js, ttc-home.js     Client-side JS (progressive enhancement)
  styles.css, ttc-home.css
  data/
    artists.json          Artist records (slug, name, factual_summary, ticket links)
    catalog.json          Providers, ticket_links, tours
    events.json           Reviewed event records (Ticketmaster-sourced)
    events/               Per-artist partitioned event files (generated)
    events-index.json     Generated index over the partitions

functions/                Cloudflare Pages Functions (server-side routing + APIs)
  _middleware.js          Entry point; delegates API/static paths to context.next(),
                          sends all HTML routes to [[path]].js
  [[path]].js             HTML routing: titles, meta, schemas, redirects, 404s
  _route-metadata.js      Single source of truth for page metadata and guide routes —
                          edit here, not in [[path]].js
  [named-shims].js        artists.js, guides.js, etc. Re-export from [[path]].js;
                          inactive while _middleware.js exists (kept as documented fallback)
  api/
    out.js                Verified affiliate redirect (SeatGeek/Vivid Seats Impact-wrapped;
                          Ticketmaster plain). Contains VERIFIED_TICKET_LINKS. Protected.
    health.js             Runtime config status (no secrets exposed)
    shows.js              Event metadata by artistSlug
    analytics.js          D1-backed event analytics
    signup.js             Email demand capture to D1
    debug-seatgeek.js     Internal diagnostic (kept deliberately)
    impact/               Impact API diagnostics (health, products, tracking-links)
  _provider-registry.js + api/_providers/  Parked scaffolding — do not build on
                          without a scoped provider integration (see BACKLOG.md)

data/
  provider-identities.json  Verified provider identity registry (TM attraction ids,
                            SeatGeek performer ids) — human-verified entries only

scripts/                  Validation, discovery, and automation tooling (see CONTRIBUTING.md
                          and docs/DEPLOYMENT.md for the command map)
migrations/               D1 migrations (see migrations/README.md for applied state)
docs/                     Reference docs; docs/archive/ is historical, not authoritative
```

## High-Level Architecture

### Request routing

```
Request
  → _routes.json: routes /* through Functions (excludes /_assets/*, /favicon.ico)
  → _middleware.js
      ├─ API path (/api/*, /data/*)              → context.next() → handler
      ├─ Known static file (app.js, styles.css)  → context.next() → asset
      ├─ Any file extension (.*)                 → context.next() → asset
      └─ All other paths (HTML routes)           → [[path]].js onRequest
```

All HTML route handling lives in `functions/[[path]].js`; page metadata lives in `functions/_route-metadata.js`. Unknown routes return 404 with noindex — no auto-generated pages. Full detail: `docs/ARCHITECTURE.md`.

### Bindings (Cloudflare dashboard)

- `DEMAND_DB` (D1) — active; the only binding declared in `wrangler.toml`.
- `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` — network-level Impact fallback (server-side only).
- `IMPACT_SEATGEEK_*` — SeatGeek Impact program (server-side only). Active.
- `IMPACT_VIVIDSEATS_*` — production event-level CTAs are live; confirm runtime state through `/api/health` and redirect tests rather than inferring secret presence from the repository. Artist-level Vivid Seats entries remain absent.
- `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` — discovery tooling only, not `/api/out`.
- The old `IMPACT_TICKETMASTER_*` secrets are unused — delete them from the dashboard if still present (owner task, tracked in `BACKLOG.md`).

Impact credentials are never exposed client-side; they are used only in `functions/api/out.js`.

### Automation (scheduled GitHub Actions)

Operational detail in `docs/DEPLOYMENT.md`; current run state in `PROJECT_STATUS.md`.

- `daily-audit.yml` (03:00 UTC) — URL liveness + Ticketmaster Discovery diff into a rolling issue; verification-date-bump PRs.
- `nightly-data-sync.yml` (03:30 UTC) — lossless factual refresh (date/time, venue, `event_name`, canonical TM URL) auto-committed to `main` per event; anything needing judgement goes to the rolling issue.
- `tm-new-shows-pr.yml` (04:00 UTC) — new-show discovery PR; auto-merges once its in-run validation suite passes (owner-approved). `tour_name` stays blank for human review.
- `seatgeek-discovery-proposal.yml` (dispatch) — proposal-only SeatGeek event-URL discovery.
- `seatgeek-price-snapshots.yml` (every 4 h) — writes approved SeatGeek price snapshots to D1; stale or unverified rows remain hidden.
- `vividseats-price-snapshots.yml` (every 4 h) — writes approved Vivid Seats feed snapshots to D1 when its approved-feed and Cloudflare secrets are configured; missing secrets no-op safely.
- `vividseats-cta-sync.yml` (05:30 UTC, cron enabled 2026-07-12 owner-directed) — verified event-level Vivid Seats link/provenance sync; auto-merges after its in-run validation suite, mirroring `seatgeek-cta-sync.yml`.
- `prelaunch-validation.yml` (PRs) — validation suite incl. the `stale-sync-guard` that fails PRs whose `public/index.html` fallback is out of sync with `public/data/*.json`.
- `tm-data-refresh-pr.yml` (dispatch) — manual PR-based refresh of existing events.

---

## Validation

Run the relevant subset before every commit (full command list in [CONTRIBUTING.md](CONTRIBUTING.md)):

```bash
npm run test:mvp                                  # combined suite: events self-test,
                                                  # provider validators, smoke tests
python3 scripts/validate-events.py --for-production
node scripts/validate-guide-routes.mjs            # if guides/routes touched
npm run artist:check -- <slug>                    # if a specific artist touched
npm run events:sync                               # required after any public/data/*.json edit
node --check public/app.js 'functions/[[path]].js' functions/api/out.js
git diff --check
```

Report results honestly: "checks passed" or the actual failures. Do not skip validation before summarising.

## Protected Areas

Do not modify without explicit task scope:

- **`functions/api/out.js`** — verified outbound redirect logic; contains `VERIFIED_TICKET_LINKS`
- **`functions/_middleware.js`** — entry point for all requests; a bug here breaks all HTML routes
- **`functions/[[path]].js`** — all HTML routing; changes affect every public page
- **`functions/_route-metadata.js`** — single source of truth for page metadata
- **`public/data/events.json`, `artists.json`, `catalog.json`** — no records added, modified, or removed without a verified source
- **`public/_routes.json`** — incorrect changes cause site-wide failures
- **Impact credentials and affiliate tracking logic** (including `functions/api/impact/`)
- **Cloudflare dashboard settings** (routes, bindings, secrets)

Note the named-shim trap: editing `functions/artists.js` etc. has **no effect** while `_middleware.js` is active — edit `[[path]].js` instead.

## Working Style

- **Read only files relevant to the task.** Do not scan or rewrite the whole repo.
- **Make small, isolated changes.** One task = one or a few related commits. One PR per artist for Promote/Events phases.
- **Use plan mode / confirm scope first** for multi-step work, routing changes, schema changes, or anything touching protected files.
- **Validate before committing**, then summarise: which files changed, what changed, which checks passed, what was not touched.
- **Never invent data** — tours, dates, venues, prices, availability, providers, URLs. If a task seems to require inventing data or touching a protected file out of scope, stop and ask.
- **Do not create new governance/status docs** unless explicitly asked; update the canonical ones (`docs/DOCS_MAINTENANCE.md` maps which file owns what).
- Artist onboarding, provider changes, and event data changes follow their dedicated gated workflows — see the doc map below.

## Live State & Priorities

- **`PROJECT_STATUS.md`** — current data counts, per-artist states, bindings, and **Active risks**. Authoritative for "what is true right now". If it disagrees with the repo, the repo wins — fix the doc.
- **`BACKLOG.md`** — prioritised active work and the parked list. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities.

## Key Documentation

Read in order: **`CLAUDE.md`** (this file) → **`PROJECT_STATUS.md`** → **`BACKLOG.md`**.

Reference: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) · [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) · [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) · [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md) · [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md) · [docs/ADDING_PROVIDERS.md](docs/ADDING_PROVIDERS.md) · [docs/PROVIDER_SYNC.md](docs/PROVIDER_SYNC.md) · [docs/SEATGEEK_DISCOVERY.md](docs/SEATGEEK_DISCOVERY.md) · [docs/DOCS_MAINTENANCE.md](docs/DOCS_MAINTENANCE.md)

Not authoritative: `HANDOVER.md`, `AGENTS.md` (superseded pointer stubs) and everything in `docs/archive/` (historical, indexed in [docs/archive/INDEX.md](docs/archive/INDEX.md)). Do not act on archived findings without re-verifying against `PROJECT_STATUS.md` and `BACKLOG.md`.
