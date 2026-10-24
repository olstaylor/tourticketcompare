# SeatGeek CTA verification log

Generated: 2026-10-23T21:44:37.701Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1810 (needs_recheck: 793, provenance backfill: 5, stale re-check: 1496)
- Events skipped before API checks: 253
- API calls made: 800
- Verified provenance written: 456
- URLs added: 25
- URLs corrected: 0
- URLs cleared: 5
- Provenance un-verified: 0
- Conflicts (ambiguous, untouched): 3
- No qualifying listing: 306
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | verify (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | pink-martini | verify (applied) | 18500192 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-06-7-30-pm/concert/18500192 | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | blue-october | verify (applied) | 18262264 | https://seatgeek.com/blue-october-tickets/denver-colorado-mission-ballroom-2027-03-06-8-pm/concert/18262264 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | verify (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | blue-october | verify (applied) | 18306113 | https://seatgeek.com/blue-october-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-07-8-pm/concert/18306113 | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | blondshell | verify (applied) | 18251042 | https://seatgeek.com/blondshell-tickets/seattle-washington-showbox-sodo-2027-03-07-8-pm/concert/18251042 | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | sylvan-esso | verify (applied) | 18299178 | https://seatgeek.com/sylvan-esso-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-08-8-pm/concert/18299178 | - |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | vnv-nation | verify (applied) | 18659523 | https://seatgeek.com/vnv-nation-tickets/nashville-tennessee-exit-in-2027-03-09-8-pm/concert/18659523 | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | chelsea-cutler | verify (applied) | 18639209 | https://seatgeek.com/chelsea-cutler-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-09-7-pm/concert/18639209 | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | the-lemonheads | verify (applied) | 18595335 | https://seatgeek.com/the-lemonheads-tickets/portland-oregon-hawthorne-theatre-2027-03-10-7-pm/concert/18595335 | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | blue-october | verify (applied) | 18343763 | https://seatgeek.com/blue-october-tickets/chicago-illinois-riviera-theatre-chicago-2027-03-11-8-pm/concert/18343763 | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | yuridia | verify (applied) | 18570402 | https://seatgeek.com/yuridia-tickets/sugar-land-texas-smart-financial-centre-2027-03-11-8-pm/concert/18570402 | - |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | sylvan-esso | verify (applied) | 18299183 | https://seatgeek.com/sylvan-esso-tickets/new-orleans-louisiana-tipitina-s-2027-03-11-8-pm/concert/18299183 | - |
| tm-the-lemonheads-2027-seattle-z7r9jz1aa79u7 | the-lemonheads | verify (applied) | 18595337 | https://seatgeek.com/the-lemonheads-tickets/seattle-washington-el-corazon-2027-03-11-7-pm/concert/18595337 | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | morat | verify (applied) | 18259792 | https://seatgeek.com/morat-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-03-12-8-pm/concert/18259792 | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | blondshell | verify (applied) | 18251049 | https://seatgeek.com/blondshell-tickets/chicago-illinois-vic-theatre-chicago-2027-03-12-8-pm/concert/18251049 | - |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | fantasia | verify (applied) | 18643133 | https://seatgeek.com/fantasia-tickets/houston-texas-toyota-center-2027-03-12-8-pm/concert/18643133 | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | chelsea-cutler | verify (applied) | 18639214 | https://seatgeek.com/chelsea-cutler-tickets/seattle-washington-showbox-sodo-2027-03-12-7-pm/concert/18639214 | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | tobymac | verify (applied) | 18548874 | https://seatgeek.com/tobymac-tickets/lubbock-texas-united-supermarkets-arena-2027-03-13-7-pm/concert/18548874 | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | morat | verify (applied) | 18259793 | https://seatgeek.com/morat-tickets/sugar-land-texas-smart-financial-centre-2027-03-13-8-pm/concert/18259793 | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | chelsea-cutler | verify (applied) | 18639215 | https://seatgeek.com/chelsea-cutler-tickets/portland-oregon-roseland-theater-2027-03-13-7-pm/concert/18639215 | - |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | vnv-nation | verify (applied) | 17912521 | https://seatgeek.com/vnv-nation-tickets/atlanta-georgia-variety-playhouse-2027-03-14-8-pm/concert/17912521 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | death-cab-for-cutie | verify (applied) | 18604670 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-14-8-pm/concert/18604670 | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | blondshell | verify (applied) | 18251054 | https://seatgeek.com/blondshell-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-14-8-pm/concert/18251054 | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | the-lemonheads | verify (applied) | 18595343 | https://seatgeek.com/the-lemonheads-tickets/englewood-colorado-gothic-theatre-2027-03-14-8-30-pm/concert/18595343 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | death-cab-for-cutie | verify (applied) | 18604671 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-15-8-pm/concert/18604671 | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | rod-stewart | verify (applied) | 18603490 | https://seatgeek.com/rod-stewart-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-16-7-30-pm/concert/18603490 | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | the-lemonheads | verify (applied) | 18595344 | https://seatgeek.com/the-lemonheads-tickets/omaha-nebraska-the-waiting-room-omaha-2027-03-16-7-pm/concert/18595344 | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | death-cab-for-cutie | verify (applied) | 18604673 | https://seatgeek.com/death-cab-for-cutie-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-17-7-pm/concert/18604673 | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | valley | verify (applied) | 18643169 | https://seatgeek.com/valley-tickets/new-york-new-york-webster-hall-2027-03-17-8-pm/concert/18643169 | - |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | niall-horan | verify (applied) | 18235523 | https://seatgeek.com/niall-horan-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-17-7-30-pm/concert/18235523 | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | michelle-branch | verify (applied) | 18650112 | https://seatgeek.com/michelle-branch-tickets/denver-colorado-mission-ballroom-2027-03-17-8-pm/concert/18650112 | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | too-many-zooz | verify (applied) | 18612556 | https://seatgeek.com/too-many-zooz-tickets/colorado-springs-colorado-black-sheep-2027-03-17-8-pm/concert/18612556 | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | vnv-nation | verify (applied) | 18165972 | https://seatgeek.com/vnv-nation-tickets/mesa-arizona-nile-theater-mesa-2027-03-18-8-pm/concert/18165972 | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | yuridia | verify (applied) | 18570410 | https://seatgeek.com/yuridia-tickets/edinburg-texas-bert-ogden-arena-2027-03-19-8-pm/concert/18570410 | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | hans-zimmer | verify (applied) | 18601968 | https://seatgeek.com/hans-zimmer-tickets/kansas-city-missouri-t-mobile-center-2027-03-19-8-pm/concert/18601968 | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | michelle-branch | verify (applied) | 18508844 | https://seatgeek.com/michelle-branch-tickets/columbus-ohio-kemba-live-2027-03-20-8-pm/concert/18508844 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | verify (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | michelle-branch | verify (applied) | 18508847 | https://seatgeek.com/michelle-branch-tickets/royal-oak-michigan-royal-oak-music-theatre-2027-03-21-7-pm/concert/18508847 | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | verify (applied) | 18670185 | https://seatgeek.com/pink-martini-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-21-7-30-pm/concert/18670185 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | death-cab-for-cutie | verify (applied) | 18604672 | https://seatgeek.com/death-cab-for-cutie-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-24-8-pm/concert/18604672 | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | the-psychedelic-furs | verify (applied) | 18592690 | https://seatgeek.com/the-psychedelic-furs-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-25-8-pm/concert/18592690 | - |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | death-cab-for-cutie | verify (applied) | 18604674 | https://seatgeek.com/death-cab-for-cutie-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-03-26-7-30-pm/concert/18604674 | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | staind | verify (applied) | 18655524 | https://seatgeek.com/staind-tickets/spokane-washington-numerica-veterans-arena-2027-03-26-6-pm/concert/18655524 | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | vnv-nation | verify (applied) | 18662604 | https://seatgeek.com/vnv-nation-tickets/salt-lake-city-utah-the-grand-at-the-complex-2027-03-26-7-30-pm/concert/18662604 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | verify (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | yuridia | verify (applied) | 18570411 | https://seatgeek.com/yuridia-tickets/brooklyn-new-york-kings-theatre-brooklyn-2027-03-27-8-pm/concert/18570411 | - |
| tm-def-leppard-2027-minneapolis-z7r9jz1aa7eoa | def-leppard | verify (applied) | 18662396 | https://seatgeek.com/def-leppard-tickets/minneapolis-minnesota-target-center-2027-03-27-7-pm/concert/18662396 | - |
| tm-michelle-branch-2027-philadelphia-z7r9jz1aazyqb | michelle-branch | verify (applied) | 18508855 | https://seatgeek.com/michelle-branch-tickets/philadelphia-pennsylvania-franklin-music-hall-2027-03-27-8-30-pm/concert/18508855 | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | death-cab-for-cutie | verify (applied) | 18604675 | https://seatgeek.com/death-cab-for-cutie-tickets/huntsville-alabama-orion-amphitheater-2027-03-27-8-pm/concert/18604675 | - |
| tm-hans-zimmer-2027-salt-lake-city-z7r9jz1aavvqa | hans-zimmer | verify (applied) | 18415275 | https://seatgeek.com/hans-zimmer-tickets/salt-lake-city-utah-delta-center-1-2027-03-27-7-30-pm/concert/18415275 | - |
| tm-vnv-nation-2027-omaha-z7r9jz1a7q0ef | vnv-nation | verify (applied) | 18357653 | https://seatgeek.com/vnv-nation-tickets/omaha-nebraska-slowdown-2027-03-29-8-pm/concert/18357653 | - |
| tm-nickelback-2027-saint-paul-z7r9jz1aa774k | nickelback | verify (applied) | 18655421 | https://seatgeek.com/nickelback-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-30-6-30-pm/concert/18655421 | - |
| tm-dylan-gossett-2027-chattanooga-z7r9jz1aae4bi | dylan-gossett | verify (applied) | 18642078 | https://seatgeek.com/dylan-gossett-tickets/chattanooga-tennessee-the-signal-2027-03-30-7-pm/concert/18642078 | - |
| tm-def-leppard-2027-salt-lake-city-z7r9jz1aa7eo3 | def-leppard | verify (applied) | 18274784 | https://seatgeek.com/def-leppard-tickets/salt-lake-city-utah-delta-center-1-2027-03-31-7-pm/concert/18274784 | - |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | death-cab-for-cutie | verify (applied) | 18604682 | https://seatgeek.com/death-cab-for-cutie-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-04-01-8-pm/concert/18604682 | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | warren-zeiders | verify (applied) | 18649741 | https://seatgeek.com/warren-zeiders-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-04-01-7-pm/concert/18649741 | - |
| tm-vnv-nation-2027-chicago-z7r9jz1a7pupm | vnv-nation | verify (applied) | 18159984 | https://seatgeek.com/vnv-nation-tickets/chicago-illinois-metro-chicago-2027-04-01-8-pm/concert/18159984 | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | riley-green | verify (applied) | 18626511 | https://seatgeek.com/riley-green-tickets/spokane-washington-numerica-veterans-arena-2027-04-01-7-pm/concert/18626511 | - |
| tm-hans-zimmer-2027-los-angeles-z7r9jz1aavvq8 | hans-zimmer | verify (applied) | 18601970 | https://seatgeek.com/hans-zimmer-tickets/los-angeles-california-crypto-com-arena-2027-04-01-7-30-pm/concert/18601970 | - |
| tm-nothing-but-thieves-2027-portland-z7r9jz1a70gfm | nothing-but-thieves | verify (applied) | 18266341 | https://seatgeek.com/nothing-but-thieves-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-01-8-pm/concert/18266341 | - |
| tm-dylan-gossett-2027-fayetteville-z7r9jz1aae4bt | dylan-gossett | verify (applied) | 18642083 | https://seatgeek.com/dylan-gossett-tickets/fayetteville-arkansas-ozark-music-hall-2027-04-02-7-pm/concert/18642083 | - |
| tm-the-psychedelic-furs-2027-nashville-z7r9jz1aavpq_ | the-psychedelic-furs | verify (applied) | 18592665 | https://seatgeek.com/the-psychedelic-furs-tickets/nashville-tennessee-ryman-auditorium-2027-04-02-8-pm/concert/18592665 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | harry-styles | verify (applied) | 18570444 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-02-7-45-pm/concert/18570444 | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | luke-combs | verify (applied) | 18379496 | https://seatgeek.com/luke-combs-tickets/arlington-texas-at-t-stadium-2027-04-03-5-20-pm/concert/18379496 | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | staind | verify (applied) | 18655681 | https://seatgeek.com/staind-tickets/billings-montana-first-interstate-arena-2027-04-03-6-pm/concert/18655681 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | harry-styles | verify (applied) | 18577793 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-03-7-45-pm/concert/18577793 | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | the-psychedelic-furs | verify (applied) | 18592691 | https://seatgeek.com/the-psychedelic-furs-tickets/tallahassee-florida-the-moon-2027-04-07-7-30-pm/concert/18592691 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | the-psychedelic-furs | verify (applied) | 18592671 | https://seatgeek.com/the-psychedelic-furs-tickets/saint-petersburg-florida-jannus-live-2027-04-08-8-pm/concert/18592671 | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | dylan-gossett | verify (applied) | 18642098 | https://seatgeek.com/dylan-gossett-tickets/columbus-ohio-kemba-live-2027-04-08-7-pm/concert/18642098 | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | verify (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | harry-styles | verify (applied) | 18516103 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-09-7-45-pm/concert/18516103 | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | nothing-but-thieves | verify (applied) | 18266350 | https://seatgeek.com/nothing-but-thieves-tickets/denver-colorado-mission-ballroom-2027-04-09-8-pm/concert/18266350 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | earth-wind-fire | verify (applied) | 18664856 | https://seatgeek.com/earth-wind-fire-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-14-7-30-pm/concert/18664856 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | verify (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | verify (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | verify (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | too-many-zooz | verify (applied) | 18646948 | https://seatgeek.com/too-many-zooz-tickets/vancouver-canada-the-pearl-bc-2027-05-15-7-pm/concert/18646948 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | cece-winans | verify (applied) | 18089916 | https://seatgeek.com/cece-winans-tickets/duluth-georgia-gas-south-arena-2026-10-23-7-pm/concert/18089916 | - |
| tm-gavin-adcock-2026-knoxville-z7r9jz1a7-yuw | gavin-adcock | add (applied) | 18131595 | https://seatgeek.com/gavin-adcock-tickets/knoxville-tennessee-knoxville-civic-auditorium-and-coliseum-2026-10-23-7-pm/concert/18131595 | - |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-cary-z7r9jz1a7-y8f | gavin-adcock | add (applied) | 18131597 | https://seatgeek.com/gavin-adcock-tickets/cary-north-carolina-koka-booth-amphitheatre-2026-10-24-7-pm/concert/18131597 | - |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | verify (applied) | 18240136 | https://seatgeek.com/katseye-tickets/elmont-new-york-ubs-arena-2026-10-24-8-pm/concert/18240136 | - |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | cece-winans | verify (applied) | 18089898 | https://seatgeek.com/cece-winans-tickets/new-orleans-louisiana-smoothie-king-center-2026-10-24-7-pm/concert/18089898 | - |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-katseye-2026-belmont-park-17gzv0g61mqmkdg | katseye | verify (applied) | 18259103 | https://seatgeek.com/katseye-tickets/elmont-new-york-ubs-arena-2026-10-25-8-pm/concert/18259103 | - |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | cece-winans | verify (applied) | 18090034 | https://seatgeek.com/cece-winans-tickets/orlando-florida-addition-financial-arena-2026-10-27-7-pm/concert/18090034 | - |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | cece-winans | verify (applied) | 18089897 | https://seatgeek.com/cece-winans-tickets/north-charleston-south-carolina-north-charleston-coliseum-2026-10-28-7-pm/concert/18089897 | - |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | cece-winans | verify (applied) | 18090040 | https://seatgeek.com/cece-winans-tickets/tampa-florida-yuengling-center-2026-10-29-7-pm/concert/18090040 | - |
| tm-the-airborne-toxic-event-2026-chicago-z7r9jz1a70iqs | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | add (applied) | 18235908 | https://seatgeek.com/the-smashing-pumpkins-tickets/salt-lake-city-utah-delta-center-1-2026-10-29-8-pm/concert/18235908 | - |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | cece-winans | verify (applied) | 18089908 | https://seatgeek.com/cece-winans-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-10-30-7-pm/concert/18089908 | - |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | verify (applied) | 18240166 | https://seatgeek.com/katseye-tickets/montreal-canada-centre-bell-2026-10-30-8-pm/concert/18240166 | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | verify (applied) | 18240168 | https://seatgeek.com/katseye-tickets/hamilton-canada-td-coliseum-2026-11-01-8-pm/concert/18240168 | - |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | conflict | - | - | ambiguous: 3 qualifying SeatGeek events in the window |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | karan-aujla | verify (applied) | 18592286 | https://seatgeek.com/karan-aujla-tickets/sacramento-california-golden-1-center-2026-11-07-8-pm/concert/18592286 | - |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | karan-aujla | verify (applied) | 18592285 | https://seatgeek.com/karan-aujla-tickets/los-angeles-california-crypto-com-arena-2026-11-09-8-pm/concert/18592285 | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | add (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | karan-aujla | verify (applied) | 18592287 | https://seatgeek.com/karan-aujla-tickets/dallas-texas-american-airlines-center-2026-11-13-8-pm/concert/18592287 | - |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | add (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | verify (applied) | 18706524 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-15-2-pm/concert/18706524 | - |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | karan-aujla | verify (applied) | 18592290 | https://seatgeek.com/karan-aujla-tickets/atlanta-georgia-state-farm-arena-1-2026-11-16-8-pm/concert/18592290 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | karan-aujla | verify (applied) | 18592288 | https://seatgeek.com/karan-aujla-tickets/new-york-new-york-madison-square-garden-2026-11-18-8-pm/concert/18592288 | - |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | karan-aujla | verify (applied) | 18592289 | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2026-11-20-8-pm/concert/18592289 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | add (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | add (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | add (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | add (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | add (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | cece-winans | verify (applied) | 18361599 | https://seatgeek.com/cece-winans-tickets/seattle-washington-wamu-theater-2026-12-10-7-pm/concert/18361599 | - |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | add (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | add (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | cece-winans | verify (applied) | 18361639 | https://seatgeek.com/cece-winans-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-15-7-pm/concert/18361639 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | add (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | add (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | cece-winans | verify (applied) | 18361612 | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 | - |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | eagles | verify (applied) | 18701672 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-08-7-pm/concert/18701672 | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | eagles | verify (applied) | 18701674 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-09-8-30-pm/concert/18701674 | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-charleston-g5evz_kbudulq | chelsea-cutler | verify (applied) | 18639170 | https://seatgeek.com/chelsea-cutler-tickets/charleston-south-carolina-charleston-music-hall-2027-02-01-8-pm/concert/18639170 | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-toronto-1avzz_kgkstt7dw | chelsea-cutler | verify (applied) | 18639184 | https://seatgeek.com/chelsea-cutler-tickets/toronto-canada-history-2027-02-16-7-pm/concert/18639184 | - |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt | backstreet-boys | verify (applied) | 18652782 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-21-8-pm/concert/18652782 | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | add (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7-cha | backstreet-boys | verify (applied) | 18657825 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-26-8-pm/concert/18657825 | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-needtobreathe-2027-cincinnati-1kaovpgtgauok5q | needtobreathe | verify (applied) | 18621538 | https://seatgeek.com/needtobreathe-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-02-27-7-pm/concert/18621538 | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-bethlehem-vv1aovpg_ga5ljzy | daughtry | verify (applied) | 18632933 | https://seatgeek.com/daughtry-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-02-27-8-pm/concert/18632933 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7xqhp | backstreet-boys | verify (applied) | 18657827 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-27-8-pm/concert/18657827 | - |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | mico | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | cece-winans | add (applied) | 18237649 | https://seatgeek.com/cece-winans-tickets/nashville-tennessee-grand-ole-opry-house-2027-03-21-7-30-pm/concert/18237649 | - |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-lexington-1apzk4egkdqsq_b | gavin-adcock | verify (applied) | 18674497 | https://seatgeek.com/gavin-adcock-tickets/lexington-kentucky-gatton-park-1-2027-04-01-7-30-pm/concert/18674497 | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-salem-vv1avzk4kgkdddflu | gavin-adcock | verify (applied) | 18672827 | https://seatgeek.com/gavin-adcock-tickets/salem-virginia-salem-civic-center-2027-04-29-7-30-pm/concert/18672827 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-indianapolis-vv17fz_fgkwtxpko | zach-bryan | verify (applied) | 18686628 | https://seatgeek.com/zach-bryan-tickets/indianapolis-indiana-lucas-oil-stadium-2027-05-01-7-pm/concert/18686628 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | add (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-interrupters-2027-san-diego-vvg1iz_4zg9ez5 | the-interrupters | verify (applied) | 18703225 | https://seatgeek.com/the-interrupters-tickets/san-diego-california-soma-san-diego-2027-05-01-6-pm/concert/18703225 | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-green-bay-vv17jz_fgkshdkie | zach-bryan | verify (applied) | 18686626 | https://seatgeek.com/zach-bryan-tickets/green-bay-wisconsin-lambeau-field-2027-05-04-7-pm/concert/18686626 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | add (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | add (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | gavin-adcock | verify (applied) | 18674403 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-white-oak-music-hall-lawn-2027-05-08-6-pm/concert/18674403 | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | add (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | add (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fsxrnwp | zach-bryan | verify (applied) | 18686627 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-14-7-pm/concert/18686627 | - |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | gavin-adcock | verify (applied) | 18672973 | https://seatgeek.com/gavin-adcock-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-05-14-7-pm/concert/18672973 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fs0cbhd | zach-bryan | verify (applied) | 18686631 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-15-7-pm/concert/18686631 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | add (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | add (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | zach-bryan | verify (applied) | 18686630 | https://seatgeek.com/zach-bryan-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-05-25-7-pm/concert/18686630 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | add (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | add (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | zach-bryan | verify (applied) | 18686629 | https://seatgeek.com/zach-bryan-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-29-7-pm/concert/18686629 | - |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | zach-bryan | verify (applied) | 18686638 | https://seatgeek.com/zach-bryan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-02-7-pm/concert/18686638 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | riley-green | verify (applied) | 18626534 | https://seatgeek.com/riley-green-tickets/brandon-mississippi-brandon-amphitheater-2027-06-03-7-pm/concert/18626534 | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | flans | verify (applied) | 18612662 | https://seatgeek.com/flans-tickets/san-jose-california-san-jose-civic-2027-06-03-8-pm/concert/18612662 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | def-leppard | verify (applied) | 18662432 | https://seatgeek.com/def-leppard-tickets/milwaukee-wisconsin-fiserv-forum-2027-06-05-7-pm/concert/18662432 | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | def-leppard | verify (applied) | 18662436 | https://seatgeek.com/def-leppard-tickets/louisville-kentucky-kfc-yum-center-2027-06-09-7-pm/concert/18662436 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | a-perfect-circle | verify (applied) | 18632558 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-10-8-pm/concert/18632558 | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | a-perfect-circle | verify (applied) | 18632560 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-11-8-pm/concert/18632560 | - |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-austin-g5diz_kepkpyq | hazlett | verify (applied) | 18311909 | https://seatgeek.com/hazlett-tickets/austin-texas-scoot-inn-2027-06-12-7-pm/concert/18311909 | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | luke-combs | verify (applied) | 18493400 | https://seatgeek.com/luke-combs-tickets/boise-idaho-albertsons-stadium-2027-06-12-5-45-pm/concert/18493400 | - |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | kenny-chesney | verify (applied) | 18592002 | https://seatgeek.com/kenny-chesney-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-19-4-30-pm/concert/18592002 | - |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | riley-green | verify (applied) | 18626537 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-25-7-pm/concert/18626537 | - |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | zac-brown-band | verify (applied) | 18571701 | https://seatgeek.com/zac-brown-band-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-06-25-7-pm/concert/18571701 | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | riley-green | verify (applied) | 18639003 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-26-7-pm/concert/18639003 | - |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | greta-van-fleet | verify (applied) | 18642001 | https://seatgeek.com/greta-van-fleet-tickets/vancouver-canada-rogers-arena-2027-07-05-7-pm/concert/18642001 | - |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | kenny-chesney | verify (applied) | 18592004 | https://seatgeek.com/kenny-chesney-tickets/milwaukee-wisconsin-american-family-field-2027-07-10-4-30-pm/concert/18592004 | - |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | riley-green | verify (applied) | 18626571 | https://seatgeek.com/riley-green-tickets/syracuse-new-york-empower-fcu-amphitheater-at-lakeview-2027-07-15-7-pm/concert/18626571 | - |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | riley-green | verify (applied) | 18626541 | https://seatgeek.com/riley-green-tickets/allentown-pennsylvania-ppl-center-2027-07-16-7-pm/concert/18626541 | - |
| tm-zach-bryan-2027-las-vegas-1avjz_fgkwbrzg6 | zach-bryan | clear (applied) | - | - | stored URL failed: event instants differ by -19.0h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | kenny-chesney | verify (applied) | 18592005 | https://seatgeek.com/kenny-chesney-tickets/denver-colorado-empower-field-at-mile-high-2027-07-17-4-30-pm/concert/18592005 | - |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | greta-van-fleet | verify (applied) | 18642014 | https://seatgeek.com/greta-van-fleet-tickets/raleigh-north-carolina-lenovo-center-2027-07-20-7-pm/concert/18642014 | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | zach-bryan | verify (applied) | 18686642 | https://seatgeek.com/zach-bryan-tickets/inglewood-california-sofi-stadium-2027-07-20-7-pm/concert/18686642 | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | greta-van-fleet | verify (applied) | 18642019 | https://seatgeek.com/greta-van-fleet-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-21-7-pm/concert/18642019 | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | riley-green | verify (applied) | 18626543 | https://seatgeek.com/riley-green-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-22-7-pm/concert/18626543 | - |
| tm-the-red-clay-strays-2027-bangor-vv1f7z_kqaonzdc55 | the-red-clay-strays | verify (applied) | 18639094 | https://seatgeek.com/the-red-clay-strays-tickets/bangor-maine-maine-savings-amphitheater-2027-07-23-7-pm/concert/18639094 | - |
| tm-greta-van-fleet-2027-hershey-vv17fz_kgkdofs3p | greta-van-fleet | verify (applied) | 18642020 | https://seatgeek.com/greta-van-fleet-tickets/hershey-pennsylvania-giant-center-2027-07-23-7-pm/concert/18642020 | - |
| tm-riley-green-2027-bethel-k7vgf_kkxvsto | riley-green | verify (applied) | 18626545 | https://seatgeek.com/riley-green-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-23-7-pm/concert/18626545 | - |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-kansas-city-vv1akzkfxgkdkijos | kenny-chesney | verify (applied) | 18592006 | https://seatgeek.com/kenny-chesney-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-07-24-4-30-pm/concert/18592006 | - |
| tm-greta-van-fleet-2027-uncasville-g5vvz_kwzs711 | greta-van-fleet | verify (applied) | 18642023 | https://seatgeek.com/greta-van-fleet-tickets/uncasville-connecticut-mohegan-sun-arena-2027-07-24-7-pm/concert/18642023 | - |
| tm-zach-bryan-2027-seattle-vvg1hz_fytloed | zach-bryan | verify (applied) | 18686643 | https://seatgeek.com/zach-bryan-tickets/seattle-washington-lumen-field-2027-07-24-7-pm/concert/18686643 | - |
| tm-zach-bryan-2027-vancouver-1k78vp4fgacgpjm | zach-bryan | verify (applied) | 18711212 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-27-7-pm/concert/18711212 | - |
| tm-greta-van-fleet-2027-laval-1ad7z_kgksakup4 | greta-van-fleet | verify (applied) | 18642026 | https://seatgeek.com/greta-van-fleet-tickets/laval-canada-place-bell-2027-07-28-7-pm/concert/18642026 | - |
| tm-zach-bryan-2027-vancouver-1av7z_fgks885w5 | zach-bryan | verify (applied) | 18686647 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-28-7-pm/concert/18686647 | - |
| tm-riley-green-2027-evansville-vv16azkfwxpza8acgv | riley-green | verify (applied) | 18626548 | https://seatgeek.com/riley-green-tickets/evansville-indiana-ford-center-in-2027-07-29-7-pm/concert/18626548 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-grand-rapids-vv17oz_kgkwlsfog | greta-van-fleet | verify (applied) | 18642031 | https://seatgeek.com/greta-van-fleet-tickets/grand-rapids-acrisure-amphitheater-2027-07-31-7-pm/concert/18642031 | - |
| tm-zach-bryan-2027-edmonton-16v7z_43bg7l9tm | zach-bryan | verify (applied) | 18711213 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-07-31-6-30-pm/concert/18711213 | - |
| tm-zach-bryan-2027-edmonton-1av7z_fgkw2fvlh | zach-bryan | verify (applied) | 18686646 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-08-01-6-30-pm/concert/18686646 | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | leon-bridges | verify (applied) | 18662714 | https://seatgeek.com/leon-bridges-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-12-7-pm/concert/18662714 | - |
| tm-kenny-chesney-2027-detroit-vv17oz_8gkmnwpji | kenny-chesney | verify (applied) | 18592016 | https://seatgeek.com/kenny-chesney-tickets/detroit-michigan-ford-field-2027-08-14-4-30-pm/concert/18592016 | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | leon-bridges | verify (applied) | 18662721 | https://seatgeek.com/leon-bridges-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-08-17-7-30-pm/concert/18662721 | - |
| tm-kenny-chesney-2027-charlotte-g5evz_3c19bfo | kenny-chesney | verify (applied) | 18592015 | https://seatgeek.com/kenny-chesney-tickets/charlotte-north-carolina-bank-of-america-stadium-2027-08-21-4-30-pm/concert/18592015 | - |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | leon-bridges | verify (applied) | 18662725 | https://seatgeek.com/leon-bridges-tickets/bonner-montana-kettlehouse-amphitheater-2027-08-21-8-pm/concert/18662725 | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | leon-bridges | verify (applied) | 18662729 | https://seatgeek.com/leon-bridges-tickets/waukee-iowa-vibrant-music-hall-2027-08-25-7-30-pm/concert/18662729 | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | leon-bridges | verify (applied) | 18662730 | https://seatgeek.com/leon-bridges-tickets/indianapolis-indiana-everwise-amphitheater-at-white-river-state-park-2027-08-26-7-30-pm/concert/18662730 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | leon-bridges | verify (applied) | 18662733 | https://seatgeek.com/leon-bridges-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-09-15-7-30-pm/concert/18662733 | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | leon-bridges | verify (applied) | 18662735 | https://seatgeek.com/leon-bridges-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-09-17-7-30-pm/concert/18662735 | - |
| tm-leon-bridges-2027-rogers-g5viz_kpps1qm | leon-bridges | verify (applied) | 18662739 | https://seatgeek.com/leon-bridges-tickets/rogers-arkansas-walmart-amp-2027-09-23-7-30-pm/concert/18662739 | - |
| tm-leon-bridges-2027-phoenix-1a_zk4kgkdlzjqa | leon-bridges | verify (applied) | 18662746 | https://seatgeek.com/leon-bridges-tickets/phoenix-arizona-arizona-financial-theatre-2027-09-29-7-30-pm/concert/18662746 | - |
| tm-eros-ramazzotti-2027-new-york-g5dyz_ou7is1y | eros-ramazzotti | verify (applied) | 18551701 | https://seatgeek.com/eros-ramazzotti-tickets/new-york-new-york-radio-city-music-hall-2027-10-02-8-pm/concert/18551701 | - |
| tm-eros-ramazzotti-2027-rosemont-vv1a7zk1egkeidoc0 | eros-ramazzotti | verify (applied) | 17481908 | https://seatgeek.com/eros-ramazzotti-tickets/rosemont-illinois-rosemont-theatre-2027-10-05-8-pm/concert/17481908 | - |
| tm-eros-ramazzotti-2027-miami-vvg1vzbicfi7sa | eros-ramazzotti | verify (applied) | 17481804 | https://seatgeek.com/eros-ramazzotti-tickets/miami-florida-kaseya-center-2027-10-08-8-pm/concert/17481804 | - |
| tm-hilary-duff-2027-hershey-vv1aezkfugkempa0j | hilary-duff | verify (applied) | 18613394 | https://seatgeek.com/hilary-duff-tickets/hershey-pennsylvania-giant-center-2027-10-09-7-30-pm/concert/18613394 | - |
| tm-hilary-duff-2027-buffalo-k7vgf_k9lboi8 | hilary-duff | verify (applied) | 18613395 | https://seatgeek.com/hilary-duff-tickets/buffalo-new-york-keybank-center-2027-10-11-7-30-pm/concert/18613395 | - |
| tm-eros-ramazzotti-2027-inglewood-vvg1izbiyf5ko0 | eros-ramazzotti | verify (applied) | 17482180 | https://seatgeek.com/eros-ramazzotti-tickets/inglewood-california-youtube-theater-2027-10-16-8-pm/concert/17482180 | - |
| tm-hilary-duff-2027-san-antonio-g5diz_kh8lc6s | hilary-duff | verify (applied) | 18613404 | https://seatgeek.com/hilary-duff-tickets/san-antonio-texas-frost-bank-center-2027-11-05-7-30-pm/concert/18613404 | - |
| tm-hilary-duff-2027-omaha-vv1akzkfggkdletyo | hilary-duff | verify (applied) | 18613409 | https://seatgeek.com/hilary-duff-tickets/omaha-nebraska-chi-health-center-omaha-2027-11-10-7-30-pm/concert/18613409 | - |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | verify (applied) | 18128391 | https://seatgeek.com/lil-wayne-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2026-10-23-8-pm/concert/18128391 | - |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | verify (applied) | 18613386 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-23-8-pm/concert/18613386 | - |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | verify (applied) | 18285544 | https://seatgeek.com/zach-top-tickets/lafayette-louisiana-cajundome-2026-10-23-8-pm/concert/18285544 | - |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | verify (applied) | 18266694 | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-23-8-pm/concert/18266694 | - |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | verify (applied) | 18551168 | https://seatgeek.com/jonas-brothers-tickets/toronto-canada-scotiabank-arena-2026-10-24-7-30-pm/concert/18551168 | - |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | verify (applied) | 18266318 | https://seatgeek.com/arcangel-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-10-24-8-pm/concert/18266318 | - |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | verify (applied) | 18128379 | https://seatgeek.com/lil-wayne-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-10-24-8-30-pm/concert/18128379 | - |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | verify (applied) | 18250159 | https://seatgeek.com/the-smashing-pumpkins-tickets/oklahoma-city-oklahoma-paycom-center-2026-10-24-8-pm/concert/18250159 | - |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | verify (applied) | 18613385 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-24-8-pm/concert/18613385 | - |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | verify (applied) | 18370151 | https://seatgeek.com/zach-top-tickets/rogers-arkansas-walmart-amp-2026-10-24-8-pm/concert/18370151 | - |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | verify (applied) | 18266696 | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-24-8-pm/concert/18266696 | - |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | verify (applied) | 18613384 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-25-2-pm/concert/18613384 | - |
| tm-the-smashing-pumpkins-2026-austin-g5diz_1txjp-0 | the-smashing-pumpkins | verify (applied) | 18250160 | https://seatgeek.com/the-smashing-pumpkins-tickets/austin-texas-moody-center-atx-2026-10-25-8-pm/concert/18250160 | - |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | verify (applied) | 18004730 | https://seatgeek.com/chris-stapleton-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-26-7-30-pm/concert/18004730 | - |
| tm-mico-2026-nashville-g5viz_1mfi-bc | mico | verify (applied) | 18252761 | https://seatgeek.com/mico-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-10-26-8-pm/concert/18252761 | - |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | kacey-musgraves | verify (applied) | 18210169 | https://seatgeek.com/kacey-musgraves-tickets/seattle-washington-climate-pledge-arena-2026-10-26-7-30-pm/concert/18210169 | - |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | verify (applied) | 18266701 | https://seatgeek.com/tom-jones-tickets/los-angeles-california-the-greek-theatre-los-angeles-2026-10-26-8-pm/concert/18266701 | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | olivia-rodrigo | verify (applied) | 18211738 | https://seatgeek.com/olivia-rodrigo-tickets/toronto-canada-scotiabank-arena-2026-10-27-7-pm/concert/18211738 | - |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | verify (applied) | 18252688 | https://seatgeek.com/mico-tickets/atlanta-georgia-the-masquerade-heaven-2026-10-27-7-pm/concert/18252688 | - |
| tm-sombr-2026-charlotte-g5evz_fneqevn | sombr | verify (applied) | 18175581 | https://seatgeek.com/sombr-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-10-27-7-30-pm/concert/18175581 | - |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | verify (applied) | 18250161 | https://seatgeek.com/the-smashing-pumpkins-tickets/denver-colorado-ball-arena-2026-10-27-8-pm/concert/18250161 | - |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | doja-cat | verify (applied) | 17769323 | https://seatgeek.com/doja-cat-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-27-7-30-pm/concert/17769323 | - |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | verify (applied) | 18222764 | https://seatgeek.com/amble-tickets/vancouver-canada-orpheum-theatre-vancouver-2026-10-27-8-pm/concert/18222764 | - |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | verify (applied) | 18553061 | https://seatgeek.com/fuerza-regida-tickets/fresno-california-save-mart-center-2026-10-27-8-pm/concert/18553061 | - |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | tom-jones | verify (applied) | 18266703 | https://seatgeek.com/tom-jones-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2026-10-27-8-pm/concert/18266703 | - |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | verify (applied) | 18200014 | https://seatgeek.com/the-red-clay-strays-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2026-10-28-6-30-pm/concert/18200014 | - |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | journey | verify (applied) | 18237115 | https://seatgeek.com/journey-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-10-28-7-30-pm/concert/18237115 | - |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | harry-styles | verify (applied) | 18027142 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-28-8-pm/concert/18027142 | - |
| tm-sombr-2026-nashville-g5viz_fja3nq8 | sombr | verify (applied) | 18175584 | https://seatgeek.com/sombr-tickets/nashville-tennessee-bridgestone-arena-2026-10-28-7-pm/concert/18175584 | - |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | gorillaz | verify (applied) | 18102850 | https://seatgeek.com/gorillaz-tickets/oakland-california-oakland-arena-2026-10-28-7-pm/concert/18102850 | - |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | verify (applied) | 18470197 | https://seatgeek.com/fuerza-regida-tickets/fresno-california-save-mart-center-2026-10-28-8-30-pm/concert/18470197 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | verify (applied) | 18138592 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-28-8-30-pm/concert/18138592 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | olivia-rodrigo | verify (applied) | 18211687 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-29-7-pm/concert/18211687 | - |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | verify (applied) | 18141892 | https://seatgeek.com/blue-october-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-10-29-7-pm/concert/18141892 | - |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | verify (applied) | 18316794 | https://seatgeek.com/daughtry-tickets/nashville-indiana-brown-county-music-center-2026-10-29-7-pm/concert/18316794 | - |
| tm-journey-2026-providence-vvg17z_1fuwpyc | journey | verify (applied) | 18237117 | https://seatgeek.com/journey-tickets/providence-rhode-island-amica-mutual-pavilion-2026-10-29-7-30-pm/concert/18237117 | - |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | ed-sheeran | verify (applied) | 17738469 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-29-8-pm/concert/17738469 | - |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | verify (applied) | 18499209 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-29-8-pm/concert/18499209 | - |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | verify (applied) | 18285545 | https://seatgeek.com/zach-top-tickets/duluth-georgia-gas-south-arena-2026-10-29-8-pm/concert/18285545 | - |
| tm-doja-cat-2026-phoenix-1av0zbsgknh-n_z | doja-cat | verify (applied) | 17769324 | https://seatgeek.com/doja-cat-tickets/phoenix-arizona-mortgage-matchup-center-2026-10-29-7-30-pm/concert/17769324 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | olivia-rodrigo | verify (applied) | 18211689 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-30-7-pm/concert/18211689 | - |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | verify (applied) | 18257238 | https://seatgeek.com/john-summit-tickets/university-park-pennsylvania-bryce-jordan-center-2026-10-30-7-pm/concert/18257238 | - |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | verify (applied) | 18141081 | https://seatgeek.com/blue-october-tickets/detroit-michigan-the-fillmore-detroit-2026-10-30-7-pm/concert/18141081 | - |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | harry-styles | verify (applied) | 18027143 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-30-8-pm/concert/18027143 | - |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | verify (applied) | 17738471 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-30-8-pm/concert/17738471 | - |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | verify (applied) | 18326820 | https://seatgeek.com/dylan-gossett-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-10-30-8-pm/concert/18326820 | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | steve-lacy | verify (applied) | 18485935 | https://seatgeek.com/steve-lacy-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2026-10-30-8-pm/concert/18485935 | - |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | ella-langley | verify (applied) | 18324412 | https://seatgeek.com/ella-langley-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-30-7-pm/concert/18324412 | - |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | verify (applied) | 18473030 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-30-8-pm/concert/18473030 | - |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | mana | verify (applied) | 17938857 | https://seatgeek.com/mana-tickets/rosemont-illinois-allstate-arena-2026-10-30-8-pm/concert/17938857 | - |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | verify (applied) | 18285548 | https://seatgeek.com/zach-top-tickets/nashville-tennessee-bridgestone-arena-2026-10-30-8-30-pm/concert/18285548 | - |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | verify (applied) | 18493234 | https://seatgeek.com/missio-tickets/san-diego-california-voodoo-room-at-the-house-of-blues-san-diego-2-2026-10-30-6-30-pm/concert/18493234 | - |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | gorillaz | verify (applied) | 18102851 | https://seatgeek.com/gorillaz-tickets/portland-oregon-moda-center-2026-10-30-7-pm/concert/18102851 | - |
| tm-knocked-loose-2026-san-diego-vvg1iz_5_l1ogs | knocked-loose | verify (applied) | 18270641 | https://seatgeek.com/knocked-loose-tickets/san-diego-california-petco-park-2026-10-30-7-pm/concert/18270641 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | verify (applied) | 18138594 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-30-8-30-pm/concert/18138594 | - |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | verify (applied) | 18141400 | https://seatgeek.com/blue-october-tickets/toronto-canada-the-danforth-music-hall-2026-10-31-7-pm/concert/18141400 | - |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | verify (applied) | 18200016 | https://seatgeek.com/the-red-clay-strays-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-10-31-6-30-pm/concert/18200016 | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | verify (applied) | 18027147 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-31-8-pm/concert/18027147 | - |
| tm-sombr-2026-kansas-city-vv1kbz_fjfg7wetj | sombr | verify (applied) | 18175588 | https://seatgeek.com/sombr-tickets/kansas-city-missouri-t-mobile-center-2026-10-31-7-pm/concert/18175588 | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | steve-lacy | verify (applied) | 18613494 | https://seatgeek.com/steve-lacy-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2026-10-31-8-pm/concert/18613494 | - |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | verify (applied) | 18551080 | https://seatgeek.com/ye-tickets/houston-texas-reliant-stadium-2026-10-31-8-pm/concert/18551080 | - |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | gorillaz | verify (applied) | 18102856 | https://seatgeek.com/gorillaz-tickets/seattle-washington-climate-pledge-arena-2026-10-31-7-30-pm/concert/18102856 | - |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | verify (applied) | 18266706 | https://seatgeek.com/tom-jones-tickets/wheatland-california-hard-rock-live-sacramento-2026-10-31-8-pm/concert/18266706 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | verify (applied) | 18138595 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-31-8-30-pm/concert/18138595 | - |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | latto | verify (applied) | 18618942 | https://seatgeek.com/latto-tickets/las-vegas-nevada-on-the-record-2026-10-31-10-pm/concert/18618942 | - |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | verify (applied) | 18222450 | https://seatgeek.com/amble-tickets/detroit-michigan-saint-andrews-hall-2026-11-01-7-pm/concert/18222450 | - |
| tm-sombr-2026-minneapolis-vv1akzk3agkeivme6 | sombr | verify (applied) | 18175591 | https://seatgeek.com/sombr-tickets/minneapolis-minnesota-target-center-2026-11-01-7-pm/concert/18175591 | - |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | verify (applied) | 18316800 | https://seatgeek.com/daughtry-tickets/des-moines-iowa-hoyt-sherman-place-2026-11-01-7-pm/concert/18316800 | - |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | jonas-brothers | verify (applied) | 18503891 | https://seatgeek.com/jonas-brothers-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-01-7-30-pm/concert/18503891 | - |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | rod-wave | verify (applied) | 18414825 | https://seatgeek.com/rod-wave-tickets/chicago-illinois-united-center-2026-11-01-8-pm/concert/18414825 | - |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | mana | verify (applied) | 17416937 | https://seatgeek.com/mana-tickets/detroit-michigan-little-caesars-arena-2026-11-01-8-pm/concert/17416937 | - |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | missio | verify (applied) | 18492941 | https://seatgeek.com/missio-tickets/los-angeles-california-teragram-ballroom-2026-11-01-7-30-pm/concert/18492941 | - |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | verify (applied) | 18266707 | https://seatgeek.com/tom-jones-tickets/san-francisco-california-the-masonic-san-francisco-2026-11-01-8-pm/concert/18266707 | - |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | verify (applied) | 18223885 | https://seatgeek.com/amble-tickets/toronto-canada-history-2026-11-02-7-pm/concert/18223885 | - |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | verify (applied) | 18251753 | https://seatgeek.com/mico-tickets/boston-massachusetts-paradise-rock-club-2026-11-02-7-pm/concert/18251753 | - |
| tm-journey-2026-detroit-vvg1oz_13slngw | journey | verify (applied) | 18237116 | https://seatgeek.com/journey-tickets/detroit-michigan-little-caesars-arena-2026-11-02-7-30-pm/concert/18237116 | - |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | knocked-loose | verify (applied) | 18270644 | https://seatgeek.com/knocked-loose-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-02-6-30-pm/concert/18270644 | - |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | steve-lacy | verify (applied) | 18485939 | https://seatgeek.com/steve-lacy-tickets/nashville-tennessee-nashville-municipal-auditorium-2026-11-02-8-pm/concert/18485939 | - |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | verify (applied) | 18222746 | https://seatgeek.com/amble-tickets/ottawa-canada-bronson-centre-2026-11-03-7-pm/concert/18222746 | - |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | knocked-loose | verify (applied) | 18270647 | https://seatgeek.com/knocked-loose-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-03-5-30-pm/concert/18270647 | - |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | verify (applied) | 18175592 | https://seatgeek.com/sombr-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-03-7-pm/concert/18175592 | - |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | verify (applied) | 18140945 | https://seatgeek.com/blue-october-tickets/portland-maine-state-theatre-portland-me-2026-11-03-8-pm/concert/18140945 | - |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | verify (applied) | 18320066 | https://seatgeek.com/rod-wave-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-03-8-30-pm/concert/18320066 | - |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | verify (applied) | 18503893 | https://seatgeek.com/jonas-brothers-tickets/kansas-city-missouri-t-mobile-center-2026-11-03-7-30-pm/concert/18503893 | - |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | verify (applied) | 18316801 | https://seatgeek.com/daughtry-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-03-8-pm/concert/18316801 | - |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | verify (applied) | 18250182 | https://seatgeek.com/the-smashing-pumpkins-tickets/calgary-canada-scotiabank-saddledome-2026-11-03-8-pm/concert/18250182 | - |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | verify (applied) | 18237143 | https://seatgeek.com/journey-tickets/toronto-canada-scotiabank-arena-2026-11-04-7-30-pm/concert/18237143 | - |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | dinosaur-jr | verify (applied) | 18345766 | https://seatgeek.com/dinosaur-jr-tickets/houston-texas-house-of-blues-houston-2026-11-04-7-pm/concert/18345766 | - |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | verify (applied) | 18238532 | https://seatgeek.com/tobymac-tickets/columbia-missouri-mizzou-arena-2026-11-05-7-pm/concert/18238532 | - |
| tm-mico-2026-montreal-16szkfk00zagk68g | mico | verify (applied) | 18472169 | https://seatgeek.com/mico-tickets/montreal-canada-mtelus-2026-11-05-8-pm/concert/18472169 | - |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | knocked-loose | verify (applied) | 18270649 | https://seatgeek.com/knocked-loose-tickets/austin-texas-moody-amphitheater-2026-11-05-7-pm/concert/18270649 | - |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | verify (applied) | 18503892 | https://seatgeek.com/jonas-brothers-tickets/nashville-tennessee-bridgestone-arena-2026-11-05-7-30-pm/concert/18503892 | - |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | steve-lacy | verify (applied) | 18485937 | https://seatgeek.com/steve-lacy-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-05-8-pm/concert/18485937 | - |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | verify (applied) | 18427192 | https://seatgeek.com/pentatonix-tickets/tacoma-washington-tacoma-dome-2026-11-05-7-pm/concert/18427192 | - |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | verify (applied) | 18250183 | https://seatgeek.com/the-smashing-pumpkins-tickets/vancouver-canada-rogers-arena-2026-11-05-8-pm/concert/18250183 | - |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | verify (applied) | 18175596 | https://seatgeek.com/sombr-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-11-06-7-pm/concert/18175596 | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | verify (applied) | 18373504 | https://seatgeek.com/michelle-branch-tickets/asbury-park-new-jersey-the-stone-pony-2-2026-11-06-7-pm/concert/18373504 | - |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | verify (applied) | 18222463 | https://seatgeek.com/amble-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-06-7-pm/concert/18222463 | - |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | verify (applied) | 18252202 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-06-7-pm/concert/18252202 | - |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | verify (applied) | 18252621 | https://seatgeek.com/stella-lefty-tickets/dallas-texas-cambridge-room-at-house-of-blues-dallas-1-2026-11-06-7-pm/concert/18252621 | - |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | verify (applied) | 18239020 | https://seatgeek.com/tobymac-tickets/evansville-indiana-ford-center-in-2026-11-06-7-pm/concert/18239020 | - |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | verify (applied) | 18529124 | https://seatgeek.com/dylan-scott-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2026-11-06-8-pm/concert/18529124 | - |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | verify (applied) | 17732671 | https://seatgeek.com/sabaton-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-06-7-pm/concert/17732671 | - |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | verify (applied) | 18320065 | https://seatgeek.com/rod-wave-tickets/columbia-south-carolina-colonial-life-arena-2026-11-06-8-30-pm/concert/18320065 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | verify (applied) | 18637279 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-06-8-pm/concert/18637279 | - |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | verify (applied) | 18250170 | https://seatgeek.com/the-smashing-pumpkins-tickets/seattle-washington-climate-pledge-arena-2026-11-06-8-pm/concert/18250170 | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | verify (applied) | 18223366 | https://seatgeek.com/amble-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-07-7-pm/concert/18223366 | - |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | verify (applied) | 18260543 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-07-7-pm/concert/18260543 | - |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | verify (applied) | 18252613 | https://seatgeek.com/stella-lefty-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2026-11-07-7-pm/concert/18252613 | - |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | verify (applied) | 17732669 | https://seatgeek.com/sabaton-tickets/houston-texas-713-music-hall-2026-11-07-7-pm/concert/17732669 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | verify (applied) | 18629299 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 | - |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | verify (applied) | 18485938 | https://seatgeek.com/steve-lacy-tickets/austin-texas-moody-amphitheater-2026-11-07-8-pm/concert/18485938 | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | verify (applied) | 18391933 | https://seatgeek.com/trivium-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-11-08-5-30-pm/concert/18391933 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | verify (applied) | 18175600 | https://seatgeek.com/sombr-tickets/columbus-ohio-nationwide-arena-2026-11-08-7-pm/concert/18175600 | - |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | verify (applied) | 18238331 | https://seatgeek.com/tobymac-tickets/greensboro-north-carolina-first-horizon-coliseum-2026-11-08-7-pm/concert/18238331 | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | verify (applied) | 18141852 | https://seatgeek.com/blue-october-tickets/nashville-indiana-brown-county-music-center-2026-11-08-7-30-pm/concert/18141852 | - |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | verify (applied) | 18200020 | https://seatgeek.com/the-red-clay-strays-tickets/jonesboro-arkansas-first-national-bank-arena-2026-11-08-6-30-pm/concert/18200020 | - |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | verify (applied) | 17938859 | https://seatgeek.com/mana-tickets/austin-texas-moody-center-atx-2026-11-08-8-30-pm/concert/17938859 | - |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | verify (applied) | 18316806 | https://seatgeek.com/daughtry-tickets/napa-california-uptown-theatre-napa-2026-11-08-7-pm/concert/18316806 | - |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | verify (applied) | 18250171 | https://seatgeek.com/the-smashing-pumpkins-tickets/san-jose-california-sap-center-at-san-jose-2026-11-08-8-pm/concert/18250171 | - |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | verify (applied) | 18320069 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-09-8-30-pm/concert/18320069 | - |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | verify (applied) | 18503896 | https://seatgeek.com/jonas-brothers-tickets/oklahoma-city-oklahoma-paycom-center-2026-11-09-7-30-pm/concert/18503896 | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | verify (applied) | 18297308 | https://seatgeek.com/sienna-spiro-tickets/san-francisco-california-castro-theatre-2026-11-09-8-pm/concert/18297308 | - |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | verify (applied) | 18391934 | https://seatgeek.com/trivium-tickets/silver-spring-maryland-the-fillmore-silver-spring-2026-11-10-6-35-pm/concert/18391934 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | verify (applied) | 18085136 | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 | - |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | verify (applied) | 18373509 | https://seatgeek.com/michelle-branch-tickets/chicago-illinois-house-of-blues-chicago-2026-11-10-8-pm/concert/18373509 | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | verify (applied) | 18222479 | https://seatgeek.com/amble-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2026-11-10-8-pm/concert/18222479 | - |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | verify (applied) | 18414835 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-10-8-pm/concert/18414835 | - |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | verify (applied) | 18427194 | https://seatgeek.com/pentatonix-tickets/casper-wyoming-ford-wyoming-center-2026-11-10-7-pm/concert/18427194 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | verify (applied) | 18297309 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-the-wiltern-2026-11-10-8-pm/concert/18297309 | - |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | verify (applied) | 18316807 | https://seatgeek.com/daughtry-tickets/anaheim-california-city-national-grove-of-anaheim-2026-11-10-7-pm/concert/18316807 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | verify (applied) | 18222468 | https://seatgeek.com/amble-tickets/washington-district-of-columbia-9-30-club-2026-11-11-7-pm/concert/18222468 | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | verify (applied) | 18085138 | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 | - |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | verify (applied) | 18492221 | https://seatgeek.com/missio-tickets/denver-colorado-marquis-theater-denver-2026-11-11-7-pm/concert/18492221 | - |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | verify (applied) | 18394805 | https://seatgeek.com/the-psychedelic-furs-tickets/riverside-california-fox-performing-arts-center-2026-11-11-7-pm/concert/18394805 | - |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | verify (applied) | 18250172 | https://seatgeek.com/the-smashing-pumpkins-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-11-8-pm/concert/18250172 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | verify (applied) | 18405684 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-11-8-pm/concert/18405684 | - |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | verify (applied) | 18319858 | https://seatgeek.com/brand-new-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-11-8-pm/concert/18319858 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | verify (applied) | 18175603 | https://seatgeek.com/sombr-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-12-7-pm/concert/18175603 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | verify (applied) | 18085137 | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 | - |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | verify (applied) | 18141374 | https://seatgeek.com/blue-october-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-11-12-8-pm/concert/18141374 | - |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | verify (applied) | 18427193 | https://seatgeek.com/pentatonix-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-12-7-pm/concert/18427193 | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | verify (applied) | 18404272 | https://seatgeek.com/tyla-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-12-8-pm/concert/18404272 | - |

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
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-new-york-k7vgf_uedf3n_ | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-def-leppard-2026-hollywood-vvg1vz_5sqbrak | def-leppard | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-san-francisco-z7r9jz1a70i80 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70uao | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-tucson-z7r9jz1a70ioy | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
