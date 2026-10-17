# SeatGeek CTA verification log

Generated: 2026-10-17T20:38:10.386Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1146 (needs_recheck: 732, provenance backfill: 102, stale re-check: 695)
- Events skipped before API checks: 209
- API calls made: 400
- Verified provenance written: 98
- URLs added: 43
- URLs corrected: 0
- URLs cleared: 2
- Provenance un-verified: 6
- Conflicts (ambiguous, untouched): 1
- No qualifying listing: 242
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | blue-october | verify (applied) | 18142048 | https://seatgeek.com/blue-october-tickets/la-vista-nebraska-the-astro-theater-la-vista-2026-12-05-8-pm/concert/18142048 | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | the-red-clay-strays | add (applied) | 18257194 | https://seatgeek.com/the-red-clay-strays-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-12-05-6-30-pm/concert/18257194 | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | jonas-brothers | verify (applied) | 18503920 | https://seatgeek.com/jonas-brothers-tickets/seattle-washington-climate-pledge-arena-2026-12-05-7-30-pm/concert/18503920 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | eagles | verify (applied) | 18355050 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-05-8-30-pm/concert/18355050 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | riley-green | add (applied) | 18282384 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-06-8-30-pm/concert/18282384 | - |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | jonas-brothers | add (applied) | 18471182 | https://seatgeek.com/jonas-brothers-tickets/salt-lake-city-utah-delta-center-1-2026-12-07-7-30-pm/concert/18471182 | - |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | blue-october | add (applied) | 18147877 | https://seatgeek.com/blue-october-tickets/little-rock-arkansas-the-hall-little-rock-2026-12-09-7-pm/concert/18147877 | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | jonas-brothers | verify (applied) | 18503921 | https://seatgeek.com/jonas-brothers-tickets/denver-colorado-ball-arena-2026-12-09-7-30-pm/concert/18503921 | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | jonas-brothers | verify (applied) | 18503923 | https://seatgeek.com/jonas-brothers-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-12-10-7-30-pm/concert/18503923 | - |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | riley-green | add (applied) | 18282386 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-10-8-30-pm/concert/18282386 | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | trivium | verify (applied) | 18391984 | https://seatgeek.com/trivium-tickets/reno-nevada-grand-sierra-resort-2026-12-11-6-35-pm/concert/18391984 | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | brent-faiyaz | add (applied) | 18619390 | https://seatgeek.com/brent-faiyaz-tickets/los-angeles-california-crypto-com-arena-2026-12-11-8-pm/concert/18619390 | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | eagles | verify (applied) | 18355052 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-11-8-30-pm/concert/18355052 | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | pink-martini | add (applied) | 18670209 | https://seatgeek.com/pink-martini-tickets/lebanon-new-hampshire-lebanon-opera-house-2026-12-12-7-30-pm/concert/18670209 | - |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | janet-jackson | add (applied) | 18443314 | https://seatgeek.com/janet-jackson-tickets/sunrise-florida-amerant-bank-arena-2026-12-12-8-pm/concert/18443314 | - |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | jonas-brothers | verify (applied) | 18503922 | https://seatgeek.com/jonas-brothers-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2026-12-12-7-30-pm/concert/18503922 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | eagles | verify (applied) | 18355051 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 | - |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | jonas-brothers | verify (applied) | 18503930 | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 | - |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | jonas-brothers | verify (applied) | 18503931 | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | nickelback | verify (applied) | 18629578 | https://seatgeek.com/nickelback-tickets/durant-oklahoma-choctaw-grand-theater-2026-12-19-8-pm/concert/18629578 | - |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | a-perfect-circle | verify (applied) | 18246867 | https://seatgeek.com/a-perfect-circle-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-12-19-8-pm/concert/18246867 | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | jonas-brothers | verify (applied) | 18503932 | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-21-7-30-pm/concert/18503932 | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqwir3 | backstreet-boys | verify (applied) | 18513686 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-26-8-pm/concert/18513686 | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqtbry | backstreet-boys | verify (applied) | 18513688 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-27-8-pm/concert/18513688 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | add (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | backstreet-boys | verify (applied) | 18470170 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-31-10-pm/concert/18470170 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | backstreet-boys | verify (applied) | 18470178 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-01-8-pm/concert/18470178 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | backstreet-boys | verify (applied) | 18470180 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-02-8-pm/concert/18470180 | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | lionel-richie | verify (applied) | 18405682 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-08-8-pm/concert/18405682 | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | add (applied) | 18690599 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-21-8-pm/concert/18690599 | - |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | add (applied) | 18690598 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-22-8-pm/concert/18690598 | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | tommy-emmanuel | add (applied) | 18690443 | https://seatgeek.com/tommy-emmanuel-tickets/champaign-illinois-virginia-theatre-2027-01-26-7-30-pm/concert/18690443 | - |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | add (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | add (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | nickelback | add (applied) | 18604483 | https://seatgeek.com/nickelback-tickets/cleveland-ohio-rocket-arena-2027-02-12-6-30-pm/concert/18604483 | - |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-chicago-z7r9jz1aavzfy | valley | add (applied) | 18684172 | https://seatgeek.com/valley-tickets/chicago-illinois-park-west-2027-02-12-7-30-pm/concert/18684172 | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | add (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | add (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | add (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | the-lemonheads | add (applied) | 18595335 | https://seatgeek.com/the-lemonheads-tickets/portland-oregon-hawthorne-theatre-2027-03-10-7-pm/concert/18595335 | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | fantasia | add (applied) | 18643133 | https://seatgeek.com/fantasia-tickets/houston-texas-toyota-center-2027-03-12-8-pm/concert/18643133 | - |
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
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-minneapolis-z7r9jz1aa7eoa | def-leppard | add (applied) | 18662396 | https://seatgeek.com/def-leppard-tickets/minneapolis-minnesota-target-center-2027-03-27-7-pm/concert/18662396 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-saint-paul-z7r9jz1aa774k | nickelback | add (applied) | 18655421 | https://seatgeek.com/nickelback-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-30-6-30-pm/concert/18655421 | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-salt-lake-city-z7r9jz1aa7eo3 | def-leppard | add (applied) | 18274784 | https://seatgeek.com/def-leppard-tickets/salt-lake-city-utah-delta-center-1-2027-03-31-7-pm/concert/18274784 | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | add (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | add (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | add (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | add (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | add (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | add (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | add (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | santana | verify (applied) | 18628836 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-15-7-pm/concert/18628836 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2027-denver-g5vzz_1lspoiu | niall-horan | verify (applied) | 18235553 | https://seatgeek.com/niall-horan-tickets/denver-colorado-ball-arena-2027-05-16-7-30-pm/concert/18235553 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | santana | verify (applied) | 18628837 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-16-7-pm/concert/18628837 | - |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-brooklyn-k7vgf_3iu7xhd | the-warning | verify (applied) | 18591270 | https://seatgeek.com/the-warning-tickets/brooklyn-new-york-brooklyn-paramount-2027-05-18-7-pm/concert/18591270 | - |
| tm-metallica-2027-el-paso-vvg1yz_3zjrn4d | metallica | verify (applied) | 18595088 | https://seatgeek.com/metallica-tickets/el-paso-texas-sun-bowl-stadium-2027-05-18-6-pm/concert/18595088 | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2027-west-valley-city-g5vzz_1xafaiw | niall-horan | verify (applied) | 18235554 | https://seatgeek.com/niall-horan-tickets/west-valley-city-utah-maverik-center-2027-05-18-7-30-pm/concert/18235554 | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-boston-vv177z_kgklscrut | carly-rae-jepsen | verify (applied) | 18639042 | https://seatgeek.com/carly-rae-jepsen-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-19-7-30-pm/concert/18639042 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | niall-horan | verify (applied) | 18235556 | https://seatgeek.com/niall-horan-tickets/phoenix-arizona-mortgage-matchup-center-2027-05-20-7-30-pm/concert/18235556 | - |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | the-airborne-toxic-event | verify (applied) | 18252225 | https://seatgeek.com/the-airborne-toxic-event-tickets/new-york-new-york-irving-plaza-2027-05-21-7-pm/concert/18252225 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | harry-styles | verify (applied) | 18579683 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-21-7-45-pm/concert/18579683 | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | metallica | verify (applied) | 18595099 | https://seatgeek.com/metallica-tickets/san-antonio-texas-alamodome-2027-05-22-6-pm/concert/18595099 | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | carly-rae-jepsen | verify (applied) | 18639046 | https://seatgeek.com/carly-rae-jepsen-tickets/detroit-michigan-fox-theatre-detroit-2027-05-22-7-30-pm/concert/18639046 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | harry-styles | verify (applied) | 18579676 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-22-7-45-pm/concert/18579676 | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | fantasia | verify (applied) | 18629280 | https://seatgeek.com/fantasia-tickets/newark-new-jersey-prudential-center-2027-05-22-8-pm/concert/18629280 | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | riley-green | verify (applied) | 18626529 | https://seatgeek.com/riley-green-tickets/lafayette-louisiana-cajundome-2027-05-22-7-pm/concert/18626529 | - |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | the-airborne-toxic-event | verify (applied) | 18252179 | https://seatgeek.com/the-airborne-toxic-event-tickets/boston-massachusetts-orpheum-theatre-boston-2027-05-22-8-pm/concert/18252179 | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | niall-horan | verify (applied) | 18235557 | https://seatgeek.com/niall-horan-tickets/inglewood-california-kia-forum-2027-05-22-7-30-pm/concert/18235557 | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | the-warning | verify (applied) | 18591764 | https://seatgeek.com/the-warning-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-23-8-pm/concert/18591764 | - |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | the-airborne-toxic-event | verify (applied) | 18251734 | https://seatgeek.com/the-airborne-toxic-event-tickets/detroit-michigan-saint-andrews-hall-2027-05-25-7-pm/concert/18251734 | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | niall-horan | verify (applied) | 18235559 | https://seatgeek.com/niall-horan-tickets/san-francisco-california-chase-center-2027-05-25-7-30-pm/concert/18235559 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | the-airborne-toxic-event | verify (applied) | 18252640 | https://seatgeek.com/the-airborne-toxic-event-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-05-27-7-pm/concert/18252640 | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | niall-horan | verify (applied) | 18235558 | https://seatgeek.com/niall-horan-tickets/seattle-washington-climate-pledge-arena-2027-05-27-7-30-pm/concert/18235558 | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | harry-styles | verify (applied) | 18579673 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-28-7-45-pm/concert/18579673 | - |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | a-perfect-circle | verify (applied) | 18632545 | https://seatgeek.com/a-perfect-circle-tickets/west-valley-city-utah-maverik-center-2027-05-28-7-30-pm/concert/18632545 | - |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | kenny-chesney | verify (applied) | 18591992 | https://seatgeek.com/kenny-chesney-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-29-4-30-pm/concert/18591992 | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | luke-combs | verify (applied) | 18493413 | https://seatgeek.com/luke-combs-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-05-29-5-20-pm/concert/18493413 | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | metallica | verify (applied) | 18595091 | https://seatgeek.com/metallica-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-29-6-pm/concert/18595091 | - |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | carly-rae-jepsen | verify (applied) | 18639059 | https://seatgeek.com/carly-rae-jepsen-tickets/montreal-canada-mtelus-2027-05-29-7-30-pm/concert/18639059 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | harry-styles | verify (applied) | 18579687 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-29-7-45-pm/concert/18579687 | - |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | a-perfect-circle | verify (applied) | 18632547 | https://seatgeek.com/a-perfect-circle-tickets/seattle-washington-climate-pledge-arena-2027-05-30-7-30-pm/concert/18632547 | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | fkj | verify (applied) | 18281480 | https://seatgeek.com/fkj-tickets/montreal-canada-mtelus-2027-05-31-8-pm/concert/18281480 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | harry-styles | verify (applied) | 18593728 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-31-7-45-pm/concert/18593728 | - |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-boston-vvg17z_5ryet2j | fkj | verify (applied) | 18281797 | https://seatgeek.com/fkj-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-06-01-8-pm/concert/18281797 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | add (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | a-perfect-circle | verify (applied) | 18632549 | https://seatgeek.com/a-perfect-circle-tickets/reno-nevada-grand-sierra-resort-2027-06-03-8-pm/concert/18632549 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | fkj | verify (applied) | 18281667 | https://seatgeek.com/fkj-tickets/brooklyn-new-york-brooklyn-paramount-2027-06-04-8-pm/concert/18281667 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | harry-styles | verify (applied) | 18592375 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-04-7-45-pm/concert/18592375 | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | metallica | verify (applied) | 18595098 | https://seatgeek.com/metallica-tickets/indianapolis-indiana-lucas-oil-stadium-2027-06-05-6-pm/concert/18595098 | - |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | luke-combs | verify (applied) | 18493415 | https://seatgeek.com/luke-combs-tickets/vancouver-canada-bc-place-stadium-2027-06-05-5-20-pm/concert/18493415 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | harry-styles | verify (applied) | 18592376 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-05-7-45-pm/concert/18592376 | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | fkj | verify (applied) | 18281742 | https://seatgeek.com/fkj-tickets/washington-district-of-columbia-the-anthem-dc-2027-06-07-7-30-pm/concert/18281742 | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | def-leppard | verify (applied) | 18662434 | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | metallica | verify (applied) | 18595100 | https://seatgeek.com/metallica-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-08-6-pm/concert/18595100 | - |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | fkj | verify (applied) | 18281290 | https://seatgeek.com/fkj-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-06-09-8-pm/concert/18281290 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf9 | john-mayer | verify (applied) | 18675251 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-09-8-pm/concert/18675251 | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-houston-g5diz_5msvufk | fkj | verify (applied) | 18281428 | https://seatgeek.com/fkj-tickets/houston-texas-bayou-music-center-2027-06-11-8-pm/concert/18281428 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yuf_ | john-mayer | verify (applied) | 18675252 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-11-8-pm/concert/18675252 | - |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | kenny-chesney | verify (applied) | 18591995 | https://seatgeek.com/kenny-chesney-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-06-12-4-30-pm/concert/18591995 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yufh | john-mayer | verify (applied) | 18675253 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-12-8-pm/concert/18675253 | - |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | fkj | verify (applied) | 18281495 | https://seatgeek.com/fkj-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-06-14-8-pm/concert/18281495 | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | metallica | verify (applied) | 18595103 | https://seatgeek.com/metallica-tickets/cleveland-ohio-huntington-bank-field-2027-06-15-6-pm/concert/18595103 | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | luke-combs | verify (applied) | 18493411 | https://seatgeek.com/luke-combs-tickets/denver-colorado-empower-field-at-mile-high-2027-06-19-5-45-pm/concert/18493411 | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | metallica | verify (applied) | 18595107 | https://seatgeek.com/metallica-tickets/salt-lake-city-utah-rice-eccles-stadium-2027-06-19-6-pm/concert/18595107 | - |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | add (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | yacht-rock-revue | verify (applied) | 18587856 | https://seatgeek.com/yacht-rock-revue-tickets/chicago-illinois-the-salt-shed-outdoors-2027-06-25-6-30-pm/concert/18587856 | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | kenny-chesney | verify (applied) | 18592003 | https://seatgeek.com/kenny-chesney-tickets/chicago-illinois-soldier-field-2027-06-26-4-30-pm/concert/18592003 | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | luke-combs | verify (applied) | 18493412 | https://seatgeek.com/luke-combs-tickets/san-diego-california-petco-park-2027-06-26-5-45-pm/concert/18493412 | - |
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
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | slipknot | verify (applied) | 18626597 | https://seatgeek.com/slipknot-tickets/washington-district-of-columbia-nationals-park-2027-07-16-6-30-pm/concert/18626597 | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | leon-bridges | verify (applied) | 18662695 | https://seatgeek.com/leon-bridges-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-07-16-7-30-pm/concert/18662695 | - |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | leon-bridges | verify (applied) | 18662694 | https://seatgeek.com/leon-bridges-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-07-17-8-pm/concert/18662694 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | add (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | slipknot | verify (applied) | 18626589 | https://seatgeek.com/slipknot-tickets/montreal-canada-parc-jean-drapeau-2027-07-21-6-30-pm/concert/18626589 | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | leon-bridges | verify (applied) | 18662705 | https://seatgeek.com/leon-bridges-tickets/wilmington-north-carolina-live-oak-bank-pavilion-2027-07-21-7-pm/concert/18662705 | - |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | slipknot | verify (applied) | 18626595 | https://seatgeek.com/slipknot-tickets/toronto-canada-rogers-stadium-toronto-2027-07-23-6-30-pm/concert/18626595 | - |
| tm-leon-bridges-2027-columbia-1avfz_fqmqezd586 | leon-bridges | verify (applied) | 18662706 | https://seatgeek.com/leon-bridges-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-23-7-pm/concert/18662706 | - |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-mansfield-vv1avzkfwgke0hynm | riley-green | verify (applied) | 18626547 | https://seatgeek.com/riley-green-tickets/mansfield-massachusetts-xfinity-center-ma-2027-07-24-7-pm/concert/18626547 | - |
| tm-leon-bridges-2027-boston-vv177z_kgkikdrri | leon-bridges | verify (applied) | 18662708 | https://seatgeek.com/leon-bridges-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-07-24-8-pm/concert/18662708 | - |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | slipknot | verify (applied) | 18626573 | https://seatgeek.com/slipknot-tickets/chicago-illinois-soldier-field-2027-07-25-6-30-pm/concert/18626573 | - |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | slipknot | verify (applied) | 18626575 | https://seatgeek.com/slipknot-tickets/hershey-pennsylvania-hersheypark-stadium-2027-07-28-6-30-pm/concert/18626575 | - |
| tm-leon-bridges-2027-philadelphia-vv17fz_kgkbngqe2 | leon-bridges | verify (applied) | 18662710 | https://seatgeek.com/leon-bridges-tickets/philadelphia-pennsylvania-td-pavilion-at-the-mann-center-2027-07-28-7-30-pm/concert/18662710 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | riley-green | verify (applied) | 18626549 | https://seatgeek.com/riley-green-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2027-07-30-7-pm/concert/18626549 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-atlanta-vvg1zz_3x03by9 | kenny-chesney | verify (applied) | 18592008 | https://seatgeek.com/kenny-chesney-tickets/atlanta-georgia-mercedes-benz-stadium-2027-07-31-4-30-pm/concert/18592008 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | add (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | add (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | add (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-slipknot-2027-houston-g5diz_kx0z68q | slipknot | verify (applied) | 18626578 | https://seatgeek.com/slipknot-tickets/houston-texas-daikin-park-2027-08-06-6-30-pm/concert/18626578 | - |
| tm-kenny-chesney-2027-east-rutherford-k7vgf_3cwtd0z | kenny-chesney | verify (applied) | 18592014 | https://seatgeek.com/kenny-chesney-tickets/east-rutherford-new-jersey-metlife-stadium-2027-08-07-4-30-pm/concert/18592014 | - |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | slipknot | verify (applied) | 18626584 | https://seatgeek.com/slipknot-tickets/commerce-city-colorado-dick-s-sporting-goods-park-2027-08-09-6-30-pm/concert/18626584 | - |
| tm-oasis-2027-foxborough-vv1avzkftgkehnj-e | oasis | verify (applied) | 18589077 | https://seatgeek.com/oasis-tickets/foxborough-massachusetts-gillette-stadium-2027-08-10-7-pm/concert/18589077 | - |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | slipknot | verify (applied) | 18626585 | https://seatgeek.com/slipknot-tickets/inglewood-california-sofi-stadium-2027-08-13-6-30-pm/concert/18626585 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | add (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | leon-bridges | verify (applied) | 18662723 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-18-7-30-pm/concert/18662723 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | leon-bridges | verify (applied) | 18662724 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-19-7-30-pm/concert/18662724 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | add (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | add (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | add (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | add (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | eros-ramazzotti | verify (applied) | 17481793 | https://seatgeek.com/eros-ramazzotti-tickets/toronto-canada-coca-cola-coliseum-2027-09-24-8-pm/concert/17481793 | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | fontaines-d-c | verify (applied) | 18642838 | https://seatgeek.com/fontaines-d-c-tickets/toronto-canada-scotiabank-arena-2027-09-26-8-pm/concert/18642838 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | add (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18155896 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | harry-styles | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18027131 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-summer-walker-2026-chicago-vvg18z_uroiect | summer-walker | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18328041 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18175623 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-bruno-mars-2026-vancouver-1av7z_egkshvjex | bruno-mars | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18013263 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18259846 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |

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
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
