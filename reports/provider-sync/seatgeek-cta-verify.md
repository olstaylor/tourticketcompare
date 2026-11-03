# SeatGeek CTA verification log

Generated: 2026-11-03T01:20:56.096Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 2391 (needs_recheck: 940, provenance backfill: 18, stale re-check: 1982)
- Events skipped before API checks: 523
- API calls made: 800
- Verified provenance written: 342
- URLs added: 23
- URLs corrected: 0
- URLs cleared: 8
- Provenance un-verified: 18
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 381
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | verify (applied) | 18671901 | https://seatgeek.com/omer-adam-tickets/brooklyn-new-york-barclays-center-2026-11-03-9-pm/concert/18671901 | - |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | verify (applied) | 18127549 | https://seatgeek.com/rawayana-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-04-8-pm/concert/18127549 | - |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | add (applied) | 18243411 | https://seatgeek.com/mercyme-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-05-7-pm/concert/18243411 | - |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | verify (applied) | 18392100 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-06-8-pm/concert/18392100 | - |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | add (applied) | 18243415 | https://seatgeek.com/mercyme-tickets/springfield-missouri-great-southern-bank-arena-2026-11-07-7-pm/concert/18243415 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | verify (applied) | 18126546 | https://seatgeek.com/rawayana-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-07-8-pm/concert/18126546 | - |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | verify (applied) | 18392092 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-07-8-pm/concert/18392092 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-cleveland-z7r9jz1aaed_7 | jodeci | add (applied) | 18407250 | https://seatgeek.com/jodeci-tickets/cleveland-ohio-keybank-state-theatre-at-playhouse-square-2026-11-14-8-pm/concert/18407250 | - |
| tm-mercyme-2026-kansas-city-z7r9jz1a70nek | mercyme | add (applied) | 18243423 | https://seatgeek.com/mercyme-tickets/kansas-city-missouri-t-mobile-center-2026-11-14-7-pm/concert/18243423 | - |
| tm-mercyme-2026-minneapolis-z7r9jz1a70nz6 | mercyme | add (applied) | 18243425 | https://seatgeek.com/mercyme-tickets/minneapolis-minnesota-target-center-2026-11-15-7-pm/concert/18243425 | - |
| tm-rawayana-2026-inglewood-vv170z_kgkuw4lc4 | rawayana | verify (applied) | 18126384 | https://seatgeek.com/rawayana-tickets/inglewood-california-kia-forum-2026-11-15-8-pm/concert/18126384 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-houston-g5diz_kwowtst | rawayana | verify (applied) | 18127552 | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-18-8-pm/concert/18127552 | - |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-motionless-in-white-2026-newark-vvg1fz_5s7fn3l | motionless-in-white | verify (applied) | 18281913 | https://seatgeek.com/motionless-in-white-tickets/newark-new-jersey-prudential-center-2026-11-19-6-30-pm/concert/18281913 | - |
| tm-jodeci-2026-bensalem-z7r9jz1aaz98b | jodeci | add (applied) | 18407255 | https://seatgeek.com/jodeci-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-11-19-8-pm/concert/18407255 | - |
| tm-rawayana-2026-houston-g5diz_ad2y7sg | rawayana | verify (applied) | 18223585 | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-19-8-pm/concert/18223585 | - |
| tm-motionless-in-white-2026-pittsburgh-17aov0g65mh-tzb | motionless-in-white | verify (applied) | 18281916 | https://seatgeek.com/motionless-in-white-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-20-6-30-pm/concert/18281916 | - |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-three-days-grace-2026-san-diego-vvg1izbuciwp5c | three-days-grace | verify (applied) | 17895176 | https://seatgeek.com/three-days-grace-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-20-7-pm/concert/17895176 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-irving-vvg1yz_kyui28o | rawayana | verify (applied) | 18127554 | https://seatgeek.com/rawayana-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-21-8-pm/concert/18127554 | - |
| tm-dom-dolla-2026-las-vegas-z7r9jz1a7p3c3 | dom-dolla | verify (applied) | 18598936 | https://seatgeek.com/dom-dolla-tickets/las-vegas-nevada-liv-nightclub-las-vegas-2026-11-21-10-30-pm/concert/18598936 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-thackerville-z7r9jz1aaz3ae | jodeci | add (applied) | 18395809 | https://seatgeek.com/jodeci-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-11-27-8-pm/concert/18395809 | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-norman-z7r9jz1aaed_m | jodeci | add (applied) | 18350138 | https://seatgeek.com/jodeci-tickets/norman-oklahoma-riverwind-casino-2026-11-28-8-pm/concert/18350138 | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-new-orleans-z7r9jz1aazk_o | jodeci | add (applied) | 18406111 | https://seatgeek.com/jodeci-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2026-12-02-7-30-pm/concert/18406111 | - |
| tm-rawayana-2026-orlando-1aefz_kgkuqmj8a | rawayana | verify (applied) | 18126388 | https://seatgeek.com/rawayana-tickets/orlando-florida-kia-center-2026-12-03-8-pm/concert/18126388 | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-miami-vvg1vz_fh4bcfd | rawayana | verify (applied) | 18659426 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-04-8-pm/concert/18659426 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | imagine-dragons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-miami-vvg1vz_kwnj_rj | rawayana | verify (applied) | 18126459 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-05-8-pm/concert/18126459 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rawayana-2026-miami-vvg1vz_6kilnkl | rawayana | verify (applied) | 18132184 | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-06-8-pm/concert/18132184 | - |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Marian Anderson Hall - Kimmel Center' vs 'Kimmel Center - Miller Theater'; no qualifying replacement found |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | jodeci | add (applied) | 18407288 | https://seatgeek.com/jodeci-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-12-15-8-pm/concert/18407288 | - |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yg-2026-oakland-g5vyz_u2lcdvy | yg | verify (applied) | 18327961 | https://seatgeek.com/yg-tickets/oakland-california-oakland-arena-2026-12-19-8-pm/concert/18327961 | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-jodeci-2027-san-francisco-g5vyz_2qprnjg | jodeci | verify (applied) | 18407226 | https://seatgeek.com/jodeci-tickets/san-francisco-california-the-masonic-san-francisco-2027-01-08-8-pm/concert/18407226 | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-jodeci-2027-inglewood-vvg1iz_2l8dh94 | jodeci | verify (applied) | 18407227 | https://seatgeek.com/jodeci-tickets/inglewood-california-youtube-theater-2027-01-09-8-pm/concert/18407227 | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-jodeci-2027-el-cajon-vvg1iz_2r2vxq6 | jodeci | verify (applied) | 18407231 | https://seatgeek.com/jodeci-tickets/el-cajon-california-the-magnolia-1-2027-01-10-7-pm/concert/18407231 | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2027-phoenix-17k8v0g62lhiblw | jodeci | verify (applied) | 18407229 | https://seatgeek.com/jodeci-tickets/phoenix-arizona-arizona-financial-theatre-2027-01-15-8-pm/concert/18407229 | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2027-ontario-vvg10z_2n6tniq | jodeci | verify (applied) | 18407228 | https://seatgeek.com/jodeci-tickets/ontario-california-toyota-arena-ontario-2027-01-16-8-pm/concert/18407228 | - |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -15.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
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
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-amsterdam-z698xzbpz16vffqn4a | theory-of-a-deadman | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | greta-van-fleet | add (applied) | 18641961 | https://seatgeek.com/greta-van-fleet-tickets/green-bay-wisconsin-resch-center-2027-02-17-7-pm/concert/18641961 | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | greta-van-fleet | add (applied) | 18611175 | https://seatgeek.com/greta-van-fleet-tickets/cleveland-ohio-rocket-arena-2027-03-03-7-pm/concert/18611175 | - |
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
| tm-greta-van-fleet-2027-salt-lake-city-z7r9jz1aae44z | greta-van-fleet | add (applied) | 18582229 | https://seatgeek.com/greta-van-fleet-tickets/salt-lake-city-utah-delta-center-1-2027-03-29-7-pm/concert/18582229 | - |
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
| tm-mercyme-2027-grand-prairie-z7r9jz1aa74jn | mercyme | add (applied) | 18692264 | https://seatgeek.com/mercyme-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-04-15-7-pm/concert/18692264 | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jake-bugg-2027-amsterdam-z698xzbpz1k7936fe | jake-bugg | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-mercyme-2027-canton-vv17fz_fgkw2un6n | mercyme | verify (applied) | 18692284 | https://seatgeek.com/mercyme-tickets/canton-ohio-canton-civic-center-canton-oh-2027-05-01-7-pm/concert/18692284 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-evansville-vv17fz_fgkwdo5qw | mercyme | verify (applied) | 18692285 | https://seatgeek.com/mercyme-tickets/evansville-indiana-ford-center-in-2027-05-02-7-pm/concert/18692285 | - |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-oakland-g5vyz_4k7itnp | queens-of-the-stone-age | verify (applied) | 18709212 | https://seatgeek.com/queens-of-the-stone-age-tickets/oakland-california-oakland-arena-2027-05-04-6-30-pm/concert/18709212 | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-sacramento-g5vyz_4paibie | queens-of-the-stone-age | verify (applied) | 18709213 | https://seatgeek.com/queens-of-the-stone-age-tickets/sacramento-california-golden-1-center-2027-05-05-6-30-pm/concert/18709213 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | two-door-cinema-club | add (applied) | 18711333 | https://seatgeek.com/two-door-cinema-club-tickets/chicago-illinois-riviera-theatre-chicago-2027-05-06-7-30-pm/concert/18711333 | - |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-seattle-vvg1hz_43n59ay | queens-of-the-stone-age | verify (applied) | 18709214 | https://seatgeek.com/queens-of-the-stone-age-tickets/seattle-washington-climate-pledge-arena-2027-05-07-6-30-pm/concert/18709214 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-portland-vvg1hz_42zzik2 | queens-of-the-stone-age | verify (applied) | 18709215 | https://seatgeek.com/queens-of-the-stone-age-tickets/portland-oregon-moda-center-2027-05-09-6-30-pm/concert/18709215 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | remi-wolf | add (applied) | 18664784 | https://seatgeek.com/remi-wolf-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-10-8-pm/concert/18664784 | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | queens-of-the-stone-age | verify (applied) | 18475187 | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | remi-wolf | verify (applied) | 18664787 | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | two-door-cinema-club | add (applied) | 18711220 | https://seatgeek.com/two-door-cinema-club-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-11-7-30-pm/concert/18711220 | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | queens-of-the-stone-age | add (applied) | 18709238 | https://seatgeek.com/queens-of-the-stone-age-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-12-6-30-pm/concert/18709238 | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | remi-wolf | verify (applied) | 18664791 | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 | - |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | queens-of-the-stone-age | add (applied) | 18701766 | https://seatgeek.com/queens-of-the-stone-age-tickets/saint-paul-minnesota-grand-casino-arena-2027-05-14-6-30-pm/concert/18701766 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-milwaukee-vv1a6zk4kgkdc_par | queens-of-the-stone-age | verify (applied) | 18709222 | https://seatgeek.com/queens-of-the-stone-age-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-05-15-6-30-pm/concert/18709222 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | remi-wolf | verify (applied) | 18664789 | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 | - |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | clear (applied) | - | - | stored URL failed: venue mismatch: 'Thelma Gaylord Performing Arts Theatre' vs 'Thelma Gaylord PAT At Civic Center Music Hall'; no qualifying replacement found |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-bonner-g5vzz_flaijvz | remi-wolf | verify (applied) | 18664792 | https://seatgeek.com/remi-wolf-tickets/bonner-montana-kettlehouse-amphitheater-2027-05-19-8-pm/concert/18664792 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-jon-pardi-2027-west-valley-city-g5vzz_2evjpcf | jon-pardi | verify (applied) | 18390278 | https://seatgeek.com/jon-pardi-tickets/west-valley-city-utah-maverik-center-2027-05-20-7-pm/concert/18390278 | - |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | remi-wolf | verify (applied) | 18664793 | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-remi-wolf-2027-seattle-vvg1hz_fqhwypl | remi-wolf | verify (applied) | 18664798 | https://seatgeek.com/remi-wolf-tickets/seattle-washington-wamu-theater-2027-05-22-8-pm/concert/18664798 | - |
| tm-air-supply-2027-saint-louis-vv1akzkftgkdvwrkv | air-supply | verify (applied) | 18653998 | https://seatgeek.com/air-supply-tickets/saint-louis-missouri-river-city-casino-2027-05-23-7-pm/concert/18653998 | - |
| tm-thirty-seconds-to-mars-2027-helsinki-z698xz8kz16v7so3fa | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-praha-9-z698xzu0z1k3k74-f | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | two-door-cinema-club | add (applied) | 18711344 | https://seatgeek.com/two-door-cinema-club-tickets/austin-texas-united-heritage-hall-2027-05-27-8-pm/concert/18711344 | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | weezer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | two-door-cinema-club | add (applied) | 18711349 | https://seatgeek.com/two-door-cinema-club-tickets/dallas-texas-the-bomb-factory-dallas-2027-05-29-8-pm/concert/18711349 | - |
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
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | death-cab-for-cutie | add (applied) | 18715561 | https://seatgeek.com/death-cab-for-cutie-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-08-7-pm/concert/18715561 | - |
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
| tm-sienna-spiro-2027-nashville-z7r9jz1aa7bjy | sienna-spiro | add (applied) | 18702009 | https://seatgeek.com/sienna-spiro-tickets/nashville-tennessee-grand-ole-opry-house-2027-08-08-7-pm/concert/18702009 | - |
| tm-bryan-adams-2027-baunatal-z698xzc2z1kxv_kf3 | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-erfurt-z698xzc2z1kczab8v | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-magdeburg-z698xzc2z16vb8r7pg | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-lincoln-g5vyz_4ho4bgw | rod-stewart | verify (applied) | 18726699 | https://seatgeek.com/rod-stewart-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2027-08-14-8-pm/concert/18726699 | - |
| tm-bryan-adams-2027-deggendorf-z698xzc2z1kaap_ay | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvcqcl | the-red-clay-strays | verify (applied) | 18723980 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-20-6-30-pm/concert/18723980 | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2gaje | oasis | verify (applied) | 18589078 | https://seatgeek.com/oasis-tickets/las-vegas-nevada-allegiant-stadium-2027-08-21-7-pm/concert/18589078 | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2u_jk | oasis | verify (applied) | 18589081 | https://seatgeek.com/oasis-tickets/las-vegas-nevada-allegiant-stadium-2027-08-24-7-pm/concert/18589081 | - |
| tm-kenny-chesney-2027-foxborough-vv177z_3gkt1lkmv | kenny-chesney | verify (applied) | 18608957 | https://seatgeek.com/kenny-chesney-tickets/foxborough-massachusetts-gillette-stadium-2027-08-27-4-30-pm/concert/18608957 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ng- | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_a | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aa7svn | the-red-clay-strays | verify (applied) | 18727012 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-12-7-pm/concert/18727012 | - |
| tm-carin-leon-2027-las-vegas-1avjzbwgkrtxpef | carin-leon | verify (applied) | 17838557 | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-15-8-pm/concert/17838557 | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdqtn6j | carin-leon | verify (applied) | 18583758 | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-16-8-pm/concert/18583758 | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrskjz | carin-leon | verify (applied) | 18583757 | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-17-8-pm/concert/18583757 | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrgsj0 | carin-leon | verify (applied) | 18583756 | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-18-8-pm/concert/18583756 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmctlgh | marc-anthony | verify (applied) | 18608830 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-09-18-9-pm/concert/18608830 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmmv2gl | marc-anthony | verify (applied) | 18608836 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-09-19-9-pm/concert/18608836 | - |
| tm-leon-bridges-2027-austin-g5diz_flks0j9 | leon-bridges | verify (applied) | 18662740 | https://seatgeek.com/leon-bridges-tickets/austin-texas-moody-center-atx-2027-09-24-7-30-pm/concert/18662740 | - |
| tm-leon-bridges-2027-houston-g5diz_kb01hxf | leon-bridges | verify (applied) | 18662745 | https://seatgeek.com/leon-bridges-tickets/houston-texas-713-music-hall-2027-09-25-7-30-pm/concert/18662745 | - |
| tm-eros-ramazzotti-2027-laval-1aszk16gkexqstp | eros-ramazzotti | verify (applied) | 17482113 | https://seatgeek.com/eros-ramazzotti-tickets/laval-canada-place-bell-2027-09-26-8-pm/concert/17482113 | - |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | jonas-brothers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18503891 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | rod-wave | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18414825 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | mana | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17416937 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | unverify (applied) | - | - | stored URL failed: event instants differ by 288.0h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18253662 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | missio | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18492941 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18592658 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-smashing-pumpkins-2026-portland-vvg1hz_1meesxh | the-smashing-pumpkins | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18250164 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr5fkv | bryan-adams | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18424326 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-chicks-2026-hollywood-vvg10z_5ljdml9 | the-chicks | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18268872 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-tommy-emmanuel-2026-dublin-1kkzv0qagauuqvy | tommy-emmanuel | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18147020 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | verify (applied) | 18223885 | https://seatgeek.com/amble-tickets/toronto-canada-history-2026-11-02-7-pm/concert/18223885 | - |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | verify (applied) | 18251753 | https://seatgeek.com/mico-tickets/boston-massachusetts-paradise-rock-club-2026-11-02-7-pm/concert/18251753 | - |
| tm-journey-2026-detroit-vvg1oz_13slngw | journey | verify (applied) | 18237116 | https://seatgeek.com/journey-tickets/detroit-michigan-little-caesars-arena-2026-11-02-7-30-pm/concert/18237116 | - |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | verify (applied) | 18492128 | https://seatgeek.com/jonas-brothers-tickets/saint-paul-minnesota-grand-casino-arena-2026-11-02-7-30-pm/concert/18492128 | - |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | knocked-loose | verify (applied) | 18270644 | https://seatgeek.com/knocked-loose-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-02-6-30-pm/concert/18270644 | - |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | steve-lacy | verify (applied) | 18485939 | https://seatgeek.com/steve-lacy-tickets/nashville-tennessee-nashville-municipal-auditorium-2026-11-02-8-pm/concert/18485939 | - |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | verify (applied) | 18470201 | https://seatgeek.com/fuerza-regida-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-02-8-30-pm/concert/18470201 | - |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | verify (applied) | 18319855 | https://seatgeek.com/brand-new-tickets/denver-colorado-mission-ballroom-2026-11-02-8-pm/concert/18319855 | - |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | verify (applied) | 18291327 | https://seatgeek.com/stella-lefty-tickets/los-angeles-california-the-fonda-theatre-2026-11-02-8-pm/concert/18291327 | - |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | verify (applied) | 18297301 | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-the-showbox-2026-11-02-8-pm/concert/18297301 | - |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | verify (applied) | 18592656 | https://seatgeek.com/the-psychedelic-furs-tickets/menlo-park-california-the-guild-theatre-menlo-park-2026-11-02-8-pm/concert/18592656 | - |
| tm-the-chicks-2026-hollywood-vvg10z_5ra8fba | the-chicks | verify (applied) | 18268878 | https://seatgeek.com/the-chicks-tickets/hollywood-california-dolby-theatre-2026-11-02-8-30-pm/concert/18268878 | - |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | sleeping-with-sirens | verify (applied) | 18311622 | https://seatgeek.com/sleeping-with-sirens-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-03-7-pm/concert/18311622 | - |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | verify (applied) | 18222746 | https://seatgeek.com/amble-tickets/ottawa-canada-bronson-centre-2026-11-03-7-pm/concert/18222746 | - |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | knocked-loose | verify (applied) | 18270647 | https://seatgeek.com/knocked-loose-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-03-5-30-pm/concert/18270647 | - |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | verify (applied) | 18175592 | https://seatgeek.com/sombr-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-03-7-pm/concert/18175592 | - |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | verify (applied) | 18140945 | https://seatgeek.com/blue-october-tickets/portland-maine-state-theatre-portland-me-2026-11-03-8-pm/concert/18140945 | - |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | verify (applied) | 18345103 | https://seatgeek.com/mico-tickets/providence-rhode-island-fete-music-hall-2026-11-03-8-pm/concert/18345103 | - |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | verify (applied) | 18320066 | https://seatgeek.com/rod-wave-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-03-8-30-pm/concert/18320066 | - |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | verify (applied) | 18503893 | https://seatgeek.com/jonas-brothers-tickets/kansas-city-missouri-t-mobile-center-2026-11-03-7-30-pm/concert/18503893 | - |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | verify (applied) | 18143695 | https://seatgeek.com/teddy-swims-tickets/salt-lake-city-utah-delta-center-1-2026-11-03-7-pm/concert/18143695 | - |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | verify (applied) | 18316801 | https://seatgeek.com/daughtry-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-03-8-pm/concert/18316801 | - |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | verify (applied) | 18250182 | https://seatgeek.com/the-smashing-pumpkins-tickets/calgary-canada-scotiabank-saddledome-2026-11-03-8-pm/concert/18250182 | - |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | verify (applied) | 18253664 | https://seatgeek.com/stella-lefty-tickets/phoenix-arizona-crescent-ballroom-2026-11-03-8-pm/concert/18253664 | - |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | verify (applied) | 18498567 | https://seatgeek.com/fuerza-regida-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-03-8-30-pm/concert/18498567 | - |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | verify (applied) | 18492778 | https://seatgeek.com/missio-tickets/san-francisco-california-brick-and-mortar-music-hall-2026-11-03-8-30-pm/concert/18492778 | - |
| tm-the-chicks-2026-hollywood-vvg10z_5rao7bc | the-chicks | verify (applied) | 18469965 | https://seatgeek.com/the-chicks-tickets/hollywood-california-dolby-theatre-2026-11-03-8-30-pm/concert/18469965 | - |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | verify (applied) | 18327314 | https://seatgeek.com/sleeping-with-sirens-tickets/sayreville-new-jersey-starland-ballroom-2026-11-04-7-pm/concert/18327314 | - |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | verify (applied) | 18237143 | https://seatgeek.com/journey-tickets/toronto-canada-scotiabank-arena-2026-11-04-7-30-pm/concert/18237143 | - |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | verify (applied) | 18373497 | https://seatgeek.com/michelle-branch-tickets/boston-massachusetts-roadrunner-boston-2026-11-04-8-pm/concert/18373497 | - |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | dinosaur-jr | verify (applied) | 18345766 | https://seatgeek.com/dinosaur-jr-tickets/houston-texas-house-of-blues-houston-2026-11-04-7-pm/concert/18345766 | - |
| tm-young-miko-2026-philadelphia-1ayzk3egkdcdzmm | young-miko | verify (applied) | 18163848 | https://seatgeek.com/young-miko-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-04-8-pm/concert/18163848 | - |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | verify (applied) | 18579808 | https://seatgeek.com/victoria-monet-tickets/atlanta-georgia-fox-theatre-atlanta-2026-11-04-8-pm/concert/18579808 | - |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | verify (applied) | 18474907 | https://seatgeek.com/dave-matthews-band-tickets/madison-wisconsin-kohl-center-2026-11-04-7-30-pm/concert/18474907 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | verify (applied) | 18297302 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-04-8-pm/concert/18297302 | - |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | verify (applied) | 18298234 | https://seatgeek.com/the-psychedelic-furs-tickets/fresno-california-warnors-theatre-2026-11-04-8-pm/concert/18298234 | - |
| tm-zac-brown-band-2026-buffalo-k7vgf_dh65dyo | zac-brown-band | verify (applied) | 18032029 | https://seatgeek.com/zac-brown-band-tickets/buffalo-new-york-keybank-center-2026-11-05-7-pm/concert/18032029 | - |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | verify (applied) | 18200018 | https://seatgeek.com/the-red-clay-strays-tickets/baton-rouge-louisiana-raising-cane-s-river-center-2026-11-05-6-30-pm/concert/18200018 | - |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | verify (applied) | 18257241 | https://seatgeek.com/john-summit-tickets/houston-texas-toyota-center-2026-11-05-7-pm/concert/18257241 | - |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | verify (applied) | 18238532 | https://seatgeek.com/tobymac-tickets/columbia-missouri-mizzou-arena-2026-11-05-7-pm/concert/18238532 | - |
| tm-mico-2026-montreal-16szkfk00zagk68g | mico | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18472169 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | knocked-loose | verify (applied) | 18270649 | https://seatgeek.com/knocked-loose-tickets/austin-texas-moody-amphitheater-2026-11-05-7-pm/concert/18270649 | - |
| tm-young-miko-2026-brooklyn-16dzz_f13g7dsys | young-miko | verify (applied) | 18163830 | https://seatgeek.com/young-miko-tickets/brooklyn-new-york-barclays-center-2026-11-05-8-pm/concert/18163830 | - |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | verify (applied) | 18390309 | https://seatgeek.com/jon-pardi-tickets/laredo-texas-sames-auto-arena-2026-11-05-7-pm/concert/18390309 | - |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | verify (applied) | 18503892 | https://seatgeek.com/jonas-brothers-tickets/nashville-tennessee-bridgestone-arena-2026-11-05-7-30-pm/concert/18503892 | - |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | steve-lacy | verify (applied) | 18485937 | https://seatgeek.com/steve-lacy-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-05-8-pm/concert/18485937 | - |
| tm-arcangel-2026-houston-g5diz_53je_pf | arcangel | verify (applied) | 18266325 | https://seatgeek.com/arcangel-tickets/houston-texas-713-music-hall-2026-11-05-8-pm/concert/18266325 | - |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | dan-shay | verify (applied) | 18250836 | https://seatgeek.com/dan-shay-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2026-11-05-7-pm/concert/18250836 | - |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | verify (applied) | 18427192 | https://seatgeek.com/pentatonix-tickets/tacoma-washington-tacoma-dome-2026-11-05-7-pm/concert/18427192 | - |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | verify (applied) | 18250183 | https://seatgeek.com/the-smashing-pumpkins-tickets/vancouver-canada-rogers-arena-2026-11-05-8-pm/concert/18250183 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | verify (applied) | 17637144 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-05-7-pm/concert/17637144 | - |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | don-omar | verify (applied) | 18250872 | https://seatgeek.com/don-omar-tickets/san-jose-california-sap-center-at-san-jose-2026-11-05-8-pm/concert/18250872 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | verify (applied) | 18297303 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-05-8-pm/concert/18297303 | - |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | verify (applied) | 18626682 | https://seatgeek.com/brandi-carlile-tickets/portland-oregon-revolution-hall-portland-2026-11-05-8-pm/concert/18626682 | - |
| tm-metallica-2026-las-vegas-1fayv048rez72a62 | metallica | verify (applied) | 18103476 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2026-11-05-8-30-pm/concert/18103476 | - |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | verify (applied) | 18391931 | https://seatgeek.com/trivium-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-06-6-30-pm/concert/18391931 | - |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | verify (applied) | 18175596 | https://seatgeek.com/sombr-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-11-06-7-pm/concert/18175596 | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | verify (applied) | 18373504 | https://seatgeek.com/michelle-branch-tickets/asbury-park-new-jersey-the-stone-pony-2-2026-11-06-7-pm/concert/18373504 | - |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | verify (applied) | 18222463 | https://seatgeek.com/amble-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-06-7-pm/concert/18222463 | - |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | verify (applied) | 18252202 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-06-7-pm/concert/18252202 | - |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | zac-brown-band | verify (applied) | 18032030 | https://seatgeek.com/zac-brown-band-tickets/detroit-michigan-little-caesars-arena-2026-11-06-7-pm/concert/18032030 | - |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | sleeping-with-sirens | verify (applied) | 18312116 | https://seatgeek.com/sleeping-with-sirens-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2026-11-06-7-pm/concert/18312116 | - |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | verify (applied) | 18200019 | https://seatgeek.com/the-red-clay-strays-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-11-06-6-30-pm/concert/18200019 | - |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | verify (applied) | 18237194 | https://seatgeek.com/journey-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-06-7-30-pm/concert/18237194 | - |
| tm-little-big-town-2026-durham-g5evz_gplfpyl | little-big-town | verify (applied) | 18292628 | https://seatgeek.com/little-big-town-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2026-11-06-7-30-pm/concert/18292628 | - |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | verify (applied) | 18147866 | https://seatgeek.com/blue-october-tickets/albany-new-york-hart-theatre-at-the-egg-2026-11-06-7-pm/concert/18147866 | - |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | verify (applied) | 18252621 | https://seatgeek.com/stella-lefty-tickets/dallas-texas-cambridge-room-at-house-of-blues-dallas-1-2026-11-06-7-pm/concert/18252621 | - |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | verify (applied) | 18239020 | https://seatgeek.com/tobymac-tickets/evansville-indiana-ford-center-in-2026-11-06-7-pm/concert/18239020 | - |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | verify (applied) | 18529124 | https://seatgeek.com/dylan-scott-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2026-11-06-8-pm/concert/18529124 | - |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | verify (applied) | 17732671 | https://seatgeek.com/sabaton-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-06-7-pm/concert/17732671 | - |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | verify (applied) | 18320065 | https://seatgeek.com/rod-wave-tickets/columbia-south-carolina-colonial-life-arena-2026-11-06-8-30-pm/concert/18320065 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | verify (applied) | 18637279 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-06-8-pm/concert/18637279 | - |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | anuel-aa | verify (applied) | 18579489 | https://seatgeek.com/anuel-aa-tickets/elmont-new-york-ubs-arena-2026-11-06-8-pm/concert/18579489 | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | verify (applied) | 18390332 | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 | - |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | jonas-brothers | verify (applied) | 18503986 | https://seatgeek.com/jonas-brothers-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-11-06-7-30-pm/concert/18503986 | - |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | dave-matthews-band | verify (applied) | 18474895 | https://seatgeek.com/dave-matthews-band-tickets/nashville-tennessee-bridgestone-arena-2026-11-06-7-30-pm/concert/18474895 | - |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | verify (applied) | 18345772 | https://seatgeek.com/dinosaur-jr-tickets/san-antonio-texas-paper-tiger-san-antonio-2026-11-06-8-pm/concert/18345772 | - |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | verify (applied) | 17938858 | https://seatgeek.com/mana-tickets/houston-texas-toyota-center-2026-11-06-8-30-pm/concert/17938858 | - |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | arcangel | verify (applied) | 18266326 | https://seatgeek.com/arcangel-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-06-8-pm/concert/18266326 | - |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | dan-shay | verify (applied) | 18250837 | https://seatgeek.com/dan-shay-tickets/anaheim-california-honda-center-2026-11-06-7-pm/concert/18250837 | - |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | cristian-castro | verify (applied) | 18078145 | https://seatgeek.com/cristian-castro-tickets/glendale-arizona-desert-diamond-arena-2026-11-06-8-pm/concert/18078145 | - |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | verify (applied) | 18629796 | https://seatgeek.com/beck-tickets/spokane-washington-first-interstate-center-for-the-arts-2026-11-06-7-30-pm/concert/18629796 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | verify (applied) | 18085658 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-06-8-pm/concert/18085658 | - |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | verify (applied) | 18250170 | https://seatgeek.com/the-smashing-pumpkins-tickets/seattle-washington-climate-pledge-arena-2026-11-06-8-pm/concert/18250170 | - |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | verify (applied) | 18319859 | https://seatgeek.com/brand-new-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-11-06-8-pm/concert/18319859 | - |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | ricky-martin | verify (applied) | 18318163 | https://seatgeek.com/ricky-martin-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2026-11-06-8-pm/concert/18318163 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | barry-manilow | verify (applied) | 17637145 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-06-8-pm/concert/17637145 | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | verify (applied) | 18391256 | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | verify (applied) | 18391935 | https://seatgeek.com/trivium-tickets/louisville-kentucky-old-forester-s-paristown-hall-2026-11-07-6-35-pm/concert/18391935 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | verify (applied) | 18223366 | https://seatgeek.com/amble-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-07-7-pm/concert/18223366 | - |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | verify (applied) | 18260543 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-07-7-pm/concert/18260543 | - |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | sleeping-with-sirens | verify (applied) | 18311638 | https://seatgeek.com/sleeping-with-sirens-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-07-7-pm/concert/18311638 | - |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | gavin-adcock | verify (applied) | 18126468 | https://seatgeek.com/gavin-adcock-tickets/reading-pennsylvania-santander-arena-2026-11-07-7-pm/concert/18126468 | - |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | journey | verify (applied) | 18237083 | https://seatgeek.com/journey-tickets/uniondale-new-york-nassau-coliseum-2026-11-07-7-30-pm/concert/18237083 | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | verify (applied) | 18147873 | https://seatgeek.com/blue-october-tickets/cleveland-ohio-agora-theatre-2026-11-07-7-pm/concert/18147873 | - |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | verify (applied) | 18252613 | https://seatgeek.com/stella-lefty-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2026-11-07-7-pm/concert/18252613 | - |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | verify (applied) | 17732669 | https://seatgeek.com/sabaton-tickets/houston-texas-713-music-hall-2026-11-07-7-pm/concert/17732669 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | verify (applied) | 18629299 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 | - |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | verify (applied) | 18556120 | https://seatgeek.com/victoria-monet-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-07-8-pm/concert/18556120 | - |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | verify (applied) | 18474896 | https://seatgeek.com/dave-matthews-band-tickets/chicago-illinois-united-center-2026-11-07-7-30-pm/concert/18474896 | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | verify (applied) | 17769336 | https://seatgeek.com/doja-cat-tickets/houston-texas-toyota-center-2026-11-07-7-30-pm/concert/17769336 | - |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | verify (applied) | 18485938 | https://seatgeek.com/steve-lacy-tickets/austin-texas-moody-amphitheater-2026-11-07-8-pm/concert/18485938 | - |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | verify (applied) | 18531269 | https://seatgeek.com/ye-tickets/arlington-texas-at-t-stadium-2026-11-07-8-pm/concert/18531269 | - |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | dan-shay | verify (applied) | 18250838 | https://seatgeek.com/dan-shay-tickets/mountain-view-california-shoreline-amphitheatre-2026-11-07-7-pm/concert/18250838 | - |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | verify (applied) | 18078276 | https://seatgeek.com/cristian-castro-tickets/el-paso-texas-el-paso-county-coliseum-2026-11-07-8-pm/concert/18078276 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | verify (applied) | 17637146 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-07-7-pm/concert/17637146 | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | verify (applied) | 18318283 | https://seatgeek.com/sienna-spiro-tickets/portland-oregon-mcmenamins-crystal-ballroom-2026-11-07-8-pm/concert/18318283 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | verify (applied) | 18085660 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-07-8-pm/concert/18085660 | - |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | verify (applied) | 18316805 | https://seatgeek.com/daughtry-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-07-7-pm/concert/18316805 | - |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | karan-aujla | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-metallica-2026-las-vegas-1fayv048rez72afa | metallica | verify (applied) | 18103477 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2026-11-07-8-30-pm/concert/18103477 | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | verify (applied) | 18391933 | https://seatgeek.com/trivium-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-11-08-5-30-pm/concert/18391933 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | verify (applied) | 18175600 | https://seatgeek.com/sombr-tickets/columbus-ohio-nationwide-arena-2026-11-08-7-pm/concert/18175600 | - |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | verify (applied) | 18238331 | https://seatgeek.com/tobymac-tickets/greensboro-north-carolina-first-horizon-coliseum-2026-11-08-7-pm/concert/18238331 | - |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | sleeping-with-sirens | verify (applied) | 18312278 | https://seatgeek.com/sleeping-with-sirens-tickets/baltimore-maryland-nevermore-hall-2026-11-08-7-pm/concert/18312278 | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | verify (applied) | 18141852 | https://seatgeek.com/blue-october-tickets/nashville-indiana-brown-county-music-center-2026-11-08-7-30-pm/concert/18141852 | - |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | verify (applied) | 18200020 | https://seatgeek.com/the-red-clay-strays-tickets/jonesboro-arkansas-first-national-bank-arena-2026-11-08-6-30-pm/concert/18200020 | - |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | verify (applied) | 17732672 | https://seatgeek.com/sabaton-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-08-7-pm/concert/17732672 | - |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | verify (applied) | 18571665 | https://seatgeek.com/jonas-brothers-tickets/houston-texas-toyota-center-2026-11-08-7-30-pm/concert/18571665 | - |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | verify (applied) | 18485941 | https://seatgeek.com/steve-lacy-tickets/sugar-land-texas-smart-financial-centre-2026-11-08-8-pm/concert/18485941 | - |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | verify (applied) | 17938859 | https://seatgeek.com/mana-tickets/austin-texas-moody-center-atx-2026-11-08-8-30-pm/concert/17938859 | - |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | verify (applied) | 18085646 | https://seatgeek.com/foy-vance-tickets/san-francisco-california-great-american-music-hall-2026-11-08-7-pm/concert/18085646 | - |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | verify (applied) | 18590355 | https://seatgeek.com/beck-tickets/seattle-washington-benaroya-hall-2026-11-08-7-pm/concert/18590355 | - |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | verify (applied) | 18325393 | https://seatgeek.com/ricky-martin-tickets/temecula-california-pechanga-resort-casino-2026-11-08-7-30-pm/concert/18325393 | - |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | verify (applied) | 18316806 | https://seatgeek.com/daughtry-tickets/napa-california-uptown-theatre-napa-2026-11-08-7-pm/concert/18316806 | - |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | verify (applied) | 18091775 | https://seatgeek.com/the-psychedelic-furs-tickets/del-mar-california-the-sound-del-mar-2026-11-08-8-pm/concert/18091775 | - |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | verify (applied) | 18250171 | https://seatgeek.com/the-smashing-pumpkins-tickets/san-jose-california-sap-center-at-san-jose-2026-11-08-8-pm/concert/18250171 | - |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | dave-matthews-band | verify (applied) | 18474897 | https://seatgeek.com/dave-matthews-band-tickets/providence-rhode-island-amica-mutual-pavilion-2026-11-09-7-30-pm/concert/18474897 | - |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | verify (applied) | 18320069 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-09-8-30-pm/concert/18320069 | - |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | verify (applied) | 18503896 | https://seatgeek.com/jonas-brothers-tickets/oklahoma-city-oklahoma-paycom-center-2026-11-09-7-30-pm/concert/18503896 | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | verify (applied) | 18506093 | https://seatgeek.com/pentatonix-tickets/bozeman-montana-brick-breeden-fieldhouse-2026-11-09-7-pm/concert/18506093 | - |
| tm-beck-2026-vancouver-1aozk3a0babze8k | beck | verify (applied) | 18194425 | https://seatgeek.com/beck-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2026-11-09-8-pm/concert/18194425 | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | verify (applied) | 18297308 | https://seatgeek.com/sienna-spiro-tickets/san-francisco-california-castro-theatre-2026-11-09-8-pm/concert/18297308 | - |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | karan-aujla | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | verify (applied) | 18391934 | https://seatgeek.com/trivium-tickets/silver-spring-maryland-the-fillmore-silver-spring-2026-11-10-6-35-pm/concert/18391934 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | verify (applied) | 18085136 | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 | - |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | verify (applied) | 18474899 | https://seatgeek.com/dave-matthews-band-tickets/baltimore-maryland-cfg-bank-arena-2026-11-10-7-30-pm/concert/18474899 | - |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | verify (applied) | 18373509 | https://seatgeek.com/michelle-branch-tickets/chicago-illinois-house-of-blues-chicago-2026-11-10-8-pm/concert/18373509 | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | verify (applied) | 18222479 | https://seatgeek.com/amble-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2026-11-10-8-pm/concert/18222479 | - |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | verify (applied) | 18414835 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-10-8-pm/concert/18414835 | - |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | verify (applied) | 18427194 | https://seatgeek.com/pentatonix-tickets/casper-wyoming-ford-wyoming-center-2026-11-10-7-pm/concert/18427194 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | verify (applied) | 18297309 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-the-wiltern-2026-11-10-8-pm/concert/18297309 | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | verify (applied) | 18085699 | https://seatgeek.com/foy-vance-tickets/portland-oregon-aladdin-theater-2026-11-10-7-pm/concert/18085699 | - |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | verify (applied) | 18316807 | https://seatgeek.com/daughtry-tickets/anaheim-california-city-national-grove-of-anaheim-2026-11-10-7-pm/concert/18316807 | - |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | verify (applied) | 18194387 | https://seatgeek.com/beck-tickets/portland-oregon-keller-auditorium-2026-11-10-8-pm/concert/18194387 | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | verify (applied) | 18391936 | https://seatgeek.com/trivium-tickets/new-haven-connecticut-college-street-music-hall-2026-11-11-6-35-pm/concert/18391936 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | verify (applied) | 18222468 | https://seatgeek.com/amble-tickets/washington-district-of-columbia-9-30-club-2026-11-11-7-pm/concert/18222468 | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | verify (applied) | 18085138 | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 | - |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | sleeping-with-sirens | verify (applied) | 18311702 | https://seatgeek.com/sleeping-with-sirens-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-11-11-7-pm/concert/18311702 | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | verify (applied) | 18147874 | https://seatgeek.com/blue-october-tickets/north-tonawanda-new-york-riviera-theatre-north-tonawanda-2026-11-11-7-pm/concert/18147874 | - |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | verify (applied) | 18316812 | https://seatgeek.com/daughtry-tickets/tucson-arizona-fox-tucson-theatre-2026-11-11-7-pm/concert/18316812 | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | verify (applied) | 18373510 | https://seatgeek.com/michelle-branch-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-11-11-7-30-pm/concert/18373510 | - |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | verify (applied) | 18492221 | https://seatgeek.com/missio-tickets/denver-colorado-marquis-theater-denver-2026-11-11-7-pm/concert/18492221 | - |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | verify (applied) | 17732667 | https://seatgeek.com/sabaton-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-11-7-pm/concert/17732667 | - |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | verify (applied) | 18240151 | https://seatgeek.com/katseye-tickets/dallas-texas-american-airlines-center-2026-11-11-8-pm/concert/18240151 | - |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | verify (applied) | 18394805 | https://seatgeek.com/the-psychedelic-furs-tickets/riverside-california-fox-performing-arts-center-2026-11-11-7-pm/concert/18394805 | - |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | verify (applied) | 18485943 | https://seatgeek.com/steve-lacy-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-11-8-pm/concert/18485943 | - |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | verify (applied) | 18250172 | https://seatgeek.com/the-smashing-pumpkins-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-11-8-pm/concert/18250172 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | verify (applied) | 18405684 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-11-8-pm/concert/18405684 | - |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | verify (applied) | 18319858 | https://seatgeek.com/brand-new-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-11-8-pm/concert/18319858 | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | verify (applied) | 18391943 | https://seatgeek.com/trivium-tickets/new-york-new-york-terminal-5-2026-11-12-6-35-pm/concert/18391943 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | verify (applied) | 18175603 | https://seatgeek.com/sombr-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-12-7-pm/concert/18175603 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | verify (applied) | 18085137 | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 | - |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | verify (applied) | 18219942 | https://seatgeek.com/journey-tickets/cleveland-ohio-rocket-arena-2026-11-12-7-30-pm/concert/18219942 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | verify (applied) | 18474900 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-12-7-30-pm/concert/18474900 | - |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | sleeping-with-sirens | verify (applied) | 18327312 | https://seatgeek.com/sleeping-with-sirens-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-12-7-30-pm/concert/18327312 | - |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | verify (applied) | 18141374 | https://seatgeek.com/blue-october-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-11-12-8-pm/concert/18141374 | - |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | verify (applied) | 18427193 | https://seatgeek.com/pentatonix-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-12-7-pm/concert/18427193 | - |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | verify (applied) | 18229329 | https://seatgeek.com/treaty-oak-revival-tickets/austin-texas-moody-center-atx-2026-11-12-7-pm/concert/18229329 | - |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | verify (applied) | 18390356 | https://seatgeek.com/jon-pardi-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2026-11-12-7-pm/concert/18390356 | - |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | verify (applied) | 18387640 | https://seatgeek.com/foy-vance-tickets/vancouver-canada-hollywood-theatre-vancouver-2026-11-12-7-pm/concert/18387640 | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | verify (applied) | 18373511 | https://seatgeek.com/michelle-branch-tickets/milwaukee-wisconsin-pabst-theater-2026-11-12-8-pm/concert/18373511 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | barry-manilow | verify (applied) | 17637148 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-12-7-pm/concert/17637148 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | garth-brooks | verify (applied) | 18715553 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-12-7-30-pm/concert/18715553 | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | verify (applied) | 18404272 | https://seatgeek.com/tyla-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-12-8-pm/concert/18404272 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | sienna-spiro | verify (applied) | 18317534 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-orpheum-theatre-los-angeles-2026-11-12-8-pm/concert/18317534 | - |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | the-smashing-pumpkins | verify (applied) | 18250173 | https://seatgeek.com/the-smashing-pumpkins-tickets/inglewood-california-kia-forum-2026-11-12-8-pm/concert/18250173 | - |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | verify (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | verify (applied) | 18157641 | https://seatgeek.com/sombr-tickets/cleveland-ohio-rocket-arena-2026-11-13-7-30-pm/concert/18157641 | - |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | john-summit | verify (applied) | 18257252 | https://seatgeek.com/john-summit-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-11-13-7-pm/concert/18257252 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | dave-matthews-band | verify (applied) | 18474898 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-13-7-30-pm/concert/18474898 | - |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | verify (applied) | 18253089 | https://seatgeek.com/beartooth-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-13-6-pm/concert/18253089 | - |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | michelle-branch | verify (applied) | 18373515 | https://seatgeek.com/michelle-branch-tickets/lexington-kentucky-manchester-music-hall-2026-11-13-8-pm/concert/18373515 | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | verify (applied) | 18322791 | https://seatgeek.com/amble-tickets/atlanta-georgia-terminal-west-2026-11-13-8-pm/concert/18322791 | - |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | daughtry | verify (applied) | 18316813 | https://seatgeek.com/daughtry-tickets/san-antonio-texas-aztec-theatre-2026-11-13-8-pm/concert/18316813 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | verify (applied) | 18645455 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-13-8-pm/concert/18645455 | - |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | treaty-oak-revival | verify (applied) | 18229327 | https://seatgeek.com/treaty-oak-revival-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2026-11-13-7-pm/concert/18229327 | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | jon-pardi | verify (applied) | 18390874 | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-13-7-pm/concert/18390874 | - |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | karan-aujla | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | verify (applied) | 18185177 | https://seatgeek.com/teddy-swims-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-13-7-pm/concert/18185177 | - |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | foy-vance | verify (applied) | 18084359 | https://seatgeek.com/foy-vance-tickets/seattle-washington-neptune-theatre-wa-2026-11-13-7-pm/concert/18084359 | - |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | tyla | verify (applied) | 18404273 | https://seatgeek.com/tyla-tickets/oakland-california-fox-theater-oakland-2026-11-13-8-pm/concert/18404273 | - |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | steve-lacy | verify (applied) | 18485946 | https://seatgeek.com/steve-lacy-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2026-11-13-8-pm/concert/18485946 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | lionel-richie | verify (applied) | 18405685 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-13-8-pm/concert/18405685 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | verify (applied) | 18686081 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-13-8-pm/concert/18686081 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | barry-manilow | verify (applied) | 17637150 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-13-8-pm/concert/17637150 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | eagles | verify (applied) | 18219945 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-13-8-30-pm/concert/18219945 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | verify (applied) | 18391945 | https://seatgeek.com/trivium-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-14-6-35-pm/concert/18391945 | - |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | verify (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-journey-2026-greenville-g5evz_1k1vuwb | journey | verify (applied) | 18237123 | https://seatgeek.com/journey-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-11-14-7-30-pm/concert/18237123 | - |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | blue-october | verify (applied) | 18141441 | https://seatgeek.com/blue-october-tickets/wilkes-barre-pennsylvania-f-m-kirby-center-2026-11-14-8-pm/concert/18141441 | - |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | daughtry | verify (applied) | 18316816 | https://seatgeek.com/daughtry-tickets/dallas-texas-majestic-theatre-dallas-2026-11-14-7-pm/concert/18316816 | - |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | verify (applied) | 18126039 | https://seatgeek.com/the-neighbourhood-tickets/nashville-tennessee-the-truth-nashville-2026-11-14-7-30-pm/concert/18126039 | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | verify (applied) | 18629507 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-14-8-pm/concert/18629507 | - |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | jon-pardi | verify (applied) | 18390529 | https://seatgeek.com/jon-pardi-tickets/independence-missouri-cable-dahmer-arena-2026-11-14-7-pm/concert/18390529 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | verify (applied) | 18312360 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-14-8-pm/concert/18312360 | - |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | verify (applied) | 18312209 | https://seatgeek.com/amble-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-11-14-8-pm/concert/18312209 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | verify (applied) | 18626684 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-14-8-pm/concert/18626684 | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | verify (applied) | 18185180 | https://seatgeek.com/teddy-swims-tickets/las-vegas-nevada-t-mobile-arena-2026-11-14-7-pm/concert/18185180 | - |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | verify (applied) | 18084166 | https://seatgeek.com/foy-vance-tickets/spokane-washington-knitting-factory-spokane-2026-11-14-7-pm/concert/18084166 | - |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | sabaton | verify (applied) | 17732679 | https://seatgeek.com/sabaton-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-14-7-pm/concert/17732679 | - |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | brand-new | verify (applied) | 18319860 | https://seatgeek.com/brand-new-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-14-8-pm/concert/18319860 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | barry-manilow | verify (applied) | 17637151 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-14-7-pm/concert/17637151 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | lionel-richie | verify (applied) | 18405683 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-14-8-pm/concert/18405683 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | verify (applied) | 18686083 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-14-8-pm/concert/18686083 | - |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | verify (applied) | 18240153 | https://seatgeek.com/katseye-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-14-8-pm/concert/18240153 | - |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | los-tigres-del-norte | verify (applied) | 18100396 | https://seatgeek.com/los-tigres-del-norte-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-14-8-pm/concert/18100396 | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | eagles | verify (applied) | 18219946 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-14-8-30-pm/concert/18219946 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | verify (applied) | 18706524 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-15-2-pm/concert/18706524 | - |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | pentatonix | verify (applied) | 18427197 | https://seatgeek.com/pentatonix-tickets/grand-rapids-michigan-van-andel-arena-2026-11-15-6-pm/concert/18427197 | - |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | beartooth | verify (applied) | 18253046 | https://seatgeek.com/beartooth-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-15-6-30-pm/concert/18253046 | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | verify (applied) | 18391947 | https://seatgeek.com/trivium-tickets/worcester-massachusetts-the-palladium-2026-11-15-6-35-pm/concert/18391947 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | verify (applied) | 18211699 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-15-7-pm/concert/18211699 | - |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | blue-october | verify (applied) | 18141766 | https://seatgeek.com/blue-october-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2026-11-15-8-pm/concert/18141766 | - |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | verify (applied) | 18269141 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-webster-hall-2026-11-15-8-pm/concert/18269141 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | verify (applied) | 18312361 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-15-8-pm/concert/18312361 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | verify (applied) | 18626686 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-15-8-pm/concert/18626686 | - |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | tyla | verify (applied) | 18404303 | https://seatgeek.com/tyla-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-11-15-8-pm/concert/18404303 | - |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | arcangel | verify (applied) | 18266329 | https://seatgeek.com/arcangel-tickets/denver-colorado-paramount-theatre-co-2026-11-15-8-pm/concert/18266329 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | verify (applied) | 18211700 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-16-7-pm/concert/18211700 | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | verify (applied) | 18175613 | https://seatgeek.com/sombr-tickets/toronto-canada-scotiabank-arena-2026-11-16-7-pm/concert/18175613 | - |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | stella-lefty | verify (applied) | 18251604 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-bowery-ballroom-2026-11-16-7-pm/concert/18251604 | - |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | verify (applied) | 18222773 | https://seatgeek.com/amble-tickets/new-orleans-louisiana-house-of-blues-new-orleans-2026-11-16-7-pm/concert/18222773 | - |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | verify (applied) | 18085139 | https://seatgeek.com/the-neighbourhood-tickets/kansas-city-missouri-t-mobile-center-2026-11-16-7-30-pm/concert/18085139 | - |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | karan-aujla | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | journey | verify (applied) | 18237124 | https://seatgeek.com/journey-tickets/saint-louis-missouri-enterprise-center-2026-11-16-7-30-pm/concert/18237124 | - |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | foy-vance | verify (applied) | 18084164 | https://seatgeek.com/foy-vance-tickets/boise-idaho-knitting-factory-concert-house-boise-2026-11-16-7-pm/concert/18084164 | - |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | verify (applied) | 18310993 | https://seatgeek.com/the-psychedelic-furs-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2026-11-16-8-pm/concert/18310993 | - |
| tm-trivium-2026-laval-17g8v0g6cubsshb | trivium | verify (applied) | 18391948 | https://seatgeek.com/trivium-tickets/laval-canada-place-bell-2026-11-17-6-35-pm/concert/18391948 | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | verify (applied) | 18253466 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-royale-boston-2026-11-17-8-pm/concert/18253466 | - |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | verify (applied) | 18222798 | https://seatgeek.com/amble-tickets/austin-texas-emo-s-austin-2026-11-17-7-pm/concert/18222798 | - |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | sabaton | verify (applied) | 17732681 | https://seatgeek.com/sabaton-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-17-7-pm/concert/17732681 | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | brandi-carlile | verify (applied) | 18626663 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-17-8-pm/concert/18626663 | - |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | steve-lacy | verify (applied) | 18485948 | https://seatgeek.com/steve-lacy-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-17-8-pm/concert/18485948 | - |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | katseye | verify (applied) | 18240158 | https://seatgeek.com/katseye-tickets/seattle-washington-climate-pledge-arena-2026-11-17-8-pm/concert/18240158 | - |
| tm-trivium-2026-toronto-177zv0g62er1iat | trivium | verify (applied) | 18391949 | https://seatgeek.com/trivium-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2026-11-18-6-35-pm/concert/18391949 | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | verify (applied) | 18253081 | https://seatgeek.com/beartooth-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-18-6-pm/concert/18253081 | - |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | verify (applied) | 18223872 | https://seatgeek.com/amble-tickets/dallas-texas-the-echo-lounge-music-hall-2026-11-18-7-pm/concert/18223872 | - |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | verify (applied) | 18140881 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2026-11-18-7-30-pm/concert/18140881 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | rod-wave | verify (applied) | 18320070 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-18-8-30-pm/concert/18320070 | - |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | karan-aujla | unverify (applied) | - | - | stored URL failed: event instants differ by 87679.5h (tolerance ±3h) — likely a different night; previously verified record no longer matches |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | victoria-monet | verify (applied) | 18579778 | https://seatgeek.com/victoria-monet-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-18-7-pm/concert/18579778 | - |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | verify (applied) | 18237193 | https://seatgeek.com/journey-tickets/houston-texas-toyota-center-2026-11-18-7-30-pm/concert/18237193 | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | brandi-carlile | verify (applied) | 18626661 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-18-8-pm/concert/18626661 | - |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | arcangel | verify (applied) | 18266330 | https://seatgeek.com/arcangel-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-18-8-pm/concert/18266330 | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | verify (applied) | 18573353 | https://seatgeek.com/trans-siberian-orchestra-tickets/green-bay-wisconsin-resch-center-2026-11-19-2-30-pm/concert/18573353 | - |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | verify (applied) | 18252806 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-atlantis-2026-11-19-6-30-pm/concert/18252806 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | verify (applied) | 18208621 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-19-7-pm/concert/18208621 | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | verify (applied) | 18385717 | https://seatgeek.com/pentatonix-tickets/cleveland-ohio-rocket-arena-2026-11-19-7-pm/concert/18385717 | - |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | the-neighbourhood | verify (applied) | 18085141 | https://seatgeek.com/the-neighbourhood-tickets/detroit-michigan-little-caesars-arena-2026-11-19-7-30-pm/concert/18085141 | - |
| tm-metallica-2026-uncasville-g5vvz_6nrigot | metallica | verify (applied) | 18164315 | https://seatgeek.com/metallica-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-19-8-pm/concert/18164315 | - |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | verify (applied) | 18572536 | https://seatgeek.com/too-many-zooz-tickets/ottawa-canada-overflow-brewing-company-2026-11-19-7-30-pm/concert/18572536 | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | verify (applied) | 18147875 | https://seatgeek.com/blue-october-tickets/jacksonville-florida-five-jacksonville-2026-11-19-7-pm/concert/18147875 | - |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | trans-siberian-orchestra | verify (applied) | 18573355 | https://seatgeek.com/trans-siberian-orchestra-tickets/council-bluffs-iowa-mid-america-center-2026-11-19-7-pm/concert/18573355 | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | rod-wave | verify (applied) | 18414834 | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-19-8-pm/concert/18414834 | - |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | stevie-wonder | verify (applied) | 18570214 | https://seatgeek.com/stevie-wonder-tickets/new-york-new-york-madison-square-garden-2026-11-19-8-pm/concert/18570214 | - |
| tm-zac-brown-band-2026-lincoln-vv16kzk8wakzacfeeu | zac-brown-band | verify (applied) | 18032031 | https://seatgeek.com/zac-brown-band-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-19-7-pm/concert/18032031 | - |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | verify (applied) | 18092700 | https://seatgeek.com/the-psychedelic-furs-tickets/phoenix-arizona-celebrity-theatre-phoenix-2026-11-19-7-30-pm/concert/18092700 | - |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | steve-lacy | verify (applied) | 18485949 | https://seatgeek.com/steve-lacy-tickets/san-diego-california-petco-park-2026-11-19-8-pm/concert/18485949 | - |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | katseye | verify (applied) | 18240159 | https://seatgeek.com/katseye-tickets/oakland-california-oakland-arena-2026-11-19-8-pm/concert/18240159 | - |
| tm-missio-2026-toronto-1avzz_8gklvsj7l | missio | verify (applied) | 18492369 | https://seatgeek.com/missio-tickets/toronto-canada-the-garrison-toronto-2026-11-20-6-30-pm/concert/18492369 | - |
| tm-doja-cat-2026-baltimore-1avfzbsgknfre1x | doja-cat | verify (applied) | 17769349 | https://seatgeek.com/doja-cat-tickets/baltimore-maryland-cfg-bank-arena-2026-11-20-7-30-pm/concert/17769349 | - |
| tm-little-big-town-2026-detroit-vvg1oz_g9neqkq | little-big-town | verify (applied) | 18292640 | https://seatgeek.com/little-big-town-tickets/detroit-michigan-fox-theatre-detroit-2026-11-20-7-30-pm/concert/18292640 | - |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | sabaton | verify (applied) | 17732683 | https://seatgeek.com/sabaton-tickets/omaha-nebraska-steelhouse-omaha-2026-11-20-7-pm/concert/17732683 | - |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | karan-aujla | verify (applied) | 18592289 | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2026-11-20-8-pm/concert/18592289 | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | brandi-carlile | verify (applied) | 18626665 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-20-8-pm/concert/18626665 | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | verify (applied) | 18404274 | https://seatgeek.com/tyla-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-20-6-30-pm/concert/18404274 | - |
| tm-ty-myers-2026-austin-g5diz_kuopazl | ty-myers | verify (applied) | 18142345 | https://seatgeek.com/ty-myers-tickets/austin-texas-moody-center-atx-2026-11-20-7-30-pm/concert/18142345 | - |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | arcangel | verify (applied) | 18266331 | https://seatgeek.com/arcangel-tickets/inglewood-california-youtube-theater-2026-11-20-8-pm/concert/18266331 | - |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | trans-siberian-orchestra | verify (applied) | 18573352 | https://seatgeek.com/trans-siberian-orchestra-tickets/cincinnati-ohio-heritage-bank-center-2026-11-21-3-pm/concert/18573352 | - |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | trans-siberian-orchestra | verify (applied) | 18573356 | https://seatgeek.com/trans-siberian-orchestra-tickets/denver-colorado-ball-arena-2026-11-21-3-pm/concert/18573356 | - |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | the-neighbourhood | verify (applied) | 18085142 | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-21-7-pm/concert/18085142 | - |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | treaty-oak-revival | verify (applied) | 18590276 | https://seatgeek.com/treaty-oak-revival-tickets/tulsa-oklahoma-bok-center-2026-11-21-6-pm/concert/18590276 | - |
| tm-metallica-2026-uncasville-g5vvz_6n-zpjb | metallica | verify (applied) | 18164313 | https://seatgeek.com/metallica-tickets/uncasville-connecticut-mohegan-sun-arena-2026-11-21-8-pm/concert/18164313 | - |
| tm-trivium-2026-chicago-vvg18z_cnmg_i8 | trivium | verify (applied) | 18391955 | https://seatgeek.com/trivium-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-21-6-35-pm/concert/18391955 | - |

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
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
