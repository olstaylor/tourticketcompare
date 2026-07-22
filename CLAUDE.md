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

## Affiliate & Provider Model

- **Ticketmaster is a plain, unmonetized verification/link source.** Never re-add Impact wrapping, the Publisher Tag, or `evyy.net` shortlinks for Ticketmaster.
- **SeatGeek is the primary affiliate CTA** at artist and event level. Artist destinations are API-captured performer pages backed by registry-verified performer IDs; event links require reviewed event data and provider provenance.
- **Other approved affiliate event lanes** include Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International. Each has independent allowlists, provenance, public/price flags, and fail-closed tracking. StubHub International does not imply approval for StubHub US/Canada.
- **Price display is cache-only and provider-specific.** Every lane requires explicit rights, an approved source, exact-event mapping, a matching verified URL, enabled flags, timestamps, and freshness. A comparison is a provider-supplied listed-price snapshot—not inventory or a final checkout total. See `docs/PROVIDER_DATA_POLICY.md`; current activation and counts live only in `PROJECT_STATUS.md`.

## Critical Product Rules

See [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) for the full non-negotiable list. In brief: never invent data, never scrape, never show fake CTAs or price comparisons, never expose credentials client-side, and never modify `/api/out` or affiliate logic without explicit scope. Every provider comparison remains gated by rights, exact-event matching, approved source, timestamps, and freshness.

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
    fallback-catalog.json Client-side fallback if catalog.json fails to load
    provider-configs.json Per-provider display/cache/safety configuration
    guides-content.json   Guide page content (topic guides)
    events.json           Reviewed event records (Ticketmaster-sourced)
    events/               Per-artist partitioned event files (generated)
    events-index.json     Generated index over the partitions

functions/                Cloudflare Pages Functions (server-side routing + APIs)
  _middleware.js          Entry point; delegates API/static paths to context.next(),
                          sends all HTML routes to [[path]].js
  [[path]].js             HTML routing: titles, meta, schemas, redirects, 404s
  _route-metadata.js      Single source of truth for page metadata and guide routes —
                          edit here, not in [[path]].js
  _impact-marketplace-config.js  Shared config for the TicketNetwork / Ticket Liquidator /
                          StubHub International lanes
  [named-shims].js        artists.js, guides.js, etc. Re-export from [[path]].js;
                          inactive while _middleware.js exists (kept as documented fallback)
  sitemap.xml.js, llms.txt.js  Generated sitemap and /llms.txt
  api/
    out.js                Verified outbound redirect (Ticketmaster plain; approved
                          affiliates Impact-wrapped). Contains VERIFIED_TICKET_LINKS. Protected.
    health.js             Runtime config status (no secrets exposed)
    shows.js              Event metadata by artistSlug
    analytics.js          D1-backed event analytics
    signup.js             Email demand capture to D1
    debug-seatgeek.js     Internal diagnostic (kept deliberately)
    impact/               Impact API diagnostics (health, catalogs, products, tracking-links)
  _provider-registry.js + api/_providers/  Parked scaffolding — do not build on
                          without a scoped provider integration (see BACKLOG.md)

data/
  provider-identities.json  Verified provider identity registry (TM attraction ids,
                            SeatGeek performer ids) — human-verified entries only

scripts/                  Validation, discovery, and automation tooling (see CONTRIBUTING.md
                          and docs/DEPLOYMENT.md for the command map)
migrations/               D1 migrations (see migrations/README.md for applied state)
reports/provider-sync/     Generated latest-run provider audit reports
reports/status-history/    Dated frozen narratives moved out of PROJECT_STATUS.md
                          (see docs/DOCS_MAINTENANCE.md)
docs/                     Stable reference policies and runbooks
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

All HTML route handling lives in `functions/[[path]].js`, including the comparison hub, trust pages, guides, and dynamic artist routes; page metadata lives in `functions/_route-metadata.js`. Unknown routes return 404 with noindex — no auto-generated pages. Full detail: `docs/ARCHITECTURE.md`.

### Bindings (Cloudflare dashboard)

- `DEMAND_DB` (D1) — active; the only binding declared in `wrangler.toml`.
- `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` — network-level Impact fallback (server-side only).
- `IMPACT_SEATGEEK_*` / `IMPACT_VIVIDSEATS_*` — provider-specific Impact credentials for their approved lanes.
- `IMPACT_TICKETNETWORK_*`, `IMPACT_TICKETLIQUIDATOR_*`, `IMPACT_STUBHUB_INTERNATIONAL_*` — optional provider-specific overrides; any approved fallback and campaign/catalog IDs are server-side configuration.
- Provider `*_PUBLIC_ENABLED` and `*_PRICE_DISPLAY_ENABLED` flags — independent kill switches. A flag never substitutes for provider rights, exact-event provenance, approved source, URL validation, or freshness.
- Confirm current activation through `/api/health`, fail-closed redirect tests, workflow YAML, and `PROJECT_STATUS.md`; do not infer it from secret names in the repository.

- `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` — controlled discovery/snapshot tooling only, not `/api/out`.
- `TICKETMASTER_API_KEY` — Pages runtime secret (configured 2026-07-15) used only by the opt-in live artist-discovery path in `/api/shows`; normal traffic reads the persisted catalogue, and live discovery additionally requires `TICKETMASTER_LIVE_ARTIST_DISCOVERY_ENABLED` (default off). The same key powers the scheduled GitHub Actions discovery/audit workflows.
- The old `IMPACT_TICKETMASTER_*` secrets are unused — delete them from the dashboard if still present (owner task, tracked in `BACKLOG.md`).

Impact credentials are never exposed client-side; they are used only by server functions and controlled provider-sync/snapshot tooling.

### Automation (scheduled GitHub Actions)

Operational detail in `docs/DEPLOYMENT.md`; current run state in `PROJECT_STATUS.md`.

- `daily-audit.yml` (03:00 UTC) — URL liveness + Ticketmaster Discovery diff into a rolling issue; verification-date-bump PRs.
- `nightly-data-sync.yml` (03:30 UTC) — lossless factual refresh (date/time, venue, `event_name`, canonical TM URL) auto-committed to `main` per event; anything needing judgement goes to the rolling issue.
- `tm-new-shows-pr.yml` (04:00 UTC) — new-show discovery PR; auto-merges once its in-run validation suite passes (owner-approved). `tour_name` stays blank for human review.
- `seatgeek-discovery-proposal.yml` (dispatch) — proposal-only SeatGeek event-URL discovery.
- `seatgeek-cta-sync.yml` (scheduled + dispatch) — high-confidence SeatGeek event-link enrichment and identity-anchored provenance verification under the sanctioned auto-merge gates.
- `vividseats-cta-sync.yml` (scheduled + dispatch) — catalog-backed Vivid Seats event-link/provenance sync under the sanctioned auto-merge gates.
- `seatgeek-price-snapshots.yml` / `vividseats-price-snapshots.yml` — approved exact-event D1 snapshot writers; stale or unverified rows remain hidden.
- `impact-marketplace-provider-sync.yml` (scheduled nightly since PR #480 — TicketNetwork 06:00, Ticket Liquidator 06:30, StubHub International 07:00 UTC, serialized) — scheduled runs apply unambiguous exact-event links and auto-merge after the in-job validation suite; manual dispatch is preview-first, and a manual apply opens a review PR that never auto-merges.
- `impact-marketplace-price-snapshots.yml` — scheduled exact-ID D1 snapshots for approved numeric-price lanes, plus dispatch/bootstrap; non-numeric lanes remain manual/display-disabled.
- `bootstrap-provider-pricing-schema.yml` (manual only) — idempotent cache/history schema bootstrap tracked by `migrations/README.md`.

- `prelaunch-validation.yml` (PRs) — validation suite incl. the `stale-sync-guard` that fails PRs whose `public/index.html` fallback is out of sync with `public/data/*.json`.
- `tm-data-refresh-pr.yml` (dispatch) — manual PR-based refresh of existing events.

---

## Validation

Run the relevant subset before every commit (full command list in [CONTRIBUTING.md](CONTRIBUTING.md)):

```bash
npm run docs:check                                # links, command references, doc lifecycle
npm run test:mvp                                  # docs + events/provider validators + smoke
python3 scripts/validate-events.py --for-production
node scripts/validate-guide-routes.mjs            # if guides/routes touched
npm run artist:check -- <slug>                    # if a specific artist touched
npm run impact-providers:sync:self-test            # shared Impact catalog matcher
npm run impact-providers:prices:self-test          # exact-ID snapshot writer
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

`AGENTS.md` is the concise repository-discovery entrypoint. Do not add parallel handover, archive, status, or governance documents; update the canonical file and use git history for superseded material.
