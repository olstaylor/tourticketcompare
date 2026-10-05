# TourTicketCompare Backlog

Owner-managed. Agents may correct facts (dated) but not reorder or re-scope priorities. Finished work leaves this file; the PR and git history keep its record. Last condensed 2026-10-02 at the owner's request (wording and shipped history removed; no item reordered or re-scoped).

## Active priorities (in order)

Items 1–5 are operational (owner plus gated tooling), not engineering.

### 1. Affiliate-pivot owner follow-ups

1. **Post-deploy check:**
   - `/api/out?artistSlug=<slug>&provider=ticketmaster` 302s plain, and `provider=seatgeek` 302s to the Impact tracking URL.
   - The browser makes no `utt.impactcdn.com` requests.
   - If not already done, browser-check the 7 plain Ticketmaster artist URLs and 16 SeatGeek performer URLs in `data/provider-identities.json`.
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in Cloudflare (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. **Price snapshots:** both display flags are on; keep watching the scheduled summaries. SeatGeek price snapshots are permanently off (its API returns null pricing for this client; owner-confirmed 2026-07-15), so SeatGeek stays CTA-only.
4. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" in that same PR.
5. **Conversion-weighted page ranking is blocked on two owner inputs.** Contract: `docs/COMMERCIAL_FUNNEL.md`.
   - A Search Console query×page and Page Indexing export for one window.
   - A defensible reconciliation of client CTA intent against server redirect receipts (5,541 receipts vs 87 intent events at last read).
6. **Ticket Liquidator `impact_tracking_url_failed_safety_check` outcomes:** separate retry and automation bursts from the real per-provider failure rate (aggregate only), and keep the safety gate. Confirm the intended Ticket Liquidator contract before changing anything.
7. **GA4 Internal Traffic exclusion is still in Testing**, pending an IP-scope review. D1 stays the redirect measure of record.

### 2. Impact provider operations (TicketNetwork, Ticket Liquidator, StubHub International)

1. Watch the nightly event-sync PRs and `reports/provider-sync/`. For a manual run: preview, then apply, review the PR, and browser-check sample destinations.
2. Watch the hourly TicketNetwork and StubHub International price snapshots. Freshness is 24h, and `price-coverage-report.yml` counts prices past 12h as stale. Ticket Liquidator stays price-disabled until its catalog supplies a numeric `CurrentPrice`.
3. On a provider/API mismatch or redirect failure, set that provider's public flag to `false`.

StubHub International is separate from StubHub US/Canada.

### 3. Roster growth

Most new artists now arrive through auto-promote (`SAFE_PUBLISHING_RULES.md` → D; requests in `data/artist-requests.json`; runbook `docs/ARTIST_INGESTION.md`).

The manual path is for acts the automatic screen can't pass, and it never auto-publishes:
1. `npm run artists:onboard:propose`, then create shells.
2. Human review.
3. `npm run artists:promote:batch -- --write`, at most 20 per PR, with a per-artist browser checklist.

Open items:
- **Seven shells await Promote.** Before promoting any: re-capture the manifest with `--allow-existing-shells`, confirm identities match the reviewed destinations, and complete the browser checklist.
  - sabrina-carpenter and lady-gaga: held for live dates.
  - coldplay: SeatGeek-first, with an international-domain caveat.
  - system-of-a-down and laura-pausini: promotable with `--slugs` once SeatGeek dates land.
  - rush and muse: blocked on identity resolution, because SeatGeek has no exact performer match.
- **journey** needs onboarding from scratch (same SeatGeek identity problem).
- **Owner brand-safety calls:** Wheeler Walker Jr. and As I Lay Dying screened clean but are held, and both are on the denylist. Brit Floyd and Twilight In Concert are not artist identities.
- **Co-headliners** Whitechapel, Insomnium and Amorphis can still be onboarded.
- **Oasis** was published with 0 upcoming Ticketmaster events at capture (owner choice). Revisit if it still has no TM dates at the next roster pass.
- Check `seo_title` length (≤60) at Shell time. The internal-links audit only checks indexable pages, so an overflow otherwise surfaces at Promote.
- `roster:forecast:candidates` ranks by at-risk city/venue coverage, not tour scale, so it surfaces support acts. Screen candidates on primary-attraction share before taking them.

### 4. Routine data hygiene (recurring)

- **`needs_recheck`:** 507 events (2026-10-05). This is not a manual CTA queue; runtime checks handle the destinations.
  - 72 upcoming ones (of 89 in total) lack a verified resale lane (2026-10-05). Once past their public on-sale, they still show the Ticketmaster button.
  - The count climbs with each large ingestion run. Recount it with the same test `scripts/validate-status-counts.mjs` uses.
  - Compute "renders no CTA" claims with `eventLinkPublishable` and `providerEventPublishable`, never by hand.
- **Guide source re-verification (human-only):** the owner last did this on 2026-09-21 across all 18 guides. Source sites return 403 to agents, so an agent must never bump a `last_checked` date. `npm run guides:sources:check` only covers reachability.
- **Blank tour labels:** 1,831 events on indexable artists have an empty `tour_name` (2026-10-05), mostly from Ticketmaster ingestion. Backfill only with verified tour names; never infer them from URLs or `event_name`.
- **`events-index.json`:** `validate-partitions.mjs` enforces it. Fix any failure with `npm run events:partition`, never by hand.
- **Tombstones:** when deleting an `events.json` row that Ticketmaster still lists, add it to `data/deleted-events.json` in the same change (`docs/PROVIDER_SYNC.md`).
- **Non-performance rows (resolved 2026-10-05):** the owner approved removing 14 upgrade, premium-package and box-seat rows (including the three Hamburg box-seat rows previously listed here). 13 are removed and tombstoned by Ticketmaster id only, so the real concert listing at the same venue and night can still be ingested. The 14th, charli-xcx Glasgow 2027-02-15 "Venue Premium" (`tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt`), is a frozen event-indexing pilot member. The owner decided on 2026-10-05 to leave it until the pilot ends, then remove it and tombstone it by Ticketmaster id like the others (`ticketmaster_event_id` `36006529B81268A9`). The pilot has no fixed end date; the guard in `audit:indexable-surface:check` fails while the key is pinned and its row is missing.
- Review the rolling `automation:*` dashboards and withheld rows from the new-show PRs.

### 5. Switch on artist date-alert emails (added 2026-10-02 at the owner's request)

The sender, unsubscribe page and manual `date-alerts.yml` workflow shipped in PR #1279; nothing sends until these owner steps are done. On 2026-10-02, 4 alerts were due (Olivia Rodrigo, Tame Impala, Shakira, Gracie Abrams; the last looks like an owner test address).

1. Create a Resend account and verify `tourticketcompare.com` (DNS records in Cloudflare).
2. Add GitHub Actions secrets `RESEND_API_KEY`, `ALERT_EMAIL_FROM` (e.g. `TourTicketCompare <alerts@tourticketcompare.com>`) and `ALERT_POSTAL_ADDRESS` (a PO box is fine); `ALERT_REPLY_TO` is optional.
3. Run **Artist date alerts** in `test` mode to an owner address, check it, then run `send`.
4. Decide later whether it should run on a schedule (it has none by design). Presale/on-sale alerts would need new signup-form wording first: the form promises "dates are listed. Nothing else."

## Engineering track: auto-ingest plan (owner-approved 2026-09-23)

**Goal:**
- a site that is easy to use and trusted;
- new major artists ingested automatically, with SEO pages;
- a site that runs and repairs itself with minimal owner work.

The owner reviews auto-published output after it publishes, through the daily digest.

**Never loosened by this plan:**
- no invented data;
- no scraping;
- no client-side credentials;
- the `/api/out` contract and Impact wrapping stay as they are;
- no price or availability claim without a source.

**Status:** PRs 1–5 and 6a are live. Auto-promote (rule D) runs with `AUTOPROMOTE_ENABLED` on; the rules are in `SAFE_PUBLISHING_RULES.md` → D. **Only 6b remains: the Stage 4 / E maintenance auto-merge.**

- **Owner decision (2026-10-02): 6b stays unbuilt until rule E's precondition is close to met.** Stage 3 has 1 of the 10 clean human merges E requires (#1151 merged; #1184 was closed). #1184's leftover branch has blocked the repair lane since 2026-09-28.

**Rule E, to build in 6b:**
- **What can merge:** Stage 3 may merge `generated_artifact_stale` repairs only.
- **When:** only when the diff equals the `GENERATED_ARTEFACTS` regeneration output byte for byte, and after `test:mvp`, the artefact's own check and the diff allowlist pass.
- **Precondition:** 10 Stage 3 PRs human-merged with no edit or revert.
- **Stays human:** `provider_url_dead`, `workflow_unhealthy` and every `risk:red` finding.
- **Switches:** behind `STAGE4_ENABLED` (default off) and `AUTOPUBLISH_ENABLED`.

**Milestone 1 (still open):** only the owner-supplied ruleset snapshot in `docs/OPERATIONS.md` → Automation App identity rollout remains.

**Open from the 2027 launch-readiness milestone** (shipped 2026-09-24, #1125–#1128):
- **Owner:** submit `/sitemap-index.xml` in Search Console and Bing (checklist in `docs/DEPLOYMENT.md`).
- **Owner, optional:** the three `TODO(Ollie)` first-hand lines from the longform pass.
- **Considered and not changed:**
  - Raising the artist-city floor from 2 to 3 dates, which would drop about 110 sitemap URLs. Revisit if Search Console flags duplicates.
  - Ranking buttons by price instead of disclosing the affiliate-first order.

## Maintenance loop

Stages 1–3 are live (mechanism in `docs/OPERATIONS.md` → Stage 3). Stage 3 (`work-queue-repair.yml`) handles `generated_artifact_stale` and, since 2026-10-02, `event_needs_provider_url` (missing or unverified SeatGeek destinations, at most 20 event IDs per artist through the strict API verifier; it never changes `verification_status` or infers tour labels). It opens one PR per issue and never merges; every PR needs a human review and merge.

**Still open:** genuine production runs, human review and merge of their PRs, and proof the sensors recover.

**Stage 4 gates:**
- genuine Stage 3 production evidence;
- a measured false-positive rate;
- proven rollback;
- a demonstrated owner bottleneck removed.

Even with every gate met, Stage 4 covers only change classes that can be verified against a fixed file allowlist. Never weaken a validator or lane to make the worker's job easier, and keep the group-A auto-publish paths in `SAFE_PUBLISHING_RULES.md` unchanged.

## Parked: former scale roadmap (parked 2026-09-23)

Revisit when the auto-ingest plan is done or measured scale forces it.

Git stays the canonical event store, with generated, purpose-built read artefacts at runtime. Cloudflare Pages' 25 MiB per-asset limit is the hard constraint on a monolithic `events.json`.

- **M2, runtime data plane:**
  - Replace full-dataset reads in `/api/out`, `/api/shows`, the city/venue/artist-city routes and `/api/health` with bounded generated read models.
  - Add size budgets and before/after benchmarks.
  - Eventually stop deploying `events.json`.
- **M3, discovery artefacts:** static sitemaps, a generated `llms.txt` and bounded browser search data.
- **M4, commercial measurement:**
  - Reconcile clicks/SubIds and conversion where that can be defended.
  - Check Ticket Liquidator pricing readiness per `docs/PROVIDER_DATA_POLICY.md`.
- **M5, scale ingestion:** reduce owner work that grows with inventory (lifecycle, cancellations, reconciliation, escalating ambiguous matches).
- **Checkpoints:**
  - Measure at about 5k events.
  - Finish M2 and M3 before about 10k.
  - Reassess at about 20k.
  - Do not design for 100k.

## Proposed, not scheduled (owner approval needed)

- **Price alerts by email:** don't build until 100–200 `price_alert_interest` signups arrive within a quarter (there were 2 as of 2026-08-04). On-site price history and the interest counter are already live. The design is on branch `claude/price-alert-design-4p8rd9`.
- **Output-aware provenance fingerprints:** editing a shared helper advances the published date on every route that reaches it, even when the output is unchanged. This is accepted as the conservative choice. A fix would mean fingerprinting rendered output against a fixture and migrating every recorded hash.
- **Venue `PostalAddress` enrichment:** event structured data carries only city and country. This needs a verified venue-address source; never guess or scrape addresses.

## Explicitly parked

None of this is work until it is separately scoped and owner-approved. Unparking lifts the scope freeze, not the verification rules.

- **Wider event-page indexing.** Event pages are noindex, except the frozen 30-page pilot (`docs/ROUTE_INDEXABILITY_POLICY.md` → Event).
- **Live inventory, and "cheapest" or "guaranteed availability" claims.**
- **Providers beyond SeatGeek, Vivid Seats, TicketNetwork, Ticket Liquidator and StubHub International.** Each would need a verified feed, written usage rights and scoped work.
- **A provider abstraction layer.** The old scaffolding was removed on 2026-10-02. Build one only with a real integration scoped first.
- **Splitting `functions/[[path]].js` into route modules.** This needs its own plan before any code moves.
