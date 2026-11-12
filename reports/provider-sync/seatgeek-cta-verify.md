# SeatGeek CTA verification log

Generated: 2026-11-12T00:52:10.531Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1725 (needs_recheck: 644, provenance backfill: 11, stale re-check: 1596)
- Events skipped before API checks: 670
- API calls made: 800
- Verified provenance written: 649
- URLs added: 8
- URLs corrected: 0
- URLs cleared: 11
- Provenance un-verified: 3
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 113
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | meshuggah | verify (applied) | 18724675 | https://seatgeek.com/meshuggah-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-21-7-pm/concert/18724675 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-foy-vance-2027-ardmore-z7r9jz1aa7_fo | foy-vance | verify (applied) | 18370696 | https://seatgeek.com/foy-vance-tickets/ardmore-pennsylvania-the-ardmore-music-hall-2027-04-23-8-pm/concert/18370696 | - |
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | calvin-harris | verify (applied) | 18674838 | https://seatgeek.com/calvin-harris-tickets/houston-texas-toyota-center-2027-04-23-8-pm/concert/18674838 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | verify (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | verify (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | verify (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | meshuggah | verify (applied) | 18724684 | https://seatgeek.com/meshuggah-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-05-01-7-pm/concert/18724684 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | verify (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | two-door-cinema-club | verify (applied) | 18711333 | https://seatgeek.com/two-door-cinema-club-tickets/chicago-illinois-riviera-theatre-chicago-2027-05-06-7-30-pm/concert/18711333 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | verify (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | verify (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | verify (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | verify (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | meshuggah | verify (applied) | 18709209 | https://seatgeek.com/meshuggah-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2027-05-09-7-pm/concert/18709209 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | remi-wolf | verify (applied) | 18664784 | https://seatgeek.com/remi-wolf-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-10-8-pm/concert/18664784 | - |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | queens-of-the-stone-age | verify (applied) | 18475187 | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | remi-wolf | verify (applied) | 18664787 | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | two-door-cinema-club | verify (applied) | 18711220 | https://seatgeek.com/two-door-cinema-club-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-11-7-30-pm/concert/18711220 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | queens-of-the-stone-age | verify (applied) | 18709238 | https://seatgeek.com/queens-of-the-stone-age-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-12-6-30-pm/concert/18709238 | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | remi-wolf | verify (applied) | 18664791 | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | verify (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | verify (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | queens-of-the-stone-age | verify (applied) | 18701766 | https://seatgeek.com/queens-of-the-stone-age-tickets/saint-paul-minnesota-grand-casino-arena-2027-05-14-6-30-pm/concert/18701766 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | verify (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | verify (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | remi-wolf | verify (applied) | 18664789 | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | verify (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | verify (applied) | 18271150 | https://seatgeek.com/the-airborne-toxic-event-tickets/glenside-pennsylvania-keswick-theatre-2027-05-19-8-pm/concert/18271150 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | hazlett | verify (applied) | 18319961 | https://seatgeek.com/hazlett-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-05-21-7-30-pm/concert/18319961 | - |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | remi-wolf | verify (applied) | 18664793 | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | two-door-cinema-club | verify (applied) | 18711344 | https://seatgeek.com/two-door-cinema-club-tickets/austin-texas-united-heritage-hall-2027-05-27-8-pm/concert/18711344 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | two-door-cinema-club | verify (applied) | 18711349 | https://seatgeek.com/two-door-cinema-club-tickets/dallas-texas-the-bomb-factory-dallas-2027-05-29-8-pm/concert/18711349 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | death-cab-for-cutie | verify (applied) | 18715561 | https://seatgeek.com/death-cab-for-cutie-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-08-7-pm/concert/18715561 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-sienna-spiro-2027-nashville-z7r9jz1aa7bjy | sienna-spiro | verify (applied) | 18702009 | https://seatgeek.com/sienna-spiro-tickets/nashville-tennessee-grand-ole-opry-house-2027-08-08-7-pm/concert/18702009 | - |
| tm-sienna-spiro-2027-atlanta-z7r9jz1aa7oab | sienna-spiro | verify (applied) | 18702010 | https://seatgeek.com/sienna-spiro-tickets/atlanta-georgia-fox-theatre-atlanta-2027-08-10-7-pm/concert/18702010 | - |
| tm-mat-kearney-2027-austin-z7r9jz1aa7t0p | mat-kearney | verify (applied) | 18747385 | https://seatgeek.com/mat-kearney-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-08-13-8-pm/concert/18747385 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-fall-out-boy-2027-portland-z7r9jz1aaaa0k | fall-out-boy | verify (applied) | 18738316 | https://seatgeek.com/fall-out-boy-tickets/portland-oregon-providence-park-2027-08-26-5-30-pm/concert/18738316 | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | verify (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aa7svn | the-red-clay-strays | verify (applied) | 18727012 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-12-7-pm/concert/18727012 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-the-dead-south-2027-kelowna-z7r9jz1aa7moa | the-dead-south | verify (applied) | 18754318 | https://seatgeek.com/the-dead-south-tickets/kelowna-canada-prospera-place-2027-09-24-8-pm/concert/18754318 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-fontaines-d-c-2027-asheville-z7r9jz1aae84b | fontaines-d-c | verify (applied) | 18642845 | https://seatgeek.com/fontaines-d-c-tickets/asheville-north-carolina-hellbenders-by-the-orange-peel-2027-10-07-6-30-pm/concert/18642845 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-minneapolis-z7r9jz1aaaagg | garth-brooks | add (applied) | 18747130 | https://seatgeek.com/garth-brooks-tickets/minneapolis-minnesota-target-center-2026-12-12-8-pm/concert/18747130 | - |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | koe-wetzel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-air-supply-2027-valley-center-vvg1iz_p3nhurb | air-supply | verify (applied) | 18753735 | https://seatgeek.com/air-supply-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-12-8-pm/concert/18753735 | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tigres-del-norte-2027-lincoln-g5vyz_ph5-cbb | los-tigres-del-norte | verify (applied) | 18757733 | https://seatgeek.com/los-tigres-del-norte-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2027-02-19-7-30-pm/concert/18757733 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | dylan-scott | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass Resort & Casino' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-toronto-1a8zk4xgkenbgje | feid | verify (applied) | 18746767 | https://seatgeek.com/feid-tickets/toronto-canada-scotiabank-arena-2027-03-11-8-pm/concert/18746767 | - |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | mico | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-frisco-z7r9jz1aaeep4 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | mana | add (applied) | 18758281 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-04-06-8-pm/concert/18758281 | - |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_k | mana | add (applied) | 18758283 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-04-08-8-pm/concert/18758283 | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | mana | add (applied) | 18758285 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-04-11-8-pm/concert/18758285 | - |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-earth-wind-fire-2027-pompano-beach-z7r9jz1aaazue | earth-wind-fire | add (applied) | 18755932 | https://seatgeek.com/earth-wind-fire-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-04-13-7-30-pm/concert/18755932 | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-orlando-z7r9jz1aaevq0 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-dallas-z7r9jz1aa7s_b | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-boise-z7r9jz1aa7yr7 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | mana | add (applied) | 18758287 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-09-01-8-pm/concert/18758287 | - |
| tm-mana-2027-highland-z7r9jz1aa7ng- | mana | add (applied) | 18758289 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-09-02-8-pm/concert/18758289 | - |
| tm-mana-2027-highland-z7r9jz1aa7x_a | mana | add (applied) | 18758291 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-09-06-8-pm/concert/18758291 | - |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-dallas-vvg1yz_8uftpd5 | jonas-brothers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18503900 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-katseye-2026-austin-g5diz_1lv8_jd | katseye | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18240150 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-teddy-swims-2026-san-francisco-g5vyz_fnhi2ez | teddy-swims | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18185175 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-beartooth-2026-boston-vvg17z_1njiezr | beartooth | verify (applied) | 18253043 | https://seatgeek.com/beartooth-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-11-11-6-30-pm/concert/18253043 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7nwya | sting | verify (applied) | 18100163 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-11-7-pm/concert/18100163 | - |
| tm-doja-cat-2026-miami-vvg1vzbs0fdfw5 | doja-cat | verify (applied) | 17769338 | https://seatgeek.com/doja-cat-tickets/miami-florida-kaseya-center-2026-11-11-7-30-pm/concert/17769338 | - |
| tm-teddy-swims-2026-sacramento-g5vyz_fmsnbtg | teddy-swims | verify (applied) | 18185176 | https://seatgeek.com/teddy-swims-tickets/sacramento-california-golden-1-center-2026-11-11-7-pm/concert/18185176 | - |
| tm-santana-2026-las-vegas-17ayv0g6ck18f79 | santana | verify (applied) | 18355779 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2026-11-11-7-pm/concert/18355779 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7lcyc | sting | verify (applied) | 18100164 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-12-7-pm/concert/18100164 | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1oi7r | santana | verify (applied) | 18355783 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2026-11-12-7-pm/concert/18355783 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | barry-manilow | verify (applied) | 17637148 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-12-7-pm/concert/17637148 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | garth-brooks | verify (applied) | 18715553 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-12-7-30-pm/concert/18715553 | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | verify (applied) | 18404272 | https://seatgeek.com/tyla-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-12-8-pm/concert/18404272 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | sienna-spiro | verify (applied) | 18317534 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-orpheum-theatre-los-angeles-2026-11-12-8-pm/concert/18317534 | - |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | the-smashing-pumpkins | verify (applied) | 18250173 | https://seatgeek.com/the-smashing-pumpkins-tickets/inglewood-california-kia-forum-2026-11-12-8-pm/concert/18250173 | - |
| tm-the-red-clay-strays-2026-atlanta-vvg1zz_7rkxyy- | the-red-clay-strays | verify (applied) | 18085601 | https://seatgeek.com/the-red-clay-strays-tickets/atlanta-georgia-state-farm-arena-1-2026-11-13-6-30-pm/concert/18085601 | - |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | john-summit | verify (applied) | 18257252 | https://seatgeek.com/john-summit-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-11-13-7-pm/concert/18257252 | - |
| tm-blue-october-2026-boston-vv177z_kgkw31n77 | blue-october | verify (applied) | 18143448 | https://seatgeek.com/blue-october-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-13-7-pm/concert/18143448 | - |
| tm-doja-cat-2026-tampa-vvg1vzbslmpvjz | doja-cat | verify (applied) | 17769340 | https://seatgeek.com/doja-cat-tickets/tampa-florida-benchmark-international-arena-2026-11-13-7-30-pm/concert/17769340 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | dave-matthews-band | verify (applied) | 18474898 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-13-7-30-pm/concert/18474898 | - |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | michelle-branch | verify (applied) | 18373515 | https://seatgeek.com/michelle-branch-tickets/lexington-kentucky-manchester-music-hall-2026-11-13-8-pm/concert/18373515 | - |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | daughtry | verify (applied) | 18316813 | https://seatgeek.com/daughtry-tickets/san-antonio-texas-aztec-theatre-2026-11-13-8-pm/concert/18316813 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | verify (applied) | 18645455 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-13-8-pm/concert/18645455 | - |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | treaty-oak-revival | verify (applied) | 18229327 | https://seatgeek.com/treaty-oak-revival-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2026-11-13-7-pm/concert/18229327 | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | jon-pardi | verify (applied) | 18390874 | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-13-7-pm/concert/18390874 | - |
| tm-jonas-brothers-2026-austin-g5diz_8vesk58 | jonas-brothers | verify (applied) | 18503902 | https://seatgeek.com/jonas-brothers-tickets/austin-texas-moody-center-atx-2026-11-13-7-30-pm/concert/18503902 | - |
| tm-gary-allan-2026-dodge-city-vvg1bz_gx9hm-8 | gary-allan | verify (applied) | 18344599 | https://seatgeek.com/gary-allan-tickets/dodge-city-kansas-united-wireless-arena-2026-11-13-7-30-pm/concert/18344599 | - |
| tm-victoria-monet-2026-boston-vv1avzkfpgkdybxe- | victoria-monet | verify (applied) | 18579770 | https://seatgeek.com/victoria-monet-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-11-13-8-pm/concert/18579770 | - |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | foy-vance | verify (applied) | 18084359 | https://seatgeek.com/foy-vance-tickets/seattle-washington-neptune-theatre-wa-2026-11-13-7-pm/concert/18084359 | - |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | tyla | verify (applied) | 18404273 | https://seatgeek.com/tyla-tickets/oakland-california-fox-theater-oakland-2026-11-13-8-pm/concert/18404273 | - |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | steve-lacy | verify (applied) | 18485946 | https://seatgeek.com/steve-lacy-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2026-11-13-8-pm/concert/18485946 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | lionel-richie | verify (applied) | 18405685 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-13-8-pm/concert/18405685 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | verify (applied) | 18686081 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-13-8-pm/concert/18686081 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | barry-manilow | verify (applied) | 17637150 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-13-8-pm/concert/17637150 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | eagles | verify (applied) | 18219945 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-13-8-30-pm/concert/18219945 | - |
| tm-sombr-2026-buffalo-k7v17_f0kg7ij1e | sombr | verify (applied) | 18175607 | https://seatgeek.com/sombr-tickets/buffalo-new-york-keybank-center-2026-11-14-7-pm/concert/18175607 | - |
| tm-john-summit-2026-charlotte-g5evz_52qpkue | john-summit | verify (applied) | 18257253 | https://seatgeek.com/john-summit-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-14-7-pm/concert/18257253 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7icyq | sting | verify (applied) | 18100162 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-14-7-pm/concert/18100162 | - |
| tm-doja-cat-2026-orlando-1aefzbsgklnlnmt | doja-cat | verify (applied) | 17769341 | https://seatgeek.com/doja-cat-tickets/orlando-florida-kia-center-2026-11-14-7-30-pm/concert/17769341 | - |
| tm-journey-2026-greenville-g5evz_1k1vuwb | journey | verify (applied) | 18237123 | https://seatgeek.com/journey-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-11-14-7-30-pm/concert/18237123 | - |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | blue-october | verify (applied) | 18141441 | https://seatgeek.com/blue-october-tickets/wilkes-barre-pennsylvania-f-m-kirby-center-2026-11-14-8-pm/concert/18141441 | - |
| tm-pentatonix-2026-milwaukee-vvg1jz_296mpvg | pentatonix | verify (applied) | 18427195 | https://seatgeek.com/pentatonix-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-14-7-pm/concert/18427195 | - |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | daughtry | verify (applied) | 18316816 | https://seatgeek.com/daughtry-tickets/dallas-texas-majestic-theatre-dallas-2026-11-14-7-pm/concert/18316816 | - |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | verify (applied) | 18126039 | https://seatgeek.com/the-neighbourhood-tickets/nashville-tennessee-the-truth-nashville-2026-11-14-7-30-pm/concert/18126039 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | verify (applied) | 18629507 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-14-8-pm/concert/18629507 | - |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | jon-pardi | verify (applied) | 18390529 | https://seatgeek.com/jon-pardi-tickets/independence-missouri-cable-dahmer-arena-2026-11-14-7-pm/concert/18390529 | - |
| tm-air-supply-2026-westbury-k7vgf_fkzchcp | air-supply | verify (applied) | 18206347 | https://seatgeek.com/air-supply-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2026-11-14-8-pm/concert/18206347 | - |
| tm-jonas-brothers-2026-san-antonio-g5diz_8uwwbjr | jonas-brothers | verify (applied) | 18503903 | https://seatgeek.com/jonas-brothers-tickets/san-antonio-texas-frost-bank-center-2026-11-14-7-30-pm/concert/18503903 | - |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | verify (applied) | 18312209 | https://seatgeek.com/amble-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-11-14-8-pm/concert/18312209 | - |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | verify (applied) | 18084166 | https://seatgeek.com/foy-vance-tickets/spokane-washington-knitting-factory-spokane-2026-11-14-7-pm/concert/18084166 | - |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | sabaton | verify (applied) | 17732679 | https://seatgeek.com/sabaton-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-14-7-pm/concert/17732679 | - |
| tm-santana-2026-las-vegas-17ayv0g6ck13z7p | santana | verify (applied) | 18355777 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2026-11-14-7-pm/concert/18355777 | - |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | brand-new | verify (applied) | 18319860 | https://seatgeek.com/brand-new-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-14-8-pm/concert/18319860 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | barry-manilow | verify (applied) | 17637151 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-14-7-pm/concert/17637151 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | lionel-richie | verify (applied) | 18405683 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-14-8-pm/concert/18405683 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | verify (applied) | 18686083 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-14-8-pm/concert/18686083 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | eagles | verify (applied) | 18219946 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-14-8-30-pm/concert/18219946 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | verify (applied) | 18706524 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-15-2-pm/concert/18706524 | - |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | pentatonix | verify (applied) | 18427197 | https://seatgeek.com/pentatonix-tickets/grand-rapids-michigan-van-andel-arena-2026-11-15-6-pm/concert/18427197 | - |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | beartooth | verify (applied) | 18253046 | https://seatgeek.com/beartooth-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-15-6-30-pm/concert/18253046 | - |
| tm-motionless-in-white-2026-albany-k7vgf_5wspmvj | motionless-in-white | verify (applied) | 18281908 | https://seatgeek.com/motionless-in-white-tickets/albany-new-york-mvp-arena-2026-11-15-6-30-pm/concert/18281908 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | verify (applied) | 18211699 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-15-7-pm/concert/18211699 | - |
| tm-john-summit-2026-atlanta-vvg1zz_527ymui | john-summit | verify (applied) | 18257254 | https://seatgeek.com/john-summit-tickets/atlanta-georgia-state-farm-arena-1-2026-11-15-7-pm/concert/18257254 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7twrb | sting | verify (applied) | 18100165 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-15-7-pm/concert/18100165 | - |
| tm-jodeci-2026-bristol-g5viz_25fd7l0 | jodeci | verify (applied) | 18407251 | https://seatgeek.com/jodeci-tickets/bristol-virginia-hard-rock-hotel-and-casino-bristol-2026-11-15-7-pm/concert/18407251 | - |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | blue-october | verify (applied) | 18141766 | https://seatgeek.com/blue-october-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2026-11-15-8-pm/concert/18141766 | - |
| tm-victoria-monet-2026-detroit-vv1afzkfegkdcyvij | victoria-monet | verify (applied) | 18579772 | https://seatgeek.com/victoria-monet-tickets/detroit-michigan-fox-theatre-detroit-2026-11-15-7-30-pm/concert/18579772 | - |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | tyla | verify (applied) | 18404303 | https://seatgeek.com/tyla-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-15-8-pm/concert/18404303 | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1fb7i | santana | verify (applied) | 18355780 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2026-11-15-7-pm/concert/18355780 | - |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | arcangel | verify (applied) | 18266329 | https://seatgeek.com/arcangel-tickets/denver-colorado-paramount-theatre-co-2026-11-15-8-pm/concert/18266329 | - |
| tm-rawayana-2026-inglewood-vv170z_kgkuw4lc4 | rawayana | verify (applied) | 18126384 | https://seatgeek.com/rawayana-tickets/inglewood-california-kia-forum-2026-11-15-8-pm/concert/18126384 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | verify (applied) | 18211700 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-16-7-pm/concert/18211700 | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | verify (applied) | 18175613 | https://seatgeek.com/sombr-tickets/toronto-canada-scotiabank-arena-2026-11-16-7-pm/concert/18175613 | - |
| tm-pentatonix-2026-louisville-1apzkf7gker9zih | pentatonix | verify (applied) | 18427196 | https://seatgeek.com/pentatonix-tickets/louisville-kentucky-kfc-yum-center-2026-11-16-7-pm/concert/18427196 | - |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | stella-lefty | verify (applied) | 18251604 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-bowery-ballroom-2026-11-16-7-pm/concert/18251604 | - |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | verify (applied) | 18222773 | https://seatgeek.com/amble-tickets/new-orleans-louisiana-house-of-blues-new-orleans-2026-11-16-7-pm/concert/18222773 | - |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | verify (applied) | 18085139 | https://seatgeek.com/the-neighbourhood-tickets/kansas-city-missouri-t-mobile-center-2026-11-16-7-30-pm/concert/18085139 | - |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | journey | verify (applied) | 18237124 | https://seatgeek.com/journey-tickets/saint-louis-missouri-enterprise-center-2026-11-16-7-30-pm/concert/18237124 | - |
| tm-teddy-swims-2026-phoenix-1av0z_fgkbna4b9 | teddy-swims | verify (applied) | 18185182 | https://seatgeek.com/teddy-swims-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-16-7-pm/concert/18185182 | - |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | foy-vance | verify (applied) | 18084164 | https://seatgeek.com/foy-vance-tickets/boise-idaho-knitting-factory-concert-house-boise-2026-11-16-7-pm/concert/18084164 | - |
| tm-trivium-2026-laval-17g8v0g6cubsshb | trivium | verify (applied) | 18391948 | https://seatgeek.com/trivium-tickets/laval-canada-place-bell-2026-11-17-6-35-pm/concert/18391948 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7tury | sting | verify (applied) | 18100167 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-17-7-pm/concert/18100167 | - |
| tm-doja-cat-2026-atlanta-vvg1zzbsle3ugd | doja-cat | verify (applied) | 17769342 | https://seatgeek.com/doja-cat-tickets/atlanta-georgia-state-farm-arena-1-2026-11-17-7-30-pm/concert/17769342 | - |
| tm-blue-october-2026-charlotte-g5evz_kng4bet | blue-october | verify (applied) | 18141165 | https://seatgeek.com/blue-october-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-11-17-8-pm/concert/18141165 | - |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | verify (applied) | 18222798 | https://seatgeek.com/amble-tickets/austin-texas-emo-s-austin-2026-11-17-7-pm/concert/18222798 | - |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | sabaton | verify (applied) | 17732681 | https://seatgeek.com/sabaton-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-17-7-pm/concert/17732681 | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | brandi-carlile | verify (applied) | 18626663 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-17-8-pm/concert/18626663 | - |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | steve-lacy | verify (applied) | 18485948 | https://seatgeek.com/steve-lacy-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-17-8-pm/concert/18485948 | - |
| tm-three-days-grace-2026-sacramento-g5vyzbu2whwe8 | three-days-grace | verify (applied) | 17895172 | https://seatgeek.com/three-days-grace-tickets/sacramento-california-golden-1-center-2026-11-17-7-pm/concert/17895172 | - |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | katseye | verify (applied) | 18240158 | https://seatgeek.com/katseye-tickets/seattle-washington-climate-pledge-arena-2026-11-17-8-pm/concert/18240158 | - |
| tm-trivium-2026-toronto-177zv0g62er1iat | trivium | verify (applied) | 18391949 | https://seatgeek.com/trivium-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2026-11-18-6-35-pm/concert/18391949 | - |
| tm-sombr-2026-boston-vv1avzk36gkdfnkex | sombr | verify (applied) | 18175608 | https://seatgeek.com/sombr-tickets/boston-massachusetts-td-garden-2026-11-18-7-pm/concert/18175608 | - |
| tm-pentatonix-2026-buffalo-k7vgf_8kru5hf | pentatonix | verify (applied) | 18427203 | https://seatgeek.com/pentatonix-tickets/buffalo-new-york-keybank-center-2026-11-18-7-pm/concert/18427203 | - |
| tm-sting-2026-brooklyn-k7v17_a0ag7iure | sting | verify (applied) | 18100166 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-18-7-pm/concert/18100166 | - |
| tm-doja-cat-2026-charlotte-g5evzbsemdalv | doja-cat | verify (applied) | 17769343 | https://seatgeek.com/doja-cat-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-18-7-30-pm/concert/17769343 | - |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | verify (applied) | 18223872 | https://seatgeek.com/amble-tickets/dallas-texas-the-echo-lounge-music-hall-2026-11-18-7-pm/concert/18223872 | - |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | verify (applied) | 18140881 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2026-11-18-7-30-pm/concert/18140881 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | rod-wave | verify (applied) | 18320070 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-18-8-30-pm/concert/18320070 | - |
| tm-jodeci-2026-jersey-city-vvg1fz_2hzjb2j | jodeci | verify (applied) | 18407254 | https://seatgeek.com/jodeci-tickets/jersey-city-new-jersey-loew-s-jersey-theatre-2026-11-18-8-pm/concert/18407254 | - |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | victoria-monet | verify (applied) | 18579778 | https://seatgeek.com/victoria-monet-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-18-7-pm/concert/18579778 | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | brandi-carlile | verify (applied) | 18626661 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-18-8-pm/concert/18626661 | - |
| tm-rawayana-2026-houston-g5diz_kwowtst | rawayana | verify (applied) | 18127552 | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-18-8-pm/concert/18127552 | - |
| tm-teddy-swims-2026-inglewood-vv170z_fgkmxw1os | teddy-swims | verify (applied) | 18185184 | https://seatgeek.com/teddy-swims-tickets/inglewood-california-kia-forum-2026-11-18-7-pm/concert/18185184 | - |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | arcangel | verify (applied) | 18266330 | https://seatgeek.com/arcangel-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-18-8-pm/concert/18266330 | - |
| tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh | three-days-grace | verify (applied) | 17895175 | https://seatgeek.com/three-days-grace-tickets/san-jose-california-sap-center-at-san-jose-2026-11-18-7-pm/concert/17895175 | - |
| tm-motionless-in-white-2026-newark-vvg1fz_5s7fn3l | motionless-in-white | verify (applied) | 18281913 | https://seatgeek.com/motionless-in-white-tickets/newark-new-jersey-prudential-center-2026-11-19-6-30-pm/concert/18281913 | - |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | verify (applied) | 18252806 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-atlantis-2026-11-19-6-30-pm/concert/18252806 | - |
| tm-sombr-2026-philadelphia-1kgzv0xbga5zeae | sombr | verify (applied) | 18175611 | https://seatgeek.com/sombr-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-19-7-30-pm/concert/18175611 | - |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | the-neighbourhood | verify (applied) | 18085141 | https://seatgeek.com/the-neighbourhood-tickets/detroit-michigan-little-caesars-arena-2026-11-19-7-30-pm/concert/18085141 | - |
| tm-metallica-2026-uncasville-g5vvz_6nrigot | metallica | verify (applied) | 18164315 | https://seatgeek.com/metallica-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-19-8-pm/concert/18164315 | - |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | trans-siberian-orchestra | verify (applied) | 18573355 | https://seatgeek.com/trans-siberian-orchestra-tickets/council-bluffs-iowa-mid-america-center-2026-11-19-7-pm/concert/18573355 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | rod-wave | verify (applied) | 18414834 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-19-8-pm/concert/18414834 | - |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | stevie-wonder | verify (applied) | 18570214 | https://seatgeek.com/stevie-wonder-tickets/new-york-new-york-madison-square-garden-2026-11-19-8-pm/concert/18570214 | - |
| tm-zac-brown-band-2026-lincoln-vv16kzk8wakzacfeeu | zac-brown-band | verify (applied) | 18032031 | https://seatgeek.com/zac-brown-band-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-19-7-pm/concert/18032031 | - |
| tm-rawayana-2026-houston-g5diz_ad2y7sg | rawayana | verify (applied) | 18223585 | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-19-8-pm/concert/18223585 | - |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | steve-lacy | verify (applied) | 18485949 | https://seatgeek.com/steve-lacy-tickets/san-diego-california-petco-park-2026-11-19-8-pm/concert/18485949 | - |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | katseye | verify (applied) | 18240159 | https://seatgeek.com/katseye-tickets/oakland-california-oakland-arena-2026-11-19-8-pm/concert/18240159 | - |
| tm-missio-2026-toronto-1avzz_8gklvsj7l | missio | verify (applied) | 18492369 | https://seatgeek.com/missio-tickets/toronto-canada-the-garrison-toronto-2026-11-20-6-30-pm/concert/18492369 | - |
| tm-motionless-in-white-2026-pittsburgh-17aov0g65mh-tzb | motionless-in-white | verify (applied) | 18281916 | https://seatgeek.com/motionless-in-white-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-20-6-30-pm/concert/18281916 | - |
| tm-beartooth-2026-chicago-vvg18z_1nj0ag4 | beartooth | verify (applied) | 18253045 | https://seatgeek.com/beartooth-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-20-6-pm/concert/18253045 | - |
| tm-sting-2026-brooklyn-k7v1ako_v_zaccg27 | sting | verify (applied) | 18626602 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-20-7-pm/concert/18626602 | - |
| tm-doja-cat-2026-baltimore-1avfzbsgknfre1x | doja-cat | verify (applied) | 17769349 | https://seatgeek.com/doja-cat-tickets/baltimore-maryland-cfg-bank-arena-2026-11-20-7-30-pm/concert/17769349 | - |
| tm-little-big-town-2026-detroit-vvg1oz_g9neqkq | little-big-town | verify (applied) | 18292640 | https://seatgeek.com/little-big-town-tickets/detroit-michigan-fox-theatre-detroit-2026-11-20-7-30-pm/concert/18292640 | - |
| tm-john-summit-2026-miami-vvg1vz_51zozkr | john-summit | verify (applied) | 18257255 | https://seatgeek.com/john-summit-tickets/miami-florida-kaseya-center-2026-11-20-8-pm/concert/18257255 | - |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | sabaton | verify (applied) | 17732683 | https://seatgeek.com/sabaton-tickets/omaha-nebraska-steelhouse-omaha-2026-11-20-7-pm/concert/17732683 | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | brandi-carlile | verify (applied) | 18626665 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-20-8-pm/concert/18626665 | - |
| tm-jodeci-2026-baltimore-17a8v0g62qqx1z6 | jodeci | verify (applied) | 18407286 | https://seatgeek.com/jodeci-tickets/baltimore-maryland-the-paramount-baltimore-2026-11-20-8-pm/concert/18407286 | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | verify (applied) | 18404274 | https://seatgeek.com/tyla-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-20-6-30-pm/concert/18404274 | - |
| tm-journey-2026-dallas-vvg1yz_14w7vrn | journey | verify (applied) | 18237127 | https://seatgeek.com/journey-tickets/dallas-texas-american-airlines-center-2026-11-20-7-30-pm/concert/18237127 | - |
| tm-ty-myers-2026-austin-g5diz_kuopazl | ty-myers | verify (applied) | 18142345 | https://seatgeek.com/ty-myers-tickets/austin-texas-moody-center-atx-2026-11-20-7-30-pm/concert/18142345 | - |
| tm-three-days-grace-2026-san-diego-vvg1izbuciwp5c | three-days-grace | verify (applied) | 17895176 | https://seatgeek.com/three-days-grace-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-20-7-pm/concert/17895176 | - |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | arcangel | verify (applied) | 18266331 | https://seatgeek.com/arcangel-tickets/inglewood-california-youtube-theater-2026-11-20-8-pm/concert/18266331 | - |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | trans-siberian-orchestra | verify (applied) | 18573352 | https://seatgeek.com/trans-siberian-orchestra-tickets/cincinnati-ohio-heritage-bank-center-2026-11-21-3-pm/concert/18573352 | - |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | trans-siberian-orchestra | verify (applied) | 18573356 | https://seatgeek.com/trans-siberian-orchestra-tickets/denver-colorado-ball-arena-2026-11-21-3-pm/concert/18573356 | - |
| tm-sombr-2026-newark-vv1aezk3fgkdhlmuf | sombr | verify (applied) | 18175560 | https://seatgeek.com/sombr-tickets/newark-new-jersey-prudential-center-2026-11-21-7-pm/concert/18175560 | - |
| tm-pentatonix-2026-pittsburgh-1apzkfdgkdrcd8b | pentatonix | verify (applied) | 18427204 | https://seatgeek.com/pentatonix-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-21-7-pm/concert/18427204 | - |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | the-neighbourhood | verify (applied) | 18085142 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-21-7-pm/concert/18085142 | - |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | treaty-oak-revival | verify (applied) | 18590276 | https://seatgeek.com/treaty-oak-revival-tickets/tulsa-oklahoma-bok-center-2026-11-21-6-pm/concert/18590276 | - |
| tm-sting-2026-brooklyn-k7v1ako_v_za5cgcc | sting | verify (applied) | 18626604 | https://seatgeek.com/sting-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-21-7-pm/concert/18626604 | - |
| tm-doja-cat-2026-washington-1a4zkgygkdpgprp | doja-cat | verify (applied) | 17769348 | https://seatgeek.com/doja-cat-tickets/washington-district-of-columbia-capital-one-arena-2026-11-21-7-30-pm/concert/17769348 | - |
| tm-metallica-2026-uncasville-g5vvz_6n-zpjb | metallica | verify (applied) | 18164313 | https://seatgeek.com/metallica-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-21-8-pm/concert/18164313 | - |
| tm-trivium-2026-chicago-vvg18z_cnmg_i8 | trivium | verify (applied) | 18391955 | https://seatgeek.com/trivium-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-21-6-35-pm/concert/18391955 | - |
| tm-john-summit-2026-miami-vvg1vz_5ctzbz1 | john-summit | verify (applied) | 18257261 | https://seatgeek.com/john-summit-tickets/miami-florida-kaseya-center-2026-11-21-8-pm/concert/18257261 | - |
| tm-blue-october-2026-orlando-1aefz_kgknmxmnk | blue-october | verify (applied) | 18140980 | https://seatgeek.com/blue-october-tickets/orlando-florida-hard-rock-live-orlando-2026-11-21-8-pm/concert/18140980 | - |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | sabaton | verify (applied) | 17857308 | https://seatgeek.com/sabaton-tickets/milwaukee-wisconsin-landmark-credit-union-live-2026-11-21-7-pm/concert/17857308 | - |
| tm-los-tigres-del-norte-2026-detroit-vv1kezv0jiga2jpfm | los-tigres-del-norte | verify (applied) | 18138848 | https://seatgeek.com/los-tigres-del-norte-tickets/detroit-michigan-fox-theatre-detroit-2026-11-21-8-pm/concert/18138848 | - |
| tm-zac-brown-band-2026-rosemont-vv1a7zk8sgkdldbon | zac-brown-band | verify (applied) | 18032037 | https://seatgeek.com/zac-brown-band-tickets/rosemont-illinois-allstate-arena-2026-11-21-7-pm/concert/18032037 | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | brandi-carlile | verify (applied) | 18626671 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-21-8-pm/concert/18626671 | - |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | ty-myers | verify (applied) | 18142347 | https://seatgeek.com/ty-myers-tickets/fort-worth-texas-dickies-arena-2026-11-21-7-30-pm/concert/18142347 | - |
| tm-death-cab-for-cutie-2026-chicago-vvg18z_cej4l_d | death-cab-for-cutie | verify (applied) | 18393602 | https://seatgeek.com/death-cab-for-cutie-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-21-8-pm/concert/18393602 | - |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | stevie-wonder | verify (applied) | 18570213 | https://seatgeek.com/stevie-wonder-tickets/chicago-illinois-united-center-2026-11-21-8-pm/concert/18570213 | - |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | victoria-monet | verify (applied) | 18579799 | https://seatgeek.com/victoria-monet-tickets/toronto-canada-coca-cola-coliseum-2026-11-21-8-pm/concert/18579799 | - |
| tm-three-days-grace-2026-phoenix-1a_zku0gkemfp-f | three-days-grace | verify (applied) | 17895178 | https://seatgeek.com/three-days-grace-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2026-11-21-7-pm/concert/17895178 | - |
| tm-rawayana-2026-irving-vvg1yz_kyui28o | rawayana | verify (applied) | 18127554 | https://seatgeek.com/rawayana-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-21-8-pm/concert/18127554 | - |
| tm-gary-allan-2026-biloxi-g5viz_889usjk | gary-allan | verify (applied) | 18472669 | https://seatgeek.com/gary-allan-tickets/biloxi-mississippi-beau-rivage-theatre-2026-11-21-8-pm/concert/18472669 | - |
| tm-jonas-brothers-2026-san-francisco-g5vyz_8sbxulz | jonas-brothers | verify (applied) | 18503911 | https://seatgeek.com/jonas-brothers-tickets/san-francisco-california-chase-center-2026-11-21-7-30-pm/concert/18503911 | - |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | arcangel | verify (applied) | 18266334 | https://seatgeek.com/arcangel-tickets/san-jose-california-san-jose-civic-2026-11-21-8-pm/concert/18266334 | - |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | katseye | verify (applied) | 18240162 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-21-8-pm/concert/18240162 | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | verify (applied) | 18427238 | https://seatgeek.com/pentatonix-tickets/hamilton-canada-td-coliseum-2026-11-22-6-pm/concert/18427238 | - |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | the-neighbourhood | verify (applied) | 18194371 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-22-6-pm/concert/18194371 | - |
| tm-missio-2026-boston-vv177z_8gklypyp_ | missio | verify (applied) | 18492289 | https://seatgeek.com/missio-tickets/boston-massachusetts-brighton-music-hall-2026-11-22-7-pm/concert/18492289 | - |
| tm-tyla-2026-chicago-vvg18z_2o77qju | tyla | verify (applied) | 18404276 | https://seatgeek.com/tyla-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-22-6-30-pm/concert/18404276 | - |
| tm-trivium-2026-madison-vvg1jz_cbaz-zj | trivium | verify (applied) | 18391957 | https://seatgeek.com/trivium-tickets/madison-wisconsin-the-sylvee-2026-11-22-6-35-pm/concert/18391957 | - |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | beartooth | verify (applied) | 18253048 | https://seatgeek.com/beartooth-tickets/omaha-nebraska-steelhouse-omaha-2026-11-22-6-30-pm/concert/18253048 | - |
| tm-blue-october-2026-atlanta-vvg1zz_6ddzdk3 | blue-october | verify (applied) | 18140880 | https://seatgeek.com/blue-october-tickets/atlanta-georgia-the-tabernacle-atlanta-2026-11-22-8-pm/concert/18140880 | - |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | sabaton | verify (applied) | 17732691 | https://seatgeek.com/sabaton-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-11-22-7-pm/concert/17732691 | - |
| tm-little-big-town-2026-toronto-177zv0g6g2_mkrp | little-big-town | verify (applied) | 18292641 | https://seatgeek.com/little-big-town-tickets/toronto-canada-massey-hall-2026-11-22-8-pm/concert/18292641 | - |
| tm-jodeci-2026-louisville-17aov0g629rlldo | jodeci | verify (applied) | 18407257 | https://seatgeek.com/jodeci-tickets/louisville-kentucky-louisville-palace-2026-11-22-8-pm/concert/18407257 | - |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | victoria-monet | verify (applied) | 18579779 | https://seatgeek.com/victoria-monet-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-11-22-8-pm/concert/18579779 | - |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | brandi-carlile | verify (applied) | 18626672 | https://seatgeek.com/brandi-carlile-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-22-8-pm/concert/18626672 | - |
| tm-journey-2026-denver-g5vzz_1kxjfbe | journey | verify (applied) | 18237128 | https://seatgeek.com/journey-tickets/denver-colorado-ball-arena-2026-11-22-7-30-pm/concert/18237128 | - |
| tm-three-days-grace-2026-inglewood-vv1aazkupgkerzcmz | three-days-grace | verify (applied) | 17895177 | https://seatgeek.com/three-days-grace-tickets/inglewood-california-intuit-dome-2026-11-22-7-pm/concert/17895177 | - |
| tm-jonas-brothers-2026-sacramento-g5vyz_8sde9yz | jonas-brothers | verify (applied) | 18503910 | https://seatgeek.com/jonas-brothers-tickets/sacramento-california-golden-1-center-2026-11-22-7-30-pm/concert/18503910 | - |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | katseye | verify (applied) | 18258420 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-22-8-pm/concert/18258420 | - |
| tm-sombr-2026-new-york-g5diz_flfogz- | sombr | verify (applied) | 18175563 | https://seatgeek.com/sombr-tickets/new-york-new-york-madison-square-garden-2026-11-23-7-pm/concert/18175563 | - |
| tm-doja-cat-2026-boston-vv1f7zbs09vyzd227 | doja-cat | verify (applied) | 17769352 | https://seatgeek.com/doja-cat-tickets/boston-massachusetts-td-garden-2026-11-23-7-30-pm/concert/17769352 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | verify (applied) | 18211703 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-23-7-pm/concert/18211703 | - |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | verify (applied) | 18570216 | https://seatgeek.com/stevie-wonder-tickets/washington-district-of-columbia-capital-one-arena-2026-11-23-8-pm/concert/18570216 | - |
| tm-sombr-2026-new-york-g5diz_flffpzi | sombr | verify (applied) | 18176743 | https://seatgeek.com/sombr-tickets/new-york-new-york-madison-square-garden-2026-11-24-7-pm/concert/18176743 | - |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | trans-siberian-orchestra | verify (applied) | 18573369 | https://seatgeek.com/trans-siberian-orchestra-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-24-7-30-pm/concert/18573369 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | verify (applied) | 18211705 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-24-7-pm/concert/18211705 | - |
| tm-john-summit-2026-chicago-vvg18z_52-bljx | john-summit | verify (applied) | 18257260 | https://seatgeek.com/john-summit-tickets/chicago-illinois-united-center-2026-11-24-7-pm/concert/18257260 | - |
| tm-sabaton-2026-chicago-vv178zbwgkltpkse | sabaton | verify (applied) | 17732693 | https://seatgeek.com/sabaton-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-24-7-pm/concert/17732693 | - |
| tm-sting-2026-orlando-1aefz_fgklnyeh_ | sting | verify (applied) | 17898563 | https://seatgeek.com/sting-tickets/orlando-florida-hard-rock-live-orlando-2026-11-24-8-pm/concert/17898563 | - |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | victoria-monet | verify (applied) | 18579782 | https://seatgeek.com/victoria-monet-tickets/new-york-new-york-the-theater-at-msg-1-2026-11-24-8-pm/concert/18579782 | - |
| tm-jodeci-2026-memphis-g5viz_2h5lx5n | jodeci | verify (applied) | 18407256 | https://seatgeek.com/jodeci-tickets/memphis-tennessee-orpheum-theatre-memphis-2026-11-24-8-pm/concert/18407256 | - |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | katseye | verify (applied) | 18240163 | https://seatgeek.com/katseye-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-24-8-pm/concert/18240163 | - |
| tm-journey-2026-anaheim-vvg10z_1q4chn3 | journey | verify (applied) | 18237129 | https://seatgeek.com/journey-tickets/anaheim-california-honda-center-2026-11-24-7-30-pm/concert/18237129 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | steve-lacy | verify (applied) | 18485954 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-24-8-pm/concert/18485954 | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | verify (applied) | 17769355 | https://seatgeek.com/doja-cat-tickets/toronto-canada-scotiabank-arena-2026-11-25-7-30-pm/concert/17769355 | - |
| tm-tyla-2026-boston-vvg17z_2pblciw | tyla | verify (applied) | 18404277 | https://seatgeek.com/tyla-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-11-25-8-pm/concert/18404277 | - |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | sabaton | verify (applied) | 17732688 | https://seatgeek.com/sabaton-tickets/waukee-iowa-vibrant-music-hall-2026-11-25-7-pm/concert/17732688 | - |
| tm-sting-2026-hollywood-vvg1vz_8wi3ad6 | sting | verify (applied) | 18507833 | https://seatgeek.com/sting-tickets/hollywood-florida-hard-rock-live-hollywood-2026-11-25-8-pm/concert/18507833 | - |
| tm-john-summit-2026-chicago-vvg18z_52-dlqv | john-summit | verify (applied) | 18257264 | https://seatgeek.com/john-summit-tickets/chicago-illinois-united-center-2026-11-25-7-pm/concert/18257264 | - |
| tm-blue-october-2026-nashville-g5viz_kskltsv | blue-october | verify (applied) | 18126041 | https://seatgeek.com/blue-october-tickets/nashville-tennessee-the-truth-nashville-2026-11-25-8-pm/concert/18126041 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8bk7kme | steve-lacy | verify (applied) | 18613496 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-25-8-pm/concert/18613496 | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | tyla | verify (applied) | 18404308 | https://seatgeek.com/tyla-tickets/toronto-canada-coca-cola-coliseum-2026-11-26-8-pm/concert/18404308 | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | trans-siberian-orchestra | verify (applied) | 18573376 | https://seatgeek.com/trans-siberian-orchestra-tickets/manchester-new-hampshire-snhu-arena-2026-11-27-2-30-pm/concert/18573376 | - |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | trans-siberian-orchestra | verify (applied) | 18573377 | https://seatgeek.com/trans-siberian-orchestra-tickets/boise-idaho-extramile-arena-2026-11-27-2-pm/concert/18573377 | - |
| tm-john-summit-2026-philadelphia-vvg1fz_5ctejox | john-summit | verify (applied) | 18257265 | https://seatgeek.com/john-summit-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-27-7-pm/concert/18257265 | - |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | doja-cat | verify (applied) | 17769357 | https://seatgeek.com/doja-cat-tickets/montreal-canada-centre-bell-2026-11-27-7-30-pm/concert/17769357 | - |
| tm-los-tigres-del-norte-2026-baltimore-164zko9e6zackudg | los-tigres-del-norte | verify (applied) | 18092532 | https://seatgeek.com/los-tigres-del-norte-tickets/baltimore-maryland-cfg-bank-arena-2026-11-27-8-pm/concert/18092532 | - |
| tm-black-stone-cherry-2026-lexington-1avbz_kgklcscxl | black-stone-cherry | verify (applied) | 18630042 | https://seatgeek.com/black-stone-cherry-tickets/lexington-kentucky-manchester-music-hall-2026-11-27-8-pm/concert/18630042 | - |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | victoria-monet | verify (applied) | 18579783 | https://seatgeek.com/victoria-monet-tickets/washington-district-of-columbia-the-anthem-dc-2026-11-27-8-pm/concert/18579783 | - |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | jonas-brothers | verify (applied) | 18503907 | https://seatgeek.com/jonas-brothers-tickets/glendale-arizona-desert-diamond-arena-2026-11-27-7-30-pm/concert/18503907 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | eagles | verify (applied) | 18219952 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-27-8-30-pm/concert/18219952 | - |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | trans-siberian-orchestra | verify (applied) | 18573384 | https://seatgeek.com/trans-siberian-orchestra-tickets/worcester-massachusetts-dcu-center-2026-11-28-3-pm/concert/18573384 | - |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | trans-siberian-orchestra | verify (applied) | 18573385 | https://seatgeek.com/trans-siberian-orchestra-tickets/portland-oregon-moda-center-2026-11-28-3-30-pm/concert/18573385 | - |
| tm-john-summit-2026-brooklyn-17gzv0g655ozaay | john-summit | verify (applied) | 18257237 | https://seatgeek.com/john-summit-tickets/brooklyn-new-york-barclays-center-2026-11-28-7-pm/concert/18257237 | - |
| tm-pentatonix-2026-charlottesville-vv1f7z_8uv7ozdc1c | pentatonix | verify (applied) | 18427205 | https://seatgeek.com/pentatonix-tickets/charlottesville-virginia-john-paul-jones-arena-2026-11-28-7-pm/concert/18427205 | - |
| tm-sabaton-2026-cincinnati-1avbzbwgkn0vsnb | sabaton | verify (applied) | 17732695 | https://seatgeek.com/sabaton-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-11-28-7-pm/concert/17732695 | - |
| tm-beartooth-2026-nashville-g5viz_1sjbpcf | beartooth | verify (applied) | 18253047 | https://seatgeek.com/beartooth-tickets/nashville-tennessee-the-truth-nashville-2026-11-28-6-30-pm/concert/18253047 | - |
| tm-trivium-2026-houston-g5diz_cdfyhi_ | trivium | verify (applied) | 18391965 | https://seatgeek.com/trivium-tickets/houston-texas-bayou-music-center-2026-11-28-6-35-pm/concert/18391965 | - |
| tm-tyla-2026-brooklyn-k7vgf_2xiqkw5 | tyla | verify (applied) | 18404284 | https://seatgeek.com/tyla-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-28-8-pm/concert/18404284 | - |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | a-boogie-wit-da-hoodie | verify (applied) | 18629264 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/toronto-canada-scotiabank-arena-2026-11-28-8-pm/concert/18629264 | - |
| tm-los-tigres-del-norte-2026-belmont-park-1kgzv0pfgagsn5l | los-tigres-del-norte | verify (applied) | 18093247 | https://seatgeek.com/los-tigres-del-norte-tickets/elmont-new-york-ubs-arena-2026-11-28-8-pm/concert/18093247 | - |
| tm-blue-october-2026-irving-vvg1yz_68kdxnx | blue-october | verify (applied) | 18141903 | https://seatgeek.com/blue-october-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-28-8-pm/concert/18141903 | - |
| tm-journey-2026-san-francisco-g5vyz_aeock9c | journey | verify (applied) | 18237132 | https://seatgeek.com/journey-tickets/san-francisco-california-chase-center-2026-11-28-7-30-pm/concert/18237132 | - |
| tm-steve-lacy-2026-seattle-vvg1hz_8pk8e2l | steve-lacy | verify (applied) | 18485955 | https://seatgeek.com/steve-lacy-tickets/seattle-washington-wamu-theater-2026-11-28-7-pm/concert/18485955 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | eagles | verify (applied) | 18219951 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-28-8-30-pm/concert/18219951 | - |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | trans-siberian-orchestra | verify (applied) | 18573390 | https://seatgeek.com/trans-siberian-orchestra-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-29-3-pm/concert/18573390 | - |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | trans-siberian-orchestra | verify (applied) | 18573391 | https://seatgeek.com/trans-siberian-orchestra-tickets/seattle-washington-climate-pledge-arena-2026-11-29-3-pm/concert/18573391 | - |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | sabaton | verify (applied) | 17732696 | https://seatgeek.com/sabaton-tickets/detroit-michigan-the-fillmore-detroit-2026-11-29-7-pm/concert/17732696 | - |
| tm-beartooth-2026-atlanta-vvg1zz_1br-um- | beartooth | verify (applied) | 18253055 | https://seatgeek.com/beartooth-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-11-29-6-30-pm/concert/18253055 | - |
| tm-pentatonix-2026-albany-k7vgf_2br5dvf | pentatonix | verify (applied) | 18427206 | https://seatgeek.com/pentatonix-tickets/albany-new-york-mvp-arena-2026-11-29-7-pm/concert/18427206 | - |
| tm-john-summit-2026-brooklyn-17gzv0g65ttxsbe | john-summit | verify (applied) | 18620964 | https://seatgeek.com/john-summit-tickets/brooklyn-new-york-barclays-center-2026-11-29-7-pm/concert/18620964 | - |
| tm-doja-cat-2026-philadelphia-1adzzbsgkldzvua | doja-cat | verify (applied) | 17769353 | https://seatgeek.com/doja-cat-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-29-7-30-pm/concert/17769353 | - |
| tm-trivium-2026-dallas-vvg1yz_cdoxznj | trivium | verify (applied) | 18391967 | https://seatgeek.com/trivium-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-29-6-35-pm/concert/18391967 | - |
| tm-tyla-2026-brooklyn-k7vgf_2xiquwo | tyla | verify (applied) | 18414938 | https://seatgeek.com/tyla-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-29-9-pm/concert/18414938 | - |
| tm-jodeci-2026-houston-g5diz_2lvp-gm | jodeci | verify (applied) | 18407262 | https://seatgeek.com/jodeci-tickets/houston-texas-arena-theatre-houston-2026-11-29-8-pm/concert/18407262 | - |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | the-neighbourhood | verify (applied) | 18085146 | https://seatgeek.com/the-neighbourhood-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-30-7-30-pm/concert/18085146 | - |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | brent-faiyaz | verify (applied) | 18617422 | https://seatgeek.com/brent-faiyaz-tickets/chicago-illinois-united-center-2026-11-30-8-pm/concert/18617422 | - |
| tm-steve-lacy-2026-vancouver-1aozkf7gkepzmxx | steve-lacy | verify (applied) | 18485961 | https://seatgeek.com/steve-lacy-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-30-8-pm/concert/18485961 | - |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | victoria-monet | verify (applied) | 18579785 | https://seatgeek.com/victoria-monet-tickets/nashville-tennessee-the-truth-nashville-2026-11-30-8-pm/concert/18579785 | - |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | jonas-brothers | verify (applied) | 18503919 | https://seatgeek.com/jonas-brothers-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-30-7-30-pm/concert/18503919 | - |
| tm-beartooth-2026-charlotte-g5evz_1mwgsx1 | beartooth | verify (applied) | 18253056 | https://seatgeek.com/beartooth-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-01-6-30-pm/concert/18253056 | - |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | sabaton | verify (applied) | 17732703 | https://seatgeek.com/sabaton-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-01-7-pm/concert/17732703 | - |
| tm-doja-cat-2026-new-york-g5dizbsintkzt | doja-cat | verify (applied) | 17769298 | https://seatgeek.com/doja-cat-tickets/new-york-new-york-madison-square-garden-2026-12-01-7-30-pm/concert/17769298 | - |
| tm-gavin-adcock-2026-houston-g5diz_3mqabzl | gavin-adcock | verify (applied) | 18701462 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-713-music-hall-2026-12-01-7-30-pm/concert/18701462 | - |
| tm-jodeci-2026-north-little-rock-g5viz_29tplat | jodeci | verify (applied) | 18407263 | https://seatgeek.com/jodeci-tickets/north-little-rock-arkansas-simmons-bank-arena-2026-12-01-8-30-pm/concert/18407263 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | olivia-rodrigo | verify (applied) | 18211742 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-01-7-pm/concert/18211742 | - |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | trans-siberian-orchestra | verify (applied) | 18573399 | https://seatgeek.com/trans-siberian-orchestra-tickets/sacramento-california-golden-1-center-2026-12-02-3-pm/concert/18573399 | - |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | sabaton | verify (applied) | 17732700 | https://seatgeek.com/sabaton-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-02-7-pm/concert/17732700 | - |
| tm-tyla-2026-washington-17a8v0g6267w7kc | tyla | verify (applied) | 18404285 | https://seatgeek.com/tyla-tickets/washington-district-of-columbia-the-anthem-dc-2026-12-02-7-30-pm/concert/18404285 | - |
| tm-trivium-2026-phoenix-17k8v0g62douihb | trivium | verify (applied) | 18391969 | https://seatgeek.com/trivium-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-02-6-30-pm/concert/18391969 | - |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | trans-siberian-orchestra | verify (applied) | 18573401 | https://seatgeek.com/trans-siberian-orchestra-tickets/nashville-tennessee-bridgestone-arena-2026-12-02-7-30-pm/concert/18573401 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | olivia-rodrigo | verify (applied) | 18211743 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-02-7-pm/concert/18211743 | - |
| tm-gracie-abrams-2026-denver-g5vzz_55eui2w | gracie-abrams | verify (applied) | 18270516 | https://seatgeek.com/gracie-abrams-tickets/denver-colorado-ball-arena-2026-12-02-8-pm/concert/18270516 | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | the-neighbourhood | verify (applied) | 18085147 | https://seatgeek.com/the-neighbourhood-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-02-7-30-pm/concert/18085147 | - |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | jonas-brothers | verify (applied) | 18503918 | https://seatgeek.com/jonas-brothers-tickets/anaheim-california-honda-center-2026-12-02-7-30-pm/concert/18503918 | - |
| tm-pentatonix-2026-baltimore-17a8v0g62urg9es | pentatonix | verify (applied) | 18427209 | https://seatgeek.com/pentatonix-tickets/baltimore-maryland-cfg-bank-arena-2026-12-03-7-pm/concert/18427209 | - |
| tm-sabaton-2026-pittsburgh-1avbz_kgkwfjp1j | sabaton | verify (applied) | 18126079 | https://seatgeek.com/sabaton-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-03-7-pm/concert/18126079 | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | trans-siberian-orchestra | verify (applied) | 18573402 | https://seatgeek.com/trans-siberian-orchestra-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2026-12-03-7-30-pm/concert/18573402 | - |
| tm-tommy-emmanuel-2026-charleston-g5evz_aboyxr9 | tommy-emmanuel | verify (applied) | 18225241 | https://seatgeek.com/tommy-emmanuel-tickets/charleston-south-carolina-charleston-music-hall-2026-12-03-8-pm/concert/18225241 | - |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | brent-faiyaz | verify (applied) | 18618383 | https://seatgeek.com/brent-faiyaz-tickets/brooklyn-new-york-barclays-center-2026-12-03-8-pm/concert/18618383 | - |
| tm-rawayana-2026-orlando-1aefz_kgkuqmj8a | rawayana | verify (applied) | 18126388 | https://seatgeek.com/rawayana-tickets/orlando-florida-kia-center-2026-12-03-8-pm/concert/18126388 | - |
| tm-jodeci-2026-birmingham-17fzv0g62rrj3c3 | jodeci | verify (applied) | 18407266 | https://seatgeek.com/jodeci-tickets/birmingham-alabama-bjcc-concert-hall-2026-12-03-7-30-pm/concert/18407266 | - |
| tm-gracie-abrams-2026-denver-g5vzz_5lhxedg | gracie-abrams | verify (applied) | 18270512 | https://seatgeek.com/gracie-abrams-tickets/denver-colorado-ball-arena-2026-12-03-8-pm/concert/18270512 | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | trans-siberian-orchestra | verify (applied) | 18573408 | https://seatgeek.com/trans-siberian-orchestra-tickets/fresno-california-save-mart-center-2026-12-03-7-pm/concert/18573408 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | barry-manilow | verify (applied) | 17637156 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-03-7-pm/concert/17637156 | - |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | pink-martini | verify (applied) | 18267277 | https://seatgeek.com/pink-martini-tickets/reno-nevada-grand-sierra-resort-2026-12-03-7-30-pm/concert/18267277 | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | trans-siberian-orchestra | verify (applied) | 18573409 | https://seatgeek.com/trans-siberian-orchestra-tickets/toledo-ohio-huntington-center-2026-12-04-3-pm/concert/18573409 | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | blue-october | verify (applied) | 18141993 | https://seatgeek.com/blue-october-tickets/minneapolis-minnesota-fillmore-minneapolis-2026-12-04-7-pm/concert/18141993 | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkrzxgxw | garth-brooks | verify (applied) | 18726838 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-04-8-pm/concert/18726838 | - |
| tm-rawayana-2026-miami-vvg1vz_fh4bcfd | rawayana | verify (applied) | 18659426 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-04-8-pm/concert/18659426 | - |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | lil-wayne | verify (applied) | 18128388 | https://seatgeek.com/lil-wayne-tickets/lexington-kentucky-rupp-arena-2026-12-04-8-30-pm/concert/18128388 | - |
| tm-los-tigres-del-norte-2026-nashville-g5viz_an5hweq | los-tigres-del-norte | verify (applied) | 18092545 | https://seatgeek.com/los-tigres-del-norte-tickets/nashville-tennessee-bridgestone-arena-2026-12-04-8-pm/concert/18092545 | - |
| tm-trivium-2026-inglewood-vvg1iz_ceqwhij | trivium | verify (applied) | 18391972 | https://seatgeek.com/trivium-tickets/inglewood-california-youtube-theater-2026-12-04-6-35-pm/concert/18391972 | - |
| tm-john-summit-2026-oakland-g5vyz_5chdjie | john-summit | verify (applied) | 18257267 | https://seatgeek.com/john-summit-tickets/oakland-california-oakland-arena-2026-12-04-7-pm/concert/18257267 | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | the-neighbourhood | verify (applied) | 18085152 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-04-7-pm/concert/18085152 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | barry-manilow | verify (applied) | 17637157 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-04-8-pm/concert/17637157 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | eagles | verify (applied) | 18355049 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-04-8-30-pm/concert/18355049 | - |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | trans-siberian-orchestra | verify (applied) | 18573412 | https://seatgeek.com/trans-siberian-orchestra-tickets/columbus-ohio-nationwide-arena-2026-12-05-3-pm/concert/18573412 | - |
| tm-pentatonix-2026-columbia-g5evz_2t_yqom | pentatonix | verify (applied) | 18427214 | https://seatgeek.com/pentatonix-tickets/columbia-south-carolina-colonial-life-arena-2026-12-05-7-pm/concert/18427214 | - |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | sabaton | verify (applied) | 17732702 | https://seatgeek.com/sabaton-tickets/virginia-beach-virginia-the-dome-13-2026-12-05-7-pm/concert/17732702 | - |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | lil-wayne | verify (applied) | 18649583 | https://seatgeek.com/lil-wayne-tickets/savannah-georgia-enmarket-arena-2026-12-05-7-pm/concert/18649583 | - |
| tm-tommy-emmanuel-2026-chattanooga-g5viz_au3swzr | tommy-emmanuel | verify (applied) | 18225539 | https://seatgeek.com/tommy-emmanuel-tickets/chattanooga-tennessee-the-walker-theatre-chattanooga-2026-12-05-7-30-pm/concert/18225539 | - |
| tm-tyla-2026-tampa-vvg1vz_2xeqp5j | tyla | verify (applied) | 18404289 | https://seatgeek.com/tyla-tickets/tampa-florida-yuengling-center-2026-12-05-8-pm/concert/18404289 | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkre8jcm | garth-brooks | verify (applied) | 18726837 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-05-8-pm/concert/18726837 | - |
| tm-rawayana-2026-miami-vvg1vz_kwnj_rj | rawayana | verify (applied) | 18126459 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-05-8-pm/concert/18126459 | - |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | blue-october | verify (applied) | 18142048 | https://seatgeek.com/blue-october-tickets/la-vista-nebraska-the-astro-theater-la-vista-2026-12-05-8-pm/concert/18142048 | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | the-neighbourhood | verify (applied) | 18194373 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-05-6-pm/concert/18194373 | - |
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | los-tigres-del-norte | verify (applied) | 18092802 | https://seatgeek.com/los-tigres-del-norte-tickets/birmingham-alabama-bjcc-concert-hall-2026-12-05-8-pm/concert/18092802 | - |
| tm-jodeci-2026-lake-charles-g5viz_2mnhtb3 | jodeci | verify (applied) | 18407282 | https://seatgeek.com/jodeci-tickets/lake-charles-louisiana-lake-charles-event-center-2026-12-05-8-pm/concert/18407282 | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | trivium | verify (applied) | 18391974 | https://seatgeek.com/trivium-tickets/san-francisco-california-the-masonic-san-francisco-2026-12-05-6-35-pm/concert/18391974 | - |
| tm-john-summit-2026-oakland-g5vyz_5925f5n | john-summit | verify (applied) | 18274896 | https://seatgeek.com/john-summit-tickets/oakland-california-oakland-arena-2026-12-05-7-pm/concert/18274896 | - |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | luke-bryan | verify (applied) | 18571831 | https://seatgeek.com/luke-bryan-tickets/mescalero-new-mexico-inn-of-the-mountain-gods-resort-and-casino-2026-12-05-8-pm/concert/18571831 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | barry-manilow | verify (applied) | 17637159 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | jonas-brothers | verify (applied) | 18503920 | https://seatgeek.com/jonas-brothers-tickets/seattle-washington-climate-pledge-arena-2026-12-05-7-30-pm/concert/18503920 | - |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | victoria-monet | verify (applied) | 18579787 | https://seatgeek.com/victoria-monet-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-05-8-pm/concert/18579787 | - |
| tm-gary-allan-2026-napa-g5vyz_3dfyx0l | gary-allan | verify (applied) | 18593936 | https://seatgeek.com/gary-allan-tickets/napa-california-uptown-theatre-napa-2026-12-05-8-pm/concert/18593936 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | eagles | verify (applied) | 18355050 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-05-8-30-pm/concert/18355050 | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkr__tfz | garth-brooks | verify (applied) | 18739726 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-06-2-pm/concert/18739726 | - |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | trans-siberian-orchestra | verify (applied) | 18573423 | https://seatgeek.com/trans-siberian-orchestra-tickets/grand-rapids-michigan-van-andel-arena-2026-12-06-3-pm/concert/18573423 | - |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | trans-siberian-orchestra | verify (applied) | 18573424 | https://seatgeek.com/trans-siberian-orchestra-tickets/phoenix-arizona-mortgage-matchup-center-2026-12-06-3-pm/concert/18573424 | - |
| tm-pentatonix-2026-greenville-g5evz_2tznjd_ | pentatonix | verify (applied) | 18427215 | https://seatgeek.com/pentatonix-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-06-6-pm/concert/18427215 | - |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | sabaton | verify (applied) | 17732707 | https://seatgeek.com/sabaton-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-12-06-7-pm/concert/17732707 | - |
| tm-tyla-2026-atlanta-vvg1zz_2xnv9ge | tyla | verify (applied) | 18404290 | https://seatgeek.com/tyla-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-06-8-pm/concert/18404290 | - |
| tm-rawayana-2026-miami-vvg1vz_6kilnkl | rawayana | verify (applied) | 18132184 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-06-8-pm/concert/18132184 | - |
| tm-jodeci-2026-mobile-g5viz_2rkvisc | jodeci | verify (applied) | 18407267 | https://seatgeek.com/jodeci-tickets/mobile-alabama-saenger-theatre-mobile-2026-12-06-7-30-pm/concert/18407267 | - |
| tm-gracie-abrams-2026-oakland-g5vyz_1udxfhx | gracie-abrams | verify (applied) | 18270513 | https://seatgeek.com/gracie-abrams-tickets/oakland-california-oakland-arena-2026-12-06-8-pm/concert/18270513 | - |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | victoria-monet | verify (applied) | 18579790 | https://seatgeek.com/victoria-monet-tickets/san-diego-california-cal-coast-credit-union-open-air-theatre-at-sdsu-2026-12-06-8-pm/concert/18579790 | - |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | beartooth | verify (applied) | 18253062 | https://seatgeek.com/beartooth-tickets/new-orleans-louisiana-fillmore-new-orleans-2026-12-07-5-30-pm/concert/18253062 | - |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | pentatonix | verify (applied) | 18427217 | https://seatgeek.com/pentatonix-tickets/raleigh-north-carolina-lenovo-center-2026-12-07-7-pm/concert/18427217 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-gracie-abrams-2026-oakland-g5vyz_5mq0w7n | gracie-abrams | verify (applied) | 18270514 | https://seatgeek.com/gracie-abrams-tickets/oakland-california-oakland-arena-2026-12-07-8-pm/concert/18270514 | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | sabaton | verify (applied) | 17732711 | https://seatgeek.com/sabaton-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-08-7-pm/concert/17732711 | - |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | stevie-wonder | verify (applied) | 18570215 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-08-8-pm/concert/18570215 | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | trivium | verify (applied) | 18391979 | https://seatgeek.com/trivium-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-12-08-6-35-pm/concert/18391979 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | victoria-monet | verify (applied) | 18579791 | https://seatgeek.com/victoria-monet-tickets/inglewood-california-youtube-theater-2026-12-08-8-pm/concert/18579791 | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | trans-siberian-orchestra | verify (applied) | 18573432 | https://seatgeek.com/trans-siberian-orchestra-tickets/allentown-pennsylvania-ppl-center-2026-12-09-7-30-pm/concert/18573432 | - |
| tm-pentatonix-2026-nashville-g5viz_8pdi7wi | pentatonix | verify (applied) | 18427219 | https://seatgeek.com/pentatonix-tickets/nashville-tennessee-bridgestone-arena-2026-12-09-7-pm/concert/18427219 | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | sabaton | verify (applied) | 18126050 | https://seatgeek.com/sabaton-tickets/nashville-tennessee-the-truth-nashville-2026-12-09-7-pm/concert/18126050 | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | trans-siberian-orchestra | verify (applied) | 18573433 | https://seatgeek.com/trans-siberian-orchestra-tickets/austin-texas-moody-center-atx-2026-12-09-7-pm/concert/18573433 | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | stevie-wonder | verify (applied) | 18570217 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-09-8-pm/concert/18570217 | - |
| tm-tyla-2026-irving-vvg1yz_2hhoqxx | tyla | verify (applied) | 18404288 | https://seatgeek.com/tyla-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-12-09-8-pm/concert/18404288 | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | jonas-brothers | verify (applied) | 18503921 | https://seatgeek.com/jonas-brothers-tickets/denver-colorado-ball-arena-2026-12-09-7-30-pm/concert/18503921 | - |
| tm-trivium-2026-seattle-vvg1hz_2dp1x5t | trivium | verify (applied) | 18391981 | https://seatgeek.com/trivium-tickets/seattle-washington-paramount-theatre-wa-2026-12-09-6-35-pm/concert/18391981 | - |
| tm-gracie-abrams-2026-glendale-17k8v0g652smnjw | gracie-abrams | verify (applied) | 18270517 | https://seatgeek.com/gracie-abrams-tickets/glendale-arizona-desert-diamond-arena-2026-12-09-8-pm/concert/18270517 | - |
| tm-pentatonix-2026-atlanta-vvg1zz_8pzyi3r | pentatonix | verify (applied) | 18427220 | https://seatgeek.com/pentatonix-tickets/atlanta-georgia-state-farm-arena-1-2026-12-10-7-pm/concert/18427220 | - |
| tm-beartooth-2026-dallas-vvg1yz_1mmkrmi | beartooth | verify (applied) | 18253067 | https://seatgeek.com/beartooth-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-12-10-6-30-pm/concert/18253067 | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | trans-siberian-orchestra | verify (applied) | 18573435 | https://seatgeek.com/trans-siberian-orchestra-tickets/raleigh-north-carolina-lenovo-center-2026-12-10-7-30-pm/concert/18573435 | - |
| tm-lady-a-2026-northfield-vvg1fz_gkaw2vw | lady-a | verify (applied) | 18295291 | https://seatgeek.com/lady-a-tickets/northfield-ohio-mgm-northfield-park-center-stage-2026-12-10-7-30-pm/concert/18295291 | - |
| tm-andrea-bocelli-2026-boston-vv1k7z_dz6g7ymm- | andrea-bocelli | verify (applied) | 18039180 | https://seatgeek.com/andrea-bocelli-tickets/boston-massachusetts-td-garden-2026-12-10-8-pm/concert/18039180 | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | trans-siberian-orchestra | verify (applied) | 18573436 | https://seatgeek.com/trans-siberian-orchestra-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-10-7-pm/concert/18573436 | - |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | jonas-brothers | verify (applied) | 18503923 | https://seatgeek.com/jonas-brothers-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-12-10-7-30-pm/concert/18503923 | - |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | blue-october | verify (applied) | 18140959 | https://seatgeek.com/blue-october-tickets/beaumont-texas-jefferson-theatre-2026-12-10-8-pm/concert/18140959 | - |
| tm-tyla-2026-houston-g5diz_2qrewdk | tyla | verify (applied) | 18404291 | https://seatgeek.com/tyla-tickets/houston-texas-713-music-hall-2026-12-10-8-pm/concert/18404291 | - |
| tm-jodeci-2026-nashville-g5viz_2rjh5vs | jodeci | verify (applied) | 18407270 | https://seatgeek.com/jodeci-tickets/nashville-tennessee-the-truth-nashville-2026-12-10-8-pm/concert/18407270 | - |
| tm-gracie-abrams-2026-glendale-17k8v0g65839wds | gracie-abrams | verify (applied) | 18270515 | https://seatgeek.com/gracie-abrams-tickets/glendale-arizona-desert-diamond-arena-2026-12-10-8-pm/concert/18270515 | - |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | cece-winans | verify (applied) | 18361599 | https://seatgeek.com/cece-winans-tickets/seattle-washington-wamu-theater-2026-12-10-7-pm/concert/18361599 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | barry-manilow | verify (applied) | 17637161 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-10-7-pm/concert/17637161 | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | trans-siberian-orchestra | verify (applied) | 18573437 | https://seatgeek.com/trans-siberian-orchestra-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-11-3-pm/concert/18573437 | - |
| tm-sabaton-2026-orlando-16efz_afzg7dbn1 | sabaton | verify (applied) | 18107974 | https://seatgeek.com/sabaton-tickets/orlando-florida-hard-rock-live-orlando-2026-12-11-7-pm/concert/18107974 | - |
| tm-andrea-bocelli-2026-buffalo-k7vgf_dlhwxlk | andrea-bocelli | verify (applied) | 18039185 | https://seatgeek.com/andrea-bocelli-tickets/buffalo-new-york-keybank-center-2026-12-11-8-pm/concert/18039185 | - |
| tm-lord-huron-2026-albany-k7vgf_2d6r7wd | lord-huron | verify (applied) | 18421968 | https://seatgeek.com/lord-huron-tickets/albany-new-york-palace-theatre-albany-2026-12-11-8-pm/concert/18421968 | - |
| tm-lady-a-2026-gary-vvg1fz_5la2nke | lady-a | verify (applied) | 18295733 | https://seatgeek.com/lady-a-tickets/gary-indiana-hard-rock-live-northern-indiana-2026-12-11-7-pm/concert/18295733 | - |
| tm-jodeci-2026-columbia-g5evz_2hnfhnt | jodeci | verify (applied) | 18407274 | https://seatgeek.com/jodeci-tickets/columbia-south-carolina-township-auditorium-2026-12-11-8-pm/concert/18407274 | - |
| tm-tyla-2026-austin-g5diz_2xjh2vb | tyla | verify (applied) | 18404296 | https://seatgeek.com/tyla-tickets/austin-texas-moody-center-atx-2026-12-11-8-pm/concert/18404296 | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | trivium | verify (applied) | 18391984 | https://seatgeek.com/trivium-tickets/reno-nevada-grand-sierra-resort-2026-12-11-6-35-pm/concert/18391984 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | olivia-rodrigo | verify (applied) | 18211712 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-11-7-pm/concert/18211712 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub | barry-manilow | verify (applied) | 17637163 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-11-8-pm/concert/17637163 | - |
| tm-koe-wetzel-2026-las-vegas-1ayzkfkgkdtup_a | koe-wetzel | verify (applied) | 18471843 | https://seatgeek.com/koe-wetzel-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2026-12-11-8-pm/concert/18471843 | - |
| tm-interpol-2026-san-diego-vvg1iz_4dkyacm | interpol | verify (applied) | 18700629 | https://seatgeek.com/interpol-tickets/san-diego-california-soma-san-diego-2026-12-11-8-pm/concert/18700629 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | eagles | verify (applied) | 18355052 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-11-8-30-pm/concert/18355052 | - |
| tm-turnpike-troubadours-2026-las-vegas-17ayv0g62soqkki | turnpike-troubadours | verify (applied) | 18424535 | https://seatgeek.com/turnpike-troubadours-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2026-12-11-9-pm/concert/18424535 | - |
| tm-trans-siberian-orchestra-2026-charlotte-g5evz_o6l3kkc | trans-siberian-orchestra | verify (applied) | 18573447 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-12-12-3-pm/concert/18573447 | - |
| tm-trans-siberian-orchestra-2026-san-antonio-g5diz_8q4vky5 | trans-siberian-orchestra | verify (applied) | 18573448 | https://seatgeek.com/trans-siberian-orchestra-tickets/san-antonio-texas-frost-bank-center-2026-12-12-3-pm/concert/18573448 | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | beartooth | verify (applied) | 18253068 | https://seatgeek.com/beartooth-tickets/denver-colorado-fillmore-auditorium-denver-2026-12-12-5-pm/concert/18253068 | - |
| tm-pentatonix-2026-north-little-rock-g5viz_2r0054y | pentatonix | verify (applied) | 18427222 | https://seatgeek.com/pentatonix-tickets/north-little-rock-arkansas-simmons-bank-arena-2026-12-12-7-pm/concert/18427222 | - |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | jonas-brothers | verify (applied) | 18503922 | https://seatgeek.com/jonas-brothers-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2026-12-12-7-30-pm/concert/18503922 | - |
| tm-billy-strings-2026-austin-g5diz_ub5bart | billy-strings | verify (applied) | 18353604 | https://seatgeek.com/billy-strings-tickets/austin-texas-moody-center-atx-2026-12-12-7-30-pm/concert/18353604 | - |
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | a-boogie-wit-da-hoodie | verify (applied) | 18631720 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-12-12-8-pm/concert/18631720 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | olivia-rodrigo | verify (applied) | 18211714 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-12-7-pm/concert/18211714 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | barry-manilow | verify (applied) | 17637164 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-12-7-pm/concert/17637164 | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | john-summit | verify (applied) | 18494071 | https://seatgeek.com/john-summit-tickets/los-angeles-california-los-angeles-memorial-coliseum-2026-12-12-7-pm/concert/18494071 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | eagles | verify (applied) | 18355051 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | trans-siberian-orchestra | verify (applied) | 18573455 | https://seatgeek.com/trans-siberian-orchestra-tickets/duluth-georgia-gas-south-arena-2026-12-13-3-pm/concert/18573455 | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | trans-siberian-orchestra | verify (applied) | 18573458 | https://seatgeek.com/trans-siberian-orchestra-tickets/dallas-texas-american-airlines-center-2026-12-13-3-pm/concert/18573458 | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | pentatonix | verify (applied) | 18427226 | https://seatgeek.com/pentatonix-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-13-6-pm/concert/18427226 | - |
| tm-pink-martini-2026-brooklyn-k7vgf_u53h-yh | pink-martini | verify (applied) | 18326350 | https://seatgeek.com/pink-martini-tickets/brooklyn-new-york-brooklyn-paramount-2026-12-13-7-pm/concert/18326350 | - |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | beartooth | verify (applied) | 18253071 | https://seatgeek.com/beartooth-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-12-13-6-pm/concert/18253071 | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | andrea-bocelli | verify (applied) | 18039188 | https://seatgeek.com/andrea-bocelli-tickets/montreal-canada-centre-bell-2026-12-13-8-pm/concert/18039188 | - |
| tm-lord-huron-2026-boston-vvg17z_2wsvfp- | lord-huron | verify (applied) | 18421970 | https://seatgeek.com/lord-huron-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-13-8-pm/concert/18421970 | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | blue-october | verify (applied) | 18140941 | https://seatgeek.com/blue-october-tickets/hidalgo-texas-payne-arena-2026-12-13-8-pm/concert/18140941 | - |
| tm-tyla-2026-phoenix-17k8v0g62ljff-n | tyla | verify (applied) | 18404297 | https://seatgeek.com/tyla-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-14-8-pm/concert/18404297 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_53kkqpx | gracie-abrams | verify (applied) | 18270525 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-14-8-pm/concert/18270525 | - |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | victoria-monet | verify (applied) | 18579793 | https://seatgeek.com/victoria-monet-tickets/seattle-washington-wamu-theater-2026-12-14-8-pm/concert/18579793 | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | jonas-brothers | verify (applied) | 18503930 | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 | - |
| tm-pentatonix-2026-austin-g5diz_8kmjslp | pentatonix | verify (applied) | 18427227 | https://seatgeek.com/pentatonix-tickets/austin-texas-moody-center-atx-2026-12-15-7-pm/concert/18427227 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | brandi-carlile | verify (applied) | 18626674 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-15-8-pm/concert/18626674 | - |
| tm-lord-huron-2026-montreal-17g8v0g62wrdz3v | lord-huron | verify (applied) | 18421973 | https://seatgeek.com/lord-huron-tickets/montreal-canada-mtelus-2026-12-15-8-pm/concert/18421973 | - |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | cece-winans | verify (applied) | 18361639 | https://seatgeek.com/cece-winans-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-15-7-pm/concert/18361639 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | olivia-rodrigo | verify (applied) | 18211717 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-15-7-pm/concert/18211717 | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | tyla | verify (applied) | 18404300 | https://seatgeek.com/tyla-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-15-8-pm/concert/18404300 | - |
| tm-pink-martini-2026-red-bank-g5vvz_gnt3jau | pink-martini | verify (applied) | 18325734 | https://seatgeek.com/pink-martini-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-12-16-7-30-pm/concert/18325734 | - |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | trans-siberian-orchestra | verify (applied) | 18573461 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlottesville-virginia-john-paul-jones-arena-2026-12-16-7-30-pm/concert/18573461 | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | trivium | verify (applied) | 18391988 | https://seatgeek.com/trivium-tickets/omaha-nebraska-steelhouse-omaha-2026-12-16-6-35-pm/concert/18391988 | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrs_4p | andrea-bocelli | verify (applied) | 18039165 | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-16-8-pm/concert/18039165 | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | trans-siberian-orchestra | verify (applied) | 18573466 | https://seatgeek.com/trans-siberian-orchestra-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-12-16-7-pm/concert/18573466 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | brandi-carlile | verify (applied) | 18626676 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-16-8-pm/concert/18626676 | - |
| tm-lord-huron-2026-montreal-17g8v0g62wr7i3a | lord-huron | verify (applied) | 18421974 | https://seatgeek.com/lord-huron-tickets/montreal-canada-mtelus-2026-12-16-8-pm/concert/18421974 | - |
| tm-jodeci-2026-miami-beach-vvg1vz_29bl5j9 | jodeci | verify (applied) | 18407278 | https://seatgeek.com/jodeci-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2026-12-16-8-pm/concert/18407278 | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | beartooth | verify (applied) | 18253074 | https://seatgeek.com/beartooth-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-16-6-30-pm/concert/18253074 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-tyla-2026-inglewood-vvg1iz_cjqejmf | tyla | verify (applied) | 18404301 | https://seatgeek.com/tyla-tickets/inglewood-california-youtube-theater-2026-12-16-8-pm/concert/18404301 | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | trans-siberian-orchestra | verify (applied) | 18573467 | https://seatgeek.com/trans-siberian-orchestra-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-12-17-7-pm/concert/18573467 | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | trans-siberian-orchestra | verify (applied) | 18573470 | https://seatgeek.com/trans-siberian-orchestra-tickets/albany-new-york-mvp-arena-2026-12-17-7-30-pm/concert/18573470 | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | andrea-bocelli | verify (applied) | 18039167 | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-17-8-pm/concert/18039167 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | brandi-carlile | verify (applied) | 18626680 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-17-8-pm/concert/18626680 | - |
| tm-lady-a-2026-new-york-g5diz_g2zkgbb | lady-a | verify (applied) | 18294956 | https://seatgeek.com/lady-a-tickets/new-york-new-york-beacon-theatre-2026-12-17-8-pm/concert/18294956 | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | blue-october | verify (applied) | 18140982 | https://seatgeek.com/blue-october-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2026-12-17-8-pm/concert/18140982 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | barry-manilow | verify (applied) | 17637167 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-17-7-pm/concert/17637167 | - |
| tm-victoria-monet-2026-san-francisco-g5vyz_320sgvq | victoria-monet | verify (applied) | 18579810 | https://seatgeek.com/victoria-monet-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-17-8-pm/concert/18579810 | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | trans-siberian-orchestra | verify (applied) | 18573472 | https://seatgeek.com/trans-siberian-orchestra-tickets/hershey-pennsylvania-giant-center-2026-12-18-3-pm/concert/18573472 | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | trivium | verify (applied) | 18391991 | https://seatgeek.com/trivium-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-18-6-35-pm/concert/18391991 | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | blue-october | verify (applied) | 18141897 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-18-8-pm/concert/18141897 | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | cece-winans | verify (applied) | 18361612 | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | gracie-abrams | verify (applied) | 18270524 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-18-8-pm/concert/18270524 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | barry-manilow | verify (applied) | 17637169 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-18-8-pm/concert/17637169 | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | trans-siberian-orchestra | verify (applied) | 18573474 | https://seatgeek.com/trans-siberian-orchestra-tickets/orlando-florida-kia-center-2026-12-19-2-30-pm/concert/18573474 | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | trans-siberian-orchestra | verify (applied) | 18573477 | https://seatgeek.com/trans-siberian-orchestra-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-19-2-30-pm/concert/18573477 | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | trivium | verify (applied) | 18391993 | https://seatgeek.com/trivium-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-19-6-35-pm/concert/18391993 | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | jonas-brothers | verify (applied) | 18503931 | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 | - |
| tm-lady-a-2026-greensboro-g5evz_g5lge4i | lady-a | verify (applied) | 18295539 | https://seatgeek.com/lady-a-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2026-12-19-7-30-pm/concert/18295539 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | yacht-rock-revue | verify (applied) | 18551886 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-19-8-pm/concert/18551886 | - |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | simple-plan | verify (applied) | 18207565 | https://seatgeek.com/simple-plan-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2026-12-19-8-pm/concert/18207565 | - |
| tm-alex-warren-2026-las-vegas-1ayzkftgkdvnpgb | alex-warren | verify (applied) | 18590187 | https://seatgeek.com/alex-warren-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-30-8-pm/concert/18590187 | - |
| tm-dom-dolla-2027-miami-z7r9jz1aaavbz | dom-dolla | verify (applied) | 18750432 | https://seatgeek.com/dom-dolla-tickets/miami-florida-factory-town-2026-12-31-10-pm/concert/18750432 | - |
| tm-alex-warren-2027-las-vegas-1ayzkftgkdvipgh | alex-warren | verify (applied) | 18590188 | https://seatgeek.com/alex-warren-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-31-8-pm/concert/18590188 | - |
| tm-lord-huron-2027-sacramento-g5vyz_2wpd5xx | lord-huron | verify (applied) | 18421983 | https://seatgeek.com/lord-huron-tickets/sacramento-channel-24-sacramento-2027-01-01-8-pm/concert/18421983 | - |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | verify (applied) | 18749653 | https://seatgeek.com/tommy-emmanuel-tickets/grand-rapids-michigan-st-cecilia-music-center-2027-01-29-7-30-pm/concert/18749653 | - |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | hans-zimmer | verify (applied) | 18601946 | https://seatgeek.com/hans-zimmer-tickets/anaheim-california-honda-center-2027-04-02-7-30-pm/concert/18601946 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | harry-styles | verify (applied) | 18570444 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-02-7-45-pm/concert/18570444 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrocmpa | barry-manilow | verify (applied) | 18590288 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-02-8-pm/concert/18590288 | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | luke-combs | verify (applied) | 18379496 | https://seatgeek.com/luke-combs-tickets/arlington-texas-at-t-stadium-2027-04-03-5-20-pm/concert/18379496 | - |
| tm-morat-2027-fairfax-17a8v0g61boau0r | morat | verify (applied) | 18251698 | https://seatgeek.com/morat-tickets/fairfax-virginia-eaglebank-arena-2027-04-03-8-pm/concert/18251698 | - |
| tm-death-cab-for-cutie-2027-niagara-falls-1avzz_3gkxslrqs | death-cab-for-cutie | verify (applied) | 18604098 | https://seatgeek.com/death-cab-for-cutie-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-03-8-pm/concert/18604098 | - |
| tm-lukas-graham-2027-philadelphia-vv1aovpuf-zf9v5 | lukas-graham | verify (applied) | 18617589 | https://seatgeek.com/lukas-graham-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-04-03-8-pm/concert/18617589 | - |
| tm-dylan-gossett-2027-memphis-g5viz_f659_2b | dylan-gossett | verify (applied) | 18642090 | https://seatgeek.com/dylan-gossett-tickets/memphis-tennessee-satellite-music-hall-2027-04-03-7-pm/concert/18642090 | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | staind | verify (applied) | 18655681 | https://seatgeek.com/staind-tickets/billings-montana-first-interstate-arena-2027-04-03-6-pm/concert/18655681 | - |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | nickelback | verify (applied) | 18664631 | https://seatgeek.com/nickelback-tickets/edmonton-canada-rogers-place-2027-04-03-6-30-pm/concert/18664631 | - |
| tm-riley-green-2027-eugene-vvg1hz_3divdk0 | riley-green | verify (applied) | 18626512 | https://seatgeek.com/riley-green-tickets/eugene-oregon-matthew-knight-arena-2027-04-03-7-pm/concert/18626512 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrorept | barry-manilow | verify (applied) | 18590286 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-03-7-pm/concert/18590286 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | harry-styles | verify (applied) | 18577793 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-03-7-45-pm/concert/18577793 | - |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | nothing-but-thieves | verify (applied) | 18266340 | https://seatgeek.com/nothing-but-thieves-tickets/oakland-california-fox-theater-oakland-2027-04-03-8-pm/concert/18266340 | - |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | the-interrupters | verify (applied) | 18613085 | https://seatgeek.com/the-interrupters-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-04-6-pm/concert/18613085 | - |
| tm-death-cab-for-cutie-2027-ottawa-1ad7z_3gkhxejxw | death-cab-for-cutie | verify (applied) | 18604166 | https://seatgeek.com/death-cab-for-cutie-tickets/ottawa-canada-history-ottawa-2027-04-04-7-pm/concert/18604166 | - |
| tm-mercyme-2027-reading-vv17fz_fgks27zye | mercyme | verify (applied) | 18692254 | https://seatgeek.com/mercyme-tickets/reading-pennsylvania-santander-arena-2027-04-04-7-pm/concert/18692254 | - |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | niall-horan | verify (applied) | 18235519 | https://seatgeek.com/niall-horan-tickets/brooklyn-new-york-barclays-center-2027-04-04-7-30-pm/concert/18235519 | - |
| tm-dylan-gossett-2027-birmingham-1aezz_kgkbdr7ks | dylan-gossett | verify (applied) | 18642092 | https://seatgeek.com/dylan-gossett-tickets/birmingham-alabama-avondale-brewing-company-2027-04-04-7-pm/concert/18642092 | - |
| tm-the-psychedelic-furs-2027-new-orleans-g5viz_ad68eh6 | the-psychedelic-furs | verify (applied) | 18592667 | https://seatgeek.com/the-psychedelic-furs-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-04-04-7-pm/concert/18592667 | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | jay-wheeler | verify (applied) | 18649609 | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | hans-zimmer | verify (applied) | 18601947 | https://seatgeek.com/hans-zimmer-tickets/san-francisco-california-chase-center-2027-04-04-7-30-pm/concert/18601947 | - |
| tm-feid-2027-seattle-vvg1hz_pkvb_3- | feid | verify (applied) | 18746746 | https://seatgeek.com/feid-tickets/seattle-washington-climate-pledge-arena-2027-04-04-8-pm/concert/18746746 | - |
| tm-death-cab-for-cutie-2027-montreal-1ad7z_3gkrplg-n | death-cab-for-cutie | verify (applied) | 18603817 | https://seatgeek.com/death-cab-for-cutie-tickets/montreal-canada-mtelus-2027-04-05-8-pm/concert/18603817 | - |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | haiden-henderson | verify (applied) | 18613096 | https://seatgeek.com/haiden-henderson-tickets/santa-ana-california-constellation-room-at-the-observatory-2027-04-05-7-pm/concert/18613096 | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | hans-zimmer | verify (applied) | 18601953 | https://seatgeek.com/hans-zimmer-tickets/sacramento-california-golden-1-center-2027-04-05-7-30-pm/concert/18601953 | - |
| tm-lukas-graham-2027-toronto-1f7zvpgxaoz786kf | lukas-graham | verify (applied) | 18618029 | https://seatgeek.com/lukas-graham-tickets/toronto-canada-the-danforth-music-hall-2027-04-06-7-pm/concert/18618029 | - |
| tm-staind-2027-sioux-falls-vv1akzk4vgkd8j7ov | staind | verify (applied) | 18654517 | https://seatgeek.com/staind-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-06-6-pm/concert/18654517 | - |
| tm-saint-levant-2027-detroit-vvg1oz_cxteu1p | saint-levant | verify (applied) | 18386182 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-06-7-pm/concert/18386182 | - |
| tm-dylan-gossett-2027-philadelphia-vv17fz_kgkmvqdsy | dylan-gossett | verify (applied) | 18642093 | https://seatgeek.com/dylan-gossett-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-06-7-pm/concert/18642093 | - |
| tm-vnv-nation-2027-montreal-1ad7zbvgklrkbrt | vnv-nation | verify (applied) | 18543174 | https://seatgeek.com/vnv-nation-tickets/montreal-canada-beanfield-theatre-2027-04-06-8-pm/concert/18543174 | - |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | nickelback | verify (applied) | 18664633 | https://seatgeek.com/nickelback-tickets/calgary-canada-scotiabank-saddledome-2027-04-06-6-30-pm/concert/18664633 | - |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | jay-wheeler | verify (applied) | 18649614 | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 | - |
| tm-feid-2027-portland-vvg1hz_pckgfmh | feid | verify (applied) | 18746749 | https://seatgeek.com/feid-tickets/portland-oregon-moda-center-2027-04-06-8-pm/concert/18746749 | - |
| tm-the-interrupters-2027-boston-vv1avzkftgkexzmrt | the-interrupters | verify (applied) | 18612664 | https://seatgeek.com/the-interrupters-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-07-6-pm/concert/18612664 | - |
| tm-saint-levant-2027-detroit-vv1koz_opyg7lxkw | saint-levant | verify (applied) | 18550843 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-07-7-pm/concert/18550843 | - |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | lukas-graham | verify (applied) | 18617565 | https://seatgeek.com/lukas-graham-tickets/detroit-michigan-saint-andrews-hall-2027-04-07-7-pm/concert/18617565 | - |
| tm-staind-2027-fargo-vv17bz_kgkuwy5mz | staind | verify (applied) | 18654522 | https://seatgeek.com/staind-tickets/fargo-north-dakota-fargodome-2027-04-07-6-pm/concert/18654522 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgkjcy | death-cab-for-cutie | verify (applied) | 18604107 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-07-8-pm/concert/18604107 | - |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | foy-vance | verify (applied) | 18084515 | https://seatgeek.com/foy-vance-tickets/birmingham-alabama-iron-city-2027-04-07-7-pm/concert/18084515 | - |
| tm-dylan-gossett-2027-baltimore-1avfz_kgkbht6mj | dylan-gossett | verify (applied) | 18642094 | https://seatgeek.com/dylan-gossett-tickets/baltimore-maryland-the-paramount-baltimore-2027-04-07-7-pm/concert/18642094 | - |
| tm-lola-young-2027-atlanta-vvg1zz_f7qhai6 | lola-young | verify (applied) | 18649708 | https://seatgeek.com/lola-young-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-07-8-pm/concert/18649708 | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | jay-wheeler | verify (applied) | 18649616 | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 | - |
| tm-nothing-but-thieves-2027-phoenix-17k8v0g659aif3n | nothing-but-thieves | verify (applied) | 18266349 | https://seatgeek.com/nothing-but-thieves-tickets/phoenix-arizona-the-van-buren-2027-04-07-8-pm/concert/18266349 | - |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | leon-bridges | verify (applied) | 18662693 | https://seatgeek.com/leon-bridges-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2027-04-07-8-pm/concert/18662693 | - |
| tm-mercyme-2027-portland-vv177z_fgkxgyxqn | mercyme | verify (applied) | 18692256 | https://seatgeek.com/mercyme-tickets/portland-maine-cross-insurance-arena-2027-04-08-7-pm/concert/18692256 | - |
| tm-niall-horan-2027-baltimore-17a8v0g61lfcmsv | niall-horan | verify (applied) | 18235529 | https://seatgeek.com/niall-horan-tickets/baltimore-maryland-cfg-bank-arena-2027-04-08-7-30-pm/concert/18235529 | - |
| tm-lukas-graham-2027-indianapolis-vv1kv8vpuvgauq0sn | lukas-graham | verify (applied) | 18618400 | https://seatgeek.com/lukas-graham-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-08-7-30-pm/concert/18618400 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgfg2c | death-cab-for-cutie | verify (applied) | 18604106 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-08-8-pm/concert/18604106 | - |
| tm-josiah-queen-2027-tulsa-1aozkf0gkevkv5m | josiah-queen | verify (applied) | 18574499 | https://seatgeek.com/josiah-queen-tickets/tulsa-oklahoma-bok-center-2027-04-08-7-pm/concert/18574499 | - |
| tm-riley-green-2027-edmonton-1av7z_3gkwgn0bp | riley-green | verify (applied) | 18626555 | https://seatgeek.com/riley-green-tickets/edmonton-canada-rogers-place-2027-04-08-7-pm/concert/18626555 | - |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | hans-zimmer | verify (applied) | 18601965 | https://seatgeek.com/hans-zimmer-tickets/vancouver-canada-rogers-arena-2027-04-08-7-30-pm/concert/18601965 | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | john-mayer | verify (applied) | 18626622 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-08-8-pm/concert/18626622 | - |
| tm-feid-2027-sacramento-g5vyz_p5pdckj | feid | verify (applied) | 18746750 | https://seatgeek.com/feid-tickets/sacramento-california-golden-1-center-2027-04-08-8-pm/concert/18746750 | - |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | mei-semones | verify (applied) | 18637352 | https://seatgeek.com/mei-semones-tickets/washington-district-of-columbia-9-30-club-2027-04-09-6-pm/concert/18637352 | - |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | the-interrupters | verify (applied) | 18612730 | https://seatgeek.com/the-interrupters-tickets/montreal-canada-mtelus-2027-04-09-7-pm/concert/18612730 | - |
| tm-staind-2027-omaha-vv1kvovp8tga5iapt | staind | verify (applied) | 18654523 | https://seatgeek.com/staind-tickets/omaha-nebraska-chi-health-center-omaha-2027-04-09-6-pm/concert/18654523 | - |
| tm-death-cab-for-cutie-2027-uncasville-g5vvz_3vqdtrt | death-cab-for-cutie | verify (applied) | 18603584 | https://seatgeek.com/death-cab-for-cutie-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-09-8-pm/concert/18603584 | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | haiden-henderson | verify (applied) | 18613093 | https://seatgeek.com/haiden-henderson-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2027-04-09-7-pm/concert/18613093 | - |
| tm-saint-levant-2027-silver-spring-17a8v0g6cjqrj2z | saint-levant | verify (applied) | 18386183 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-09-8-pm/concert/18386183 | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | verify (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-lola-young-2027-washington-1a4zk4egkeystl8 | lola-young | verify (applied) | 18649706 | https://seatgeek.com/lola-young-tickets/washington-district-of-columbia-the-anthem-dc-2027-04-09-8-pm/concert/18649706 | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | fantasia | verify (applied) | 18629228 | https://seatgeek.com/fantasia-tickets/saint-louis-missouri-enterprise-center-2027-04-09-8-pm/concert/18629228 | - |
| tm-riley-green-2027-calgary-1aozkfygkderjem | riley-green | verify (applied) | 18626557 | https://seatgeek.com/riley-green-tickets/calgary-canada-scotiabank-saddledome-2027-04-09-7-pm/concert/18626557 | - |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | nickelback | verify (applied) | 18664638 | https://seatgeek.com/nickelback-tickets/vancouver-canada-rogers-arena-2027-04-09-6-30-pm/concert/18664638 | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | hans-zimmer | verify (applied) | 18601954 | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | the-interrupters | verify (applied) | 18613159 | https://seatgeek.com/the-interrupters-tickets/toronto-canada-history-2027-04-10-6-pm/concert/18613159 | - |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | josiah-queen | verify (applied) | 18574501 | https://seatgeek.com/josiah-queen-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-04-10-7-pm/concert/18574501 | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | foy-vance | verify (applied) | 18084058 | https://seatgeek.com/foy-vance-tickets/knoxville-tennessee-bijou-theatre-knoxville-2027-04-10-7-pm/concert/18084058 | - |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | staind | verify (applied) | 18654526 | https://seatgeek.com/staind-tickets/kansas-city-missouri-t-mobile-center-2027-04-10-6-pm/concert/18654526 | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | dylan-gossett | verify (applied) | 18642099 | https://seatgeek.com/dylan-gossett-tickets/detroit-michigan-the-fillmore-detroit-2027-04-10-7-pm/concert/18642099 | - |
| tm-mercyme-2027-trenton-k7vgf_fedotss | mercyme | verify (applied) | 18692260 | https://seatgeek.com/mercyme-tickets/trenton-new-jersey-cure-insurance-arena-2027-04-10-7-pm/concert/18692260 | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | saint-levant | verify (applied) | 18550858 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-10-8-pm/concert/18550858 | - |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | the-psychedelic-furs | verify (applied) | 18592673 | https://seatgeek.com/the-psychedelic-furs-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-10-8-pm/concert/18592673 | - |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | lukas-graham | verify (applied) | 18618814 | https://seatgeek.com/lukas-graham-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-04-10-7-pm/concert/18618814 | - |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | lola-young | verify (applied) | 18649707 | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | fantasia | verify (applied) | 18629435 | https://seatgeek.com/fantasia-tickets/southaven-mississippi-landers-center-2027-04-10-8-pm/concert/18629435 | - |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | riley-green | verify (applied) | 18626559 | https://seatgeek.com/riley-green-tickets/saskatoon-canada-sasktel-centre-2027-04-10-7-pm/concert/18626559 | - |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | jay-wheeler | verify (applied) | 18649617 | https://seatgeek.com/jay-wheeler-tickets/inglewood-california-youtube-theater-2027-04-10-8-pm/concert/18649617 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | john-mayer | verify (applied) | 18626621 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 | - |
| tm-feid-2027-san-francisco-g5vyz_p1g3qkq | feid | verify (applied) | 18746753 | https://seatgeek.com/feid-tickets/san-francisco-california-chase-center-2027-04-10-8-pm/concert/18746753 | - |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | the-interrupters | verify (applied) | 18612707 | https://seatgeek.com/the-interrupters-tickets/london-canada-london-music-hall-2027-04-11-6-pm/concert/18612707 | - |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | josiah-queen | verify (applied) | 18574503 | https://seatgeek.com/josiah-queen-tickets/grand-rapids-michigan-van-andel-arena-2027-04-11-7-pm/concert/18574503 | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | lukas-graham | verify (applied) | 18617871 | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 | - |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | staind | verify (applied) | 18654527 | https://seatgeek.com/staind-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-11-6-pm/concert/18654527 | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | dylan-gossett | verify (applied) | 18642102 | https://seatgeek.com/dylan-gossett-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-11-7-pm/concert/18642102 | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | nothing-but-thieves | verify (applied) | 18266353 | https://seatgeek.com/nothing-but-thieves-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-11-7-30-pm/concert/18266353 | - |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | death-cab-for-cutie | verify (applied) | 18603742 | https://seatgeek.com/death-cab-for-cutie-tickets/portland-maine-state-theatre-portland-me-2027-04-11-8-pm/concert/18603742 | - |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | the-psychedelic-furs | verify (applied) | 18592674 | https://seatgeek.com/the-psychedelic-furs-tickets/orlando-florida-hard-rock-live-orlando-2027-04-11-8-pm/concert/18592674 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | hans-zimmer | verify (applied) | 18601957 | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | john-mayer | verify (applied) | 18626620 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 | - |
| tm-feid-2027-san-jose-g5vyz_p5keuz1 | feid | verify (applied) | 18746754 | https://seatgeek.com/feid-tickets/san-jose-california-sap-center-at-san-jose-2027-04-11-8-pm/concert/18746754 | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | niall-horan | verify (applied) | 18235530 | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 | - |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | lola-young | verify (applied) | 18649709 | https://seatgeek.com/lola-young-tickets/new-york-new-york-radio-city-music-hall-2027-04-12-8-pm/concert/18649709 | - |
| tm-calvin-harris-2027-toronto-1a8zk4fgkevlxcb | calvin-harris | verify (applied) | 18674913 | https://seatgeek.com/calvin-harris-tickets/toronto-canada-scotiabank-arena-2027-04-12-8-pm/concert/18674913 | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | nothing-but-thieves | verify (applied) | 18266356 | https://seatgeek.com/nothing-but-thieves-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-12-7-30-pm/concert/18266356 | - |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | the-interrupters | verify (applied) | 18612605 | https://seatgeek.com/the-interrupters-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-13-6-pm/concert/18612605 | - |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | staind | verify (applied) | 18654528 | https://seatgeek.com/staind-tickets/grand-rapids-michigan-van-andel-arena-2027-04-13-6-pm/concert/18654528 | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | nothing-but-thieves | verify (applied) | 18266354 | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 | - |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | josiah-queen | verify (applied) | 18574502 | https://seatgeek.com/josiah-queen-tickets/toronto-canada-coca-cola-coliseum-2027-04-13-7-pm/concert/18574502 | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | death-cab-for-cutie | verify (applied) | 18603805 | https://seatgeek.com/death-cab-for-cutie-tickets/new-york-new-york-radio-city-music-hall-2027-04-13-8-pm/concert/18603805 | - |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | saint-levant | verify (applied) | 18386194 | https://seatgeek.com/saint-levant-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-13-8-pm/concert/18386194 | - |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | a-perfect-circle | verify (applied) | 18632504 | https://seatgeek.com/a-perfect-circle-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-13-7-pm/concert/18632504 | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | the-interrupters | verify (applied) | 18613142 | https://seatgeek.com/the-interrupters-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-14-6-pm/concert/18613142 | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | haiden-henderson | verify (applied) | 18612968 | https://seatgeek.com/haiden-henderson-tickets/atlanta-georgia-the-masquerade-hell-2027-04-14-7-pm/concert/18612968 | - |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | staind | verify (applied) | 18654530 | https://seatgeek.com/staind-tickets/evansville-indiana-ford-center-in-2027-04-14-6-pm/concert/18654530 | - |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | death-cab-for-cutie | verify (applied) | 18715564 | https://seatgeek.com/death-cab-for-cutie-tickets/charlottesville-virginia-ting-pavilion-2027-04-14-7-30-pm/concert/18715564 | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | warren-zeiders | verify (applied) | 18649754 | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | nothing-but-thieves | verify (applied) | 18266355 | https://seatgeek.com/nothing-but-thieves-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-15-8-pm/concert/18266355 | - |

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
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-chicago-vvg1jz_2brfg7b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-indianapolis-vvg1fz_2rfzpki | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
