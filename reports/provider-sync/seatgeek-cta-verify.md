# SeatGeek CTA verification log

Generated: 2026-10-19T22:43:04.395Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1494 (needs_recheck: 752, provenance backfill: 138, stale re-check: 1046)
- Events skipped before API checks: 221
- API calls made: 800
- Verified provenance written: 751
- URLs added: 0
- URLs corrected: 0
- URLs cleared: 0
- Provenance un-verified: 1
- Conflicts (ambiguous, untouched): 1
- No qualifying listing: 46
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | a-perfect-circle | verify (applied) | 18632548 | https://seatgeek.com/a-perfect-circle-tickets/portland-oregon-veterans-memorial-coliseum-2-2027-06-01-7-30-pm/concert/18632548 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | fkj | verify (applied) | 18281671 | https://seatgeek.com/fkj-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-06-03-8-pm/concert/18281671 | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | def-leppard | verify (applied) | 18662428 | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | verify (applied) | 17738471 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-30-8-pm/concert/17738471 | - |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | verify (applied) | 18326820 | https://seatgeek.com/dylan-gossett-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-10-30-8-pm/concert/18326820 | - |
| tm-sienna-spiro-2026-englewood-z7r9jz1a7p-ji | sienna-spiro | verify (applied) | 18297295 | https://seatgeek.com/sienna-spiro-tickets/englewood-colorado-gothic-theatre-2026-10-30-8-pm/concert/18297295 | - |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | verify (applied) | 18250878 | https://seatgeek.com/don-omar-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-10-30-8-pm/concert/18250878 | - |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | verify (applied) | 18253661 | https://seatgeek.com/stella-lefty-tickets/san-francisco-california-bimbos-365-club-2026-10-30-8-pm/concert/18253661 | - |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | verify (applied) | 18141400 | https://seatgeek.com/blue-october-tickets/toronto-canada-the-danforth-music-hall-2026-10-31-7-pm/concert/18141400 | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | verify (applied) | 18027147 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-31-8-pm/concert/18027147 | - |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | verify (applied) | 17769328 | https://seatgeek.com/doja-cat-tickets/las-vegas-nevada-t-mobile-arena-2026-10-31-7-30-pm/concert/17769328 | - |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | latto | verify (applied) | 18618942 | https://seatgeek.com/latto-tickets/las-vegas-nevada-on-the-record-2026-10-31-10-pm/concert/18618942 | - |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | verify (applied) | 18222450 | https://seatgeek.com/amble-tickets/detroit-michigan-saint-andrews-hall-2026-11-01-7-pm/concert/18222450 | - |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | verify (applied) | 18253662 | https://seatgeek.com/stella-lefty-tickets/west-hollywood-california-troubadour-2026-11-01-7-pm/concert/18253662 | - |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | verify (applied) | 18223885 | https://seatgeek.com/amble-tickets/toronto-canada-history-2026-11-02-7-pm/concert/18223885 | - |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | verify (applied) | 18291327 | https://seatgeek.com/stella-lefty-tickets/los-angeles-california-the-fonda-theatre-2026-11-02-8-pm/concert/18291327 | - |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | verify (applied) | 18297301 | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-the-showbox-2026-11-02-8-pm/concert/18297301 | - |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | verify (applied) | 18222746 | https://seatgeek.com/amble-tickets/ottawa-canada-bronson-centre-2026-11-03-7-pm/concert/18222746 | - |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | verify (applied) | 18140945 | https://seatgeek.com/blue-october-tickets/portland-maine-state-theatre-portland-me-2026-11-03-8-pm/concert/18140945 | - |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | verify (applied) | 18143695 | https://seatgeek.com/teddy-swims-tickets/salt-lake-city-utah-delta-center-1-2026-11-03-7-pm/concert/18143695 | - |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | verify (applied) | 18253664 | https://seatgeek.com/stella-lefty-tickets/phoenix-arizona-crescent-ballroom-2026-11-03-8-pm/concert/18253664 | - |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | verify (applied) | 18492778 | https://seatgeek.com/missio-tickets/san-francisco-california-brick-and-mortar-music-hall-2026-11-03-8-30-pm/concert/18492778 | - |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | verify (applied) | 18373497 | https://seatgeek.com/michelle-branch-tickets/boston-massachusetts-roadrunner-boston-2026-11-04-8-pm/concert/18373497 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | verify (applied) | 18297302 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-04-8-pm/concert/18297302 | - |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | verify (applied) | 18257241 | https://seatgeek.com/john-summit-tickets/houston-texas-toyota-center-2026-11-05-7-pm/concert/18257241 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | verify (applied) | 18297303 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-05-8-pm/concert/18297303 | - |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | verify (applied) | 18391931 | https://seatgeek.com/trivium-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-06-6-30-pm/concert/18391931 | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | verify (applied) | 18373504 | https://seatgeek.com/michelle-branch-tickets/asbury-park-new-jersey-the-stone-pony-2-2026-11-06-7-pm/concert/18373504 | - |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | verify (applied) | 18222463 | https://seatgeek.com/amble-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-06-7-pm/concert/18222463 | - |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | verify (applied) | 18147866 | https://seatgeek.com/blue-october-tickets/albany-new-york-hart-theatre-at-the-egg-2026-11-06-7-pm/concert/18147866 | - |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | verify (applied) | 18345772 | https://seatgeek.com/dinosaur-jr-tickets/san-antonio-texas-paper-tiger-san-antonio-2026-11-06-8-pm/concert/18345772 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | verify (applied) | 18085658 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-06-8-pm/concert/18085658 | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | verify (applied) | 18391935 | https://seatgeek.com/trivium-tickets/louisville-kentucky-old-forester-s-paristown-hall-2026-11-07-6-35-pm/concert/18391935 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | verify (applied) | 18223366 | https://seatgeek.com/amble-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-07-7-pm/concert/18223366 | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | verify (applied) | 18147873 | https://seatgeek.com/blue-october-tickets/cleveland-ohio-agora-theatre-2026-11-07-7-pm/concert/18147873 | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | verify (applied) | 17769336 | https://seatgeek.com/doja-cat-tickets/houston-texas-toyota-center-2026-11-07-7-30-pm/concert/17769336 | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | verify (applied) | 18318283 | https://seatgeek.com/sienna-spiro-tickets/portland-oregon-mcmenamins-crystal-ballroom-2026-11-07-8-pm/concert/18318283 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | verify (applied) | 18085660 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-07-8-pm/concert/18085660 | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | verify (applied) | 18391933 | https://seatgeek.com/trivium-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-11-08-5-30-pm/concert/18391933 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | verify (applied) | 18141852 | https://seatgeek.com/blue-october-tickets/nashville-indiana-brown-county-music-center-2026-11-08-7-30-pm/concert/18141852 | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | verify (applied) | 18506093 | https://seatgeek.com/pentatonix-tickets/bozeman-montana-brick-breeden-fieldhouse-2026-11-09-7-pm/concert/18506093 | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | verify (applied) | 18297308 | https://seatgeek.com/sienna-spiro-tickets/san-francisco-california-castro-theatre-2026-11-09-8-pm/concert/18297308 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | verify (applied) | 18085136 | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | verify (applied) | 18222479 | https://seatgeek.com/amble-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2026-11-10-8-pm/concert/18222479 | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | verify (applied) | 18085699 | https://seatgeek.com/foy-vance-tickets/portland-oregon-aladdin-theater-2026-11-10-7-pm/concert/18085699 | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | verify (applied) | 18391936 | https://seatgeek.com/trivium-tickets/new-haven-connecticut-college-street-music-hall-2026-11-11-6-35-pm/concert/18391936 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | verify (applied) | 18222468 | https://seatgeek.com/amble-tickets/washington-district-of-columbia-9-30-club-2026-11-11-7-pm/concert/18222468 | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | verify (applied) | 18085138 | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | verify (applied) | 18147874 | https://seatgeek.com/blue-october-tickets/north-tonawanda-new-york-riviera-theatre-north-tonawanda-2026-11-11-7-pm/concert/18147874 | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | verify (applied) | 18373510 | https://seatgeek.com/michelle-branch-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-11-11-7-30-pm/concert/18373510 | - |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | verify (applied) | 18394805 | https://seatgeek.com/the-psychedelic-furs-tickets/riverside-california-fox-performing-arts-center-2026-11-11-7-pm/concert/18394805 | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | verify (applied) | 18391943 | https://seatgeek.com/trivium-tickets/new-york-new-york-terminal-5-2026-11-12-6-35-pm/concert/18391943 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | verify (applied) | 18085137 | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 | - |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | verify (applied) | 18141374 | https://seatgeek.com/blue-october-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-11-12-8-pm/concert/18141374 | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | verify (applied) | 18373511 | https://seatgeek.com/michelle-branch-tickets/milwaukee-wisconsin-pabst-theater-2026-11-12-8-pm/concert/18373511 | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | verify (applied) | 18404272 | https://seatgeek.com/tyla-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-12-8-pm/concert/18404272 | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | verify (applied) | 18157641 | https://seatgeek.com/sombr-tickets/cleveland-ohio-rocket-arena-2026-11-13-7-30-pm/concert/18157641 | - |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | verify (applied) | 18253089 | https://seatgeek.com/beartooth-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-13-6-pm/concert/18253089 | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | verify (applied) | 18322791 | https://seatgeek.com/amble-tickets/atlanta-georgia-terminal-west-2026-11-13-8-pm/concert/18322791 | - |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | verify (applied) | 18185177 | https://seatgeek.com/teddy-swims-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-13-7-pm/concert/18185177 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | verify (applied) | 18391945 | https://seatgeek.com/trivium-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-14-6-35-pm/concert/18391945 | - |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | verify (applied) | 18126039 | https://seatgeek.com/the-neighbourhood-tickets/nashville-tennessee-the-truth-nashville-2026-11-14-7-30-pm/concert/18126039 | - |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | verify (applied) | 18312209 | https://seatgeek.com/amble-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-11-14-8-pm/concert/18312209 | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | verify (applied) | 18185180 | https://seatgeek.com/teddy-swims-tickets/las-vegas-nevada-t-mobile-arena-2026-11-14-7-pm/concert/18185180 | - |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | verify (applied) | 18084166 | https://seatgeek.com/foy-vance-tickets/spokane-washington-knitting-factory-spokane-2026-11-14-7-pm/concert/18084166 | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | verify (applied) | 18391947 | https://seatgeek.com/trivium-tickets/worcester-massachusetts-the-palladium-2026-11-15-6-35-pm/concert/18391947 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | verify (applied) | 18211699 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-15-7-pm/concert/18211699 | - |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | verify (applied) | 18269141 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-webster-hall-2026-11-15-8-pm/concert/18269141 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | verify (applied) | 18211700 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-16-7-pm/concert/18211700 | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | verify (applied) | 18175613 | https://seatgeek.com/sombr-tickets/toronto-canada-scotiabank-arena-2026-11-16-7-pm/concert/18175613 | - |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | verify (applied) | 18222773 | https://seatgeek.com/amble-tickets/new-orleans-louisiana-house-of-blues-new-orleans-2026-11-16-7-pm/concert/18222773 | - |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | verify (applied) | 18085139 | https://seatgeek.com/the-neighbourhood-tickets/kansas-city-missouri-t-mobile-center-2026-11-16-7-30-pm/concert/18085139 | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | verify (applied) | 18253466 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-royale-boston-2026-11-17-8-pm/concert/18253466 | - |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | verify (applied) | 18222798 | https://seatgeek.com/amble-tickets/austin-texas-emo-s-austin-2026-11-17-7-pm/concert/18222798 | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | verify (applied) | 18253081 | https://seatgeek.com/beartooth-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-18-6-pm/concert/18253081 | - |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | verify (applied) | 18223872 | https://seatgeek.com/amble-tickets/dallas-texas-the-echo-lounge-music-hall-2026-11-18-7-pm/concert/18223872 | - |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | verify (applied) | 18140881 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2026-11-18-7-30-pm/concert/18140881 | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | verify (applied) | 18573353 | https://seatgeek.com/trans-siberian-orchestra-tickets/green-bay-wisconsin-resch-center-2026-11-19-2-30-pm/concert/18573353 | - |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | verify (applied) | 18252806 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-atlantis-2026-11-19-6-30-pm/concert/18252806 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | verify (applied) | 18208621 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-19-7-pm/concert/18208621 | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | verify (applied) | 18385717 | https://seatgeek.com/pentatonix-tickets/cleveland-ohio-rocket-arena-2026-11-19-7-pm/concert/18385717 | - |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | the-neighbourhood | verify (applied) | 18085141 | https://seatgeek.com/the-neighbourhood-tickets/detroit-michigan-little-caesars-arena-2026-11-19-7-30-pm/concert/18085141 | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | verify (applied) | 18147875 | https://seatgeek.com/blue-october-tickets/jacksonville-florida-five-jacksonville-2026-11-19-7-pm/concert/18147875 | - |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | trans-siberian-orchestra | verify (applied) | 18573355 | https://seatgeek.com/trans-siberian-orchestra-tickets/council-bluffs-iowa-mid-america-center-2026-11-19-7-pm/concert/18573355 | - |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | verify (applied) | 18391950 | https://seatgeek.com/trivium-tickets/royal-oak-michigan-royal-oak-music-theatre-2026-11-20-6-35-pm/concert/18391950 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | verify (applied) | 18208620 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | verify (applied) | 18147876 | https://seatgeek.com/blue-october-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-20-7-pm/concert/18147876 | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | verify (applied) | 18404274 | https://seatgeek.com/tyla-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-20-6-30-pm/concert/18404274 | - |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | trans-siberian-orchestra | verify (applied) | 18573352 | https://seatgeek.com/trans-siberian-orchestra-tickets/cincinnati-ohio-heritage-bank-center-2026-11-21-3-pm/concert/18573352 | - |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | trans-siberian-orchestra | verify (applied) | 18573356 | https://seatgeek.com/trans-siberian-orchestra-tickets/denver-colorado-ball-arena-2026-11-21-3-pm/concert/18573356 | - |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | verify (applied) | 18337370 | https://seatgeek.com/dylan-gossett-tickets/apopka-florida-apopka-amphitheater-2026-11-21-6-pm/concert/18337370 | - |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | the-neighbourhood | verify (applied) | 18085142 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-21-7-pm/concert/18085142 | - |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | verify (applied) | 18085728 | https://seatgeek.com/foy-vance-tickets/englewood-colorado-gothic-theatre-2026-11-21-7-pm/concert/18085728 | - |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | trans-siberian-orchestra | verify (applied) | 18573367 | https://seatgeek.com/trans-siberian-orchestra-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-22-2-30-pm/concert/18573367 | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | verify (applied) | 18427238 | https://seatgeek.com/pentatonix-tickets/hamilton-canada-td-coliseum-2026-11-22-6-pm/concert/18427238 | - |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | the-neighbourhood | verify (applied) | 18194371 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-22-6-pm/concert/18194371 | - |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | beartooth | verify (applied) | 18253048 | https://seatgeek.com/beartooth-tickets/omaha-nebraska-steelhouse-omaha-2026-11-22-6-30-pm/concert/18253048 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | verify (applied) | 18211703 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-23-7-pm/concert/18211703 | - |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | trans-siberian-orchestra | verify (applied) | 18499779 | https://seatgeek.com/trans-siberian-orchestra-tickets/salt-lake-city-utah-delta-center-1-2026-11-24-3-pm/concert/18499779 | - |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | trans-siberian-orchestra | verify (applied) | 18573369 | https://seatgeek.com/trans-siberian-orchestra-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-24-7-30-pm/concert/18573369 | - |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | trivium | verify (applied) | 18391959 | https://seatgeek.com/trivium-tickets/nashville-tennessee-the-pinnacle-nashville-2026-11-24-6-35-pm/concert/18391959 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | verify (applied) | 18211705 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-24-7-pm/concert/18211705 | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | verify (applied) | 17769355 | https://seatgeek.com/doja-cat-tickets/toronto-canada-scotiabank-arena-2026-11-25-7-30-pm/concert/17769355 | - |
| tm-blue-october-2026-nashville-g5viz_kskltsv | blue-october | verify (applied) | 18126041 | https://seatgeek.com/blue-october-tickets/nashville-tennessee-the-truth-nashville-2026-11-25-8-pm/concert/18126041 | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | tyla | verify (applied) | 18404308 | https://seatgeek.com/tyla-tickets/toronto-canada-coca-cola-coliseum-2026-11-26-8-pm/concert/18404308 | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | trans-siberian-orchestra | verify (applied) | 18573376 | https://seatgeek.com/trans-siberian-orchestra-tickets/manchester-new-hampshire-snhu-arena-2026-11-27-2-30-pm/concert/18573376 | - |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | trans-siberian-orchestra | verify (applied) | 18573377 | https://seatgeek.com/trans-siberian-orchestra-tickets/boise-idaho-extramile-arena-2026-11-27-2-pm/concert/18573377 | - |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | doja-cat | verify (applied) | 17769357 | https://seatgeek.com/doja-cat-tickets/montreal-canada-centre-bell-2026-11-27-7-30-pm/concert/17769357 | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | trivium | verify (applied) | 18391961 | https://seatgeek.com/trivium-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-27-6-35-pm/concert/18391961 | - |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | trans-siberian-orchestra | verify (applied) | 18573384 | https://seatgeek.com/trans-siberian-orchestra-tickets/worcester-massachusetts-dcu-center-2026-11-28-3-pm/concert/18573384 | - |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | trans-siberian-orchestra | verify (applied) | 18573385 | https://seatgeek.com/trans-siberian-orchestra-tickets/portland-oregon-moda-center-2026-11-28-3-30-pm/concert/18573385 | - |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | trans-siberian-orchestra | verify (applied) | 18573390 | https://seatgeek.com/trans-siberian-orchestra-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-29-3-pm/concert/18573390 | - |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | trans-siberian-orchestra | verify (applied) | 18573391 | https://seatgeek.com/trans-siberian-orchestra-tickets/seattle-washington-climate-pledge-arena-2026-11-29-3-pm/concert/18573391 | - |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | the-neighbourhood | verify (applied) | 18085146 | https://seatgeek.com/the-neighbourhood-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-30-7-30-pm/concert/18085146 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | olivia-rodrigo | verify (applied) | 18211742 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-01-7-pm/concert/18211742 | - |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | trans-siberian-orchestra | verify (applied) | 18573399 | https://seatgeek.com/trans-siberian-orchestra-tickets/sacramento-california-golden-1-center-2026-12-02-3-pm/concert/18573399 | - |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | trans-siberian-orchestra | verify (applied) | 18573401 | https://seatgeek.com/trans-siberian-orchestra-tickets/nashville-tennessee-bridgestone-arena-2026-12-02-7-30-pm/concert/18573401 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | olivia-rodrigo | verify (applied) | 18211743 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-02-7-pm/concert/18211743 | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | the-neighbourhood | verify (applied) | 18085147 | https://seatgeek.com/the-neighbourhood-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-02-7-30-pm/concert/18085147 | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | trans-siberian-orchestra | verify (applied) | 18573402 | https://seatgeek.com/trans-siberian-orchestra-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2026-12-03-7-30-pm/concert/18573402 | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | blue-october | verify (applied) | 18147878 | https://seatgeek.com/blue-october-tickets/kansas-city-missouri-the-midland-theatre-mo-2026-12-03-7-pm/concert/18147878 | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | trivium | verify (applied) | 18391971 | https://seatgeek.com/trivium-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-12-03-6-30-pm/concert/18391971 | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | trans-siberian-orchestra | verify (applied) | 18573408 | https://seatgeek.com/trans-siberian-orchestra-tickets/fresno-california-save-mart-center-2026-12-03-7-pm/concert/18573408 | - |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | pink-martini | verify (applied) | 18267277 | https://seatgeek.com/pink-martini-tickets/reno-nevada-grand-sierra-resort-2026-12-03-7-30-pm/concert/18267277 | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | trans-siberian-orchestra | verify (applied) | 18573409 | https://seatgeek.com/trans-siberian-orchestra-tickets/toledo-ohio-huntington-center-2026-12-04-3-pm/concert/18573409 | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | beartooth | verify (applied) | 18253061 | https://seatgeek.com/beartooth-tickets/saint-augustine-florida-st-augustine-amphitheatre-2026-12-04-6-pm/concert/18253061 | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | blue-october | verify (applied) | 18141993 | https://seatgeek.com/blue-october-tickets/minneapolis-minnesota-fillmore-minneapolis-2026-12-04-7-pm/concert/18141993 | - |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | trans-siberian-orchestra | verify (applied) | 18573413 | https://seatgeek.com/trans-siberian-orchestra-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-12-04-7-pm/concert/18573413 | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | the-neighbourhood | verify (applied) | 18085152 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-04-7-pm/concert/18085152 | - |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | trans-siberian-orchestra | verify (applied) | 18573412 | https://seatgeek.com/trans-siberian-orchestra-tickets/columbus-ohio-nationwide-arena-2026-12-05-3-pm/concert/18573412 | - |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | trans-siberian-orchestra | verify (applied) | 18573414 | https://seatgeek.com/trans-siberian-orchestra-tickets/ontario-california-toyota-arena-ontario-2026-12-05-3-pm/concert/18573414 | - |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | beartooth | verify (applied) | 18235668 | https://seatgeek.com/beartooth-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-05-6-30-pm/concert/18235668 | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | the-neighbourhood | verify (applied) | 18194373 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-05-6-pm/concert/18194373 | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | trivium | verify (applied) | 18391974 | https://seatgeek.com/trivium-tickets/san-francisco-california-the-masonic-san-francisco-2026-12-05-6-35-pm/concert/18391974 | - |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | trans-siberian-orchestra | verify (applied) | 18573423 | https://seatgeek.com/trans-siberian-orchestra-tickets/grand-rapids-michigan-van-andel-arena-2026-12-06-3-pm/concert/18573423 | - |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | trans-siberian-orchestra | verify (applied) | 18573424 | https://seatgeek.com/trans-siberian-orchestra-tickets/phoenix-arizona-mortgage-matchup-center-2026-12-06-3-pm/concert/18573424 | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | tommy-emmanuel | verify (applied) | 18225197 | https://seatgeek.com/tommy-emmanuel-tickets/durham-north-carolina-carolina-theatre-durham-2026-12-06-8-pm/concert/18225197 | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | trivium | verify (applied) | 18391977 | https://seatgeek.com/trivium-tickets/penticton-canada-penticton-trade-convention-centre-2026-12-07-6-35-pm/concert/18391977 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | trans-siberian-orchestra | verify (applied) | 18573432 | https://seatgeek.com/trans-siberian-orchestra-tickets/allentown-pennsylvania-ppl-center-2026-12-09-7-30-pm/concert/18573432 | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | beartooth | verify (applied) | 18253063 | https://seatgeek.com/beartooth-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-09-6-30-pm/concert/18253063 | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | trans-siberian-orchestra | verify (applied) | 18573433 | https://seatgeek.com/trans-siberian-orchestra-tickets/austin-texas-moody-center-atx-2026-12-09-7-pm/concert/18573433 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | trans-siberian-orchestra | verify (applied) | 18573435 | https://seatgeek.com/trans-siberian-orchestra-tickets/raleigh-north-carolina-lenovo-center-2026-12-10-7-30-pm/concert/18573435 | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | trans-siberian-orchestra | verify (applied) | 18573436 | https://seatgeek.com/trans-siberian-orchestra-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-10-7-pm/concert/18573436 | - |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | blue-october | verify (applied) | 18140959 | https://seatgeek.com/blue-october-tickets/beaumont-texas-jefferson-theatre-2026-12-10-8-pm/concert/18140959 | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | trans-siberian-orchestra | verify (applied) | 18573437 | https://seatgeek.com/trans-siberian-orchestra-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-11-3-pm/concert/18573437 | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | trans-siberian-orchestra | verify (applied) | 18573440 | https://seatgeek.com/trans-siberian-orchestra-tickets/houston-texas-toyota-center-2026-12-11-3-pm/concert/18573440 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | blue-october | verify (applied) | 18147885 | https://seatgeek.com/blue-october-tickets/austin-texas-bass-concert-hall-2026-12-11-7-pm/concert/18147885 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | olivia-rodrigo | verify (applied) | 18211712 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-11-7-pm/concert/18211712 | - |
| tm-trans-siberian-orchestra-2026-charlotte-g5evz_o6l3kkc | trans-siberian-orchestra | verify (applied) | 18573447 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-12-12-3-pm/concert/18573447 | - |
| tm-trans-siberian-orchestra-2026-san-antonio-g5diz_8q4vky5 | trans-siberian-orchestra | verify (applied) | 18573448 | https://seatgeek.com/trans-siberian-orchestra-tickets/san-antonio-texas-frost-bank-center-2026-12-12-3-pm/concert/18573448 | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | sabaton | verify (applied) | 17726761 | https://seatgeek.com/sabaton-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-12-7-pm/concert/17726761 | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | beartooth | verify (applied) | 18253068 | https://seatgeek.com/beartooth-tickets/denver-colorado-fillmore-auditorium-denver-2026-12-12-5-pm/concert/18253068 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | blue-october | verify (applied) | 18142024 | https://seatgeek.com/blue-october-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-12-12-8-pm/concert/18142024 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | olivia-rodrigo | verify (applied) | 18211714 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-12-7-pm/concert/18211714 | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | john-summit | verify (applied) | 18494071 | https://seatgeek.com/john-summit-tickets/los-angeles-california-los-angeles-memorial-coliseum-2026-12-12-7-pm/concert/18494071 | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | trans-siberian-orchestra | verify (applied) | 18573455 | https://seatgeek.com/trans-siberian-orchestra-tickets/duluth-georgia-gas-south-arena-2026-12-13-3-pm/concert/18573455 | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | trans-siberian-orchestra | verify (applied) | 18573458 | https://seatgeek.com/trans-siberian-orchestra-tickets/dallas-texas-american-airlines-center-2026-12-13-3-pm/concert/18573458 | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | andrea-bocelli | verify (applied) | 18039188 | https://seatgeek.com/andrea-bocelli-tickets/montreal-canada-centre-bell-2026-12-13-8-pm/concert/18039188 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | blue-october | verify (applied) | 18140941 | https://seatgeek.com/blue-october-tickets/hidalgo-texas-payne-arena-2026-12-13-8-pm/concert/18140941 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | olivia-rodrigo | verify (applied) | 18211717 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-15-7-pm/concert/18211717 | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | tyla | verify (applied) | 18404300 | https://seatgeek.com/tyla-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-15-8-pm/concert/18404300 | - |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | trans-siberian-orchestra | verify (applied) | 18573461 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlottesville-virginia-john-paul-jones-arena-2026-12-16-7-30-pm/concert/18573461 | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | trivium | verify (applied) | 18391988 | https://seatgeek.com/trivium-tickets/omaha-nebraska-steelhouse-omaha-2026-12-16-6-35-pm/concert/18391988 | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | trans-siberian-orchestra | verify (applied) | 18573466 | https://seatgeek.com/trans-siberian-orchestra-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-12-16-7-pm/concert/18573466 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | trans-siberian-orchestra | verify (applied) | 18573467 | https://seatgeek.com/trans-siberian-orchestra-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-12-17-7-pm/concert/18573467 | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | trans-siberian-orchestra | verify (applied) | 18573470 | https://seatgeek.com/trans-siberian-orchestra-tickets/albany-new-york-mvp-arena-2026-12-17-7-30-pm/concert/18573470 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | blue-october | verify (applied) | 18140982 | https://seatgeek.com/blue-october-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2026-12-17-8-pm/concert/18140982 | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | trans-siberian-orchestra | verify (applied) | 18573472 | https://seatgeek.com/trans-siberian-orchestra-tickets/hershey-pennsylvania-giant-center-2026-12-18-3-pm/concert/18573472 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | trans-siberian-orchestra | verify (applied) | 18573474 | https://seatgeek.com/trans-siberian-orchestra-tickets/orlando-florida-kia-center-2026-12-19-2-30-pm/concert/18573474 | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | trans-siberian-orchestra | verify (applied) | 18573477 | https://seatgeek.com/trans-siberian-orchestra-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-19-2-30-pm/concert/18573477 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | beartooth | verify (applied) | 18253079 | https://seatgeek.com/beartooth-tickets/wheatland-california-hard-rock-live-sacramento-2026-12-19-6-30-pm/concert/18253079 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | trans-siberian-orchestra | verify (applied) | 18573484 | https://seatgeek.com/trans-siberian-orchestra-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-20-3-pm/concert/18573484 | - |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | trans-siberian-orchestra | verify (applied) | 18573485 | https://seatgeek.com/trans-siberian-orchestra-tickets/tampa-florida-benchmark-international-arena-2026-12-20-3-pm/concert/18573485 | - |
| tm-pentatonix-2026-san-diego-vvg1iz_2i-g3fb | pentatonix | verify (applied) | 18427232 | https://seatgeek.com/pentatonix-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-20-6-pm/concert/18427232 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-trans-siberian-orchestra-2026-indianapolis-vv17fz_8gkiwqjq1 | trans-siberian-orchestra | verify (applied) | 18573492 | https://seatgeek.com/trans-siberian-orchestra-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-12-22-3-pm/concert/18573492 | - |
| tm-trans-siberian-orchestra-2026-detroit-vv17oz_8gkyvghou | trans-siberian-orchestra | verify (applied) | 18573495 | https://seatgeek.com/trans-siberian-orchestra-tickets/detroit-michigan-little-caesars-arena-2026-12-23-3-pm/concert/18573495 | - |
| tm-trans-siberian-orchestra-2026-rosemont-vv1a7zkffgkdsxaxx | trans-siberian-orchestra | verify (applied) | 18573496 | https://seatgeek.com/trans-siberian-orchestra-tickets/rosemont-illinois-allstate-arena-2026-12-23-2-45-pm/concert/18573496 | - |
| tm-trans-siberian-orchestra-2026-newark-vv1aezkf_gkdmwuvf | trans-siberian-orchestra | verify (applied) | 18573503 | https://seatgeek.com/trans-siberian-orchestra-tickets/newark-new-jersey-prudential-center-2026-12-26-3-pm/concert/18573503 | - |
| tm-trans-siberian-orchestra-2026-milwaukee-vv1a6zkfogkdqpudv | trans-siberian-orchestra | verify (applied) | 18573505 | https://seatgeek.com/trans-siberian-orchestra-tickets/milwaukee-wisconsin-fiserv-forum-2026-12-26-3-pm/concert/18573505 | - |
| tm-trans-siberian-orchestra-2026-washington-17a8v0g62bwqi08 | trans-siberian-orchestra | verify (applied) | 18573509 | https://seatgeek.com/trans-siberian-orchestra-tickets/washington-district-of-columbia-capital-one-arena-2026-12-27-3-pm/concert/18573509 | - |
| tm-trans-siberian-orchestra-2026-minneapolis-vv1akzkfbgkelyd6x | trans-siberian-orchestra | verify (applied) | 18573514 | https://seatgeek.com/trans-siberian-orchestra-tickets/minneapolis-minnesota-target-center-2026-12-27-3-pm/concert/18573514 | - |
| tm-trans-siberian-orchestra-2026-toronto-1avzz_8gkmdenjm | trans-siberian-orchestra | verify (applied) | 18573520 | https://seatgeek.com/trans-siberian-orchestra-tickets/toronto-canada-scotiabank-arena-2026-12-29-3-pm/concert/18573520 | - |
| tm-trans-siberian-orchestra-2026-kansas-city-vv1kvovpkbgacwdwu | trans-siberian-orchestra | verify (applied) | 18573521 | https://seatgeek.com/trans-siberian-orchestra-tickets/kansas-city-missouri-t-mobile-center-2026-12-29-3-pm/concert/18573521 | - |
| tm-trans-siberian-orchestra-2026-buffalo-k7vgf_okhdtog | trans-siberian-orchestra | verify (applied) | 18573528 | https://seatgeek.com/trans-siberian-orchestra-tickets/buffalo-new-york-keybank-center-2026-12-30-3-pm/concert/18573528 | - |
| tm-trans-siberian-orchestra-2026-saint-louis-vv1akzkfbgkdrsdgs | trans-siberian-orchestra | verify (applied) | 18573529 | https://seatgeek.com/trans-siberian-orchestra-tickets/saint-louis-missouri-enterprise-center-2026-12-30-3-pm/concert/18573529 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | lionel-richie | verify (applied) | 18405681 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-09-8-pm/concert/18405681 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | stella-lefty | verify (applied) | 18527909 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-12-7-pm/concert/18527909 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | olivia-rodrigo | verify (applied) | 18211724 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-12-7-pm/concert/18211724 | - |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | stella-lefty | verify (applied) | 18539735 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-13-7-pm/concert/18539735 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | olivia-rodrigo | verify (applied) | 18211726 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-13-7-pm/concert/18211726 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | verify (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | eagles | verify (applied) | 18421044 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | atmosphere | verify (applied) | 18609072 | https://seatgeek.com/atmosphere-tickets/west-des-moines-iowa-val-air-ballroom-2027-01-16-6-45-pm/concert/18609072 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | olivia-rodrigo | verify (applied) | 18214730 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-16-7-pm/concert/18214730 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | eagles | verify (applied) | 18421045 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-16-8-30-pm/concert/18421045 | - |
| tm-missio-2027-cleveland-vv17fz_8gkl63cwa | missio | verify (applied) | 18492738 | https://seatgeek.com/missio-tickets/cleveland-ohio-cambridge-room-at-house-of-blues-cleveland-1-2027-01-17-7-pm/concert/18492738 | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | atmosphere | verify (applied) | 18609074 | https://seatgeek.com/atmosphere-tickets/omaha-nebraska-the-admiral-omaha-2027-01-17-8-pm/concert/18609074 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | olivia-rodrigo | verify (applied) | 18211731 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-17-7-pm/concert/18211731 | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | atmosphere | verify (applied) | 18609075 | https://seatgeek.com/atmosphere-tickets/fort-collins-colorado-aggie-theatre-2027-01-19-6-45-pm/concert/18609075 | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | death-cab-for-cutie | verify (applied) | 18603599 | https://seatgeek.com/death-cab-for-cutie-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2027-01-19-8-pm/concert/18603599 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | olivia-rodrigo | verify (applied) | 18224991 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-20-7-pm/concert/18224991 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | santana | verify (applied) | 18628819 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-20-7-pm/concert/18628819 | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | alan-walker | verify (applied) | 18595131 | https://seatgeek.com/alan-walker-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-21-7-pm/concert/18595131 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | olivia-rodrigo | verify (applied) | 18224990 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-21-7-pm/concert/18224990 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | santana | verify (applied) | 18628820 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-21-7-pm/concert/18628820 | - |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | the-red-clay-strays | verify (applied) | 18639066 | https://seatgeek.com/the-red-clay-strays-tickets/raleigh-north-carolina-lenovo-center-2027-01-22-7-pm/concert/18639066 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | verify (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-stella-lefty-2027-philadelphia-vv1aezkfkgkddxsrk | stella-lefty | verify (applied) | 18527883 | https://seatgeek.com/stella-lefty-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-01-22-8-pm/concert/18527883 | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | atmosphere | verify (applied) | 18609083 | https://seatgeek.com/atmosphere-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-01-22-6-45-pm/concert/18609083 | - |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | the-red-clay-strays | verify (applied) | 18639067 | https://seatgeek.com/the-red-clay-strays-tickets/columbia-south-carolina-colonial-life-arena-2027-01-23-7-pm/concert/18639067 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | santana | verify (applied) | 18628821 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-23-7-pm/concert/18628821 | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | tommy-emmanuel | verify (applied) | 18593679 | https://seatgeek.com/tommy-emmanuel-tickets/madison-wisconsin-barrymore-theatre-madison-2027-01-24-8-pm/concert/18593679 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | olivia-rodrigo | verify (applied) | 18225825 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-24-7-pm/concert/18225825 | - |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | pink-martini | verify (applied) | 18668823 | https://seatgeek.com/pink-martini-tickets/bellingham-washington-mount-baker-theatre-2027-01-24-7-pm/concert/18668823 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | santana | verify (applied) | 18628822 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-24-7-pm/concert/18628822 | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | daughtry | verify (applied) | 18632894 | https://seatgeek.com/daughtry-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-25-7-pm/concert/18632894 | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | tommy-emmanuel | verify (applied) | 18594247 | https://seatgeek.com/tommy-emmanuel-tickets/skokie-illinois-north-shore-center-for-the-performing-arts-van-dusen-theatre-2027-01-25-7-30-pm/concert/18594247 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | olivia-rodrigo | verify (applied) | 18227093 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-25-7-pm/concert/18227093 | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | stella-lefty | verify (applied) | 18527886 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-01-26-8-pm/concert/18527886 | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | yacht-rock-revue | verify (applied) | 18618051 | https://seatgeek.com/yacht-rock-revue-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-27-7-30-pm/concert/18618051 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | santana | verify (applied) | 18628823 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-27-7-pm/concert/18628823 | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | tommy-emmanuel | verify (applied) | 18594658 | https://seatgeek.com/tommy-emmanuel-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-28-7-pm/concert/18594658 | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | daughtry | verify (applied) | 18632896 | https://seatgeek.com/daughtry-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-28-7-pm/concert/18632896 | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | the-red-clay-strays | verify (applied) | 18639068 | https://seatgeek.com/the-red-clay-strays-tickets/rosemont-illinois-allstate-arena-2027-01-28-7-pm/concert/18639068 | - |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | alan-walker | verify (applied) | 18621798 | https://seatgeek.com/alan-walker-tickets/nashville-tennessee-the-pinnacle-nashville-2027-01-28-8-pm/concert/18621798 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | olivia-rodrigo | verify (applied) | 18230500 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-28-7-pm/concert/18230500 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | santana | verify (applied) | 18628824 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-28-7-pm/concert/18628824 | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | atmosphere | verify (applied) | 18609088 | https://seatgeek.com/atmosphere-tickets/eugene-oregon-mcdonald-theatre-2027-01-28-8-pm/concert/18609088 | - |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | yacht-rock-revue | verify (applied) | 18621818 | https://seatgeek.com/yacht-rock-revue-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-29-7-30-pm/concert/18621818 | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | the-red-clay-strays | verify (applied) | 18639069 | https://seatgeek.com/the-red-clay-strays-tickets/saint-louis-missouri-enterprise-center-2027-01-29-7-pm/concert/18639069 | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | dylan-scott | verify (applied) | 18603379 | https://seatgeek.com/dylan-scott-tickets/bismarck-north-dakota-bismarck-event-center-2027-01-29-7-30-pm/concert/18603379 | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | blue-october | verify (applied) | 18354266 | https://seatgeek.com/blue-october-tickets/midland-texas-wagner-noel-performing-arts-center-2027-01-29-8-pm/concert/18354266 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | olivia-rodrigo | verify (applied) | 18230501 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-29-7-pm/concert/18230501 | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | atmosphere | verify (applied) | 18609092 | https://seatgeek.com/atmosphere-tickets/reno-nevada-grand-sierra-resort-2027-01-29-7-pm/concert/18609092 | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | tobymac | verify (applied) | 18542844 | https://seatgeek.com/tobymac-tickets/huntsville-alabama-propst-arena-at-the-von-braun-center-2027-01-30-7-pm/concert/18542844 | - |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | daughtry | verify (applied) | 18632898 | https://seatgeek.com/daughtry-tickets/biloxi-mississippi-hard-rock-hotel-casino-biloxi-2027-01-30-7-pm/concert/18632898 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | blue-october | verify (applied) | 18238718 | https://seatgeek.com/blue-october-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-01-30-8-pm/concert/18238718 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | santana | verify (applied) | 18628831 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-30-7-pm/concert/18628831 | - |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | tobymac | verify (applied) | 18542726 | https://seatgeek.com/tobymac-tickets/lafayette-louisiana-cajundome-2027-01-31-6-30-pm/concert/18542726 | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | alan-walker | verify (applied) | 18590337 | https://seatgeek.com/alan-walker-tickets/charleston-south-carolina-charleston-music-hall-2027-01-31-8-pm/concert/18590337 | - |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | the-red-clay-strays | verify (applied) | 18639070 | https://seatgeek.com/the-red-clay-strays-tickets/omaha-nebraska-chi-health-center-omaha-2027-01-31-7-pm/concert/18639070 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | santana | verify (applied) | 18628832 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-31-7-pm/concert/18628832 | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | hilary-duff | verify (applied) | 18070282 | https://seatgeek.com/hilary-duff-tickets/hamilton-canada-td-coliseum-2027-02-02-7-30-pm/concert/18070282 | - |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | greta-van-fleet | verify (applied) | 18641948 | https://seatgeek.com/greta-van-fleet-tickets/savannah-georgia-enmarket-arena-2027-02-03-7-pm/concert/18641948 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | hilary-duff | verify (applied) | 18070284 | https://seatgeek.com/hilary-duff-tickets/kanata-canada-canadian-tire-centre-2027-02-04-7-30-pm/concert/18070284 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | the-red-clay-strays | verify (applied) | 18639071 | https://seatgeek.com/the-red-clay-strays-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-05-7-pm/concert/18639071 | - |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | atmosphere | verify (applied) | 18609099 | https://seatgeek.com/atmosphere-tickets/joliet-illinois-hollywood-casino-15-2027-02-05-6-45-pm/concert/18609099 | - |
| tm-valley-2027-montreal-1ad7z_3gkblokhd | valley | verify (applied) | 18606379 | https://seatgeek.com/valley-tickets/montreal-canada-le-studio-td-2027-02-05-8-pm/concert/18606379 | - |
| tm-valley-2027-ottawa-1ad7z_3gkv11nuz | valley | verify (applied) | 18606169 | https://seatgeek.com/valley-tickets/ottawa-canada-bronson-centre-2027-02-06-7-pm/concert/18606169 | - |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | chelsea-cutler | verify (applied) | 18639173 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-06-8-pm/concert/18639173 | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | yuridia | verify (applied) | 18570383 | https://seatgeek.com/yuridia-tickets/reno-nevada-grand-sierra-resort-2027-02-06-8-pm/concert/18570383 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | chelsea-cutler | verify (applied) | 18639180 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-07-7-pm/concert/18639180 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | yuridia | verify (applied) | 18570385 | https://seatgeek.com/yuridia-tickets/san-jose-california-sap-center-at-san-jose-2027-02-07-8-pm/concert/18570385 | - |
| tm-valley-2027-london-1avzz_3gktpgnuv | valley | verify (applied) | 18606118 | https://seatgeek.com/valley-tickets/london-canada-london-music-hall-2027-02-10-7-pm/concert/18606118 | - |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | the-lemonheads | verify (applied) | 18593831 | https://seatgeek.com/the-lemonheads-tickets/boston-massachusetts-brighton-music-hall-2027-02-10-7-30-pm/concert/18593831 | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | polyphia | verify (applied) | 18536015 | https://seatgeek.com/polyphia-tickets/san-diego-california-soma-san-diego-2027-02-10-7-30-pm/concert/18536015 | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | don-omar | verify (applied) | 18333383 | https://seatgeek.com/don-omar-tickets/san-diego-california-pechanga-arena-san-diego-2027-02-10-8-pm/concert/18333383 | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | blue-october | verify (applied) | 18245801 | https://seatgeek.com/blue-october-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-02-10-8-pm/concert/18245801 | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | olivia-rodrigo | verify (applied) | 18211656 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-11-7-pm/concert/18211656 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | dinosaur-jr | verify (applied) | 18540431 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-11-8-pm/concert/18540431 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595137 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-11-9-pm/concert/18595137 | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | blue-october | verify (applied) | 18239347 | https://seatgeek.com/blue-october-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-11-8-pm/concert/18239347 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | olivia-rodrigo | verify (applied) | 18211659 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-12-7-pm/concert/18211659 | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | tobymac | verify (applied) | 18548802 | https://seatgeek.com/tobymac-tickets/sugar-land-texas-smart-financial-centre-2027-02-12-7-pm/concert/18548802 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | dinosaur-jr | verify (applied) | 18540433 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-12-8-pm/concert/18540433 | - |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | fantasia | verify (applied) | 18632088 | https://seatgeek.com/fantasia-tickets/elmont-new-york-ubs-arena-2027-02-12-8-pm/concert/18632088 | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | daughtry | verify (applied) | 18632912 | https://seatgeek.com/daughtry-tickets/durant-oklahoma-choctaw-grand-theater-2027-02-12-7-pm/concert/18632912 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | backstreet-boys | verify (applied) | 18642041 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-12-8-pm/concert/18642041 | - |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | pink-martini | verify (applied) | 18396258 | https://seatgeek.com/pink-martini-tickets/chicago-illinois-chicago-symphony-center-2027-02-12-8-pm/concert/18396258 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | alan-walker | verify (applied) | 18595135 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-12-9-pm/concert/18595135 | - |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | flans | verify (applied) | 18612856 | https://seatgeek.com/flans-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-02-12-8-pm/concert/18612856 | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | backstreet-boys | verify (applied) | 18642039 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-13-8-pm/concert/18642039 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | stella-lefty | verify (applied) | 18527897 | https://seatgeek.com/stella-lefty-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-13-7-pm/concert/18527897 | - |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | flans | verify (applied) | 18612650 | https://seatgeek.com/flans-tickets/tucson-arizona-linda-ronstadt-music-hall-2027-02-13-8-pm/concert/18612650 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | backstreet-boys | verify (applied) | 18652781 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-14-8-pm/concert/18652781 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | olivia-rodrigo | verify (applied) | 18211660 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-15-7-pm/concert/18211660 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | olivia-rodrigo | verify (applied) | 18211657 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-16-7-pm/concert/18211657 | - |
| tm-valley-2027-winnipeg-1av7z_3gkbokkjd | valley | verify (applied) | 18606405 | https://seatgeek.com/valley-tickets/winnipeg-canada-the-park-theatre-2027-02-16-7-pm/concert/18606405 | - |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | daughtry | verify (applied) | 18632920 | https://seatgeek.com/daughtry-tickets/duluth-minnesota-decc-symphony-hall-2027-02-16-7-pm/concert/18632920 | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | verify (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | don-omar | verify (applied) | 18325165 | https://seatgeek.com/don-omar-tickets/toronto-canada-scotiabank-arena-2027-02-17-8-pm/concert/18325165 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | alan-walker | verify (applied) | 18591555 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-18-6-pm/concert/18591555 | - |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | chelsea-cutler | verify (applied) | 18639185 | https://seatgeek.com/chelsea-cutler-tickets/detroit-michigan-saint-andrews-hall-2027-02-18-7-pm/concert/18639185 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | gracie-abrams | verify (applied) | 18270548 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-18-8-pm/concert/18270548 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | alan-walker | verify (applied) | 18591553 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-19-6-pm/concert/18591553 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | olivia-rodrigo | verify (applied) | 18224685 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-19-7-pm/concert/18224685 | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | verify (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-hans-zimmer-2027-belmont-park-1adzz_3gkmrvuzw | hans-zimmer | verify (applied) | 18601921 | https://seatgeek.com/hans-zimmer-tickets/elmont-new-york-ubs-arena-2027-02-19-7-30-pm/concert/18601921 | - |
| tm-gracie-abrams-2027-toronto-177zv0g65ic_clu | gracie-abrams | verify (applied) | 18270552 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-19-8-pm/concert/18270552 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7luql | backstreet-boys | verify (applied) | 18642040 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-19-8-pm/concert/18642040 | - |
| tm-chelsea-cutler-2027-chicago-vv178z_kgks8xdpl | chelsea-cutler | verify (applied) | 18639192 | https://seatgeek.com/chelsea-cutler-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-19-8-pm/concert/18639192 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwdwpi | olivia-rodrigo | verify (applied) | 18224992 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-20-7-pm/concert/18224992 | - |
| tm-the-lemonheads-2027-atlanta-vvg1zz_3rf_-sk | the-lemonheads | verify (applied) | 18593800 | https://seatgeek.com/the-lemonheads-tickets/atlanta-georgia-the-masquerade-hell-2027-02-20-7-30-pm/concert/18593800 | - |
| tm-valley-2027-calgary-1av7z_3gkb3cpp6 | valley | verify (applied) | 18605986 | https://seatgeek.com/valley-tickets/calgary-canada-the-palace-theatre-calgary-2027-02-20-6-pm/concert/18605986 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ouqm | backstreet-boys | verify (applied) | 18642042 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-20-8-pm/concert/18642042 | - |
| tm-polyphia-2027-denver-g5vzz_oe6fcei | polyphia | verify (applied) | 18312321 | https://seatgeek.com/polyphia-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-20-7-30-pm/concert/18312321 | - |
| tm-dylan-scott-2027-park-city-vv17bz_3gkmnbnzl | dylan-scott | verify (applied) | 18600816 | https://seatgeek.com/dylan-scott-tickets/park-city-kansas-heartland-credit-union-arena-2027-02-20-7-30-pm/concert/18600816 | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | sylvan-esso | verify (applied) | 18299162 | https://seatgeek.com/sylvan-esso-tickets/vancouver-canada-vogue-theatre-bc-1-2027-02-20-8-pm/concert/18299162 | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | tobymac | verify (applied) | 18548806 | https://seatgeek.com/tobymac-tickets/norfolk-virginia-chartway-arena-2027-02-21-6-30-pm/concert/18548806 | - |
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | alan-walker | verify (applied) | 18591884 | https://seatgeek.com/alan-walker-tickets/ottawa-canada-history-ottawa-2027-02-21-6-30-pm/concert/18591884 | - |
| tm-needtobreathe-2027-duluth-vv1kbz_kekg7rpco | needtobreathe | verify (applied) | 18621526 | https://seatgeek.com/needtobreathe-tickets/duluth-minnesota-decc-symphony-hall-2027-02-21-7-pm/concert/18621526 | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | mico | verify (applied) | 18665962 | https://seatgeek.com/mico-tickets/charleston-south-carolina-charleston-music-hall-2027-02-21-8-pm/concert/18665962 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | sylvan-esso | verify (applied) | 18299165 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-22-8-30-pm/concert/18299165 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | olivia-rodrigo | verify (applied) | 18226585 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-23-7-pm/concert/18226585 | - |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | polyphia | verify (applied) | 18312324 | https://seatgeek.com/polyphia-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-02-23-7-30-pm/concert/18312324 | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | dinosaur-jr | verify (applied) | 18540443 | https://seatgeek.com/dinosaur-jr-tickets/orlando-florida-the-plaza-live-2027-02-23-7-30-pm/concert/18540443 | - |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | chelsea-cutler | verify (applied) | 18639194 | https://seatgeek.com/chelsea-cutler-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-02-23-6-30-pm/concert/18639194 | - |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | alan-walker | verify (applied) | 18595139 | https://seatgeek.com/alan-walker-tickets/pittsburgh-pennsylvania-stage-ae-2027-02-23-8-pm/concert/18595139 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwfupw | olivia-rodrigo | verify (applied) | 18226587 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-24-7-pm/concert/18226587 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-valley-2027-vancouver-1av7z_3gkb3hpv9 | valley | verify (applied) | 18606271 | https://seatgeek.com/valley-tickets/vancouver-canada-commodore-ballroom-2027-02-24-7-pm/concert/18606271 | - |
| tm-the-red-clay-strays-2027-estero-vvg1vz_ks60_np | the-red-clay-strays | verify (applied) | 18639080 | https://seatgeek.com/the-red-clay-strays-tickets/estero-florida-hertz-arena-2027-02-25-7-pm/concert/18639080 | - |
| tm-michelle-branch-2027-charleston-g5evz_8w8tpxk | michelle-branch | verify (applied) | 18508823 | https://seatgeek.com/michelle-branch-tickets/charleston-south-carolina-charleston-music-hall-2027-02-25-8-pm/concert/18508823 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | flans | verify (applied) | 18612632 | https://seatgeek.com/flans-tickets/atlanta-georgia-cobb-energy-performing-arts-centre-2027-02-25-8-pm/concert/18612632 | - |
| tm-blue-october-2027-vancouver-1778v0g61pgtl-u | blue-october | verify (applied) | 18238922 | https://seatgeek.com/blue-october-tickets/vancouver-canada-commodore-ballroom-2027-02-25-7-pm/concert/18238922 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | flans | verify (applied) | 18612827 | https://seatgeek.com/flans-tickets/charlotte-north-carolina-ovens-auditorium-2027-02-26-8-pm/concert/18612827 | - |
| tm-valley-2027-seattle-vvg1hz_3nsltnp | valley | verify (applied) | 18606330 | https://seatgeek.com/valley-tickets/seattle-washington-neptune-theatre-wa-2027-02-26-8-pm/concert/18606330 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvw1wpg | olivia-rodrigo | verify (applied) | 18227138 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-27-7-pm/concert/18227138 | - |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | flans | verify (applied) | 18618099 | https://seatgeek.com/flans-tickets/raleigh-north-carolina-martin-marietta-center-for-the-performing-arts-memorial-auditorium-2027-02-27-8-pm/concert/18618099 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwuqpx | olivia-rodrigo | verify (applied) | 18229435 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-28-7-pm/concert/18229435 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-los-angeles-vv1aazkf-gkdqrhdg | valley | verify (applied) | 18606549 | https://seatgeek.com/valley-tickets/los-angeles-california-the-bellwether-2027-03-02-8-pm/concert/18606549 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | staind | verify (applied) | 18654539 | https://seatgeek.com/staind-tickets/manchester-new-hampshire-snhu-arena-2027-03-04-6-pm/concert/18654539 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-flans-2027-denver-g5vzz_kk90pao | flans | verify (applied) | 18612819 | https://seatgeek.com/flans-tickets/denver-colorado-paramount-theatre-co-2027-03-04-8-pm/concert/18612819 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | gracie-abrams | verify (applied) | 18270567 | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-05-8-pm/concert/18270567 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | hans-zimmer | verify (applied) | 18601929 | https://seatgeek.com/hans-zimmer-tickets/chicago-illinois-united-center-2027-03-05-7-30-pm/concert/18601929 | - |
| tm-valley-2027-salt-lake-city-g5vzz_3bnvu2b | valley | verify (applied) | 18606235 | https://seatgeek.com/valley-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-03-05-7-pm/concert/18606235 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | fantasia | verify (applied) | 18629502 | https://seatgeek.com/fantasia-tickets/ontario-california-toyota-arena-ontario-2027-03-05-8-pm/concert/18629502 | - |
| tm-staind-2027-baltimore-11a8vpokayf8vu | staind | verify (applied) | 18654540 | https://seatgeek.com/staind-tickets/baltimore-maryland-cfg-bank-arena-2027-03-06-6-pm/concert/18654540 | - |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | needtobreathe | verify (applied) | 18621547 | https://seatgeek.com/needtobreathe-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-06-7-pm/concert/18621547 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | don-omar | verify (applied) | 18326519 | https://seatgeek.com/don-omar-tickets/fort-worth-texas-dickies-arena-2027-03-06-8-pm/concert/18326519 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | pink-martini | verify (applied) | 18500192 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-06-7-30-pm/concert/18500192 | - |
| tm-blondshell-2027-vancouver-16ozkfzopzauakea | blondshell | verify (applied) | 18633501 | https://seatgeek.com/blondshell-tickets/vancouver-canada-commodore-ballroom-2027-03-06-6-30-pm/concert/18633501 | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | blue-october | verify (applied) | 18262264 | https://seatgeek.com/blue-october-tickets/denver-colorado-mission-ballroom-2027-03-06-8-pm/concert/18262264 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | verify (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | metallica | verify (applied) | 18111114 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-06-8-30-pm/concert/18111114 | - |
| tm-morat-2027-boston-vvg17z_1b5nnhl | morat | verify (applied) | 18251537 | https://seatgeek.com/morat-tickets/boston-massachusetts-agganis-arena-2027-03-07-8-pm/concert/18251537 | - |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | michelle-branch | verify (applied) | 18508828 | https://seatgeek.com/michelle-branch-tickets/houston-texas-house-of-blues-houston-2027-03-07-7-pm/concert/18508828 | - |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | lukas-graham | verify (applied) | 18617859 | https://seatgeek.com/lukas-graham-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-07-8-pm/concert/18617859 | - |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | don-omar | verify (applied) | 18326567 | https://seatgeek.com/don-omar-tickets/austin-texas-moody-center-atx-2027-03-07-8-pm/concert/18326567 | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | blue-october | verify (applied) | 18306113 | https://seatgeek.com/blue-october-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-07-8-pm/concert/18306113 | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | blondshell | verify (applied) | 18251042 | https://seatgeek.com/blondshell-tickets/seattle-washington-showbox-sodo-2027-03-07-8-pm/concert/18251042 | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | sylvan-esso | verify (applied) | 18299178 | https://seatgeek.com/sylvan-esso-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-08-8-pm/concert/18299178 | - |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | hans-zimmer | verify (applied) | 18601932 | https://seatgeek.com/hans-zimmer-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-03-09-7-30-pm/concert/18601932 | - |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | lukas-graham | verify (applied) | 18618370 | https://seatgeek.com/lukas-graham-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-09-8-30-pm/concert/18618370 | - |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | vnv-nation | verify (applied) | 18659523 | https://seatgeek.com/vnv-nation-tickets/nashville-tennessee-exit-in-2027-03-09-8-pm/concert/18659523 | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | chelsea-cutler | verify (applied) | 18639209 | https://seatgeek.com/chelsea-cutler-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-09-7-pm/concert/18639209 | - |
| tm-staind-2027-huntington-1kaovp8iga2ivff | staind | verify (applied) | 18654510 | https://seatgeek.com/staind-tickets/huntington-west-virginia-marshall-health-network-arena-2027-03-10-6-pm/concert/18654510 | - |
| tm-don-omar-2027-tampa-vvg1vz_uc-buha | don-omar | verify (applied) | 18325141 | https://seatgeek.com/don-omar-tickets/tampa-florida-benchmark-international-arena-2027-03-10-8-pm/concert/18325141 | - |
| tm-valley-2027-nashville-g5viz_3rrquu4 | valley | verify (applied) | 18606526 | https://seatgeek.com/valley-tickets/nashville-tennessee-brooklyn-bowl-nashville-2027-03-10-8-pm/concert/18606526 | - |
| tm-hans-zimmer-2027-orlando-1axzkfygkexmgrx | hans-zimmer | verify (applied) | 18601931 | https://seatgeek.com/hans-zimmer-tickets/orlando-florida-kia-center-2027-03-11-7-30-pm/concert/18601931 | - |
| tm-tobymac-2027-austin-g5diz_oelxrxd | tobymac | verify (applied) | 18543696 | https://seatgeek.com/tobymac-tickets/austin-texas-moody-center-atx-2027-03-11-7-pm/concert/18543696 | - |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | jay-wheeler | verify (applied) | 18649595 | https://seatgeek.com/jay-wheeler-tickets/miami-florida-kaseya-center-2027-03-11-8-pm/concert/18649595 | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | blue-october | verify (applied) | 18343763 | https://seatgeek.com/blue-october-tickets/chicago-illinois-riviera-theatre-chicago-2027-03-11-8-pm/concert/18343763 | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | yuridia | verify (applied) | 18570402 | https://seatgeek.com/yuridia-tickets/sugar-land-texas-smart-financial-centre-2027-03-11-8-pm/concert/18570402 | - |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | sylvan-esso | verify (applied) | 18299183 | https://seatgeek.com/sylvan-esso-tickets/new-orleans-louisiana-tipitina-s-2027-03-11-8-pm/concert/18299183 | - |
| tm-staind-2027-tampa-vvg1vz_f6ermdd | staind | verify (applied) | 18654500 | https://seatgeek.com/staind-tickets/tampa-florida-benchmark-international-arena-2027-03-12-6-pm/concert/18654500 | - |
| tm-valley-2027-atlanta-vvg1zz_32aklli | valley | verify (applied) | 18606100 | https://seatgeek.com/valley-tickets/atlanta-georgia-the-masquerade-hell-2027-03-12-7-pm/concert/18606100 | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65pru4zd | gracie-abrams | verify (applied) | 18270573 | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-12-8-pm/concert/18270573 | - |
| tm-don-omar-2027-miami-vvg1vz_uk8ovtf | don-omar | verify (applied) | 18325223 | https://seatgeek.com/don-omar-tickets/miami-florida-kaseya-center-2027-03-12-8-pm/concert/18325223 | - |
| tm-tobymac-2027-san-antonio-g5diz_olf8jri | tobymac | verify (applied) | 18542854 | https://seatgeek.com/tobymac-tickets/san-antonio-texas-freeman-coliseum-2027-03-12-7-pm/concert/18542854 | - |
| tm-death-cab-for-cutie-2027-knoxville-g5viz_3xoa9li | death-cab-for-cutie | verify (applied) | 18603808 | https://seatgeek.com/death-cab-for-cutie-tickets/knoxville-tennessee-tennessee-theatre-2027-03-12-8-pm/concert/18603808 | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | morat | verify (applied) | 18259792 | https://seatgeek.com/morat-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-03-12-8-pm/concert/18259792 | - |
| tm-sylvan-esso-2027-birmingham-17fzv0g6gpo7w2j | sylvan-esso | verify (applied) | 18299185 | https://seatgeek.com/sylvan-esso-tickets/birmingham-alabama-iron-city-2027-03-12-8-pm/concert/18299185 | - |
| tm-yuridia-2027-dallas-vvg1yz_32hm5d6 | yuridia | verify (applied) | 18570406 | https://seatgeek.com/yuridia-tickets/dallas-texas-dos-equis-pavilion-2027-03-12-8-pm/concert/18570406 | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | blondshell | verify (applied) | 18251049 | https://seatgeek.com/blondshell-tickets/chicago-illinois-vic-theatre-chicago-2027-03-12-8-pm/concert/18251049 | - |
| tm-michelle-branch-2027-anaheim-vv1aazkf6gkdxx2ly | michelle-branch | verify (applied) | 18508836 | https://seatgeek.com/michelle-branch-tickets/anaheim-california-house-of-blues-anaheim-2027-03-12-7-pm/concert/18508836 | - |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | flans | verify (applied) | 18612871 | https://seatgeek.com/flans-tickets/san-diego-california-san-diego-civic-theatre-2027-03-12-8-pm/concert/18612871 | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | chelsea-cutler | verify (applied) | 18639214 | https://seatgeek.com/chelsea-cutler-tickets/seattle-washington-showbox-sodo-2027-03-12-7-pm/concert/18639214 | - |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | staind | verify (applied) | 18654501 | https://seatgeek.com/staind-tickets/west-palm-beach-florida-ithink-financial-amphitheatre-2027-03-13-6-pm/concert/18654501 | - |
| tm-dinosaur-jr-2027-boston-vv16vzkf4vvza5c5kf | dinosaur-jr | verify (applied) | 18540462 | https://seatgeek.com/dinosaur-jr-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-13-7-pm/concert/18540462 | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | gracie-abrams | verify (applied) | 18270574 | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-13-8-pm/concert/18270574 | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | tobymac | verify (applied) | 18548874 | https://seatgeek.com/tobymac-tickets/lubbock-texas-united-supermarkets-arena-2027-03-13-7-pm/concert/18548874 | - |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | hans-zimmer | verify (applied) | 18601933 | https://seatgeek.com/hans-zimmer-tickets/miami-florida-kaseya-center-2027-03-13-8-pm/concert/18601933 | - |
| tm-needtobreathe-2027-columbia-g5evz_kkuppj_ | needtobreathe | verify (applied) | 18621554 | https://seatgeek.com/needtobreathe-tickets/columbia-south-carolina-township-auditorium-2027-03-13-8-pm/concert/18621554 | - |
| tm-valley-2027-charlotte-g5evz_3nrncxj | valley | verify (applied) | 18606490 | https://seatgeek.com/valley-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-03-13-8-pm/concert/18606490 | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | morat | verify (applied) | 18259793 | https://seatgeek.com/morat-tickets/sugar-land-texas-smart-financial-centre-2027-03-13-8-pm/concert/18259793 | - |
| tm-sylvan-esso-2027-nashville-g5viz_g3v82ae | sylvan-esso | verify (applied) | 18299188 | https://seatgeek.com/sylvan-esso-tickets/nashville-tennessee-brooklyn-bowl-nashville-2027-03-13-7-pm/concert/18299188 | - |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | fantasia | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18645847 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-michelle-branch-2027-los-angeles-vv170z_8gksjroc_ | michelle-branch | verify (applied) | 18508837 | https://seatgeek.com/michelle-branch-tickets/los-angeles-california-the-wiltern-2027-03-13-7-pm/concert/18508837 | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | chelsea-cutler | verify (applied) | 18639215 | https://seatgeek.com/chelsea-cutler-tickets/portland-oregon-roseland-theater-2027-03-13-7-pm/concert/18639215 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | metallica | verify (applied) | 18111118 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-13-8-30-pm/concert/18111118 | - |
| tm-blue-october-2027-rockford-17f8v0g61mnfk5g | blue-october | verify (applied) | 18239397 | https://seatgeek.com/blue-october-tickets/rockford-illinois-hard-rock-live-rockford-2027-03-14-6-pm/concert/18239397 | - |
| tm-needtobreathe-2027-orlando-1axzkfggkdmxefx | needtobreathe | verify (applied) | 18621555 | https://seatgeek.com/needtobreathe-tickets/orlando-florida-hard-rock-live-orlando-2027-03-14-7-pm/concert/18621555 | - |
| tm-valley-2027-washington-16vfz_333g7mktl | valley | verify (applied) | 18606068 | https://seatgeek.com/valley-tickets/washington-district-of-columbia-9-30-club-2027-03-14-7-pm/concert/18606068 | - |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | hans-zimmer | verify (applied) | 18601934 | https://seatgeek.com/hans-zimmer-tickets/tampa-florida-benchmark-international-arena-2027-03-14-7-30-pm/concert/18601934 | - |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | don-omar | verify (applied) | 18325188 | https://seatgeek.com/don-omar-tickets/orlando-florida-kia-center-2027-03-14-8-pm/concert/18325188 | - |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | vnv-nation | verify (applied) | 17912521 | https://seatgeek.com/vnv-nation-tickets/atlanta-georgia-variety-playhouse-2027-03-14-8-pm/concert/17912521 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | death-cab-for-cutie | verify (applied) | 18604670 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-14-8-pm/concert/18604670 | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | blondshell | verify (applied) | 18251054 | https://seatgeek.com/blondshell-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-14-8-pm/concert/18251054 | - |
| tm-morat-2027-hidalgo-g5diz_1bprewh | morat | verify (applied) | 18251579 | https://seatgeek.com/morat-tickets/hidalgo-texas-payne-arena-2027-03-14-8-pm/concert/18251579 | - |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | yuridia | verify (applied) | 18570407 | https://seatgeek.com/yuridia-tickets/el-paso-texas-don-haskins-center-2027-03-14-8-pm/concert/18570407 | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | the-lemonheads | verify (applied) | 18595343 | https://seatgeek.com/the-lemonheads-tickets/englewood-colorado-gothic-theatre-2027-03-14-8-30-pm/concert/18595343 | - |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | flans | verify (applied) | 18612688 | https://seatgeek.com/flans-tickets/los-angeles-california-orpheum-theatre-los-angeles-2027-03-14-8-pm/concert/18612688 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | death-cab-for-cutie | verify (applied) | 18604671 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-15-8-pm/concert/18604671 | - |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | staind | verify (applied) | 18654502 | https://seatgeek.com/staind-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-03-16-6-pm/concert/18654502 | - |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | hans-zimmer | verify (applied) | 18601941 | https://seatgeek.com/hans-zimmer-tickets/atlanta-georgia-state-farm-arena-1-2027-03-16-7-30-pm/concert/18601941 | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | rod-stewart | verify (applied) | 18603490 | https://seatgeek.com/rod-stewart-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-16-7-30-pm/concert/18603490 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | gracie-abrams | verify (applied) | 18270579 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-16-8-pm/concert/18270579 | - |
| tm-valley-2027-philadelphia-vv1aezkfygkdw6utw | valley | verify (applied) | 18606537 | https://seatgeek.com/valley-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-03-16-8-pm/concert/18606537 | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | the-lemonheads | verify (applied) | 18595344 | https://seatgeek.com/the-lemonheads-tickets/omaha-nebraska-the-waiting-room-omaha-2027-03-16-7-pm/concert/18595344 | - |
| tm-needtobreathe-2027-memphis-g5viz_k1t4cqs | needtobreathe | verify (applied) | 18621556 | https://seatgeek.com/needtobreathe-tickets/memphis-tennessee-satellite-music-hall-2027-03-17-6-pm/concert/18621556 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | gracie-abrams | verify (applied) | 18270580 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-17-8-pm/concert/18270580 | - |
| tm-tobymac-2027-fargo-vv1akzkf_gkd8vyo- | tobymac | verify (applied) | 18542853 | https://seatgeek.com/tobymac-tickets/fargo-north-dakota-fargodome-2027-03-17-7-pm/concert/18542853 | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | death-cab-for-cutie | verify (applied) | 18604673 | https://seatgeek.com/death-cab-for-cutie-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-17-7-pm/concert/18604673 | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | valley | verify (applied) | 18643169 | https://seatgeek.com/valley-tickets/new-york-new-york-webster-hall-2027-03-17-8-pm/concert/18643169 | - |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | niall-horan | verify (applied) | 18235523 | https://seatgeek.com/niall-horan-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-17-7-30-pm/concert/18235523 | - |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | hans-zimmer | verify (applied) | 18601967 | https://seatgeek.com/hans-zimmer-tickets/nashville-tennessee-bridgestone-arena-2027-03-17-7-30-pm/concert/18601967 | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | michelle-branch | verify (applied) | 18650112 | https://seatgeek.com/michelle-branch-tickets/denver-colorado-mission-ballroom-2027-03-17-8-pm/concert/18650112 | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | too-many-zooz | verify (applied) | 18612556 | https://seatgeek.com/too-many-zooz-tickets/colorado-springs-colorado-black-sheep-2027-03-17-8-pm/concert/18612556 | - |
| tm-needtobreathe-2027-memphis-g5viz_k1tpwrf | needtobreathe | verify (applied) | 18621561 | https://seatgeek.com/needtobreathe-tickets/memphis-tennessee-satellite-music-hall-2027-03-18-6-pm/concert/18621561 | - |
| tm-valley-2027-boston-vv177z_3gkmvpndn | valley | verify (applied) | 18606067 | https://seatgeek.com/valley-tickets/boston-massachusetts-paradise-rock-club-2027-03-18-7-pm/concert/18606067 | - |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | staind | verify (applied) | 18654504 | https://seatgeek.com/staind-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-18-6-pm/concert/18654504 | - |
| tm-morat-2027-orlando-17fov0g61xg_prh | morat | verify (applied) | 18251530 | https://seatgeek.com/morat-tickets/orlando-florida-kia-center-2027-03-18-8-pm/concert/18251530 | - |
| tm-death-cab-for-cutie-2027-miami-beach-vvg1vz_3ltyqny | death-cab-for-cutie | verify (applied) | 18603788 | https://seatgeek.com/death-cab-for-cutie-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-03-18-8-pm/concert/18603788 | - |
| tm-pink-martini-2027-quebec-17g8v0g61ihh8sg | pink-martini | verify (applied) | 18238944 | https://seatgeek.com/pink-martini-tickets/quebec-city-canada-theatre-capitole-2027-03-18-8-30-pm/concert/18238944 | - |
| tm-yuridia-2027-laredo-g5diz_3f66dhn | yuridia | verify (applied) | 18570409 | https://seatgeek.com/yuridia-tickets/laredo-texas-sames-auto-arena-2027-03-18-8-pm/concert/18570409 | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | vnv-nation | verify (applied) | 18165972 | https://seatgeek.com/vnv-nation-tickets/mesa-arizona-nile-theater-mesa-2027-03-18-8-pm/concert/18165972 | - |
| tm-needtobreathe-2027-new-orleans-g5viz_ocxa2ai | needtobreathe | verify (applied) | 18621562 | https://seatgeek.com/needtobreathe-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-03-19-6-pm/concert/18621562 | - |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | staind | verify (applied) | 18654503 | https://seatgeek.com/staind-tickets/dallas-texas-dos-equis-pavilion-2027-03-19-6-pm/concert/18654503 | - |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | niall-horan | verify (applied) | 18235522 | https://seatgeek.com/niall-horan-tickets/detroit-michigan-little-caesars-arena-2027-03-19-7-30-pm/concert/18235522 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | gracie-abrams | verify (applied) | 18270584 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-19-8-pm/concert/18270584 | - |
| tm-tobymac-2027-rockford-vv1a7zkfpgkdtiktq | tobymac | verify (applied) | 18542858 | https://seatgeek.com/tobymac-tickets/rockford-illinois-bmo-center-2027-03-19-7-pm/concert/18542858 | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | yuridia | verify (applied) | 18570410 | https://seatgeek.com/yuridia-tickets/edinburg-texas-bert-ogden-arena-2027-03-19-8-pm/concert/18570410 | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | hans-zimmer | verify (applied) | 18601968 | https://seatgeek.com/hans-zimmer-tickets/kansas-city-missouri-t-mobile-center-2027-03-19-8-pm/concert/18601968 | - |
| tm-the-lemonheads-2027-madison-vv17jz_3gkbfxvrj | the-lemonheads | verify (applied) | 18593821 | https://seatgeek.com/the-lemonheads-tickets/madison-wisconsin-majestic-theatre-wi-2027-03-19-8-pm/concert/18593821 | - |
| tm-too-many-zooz-2027-denver-g5vzz_kkf1pnr | too-many-zooz | verify (applied) | 18612771 | https://seatgeek.com/too-many-zooz-tickets/denver-colorado-summit-music-hall-denver-2027-03-19-7-pm/concert/18612771 | - |
| tm-vnv-nation-2027-san-diego-vvg1izbvnuske3 | vnv-nation | verify (applied) | 18150796 | https://seatgeek.com/vnv-nation-tickets/san-diego-california-house-of-blues-san-diego-2027-03-19-7-pm/concert/18150796 | - |
| tm-nickelback-2027-hamilton-1a8zk4axofsze2g | nickelback | verify (applied) | 18664627 | https://seatgeek.com/nickelback-tickets/hamilton-canada-td-coliseum-2027-03-20-6-30-pm/concert/18664627 | - |
| tm-blondshell-2027-toronto-177zv0g61ygdrn9 | blondshell | verify (applied) | 18251050 | https://seatgeek.com/blondshell-tickets/toronto-canada-the-danforth-music-hall-2027-03-20-7-pm/concert/18251050 | - |
| tm-niall-horan-2027-columbus-vvg1fz_1x9ig7q | niall-horan | verify (applied) | 18235520 | https://seatgeek.com/niall-horan-tickets/columbus-ohio-nationwide-arena-2027-03-20-7-30-pm/concert/18235520 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | gracie-abrams | verify (applied) | 18270586 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-20-8-pm/concert/18270586 | - |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | morat | verify (applied) | 18251573 | https://seatgeek.com/morat-tickets/miami-florida-kaseya-center-2027-03-20-8-pm/concert/18251573 | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | michelle-branch | verify (applied) | 18508844 | https://seatgeek.com/michelle-branch-tickets/columbus-ohio-kemba-live-2027-03-20-8-pm/concert/18508844 | - |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | death-cab-for-cutie | verify (applied) | 18603759 | https://seatgeek.com/death-cab-for-cutie-tickets/orlando-florida-hard-rock-live-orlando-2027-03-20-8-pm/concert/18603759 | - |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | needtobreathe | verify (applied) | 18621563 | https://seatgeek.com/needtobreathe-tickets/houston-texas-713-music-hall-2027-03-20-7-pm/concert/18621563 | - |
| tm-valley-2027-toronto-1avzz_3gkdexa9o | valley | verify (applied) | 18606234 | https://seatgeek.com/valley-tickets/toronto-canada-massey-hall-2027-03-20-8-pm/concert/18606234 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | verify (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-nickelback-2027-toronto-1a8zk47gkdvbcpm | nickelback | verify (applied) | 18664630 | https://seatgeek.com/nickelback-tickets/toronto-canada-scotiabank-arena-2027-03-21-6-30-pm/concert/18664630 | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | michelle-branch | verify (applied) | 18508847 | https://seatgeek.com/michelle-branch-tickets/royal-oak-michigan-royal-oak-music-theatre-2027-03-21-7-pm/concert/18508847 | - |
| tm-tobymac-2027-tulsa-1aozkf_gkdn-dht | tobymac | verify (applied) | 18542855 | https://seatgeek.com/tobymac-tickets/tulsa-oklahoma-bok-center-2027-03-21-6-30-pm/concert/18542855 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-vnv-nation-2027-san-francisco-g5vyzbvdfhbds | vnv-nation | verify (applied) | 18150870 | https://seatgeek.com/vnv-nation-tickets/san-francisco-california-august-hall-2027-03-21-7-30-pm/concert/18150870 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | hans-zimmer | verify (applied) | 18601942 | https://seatgeek.com/hans-zimmer-tickets/fort-worth-texas-dickies-arena-2027-03-22-7-30-pm/concert/18601942 | - |
| tm-death-cab-for-cutie-2027-houston-g5diz_3dogrf9 | death-cab-for-cutie | verify (applied) | 18604033 | https://seatgeek.com/death-cab-for-cutie-tickets/houston-texas-713-music-hall-2027-03-22-8-pm/concert/18604033 | - |
| tm-the-interrupters-2027-dallas-vvg1yz_k69fczg | the-interrupters | verify (applied) | 18612572 | https://seatgeek.com/the-interrupters-tickets/dallas-texas-house-of-blues-dallas-2027-03-23-6-pm/concert/18612572 | - |
| tm-blondshell-2027-asbury-park-k7vgf_knjlgim | blondshell | verify (applied) | 18633502 | https://seatgeek.com/blondshell-tickets/asbury-park-new-jersey-the-stone-pony-2-2027-03-23-7-pm/concert/18633502 | - |
| tm-saint-levant-2027-toronto-177zv0g6cemiqt_ | saint-levant | verify (applied) | 18387668 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-23-7-pm/concert/18387668 | - |
| tm-michelle-branch-2027-portland-vv177z_8gkm-dic1 | michelle-branch | verify (applied) | 18508848 | https://seatgeek.com/michelle-branch-tickets/portland-maine-state-theatre-portland-me-2027-03-23-8-pm/concert/18508848 | - |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | niall-horan | verify (applied) | 18235524 | https://seatgeek.com/niall-horan-tickets/chicago-illinois-united-center-2027-03-23-7-30-pm/concert/18235524 | - |
| tm-the-interrupters-2027-houston-g5diz_3r-jkhd | the-interrupters | verify (applied) | 18612693 | https://seatgeek.com/the-interrupters-tickets/houston-texas-house-of-blues-houston-2027-03-24-6-pm/concert/18612693 | - |
| tm-saint-levant-2027-toronto-177zv0g6cemcutq | saint-levant | verify (applied) | 18387667 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-24-7-pm/concert/18387667 | - |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | jay-wheeler | verify (applied) | 18649607 | https://seatgeek.com/jay-wheeler-tickets/brooklyn-new-york-barclays-center-2027-03-24-8-pm/concert/18649607 | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkeskm_x | yuridia | verify (applied) | 18609778 | https://seatgeek.com/yuridia-tickets/rosemont-illinois-rosemont-theatre-2027-03-24-8-pm/concert/18609778 | - |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | death-cab-for-cutie | verify (applied) | 18604672 | https://seatgeek.com/death-cab-for-cutie-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-24-8-pm/concert/18604672 | - |
| tm-vnv-nation-2027-seattle-vvg1hzbvl3-6jq | vnv-nation | verify (applied) | 18149562 | https://seatgeek.com/vnv-nation-tickets/seattle-washington-neptune-theatre-wa-2027-03-24-8-pm/concert/18149562 | - |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | warren-zeiders | verify (applied) | 18649742 | https://seatgeek.com/warren-zeiders-tickets/orlando-florida-house-of-blues-orlando-2027-03-25-7-pm/concert/18649742 | - |
| tm-the-lemonheads-2027-detroit-vv17oz_3gklkn916 | the-lemonheads | verify (applied) | 18593750 | https://seatgeek.com/the-lemonheads-tickets/detroit-michigan-saint-andrews-hall-2027-03-25-7-pm/concert/18593750 | - |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | michelle-branch | verify (applied) | 18508849 | https://seatgeek.com/michelle-branch-tickets/new-york-new-york-beacon-theatre-2027-03-25-8-pm/concert/18508849 | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | the-psychedelic-furs | verify (applied) | 18592690 | https://seatgeek.com/the-psychedelic-furs-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-25-8-pm/concert/18592690 | - |
| tm-dylan-gossett-2027-charleston-g5evz_kdp4j6z | dylan-gossett | verify (applied) | 18642081 | https://seatgeek.com/dylan-gossett-tickets/charleston-south-carolina-charleston-music-hall-2027-03-25-7-pm/concert/18642081 | - |
| tm-pink-martini-2027-houston-g5diz_8uc2ajn | pink-martini | verify (applied) | 18515284 | https://seatgeek.com/pink-martini-tickets/houston-texas-sarofim-hall-at-the-hobby-center-2027-03-25-7-30-pm/concert/18515284 | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkenyiy- | yuridia | verify (applied) | 18570495 | https://seatgeek.com/yuridia-tickets/rosemont-illinois-rosemont-theatre-2027-03-25-8-pm/concert/18570495 | - |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | hans-zimmer | verify (applied) | 18601943 | https://seatgeek.com/hans-zimmer-tickets/denver-colorado-ball-arena-2027-03-25-7-30-pm/concert/18601943 | - |
| tm-dylan-gossett-2027-north-myrtle-beach-g5evz_kuxkrl8 | dylan-gossett | verify (applied) | 18642079 | https://seatgeek.com/dylan-gossett-tickets/north-myrtle-beach-south-carolina-house-of-blues-myrtle-beach-2027-03-26-7-pm/concert/18642079 | - |
| tm-niall-horan-2027-indianapolis-vvg1fz_1htnybv | niall-horan | verify (applied) | 18235521 | https://seatgeek.com/niall-horan-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-03-26-7-30-pm/concert/18235521 | - |
| tm-michelle-branch-2027-silver-spring-16vfz_809g7nt6o | michelle-branch | verify (applied) | 18508850 | https://seatgeek.com/michelle-branch-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-26-8-pm/concert/18508850 | - |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | fantasia | verify (applied) | 18629276 | https://seatgeek.com/fantasia-tickets/atlanta-georgia-state-farm-arena-1-2027-03-26-8-pm/concert/18629276 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_3tpkkro | the-red-clay-strays | verify (applied) | 18609522 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-26-7-pm/concert/18609522 | - |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | death-cab-for-cutie | verify (applied) | 18604674 | https://seatgeek.com/death-cab-for-cutie-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-03-26-7-30-pm/concert/18604674 | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | staind | verify (applied) | 18655524 | https://seatgeek.com/staind-tickets/spokane-washington-numerica-veterans-arena-2027-03-26-6-pm/concert/18655524 | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | vnv-nation | verify (applied) | 18662604 | https://seatgeek.com/vnv-nation-tickets/salt-lake-city-utah-the-grand-at-the-complex-2027-03-26-7-30-pm/concert/18662604 | - |
| tm-morat-2027-montreal-17g8v0g65cezfzf | morat | verify (applied) | 18258641 | https://seatgeek.com/morat-tickets/montreal-canada-mtelus-2027-03-27-8-pm/concert/18258641 | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | yuridia | verify (applied) | 18570411 | https://seatgeek.com/yuridia-tickets/brooklyn-new-york-kings-theatre-brooklyn-2027-03-27-8-pm/concert/18570411 | - |
| tm-fantasia-2027-orlando-1aefz_3gkx--7oo | fantasia | verify (applied) | 18629529 | https://seatgeek.com/fantasia-tickets/orlando-florida-addition-financial-arena-2027-03-27-8-pm/concert/18629529 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k14dqes | the-red-clay-strays | verify (applied) | 18612577 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-27-7-pm/concert/18612577 | - |
| tm-dylan-gossett-2027-charlotte-g5evz_kb2iepf | dylan-gossett | verify (applied) | 18642082 | https://seatgeek.com/dylan-gossett-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-27-7-pm/concert/18642082 | - |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | jay-wheeler | verify (applied) | 18649625 | https://seatgeek.com/jay-wheeler-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-27-8-pm/concert/18649625 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | verify (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-niall-horan-2027-saint-louis-vvg1bz_1qy32om | niall-horan | verify (applied) | 18235528 | https://seatgeek.com/niall-horan-tickets/saint-louis-missouri-enterprise-center-2027-03-27-7-30-pm/concert/18235528 | - |
| tm-michelle-branch-2027-philadelphia-z7r9jz1aazyqb | michelle-branch | verify (applied) | 18508855 | https://seatgeek.com/michelle-branch-tickets/philadelphia-pennsylvania-franklin-music-hall-2027-03-27-8-30-pm/concert/18508855 | - |
| tm-greta-van-fleet-2027-boise-g5vzz_fkffj8x | greta-van-fleet | verify (applied) | 18641996 | https://seatgeek.com/greta-van-fleet-tickets/boise-idaho-extramile-arena-2027-03-27-7-pm/concert/18641996 | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | death-cab-for-cutie | verify (applied) | 18604675 | https://seatgeek.com/death-cab-for-cutie-tickets/huntsville-alabama-orion-amphitheater-2027-03-27-8-pm/concert/18604675 | - |
| tm-hans-zimmer-2027-salt-lake-city-z7r9jz1aavvqa | hans-zimmer | verify (applied) | 18415275 | https://seatgeek.com/hans-zimmer-tickets/salt-lake-city-utah-delta-center-1-2027-03-27-7-30-pm/concert/18415275 | - |
| tm-the-interrupters-2027-orlando-1aefz_3gkdwdk5a | the-interrupters | verify (applied) | 18612830 | https://seatgeek.com/the-interrupters-tickets/orlando-florida-house-of-blues-orlando-2027-03-28-6-pm/concert/18612830 | - |
| tm-yuridia-2027-national-harbor-1a4zkfxgkelii5v | yuridia | verify (applied) | 18570413 | https://seatgeek.com/yuridia-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-03-28-8-pm/concert/18570413 | - |
| tm-saint-levant-2027-philadelphia-vvg1fz_cxbxmek | saint-levant | verify (applied) | 18386192 | https://seatgeek.com/saint-levant-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-03-28-8-pm/concert/18386192 | - |
| tm-vnv-nation-2027-omaha-z7r9jz1a7q0ef | vnv-nation | verify (applied) | 18357653 | https://seatgeek.com/vnv-nation-tickets/omaha-nebraska-slowdown-2027-03-29-8-pm/concert/18357653 | - |
| tm-dylan-gossett-2027-chattanooga-z7r9jz1aae4bi | dylan-gossett | verify (applied) | 18642078 | https://seatgeek.com/dylan-gossett-tickets/chattanooga-tennessee-the-signal-2027-03-30-7-pm/concert/18642078 | - |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | hans-zimmer | verify (applied) | 18601944 | https://seatgeek.com/hans-zimmer-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-30-7-30-pm/concert/18601944 | - |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | nothing-but-thieves | verify (applied) | 18266338 | https://seatgeek.com/nothing-but-thieves-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-30-8-pm/concert/18266338 | - |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | nothing-but-thieves | verify (applied) | 18266337 | https://seatgeek.com/nothing-but-thieves-tickets/seattle-washington-paramount-theatre-wa-2027-03-31-8-pm/concert/18266337 | - |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | death-cab-for-cutie | verify (applied) | 18604682 | https://seatgeek.com/death-cab-for-cutie-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-04-01-8-pm/concert/18604682 | - |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | saint-levant | verify (applied) | 18550841 | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-01-7-pm/concert/18550841 | - |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | morat | verify (applied) | 18252365 | https://seatgeek.com/morat-tickets/brooklyn-new-york-barclays-center-2027-04-01-8-pm/concert/18252365 | - |
| tm-the-psychedelic-furs-2027-waukegan-vv166zkf-0ozagdv5d | the-psychedelic-furs | verify (applied) | 18592664 | https://seatgeek.com/the-psychedelic-furs-tickets/waukegan-illinois-genesee-theatre-2027-04-01-7-30-pm/concert/18592664 | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | warren-zeiders | verify (applied) | 18649741 | https://seatgeek.com/warren-zeiders-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-04-01-7-pm/concert/18649741 | - |
| tm-vnv-nation-2027-chicago-z7r9jz1a7pupm | vnv-nation | verify (applied) | 18159984 | https://seatgeek.com/vnv-nation-tickets/chicago-illinois-metro-chicago-2027-04-01-8-pm/concert/18159984 | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | riley-green | verify (applied) | 18626511 | https://seatgeek.com/riley-green-tickets/spokane-washington-numerica-veterans-arena-2027-04-01-7-pm/concert/18626511 | - |
| tm-hans-zimmer-2027-los-angeles-z7r9jz1aavvq8 | hans-zimmer | verify (applied) | 18601970 | https://seatgeek.com/hans-zimmer-tickets/los-angeles-california-crypto-com-arena-2027-04-01-7-30-pm/concert/18601970 | - |
| tm-nothing-but-thieves-2027-portland-z7r9jz1a70gfm | nothing-but-thieves | verify (applied) | 18266341 | https://seatgeek.com/nothing-but-thieves-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-01-8-pm/concert/18266341 | - |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | lukas-graham | verify (applied) | 18617577 | https://seatgeek.com/lukas-graham-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-02-7-pm/concert/18617577 | - |
| tm-the-interrupters-2027-silver-spring-1avfz_3gkbss6tr | the-interrupters | verify (applied) | 18612960 | https://seatgeek.com/the-interrupters-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-02-7-pm/concert/18612960 | - |
| tm-niall-horan-2027-montreal-17g8v0g61rtd60v | niall-horan | verify (applied) | 18235567 | https://seatgeek.com/niall-horan-tickets/montreal-canada-centre-bell-2027-04-02-7-30-pm/concert/18235567 | - |
| tm-dylan-gossett-2027-fayetteville-z7r9jz1aae4bt | dylan-gossett | verify (applied) | 18642083 | https://seatgeek.com/dylan-gossett-tickets/fayetteville-arkansas-ozark-music-hall-2027-04-02-7-pm/concert/18642083 | - |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | warren-zeiders | verify (applied) | 18649743 | https://seatgeek.com/warren-zeiders-tickets/waukee-iowa-vibrant-music-hall-2027-04-02-7-pm/concert/18649743 | - |
| tm-the-psychedelic-furs-2027-nashville-z7r9jz1aavpq_ | the-psychedelic-furs | verify (applied) | 18592665 | https://seatgeek.com/the-psychedelic-furs-tickets/nashville-tennessee-ryman-auditorium-2027-04-02-8-pm/concert/18592665 | - |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | jay-wheeler | verify (applied) | 18649608 | https://seatgeek.com/jay-wheeler-tickets/rosemont-illinois-rosemont-theatre-2027-04-02-8-pm/concert/18649608 | - |
| tm-riley-green-2027-seattle-vvg1hz_keoq4yp | riley-green | verify (applied) | 18626514 | https://seatgeek.com/riley-green-tickets/seattle-washington-climate-pledge-arena-2027-04-02-7-pm/concert/18626514 | - |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | hans-zimmer | verify (applied) | 18601946 | https://seatgeek.com/hans-zimmer-tickets/anaheim-california-honda-center-2027-04-02-7-30-pm/concert/18601946 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | harry-styles | verify (applied) | 18570444 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-02-7-45-pm/concert/18570444 | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | luke-combs | verify (applied) | 18379496 | https://seatgeek.com/luke-combs-tickets/arlington-texas-at-t-stadium-2027-04-03-5-20-pm/concert/18379496 | - |
| tm-morat-2027-fairfax-17a8v0g61boau0r | morat | verify (applied) | 18251698 | https://seatgeek.com/morat-tickets/fairfax-virginia-eaglebank-arena-2027-04-03-8-pm/concert/18251698 | - |
| tm-lukas-graham-2027-philadelphia-vv1aovpuf-zf9v5 | lukas-graham | verify (applied) | 18617589 | https://seatgeek.com/lukas-graham-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-04-03-8-pm/concert/18617589 | - |
| tm-dylan-gossett-2027-memphis-g5viz_f659_2b | dylan-gossett | verify (applied) | 18642090 | https://seatgeek.com/dylan-gossett-tickets/memphis-tennessee-satellite-music-hall-2027-04-03-7-pm/concert/18642090 | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | staind | verify (applied) | 18655681 | https://seatgeek.com/staind-tickets/billings-montana-first-interstate-arena-2027-04-03-6-pm/concert/18655681 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | harry-styles | verify (applied) | 18577793 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-03-7-45-pm/concert/18577793 | - |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | nothing-but-thieves | verify (applied) | 18266340 | https://seatgeek.com/nothing-but-thieves-tickets/oakland-california-fox-theater-oakland-2027-04-03-8-pm/concert/18266340 | - |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | the-interrupters | verify (applied) | 18613085 | https://seatgeek.com/the-interrupters-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-04-6-pm/concert/18613085 | - |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | niall-horan | verify (applied) | 18235519 | https://seatgeek.com/niall-horan-tickets/brooklyn-new-york-barclays-center-2027-04-04-7-30-pm/concert/18235519 | - |
| tm-dylan-gossett-2027-birmingham-1aezz_kgkbdr7ks | dylan-gossett | verify (applied) | 18642092 | https://seatgeek.com/dylan-gossett-tickets/birmingham-alabama-avondale-brewing-company-2027-04-04-7-pm/concert/18642092 | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | jay-wheeler | verify (applied) | 18649609 | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | hans-zimmer | verify (applied) | 18601947 | https://seatgeek.com/hans-zimmer-tickets/san-francisco-california-chase-center-2027-04-04-7-30-pm/concert/18601947 | - |
| tm-death-cab-for-cutie-2027-montreal-1ad7z_3gkrplg-n | death-cab-for-cutie | verify (applied) | 18603817 | https://seatgeek.com/death-cab-for-cutie-tickets/montreal-canada-mtelus-2027-04-05-8-pm/concert/18603817 | - |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | haiden-henderson | verify (applied) | 18613096 | https://seatgeek.com/haiden-henderson-tickets/santa-ana-california-constellation-room-at-the-observatory-2027-04-05-7-pm/concert/18613096 | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | hans-zimmer | verify (applied) | 18601953 | https://seatgeek.com/hans-zimmer-tickets/sacramento-california-golden-1-center-2027-04-05-7-30-pm/concert/18601953 | - |
| tm-dylan-gossett-2027-philadelphia-vv17fz_kgkmvqdsy | dylan-gossett | verify (applied) | 18642093 | https://seatgeek.com/dylan-gossett-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-06-7-pm/concert/18642093 | - |
| tm-vnv-nation-2027-montreal-1ad7zbvgklrkbrt | vnv-nation | verify (applied) | 18543174 | https://seatgeek.com/vnv-nation-tickets/montreal-canada-beanfield-theatre-2027-04-06-8-pm/concert/18543174 | - |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | jay-wheeler | verify (applied) | 18649614 | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 | - |
| tm-the-interrupters-2027-boston-vv1avzkftgkexzmrt | the-interrupters | verify (applied) | 18612664 | https://seatgeek.com/the-interrupters-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-07-6-pm/concert/18612664 | - |
| tm-saint-levant-2027-detroit-vv1koz_opyg7lxkw | saint-levant | verify (applied) | 18550843 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-07-7-pm/concert/18550843 | - |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | lukas-graham | verify (applied) | 18617565 | https://seatgeek.com/lukas-graham-tickets/detroit-michigan-saint-andrews-hall-2027-04-07-7-pm/concert/18617565 | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | the-psychedelic-furs | verify (applied) | 18592691 | https://seatgeek.com/the-psychedelic-furs-tickets/tallahassee-florida-the-moon-2027-04-07-7-30-pm/concert/18592691 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgkjcy | death-cab-for-cutie | verify (applied) | 18604107 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-07-8-pm/concert/18604107 | - |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | foy-vance | verify (applied) | 18084515 | https://seatgeek.com/foy-vance-tickets/birmingham-alabama-iron-city-2027-04-07-7-pm/concert/18084515 | - |
| tm-dylan-gossett-2027-baltimore-1avfz_kgkbht6mj | dylan-gossett | verify (applied) | 18642094 | https://seatgeek.com/dylan-gossett-tickets/baltimore-maryland-the-paramount-baltimore-2027-04-07-7-pm/concert/18642094 | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | jay-wheeler | verify (applied) | 18649616 | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 | - |
| tm-nothing-but-thieves-2027-phoenix-17k8v0g659aif3n | nothing-but-thieves | verify (applied) | 18266349 | https://seatgeek.com/nothing-but-thieves-tickets/phoenix-arizona-the-van-buren-2027-04-07-8-pm/concert/18266349 | - |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | leon-bridges | verify (applied) | 18662693 | https://seatgeek.com/leon-bridges-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2027-04-07-8-pm/concert/18662693 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-niall-horan-2027-baltimore-17a8v0g61lfcmsv | niall-horan | verify (applied) | 18235529 | https://seatgeek.com/niall-horan-tickets/baltimore-maryland-cfg-bank-arena-2027-04-08-7-30-pm/concert/18235529 | - |
| tm-lukas-graham-2027-indianapolis-vv1kv8vpuvgauq0sn | lukas-graham | verify (applied) | 18618400 | https://seatgeek.com/lukas-graham-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-08-7-30-pm/concert/18618400 | - |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | the-psychedelic-furs | verify (applied) | 18592671 | https://seatgeek.com/the-psychedelic-furs-tickets/saint-petersburg-florida-jannus-live-2027-04-08-8-pm/concert/18592671 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgfg2c | death-cab-for-cutie | verify (applied) | 18604106 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-08-8-pm/concert/18604106 | - |
| tm-josiah-queen-2027-tulsa-1aozkf0gkevkv5m | josiah-queen | verify (applied) | 18574499 | https://seatgeek.com/josiah-queen-tickets/tulsa-oklahoma-bok-center-2027-04-08-7-pm/concert/18574499 | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | dylan-gossett | verify (applied) | 18642098 | https://seatgeek.com/dylan-gossett-tickets/columbus-ohio-kemba-live-2027-04-08-7-pm/concert/18642098 | - |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | hans-zimmer | verify (applied) | 18601965 | https://seatgeek.com/hans-zimmer-tickets/vancouver-canada-rogers-arena-2027-04-08-7-30-pm/concert/18601965 | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | john-mayer | verify (applied) | 18626622 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-08-8-pm/concert/18626622 | - |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | mei-semones | verify (applied) | 18637352 | https://seatgeek.com/mei-semones-tickets/washington-district-of-columbia-9-30-club-2027-04-09-6-pm/concert/18637352 | - |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | the-interrupters | verify (applied) | 18612730 | https://seatgeek.com/the-interrupters-tickets/montreal-canada-mtelus-2027-04-09-7-pm/concert/18612730 | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | haiden-henderson | verify (applied) | 18613093 | https://seatgeek.com/haiden-henderson-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2027-04-09-7-pm/concert/18613093 | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | verify (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | harry-styles | verify (applied) | 18516103 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-09-7-45-pm/concert/18516103 | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | fantasia | verify (applied) | 18629228 | https://seatgeek.com/fantasia-tickets/saint-louis-missouri-enterprise-center-2027-04-09-8-pm/concert/18629228 | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | nothing-but-thieves | verify (applied) | 18266350 | https://seatgeek.com/nothing-but-thieves-tickets/denver-colorado-mission-ballroom-2027-04-09-8-pm/concert/18266350 | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | hans-zimmer | verify (applied) | 18601954 | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | the-interrupters | verify (applied) | 18613159 | https://seatgeek.com/the-interrupters-tickets/toronto-canada-history-2027-04-10-6-pm/concert/18613159 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | josiah-queen | verify (applied) | 18574501 | https://seatgeek.com/josiah-queen-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-04-10-7-pm/concert/18574501 | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | foy-vance | verify (applied) | 18084058 | https://seatgeek.com/foy-vance-tickets/knoxville-tennessee-bijou-theatre-knoxville-2027-04-10-7-pm/concert/18084058 | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | dylan-gossett | verify (applied) | 18642099 | https://seatgeek.com/dylan-gossett-tickets/detroit-michigan-the-fillmore-detroit-2027-04-10-7-pm/concert/18642099 | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | saint-levant | verify (applied) | 18550858 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-10-8-pm/concert/18550858 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | fantasia | verify (applied) | 18629435 | https://seatgeek.com/fantasia-tickets/southaven-mississippi-landers-center-2027-04-10-8-pm/concert/18629435 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | john-mayer | verify (applied) | 18626621 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 | - |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | the-interrupters | verify (applied) | 18612707 | https://seatgeek.com/the-interrupters-tickets/london-canada-london-music-hall-2027-04-11-6-pm/concert/18612707 | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | lukas-graham | verify (applied) | 18617871 | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | dylan-gossett | verify (applied) | 18642102 | https://seatgeek.com/dylan-gossett-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-11-7-pm/concert/18642102 | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | nothing-but-thieves | verify (applied) | 18266353 | https://seatgeek.com/nothing-but-thieves-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-11-7-30-pm/concert/18266353 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | hans-zimmer | verify (applied) | 18601957 | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | john-mayer | verify (applied) | 18626620 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | niall-horan | verify (applied) | 18235530 | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | nothing-but-thieves | verify (applied) | 18266356 | https://seatgeek.com/nothing-but-thieves-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-12-7-30-pm/concert/18266356 | - |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | the-interrupters | verify (applied) | 18612605 | https://seatgeek.com/the-interrupters-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-13-6-pm/concert/18612605 | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | nothing-but-thieves | verify (applied) | 18266354 | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | death-cab-for-cutie | verify (applied) | 18603805 | https://seatgeek.com/death-cab-for-cutie-tickets/new-york-new-york-radio-city-music-hall-2027-04-13-8-pm/concert/18603805 | - |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | a-perfect-circle | verify (applied) | 18632504 | https://seatgeek.com/a-perfect-circle-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-13-7-pm/concert/18632504 | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | the-interrupters | verify (applied) | 18613142 | https://seatgeek.com/the-interrupters-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-14-6-pm/concert/18613142 | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | haiden-henderson | verify (applied) | 18612968 | https://seatgeek.com/haiden-henderson-tickets/atlanta-georgia-the-masquerade-hell-2027-04-14-7-pm/concert/18612968 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | warren-zeiders | verify (applied) | 18649754 | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | nothing-but-thieves | verify (applied) | 18266355 | https://seatgeek.com/nothing-but-thieves-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-15-8-pm/concert/18266355 | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | niall-horan | verify (applied) | 18235538 | https://seatgeek.com/niall-horan-tickets/raleigh-north-carolina-lenovo-center-2027-04-15-7-30-pm/concert/18235538 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | jay-wheeler | verify (applied) | 18649618 | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | a-perfect-circle | verify (applied) | 18632506 | https://seatgeek.com/a-perfect-circle-tickets/calgary-canada-scotiabank-saddledome-2027-04-15-7-30-pm/concert/18632506 | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | carly-rae-jepsen | verify (applied) | 18639050 | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | john-mayer | verify (applied) | 18626619 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 | - |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | the-interrupters | verify (applied) | 18612691 | https://seatgeek.com/the-interrupters-tickets/detroit-michigan-the-fillmore-detroit-2027-04-16-6-pm/concert/18612691 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | nothing-but-thieves | verify (applied) | 18266361 | https://seatgeek.com/nothing-but-thieves-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-04-16-8-pm/concert/18266361 | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | fantasia | verify (applied) | 18629294 | https://seatgeek.com/fantasia-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-16-8-pm/concert/18629294 | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | mei-semones | verify (applied) | 18638869 | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | carly-rae-jepsen | verify (applied) | 18639051 | https://seatgeek.com/carly-rae-jepsen-tickets/calgary-canada-grey-eagle-event-centre-2027-04-16-7-30-pm/concert/18639051 | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | luke-combs | verify (applied) | 18493404 | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | the-interrupters | verify (applied) | 18612762 | https://seatgeek.com/the-interrupters-tickets/chicago-illinois-house-of-blues-chicago-2027-04-17-5-30-pm/concert/18612762 | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | nothing-but-thieves | verify (applied) | 18266362 | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | josiah-queen | verify (applied) | 18574511 | https://seatgeek.com/josiah-queen-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-17-7-pm/concert/18574511 | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | niall-horan | verify (applied) | 18235541 | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | fantasia | verify (applied) | 18631704 | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | warren-zeiders | verify (applied) | 18649755 | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | a-perfect-circle | verify (applied) | 18632507 | https://seatgeek.com/a-perfect-circle-tickets/edmonton-canada-rogers-place-2027-04-17-7-30-pm/concert/18632507 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | john-mayer | verify (applied) | 18626618 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 | - |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | haiden-henderson | verify (applied) | 18613118 | https://seatgeek.com/haiden-henderson-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-18-8-pm/concert/18613118 | - |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | the-warning | verify (applied) | 18591375 | https://seatgeek.com/the-warning-tickets/phoenix-arizona-the-van-buren-2027-04-18-8-pm/concert/18591375 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | john-mayer | verify (applied) | 18626617 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 | - |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | hazlett | verify (applied) | 18311905 | https://seatgeek.com/hazlett-tickets/charlotte-north-carolina-neighborhood-theatre-2027-04-19-8-pm/concert/18311905 | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | a-perfect-circle | verify (applied) | 18632505 | https://seatgeek.com/a-perfect-circle-tickets/winnipeg-canada-canada-life-centre-2027-04-19-7-30-pm/concert/18632505 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | haiden-henderson | verify (applied) | 18613187 | https://seatgeek.com/haiden-henderson-tickets/washington-district-of-columbia-the-atlantis-2027-04-20-6-30-pm/concert/18613187 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | ha-ash | verify (applied) | 18608865 | https://seatgeek.com/ha-ash-tickets/toronto-canada-meridian-hall-2027-04-20-8-pm/concert/18608865 | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | saint-levant | verify (applied) | 18386196 | https://seatgeek.com/saint-levant-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2027-04-20-8-pm/concert/18386196 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | the-interrupters | verify (applied) | 18613147 | https://seatgeek.com/the-interrupters-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-21-6-pm/concert/18613147 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | warren-zeiders | verify (applied) | 18649760 | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 | - |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | ha-ash | verify (applied) | 18608840 | https://seatgeek.com/ha-ash-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-22-8-pm/concert/18608840 | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | haiden-henderson | verify (applied) | 18613099 | https://seatgeek.com/haiden-henderson-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-04-22-8-pm/concert/18613099 | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | carly-rae-jepsen | verify (applied) | 18639016 | https://seatgeek.com/carly-rae-jepsen-tickets/inglewood-california-kia-forum-2027-04-22-7-30-pm/concert/18639016 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | haiden-henderson | verify (applied) | 18612878 | https://seatgeek.com/haiden-henderson-tickets/new-york-new-york-irving-plaza-2027-04-23-7-pm/concert/18612878 | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | warren-zeiders | verify (applied) | 18649761 | https://seatgeek.com/warren-zeiders-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-04-23-7-pm/concert/18649761 | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | the-psychedelic-furs | verify (applied) | 18592681 | https://seatgeek.com/the-psychedelic-furs-tickets/baltimore-maryland-nevermore-hall-2027-04-23-8-pm/concert/18592681 | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | verify (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | leon-bridges | verify (applied) | 18662691 | https://seatgeek.com/leon-bridges-tickets/fort-worth-texas-dickies-arena-2027-04-23-7-pm/concert/18662691 | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | the-warning | verify (applied) | 18590298 | https://seatgeek.com/the-warning-tickets/seattle-washington-moore-theatre-seattle-2027-04-23-8-pm/concert/18590298 | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | fantasia | verify (applied) | 18629227 | https://seatgeek.com/fantasia-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-23-8-pm/concert/18629227 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | haiden-henderson | verify (applied) | 18613146 | https://seatgeek.com/haiden-henderson-tickets/boston-massachusetts-big-night-live-2027-04-24-6-pm/concert/18613146 | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | fontaines-d-c | verify (applied) | 18642821 | https://seatgeek.com/fontaines-d-c-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-04-24-7-pm/concert/18642821 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | the-psychedelic-furs | verify (applied) | 18592683 | https://seatgeek.com/the-psychedelic-furs-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-04-24-8-pm/concert/18592683 | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | warren-zeiders | verify (applied) | 18649764 | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | the-interrupters | verify (applied) | 18613135 | https://seatgeek.com/the-interrupters-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-24-6-30-pm/concert/18613135 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | mei-semones | verify (applied) | 18637391 | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 | - |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | a-perfect-circle | verify (applied) | 18632516 | https://seatgeek.com/a-perfect-circle-tickets/detroit-michigan-fox-theatre-detroit-2027-04-25-7-30-pm/concert/18632516 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | haiden-henderson | verify (applied) | 18612816 | https://seatgeek.com/haiden-henderson-tickets/toronto-canada-the-mod-club-2027-04-26-7-pm/concert/18612816 | - |
| tm-fkj-2027-vancouver-1778v0g6g4hh0bi | fkj | verify (applied) | 18290231 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-26-7-pm/concert/18290231 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | hazlett | verify (applied) | 18649783 | https://seatgeek.com/hazlett-tickets/new-york-new-york-irving-plaza-2027-04-27-7-pm/concert/18649783 | - |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | leon-bridges | verify (applied) | 18662696 | https://seatgeek.com/leon-bridges-tickets/toronto-canada-scotiabank-arena-2027-04-27-7-pm/concert/18662696 | - |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | the-psychedelic-furs | verify (applied) | 18592682 | https://seatgeek.com/the-psychedelic-furs-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2027-04-27-7-30-pm/concert/18592682 | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | nickelback | verify (applied) | 18664618 | https://seatgeek.com/nickelback-tickets/dallas-texas-american-airlines-center-2027-04-27-6-30-pm/concert/18664618 | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | a-perfect-circle | verify (applied) | 18632517 | https://seatgeek.com/a-perfect-circle-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-27-8-pm/concert/18632517 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | mei-semones | verify (applied) | 18637753 | https://seatgeek.com/mei-semones-tickets/vancouver-canada-commodore-ballroom-2027-04-27-7-pm/concert/18637753 | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | a-perfect-circle | verify (applied) | 18632520 | https://seatgeek.com/a-perfect-circle-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-28-7-30-pm/concert/18632520 | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | fontaines-d-c | verify (applied) | 18642820 | https://seatgeek.com/fontaines-d-c-tickets/chicago-illinois-the-salt-shed-outdoors-2027-04-28-7-pm/concert/18642820 | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | the-warning | verify (applied) | 18590114 | https://seatgeek.com/the-warning-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-28-6-30-pm/concert/18590114 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | mei-semones | verify (applied) | 18637789 | https://seatgeek.com/mei-semones-tickets/seattle-washington-neptune-theatre-wa-2027-04-28-8-pm/concert/18637789 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | john-mayer | verify (applied) | 18659121 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-28-8-pm/concert/18659121 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | warren-zeiders | verify (applied) | 18649765 | https://seatgeek.com/warren-zeiders-tickets/columbia-south-carolina-township-auditorium-2027-04-29-7-pm/concert/18649765 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-josiah-queen-2027-anaheim-vv16azkf00fza5k85a | josiah-queen | verify (applied) | 18574521 | https://seatgeek.com/josiah-queen-tickets/anaheim-california-honda-center-2027-04-29-7-pm/concert/18574521 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | warren-zeiders | verify (applied) | 18649766 | https://seatgeek.com/warren-zeiders-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-30-7-pm/concert/18649766 | - |

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
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-def-leppard-2026-hollywood-vvg1vz_5sqbrak | def-leppard | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-san-francisco-z7r9jz1a70i80 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70uao | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
