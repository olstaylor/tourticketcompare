# TourTicketCompare Project Status

Last updated: 2026-10-06 (hand-written facts); the generated figures below are refreshed daily by `daily-audit.yml`. Prose condensed 2026-10-02.

Current-state snapshot: data counts, per-artist status and the generated route surface. Mostly machine-written (see "How to update this file"). If it disagrees with the repo, the repo wins.

## Current data

**Repository figures below regenerated 2026-08-26** by direct inspection of `public/data/`, `data/provider-identities.json`, and `functions/api/out.js` (`npm run status:validate`, which recounts them from source, clean).

**Production cross-check agrees (2026-09-02).** `/api/health` reports `artists: 50`, `events: 1022`, `needsRecheck: 151`, provider event-URL coverage `seatgeek 294 / vividseats 719 / ticketnetwork 670 / ticketliquidator 562 / stubhub_international 498` — matching the repository figures below exactly. The 2026-08-26 roster batch has deployed. The repo figures still win where the two disagree, and they have since moved: The Weeknd was promoted 2026-09-08 and the 2026-09-09 roster batch added 15 unpromoted shells, neither of which is in the production numbers above.

- `public/data/artists.json`: **197 records — 189 `indexable_with_substantial_content` + 8 `review_required` shells** — the 7 held from earlier batches (sabrina-carpenter, lady-gaga, coldplay, rush, muse, system-of-a-down, laura-pausini), with the 15 created by the 2026-09-09 roster batch and the 10 created by the 2026-09-22 batch (oasis, hans-zimmer, trans-siberian-orchestra, kenny-chesney, death-cab-for-cutie, alan-walker, the-psychedelic-furs, eros-ramazzotti, atmosphere, the-warning) all now promoted after owner confirmation of their API-captured destinations, plus the 5 auto-promoted on 2026-09-24 by the first `auto-promote.yml` run (#1117: hilary-duff, josiah-queen, ha-ash, lukas-graham, passenger — each ingested its dates in the same job). The 98 indexable artists carry `verified_providers: ["ticketmaster","seatgeek"]`; the 7 shells carry `verified_providers: []` and render no CTA. 11 of the 98 indexable carry 0 events — beyonce, raye, tate-mcrae, the-weeknd (fact corrected 2026-09-24 by agent: oasis, hans-zimmer, kenny-chesney and atmosphere, eventless after the 2026-09-22 promote because their Ticketmaster dates were withheld, landed dates through the automated Ticketmaster lane in #1110; event ingestion remains a separate phase after promotion is merged and deployed; the 2026-09-10 Ticketmaster run landed dates for 14 of the 15 artists promoted on 2026-09-09, and yuridia's 17 have since landed as well, so all fifteen now carry dates — fact corrected 2026-09-13). A promoted artist with 0 events renders the empty-state watchlist board with its artist-level ticket button (fact corrected 2026-09-23 by agent: since #1092 the empty board carries exactly one artist-level `/api/out` link; event buttons still appear only once dates land). Separately, indexable artists with 0 _upcoming_ events are listed in the generated empty-boards block below, which `daily-audit.yml` refreshes and is the only authority for that count, the list and each page's indexing state; that is the indexable-surface decay BACKLOG item 3 tracks. (The zero-event figure **is** machine-pinned — `SCALAR_ASSERTIONS` matches "N of the M indexable carry 0 events", so `status:validate` fails if N drifts (the denominator M is not pinned) — but the slug list beside it is not. The zero-_upcoming_ figure is pinned by nothing, so recount it from `public/data/` whenever the calendar or an ingestion run moves it; the generated empty-boards block below is its authority and is rewritten by `status:surface:write`.)
- `public/data/catalog.json`: 197 artist records; 0 tour records; **387 ticket_links rows** (197 ticketmaster + 190 seatgeek artist pages; 378 `verified` + `public_enabled`, plus 7 unverified/hidden shell ticketmaster rows for the 7 `review_required` artists); the `seatgeek` provider entry has `public_enabled: true`.
- `public/data/events.json`: **4099 events** — 285 `human_verified`, 2919 `machine_high_confidence`, 895 `needs_recheck`. Verified event-level provider provenance is pinned one provider per line below, each separated by a blank line. Keep both properties: git needs an unchanged line between two edits to merge them as separate hunks, so without the blank lines two lanes editing adjacent providers still conflict. This makes any two provider lanes merge cleanly, except on the shared no-resale figure at the end of the list.
  - SeatGeek 2129 (2254 rows carry a stored `seatgeek_url`); 511 `needs_recheck` rows retain a standalone SeatGeek CTA.

  - Vivid Seats 2538; 429 `needs_recheck` rows retain a standalone Vivid Seats CTA.

  - TicketNetwork 2545.

  - Ticket Liquidator 2396.

  - StubHub International 1265.

  - Across all lanes, 165 `needs_recheck` rows have no independently verified resale provider. Every lane recomputes this, so two lanes running the same night still conflict here and no layout can fix that — the two values genuinely disagree. It is now the only such line; regenerate it with `npm run status:validate:write` instead of hand-merging.

  Of those 89, 17 are past and **72 are upcoming** (recounted 2026-10-05 with the bullet's own `RESALE_KEYS` test and `datetime_iso`). Once past its public on-sale, each upcoming one is **not** CTA-less: it carries a Ticketmaster or `source_url` destination, so `eventLinkPublishable` passes and it renders its plain, unmonetized Ticketmaster button. Before its public on-sale a date shows no link (`publicOnsalePending`); `npm run report:link-coverage` lists those as awaiting the on-sale. What they lack is any verified resale lane — none of the 72 carries a stored `seatgeek_url` either — so the date offers one official link and no resale alternative, and no affiliate lane. Outside those on-sale holds, only **4** recheck rows publish no lane at all, and all four are past: ed-sheeran Nashville 6/20, bts Madrid 6/26 and 6/27, bad-bunny Marseille 7/1 (re-verified 2026-10-05 against `eventLinkPublishable`/`providerEventPublishable`). A failing `eventLinkPublishable` is not that test on its own — 10 recheck rows fail it while still publishing verified SeatGeek, Vivid Seats or marketplace lanes. The step change came with the 2026-09-10 ingestion runs — 251 Ticketmaster dates across 16 artists, then 21 more for Harry Styles: ingestion lands dates far faster than resale provenance is verified for them, so this figure tracks ingestion volume rather than the calendar and keeps climbing after each large run until the CTA syncs catch up. Only the counts in the bullets above are machine-pinned; the past/upcoming split is not, and a "no CTA" claim must be computed with the runtime predicates in `functions/[[path]].js` (`eventLinkPublishable`, `providerEventPublishable`) across **all** providers including Ticketmaster, never from the validator's resale-only test. See BACKLOG item 4.
- `public/data/events/<artist>.json`: per-artist partitions used at runtime.
- `public/data/guides-content.json`: **28 guide content entries** (topic guides; not per-artist). `stubhub-international-explained` (added 2026-09-25 by agent, published the same day at the owner's request) explains why every StubHub International link opens stubhub.ie; its StubHub source is the one #1165 recorded as checked 2026-09-25. Generated from `content/guides/*.md` — do not hand-edit. As of the 2026-09-09/10 editorial pass, every guide's claims about what this site does match the provider lanes under "What's true right now" below; `ticketmaster-vs-seatgeek-vs-vivid-seats` and `how-to-avoid-overpaying` had contradicted them in opposite directions and were corrected. Guide `sources[].last_checked` dates are older than that pass and were deliberately not advanced — see `BACKLOG.md` → Routine data hygiene.
- `content/blog/*.md`: **13 published blog posts, 0 drafts, 4 tags**. **2026-09-25 (owner request, recorded by agent):** `oasis-live-27-ticket-prices` added and published — what a resale price shown for an Oasis Live '27 date means, per-night markets, and the UK section 90 / Irish Sale of Tickets Act face-value rules; it deliberately states no face-value figures. **2026-09-25 (owner request, recorded by agent):** every remaining draft was published — the three 2026-09-07 pilot posts (Harry Styles, Bruno Mars, Olivia Rodrigo, their `date` moved to first publication), `buying-tickets-for-a-concert-in-another-country`, `floor-or-seats-at-a-stadium-concert`, and the two on-sale posts `hilary-duff-lucky-me-tour-2027-on-sale` and `metallica-m72-2027-stadium-dates-on-sale`; `tour-buying` now carries enough indexable posts for its tag page to be indexed. Earlier history follows. The three posts withdrawn on 2026-09-01 were rewritten against current code and policy and republished 2026-09-03, alongside the fourth (`why-a-price-here-disappears`), which had never been published. The three drafts added 2026-09-07 are the artist SEO content pilot's supporting articles (Harry Styles, Bruno Mars, Olivia Rodrigo); they carry no route, sitemap entry or tag count until an editor publishes them, and they share the unpublished `tour-buying` tag. **Draft review 2026-09-09:** corrected the Olivia Rodrigo transfer-opening deadline and expired Silver Star request window, the Harry Styles general-sale timing, and Falcon Stadium guidance that over-applied general visitor rules to a concert. All three remain drafts. **2026-09-25:** three more `tour-buying` drafts added for tour-level search demand — `oasis-live-27-code-only-ticket-sale`, `floor-or-seats-at-a-stadium-concert` and `buying-tickets-for-a-concert-in-another-country` — likewise unpublished until an editor reviews them. The owner then asked for the Oasis post to go live the same day, so `oasis-live-27-code-only-ticket-sale` is published (693 words, indexable); `tour-buying` now has one published post, so its tag page renders `noindex,follow` until a second one is published. Authenticated Search Console and D1 reviewed on 2026-09-09: the latest search data ends 2026-09-06, before the pilot began, and the supporting articles remain unpublished. Server outbound requests substantially exceed recorded page views, so raw clicks are not a valid visitor conversion rate. Establish a post-publication observation window before attributing an uplift or expanding the pilot. Source of truth for the blog; `public/data/blog-content.json` is generated from it and must never be hand-edited. Recount with `npm run blog:build`.
- `functions/_guide-routes.generated.js`: **28 guide routes** (published guides only), re-exported by `functions/_route-metadata.js`, which still owns the trust/static route metadata and `OLD_GUIDE_REDIRECTS`.
- Route surface — **generated, do not hand-edit.** `npm run status:surface:write` refreshes this line from the audit's own render of every route (robots meta as served, not as inferred), and `npm run audit:indexable-surface:check` — which runs in `test:mvp` — warns when it goes stale. Exclusion reasons, expiry horizon and the stored baseline live in `reports/indexable-surface/`.
  <!-- generated:route-surface -->
  Generated 2026-10-25: **4622 rendered / 895 indexable**. By type (rendered/indexable): home 1/1 · index 6/6 · static 12/12 · guide 28/28 · blog-post 27/27 · blog-tag 5/5 · artist 191/162 · city 395/83 · venue 1003/164 · artist-city 2705/244 · price-guide 132/129 · presale 117/34.
  <!-- /generated:route-surface -->
- `functions/api/out.js` `VERIFIED_TICKET_LINKS`: **380 artist-level entries** — one plain `<slug>:ticketmaster` and one Impact-wrapped `<slug>:seatgeek` per indexable artist (103 artists). There are no artist-level Vivid Seats entries; live event-level Vivid redirects resolve from verified event data.
- `data/provider-identities.json`: all **190 entries** verified with `ticketmaster_attraction_id`, `ticketmaster_artist_url`, `seatgeek_performer_id`, and `seatgeek_artist_url` (the 7 remaining `review_required` shells have no registry entry yet — added at Promote). The onboarding manifest lives in gitignored `artifacts/` and does not survive environment recycling; regenerate it with `npm run artists:onboard:propose -- --names <names> --allow-existing-shells`.

## Per-artist status

103 of the 110 artists are `indexable_with_substantial_content` with `verified_providers: ["ticketmaster","seatgeek"]` and both `<slug>:ticketmaster` and `<slug>:seatgeek` entries in `VERIFIED_TICKET_LINKS`; the remaining 7 are `review_required` shells with no CTA. "SG verified" = events carrying `provider_links.seatgeek.verified === true`.

| Slug | `last_verified_at` | Events | With `seatgeek_url` | SG verified | `needs_recheck` | Tour name | Notes |
|---|---|---|---|---|---|---|---|
| beyonce | 2026-10-26 | 0 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| harry-styles | 2026-04-30 | 76 | 39 | 39 | **10** | Together, Together | 21 dates added 2026-09-10 from the newly announced run (6 on-sale Australian, 15 pre-on-sale `announced`). All 21 now carry the verified `tour_name` (backfilled 2026-10-06). The 2 recheck rows are the Madrid short-form `ticketmaster.es` URLs. |
| bts | 2026-09-09 | 30 | 15 | 8 | **4** | BTS WORLD TOUR 'ARIRANG' | Recheck rows: Madrid 6/26 & 6/27 (no-link), Arlington 8/16 & 8/17 (standalone SeatGeek CTA). |
| ariana-grande | 2026-10-26 | 41 | 17 | 5 | 0 | The Eternal Sunshine Tour | 3 Sunrise rows are owner-verified "page loads, not on sale via TM" and render plain "Check Ticketmaster" links. |
| bad-bunny | 2026-10-26 | 28 | 0 | 0 | **4** | DeBÍ TiRAR MáS FOToS World Tour | No SeatGeek URLs (EU legs not listed on SeatGeek). Recheck rows: Marseille 7/1 and the re-added Brussels `.com` row — both CTA-suppressed. |
| morgan-wallen | 2026-10-26 | 18 | 14 | 4 | 0 | Still the Problem Tour | — |
| jay-z | 2026-10-26 | 7 | 3 | 3 | 0 | JAY-Z Yankee Stadium 2026 | Inglewood/London rows have blank `tour_name`, owner-accepted. |
| olivia-rodrigo | 2026-05-27 | 80 | 54 | 54 | **6** | The Unraveled Tour | All 6 recheck rows retain a standalone SeatGeek CTA via verified provenance. |
| bruno-mars | 2026-05-28 | 76 | 19 | 19 | 0 | The Romantic Tour | Four Mexico City events intentionally excluded (`ticketmaster.com.mx` not in the allowlist). |
| ed-sheeran | 2026-06-12 | 27 | 23 | 18 | **2** | The Loop Tour | Recheck rows: Nashville (no-link), Arlington (standalone SeatGeek CTA). |
| shakira | 2026-10-26 | 31 | 16 | 5 | **1** | Las Mujeres Ya No Lloran | No recheck rows: the re-added "Shakira Stadium" Madrid duplicate of 2026-10-03 was removed and tombstoned on 2026-09-27 (pre-pilot event integrity cleanup). |
| raye | 2026-10-26 | 1 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| charli-xcx | 2026-06-18 | 18 | 6 | 6 | **2** | Music, Fashion, Film Tour | — |
| tate-mcrae | 2026-10-26 | 0 | 0 | 0 | 0 | — | No event records; artist-level CTA only. |
| summer-walker | 2026-10-26 | 13 | 7 | 1 | 0 | Still Finally Over It | Houston 6/21 renders a plain "Check Ticketmaster" link (owner-verified). |
| rosalia | 2026-10-26 | 6 | 1 | 0 | 0 | LUX TOUR 2026 | Houston 6/23 renders a plain "Check Ticketmaster" link (owner-verified). |
| post-malone | 2026-10-26 | 5 | 0 | 0 | 0 | — | `tour_name` blank pending human verification. Vivid Seats covers 3 events. |
| zach-bryan | 2026-10-13 | 35 | 16 | 16 | **9** | With Heaven On Tour | Arlington, Glendale and Dover ×2 remain recheck rows with standalone verified resale CTAs. Vivid Seats covers 10 events. |
| jelly-roll | 2026-10-26 | 1 | 0 | 0 | **1** | — | `tour_name` blank pending human verification. |
| tame-impala | 2026-07-22 | 28 | 0 | 0 | **6** | The Deadbeat Tour | 3 recheck rows each publish a standalone verified SeatGeek CTA. |
| sabrina-carpenter | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry. Held pending live dates. |
| lady-gaga | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry. Held pending live dates. |
| the-weeknd | 2026-10-26 | 0 | 0 | 0 | 0 | — | Promoted 2026-09-08 after verified provider checks. No event records yet: the empty board carries its artist-level ticket button, and the page is `noindex,follow` until a first date lands. |
| coldplay | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry. |
| karol-g | 2026-08-22 | 31 | 1 | 1 | **11** | Viajando Por El Mundo Tropitour | Promoted 2026-08-21. |
| foo-fighters | 2026-10-26 | 6 | 0 | 0 | 0 | — | Promoted 2026-08-21. |
| metallica | 2026-08-22 | 38 | 32 | 32 | **2** | Life Burns Faster | Promoted 2026-08-21. |
| rush | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry; owner browser-checked the TM identity. |
| muse | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry; owner browser-checked the TM identity. |
| my-chemical-romance | 2026-08-22 | 11 | 0 | 0 | **1** | The Black Parade 2026 | Promoted 2026-08-21. |
| teddy-swims | 2026-08-22 | 53 | 9 | 9 | **18** | The Ugly Tour | Promoted 2026-08-21. |
| five-finger-death-punch | 2026-08-22 | 35 | 0 | 0 | **6** | 20th Anniversary World Tour | Promoted 2026-08-21. |
| system-of-a-down | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry; owner browser-checked the TM identity. |
| laura-pausini | null | 0 | 0 | 0 | 0 | — | `review_required` shell: noindex, no CTA, no registry entry; owner browser-checked the TM identity. |
| gracie-abrams | 2026-07-30 | 57 | 11 | 11 | **7** | The Look at My Life Tour | Both Antwerp dates restored on official TM links. |
| niall-horan | 2026-07-30 | 50 | 23 | 23 | **9** | Dinner Party Live On Tour | Kraków and Antwerp restored on official TM links. |
| doja-cat | 2026-07-30 | 31 | 9 | 9 | **2** | Tour Ma Vie World Tour | Recheck row retains independent verified SeatGeek coverage. |
| sombr | 2026-07-30 | 59 | 16 | 16 | **17** | You Are The Reason Tour | All 6 recheck rows retain independent verified SeatGeek coverage. |
| latto | 2026-08-07 | 3 | 1 | 1 | **1** | — | Promoted 2026-07-29. |
| john-summit | 2026-07-30 | 31 | 7 | 7 | **8** | CTRL ESCAPE ARENA TOUR | Separate Lollapalooza aftershow stays blank and fully CTA-suppressed. |
| don-omar | 2026-08-28 | 38 | 14 | 13 | **5** | The Last King World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| luke-combs | 2026-08-28 | 12 | 10 | 10 | **2** | My Kinda Saturday Night Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| blue-october | 2026-08-28 | 70 | 54 | 50 | **28** | The Foiled 20th Anniversary World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| pentatonix | 2026-08-28 | 28 | 15 | 15 | **3** | Christmas in the City Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| tyla | 2026-08-28 | 30 | 6 | 6 | **6** | The A*POP World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| nothing-but-thieves | 2026-08-28 | 29 | 13 | 13 | **7** | The Stray Dogs World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| trivium | 2026-08-28 | 37 | 28 | 28 | **13** | Crown In The Grave World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| sabaton | 2026-08-28 | 35 | 19 | 19 | **7** | Legends On Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| in-flames | 2026-09-02 | 1 | 0 | 0 | 0 | — | Promoted 2026-08-26; owner browser-checked both destinations. |
| beartooth | 2026-08-28 | 33 | 18 | 18 | **12** | Pure Ecstasy World Tour | Promoted 2026-08-26; owner browser-checked both destinations. |
| polyphia | 2026-09-09 | 40 | 25 | 20 | **8** | BE NOT AFRAID World Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| stella-lefty | 2026-09-09 | 39 | 29 | 27 | **11** | Long Way Home Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| tobymac | 2026-09-09 | 36 | 31 | 27 | **6** | Hits Deep Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| saint-levant | 2026-09-09 | 43 | 26 | 26 | **7** | AFANDI World Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| the-airborne-toxic-event | 2026-09-09 | 22 | 15 | 9 | **9** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| andrea-bocelli | 2026-09-09 | 31 | 3 | 3 | **5** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| morat | 2026-09-09 | 29 | 11 | 11 | **9** | YEM: Ya Es Mañana World Tour 2027 | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| missio | 2026-09-09 | 28 | 9 | 8 | **20** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| vnv-nation | 2026-09-09 | 24 | 12 | 12 | **10** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| michelle-branch | 2026-09-09 | 37 | 25 | 25 | **16** | Everywhere and Back Again Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| yuridia | 2026-09-09 | 22 | 15 | 15 | **4** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| fkj | 2026-09-09 | 24 | 18 | 17 | **8** | Tyber Tour | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| sylvan-esso | 2026-09-09 | 35 | 20 | 19 | **14** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| blondshell | 2026-09-09 | 23 | 16 | 16 | **6** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| pink-martini | 2026-09-09 | 28 | 18 | 16 | **14** | — | Promoted 2026-09-09 after owner confirmation of both API-captured provider destinations (workflow run 34371114685). Verified registry and artist links; dates landed through the Ticketmaster discovery lane. |
| oasis | 2026-09-24 | 37 | 1 | 1 | **7** | Oasis Live '27 | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. **Ticketmaster showed 0 upcoming events at capture** (SeatGeek 6); owner confirmed the TM artist page resolves and chose to publish both lanes. The TM link is plain and unmonetized. Ticketmaster dates have since landed through the automated lane (#1110). |
| hans-zimmer | 2026-09-24 | 31 | 25 | 25 | **6** | Hans Zimmer Live – The Next Level | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Dates withheld as `status_not_onsale` at promotion have since landed through the automated Ticketmaster lane (#1110). |
| trans-siberian-orchestra | 2026-09-23 | 56 | 55 | 55 | **8** | The Ghosts of Christmas Eve – 30th Anniversary Winter Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 50 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| kenny-chesney | 2026-09-24 | 20 | 16 | 16 | **3** | The Original Vibe Room Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Dates withheld as `status_not_onsale` at promotion have since landed through the automated Ticketmaster lane (#1110). |
| death-cab-for-cutie | 2026-09-23 | 30 | 23 | 23 | **8** | I Built You A Tower World Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 5 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| alan-walker | 2026-09-23 | 24 | 17 | 15 | **8** | Legend of Atlantis Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 23 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| the-psychedelic-furs | 2026-09-23 | 34 | 28 | 28 | **13** | — | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 14 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| eros-ramazzotti | 2026-09-23 | 8 | 6 | 6 | **1** | Una Storia Importante World Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 1 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| atmosphere | 2026-09-24 | 18 | 16 | 16 | **7** | The Winter Carnival Tour 2027 | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Dates withheld as `status_not_onsale` at promotion have since landed through the automated Ticketmaster lane (#1110). |
| the-warning | 2026-09-23 | 25 | 16 | 16 | **9** | Everything's Falling World Tour | Promoted 2026-09-22 after owner confirmation of both API-captured provider destinations. Verified registry entry and both artist-level links. Ticketmaster 22 dates ingested the same day via the sanctioned discovery lane; provider links land `verified:false` until a human checks them. |
| hilary-duff | 2026-09-24 | 38 | 26 | 25 | **6** | the lucky me tour | Auto-promoted 2026-09-24 (#1117); dates ingested in the same job. |
| josiah-queen | 2026-09-24 | 18 | 13 | 13 | **2** | — | Auto-promoted 2026-09-24 (#1117); dates ingested in the same job. |
| ha-ash | 2026-09-24 | 17 | 14 | 14 | **2** | No Me Hablen de Amor Tour | Auto-promoted 2026-09-24 (#1117); dates ingested in the same job. |
| lukas-graham | 2026-09-24 | 13 | 12 | 12 | 0 | — | Auto-promoted 2026-09-24 (#1117); dates ingested in the same job. |
| passenger | 2026-09-24 | 17 | 0 | 0 | **3** | Wild Love Tour | Auto-promoted 2026-09-24 (#1117); dates ingested in the same job. |
| sienna-spiro | 2026-09-25 | 47 | 28 | 28 | **13** | My House Tour |  |
| malcolm-todd | 2026-09-25 | 37 | 8 | 8 | **6** | Do That Again Tour |  |
| lizzy-mcalpine | 2026-09-25 | 40 | 26 | 26 | **9** | The Over Country Tour |  |
| the-interrupters | 2026-09-25 | 23 | 20 | 20 | 0 | — |  |
| dinosaur-jr | 2026-09-25 | 31 | 16 | 15 | **14** | — |  |
| needtobreathe | 2026-09-26 | 22 | 20 | 18 | **2** | The Long Surrender Tour |  |
| foy-vance | 2026-09-26 | 29 | 19 | 19 | **14** | The Wake World Tour |  |
| the-lemonheads | 2026-09-26 | 23 | 20 | 19 | **12** | The Love Chant Tour |  |
| tommy-emmanuel | 2026-09-26 | 35 | 25 | 25 | **20** | Living In The Light Tour |  |
| haiden-henderson | 2026-09-26 | 26 | 11 | 11 | **12** | The dumblond Tour |  |
| dylan-scott | 2026-09-27 | 21 | 19 | 19 | **6** | Dear Big City Tour |  |
| valley | 2026-09-27 | 35 | 23 | 23 | **12** | Do You Need To Be Entertained? The Tour |  |
| yacht-rock-revue | 2026-09-27 | 19 | 13 | 13 | **7** | — |  |
| too-many-zooz | 2026-09-27 | 14 | 7 | 7 | **10** | — |  |
| amble | 2026-09-27 | 42 | 16 | 16 | **10** | — |  |
| fantasia | 2026-10-01 | 24 | 21 | 19 | **2** | The Love of Soul Tour |  |
| a-perfect-circle | 2026-10-01 | 35 | 29 | 29 | **2** | — |  |
| chelsea-cutler | 2026-10-01 | 25 | 17 | 16 | **10** | IS THIS THE END? Tour |  |
| the-red-clay-strays | 2026-10-01 | 52 | 44 | 41 | **13** | Grateful Tour |  |
| daughtry | 2026-10-01 | 49 | 36 | 31 | **14** | 20 Years Unplugged Tour |  |
| greta-van-fleet | 2026-10-03 | 54 | 27 | 24 | **6** | Into The Beginning Tour |  |
| fontaines-d-c | 2026-10-03 | 45 | 21 | 21 | **11** | D.C. EU & UK Tour 2026 |  |
| riley-green | 2026-10-03 | 38 | 35 | 35 | **5** | That's Just Me Tour |  |
| hazlett | 2026-10-03 | 28 | 15 | 13 | **9** | — |  |
| carly-rae-jepsen | 2026-10-03 | 27 | 21 | 21 | **3** | Day and Night Tour |  |
| the-neighbourhood | 2026-10-06 | 15 | 15 | 14 | 0 | — |  |
| staind | 2026-10-06 | 35 | 29 | 29 | **3** | — |  |
| dylan-gossett | 2026-10-06 | 37 | 22 | 22 | **8** | — |  |
| flans | 2026-10-06 | 13 | 11 | 11 | **2** | — |  |
| warren-zeiders | 2026-10-06 | 21 | 13 | 13 | **5** | — |  |
| dancing-with-the-stars | 2026-10-09 | 52 | 0 | 0 | 0 | — |  |
| def-leppard | 2026-10-09 | 48 | 36 | 36 | **6** | — |  |
| nickelback | 2026-10-09 | 58 | 19 | 15 | **15** | — |  |
| jay-wheeler | 2026-10-09 | 22 | 16 | 16 | **5** | — |  |
| mico | 2026-10-09 | 41 | 23 | 22 | **17** | — |  |
| rod-wave | 2026-10-11 | 19 | 13 | 13 | **2** | — |  |
| uicideboy | 2026-10-26 | 7 | 4 | 4 | **1** | — |  |
| steve-lacy | 2026-10-11 | 24 | 16 | 16 | **2** | — |  |
| the-smashing-pumpkins | 2026-10-11 | 20 | 12 | 12 | **4** | — |  |
| fuerza-regida | 2026-10-11 | 21 | 6 | 6 | **4** | — |  |
| mei-semones | 2026-10-11 | 22 | 10 | 10 | **16** | — |  |
| slipknot | 2026-10-12 | 14 | 10 | 10 | **2** | — |  |
| noah-kahan | 2026-10-12 | 16 | 0 | 0 | **1** | — |  |
| eagles | 2026-10-12 | 14 | 12 | 12 | 0 | — |  |
| journey | 2026-10-12 | 25 | 18 | 16 | **6** | — |  |
| john-mayer | 2026-10-12 | 21 | 10 | 10 | 0 | — |  |
| backstreet-boys | 2026-10-12 | 18 | 15 | 15 | 0 | — |  |
| twenty-one-pilots | 2026-10-26 | 1 | 0 | 0 | 0 | — |  |
| rod-stewart | 2026-10-13 | 28 | 7 | 7 | **12** | — |  |
| guns-n-roses | 2026-10-13 | 7 | 0 | 0 | 0 | — |  |
| bring-me-the-horizon | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| leon-bridges | 2026-10-13 | 32 | 27 | 27 | **6** | — |  |
| lionel-richie | 2026-10-13 | 6 | 6 | 6 | **1** | — |  |
| earth-wind-fire | 2026-10-14 | 23 | 11 | 10 | **4** | — |  |
| santana | 2026-10-14 | 24 | 16 | 16 | 0 | — |  |
| simple-minds | 2026-10-14 | 18 | 0 | 0 | **5** | — |  |
| thirty-seconds-to-mars | 2026-10-14 | 15 | 0 | 0 | **10** | — |  |
| stray-kids | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| kylie-minogue | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| lewis-capaldi | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| mumford-sons | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| hayley-williams | 2026-10-15 | 7 | 0 | 0 | **1** | — |  |
| blink-182 | 2026-10-15 | 1 | 0 | 0 | 0 | — |  |
| janet-jackson | 2026-10-15 | 1 | 1 | 1 | **1** | — |  |
| gorillaz | 2026-10-15 | 11 | 9 | 7 | **1** | — |  |
| weezer | 2026-10-16 | 17 | 4 | 4 | **4** | — |  |
| ella-langley | 2026-10-16 | 3 | 3 | 3 | **2** | — |  |
| aerosmith | 2026-10-16 | 2 | 0 | 0 | 0 | — |  |
| mana | 2026-10-16 | 8 | 5 | 4 | **1** | — |  |
| jonas-brothers | 2026-10-16 | 36 | 23 | 23 | **5** | — |  |
| brent-faiyaz | 2026-10-16 | 3 | 3 | 3 | **1** | — |  |
| ye | 2026-10-18 | 3 | 3 | 3 | **2** | — |  |
| chris-brown | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| kevin-gates | 2026-10-26 | 1 | 1 | 1 | 0 | — |  |
| brand-new | 2026-10-18 | 12 | 9 | 8 | **7** | — |  |
| kacey-musgraves | 2026-10-18 | 8 | 4 | 4 | **3** | — |  |
| knocked-loose | 2026-10-18 | 10 | 7 | 7 | **3** | — |  |
| chris-stapleton | 2026-10-19 | 2 | 1 | 1 | 0 | — |  |
| chevelle | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| phoebe-bridgers | 2026-10-19 | 17 | 0 | 0 | **2** | — |  |
| bryson-tiller | 2026-10-19 | 21 | 1 | 1 | **4** | — |  |
| arcangel | 2026-10-19 | 12 | 11 | 11 | 0 | — |  |
| garth-brooks | 2026-10-19 | 7 | 7 | 7 | 0 | — |  |
| elevation-worship | 2026-10-20 | 8 | 7 | 7 | **1** | — |  |
| stevie-wonder | 2026-10-20 | 15 | 5 | 5 | **4** | — |  |
| lil-wayne | 2026-10-20 | 5 | 5 | 5 | 0 | — |  |
| tom-jones | 2026-10-20 | 8 | 8 | 8 | **1** | — |  |
| a-boogie-wit-da-hoodie | 2026-10-20 | 10 | 10 | 10 | **2** | — |  |
| zach-top | 2026-10-20 | 4 | 4 | 4 | 0 | — |  |
| katseye | 2026-10-21 | 19 | 11 | 11 | **1** | — |  |
| ricky-martin | 2026-10-21 | 5 | 5 | 5 | **1** | — |  |
| ty-myers | 2026-10-21 | 4 | 3 | 3 | 0 | — |  |
| dan-shay | 2026-10-21 | 8 | 7 | 7 | **1** | — |  |
| beabadoobee | 2026-10-21 | 14 | 5 | 5 | **6** | — |  |
| dave-matthews-band | 2026-10-21 | 7 | 7 | 7 | **1** | — |  |
| los-tigres-del-norte | 2026-10-22 | 11 | 10 | 10 | **2** | — |  |
| the-chicks | 2026-10-22 | 7 | 7 | 7 | 0 | — |  |
| young-miko | 2026-10-22 | 8 | 8 | 8 | **1** | — |  |
| zac-brown-band | 2026-10-22 | 8 | 8 | 8 | **3** | — |  |
| sleeping-with-sirens | 2026-10-22 | 21 | 14 | 14 | **4** | — |  |
| chayanne | 2026-10-22 | 3 | 3 | 3 | 0 | — |  |
| cece-winans | 2026-10-23 | 13 | 13 | 13 | **4** | — |  |
| role-model | 2026-10-23 | 5 | 0 | 0 | **3** | — |  |
| karan-aujla | 2026-10-23 | 6 | 6 | 6 | 0 | — |  |
| jack-johnson | 2026-10-23 | 16 | 0 | 0 | **2** | — |  |
| phil-wickham | 2026-10-23 | 5 | 5 | 5 | **5** | — |  |
| gavin-adcock | 2026-10-23 | 24 | 18 | 18 | **12** | — |  |
| u2 | 2026-10-24 | 4 | 0 | 0 | 0 | — |  |
| beck | 2026-10-24 | 9 | 9 | 9 | **2** | — |  |
| dermot-kennedy | 2026-10-24 | 8 | 0 | 0 | 0 | — |  |
| turnpike-troubadours | 2026-10-24 | 3 | 3 | 3 | **2** | — |  |
| sam-fender | 2026-10-25 | 9 | 0 | 0 | 0 | — |  |
| bon-jovi | 2026-10-25 | 5 | 4 | 0 | 0 | — |  |
| logic | 2026-10-26 | 0 | 0 | 0 | 0 | — |  |
| anuel-aa | 2026-10-25 | 3 | 1 | 0 | 0 | — |  |
| luke-bryan | 2026-10-25 | 2 | 2 | 0 | 0 | — |  |
| billy-strings | 2026-10-25 | 16 | 3 | 0 | **1** | — |  |

Event CTAs publish independently per provider (`providerEventPublishable`; see `docs/ARCHITECTURE.md`). Across the 507 recheck rows, 234 publish SeatGeek, 279 publish Vivid Seats, 418 have at least one independently verified resale provider, and 4 (all past events) are fully CTA-suppressed, not counting dates held until their public on-sale. (Recounted 2026-10-05 from `public/data/events.json` through `scripts/lib/event-link-coverage.mjs`. The four suppressed rows: ed-sheeran Nashville, bts Madrid ×2, bad-bunny Marseille.)

**Empty boards move daily** — generated by the same `npm run status:surface:write` pass, from `artistHasUpcomingShow` in `functions/_artist-indexability.js`. An empty board is not a noindex: the artist URL is a durable destination that stays `index,follow` and renders an explicit empty state.

<!-- generated:empty-boards -->
Generated 2026-10-25: 24 of the 183 editorially-indexable artists have no upcoming date and render an empty board (ended tours still `index,follow`) — beyonce, ariana-grande, bad-bunny, morgan-wallen, jay-z, shakira, raye, tate-mcrae, summer-walker, rosalia, post-malone, the-weeknd, jelly-roll, foo-fighters, uicideboy, twenty-one-pilots, bring-me-the-horizon, stray-kids, kylie-minogue, lewis-capaldi, mumford-sons, chris-brown, kevin-gates, chevelle — leaving **159 artist pages with upcoming dates**; 10 of them (beyonce, tate-mcrae, the-weeknd, bring-me-the-horizon, stray-kids, kylie-minogue, lewis-capaldi, mumford-sons, chris-brown, chevelle) have never had an event record and are `noindex,follow` until one lands; 18 auto-promoted artist(s) (uicideboy, twenty-one-pilots, bring-me-the-horizon, stray-kids, kylie-minogue, lewis-capaldi, mumford-sons, blink-182, janet-jackson, aerosmith, chris-brown, kevin-gates, chris-stapleton, chevelle, zach-top, ty-myers, chayanne, turnpike-troubadours) are `noindex,follow` until they have 3 upcoming dates.
<!-- /generated:empty-boards -->

## What's true right now

Mechanism: `docs/ARCHITECTURE.md`. Deploy: `docs/DEPLOYMENT.md`. Provider lanes: `docs/PROVIDER_DATA_POLICY.md`. Automation: `docs/OPERATIONS.md`.

- **Providers:** SeatGeek is the primary CTA (artist and event level); Ticketmaster is a plain, unmonetized link source; Vivid Seats, TicketNetwork, Ticket Liquidator and StubHub International are event-level affiliate lanes.
- **Ticketmaster allowlist:** 12 country storefronts. `ticketmaster.com.mx` is excluded, so the four Bruno Mars Mexico City dates stay out.
- **Prices:** numeric listed-price snapshots are live for Vivid Seats, TicketNetwork and StubHub International (cache-only, exact-event, fail-closed). SeatGeek listed-price display is approved when a fresh, exact-event partner-API snapshot passes its source and freshness gates; the current client feed has produced no usable numeric rows. Ticket Liquidator has rights (owner-confirmed 2026-09-12) and 745 verified event links, but stays price-disabled until its feed carries a numeric `CurrentPrice`.
- **Schema offers:** `MusicEvent` `offers` is on site-wide (`SCHEMA_OFFERS_ENABLED=true`) for the three numeric-price lanes only, and never emits availability.
- **Price coverage** (2026-09-24, production): 98.3% of mapped, on-sale upcoming dates on indexable artists showed a price. `price-coverage-report.yml` recomputes this daily into the `automation:price-coverage` issue. Not machine-pinned.
- **Never-dated artists** (beyonce, raye, tate-mcrae, the-weeknd) are `noindex,follow` and out of the sitemap until a first date lands. `/sitemap-index.xml` fronts per-type sitemaps.
- **Event lifecycle:** a Ticketmaster `cancelled` or `postponed` date keeps its card but loses every link, price and `MusicEvent` node, and `/api/out` refuses it. Removing the row is an owner decision (`docs/ARCHITECTURE.md` → Event lifecycle), made with a tombstone in `data/deleted-events.json` (Karol G, Warsaw, #1629).
- **Flags:** `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false`, `OUT_CLICK_ID_SUBID_ENABLED=true` (each base-tracking redirect's `click_id` goes to Impact as `subId1`).
- **Tracking (2026-10-16):** base tracking URLs are set for StubHub International, TicketNetwork and Ticket Liquidator, each on its own Impact host. A Cloudflare WAF rule challenges direct `/api/out` requests with no same-site Referer (`docs/OPERATIONS.md` → Secrets and bindings).
- **Live surfaces:** city, venue and artist-city pages (gated by `docs/ROUTE_INDEXABILITY_POLICY.md`); the blog; `/currency-converter`; derived-content artist pages; the `/admin` editor at `https://admin.tourticketcompare.com/admin` for blog posts and guides (`docs/BLOG.md`).
- **Event pages:** `/events/<slug>-<key>` exists for every upcoming performance, `noindex,follow` and in no sitemap unless it is an eligible member of an indexing cohort (below), each with one `MusicEvent` (no offers). The boards link them as "Show details". `npm run report:event-routes` gives current figures.
- **Event indexing pilot** (live since 2026-09-27): 30 frozen keys in `data/event-indexing-pilot.json`. With `EVENT_PAGES_INDEXING="pilot"`, only eligible members render `index,follow` and appear in `/sitemaps/events.xml` and `llms.txt`. A member that becomes ineligible drops out and is not replaced. Staged batches are indexed the same way (`EVENT_INDEXING_BATCHES`): batch 1, 250 pages across 62 artists, since 2026-10-10; batch 2, 150 pages across 37 artists, added 2026-10-16. Measure with `npm run report:event-indexing-pilot` (`-- --batch batch-1` for the batch).
- **Not supported:** live inventory or blanket "cheapest" claims, tour landing pages, indexable event pages outside the frozen cohorts, artist-level Vivid Seats CTAs, any Ticketmaster affiliate tracking, event schema without verified event-level data, and conversion or revenue attribution (checkout happens off-site).

## How to update this file

Run the two writers, then review what they changed rather than recounting by hand:

- `npm run status:validate:write` (`scripts/validate-status-counts.mjs`) rewrites the "Current data" figures and the whole per-artist table (`last_verified_at` included) from `public/data/*.json`, `data/provider-identities.json`, and `functions/api/out.js`.
- `npm run status:surface:write` (`scripts/audit-indexable-surface.mjs --write-status`) rewrites the two `<!-- generated:… -->` blocks from a real render of every route. **Never hand-edit inside those markers** — the next run overwrites you.

Both run daily in `daily-audit.yml`, so this file is normally already current. What's left for a human: prose in the per-artist "Notes"/"Tour name" columns, and anything sourced from `/api/health` or D1 that the writers don't touch. When editing bullet sentences by hand, do not reword the phrases the writers pattern-match on (see `scripts/validate-status-counts.mjs` → `SCALAR_ASSERTIONS`) or `--write` silently stops updating that figure. Full lifecycle policy: `docs/DOCS_MAINTENANCE.md`.
