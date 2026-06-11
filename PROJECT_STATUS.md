# TourTicketCompare Project Status

Last updated: 2026-06-11 (documentation cleanup: counts and per-artist table refreshed by direct inspection of `public/data/`, `functions/api/out.js`, and `public/data/events.json`; previous snapshot was dated 2026-06-03/10 and had drifted)

This file is the current-state snapshot. Use `BACKLOG.md` for prioritised work and `CLAUDE.md` for protected areas, hard product rules, and validation. `docs/DOCS_MAINTENANCE.md` explains which files are canonical and how to keep this one fresh. Everything in `docs/archive/` is historical and should not be treated as current guidance unless referenced from here or `BACKLOG.md`.

## Runtime and architecture

- Production runtime: **Cloudflare Pages Functions**. Confirmed live via `/api/health` reporting `runtime: "cloudflare-pages-functions"`.
- Source of truth: GitHub `main`. Merges to `main` auto-deploy via Cloudflare Pages Git integration.
- HTML entry: `functions/_middleware.js` delegates non-asset, non-API requests to `functions/[[path]].js`.
- Page metadata source of truth: `functions/_route-metadata.js`.
- Named route shims (`functions/artists.js`, etc.) are fallback-only while middleware is active.
- D1 bindings: `DEMAND_DB` only. (No `RATE_LIMIT_DB`, no `CLICKS_DB`.)
- Impact bindings: `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID` (server-side only). SeatGeek Impact bindings are also present in production (`IMPACT_SEATGEEK_ACCOUNT_SID`, `IMPACT_SEATGEEK_AUTH_TOKEN`, `IMPACT_SEATGEEK_PROGRAM_ID`), plus SeatGeek API credentials `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` (held for discovery tooling; not used by `/api/out`). All confirmed via `/api/health`. `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false`.
- Affiliate model (PR #180 clarification): the site-wide Impact Publisher Tag in `public/impact.js` transforms plain `ticketmaster.com` anchors at load time; a pre-minted `ticketmaster.evyy.net/<code>` shortlink is **not** required. Both URL shapes pass `validateConfiguredRedirect` in `functions/api/out.js`.

## Current data

Verified by direct inspection of `public/data/` and `functions/api/out.js` on 2026-06-11:

- `public/data/artists.json`: **15 records — all `indexable_with_substantial_content`**. (The previous `review_required` shell, `ed-sheeran`, was promoted; `shakira`, `raye`, `charli-xcx`, `tate-mcrae`, and `summer-walker` were added with `last_verified_at` of 2026-06-10/11.)
- `public/data/catalog.json`: 15 artist records; 0 tour records.
- `public/data/events.json`: **329 events**; **226 carry stored SeatGeek event URLs**.
- `public/data/events/<artist>.json`: per-artist partitions used at runtime.
- `public/data/guides-content.json`: **15 guide content entries**.
- `functions/_route-metadata.js`: **15 guide routes** plus trust/static route metadata.
- `functions/api/out.js` `VERIFIED_TICKET_LINKS`: **15 entries**, one `<slug>:ticketmaster` per artist. No SeatGeek or Vivid Seats artist-level entries.

### Per-artist status

All 15 artists are `indexable_with_substantial_content` with `verified_providers: ["ticketmaster"]` and a `<slug>:ticketmaster` entry in `VERIFIED_TICKET_LINKS`. Event counts from `events.json`:

| Slug | `last_verified_at` | Events | With `seatgeek_url` | `needs_recheck` | Tour name | Notes |
|---|---|---|---|---|---|---|
| beyonce | 2026-04-30 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| harry-styles | 2026-04-30 | 30 | 30 | 0 | Together, Together | — |
| bts | 2026-04-30 | 17 | 17 | 0 | BTS WORLD TOUR 'ARIRANG' | — |
| ariana-grande | 2026-04-30 | 38 | 28 | 0 | The Eternal Sunshine Tour | — |
| bad-bunny | 2026-04-30 | 24 | 0 | 0 | DeBÍ TiRAR MáS FOToS World Tour | No SeatGeek URLs yet. |
| morgan-wallen | 2026-04-30 | 18 | 16 | 0 | Still the Problem Tour | — |
| jay-z | 2026-04-30 | 3 | 3 | 0 | JAY-Z Yankee Stadium 2026 | — |
| olivia-rodrigo | 2026-05-27 | 86 | 59 | **8** | The Unraveled Tour | 8 short-form event URLs human-checked 2026-06-10: all 404 in a browser; they remain `needs_recheck` with `ticketmaster_url` cleared and event CTAs suppressed. |
| bruno-mars | 2026-05-28 | 56 | 30 | 0 | The Romantic Tour | Four Mexico City events intentionally excluded (`ticketmaster.com.mx` not in the Ticketmaster host allowlist). |
| **ed-sheeran** | 2026-06-11 | 27 | 27 | **27** | **(blank)** | Promoted from `review_required` to indexable; in `VERIFIED_TICKET_LINKS`. **All 27 events are `verification_status: "needs_recheck"` with blank `tour_name` and cleared `ticketmaster_url`** — event-level CTAs (Ticketmaster *and* SeatGeek) are suppressed; see Active risks. |
| shakira | 2026-06-10 | 30 | 16 | 0 | Las Mujeres Ya No Lloran | Tour title owner-confirmed from the Ticketmaster event page 2026-06-10. |
| raye | 2026-06-10 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| charli-xcx | 2026-06-11 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| tate-mcrae | 2026-06-10 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| summer-walker | 2026-06-11 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |

Note on `needs_recheck` rendering: `renderShowCardServerHtml` in `functions/[[path]].js` only renders event CTAs when a valid `ticketmaster_url` exists; the SeatGeek CTA renders only alongside it. Events with cleared Ticketmaster URLs therefore show "No verified ticket link is available for this date" — the safe state.

## Validation pipeline

Run before committing data, content, or rendering changes:

- `python3 scripts/validate-events.py --for-production` — event schema, hard error on missing `tour_name` key, warning on blank `tour_name` for indexed artists (PR #186).
- `node scripts/validate-guide-routes.mjs` — guide route / content / sitemap drift validation (PR #184).
- `node scripts/validate-artist-provider-claims.mjs` — artist metadata vs `VERIFIED_TICKET_LINKS` drift guard (PR #185).
- `npm run artist:check -- <slug>` — per-artist readiness validator: checks `artists.json`, `catalog.json`, `events.json`, partition files, `VERIFIED_TICKET_LINKS` in `out.js`, and the `shows.js` affiliate map (PR #188; since 2026-06-11 the shows.js map is derived from out.js and the signup allowlist from artists.json — neither is hand-edited per artist).
- `node scripts/smoke-prelaunch.mjs` — route/CTA/copy smoke checks.
- `npm run seatgeek:self-test` — SeatGeek discovery scoring/safety smoke test (no API calls). Run before changing the discovery tooling.
- `npm run providers:identities:validate` — provider identity registry validation (`data/provider-identities.json` vs `artists.json` and the out.js Ticketmaster host allowlist). Run whenever the registry changes. See `docs/PROVIDER_SYNC.md`.
- `node --check public/app.js`, `node --check 'functions/[[path]].js'`, `node --check functions/api/out.js` — syntax.
- `git diff --check` — whitespace and conflict markers.

`npm run test:mvp` runs the events self-test, artist-provider validator, and smoke suite together.

## Daily automation

`.github/workflows/daily-audit.yml` runs at 03:00 UTC and on `workflow_dispatch`. It performs:

1. URL liveness via `scripts/verify-outbound-links.mjs`.
2. Ticketmaster Discovery diff via `scripts/audit-tm-events.mjs` per event ID (requires `TICKETMASTER_API_KEY`; skipped safely if absent).
3. Reporting via `scripts/daily-audit-report.mjs` into a single rolling GitHub issue (`automation:daily-audit`).
4. Verification-date bumps via `scripts/bump-verified-dates.mjs`, opening a PR for human review. The TM-skip/failure guard added in PR #182 prevents date bumps when TM data is unavailable.

`.github/workflows/nightly-data-sync.yml` is currently **manual-only**: the historical 03:30 UTC cron is commented out and must not be re-enabled without clean manual-run evidence. Manual runs default to `dry_run: true`; a dry-run writes `.audit/tm-sync.json` as an uploaded artifact and cannot commit or push. A non-dry-run can **auto-commit to `main`** only for lossless factual updates (date/time, venue/city, refreshed canonical TM URL) to events that already exist in `events.json`, pulled per event id from the Ticketmaster Discovery API via `scripts/apply-tm-updates.mjs`, then regenerates the inline fallback and partitions. The commit is blocked by any review item, blocked update, error, missing report, dry-run input, validation failure, smoke-test failure, or absent `events.json` diff. Items that need human judgement — new shows, deletions (404/410), cancelled/postponed status, `tour_name` — are **never auto-applied**; they are surfaced in the rolling `automation:data-sync` issue via `scripts/report-tm-sync-review.mjs`. See `docs/DEPLOYMENT.md` → "Nightly data sync operational state" and `SAFE_PUBLISHING_RULES.md` → "Discovery, Enrichment, and Rendering" for the boundary. (`TICKETMASTER_API_KEY` is required for useful live checks; if absent, the run writes a skipped report and no-ops safely.)

`.github/workflows/prelaunch-validation.yml` includes a `stale-sync-guard` that runs `npm run events:sync` on PRs touching `public/data/*.json` and fails if `public/index.html` is stale.

## Active risks

These are the live risks. Detailed task scope and ordering live in `BACKLOG.md`.

- **Ed Sheeran: indexed artist with 27/27 events `needs_recheck` and blank `tour_name` — flagged for human review.** `ed-sheeran` was promoted to `indexable_with_substantial_content` (artists.json `last_verified_at: 2026-06-11`) and has a `VERIFIED_TICKET_LINKS` entry, but every one of its 27 events has `verification_status: "needs_recheck"`, a cleared `ticketmaster_url`, and a blank `tour_name` (each event does carry a `seatgeek_url`). Event-level CTAs are suppressed (safe state); the artist-level Ticketmaster CTA renders. A human should confirm this promoted-but-unverified-events state is intended, re-verify the event URLs in a browser, and populate `tour_name` from a verified source. The validator's blank-`tour_name` warning for indexed artists fires on these 27 events.
- **8 Olivia Rodrigo events remain CTA-suppressed (#171 sub-item) — human check done, URLs still broken.** Human browser check completed 2026-06-10: all 8 short-form `ticketmaster.com/event/<id>` URLs return 404, even though the Discovery API still resolves the same IDs to the correct Olivia Rodrigo shows (status `onsale`). The events stay `verification_status: "needs_recheck"` with URLs cleared and CTAs suppressed — this is the correct safe state. Re-check periodically for a working storefront URL; do not restore from the Discovery `url` field alone.
- **Blank `tour_name` (#172) — resolved for the original scope, reopened by ed-sheeran.** Olivia Rodrigo (86, "The Unraveled Tour"), Bruno Mars (56, "The Romantic Tour"), and Shakira (30, "Las Mujeres Ya No Lloran"; owner-confirmed 2026-06-10) are populated. The 27 ed-sheeran events are a new occurrence of the same gap (see the first risk). Populating requires human verification of the official tour name — URL slugs are evidence, not proof.
- **Data refresh documentation (#174).** `scripts/sync-events-data.py` inlines fallback data into `public/index.html`; the `stale-sync-guard` CI job catches stale commits on PRs. Phase A (documented data-refresh flow) is addressed in `docs/DEPLOYMENT.md`. Phase B (optional cache-bust scheme) remains parked.
- **Stale-file risk (#176).** Vercel artefacts (`api/`, `vercel.json`), legacy standalone Worker builder, inactive route shims, and `archive/vercel-experimental/` still live in the repo. Evidence-backed classification is in `docs/STALE_FILE_AUDIT.md`. Audit-first, deletions later — do not delete during other work.
- **Raw HTML production proof (#10).** Local proof passed (17 representative routes, 2026-05-19); production browser proof is still unconfirmed. PR #184's guide drift validation reduces the risk further. This is not a coding priority unless a fresh production check identifies a real mismatch.
- **Status-doc drift.** Between 2026-06-03 and 2026-06-11 the repo gained 5 artists and 57 events while this file still described the old state. When merging data PRs, refresh the counts here (see `docs/DOCS_MAINTENANCE.md` → update triggers).

## Product guardrails (summary)

The full rules are in `docs/CONTENT_RULES.md`, `docs/PROVIDER_DATA_POLICY.md`, and `CLAUDE.md`. Highlights:

- Never invent tours, dates, venues, prices, availability, providers, inventory, or ticket links.
- Never scrape ticket providers.
- Never claim live price comparison unless approved provider feeds support it.
- Never expose Impact or any other secret client-side.
- CTAs only when artist ∈ catalog, provider has a verified `redirectUrl`, and the URL passes `/api/out` validation.

## What is supported today

- Homepage and trust/legal pages.
- Artist index plus the 15 indexable artist pages above (5 of them — beyonce, raye, charli-xcx, tate-mcrae, summer-walker — currently have no event records and render artist-level CTAs only).
- 15 guide pages with server-rendered content.
- Verified Ticketmaster CTAs (artist- and event-level) where configured.
- Verified event-level SeatGeek CTAs — live in production where a verified `seatgeek_url` exists alongside a valid `ticketmaster_url`; routed through `/api/out` with Impact tracking (SeatGeek Impact bindings present). Currently 226/329 events carry a stored `seatgeek_url`. Event-level SeatGeek URL discovery tooling is operational and wired in (`npm run seatgeek:propose` / `seatgeek:enrich:apply`, `SeatGeek Discovery Proposal` workflow); see `BACKLOG.md` item 5 and `docs/SEATGEEK_DISCOVERY.md`.
- First-party analytics and signup writes through `DEMAND_DB`.
- Provider-sync **foundation** (registry, validator, offline dry-run scaffold, Ticketmaster dry-run sync — `docs/PROVIDER_SYNC.md`). No live provider sync writes yet. Rollout sequence in `BACKLOG.md` item 6.

## What is not supported

- Live multi-provider price aggregation; "cheapest" / "guaranteed availability" claims (including any SeatGeek price display).
- Tour, city, venue, or event landing pages.
- Public Vivid Seats CTAs — **not live** (unparked 2026-06-10 and may now be scoped, but no verified `vividseats.com` destinations exist yet; buttons stay hidden until one is verified and added to `/api/out`).
- Artist-level SeatGeek links (SeatGeek is event-level only).
- `Event` / `MusicEvent` schema on any page without verified event-level data.

## How to update this file

Refresh when any of the following change: artist count, indexing status, event count, guide count, bindings, validation pipeline, daily automation, or the set of active issues. Recount from the data files (`python3 -c` over `public/data/*.json`) rather than trusting prior text — this file drifted once already. Reference `BACKLOG.md` for prioritised work — do not duplicate the priority list here. See `docs/DOCS_MAINTENANCE.md` for the canonical-file map.
