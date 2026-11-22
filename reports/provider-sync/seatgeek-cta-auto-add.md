# SeatGeek CTA auto-add log

Generated: 2026-11-22T03:07:12.999Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 5895
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5895
- Events already carrying a valid SeatGeek URL: 3748
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3748
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2147
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1650
- Skipped before any API call: 860 (past_event: 860)
- Events this run can check (window size): 1750
- Rotation: window 1 of 1 (key 20779)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1609
- Events checked by this run: 1608
- API calls made: 3500
- Rate-limit responses: 0
- URLs added: 363
- Events skipped: 1246
- no_candidates_returned: 1135
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --delay-ms 500 --max-api-calls 3500 --resume-from 'tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c'
- Accepted venue mismatches: 52
- Conflicts found: 33

## Skipped reasons

- no_candidates_returned: 1135
- city_or_metro_match_failed: 74
- artist_match_failed: 3
- conflicting_same_date_city_candidates: 33
- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 363` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3748 event(s) already carried valid SeatGeek URLs before this run, including 3748 enrichment-eligible event(s).
- This run queried only the 2147 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | Black Stone Cherry | 2026-11-21 | Birmingham | https://seatgeek.com/black-stone-cherry-tickets/birmingham-alabama-the-fennec-sports-live-music-events-2026-11-21-8-pm/concert/18637134 |
| tm-latto-2026-boston-z7r9jz1aae_7z | Latto | 2026-11-23 | Boston | https://seatgeek.com/doja-cat-tickets/boston-massachusetts-td-garden-2026-11-23-7-30-pm/concert/17769352 |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Pink Martini | 2026-12-04 | Redding | https://seatgeek.com/pink-martini-tickets/redding-california-cascade-theatre-redding-2026-12-04-7-30-pm/concert/18690405 |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Blue October | 2026-12-06 | Oklahoma City | https://seatgeek.com/blue-october-tickets/oklahoma-city-oklahoma-the-criterion-okc-2026-12-06-8-pm/concert/18143446 |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | Victoria Monet | 2026-12-14 | Seattle | https://seatgeek.com/victoria-monet-tickets/seattle-washington-wamu-theater-2026-12-14-8-pm/concert/18579793 |
| tm-two-friends-2027-miami-beach-rz7hnez1a4vo7k | Two Friends | 2027-01-16 | Miami Beach | https://seatgeek.com/two-friends-tickets/miami-beach-florida-liv-nightclub-miami-beach-2027-01-16-11-30-pm/concert/18758782 |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | Pink Martini | 2027-01-19 | Athens | https://seatgeek.com/pink-martini-tickets/athens-georgia-hodgson-concert-hall-at-the-uga-performing-arts-center-2027-01-19-7-30-pm/concert/18701989 |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | Atmosphere | 2027-01-20 | Grand Junction | https://seatgeek.com/atmosphere-tickets/grand-junction-colorado-mesa-theater-2027-01-20-7-pm/concert/18609076 |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | Air Supply | 2027-01-22 | Daytona Beach | https://seatgeek.com/air-supply-tickets/daytona-beach-florida-peabody-auditorium-2027-01-22-8-pm/concert/18355671 |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | Air Supply | 2027-01-30 | Immokalee | https://seatgeek.com/air-supply-tickets/immokalee-florida-seminole-casino-immokalee-2027-01-30-8-pm/concert/18424504 |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | Tommy Emmanuel | 2027-02-02 | Rochester | https://seatgeek.com/tommy-emmanuel-tickets/rochester-new-york-nazareth-college-arts-center-2027-02-02-7-pm/concert/18818332 |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | Yuridia | 2027-02-11 | Palm Desert | https://seatgeek.com/yuridia-tickets/thousand-palms-california-acrisure-arena-2027-02-11-8-pm/concert/18570384 |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | Chelsea Cutler | 2027-02-13 | Boston | https://seatgeek.com/chelsea-cutler-tickets/boston-massachusetts-roadrunner-boston-2027-02-13-3-30-am/concert/18639183 |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | Cristian Castro | 2027-02-13 | Palm Desert | https://seatgeek.com/cristian-castro-tickets/thousand-palms-california-acrisure-arena-2027-02-13-8-pm/concert/18295570 |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | Foreigner | 2027-02-15 | Daytona Beach | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Pink Martini | 2027-02-16 | Madison | https://seatgeek.com/pink-martini-tickets/madison-wisconsin-orpheum-theatre-madison-2027-02-16-7-30-pm/concert/18472447 |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Valley | 2027-02-19 | Edmonton | https://seatgeek.com/valley-tickets/edmonton-canada-midway-edmonton-2027-02-19-6-30-pm/concert/18606369 |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Dinosaur Jr. | 2027-02-27 | Cincinnati | https://seatgeek.com/dinosaur-jr-tickets/cincinnati-ohio-bogarts-cincinnati-2027-02-27-7-pm/concert/18540446 |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | Dylan Scott | 2027-02-27 | Chandler | https://seatgeek.com/dylan-scott-tickets/chandler-arizona-gila-river-hotels-casinos-wild-horse-pass-2027-02-27-8-pm/concert/18601182 |
| tm-valley-2027-denver-z7r9jz1aavzfu | Valley | 2027-03-06 | Denver | https://seatgeek.com/valley-tickets/denver-colorado-bluebird-theater-denver-2027-03-06-9-pm/concert/18683979 |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Mico | 2027-03-12 | Cincinnati | https://seatgeek.com/mico-tickets/cincinnati-ohio-bogarts-cincinnati-2027-03-12-7-pm/concert/18666222 |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | Grace Potter | 2027-03-14 | Redding | https://seatgeek.com/grace-potter-the-nocturnals-tickets/redding-california-cascade-theatre-redding-2027-03-14-7-30-pm/concert/18755563 |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | The Rankin Family | 2027-03-17 | Thunder Bay | https://seatgeek.com/the-rankin-family-tickets/thunder-bay-canada-thunder-bay-community-auditorium-2027-03-17-7-30-pm/concert/18761505 |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | Theory Of A Deadman | 2027-03-19 | Thunder Bay | https://seatgeek.com/theory-of-a-deadman-tickets/thunder-bay-canada-thunder-bay-community-auditorium-2027-03-19-7-30-pm/concert/18570548 |
| tm-phoebe-bridgers-2027-kanata-1kg8vp_fga54way | Phoebe Bridgers | 2027-03-25 | Kanata | https://seatgeek.com/phoebe-bridgers-tickets/kanata-canada-canadian-tire-centre-2027-03-25-7-30-pm/concert/18760655 |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | VNV Nation | 2027-03-27 | Denver | https://seatgeek.com/vnv-nation-tickets/denver-colorado-the-oriental-theater-2027-03-27-8-pm/concert/18669971 |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | Melissa Etheridge | 2027-04-03 | Madison | https://seatgeek.com/melissa-etheridge-tickets/madison-wisconsin-orpheum-theatre-madison-2027-04-03-8-pm/concert/18754496 |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | Nothing But Thieves | 2027-04-06 | San Diego | https://seatgeek.com/nothing-but-thieves-tickets/san-diego-california-soma-san-diego-2027-04-06-8-pm/concert/18266339 |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6cv | Billy Strings | 2027-04-09 | Saint Augustine | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-09-7-30-pm/concert/18755214 |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa40k | Billy Strings | 2027-04-10 | Saint Augustine | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-10-7-30-pm/concert/18755215 |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6cd | Billy Strings | 2027-04-12 | Saint Augustine | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-12-7-30-pm/concert/18755216 |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaab04 | Billy Strings | 2027-04-13 | Saint Augustine | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-13-7-30-pm/concert/18755220 |
| tm-alex-warren-2027-saint-louis-vv17bz_pgkm394lj | Alex Warren | 2027-04-18 | Saint Louis | https://seatgeek.com/alex-warren-tickets/saint-louis-missouri-enterprise-center-2027-04-18-7-30-pm/concert/18773530 |
| tm-melissa-etheridge-2027-chandler-1a_zk4ngkdm2bwk | Melissa Etheridge | 2027-04-23 | Chandler | https://seatgeek.com/melissa-etheridge-tickets/chandler-arizona-gila-river-hotels-casinos-wild-horse-pass-2027-04-23-8-pm/concert/18754727 |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | Saint Levant | 2027-04-28 | San Diego | https://seatgeek.com/saint-levant-tickets/san-diego-california-soma-san-diego-2027-04-28-7-pm/concert/18386209 |
| tm-alex-warren-2027-kanata-1aszk4jgkdqmz4o | Alex Warren | 2027-05-01 | Kanata | https://seatgeek.com/alex-warren-tickets/kanata-canada-canadian-tire-centre-2027-05-01-7-30-pm/concert/18773545 |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | The Warning | 2027-05-01 | Oklahoma City | https://seatgeek.com/the-warning-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-01-7-pm/concert/18593400 |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | Meshuggah | 2027-05-02 | Oklahoma City | https://seatgeek.com/meshuggah-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-02-7-pm/concert/18724686 |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Mei Semones | 2027-05-02 | Denver | https://seatgeek.com/mei-semones-tickets/denver-colorado-bluebird-theater-denver-2027-05-02-8-pm/concert/18793886 |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | Jon Pardi | 2027-05-13 | Loveland | https://seatgeek.com/jon-pardi-tickets/loveland-colorado-blue-federal-credit-union-arena-2027-05-13-7-pm/concert/18391250 |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Lizzy McAlpine | 2027-05-18 | Oklahoma City | https://seatgeek.com/lizzy-mcalpine-tickets/oklahoma-city-oklahoma-thelma-gaylord-pat-at-civic-center-music-hall-2027-05-18-7-pm/concert/18619437 |
| tm-jhene-aiko-2027-west-valley-city-g5vzz_ps36muq | Jhene Aiko | 2027-05-19 | West Valley City | https://seatgeek.com/jhene-aiko-tickets/west-valley-city-utah-maverik-center-2027-05-19-7-30-pm/concert/18783917 |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Dylan Gossett | 2027-05-20 | Oklahoma City | https://seatgeek.com/dylan-gossett-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-20-7-pm/concert/18642116 |
| tm-two-friends-2027-ottawa-1aszk4xgkdbc6bg | Two Friends | 2027-05-22 | Ottawa | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-22-7-30-pm/concert/18757902 |
| tm-travis-tritt-2027-durham-g5evz_p2pdn7v | Travis Tritt | 2027-06-18 | Durham | https://seatgeek.com/travis-tritt-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-06-18-7-30-pm/concert/18756343 |
| tm-two-friends-2027-bala-1avzz_4gkztkppc | Two Friends | 2027-07-01 | Bala | https://seatgeek.com/two-friends-tickets/bala-canada-kee-to-bala-2027-07-01-8-pm/concert/18756748 |
| tm-the-dead-south-2027-thunder-bay-1avzz_4gkumrenk | The Dead South | 2027-10-06 | Thunder Bay | https://seatgeek.com/the-dead-south-tickets/thunder-bay-canada-thunder-bay-community-auditorium-2027-10-06-8-pm/concert/18754630 |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Mat Kearney | 2027-11-06 | Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | Latto | 2026-11-29 | Philadelphia | https://seatgeek.com/doja-cat-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-29-7-30-pm/concert/17769353 |
| tm-a-boogie-wit-da-hoodie-2026-new-york-k7vgf_p5e9_go | A Boogie Wit Da Hoodie | 2026-12-13 | New York | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-12-13-7-pm/concert/18740860 |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Pink Martini | 2026-12-14 | Philadelphia | https://seatgeek.com/pink-martini-tickets/philadelphia-pennsylvania-kimmel-center-miller-theater-2026-12-14-7-pm/concert/18364153 |
| tm-jon-pardi-2026-nashville-g5viz_p4pjkae | Jon Pardi | 2026-12-17 | Nashville | https://seatgeek.com/jon-pardi-tickets/nashville-tennessee-the-truth-nashville-2026-12-17-7-30-pm/concert/18763089 |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | Chelsea Cutler | 2027-01-29 | Saint Petersburg | https://seatgeek.com/chelsea-cutler-tickets/saint-petersburg-florida-jannus-live-2027-01-29-3-30-am/concert/18639168 |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Air Supply | 2027-03-03 | Ottawa | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |
| tm-jason-aldean-2027-durant-vvg1yz_4wtfp_q | Jason Aldean | 2027-03-06 | Durant | https://seatgeek.com/jason-aldean-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-06-8-pm/concert/18781160 |
| tm-jhene-aiko-2027-saint-louis-vv17bz_pgkmdcqlf | Jhene Aiko | 2027-03-10 | Saint Louis | https://seatgeek.com/jhene-aiko-tickets/saint-louis-missouri-enterprise-center-2027-03-10-7-30-pm/concert/18783861 |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | Theory Of A Deadman | 2027-03-11 | Ottawa | https://seatgeek.com/theory-of-a-deadman-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-11-7-pm/concert/18570538 |
| tm-intocable-2027-indio-z7r9jz1aaak07 | Intocable | 2027-03-20 | Indio | https://seatgeek.com/intocable-tickets/indio-california-fantasy-springs-resort-casino-2027-03-20-8-pm/concert/18786699 |
| tm-phoebe-bridgers-2027-hamilton-168zk4eqbza5ddga | Phoebe Bridgers | 2027-03-21 | Hamilton | https://seatgeek.com/phoebe-bridgers-tickets/hamilton-canada-td-coliseum-2027-03-21-7-30-pm/concert/18760650 |
| tm-jhene-aiko-2027-toronto-1avzz_pgkm8-pwg | Jhene Aiko | 2027-03-24 | Toronto | https://seatgeek.com/jhene-aiko-tickets/toronto-canada-scotiabank-arena-2027-03-24-7-30-pm/concert/18783919 |
| tm-santana-2027-hanover-z7r9jz1aaa4k8 | Santana | 2027-03-26 | Hanover | https://seatgeek.com/santana-tickets/hanover-maryland-the-hall-at-live-2027-03-26-9-pm/concert/18784693 |
| tm-santana-2027-windsor-1avzz_pgkyz-kdw | Santana | 2027-03-31 | Windsor | https://seatgeek.com/santana-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-31-8-pm/concert/18784705 |
| tm-santana-2027-niagara-falls-1avzz_pgkm2345j | Santana | 2027-04-01 | Niagara Falls | https://seatgeek.com/santana-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-01-8-pm/concert/18784708 |
| tm-vnv-nation-2027-toronto-1avzzbvgkvjgkmw | VNV Nation | 2027-04-04 | Toronto | https://seatgeek.com/vnv-nation-tickets/toronto-canada-the-danforth-music-hall-2027-04-04-6-30-pm/concert/18802428 |
| tm-alex-warren-2027-des-moines-z7r9jz1aaaoat | Alex Warren | 2027-04-20 | Des Moines | https://seatgeek.com/alex-warren-tickets/des-moines-iowa-casey-s-center-2027-04-20-7-45-pm/concert/18773531 |
| tm-melissa-etheridge-2027-wichita-vv1kbz_pfvg7sw9z | Melissa Etheridge | 2027-04-21 | Wichita | https://seatgeek.com/melissa-etheridge-tickets/wichita-kansas-orpheum-theatre-wichita-2027-04-21-7-30-pm/concert/18754513 |
| tm-sam-fender-2027-toronto-1avzz_pgkl1qlzt | Sam Fender | 2027-04-24 | Toronto | https://seatgeek.com/sam-fender-tickets/toronto-canada-scotiabank-arena-2027-04-24-8-pm/concert/18760801 |
| tm-sam-fender-2027-milwaukee-z7r9jz1aaaozy | Sam Fender | 2027-04-27 | Milwaukee | https://seatgeek.com/sam-fender-tickets/milwaukee-wisconsin-the-rave-eagles-club-2027-04-27-8-pm/concert/18760809 |
| tm-alex-warren-2027-hamilton-1avzz_pgkiu_f3b | Alex Warren | 2027-04-30 | Hamilton | https://seatgeek.com/alex-warren-tickets/hamilton-canada-td-coliseum-2027-04-30-7-30-pm/concert/18773542 |
| tm-alex-warren-2027-belmont-park-1adzz_pgkmwcbz2 | Alex Warren | 2027-05-05 | Belmont Park | https://seatgeek.com/alex-warren-tickets/elmont-new-york-ubs-arena-2027-05-05-7-45-pm/concert/18773552 |
| tm-travis-tritt-2027-waterloo-k7vgf_29lrc4r | Travis Tritt | 2027-05-21 | Waterloo | https://seatgeek.com/travis-tritt-tickets/waterloo-new-york-the-vine-at-del-lago-resort-and-casino-2027-05-21-8-pm/concert/18757506 |
| tm-two-friends-2027-ottawa-1ad7z_pgkgxjwbt | Two Friends | 2027-05-23 | Ottawa | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-23-6-30-pm/concert/18774332 |
| tm-cody-johnson-2027-gilford-vv177z_pgksxdnvq | Cody Johnson | 2027-05-29 | Gilford | https://seatgeek.com/cody-johnson-tickets/gilford-new-hampshire-banknh-pavilion-2027-05-29-7-pm/concert/18784858 |
| tm-megadeth-2027-shakopee-1ae7z_pgkcukysu | Megadeth | 2027-05-29 | Shakopee | https://seatgeek.com/megadeth-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-29-7-pm/concert/18778376 |
| tm-two-friends-2027-philadelphia-vv1aovp_fga1qsqx | Two Friends | 2027-06-04 | Philadelphia | https://seatgeek.com/two-friends-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-06-04-7-pm/concert/18757690 |
| tm-megadeth-2027-toronto-1avzz_pgksfsdba | Megadeth | 2027-06-10 | Toronto | https://seatgeek.com/megadeth-tickets/toronto-canada-rbc-amphitheatre-2027-06-10-7-pm/concert/18778436 |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbznja | KPop Demon Hunters | 2027-06-15 | Columbus | https://seatgeek.com/kpop-demon-hunters-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-15-7-30-pm/concert/18838896 |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgagectc | KPop Demon Hunters | 2027-06-29 | Belmont Park | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-29-7-30-pm/concert/18772683 |
| tm-two-friends-2027-toronto-1a8zk49gkesrne- | Two Friends | 2027-06-30 | Toronto | https://seatgeek.com/two-friends-tickets/toronto-canada-rbc-amphitheatre-2027-06-30-7-pm/concert/18725838 |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgag7qt4 | KPop Demon Hunters | 2027-06-30 | Belmont Park | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-30-7-30-pm/concert/18772726 |
| tm-foreigner-2027-gilford-vv177z_pgkichxsp | Foreigner | 2027-07-17 | Gilford | https://seatgeek.com/foreigner-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-17-7-pm/concert/18778524 |
| tm-travis-tritt-2027-bristol-g5viz_4sc3z7i | Travis Tritt | 2027-07-30 | Bristol | https://seatgeek.com/travis-tritt-tickets/bristol-virginia-hard-rock-hotel-and-casino-bristol-2027-07-30-8-pm/concert/18757839 |
| tm-megadeth-2027-nampa-z7r9jz1aaa3_- | Megadeth | 2027-09-28 | Nampa | https://seatgeek.com/megadeth-tickets/nampa-idaho-ford-idaho-center-2027-09-28-7-pm/concert/18778430 |
| tm-missio-2026-portland-z7r9jz1aazivo | Missio | 2026-12-10 | Portland | https://seatgeek.com/missio-tickets/portland-oregon-star-theater-portland-2026-12-10-7-30-pm/concert/18850486 |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | Missio | 2026-12-11 | Seattle | https://seatgeek.com/missio-tickets/seattle-washington-funhouse-2026-12-11-8-30-pm/concert/18851903 |
| tm-lord-huron-2026-philadelphia-vvg1fz_2mgblql | Lord Huron | 2026-12-12 | Philadelphia | https://seatgeek.com/lord-huron-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-12-8-pm/concert/18421969 |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | Beartooth | 2026-12-16 | Phoenix | https://seatgeek.com/beartooth-tickets/phoenix-arizona-the-van-buren-2026-12-16-6-30-pm/concert/18253074 |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6k-q | Barry Manilow | 2027-01-16 | Estero | https://seatgeek.com/barry-manilow-tickets/estero-florida-hertz-arena-2027-01-16-7-pm/concert/17748832 |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6n-j | Barry Manilow | 2027-01-17 | Estero | https://seatgeek.com/barry-manilow-tickets/estero-florida-hertz-arena-2027-01-17-7-pm/concert/17748833 |
| tm-grace-potter-2027-mckees-rocks-1apzk4jgkdpsghe | Grace Potter | 2027-01-20 | McKees Rocks | https://seatgeek.com/grace-potter-the-nocturnals-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-20-7-30-pm/concert/18755496 |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | Chelsea Cutler | 2027-01-30 | Atlanta | https://seatgeek.com/chelsea-cutler-tickets/atlanta-georgia-the-eastern-atlanta-2027-01-30-3-30-am/concert/18639169 |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Pink Martini | 2027-02-11 | Cincinnati | https://seatgeek.com/pink-martini-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-02-11-8-pm/concert/18321561 |
| tm-tame-impala-2027-tulsa-1aezz_pgkmxe71m | Tame Impala | 2027-02-11 | Tulsa | https://seatgeek.com/tame-impala-tickets/tulsa-oklahoma-bok-center-2027-02-11-7-pm/concert/18843579 |
| tm-foreigner-2027-clearwater-z7r9jz1aaez8o | Foreigner | 2027-02-16 | Clearwater | https://seatgeek.com/foreigner-tickets/clearwater-florida-ruth-eckerd-hall-2027-02-16-8-pm/concert/18629078 |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | Mico | 2027-02-19 | Carrboro | https://seatgeek.com/mico-tickets/carrboro-north-carolina-cat-s-cradle-carrboro-2027-02-19-8-pm/concert/18844951 |
| tm-meshuggah-2027-omaha-1aozk4fgkd-wmvg | Meshuggah | 2027-02-21 | Omaha | https://seatgeek.com/meshuggah-tickets/omaha-nebraska-steelhouse-omaha-2027-02-21-7-pm/concert/18724647 |
| tm-santana-2027-highland-z7r9jz1aaa4kf | Santana | 2027-02-23 | Highland | https://seatgeek.com/santana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-23-8-pm/concert/18784695 |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | Mei Semones | 2027-02-25 | Portland | https://seatgeek.com/mei-semones-tickets/portland-maine-space-gallery-2027-02-25-8-pm/concert/18850382 |
| tm-meshuggah-2027-virginia-beach-vv1a8vp4dga5tbtb | Meshuggah | 2027-02-26 | Virginia Beach | https://seatgeek.com/meshuggah-tickets/virginia-beach-virginia-the-dome-13-2027-02-26-7-pm/concert/18724654 |
| tm-remi-wolf-2027-philadelphia-vv1aovpotga2njys | Remi Wolf | 2027-02-26 | Philadelphia | https://seatgeek.com/remi-wolf-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-02-26-8-pm/concert/18664758 |
| tm-intocable-2027-nashville-z7r9jz1aaak0d | Intocable | 2027-02-27 | Nashville | https://seatgeek.com/intocable-tickets/nashville-tennessee-the-pinnacle-nashville-2027-02-27-8-pm/concert/18786697 |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Daughtry | 2027-03-01 | Orono | https://seatgeek.com/daughtry-tickets/orono-maine-collins-center-for-the-arts-2027-03-01-7-pm/concert/18632934 |
| tm-meshuggah-2027-philadelphia-vv1aezk44gkd2msbd | Meshuggah | 2027-03-02 | Philadelphia | https://seatgeek.com/meshuggah-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-02-7-pm/concert/18724657 |
| tm-grace-potter-2027-las-vegas-1a9zk4jgken85tq | Grace Potter | 2027-03-06 | Las Vegas | https://seatgeek.com/grace-potter-the-nocturnals-tickets/las-vegas-nevada-the-stage-at-zouk-2027-03-06-7-30-pm/concert/18755550 |
| tm-missio-2027-carrboro-z7r9jz1aazivn | Missio | 2027-03-10 | Carrboro | https://seatgeek.com/missio-tickets/carrboro-north-carolina-cat-s-cradle-carrboro-2027-03-10-8-pm/concert/18844966 |
| tm-cody-johnson-2027-albany-k7vgf_p30ueon | Cody Johnson | 2027-03-12 | Albany | https://seatgeek.com/cody-johnson-tickets/albany-new-york-mvp-arena-2027-03-12-7-pm/concert/18842219 |
| tm-breaking-benjamin-2027-atlantic-city-vv1aezk49gkdmxvx- | Breaking Benjamin | 2027-03-12 | Atlantic City | https://seatgeek.com/breaking-benjamin-tickets/atlantic-city-new-jersey-ovation-hall-at-ocean-resort-casino-2027-03-12-7-30-pm/concert/18742758 |
| tm-mercyme-2027-highland-heights-1avbz_fgkwx5pep | MercyMe | 2027-03-14 | Highland Heights | https://seatgeek.com/mercyme-tickets/highland-heights-kentucky-truist-arena-2027-03-14-7-pm/concert/18692229 |
| tm-remi-wolf-2027-cincinnati-1kaovpo_gagbfxb | Remi Wolf | 2027-03-17 | Cincinnati | https://seatgeek.com/remi-wolf-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-03-17-8-pm/concert/18664773 |
| tm-grace-potter-2027-missoula-g5vzz_pf4jtaa | Grace Potter | 2027-03-21 | Missoula | https://seatgeek.com/grace-potter-the-nocturnals-tickets/missoula-montana-the-wilma-theatre-mt-2027-03-21-7-pm/concert/18755574 |
| tm-mercyme-2027-tallahassee-17fov0g613pbs0q | MercyMe | 2027-03-26 | Tallahassee | https://seatgeek.com/mercyme-tickets/tallahassee-florida-donald-l-tucker-civic-center-2027-03-26-7-pm/concert/18692246 |
| tm-vnv-nation-2027-cleveland-vv1kfzbv0wg7mfd6 | VNV Nation | 2027-04-03 | Cleveland | https://seatgeek.com/vnv-nation-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-03-7-pm/concert/18842839 |
| tm-alex-warren-2027-oklahoma-city-vvg1yz_pm_4u36 | Alex Warren | 2027-04-05 | Oklahoma City | https://seatgeek.com/alex-warren-tickets/oklahoma-city-oklahoma-paycom-center-2027-04-05-7-45-pm/concert/18773517 |
| tm-santana-2027-lancaster-z7r9jz1aaa4ak | Santana | 2027-04-07 | Lancaster | https://seatgeek.com/santana-tickets/lancaster-pennsylvania-american-music-theatre-2027-04-07-8-pm/concert/18784713 |
| tm-vnv-nation-2027-boston-vv177zbvgkmc0qfx | VNV Nation | 2027-04-07 | Boston | https://seatgeek.com/vnv-nation-tickets/boston-massachusetts-paradise-rock-club-2027-04-07-8-pm/concert/18793518 |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | Mei Semones | 2027-04-10 | Carrboro | https://seatgeek.com/mei-semones-tickets/carrboro-north-carolina-cat-s-cradle-carrboro-2027-04-10-8-pm/concert/18844961 |
| tm-vnv-nation-2027-baltimore-1avfzbvgklmrqky | VNV Nation | 2027-04-10 | Baltimore | https://seatgeek.com/vnv-nation-tickets/baltimore-maryland-baltimore-soundstage-2027-04-10-9-pm/concert/18809274 |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Foy Vance | 2027-04-12 | Cincinnati | https://seatgeek.com/foy-vance-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-04-12-7-pm/concert/18085807 |
| tm-jhene-aiko-2027-sunrise-z7r9jz1aaa4az | Jhene Aiko | 2027-04-14 | Sunrise | https://seatgeek.com/jhene-aiko-tickets/sunrise-florida-amerant-bank-arena-2027-04-14-7-30-pm/concert/18760709 |
| tm-calvin-harris-2027-montreal-1ad7z_fxfqwzdua5 | Calvin Harris | 2027-04-16 | Montreal | https://seatgeek.com/calvin-harris-tickets/montreal-canada-centre-bell-2027-04-16-8-pm/concert/18674911 |
| tm-cody-johnson-2027-kansas-city-z7r9jz1aaaf8f | Cody Johnson | 2027-04-17 | Kansas City | https://seatgeek.com/cody-johnson-tickets/kansas-city-missouri-t-mobile-center-2027-04-17-7-pm/concert/18773455 |
| tm-travis-tritt-2027-macon-vvg1zz_k1bu6z9 | Travis Tritt | 2027-04-22 | Macon | https://seatgeek.com/travis-tritt-tickets/macon-georgia-macon-city-auditorium-2027-04-22-7-30-pm/concert/18105539 |
| tm-jhene-aiko-2027-houston-z7r9jz1aaa4ay | Jhene Aiko | 2027-04-24 | Houston | https://seatgeek.com/jhene-aiko-tickets/houston-texas-toyota-center-2027-04-24-7-30-pm/concert/18783926 |
| tm-carin-leon-2027-sparks-1avjz_pgkrt9h7o | Carin Leon | 2027-04-24 | Sparks | https://seatgeek.com/carin-leon-tickets/sparks-nevada-nugget-event-center-2027-04-24-7-pm/concert/18782513 |
| tm-alex-warren-2027-madison-z7r9jz1aaaoaw | Alex Warren | 2027-04-25 | Madison | https://seatgeek.com/alex-warren-tickets/madison-wisconsin-kohl-center-2027-04-25-7-45-pm/concert/18773538 |
| tm-jhene-aiko-2027-las-vegas-z7r9jz1aaa41z | Jhene Aiko | 2027-04-30 | Las Vegas | https://seatgeek.com/jhene-aiko-tickets/las-vegas-nevada-t-mobile-arena-2027-04-30-7-30-pm/concert/18783929 |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | Warren Zeiders | 2027-05-01 | Charlotte | https://seatgeek.com/warren-zeiders-tickets/charlotte-north-carolina-coyote-joe-s-charlotte-2027-05-01-7-pm/concert/18649767 |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | Haiden Henderson | 2027-05-14 | San Francisco | https://seatgeek.com/haiden-henderson-tickets/san-francisco-california-brick-and-mortar-music-hall-2027-05-14-8-pm/concert/18809827 |
| tm-jhene-aiko-2027-los-angeles-g5eyz_9ditouk | Jhene Aiko | 2027-05-22 | Los Angeles | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-22-7-30-pm/concert/18841805 |
| tm-megadeth-2027-morrison-z7r9jz1aaa3_o | Megadeth | 2027-05-26 | Morrison | https://seatgeek.com/megadeth-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-26-7-pm/concert/18778371 |
| tm-stray-kids-2027-arlington-z7r9jz1aaaapu | Stray Kids | 2027-06-03 | Arlington | https://seatgeek.com/stray-kids-tickets/arlington-texas-at-t-stadium-2027-06-03-7-30-pm/concert/18633460 |
| tm-megadeth-2027-the-woodlands-g5diz_penjw6e | Megadeth | 2027-06-20 | The Woodlands | https://seatgeek.com/megadeth-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-06-20-7-pm/concert/18778400 |
| tm-stray-kids-2027-baltimore-z7r9jz1aaaapm | Stray Kids | 2027-06-22 | Baltimore | https://seatgeek.com/stray-kids-tickets/baltimore-maryland-m-t-bank-stadium-2027-06-22-7-30-pm/concert/18731347 |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ay | Morgan Wallen | 2027-07-16 | Athens | https://seatgeek.com/morgan-wallen-tickets/athens-georgia-sanford-stadium-2027-07-16-5-30-pm/concert/18760516 |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ke | Morgan Wallen | 2027-07-17 | Athens | https://seatgeek.com/morgan-wallen-tickets/athens-georgia-sanford-stadium-2027-07-17-5-30-pm/concert/18760515 |
| tm-kpop-demon-hunters-2027-los-angeles-z7r9jz1aaaf4w | KPop Demon Hunters | 2027-07-30 | Los Angeles | https://seatgeek.com/kpop-demon-hunters-tickets/los-angeles-california-crypto-com-arena-2027-07-30-7-30-pm/concert/18772706 |
| tm-megadeth-2027-milwaukee-vv17jz_pgkrcmzyk | Megadeth | 2027-09-21 | Milwaukee | https://seatgeek.com/megadeth-tickets/milwaukee-wisconsin-bmo-pavilion-2027-09-21-7-pm/concert/18778422 |
| tm-megadeth-2027-missoula-z7r9jz1aaa3_n | Megadeth | 2027-09-29 | Missoula | https://seatgeek.com/megadeth-tickets/missoula-montana-dahlberg-arena-adams-event-center-2027-09-29-7-pm/concert/18778432 |
| tm-megadeth-2027-spokane-z7r9jz1aaa3_0 | Megadeth | 2027-09-30 | Spokane | https://seatgeek.com/megadeth-tickets/spokane-washington-numerica-veterans-arena-2027-09-30-7-pm/concert/18778434 |
| tm-mat-kearney-2027-pelham-z7r9jz1aaa_at | Mat Kearney | 2027-11-20 | Pelham | https://seatgeek.com/mat-kearney-tickets/pelham-tennessee-the-caverns-2027-11-20-8-pm/concert/18856717 |
| tm-intocable-2026-san-antonio-g5diz_6xnmhis | Intocable | 2026-11-25 | San Antonio | https://seatgeek.com/intocable-tickets/san-antonio-texas-freeman-coliseum-2026-11-25-7-pm/concert/18176233 |
| tm-intocable-2026-fort-worth-vvg1yz_7cpuxpt | Intocable | 2026-11-27 | Fort Worth | https://seatgeek.com/intocable-tickets/fort-worth-texas-ariat-arena-2026-11-27-8-pm/concert/18184627 |
| tm-grace-potter-2026-poughkeepsie-k7vgf_4m5us3r | Grace Potter | 2026-12-03 | Poughkeepsie | https://seatgeek.com/grace-potter-the-nocturnals-tickets/poughkeepsie-new-york-bardavon-opera-house-2026-12-03-7-30-pm/concert/18728149 |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | Luke Bryan | 2026-12-11 | Las Vegas | https://seatgeek.com/luke-bryan-tickets/las-vegas-nevada-allegiant-stadium-2026-12-11-3-30-am/concert/18211763 |
| tm-garth-brooks-2026-minneapolis-z7r9jz1aaaff6 | Garth Brooks | 2026-12-11 | Minneapolis | https://seatgeek.com/garth-brooks-tickets/minneapolis-minnesota-target-center-2026-12-11-8-pm/concert/18747128 |
| tm-missio-2026-spokane-z7r9jz1aazivk | Missio | 2026-12-13 | Spokane | https://seatgeek.com/missio-tickets/spokane-washington-the-district-bar-2026-12-13-7-pm/concert/18856700 |
| tm-victoria-monet-2026-sacramento-g5vyz_3xulwgw | Victoria Monet | 2026-12-16 | Sacramento | https://seatgeek.com/victoria-monet-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-16-8-pm/concert/18579797 |
| tm-lord-huron-2027-oakland-g5vyz_2mrsp3q | Lord Huron | 2027-01-03 | Oakland | https://seatgeek.com/lord-huron-tickets/oakland-california-fox-theater-oakland-2027-01-03-8-pm/concert/18421985 |
| tm-lord-huron-2027-vancouver-1778v0g62bp9vz3 | Lord Huron | 2027-01-05 | Vancouver | https://seatgeek.com/lord-huron-tickets/vancouver-canada-orpheum-theatre-vancouver-2027-01-05-8-pm/concert/18421986 |
| tm-brandi-carlile-2027-seattle-vvg1hz_44goz5b | Brandi Carlile | 2027-01-05 | Seattle | https://seatgeek.com/brandi-carlile-tickets/seattle-washington-paramount-theatre-wa-2027-01-05-8-pm/concert/18723858 |
| tm-lord-huron-2027-vancouver-1778v0g62bpn7yz | Lord Huron | 2027-01-06 | Vancouver | https://seatgeek.com/lord-huron-tickets/vancouver-canada-orpheum-theatre-vancouver-2027-01-06-8-pm/concert/18421991 |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gxf5- | Brandi Carlile | 2027-01-06 | Seattle | https://seatgeek.com/brandi-carlile-tickets/seattle-washington-paramount-theatre-wa-2027-01-06-8-pm/concert/18723857 |
| tm-lord-huron-2027-seattle-vvg1hz_2t-gnc5 | Lord Huron | 2027-01-07 | Seattle | https://seatgeek.com/lord-huron-tickets/seattle-washington-paramount-theatre-wa-2027-01-07-8-pm/concert/18421992 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | Yacht Rock Revue | 2027-01-08 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-08-8-pm/concert/18612961 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | Yacht Rock Revue | 2027-01-09 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-09-8-pm/concert/18612966 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | Yacht Rock Revue | 2027-01-10 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-10-7-pm/concert/18612962 |
| tm-grace-potter-2027-portland-vv1avzk4jgkebfxbx | Grace Potter | 2027-01-15 | Portland | https://seatgeek.com/grace-potter-the-nocturnals-tickets/portland-maine-state-theatre-portland-me-2027-01-15-7-30-pm/concert/18755498 |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | Missio | 2027-01-15 | Minneapolis | https://seatgeek.com/missio-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-01-15-8-pm/concert/18844651 |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Grace Potter | 2027-01-24 | Patchogue | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | Chelsea Cutler | 2027-02-03 | Nashville | https://seatgeek.com/chelsea-cutler-tickets/nashville-tennessee-marathon-music-works-2027-02-03-3-30-am/concert/18639171 |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | Karan Aujla | 2027-02-03 | Dallas | https://seatgeek.com/karan-aujla-tickets/dallas-texas-american-airlines-center-2027-02-03-8-pm/concert/18592287 |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | Tommy Emmanuel | 2027-02-05 | Fairfield | https://seatgeek.com/tommy-emmanuel-tickets/fairfield-connecticut-shu-community-theatre-2027-02-05-8-pm/concert/18858717 |
| tm-garth-brooks-2027-north-little-rock-g5viz_ploilrd | Garth Brooks | 2027-02-05 | North Little Rock | https://seatgeek.com/garth-brooks-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-02-05-8-pm/concert/18758115 |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | Karan Aujla | 2027-02-06 | Washington | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2027-02-06-8-pm/concert/18592289 |
| tm-garth-brooks-2027-north-little-rock-g5viz_plkwtt5 | Garth Brooks | 2027-02-06 | North Little Rock | https://seatgeek.com/garth-brooks-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-02-06-8-pm/concert/18758119 |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | Karan Aujla | 2027-02-08 | New York | https://seatgeek.com/karan-aujla-tickets/new-york-new-york-madison-square-garden-2027-02-08-8-pm/concert/18592288 |
| tm-tame-impala-2027-tulsa-1aozk4jgkexpfxk | Tame Impala | 2027-02-10 | Tulsa | https://seatgeek.com/tame-impala-tickets/tulsa-oklahoma-bok-center-2027-02-10-7-pm/concert/18760897 |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | Karan Aujla | 2027-02-11 | Atlanta | https://seatgeek.com/karan-aujla-tickets/atlanta-georgia-state-farm-arena-1-2027-02-11-8-pm/concert/18592290 |
| tm-missio-2027-washington-z7r9jz1aaziv- | Missio | 2027-02-11 | Washington | https://seatgeek.com/missio-tickets/washington-district-of-columbia-union-stage-2027-02-11-8-pm/concert/18856633 |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | Karan Aujla | 2027-02-19 | Los Angeles | https://seatgeek.com/karan-aujla-tickets/los-angeles-california-crypto-com-arena-2027-02-19-8-pm/concert/18592285 |
| tm-phoebe-bridgers-2027-edmonton-1av7z_pgkm691wt | Phoebe Bridgers | 2027-02-21 | Edmonton | https://seatgeek.com/phoebe-bridgers-tickets/edmonton-canada-rogers-place-2027-02-21-6-30-pm/concert/18785990 |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | Karan Aujla | 2027-02-21 | Sacramento | https://seatgeek.com/karan-aujla-tickets/sacramento-california-golden-1-center-2027-02-21-8-pm/concert/18592286 |
| tm-phoebe-bridgers-2027-winnipeg-1av7z_pgknuq0xy | Phoebe Bridgers | 2027-02-23 | Winnipeg | https://seatgeek.com/phoebe-bridgers-tickets/winnipeg-canada-canada-life-centre-2027-02-23-7-30-pm/concert/18760619 |
| tm-remi-wolf-2027-washington-1a4zk4agkemriif | Remi Wolf | 2027-02-24 | Washington | https://seatgeek.com/remi-wolf-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-24-7-30-pm/concert/18786076 |
| tm-santana-2027-san-francisco-g5vyz_puhzl3h | Santana | 2027-02-25 | San Francisco | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-25-8-pm/concert/18784694 |
| tm-santana-2027-san-francisco-g5vyz_puqth3t | Santana | 2027-02-27 | San Francisco | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-27-8-pm/concert/18784692 |
| tm-intocable-2027-duluth-vvg1zz_pwe5ag0 | Intocable | 2027-02-28 | Duluth | https://seatgeek.com/intocable-tickets/duluth-georgia-gas-south-arena-2027-02-28-7-pm/concert/18780651 |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | Chelsea Cutler | 2027-02-28 | Denver | https://seatgeek.com/chelsea-cutler-tickets/denver-colorado-mission-ballroom-2027-02-28-3-30-am/concert/18639200 |
| tm-santana-2027-san-francisco-g5vyz_puqx53g | Santana | 2027-02-28 | San Francisco | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-28-8-pm/concert/18784696 |
| tm-grace-potter-2027-tucson-1a_zk4jgkdj3ibg | Grace Potter | 2027-03-04 | Tucson | https://seatgeek.com/grace-potter-the-nocturnals-tickets/tucson-arizona-rialto-theatre-2027-03-04-8-pm/concert/18755548 |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Dinosaur Jr. | 2027-03-05 | Chicago | https://seatgeek.com/dinosaur-jr-tickets/chicago-illinois-the-wip-theater-2027-03-05-7-30-pm/concert/18666384 |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | Chelsea Cutler | 2027-03-06 | San Francisco | https://seatgeek.com/chelsea-cutler-tickets/san-francisco-california-the-midway-sf-2027-03-06-3-30-am/concert/18639205 |
| tm-hannah-harper-2027-richmond-z7r9jz1aaa_qa | Hannah Harper | 2027-03-07 | Richmond | https://seatgeek.com/hannah-harper-tickets/richmond-virginia-carpenter-theatre-at-dominion-energy-center-2027-03-07-8-pm/concert/18773760 |
| tm-grace-potter-2027-san-francisco-g5vyz_php4sdr | Grace Potter | 2027-03-11 | San Francisco | https://seatgeek.com/grace-potter-the-nocturnals-tickets/san-francisco-california-the-fillmore-san-francisco-2027-03-11-8-pm/concert/18755560 |
| tm-cody-johnson-2027-albany-k7vgf_4nhl9nn | Cody Johnson | 2027-03-13 | Albany | https://seatgeek.com/cody-johnson-tickets/albany-new-york-mvp-arena-2027-03-13-7-pm/concert/18773452 |
| tm-missio-2027-nashville-z7r9jz1aazivj | Missio | 2027-03-14 | Nashville | https://seatgeek.com/missio-tickets/nashville-tennessee-the-end-2027-03-14-7-30-pm/concert/18846259 |
| tm-phoebe-bridgers-2027-newark-vv1kfz_9vyg7cw_y | Phoebe Bridgers | 2027-03-17 | Newark | https://seatgeek.com/phoebe-bridgers-tickets/newark-new-jersey-prudential-center-2027-03-17-7-30-pm/concert/18784688 |
| tm-phoebe-bridgers-2027-university-park-vv1aovp_uga2cx87 | Phoebe Bridgers | 2027-03-19 | University Park | https://seatgeek.com/phoebe-bridgers-tickets/university-park-pennsylvania-bryce-jordan-center-2027-03-19-7-30-pm/concert/18760641 |
| tm-intocable-2027-san-jose-g5vyz_pi39fpd | Intocable | 2027-03-19 | San Jose | https://seatgeek.com/intocable-tickets/san-jose-california-sap-center-at-san-jose-2027-03-19-8-pm/concert/18780588 |
| tm-cody-johnson-2027-fargo-vv1akzk4fgkejxfzw | Cody Johnson | 2027-03-20 | Fargo | https://seatgeek.com/cody-johnson-tickets/fargo-north-dakota-fargodome-2027-03-20-7-pm/concert/18773454 |
| tm-grace-potter-2027-bozeman-g5vzz_pprxf60 | Grace Potter | 2027-03-20 | Bozeman | https://seatgeek.com/grace-potter-the-nocturnals-tickets/bozeman-montana-the-elm-1-2027-03-20-8-pm/concert/18755573 |
| tm-rod-stewart-2027-lexington-1avbz_pgkw52aaz | Rod Stewart | 2027-03-21 | Lexington | https://seatgeek.com/rod-stewart-tickets/lexington-kentucky-rupp-arena-2027-03-21-6-30-pm/concert/18780590 |
| tm-grace-potter-2027-spokane-g5vzz_penguiq | Grace Potter | 2027-03-22 | Spokane | https://seatgeek.com/grace-potter-the-nocturnals-tickets/spokane-washington-knitting-factory-spokane-2027-03-22-7-30-pm/concert/18755575 |
| tm-phoebe-bridgers-2027-montreal-1aszk4jgkd6dpxr | Phoebe Bridgers | 2027-03-23 | Montreal | https://seatgeek.com/phoebe-bridgers-tickets/montreal-canada-centre-bell-2027-03-23-7-30-pm/concert/18760651 |
| tm-santana-2027-pittsburgh-1avbz_pgkmfvkd9 | Santana | 2027-03-29 | Pittsburgh | https://seatgeek.com/santana-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-29-8-pm/concert/18784704 |
| tm-air-supply-2027-indianapolis-vv17fz_pgkskhuw1 | Air Supply | 2027-04-03 | Indianapolis | https://seatgeek.com/air-supply-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-03-7-pm/concert/18782016 |
| tm-cody-johnson-2027-charlottesville-vv1avzk4ngkde3rwt | Cody Johnson | 2027-04-03 | Charlottesville | https://seatgeek.com/cody-johnson-tickets/charlottesville-virginia-john-paul-jones-arena-2027-04-03-7-pm/concert/18773453 |
| tm-billy-strings-2027-tampa-vvg1vz_pkwq5nj | Billy Strings | 2027-04-06 | Tampa | https://seatgeek.com/billy-strings-tickets/tampa-florida-benchmark-international-arena-2027-04-06-7-30-pm/concert/18755184 |
| tm-alex-warren-2027-north-little-rock-g5viz_pi6umuc | Alex Warren | 2027-04-06 | North Little Rock | https://seatgeek.com/alex-warren-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-06-7-30-pm/concert/18773519 |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | Missio | 2027-04-09 | San Antonio | https://seatgeek.com/missio-tickets/san-antonio-texas-vibes-event-center-2027-04-09-7-pm/concert/18853293 |
| tm-santana-2027-verona-k7vgf_psngfze | Santana | 2027-04-09 | Verona | https://seatgeek.com/santana-tickets/verona-new-york-the-event-center-at-turning-stone-resort-casino-2027-04-09-8-pm/concert/18784715 |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | Haiden Henderson | 2027-04-13 | Nashville | https://seatgeek.com/haiden-henderson-tickets/nashville-tennessee-the-basement-east-2027-04-13-8-pm/concert/18850714 |
| tm-alex-warren-2027-knoxville-g5viz_pcmddpz | Alex Warren | 2027-04-15 | Knoxville | https://seatgeek.com/alex-warren-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-15-7-30-pm/concert/18773526 |
| tm-alex-warren-2027-louisville-1avbz_pgkm-pfx2 | Alex Warren | 2027-04-16 | Louisville | https://seatgeek.com/alex-warren-tickets/louisville-kentucky-kfc-yum-center-2027-04-16-7-30-pm/concert/18773527 |
| tm-billy-strings-2027-north-charleston-g5evz_pjcaeyp | Billy Strings | 2027-04-17 | North Charleston | https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-17-7-30-pm/concert/18755189 |
| tm-billy-strings-2027-greenville-g5evz_perum8k | Billy Strings | 2027-04-21 | Greenville | https://seatgeek.com/billy-strings-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-04-21-7-30-pm/concert/18755188 |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | Mei Semones | 2027-04-21 | San Diego | https://seatgeek.com/mei-semones-tickets/san-diego-california-music-box-san-diego-2027-04-21-8-pm/concert/18844674 |
| tm-alex-warren-2027-winnipeg-1av7z_pgkwqqal2 | Alex Warren | 2027-04-23 | Winnipeg | https://seatgeek.com/alex-warren-tickets/winnipeg-canada-canada-life-centre-2027-04-23-7-30-pm/concert/18773537 |
| tm-alex-warren-2027-grand-rapids-vv17oz_pgkrvt515 | Alex Warren | 2027-04-26 | Grand Rapids | https://seatgeek.com/alex-warren-tickets/grand-rapids-michigan-van-andel-arena-2027-04-26-7-30-pm/concert/18773541 |
| tm-alex-warren-2027-columbus-vv17fz_pgkrmanar | Alex Warren | 2027-04-28 | Columbus | https://seatgeek.com/alex-warren-tickets/columbus-ohio-nationwide-arena-2027-04-28-7-30-pm/concert/18773543 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Psychedelic Furs | 2027-04-28 | Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-remi-wolf-2027-berkeley-g5vyz_pmrwpif | Remi Wolf | 2027-04-30 | Berkeley | https://seatgeek.com/remi-wolf-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-04-30-8-pm/concert/18785269 |
| tm-cody-johnson-2027-evansville-vv1aazk4ngkd4mac1 | Cody Johnson | 2027-05-01 | Evansville | https://seatgeek.com/cody-johnson-tickets/evansville-indiana-ford-center-in-2027-05-01-7-pm/concert/18773456 |
| tm-foreigner-2027-uncasville-g5vvz_pubgaoy | Foreigner | 2027-05-01 | Uncasville | https://seatgeek.com/foreigner-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-01-8-pm/concert/18780602 |
| tm-alex-warren-2027-quebec-1ad7z_pgkmtnafk | Alex Warren | 2027-05-02 | Quebec | https://seatgeek.com/alex-warren-tickets/quebec-canada-videotron-centre-2027-05-02-7-30-pm/concert/18773549 |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | Haiden Henderson | 2027-05-02 | Minneapolis | https://seatgeek.com/haiden-henderson-tickets/minneapolis-minnesota-7th-street-entry-2027-05-02-8-pm/concert/18847838 |
| tm-alex-warren-2027-albany-k7vgf_prpg3o4 | Alex Warren | 2027-05-04 | Albany | https://seatgeek.com/alex-warren-tickets/albany-new-york-mvp-arena-2027-05-04-7-30-pm/concert/18773550 |
| tm-alex-warren-2027-baltimore-1avfz_pgkrfpurm | Alex Warren | 2027-05-07 | Baltimore | https://seatgeek.com/alex-warren-tickets/baltimore-maryland-cfg-bank-arena-2027-05-07-7-45-pm/concert/18773555 |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | Too Many Zooz | 2027-05-07 | San Diego | https://seatgeek.com/too-many-zooz-tickets/san-diego-california-music-box-san-diego-2027-05-07-9-pm/concert/18844643 |
| tm-alex-warren-2027-uncasville-g5vvz_piu1phv | Alex Warren | 2027-05-08 | Uncasville | https://seatgeek.com/alex-warren-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-08-7-30-pm/concert/18773556 |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | Meshuggah | 2027-05-11 | Greensboro | https://seatgeek.com/meshuggah-tickets/greensboro-north-carolina-special-events-center-at-greensboro-coliseum-complex-2027-05-11-7-pm/concert/18724694 |
| tm-alex-warren-2027-raleigh-g5evz_pmr-wuh | Alex Warren | 2027-05-11 | Raleigh | https://seatgeek.com/alex-warren-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-05-11-7-40-pm/concert/18773557 |
| tm-alex-warren-2027-charleston-g5evz_pwy4cww | Alex Warren | 2027-05-12 | Charleston | https://seatgeek.com/alex-warren-tickets/charleston-south-carolina-credit-one-stadium-2027-05-12-7-30-pm/concert/18773559 |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | Haiden Henderson | 2027-05-12 | Portland | https://seatgeek.com/haiden-henderson-tickets/portland-oregon-hawthorne-theatre-2027-05-12-8-pm/concert/18694629 |
| tm-alex-warren-2027-noblesville-vv17fz_pgkmuvbx2 | Alex Warren | 2027-05-14 | Noblesville | https://seatgeek.com/alex-warren-tickets/noblesville-indiana-ruoff-music-center-2027-05-14-7-30-pm/concert/18773562 |
| tm-travis-tritt-2027-northfield-vv1kfz_pfzg7zdfa | Travis Tritt | 2027-05-14 | Northfield | https://seatgeek.com/travis-tritt-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-14-8-pm/concert/18757257 |
| tm-megadeth-2027-albuquerque-g5vzz_pwxigv1 | Megadeth | 2027-05-14 | Albuquerque | https://seatgeek.com/megadeth-tickets/albuquerque-new-mexico-first-financial-credit-union-amphitheater-2027-05-14-7-pm/concert/18778362 |
| tm-alex-warren-2027-birmingham-1aezz_pgkmbd7bp | Alex Warren | 2027-05-16 | Birmingham | https://seatgeek.com/alex-warren-tickets/birmingham-alabama-coca-cola-amphitheater-2027-05-16-7-30-pm/concert/18773565 |
| tm-a-perfect-circle-2027-elizabethtown-1avbz_pgkucnyj0 | A Perfect Circle | 2027-05-19 | Elizabethtown | https://seatgeek.com/a-perfect-circle-tickets/elizabethtown-kentucky-steelgrove-amphitheater-2027-05-19-7-pm/concert/18784729 |
| tm-megadeth-2027-ridgefield-vvg1hz_pj4m0zq | Megadeth | 2027-05-21 | Ridgefield | https://seatgeek.com/megadeth-tickets/ridgefield-washington-cascades-amphitheater-2027-05-21-7-pm/concert/18778363 |
| tm-jhene-aiko-2027-los-angeles-g5eyz_pusyoov | Jhene Aiko | 2027-05-21 | Los Angeles | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-21-7-30-pm/concert/18783918 |
| tm-travis-tritt-2027-charles-town-1a4zk4ngkdpzfky | Travis Tritt | 2027-05-22 | Charles Town | https://seatgeek.com/travis-tritt-tickets/charles-town-west-virginia-hollywood-casino-at-charles-town-races-2027-05-22-7-pm/concert/18756742 |
| tm-megadeth-2027-auburn-vvg1hz_ph-ktdl | Megadeth | 2027-05-22 | Auburn | https://seatgeek.com/megadeth-tickets/auburn-washington-white-river-amphitheatre-2027-05-22-7-pm/concert/18778359 |
| tm-megadeth-2027-tinley-park-vv1a7zk4tgkdt6btl | Megadeth | 2027-05-28 | Tinley Park | https://seatgeek.com/megadeth-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-05-28-7-pm/concert/18778375 |
| tm-megadeth-2027-grand-rapids-vv17oz_pgkmgtnqb | Megadeth | 2027-06-02 | Grand Rapids | https://seatgeek.com/megadeth-tickets/grand-rapids-michigan-acrisure-amphitheater-2027-06-02-7-pm/concert/18778377 |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5-7_e | Billy Strings | 2027-06-04 | Birmingham | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-04-7-30-pm/concert/18755199 |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5x7_7 | Billy Strings | 2027-06-05 | Birmingham | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-05-7-30-pm/concert/18755203 |
| tm-megadeth-2027-charlotte-g5evz_pjm1iz7 | Megadeth | 2027-06-17 | Charlotte | https://seatgeek.com/megadeth-tickets/charlotte-north-carolina-truliant-amphitheater-2027-06-17-7-pm/concert/18778393 |
| tm-kpop-demon-hunters-2027-sunrise-z7r9jz1aaa4-e | KPop Demon Hunters | 2027-07-14 | Sunrise | https://seatgeek.com/kpop-demon-hunters-tickets/sunrise-florida-amerant-bank-arena-2027-07-14-7-30-pm/concert/18744717 |
| tm-foreigner-2027-bangor-vv177z_pgkzwgr47 | Foreigner | 2027-07-16 | Bangor | https://seatgeek.com/foreigner-tickets/bangor-maine-maine-savings-amphitheater-2027-07-16-7-pm/concert/18778525 |
| tm-travis-tritt-2027-bossier-city-g5viz_p2n3lzw | Travis Tritt | 2027-07-16 | Bossier City | https://seatgeek.com/travis-tritt-tickets/bossier-city-louisiana-horseshoe-casino-riverdome-2027-07-16-8-pm/concert/18756251 |
| tm-foreigner-2027-bethel-k7vgf_ps6zwby | Foreigner | 2027-07-18 | Bethel | https://seatgeek.com/foreigner-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-18-7-pm/concert/18778526 |
| tm-hannah-harper-2027-effingham-vv1kjz_p3eg7ds0b | Hannah Harper | 2027-07-30 | Effingham | https://seatgeek.com/hannah-harper-tickets/effingham-illinois-effingham-performance-center-2027-07-30-7-pm/concert/18754536 |
| tm-kpop-demon-hunters-2027-oakland-z7r9jz1aaa_ff | KPop Demon Hunters | 2027-08-10 | Oakland | https://seatgeek.com/kpop-demon-hunters-tickets/oakland-california-oakland-arena-2027-08-10-7-30-pm/concert/18772716 |
| tm-kpop-demon-hunters-2027-oakland-z7r9jz1aaa_fa | KPop Demon Hunters | 2027-08-11 | Oakland | https://seatgeek.com/kpop-demon-hunters-tickets/oakland-california-oakland-arena-2027-08-11-7-30-pm/concert/18772717 |
| tm-megadeth-2027-north-little-rock-g5viz_pnjetpo | Megadeth | 2027-09-06 | North Little Rock | https://seatgeek.com/megadeth-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-09-06-7-pm/concert/18778408 |
| tm-megadeth-2027-biloxi-g5viz_plz_cl1 | Megadeth | 2027-09-07 | Biloxi | https://seatgeek.com/megadeth-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-09-07-7-pm/concert/18778407 |
| tm-megadeth-2027-virginia-beach-vv177z_pgkl4llwn | Megadeth | 2027-09-11 | Virginia Beach | https://seatgeek.com/megadeth-tickets/virginia-beach-virginia-veterans-united-home-loans-amphitheater-at-virginia-beach-2027-09-11-7-pm/concert/18778409 |
| tm-megadeth-2027-allentown-1adzz_pgkmxuggq | Megadeth | 2027-09-12 | Allentown | https://seatgeek.com/megadeth-tickets/allentown-pennsylvania-ppl-center-2027-09-12-7-pm/concert/18778410 |
| tm-megadeth-2027-laval-1ad7z_pgkmil4lx | Megadeth | 2027-09-14 | Laval | https://seatgeek.com/megadeth-tickets/laval-canada-place-bell-2027-09-14-7-pm/concert/18782651 |
| tm-megadeth-2027-toledo-vv1afzk4tgkdzzv33 | Megadeth | 2027-09-18 | Toledo | https://seatgeek.com/megadeth-tickets/toledo-ohio-huntington-center-2027-09-18-7-pm/concert/18778418 |
| tm-megadeth-2027-columbus-vv17fz_pgksfzclm | Megadeth | 2027-09-19 | Columbus | https://seatgeek.com/megadeth-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-09-19-7-pm/concert/18778420 |
| tm-megadeth-2027-fargo-vv1kvovpq_ga53kds | Megadeth | 2027-09-22 | Fargo | https://seatgeek.com/megadeth-tickets/fargo-north-dakota-fargodome-2027-09-22-7-pm/concert/18778421 |
| tm-megadeth-2027-lincoln-vv17bz_pgkmwzqwq | Megadeth | 2027-09-24 | Lincoln | https://seatgeek.com/megadeth-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-09-24-7-pm/concert/18778423 |
| tm-megadeth-2027-wichita-vv17bz_pgkr9vwea | Megadeth | 2027-09-25 | Wichita | https://seatgeek.com/megadeth-tickets/wichita-kansas-intrust-bank-arena-2027-09-25-7-pm/concert/18778424 |
| tm-travis-tritt-2027-lake-charles-z7r9jz1aaaajp | Travis Tritt | 2027-10-09 | Lake Charles | https://seatgeek.com/travis-tritt-tickets/lake-charles-louisiana-grand-event-center-golden-nugget-lake-charles-2027-10-09-8-pm/concert/18854687 |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | Mat Kearney | 2027-11-08 | Shipshewana | https://seatgeek.com/mat-kearney-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2027-11-08-7-30-pm/concert/18857823 |
| tm-mat-kearney-2027-carmel-z7r9jz1aaa_49 | Mat Kearney | 2027-11-14 | Carmel | https://seatgeek.com/mat-kearney-tickets/carmel-indiana-the-palladium-at-allied-solutions-center-for-the-performing-arts-2027-11-14-7-30-pm/concert/18848387 |
| tm-billy-strings-2026-new-orleans-g5viz_6n0bmge | Billy Strings | 2026-12-05 | New Orleans | https://seatgeek.com/billy-strings-tickets/new-orleans-louisiana-smoothie-king-center-2026-12-05-7-30-pm/concert/18155651 |
| tm-grace-potter-2027-boston-vv1avzk4pgkd0q4bh | Grace Potter | 2027-01-16 | Boston | https://seatgeek.com/grace-potter-the-nocturnals-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-01-16-7-30-pm/concert/18755497 |
| tm-grace-potter-2027-rochester-k7vgf_peejxna | Grace Potter | 2027-01-21 | Rochester | https://seatgeek.com/grace-potter-the-nocturnals-tickets/rochester-new-york-kodak-center-2027-01-21-7-30-pm/concert/18755499 |
| tm-grace-potter-2027-new-york-g5diz_pqp7kdd | Grace Potter | 2027-01-23 | New York | https://seatgeek.com/grace-potter-the-nocturnals-tickets/new-york-new-york-beacon-theatre-2027-01-23-8-pm/concert/18755507 |
| tm-grace-potter-2027-des-moines-vv1akzk4jgkd-akup | Grace Potter | 2027-02-13 | Des Moines | https://seatgeek.com/grace-potter-the-nocturnals-tickets/des-moines-iowa-hoyt-sherman-place-2027-02-13-8-pm/concert/18755536 |
| tm-phoebe-bridgers-2027-portland-vvg1hz_pjbo4da | Phoebe Bridgers | 2027-02-17 | Portland | https://seatgeek.com/phoebe-bridgers-tickets/portland-oregon-moda-center-2027-02-17-7-30-pm/concert/18760617 |
| tm-intocable-2027-chicago-vv178z_pgkrpyrnn | Intocable | 2027-02-20 | Chicago | https://seatgeek.com/intocable-tickets/chicago-illinois-credit-union-1-arena-at-uic-2027-02-20-8-pm/concert/18780707 |
| tm-grace-potter-2027-denver-g5vzz_phlm6bi | Grace Potter | 2027-02-27 | Denver | https://seatgeek.com/grace-potter-the-nocturnals-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-27-7-30-pm/concert/18755540 |
| tm-phoebe-bridgers-2027-milwaukee-vv1kjz_pjpg7y3tm | Phoebe Bridgers | 2027-03-04 | Milwaukee | https://seatgeek.com/phoebe-bridgers-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-04-7-30-pm/concert/18760629 |
| tm-intocable-2027-fresno-g5vyz_pmjs49u | Intocable | 2027-03-05 | Fresno | https://seatgeek.com/intocable-tickets/fresno-california-save-mart-center-2027-03-05-8-pm/concert/18780589 |
| tm-intocable-2027-inglewood-vv170z_pgkrollqf | Intocable | 2027-03-06 | Inglewood | https://seatgeek.com/intocable-tickets/inglewood-california-intuit-dome-2027-03-06-8-pm/concert/18782990 |
| tm-grace-potter-2027-phoenix-1a_zk4jgkdkzmdr | Grace Potter | 2027-03-07 | Phoenix | https://seatgeek.com/grace-potter-the-nocturnals-tickets/phoenix-arizona-the-van-buren-2027-03-07-7-30-pm/concert/18755552 |
| tm-phoebe-bridgers-2027-raleigh-g5evz_pekwioi | Phoebe Bridgers | 2027-03-09 | Raleigh | https://seatgeek.com/phoebe-bridgers-tickets/raleigh-north-carolina-lenovo-center-2027-03-09-7-30-pm/concert/18760632 |
| tm-phoebe-bridgers-2027-baltimore-1a4zk4jgkdbmyfh | Phoebe Bridgers | 2027-03-10 | Baltimore | https://seatgeek.com/phoebe-bridgers-tickets/baltimore-maryland-cfg-bank-arena-2027-03-10-7-30-pm/concert/18760637 |
| tm-phoebe-bridgers-2027-pittsburgh-1kaovpqdgaugc_p | Phoebe Bridgers | 2027-03-12 | Pittsburgh | https://seatgeek.com/phoebe-bridgers-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-12-7-30-pm/concert/18760633 |
| tm-jhene-aiko-2027-minneapolis-vv17bz_pgkm4rom4 | Jhene Aiko | 2027-03-12 | Minneapolis | https://seatgeek.com/jhene-aiko-tickets/minneapolis-minnesota-target-center-2027-03-12-7-30-pm/concert/18783860 |
| tm-jhene-aiko-2027-milwaukee-vv17jz_pgkuxx_4x | Jhene Aiko | 2027-03-13 | Milwaukee | https://seatgeek.com/jhene-aiko-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-13-7-30-pm/concert/18783857 |
| tm-grace-potter-2027-napa-g5vyz_ppqswad | Grace Potter | 2027-03-13 | Napa | https://seatgeek.com/grace-potter-the-nocturnals-tickets/napa-california-uptown-theatre-napa-2027-03-13-7-pm/concert/18755562 |
| tm-jhene-aiko-2027-kansas-city-vv17bz_pgkmduzpp | Jhene Aiko | 2027-03-15 | Kansas City | https://seatgeek.com/jhene-aiko-tickets/kansas-city-missouri-t-mobile-center-2027-03-15-7-30-pm/concert/18783859 |
| tm-jhene-aiko-2027-columbus-vv17fz_pgkmwl1_h | Jhene Aiko | 2027-03-18 | Columbus | https://seatgeek.com/jhene-aiko-tickets/columbus-ohio-nationwide-arena-2027-03-18-7-30-pm/concert/18783858 |
| tm-jhene-aiko-2027-buffalo-k7vgf_pm2cxpu | Jhene Aiko | 2027-03-19 | Buffalo | https://seatgeek.com/jhene-aiko-tickets/buffalo-new-york-keybank-center-2027-03-19-7-30-pm/concert/18783862 |
| tm-jhene-aiko-2027-chicago-vv178z_pgkm4m_1r | Jhene Aiko | 2027-03-21 | Chicago | https://seatgeek.com/jhene-aiko-tickets/chicago-illinois-united-center-2027-03-21-7-30-pm/concert/18783869 |
| tm-jhene-aiko-2027-detroit-vv17oz_pgkwjgvk2 | Jhene Aiko | 2027-03-22 | Detroit | https://seatgeek.com/jhene-aiko-tickets/detroit-michigan-little-caesars-arena-2027-03-22-7-30-pm/concert/18783871 |
| tm-jhene-aiko-2027-brooklyn-1adzz_pgkwqo0e1 | Jhene Aiko | 2027-03-26 | Brooklyn | https://seatgeek.com/jhene-aiko-tickets/brooklyn-new-york-barclays-center-2027-03-26-7-30-pm/concert/18783873 |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | 2027-03-26 | Hollywood | https://seatgeek.com/warren-zeiders-tickets/hollywood-florida-daer-nightclub-at-the-seminole-hard-rock-hotel-casino-2027-03-26-7-pm/concert/18649740 |
| tm-jhene-aiko-2027-boston-vv177z_pgkm0b_wn | Jhene Aiko | 2027-03-27 | Boston | https://seatgeek.com/jhene-aiko-tickets/boston-massachusetts-td-garden-2027-03-27-7-30-pm/concert/18783874 |
| tm-santana-2027-bethlehem-vv17fz_pgkmh0npz | Santana | 2027-03-27 | Bethlehem | https://seatgeek.com/santana-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-03-27-8-pm/concert/18784697 |
| tm-jhene-aiko-2027-pittsburgh-1avbz_pgkuj2euk | Jhene Aiko | 2027-03-29 | Pittsburgh | https://seatgeek.com/jhene-aiko-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-29-7-30-pm/concert/18783876 |
| tm-jhene-aiko-2027-washington-1avfz_pgkirkqcv | Jhene Aiko | 2027-04-01 | Washington | https://seatgeek.com/jhene-aiko-tickets/washington-district-of-columbia-capital-one-arena-2027-04-01-7-30-pm/concert/18783878 |
| tm-jhene-aiko-2027-newark-vv17fz_pgksjk0ub | Jhene Aiko | 2027-04-02 | Newark | https://seatgeek.com/jhene-aiko-tickets/newark-new-jersey-prudential-center-2027-04-02-7-30-pm/concert/18783880 |
| tm-jhene-aiko-2027-philadelphia-1adzz_pgkmceakj | Jhene Aiko | 2027-04-03 | Philadelphia | https://seatgeek.com/jhene-aiko-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-04-03-7-30-pm/concert/18783883 |
| tm-santana-2027-boston-vv1avzk4tgkeo56zw | Santana | 2027-04-03 | Boston | https://seatgeek.com/santana-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-03-8-pm/concert/18784709 |
| tm-santana-2027-uncasville-g5vvz_9dli7ln | Santana | 2027-04-04 | Uncasville | https://seatgeek.com/santana-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-04-7-30-pm/concert/18784710 |
| tm-jhene-aiko-2027-columbia-g5evz_py95t01 | Jhene Aiko | 2027-04-05 | Columbia | https://seatgeek.com/jhene-aiko-tickets/columbia-south-carolina-colonial-life-arena-2027-04-05-7-30-pm/concert/18783885 |
| tm-santana-2027-new-york-g5dyz_prxuxs3 | Santana | 2027-04-06 | New York | https://seatgeek.com/santana-tickets/new-york-new-york-radio-city-music-hall-2027-04-06-8-pm/concert/18784714 |
| tm-jhene-aiko-2027-charlotte-g5evz_pdpjkpz | Jhene Aiko | 2027-04-07 | Charlotte | https://seatgeek.com/jhene-aiko-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-07-7-30-pm/concert/18783887 |
| tm-jhene-aiko-2027-raleigh-g5evz_9engbxl | Jhene Aiko | 2027-04-08 | Raleigh | https://seatgeek.com/jhene-aiko-tickets/raleigh-north-carolina-lenovo-center-2027-04-08-7-30-pm/concert/18783890 |
| tm-jhene-aiko-2027-atlanta-vvg1zz_puzair5 | Jhene Aiko | 2027-04-10 | Atlanta | https://seatgeek.com/jhene-aiko-tickets/atlanta-georgia-state-farm-arena-1-2027-04-10-7-30-pm/concert/18783889 |
| tm-santana-2027-atlantic-city-vv17fz_pgkwmc5tp | Santana | 2027-04-10 | Atlantic City | https://seatgeek.com/santana-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-10-8-pm/concert/18784720 |
| tm-jhene-aiko-2027-orlando-1kfovpjagau4wx9 | Jhene Aiko | 2027-04-12 | Orlando | https://seatgeek.com/jhene-aiko-tickets/orlando-florida-kia-center-2027-04-12-7-30-pm/concert/18783893 |
| tm-sam-fender-2027-morrison-z7r9jz1aaaaoe | Sam Fender | 2027-04-29 | Morrison | https://seatgeek.com/sam-fender-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-29-8-pm/concert/18760802 |
| tm-carly-rae-jepsen-2027-irving-vvg1yz_kwbaerl | Carly Rae Jepsen | 2027-05-05 | Irving | https://seatgeek.com/carly-rae-jepsen-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-05-7-30-pm/concert/18639025 |
| tm-def-leppard-2027-san-francisco-g5vyz_f5oof-x | Def Leppard | 2027-05-05 | San Francisco | https://seatgeek.com/def-leppard-tickets/san-francisco-california-chase-center-2027-05-05-7-pm/concert/18662417 |
| tm-meshuggah-2027-atlanta-vvg1zz_4ptwc-- | Meshuggah | 2027-05-07 | Atlanta | https://seatgeek.com/meshuggah-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-07-7-pm/concert/18724693 |
| tm-remi-wolf-2027-houston-g5diz_f9ubux3 | Remi Wolf | 2027-05-07 | Houston | https://seatgeek.com/remi-wolf-tickets/houston-texas-713-music-hall-2027-05-07-8-pm/concert/18664782 |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | Def Leppard | 2027-05-07 | Sacramento | https://seatgeek.com/def-leppard-tickets/sacramento-california-golden-1-center-2027-05-07-7-pm/concert/18662420 |
| tm-calvin-harris-2027-oakland-g5vyz_fh6tm8u | Calvin Harris | 2027-05-07 | Oakland | https://seatgeek.com/calvin-harris-tickets/oakland-california-oakland-arena-2027-05-07-7-30-pm/concert/18674847 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd | John Mayer | 2027-05-07 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-07-8-pm/concert/18659139 |
| tm-kings-of-leon-2027-bristow-1ka8vp__gaurfu5 | Kings Of Leon | 2027-05-08 | Bristow | https://seatgeek.com/kings-of-leon-tickets/bristow-virginia-jiffy-lube-live-2027-05-08-7-30-pm/concert/18746638 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwfa | John Mayer | 2027-05-08 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-08-8-pm/concert/18659118 |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | Def Leppard | 2027-05-09 | Seattle | https://seatgeek.com/def-leppard-tickets/seattle-washington-climate-pledge-arena-2027-05-09-7-pm/concert/18662421 |
| tm-noah-kahan-2027-houston-g5diz_4wkxf3f | Noah Kahan | 2027-05-12 | Houston | https://seatgeek.com/noah-kahan-tickets/houston-texas-reliant-stadium-2027-05-12-6-30-pm/concert/18728704 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwf6 | John Mayer | 2027-05-12 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-12-8-pm/concert/18659120 |
| tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw | Jhene Aiko | 2027-05-13 | Seattle | https://seatgeek.com/jhene-aiko-tickets/seattle-washington-climate-pledge-arena-2027-05-13-7-30-pm/concert/18783915 |
| tm-kings-of-leon-2027-cuyahoga-falls-vv16azk4nouzac7agu | Kings Of Leon | 2027-05-14 | Cuyahoga Falls | https://seatgeek.com/kings-of-leon-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-14-7-30-pm/concert/18746642 |
| tm-interpol-2027-los-angeles-vvg1iz_pmocxuu | Interpol | 2027-05-14 | Los Angeles | https://seatgeek.com/interpol-tickets/los-angeles-california-bmo-stadium-2027-05-14-6-pm/concert/18780190 |
| tm-calvin-harris-2027-seattle-vvg1hz_fjlgmb1 | Calvin Harris | 2027-05-14 | Seattle | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-14-8-pm/concert/18674849 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zufa | John Mayer | 2027-05-14 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-14-8-pm/concert/18659129 |
| tm-megadeth-2027-phoenix-1av0z_pgknttpbb | Megadeth | 2027-05-15 | Phoenix | https://seatgeek.com/megadeth-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-05-15-7-pm/concert/18778361 |
| tm-jhene-aiko-2027-vancouver-1av7z_pgkwqspc7 | Jhene Aiko | 2027-05-15 | Vancouver | https://seatgeek.com/jhene-aiko-tickets/vancouver-canada-rogers-arena-2027-05-15-7-30-pm/concert/18783923 |
| tm-calvin-harris-2027-seattle-vvg1hz_48c3k9c | Calvin Harris | 2027-05-15 | Seattle | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-15-8-pm/concert/18708080 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqf5 | John Mayer | 2027-05-15 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-15-8-pm/concert/18659130 |
| tm-queens-of-the-stone-age-2027-rosemont-vv1kvzvpfygacy0ah | Queens Of The Stone Age | 2027-05-16 | Rosemont | https://seatgeek.com/queens-of-the-stone-age-tickets/rosemont-illinois-allstate-arena-2027-05-16-6-30-pm/concert/18709223 |
| tm-two-door-cinema-club-2027-seattle-vvg1hz_4ppr1wj | Two Door Cinema Club | 2027-05-17 | Seattle | https://seatgeek.com/two-door-cinema-club-tickets/seattle-washington-paramount-theatre-wa-2027-05-17-7-30-pm/concert/18711331 |
| tm-queens-of-the-stone-age-2027-indianapolis-vv1aazk4fgkd2j1lw | Queens Of The Stone Age | 2027-05-18 | Indianapolis | https://seatgeek.com/queens-of-the-stone-age-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-18-6-30-pm/concert/18709226 |
| tm-megadeth-2027-chula-vista-vvg1iz_pjb5pwc | Megadeth | 2027-05-18 | Chula Vista | https://seatgeek.com/megadeth-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-05-18-7-pm/concert/18778358 |
| tm-queens-of-the-stone-age-2027-columbus-vv1kv8vp4agacm7ii | Queens Of The Stone Age | 2027-05-19 | Columbus | https://seatgeek.com/queens-of-the-stone-age-tickets/columbus-ohio-nationwide-arena-2027-05-19-6-30-pm/concert/18709227 |
| tm-megadeth-2027-inglewood-vv16azk4ev7zauakk1 | Megadeth | 2027-05-19 | Inglewood | https://seatgeek.com/megadeth-tickets/inglewood-california-kia-forum-2027-05-19-7-pm/concert/18778360 |
| tm-two-door-cinema-club-2027-sacramento-g5vyz_46svaa8 | Two Door Cinema Club | 2027-05-19 | Sacramento | https://seatgeek.com/two-door-cinema-club-tickets/sacramento-california-channel-24-sacramento-2027-05-19-8-pm/concert/18711334 |
| tm-calvin-harris-2027-anaheim-vv1aazk44gkdgr8bi | Calvin Harris | 2027-05-20 | Anaheim | https://seatgeek.com/calvin-harris-tickets/anaheim-california-honda-center-2027-05-20-8-pm/concert/18709501 |
| tm-two-door-cinema-club-2027-oakland-g5vyz_48x4wje | Two Door Cinema Club | 2027-05-20 | Oakland | https://seatgeek.com/two-door-cinema-club-tickets/oakland-california-fox-theater-oakland-2027-05-20-8-pm/concert/18711335 |
| tm-noah-kahan-2027-las-vegas-1avjz_4gkrmeou0 | Noah Kahan | 2027-05-21 | Las Vegas | https://seatgeek.com/noah-kahan-tickets/las-vegas-nevada-allegiant-stadium-2027-05-21-6-30-pm/concert/18728719 |
| tm-queens-of-the-stone-age-2027-detroit-vv1kezvp4_gagidyd | Queens Of The Stone Age | 2027-05-22 | Detroit | https://seatgeek.com/queens-of-the-stone-age-tickets/detroit-michigan-little-caesars-arena-2027-05-22-6-30-pm/concert/18709231 |
| tm-kings-of-leon-2027-clarkston-vv1afzk4pgkdf_fbn | Kings Of Leon | 2027-05-23 | Clarkston | https://seatgeek.com/kings-of-leon-tickets/clarkston-michigan-pine-knob-music-theatre-2027-05-23-7-30-pm/concert/18746648 |
| tm-queens-of-the-stone-age-2027-boston-vv1avzk43gkdss-xl | Queens Of The Stone Age | 2027-05-24 | Boston | https://seatgeek.com/queens-of-the-stone-age-tickets/boston-massachusetts-td-garden-2027-05-24-6-30-pm/concert/18709234 |
| tm-kings-of-leon-2027-bridgeport-g5vvz_pclhssb | Kings Of Leon | 2027-05-25 | Bridgeport | https://seatgeek.com/kings-of-leon-tickets/bridgeport-connecticut-hartford-healthcare-amphitheater-2027-05-25-7-30-pm/concert/18746650 |
| tm-calvin-harris-2027-inglewood-vv1f0z_48vcazd8d1 | Calvin Harris | 2027-05-26 | Inglewood | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-26-8-pm/concert/18708087 |
| tm-calvin-harris-2027-inglewood-vv1aazk4fgkebghyq | Calvin Harris | 2027-05-27 | Inglewood | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-27-8-pm/concert/18674854 |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd68xic | Calvin Harris | 2027-05-28 | Inglewood | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-28-8-pm/concert/18699754 |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | Def Leppard | 2027-05-29 | San Antonio | https://seatgeek.com/def-leppard-tickets/san-antonio-texas-frost-bank-center-2027-05-29-7-pm/concert/18662426 |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd6fcij | Calvin Harris | 2027-05-29 | Inglewood | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-29-8-pm/concert/18702244 |
| tm-kings-of-leon-2027-bethel-k7vgf_pkjzmnn | Kings Of Leon | 2027-05-30 | Bethel | https://seatgeek.com/kings-of-leon-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-05-30-7-30-pm/concert/18746656 |
| tm-megadeth-2027-clarkston-vv17oz_pgks8s9m3 | Megadeth | 2027-06-04 | Clarkston | https://seatgeek.com/megadeth-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-04-7-pm/concert/18778380 |
| tm-noah-kahan-2027-columbus-vv17fz_4gkshkqmo | Noah Kahan | 2027-06-05 | Columbus | https://seatgeek.com/noah-kahan-tickets/columbus-ohio-ohio-stadium-2027-06-05-6-30-pm/concert/18728731 |
| tm-megadeth-2027-cincinnati-1avbz_pgkn_24l6 | Megadeth | 2027-06-05 | Cincinnati | https://seatgeek.com/megadeth-tickets/cincinnati-ohio-riverbend-music-center-2027-06-05-7-pm/concert/18780625 |
| tm-kings-of-leon-2027-tinley-park-vv1kvzvpbygacp7l6 | Kings Of Leon | 2027-06-06 | Tinley Park | https://seatgeek.com/kings-of-leon-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-06-06-7-30-pm/concert/18746660 |
| tm-megadeth-2027-burgettstown-1avbz_pgkwkmpmi | Megadeth | 2027-06-07 | Burgettstown | https://seatgeek.com/megadeth-tickets/burgettstown-pennsylvania-the-pavilion-at-star-lake-2027-06-07-7-pm/concert/18778386 |
| tm-megadeth-2027-bristow-1avfz_pgknmlaeb | Megadeth | 2027-06-08 | Bristow | https://seatgeek.com/megadeth-tickets/bristow-virginia-jiffy-lube-live-2027-06-08-7-pm/concert/18778388 |
| tm-noah-kahan-2027-detroit-vv1koz_kr3g7cdve | Noah Kahan | 2027-06-10 | Detroit | https://seatgeek.com/noah-kahan-tickets/detroit-michigan-ford-field-2027-06-10-6-30-pm/concert/18728732 |
| tm-intocable-2027-miami-vvg1vz_pmzxge8 | Intocable | 2027-06-11 | Miami | https://seatgeek.com/intocable-tickets/miami-florida-james-l-knight-center-2027-06-11-8-pm/concert/18781154 |
| tm-noah-kahan-2027-orchard-park-vv17gz_4gksqg3zl | Noah Kahan | 2027-06-12 | Orchard Park | https://seatgeek.com/noah-kahan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-12-6-pm/concert/18728735 |
| tm-megadeth-2027-mansfield-vv177z_pgkmjh1ou | Megadeth | 2027-06-12 | Mansfield | https://seatgeek.com/megadeth-tickets/mansfield-massachusetts-xfinity-center-ma-2027-06-12-7-pm/concert/18778390 |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6hbhj | KPop Demon Hunters | 2027-06-13 | Newark | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-13-2-pm/concert/18839590 |
| tm-megadeth-2027-camden-vv17fz_pgkmjnhj7 | Megadeth | 2027-06-13 | Camden | https://seatgeek.com/megadeth-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-06-13-7-pm/concert/18778391 |
| tm-noah-kahan-2027-montreal-1aszk4pgkdjhrvf | Noah Kahan | 2027-06-15 | Montreal | https://seatgeek.com/noah-kahan-tickets/montreal-canada-parc-jean-drapeau-2027-06-15-6-30-pm/concert/18728737 |
| tm-megadeth-2027-new-york-g5diz_prtfsjt | Megadeth | 2027-06-15 | New York | https://seatgeek.com/megadeth-tickets/new-york-new-york-madison-square-garden-2027-06-15-7-pm/concert/18778392 |
| tm-noah-kahan-2027-east-rutherford-k7vgf_4me3p-- | Noah Kahan | 2027-06-18 | East Rutherford | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-18-6-30-pm/concert/18728736 |
| tm-megadeth-2027-alpharetta-vvg1zz_pnf8blb | Megadeth | 2027-06-18 | Alpharetta | https://seatgeek.com/megadeth-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-06-18-7-pm/concert/18778394 |
| tm-noah-kahan-2027-east-rutherford-k7vgf_pevlzwu | Noah Kahan | 2027-06-19 | East Rutherford | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-19-6-30-pm/concert/18755182 |
| tm-stray-kids-2027-chicago-vv167zk4yjazaue56a | Stray Kids | 2027-06-19 | Chicago | https://seatgeek.com/stray-kids-tickets/chicago-illinois-soldier-field-2027-06-19-7-30-pm/concert/18792968 |
| tm-kpop-demon-hunters-2027-chicago-vv178z_pgkra4jvj | KPop Demon Hunters | 2027-06-20 | Chicago | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-20-2-pm/concert/18838894 |
| tm-megadeth-2027-irving-vvg1yz_psnfnkd | Megadeth | 2027-06-22 | Irving | https://seatgeek.com/megadeth-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-06-22-7-pm/concert/18778402 |
| tm-megadeth-2027-austin-g5diz_pevm_m_ | Megadeth | 2027-06-23 | Austin | https://seatgeek.com/megadeth-tickets/austin-texas-germania-insurance-amphitheater-2027-06-23-6-pm/concert/18778404 |
| tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0 | Fall Out Boy | 2027-07-13 | Arlington | https://seatgeek.com/fall-out-boy-tickets/arlington-texas-globe-life-field-2027-07-13-5-30-pm/concert/18753400 |
| tm-fall-out-boy-2027-atlanta-vvg1zz_pkn5gmk | Fall Out Boy | 2027-07-16 | Atlanta | https://seatgeek.com/fall-out-boy-tickets/atlanta-georgia-truist-park-2027-07-16-5-30-pm/concert/18753402 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | Stevie Wonder | 2026-12-08 | Detroit | no_candidates_returned | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | Stevie Wonder | 2026-12-09 | Detroit | no_candidates_returned | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | Barry Manilow | 2026-12-17 | Las Vegas | no_candidates_returned | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | Barry Manilow | 2026-12-18 | Las Vegas | no_candidates_returned | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | Barry Manilow | 2026-12-19 | Las Vegas | no_candidates_returned | - |
| tm-beartooth-2027-torrensville-177yv0g61te6f3g | Beartooth | 2027-01-26 | Torrensville | no_candidates_returned | - |
| tm-beartooth-2027-west-melbourne-177yv0g61tqsnpg | Beartooth | 2027-01-28 | West Melbourne | no_candidates_returned | - |
| tm-beartooth-2027-brisbane-177yv0g61drwqfa | Beartooth | 2027-01-31 | Brisbane | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-scarborough-1agzk4pgkd-8j_w | Two Door Cinema Club | 2027-08-06 | Scarborough | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-halifax-1ku8vp3fga2fekm | Two Door Cinema Club | 2027-08-07 | Halifax | no_candidates_returned | - |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6tnua- | Morat | 2026-11-20 | Tlajomulco de Zuñiga | no_candidates_returned | - |
| tm-interpol-2026-cardiff-1auzkungkeif6z0 | Interpol | 2026-11-21 | Cardiff | no_candidates_returned | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | Saint Levant | 2026-11-21 | Stockholm | no_candidates_returned | - |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | Beartooth | 2026-11-21 | Maplewood | no_candidates_returned | - |
| tm-jack-johnson-2026-waipara-1kazv0jzgaua-ts | Jack Johnson | 2026-11-22 | Waipara | no_candidates_returned | - |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6ivj5r | Morat | 2026-11-21 | Tlajomulco de Zuñiga | no_candidates_returned | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | Polyphia | 2026-11-22 | Barcelona | no_candidates_returned | - |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | Black Stone Cherry | 2026-11-22 | Nashville | city_or_metro_match_failed | https://seatgeek.com/black-stone-cherry-tickets/madison-tennessee-the-58-at-eastside-bowl-2026-11-22-8-pm/concert/18637135 |
| tm-fontaines-d-c-2026-leeds-g5vhz_8b5sfcc | Fontaines D.C. | 2026-11-24 | Leeds | no_candidates_returned | - |
| tm-interpol-2026-manchester-1adfzbggkdjtldr | Interpol | 2026-11-24 | Manchester | no_candidates_returned | - |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | 2026-11-24 | Stockholm | no_candidates_returned | - |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | Saint Levant | 2026-11-24 | Zürich | no_candidates_returned | - |
| tm-two-door-cinema-club-2026-brisbane-1avgz_kgkwwsauv | Two Door Cinema Club | 2026-11-25 | Brisbane | no_candidates_returned | - |
| tm-polyphia-2026-milano-zg9rmiynyzefaa | Polyphia | 2026-11-25 | Milano | no_candidates_returned | - |
| tm-trivium-2026-saint-louis-17f8v0g6cy863b6 | Trivium | 2026-11-25 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/trivium-tickets/chesterfield-missouri-the-factory-stl-2026-11-25-7-pm/concert/18391960 |
| tm-saint-levant-2026-milano-zg9rmiynyzdda7 | Saint Levant | 2026-11-26 | Milano | no_candidates_returned | - |
| tm-two-door-cinema-club-2026-auckland-1a0zkoygkd-_sqy | Two Door Cinema Club | 2026-11-27 | Auckland | no_candidates_returned | - |
| tm-dermot-kennedy-2026-wellington-1ae8z_agkmdax8r | Dermot Kennedy | 2026-11-27 | Wellington | no_candidates_returned | - |
| tm-sabaton-2026-saint-louis-1ae7zbwgkmsi8la | Sabaton | 2026-11-27 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/sabaton-tickets/chesterfield-missouri-the-factory-stl-2026-11-27-7-pm/concert/17732687 |
| tm-boyz-ii-men-2026-waurn-ponds-177yv0g6cqczn9y | Boyz II Men | 2026-11-28 | Waurn Ponds | no_candidates_returned | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | Bryson Tiller | 2026-11-28 | Forest (Brussels) | no_candidates_returned | - |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | Polyphia | 2026-11-28 | Praha 7 | no_candidates_returned | - |
| tm-guns-n-roses-2026-adelaide-1aefzbygkb-e0bz | Guns N' Roses | 2026-11-29 | Adelaide | no_candidates_returned | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | Polyphia | 2026-11-29 | Warsaw | no_candidates_returned | - |
| tm-bryson-tiller-2026-dublin-17kzv0g659_puvu | Bryson Tiller | 2026-12-01 | Dublin | no_candidates_returned | - |
| tm-guns-n-roses-2026-townsville-1ka8vpzuga26zyk | Guns N' Roses | 2026-12-02 | Townsville | no_candidates_returned | - |
| tm-a-perfect-circle-2026-adelaide-1aefz_kgkrmdjgo | A Perfect Circle | 2026-12-04 | Adelaide | no_candidates_returned | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | 2026-12-04 | Forest (Brussels) | no_candidates_returned | - |
| tm-boyz-ii-men-2026-pokolbin-177yv0g6cro9xjr | Boyz II Men | 2026-12-05 | Pokolbin | no_candidates_returned | - |
| tm-guns-n-roses-2026-milton-1akzko_gken_ac7 | Guns N' Roses | 2026-12-05 | Milton | no_candidates_returned | - |
| tm-dylan-gossett-2026-brisbane-177yv0g61tezlg8 | Dylan Gossett | 2026-12-05 | Brisbane | no_candidates_returned | - |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | Imagine Dragons | 2026-12-05 | Abu Dhabi | city_or_metro_match_failed | https://seatgeek.com/candlelight-coldplay-and-imagine-dragons-tickets/bridgeport-connecticut-bijou-theatre-bridgeport-2026-12-05-8-30-pm/concert/18547570 |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16vai_vps | Phoebe Bridgers | 2026-12-05 | Forest (Brussels) | no_candidates_returned | - |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | Black Stone Cherry | 2026-12-05 | Toronto | city_or_metro_match_failed | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-the-webster-hartford-2026-12-05-7-30-pm/concert/18637147 |
| tm-boyz-ii-men-2026-mount-cotton-177yv0g6chtbuni | Boyz II Men | 2026-12-06 | Mount Cotton | no_candidates_returned | - |
| tm-dylan-gossett-2026-sydney-177yv0g655_-4r3 | Dylan Gossett | 2026-12-06 | Sydney | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-merksem-antwerpen-z698xzg2z16vgjvfk8 | Phoebe Bridgers | 2026-12-06 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | Blondshell | 2026-12-06 | Amsterdam | no_candidates_returned | - |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | Polyphia | 2026-12-06 | Oberhausen | no_candidates_returned | - |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | Jay Wheeler | 2026-12-07 | Málaga | no_candidates_returned | - |
| tm-guns-n-roses-2026-newcastle-1avgz_agknobybx | Guns N' Roses | 2026-12-08 | Newcastle | no_candidates_returned | - |
| tm-a-perfect-circle-2026-brisbane-1avgz_kgklfnuo6 | A Perfect Circle | 2026-12-08 | Brisbane | no_candidates_returned | - |
| tm-dylan-gossett-2026-west-melbourne-177yv0g653cuwz_ | Dylan Gossett | 2026-12-08 | West Melbourne | no_candidates_returned | - |
| tm-polyphia-2026-utrecht-z698xzbpz16v1314-i | Polyphia | 2026-12-08 | Utrecht | no_candidates_returned | - |
| tm-dylan-gossett-2026-auckland-17azv0g65cuaddf | Dylan Gossett | 2026-12-11 | Auckland | no_candidates_returned | - |
| tm-guns-n-roses-2026-docklands-1apzkobgkex5mpi | Guns N' Roses | 2026-12-11 | Docklands | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-glenorchy-177yv0g6cla9khl | Queens Of The Stone Age | 2026-12-11 | Glenorchy | no_candidates_returned | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | Bryan Adams | 2026-12-13 | Praha 9 | no_candidates_returned | - |
| tm-guns-n-roses-2026-olympic-park-1akzko_gkexzdnf | Guns N' Roses | 2026-12-14 | Olympic Park | no_candidates_returned | - |
| tm-air-supply-2026-auckland-17azv0g65rxws3q | Air Supply | 2026-12-15 | Auckland | no_candidates_returned | - |
| tm-mon-laferte-2026-monterrey-17azv0g6cxrk0bt | Mon Laferte | 2026-12-15 | Monterrey | no_candidates_returned | - |
| tm-mon-laferte-2026-monterrey-17azv0g61m-mqwh | Mon Laferte | 2026-12-16 | Monterrey | no_candidates_returned | - |
| tm-guns-n-roses-2026-auckland-15e8z_axausjz | Guns N' Roses | 2026-12-17 | Auckland | artist_match_failed | https://seatgeek.com/nightrain-a-gins-n-roses-tribute-tickets/greenville-south-carolina-radio-room-2026-12-17-8-pm/concert/18815647 |
| tm-amble-2026-co-mayo-1abzkfugkd8h21y | Amble | 2026-12-17 | Co. Mayo | no_candidates_returned | - |
| tm-blondshell-2026-dublin-1avoz_agkwt8mru | Blondshell | 2026-12-17 | Dublin | no_candidates_returned | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6gcz4ax4 | MANA | 2026-12-17 | Ciudad de México | no_candidates_returned | - |
| tm-amble-2026-co-mayo-1abzkfugkd8hl5a | Amble | 2026-12-18 | Co. Mayo | no_candidates_returned | - |
| tm-stella-lefty-2026-saint-louis-1a-zkfxgkegfvfo | Stella Lefty | 2026-12-18 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/stella-lefty-tickets/chesterfield-missouri-the-factory-stl-2026-12-18-8-pm/concert/18591481 |
| tm-amble-2026-co-mayo-1abzkfugkd8hr56 | Amble | 2026-12-19 | Co. Mayo | no_candidates_returned | - |
| tm-jon-pardi-2026-saint-louis-16e7z_obyg7v9-3 | Jon Pardi | 2026-12-19 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/jon-pardi-tickets/chesterfield-missouri-the-factory-stl-2026-12-19-8-pm/concert/18535011 |
| tm-amble-2026-co-mayo-1abzkfugkd8w25a | Amble | 2026-12-20 | Co. Mayo | no_candidates_returned | - |
| tm-amble-2026-co-mayo-1abzkfugkd8wl5u | Amble | 2026-12-21 | Co. Mayo | no_candidates_returned | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | Tyla | 2027-01-08 | Pretoria | no_candidates_returned | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | Tyla | 2027-01-09 | Pretoria | no_candidates_returned | - |
| tm-dinosaur-jr-2027-auckland-1a0zk4fgkei-ffe | Dinosaur Jr. | 2027-01-16 | Auckland | no_candidates_returned | - |
| tm-pink-martini-2027-ft-lauderdale-vvg1vz_asbh4yx | Pink Martini | 2027-01-17 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/pink-martini-tickets/fort-lauderdale-florida-au-rene-theater-at-the-broward-center-2027-01-17-7-pm/concert/18223166 |
| tm-mon-laferte-2027-brussels-z698xzg2z1kbx0fgb | Mon Laferte | 2027-01-18 | Brussels | no_candidates_returned | - |
| tm-saint-levant-2027-glasgow-1adbz_fgkb_vncq | Saint Levant | 2027-01-18 | Glasgow | no_candidates_returned | - |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | Mico | 2027-01-18 | Barcelona | no_candidates_returned | - |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gecffyz | Sienna Spiro | 2027-01-19 | West Melbourne | no_candidates_returned | - |
| tm-dinosaur-jr-2027-brisbane-1k7yvp4bgacdnzm | Dinosaur Jr. | 2027-01-19 | Brisbane | no_candidates_returned | - |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gmjpde2 | Sienna Spiro | 2027-01-20 | West Melbourne | no_candidates_returned | - |
| tm-saint-levant-2027-manchester-g5dzz_fbnzksb | Saint Levant | 2027-01-20 | Manchester | no_candidates_returned | - |
| tm-bryson-tiller-2027-linlithgow-ave-177yv0g65m3hnkk | Bryson Tiller | 2027-01-21 | Linlithgow Ave | no_candidates_returned | - |
| tm-yacht-rock-revue-2027-ft-lauderdale-vvg1vz_3t9jx1c | Yacht Rock Revue | 2027-01-21 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/yacht-rock-revue-tickets/fort-lauderdale-florida-lillian-s-wells-hall-at-the-parker-2027-01-21-7-30-pm/concert/18613163 |
| tm-knocked-loose-2027-brisbane-1avgz_3gkbtawtj | Knocked Loose | 2027-01-22 | Brisbane | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | Nothing But Thieves | 2027-01-22 | Praha 9 | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-assago-zg9rmiynyzefv7 | Nothing But Thieves | 2027-01-24 | Assago | no_candidates_returned | - |
| tm-sienna-spiro-2027-brisbane-177yv0g6gjxxnip | Sienna Spiro | 2027-01-25 | Brisbane | no_candidates_returned | - |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | Mico | 2027-01-25 | Praha 1 | no_candidates_returned | - |
| tm-black-stone-cherry-2027-margate-16dfzbzp7g7r7jo | Black Stone Cherry | 2027-01-25 | Margate | no_candidates_returned | - |
| tm-sylvan-esso-2027-dublin-1avoz_fgkugispy | Sylvan Esso | 2027-01-26 | Dublin | no_candidates_returned | - |
| tm-alan-walker-2027-saint-louis-1a-zkf0gkdapg7j | Alan Walker | 2027-01-26 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/alan-walker-tickets/chesterfield-missouri-the-factory-stl-2027-01-26-7-pm/concert/18591482 |
| tm-sienna-spiro-2027-auckland-17azv0g6gnlzs7o | Sienna Spiro | 2027-01-27 | Auckland | no_candidates_returned | - |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | Mico | 2027-01-27 | København V | no_candidates_returned | - |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | Simple Plan | 2027-01-27 | Victoria | city_or_metro_match_failed | https://seatgeek.com/simple-plan-tickets/vancouver-canada-rogers-arena-2027-01-27-6-pm/concert/18655536 |
| tm-sylvan-esso-2027-manchester-g5vhz_fudi7pq | Sylvan Esso | 2027-01-28 | Manchester | no_candidates_returned | - |
| tm-the-psychedelic-furs-2027-london-1amzkfwgkeiysgf | The Psychedelic Furs | 2027-01-29 | London | no_candidates_returned | - |
| tm-foy-vance-2027-brisbane-1akzkf_gkes7kkl | Foy Vance | 2027-01-30 | Brisbane | no_candidates_returned | - |
| tm-vnv-nation-2027-limerick-city-1avozbugknqkh_5 | VNV Nation | 2027-01-30 | Limerick City | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | Nothing But Thieves | 2027-01-31 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | Five Finger Death Punch | 2027-01-31 | Praha 9 | no_candidates_returned | - |
| tm-bryan-adams-2027-brescia-zg9rmiynyzffda | Bryan Adams | 2027-01-31 | Brescia | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-brussels-z698xzg2z16v4w_s4e | Two Door Cinema Club | 2027-02-01 | Brussels | no_candidates_returned | - |
| tm-vnv-nation-2027-glasgow-16dbzbuq4g7ljkl | VNV Nation | 2027-02-01 | Glasgow | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-torrensville-1akzkfggkepdplf | Lizzy McAlpine | 2027-02-02 | Torrensville | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-dublin-17kzv0g654xs6b3 | Nothing But Thieves | 2027-02-02 | Dublin | no_candidates_returned | - |
| tm-saint-levant-2027-ciudad-de-mexico-g5dvz_o3qzslc | Saint Levant | 2027-02-02 | Ciudad de México | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-torrensville-1akzkfggkdqgjdn | Lizzy McAlpine | 2027-02-03 | Torrensville | no_candidates_returned | - |
| tm-alan-walker-2027-st-petersburg-vvg1vz_phftijy | Alan Walker | 2027-02-03 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/alan-walker-tickets/saint-petersburg-florida-jannus-live-2027-02-03-7-pm/concert/18753728 |
| tm-hollywood-undead-2027-praha-9-z698xzu0z16vcf4gue | Hollywood Undead | 2027-02-05 | Praha 9 | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-oslo-z698xzb_z1k8pbuqa | Two Door Cinema Club | 2027-02-05 | Oslo | no_candidates_returned | - |
| tm-theory-of-a-deadman-2027-nottingham-g5vhz_1u0tvak | Theory Of A Deadman | 2027-02-05 | Nottingham | no_candidates_returned | - |
| tm-bryan-adams-2027-padova-zg9rmiynyzffdv | Bryan Adams | 2027-02-05 | Padova | no_candidates_returned | - |
| tm-jake-bugg-2027-manchester-g5vhz_owbzlwl | Jake Bugg | 2027-02-06 | Manchester | no_candidates_returned | - |
| tm-theory-of-a-deadman-2027-glasgow-17uov0g61uju3tk | Theory Of A Deadman | 2027-02-06 | Glasgow | no_candidates_returned | - |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | Too Many Zooz | 2027-02-06 | Wroclaw | no_candidates_returned | - |
| tm-mico-2027-dublin-1abzk46gkd9elri | Mico | 2027-02-07 | Dublin | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-hamburg-z698xzc2z16v1k_wvn | Two Door Cinema Club | 2027-02-07 | Hamburg | no_candidates_returned | - |
| tm-hollywood-undead-2027-warsaw-z698xzqpz1kf0av8y | Hollywood Undead | 2027-02-08 | Warsaw | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | Five Finger Death Punch | 2027-02-08 | Forest (Brussels) | no_candidates_returned | - |
| tm-cage-the-elephant-2027-krakow-z698xzqpz16vup4eqe | Cage The Elephant | 2027-02-09 | Krakow | no_candidates_returned | - |
| tm-jake-bugg-2027-dublin-1kkzvpk9ga1efx9 | Jake Bugg | 2027-02-09 | Dublin | no_candidates_returned | - |
| tm-theory-of-a-deadman-2027-manchester-g5dzz_1mez0ds | Theory Of A Deadman | 2027-02-09 | Manchester | no_candidates_returned | - |
| tm-valley-2027-waterloo-z7r9jz1aavzft | Valley | 2027-02-09 | Waterloo | no_candidates_returned | - |
| tm-kaleo-2027-fremantle-1akzkffgkdlimm3 | KALEO | 2027-02-10 | Fremantle | no_candidates_returned | - |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | John Summit | 2027-02-11 | Warsaw | no_candidates_returned | - |
| tm-black-stone-cherry-2027-belfast-1kczvno9gacmss6 | Black Stone Cherry | 2027-02-11 | Belfast | no_candidates_returned | - |
| tm-jake-bugg-2027-edinburgh-1auzkf-gkd9gf1d | Jake Bugg | 2027-02-11 | Edinburgh | no_candidates_returned | - |
| tm-theory-of-a-deadman-2027-london-g5dzz_1tbseag | Theory Of A Deadman | 2027-02-11 | London | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-brisbane-1akzkfugkeggjy4 | Lizzy McAlpine | 2027-02-12 | Brisbane | no_candidates_returned | - |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | John Summit | 2027-02-12 | Forest (Brussels) | no_candidates_returned | - |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | Malcolm Todd | 2027-02-12 | Stockholm | no_candidates_returned | - |
| tm-black-stone-cherry-2027-dublin-1avozbmgkwn1n87 | Black Stone Cherry | 2027-02-12 | Dublin | no_candidates_returned | - |
| tm-jake-bugg-2027-ayr-1auzk4xgkerybal | Jake Bugg | 2027-02-12 | Ayr | no_candidates_returned | - |
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | Hollywood Undead | 2027-02-13 | Johanneshov | no_candidates_returned | - |
| tm-charli-xcx-2027-dublin-16voz_3jvg7sk3f | Charli xcx | 2027-02-13 | Dublin | no_candidates_returned | - |
| tm-black-stone-cherry-2027-cork-1avozbzgklkguax | Black Stone Cherry | 2027-02-13 | Cork | no_candidates_returned | - |
| tm-daughtry-2027-saint-louis-vv1fvovpgtjkz75857 | Daughtry | 2027-02-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/daughtry-tickets/st-louis-missouri-the-pageant-st-louis-2027-02-13-7-pm/concert/18632917 |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | Dylan Scott | 2027-02-13 | Milwaukee | no_candidates_returned | - |
| tm-bruno-mars-2027-burswood-1aefz_ogklrp4vu | Bruno Mars | 2027-02-14 | Burswood | no_candidates_returned | - |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | Hollywood Undead | 2027-02-14 | Göteborg | no_candidates_returned | - |
| tm-jake-bugg-2027-glasgow-1auzkf-gkeivv0q | Jake Bugg | 2027-02-14 | Glasgow | no_candidates_returned | - |
| tm-kaleo-2027-brisbane-1akzkffgkemx7vu | KALEO | 2027-02-15 | Brisbane | no_candidates_returned | - |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | Role Model | 2027-02-15 | Forest (Brussels) | no_candidates_returned | - |
| tm-jake-bugg-2027-stirling-1auzk4xgkd61qqs | Jake Bugg | 2027-02-15 | Stirling | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | Bullet For My Valentine | 2027-02-16 | Praha 9 | no_candidates_returned | - |
| tm-theory-of-a-deadman-2027-amsterdam-z698xzbpz16vffqn4a | Theory Of A Deadman | 2027-02-16 | Amsterdam | no_candidates_returned | - |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | Amble | 2027-02-16 | Vienna | no_candidates_returned | - |
| tm-calvin-harris-2027-perth-1avgz_kjvv7zd8va | Calvin Harris | 2027-02-17 | Perth | no_candidates_returned | - |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | Hollywood Undead | 2027-02-17 | København V | no_candidates_returned | - |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | Amble | 2027-02-17 | Praha 5 | no_candidates_returned | - |
| tm-jake-bugg-2027-gateshead-11uyvpf_qopzvc | Jake Bugg | 2027-02-17 | Gateshead | no_candidates_returned | - |
| tm-cage-the-elephant-2027-milano-zg9rmiynyzdfvd | Cage The Elephant | 2027-02-17 | Milano | no_candidates_returned | - |
| tm-kaleo-2027-auckland-1a0zkfkgkeyf3yh | KALEO | 2027-02-18 | Auckland | no_candidates_returned | - |
| tm-calvin-harris-2027-perth-1avgz_3gkxss4fp | Calvin Harris | 2027-02-18 | Perth | no_candidates_returned | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | Malcolm Todd | 2027-02-18 | Forest (Brussels) | no_candidates_returned | - |
| tm-haiden-henderson-2027-dublin-1abzkfigkeweheg | Haiden Henderson | 2027-02-18 | Dublin | no_candidates_returned | - |
| tm-calvin-harris-2027-bowen-hills-1avgz_3gkxc-fur | Calvin Harris | 2027-02-19 | Bowen Hills | no_candidates_returned | - |
| tm-dylan-gossett-2027-manchester-g5dzz_8hqwevt | Dylan Gossett | 2027-02-19 | Manchester | no_candidates_returned | - |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | James Blunt | 2027-02-19 | Forest (Brussels) | no_candidates_returned | - |
| tm-calvin-harris-2027-sydney-1avgz_3gkxct3en | Calvin Harris | 2027-02-20 | Sydney | no_candidates_returned | - |
| tm-fkj-2027-auckland-17azv0g6cklgovf | FKJ | 2027-02-20 | Auckland | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | Bullet For My Valentine | 2027-02-20 | Forest (Brussels) | no_candidates_returned | - |
| tm-jake-bugg-2027-liverpool-g5vhz_owwx56n | Jake Bugg | 2027-02-20 | Liverpool | no_candidates_returned | - |
| tm-calvin-harris-2027-sydney-1avgz_3gkt8zbnw | Calvin Harris | 2027-02-21 | Sydney | no_candidates_returned | - |
| tm-haiden-henderson-2027-manchester-g5vhz_kduqskh | Haiden Henderson | 2027-02-21 | Manchester | no_candidates_returned | - |
| tm-jake-bugg-2027-bristol-1adjz_ogkvkgljy | Jake Bugg | 2027-02-21 | Bristol | no_candidates_returned | - |
| tm-calvin-harris-2027-sydney-1akzkfmgkdbb5z5 | Calvin Harris | 2027-02-22 | Sydney | no_candidates_returned | - |
| tm-role-model-2027-dublin-17kzv0g6uvbpba3 | Role Model | 2027-02-22 | Dublin | no_candidates_returned | - |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | Amble | 2027-02-22 | Johanneshov | no_candidates_returned | - |
| tm-cage-the-elephant-2027-cardiff-16dbz_3rfg7rxe8 | Cage The Elephant | 2027-02-22 | Cardiff | no_candidates_returned | - |
| tm-calvin-harris-2027-sydney-1akzkfmgkdbrdyf | Calvin Harris | 2027-02-23 | Sydney | no_candidates_returned | - |
| tm-fkj-2027-brisbane-177yv0g6ckieecd | FKJ | 2027-02-23 | Brisbane | no_candidates_returned | - |
| tm-haiden-henderson-2027-london-g5vhz_kew3xpo | Haiden Henderson | 2027-02-23 | London | no_candidates_returned | - |
| tm-jake-bugg-2027-nottingham-g5vhz_ohmndtt | Jake Bugg | 2027-02-23 | Nottingham | no_candidates_returned | - |
| tm-meshuggah-2027-saint-louis-1a-zk44gkdts0ox | Meshuggah | 2027-02-23 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/meshuggah-tickets/chesterfield-missouri-the-factory-stl-2027-02-23-7-pm/concert/18724648 |
| tm-tame-impala-2027-tlajomulco-de-zuniga-g5dvz_pmifp7m | Tame Impala | 2027-02-23 | Tlajomulco de Zuñiga | no_candidates_returned | - |
| tm-kings-of-leon-2027-auckland-1kazvpfagago3z7 | Kings Of Leon | 2027-02-24 | Auckland | no_candidates_returned | - |
| tm-calvin-harris-2027-sydney-1akzkfugkdxptn8 | Calvin Harris | 2027-02-24 | Sydney | no_candidates_returned | - |
| tm-malcolm-todd-2027-dublin-1kkzvpfyga5vo0x | Malcolm Todd | 2027-02-24 | Dublin | no_candidates_returned | - |
| tm-haiden-henderson-2027-cardiff-g5vhz_kdajwvp | Haiden Henderson | 2027-02-24 | Cardiff | no_candidates_returned | - |
| tm-calvin-harris-2027-flemington-1apzkfugkdpmniz | Calvin Harris | 2027-02-25 | Flemington | no_candidates_returned | - |
| tm-haiden-henderson-2027-birmingham-g5dzz_ke9h3b2 | Haiden Henderson | 2027-02-25 | Birmingham | no_candidates_returned | - |
| tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr | Malcolm Todd | 2027-02-25 | Glasgow | no_candidates_returned | - |
| tm-mico-2027-ft-lauderdale-vvg1vz_fqxgdhj | Mico | 2027-02-25 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/mico-tickets/fort-lauderdale-florida-revolution-live-2027-02-25-7-pm/concert/18666081 |
| tm-calvin-harris-2027-flemington-1aefz_3gkxmmgx4 | Calvin Harris | 2027-02-26 | Flemington | no_candidates_returned | - |
| tm-jake-bugg-2027-london-g5vhz_olvuind | Jake Bugg | 2027-02-26 | London | no_candidates_returned | - |
| tm-lenny-pearce-2027-auckland-17azv0g6uncrehf | Lenny Pearce | 2027-02-27 | Auckland | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-saint-louis-vv1akzkfsgkdkbgr5 | Dancing With The Stars | 2027-02-26 | Saint Louis | no_candidates_returned | - |
| tm-simple-minds-2027-wellington-17azv0g6gjon-by | Simple Minds | 2027-02-27 | Wellington | no_candidates_returned | - |
| tm-chris-stassy-2027-west-footscray-1apzk4fgket404h | Chris Stassy | 2027-02-27 | West Footscray | no_candidates_returned | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | Haiden Henderson | 2027-02-27 | Amsterdam | no_candidates_returned | - |
| tm-dylan-gossett-2027-dublin-17kzv0g62wo552g | Dylan Gossett | 2027-02-27 | Dublin | no_candidates_returned | - |
| tm-jake-bugg-2027-london-g5vhz_ol9xkmo | Jake Bugg | 2027-02-27 | London | no_candidates_returned | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | Mei Semones | 2027-02-27 | Toronto | no_candidates_returned | - |
| tm-foreigner-2027-monterrey-1av8zbygkudzz0k | Foreigner | 2027-02-27 | Monterrey | city_or_metro_match_failed | https://seatgeek.com/foreign-journey-tribute-to-foreigner-and-journey-tickets/beverly-massachusetts-the-cabot-2027-02-27-8-pm/concert/18825245 |
| tm-calvin-harris-2027-flemington-16efz_kefg7nkeo | Calvin Harris | 2027-02-28 | Flemington | no_candidates_returned | - |
| tm-bruno-mars-2027-milton-1akzkf3gkdacg5v | Bruno Mars | 2027-02-28 | Milton | no_candidates_returned | - |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | Amble | 2027-02-28 | Amsterdam | no_candidates_returned | - |
| tm-foreigner-2027-zapopan-1afzk3ogkd3htid | Foreigner | 2027-02-28 | Zapopan | no_candidates_returned | - |
| tm-bruno-mars-2027-milton-1avgz_ogklamkhm | Bruno Mars | 2027-03-01 | Milton | no_candidates_returned | - |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | Amble | 2027-03-01 | Amsterdam | no_candidates_returned | - |
| tm-kaleo-2027-oslo-z698xzb_z1kaejyfv | KALEO | 2027-03-01 | Oslo | no_candidates_returned | - |
| tm-kaleo-2027-oslo-z698xzb_z16v0wbofv | KALEO | 2027-03-02 | Oslo | no_candidates_returned | - |
| tm-kings-of-leon-2027-bowen-hills-1avgz_fgkxy2l3h | Kings Of Leon | 2027-03-03 | Bowen Hills | no_candidates_returned | - |
| tm-foreigner-2027-ciudad-de-mexico-g5dvz_8xzavz- | Foreigner | 2027-03-03 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_o3ezszduv6 | Bruno Mars | 2027-03-04 | Sydney Olympic Park | no_candidates_returned | - |
| tm-the-neighbourhood-2027-saint-louis-vv1kvovppfga13fre | The Neighbourhood | 2027-03-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-neighbourhood-tickets/st-louis-missouri-chaifetz-arena-2027-03-04-7-pm/concert/18726901 |
| tm-kings-of-leon-2027-flemington-1aefz_fgkxtcmb- | Kings Of Leon | 2027-03-05 | Flemington | no_candidates_returned | - |
| tm-katseye-2027-auckland-1ae8z_4gkre277q | KATSEYE | 2027-03-05 | Auckland | no_candidates_returned | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | Hazlett | 2027-03-05 | Oslo | no_candidates_returned | - |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | James Blunt | 2027-03-05 | Praha 9 | no_candidates_returned | - |
| tm-katseye-2027-auckland-1ae8z_4gkwr-wk2 | KATSEYE | 2027-03-06 | Auckland | no_candidates_returned | - |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkmvg9lb | Leon Bridges | 2027-03-06 | South Yarra | no_candidates_returned | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | Mico | 2027-03-06 | Lawrence | no_candidates_returned | - |
| tm-weezer-2027-auckland-1fazvp4sz3z7g15d | Weezer | 2027-03-07 | Auckland | no_candidates_returned | - |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkrjiqf8 | Leon Bridges | 2027-03-07 | South Yarra | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxvi7 | Bruno Mars | 2027-03-08 | Sydney Olympic Park | no_candidates_returned | - |
| tm-kaleo-2027-brussels-z698xzg2z16vjkuafp | KALEO | 2027-03-08 | Brussels | no_candidates_returned | - |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | Pink Martini | 2027-03-08 | Pittsburgh | city_or_metro_match_failed | https://seatgeek.com/pink-martini-tickets/munhall-pennsylvania-carnegie-of-homestead-music-hall-munhall-2027-03-08-8-pm/concert/18701994 |
| tm-kaleo-2027-brussels-z698xzg2z16v_0_u-k | KALEO | 2027-03-09 | Brussels | no_candidates_returned | - |
| tm-valley-2027-saint-louis-vv16kzkfipkzaga2f7 | Valley | 2027-03-09 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/valley-tickets/st-louis-missouri-delmar-hall-2027-03-09-8-pm/concert/18606492 |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | Haiden Henderson | 2027-03-11 | Praha 5 | no_candidates_returned | - |
| tm-vnv-nation-2027-ft-lauderdale-vvg1vzbvdf3u-x | VNV Nation | 2027-03-12 | Ft Lauderdale | no_candidates_returned | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | Stella Lefty | 2027-03-13 | Amsterdam | no_candidates_returned | - |
| tm-the-dead-south-2027-dublin-17kzv0g6gpgt8iq | The Dead South | 2027-03-13 | Dublin | no_candidates_returned | - |
| tm-lenny-pearce-2027-townsville-city-1avgz_ogkn2n3_q | Lenny Pearce | 2027-03-14 | Townsville City | no_candidates_returned | - |
| tm-blue-october-2027-saint-louis-1ae7z_3gkiei5ox | Blue October | 2027-03-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/blue-october-tickets/chesterfield-missouri-the-factory-stl-2027-03-13-7-30-pm/concert/18594687 |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | Lizzy McAlpine | 2027-03-14 | Praha 7 | no_candidates_returned | - |
| tm-the-dead-south-2027-dublin-17kzv0g6gpgtyir | The Dead South | 2027-03-14 | Dublin | no_candidates_returned | - |
| tm-bryan-adams-2027-wellington-central-1ae8z_fgkxwzsx6 | Bryan Adams | 2027-03-15 | Wellington Central | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | Lizzy McAlpine | 2027-03-15 | Warsaw | no_candidates_returned | - |
| tm-kaleo-2027-barcelona-z698xz2qz1koa3fud | KALEO | 2027-03-15 | Barcelona | no_candidates_returned | - |
| tm-bryan-adams-2027-wellington-central-1ae8z_fgktxpjky | Bryan Adams | 2027-03-16 | Wellington Central | no_candidates_returned | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | Sienna Spiro | 2027-03-16 | Forest (Brussels) | no_candidates_returned | - |
| tm-hazlett-2027-glasgow-1auzkfggkeyhp7l | Hazlett | 2027-03-16 | Glasgow | no_candidates_returned | - |
| tm-tash-sultana-2027-merksem-antwerpen-z698xzg2z1kjpqofb | Tash Sultana | 2027-03-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-remi-wolf-2027-saint-louis-16-zk46uyzag1a76 | Remi Wolf | 2027-03-16 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/remi-wolf-tickets/chesterfield-missouri-the-factory-stl-2027-03-16-7-30-pm/concert/18664772 |
| tm-hazlett-2027-manchester-g5vhz_klkyfqd | Hazlett | 2027-03-17 | Manchester | no_candidates_returned | - |
| tm-kaleo-2027-milano-zg9rmiynyzdeke | KALEO | 2027-03-17 | Milano | no_candidates_returned | - |
| tm-hazlett-2027-dublin-1abzkfmgkdlb_c6 | Hazlett | 2027-03-18 | Dublin | no_candidates_returned | - |
| tm-kaleo-2027-warsaw-z698xzqpz1kbba-jk | KALEO | 2027-03-19 | Warsaw | no_candidates_returned | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | Passenger | 2027-03-19 | Brussels | no_candidates_returned | - |
| tm-michelle-branch-2027-saint-louis-vv17bz_8gknw__z8 | Michelle Branch | 2027-03-19 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/michelle-branch-tickets/st-louis-missouri-the-pageant-st-louis-2027-03-19-8-pm/concert/18508843 |
| tm-hazlett-2027-london-g5dzz_3nl_fgq | Hazlett | 2027-03-20 | London | no_candidates_returned | - |
| tm-kaleo-2027-praha-8-z698xzu0z1kauc3vb | KALEO | 2027-03-20 | Praha 8 | no_candidates_returned | - |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | Teddy Swims | 2027-03-20 | Praha 9 | no_candidates_returned | - |
| tm-tobymac-2027-saint-louis-vv1akzkf_gkdu8agp | TobyMac | 2027-03-20 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/tobymac-tickets/st-louis-missouri-chaifetz-arena-2027-03-20-7-pm/concert/18542857 |
| tm-vnv-nation-2027-los-angeles-vv170zbvgklj1kgc | VNV Nation | 2027-03-20 | Los Angeles | no_candidates_returned | - |
| tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc | Stella Lefty | 2027-03-22 | Birmingham | no_candidates_returned | - |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | Haiden Henderson | 2027-03-22 | Madrid | no_candidates_returned | - |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | Megadeth | 2027-03-23 | Forest (Brussels) | no_candidates_returned | - |
| tm-kaleo-2027-zurich-z698xzu3z16vqkfsq4 | KALEO | 2027-03-23 | Zürich | no_candidates_returned | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | Teddy Swims | 2027-03-26 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-kaleo-2027-vienna-z698xz5rz16vr81eow | KALEO | 2027-03-26 | Vienna | no_candidates_returned | - |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5muwq | Stella Lefty | 2027-03-26 | Dublin | no_candidates_returned | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | Teddy Swims | 2027-03-27 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-sienna-spiro-2027-milano-zg9rmiynyzef6a | Sienna Spiro | 2027-03-27 | Milano | no_candidates_returned | - |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5mcw- | Stella Lefty | 2027-03-27 | Dublin | no_candidates_returned | - |
| tm-the-interrupters-2027-ft-lauderdale-vvg1vz_3bjcjr0 | The Interrupters | 2027-03-27 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/fort-lauderdale-florida-revolution-live-2027-03-27-6-pm/concert/18612718 |
| tm-trivium-2027-dublin-1abzkffgkdvsqon | Trivium | 2027-03-29 | Dublin | no_candidates_returned | - |
| tm-kaleo-2027-berlin-z698xzc2z1ku0c686 | KALEO | 2027-03-29 | Berlin | no_candidates_returned | - |
| tm-james-blunt-2027-dublin-16bzkf7x3zaufauu | James Blunt | 2027-03-30 | Dublin | no_candidates_returned | - |
| tm-the-psychedelic-furs-2027-saint-louis-1ae7z_3gkmwkki0 | The Psychedelic Furs | 2027-03-30 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-psychedelic-furs-tickets/chesterfield-missouri-the-factory-stl-2027-03-30-7-30-pm/concert/18592655 |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | VNV Nation | 2027-03-30 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/vnv-nation-tickets/saint-paul-minnesota-amsterdam-bar-hall-1-2027-03-30-8-30-pm/concert/18357119 |
| tm-dylan-gossett-2027-saint-louis-1ae7z_kgkyeggq8 | Dylan Gossett | 2027-03-31 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/dylan-gossett-tickets/chesterfield-missouri-the-factory-stl-2027-03-31-7-pm/concert/18642080 |
| tm-the-warning-2027-manchester-g5dzz_3jr_df6 | The Warning | 2027-04-01 | Manchester | no_candidates_returned | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfwuei | Gavin Adcock | 2027-04-02 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/chesterfield-missouri-the-factory-stl-2027-04-02-7-30-pm/concert/18674453 |
| tm-sleeping-with-sirens-2027-brisbane-1akzkfygkeprtzf | Sleeping With Sirens | 2027-04-03 | Brisbane | no_candidates_returned | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfsjen | Gavin Adcock | 2027-04-03 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/chesterfield-missouri-the-factory-stl-2027-04-03-7-30-pm/concert/18674452 |
| tm-sleeping-with-sirens-2027-west-melbourne-1avgz_kgkwtduwz | Sleeping With Sirens | 2027-04-06 | West Melbourne | no_candidates_returned | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | Passenger | 2027-04-06 | Zürich | no_candidates_returned | - |
| tm-sabaton-2027-dublin-17kzv0g6g1kowuo | Sabaton | 2027-04-07 | Dublin | no_candidates_returned | - |
| tm-passenger-2027-milano-zg9rmiynyzd6ea | Passenger | 2027-04-07 | Milano | no_candidates_returned | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6ce | Billy Strings | 2027-04-08 | Saint Augustine | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-08-7-30-pm/concert/18755211 |
| tm-jake-bugg-2027-milano-zg9rmiynyzd6ke | Jake Bugg | 2027-04-09 | Milano | no_candidates_returned | - |
| tm-josiah-queen-2027-saint-louis-vv1akzkfngkee0a6p | Josiah Queen | 2027-04-09 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/josiah-queen-tickets/st-louis-missouri-chaifetz-arena-2027-04-09-7-pm/concert/18574498 |
| tm-mat-kearney-2027-charlottesville-z7r9jz1aaa-pv | Mat Kearney | 2027-04-10 | Charlottesville | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-assago-zg9rmiynyzeadk | Thirty Seconds to Mars | 2027-04-11 | Assago | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-dublin-16bzkfw-sza81kca | Lizzy McAlpine | 2027-04-12 | Dublin | no_candidates_returned | - |
| tm-foreigner-2027-dublin-1kkzvpv9gacwy1_ | Foreigner | 2027-04-12 | Dublin | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | Thirty Seconds to Mars | 2027-04-15 | Krakow | no_candidates_returned | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k_p3f_b | Gracie Abrams | 2027-04-15 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | Hazlett | 2027-04-15 | Nashville | city_or_metro_match_failed | https://seatgeek.com/hazlett-tickets/madison-tennessee-the-58-at-eastside-bowl-2027-04-15-8-pm/concert/18319954 |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k4vofa4 | Gracie Abrams | 2027-04-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-jake-bugg-2027-amsterdam-z698xzbpz1k7936fe | Jake Bugg | 2027-04-16 | Amsterdam | no_candidates_returned | - |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | Passenger | 2027-04-16 | Praha 1 | no_candidates_returned | - |
| tm-simple-minds-2027-assago-zg9rmiynyzdf1v | Simple Minds | 2027-04-16 | Assago | no_candidates_returned | - |
| tm-simple-minds-2027-casalecchio-di-reno-bologna-zg9rmiynyzdfaa | Simple Minds | 2027-04-17 | Casalecchio di Reno (Bologna) | no_candidates_returned | - |
| tm-the-interrupters-2027-saint-louis-vv17bz_3gkdzh1rc | The Interrupters | 2027-04-18 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/st-louis-missouri-the-pageant-st-louis-2027-04-18-7-pm/concert/18612591 |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | Teddy Swims | 2027-04-21 | Greenwich | no_candidates_returned | - |
| tm-tash-sultana-2027-auckland-1a0zkfggkee4ejk | Tash Sultana | 2027-04-22 | Auckland | no_candidates_returned | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | Teddy Swims | 2027-04-22 | Greenwich | no_candidates_returned | - |
| tm-tash-sultana-2027-auckland-1kazvpgigacnerq | Tash Sultana | 2027-04-23 | Auckland | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | Thirty Seconds to Mars | 2027-04-23 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-lenny-pearce-2027-hobart-1k7yvp7_gactwpw | Lenny Pearce | 2027-04-24 | Hobart | no_candidates_returned | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | Sabaton | 2027-04-24 | Rotterdam | no_candidates_returned | - |
| tm-erasure-2027-cardiff-1auzkfzgkecfur5 | Erasure | 2027-04-25 | Cardiff | no_candidates_returned | - |
| tm-the-dead-south-2027-saint-louis-16e7z_pf4g7neqx | The Dead South | 2027-04-27 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-dead-south-tickets/chesterfield-missouri-the-factory-stl-2027-04-27-7-30-pm/concert/18754885 |
| tm-bryan-adams-2027-malmo-z698xzq2z1k-ga_fv | Bryan Adams | 2027-04-30 | Malmö | no_candidates_returned | - |
| tm-tash-sultana-2027-thirroul-1akzkfggkdlsqdl | Tash Sultana | 2027-05-01 | Thirroul | no_candidates_returned | - |
| tm-earth-wind-fire-2027-durham-g5evz_f5p7r9- | Earth, Wind & Fire | 2027-05-01 | Durham | no_candidates_returned | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | Sabaton | 2027-05-02 | Praha 9 | no_candidates_returned | - |
| tm-erasure-2027-dublin-15voz_kqav4z0 | Erasure | 2027-05-03 | Dublin | no_candidates_returned | - |
| tm-two-friends-2027-saint-louis-1a-zk4pgkdsvsmy | Two Friends | 2027-05-05 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/two-friends-tickets/chesterfield-missouri-the-factory-stl-2027-05-05-7-30-pm/concert/18757696 |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | Sabaton | 2027-05-08 | Helsinki | no_candidates_returned | - |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | Valley | 2027-05-08 | Amsterdam | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-casalecchio-di-reno-bologna-zg9rmiynyzffde | Thirty Seconds to Mars | 2027-05-08 | Casalecchio di Reno (Bologna) | no_candidates_returned | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | Hazlett | 2027-05-08 | East Cleveland | city_or_metro_match_failed | https://seatgeek.com/hazlett-tickets/cleveland-ohio-beachland-ballroom-2027-05-08-8-pm/concert/18319950 |
| tm-hilary-duff-2027-milano-zg9rmiynyz776e | Hilary Duff | 2027-05-10 | Milano | no_candidates_returned | - |
| tm-valley-2027-bristol-g5vhz_3zkbafq | Valley | 2027-05-10 | Bristol | no_candidates_returned | - |
| tm-erasure-2027-brighton-g5dzz_kwfhs5r | Erasure | 2027-05-11 | Brighton | no_candidates_returned | - |
| tm-valley-2027-birmingham-g5dzz_36osp2q | Valley | 2027-05-11 | Birmingham | no_candidates_returned | - |
| tm-niall-horan-2027-tlajomulco-de-zuniga-g5dvz_31eksvx | Niall Horan | 2027-05-11 | Tlajomulco de Zuñiga | no_candidates_returned | - |
| tm-malcolm-todd-2027-brisbane-1akzkftgkduv9ih | Malcolm Todd | 2027-05-12 | Brisbane | no_candidates_returned | - |
| tm-weezer-2027-dublin-17kzv0g62rlynaf | Weezer | 2027-05-12 | Dublin | no_candidates_returned | - |
| tm-valley-2027-manchester-g5vhz_ohdx77o | Valley | 2027-05-12 | Manchester | no_candidates_returned | - |
| tm-feid-2027-tlajomulco-de-zuniga-g5dvz_p310vkr | FEID | 2027-05-13 | Tlajomulco de Zuñiga | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz1kkzqe8t | U2 | 2027-05-15 | Barcelona | no_candidates_returned | - |
| tm-kenny-chesney-2027-saint-louis-vv1kvovpfigaupvvy | Kenny Chesney | 2027-05-15 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/kenny-chesney-tickets/st-louis-missouri-the-dome-at-america-s-center-2027-05-15-4-30-pm/concert/18591991 |
| tm-lizzy-mcalpine-2027-saint-louis-vv1kvovpu_ga2r6bf | Lizzy McAlpine | 2027-05-15 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/lizzy-mcalpine-tickets/st-louis-missouri-stifel-theatre-2027-05-15-7-pm/concert/18619431 |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | Sombr | 2027-05-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | Hilary Duff | 2027-05-16 | Forest (Brussels) | no_candidates_returned | - |
| tm-valley-2027-leeds-1adfz_3gkihrzjf | Valley | 2027-05-16 | Leeds | no_candidates_returned | - |
| tm-greta-van-fleet-2027-assago-zg9rmiynyz7k7a | Greta Van Fleet | 2027-05-16 | Assago | no_candidates_returned | - |
| tm-malcolm-todd-2027-west-melbourne-1avgz_3gklkoff0 | Malcolm Todd | 2027-05-17 | West Melbourne | no_candidates_returned | - |
| tm-fall-out-boy-2027-praha-9-z698xzu0z16eepqfuf | Fall Out Boy | 2027-05-17 | Praha 9 | no_candidates_returned | - |
| tm-a-perfect-circle-2027-saint-louis-vv1akzkfugkdepcmi | A Perfect Circle | 2027-05-17 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/a-perfect-circle-tickets/st-louis-missouri-chaifetz-arena-2027-05-17-7-pm/concert/18632532 |
| tm-malcolm-todd-2027-west-melbourne-1avgz_3gkdbmub7 | Malcolm Todd | 2027-05-18 | West Melbourne | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | Thirty Seconds to Mars | 2027-05-18 | Praha 9 | no_candidates_returned | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | Sombr | 2027-05-19 | Praha 9 | no_candidates_returned | - |
| tm-malcolm-todd-2027-mt-claremont-1avgz_3gkl3ubod | Malcolm Todd | 2027-05-21 | Mt Claremont | no_candidates_returned | - |
| tm-fall-out-boy-2027-assago-zg9rmiynyzf1fa | Fall Out Boy | 2027-05-21 | Assago | no_candidates_returned | - |
| tm-malcolm-todd-2027-mt-claremont-1avgz_3gkydesct | Malcolm Todd | 2027-05-22 | Mt Claremont | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-tallinn-z698xz8kz16vpf_d-9 | Thirty Seconds to Mars | 2027-05-22 | Tallinn | no_candidates_returned | - |
| tm-garth-brooks-2027-belfast-16doz_p8zg7uaqj | Garth Brooks | 2027-05-22 | Belfast | no_candidates_returned | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | Greta Van Fleet | 2027-05-22 | Praha 9 | no_candidates_returned | - |
| tm-blondshell-2027-saint-louis-vv1kbz_kjdg7cpvx | Blondshell | 2027-05-22 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/blondshell-tickets/st-louis-missouri-delmar-hall-2027-05-22-8-pm/concert/18633511 |
| tm-garth-brooks-2027-belfast-1adoz_pgkmhjvms | Garth Brooks | 2027-05-23 | Belfast | no_candidates_returned | - |
| tm-megadeth-2027-west-valley-city-g5vzz_pjgpffk | Megadeth | 2027-05-24 | West Valley City | city_or_metro_match_failed | https://seatgeek.com/megadeth-tickets/salt-lake-city-utah-utah-first-credit-union-amphitheatre-2027-05-24-7-pm/concert/18778370 |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | Greta Van Fleet | 2027-05-25 | Forest (Brussels) | no_candidates_returned | - |
| tm-the-interrupters-2027-glasgow-1adbz_4gkd6f167 | The Interrupters | 2027-05-26 | Glasgow | no_candidates_returned | - |
| tm-andrea-bocelli-2027-praha-9-z698xzu0z1k3k74-f | Andrea Bocelli | 2027-05-27 | Praha 9 | no_candidates_returned | - |
| tm-tom-jones-2027-york-1agzk4jgkd-uxfr | Tom Jones | 2027-05-28 | York | no_candidates_returned | - |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | Rod Stewart | 2027-05-29 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-garth-brooks-2027-co-galway-16bzk403zza86av1 | Garth Brooks | 2027-05-29 | Co. Galway | no_candidates_returned | - |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | Sombr | 2027-05-29 | Vienna | no_candidates_returned | - |
| tm-garth-brooks-2027-co-galway-15voz_pof7p89 | Garth Brooks | 2027-05-30 | Co. Galway | no_candidates_returned | - |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | Andrea Bocelli | 2027-05-30 | Chorzów | no_candidates_returned | - |
| tm-leon-bridges-2027-warsaw-z698xzqpz1kfy4b8p | Leon Bridges | 2027-05-31 | Warsaw | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-warsaw-z698xzqpz1kkkaoxd | Sleeping With Sirens | 2027-06-02 | Warsaw | no_candidates_returned | - |
| tm-garth-brooks-2027-kilkenny-15voz_pod_pcp | Garth Brooks | 2027-06-04 | Kilkenny | no_candidates_returned | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | Nickelback | 2027-06-05 | Forest (Brussels) | no_candidates_returned | - |
| tm-garth-brooks-2027-kilkenny-1abzk408u-kze5v | Garth Brooks | 2027-06-05 | Kilkenny | no_candidates_returned | - |
| tm-sting-2027-gliwice-z698xzqpz1kckp0pa | Sting | 2027-06-06 | Gliwice | no_candidates_returned | - |
| tm-sting-2027-gdansk-sopot-z698xzqpz16vv6c7f6 | Sting | 2027-06-07 | Gdańsk/Sopot | no_candidates_returned | - |
| tm-motionless-in-white-2027-dubendorf-z698xzu3z16ezmoj16 | Motionless in White | 2027-06-08 | Dübendorf | no_candidates_returned | - |
| tm-sting-2027-krakow-z698xzqpz16evtf6jd | Sting | 2027-06-09 | Krakow | no_candidates_returned | - |
| tm-leon-bridges-2027-forest-brussels-z698xzg2z16vb_jsqs | Leon Bridges | 2027-06-09 | Forest (Brussels) | no_candidates_returned | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | Tame Impala | 2027-06-09 | Rotterdam | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1kvovpq_ga29ugj | Billy Strings | 2027-06-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-10-7-30-pm/concert/18755202 |
| tm-simple-plan-2027-sesto-san-giovanni-zg9rmiynyzff6k | Simple Plan | 2027-06-11 | Sesto San Giovanni | no_candidates_returned | - |
| tm-garth-brooks-2027-limerick-city-1kkzvp_dgaumnjq | Garth Brooks | 2027-06-11 | Limerick City | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1akzk4tgkdq3l2w | Billy Strings | 2027-06-11 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-11-7-30-pm/concert/18755210 |
| tm-garth-brooks-2027-limerick-city-1kkzvp_dgauzdjl | Garth Brooks | 2027-06-12 | Limerick City | no_candidates_returned | - |
| tm-sting-2027-magdeburg-z698xzc2z16vzxvefv | Sting | 2027-06-12 | Magdeburg | no_candidates_returned | - |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | Rod Stewart | 2027-06-13 | Trondheim | no_candidates_returned | - |
| tm-james-blunt-2027-idstein-z698xzc2z16vuazef3 | James Blunt | 2027-06-13 | Idstein | no_candidates_returned | - |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | Hayley Williams | 2027-06-14 | Forest (Brussels) | no_candidates_returned | - |
| tm-sombr-2027-co-dublin-1abzkf4gkd83jcw | Sombr | 2027-06-15 | Co. Dublin | no_candidates_returned | - |
| tm-foo-fighters-2027-k-benhavn-sv-z698xzc4z16vbe4w_s | Foo Fighters | 2027-06-15 | København SV | no_candidates_returned | - |
| tm-sting-2027-rastatt-z698xzc2z1ke30sgb | Sting | 2027-06-17 | Rastatt | no_candidates_returned | - |
| tm-tom-jones-2027-london-g5vhz_4bny4uy | Tom Jones | 2027-06-18 | London | no_candidates_returned | - |
| tm-garth-brooks-2027-cork-16voz_pozg7t0-b | Garth Brooks | 2027-06-18 | Cork | no_candidates_returned | - |
| tm-leon-bridges-2027-london-1adbz_pgkgzqsyx | Leon Bridges | 2027-06-18 | London | no_candidates_returned | - |
| tm-fontaines-d-c-2027-milano-zg9rmiynyzd1ve | Fontaines D.C. | 2027-06-19 | Milano | no_candidates_returned | - |
| tm-garth-brooks-2027-cork-16voz_pozg7nfxm | Garth Brooks | 2027-06-19 | Cork | no_candidates_returned | - |
| tm-the-interrupters-2027-k-benhavn-v-z698xzc4z1k8bb3pe | The Interrupters | 2027-06-21 | København V | no_candidates_returned | - |
| tm-alex-warren-2027-co-dublin-1abzkf-gkebtuoa | Alex Warren | 2027-06-22 | Co. Dublin | no_candidates_returned | - |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | Simply Red | 2027-06-22 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-kings-of-leon-2027-dublin-1avoz_fgktpkxi7 | Kings Of Leon | 2027-06-22 | Dublin | no_candidates_returned | - |
| tm-leon-bridges-2027-birmingham-g5dzz_peyxywx | Leon Bridges | 2027-06-22 | Birmingham | no_candidates_returned | - |
| tm-lola-young-2027-dublin-1avoz_ogknk-ukb | Lola Young | 2027-06-22 | Dublin | no_candidates_returned | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5u0fg | Dermot Kennedy | 2027-06-23 | Tramore Rd Cork | no_candidates_returned | - |
| tm-leon-bridges-2027-glasgow-1adbz_pgkmjk5az | Leon Bridges | 2027-06-23 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | 2027-06-23 | Assago | no_candidates_returned | - |
| tm-james-blunt-2027-llangollen-g5vhz_3nxrxc- | James Blunt | 2027-06-24 | Llangollen | no_candidates_returned | - |
| tm-raye-2027-dublin-1abzk4agkdp88vj | RAYE | 2027-06-24 | Dublin | no_candidates_returned | - |
| tm-amble-2027-co-dublin-17kzv0g62mxw25r | Amble | 2027-06-24 | Co. Dublin | no_candidates_returned | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5mff_ | Dermot Kennedy | 2027-06-24 | Tramore Rd Cork | no_candidates_returned | - |
| tm-kacey-musgraves-2027-dublin-1avoz_pgkmocyq- | Kacey Musgraves | 2027-06-24 | Dublin | no_candidates_returned | - |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | Rod Stewart | 2027-06-24 | Praha 9 | no_candidates_returned | - |
| tm-kacey-musgraves-2027-belfast-1adoz_pgkwxv3eu | Kacey Musgraves | 2027-06-25 | Belfast | no_candidates_returned | - |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkwypefm | Fontaines D.C. | 2027-06-26 | Co. Meath | no_candidates_returned | - |
| tm-shania-twain-2027-dublin-1abzk4pgkenqubp | Shania Twain | 2027-06-26 | Dublin | no_candidates_returned | - |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | Jack Johnson | 2027-06-26 | Forest (Brussels) | no_candidates_returned | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | Nickelback | 2027-06-26 | Praha 9 | no_candidates_returned | - |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkw7fwfl | Fontaines D.C. | 2027-06-27 | Co. Meath | no_candidates_returned | - |
| tm-bryan-adams-2027-nurnberg-z698xzc2z16vv6jt_f | Bryan Adams | 2027-06-27 | Nürnberg | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2027-pordenone-zg9rmiynyzfa6e | Queens Of The Stone Age | 2027-06-27 | Pordenone | no_candidates_returned | - |
| tm-tom-jones-2027-llangollen-g5vhz_pwfve8t | Tom Jones | 2027-06-28 | Llangollen | no_candidates_returned | - |
| tm-raye-2027-bergen-z698xzb_z16vgzpeao | RAYE | 2027-06-28 | Bergen | no_candidates_returned | - |
| tm-fontaines-d-c-2027-cardiff-g5vhz_oiinrjk | Fontaines D.C. | 2027-06-29 | Cardiff | no_candidates_returned | - |
| tm-amble-2027-glasgow-17uov0g62brrf6b | Amble | 2027-06-29 | Glasgow | no_candidates_returned | - |
| tm-simply-red-2027-nurnberg-z698xzc2z16v0aozkf | Simply Red | 2027-06-29 | Nürnberg | no_candidates_returned | - |
| tm-sting-2027-klagenfurt-z698xz5rz1kgyvv34 | Sting | 2027-06-30 | Klagenfurt | no_candidates_returned | - |
| tm-sam-fender-2027-dublin-1avoz_fgkxvywdt | Sam Fender | 2027-07-01 | Dublin | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4eimdn_ | Jack Johnson | 2027-07-02 | St Austell | no_candidates_returned | - |
| tm-bryan-adams-2027-halle-westfalen-z698xzc2z16voo4puj | Bryan Adams | 2027-07-02 | Halle (Westfalen) | no_candidates_returned | - |
| tm-amble-2027-limerick-city-17kzv0g62sp3q8m | Amble | 2027-07-03 | Limerick City | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4d63ah_ | Jack Johnson | 2027-07-03 | St Austell | no_candidates_returned | - |
| tm-pink-martini-2027-liverpool-g5vhz_fpr6w_w | Pink Martini | 2027-07-03 | Liverpool | no_candidates_returned | - |
| tm-andrea-bocelli-2027-portici-napoli-zg9rmiynyzf176 | Andrea Bocelli | 2027-07-03 | Portici (Napoli) | no_candidates_returned | - |
| tm-noah-kahan-2027-milano-zg9rmiynyzfa6d | Noah Kahan | 2027-07-04 | Milano | no_candidates_returned | - |
| tm-dylan-gossett-2027-bournemouth-g5dzz_pjb4swt | Dylan Gossett | 2027-07-05 | Bournemouth | no_candidates_returned | - |
| tm-bryan-adams-2027-bonn-z698xzc2z16v89qo0p | Bryan Adams | 2027-07-06 | Bonn | no_candidates_returned | - |
| tm-dylan-gossett-2027-nottingham-g5vhz_ph339p8 | Dylan Gossett | 2027-07-06 | Nottingham | no_candidates_returned | - |
| tm-sting-2027-verona-zg9rmiynyzf61a | Sting | 2027-07-06 | Verona | no_candidates_returned | - |
| tm-simply-red-2027-bonn-z698xzc2z1kpoq9-n | Simply Red | 2027-07-07 | Bonn | no_candidates_returned | - |
| tm-bryan-adams-2027-rosenheim-z698xzc2z16eva4pqp | Bryan Adams | 2027-07-08 | Rosenheim | no_candidates_returned | - |
| tm-amble-2027-london-g5vhz_8sflgki | Amble | 2027-07-09 | London | no_candidates_returned | - |
| tm-simply-red-2027-halle-westfalen-z698xzc2z1kj7akbg | Simply Red | 2027-07-09 | Halle (Westfalen) | no_candidates_returned | - |
| tm-mumford-sons-2027-milwaukee-vv1a6zk40gkdo7krz | Mumford & Sons | 2027-07-09 | Milwaukee | conflicting_same_date_city_candidates | https://seatgeek.com/mumford-sons-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-09-7-pm/concert/18753195 |
| tm-tom-jones-2027-newcastle-g5vhz_pjbj04_ | Tom Jones | 2027-07-11 | Newcastle | no_candidates_returned | - |
| tm-alex-warren-2027-rho-zg9rmiynyzae7k | Alex Warren | 2027-07-11 | Rho | no_candidates_returned | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | 2027-07-13 | Glasgow | no_candidates_returned | - |
| tm-the-neighbourhood-2027-firenze-zg9rmiynyzfavv | The Neighbourhood | 2027-07-13 | Firenze | no_candidates_returned | - |
| tm-sombr-2027-milano-zg9rmiynyzd611 | Sombr | 2027-07-14 | Milano | no_candidates_returned | - |
| tm-greta-van-fleet-2027-saint-louis-vv17bz_kgkm_stkv | Greta Van Fleet | 2027-07-14 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/greta-van-fleet-tickets/st-louis-missouri-chaifetz-arena-2027-07-14-7-pm/concert/18642010 |
| tm-noah-kahan-2027-dublin-1abzkffgkeyrrov | Noah Kahan | 2027-07-17 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2027-dublin-1abzkfbgkd7h5py | Noah Kahan | 2027-07-18 | Dublin | no_candidates_returned | - |
| tm-slipknot-2027-queens-g5vvz_kci8xei | Slipknot | 2027-07-18 | Queens | city_or_metro_match_failed | https://seatgeek.com/slipknot-tickets/flushing-new-york-citi-field-2027-07-18-6-30-pm/concert/18626576 |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | Rod Stewart | 2027-07-20 | Krakow | no_candidates_returned | - |
| tm-stray-kids-2027-vienna-z698xz5rz16vofpore | Stray Kids | 2027-07-21 | Vienna | no_candidates_returned | - |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | Santana | 2027-07-24 | Krakow | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-los-angeles-z7r9jz1aaaf4v | KPop Demon Hunters | 2027-07-31 | Los Angeles | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/los-angeles-california-crypto-com-arena-2027-07-31-7-30-pm/concert/18772730 |
| tm-fall-out-boy-2027-queens-g5vvz_pkqtkyp | Fall Out Boy | 2027-08-01 | Queens | city_or_metro_match_failed | https://seatgeek.com/fall-out-boy-tickets/flushing-new-york-citi-field-2027-08-01-5-30-pm/concert/18753416 |
| tm-kpop-demon-hunters-2027-las-vegas-z7r9jz1aaa_kp | KPop Demon Hunters | 2027-08-07 | Las Vegas | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/las-vegas-nevada-t-mobile-arena-2027-08-07-7-30-pm/concert/18772712 |
| tm-bryan-adams-2027-baunatal-z698xzc2z1kxv_kf3 | Bryan Adams | 2027-08-10 | Baunatal | no_candidates_returned | - |
| tm-simply-red-2027-halifax-1agzkfigkey3exj | Simply Red | 2027-08-11 | Halifax | no_candidates_returned | - |
| tm-bryan-adams-2027-erfurt-z698xzc2z1kczab8v | Bryan Adams | 2027-08-11 | Erfurt | no_candidates_returned | - |
| tm-bryan-adams-2027-deggendorf-z698xzc2z1kaap_ay | Bryan Adams | 2027-08-15 | Deggendorf | no_candidates_returned | - |
| tm-harry-styles-2027-dublin-1abzkftgkexalp_ | Harry Styles | 2027-08-18 | Dublin | no_candidates_returned | - |
| tm-harry-styles-2027-dublin-1avoz_3gkn1nb3y | Harry Styles | 2027-08-20 | Dublin | no_candidates_returned | - |
| tm-simply-red-2027-newmarket-1amzkfygkdj2ef1 | Simply Red | 2027-08-21 | Newmarket | no_candidates_returned | - |
| tm-harry-styles-2027-dublin-1avoz_3gklibgmq | Harry Styles | 2027-08-21 | Dublin | no_candidates_returned | - |
| tm-simply-red-2027-dublin-1avoz_pgkcw_dua | Simply Red | 2027-08-24 | Dublin | no_candidates_returned | - |
| tm-oasis-2027-co-meath-1avoz_3gkrnpmuo | Oasis | 2027-09-04 | Co. Meath | no_candidates_returned | - |
| tm-oasis-2027-co-meath-1avoz_3gkrn9ru4 | Oasis | 2027-09-05 | Co. Meath | no_candidates_returned | - |
| tm-passenger-2027-dublin-1avoz_8gkm9ghn7 | Passenger | 2027-09-07 | Dublin | no_candidates_returned | - |
| tm-passenger-2027-belfast-16zzkfkojzage16c | Passenger | 2027-09-08 | Belfast | no_candidates_returned | - |
| tm-travis-tritt-2027-saint-louis-1a-zk4igkdyooqa | Travis Tritt | 2027-09-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/travis-tritt-tickets/chesterfield-missouri-the-factory-stl-2027-09-10-8-pm/concert/18757697 |
| tm-kings-of-leon-2027-west-valley-city-g5vzz_p2iqpnf | Kings Of Leon | 2027-09-11 | West Valley City | city_or_metro_match_failed | https://seatgeek.com/kings-of-leon-tickets/salt-lake-city-utah-utah-first-credit-union-amphitheatre-2027-09-11-7-30-pm/concert/18746662 |
| tm-foo-fighters-2027-dublin-1avoz_3gktbqeds | Foo Fighters | 2027-09-18 | Dublin | no_candidates_returned | - |
| tm-andrea-bocelli-2027-pollenzo-cuneo-zg9rmiynyzf17f | Andrea Bocelli | 2027-09-25 | Pollenzo (Cuneo) | no_candidates_returned | - |
| tm-nickelback-2027-waurn-ponds-1akzk4fgker3psp | Nickelback | 2027-10-09 | Waurn Ponds | no_candidates_returned | - |
| tm-meshuggah-2027-warsaw-z698xzqpz1kgpab4t | Meshuggah | 2027-10-10 | Warsaw | no_candidates_returned | - |
| tm-nickelback-2027-pokolbin-1akzk46gkdiziaq | Nickelback | 2027-10-16 | Pokolbin | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-birmingham-1aegz_pgkm7p-do | KPop Demon Hunters | 2027-10-16 | Birmingham | no_candidates_returned | - |
| tm-nickelback-2027-pokolbin-1avgz_4c70szdc8v | Nickelback | 2027-10-17 | Pokolbin | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-london-1adfz_pgkmklpyh | KPop Demon Hunters | 2027-10-23 | London | no_candidates_returned | - |
| tm-passenger-2027-brisbane-1avgz_8gkmdlzyi | Passenger | 2027-10-27 | Brisbane | no_candidates_returned | - |
| tm-passenger-2027-st-kilda-1avgz_8gkm6pbt5 | Passenger | 2027-10-29 | St Kilda | no_candidates_returned | - |
| tm-passenger-2027-sydney-16vgz_oayg7zvfp | Passenger | 2027-10-30 | Sydney | no_candidates_returned | - |
| tm-mat-kearney-2027-saint-louis-vv1kvovp4agag9idz | Mat Kearney | 2027-11-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/mat-kearney-tickets/st-louis-missouri-the-pageant-st-louis-2027-11-13-7-30-pm/concert/18725685 |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | Polyphia | 2026-11-23 | Madrid | no_candidates_returned | - |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | Bryson Tiller | 2026-11-24 | Amsterdam | no_candidates_returned | - |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | Bryson Tiller | 2026-11-26 | Düsseldorf | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2sm8u | Harry Styles | 2026-11-27 | Docklands | no_candidates_returned | - |
| tm-fontaines-d-c-2026-london-1agzkfogkenxxaj | Fontaines D.C. | 2026-11-27 | London | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-16efz_dckg7slsc | Harry Styles | 2026-11-28 | Docklands | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2mxoc | Harry Styles | 2026-12-02 | Docklands | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2broi | Harry Styles | 2026-12-04 | Docklands | no_candidates_returned | - |
| tm-bryson-tiller-2026-leeds-g5vhz_5siv57- | Bryson Tiller | 2026-12-04 | Leeds | no_candidates_returned | - |
| tm-interpol-2026-london-1amzk4xgkd2vp1g | Interpol | 2026-12-04 | London | no_candidates_returned | - |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | Polyphia | 2026-12-05 | Berlin | no_candidates_returned | - |
| tm-gorillaz-2026-zapopan-g5dvz_8mtgfu6 | Gorillaz | 2026-12-09 | Zapopan | no_candidates_returned | - |
| tm-gorillaz-2026-ciudad-de-mexico-1av8z_4gkm7aqri | Gorillaz | 2026-12-11 | Ciudad de México | no_candidates_returned | - |
| tm-blondshell-2026-manchester-g5dzz_anefaed | Blondshell | 2026-12-12 | Manchester | no_candidates_returned | - |
| tm-polyphia-2026-manchester-g5vhz_gr4jgl2 | Polyphia | 2026-12-12 | Manchester | no_candidates_returned | - |
| tm-blondshell-2026-glasgow-17uov0g616cnj6j | Blondshell | 2026-12-13 | Glasgow | no_candidates_returned | - |
| tm-blondshell-2026-london-g5vhz_adn7kja | Blondshell | 2026-12-15 | London | no_candidates_returned | - |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | Koe Wetzel | 2027-01-08 | Rohnert Park | no_candidates_returned | - |
| tm-black-stone-cherry-2027-bournemouth-g5dzz_g9ioeuq | Black Stone Cherry | 2027-01-14 | Bournemouth | no_candidates_returned | - |
| tm-hayley-williams-2027-zapopan-17azv0g65ulwtlf | Hayley Williams | 2027-01-17 | Zapopan | no_candidates_returned | - |
| tm-black-stone-cherry-2027-london-g5dzzbzpu7g4_ | Black Stone Cherry | 2027-01-22 | London | no_candidates_returned | - |
| tm-black-stone-cherry-2027-london-g5dzzbz9kujcl | Black Stone Cherry | 2027-01-23 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-toronto-1avzz_kgks022ry | Dancing With The Stars | 2027-01-24 | Toronto | no_candidates_returned | - |
| tm-black-stone-cherry-2027-nottingham-g5vhzbzpq5krb | Black Stone Cherry | 2027-01-26 | Nottingham | no_candidates_returned | - |
| tm-the-psychedelic-furs-2027-birmingham-g5dzz_kk-v07y | The Psychedelic Furs | 2027-01-26 | Birmingham | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnenx | Fuerza Regida | 2027-01-28 | Ciudad de México | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | Five Finger Death Punch | 2027-01-29 | Łódź | no_candidates_returned | - |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | Mico | 2027-01-29 | Amsterdam | no_candidates_returned | - |
| tm-sylvan-esso-2027-london-g5dzz_fua9vy_ | Sylvan Esso | 2027-01-29 | London | no_candidates_returned | - |
| tm-aespa-2027-milano-zg9rmiynyzekk1 | aespa | 2027-01-29 | Milano | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdlzcpt | Fuerza Regida | 2027-01-29 | Ciudad de México | no_candidates_returned | - |
| tm-sombr-2027-mexico-1av8z_agkn6tndi | Sombr | 2027-01-29 | México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdowrar | Fuerza Regida | 2027-01-30 | Ciudad de México | no_candidates_returned | - |
| tm-sombr-2027-mexico-1av8z_agknaoeux | Sombr | 2027-01-30 | México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdxsfp_ | Fuerza Regida | 2027-01-31 | Ciudad de México | no_candidates_returned | - |
| tm-mico-2027-manchester-g5vhz_flmnkjc | Mico | 2027-02-01 | Manchester | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdn9bgh | Fuerza Regida | 2027-02-01 | Ciudad de México | no_candidates_returned | - |
| tm-black-stone-cherry-2027-manchester-g5vhzbzkgpts1 | Black Stone Cherry | 2027-02-02 | Manchester | no_candidates_returned | - |
| tm-black-stone-cherry-2027-norwich-g5vhzbzpkx4ut | Black Stone Cherry | 2027-02-03 | Norwich | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacn3ld | Fuerza Regida | 2027-02-03 | Ciudad de México | no_candidates_returned | - |
| tm-mico-2027-london-g5vhz_fjlqa3s | Mico | 2027-02-04 | London | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgauwxey | Fuerza Regida | 2027-02-04 | Ciudad de México | no_candidates_returned | - |
| tm-grace-potter-2027-saint-louis-vv1kbz_pq9g7dnzn | Grace Potter | 2027-02-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/grace-potter-the-nocturnals-tickets/st-louis-missouri-the-pageant-st-louis-2027-02-04-8-pm/concert/18755522 |
| tm-black-stone-cherry-2027-edinburgh-g5dzzbzk-605z | Black Stone Cherry | 2027-02-06 | Edinburgh | no_candidates_returned | - |
| tm-black-stone-cherry-2027-newcastle-upon-tyne-g5dzz_g10kk11 | Black Stone Cherry | 2027-02-09 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | Amble | 2027-02-09 | Madrid | no_candidates_returned | - |
| tm-bts-2027-docklands-17a8v0g65r_eq8g | BTS | 2027-02-10 | Docklands | no_candidates_returned | - |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | Amble | 2027-02-10 | Barcelona | no_candidates_returned | - |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | Role Model | 2027-02-11 | Berlin | no_candidates_returned | - |
| tm-bts-2027-docklands-17a8v0g659_gumr | BTS | 2027-02-12 | Docklands | no_candidates_returned | - |
| tm-bts-2027-docklands-17a8v0g65r_ew8m | BTS | 2027-02-13 | Docklands | no_candidates_returned | - |
| tm-hilary-duff-2027-zapopan-1av8z_fgknzgqjq | Hilary Duff | 2027-02-15 | Zapopan | no_candidates_returned | - |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | Role Model | 2027-02-17 | Düsseldorf | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_o37vvzdckk | Bruno Mars | 2027-02-19 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknww0xk | Bruno Mars | 2027-02-20 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx7x5 | Bruno Mars | 2027-02-23 | Docklands | no_candidates_returned | - |
| tm-hollywood-undead-2027-birmingham-g5dzz_k9em7do | Hollywood Undead | 2027-02-23 | Birmingham | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx0x2 | Bruno Mars | 2027-02-24 | Docklands | no_candidates_returned | - |
| tm-jake-bugg-2027-london-g5vhz_olkluto | Jake Bugg | 2027-02-25 | London | no_candidates_returned | - |
| tm-hollywood-undead-2027-manchester-g5vhz_kjdvnwu | Hollywood Undead | 2027-02-26 | Manchester | no_candidates_returned | - |
| tm-hollywood-undead-2027-glasgow-g5dzz_kpssdt2 | Hollywood Undead | 2027-02-27 | Glasgow | no_candidates_returned | - |
| tm-hollywood-undead-2027-leeds-g5dzz_krmlxyq | Hollywood Undead | 2027-02-28 | Leeds | no_candidates_returned | - |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgknd3rue | Tame Impala | 2027-02-28 | Ciudad de México | no_candidates_returned | - |
| tm-cage-the-elephant-2027-london-g5vhz_3r6zval | Cage The Elephant | 2027-03-01 | London | no_candidates_returned | - |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgklvjvrt | Tame Impala | 2027-03-01 | Ciudad de México | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj | Sleeping With Sirens | 2027-03-02 | Bristol | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-glasgow-g5dzz_g5isp0f | Sleeping With Sirens | 2027-03-03 | Glasgow | no_candidates_returned | - |
| tm-bon-jovi-2027-docklands-1aefz_fgkxe60v9 | Bon Jovi | 2027-03-04 | Docklands | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-manchester-g5vhz_gfgtq6v | Sleeping With Sirens | 2027-03-05 | Manchester | no_candidates_returned | - |
| tm-the-dead-south-2027-manchester-17u8v0g6gm8i6t0 | The Dead South | 2027-03-06 | Manchester | no_candidates_returned | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | The Warning | 2027-03-09 | Madrid | no_candidates_returned | - |
| tm-the-dead-south-2027-wolverhampton-g5vhz_2b_qppl | The Dead South | 2027-03-10 | Wolverhampton | no_candidates_returned | - |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | The Warning | 2027-03-10 | Barcelona | no_candidates_returned | - |
| tm-the-dead-south-2027-cardiff-17uov0g6gpgz4uf | The Dead South | 2027-03-12 | Cardiff | no_candidates_returned | - |
| tm-kaleo-2027-madrid-z698xz2qz1kuvp4rv | KALEO | 2027-03-14 | Madrid | no_candidates_returned | - |
| tm-megadeth-2027-cardiff-17uov0g62hgl_w2 | Megadeth | 2027-03-15 | Cardiff | no_candidates_returned | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogksqr0wn | Bruno Mars | 2027-03-16 | Auckland | no_candidates_returned | - |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | James Blunt | 2027-03-16 | Oslo | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | Teddy Swims | 2027-03-18 | Amsterdam | no_candidates_returned | - |
| tm-megadeth-2027-leeds-g5vhz_2hqzflr | Megadeth | 2027-03-19 | Leeds | no_candidates_returned | - |
| tm-stella-lefty-2027-manchester-g5dzz_36uppzk | Stella Lefty | 2027-03-19 | Manchester | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogku9epc3 | Fontaines D.C. | 2027-03-24 | México | no_candidates_returned | - |
| tm-leon-bridges-2027-mexico-1kazvppagacnsha | Leon Bridges | 2027-03-24 | México | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogkxugz79 | Fontaines D.C. | 2027-03-25 | México | no_candidates_returned | - |
| tm-james-blunt-2027-leeds-g5vhz_8rglm2f | James Blunt | 2027-03-26 | Leeds | no_candidates_returned | - |
| tm-jake-bugg-2027-madrid-z698xz2qz1k_y8v-_ | Jake Bugg | 2027-04-06 | Madrid | no_candidates_returned | - |
| tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx | Brandi Carlile | 2027-04-07 | Glasgow | no_candidates_returned | - |
| tm-jake-bugg-2027-barcelona-z698xz2qz16vps_0bf | Jake Bugg | 2027-04-07 | Barcelona | no_candidates_returned | - |
| tm-anuel-aa-2027-monterrey-g5dvz_6rcdk4r | Anuel AA | 2027-04-08 | Monterrey | no_candidates_returned | - |
| tm-anuel-aa-2027-zapopan-g5dvz_6raf6md | Anuel AA | 2027-04-15 | Zapopan | no_candidates_returned | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | Simple Minds | 2027-04-20 | Munich | no_candidates_returned | - |
| tm-erasure-2027-liverpool-1amzkfugkdiq68r | Erasure | 2027-04-28 | Liverpool | no_candidates_returned | - |
| tm-the-dead-south-2027-kansas-city-vv1akzk40gkemk2eh | The Dead South | 2027-04-28 | Kansas City | no_candidates_returned | - |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | Bryan Adams | 2027-05-03 | Oslo | no_candidates_returned | - |
| tm-erasure-2027-nottingham-1agzkfmgkd2kzuu | Erasure | 2027-05-05 | Nottingham | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | Thirty Seconds to Mars | 2027-05-05 | Nürnberg | no_candidates_returned | - |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | Bryan Adams | 2027-05-07 | Helsinki | no_candidates_returned | - |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | Mei Semones | 2027-05-07 | Columbus | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdnvnrg | Niall Horan | 2027-05-07 | Ciudad de México | no_candidates_returned | - |
| tm-erasure-2027-leeds-g5vhz_kldd9ue | Erasure | 2027-05-08 | Leeds | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdpr1hq | Niall Horan | 2027-05-08 | Ciudad de México | no_candidates_returned | - |
| tm-erasure-2027-glasgow-1auzkfzgkds5h6i | Erasure | 2027-05-09 | Glasgow | no_candidates_returned | - |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | 2027-05-11 | Leeds | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz16vasca3z | U2 | 2027-05-13 | Barcelona | no_candidates_returned | - |
| tm-phoebe-bridgers-2027-ciudad-de-mexico-1afzk4egkey1bcx | Phoebe Bridgers | 2027-05-13 | Ciudad de México | no_candidates_returned | - |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | 2027-05-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-valley-2027-london-g5dzz_3vpsj3z | Valley | 2027-05-14 | London | no_candidates_returned | - |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | Greta Van Fleet | 2027-05-15 | Munich | no_candidates_returned | - |
| tm-jay-wheeler-2027-mexico-16fzkfupgza8kga7 | Jay Wheeler | 2027-05-16 | México | no_candidates_returned | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | 2027-05-17 | Leeds | no_candidates_returned | - |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | Hilary Duff | 2027-05-17 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz16ezagpe7 | U2 | 2027-05-17 | Barcelona | no_candidates_returned | - |
| tm-garth-brooks-2027-belfast-16doz_p8zg7ggqn | Garth Brooks | 2027-05-21 | Belfast | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0z0z | FEID | 2027-05-21 | Ciudad de México | no_candidates_returned | - |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | 2027-05-22 | Leeds | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0zp7 | FEID | 2027-05-22 | Ciudad de México | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gktipbpa | FEID | 2027-05-23 | Ciudad de México | no_candidates_returned | - |
| tm-fall-out-boy-2027-brussels-z698xzg2z16vfjc3ef | Fall Out Boy | 2027-05-27 | Brussels | no_candidates_returned | - |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | Weezer | 2027-05-29 | Oslo | no_candidates_returned | - |
| tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov | Greta Van Fleet | 2027-05-30 | Birmingham | no_candidates_returned | - |
| tm-megadeth-2027-kansas-city-1ae7z_pgki7igc3 | Megadeth | 2027-05-31 | Kansas City | city_or_metro_match_failed | https://seatgeek.com/megadeth-tickets/riverside-missouri-morton-amphitheater-2027-05-31-7-pm/concert/18778374 |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | Weezer | 2027-06-01 | Helsinki | no_candidates_returned | - |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | Sombr | 2027-06-01 | Amsterdam | no_candidates_returned | - |
| tm-the-interrupters-2027-london-g5vhz_4d3nbns | The Interrupters | 2027-06-01 | London | no_candidates_returned | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | Karol G | 2027-06-03 | Barcelona | no_candidates_returned | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | Karol G | 2027-06-04 | Barcelona | no_candidates_returned | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | Tame Impala | 2027-06-07 | Rotterdam | no_candidates_returned | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | Tame Impala | 2027-06-08 | Rotterdam | no_candidates_returned | - |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | Rod Stewart | 2027-06-09 | Helsinki | no_candidates_returned | - |
| tm-sting-2027-odz-z698xzqpz1k06xapf | Sting | 2027-06-10 | Łódź | no_candidates_returned | - |
| tm-foo-fighters-2027-helsinki-z698xz8kz1kp9zozn | Foo Fighters | 2027-06-12 | Helsinki | no_candidates_returned | - |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | 2027-06-13 | Milano | no_candidates_returned | - |
| tm-fall-out-boy-2027-odz-z698xzqpz16evyz9fj | Fall Out Boy | 2027-06-13 | Łódź | no_candidates_returned | - |
| tm-leon-bridges-2027-bristol-1adfz_pgkidfay7 | Leon Bridges | 2027-06-15 | Bristol | no_candidates_returned | - |
| tm-james-blunt-2027-lincoln-g5vhz_on_qxm9 | James Blunt | 2027-06-16 | Lincoln | no_candidates_returned | - |
| tm-shania-twain-2027-glasgow-1adbz_fgkuptsoi | Shania Twain | 2027-06-17 | Glasgow | no_candidates_returned | - |
| tm-leon-bridges-2027-london-1adbz_pgkgzqvyv | Leon Bridges | 2027-06-17 | London | no_candidates_returned | - |
| tm-james-blunt-2027-thetford-1adjz_pgkw4p4i3 | James Blunt | 2027-06-18 | Thetford | no_candidates_returned | - |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | Simply Red | 2027-06-19 | Amsterdam | no_candidates_returned | - |
| tm-alex-warren-2027-cardiff-g5vhz_3c3nozb | Alex Warren | 2027-06-20 | Cardiff | no_candidates_returned | - |
| tm-tom-jones-2027-liverpool-g5vhz_pqm3anq | Tom Jones | 2027-06-20 | Liverpool | no_candidates_returned | - |
| tm-sting-2027-hemer-z698xzc2z16vagofpv | Sting | 2027-06-20 | Hemer | no_candidates_returned | - |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | Rod Stewart | 2027-06-20 | Munich | no_candidates_returned | - |
| tm-shania-twain-2027-cardiff-g5vhz_kljqj-d | Shania Twain | 2027-06-22 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-gloucestershire-16mzk4yjeza8ddu2 | James Blunt | 2027-06-23 | Gloucestershire | no_candidates_returned | - |
| tm-amble-2027-belfast-17czv0g62qetzl- | Amble | 2027-06-23 | Belfast | no_candidates_returned | - |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | Karol G | 2027-06-24 | Madrid | no_candidates_returned | - |
| tm-tom-jones-2027-rugeley-1amzk4tgkejv7jb | Tom Jones | 2027-06-25 | Rugeley | no_candidates_returned | - |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | Karol G | 2027-06-25 | Madrid | no_candidates_returned | - |
| tm-dermot-kennedy-2027-belfast-1azzk4kgkeju-cx | Dermot Kennedy | 2027-06-26 | Belfast | no_candidates_returned | - |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | Karol G | 2027-06-26 | Madrid | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-hamilton-1avzz_pgknnsz0d | KPop Demon Hunters | 2027-06-26 | Hamilton | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/hamilton-canada-td-coliseum-2027-06-26-2-pm/concert/18772680 |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | Karol G | 2027-06-27 | Madrid | no_candidates_returned | - |
| tm-sting-2027-konstanz-z698xzc2z1kjfov_n | Sting | 2027-06-27 | Konstanz | no_candidates_returned | - |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | Simply Red | 2027-06-30 | Fulda | no_candidates_returned | - |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | Nickelback | 2027-07-01 | Łódź | no_candidates_returned | - |
| tm-pink-martini-2027-london-g5vhz_fqbbwez | Pink Martini | 2027-07-02 | London | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z | Fontaines D.C. | 2027-07-03 | Manchester | no_candidates_returned | - |
| tm-simply-red-2027-hemer-z698xzc2z16v_nfy_4 | Simply Red | 2027-07-03 | Hemer | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt | Fontaines D.C. | 2027-07-04 | Manchester | no_candidates_returned | - |
| tm-bryan-adams-2027-hemer-z698xzc2z1k_buyvn | Bryan Adams | 2027-07-04 | Hemer | no_candidates_returned | - |
| tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj | Pink Martini | 2027-07-04 | Edinburgh | no_candidates_returned | - |
| tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl | Fontaines D.C. | 2027-07-06 | Glasgow | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | 2027-07-08 | Edinburgh | no_candidates_returned | - |
| tm-amble-2027-manchester-g5vhz_8upt3w4 | Amble | 2027-07-08 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1adbz_4gkm8ikcj | Sam Fender | 2027-07-10 | Edinburgh | no_candidates_returned | - |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | Oasis | 2027-07-10 | Barcelona | no_candidates_returned | - |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | Oasis | 2027-07-11 | Barcelona | no_candidates_returned | - |
| tm-stray-kids-2027-barcelona-z698xz2qz16vod48ea | Stray Kids | 2027-07-24 | Barcelona | no_candidates_returned | - |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | Rod Stewart | 2027-07-24 | Hannover | no_candidates_returned | - |
| tm-rod-stewart-2027-hamburg-z698xzc2z16vxb1oag | Rod Stewart | 2027-07-25 | Hamburg | no_candidates_returned | - |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | Santana | 2027-07-28 | Oslo | no_candidates_returned | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | Harry Styles | 2027-07-30 | Madrid | no_candidates_returned | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | Harry Styles | 2027-07-31 | Madrid | no_candidates_returned | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | Harry Styles | 2027-08-02 | Madrid | no_candidates_returned | - |
| tm-simply-red-2027-chester-1agzkfsgkduxpco | Simply Red | 2027-08-07 | Chester | no_candidates_returned | - |
| tm-fall-out-boy-2027-kansas-city-1a-zk40gkd1psok | Fall Out Boy | 2027-08-07 | Kansas City | city_or_metro_match_failed | https://seatgeek.com/fall-out-boy-tickets/riverside-missouri-morton-amphitheater-2027-08-07-5-30-pm/concert/18753424 |
| tm-bryan-adams-2027-magdeburg-z698xzc2z16vb8r7pg | Bryan Adams | 2027-08-13 | Magdeburg | no_candidates_returned | - |
| tm-simply-red-2027-swansea-g5vhz_3rbtf3u | Simply Red | 2027-08-20 | Swansea | no_candidates_returned | - |
| tm-james-blunt-2027-margate-1agzkfegkdf5svi | James Blunt | 2027-08-27 | Margate | no_candidates_returned | - |
| tm-james-blunt-2027-colchester-1agzk4fgkdt9fe6 | James Blunt | 2027-08-28 | Colchester | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gklfny3e | Oasis | 2027-09-11 | Stevenage | artist_match_failed | https://seatgeek.com/supersonic-tickets/asbury-park-new-jersey-asbury-lanes-2027-09-11-8-pm/concert/18798974 |
| tm-oasis-2027-stevenage-1adjz_3gkrrmy7n | Oasis | 2027-09-12 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx | Passenger | 2027-09-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-sienna-spiro-2027-mexico-1afzk4ogkeyuq9e | Sienna Spiro | 2027-09-14 | México | no_candidates_returned | - |
| tm-foo-fighters-2027-edinburgh-1auzkfegkecn0w6 | Foo Fighters | 2027-09-16 | Edinburgh | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrnjt4_ | Oasis | 2027-09-18 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkreiyj0 | Oasis | 2027-09-19 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrs3n_k | Oasis | 2027-09-25 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrz1qva | Oasis | 2027-09-26 | Stevenage | no_candidates_returned | - |
| tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 | Eros Ramazzotti | 2027-09-29 | Boston | conflicting_same_date_city_candidates | https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/18663233 |
| tm-bon-jovi-2027-south-bend-vv1kv8vp_zga5o3gv | Bon Jovi | 2027-10-02 | South Bend | city_or_metro_match_failed | https://seatgeek.com/bon-jovi-tickets/notre-dame-indiana-notre-dame-stadium-2027-10-02-6-30-pm/concert/18744634 |
| tm-meshuggah-2027-manchester-1adfz_4gkvdqmcy | Meshuggah | 2027-10-29 | Manchester | no_candidates_returned | - |
| tm-fontaines-d-c-2026-manchester-g5vhz_okyh0m1 | Fontaines D.C. | 2026-11-21 | Manchester | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | Noah Kahan | 2026-11-21 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | Noah Kahan | 2026-11-22 | Dublin | no_candidates_returned | - |
| tm-trans-siberian-orchestra-2026-youngstown-vv1aazkfagkd2zwpt | Trans-Siberian Orchestra | 2026-11-22 | Youngstown | conflicting_same_date_city_candidates | https://seatgeek.com/trans-siberian-orchestra-tickets/youngstown-ohio-covelli-centre-2026-11-22-2-30-pm/concert/18573365 |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | RUFUS DU SOL | 2026-11-22 | Las Vegas | conflicting_same_date_city_candidates | https://seatgeek.com/rufus-du-sol-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-11-22-10-30-pm/concert/18639573 |
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4cgv | Phoebe Bridgers | 2026-11-23 | Dublin | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4mgk | Phoebe Bridgers | 2026-11-24 | Dublin | no_candidates_returned | - |
| tm-sting-2026-tampa-vvg1vzbpivbfyz | Sting | 2026-11-24 | Tampa | city_or_metro_match_failed | https://seatgeek.com/sting-tickets/orlando-florida-hard-rock-live-orlando-2026-11-24-8-pm/concert/17898563 |
| tm-dermot-kennedy-2026-christchurch-1ae8z_agkm57djw | Dermot Kennedy | 2026-11-25 | Christchurch | no_candidates_returned | - |
| tm-dermot-kennedy-2026-auckland-1ae8z_agkranxjl | Dermot Kennedy | 2026-11-28 | Auckland | no_candidates_returned | - |
| tm-interpol-2026-dublin-1abzkuogkdez9hd | Interpol | 2026-11-30 | Dublin | no_candidates_returned | - |
| tm-mariah-carey-2026-london-1agzkfsgkdzymm6 | Mariah Carey | 2026-11-30 | London | no_candidates_returned | - |
| tm-boyz-ii-men-2026-auckland-17azv0g6c2evn3t | Boyz II Men | 2026-12-01 | Auckland | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | 2026-12-01 | London | no_candidates_returned | - |
| tm-chris-stapleton-2026-nashville-g5viz_kleeols | Chris Stapleton | 2026-12-01 | Nashville | no_candidates_returned | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | Andrea Bocelli | 2026-12-02 | Abu Dhabi | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | 2026-12-02 | London | no_candidates_returned | - |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | Tommy Emmanuel | 2026-12-04 | Newberry | no_candidates_returned | - |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | 2026-12-05 | Cardiff | no_candidates_returned | - |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | 2026-12-07 | London | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-adelaide-17a8v0g6cj0fp2t | Queens Of The Stone Age | 2026-12-08 | Adelaide | no_candidates_returned | - |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | Jay Wheeler | 2026-12-08 | Valencia | no_candidates_returned | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | Jay Wheeler | 2026-12-10 | Bilbao | no_candidates_returned | - |
| tm-dylan-gossett-2026-waipara-17azv0g653pu3v4 | Dylan Gossett | 2026-12-12 | Waipara | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1ka8v0ukgagf72c | Harry Styles | 2026-12-12 | Sydney Olympic Park | no_candidates_returned | - |
| tm-a-perfect-circle-2026-auckland-1ae8z_kgkr16koz | A Perfect Circle | 2026-12-13 | Auckland | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1apzk8ugkdafgq9 | Harry Styles | 2026-12-13 | Sydney Olympic Park | no_candidates_returned | - |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | Jay Wheeler | 2026-12-13 | Madrid | no_candidates_returned | - |
| tm-jodeci-2026-st-petersburg-vvg1vz_2qbbe54 | Jodeci | 2026-12-13 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/jodeci-tickets/saint-petersburg-florida-duke-energy-center-for-the-arts-mahaffey-theater-2026-12-13-7-pm/concert/18407275 |
| tm-polyphia-2026-leeds-g5dzz_gl9y_6t | Polyphia | 2026-12-15 | Leeds | no_candidates_returned | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | 2026-12-16 | Ciudad de México | no_candidates_returned | - |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | Jay Wheeler | 2026-12-19 | Barcelona | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-auckland-17azv0g6cjw0kgn | Queens Of The Stone Age | 2026-12-20 | Auckland | no_candidates_returned | - |
| tm-mon-laferte-2027-madrid-z698xz2qz16vquuz7t | Mon Laferte | 2027-01-13 | Madrid | no_candidates_returned | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | 2027-01-15 | Monterrey | no_candidates_returned | - |
| tm-aespa-2027-london-1agzk3pgkeok319 | aespa | 2027-01-16 | London | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-dublin-1avoz_fgkbmo2st | Five Finger Death Punch | 2027-01-19 | Dublin | no_candidates_returned | - |
| tm-saint-levant-2027-london-1auzk48gkdxoa9q | Saint Levant | 2027-01-21 | London | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6- | Five Finger Death Punch | 2027-01-23 | London | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-dublin-17kzv0g6gmgxxtc | Two Door Cinema Club | 2027-01-23 | Dublin | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-belfast-17czv0g659j0-z4 | Two Door Cinema Club | 2027-01-24 | Belfast | no_candidates_returned | - |
| tm-bryson-tiller-2027-auckland-17azv0g65qclfnt | Bryson Tiller | 2027-01-27 | Auckland | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-london-1agzk4ngkdo79wi | A Boogie Wit Da Hoodie | 2027-01-27 | London | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-london-17u8v0g6ulnn4yb | Two Door Cinema Club | 2027-01-28 | London | no_candidates_returned | - |
| tm-atmosphere-2027-salt-lake-city-g5vzz_kl2vywj | Atmosphere | 2027-01-30 | Salt Lake City | city_or_metro_match_failed | https://seatgeek.com/atmosphere-tickets/park-city-utah-the-marquis-park-city-2027-01-30-6-pm/concert/18609095 |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1adjz_pgkwcxzvj | A Boogie Wit Da Hoodie | 2027-01-31 | Manchester | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-london-1amzk4ygkd4ogxu | A Boogie Wit Da Hoodie | 2027-02-02 | London | no_candidates_returned | - |
| tm-billy-strings-2027-asheville-g5evz_omwlg3b | Billy Strings | 2027-02-04 | Asheville | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-04-3-30-am/concert/18540096 |
| tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp | Nothing But Thieves | 2027-02-05 | London | no_candidates_returned | - |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | Mat Kearney | 2027-02-05 | Kalispell | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-cardiff-17uov0g65qps55o | Nothing But Thieves | 2027-02-08 | Cardiff | no_candidates_returned | - |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | Missio | 2027-02-12 | Brooklyn | no_candidates_returned | - |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | Grace Potter | 2027-02-12 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/grace-potter-the-nocturnals-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-02-12-7-30-pm/concert/18755535 |
| tm-bruno-mars-2027-burswood-1apzkfbgkdn2ves | Bruno Mars | 2027-02-13 | Burswood | no_candidates_returned | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | Valley | 2027-02-18 | Regina | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | Five Finger Death Punch | 2027-02-19 | Fornebu | no_candidates_returned | - |
| tm-charli-xcx-2027-london-1agzkfigkenre1t | Charli xcx | 2027-02-19 | London | no_candidates_returned | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfkdo_ | BTS | 2027-02-20 | Sydney Olympic Park | no_candidates_returned | - |
| tm-charli-xcx-2027-london-1adfz_3gknni7-u | Charli xcx | 2027-02-20 | London | no_candidates_returned | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfik-s | BTS | 2027-02-21 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-glasgow-1kuovpuoga5adth | Bullet For My Valentine | 2027-02-23 | Glasgow | no_candidates_returned | - |
| tm-cage-the-elephant-2027-leeds-g5dzz_350zpr- | Cage The Elephant | 2027-02-23 | Leeds | no_candidates_returned | - |
| tm-dylan-gossett-2027-glasgow-g5dzz_8pg5sb3 | Dylan Gossett | 2027-02-23 | Glasgow | no_candidates_returned | - |
| tm-dylan-gossett-2027-glasgow-g5dzz_8qwdoqp | Dylan Gossett | 2027-02-24 | Glasgow | no_candidates_returned | - |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | Hollywood Undead | 2027-02-24 | London | no_candidates_returned | - |
| tm-simple-minds-2027-auckland-17azv0g6g9-xfc0 | Simple Minds | 2027-02-25 | Auckland | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-birmingham-1anzkfggkel7zmz | Bullet For My Valentine | 2027-02-25 | Birmingham | no_candidates_returned | - |
| tm-cage-the-elephant-2027-glasgow-g5dzz_3kn7sp1 | Cage The Elephant | 2027-02-25 | Glasgow | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-london-16dfz_kqeg7loo3 | Bullet For My Valentine | 2027-02-26 | London | no_candidates_returned | - |
| tm-mico-2027-st-petersburg-vvg1vz_fxbu9sq | Mico | 2027-02-26 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/mico-tickets/saint-petersburg-florida-jannus-live-2027-02-26-7-pm/concert/18665972 |
| tm-role-model-2027-manchester-g5vhz_u1kkyot | Role Model | 2027-02-28 | Manchester | no_candidates_returned | - |
| tm-malcolm-todd-2027-manchester-1adbz_3gknvr9ad | Malcolm Todd | 2027-02-28 | Manchester | no_candidates_returned | - |
| tm-simple-minds-2027-christchurch-17azv0g6gjwt3e9 | Simple Minds | 2027-03-01 | Christchurch | no_candidates_returned | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | Teddy Swims | 2027-03-02 | Fornebu | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3lpy7hq | Malcolm Todd | 2027-03-02 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3rjik2s | Malcolm Todd | 2027-03-03 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3rsuku2 | Malcolm Todd | 2027-03-04 | London | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknavvld | Bruno Mars | 2027-03-05 | Sydney Olympic Park | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-orlando-1axzkfggkescv4v | Dancing With The Stars | 2027-03-06 | Orlando | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxoik | Bruno Mars | 2027-03-09 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bryan-adams-2027-auckland-17azv0g6cjvbo_i | Bryan Adams | 2027-03-10 | Auckland | no_candidates_returned | - |
| tm-tash-sultana-2027-dublin-1abzkgkgkdrrzgx | Tash Sultana | 2027-03-11 | Dublin | no_candidates_returned | - |
| tm-bryan-adams-2027-christchurch-17azv0g6cuuuvxf | Bryan Adams | 2027-03-12 | Christchurch | no_candidates_returned | - |
| tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr | Gary Allan | 2027-03-13 | Peoria | conflicting_same_date_city_candidates | https://seatgeek.com/gary-allan-tickets/peoria-illinois-prairie-home-alliance-theater-at-peoria-civic-center-2027-03-13-8-pm/concert/18365957 |
| tm-polyphia-2027-st-petersburg-vvg1vz_oesihnv | Polyphia | 2027-03-14 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/polyphia-tickets/saint-petersburg-florida-jannus-live-2027-03-14-7-30-pm/concert/18536025 |
| tm-megadeth-2027-glasgow-17uov0g62mgifrs | Megadeth | 2027-03-16 | Glasgow | no_candidates_returned | - |
| tm-megadeth-2027-birmingham-17fyv0g62qpke7_ | Megadeth | 2027-03-18 | Birmingham | no_candidates_returned | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | Megadeth | 2027-03-25 | Düsseldorf | no_candidates_returned | - |
| tm-the-interrupters-2027-st-petersburg-vvg1vz_3xxt6_9 | The Interrupters | 2027-03-26 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/saint-petersburg-florida-jannus-live-2027-03-26-6-pm/concert/18612690 |
| tm-trivium-2027-glasgow-1auzkfpgken_hpc | Trivium | 2027-03-31 | Glasgow | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-diego-vvg1iz_kxrbyxe | Dancing With The Stars | 2027-03-31 | San Diego | no_candidates_returned | - |
| tm-trivium-2027-london-g5vhz_o63ceuv | Trivium | 2027-04-03 | London | no_candidates_returned | - |
| tm-trivium-2027-cardiff-1kuovpa6gacrw-h | Trivium | 2027-04-04 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-london-1agzkf6gkdpobqq | James Blunt | 2027-04-04 | London | no_candidates_returned | - |
| tm-brandi-carlile-2027-dublin-1abzku4gkdpubm4 | Brandi Carlile | 2027-04-04 | Dublin | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkuyj7ah | Olivia Rodrigo | 2027-04-05 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusg7f3 | Olivia Rodrigo | 2027-04-06 | London | no_candidates_returned | - |
| tm-james-blunt-2027-cardiff-16dbz_8pkg7i-jy | James Blunt | 2027-04-06 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-bournemouth-16uzkf6oaza5auua | James Blunt | 2027-04-07 | Bournemouth | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-birmingham-g5dzz_kkek096 | Lizzy McAlpine | 2027-04-07 | Birmingham | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusmfph | Olivia Rodrigo | 2027-04-08 | London | no_candidates_returned | - |
| tm-teddy-swims-2027-dublin-17kzv0g626ngihj | Teddy Swims | 2027-04-08 | Dublin | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_krfm-83 | Lizzy McAlpine | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkug10qr | Olivia Rodrigo | 2027-04-09 | London | no_candidates_returned | - |
| tm-teddy-swims-2027-dublin-17kzv0g6260hbxf | Teddy Swims | 2027-04-09 | Dublin | no_candidates_returned | - |
| tm-brandi-carlile-2027-manchester-16dbz_8qkg7xvln | Brandi Carlile | 2027-04-09 | Manchester | no_candidates_returned | - |
| tm-vnv-nation-2027-brooklyn-k7vgfbvbkdnzs | VNV Nation | 2027-04-09 | Brooklyn | no_candidates_returned | - |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | Gavin Adcock | 2027-04-10 | University | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/oxford-mississippi-sjb-pavilion-at-ole-miss-2027-04-10-7-pm/concert/18122597 |
| tm-olivia-rodrigo-2027-london-1adfz_agkdf5uep | Olivia Rodrigo | 2027-04-12 | London | no_candidates_returned | - |
| tm-brandi-carlile-2027-london-16dbz_8rdg7g-dj | Brandi Carlile | 2027-04-13 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdbfuff | Olivia Rodrigo | 2027-04-14 | London | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | Thirty Seconds to Mars | 2027-04-14 | Vienna | no_candidates_returned | - |
| tm-brandi-carlile-2027-london-16uzkf6-7za5ev8a | Brandi Carlile | 2027-04-14 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdqyuqd | Olivia Rodrigo | 2027-04-15 | London | no_candidates_returned | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | Jon Pardi | 2027-04-18 | Peoria | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdjmpol | Olivia Rodrigo | 2027-04-19 | London | no_candidates_returned | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65nd0zys | Gracie Abrams | 2027-04-19 | Dublin | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdj-m1i | Olivia Rodrigo | 2027-04-20 | London | no_candidates_returned | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65ndpfyh | Gracie Abrams | 2027-04-20 | Dublin | no_candidates_returned | - |
| tm-earth-wind-fire-2027-southaven-g5viz_f7otpyl | Earth, Wind & Fire | 2027-04-20 | Southaven | no_candidates_returned | - |
| tm-teddy-swims-2027-london-17u8v0g6253xeaz | Teddy Swims | 2027-04-21 | London | no_candidates_returned | - |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | Simple Minds | 2027-04-21 | Berlin | no_candidates_returned | - |
| tm-teddy-swims-2027-london-17u8v0g623cnnvk | Teddy Swims | 2027-04-22 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-dublin-1kkzvpcfga1_k0w | Rod Stewart | 2027-04-23 | Dublin | no_candidates_returned | - |
| tm-earth-wind-fire-2027-atlanta-vvg1zz_33xgiy_ | Earth, Wind & Fire | 2027-04-23 | Atlanta | no_candidates_returned | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | Lola Young | 2027-04-23 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/lola-young-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-04-23-7-30-pm/concert/18649738 |
| tm-rod-stewart-2027-dublin-1avoz_kgkw68xnf | Rod Stewart | 2027-04-24 | Dublin | no_candidates_returned | - |
| tm-teddy-swims-2027-london-17u8v0g623yvkkm | Teddy Swims | 2027-04-24 | London | no_candidates_returned | - |
| tm-earth-wind-fire-2027-savannah-vvg1zz_3cl5hyq | Earth, Wind & Fire | 2027-04-24 | Savannah | no_candidates_returned | - |
| tm-teddy-swims-2027-london-17u8v0g623nj3ov | Teddy Swims | 2027-04-25 | London | no_candidates_returned | - |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | Hazlett | 2027-04-25 | Pittsburgh | conflicting_same_date_city_candidates | https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-3-30-am/concert/18819937 |
| tm-erasure-2027-bournemouth-15dbz_kx7jxjo | Erasure | 2027-04-26 | Bournemouth | no_candidates_returned | - |
| tm-sombr-2027-auckland-1ae8z_ogkmlufo4 | Sombr | 2027-04-27 | Auckland | no_candidates_returned | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | Simple Minds | 2027-04-27 | Hamburg | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-london-1agzk3agkdevn9u | Thirty Seconds to Mars | 2027-04-28 | London | no_candidates_returned | - |
| tm-gracie-abrams-2027-london-17u8v0g65wthjl9 | Gracie Abrams | 2027-04-30 | London | no_candidates_returned | - |
| tm-erasure-2027-birmingham-1anzkfzgkdmiv17 | Erasure | 2027-04-30 | Birmingham | no_candidates_returned | - |
| tm-erasure-2027-manchester-g5vhz_k6qxkzy | Erasure | 2027-05-01 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-london-17u8v0g65wi6peh | Gracie Abrams | 2027-05-01 | London | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-dublin-1abzk36gkeuawhf | Thirty Seconds to Mars | 2027-05-01 | Dublin | no_candidates_returned | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | Simple Minds | 2027-05-01 | Amsterdam | no_candidates_returned | - |
| tm-gracie-abrams-2027-london-17u8v0g65wcbpi1 | Gracie Abrams | 2027-05-03 | London | no_candidates_returned | - |
| tm-gracie-abrams-2027-london-17u8v0g65wm9us5 | Gracie Abrams | 2027-05-04 | London | no_candidates_returned | - |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubifhc | Remi Wolf | 2027-05-04 | Phoenix | no_candidates_returned | - |
| tm-simple-minds-2027-london-16dfz_313g7wgmr | Simple Minds | 2027-05-06 | London | no_candidates_returned | - |
| tm-erasure-2027-hull-1auzkfygkey3bob | Erasure | 2027-05-06 | Hull | no_candidates_returned | - |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | Hilary Duff | 2027-05-07 | Madrid | no_candidates_returned | - |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | Sombr | 2027-05-08 | Fornebu | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p | Olivia Rodrigo | 2027-05-09 | London | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | Two Door Cinema Club | 2027-05-09 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/two-door-cinema-club-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-05-09-7-30-pm/concert/18711330 |
| tm-olivia-rodrigo-2027-london-1adfz_agkdd-fh3 | Olivia Rodrigo | 2027-05-10 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-london-1agzkfzgkdv3zff | Rod Stewart | 2027-05-11 | London | no_candidates_returned | - |
| tm-erasure-2027-london-1agzkfmgkdxoix5 | Erasure | 2027-05-12 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-london-1agzkfzgkdvmnjo | Rod Stewart | 2027-05-14 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-london-1agzkfzgkdu5qoy | Rod Stewart | 2027-05-15 | London | no_candidates_returned | - |
| tm-simple-minds-2027-dublin-1kkzvpk_ga2vkuc | Simple Minds | 2027-05-17 | Dublin | no_candidates_returned | - |
| tm-rod-stewart-2027-glasgow-1adbz_4gkmvnhoa | Rod Stewart | 2027-05-18 | Glasgow | no_candidates_returned | - |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | Greta Van Fleet | 2027-05-18 | Hamburg | no_candidates_returned | - |
| tm-weezer-2027-birmingham-1anzkf7gkdaoymm | Weezer | 2027-05-21 | Birmingham | no_candidates_returned | - |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | Greta Van Fleet | 2027-05-21 | Berlin | no_candidates_returned | - |
| tm-weezer-2027-cardiff-1auzkf7gkevbx3b | Weezer | 2027-05-23 | Cardiff | no_candidates_returned | - |
| tm-fall-out-boy-2027-madrid-z698xz2qz1k83o_fe | Fall Out Boy | 2027-05-23 | Madrid | no_candidates_returned | - |
| tm-nickelback-2027-london-1agzk46gkddli7z | Nickelback | 2027-05-24 | London | no_candidates_returned | - |
| tm-nickelback-2027-london-1agzk46gkdjr1bv | Nickelback | 2027-05-25 | London | no_candidates_returned | - |
| tm-greta-van-fleet-2027-london-1adfz_kgkmuet5g | Greta Van Fleet | 2027-05-28 | London | no_candidates_returned | - |
| tm-tom-jones-2027-cardiff-g5vhz_4wcs0vc | Tom Jones | 2027-05-30 | Cardiff | no_candidates_returned | - |
| tm-nickelback-2027-dublin-1abzkfmgkepnjt6 | Nickelback | 2027-05-30 | Dublin | no_candidates_returned | - |
| tm-fall-out-boy-2027-dublin-1abzk4xgkdbhdty | Fall Out Boy | 2027-06-01 | Dublin | no_candidates_returned | - |
| tm-tame-impala-2027-london-16dfz_ofpg7t8j2 | Tame Impala | 2027-06-01 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | Rod Stewart | 2027-06-01 | Berlin | no_candidates_returned | - |
| tm-tame-impala-2027-london-16dfz_ofjg7iyih | Tame Impala | 2027-06-02 | London | no_candidates_returned | - |
| tm-tame-impala-2027-london-1agzkfbgkdvvzlq | Tame Impala | 2027-06-03 | London | no_candidates_returned | - |
| tm-greta-van-fleet-2027-dublin-1abzkfmgkes3wyd | Greta Van Fleet | 2027-06-04 | Dublin | no_candidates_returned | - |
| tm-fall-out-boy-2027-london-1adfz_4gkxmx9xa | Fall Out Boy | 2027-06-05 | London | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp | KPop Demon Hunters | 2027-06-05 | Baltimore | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/baltimore-maryland-cfg-bank-arena-2027-06-05-2-pm/concert/18772669 |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | 2027-06-10 | Cardiff | no_candidates_returned | - |
| tm-leon-bridges-2027-manchester-1adbz_pgkmxxe4x | Leon Bridges | 2027-06-11 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-cardiff-1adfz_4gklat6o4 | Sam Fender | 2027-06-12 | Cardiff | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp | KPop Demon Hunters | 2027-06-12 | Newark | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-12-2-pm/concert/18772667 |
| tm-sienna-spiro-2027-dublin-17kzv0g6gpq41un | Sienna Spiro | 2027-06-15 | Dublin | no_candidates_returned | - |
| tm-shania-twain-2027-scarborough-1agzkfugkdob_wu | Shania Twain | 2027-06-16 | Scarborough | no_candidates_returned | - |
| tm-sienna-spiro-2027-dublin-1avoz_4gkuvegeh | Sienna Spiro | 2027-06-16 | Dublin | no_candidates_returned | - |
| tm-sombr-2027-belfast-16doz_oxfg7tv55 | Sombr | 2027-06-17 | Belfast | no_candidates_returned | - |
| tm-u2-2027-london-1adfz_4qdzvzd55v | U2 | 2027-06-18 | London | no_candidates_returned | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | Kings Of Leon | 2027-06-18 | Hamburg | no_candidates_returned | - |
| tm-u2-2027-london-1adfz_4gkszafjm | U2 | 2027-06-19 | London | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy | KPop Demon Hunters | 2027-06-19 | Chicago | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-19-2-pm/concert/18772670 |
| tm-james-blunt-2027-scarborough-1ku8vp1_ga1cs0u | James Blunt | 2027-06-20 | Scarborough | no_candidates_returned | - |
| tm-alex-warren-2027-belfast-16doz_3cdg7z8me | Alex Warren | 2027-06-21 | Belfast | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogkwyrfux | Sombr | 2027-06-21 | London | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2027-valencia-z698xz2qz16vfzvzrf | Queens Of The Stone Age | 2027-06-21 | Valencia | no_candidates_returned | - |
| tm-u2-2027-london-1adfz_4gkb4kzby | U2 | 2027-06-22 | London | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogklwvhfa | Sombr | 2027-06-22 | London | no_candidates_returned | - |
| tm-tom-jones-2027-lincoln-g5vhz_4w3ae65 | Tom Jones | 2027-06-23 | Lincoln | no_candidates_returned | - |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | 2027-06-23 | Glasgow | no_candidates_returned | - |
| tm-shania-twain-2027-exeter-g5vhz_kjtg0ag | Shania Twain | 2027-06-24 | Exeter | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogkwskt7w | Sombr | 2027-06-24 | London | no_candidates_returned | - |
| tm-alex-warren-2027-glasgow-1auzkf_gkemjhov | Alex Warren | 2027-06-25 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | Nickelback | 2027-06-25 | Vienna | no_candidates_returned | - |
| tm-u2-2027-london-1adfz_4gkbq3_od | U2 | 2027-06-25 | London | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogkwy2ti0 | Sombr | 2027-06-25 | London | no_candidates_returned | - |
| tm-alex-warren-2027-exeter-g5vhz_3je-wlb | Alex Warren | 2027-06-26 | Exeter | no_candidates_returned | - |
| tm-sting-2027-fulda-z698xzc2z16v1vjxok | Sting | 2027-06-26 | Fulda | no_candidates_returned | - |
| tm-mariah-carey-2027-exeter-g5vhz_f0acb90 | Mariah Carey | 2027-06-27 | Exeter | no_candidates_returned | - |
| tm-kings-of-leon-2027-scarborough-1agzk4fgke0iell | Kings Of Leon | 2027-06-27 | Scarborough | no_candidates_returned | - |
| tm-shania-twain-2027-belfast-1adoz_4gksdrodo | Shania Twain | 2027-06-27 | Belfast | no_candidates_returned | - |
| tm-mariah-carey-2027-cardiff-g5vhz_feidjq8 | Mariah Carey | 2027-06-29 | Cardiff | no_candidates_returned | - |
| tm-shania-twain-2027-woodstock-1amzk4agkdk2pnt | Shania Twain | 2027-06-29 | Woodstock | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogkwwynfm | Sombr | 2027-06-29 | London | no_candidates_returned | - |
| tm-bryan-adams-2027-fulda-z698xzc2z1k86g-_z | Bryan Adams | 2027-06-29 | Fulda | no_candidates_returned | - |
| tm-tom-jones-2027-woodstock-1amzk4tgketwvu7 | Tom Jones | 2027-06-30 | Woodstock | no_candidates_returned | - |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | 2027-06-30 | Cardiff | no_candidates_returned | - |
| tm-santana-2027-london-1agzk4pgkemmuru | Santana | 2027-06-30 | London | no_candidates_returned | - |
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | Noah Kahan | 2027-07-02 | Berlin | no_candidates_returned | - |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | Oasis | 2027-07-02 | Munich | no_candidates_returned | - |
| tm-kings-of-leon-2027-london-1agzk4egkesvn16 | Kings Of Leon | 2027-07-02 | London | no_candidates_returned | - |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | Simply Red | 2027-07-02 | Aurich | no_candidates_returned | - |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | Oasis | 2027-07-03 | Munich | no_candidates_returned | - |
| tm-kings-of-leon-2027-london-1agzk4egkdt5lpe | Kings Of Leon | 2027-07-03 | London | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s | KPop Demon Hunters | 2027-07-03 | Pittsburgh | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-07-03-2-pm/concert/18772685 |
| tm-jack-johnson-2027-london-16dfz_4ebg7va-j | Jack Johnson | 2027-07-04 | London | no_candidates_returned | - |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | Oasis | 2027-07-06 | Munich | no_candidates_returned | - |
| tm-karol-g-2027-london-1agzk3ogkddbuhf | Karol G | 2027-07-06 | London | no_candidates_returned | - |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | Noah Kahan | 2027-07-07 | Sevilla | no_candidates_returned | - |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | Nickelback | 2027-07-09 | Fornebu | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu | KPop Demon Hunters | 2027-07-10 | Atlanta | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/atlanta-georgia-state-farm-arena-1-2027-07-10-2-pm/concert/18772692 |
| tm-mumford-sons-2027-calgary-1aozk4pgkd1yzsk | Mumford & Sons | 2027-07-12 | Calgary | no_candidates_returned | - |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | Oasis | 2027-07-16 | Amsterdam | no_candidates_returned | - |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | Mumford & Sons | 2027-07-17 | St. John's | no_candidates_returned | - |
| tm-sam-fender-2027-manchester-g5dzz_4k4turs | Sam Fender | 2027-07-17 | Manchester | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 | KPop Demon Hunters | 2027-07-17 | Orlando | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-7-30-pm/concert/18772697 |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | Oasis | 2027-07-17 | Amsterdam | no_candidates_returned | - |
| tm-stray-kids-2027-munich-z698xzc2z1kazaygz | Stray Kids | 2027-07-17 | Munich | no_candidates_returned | - |
| tm-stray-kids-2027-munich-z698xzc2z1kb0z0om | Stray Kids | 2027-07-18 | Munich | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 | KPop Demon Hunters | 2027-07-24 | Phoenix | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-2-pm/concert/18772699 |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | Fall Out Boy | 2027-08-06 | Saint Charles | city_or_metro_match_failed | https://seatgeek.com/fall-out-boy-tickets/st-charles-iowa-roaming-hills-2027-08-06-6-30-pm/concert/18753421 |
| tm-simply-red-2027-halifax-15dfz_3r_jv8z | Simply Red | 2027-08-09 | Halifax | no_candidates_returned | - |
| tm-simply-red-2027-halifax-1adfz_3gkrvea3u | Simply Red | 2027-08-10 | Halifax | no_candidates_returned | - |
| tm-simply-red-2027-london-1adjz_3gkbyuns4 | Simply Red | 2027-08-13 | London | no_candidates_returned | - |
| tm-simply-red-2027-margate-1agzkfegkemyogi | Simply Red | 2027-08-14 | Margate | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih | KPop Demon Hunters | 2027-08-14 | Tacoma | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-2-pm/concert/18772720 |
| tm-simply-red-2027-scarborough-1agzkf0gkdqpn-m | Simply Red | 2027-08-17 | Scarborough | no_candidates_returned | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | The Red Clay Strays | 2027-08-28 | Englewood | city_or_metro_match_failed | https://seatgeek.com/the-red-clay-strays-tickets/greenwood-village-colorado-fiddler-s-green-4-2027-08-28-7-pm/concert/18639116 |
| tm-passenger-2027-glasgow-g5dzz_8wyqwf1 | Passenger | 2027-09-11 | Glasgow | no_candidates_returned | - |
| tm-passenger-2027-edinburgh-1adbz_8gks0vdnw | Passenger | 2027-09-12 | Edinburgh | no_candidates_returned | - |
| tm-passenger-2027-london-1auzkf3gkd0sykm | Passenger | 2027-09-17 | London | no_candidates_returned | - |
| tm-passenger-2027-exeter-g5vhz_o2o0irs | Passenger | 2027-09-21 | Exeter | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-fornebu-z698xzb_z1k-p0apk | KPop Demon Hunters | 2027-09-25 | Fornebu | no_candidates_returned | - |
| tm-passenger-2027-brighton-g5vhz_o5oziab | Passenger | 2027-09-25 | Brighton | no_candidates_returned | - |
| tm-andrea-bocelli-2027-birmingham-1aegz_kgkwagold | Andrea Bocelli | 2027-09-29 | Birmingham | no_candidates_returned | - |
| tm-andrea-bocelli-2027-london-1adfz_kgkbcpkr9 | Andrea Bocelli | 2027-10-01 | London | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-brussels-z698xzg2z1kup-z3o | KPop Demon Hunters | 2027-10-02 | Brussels | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-dublin-1avoz_pgksg3dqw | KPop Demon Hunters | 2027-10-09 | Dublin | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-london-1adfz_pgkm7wjw0 | KPop Demon Hunters | 2027-10-22 | London | no_candidates_returned | - |
| tm-meshuggah-2027-dublin-1avoz_4gkwrafdq | Meshuggah | 2027-10-27 | Dublin | no_candidates_returned | - |
| tm-meshuggah-2027-london-1adjz_4gkbbdf9c | Meshuggah | 2027-10-30 | London | no_candidates_returned | - |
| tm-lenny-pearce-2026-silver-spring-17a8v0g6gpl1zid | Lenny Pearce | 2026-11-21 | Silver Spring | no_candidates_returned | - |
| tm-fontaines-d-c-2026-glasgow-1adbz_8gkucuwyw | Fontaines D.C. | 2026-11-22 | Glasgow | no_candidates_returned | - |
| tm-fontaines-d-c-2026-birmingham-1aegz_8gkdxxlc2 | Fontaines D.C. | 2026-11-25 | Birmingham | no_candidates_returned | - |
| tm-hayley-williams-2026-ciudad-de-mexico-g5dvz_1q0q4bc | Hayley Williams | 2026-11-26 | Ciudad de México | no_candidates_returned | - |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | 2026-11-27 | Oslo | no_candidates_returned | - |
| tm-interpol-2026-brighton-g5dzzbgwdgxyl | Interpol | 2026-11-27 | Brighton | no_candidates_returned | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61mujevj | KATSEYE | 2026-11-27 | Ciudad de México | no_candidates_returned | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61m2a3xe | KATSEYE | 2026-11-28 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkesyi9m | Bruno Mars | 2026-12-03 | Ciudad de México | no_candidates_returned | - |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | Noah Kahan | 2026-12-04 | Munich | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfcxu | Bruno Mars | 2026-12-04 | Ciudad de México | no_candidates_returned | - |
| tm-yuridia-2026-zapopan-g5dvz_aia5kvd | Yuridia | 2026-12-05 | Zapopan | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxy | Bruno Mars | 2026-12-07 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxd | Bruno Mars | 2026-12-08 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehaqnd | Bruno Mars | 2026-12-11 | Ciudad de México | no_candidates_returned | - |
| tm-hayley-williams-2027-ciudad-de-mexico-g5dvz_5u9jpc7 | Hayley Williams | 2027-01-13 | Ciudad de México | no_candidates_returned | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | Missio | 2027-01-13 | Chicago | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | Nothing But Thieves | 2027-01-15 | Amsterdam | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | Nothing But Thieves | 2027-01-16 | Amsterdam | no_candidates_returned | - |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | 2027-01-19 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-manchester-vv1avzkfzgkexi5cw | Dancing With The Stars | 2027-01-21 | Manchester | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-cincinnati-1apzkfygkeolgly | Dancing With The Stars | 2027-01-23 | Cincinnati | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-grand-rapids-vv1afzkfygkddhcfb | Dancing With The Stars | 2027-01-27 | Grand Rapids | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-detroit-vv1afzk4egkdpidi9 | Dancing With The Stars | 2027-01-28 | Detroit | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-indianapolis-vv17fz_kgkmo2l7h | Dancing With The Stars | 2027-01-29 | Indianapolis | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-minneapolis-vv1akzkfzgkdjnlsm | Dancing With The Stars | 2027-01-30 | Minneapolis | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-milwaukee-vv1a6zkfzgkemf4pv | Dancing With The Stars | 2027-01-31 | Milwaukee | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-allentown-1kgzvp8fgagolc1 | Dancing With The Stars | 2027-02-03 | Allentown | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnxl1 | Fuerza Regida | 2027-02-05 | Ciudad de México | no_candidates_returned | - |
| tm-the-warning-2027-ciudad-de-mexico-1afzkf4gkenopd9 | The Warning | 2027-02-05 | Ciudad de México | no_candidates_returned | - |
| tm-boyz-ii-men-2027-atlantic-city-vv1kfz_fbxg7mvlj | Boyz II Men | 2027-02-06 | Atlantic City | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnwlg | Fuerza Regida | 2027-02-06 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgaclelp | Fuerza Regida | 2027-02-07 | Ciudad de México | no_candidates_returned | - |
| tm-black-stone-cherry-2027-aberdeen-1auzkcagkdnsiac | Black Stone Cherry | 2027-02-08 | Aberdeen | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-baltimore-1a4zk4vgkewzdyv | Dancing With The Stars | 2027-02-09 | Baltimore | no_candidates_returned | - |
| tm-polyphia-2027-hollywood-vvg10z_glgj36a | Polyphia | 2027-02-09 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/polyphia-tickets/los-angeles-california-hollywood-palladium-2027-02-09-7-30-pm/concert/18312308 |
| tm-dancing-with-the-stars-2027-pittsburgh-1apzkfygkdqrluc | Dancing With The Stars | 2027-02-10 | Pittsburgh | no_candidates_returned | - |
| tm-billy-strings-2027-duluth-vvg1zz_oinx98f | Billy Strings | 2027-02-12 | Duluth | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-12-7-30-pm/concert/18540085 |
| tm-dancing-with-the-stars-2027-albany-k7vgf_km48smn | Dancing With The Stars | 2027-02-12 | Albany | no_candidates_returned | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdoa5fw | Hilary Duff | 2027-02-12 | Ciudad de México | no_candidates_returned | - |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | John Summit | 2027-02-13 | Amsterdam | no_candidates_returned | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdomhcz | Hilary Duff | 2027-02-13 | Ciudad de México | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-hershey-vv1aezk4egkd_54wn | Dancing With The Stars | 2027-02-17 | Hershey | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-columbus-vv1kv8vp83gacza6r | Dancing With The Stars | 2027-02-18 | Columbus | no_candidates_returned | - |
| tm-billy-strings-2027-nashville-g5viz_on579po | Billy Strings | 2027-02-19 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-19-7-30-pm/concert/18540093 |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | John Summit | 2027-02-20 | Zürich | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-moline-vv17bz_kgkbyihs4 | Dancing With The Stars | 2027-02-20 | Moline | no_candidates_returned | - |
| tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz | Dylan Gossett | 2027-02-21 | Birmingham | no_candidates_returned | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | Chelsea Cutler | 2027-02-21 | Columbus | conflicting_same_date_city_candidates | https://seatgeek.com/chelsea-cutler-tickets/columbus-ohio-newport-music-hall-2027-02-21-3-30-am/concert/18639193 |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | Five Finger Death Punch | 2027-02-22 | Helsinki | no_candidates_returned | - |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | Charli xcx | 2027-02-22 | Amsterdam | no_candidates_returned | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3jtvqc | Sienna Spiro | 2027-02-23 | Edinburgh | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-omaha-vv1akzk4egkdjg6nb | Dancing With The Stars | 2027-02-23 | Omaha | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkeysi-t | U2 | 2027-02-23 | Ciudad de México | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-kansas-city-vv1kbz_fk9g7ylk6 | Dancing With The Stars | 2027-02-24 | Kansas City | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-north-little-rock-g5viz_kxiccfs | Dancing With The Stars | 2027-02-25 | North Little Rock | no_candidates_returned | - |
| tm-cage-the-elephant-2027-birmingham-g5dzz_3k0lkkh | Cage The Elephant | 2027-02-26 | Birmingham | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeind | U2 | 2027-02-26 | Ciudad de México | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-knoxville-g5viz_kwuvui0 | Dancing With The Stars | 2027-02-27 | Knoxville | no_candidates_returned | - |
| tm-cage-the-elephant-2027-manchester-g5dzz_3374s3o | Cage The Elephant | 2027-02-28 | Manchester | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-nashville-g5viz_kb4-h48 | Dancing With The Stars | 2027-02-28 | Nashville | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeina | U2 | 2027-02-28 | Ciudad de México | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-charlottesville-vv16vzk4vjsza2k7u6 | Dancing With The Stars | 2027-03-02 | Charlottesville | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebign2 | U2 | 2027-03-02 | Ciudad de México | no_candidates_returned | - |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | Flans | 2027-03-05 | Kansas City | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-birmingham-g5dzz_5wuo0od | Sleeping With Sirens | 2027-03-06 | Birmingham | no_candidates_returned | - |
| tm-megadeth-2027-belfast-17czv0g62pvlvd8 | Megadeth | 2027-03-09 | Belfast | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-tampa-vvg1vz_kbbl4rs | Dancing With The Stars | 2027-03-09 | Tampa | no_candidates_returned | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | Teddy Swims | 2027-03-10 | Hamburg | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-birmingham-1aezz_kgkwr4ecx | Dancing With The Stars | 2027-03-10 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-orleans-g5viz_kxwz34h | Dancing With The Stars | 2027-03-11 | New Orleans | no_candidates_returned | - |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | Flans | 2027-03-11 | Las Vegas | no_candidates_returned | - |
| tm-bruno-mars-2027-auckland-1a0zkfkgkeslw-y | Bruno Mars | 2027-03-13 | Auckland | no_candidates_returned | - |
| tm-dropkick-murphys-2027-boston-vv1avzkfsgkdtcsmb | Dropkick Murphys | 2027-03-13 | Boston | conflicting_same_date_city_candidates | https://seatgeek.com/dropkick-murphys-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-13-7-pm/concert/18685642 |
| tm-tash-sultana-2027-london-1adjzbsgkmupg8h | Tash Sultana | 2027-03-13 | London | no_candidates_returned | - |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | Fantasia | 2027-03-13 | Fort Worth | no_candidates_returned | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogkiuunsj | Bruno Mars | 2027-03-14 | Auckland | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | Teddy Swims | 2027-03-16 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | 2027-03-16 | Dallas | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | Teddy Swims | 2027-03-17 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | 2027-03-17 | Tulsa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | 2027-03-19 | Denver | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | 2027-03-23 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | 2027-03-23 | Abbotsford | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | 2027-03-24 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | 2027-03-24 | Portland | no_candidates_returned | - |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | Tash Sultana | 2027-03-26 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | 2027-03-27 | Amsterdam | no_candidates_returned | - |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | Foreigner | 2027-03-27 | Irvine | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-jose-g5vyz_kxgynut | Dancing With The Stars | 2027-03-27 | San Jose | no_candidates_returned | - |
| tm-james-blunt-2027-newcastle-upon-tyne-g5vhz_8jzh5mu | James Blunt | 2027-03-28 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | 2027-03-28 | Amsterdam | no_candidates_returned | - |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | Megadeth | 2027-03-28 | Oslo | no_candidates_returned | - |
| tm-the-warning-2027-birmingham-g5dzz_3jthdkp | The Warning | 2027-03-29 | Birmingham | no_candidates_returned | - |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | Sienna Spiro | 2027-03-29 | Barcelona | no_candidates_returned | - |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | KALEO | 2027-03-30 | Amsterdam | no_candidates_returned | - |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | Sienna Spiro | 2027-03-30 | Madrid | no_candidates_returned | - |
| tm-james-blunt-2027-belfast-16doz_oxog7v-fd | James Blunt | 2027-03-31 | Belfast | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | 2027-04-01 | Munich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | 2027-04-02 | Munich | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | 2027-04-02 | Los Angeles | no_candidates_returned | - |
| tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 | Saint Levant | 2027-04-03 | Chicago | conflicting_same_date_city_candidates | https://seatgeek.com/saint-levant-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-04-03-8-pm/concert/18386184 |
| tm-dancing-with-the-stars-2027-phoenix-1av0z_kgkb3yfyn | Dancing With The Stars | 2027-04-04 | Phoenix | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-mobile-g5viz_f1cm1bo | Dancing With The Stars | 2027-04-07 | Mobile | no_candidates_returned | - |
| tm-james-blunt-2027-brighton-g5dzz_8l-leuz | James Blunt | 2027-04-08 | Brighton | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-greenville-g5evz_kdpl_8w | Dancing With The Stars | 2027-04-08 | Greenville | no_candidates_returned | - |
| tm-kaleo-2027-birmingham-g5dzz_u5ehmmb | KALEO | 2027-04-09 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-raleigh-g5evz_f60r-5g | Dancing With The Stars | 2027-04-09 | Raleigh | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd | Dancing With The Stars | 2027-04-10 | Charlotte | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-duluth-vvg1zz_km06fsr | Dancing With The Stars | 2027-04-11 | Duluth | no_candidates_returned | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | Mei Semones | 2027-04-11 | Atlanta | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | Thirty Seconds to Mars | 2027-04-12 | Munich | no_candidates_returned | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjlgein | Billy Strings | 2027-04-16 | North Charleston | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-16-7-30-pm/concert/18755186 |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | Thirty Seconds to Mars | 2027-04-20 | Hannover | no_candidates_returned | - |
| tm-alex-warren-2027-sioux-falls-vv17bz_pgknvdnah | Alex Warren | 2027-04-21 | Sioux Falls | conflicting_same_date_city_candidates | https://seatgeek.com/alex-warren-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-21-7-45-pm/concert/18773535 |
| tm-billy-strings-2027-greensboro-g5evz_pk9bhy8 | Billy Strings | 2027-04-23 | Greensboro | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/greensboro-north-carolina-first-horizon-coliseum-2027-04-23-7-30-pm/concert/18755185 |
| tm-u2-2027-stockholm-z698xzq2z16v-3vzat | U2 | 2027-04-26 | Stockholm | no_candidates_returned | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | Mat Kearney | 2027-04-26 | Portsmouth | no_candidates_returned | - |
| tm-rod-stewart-2027-belfast-1azzkfugkd15ooi | Rod Stewart | 2027-04-27 | Belfast | no_candidates_returned | - |
| tm-u2-2027-stockholm-z698xzq2z16v_p7i1a | U2 | 2027-04-28 | Stockholm | no_candidates_returned | - |
| tm-earth-wind-fire-2027-knoxville-g5viz_35urusm | Earth, Wind & Fire | 2027-04-28 | Knoxville | no_candidates_returned | - |
| tm-u2-2027-stockholm-z698xzq2z16vvejtvk | U2 | 2027-04-30 | Stockholm | no_candidates_returned | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | Simple Minds | 2027-04-30 | Amsterdam | no_candidates_returned | - |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubtvhv | Remi Wolf | 2027-05-03 | Phoenix | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | Gracie Abrams | 2027-05-07 | Amsterdam | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | Gracie Abrams | 2027-05-08 | Amsterdam | no_candidates_returned | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | Too Many Zooz | 2027-05-09 | San Francisco | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | Gracie Abrams | 2027-05-10 | Amsterdam | no_candidates_returned | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | Sombr | 2027-05-11 | Helsinki | no_candidates_returned | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | Haiden Henderson | 2027-05-11 | Seattle | no_candidates_returned | - |
| tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz | Simple Minds | 2027-05-13 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | 2027-05-19 | Glasgow | no_candidates_returned | - |
| tm-weezer-2027-london-g5vhz_83wtacz | Weezer | 2027-05-22 | London | no_candidates_returned | - |
| tm-u2-2027-sevilla-z698xz2qz1k0efyqs | U2 | 2027-05-22 | Sevilla | no_candidates_returned | - |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | Zach Bryan | 2027-05-22 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/zach-bryan-tickets/nashville-tennessee-nissan-stadium-2027-05-22-7-pm/concert/18662373 |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | Greta Van Fleet | 2027-05-24 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-sevilla-z698xz2qz16vfkj0zb | U2 | 2027-05-24 | Sevilla | no_candidates_returned | - |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | Sombr | 2027-05-27 | Zürich | no_candidates_returned | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | Gracie Abrams | 2027-05-27 | Barcelona | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5pben | Oasis | 2027-05-28 | Glasgow | no_candidates_returned | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | Sombr | 2027-05-28 | Munich | no_candidates_returned | - |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | Rod Stewart | 2027-05-28 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1agzkfwgkdu5imb | Oasis | 2027-05-29 | Glasgow | no_candidates_returned | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | Sombr | 2027-05-31 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz16v0jupoj | U2 | 2027-06-05 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz16v7bpzfv | U2 | 2027-06-06 | Amsterdam | no_candidates_returned | - |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | Nickelback | 2027-06-07 | Amsterdam | no_candidates_returned | - |
| tm-fall-out-boy-2027-amsterdam-z698xzbpz16vv-vwva | Fall Out Boy | 2027-06-08 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz1kb9z4vi | U2 | 2027-06-09 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lwcjqy | Oasis | 2027-06-11 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | Nickelback | 2027-06-11 | Hannover | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz1k7zpzb4 | U2 | 2027-06-11 | Amsterdam | no_candidates_returned | - |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | Karol G | 2027-06-11 | Sevilla | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lxmu-j | Oasis | 2027-06-12 | Manchester | artist_match_failed | https://seatgeek.com/supersonic-tickets/grand-rapids-michigan-elevation-at-the-intersection-2027-06-12-8-pm/concert/18856685 |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | Karol G | 2027-06-12 | Sevilla | no_candidates_returned | - |
| tm-cody-jinks-2027-lake-tahoe-1a9zk4ngkdmvw-8 | Cody Jinks | 2027-06-12 | Lake Tahoe | city_or_metro_match_failed | https://seatgeek.com/cody-jinks-tickets/stateline-nevada-lake-tahoe-amphitheatre-at-caesars-republic-2027-06-12-7-pm/concert/18754097 |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | Karol G | 2027-06-13 | Sevilla | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lv67ao | Oasis | 2027-06-18 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3l--ppl | Oasis | 2027-06-19 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | Nickelback | 2027-06-19 | Munich | no_candidates_returned | - |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | Nickelback | 2027-06-20 | Zürich | no_candidates_returned | - |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | Simply Red | 2027-06-20 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3ljog0t | Oasis | 2027-06-25 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lnpprv | Oasis | 2027-06-26 | Manchester | no_candidates_returned | - |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | Jack Johnson | 2027-06-27 | Amsterdam | no_candidates_returned | - |
| tm-fontaines-d-c-2027-newcastle-upon-tyne-1adfz_ogkm3hlfk | Fontaines D.C. | 2027-07-01 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | Kenny Chesney | 2027-07-03 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/kenny-chesney-tickets/nashville-tennessee-nissan-stadium-2027-07-03-4-30-pm/concert/18559006 |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | Nickelback | 2027-07-07 | Helsinki | no_candidates_returned | - |
| tm-fontaines-d-c-2027-london-1ku8vpf_ga19knu | Fontaines D.C. | 2027-07-09 | London | no_candidates_returned | - |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | Karol G | 2027-07-10 | Amsterdam | no_candidates_returned | - |
| tm-stray-kids-2027-arnhem-z698xzbpz1k4kc30n | Stray Kids | 2027-07-27 | Arnhem | no_candidates_returned | - |
| tm-stray-kids-2027-arnhem-z698xzbpz16vp04wpo | Stray Kids | 2027-07-28 | Arnhem | no_candidates_returned | - |
| tm-simply-red-2027-colchester-1adfz_3gkmn5keu | Simply Red | 2027-08-18 | Colchester | no_candidates_returned | - |
| tm-mat-kearney-2027-phoenix-1av0z_4gknhdgeg | Mat Kearney | 2027-08-19 | Phoenix | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz16v0ozyff | KPop Demon Hunters | 2027-09-08 | Amsterdam | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz1krbj60f | KPop Demon Hunters | 2027-09-09 | Amsterdam | no_candidates_returned | - |
| tm-foo-fighters-2027-darlington-1adjz_pgknom0ij | Foo Fighters | 2027-09-14 | Darlington | no_candidates_returned | - |
| tm-steve-lacy-2026-hollywood-vvg1iz_8f-wifq | Steve Lacy | 2026-11-21 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/steve-lacy-tickets/los-angeles-california-hollywood-bowl-2026-11-21-8-pm/concert/18485953 |
| tm-phoebe-bridgers-2026-manchester-17uyv0g6gcqzprx | Phoebe Bridgers | 2026-11-26 | Manchester | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-glasgow-17uov0g6gor33_x | Phoebe Bridgers | 2026-11-27 | Glasgow | no_candidates_returned | - |
| tm-mariah-carey-2026-birmingham-1anzkfsgkdvieos | Mariah Carey | 2026-11-27 | Birmingham | no_candidates_returned | - |
| tm-blue-october-2026-irving-vvg1yz_6kcyhkx | Blue October | 2026-11-27 | Irving | conflicting_same_date_city_candidates | https://seatgeek.com/blue-october-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-27-8-pm/concert/18141902 |
| tm-phoebe-bridgers-2026-birmingham-17fyv0g6g2_ps5a | Phoebe Bridgers | 2026-11-28 | Birmingham | no_candidates_returned | - |
| tm-mariah-carey-2026-manchester-1amzkfsgkejdwkf | Mariah Carey | 2026-12-02 | Manchester | no_candidates_returned | - |
| tm-bryson-tiller-2026-manchester-17uyv0g65whosmd | Bryson Tiller | 2026-12-03 | Manchester | no_candidates_returned | - |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | 2026-12-06 | Berlin | no_candidates_returned | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | 2026-12-07 | Düsseldorf | no_candidates_returned | - |
| tm-bryson-tiller-2026-birmingham-17fyv0g65u9_ewp | Bryson Tiller | 2026-12-09 | Birmingham | no_candidates_returned | - |
| tm-polyphia-2026-birmingham-g5dzz_gsc9wjr | Polyphia | 2026-12-11 | Birmingham | no_candidates_returned | - |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-8nc- | Earth, Wind & Fire | 2026-12-11 | Atlantic City | no_candidates_returned | - |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-okcm | Earth, Wind & Fire | 2026-12-12 | Atlantic City | no_candidates_returned | - |
| tm-polyphia-2026-london-g5dzz_gljhn6p | Polyphia | 2026-12-16 | London | no_candidates_returned | - |
| tm-beartooth-2026-hollywood-vvg10z_1ikgdyb | Beartooth | 2026-12-18 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/beartooth-tickets/los-angeles-california-hollywood-palladium-2026-12-18-5-30-pm/concert/18253075 |
| tm-phish-2026-new-york-g5diz_kv3gvwh | Phish | 2026-12-30 | New York | conflicting_same_date_city_candidates | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-30-7-30-pm/concert/18659383 |
| tm-illenium-2026-san-francisco-g5vyz_kj0ltb6 | ILLENIUM | 2026-12-30 | San Francisco | conflicting_same_date_city_candidates | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-30-8-pm/concert/18621412 |
| tm-illenium-2027-san-francisco-g5vyz_kjpaqe2 | ILLENIUM | 2026-12-31 | San Francisco | conflicting_same_date_city_candidates | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-31-8-pm/concert/18621414 |
| tm-aespa-2027-manchester-g5vhz_gm82p9j | aespa | 2027-01-14 | Manchester | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-manchester-g5vhz_gnh6q4f | Five Finger Death Punch | 2027-01-16 | Manchester | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes | Five Finger Death Punch | 2027-01-17 | Glasgow | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s | Five Finger Death Punch | 2027-01-22 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-buffalo-k7v16k4vppotze82 | Dancing With The Stars | 2027-01-22 | Buffalo | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-glasgow-17uov0g6ueealfd | Two Door Cinema Club | 2027-01-26 | Glasgow | no_candidates_returned | - |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | 2027-01-26 | Berlin | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-manchester-g5vhz_ujflqde | Two Door Cinema Club | 2027-01-27 | Manchester | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1amzk40gkdjyurt | A Boogie Wit Da Hoodie | 2027-01-29 | Manchester | no_candidates_returned | - |
| tm-aespa-2027-barcelona-z698xz2qz16v0vckob | aespa | 2027-01-31 | Barcelona | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr | Nothing But Thieves | 2027-02-04 | Nottingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-philadelphia-1ayzk4vgkepepvt | Dancing With The Stars | 2027-02-04 | Philadelphia | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-york-g5diz_f1zup-t | Dancing With The Stars | 2027-02-05 | New York | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-washington-1a4zkfsgkew-uk5 | Dancing With The Stars | 2027-02-07 | Washington | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik | Nothing But Thieves | 2027-02-10 | Glasgow | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-boston-vv177z_kgks9d4wi | Dancing With The Stars | 2027-02-11 | Boston | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj | Nothing But Thieves | 2027-02-12 | Manchester | no_candidates_returned | - |
| tm-chelsea-cutler-2027-brooklyn-k7vgf_kze_vgc | Chelsea Cutler | 2027-02-12 | Brooklyn | city_or_metro_match_failed | https://seatgeek.com/chelsea-cutler-tickets/new-york-new-york-brooklyn-1-2027-02-12-7-pm/concert/18639182 |
| tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux | Nothing But Thieves | 2027-02-13 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-newark-vv17fz_kgkbxwhxi | Dancing With The Stars | 2027-02-13 | Newark | no_candidates_returned | - |
| tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt | Charli xcx | 2027-02-15 | Glasgow | no_candidates_returned | - |
| tm-charli-xcx-2027-manchester-1amzkfegkdf5asp | Charli xcx | 2027-02-17 | Manchester | no_candidates_returned | - |
| tm-dylan-gossett-2027-london-g5dzz_8kn_3tz | Dylan Gossett | 2027-02-18 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-rosemont-vv178z_kgku4hpsc | Dancing With The Stars | 2027-02-19 | Rosemont | no_candidates_returned | - |
| tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2 | Kacey Musgraves | 2027-02-22 | Glasgow | no_candidates_returned | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct | Sienna Spiro | 2027-02-22 | Edinburgh | no_candidates_returned | - |
| tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt | Kacey Musgraves | 2027-02-24 | Manchester | no_candidates_returned | - |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | 2027-02-24 | London | no_candidates_returned | - |
| tm-kacey-musgraves-2027-london-1adjz_agkmwrf6s | Kacey Musgraves | 2027-02-26 | London | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-manchester-g5vhz_kd3nkoq | Bullet For My Valentine | 2027-02-27 | Manchester | no_candidates_returned | - |
| tm-john-summit-2027-london-1agzk4egkdwrmjf | John Summit | 2027-02-27 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-birmingham-g5dzz_3nh3wrn | Malcolm Todd | 2027-02-27 | Birmingham | no_candidates_returned | - |
| tm-sienna-spiro-2027-manchester-17uov0g6ghevqqt | Sienna Spiro | 2027-03-01 | Manchester | no_candidates_returned | - |
| tm-sienna-spiro-2027-manchester-17uov0g6gnyji_e | Sienna Spiro | 2027-03-02 | Manchester | no_candidates_returned | - |
| tm-the-dead-south-2027-london-g5dzz_gjibvci | The Dead South | 2027-03-05 | London | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-london-g5dzz_g5cip1i | Sleeping With Sirens | 2027-03-07 | London | no_candidates_returned | - |
| tm-megadeth-2027-london-17uyv0g62ffnale | Megadeth | 2027-03-11 | London | no_candidates_returned | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | Teddy Swims | 2027-03-11 | Berlin | no_candidates_returned | - |
| tm-megadeth-2027-nottingham-17u8v0g62r_1dp- | Megadeth | 2027-03-12 | Nottingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-austin-g5diz_knamopo | Dancing With The Stars | 2027-03-12 | Austin | no_candidates_returned | - |
| tm-megadeth-2027-manchester-17uyv0g62wxq-cs | Megadeth | 2027-03-13 | Manchester | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-antonio-g5diz_kdu_auv | Dancing With The Stars | 2027-03-13 | San Antonio | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-seattle-vvg1hz_f63jugd | Dancing With The Stars | 2027-03-22 | Seattle | no_candidates_returned | - |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | Sienna Spiro | 2027-03-24 | Berlin | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-sacramento-g5vyz_kzd-r6s | Dancing With The Stars | 2027-03-26 | Sacramento | no_candidates_returned | - |
| tm-james-blunt-2027-birmingham-16nzkfo03zag7vec | James Blunt | 2027-03-27 | Birmingham | no_candidates_returned | - |
| tm-the-warning-2027-glasgow-g5dzz_3cmwwj3 | The Warning | 2027-03-30 | Glasgow | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w | Lizzy McAlpine | 2027-03-31 | London | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p | Lizzy McAlpine | 2027-04-01 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-anaheim-vv170z_kgkbh3n6- | Dancing With The Stars | 2027-04-01 | Anaheim | no_candidates_returned | - |
| tm-trivium-2027-manchester-1amzkffgkdkmgfp | Trivium | 2027-04-02 | Manchester | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk | Lizzy McAlpine | 2027-04-02 | London | no_candidates_returned | - |
| tm-the-warning-2027-london-1adjz_3gknpoval | The Warning | 2027-04-02 | London | no_candidates_returned | - |
| tm-james-blunt-2027-glasgow-1auzkfkgkdju5kw | James Blunt | 2027-04-02 | Glasgow | no_candidates_returned | - |
| tm-james-blunt-2027-manchester-1amzkfkgkdv2srk | James Blunt | 2027-04-03 | Manchester | no_candidates_returned | - |
| tm-kaleo-2027-london-g5dzz_uxmo7c5 | KALEO | 2027-04-03 | London | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-hollywood-vvg10z_5blnvha | Nothing But Thieves | 2027-04-04 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/nothing-but-thieves-tickets/los-angeles-california-hollywood-palladium-2027-04-04-8-pm/concert/18266342 |
| tm-brandi-carlile-2027-glasgow-16dbz_8p8g7is9u | Brandi Carlile | 2027-04-06 | Glasgow | no_candidates_returned | - |
| tm-kaleo-2027-manchester-17uov0g6ulnuuct | KALEO | 2027-04-06 | Manchester | no_candidates_returned | - |
| tm-kaleo-2027-glasgow-g5dzz_ujz8jhw | KALEO | 2027-04-08 | Glasgow | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | Thirty Seconds to Mars | 2027-04-08 | Madrid | no_candidates_returned | - |
| tm-sabaton-2027-glasgow-17uov0g6g3si1v4 | Sabaton | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | Thirty Seconds to Mars | 2027-04-09 | Valencia | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb | Lizzy McAlpine | 2027-04-10 | Glasgow | no_candidates_returned | - |
| tm-sabaton-2027-birmingham-17fyv0g6gp8gytu | Sabaton | 2027-04-10 | Birmingham | no_candidates_returned | - |
| tm-brandi-carlile-2027-manchester-1auzkfkgkd0yvnl | Brandi Carlile | 2027-04-10 | Manchester | no_candidates_returned | - |
| tm-teddy-swims-2027-glasgow-17uov0g62qlspvu | Teddy Swims | 2027-04-13 | Glasgow | no_candidates_returned | - |
| tm-foreigner-2027-london-16djz_37gg7hhxi | Foreigner | 2027-04-14 | London | no_candidates_returned | - |
| tm-teddy-swims-2027-manchester-17uyv0g62pcoosz | Teddy Swims | 2027-04-16 | Manchester | no_candidates_returned | - |
| tm-teddy-swims-2027-manchester-17uyv0g62m2z8vc | Teddy Swims | 2027-04-17 | Manchester | no_candidates_returned | - |
| tm-earth-wind-fire-2027-brandon-g5viz_kuehuto | Earth, Wind & Fire | 2027-04-17 | Brandon | no_candidates_returned | - |
| tm-teddy-swims-2027-manchester-17uyv0g62mo98gp | Teddy Swims | 2027-04-18 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-manchester-17uyv0g65rbpnzf | Gracie Abrams | 2027-04-22 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gk_vkhl | Gracie Abrams | 2027-04-24 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gkp6vc5 | Gracie Abrams | 2027-04-25 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65lvesak | Gracie Abrams | 2027-04-27 | Glasgow | no_candidates_returned | - |
| tm-earth-wind-fire-2027-columbia-g5evz_kl2875x | Earth, Wind & Fire | 2027-04-27 | Columbia | no_candidates_returned | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65vd1fhq | Gracie Abrams | 2027-04-28 | Glasgow | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-manchester-1amzk3agkeyexfs | Thirty Seconds to Mars | 2027-04-29 | Manchester | no_candidates_returned | - |
| tm-rod-stewart-2027-glasgow-1auzkfmgkehwkob | Rod Stewart | 2027-04-29 | Glasgow | no_candidates_returned | - |
| tm-earth-wind-fire-2027-charlotte-g5evz_kmaoltm | Earth, Wind & Fire | 2027-04-30 | Charlotte | no_candidates_returned | - |
| tm-rod-stewart-2027-glasgow-1auzkfygkdhvxxd | Rod Stewart | 2027-05-01 | Glasgow | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1kf4gb0b | Olivia Rodrigo | 2027-05-01 | Barcelona | no_candidates_returned | - |
| tm-def-leppard-2027-hollywood-vvg1iz_f7e8nik | Def Leppard | 2027-05-01 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/def-leppard-tickets/los-angeles-california-hollywood-bowl-2027-05-01-7-pm/concert/18662416 |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8uzwj6 | Olivia Rodrigo | 2027-05-02 | Barcelona | no_candidates_returned | - |
| tm-rod-stewart-2027-birmingham-1kfyvpcfga2dzlv | Rod Stewart | 2027-05-04 | Birmingham | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz16ezxvpe7 | Olivia Rodrigo | 2027-05-05 | Barcelona | no_candidates_returned | - |
| tm-rod-stewart-2027-manchester-1amzkfugkesbky7 | Rod Stewart | 2027-05-06 | Manchester | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8ffjf_ | Olivia Rodrigo | 2027-05-06 | Barcelona | no_candidates_returned | - |
| tm-simple-minds-2027-manchester-1amzkfxgkdzwjhm | Simple Minds | 2027-05-07 | Manchester | no_candidates_returned | - |
| tm-rod-stewart-2027-manchester-1amzkfzgkdjwz0v | Rod Stewart | 2027-05-08 | Manchester | no_candidates_returned | - |
| tm-simple-minds-2027-birmingham-1aegz_31ka4zdg5d | Simple Minds | 2027-05-08 | Birmingham | no_candidates_returned | - |
| tm-andrea-bocelli-2027-cardiff-1agzkfkgkejnxkj | Andrea Bocelli | 2027-05-08 | Cardiff | no_candidates_returned | - |
| tm-simple-minds-2027-nottingham-1adfz_31k14zduv5 | Simple Minds | 2027-05-10 | Nottingham | no_candidates_returned | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | Gracie Abrams | 2027-05-12 | Berlin | no_candidates_returned | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | Gracie Abrams | 2027-05-13 | Berlin | no_candidates_returned | - |
| tm-simple-minds-2027-glasgow-1auzkfxgkd0xdr8 | Simple Minds | 2027-05-14 | Glasgow | no_candidates_returned | - |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | Sombr | 2027-05-14 | Hamburg | no_candidates_returned | - |
| tm-weezer-2027-manchester-1amzkf7gkderotz | Weezer | 2027-05-15 | Manchester | no_candidates_returned | - |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | Sombr | 2027-05-18 | Berlin | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1adfz_3gknft-og | Oasis | 2027-05-21 | Glasgow | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-hollywood-vv16azk4k-kza5aa16 | Two Door Cinema Club | 2027-05-22 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/two-door-cinema-club-tickets/los-angeles-california-hollywood-palladium-2027-05-22-8-pm/concert/18711340 |
| tm-oasis-2027-glasgow-1agzkfwgkd1ybno | Oasis | 2027-05-23 | Glasgow | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-hollywood-vv170z_4gknbp_nx | Two Door Cinema Club | 2027-05-23 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/two-door-cinema-club-tickets/los-angeles-california-hollywood-palladium-2027-05-23-7-pm/concert/18728159 |
| tm-oasis-2027-glasgow-1agzkfwgkd5kfpx | Oasis | 2027-05-25 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-birmingham-1kfyvp3_gagcomu | Nickelback | 2027-05-28 | Birmingham | no_candidates_returned | - |
| tm-tame-impala-2027-manchester-1amzkf4gkemyn8u | Tame Impala | 2027-05-28 | Manchester | no_candidates_returned | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | Gracie Abrams | 2027-05-28 | Barcelona | no_candidates_returned | - |
| tm-tame-impala-2027-manchester-1amzkf_gkdr-2ec | Tame Impala | 2027-05-29 | Manchester | no_candidates_returned | - |
| tm-fall-out-boy-2027-glasgow-1kuovp_ega1oorm | Fall Out Boy | 2027-05-30 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-glasgow-1auzk46gkexekqz | Nickelback | 2027-06-01 | Glasgow | no_candidates_returned | - |
| tm-greta-van-fleet-2027-manchester-1adjz_kgkbyud70 | Greta Van Fleet | 2027-06-01 | Manchester | no_candidates_returned | - |
| tm-greta-van-fleet-2027-glasgow-1auzkfugkd_hipm | Greta Van Fleet | 2027-06-02 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-manchester-1amzk46gkdgpim1 | Nickelback | 2027-06-02 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1agzk4fgkd88g8t | Sam Fender | 2027-06-03 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-fall-out-boy-2027-manchester-1amzk4pgkdukzs6 | Fall Out Boy | 2027-06-03 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lwzpdp | Oasis | 2027-06-04 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1adfz_fgktpp_oj | Sam Fender | 2027-06-05 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lmyj87 | Oasis | 2027-06-06 | Manchester | no_candidates_returned | - |
| tm-fall-out-boy-2027-manchester-1adjz_pgkrptysy | Fall Out Boy | 2027-06-06 | Manchester | no_candidates_returned | - |
| tm-a-perfect-circle-2027-hollywood-vvg1iz_kj6yzfl | A Perfect Circle | 2027-06-06 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/a-perfect-circle-tickets/los-angeles-california-hollywood-bowl-2027-06-06-7-30-pm/concert/18632554 |
| tm-oasis-2027-manchester-g5dzz_3lbuu4c | Oasis | 2027-06-08 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3nq9ecb | Oasis | 2027-06-15 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-london-16nzk4f00zauv12c | Sam Fender | 2027-06-18 | London | no_candidates_returned | - |
| tm-sombr-2027-glasgow-1auzkfbgkeiqyo0 | Sombr | 2027-06-19 | Glasgow | no_candidates_returned | - |
| tm-sam-fender-2027-london-1anzk4fgkdp88g6 | Sam Fender | 2027-06-20 | London | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3l0pglg | Oasis | 2027-06-22 | Manchester | no_candidates_returned | - |
| tm-alex-warren-2027-woodstock-16djz_4q3g7mfnf | Alex Warren | 2027-06-27 | Woodstock | no_candidates_returned | - |
| tm-alex-warren-2027-scarborough-1agzkf0gkdh1nyj | Alex Warren | 2027-06-30 | Scarborough | no_candidates_returned | - |
| tm-alex-warren-2027-manchester-g5dzz_fblbfue | Alex Warren | 2027-07-02 | Manchester | no_candidates_returned | - |
| tm-alex-warren-2027-london-1amzkfngkdb5am5 | Alex Warren | 2027-07-03 | London | no_candidates_returned | - |
| tm-slipknot-2027-london-1anzkfggkdhuzzd | Slipknot | 2027-07-03 | London | no_candidates_returned | - |
| tm-mariah-carey-2027-scarborough-1agzk49gkd3hqbt | Mariah Carey | 2027-07-03 | Scarborough | no_candidates_returned | - |
| tm-sam-fender-2027-manchester-g5dzz_42lyjlw | Sam Fender | 2027-07-15 | Manchester | no_candidates_returned | - |
| tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c | Fall Out Boy | 2027-07-18 | Washington | api_call_limit_not_checked | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | The Fennec - Main Stage | The Fennec - Sports, Live Music, Events | https://seatgeek.com/black-stone-cherry-tickets/birmingham-alabama-the-fennec-sports-live-music-events-2026-11-21-8-pm/concert/18637134 |
| tm-latto-2026-boston-z7r9jz1aae_7z | Roadrunner-Boston | TD Garden | https://seatgeek.com/doja-cat-tickets/boston-massachusetts-td-garden-2026-11-23-7-30-pm/concert/17769352 |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Cascade Theater | Cascade Theatre - Redding | https://seatgeek.com/pink-martini-tickets/redding-california-cascade-theatre-redding-2026-12-04-7-30-pm/concert/18690405 |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/blue-october-tickets/oklahoma-city-oklahoma-the-criterion-okc-2026-12-06-8-pm/concert/18143446 |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | Paramount Theatre | WaMu Theater | https://seatgeek.com/victoria-monet-tickets/seattle-washington-wamu-theater-2026-12-14-8-pm/concert/18579793 |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | Ramsey Concert Hall | Hodgson Concert Hall at the UGA Performing Arts Center | https://seatgeek.com/pink-martini-tickets/athens-georgia-hodgson-concert-hall-at-the-uga-performing-arts-center-2027-01-19-7-30-pm/concert/18701989 |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | Mesa Theatre & Club | Mesa Theater | https://seatgeek.com/atmosphere-tickets/grand-junction-colorado-mesa-theater-2027-01-20-7-pm/concert/18609076 |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/air-supply-tickets/daytona-beach-florida-peabody-auditorium-2027-01-22-8-pm/concert/18355671 |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | Seminole Center | Seminole Casino Immokalee | https://seatgeek.com/air-supply-tickets/immokalee-florida-seminole-casino-immokalee-2027-01-30-8-pm/concert/18424504 |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | Rose Marie and John Beston Hall | Nazareth College Arts Center | https://seatgeek.com/tommy-emmanuel-tickets/rochester-new-york-nazareth-college-arts-center-2027-02-02-7-pm/concert/18818332 |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/pink-martini-tickets/madison-wisconsin-orpheum-theatre-madison-2027-02-16-7-30-pm/concert/18472447 |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Midway Music Hall | Midway - Edmonton | https://seatgeek.com/valley-tickets/edmonton-canada-midway-edmonton-2027-02-19-6-30-pm/concert/18606369 |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Bogart's | Bogarts - Cincinnati | https://seatgeek.com/dinosaur-jr-tickets/cincinnati-ohio-bogarts-cincinnati-2027-02-27-7-pm/concert/18540446 |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | The Showroom at Wild Horse Pass Resort & Casino | Gila River Hotels & Casinos - Wild Horse Pass | https://seatgeek.com/dylan-scott-tickets/chandler-arizona-gila-river-hotels-casinos-wild-horse-pass-2027-02-27-8-pm/concert/18601182 |
| tm-valley-2027-denver-z7r9jz1aavzfu | Bluebird Theatre | Bluebird Theater - Denver | https://seatgeek.com/valley-tickets/denver-colorado-bluebird-theater-denver-2027-03-06-9-pm/concert/18683979 |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Bogart's | Bogarts - Cincinnati | https://seatgeek.com/mico-tickets/cincinnati-ohio-bogarts-cincinnati-2027-03-12-7-pm/concert/18666222 |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | Cascade Theater | Cascade Theatre - Redding | https://seatgeek.com/grace-potter-the-nocturnals-tickets/redding-california-cascade-theatre-redding-2027-03-14-7-30-pm/concert/18755563 |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | Oriental Theatre-CO | The Oriental Theater | https://seatgeek.com/vnv-nation-tickets/denver-colorado-the-oriental-theater-2027-03-27-8-pm/concert/18669971 |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/melissa-etheridge-tickets/madison-wisconsin-orpheum-theatre-madison-2027-04-03-8-pm/concert/18754496 |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | SOMA - Mainstage | SOMA - San Diego | https://seatgeek.com/nothing-but-thieves-tickets/san-diego-california-soma-san-diego-2027-04-06-8-pm/concert/18266339 |
| tm-melissa-etheridge-2027-chandler-1a_zk4ngkdm2bwk | The Showroom at Wild Horse Pass Resort & Casino | Gila River Hotels & Casinos - Wild Horse Pass | https://seatgeek.com/melissa-etheridge-tickets/chandler-arizona-gila-river-hotels-casinos-wild-horse-pass-2027-04-23-8-pm/concert/18754727 |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | SOMA - Mainstage | SOMA - San Diego | https://seatgeek.com/saint-levant-tickets/san-diego-california-soma-san-diego-2027-04-28-7-pm/concert/18386209 |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/the-warning-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-01-7-pm/concert/18593400 |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/meshuggah-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-02-7-pm/concert/18724686 |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Bluebird Theatre | Bluebird Theater - Denver | https://seatgeek.com/mei-semones-tickets/denver-colorado-bluebird-theater-denver-2027-05-02-8-pm/concert/18793886 |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | Blue Arena at The Ranch Events Complex | Blue Federal Credit Union Arena | https://seatgeek.com/jon-pardi-tickets/loveland-colorado-blue-federal-credit-union-arena-2027-05-13-7-pm/concert/18391250 |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Thelma Gaylord Performing Arts Theatre | Thelma Gaylord PAT At Civic Center Music Hall | https://seatgeek.com/lizzy-mcalpine-tickets/oklahoma-city-oklahoma-thelma-gaylord-pat-at-civic-center-music-hall-2027-05-18-7-pm/concert/18619437 |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/dylan-gossett-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-20-7-pm/concert/18642116 |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | NOTO | Xfinity Mobile Arena | https://seatgeek.com/doja-cat-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-29-7-30-pm/concert/17769353 |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Marian Anderson Hall - Kimmel Center | Kimmel Center - Miller Theater | https://seatgeek.com/pink-martini-tickets/philadelphia-pennsylvania-kimmel-center-miller-theater-2026-12-14-7-pm/concert/18364153 |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Hard Rock Hotel & Casino Ottawa | Hard Rock Cafe | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | Hard Rock Hotel & Casino Ottawa | Hard Rock Cafe | https://seatgeek.com/theory-of-a-deadman-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-11-7-pm/concert/18570538 |
| tm-lord-huron-2026-philadelphia-vvg1fz_2mgblql | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/lord-huron-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-12-8-pm/concert/18421969 |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | The Eastern-GA | The Eastern - Atlanta | https://seatgeek.com/chelsea-cutler-tickets/atlanta-georgia-the-eastern-atlanta-2027-01-30-3-30-am/concert/18639169 |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Memorial Hall - OH | Anderson Theater At Cincinnati Memorial Hall | https://seatgeek.com/pink-martini-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-02-11-8-pm/concert/18321561 |
| tm-remi-wolf-2027-philadelphia-vv1aovpotga2njys | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/remi-wolf-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-02-26-8-pm/concert/18664758 |
| tm-intocable-2027-nashville-z7r9jz1aaak0d | The Pinnacle - TN | The Pinnacle - Nashville | https://seatgeek.com/intocable-tickets/nashville-tennessee-the-pinnacle-nashville-2027-02-27-8-pm/concert/18786697 |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Hutchins Concert Hall | Collins Center for the Arts | https://seatgeek.com/daughtry-tickets/orono-maine-collins-center-for-the-arts-2027-03-01-7-pm/concert/18632934 |
| tm-meshuggah-2027-philadelphia-vv1aezk44gkd2msbd | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/meshuggah-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-02-7-pm/concert/18724657 |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Memorial Hall - OH | Anderson Theater At Cincinnati Memorial Hall | https://seatgeek.com/foy-vance-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-04-12-7-pm/concert/18085807 |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | Coyote Joes | Coyote Joe's - Charlotte | https://seatgeek.com/warren-zeiders-tickets/charlotte-north-carolina-coyote-joe-s-charlotte-2027-05-01-7-pm/concert/18649767 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-08-8-pm/concert/18612961 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-09-8-pm/concert/18612966 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-10-7-pm/concert/18612962 |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Patchogue Theater | Patchogue Theatre for the Performing Arts | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Vic Theatre | The WIP Theater | https://seatgeek.com/dinosaur-jr-tickets/chicago-illinois-the-wip-theater-2027-03-05-7-30-pm/concert/18666384 |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | The Rock Box | Vibes Event Center | https://seatgeek.com/missio-tickets/san-antonio-texas-vibes-event-center-2027-04-09-7-pm/concert/18853293 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | Greensboro Complex | Special Events Center At Greensboro Coliseum Complex | https://seatgeek.com/meshuggah-tickets/greensboro-north-carolina-special-events-center-at-greensboro-coliseum-complex-2027-05-11-7-pm/concert/18724694 |
| tm-travis-tritt-2027-bossier-city-g5viz_p2n3lzw | Riverdome at Horseshoe Casino & Hotel - Bossier City | Horseshoe Casino Riverdome | https://seatgeek.com/travis-tritt-tickets/bossier-city-louisiana-horseshoe-casino-riverdome-2027-07-16-8-pm/concert/18756251 |

## Conflicts found

- tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6ce (Billy Strings, 2027-04-08, Saint Augustine)
  - 100: https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-08-3-30-am/concert/18793248
- tm-mumford-sons-2027-milwaukee-vv1a6zk40gkdo7krz (Mumford & Sons, 2027-07-09, Milwaukee)
  - 100: https://seatgeek.com/mumford-sons-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-09-10-am/concert/18753197
- tm-kpop-demon-hunters-2027-los-angeles-z7r9jz1aaaf4v (KPop Demon Hunters, 2027-07-31, Los Angeles)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/los-angeles-california-crypto-com-arena-2027-07-31-2-pm/concert/18772708
- tm-kpop-demon-hunters-2027-las-vegas-z7r9jz1aaa_kp (KPop Demon Hunters, 2027-08-07, Las Vegas)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/las-vegas-nevada-t-mobile-arena-2027-08-07-2-pm/concert/18772710
- tm-kpop-demon-hunters-2027-hamilton-1avzz_pgknnsz0d (KPop Demon Hunters, 2027-06-26, Hamilton)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/hamilton-canada-td-coliseum-2027-06-26-7-30-pm/concert/18772681
- tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 (Eros Ramazzotti, 2027-09-29, Boston)
  - 100: https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/17481896
- tm-trans-siberian-orchestra-2026-youngstown-vv1aazkfagkd2zwpt (Trans-Siberian Orchestra, 2026-11-22, Youngstown)
  - 100: https://seatgeek.com/trans-siberian-orchestra-tickets/youngstown-ohio-covelli-centre-2026-11-22-7-30-pm/concert/18573366
- tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy (RUFUS DU SOL, 2026-11-22, Las Vegas)
  - 95: https://seatgeek.com/rufus-du-sol-tickets/las-vegas-nevada-tryst-nightclub-at-wynn-las-vegas-2026-11-22-10-30-pm/concert/18709848
- tm-billy-strings-2027-asheville-g5evz_omwlg3b (Billy Strings, 2027-02-04, Asheville)
  - 100: https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-04-7-30-pm/concert/18540080
- tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr (Gary Allan, 2027-03-13, Peoria)
  - 100: https://seatgeek.com/gary-allan-tickets/peoria-illinois-prairie-home-alliance-theater-at-peoria-civic-center-2027-03-13-8-pm/concert/18561304
- tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o (Hazlett, 2027-04-25, Pittsburgh)
  - 100: https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-7-pm/concert/18312117
- tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp (KPop Demon Hunters, 2027-06-05, Baltimore)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/baltimore-maryland-cfg-bank-arena-2027-06-05-7-30-pm/concert/18772666
- tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp (KPop Demon Hunters, 2027-06-12, Newark)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-12-7-30-pm/concert/18772724
- tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy (KPop Demon Hunters, 2027-06-19, Chicago)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-19-7-30-pm/concert/18772678
- tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s (KPop Demon Hunters, 2027-07-03, Pittsburgh)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-07-03-7-30-pm/concert/18772686
- tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu (KPop Demon Hunters, 2027-07-10, Atlanta)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/atlanta-georgia-state-farm-arena-1-2027-07-10-7-30-pm/concert/18772694
- tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 (KPop Demon Hunters, 2027-07-17, Orlando)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-1-pm/concert/18772696
- tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 (KPop Demon Hunters, 2027-07-24, Phoenix)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-7-30-pm/concert/18772701
- tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih (KPop Demon Hunters, 2027-08-14, Tacoma)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-7-30-pm/concert/18772721
- tm-billy-strings-2027-duluth-vvg1zz_oinx98f (Billy Strings, 2027-02-12, Duluth)
  - 100: https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-12-3-30-am/concert/18540097
- tm-billy-strings-2027-nashville-g5viz_on579po (Billy Strings, 2027-02-19, Nashville)
  - 100: https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-19-3-30-am/concert/18542780
- tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s (Chelsea Cutler, 2027-02-21, Columbus)
  - 100: https://seatgeek.com/chelsea-cutler-tickets/columbus-ohio-newport-music-hall-2027-02-21-12-pm/concert/18791975
- tm-dropkick-murphys-2027-boston-vv1avzkfsgkdtcsmb (Dropkick Murphys, 2027-03-13, Boston)
  - 100: https://seatgeek.com/dropkick-murphys-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-13-2-pm/concert/18685645
- tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 (Saint Levant, 2027-04-03, Chicago)
  - 100: https://seatgeek.com/saint-levant-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-04-03-8-pm/concert/18386191
- tm-billy-strings-2027-north-charleston-g5evz_pjlgein (Billy Strings, 2027-04-16, North Charleston)
  - 100: https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-16-3-30-am/concert/18755187
- tm-alex-warren-2027-sioux-falls-vv17bz_pgknvdnah (Alex Warren, 2027-04-21, Sioux Falls)
  - 100: https://seatgeek.com/alex-warren-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-21-5-pm/concert/18854346
- tm-billy-strings-2027-greensboro-g5evz_pk9bhy8 (Billy Strings, 2027-04-23, Greensboro)
  - 100: https://seatgeek.com/billy-strings-tickets/greensboro-north-carolina-first-horizon-coliseum-2027-04-23-3-30-am/concert/18755195
- tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 (Zach Bryan, 2027-05-22, Nashville)
  - 100: https://seatgeek.com/zach-bryan-tickets/nashville-tennessee-nissan-stadium-1-titans-way-2027-05-22-7-pm/concert/18662657
- tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa (Kenny Chesney, 2027-07-03, Nashville)
  - 100: https://seatgeek.com/kenny-chesney-tickets/nashville-tennessee-nissan-stadium-1-titans-way-2027-07-03-4-30-pm/concert/18581593
- tm-blue-october-2026-irving-vvg1yz_6kcyhkx (Blue October, 2026-11-27, Irving)
  - 100: https://seatgeek.com/blue-october-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-27-3-30-am/concert/18141904
- tm-phish-2026-new-york-g5diz_kv3gvwh (Phish, 2026-12-30, New York)
  - 100: https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-30-3-30-am/concert/18659386
- tm-illenium-2026-san-francisco-g5vyz_kj0ltb6 (ILLENIUM, 2026-12-30, San Francisco)
  - 100: https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-30-8-pm/concert/18620724
- tm-illenium-2027-san-francisco-g5vyz_kjpaqe2 (ILLENIUM, 2026-12-31, San Francisco)
  - 100: https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-31-8-pm/concert/18620692

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

| showId | artist | datetime_iso | reason | detail |
| --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | morgan-wallen | 2026-05-08T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | morgan-wallen | 2026-05-09T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbf | morgan-wallen | 2026-07-25T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-philadelphia-0200635dc72ec234 | morgan-wallen | 2026-07-31T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504538196 | harry-styles | 2026-08-29T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504b581eb | harry-styles | 2026-09-10T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504d78209 | harry-styles | 2026-09-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505018228 | harry-styles | 2026-09-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505768283 | harry-styles | 2026-10-01T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b006435059882a6 | harry-styles | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505b782ca | harry-styles | 2026-10-10T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643506808378 | harry-styles | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b006435069e8398 | harry-styles | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-foxborough-0100642cc24ebb04 | bts | 2026-08-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-chicago-0400642acc7e5d9b | bts | 2026-08-29T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-inglewood-0a006429b353645f | bts | 2026-09-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | ariana-grande | 2026-07-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f34a4abb | ariana-grande | 2026-07-13T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f41b4abf | ariana-grande | 2026-07-16T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006325205054e3 | ariana-grande | 2026-07-19T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-0100631aaef23ee8 | ariana-grande | 2026-07-23T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-0100631aca626435 | ariana-grande | 2026-07-26T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-010063289ef611c4 | ariana-grande | 2026-07-25T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-montreal-31006319ddb22b1f | ariana-grande | 2026-07-28T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-montreal-31006319dedc2b4c | ariana-grande | 2026-07-31T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-chicago-04006319ddea2cd5 | ariana-grande | 2026-08-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-chicago-04006325ad9f24a7 | ariana-grande | 2026-08-06T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c8ea13055 | ariana-grande | 2026-08-15T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c937630fa | ariana-grande | 2026-08-16T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c950d310b | ariana-grande | 2026-08-19T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c97193144 | ariana-grande | 2026-08-20T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c98a031b3 | ariana-grande | 2026-08-23T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4e94ebb | ariana-grande | 2026-08-24T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | ariana-grande | 2026-08-27T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f5075024 | ariana-grande | 2026-08-28T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | ariana-grande | 2026-08-31T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f50f50d8 | ariana-grande | 2026-09-01T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-barcelona-653666176 | bad-bunny | 2026-05-22T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-barcelona-1116290311 | bad-bunny | 2026-05-23T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-417009905 | bad-bunny | 2026-05-30T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1848567714 | bad-bunny | 2026-05-31T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1589736692 | bad-bunny | 2026-06-02T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-961888291 | bad-bunny | 2026-06-03T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1852247887 | bad-bunny | 2026-06-06T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1341715816 | bad-bunny | 2026-06-07T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-412370092 | bad-bunny | 2026-06-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-2035589996 | bad-bunny | 2026-06-11T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1378879656 | bad-bunny | 2026-06-14T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1566404077 | bad-bunny | 2026-06-15T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | bad-bunny | 2026-06-20T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-d-sseldorf-653946928 | bad-bunny | 2026-06-21T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-arnhem-1578299680 | bad-bunny | 2026-06-23T19:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-arnhem-2018685385 | bad-bunny | 2026-06-24T19:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-london-3500629efc0c8bc1 | bad-bunny | 2026-06-27T17:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-london-350062a39074101f | bad-bunny | 2026-06-28T17:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-stockholm-625835491 | bad-bunny | 2026-07-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-stockholm-734104140 | bad-bunny | 2026-07-11T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-warsaw-1844913130 | bad-bunny | 2026-07-14T17:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html | bad-bunny | 2026-07-17T20:45:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-18-luglio-2026-ippodromo-snai-la-maura-milano-13408.html | bad-bunny | 2026-07-18T20:45:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-brussels-1117180915 | bad-bunny | 2026-07-22T00:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-bronx-1d006473d78cfdb8 | jay-z | 2026-07-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a706ep | olivia-rodrigo | 2026-09-25T19:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a70677 | olivia-rodrigo | 2026-09-26T19:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-pittsburgh-1avbz_agkm9wrr7 | olivia-rodrigo | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-washington-1ka8v0pdgacx387 | olivia-rodrigo | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-boston-vv177z_agkv-whjn | olivia-rodrigo | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-columbus-vv1aazkcfgkdl2qzg | bruno-mars | 2026-05-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkev_6oa | bruno-mars | 2026-05-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevq6og | bruno-mars | 2026-05-24T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevqmo2 | bruno-mars | 2026-05-27T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevhmob | bruno-mars | 2026-05-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-168zk8yb-za2d6ed | bruno-mars | 2026-05-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_k | bruno-mars | 2026-06-18 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_6 | bruno-mars | 2026-06-20 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_f | bruno-mars | 2026-06-21 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_k | bruno-mars | 2026-06-26T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_f | bruno-mars | 2026-06-28T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_4 | bruno-mars | 2026-06-29T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vg6pypf | bruno-mars | 2026-07-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16v3zapgk | bruno-mars | 2026-07-04T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz1kbsa6fz | bruno-mars | 2026-07-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vvoue3b | bruno-mars | 2026-07-07T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1kutpbz7 | bruno-mars | 2026-07-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1koyq7f6 | bruno-mars | 2026-07-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_x | bruno-mars | 2026-07-14T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_n | bruno-mars | 2026-07-15T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1aegzbzgksgzoma | bruno-mars | 2026-07-18T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdftyue | bruno-mars | 2026-07-19T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkduy8wh | bruno-mars | 2026-07-22T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdmnywe | bruno-mars | 2026-07-24T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdzq8wy | bruno-mars | 2026-07-25T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdbd8xc | bruno-mars | 2026-07-28T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydo-qcd | bruno-mars | 2026-08-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydoxccx | bruno-mars | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-foxborough-vv1avzk8igkdnsgxb | bruno-mars | 2026-09-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-indianapolis-vv17fzbygklnuhph | bruno-mars | 2026-09-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-tampa-vvg1vz_e944pwc | bruno-mars | 2026-09-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7ox8i | bruno-mars | 2026-09-27T19:00:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_a6pmg6f | bruno-mars | 2026-10-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1izbyhid9od | bruno-mars | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_ehecvin | bruno-mars | 2026-10-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-vancouver-1av7z_egkshmjia | bruno-mars | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-vancouver-1av7z_egkwimwwb | bruno-mars | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-boston-vv1avzkosgkdb5unc | shakira | 2026-07-11T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-atlantic-city-vv17fz_6gkb5efrp | shakira | 2026-07-26T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1k7eo4av | shakira | 2026-09-18T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vas39ay | shakira | 2026-09-19T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vrkvz38 | shakira | 2026-09-20T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v_oqxoe | shakira | 2026-09-25T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vowff-f | shakira | 2026-09-26T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1konkpax | shakira | 2026-09-27T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1kbi4uav | shakira | 2026-10-02T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v4mzjas | shakira | 2026-10-03T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v73axp9 | shakira | 2026-10-04T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1koifuzg | shakira | 2026-10-09T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1koecouy | shakira | 2026-10-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vfpafo8 | shakira | 2026-10-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-santa-clara-1c006331c1a54d19 | ed-sheeran | 2026-07-26T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-toronto-1000632fe9ca4361 | ed-sheeran | 2026-08-22T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-atlanta-0e00632fc0572cc1 | ed-sheeran | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-charlotte-2d006331aac349eb | ed-sheeran | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-atlanta-vvg1zz_dkce1ug | summer-walker | 2026-06-12T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-miami-vvg1vz_d3n-985 | summer-walker | 2026-06-14T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-london-1agzk8mgkdnfpsx | summer-walker | 2026-08-01T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-london-1agzk8ugkeefegp | summer-walker | 2026-08-02T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkuqz8x- | harry-styles | 2026-06-19T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkusb-e- | harry-styles | 2026-06-20T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkug9sdf | harry-styles | 2026-06-23T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmuro6v | harry-styles | 2026-06-26T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmcbo6q | harry-styles | 2026-06-27T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkm2xs6r | harry-styles | 2026-06-29T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmkmofc | harry-styles | 2026-07-01T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmfmsfv | harry-styles | 2026-07-03T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkm4csfw | harry-styles | 2026-07-04T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-madrid-z698xz2qz16ezdbsgk | bts | 2026-06-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-madrid-z698xz2qz16ez94-rv | bts | 2026-06-27T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-munich-z698xzc2z1konbaqf | bts | 2026-07-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-munich-z698xzc2z1kfj7mgy | bts | 2026-07-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-arlington-z7r9jz1a7ooui | bts | 2026-08-15T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-arlington-z7r9jz1a7oout | bts | 2026-08-16T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-toronto-1avzz_egkiiidcu | bts | 2026-08-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoav | ariana-grande | 2026-06-30T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoaz | ariana-grande | 2026-07-02T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7j6op | ariana-grande | 2026-07-03T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-marseille-z7r9jz1a7baxb | bad-bunny | 2026-07-01T20:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-inglewood-vvg1iz_gncu5jv | jay-z | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lhqy5 | charli-xcx | 2026-09-15T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-toronto-177zv0g6gkluljm | charli-xcx | 2026-09-21T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-boston-vvg17z_gpmbifj | charli-xcx | 2026-09-25T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-atlanta-vvg1zz_g99-nfd | charli-xcx | 2026-10-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-inglewood-vvg10z_g9r7nph | charli-xcx | 2026-10-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-glendale-17k8v0g6g9pu_yt | charli-xcx | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-houston-z7r9jz1a7oixf | summer-walker | 2026-06-21T19:30:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-chicago-vv178zbugkmzvbum | rosalia | 2026-06-21T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-houston-z7r9jz1a7oz43 | rosalia | 2026-06-23T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv170zbugkd8gp9v | rosalia | 2026-06-30T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv1k0zbzfzg7tulc | rosalia | 2026-07-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-san-diego-vvg1izbuda5f5g | rosalia | 2026-07-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-bristow-17a8v0g6urtwfpk | summer-walker | 2026-09-19T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cksbad4 | jay-z | 2026-09-04T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | 2026-07-22T00:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-kansas-city-vv17bz_dgkhumcmx | post-malone | 2026-07-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-ames-vv17bz_dgkbv6aim | post-malone | 2026-07-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-edmonton-1av7z_dgkdhlsdx | post-malone | 2026-07-25T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-edmonton-1aozkodgkd2xd4i | post-malone | 2026-07-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-salt-lake-city-g5vzz_dbvwfnk | post-malone | 2026-07-29T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-eugene-vvg1hzbz5kbt3x | zach-bryan | 2026-07-26T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-san-diego-vvg1izbuhfiera | zach-bryan | 2026-08-01T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-san-diego-vvg1izbunnre2z | zach-bryan | 2026-08-02T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-salt-lake-city-g5vzzbm2nlqmp | zach-bryan | 2026-08-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-denver-g5vzzbm515_rn | zach-bryan | 2026-08-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-denver-g5vzzbm51uyri | zach-bryan | 2026-08-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | 2026-08-22T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | 2026-09-05T19:00:00-07:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | 2026-09-18T15:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | 2026-09-19T15:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-toronto-1a8zkcegkegri4f | zach-bryan | 2026-09-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-toronto-1a8zkcegkeuxbbr | zach-bryan | 2026-09-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv1avzkupgkeoeq1t | zach-bryan | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv16vzkuso6za26afg | zach-bryan | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-auburn-university-z7r9jz1a7r4ev | zach-bryan | 2026-10-10T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | 2026-07-30T17:30:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-1a8zk8ygkeelgsk | tame-impala | 2026-07-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-168zk8uopzackd28 | tame-impala | 2026-07-26T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzk8ygkdxncl3 | tame-impala | 2026-07-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzko7gkd9ltgz | tame-impala | 2026-07-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_dq4fyz7 | tame-impala | 2026-08-01T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_7stecj- | tame-impala | 2026-08-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7ksioai | tame-impala | 2026-08-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7s7cobq | tame-impala | 2026-08-06T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-columbus-vv1aazk8ugkebkhue | tame-impala | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | 2026-08-28T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6os55n | tame-impala | 2026-09-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6ov55i | tame-impala | 2026-09-03T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkd-fy4x | tame-impala | 2026-09-06T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkdlltoy | tame-impala | 2026-09-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-portland-vvg1hz_dmh0iyk | tame-impala | 2026-09-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-denver-g5vzz_dkexywp | tame-impala | 2026-09-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-phoenix-1a_zk8ggkdiaazn | tame-impala | 2026-09-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-dallas-vvg1yz_dkfcyvg | tame-impala | 2026-09-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | 2026-09-19T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | 2026-09-20T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cxpcqan | jay-z | 2026-09-05T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-birmingham-1anzkoygkdrzveg | niall-horan | 2026-09-22T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-newcastle-upon-tyne-g5vhz_6jezgkf | niall-horan | 2026-09-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-manchester-1amzkozgkdqek4f | niall-horan | 2026-09-25T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-glasgow-1auzkozgkeyxugy | niall-horan | 2026-09-28T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-sheffield-16gzkozpuza5kedv | niall-horan | 2026-09-29T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdkpykl | niall-horan | 2026-10-02T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdvbgdi | niall-horan | 2026-10-03T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | 2026-10-25T20:15:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-assago-zg9rmiynyzedfa | niall-horan | 2026-10-28T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-casalecchio-di-reno-bologna-zg9rmiynyzedff | niall-horan | 2026-10-29T19:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | 2026-10-31T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-krakow-z698xzqpz1kq7zp-- | niall-horan | 2026-11-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-merksem-antwerpen-z698xzg2z1k1kb9e_ | niall-horan | 2026-11-05T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-detroit-vv17ozbsgki0b7ti | doja-cat | 2026-10-01T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-chicago-vv178zbsgknyfves | doja-cat | 2026-10-04T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-minneapolis-vv17bzbsgknj3vy9 | doja-cat | 2026-10-05T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-kansas-city-vv17bzbsgkwntdvb | doja-cat | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-denver-g5vzzbsefo0an | doja-cat | 2026-10-09T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-west-valley-city-g5vzzbslbgavf | doja-cat | 2026-10-11T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-vancouver-1aozkgygkdosigy | doja-cat | 2026-10-14T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-seattle-vvg1hzbslq8got | doja-cat | 2026-10-16T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-portland-vvg1hzbsnaneis | doja-cat | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-sacramento-g5vyzbsnj9ve1 | doja-cat | 2026-10-21T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-austin-g5dizbsl2m6xd | doja-cat | 2026-11-04T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-dallas-vvg1yzbstqyohd | doja-cat | 2026-11-05T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-san-antonio-g5dizbsnv5jt4 | doja-cat | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-orlando-1aefzbsgklnlnmt | doja-cat | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-atlanta-vvg1zzbsle3ugd | doja-cat | 2026-11-18T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-vancouver-1aozk3agkddnbd1 | sombr | 2026-09-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-seattle-vvg1hz_feci1ir | sombr | 2026-10-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-portland-vvg1hz_fljtdxu | sombr | 2026-10-03T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-sacramento-g5vyz_fli21bj | sombr | 2026-10-07T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-san-jose-g5vyz_fljzy-y | sombr | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-anaheim-vv1fe8v0xoqvz7u1ue | sombr | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-inglewood-vv16azk3azmzauak1v | sombr | 2026-10-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | 2026-10-17T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-dallas-vvg1yz_fn5kifv | sombr | 2026-10-19T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-austin-g5diz_fem5b0f | sombr | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-orlando-1aefz_fgkn1mew3 | sombr | 2026-10-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-chicago-vv1a7zk36gkd2hi7b | sombr | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-detroit-vv1afzk3fgkeg5jlz | sombr | 2026-11-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | 2026-11-13T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-buffalo-k7v17_f0kg7ij1e | sombr | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | 2026-07-30T22:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | 2026-10-01T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-montreal-17g8v0g652qqblc | john-summit | 2026-10-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-washington-1avfz_agklgjntv | john-summit | 2026-10-31T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | 2026-11-05T19:00:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-austin-g5diz_52qgtuz | john-summit | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-fort-worth-vvg1yz_522ahqk | john-summit | 2026-11-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-fort-worth-vvg1yz_53r5bha | john-summit | 2026-11-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-charlotte-g5evz_52qpkue | john-summit | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | 2026-08-22T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | 2026-08-23T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-santa-clara-g5vyz_anmpkqv | karol-g | 2026-08-23T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-seattle-vvg1hz_a1yzbuj | karol-g | 2026-08-27T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-san-antonio-g5diz_ak3mivp | karol-g | 2026-09-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-el-paso-vvg1yz_an5e3ov | karol-g | 2026-09-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-el-paso-vvg1yz_akoajis | karol-g | 2026-09-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-foxborough-vv1avzk3ogkebubpy | karol-g | 2026-09-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-east-rutherford-k7vgf_a6cy2uc | karol-g | 2026-09-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-east-rutherford-k7vgf_anrle2y | karol-g | 2026-09-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-atlanta-vvg1zz_ag0kdf4 | karol-g | 2026-09-24T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-houston-g5diz_akcfr2w | karol-g | 2026-09-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-miami-vvg1vz_a38lpr5 | karol-g | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-miami-vvg1vz_afezyvt | karol-g | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-tampa-vvg1vz_aksr-m3 | karol-g | 2026-10-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-fargo-vv1akzkukgkdkifv9 | foo-fighters | 2026-09-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-regina-1aozku4gkeb8mgg | foo-fighters | 2026-09-15T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-edmonton-1k78vn4_gaujue7 | foo-fighters | 2026-09-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-vancouver-1aozku4gkewuexj | foo-fighters | 2026-09-21T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-las-vegas-1a9zkufgkd3cmyl | foo-fighters | 2026-09-27T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-uncasville-g5vvz_unjqq1q | foo-fighters | 2026-10-04T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-minneapolis-vv1kvovngegageom5 | my-chemical-romance | 2026-08-25T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-denver-g5vzzbwncbsnm | my-chemical-romance | 2026-08-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-san-diego-vvg1izbwykcki4 | my-chemical-romance | 2026-08-31T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-phoenix-1a_zkgygkd3ywvj | my-chemical-romance | 2026-09-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-san-antonio-g5dizbsd0c4y6 | my-chemical-romance | 2026-09-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55mdjk | my-chemical-romance | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55msjp | my-chemical-romance | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55znjb | my-chemical-romance | 2026-10-25T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55ykjr | my-chemical-romance | 2026-10-31T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55bdjv | my-chemical-romance | 2026-11-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | 2026-11-10T12:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | 2026-09-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-saint-louis-vv17bz_fgkuhx1g- | teddy-swims | 2026-09-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-chicago-vv178z_fgkuxeurm | teddy-swims | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-detroit-vv17oz_fgktec1td | teddy-swims | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-columbus-vv17fz_fgkdx0-pn | teddy-swims | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-brooklyn-1adzz_fgknbfkoe | teddy-swims | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-toronto-1avzz_fgku3eucw | teddy-swims | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-montreal-1ad7z_fgkm9lfwl | teddy-swims | 2026-10-07T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-boston-vv177z_fgktnmxtd | teddy-swims | 2026-10-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-philadelphia-1adzz_fgkm5wpjt | teddy-swims | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-washington-16vfz_f0sg7tpdk | teddy-swims | 2026-10-13T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-nashville-g5viz_fxfo1dj | teddy-swims | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-charlotte-g5evz_fumjscw | teddy-swims | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-atlanta-vvg1zz_fuw3nll | teddy-swims | 2026-10-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-tampa-vvg1vz_fdr-qk6 | teddy-swims | 2026-10-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | 2026-10-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-denver-g5vzz_fuokkc4 | teddy-swims | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-seattle-vvg1hz_fujpiyp | teddy-swims | 2026-11-06T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-vancouver-1av7z_fgkbd-_xv | teddy-swims | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-san-francisco-g5vyz_fnhi2ez | teddy-swims | 2026-11-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-inglewood-vv170z_fgkmxw1os | teddy-swims | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-auburn-vvg1hz_eppsgpt | five-finger-death-punch | 2026-09-12T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-ridgefield-vvg1hz_eq8bvhx | five-finger-death-punch | 2026-09-13T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-wheatland-g5vyz_eps2iri | five-finger-death-punch | 2026-09-15T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-mountain-view-g5vyz_epluiuh | five-finger-death-punch | 2026-09-17T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-long-beach-vvg1iz_els87ti | five-finger-death-punch | 2026-09-19T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-west-valley-city-g5vzz_e9-5mgw | five-finger-death-punch | 2026-09-23T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-phoenix-1kk8v0atga5offo | five-finger-death-punch | 2026-09-25T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-albuquerque-g5vzz_er_rgel | five-finger-death-punch | 2026-09-26T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-the-woodlands-g5diz_eelg5kq | five-finger-death-punch | 2026-09-27T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-austin-g5diz_eqgevgg | five-finger-death-punch | 2026-09-28T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-fort-worth-vvg1yz_ehes4-b | five-finger-death-punch | 2026-09-30T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-rogers-g5viz_eq6la31 | five-finger-death-punch | 2026-10-02T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-kansas-city-1a-zk8pgkdxix7u | five-finger-death-punch | 2026-10-03T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-biloxi-g5viz_exc4n-g | five-finger-death-punch | 2026-10-05T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-franklin-g5viz_eqoip4h | five-finger-death-punch | 2026-10-08T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-tampa-vvg1vz_eqhp7qi | five-finger-death-punch | 2026-10-10T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-west-palm-beach-vvg1vz_eqw6abn | five-finger-death-punch | 2026-10-11T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-alpharetta-vvg1zz_eq2kn-d | five-finger-death-punch | 2026-10-13T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-raleigh-g5evz_ejp-tdn | five-finger-death-punch | 2026-10-14T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-charlotte-g5evz_eqi_eoi | five-finger-death-punch | 2026-10-16T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-virginia-beach-vv1k7z_eqfg7mvxk | five-finger-death-punch | 2026-10-17T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-greenville-g5evz_excrbbp | five-finger-death-punch | 2026-10-19T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-columbus-vv1aazk8egkdlofxu | five-finger-death-punch | 2026-10-21T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-bristow-1avfz_egki4tnxq | five-finger-death-punch | 2026-10-23T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-reading-vvg1fz_1dkrsjw | don-omar | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-boston-vvg17z_1wjhcnw | don-omar | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | 2026-09-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-dallas-vvg1yz_1d_hllv | don-omar | 2026-10-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-orlando-17fov0g61tztiqr | don-omar | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-miami-vvg1vz_1mbpqce | don-omar | 2026-10-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-rosemont-vvg18z_1bhcnvf | don-omar | 2026-10-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-brooklyn-17gzv0g61dlian2 | don-omar | 2026-10-11T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-newark-vvg1fz_1tkglsd | don-omar | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-charlotte-g5evz_1d8lhpj | don-omar | 2026-10-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-washington-17a8v0g61wbnb9b | don-omar | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-atlanta-vvg1zz_1unelae | don-omar | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-el-paso-vvg1yz_1hpge4r | don-omar | 2026-10-26T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | 2026-11-12T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-inglewood-vvg10z_56fvyeu | don-omar | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | 2026-10-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-montreal-1aszkowgke-yptc | blue-october | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-new-york-city-k7v17_67ag7rfqz | blue-october | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | blue-october | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-charlotte-g5evz_kng4bet | blue-october | 2026-11-18T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-vancouver-1k78vpvbga1v43o | pentatonix | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | 2026-11-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-milwaukee-vvg1jz_296mpvg | pentatonix | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jk-dk | tyla | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jsxep | tyla | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-glasgow-g5dzz_2ebyvny | tyla | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-manchester-17uov0g62k1nnho | tyla | 2026-10-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | 2026-10-22T16:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | 2026-10-27T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-trivium-2026-st-petersburg-vvg1vz_cbh66cw | trivium | 2026-11-05T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-ottawa-1aszkowgkeikunf | sabaton | 2026-09-26T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-thunder-bay-177zv0g65pwqtbn | sabaton | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-winnipeg-1aozkobgkeldvu- | sabaton | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-hollywood-vv1aazko4gkdzwp0r | sabaton | 2026-11-13T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | 2026-09-19T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | 2026-09-25T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-london-g5dzz_1urr0et | beartooth | 2026-10-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-leeds-g5dzz_1wg9kbb | beartooth | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-glasgow-17uov0g61l4m0bs | beartooth | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-in-flames-2026-ft-lauderdale-vvg1vz_3k_p4ju | in-flames | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | 2026-11-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | 2026-11-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-waite-park-vv1akzk3pgkdplazc | tobymac | 2026-09-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | 2026-11-13T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | 2026-11-14T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-sacramento-g5vyz_d8k3dby | andrea-bocelli | 2026-09-13T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-san-jose-g5vyz_ddjjmmd | andrea-bocelli | 2026-09-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_dnrpn0b | andrea-bocelli | 2026-09-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_ds3kpkv | andrea-bocelli | 2026-09-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-phoenix-16v0z_dq6g7w0ck | andrea-bocelli | 2026-09-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | 2026-09-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | 2026-09-22T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | missio | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | 2026-11-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | 2026-11-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | 2026-09-28T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | 2026-09-30T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnetamw | michelle-branch | 2026-10-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnettzd | michelle-branch | 2026-10-03T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-los-angeles-vvg10z_cl6gfwp | michelle-branch | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-del-mar-vvg1iz_cje3msh | michelle-branch | 2026-10-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | 2026-10-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | 2026-10-11T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | 2026-10-12T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-new-york-g5diz_uurkkpj | michelle-branch | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | 2026-11-12T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-london-g5vhz_g13mdtb | fkj | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-london-g5vhz_g1bafoo | fkj | 2026-10-30T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6g2lzmgt | sylvan-esso | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6gi4rjo9 | sylvan-esso | 2026-10-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgn5_o | sylvan-esso | 2026-10-08T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgp5h6 | sylvan-esso | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-brooklyn-k7vgf_gpzpfnb | sylvan-esso | 2026-10-14T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-portland-vvg17z_gkbpmvl | sylvan-esso | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-boston-vvg17z_g2bjele | sylvan-esso | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-toronto-177zv0g6gkzh0vc | sylvan-esso | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | 2026-10-22T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-chicago-vv178z_agksv90pf | sylvan-esso | 2026-10-23T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-1avoz_6rofpzd5ed | niall-horan | 2026-11-12T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-1avoz_6rofjzd576 | niall-horan | 2026-11-13T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-dublin-17kzv0g6c1fpluo | saint-levant | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | 2026-10-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | 2026-09-30T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-brisbane-1akzk3fgkd_ud6g | death-cab-for-cutie | 2026-11-15T09:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | 2026-09-26T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-washington-17a8v0g6gphxucm | sienna-spiro | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-philadelphia-vvg1fz_gfaf9pc | sienna-spiro | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-boston-vvg17z_gpsen49 | sienna-spiro | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-brooklyn-k7vgf_gre9jk_ | sienna-spiro | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | 2026-10-28T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | 2026-11-05T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | 2026-11-10T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-boston-vvg17z_g1xnurg | malcolm-todd | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmrwkt | malcolm-todd | 2026-09-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmycf1 | malcolm-todd | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-detroit-vvg1oz_g99edo3 | malcolm-todd | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-nashville-g5viz_g1jq0ud | malcolm-todd | 2026-10-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-maryland-heights-vvg1bz_gclzidq | malcolm-todd | 2026-10-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_gkurbfe | malcolm-todd | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_g91pgfe | malcolm-todd | 2026-10-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-minneapolis-vvg1bz_gcw2bqa | malcolm-todd | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | 2026-10-12T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-salt-lake-city-g5vzz_g2farap | malcolm-todd | 2026-10-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3nanrd | malcolm-todd | 2026-10-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3n1blo | malcolm-todd | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-oakland-g5vyz_gfhhyva | malcolm-todd | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-las-vegas-17ayv0g6ujiqnhu | dinosaur-jr | 2026-10-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-tempe-17k8v0g6ujk40ss | dinosaur-jr | 2026-10-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | 2026-10-12T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-anaheim-vvg10z_uu7ndiz | dinosaur-jr | 2026-10-16T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-los-angeles-vvg10z_ueyxka- | dinosaur-jr | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-san-francisco-g5vyz_ullh3se | dinosaur-jr | 2026-10-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-sacramento-g5vyz_u0dqoo1 | dinosaur-jr | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9tuc_ | dinosaur-jr | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-austin-g5diz_usqkioq | dinosaur-jr | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-belfast-1adoz_kgkuhawcy | niall-horan | 2026-11-15T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-belfast-1adoz_6gkmwqvwh | niall-horan | 2026-11-16T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtkw4- | metallica | 2026-10-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfu40 | metallica | 2026-10-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agkns9qkh | metallica | 2026-10-09T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agknswc9w | metallica | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4n | metallica | 2026-10-16T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4i | metallica | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | 2026-10-07T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-edinburgh-1adbz_dgkdivmtc | foy-vance | 2026-10-17T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-stirling-1auzkoegkew3ujs | foy-vance | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_akto7o5 | foy-vance | 2026-10-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_a5f7udr | foy-vance | 2026-10-24T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-manchester-g5vhz_3kr3ers | foy-vance | 2026-10-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-wexford-1avoz_7gksprdxw | foy-vance | 2026-10-27T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-dublin-1abzko8gkdu8sqd | foy-vance | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-london-g5dzz_audfsuq | the-lemonheads | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-birmingham-g5dzzbgmxafgo | the-lemonheads | 2026-10-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-kenai-vvg1hz_5wlthim | tommy-emmanuel | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-fairbanks-vvg1hz_5i6wuhs | tommy-emmanuel | 2026-10-12T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-dublin-1kkzv0qagauuqvy | tommy-emmanuel | 2026-11-02T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-yacht-rock-revue-2026-huntsville-17fzv0g62kqgox0 | yacht-rock-revue | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-brooklyn-k7vgf_opjosbe | too-many-zooz | 2026-10-31T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-sheffield-g5vhz_5sagy5t | amble | 2026-09-28T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-glasgow-g5dzz_5s1tpu0 | amble | 2026-09-30T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-newcastle-upon-tyne-g5dzz_clsmpcl | amble | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-manchester-17uov0g65bdcgvp | amble | 2026-10-03T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nottingham-g5vhz_5y-lcue | amble | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-cardiff-g5vhz_5sqgbqz | amble | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-london-g5dzz_5sz3vmk | amble | 2026-10-08T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-los-angeles-vv170z_agkrleod6 | amble | 2026-10-24T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | 2026-11-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | 2026-11-18T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-pittsburgh-1avbz_fgklj6-n0 | the-red-clay-strays | 2026-10-01T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | 2026-10-03T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0exkqy | the-red-clay-strays | 2026-10-07T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0kf9e_ | the-red-clay-strays | 2026-10-08T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-orlando-1aefz_fgkvf8_5e | the-red-clay-strays | 2026-10-14T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-charleston-g5evz_akknp14 | the-red-clay-strays | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | 2026-11-06T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-valley-center-vvg1iz_5rl2h1n | daughtry | 2026-10-04T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-troy-k7vgf_grfdn3c | daughtry | 2026-10-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-uncasville-g5vvz_gld3qfv | daughtry | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-waterloo-k7vgf_gm6sksu | daughtry | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-atlantic-city-vvg1fz_gskknq7 | daughtry | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-huntington-k7vgf_geicgms | daughtry | 2026-10-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-englewood-k7vgf_uejshyg | daughtry | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-danville-vvg17z_gy_imrz | daughtry | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | 2026-10-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | daughtry | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | 2026-10-22T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | 2026-10-24T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-casalecchio-di-reno-bologna-zg9rmiynyzdk1k | fontaines-d-c | 2026-10-26T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | 2026-11-12T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-liverpool-1adjz_8gkv_dtbp | fontaines-d-c | 2026-11-20T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-durant-vvg1yz_ggasrcz | riley-green | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | 2026-10-07T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | 2026-10-08T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-latto-2026-petersburg-vvg17z_2r3gq4t | latto | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | 2026-10-12T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-west-valley-city-g5vzz_ds6yaft | staind | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-wheatland-g5vyz_dwgijmi | staind | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-ontario-vv170z_dgkwr0_z6 | staind | 2026-10-11T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-tulsa-1aezz_dgkvarp7d | staind | 2026-10-16T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-the-woodlands-g5diz_dbvgqfi | staind | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-austin-g5diz_dykgajg | staind | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | 2026-10-25T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-gossett-2026-chicago-vvg18z_u5xbtr6 | dylan-gossett | 2026-10-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa | warren-zeiders | 2026-10-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-leeds-g5dzzbubyjrus | warren-zeiders | 2026-10-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-manchester-g5vhzbgtrzaec | warren-zeiders | 2026-10-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-bristol-g5dzzbgxgfjht | warren-zeiders | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-birmingham-g5dzzbu22x97x | warren-zeiders | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-london-g5vhzbgx4c4_f | warren-zeiders | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | 2026-10-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | 2026-10-12T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-las-vegas-17ayv0g61m2w1ya | mico | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-san-diego-vvg1iz_1uivzmh | mico | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-austin-g5diz_1wd9gll | mico | 2026-10-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-montreal-16szkfk00zagk68g | mico | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fd0l9ge | karol-g | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fdjam8c | karol-g | 2026-11-08T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fdjk688 | karol-g | 2026-11-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknv53if | karol-g | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefxra | karol-g | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefwr5 | karol-g | 2026-11-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | 2026-10-30T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | sabaton | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | sabaton | 2026-11-18T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | 2026-11-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | 2026-11-18T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | 2026-11-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkebi9id | morat | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjeux | morat | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmu0 | morat | 2026-11-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteuw | morat | 2026-11-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteut | morat | 2026-11-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmuj | morat | 2026-11-16T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedtmmv | morat | 2026-11-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | 2026-10-23T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | 2026-11-13T16:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | 2026-11-17T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hilary-duff-2026-auckland-1ae8z_7gkmdmw55 | hilary-duff | 2026-10-20T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | 2026-10-25T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | 2026-10-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | 2026-11-13T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | 2026-11-19T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | 2026-10-30T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | 2026-11-06T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | 2026-11-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-ciudad-de-mexico-17azv0g65px_l4r | def-leppard | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-tlajomulco-de-zuniga-g5dvz_5361kla | def-leppard | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-saint-louis-vvg1bz_ukkhzgh | rod-wave | 2026-10-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-nashville-g5viz_u63pwep | rod-wave | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-washington-17a8v0g6uelkuww | rod-wave | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-detroit-vvg1oz_udpjh0t | rod-wave | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-pittsburgh-17aov0g6uky4i7y | rod-wave | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-boston-vvg17z_uerk22e | rod-wave | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-chicago-vvg18z_udha5ep | rod-wave | 2026-11-01T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | rod-wave | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | uicideboy | 2026-10-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | uicideboy | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-birmingham-1aezz_6gkra4gmu | uicideboy | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vv1avzkfwgkdcqwfa | steve-lacy | 2026-10-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vvg17z_2dy9pyk | steve-lacy | 2026-10-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-camden-vv17fz_8gkl8lrzy | steve-lacy | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-washington-1a4zkfdgkeiyeai | steve-lacy | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-virginia-beach-vv1avzkf6gkesce9z | steve-lacy | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-raleigh-g5evz_8ci0_um | steve-lacy | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | 2026-11-12T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | steve-lacy | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | 2026-10-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-chicago-vvg18z_1daahef | the-smashing-pumpkins | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-charlotte-g5evz_1dw8jew | the-smashing-pumpkins | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-jacksonville-17fov0g61t4w29c | the-smashing-pumpkins | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-tampa-vvg1vz_1xbgmwh | the-smashing-pumpkins | 2026-10-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-indianapolis-vvg1fz_1xmuiok | the-smashing-pumpkins | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-nashville-g5viz_1bbgqqs | the-smashing-pumpkins | 2026-10-23T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-austin-g5diz_1txjp-0 | the-smashing-pumpkins | 2026-10-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-portland-vvg1hz_1meesxh | the-smashing-pumpkins | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-atlanta-vvg1zz_83jdpwc | fuerza-regida | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-birmingham-1aozkfdgkeytw9q | fuerza-regida | 2026-10-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-albuquerque-g5vzz_8cnmbuy | fuerza-regida | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-wheatland-g5vyz_81rrfk3 | fuerza-regida | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | 2026-10-26T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-glasgow-1adbz_fgkn7svza | noah-kahan | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-glasgow-1auzk3agkdn-buh | noah-kahan | 2026-11-06T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-manchester-g5vhz_gxilkd5 | noah-kahan | 2026-11-09T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-manchester-g5vhz_gxiljdj | noah-kahan | 2026-11-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-london-1ku8v0x_gag10y_ | noah-kahan | 2026-11-13T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-london-1ku8v0x_gag57yq | noah-kahan | 2026-11-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-dublin-1avoz_fgkn52bxo | noah-kahan | 2026-11-19T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | eagles | 2026-11-15T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-orlando-17fov0g613pzs04 | journey | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-greenville-g5evz_1k1vuwb | journey | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-twenty-one-pilots-2026-columbus-vvg1fz_1uqt9_r | twenty-one-pilots | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | lionel-richie | 2026-11-15T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl6xfl | earth-wind-fire | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl5e46 | earth-wind-fire | 2026-10-24T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck11zds | santana | 2026-11-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck1gfdb | santana | 2026-11-06T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck1ub7d | santana | 2026-11-08T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck13z7p | santana | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gorillaz-2026-phoenix-1av0z_agknirbye | gorillaz | 2026-10-24T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-dallas-vvg1yz_kmvonlg | weezer | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-phoenix-1av0z_kgkmn6hu7 | weezer | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl1gke | aerosmith | 2026-10-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl5ikm | aerosmith | 2026-11-02T02:15:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-seattle-vvg1hzbmeehmj0 | mana | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | mana | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-columbus-vv17fz_8gkvoktkm | jonas-brothers | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-lexington-1avbz_8gkb06ivs | jonas-brothers | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | 2026-10-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-buffalo-k7vgf_8deoygx | jonas-brothers | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-detroit-vv17oz_8gksd_91x | jonas-brothers | 2026-10-25T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | jonas-brothers | 2026-11-02T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | jonas-brothers | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | 2026-11-10T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-dallas-vvg1yz_8uftpd5 | jonas-brothers | 2026-11-11T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-san-antonio-g5diz_8uwwbjr | jonas-brothers | 2026-11-15T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | jonas-brothers | 2026-11-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-hollywood-vvg1iz_8duyuu5 | jonas-brothers | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-hollywood-vvg1iz_o7yeh8v | jonas-brothers | 2026-11-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-raye-2026-london-g5vhz_frai-ph | raye | 2026-10-23T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | 2026-10-23T15:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | 2026-10-25T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | 2026-10-27T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | 2026-10-28T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | 2026-10-30T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-anaheim-vvg10z_ueuvpcr | brand-new | 2026-11-08T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | brand-new | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | 2026-10-20T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-saint-louis-17f8v0g65e8csoj | knocked-loose | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | 2026-10-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-daly-city-g5vyz_5mdvnwz | knocked-loose | 2026-11-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-denver-g5vzz_g5e32h3 | phoebe-bridgers | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | 2026-10-22T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-seattle-vvg1hz_gkt8bhj | phoebe-bridgers | 2026-10-24T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-vancouver-1778v0g6g1ql6ek | phoebe-bridgers | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_5ehic8t | phoebe-bridgers | 2026-10-28T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_gpqjtlc | phoebe-bridgers | 2026-10-29T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_5eplbfx | phoebe-bridgers | 2026-10-31T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_goubfs2 | phoebe-bridgers | 2026-11-01T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_gomyvhe | phoebe-bridgers | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-albuquerque-g5vzz_5m9qykz | bryson-tiller | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-phoenix-17k8v0g65lc9irs | bryson-tiller | 2026-10-21T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-anaheim-vvg10z_59jfknv | bryson-tiller | 2026-10-23T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-chula-vista-vvg1iz_5qdpyt3 | bryson-tiller | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-inglewood-vvg10z_5eio1ci | bryson-tiller | 2026-10-26T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-concord-g5vyz_5ix0y73 | bryson-tiller | 2026-10-28T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-vancouver-1778v0g65sqi5ae | bryson-tiller | 2026-10-31T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-seattle-vvg1hz_5llgxaj | bryson-tiller | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | 2026-11-17T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-brooklyn-17gzv0g61ux2pkd | arcangel | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | arcangel | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | arcangel | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | 2026-11-15T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | 2026-10-31T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | 2026-10-22T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | 2026-10-28T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-dublin-1avoz_ogkmfynew | stevie-wonder | 2026-11-01T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-london-1adfz_ogkluzbfe | stevie-wonder | 2026-11-03T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-london-1adfz_ogkwbmppe | stevie-wonder | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-manchester-1adjz_ogklby6m_ | stevie-wonder | 2026-11-08T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-glasgow-1adbz_ogkw2mz1l | stevie-wonder | 2026-11-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | tom-jones | 2026-11-04T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-washington-17a8v0g619llzuk | katseye | 2026-10-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-belmont-park-17gzv0g61mqmkdg | katseye | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-boston-vvg17z_1eilxli | katseye | 2026-10-29T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-detroit-vvg1oz_1efshc4 | katseye | 2026-11-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-minneapolis-vvg1bz_1syoq0j | katseye | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-austin-g5diz_1lv8_jd | katseye | 2026-11-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | katseye | 2026-11-18T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | ricky-martin | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ty-myers-2026-evansville-vv1aazkowgkd1n5gg | ty-myers | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dan-shay-2026-rogers-g5viz_1x8yivv | dan-shay | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | dan-shay | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-glasgow-17uov0g6uryba3u | beabadoobee | 2026-11-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-cardiff-17uov0g6uhod1tg | beabadoobee | 2026-11-16T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-manchester-g5vhz_u1guca1 | beabadoobee | 2026-11-17T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | 2026-11-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | 2026-11-05T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | dave-matthews-band | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | dave-matthews-band | 2026-11-10T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | 2026-11-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | los-tigres-del-norte | 2026-11-14T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-seattle-vvg1hz_52nooej | the-chicks | 2026-10-26T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-hollywood-vvg10z_5ljdml9 | the-chicks | 2026-11-02T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-hollywood-vvg10z_5ra8fba | the-chicks | 2026-11-05T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | zac-brown-band | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-chicago-vvg18z_gr6ix5f | sleeping-with-sirens | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | 2026-10-27T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | sleeping-with-sirens | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaugdpl | jack-johnson | 2026-11-06T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1akzkosgkdpve0m | jack-johnson | 2026-11-07T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaudsje | jack-johnson | 2026-11-08T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1k7yv0qzga2dx6- | jack-johnson | 2026-11-10T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_zu0i | jack-johnson | 2026-11-11T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_bj0s | jack-johnson | 2026-11-12T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-sydney-1akzkosgkdq3fwf | jack-johnson | 2026-11-14T05:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6cppkzd52a | jack-johnson | 2026-11-17T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6gkbxcfqh | jack-johnson | 2026-11-18T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-auckland-1a0zkowgkdch7lq | jack-johnson | 2026-11-20T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gavin-adcock-2026-boston-vv177z_kgkmr1ooo | gavin-adcock | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | 2026-11-13T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-manchester-vv177z_fgkwnh6_i | riley-green | 2026-11-02T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | 2026-10-30T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beck-2026-vancouver-1aozk3a0babze8k | beck | 2026-11-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dermot-kennedy-2026-west-perth-1avgz_agkmqzbyp | dermot-kennedy | 2026-11-14T09:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dermot-kennedy-2026-brisbane-1avgz_agksulpj1 | dermot-kennedy | 2026-11-17T08:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | anuel-aa | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-billy-strings-2026-baltimore-1avfz_6gkm3naew | billy-strings | 2026-10-30T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | cristian-castro | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | barry-manilow | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | barry-manilow | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | 2026-10-29T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-houston-g5diz_33ccqfw | victoria-monet | 2026-11-01T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-dallas-vvg1yz_3n9clqe | victoria-monet | 2026-11-03T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | victoria-monet | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-philadelphia-vv1aezkfxgkegbvoj | victoria-monet | 2026-11-13T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | jon-pardi | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-oakland-g5vyz_k55sumi | brandi-carlile | 2026-11-08T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdorlne | brandi-carlile | 2026-11-10T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdoyl04 | brandi-carlile | 2026-11-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | brandi-carlile | 2026-11-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | brandi-carlile | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-virginia-beach-vvg17z_gg7kjfl | little-big-town | 2026-11-06T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-durham-g5evz_gplfpyl | little-big-town | 2026-11-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-charlotte-g5evz_g5h5gi9 | little-big-town | 2026-11-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-akron-vvg1fz_ghpckp3 | little-big-town | 2026-11-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-columbus-vvg1fz_gptrce6 | little-big-town | 2026-11-14T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-indianapolis-vvg1fz_g5crrzm | little-big-town | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | 2026-10-31T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mrffoe | bryan-adams | 2026-10-29T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr5fkv | bryan-adams | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | 2026-11-08T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-two-door-cinema-club-2026-mt-claremont-1akzkosgkdk8pdq | two-door-cinema-club | 2026-11-15T11:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-medford-vv177z_6gkl3s3mj | air-supply | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-national-harbor-17a8v0g6gpn4b8s | air-supply | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-westbury-k7vgf_fkzchcp | air-supply | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-red-bank-g5vvz_1bj0ggl | air-supply | 2026-11-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foreigner-2026-reno-1kc8v0otgacbkaa | foreigner | 2026-11-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | 2026-11-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | 2026-11-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-akron-vv1aazkobgkdpsd9k | sting | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-akron-vv17fz_agkm57pk- | sting | 2026-11-03T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-pittsburgh-1avbz_kgkwesf_t | sting | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-pittsburgh-1avbz_kgkwscsdv | sting | 2026-11-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-wallingford-g5vvz_ajjscmb | sting | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-brooklyn-k7v17_a0ag7icyq | sting | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-nashville-g5vizbu4hqfya | three-days-grace | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-peoria-vv1a6zkuppfa-ze27 | three-days-grace | 2026-11-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-tulsa-1aozkupgkdxuamf | three-days-grace | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-kansas-city-vv1akzkujgkeirwar | three-days-grace | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-sacramento-g5vyzbu2whwe8 | three-days-grace | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh | three-days-grace | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-birmingham-1kfyv0o_ga1tsuk | cody-johnson | 2026-11-01T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-glasgow-1auzk8ugkdf-aiv | cody-johnson | 2026-11-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-belfast-1azzkodgkdbmxb7 | cody-johnson | 2026-11-04T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-dublin-1avoz_73704zd85a | cody-johnson | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-raleigh-g5evz_5mdu9qp | motionless-in-white | 2026-11-03T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-port-wentworth-vvg1zz_5lcp7qp | motionless-in-white | 2026-11-04T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-orlando-17fov0g65wwp47r | motionless-in-white | 2026-11-05T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-nashville-g5viz_5no0bwc | motionless-in-white | 2026-11-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-peoria-vvg1jz_5wcknnp | motionless-in-white | 2026-11-09T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-minneapolis-vvg1bz_5wlfjnl | motionless-in-white | 2026-11-11T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-omaha-vvg1bz_5sqsgj6 | motionless-in-white | 2026-11-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-milwaukee-vvg1jz_5myjgaa | motionless-in-white | 2026-11-14T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-newark-vvg1fz_5s7fn3l | motionless-in-white | 2026-11-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rawayana-2026-houston-g5diz_kwowtst | rawayana | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-saint-louis-vvg1bz_2r0qtwk | jodeci | 2026-11-05T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-detroit-vvg1oz_2lg-loc | jodeci | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-pittsburgh-17aov0g62hhggfi | jodeci | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-national-harbor-164zk3ffyzacfekc | jodeci | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | 2026-11-06T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-fishers-vvg1fz_1kxwtrx | mercyme | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-louisville-17aov0g6193qcjg | mercyme | 2026-11-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mon-laferte-2026-san-jose-g5vyz_kmf8y1d | mon-laferte | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-san-antonio-g5diz_gedaabt | lenny-pearce | 2026-11-06T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-st-petersburg-vvg1vz_gcd9hph | lenny-pearce | 2026-11-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | lenny-pearce | 2026-11-14T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | lenny-pearce | 2026-11-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | 2026-11-09T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | 2026-11-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1afzk3vgketlp_s | karol-g | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
