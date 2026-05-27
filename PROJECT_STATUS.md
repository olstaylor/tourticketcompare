# TourTicketCompare Project Status

Last updated: 2026-05-27 (post PR #186)

This file is the current-state snapshot. Use `BACKLOG.md` for prioritised work and `CLAUDE.md` for protected areas, hard product rules, and validation. Older audits (CLEANUP_AUDIT, AUDIT_PARKING_LOT, SEO_ARCHITECTURE_AUDIT, LIVE_PRODUCTION_VERIFICATION, etc.) are historical and should not be treated as current guidance unless referenced from here or `BACKLOG.md`.

## Runtime and architecture

- Production runtime: **Cloudflare Pages Functions**. Confirmed live via `/api/health` reporting `runtime: "cloudflare-pages-functions"`.
- Source of truth: GitHub `main`. Merges to `main` auto-deploy via Cloudflare Pages Git integration.
- HTML entry: `functions/_middleware.js` delegates non-asset, non-API requests to `functions/[[path]].js`.
- Page metadata source of truth: `functions/_route-metadata.js`.
- Named route shims (`functions/artists.js`, etc.) are fallback-only while middleware is active.
- D1 bindings: `DEMAND_DB` only. (No `RATE_LIMIT_DB`, no `CLICKS_DB`.)
- Impact bindings: `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID` (server-side only). `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false`.
- Affiliate model (PR #180 clarification): the site-wide Impact Publisher Tag in `public/impact.js` transforms plain `ticketmaster.com` anchors at load time; a pre-minted `ticketmaster.evyy.net/<code>` shortlink is **not** required. Both URL shapes pass `validateConfiguredRedirect` in `functions/api/out.js`.

## Current data

Verified by direct inspection of `public/data/` on 2026-05-27:

- `public/data/artists.json`: **9 artists**.
- `public/data/catalog.json`: 9 artists; 0 tour records.
- `public/data/events.json`: **272 events**; all carry Ticketmaster URLs; **93 carry stored SeatGeek event URLs**.
- `public/data/events/<artist>.json`: per-artist partitions used at runtime.
- `public/data/guides-content.json`: **15 guide content entries**.
- `functions/_route-metadata.js`: **15 guide routes** plus trust/static route metadata.

### Per-artist status

| Slug | `indexing_status` | `verified_providers` | `VERIFIED_TICKET_LINKS` entry | Notes |
|---|---|---|---|---|
| beyonce | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| harry-styles | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| bts | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| ariana-grande | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| bad-bunny | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| morgan-wallen | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| jay-z | indexable_with_substantial_content | `["ticketmaster"]` | yes | — |
| **olivia-rodrigo** | indexable_with_substantial_content | **`[]`** | **no** | Not artist-level verified (PR #185). 8 short-form event URLs marked `verification_status: "needs_recheck"` per PR #177; remaining 78 events use long-form URLs. All 86 events have blank `tour_name` (warning surfaced per PR #186). |
| **bruno-mars** | **`review_required`** | `[]` | no | 56 events excluded from the `tour_name` warning by design while `review_required`. Four Mexico City events intentionally excluded because `ticketmaster.com.mx` is not in the Ticketmaster host allowlist. |

Olivia Rodrigo is **not** currently a fully verified artist-level Ticketmaster provider. Restoring her artist-level verification is the highest-priority active task (issue #171); event-level CTAs continue to render only where a verified event URL exists.

## Validation pipeline

Run before committing data, content, or rendering changes:

- `python3 scripts/validate-events.py --for-production` — event schema, hard error on missing `tour_name` key, warning on blank `tour_name` for indexed artists (PR #186).
- `node scripts/validate-guide-routes.mjs` — guide route / content / sitemap drift validation (PR #184).
- `node scripts/validate-artist-provider-claims.mjs` — artist metadata vs `VERIFIED_TICKET_LINKS` drift guard (PR #185).
- `node scripts/smoke-prelaunch.mjs` — route/CTA/copy smoke checks.
- `node --check public/app.js`, `node --check 'functions/[[path]].js'`, `node --check functions/api/out.js` — syntax.
- `git diff --check` — whitespace and conflict markers.

`npm run test:mvp` runs the events self-test, artist-provider validator, and smoke suite together.

## Daily automation

`.github/workflows/daily-audit.yml` runs at 03:00 UTC and on `workflow_dispatch`. It performs:

1. URL liveness via `scripts/verify-outbound-links.mjs`.
2. Ticketmaster Discovery diff via `scripts/audit-tm-events.mjs` per event ID (requires `TICKETMASTER_API_KEY`; skipped safely if absent).
3. Reporting via `scripts/daily-audit-report.mjs` into a single rolling GitHub issue (`automation:daily-audit`).
4. Verification-date bumps via `scripts/bump-verified-dates.mjs`, opening a PR for human review. The TM-skip/failure guard added in PR #182 prevents date bumps when TM data is unavailable.

`.github/workflows/prelaunch-validation.yml` includes a `stale-sync-guard` that runs `npm run events:sync` on PRs touching `public/data/*.json` and fails if `public/index.html` is stale.

## Active risks

These are the live risks. Detailed task scope and ordering live in `BACKLOG.md`.

- **Olivia Rodrigo trust gap (#171).** Artist-level Ticketmaster verification is not restored. Until a human-verified TM artist URL is added to `VERIFIED_TICKET_LINKS`, `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` returns `provider_not_configured`. Event-level CTAs continue to render only where a verified event URL exists; 8 events remain `needs_recheck`.
- **Data refresh opacity (#174).** `scripts/sync-events-data.py` inlines the first artists and fallback events into `public/index.html`. Without explicit documentation in `docs/DEPLOYMENT.md`, contributors can land JSON edits that do not reach production. The `stale-sync-guard` job catches this on PRs; the user-facing refresh behaviour still needs to be written up (Phase A).
- **Onboarding drift (#175).** Adding an artist still touches `artists.json`, `catalog.json`, `events.json`, `VERIFIED_TICKET_LINKS` in `functions/api/out.js`, and the smoke fixture. There is no single-command validator that confirms a new slug is wired end-to-end. The Olivia Rodrigo gap is the symptom.
- **Blank `tour_name` for Olivia Rodrigo (#172 sub-deliverable B).** Sub-deliverable A landed in PR #186 (validator warning). Populate must be human-verified per source; URL slugs are evidence, not proof.
- **Stale-file risk (#176).** Vercel artefacts (`api/`, `vercel.json`), legacy standalone Worker builder, inactive route shims, and `archive/vercel-experimental/` still live in the repo. Audit-first, deletions later — do not delete during other work.
- **Raw HTML production proof (#10).** Local proof passed (17 representative routes); production browser proof is still unconfirmed. PR #184's guide drift validation reduces the risk further. This is not a coding priority unless a fresh production check identifies a real mismatch.

## Product guardrails (summary)

The full rules are in `docs/CONTENT_RULES.md`, `docs/PROVIDER_DATA_POLICY.md`, and `CLAUDE.md`. Highlights:

- Never invent tours, dates, venues, prices, availability, providers, inventory, or ticket links.
- Never scrape ticket providers.
- Never claim live price comparison unless approved provider feeds support it.
- Never expose Impact or any other secret client-side.
- CTAs only when artist ∈ catalog, provider has a verified `redirectUrl`, and the URL passes `/api/out` validation.

## What is supported today

- Homepage and trust/legal pages.
- Artist index plus the 9 artist pages above.
- 15 guide pages with server-rendered content.
- Verified Ticketmaster CTAs (artist- and event-level) where configured.
- Stored event-level SeatGeek URLs (gated off for public CTAs until SeatGeek configuration is complete).
- First-party analytics and signup writes through `DEMAND_DB`.

## What is not supported

- Live multi-provider price aggregation; "cheapest" / "guaranteed availability" claims.
- Tour, city, venue, or event landing pages.
- Public SeatGeek or Vivid Seats CTAs.
- `Event` / `MusicEvent` schema on any page without verified event-level data.

## How to update this file

Refresh when any of the following change: artist count, indexing status, event count, guide count, bindings, validation pipeline, daily automation, or the set of active issues. Reference `BACKLOG.md` for prioritised work — do not duplicate the priority list here.
