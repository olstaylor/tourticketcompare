# SeatGeek CTA verification log

Generated: 2026-11-06T00:01:58.208Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1678 (needs_recheck: 985, provenance backfill: 52, stale re-check: 1188)
- Events skipped before API checks: 535
- API calls made: 800
- Verified provenance written: 790
- URLs added: 0
- URLs corrected: 0
- URLs cleared: 0
- Provenance un-verified: 5
- Conflicts (ambiguous, untouched): 0
- No qualifying listing: 0
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | hazlett | verify (applied) | 18312117 | https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-7-pm/concert/18312117 | - |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | a-perfect-circle | verify (applied) | 18632516 | https://seatgeek.com/a-perfect-circle-tickets/detroit-michigan-fox-theatre-detroit-2027-04-25-7-30-pm/concert/18632516 | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | saint-levant | verify (applied) | 18386203 | https://seatgeek.com/saint-levant-tickets/denver-colorado-summit-music-hall-denver-2027-04-25-8-pm/concert/18386203 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | fkj | verify (applied) | 18272744 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-25-7-pm/concert/18272744 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | haiden-henderson | verify (applied) | 18612816 | https://seatgeek.com/haiden-henderson-tickets/toronto-canada-the-mod-club-2027-04-26-7-pm/concert/18612816 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-fkj-2027-vancouver-1778v0g6g4hh0bi | fkj | verify (applied) | 18290231 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-26-7-pm/concert/18290231 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | hazlett | verify (applied) | 18649783 | https://seatgeek.com/hazlett-tickets/new-york-new-york-irving-plaza-2027-04-27-7-pm/concert/18649783 | - |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | leon-bridges | verify (applied) | 18662696 | https://seatgeek.com/leon-bridges-tickets/toronto-canada-scotiabank-arena-2027-04-27-7-pm/concert/18662696 | - |
| tm-the-neighbourhood-2027-montreal-1ad7z_4gknbo3lq | the-neighbourhood | verify (applied) | 18726919 | https://seatgeek.com/the-neighbourhood-tickets/montreal-canada-centre-bell-2027-04-27-7-pm/concert/18726919 | - |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | the-psychedelic-furs | verify (applied) | 18592682 | https://seatgeek.com/the-psychedelic-furs-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2027-04-27-7-30-pm/concert/18592682 | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | nickelback | verify (applied) | 18664618 | https://seatgeek.com/nickelback-tickets/dallas-texas-american-airlines-center-2027-04-27-6-30-pm/concert/18664618 | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | a-perfect-circle | verify (applied) | 18632517 | https://seatgeek.com/a-perfect-circle-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-27-8-pm/concert/18632517 | - |
| tm-fontaines-d-c-2027-detroit-vv17oz_kgksew9wu | fontaines-d-c | verify (applied) | 18642819 | https://seatgeek.com/fontaines-d-c-tickets/detroit-michigan-fox-theatre-detroit-2027-04-27-8-pm/concert/18642819 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | mei-semones | verify (applied) | 18637753 | https://seatgeek.com/mei-semones-tickets/vancouver-canada-commodore-ballroom-2027-04-27-7-pm/concert/18637753 | - |
| tm-the-neighbourhood-2027-kanata-16szk49oizau7kga | the-neighbourhood | verify (applied) | 18726921 | https://seatgeek.com/the-neighbourhood-tickets/kanata-canada-canadian-tire-centre-2027-04-28-7-pm/concert/18726921 | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | a-perfect-circle | verify (applied) | 18632520 | https://seatgeek.com/a-perfect-circle-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-28-7-30-pm/concert/18632520 | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | fontaines-d-c | verify (applied) | 18642820 | https://seatgeek.com/fontaines-d-c-tickets/chicago-illinois-the-salt-shed-outdoors-2027-04-28-7-pm/concert/18642820 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | verify (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | the-warning | verify (applied) | 18590114 | https://seatgeek.com/the-warning-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-28-6-30-pm/concert/18590114 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | mei-semones | verify (applied) | 18637789 | https://seatgeek.com/mei-semones-tickets/seattle-washington-neptune-theatre-wa-2027-04-28-8-pm/concert/18637789 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | john-mayer | verify (applied) | 18659121 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-28-8-pm/concert/18659121 | - |
| tm-riley-green-2027-raleigh-g5evz_ke-2cfw | riley-green | verify (applied) | 18626510 | https://seatgeek.com/riley-green-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-04-29-7-pm/concert/18626510 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | warren-zeiders | verify (applied) | 18649765 | https://seatgeek.com/warren-zeiders-tickets/columbia-south-carolina-township-auditorium-2027-04-29-7-pm/concert/18649765 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-gavin-adcock-2027-salem-vv1avzk4kgkdddflu | gavin-adcock | verify (applied) | 18672827 | https://seatgeek.com/gavin-adcock-tickets/salem-virginia-salem-civic-center-2027-04-29-7-30-pm/concert/18672827 | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | verify (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-josiah-queen-2027-anaheim-vv16azkf00fza5k85a | josiah-queen | verify (applied) | 18574521 | https://seatgeek.com/josiah-queen-tickets/anaheim-california-honda-center-2027-04-29-7-pm/concert/18574521 | - |
| tm-def-leppard-2027-glendale-1kk8vp8bga1l7cc | def-leppard | verify (applied) | 18662413 | https://seatgeek.com/def-leppard-tickets/glendale-arizona-desert-diamond-arena-2027-04-29-7-pm/concert/18662413 | - |
| tm-saint-levant-2027-anaheim-vvg10z_cr0rptv | saint-levant | verify (applied) | 18386213 | https://seatgeek.com/saint-levant-tickets/anaheim-california-house-of-blues-anaheim-2027-04-29-7-pm/concert/18386213 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-riley-green-2027-knoxville-g5viz_3wie3-p | riley-green | verify (applied) | 18626513 | https://seatgeek.com/riley-green-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-30-7-pm/concert/18626513 | - |
| tm-the-neighbourhood-2027-columbus-vv17fz_4gkmetfbq | the-neighbourhood | verify (applied) | 18726908 | https://seatgeek.com/the-neighbourhood-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-04-30-7-pm/concert/18726908 | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | warren-zeiders | verify (applied) | 18649766 | https://seatgeek.com/warren-zeiders-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-30-7-pm/concert/18649766 | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | too-many-zooz | verify (applied) | 18613113 | https://seatgeek.com/too-many-zooz-tickets/houston-texas-white-oak-music-hall-downstairs-2027-04-30-7-pm/concert/18613113 | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | a-perfect-circle | verify (applied) | 18632522 | https://seatgeek.com/a-perfect-circle-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-04-30-8-pm/concert/18632522 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | verify (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-hazlett-2027-portland-vvg17z_grwzm6s | hazlett | verify (applied) | 18649786 | https://seatgeek.com/hazlett-tickets/portland-maine-state-theatre-portland-me-2027-04-30-8-pm/concert/18649786 | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | the-interrupters | verify (applied) | 18612589 | https://seatgeek.com/the-interrupters-tickets/los-angeles-california-the-wiltern-2027-04-30-5-30-pm/concert/18612589 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | fontaines-d-c | verify (applied) | 18642823 | https://seatgeek.com/fontaines-d-c-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-04-30-8-pm/concert/18642823 | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | josiah-queen | verify (applied) | 18574523 | https://seatgeek.com/josiah-queen-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-04-30-7-pm/concert/18574523 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | john-mayer | verify (applied) | 18659117 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-30-8-pm/concert/18659117 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-foy-vance-2027-boston-vv177z_7gksjyniw | foy-vance | verify (applied) | 18084126 | https://seatgeek.com/foy-vance-tickets/boston-massachusetts-the-wilbur-2027-05-01-7-pm/concert/18084126 | - |
| tm-riley-green-2027-greenville-g5evz_k14klik | riley-green | verify (applied) | 18626515 | https://seatgeek.com/riley-green-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-05-01-7-pm/concert/18626515 | - |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | leon-bridges | verify (applied) | 18662692 | https://seatgeek.com/leon-bridges-tickets/new-york-new-york-madison-square-garden-2027-05-01-7-pm/concert/18662692 | - |
| tm-zach-bryan-2027-indianapolis-vv17fz_fgkwtxpko | zach-bryan | verify (applied) | 18686628 | https://seatgeek.com/zach-bryan-tickets/indianapolis-indiana-lucas-oil-stadium-2027-05-01-7-pm/concert/18686628 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | verify (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-the-neighbourhood-2027-pittsburgh-16vbz_4jkg7tdr9 | the-neighbourhood | verify (applied) | 18726910 | https://seatgeek.com/the-neighbourhood-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-05-01-7-pm/concert/18726910 | - |
| tm-the-psychedelic-furs-2027-northfield-vv17fz_ogkhgkwao | the-psychedelic-furs | verify (applied) | 18592689 | https://seatgeek.com/the-psychedelic-furs-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-01-7-30-pm/concert/18592689 | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | nickelback | verify (applied) | 18664624 | https://seatgeek.com/nickelback-tickets/san-antonio-texas-frost-bank-center-2027-05-01-6-30-pm/concert/18664624 | - |
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | lizzy-mcalpine | verify (applied) | 18619416 | https://seatgeek.com/lizzy-mcalpine-tickets/houston-texas-713-music-hall-2027-05-01-7-pm/concert/18619416 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | fontaines-d-c | verify (applied) | 18642822 | https://seatgeek.com/fontaines-d-c-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-01-8-pm/concert/18642822 | - |
| tm-the-interrupters-2027-san-diego-vvg1iz_4zg9ez5 | the-interrupters | verify (applied) | 18703225 | https://seatgeek.com/the-interrupters-tickets/san-diego-california-soma-san-diego-2027-05-01-6-pm/concert/18703225 | - |
| tm-queens-of-the-stone-age-2027-san-diego-vvg1iz_4c-ppva | queens-of-the-stone-age | verify (applied) | 18709210 | https://seatgeek.com/queens-of-the-stone-age-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-01-6-30-pm/concert/18709210 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | john-mayer | verify (applied) | 18659119 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-01-8-pm/concert/18659119 | - |
| tm-hazlett-2027-boston-vvg17z_grnbkkr | hazlett | verify (applied) | 18311626 | https://seatgeek.com/hazlett-tickets/boston-massachusetts-paradise-rock-club-2027-05-02-7-pm/concert/18311626 | - |
| tm-the-interrupters-2027-anaheim-vv1fe8vpg33pz72fk7 | the-interrupters | verify (applied) | 18612867 | https://seatgeek.com/the-interrupters-tickets/anaheim-california-house-of-blues-anaheim-2027-05-02-5-pm/concert/18612867 | - |
| tm-niall-horan-2027-fort-worth-vvg1yz_1r1jeer | niall-horan | verify (applied) | 18235547 | https://seatgeek.com/niall-horan-tickets/fort-worth-texas-dickies-arena-2027-05-02-7-30-pm/concert/18235547 | - |
| tm-queens-of-the-stone-age-2027-inglewood-vv1k0z_48eg7ij9v | queens-of-the-stone-age | verify (applied) | 18709211 | https://seatgeek.com/queens-of-the-stone-age-tickets/inglewood-california-kia-forum-2027-05-02-6-30-pm/concert/18709211 | - |
| tm-saint-levant-2027-los-angeles-vv1aazkf_gkdotx7a | saint-levant | verify (applied) | 18550851 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-02-7-pm/concert/18550851 | - |
| tm-ha-ash-2027-inglewood-vvg1iz_3teyn4f | ha-ash | verify (applied) | 18608842 | https://seatgeek.com/ha-ash-tickets/inglewood-california-youtube-theater-2027-05-02-8-pm/concert/18608842 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjir6zj | saint-levant | verify (applied) | 18386205 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-03-7-pm/concert/18386205 | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | lizzy-mcalpine | verify (applied) | 18619418 | https://seatgeek.com/lizzy-mcalpine-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-05-04-7-pm/concert/18619418 | - |
| tm-the-neighbourhood-2027-raleigh-g5evz_4l74bcy | the-neighbourhood | verify (applied) | 18726915 | https://seatgeek.com/the-neighbourhood-tickets/raleigh-north-carolina-lenovo-center-2027-05-04-7-pm/concert/18726915 | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | a-perfect-circle | verify (applied) | 18632524 | https://seatgeek.com/a-perfect-circle-tickets/charlotte-north-carolina-truliant-amphitheater-2027-05-04-7-30-pm/concert/18632524 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | dylan-gossett | verify (applied) | 18642104 | https://seatgeek.com/dylan-gossett-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-05-04-7-pm/concert/18642104 | - |
| tm-hazlett-2027-montreal-17g8v0g62kxoauq | hazlett | verify (applied) | 18649787 | https://seatgeek.com/hazlett-tickets/montreal-canada-beanfield-theatre-2027-05-04-8-pm/concert/18649787 | - |
| tm-zach-bryan-2027-green-bay-vv17jz_fgkshdkie | zach-bryan | verify (applied) | 18686626 | https://seatgeek.com/zach-bryan-tickets/green-bay-wisconsin-lambeau-field-2027-05-04-7-pm/concert/18686626 | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjil6zv | saint-levant | verify (applied) | 18386207 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-04-7-pm/concert/18386207 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_kebfbqm | josiah-queen | verify (applied) | 18606512 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-05-7-pm/concert/18606512 | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | a-perfect-circle | verify (applied) | 18632526 | https://seatgeek.com/a-perfect-circle-tickets/duluth-georgia-gas-south-arena-2027-05-05-8-pm/concert/18632526 | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | verify (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | fontaines-d-c | verify (applied) | 18642830 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-05-8-pm/concert/18642830 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | john-mayer | verify (applied) | 18659122 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-05-8-pm/concert/18659122 | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | the-warning | verify (applied) | 18590369 | https://seatgeek.com/the-warning-tickets/detroit-michigan-the-fillmore-detroit-2027-05-06-7-pm/concert/18590369 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | riley-green | verify (applied) | 18626522 | https://seatgeek.com/riley-green-tickets/fort-worth-texas-dickies-arena-2027-05-06-7-pm/concert/18626522 | - |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | dylan-gossett | verify (applied) | 18642105 | https://seatgeek.com/dylan-gossett-tickets/madison-wisconsin-the-sylvee-2027-05-06-7-pm/concert/18642105 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | ha-ash | verify (applied) | 18608844 | https://seatgeek.com/ha-ash-tickets/san-jose-california-san-jose-civic-2027-05-06-8-pm/concert/18608844 | - |
| tm-fontaines-d-c-2027-vancouver-1aozk4v0aa_zegf | fontaines-d-c | verify (applied) | 18658881 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-06-8-pm/concert/18658881 | - |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | lizzy-mcalpine | verify (applied) | 18619420 | https://seatgeek.com/lizzy-mcalpine-tickets/detroit-michigan-fox-theatre-detroit-2027-05-07-7-pm/concert/18619420 | - |
| tm-the-neighbourhood-2027-indianapolis-vv1aazk49gkeyee1s | the-neighbourhood | verify (applied) | 18726916 | https://seatgeek.com/the-neighbourhood-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-07-7-pm/concert/18726916 | - |
| tm-harry-styles-2027-toronto-1a8zkftgkdpce50 | harry-styles | verify (applied) | 18579677 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-07-7-45-pm/concert/18579677 | - |
| tm-josiah-queen-2027-cedar-park-g5diz_32hchtd | josiah-queen | verify (applied) | 18574527 | https://seatgeek.com/josiah-queen-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-05-07-7-pm/concert/18574527 | - |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | fantasia | verify (applied) | 18629225 | https://seatgeek.com/fantasia-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-05-07-8-pm/concert/18629225 | - |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | riley-green | verify (applied) | 18626523 | https://seatgeek.com/riley-green-tickets/wichita-kansas-intrust-bank-arena-2027-05-07-7-pm/concert/18626523 | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | verify (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | verify (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | carly-rae-jepsen | verify (applied) | 18639026 | https://seatgeek.com/carly-rae-jepsen-tickets/austin-texas-moody-amphitheater-2027-05-07-7-pm/concert/18639026 | - |
| tm-a-perfect-circle-2027-the-woodlands-g5diz_kjdvhi6 | a-perfect-circle | verify (applied) | 18632528 | https://seatgeek.com/a-perfect-circle-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-05-07-8-pm/concert/18632528 | - |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | dylan-gossett | verify (applied) | 18642106 | https://seatgeek.com/dylan-gossett-tickets/kansas-city-missouri-uptown-theater-kc-2027-05-07-7-pm/concert/18642106 | - |
| tm-saint-levant-2027-san-francisco-g5vyz_cj596wt | saint-levant | verify (applied) | 18386214 | https://seatgeek.com/saint-levant-tickets/san-francisco-california-the-masonic-san-francisco-2027-05-07-8-pm/concert/18386214 | - |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | luke-combs | verify (applied) | 18493401 | https://seatgeek.com/luke-combs-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-08-5-45-pm/concert/18493401 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-the-warning-2027-ottawa-1ad7z_3gklmhbs8 | the-warning | verify (applied) | 18591885 | https://seatgeek.com/the-warning-tickets/ottawa-canada-history-ottawa-2027-05-08-7-pm/concert/18591885 | - |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | mei-semones | verify (applied) | 18638032 | https://seatgeek.com/mei-semones-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-05-08-7-pm/concert/18638032 | - |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | gavin-adcock | verify (applied) | 18674403 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-white-oak-music-hall-lawn-2027-05-08-6-pm/concert/18674403 | - |
| tm-harry-styles-2027-toronto-1a8zkftanayze5g | harry-styles | verify (applied) | 18579684 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-08-7-45-pm/concert/18579684 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | josiah-queen | verify (applied) | 18574530 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-08-7-pm/concert/18574530 | - |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | fantasia | verify (applied) | 18629230 | https://seatgeek.com/fantasia-tickets/raleigh-north-carolina-lenovo-center-2027-05-08-8-pm/concert/18629230 | - |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | riley-green | verify (applied) | 18626524 | https://seatgeek.com/riley-green-tickets/rogers-arkansas-walmart-amp-2027-05-08-7-pm/concert/18626524 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | verify (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-the-neighbourhood-2027-chicago-vv178z_4gknyh4c0 | the-neighbourhood | verify (applied) | 18726918 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2027-05-08-7-pm/concert/18726918 | - |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | carly-rae-jepsen | verify (applied) | 18639028 | https://seatgeek.com/carly-rae-jepsen-tickets/houston-texas-713-music-hall-2027-05-08-7-30-pm/concert/18639028 | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | metallica | verify (applied) | 18595110 | https://seatgeek.com/metallica-tickets/vancouver-canada-bc-place-stadium-2027-05-08-6-pm/concert/18595110 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | dylan-gossett | verify (applied) | 18642110 | https://seatgeek.com/dylan-gossett-tickets/la-vista-nebraska-the-astro-theater-la-vista-2027-05-08-7-pm/concert/18642110 | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | verify (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | ha-ash | verify (applied) | 18608845 | https://seatgeek.com/ha-ash-tickets/phoenix-arizona-arizona-financial-theatre-2027-05-08-8-pm/concert/18608845 | - |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | fontaines-d-c | verify (applied) | 18642831 | https://seatgeek.com/fontaines-d-c-tickets/seattle-washington-wamu-theater-2027-05-08-8-pm/concert/18642831 | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | lizzy-mcalpine | verify (applied) | 18619426 | https://seatgeek.com/lizzy-mcalpine-tickets/indianapolis-indiana-clowes-memorial-hall-2027-05-09-7-pm/concert/18619426 | - |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | hazlett | verify (applied) | 18649795 | https://seatgeek.com/hazlett-tickets/toronto-canada-the-danforth-music-hall-2027-05-09-7-pm/concert/18649795 | - |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | the-warning | verify (applied) | 18590511 | https://seatgeek.com/the-warning-tickets/montreal-canada-mtelus-2027-05-09-8-pm/concert/18590511 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | carly-rae-jepsen | verify (applied) | 18639027 | https://seatgeek.com/carly-rae-jepsen-tickets/nashville-tennessee-the-truth-nashville-2027-05-10-7-30-pm/concert/18639027 | - |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | saint-levant | verify (applied) | 18550856 | https://seatgeek.com/saint-levant-tickets/seattle-washington-paramount-theatre-wa-2027-05-10-8-pm/concert/18550856 | - |
| tm-the-warning-2027-toronto-1avzz_3gkltrh3z | the-warning | verify (applied) | 18591550 | https://seatgeek.com/the-warning-tickets/toronto-canada-history-2027-05-11-7-pm/concert/18591550 | - |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | carly-rae-jepsen | verify (applied) | 18639033 | https://seatgeek.com/carly-rae-jepsen-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-11-8-pm/concert/18639033 | - |
| tm-the-neighbourhood-2027-winnipeg-1av7z_4gknbr6nb | the-neighbourhood | verify (applied) | 18726926 | https://seatgeek.com/the-neighbourhood-tickets/winnipeg-canada-canada-life-centre-2027-05-11-7-pm/concert/18726926 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | fontaines-d-c | verify (applied) | 18642832 | https://seatgeek.com/fontaines-d-c-tickets/sacramento-channel-24-sacramento-2027-05-11-8-pm/concert/18642832 | - |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | carly-rae-jepsen | verify (applied) | 18639034 | https://seatgeek.com/carly-rae-jepsen-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-05-12-7-30-pm/concert/18639034 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | lizzy-mcalpine | verify (applied) | 18619429 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-12-7-pm/concert/18619429 | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | saint-levant | verify (applied) | 18551643 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-12-6-pm/concert/18551643 | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | ha-ash | verify (applied) | 18608852 | https://seatgeek.com/ha-ash-tickets/el-paso-texas-el-paso-county-coliseum-2027-05-12-7-pm/concert/18608852 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | santana | verify (applied) | 18628833 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-12-7-pm/concert/18628833 | - |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | fontaines-d-c | verify (applied) | 18642833 | https://seatgeek.com/fontaines-d-c-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-05-12-8-pm/concert/18642833 | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | verify (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | lizzy-mcalpine | verify (applied) | 18637702 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-13-7-pm/concert/18637702 | - |
| tm-hazlett-2027-chicago-vvg18z_glqlopk | hazlett | verify (applied) | 18311797 | https://seatgeek.com/hazlett-tickets/chicago-illinois-house-of-blues-chicago-2027-05-13-7-pm/concert/18311797 | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | saint-levant | verify (applied) | 18551642 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-13-6-pm/concert/18551642 | - |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | metallica | verify (applied) | 18595090 | https://seatgeek.com/metallica-tickets/san-diego-california-snapdragon-stadium-2027-05-13-6-pm/concert/18595090 | - |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | dylan-gossett | verify (applied) | 18642112 | https://seatgeek.com/dylan-gossett-tickets/austin-texas-moody-amphitheater-2027-05-13-7-pm/concert/18642112 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | verify (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | santana | verify (applied) | 18628834 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-13-7-pm/concert/18628834 | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fsxrnwp | zach-bryan | verify (applied) | 18686627 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-14-7-pm/concert/18686627 | - |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | gavin-adcock | verify (applied) | 18672973 | https://seatgeek.com/gavin-adcock-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-05-14-7-pm/concert/18672973 | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqzh13 | harry-styles | verify (applied) | 18592380 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-14-7-45-pm/concert/18592380 | - |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | carly-rae-jepsen | verify (applied) | 18639035 | https://seatgeek.com/carly-rae-jepsen-tickets/washington-district-of-columbia-the-anthem-dc-2027-05-14-7-30-pm/concert/18639035 | - |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | niall-horan | verify (applied) | 18235548 | https://seatgeek.com/niall-horan-tickets/austin-texas-moody-center-atx-2027-05-14-7-30-pm/concert/18235548 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | ha-ash | verify (applied) | 18608853 | https://seatgeek.com/ha-ash-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-14-8-pm/concert/18608853 | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | fantasia | verify (applied) | 18629275 | https://seatgeek.com/fantasia-tickets/chicago-illinois-united-center-2027-05-14-8-pm/concert/18629275 | - |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | dylan-gossett | verify (applied) | 18642115 | https://seatgeek.com/dylan-gossett-tickets/houston-texas-bayou-music-center-2027-05-14-7-pm/concert/18642115 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | verify (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-the-neighbourhood-2027-calgary-1av7z_4gknld4le | the-neighbourhood | verify (applied) | 18726927 | https://seatgeek.com/the-neighbourhood-tickets/calgary-canada-scotiabank-saddledome-2027-05-14-7-pm/concert/18726927 | - |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | def-leppard | verify (applied) | 18662462 | https://seatgeek.com/def-leppard-tickets/vancouver-canada-rogers-arena-2027-05-14-7-pm/concert/18662462 | - |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | too-many-zooz | verify (applied) | 18612957 | https://seatgeek.com/too-many-zooz-tickets/seattle-washington-neptune-theatre-wa-2027-05-14-8-pm/concert/18612957 | - |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | luke-combs | verify (applied) | 18493403 | https://seatgeek.com/luke-combs-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-15-5-45-pm/concert/18493403 | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fs0cbhd | zach-bryan | verify (applied) | 18686631 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-15-7-pm/concert/18686631 | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqbl5d | harry-styles | verify (applied) | 18592381 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-15-7-45-pm/concert/18592381 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | verify (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | the-warning | verify (applied) | 18591883 | https://seatgeek.com/the-warning-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-05-15-8-pm/concert/18591883 | - |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | fantasia | verify (applied) | 18631687 | https://seatgeek.com/fantasia-tickets/detroit-michigan-little-caesars-arena-2027-05-15-8-pm/concert/18631687 | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | carly-rae-jepsen | verify (applied) | 18639037 | https://seatgeek.com/carly-rae-jepsen-tickets/new-york-new-york-madison-square-garden-2027-05-15-7-30-pm/concert/18639037 | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | ha-ash | verify (applied) | 18608854 | https://seatgeek.com/ha-ash-tickets/hidalgo-texas-payne-arena-2027-05-15-8-pm/concert/18608854 | - |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | a-perfect-circle | verify (applied) | 18632533 | https://seatgeek.com/a-perfect-circle-tickets/nashville-tennessee-bridgestone-arena-2027-05-15-8-pm/concert/18632533 | - |
| tm-blondshell-2027-madison-vv1kvyvpc_ga55f1w | blondshell | verify (applied) | 18633499 | https://seatgeek.com/blondshell-tickets/madison-wisconsin-majestic-theatre-wi-2027-05-15-8-pm/concert/18633499 | - |
| tm-the-neighbourhood-2027-edmonton-1av7z_4gkl6qbrx | the-neighbourhood | verify (applied) | 18726928 | https://seatgeek.com/the-neighbourhood-tickets/edmonton-canada-rogers-place-2027-05-15-7-pm/concert/18726928 | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | too-many-zooz | verify (applied) | 18646948 | https://seatgeek.com/too-many-zooz-tickets/vancouver-canada-the-pearl-bc-2027-05-15-7-pm/concert/18646948 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | santana | verify (applied) | 18628836 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-15-7-pm/concert/18628836 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-ha-ash-2027-houston-g5diz_kkygldl | ha-ash | verify (applied) | 18608855 | https://seatgeek.com/ha-ash-tickets/houston-texas-713-music-hall-2027-05-16-8-pm/concert/18608855 | - |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | def-leppard | verify (applied) | 18662464 | https://seatgeek.com/def-leppard-tickets/edmonton-canada-rogers-place-2027-05-16-7-pm/concert/18662464 | - |
| tm-niall-horan-2027-denver-g5vzz_1lspoiu | niall-horan | verify (applied) | 18235553 | https://seatgeek.com/niall-horan-tickets/denver-colorado-ball-arena-2027-05-16-7-30-pm/concert/18235553 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | santana | verify (applied) | 18628837 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-16-7-pm/concert/18628837 | - |
| tm-blondshell-2027-detroit-vv1afzkfmgkdgjzny | blondshell | verify (applied) | 18633500 | https://seatgeek.com/blondshell-tickets/detroit-michigan-saint-andrews-hall-2027-05-17-6-pm/concert/18633500 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-hazlett-2027-kansas-city-vvg1bz_c1yj_ec | hazlett | verify (applied) | 18649797 | https://seatgeek.com/hazlett-tickets/kansas-city-missouri-madrid-theatre-1-2027-05-17-8-pm/concert/18649797 | - |
| tm-the-warning-2027-brooklyn-k7vgf_3iu7xhd | the-warning | verify (applied) | 18591270 | https://seatgeek.com/the-warning-tickets/brooklyn-new-york-brooklyn-paramount-2027-05-18-7-pm/concert/18591270 | - |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | carly-rae-jepsen | verify (applied) | 18639041 | https://seatgeek.com/carly-rae-jepsen-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-05-18-7-30-pm/concert/18639041 | - |
| tm-metallica-2027-el-paso-vvg1yz_3zjrn4d | metallica | verify (applied) | 18595088 | https://seatgeek.com/metallica-tickets/el-paso-texas-sun-bowl-stadium-2027-05-18-6-pm/concert/18595088 | - |
| tm-the-airborne-toxic-event-2027-charlotte-g5evz_1nj2twb | the-airborne-toxic-event | verify (applied) | 18252642 | https://seatgeek.com/the-airborne-toxic-event-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-05-18-8-pm/concert/18252642 | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | verify (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-niall-horan-2027-west-valley-city-g5vzz_1xafaiw | niall-horan | verify (applied) | 18235554 | https://seatgeek.com/niall-horan-tickets/west-valley-city-utah-maverik-center-2027-05-18-7-30-pm/concert/18235554 | - |
| tm-carly-rae-jepsen-2027-boston-vv177z_kgklscrut | carly-rae-jepsen | verify (applied) | 18639042 | https://seatgeek.com/carly-rae-jepsen-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-19-7-30-pm/concert/18639042 | - |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | ha-ash | verify (applied) | 18608856 | https://seatgeek.com/ha-ash-tickets/new-york-new-york-united-palace-theatre-2027-05-19-8-pm/concert/18608856 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | santana | verify (applied) | 18628843 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-19-7-pm/concert/18628843 | - |
| tm-the-airborne-toxic-event-2027-washington-17a8v0g61rlmtti | the-airborne-toxic-event | verify (applied) | 18251758 | https://seatgeek.com/the-airborne-toxic-event-tickets/washington-district-of-columbia-9-30-club-2027-05-20-7-pm/concert/18251758 | - |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | a-perfect-circle | verify (applied) | 18632537 | https://seatgeek.com/a-perfect-circle-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-20-7-30-pm/concert/18632537 | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | riley-green | verify (applied) | 18626525 | https://seatgeek.com/riley-green-tickets/tulsa-oklahoma-bok-center-2027-05-20-7-pm/concert/18626525 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | santana | verify (applied) | 18628844 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-20-7-pm/concert/18628844 | - |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | niall-horan | verify (applied) | 18235556 | https://seatgeek.com/niall-horan-tickets/phoenix-arizona-mortgage-matchup-center-2027-05-20-7-30-pm/concert/18235556 | - |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | the-airborne-toxic-event | verify (applied) | 18252225 | https://seatgeek.com/the-airborne-toxic-event-tickets/new-york-new-york-irving-plaza-2027-05-21-7-pm/concert/18252225 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | harry-styles | verify (applied) | 18579683 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-21-7-45-pm/concert/18579683 | - |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | ha-ash | verify (applied) | 18608857 | https://seatgeek.com/ha-ash-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-21-8-pm/concert/18608857 | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | fantasia | verify (applied) | 18629235 | https://seatgeek.com/fantasia-tickets/providence-rhode-island-amica-mutual-pavilion-2027-05-21-8-pm/concert/18629235 | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | riley-green | verify (applied) | 18626526 | https://seatgeek.com/riley-green-tickets/dallas-texas-dos-equis-pavilion-2027-05-21-7-pm/concert/18626526 | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | carly-rae-jepsen | verify (applied) | 18639045 | https://seatgeek.com/carly-rae-jepsen-tickets/chicago-illinois-the-chicago-theatre-2027-05-21-7-30-pm/concert/18639045 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | kenny-chesney | verify (applied) | 18591994 | https://seatgeek.com/kenny-chesney-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-05-22-4-30-pm/concert/18591994 | - |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | metallica | verify (applied) | 18595099 | https://seatgeek.com/metallica-tickets/san-antonio-texas-alamodome-2027-05-22-6-pm/concert/18595099 | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | carly-rae-jepsen | verify (applied) | 18639046 | https://seatgeek.com/carly-rae-jepsen-tickets/detroit-michigan-fox-theatre-detroit-2027-05-22-7-30-pm/concert/18639046 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | harry-styles | verify (applied) | 18579676 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-22-7-45-pm/concert/18579676 | - |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | ha-ash | verify (applied) | 18608864 | https://seatgeek.com/ha-ash-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-05-22-8-pm/concert/18608864 | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | fantasia | verify (applied) | 18629280 | https://seatgeek.com/fantasia-tickets/newark-new-jersey-prudential-center-2027-05-22-8-pm/concert/18629280 | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | riley-green | verify (applied) | 18626529 | https://seatgeek.com/riley-green-tickets/lafayette-louisiana-cajundome-2027-05-22-7-pm/concert/18626529 | - |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | the-airborne-toxic-event | verify (applied) | 18252179 | https://seatgeek.com/the-airborne-toxic-event-tickets/boston-massachusetts-orpheum-theatre-boston-2027-05-22-8-pm/concert/18252179 | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | a-perfect-circle | verify (applied) | 18632538 | https://seatgeek.com/a-perfect-circle-tickets/chicago-illinois-wintrust-arena-2027-05-22-8-pm/concert/18632538 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | santana | verify (applied) | 18628845 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-22-7-pm/concert/18628845 | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | niall-horan | verify (applied) | 18235557 | https://seatgeek.com/niall-horan-tickets/inglewood-california-kia-forum-2027-05-22-7-30-pm/concert/18235557 | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | the-warning | verify (applied) | 18591764 | https://seatgeek.com/the-warning-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-23-8-pm/concert/18591764 | - |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | a-perfect-circle | verify (applied) | 18632539 | https://seatgeek.com/a-perfect-circle-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-23-7-pm/concert/18632539 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | santana | verify (applied) | 18628846 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-23-7-pm/concert/18628846 | - |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | the-airborne-toxic-event | verify (applied) | 18251603 | https://seatgeek.com/the-airborne-toxic-event-tickets/cleveland-ohio-house-of-blues-cleveland-2027-05-24-7-pm/concert/18251603 | - |
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | two-door-cinema-club | verify (applied) | 18711341 | https://seatgeek.com/two-door-cinema-club-tickets/del-mar-california-the-sound-del-mar-2027-05-24-7-30-pm/concert/18711341 | - |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | carly-rae-jepsen | verify (applied) | 18639055 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-25-7-30-pm/concert/18639055 | - |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | the-airborne-toxic-event | verify (applied) | 18251734 | https://seatgeek.com/the-airborne-toxic-event-tickets/detroit-michigan-saint-andrews-hall-2027-05-25-7-pm/concert/18251734 | - |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | zach-bryan | verify (applied) | 18686630 | https://seatgeek.com/zach-bryan-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-05-25-7-pm/concert/18686630 | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | niall-horan | verify (applied) | 18235559 | https://seatgeek.com/niall-horan-tickets/san-francisco-california-chase-center-2027-05-25-7-30-pm/concert/18235559 | - |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | hazlett | verify (applied) | 18311990 | https://seatgeek.com/hazlett-tickets/seattle-washington-neptune-theatre-wa-2027-05-25-8-pm/concert/18311990 | - |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | carly-rae-jepsen | verify (applied) | 18657110 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-26-6-30-pm/concert/18657110 | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | metallica | verify (applied) | 18595089 | https://seatgeek.com/metallica-tickets/fayetteville-arkansas-razorback-stadium-2027-05-26-6-pm/concert/18595089 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | hazlett | verify (applied) | 18388253 | https://seatgeek.com/hazlett-tickets/vancouver-canada-commodore-ballroom-2027-05-26-7-pm/concert/18388253 | - |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | the-airborne-toxic-event | verify (applied) | 18252640 | https://seatgeek.com/the-airborne-toxic-event-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-05-27-7-pm/concert/18252640 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | fkj | verify (applied) | 18281838 | https://seatgeek.com/fkj-tickets/chicago-illinois-the-salt-shed-outdoors-2027-05-27-8-pm/concert/18281838 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | niall-horan | verify (applied) | 18235558 | https://seatgeek.com/niall-horan-tickets/seattle-washington-climate-pledge-arena-2027-05-27-7-30-pm/concert/18235558 | - |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | carly-rae-jepsen | verify (applied) | 18639058 | https://seatgeek.com/carly-rae-jepsen-tickets/ottawa-canada-history-ottawa-2027-05-28-7-30-pm/concert/18639058 | - |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | fkj | verify (applied) | 18281790 | https://seatgeek.com/fkj-tickets/toronto-canada-history-2027-05-28-8-pm/concert/18281790 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | harry-styles | verify (applied) | 18579673 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-28-7-45-pm/concert/18579673 | - |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | a-perfect-circle | verify (applied) | 18632545 | https://seatgeek.com/a-perfect-circle-tickets/west-valley-city-utah-maverik-center-2027-05-28-7-30-pm/concert/18632545 | - |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | kenny-chesney | verify (applied) | 18591992 | https://seatgeek.com/kenny-chesney-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-29-4-30-pm/concert/18591992 | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | luke-combs | verify (applied) | 18493413 | https://seatgeek.com/luke-combs-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-05-29-5-20-pm/concert/18493413 | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | metallica | verify (applied) | 18595091 | https://seatgeek.com/metallica-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-29-6-pm/concert/18595091 | - |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | zach-bryan | verify (applied) | 18686629 | https://seatgeek.com/zach-bryan-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-29-7-pm/concert/18686629 | - |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | carly-rae-jepsen | verify (applied) | 18639059 | https://seatgeek.com/carly-rae-jepsen-tickets/montreal-canada-mtelus-2027-05-29-7-30-pm/concert/18639059 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | harry-styles | verify (applied) | 18579687 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-29-7-45-pm/concert/18579687 | - |
| tm-flans-2027-houston-g5diz_k6-kevr | flans | verify (applied) | 18612653 | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | niall-horan | verify (applied) | 18235566 | https://seatgeek.com/niall-horan-tickets/vancouver-canada-rogers-arena-2027-05-29-7-30-pm/concert/18235566 | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | flans | verify (applied) | 18613121 | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 | - |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | a-perfect-circle | verify (applied) | 18632547 | https://seatgeek.com/a-perfect-circle-tickets/seattle-washington-climate-pledge-arena-2027-05-30-7-30-pm/concert/18632547 | - |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | fkj | verify (applied) | 18281480 | https://seatgeek.com/fkj-tickets/montreal-canada-mtelus-2027-05-31-8-pm/concert/18281480 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | harry-styles | verify (applied) | 18593728 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-31-7-45-pm/concert/18593728 | - |
| tm-fkj-2027-boston-vvg17z_5ryet2j | fkj | verify (applied) | 18281797 | https://seatgeek.com/fkj-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-06-01-8-pm/concert/18281797 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | a-perfect-circle | verify (applied) | 18632548 | https://seatgeek.com/a-perfect-circle-tickets/portland-oregon-veterans-memorial-coliseum-2-2027-06-01-7-30-pm/concert/18632548 | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | hazlett | verify (applied) | 18311898 | https://seatgeek.com/hazlett-tickets/san-francisco-california-august-hall-2027-06-01-8-pm/concert/18311898 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | zach-bryan | verify (applied) | 18686638 | https://seatgeek.com/zach-bryan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-02-7-pm/concert/18686638 | - |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | tommy-emmanuel | verify (applied) | 18703617 | https://seatgeek.com/tommy-emmanuel-tickets/virginia-beach-virginia-sandler-center-for-the-performing-arts-2027-06-02-7-30-pm/concert/18703617 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | fkj | verify (applied) | 18281671 | https://seatgeek.com/fkj-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-06-03-8-pm/concert/18281671 | - |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | riley-green | verify (applied) | 18626534 | https://seatgeek.com/riley-green-tickets/brandon-mississippi-brandon-amphitheater-2027-06-03-7-pm/concert/18626534 | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | def-leppard | verify (applied) | 18662428 | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 | - |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | the-airborne-toxic-event | verify (applied) | 18251596 | https://seatgeek.com/the-airborne-toxic-event-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-06-03-7-pm/concert/18251596 | - |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | a-perfect-circle | verify (applied) | 18632549 | https://seatgeek.com/a-perfect-circle-tickets/reno-nevada-grand-sierra-resort-2027-06-03-8-pm/concert/18632549 | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | flans | verify (applied) | 18612662 | https://seatgeek.com/flans-tickets/san-jose-california-san-jose-civic-2027-06-03-8-pm/concert/18612662 | - |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | fkj | verify (applied) | 18281667 | https://seatgeek.com/fkj-tickets/brooklyn-new-york-brooklyn-paramount-2027-06-04-8-pm/concert/18281667 | - |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | riley-green | verify (applied) | 18626535 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-04-7-pm/concert/18626535 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | harry-styles | verify (applied) | 18592375 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-04-7-45-pm/concert/18592375 | - |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | a-perfect-circle | verify (applied) | 18632551 | https://seatgeek.com/a-perfect-circle-tickets/daly-city-california-cow-palace-daly-city-2027-06-04-7-pm/concert/18632551 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | kenny-chesney | verify (applied) | 18591993 | https://seatgeek.com/kenny-chesney-tickets/ames-iowa-midamerican-energy-field-at-jack-trice-stadium-2027-06-05-4-30-pm/concert/18591993 | - |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | metallica | verify (applied) | 18595098 | https://seatgeek.com/metallica-tickets/indianapolis-indiana-lucas-oil-stadium-2027-06-05-6-pm/concert/18595098 | - |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | luke-combs | verify (applied) | 18493415 | https://seatgeek.com/luke-combs-tickets/vancouver-canada-bc-place-stadium-2027-06-05-5-20-pm/concert/18493415 | - |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | riley-green | verify (applied) | 18638997 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-05-7-pm/concert/18638997 | - |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | def-leppard | verify (applied) | 18662432 | https://seatgeek.com/def-leppard-tickets/milwaukee-wisconsin-fiserv-forum-2027-06-05-7-pm/concert/18662432 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | harry-styles | verify (applied) | 18592376 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-05-7-45-pm/concert/18592376 | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | the-airborne-toxic-event | verify (applied) | 18408894 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-diego-california-humphreys-concerts-by-the-bay-2027-06-05-7-30-pm/concert/18408894 | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | hazlett | verify (applied) | 18312174 | https://seatgeek.com/hazlett-tickets/phoenix-arizona-the-van-buren-2027-06-05-8-pm/concert/18312174 | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | the-airborne-toxic-event | verify (applied) | 18252665 | https://seatgeek.com/the-airborne-toxic-event-tickets/phoenix-arizona-the-van-buren-2027-06-06-7-30-pm/concert/18252665 | - |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | fkj | verify (applied) | 18281742 | https://seatgeek.com/fkj-tickets/washington-district-of-columbia-the-anthem-dc-2027-06-07-7-30-pm/concert/18281742 | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | def-leppard | verify (applied) | 18662434 | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 | - |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | metallica | verify (applied) | 18595100 | https://seatgeek.com/metallica-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-08-6-pm/concert/18595100 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | a-perfect-circle | verify (applied) | 18632556 | https://seatgeek.com/a-perfect-circle-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-06-08-8-pm/concert/18632556 | - |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | def-leppard | verify (applied) | 18662436 | https://seatgeek.com/def-leppard-tickets/louisville-kentucky-kfc-yum-center-2027-06-09-7-pm/concert/18662436 | - |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | fkj | verify (applied) | 18281290 | https://seatgeek.com/fkj-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-06-09-8-pm/concert/18281290 | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | the-airborne-toxic-event | verify (applied) | 18252184 | https://seatgeek.com/the-airborne-toxic-event-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-06-09-7-pm/concert/18252184 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | a-perfect-circle | verify (applied) | 18632558 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-10-8-pm/concert/18632558 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | riley-green | verify (applied) | 18626560 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-11-7-pm/concert/18626560 | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | def-leppard | verify (applied) | 18662435 | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 | - |
| tm-fkj-2027-houston-g5diz_5msvufk | fkj | verify (applied) | 18281428 | https://seatgeek.com/fkj-tickets/houston-texas-bayou-music-center-2027-06-11-8-pm/concert/18281428 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | a-perfect-circle | verify (applied) | 18632560 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-11-8-pm/concert/18632560 | - |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | kenny-chesney | verify (applied) | 18591995 | https://seatgeek.com/kenny-chesney-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-06-12-4-30-pm/concert/18591995 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | riley-green | verify (applied) | 18638999 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-12-7-pm/concert/18638999 | - |
| tm-hazlett-2027-austin-g5diz_kepkpyq | hazlett | verify (applied) | 18311909 | https://seatgeek.com/hazlett-tickets/austin-texas-scoot-inn-2027-06-12-7-pm/concert/18311909 | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | luke-combs | verify (applied) | 18493400 | https://seatgeek.com/luke-combs-tickets/boise-idaho-albertsons-stadium-2027-06-12-5-45-pm/concert/18493400 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | def-leppard | verify (applied) | 18662437 | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | a-perfect-circle | verify (applied) | 18632561 | https://seatgeek.com/a-perfect-circle-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-06-13-7-30-pm/concert/18632561 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | fkj | verify (applied) | 18281495 | https://seatgeek.com/fkj-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-06-14-8-pm/concert/18281495 | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | metallica | verify (applied) | 18595103 | https://seatgeek.com/metallica-tickets/cleveland-ohio-huntington-bank-field-2027-06-15-6-pm/concert/18595103 | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | the-airborne-toxic-event | verify (applied) | 18252158 | https://seatgeek.com/the-airborne-toxic-event-tickets/sacramento-california-ace-of-spades-2027-06-15-7-pm/concert/18252158 | - |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | lizzy-mcalpine | verify (applied) | 18619440 | https://seatgeek.com/lizzy-mcalpine-tickets/nashville-tennessee-bridgestone-arena-2027-06-16-7-pm/concert/18619440 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | def-leppard | verify (applied) | 18662442 | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | the-airborne-toxic-event | verify (applied) | 18251563 | https://seatgeek.com/the-airborne-toxic-event-tickets/los-angeles-california-the-wiltern-2027-06-17-7-pm/concert/18251563 | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | lizzy-mcalpine | verify (applied) | 18619442 | https://seatgeek.com/lizzy-mcalpine-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-18-7-pm/concert/18619442 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | riley-green | verify (applied) | 18626536 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-18-7-pm/concert/18626536 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | kenny-chesney | verify (applied) | 18592002 | https://seatgeek.com/kenny-chesney-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-19-4-30-pm/concert/18592002 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | riley-green | verify (applied) | 18639001 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-19-7-pm/concert/18639001 | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | def-leppard | verify (applied) | 18662443 | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 | - |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | luke-combs | verify (applied) | 18493411 | https://seatgeek.com/luke-combs-tickets/denver-colorado-empower-field-at-mile-high-2027-06-19-5-45-pm/concert/18493411 | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | metallica | verify (applied) | 18595107 | https://seatgeek.com/metallica-tickets/salt-lake-city-utah-rice-eccles-stadium-2027-06-19-6-pm/concert/18595107 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | lizzy-mcalpine | verify (applied) | 18619443 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-20-7-pm/concert/18619443 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | lizzy-mcalpine | verify (applied) | 18637280 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-21-7-pm/concert/18637280 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | def-leppard | verify (applied) | 18662446 | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | lizzy-mcalpine | verify (applied) | 18619444 | https://seatgeek.com/lizzy-mcalpine-tickets/new-york-new-york-madison-square-garden-2027-06-24-7-pm/concert/18619444 | - |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | riley-green | verify (applied) | 18626537 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-25-7-pm/concert/18626537 | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | lizzy-mcalpine | verify (applied) | 18619445 | https://seatgeek.com/lizzy-mcalpine-tickets/columbia-maryland-merriweather-post-pavilion-2027-06-25-7-pm/concert/18619445 | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | def-leppard | verify (applied) | 18662447 | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 | - |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | yacht-rock-revue | verify (applied) | 18587856 | https://seatgeek.com/yacht-rock-revue-tickets/chicago-illinois-the-salt-shed-outdoors-2027-06-25-6-30-pm/concert/18587856 | - |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | zac-brown-band | verify (applied) | 18571701 | https://seatgeek.com/zac-brown-band-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-06-25-7-pm/concert/18571701 | - |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | riley-green | verify (applied) | 18639003 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-26-7-pm/concert/18639003 | - |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | kenny-chesney | verify (applied) | 18592003 | https://seatgeek.com/kenny-chesney-tickets/chicago-illinois-soldier-field-2027-06-26-4-30-pm/concert/18592003 | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | luke-combs | verify (applied) | 18493412 | https://seatgeek.com/luke-combs-tickets/san-diego-california-petco-park-2027-06-26-5-45-pm/concert/18493412 | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | lizzy-mcalpine | verify (applied) | 18619449 | https://seatgeek.com/lizzy-mcalpine-tickets/toronto-canada-scotiabank-arena-2027-06-27-7-pm/concert/18619449 | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | def-leppard | verify (applied) | 18662449 | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 | - |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | lizzy-mcalpine | verify (applied) | 18619452 | https://seatgeek.com/lizzy-mcalpine-tickets/chicago-illinois-united-center-2027-06-29-7-pm/concert/18619452 | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | def-leppard | verify (applied) | 18662452 | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | def-leppard | verify (applied) | 18662454 | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | lizzy-mcalpine | verify (applied) | 18619454 | https://seatgeek.com/lizzy-mcalpine-tickets/austin-texas-moody-center-atx-2027-07-02-7-pm/concert/18619454 | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | greta-van-fleet | verify (applied) | 18642001 | https://seatgeek.com/greta-van-fleet-tickets/vancouver-canada-rogers-arena-2027-07-05-7-pm/concert/18642001 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | greta-van-fleet | verify (applied) | 18642002 | https://seatgeek.com/greta-van-fleet-tickets/edmonton-canada-rogers-place-2027-07-07-7-pm/concert/18642002 | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | greta-van-fleet | verify (applied) | 18642003 | https://seatgeek.com/greta-van-fleet-tickets/calgary-canada-scotiabank-saddledome-2027-07-08-7-pm/concert/18642003 | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | lizzy-mcalpine | verify (applied) | 18619456 | https://seatgeek.com/lizzy-mcalpine-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2027-07-09-6-30-pm/concert/18619456 | - |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | kenny-chesney | verify (applied) | 18592004 | https://seatgeek.com/kenny-chesney-tickets/milwaukee-wisconsin-american-family-field-2027-07-10-4-30-pm/concert/18592004 | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | greta-van-fleet | verify (applied) | 18642007 | https://seatgeek.com/greta-van-fleet-tickets/winnipeg-canada-canada-life-centre-2027-07-10-7-pm/concert/18642007 | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | lizzy-mcalpine | verify (applied) | 18619461 | https://seatgeek.com/lizzy-mcalpine-tickets/los-angeles-california-forum-23-2027-07-10-7-pm/concert/18619461 | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | lizzy-mcalpine | verify (applied) | 18619460 | https://seatgeek.com/lizzy-mcalpine-tickets/san-francisco-california-chase-center-2027-07-13-7-pm/concert/18619460 | - |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | bon-jovi | verify (applied) | 18696568 | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 | - |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | riley-green | verify (applied) | 18626571 | https://seatgeek.com/riley-green-tickets/syracuse-new-york-empower-fcu-amphitheater-at-lakeview-2027-07-15-7-pm/concert/18626571 | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | lizzy-mcalpine | verify (applied) | 18619462 | https://seatgeek.com/lizzy-mcalpine-tickets/portland-oregon-moda-center-2027-07-15-7-pm/concert/18619462 | - |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | slipknot | verify (applied) | 18626597 | https://seatgeek.com/slipknot-tickets/washington-district-of-columbia-nationals-park-2027-07-16-6-30-pm/concert/18626597 | - |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | greta-van-fleet | verify (applied) | 18642013 | https://seatgeek.com/greta-van-fleet-tickets/columbus-ohio-nationwide-arena-2027-07-16-7-pm/concert/18642013 | - |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | riley-green | verify (applied) | 18626541 | https://seatgeek.com/riley-green-tickets/allentown-pennsylvania-ppl-center-2027-07-16-7-pm/concert/18626541 | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | leon-bridges | verify (applied) | 18662695 | https://seatgeek.com/leon-bridges-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-07-16-7-30-pm/concert/18662695 | - |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | kenny-chesney | verify (applied) | 18592005 | https://seatgeek.com/kenny-chesney-tickets/denver-colorado-empower-field-at-mile-high-2027-07-17-4-30-pm/concert/18592005 | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | greta-van-fleet | verify (applied) | 18642015 | https://seatgeek.com/greta-van-fleet-tickets/noblesville-indiana-ruoff-music-center-2027-07-17-7-pm/concert/18642015 | - |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | leon-bridges | verify (applied) | 18662694 | https://seatgeek.com/leon-bridges-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-07-17-8-pm/concert/18662694 | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | lizzy-mcalpine | verify (applied) | 18619466 | https://seatgeek.com/lizzy-mcalpine-tickets/seattle-washington-climate-pledge-arena-2027-07-17-7-pm/concert/18619466 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | greta-van-fleet | verify (applied) | 18642014 | https://seatgeek.com/greta-van-fleet-tickets/raleigh-north-carolina-lenovo-center-2027-07-20-7-pm/concert/18642014 | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | zach-bryan | verify (applied) | 18686642 | https://seatgeek.com/zach-bryan-tickets/inglewood-california-sofi-stadium-2027-07-20-7-pm/concert/18686642 | - |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | slipknot | verify (applied) | 18626589 | https://seatgeek.com/slipknot-tickets/montreal-canada-parc-jean-drapeau-2027-07-21-6-30-pm/concert/18626589 | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | greta-van-fleet | verify (applied) | 18642019 | https://seatgeek.com/greta-van-fleet-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-21-7-pm/concert/18642019 | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | leon-bridges | verify (applied) | 18662705 | https://seatgeek.com/leon-bridges-tickets/wilmington-north-carolina-live-oak-bank-pavilion-2027-07-21-7-pm/concert/18662705 | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | bon-jovi | verify (applied) | 18696570 | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | riley-green | verify (applied) | 18626543 | https://seatgeek.com/riley-green-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-22-7-pm/concert/18626543 | - |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | slipknot | verify (applied) | 18626595 | https://seatgeek.com/slipknot-tickets/toronto-canada-rogers-stadium-toronto-2027-07-23-6-30-pm/concert/18626595 | - |
| tm-the-red-clay-strays-2027-bangor-vv1f7z_kqaonzdc55 | the-red-clay-strays | verify (applied) | 18639094 | https://seatgeek.com/the-red-clay-strays-tickets/bangor-maine-maine-savings-amphitheater-2027-07-23-7-pm/concert/18639094 | - |
| tm-greta-van-fleet-2027-hershey-vv17fz_kgkdofs3p | greta-van-fleet | verify (applied) | 18642020 | https://seatgeek.com/greta-van-fleet-tickets/hershey-pennsylvania-giant-center-2027-07-23-7-pm/concert/18642020 | - |
| tm-riley-green-2027-bethel-k7vgf_kkxvsto | riley-green | verify (applied) | 18626545 | https://seatgeek.com/riley-green-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-23-7-pm/concert/18626545 | - |
| tm-leon-bridges-2027-columbia-1avfz_fqmqezd586 | leon-bridges | verify (applied) | 18662706 | https://seatgeek.com/leon-bridges-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-23-7-pm/concert/18662706 | - |
| tm-kenny-chesney-2027-kansas-city-vv1akzkfxgkdkijos | kenny-chesney | verify (applied) | 18592006 | https://seatgeek.com/kenny-chesney-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-07-24-4-30-pm/concert/18592006 | - |
| tm-the-red-clay-strays-2027-gilford-vv177z_kgklli63o | the-red-clay-strays | verify (applied) | 18639095 | https://seatgeek.com/the-red-clay-strays-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-24-7-pm/concert/18639095 | - |
| tm-greta-van-fleet-2027-uncasville-g5vvz_kwzs711 | greta-van-fleet | verify (applied) | 18642023 | https://seatgeek.com/greta-van-fleet-tickets/uncasville-connecticut-mohegan-sun-arena-2027-07-24-7-pm/concert/18642023 | - |
| tm-riley-green-2027-mansfield-vv1avzkfwgke0hynm | riley-green | verify (applied) | 18626547 | https://seatgeek.com/riley-green-tickets/mansfield-massachusetts-xfinity-center-ma-2027-07-24-7-pm/concert/18626547 | - |
| tm-leon-bridges-2027-boston-vv177z_kgkikdrri | leon-bridges | verify (applied) | 18662708 | https://seatgeek.com/leon-bridges-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-07-24-8-pm/concert/18662708 | - |
| tm-zach-bryan-2027-seattle-vvg1hz_fytloed | zach-bryan | verify (applied) | 18686643 | https://seatgeek.com/zach-bryan-tickets/seattle-washington-lumen-field-2027-07-24-7-pm/concert/18686643 | - |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | slipknot | verify (applied) | 18626573 | https://seatgeek.com/slipknot-tickets/chicago-illinois-soldier-field-2027-07-25-6-30-pm/concert/18626573 | - |
| tm-greta-van-fleet-2027-gilford-vv177z_kgkni4das | greta-van-fleet | verify (applied) | 18642025 | https://seatgeek.com/greta-van-fleet-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-26-7-pm/concert/18642025 | - |
| tm-zach-bryan-2027-vancouver-1k78vp4fgacgpjm | zach-bryan | verify (applied) | 18711212 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-27-7-pm/concert/18711212 | - |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | slipknot | verify (applied) | 18626575 | https://seatgeek.com/slipknot-tickets/hershey-pennsylvania-hersheypark-stadium-2027-07-28-6-30-pm/concert/18626575 | - |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | bon-jovi | verify (applied) | 18696567 | https://seatgeek.com/bon-jovi-tickets/foxborough-massachusetts-gillette-stadium-2027-07-28-7-pm/concert/18696567 | - |
| tm-greta-van-fleet-2027-laval-1ad7z_kgksakup4 | greta-van-fleet | verify (applied) | 18642026 | https://seatgeek.com/greta-van-fleet-tickets/laval-canada-place-bell-2027-07-28-7-pm/concert/18642026 | - |
| tm-leon-bridges-2027-philadelphia-vv17fz_kgkbngqe2 | leon-bridges | verify (applied) | 18662710 | https://seatgeek.com/leon-bridges-tickets/philadelphia-pennsylvania-td-pavilion-at-the-mann-center-2027-07-28-7-30-pm/concert/18662710 | - |
| tm-zach-bryan-2027-vancouver-1av7z_fgks885w5 | zach-bryan | verify (applied) | 18686647 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-28-7-pm/concert/18686647 | - |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | the-red-clay-strays | verify (applied) | 18639096 | https://seatgeek.com/the-red-clay-strays-tickets/canandaigua-new-york-constellation-brands-marvin-sands-performing-arts-center-cmac-2027-07-29-7-pm/concert/18639096 | - |
| tm-greta-van-fleet-2027-toronto-1avzz_kgkswyehx | greta-van-fleet | verify (applied) | 18642028 | https://seatgeek.com/greta-van-fleet-tickets/toronto-canada-rbc-amphitheatre-2027-07-29-7-pm/concert/18642028 | - |
| tm-riley-green-2027-evansville-vv16azkfwxpza8acgv | riley-green | verify (applied) | 18626548 | https://seatgeek.com/riley-green-tickets/evansville-indiana-ford-center-in-2027-07-29-7-pm/concert/18626548 | - |
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | riley-green | verify (applied) | 18626549 | https://seatgeek.com/riley-green-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2027-07-30-7-pm/concert/18626549 | - |
| tm-kenny-chesney-2027-atlanta-vvg1zz_3x03by9 | kenny-chesney | verify (applied) | 18592008 | https://seatgeek.com/kenny-chesney-tickets/atlanta-georgia-mercedes-benz-stadium-2027-07-31-4-30-pm/concert/18592008 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | the-red-clay-strays | verify (applied) | 18639097 | https://seatgeek.com/the-red-clay-strays-tickets/clarkston-michigan-pine-knob-music-theatre-2027-07-31-7-pm/concert/18639097 | - |
| tm-greta-van-fleet-2027-grand-rapids-vv17oz_kgkwlsfog | greta-van-fleet | verify (applied) | 18642031 | https://seatgeek.com/greta-van-fleet-tickets/grand-rapids-acrisure-amphitheater-2027-07-31-7-pm/concert/18642031 | - |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | riley-green | verify (applied) | 18626554 | https://seatgeek.com/riley-green-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-31-7-pm/concert/18626554 | - |
| tm-zach-bryan-2027-edmonton-16v7z_43bg7l9tm | zach-bryan | verify (applied) | 18711213 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-07-31-6-30-pm/concert/18711213 | - |
| tm-zach-bryan-2027-edmonton-1av7z_fgkw2fvlh | zach-bryan | verify (applied) | 18686646 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-08-01-6-30-pm/concert/18686646 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | bon-jovi | verify (applied) | 18696569 | https://seatgeek.com/bon-jovi-tickets/toronto-canada-rogers-stadium-toronto-2027-08-04-6-30-pm/concert/18696569 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-sienna-spiro-2027-austin-g5diz_47ytekn | sienna-spiro | verify (applied) | 18702006 | https://seatgeek.com/sienna-spiro-tickets/austin-texas-moody-amphitheater-2027-08-05-7-pm/concert/18702006 | - |
| tm-slipknot-2027-houston-g5diz_kx0z68q | slipknot | verify (applied) | 18626578 | https://seatgeek.com/slipknot-tickets/houston-texas-daikin-park-2027-08-06-6-30-pm/concert/18626578 | - |
| tm-kenny-chesney-2027-east-rutherford-k7vgf_3cwtd0z | kenny-chesney | verify (applied) | 18592014 | https://seatgeek.com/kenny-chesney-tickets/east-rutherford-new-jersey-metlife-stadium-2027-08-07-4-30-pm/concert/18592014 | - |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | slipknot | verify (applied) | 18626584 | https://seatgeek.com/slipknot-tickets/commerce-city-colorado-dick-s-sporting-goods-park-2027-08-09-6-30-pm/concert/18626584 | - |
| tm-oasis-2027-foxborough-vv1avzkftgkehnj-e | oasis | verify (applied) | 18589077 | https://seatgeek.com/oasis-tickets/foxborough-massachusetts-gillette-stadium-2027-08-10-7-pm/concert/18589077 | - |
| tm-sienna-spiro-2027-washington-1avfz_fgksa-bdm | sienna-spiro | verify (applied) | 18702008 | https://seatgeek.com/sienna-spiro-tickets/washington-district-of-columbia-the-anthem-dc-2027-08-12-7-pm/concert/18702008 | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | the-red-clay-strays | verify (applied) | 18639104 | https://seatgeek.com/the-red-clay-strays-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-08-12-7-pm/concert/18639104 | - |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | leon-bridges | verify (applied) | 18662714 | https://seatgeek.com/leon-bridges-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-12-7-pm/concert/18662714 | - |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | slipknot | verify (applied) | 18626585 | https://seatgeek.com/slipknot-tickets/inglewood-california-sofi-stadium-2027-08-13-6-30-pm/concert/18626585 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-kenny-chesney-2027-detroit-vv17oz_8gkmnwpji | kenny-chesney | verify (applied) | 18592016 | https://seatgeek.com/kenny-chesney-tickets/detroit-michigan-ford-field-2027-08-14-4-30-pm/concert/18592016 | - |
| tm-sienna-spiro-2027-philadelphia-vv17fz_fgkuhzdr4 | sienna-spiro | verify (applied) | 18702017 | https://seatgeek.com/sienna-spiro-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-08-14-7-pm/concert/18702017 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-sienna-spiro-2027-boston-vv177z_fgkd_e0km | sienna-spiro | verify (applied) | 18702018 | https://seatgeek.com/sienna-spiro-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-08-15-7-pm/concert/18702018 | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46da3nv | sienna-spiro | verify (applied) | 18702019 | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-radio-city-music-hall-2027-08-17-8-pm/concert/18702019 | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | leon-bridges | verify (applied) | 18662721 | https://seatgeek.com/leon-bridges-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-08-17-7-30-pm/concert/18662721 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46d6wnd | sienna-spiro | verify (applied) | 18703816 | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-radio-city-music-hall-2027-08-18-8-pm/concert/18703816 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | leon-bridges | verify (applied) | 18662723 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-18-7-30-pm/concert/18662723 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | leon-bridges | verify (applied) | 18662724 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-19-7-30-pm/concert/18662724 | - |
| tm-kenny-chesney-2027-charlotte-g5evz_3c19bfo | kenny-chesney | verify (applied) | 18592015 | https://seatgeek.com/kenny-chesney-tickets/charlotte-north-carolina-bank-of-america-stadium-2027-08-21-4-30-pm/concert/18592015 | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | the-red-clay-strays | verify (applied) | 18639110 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-21-6-30-pm/concert/18639110 | - |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | leon-bridges | verify (applied) | 18662725 | https://seatgeek.com/leon-bridges-tickets/bonner-montana-kettlehouse-amphitheater-2027-08-21-8-pm/concert/18662725 | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | the-red-clay-strays | verify (applied) | 18639113 | https://seatgeek.com/the-red-clay-strays-tickets/boise-idaho-extramile-arena-2027-08-22-7-pm/concert/18639113 | - |
| tm-sienna-spiro-2027-detroit-vv1afzk48gkebo40x | sienna-spiro | verify (applied) | 18702024 | https://seatgeek.com/sienna-spiro-tickets/detroit-michigan-fox-theatre-detroit-2027-08-23-7-pm/concert/18702024 | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlgu6j | sienna-spiro | verify (applied) | 18702029 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-the-chicago-theatre-2027-08-25-7-pm/concert/18702029 | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | leon-bridges | verify (applied) | 18662729 | https://seatgeek.com/leon-bridges-tickets/waukee-iowa-vibrant-music-hall-2027-08-25-7-30-pm/concert/18662729 | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | leon-bridges | verify (applied) | 18662730 | https://seatgeek.com/leon-bridges-tickets/indianapolis-indiana-everwise-amphitheater-at-white-river-state-park-2027-08-26-7-30-pm/concert/18662730 | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlcj6o | sienna-spiro | verify (applied) | 18702030 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-the-chicago-theatre-2027-08-26-7-pm/concert/18702030 | - |
| tm-kenny-chesney-2027-foxborough-vv1avzkfxgkdu8gfo | kenny-chesney | verify (applied) | 18592017 | https://seatgeek.com/kenny-chesney-tickets/foxborough-massachusetts-gillette-stadium-2027-08-28-4-30-pm/concert/18592017 | - |
| tm-sienna-spiro-2027-minneapolis-vv17bz_fgktexhi7 | sienna-spiro | verify (applied) | 18702033 | https://seatgeek.com/sienna-spiro-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-08-28-7-pm/concert/18702033 | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | verify (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-sienna-spiro-2027-seattle-vvg1hz_4ediyof | sienna-spiro | verify (applied) | 18702035 | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-wamu-theater-2027-09-02-7-pm/concert/18702035 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-sienna-spiro-2027-vancouver-1av7z_fgkxqzaez | sienna-spiro | verify (applied) | 18702036 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-09-04-7-pm/concert/18702036 | - |
| tm-sienna-spiro-2027-berkeley-g5vyz_fbwbrn7 | sienna-spiro | verify (applied) | 18702041 | https://seatgeek.com/sienna-spiro-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-09-07-7-pm/concert/18702041 | - |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | the-red-clay-strays | verify (applied) | 18639117 | https://seatgeek.com/the-red-clay-strays-tickets/rogers-arkansas-walmart-amp-2027-09-09-7-pm/concert/18639117 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | leon-bridges | verify (applied) | 18662733 | https://seatgeek.com/leon-bridges-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-09-15-7-30-pm/concert/18662733 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | leon-bridges | verify (applied) | 18662735 | https://seatgeek.com/leon-bridges-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-09-17-7-30-pm/concert/18662735 | - |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | the-red-clay-strays | verify (applied) | 18639123 | https://seatgeek.com/the-red-clay-strays-tickets/corpus-christi-texas-hilliard-center-arena-2027-09-18-7-pm/concert/18639123 | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | the-red-clay-strays | verify (applied) | 18639125 | https://seatgeek.com/the-red-clay-strays-tickets/austin-texas-moody-center-atx-2027-09-19-7-pm/concert/18639125 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-leon-bridges-2027-rogers-g5viz_kpps1qm | leon-bridges | verify (applied) | 18662739 | https://seatgeek.com/leon-bridges-tickets/rogers-arkansas-walmart-amp-2027-09-23-7-30-pm/concert/18662739 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | eros-ramazzotti | verify (applied) | 17481793 | https://seatgeek.com/eros-ramazzotti-tickets/toronto-canada-coca-cola-coliseum-2027-09-24-8-pm/concert/17481793 | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | fontaines-d-c | verify (applied) | 18642838 | https://seatgeek.com/fontaines-d-c-tickets/toronto-canada-scotiabank-arena-2027-09-26-8-pm/concert/18642838 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-leon-bridges-2027-phoenix-1a_zk4kgkdlzjqa | leon-bridges | verify (applied) | 18662746 | https://seatgeek.com/leon-bridges-tickets/phoenix-arizona-arizona-financial-theatre-2027-09-29-7-30-pm/concert/18662746 | - |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | fontaines-d-c | verify (applied) | 18642843 | https://seatgeek.com/fontaines-d-c-tickets/columbia-maryland-merriweather-post-pavilion-2027-09-30-7-30-pm/concert/18642843 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-hilary-duff-2027-orlando-1axzkfugkdwff3y | hilary-duff | verify (applied) | 18613393 | https://seatgeek.com/hilary-duff-tickets/orlando-florida-kia-center-2027-10-02-7-30-pm/concert/18613393 | - |
| tm-eros-ramazzotti-2027-new-york-g5dyz_ou7is1y | eros-ramazzotti | verify (applied) | 18551701 | https://seatgeek.com/eros-ramazzotti-tickets/new-york-new-york-radio-city-music-hall-2027-10-02-8-pm/concert/18551701 | - |
| tm-hilary-duff-2027-raleigh-g5evz_kpqg6lj | hilary-duff | verify (applied) | 18613392 | https://seatgeek.com/hilary-duff-tickets/raleigh-north-carolina-lenovo-center-2027-10-04-7-30-pm/concert/18613392 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-eros-ramazzotti-2027-rosemont-vv1a7zk1egkeidoc0 | eros-ramazzotti | verify (applied) | 17481908 | https://seatgeek.com/eros-ramazzotti-tickets/rosemont-illinois-rosemont-theatre-2027-10-05-8-pm/concert/17481908 | - |
| tm-hilary-duff-2027-baltimore-1a4zkfwgket7cfe | hilary-duff | verify (applied) | 18613391 | https://seatgeek.com/hilary-duff-tickets/baltimore-maryland-cfg-bank-arena-2027-10-06-7-30-pm/concert/18613391 | - |
| tm-hilary-duff-2027-uncasville-g5vvz_k5dwnjz | hilary-duff | verify (applied) | 18613390 | https://seatgeek.com/hilary-duff-tickets/uncasville-connecticut-mohegan-sun-arena-2027-10-08-7-30-pm/concert/18613390 | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | fontaines-d-c | verify (applied) | 18642849 | https://seatgeek.com/fontaines-d-c-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2027-10-08-8-pm/concert/18642849 | - |
| tm-eros-ramazzotti-2027-miami-vvg1vzbicfi7sa | eros-ramazzotti | verify (applied) | 17481804 | https://seatgeek.com/eros-ramazzotti-tickets/miami-florida-kaseya-center-2027-10-08-8-pm/concert/17481804 | - |
| tm-hilary-duff-2027-hershey-vv1aezkfugkempa0j | hilary-duff | verify (applied) | 18613394 | https://seatgeek.com/hilary-duff-tickets/hershey-pennsylvania-giant-center-2027-10-09-7-30-pm/concert/18613394 | - |
| tm-hilary-duff-2027-buffalo-k7vgf_k9lboi8 | hilary-duff | verify (applied) | 18613395 | https://seatgeek.com/hilary-duff-tickets/buffalo-new-york-keybank-center-2027-10-11-7-30-pm/concert/18613395 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-columbus-vv1kv8vpu8ga1ilbe | hilary-duff | verify (applied) | 18613402 | https://seatgeek.com/hilary-duff-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-10-15-7-30-pm/concert/18613402 | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | fontaines-d-c | verify (applied) | 18642853 | https://seatgeek.com/fontaines-d-c-tickets/inglewood-california-kia-forum-2027-10-15-7-pm/concert/18642853 | - |
| tm-hilary-duff-2027-pittsburgh-1apzkfsgkdqpqgi | hilary-duff | verify (applied) | 18613403 | https://seatgeek.com/hilary-duff-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-10-16-7-30-pm/concert/18613403 | - |
| tm-eros-ramazzotti-2027-inglewood-vvg1izbiyf5ko0 | eros-ramazzotti | verify (applied) | 17482180 | https://seatgeek.com/eros-ramazzotti-tickets/inglewood-california-youtube-theater-2027-10-16-8-pm/concert/17482180 | - |
| tm-hilary-duff-2027-san-antonio-g5diz_kh8lc6s | hilary-duff | verify (applied) | 18613404 | https://seatgeek.com/hilary-duff-tickets/san-antonio-texas-frost-bank-center-2027-11-05-7-30-pm/concert/18613404 | - |
| tm-hilary-duff-2027-fort-worth-vvg1yz_3lpl3yg | hilary-duff | verify (applied) | 18613405 | https://seatgeek.com/hilary-duff-tickets/fort-worth-texas-dickies-arena-2027-11-06-7-30-pm/concert/18613405 | - |
| tm-hilary-duff-2027-tulsa-1aozkfggkd6ydle | hilary-duff | verify (applied) | 18613406 | https://seatgeek.com/hilary-duff-tickets/tulsa-oklahoma-bok-center-2027-11-08-7-30-pm/concert/18613406 | - |
| tm-hilary-duff-2027-omaha-vv1akzkfggkdletyo | hilary-duff | verify (applied) | 18613409 | https://seatgeek.com/hilary-duff-tickets/omaha-nebraska-chi-health-center-omaha-2027-11-10-7-30-pm/concert/18613409 | - |
| tm-hilary-duff-2027-milwaukee-vv1a6zkfggkdrdjze | hilary-duff | verify (applied) | 18613414 | https://seatgeek.com/hilary-duff-tickets/milwaukee-wisconsin-fiserv-forum-2027-11-12-7-30-pm/concert/18613414 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-hilary-duff-2027-kansas-city-vv1kvovpuoga1lapx | hilary-duff | verify (applied) | 18613418 | https://seatgeek.com/hilary-duff-tickets/kansas-city-missouri-t-mobile-center-2027-11-15-7-30-pm/concert/18613418 | - |
| tm-hilary-duff-2027-denver-g5vzz_kkrpbyy | hilary-duff | verify (applied) | 18613419 | https://seatgeek.com/hilary-duff-tickets/denver-colorado-ball-arena-2027-11-17-7-30-pm/concert/18613419 | - |
| tm-hilary-duff-2027-anaheim-vv110z_kqbpjub | hilary-duff | verify (applied) | 18613420 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-20-7-30-pm/concert/18613420 | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | hilary-duff | verify (applied) | 18633659 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-21-7-30-pm/concert/18633659 | - |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18327314 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18373497 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18579808 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18474907 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18297302 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | verify (applied) | 18200018 | https://seatgeek.com/the-red-clay-strays-tickets/baton-rouge-louisiana-raising-cane-s-river-center-2026-11-05-6-30-pm/concert/18200018 | - |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | verify (applied) | 18257241 | https://seatgeek.com/john-summit-tickets/houston-texas-toyota-center-2026-11-05-7-pm/concert/18257241 | - |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | verify (applied) | 18243411 | https://seatgeek.com/mercyme-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-05-7-pm/concert/18243411 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | verify (applied) | 18297303 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-05-8-pm/concert/18297303 | - |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | verify (applied) | 18626682 | https://seatgeek.com/brandi-carlile-tickets/portland-oregon-revolution-hall-portland-2026-11-05-8-pm/concert/18626682 | - |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | verify (applied) | 18140310 | https://seatgeek.com/mon-laferte-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-05-8-pm/concert/18140310 | - |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | verify (applied) | 18391931 | https://seatgeek.com/trivium-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-06-6-30-pm/concert/18391931 | - |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | verify (applied) | 18200019 | https://seatgeek.com/the-red-clay-strays-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-11-06-6-30-pm/concert/18200019 | - |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | verify (applied) | 18237194 | https://seatgeek.com/journey-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-06-7-30-pm/concert/18237194 | - |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | verify (applied) | 18355665 | https://seatgeek.com/air-supply-tickets/easton-pennsylvania-state-theatre-easton-2026-11-06-7-30-pm/concert/18355665 | - |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | verify (applied) | 18147866 | https://seatgeek.com/blue-october-tickets/albany-new-york-hart-theatre-at-the-egg-2026-11-06-7-pm/concert/18147866 | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | verify (applied) | 18390332 | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 | - |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | verify (applied) | 18345772 | https://seatgeek.com/dinosaur-jr-tickets/san-antonio-texas-paper-tiger-san-antonio-2026-11-06-8-pm/concert/18345772 | - |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | verify (applied) | 17938858 | https://seatgeek.com/mana-tickets/houston-texas-toyota-center-2026-11-06-8-30-pm/concert/17938858 | - |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | verify (applied) | 18629796 | https://seatgeek.com/beck-tickets/spokane-washington-first-interstate-center-for-the-arts-2026-11-06-7-30-pm/concert/18629796 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | verify (applied) | 18085658 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-06-8-pm/concert/18085658 | - |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | verify (applied) | 18319859 | https://seatgeek.com/brand-new-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-11-06-8-pm/concert/18319859 | - |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | verify (applied) | 18392100 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-06-8-pm/concert/18392100 | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | verify (applied) | 18391256 | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | verify (applied) | 18391935 | https://seatgeek.com/trivium-tickets/louisville-kentucky-old-forester-s-paristown-hall-2026-11-07-6-35-pm/concert/18391935 | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | verify (applied) | 18147873 | https://seatgeek.com/blue-october-tickets/cleveland-ohio-agora-theatre-2026-11-07-7-pm/concert/18147873 | - |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | verify (applied) | 18243415 | https://seatgeek.com/mercyme-tickets/springfield-missouri-great-southern-bank-arena-2026-11-07-7-pm/concert/18243415 | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | verify (applied) | 17769336 | https://seatgeek.com/doja-cat-tickets/houston-texas-toyota-center-2026-11-07-7-30-pm/concert/17769336 | - |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | verify (applied) | 18531269 | https://seatgeek.com/ye-tickets/arlington-texas-at-t-stadium-2026-11-07-8-pm/concert/18531269 | - |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | verify (applied) | 18556120 | https://seatgeek.com/victoria-monet-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-07-8-pm/concert/18556120 | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | verify (applied) | 18318283 | https://seatgeek.com/sienna-spiro-tickets/portland-oregon-mcmenamins-crystal-ballroom-2026-11-07-8-pm/concert/18318283 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | verify (applied) | 18085660 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-07-8-pm/concert/18085660 | - |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | verify (applied) | 18316805 | https://seatgeek.com/daughtry-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-07-7-pm/concert/18316805 | - |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | verify (applied) | 18392092 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-07-8-pm/concert/18392092 | - |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | verify (applied) | 17732672 | https://seatgeek.com/sabaton-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-08-7-pm/concert/17732672 | - |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | verify (applied) | 18571665 | https://seatgeek.com/jonas-brothers-tickets/houston-texas-toyota-center-2026-11-08-7-30-pm/concert/18571665 | - |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | verify (applied) | 18485941 | https://seatgeek.com/steve-lacy-tickets/sugar-land-texas-smart-financial-centre-2026-11-08-8-pm/concert/18485941 | - |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | verify (applied) | 18085646 | https://seatgeek.com/foy-vance-tickets/san-francisco-california-great-american-music-hall-2026-11-08-7-pm/concert/18085646 | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | verify (applied) | 18506093 | https://seatgeek.com/pentatonix-tickets/bozeman-montana-brick-breeden-fieldhouse-2026-11-09-7-pm/concert/18506093 | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | verify (applied) | 18085699 | https://seatgeek.com/foy-vance-tickets/portland-oregon-aladdin-theater-2026-11-10-7-pm/concert/18085699 | - |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | verify (applied) | 18194387 | https://seatgeek.com/beck-tickets/portland-oregon-keller-auditorium-2026-11-10-8-pm/concert/18194387 | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | verify (applied) | 18391936 | https://seatgeek.com/trivium-tickets/new-haven-connecticut-college-street-music-hall-2026-11-11-6-35-pm/concert/18391936 | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | verify (applied) | 18147874 | https://seatgeek.com/blue-october-tickets/north-tonawanda-new-york-riviera-theatre-north-tonawanda-2026-11-11-7-pm/concert/18147874 | - |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | verify (applied) | 18316812 | https://seatgeek.com/daughtry-tickets/tucson-arizona-fox-tucson-theatre-2026-11-11-7-pm/concert/18316812 | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | verify (applied) | 18373510 | https://seatgeek.com/michelle-branch-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-11-11-7-30-pm/concert/18373510 | - |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | verify (applied) | 18485943 | https://seatgeek.com/steve-lacy-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-11-8-pm/concert/18485943 | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | verify (applied) | 18391943 | https://seatgeek.com/trivium-tickets/new-york-new-york-terminal-5-2026-11-12-6-35-pm/concert/18391943 | - |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | verify (applied) | 18219942 | https://seatgeek.com/journey-tickets/cleveland-ohio-rocket-arena-2026-11-12-7-30-pm/concert/18219942 | - |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | sleeping-with-sirens | verify (applied) | 18327312 | https://seatgeek.com/sleeping-with-sirens-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-12-7-30-pm/concert/18327312 | - |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | verify (applied) | 18387640 | https://seatgeek.com/foy-vance-tickets/vancouver-canada-hollywood-theatre-vancouver-2026-11-12-7-pm/concert/18387640 | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | verify (applied) | 18373511 | https://seatgeek.com/michelle-branch-tickets/milwaukee-wisconsin-pabst-theater-2026-11-12-8-pm/concert/18373511 | - |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | verify (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | verify (applied) | 18157641 | https://seatgeek.com/sombr-tickets/cleveland-ohio-rocket-arena-2026-11-13-7-30-pm/concert/18157641 | - |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | verify (applied) | 18253089 | https://seatgeek.com/beartooth-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-13-6-pm/concert/18253089 | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | verify (applied) | 18322791 | https://seatgeek.com/amble-tickets/atlanta-georgia-terminal-west-2026-11-13-8-pm/concert/18322791 | - |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | verify (applied) | 18734186 | https://seatgeek.com/too-many-zooz-tickets/buffalo-new-york-asbury-hall-buffalo-2026-11-13-8-pm/concert/18734186 | - |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | verify (applied) | 18637121 | https://seatgeek.com/black-stone-cherry-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-11-13-8-pm/concert/18637121 | - |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | verify (applied) | 18185177 | https://seatgeek.com/teddy-swims-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-13-7-pm/concert/18185177 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | verify (applied) | 18391945 | https://seatgeek.com/trivium-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-14-6-35-pm/concert/18391945 | - |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | verify (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-jodeci-2026-cleveland-z7r9jz1aaed_7 | jodeci | verify (applied) | 18407250 | https://seatgeek.com/jodeci-tickets/cleveland-ohio-keybank-state-theatre-at-playhouse-square-2026-11-14-8-pm/concert/18407250 | - |
| tm-mercyme-2026-kansas-city-z7r9jz1a70nek | mercyme | verify (applied) | 18243423 | https://seatgeek.com/mercyme-tickets/kansas-city-missouri-t-mobile-center-2026-11-14-7-pm/concert/18243423 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | verify (applied) | 18312360 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-14-8-pm/concert/18312360 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | verify (applied) | 18626684 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-14-8-pm/concert/18626684 | - |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | three-days-grace | verify (applied) | 17895168 | https://seatgeek.com/three-days-grace-tickets/nampa-idaho-ford-idaho-center-2026-11-14-7-pm/concert/17895168 | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | verify (applied) | 18185180 | https://seatgeek.com/teddy-swims-tickets/las-vegas-nevada-t-mobile-arena-2026-11-14-7-pm/concert/18185180 | - |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | verify (applied) | 18240153 | https://seatgeek.com/katseye-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-14-8-pm/concert/18240153 | - |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | los-tigres-del-norte | verify (applied) | 18100396 | https://seatgeek.com/los-tigres-del-norte-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-14-8-pm/concert/18100396 | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | verify (applied) | 18391947 | https://seatgeek.com/trivium-tickets/worcester-massachusetts-the-palladium-2026-11-15-6-35-pm/concert/18391947 | - |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | verify (applied) | 18269141 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-webster-hall-2026-11-15-8-pm/concert/18269141 | - |
| tm-mercyme-2026-minneapolis-z7r9jz1a70nz6 | mercyme | verify (applied) | 18243425 | https://seatgeek.com/mercyme-tickets/minneapolis-minnesota-target-center-2026-11-15-7-pm/concert/18243425 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | verify (applied) | 18312361 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-15-8-pm/concert/18312361 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | verify (applied) | 18626686 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-15-8-pm/concert/18626686 | - |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | three-days-grace | verify (applied) | 17895171 | https://seatgeek.com/three-days-grace-tickets/spokane-washington-numerica-veterans-arena-2026-11-15-7-pm/concert/17895171 | - |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | verify (applied) | 18310993 | https://seatgeek.com/the-psychedelic-furs-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2026-11-16-8-pm/concert/18310993 | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | verify (applied) | 18253466 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-royale-boston-2026-11-17-8-pm/concert/18253466 | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | verify (applied) | 18253081 | https://seatgeek.com/beartooth-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-18-6-pm/concert/18253081 | - |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | verify (applied) | 18237193 | https://seatgeek.com/journey-tickets/houston-texas-toyota-center-2026-11-18-7-30-pm/concert/18237193 | - |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | black-stone-cherry | verify (applied) | 18637126 | https://seatgeek.com/black-stone-cherry-tickets/omaha-nebraska-the-waiting-room-omaha-2026-11-18-8-pm/concert/18637126 | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | verify (applied) | 18573353 | https://seatgeek.com/trans-siberian-orchestra-tickets/green-bay-wisconsin-resch-center-2026-11-19-2-30-pm/concert/18573353 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | verify (applied) | 18208621 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-19-7-pm/concert/18208621 | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | verify (applied) | 18385717 | https://seatgeek.com/pentatonix-tickets/cleveland-ohio-rocket-arena-2026-11-19-7-pm/concert/18385717 | - |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | verify (applied) | 18572536 | https://seatgeek.com/too-many-zooz-tickets/ottawa-canada-overflow-brewing-company-2026-11-19-7-30-pm/concert/18572536 | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | verify (applied) | 18147875 | https://seatgeek.com/blue-october-tickets/jacksonville-florida-five-jacksonville-2026-11-19-7-pm/concert/18147875 | - |
| tm-air-supply-2026-orlando-z7r9jz1aazdae | air-supply | verify (applied) | 18355666 | https://seatgeek.com/air-supply-tickets/orlando-florida-dr-phillips-center-for-performing-arts-2026-11-19-8-pm/concert/18355666 | - |
| tm-jodeci-2026-bensalem-z7r9jz1aaz98b | jodeci | verify (applied) | 18407255 | https://seatgeek.com/jodeci-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-11-19-8-pm/concert/18407255 | - |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | verify (applied) | 18092700 | https://seatgeek.com/the-psychedelic-furs-tickets/phoenix-arizona-celebrity-theatre-phoenix-2026-11-19-7-30-pm/concert/18092700 | - |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | verify (applied) | 18391950 | https://seatgeek.com/trivium-tickets/royal-oak-michigan-royal-oak-music-theatre-2026-11-20-6-35-pm/concert/18391950 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | verify (applied) | 18208620 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | verify (applied) | 18147876 | https://seatgeek.com/blue-october-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-20-7-pm/concert/18147876 | - |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | los-tigres-del-norte | verify (applied) | 17573295 | https://seatgeek.com/los-tigres-del-norte-tickets/columbus-ohio-palace-theatre-columbus-2026-11-20-8-pm/concert/17573295 | - |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | zac-brown-band | verify (applied) | 18032035 | https://seatgeek.com/zac-brown-band-tickets/des-moines-iowa-casey-s-center-2026-11-20-7-pm/concert/18032035 | - |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | gary-allan | verify (applied) | 18391791 | https://seatgeek.com/gary-allan-tickets/lake-charles-louisiana-grand-event-center-golden-nugget-lake-charles-2026-11-20-8-30-pm/concert/18391791 | - |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | verify (applied) | 18337370 | https://seatgeek.com/dylan-gossett-tickets/apopka-florida-apopka-amphitheater-2026-11-21-6-pm/concert/18337370 | - |
| tm-air-supply-2026-clearwater-z7r9jz1a7paou | air-supply | verify (applied) | 18289135 | https://seatgeek.com/air-supply-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-21-8-pm/concert/18289135 | - |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | verify (applied) | 18085728 | https://seatgeek.com/foy-vance-tickets/englewood-colorado-gothic-theatre-2026-11-21-7-pm/concert/18085728 | - |
| tm-ye-2026-glendale-z7r9jz1aav08u | ye | verify (applied) | 18549330 | https://seatgeek.com/ye-tickets/glendale-arizona-state-farm-stadium-2026-11-21-8-30-pm/concert/18549330 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9um | calvin-harris | verify (applied) | 18701919 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-11-21-10-30-pm/concert/18701919 | - |
| tm-dom-dolla-2026-las-vegas-z7r9jz1a7p3c3 | dom-dolla | verify (applied) | 18598936 | https://seatgeek.com/dom-dolla-tickets/las-vegas-nevada-liv-nightclub-las-vegas-2026-11-21-10-30-pm/concert/18598936 | - |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | trans-siberian-orchestra | verify (applied) | 18573367 | https://seatgeek.com/trans-siberian-orchestra-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-22-2-30-pm/concert/18573367 | - |
| tm-air-supply-2026-jacksonville-z7r9jz1a70eoz | air-supply | verify (applied) | 18355667 | https://seatgeek.com/air-supply-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-11-22-7-pm/concert/18355667 | - |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | trans-siberian-orchestra | verify (applied) | 18499779 | https://seatgeek.com/trans-siberian-orchestra-tickets/salt-lake-city-utah-delta-center-1-2026-11-24-3-pm/concert/18499779 | - |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | trivium | verify (applied) | 18391959 | https://seatgeek.com/trivium-tickets/nashville-tennessee-the-pinnacle-nashville-2026-11-24-6-35-pm/concert/18391959 | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | trivium | verify (applied) | 18391961 | https://seatgeek.com/trivium-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-27-6-35-pm/concert/18391961 | - |
| tm-jodeci-2026-thackerville-z7r9jz1aaz3ae | jodeci | verify (applied) | 18395809 | https://seatgeek.com/jodeci-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-11-27-8-pm/concert/18395809 | - |
| tm-journey-2026-las-vegas-z7r9jz1a70_7f | journey | verify (applied) | 18237195 | https://seatgeek.com/journey-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-27-7-30-pm/concert/18237195 | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | cristian-castro | verify (applied) | 18082276 | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 | - |
| tm-jodeci-2026-norman-z7r9jz1aaed_m | jodeci | verify (applied) | 18350138 | https://seatgeek.com/jodeci-tickets/norman-oklahoma-riverwind-casino-2026-11-28-8-pm/concert/18350138 | - |
| tm-jonas-brothers-2026-las-vegas-z7r9jz1aazwb_ | jonas-brothers | verify (applied) | 18503912 | https://seatgeek.com/jonas-brothers-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-28-7-30-pm/concert/18503912 | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | cristian-castro | verify (applied) | 18077764 | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-lord-huron-2026-nashville-z7r9jz1aazbfy | lord-huron | verify (applied) | 18421956 | https://seatgeek.com/lord-huron-tickets/nashville-tennessee-ryman-auditorium-2026-12-01-8-pm/concert/18421956 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | beartooth | verify (applied) | 18253058 | https://seatgeek.com/beartooth-tickets/charleston-south-carolina-the-refinery-charleston-2026-12-02-6-30-pm/concert/18253058 | - |
| tm-jodeci-2026-new-orleans-z7r9jz1aazk_o | jodeci | verify (applied) | 18406111 | https://seatgeek.com/jodeci-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2026-12-02-7-30-pm/concert/18406111 | - |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | koe-wetzel | verify (applied) | 18649773 | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | victoria-monet | verify (applied) | 18579809 | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | blue-october | verify (applied) | 18147878 | https://seatgeek.com/blue-october-tickets/kansas-city-missouri-the-midland-theatre-mo-2026-12-03-7-pm/concert/18147878 | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | trivium | verify (applied) | 18391971 | https://seatgeek.com/trivium-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-12-03-6-30-pm/concert/18391971 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | verify (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | beartooth | verify (applied) | 18253061 | https://seatgeek.com/beartooth-tickets/saint-augustine-florida-st-augustine-amphitheatre-2026-12-04-6-pm/concert/18253061 | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | koe-wetzel | verify (applied) | 18649774 | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 | - |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | trans-siberian-orchestra | verify (applied) | 18573413 | https://seatgeek.com/trans-siberian-orchestra-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-12-04-7-pm/concert/18573413 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | trans-siberian-orchestra | verify (applied) | 18573414 | https://seatgeek.com/trans-siberian-orchestra-tickets/ontario-california-toyota-arena-ontario-2026-12-05-3-pm/concert/18573414 | - |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | beartooth | verify (applied) | 18235668 | https://seatgeek.com/beartooth-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-05-6-30-pm/concert/18235668 | - |
| tm-lord-huron-2026-detroit-z7r9jz1aazpf4 | lord-huron | verify (applied) | 18421959 | https://seatgeek.com/lord-huron-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-12-05-6-30-pm/concert/18421959 | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | koe-wetzel | verify (applied) | 18649776 | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 | - |
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | a-boogie-wit-da-hoodie | verify (applied) | 18662770 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/orlando-florida-central-florida-fairgrounds-2026-12-05-8-pm/concert/18662770 | - |
| tm-black-stone-cherry-2026-hartford-z7r9jz1aaea0z | black-stone-cherry | verify (applied) | 18637149 | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-webster-underground-hartford-2026-12-05-8-pm/concert/18637149 | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | the-red-clay-strays | verify (applied) | 18257194 | https://seatgeek.com/the-red-clay-strays-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-12-05-6-30-pm/concert/18257194 | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | tommy-emmanuel | verify (applied) | 18225197 | https://seatgeek.com/tommy-emmanuel-tickets/durham-north-carolina-carolina-theatre-durham-2026-12-06-8-pm/concert/18225197 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-gary-allan-2026-bakersfield-z7r9jz1aae3j4 | gary-allan | verify (applied) | 18639145 | https://seatgeek.com/gary-allan-tickets/bakersfield-california-historic-bakersfield-fox-theater-2026-12-06-7-pm/concert/18639145 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | riley-green | verify (applied) | 18282384 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-06-8-30-pm/concert/18282384 | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | jonas-brothers | verify (applied) | 18471182 | https://seatgeek.com/jonas-brothers-tickets/salt-lake-city-utah-delta-center-1-2026-12-07-7-30-pm/concert/18471182 | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | trivium | verify (applied) | 18391977 | https://seatgeek.com/trivium-tickets/penticton-canada-penticton-trade-convention-centre-2026-12-07-6-35-pm/concert/18391977 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | little-big-town | verify (applied) | 18385970 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | beartooth | verify (applied) | 18253063 | https://seatgeek.com/beartooth-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-09-6-30-pm/concert/18253063 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | verify (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | little-big-town | verify (applied) | 18385972 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | blue-october | verify (applied) | 18147877 | https://seatgeek.com/blue-october-tickets/little-rock-arkansas-the-hall-little-rock-2026-12-09-7-pm/concert/18147877 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | pink-martini | verify (applied) | 18701980 | https://seatgeek.com/pink-martini-tickets/fairfax-virginia-center-for-the-arts-george-mason-university-2026-12-10-7-30-pm/concert/18701980 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | little-big-town | verify (applied) | 18385974 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | riley-green | verify (applied) | 18282386 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-10-8-30-pm/concert/18282386 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | trans-siberian-orchestra | verify (applied) | 18573440 | https://seatgeek.com/trans-siberian-orchestra-tickets/houston-texas-toyota-center-2026-12-11-3-pm/concert/18573440 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | blue-october | verify (applied) | 18147885 | https://seatgeek.com/blue-october-tickets/austin-texas-bass-concert-hall-2026-12-11-7-pm/concert/18147885 | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | brent-faiyaz | verify (applied) | 18619390 | https://seatgeek.com/brent-faiyaz-tickets/los-angeles-california-crypto-com-arena-2026-12-11-8-pm/concert/18619390 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | black-stone-cherry | verify (applied) | 18637158 | https://seatgeek.com/black-stone-cherry-tickets/columbus-ohio-the-king-of-clubs-oh-2026-12-12-5-30-pm/concert/18637158 | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | sabaton | verify (applied) | 17726761 | https://seatgeek.com/sabaton-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-12-7-pm/concert/17726761 | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | pink-martini | verify (applied) | 18670209 | https://seatgeek.com/pink-martini-tickets/lebanon-new-hampshire-lebanon-opera-house-2026-12-12-7-30-pm/concert/18670209 | - |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | lady-a | verify (applied) | 18295863 | https://seatgeek.com/lady-a-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2026-12-12-7-30-pm/concert/18295863 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | janet-jackson | verify (applied) | 18443314 | https://seatgeek.com/janet-jackson-tickets/sunrise-florida-amerant-bank-arena-2026-12-12-8-pm/concert/18443314 | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | blue-october | verify (applied) | 18142024 | https://seatgeek.com/blue-october-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-12-12-8-pm/concert/18142024 | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | jodeci | verify (applied) | 18407288 | https://seatgeek.com/jodeci-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-12-15-8-pm/concert/18407288 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | verify (applied) | 18668809 | https://seatgeek.com/pink-martini-tickets/boston-massachusetts-berklee-performance-center-2026-12-18-8-pm/concert/18668809 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | lord-huron | verify (applied) | 18421979 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-18-8-pm/concert/18421979 | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | lady-a | verify (applied) | 18353855 | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | a-boogie-wit-da-hoodie | verify (applied) | 18639406 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/hartford-connecticut-peoplesbank-arena-2026-12-19-8-pm/concert/18639406 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | lord-huron | verify (applied) | 18421980 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-19-8-pm/concert/18421980 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | lady-a | verify (applied) | 18295865 | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | post-malone | verify (applied) | 18414663 | https://seatgeek.com/post-malone-tickets/salt-lake-city-utah-delta-center-1-2026-12-31-10-pm/concert/18414663 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | lord-huron | verify (applied) | 18421984 | https://seatgeek.com/lord-huron-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2027-01-02-8-pm/concert/18421984 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | verify (applied) | 18659747 | https://seatgeek.com/pink-martini-tickets/fort-worth-texas-bass-performance-hall-2027-01-08-7-30-pm/concert/18659747 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | verify (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | atmosphere | verify (applied) | 18609072 | https://seatgeek.com/atmosphere-tickets/west-des-moines-iowa-val-air-ballroom-2027-01-16-6-45-pm/concert/18609072 | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | atmosphere | verify (applied) | 18609074 | https://seatgeek.com/atmosphere-tickets/omaha-nebraska-the-admiral-omaha-2027-01-17-8-pm/concert/18609074 | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | atmosphere | verify (applied) | 18609075 | https://seatgeek.com/atmosphere-tickets/fort-collins-colorado-aggie-theatre-2027-01-19-6-45-pm/concert/18609075 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | alan-walker | verify (applied) | 18595131 | https://seatgeek.com/alan-walker-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-21-7-pm/concert/18595131 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | verify (applied) | 18690599 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-21-8-pm/concert/18690599 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | verify (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | verify (applied) | 18690598 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-22-8-pm/concert/18690598 | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | verify (applied) | 18699569 | https://seatgeek.com/yacht-rock-revue-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-23-8-pm/concert/18699569 | - |
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | air-supply | verify (applied) | 18355670 | https://seatgeek.com/air-supply-tickets/sarasota-florida-van-wezel-performing-arts-hall-2027-01-24-7-pm/concert/18355670 | - |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | pink-martini | verify (applied) | 18668823 | https://seatgeek.com/pink-martini-tickets/bellingham-washington-mount-baker-theatre-2027-01-24-7-pm/concert/18668823 | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | daughtry | verify (applied) | 18632894 | https://seatgeek.com/daughtry-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-25-7-pm/concert/18632894 | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | tommy-emmanuel | verify (applied) | 18690443 | https://seatgeek.com/tommy-emmanuel-tickets/champaign-illinois-virginia-theatre-2027-01-26-7-30-pm/concert/18690443 | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | yacht-rock-revue | verify (applied) | 18618051 | https://seatgeek.com/yacht-rock-revue-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-27-7-30-pm/concert/18618051 | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | daughtry | verify (applied) | 18632896 | https://seatgeek.com/daughtry-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-28-7-pm/concert/18632896 | - |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | alan-walker | verify (applied) | 18621798 | https://seatgeek.com/alan-walker-tickets/nashville-tennessee-the-pinnacle-nashville-2027-01-28-8-pm/concert/18621798 | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | atmosphere | verify (applied) | 18609088 | https://seatgeek.com/atmosphere-tickets/eugene-oregon-mcdonald-theatre-2027-01-28-8-pm/concert/18609088 | - |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | yacht-rock-revue | verify (applied) | 18621818 | https://seatgeek.com/yacht-rock-revue-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-29-7-30-pm/concert/18621818 | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | dylan-scott | verify (applied) | 18603379 | https://seatgeek.com/dylan-scott-tickets/bismarck-north-dakota-bismarck-event-center-2027-01-29-7-30-pm/concert/18603379 | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | blue-october | verify (applied) | 18354266 | https://seatgeek.com/blue-october-tickets/midland-texas-wagner-noel-performing-arts-center-2027-01-29-8-pm/concert/18354266 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | verify (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | verify (applied) | 18696397 | https://seatgeek.com/valley-tickets/quebec-canada-grizzly-fuzz-2027-02-04-8-pm/concert/18696397 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | dropkick-murphys | verify (applied) | 18633525 | https://seatgeek.com/dropkick-murphys-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-05-7-pm/concert/18633525 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | verify (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | air-supply | verify (applied) | 18200030 | https://seatgeek.com/air-supply-tickets/wisconsin-dells-wisconsin-crystal-grand-music-theatre-2027-02-06-8-pm/concert/18200030 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
| tm-dropkick-murphys-2027-del-mar-rz7hnez1afgypv | dropkick-murphys | verify (applied) | 18633526 | https://seatgeek.com/dropkick-murphys-tickets/del-mar-california-the-sound-del-mar-2027-02-07-7-pm/concert/18633526 | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | polyphia | verify (applied) | 18536015 | https://seatgeek.com/polyphia-tickets/san-diego-california-soma-san-diego-2027-02-10-7-30-pm/concert/18536015 | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | don-omar | verify (applied) | 18333383 | https://seatgeek.com/don-omar-tickets/san-diego-california-pechanga-arena-san-diego-2027-02-10-8-pm/concert/18333383 | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | blue-october | verify (applied) | 18245801 | https://seatgeek.com/blue-october-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-02-10-8-pm/concert/18245801 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | dinosaur-jr | verify (applied) | 18540431 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-11-8-pm/concert/18540431 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595137 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-11-9-pm/concert/18595137 | - |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | nickelback | verify (applied) | 18604483 | https://seatgeek.com/nickelback-tickets/cleveland-ohio-rocket-arena-2027-02-12-6-30-pm/concert/18604483 | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | tobymac | verify (applied) | 18548802 | https://seatgeek.com/tobymac-tickets/sugar-land-texas-smart-financial-centre-2027-02-12-7-pm/concert/18548802 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | dinosaur-jr | verify (applied) | 18540433 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-12-8-pm/concert/18540433 | - |
| tm-valley-2027-chicago-z7r9jz1aavzfy | valley | verify (applied) | 18684172 | https://seatgeek.com/valley-tickets/chicago-illinois-park-west-2027-02-12-7-30-pm/concert/18684172 | - |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | pink-martini | verify (applied) | 18396258 | https://seatgeek.com/pink-martini-tickets/chicago-illinois-chicago-symphony-center-2027-02-12-8-pm/concert/18396258 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | alan-walker | verify (applied) | 18595135 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-12-9-pm/concert/18595135 | - |
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | dropkick-murphys | verify (applied) | 18633528 | https://seatgeek.com/dropkick-murphys-tickets/vancouver-canada-pne-forum-vancouver-2027-02-12-7-pm/concert/18633528 | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | verify (applied) | 18653247 | https://seatgeek.com/blue-october-tickets/ventura-california-the-majestic-ventura-theater-2027-02-12-8-pm/concert/18653247 | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | dropkick-murphys | verify (applied) | 18633535 | https://seatgeek.com/dropkick-murphys-tickets/penticton-canada-penticton-trade-convention-centre-2027-02-13-7-pm/concert/18633535 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | meshuggah | verify (applied) | 18724637 | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | verify (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | greta-van-fleet | verify (applied) | 18641961 | https://seatgeek.com/greta-van-fleet-tickets/green-bay-wisconsin-resch-center-2027-02-17-7-pm/concert/18641961 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | verify (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | foreigner | verify (applied) | 18570609 | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 | - |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | air-supply | verify (applied) | 18646927 | https://seatgeek.com/air-supply-tickets/penticton-canada-south-okanagan-events-centre-2027-02-19-6-30-pm/concert/18646927 | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | dinosaur-jr | verify (applied) | 18540442 | https://seatgeek.com/dinosaur-jr-tickets/saint-petersburg-florida-jannus-live-2027-02-20-8-pm/concert/18540442 | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | meshuggah | verify (applied) | 18724639 | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | sylvan-esso | verify (applied) | 18299162 | https://seatgeek.com/sylvan-esso-tickets/vancouver-canada-vogue-theatre-bc-1-2027-02-20-8-pm/concert/18299162 | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | tobymac | verify (applied) | 18548806 | https://seatgeek.com/tobymac-tickets/norfolk-virginia-chartway-arena-2027-02-21-6-30-pm/concert/18548806 | - |
| tm-dropkick-murphys-2027-green-bay-z7r9jz1aaeopf | dropkick-murphys | verify (applied) | 18633547 | https://seatgeek.com/dropkick-murphys-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-02-21-7-pm/concert/18633547 | - |
| tm-air-supply-2027-prince-george-z7r9jz1aaek-z | air-supply | verify (applied) | 18736469 | https://seatgeek.com/air-supply-tickets/prince-george-canada-cn-centre-2027-02-21-6-30-pm/concert/18736469 | - |
| tm-dropkick-murphys-2027-fort-wayne-z7r9jz1aaeop4 | dropkick-murphys | verify (applied) | 18633548 | https://seatgeek.com/dropkick-murphys-tickets/fort-wayne-indiana-the-clyde-theatre-fort-wayne-in-2027-02-22-7-pm/concert/18633548 | - |
| tm-air-supply-2027-dawson-creek-z7r9jz1aavmfk | air-supply | verify (applied) | 18646928 | https://seatgeek.com/air-supply-tickets/dawson-creek-canada-ovintiv-events-centre-2027-02-22-7-30-pm/concert/18646928 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | sylvan-esso | verify (applied) | 18299165 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-22-8-30-pm/concert/18299165 | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | dinosaur-jr | verify (applied) | 18540443 | https://seatgeek.com/dinosaur-jr-tickets/orlando-florida-the-plaza-live-2027-02-23-7-30-pm/concert/18540443 | - |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | alan-walker | verify (applied) | 18595139 | https://seatgeek.com/alan-walker-tickets/pittsburgh-pennsylvania-stage-ae-2027-02-23-8-pm/concert/18595139 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | verify (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | verify (applied) | 18723495 | https://seatgeek.com/elevation-worship-tickets/spokane-washington-numerica-veterans-arena-2027-02-25-7-pm/concert/18723495 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | verify (applied) | 18716616 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-28-8-pm/concert/18716616 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | greta-van-fleet | verify (applied) | 18611175 | https://seatgeek.com/greta-van-fleet-tickets/cleveland-ohio-rocket-arena-2027-03-03-7-pm/concert/18611175 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |

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
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-austin-g5diz_fxgrqaf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-fort-worth-vvg1yz_flxlbcf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-tampa-vvg1vz_8uxpnex | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | bryson-tiller | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-salt-lake-city-z7r9jz1a70jp0 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5k9t5fo | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5kbz5fl | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-houston-z7r9jz1a7x73v | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-miami-vvg1vz_fchiqhv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-orlando-1axzk3dgkeha7uv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-atlanta-vvg1zz_f1gfmts | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-charlotte-g5evz_fffmq2n | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
