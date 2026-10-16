# SeatGeek CTA verification log

Generated: 2026-10-16T10:05:26.050Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1258 (needs_recheck: 694, provenance backfill: 155, stale re-check: 754)
- Events skipped before API checks: 200
- API calls made: 400
- Verified provenance written: 188
- URLs added: 46
- URLs corrected: 0
- URLs cleared: 4
- Provenance un-verified: 0
- Conflicts (ambiguous, untouched): 0
- No qualifying listing: 158
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | lionel-richie | verify (applied) | 18405681 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-09-8-pm/concert/18405681 | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | add (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | add (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | eagles | verify (applied) | 18421044 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | eagles | verify (applied) | 18421045 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-16-8-30-pm/concert/18421045 | - |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | santana | verify (applied) | 18628819 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-20-7-pm/concert/18628819 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | santana | verify (applied) | 18628820 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-21-7-pm/concert/18628820 | - |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | the-red-clay-strays | verify (applied) | 18639066 | https://seatgeek.com/the-red-clay-strays-tickets/raleigh-north-carolina-lenovo-center-2027-01-22-7-pm/concert/18639066 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | add (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | atmosphere | verify (applied) | 18609083 | https://seatgeek.com/atmosphere-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-01-22-6-45-pm/concert/18609083 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | the-red-clay-strays | verify (applied) | 18639067 | https://seatgeek.com/the-red-clay-strays-tickets/columbia-south-carolina-colonial-life-arena-2027-01-23-7-pm/concert/18639067 | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | santana | verify (applied) | 18628821 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-23-7-pm/concert/18628821 | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | tommy-emmanuel | verify (applied) | 18593679 | https://seatgeek.com/tommy-emmanuel-tickets/madison-wisconsin-barrymore-theatre-madison-2027-01-24-8-pm/concert/18593679 | - |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | pink-martini | add (applied) | 18668823 | https://seatgeek.com/pink-martini-tickets/bellingham-washington-mount-baker-theatre-2027-01-24-7-pm/concert/18668823 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | santana | verify (applied) | 18628822 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-24-7-pm/concert/18628822 | - |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | daughtry | add (applied) | 18632894 | https://seatgeek.com/daughtry-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-25-7-pm/concert/18632894 | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | tommy-emmanuel | verify (applied) | 18594247 | https://seatgeek.com/tommy-emmanuel-tickets/skokie-illinois-north-shore-center-for-the-performing-arts-van-dusen-theatre-2027-01-25-7-30-pm/concert/18594247 | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | stella-lefty | verify (applied) | 18527886 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-01-26-8-pm/concert/18527886 | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | yacht-rock-revue | add (applied) | 18618051 | https://seatgeek.com/yacht-rock-revue-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-27-7-30-pm/concert/18618051 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | santana | verify (applied) | 18628823 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-27-7-pm/concert/18628823 | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | tommy-emmanuel | verify (applied) | 18594658 | https://seatgeek.com/tommy-emmanuel-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-28-7-pm/concert/18594658 | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | daughtry | add (applied) | 18632896 | https://seatgeek.com/daughtry-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-28-7-pm/concert/18632896 | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | the-red-clay-strays | verify (applied) | 18639068 | https://seatgeek.com/the-red-clay-strays-tickets/rosemont-illinois-allstate-arena-2027-01-28-7-pm/concert/18639068 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | santana | verify (applied) | 18628824 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-28-7-pm/concert/18628824 | - |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | yacht-rock-revue | add (applied) | 18621818 | https://seatgeek.com/yacht-rock-revue-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-29-7-30-pm/concert/18621818 | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | the-red-clay-strays | verify (applied) | 18639069 | https://seatgeek.com/the-red-clay-strays-tickets/saint-louis-missouri-enterprise-center-2027-01-29-7-pm/concert/18639069 | - |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | daughtry | verify (applied) | 18632898 | https://seatgeek.com/daughtry-tickets/biloxi-mississippi-hard-rock-hotel-casino-biloxi-2027-01-30-7-pm/concert/18632898 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | add (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | santana | verify (applied) | 18628831 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-30-7-pm/concert/18628831 | - |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | tobymac | verify (applied) | 18542726 | https://seatgeek.com/tobymac-tickets/lafayette-louisiana-cajundome-2027-01-31-6-30-pm/concert/18542726 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | the-red-clay-strays | verify (applied) | 18639070 | https://seatgeek.com/the-red-clay-strays-tickets/omaha-nebraska-chi-health-center-omaha-2027-01-31-7-pm/concert/18639070 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | santana | verify (applied) | 18628832 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-31-7-pm/concert/18628832 | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | greta-van-fleet | verify (applied) | 18641948 | https://seatgeek.com/greta-van-fleet-tickets/savannah-georgia-enmarket-arena-2027-02-03-7-pm/concert/18641948 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | add (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | add (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | hilary-duff | verify (applied) | 18070284 | https://seatgeek.com/hilary-duff-tickets/kanata-canada-canadian-tire-centre-2027-02-04-7-30-pm/concert/18070284 | - |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | the-red-clay-strays | verify (applied) | 18639071 | https://seatgeek.com/the-red-clay-strays-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-05-7-pm/concert/18639071 | - |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | atmosphere | verify (applied) | 18609099 | https://seatgeek.com/atmosphere-tickets/joliet-illinois-hollywood-casino-15-2027-02-05-6-45-pm/concert/18609099 | - |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | chelsea-cutler | verify (applied) | 18639173 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-06-8-pm/concert/18639173 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | add (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | chelsea-cutler | verify (applied) | 18639180 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-07-7-pm/concert/18639180 | - |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | the-lemonheads | verify (applied) | 18593831 | https://seatgeek.com/the-lemonheads-tickets/boston-massachusetts-brighton-music-hall-2027-02-10-7-30-pm/concert/18593831 | - |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | yuridia | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | fantasia | verify (applied) | 18632088 | https://seatgeek.com/fantasia-tickets/elmont-new-york-ubs-arena-2027-02-12-8-pm/concert/18632088 | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | daughtry | verify (applied) | 18632912 | https://seatgeek.com/daughtry-tickets/durant-oklahoma-choctaw-grand-theater-2027-02-12-7-pm/concert/18632912 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | backstreet-boys | verify (applied) | 18642041 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-12-8-pm/concert/18642041 | - |
| tm-valley-2027-chicago-z7r9jz1aavzfy | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | flans | verify (applied) | 18612856 | https://seatgeek.com/flans-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-02-12-8-pm/concert/18612856 | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | add (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | backstreet-boys | verify (applied) | 18642039 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-13-8-pm/concert/18642039 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | add (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | flans | verify (applied) | 18612650 | https://seatgeek.com/flans-tickets/tucson-arizona-linda-ronstadt-music-hall-2027-02-13-8-pm/concert/18612650 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | backstreet-boys | verify (applied) | 18652781 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-14-8-pm/concert/18652781 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | add (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | daughtry | verify (applied) | 18632920 | https://seatgeek.com/daughtry-tickets/duluth-minnesota-decc-symphony-hall-2027-02-16-7-pm/concert/18632920 | - |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | add (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | chelsea-cutler | verify (applied) | 18639185 | https://seatgeek.com/chelsea-cutler-tickets/detroit-michigan-saint-andrews-hall-2027-02-18-7-pm/concert/18639185 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | add (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | add (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | add (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7luql | backstreet-boys | verify (applied) | 18642040 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-19-8-pm/concert/18642040 | - |
| tm-chelsea-cutler-2027-chicago-vv178z_kgks8xdpl | chelsea-cutler | verify (applied) | 18639192 | https://seatgeek.com/chelsea-cutler-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-19-8-pm/concert/18639192 | - |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-atlanta-vvg1zz_3rf_-sk | the-lemonheads | verify (applied) | 18593800 | https://seatgeek.com/the-lemonheads-tickets/atlanta-georgia-the-masquerade-hell-2027-02-20-7-30-pm/concert/18593800 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ouqm | backstreet-boys | verify (applied) | 18642042 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-20-8-pm/concert/18642042 | - |
| tm-polyphia-2027-denver-g5vzz_oe6fcei | polyphia | verify (applied) | 18312321 | https://seatgeek.com/polyphia-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-20-7-30-pm/concert/18312321 | - |
| tm-dylan-scott-2027-park-city-vv17bz_3gkmnbnzl | dylan-scott | verify (applied) | 18600816 | https://seatgeek.com/dylan-scott-tickets/park-city-kansas-heartland-credit-union-arena-2027-02-20-7-30-pm/concert/18600816 | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | mico | verify (applied) | 18665962 | https://seatgeek.com/mico-tickets/charleston-south-carolina-charleston-music-hall-2027-02-21-8-pm/concert/18665962 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | chelsea-cutler | verify (applied) | 18639194 | https://seatgeek.com/chelsea-cutler-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-02-23-6-30-pm/concert/18639194 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | add (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-estero-vvg1vz_ks60_np | the-red-clay-strays | verify (applied) | 18639080 | https://seatgeek.com/the-red-clay-strays-tickets/estero-florida-hertz-arena-2027-02-25-7-pm/concert/18639080 | - |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | flans | verify (applied) | 18612632 | https://seatgeek.com/flans-tickets/atlanta-georgia-cobb-energy-performing-arts-centre-2027-02-25-8-pm/concert/18612632 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | add (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | flans | verify (applied) | 18612827 | https://seatgeek.com/flans-tickets/charlotte-north-carolina-ovens-auditorium-2027-02-26-8-pm/concert/18612827 | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | flans | verify (applied) | 18618099 | https://seatgeek.com/flans-tickets/raleigh-north-carolina-martin-marietta-center-for-the-performing-arts-memorial-auditorium-2027-02-27-8-pm/concert/18618099 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | add (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | add (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | add (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | add (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | staind | verify (applied) | 18654539 | https://seatgeek.com/staind-tickets/manchester-new-hampshire-snhu-arena-2027-03-04-6-pm/concert/18654539 | - |
| tm-flans-2027-denver-g5vzz_kk90pao | flans | verify (applied) | 18612819 | https://seatgeek.com/flans-tickets/denver-colorado-paramount-theatre-co-2027-03-04-8-pm/concert/18612819 | - |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | gracie-abrams | verify (applied) | 18270567 | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-05-8-pm/concert/18270567 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | hans-zimmer | verify (applied) | 18601929 | https://seatgeek.com/hans-zimmer-tickets/chicago-illinois-united-center-2027-03-05-7-30-pm/concert/18601929 | - |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | fantasia | verify (applied) | 18629502 | https://seatgeek.com/fantasia-tickets/ontario-california-toyota-arena-ontario-2027-03-05-8-pm/concert/18629502 | - |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | needtobreathe | verify (applied) | 18621547 | https://seatgeek.com/needtobreathe-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-06-7-pm/concert/18621547 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | add (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | add (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | don-omar | verify (applied) | 18326519 | https://seatgeek.com/don-omar-tickets/fort-worth-texas-dickies-arena-2027-03-06-8-pm/concert/18326519 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | add (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | metallica | verify (applied) | 18111114 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-06-8-30-pm/concert/18111114 | - |
| tm-morat-2027-boston-vvg17z_1b5nnhl | morat | verify (applied) | 18251537 | https://seatgeek.com/morat-tickets/boston-massachusetts-agganis-arena-2027-03-07-8-pm/concert/18251537 | - |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | michelle-branch | verify (applied) | 18508828 | https://seatgeek.com/michelle-branch-tickets/houston-texas-house-of-blues-houston-2027-03-07-7-pm/concert/18508828 | - |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | lukas-graham | verify (applied) | 18617859 | https://seatgeek.com/lukas-graham-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-07-8-pm/concert/18617859 | - |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | don-omar | verify (applied) | 18326567 | https://seatgeek.com/don-omar-tickets/austin-texas-moody-center-atx-2027-03-07-8-pm/concert/18326567 | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | blondshell | add (applied) | 18251042 | https://seatgeek.com/blondshell-tickets/seattle-washington-showbox-sodo-2027-03-07-8-pm/concert/18251042 | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | hans-zimmer | verify (applied) | 18601932 | https://seatgeek.com/hans-zimmer-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-03-09-7-30-pm/concert/18601932 | - |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | lukas-graham | verify (applied) | 18618370 | https://seatgeek.com/lukas-graham-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-09-8-30-pm/concert/18618370 | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-don-omar-2027-tampa-vvg1vz_uc-buha | don-omar | verify (applied) | 18325141 | https://seatgeek.com/don-omar-tickets/tampa-florida-benchmark-international-arena-2027-03-10-8-pm/concert/18325141 | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-orlando-1axzkfygkexmgrx | hans-zimmer | verify (applied) | 18601931 | https://seatgeek.com/hans-zimmer-tickets/orlando-florida-kia-center-2027-03-11-7-30-pm/concert/18601931 | - |
| tm-tobymac-2027-austin-g5diz_oelxrxd | tobymac | verify (applied) | 18543696 | https://seatgeek.com/tobymac-tickets/austin-texas-moody-center-atx-2027-03-11-7-pm/concert/18543696 | - |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | jay-wheeler | verify (applied) | 18649595 | https://seatgeek.com/jay-wheeler-tickets/miami-florida-kaseya-center-2027-03-11-8-pm/concert/18649595 | - |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | sylvan-esso | add (applied) | 18299183 | https://seatgeek.com/sylvan-esso-tickets/new-orleans-louisiana-tipitina-s-2027-03-11-8-pm/concert/18299183 | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65pru4zd | gracie-abrams | verify (applied) | 18270573 | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-12-8-pm/concert/18270573 | - |
| tm-don-omar-2027-miami-vvg1vz_uk8ovtf | don-omar | verify (applied) | 18325223 | https://seatgeek.com/don-omar-tickets/miami-florida-kaseya-center-2027-03-12-8-pm/concert/18325223 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yuridia-2027-dallas-vvg1yz_32hm5d6 | yuridia | verify (applied) | 18570406 | https://seatgeek.com/yuridia-tickets/dallas-texas-dos-equis-pavilion-2027-03-12-8-pm/concert/18570406 | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | blondshell | add (applied) | 18251049 | https://seatgeek.com/blondshell-tickets/chicago-illinois-vic-theatre-chicago-2027-03-12-8-pm/concert/18251049 | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | gracie-abrams | verify (applied) | 18270574 | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-13-8-pm/concert/18270574 | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | hans-zimmer | verify (applied) | 18601933 | https://seatgeek.com/hans-zimmer-tickets/miami-florida-kaseya-center-2027-03-13-8-pm/concert/18601933 | - |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | fantasia | verify (applied) | 18645847 | https://seatgeek.com/fantasia-tickets/fort-worth-texas-dickies-arena-2027-03-13-8-pm/concert/18645847 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | metallica | verify (applied) | 18111118 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-13-8-30-pm/concert/18111118 | - |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | hans-zimmer | verify (applied) | 18601934 | https://seatgeek.com/hans-zimmer-tickets/tampa-florida-benchmark-international-arena-2027-03-14-7-30-pm/concert/18601934 | - |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | don-omar | verify (applied) | 18325188 | https://seatgeek.com/don-omar-tickets/orlando-florida-kia-center-2027-03-14-8-pm/concert/18325188 | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | blondshell | add (applied) | 18251054 | https://seatgeek.com/blondshell-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-14-8-pm/concert/18251054 | - |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2027-hidalgo-g5diz_1bprewh | morat | verify (applied) | 18251579 | https://seatgeek.com/morat-tickets/hidalgo-texas-payne-arena-2027-03-14-8-pm/concert/18251579 | - |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | yuridia | verify (applied) | 18570407 | https://seatgeek.com/yuridia-tickets/el-paso-texas-don-haskins-center-2027-03-14-8-pm/concert/18570407 | - |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | hans-zimmer | verify (applied) | 18601941 | https://seatgeek.com/hans-zimmer-tickets/atlanta-georgia-state-farm-arena-1-2027-03-16-7-30-pm/concert/18601941 | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | rod-stewart | add (applied) | 18603490 | https://seatgeek.com/rod-stewart-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-16-7-30-pm/concert/18603490 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | gracie-abrams | verify (applied) | 18270579 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-16-8-pm/concert/18270579 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | gracie-abrams | verify (applied) | 18270580 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-17-8-pm/concert/18270580 | - |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | hans-zimmer | verify (applied) | 18601967 | https://seatgeek.com/hans-zimmer-tickets/nashville-tennessee-bridgestone-arena-2027-03-17-7-30-pm/concert/18601967 | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | too-many-zooz | add (applied) | 18612556 | https://seatgeek.com/too-many-zooz-tickets/colorado-springs-colorado-black-sheep-2027-03-17-8-pm/concert/18612556 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2027-orlando-17fov0g61xg_prh | morat | verify (applied) | 18251530 | https://seatgeek.com/morat-tickets/orlando-florida-kia-center-2027-03-18-8-pm/concert/18251530 | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | niall-horan | verify (applied) | 18235522 | https://seatgeek.com/niall-horan-tickets/detroit-michigan-little-caesars-arena-2027-03-19-7-30-pm/concert/18235522 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | gracie-abrams | verify (applied) | 18270584 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-19-8-pm/concert/18270584 | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-hamilton-1a8zk4axofsze2g | nickelback | verify (applied) | 18664627 | https://seatgeek.com/nickelback-tickets/hamilton-canada-td-coliseum-2027-03-20-6-30-pm/concert/18664627 | - |
| tm-blondshell-2027-toronto-177zv0g61ygdrn9 | blondshell | verify (applied) | 18251050 | https://seatgeek.com/blondshell-tickets/toronto-canada-the-danforth-music-hall-2027-03-20-7-pm/concert/18251050 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | gracie-abrams | verify (applied) | 18270586 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-20-8-pm/concert/18270586 | - |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | morat | verify (applied) | 18251573 | https://seatgeek.com/morat-tickets/miami-florida-kaseya-center-2027-03-20-8-pm/concert/18251573 | - |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | death-cab-for-cutie | verify (applied) | 18603759 | https://seatgeek.com/death-cab-for-cutie-tickets/orlando-florida-hard-rock-live-orlando-2027-03-20-8-pm/concert/18603759 | - |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | needtobreathe | verify (applied) | 18621563 | https://seatgeek.com/needtobreathe-tickets/houston-texas-713-music-hall-2027-03-20-7-pm/concert/18621563 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | add (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-nickelback-2027-toronto-1a8zk47gkdvbcpm | nickelback | verify (applied) | 18664630 | https://seatgeek.com/nickelback-tickets/toronto-canada-scotiabank-arena-2027-03-21-6-30-pm/concert/18664630 | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | add (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | hans-zimmer | verify (applied) | 18601942 | https://seatgeek.com/hans-zimmer-tickets/fort-worth-texas-dickies-arena-2027-03-22-7-30-pm/concert/18601942 | - |
| tm-saint-levant-2027-toronto-177zv0g6cemiqt_ | saint-levant | verify (applied) | 18387668 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-23-7-pm/concert/18387668 | - |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | niall-horan | verify (applied) | 18235524 | https://seatgeek.com/niall-horan-tickets/chicago-illinois-united-center-2027-03-23-7-30-pm/concert/18235524 | - |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-toronto-177zv0g6cemcutq | saint-levant | verify (applied) | 18387667 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-24-7-pm/concert/18387667 | - |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | jay-wheeler | verify (applied) | 18649607 | https://seatgeek.com/jay-wheeler-tickets/brooklyn-new-york-barclays-center-2027-03-24-8-pm/concert/18649607 | - |
| tm-the-lemonheads-2027-detroit-vv17oz_3gklkn916 | the-lemonheads | verify (applied) | 18593750 | https://seatgeek.com/the-lemonheads-tickets/detroit-michigan-saint-andrews-hall-2027-03-25-7-pm/concert/18593750 | - |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | michelle-branch | verify (applied) | 18508849 | https://seatgeek.com/michelle-branch-tickets/new-york-new-york-beacon-theatre-2027-03-25-8-pm/concert/18508849 | - |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | hans-zimmer | verify (applied) | 18601943 | https://seatgeek.com/hans-zimmer-tickets/denver-colorado-ball-arena-2027-03-25-7-30-pm/concert/18601943 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | fantasia | verify (applied) | 18629276 | https://seatgeek.com/fantasia-tickets/atlanta-georgia-state-farm-arena-1-2027-03-26-8-pm/concert/18629276 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2027-montreal-17g8v0g65cezfzf | morat | verify (applied) | 18258641 | https://seatgeek.com/morat-tickets/montreal-canada-mtelus-2027-03-27-8-pm/concert/18258641 | - |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | jay-wheeler | verify (applied) | 18649625 | https://seatgeek.com/jay-wheeler-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-27-8-pm/concert/18649625 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | add (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-niall-horan-2027-saint-louis-vvg1bz_1qy32om | niall-horan | verify (applied) | 18235528 | https://seatgeek.com/niall-horan-tickets/saint-louis-missouri-enterprise-center-2027-03-27-7-30-pm/concert/18235528 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-philadelphia-vvg1fz_cxbxmek | saint-levant | verify (applied) | 18386192 | https://seatgeek.com/saint-levant-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-03-28-8-pm/concert/18386192 | - |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | hans-zimmer | verify (applied) | 18601944 | https://seatgeek.com/hans-zimmer-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-30-7-30-pm/concert/18601944 | - |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | nothing-but-thieves | verify (applied) | 18266338 | https://seatgeek.com/nothing-but-thieves-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-30-8-pm/concert/18266338 | - |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | nothing-but-thieves | verify (applied) | 18266337 | https://seatgeek.com/nothing-but-thieves-tickets/seattle-washington-paramount-theatre-wa-2027-03-31-8-pm/concert/18266337 | - |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | saint-levant | verify (applied) | 18550841 | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-01-7-pm/concert/18550841 | - |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | morat | verify (applied) | 18252365 | https://seatgeek.com/morat-tickets/brooklyn-new-york-barclays-center-2027-04-01-8-pm/concert/18252365 | - |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | lukas-graham | verify (applied) | 18617577 | https://seatgeek.com/lukas-graham-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-02-7-pm/concert/18617577 | - |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | hans-zimmer | verify (applied) | 18601946 | https://seatgeek.com/hans-zimmer-tickets/anaheim-california-honda-center-2027-04-02-7-30-pm/concert/18601946 | - |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | nothing-but-thieves | verify (applied) | 18266340 | https://seatgeek.com/nothing-but-thieves-tickets/oakland-california-fox-theater-oakland-2027-04-03-8-pm/concert/18266340 | - |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | the-interrupters | verify (applied) | 18613085 | https://seatgeek.com/the-interrupters-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-04-6-pm/concert/18613085 | - |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | niall-horan | verify (applied) | 18235519 | https://seatgeek.com/niall-horan-tickets/brooklyn-new-york-barclays-center-2027-04-04-7-30-pm/concert/18235519 | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | hans-zimmer | verify (applied) | 18601947 | https://seatgeek.com/hans-zimmer-tickets/san-francisco-california-chase-center-2027-04-04-7-30-pm/concert/18601947 | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | hans-zimmer | verify (applied) | 18601953 | https://seatgeek.com/hans-zimmer-tickets/sacramento-california-golden-1-center-2027-04-05-7-30-pm/concert/18601953 | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | lukas-graham | verify (applied) | 18617565 | https://seatgeek.com/lukas-graham-tickets/detroit-michigan-saint-andrews-hall-2027-04-07-7-pm/concert/18617565 | - |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | leon-bridges | verify (applied) | 18662693 | https://seatgeek.com/leon-bridges-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2027-04-07-8-pm/concert/18662693 | - |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | hans-zimmer | verify (applied) | 18601965 | https://seatgeek.com/hans-zimmer-tickets/vancouver-canada-rogers-arena-2027-04-08-7-30-pm/concert/18601965 | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | john-mayer | verify (applied) | 18626622 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-08-8-pm/concert/18626622 | - |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | mei-semones | verify (applied) | 18637352 | https://seatgeek.com/mei-semones-tickets/washington-district-of-columbia-9-30-club-2027-04-09-6-pm/concert/18637352 | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | add (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | fantasia | verify (applied) | 18629228 | https://seatgeek.com/fantasia-tickets/saint-louis-missouri-enterprise-center-2027-04-09-8-pm/concert/18629228 | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | hans-zimmer | verify (applied) | 18601954 | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | the-interrupters | verify (applied) | 18613159 | https://seatgeek.com/the-interrupters-tickets/toronto-canada-history-2027-04-10-6-pm/concert/18613159 | - |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | john-mayer | verify (applied) | 18626621 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 | - |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | the-interrupters | verify (applied) | 18612707 | https://seatgeek.com/the-interrupters-tickets/london-canada-london-music-hall-2027-04-11-6-pm/concert/18612707 | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | lukas-graham | verify (applied) | 18617871 | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | hans-zimmer | verify (applied) | 18601957 | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | john-mayer | verify (applied) | 18626620 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 | - |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | niall-horan | verify (applied) | 18235530 | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | nothing-but-thieves | verify (applied) | 18266356 | https://seatgeek.com/nothing-but-thieves-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-12-7-30-pm/concert/18266356 | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | nothing-but-thieves | verify (applied) | 18266354 | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 | - |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | the-interrupters | verify (applied) | 18613142 | https://seatgeek.com/the-interrupters-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-14-6-pm/concert/18613142 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | add (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | nothing-but-thieves | verify (applied) | 18266355 | https://seatgeek.com/nothing-but-thieves-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-15-8-pm/concert/18266355 | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | carly-rae-jepsen | verify (applied) | 18639050 | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | john-mayer | verify (applied) | 18626619 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 | - |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-houston-g5diz_kenctep | mei-semones | verify (applied) | 18638869 | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | carly-rae-jepsen | verify (applied) | 18639051 | https://seatgeek.com/carly-rae-jepsen-tickets/calgary-canada-grey-eagle-event-centre-2027-04-16-7-30-pm/concert/18639051 | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | luke-combs | verify (applied) | 18493404 | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | nothing-but-thieves | verify (applied) | 18266362 | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | niall-horan | verify (applied) | 18235541 | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | fantasia | verify (applied) | 18631704 | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | add (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | john-mayer | verify (applied) | 18626618 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | john-mayer | verify (applied) | 18626617 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 | - |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | hazlett | verify (applied) | 18311905 | https://seatgeek.com/hazlett-tickets/charlotte-north-carolina-neighborhood-theatre-2027-04-19-8-pm/concert/18311905 | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | ha-ash | verify (applied) | 18608865 | https://seatgeek.com/ha-ash-tickets/toronto-canada-meridian-hall-2027-04-20-8-pm/concert/18608865 | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | saint-levant | verify (applied) | 18386196 | https://seatgeek.com/saint-levant-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2027-04-20-8-pm/concert/18386196 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | add (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | add (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | add (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | leon-bridges | verify (applied) | 18662691 | https://seatgeek.com/leon-bridges-tickets/fort-worth-texas-dickies-arena-2027-04-23-7-pm/concert/18662691 | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | fontaines-d-c | verify (applied) | 18642821 | https://seatgeek.com/fontaines-d-c-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-04-24-7-pm/concert/18642821 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | add (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | the-psychedelic-furs | verify (applied) | 18592683 | https://seatgeek.com/the-psychedelic-furs-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-04-24-8-pm/concert/18592683 | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | mei-semones | verify (applied) | 18637391 | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | hazlett | verify (applied) | 18649783 | https://seatgeek.com/hazlett-tickets/new-york-new-york-irving-plaza-2027-04-27-7-pm/concert/18649783 | - |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | leon-bridges | verify (applied) | 18662696 | https://seatgeek.com/leon-bridges-tickets/toronto-canada-scotiabank-arena-2027-04-27-7-pm/concert/18662696 | - |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | mei-semones | verify (applied) | 18637753 | https://seatgeek.com/mei-semones-tickets/vancouver-canada-commodore-ballroom-2027-04-27-7-pm/concert/18637753 | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | fontaines-d-c | verify (applied) | 18642820 | https://seatgeek.com/fontaines-d-c-tickets/chicago-illinois-the-salt-shed-outdoors-2027-04-28-7-pm/concert/18642820 | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | mei-semones | verify (applied) | 18637789 | https://seatgeek.com/mei-semones-tickets/seattle-washington-neptune-theatre-wa-2027-04-28-8-pm/concert/18637789 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | john-mayer | verify (applied) | 18659121 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-28-8-pm/concert/18659121 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | add (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | john-mayer | verify (applied) | 18659117 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-30-8-pm/concert/18659117 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | leon-bridges | verify (applied) | 18662692 | https://seatgeek.com/leon-bridges-tickets/new-york-new-york-madison-square-garden-2027-05-01-7-pm/concert/18662692 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | john-mayer | verify (applied) | 18659119 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-01-8-pm/concert/18659119 | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | john-mayer | verify (applied) | 18659122 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-05-8-pm/concert/18659122 | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | the-warning | verify (applied) | 18590369 | https://seatgeek.com/the-warning-tickets/detroit-michigan-the-fillmore-detroit-2027-05-06-7-pm/concert/18590369 | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | riley-green | verify (applied) | 18626522 | https://seatgeek.com/riley-green-tickets/fort-worth-texas-dickies-arena-2027-05-06-7-pm/concert/18626522 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | ha-ash | verify (applied) | 18608844 | https://seatgeek.com/ha-ash-tickets/san-jose-california-san-jose-civic-2027-05-06-8-pm/concert/18608844 | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | fantasia | verify (applied) | 18629225 | https://seatgeek.com/fantasia-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-05-07-8-pm/concert/18629225 | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | carly-rae-jepsen | verify (applied) | 18639026 | https://seatgeek.com/carly-rae-jepsen-tickets/austin-texas-moody-amphitheater-2027-05-07-7-pm/concert/18639026 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | luke-combs | verify (applied) | 18493401 | https://seatgeek.com/luke-combs-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-08-5-45-pm/concert/18493401 | - |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | mei-semones | verify (applied) | 18638032 | https://seatgeek.com/mei-semones-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-05-08-7-pm/concert/18638032 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | josiah-queen | verify (applied) | 18574530 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-08-7-pm/concert/18574530 | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | carly-rae-jepsen | verify (applied) | 18639028 | https://seatgeek.com/carly-rae-jepsen-tickets/houston-texas-713-music-hall-2027-05-08-7-30-pm/concert/18639028 | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | metallica | verify (applied) | 18595110 | https://seatgeek.com/metallica-tickets/vancouver-canada-bc-place-stadium-2027-05-08-6-pm/concert/18595110 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | add (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | hazlett | verify (applied) | 18649795 | https://seatgeek.com/hazlett-tickets/toronto-canada-the-danforth-music-hall-2027-05-09-7-pm/concert/18649795 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | carly-rae-jepsen | verify (applied) | 18639033 | https://seatgeek.com/carly-rae-jepsen-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-11-8-pm/concert/18639033 | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | carly-rae-jepsen | verify (applied) | 18639034 | https://seatgeek.com/carly-rae-jepsen-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-05-12-7-30-pm/concert/18639034 | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | ha-ash | verify (applied) | 18608852 | https://seatgeek.com/ha-ash-tickets/el-paso-texas-el-paso-county-coliseum-2027-05-12-7-pm/concert/18608852 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | santana | verify (applied) | 18628833 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-12-7-pm/concert/18628833 | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | metallica | verify (applied) | 18595090 | https://seatgeek.com/metallica-tickets/san-diego-california-snapdragon-stadium-2027-05-13-6-pm/concert/18595090 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | santana | verify (applied) | 18628834 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-13-7-pm/concert/18628834 | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | carly-rae-jepsen | verify (applied) | 18639035 | https://seatgeek.com/carly-rae-jepsen-tickets/washington-district-of-columbia-the-anthem-dc-2027-05-14-7-30-pm/concert/18639035 | - |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | niall-horan | verify (applied) | 18235548 | https://seatgeek.com/niall-horan-tickets/austin-texas-moody-center-atx-2027-05-14-7-30-pm/concert/18235548 | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | ha-ash | verify (applied) | 18608853 | https://seatgeek.com/ha-ash-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-14-8-pm/concert/18608853 | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | fantasia | verify (applied) | 18629275 | https://seatgeek.com/fantasia-tickets/chicago-illinois-united-center-2027-05-14-8-pm/concert/18629275 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | fantasia | verify (applied) | 18631687 | https://seatgeek.com/fantasia-tickets/detroit-michigan-little-caesars-arena-2027-05-15-8-pm/concert/18631687 | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | carly-rae-jepsen | verify (applied) | 18639037 | https://seatgeek.com/carly-rae-jepsen-tickets/new-york-new-york-madison-square-garden-2027-05-15-7-30-pm/concert/18639037 | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | ha-ash | verify (applied) | 18608854 | https://seatgeek.com/ha-ash-tickets/hidalgo-texas-payne-arena-2027-05-15-8-pm/concert/18608854 | - |

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
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-san-francisco-z7r9jz1a70i80 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
