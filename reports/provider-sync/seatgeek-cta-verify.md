# SeatGeek CTA verification log

Generated: 2026-11-13T23:56:41.653Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1813 (needs_recheck: 662, provenance backfill: 23, stale re-check: 1668)
- Events skipped before API checks: 707
- API calls made: 800
- Verified provenance written: 598
- URLs added: 23
- URLs corrected: 0
- URLs cleared: 21
- Provenance un-verified: 13
- Conflicts (ambiguous, untouched): 3
- No qualifying listing: 108
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | add (applied) | 18758909 | https://seatgeek.com/don-omar-tickets/salt-lake-city-utah-delta-center-1-2026-11-13-8-pm/concert/18758909 | - |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | rufus-du-sol | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | koe-wetzel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Ramsey Concert Hall' vs 'Hodgson Concert Hall at the UGA Performing Arts Center'; no qualifying replacement found |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | clear (applied) | - | - | stored URL failed: venue mismatch: 'Mesa Theatre & Club' vs 'Mesa Theater'; no qualifying replacement found |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Seminole Center' vs 'Seminole Casino Immokalee'; no qualifying replacement found |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | yuridia | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-spokane-z7r9jz1aaa8z4 | phoebe-bridgers | add (applied) | 18760656 | https://seatgeek.com/phoebe-bridgers-tickets/spokane-washington-numerica-veterans-arena-2027-02-18-7-30-pm/concert/18760656 | - |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-honolulu-vvg1iz_4bdasgg | leon-bridges | verify (applied) | 18756049 | https://seatgeek.com/leon-bridges-tickets/honolulu-hawaii-tom-moffatt-waikiki-shell-2027-02-20-8-pm/concert/18756049 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-kansas-city-z7r9jz1aaa8zp | phoebe-bridgers | add (applied) | 18760622 | https://seatgeek.com/phoebe-bridgers-tickets/kansas-city-missouri-t-mobile-center-2027-02-26-7-30-pm/concert/18760622 | - |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | dylan-scott | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass Resort & Casino' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-feid-2027-hartford-z7r9jz1aaad3z | feid | verify (applied) | 18746731 | https://seatgeek.com/feid-tickets/hartford-connecticut-peoplesbank-arena-2027-02-28-8-pm/concert/18746731 | - |
| tm-phoebe-bridgers-2027-oklahoma-city-z7r9jz1aaa8z9 | phoebe-bridgers | add (applied) | 18760621 | https://seatgeek.com/phoebe-bridgers-tickets/oklahoma-city-oklahoma-paycom-center-2027-02-28-7-30-pm/concert/18760621 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-lincoln-z7r9jz1aaa8zb | phoebe-bridgers | add (applied) | 18760620 | https://seatgeek.com/phoebe-bridgers-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-03-02-7-30-pm/concert/18760620 | - |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | add (applied) | 18762616 | https://seatgeek.com/valley-tickets/phoenix-arizona-crescent-ballroom-2027-03-03-8-pm/concert/18762616 | - |
| tm-feid-2027-brooklyn-1ayzk4tgkdul9aj | feid | verify (applied) | 18758824 | https://seatgeek.com/feid-tickets/brooklyn-new-york-barclays-center-2027-03-04-8-pm/concert/18758824 | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-grand-rapids-z7r9jz1aaa8z_ | phoebe-bridgers | add (applied) | 18760631 | https://seatgeek.com/phoebe-bridgers-tickets/grand-rapids-michigan-van-andel-arena-2027-03-06-7-30-pm/concert/18760631 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-cleveland-z7r9jz1aaa8zo | phoebe-bridgers | add (applied) | 18744825 | https://seatgeek.com/phoebe-bridgers-tickets/cleveland-ohio-rocket-arena-2027-03-07-7-30-pm/concert/18744825 | - |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-edmonton-1k78vpbmga2hetj | the-rankin-family | verify (applied) | 18761493 | https://seatgeek.com/the-rankin-family-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-03-12-7-30-pm/concert/18761493 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-calgary-1k78vpbmgac53nm | the-rankin-family | verify (applied) | 18761494 | https://seatgeek.com/the-rankin-family-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-13-7-30-pm/concert/18761494 | - |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-winnipeg-1aozk4ngkerkp1s | the-rankin-family | verify (applied) | 18761503 | https://seatgeek.com/the-rankin-family-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-15-7-30-pm/concert/18761503 | - |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | the-rankin-family | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-too-many-zooz-2027-frisco-z7r9jz1aaeep4 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-ottawa-1aszk4ngkdjouzs | the-rankin-family | verify (applied) | 18761508 | https://seatgeek.com/the-rankin-family-tickets/ottawa-canada-national-arts-centre-2027-03-24-7-30-pm/concert/18761508 | - |
| tm-feid-2027-houston-z7r9jz1aaad3v | feid | add (applied) | 18746744 | https://seatgeek.com/feid-tickets/houston-texas-toyota-center-2027-03-25-8-pm/concert/18746744 | - |
| tm-the-rankin-family-2027-niagara-falls-1a8zk40gkdzuhrm | the-rankin-family | verify (applied) | 18761514 | https://seatgeek.com/the-rankin-family-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-03-27-8-pm/concert/18761514 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | clear (applied) | - | - | stored URL failed: venue mismatch: 'Oriental Theatre-CO' vs 'The Oriental Theater'; no qualifying replacement found |
| tm-the-rankin-family-2027-montreal-1aszk40gkdkmkar | the-rankin-family | verify (applied) | 18761516 | https://seatgeek.com/the-rankin-family-tickets/montreal-canada-beanfield-theatre-2027-03-29-7-30-pm/concert/18761516 | - |
| tm-the-rankin-family-2027-moncton-1aszk4pgkeuypli | the-rankin-family | verify (applied) | 18761517 | https://seatgeek.com/the-rankin-family-tickets/moncton-canada-molson-canadian-centre-at-casino-new-brunswick-2027-03-30-7-30-pm/concert/18761517 | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-halifax-16szk4poezacdevv | the-rankin-family | verify (applied) | 18761518 | https://seatgeek.com/the-rankin-family-tickets/halifax-canada-scotiabank-centre-2027-04-01-7-30-pm/concert/18761518 | - |
| tm-feid-2027-salt-lake-city-z7r9jz1aaad3e | feid | add (applied) | 18576692 | https://seatgeek.com/feid-tickets/salt-lake-city-utah-delta-center-1-2027-04-02-8-pm/concert/18576692 | - |
| tm-the-rankin-family-2027-sydney-1aszk4pgkd5nkwf | the-rankin-family | verify (applied) | 18761519 | https://seatgeek.com/the-rankin-family-tickets/sydney-canada-centre-200-2027-04-03-7-pm/concert/18761519 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-orlando-z7r9jz1aaevq0 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-las-vegas-z7r9jz1aaad3d | feid | add (applied) | 18746759 | https://seatgeek.com/feid-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-17-8-pm/concert/18746759 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-athens-z7r9jz1aa7wgt | noah-kahan | add (applied) | 18728706 | https://seatgeek.com/noah-kahan-tickets/athens-georgia-sanford-stadium-2027-04-24-6-30-pm/concert/18728706 | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-nashville-z7r9jz1aa7wuk | noah-kahan | add (applied) | 18723384 | https://seatgeek.com/noah-kahan-tickets/nashville-tennessee-nissan-stadium-2027-05-04-6-30-pm/concert/18723384 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-norman-z7r9jz1aa7wuw | noah-kahan | add (applied) | 18728705 | https://seatgeek.com/noah-kahan-tickets/norman-oklahoma-gaylord-family-oklahoma-memorial-stadium-2027-05-09-6-30-pm/concert/18728705 | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-austin-z7r9jz1aa7wob | noah-kahan | add (applied) | 18728715 | https://seatgeek.com/noah-kahan-tickets/austin-texas-darrell-k-royal-texas-memorial-stadium-2027-05-15-6-30-pm/concert/18728715 | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | clear (applied) | - | - | stored URL failed: venue mismatch: 'Thelma Gaylord Performing Arts Theatre' vs 'Thelma Gaylord PAT At Civic Center Music Hall'; no qualifying replacement found |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-noah-kahan-2027-madison-z7r9jz1aa7w8x | noah-kahan | add (applied) | 18728720 | https://seatgeek.com/noah-kahan-tickets/madison-wisconsin-camp-randall-stadium-2027-05-26-6-30-pm/concert/18728720 | - |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo7 | noah-kahan | add (applied) | 18728723 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-05-29-6-pm/concert/18728723 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wof | noah-kahan | add (applied) | 18728725 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-05-30-6-pm/concert/18728725 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo4 | noah-kahan | add (applied) | 18728724 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-06-01-6-pm/concert/18728724 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo9 | noah-kahan | add (applied) | 18728726 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-06-02-6-pm/concert/18728726 | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | mumford-sons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqm-6ap | kpop-demon-hunters | verify (applied) | 18772702 | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-20-7-30-pm/concert/18772702 | - |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqmd65i | kpop-demon-hunters | verify (applied) | 18772728 | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-21-7-30-pm/concert/18772728 | - |
| tm-fall-out-boy-2027-nashville-z7r9jz1aaaa0d | fall-out-boy | add (applied) | 18753412 | https://seatgeek.com/fall-out-boy-tickets/nashville-tennessee-firstbank-stadium-2027-07-27-5-30-pm/concert/18753412 | - |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | fall-out-boy | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fall-out-boy-2027-sandy-z7r9jz1aaaa0a | fall-out-boy | add (applied) | 18738275 | https://seatgeek.com/fall-out-boy-tickets/sandy-utah-america-first-field-2027-08-13-5-30-pm/concert/18738275 | - |
| tm-mat-kearney-2027-dallas-z7r9jz1aa7s_b | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-boise-z7r9jz1aa7yr7 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz16v0ozyff | kpop-demon-hunters | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz1krbj60f | kpop-demon-hunters | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kpop-demon-hunters-2027-fornebu-z698xzb_z1k-p0apk | kpop-demon-hunters | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kpop-demon-hunters-2027-brussels-z698xzg2z1kup-z3o | kpop-demon-hunters | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-dead-south-2027-regina-z7r9jz1aaakfg | the-dead-south | add (applied) | 18760507 | https://seatgeek.com/the-dead-south-tickets/regina-canada-conexus-arts-centre-2027-10-09-8-pm/concert/18760507 | - |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18211698 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18175603 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18252162 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18085137 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18474900 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18141374 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18427193 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18229329 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18390356 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jodeci-2026-national-harbor-164zk3ffyzacfekc | jodeci | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18407243 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18387640 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-victoria-monet-2026-philadelphia-vv1aezkfxgkegbvoj | victoria-monet | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18579771 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-little-big-town-2026-chicago-vvg1jz_gohfssb | little-big-town | verify (applied) | 18292638 | https://seatgeek.com/little-big-town-tickets/chicago-illinois-the-chicago-theatre-2026-11-19-7-30-pm/concert/18292638 | - |
| tm-lenny-pearce-2026-new-york-k7vgf_gmumtdg | lenny-pearce | verify (applied) | 18305081 | https://seatgeek.com/lenny-pearce-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-22-12-30-pm/concert/18305081 | - |
| tm-los-tucanes-de-tijuana-2026-fairfax-17a8v0g61bgdzeq | los-tucanes-de-tijuana | verify (applied) | 18251692 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/fairfax-virginia-eaglebank-arena-2026-11-27-8-pm/concert/18251692 | - |
| tm-los-tucanes-de-tijuana-2026-elizabeth-k7vgf_1yuvjm8 | los-tucanes-de-tijuana | verify (applied) | 18252126 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/elizabeth-new-jersey-ritz-theatre-performing-arts-center-2026-11-28-8-pm/concert/18252126 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | beartooth | verify (applied) | 18253058 | https://seatgeek.com/beartooth-tickets/charleston-south-carolina-the-refinery-charleston-2026-12-02-6-30-pm/concert/18253058 | - |
| tm-lord-huron-2026-cincinnati-17aov0g62ysdsyk | lord-huron | verify (applied) | 18421955 | https://seatgeek.com/lord-huron-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-12-02-8-pm/concert/18421955 | - |
| tm-billy-strings-2026-new-orleans-g5viz_fhsj6zp | billy-strings | verify (applied) | 18167418 | https://seatgeek.com/billy-strings-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2026-12-04-7-30-pm/concert/18167418 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-jodeci-2026-savannah-vvg1zz_2qcyhff | jodeci | verify (applied) | 18407269 | https://seatgeek.com/jodeci-tickets/savannah-georgia-savannah-civic-center-johnny-mercer-theatre-2026-12-08-8-pm/concert/18407269 | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-es7s | lord-huron | verify (applied) | 18421958 | https://seatgeek.com/lord-huron-tickets/chicago-illinois-the-chicago-theatre-2026-12-08-8-pm/concert/18421958 | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | blue-october | verify (applied) | 18147877 | https://seatgeek.com/blue-october-tickets/little-rock-arkansas-the-hall-little-rock-2026-12-09-7-pm/concert/18147877 | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-jk7l | lord-huron | verify (applied) | 18421967 | https://seatgeek.com/lord-huron-tickets/chicago-illinois-the-chicago-theatre-2026-12-09-8-pm/concert/18421967 | - |
| tm-jodeci-2026-charlotte-g5evz_2qspt5m | jodeci | verify (applied) | 18407279 | https://seatgeek.com/jodeci-tickets/charlotte-north-carolina-ovens-auditorium-2026-12-19-8-pm/concert/18407279 | - |
| tm-blue-october-2026-houston-g5diz_65lyohs | blue-october | verify (applied) | 18141898 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-19-8-pm/concert/18141898 | - |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | pentatonix | verify (applied) | 18427231 | https://seatgeek.com/pentatonix-tickets/glendale-arizona-desert-diamond-arena-2026-12-19-7-pm/concert/18427231 | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | nickelback | verify (applied) | 18629578 | https://seatgeek.com/nickelback-tickets/durant-oklahoma-choctaw-grand-theater-2026-12-19-8-pm/concert/18629578 | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | beartooth | verify (applied) | 18253079 | https://seatgeek.com/beartooth-tickets/wheatland-california-hard-rock-live-sacramento-2026-12-19-6-30-pm/concert/18253079 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | barry-manilow | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17637171 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | gracie-abrams | verify (applied) | 18270527 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-19-8-pm/concert/18270527 | - |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | stevie-wonder | verify (applied) | 18570218 | https://seatgeek.com/stevie-wonder-tickets/inglewood-california-intuit-dome-2026-12-19-8-pm/concert/18570218 | - |
| tm-yg-2026-oakland-g5vyz_u2lcdvy | yg | verify (applied) | 18327961 | https://seatgeek.com/yg-tickets/oakland-california-oakland-arena-2026-12-19-8-pm/concert/18327961 | - |
| tm-tyla-2026-las-vegas-17ayv0g629nf-rw | tyla | verify (applied) | 18404302 | https://seatgeek.com/tyla-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-12-19-9-pm/concert/18404302 | - |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | a-perfect-circle | verify (applied) | 18246867 | https://seatgeek.com/a-perfect-circle-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-12-19-8-pm/concert/18246867 | - |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | trans-siberian-orchestra | verify (applied) | 18573484 | https://seatgeek.com/trans-siberian-orchestra-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-20-3-pm/concert/18573484 | - |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | trans-siberian-orchestra | verify (applied) | 18573485 | https://seatgeek.com/trans-siberian-orchestra-tickets/tampa-florida-benchmark-international-arena-2026-12-20-3-pm/concert/18573485 | - |
| tm-jodeci-2026-charlotte-g5evz_ok-zl2c | jodeci | verify (applied) | 18522802 | https://seatgeek.com/jodeci-tickets/charlotte-north-carolina-ovens-auditorium-2026-12-20-8-pm/concert/18522802 | - |
| tm-blue-october-2026-houston-g5diz_1sa9wed | blue-october | verify (applied) | 18248695 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-20-8-pm/concert/18248695 | - |
| tm-pentatonix-2026-san-diego-vvg1iz_2i-g3fb | pentatonix | verify (applied) | 18427232 | https://seatgeek.com/pentatonix-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-20-6-pm/concert/18427232 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0eryu | gracie-abrams | verify (applied) | 18270529 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-20-8-pm/concert/18270529 | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | jonas-brothers | verify (applied) | 18503932 | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-21-7-30-pm/concert/18503932 | - |
| tm-andrea-bocelli-2026-pittsburgh-1apzk8vgkdk8zer | andrea-bocelli | verify (applied) | 18039186 | https://seatgeek.com/andrea-bocelli-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-21-8-pm/concert/18039186 | - |
| tm-trans-siberian-orchestra-2026-indianapolis-vv17fz_8gkiwqjq1 | trans-siberian-orchestra | verify (applied) | 18573492 | https://seatgeek.com/trans-siberian-orchestra-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-12-22-3-pm/concert/18573492 | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx | jonas-brothers | verify (applied) | 18532484 | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-22-7-30-pm/concert/18532484 | - |
| tm-andrea-bocelli-2026-philadelphia-1ayzk8ygkdwg9ej | andrea-bocelli | verify (applied) | 18039187 | https://seatgeek.com/andrea-bocelli-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-22-8-pm/concert/18039187 | - |
| tm-pentatonix-2026-inglewood-vv1aazkf7gkdi1gsn | pentatonix | verify (applied) | 18427236 | https://seatgeek.com/pentatonix-tickets/inglewood-california-kia-forum-2026-12-22-7-pm/concert/18427236 | - |
| tm-trans-siberian-orchestra-2026-detroit-vv17oz_8gkyvghou | trans-siberian-orchestra | verify (applied) | 18573495 | https://seatgeek.com/trans-siberian-orchestra-tickets/detroit-michigan-little-caesars-arena-2026-12-23-3-pm/concert/18573495 | - |
| tm-trans-siberian-orchestra-2026-rosemont-vv1a7zkffgkdsxaxx | trans-siberian-orchestra | verify (applied) | 18573496 | https://seatgeek.com/trans-siberian-orchestra-tickets/rosemont-illinois-allstate-arena-2026-12-23-2-45-pm/concert/18573496 | - |
| tm-trans-siberian-orchestra-2026-newark-vv1aezkf_gkdmwuvf | trans-siberian-orchestra | verify (applied) | 18573503 | https://seatgeek.com/trans-siberian-orchestra-tickets/newark-new-jersey-prudential-center-2026-12-26-3-pm/concert/18573503 | - |
| tm-trans-siberian-orchestra-2026-milwaukee-vv1a6zkfogkdqpudv | trans-siberian-orchestra | verify (applied) | 18573505 | https://seatgeek.com/trans-siberian-orchestra-tickets/milwaukee-wisconsin-fiserv-forum-2026-12-26-3-pm/concert/18573505 | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqwir3 | backstreet-boys | verify (applied) | 18513686 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-26-8-pm/concert/18513686 | - |
| tm-trans-siberian-orchestra-2026-washington-17a8v0g62bwqi08 | trans-siberian-orchestra | verify (applied) | 18573509 | https://seatgeek.com/trans-siberian-orchestra-tickets/washington-district-of-columbia-capital-one-arena-2026-12-27-3-pm/concert/18573509 | - |
| tm-trans-siberian-orchestra-2026-minneapolis-vv1akzkfbgkelyd6x | trans-siberian-orchestra | verify (applied) | 18573514 | https://seatgeek.com/trans-siberian-orchestra-tickets/minneapolis-minnesota-target-center-2026-12-27-3-pm/concert/18573514 | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqtbry | backstreet-boys | verify (applied) | 18513688 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-27-8-pm/concert/18513688 | - |
| tm-trans-siberian-orchestra-2026-toronto-1avzz_8gkmdenjm | trans-siberian-orchestra | verify (applied) | 18573520 | https://seatgeek.com/trans-siberian-orchestra-tickets/toronto-canada-scotiabank-arena-2026-12-29-3-pm/concert/18573520 | - |
| tm-trans-siberian-orchestra-2026-kansas-city-vv1kvovpkbgacwdwu | trans-siberian-orchestra | verify (applied) | 18573521 | https://seatgeek.com/trans-siberian-orchestra-tickets/kansas-city-missouri-t-mobile-center-2026-12-29-3-pm/concert/18573521 | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62thvzyn | backstreet-boys | verify (applied) | 18696676 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-29-8-pm/concert/18696676 | - |
| tm-trans-siberian-orchestra-2026-buffalo-k7vgf_okhdtog | trans-siberian-orchestra | verify (applied) | 18573528 | https://seatgeek.com/trans-siberian-orchestra-tickets/buffalo-new-york-keybank-center-2026-12-30-3-pm/concert/18573528 | - |
| tm-trans-siberian-orchestra-2026-saint-louis-vv1akzkfbgkdrsdgs | trans-siberian-orchestra | verify (applied) | 18573529 | https://seatgeek.com/trans-siberian-orchestra-tickets/saint-louis-missouri-enterprise-center-2026-12-30-3-pm/concert/18573529 | - |
| tm-phish-2027-new-york-g5diz_kv3mvxa | phish | verify (applied) | 18659385 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-31-7-30-pm/concert/18659385 | - |
| tm-the-avett-brothers-2027-asheville-g5evz_38pztce | the-avett-brothers | verify (applied) | 18580244 | https://seatgeek.com/the-avett-brothers-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2026-12-31-8-pm/concert/18580244 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | backstreet-boys | verify (applied) | 18470170 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-31-10-pm/concert/18470170 | - |
| tm-phish-2027-new-york-g5diz_kv3yvxl | phish | verify (applied) | 18659382 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-01-7-30-pm/concert/18659382 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | backstreet-boys | verify (applied) | 18470178 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-01-8-pm/concert/18470178 | - |
| tm-illenium-2027-san-francisco-g5vyz_kuqzndv | illenium | verify (applied) | 18723868 | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-01-01-8-pm/concert/18723868 | - |
| tm-phish-2027-new-york-g5diz_kv3dvxt | phish | verify (applied) | 18659384 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-02-7-30-pm/concert/18659384 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | backstreet-boys | verify (applied) | 18470180 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-02-8-pm/concert/18470180 | - |
| tm-yacht-rock-revue-2027-englewood-k7vgf_k9ovli- | yacht-rock-revue | verify (applied) | 18612862 | https://seatgeek.com/yacht-rock-revue-tickets/englewood-new-jersey-bergen-performing-arts-center-2027-01-07-8-pm/concert/18612862 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | lionel-richie | verify (applied) | 18405682 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-08-8-pm/concert/18405682 | - |
| tm-jodeci-2027-san-francisco-g5vyz_2qprnjg | jodeci | verify (applied) | 18407226 | https://seatgeek.com/jodeci-tickets/san-francisco-california-the-masonic-san-francisco-2027-01-08-8-pm/concert/18407226 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | eagles | verify (applied) | 18701672 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-08-7-pm/concert/18701672 | - |
| tm-stella-lefty-2027-detroit-vv1afzkfkgkesu99t | stella-lefty | verify (applied) | 18527905 | https://seatgeek.com/stella-lefty-tickets/detroit-michigan-the-fillmore-detroit-2027-01-09-8-pm/concert/18527905 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | lionel-richie | verify (applied) | 18405681 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-09-8-pm/concert/18405681 | - |
| tm-jodeci-2027-inglewood-vvg1iz_2l8dh94 | jodeci | verify (applied) | 18407227 | https://seatgeek.com/jodeci-tickets/inglewood-california-youtube-theater-2027-01-09-8-pm/concert/18407227 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | eagles | verify (applied) | 18701674 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-09-8-30-pm/concert/18701674 | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2ug7bzu | lord-huron | verify (applied) | 18421996 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-10-8-pm/concert/18421996 | - |
| tm-jodeci-2027-el-cajon-vvg1iz_2r2vxq6 | jodeci | verify (applied) | 18407231 | https://seatgeek.com/jodeci-tickets/el-cajon-california-the-magnolia-1-2027-01-10-7-pm/concert/18407231 | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2ugkfzf | lord-huron | verify (applied) | 18421997 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-11-8-pm/concert/18421997 | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | stella-lefty | verify (applied) | 18527909 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-12-7-pm/concert/18527909 | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2d_gilx | lord-huron | verify (applied) | 18484690 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-12-6-30-pm/concert/18484690 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | olivia-rodrigo | verify (applied) | 18211724 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-12-7-pm/concert/18211724 | - |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | stella-lefty | verify (applied) | 18539735 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-13-7-pm/concert/18539735 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | olivia-rodrigo | verify (applied) | 18211726 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-13-7-pm/concert/18211726 | - |
| tm-atmosphere-2027-madison-vv1a6zkfygkes1aem | atmosphere | verify (applied) | 18609073 | https://seatgeek.com/atmosphere-tickets/madison-wisconsin-the-sylvee-2027-01-15-6-45-pm/concert/18609073 | - |
| tm-stella-lefty-2027-montreal-1kg8vp7yga51kww | stella-lefty | verify (applied) | 18527910 | https://seatgeek.com/stella-lefty-tickets/montreal-canada-mtelus-2027-01-15-8-pm/concert/18527910 | - |
| tm-jodeci-2027-phoenix-17k8v0g62lhiblw | jodeci | verify (applied) | 18407229 | https://seatgeek.com/jodeci-tickets/phoenix-arizona-arizona-financial-theatre-2027-01-15-8-pm/concert/18407229 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | eagles | verify (applied) | 18421044 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | olivia-rodrigo | verify (applied) | 18214730 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-16-7-pm/concert/18214730 | - |
| tm-jodeci-2027-ontario-vvg10z_2n6tniq | jodeci | verify (applied) | 18407228 | https://seatgeek.com/jodeci-tickets/ontario-california-toyota-arena-ontario-2027-01-16-8-pm/concert/18407228 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | eagles | verify (applied) | 18421045 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-16-8-30-pm/concert/18421045 | - |
| tm-missio-2027-cleveland-vv17fz_8gkl63cwa | missio | verify (applied) | 18492738 | https://seatgeek.com/missio-tickets/cleveland-ohio-cambridge-room-at-house-of-blues-cleveland-1-2027-01-17-7-pm/concert/18492738 | - |
| tm-stella-lefty-2027-boston-vv168vp7y-kz7ukua | stella-lefty | verify (applied) | 18527914 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-01-17-8-pm/concert/18527914 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | olivia-rodrigo | verify (applied) | 18211731 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-17-7-pm/concert/18211731 | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrjdss | stella-lefty | verify (applied) | 18527915 | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-19-7-pm/concert/18527915 | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | death-cab-for-cutie | verify (applied) | 18603599 | https://seatgeek.com/death-cab-for-cutie-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2027-01-19-8-pm/concert/18603599 | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrqdsw | stella-lefty | verify (applied) | 18539681 | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-20-7-pm/concert/18539681 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | olivia-rodrigo | verify (applied) | 18224991 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-20-7-pm/concert/18224991 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | santana | verify (applied) | 18628819 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-20-7-pm/concert/18628819 | - |
| tm-dylan-scott-2027-detroit-vv1afzkfigkddz4or | dylan-scott | verify (applied) | 18600788 | https://seatgeek.com/dylan-scott-tickets/detroit-michigan-the-fillmore-detroit-2027-01-21-7-pm/concert/18600788 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | olivia-rodrigo | verify (applied) | 18224990 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-21-7-pm/concert/18224990 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | santana | verify (applied) | 18628820 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-21-7-pm/concert/18628820 | - |
| tm-dylan-scott-2027-grand-rapids-vv1afzkfigker90br | dylan-scott | verify (applied) | 18601437 | https://seatgeek.com/dylan-scott-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-01-22-7-pm/concert/18601437 | - |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | the-red-clay-strays | verify (applied) | 18639066 | https://seatgeek.com/the-red-clay-strays-tickets/raleigh-north-carolina-lenovo-center-2027-01-22-7-pm/concert/18639066 | - |
| tm-stella-lefty-2027-philadelphia-vv1aezkfkgkddxsrk | stella-lefty | verify (applied) | 18527883 | https://seatgeek.com/stella-lefty-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-01-22-8-pm/concert/18527883 | - |
| tm-alan-walker-2027-irving-vvg1yz_3nb2d-j | alan-walker | verify (applied) | 18591363 | https://seatgeek.com/alan-walker-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-01-22-7-pm/concert/18591363 | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | atmosphere | verify (applied) | 18609083 | https://seatgeek.com/atmosphere-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-01-22-6-45-pm/concert/18609083 | - |
| tm-hilary-duff-2027-vancouver-1aozko7gkervl69 | hilary-duff | verify (applied) | 18070273 | https://seatgeek.com/hilary-duff-tickets/vancouver-canada-rogers-arena-2027-01-22-7-30-pm/concert/18070273 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi | eagles | verify (applied) | 18421047 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-22-8-30-pm/concert/18421047 | - |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | the-red-clay-strays | verify (applied) | 18639067 | https://seatgeek.com/the-red-clay-strays-tickets/columbia-south-carolina-colonial-life-arena-2027-01-23-7-pm/concert/18639067 | - |
| tm-stella-lefty-2027-washington-1a4zkffgkdf8c-z | stella-lefty | verify (applied) | 18527882 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-anthem-dc-2027-01-23-8-pm/concert/18527882 | - |
| tm-alan-walker-2027-houston-g5diz_3no4w3_ | alan-walker | verify (applied) | 18591361 | https://seatgeek.com/alan-walker-tickets/houston-texas-713-music-hall-2027-01-23-7-pm/concert/18591361 | - |
| tm-tommy-emmanuel-2027-des-moines-vv1kbz_3jvg7w7g3 | tommy-emmanuel | verify (applied) | 18593545 | https://seatgeek.com/tommy-emmanuel-tickets/des-moines-iowa-hoyt-sherman-place-2027-01-23-7-30-pm/concert/18593545 | - |
| tm-dylan-scott-2027-waukee-1ae7z_3gkl2epqo | dylan-scott | verify (applied) | 18601543 | https://seatgeek.com/dylan-scott-tickets/waukee-iowa-vibrant-music-hall-2027-01-23-7-30-pm/concert/18601543 | - |
| tm-atmosphere-2027-bozeman-g5vzz_k6poibm | atmosphere | verify (applied) | 18609086 | https://seatgeek.com/atmosphere-tickets/bozeman-montana-the-elm-1-2027-01-23-7-pm/concert/18609086 | - |
| tm-daughtry-2027-pine-bluff-g5viz_kyugjqo | daughtry | verify (applied) | 18632893 | https://seatgeek.com/daughtry-tickets/pine-bluff-arkansas-saracen-casino-resort-2027-01-23-7-pm/concert/18632893 | - |
| tm-hilary-duff-2027-vancouver-1av7z_7gkuh7fot | hilary-duff | verify (applied) | 18081222 | https://seatgeek.com/hilary-duff-tickets/vancouver-canada-rogers-arena-2027-01-23-7-30-pm/concert/18081222 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | santana | verify (applied) | 18628821 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-23-7-pm/concert/18628821 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpt2sm | eagles | verify (applied) | 18421046 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-23-8-30-pm/concert/18421046 | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | tommy-emmanuel | verify (applied) | 18593679 | https://seatgeek.com/tommy-emmanuel-tickets/madison-wisconsin-barrymore-theatre-madison-2027-01-24-8-pm/concert/18593679 | - |
| tm-atmosphere-2027-spokane-g5vzz_kkyknfe | atmosphere | verify (applied) | 18609085 | https://seatgeek.com/atmosphere-tickets/spokane-washington-knitting-factory-spokane-2027-01-24-6-45-pm/concert/18609085 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | olivia-rodrigo | verify (applied) | 18225825 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-24-7-pm/concert/18225825 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | santana | verify (applied) | 18628822 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-24-7-pm/concert/18628822 | - |
| tm-stella-lefty-2027-charlotte-g5evz_o9kpb3z | stella-lefty | verify (applied) | 18527884 | https://seatgeek.com/stella-lefty-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-01-25-8-pm/concert/18527884 | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | tommy-emmanuel | verify (applied) | 18594247 | https://seatgeek.com/tommy-emmanuel-tickets/skokie-illinois-north-shore-center-for-the-performing-arts-van-dusen-theatre-2027-01-25-7-30-pm/concert/18594247 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | olivia-rodrigo | verify (applied) | 18227093 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-25-7-pm/concert/18227093 | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | stella-lefty | verify (applied) | 18527886 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-01-26-8-pm/concert/18527886 | - |
| tm-atmosphere-2027-vancouver-1av7z_3gkx859iu | atmosphere | verify (applied) | 18609087 | https://seatgeek.com/atmosphere-tickets/vancouver-canada-commodore-ballroom-2027-01-26-6-pm/concert/18609087 | - |
| tm-hilary-duff-2027-calgary-1k78v0ojga2h3es | hilary-duff | verify (applied) | 18070275 | https://seatgeek.com/hilary-duff-tickets/calgary-canada-scotiabank-saddledome-2027-01-26-7-30-pm/concert/18070275 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_1bnjn8f | gracie-abrams | verify (applied) | 18270533 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-26-8-pm/concert/18270533 | - |
| tm-daughtry-2027-orlando-1kfovpgdga2huxq | daughtry | verify (applied) | 18632895 | https://seatgeek.com/daughtry-tickets/orlando-florida-hard-rock-live-orlando-2027-01-27-7-pm/concert/18632895 | - |
| tm-hilary-duff-2027-edmonton-1k78v0ooga1ytpq | hilary-duff | verify (applied) | 18070276 | https://seatgeek.com/hilary-duff-tickets/edmonton-canada-rogers-place-2027-01-27-7-30-pm/concert/18070276 | - |
| tm-simple-plan-2027-vancouver-16v7z_f1bg7wmex | simple-plan | verify (applied) | 18655536 | https://seatgeek.com/simple-plan-tickets/vancouver-canada-rogers-arena-2027-01-27-6-pm/concert/18655536 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | santana | verify (applied) | 18628823 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-27-7-pm/concert/18628823 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5rykvjn | gracie-abrams | verify (applied) | 18270531 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-27-8-pm/concert/18270531 | - |
| tm-tobymac-2027-fayetteville-g5evz_ojlfi-_ | tobymac | verify (applied) | 18543246 | https://seatgeek.com/tobymac-tickets/fayetteville-north-carolina-crown-coliseum-crown-complex-2027-01-28-7-pm/concert/18543246 | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | tommy-emmanuel | verify (applied) | 18594658 | https://seatgeek.com/tommy-emmanuel-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-28-7-pm/concert/18594658 | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | the-red-clay-strays | verify (applied) | 18639068 | https://seatgeek.com/the-red-clay-strays-tickets/rosemont-illinois-allstate-arena-2027-01-28-7-pm/concert/18639068 | - |
| tm-dylan-scott-2027-sioux-falls-vv17bz_3gkbn6kzm | dylan-scott | verify (applied) | 18601283 | https://seatgeek.com/dylan-scott-tickets/sioux-falls-south-dakota-sanford-pentagon-2027-01-28-7-30-pm/concert/18601283 | - |
| tm-stella-lefty-2027-dallas-vvg1yz_o8qf6xm | stella-lefty | verify (applied) | 18527887 | https://seatgeek.com/stella-lefty-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-01-28-8-pm/concert/18527887 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | olivia-rodrigo | verify (applied) | 18230500 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-28-7-pm/concert/18230500 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | santana | verify (applied) | 18628824 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-28-7-pm/concert/18628824 | - |
| tm-metallica-2027-las-vegas-1fayv0b_z4z7ggvk | metallica | verify (applied) | 18103479 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-01-28-8-30-pm/concert/18103479 | - |
| tm-tobymac-2027-lexington-1apzkfbgker-a4j | tobymac | verify (applied) | 18542763 | https://seatgeek.com/tobymac-tickets/lexington-kentucky-rupp-arena-2027-01-29-7-pm/concert/18542763 | - |
| tm-andrea-bocelli-2027-charlotte-g5evz_8mutuyo | andrea-bocelli | verify (applied) | 18581438 | https://seatgeek.com/andrea-bocelli-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-01-29-8-pm/concert/18581438 | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | the-red-clay-strays | verify (applied) | 18639069 | https://seatgeek.com/the-red-clay-strays-tickets/saint-louis-missouri-enterprise-center-2027-01-29-7-pm/concert/18639069 | - |
| tm-simple-plan-2027-edmonton-1av7z_kgkmptc0p | simple-plan | verify (applied) | 18656777 | https://seatgeek.com/simple-plan-tickets/edmonton-canada-rogers-place-2027-01-29-6-pm/concert/18656777 | - |
| tm-hilary-duff-2027-saskatoon-1k78v0fmgaungny | hilary-duff | verify (applied) | 18085160 | https://seatgeek.com/hilary-duff-tickets/saskatoon-canada-sasktel-centre-2027-01-29-7-30-pm/concert/18085160 | - |
| tm-koe-wetzel-2027-durant-vvg1yz_4wsdj6f | koe-wetzel | verify (applied) | 18738802 | https://seatgeek.com/koe-wetzel-tickets/durant-oklahoma-choctaw-grand-theater-2027-01-29-7-30-pm/concert/18738802 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | olivia-rodrigo | verify (applied) | 18230501 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-29-7-pm/concert/18230501 | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | atmosphere | verify (applied) | 18609092 | https://seatgeek.com/atmosphere-tickets/reno-nevada-grand-sierra-resort-2027-01-29-7-pm/concert/18609092 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5ry97ef | gracie-abrams | verify (applied) | 18270535 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-29-8-pm/concert/18270535 | - |
| tm-alan-walker-2027-raleigh-g5evz_31nnqnu | alan-walker | verify (applied) | 18590678 | https://seatgeek.com/alan-walker-tickets/raleigh-north-carolina-the-ritz-raleigh-2027-01-30-6-pm/concert/18590678 | - |
| tm-hilary-duff-2027-winnipeg-1av7z_7gknwgxan | hilary-duff | verify (applied) | 18070916 | https://seatgeek.com/hilary-duff-tickets/winnipeg-canada-canada-life-centre-2027-01-30-7-30-pm/concert/18070916 | - |
| tm-stella-lefty-2027-houston-g5diz_opbsxqh | stella-lefty | verify (applied) | 18527885 | https://seatgeek.com/stella-lefty-tickets/houston-texas-house-of-blues-houston-2027-01-30-7-pm/concert/18527885 | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | tobymac | verify (applied) | 18542844 | https://seatgeek.com/tobymac-tickets/huntsville-alabama-propst-arena-at-the-von-braun-center-2027-01-30-7-pm/concert/18542844 | - |
| tm-dylan-scott-2027-rochester-vv17bz_3gklxuys_ | dylan-scott | verify (applied) | 18601170 | https://seatgeek.com/dylan-scott-tickets/rochester-minnesota-mayo-civic-center-auditorium-2-2027-01-30-7-30-pm/concert/18601170 | - |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | daughtry | verify (applied) | 18632898 | https://seatgeek.com/daughtry-tickets/biloxi-mississippi-hard-rock-hotel-casino-biloxi-2027-01-30-7-pm/concert/18632898 | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | blue-october | verify (applied) | 18238718 | https://seatgeek.com/blue-october-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-01-30-8-pm/concert/18238718 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | santana | verify (applied) | 18628831 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-30-7-pm/concert/18628831 | - |
| tm-cristian-castro-2027-west-valley-city-g5vzz_aklolqq | cristian-castro | verify (applied) | 18091097 | https://seatgeek.com/cristian-castro-tickets/west-valley-city-utah-maverik-center-2027-01-30-8-pm/concert/18091097 | - |
| tm-metallica-2027-las-vegas-16vjz_kk3g7ndxr | metallica | verify (applied) | 18103478 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-01-30-8-30-pm/concert/18103478 | - |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | tobymac | verify (applied) | 18542726 | https://seatgeek.com/tobymac-tickets/lafayette-louisiana-cajundome-2027-01-31-6-30-pm/concert/18542726 | - |
| tm-andrea-bocelli-2027-baltimore-1a4zkffgkepsf12 | andrea-bocelli | verify (applied) | 18581441 | https://seatgeek.com/andrea-bocelli-tickets/baltimore-maryland-cfg-bank-arena-2027-01-31-8-pm/concert/18581441 | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | alan-walker | verify (applied) | 18590337 | https://seatgeek.com/alan-walker-tickets/charleston-south-carolina-charleston-music-hall-2027-01-31-8-pm/concert/18590337 | - |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | the-red-clay-strays | verify (applied) | 18639070 | https://seatgeek.com/the-red-clay-strays-tickets/omaha-nebraska-chi-health-center-omaha-2027-01-31-7-pm/concert/18639070 | - |
| tm-daughtry-2027-houston-g5diz_kxwqqcm | daughtry | verify (applied) | 18632897 | https://seatgeek.com/daughtry-tickets/houston-texas-bayou-music-center-2027-01-31-8-pm/concert/18632897 | - |
| tm-simple-plan-2027-calgary-1av7z_kgkd2pi5n | simple-plan | verify (applied) | 18655725 | https://seatgeek.com/simple-plan-tickets/calgary-canada-scotiabank-saddledome-2027-01-31-6-pm/concert/18655725 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | santana | verify (applied) | 18628832 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-31-7-pm/concert/18628832 | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byq5cg | gracie-abrams | verify (applied) | 18270537 | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-01-31-8-pm/concert/18270537 | - |
| tm-chelsea-cutler-2027-charleston-g5evz_kbudulq | chelsea-cutler | verify (applied) | 18639170 | https://seatgeek.com/chelsea-cutler-tickets/charleston-south-carolina-charleston-music-hall-2027-02-01-8-pm/concert/18639170 | - |
| tm-simple-plan-2027-saskatoon-1av7z_kgkmkzc1- | simple-plan | verify (applied) | 18655541 | https://seatgeek.com/simple-plan-tickets/saskatoon-canada-sasktel-centre-2027-02-01-7-pm/concert/18655541 | - |
| tm-atmosphere-2027-tucson-1kk8vpgiga2ka3q | atmosphere | verify (applied) | 18609097 | https://seatgeek.com/atmosphere-tickets/tucson-arizona-rialto-theatre-2027-02-01-8-pm/concert/18609097 | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byqdcd | gracie-abrams | verify (applied) | 18270540 | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-02-01-8-pm/concert/18270540 | - |
| tm-simple-plan-2027-winnipeg-16ozk4eozza27k28 | simple-plan | verify (applied) | 18655545 | https://seatgeek.com/simple-plan-tickets/winnipeg-canada-canada-life-centre-2027-02-02-7-pm/concert/18655545 | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | hilary-duff | verify (applied) | 18070282 | https://seatgeek.com/hilary-duff-tickets/hamilton-canada-td-coliseum-2027-02-02-7-30-pm/concert/18070282 | - |
| tm-andrea-bocelli-2027-atlanta-vvg1zz_36bbobm | andrea-bocelli | verify (applied) | 18581439 | https://seatgeek.com/andrea-bocelli-tickets/atlanta-georgia-state-farm-arena-1-2027-02-02-8-pm/concert/18581439 | - |
| tm-daughtry-2027-corpus-christi-g5diz_kxutltw | daughtry | verify (applied) | 18632905 | https://seatgeek.com/daughtry-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2027-02-02-7-pm/concert/18632905 | - |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | greta-van-fleet | verify (applied) | 18641948 | https://seatgeek.com/greta-van-fleet-tickets/savannah-georgia-enmarket-arena-2027-02-03-7-pm/concert/18641948 | - |
| tm-don-omar-2027-denver-g5vzz_u2hqxbt | don-omar | verify (applied) | 18325121 | https://seatgeek.com/don-omar-tickets/denver-colorado-ball-arena-2027-02-03-8-pm/concert/18325121 | - |
| tm-blue-october-2027-tucson-17k8v0g61r3fg2b | blue-october | verify (applied) | 18238924 | https://seatgeek.com/blue-october-tickets/tucson-arizona-rialto-theatre-2027-02-03-8-pm/concert/18238924 | - |
| tm-tobymac-2027-tampa-vvg1vz_oe_5n5h | tobymac | verify (applied) | 18542762 | https://seatgeek.com/tobymac-tickets/tampa-florida-benchmark-international-arena-2027-02-04-7-pm/concert/18542762 | - |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | hilary-duff | verify (applied) | 18070284 | https://seatgeek.com/hilary-duff-tickets/kanata-canada-canadian-tire-centre-2027-02-04-7-30-pm/concert/18070284 | - |
| tm-dylan-scott-2027-philadelphia-vv17fz_3gklnt6ea | dylan-scott | verify (applied) | 18601370 | https://seatgeek.com/dylan-scott-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-04-7-30-pm/concert/18601370 | - |
| tm-atmosphere-2027-kansas-city-vv11bz_k7z0sqj | atmosphere | verify (applied) | 18609098 | https://seatgeek.com/atmosphere-tickets/kansas-city-missouri-voodoo-lounge-at-harrah-s-casino-north-kansas-city-2027-02-04-7-pm/concert/18609098 | - |
| tm-andrea-bocelli-2027-austin-g5diz_3kpl_-e | andrea-bocelli | verify (applied) | 18581440 | https://seatgeek.com/andrea-bocelli-tickets/austin-texas-moody-center-atx-2027-02-04-8-pm/concert/18581440 | - |
| tm-yuridia-2027-seattle-vvg1hz_36ea3aq | yuridia | verify (applied) | 18570382 | https://seatgeek.com/yuridia-tickets/seattle-washington-paramount-theatre-wa-2027-02-04-8-pm/concert/18570382 | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0yct0 | metallica | verify (applied) | 18108442 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-04-8-30-pm/concert/18108442 | - |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | the-red-clay-strays | verify (applied) | 18639071 | https://seatgeek.com/the-red-clay-strays-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-05-7-pm/concert/18639071 | - |
| tm-greta-van-fleet-2027-tampa-vvg1vz_kmcwtil | greta-van-fleet | verify (applied) | 18641947 | https://seatgeek.com/greta-van-fleet-tickets/tampa-florida-benchmark-international-arena-2027-02-05-7-pm/concert/18641947 | - |
| tm-simple-plan-2027-toronto-1a8zk4e0eqizeug | simple-plan | verify (applied) | 18655543 | https://seatgeek.com/simple-plan-tickets/toronto-canada-scotiabank-arena-2027-02-05-7-pm/concert/18655543 | - |
| tm-hilary-duff-2027-montreal-1aszkoagkeug7uo | hilary-duff | verify (applied) | 18070286 | https://seatgeek.com/hilary-duff-tickets/montreal-canada-centre-bell-2027-02-05-7-30-pm/concert/18070286 | - |
| tm-dylan-scott-2027-wallingford-g5vvz_3ekjcji | dylan-scott | verify (applied) | 18600781 | https://seatgeek.com/dylan-scott-tickets/wallingford-connecticut-toyota-oakdale-theatre-2027-02-05-7-30-pm/concert/18600781 | - |
| tm-billy-strings-2027-asheville-g5evz_omwlh3- | billy-strings | verify (applied) | 18540081 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-05-7-30-pm/concert/18540081 | - |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | atmosphere | verify (applied) | 18609099 | https://seatgeek.com/atmosphere-tickets/joliet-illinois-hollywood-casino-15-2027-02-05-6-45-pm/concert/18609099 | - |
| tm-valley-2027-montreal-1ad7z_3gkblokhd | valley | verify (applied) | 18606379 | https://seatgeek.com/valley-tickets/montreal-canada-le-studio-td-2027-02-05-8-pm/concert/18606379 | - |
| tm-fantasia-2027-washington-1ka8vpuogaub0mr | fantasia | verify (applied) | 18629248 | https://seatgeek.com/fantasia-tickets/washington-district-of-columbia-capital-one-arena-2027-02-05-8-pm/concert/18629248 | - |
| tm-chelsea-cutler-2027-charlotte-g5evz_kukxezh | chelsea-cutler | verify (applied) | 18639172 | https://seatgeek.com/chelsea-cutler-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-02-05-8-pm/concert/18639172 | - |
| tm-andrea-bocelli-2027-dallas-vvg1yz_33_tj3c | andrea-bocelli | verify (applied) | 18581442 | https://seatgeek.com/andrea-bocelli-tickets/dallas-texas-american-airlines-center-2027-02-05-8-pm/concert/18581442 | - |
| tm-polyphia-2027-phoenix-16_zkf_ofzag77fu | polyphia | verify (applied) | 18536014 | https://seatgeek.com/polyphia-tickets/phoenix-arizona-arizona-financial-theatre-2027-02-05-7-30-pm/concert/18536014 | - |
| tm-blue-october-2027-phoenix-17k8v0g61lto1cb | blue-october | verify (applied) | 18239521 | https://seatgeek.com/blue-october-tickets/phoenix-arizona-the-van-buren-2027-02-05-8-pm/concert/18239521 | - |
| tm-don-omar-2027-sacramento-g5vyz_u1sfm0b | don-omar | verify (applied) | 18326389 | https://seatgeek.com/don-omar-tickets/sacramento-california-golden-1-center-2027-02-05-8-pm/concert/18326389 | - |
| tm-nickelback-2027-pittsburgh-1apzk4agkenjp68 | nickelback | verify (applied) | 18664575 | https://seatgeek.com/nickelback-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-02-06-6-30-pm/concert/18664575 | - |
| tm-tobymac-2027-orlando-1axzkf_gkdtkgpv | tobymac | verify (applied) | 18542768 | https://seatgeek.com/tobymac-tickets/orlando-florida-kia-center-2027-02-06-7-pm/concert/18542768 | - |
| tm-atmosphere-2027-rockford-1ae7z_3gkl5agu0 | atmosphere | verify (applied) | 18609101 | https://seatgeek.com/atmosphere-tickets/rockford-illinois-hard-rock-live-rockford-2027-02-06-6-pm/concert/18609101 | - |
| tm-valley-2027-ottawa-1ad7z_3gkv11nuz | valley | verify (applied) | 18606169 | https://seatgeek.com/valley-tickets/ottawa-canada-bronson-centre-2027-02-06-7-pm/concert/18606169 | - |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | chelsea-cutler | verify (applied) | 18639173 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-06-8-pm/concert/18639173 | - |
| tm-greta-van-fleet-2027-jacksonville-1aefz_kgkdyuafx | greta-van-fleet | verify (applied) | 18641952 | https://seatgeek.com/greta-van-fleet-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-06-7-pm/concert/18641952 | - |
| tm-simple-plan-2027-kitchener-1a8zk4agketqbtj | simple-plan | verify (applied) | 18655730 | https://seatgeek.com/simple-plan-tickets/kitchener-canada-kitchener-memorial-auditorium-complex-2027-02-06-7-pm/concert/18655730 | - |
| tm-billy-strings-2027-asheville-g5evz_omwig3e | billy-strings | verify (applied) | 18540082 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-06-7-30-pm/concert/18540082 | - |
| tm-alan-walker-2027-washington-1a4zkftgkdat1lk | alan-walker | verify (applied) | 18591378 | https://seatgeek.com/alan-walker-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-06-8-pm/concert/18591378 | - |
| tm-dylan-scott-2027-boston-vv1avzkftgkeyygcg | dylan-scott | verify (applied) | 18601525 | https://seatgeek.com/dylan-scott-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-06-8-pm/concert/18601525 | - |
| tm-fantasia-2027-norfolk-vv1avzkfmgkdn5kye | fantasia | verify (applied) | 18629319 | https://seatgeek.com/fantasia-tickets/norfolk-virginia-scope-arena-1-2027-02-06-8-pm/concert/18629319 | - |
| tm-polyphia-2027-las-vegas-169zkfppazau15va | polyphia | verify (applied) | 18536013 | https://seatgeek.com/polyphia-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-02-06-6-30-pm/concert/18536013 | - |
| tm-blue-october-2027-phoenix-17k8v0g61ltk12k | blue-october | verify (applied) | 18239522 | https://seatgeek.com/blue-october-tickets/phoenix-arizona-the-van-buren-2027-02-06-8-pm/concert/18239522 | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | yuridia | verify (applied) | 18570383 | https://seatgeek.com/yuridia-tickets/reno-nevada-grand-sierra-resort-2027-02-06-8-pm/concert/18570383 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6s | metallica | verify (applied) | 18108444 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-06-8-30-pm/concert/18108444 | - |
| tm-tobymac-2027-estero-vvg1vz_onusnh8 | tobymac | verify (applied) | 18542782 | https://seatgeek.com/tobymac-tickets/estero-florida-hertz-arena-2027-02-07-6-30-pm/concert/18542782 | - |
| tm-hilary-duff-2027-halifax-1ad7z_7gkm3f7fo | hilary-duff | verify (applied) | 18070285 | https://seatgeek.com/hilary-duff-tickets/halifax-canada-scotiabank-centre-2027-02-07-7-30-pm/concert/18070285 | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | chelsea-cutler | verify (applied) | 18639180 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-07-7-pm/concert/18639180 | - |
| tm-simple-plan-2027-london-1f7zvp8wqzz7ufv6 | simple-plan | verify (applied) | 18655528 | https://seatgeek.com/simple-plan-tickets/london-canada-canada-life-place-2027-02-07-7-pm/concert/18655528 | - |
| tm-blue-october-2027-los-angeles-vvg10z_1ri5jq_ | blue-october | verify (applied) | 18238353 | https://seatgeek.com/blue-october-tickets/los-angeles-california-the-wiltern-2027-02-07-7-pm/concert/18238353 | - |
| tm-dropkick-murphys-2027-del-mar-rz7hnez1afgypv | dropkick-murphys | verify (applied) | 18633526 | https://seatgeek.com/dropkick-murphys-tickets/del-mar-california-the-sound-del-mar-2027-02-07-7-pm/concert/18633526 | - |
| tm-don-omar-2027-seattle-vvg1hz_u4jzxck | don-omar | verify (applied) | 18325125 | https://seatgeek.com/don-omar-tickets/seattle-washington-climate-pledge-arena-2027-02-07-8-pm/concert/18325125 | - |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | yuridia | verify (applied) | 18570385 | https://seatgeek.com/yuridia-tickets/san-jose-california-sap-center-at-san-jose-2027-02-07-8-pm/concert/18570385 | - |
| tm-nickelback-2027-allentown-15dzz_frakkqv | nickelback | verify (applied) | 18664577 | https://seatgeek.com/nickelback-tickets/allentown-pennsylvania-ppl-center-2027-02-08-6-30-pm/concert/18664577 | - |
| tm-billy-strings-2027-asheville-g5evz_omwii3v | billy-strings | verify (applied) | 18540084 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-08-7-30-pm/concert/18540084 | - |
| tm-daughtry-2027-sacramento-g5vyz_k60xnfe | daughtry | verify (applied) | 18632909 | https://seatgeek.com/daughtry-tickets/sacramento-channel-24-sacramento-2027-02-08-7-pm/concert/18632909 | - |
| tm-greta-van-fleet-2027-atlanta-vvg1zz_kmneaip | greta-van-fleet | verify (applied) | 18641951 | https://seatgeek.com/greta-van-fleet-tickets/atlanta-georgia-state-farm-arena-1-2027-02-09-7-pm/concert/18641951 | - |
| tm-simple-plan-2027-kingston-1a8zk4vgkdbqsjy | simple-plan | verify (applied) | 18655727 | https://seatgeek.com/simple-plan-tickets/kingston-canada-slush-puppie-place-2027-02-09-7-pm/concert/18655727 | - |
| tm-billy-strings-2027-asheville-g5evz_omwcg3b | billy-strings | verify (applied) | 18540083 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-09-7-30-pm/concert/18540083 | - |
| tm-alan-walker-2027-philadelphia-vv1aezkfxgkdmhfsx | alan-walker | verify (applied) | 18591283 | https://seatgeek.com/alan-walker-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-09-8-pm/concert/18591283 | - |
| tm-stella-lefty-2027-san-francisco-g5vyz_ok5hlnw | stella-lefty | verify (applied) | 18527894 | https://seatgeek.com/stella-lefty-tickets/san-francisco-california-the-masonic-san-francisco-2027-02-09-8-pm/concert/18527894 | - |
| tm-nickelback-2027-grand-rapids-vv1afzk4agkd4fpse | nickelback | verify (applied) | 18664576 | https://seatgeek.com/nickelback-tickets/grand-rapids-michigan-van-andel-arena-2027-02-10-6-30-pm/concert/18664576 | - |
| tm-pink-martini-2027-cleveland-vvg1fz_uzuo2ng | pink-martini | verify (applied) | 18358276 | https://seatgeek.com/pink-martini-tickets/cleveland-ohio-gartner-auditorium-2027-02-10-7-pm/concert/18358276 | - |
| tm-alan-walker-2027-boston-vv1a8vpfzgauaajv | alan-walker | verify (applied) | 18591763 | https://seatgeek.com/alan-walker-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-10-7-pm/concert/18591763 | - |
| tm-valley-2027-london-1avzz_3gktpgnuv | valley | verify (applied) | 18606118 | https://seatgeek.com/valley-tickets/london-canada-london-music-hall-2027-02-10-7-pm/concert/18606118 | - |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | the-lemonheads | verify (applied) | 18593831 | https://seatgeek.com/the-lemonheads-tickets/boston-massachusetts-brighton-music-hall-2027-02-10-7-30-pm/concert/18593831 | - |
| tm-andrea-bocelli-2027-orlando-1axzkfigkdrsgpw | andrea-bocelli | verify (applied) | 18581443 | https://seatgeek.com/andrea-bocelli-tickets/orlando-florida-kia-center-2027-02-10-8-pm/concert/18581443 | - |
| tm-chelsea-cutler-2027-philadelphia-vv1aovpuygauryej | chelsea-cutler | verify (applied) | 18639181 | https://seatgeek.com/chelsea-cutler-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-10-8-pm/concert/18639181 | - |
| tm-greta-van-fleet-2027-nashville-g5viz_kzhjzwy | greta-van-fleet | verify (applied) | 18641949 | https://seatgeek.com/greta-van-fleet-tickets/nashville-tennessee-bridgestone-arena-2027-02-10-7-pm/concert/18641949 | - |
| tm-daughtry-2027-denver-g5vzz_knzyqbr | daughtry | verify (applied) | 18632910 | https://seatgeek.com/daughtry-tickets/denver-colorado-paramount-theatre-co-2027-02-10-7-pm/concert/18632910 | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | olivia-rodrigo | verify (applied) | 18211656 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-11-7-pm/concert/18211656 | - |
| tm-the-red-clay-strays-2027-charleston-1avbz_kgkb6hkqy | the-red-clay-strays | verify (applied) | 18639078 | https://seatgeek.com/the-red-clay-strays-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2027-02-11-7-pm/concert/18639078 | - |
| tm-simple-plan-2027-kanata-1ad7z_kgkb3adut | simple-plan | verify (applied) | 18655548 | https://seatgeek.com/simple-plan-tickets/kanata-canada-canadian-tire-centre-2027-02-11-7-pm/concert/18655548 | - |
| tm-tobymac-2027-pensacola-g5viz_o9zokbz | tobymac | verify (applied) | 18542754 | https://seatgeek.com/tobymac-tickets/pensacola-florida-pensacola-bay-center-2027-02-11-7-pm/concert/18542754 | - |
| tm-the-lemonheads-2027-brooklyn-k7vgf_3rtiqkk | the-lemonheads | verify (applied) | 18593930 | https://seatgeek.com/the-lemonheads-tickets/brooklyn-new-york-brooklyn-bowl-ny-2027-02-11-8-pm/concert/18593930 | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5lj2s | boyz-ii-men | verify (applied) | 18697996 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-11-8-pm/concert/18697996 | - |
| tm-gracie-abrams-2027-chicago-vv1fvzv0pycdz72ag6 | gracie-abrams | verify (applied) | 18270541 | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-11-8-pm/concert/18270541 | - |
| tm-polyphia-2027-anaheim-vvg10z_gea9xhx | polyphia | verify (applied) | 18312311 | https://seatgeek.com/polyphia-tickets/anaheim-california-house-of-blues-anaheim-2027-02-11-6-30-pm/concert/18312311 | - |
| tm-don-omar-2027-fresno-g5vyz_u5k7ws7 | don-omar | verify (applied) | 18325133 | https://seatgeek.com/don-omar-tickets/fresno-california-save-mart-center-2027-02-11-8-pm/concert/18325133 | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | blue-october | verify (applied) | 18239347 | https://seatgeek.com/blue-october-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-11-8-pm/concert/18239347 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | olivia-rodrigo | verify (applied) | 18211659 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-12-7-pm/concert/18211659 | - |
| tm-meshuggah-2027-toronto-1a8zk4fgkepjpte | meshuggah | verify (applied) | 18724635 | https://seatgeek.com/meshuggah-tickets/toronto-canada-coca-cola-coliseum-2027-02-12-7-pm/concert/18724635 | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3nv0vjm | andrea-bocelli | verify (applied) | 18581450 | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-12-8-pm/concert/18581450 | - |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | fantasia | verify (applied) | 18632088 | https://seatgeek.com/fantasia-tickets/elmont-new-york-ubs-arena-2027-02-12-8-pm/concert/18632088 | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | daughtry | verify (applied) | 18632912 | https://seatgeek.com/daughtry-tickets/durant-oklahoma-choctaw-grand-theater-2027-02-12-7-pm/concert/18632912 | - |
| tm-greta-van-fleet-2027-rosemont-vv178z_kgkmrjctr | greta-van-fleet | verify (applied) | 18641950 | https://seatgeek.com/greta-van-fleet-tickets/rosemont-illinois-allstate-arena-2027-02-12-7-pm/concert/18641950 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | backstreet-boys | verify (applied) | 18642041 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-12-8-pm/concert/18642041 | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5ij2m | boyz-ii-men | verify (applied) | 18697998 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-12-8-pm/concert/18697998 | - |
| tm-gracie-abrams-2027-chicago-vvg18z_5rd-dah | gracie-abrams | verify (applied) | 18270544 | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-12-8-pm/concert/18270544 | - |
| tm-los-tigres-del-norte-2027-oklahoma-city-vvg1yz_f5olqqc | los-tigres-del-norte | verify (applied) | 18738645 | https://seatgeek.com/los-tigres-del-norte-tickets/oklahoma-city-oklahoma-paycom-center-2027-02-12-8-pm/concert/18738645 | - |
| tm-stella-lefty-2027-salt-lake-city-g5vzz_okzttv5 | stella-lefty | verify (applied) | 18527918 | https://seatgeek.com/stella-lefty-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-02-12-8-pm/concert/18527918 | - |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | flans | verify (applied) | 18612856 | https://seatgeek.com/flans-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-02-12-8-pm/concert/18612856 | - |
| tm-los-tucanes-de-tijuana-2027-glendale-17k8v0g62nuo9-m | los-tucanes-de-tijuana | verify (applied) | 18405269 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/glendale-arizona-desert-diamond-arena-2027-02-12-8-pm/concert/18405269 | - |
| tm-don-omar-2027-inglewood-vvg10z_u2a3ul3 | don-omar | verify (applied) | 18326622 | https://seatgeek.com/don-omar-tickets/inglewood-california-intuit-dome-2027-02-12-8-pm/concert/18326622 | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | verify (applied) | 18653247 | https://seatgeek.com/blue-october-tickets/ventura-california-the-majestic-ventura-theater-2027-02-12-8-pm/concert/18653247 | - |
| tm-cristian-castro-2027-anaheim-vv1aazkofgkeidrym | cristian-castro | verify (applied) | 18091093 | https://seatgeek.com/cristian-castro-tickets/anaheim-california-honda-center-2027-02-12-8-pm/concert/18091093 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcrlvv | marc-anthony | verify (applied) | 18608820 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-12-9-pm/concert/18608820 | - |
| tm-nickelback-2027-columbus-vv1aazk4agkduqw0h | nickelback | verify (applied) | 18664574 | https://seatgeek.com/nickelback-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-02-13-6-30-pm/concert/18664574 | - |
| tm-meshuggah-2027-laval-1aszk4fgkdtnr8- | meshuggah | verify (applied) | 18724636 | https://seatgeek.com/meshuggah-tickets/laval-canada-place-bell-2027-02-13-7-pm/concert/18724636 | - |
| tm-billy-strings-2027-duluth-vvg1zz_ointe8l | billy-strings | verify (applied) | 18540092 | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-13-7-30-pm/concert/18540092 | - |
| tm-missio-2027-philadelphia-vv17fz_8gkn83pvw | missio | verify (applied) | 18492961 | https://seatgeek.com/missio-tickets/philadelphia-pennsylvania-the-foundry-philadelphia-2027-02-13-8-pm/concert/18492961 | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3ervkx7 | andrea-bocelli | verify (applied) | 18581451 | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-13-8-pm/concert/18581451 | - |
| tm-fantasia-2027-atlantic-city-vv1aezkfmgkegjgo6 | fantasia | verify (applied) | 18629442 | https://seatgeek.com/fantasia-tickets/atlantic-city-new-jersey-boardwalk-hall-2027-02-13-8-pm/concert/18629442 | - |
| tm-greta-van-fleet-2027-omaha-vv17bz_kgkmgzcnp | greta-van-fleet | verify (applied) | 18641959 | https://seatgeek.com/greta-van-fleet-tickets/omaha-nebraska-chi-health-center-omaha-2027-02-13-7-pm/concert/18641959 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | backstreet-boys | verify (applied) | 18642039 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-13-8-pm/concert/18642039 | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t | boyz-ii-men | verify (applied) | 18687410 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-13-8-pm/concert/18687410 | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | stella-lefty | verify (applied) | 18527897 | https://seatgeek.com/stella-lefty-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-13-7-pm/concert/18527897 | - |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkes0irs | pink-martini | verify (applied) | 18472526 | https://seatgeek.com/pink-martini-tickets/minneapolis-minnesota-pantages-theatre-minneapolis-2027-02-13-8-pm/concert/18472526 | - |
| tm-blue-october-2027-las-vegas-17ayv0g61ppuqbc | blue-october | verify (applied) | 18239352 | https://seatgeek.com/blue-october-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2027-02-13-7-pm/concert/18239352 | - |
| tm-yuridia-2027-phoenix-1a_zkfxgkecvpec | yuridia | verify (applied) | 18570386 | https://seatgeek.com/yuridia-tickets/phoenix-arizona-arizona-financial-theatre-2027-02-13-8-pm/concert/18570386 | - |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | flans | verify (applied) | 18612650 | https://seatgeek.com/flans-tickets/tucson-arizona-linda-ronstadt-music-hall-2027-02-13-8-pm/concert/18612650 | - |
| tm-air-supply-2027-rancho-mirage-vv1aazkffgkd9xjwx | air-supply | verify (applied) | 18533274 | https://seatgeek.com/air-supply-tickets/rancho-mirage-california-agua-caliente-casino-rancho-mirage-2027-02-13-8-pm/concert/18533274 | - |
| tm-los-tucanes-de-tijuana-2027-inglewood-vvg10z_udzwaf3 | los-tucanes-de-tijuana | verify (applied) | 18354983 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/inglewood-california-intuit-dome-2027-02-13-8-pm/concert/18354983 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslva | marc-anthony | verify (applied) | 18608822 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-13-9-pm/concert/18608822 | - |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkesphrg | pink-martini | verify (applied) | 18472525 | https://seatgeek.com/pink-martini-tickets/minneapolis-minnesota-pantages-theatre-minneapolis-2027-02-14-2-pm/concert/18472525 | - |
| tm-simple-plan-2027-moncton-1aszkfygkdcttvt | simple-plan | verify (applied) | 18656907 | https://seatgeek.com/simple-plan-tickets/moncton-canada-avenir-centre-2027-02-14-7-pm/concert/18656907 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | backstreet-boys | verify (applied) | 18652781 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-14-8-pm/concert/18652781 | - |
| tm-dropkick-murphys-2027-calgary-1k78vpuzga1a49u | dropkick-murphys | verify (applied) | 18633536 | https://seatgeek.com/dropkick-murphys-tickets/calgary-canada-grey-eagle-event-centre-2027-02-14-7-pm/concert/18633536 | - |
| tm-gracie-abrams-2027-nashville-g5viz_51oey1w | gracie-abrams | verify (applied) | 18270545 | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-14-8-pm/concert/18270545 | - |
| tm-polyphia-2027-san-francisco-g5vyz_gra3gjr | polyphia | verify (applied) | 18312310 | https://seatgeek.com/polyphia-tickets/san-francisco-california-the-masonic-san-francisco-2027-02-14-7-30-pm/concert/18312310 | - |
| tm-simple-plan-2027-sydney-1aszk4agkex2k4f | simple-plan | verify (applied) | 18656127 | https://seatgeek.com/simple-plan-tickets/sydney-canada-centre-200-2027-02-15-7-pm/concert/18656127 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | olivia-rodrigo | verify (applied) | 18211660 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-15-7-pm/concert/18211660 | - |
| tm-greta-van-fleet-2027-minneapolis-vv17bz_kgku0ofzs | greta-van-fleet | verify (applied) | 18641960 | https://seatgeek.com/greta-van-fleet-tickets/minneapolis-minnesota-target-center-2027-02-15-7-pm/concert/18641960 | - |
| tm-gracie-abrams-2027-nashville-g5viz_5rgv7ra | gracie-abrams | verify (applied) | 18270546 | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-15-8-pm/concert/18270546 | - |
| tm-simple-plan-2027-halifax-1ad7z_kgkmojy7e | simple-plan | verify (applied) | 18655677 | https://seatgeek.com/simple-plan-tickets/halifax-canada-scotiabank-centre-2027-02-16-7-pm/concert/18655677 | - |
| tm-nickelback-2027-indianapolis-vv1aazk4agkdzn6zd | nickelback | verify (applied) | 18664572 | https://seatgeek.com/nickelback-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-16-6-30-pm/concert/18664572 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | olivia-rodrigo | verify (applied) | 18211657 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-16-7-pm/concert/18211657 | - |
| tm-valley-2027-winnipeg-1av7z_3gkbokkjd | valley | verify (applied) | 18606405 | https://seatgeek.com/valley-tickets/winnipeg-canada-the-park-theatre-2027-02-16-7-pm/concert/18606405 | - |
| tm-chelsea-cutler-2027-toronto-1avzz_kgkstt7dw | chelsea-cutler | verify (applied) | 18639184 | https://seatgeek.com/chelsea-cutler-tickets/toronto-canada-history-2027-02-16-7-pm/concert/18639184 | - |
| tm-breaking-benjamin-2027-cedar-rapids-vv1akzk49gkd1-vah | breaking-benjamin | verify (applied) | 18742671 | https://seatgeek.com/breaking-benjamin-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2027-02-16-6-30-pm/concert/18742671 | - |
| tm-alan-walker-2027-montreal-1aszkfngkelr9-v | alan-walker | verify (applied) | 18590510 | https://seatgeek.com/alan-walker-tickets/montreal-canada-mtelus-2027-02-16-8-pm/concert/18590510 | - |
| tm-dinosaur-jr-2027-silver-spring-164zkf4pnzau65fa | dinosaur-jr | verify (applied) | 18540432 | https://seatgeek.com/dinosaur-jr-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-02-16-8-pm/concert/18540432 | - |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | daughtry | verify (applied) | 18632920 | https://seatgeek.com/daughtry-tickets/duluth-minnesota-decc-symphony-hall-2027-02-16-7-pm/concert/18632920 | - |
| tm-dropkick-murphys-2027-edmonton-1aozkfygkesdhkn | dropkick-murphys | verify (applied) | 18633539 | https://seatgeek.com/dropkick-murphys-tickets/edmonton-canada-edmonton-convention-centre-2027-02-16-7-pm/concert/18633539 | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | verify (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-meshuggah-2027-chicago-vv1a7zk49gkdpmbhc | meshuggah | verify (applied) | 18724638 | https://seatgeek.com/meshuggah-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-17-6-pm/concert/18724638 | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | don-omar | verify (applied) | 18325165 | https://seatgeek.com/don-omar-tickets/toronto-canada-scotiabank-arena-2027-02-17-8-pm/concert/18325165 | - |
| tm-alan-walker-2027-montreal-1aszkfngkely6-x | alan-walker | verify (applied) | 18684023 | https://seatgeek.com/alan-walker-tickets/montreal-canada-mtelus-2027-02-17-8-pm/concert/18684023 | - |
| tm-dropkick-murphys-2027-saskatoon-1aozkfmgke0_iup | dropkick-murphys | verify (applied) | 18633540 | https://seatgeek.com/dropkick-murphys-tickets/saskatoon-canada-sasktel-centre-2027-02-17-7-pm/concert/18633540 | - |
| tm-polyphia-2027-seattle-vvg1hz_oxmv1cx | polyphia | verify (applied) | 18536016 | https://seatgeek.com/polyphia-tickets/seattle-washington-paramount-theatre-wa-2027-02-17-7-30-pm/concert/18536016 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslvq | marc-anthony | verify (applied) | 18608838 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-17-9-pm/concert/18608838 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | alan-walker | verify (applied) | 18591555 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-18-6-pm/concert/18591555 | - |
| tm-tobymac-2027-columbus-vv1aazkfbgkdjr-4o | tobymac | verify (applied) | 18542766 | https://seatgeek.com/tobymac-tickets/columbus-ohio-nationwide-arena-2027-02-18-7-pm/concert/18542766 | - |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | chelsea-cutler | verify (applied) | 18639185 | https://seatgeek.com/chelsea-cutler-tickets/detroit-michigan-saint-andrews-hall-2027-02-18-7-pm/concert/18639185 | - |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkew6n6r | dropkick-murphys | verify (applied) | 18633542 | https://seatgeek.com/dropkick-murphys-tickets/winnipeg-canada-burton-cummings-theatre-2027-02-18-7-pm/concert/18633542 | - |
| tm-nickelback-2027-chicago-vv1a7zk4agkexo6el | nickelback | verify (applied) | 18664573 | https://seatgeek.com/nickelback-tickets/chicago-illinois-united-center-2027-02-18-6-30-pm/concert/18664573 | - |
| tm-gary-allan-2027-tysons-17a8v0g65hn_upy | gary-allan | verify (applied) | 18281788 | https://seatgeek.com/gary-allan-tickets/tysons-virginia-capital-one-hall-2027-02-18-7-30-pm/concert/18281788 | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | gracie-abrams | verify (applied) | 18270548 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-18-8-pm/concert/18270548 | - |
| tm-needtobreathe-2027-omaha-1aezz_kekbozdu2k | needtobreathe | verify (applied) | 18621525 | https://seatgeek.com/needtobreathe-tickets/omaha-nebraska-steelhouse-omaha-2027-02-18-7-pm/concert/18621525 | - |
| tm-air-supply-2027-abbotsford-1k78vp18gau9wma | air-supply | verify (applied) | 18593901 | https://seatgeek.com/air-supply-tickets/abbotsford-canada-rogers-forum-2027-02-18-7-30-pm/concert/18593901 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5kgq | barry-manilow | verify (applied) | 17637107 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-18-7-pm/concert/17637107 | - |
| tm-yuridia-2027-las-vegas-1ayzkfngkdql5vb | yuridia | verify (applied) | 18570391 | https://seatgeek.com/yuridia-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2027-02-18-8-pm/concert/18570391 | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0ywtn | metallica | verify (applied) | 18108446 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-18-8-30-pm/concert/18108446 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | alan-walker | verify (applied) | 18591553 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-19-6-pm/concert/18591553 | - |
| tm-breaking-benjamin-2027-fort-wayne-vv1aazk4pgkde48xz | breaking-benjamin | verify (applied) | 18742688 | https://seatgeek.com/breaking-benjamin-tickets/fort-wayne-indiana-allen-county-war-memorial-coliseum-2027-02-19-6-30-pm/concert/18742688 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | olivia-rodrigo | verify (applied) | 18224685 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-19-7-pm/concert/18224685 | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkd7dmjf | tobymac | verify (applied) | 18542848 | https://seatgeek.com/tobymac-tickets/fairfax-virginia-eaglebank-arena-2027-02-19-7-pm/concert/18542848 | - |
| tm-greta-van-fleet-2027-louisville-1avbz_kgkbymb5h | greta-van-fleet | verify (applied) | 18641962 | https://seatgeek.com/greta-van-fleet-tickets/louisville-kentucky-kfc-yum-center-2027-02-19-7-pm/concert/18641962 | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | verify (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkewfq6x | dropkick-murphys | verify (applied) | 18633545 | https://seatgeek.com/dropkick-murphys-tickets/winnipeg-canada-burton-cummings-theatre-2027-02-19-7-pm/concert/18633545 | - |
| tm-hans-zimmer-2027-belmont-park-1adzz_3gkmrvuzw | hans-zimmer | verify (applied) | 18601921 | https://seatgeek.com/hans-zimmer-tickets/elmont-new-york-ubs-arena-2027-02-19-7-30-pm/concert/18601921 | - |
| tm-gary-allan-2027-greensboro-g5evz_89x5mox | gary-allan | verify (applied) | 18449332 | https://seatgeek.com/gary-allan-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2027-02-19-7-30-pm/concert/18449332 | - |
| tm-gracie-abrams-2027-toronto-177zv0g65ic_clu | gracie-abrams | verify (applied) | 18270552 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-19-8-pm/concert/18270552 | - |
| tm-dylan-scott-2027-omaha-1aezz_3gknwydtt | dylan-scott | verify (applied) | 18601532 | https://seatgeek.com/dylan-scott-tickets/omaha-nebraska-steelhouse-omaha-2027-02-19-7-pm/concert/18601532 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7luql | backstreet-boys | verify (applied) | 18642040 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-19-8-pm/concert/18642040 | - |
| tm-cody-johnson-2027-austin-g5diz_43sxhzn | cody-johnson | verify (applied) | 18710054 | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-19-7-pm/concert/18710054 | - |
| tm-meshuggah-2027-minneapolis-vv1akzk44gkdfvhxa | meshuggah | verify (applied) | 18724640 | https://seatgeek.com/meshuggah-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-02-19-7-pm/concert/18724640 | - |
| tm-polyphia-2027-salt-lake-city-g5vzz_ojsblfw | polyphia | verify (applied) | 18312320 | https://seatgeek.com/polyphia-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-02-19-7-30-pm/concert/18312320 | - |
| tm-needtobreathe-2027-waukee-1ae7z_3gktpcjjf | needtobreathe | verify (applied) | 18621527 | https://seatgeek.com/needtobreathe-tickets/waukee-iowa-vibrant-music-hall-2027-02-19-7-30-pm/concert/18621527 | - |
| tm-fantasia-2027-new-orleans-g5viz_k6css2k | fantasia | verify (applied) | 18629243 | https://seatgeek.com/fantasia-tickets/new-orleans-louisiana-smoothie-king-center-2027-02-19-8-pm/concert/18629243 | - |
| tm-chelsea-cutler-2027-chicago-vv178z_kgks8xdpl | chelsea-cutler | verify (applied) | 18639192 | https://seatgeek.com/chelsea-cutler-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-19-8-pm/concert/18639192 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kgjhjj | blue-october | verify (applied) | 18261216 | https://seatgeek.com/blue-october-tickets/sacramento-channel-24-sacramento-2027-02-19-8-pm/concert/18261216 | - |
| tm-sylvan-esso-2027-seattle-vvg1hz_g92don0 | sylvan-esso | verify (applied) | 18299159 | https://seatgeek.com/sylvan-esso-tickets/seattle-washington-paramount-theatre-wa-2027-02-19-7-pm/concert/18299159 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5ugn | barry-manilow | verify (applied) | 17637109 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-19-8-pm/concert/17637109 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcglvg | marc-anthony | verify (applied) | 18608821 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-19-9-pm/concert/18608821 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwdwpi | olivia-rodrigo | verify (applied) | 18224992 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-20-7-pm/concert/18224992 | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkdgvwvn | tobymac | verify (applied) | 18542849 | https://seatgeek.com/tobymac-tickets/fairfax-virginia-eaglebank-arena-2027-02-20-7-pm/concert/18542849 | - |
| tm-daughtry-2027-rockford-16e7z_kkfg7v38v | daughtry | verify (applied) | 18632923 | https://seatgeek.com/daughtry-tickets/rockford-illinois-hard-rock-live-rockford-2027-02-20-7-pm/concert/18632923 | - |
| tm-greta-van-fleet-2027-pittsburgh-1avbz_kgkmosrsz | greta-van-fleet | verify (applied) | 18641964 | https://seatgeek.com/greta-van-fleet-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-02-20-7-pm/concert/18641964 | - |
| tm-the-lemonheads-2027-atlanta-vvg1zz_3rf_-sk | the-lemonheads | verify (applied) | 18593800 | https://seatgeek.com/the-lemonheads-tickets/atlanta-georgia-the-masquerade-hell-2027-02-20-7-30-pm/concert/18593800 | - |
| tm-nickelback-2027-saint-louis-vv1akzk4kgkdiwpu8 | nickelback | verify (applied) | 18664583 | https://seatgeek.com/nickelback-tickets/saint-louis-missouri-enterprise-center-2027-02-20-6-30-pm/concert/18664583 | - |
| tm-gary-allan-2027-spartanburg-g5evz_8fssjkd | gary-allan | verify (applied) | 18446298 | https://seatgeek.com/gary-allan-tickets/spartanburg-south-carolina-spartanburg-memorial-auditorium-2027-02-20-7-30-pm/concert/18446298 | - |
| tm-breaking-benjamin-2027-evansville-vv1aazk49gkengkxe | breaking-benjamin | verify (applied) | 18742693 | https://seatgeek.com/breaking-benjamin-tickets/evansville-indiana-ford-center-in-2027-02-20-6-30-pm/concert/18742693 | - |
| tm-needtobreathe-2027-minneapolis-vv1akzkfwgkdmqcn1 | needtobreathe | verify (applied) | 18621530 | https://seatgeek.com/needtobreathe-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-02-20-7-pm/concert/18621530 | - |
| tm-valley-2027-calgary-1av7z_3gkb3cpp6 | valley | verify (applied) | 18605986 | https://seatgeek.com/valley-tickets/calgary-canada-the-palace-theatre-calgary-2027-02-20-6-pm/concert/18605986 | - |
| tm-mico-2027-charlotte-g5evz_fqqay6k | mico | verify (applied) | 18667445 | https://seatgeek.com/mico-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-02-20-8-pm/concert/18667445 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ouqm | backstreet-boys | verify (applied) | 18642042 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-20-8-pm/concert/18642042 | - |
| tm-cody-johnson-2027-austin-g5diz_46xjfxh | cody-johnson | verify (applied) | 18701505 | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-20-7-pm/concert/18701505 | - |
| tm-polyphia-2027-denver-g5vzz_oe6fcei | polyphia | verify (applied) | 18312321 | https://seatgeek.com/polyphia-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-20-7-30-pm/concert/18312321 | - |
| tm-dylan-scott-2027-park-city-vv17bz_3gkmnbnzl | dylan-scott | verify (applied) | 18600816 | https://seatgeek.com/dylan-scott-tickets/park-city-kansas-heartland-credit-union-arena-2027-02-20-7-30-pm/concert/18600816 | - |
| tm-billy-strings-2027-nashville-g5viz_on5a9pr | billy-strings | verify (applied) | 18540094 | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-20-7-30-pm/concert/18540094 | - |
| tm-stella-lefty-2027-chicago-vv1a7zkf3ovc9zec5 | stella-lefty | verify (applied) | 18527904 | https://seatgeek.com/stella-lefty-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-20-8-pm/concert/18527904 | - |
| tm-fantasia-2027-biloxi-g5viz_kxokyjj | fantasia | verify (applied) | 18629249 | https://seatgeek.com/fantasia-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-02-20-8-pm/concert/18629249 | - |
| tm-los-tucanes-de-tijuana-2027-rosemont-vv1a7zkffgkdqp4jc | los-tucanes-de-tijuana | verify (applied) | 18472484 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/rosemont-illinois-rosemont-theatre-2027-02-20-8-pm/concert/18472484 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwupgi | barry-manilow | verify (applied) | 17637108 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-20-7-pm/concert/17637108 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kvkgjw | blue-october | verify (applied) | 18239942 | https://seatgeek.com/blue-october-tickets/sacramento-channel-24-sacramento-2027-02-20-8-pm/concert/18239942 | - |
| tm-yuridia-2027-inglewood-vvg1iz_3kmopkh | yuridia | verify (applied) | 18570397 | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-20-8-pm/concert/18570397 | - |
| tm-los-tigres-del-norte-2027-san-jose-g5vyz_k6cidvv | los-tigres-del-norte | verify (applied) | 18612557 | https://seatgeek.com/los-tigres-del-norte-tickets/san-jose-california-sap-center-at-san-jose-2027-02-20-8-pm/concert/18612557 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6g | metallica | verify (applied) | 18108448 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-20-8-30-pm/concert/18108448 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcmlvw | marc-anthony | verify (applied) | 18608827 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-20-9-pm/concert/18608827 | - |
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | alan-walker | verify (applied) | 18591884 | https://seatgeek.com/alan-walker-tickets/ottawa-canada-history-ottawa-2027-02-21-6-30-pm/concert/18591884 | - |
| tm-daughtry-2027-gary-vv1aazkfygkesuefr | daughtry | verify (applied) | 18632924 | https://seatgeek.com/daughtry-tickets/gary-indiana-hard-rock-live-northern-indiana-2027-02-21-6-pm/concert/18632924 | - |
| tm-hans-zimmer-2027-newark-vv1aezkfygkepjhre | hans-zimmer | verify (applied) | 18601919 | https://seatgeek.com/hans-zimmer-tickets/newark-new-jersey-prudential-center-2027-02-21-7-30-pm/concert/18601919 | - |
| tm-nickelback-2027-nashville-g5viz_frya27y | nickelback | verify (applied) | 18664585 | https://seatgeek.com/nickelback-tickets/nashville-tennessee-bridgestone-arena-2027-02-21-6-30-pm/concert/18664585 | - |
| tm-don-omar-2027-montreal-17g8v0g6ucxtixy | don-omar | verify (applied) | 18325136 | https://seatgeek.com/don-omar-tickets/montreal-canada-centre-bell-2027-02-21-8-pm/concert/18325136 | - |
| tm-needtobreathe-2027-duluth-vv1kbz_kekg7rpco | needtobreathe | verify (applied) | 18621526 | https://seatgeek.com/needtobreathe-tickets/duluth-minnesota-decc-symphony-hall-2027-02-21-7-pm/concert/18621526 | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | mico | verify (applied) | 18665962 | https://seatgeek.com/mico-tickets/charleston-south-carolina-charleston-music-hall-2027-02-21-8-pm/concert/18665962 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt | backstreet-boys | verify (applied) | 18652782 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-21-8-pm/concert/18652782 | - |
| tm-blue-october-2027-reno-17c8v0g61lh4py0 | blue-october | verify (applied) | 18238662 | https://seatgeek.com/blue-october-tickets/reno-nevada-silver-legacy-casino-2027-02-21-7-pm/concert/18238662 | - |
| tm-yuridia-2027-inglewood-vvg1iz_33c4njl | yuridia | verify (applied) | 18584334 | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-21-8-pm/concert/18584334 | - |
| tm-breaking-benjamin-2027-peoria-vv1kvyvp4yga29pez | breaking-benjamin | verify (applied) | 18742700 | https://seatgeek.com/breaking-benjamin-tickets/peoria-illinois-peoria-civic-center-arena-2027-02-22-6-30-pm/concert/18742700 | - |
| tm-the-lemonheads-2027-houston-g5diz_3mypste | the-lemonheads | verify (applied) | 18594767 | https://seatgeek.com/the-lemonheads-tickets/houston-texas-white-oak-music-hall-upstairs-2027-02-22-7-30-pm/concert/18594767 | - |
| tm-breaking-benjamin-2027-louisville-1kaovp4zgaui0w6 | breaking-benjamin | verify (applied) | 18742710 | https://seatgeek.com/breaking-benjamin-tickets/louisville-kentucky-kfc-yum-center-2027-02-23-6-30-pm/concert/18742710 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | olivia-rodrigo | verify (applied) | 18226585 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-23-7-pm/concert/18226585 | - |
| tm-daughtry-2027-detroit-vv1kezvpg_ga5zp8l | daughtry | verify (applied) | 18632929 | https://seatgeek.com/daughtry-tickets/detroit-michigan-the-fillmore-detroit-2027-02-23-8-pm/concert/18632929 | - |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | polyphia | verify (applied) | 18312324 | https://seatgeek.com/polyphia-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-02-23-7-30-pm/concert/18312324 | - |
| tm-hans-zimmer-2027-philadelphia-1kgzvpgaga1lecy | hans-zimmer | verify (applied) | 18601920 | https://seatgeek.com/hans-zimmer-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-02-23-7-30-pm/concert/18601920 | - |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | chelsea-cutler | verify (applied) | 18639194 | https://seatgeek.com/chelsea-cutler-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-02-23-6-30-pm/concert/18639194 | - |
| tm-remi-wolf-2027-washington-1a4zk46gketspla | remi-wolf | verify (applied) | 18664756 | https://seatgeek.com/remi-wolf-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-23-7-30-pm/concert/18664756 | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqeia0 | gracie-abrams | verify (applied) | 18270553 | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-23-8-pm/concert/18270553 | - |
| tm-dropkick-murphys-2027-grand-rapids-vv1afzkfggketsgvf | dropkick-murphys | verify (applied) | 18633551 | https://seatgeek.com/dropkick-murphys-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-02-24-7-pm/concert/18633551 | - |
| tm-nickelback-2027-knoxville-g5viz_f9kxnbt | nickelback | verify (applied) | 18664589 | https://seatgeek.com/nickelback-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-02-24-6-30-pm/concert/18664589 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwfupw | olivia-rodrigo | verify (applied) | 18226587 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-24-7-pm/concert/18226587 | - |
| tm-hans-zimmer-2027-boston-vv1avzkftgkdjvzxr | hans-zimmer | verify (applied) | 18601922 | https://seatgeek.com/hans-zimmer-tickets/boston-massachusetts-td-garden-2027-02-24-7-30-pm/concert/18601922 | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqiiai | gracie-abrams | verify (applied) | 18270554 | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-24-8-pm/concert/18270554 | - |
| tm-meshuggah-2027-nashville-g5viz_4l7rl-d | meshuggah | verify (applied) | 18724651 | https://seatgeek.com/meshuggah-tickets/nashville-tennessee-the-truth-nashville-2027-02-24-7-pm/concert/18724651 | - |
| tm-polyphia-2027-milwaukee-vvg1jz_gjngwwq | polyphia | verify (applied) | 18312323 | https://seatgeek.com/polyphia-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-02-24-7-30-pm/concert/18312323 | - |
| tm-valley-2027-vancouver-1av7z_3gkb3hpv9 | valley | verify (applied) | 18606271 | https://seatgeek.com/valley-tickets/vancouver-canada-commodore-ballroom-2027-02-24-7-pm/concert/18606271 | - |
| tm-air-supply-2027-calgary-1aozkf0gkev7qvg | air-supply | verify (applied) | 18594382 | https://seatgeek.com/air-supply-tickets/calgary-canada-grey-eagle-event-centre-2027-02-24-7-pm/concert/18594382 | - |
| tm-tommy-emmanuel-2027-grand-junction-g5vzz_fdgnqkn | tommy-emmanuel | verify (applied) | 18704175 | https://seatgeek.com/tommy-emmanuel-tickets/grand-junction-colorado-avalon-theatre-co-2027-02-24-7-30-pm/concert/18704175 | - |
| tm-blue-october-2027-spokane-g5vzz_1rinhtu | blue-october | verify (applied) | 18238522 | https://seatgeek.com/blue-october-tickets/spokane-washington-knitting-factory-spokane-2027-02-24-8-pm/concert/18238522 | - |
| tm-breaking-benjamin-2027-columbus-vv1aazk49gkeujesy | breaking-benjamin | verify (applied) | 18742717 | https://seatgeek.com/breaking-benjamin-tickets/columbus-ohio-nationwide-arena-2027-02-25-6-30-pm/concert/18742717 | - |
| tm-tobymac-2027-jacksonville-1axzkf_gkdts4j7 | tobymac | verify (applied) | 18542783 | https://seatgeek.com/tobymac-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-25-7-pm/concert/18542783 | - |
| tm-the-red-clay-strays-2027-estero-vvg1vz_ks60_np | the-red-clay-strays | verify (applied) | 18639080 | https://seatgeek.com/the-red-clay-strays-tickets/estero-florida-hertz-arena-2027-02-25-7-pm/concert/18639080 | - |
| tm-polyphia-2027-chicago-vvg18z_gjsjbx- | polyphia | verify (applied) | 18312332 | https://seatgeek.com/polyphia-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-25-6-pm/concert/18312332 | - |
| tm-michelle-branch-2027-charleston-g5evz_8w8tpxk | michelle-branch | verify (applied) | 18508823 | https://seatgeek.com/michelle-branch-tickets/charleston-south-carolina-charleston-music-hall-2027-02-25-8-pm/concert/18508823 | - |
| tm-alan-walker-2027-indianapolis-vv1aazkfegkewtmln | alan-walker | verify (applied) | 18591019 | https://seatgeek.com/alan-walker-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-02-25-8-pm/concert/18591019 | - |
| tm-needtobreathe-2027-madison-vv17jz_3gktprkgd | needtobreathe | verify (applied) | 18621529 | https://seatgeek.com/needtobreathe-tickets/madison-wisconsin-the-sylvee-2027-02-25-7-pm/concert/18621529 | - |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | flans | verify (applied) | 18612632 | https://seatgeek.com/flans-tickets/atlanta-georgia-cobb-energy-performing-arts-centre-2027-02-25-8-pm/concert/18612632 | - |
| tm-blue-october-2027-vancouver-1778v0g61pgtl-u | blue-october | verify (applied) | 18238922 | https://seatgeek.com/blue-october-tickets/vancouver-canada-commodore-ballroom-2027-02-25-7-pm/concert/18238922 | - |
| tm-chelsea-cutler-2027-dallas-vvg1yz_kraozwg | chelsea-cutler | verify (applied) | 18639195 | https://seatgeek.com/chelsea-cutler-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-02-25-8-pm/concert/18639195 | - |
| tm-dylan-scott-2027-albuquerque-g5vzz_3mo5e82 | dylan-scott | verify (applied) | 18600938 | https://seatgeek.com/dylan-scott-tickets/albuquerque-new-mexico-kiva-auditorium-at-the-albuquerque-convention-center-2027-02-25-7-30-pm/concert/18600938 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwuugv | barry-manilow | verify (applied) | 17637120 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-25-7-pm/concert/17637120 | - |
| tm-sylvan-esso-2027-oakland-g5vyz_gf0ezov | sylvan-esso | verify (applied) | 18299166 | https://seatgeek.com/sylvan-esso-tickets/oakland-california-fox-theater-oakland-2027-02-25-8-pm/concert/18299166 | - |
| tm-yuridia-2027-fresno-g5vyz_35vhmjx | yuridia | verify (applied) | 18570392 | https://seatgeek.com/yuridia-tickets/fresno-california-save-mart-center-2027-02-25-8-pm/concert/18570392 | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0buti | metallica | verify (applied) | 18108450 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-25-8-30-pm/concert/18108450 | - |
| tm-needtobreathe-2027-grand-rapids-vv1afzkfwgkd2p_kw | needtobreathe | verify (applied) | 18621537 | https://seatgeek.com/needtobreathe-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-02-26-6-pm/concert/18621537 | - |
| tm-dropkick-murphys-2027-detroit-vv1afzkfggkemn0a8 | dropkick-murphys | verify (applied) | 18633552 | https://seatgeek.com/dropkick-murphys-tickets/detroit-michigan-the-fillmore-detroit-2027-02-26-7-pm/concert/18633552 | - |
| tm-nickelback-2027-hollywood-vvg1vz_fpmhiza | nickelback | verify (applied) | 18664588 | https://seatgeek.com/nickelback-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-26-6-30-pm/concert/18664588 | - |
| tm-breaking-benjamin-2027-university-park-vv1aezk4pgkdz5iak | breaking-benjamin | verify (applied) | 18742722 | https://seatgeek.com/breaking-benjamin-tickets/university-park-pennsylvania-bryce-jordan-center-2027-02-26-6-30-pm/concert/18742722 | - |
| tm-alan-walker-2027-chicago-vv1k8z_3gyg7zohx | alan-walker | verify (applied) | 18590319 | https://seatgeek.com/alan-walker-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-26-6-pm/concert/18590319 | - |
| tm-daughtry-2027-hershey-vv1aezkfmgkdtwgls | daughtry | verify (applied) | 18632930 | https://seatgeek.com/daughtry-tickets/hershey-pennsylvania-hershey-theatre-hershey-2027-02-26-7-pm/concert/18632930 | - |
| tm-polyphia-2027-indianapolis-vv1aazkfbgkd_h8yq | polyphia | verify (applied) | 18536018 | https://seatgeek.com/polyphia-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-02-26-7-30-pm/concert/18536018 | - |
| tm-hans-zimmer-2027-kanata-1aszkf0gkdalm2x | hans-zimmer | verify (applied) | 18601956 | https://seatgeek.com/hans-zimmer-tickets/kanata-canada-canadian-tire-centre-2027-02-26-7-30-pm/concert/18601956 | - |
| tm-lil-wayne-2027-reading-vv17fz_kgkwwyiai | lil-wayne | verify (applied) | 18128377 | https://seatgeek.com/lil-wayne-tickets/reading-pennsylvania-santander-arena-2027-02-26-7-30-pm/concert/18128377 | - |
| tm-gracie-abrams-2027-charlotte-g5evz_am0wlwu | gracie-abrams | verify (applied) | 18270558 | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-26-8-pm/concert/18270558 | - |
| tm-michelle-branch-2027-atlanta-vvg1zz_8qvo7-q | michelle-branch | verify (applied) | 18508825 | https://seatgeek.com/michelle-branch-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-02-26-8-pm/concert/18508825 | - |
| tm-tobymac-2027-nashville-g5viz_oeqedtw | tobymac | verify (applied) | 18542781 | https://seatgeek.com/tobymac-tickets/nashville-tennessee-bridgestone-arena-2027-02-26-7-pm/concert/18542781 | - |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | flans | verify (applied) | 18612827 | https://seatgeek.com/flans-tickets/charlotte-north-carolina-ovens-auditorium-2027-02-26-8-pm/concert/18612827 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7-cha | backstreet-boys | verify (applied) | 18657825 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-26-8-pm/concert/18657825 | - |
| tm-don-omar-2027-rosemont-vvg18z_u5mkrgh | don-omar | verify (applied) | 18325237 | https://seatgeek.com/don-omar-tickets/rosemont-illinois-allstate-arena-2027-02-26-8-pm/concert/18325237 | - |
| tm-dinosaur-jr-2027-nashville-g5viz_o987bgu | dinosaur-jr | verify (applied) | 18540445 | https://seatgeek.com/dinosaur-jr-tickets/nashville-tennessee-brooklyn-bowl-nashville-2027-02-26-8-pm/concert/18540445 | - |
| tm-dylan-scott-2027-prescott-valley-1av0z_3gkmlgghm | dylan-scott | verify (applied) | 18600660 | https://seatgeek.com/dylan-scott-tickets/prescott-valley-arizona-findlay-toyota-center-2027-02-26-7-30-pm/concert/18600660 | - |
| tm-sylvan-esso-2027-los-angeles-vvg10z_gjuyprv | sylvan-esso | verify (applied) | 18299167 | https://seatgeek.com/sylvan-esso-tickets/los-angeles-california-the-wiltern-2027-02-26-7-pm/concert/18299167 | - |
| tm-elevation-worship-2027-tacoma-vvg1hz_35ckwg5 | elevation-worship | verify (applied) | 18590103 | https://seatgeek.com/elevation-worship-tickets/tacoma-washington-tacoma-dome-2027-02-26-7-pm/concert/18590103 | - |
| tm-blue-october-2027-seattle-vvg1hz_1rxwtla | blue-october | verify (applied) | 18238428 | https://seatgeek.com/blue-october-tickets/seattle-washington-moore-theatre-seattle-2027-02-26-8-pm/concert/18238428 | - |
| tm-morat-2027-inglewood-vvg10z_1tsiuwe | morat | verify (applied) | 18252820 | https://seatgeek.com/morat-tickets/inglewood-california-intuit-dome-2027-02-26-8-pm/concert/18252820 | - |
| tm-valley-2027-seattle-vvg1hz_3nsltnp | valley | verify (applied) | 18606330 | https://seatgeek.com/valley-tickets/seattle-washington-neptune-theatre-wa-2027-02-26-8-pm/concert/18606330 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwcjgy | barry-manilow | verify (applied) | 17637121 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-26-8-pm/concert/17637121 | - |
| tm-dropkick-murphys-2027-london-1a8zkfugkeybnv7 | dropkick-murphys | verify (applied) | 18633555 | https://seatgeek.com/dropkick-murphys-tickets/london-canada-london-music-hall-2027-02-27-7-pm/concert/18633555 | - |
| tm-polyphia-2027-detroit-vvg1oz_ge56_sr | polyphia | verify (applied) | 18312333 | https://seatgeek.com/polyphia-tickets/detroit-michigan-the-fillmore-detroit-2027-02-27-7-30-pm/concert/18312333 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvw1wpg | olivia-rodrigo | verify (applied) | 18227138 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-27-7-pm/concert/18227138 | - |
| tm-tobymac-2027-duluth-vvg1zz_oxyi5ps | tobymac | verify (applied) | 18542827 | https://seatgeek.com/tobymac-tickets/duluth-georgia-gas-south-arena-2027-02-27-7-pm/concert/18542827 | - |
| tm-needtobreathe-2027-cincinnati-1kaovpgtgauok5q | needtobreathe | verify (applied) | 18621538 | https://seatgeek.com/needtobreathe-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-02-27-7-pm/concert/18621538 | - |
| tm-mico-2027-orlando-16efz_fbzg7m_te | mico | verify (applied) | 18666323 | https://seatgeek.com/mico-tickets/orlando-florida-house-of-blues-orlando-2027-02-27-7-pm/concert/18666323 | - |
| tm-meshuggah-2027-baltimore-1a4zk4fgkdwfxtt | meshuggah | verify (applied) | 18724653 | https://seatgeek.com/meshuggah-tickets/baltimore-maryland-the-paramount-baltimore-2027-02-27-7-pm/concert/18724653 | - |
| tm-gracie-abrams-2027-charlotte-g5evz_5ryzbyv | gracie-abrams | verify (applied) | 18270559 | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-27-8-pm/concert/18270559 | - |
| tm-daughtry-2027-bethlehem-vv1aovpg_ga5ljzy | daughtry | verify (applied) | 18632933 | https://seatgeek.com/daughtry-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-02-27-8-pm/concert/18632933 | - |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | flans | verify (applied) | 18618099 | https://seatgeek.com/flans-tickets/raleigh-north-carolina-martin-marietta-center-for-the-performing-arts-memorial-auditorium-2027-02-27-8-pm/concert/18618099 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7xqhp | backstreet-boys | verify (applied) | 18657827 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-27-8-pm/concert/18657827 | - |
| tm-remi-wolf-2027-new-york-g5dyz_fqhrymh | remi-wolf | verify (applied) | 18664759 | https://seatgeek.com/remi-wolf-tickets/new-york-new-york-radio-city-music-hall-2027-02-27-8-pm/concert/18664759 | - |
| tm-jason-aldean-2027-hollywood-vvg1vz_4r1id24 | jason-aldean | verify (applied) | 18724459 | https://seatgeek.com/jason-aldean-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-27-8-pm/concert/18724459 | - |
| tm-cristian-castro-2027-hidalgo-g5diz_a2dt_o4 | cristian-castro | verify (applied) | 18091132 | https://seatgeek.com/cristian-castro-tickets/hidalgo-texas-payne-arena-2027-02-27-8-pm/concert/18091132 | - |
| tm-sylvan-esso-2027-santa-ana-vvg10z_26gjjny | sylvan-esso | verify (applied) | 18392607 | https://seatgeek.com/sylvan-esso-tickets/santa-ana-california-the-observatory-2027-02-27-7-pm/concert/18392607 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2kgd | barry-manilow | verify (applied) | 17637122 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-27-7-pm/concert/17637122 | - |
| tm-yuridia-2027-wheatland-g5vyz_32kawxi | yuridia | verify (applied) | 18570399 | https://seatgeek.com/yuridia-tickets/wheatland-california-hard-rock-live-sacramento-2027-02-27-8-pm/concert/18570399 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6y | metallica | verify (applied) | 18108452 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-02-27-8-30-pm/concert/18108452 | - |
| tm-tobymac-2027-knoxville-g5viz_oeoyvqw | tobymac | verify (applied) | 18542767 | https://seatgeek.com/tobymac-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-02-28-6-30-pm/concert/18542767 | - |
| tm-breaking-benjamin-2027-uncasville-g5vvz_4l6n7hw | breaking-benjamin | verify (applied) | 18742724 | https://seatgeek.com/breaking-benjamin-tickets/uncasville-connecticut-mohegan-sun-arena-2027-02-28-6-30-pm/concert/18742724 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwuqpx | olivia-rodrigo | verify (applied) | 18229435 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-28-7-pm/concert/18229435 | - |
| tm-meshuggah-2027-pittsburgh-1kaovp4oga2k8sn | meshuggah | verify (applied) | 18724655 | https://seatgeek.com/meshuggah-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-02-28-7-pm/concert/18724655 | - |
| tm-hans-zimmer-2027-quebec-1fg8vp17a7z7uce8 | hans-zimmer | verify (applied) | 18601958 | https://seatgeek.com/hans-zimmer-tickets/quebec-canada-videotron-centre-2027-02-28-7-30-pm/concert/18601958 | - |
| tm-air-supply-2027-winnipeg-1aozkftgkdfjy5c | air-supply | verify (applied) | 18593527 | https://seatgeek.com/air-supply-tickets/winnipeg-canada-canada-life-centre-2027-02-28-7-30-pm/concert/18593527 | - |
| tm-don-omar-2027-belmont-park-17gzv0g6u15uw7e | don-omar | verify (applied) | 18326568 | https://seatgeek.com/don-omar-tickets/elmont-new-york-ubs-arena-2027-02-28-8-pm/concert/18326568 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7nuhj | backstreet-boys | verify (applied) | 18657844 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-28-8-pm/concert/18657844 | - |
| tm-cristian-castro-2027-cedar-park-g5diz_ak4-aew | cristian-castro | verify (applied) | 18091442 | https://seatgeek.com/cristian-castro-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-02-28-7-pm/concert/18091442 | - |
| tm-morat-2027-el-paso-vvg1yz_1xncffn | morat | verify (applied) | 18251588 | https://seatgeek.com/morat-tickets/el-paso-texas-don-haskins-center-2027-02-28-8-pm/concert/18251588 | - |
| tm-blondshell-2027-san-diego-vvg1iz_1wv8vq3 | blondshell | verify (applied) | 18251038 | https://seatgeek.com/blondshell-tickets/san-diego-california-the-observatory-north-park-2027-02-28-7-pm/concert/18251038 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-yuridia-2027-san-diego-vvg1iz_3fqrwdv | yuridia | verify (applied) | 18570401 | https://seatgeek.com/yuridia-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-02-28-8-pm/concert/18570401 | - |
| tm-dropkick-murphys-2027-toronto-1a8zkfygkdujro2 | dropkick-murphys | verify (applied) | 18633557 | https://seatgeek.com/dropkick-murphys-tickets/toronto-canada-rebel-4-2027-03-01-7-pm/concert/18633557 | - |
| tm-gracie-abrams-2027-boston-vv177z_agkwp_mnl | gracie-abrams | verify (applied) | 18270560 | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-01-8-pm/concert/18270560 | - |
| tm-mico-2027-birmingham-1aozk4fgkdswfqm | mico | verify (applied) | 18667195 | https://seatgeek.com/mico-tickets/birmingham-alabama-iron-city-2027-03-01-8-pm/concert/18667195 | - |
| tm-elevation-worship-2027-sacramento-g5vyz_38zvlqx | elevation-worship | verify (applied) | 18591315 | https://seatgeek.com/elevation-worship-tickets/sacramento-california-golden-1-center-2027-03-01-7-pm/concert/18591315 | - |
| tm-sylvan-esso-2027-del-mar-vvg1iz_g9535-x | sylvan-esso | verify (applied) | 18299170 | https://seatgeek.com/sylvan-esso-tickets/del-mar-california-the-sound-del-mar-2027-03-01-8-pm/concert/18299170 | - |
| tm-dropkick-murphys-2027-ottawa-16d7z_kj6g7s2ev | dropkick-murphys | verify (applied) | 18633558 | https://seatgeek.com/dropkick-murphys-tickets/ottawa-canada-history-ottawa-2027-03-02-7-pm/concert/18633558 | - |
| tm-nickelback-2027-atlanta-vvg1zz_f9i_ugh | nickelback | verify (applied) | 18664590 | https://seatgeek.com/nickelback-tickets/atlanta-georgia-state-farm-arena-1-2027-03-02-6-30-pm/concert/18664590 | - |
| tm-polyphia-2027-toronto-177zv0g6gmyx7u7 | polyphia | verify (applied) | 18312357 | https://seatgeek.com/polyphia-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-02-6-30-pm/concert/18312357 | - |
| tm-breaking-benjamin-2027-syracuse-k7vgf_4hgmiu3 | breaking-benjamin | verify (applied) | 18742726 | https://seatgeek.com/breaking-benjamin-tickets/syracuse-new-york-upstate-medical-university-arena-at-the-oncenter-war-memorial-2027-03-02-6-30-pm/concert/18742726 | - |
| tm-hans-zimmer-2027-hamilton-1a8zkfigkdxfojj | hans-zimmer | verify (applied) | 18601959 | https://seatgeek.com/hans-zimmer-tickets/hamilton-canada-td-coliseum-2027-03-02-7-30-pm/concert/18601959 | - |
| tm-greta-van-fleet-2027-detroit-vv17oz_kgkwt_pf2 | greta-van-fleet | verify (applied) | 18641967 | https://seatgeek.com/greta-van-fleet-tickets/detroit-michigan-little-caesars-arena-2027-03-02-7-pm/concert/18641967 | - |
| tm-def-leppard-2027-allentown-1ayzk4agkdyeyao | def-leppard | verify (applied) | 18662385 | https://seatgeek.com/def-leppard-tickets/allentown-pennsylvania-ppl-center-2027-03-02-7-pm/concert/18662385 | - |
| tm-rod-stewart-2027-reading-vv17fz_kgks7life | rod-stewart | verify (applied) | 18652809 | https://seatgeek.com/rod-stewart-tickets/reading-pennsylvania-santander-arena-2027-03-02-7-30-pm/concert/18652809 | - |
| tm-gracie-abrams-2027-boston-vvg17z_5rug2cb | gracie-abrams | verify (applied) | 18270564 | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-02-8-pm/concert/18270564 | - |
| tm-lukas-graham-2027-dallas-vvg1yz_kg_q-ih | lukas-graham | verify (applied) | 18618974 | https://seatgeek.com/lukas-graham-tickets/dallas-texas-the-echo-lounge-music-hall-2027-03-02-7-pm/concert/18618974 | - |
| tm-mico-2027-new-orleans-g5viz_f97lnal | mico | verify (applied) | 18666337 | https://seatgeek.com/mico-tickets/new-orleans-louisiana-house-of-blues-new-orleans-2027-03-02-7-pm/concert/18666337 | - |
| tm-the-neighbourhood-2027-denver-g5vzz_4qmz4qp | the-neighbourhood | verify (applied) | 18726902 | https://seatgeek.com/the-neighbourhood-tickets/denver-colorado-ball-arena-2027-03-02-7-pm/concert/18726902 | - |
| tm-sylvan-esso-2027-phoenix-17k8v0g6g3yxemg | sylvan-esso | verify (applied) | 18299174 | https://seatgeek.com/sylvan-esso-tickets/phoenix-arizona-the-van-buren-2027-03-02-8-pm/concert/18299174 | - |
| tm-blondshell-2027-los-angeles-vvg10z_1drttoa | blondshell | verify (applied) | 18251040 | https://seatgeek.com/blondshell-tickets/los-angeles-california-the-wiltern-2027-03-02-7-pm/concert/18251040 | - |
| tm-elevation-worship-2027-oakland-g5vyz_3npydie | elevation-worship | verify (applied) | 18590093 | https://seatgeek.com/elevation-worship-tickets/oakland-california-oakland-arena-2027-03-02-7-pm/concert/18590093 | - |
| tm-valley-2027-los-angeles-vv1aazkf-gkdqrhdg | valley | verify (applied) | 18606549 | https://seatgeek.com/valley-tickets/los-angeles-california-the-bellwether-2027-03-02-8-pm/concert/18606549 | - |
| tm-polyphia-2027-montreal-17g8v0g6gnmzpef | polyphia | verify (applied) | 18312356 | https://seatgeek.com/polyphia-tickets/montreal-canada-l-olympia-olympia-theatre-2027-03-03-6-30-pm/concert/18312356 | - |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgfozegk | dropkick-murphys | verify (applied) | 18633560 | https://seatgeek.com/dropkick-murphys-tickets/quebec-city-canada-theatre-capitole-2027-03-03-7-pm/concert/18633560 | - |
| tm-don-omar-2027-newark-vvg1fz_u5xkezy | don-omar | verify (applied) | 18325178 | https://seatgeek.com/don-omar-tickets/newark-new-jersey-prudential-center-2027-03-03-8-pm/concert/18325178 | - |
| tm-hans-zimmer-2027-detroit-vv17oz_3gky-owzw | hans-zimmer | verify (applied) | 18601918 | https://seatgeek.com/hans-zimmer-tickets/detroit-michigan-little-caesars-arena-2027-03-03-7-30-pm/concert/18601918 | - |
| tm-blue-october-2027-boise-g5vzz_1rcvq7p | blue-october | verify (applied) | 18238525 | https://seatgeek.com/blue-october-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-03-03-8-pm/concert/18238525 | - |
| tm-chelsea-cutler-2027-phoenix-16v0z_koag7ux58 | chelsea-cutler | verify (applied) | 18639202 | https://seatgeek.com/chelsea-cutler-tickets/phoenix-arizona-the-van-buren-2027-03-03-8-pm/concert/18639202 | - |
| tm-elevation-worship-2027-anaheim-vv16azkfivpza5vug5 | elevation-worship | verify (applied) | 18590108 | https://seatgeek.com/elevation-worship-tickets/anaheim-california-honda-center-2027-03-03-7-pm/concert/18590108 | - |
| tm-blondshell-2027-san-francisco-g5vyz_1m0mwvc | blondshell | verify (applied) | 18251037 | https://seatgeek.com/blondshell-tickets/san-francisco-california-castro-theatre-2027-03-03-8-pm/concert/18251037 | - |
| tm-needtobreathe-2027-brooklyn-k7vgf_kxvnxba | needtobreathe | verify (applied) | 18621542 | https://seatgeek.com/needtobreathe-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-04-6-pm/concert/18621542 | - |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | staind | verify (applied) | 18654539 | https://seatgeek.com/staind-tickets/manchester-new-hampshire-snhu-arena-2027-03-04-6-pm/concert/18654539 | - |
| tm-nickelback-2027-raleigh-g5evz_fh5odfi | nickelback | verify (applied) | 18664594 | https://seatgeek.com/nickelback-tickets/raleigh-north-carolina-lenovo-center-2027-03-04-6-30-pm/concert/18664594 | - |
| tm-tobymac-2027-toledo-vv1afzkf_gkeg66aj | tobymac | verify (applied) | 18542960 | https://seatgeek.com/tobymac-tickets/toledo-ohio-huntington-center-2027-03-04-7-pm/concert/18542960 | - |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgoozeg5 | dropkick-murphys | verify (applied) | 18633563 | https://seatgeek.com/dropkick-murphys-tickets/quebec-city-canada-theatre-capitole-2027-03-04-7-pm/concert/18633563 | - |
| tm-gracie-abrams-2027-washington-1avfz_agksfejeq | gracie-abrams | verify (applied) | 18270566 | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-04-8-pm/concert/18270566 | - |
| tm-don-omar-2027-baltimore-17a8v0g6ukar9g1 | don-omar | verify (applied) | 18325129 | https://seatgeek.com/don-omar-tickets/baltimore-maryland-cfg-bank-arena-2027-03-04-8-pm/concert/18325129 | - |
| tm-lukas-graham-2027-atlanta-vvg1zz_kgj9z2e | lukas-graham | verify (applied) | 18617906 | https://seatgeek.com/lukas-graham-tickets/atlanta-georgia-buckhead-theatre-2027-03-04-8-pm/concert/18617906 | - |
| tm-rod-stewart-2027-niagara-falls-16vzzbmcag7m0q9 | rod-stewart | verify (applied) | 18424719 | https://seatgeek.com/rod-stewart-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-03-04-8-pm/concert/18424719 | - |
| tm-flans-2027-denver-g5vzz_kk90pao | flans | verify (applied) | 18612819 | https://seatgeek.com/flans-tickets/denver-colorado-paramount-theatre-co-2027-03-04-8-pm/concert/18612819 | - |
| tm-the-lemonheads-2027-los-angeles-vv1ke8vp13ga5mfmw | the-lemonheads | verify (applied) | 18594474 | https://seatgeek.com/the-lemonheads-tickets/los-angeles-california-teragram-ballroom-2027-03-04-7-30-pm/concert/18594474 | - |
| tm-dylan-scott-2027-kennewick-vvg1hz_3ngdpch | dylan-scott | verify (applied) | 18600761 | https://seatgeek.com/dylan-scott-tickets/kennewick-washington-toyota-center-wa-2027-03-04-7-30-pm/concert/18600761 | - |
| tm-chelsea-cutler-2027-los-angeles-vv1aazkfzgkdgncya | chelsea-cutler | verify (applied) | 18639203 | https://seatgeek.com/chelsea-cutler-tickets/los-angeles-california-the-bellwether-2027-03-04-8-pm/concert/18639203 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecv9ix | sting | verify (applied) | 18674616 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-04-8-pm/concert/18674616 | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0butu | metallica | verify (applied) | 18111112 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-04-8-30-pm/concert/18111112 | - |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | lukas-graham | verify (applied) | 18617618 | https://seatgeek.com/lukas-graham-tickets/tampa-florida-the-ritz-ybor-2027-03-05-6-pm/concert/18617618 | - |
| tm-tobymac-2027-fishers-vv1aazkf4gkdkqmmm | tobymac | verify (applied) | 18544030 | https://seatgeek.com/tobymac-tickets/fishers-indiana-fishers-event-center-2027-03-05-7-pm/concert/18544030 | - |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | needtobreathe | verify (applied) | 18621543 | https://seatgeek.com/needtobreathe-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-05-7-pm/concert/18621543 | - |
| tm-daughtry-2027-charleston-g5evz_keoc7ae | daughtry | verify (applied) | 18632937 | https://seatgeek.com/daughtry-tickets/charleston-south-carolina-charleston-music-hall-2027-03-05-7-pm/concert/18632937 | - |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | greta-van-fleet | verify (applied) | 18641971 | https://seatgeek.com/greta-van-fleet-tickets/boston-massachusetts-td-garden-2027-03-05-7-pm/concert/18641971 | - |
| tm-def-leppard-2027-montreal-1aszk4agkdf99bi | def-leppard | verify (applied) | 18662455 | https://seatgeek.com/def-leppard-tickets/montreal-canada-centre-bell-2027-03-05-7-pm/concert/18662455 | - |
| tm-dropkick-murphys-2027-montreal-1aszkfugkdv84mc | dropkick-murphys | verify (applied) | 18633565 | https://seatgeek.com/dropkick-murphys-tickets/montreal-canada-l-olympia-olympia-theatre-2027-03-05-7-pm/concert/18633565 | - |
| tm-polyphia-2027-philadelphia-vvg1fz_gn-cuhm | polyphia | verify (applied) | 18312344 | https://seatgeek.com/polyphia-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-03-05-7-30-pm/concert/18312344 | - |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | gracie-abrams | verify (applied) | 18270567 | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-05-8-pm/concert/18270567 | - |
| tm-yacht-rock-revue-2027-atlantic-city-vv1aezkfsgkeedrng | yacht-rock-revue | verify (applied) | 18612640 | https://seatgeek.com/yacht-rock-revue-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-05-8-pm/concert/18612640 | - |
| tm-backstreet-boys-2027-toronto-1k7zvpotga1oqed | backstreet-boys | verify (applied) | 18665148 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-05-8-pm/concert/18665148 | - |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbbff | remi-wolf | verify (applied) | 18664754 | https://seatgeek.com/remi-wolf-tickets/toronto-canada-massey-hall-2027-03-05-8-pm/concert/18664754 | - |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | hans-zimmer | verify (applied) | 18601929 | https://seatgeek.com/hans-zimmer-tickets/chicago-illinois-united-center-2027-03-05-7-30-pm/concert/18601929 | - |
| tm-morat-2027-rosemont-vvg18z_1rgckw0 | morat | verify (applied) | 18252137 | https://seatgeek.com/morat-tickets/rosemont-illinois-rosemont-theatre-2027-03-05-8-pm/concert/18252137 | - |
| tm-valley-2027-salt-lake-city-g5vzz_3bnvu2b | valley | verify (applied) | 18606235 | https://seatgeek.com/valley-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-03-05-7-pm/concert/18606235 | - |
| tm-air-supply-2027-rama-1avzz_3gkn3a6sv | air-supply | verify (applied) | 18618284 | https://seatgeek.com/air-supply-tickets/rama-canada-casino-rama-resort-2027-03-05-9-pm/concert/18618284 | - |
| tm-chelsea-cutler-2027-san-diego-vvg1iz_ks1c6a3 | chelsea-cutler | verify (applied) | 18639204 | https://seatgeek.com/chelsea-cutler-tickets/san-diego-california-the-observatory-north-park-2027-03-05-7-pm/concert/18639204 | - |
| tm-elevation-worship-2027-san-diego-vvg1iz_37k-njg | elevation-worship | verify (applied) | 18590214 | https://seatgeek.com/elevation-worship-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-03-05-7-pm/concert/18590214 | - |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | fantasia | verify (applied) | 18629502 | https://seatgeek.com/fantasia-tickets/ontario-california-toyota-arena-ontario-2027-03-05-8-pm/concert/18629502 | - |
| tm-staind-2027-baltimore-11a8vpokayf8vu | staind | verify (applied) | 18654540 | https://seatgeek.com/staind-tickets/baltimore-maryland-cfg-bank-arena-2027-03-06-6-pm/concert/18654540 | - |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | nickelback | verify (applied) | 18664595 | https://seatgeek.com/nickelback-tickets/newark-new-jersey-prudential-center-2027-03-06-6-30-pm/concert/18664595 | - |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | polyphia | verify (applied) | 18312312 | https://seatgeek.com/polyphia-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-06-7-30-pm/concert/18312312 | - |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | needtobreathe | verify (applied) | 18621547 | https://seatgeek.com/needtobreathe-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-06-7-pm/concert/18621547 | - |
| tm-greta-van-fleet-2027-albany-k7vgf_kbmaa9o | greta-van-fleet | verify (applied) | 18641972 | https://seatgeek.com/greta-van-fleet-tickets/albany-new-york-mvp-arena-2027-03-06-7-pm/concert/18641972 | - |
| tm-theory-of-a-deadman-2027-moncton-16d7z_31_g7xauw | theory-of-a-deadman | verify (applied) | 18570536 | https://seatgeek.com/theory-of-a-deadman-tickets/moncton-canada-molson-canadian-centre-at-casino-new-brunswick-2027-03-06-8-pm/concert/18570536 | - |
| tm-michelle-branch-2027-dallas-vvg1yz_8by9itm | michelle-branch | verify (applied) | 18508827 | https://seatgeek.com/michelle-branch-tickets/dallas-texas-house-of-blues-dallas-2027-03-06-7-pm/concert/18508827 | - |
| tm-daughtry-2027-nashville-g5viz_khosea- | daughtry | verify (applied) | 18632939 | https://seatgeek.com/daughtry-tickets/nashville-tennessee-the-truth-nashville-2027-03-06-7-pm/concert/18632939 | - |
| tm-backstreet-boys-2027-toronto-1k7zvpotga14bio | backstreet-boys | verify (applied) | 18665150 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-06-8-pm/concert/18665150 | - |
| tm-rod-stewart-2027-atlantic-city-vv1aezk49gkddvprj | rod-stewart | verify (applied) | 18725794 | https://seatgeek.com/rod-stewart-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-06-8-pm/concert/18725794 | - |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbzfe | remi-wolf | verify (applied) | 18693184 | https://seatgeek.com/remi-wolf-tickets/toronto-canada-massey-hall-2027-03-06-8-pm/concert/18693184 | - |
| tm-air-supply-2027-toronto-1avzz_3gkws1scj | air-supply | verify (applied) | 18594770 | https://seatgeek.com/air-supply-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-06-8-pm/concert/18594770 | - |
| tm-blondshell-2027-vancouver-16ozkfzopzauakea | blondshell | verify (applied) | 18633501 | https://seatgeek.com/blondshell-tickets/vancouver-canada-commodore-ballroom-2027-03-06-6-30-pm/concert/18633501 | - |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | don-omar | verify (applied) | 18326519 | https://seatgeek.com/don-omar-tickets/fort-worth-texas-dickies-arena-2027-03-06-8-pm/concert/18326519 | - |
| tm-alan-walker-2027-los-angeles-vvg1iz_3n0r6vh | alan-walker | verify (applied) | 18591776 | https://seatgeek.com/alan-walker-tickets/los-angeles-california-the-torch-at-la-coliseum-2027-03-06-6-pm/concert/18591776 | - |
| tm-elevation-worship-2027-phoenix-1a_zkf0gkdcjit6 | elevation-worship | verify (applied) | 18590079 | https://seatgeek.com/elevation-worship-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-06-7-pm/concert/18590079 | - |
| tm-fantasia-2027-oakland-g5vyz_krz5jaf | fantasia | verify (applied) | 18629244 | https://seatgeek.com/fantasia-tickets/oakland-california-oakland-arena-2027-03-06-8-pm/concert/18629244 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecemih | sting | verify (applied) | 18674617 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-06-8-pm/concert/18674617 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | metallica | verify (applied) | 18111114 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-06-8-30-pm/concert/18111114 | - |
| tm-tobymac-2027-grand-rapids-vv1afzkfbgkdx_n_v | tobymac | verify (applied) | 18542761 | https://seatgeek.com/tobymac-tickets/grand-rapids-michigan-van-andel-arena-2027-03-07-6-30-pm/concert/18542761 | - |
| tm-dinosaur-jr-2027-toronto-1a8zkf4gkdtrlfj | dinosaur-jr | verify (applied) | 18540457 | https://seatgeek.com/dinosaur-jr-tickets/toronto-canada-the-danforth-music-hall-2027-03-07-7-pm/concert/18540457 | - |
| tm-needtobreathe-2027-pittsburgh-1apzkfggkd9zzsh | needtobreathe | verify (applied) | 18621548 | https://seatgeek.com/needtobreathe-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-07-7-pm/concert/18621548 | - |
| tm-daughtry-2027-atlanta-vvg1zz_klwyfxu | daughtry | verify (applied) | 18632941 | https://seatgeek.com/daughtry-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-03-07-7-pm/concert/18632941 | - |
| tm-def-leppard-2027-detroit-vv1afzk4egkelpgxa | def-leppard | verify (applied) | 18662384 | https://seatgeek.com/def-leppard-tickets/detroit-michigan-little-caesars-arena-2027-03-07-7-pm/concert/18662384 | - |
| tm-air-supply-2027-windsor-1avzz_3gki_rnez | air-supply | verify (applied) | 18593816 | https://seatgeek.com/air-supply-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-07-7-pm/concert/18593816 | - |
| tm-hans-zimmer-2027-cincinnati-1avbz_3gkbx_fb1 | hans-zimmer | verify (applied) | 18601930 | https://seatgeek.com/hans-zimmer-tickets/cincinnati-ohio-heritage-bank-center-2027-03-07-7-30-pm/concert/18601930 | - |
| tm-polyphia-2027-boston-vvg17z_ge-9vq3 | polyphia | verify (applied) | 18312334 | https://seatgeek.com/polyphia-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-07-7-30-pm/concert/18312334 | - |
| tm-morat-2027-boston-vvg17z_1b5nnhl | morat | verify (applied) | 18251537 | https://seatgeek.com/morat-tickets/boston-massachusetts-agganis-arena-2027-03-07-8-pm/concert/18251537 | - |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | michelle-branch | verify (applied) | 18508828 | https://seatgeek.com/michelle-branch-tickets/houston-texas-house-of-blues-houston-2027-03-07-7-pm/concert/18508828 | - |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | lukas-graham | verify (applied) | 18617859 | https://seatgeek.com/lukas-graham-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-07-8-pm/concert/18617859 | - |
| tm-jay-wheeler-2027-estero-vvg1vz9zkibwmk | jay-wheeler | verify (applied) | 18649623 | https://seatgeek.com/jay-wheeler-tickets/estero-florida-hertz-arena-2027-03-07-8-pm/concert/18649623 | - |
| tm-backstreet-boys-2027-toronto-1a8zk4agkeehx1f | backstreet-boys | verify (applied) | 18674614 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-07-8-pm/concert/18674614 | - |
| tm-the-neighbourhood-2027-dallas-vvg1yz_4no500h | the-neighbourhood | verify (applied) | 18726900 | https://seatgeek.com/the-neighbourhood-tickets/dallas-texas-american-airlines-center-2027-03-07-7-pm/concert/18726900 | - |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | don-omar | verify (applied) | 18326567 | https://seatgeek.com/don-omar-tickets/austin-texas-moody-center-atx-2027-03-07-8-pm/concert/18326567 | - |
| tm-elevation-worship-2027-inglewood-vv1aazkfigkdewunn | elevation-worship | verify (applied) | 18590126 | https://seatgeek.com/elevation-worship-tickets/inglewood-california-kia-forum-2027-03-07-7-pm/concert/18590126 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec79cl | sting | verify (applied) | 18674618 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-07-8-pm/concert/18674618 | - |
| tm-the-lemonheads-2027-san-francisco-g5vyz_3niolho | the-lemonheads | verify (applied) | 18594148 | https://seatgeek.com/the-lemonheads-tickets/san-francisco-california-august-hall-2027-03-07-8-30-pm/concert/18594148 | - |
| tm-staind-2027-pittsburgh-1avbz_kgkdoccp7 | staind | verify (applied) | 18654543 | https://seatgeek.com/staind-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-08-6-pm/concert/18654543 | - |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | nickelback | verify (applied) | 18664598 | https://seatgeek.com/nickelback-tickets/washington-district-of-columbia-capital-one-arena-2027-03-08-6-30-pm/concert/18664598 | - |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | greta-van-fleet | verify (applied) | 18641973 | https://seatgeek.com/greta-van-fleet-tickets/brooklyn-new-york-barclays-center-2027-03-08-7-pm/concert/18641973 | - |
| tm-dropkick-murphys-2027-wilmington-vv1aezkfmgkexqysz | dropkick-murphys | verify (applied) | 18633568 | https://seatgeek.com/dropkick-murphys-tickets/wilmington-delaware-the-queen-wilmington-2027-03-08-7-pm/concert/18633568 | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65th0d1g | gracie-abrams | verify (applied) | 18270568 | https://seatgeek.com/gracie-abrams-tickets/montreal-canada-centre-bell-2027-03-08-8-pm/concert/18270568 | - |
| tm-rod-stewart-2027-savannah-vvg1zz_kexgebo | rod-stewart | verify (applied) | 18611010 | https://seatgeek.com/rod-stewart-tickets/savannah-georgia-enmarket-arena-2027-03-08-8-pm/concert/18611010 | - |
| tm-theory-of-a-deadman-2027-quebec-1aszkf04if8zegk | theory-of-a-deadman | verify (applied) | 18570535 | https://seatgeek.com/theory-of-a-deadman-tickets/quebec-city-canada-theatre-capitole-2027-03-08-8-pm/concert/18570535 | - |
| tm-staind-2027-reading-vv1aezk4vgkeshnyh | staind | verify (applied) | 18654544 | https://seatgeek.com/staind-tickets/reading-pennsylvania-santander-arena-2027-03-09-6-pm/concert/18654544 | - |
| tm-needtobreathe-2027-durham-g5evz_khc4kmz | needtobreathe | verify (applied) | 18621551 | https://seatgeek.com/needtobreathe-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-03-09-7-pm/concert/18621551 | - |
| tm-def-leppard-2027-toronto-1a8zk4egkdrqf1w | def-leppard | verify (applied) | 18662456 | https://seatgeek.com/def-leppard-tickets/toronto-canada-scotiabank-arena-2027-03-09-7-pm/concert/18662456 | - |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | hans-zimmer | verify (applied) | 18601932 | https://seatgeek.com/hans-zimmer-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-03-09-7-30-pm/concert/18601932 | - |
| tm-polyphia-2027-washington-17a8v0g6gmr0lc4 | polyphia | verify (applied) | 18312337 | https://seatgeek.com/polyphia-tickets/washington-district-of-columbia-echostage-2027-03-09-7-30-pm/concert/18312337 | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65thpd1k | gracie-abrams | verify (applied) | 18270572 | https://seatgeek.com/gracie-abrams-tickets/montreal-canada-centre-bell-2027-03-09-8-pm/concert/18270572 | - |
| tm-sylvan-esso-2027-dallas-vvg1yz_g8bdfye | sylvan-esso | verify (applied) | 18299179 | https://seatgeek.com/sylvan-esso-tickets/dallas-texas-house-of-blues-dallas-2027-03-09-7-pm/concert/18299179 | - |
| tm-mico-2027-indianapolis-vv1aazk4kgkenppel | mico | verify (applied) | 18666757 | https://seatgeek.com/mico-tickets/indianapolis-indiana-the-deluxe-at-old-national-centre-2027-03-09-8-pm/concert/18666757 | - |
| tm-theory-of-a-deadman-2027-montreal-1aszkfxgkerzpy6 | theory-of-a-deadman | verify (applied) | 18570537 | https://seatgeek.com/theory-of-a-deadman-tickets/montreal-canada-mtelus-2027-03-09-8-pm/concert/18570537 | - |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | lukas-graham | verify (applied) | 18618370 | https://seatgeek.com/lukas-graham-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-09-8-30-pm/concert/18618370 | - |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | vnv-nation | verify (applied) | 18659523 | https://seatgeek.com/vnv-nation-tickets/nashville-tennessee-exit-in-2027-03-09-8-pm/concert/18659523 | - |
| tm-remi-wolf-2027-chicago-vv1a7zk4fgkdb7-a0 | remi-wolf | verify (applied) | 18664766 | https://seatgeek.com/remi-wolf-tickets/chicago-illinois-the-salt-shed-indoors-2027-03-09-8-pm/concert/18664766 | - |
| tm-polyphia-2027-raleigh-g5evz_oemqprp | polyphia | verify (applied) | 18312346 | https://seatgeek.com/polyphia-tickets/raleigh-north-carolina-the-ritz-raleigh-2027-03-10-5-30-pm/concert/18312346 | - |
| tm-staind-2027-huntington-1kaovp8iga2ivff | staind | verify (applied) | 18654510 | https://seatgeek.com/staind-tickets/huntington-west-virginia-marshall-health-network-arena-2027-03-10-6-pm/concert/18654510 | - |

## Skipped before API checks

| showId | artist | reason |
| --- | --- | --- |
| tm-morgan-wallen-2026-gainesville-2200635d19f97a46 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-gainesville-2200635d1be07abe | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-denver-1e00635df7cf9add | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-denver-1e00635df7d99ae8 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-pittsburgh-1600635c84ff1ead | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-pittsburgh-1600635d93d83472 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtbn | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtba | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtbd | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtb7 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtba2 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtbk | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbs | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-philadelphia-0200635da084a7a9 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350404814e | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435046481aa | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435047f81c1 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435049481d0 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504a381d8 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504c881f8 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504e38212 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505178231 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350525823a | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505428256 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435054e8262 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505888295 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505aa82b9 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505d182df | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505dd82e6 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350690838a | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006429c95ea2b8 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006429c9dda300 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006435858268ec | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429d233149a | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3354a8c | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3454a9e | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3514ab0 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-east-rutherford-00006429eb39bb6f | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-east-rutherford-00006429ed30bceb | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-foxborough-0100642cbd7ab56b | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-chicago-0400642acbbd5d44 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429ab3c5ef1 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429b1b363a4 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429b2cb6418 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00631913d14ad8 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00631a8fc31891 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00632490b77e47 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-los-angeles-2c00631bd2240c78 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-los-angeles-2c00631bd1f40c75 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-09006319299f5deb | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-090063192f945f68 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-09006325c6486b2e | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9ce923db | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9e202403 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9f022430 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e00631a8e691e65 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e00631a8f331ed1 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e006325bea26298 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-brooklyn-30006319f49f4acd | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-montreal-31006319de3a2b37 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-chicago-0400631adf313481 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-bronx-1d006473d9d109cb | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-bronx-1d006473db760a7f | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a706ep | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a70677 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-pittsburgh-1avbz_agkm9w2rv | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-washington-1avfz_agkvqmncz | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-charlotte-g5evz_auyed-b | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-charlotte-g5evz_auyt5-g | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkyetuoa | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkmlebgy | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-boston-vv177z_agksbtqpc | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-boston-vvg17z_13s_x9k | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmby4v9 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmbsav_ | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkmwmykb | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydolwcm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydonw2z | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-pittsburgh-1avbzbygkuhq626 | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-philadelphia-vv1aezk8pgkdj_ywf | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-philadelphia-vv17fz_egkssn1i0 | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-foxborough-vv1a8vn0_ga221kn | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-tampa-vvg1vz_exa-kfw | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-new-orleans-g5vizbye_a_hw | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-miami-vvg1vz_ekc64hs | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-miami-vvg1vz_e-dkwj_ | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-san-antonio-g5dizbyc__upm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7o9_a | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-inglewood-vvg1izbyqbb4mx | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-inglewood-vvg1iz_eheo7is | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-santa-clara-g5vyz_epx9ygn | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-santa-clara-g5vyz_eejsdnx | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-16v7zbyrvg7dkhm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-1av7z_egkshvjex | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-1k78v0fjgacrkay | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-inglewood-vv1aazkovgkdf4iwr | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-inglewood-vv1aazkovgkdf_jwm | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-palm-desert-vvg1iz_6abv7yw | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-san-jose-g5vyz_663mr7p | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-san-jose-g5vyz_6x6bktl | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-dallas-vvg1yz_6c939ia | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-atlanta-vvg1zz_66u4nyt | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-atlanta-vvg1zz_f6arur7 | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-miami-vvg1vz_6knubnj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-miami-vvg1vz_6r8_upj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-baltimore-1a4zkosgf76zecv | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-boston-vv177z_6gkrmuczn | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-newark-vv1aezkosgketdd_b | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-brooklyn-1ayzkosgkdghkeg | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-brooklyn-1adzz_6gktq1p0z | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-belmont-park-15dzz_619b3pj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-glendale-z7r9jz1a7jm | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-nashville-z7r9jz1a7js | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-milwaukee-0700632fb5d7362c | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-chicago-04006331fcb85a8a | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-denver-1e006330c3b936ad | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-las-vegas-1700632f29ecabed | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-san-diego-0a006331da303659 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-seattle-0f00632ea04f19df | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-inglewood-0a006331dc273765 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-minneapolis-0600632e29196b3e | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-toronto-1000632fe9bb4345 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-toronto-1000632fe9c34349 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-detroit-0800632ca3272367 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-east-rutherford-00006331cc3a2a14 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-east-rutherford-00006331cecb2b77 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-philadelphia-02006331ed9c6125 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-foxborough-0100632fcae52e03 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-foxborough-01006331f67e74d9 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-indianapolis-050063299afd15f3 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-arlington-z7r9jz1a7jw | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-dallas-vvg1yz_dphg_3m | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-austin-g5diz_dpyyjel | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-los-angeles-g5eyz_dpcrysi | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-oakland-g5vyz_dptbovy | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-seattle-vvg1hz_d9kqqkt | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-vancouver-1f78v0uvf8z7g576 | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-madrid-z698xz2qz16ezdbsgk | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-madrid-z698xz2qz16ez94-rv | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-arlington-z7r9jz1a7ooui | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-arlington-z7r9jz1a7oout | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-toronto-1avzz_egkicklrr | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-marseille-z7r9jz1a7baxb | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-philadelphia-17gzv0g6gp0_67j | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lbbzt | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-washington-17a8v0g6gknsol1 | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-san-diego-vvg1iz_gpnxmrx | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-inglewood-vvg10z_g9gehi7 | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rosalia-2026-oakland-g5vyzbumkyr1f | rosalia | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-chicago-vvg18z_uroiect | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-inglewood-vvg1iz_gntjqqm | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-san-francisco-g5vyzbs0ua9tw | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-inglewood-vv170zbsgkihfzey | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-phoenix-1av0zbsgknh-n_z | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-atlanta-vvg1zz_fxet19l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-sunrise-z7r9jz1a7x8vw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-charlotte-g5evz_fneqevn | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-nashville-g5viz_fja3nq8 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-saint-louis-vv1akzk3fgkey5tam | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-kansas-city-vv1kbz_fjfg7wetj | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-minneapolis-vv1akzk3agkeivme6 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-washington-1a4zk3vgkd85lni | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-austin-g5diz_fxgrqaf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-fort-worth-vvg1yz_flxlbcf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-portland-vvg1hz_fbodkr9 | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-phoenix-17k8v0g61tfaez1 | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | latto | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-new-york-k7vgf_uedf3n_ | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-montreal-17g8v0g6gp5n0pn | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-toronto-177zv0g6g9hzrkw | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-minneapolis-z7r9jz1a7pko4 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-englewood-z7r9jz1a7p-ji | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-oakland-g5vyz_gfww-6g | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-san-diego-vvg1iz_gcici-d | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-phoenix-17k8v0g6g538qi9 | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gcgtrwf | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpovtcx | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpomy2y | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9nqcx | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-denver-z7r9jz1a7pu0p | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rez72a62 | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rez72afa | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-salt-lake-city-z7r9jz1aaef49 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-def-leppard-2026-hollywood-vvg1vz_5sqbrak | def-leppard | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-san-francisco-z7r9jz1a70i80 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70uao | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-tucson-z7r9jz1a70ioy | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-dallas-vvg1yz_1tobhle | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-houston-g5diz_1ucylhw | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-nashville-g5viz_1mfi-bc | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-washington-17a8v0g61sa7y8c | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-new-york-z7r9jz1a70u7_ | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-brooklyn-z7r9jz1a70uez | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-tampa-vvg1vz_8uxpnex | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-nashville-g5viz_141b_9f | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-louisville-z7r9jz1a70f_w | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-baltimore-17a8v0g61kp2ris | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-newark-vvg1fz_197dnkr | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-providence-vvg17z_1fuwpyc | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-detroit-vvg1oz_13slngw | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-boston-vvg17z_19ipadt | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1cz73 | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-des-moines-z7r9jz1a7pwkk | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-saint-paul-z7r9jz1a7ppo7 | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-oakland-z7r9jz1a70kkf | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_awrtnmb | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-kansas-city-vvg1bz_5nc5gbq | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-los-angeles-z7r9jz1a70yjs | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-san-diego-vvg1iz_5_l1ogs | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | bryson-tiller | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-houston-g5diz_53je_pf | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-chicago-vvg18z_1mip6i3 | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-salt-lake-city-z7r9jz1a70jp0 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5k9t5fo | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5kbz5fl | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-hollywood-vvg10z_5rao7bc | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-houston-z7r9jz1a7x73v | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-miami-vvg1vz_fchiqhv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-orlando-1axzk3dgkeha7uv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-atlanta-vvg1zz_f1gfmts | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-charlotte-g5evz_fffmq2n | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-philadelphia-1ayzk3egkdcdzmm | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-brooklyn-16dzz_f13g7dsys | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-buffalo-k7vgf_dh65dyo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-tampa-vvg1vz_km8pku0 | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-orlando-1aefz_kgkwoqkla | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-knoxville-z7r9jz1a7-yuw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-cary-z7r9jz1a7-y8f | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-charlotte-g5evz_kjjq1qk | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-savannah-vvg1zz_kjxemhw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-estero-vvg1vz_kjvgfqs | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-tampa-vvg1vz_3nvhqgr | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-stamford-g5vvz_axiecx- | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-cincinnati-1apzko9gkelizys | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-chicago-vvg1jz_2brfg7b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-indianapolis-vvg1fz_2rfzpki | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-cincinnati-17aov0g62qly9ie | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-park-city-vvg1bz_135gz80 | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-oklahoma-city-vvg1yz_13ofzsb | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-austin-g5diz_uux5j8i | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-irving-vvg1yz_g0p_mts | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-houston-g5diz_geaxmd2 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-orlando-17fov0g6g3w_f1c | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-fort-lauderdale-z7r9jz1a7ppo0 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
