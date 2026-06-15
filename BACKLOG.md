# TourTicketCompare Backlog

Last updated: 2026-06-12 (Ed Sheeran resolution: owner confirmed tour name "The Loop Tour" and spot-checked the long-form storefront URLs; 24/27 events restored to `machine_high_confidence`, 3 short-form URLs stay suppressed. Issue #172 closed. New drift recorded: 10 summer-walker events live with blank `tour_name`, 12 shakira events `needs_recheck` — see `PROJECT_STATUS.md`.)

Previous update: 2026-06-11 (documentation cleanup: factual drift corrections only — priorities unchanged and owner-managed. Data drift note: between 2026-06-03 and 2026-06-11 the repo gained 5 artists — shakira, raye, charli-xcx, tate-mcrae, summer-walker — plus an ed-sheeran promotion and 57 events. **Owner review requested** on the corrections marked "[2026-06-11 correction]" below.)

Previous update: 2026-06-10 (unparked new-artist onboarding and public Vivid Seats CTAs per owner direction; verification gates unchanged)

## Active priorities (in order)

### 1. Summer Walker verified `tour_name` (new occurrence of the #172 gap)

Issue #172 itself is **closed** (2026-06-12): the original scope (Olivia Rodrigo, Bruno Mars, Shakira) plus the ed-sheeran occurrence ("The Loop Tour", owner-confirmed 2026-06-12) are all populated. The remaining gap is **10 summer-walker events** — `machine_high_confidence` with CTAs live but blank `tour_name`, so the validator's blank-`tour_name` warning fires. Populating requires the owner to verify the official tour name (URL slugs are evidence, not proof). File or reuse an issue when picked up.

### 2. #174 Phase B — Data-refresh hardening (Phase A done)

Phase A is complete: the "How a data change reaches production" flow is documented in `docs/DEPLOYMENT.md` (server load via `env.ASSETS`, client load via `public/app.js`, the inlined fallback written by `scripts/sync-events-data.py`, the `public/_headers` CDN TTLs, and why `npm run events:sync` + the `stale-sync-guard` job are required). Remaining open scope is Phase B (build-time cache-bust or a stronger pre-commit hook) — only adopt if it fits the Cloudflare Pages build cleanly; do not ship a brittle cache-bust.

### 3. #176 — Stale-file audit (audit only, no deletions)

Produce evidence (grep, npm script references, workflow references, dashboard touchpoints) for each candidate:

- `vercel.json`
- `api/` (Vercel-style handlers)
- `scripts/build-standalone-worker.mjs`
- `archive/vercel-experimental/`
- Inactive route shims: `functions/{artists,guides,how-it-works,affiliate-disclosure,editorial-policy,contact}.js`

Classify each as safe-to-delete / archive-or-deprecate / keep. The evidence-backed classification is in `docs/STALE_FILE_AUDIT.md` (audit complete — no deletions). A follow-up PR may delete candidates #1–#3 (Vercel pair + standalone Worker builder + its `_route-metadata.js` comment) after a human confirms no Cloudflare/Vercel dashboard dependency.

### 4. #10 — Production raw HTML verification (only if still needed)

Local proof of correct server-injected title, canonical, H1, body, and 404+noindex behaviour passed on 17 representative routes (2026-05-19). PR #184 added guide route / content / sitemap drift validation that runs on every PR. Treat this as non-blocking unless a fresh production browser check finds a real mismatch; if it does, scope the fix narrowly. The remaining deliverable is a human-run production verification checklist (`curl` each route for H1/title/canonical) — see the checklist in the #10 issue comment.

### 5. SeatGeek event-level CTA coverage closeout (tooling operational)

The event-level SeatGeek discovery tooling is now operational and wired in:
`scripts/propose-seatgeek-urls.mjs` (proposal-only) and
`scripts/enrich-seatgeek-events.mjs` (`--apply-high-confidence`), exposed as
`npm run seatgeek:propose` / `seatgeek:enrich` / `seatgeek:enrich:apply` /
`seatgeek:self-test`, plus the `SeatGeek Discovery Proposal` dispatch workflow.
Runbook: `docs/SEATGEEK_DISCOVERY.md`.

Coverage as of 2026-06-12: **226/339 events** carry a stored `seatgeek_url`;
113 do not (`bad-bunny` and `summer-walker` have none; `ariana-grande`,
`morgan-wallen`, `olivia-rodrigo`, `bruno-mars`, `shakira` are partial). Closing the rest requires a **credentialed
run**: provide `SEATGEEK_CLIENT_ID` (+ optional `SEATGEEK_CLIENT_SECRET`),
dispatch the proposal workflow or run `npm run seatgeek:propose`, review the
candidates, then run `npm run seatgeek:enrich:apply`, `npm run events:sync`, the
validators, and open a PR. Absence of a SeatGeek match for a show is acceptable —
the Ticketmaster CTA still renders. Event-level only; do not invent URLs.

### 6. Provider-sync rollout (foundation landed; sequence below)

Goal: provider-based event recognition and CTA automation, gated end-to-end by
human verification. Spec: `docs/PROVIDER_SYNC.md`. Foundation in place:
`data/provider-identities.json` (registry, all IDs null / sync disabled),
`scripts/validate-provider-identities.mjs` (`npm run providers:identities:validate`),
and the offline dry-run scaffold `scripts/sync-ticketmaster-events.py`.

Implementation sequence (one PR each, in order):

1. **Foundation** — registry + validator + offline dry-run scaffold. ✅ Done (PR #243).
2. **Ticketmaster dry-run sync** — live TM Discovery API by verified attraction ID for `sync_enabled` artists; report-only; withholds risky rows; no writes. ✅ Done — `python3 scripts/sync-ticketmaster-events.py --artist raye --dry-run` (+ `--json`, `npm run providers:sync:tm:self-test`); fails safely without `TICKETMASTER_API_KEY`. Review the RAYE dry-run report before designing step 3.
3. **Ticketmaster write-to-PR mode** — ✅ Done — `scripts/sync-tm-events-write-pr.mjs` (`npm run providers:sync:tm:write-pr`). Explicit `--write-pr` gate (defaults to a no-write preview); PROPOSED recogniser rows are applied through `apply-artists.mjs` (the canonical events writer + validate-with-rollback) and land on a branch + PR with the `automation:tm-events` label. Withheld rows → `withheld-review.md`, never the data files. Never commits to `main`; never auto-merges; `tour_name` left blank for human verification. Offline self-test: `npm run providers:sync:tm:write-pr:self-test`. See `docs/PROVIDER_SYNC.md`.
4. **SeatGeek enrichment dry-run** — ✅ Done — `scripts/propose-seatgeek-urls.mjs` (`npm run seatgeek:propose`) now consumes the registry's `seatgeek_performer_id`: a verified id scopes the SeatGeek query by `performers.id` and confirms candidate identity by id (without relaxing the date/city/URL gates). Proposal-only/dry-run, event-level URLs only, no prices, no artist-level links. Inert until a human populates a performer id (all `null` today). Self-test: `npm run seatgeek:self-test`. See `docs/SEATGEEK_DISCOVERY.md` and `docs/PROVIDER_SYNC.md`.
5. **CTA generation from provider status** — ✅ Done — `scripts/validate-cta-provider-state.mjs` (`npm run validate:cta-provider-state`, wired into `test:mvp`). Read-only guard asserting CTA eligibility derives from verified provider state: every artist Ticketmaster CTA is backed by a `review_status: "verified"` registry identity with a populated attraction id; no `withheld` identity publishes; every publishable event resolves through `/api/out` (https + allowlisted host + event id in URL); every `machine_high_confidence` row meets its canonical long-form contract. `VERIFIED_TICKET_LINKS`, `/api/out`, and the runtime gates are unchanged. Self-test: `npm run validate:cta-provider-state:self-test`. See `docs/PROVIDER_SYNC.md`.

**Provider-sync sequence (steps 1–5) is complete.** All write paths remain human-gated/PR-based and the runtime CTA gates are unchanged. Remaining provider-sync work is operational, not code: a human populating registry IDs (TM attraction ids are done; `seatgeek_performer_id` are all `null`) and running the gated write/enrich tools per `docs/PROVIDER_SYNC.md`.

Populating registry IDs is a human verification task (one-time per artist) —
see `docs/PROVIDER_SYNC.md` → "The provider identity registry".

## Recently completed

These issues are **closed** on GitHub and are kept here only as a short audit trail. They must not be presented as active work.

- **#171 — Olivia Rodrigo verified ticket links (closed 2026-05-27, PR #190).** `olivia-rodrigo:ticketmaster` is in `VERIFIED_TICKET_LINKS`; `artists.json` carries `verified_providers: ["ticketmaster"]`; `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` returns 302 (smoke-asserted). **Residual human task (not a coding item):** 8 short-form events remain flagged `verification_status: "needs_recheck"` with CTAs suppressed until a human confirms each URL in a browser — tracked in `PROJECT_STATUS.md` → Active risks.
- **#175 — Artist onboarding runbook + validator (closed 2026-06-01, PR #188).** `scripts/validate-artist.mjs` (`npm run artist:check -- <slug>`) checks `artists.json`, `catalog.json`, `events.json`/partitions, `VERIFIED_TICKET_LINKS` (out.js), and the shows.js affiliate map (since 2026-06-11 derived from out.js at runtime; the signup allowlist is likewise derived from artists.json — neither file is hand-edited per artist). `docs/ADDING_ARTISTS.md` + `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` are the canonical onboarding docs.

## Explicitly parked

These are intentionally not work until separately scoped and approved.

- **Tour / city / venue / event landing pages.** No verified data, no canonical/indexing strategy.
- **Live price aggregation; "cheapest ticket" / "guaranteed availability" claims.** Requires approved provider feeds with explicit usage rights.
- **Artist-level SeatGeek links and any SeatGeek price display.** (SeatGeek itself is live in production, event-level only: CTAs render where a verified `seatgeek_url` exists, routed through `/api/out` with Impact tracking. Coverage exists in `scripts/smoke-prelaunch.mjs`. Event-level URL discovery tooling is operational — see active item 5 and `docs/SEATGEEK_DISCOVERY.md`.)
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.
- **Deleting Vercel / standalone Worker / archive artefacts.** Waits on #176 audit.
- **Broad refactors of `scripts/smoke-prelaunch.mjs`** or other validation scripts.
- **Internal Impact Publisher Tag diagnostic route and `functions/api/debug-seatgeek.js`** — leave intact.

## Recently unparked (2026-06-10, owner direction)

These are no longer blocked, but every standard publishing gate still applies — unparking removes the scope freeze, not the verification rules:

- **New artist onboarding.** Follow `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` and `docs/ADDING_ARTISTS.md` end-to-end: `review_required` shell first, human browser verification before promotion or any `VERIFIED_TICKET_LINKS` entry, `npm run artist:check -- <slug>` before PR. Never auto-publish.
- **Public Vivid Seats CTAs.** May now be scoped. CTAs render only once a verified `vividseats.com` destination URL exists and is added to `/api/out` per `docs/PROVIDER_DATA_POLICY.md` → Vivid Seats. No verified destinations exist yet — do not invent URLs; until one is verified, Vivid Seats buttons stay hidden.

## How to update this file

Refresh whenever issues open, close, or change priority. Each active item should map 1:1 to a GitHub issue. Parked items should be removed only when their underlying constraint is resolved (e.g. approved provider feed exists).
