# Discoverability audit — 2026-09-02

**Objective:** increase qualified organic entries that lead to monetized provider clicks, while preserving the repository's publishing, provider-data, redirect and indexability controls.

**Audit scope:** production `https://tourticketcompare.com`, GitHub `olstaylor/tourticketcompare` at `5c8e689` (`main`, 2026-09-02), Search Console, GA4, read-only GTM, authenticated Impact reporting UI, and read-only Cloudflare dashboard/D1 queries. The original audit did not change production, affiliate or Cloudflare state. On 3 September, the owner-authorised GA4 console corrections recorded below marked the emitted `outbound_click` event as a key event and extended event-data retention; no GTM or client code was changed. The reviewable GitHub implementation PRs described below were created after the audit evidence was collected.

## Executive summary

- At the 2 September audit capture, **311 of 1,130** rendered routes were indexable and the live sitemap had the same 311 URLs. The 3 September repository check is **309 of 1,127**, with the same 309 sitemap entries; this is calendar-driven inventory decay, not a gate or link-integrity defect.
- The refreshed 4 September Search Console read shows **37 clicks from 9,960 impressions** (0.4% CTR; position 25.2) over 5 July–2 September; existing comparison guides are visible but under-clicked. PR [#831](https://github.com/olstaylor/tourticketcompare/pull/831) is the single validated intent correction.
- **64 of 781** reviewed upcoming events have just one provider lane, while the dynamic indexable surface falls from **277 to 150** in the +90-day forecast without new verified dates; Search Console also lists only **7** external links, all to the homepage, with no listed deep link to the campaign guide.
- GA4 now shows **16 `outbound_click` events in the last 7 days**; on 3 September it was made the key event and event-data retention was extended from **2 to 14 months**. D1 confirms `outbound_attempt` began on **20 August**, so the earlier 90-day mismatch is historical; however, its valid post-cutover period has **5,541** successful redirect receipts versus only **87** client CTA-intent events, so conversion-weighted page rankings remain blocked.
- The production Pages project recorded **1,390 CPU-time-limit errors among 70,055 successes in a rolling seven-day view** (1.94%), while its simultaneous 24-hour view had zero errors. Current low-rate route samples succeed, and PR [#841](https://github.com/olstaylor/tourticketcompare/pull/841) removes confirmed duplicate static-data reads without claiming that it proves the CPU-error root cause.

## Capability and data status

| Capability | Status | Evidence / limitation |
|---|---|---|
| Canonical repository | available | GitHub `main` cloned for audit; branch `codex/seo-discoverability-2026-09-02` and PR #831 created only for the scoped change documented below. |
| Production crawl | partial / usable | Low-rate cURL checks and production route verifier work. A high-concurrency Node crawl produced client-side 503s and is not used as Google evidence. |
| Google Search Console | available | Domain property and submitted sitemap visible. On 4 September the live Performance UI exposed 5 July–2 September totals and query, page, country and device breakouts. Query×page and coverage exports remain unavailable. The same Domain property is linked to GA4. |
| GA4 | available | Measurement ID `G-Q7R1NQY8YH`; on 3 September the obsolete no-stream-data `provider_click` marker was removed, emitted `outbound_click` was marked as the key event, and event retention was set to 14 months. The Internal Traffic exclusion remains Testing pending IP-scope review. GA4 is only a mirror, not the authoritative click source. |
| GTM | available, read-only | Container `GTM-MZ42TPMM`; one production Google tag fires on the custom initialisation event, with zero pending workspace changes. The bootstrap sets `send_page_view: false`; no change made. |
| Impact | available | Authenticated partner reporting UI available. Its aggregate report is account/program scoped, not proven TTC/page scoped, so it is not used for site prioritisation. |
| First-party D1 funnel and Web Vitals | available, dashboard read-only | Manual `SELECT` queries against `analytics_events` are available in the Cloudflare D1 console. Local Wrangler remains unauthenticated, so repository report wrappers could not be run. Wrangler 4.128.0 confirms that `pages deployment tail` can livestream Pages Function logs, but it cannot be used until a read-only Cloudflare credential is granted. The observed event history needs integrity investigation before it drives conversion decisions. |
| Impact Actions × TTC clicks reconciliation | blocked | D1 reads are now possible, but a TTC-specific Impact filter/campaign or verified SubId reconciliation is still absent; the shared account's aggregate actions cannot be assigned to TTC. |

## Baseline

### Organic demand

Search Console Performance UI, available data 5 July–2 September 2026 and captured 4 September; Page Indexing report captured 2 September 2026 (last update 28 August). Full CSV/API exports remain unavailable, so this is a UI-observed baseline rather than a reproducible export:

| Metric | Value |
|---|---:|
| Clicks | 37 |
| Impressions | 9,960 |
| CTR | 0.4% |
| Average position | 25.2 |

The volume is small and the time window is short, so no query-level change should be treated as statistically decisive.

High-impression query themes already near page-one/two include `vivid seats vs ticketmaster` (243 impressions, 0 clicks), `seatgeek vs ticketmaster` (157, 0 clicks), `compare ticket prices` (100, 3 clicks), and `compare concert ticket prices` (140, 2 clicks). Existing guide pages receive the relevant visibility: `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` has 1,380 impressions and 4 clicks, while `/guides/seatgeek-vs-ticketmaster` has 2,131 impressions and 3 clicks. This confirms a CTR and snippet/intent investigation opportunity; it does **not** yet identify a winning query-to-page mapping. By contrast, `tame impala tickets` has 104 impressions and zero clicks; its landing page already serves verified upcoming dates and at least one checked destination. It is not a justified near-term content or indexability change.

The available country/device UI segmentation is not sufficient to prescribe country-specific content: United States is 17 clicks / 6,303 impressions; United Kingdom 15 / 475; Canada 1 / 464. India (272 impressions), Vietnam (232) and Philippines (186) have no clicks; no country-specific expansion is proposed because provider monetisation and ticket coverage have not been joined at that level. Mobile produces 20 clicks / 4,271 impressions and desktop 17 / 5,636, so the opportunity is not desktop-only.

### Served and repository surface

| Check | Result |
|---|---|
| Rendered / indexable / noindex routes | 1,130 / 311 / 819 |
| Public sitemap URLs | 311; matches the local indexable count |
| Robots | allows public pages, disallows `/api/`, and declares the sitemap |
| Internal-link audit | 1,130 crawled; 0 reported problems |
| Schema validation | passed; sampled artist, artist-city, city, venue and guide routes validate |
| Route/schema production verifier | 10 static/trust paths returned 200 on the apex domain |
| Event link coverage | 659 of 781 upcoming reviewed events have 3+ links; 64 have one provider link; 58 have two |
| Dynamic indexable roster forecast | 277 current dynamic indexable routes; 150 projected at +90 days without refreshed verified events |

GA4, 5 August–1 September 2026: 734 `page_view` events and 1 `provider_cta_view` event were visible, but no `outbound_click` event appeared in that earlier event-list capture. A fresh 3 September GA4 Home report shows 16 `outbound_click` events in the last 7 days. It is now the GA4 key event and event retention is 14 months; these settings do not backfill historical reports. In the documented architecture, GA4 mirrors client intent while server-written D1 `outbound_click` is authoritative, so GA4 cannot supply a revenue-grade outcome baseline.

Read-only D1 totals for 4 June–2 September are 22,771 `outbound_click`, 6,144 `outbound_attempt`, and 1,521 `outbound_blocked` events. The 3 September first-seen query now resolves this: `outbound_attempt` begins at `2026-08-20T14:10:15.753Z`, while `outbound_click` begins on 1 May and `outbound_blocked` on 31 July. The mixed 90-day history is therefore not a valid funnel denominator; the first valid attempt-based window begins on 20 August. This explains the mismatch, but does not establish why the older receipt stream lacks attempts.

**Post-cutover integrity check, 20 August–3 September:** `outbound_attempt` is **6,936**, exactly equal to **5,541** `outbound_click` plus **1,395** `outbound_blocked`, so the documented terminal contract holds in the valid window. That same window has only **87** `provider_click` and **144** `provider_cta_view` client events, compared with 5,541 successful server redirect receipts. The discrepancy is an unmatched server-receipt stream, not evidence that any particular traffic is invalid or automated. Its largest receipt groups are homepage `event_card` (**3,582** redirects; **3,206** affiliate-labelled) and homepage rows without client source metadata (**1,704** redirects; **0** affiliate-labelled). Until that stream is characterised using privacy-preserving aggregate telemetry, neither a page conversion rate nor a monetised-click ranking is defensible.

**Correction, 3 September:** the earlier reading that these rows show "weak landing attribution" was wrong and is withdrawn. `functions/api/out.js` writes `landing_path: null` and `acquisition_source: null` on both the `outbound_attempt` and `outbound_click` receipts, and `docs/COMMERCIAL_FUNNEL.md` records `landing_path` as client-captured on `page_view` rows only, with `acquisition_source` written solely on a session's entry row. `scripts/report-commercial-funnel.mjs` therefore derives landing pages by joining each click to the earliest `page_view` of the same visitor key on the same day. A raw click row has no landing path by design, so querying one for it will always return none; that is not missing instrumentation. The separate observation that 5,706 affiliate clicks name `/` as their `source_path` is unaffected and still worth segmenting.

The same D1 query found 1,308 blocked Ticket Liquidator redirects with `impact_tracking_url_failed_safety_check`, materially more than every other failure category. However, 1,094 occurred on 28 August; 1,089 share one anonymous request-key group, all name `/` as their source path, and 1,076 happened between 00:32 and 00:36 UTC. That concentration is inconsistent with treating the aggregate as normal user conversion demand, though it does not identify the actor or prove the tracking response was valid. The writer and redirect safety policy are protected; no URL validation, provider configuration, or redirect logic was changed.

Impact's default 14-day Performance by Brand view showed aggregate account-level activity (615 clicks, 1 action). It may include other properties or campaigns and cannot be joined to a TTC landing page or its D1 redirect rows in the present configuration. It is therefore excluded from the TTC conversion baseline.

Page Indexing reports 76 indexed and 349 not indexed URLs. Of the non-indexed total, 128 are `Blocked by robots.txt` examples under `/api/out` and are expected redirect endpoints, 47 are excluded by a `noindex` tag, and 169 are `Discovered – currently not indexed`. The discovered samples are predominantly artist-city routes, including `/artists/bruno-mars/tickets/foxborough-united-states` and other Bruno Mars/BTS/Charli XCX paths; each sample shows no last-crawled date. The submitted `https://tourticketcompare.com/sitemap.xml` is successful, was last read 2 September, and has 311 discovered pages, matching the live sitemap; this supersedes the earlier 28 August/271-page observation.

## Confirmed findings

### 1. Existing comparison guides are visible but under-clicked

**Evidence:** the Search Console figures above show commercial-comparison queries with substantial impressions and zero or very few clicks. The current UI capture directly confirms `vivid seats vs ticketmaster` at position 8.6 with 221 impressions and zero clicks; the broad three-provider and SeatGeek/Ticketmaster guides have 1,312 and 2,046 impressions respectively with only 4 and 2 clicks. This is a CTR opportunity, not evidence that every query is already in striking distance.

**Controlled by:** source guides `content/guides/ticketmaster-vs-seatgeek-vs-vivid-seats.md`, `content/guides/seatgeek-vs-ticketmaster.md` and `content/guides/vivid-seats-vs-ticketmaster.md`; their generated outputs must only be produced by the documented guide build.

**Effect / confidence:** potentially material qualified-entry upside, but conversion effect is unknown; **medium confidence** for the CTR opportunity, **low confidence** for any individual page change until query×page evidence is available.

**Constraint:** query×page data is missing. Do not change titles, canonicals, FAQ/schema, or create near-duplicate `vs` pages until the association is exported or API access is granted.

**Update, 3 September:** refreshed Query → Page UI inspection provides enough evidence for one isolated change. `vivid seats vs ticketmaster` (221 impressions, position 8.6, 0 clicks) splits 140 impressions to the broad three-provider guide and 82 to the dedicated Vivid Seats vs Ticketmaster guide. PR #831 narrows only the three-provider title/H1/description; it does not create or delete pages.

**Update, 4 September (current 5 July–2 September UI):** `vivid seats vs ticketmaster` has **243 impressions**, **0 clicks**, and position **8.5**. Its broad three-provider guide has 140 impressions at position 10.0, while the dedicated Vivid Seats vs Ticketmaster guide has 104 at position 6.6. `seatgeek vs ticketmaster` has **157 impressions**, **0 clicks**, and position **12.8**; 145 impressions already land on the dedicated SeatGeek guide (position 11.7), versus 15 on the broad guide (position 27.3). The date range substantially predates PR #831's deployment, so these are its baseline measurements, not evidence of its effect. They support observing the distinct-guide strategy for 4–8 weeks; they do not justify another `vs` page, canonical change, or schema rewrite.

### 2. Commercial depth and fresh verified roster data are the durable organic constraint

**Evidence:** 64 of 781 reviewed upcoming events offer only one provider lane; the 3 September forecast has 277 dynamic indexable routes today and only 150 at +90 days if no new dates arrive. The refreshed link-coverage audit correctly labels 64 cases as API-cap/unprocessed, 59 as no qualifying listing, and 5 as ambiguous rather than guessing. Git history records the scheduled SeatGeek, Vivid Seats, and three Impact-marketplace lanes publishing their scoped changes on 2 September; this proves recent pipeline activity, not that a no-change run on 3 September failed or succeeded.

**Controlled by:** the approved provider/event ingestion and verification workflow (`docs/PROVIDER_SYNC.md`, event/provider validation scripts), and indexability modules `functions/_route-indexability.js` and `functions/_artist-indexability.js`. The gates must not be relaxed without separate GSC evidence and a policy change.

**Effect / confidence:** likely the strongest path to both useful pages and monetised click opportunity; **high confidence** that coverage/roster freshness matters, **low confidence** on which artist/provider to prioritise until D1 data is available.

### 2a. Current Beyoncé ticket demand lands on an honest but zero-destination empty board

**Evidence (4 September Search Console UI):** the exact-page report for [`/artists/beyonce`](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Atourticketcompare.com&page=%21https%3A%2F%2Ftourticketcompare.com%2Fartists%2Fbeyonce&start_date=20260824&end_date=20260830&compare_start_date=20260817&compare_end_date=20260823&metrics=IMPRESSIONS) reports **389 impressions**, **0 clicks**, **0% CTR**, and average position **61.3** for 24–30 August, versus 28 impressions and position 58 in the preceding week. Its 62 listed queries are predominantly ticket-led: `beyonce tickets` (43 impressions), `how to get beyonce tickets` (32), `beyoncéconcert tickets` (19), and `beyoncé tickets` (8). A contemporaneous live fetch of the page says that no verified upcoming Beyoncé dates are listed and shows no outbound provider CTA. The repository corroborates that `events.json` contains no Beyoncé event while `catalog.json` contains artist-page records for Ticketmaster and SeatGeek.

**Controlled by:** the durable artist gate in `functions/_artist-indexability.js` and the empty-board branch in protected `functions/[[path]].js`. The latter intentionally passes `null` as `emptyStateProviderCta`; `scripts/smoke-prelaunch.mjs` explicitly asserts that a zero-event board must not surface a provider claim. The indexable URL remains permissible because it has a reviewed artist record, but it is not presently a monetised-click landing page.

**Effect / confidence:** **high confidence** that the observed week cannot contribute an outbound provider click from this landing page; **low confidence** that the seven-day impression rise persists. This is not evidence to create a tour, date, price, CTA, or title rewrite. The watchlist signup is not a ticket destination and must not be counted as one.

**Next action:** do not loosen the empty-board rule or route gate based on this spike. The only rules-compliant way to make the page conversion-capable is the normal verified event/provider workflow, after a real source record and exact event ticket link have been checked. Reassess the page after a 28-day Search Console window or after verified Beyoncé event data arrives.

### 3. IndexNow delivery is verified

**Evidence:** the guarded 2 September dry run verified `https://tourticketcompare.com/9ffca7bd48067983c70d2ce6601728d3.txt` and enumerated the 311-URL live sitemap. The subsequent guarded submission returned HTTP 200 for all 311 URLs.

**Controlled by:** `scripts/indexnow-ping.mjs` and `.github/workflows/indexnow-ping.yml`, plus the standard deployed public-file path.

**Effect / confidence:** this confirms supported-engine notification is operational; **high confidence**. Google does not use IndexNow, so it is not a substitute for Search Console coverage and has low expected effect on the joint Google/monetised-click goal.

### 3a. The approved earned-backlink campaign has not yet earned a guide deep link

**Evidence:** the authenticated Search Console Links report captured on 3 September lists **7** external links in total. Its sole listed external target is `https://tourticketcompare.com/` (7 links); the only listed linking sites are `reddit.com` (4) and `x.com` (3). The report does not list `/guides/vivid-seats-vs-ticketmaster` or another guide as an externally linked page. This is the authoritative available link evidence, though Search Console link reporting can lag discovery; it does not evidence progress toward the campaign's day-90 deep-link target.

**Controlled by:** the owner-operated, rules-bound process in `docs/BACKLINK_CAMPAIGN.md`, not by a page, schema, or redirect change.

**Effect / confidence:** no current evidence that the campaign has produced its intended deep-link authority for the comparison guide; **high confidence** in the current report reading, **medium confidence** that it reflects every recently discovered link because Search Console reporting is not real time.

**Next action:** carry out only the campaign's individual, qualified editorial outreach: 4–6 tailored pitches per week, one follow-up after 5–7 business days, no prescribed anchor text, paid placements, reciprocal links, bulk guest posting, or invented claims. Record a referring domain only after the editorial deep link is live and crawlable. This is owner work; no code or content expansion is justified from the link count alone.

### 4. Authoritative commercial reporting is available but not decision-grade

**Evidence:** read-only D1 queries for 4 June–2 September show 22,771 `outbound_click` records but only 6,144 `outbound_attempt` records, despite the documented attempt-before-terminal contract. An earlier Cloudflare Pages dashboard capture showed 228 production errors in the preceding 24 hours, all `Exceeded CPU Time Limits`, and no script-thrown exceptions.

**Update, 2 September (current D1 check):** an aggregate-only `SELECT` over the latest 24 hours returned **929** `outbound_attempt`, **899** `outbound_click`, and **30** `outbound_blocked` rows: attempts exactly equal the two terminal outcomes. The hourly aggregate likewise showed normal attempt/click pairing, apart from blocks. This confirms that the current bounded stream is internally consistent; it does not reconcile the 90-day historical mismatch, supply organic landing attribution, or make a historical conversion-rate baseline valid.

**Update, 3 September (repository-side resolution):** two of this finding's three components are settled from the repository alone.

1. The absent landing/acquisition fields are the designed schema, per the baseline correction above. There is no writer or schema defect, and no code change is warranted.
2. Git cannot date the mismatch because this repository's history begins at root commit `8a393b9` (2026-08-28), while the D1 series starts 4 June. The following aggregate-only D1 query settles the date without exposing personal data:

```sql
SELECT event_name,
       MIN(created_at) AS first_seen,
       MAX(created_at) AS last_seen,
       COUNT(*)        AS row_count
FROM analytics_events
WHERE event_name IN ('outbound_attempt', 'outbound_click', 'outbound_blocked')
GROUP BY event_name;
```

**D1 result, 3 September:** `outbound_attempt` first appears at `2026-08-20T14:10:15.753Z` (6,936 rows through the capture); `outbound_blocked` first appears on 31 July (1,529 rows); and `outbound_click` first appears on 1 May (24,921 rows). The historical mismatch is therefore explained and the valid funnel window begins on 20 August.

**Remaining integrity issue, confirmed:** in that post-cutover window, 6,936 attempts exactly equal 5,541 successful redirects plus 1,395 blocks, but the 5,541 server redirect receipts materially exceed the 87 client `provider_click` events and 144 `provider_cta_view` events. Aggregate receipt-source grouping concentrates 3,582 redirects in homepage `event_card` rows (3,206 affiliate-labelled) and another 1,704 in homepage rows with no client source metadata. The prescribed same-day anonymous-key join attributes only 42 click receipts to an earliest `page_view` in the bounded 28-day check; this is not a raw-field defect, because landing fields are deliberately written only on client page-view records. It is insufficient join coverage to choose page winners. Do not label the unmatched receipts bots, users, duplicated redirects, or provider defects without further evidence.

**Controlled by:** D1-backed `analytics_events`, `functions/api/out.js` (protected, authoritative writer), `scripts/report-commercial-funnel.mjs`, and `scripts/report-affiliate-performance.mjs`.

**Effect / confidence:** historical funnel integrity is now segmented; conversion-rate and page-winner decisions remain blocked until the valid-period receipt stream is reconciled with client intent and landing joins. **High confidence** in the measured count discrepancy; **low confidence** in its cause. GA4 and mixed-account Impact cannot substitute for a valid first-party denominator.

## Investigate before changing

### A. Artist-city crawl blockage / intermittent dynamic-route 503s

A low-rate check of `/artists/bruno-mars/tickets/foxborough-united-states` returned 503 twice, then 200 on the third request. Earlier broad Node sampling also observed 503s, while independent single cURL checks for other dynamic routes returned 200. Separately, Search Console lists this exact route and many other artist-city URLs in `Discovered – currently not indexed` with no recorded crawl. This is a **high-priority correlation**, not proof that Googlebot received either specific 503 response or that every discovered route fails.

**Controlled by:** production Pages Functions request path, principally protected router `functions/[[path]].js` and its data dependencies. Do not change either without an observed root cause and explicit scoped approval.

**Effect / confidence:** potentially high if persistent for crawlers or buyers; **high confidence** that the project currently has CPU-limit failures, but **low confidence** in the failing route mix/cause. **Next evidence:** collect Workers request/error observations by route template and a low-rate, cache-aware route sample; compare 5xx rate and response time with Search Console crawl/index coverage. Do not increase crawl demand or submit broad URL batches until that is understood.

**Update, 2 September:** the earlier Bruno Mars/Foxborough sample now loads with self-canonical, `index,follow` metadata and ticket destinations. A fresh low-rate sample of its artist, city, venue, artist-city and comparison-guide templates likewise loaded with their expected self-canonicals, `index,follow` directives and H1s. This rules out a persistent failure of those sampled routes at the capture time; it does **not** identify the source of the project-level CPU-limit errors or prove that all routes/crawlers are unaffected.

**Update, 2 September (current production check):** the live Pages project is now on `main` commit `822a37b`, distinct from this audit branch's preview deployment. Its last-24-hour metrics still show **10,764 successful requests and 228 errors**, all CPU-limit terminations: **208** occurred in one displayed interval, with 16, 1 and 3 in the other non-zero intervals. No script exception or memory-limit errors are reported. The dashboard does not attribute the terminations to a route, request class or caller, so this confirms persistence but does not support a runtime change yet.

**Update, 2 September (refreshed production metrics):** the same production dashboard now reports **10,469 successful requests and 1,063 errors** in its rolling 24-hour window, all `Exceeded CPU Time Limits`; script exceptions, memory-limit errors and internal subrequest errors remain zero. Median CPU time is **3,299**, rising to **15,188** at p75, **178,267** at p99 and **383,070** at p99.9 (dashboard units). This is a materially larger current error count, but the dashboard still provides no route/request attribution; it increases diagnostic urgency without justifying a protected-router change.

**Update, 4 September (current production metrics):** the production dashboard reports **70,055 successful requests and 1,390 errors** over its rolling seven-day view; every reported error is `Exceeded CPU Time Limits`, with zero script exceptions, memory-limit errors and internal errors. That is a 1.94% error share in the displayed window. The rolling 24-hour view at the same capture has **9,950 successes and zero errors**, while the current `main` deployment (`966a961`, deployed at 13:01 BST) is successful. This establishes an intermittent, not continuously failing, CPU-limit problem; the dashboard supplies no route, request-class or caller attribution, so it does not identify a safe runtime change.

**Update, 3 September (Google live test):** URL Inspection reports `/artists/bruno-mars/tickets/foxborough-united-states` as sitemap-discovered but not yet crawled or indexed (`Discovered – currently not indexed`; no last crawl). Its controlled live test at 09:42 reports **URL is available to Google** and **Page can be indexed**, with one valid Breadcrumb and two valid Event items. This disproves a current fetch/indexability failure for that one route; it does not explain why Google has deferred its normal crawl, or rule out intermittent failures elsewhere. No indexing request was submitted.

**Update, 3 September (bounded served sample):** sequential live requests for the Bruno Mars artist page, Inglewood city page, Madison Square Garden venue page, Bruno Mars/Foxborough artist-city page, and Vivid Seats vs Ticketmaster guide each returned 200 with an apex self-canonical, `index,follow,max-image-preview:large`, and the expected route H1. `robots.txt` returned 200 and advertises the apex sitemap. The production `tourticketcompare.pages.dev` home returned 200 but carries `noindex,follow` and an apex canonical, so this sample shows no Pages-host duplicate-index leak. This is deliberately a small, low-rate sample: it does not establish the state of every sitemap URL or resolve the CPU-limit error source.

The Event inspector's eight notices per item are optional fields only: event `organizer` and `endDate`, plus Offer `validFrom` and `availability` for each of the three eligible listed-price Offers. It reports both Event items as valid and rich-result eligible. Do not add `availability`: it is intentionally absent under `SAFE_PUBLISHING_RULES.md`, which forbids schema inventory/availability claims. The remaining optional fields have no evidenced organic-impact case and no schema change is proposed.

**Update, 3 September (current validators):** `validate-guide-routes.mjs` passes all 18 guide routes, content entries, sitemap entries and `llms.txt` entries. `validate-route-schema.mjs` passes its 50-artist, 106-artist-city and gated-Offer scenarios, including the expiry, source, flag, pilot, and provider-allowlist guards. These checks corroborate the live inspection and reveal no current schema or guide-surface regression.

**Update, 2 September (deployment and logs check):** PR [#831](https://github.com/olstaylor/tourticketcompare/pull/831) has merged as `main` commit `e2bf842` and Cloudflare lists its production deployment as live. A direct production fetch confirms that `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` now serves the approved three-provider title, self-canonical and description. Cloudflare Log Explorer is not enabled for this account; its dashboard offers a paid purchase rather than historical logs. Do not purchase or enable it without a separate owner decision. Historical route attribution remains unavailable. Wrangler confirms that a Pages deployment tail can livestream new error events, but selecting the current deployment requires an interactive terminal. Do not use its non-interactive/JSON output for this investigation: raw request URLs can contain user-supplied query data. With a separate least-privilege local credential, run only a bounded interactive error tail, record aggregate route templates/error classes rather than URLs, and stop without retaining request identifiers or query strings.

**Confirmed read-path duplication, 2 September:** on artist and artist-city paths, `routeForPath()` loads static catalog/artist/event data to decide the route, then `onRequest()` reloads catalog data and (for artist pages) event data to render. PR [#841](https://github.com/olstaylor/tourticketcompare/pull/841) carries the route-resolved data forward instead. It passed the complete local `test:mvp` suite and targeted route tests. This is a small, approved reduction in repeated static reads; the dashboard still has no per-route trace or timing evidence, so it must **not** be described as the proven cause or cure for the CPU-limit error burst. **Deployment update, 3 September:** the PR merged as `main` commit `91bb6bd`; Cloudflare lists it as the current production deployment. The post-deploy window is too short to infer any CPU-error effect.

### B. Concentrated provider redirect-failure burst

The D1 terminal-outcome breakdown identifies 1,308 blocked Ticket Liquidator redirects with `impact_tracking_url_failed_safety_check`, versus 49 or fewer in each other observed failure category. Almost all of the apparent excess is one five-minute 28 August burst: 1,089 failures from one anonymous request-key group, 1,094 source-attributed to `/`, and distinct click IDs per request. The existing self-identifying-crawler filter cannot classify a stock-browser user agent, so this is compatible with retry/automation traffic but does not prove it. **Do not bypass or weaken the safety gate, and do not treat the burst as a provider-contract failure.** Next evidence is aggregate request/error telemetry around comparable bursts and a non-mutating review of the small residual daily failure stream before requesting any scoped redirect/provider authority.

### C. GA4 key-event configuration mismatch

GA4 Admin previously showed `outbound_click` in the current web stream with its key-event star off, while `provider_click` was starred despite no stream data in the last 28 days. The shipped client deliberately mirrors the first-party `provider_click` intent to GA4 under the name `outbound_click`; it does not emit a GA4 `provider_click` event. The GTM container has one production Google tag and no pending changes, so this is not a duplicate-tag problem. The GA4 property is also linked to the domain Search Console property. The Internal Traffic exclusion remains in Testing (not Active).

**Controlled by:** the client mirror in `public/app.js`, existing GTM Google-tag configuration, and GA4 Events key-event configuration. D1 remains authoritative.

**Effect / confidence:** high measurement-reporting impact and **high confidence**. This does not invalidate D1's server-side redirect receipt. **Applied, 3 September:** the obsolete no-stream-data `provider_click` marker was removed; `outbound_click` was marked as the key event; and Event data retention was changed from 2 to 14 months. No GTM container or client code was changed. The sole remaining configuration decision is to review the Internal Traffic filter's defined IP scope, then activate it only if that scope is current and safe. Validate the corrected event in DebugView/Realtime with a controlled unmonetized Ticketmaster CTA click and reconcile that interval against D1.

**Direct recheck, 4 September:** GA4 Admin's Key events tab now lists `outbound_click` with its key-event toggle on and the Tour Ticket Compare web stream active in the last 28 days. The other configured key event is `purchase`, which reports no stream data. GA4 Home reports 25 `provider_cta_view` events in the latest seven days. This proves the configuration and that the client CTA-view event is arriving; it does not make GA4 a conversion denominator or prove an individual outbound-click count without a controlled reconciliation against D1.

**Safeguard recheck, 4 September:** GA4's sole Internal Traffic filter is an `Exclude` filter in **Testing** state, not active. Both user and event data retention are set to **14 months**. Leave the filter in Testing until its IP definition has been reviewed; the retention setting satisfies the available maximum configuration without changing the historical event gap.

### D. Sitemap recency — resolved

Search Console reports the sitemap was last read on 2 September, has `Success` status and 311 discovered pages — equal to the then-live indexable-surface count. A 3 September current-data check reports 309 indexable routes and 309 sitemap entries, with no orphan, empty-indexable, duplicate-title, structural, or internal-link problem; the two-route difference is venue inventory decay. Search Console has not yet re-read that newer surface. No sitemap change is proposed.

**Controlled by:** `functions/sitemap.xml.js` / shared indexability modules and Search Console's crawl schedule. **Effect / confidence:** no remaining remediation; **high confidence** in the observed alignment.

## Ranked, approval-gated remediation plan

| Priority | Proposed PR / owner action | Impact / effort / risk | Scope and validation | Success measure | Prerequisites |
|---|---|---|---|
| P0 | **Agent:** diagnose CPU-limit errors and reconcile the valid D1 receipt stream with client CTA intent/landing joins. | High / medium / low | Read-only, aggregate-only Cloudflare observability/D1 queries; route-template sampling. Do not edit protected runtime/writer code. The landing/acquisition raw-field concern is withdrawn — those nulls are by design (see finding 4). | Failing route mix and error cause identified; a defensible post-20-August conversion denominator and attributable page sample. | Existing Cloudflare dashboard access plus a read-only credential for a bounded `pages deployment tail` error sample; historical route attribution remains unavailable without Log Explorer. |
| P0 | **Agent:** separate concentrated retry/automation bursts from the residual Ticket Liquidator safety-failure stream. | High / medium / low | Aggregate-only D1/observability analysis; retain the redirect safety gate. | A defensible conversion denominator and a residual provider-failure rate that can be reviewed independently. | Existing Cloudflare dashboard access. |
| P0 | **Owner:** export GSC query×page and Page Indexing/Coverage for the same property/window. | High / low / low | No code change; save using the intake-contract filenames. | Map top comparison queries to canonical pages; separate excluded, crawled-not-indexed and indexed URLs. | Search Console export/API grant. |
| P1 | **PR #841 — reuse route-resolved static data:** avoid loading catalog/event data again after dynamic route matching. | Medium / low / low | Protected router diff was separately approved, tested, merged as `91bb6bd`, and deployed to production on 3 September. No redirects, CTAs, indexability gates, schema, data, CSP or Cloudflare setting changes. | Lower CPU use/error rate on comparable dynamic traffic over 4–8 weeks; dashboard-level monitoring only until route attribution exists. | Post-deploy observation window. |
| P1 | **PR #831 — evidenced comparison-guide refinement:** narrow the broad three-provider guide so the dedicated Vivid Seats vs Ticketmaster guide owns exact two-provider intent. | Medium / low / low | Existing guide source plus required generated/client metadata; GitHub `test:mvp` passed; the PR merged and its production deployment is live. | Higher CTR and clearer query-to-page distribution over a predeclared 28-day comparison, with no ranking/cannibalisation regression. | 4–8 week Search Console measurement window. |
| P1 | **Owner: run the approved Vivid Seats vs Ticketmaster earned-backlink campaign.** | Medium / medium / low | Follow `docs/BACKLINK_CAMPAIGN.md` exactly: 4–6 individually qualified editorial pitches weekly, at most one follow-up, and live/crawlable placement verification. No code, paid placement, reciprocal link, prescribed anchor, or new claim. | At least 2 new live deep links and 4 relevant referring domains by campaign day 90; report referral visits and assisted provider clicks only when first-party attribution becomes decision-grade. | Owner outreach capacity; Search Console Links recheck at days 30, 60 and 90. |
| P1 | **PR 2 — verified roster/provider coverage:** process only validated upstream events and approved provider listings; prioritise D1-proven click demand with weak coverage. | High / high / medium | Normal verified data pipeline only; never hand-edit generated output. Validate `npm run test:providers` and `npm run test:mvp`. | More qualifying provider lanes and preserved provenance; no invented price/availability claims. | User approval; D1 report; normal data pipeline and provenance. |
| P0 | **GA4 configuration:** retain `outbound_click` as the GA4 key event and leave Internal Traffic in Testing until IP-scope review. | High / low / low | `provider_click` was retired, `outbound_click` was marked as the key event, and event retention was set to 14 months on 3 September. No GTM/container/client change. Validate DebugView/Realtime and D1 after a controlled Ticketmaster CTA click. | GA4's key-event report contains the emitted `outbound_click`; retention is maximized; known internal testing is excluded only after scope review; D1 remains the authoritative successful-redirect measure. | Review Internal Traffic IP scope; otherwise observe the corrected measurement. |

Any code PR must be independently reviewable, include the relevant route/link/schema tests, and remain outside protected redirect/routing/metadata files unless an explicit scoped approval is supplied. PR #841 is the sole separately approved exception for its narrowly reviewed `functions/[[path]].js` read-path change. No approved change exists to `functions/api/out.js`, `_middleware.js`, `_route-metadata.js`, `public/_routes.json`, generated files, content catalogue, provider integrations, CSP, or Cloudflare settings.

## Ideas explicitly rejected

- Lower city, venue or artist-city indexability thresholds to grow the sitemap. The current gates prevent thin pages and are functioning as designed.
- Create location, artist, tour, provider or `vs` pages without verified records and an editorial brief; add broad country/language variants; or publish empty-date pages as discovery bait.
- Add scraped prices, fee claims, availability promises, invented provider CTAs, raw affiliate links, or an affiliate Ticketmaster lane.
- Add generic FAQ/HowTo schema or duplicate comparison copy solely to obtain rich-result real estate.
- Treat Impact account totals as TourTicketCompare page revenue, or use GA4 client events as authoritative outbound redirects.
- Use link schemes, purchased links, doorway pages, keyword stuffing, cloaking, or automated index submission as a substitute for useful pages.
- Treat the current seven homepage links as a result of the earned-backlink campaign, or manufacture campaign progress with paid placements, reciprocal links, generic directories, bulk guest posts, or requested anchor text. The campaign requires relevant, individual editorial outreach and a live, crawlable deep link before it counts a result.
- Alter CSP to permit unsafe inline tracking or add unreviewed third-party trackers.

## Owner questions and requested inputs

1. GA4 update: on 3 September the stale no-stream-data `provider_click` marker was removed, `outbound_click` was marked as the key event, and Event data retention was set to 14 months. Internal Traffic remains in Testing until its IP scope is reviewed. No tag/container change was made.
2. The focused Search Console inspection established the first narrow guide PR. A full query×page export remains needed for broader cannibalisation analysis.
3. Impact is confirmed as a mixed TTC/social affiliate account. It must not be used as a TTC conversion measure until a TTC-specific campaign/filter or verified SubId reconciliation exists; do not enable SubId passthrough without Impact confirming the parameter.
4. Please confirm the intended Ticket Liquidator Impact tracking URL contract only if the residual, non-burst failure stream points to an upstream/configuration change; the current safety block must remain in place.
5. PR #831 has merged and its production deployment is live. The deployed guide serves the approved three-provider metadata; measure its query-to-page split in Search Console over 4–8 weeks. Runtime and data-pipeline work remain contingent on their evidence/deployment prerequisites; IndexNow was reverified and submitted successfully on 2 September. Historical CPU attribution remains BLOCKED because Cloudflare Log Explorer is not enabled; do not purchase it without a separate owner decision. A bounded interactive tail of new errors is separately actionable once a local, least-privilege credential is available, with aggregate-only recording and no raw request URLs.
6. Search Console now reports 7 external links, all to the homepage (4 Reddit, 3 X), and no listed deep link to the Vivid Seats vs Ticketmaster campaign guide. The next permitted move is owner-operated, individually qualified outreach under `docs/BACKLINK_CAMPAIGN.md`; do not buy, exchange, bulk-create, or prescribe links.
7. **Resume point.** The authenticated Cloudflare D1 check completed the `first_seen` and prescribed landing-join queries. It establishes 20 August as the first valid attempt-based funnel date, but the post-cutover server receipt stream still cannot support page conversion rates: 5,541 successful receipts versus 87 client CTA-intent events, and only 42 receipts attributed by the prescribed bounded landing join. The next safe work is aggregate telemetry that can explain the receipt-source classes without querying or exporting personal data. Until then, goal item 7 (conversion-weighted page ranking) is **BLOCKED — needs a defensible post-cutover client-intent/receipt reconciliation**.

```sql
SELECT COALESCE(NULLIF(TRIM(entry.landing_path), ''), '(unknown)') AS landing_path,
       COUNT(*) AS clicks
FROM analytics_events click
JOIN (
  SELECT request_key AS visitor_key,
         substr(created_at, 1, 10) AS visit_day,
         landing_path,
         MIN(created_at) AS first_view
  FROM analytics_events
  WHERE event_name = 'page_view' AND TRIM(COALESCE(landing_path, '')) != ''
  GROUP BY visitor_key, visit_day
) entry
  ON entry.visitor_key = click.request_key
  AND entry.visit_day = substr(click.created_at, 1, 10)
WHERE click.event_name = 'outbound_click'
  AND click.created_at >= '2026-08-06T00:00:00Z'
GROUP BY 1
ORDER BY clicks DESC;
```

   This is the report's own statement with a 28-day bound added. It was run read-only and aggregates only; it returns no `request_key` or personal data. It produced 42 attributed receipt rows, which is why it cannot yet be used as the requested page-ranking denominator.

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

On 3 September, the low-rate production-route verifier rechecked all 10 sampled trust/static routes: each returned 200 after the `www` to apex redirect and carried its expected title, canonical, meta description and H1. `indexnow-ping.mjs --dry-run` verified the live key and sitemap, then `indexnow-ping.mjs` submitted all 311 sitemap URLs with an HTTP 200 response. GitHub's five most recent `IndexNow ping` workflow runs (26 August–1 September) all completed successfully; #841 does not change any workflow trigger path, so its non-trigger is expected. The local commercial-funnel and Web Vitals wrappers were not substituted with synthetic data because no local Wrangler executable is available; equivalent manual D1 reads were SELECT-only and are recorded above. Generated local audit outputs changed only because their audit scripts were run and are not proposed production edits.

**Independent re-run, 3 September (clean checkout, dependencies installed from `package-lock.json`):** the repository instruments were run again and reproduce the figures recorded above.

```text
audit:indexable-surface:check  1127 routes, 309 indexable, 818 noindex (baseline 311)
                               venue: 75 -> 73 (inventory-decay)
                               no orphans, no empty indexable routes, no duplicate titles,
                               no structural change
audit:internal-links           1127 routes crawled, 0 problem(s)
schema:validate                all checks passed (including the offer-schema reject cases)
report:link-coverage:check     OK (with 64 warning(s)): every upcoming event leads somewhere;
                               64 lead to a single provider
                               causes: 64 API-cap/unprocessed, 59 no qualifying listing, 5 ambiguous
roster:forecast                +0d 277 -> +90d 150 dynamic indexable routes
                               BTS goes noindex 2026-09-08 (last show 2026-09-07)
```

A live fetch of `https://tourticketcompare.com/sitemap.xml` returned 309 `<loc>` entries, matching the local indexable count exactly. `npm run report:commercial-funnel` and `npm run report:web-vitals` still could not be run: this environment has no Cloudflare credentials and no authenticated Wrangler, so every D1 figure in this report remains a manual console read rather than a reproducible wrapper run. The manual 3 September D1 read establishes the first valid attempt-based window at `2026-08-20T14:10:15.753Z`; within it, attempts reconcile exactly to terminal outcomes but client CTA intent and page attribution do not yet reconcile to successful redirect receipts.
