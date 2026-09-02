# Discoverability audit — 2026-09-02

**Objective:** increase qualified organic entries that lead to monetized provider clicks, while preserving the repository's publishing, provider-data, redirect and indexability controls.

**Audit scope:** production `https://tourticketcompare.com`, GitHub `olstaylor/tourticketcompare` at `39dca7da633491b508816009746ffdddc4191f57` (`main`, 2026-09-02), Search Console, GA4, read-only GTM, authenticated Impact reporting UI, and read-only Cloudflare dashboard/D1 queries. No production, analytics, affiliate or Cloudflare state was changed. The one reviewable GitHub implementation PR described below was created after the audit evidence was collected.

## Executive summary

- **311 of 1,130** rendered routes are indexable, and the live sitemap has the same 311 URLs; route, schema and internal-link checks pass.
- Search generated **32 clicks from 9,061 impressions** (0.4% CTR) in the only available window; existing comparison guides are visible but under-clicked.
- **63 of 1,022** reviewed upcoming events have just one provider lane, while the dynamic indexable surface falls from **279 to 153** in the +90-day forecast without new verified dates.
- The accessible GA4 report has **0 visible `outbound_click` events** in its 28-day event list. D1 is now readable, but its 90-day click/attempt totals and attribution fields are inconsistent, so it is not yet safe to use as a conversion-rate baseline.
- The production Pages project has **227 CPU-time-limit errors in the most recent 24 hours**; a sampled artist-city URL also returned two 503s before one 200. Crawl resilience therefore takes precedence over another discovery expansion.
- PR [#831](https://github.com/olstaylor/tourticketcompare/pull/831) implements one narrow, validated guide-intent correction; it is a preview deployment only and has not been merged or promoted.

## Capability and data status

| Capability | Status | Evidence / limitation |
|---|---|---|
| Canonical repository | available | GitHub `main` cloned for audit; branch `codex/seo-discoverability-2026-09-02` and PR #831 created only for the scoped change documented below. |
| Production crawl | partial / usable | Low-rate cURL checks and production route verifier work. A high-concurrency Node crawl produced client-side 503s and is not used as Google evidence. |
| Google Search Console | available | Domain property and submitted sitemap visible. Export covers only 2026-07-05 to 2026-08-30 despite the wider UI selection. Query×page and coverage exports are unavailable. |
| GA4 | available | Property event report available; no current `outbound_click` event visible in the sampled 28-day report. GA4 is only a mirror, not the authoritative click source. |
| GTM | available, read-only | One production Google tag fires on the expected custom initialisation event and hostname condition; no change made. |
| Impact | available | Authenticated partner reporting UI available. Its aggregate report is account/program scoped, not proven TTC/page scoped, so it is not used for site prioritisation. |
| First-party D1 funnel and Web Vitals | available, dashboard read-only | Manual `SELECT` queries against `analytics_events` are available in the Cloudflare D1 console. Local Wrangler remains unauthenticated, so repository report wrappers could not be run. The observed event history needs integrity investigation before it drives conversion decisions. |
| Impact Actions × TTC clicks reconciliation | blocked | D1 reads are now possible, but a TTC-specific Impact filter/campaign or verified SubId reconciliation is still absent; the shared account's aggregate actions cannot be assigned to TTC. |

## Baseline

### Organic demand

Search Console performance export, available data 5 July–30 August 2026; Page Indexing report captured 2 September 2026 (last update 28 August):

| Metric | Value |
|---|---:|
| Clicks | 32 |
| Impressions | 9,061 |
| CTR | 0.4% |
| Average position | 25.4 |

The volume is small and the time window is short, so no query-level change should be treated as statistically decisive.

High-impression query themes already near page-one/two include `vivid seats vs ticketmaster` (210 impressions, position 8.78, 0 clicks), `seatgeek vs ticketmaster` (149, 12.62, 0), `compare ticket prices` (87, 17.63, 1), and `compare concert ticket prices` (128, 17.57, 2). Existing guide pages receive the relevant visibility: for example, `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` has 1,287 impressions at position 11.88 and 4 clicks, while `/guides/seatgeek-vs-ticketmaster` has 2,001 impressions at 10.02 and 2 clicks. This confirms a CTR and snippet/intent investigation opportunity; it does **not** yet identify a winning query-to-page mapping.

### Served and repository surface

| Check | Result |
|---|---|
| Rendered / indexable / noindex routes | 1,130 / 311 / 819 |
| Public sitemap URLs | 311; matches the local indexable count |
| Robots | allows public pages, disallows `/api/`, and declares the sitemap |
| Internal-link audit | 1,130 crawled; 0 reported problems |
| Schema validation | passed; sampled artist, artist-city, city, venue and guide routes validate |
| Route/schema production verifier | 10 static/trust paths returned 200 on the apex domain |
| Event link coverage | 786 of 1,022 upcoming reviewed events have 3+ links; 63 have one provider link; 59 have two |
| Dynamic indexable roster forecast | 279 current dynamic indexable routes; 153 projected at +90 days without refreshed verified events |

GA4, 5 August–1 September 2026: 734 `page_view` events and 1 `provider_cta_view` event are visible, but no `outbound_click` event appears in the current event list. In the documented architecture, GA4 mirrors client intent while server-written D1 `outbound_click` is authoritative, so GA4 cannot supply a revenue-grade outcome baseline.

Read-only D1 totals for 4 June–2 September are 22,771 `outbound_click`, 6,144 `outbound_attempt`, and 1,521 `outbound_blocked` events. Because the documented attempt event is the receipt preceding one terminal outcome, the click total exceeding attempts means this mixed history is not a valid funnel denominator. It also has weak landing attribution: 5,836 affiliate `outbound_click` rows have no `landing_path`, and 5,706 name `/` as the source path. These are integrity observations, not evidence that the clicks are invalid or automated. The existing self-identifying-crawler filter and the documented pre-filter historical period are plausible contributors, but neither explains the data without a route/time-based investigation.

The same D1 query found 1,308 blocked Ticket Liquidator redirects with `impact_tracking_url_failed_safety_check`, materially more than every other failure category. This is a concrete provider-funnel loss signal, but the writer and its redirect safety policy are protected; no URL validation, provider configuration, or redirect logic was changed from this audit.

Impact's default 14-day Performance by Brand view showed aggregate account-level activity (615 clicks, 1 action). It may include other properties or campaigns and cannot be joined to a TTC landing page or its D1 redirect rows in the present configuration. It is therefore excluded from the TTC conversion baseline.

Page Indexing reports 76 indexed and 349 not indexed URLs. Of the non-indexed total, 128 are `Blocked by robots.txt` examples under `/api/out` and are expected redirect endpoints, 47 are excluded by a `noindex` tag, and 169 are `Discovered – currently not indexed`. The discovered samples are predominantly artist-city routes, including `/artists/bruno-mars/tickets/foxborough-united-states` and other Bruno Mars/BTS/Charli XCX paths; each sample shows no last-crawled date.

## Confirmed findings

### 1. Existing comparison guides are visible but under-clicked

**Evidence:** the Search Console figures above show multiple commercial-comparison queries in positions 8–18 with zero or very few clicks; guide pages already rank around positions 10–12 with very low CTR.

**Controlled by:** source guides `content/guides/ticketmaster-vs-seatgeek-vs-vivid-seats.md`, `content/guides/seatgeek-vs-ticketmaster.md` and `content/guides/vivid-seats-vs-ticketmaster.md`; their generated outputs must only be produced by the documented guide build.

**Effect / confidence:** potentially material qualified-entry upside, but conversion effect is unknown; **medium confidence** for the CTR opportunity, **low confidence** for any individual page change until query×page evidence is available.

**Constraint:** query×page data is missing. Do not change titles, canonicals, FAQ/schema, or create near-duplicate `vs` pages until the association is exported or API access is granted.

**Update, 2 September:** focused Query → Page UI inspection provides enough evidence for one isolated change. `vivid seats vs ticketmaster` (210 impressions, position 8.8, 0 clicks) splits 140 impressions to the broad three-provider guide and 71 to the dedicated Vivid Seats vs Ticketmaster guide. PR #831 narrows only the three-provider title/H1/description; it does not create or delete pages.

### 2. Commercial depth and fresh verified roster data are the durable organic constraint

**Evidence:** 63 reviewed upcoming events offer only one provider lane; only 153 dynamic indexable routes remain in the +90-day forecast. The link-coverage audit correctly labels 63 cases as API-cap/unprocessed, 58 as no qualifying listing, and 5 as ambiguous rather than guessing.

**Controlled by:** the approved provider/event ingestion and verification workflow (`docs/PROVIDER_SYNC.md`, event/provider validation scripts), and indexability modules `functions/_route-indexability.js` and `functions/_artist-indexability.js`. The gates must not be relaxed without separate GSC evidence and a policy change.

**Effect / confidence:** likely the strongest path to both useful pages and monetised click opportunity; **high confidence** that coverage/roster freshness matters, **low confidence** on which artist/provider to prioritise until D1 data is available.

### 3. The IndexNow key is not publicly reachable

**Evidence:** `scripts/indexnow-ping.mjs` stops because `https://tourticketcompare.com/9ffca7bd48067983c70d2ce6601728d3.txt` is not live.

**Controlled by:** `scripts/indexnow-ping.mjs` and `.github/workflows/indexnow-ping.yml`, plus the standard deployed public-file path.

**Effect / confidence:** removes a supported-engine notification failure only; **high confidence** in the missing-key observation and **low expected effect** on the joint Google/monetised-click goal. Google does not use IndexNow.

### 4. Authoritative commercial reporting is available but not decision-grade

**Evidence:** read-only D1 queries for 4 June–2 September show 22,771 `outbound_click` records but only 6,144 `outbound_attempt` records, despite the documented attempt-before-terminal contract. Affiliate click rows also lack useful landing attribution at high volume. The Cloudflare Pages dashboard shows 227 production errors in the last 24 hours, all `Exceeded CPU Time Limits`, and no script-thrown exceptions.

**Controlled by:** D1-backed `analytics_events`, `functions/api/out.js` (protected, authoritative writer), `scripts/report-commercial-funnel.mjs`, and `scripts/report-affiliate-performance.mjs`.

**Effect / confidence:** blocks conversion-rate or page-winner decisions until the event history is segmented and reconciled; **high confidence** in the inconsistency, **low confidence** in its root cause. GA4 and mixed-account Impact cannot substitute for a valid first-party denominator.

## Investigate before changing

### A. Artist-city crawl blockage / intermittent dynamic-route 503s

A low-rate check of `/artists/bruno-mars/tickets/foxborough-united-states` returned 503 twice, then 200 on the third request. Earlier broad Node sampling also observed 503s, while independent single cURL checks for other dynamic routes returned 200. Separately, Search Console lists this exact route and many other artist-city URLs in `Discovered – currently not indexed` with no recorded crawl. This is a **high-priority correlation**, not proof that Googlebot received either specific 503 response or that every discovered route fails.

**Controlled by:** production Pages Functions request path, principally protected router `functions/[[path]].js` and its data dependencies. Do not change either without an observed root cause and explicit scoped approval.

**Effect / confidence:** potentially high if persistent for crawlers or buyers; **high confidence** that the project currently has CPU-limit failures, but **low confidence** in the failing route mix/cause. **Next evidence:** collect Workers request/error observations by route template and a low-rate, cache-aware route sample; compare 5xx rate and response time with Search Console crawl/index coverage. Do not increase crawl demand or submit broad URL batches until that is understood.

**Update, 2 September:** the earlier Bruno Mars/Foxborough sample now loads with self-canonical, `index,follow` metadata and ticket destinations. A fresh low-rate sample of its artist, city, venue, artist-city and comparison-guide templates likewise loaded with their expected self-canonicals, `index,follow` directives and H1s. This rules out a persistent failure of those sampled routes at the capture time; it does **not** identify the source of the project-level CPU-limit errors or prove that all routes/crawlers are unaffected.

### D. Provider redirect safety failures

The D1 terminal-outcome breakdown identifies 1,308 blocked Ticket Liquidator redirects with `impact_tracking_url_failed_safety_check`, versus 49 or fewer in each other observed failure category. The safety check is doing its protective job; the unanswered question is whether the upstream tracking URL contract or approved provider configuration changed. **Do not bypass or weaken the safety gate.** Next evidence is a non-mutating review of the affected provider's approved URL shape, release history, and aggregate failure trend before requesting narrowly scoped authority over any protected redirect/provider code.

### B. GA4 mirror completeness

The accessible GA4 event list has no current `outbound_click`, while the documented design says GA4 mirrors the legacy `provider_click` intent under that name. This may reflect low volume, event configuration, consent/ad-blocking, report scope, or a true emission problem. It does not overturn D1 as the source of truth.

**Controlled by:** the client mirror in `public/app.js`, existing GTM Google-tag configuration, and GA4 custom-event/key-event configuration. D1 remains authoritative.

**Effect / confidence:** high measurement impact, **medium confidence** that the mirror needs investigation; it is not yet a confirmed tracking defect. **Next evidence:** use DebugView/Realtime with a controlled CTA click and inspect the existing GTM/Google-tag event configuration read-only; then reconcile the same interval against D1 counts.

### C. Sitemap recency

Search Console reports the sitemap was last read on 28 August and has 271 discovered URLs; the live sitemap now holds 311. This is a normal lag candidate, not a fault. Recheck after a valid deployment/ping cycle and compare coverage by URL class.

**Controlled by:** `functions/sitemap.xml.js` / shared indexability modules and Search Console's crawl schedule. **Effect / confidence:** low expected effect and low confidence that any fault exists.

## Ranked, approval-gated remediation plan

| Priority | Proposed PR / owner action | Impact / effort / risk | Scope and validation | Success measure | Prerequisites |
|---|---|---|---|
| P0 | **Agent:** diagnose CPU-limit errors and D1 event-integrity segmentation before using click rates. | High / medium / low | Read-only Cloudflare observability/D1 queries; route-template sampling. Do not edit protected runtime/writer code. | Failing route mix and error cause identified; post-filter date range/fields suitable for a valid conversion baseline. | Existing Cloudflare dashboard access. |
| P0 | **Owner / agent:** review Ticket Liquidator's approved Impact tracking URL contract and failure trend. | High / medium / low | Non-mutating provider/release review first; retain redirect safety gate. | Explain or eliminate the `impact_tracking_url_failed_safety_check` block class. | Provider credentials/configuration scope only if evidence identifies a change. |
| P0 | **Owner:** export GSC query×page and Page Indexing/Coverage for the same property/window. | High / low / low | No code change; save using the intake-contract filenames. | Map top comparison queries to canonical pages; separate excluded, crawled-not-indexed and indexed URLs. | Search Console export/API grant. |
| P1 | **PR #831 — evidenced comparison-guide refinement:** narrow the broad three-provider guide so the dedicated Vivid Seats vs Ticketmaster guide owns exact two-provider intent. | Medium / low / low | Existing guide source plus required generated/client metadata; GitHub `test:mvp` passed. | Higher CTR and clearer query-to-page distribution over a predeclared 28-day comparison, with no ranking/cannibalisation regression. | Open review and merge decision. |
| P1 | **PR 2 — verified roster/provider coverage:** process only validated upstream events and approved provider listings; prioritise D1-proven click demand with weak coverage. | High / high / medium | Normal verified data pipeline only; never hand-edit generated output. Validate `npm run test:providers` and `npm run test:mvp`. | More qualifying provider lanes and preserved provenance; no invented price/availability claims. | User approval; D1 report; normal data pipeline and provenance. |
| P1 | **PR 3 — IndexNow key file:** publish the exact existing verification key via the standard deployment path, then run the controlled ping. | Low / low / low | Public key file only. Validate `npm run indexnow:ping:self-test`, then key URL returns 200 and run `npm run indexnow:ping`. | Script succeeds for supported engines. | User approval; confirm intended key/material; deployment scope. |
| P2 | **Measurement validation:** validate GA4 mirror behaviour with a controlled CTA click and compare to D1. | High / medium / low | Console configuration/read-only review first; no automatic code/console change. | Documented expected difference between intent and server redirect; root cause if event is absent. | D1 access; read-only GTM/GA4 review. |

Any code PR must be independently reviewable, include the relevant route/link/schema tests, and remain outside protected redirect/routing/metadata files unless an explicit scoped approval is supplied. There is no approved change to `functions/api/out.js`, `_middleware.js`, `[[path]].js`, `_route-metadata.js`, `public/_routes.json`, generated files, content catalogue, provider integrations, CSP, or Cloudflare settings.

## Ideas explicitly rejected

- Lower city, venue or artist-city indexability thresholds to grow the sitemap. The current gates prevent thin pages and are functioning as designed.
- Create location, artist, tour, provider or `vs` pages without verified records and an editorial brief; add broad country/language variants; or publish empty-date pages as discovery bait.
- Add scraped prices, fee claims, availability promises, invented provider CTAs, raw affiliate links, or an affiliate Ticketmaster lane.
- Add generic FAQ/HowTo schema or duplicate comparison copy solely to obtain rich-result real estate.
- Treat Impact account totals as TourTicketCompare page revenue, or use GA4 client events as authoritative outbound redirects.
- Use link schemes, purchased links, doorway pages, keyword stuffing, cloaking, or automated index submission as a substitute for useful pages.
- Alter CSP to permit unsafe inline tracking or add unreviewed third-party trackers.

## Owner questions and requested inputs

1. The focused Search Console inspection established the first narrow guide PR. A full query×page export remains needed for broader cannibalisation analysis.
2. Impact is confirmed as a mixed TTC/social affiliate account. It must not be used as a TTC conversion measure until a TTC-specific campaign/filter or verified SubId reconciliation exists; do not enable SubId passthrough without Impact confirming the parameter.
3. Please confirm the intended Ticket Liquidator Impact tracking URL contract only if the read-only provider/release review points to an upstream/configuration change; the current safety block must remain in place.
4. PR #831 is open and GitHub's Prelaunch Validation run #824 succeeded after the evidence report was added. Runtime, data-pipeline and IndexNow work remain contingent on their evidence/deployment prerequisites.

## Commands and validation record

Completed successfully:

```text
node scripts/audit-indexable-surface.mjs --check
node scripts/audit-internal-links.mjs
node scripts/validate-route-schema.mjs
node scripts/report-link-coverage.mjs --check
node scripts/report-roster-forecast.mjs
node scripts/verify-production-route-html.mjs
```

`indexnow-ping.mjs` intentionally stopped at the missing public key-file check. The local commercial-funnel and Web Vitals wrappers were not substituted with synthetic data because local Wrangler remains unauthenticated; equivalent manual D1 reads were SELECT-only and are recorded above. Generated local audit outputs changed only because their audit scripts were run and are not proposed production edits.
