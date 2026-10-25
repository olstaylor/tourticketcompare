# SeatGeek CTA verification log

Generated: 2026-10-24T21:03:01.605Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1895 (needs_recheck: 790, provenance backfill: 16, stale re-check: 1574)
- Events skipped before API checks: 275
- API calls made: 800
- Verified provenance written: 457
- URLs added: 6
- URLs corrected: 0
- URLs cleared: 1
- Provenance un-verified: 15
- Conflicts (ambiguous, untouched): 3
- No qualifying listing: 302
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | add (applied) | 18141040 | https://seatgeek.com/turnpike-troubadours-tickets/saint-augustine-florida-st-augustine-amphitheatre-2026-10-24-6-30-pm/concert/18141040 | - |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | add (applied) | 18141064 | https://seatgeek.com/turnpike-troubadours-tickets/clearwater-florida-the-baycare-sound-at-coachman-park-2026-10-25-6-pm/concert/18141064 | - |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | verify (applied) | 18194417 | https://seatgeek.com/beck-tickets/washington-district-of-columbia-the-anthem-dc-2026-10-25-7-30-pm/concert/18194417 | - |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beck-2026-durham-g5evz_fbugjju | beck | verify (applied) | 18194420 | https://seatgeek.com/beck-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2026-10-27-8-pm/concert/18194420 | - |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | verify (applied) | 18194423 | https://seatgeek.com/beck-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2026-10-28-8-pm/concert/18194423 | - |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-charlotte-g5evz_kjjq1qk | gavin-adcock | verify (applied) | 18126519 | https://seatgeek.com/gavin-adcock-tickets/charlotte-north-carolina-bojangles-coliseum-2026-10-29-7-pm/concert/18126519 | - |
| tm-the-airborne-toxic-event-2026-chicago-z7r9jz1a70iqs | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-savannah-vvg1zz_kjxemhw | gavin-adcock | verify (applied) | 18127641 | https://seatgeek.com/gavin-adcock-tickets/savannah-georgia-enmarket-arena-2026-10-30-6-pm/concert/18127641 | - |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | verify (applied) | 18194424 | https://seatgeek.com/beck-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-10-30-8-pm/concert/18194424 | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-estero-vvg1vz_kjvgfqs | gavin-adcock | verify (applied) | 18126382 | https://seatgeek.com/gavin-adcock-tickets/estero-florida-hertz-arena-2026-10-31-8-pm/concert/18126382 | - |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | verify (applied) | 18126028 | https://seatgeek.com/beck-tickets/nashville-tennessee-the-truth-nashville-2026-10-31-8-pm/concert/18126028 | - |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | conflict | - | - | ambiguous: 3 qualifying SeatGeek events in the window |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | add (applied) | 18629796 | https://seatgeek.com/beck-tickets/spokane-washington-first-interstate-center-for-the-arts-2026-11-06-7-30-pm/concert/18629796 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | verify (applied) | 18590355 | https://seatgeek.com/beck-tickets/seattle-washington-benaroya-hall-2026-11-08-7-pm/concert/18590355 | - |
| tm-beck-2026-vancouver-1aozk3a0babze8k | beck | verify (applied) | 18194425 | https://seatgeek.com/beck-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2026-11-09-8-pm/concert/18194425 | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | add (applied) | 18194387 | https://seatgeek.com/beck-tickets/portland-oregon-keller-auditorium-2026-11-10-8-pm/concert/18194387 | - |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | garth-brooks | verify (applied) | 18715553 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-12-7-30-pm/concert/18715553 | - |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-turnpike-troubadours-2026-las-vegas-17ayv0g62soqkki | turnpike-troubadours | verify (applied) | 18424535 | https://seatgeek.com/turnpike-troubadours-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2026-12-11-9-pm/concert/18424535 | - |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-san-francisco-g5vyz_ok5hlnw | stella-lefty | verify (applied) | 18527894 | https://seatgeek.com/stella-lefty-tickets/san-francisco-california-the-masonic-san-francisco-2027-02-09-8-pm/concert/18527894 | - |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cleveland-vvg1fz_uzuo2ng | pink-martini | verify (applied) | 18358276 | https://seatgeek.com/pink-martini-tickets/cleveland-ohio-gartner-auditorium-2027-02-10-7-pm/concert/18358276 | - |
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
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-needtobreathe-2027-omaha-1aezz_kekbozdu2k | needtobreathe | verify (applied) | 18621525 | https://seatgeek.com/needtobreathe-tickets/omaha-nebraska-steelhouse-omaha-2027-02-18-7-pm/concert/18621525 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-scott-2027-omaha-1aezz_3gknwydtt | dylan-scott | verify (applied) | 18601532 | https://seatgeek.com/dylan-scott-tickets/omaha-nebraska-steelhouse-omaha-2027-02-19-7-pm/concert/18601532 | - |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-reno-17c8v0g61lh4py0 | blue-october | verify (applied) | 18238662 | https://seatgeek.com/blue-october-tickets/reno-nevada-silver-legacy-casino-2027-02-21-7-pm/concert/18238662 | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-milwaukee-vvg1jz_gjngwwq | polyphia | verify (applied) | 18312323 | https://seatgeek.com/polyphia-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-02-24-7-30-pm/concert/18312323 | - |
| tm-tommy-emmanuel-2027-grand-junction-g5vzz_fdgnqkn | tommy-emmanuel | verify (applied) | 18704175 | https://seatgeek.com/tommy-emmanuel-tickets/grand-junction-colorado-avalon-theatre-co-2027-02-24-7-30-pm/concert/18704175 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-detroit-vvg1oz_ge56_sr | polyphia | verify (applied) | 18312333 | https://seatgeek.com/polyphia-tickets/detroit-michigan-the-fillmore-detroit-2027-02-27-7-30-pm/concert/18312333 | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2027-quebec-1fg8vp17a7z7uce8 | hans-zimmer | verify (applied) | 18601958 | https://seatgeek.com/hans-zimmer-tickets/quebec-canada-videotron-centre-2027-02-28-7-30-pm/concert/18601958 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-san-diego-vvg1iz_1wv8vq3 | blondshell | verify (applied) | 18251038 | https://seatgeek.com/blondshell-tickets/san-diego-california-the-observatory-north-park-2027-02-28-7-pm/concert/18251038 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | add (applied) | 18716616 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-28-8-pm/concert/18716616 | - |
| tm-yuridia-2027-san-diego-vvg1iz_3fqrwdv | yuridia | verify (applied) | 18570401 | https://seatgeek.com/yuridia-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-02-28-8-pm/concert/18570401 | - |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-los-angeles-vvg10z_1drttoa | blondshell | verify (applied) | 18251040 | https://seatgeek.com/blondshell-tickets/los-angeles-california-the-wiltern-2027-03-02-7-pm/concert/18251040 | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-philadelphia-vvg1fz_gn-cuhm | polyphia | verify (applied) | 18312344 | https://seatgeek.com/polyphia-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-03-05-7-30-pm/concert/18312344 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | add (applied) | 18717561 | https://seatgeek.com/blue-october-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-05-8-pm/concert/18717561 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-washington-17a8v0g6gmr0lc4 | polyphia | verify (applied) | 18312337 | https://seatgeek.com/polyphia-tickets/washington-district-of-columbia-echostage-2027-03-09-7-30-pm/concert/18312337 | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-raleigh-g5evz_oemqprp | polyphia | verify (applied) | 18312346 | https://seatgeek.com/polyphia-tickets/raleigh-north-carolina-the-ritz-raleigh-2027-03-10-5-30-pm/concert/18312346 | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-quebec-1aszk4agkesu4rw | def-leppard | verify (applied) | 18662458 | https://seatgeek.com/def-leppard-tickets/quebec-canada-videotron-centre-2027-03-11-7-30-pm/concert/18662458 | - |
| tm-blondshell-2027-minneapolis-vvg1bz_1dodkri | blondshell | verify (applied) | 18251039 | https://seatgeek.com/blondshell-tickets/minneapolis-minnesota-varsity-theater-minneapolis-2027-03-11-7-pm/concert/18251039 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-washington-17a8v0g61wjljxg | blondshell | verify (applied) | 18251055 | https://seatgeek.com/blondshell-tickets/washington-district-of-columbia-9-30-club-2027-03-15-7-pm/concert/18251055 | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2027-atlanta-vvg1zz_gwmeyrd | polyphia | verify (applied) | 18312348 | https://seatgeek.com/polyphia-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-16-7-30-pm/concert/18312348 | - |
| tm-tobymac-2027-sioux-falls-vv1akzkg_gkd7w414 | tobymac | verify (applied) | 18175905 | https://seatgeek.com/tobymac-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-03-16-7-pm/concert/18175905 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-boston-vvg17z_1uqvup8 | blondshell | verify (applied) | 18251060 | https://seatgeek.com/blondshell-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-18-7-pm/concert/18251060 | - |
| tm-polyphia-2027-nashville-g5viz_gnfsyiq | polyphia | verify (applied) | 18312351 | https://seatgeek.com/polyphia-tickets/nashville-tennessee-the-truth-nashville-2027-03-18-7-30-pm/concert/18312351 | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-montreal-17g8v0g61mppmq0 | blondshell | verify (applied) | 18251053 | https://seatgeek.com/blondshell-tickets/montreal-canada-beanfield-theatre-2027-03-19-8-pm/concert/18251053 | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-san-antonio-g5diz_a6js1qk | the-psychedelic-furs | verify (applied) | 18092201 | https://seatgeek.com/the-psychedelic-furs-tickets/san-antonio-texas-aztec-theatre-2027-03-24-8-pm/concert/18092201 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-boston-vvg17z_cxqdi4_ | saint-levant | verify (applied) | 18386180 | https://seatgeek.com/saint-levant-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-27-7-pm/concert/18386180 | - |
| tm-the-psychedelic-furs-2027-houston-g5diz_a5ghu6h | the-psychedelic-furs | verify (applied) | 18091246 | https://seatgeek.com/the-psychedelic-furs-tickets/houston-texas-house-of-blues-houston-2027-03-27-7-pm/concert/18091246 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-dallas-vvg1yz_a29lq69 | the-psychedelic-furs | verify (applied) | 18091081 | https://seatgeek.com/the-psychedelic-furs-tickets/dallas-texas-house-of-blues-dallas-2027-03-28-6-30-pm/concert/18091081 | - |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-new-orleans-g5viz_ad68eh6 | the-psychedelic-furs | verify (applied) | 18592667 | https://seatgeek.com/the-psychedelic-furs-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-04-04-7-pm/concert/18592667 | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-detroit-vvg1oz_cxteu1p | saint-levant | verify (applied) | 18386182 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-06-7-pm/concert/18386182 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-silver-spring-17a8v0g6cjqrj2z | saint-levant | verify (applied) | 18386183 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-09-8-pm/concert/18386183 | - |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | the-psychedelic-furs | verify (applied) | 18592674 | https://seatgeek.com/the-psychedelic-furs-tickets/orlando-florida-hard-rock-live-orlando-2027-04-11-8-pm/concert/18592674 | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | saint-levant | verify (applied) | 18386194 | https://seatgeek.com/saint-levant-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-13-8-pm/concert/18386194 | - |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | saint-levant | verify (applied) | 18384604 | https://seatgeek.com/saint-levant-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-16-8-pm/concert/18384604 | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | the-psychedelic-furs | verify (applied) | 18592676 | https://seatgeek.com/the-psychedelic-furs-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-16-8-pm/concert/18592676 | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | saint-levant | verify (applied) | 18386193 | https://seatgeek.com/saint-levant-tickets/atlanta-georgia-buckhead-theatre-2027-04-18-8-pm/concert/18386193 | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | hazlett | verify (applied) | 18311798 | https://seatgeek.com/hazlett-tickets/charlottesville-virginia-jefferson-theater-charlottesville-va-2027-04-20-8-pm/concert/18311798 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-houston-g5diz_clj5bta | saint-levant | verify (applied) | 18386202 | https://seatgeek.com/saint-levant-tickets/houston-texas-bayou-music-center-2027-04-21-8-pm/concert/18386202 | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-dallas-vvg1yz_cxxtz4x | saint-levant | verify (applied) | 18386201 | https://seatgeek.com/saint-levant-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-04-22-8-pm/concert/18386201 | - |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | hazlett | verify (applied) | 18312117 | https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-7-pm/concert/18312117 | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | saint-levant | verify (applied) | 18386203 | https://seatgeek.com/saint-levant-tickets/denver-colorado-summit-music-hall-denver-2027-04-25-8-pm/concert/18386203 | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | the-psychedelic-furs | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-anaheim-vvg10z_cr0rptv | saint-levant | verify (applied) | 18386213 | https://seatgeek.com/saint-levant-tickets/anaheim-california-house-of-blues-anaheim-2027-04-29-7-pm/concert/18386213 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-portland-vvg17z_grwzm6s | hazlett | verify (applied) | 18649786 | https://seatgeek.com/hazlett-tickets/portland-maine-state-theatre-portland-me-2027-04-30-8-pm/concert/18649786 | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-five-finger-death-punch-2026-bristow-1avfz_egki4tnxq | five-finger-death-punch | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18010608 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-john-summit-2026-montreal-17g8v0g652qqblc | john-summit | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18257269 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mico-2026-austin-g5diz_1wd9gll | mico | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18252102 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-harry-styles-2026-new-york-3b006435069e8398 | harry-styles | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18027138 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-daughtry-2026-danville-vvg17z_gy_imrz | daughtry | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18316789 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-rod-wave-2026-pittsburgh-17aov0g6uky4i7y | rod-wave | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18320056 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-steve-lacy-2026-raleigh-g5evz_8ci0_um | steve-lacy | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18485929 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-arcangel-2026-brooklyn-17gzv0g61ux2pkd | arcangel | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18266317 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dan-shay-2026-rogers-g5viz_1x8yivv | dan-shay | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18250830 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-ty-myers-2026-evansville-vv1aazkowgkd1n5gg | ty-myers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18142342 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-gorillaz-2026-phoenix-1av0z_agknirbye | gorillaz | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18102846 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-amble-2026-los-angeles-vv170z_agkrleod6 | amble | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18223144 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jay-z-2026-inglewood-vvg1iz_gncu5jv | jay-z | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18296599 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-fuerza-regida-2026-wheatland-g5vyz_81rrfk3 | fuerza-regida | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18470188 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl5e46 | earth-wind-fire | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18138585 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | verify (applied) | 18257270 | https://seatgeek.com/john-summit-tickets/hamilton-canada-td-coliseum-2026-10-24-7-pm/concert/18257270 | - |
| tm-journey-2026-baltimore-17a8v0g61kp2ris | journey | verify (applied) | 18237112 | https://seatgeek.com/journey-tickets/baltimore-maryland-cfg-bank-arena-2026-10-24-7-30-pm/concert/18237112 | - |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | verify (applied) | 18142343 | https://seatgeek.com/ty-myers-tickets/pikeville-kentucky-appalachian-wireless-arena-2026-10-24-7-30-pm/concert/18142343 | - |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | harry-styles | verify (applied) | 18027141 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-24-8-pm/concert/18027141 | - |
| tm-mico-2026-houston-g5diz_1ucylhw | mico | verify (applied) | 18252623 | https://seatgeek.com/mico-tickets/houston-texas-white-oak-music-hall-downstairs-2026-10-24-7-pm/concert/18252623 | - |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | verify (applied) | 18250831 | https://seatgeek.com/dan-shay-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2026-10-24-7-pm/concert/18250831 | - |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | verify (applied) | 18300508 | https://seatgeek.com/daughtry-tickets/florence-kentucky-turfway-park-2026-10-24-8-30-pm/concert/18300508 | - |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | verify (applied) | 18126024 | https://seatgeek.com/kevin-gates-tickets/nashville-tennessee-the-truth-nashville-2026-10-24-8-pm/concert/18126024 | - |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | weezer | verify (applied) | 18147549 | https://seatgeek.com/weezer-tickets/los-angeles-california-crypto-com-arena-2026-10-24-7-pm/concert/18147549 | - |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | gorillaz | verify (applied) | 18102848 | https://seatgeek.com/gorillaz-tickets/inglewood-california-kia-forum-2026-10-24-7-30-pm/concert/18102848 | - |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9nqcx | dinosaur-jr | verify (applied) | 18345756 | https://seatgeek.com/dinosaur-jr-tickets/seattle-washington-neptune-theatre-wa-2026-10-24-8-pm/concert/18345756 | - |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | verify (applied) | 18311697 | https://seatgeek.com/amble-tickets/san-francisco-california-the-fillmore-san-francisco-2026-10-24-8-pm/concert/18311697 | - |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | verify (applied) | 18329621 | https://seatgeek.com/beabadoobee-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-24-8-pm/concert/18329621 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | verify (applied) | 18138587 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-24-8-30-pm/concert/18138587 | - |
| tm-sienna-spiro-2026-toronto-177zv0g6g9hzrkw | sienna-spiro | verify (applied) | 18297290 | https://seatgeek.com/sienna-spiro-tickets/toronto-canada-history-2026-10-25-6-pm/concert/18297290 | - |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | verify (applied) | 18257271 | https://seatgeek.com/john-summit-tickets/toronto-canada-scotiabank-arena-2026-10-25-7-pm/concert/18257271 | - |
| tm-journey-2026-newark-vvg1fz_197dnkr | journey | verify (applied) | 18237088 | https://seatgeek.com/journey-tickets/newark-new-jersey-prudential-center-2026-10-25-7-30-pm/concert/18237088 | - |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | verify (applied) | 18319847 | https://seatgeek.com/brand-new-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-25-8-pm/concert/18319847 | - |
| tm-doja-cat-2026-san-francisco-g5vyzbs0ua9tw | doja-cat | verify (applied) | 17769313 | https://seatgeek.com/doja-cat-tickets/san-francisco-california-chase-center-2026-10-25-7-30-pm/concert/17769313 | - |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | gorillaz | verify (applied) | 18102849 | https://seatgeek.com/gorillaz-tickets/san-diego-california-pechanga-arena-san-diego-2026-10-25-7-30-pm/concert/18102849 | - |
| tm-malcolm-todd-2026-phoenix-17k8v0g6g538qi9 | malcolm-todd | verify (applied) | 18292584 | https://seatgeek.com/malcolm-todd-tickets/phoenix-arizona-arizona-financial-theatre-2026-10-25-8-pm/concert/18292584 | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkmwmykb | olivia-rodrigo | verify (applied) | 18211736 | https://seatgeek.com/olivia-rodrigo-tickets/toronto-canada-scotiabank-arena-2026-10-26-7-pm/concert/18211736 | - |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | verify (applied) | 18503890 | https://seatgeek.com/jonas-brothers-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-10-26-7-30-pm/concert/18503890 | - |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | steve-lacy | verify (applied) | 18485930 | https://seatgeek.com/steve-lacy-tickets/miami-florida-fpl-solar-amphitheater-at-bayfront-park-2026-10-26-8-pm/concert/18485930 | - |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | verify (applied) | 18329620 | https://seatgeek.com/beabadoobee-tickets/oakland-california-oakland-arena-2026-10-26-8-pm/concert/18329620 | - |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | arcangel | verify (applied) | 18266319 | https://seatgeek.com/arcangel-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-10-28-8-pm/concert/18266319 | - |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | verify (applied) | 18329623 | https://seatgeek.com/beabadoobee-tickets/vancouver-canada-rogers-arena-2026-10-28-8-pm/concert/18329623 | - |
| tm-mico-2026-washington-17a8v0g61sa7y8c | mico | verify (applied) | 18251761 | https://seatgeek.com/mico-tickets/washington-district-of-columbia-9-30-club-2026-10-29-7-pm/concert/18251761 | - |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | dan-shay | verify (applied) | 18250833 | https://seatgeek.com/dan-shay-tickets/denver-colorado-ball-arena-2026-10-29-7-pm/concert/18250833 | - |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | bryson-tiller | verify (applied) | 18280927 | https://seatgeek.com/bryson-tiller-tickets/portland-oregon-veterans-memorial-coliseum-2-2026-10-29-7-30-pm/concert/18280927 | - |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | verify (applied) | 18329624 | https://seatgeek.com/beabadoobee-tickets/seattle-washington-climate-pledge-arena-2026-10-29-8-pm/concert/18329624 | - |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | verify (applied) | 18091465 | https://seatgeek.com/the-psychedelic-furs-tickets/napa-california-uptown-theatre-napa-2026-10-30-8-pm/concert/18091465 | - |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | verify (applied) | 18370911 | https://seatgeek.com/ricky-martin-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-10-30-8-pm/concert/18370911 | - |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | arcangel | verify (applied) | 18266320 | https://seatgeek.com/arcangel-tickets/rosemont-illinois-rosemont-theatre-2026-10-31-8-pm/concert/18266320 | - |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | verify (applied) | 18370916 | https://seatgeek.com/ricky-martin-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-10-31-8-pm/concert/18370916 | - |
| tm-arcangel-2026-houston-g5diz_53je_pf | arcangel | verify (applied) | 18266325 | https://seatgeek.com/arcangel-tickets/houston-texas-713-music-hall-2026-11-05-8-pm/concert/18266325 | - |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | dan-shay | verify (applied) | 18250836 | https://seatgeek.com/dan-shay-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2026-11-05-7-pm/concert/18250836 | - |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | jonas-brothers | verify (applied) | 18503986 | https://seatgeek.com/jonas-brothers-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-11-06-7-30-pm/concert/18503986 | - |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | dave-matthews-band | verify (applied) | 18474895 | https://seatgeek.com/dave-matthews-band-tickets/nashville-tennessee-bridgestone-arena-2026-11-06-7-30-pm/concert/18474895 | - |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | arcangel | verify (applied) | 18266326 | https://seatgeek.com/arcangel-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-06-8-pm/concert/18266326 | - |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | dan-shay | verify (applied) | 18250837 | https://seatgeek.com/dan-shay-tickets/anaheim-california-honda-center-2026-11-06-7-pm/concert/18250837 | - |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | ricky-martin | verify (applied) | 18318163 | https://seatgeek.com/ricky-martin-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2026-11-06-8-pm/concert/18318163 | - |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | journey | verify (applied) | 18237083 | https://seatgeek.com/journey-tickets/uniondale-new-york-nassau-coliseum-2026-11-07-7-30-pm/concert/18237083 | - |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | verify (applied) | 18474896 | https://seatgeek.com/dave-matthews-band-tickets/chicago-illinois-united-center-2026-11-07-7-30-pm/concert/18474896 | - |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | dan-shay | verify (applied) | 18250838 | https://seatgeek.com/dan-shay-tickets/mountain-view-california-shoreline-amphitheatre-2026-11-07-7-pm/concert/18250838 | - |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | verify (applied) | 18325393 | https://seatgeek.com/ricky-martin-tickets/temecula-california-pechanga-resort-casino-2026-11-08-7-30-pm/concert/18325393 | - |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | verify (applied) | 18091775 | https://seatgeek.com/the-psychedelic-furs-tickets/del-mar-california-the-sound-del-mar-2026-11-08-8-pm/concert/18091775 | - |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | dave-matthews-band | verify (applied) | 18474897 | https://seatgeek.com/dave-matthews-band-tickets/providence-rhode-island-amica-mutual-pavilion-2026-11-09-7-30-pm/concert/18474897 | - |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | verify (applied) | 18474899 | https://seatgeek.com/dave-matthews-band-tickets/baltimore-maryland-cfg-bank-arena-2026-11-10-7-30-pm/concert/18474899 | - |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | verify (applied) | 17732667 | https://seatgeek.com/sabaton-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-11-7-pm/concert/17732667 | - |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | verify (applied) | 18240151 | https://seatgeek.com/katseye-tickets/dallas-texas-american-airlines-center-2026-11-11-8-pm/concert/18240151 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | verify (applied) | 18474900 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-12-7-30-pm/concert/18474900 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | sienna-spiro | verify (applied) | 18317534 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-orpheum-theatre-los-angeles-2026-11-12-8-pm/concert/18317534 | - |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | the-smashing-pumpkins | verify (applied) | 18250173 | https://seatgeek.com/the-smashing-pumpkins-tickets/inglewood-california-kia-forum-2026-11-12-8-pm/concert/18250173 | - |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | john-summit | verify (applied) | 18257252 | https://seatgeek.com/john-summit-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-11-13-7-pm/concert/18257252 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | dave-matthews-band | verify (applied) | 18474898 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-13-7-30-pm/concert/18474898 | - |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | michelle-branch | verify (applied) | 18373515 | https://seatgeek.com/michelle-branch-tickets/lexington-kentucky-manchester-music-hall-2026-11-13-8-pm/concert/18373515 | - |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | daughtry | verify (applied) | 18316813 | https://seatgeek.com/daughtry-tickets/san-antonio-texas-aztec-theatre-2026-11-13-8-pm/concert/18316813 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | verify (applied) | 18645455 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-13-8-pm/concert/18645455 | - |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | foy-vance | verify (applied) | 18084359 | https://seatgeek.com/foy-vance-tickets/seattle-washington-neptune-theatre-wa-2026-11-13-7-pm/concert/18084359 | - |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | steve-lacy | verify (applied) | 18485946 | https://seatgeek.com/steve-lacy-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2026-11-13-8-pm/concert/18485946 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | lionel-richie | verify (applied) | 18405685 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-13-8-pm/concert/18405685 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | verify (applied) | 18686081 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-13-8-pm/concert/18686081 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | eagles | verify (applied) | 18219945 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-13-8-30-pm/concert/18219945 | - |
| tm-journey-2026-greenville-g5evz_1k1vuwb | journey | verify (applied) | 18237123 | https://seatgeek.com/journey-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-11-14-7-30-pm/concert/18237123 | - |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | daughtry | verify (applied) | 18316816 | https://seatgeek.com/daughtry-tickets/dallas-texas-majestic-theatre-dallas-2026-11-14-7-pm/concert/18316816 | - |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | verify (applied) | 18126039 | https://seatgeek.com/the-neighbourhood-tickets/nashville-tennessee-the-truth-nashville-2026-11-14-7-30-pm/concert/18126039 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | verify (applied) | 18629507 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-14-8-pm/concert/18629507 | - |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | verify (applied) | 18312209 | https://seatgeek.com/amble-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-11-14-8-pm/concert/18312209 | - |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | verify (applied) | 18084166 | https://seatgeek.com/foy-vance-tickets/spokane-washington-knitting-factory-spokane-2026-11-14-7-pm/concert/18084166 | - |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | sabaton | verify (applied) | 17732679 | https://seatgeek.com/sabaton-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-14-7-pm/concert/17732679 | - |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | brand-new | verify (applied) | 18319860 | https://seatgeek.com/brand-new-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-14-8-pm/concert/18319860 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | lionel-richie | verify (applied) | 18405683 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-14-8-pm/concert/18405683 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | verify (applied) | 18686083 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-14-8-pm/concert/18686083 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | eagles | verify (applied) | 18219946 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-14-8-30-pm/concert/18219946 | - |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | pentatonix | verify (applied) | 18427197 | https://seatgeek.com/pentatonix-tickets/grand-rapids-michigan-van-andel-arena-2026-11-15-6-pm/concert/18427197 | - |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | beartooth | verify (applied) | 18253046 | https://seatgeek.com/beartooth-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-15-6-30-pm/concert/18253046 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | verify (applied) | 18211699 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-15-7-pm/concert/18211699 | - |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | blue-october | verify (applied) | 18141766 | https://seatgeek.com/blue-october-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2026-11-15-8-pm/concert/18141766 | - |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | tyla | verify (applied) | 18404303 | https://seatgeek.com/tyla-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-15-8-pm/concert/18404303 | - |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | arcangel | verify (applied) | 18266329 | https://seatgeek.com/arcangel-tickets/denver-colorado-paramount-theatre-co-2026-11-15-8-pm/concert/18266329 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | verify (applied) | 18211700 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-16-7-pm/concert/18211700 | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | verify (applied) | 18175613 | https://seatgeek.com/sombr-tickets/toronto-canada-scotiabank-arena-2026-11-16-7-pm/concert/18175613 | - |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | stella-lefty | verify (applied) | 18251604 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-bowery-ballroom-2026-11-16-7-pm/concert/18251604 | - |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | verify (applied) | 18222773 | https://seatgeek.com/amble-tickets/new-orleans-louisiana-house-of-blues-new-orleans-2026-11-16-7-pm/concert/18222773 | - |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | verify (applied) | 18085139 | https://seatgeek.com/the-neighbourhood-tickets/kansas-city-missouri-t-mobile-center-2026-11-16-7-30-pm/concert/18085139 | - |
| tm-trivium-2026-laval-17g8v0g6cubsshb | trivium | verify (applied) | 18391948 | https://seatgeek.com/trivium-tickets/laval-canada-place-bell-2026-11-17-6-35-pm/concert/18391948 | - |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | verify (applied) | 18222798 | https://seatgeek.com/amble-tickets/austin-texas-emo-s-austin-2026-11-17-7-pm/concert/18222798 | - |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | sabaton | verify (applied) | 17732681 | https://seatgeek.com/sabaton-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-17-7-pm/concert/17732681 | - |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | steve-lacy | verify (applied) | 18485948 | https://seatgeek.com/steve-lacy-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-17-8-pm/concert/18485948 | - |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | katseye | verify (applied) | 18240158 | https://seatgeek.com/katseye-tickets/seattle-washington-climate-pledge-arena-2026-11-17-8-pm/concert/18240158 | - |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | verify (applied) | 18223872 | https://seatgeek.com/amble-tickets/dallas-texas-the-echo-lounge-music-hall-2026-11-18-7-pm/concert/18223872 | - |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | verify (applied) | 18140881 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2026-11-18-7-30-pm/concert/18140881 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | rod-wave | verify (applied) | 18320070 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-18-8-30-pm/concert/18320070 | - |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | arcangel | verify (applied) | 18266330 | https://seatgeek.com/arcangel-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-18-8-pm/concert/18266330 | - |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | verify (applied) | 18252806 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-atlantis-2026-11-19-6-30-pm/concert/18252806 | - |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | the-neighbourhood | verify (applied) | 18085141 | https://seatgeek.com/the-neighbourhood-tickets/detroit-michigan-little-caesars-arena-2026-11-19-7-30-pm/concert/18085141 | - |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | trans-siberian-orchestra | verify (applied) | 18573355 | https://seatgeek.com/trans-siberian-orchestra-tickets/council-bluffs-iowa-mid-america-center-2026-11-19-7-pm/concert/18573355 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | rod-wave | verify (applied) | 18414834 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-19-8-pm/concert/18414834 | - |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | stevie-wonder | verify (applied) | 18570214 | https://seatgeek.com/stevie-wonder-tickets/new-york-new-york-madison-square-garden-2026-11-19-8-pm/concert/18570214 | - |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | steve-lacy | verify (applied) | 18485949 | https://seatgeek.com/steve-lacy-tickets/san-diego-california-petco-park-2026-11-19-8-pm/concert/18485949 | - |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | katseye | verify (applied) | 18240159 | https://seatgeek.com/katseye-tickets/oakland-california-oakland-arena-2026-11-19-8-pm/concert/18240159 | - |
| tm-doja-cat-2026-baltimore-1avfzbsgknfre1x | doja-cat | verify (applied) | 17769349 | https://seatgeek.com/doja-cat-tickets/baltimore-maryland-cfg-bank-arena-2026-11-20-7-30-pm/concert/17769349 | - |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | sabaton | verify (applied) | 17732683 | https://seatgeek.com/sabaton-tickets/omaha-nebraska-steelhouse-omaha-2026-11-20-7-pm/concert/17732683 | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | verify (applied) | 18404274 | https://seatgeek.com/tyla-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-20-6-30-pm/concert/18404274 | - |
| tm-ty-myers-2026-austin-g5diz_kuopazl | ty-myers | verify (applied) | 18142345 | https://seatgeek.com/ty-myers-tickets/austin-texas-moody-center-atx-2026-11-20-7-30-pm/concert/18142345 | - |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | arcangel | verify (applied) | 18266331 | https://seatgeek.com/arcangel-tickets/inglewood-california-youtube-theater-2026-11-20-8-pm/concert/18266331 | - |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | trans-siberian-orchestra | verify (applied) | 18573352 | https://seatgeek.com/trans-siberian-orchestra-tickets/cincinnati-ohio-heritage-bank-center-2026-11-21-3-pm/concert/18573352 | - |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | trans-siberian-orchestra | verify (applied) | 18573356 | https://seatgeek.com/trans-siberian-orchestra-tickets/denver-colorado-ball-arena-2026-11-21-3-pm/concert/18573356 | - |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | the-neighbourhood | verify (applied) | 18085142 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-21-7-pm/concert/18085142 | - |
| tm-trivium-2026-chicago-vvg18z_cnmg_i8 | trivium | verify (applied) | 18391955 | https://seatgeek.com/trivium-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-21-6-35-pm/concert/18391955 | - |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | sabaton | verify (applied) | 17857308 | https://seatgeek.com/sabaton-tickets/milwaukee-wisconsin-landmark-credit-union-live-2026-11-21-7-pm/concert/17857308 | - |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | ty-myers | verify (applied) | 18142347 | https://seatgeek.com/ty-myers-tickets/fort-worth-texas-dickies-arena-2026-11-21-7-30-pm/concert/18142347 | - |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | stevie-wonder | verify (applied) | 18570213 | https://seatgeek.com/stevie-wonder-tickets/chicago-illinois-united-center-2026-11-21-8-pm/concert/18570213 | - |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | arcangel | verify (applied) | 18266334 | https://seatgeek.com/arcangel-tickets/san-jose-california-san-jose-civic-2026-11-21-8-pm/concert/18266334 | - |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | katseye | verify (applied) | 18240162 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-21-8-pm/concert/18240162 | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | verify (applied) | 18427238 | https://seatgeek.com/pentatonix-tickets/hamilton-canada-td-coliseum-2026-11-22-6-pm/concert/18427238 | - |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | the-neighbourhood | verify (applied) | 18194371 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-22-6-pm/concert/18194371 | - |
| tm-trivium-2026-madison-vvg1jz_cbaz-zj | trivium | verify (applied) | 18391957 | https://seatgeek.com/trivium-tickets/madison-wisconsin-the-sylvee-2026-11-22-6-35-pm/concert/18391957 | - |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | beartooth | verify (applied) | 18253048 | https://seatgeek.com/beartooth-tickets/omaha-nebraska-steelhouse-omaha-2026-11-22-6-30-pm/concert/18253048 | - |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | sabaton | verify (applied) | 17732691 | https://seatgeek.com/sabaton-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-11-22-7-pm/concert/17732691 | - |
| tm-journey-2026-denver-g5vzz_1kxjfbe | journey | verify (applied) | 18237128 | https://seatgeek.com/journey-tickets/denver-colorado-ball-arena-2026-11-22-7-30-pm/concert/18237128 | - |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | katseye | verify (applied) | 18258420 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-22-8-pm/concert/18258420 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | verify (applied) | 18211703 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-23-7-pm/concert/18211703 | - |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | verify (applied) | 18570216 | https://seatgeek.com/stevie-wonder-tickets/washington-district-of-columbia-capital-one-arena-2026-11-23-8-pm/concert/18570216 | - |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | trans-siberian-orchestra | verify (applied) | 18573369 | https://seatgeek.com/trans-siberian-orchestra-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-24-7-30-pm/concert/18573369 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | verify (applied) | 18211705 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-24-7-pm/concert/18211705 | - |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | katseye | verify (applied) | 18240163 | https://seatgeek.com/katseye-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-24-8-pm/concert/18240163 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | steve-lacy | verify (applied) | 18485954 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-24-8-pm/concert/18485954 | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | verify (applied) | 17769355 | https://seatgeek.com/doja-cat-tickets/toronto-canada-scotiabank-arena-2026-11-25-7-30-pm/concert/17769355 | - |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | sabaton | verify (applied) | 17732688 | https://seatgeek.com/sabaton-tickets/waukee-iowa-vibrant-music-hall-2026-11-25-7-pm/concert/17732688 | - |
| tm-blue-october-2026-nashville-g5viz_kskltsv | blue-october | verify (applied) | 18126041 | https://seatgeek.com/blue-october-tickets/nashville-tennessee-the-truth-nashville-2026-11-25-8-pm/concert/18126041 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8bk7kme | steve-lacy | verify (applied) | 18613496 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-25-8-pm/concert/18613496 | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | tyla | verify (applied) | 18404308 | https://seatgeek.com/tyla-tickets/toronto-canada-coca-cola-coliseum-2026-11-26-8-pm/concert/18404308 | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | trans-siberian-orchestra | verify (applied) | 18573376 | https://seatgeek.com/trans-siberian-orchestra-tickets/manchester-new-hampshire-snhu-arena-2026-11-27-2-30-pm/concert/18573376 | - |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | trans-siberian-orchestra | verify (applied) | 18573377 | https://seatgeek.com/trans-siberian-orchestra-tickets/boise-idaho-extramile-arena-2026-11-27-2-pm/concert/18573377 | - |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | doja-cat | verify (applied) | 17769357 | https://seatgeek.com/doja-cat-tickets/montreal-canada-centre-bell-2026-11-27-7-30-pm/concert/17769357 | - |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | jonas-brothers | verify (applied) | 18503907 | https://seatgeek.com/jonas-brothers-tickets/glendale-arizona-desert-diamond-arena-2026-11-27-7-30-pm/concert/18503907 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | eagles | verify (applied) | 18219952 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-27-8-30-pm/concert/18219952 | - |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | trans-siberian-orchestra | verify (applied) | 18573384 | https://seatgeek.com/trans-siberian-orchestra-tickets/worcester-massachusetts-dcu-center-2026-11-28-3-pm/concert/18573384 | - |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | trans-siberian-orchestra | verify (applied) | 18573385 | https://seatgeek.com/trans-siberian-orchestra-tickets/portland-oregon-moda-center-2026-11-28-3-30-pm/concert/18573385 | - |
| tm-pentatonix-2026-charlottesville-vv1f7z_8uv7ozdc1c | pentatonix | verify (applied) | 18427205 | https://seatgeek.com/pentatonix-tickets/charlottesville-virginia-john-paul-jones-arena-2026-11-28-7-pm/concert/18427205 | - |
| tm-beartooth-2026-nashville-g5viz_1sjbpcf | beartooth | verify (applied) | 18253047 | https://seatgeek.com/beartooth-tickets/nashville-tennessee-the-truth-nashville-2026-11-28-6-30-pm/concert/18253047 | - |
| tm-trivium-2026-houston-g5diz_cdfyhi_ | trivium | verify (applied) | 18391965 | https://seatgeek.com/trivium-tickets/houston-texas-bayou-music-center-2026-11-28-6-35-pm/concert/18391965 | - |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | a-boogie-wit-da-hoodie | verify (applied) | 18629264 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/toronto-canada-scotiabank-arena-2026-11-28-8-pm/concert/18629264 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | eagles | verify (applied) | 18219951 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-28-8-30-pm/concert/18219951 | - |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | trans-siberian-orchestra | verify (applied) | 18573390 | https://seatgeek.com/trans-siberian-orchestra-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-29-3-pm/concert/18573390 | - |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | trans-siberian-orchestra | verify (applied) | 18573391 | https://seatgeek.com/trans-siberian-orchestra-tickets/seattle-washington-climate-pledge-arena-2026-11-29-3-pm/concert/18573391 | - |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | sabaton | verify (applied) | 17732696 | https://seatgeek.com/sabaton-tickets/detroit-michigan-the-fillmore-detroit-2026-11-29-7-pm/concert/17732696 | - |
| tm-beartooth-2026-atlanta-vvg1zz_1br-um- | beartooth | verify (applied) | 18253055 | https://seatgeek.com/beartooth-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-11-29-6-30-pm/concert/18253055 | - |
| tm-trivium-2026-dallas-vvg1yz_cdoxznj | trivium | verify (applied) | 18391967 | https://seatgeek.com/trivium-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-29-6-35-pm/concert/18391967 | - |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | the-neighbourhood | verify (applied) | 18085146 | https://seatgeek.com/the-neighbourhood-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-30-7-30-pm/concert/18085146 | - |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | brent-faiyaz | verify (applied) | 18617422 | https://seatgeek.com/brent-faiyaz-tickets/chicago-illinois-united-center-2026-11-30-8-pm/concert/18617422 | - |
| tm-steve-lacy-2026-vancouver-1aozkf7gkepzmxx | steve-lacy | verify (applied) | 18485961 | https://seatgeek.com/steve-lacy-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-30-8-pm/concert/18485961 | - |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | jonas-brothers | verify (applied) | 18503919 | https://seatgeek.com/jonas-brothers-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-30-7-30-pm/concert/18503919 | - |
| tm-beartooth-2026-charlotte-g5evz_1mwgsx1 | beartooth | verify (applied) | 18253056 | https://seatgeek.com/beartooth-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-01-6-30-pm/concert/18253056 | - |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | sabaton | verify (applied) | 17732703 | https://seatgeek.com/sabaton-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-01-7-pm/concert/17732703 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | olivia-rodrigo | verify (applied) | 18211742 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-01-7-pm/concert/18211742 | - |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | trans-siberian-orchestra | verify (applied) | 18573399 | https://seatgeek.com/trans-siberian-orchestra-tickets/sacramento-california-golden-1-center-2026-12-02-3-pm/concert/18573399 | - |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | sabaton | verify (applied) | 17732700 | https://seatgeek.com/sabaton-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-02-7-pm/concert/17732700 | - |
| tm-trivium-2026-phoenix-17k8v0g62douihb | trivium | verify (applied) | 18391969 | https://seatgeek.com/trivium-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-02-6-30-pm/concert/18391969 | - |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | trans-siberian-orchestra | verify (applied) | 18573401 | https://seatgeek.com/trans-siberian-orchestra-tickets/nashville-tennessee-bridgestone-arena-2026-12-02-7-30-pm/concert/18573401 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | olivia-rodrigo | verify (applied) | 18211743 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-02-7-pm/concert/18211743 | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | the-neighbourhood | verify (applied) | 18085147 | https://seatgeek.com/the-neighbourhood-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-02-7-30-pm/concert/18085147 | - |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | jonas-brothers | verify (applied) | 18503918 | https://seatgeek.com/jonas-brothers-tickets/anaheim-california-honda-center-2026-12-02-7-30-pm/concert/18503918 | - |
| tm-sabaton-2026-pittsburgh-1avbz_kgkwfjp1j | sabaton | verify (applied) | 18126079 | https://seatgeek.com/sabaton-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-03-7-pm/concert/18126079 | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | trans-siberian-orchestra | verify (applied) | 18573402 | https://seatgeek.com/trans-siberian-orchestra-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2026-12-03-7-30-pm/concert/18573402 | - |
| tm-tommy-emmanuel-2026-charleston-g5evz_aboyxr9 | tommy-emmanuel | verify (applied) | 18225241 | https://seatgeek.com/tommy-emmanuel-tickets/charleston-south-carolina-charleston-music-hall-2026-12-03-8-pm/concert/18225241 | - |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | brent-faiyaz | verify (applied) | 18618383 | https://seatgeek.com/brent-faiyaz-tickets/brooklyn-new-york-barclays-center-2026-12-03-8-pm/concert/18618383 | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | trans-siberian-orchestra | verify (applied) | 18573408 | https://seatgeek.com/trans-siberian-orchestra-tickets/fresno-california-save-mart-center-2026-12-03-7-pm/concert/18573408 | - |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | pink-martini | verify (applied) | 18267277 | https://seatgeek.com/pink-martini-tickets/reno-nevada-grand-sierra-resort-2026-12-03-7-30-pm/concert/18267277 | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | trans-siberian-orchestra | verify (applied) | 18573409 | https://seatgeek.com/trans-siberian-orchestra-tickets/toledo-ohio-huntington-center-2026-12-04-3-pm/concert/18573409 | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | blue-october | verify (applied) | 18141993 | https://seatgeek.com/blue-october-tickets/minneapolis-minnesota-fillmore-minneapolis-2026-12-04-7-pm/concert/18141993 | - |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | lil-wayne | verify (applied) | 18128388 | https://seatgeek.com/lil-wayne-tickets/lexington-kentucky-rupp-arena-2026-12-04-8-30-pm/concert/18128388 | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | the-neighbourhood | verify (applied) | 18085152 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-04-7-pm/concert/18085152 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | eagles | verify (applied) | 18355049 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-04-8-30-pm/concert/18355049 | - |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | trans-siberian-orchestra | verify (applied) | 18573412 | https://seatgeek.com/trans-siberian-orchestra-tickets/columbus-ohio-nationwide-arena-2026-12-05-3-pm/concert/18573412 | - |
| tm-pentatonix-2026-columbia-g5evz_2t_yqom | pentatonix | verify (applied) | 18427214 | https://seatgeek.com/pentatonix-tickets/columbia-south-carolina-colonial-life-arena-2026-12-05-7-pm/concert/18427214 | - |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | sabaton | verify (applied) | 17732702 | https://seatgeek.com/sabaton-tickets/virginia-beach-virginia-the-dome-13-2026-12-05-7-pm/concert/17732702 | - |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | lil-wayne | verify (applied) | 18649583 | https://seatgeek.com/lil-wayne-tickets/savannah-georgia-enmarket-arena-2026-12-05-7-pm/concert/18649583 | - |
| tm-tommy-emmanuel-2026-chattanooga-g5viz_au3swzr | tommy-emmanuel | verify (applied) | 18225539 | https://seatgeek.com/tommy-emmanuel-tickets/chattanooga-tennessee-the-walker-theatre-chattanooga-2026-12-05-7-30-pm/concert/18225539 | - |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | blue-october | verify (applied) | 18142048 | https://seatgeek.com/blue-october-tickets/la-vista-nebraska-the-astro-theater-la-vista-2026-12-05-8-pm/concert/18142048 | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | the-neighbourhood | verify (applied) | 18194373 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-05-6-pm/concert/18194373 | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | trivium | verify (applied) | 18391974 | https://seatgeek.com/trivium-tickets/san-francisco-california-the-masonic-san-francisco-2026-12-05-6-35-pm/concert/18391974 | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | jonas-brothers | verify (applied) | 18503920 | https://seatgeek.com/jonas-brothers-tickets/seattle-washington-climate-pledge-arena-2026-12-05-7-30-pm/concert/18503920 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | eagles | verify (applied) | 18355050 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-05-8-30-pm/concert/18355050 | - |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | trans-siberian-orchestra | verify (applied) | 18573423 | https://seatgeek.com/trans-siberian-orchestra-tickets/grand-rapids-michigan-van-andel-arena-2026-12-06-3-pm/concert/18573423 | - |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | trans-siberian-orchestra | verify (applied) | 18573424 | https://seatgeek.com/trans-siberian-orchestra-tickets/phoenix-arizona-mortgage-matchup-center-2026-12-06-3-pm/concert/18573424 | - |
| tm-pentatonix-2026-greenville-g5evz_2tznjd_ | pentatonix | verify (applied) | 18427215 | https://seatgeek.com/pentatonix-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-06-6-pm/concert/18427215 | - |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | sabaton | verify (applied) | 17732707 | https://seatgeek.com/sabaton-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-12-06-7-pm/concert/17732707 | - |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | beartooth | verify (applied) | 18253062 | https://seatgeek.com/beartooth-tickets/new-orleans-louisiana-fillmore-new-orleans-2026-12-07-5-30-pm/concert/18253062 | - |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | pentatonix | verify (applied) | 18427217 | https://seatgeek.com/pentatonix-tickets/raleigh-north-carolina-lenovo-center-2026-12-07-7-pm/concert/18427217 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | sabaton | verify (applied) | 17732711 | https://seatgeek.com/sabaton-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-08-7-pm/concert/17732711 | - |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | stevie-wonder | verify (applied) | 18570215 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-08-8-pm/concert/18570215 | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | trivium | verify (applied) | 18391979 | https://seatgeek.com/trivium-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-12-08-6-35-pm/concert/18391979 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | trans-siberian-orchestra | verify (applied) | 18573432 | https://seatgeek.com/trans-siberian-orchestra-tickets/allentown-pennsylvania-ppl-center-2026-12-09-7-30-pm/concert/18573432 | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | sabaton | verify (applied) | 18126050 | https://seatgeek.com/sabaton-tickets/nashville-tennessee-the-truth-nashville-2026-12-09-7-pm/concert/18126050 | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | trans-siberian-orchestra | verify (applied) | 18573433 | https://seatgeek.com/trans-siberian-orchestra-tickets/austin-texas-moody-center-atx-2026-12-09-7-pm/concert/18573433 | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | stevie-wonder | verify (applied) | 18570217 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-09-8-pm/concert/18570217 | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | jonas-brothers | verify (applied) | 18503921 | https://seatgeek.com/jonas-brothers-tickets/denver-colorado-ball-arena-2026-12-09-7-30-pm/concert/18503921 | - |
| tm-trivium-2026-seattle-vvg1hz_2dp1x5t | trivium | verify (applied) | 18391981 | https://seatgeek.com/trivium-tickets/seattle-washington-paramount-theatre-wa-2026-12-09-6-35-pm/concert/18391981 | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | trans-siberian-orchestra | verify (applied) | 18573435 | https://seatgeek.com/trans-siberian-orchestra-tickets/raleigh-north-carolina-lenovo-center-2026-12-10-7-30-pm/concert/18573435 | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | trans-siberian-orchestra | verify (applied) | 18573436 | https://seatgeek.com/trans-siberian-orchestra-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-10-7-pm/concert/18573436 | - |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | jonas-brothers | verify (applied) | 18503923 | https://seatgeek.com/jonas-brothers-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-12-10-7-30-pm/concert/18503923 | - |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | blue-october | verify (applied) | 18140959 | https://seatgeek.com/blue-october-tickets/beaumont-texas-jefferson-theatre-2026-12-10-8-pm/concert/18140959 | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | trans-siberian-orchestra | verify (applied) | 18573437 | https://seatgeek.com/trans-siberian-orchestra-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-11-3-pm/concert/18573437 | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | trivium | verify (applied) | 18391984 | https://seatgeek.com/trivium-tickets/reno-nevada-grand-sierra-resort-2026-12-11-6-35-pm/concert/18391984 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | olivia-rodrigo | verify (applied) | 18211712 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-11-7-pm/concert/18211712 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | eagles | verify (applied) | 18355052 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-11-8-30-pm/concert/18355052 | - |
| tm-trans-siberian-orchestra-2026-charlotte-g5evz_o6l3kkc | trans-siberian-orchestra | verify (applied) | 18573447 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-12-12-3-pm/concert/18573447 | - |
| tm-trans-siberian-orchestra-2026-san-antonio-g5diz_8q4vky5 | trans-siberian-orchestra | verify (applied) | 18573448 | https://seatgeek.com/trans-siberian-orchestra-tickets/san-antonio-texas-frost-bank-center-2026-12-12-3-pm/concert/18573448 | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | beartooth | verify (applied) | 18253068 | https://seatgeek.com/beartooth-tickets/denver-colorado-fillmore-auditorium-denver-2026-12-12-5-pm/concert/18253068 | - |
| tm-pentatonix-2026-north-little-rock-g5viz_2r0054y | pentatonix | verify (applied) | 18427222 | https://seatgeek.com/pentatonix-tickets/north-little-rock-arkansas-simmons-bank-arena-2026-12-12-7-pm/concert/18427222 | - |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | jonas-brothers | verify (applied) | 18503922 | https://seatgeek.com/jonas-brothers-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2026-12-12-7-30-pm/concert/18503922 | - |
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | a-boogie-wit-da-hoodie | verify (applied) | 18631720 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-12-12-8-pm/concert/18631720 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | olivia-rodrigo | verify (applied) | 18211714 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-12-7-pm/concert/18211714 | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | john-summit | verify (applied) | 18494071 | https://seatgeek.com/john-summit-tickets/los-angeles-california-los-angeles-memorial-coliseum-2026-12-12-7-pm/concert/18494071 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | eagles | verify (applied) | 18355051 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | trans-siberian-orchestra | verify (applied) | 18573455 | https://seatgeek.com/trans-siberian-orchestra-tickets/duluth-georgia-gas-south-arena-2026-12-13-3-pm/concert/18573455 | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | trans-siberian-orchestra | verify (applied) | 18573458 | https://seatgeek.com/trans-siberian-orchestra-tickets/dallas-texas-american-airlines-center-2026-12-13-3-pm/concert/18573458 | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | pentatonix | verify (applied) | 18427226 | https://seatgeek.com/pentatonix-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-13-6-pm/concert/18427226 | - |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | beartooth | verify (applied) | 18253071 | https://seatgeek.com/beartooth-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-12-13-6-pm/concert/18253071 | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | andrea-bocelli | verify (applied) | 18039188 | https://seatgeek.com/andrea-bocelli-tickets/montreal-canada-centre-bell-2026-12-13-8-pm/concert/18039188 | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | blue-october | verify (applied) | 18140941 | https://seatgeek.com/blue-october-tickets/hidalgo-texas-payne-arena-2026-12-13-8-pm/concert/18140941 | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | jonas-brothers | verify (applied) | 18503930 | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | olivia-rodrigo | verify (applied) | 18211717 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-15-7-pm/concert/18211717 | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | tyla | verify (applied) | 18404300 | https://seatgeek.com/tyla-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-15-8-pm/concert/18404300 | - |
| tm-pink-martini-2026-red-bank-g5vvz_gnt3jau | pink-martini | verify (applied) | 18325734 | https://seatgeek.com/pink-martini-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-12-16-7-30-pm/concert/18325734 | - |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | trans-siberian-orchestra | verify (applied) | 18573461 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlottesville-virginia-john-paul-jones-arena-2026-12-16-7-30-pm/concert/18573461 | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | trivium | verify (applied) | 18391988 | https://seatgeek.com/trivium-tickets/omaha-nebraska-steelhouse-omaha-2026-12-16-6-35-pm/concert/18391988 | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | trans-siberian-orchestra | verify (applied) | 18573466 | https://seatgeek.com/trans-siberian-orchestra-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-12-16-7-pm/concert/18573466 | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | beartooth | verify (applied) | 18253074 | https://seatgeek.com/beartooth-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-16-6-30-pm/concert/18253074 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | trans-siberian-orchestra | verify (applied) | 18573467 | https://seatgeek.com/trans-siberian-orchestra-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-12-17-7-pm/concert/18573467 | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | trans-siberian-orchestra | verify (applied) | 18573470 | https://seatgeek.com/trans-siberian-orchestra-tickets/albany-new-york-mvp-arena-2026-12-17-7-30-pm/concert/18573470 | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | blue-october | verify (applied) | 18140982 | https://seatgeek.com/blue-october-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2026-12-17-8-pm/concert/18140982 | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | trans-siberian-orchestra | verify (applied) | 18573472 | https://seatgeek.com/trans-siberian-orchestra-tickets/hershey-pennsylvania-giant-center-2026-12-18-3-pm/concert/18573472 | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | trivium | verify (applied) | 18391991 | https://seatgeek.com/trivium-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-18-6-35-pm/concert/18391991 | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | trans-siberian-orchestra | verify (applied) | 18573474 | https://seatgeek.com/trans-siberian-orchestra-tickets/orlando-florida-kia-center-2026-12-19-2-30-pm/concert/18573474 | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | trans-siberian-orchestra | verify (applied) | 18573477 | https://seatgeek.com/trans-siberian-orchestra-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-19-2-30-pm/concert/18573477 | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | trivium | verify (applied) | 18391993 | https://seatgeek.com/trivium-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-19-6-35-pm/concert/18391993 | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | jonas-brothers | verify (applied) | 18503931 | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | yacht-rock-revue | verify (applied) | 18551886 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-19-8-pm/concert/18551886 | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | nickelback | verify (applied) | 18629578 | https://seatgeek.com/nickelback-tickets/durant-oklahoma-choctaw-grand-theater-2026-12-19-8-pm/concert/18629578 | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | beartooth | verify (applied) | 18253079 | https://seatgeek.com/beartooth-tickets/wheatland-california-hard-rock-live-sacramento-2026-12-19-6-30-pm/concert/18253079 | - |
| tm-tyla-2026-las-vegas-17ayv0g629nf-rw | tyla | verify (applied) | 18404302 | https://seatgeek.com/tyla-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-12-19-9-pm/concert/18404302 | - |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | a-perfect-circle | verify (applied) | 18246867 | https://seatgeek.com/a-perfect-circle-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-12-19-8-pm/concert/18246867 | - |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | trans-siberian-orchestra | verify (applied) | 18573484 | https://seatgeek.com/trans-siberian-orchestra-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-20-3-pm/concert/18573484 | - |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | trans-siberian-orchestra | verify (applied) | 18573485 | https://seatgeek.com/trans-siberian-orchestra-tickets/tampa-florida-benchmark-international-arena-2026-12-20-3-pm/concert/18573485 | - |
| tm-pentatonix-2026-san-diego-vvg1iz_2i-g3fb | pentatonix | verify (applied) | 18427232 | https://seatgeek.com/pentatonix-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-20-6-pm/concert/18427232 | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | jonas-brothers | verify (applied) | 18503932 | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-21-7-30-pm/concert/18503932 | - |
| tm-trans-siberian-orchestra-2026-indianapolis-vv17fz_8gkiwqjq1 | trans-siberian-orchestra | verify (applied) | 18573492 | https://seatgeek.com/trans-siberian-orchestra-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-12-22-3-pm/concert/18573492 | - |
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
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | backstreet-boys | verify (applied) | 18470170 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-31-10-pm/concert/18470170 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | backstreet-boys | verify (applied) | 18470178 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-01-8-pm/concert/18470178 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | backstreet-boys | verify (applied) | 18470180 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-02-8-pm/concert/18470180 | - |
| tm-yacht-rock-revue-2027-englewood-k7vgf_k9ovli- | yacht-rock-revue | verify (applied) | 18612862 | https://seatgeek.com/yacht-rock-revue-tickets/englewood-new-jersey-bergen-performing-arts-center-2027-01-07-8-pm/concert/18612862 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | lionel-richie | verify (applied) | 18405682 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-08-8-pm/concert/18405682 | - |
| tm-stella-lefty-2027-detroit-vv1afzkfkgkesu99t | stella-lefty | verify (applied) | 18527905 | https://seatgeek.com/stella-lefty-tickets/detroit-michigan-the-fillmore-detroit-2027-01-09-8-pm/concert/18527905 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | lionel-richie | verify (applied) | 18405681 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-09-8-pm/concert/18405681 | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | stella-lefty | verify (applied) | 18527909 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-12-7-pm/concert/18527909 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | olivia-rodrigo | verify (applied) | 18211724 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-12-7-pm/concert/18211724 | - |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | stella-lefty | verify (applied) | 18539735 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-13-7-pm/concert/18539735 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | olivia-rodrigo | verify (applied) | 18211726 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-13-7-pm/concert/18211726 | - |
| tm-atmosphere-2027-madison-vv1a6zkfygkes1aem | atmosphere | verify (applied) | 18609073 | https://seatgeek.com/atmosphere-tickets/madison-wisconsin-the-sylvee-2027-01-15-6-45-pm/concert/18609073 | - |
| tm-stella-lefty-2027-montreal-1kg8vp7yga51kww | stella-lefty | verify (applied) | 18527910 | https://seatgeek.com/stella-lefty-tickets/montreal-canada-mtelus-2027-01-15-8-pm/concert/18527910 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | eagles | verify (applied) | 18421044 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | olivia-rodrigo | verify (applied) | 18214730 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-16-7-pm/concert/18214730 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | eagles | verify (applied) | 18421045 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-16-8-30-pm/concert/18421045 | - |
| tm-missio-2027-cleveland-vv17fz_8gkl63cwa | missio | verify (applied) | 18492738 | https://seatgeek.com/missio-tickets/cleveland-ohio-cambridge-room-at-house-of-blues-cleveland-1-2027-01-17-7-pm/concert/18492738 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | olivia-rodrigo | verify (applied) | 18211731 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-17-7-pm/concert/18211731 | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | death-cab-for-cutie | verify (applied) | 18603599 | https://seatgeek.com/death-cab-for-cutie-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2027-01-19-8-pm/concert/18603599 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | olivia-rodrigo | verify (applied) | 18224991 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-20-7-pm/concert/18224991 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | santana | verify (applied) | 18628819 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-20-7-pm/concert/18628819 | - |
| tm-dylan-scott-2027-detroit-vv1afzkfigkddz4or | dylan-scott | verify (applied) | 18600788 | https://seatgeek.com/dylan-scott-tickets/detroit-michigan-the-fillmore-detroit-2027-01-21-7-pm/concert/18600788 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | olivia-rodrigo | verify (applied) | 18224990 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-21-7-pm/concert/18224990 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | santana | verify (applied) | 18628820 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-21-7-pm/concert/18628820 | - |
| tm-dylan-scott-2027-grand-rapids-vv1afzkfigker90br | dylan-scott | verify (applied) | 18601437 | https://seatgeek.com/dylan-scott-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-01-22-7-pm/concert/18601437 | - |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | the-red-clay-strays | verify (applied) | 18639066 | https://seatgeek.com/the-red-clay-strays-tickets/raleigh-north-carolina-lenovo-center-2027-01-22-7-pm/concert/18639066 | - |
| tm-stella-lefty-2027-philadelphia-vv1aezkfkgkddxsrk | stella-lefty | verify (applied) | 18527883 | https://seatgeek.com/stella-lefty-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-01-22-8-pm/concert/18527883 | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | atmosphere | verify (applied) | 18609083 | https://seatgeek.com/atmosphere-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-01-22-6-45-pm/concert/18609083 | - |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | the-red-clay-strays | verify (applied) | 18639067 | https://seatgeek.com/the-red-clay-strays-tickets/columbia-south-carolina-colonial-life-arena-2027-01-23-7-pm/concert/18639067 | - |
| tm-tommy-emmanuel-2027-des-moines-vv1kbz_3jvg7w7g3 | tommy-emmanuel | verify (applied) | 18593545 | https://seatgeek.com/tommy-emmanuel-tickets/des-moines-iowa-hoyt-sherman-place-2027-01-23-7-30-pm/concert/18593545 | - |
| tm-dylan-scott-2027-waukee-1ae7z_3gkl2epqo | dylan-scott | verify (applied) | 18601543 | https://seatgeek.com/dylan-scott-tickets/waukee-iowa-vibrant-music-hall-2027-01-23-7-30-pm/concert/18601543 | - |
| tm-atmosphere-2027-bozeman-g5vzz_k6poibm | atmosphere | verify (applied) | 18609086 | https://seatgeek.com/atmosphere-tickets/bozeman-montana-the-elm-1-2027-01-23-7-pm/concert/18609086 | - |
| tm-daughtry-2027-pine-bluff-g5viz_kyugjqo | daughtry | verify (applied) | 18632893 | https://seatgeek.com/daughtry-tickets/pine-bluff-arkansas-saracen-casino-resort-2027-01-23-7-pm/concert/18632893 | - |
| tm-hilary-duff-2027-vancouver-1av7z_7gkuh7fot | hilary-duff | verify (applied) | 18081222 | https://seatgeek.com/hilary-duff-tickets/vancouver-canada-rogers-arena-2027-01-23-7-30-pm/concert/18081222 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | santana | verify (applied) | 18628821 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-23-7-pm/concert/18628821 | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | tommy-emmanuel | verify (applied) | 18593679 | https://seatgeek.com/tommy-emmanuel-tickets/madison-wisconsin-barrymore-theatre-madison-2027-01-24-8-pm/concert/18593679 | - |
| tm-atmosphere-2027-spokane-g5vzz_kkyknfe | atmosphere | verify (applied) | 18609085 | https://seatgeek.com/atmosphere-tickets/spokane-washington-knitting-factory-spokane-2027-01-24-6-45-pm/concert/18609085 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | olivia-rodrigo | verify (applied) | 18225825 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-24-7-pm/concert/18225825 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | santana | verify (applied) | 18628822 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-24-7-pm/concert/18628822 | - |
| tm-stella-lefty-2027-charlotte-g5evz_o9kpb3z | stella-lefty | verify (applied) | 18527884 | https://seatgeek.com/stella-lefty-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-01-25-8-pm/concert/18527884 | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | tommy-emmanuel | verify (applied) | 18594247 | https://seatgeek.com/tommy-emmanuel-tickets/skokie-illinois-north-shore-center-for-the-performing-arts-van-dusen-theatre-2027-01-25-7-30-pm/concert/18594247 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | olivia-rodrigo | verify (applied) | 18227093 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-25-7-pm/concert/18227093 | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | stella-lefty | verify (applied) | 18527886 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-01-26-8-pm/concert/18527886 | - |
| tm-atmosphere-2027-vancouver-1av7z_3gkx859iu | atmosphere | verify (applied) | 18609087 | https://seatgeek.com/atmosphere-tickets/vancouver-canada-commodore-ballroom-2027-01-26-6-pm/concert/18609087 | - |
| tm-daughtry-2027-orlando-1kfovpgdga2huxq | daughtry | verify (applied) | 18632895 | https://seatgeek.com/daughtry-tickets/orlando-florida-hard-rock-live-orlando-2027-01-27-7-pm/concert/18632895 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | santana | verify (applied) | 18628823 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-27-7-pm/concert/18628823 | - |
| tm-tobymac-2027-fayetteville-g5evz_ojlfi-_ | tobymac | verify (applied) | 18543246 | https://seatgeek.com/tobymac-tickets/fayetteville-north-carolina-crown-coliseum-crown-complex-2027-01-28-7-pm/concert/18543246 | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | tommy-emmanuel | verify (applied) | 18594658 | https://seatgeek.com/tommy-emmanuel-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-28-7-pm/concert/18594658 | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | the-red-clay-strays | verify (applied) | 18639068 | https://seatgeek.com/the-red-clay-strays-tickets/rosemont-illinois-allstate-arena-2027-01-28-7-pm/concert/18639068 | - |
| tm-dylan-scott-2027-sioux-falls-vv17bz_3gkbn6kzm | dylan-scott | verify (applied) | 18601283 | https://seatgeek.com/dylan-scott-tickets/sioux-falls-south-dakota-sanford-pentagon-2027-01-28-7-30-pm/concert/18601283 | - |
| tm-stella-lefty-2027-dallas-vvg1yz_o8qf6xm | stella-lefty | verify (applied) | 18527887 | https://seatgeek.com/stella-lefty-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-01-28-8-pm/concert/18527887 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | olivia-rodrigo | verify (applied) | 18230500 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-28-7-pm/concert/18230500 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | santana | verify (applied) | 18628824 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-28-7-pm/concert/18628824 | - |
| tm-tobymac-2027-lexington-1apzkfbgker-a4j | tobymac | verify (applied) | 18542763 | https://seatgeek.com/tobymac-tickets/lexington-kentucky-rupp-arena-2027-01-29-7-pm/concert/18542763 | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | the-red-clay-strays | verify (applied) | 18639069 | https://seatgeek.com/the-red-clay-strays-tickets/saint-louis-missouri-enterprise-center-2027-01-29-7-pm/concert/18639069 | - |
| tm-hilary-duff-2027-saskatoon-1k78v0fmgaungny | hilary-duff | verify (applied) | 18085160 | https://seatgeek.com/hilary-duff-tickets/saskatoon-canada-sasktel-centre-2027-01-29-7-30-pm/concert/18085160 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | olivia-rodrigo | verify (applied) | 18230501 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-29-7-pm/concert/18230501 | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | atmosphere | verify (applied) | 18609092 | https://seatgeek.com/atmosphere-tickets/reno-nevada-grand-sierra-resort-2027-01-29-7-pm/concert/18609092 | - |
| tm-alan-walker-2027-raleigh-g5evz_31nnqnu | alan-walker | verify (applied) | 18590678 | https://seatgeek.com/alan-walker-tickets/raleigh-north-carolina-the-ritz-raleigh-2027-01-30-6-pm/concert/18590678 | - |
| tm-stella-lefty-2027-houston-g5diz_opbsxqh | stella-lefty | verify (applied) | 18527885 | https://seatgeek.com/stella-lefty-tickets/houston-texas-house-of-blues-houston-2027-01-30-7-pm/concert/18527885 | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | tobymac | verify (applied) | 18542844 | https://seatgeek.com/tobymac-tickets/huntsville-alabama-propst-arena-at-the-von-braun-center-2027-01-30-7-pm/concert/18542844 | - |
| tm-dylan-scott-2027-rochester-vv17bz_3gklxuys_ | dylan-scott | verify (applied) | 18601170 | https://seatgeek.com/dylan-scott-tickets/rochester-minnesota-mayo-civic-center-auditorium-2-2027-01-30-7-30-pm/concert/18601170 | - |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | daughtry | verify (applied) | 18632898 | https://seatgeek.com/daughtry-tickets/biloxi-mississippi-hard-rock-hotel-casino-biloxi-2027-01-30-7-pm/concert/18632898 | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | blue-october | verify (applied) | 18238718 | https://seatgeek.com/blue-october-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-01-30-8-pm/concert/18238718 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | santana | verify (applied) | 18628831 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-30-7-pm/concert/18628831 | - |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | tobymac | verify (applied) | 18542726 | https://seatgeek.com/tobymac-tickets/lafayette-louisiana-cajundome-2027-01-31-6-30-pm/concert/18542726 | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | alan-walker | verify (applied) | 18590337 | https://seatgeek.com/alan-walker-tickets/charleston-south-carolina-charleston-music-hall-2027-01-31-8-pm/concert/18590337 | - |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | the-red-clay-strays | verify (applied) | 18639070 | https://seatgeek.com/the-red-clay-strays-tickets/omaha-nebraska-chi-health-center-omaha-2027-01-31-7-pm/concert/18639070 | - |
| tm-daughtry-2027-houston-g5diz_kxwqqcm | daughtry | verify (applied) | 18632897 | https://seatgeek.com/daughtry-tickets/houston-texas-bayou-music-center-2027-01-31-8-pm/concert/18632897 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | santana | verify (applied) | 18628832 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-31-7-pm/concert/18628832 | - |
| tm-atmosphere-2027-tucson-1kk8vpgiga2ka3q | atmosphere | verify (applied) | 18609097 | https://seatgeek.com/atmosphere-tickets/tucson-arizona-rialto-theatre-2027-02-01-8-pm/concert/18609097 | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | hilary-duff | verify (applied) | 18070282 | https://seatgeek.com/hilary-duff-tickets/hamilton-canada-td-coliseum-2027-02-02-7-30-pm/concert/18070282 | - |
| tm-daughtry-2027-corpus-christi-g5diz_kxutltw | daughtry | verify (applied) | 18632905 | https://seatgeek.com/daughtry-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2027-02-02-7-pm/concert/18632905 | - |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | greta-van-fleet | verify (applied) | 18641948 | https://seatgeek.com/greta-van-fleet-tickets/savannah-georgia-enmarket-arena-2027-02-03-7-pm/concert/18641948 | - |
| tm-don-omar-2027-denver-g5vzz_u2hqxbt | don-omar | verify (applied) | 18325121 | https://seatgeek.com/don-omar-tickets/denver-colorado-ball-arena-2027-02-03-8-pm/concert/18325121 | - |
| tm-blue-october-2027-tucson-17k8v0g61r3fg2b | blue-october | verify (applied) | 18238924 | https://seatgeek.com/blue-october-tickets/tucson-arizona-rialto-theatre-2027-02-03-8-pm/concert/18238924 | - |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | hilary-duff | verify (applied) | 18070284 | https://seatgeek.com/hilary-duff-tickets/kanata-canada-canadian-tire-centre-2027-02-04-7-30-pm/concert/18070284 | - |
| tm-dylan-scott-2027-philadelphia-vv17fz_3gklnt6ea | dylan-scott | verify (applied) | 18601370 | https://seatgeek.com/dylan-scott-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-04-7-30-pm/concert/18601370 | - |
| tm-atmosphere-2027-kansas-city-vv11bz_k7z0sqj | atmosphere | verify (applied) | 18609098 | https://seatgeek.com/atmosphere-tickets/kansas-city-missouri-voodoo-lounge-at-harrah-s-casino-north-kansas-city-2027-02-04-7-pm/concert/18609098 | - |
| tm-yuridia-2027-seattle-vvg1hz_36ea3aq | yuridia | verify (applied) | 18570382 | https://seatgeek.com/yuridia-tickets/seattle-washington-paramount-theatre-wa-2027-02-04-8-pm/concert/18570382 | - |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | the-red-clay-strays | verify (applied) | 18639071 | https://seatgeek.com/the-red-clay-strays-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-05-7-pm/concert/18639071 | - |
| tm-hilary-duff-2027-montreal-1aszkoagkeug7uo | hilary-duff | verify (applied) | 18070286 | https://seatgeek.com/hilary-duff-tickets/montreal-canada-centre-bell-2027-02-05-7-30-pm/concert/18070286 | - |
| tm-dylan-scott-2027-wallingford-g5vvz_3ekjcji | dylan-scott | verify (applied) | 18600781 | https://seatgeek.com/dylan-scott-tickets/wallingford-connecticut-toyota-oakdale-theatre-2027-02-05-7-30-pm/concert/18600781 | - |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | atmosphere | verify (applied) | 18609099 | https://seatgeek.com/atmosphere-tickets/joliet-illinois-hollywood-casino-15-2027-02-05-6-45-pm/concert/18609099 | - |
| tm-valley-2027-montreal-1ad7z_3gkblokhd | valley | verify (applied) | 18606379 | https://seatgeek.com/valley-tickets/montreal-canada-le-studio-td-2027-02-05-8-pm/concert/18606379 | - |
| tm-chelsea-cutler-2027-charlotte-g5evz_kukxezh | chelsea-cutler | verify (applied) | 18639172 | https://seatgeek.com/chelsea-cutler-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-02-05-8-pm/concert/18639172 | - |
| tm-polyphia-2027-phoenix-16_zkf_ofzag77fu | polyphia | verify (applied) | 18536014 | https://seatgeek.com/polyphia-tickets/phoenix-arizona-arizona-financial-theatre-2027-02-05-7-30-pm/concert/18536014 | - |
| tm-blue-october-2027-phoenix-17k8v0g61lto1cb | blue-october | verify (applied) | 18239521 | https://seatgeek.com/blue-october-tickets/phoenix-arizona-the-van-buren-2027-02-05-8-pm/concert/18239521 | - |
| tm-nickelback-2027-pittsburgh-1apzk4agkenjp68 | nickelback | verify (applied) | 18664575 | https://seatgeek.com/nickelback-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-02-06-6-30-pm/concert/18664575 | - |
| tm-atmosphere-2027-rockford-1ae7z_3gkl5agu0 | atmosphere | verify (applied) | 18609101 | https://seatgeek.com/atmosphere-tickets/rockford-illinois-hard-rock-live-rockford-2027-02-06-6-pm/concert/18609101 | - |
| tm-valley-2027-ottawa-1ad7z_3gkv11nuz | valley | verify (applied) | 18606169 | https://seatgeek.com/valley-tickets/ottawa-canada-bronson-centre-2027-02-06-7-pm/concert/18606169 | - |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | chelsea-cutler | verify (applied) | 18639173 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-06-8-pm/concert/18639173 | - |
| tm-fantasia-2027-norfolk-vv1avzkfmgkdn5kye | fantasia | verify (applied) | 18629319 | https://seatgeek.com/fantasia-tickets/norfolk-virginia-scope-arena-1-2027-02-06-8-pm/concert/18629319 | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | yuridia | verify (applied) | 18570383 | https://seatgeek.com/yuridia-tickets/reno-nevada-grand-sierra-resort-2027-02-06-8-pm/concert/18570383 | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | chelsea-cutler | verify (applied) | 18639180 | https://seatgeek.com/chelsea-cutler-tickets/washington-district-of-columbia-9-30-club-2027-02-07-7-pm/concert/18639180 | - |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | yuridia | verify (applied) | 18570385 | https://seatgeek.com/yuridia-tickets/san-jose-california-sap-center-at-san-jose-2027-02-07-8-pm/concert/18570385 | - |
| tm-valley-2027-london-1avzz_3gktpgnuv | valley | verify (applied) | 18606118 | https://seatgeek.com/valley-tickets/london-canada-london-music-hall-2027-02-10-7-pm/concert/18606118 | - |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | the-lemonheads | verify (applied) | 18593831 | https://seatgeek.com/the-lemonheads-tickets/boston-massachusetts-brighton-music-hall-2027-02-10-7-30-pm/concert/18593831 | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | olivia-rodrigo | verify (applied) | 18211656 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-11-7-pm/concert/18211656 | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | blue-october | verify (applied) | 18239347 | https://seatgeek.com/blue-october-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-11-8-pm/concert/18239347 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | olivia-rodrigo | verify (applied) | 18211659 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-12-7-pm/concert/18211659 | - |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | fantasia | verify (applied) | 18632088 | https://seatgeek.com/fantasia-tickets/elmont-new-york-ubs-arena-2027-02-12-8-pm/concert/18632088 | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | daughtry | verify (applied) | 18632912 | https://seatgeek.com/daughtry-tickets/durant-oklahoma-choctaw-grand-theater-2027-02-12-7-pm/concert/18632912 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | backstreet-boys | verify (applied) | 18642041 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-12-8-pm/concert/18642041 | - |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | flans | verify (applied) | 18612856 | https://seatgeek.com/flans-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-02-12-8-pm/concert/18612856 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | backstreet-boys | verify (applied) | 18642039 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-13-8-pm/concert/18642039 | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | stella-lefty | verify (applied) | 18527897 | https://seatgeek.com/stella-lefty-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-13-7-pm/concert/18527897 | - |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | flans | verify (applied) | 18612650 | https://seatgeek.com/flans-tickets/tucson-arizona-linda-ronstadt-music-hall-2027-02-13-8-pm/concert/18612650 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | backstreet-boys | verify (applied) | 18652781 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-14-8-pm/concert/18652781 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | olivia-rodrigo | verify (applied) | 18211660 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-15-7-pm/concert/18211660 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | olivia-rodrigo | verify (applied) | 18211657 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-16-7-pm/concert/18211657 | - |
| tm-valley-2027-winnipeg-1av7z_3gkbokkjd | valley | verify (applied) | 18606405 | https://seatgeek.com/valley-tickets/winnipeg-canada-the-park-theatre-2027-02-16-7-pm/concert/18606405 | - |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | daughtry | verify (applied) | 18632920 | https://seatgeek.com/daughtry-tickets/duluth-minnesota-decc-symphony-hall-2027-02-16-7-pm/concert/18632920 | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | don-omar | verify (applied) | 18325165 | https://seatgeek.com/don-omar-tickets/toronto-canada-scotiabank-arena-2027-02-17-8-pm/concert/18325165 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | alan-walker | verify (applied) | 18591555 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-18-6-pm/concert/18591555 | - |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | chelsea-cutler | verify (applied) | 18639185 | https://seatgeek.com/chelsea-cutler-tickets/detroit-michigan-saint-andrews-hall-2027-02-18-7-pm/concert/18639185 | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | gracie-abrams | verify (applied) | 18270548 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-18-8-pm/concert/18270548 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | alan-walker | verify (applied) | 18591553 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-19-6-pm/concert/18591553 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | olivia-rodrigo | verify (applied) | 18224685 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-19-7-pm/concert/18224685 | - |
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
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | alan-walker | verify (applied) | 18591884 | https://seatgeek.com/alan-walker-tickets/ottawa-canada-history-ottawa-2027-02-21-6-30-pm/concert/18591884 | - |
| tm-needtobreathe-2027-duluth-vv1kbz_kekg7rpco | needtobreathe | verify (applied) | 18621526 | https://seatgeek.com/needtobreathe-tickets/duluth-minnesota-decc-symphony-hall-2027-02-21-7-pm/concert/18621526 | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | mico | verify (applied) | 18665962 | https://seatgeek.com/mico-tickets/charleston-south-carolina-charleston-music-hall-2027-02-21-8-pm/concert/18665962 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | olivia-rodrigo | verify (applied) | 18226585 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-23-7-pm/concert/18226585 | - |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | polyphia | verify (applied) | 18312324 | https://seatgeek.com/polyphia-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-02-23-7-30-pm/concert/18312324 | - |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | chelsea-cutler | verify (applied) | 18639194 | https://seatgeek.com/chelsea-cutler-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-02-23-6-30-pm/concert/18639194 | - |

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
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-dallas-vvg1yz_1tobhle | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-nashville-g5viz_141b_9f | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-louisville-z7r9jz1a70f_w | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-kansas-city-vvg1bz_5nc5gbq | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
