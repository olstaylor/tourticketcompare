# Launch-readiness audit — 2026-09-24

Phase 0 of the owner-requested "safe-to-scale" milestone ahead of the 2027
launch. **Audit only: no code, data, or config was changed to produce it.**
This is a point-in-time snapshot; live counts stay in `PROJECT_STATUS.md` and
priorities in `BACKLOG.md`. When a finding is fixed or overtaken, update the
canonical file and leave this as the dated record.

> **Documentation-rule note.** `AGENTS.md` says not to create parallel audit
> documents. The owner asked for this file by name, and `CLAUDE.md` (which wins)
> permits a new doc when explicitly asked. It is written as a dated record and
> duplicates no canonical fact beyond the measurements below.

## How this was measured

| Source | What it gave |
|---|---|
| `main` at `73bce8e`, branch `milestone/2027-launch-readiness` | Repo data, code and gates |
| Production `GET /api/shows?includePrices=true&priceProviders=approved-marketplaces` (3 pages, 1,408 upcoming shows, 2026-09-24 11:44Z) | Which dates actually carry a live price right now |
| Production `/api/health`, `/sitemap.xml` (493 URLs) | Live flags and sitemap, both identical to the repo derivation |
| Live HTML for 9 representative routes, rendered locally at 390×844 and 1366×900 | UX, CTA position, page weight |
| GitHub Actions run history and open issues | Snapshot cadence and automation health |
| `npm run test:mvp` and the extra checks listed in §6 | CI status |

Not available to this audit: Search Console, D1 (per-route traffic, Web Vitals
beacons), and any page behind a provider WAF. Where a ranking would need
traffic, it says so and uses a stated proxy instead.

---

## 1. Price display

### Headline

- **1,408 upcoming dates** on indexable artists. **1,031 (73%) show at least one
  live listed-price snapshot** in production. **377 show none.**
- **The price pipeline itself is healthy.** Both writers are green on every
  recent scheduled run, `price-freshness-check.yml` is green, and there is no
  open `automation:health` issue. Nothing in the 377 is caused by a failing
  snapshot run. The one cadence risk is noted under cluster 6.
- **One template renders no prices at all: city pages.** This is the largest
  visible gap, and it is a code choice, not missing data (cluster 1).

### The path, end to end

```text
nightly link syncs (vividseats-cta-sync, impact-marketplace-provider-sync)
  → events.json provider_links[<lane>].verified + <lane>_url     (git, auto-merged PR)
hourly writers (vividseats-price-snapshots, impact-marketplace-price-snapshots)
  → D1 provider_pricing_cache (+ provider_pricing_history)        (no git)
request → [[path]].js onRequest → attachApprovedMarketplacePrices (shows.js)
  → approvedServerPriceLane → serverShowCtaSpecs → button price / notes
```

A date can only show a price if its lane has **verified provenance, a valid
stored URL, and a fresh, unexpired D1 row**. SeatGeek is in the lane list but
can never price (its API returns null stats), so it is not a source.

### Clusters of dates and templates with no price

| # | Cluster | Dates / routes | Hypothesis (and evidence) | Fixable how |
|---|---|---|---|---|
| 1 | **City pages render no prices** | **All 258 city routes** (85 indexable). London: 146 buttons, 0 priced. Chicago: 126, 0. Venue pages for the same shows are priced (The O2: 64 of 96). | `onRequest` in `functions/[[path]].js` only queries D1 for `artist`, `artist-city`, `venue` and `comparison-hub`. `city` was never added. Unqueried cards correctly render no note, so the gap is silent. | One-line route-type addition in a protected file, plus smoke assertion. Reads stay batched at 50. |
| 2 | **No resale mapping at all** (Ticketmaster link only) | **270 dates**. 90 of them belong to the 5 artists auto-promoted today (hilary-duff, josiah-queen, ha-ash, lukas-graham, passenger). The rest are spread over 50 artists and skew international: Belgium 12/12, Italy 8/8, Ireland 16/20, Australia 17/31 unmapped. | (a) Today's auto-promoted artists have not had a nightly link sync yet, so this part should clear itself tonight. (b) The matchers record a match but never record a miss: 463 TicketNetwork and 842 StubHub International upcoming rows have **no provider record at all**, so `report:link-coverage` files 270 as "unprocessed or API cap" and cannot tell "checked, not listed" from "never checked". (c) 37 are ambiguous matches, which are never guessed by design. | Persist the last attempt and its outcome per event and lane, so the gap is diagnosable. Tonight's run should clear (a). International coverage depends on the catalogs themselves. |
| 3 | **Verified mapping, no fresh row** | **86 dates**: hans-zimmer 24, kenny-chesney 19, death-cab-for-cutie 16, metallica 10, atmosphere 9 and others. **81 of the 86 are `announced` with a future Ticketmaster public on-sale.** | The resale listing exists but has no numeric price before general sale, so the writer has nothing usable. This is expected and clears itself at on-sale. | Honest state only. The card should say "on sale <time>" rather than the generic no-snapshot note. Only 5 on-sale rows here need a look. |
| 4 | **SeatGeek is the only resale lane** | **21 dates** (18 are `needs_recheck`) | SeatGeek never prices, and no Vivid, TN or SHI mapping exists for these dates. | Honest state. Improves only as other lanes map these dates. |
| 5 | **Degradation claims "no snapshot" when D1 failed** | Potentially every card on a render where the D1 read throws | `attachApprovedMarketplacePrices` catches a D1 error and treats it as "no rows". Every lane then reads `unavailable`, `pricesWereChecked()` returns true, and each card prints "No listed-price snapshot is available for this date". That states something the server did not establish, and it lines up with the open Pages CPU-limit incident. | Carry a `pricesQueryFailed` flag and render the unchecked (silent) state instead. Small change in `shows.js` and `[[path]].js`. |
| 6 | **"Hourly" writers deliver every 3–5.5h** | Price age, not coverage | Vivid runs over 2026-09-23/24 landed at 06:46, 01:40, 23:12, 20:41, 17:29, 12:17 and 06:44 (gaps of 2.5–5.5h). The marketplace lane shows a similar pattern. The 24h expiry absorbs this today. One missed day blanks every price, and only the freshness probe (itself on GitHub cron) would notice. | Already recorded in `OPERATIONS.md`: move the writers to a Cloudflare Cron Trigger if ticks keep dropping. Recommend doing it before launch. |

Causes checked and ruled out:

- **Pages expecting SeatGeek pricing.** No public copy claims a SeatGeek price.
  SeatGeek is inert in the lane list. Hygiene item:
  `SEATGEEK_PRICE_DISPLAY_ENABLED = "true"` in `wrangler.toml` (shown live in
  `/api/health`) contradicts the "permanently disabled" policy. It is harmless
  because no rows ever exist, but it should read `"false"`.
- **Caching serving old data.** Event-derived HTML is `no-cache` and D1 is read
  per request, so cached HTML does not serve stale prices. See §6 for the
  unrelated static-asset caching risk.
- **Stale or failing snapshot runs.** Every recent scheduled run is green,
  apart from two isolated failures on 2026-09-20 and 2026-09-21 that recovered
  on the next tick.

### No honest "last checked" time exists yet for a missing price

An unavailable lane's `fetchedAt` in `/api/shows` is the **request time**, not
a check time, and the link syncs write nothing when they find no match. So the
"Check live prices + last checked <time>" state Phase 1 asks for needs a new,
recorded timestamp: the last writer attempt per event and lane, with its
outcome. Until then, the only honest time to show is the event record's own
verification date. That is a Phase 1 design item, not a copy change.

---

## 2. Indexability

There are **no event-level pages**. Tour and individual-event landing pages
are explicitly parked in `BACKLOG.md`. The "event" template in the brief
therefore has nothing to classify. Past dates leave the site through the
aggregation gates described below.

### Sitemap classification (493 URLs, live = repo)

Definitions used, all proposed for Phase 2 and none of them current policy:
**empty** means 0 upcoming dates. **Thin** means indexable but at the gate
floor, or on a price-rendering template with zero priced dates. **Rich** means
it clears the floor with margin and, where the template renders prices, has at
least one priced date. **Expired** means in the sitemap with no future event.

| Template | In sitemap | Rich | Thin | Empty | Expired | Notes |
|---|---|---|---|---|---|---|
| Artist | 73 | 48 | 15 | 10 | 0 | Empty: ariana-grande, bad-bunny, morgan-wallen, raye, tate-mcrae, rosalia, post-malone, the-weeknd, jelly-roll, beyonce. They stay `index,follow` by policy (durable URL). Thin, 1–2 dates: jay-z, summer-walker, latto, foo-fighters, in-flames, eros-ramazzotti. Thin, no priced date: oasis, hans-zimmer, kenny-chesney, atmosphere, and the 5 auto-promoted. |
| Artist-city | 151 | 40 | 111 | 0 | 0 | 110 sit exactly at the 2-date floor (98 priced, 12 not). A 2-date page is the artist page filtered to two cards. |
| City | 85 | 0* | 85* | 0 | 0 | *Every city page is "thin" on the price test because of cluster 1. On breadth alone, 66 clear the floor with margin and 19 sit at it. |
| Venue | 143 | 96 | 47 | 0 | 0 | 42 at the floor (3 shows or 2 artists). 5 have no priced date. |
| Blog post | 4 | 4 | 0 | 0 | 0 | All 668–804 words. All four explain how the site works, so search intent is low. |
| Blog tag | 3 | 3 | 0 | 0 | 0 | |
| Guide | 18 | 18 | 0 | 0 | 0 | 623–1,882 words, sourced, with FAQ or HowTo schema. |
| Home and hubs | 16 | 16 | 0 | 0 | 0 | Home, `/artists`, `/cities`, `/venues`, `/guides`, the comparison hub and 10 trust/static pages. |

**Non-indexable but rendered:** 1,437 routes (851 artist-city, 406 venue, 173
city, 7 artist shells). All are `noindex,follow`, excluded from the sitemap,
and still linked. That is correct and already enforced in code.

### What already exists (the brief assumes some of this is missing)

- Per-template thresholds live in code (`functions/_route-indexability.js`,
  `_artist-indexability.js`, `_blog.js`). They are shared by the router,
  sitemap, `llms.txt` and both audits, so indexability can't drift.
- Expired handling is consistent and derived:
  - artist-city → **301 to the artist hub**;
  - city/venue with nothing upcoming → **404** (real, not soft);
  - `/artists/<a>` → stays 200 with an empty board.
- Duplicate **titles and meta descriptions** fail CI (`audit-internal-links.mjs`).
  Exact duplicates today: none. **H1 duplicates are not checked.**
- Orphan indexable routes fail CI. Today: none.
- **IndexNow is already live** (`indexnow-ping.yml`, delta-only submission).
- Structured data passes `validate-route-schema.mjs`: 302 artist `MusicEvent`
  nodes plus city, venue and artist-city parity.

### Indexability risks found

1. **Soft-404 risk on the 10 empty artist pages.** Beyoncé renders 13 KB
   saying three times that there are no dates, and it is `index,follow` and in
   the sitemap. The policy keeps them indexed deliberately, for URL authority
   between tours. Search engines may classify them as soft 404s anyway. This is
   an owner decision (§8).
2. **A city or venue page that loses all dates goes 404, not 301.** That is
   correct HTTP, but it discards any accumulated links. A 301 to `/cities` or
   `/venues` (or the most relevant artist) keeps them. Also an owner decision.
3. **Two-date artist-city pages are 22% of the sitemap** (110 of 493) and are
   near-duplicates of their artist page. Raising the floor to 3 would drop about 110
   URLs. It is a policy change with a measurable surface cost.
4. **A single, un-segmented sitemap.** Search Console can't report coverage by
   type. Separately, `sitemap.xml.js` re-parses the 4.3 MB `events.json` once
   per derivation on every request, a CPU cost that fits the open CPU-limit
   incident.
5. **Template-level near-duplication.** 150 artist-city titles share one
   pattern, as do 134 venue titles and 83 city titles. None are exact
   duplicates, and the content differs by data, so this is informational only.

---

## 3. Content — which longform pages most need editing

There is no traffic data (Search Console exports are still owner-owed per
`BACKLOG.md` item 1.5), so the ranking uses:

- **importance** — position in `data/guide-order.json`, which drives the
  homepage cards, sitemap and `/guides`, plus commercial intent;
- **edit need** — measured tells: em-dash density, stacked triplets,
  paragraph-length uniformity (coefficient of variation; below 0.4 reads
  machine-uniform), and phrase tells.

The copy is already fairly clean. Phrase tells ("delve", "navigate",
"landscape", "whether you're", "in today's") appear **zero times** across all
25 files; there is one "ultimately" and one "a few things". The work is rhythm,
not vocabulary.

| Rank | Page | Why |
|---|---|---|
| 1 | `guides/how-to-compare-concert-ticket-prices` | #1 in guide order, linked from the homepage, carries the HowTo schema. 8.1 em-dashes per 1k words, 6 triplets. The site's core promise, so its rhythm matters most. |
| 2 | `guides/how-resale-ticket-pricing-works` | Highest em-dash density on the site (16.9/1k), 8 triplets, "a few things". Lists open with bolded fragments in the same shape throughout. |
| 3 | `guides/how-to-avoid-overpaying-for-concert-tickets` | Commercial intent, 1,670 words, 8 triplets, 6.6 em-dashes/1k. Long enough that padding costs readers. |
| 4 | `guides/vivid-seats-vs-ticketmaster` | #2 in guide order and the longest page (1,882 words). 11 triplets, one "ultimately". |
| 5 | `guides/primary-vs-resale-concert-tickets` | 14 triplets (highest), 7.9 em/1k, one question heading. |
| 6 | `guides/ticketmaster-vs-stubhub` | 13 triplets. |
| 7 | `guides/ticket-delivery-and-transfer-timing` | 10.5 em/1k. |
| 8 | `blog/what-a-price-snapshot-actually-is` | Paragraph CV 0.35 (uniform), 8.7 em/1k, "It is not X, not Y, not Z" negation stacks. |
| 9 | `blog/how-a-ticket-link-gets-published` | CV 0.27, the most uniform page on the site. |
| 10 | `blog/why-a-price-here-disappears` | CV 0.33, 7.7 em/1k. |

**Proposed Phase 5 sample:** ranks 1–3.

**Spelling convention.** British throughout the longform: organiser,
programme, cancelled, travelling, colour, licence, behaviour, recognise. **No
American spellings were found in any Markdown file.** The only friction is that
prices and coverage are US-first (USD, "Coverage is strongest in the United
States"). Flag rather than change. UI strings in the router have not yet been
checked for convention; that is a Phase 4 item.

---

## 4. UX — the 10 most important usability and trust issues

Measured on live HTML at 390×844 (mobile) and 1366×900 (desktop).

| # | Issue | Where | Evidence |
|---|---|---|---|
| 1 | **City pages look broken next to venue and artist pages**: every button reads "Check prices", and nothing explains why. | 85 indexable city pages | Cluster 1. The same show is priced on its venue page. |
| 2 | **The first ticket button is about 2.3 screens down on mobile.** A stats deck that repeats the lead sentence, then month chips, a search box, 3 selects and 2 buttons, all sit above the first card. | Artist pages | First CTA at y≈1,920 px on mobile and y≈1,410 px on desktop (Olivia Rodrigo). Hilary Duff is similar. |
| 3 | **Artist pages are very heavy.** | Large boards | Olivia Rodrigo: 507 KB HTML (25 KB gzipped), about 3,850 elements, 418 buttons, 67,000 px of mobile scroll. INP and LCP risk on mid-range phones. |
| 4 | **The homepage has two primary buttons of equal weight** ("Search" and "Find a show"), and says "see **current** listed prices" for snapshots that can be up to 24h old. The mobile search placeholder truncates mid-word ("…venue, o"). | Home | Screenshot |
| 5 | **The affiliate disclosure changes wording by template and makes an absolute claim.** Artist pages say "Some links earn us a commission — this never affects your price". City, venue and home say "we may earn a commission at no extra cost to you". The hub says "Some outbound links are affiliate links". On city pages it appears only in the footer. "Never affects your price" is not something the site can verify. | All CTA templates | HTML text extraction |
| 6 | **"Last checked event record: Jul 7, 2026" shows prominently on the London city page.** A date 2.5 months old reads as neglect, even though prices were captured today. | City pages | The record's `last_verified_at` is stale while the provider syncs are current. |
| 7 | **The empty artist board says the same thing three times** (lead, board intro, empty box) and offers little else. | 10 empty artist pages | Beyoncé screenshot |
| 8 | **The no-price note is identical on all 377 unpriced cards.** It gives no reason (for example, not on sale until a date) and no check time. On a Ticketmaster-only card it says "use the provider buttons above" when there is one button. | Artist, artist-city, venue | Clusters 2–4 |
| 9 | **The Ticketmaster button reads "Check prices",** implying a comparable price lane. Ticketmaster is a link and verification source only. | All boards | CTA markup |
| 10 | **Developer comments ship in the public `<head>`** ("same-origin: cross-origin requests still send no referrer …"). They are invisible to visitors, but the rules say "no internal or dev wording on public pages". | All routes | Page source |

No horizontal overflow was found at 390 px on any sampled route.

---

## 5. Scaling — what still needs a human to add an artist or tour

Much of the brief's Phase 3 already exists:

- auto-promote (path D) is live. Five artists were auto-promoted today, #1117.
- ingestion of new Ticketmaster shows is automatic, as are the SeatGeek, Vivid and marketplace link syncs.
- the sitemap, artist-city, city and venue pages and internal links are all
  derived from the data.
- a rollback sensor, a daily digest, `automation-health` and a work queue are running.

What remains manual:

| Step | Who | Why it doesn't scale |
|---|---|---|
| Browser-verify destinations and promote every non-auto artist | Owner | Required by `SAFE_PUBLISHING_RULES.md` outside path D |
| Brand-safety review of auto-promotes | Owner, daily digest | No approved source encodes it, by design |
| **OG cards for new routes** | Human merge of a work-queue PR | `og:coverage:check` **fails now**: 24 indexable routes have no card (#1121 open, `agent:ready`, awaiting merge). Every auto-promote adds more. |
| `tour_name` on 1,042 events | Human | Verification-gated. Ingestion leaves it blank by design. |
| 7 `review_required` shells; rush, muse and journey identity | Owner | Identity resolution |
| Country storefront allowlist (for example `ticketmaster.com.mx`) | Owner | An `out.js` decision per market |
| `needs_recheck` (317) and 37 ambiguous matches | Human | Never auto-resolved, correctly |
| `PROJECT_STATUS.md` per-artist notes and rows for new slugs | Agent or human | The writers don't add rows. Several notes are now wrong (see §6). |
| `?v=` asset versions on every static-file edit | Whoever edits | Hand-bumped, with no check that a changed file got a new version (§6) |
| Guide source re-verification, `data/guide-order.json` | Owner | Human-only by rule |
| Search Console and Bing submission, GA internal-traffic exclusion | Owner | Outside the repo |

---

## 6. Existing CI, schema and link status

All run locally on `73bce8e`:

| Check | Result |
|---|---|
| `npm run test:mvp` | **PASS, 82/82 steps** (169s). Includes `validate:internal-links` (1,930 routes, 0 problems), `audit:indexable-surface:check`, smoke and partitions. |
| `npm run schema:validate` (`validate-route-schema.mjs`) | **PASS** |
| `npm run test:providers` | **PASS**. 7 warnings: shells without registry entries (expected). |
| `npm run status:validate:strict` | **PASS** |
| `npm run docs:check` | **PASS** |
| `npm run guides:sources:check:dry-run` | 18 OK, **10 blocked (403, SeatGeek support and Ticketmaster)**, 0 failed |
| `npm run og:coverage:check` | **FAIL: 24 indexable routes with no card.** Not in `test:mvp`; tracked by #1121. |
| `report:link-coverage` | 270 upcoming dates lead to a single provider (see cluster 2) |
| Surface audit warnings | Growth beyond baseline for artist, city and venue (explained by the batches; baseline re-anchor due) |

Other findings:

- **Stale facts in `PROJECT_STATUS.md`**, which passes validation because
  these are unpinned prose:
  - "4 of the **68** indexable" should say 73;
  - "146 artist-level entries … (**58** artists)" should say 73;
  - "Of those **48**" follows a bullet that says 58;
  - many per-artist notes still say "No event records yet" for artists that now have 13–66 dates;
  - hans-zimmer, kenny-chesney and atmosphere are described as eventless but now carry 25, 20 and 11 dates.
- **Static-asset caching:** `public/_headers` already serves `app.js`,
  `styles.css`, `shell.js`, `artist-board.js` and others as
  `max-age=31536000, immutable`. It relies on hand-bumped `?v=` query strings.
  Nothing checks that a file whose content changed got a new version, so one
  missed bump serves a stale script for up to a year. This contradicts the
  brief's "no long/immutable cache headers" constraint (§8). **Proposal:** a CI
  check that records a content hash per versioned asset and fails when content
  changes without a `?v=` change. No header changes are proposed.
- **CSP:** strict, with two inline-script hashes. Any change to inline scripts
  in Phases 1–4 must move to an external file or update the hash.

---

## 7. Ranked fix list

Impact is for 2027 launch readiness. Effort: S is under half a day, M is 1–2
days, L is more. Risk is the chance of breaking something public.

| Rank | Fix | Phase | Impact | Effort | Risk | Touches protected? |
|---|---|---|---|---|---|---|
| 1 | Query and render prices on **city pages** (add `city` to the price-query route set, plus a smoke test) | 1 | High: 85 indexable pages, about 1,000 buttons | S | Low | `[[path]].js` |
| 2 | **D1 failure must not claim "no snapshot"** (render the unchecked state) | 1 | High for trust | S | Low | `[[path]].js`, `shows.js` gate |
| 3 | **Record the last check attempt** per event and lane (writers and syncs), then show "Checked <time>, no listed price" or "On sale <time>" | 1 | High: the honest state for 377 cards | M | Medium (writer and schema change) | D1 migration; writers |
| 4 | Scheduled **price-coverage and staleness report** (zero-source events, pre-on-sale, stale rows, unmapped by country), opening or updating an issue | 1 | High: stops silent regression | S–M | Low | None |
| 5 | Merge #1121 and make **OG coverage self-sustaining** for auto-promoted routes | 3 | Medium | S | Low | Generated files |
| 6 | **Artist-page mobile layout:** first card above the fold, collapse filters, drop the stats deck that repeats the lead | 4 | High for conversion | M | Medium | `[[path]].js`, CSS `?v=` |
| 7 | **Paginate or collapse long boards** (for example the first 20 dates, then "show more") | 2/4 | Medium: CWV, 500 KB pages | M | Medium | `[[path]].js`, `artist-board.js` |
| 8 | One **disclosure component** with plain "how we make money" wording near CTAs, and no absolute claims | 4 | Medium for trust | S | Low | `[[path]].js` (copy as before/after first) |
| 9 | **Sitemap index** segmented by type, plus parse `events.json` once per request | 2 | Medium: Search Console diagnosis, CPU | S–M | Low | `sitemap.xml.js` |
| 10 | H1-duplicate check in `audit-internal-links.mjs` | 2 | Low | S | Low | None |
| 11 | `?v=` bump guard for immutable assets | 2 | Medium: prevents a year-long stale script | S | Low | None |
| 12 | Owner decisions (§8) on empty artist pages, the 2-date artist-city floor, and city/venue 404 vs 301 | 2 | Medium | S once decided | Medium | Policy and `[[path]].js` |
| 13 | Move price writers to a Cloudflare Cron Trigger | 1 (ops) | Medium: removes GitHub scheduler risk | M | Medium | New Worker or cron |
| 14 | Correct stale `PROJECT_STATUS.md` facts; set `SEATGEEK_PRICE_DISPLAY_ENABLED="false"` | any | Low | S | Low | `wrangler.toml` |
| 15 | Longform edit, ranks 1–3, as diffs with `TODO(Ollie)` notes | 5 | Medium | M | Low | `content/guides/*.md` |
| 16 | Remove dev comments from public `<head>` | 4 | Low | S | Low | `[[path]].js`, `index.html` |

Suggested Phase 1 scope: items 1–4 (and 13 only if the owner agrees). Every
change in `[[path]].js` needs explicit scope, which this milestone brief
provides for Phase 1.

---

## 8. Conflicts and items needing an owner decision or a `SAFE_PUBLISHING_RULES.md` change

1. **"MusicEvent schema never carries offers/prices" (brief) vs exception C (rules).**
   `SCHEMA_OFFERS_ENABLED=true` is live site-wide, and `SAFE_PUBLISHING_RULES.md`
   → Schema and SEO approves `offers` that mirror the visible badge for Vivid
   Seats, TicketNetwork and StubHub International (owner-approved 2026-07-22).
   If the brief's constraint is intended, it means **withdrawing exception C**:
   a rules change plus setting the flag to `false`. If not, the brief is out of
   date. Nothing will change until the owner says which.
2. **"Don't add long/immutable cache headers" (brief) vs the current `_headers`.**
   Immutable year-long headers already exist on 9 versioned assets. No change is
   proposed without a decision. The guard in fix 11 makes them safe as they are.
3. **Empty artist pages stay indexed** (`ROUTE_INDEXABILITY_POLICY.md`, the
   durable-URL rule). Noindexing them, as Phase 2 asks for thin pages, is a
   policy change. The rules themselves only require that noindex pages stay out
   of the sitemap, which the code already enforces.
4. **"Last checked" copy for a missing price.** "Checked <time>: no listed price
   on <provider>" must not read as an availability claim ("not available"),
   which `PROVIDER_DATA_POLICY.md` forbids. Confirm the wording before shipping.
   It is probably not a rules change, but it is a policy-adjacent claim.
5. **Expired city and venue pages: 301 vs 404.** A route-policy change; no
   rules change.
6. **"Adding an artist is a single validated data change" (Phase 3).** Outside
   path D, the rules require a human browser check of destinations, so the
   manual path cannot become fully single-step without a rules change. Path D
   already is single-step for artists that qualify.
7. **Artist-city floor from 2 to 3.** Policy constant; no rules change.

No proposal in this audit requires loosening data-integrity, scraping, `/api/out`,
or affiliate rules.
