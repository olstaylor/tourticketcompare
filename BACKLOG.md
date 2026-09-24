# TourTicketCompare Backlog

Last updated: 2026-09-24 (the owner-requested 2027 launch-readiness milestone shipped: all five phases merged through #1125, #1126, #1128 and #1127 and are live; no existing priority reordered or re-scoped. Previously 2026-09-23: engineering track replaced by the owner-approved auto-ingest plan, with the owner's five amendments and a build order of PR 3 → 1 → 2 → 4 → 5 → 6; the former scale roadmap's Milestones 2–5 parked beneath it verbatim and Milestone 1's open verification carried as one line; `SAFE_PUBLISHING_RULES.md` deliberately unchanged until PR 6. Previously 2026-09-22: roster-growth batch recorded by agent under item 3 — ten shells created and then promoted the same session after the owner browser-confirmed all 20 destinations; names recorded here because the manifest is gitignored, plus the three candidates deliberately not taken, the Oasis 0-upcoming-Ticketmaster caveat, a process note on the title-length audit only running on indexable pages, and the shell-count fact returning to 7; no priority reordered or re-scoped. Previously 2026-09-21: Milestone 1 verification results recorded by agent — both step-3 proofs observed, #1067 refused and #1068 published under the active ruleset, leaving only the owner-supplied snapshot; earlier that day, Milestone 1 status corrected by agent — the automation App has been live since 2026-09-18 and the ruleset was activated 2026-09-21, so only verification remains; earlier the same day, fact-correction pass by agent — `needs_recheck` totals and resale split recounted from source, 2026-09-09 roster batch recorded as promoted, shell list reconciled with `artists.json`, Milestone 1 recorded as merged-but-owner-blocked, closed `events-index.json` item trimmed to the audit trail; no priority reordered or re-scoped). Previously 2026-09-16 (engineering roadmap reorganised with owner authorisation; `events-index.json` consistency check shipped — fact recorded by agent; `needs_recheck` total recounted from source 2026-09-13 by agent; maintenance-loop Stage 3 shipped 2026-09-12 — fact recorded by agent; stages 1 and 2 shipped 2026-09-11; completed items moved out of the active list). Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Historical detail for closed items lives in the linked PRs and git history, not here.

## Active priorities (in order)

Items 1–4 are **operational** (owner + gated tooling), not engineering. The engineering track is the five-milestone scale roadmap below; the maintenance loop is retained as shipped capability with separate evidence gates. Each item stays here until verifiably done.

### 1. Affiliate-pivot owner follow-ups (2026-07-02)

1. **Post-deploy verification:** confirm `/api/out?artistSlug=<slug>&provider=ticketmaster` 302s plain and `provider=seatgeek` 302s to the Impact tracking URL; confirm no `utt.impactcdn.com` requests in devtools; browser-verify the 7 swapped plain Ticketmaster artist URLs and 16 SeatGeek performer-page URLs if not already done (lists in `data/provider-identities.json`).
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in the Cloudflare dashboard (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. **Price snapshot operations:** both Cloudflare display flags are enabled. Continue monitoring scheduled summaries. **SeatGeek price snapshots are permanently disabled (2026-07-15, owner-confirmed):** the SeatGeek API returns null pricing statistics for this client and never will; SeatGeek stays CTA-only. Artist-level Vivid Seats entries remain separate scope.
4. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" **in that same PR**.
5. **Conversion-weighted page ranking stays blocked (fact carried over 2026-09-12 from the 2026-09-02 discoverability review, whose narrative is now in git history).** Two owner inputs were never supplied and no canonical document owned them: a Search Console query×page and Page Indexing/Coverage export for the same property and window, needed for cannibalisation analysis; and a defensible post-cutover reconciliation between client CTA intent and server redirect receipts. At the review's last read the valid post-20-August window held 5,541 successful receipts against 87 client CTA-intent events, with only 42 receipts attributed by its bounded landing join, so page-level conversion rates have no honest denominator. The redirect-measurement contract and the default-off SubId procedure that gates per-click reconciliation live in `docs/COMMERCIAL_FUNNEL.md`; the intermittent Pages CPU-limit finding from the same review is in `docs/OPERATIONS.md` → Known incidents.
6. **Residual Ticket Liquidator redirect safety failures (fact carried over 2026-09-12 from the same review).** It flagged a concentrated stream of `impact_tracking_url_failed_safety_check` outcomes as a P0 investigation: separate genuine retry/automation bursts from the residual per-provider failure rate, aggregate-only, and keep the redirect safety gate in place. The signal exists only in `functions/api/out.js`; no canonical document owned this follow-up. Do not change the tracking-URL contract on this evidence alone — confirm the intended Ticket Liquidator contract first, and only if the non-burst stream points to an upstream or configuration change.
7. **GA4 Internal Traffic exclusion is still in Testing (fact carried over 2026-09-12 from the same review).** It was deliberately left unpublished pending an IP-scope review, so known internal testing is not yet excluded from GA4. D1 remains the authoritative successful-redirect measure either way (`docs/COMMERCIAL_FUNNEL.md`), so this affects GA4 reporting hygiene, not the funnel of record.

### 2. Impact provider operations — TicketNetwork, Ticket Liquidator, StubHub International

Continuing operations following the 2026-07-13 activation:

1. Monitor the nightly scheduled event-sync runs (see `docs/OPERATIONS.md` for the schedule) via their auto-merged PRs and `reports/provider-sync/`; for manual dispatch, run preview before apply, review its PR, and browser-check new sample destinations across markets.
2. Monitor the hourly TicketNetwork and StubHub International exact-ID price snapshot schedule (24-hour freshness constant, with prices past 12h labelled "last checked N hours ago"; each apply run ends with a 90-day history prune). Ticket Liquidator must stay price-disabled until its catalog supplies numeric `CurrentPrice`.
3. Monitor catalog/campaign access and tracking. Set the matching public flag explicitly to `false` on a provider/API mismatch or redirect failure.

StubHub International is separate from StubHub US/Canada.

### 3. Roster growth (2026/27 tours)

Run `npm run artists:onboard:propose` with target artist names (US/EU major tours), create shells, human-review the manifest, then `npm run artists:promote:batch --write` (≤20/PR, per-artist human browser spot-check checklist in the PR body). Event enrichment follows via the existing `seatgeek:propose` / `seatgeek:enrich` and TM new-show pipelines. Never auto-publish.

**Candidate shortlist captured 2026-07-29** (manifests live in gitignored `artifacts/` and do not survive environment recycling, so names are recorded here): identity already captured cleanly via `artists:onboard:propose` for **Gracie Abrams, Niall Horan, Doja Cat, Sombr, Latto, John Summit** — all six have since been promoted (see Recently completed). Next candidates for a fresh `roster:forecast:candidates` pass: re-run against current data, since the indexable surface continues to decay as dates pass (`npm run roster:forecast`). (Fact corrected 2026-09-11: this sentence still said the last roster-growth batch was “several weeks old”; the most recent batch is the 2026-09-09 one recorded below.)

**Batch captured 2026-08-26** (fact added by agent; manifest `artifacts/onboarding/batch-2026-08-26.json` is gitignored, so names are recorded here). Ten shells created, all `review_required`/noindex/no CTA, each captured with an exact-name match on both SeatGeek and Ticketmaster: **Don Omar, Luke Combs, Blue October, Pentatonix, Tyla, Nothing But Thieves, Trivium, Sabaton, In Flames, Beartooth**. Shortlisted from the `roster:forecast:candidates` ranking by headliner status — that ranking scores at-risk-page coverage, not tour scale, so it surfaced support acts (Avery Anna and Treaty Oak Revival share the Luke Combs package's exact market fingerprint; Initiate, Koyo and Senses Fail share another) and club-tier names, none of which were taken. **Promoted 2026-08-26** (fact updated by agent): the owner browser-checked all 20 destinations and confirmed them, and `artists:promote:batch --write` added the registry entries and both artist-level CTAs for all ten. All ten are now `indexable_with_substantial_content` with 0 event records. Merged as PR #774 on 2026-08-26 (which also carried the shell commit, superseding PR #771). **Fact corrected 2026-08-26:** a promoted artist with 0 events renders the empty-state watchlist board and **no CTA button** — the artist-level `VERIFIED_TICKET_LINKS` entries exist and resolve, but `emptyStateProviderCta` is `null` and `renderProviderFallback` only runs when the board has shows, so the buttons appear once dates land. Verified in production. This is the same state beyonce, raye and tate-mcrae are in; the "artist-level CTAs only" wording used for them elsewhere overstates what an empty board shows.

**Batch captured 2026-09-09** (fact added by agent; manifest `artifacts/onboarding/batch-2026-09-09.json` is gitignored, so names are recorded here). Fifteen shells created, all `review_required`/noindex/no CTA, each captured with an exact-name match on both SeatGeek and Ticketmaster: **Polyphia, Stella Lefty, TobyMac, Saint Levant, The Airborne Toxic Event, Andrea Bocelli, Morat, Missio, VNV Nation, Michelle Branch, Yuridia, FKJ, Sylvan Esso, Blondshell, Pink Martini**. Owner confirmed all 30 destinations on 2026-09-09 after a fresh API capture in workflow run 34371114685. **Promoted (fact updated 2026-09-21):** all fifteen now read `indexable_with_substantial_content` in `public/data/artists.json` with verified registry entries and both artist-level links, and per `PROJECT_STATUS.md` all fifteen now carry event dates — fourteen from the 2026-09-10 Ticketmaster run and yuridia's seventeen since. This batch needs nothing further.

Shortlisted from a `roster:forecast:candidates` run by re-screening every candidate against the same primary-attraction rule the Ticketmaster sync applies (`not_primary_attraction`): the reporter's own coverage ranking again surfaced support acts, and the screen removed them on evidence rather than judgement. Eight of the top thirteen ranked candidates were opening acts — RJ Pasin and Ladrones (0% primary, headlined by Polyphia), Jeremy Camp and Katy Nichole (0%, TobyMac), Treaty Oak Revival and Wyatt McCubbin (0%, Luke Combs), Don Broco and Magnolia Park (0%, Beartooth) — alongside Avery Anna (8%) and Shenandoah (14%), both on the Luke Combs package. Whitechapel (70%), Insomnium (55%) and Amorphis (45%) are genuine headliners on co-headline bills and were left out of this batch only because the sync withholds the dates where they are billed second; they remain onboardable. **Wheeler Walker Jr.** ranked well and screened clean at 100% primary but was held back for an owner brand-safety call: the act is an explicit-content comedy country project whose album titles are profane.

**Batch captured 2026-09-22** (fact added by agent; manifest `artifacts/onboarding/batch-2026-09-22.json` is gitignored, so names are recorded here). Ten shells created, all `review_required`/noindex/no CTA, each captured with an exact-name match on both SeatGeek and Ticketmaster: **Oasis, Hans Zimmer, Trans-Siberian Orchestra, Kenny Chesney, Death Cab for Cutie, Alan Walker, The Psychedelic Furs, Eros Ramazzotti, Atmosphere, The Warning**. Oasis was the owner's named request; the other nine were taken from a fresh `roster:forecast:candidates` run, screened to headliners the reporter itself rates at 100% primary-attraction. **Promoted 2026-09-22** (fact updated by agent, same session): identity was re-captured with `--allow-existing-shells` and came back byte-identical to the first capture; the owner browser-confirmed all 20 destinations and `artists:promote:batch --write` added the registry entries and both artist-level CTAs for all ten. All ten now read `indexable_with_substantial_content` with 0 event records, so each renders the empty-state board and **no CTA button** until dates land. Shell and Promote landed in one PR, as PR #774 did on 2026-08-26.

**Oasis carries a known caveat.** At capture it had 6 upcoming SeatGeek events but **0 upcoming Ticketmaster events**, which does not meet the onboarding skill's "resolves *and* shows active or upcoming events" bar for a Ticketmaster destination. The owner confirmed the TM artist page resolves and chose to publish both lanes rather than hold it or go SeatGeek-only. The TM lane is plain and unmonetized, so a dateless page degrades softly; revisit if TM dates have still not appeared by the next roster pass.

**Event ingestion ran the same day (2026-09-22).** The dry-run recogniser over all 68 registry artists recognised 2,032 candidates: **116 proposed, 1,916 withheld**. The proposed rows were applied through the sanctioned `sync-tm-events-write-pr.mjs` path (events 1427 → 1543), landing dates for six of the ten — trans-siberian-orchestra 50, alan-walker 23, the-warning 22, the-psychedelic-furs 14, death-cab-for-cutie 5, eros-ramazzotti 1 (plus 1 for fkj). Rows land `verified:false` / `availability not_checked`, so none of them claims a browser check nobody performed.

The other four are eventless for recorded reasons, not a defect: **oasis** returns no Ticketmaster events at all for attraction `K8vZ9171fw7` (consistent with the 0-upcoming caveat above), and **kenny-chesney** (20/20), **atmosphere** (10/10) and **hans-zimmer** (26 of 33) are almost entirely `status_not_onsale` — dates that exist but are not yet on sale. That clears itself; no action needed.

**The 1,916 withheld are not an approval queue.** Every withhold is a correctness rule firing, and the distribution says so: 2,427 of the 3,350 rule hits (72%) are duplicates of rows already in `events.json`, then `host_not_allowlisted` 256, `status_not_onsale` 239, `not_primary_attraction` 161, `missing_storefront_event_id` 105, `travel_package_listing` 48, and the missing-field codes. Two are owner tombstones. Nothing in that set can be "approved" without overriding a `SAFE_PUBLISHING_RULES.md` gate; the only one that is a genuine owner decision is `host_not_allowlisted`, which is an `out.js` allowlist question (the Bruno Mars `ticketmaster.com.mx` case, already recorded as deliberately excluded).

**City titles did not disambiguate by country (fixed 2026-09-22).** The Trans-Siberian Orchestra Birmingham US date took that city from 3 upcoming shows to 4, crossing `CITY_MIN_SHOWS`, and two unrelated pages — `/cities/birmingham-united-kingdom` and `/cities/birmingham-united-states` — began emitting the same `<title>`. The collision was latent, not new: city slugs, meta descriptions, breadcrumbs and `llms.txt` had always carried the country and only the title did not. `functions/[[path]].js` now qualifies a city title with its country when another **indexable** city shares the name, which is Birmingham alone today; Manchester and London have noindex twins and keep their year-labelled titles. Worth knowing: this would have failed the nightly `tm-new-shows-pr` lane on the same data, so it was a blocker either way.

**Process note for future promote batches:** `audit-internal-links.mjs` only checks title/description length on **indexable** pages, so an overlong `seo_title` cannot fail at Shell and first appears at Promote. Two titles overflowed the 60-char budget here (Trans-Siberian Orchestra 65, The Psychedelic Furs 61) and were shortened to the existing "Tickets & Dates" form that `five-finger-death-punch` already uses. Worth checking name length at Shell time rather than discovering it at Promote.

Three ranked candidates were deliberately not taken, and the reasons are evidence, not preference. **Brit Floyd** (#25) is a Pink Floyd tribute act and **Twilight In Concert** (#4) is a film-score event series rather than a touring artist — neither is an artist identity this roster should carry, and the proposal script's `COLLISION_PATTERN` catches neither by name. **As I Lay Dying** (#16) captured cleanly on both APIs and is held for an owner brand-safety call, on the same footing as Wheeler Walker Jr. above: founder and vocalist Tim Lambesis was convicted in 2014 of soliciting the murder of his wife. That is an owner decision, not an agent one; the shell was not created.

The reporter ranks by at-risk city/venue coverage, not by tour scale or announcement recency, and it carries no announcement dates — so this batch is "currently touring in markets the site already covers", which is what the available evidence supports. It is **not** a verified list of recently announced tours, and should not be described as one.

Remaining `review_required` shells awaiting Promote: **sabrina-carpenter, lady-gaga** (held pending live dates), **coldplay** (SeatGeek-first, international-domain caveat — 1 upcoming SeatGeek event at last capture; **fact corrected 2026-09-09:** the-weeknd was promoted 2026-09-08 after verified provider checks and is no longer a shell), **system-of-a-down, laura-pausini** (2026-07-31 batch, owner browser-checked TM identities; identity captured cleanly 2026-08-21 but held back at Promote on 1 and 0 upcoming SeatGeek events respectively — promotable with `--slugs` whenever dates land). Before Promote for any of these: regenerate an API-captured SeatGeek/Ticketmaster manifest with `--allow-existing-shells`, confirm captured identities match reviewed destinations, and complete the per-artist browser checklist. **rush** and **muse** also need manual identity resolution before they can be promoted, and **journey** needs onboarding from scratch: SeatGeek returns no exact-name performer match for any of the three, only tribute acts and unrelated names, so `artists:onboard:propose` refuses them by design. (**Fact corrected 2026-09-21:** this sentence grouped all three as un-onboarded. `public/data/artists.json` holds **7** `review_required` shells — the five named above plus **rush** and **muse**, which do exist as shells and are blocked only at identity resolution — while **journey** has no record in `artists.json` at all.) (**Fact re-confirmed 2026-09-22:** the shell count briefly read 17 while the 2026-09-22 batch sat unpromoted; those ten were promoted the same day, so it is **7** again — the five named above plus rush and muse. The rush/muse/journey identity-resolution point is unchanged.)

The other six of that batch — **karol-g, foo-fighters, metallica, my-chemical-romance, teddy-swims, five-finger-death-punch** — were promoted on 2026-08-21 with verified registry entries (PR #738).

### 4. Routine data hygiene (recurring)

- **`needs_recheck` provenance:** **275** events retain this historical confidence state (fact corrected 2026-09-21; was 267 on 2026-09-13, 261 on 2026-09-11, 255 on 2026-09-10, 151 on 2026-09-02, 81 on 2026-08-23) (per-artist breakdown: `PROJECT_STATUS.md` → Per-artist status). It is no longer a manual CTA queue: stored destinations go through the runtime host, protocol, event-ID, and redirect checks automatically; rows without a usable destination remain suppressed. **48** of the 275 have no independently verified resale provider, and **36 of those are upcoming** — the other 12 are past (split recounted from source 2026-09-21; was 47/40 on 2026-09-13). Those thirty-six still render their plain Ticketmaster button — all 36 carry a Ticketmaster or `source_url` destination, so `eventLinkPublishable` passes — and none of them carries a stored `seatgeek_url`, so what is missing is the resale alternative and the affiliate lane, not the ticket link. Ingestion outruns resale verification — the 2026-09-10 runs landed 251 Ticketmaster dates across 16 artists and 21 more for Harry Styles — so this figure tracks ingestion volume rather than the calendar and will keep climbing after each large run until the verification path in item 2 catches up. Recount the resale gap with the `verification_status` plus `provider_links[*].verified` test `scripts/validate-status-counts.mjs` uses; only the totals it asserts are machine-pinned, not this split. Any claim about a date rendering **no** CTA must instead be computed with `eventLinkPublishable` and `providerEventPublishable` in `functions/[[path]].js`, across all providers including Ticketmaster — on current data only 4 recheck rows publish no lane at all, and all four are past (re-verified against the runtime predicates 2026-09-21: unchanged rows, and 13 rows still fail `eventLinkPublishable` while publishing another lane).
- **Guide source re-verification (owner-completed 2026-09-21; standing human-only task).** The owner re-checked the cited pages and confirmed them, so every `last_checked` date across all 18 guides in `content/guides/` now reads 2026-09-21 (71 citations, resolving to 28 unique URLs — 13 of them shared across more than one guide). `public/data/guides-content.json` was regenerated from source; `content:provenance` reported no copy change, so no guide's published date or `lastmod` moved — a source re-check is not a content revision. Previous state, for the record: 2 sources at 2026-07-13, 1 at 2026-07-14, 13 at 2026-07-22, 2 in August.

  The constraint that made this human-only is unchanged: the source domains (FTC, Ticketmaster, SeatGeek, Vivid Seats help centres) return 403 through the agent environment's proxy, so an agent cannot perform this check and must not record one. `npm run guides:sources:check` covers link reachability, not whether a claim still matches the page. **Never bump a `last_checked` date without actually opening the page.**
- **Blank tour labels (fact corrected 2026-09-24):** **1,042** events on `indexable_with_substantial_content` artists in `public/data/events.json` have an empty `tour_name`, across **56** artists (995 of them upcoming, across 53 artists; recounted from source 2026-09-24 — a 2026-09-19 audit had 801 across 41, and Ticketmaster ingestion since then has added more). This note previously described the scope as only the JAY-Z Inglewood/London rows, John Summit's Lollapalooza aftershow and a handful of Bad Bunny/Jelly Roll/Post Malone rows; those are still in the set (JAY-Z's rows remain owner-accepted blank, John Summit's aftershow deliberately unlabelled), but they are a small fraction of it. Most of the gap is the roster-growth batches (2026-08-26, 2026-09-09 and later), whose Ticketmaster Discovery ingestion leaves `tour_name` blank by design — largest: blue-october 66, teddy-swims 51, trans-siberian-orchestra 50, don-omar 39, stella-lefty 36, trivium 35, tobymac 35, michelle-branch 35, harry-styles 35, five-finger-death-punch 32. Backfilling needs verified tour names per event, not a bulk edit: never infer tour names from URL slugs or `event_name` strings (which mix in support-act billing and other non-tour text).
- **`events-index.json` consistency (enforced; gap recorded 2026-09-12 in review of PR #963, closed 2026-09-14).** `validate-partitions.mjs` compares `public/data/events-index.json` against `public/data/events.json` by ID multiset, by indexed field value and by row order, and is itself in the lanes (`events:validate:partitions` in `quick`, its self-test in `units`, so both are in `test:mvp`). The standalone timezone backfill rewrites the index alongside the partitions. **Every failure is fixed by regenerating with `npm run events:partition`, never by editing the file.** (Narrative trimmed 2026-09-21 — closed-item detail now lives in the PR and git history, per this file's own rule.)
- **Tombstone dedup deletions:** when deleting a row from `events.json` that Ticketmaster still lists, add its ids and/or venue/date to `data/deleted-events.json` in the same change (see `docs/PROVIDER_SYNC.md` and `docs/OPERATIONS.md` → Known incidents).
- Review the rolling automation dashboards (`automation:daily-audit`, `automation:data-sync`, `automation:tm-discovery`, `automation:health`, `automation:prelaunch-validation`) and any withheld rows from the new-show PRs. Discrete `work-queue` issues are a separate, bounded queue — see the engineering track below.

## Engineering track — auto-ingest plan (owner-approved 2026-09-23)

Goal: (a) the site is easy to use and trusted; (b) new major artists are ingested automatically when a tour is announced, with SEO pages; (c) the site runs and repairs itself with minimal owner intervention. The owner reviews auto-published output **after** it publishes, through the daily digest, not before.

**Non-negotiable, never loosened by this plan:** never invent data; never scrape; no client-side credentials; the `/api/out` contract and Impact wrapping; no price or availability claim without a source.

**Binding status until PR 6 merges.** `SAFE_PUBLISHING_RULES.md` is unchanged by this entry. Its "new artists are never auto-published" rule, item 3's "Never auto-publish", and the Stage 4 deferral under "Maintenance loop" below stay binding until the rules diff ships in PR 6.

### Target rules (land in `SAFE_PUBLISHING_RULES.md` with PR 6)

**D. Auto-promote (new artists).** One auto-merged PR per run creates the shell and promotes it, at most 5 artists a day and 20 a week, only when every criterion holds. Any failure makes the candidate a `human-required` proposal; it is never retried on looser criteria.

1. Exact normalised-name match **and** an exact ID on both Ticketmaster (attraction) and SeatGeek (performer), re-captured byte-identical in the same job.
2. The name and both API names pass the shared collision pattern (forecast ∪ propose, plus `in concert|tribute|floyd`), and neither the slug nor either ID is in `data/artist-denylist.json`. **(Owner decision 2026-09-24, fact recorded by agent.)** Ticketmaster must classify the act as `Music` (a missing classification fails), and never as a tribute act; the first live screen had passed a comedian and a tribute band. Alaska Thunderfuck and Black Jacket Symphony were added to the denylist the same day.
3. Primary-attraction share ≥ 0.80 over ≥ 8 upcoming Ticketmaster events. Evidence: support acts screened at 0–14% and co-headliners at 45–70% (2026-09-09); every 2026-09-22 pick was 100%.
4. **(Owner amendment 1.)** ≥ 3 upcoming Ticketmaster events in ≥ 2 cities, counting events that are on sale **or** `offsale` with a future public on-sale time; SeatGeek ≥ 1 upcoming; both destinations are on the `out.js`-allowlisted host and are not confirmed dead. **(Owner decision 2026-09-23, fact recorded by agent.)** The bar was "return 2xx", but both providers answer every scripted request with 401/403/429, so a block now counts as "exists, not script-verifiable". Only a 404/410 or no response fails. On-sale status gates CTAs, not promotion. Evidence: Oasis (0 TM upcoming), system-of-a-down and laura-pausini (1 and 0 SeatGeek upcoming).
5. The rendered shell passes title ≤ 60, description, uniqueness and placeholder checks at Shell stage. Evidence: Trans-Siberian Orchestra (65) and The Psychedelic Furs (61) overflowed only at Promote.

**(Owner amendment 5.)** A newly promoted artist is ingested in the same job — the Ticketmaster recogniser and SeatGeek enrichment run for that slug before the job ends — so announcement to dated, indexable page is under 24h rather than waiting for the next 04:00 run.

**(Owner amendment 4.)** The auto-merge gate for D permits exactly one kind of change in `functions/api/out.js`: **additions** to `VERIFIED_TICKET_LINKS`. Any other line changed in `out.js` withholds the merge.

**Brand safety.** A hard-block denylist (`data/artist-denylist.json`, seeded with As I Lay Dying, Wheeler Walker Jr., Brit Floyd, Twilight In Concert) plus the daily digest. No approved source encodes a criminal conviction or profane album titles, and scraping for them is off-limits, so an As I Lay Dying / Wheeler Walker Jr.-type case will pass every automated check; the owner catches it in the digest within 24h and demotes.

**E. Maintenance auto-merge (replaces the Stage 4 gate).** Stage 3 may merge `generated_artifact_stale` repairs only, whose diff equals the `GENERATED_ARTEFACTS` regeneration output byte for byte, after `test:mvp`, the artefact's own check and the diff allowlist pass — and only once 10 Stage 3 PRs have been human-merged with no edit and no revert. `provider_url_dead`, `workflow_unhealthy` and every `risk:red` finding stay human.

**Safety net (lands before D or E can run).**

- **Kill switch.** Repo variables `AUTOPUBLISH_ENABLED` (all automated merges) and `AUTOPROMOTE_ENABLED` / `STAGE4_ENABLED`, default off, read at job start **and** immediately before merge.
- **Rollback sensor.** `autopublish-health.yml` opens an auto-demote PR for a D artist that fails liveness, the denylist or the duplicate-title check. **(Owner amendment 3.)** Zero upcoming dates means `noindex,follow` and out of the sitemap only — never a demotion.
- **Digest.** A daily `automation:autopublish-digest` issue lists every auto-merge in the last 24h, each with a one-line demote command, and flags a lane expected to publish that wrote nothing.
- **Indexability.** A D artist is `index,follow` only while it has ≥ 3 upcoming dates; owner-promoted artists keep the durable-URL rule. Together with the daily cap this bounds scaled thin content.

Past failures each net catches: 08-26 zero-event indexable pages → D-tier noindex; Oasis → criterion 4; 09-09 support acts → criterion 3; 09-22 title overflow → criterion 5; Birmingham duplicate `<title>` → sensor duplicate-title check; 09-11 red `main` → kill switch plus the existing correlated-failure report; 09-18 green-but-published-nothing sync → digest's zero-write flag.

### Build order — six PRs, each ≤ 400 lines, each shippable alone

1. **PR 3 — Artist-page honesty and zero-event handling** (first). Empty `[]` partitions for zero-event indexable artists, artist-level CTA on the empty board, empty-state claims rewritten (owner copy), D-tier noindex gate. **Protected: `functions/[[path]].js`.**
2. **PR 1 — Kill switch, ledger and digest.** Guard wired into the five group-A lanes. No protected files.
3. **PR 2 — Rollback sensor and auto-demote.** Demote flips `artists.json` / `catalog.json`. **(Owner amendment 2.)** Must prove, or implement, that `/api/out` refuses a demoted artist's artist-level redirect; **PR 6 is blocked until this is done.** Protected data; `out.js` only if suppression has to be implemented there.
4. **PR 4 — Screen, propose-only.** Denylist, shared collision pattern, primary-share and event thresholds, Shell-stage SEO audit, scheduled forecast. No protected files.
5. **PR 5 — Offsale-window ingestion.** Recogniser ingests `offsale` rows with a future public on-sale as no-CTA cards; field-sync may advance status to on-sale from the same event ID. **Protected: `functions/[[path]].js`.** `test:mvp` required in-job.
6. **PR 6 — Switch-on** (split by the owner 2026-09-23, fact recorded by agent: **6a** auto-promote D with same-job ingestion, the `out.js` additions-only gate and the rules diff; **6b** the Stage 4 / E maintenance merge). Auto-promote workflow with same-job ingestion, Stage 4 merge behind its flag, the `SAFE_PUBLISHING_RULES.md` diff. **Protected: `out.js`**, written only through the existing promote writer and the additions-only gate. Flags default off; the owner switches them on.

**Milestone 1 (carried over, still open):** the App identity and ruleset are live and both proofs are observed (#1067 refused, #1068 published); only the owner-supplied ruleset snapshot in `docs/OPERATIONS.md` remains. Evidence under `docs/OPERATIONS.md` → Automation App identity rollout. A required check can go *missing* rather than red on human- and agent-authored PRs (#1066); automation lanes are insulated by `earnRequiredCheck`'s explicit dispatch — detail in `docs/OPERATIONS.md` → Known incidents.

### 2027 launch-readiness milestone (owner-requested 2026-09-24) — shipped 2026-09-24

Goal: "safe-to-scale" ahead of the 2027 launch — prices display reliably, pages are rich and indexable where they should be, longform reads as human-written, adding artists needs no babysitting. All five phases were built, reviewed (Codex on the first two PRs, an agent review on the last two) and merged to `main` the same day; each is live. Owner direction for the milestone: keep schema-offers exception C, and favour growth and discoverability over this repo's more restrictive process rules, while the hard limits hold (no invented data, `/api/out` untouched, no price we don't have).

| Phase | PR | What shipped |
|---|---|---|
| 0 audit | [#1125](https://github.com/olstaylor/tourticketcompare/pull/1125) | [`docs/audits/2026-09-launch-readiness.md`](docs/audits/2026-09-launch-readiness.md): price coverage, sitemap classification, content ranking, UX issues, ranked fix list. |
| 1 missing prices | #1125 | City pages query prices; a failed D1 read renders silence, not "no snapshot"; writers record every lookup in `provider_price_checks`, and an unpriced card says which lanes were checked and when; daily `price-coverage-report.yml` (≥ 90% coverage, ≤ 25% stale). |
| 2 indexability | #1125 | Pre-on-sale verified resale buttons; never-dated owner-promoted artists `noindex` (ended tours stay indexed with 10 recent dates); expired cities/venues 301; duplicate-H1 audit (Birmingham fixed); city/venue → artist-city links; `/sitemap-index.xml` with per-type sitemaps; `public/price-history.js` and a once-per-page form template. |
| 3 ingestion and self-repair | [#1126](https://github.com/olstaylor/tourticketcompare/pull/1126) | Render CPU cut 4–7× (fixes the production 503s; see `docs/OPERATIONS.md` → Known incidents); one-file artist requests (`data/artist-requests.json`, relaxed D3/D4 only); daily `site-health.yml`; runbook `docs/ARTIST_INGESTION.md`. |
| 4 UX, trust and copy | [#1128](https://github.com/olstaylor/tourticketcompare/pull/1128) | Mobile board tools; one primary hero button; owner-approved copy P1–P11 ([`docs/audits/2026-09-phase4-ux-copy-proposals.md`](docs/audits/2026-09-phase4-ux-copy-proposals.md)), including the one "How we make money" disclosure that states the button order. |
| 5 longform | [#1127](https://github.com/olstaylor/tourticketcompare/pull/1127) | All 18 guides and 4 published blog posts refined, with five stale claims corrected ([`docs/audits/2026-09-phase5-longform-sample.md`](docs/audits/2026-09-phase5-longform-sample.md)). |

**Still open from the milestone (owner):**
- Submit `/sitemap-index.xml` in Search Console and Bing (checklist in `docs/DEPLOYMENT.md`).
- Dispatch `price-coverage-report.yml` once so it creates its `automation:price-coverage` issue, and confirm the next snapshot-writer summaries show `checks_recorded > 0`.
- Optional: the three `TODO(Ollie)` first-hand lines listed in the Phase 5 notes.

**Considered and not changed:**
- Raising the artist-city floor from 2 to 3 dates. It would drop about 110 sitemap URLs, against the growth direction; revisit if Search Console reports them as duplicates.
- Social cards for new routes still need a human merge of the daily work-queue repair PR, because Stage 4 / E auto-merge is unbuilt. Pages meanwhile use the shared card.
- Ranking buttons by price instead of disclosing the affiliate-first order (P4 chose disclosure).

### Parked — former scale roadmap (owner-approved 2026-09-16; parked 2026-09-23)

Not scheduled. Kept verbatim so the reasoning survives; revisit when the auto-ingest plan above is delivered or measured scale forces it.

Goal: grow useful, commercially viable event inventory without owner workload growing proportionally. Optimise **useful inventory × qualified traffic × outbound conversion × affiliate value, with minimal owner intervention**.

Operating model: legitimate event discovered → safely ingested → provider coverage established → purpose-built runtime/read artefacts generated → worthwhile pages published/indexed → inventory maintained → commercial outcomes measured → owner intervention only for ambiguous, unsafe or commercially consequential cases.

#### Architectural assumptions

Git remains the canonical, reviewable source of event data for the foreseeable scaling horizon. The intended pattern is **Git-reviewed canonical data → deterministic generation → validation → purpose-built deployable runtime read artefacts**. D1/KV are not the chosen canonical replacement. Revisit these assumptions only when measured evidence materially changes the case.

The runtime must stop depending on one monolithic `public/data/events.json`. Cloudflare Pages' 25 MiB individual static-asset limit is a hard constraint. The earlier review measured approximately 3.73 MB for 1,391 records (an approximate crossing near 9.7k events at that density, not a capacity guarantee). CPU/memory attribution remains unproven until Milestone 2 measures it. Ordinary lifecycle/provider messiness should increasingly be retried, reconciled, safely degraded, suppressed or deterministically repaired.

#### Milestone 2 — Scalable runtime event data plane

Preserve Git canonical truth while replacing full-dataset runtime consumption with bounded, access-pattern-specific generated read models. Cover `/api/out`, `/api/shows`, city, venue and artist-city routes, `/api/health`, and other hot request paths discovered during implementation.

Do not replace `events.json` with another monolithic full-event lookup: `events-index.json` is useful at current scale but repeats the same whole-dataset scaling pattern. Include a CPU/runtime tier check, baseline measurements, before/after benchmarks, deployed artefact size budgets enforced by validation, and eventual removal of `public/data/events.json` from the deployed runtime surface after all consumers migrate.

#### Milestone 3 — Static/generated discovery artefacts

Generate a static sitemap index and sitemap files, generated `llms.txt`, and bounded browser search data. Retire the per-event/full-dataset browser search fallback. Keep this separate from Milestone 2 so discovery work cannot delay runtime/deployment constraints.

#### Milestone 4 — Commercial measurement and provider value

Reconcile clicks/SubIds and measure landing/page → outbound → affiliate conversion/commission where supported. Analyse Search Console query × page data; attribute provider/artist/page value only where defensible. Do not invent attribution or treat raw server requests as visitor conversion rates. Preserve the operational owner inputs above and the contract in `docs/COMMERCIAL_FUNNEL.md`.

Investigate Ticket Liquidator pricing/feed readiness using the dry-run-first order in `docs/PROVIDER_DATA_POLICY.md`; this may run alongside other milestones when it touches disjoint surfaces. Rights alone do not establish numeric feed availability.

#### Milestone 5 — Scale ingestion and exception handling

Reduce owner work that grows with inventory: lifecycle classification, safe cancellation/postponement handling, deterministic provider/event reconciliation, ordinary expiry/off-sale handling, ambiguous-match escalation, fewer false-positive owner issues, and sensors aimed at real scale constraints. Preserve human review for ambiguity and commercial safety.

#### Scale checkpoints

- **~5k events:** measure runtime and generation costs; keep deployed artefacts bounded and test the access patterns above.
- **~10k events:** the current monolithic asset approaches its projected limit; complete the runtime/discovery migrations before reaching it.
- **~20k events:** use measured ingestion, generation and exception rates to identify the next constraint.
- **~100k events:** a future reassessment checkpoint, not a design target for this implementation. Do not design for 100k now.

## Maintenance loop — shipped capability and evidence gates

**Stages 1–3 are shipped on `main`. Stage 3 is implemented but not yet operationally proven through genuine production repairs.** Full mechanism lives in `docs/OPERATIONS.md`. Stage 4 is outside the five milestones and deferred.

### Stage 1 — reliability foundation (shipped 2026-09-11)

- **`test-mvp` is earned on every automated publish** — each lane dispatches Prelaunch Validation against its own pushed branch and merges only on green. It was also an owner-applied required status check on `main` from 2026-09-11, but that ruleset refused every automated merge even with the check green on the PR head, and was `disabled` from 2026-09-12. **Fact corrected 2026-09-21 by agent: the ruleset is active again from 2026-09-21 and both halves are now observed — a red human PR was refused (#1067) and an automation lane squash-merged under it (#1068), so a human can no longer merge a red head.** Evidence in `docs/OPERATIONS.md` → Automation App identity rollout.
- **`automation-health.yml`** (#941) watches all twelve scheduled lanes from outside, the three sensors included and reports three states no lane can see about itself: `failing`, `stale` (GitHub stopped invoking it) and `stalled` (still invoked, no longer reaching a pass/fail verdict — what a `timeout-minutes` breach looks like, since that ends as `cancelled`). Two or more lanes failing together is reported as a **likely shared cause, usually a red `main`**, rather than several provider defects.
- **The daily outbound-link audit was restructured** (#942) from a strictly serial loop to bounded per-host concurrency. The cap is per host, not global, so a burst never lands on one storefront and degrades its evidence into WAF blocks.
- **Daily-audit runtime incident closed (fact corrected by agent 2026-09-16):** the 2026-09-13 scheduled run met all five conditions, completing the audit in 14m07s and both dependent publishing jobs successfully. Production evidence and the remaining Discovery-diff scaling concern live in `docs/OPERATIONS.md` → Known incidents.

### Stage 2 — the work queue (shipped 2026-09-11)

- **Rolling `automation:*` issues remain operator dashboards** and are untouched by this layer. Discrete issues are the work queue; the dashboards are the complete view.
- Selected **machine-readable** findings become discrete issues labelled `work-queue`, `source:<sensor>`, `priority:P0`–`P3`, `risk:green|amber|red`, and one of `agent:ready` / `human-required`. No prose is parsed anywhere. Queue items never carry an `automation:*` label, which would collide with the dashboard writers.
- Fingerprints, deduplication, lifecycle (including holding an issue open while a pull request still references it), and two storm caps all exist and are asserted (#943).
- **Unsafe or ambiguous findings fail closed.** A red surface forces `risk:red` and strips `agent:ready`; an unknown finding type is not materialised at all; a link timeout or WAF response is never read as a dead URL.
- **`generated_artifact_stale` is the first and only production `agent:ready` type** (#944): P1, `risk:amber`, and raised **only** once the sensor has deterministically proved in the same run that regenerating fixes the failing freshness check. A red check on its own is never a finding.
- **`work-queue-repair.yml` is the only consumer of an `agent:ready` issue** (fact updated 2026-09-12; nothing consumed the queue until Stage 3 shipped). Stage 2 itself still writes issues and nothing else — no branch, no commit, no pull request, no model call.

### Stage 3 — bounded agent worker (v1 shipped 2026-09-12)

The contract, one run, unchanged from how it was scoped:

> take ONE supported `agent:ready` issue → revalidate it still holds → perform the bounded repair → run its required validation → open ONE pull request → stop.

`work-queue-repair.yml` (daily 04:50 + dispatch) does exactly that, and **supports `generated_artifact_stale` only**. Outcomes are explicit and terminal: FIXED (pull request opened), BLOCKED (names the missing evidence or dependency), NEEDS HUMAN (names the decision required), NO SAFE WORK (does nothing). Each is printed in the run log and posted once — deduplicated by fingerprint and outcome — to the originating issue, which the worker never closes.

Stage 3 must **not**, and v1 does not: merge, or enable auto-merge; touch anything labelled `risk:red`; handle finding types beyond those explicitly supported; broaden scope beyond the issue it took; invent or infer data; or modify protected commercial or provider surfaces (`functions/api/out.js`, affiliate logic, provider rights and allowlists, credentials, Cloudflare configuration, migrations, or records in `public/data/{events,artists,catalog}.json`).

**Every pull request it opens needs a human review and a human merge.** That is the deliberate v1 boundary, not a temporary gap: the worker holds no merge call at all, and its self-test asserts that absence so the capability cannot arrive by accident.

What makes the repair safe rather than merely bounded: the operation is looked up in the sensor's own fixed `GENERATED_ARTEFACTS` allowlist by artefact id, so no command, path or repair can enter through issue text; the issue's own copies of those strings are compared to the trusted entry and a disagreement stops the item; the whole working tree — not just the expected paths — is checked against the declared artefacts before anything is committed; and `npm run test:mvp` plus the artefact's own check must pass on exactly the proposed content first. Full mechanism: `docs/OPERATIONS.md` → Stage 3.

**Still open after v1, in order:** a real run against a real finding (the queue has carried no `agent:ready` item since the worker shipped, so the loop is proved by its self-test and an offline end-to-end rehearsal, not yet by production); then a decision on whether a second finding type is worth supporting, which is a new scope, not an extension of this one.

### Stage 4 — narrow auto-merge (deferred, outside the five milestones)

Before scoping this, require Milestones 2 and 3 shipped, meaningful genuine Stage 3 production evidence, a measured acceptable false-positive rate, proven rollback, and a demonstrated business/owner bottleneck removed.

Even if these gates are met, Stage 4 remains limited to change classes that are deterministically verifiable against a fixed file allowlist. No AI-authored change outside an explicitly sanctioned auto-publish class may merge without human review. After Stage 3 has genuine production evidence, separately decide whether supporting a second finding type is worthwhile; it is new scope, not an automatic extension of Stage 3.

Constraints at every stage: the worker may not weaken a validator or a lane to make its own job easier; the five group-A auto-publish paths in `SAFE_PUBLISHING_RULES.md` stay exactly as they are; and no stage adds a governance document — findings live in issues, schedules and incidents in `docs/OPERATIONS.md`, priorities here.

## Recently completed

Closed on GitHub; kept as a short audit trail only. Full detail lives in the linked PRs and git history.

- `events-index.json` consistency enforced in `validate-partitions.mjs` (ID multiset, indexed values, row order), plus homepage search result ordering fixed at source (2026-09-14)
- Maintenance loop Stage 3 v1 — bounded repair worker for `generated_artifact_stale`, PR-only, human-merged (2026-09-12)
- Maintenance loop Stage 2 — first `agent:ready` type, stale generated output (2026-09-11, PR #944)
- Maintenance loop Stage 2 — work queue: classified discrete issues from sensor findings (2026-09-11, PR #943)
- Maintenance loop Stage 1 — daily-audit outbound links moved to per-host concurrency (2026-09-11, PR #942)
- Maintenance loop Stage 1 — automation-health sensor over the scheduled lanes (2026-09-11, PR #941)
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
