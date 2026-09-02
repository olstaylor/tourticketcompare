# TourTicketCompare Backlog

Last updated: 2026-08-21 (content); facts corrected 2026-09-02. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Historical detail for closed items lives in the linked PRs and git history, not here.

## Active priorities (in order)

Items 1–4 are **operational** (owner + gated tooling), not engineering; item 5 is the one engineering task, added 2026-08-26 at owner request. Each item stays here until verifiably done.

### 1. Affiliate-pivot owner follow-ups (2026-07-02)

1. **Post-deploy verification:** confirm `/api/out?artistSlug=<slug>&provider=ticketmaster` 302s plain and `provider=seatgeek` 302s to the Impact tracking URL; confirm no `utt.impactcdn.com` requests in devtools; browser-verify the 7 swapped plain Ticketmaster artist URLs and 16 SeatGeek performer-page URLs if not already done (lists in `data/provider-identities.json`).
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in the Cloudflare dashboard (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. **Price snapshot operations:** both Cloudflare display flags are enabled. Continue monitoring scheduled summaries. **SeatGeek price snapshots are permanently disabled (2026-07-15, owner-confirmed):** the SeatGeek API returns null pricing statistics for this client and never will; SeatGeek stays CTA-only. Artist-level Vivid Seats entries remain separate scope.
4. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" **in that same PR**.

### 2. Impact provider operations — TicketNetwork, Ticket Liquidator, StubHub International

Continuing operations following the 2026-07-13 activation:

1. Monitor the nightly scheduled event-sync runs (see `docs/OPERATIONS.md` for the schedule) via their auto-merged PRs and `reports/provider-sync/`; for manual dispatch, run preview before apply, review its PR, and browser-check new sample destinations across markets.
2. Monitor the two-hourly TicketNetwork and StubHub International exact-ID price snapshot schedule (six-hour freshness constant; each apply run ends with a 90-day history prune). Ticket Liquidator must stay price-disabled until its catalog supplies numeric `CurrentPrice`.
3. Monitor catalog/campaign access and tracking. Set the matching public flag explicitly to `false` on a provider/API mismatch or redirect failure.

StubHub International is separate from StubHub US/Canada.

### 3. Roster growth (2026/27 tours)

Run `npm run artists:onboard:propose` with target artist names (US/EU major tours), create shells, human-review the manifest, then `npm run artists:promote:batch --write` (≤20/PR, per-artist human browser spot-check checklist in the PR body). Event enrichment follows via the existing `seatgeek:propose` / `seatgeek:enrich` and TM new-show pipelines. Never auto-publish.

**Candidate shortlist captured 2026-07-29** (manifests live in gitignored `artifacts/` and do not survive environment recycling, so names are recorded here): identity already captured cleanly via `artists:onboard:propose` for **Gracie Abrams, Niall Horan, Doja Cat, Sombr, Latto, John Summit** — all six have since been promoted (see Recently completed). Next candidates for a fresh `roster:forecast:candidates` pass: re-run against current data: the last roster-growth batch is now several weeks old and the indexable surface continues to decay as dates pass (`npm run roster:forecast`).

**Batch captured 2026-08-26** (fact added by agent; manifest `artifacts/onboarding/batch-2026-08-26.json` is gitignored, so names are recorded here). Ten shells created, all `review_required`/noindex/no CTA, each captured with an exact-name match on both SeatGeek and Ticketmaster: **Don Omar, Luke Combs, Blue October, Pentatonix, Tyla, Nothing But Thieves, Trivium, Sabaton, In Flames, Beartooth**. Shortlisted from the `roster:forecast:candidates` ranking by headliner status — that ranking scores at-risk-page coverage, not tour scale, so it surfaced support acts (Avery Anna and Treaty Oak Revival share the Luke Combs package's exact market fingerprint; Initiate, Koyo and Senses Fail share another) and club-tier names, none of which were taken. **Promoted 2026-08-26** (fact updated by agent): the owner browser-checked all 20 destinations and confirmed them, and `artists:promote:batch --write` added the registry entries and both artist-level CTAs for all ten. All ten are now `indexable_with_substantial_content` with 0 event records. Merged as PR #774 on 2026-08-26 (which also carried the shell commit, superseding PR #771). **Fact corrected 2026-08-26:** a promoted artist with 0 events renders the empty-state watchlist board and **no CTA button** — the artist-level `VERIFIED_TICKET_LINKS` entries exist and resolve, but `emptyStateProviderCta` is `null` and `renderProviderFallback` only runs when the board has shows, so the buttons appear once dates land. Verified in production. This is the same state beyonce, raye and tate-mcrae are in; the "artist-level CTAs only" wording used for them elsewhere overstates what an empty board shows.

Remaining `review_required` shells awaiting Promote: **sabrina-carpenter, lady-gaga** (held pending live dates), **the-weeknd, coldplay** (SeatGeek-first, international-domain caveat — 0/1 upcoming SeatGeek events at last capture), **system-of-a-down, laura-pausini** (2026-07-31 batch, owner browser-checked TM identities; identity captured cleanly 2026-08-21 but held back at Promote on 1 and 0 upcoming SeatGeek events respectively — promotable with `--slugs` whenever dates land). Before Promote for any of these: regenerate an API-captured SeatGeek/Ticketmaster manifest with `--allow-existing-shells`, confirm captured identities match reviewed destinations, and complete the per-artist browser checklist. **Journey**, **rush** and **muse** need manual identity resolution: SeatGeek returns no exact-name performer match for any of them, only tribute acts and unrelated names, so `artists:onboard:propose` refuses them by design.

The other six of that batch — **karol-g, foo-fighters, metallica, my-chemical-romance, teddy-swims, five-finger-death-punch** — were promoted on 2026-08-21 with verified registry entries (PR #738).

### 4. Routine data hygiene (recurring)

- **`needs_recheck` provenance:** 151 events retain this historical confidence state (fact corrected 2026-09-02; was 81 on 2026-08-23, 46 before that) (per-artist breakdown: `PROJECT_STATUS.md` → Per-artist status). It is no longer a manual CTA queue: stored destinations go through the runtime host, protocol, event-ID, and redirect checks automatically; rows without a usable destination remain suppressed. **Fact added 2026-09-02:** 22 of the 151 have no independently verified resale provider, and **15 of those are upcoming dates rendering no ticket CTA at all** (up from 6 on 2026-08-24). Nine sit on artists promoted in the 2026-08-26 batch, so resale provenance is lagging the new roster — see item 2 for the sanctioned verification path.
- **Blank tour labels:** the remaining validator warning is expected for the JAY-Z Inglewood/London rows (owner-accepted blank), John Summit's separate Lollapalooza aftershow (deliberately unlabelled), and a handful of Bad Bunny/Jelly Roll/Post Malone rows needing event-specific human confirmation. Never infer tour names from URL slugs.
- **Tombstone dedup deletions:** when deleting a row from `events.json` that Ticketmaster still lists, add its ids and/or venue/date to `data/deleted-events.json` in the same change (see `docs/PROVIDER_SYNC.md` and `docs/OPERATIONS.md` → Known incidents).
- Review the rolling automation issues (`automation:daily-audit`, `automation:data-sync`) and any withheld rows from the new-show PRs.

### 5. Unvalidated-PR-head guard — **done 2026-09-01** (fact updated 2026-09-02)

Shipped and verified; kept here only until the owner confirms, then delete this section.

`scripts/check-pr-validation-heads.mjs` lists open non-draft PRs targeting `main`, matches Prelaunch Validation runs
on `head_sha` (never on "the PR has a green run attached", per the third occurrence), classifies each head as
success / missing / failed / stuck-beyond-30-minutes, and reports through the rolling `automation:prelaunch-validation`
issue. It never reruns, approves, merges, or changes a PR — the fail-safe the original note required.

PR #797 (merged 2026-09-01) went beyond the suggested shape: the guard now also fires on `pull_request_target`
lifecycle events and on every completed Prelaunch Validation run, so a missing run surfaces in minutes rather than
waiting on a cron that had been arriving hours late. Two defects were fixed before that merged — `cancel-in-progress`
was letting any new PR event kill the running repository-wide scan, and a `synchronize` event reached the guard before
GitHub had registered the run it triggers, flagging every freshly pushed head as unvalidated.

Both traps recorded in the original note still hold and are respected: `actions/checkout` needs a full 40-character
SHA, and `workflow_dispatch` runs attach no check run to the PR.

## Recently completed

Closed on GitHub; kept as a short audit trail only. Full detail lives in the linked PRs and git history.

- Unvalidated-PR-head guard — exact-head validation check, event-driven (2026-09-01, PR #797)
- Phase 3 quality pass — mobile/a11y, guide and blog content trim, empty artist pages (2026-09-01, PRs #821/#822/#823/#824/#828)
- GA4 funnel destination fixed and gated to the canonical host (2026-09-01, PR #796)
- Roster growth batch of ten — shells + promote with verified CTAs (2026-08-26, PR #774; supersedes #771)
- Truthful artist link copy — links note gated on editorial status, hover-to-inspect FAQ replaced across all 50 artists (2026-08-26, PR #772)
- Full-board price coverage + honest unavailable state (2026-08-04, PRs #646/#657)
- Impact diagnostics security pass — `/api/impact/*` + `/api/debug-seatgeek` token-gated (2026-08-03, PR #648)
- Content editor isolated on `admin.tourticketcompare.com` (2026-08-04, PR #652; owner DNS/OAuth setup completed 2026-08-19 — editor live)
- Static-page date provenance derived from copy fingerprints (2026-08-03, PR #647)
- Blog + Markdown content pipeline (2026-08-01)
- Commercial funnel measurement — server-side `outbound_click` as authoritative metric (2026-07-31; migration `0008` applied to production 2026-08-07)
- Affiliate performance reporting — `report:affiliate-performance` joins Impact's own read-only Actions API (orders/state/commission) against TTC's authoritative `outbound_click` count (2026-08-07)
- Route-usefulness policy — shared dynamic-indexability gate (2026-07-31)
- City landing pages (2026-07-22)
- Guide source and answer audit — all 17 guides gain reviewed sources + FAQs (2026-07-22)
- Storefront recheck resolution + duplicate-row dedup, owner-directed (2026-07-15)
- Venue landing pages (2026-07-14, quality gate raised 2026-07-22)
- Guide internal-linking (2026-07-14)
- Documentation lifecycle cleanup — removed `HANDOVER.md`/`docs/archive/` (2026-07-13)
- SeatGeek CTA sync automation, owner-approved (2026-07-08)
- Repo + docs cleanup — legacy CSV pipeline, dead endpoints, retired discovery stack removed (2026-07-07)
- Blank `tour_name`/`event_name` backfill from Ticketmaster Discovery (2026-07-07)
- Hands-off update automation — new-show PR auto-merge, nightly sync cron (2026-07-07)
- SeatGeek event-level enrichment (2026-07-06)
- Affiliate pivot — Ticketmaster affiliate removed, SeatGeek promoted to primary CTA (2026-07-02; Vivid Seats event lane 2026-07-10)
- Earlier closeouts: slugify shared-helper consolidation, ROSALÍA onboarding, Summer Walker `tour_name`, stale-file deletions, tour-name gaps backfill, Olivia Rodrigo verified links, onboarding runbook + validator (2026-05-27 → 2026-06-19)

## Proposed — design only, not scheduled (owner approval required before any build)

### Price-alert feature design (2026-07-22, agent-authored)

A "track this price" feature: double opt-in email subscription, alerts fire only on a snapshot that would pass the same public display-eligibility gate as the visible price badge at that moment, snapshot framing throughout (no "cheapest"/availability claims, per-provider only). The full schema/API/email-copy/abuse-prevention design was authored on `claude/price-alert-design-4p8rd9` and is not repeated here — recover it from that branch's history if Phase 2 is ever approved.

**Verdict (2026-07-22, reconfirmed 2026-08-04): do not build the email stack — demand isn't there.** Phase 0 (recording `provider_pricing_history`) and Phase 1 (on-site price history + a demand-interest instrument, no email ever sent) are both already implemented and live. The demand gate is **100–200 distinct `price_alert_interest` signups within a quarter**; the counter stands at **2 total** as of 2026-08-04, with `email_subscribers` at 10 rows (3 in the last 30 days). Nothing changes until that gate is met.

Hard constraints that must still hold if this is ever resumed: only the numeric-price lanes (Vivid Seats, TicketNetwork, StubHub International) participate; an alert may fire only on a snapshot the site would publicly display at that same moment; all copy stays snapshot-framed (no ranking, no "cheapest," no availability implication); the check runs in the scheduled GitHub Actions layer, never Cloudflare Cron.

### Output-aware content-provenance fingerprints (2026-08-25, agent-authored)

`scripts/sync-content-provenance.mjs` fingerprints a trust route over its **source** — the render block plus every declaration it transitively reaches — because the script has no data to render with. `normalizeRenderSource()` already strips comments and whitespace so formatting cannot advance a published date, but it cannot tell whether a source change alters what a given route actually outputs.

Consequence: editing a helper shared by several routes advances the published date on all of them, including routes whose rendered HTML is byte-identical. Demonstrated on PR #739 — adding an unused parameter to `renderArtistLinks()` (shared by `/` and `/artists`) advances both, while rendering `/artists` before and after produces identical output. The route then advertises an update visitors cannot observe, and freshness consumers (sitemap `lastmod`, the IndexNow ping) treat an unchanged page as revised.

Verdict (2026-08-25): **accepted as-is for now.** The behaviour is conservative in the safe direction — it over-reports freshness rather than freezing a date that should have moved — and the alternative was hand-editing `data/content-provenance.json`, which the generated-file rule forbids.

A fix would fingerprint each trust route's *rendered output* against a fixed synthetic catalog/events fixture, so data churn still cannot move a date but an output-neutral refactor no longer does either. Not scoped: it is a redesign of a protected generator, it changes the freshness semantics of every tracked route at once, and it needs a migration plan for the recorded hashes in `data/content-provenance.json` (every hash changes on cutover, which would advance all 28 dates unless the existing published dates are carried across deliberately).

## Explicitly parked

Intentionally not work until separately scoped and owner-approved. Unparking removes the scope freeze, not the verification rules.

- **Tour / individual event landing pages.** No separate verified-content and canonical/indexing strategy. (City and venue aggregation pages are implemented — see "Recently completed".)
- **Live inventory aggregation; "cheapest ticket" / "guaranteed availability" claims.** Approved provider lanes are timestamped listed-price snapshots, not live inventory or checkout-total guarantees.
- **Provider expansion beyond SeatGeek, Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International.** Adding any further provider still requires a separate verified feed, explicit written usage rights, and scoped integration work.
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.
- **Splitting `functions/[[path]].js` into route modules.** Raised 2026-08-04; deliberately deferred as its own scoped task given the file's size (4,300+ lines) and protected-area status — needs a dedicated plan before any code moves.

## How to update this file

Refresh whenever work items open, close, or change priority. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Parked items should be removed only when their underlying constraint is resolved (e.g. an approved provider feed exists).
