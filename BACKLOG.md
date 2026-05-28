# TourTicketCompare Backlog

Last updated: 2026-05-27 (post PR #186)

## Active priorities (in order)

### 1. #171 — Close the Olivia Rodrigo trust gap

A human reviewer with browser access to Ticketmaster confirms the canonical Ticketmaster artist URL for Olivia Rodrigo and:

- Adds an `olivia-rodrigo:ticketmaster` entry to `VERIFIED_TICKET_LINKS` in `functions/api/out.js`.
- Restores `verified_providers: ["ticketmaster"]` and `verified_provider_count: 1` in `public/data/artists.json` only after the allowlist entry exists.
- Re-checks the 8 short-form events currently flagged `verification_status: "needs_recheck"` and either restores a verified URL or keeps them hidden.
- Adds a smoke assertion that `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` returns 302 (parallel to the existing Beyoncé check).

Do not invent URLs. Do not bulk-rewrite all 86 events. Do not modify `/api/out` redirect logic, Impact handling, or CTA generation — the change is a single-purpose allowlist addition plus the data fields above.

### 2. #174 Phase A — Document the data refresh pipeline in `docs/DEPLOYMENT.md`

Write a "How a data change reaches production" section covering:

- Server load path (`functions/[[path]].js` via `env.ASSETS`).
- Client load path (`public/app.js`).
- The inlined fallback that `scripts/sync-events-data.py` writes into `public/index.html`.
- The CDN caching headers in `public/_headers` (`/data/catalog.json` 30-min, `/data/events.json` 10-min).
- Why `npm run events:sync` is required after JSON edits, what the `stale-sync-guard` job catches, and what would break if the sync were removed.

Phase B (build-time cache-bust or stronger pre-commit hook) is a separate PR after Phase A is reviewed.

### 3. #175 — Artist onboarding runbook and validator

Two deliverables:

- Confirm `docs/ADDING_ARTISTS.md` is the canonical onboarding doc (it already uses the current `verified_providers` / `indexing_status` field schema). A later docs PR collapses the legacy root-level `ARTIST_PAGE_*.md` docs into stubs that point to it.
- Add `scripts/validate-artist.mjs` and `npm run artist:check -- <slug>` that asserts the slug is wired in `artists.json`, `catalog.json`, `events.json` / `events/<slug>.json`, `VERIFIED_TICKET_LINKS`, and the smoke fixture. The validator only checks what humans have already verified — it does not auto-generate pages, tour names, or links.

### 4. #172 sub-deliverable B — Populate verified `tour_name` for Olivia Rodrigo

Sub-deliverable A landed in PR #186 (validator warning surfaces 86 blank Olivia Rodrigo events without bulk-filling). The populate pass is blocked on per-event human verification from an official source. URL slugs (e.g. `olivia-rodrigo-the-unraveled-tour-…`) are evidence, not proof — confirm from the event page itself before populating. Leave events blank or `needs_recheck` rather than bulk-filling from URL evidence alone.

### 5. #176 — Stale-file audit (audit only, no deletions)

Produce evidence (grep, npm script references, workflow references, dashboard touchpoints) for each candidate:

- `vercel.json`
- `api/` (Vercel-style handlers)
- `scripts/build-standalone-worker.mjs`
- `archive/vercel-experimental/`
- Inactive route shims: `functions/{artists,guides,how-it-works,affiliate-disclosure,editorial-policy,contact}.js`

Classify each as safe-to-delete / archive-or-deprecate / keep. Output a deletion-diff proposal as a PR description or short report under `docs/`. Do not delete in this pass.

### 6. #10 — Production raw HTML verification (only if still needed)

Local proof of correct server-injected title, canonical, H1, body, and 404+noindex behaviour passed on 17 representative routes (2026-05-19). PR #184 added guide route / content / sitemap drift validation that runs on every PR. Treat this as non-blocking unless a fresh production browser check finds a real mismatch; if it does, scope the fix narrowly.

## Explicitly parked

These are intentionally not work until separately scoped and approved.

- **The Weeknd, or any new artist.** Do not propose or onboard a new artist as part of any other task.
- **Tour / city / venue / event landing pages.** No verified data, no canonical/indexing strategy.
- **Live price aggregation; "cheapest ticket" / "guaranteed availability" claims.** Requires approved provider feeds with explicit usage rights.
- **Public SeatGeek or Vivid Seats CTAs.** SeatGeek event URLs are stored but gated off until configuration is complete; Vivid Seats has no verified destinations.
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.
- **Deleting Vercel / standalone Worker / archive artefacts.** Waits on #176 audit.
- **Broad refactors of `scripts/smoke-prelaunch.mjs`** or other validation scripts.
- **Internal Impact Publisher Tag diagnostic route and `functions/api/debug-seatgeek.js`** — leave intact.

## How to update this file

Refresh whenever issues open, close, or change priority. Each active item should map 1:1 to a GitHub issue. Parked items should be removed only when their underlying constraint is resolved (e.g. approved provider feed exists).
