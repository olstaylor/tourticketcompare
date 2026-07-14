# TourTicketCompare Backlog

Last updated: 2026-07-14 (pruned stale/over-cautious items; venue landing pages and guide internal-linking shipped).

## Active priorities (in order)

All remaining active work is **operational** (owner + gated tooling), not engineering. Each item stays here until verifiably done.

### 1. Affiliate-pivot owner follow-ups (2026-07-02)

1. **SeatGeek price-stat entitlement (live blocker):** both Cloudflare display flags are enabled and the Vivid Seats price run writes all eligible rows (continue monitoring its scheduled summaries). SeatGeek has both Actions credentials and fetches every eligible event with HTTP 200, but all pricing statistics remain null. Owner action: have SeatGeek enable pricing-stat access for the existing API client, dispatch the SeatGeek workflow in apply mode, and confirm non-zero `usable`/`written` counts plus fresh D1 rows. Artist-level Vivid Seats entries remain separate scope.
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in the Cloudflare dashboard (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" **in that same PR**.

### 2. Impact provider operations — TicketNetwork, Ticket Liquidator, StubHub International

Public activation completed on 2026-07-13 using the existing SeatGeek-scoped Impact credentials and the verified provider campaigns/catalogs. Continuing operations are:

1. Run the manual event-sync workflow in preview before apply; review its PR and browser-check new sample destinations across markets.
2. Monitor the four-hour TicketNetwork and StubHub International exact-ID price snapshot schedule. Ticket Liquidator must stay price-disabled until its catalog supplies numeric `CurrentPrice`.
3. Monitor catalog/campaign access and tracking. Set the matching public flag explicitly to `false` on a provider/API mismatch or redirect failure.

Provider event-sync scheduling and auto-merge remain off pending a separate operational decision. StubHub International is separate from StubHub US/Canada.

### 3. Roster growth (2026/27 tours)

Run `npm run artists:onboard:propose` with target artist names (US/EU major tours), create shells, human-review the manifest, then `npm run artists:promote:batch --write` (≤20/PR, per-artist human browser spot-check checklist in the PR body). Event enrichment follows via the existing `seatgeek:propose` / `seatgeek:enrich` and TM new-show pipelines. Never auto-publish.

### 4. Routine data hygiene (recurring)

- **`needs_recheck` re-checks:** 36 events carry this state. Independently verified resale provenance keeps 9 SeatGeek and 6 Vivid Seats CTAs publishable; 21 rows have neither provider and remain fully CTA-suppressed. Re-check Ticketmaster storefront URLs periodically; never restore from the Discovery `url` field alone.
- **Duplicate event rows (found 2026-07-08, agent — owner decision needed):** 9 Ariana Grande pairs remain duplicate rows of the same show (one legacy hex-id `human_verified` row + one Discovery-id `machine_high_confidence` row per show). Deletions are human-gated: pick the row to keep per pair (details in `PROJECT_STATUS.md` → Active risks). The earlier Bruno Mars wrong-night URL share was corrected by the SeatGeek sync; row dedup does not self-heal.
- **Blank tour labels:** JAY-Z Inglewood "JAY-Z30", JAY-Z London "JAY-Z - 30", and the withheld Shakira Madrid "Shakira Stadium" row need owner-supplied `tour_name` values; never infer them from URL slugs. The Yankee Stadium JAY-Z rows use "JAY-Z Yankee Stadium 2026".
- Review the rolling automation issues (`automation:daily-audit`, `automation:data-sync`) and any withheld rows from the new-show PRs.

## Recently completed

Closed on GitHub / done in the repo; kept as a short audit trail only. Details live in git history and `PROJECT_STATUS.md`.

- **Venue landing pages (2026-07-14).** New `/venues` index + `/venues/<slug>` pages, a server-rendered aggregation layer over verified `events.json` (`functions/_venues.js`, shared with the sitemap). No invented data and no provider/CTA logic — venue pages group upcoming tracked shows by artist and link to the artist pages where verified CTAs/prices live. Indexability gated at ≥2 upcoming shows (single-show venues `noindex`); slug merges inconsistent country labels for one physical venue; header/footer nav updated; `MusicVenue`/`CollectionPage` structured data + breadcrumbs; sitemap and smoke coverage added.
- **Guide internal-linking (2026-07-14).** Curated "Related guides" cross-link section added to all 17 topic guides (guide-to-guide internal links ~24 → 74) and the event-price comparison guide placed in a themed `/guides` cluster.

- **Documentation lifecycle cleanup (2026-07-13).** Updated the stable docs for the active multi-provider site, removed `HANDOVER.md` and the stale `docs/archive/` tree, moved generated provider audit logs to `reports/provider-sync/`, and added `npm run docs:check` to CI so broken links, missing commands, and retired doc paths cannot silently return.
- **SeatGeek CTA sync automation (2026-07-08, owner-approved).** Nightly `seatgeek-cta-sync.yml` (05:00 UTC): SeatGeek URL enrichment auto-apply + new `scripts/verify-seatgeek-events.mjs` identity-anchored verification writing `provider_links.seatgeek` verified provenance (standalone SeatGeek CTAs on `needs_recheck` events; wrong-night URL self-heal; safe-direction clearing). Auto-merge PR after in-run validation — third narrow auto-publish exception in `SAFE_PUBLISHING_RULES.md`. New hard error in `validate-cta-provider-state.mjs` guards the provenance contract.
- **Repo + docs cleanup (2026-07-07, owner-approved).** Deleted: legacy CSV pipeline (`data/events.csv`, `csv-to-events.py`), `/api/click`, dead `public/data/{inventory-model,affiliate-routes}.json`, one-time `enrich-events-with-provider-links.js`, abandoned growth pipeline, retired Phase 1/2 discovery stack (`tm-discovery-proposal.yml`, `tm-discovery-shell-pr.yml`, `candidates-audit.yml` + their scripts — batch onboarding and `tm-new-shows-pr.yml` are canonical), `archive/vercel-experimental/`, `.codex/` stub. Docs consolidated: `PROJECT_BRIEF.md`, `docs/AI_AGENT_WORKFLOW.md`, `docs/VALIDATION_CHECKLIST.md`, `docs/ARTIST_SCALING_MAP.md` merged into `CLAUDE.md`/`CONTRIBUTING.md`/onboarding docs; superseded one-off docs removed after durable guidance was consolidated. Migrations renumbered (`migrations/README.md` records applied state).
- **Item 6 — blank `tour_name`/`event_name` on automation-landed events (closed 2026-07-07).** 62/63 blank `tour_name` and all 63 blank `event_name` values backfilled from Ticketmaster Discovery API listing titles (by stored Discovery event id, never URL slugs), cross-checked against official announcements. Process hole closed: discovery now lands `event_name` verbatim from the API; nightly sync keeps it fresh; `tour_name` stays human-gated (#172). Auto-titling was chosen over defaulting rows to `needs_recheck` (owner direction, minimal-input operation).
- **Hands-off update automation (2026-07-07, owner-approved).** Daily new-show PR auto-merges after its in-run validation suite passes; nightly data-sync cron re-enabled with a per-event commit gate; `event_name` added to the lossless auto-sync field set. Narrow auto-publish exception documented in `SAFE_PUBLISHING_RULES.md`.
- **SeatGeek event-level enrichment (2026-07-06).** 28 event-level `seatgeek_url` values applied (identity-confirmed via registry performer ids); coverage 262/402. Zero SeatGeek candidates re-confirmed for the 87 uncovered TM-verified events (European/non-US legs — structural gap, not untried).
- **Affiliate pivot (2026-07-02, Vivid event lane activated 2026-07-10).** Ticketmaster affiliate machinery removed (plain TM links remain, rendered after affiliate providers); SeatGeek promoted to primary CTA with 16 artist-level performer-page entries; Vivid Seats event-level CTAs activated with 218 verified destinations; batch onboarding tooling landed.
- **Earlier closeouts:** slugify shared-helper consolidation (2026-06-17); ROSALÍA onboarding (2026-06-17); Summer Walker `tour_name` (2026-06-16); #176 stale-file deletions (2026-06-19, completed by the 2026-07-07 cleanup); #172 tour-name gaps (2026-06-12); #171 Olivia Rodrigo verified links (2026-05-27, PR #190); #175 onboarding runbook + validator (2026-06-01, PR #188).

## Explicitly parked

Intentionally not work until separately scoped and owner-approved. Unparking removes the scope freeze, not the verification rules.

- **Tour / city / event landing pages.** No verified data, no canonical/indexing strategy. (Venue landing pages are now implemented — see "Recently completed".)
- **Live inventory aggregation; "cheapest ticket" / "guaranteed availability" claims.** Approved provider lanes are timestamped listed-price snapshots, not live inventory or checkout-total guarantees.
- **Provider expansion beyond SeatGeek, Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International.** Adding any further provider still requires a separate verified feed, explicit written usage rights, and scoped integration work.
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.

## How to update this file

Refresh whenever work items open, close, or change priority. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Parked items should be removed only when their underlying constraint is resolved (e.g. an approved provider feed exists).
