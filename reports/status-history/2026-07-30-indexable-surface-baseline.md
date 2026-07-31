# Indexable-surface baseline — 2026-07-30

> **Correction (2026-07-31).** The provider-coverage figures in §2 and §3 below
> were computed with a destination test that looked only at each row's own
> `verification_status`. That was wrong: the renderer also publishes a CTA for a
> `needs_recheck` row carrying an independently verified marketplace destination
> (`providerEventPublishable` in `functions/[[path]].js`), which is most of
> Arlington, Houston and Sunrise. The claim that six indexable location pages
> "cannot lead anywhere" is therefore incorrect — on the corrected test it is
> **one venue page** (AFAS Dome Antwerp, which has no verified link from any
> provider) and **no city pages**. The route-count, traffic, internal-link and
> decay figures are unaffected. Corrected in the same PR that introduced the
> policy; see `docs/ROUTE_INDEXABILITY_POLICY.md` § City and § Publishable is
> not the same as schema-eligible. The rest of this file is left as measured so
> the original reasoning stays auditable.

Frozen pre-change measurement taken before the route-usefulness policy in
[docs/ROUTE_INDEXABILITY_POLICY.md](../../docs/ROUTE_INDEXABILITY_POLICY.md) was
implemented. Everything below is derived from the repository's own shared gate
modules (`functions/_artist-indexability.js`, `_cities.js`, `_venues.js`,
`_artist-cities.js`) re-run in process, from
`reports/internal-links/internal-links-audit.json`, and from the first-party
analytics figures recorded in `PROJECT_STATUS.md` on 2026-07-28. No live crawl,
no external requests, no invented data.

Reproduce the route figures with `npm run audit:indexable-surface` (which now
carries this measurement as its stored baseline) and the decay figures with
`npm run roster:forecast`.

## 1. Routes by type

| Route type | Reachable routes | Indexable | Non-indexable | Share of indexable surface |
|---|---|---|---|---|
| Artist (`/artists/<slug>`) | 30 | 19 | 11 | 6.1% |
| City (`/cities/<slug>`) | 81 | 37 | 44 | 11.9% |
| Venue (`/venues/<slug>`) | 111 | 45 | 66 | 14.5% |
| Artist-city (`/artists/<a>/tickets/<city>`) | 243 | 210 | 33 (301 to artist hub) | **67.5%** |
| **Dynamic total** | **465** | **311** | — | 100% |
| Static + guides + index pages | 29 | 29 | 0 | — |
| **Site total** | **494** | **340** | 121 | — |

The 33 non-indexable artist-city routes are not pages: they are combinations
with a real event footprint but no qualifying upcoming show, which the router
301s to the artist hub. Any other slug 404s.

## 2. Inventory quality by type

### Artist-city (the dominant block)

| Upcoming publishable shows in the city | Indexable pages |
|---|---|
| 1 | **128 (61%)** |
| 2 | 61 |
| 3 | 6 |
| 4+ | 15 |

- 82 pages carry 2 or more dates; 79 of those 82 are multi-night runs at a
  single venue (a genuine "three nights at the O2" case).
- A 1-date page renders exactly one show card. Its entire content is the artist
  page filtered to one event, wrapped in a templated intro, a templated
  five-step "how to buy" checklist, and a six-entry FAQ whose wording differs
  only by artist and city name.

### City

- 81 city routes have ≥1 upcoming tracked show; 37 pass the current
  ≥4 shows / ≥2 artists gate.
- 30 of the 81 have only one artist; 1 has ≥4 shows but a single artist.
- 9 of the 37 indexable pages sit exactly on the 4-show threshold.
- 17 of the 37 indexable pages cover a single venue, and in all 17 cases the
  matching venue page is also indexable with an identical show list.
- **2 of 37 indexable city pages (`houston-united-states`,
  `arlington-united-states`) have zero upcoming shows with a publishable ticket
  destination** — every event on them is `needs_recheck` and CTA-suppressed.
  They are indexed listings that cannot lead anywhere, and they are the only two
  indexable city pages that emit no `MusicEvent` structured data.

### Venue

- 111 venue routes have ≥1 upcoming tracked show; 45 pass the current
  ≥3 shows / ≥2 artists gate.
- 58 of the 111 have a single artist; 41 have a single show.
- 13 of the 45 indexable pages sit exactly on the 3-show threshold.
- **4 of 45 indexable venue pages have zero publishable upcoming shows**
  (`toyota-center-tx-houston`, `at-t-stadium-arlington`,
  `afas-dome-merksem-antwerpen`, `amerant-bank-arena-sunrise`).

### Artist

19 of 30 artist routes are indexable (editorially indexable + ≥1 upcoming
show). 11 render `noindex,follow`: 4 `review_required` shells and 7
empty boards.

## 3. Provider coverage

Measured as "the route has at least one upcoming show carrying a verified
provider destination":

| Route type | Indexable routes | With zero publishable destinations |
|---|---|---|
| City | 37 | 2 |
| Venue | 45 | 4 |
| Artist-city | 210 | 0 (the current gate already requires ≥1) |

## 4. Traffic (first-party analytics, `PROJECT_STATUS.md`, measured 2026-07-28)

Distinct `request_key`s per month on `page_view`, self-identifying crawlers
excluded. These are upper bounds: the UA classifier does not catch headless
automation presenting a stock browser UA.

| Surface | Views since 1 June | Visitors |
|---|---|---|
| Artist detail | — | 135 |
| Homepage | — | 100 |
| Venue detail | 17 | 9 |
| City detail | 8 | 4 |
| **Artist-city detail** | **0** | **0** |

Provider clicks by route type could not be measured in this session: the funnel
report (`npm run report:funnel`) needs remote D1 credentials that are not
available to CI or to an agent session, and it failed with an authentication
error rather than returning partial data. Given artist-city pages recorded zero
views, their provider-click count cannot be greater than zero. Whether Google
has indexed the site at all remains unverified (acquisition attribution only
began 2026-07-28), so no route type's traffic can currently be attributed to
search.

## 5. Internal links by type

From `reports/internal-links/internal-links-audit.json`. "Contextual" means a
link inside `<main id="mainContent">`, i.e. rendered page content rather than
the header/footer shell.

| Route type | Indexable pages | Total contextual inbound | Mean | Min | Mean visible words |
|---|---|---|---|---|---|
| Homepage | 1 | 460 | 460.0 | 460 | 883 |
| Static/trust | 9 | 1283 | 142.6 | 2 | 470 |
| `/venues` index | 1 | 115 | 115.0 | 115 | 865 |
| `/cities` index | 1 | 84 | 84.0 | 84 | 854 |
| Guide | 17 | 1035 | 60.9 | 2 | 1421 |
| Artist | 19 | 1076 | 56.6 | 22 | 1644 |
| **Artist-city** | **210** | **3864** | 18.4 | 1 | 845 |
| City | 37 | 458 | 12.4 | 5 | 771 |
| Venue | 45 | 415 | 9.2 | 4 | 757 |

Artist-city pages receive more contextual internal links than any other route
type — 3,864, more than artist pages, guides and city and venue pages combined
— while contributing zero measured traffic. 17 indexable pages (all artist-city)
have exactly one contextual inbound link.

## 6. Title patterns among indexable pages

| Count | Title tail |
|---|---|
| 210 | `… \| Compare Prices` (every artist-city page) |
| 45 | `… \| Tickets` (venue pages) |
| 44 | `… \| TourTicketCompare` (static + guides) |
| 37 | `… \| Upcoming Shows & Tickets` (city pages) |

No two indexable pages share a full title (the internal-link audit enforces
that), but 210 of 340 indexable titles follow one template that varies only by
artist and city name.

## 7. Expected decay with no new announcements

Shared gate modules re-run at future timestamps. A floor, not a prediction: the
nightly discovery lanes lift it whenever real new shows land.

| Horizon | Artists | Cities | Venues | Artist-cities | Total |
|---|---|---|---|---|---|
| +0d | 19 | 37 | 45 | 210 | **311** |
| +30d | 17 | 32 | 40 | 190 | **279** |
| +60d | 14 | 26 | 34 | 159 | **233** |
| +90d | 8 | 19 | 27 | 106 | **160** |

Decay over 90 days is −48.6% overall, and it is close to uniform across types
(artist-city −49.5%, city −48.6%, venue −40.0%). Routine inventory expiry
therefore moves every type together; a structural regression shows up as one
type moving on its own, which is the distinction
`scripts/audit-indexable-surface.mjs --check` is built to make.

## 8. Conclusions carried into the policy

1. Two thirds of the indexable surface is one route type that has never
   recorded a visit, and 61% of that type is single-date pages whose content is
   a strict subset of the artist page.
2. Multi-date city runs are the part of that route type with genuine standalone
   value: 82 pages, mostly multi-night runs at one venue, which is a real
   search and navigation target the artist page answers less directly.
3. Six indexable location pages cannot lead to any ticket destination. That is
   an "adequate provider information" failure, not a threshold-tuning question.
4. City and venue thresholds themselves are defensible; the templated buying
   guidance and repeated ticket-buying FAQs on top of them are not, because
   they repeat near-verbatim across hundreds of pages and are mirrored into
   `FAQPage` structured data.
5. Internal authority currently flows primarily to the weakest route type.
