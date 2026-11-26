# SeatGeek CTA auto-add log

Generated: 2026-11-25T02:18:54.440Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 6020
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6018
- Events already carrying a valid SeatGeek URL: 3760
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3760
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2258
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1395
- Skipped before any API call: 883 (past_event: 883)
- Events this run can check (window size): 400
- Rotation: window 3 of 4 (key 20782)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 400
- Events checked by this run: 400
- API calls made: 644
- Rate-limit responses: 0
- URLs added: 20
- Events skipped: 380
- no_candidates_returned: 339
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-megadeth-2027-nottingham-17u8v0g62r_1dp-
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 800 --resume-from 'tm-megadeth-2027-nottingham-17u8v0g62r_1dp-'
- Accepted venue mismatches: 11
- Conflicts found: 22

## Skipped reasons

- conflicting_same_date_city_candidates: 22
- no_candidates_returned: 339
- city_or_metro_match_failed: 17
- artist_match_failed: 2

## Interpretation

- `URLs added: 20` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3760 event(s) already carried valid SeatGeek URLs before this run, including 3760 enrichment-eligible event(s).
- This run queried only the 2258 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Mat Kearney | 2027-11-06 | Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | Luke Bryan | 2026-12-11 | Las Vegas | https://seatgeek.com/luke-bryan-tickets/las-vegas-nevada-allegiant-stadium-2026-12-11-3-30-am/concert/18211763 |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Pink Martini | 2026-12-14 | Philadelphia | https://seatgeek.com/pink-martini-tickets/philadelphia-pennsylvania-kimmel-center-miller-theater-2026-12-14-7-pm/concert/18364153 |
| tm-chris-tomlin-2026-cincinnati-1avbz_ogknrwawm | Chris Tomlin | 2026-12-18 | Cincinnati | https://seatgeek.com/chris-tomlin-tickets/cincinnati-ohio-taft-theatre-2026-12-18-7-pm/concert/18542963 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | Yacht Rock Revue | 2027-01-08 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-08-8-pm/concert/18612961 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | Yacht Rock Revue | 2027-01-09 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-09-8-pm/concert/18612966 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | Yacht Rock Revue | 2027-01-10 | Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-10-7-pm/concert/18612962 |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Grace Potter | 2027-01-24 | Patchogue | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | Chelsea Cutler | 2027-01-29 | Saint Petersburg | https://seatgeek.com/chelsea-cutler-tickets/saint-petersburg-florida-jannus-live-2027-01-29-3-30-am/concert/18639168 |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | Chelsea Cutler | 2027-02-03 | Nashville | https://seatgeek.com/chelsea-cutler-tickets/nashville-tennessee-marathon-music-works-2027-02-03-3-30-am/concert/18639171 |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | Chelsea Cutler | 2027-02-28 | Denver | https://seatgeek.com/chelsea-cutler-tickets/denver-colorado-mission-ballroom-2027-02-28-3-30-am/concert/18639200 |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Dinosaur Jr. | 2027-03-05 | Chicago | https://seatgeek.com/dinosaur-jr-tickets/chicago-illinois-the-wip-theater-2027-03-05-7-30-pm/concert/18666384 |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | Chelsea Cutler | 2027-03-06 | San Francisco | https://seatgeek.com/chelsea-cutler-tickets/san-francisco-california-the-midway-sf-2027-03-06-3-30-am/concert/18639205 |
| tm-chris-tomlin-2027-nashville-g5viz_6t7chyi | Chris Tomlin | 2027-03-26 | Nashville | https://seatgeek.com/chris-tomlin-tickets/nashville-tennessee-bridgestone-arena-2027-03-26-7-pm/concert/18159218 |
| tm-tori-kelly-2027-nashville-g5viz_pmv-gvm | Tori Kelly | 2027-04-07 | Nashville | https://seatgeek.com/tori-kelly-tickets/nashville-tennessee-the-truth-nashville-2027-04-07-7-30-pm/concert/18778546 |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | Missio | 2027-04-09 | San Antonio | https://seatgeek.com/missio-tickets/san-antonio-texas-vibes-event-center-2027-04-09-7-pm/concert/18853293 |
| tm-tori-kelly-2027-atlanta-vvg1zz_pr5yym7 | Tori Kelly | 2027-04-10 | Atlanta | https://seatgeek.com/tori-kelly-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-04-10-8-pm/concert/18778552 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Psychedelic Furs | 2027-04-28 | Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | Warren Zeiders | 2027-05-01 | Charlotte | https://seatgeek.com/warren-zeiders-tickets/charlotte-north-carolina-coyote-joe-s-charlotte-2027-05-01-7-pm/concert/18649767 |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | Meshuggah | 2027-05-11 | Greensboro | https://seatgeek.com/meshuggah-tickets/greensboro-north-carolina-special-events-center-at-greensboro-coliseum-complex-2027-05-11-7-pm/concert/18724694 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp | KPop Demon Hunters | 2027-06-05 | Baltimore | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/baltimore-maryland-cfg-bank-arena-2027-06-05-2-pm/concert/18772669 |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | The Airborne Toxic Event | 2027-06-08 | Englewood | no_candidates_returned | - |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | 2027-06-10 | Cardiff | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1kvovpq_ga29ugj | Billy Strings | 2027-06-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-10-7-30-pm/concert/18755202 |
| tm-leon-bridges-2027-manchester-1adbz_pgkmxxe4x | Leon Bridges | 2027-06-11 | Manchester | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1akzk4tgkdq3l2w | Billy Strings | 2027-06-11 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-11-7-30-pm/concert/18755210 |
| tm-sam-fender-2027-cardiff-1adfz_4gklat6o4 | Sam Fender | 2027-06-12 | Cardiff | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp | KPop Demon Hunters | 2027-06-12 | Newark | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-12-2-pm/concert/18772667 |
| tm-sienna-spiro-2027-dublin-17kzv0g6gpq41un | Sienna Spiro | 2027-06-15 | Dublin | no_candidates_returned | - |
| tm-james-blunt-2027-lincoln-g5vhz_on_qxm9 | James Blunt | 2027-06-16 | Lincoln | no_candidates_returned | - |
| tm-shania-twain-2027-scarborough-1agzkfugkdob_wu | Shania Twain | 2027-06-16 | Scarborough | no_candidates_returned | - |
| tm-sienna-spiro-2027-dublin-1avoz_4gkuvegeh | Sienna Spiro | 2027-06-16 | Dublin | no_candidates_returned | - |
| tm-sombr-2027-belfast-16doz_oxfg7tv55 | Sombr | 2027-06-17 | Belfast | no_candidates_returned | - |
| tm-james-blunt-2027-thetford-1adjz_pgkw4p4i3 | James Blunt | 2027-06-18 | Thetford | no_candidates_returned | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | Kings Of Leon | 2027-06-18 | Hamburg | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy | KPop Demon Hunters | 2027-06-19 | Chicago | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-19-2-pm/concert/18772670 |
| tm-alex-warren-2027-cardiff-g5vhz_3c3nozb | Alex Warren | 2027-06-20 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-scarborough-1ku8vp1_ga1cs0u | James Blunt | 2027-06-20 | Scarborough | no_candidates_returned | - |
| tm-alex-warren-2027-belfast-16doz_3cdg7z8me | Alex Warren | 2027-06-21 | Belfast | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2027-valencia-z698xz2qz16vfzvzrf | Queens Of The Stone Age | 2027-06-21 | Valencia | no_candidates_returned | - |
| tm-shania-twain-2027-cardiff-g5vhz_kljqj-d | Shania Twain | 2027-06-22 | Cardiff | no_candidates_returned | - |
| tm-tom-jones-2027-lincoln-g5vhz_4w3ae65 | Tom Jones | 2027-06-23 | Lincoln | no_candidates_returned | - |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | 2027-06-23 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | 2027-06-23 | Assago | no_candidates_returned | - |
| tm-shania-twain-2027-exeter-g5vhz_kjtg0ag | Shania Twain | 2027-06-24 | Exeter | no_candidates_returned | - |
| tm-alex-warren-2027-glasgow-1auzkf_gkemjhov | Alex Warren | 2027-06-25 | Glasgow | no_candidates_returned | - |
| tm-tom-jones-2027-rugeley-1amzk4tgkejv7jb | Tom Jones | 2027-06-25 | Rugeley | no_candidates_returned | - |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | Nickelback | 2027-06-25 | Vienna | no_candidates_returned | - |
| tm-alex-warren-2027-exeter-g5vhz_3je-wlb | Alex Warren | 2027-06-26 | Exeter | no_candidates_returned | - |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | Jack Johnson | 2027-06-26 | Forest (Brussels) | no_candidates_returned | - |
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
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | Noah Kahan | 2027-07-02 | Berlin | no_candidates_returned | - |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | Simply Red | 2027-07-02 | Aurich | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s | KPop Demon Hunters | 2027-07-03 | Pittsburgh | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-07-03-2-pm/concert/18772685 |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | Noah Kahan | 2027-07-07 | Sevilla | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | 2027-07-08 | Edinburgh | no_candidates_returned | - |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | Nickelback | 2027-07-09 | Fornebu | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1adbz_4gkm8ikcj | Sam Fender | 2027-07-10 | Edinburgh | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu | KPop Demon Hunters | 2027-07-10 | Atlanta | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/atlanta-georgia-state-farm-arena-1-2027-07-10-2-pm/concert/18772692 |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | Oasis | 2027-07-10 | Barcelona | no_candidates_returned | - |
| tm-mumford-sons-2027-calgary-1aozk4pgkd1yzsk | Mumford & Sons | 2027-07-12 | Calgary | no_candidates_returned | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | 2027-07-13 | Glasgow | no_candidates_returned | - |
| tm-greta-van-fleet-2027-saint-louis-vv17bz_kgkm_stkv | Greta Van Fleet | 2027-07-14 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/greta-van-fleet-tickets/st-louis-missouri-chaifetz-arena-2027-07-14-7-pm/concert/18642010 |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | Oasis | 2027-07-16 | Amsterdam | no_candidates_returned | - |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | Mumford & Sons | 2027-07-17 | St. John's | no_candidates_returned | - |
| tm-sam-fender-2027-manchester-g5dzz_4k4turs | Sam Fender | 2027-07-17 | Manchester | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 | KPop Demon Hunters | 2027-07-17 | Orlando | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-1-pm/concert/18772696 |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | Oasis | 2027-07-17 | Amsterdam | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 | KPop Demon Hunters | 2027-07-24 | Phoenix | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-2-pm/concert/18772699 |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | Fall Out Boy | 2027-08-06 | Saint Charles | city_or_metro_match_failed | https://seatgeek.com/fall-out-boy-tickets/st-charles-iowa-roaming-hills-2027-08-06-6-30-pm/concert/18753421 |
| tm-simply-red-2027-halifax-15dfz_3r_jv8z | Simply Red | 2027-08-09 | Halifax | no_candidates_returned | - |
| tm-simply-red-2027-halifax-1adfz_3gkrvea3u | Simply Red | 2027-08-10 | Halifax | no_candidates_returned | - |
| tm-simply-red-2027-london-1adjz_3gkbyuns4 | Simply Red | 2027-08-13 | London | no_candidates_returned | - |
| tm-simply-red-2027-margate-1agzkfegkemyogi | Simply Red | 2027-08-14 | Margate | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih | KPop Demon Hunters | 2027-08-14 | Tacoma | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-7-30-pm/concert/18772721 |
| tm-simply-red-2027-scarborough-1agzkf0gkdqpn-m | Simply Red | 2027-08-17 | Scarborough | no_candidates_returned | - |
| tm-james-blunt-2027-colchester-1agzk4fgkdt9fe6 | James Blunt | 2027-08-28 | Colchester | no_candidates_returned | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | The Red Clay Strays | 2027-08-28 | Englewood | city_or_metro_match_failed | https://seatgeek.com/the-red-clay-strays-tickets/greenwood-village-colorado-fiddler-s-green-4-2027-08-28-7-pm/concert/18639116 |
| tm-travis-tritt-2027-saint-louis-1a-zk4igkdyooqa | Travis Tritt | 2027-09-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/travis-tritt-tickets/chesterfield-missouri-the-factory-stl-2027-09-10-8-pm/concert/18757697 |
| tm-oasis-2027-stevenage-1adjz_3gklfny3e | Oasis | 2027-09-11 | Stevenage | artist_match_failed | https://seatgeek.com/supersonic-tickets/asbury-park-new-jersey-asbury-lanes-2027-09-11-8-pm/concert/18798974 |
| tm-passenger-2027-glasgow-g5dzz_8wyqwf1 | Passenger | 2027-09-11 | Glasgow | no_candidates_returned | - |
| tm-kings-of-leon-2027-west-valley-city-g5vzz_p2iqpnf | Kings Of Leon | 2027-09-11 | West Valley City | city_or_metro_match_failed | https://seatgeek.com/kings-of-leon-tickets/salt-lake-city-utah-utah-first-credit-union-amphitheatre-2027-09-11-7-30-pm/concert/18746662 |
| tm-oasis-2027-stevenage-1adjz_3gkrrmy7n | Oasis | 2027-09-12 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-edinburgh-1adbz_8gks0vdnw | Passenger | 2027-09-12 | Edinburgh | no_candidates_returned | - |
| tm-passenger-2027-london-1auzkf3gkd0sykm | Passenger | 2027-09-17 | London | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrnjt4_ | Oasis | 2027-09-18 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkreiyj0 | Oasis | 2027-09-19 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-exeter-g5vhz_o2o0irs | Passenger | 2027-09-21 | Exeter | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-fornebu-z698xzb_z1k-p0apk | KPop Demon Hunters | 2027-09-25 | Fornebu | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrs3n_k | Oasis | 2027-09-25 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-brighton-g5vhz_o5oziab | Passenger | 2027-09-25 | Brighton | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrz1qva | Oasis | 2027-09-26 | Stevenage | no_candidates_returned | - |
| tm-andrea-bocelli-2027-birmingham-1aegz_kgkwagold | Andrea Bocelli | 2027-09-29 | Birmingham | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-brussels-z698xzg2z1kup-z3o | KPop Demon Hunters | 2027-10-02 | Brussels | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-dublin-1avoz_pgksg3dqw | KPop Demon Hunters | 2027-10-09 | Dublin | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-london-1adfz_pgkmklpyh | KPop Demon Hunters | 2027-10-23 | London | no_candidates_returned | - |
| tm-meshuggah-2027-dublin-1avoz_4gkwrafdq | Meshuggah | 2027-10-27 | Dublin | no_candidates_returned | - |
| tm-meshuggah-2027-london-1adjz_4gkbbdf9c | Meshuggah | 2027-10-30 | London | no_candidates_returned | - |
| tm-mat-kearney-2027-saint-louis-vv1kvovp4agag9idz | Mat Kearney | 2027-11-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/mat-kearney-tickets/st-louis-missouri-the-pageant-st-louis-2027-11-13-7-30-pm/concert/18725685 |
| tm-fontaines-d-c-2026-birmingham-1aegz_8gkdxxlc2 | Fontaines D.C. | 2026-11-25 | Birmingham | no_candidates_returned | - |
| tm-hayley-williams-2026-ciudad-de-mexico-g5dvz_1q0q4bc | Hayley Williams | 2026-11-26 | Ciudad de México | no_candidates_returned | - |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | 2026-11-27 | Oslo | no_candidates_returned | - |
| tm-interpol-2026-brighton-g5dzzbgwdgxyl | Interpol | 2026-11-27 | Brighton | no_candidates_returned | - |
| tm-fontaines-d-c-2026-london-1agzkfogkenxxaj | Fontaines D.C. | 2026-11-27 | London | no_candidates_returned | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61mujevj | KATSEYE | 2026-11-27 | Ciudad de México | no_candidates_returned | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61m2a3xe | KATSEYE | 2026-11-28 | Ciudad de México | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2mxoc | Harry Styles | 2026-12-02 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkesyi9m | Bruno Mars | 2026-12-03 | Ciudad de México | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2broi | Harry Styles | 2026-12-04 | Docklands | no_candidates_returned | - |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | Noah Kahan | 2026-12-04 | Munich | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfcxu | Bruno Mars | 2026-12-04 | Ciudad de México | no_candidates_returned | - |
| tm-yuridia-2026-zapopan-g5dvz_aia5kvd | Yuridia | 2026-12-05 | Zapopan | no_candidates_returned | - |
| tm-culture-club-2026-bournemouth-17uov0g659y_xj3 | Culture Club | 2026-12-07 | Bournemouth | no_candidates_returned | - |
| tm-tori-kelly-2026-manchester-g5vhz_1r4owph | Tori Kelly | 2026-12-07 | Manchester | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxy | Bruno Mars | 2026-12-07 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxd | Bruno Mars | 2026-12-08 | Ciudad de México | no_candidates_returned | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehaqnd | Bruno Mars | 2026-12-11 | Ciudad de México | no_candidates_returned | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | Bryan Adams | 2026-12-13 | Praha 9 | no_candidates_returned | - |
| tm-culture-club-2026-sheffield-17u8v0g659uvycg | Culture Club | 2026-12-17 | Sheffield | no_candidates_returned | - |
| tm-culture-club-2026-london-17u8v0g659y9_dw | Culture Club | 2026-12-19 | London | no_candidates_returned | - |
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
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | Nothing But Thieves | 2027-01-31 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-milwaukee-vv1a6zkfzgkemf4pv | Dancing With The Stars | 2027-01-31 | Milwaukee | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-allentown-1kgzvp8fgagolc1 | Dancing With The Stars | 2027-02-03 | Allentown | no_candidates_returned | - |
| tm-grace-potter-2027-saint-louis-vv1kbz_pq9g7dnzn | Grace Potter | 2027-02-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/grace-potter-the-nocturnals-tickets/st-louis-missouri-the-pageant-st-louis-2027-02-04-8-pm/concert/18755522 |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnxl1 | Fuerza Regida | 2027-02-05 | Ciudad de México | no_candidates_returned | - |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | Mat Kearney | 2027-02-05 | Kalispell | no_candidates_returned | - |
| tm-the-warning-2027-ciudad-de-mexico-1afzkf4gkenopd9 | The Warning | 2027-02-05 | Ciudad de México | no_candidates_returned | - |
| tm-boyz-ii-men-2027-atlantic-city-vv1kfz_fbxg7mvlj | Boyz II Men | 2027-02-06 | Atlantic City | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnwlg | Fuerza Regida | 2027-02-06 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgaclelp | Fuerza Regida | 2027-02-07 | Ciudad de México | no_candidates_returned | - |
| tm-black-stone-cherry-2027-aberdeen-1auzkcagkdnsiac | Black Stone Cherry | 2027-02-08 | Aberdeen | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-baltimore-1a4zk4vgkewzdyv | Dancing With The Stars | 2027-02-09 | Baltimore | no_candidates_returned | - |
| tm-polyphia-2027-hollywood-vvg10z_glgj36a | Polyphia | 2027-02-09 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/polyphia-tickets/los-angeles-california-hollywood-palladium-2027-02-09-7-30-pm/concert/18312308 |
| tm-bts-2027-docklands-17a8v0g65r_eq8g | BTS | 2027-02-10 | Docklands | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-pittsburgh-1apzkfygkdqrluc | Dancing With The Stars | 2027-02-10 | Pittsburgh | no_candidates_returned | - |
| tm-bts-2027-docklands-17a8v0g659_gumr | BTS | 2027-02-12 | Docklands | no_candidates_returned | - |
| tm-billy-strings-2027-duluth-vvg1zz_oinx98f | Billy Strings | 2027-02-12 | Duluth | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-12-7-30-pm/concert/18540085 |
| tm-dancing-with-the-stars-2027-albany-k7vgf_km48smn | Dancing With The Stars | 2027-02-12 | Albany | no_candidates_returned | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdoa5fw | Hilary Duff | 2027-02-12 | Ciudad de México | no_candidates_returned | - |
| tm-bts-2027-docklands-17a8v0g65r_ew8m | BTS | 2027-02-13 | Docklands | no_candidates_returned | - |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | John Summit | 2027-02-13 | Amsterdam | no_candidates_returned | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdomhcz | Hilary Duff | 2027-02-13 | Ciudad de México | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-hershey-vv1aezk4egkd_54wn | Dancing With The Stars | 2027-02-17 | Hershey | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-columbus-vv1kv8vp83gacza6r | Dancing With The Stars | 2027-02-18 | Columbus | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_o37vvzdckk | Bruno Mars | 2027-02-19 | Docklands | no_candidates_returned | - |
| tm-billy-strings-2027-nashville-g5viz_on579po | Billy Strings | 2027-02-19 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-19-7-30-pm/concert/18540093 |
| tm-bruno-mars-2027-docklands-1aefz_ogknww0xk | Bruno Mars | 2027-02-20 | Docklands | no_candidates_returned | - |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | John Summit | 2027-02-20 | Zürich | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-moline-vv17bz_kgkbyihs4 | Dancing With The Stars | 2027-02-20 | Moline | no_candidates_returned | - |
| tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz | Dylan Gossett | 2027-02-21 | Birmingham | no_candidates_returned | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | Chelsea Cutler | 2027-02-21 | Columbus | conflicting_same_date_city_candidates | https://seatgeek.com/chelsea-cutler-tickets/columbus-ohio-newport-music-hall-2027-02-21-3-30-am/concert/18639193 |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | Five Finger Death Punch | 2027-02-22 | Helsinki | no_candidates_returned | - |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | Charli xcx | 2027-02-22 | Amsterdam | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx7x5 | Bruno Mars | 2027-02-23 | Docklands | no_candidates_returned | - |
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
| tm-bon-jovi-2027-docklands-1aefz_fgkxe60v9 | Bon Jovi | 2027-03-04 | Docklands | no_candidates_returned | - |
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
| tm-megadeth-2027-cardiff-17uov0g62hgl_w2 | Megadeth | 2027-03-15 | Cardiff | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | Teddy Swims | 2027-03-16 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | 2027-03-16 | Dallas | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | Teddy Swims | 2027-03-17 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | 2027-03-17 | Tulsa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | 2027-03-19 | Denver | no_candidates_returned | - |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | Teddy Swims | 2027-03-20 | Praha 9 | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | 2027-03-23 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | 2027-03-23 | Abbotsford | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | 2027-03-24 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | 2027-03-24 | Portland | no_candidates_returned | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | Teddy Swims | 2027-03-26 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | Tash Sultana | 2027-03-26 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | 2027-03-27 | Amsterdam | no_candidates_returned | - |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | Foreigner | 2027-03-27 | Irvine | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-jose-g5vyz_kxgynut | Dancing With The Stars | 2027-03-27 | San Jose | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | 2027-03-28 | Amsterdam | no_candidates_returned | - |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | Megadeth | 2027-03-28 | Oslo | no_candidates_returned | - |
| tm-the-warning-2027-birmingham-g5dzz_3jthdkp | The Warning | 2027-03-29 | Birmingham | no_candidates_returned | - |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | Sienna Spiro | 2027-03-29 | Barcelona | no_candidates_returned | - |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | KALEO | 2027-03-30 | Amsterdam | no_candidates_returned | - |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | Sienna Spiro | 2027-03-30 | Madrid | no_candidates_returned | - |
| tm-james-blunt-2027-belfast-16doz_oxog7v-fd | James Blunt | 2027-03-31 | Belfast | no_candidates_returned | - |
| tm-tori-kelly-2027-st-petersburg-vvg1vz_pwiq_m9 | Tori Kelly | 2027-03-31 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/tori-kelly-tickets/saint-petersburg-florida-jannus-live-2027-03-31-7-pm/concert/18778539 |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | 2027-04-01 | Munich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | 2027-04-02 | Munich | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | 2027-04-02 | Los Angeles | no_candidates_returned | - |
| tm-tori-kelly-2027-ft-lauderdale-vvg1vz_pv-mndp | Tori Kelly | 2027-04-03 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/tori-kelly-tickets/fort-lauderdale-florida-revolution-live-2027-04-03-7-pm/concert/18778545 |
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
| tm-brandi-carlile-2027-london-16uzkf6-7za5ev8a | Brandi Carlile | 2027-04-14 | London | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | Thirty Seconds to Mars | 2027-04-15 | Krakow | no_candidates_returned | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k_p3f_b | Gracie Abrams | 2027-04-15 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k4vofa4 | Gracie Abrams | 2027-04-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjlgein | Billy Strings | 2027-04-16 | North Charleston | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-16-7-30-pm/concert/18755186 |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | Thirty Seconds to Mars | 2027-04-20 | Hannover | no_candidates_returned | - |
| tm-alex-warren-2027-sioux-falls-vv17bz_pgknvdnah | Alex Warren | 2027-04-21 | Sioux Falls | conflicting_same_date_city_candidates | https://seatgeek.com/alex-warren-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-21-7-45-pm/concert/18773535 |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | Thirty Seconds to Mars | 2027-04-23 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-billy-strings-2027-greensboro-g5evz_pk9bhy8 | Billy Strings | 2027-04-23 | Greensboro | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/greensboro-north-carolina-first-horizon-coliseum-2027-04-23-7-30-pm/concert/18755185 |
| tm-earth-wind-fire-2027-atlanta-vvg1zz_33xgiy_ | Earth, Wind & Fire | 2027-04-23 | Atlanta | no_candidates_returned | - |
| tm-u2-2027-stockholm-z698xzq2z16v-3vzat | U2 | 2027-04-26 | Stockholm | no_candidates_returned | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | Mat Kearney | 2027-04-26 | Portsmouth | no_candidates_returned | - |
| tm-rod-stewart-2027-belfast-1azzkfugkd15ooi | Rod Stewart | 2027-04-27 | Belfast | no_candidates_returned | - |
| tm-u2-2027-stockholm-z698xzq2z16v_p7i1a | U2 | 2027-04-28 | Stockholm | no_candidates_returned | - |
| tm-earth-wind-fire-2027-knoxville-g5viz_35urusm | Earth, Wind & Fire | 2027-04-28 | Knoxville | no_candidates_returned | - |
| tm-the-dead-south-2027-kansas-city-vv1akzk40gkemk2eh | The Dead South | 2027-04-28 | Kansas City | no_candidates_returned | - |
| tm-u2-2027-stockholm-z698xzq2z16vvejtvk | U2 | 2027-04-30 | Stockholm | no_candidates_returned | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | Simple Minds | 2027-04-30 | Amsterdam | no_candidates_returned | - |
| tm-earth-wind-fire-2027-durham-g5evz_f5p7r9- | Earth, Wind & Fire | 2027-05-01 | Durham | no_candidates_returned | - |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubtvhv | Remi Wolf | 2027-05-03 | Phoenix | no_candidates_returned | - |
| tm-tori-kelly-2027-saint-louis-vv17bz_pgkmbgu0t | Tori Kelly | 2027-05-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/tori-kelly-tickets/st-louis-missouri-the-pageant-st-louis-2027-05-04-8-pm/concert/18778571 |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubifhc | Remi Wolf | 2027-05-04 | Phoenix | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | Gracie Abrams | 2027-05-07 | Amsterdam | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | Gracie Abrams | 2027-05-08 | Amsterdam | no_candidates_returned | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | Too Many Zooz | 2027-05-09 | San Francisco | no_candidates_returned | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | Gracie Abrams | 2027-05-10 | Amsterdam | no_candidates_returned | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | Sombr | 2027-05-11 | Helsinki | no_candidates_returned | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | Haiden Henderson | 2027-05-11 | Seattle | no_candidates_returned | - |
| tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz | Simple Minds | 2027-05-13 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz16vasca3z | U2 | 2027-05-13 | Barcelona | no_candidates_returned | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | Sombr | 2027-05-19 | Praha 9 | no_candidates_returned | - |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | 2027-05-19 | Glasgow | no_candidates_returned | - |
| tm-weezer-2027-london-g5vhz_83wtacz | Weezer | 2027-05-22 | London | no_candidates_returned | - |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | Greta Van Fleet | 2027-05-24 | Amsterdam | no_candidates_returned | - |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | Sombr | 2027-05-27 | Zürich | no_candidates_returned | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | Gracie Abrams | 2027-05-27 | Barcelona | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5pben | Oasis | 2027-05-28 | Glasgow | no_candidates_returned | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | Sombr | 2027-05-28 | Munich | no_candidates_returned | - |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | Rod Stewart | 2027-05-28 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1agzkfwgkdu5imb | Oasis | 2027-05-29 | Glasgow | no_candidates_returned | - |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | Rod Stewart | 2027-05-29 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | Sombr | 2027-05-31 | Amsterdam | no_candidates_returned | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | Karol G | 2027-06-03 | Barcelona | no_candidates_returned | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | Karol G | 2027-06-04 | Barcelona | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz16v0jupoj | U2 | 2027-06-05 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz16v7bpzfv | U2 | 2027-06-06 | Amsterdam | no_candidates_returned | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | Tame Impala | 2027-06-07 | Rotterdam | no_candidates_returned | - |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | Nickelback | 2027-06-07 | Amsterdam | no_candidates_returned | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | Tame Impala | 2027-06-08 | Rotterdam | no_candidates_returned | - |
| tm-fall-out-boy-2027-amsterdam-z698xzbpz16vv-vwva | Fall Out Boy | 2027-06-08 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz1kb9z4vi | U2 | 2027-06-09 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lwcjqy | Oasis | 2027-06-11 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | Nickelback | 2027-06-11 | Hannover | no_candidates_returned | - |
| tm-u2-2027-amsterdam-z698xzbpz1k7zpzb4 | U2 | 2027-06-11 | Amsterdam | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lxmu-j | Oasis | 2027-06-12 | Manchester | artist_match_failed | https://seatgeek.com/supersonic-tickets/grand-rapids-michigan-elevation-at-the-intersection-2027-06-12-8-pm/concert/18856685 |
| tm-cody-jinks-2027-lake-tahoe-1a9zk4ngkdmvw-8 | Cody Jinks | 2027-06-12 | Lake Tahoe | city_or_metro_match_failed | https://seatgeek.com/cody-jinks-tickets/stateline-nevada-lake-tahoe-amphitheatre-at-caesars-republic-2027-06-12-7-pm/concert/18754097 |
| tm-fall-out-boy-2027-odz-z698xzqpz16evyz9fj | Fall Out Boy | 2027-06-13 | Łódź | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lv67ao | Oasis | 2027-06-18 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3l--ppl | Oasis | 2027-06-19 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | Nickelback | 2027-06-19 | Munich | no_candidates_returned | - |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | Nickelback | 2027-06-20 | Zürich | no_candidates_returned | - |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | Simply Red | 2027-06-20 | Amsterdam | no_candidates_returned | - |
| tm-bon-jovi-2027-london-1adjz_fgkuq9ee5 | Bon Jovi | 2027-06-24 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | Rod Stewart | 2027-06-24 | Praha 9 | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3ljog0t | Oasis | 2027-06-25 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-manchester-g5dzz_3lnpprv | Oasis | 2027-06-26 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | Nickelback | 2027-06-26 | Praha 9 | no_candidates_returned | - |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | Jack Johnson | 2027-06-27 | Amsterdam | no_candidates_returned | - |
| tm-fontaines-d-c-2027-newcastle-upon-tyne-1adfz_ogkm3hlfk | Fontaines D.C. | 2027-07-01 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | Nickelback | 2027-07-01 | Łódź | no_candidates_returned | - |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | Oasis | 2027-07-02 | Munich | no_candidates_returned | - |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | Oasis | 2027-07-03 | Munich | no_candidates_returned | - |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | Kenny Chesney | 2027-07-03 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/kenny-chesney-tickets/nashville-tennessee-nissan-stadium-2027-07-03-4-30-pm/concert/18559006 |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | Nickelback | 2027-07-07 | Helsinki | no_candidates_returned | - |
| tm-fontaines-d-c-2027-london-1ku8vpf_ga19knu | Fontaines D.C. | 2027-07-09 | London | no_candidates_returned | - |
| tm-raye-2027-london-1amzk4pgkdnol-0 | RAYE | 2027-07-10 | London | no_candidates_returned | - |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | Karol G | 2027-07-10 | Amsterdam | no_candidates_returned | - |
| tm-raye-2027-london-1amzk49gkeww5xa | RAYE | 2027-07-11 | London | no_candidates_returned | - |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | Oasis | 2027-07-11 | Barcelona | no_candidates_returned | - |
| tm-stray-kids-2027-vienna-z698xz5rz16vofpore | Stray Kids | 2027-07-21 | Vienna | no_candidates_returned | - |
| tm-stray-kids-2027-barcelona-z698xz2qz16vod48ea | Stray Kids | 2027-07-24 | Barcelona | no_candidates_returned | - |
| tm-stray-kids-2027-arnhem-z698xzbpz1k4kc30n | Stray Kids | 2027-07-27 | Arnhem | no_candidates_returned | - |
| tm-stray-kids-2027-arnhem-z698xzbpz16vp04wpo | Stray Kids | 2027-07-28 | Arnhem | no_candidates_returned | - |
| tm-simply-red-2027-colchester-1adfz_3gkmn5keu | Simply Red | 2027-08-18 | Colchester | no_candidates_returned | - |
| tm-mat-kearney-2027-phoenix-1av0z_4gknhdgeg | Mat Kearney | 2027-08-19 | Phoenix | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz16v0ozyff | KPop Demon Hunters | 2027-09-08 | Amsterdam | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz1krbj60f | KPop Demon Hunters | 2027-09-09 | Amsterdam | no_candidates_returned | - |
| tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 | Eros Ramazzotti | 2027-09-29 | Boston | conflicting_same_date_city_candidates | https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/18663233 |
| tm-bon-jovi-2027-south-bend-vv1kv8vp_zga5o3gv | Bon Jovi | 2027-10-02 | South Bend | city_or_metro_match_failed | https://seatgeek.com/bon-jovi-tickets/notre-dame-indiana-notre-dame-stadium-2027-10-02-6-30-pm/concert/18744634 |
| tm-phoebe-bridgers-2026-manchester-17uyv0g6gcqzprx | Phoebe Bridgers | 2026-11-26 | Manchester | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-glasgow-17uov0g6gor33_x | Phoebe Bridgers | 2026-11-27 | Glasgow | no_candidates_returned | - |
| tm-mariah-carey-2026-birmingham-1anzkfsgkdvieos | Mariah Carey | 2026-11-27 | Birmingham | no_candidates_returned | - |
| tm-blue-october-2026-irving-vvg1yz_6kcyhkx | Blue October | 2026-11-27 | Irving | conflicting_same_date_city_candidates | https://seatgeek.com/blue-october-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-27-8-pm/concert/18141902 |
| tm-phoebe-bridgers-2026-birmingham-17fyv0g6g2_ps5a | Phoebe Bridgers | 2026-11-28 | Birmingham | no_candidates_returned | - |
| tm-mariah-carey-2026-london-1agzkfsgkdzymm6 | Mariah Carey | 2026-11-30 | London | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | 2026-12-01 | London | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | 2026-12-02 | London | no_candidates_returned | - |
| tm-mariah-carey-2026-manchester-1amzkfsgkejdwkf | Mariah Carey | 2026-12-02 | Manchester | no_candidates_returned | - |
| tm-bryson-tiller-2026-manchester-17uyv0g65whosmd | Bryson Tiller | 2026-12-03 | Manchester | no_candidates_returned | - |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | 2026-12-05 | Cardiff | no_candidates_returned | - |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | 2026-12-06 | Berlin | no_candidates_returned | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | 2026-12-07 | Düsseldorf | no_candidates_returned | - |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | 2026-12-07 | London | no_candidates_returned | - |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | Jay Wheeler | 2026-12-08 | Valencia | no_candidates_returned | - |
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
| tm-aespa-2027-london-1agzk3pgkeok319 | aespa | 2027-01-16 | London | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes | Five Finger Death Punch | 2027-01-17 | Glasgow | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s | Five Finger Death Punch | 2027-01-22 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-buffalo-k7v16k4vppotze82 | Dancing With The Stars | 2027-01-22 | Buffalo | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-glasgow-17uov0g6ueealfd | Two Door Cinema Club | 2027-01-26 | Glasgow | no_candidates_returned | - |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | 2027-01-26 | Berlin | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-manchester-g5vhz_ujflqde | Two Door Cinema Club | 2027-01-27 | Manchester | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-london-1agzk4ngkdo79wi | A Boogie Wit Da Hoodie | 2027-01-27 | London | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-london-17u8v0g6ulnn4yb | Two Door Cinema Club | 2027-01-28 | London | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1amzk40gkdjyurt | A Boogie Wit Da Hoodie | 2027-01-29 | Manchester | no_candidates_returned | - |
| tm-aespa-2027-barcelona-z698xz2qz16v0vckob | aespa | 2027-01-31 | Barcelona | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr | Nothing But Thieves | 2027-02-04 | Nottingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-philadelphia-1ayzk4vgkepepvt | Dancing With The Stars | 2027-02-04 | Philadelphia | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp | Nothing But Thieves | 2027-02-05 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-york-g5diz_f1zup-t | Dancing With The Stars | 2027-02-05 | New York | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-washington-1a4zkfsgkew-uk5 | Dancing With The Stars | 2027-02-07 | Washington | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-cardiff-17uov0g65qps55o | Nothing But Thieves | 2027-02-08 | Cardiff | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik | Nothing But Thieves | 2027-02-10 | Glasgow | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-boston-vv177z_kgks9d4wi | Dancing With The Stars | 2027-02-11 | Boston | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj | Nothing But Thieves | 2027-02-12 | Manchester | no_candidates_returned | - |
| tm-chelsea-cutler-2027-brooklyn-k7vgf_kze_vgc | Chelsea Cutler | 2027-02-12 | Brooklyn | city_or_metro_match_failed | https://seatgeek.com/chelsea-cutler-tickets/new-york-new-york-brooklyn-1-2027-02-12-7-pm/concert/18639182 |
| tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux | Nothing But Thieves | 2027-02-13 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-newark-vv17fz_kgkbxwhxi | Dancing With The Stars | 2027-02-13 | Newark | no_candidates_returned | - |
| tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt | Charli xcx | 2027-02-15 | Glasgow | no_candidates_returned | - |
| tm-charli-xcx-2027-manchester-1amzkfegkdf5asp | Charli xcx | 2027-02-17 | Manchester | no_candidates_returned | - |
| tm-dylan-gossett-2027-london-g5dzz_8kn_3tz | Dylan Gossett | 2027-02-18 | London | no_candidates_returned | - |
| tm-charli-xcx-2027-london-1agzkfigkenre1t | Charli xcx | 2027-02-19 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-rosemont-vv178z_kgku4hpsc | Dancing With The Stars | 2027-02-19 | Rosemont | no_candidates_returned | - |
| tm-charli-xcx-2027-london-1adfz_3gknni7-u | Charli xcx | 2027-02-20 | London | no_candidates_returned | - |
| tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2 | Kacey Musgraves | 2027-02-22 | Glasgow | no_candidates_returned | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct | Sienna Spiro | 2027-02-22 | Edinburgh | no_candidates_returned | - |
| tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt | Kacey Musgraves | 2027-02-24 | Manchester | no_candidates_returned | - |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | 2027-02-24 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr | Malcolm Todd | 2027-02-25 | Glasgow | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-london-16dfz_kqeg7loo3 | Bullet For My Valentine | 2027-02-26 | London | no_candidates_returned | - |
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

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Marian Anderson Hall - Kimmel Center | Kimmel Center - Miller Theater | https://seatgeek.com/pink-martini-tickets/philadelphia-pennsylvania-kimmel-center-miller-theater-2026-12-14-7-pm/concert/18364153 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-08-8-pm/concert/18612961 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-09-8-pm/concert/18612966 |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/yacht-rock-revue-tickets/huntington-new-york-the-paramount-huntington-2027-01-10-7-pm/concert/18612962 |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Patchogue Theater | Patchogue Theatre for the Performing Arts | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Vic Theatre | The WIP Theater | https://seatgeek.com/dinosaur-jr-tickets/chicago-illinois-the-wip-theater-2027-03-05-7-30-pm/concert/18666384 |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | The Rock Box | Vibes Event Center | https://seatgeek.com/missio-tickets/san-antonio-texas-vibes-event-center-2027-04-09-7-pm/concert/18853293 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | Coyote Joes | Coyote Joe's - Charlotte | https://seatgeek.com/warren-zeiders-tickets/charlotte-north-carolina-coyote-joe-s-charlotte-2027-05-01-7-pm/concert/18649767 |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | Greensboro Complex | Special Events Center At Greensboro Coliseum Complex | https://seatgeek.com/meshuggah-tickets/greensboro-north-carolina-special-events-center-at-greensboro-coliseum-complex-2027-05-11-7-pm/concert/18724694 |

## Conflicts found

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
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-7-30-pm/concert/18772697
- tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 (KPop Demon Hunters, 2027-07-24, Phoenix)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-7-30-pm/concert/18772701
- tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih (KPop Demon Hunters, 2027-08-14, Tacoma)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-2-pm/concert/18772720
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
- tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa (Kenny Chesney, 2027-07-03, Nashville)
  - 100: https://seatgeek.com/kenny-chesney-tickets/nashville-tennessee-nissan-stadium-1-titans-way-2027-07-03-4-30-pm/concert/18581593
- tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 (Eros Ramazzotti, 2027-09-29, Boston)
  - 100: https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/17481896
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
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | 2026-11-24T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-doja-cat-2026-boston-vv1f7zbs09vyzd227 | doja-cat | 2026-11-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-sombr-2026-new-york-g5diz_flfogz- | sombr | 2026-11-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | 2026-11-22T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-in-flames-2026-ft-lauderdale-vvg1vz_3k_p4ju | in-flames | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | 2026-11-22T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | 2026-11-23T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | 2026-11-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | 2026-11-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-waite-park-vv1akzk3pgkdplazc | tobymac | 2026-09-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | 2026-11-13T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | 2026-11-14T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | 2026-11-21T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-trans-siberian-orchestra-2026-youngstown-vv1aazkfagkd2zwpt | trans-siberian-orchestra | 2026-11-22T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6tnua- | morat | 2026-11-21T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6ivj5r | morat | 2026-11-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-steve-lacy-2026-hollywood-vvg1iz_8f-wifq | steve-lacy | 2026-11-22T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | noah-kahan | 2026-11-21T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | noah-kahan | 2026-11-22T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-fontaines-d-c-2026-manchester-g5vhz_okyh0m1 | fontaines-d-c | 2026-11-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-glasgow-1adbz_8gkucuwyw | fontaines-d-c | 2026-11-22T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4cgv | phoebe-bridgers | 2026-11-23T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | 2026-11-24T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-jack-johnson-2026-waipara-1kazv0jzgaua-ts | jack-johnson | 2026-11-22T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-interpol-2026-cardiff-1auzkungkeif6z0 | interpol | 2026-11-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | 2026-11-22T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | 2026-11-23T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-lenny-pearce-2026-silver-spring-17a8v0g6gpl1zid | lenny-pearce | 2026-11-21T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | 2026-11-09T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | 2026-11-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | rufus-du-sol | 2026-11-23T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1afzk3vgketlp_s | karol-g | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
