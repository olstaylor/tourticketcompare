# Organic discoverability audit — 2026-09-02

**Goal under assessment:** increase qualified organic entrances that go on to produce a monetized outbound provider click, without breaking the repository's publishing rules.

**Audit source:** `olstaylor/tourticketcompare` at `c56dfe4` (main, 2026-09-02), served production at `https://tourticketcompare.com`.

**Status:** Phases 0–1 complete and independently re-verified. Phase 2 (demand analysis) is **largely blocked** — see the capability table. Phase 3 (measurement integrity) complete on the code path, blocked on the console path. Phase 4 plan below is **awaiting approval**; no implementation has begun and no repository content was changed by this audit beyond adding this file.

> **Provenance note.** An earlier session (Codex, 2026-09-02 09:39–09:59) reached Phase 0 and began Phase 1 before running out of credits. Its numbers are cited below **only where labelled second-hand**, because the exports it produced live on a local machine that this environment cannot read. Nothing second-hand is used as a baseline or a target.

---

## 1. Executive summary

1. **On-page technical hygiene is not the constraint and should not absorb effort.** All 311 indexable routes reconcile exactly with the 311-entry sitemap (0 missing, 0 extra), and **all 311 were individually verified as served**: `200`, `index,follow`, self-canonical on the apex. 0 duplicate titles, 0 duplicate descriptions, 0 orphans, `schema:validate` clean. The one live defect found is that the origin **shed 40–49% of requests as `503` under sustained crawling** while every one of those same URLs returned `200` at a slower rate (F7).
2. **The binding constraint is calendar decay against roster refill, not SEO.** With no newly announced dates, the indexable surface falls from **279 to 153 routes (−45%) within 90 days**, and to 42 within a year (`npm run roster:forecast`). No on-page change survives that. This is the disagreement with the brief's framing, stated as the brief invites.
3. **66 of 311 indexable routes (21%) cannot produce a monetized click at all.** All **56 indexable city pages** render zero provider CTAs — confirmed in code, not inferred — and **10 empty-board artist pages** render no ticket destination of any kind while sitting `index,follow` in the sitemap.
4. **4 of the 5 comparison guides carry no event-level CTA.** The provider-pair module is hard-gated in `functions/[[path]].js` to exactly `["ticketmaster","vivid-seats"]`, so the SeatGeek comparison guide — SeatGeek being the *primary* affiliate lane per `CLAUDE.md` — monetizes nothing.
5. **GA4 cannot answer the question the brief assigns it.** By documented design it never receives path, city, venue, event id or referrer, so the required "GSC landing page → `outbound_click` rate" join is structurally impossible in GA4. First-party D1 is the authoritative instrument and is unreachable from this environment.

---

## 2. Capability and evidence table

This environment is a remote container. It is **not** the environment the earlier session ran in, and browser/console access did not carry over.

| Source | Status here | Evidence |
|---|---|---|
| Live site | **Available** | 58-URL sample crawl, all route types, 57/58 `200` first attempt; `/` returns `200` in 0.80s |
| GitHub repo | **Available** | Branch listing, commit inspection, Actions run history via MCP |
| Repo instruments | **Available** | `audit:indexable-surface`, `audit:internal-links`, `schema:validate`, `report:link-coverage`, `roster:forecast` all run clean |
| Google Search Console | **BLOCKED** | No API credentials, no browser tool in this container |
| GA4 | **BLOCKED** | No Data API credentials |
| Google Tag Manager | **BLOCKED (console)** | Container contents not readable here; the *site-side* tag is fully readable in `public/index.html` |
| impact.com | **BLOCKED** | No `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` in env |
| First-party D1 (`DEMAND_DB`) | **BLOCKED** | `report:commercial-funnel` and `report:web-vitals` both fail: `wrangler` requires `CLOUDFLARE_API_TOKEN`, unset here |
| CSV intake (`artifacts/seo-inputs/`) | **BLOCKED — directory absent** | `artifacts/` is gitignored and does not exist in this container; the earlier session wrote its exports to a local path outside this environment |

**Measurement configuration recorded (verified here, first-hand):**

- GTM container: `GTM-MZ42TPMM` (`public/index.html:12`, and the `ns.html` noscript iframe at line 78).
- GA4 measurement ID: **`G-Q7R1NQY8YH`, present literally** at `public/index.html:24`, configured `gtag('config', 'G-Q7R1NQY8YH', {'send_page_view': false})`.
  - *Correction to the earlier session's Phase 0*, which reported that `public/index.html` "does not contain a literal GA4 ID". It does. That session may have been reading a different worktree.
- Sitemap: `https://tourticketcompare.com/sitemap.xml` → `200`, **311 `<loc>` entries**.
- `robots.txt`: allows `/`, disallows `/api/`, `/internal/`, `/admin` — none of which the sitemap advertises. **Pass.**
- IndexNow key: `public/9ffca7bd48067983c70d2ce6601728d3.txt` is **live and correct** (`200`, `text/plain`, content matches the key).
  - *Correction to the earlier session*, which reported `indexnow:ping` failing because the key file was not live. It is live now; `indexnow:ping:self-test` passes (311 URLs derived).

**Everything below marked `BLOCKED` needs one of:** the nine CSV exports placed in `artifacts/seo-inputs/`, or GSC/GA4/impact API credentials, or `CLOUDFLARE_API_TOKEN` for D1.

---

## 3. Baseline

### 3a. Repository-derived baseline (first-hand, captured 2026-09-02 against `c56dfe4`)

| Metric | Value | Source |
|---|---|---|
| Rendered routes | 1,130 | `npm run audit:indexable-surface` |
| Indexable routes | 311 | same |
| Sitemap entries | 311 | live `sitemap.xml` |
| Indexable ↔ sitemap reconciliation | 311/311 exact, 0 either way | cross-check script |
| Indexable by type | artist 42/50 · city 56/173 · venue 75/299 · artist-city 106/575 · guide 18/18 · static 9/9 · index 4/5 · home 1/1 | surface audit |
| Upcoming events | 786 of 1,022 reviewed records | `npm run report:link-coverage` |
| Events with 3+ publishable CTAs | 664 (84.5% of upcoming) | same |
| Events with exactly 1 CTA | 64 | same |
| Events with 0 CTAs | 0 | same |
| Projected indexable surface, +90d, no new dates | **153 (−45% from 279)** | `npm run roster:forecast` |
| Duplicate titles / descriptions among indexable | 0 / 0 | cross-check script |
| Schema validation | all checks passed | `npm run schema:validate` |
| Internal-link audit | 1,130 routes, 0 problems | `npm run audit:internal-links` |

### 3b. Search/analytics baseline

**BLOCKED — needs `gsc-queries-16mo.csv`, `gsc-pages-16mo.csv`, `gsc-query-page-90d.csv`, `gsc-countries-90d.csv`, `gsc-devices-90d.csv`, `gsc-coverage-export.csv`, `ga4-landing-pages-90d.csv`, `ga4-events-90d.csv`, `impact-actions-90d.csv`.**

The earlier session reported the following. **Treat as unverified second-hand context, not a baseline** — none of it was reproducible here, and no target in this document is derived from it:

- GSC, period 2026-07-05 → 2026-08-30 (the property's full available history): 32 clicks, 9,061 impressions, 0.4% CTR, average position 25.4.
- `vivid seats vs ticketmaster`: 210 impressions, average position 8.78, 0 clicks.
- GA4, last 28 days: `page_view` 734, `provider_cta_view` 1, `outbound_click` absent.
- GSC properties: domain `sc-domain:tourticketcompare.com` plus URL-prefix `https://tourticketcompare.com/`; no `www` or `.pages.dev` property visible. Sitemap submitted, last read 2026-08-28, 271 pages discovered.

**A real baseline must be re-captured before any before/after claim is made.** Note in particular that the property holds under two months of data, so 16-month exports will not contain 16 months, and seasonality cannot be separated from calendar decay yet.

---

## 4. Findings

### CONFIRMED

#### F1 — 56 indexable city pages render no provider CTA at all
**Effect on goal: high. Confidence: certain.**

Every indexable city page ends the user journey in an internal link, not a ticket destination.

- Evidence, served: `/cities/boston-united-states`, `/cities/inglewood-united-states`, `/cities/phoenix-united-states`, `/cities/miami-united-states`, `/cities/fort-worth-united-states`, `/cities/san-antonio-united-states` — all six sampled contain **0** occurrences of `/api/out` and **0** `data-cta-provider` attributes.
- Evidence, code: `renderCityShowGroups()` (`functions/[[path]].js:1451`) emits a bare `<li><time>…</time> — <artist link></li>` per show. `renderVenueShowGroups()` (`functions/[[path]].js:1934`) calls `renderShowCardServerHtml()` and produces full CTA cards. Venue pages sampled carry 150, 59, 36, 17, 15 and 13 `/api/out` links respectively.
- The gate contradicts the render: `docs/ROUTE_INDEXABILITY_POLICY.md` requires a city page to have "≥ 1 show with a publishable ticket destination" — the page tests for a destination it then does not show. The policy's own justification ("a page titled 'concerts in X' that can lead nowhere cannot serve its own purpose") argues for rendering it.
- **Module that controls it:** `functions/[[path]].js` (protected — diff approval required).

City pages are 18% of the indexable surface. Their organic entrances can only convert at (city → artist click-through) × (artist page CTA rate), against the venue page's single hop.

#### F2 — 10 empty-board artist pages are `index,follow` and in the sitemap with no ticket destination
**Effect on goal: medium-high. Confidence: certain.**

`/artists/beyonce`, `ariana-grande`, `bad-bunny`, `morgan-wallen`, `raye`, `tate-mcrae`, `rosalia`, `post-malone`, `jelly-roll`, `in-flames`.

- Served: `index,follow,max-image-preview:large`, self-canonical, present in `sitemap.xml` (10/10 verified individually).
- `/artists/beyonce` renders an empty state, an email capture, and links to a guide and the artist index. It contains **no** `data-cta-provider` and **no** `/api/out` link — the single `api/out` string in the HTML is prose in a disclosure sentence.
- This became true yesterday: `c407059` "Phase 3: trim empty artist pages to verified content (#828)" (2026-09-01) removed the sections these pages used to carry.

**Four sources disagree about these ten pages, which is the real defect:**

| Source | Says |
|---|---|
| Served HTML | `index,follow`, in sitemap, no ticket destination |
| `docs/ROUTE_INDEXABILITY_POLICY.md` | "An empty board … drops to `noindex,follow` and leaves the sitemap until a new verified date lands" |
| `functions/_artist-indexability.js` | Deliberately the opposite: "Future-date availability is presentation state, not a reason to … noindex the artist URL" |
| `scripts/report-roster-forecast.mjs` | Lists all ten under "Already noindex (no upcoming shows)" — **mislabelled** |
| `PROJECT_STATUS.md` | Says these render "artist-level CTAs only" — **stale since #828**; they render none |

The code and the policy document assert opposite rules, and two status instruments describe a state that is not live. Whichever way the owner decides, three of these five must change.

- **Modules:** `functions/_artist-indexability.js`, `docs/ROUTE_INDEXABILITY_POLICY.md`, `scripts/report-roster-forecast.mjs`, `PROJECT_STATUS.md`.

#### F3 — The comparison-guide CTA module is hard-gated to one provider pair
**Effect on goal: high. Confidence: certain.**

- `renderGuideProviderPair()` (`functions/[[path]].js:3539`) returns `""` unless `comparisonProviders` is exactly `["ticketmaster","vivid-seats"]`.
- Only `content/guides/vivid-seats-vs-ticketmaster.md` declares `comparison_providers` front matter; it is the only entry carrying `comparisonProviders` in `functions/_guide-routes.generated.js:30`.
- Served consequence: `/guides/vivid-seats-vs-ticketmaster` carries **16** `/api/out` links. `/guides/seatgeek-vs-ticketmaster`, `/guides/concert-ticket-fees-explained`, `/guides/how-to-avoid-ticket-scams`, `/guides/how-to-compare-concert-ticket-prices` and `/guides/ticket-delivery-and-transfer-timing` each carry **0**.
- The unmonetized set includes the SeatGeek comparison, and `CLAUDE.md` names SeatGeek the primary affiliate CTA.
- Context: the module was built as the citation asset for the 90-day campaign in `docs/BACKLINK_CAMPAIGN.md`, which is scoped to that one guide — so the narrow gate was deliberate at the time, not an oversight. Extending it is a scope decision, not a bug fix.
- **Modules:** `functions/[[path]].js` (protected), `content/guides/*.md` (+ `npm run guides:build`).

#### F4 — GA4 cannot support the landing-page → outbound-click join the brief requires
**Effect on the plan: high. Confidence: certain.**

- `docs/COMMERCIAL_FUNNEL.md:356-361`: GA4 receives a mirror with "low-cardinality parameters only (page type, artist slug, provider, CTA location, affiliate flag). **No event id, city, venue, path, referrer or address is ever sent to GA4.** GA4 cannot see the server-side outbound redirect at all, which is why first-party D1 remains authoritative."
- Confirmed in code: `mirrorToGa4()` (`public/shell.js:80-91`) sends only `page_type`, `artist_slug`, `provider`, `cta_location`, `is_affiliate`.
- Consequence: per-URL organic → `outbound_click` rate is **not derivable in GA4 at any effort**. The brief's instrument ordering (GA4 as authority #2) does not fit this site. D1 holds `sourcePath` and `landingPath` and is the correct instrument.
- The wiring itself is sound: `provider_click` → GA4 `outbound_click` is bound at `public/shell.js:139` via a delegated listener on `a[data-cta-provider]`, and `provider_cta_view` at line 177. `app.js` is not loaded on server-rendered pages (they load `shell.js`, plus `artist-board.js` on artist pages) — the handler is in `shell.js`, so the path is intact.
- One structural caveat for interpreting any GA4 export: `provider_cta_view` is capped at **one per page load** by the `providerViewSent` guard, so it counts qualifying page-sessions, not CTAs seen.

#### F5 — IndexNow did not fire for today's data changes
**Effect on goal: negligible for Google. Confidence: high (observation certain, cause probable).**

- Today's commits `86efd5c`, `822a37b`, `c56dfe4` all modified `public/data/events.json`, a declared trigger path in `.github/workflows/indexnow-ping.yml`.
- Latest IndexNow run is #35 at 2026-09-01T16:12Z. No run fired on 2026-09-02. Run history: 34 success / 1 failure across 35 runs.
- Probable cause: all three commits are authored by `github-actions[bot]` and committed by `GitHub`, and GitHub does not start workflows from pushes made with the default `GITHUB_TOKEN`. The workflow's own header documents this caveat for `content-build.yml` but claims the sync lanes *do* fire — for these commits they did not.
- **Google does not participate in IndexNow**, so this affects Bing/Yandex-class discovery (and Copilot/ChatGPT search surfaces) only. It is not a Search Console substitute and not a fix for any Google finding here.

#### F6 — Cross-checks that PASS (recorded so they are not re-litigated)

| Cross-check | Result |
|---|---|
| Every sitemap URL `200` and `index,follow` | **Pass** — 311/311 verified as served (see §4a) |
| Every indexable route present in sitemap | **Pass** — 311/311, 0 missing |
| No `noindex` URL in the sitemap | **Pass** — 0 of 311 served `noindex` |
| Canonicals self-referencing, apex origin | **Pass** — 0 mismatches across 54 HTML samples, 0 non-apex |
| `.pages.dev` duplicate-index leak | **Pass** — `tourticketcompare.pages.dev` serves `noindex,follow` *and* canonicalises to the apex |
| `robots.txt` blocks nothing the sitemap advertises | **Pass** |
| `lastmod` neither uniformly stale nor uniformly today | **Pass** — spread across 15 distinct dates, 2026-04-30 → 2026-09-02 |
| Single-date artist-city: `noindex,follow`, self-canonical, absent from sitemap, still linked | **Pass** — all 469 are `noindex,follow`, 0 non-self-canonical, and all 469 retain exactly 1 inbound contextual link from their artist page |
| Titles/descriptions unique across the surface | **Pass** — 0 duplicate clusters |
| Primary answer present without JavaScript | **Pass** — all crawls were raw HTML with no JS execution; H1, schedule, schema and CTAs all present |
| Exactly one `<h1>` per page | **Pass** — 54/54 |
| CSP | Strict; `script-src` uses two SHA-256 inline hashes, no `unsafe-inline` |

#### F7 — The origin sheds 40–49% of requests as `503` under sustained crawling
**Effect on goal: unknown but potentially high. Confidence: behaviour certain; Google impact unmeasured.**

This started as a single stray `503` and became the most load-bearing empirical result of the audit. Four runs against the same 311 URLs:

| Run | Pattern | Result |
|---|---|---|
| Sample | 58 URLs, sequential, 400ms | 1 × `503` (1.7%) |
| Run 1 | 311 URLs, sequential, 600ms, up to 3 attempts each | **123 × `503` final (39.5%)** |
| Run 2 | 311 URLs, **4 concurrent**, up to 3 attempts each | **151 × `503` final (48.6%)** |
| Control | 25 URLs that never succeeded in run 1 or 2, **3s spacing**, 1 attempt | **25 × `200`, 0 failures** |

- **No page is broken.** After the slow re-verification pass, **all 311 sitemap URLs returned `200`**, with `index,follow,max-image-preview:large`, self-canonical, apex origin — 0 exceptions on any of the three checks.
- Failure rate rises with request rate (1.7% → 39.5% → 48.6%) and falls to 0% at 3s spacing. It is load-dependent, not URL-dependent: `/cities/inglewood-united-states` and `/cities` both failed all three attempts in both full runs, and both returned `200` in the control minutes later.
- Failures arrive in **bursts with recovery windows**, not as a single cutoff after a threshold — the shape of resource shedding, not a fixed rate-limit rule.
- Data-heavy routes (artist, city, venue, artist-city) carry all 123 run-1 failures and the 18 guides carry none — but **guides sit early in sitemap order and were crawled before the first failure burst**, so that contrast is confounded by position and must not be read as "guides are immune".
- Plausible mechanism, **not verified**: these routes are server-rendered by Pages Functions doing D1/cache reads per card (`docs/ARCHITECTURE.md`), so Workers resource or subrequest limits are a candidate. Cloudflare rate limiting is the other. Distinguishing them needs the Cloudflare dashboard, which is out of scope here.

**Why this is not yet an established Google problem:** Googlebot self-throttles, crawls a site this size well below 1.6 req/s, and backs off on 5xx. It may never see this. But a 5xx served to Googlebot suppresses crawling of that URL, and the sitemap advertises 311 URLs on a decaying surface where re-crawl speed is exactly what keeps the index fresh. It also means **any third-party SEO crawler will produce a wildly false picture of this site** — worth knowing before trusting one.

**Next step is measurement, not code:** the GSC Crawl Stats report (Settings → Crawl stats) shows the by-response-code breakdown for Googlebot specifically and settles it in one screen. `BLOCKED — needs GSC Crawl Stats / gsc-coverage-export.csv.`

*(This finding supersedes the earlier session's report of Cloudflare `1102` responses during a rapid sitemap fetch, which it correctly declined to call a Google-indexing failure. Same phenomenon, now quantified with a control.)*

### BLOCKED (Phase 2 — demand analysis)

Every item below is the substance of the brief's Phase 2 and cannot be started without the exports. None of it is guessable from the repository.

| Phase 2 item | Status |
|---|---|
| 1. Striking distance (pos 5–20) | `BLOCKED — needs gsc-queries-16mo.csv` |
| 2. High impressions, low CTR | `BLOCKED — needs gsc-queries-16mo.csv`, `gsc-pages-16mo.csv` |
| 3. Query→page mismatch / cannibalisation | `BLOCKED — needs gsc-query-page-90d.csv` |
| 4. Unserved demand | `BLOCKED — needs gsc-queries-16mo.csv` |
| 5. Decay | **Partially answerable** — the repo half is quantified (§3a, F-decay below); the "lost position / dropped out of index" half is `BLOCKED — needs gsc-pages-16mo.csv`, `gsc-coverage-export.csv` |
| 6. Branded vs non-branded, international | `BLOCKED — needs gsc-countries-90d.csv`, `gsc-devices-90d.csv` |
| 7. Conversion weighting | `BLOCKED — needs D1 access` (not GA4 — see F4) **and** `impact-actions-90d.csv` |
| 8. Guide gaps / backlink campaign | **Partially answerable** — coverage mapped below; earned traffic and referring domains `BLOCKED — needs gsc-pages-16mo.csv` and an external backlink source |

#### Decay, the repo half (first-hand)

`npm run roster:forecast`, no new dates announced:

| Horizon | Artists | Cities | Venues | Artist-cities | Total |
|---|---|---|---|---|---|
| now | 42 | 56 | 75 | 106 | **279** |
| +30d | 42 | 49 | 63 | 89 | **243** |
| +90d | 42 | 29 | 32 | 50 | **153** |
| +365d | 42 | 0 | 0 | 0 | **42** |

Within 14 days, 8 artist-city routes run out of shows and 9 city/venue routes fall below their gate. One artist page (BTS) drops out within 30 days. Within 90 days, 27 cities and 43 venues fall below gate.

The artist count is flat at 42 only because the artist gate does not require upcoming dates (F2) — under the *documented* policy it would fall to 32 immediately and keep falling.

#### Guide coverage against the brief's named clusters (first-hand)

18 published guides. The informational clusters the brief names are already covered: fees (`concert-ticket-fees-explained`), transfers/delivery (`ticket-delivery-and-transfer-timing`), resale legitimacy (`primary-vs-resale-concert-tickets`, `how-resale-ticket-pricing-works`, `how-to-avoid-ticket-scams`), refunds/cancellation (`what-to-do-if-a-concert-is-postponed-or-cancelled`), onsale prep (`how-to-prepare-for-a-ticket-onsale`). **Presale codes specifically** have no dedicated guide; `seatgeek-promo-code-guide` is the nearest. Whether any of this earns traffic is `BLOCKED`.

---

### §4a — Full 311-URL sitemap verification (complete)

Every URL in `sitemap.xml`, verified as served on 2026-09-02:

| Check | Result |
|---|---|
| Returned `200` | **311 / 311** |
| Served `noindex` (a defect if any) | **0** |
| Missing `robots` meta | **0** |
| Canonical not self-referencing | **0** |
| Canonical not on the apex origin | **0** |

Method: two full passes (sequential 600ms; 4-way concurrent), then a slow re-verification pass at 3–5s spacing for every URL not yet successfully parsed, until all 311 had a parsed `200`. The `503`s encountered along the way are F7, not page defects — every affected URL resolves `200` when requested unhurriedly.

---

## 5. Ranked remediation plan (awaiting approval — nothing implemented)

Scored by expected effect on the **joint** goal ÷ effort. Every PR below is one theme, independently revertible.

| # | PR | Theme | Effect | Effort | Validation | Protected-file approval |
|---|---|---|---|---|---|---|
| 1 | `seo/city-page-ticket-destinations` | Render the existing gated show-card CTAs on city pages (F1) | **High** — makes 56 indexable routes monetizable in one hop | M | `npm run test:mvp` | **Yes** — `functions/[[path]].js` diff posted first |
| 2 | `seo/empty-board-artist-decision` | Resolve F2: make code, policy doc, forecast and status agree | **High** — removes 10 zero-destination pages from the index, or ratifies them deliberately | S | `npm run test:routes`, `npm run test:quick` | Depends on direction chosen |
| 3 | `seo/guide-provider-pair-generalisation` | Extend the provider-pair module beyond the single hard-coded pair (F3) | **High** — monetizes the commercial-intent guide cluster incl. the primary lane | M | `npm run test:mvp` | **Yes** — `functions/[[path]].js` |
| 4 | *(investigation, not a PR)* | Diagnose F7 load-shedding from GSC Crawl Stats + Cloudflare dashboard | Unknown, possibly high | S | — | No |
| 5 | `ops/indexnow-sync-lane-trigger` | Make the sync lanes actually ping (F5) | **Low** (Bing/Yandex only) | S | `npm run indexnow:ping:self-test` | No |
| 6 | *(unscheduled)* | Everything from Phase 2 | Unknown | — | — | — |

**PR 1 and PR 3 must not be bundled** — one is a routing/template change, the other spans a template and generated content.

**Deliberate ordering note:** PR 2 is ranked above PR 3 despite lower revenue upside because it is the one finding where the repository actively contradicts itself, and that contradiction will keep producing wrong answers from `roster:forecast` and `PROJECT_STATUS.md` until it is settled.

**I recommend approving nothing beyond PR 2 and PR 4 until the exports land.** PR 1 and PR 3 are well-evidenced structurally, but "which pages are worth improving" is exactly what Phase 2 is for, and both touch a protected file. Shipping them blind is the kind of plausible-looking work the brief asks me not to pad with.

---

## 6. Explicitly rejected ideas

- **Loosening the city/venue/artist-city indexability thresholds to grow the surface.** Forbidden by constraint 7 without GSC evidence of distinct demand, and that evidence is exactly what is blocked. The +45% decay problem is a roster problem; re-indexing thin pages would substitute an inventory answer with a measurement illusion.
- **Making the 469 single-date artist-city pages indexable to offset decay.** Same rule, and the policy's reasoning is sound: the page restates one card already on the artist page. It would add near-duplicates for a temporary count.
- **Writing new city/venue copy to "strengthen" thin pages.** `docs/CONTENT_RULES.md` and the policy's Rule 3 forbid filler, and the aggregation-layer pages are explicitly meant to be as long as their schedule. F1 is a *missing CTA*, not missing prose — the fix adds a destination, not words.
- **Programmatic expansion into new artist/city combinations to replace decaying routes.** Requires artists onboarded through the gated workflow with verified data. Generating routes ahead of verified dates is the doorway-page pattern constraint 6 forbids.
- **Adding FAQ schema to city and venue pages to chase rich results.** Removed deliberately (`ROUTE_INDEXABILITY_POLICY.md`, "Shared content rules"); re-adding it would emit schema for content the page does not show.
- **Fixing the H1 that turned out not to be broken, and the "unlinked noindex pages" that turned out to be linked.** I initially misread `inbound_contextual` as an array; all 469 `noindex` artist-city pages do keep their inbound link. Recorded so it is not re-raised.
- **Shipping a code fix for the 503 load-shedding (F7).** The behaviour is confirmed, but its cause is unverified (Workers resource limits vs Cloudflare rate limiting) and its Google impact is unmeasured. Changing render or caching behaviour on the strength of a synthetic crawl — against protected files, no less — is exactly the speculative work to avoid. Read Crawl Stats and the Cloudflare dashboard first; those cost minutes and decide whether there is anything to fix.
- **Reducing the sitemap or slowing the render to avoid the 503s.** Would trade a measured index surface for an unmeasured crawl concern.
- **Treating IndexNow as an indexing remedy.** Google does not participate. Worth fixing as hygiene; not a lever on this goal.
- **Loosening the CSP for any tag or test tool.** Constraint 5. The current policy is strict with two SHA-256 inline hashes and no `unsafe-inline`; any GTM tag needing a new origin is a reviewed code change, not a container edit.
- **Rebuilding the GA4 mirror to send path/city/venue so the brief's join works.** This is a deliberate privacy stance documented in `docs/COMMERCIAL_FUNNEL.md`. The correct answer is to use D1, which already holds those fields — not to weaken the stance to satisfy an instrument ordering that was specified without knowledge of this design.
- **Re-running `npm run indexnow:ping` from this session to test F5.** It is an outward-facing submission to third-party search engines. Diagnosed from the workflow, run history and a live key-file probe instead.
- **Re-anchoring the indexable-surface baseline** to clear the four `unexplained-growth` warnings. The audit is behaving correctly after an artist batch; silencing it would remove a real tripwire.

---

## 7. What you must do yourself

1. **Place the nine CSV exports in `artifacts/seo-inputs/`** (gitignored) — *and note this container cannot see your Mac*. They must land in the environment that runs the analysis, or be attached to the session directly. Without them Phase 2 does not start.
2. **Decide F2**: should an artist page with no upcoming dates stay indexable? This is an editorial/product call, not a technical one. The durability argument in `_artist-indexability.js` and the thin-page argument in the policy doc are both defensible — but the site must pick one and make all five sources agree.
3. **Decide F3 scope**: extending the provider-pair module beyond the campaign's single citation asset touches affiliate surface and `docs/BACKLINK_CAMPAIGN.md`'s premise. Confirm which approved lanes may appear on which guides.
4. **Approve or reject PR 1's `functions/[[path]].js` diff** once posted.
5. **Open GSC → Settings → Crawl stats** and read the response-code breakdown for Googlebot. This is the single highest-value five-minute action in this document: it converts F7 from "confirmed under synthetic load, unknown for Google" into either a live crawl-budget incident or a non-issue. While there, check the Cloudflare dashboard for rate-limiting rules and Workers resource-limit errors on the Pages project.
6. **Console-side, unverifiable from here:** confirm GSC property variants and GA4 linkage, that `outbound_click` is registered as a key event, internal-traffic exclusion and bot filtering, and data retention set to maximum. The earlier session read GTM as read-only with one Google tag, one custom-event trigger and no user-defined variables — worth re-confirming before any tag change.
7. **Re-capture the baseline** (§3b) from the live consoles, dated, before any change ships.

---

## 8. Open questions and unknowns

1. Which pages actually earn impressions? Everything in Phase 2 hinges on it and nothing in the repository answers it.
2. Is the roster refill rate keeping pace with the −45%/90d decay? `roster:forecast` gives the floor; the discovery lanes' actual add-rate over the last 90 days would give the answer, and is derivable from git history if you want it measured.
3. Do city-page entrances convert at all today? Answerable from D1 (`sourcePath` on `page_view` vs `provider_click`) the moment credentials exist — and it is the direct test of F1's value before writing any code.
4. Was `provider_cta_view = 1 / page_view = 734` (second-hand) a real funnel collapse or an artifact of the one-per-page cap plus traffic landing mostly on CTA-less pages? F1 and F2 predict the latter. D1 settles it.
5. Is the `.pages.dev` host verified as a separate GSC property? It canonicalises correctly, so this is confirmation, not suspicion.
6. What actually causes F7 — Workers resource/subrequest limits on data-heavy renders, or a Cloudflare rate-limiting rule? The distinction decides whether there is any engineering work at all, and neither is visible from the repository.
7. Which environment should own this work? The Codex session had browser/console access this container lacks; this container has repo instruments and reliable site access. Neither has both.

---

*Prepared 2026-09-02 against `c56dfe4`. No production or repository content was modified beyond the addition of this report. No implementation PRs opened — awaiting approval per Phase 4.*
