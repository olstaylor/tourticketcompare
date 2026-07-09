# TourTicketCompare Backlog

Last updated: 2026-07-07 (repo + docs cleanup, owner-approved: dead files and retired tooling deleted, instruction docs consolidated — `CLAUDE.md` is the instruction source of truth, live state lives only in `PROJECT_STATUS.md`. Item 6 — blank `tour_name`/`event_name` on automation-landed events — closed the same day by the hands-off automation changes; see "Recently completed".)

## Active priorities (in order)

All remaining active work is **operational** (owner + gated tooling), not engineering. Each item stays here until verifiably done.

### 1. Affiliate-pivot owner follow-ups (2026-07-02)

1. **Post-deploy verification:** confirm `/api/out?artistSlug=<slug>&provider=ticketmaster` 302s plain and `provider=seatgeek` 302s to the Impact tracking URL; confirm no `utt.impactcdn.com` requests in devtools; browser-verify the 7 swapped plain Ticketmaster artist URLs and 16 SeatGeek performer-page URLs if not already done (lists in `data/provider-identities.json`).
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in the Cloudflare dashboard (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. **Vivid Seats activation (2026-07-09 update):** the first supervised event-level apply pass has run with Impact credentials present and verified `/production/<numeric id>` event URLs now exist. Remaining owner steps: (a) confirm the `IMPACT_VIVIDSEATS_ACCOUNT_SID`/`IMPACT_VIVIDSEATS_AUTH_TOKEN` plus campaign/program tracking binding are present in both Cloudflare Pages and GitHub Actions secrets; (b) spot-check several rows from `docs/VIVIDSEATS_CTA_SYNC_LOG.md` against the live Vivid Seats page for artist, venue, and local date before merging data; (c) once merged, land a one-line follow-up PR uncommenting the `cron: '30 5 * * *'` schedule. Artist-level Vivid Seats entries remain a separate, still-unscoped follow-up.
4. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" **in that same PR**.

### 2. Roster growth (2026/27 tours)

Run `npm run artists:onboard:propose` with target artist names (US/EU major tours), create shells, human-review the manifest, then `npm run artists:promote:batch --write` (≤20/PR, per-artist human browser spot-check checklist in the PR body). Event enrichment follows via the existing `seatgeek:propose` / `seatgeek:enrich` and TM new-show pipelines. Never auto-publish.

### 3. Routine data hygiene (recurring)

- **`needs_recheck` re-checks:** 41 events are CTA-suppressed (see `PROJECT_STATUS.md` per-artist table) — re-check periodically for working storefront URLs; never restore from the Discovery `url` field alone. _(Fact update 2026-07-08, agent: the SeatGeek half is now automated — the nightly `seatgeek-cta-sync.yml` writes verified SeatGeek provenance so listed events regain a SeatGeek CTA without a Ticketmaster restore. The Ticketmaster-restore half of this item is unchanged and stays human-gated.)_
- **Duplicate event rows (found 2026-07-08, agent — owner decision needed):** 10 Ariana Grande pairs are duplicate rows of the same show (one legacy hex-id `human_verified` row + one Discovery-id `machine_high_confidence` row per show), plus 1 Bruno Mars Falcon Stadium pair sharing one SeatGeek URL across two nights. Deletions are human-gated: pick the row to keep per pair (details in `PROJECT_STATUS.md` → Active risks). The wrong-night SeatGeek URLs self-heal via the nightly sync; the row dedup does not.
- **JAY-Z Inglewood "JAY-Z30":** the one open title item — a standalone anniversary show with no official tour name; needs an owner label (the Yankee Stadium rows use "JAY-Z Yankee Stadium 2026").
- Review the rolling automation issues (`automation:daily-audit`, `automation:data-sync`) and any withheld rows from the new-show PRs.

### 4. #174 Phase B — data-refresh hardening (judgment call)

Phase A (documented flow + `stale-sync-guard` CI job) is done. Phase B is an optional build-time cache-bust or stronger pre-commit hook — only adopt if it fits the Cloudflare Pages build cleanly; do not ship a brittle cache-bust.

### 5. #10 — Production raw HTML verification (only if still needed)

Local proof passed on 17 representative routes (2026-05-19); PR #184's guide drift validation runs on every PR. Non-blocking unless a fresh production browser check finds a real mismatch. Remaining deliverable: a human-run `curl` checklist over production routes (see the #10 issue comment).

## Recently completed

Closed on GitHub / done in the repo; kept as a short audit trail only. Details live in git history and `PROJECT_STATUS.md`.

- **SeatGeek CTA sync automation (2026-07-08, owner-approved).** Nightly `seatgeek-cta-sync.yml` (05:00 UTC): SeatGeek URL enrichment auto-apply + new `scripts/verify-seatgeek-events.mjs` identity-anchored verification writing `provider_links.seatgeek` verified provenance (standalone SeatGeek CTAs on `needs_recheck` events; wrong-night URL self-heal; safe-direction clearing). Auto-merge PR after in-run validation — second narrow auto-publish exception in `SAFE_PUBLISHING_RULES.md`. New hard error in `validate-cta-provider-state.mjs` guards the provenance contract.
- **Repo + docs cleanup (2026-07-07, owner-approved).** Deleted: legacy CSV pipeline (`data/events.csv`, `csv-to-events.py`), `/api/click`, dead `public/data/{inventory-model,affiliate-routes}.json`, one-time `enrich-events-with-provider-links.js`, abandoned growth pipeline, retired Phase 1/2 discovery stack (`tm-discovery-proposal.yml`, `tm-discovery-shell-pr.yml`, `candidates-audit.yml` + their scripts — batch onboarding and `tm-new-shows-pr.yml` are canonical), `archive/vercel-experimental/`, `.codex/` stub. Docs consolidated: `PROJECT_BRIEF.md`, `docs/AI_AGENT_WORKFLOW.md`, `docs/VALIDATION_CHECKLIST.md`, `docs/ARTIST_SCALING_MAP.md` merged into `CLAUDE.md`/`CONTRIBUTING.md`/onboarding docs; resolved docs archived. Migrations renumbered (`migrations/README.md` records applied state).
- **Item 6 — blank `tour_name`/`event_name` on automation-landed events (closed 2026-07-07).** 62/63 blank `tour_name` and all 63 blank `event_name` values backfilled from Ticketmaster Discovery API listing titles (by stored Discovery event id, never URL slugs), cross-checked against official announcements. Process hole closed: discovery now lands `event_name` verbatim from the API; nightly sync keeps it fresh; `tour_name` stays human-gated (#172). Auto-titling was chosen over defaulting rows to `needs_recheck` (owner direction, minimal-input operation).
- **Hands-off update automation (2026-07-07, owner-approved).** Daily new-show PR auto-merges after its in-run validation suite passes; nightly data-sync cron re-enabled with a per-event commit gate; `event_name` added to the lossless auto-sync field set. Narrow auto-publish exception documented in `SAFE_PUBLISHING_RULES.md`.
- **SeatGeek event-level enrichment (2026-07-06).** 28 event-level `seatgeek_url` values applied (identity-confirmed via registry performer ids); coverage 262/402. Zero SeatGeek candidates re-confirmed for the 87 uncovered TM-verified events (European/non-US legs — structural gap, not untried).
- **Affiliate pivot (2026-07-02).** Ticketmaster affiliate machinery removed (plain TM links remain, rendered after affiliate providers); SeatGeek promoted to primary CTA with 16 artist-level performer-page entries; Vivid Seats fully wired but dormant; batch onboarding tooling landed.
- **Earlier closeouts:** slugify shared-helper consolidation (2026-06-17); ROSALÍA onboarding (2026-06-17); Summer Walker `tour_name` (2026-06-16); #176 stale-file deletions (2026-06-19, completed by the 2026-07-07 cleanup); #172 tour-name gaps (2026-06-12); #171 Olivia Rodrigo verified links (2026-05-27, PR #190); #175 onboarding runbook + validator (2026-06-01, PR #188).

## Explicitly parked

Intentionally not work until separately scoped and owner-approved. Unparking removes the scope freeze, not the verification rules.

- **Tour / city / venue / event landing pages.** No verified data, no canonical/indexing strategy.
- **Live price aggregation; "cheapest ticket" / "guaranteed availability" claims.** Requires approved provider feeds with explicit usage rights.
- **SeatGeek price display.** Snapshots are collected to D1 on cron (intentional), but display requires written SeatGeek permission and `SEATGEEK_PRICE_DISPLAY_ENABLED=true`. Parked until both exist.
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.
- **Broad refactors of `scripts/smoke-prelaunch.mjs`** or other validation scripts.
- **Internal Impact Publisher Tag diagnostic route (`/internal/impact-tag-test`) and `functions/api/debug-seatgeek.js`** — leave intact.

## How to update this file

Refresh whenever work items open, close, or change priority. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Parked items should be removed only when their underlying constraint is resolved (e.g. an approved provider feed exists).
