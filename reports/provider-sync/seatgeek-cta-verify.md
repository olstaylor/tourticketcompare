# SeatGeek CTA verification log

Generated: 2026-11-03T23:35:38.059Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 2164 (needs_recheck: 959, provenance backfill: 5, stale re-check: 1763)
- Events skipped before API checks: 525
- API calls made: 800
- Verified provenance written: 377
- URLs added: 8
- URLs corrected: 0
- URLs cleared: 14
- Provenance un-verified: 0
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 385
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | verify (applied) | 18269203 | https://seatgeek.com/mon-laferte-tickets/salt-lake-city-utah-eccles-theater-2026-11-03-8-pm/concert/18269203 | - |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | victoria-monet | clear (applied) | - | - | stored URL failed: venue mismatch: 'Skyla Credit Union Amphitheatre' vs 'Ovens Auditorium'; no qualifying replacement found |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | verify (applied) | 18140310 | https://seatgeek.com/mon-laferte-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-05-8-pm/concert/18140310 | - |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mon-laferte-2026-san-jose-g5vyz_kmf8y1d | mon-laferte | verify (applied) | 18140311 | https://seatgeek.com/mon-laferte-tickets/san-jose-california-sap-center-at-san-jose-2026-11-06-8-pm/concert/18140311 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | mon-laferte | verify (applied) | 18140313 | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-07-8-pm/concert/18140313 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | mon-laferte | verify (applied) | 18311530 | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-08-8-pm/concert/18311530 | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | verify (applied) | 18250868 | https://seatgeek.com/don-omar-tickets/ontario-california-toyota-arena-ontario-2026-11-10-8-pm/concert/18250868 | - |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2026-dodge-city-vvg1bz_gx9hm-8 | gary-allan | verify (applied) | 18344599 | https://seatgeek.com/gary-allan-tickets/dodge-city-kansas-united-wireless-arena-2026-11-13-7-30-pm/concert/18344599 | - |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | los-tigres-del-norte | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-bristol-g5viz_25fd7l0 | jodeci | verify (applied) | 18407251 | https://seatgeek.com/jodeci-tickets/bristol-virginia-hard-rock-hotel-and-casino-bristol-2026-11-15-7-pm/concert/18407251 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | jonas-brothers | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-tyla-2026-seattle-vvg1hz_4ubjbln | tyla | clear (applied) | - | - | stored URL failed: venue mismatch: 'Paramount Theatre' vs 'WaMu Theater'; no qualifying replacement found |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh | three-days-grace | verify (applied) | 17895175 | https://seatgeek.com/three-days-grace-tickets/san-jose-california-sap-center-at-san-jose-2026-11-18-7-pm/concert/17895175 | - |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Pop's Concert Venue' vs 'Pop's - Sauget'; no qualifying replacement found |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | gary-allan | verify (applied) | 18391791 | https://seatgeek.com/gary-allan-tickets/lake-charles-louisiana-grand-event-center-golden-nugget-lake-charles-2026-11-20-8-30-pm/concert/18391791 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Fennec - Main Stage' vs 'The Fennec - Sports, Live Music, Events'; no qualifying replacement found |
| tm-gary-allan-2026-biloxi-g5viz_889usjk | gary-allan | verify (applied) | 18472669 | https://seatgeek.com/gary-allan-tickets/biloxi-mississippi-beau-rivage-theatre-2026-11-21-8-pm/concert/18472669 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'Roadrunner-Boston' vs 'TD Garden'; no qualifying replacement found |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'NOTO' vs 'Xfinity Mobile Arena'; no qualifying replacement found |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-gary-allan-2026-las-vegas-z7r9jz1aavf1f | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | imagine-dragons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2026-napa-g5vyz_3dfyx0l | gary-allan | verify (applied) | 18593936 | https://seatgeek.com/gary-allan-tickets/napa-california-uptown-theatre-napa-2026-12-05-8-pm/concert/18593936 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-hamilton-1avzz_4gkr__tfz | garth-brooks | verify (applied) | 18739726 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-06-2-pm/concert/18739726 | - |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-gary-allan-2026-bakersfield-z7r9jz1aae3j4 | gary-allan | verify (applied) | 18639145 | https://seatgeek.com/gary-allan-tickets/bakersfield-california-historic-bakersfield-fox-theater-2026-12-06-7-pm/concert/18639145 | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mon-laferte-2027-madrid-z698xz2qz16vquuz7t | mon-laferte | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mon-laferte-2027-brussels-z698xzg2z1kbx0fgb | mon-laferte | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Ramsey Concert Hall' vs 'Hodgson Concert Hall at the UGA Performing Arts Center'; no qualifying replacement found |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | clear (applied) | - | - | stored URL failed: venue mismatch: 'Mesa Theatre & Club' vs 'Mesa Theater'; no qualifying replacement found |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-barcelona-z698xz2qz16v0vckob | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-brussels-z698xzg2z16v4w_s4e | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-oslo-z698xzb_z1k8pbuqa | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-praha-9-z698xzu0z16vcf4gue | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-hamburg-z698xzc2z16v1k_wvn | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-warsaw-z698xzqpz1kf0av8y | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cage-the-elephant-2027-krakow-z698xzqpz16vup4eqe | cage-the-elephant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-meshuggah-2027-toronto-1a8zk4fgkepjpte | meshuggah | verify (applied) | 18724635 | https://seatgeek.com/meshuggah-tickets/toronto-canada-coca-cola-coliseum-2027-02-12-7-pm/concert/18724635 | - |
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-laval-1aszk4fgkdtnr8- | meshuggah | verify (applied) | 18724636 | https://seatgeek.com/meshuggah-tickets/laval-canada-place-bell-2027-02-13-7-pm/concert/18724636 | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-amsterdam-z698xzbpz16vffqn4a | theory-of-a-deadman | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | meshuggah | verify (applied) | 18724637 | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 | - |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-chicago-vv1a7zk49gkdpmbhc | meshuggah | verify (applied) | 18724638 | https://seatgeek.com/meshuggah-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-17-6-pm/concert/18724638 | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2027-tysons-17a8v0g65hn_upy | gary-allan | verify (applied) | 18281788 | https://seatgeek.com/gary-allan-tickets/tysons-virginia-capital-one-hall-2027-02-18-7-30-pm/concert/18281788 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2027-greensboro-g5evz_89x5mox | gary-allan | verify (applied) | 18449332 | https://seatgeek.com/gary-allan-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2027-02-19-7-30-pm/concert/18449332 | - |
| tm-meshuggah-2027-minneapolis-vv1akzk44gkdfvhxa | meshuggah | verify (applied) | 18724640 | https://seatgeek.com/meshuggah-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-02-19-7-pm/concert/18724640 | - |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | air-supply | add (applied) | 18646927 | https://seatgeek.com/air-supply-tickets/penticton-canada-south-okanagan-events-centre-2027-02-19-6-30-pm/concert/18646927 | - |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2027-spartanburg-g5evz_8fssjkd | gary-allan | verify (applied) | 18446298 | https://seatgeek.com/gary-allan-tickets/spartanburg-south-carolina-spartanburg-memorial-auditorium-2027-02-20-7-30-pm/concert/18446298 | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | meshuggah | verify (applied) | 18724639 | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-prince-george-z7r9jz1aaek-z | air-supply | add (applied) | 18736469 | https://seatgeek.com/air-supply-tickets/prince-george-canada-cn-centre-2027-02-21-6-30-pm/concert/18736469 | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z1kaejyfv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z16v0wbofv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-brussels-z698xzg2z16vjkuafp | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-brussels-z698xzg2z16v_0_u-k | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-madrid-z698xz2qz1kuvp4rv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-barcelona-z698xz2qz1koa3fud | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tash-sultana-2027-merksem-antwerpen-z698xzg2z1kjpqofb | tash-sultana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-warsaw-z698xzqpz1kbba-jk | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-praha-8-z698xzu0z1kauc3vb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-zurich-z698xzu3z16vqkfsq4 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-vienna-z698xz5rz16vr81eow | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | tash-sultana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-berlin-z698xzc2z1ku0c686 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jake-bugg-2027-madrid-z698xz2qz1k_y8v-_ | jake-bugg | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jake-bugg-2027-barcelona-z698xz2qz16vps_0bf | jake-bugg | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_k | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-vancouver-z7r9jz1aa7tay | meshuggah | add (applied) | 18724665 | https://seatgeek.com/meshuggah-tickets/vancouver-canada-pne-forum-vancouver-2027-04-15-7-pm/concert/18724665 | - |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jake-bugg-2027-amsterdam-z698xzbpz1k7936fe | jake-bugg | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | meshuggah | add (applied) | 18724675 | https://seatgeek.com/meshuggah-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-21-7-pm/concert/18724675 | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-u2-2027-stockholm-z698xzq2z16v-3vzat | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-u2-2027-stockholm-z698xzq2z16v_p7i1a | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-malmo-z698xzq2z1k-ga_fv | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | meshuggah | add (applied) | 18724684 | https://seatgeek.com/meshuggah-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-05-01-7-pm/concert/18724684 | - |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | meshuggah | add (applied) | 18709209 | https://seatgeek.com/meshuggah-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2027-05-09-7-pm/concert/18709209 | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-cleveland-vv1aazk4pgkduzdwy | blondshell | verify (applied) | 18738820 | https://seatgeek.com/blondshell-tickets/cleveland-ohio-the-odeon-concert-club-2027-05-18-8-pm/concert/18738820 | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | add (applied) | 18271150 | https://seatgeek.com/the-airborne-toxic-event-tickets/glenside-pennsylvania-keswick-theatre-2027-05-19-8-pm/concert/18271150 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | hazlett | add (applied) | 18319961 | https://seatgeek.com/hazlett-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-05-21-7-30-pm/concert/18319961 | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-thirty-seconds-to-mars-2027-helsinki-z698xz8kz16v7so3fa | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-praha-9-z698xzu0z1k3k74-f | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-u2-2027-amsterdam-z698xzbpz16v0jupoj | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-gliwice-z698xzqpz1kckp0pa | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-u2-2027-amsterdam-z698xzbpz16v7bpzfv | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-gdansk-sopot-z698xzqpz16vv6c7f6 | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-motionless-in-white-2027-dubendorf-z698xzu3z16ezmoj16 | motionless-in-white | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-krakow-z698xzqpz16evtf6jd | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-odz-z698xzqpz1k06xapf | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-magdeburg-z698xzc2z16vzxvefv | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-rastatt-z698xzc2z1ke30sgb | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-hemer-z698xzc2z16vagofpv | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-interrupters-2027-k-benhavn-v-z698xzc4z1k8bb3pe | the-interrupters | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-valencia-z698xz2qz16vfzvzrf | queens-of-the-stone-age | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-fulda-z698xzc2z16v1vjxok | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-nurnberg-z698xzc2z16vv6jt_f | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-konstanz-z698xzc2z1kjfov_n | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-fulda-z698xzc2z1k86g-_z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-nurnberg-z698xzc2z16v0aozkf | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-klagenfurt-z698xz5rz1kgyvv34 | sting | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-halle-westfalen-z698xzc2z16voo4puj | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-hemer-z698xzc2z16v_nfy_4 | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-bryan-adams-2027-hemer-z698xzc2z1k_buyvn | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-bonn-z698xzc2z16v89qo0p | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-bonn-z698xzc2z1kpoq9-n | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-rosenheim-z698xzc2z16eva4pqp | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-halle-westfalen-z698xzc2z1kj7akbg | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | santana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | santana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-baunatal-z698xzc2z1kxv_kf3 | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-erfurt-z698xzc2z1kczab8v | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-magdeburg-z698xzc2z16vb8r7pg | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-deggendorf-z698xzc2z1kaap_ay | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ng- | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_a | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-warsaw-z698xzqpz1kgpab4t | meshuggah | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | sabaton | verify (applied) | 17857308 | https://seatgeek.com/sabaton-tickets/milwaukee-wisconsin-landmark-credit-union-live-2026-11-21-7-pm/concert/17857308 | - |
| tm-los-tigres-del-norte-2026-detroit-vv1kezv0jiga2jpfm | los-tigres-del-norte | verify (applied) | 18138848 | https://seatgeek.com/los-tigres-del-norte-tickets/detroit-michigan-fox-theatre-detroit-2026-11-21-8-pm/concert/18138848 | - |
| tm-zac-brown-band-2026-rosemont-vv1a7zk8sgkdldbon | zac-brown-band | verify (applied) | 18032037 | https://seatgeek.com/zac-brown-band-tickets/rosemont-illinois-allstate-arena-2026-11-21-7-pm/concert/18032037 | - |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | victoria-monet | verify (applied) | 18579799 | https://seatgeek.com/victoria-monet-tickets/toronto-canada-coca-cola-coliseum-2026-11-21-8-pm/concert/18579799 | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | brandi-carlile | verify (applied) | 18626671 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-21-8-pm/concert/18626671 | - |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | ty-myers | verify (applied) | 18142347 | https://seatgeek.com/ty-myers-tickets/fort-worth-texas-dickies-arena-2026-11-21-7-30-pm/concert/18142347 | - |
| tm-death-cab-for-cutie-2026-chicago-vvg18z_cej4l_d | death-cab-for-cutie | verify (applied) | 18393602 | https://seatgeek.com/death-cab-for-cutie-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-21-8-pm/concert/18393602 | - |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | stevie-wonder | verify (applied) | 18570213 | https://seatgeek.com/stevie-wonder-tickets/chicago-illinois-united-center-2026-11-21-8-pm/concert/18570213 | - |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | arcangel | verify (applied) | 18266334 | https://seatgeek.com/arcangel-tickets/san-jose-california-san-jose-civic-2026-11-21-8-pm/concert/18266334 | - |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | katseye | verify (applied) | 18240162 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-21-8-pm/concert/18240162 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9um | calvin-harris | verify (applied) | 18701919 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-11-21-10-30-pm/concert/18701919 | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | verify (applied) | 18427238 | https://seatgeek.com/pentatonix-tickets/hamilton-canada-td-coliseum-2026-11-22-6-pm/concert/18427238 | - |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | the-neighbourhood | verify (applied) | 18194371 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-22-6-pm/concert/18194371 | - |
| tm-missio-2026-boston-vv177z_8gklypyp_ | missio | verify (applied) | 18492289 | https://seatgeek.com/missio-tickets/boston-massachusetts-brighton-music-hall-2026-11-22-7-pm/concert/18492289 | - |
| tm-trivium-2026-madison-vvg1jz_cbaz-zj | trivium | verify (applied) | 18391957 | https://seatgeek.com/trivium-tickets/madison-wisconsin-the-sylvee-2026-11-22-6-35-pm/concert/18391957 | - |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | beartooth | verify (applied) | 18253048 | https://seatgeek.com/beartooth-tickets/omaha-nebraska-steelhouse-omaha-2026-11-22-6-30-pm/concert/18253048 | - |
| tm-blue-october-2026-atlanta-vvg1zz_6ddzdk3 | blue-october | verify (applied) | 18140880 | https://seatgeek.com/blue-october-tickets/atlanta-georgia-the-tabernacle-atlanta-2026-11-22-8-pm/concert/18140880 | - |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | sabaton | verify (applied) | 17732691 | https://seatgeek.com/sabaton-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-11-22-7-pm/concert/17732691 | - |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | victoria-monet | verify (applied) | 18579779 | https://seatgeek.com/victoria-monet-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-11-22-8-pm/concert/18579779 | - |
| tm-little-big-town-2026-toronto-177zv0g6g2_mkrp | little-big-town | verify (applied) | 18292641 | https://seatgeek.com/little-big-town-tickets/toronto-canada-massey-hall-2026-11-22-8-pm/concert/18292641 | - |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | brandi-carlile | verify (applied) | 18626672 | https://seatgeek.com/brandi-carlile-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-22-8-pm/concert/18626672 | - |
| tm-journey-2026-denver-g5vzz_1kxjfbe | journey | verify (applied) | 18237128 | https://seatgeek.com/journey-tickets/denver-colorado-ball-arena-2026-11-22-7-30-pm/concert/18237128 | - |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | katseye | verify (applied) | 18258420 | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-22-8-pm/concert/18258420 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | verify (applied) | 18211703 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-23-7-pm/concert/18211703 | - |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | verify (applied) | 18570216 | https://seatgeek.com/stevie-wonder-tickets/washington-district-of-columbia-capital-one-arena-2026-11-23-8-pm/concert/18570216 | - |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | trans-siberian-orchestra | verify (applied) | 18573369 | https://seatgeek.com/trans-siberian-orchestra-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-24-7-30-pm/concert/18573369 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | verify (applied) | 18211705 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-24-7-pm/concert/18211705 | - |
| tm-sabaton-2026-chicago-vv178zbwgkltpkse | sabaton | verify (applied) | 17732693 | https://seatgeek.com/sabaton-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-24-7-pm/concert/17732693 | - |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | victoria-monet | verify (applied) | 18579782 | https://seatgeek.com/victoria-monet-tickets/new-york-new-york-the-theater-at-msg-1-2026-11-24-8-pm/concert/18579782 | - |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | katseye | verify (applied) | 18240163 | https://seatgeek.com/katseye-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-24-8-pm/concert/18240163 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | steve-lacy | verify (applied) | 18485954 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-24-8-pm/concert/18485954 | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | verify (applied) | 17769355 | https://seatgeek.com/doja-cat-tickets/toronto-canada-scotiabank-arena-2026-11-25-7-30-pm/concert/17769355 | - |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | sabaton | verify (applied) | 17732688 | https://seatgeek.com/sabaton-tickets/waukee-iowa-vibrant-music-hall-2026-11-25-7-pm/concert/17732688 | - |
| tm-blue-october-2026-nashville-g5viz_kskltsv | blue-october | verify (applied) | 18126041 | https://seatgeek.com/blue-october-tickets/nashville-tennessee-the-truth-nashville-2026-11-25-8-pm/concert/18126041 | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8bk7kme | steve-lacy | verify (applied) | 18613496 | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-25-8-pm/concert/18613496 | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | tyla | verify (applied) | 18404308 | https://seatgeek.com/tyla-tickets/toronto-canada-coca-cola-coliseum-2026-11-26-8-pm/concert/18404308 | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | trans-siberian-orchestra | verify (applied) | 18573376 | https://seatgeek.com/trans-siberian-orchestra-tickets/manchester-new-hampshire-snhu-arena-2026-11-27-2-30-pm/concert/18573376 | - |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | trans-siberian-orchestra | verify (applied) | 18573377 | https://seatgeek.com/trans-siberian-orchestra-tickets/boise-idaho-extramile-arena-2026-11-27-2-pm/concert/18573377 | - |
| tm-john-summit-2026-philadelphia-vvg1fz_5ctejox | john-summit | verify (applied) | 18257265 | https://seatgeek.com/john-summit-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-27-7-pm/concert/18257265 | - |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | doja-cat | verify (applied) | 17769357 | https://seatgeek.com/doja-cat-tickets/montreal-canada-centre-bell-2026-11-27-7-30-pm/concert/17769357 | - |
| tm-los-tigres-del-norte-2026-baltimore-164zko9e6zackudg | los-tigres-del-norte | verify (applied) | 18092532 | https://seatgeek.com/los-tigres-del-norte-tickets/baltimore-maryland-cfg-bank-arena-2026-11-27-8-pm/concert/18092532 | - |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | victoria-monet | verify (applied) | 18579783 | https://seatgeek.com/victoria-monet-tickets/washington-district-of-columbia-the-anthem-dc-2026-11-27-8-pm/concert/18579783 | - |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | jonas-brothers | verify (applied) | 18503907 | https://seatgeek.com/jonas-brothers-tickets/glendale-arizona-desert-diamond-arena-2026-11-27-7-30-pm/concert/18503907 | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | cristian-castro | verify (applied) | 18082276 | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | eagles | verify (applied) | 18219952 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-27-8-30-pm/concert/18219952 | - |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | trans-siberian-orchestra | verify (applied) | 18573384 | https://seatgeek.com/trans-siberian-orchestra-tickets/worcester-massachusetts-dcu-center-2026-11-28-3-pm/concert/18573384 | - |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | trans-siberian-orchestra | verify (applied) | 18573385 | https://seatgeek.com/trans-siberian-orchestra-tickets/portland-oregon-moda-center-2026-11-28-3-30-pm/concert/18573385 | - |
| tm-pentatonix-2026-charlottesville-vv1f7z_8uv7ozdc1c | pentatonix | verify (applied) | 18427205 | https://seatgeek.com/pentatonix-tickets/charlottesville-virginia-john-paul-jones-arena-2026-11-28-7-pm/concert/18427205 | - |
| tm-sabaton-2026-cincinnati-1avbzbwgkn0vsnb | sabaton | verify (applied) | 17732695 | https://seatgeek.com/sabaton-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-11-28-7-pm/concert/17732695 | - |
| tm-beartooth-2026-nashville-g5viz_1sjbpcf | beartooth | verify (applied) | 18253047 | https://seatgeek.com/beartooth-tickets/nashville-tennessee-the-truth-nashville-2026-11-28-6-30-pm/concert/18253047 | - |
| tm-trivium-2026-houston-g5diz_cdfyhi_ | trivium | verify (applied) | 18391965 | https://seatgeek.com/trivium-tickets/houston-texas-bayou-music-center-2026-11-28-6-35-pm/concert/18391965 | - |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | a-boogie-wit-da-hoodie | verify (applied) | 18629264 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/toronto-canada-scotiabank-arena-2026-11-28-8-pm/concert/18629264 | - |
| tm-los-tigres-del-norte-2026-belmont-park-1kgzv0pfgagsn5l | los-tigres-del-norte | verify (applied) | 18093247 | https://seatgeek.com/los-tigres-del-norte-tickets/elmont-new-york-ubs-arena-2026-11-28-8-pm/concert/18093247 | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | cristian-castro | verify (applied) | 18077764 | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | eagles | verify (applied) | 18219951 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-28-8-30-pm/concert/18219951 | - |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | trans-siberian-orchestra | verify (applied) | 18573390 | https://seatgeek.com/trans-siberian-orchestra-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-29-3-pm/concert/18573390 | - |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | trans-siberian-orchestra | verify (applied) | 18573391 | https://seatgeek.com/trans-siberian-orchestra-tickets/seattle-washington-climate-pledge-arena-2026-11-29-3-pm/concert/18573391 | - |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | sabaton | verify (applied) | 17732696 | https://seatgeek.com/sabaton-tickets/detroit-michigan-the-fillmore-detroit-2026-11-29-7-pm/concert/17732696 | - |
| tm-beartooth-2026-atlanta-vvg1zz_1br-um- | beartooth | verify (applied) | 18253055 | https://seatgeek.com/beartooth-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-11-29-6-30-pm/concert/18253055 | - |
| tm-trivium-2026-dallas-vvg1yz_cdoxznj | trivium | verify (applied) | 18391967 | https://seatgeek.com/trivium-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-29-6-35-pm/concert/18391967 | - |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | the-neighbourhood | verify (applied) | 18085146 | https://seatgeek.com/the-neighbourhood-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-30-7-30-pm/concert/18085146 | - |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | brent-faiyaz | verify (applied) | 18617422 | https://seatgeek.com/brent-faiyaz-tickets/chicago-illinois-united-center-2026-11-30-8-pm/concert/18617422 | - |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | victoria-monet | verify (applied) | 18579785 | https://seatgeek.com/victoria-monet-tickets/nashville-tennessee-the-truth-nashville-2026-11-30-8-pm/concert/18579785 | - |
| tm-steve-lacy-2026-vancouver-1aozkf7gkepzmxx | steve-lacy | verify (applied) | 18485961 | https://seatgeek.com/steve-lacy-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-30-8-pm/concert/18485961 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | jonas-brothers | verify (applied) | 18503919 | https://seatgeek.com/jonas-brothers-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-30-7-30-pm/concert/18503919 | - |
| tm-beartooth-2026-charlotte-g5evz_1mwgsx1 | beartooth | verify (applied) | 18253056 | https://seatgeek.com/beartooth-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-01-6-30-pm/concert/18253056 | - |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | sabaton | verify (applied) | 17732703 | https://seatgeek.com/sabaton-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-01-7-pm/concert/17732703 | - |
| tm-gavin-adcock-2026-houston-g5diz_3mqabzl | gavin-adcock | verify (applied) | 18701462 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-713-music-hall-2026-12-01-7-30-pm/concert/18701462 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | olivia-rodrigo | verify (applied) | 18211742 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-01-7-pm/concert/18211742 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | trans-siberian-orchestra | verify (applied) | 18573399 | https://seatgeek.com/trans-siberian-orchestra-tickets/sacramento-california-golden-1-center-2026-12-02-3-pm/concert/18573399 | - |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | sabaton | verify (applied) | 17732700 | https://seatgeek.com/sabaton-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-02-7-pm/concert/17732700 | - |
| tm-trivium-2026-phoenix-17k8v0g62douihb | trivium | verify (applied) | 18391969 | https://seatgeek.com/trivium-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-02-6-30-pm/concert/18391969 | - |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | trans-siberian-orchestra | verify (applied) | 18573401 | https://seatgeek.com/trans-siberian-orchestra-tickets/nashville-tennessee-bridgestone-arena-2026-12-02-7-30-pm/concert/18573401 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | olivia-rodrigo | verify (applied) | 18211743 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-02-7-pm/concert/18211743 | - |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | koe-wetzel | verify (applied) | 18649773 | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | victoria-monet | verify (applied) | 18579809 | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | the-neighbourhood | verify (applied) | 18085147 | https://seatgeek.com/the-neighbourhood-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-02-7-30-pm/concert/18085147 | - |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | jonas-brothers | verify (applied) | 18503918 | https://seatgeek.com/jonas-brothers-tickets/anaheim-california-honda-center-2026-12-02-7-30-pm/concert/18503918 | - |
| tm-sabaton-2026-pittsburgh-1avbz_kgkwfjp1j | sabaton | verify (applied) | 18126079 | https://seatgeek.com/sabaton-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-03-7-pm/concert/18126079 | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | trans-siberian-orchestra | verify (applied) | 18573402 | https://seatgeek.com/trans-siberian-orchestra-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2026-12-03-7-30-pm/concert/18573402 | - |
| tm-tommy-emmanuel-2026-charleston-g5evz_aboyxr9 | tommy-emmanuel | verify (applied) | 18225241 | https://seatgeek.com/tommy-emmanuel-tickets/charleston-south-carolina-charleston-music-hall-2026-12-03-8-pm/concert/18225241 | - |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | brent-faiyaz | verify (applied) | 18618383 | https://seatgeek.com/brent-faiyaz-tickets/brooklyn-new-york-barclays-center-2026-12-03-8-pm/concert/18618383 | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | trans-siberian-orchestra | verify (applied) | 18573408 | https://seatgeek.com/trans-siberian-orchestra-tickets/fresno-california-save-mart-center-2026-12-03-7-pm/concert/18573408 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | verify (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | barry-manilow | verify (applied) | 17637156 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-03-7-pm/concert/17637156 | - |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | pink-martini | verify (applied) | 18267277 | https://seatgeek.com/pink-martini-tickets/reno-nevada-grand-sierra-resort-2026-12-03-7-30-pm/concert/18267277 | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | trans-siberian-orchestra | verify (applied) | 18573409 | https://seatgeek.com/trans-siberian-orchestra-tickets/toledo-ohio-huntington-center-2026-12-04-3-pm/concert/18573409 | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | blue-october | verify (applied) | 18141993 | https://seatgeek.com/blue-october-tickets/minneapolis-minnesota-fillmore-minneapolis-2026-12-04-7-pm/concert/18141993 | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkrzxgxw | garth-brooks | verify (applied) | 18726838 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-04-8-pm/concert/18726838 | - |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | lil-wayne | verify (applied) | 18128388 | https://seatgeek.com/lil-wayne-tickets/lexington-kentucky-rupp-arena-2026-12-04-8-30-pm/concert/18128388 | - |
| tm-los-tigres-del-norte-2026-nashville-g5viz_an5hweq | los-tigres-del-norte | verify (applied) | 18092545 | https://seatgeek.com/los-tigres-del-norte-tickets/nashville-tennessee-bridgestone-arena-2026-12-04-8-pm/concert/18092545 | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | koe-wetzel | verify (applied) | 18649774 | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | the-neighbourhood | verify (applied) | 18085152 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-04-7-pm/concert/18085152 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | barry-manilow | verify (applied) | 17637157 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-04-8-pm/concert/17637157 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | eagles | verify (applied) | 18355049 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-04-8-30-pm/concert/18355049 | - |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | trans-siberian-orchestra | verify (applied) | 18573412 | https://seatgeek.com/trans-siberian-orchestra-tickets/columbus-ohio-nationwide-arena-2026-12-05-3-pm/concert/18573412 | - |
| tm-pentatonix-2026-columbia-g5evz_2t_yqom | pentatonix | verify (applied) | 18427214 | https://seatgeek.com/pentatonix-tickets/columbia-south-carolina-colonial-life-arena-2026-12-05-7-pm/concert/18427214 | - |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | sabaton | verify (applied) | 17732702 | https://seatgeek.com/sabaton-tickets/virginia-beach-virginia-the-dome-13-2026-12-05-7-pm/concert/17732702 | - |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | lil-wayne | verify (applied) | 18649583 | https://seatgeek.com/lil-wayne-tickets/savannah-georgia-enmarket-arena-2026-12-05-7-pm/concert/18649583 | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | koe-wetzel | verify (applied) | 18649776 | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 | - |
| tm-tommy-emmanuel-2026-chattanooga-g5viz_au3swzr | tommy-emmanuel | verify (applied) | 18225539 | https://seatgeek.com/tommy-emmanuel-tickets/chattanooga-tennessee-the-walker-theatre-chattanooga-2026-12-05-7-30-pm/concert/18225539 | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkre8jcm | garth-brooks | verify (applied) | 18726837 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-05-8-pm/concert/18726837 | - |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | blue-october | verify (applied) | 18142048 | https://seatgeek.com/blue-october-tickets/la-vista-nebraska-the-astro-theater-la-vista-2026-12-05-8-pm/concert/18142048 | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | the-neighbourhood | verify (applied) | 18194373 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-05-6-pm/concert/18194373 | - |
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | los-tigres-del-norte | verify (applied) | 18092802 | https://seatgeek.com/los-tigres-del-norte-tickets/birmingham-alabama-bjcc-concert-hall-2026-12-05-8-pm/concert/18092802 | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | trivium | verify (applied) | 18391974 | https://seatgeek.com/trivium-tickets/san-francisco-california-the-masonic-san-francisco-2026-12-05-6-35-pm/concert/18391974 | - |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | luke-bryan | verify (applied) | 18571831 | https://seatgeek.com/luke-bryan-tickets/mescalero-new-mexico-inn-of-the-mountain-gods-resort-and-casino-2026-12-05-8-pm/concert/18571831 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | barry-manilow | verify (applied) | 17637159 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 | - |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | victoria-monet | verify (applied) | 18579787 | https://seatgeek.com/victoria-monet-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-05-8-pm/concert/18579787 | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | jonas-brothers | verify (applied) | 18503920 | https://seatgeek.com/jonas-brothers-tickets/seattle-washington-climate-pledge-arena-2026-12-05-7-30-pm/concert/18503920 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | eagles | verify (applied) | 18355050 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-05-8-30-pm/concert/18355050 | - |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | trans-siberian-orchestra | verify (applied) | 18573423 | https://seatgeek.com/trans-siberian-orchestra-tickets/grand-rapids-michigan-van-andel-arena-2026-12-06-3-pm/concert/18573423 | - |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | trans-siberian-orchestra | verify (applied) | 18573424 | https://seatgeek.com/trans-siberian-orchestra-tickets/phoenix-arizona-mortgage-matchup-center-2026-12-06-3-pm/concert/18573424 | - |
| tm-pentatonix-2026-greenville-g5evz_2tznjd_ | pentatonix | verify (applied) | 18427215 | https://seatgeek.com/pentatonix-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-06-6-pm/concert/18427215 | - |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | sabaton | verify (applied) | 17732707 | https://seatgeek.com/sabaton-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-12-06-7-pm/concert/17732707 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | victoria-monet | verify (applied) | 18579790 | https://seatgeek.com/victoria-monet-tickets/san-diego-california-cal-coast-credit-union-open-air-theatre-at-sdsu-2026-12-06-8-pm/concert/18579790 | - |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | beartooth | verify (applied) | 18253062 | https://seatgeek.com/beartooth-tickets/new-orleans-louisiana-fillmore-new-orleans-2026-12-07-5-30-pm/concert/18253062 | - |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | pentatonix | verify (applied) | 18427217 | https://seatgeek.com/pentatonix-tickets/raleigh-north-carolina-lenovo-center-2026-12-07-7-pm/concert/18427217 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | sabaton | verify (applied) | 17732711 | https://seatgeek.com/sabaton-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-08-7-pm/concert/17732711 | - |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | stevie-wonder | verify (applied) | 18570215 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-08-8-pm/concert/18570215 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | little-big-town | verify (applied) | 18385970 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | trivium | verify (applied) | 18391979 | https://seatgeek.com/trivium-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-12-08-6-35-pm/concert/18391979 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | victoria-monet | verify (applied) | 18579791 | https://seatgeek.com/victoria-monet-tickets/inglewood-california-youtube-theater-2026-12-08-8-pm/concert/18579791 | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | trans-siberian-orchestra | verify (applied) | 18573432 | https://seatgeek.com/trans-siberian-orchestra-tickets/allentown-pennsylvania-ppl-center-2026-12-09-7-30-pm/concert/18573432 | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | sabaton | verify (applied) | 18126050 | https://seatgeek.com/sabaton-tickets/nashville-tennessee-the-truth-nashville-2026-12-09-7-pm/concert/18126050 | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | trans-siberian-orchestra | verify (applied) | 18573433 | https://seatgeek.com/trans-siberian-orchestra-tickets/austin-texas-moody-center-atx-2026-12-09-7-pm/concert/18573433 | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | stevie-wonder | verify (applied) | 18570217 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-09-8-pm/concert/18570217 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | verify (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | little-big-town | verify (applied) | 18385972 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | jonas-brothers | verify (applied) | 18503921 | https://seatgeek.com/jonas-brothers-tickets/denver-colorado-ball-arena-2026-12-09-7-30-pm/concert/18503921 | - |
| tm-trivium-2026-seattle-vvg1hz_2dp1x5t | trivium | verify (applied) | 18391981 | https://seatgeek.com/trivium-tickets/seattle-washington-paramount-theatre-wa-2026-12-09-6-35-pm/concert/18391981 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | trans-siberian-orchestra | verify (applied) | 18573435 | https://seatgeek.com/trans-siberian-orchestra-tickets/raleigh-north-carolina-lenovo-center-2026-12-10-7-30-pm/concert/18573435 | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | trans-siberian-orchestra | verify (applied) | 18573436 | https://seatgeek.com/trans-siberian-orchestra-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-10-7-pm/concert/18573436 | - |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | jonas-brothers | verify (applied) | 18503923 | https://seatgeek.com/jonas-brothers-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-12-10-7-30-pm/concert/18503923 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | little-big-town | verify (applied) | 18385974 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 | - |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | blue-october | verify (applied) | 18140959 | https://seatgeek.com/blue-october-tickets/beaumont-texas-jefferson-theatre-2026-12-10-8-pm/concert/18140959 | - |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | cece-winans | verify (applied) | 18361599 | https://seatgeek.com/cece-winans-tickets/seattle-washington-wamu-theater-2026-12-10-7-pm/concert/18361599 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | barry-manilow | verify (applied) | 17637161 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-10-7-pm/concert/17637161 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | trans-siberian-orchestra | verify (applied) | 18573437 | https://seatgeek.com/trans-siberian-orchestra-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-12-11-3-pm/concert/18573437 | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | trivium | verify (applied) | 18391984 | https://seatgeek.com/trivium-tickets/reno-nevada-grand-sierra-resort-2026-12-11-6-35-pm/concert/18391984 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | olivia-rodrigo | verify (applied) | 18211712 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-11-7-pm/concert/18211712 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
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
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | a-boogie-wit-da-hoodie | verify (applied) | 18631720 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-12-12-8-pm/concert/18631720 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | olivia-rodrigo | verify (applied) | 18211714 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-12-7-pm/concert/18211714 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | barry-manilow | verify (applied) | 17637164 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-12-7-pm/concert/17637164 | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | john-summit | verify (applied) | 18494071 | https://seatgeek.com/john-summit-tickets/los-angeles-california-los-angeles-memorial-coliseum-2026-12-12-7-pm/concert/18494071 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | eagles | verify (applied) | 18355051 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | trans-siberian-orchestra | verify (applied) | 18573455 | https://seatgeek.com/trans-siberian-orchestra-tickets/duluth-georgia-gas-south-arena-2026-12-13-3-pm/concert/18573455 | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | trans-siberian-orchestra | verify (applied) | 18573458 | https://seatgeek.com/trans-siberian-orchestra-tickets/dallas-texas-american-airlines-center-2026-12-13-3-pm/concert/18573458 | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | pentatonix | verify (applied) | 18427226 | https://seatgeek.com/pentatonix-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-13-6-pm/concert/18427226 | - |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | beartooth | verify (applied) | 18253071 | https://seatgeek.com/beartooth-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-12-13-6-pm/concert/18253071 | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | andrea-bocelli | verify (applied) | 18039188 | https://seatgeek.com/andrea-bocelli-tickets/montreal-canada-centre-bell-2026-12-13-8-pm/concert/18039188 | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | blue-october | verify (applied) | 18140941 | https://seatgeek.com/blue-october-tickets/hidalgo-texas-payne-arena-2026-12-13-8-pm/concert/18140941 | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | jonas-brothers | verify (applied) | 18503930 | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | brandi-carlile | verify (applied) | 18626674 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-15-8-pm/concert/18626674 | - |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | cece-winans | verify (applied) | 18361639 | https://seatgeek.com/cece-winans-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-15-7-pm/concert/18361639 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | olivia-rodrigo | verify (applied) | 18211717 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-15-7-pm/concert/18211717 | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | tyla | verify (applied) | 18404300 | https://seatgeek.com/tyla-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-12-15-8-pm/concert/18404300 | - |
| tm-pink-martini-2026-red-bank-g5vvz_gnt3jau | pink-martini | verify (applied) | 18325734 | https://seatgeek.com/pink-martini-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-12-16-7-30-pm/concert/18325734 | - |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | trans-siberian-orchestra | verify (applied) | 18573461 | https://seatgeek.com/trans-siberian-orchestra-tickets/charlottesville-virginia-john-paul-jones-arena-2026-12-16-7-30-pm/concert/18573461 | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | trivium | verify (applied) | 18391988 | https://seatgeek.com/trivium-tickets/omaha-nebraska-steelhouse-omaha-2026-12-16-6-35-pm/concert/18391988 | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | trans-siberian-orchestra | verify (applied) | 18573466 | https://seatgeek.com/trans-siberian-orchestra-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-12-16-7-pm/concert/18573466 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | brandi-carlile | verify (applied) | 18626676 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-16-8-pm/concert/18626676 | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | beartooth | verify (applied) | 18253074 | https://seatgeek.com/beartooth-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-16-6-30-pm/concert/18253074 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | trans-siberian-orchestra | verify (applied) | 18573467 | https://seatgeek.com/trans-siberian-orchestra-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-12-17-7-pm/concert/18573467 | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | trans-siberian-orchestra | verify (applied) | 18573470 | https://seatgeek.com/trans-siberian-orchestra-tickets/albany-new-york-mvp-arena-2026-12-17-7-30-pm/concert/18573470 | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | andrea-bocelli | verify (applied) | 18039167 | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-17-8-pm/concert/18039167 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | brandi-carlile | verify (applied) | 18626680 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-17-8-pm/concert/18626680 | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | blue-october | verify (applied) | 18140982 | https://seatgeek.com/blue-october-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2026-12-17-8-pm/concert/18140982 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | barry-manilow | verify (applied) | 17637167 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-17-7-pm/concert/17637167 | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | trans-siberian-orchestra | verify (applied) | 18573472 | https://seatgeek.com/trans-siberian-orchestra-tickets/hershey-pennsylvania-giant-center-2026-12-18-3-pm/concert/18573472 | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | trivium | verify (applied) | 18391991 | https://seatgeek.com/trivium-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-18-6-35-pm/concert/18391991 | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | blue-october | verify (applied) | 18141897 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-18-8-pm/concert/18141897 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | cece-winans | verify (applied) | 18361612 | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | gracie-abrams | verify (applied) | 18270524 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-18-8-pm/concert/18270524 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | barry-manilow | verify (applied) | 17637169 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-18-8-pm/concert/17637169 | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | trans-siberian-orchestra | verify (applied) | 18573474 | https://seatgeek.com/trans-siberian-orchestra-tickets/orlando-florida-kia-center-2026-12-19-2-30-pm/concert/18573474 | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | trans-siberian-orchestra | verify (applied) | 18573477 | https://seatgeek.com/trans-siberian-orchestra-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-19-2-30-pm/concert/18573477 | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | trivium | verify (applied) | 18391993 | https://seatgeek.com/trivium-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-19-6-35-pm/concert/18391993 | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | jonas-brothers | verify (applied) | 18503931 | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | yacht-rock-revue | verify (applied) | 18551886 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-19-8-pm/concert/18551886 | - |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | simple-plan | verify (applied) | 18207565 | https://seatgeek.com/simple-plan-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2026-12-19-8-pm/concert/18207565 | - |
| tm-blue-october-2026-houston-g5diz_65lyohs | blue-october | verify (applied) | 18141898 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-19-8-pm/concert/18141898 | - |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | pentatonix | verify (applied) | 18427231 | https://seatgeek.com/pentatonix-tickets/glendale-arizona-desert-diamond-arena-2026-12-19-7-pm/concert/18427231 | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | nickelback | verify (applied) | 18629578 | https://seatgeek.com/nickelback-tickets/durant-oklahoma-choctaw-grand-theater-2026-12-19-8-pm/concert/18629578 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | beartooth | verify (applied) | 18253079 | https://seatgeek.com/beartooth-tickets/wheatland-california-hard-rock-live-sacramento-2026-12-19-6-30-pm/concert/18253079 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | barry-manilow | verify (applied) | 17637171 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-19-7-pm/concert/17637171 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | gracie-abrams | verify (applied) | 18270527 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-19-8-pm/concert/18270527 | - |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | stevie-wonder | verify (applied) | 18570218 | https://seatgeek.com/stevie-wonder-tickets/inglewood-california-intuit-dome-2026-12-19-8-pm/concert/18570218 | - |
| tm-tyla-2026-las-vegas-17ayv0g629nf-rw | tyla | verify (applied) | 18404302 | https://seatgeek.com/tyla-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-12-19-9-pm/concert/18404302 | - |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | a-perfect-circle | verify (applied) | 18246867 | https://seatgeek.com/a-perfect-circle-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-12-19-8-pm/concert/18246867 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | trans-siberian-orchestra | verify (applied) | 18573484 | https://seatgeek.com/trans-siberian-orchestra-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-20-3-pm/concert/18573484 | - |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | trans-siberian-orchestra | verify (applied) | 18573485 | https://seatgeek.com/trans-siberian-orchestra-tickets/tampa-florida-benchmark-international-arena-2026-12-20-3-pm/concert/18573485 | - |
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
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | backstreet-boys | verify (applied) | 18470170 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-31-10-pm/concert/18470170 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-phish-2027-new-york-g5diz_kv3yvxl | phish | verify (applied) | 18659382 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-01-7-30-pm/concert/18659382 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | backstreet-boys | verify (applied) | 18470178 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-01-8-pm/concert/18470178 | - |
| tm-illenium-2027-san-francisco-g5vyz_kuqzndv | illenium | verify (applied) | 18723868 | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-01-01-8-pm/concert/18723868 | - |
| tm-phish-2027-new-york-g5diz_kv3dvxt | phish | verify (applied) | 18659384 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-02-7-30-pm/concert/18659384 | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | backstreet-boys | verify (applied) | 18470180 | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-02-8-pm/concert/18470180 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-yacht-rock-revue-2027-englewood-k7vgf_k9ovli- | yacht-rock-revue | verify (applied) | 18612862 | https://seatgeek.com/yacht-rock-revue-tickets/englewood-new-jersey-bergen-performing-arts-center-2027-01-07-8-pm/concert/18612862 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | lionel-richie | verify (applied) | 18405682 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-08-8-pm/concert/18405682 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | eagles | verify (applied) | 18701672 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-08-7-pm/concert/18701672 | - |
| tm-stella-lefty-2027-detroit-vv1afzkfkgkesu99t | stella-lefty | verify (applied) | 18527905 | https://seatgeek.com/stella-lefty-tickets/detroit-michigan-the-fillmore-detroit-2027-01-09-8-pm/concert/18527905 | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | lionel-richie | verify (applied) | 18405681 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-01-09-8-pm/concert/18405681 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | eagles | verify (applied) | 18701674 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-09-8-30-pm/concert/18701674 | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | stella-lefty | verify (applied) | 18527909 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-12-7-pm/concert/18527909 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | olivia-rodrigo | verify (applied) | 18211724 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-12-7-pm/concert/18211724 | - |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | stella-lefty | verify (applied) | 18539735 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-13-7-pm/concert/18539735 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | olivia-rodrigo | verify (applied) | 18211726 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-13-7-pm/concert/18211726 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-atmosphere-2027-madison-vv1a6zkfygkes1aem | atmosphere | verify (applied) | 18609073 | https://seatgeek.com/atmosphere-tickets/madison-wisconsin-the-sylvee-2027-01-15-6-45-pm/concert/18609073 | - |
| tm-stella-lefty-2027-montreal-1kg8vp7yga51kww | stella-lefty | verify (applied) | 18527910 | https://seatgeek.com/stella-lefty-tickets/montreal-canada-mtelus-2027-01-15-8-pm/concert/18527910 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | eagles | verify (applied) | 18421044 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | olivia-rodrigo | verify (applied) | 18214730 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-16-7-pm/concert/18214730 | - |
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
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | olivia-rodrigo | verify (applied) | 18230501 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-29-7-pm/concert/18230501 | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | atmosphere | verify (applied) | 18609092 | https://seatgeek.com/atmosphere-tickets/reno-nevada-grand-sierra-resort-2027-01-29-7-pm/concert/18609092 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
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
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
