# TourTicketCompare Backlog

Last updated: 2026-06-03 (issue-status reconciliation; #171 and #175 moved to Recently completed)

## Active priorities (in order)

### 1. #172 sub-deliverable B — Populate verified `tour_name` for Olivia Rodrigo

Sub-deliverable A landed in PR #186 (the validator hard-errors on a missing `tour_name` key and warns on blank `tour_name` for indexed artists — already live in `scripts/validate-events.py`; no further validator work needed). The populate pass is blocked on per-event human verification from an official source. URL slugs (e.g. `olivia-rodrigo-the-unraveled-tour-…`) are evidence, not proof — confirm from the event page itself before populating. Leave events blank or `needs_recheck` rather than bulk-filling from URL evidence alone. A blank/missing-`tour_name` audit across all 10 records (`docs/TOUR_NAME_AUDIT.md`) supports the human review.

### 2. #174 Phase B — Data-refresh hardening (Phase A done)

Phase A is complete: the "How a data change reaches production" flow is documented in `docs/DEPLOYMENT.md` (server load via `env.ASSETS`, client load via `public/app.js`, the inlined fallback written by `scripts/sync-events-data.py`, the `public/_headers` CDN TTLs, and why `npm run events:sync` + the `stale-sync-guard` job are required). Remaining open scope is Phase B (build-time cache-bust or a stronger pre-commit hook) — only adopt if it fits the Cloudflare Pages build cleanly; do not ship a brittle cache-bust.

### 3. #176 — Stale-file audit (audit only, no deletions)

Produce evidence (grep, npm script references, workflow references, dashboard touchpoints) for each candidate:

- `vercel.json`
- `api/` (Vercel-style handlers)
- `scripts/build-standalone-worker.mjs`
- `archive/vercel-experimental/`
- Inactive route shims: `functions/{artists,guides,how-it-works,affiliate-disclosure,editorial-policy,contact}.js`

Classify each as safe-to-delete / archive-or-deprecate / keep. Output a deletion-diff proposal as a PR description or short report under `docs/`. Do not delete in this pass.

### 4. #10 — Production raw HTML verification (only if still needed)

Local proof of correct server-injected title, canonical, H1, body, and 404+noindex behaviour passed on 17 representative routes (2026-05-19). PR #184 added guide route / content / sitemap drift validation that runs on every PR. Treat this as non-blocking unless a fresh production browser check finds a real mismatch; if it does, scope the fix narrowly. The remaining deliverable is a human-run production verification checklist (`curl` each route for H1/title/canonical) — see the checklist in the #10 issue comment.

### 5. SeatGeek event-level CTA coverage closeout (tooling operational)

The event-level SeatGeek discovery tooling is now operational and wired in:
`scripts/propose-seatgeek-urls.mjs` (proposal-only) and
`scripts/enrich-seatgeek-events.mjs` (`--apply-high-confidence`), exposed as
`npm run seatgeek:propose` / `seatgeek:enrich` / `seatgeek:enrich:apply` /
`seatgeek:self-test`, plus the `SeatGeek Discovery Proposal` dispatch workflow.
Runbook: `docs/SEATGEEK_DISCOVERY.md`.

Coverage gap as of 2026-06-01: 93/272 events carry a verified `seatgeek_url`; 179
do not (`bad-bunny`, `bruno-mars`, `olivia-rodrigo` have none; `ariana-grande`,
`jay-z`, `morgan-wallen` are partial). Closing it requires a **credentialed
run**: provide `SEATGEEK_CLIENT_ID` (+ optional `SEATGEEK_CLIENT_SECRET`),
dispatch the proposal workflow or run `npm run seatgeek:propose`, review the
candidates, then run `npm run seatgeek:enrich:apply`, `npm run events:sync`, the
validators, and open a PR. Absence of a SeatGeek match for a show is acceptable —
the Ticketmaster CTA still renders. Event-level only; do not invent URLs.

## Recently completed

These issues are **closed** on GitHub and are kept here only as a short audit trail. They must not be presented as active work.

- **#171 — Olivia Rodrigo verified ticket links (closed 2026-05-27, PR #190).** `olivia-rodrigo:ticketmaster` is in `VERIFIED_TICKET_LINKS`; `artists.json` carries `verified_providers: ["ticketmaster"]`; `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` returns 302 (smoke-asserted). **Residual human task (not a coding item):** 8 short-form events remain flagged `verification_status: "needs_recheck"` with CTAs suppressed until a human confirms each URL in a browser — tracked in `PROJECT_STATUS.md` → Active risks.
- **#175 — Artist onboarding runbook + validator (closed 2026-06-01, PR #188).** `scripts/validate-artist.mjs` (`npm run artist:check -- <slug>`) checks `artists.json`, `catalog.json`, `events.json`/partitions, `VERIFIED_TICKET_LINKS` (out.js), `TICKETMASTER_ARTIST_AFFILIATE_LINKS` (shows.js), and `ARTIST_SLUGS` (signup.js). `docs/ADDING_ARTISTS.md` + `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` are the canonical onboarding docs.

## Explicitly parked

These are intentionally not work until separately scoped and approved.

- **Any new artist except the Ed Sheeran Phase 2 Shell-only scaling test.** Do not propose or onboard other artists as part of any other task. The Ed Sheeran exception is limited to a `review_required` shell: it does not authorize Promote, Events, `/api/out`, `functions/api/shows.js`, provider/affiliate changes, public CTAs, or event data.
- **Tour / city / venue / event landing pages.** No verified data, no canonical/indexing strategy.
- **Live price aggregation; "cheapest ticket" / "guaranteed availability" claims.** Requires approved provider feeds with explicit usage rights.
- **Public Vivid Seats CTAs.** Vivid Seats has no verified destinations. (SeatGeek is no longer parked — it is configured and live in production: event-level CTAs render where a verified `seatgeek_url` exists, routed through `/api/out` with Impact tracking. Coverage exists in `scripts/smoke-prelaunch.mjs`. Event-level URL discovery tooling is now operational — see active item 5 and `docs/SEATGEEK_DISCOVERY.md`. Still parked for SeatGeek: artist-level SeatGeek links and any SeatGeek price display.)
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.
- **Deleting Vercel / standalone Worker / archive artefacts.** Waits on #176 audit.
- **Broad refactors of `scripts/smoke-prelaunch.mjs`** or other validation scripts.
- **Internal Impact Publisher Tag diagnostic route and `functions/api/debug-seatgeek.js`** — leave intact.

## How to update this file

Refresh whenever issues open, close, or change priority. Each active item should map 1:1 to a GitHub issue. Parked items should be removed only when their underlying constraint is resolved (e.g. approved provider feed exists).
