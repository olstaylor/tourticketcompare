# SeatGeek CTA auto-add log

Generated: 2026-11-24T04:09:44.017Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 5949
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5947
- Events already carrying a valid SeatGeek URL: 3772
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3771
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2176
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1331
- Skipped before any API call: 876 (past_event: 876)
- Events this run can check (window size): 400
- Rotation: window 2 of 4 (key 20781)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 400
- Events checked by this run: 400
- API calls made: 728
- Rate-limit responses: 0
- URLs added: 31
- Events skipped: 369
- no_candidates_returned: 318
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-nickelback-2027-fornebu-z698xzb_z1an7vpy
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 800 --resume-from 'tm-nickelback-2027-fornebu-z698xzb_z1an7vpy'
- Accepted venue mismatches: 25
- Conflicts found: 7

## Skipped reasons

- no_candidates_returned: 318
- city_or_metro_match_failed: 44
- conflicting_same_date_city_candidates: 7

## Interpretation

- `URLs added: 31` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3772 event(s) already carried valid SeatGeek URLs before this run, including 3771 enrichment-eligible event(s).
- This run queried only the 2176 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | Yuridia | 2027-02-11 | Palm Desert | https://seatgeek.com/yuridia-tickets/thousand-palms-california-acrisure-arena-2027-02-11-8-pm/concert/18570384 |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | Cristian Castro | 2027-02-13 | Palm Desert | https://seatgeek.com/cristian-castro-tickets/thousand-palms-california-acrisure-arena-2027-02-13-8-pm/concert/18295570 |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Air Supply | 2027-03-03 | Ottawa | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | Theory Of A Deadman | 2027-03-11 | Ottawa | https://seatgeek.com/theory-of-a-deadman-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-11-7-pm/concert/18570538 |
| tm-tori-kelly-2027-toronto-1avzz_pgkvx9zdy | Tori Kelly | 2027-04-21 | Toronto | https://seatgeek.com/tori-kelly-tickets/toronto-canada-history-2027-04-21-7-pm/concert/18778583 |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | Chris Tomlin | 2026-12-02 | Daytona Beach | https://seatgeek.com/chris-tomlin-tickets/daytona-beach-florida-peabody-auditorium-2026-12-02-7-pm/concert/18549313 |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Pink Martini | 2026-12-04 | Redding | https://seatgeek.com/pink-martini-tickets/redding-california-cascade-theatre-redding-2026-12-04-7-30-pm/concert/18690405 |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Blue October | 2026-12-06 | Oklahoma City | https://seatgeek.com/blue-october-tickets/oklahoma-city-oklahoma-the-criterion-okc-2026-12-06-8-pm/concert/18143446 |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | Air Supply | 2027-01-22 | Daytona Beach | https://seatgeek.com/air-supply-tickets/daytona-beach-florida-peabody-auditorium-2027-01-22-8-pm/concert/18355671 |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | Air Supply | 2027-01-30 | Immokalee | https://seatgeek.com/air-supply-tickets/immokalee-florida-seminole-casino-immokalee-2027-01-30-8-pm/concert/18424504 |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | Chelsea Cutler | 2027-01-30 | Atlanta | https://seatgeek.com/chelsea-cutler-tickets/atlanta-georgia-the-eastern-atlanta-2027-01-30-3-30-am/concert/18639169 |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Pink Martini | 2027-02-11 | Cincinnati | https://seatgeek.com/pink-martini-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-02-11-8-pm/concert/18321561 |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | Foreigner | 2027-02-15 | Daytona Beach | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Pink Martini | 2027-02-16 | Madison | https://seatgeek.com/pink-martini-tickets/madison-wisconsin-orpheum-theatre-madison-2027-02-16-7-30-pm/concert/18472447 |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Valley | 2027-02-19 | Edmonton | https://seatgeek.com/valley-tickets/edmonton-canada-midway-edmonton-2027-02-19-6-30-pm/concert/18606369 |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Dinosaur Jr. | 2027-02-27 | Cincinnati | https://seatgeek.com/dinosaur-jr-tickets/cincinnati-ohio-bogarts-cincinnati-2027-02-27-7-pm/concert/18540446 |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Daughtry | 2027-03-01 | Orono | https://seatgeek.com/daughtry-tickets/orono-maine-collins-center-for-the-arts-2027-03-01-7-pm/concert/18632934 |
| tm-valley-2027-denver-z7r9jz1aavzfu | Valley | 2027-03-06 | Denver | https://seatgeek.com/valley-tickets/denver-colorado-bluebird-theater-denver-2027-03-06-9-pm/concert/18683979 |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Mico | 2027-03-12 | Cincinnati | https://seatgeek.com/mico-tickets/cincinnati-ohio-bogarts-cincinnati-2027-03-12-7-pm/concert/18666222 |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | Grace Potter | 2027-03-14 | Redding | https://seatgeek.com/grace-potter-the-nocturnals-tickets/redding-california-cascade-theatre-redding-2027-03-14-7-30-pm/concert/18755563 |
| tm-tori-kelly-2027-anaheim-vv170z_pgkmqbskf | Tori Kelly | 2027-03-19 | Anaheim | https://seatgeek.com/tori-kelly-tickets/anaheim-california-house-of-blues-anaheim-2027-03-19-7-pm/concert/18778541 |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | VNV Nation | 2027-03-27 | Denver | https://seatgeek.com/vnv-nation-tickets/denver-colorado-the-oriental-theater-2027-03-27-8-pm/concert/18669971 |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | Melissa Etheridge | 2027-04-03 | Madison | https://seatgeek.com/melissa-etheridge-tickets/madison-wisconsin-orpheum-theatre-madison-2027-04-03-8-pm/concert/18754496 |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Foy Vance | 2027-04-12 | Cincinnati | https://seatgeek.com/foy-vance-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-04-12-7-pm/concert/18085807 |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | Jon Pardi | 2027-04-18 | Peoria | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2027-04-18-7-pm/concert/18862818 |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | Hazlett | 2027-04-25 | Pittsburgh | https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-7-pm/concert/18312117 |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | The Warning | 2027-05-01 | Oklahoma City | https://seatgeek.com/the-warning-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-01-7-pm/concert/18593400 |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | Meshuggah | 2027-05-02 | Oklahoma City | https://seatgeek.com/meshuggah-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-02-7-pm/concert/18724686 |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Mei Semones | 2027-05-02 | Denver | https://seatgeek.com/mei-semones-tickets/denver-colorado-bluebird-theater-denver-2027-05-02-8-pm/concert/18793886 |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Lizzy McAlpine | 2027-05-18 | Oklahoma City | https://seatgeek.com/lizzy-mcalpine-tickets/oklahoma-city-oklahoma-thelma-gaylord-pat-at-civic-center-music-hall-2027-05-18-7-pm/concert/18619437 |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Dylan Gossett | 2027-05-20 | Oklahoma City | https://seatgeek.com/dylan-gossett-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-20-7-pm/concert/18642116 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-aespa-2027-milano-zg9rmiynyzekk1 | aespa | 2027-01-29 | Milano | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdlzcpt | Fuerza Regida | 2027-01-29 | Ciudad de México | no_candidates_returned | - |
| tm-sombr-2027-mexico-1av8z_agkn6tndi | Sombr | 2027-01-29 | México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdowrar | Fuerza Regida | 2027-01-30 | Ciudad de México | no_candidates_returned | - |
| tm-sombr-2027-mexico-1av8z_agknaoeux | Sombr | 2027-01-30 | México | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | Five Finger Death Punch | 2027-01-31 | Praha 9 | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdxsfp_ | Fuerza Regida | 2027-01-31 | Ciudad de México | no_candidates_returned | - |
| tm-mico-2027-manchester-g5vhz_flmnkjc | Mico | 2027-02-01 | Manchester | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdn9bgh | Fuerza Regida | 2027-02-01 | Ciudad de México | no_candidates_returned | - |
| tm-black-stone-cherry-2027-manchester-g5vhzbzkgpts1 | Black Stone Cherry | 2027-02-02 | Manchester | no_candidates_returned | - |
| tm-black-stone-cherry-2027-norwich-g5vhzbzpkx4ut | Black Stone Cherry | 2027-02-03 | Norwich | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacn3ld | Fuerza Regida | 2027-02-03 | Ciudad de México | no_candidates_returned | - |
| tm-mico-2027-london-g5vhz_fjlqa3s | Mico | 2027-02-04 | London | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgauwxey | Fuerza Regida | 2027-02-04 | Ciudad de México | no_candidates_returned | - |
| tm-black-stone-cherry-2027-edinburgh-g5dzzbzk-605z | Black Stone Cherry | 2027-02-06 | Edinburgh | no_candidates_returned | - |
| tm-black-stone-cherry-2027-newcastle-upon-tyne-g5dzz_g10kk11 | Black Stone Cherry | 2027-02-09 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | Amble | 2027-02-09 | Madrid | no_candidates_returned | - |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | Amble | 2027-02-10 | Barcelona | no_candidates_returned | - |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | Role Model | 2027-02-11 | Berlin | no_candidates_returned | - |
| tm-hilary-duff-2027-zapopan-1av8z_fgknzgqjq | Hilary Duff | 2027-02-15 | Zapopan | no_candidates_returned | - |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | Role Model | 2027-02-17 | Düsseldorf | no_candidates_returned | - |
| tm-cage-the-elephant-2027-cardiff-16dbz_3rfg7rxe8 | Cage The Elephant | 2027-02-22 | Cardiff | no_candidates_returned | - |
| tm-hollywood-undead-2027-birmingham-g5dzz_k9em7do | Hollywood Undead | 2027-02-23 | Birmingham | no_candidates_returned | - |
| tm-jake-bugg-2027-nottingham-g5vhz_ohmndtt | Jake Bugg | 2027-02-23 | Nottingham | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx0x2 | Bruno Mars | 2027-02-24 | Docklands | no_candidates_returned | - |
| tm-jake-bugg-2027-london-g5vhz_olkluto | Jake Bugg | 2027-02-25 | London | no_candidates_returned | - |
| tm-hollywood-undead-2027-manchester-g5vhz_kjdvnwu | Hollywood Undead | 2027-02-26 | Manchester | no_candidates_returned | - |
| tm-hollywood-undead-2027-glasgow-g5dzz_kpssdt2 | Hollywood Undead | 2027-02-27 | Glasgow | no_candidates_returned | - |
| tm-hollywood-undead-2027-leeds-g5dzz_krmlxyq | Hollywood Undead | 2027-02-28 | Leeds | no_candidates_returned | - |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgknd3rue | Tame Impala | 2027-02-28 | Ciudad de México | no_candidates_returned | - |
| tm-cage-the-elephant-2027-london-g5vhz_3r6zval | Cage The Elephant | 2027-03-01 | London | no_candidates_returned | - |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgklvjvrt | Tame Impala | 2027-03-01 | Ciudad de México | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj | Sleeping With Sirens | 2027-03-02 | Bristol | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-glasgow-g5dzz_g5isp0f | Sleeping With Sirens | 2027-03-03 | Glasgow | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-manchester-g5vhz_gfgtq6v | Sleeping With Sirens | 2027-03-05 | Manchester | no_candidates_returned | - |
| tm-the-dead-south-2027-manchester-17u8v0g6gm8i6t0 | The Dead South | 2027-03-06 | Manchester | no_candidates_returned | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | The Warning | 2027-03-09 | Madrid | no_candidates_returned | - |
| tm-the-dead-south-2027-wolverhampton-g5vhz_2b_qppl | The Dead South | 2027-03-10 | Wolverhampton | no_candidates_returned | - |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | The Warning | 2027-03-10 | Barcelona | no_candidates_returned | - |
| tm-the-dead-south-2027-cardiff-17uov0g6gpgz4uf | The Dead South | 2027-03-12 | Cardiff | no_candidates_returned | - |
| tm-kaleo-2027-madrid-z698xz2qz1kuvp4rv | KALEO | 2027-03-14 | Madrid | no_candidates_returned | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogksqr0wn | Bruno Mars | 2027-03-16 | Auckland | no_candidates_returned | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | Sienna Spiro | 2027-03-16 | Forest (Brussels) | no_candidates_returned | - |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | James Blunt | 2027-03-16 | Oslo | no_candidates_returned | - |
| tm-tash-sultana-2027-merksem-antwerpen-z698xzg2z1kjpqofb | Tash Sultana | 2027-03-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | Teddy Swims | 2027-03-18 | Amsterdam | no_candidates_returned | - |
| tm-megadeth-2027-leeds-g5vhz_2hqzflr | Megadeth | 2027-03-19 | Leeds | no_candidates_returned | - |
| tm-stella-lefty-2027-manchester-g5dzz_36uppzk | Stella Lefty | 2027-03-19 | Manchester | no_candidates_returned | - |
| tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc | Stella Lefty | 2027-03-22 | Birmingham | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogku9epc3 | Fontaines D.C. | 2027-03-24 | México | no_candidates_returned | - |
| tm-leon-bridges-2027-mexico-1kazvppagacnsha | Leon Bridges | 2027-03-24 | México | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogkxugz79 | Fontaines D.C. | 2027-03-25 | México | no_candidates_returned | - |
| tm-james-blunt-2027-leeds-g5vhz_8rglm2f | James Blunt | 2027-03-26 | Leeds | no_candidates_returned | - |
| tm-jake-bugg-2027-madrid-z698xz2qz1k_y8v-_ | Jake Bugg | 2027-04-06 | Madrid | no_candidates_returned | - |
| tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx | Brandi Carlile | 2027-04-07 | Glasgow | no_candidates_returned | - |
| tm-jake-bugg-2027-barcelona-z698xz2qz16vps_0bf | Jake Bugg | 2027-04-07 | Barcelona | no_candidates_returned | - |
| tm-anuel-aa-2027-monterrey-g5dvz_6rcdk4r | Anuel AA | 2027-04-08 | Monterrey | no_candidates_returned | - |
| tm-anuel-aa-2027-zapopan-g5dvz_6raf6md | Anuel AA | 2027-04-15 | Zapopan | no_candidates_returned | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | Simple Minds | 2027-04-20 | Munich | no_candidates_returned | - |
| tm-erasure-2027-liverpool-1amzkfugkdiq68r | Erasure | 2027-04-28 | Liverpool | no_candidates_returned | - |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | Bryan Adams | 2027-05-03 | Oslo | no_candidates_returned | - |
| tm-erasure-2027-nottingham-1agzkfmgkd2kzuu | Erasure | 2027-05-05 | Nottingham | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | Thirty Seconds to Mars | 2027-05-05 | Nürnberg | no_candidates_returned | - |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | Bryan Adams | 2027-05-07 | Helsinki | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdnvnrg | Niall Horan | 2027-05-07 | Ciudad de México | no_candidates_returned | - |
| tm-erasure-2027-leeds-g5vhz_kldd9ue | Erasure | 2027-05-08 | Leeds | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdpr1hq | Niall Horan | 2027-05-08 | Ciudad de México | no_candidates_returned | - |
| tm-erasure-2027-glasgow-1auzkfzgkds5h6i | Erasure | 2027-05-09 | Glasgow | no_candidates_returned | - |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | 2027-05-11 | Leeds | no_candidates_returned | - |
| tm-erasure-2027-brighton-g5dzz_kwfhs5r | Erasure | 2027-05-11 | Brighton | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz16vasca3z | U2 | 2027-05-13 | Barcelona | no_candidates_returned | - |
| tm-phoebe-bridgers-2027-ciudad-de-mexico-1afzk4egkey1bcx | Phoebe Bridgers | 2027-05-13 | Ciudad de México | no_candidates_returned | - |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | 2027-05-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-valley-2027-london-g5dzz_3vpsj3z | Valley | 2027-05-14 | London | no_candidates_returned | - |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | Greta Van Fleet | 2027-05-15 | Munich | no_candidates_returned | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | Sombr | 2027-05-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-jay-wheeler-2027-mexico-16fzkfupgza8kga7 | Jay Wheeler | 2027-05-16 | México | no_candidates_returned | - |
| tm-fall-out-boy-2027-praha-9-z698xzu0z16eepqfuf | Fall Out Boy | 2027-05-17 | Praha 9 | no_candidates_returned | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | 2027-05-17 | Leeds | no_candidates_returned | - |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | Hilary Duff | 2027-05-17 | Amsterdam | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz16ezagpe7 | U2 | 2027-05-17 | Barcelona | no_candidates_returned | - |
| tm-garth-brooks-2027-belfast-16doz_p8zg7ggqn | Garth Brooks | 2027-05-21 | Belfast | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0z0z | FEID | 2027-05-21 | Ciudad de México | no_candidates_returned | - |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | 2027-05-22 | Leeds | no_candidates_returned | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | Greta Van Fleet | 2027-05-22 | Praha 9 | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0zp7 | FEID | 2027-05-22 | Ciudad de México | no_candidates_returned | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gktipbpa | FEID | 2027-05-23 | Ciudad de México | no_candidates_returned | - |
| tm-fall-out-boy-2027-brussels-z698xzg2z16vfjc3ef | Fall Out Boy | 2027-05-27 | Brussels | no_candidates_returned | - |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | Weezer | 2027-05-29 | Oslo | no_candidates_returned | - |
| tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov | Greta Van Fleet | 2027-05-30 | Birmingham | no_candidates_returned | - |
| tm-megadeth-2027-kansas-city-1ae7z_pgki7igc3 | Megadeth | 2027-05-31 | Kansas City | city_or_metro_match_failed | https://seatgeek.com/megadeth-tickets/riverside-missouri-morton-amphitheater-2027-05-31-7-pm/concert/18778374 |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | Weezer | 2027-06-01 | Helsinki | no_candidates_returned | - |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | Sombr | 2027-06-01 | Amsterdam | no_candidates_returned | - |
| tm-the-interrupters-2027-london-g5vhz_4d3nbns | The Interrupters | 2027-06-01 | London | no_candidates_returned | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | Nickelback | 2027-06-05 | Forest (Brussels) | no_candidates_returned | - |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | Rod Stewart | 2027-06-09 | Helsinki | no_candidates_returned | - |
| tm-sting-2027-krakow-z698xzqpz16evtf6jd | Sting | 2027-06-09 | Krakow | no_candidates_returned | - |
| tm-sting-2027-odz-z698xzqpz1k06xapf | Sting | 2027-06-10 | Łódź | no_candidates_returned | - |
| tm-foo-fighters-2027-helsinki-z698xz8kz1kp9zozn | Foo Fighters | 2027-06-12 | Helsinki | no_candidates_returned | - |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | 2027-06-13 | Milano | no_candidates_returned | - |
| tm-leon-bridges-2027-bristol-1adfz_pgkidfay7 | Leon Bridges | 2027-06-15 | Bristol | no_candidates_returned | - |
| tm-shania-twain-2027-glasgow-1adbz_fgkuptsoi | Shania Twain | 2027-06-17 | Glasgow | no_candidates_returned | - |
| tm-leon-bridges-2027-london-1adbz_pgkgzqvyv | Leon Bridges | 2027-06-17 | London | no_candidates_returned | - |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | Simply Red | 2027-06-19 | Amsterdam | no_candidates_returned | - |
| tm-tom-jones-2027-liverpool-g5vhz_pqm3anq | Tom Jones | 2027-06-20 | Liverpool | no_candidates_returned | - |
| tm-sting-2027-hemer-z698xzc2z16vagofpv | Sting | 2027-06-20 | Hemer | no_candidates_returned | - |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | Rod Stewart | 2027-06-20 | Munich | no_candidates_returned | - |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | Simply Red | 2027-06-22 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-james-blunt-2027-gloucestershire-16mzk4yjeza8ddu2 | James Blunt | 2027-06-23 | Gloucestershire | no_candidates_returned | - |
| tm-amble-2027-belfast-17czv0g62qetzl- | Amble | 2027-06-23 | Belfast | no_candidates_returned | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | 2027-06-23 | Assago | no_candidates_returned | - |
| tm-james-blunt-2027-llangollen-g5vhz_3nxrxc- | James Blunt | 2027-06-24 | Llangollen | no_candidates_returned | - |
| tm-tom-jones-2027-rugeley-1amzk4tgkejv7jb | Tom Jones | 2027-06-25 | Rugeley | no_candidates_returned | - |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | Jack Johnson | 2027-06-26 | Forest (Brussels) | no_candidates_returned | - |
| tm-dermot-kennedy-2027-belfast-1azzk4kgkeju-cx | Dermot Kennedy | 2027-06-26 | Belfast | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-hamilton-1avzz_pgknnsz0d | KPop Demon Hunters | 2027-06-26 | Hamilton | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/hamilton-canada-td-coliseum-2027-06-26-2-pm/concert/18772680 |
| tm-sting-2027-konstanz-z698xzc2z1kjfov_n | Sting | 2027-06-27 | Konstanz | no_candidates_returned | - |
| tm-tom-jones-2027-llangollen-g5vhz_pwfve8t | Tom Jones | 2027-06-28 | Llangollen | no_candidates_returned | - |
| tm-fontaines-d-c-2027-cardiff-g5vhz_oiinrjk | Fontaines D.C. | 2027-06-29 | Cardiff | no_candidates_returned | - |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | Simply Red | 2027-06-30 | Fulda | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4eimdn_ | Jack Johnson | 2027-07-02 | St Austell | no_candidates_returned | - |
| tm-pink-martini-2027-london-g5vhz_fqbbwez | Pink Martini | 2027-07-02 | London | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z | Fontaines D.C. | 2027-07-03 | Manchester | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4d63ah_ | Jack Johnson | 2027-07-03 | St Austell | no_candidates_returned | - |
| tm-simply-red-2027-hemer-z698xzc2z16v_nfy_4 | Simply Red | 2027-07-03 | Hemer | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt | Fontaines D.C. | 2027-07-04 | Manchester | no_candidates_returned | - |
| tm-bryan-adams-2027-hemer-z698xzc2z1k_buyvn | Bryan Adams | 2027-07-04 | Hemer | no_candidates_returned | - |
| tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj | Pink Martini | 2027-07-04 | Edinburgh | no_candidates_returned | - |
| tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl | Fontaines D.C. | 2027-07-06 | Glasgow | no_candidates_returned | - |
| tm-amble-2027-manchester-g5vhz_8upt3w4 | Amble | 2027-07-08 | Manchester | no_candidates_returned | - |
| tm-tom-jones-2027-newcastle-g5vhz_pjbj04_ | Tom Jones | 2027-07-11 | Newcastle | no_candidates_returned | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | 2027-07-13 | Glasgow | no_candidates_returned | - |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | Santana | 2027-07-24 | Krakow | no_candidates_returned | - |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | Rod Stewart | 2027-07-24 | Hannover | no_candidates_returned | - |
| tm-rod-stewart-2027-hamburg-z698xzc2z16vxb1oag | Rod Stewart | 2027-07-25 | Hamburg | no_candidates_returned | - |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | Santana | 2027-07-28 | Oslo | no_candidates_returned | - |
| tm-simply-red-2027-chester-1agzkfsgkduxpco | Simply Red | 2027-08-07 | Chester | no_candidates_returned | - |
| tm-fall-out-boy-2027-kansas-city-1a-zk40gkd1psok | Fall Out Boy | 2027-08-07 | Kansas City | city_or_metro_match_failed | https://seatgeek.com/fall-out-boy-tickets/riverside-missouri-morton-amphitheater-2027-08-07-5-30-pm/concert/18753424 |
| tm-bryan-adams-2027-magdeburg-z698xzc2z16vb8r7pg | Bryan Adams | 2027-08-13 | Magdeburg | no_candidates_returned | - |
| tm-simply-red-2027-swansea-g5vhz_3rbtf3u | Simply Red | 2027-08-20 | Swansea | no_candidates_returned | - |
| tm-james-blunt-2027-margate-1agzkfegkdf5svi | James Blunt | 2027-08-27 | Margate | no_candidates_returned | - |
| tm-oasis-2027-co-meath-1avoz_3gkrnpmuo | Oasis | 2027-09-04 | Co. Meath | no_candidates_returned | - |
| tm-oasis-2027-co-meath-1avoz_3gkrn9ru4 | Oasis | 2027-09-05 | Co. Meath | no_candidates_returned | - |
| tm-passenger-2027-belfast-16zzkfkojzage16c | Passenger | 2027-09-08 | Belfast | no_candidates_returned | - |
| tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx | Passenger | 2027-09-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-sienna-spiro-2027-mexico-1afzk4ogkeyuq9e | Sienna Spiro | 2027-09-14 | México | no_candidates_returned | - |
| tm-meshuggah-2027-manchester-1adfz_4gkvdqmcy | Meshuggah | 2027-10-29 | Manchester | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4mgk | Phoebe Bridgers | 2026-11-24 | Dublin | no_candidates_returned | - |
| tm-sting-2026-tampa-vvg1vzbpivbfyz | Sting | 2026-11-24 | Tampa | city_or_metro_match_failed | https://seatgeek.com/sting-tickets/orlando-florida-hard-rock-live-orlando-2026-11-24-8-pm/concert/17898563 |
| tm-dermot-kennedy-2026-christchurch-1ae8z_agkm57djw | Dermot Kennedy | 2026-11-25 | Christchurch | no_candidates_returned | - |
| tm-trivium-2026-saint-louis-17f8v0g6cy863b6 | Trivium | 2026-11-25 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/trivium-tickets/chesterfield-missouri-the-factory-stl-2026-11-25-7-pm/concert/18391960 |
| tm-harry-styles-2026-docklands-1apzk8ugkd2sm8u | Harry Styles | 2026-11-27 | Docklands | no_candidates_returned | - |
| tm-sabaton-2026-saint-louis-1ae7zbwgkmsi8la | Sabaton | 2026-11-27 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/sabaton-tickets/chesterfield-missouri-the-factory-stl-2026-11-27-7-pm/concert/17732687 |
| tm-dermot-kennedy-2026-auckland-1ae8z_agkranxjl | Dermot Kennedy | 2026-11-28 | Auckland | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-16efz_dckg7slsc | Harry Styles | 2026-11-28 | Docklands | no_candidates_returned | - |
| tm-interpol-2026-dublin-1abzkuogkdez9hd | Interpol | 2026-11-30 | Dublin | no_candidates_returned | - |
| tm-boyz-ii-men-2026-auckland-17azv0g6c2evn3t | Boyz II Men | 2026-12-01 | Auckland | no_candidates_returned | - |
| tm-chris-stapleton-2026-nashville-g5viz_kleeols | Chris Stapleton | 2026-12-01 | Nashville | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2mxoc | Harry Styles | 2026-12-02 | Docklands | no_candidates_returned | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | Andrea Bocelli | 2026-12-02 | Abu Dhabi | no_candidates_returned | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2broi | Harry Styles | 2026-12-04 | Docklands | no_candidates_returned | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | 2026-12-04 | Forest (Brussels) | no_candidates_returned | - |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | Tommy Emmanuel | 2026-12-04 | Newberry | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16vai_vps | Phoebe Bridgers | 2026-12-05 | Forest (Brussels) | no_candidates_returned | - |
| tm-tori-kelly-2026-manchester-g5vhz_1r4owph | Tori Kelly | 2026-12-07 | Manchester | no_candidates_returned | - |
| tm-dylan-gossett-2026-west-melbourne-177yv0g653cuwz_ | Dylan Gossett | 2026-12-08 | West Melbourne | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-adelaide-17a8v0g6cj0fp2t | Queens Of The Stone Age | 2026-12-08 | Adelaide | no_candidates_returned | - |
| tm-tori-kelly-2026-birmingham-g5dzz_1hposmp | Tori Kelly | 2026-12-08 | Birmingham | no_candidates_returned | - |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | Jay Wheeler | 2026-12-08 | Valencia | no_candidates_returned | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | Jay Wheeler | 2026-12-10 | Bilbao | no_candidates_returned | - |
| tm-tori-kelly-2026-london-g5dzz_1hlw0l0 | Tori Kelly | 2026-12-11 | London | no_candidates_returned | - |
| tm-dylan-gossett-2026-waipara-17azv0g653pu3v4 | Dylan Gossett | 2026-12-12 | Waipara | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1ka8v0ukgagf72c | Harry Styles | 2026-12-12 | Sydney Olympic Park | no_candidates_returned | - |
| tm-a-perfect-circle-2026-auckland-1ae8z_kgkr16koz | A Perfect Circle | 2026-12-13 | Auckland | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1apzk8ugkdafgq9 | Harry Styles | 2026-12-13 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | Bryan Adams | 2026-12-13 | Praha 9 | no_candidates_returned | - |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | Jay Wheeler | 2026-12-13 | Madrid | no_candidates_returned | - |
| tm-jodeci-2026-st-petersburg-vvg1vz_2qbbe54 | Jodeci | 2026-12-13 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/jodeci-tickets/saint-petersburg-florida-duke-energy-center-for-the-arts-mahaffey-theater-2026-12-13-7-pm/concert/18407275 |
| tm-air-supply-2026-auckland-17azv0g65rxws3q | Air Supply | 2026-12-15 | Auckland | no_candidates_returned | - |
| tm-polyphia-2026-leeds-g5dzz_gl9y_6t | Polyphia | 2026-12-15 | Leeds | no_candidates_returned | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | 2026-12-16 | Ciudad de México | no_candidates_returned | - |
| tm-stella-lefty-2026-saint-louis-1a-zkfxgkegfvfo | Stella Lefty | 2026-12-18 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/stella-lefty-tickets/chesterfield-missouri-the-factory-stl-2026-12-18-8-pm/concert/18591481 |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | Jay Wheeler | 2026-12-19 | Barcelona | no_candidates_returned | - |
| tm-jon-pardi-2026-saint-louis-16e7z_obyg7v9-3 | Jon Pardi | 2026-12-19 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/jon-pardi-tickets/chesterfield-missouri-the-factory-stl-2026-12-19-8-pm/concert/18535011 |
| tm-queens-of-the-stone-age-2026-auckland-17azv0g6cjw0kgn | Queens Of The Stone Age | 2026-12-20 | Auckland | no_candidates_returned | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | Tyla | 2027-01-08 | Pretoria | no_candidates_returned | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | Tyla | 2027-01-09 | Pretoria | no_candidates_returned | - |
| tm-mon-laferte-2027-madrid-z698xz2qz16vquuz7t | Mon Laferte | 2027-01-13 | Madrid | no_candidates_returned | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | 2027-01-15 | Monterrey | no_candidates_returned | - |
| tm-pink-martini-2027-ft-lauderdale-vvg1vz_asbh4yx | Pink Martini | 2027-01-17 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/pink-martini-tickets/fort-lauderdale-florida-au-rene-theater-at-the-broward-center-2027-01-17-7-pm/concert/18223166 |
| tm-five-finger-death-punch-2027-dublin-1avoz_fgkbmo2st | Five Finger Death Punch | 2027-01-19 | Dublin | no_candidates_returned | - |
| tm-saint-levant-2027-london-1auzk48gkdxoa9q | Saint Levant | 2027-01-21 | London | no_candidates_returned | - |
| tm-yacht-rock-revue-2027-ft-lauderdale-vvg1vz_3t9jx1c | Yacht Rock Revue | 2027-01-21 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/yacht-rock-revue-tickets/fort-lauderdale-florida-lillian-s-wells-hall-at-the-parker-2027-01-21-7-30-pm/concert/18613163 |
| tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6- | Five Finger Death Punch | 2027-01-23 | London | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-dublin-17kzv0g6gmgxxtc | Two Door Cinema Club | 2027-01-23 | Dublin | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-belfast-17czv0g659j0-z4 | Two Door Cinema Club | 2027-01-24 | Belfast | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-assago-zg9rmiynyzefv7 | Nothing But Thieves | 2027-01-24 | Assago | no_candidates_returned | - |
| tm-bryson-tiller-2027-auckland-17azv0g65qclfnt | Bryson Tiller | 2027-01-27 | Auckland | no_candidates_returned | - |
| tm-atmosphere-2027-salt-lake-city-g5vzz_kl2vywj | Atmosphere | 2027-01-30 | Salt Lake City | city_or_metro_match_failed | https://seatgeek.com/atmosphere-tickets/park-city-utah-the-marquis-park-city-2027-01-30-6-pm/concert/18609095 |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1adjz_pgkwcxzvj | A Boogie Wit Da Hoodie | 2027-01-31 | Manchester | no_candidates_returned | - |
| tm-a-boogie-wit-da-hoodie-2027-london-1amzk4ygkd4ogxu | A Boogie Wit Da Hoodie | 2027-02-02 | London | no_candidates_returned | - |
| tm-billy-strings-2027-asheville-g5evz_omwlg3b | Billy Strings | 2027-02-04 | Asheville | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-04-3-30-am/concert/18540096 |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | John Summit | 2027-02-11 | Warsaw | no_candidates_returned | - |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | John Summit | 2027-02-12 | Forest (Brussels) | no_candidates_returned | - |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | Missio | 2027-02-12 | Brooklyn | no_candidates_returned | - |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | Grace Potter | 2027-02-12 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/grace-potter-the-nocturnals-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-02-12-7-30-pm/concert/18755535 |
| tm-bruno-mars-2027-burswood-1apzkfbgkdn2ves | Bruno Mars | 2027-02-13 | Burswood | no_candidates_returned | - |
| tm-daughtry-2027-saint-louis-vv1fvovpgtjkz75857 | Daughtry | 2027-02-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/daughtry-tickets/st-louis-missouri-the-pageant-st-louis-2027-02-13-7-pm/concert/18632917 |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | Role Model | 2027-02-15 | Forest (Brussels) | no_candidates_returned | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | Malcolm Todd | 2027-02-18 | Forest (Brussels) | no_candidates_returned | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | Valley | 2027-02-18 | Regina | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | Five Finger Death Punch | 2027-02-19 | Fornebu | no_candidates_returned | - |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | James Blunt | 2027-02-19 | Forest (Brussels) | no_candidates_returned | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfkdo_ | BTS | 2027-02-20 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfik-s | BTS | 2027-02-21 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-glasgow-1kuovpuoga5adth | Bullet For My Valentine | 2027-02-23 | Glasgow | no_candidates_returned | - |
| tm-cage-the-elephant-2027-leeds-g5dzz_350zpr- | Cage The Elephant | 2027-02-23 | Leeds | no_candidates_returned | - |
| tm-dylan-gossett-2027-glasgow-g5dzz_8pg5sb3 | Dylan Gossett | 2027-02-23 | Glasgow | no_candidates_returned | - |
| tm-meshuggah-2027-saint-louis-1a-zk44gkdts0ox | Meshuggah | 2027-02-23 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/meshuggah-tickets/chesterfield-missouri-the-factory-stl-2027-02-23-7-pm/concert/18724648 |
| tm-dylan-gossett-2027-glasgow-g5dzz_8qwdoqp | Dylan Gossett | 2027-02-24 | Glasgow | no_candidates_returned | - |
| tm-simple-minds-2027-auckland-17azv0g6g9-xfc0 | Simple Minds | 2027-02-25 | Auckland | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-birmingham-1anzkfggkel7zmz | Bullet For My Valentine | 2027-02-25 | Birmingham | no_candidates_returned | - |
| tm-cage-the-elephant-2027-glasgow-g5dzz_3kn7sp1 | Cage The Elephant | 2027-02-25 | Glasgow | no_candidates_returned | - |
| tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr | Malcolm Todd | 2027-02-25 | Glasgow | no_candidates_returned | - |
| tm-mico-2027-ft-lauderdale-vvg1vz_fqxgdhj | Mico | 2027-02-25 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/mico-tickets/fort-lauderdale-florida-revolution-live-2027-02-25-7-pm/concert/18666081 |
| tm-mico-2027-st-petersburg-vvg1vz_fxbu9sq | Mico | 2027-02-26 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/mico-tickets/saint-petersburg-florida-jannus-live-2027-02-26-7-pm/concert/18665972 |
| tm-dancing-with-the-stars-2027-saint-louis-vv1akzkfsgkdkbgr5 | Dancing With The Stars | 2027-02-26 | Saint Louis | no_candidates_returned | - |
| tm-bruno-mars-2027-milton-1akzkf3gkdacg5v | Bruno Mars | 2027-02-28 | Milton | no_candidates_returned | - |
| tm-role-model-2027-manchester-g5vhz_u1kkyot | Role Model | 2027-02-28 | Manchester | no_candidates_returned | - |
| tm-malcolm-todd-2027-manchester-1adbz_3gknvr9ad | Malcolm Todd | 2027-02-28 | Manchester | no_candidates_returned | - |
| tm-simple-minds-2027-christchurch-17azv0g6gjwt3e9 | Simple Minds | 2027-03-01 | Christchurch | no_candidates_returned | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | Teddy Swims | 2027-03-02 | Fornebu | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3lpy7hq | Malcolm Todd | 2027-03-02 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3rjik2s | Malcolm Todd | 2027-03-03 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-london-g5dzz_3rsuku2 | Malcolm Todd | 2027-03-04 | London | no_candidates_returned | - |
| tm-the-neighbourhood-2027-saint-louis-vv1kvovppfga13fre | The Neighbourhood | 2027-03-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-neighbourhood-tickets/st-louis-missouri-chaifetz-arena-2027-03-04-7-pm/concert/18726901 |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknavvld | Bruno Mars | 2027-03-05 | Sydney Olympic Park | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-orlando-1axzkfggkescv4v | Dancing With The Stars | 2027-03-06 | Orlando | no_candidates_returned | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | Mico | 2027-03-06 | Lawrence | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxoik | Bruno Mars | 2027-03-09 | Sydney Olympic Park | no_candidates_returned | - |
| tm-valley-2027-saint-louis-vv16kzkfipkzaga2f7 | Valley | 2027-03-09 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/valley-tickets/st-louis-missouri-delmar-hall-2027-03-09-8-pm/concert/18606492 |
| tm-bryan-adams-2027-auckland-17azv0g6cjvbo_i | Bryan Adams | 2027-03-10 | Auckland | no_candidates_returned | - |
| tm-tash-sultana-2027-dublin-1abzkgkgkdrrzgx | Tash Sultana | 2027-03-11 | Dublin | no_candidates_returned | - |
| tm-bryan-adams-2027-christchurch-17azv0g6cuuuvxf | Bryan Adams | 2027-03-12 | Christchurch | no_candidates_returned | - |
| tm-vnv-nation-2027-ft-lauderdale-vvg1vzbvdf3u-x | VNV Nation | 2027-03-12 | Ft Lauderdale | no_candidates_returned | - |
| tm-blue-october-2027-saint-louis-1ae7z_3gkiei5ox | Blue October | 2027-03-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/blue-october-tickets/chesterfield-missouri-the-factory-stl-2027-03-13-7-30-pm/concert/18594687 |
| tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr | Gary Allan | 2027-03-13 | Peoria | conflicting_same_date_city_candidates | https://seatgeek.com/gary-allan-tickets/peoria-illinois-prairie-home-alliance-theater-at-peoria-civic-center-2027-03-13-8-pm/concert/18365957 |
| tm-polyphia-2027-st-petersburg-vvg1vz_oesihnv | Polyphia | 2027-03-14 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/polyphia-tickets/saint-petersburg-florida-jannus-live-2027-03-14-7-30-pm/concert/18536025 |
| tm-megadeth-2027-glasgow-17uov0g62mgifrs | Megadeth | 2027-03-16 | Glasgow | no_candidates_returned | - |
| tm-remi-wolf-2027-saint-louis-16-zk46uyzag1a76 | Remi Wolf | 2027-03-16 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/remi-wolf-tickets/chesterfield-missouri-the-factory-stl-2027-03-16-7-30-pm/concert/18664772 |
| tm-megadeth-2027-birmingham-17fyv0g62qpke7_ | Megadeth | 2027-03-18 | Birmingham | no_candidates_returned | - |
| tm-michelle-branch-2027-saint-louis-vv17bz_8gknw__z8 | Michelle Branch | 2027-03-19 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/michelle-branch-tickets/st-louis-missouri-the-pageant-st-louis-2027-03-19-8-pm/concert/18508843 |
| tm-tobymac-2027-saint-louis-vv1akzkf_gkdu8agp | TobyMac | 2027-03-20 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/tobymac-tickets/st-louis-missouri-chaifetz-arena-2027-03-20-7-pm/concert/18542857 |
| tm-vnv-nation-2027-los-angeles-vv170zbvgklj1kgc | VNV Nation | 2027-03-20 | Los Angeles | no_candidates_returned | - |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | Megadeth | 2027-03-23 | Forest (Brussels) | no_candidates_returned | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | Megadeth | 2027-03-25 | Düsseldorf | no_candidates_returned | - |
| tm-the-interrupters-2027-st-petersburg-vvg1vz_3xxt6_9 | The Interrupters | 2027-03-26 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/saint-petersburg-florida-jannus-live-2027-03-26-6-pm/concert/18612690 |
| tm-the-interrupters-2027-ft-lauderdale-vvg1vz_3bjcjr0 | The Interrupters | 2027-03-27 | Ft Lauderdale | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/fort-lauderdale-florida-revolution-live-2027-03-27-6-pm/concert/18612718 |
| tm-the-psychedelic-furs-2027-saint-louis-1ae7z_3gkmwkki0 | The Psychedelic Furs | 2027-03-30 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-psychedelic-furs-tickets/chesterfield-missouri-the-factory-stl-2027-03-30-7-30-pm/concert/18592655 |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | VNV Nation | 2027-03-30 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/vnv-nation-tickets/saint-paul-minnesota-amsterdam-bar-hall-1-2027-03-30-8-30-pm/concert/18357119 |
| tm-trivium-2027-glasgow-1auzkfpgken_hpc | Trivium | 2027-03-31 | Glasgow | no_candidates_returned | - |
| tm-dylan-gossett-2027-saint-louis-1ae7z_kgkyeggq8 | Dylan Gossett | 2027-03-31 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/dylan-gossett-tickets/chesterfield-missouri-the-factory-stl-2027-03-31-7-pm/concert/18642080 |
| tm-dancing-with-the-stars-2027-san-diego-vvg1iz_kxrbyxe | Dancing With The Stars | 2027-03-31 | San Diego | no_candidates_returned | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfwuei | Gavin Adcock | 2027-04-02 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/chesterfield-missouri-the-factory-stl-2027-04-02-7-30-pm/concert/18674453 |
| tm-trivium-2027-london-g5vhz_o63ceuv | Trivium | 2027-04-03 | London | no_candidates_returned | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfsjen | Gavin Adcock | 2027-04-03 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/chesterfield-missouri-the-factory-stl-2027-04-03-7-30-pm/concert/18674452 |
| tm-trivium-2027-cardiff-1kuovpa6gacrw-h | Trivium | 2027-04-04 | Cardiff | no_candidates_returned | - |
| tm-brandi-carlile-2027-dublin-1abzku4gkdpubm4 | Brandi Carlile | 2027-04-04 | Dublin | no_candidates_returned | - |
| tm-james-blunt-2027-cardiff-16dbz_8pkg7i-jy | James Blunt | 2027-04-06 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-bournemouth-16uzkf6oaza5auua | James Blunt | 2027-04-07 | Bournemouth | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-birmingham-g5dzz_kkek096 | Lizzy McAlpine | 2027-04-07 | Birmingham | no_candidates_returned | - |
| tm-teddy-swims-2027-dublin-17kzv0g626ngihj | Teddy Swims | 2027-04-08 | Dublin | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_krfm-83 | Lizzy McAlpine | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-teddy-swims-2027-dublin-17kzv0g6260hbxf | Teddy Swims | 2027-04-09 | Dublin | no_candidates_returned | - |
| tm-brandi-carlile-2027-manchester-16dbz_8qkg7xvln | Brandi Carlile | 2027-04-09 | Manchester | no_candidates_returned | - |
| tm-vnv-nation-2027-brooklyn-k7vgfbvbkdnzs | VNV Nation | 2027-04-09 | Brooklyn | no_candidates_returned | - |
| tm-josiah-queen-2027-saint-louis-vv1akzkfngkee0a6p | Josiah Queen | 2027-04-09 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/josiah-queen-tickets/st-louis-missouri-chaifetz-arena-2027-04-09-7-pm/concert/18574498 |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | Gavin Adcock | 2027-04-10 | University | city_or_metro_match_failed | https://seatgeek.com/gavin-adcock-tickets/oxford-mississippi-sjb-pavilion-at-ole-miss-2027-04-10-7-pm/concert/18122597 |
| tm-thirty-seconds-to-mars-2027-assago-zg9rmiynyzeadk | Thirty Seconds to Mars | 2027-04-11 | Assago | no_candidates_returned | - |
| tm-brandi-carlile-2027-london-16dbz_8rdg7g-dj | Brandi Carlile | 2027-04-13 | London | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | Thirty Seconds to Mars | 2027-04-14 | Vienna | no_candidates_returned | - |
| tm-the-interrupters-2027-saint-louis-vv17bz_3gkdzh1rc | The Interrupters | 2027-04-18 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-interrupters-tickets/st-louis-missouri-the-pageant-st-louis-2027-04-18-7-pm/concert/18612591 |
| tm-gracie-abrams-2027-dublin-17kzv0g65nd0zys | Gracie Abrams | 2027-04-19 | Dublin | no_candidates_returned | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65ndpfyh | Gracie Abrams | 2027-04-20 | Dublin | no_candidates_returned | - |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | Simple Minds | 2027-04-21 | Berlin | no_candidates_returned | - |
| tm-rod-stewart-2027-dublin-1kkzvpcfga1_k0w | Rod Stewart | 2027-04-23 | Dublin | no_candidates_returned | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | Lola Young | 2027-04-23 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/lola-young-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-04-23-7-30-pm/concert/18649738 |
| tm-rod-stewart-2027-dublin-1avoz_kgkw68xnf | Rod Stewart | 2027-04-24 | Dublin | no_candidates_returned | - |
| tm-earth-wind-fire-2027-savannah-vvg1zz_3cl5hyq | Earth, Wind & Fire | 2027-04-24 | Savannah | no_candidates_returned | - |
| tm-erasure-2027-bournemouth-15dbz_kx7jxjo | Erasure | 2027-04-26 | Bournemouth | no_candidates_returned | - |
| tm-sombr-2027-auckland-1ae8z_ogkmlufo4 | Sombr | 2027-04-27 | Auckland | no_candidates_returned | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | Simple Minds | 2027-04-27 | Hamburg | no_candidates_returned | - |
| tm-the-dead-south-2027-saint-louis-16e7z_pf4g7neqx | The Dead South | 2027-04-27 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/the-dead-south-tickets/chesterfield-missouri-the-factory-stl-2027-04-27-7-30-pm/concert/18754885 |
| tm-the-dead-south-2027-kansas-city-vv1akzk40gkemk2eh | The Dead South | 2027-04-28 | Kansas City | no_candidates_returned | - |
| tm-erasure-2027-birmingham-1anzkfzgkdmiv17 | Erasure | 2027-04-30 | Birmingham | no_candidates_returned | - |
| tm-erasure-2027-manchester-g5vhz_k6qxkzy | Erasure | 2027-05-01 | Manchester | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-dublin-1abzk36gkeuawhf | Thirty Seconds to Mars | 2027-05-01 | Dublin | no_candidates_returned | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | Simple Minds | 2027-05-01 | Amsterdam | no_candidates_returned | - |
| tm-earth-wind-fire-2027-durham-g5evz_f5p7r9- | Earth, Wind & Fire | 2027-05-01 | Durham | no_candidates_returned | - |
| tm-two-friends-2027-saint-louis-1a-zk4pgkdsvsmy | Two Friends | 2027-05-05 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/two-friends-tickets/chesterfield-missouri-the-factory-stl-2027-05-05-7-30-pm/concert/18757696 |
| tm-erasure-2027-hull-1auzkfygkey3bob | Erasure | 2027-05-06 | Hull | no_candidates_returned | - |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | Hilary Duff | 2027-05-07 | Madrid | no_candidates_returned | - |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | Sombr | 2027-05-08 | Fornebu | no_candidates_returned | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | Two Door Cinema Club | 2027-05-09 | St. Paul | city_or_metro_match_failed | https://seatgeek.com/two-door-cinema-club-tickets/minneapolis-minnesota-palace-theatre-st-paul-2027-05-09-7-30-pm/concert/18711330 |
| tm-erasure-2027-london-1agzkfmgkdxoix5 | Erasure | 2027-05-12 | London | no_candidates_returned | - |
| tm-u2-2027-barcelona-z698xz2qz1kkzqe8t | U2 | 2027-05-15 | Barcelona | no_candidates_returned | - |
| tm-kenny-chesney-2027-saint-louis-vv1kvovpfigaupvvy | Kenny Chesney | 2027-05-15 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/kenny-chesney-tickets/st-louis-missouri-the-dome-at-america-s-center-2027-05-15-4-30-pm/concert/18591991 |
| tm-lizzy-mcalpine-2027-saint-louis-vv1kvovpu_ga2r6bf | Lizzy McAlpine | 2027-05-15 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/lizzy-mcalpine-tickets/st-louis-missouri-stifel-theatre-2027-05-15-7-pm/concert/18619431 |
| tm-simple-minds-2027-dublin-1kkzvpk_ga2vkuc | Simple Minds | 2027-05-17 | Dublin | no_candidates_returned | - |
| tm-a-perfect-circle-2027-saint-louis-vv1akzkfugkdepcmi | A Perfect Circle | 2027-05-17 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/a-perfect-circle-tickets/st-louis-missouri-chaifetz-arena-2027-05-17-7-pm/concert/18632532 |
| tm-rod-stewart-2027-glasgow-1adbz_4gkmvnhoa | Rod Stewart | 2027-05-18 | Glasgow | no_candidates_returned | - |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | Greta Van Fleet | 2027-05-18 | Hamburg | no_candidates_returned | - |
| tm-weezer-2027-birmingham-1anzkf7gkdaoymm | Weezer | 2027-05-21 | Birmingham | no_candidates_returned | - |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | Greta Van Fleet | 2027-05-21 | Berlin | no_candidates_returned | - |
| tm-blondshell-2027-saint-louis-vv1kbz_kjdg7cpvx | Blondshell | 2027-05-22 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/blondshell-tickets/st-louis-missouri-delmar-hall-2027-05-22-8-pm/concert/18633511 |
| tm-weezer-2027-cardiff-1auzkf7gkevbx3b | Weezer | 2027-05-23 | Cardiff | no_candidates_returned | - |
| tm-fall-out-boy-2027-madrid-z698xz2qz1k83o_fe | Fall Out Boy | 2027-05-23 | Madrid | no_candidates_returned | - |
| tm-nickelback-2027-london-1agzk46gkddli7z | Nickelback | 2027-05-24 | London | no_candidates_returned | - |
| tm-megadeth-2027-west-valley-city-g5vzz_pjgpffk | Megadeth | 2027-05-24 | West Valley City | city_or_metro_match_failed | https://seatgeek.com/megadeth-tickets/salt-lake-city-utah-utah-first-credit-union-amphitheatre-2027-05-24-7-pm/concert/18778370 |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | Greta Van Fleet | 2027-05-25 | Forest (Brussels) | no_candidates_returned | - |
| tm-tom-jones-2027-cardiff-g5vhz_4wcs0vc | Tom Jones | 2027-05-30 | Cardiff | no_candidates_returned | - |
| tm-nickelback-2027-dublin-1abzkfmgkepnjt6 | Nickelback | 2027-05-30 | Dublin | no_candidates_returned | - |
| tm-fall-out-boy-2027-dublin-1abzk4xgkdbhdty | Fall Out Boy | 2027-06-01 | Dublin | no_candidates_returned | - |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | Rod Stewart | 2027-06-01 | Berlin | no_candidates_returned | - |
| tm-greta-van-fleet-2027-dublin-1abzkfmgkes3wyd | Greta Van Fleet | 2027-06-04 | Dublin | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp | KPop Demon Hunters | 2027-06-05 | Baltimore | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/baltimore-maryland-cfg-bank-arena-2027-06-05-2-pm/concert/18772669 |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | The Airborne Toxic Event | 2027-06-08 | Englewood | no_candidates_returned | - |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | 2027-06-10 | Cardiff | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1kvovpq_ga29ugj | Billy Strings | 2027-06-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-10-7-30-pm/concert/18755202 |
| tm-leon-bridges-2027-manchester-1adbz_pgkmxxe4x | Leon Bridges | 2027-06-11 | Manchester | no_candidates_returned | - |
| tm-billy-strings-2027-saint-louis-vv1akzk4tgkdq3l2w | Billy Strings | 2027-06-11 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/billy-strings-tickets/st-louis-missouri-chaifetz-arena-2027-06-11-7-30-pm/concert/18755210 |
| tm-sam-fender-2027-cardiff-1adfz_4gklat6o4 | Sam Fender | 2027-06-12 | Cardiff | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp | KPop Demon Hunters | 2027-06-12 | Newark | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-12-2-pm/concert/18772667 |
| tm-sienna-spiro-2027-dublin-17kzv0g6gpq41un | Sienna Spiro | 2027-06-15 | Dublin | no_candidates_returned | - |
| tm-james-blunt-2027-lincoln-g5vhz_on_qxm9 | James Blunt | 2027-06-16 | Lincoln | no_candidates_returned | - |
| tm-shania-twain-2027-scarborough-1agzkfugkdob_wu | Shania Twain | 2027-06-16 | Scarborough | no_candidates_returned | - |
| tm-sienna-spiro-2027-dublin-1avoz_4gkuvegeh | Sienna Spiro | 2027-06-16 | Dublin | no_candidates_returned | - |
| tm-sombr-2027-belfast-16doz_oxfg7tv55 | Sombr | 2027-06-17 | Belfast | no_candidates_returned | - |
| tm-james-blunt-2027-thetford-1adjz_pgkw4p4i3 | James Blunt | 2027-06-18 | Thetford | no_candidates_returned | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | Kings Of Leon | 2027-06-18 | Hamburg | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy | KPop Demon Hunters | 2027-06-19 | Chicago | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-19-2-pm/concert/18772670 |
| tm-alex-warren-2027-cardiff-g5vhz_3c3nozb | Alex Warren | 2027-06-20 | Cardiff | no_candidates_returned | - |
| tm-james-blunt-2027-scarborough-1ku8vp1_ga1cs0u | James Blunt | 2027-06-20 | Scarborough | no_candidates_returned | - |
| tm-alex-warren-2027-belfast-16doz_3cdg7z8me | Alex Warren | 2027-06-21 | Belfast | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2027-valencia-z698xz2qz16vfzvzrf | Queens Of The Stone Age | 2027-06-21 | Valencia | no_candidates_returned | - |
| tm-shania-twain-2027-cardiff-g5vhz_kljqj-d | Shania Twain | 2027-06-22 | Cardiff | no_candidates_returned | - |
| tm-tom-jones-2027-lincoln-g5vhz_4w3ae65 | Tom Jones | 2027-06-23 | Lincoln | no_candidates_returned | - |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | 2027-06-23 | Glasgow | no_candidates_returned | - |
| tm-shania-twain-2027-exeter-g5vhz_kjtg0ag | Shania Twain | 2027-06-24 | Exeter | no_candidates_returned | - |
| tm-alex-warren-2027-glasgow-1auzkf_gkemjhov | Alex Warren | 2027-06-25 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | Nickelback | 2027-06-25 | Vienna | no_candidates_returned | - |
| tm-alex-warren-2027-exeter-g5vhz_3je-wlb | Alex Warren | 2027-06-26 | Exeter | no_candidates_returned | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | Nickelback | 2027-06-26 | Praha 9 | no_candidates_returned | - |
| tm-sting-2027-fulda-z698xzc2z16v1vjxok | Sting | 2027-06-26 | Fulda | no_candidates_returned | - |
| tm-mariah-carey-2027-exeter-g5vhz_f0acb90 | Mariah Carey | 2027-06-27 | Exeter | no_candidates_returned | - |
| tm-kings-of-leon-2027-scarborough-1agzk4fgke0iell | Kings Of Leon | 2027-06-27 | Scarborough | no_candidates_returned | - |
| tm-shania-twain-2027-belfast-1adoz_4gksdrodo | Shania Twain | 2027-06-27 | Belfast | no_candidates_returned | - |
| tm-mariah-carey-2027-cardiff-g5vhz_feidjq8 | Mariah Carey | 2027-06-29 | Cardiff | no_candidates_returned | - |
| tm-shania-twain-2027-woodstock-1amzk4agkdk2pnt | Shania Twain | 2027-06-29 | Woodstock | no_candidates_returned | - |
| tm-sombr-2027-london-1adfz_ogkwwynfm | Sombr | 2027-06-29 | London | no_candidates_returned | - |
| tm-bryan-adams-2027-fulda-z698xzc2z1k86g-_z | Bryan Adams | 2027-06-29 | Fulda | no_candidates_returned | - |
| tm-tom-jones-2027-woodstock-1amzk4tgketwvu7 | Tom Jones | 2027-06-30 | Woodstock | no_candidates_returned | - |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | 2027-06-30 | Cardiff | no_candidates_returned | - |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | Nickelback | 2027-07-01 | Łódź | no_candidates_returned | - |
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | Noah Kahan | 2027-07-02 | Berlin | no_candidates_returned | - |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | Simply Red | 2027-07-02 | Aurich | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s | KPop Demon Hunters | 2027-07-03 | Pittsburgh | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-07-03-2-pm/concert/18772685 |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | Noah Kahan | 2027-07-07 | Sevilla | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | 2027-07-08 | Edinburgh | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Hard Rock Hotel & Casino Ottawa | Hard Rock Cafe | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | Hard Rock Hotel & Casino Ottawa | Hard Rock Cafe | https://seatgeek.com/theory-of-a-deadman-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-11-7-pm/concert/18570538 |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/chris-tomlin-tickets/daytona-beach-florida-peabody-auditorium-2026-12-02-7-pm/concert/18549313 |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Cascade Theater | Cascade Theatre - Redding | https://seatgeek.com/pink-martini-tickets/redding-california-cascade-theatre-redding-2026-12-04-7-30-pm/concert/18690405 |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/blue-october-tickets/oklahoma-city-oklahoma-the-criterion-okc-2026-12-06-8-pm/concert/18143446 |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/air-supply-tickets/daytona-beach-florida-peabody-auditorium-2027-01-22-8-pm/concert/18355671 |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | Seminole Center | Seminole Casino Immokalee | https://seatgeek.com/air-supply-tickets/immokalee-florida-seminole-casino-immokalee-2027-01-30-8-pm/concert/18424504 |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | The Eastern-GA | The Eastern - Atlanta | https://seatgeek.com/chelsea-cutler-tickets/atlanta-georgia-the-eastern-atlanta-2027-01-30-3-30-am/concert/18639169 |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Memorial Hall - OH | Anderson Theater At Cincinnati Memorial Hall | https://seatgeek.com/pink-martini-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-02-11-8-pm/concert/18321561 |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/pink-martini-tickets/madison-wisconsin-orpheum-theatre-madison-2027-02-16-7-30-pm/concert/18472447 |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Midway Music Hall | Midway - Edmonton | https://seatgeek.com/valley-tickets/edmonton-canada-midway-edmonton-2027-02-19-6-30-pm/concert/18606369 |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Bogart's | Bogarts - Cincinnati | https://seatgeek.com/dinosaur-jr-tickets/cincinnati-ohio-bogarts-cincinnati-2027-02-27-7-pm/concert/18540446 |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Hutchins Concert Hall | Collins Center for the Arts | https://seatgeek.com/daughtry-tickets/orono-maine-collins-center-for-the-arts-2027-03-01-7-pm/concert/18632934 |
| tm-valley-2027-denver-z7r9jz1aavzfu | Bluebird Theatre | Bluebird Theater - Denver | https://seatgeek.com/valley-tickets/denver-colorado-bluebird-theater-denver-2027-03-06-9-pm/concert/18683979 |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Bogart's | Bogarts - Cincinnati | https://seatgeek.com/mico-tickets/cincinnati-ohio-bogarts-cincinnati-2027-03-12-7-pm/concert/18666222 |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | Cascade Theater | Cascade Theatre - Redding | https://seatgeek.com/grace-potter-the-nocturnals-tickets/redding-california-cascade-theatre-redding-2027-03-14-7-30-pm/concert/18755563 |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | Oriental Theatre-CO | The Oriental Theater | https://seatgeek.com/vnv-nation-tickets/denver-colorado-the-oriental-theater-2027-03-27-8-pm/concert/18669971 |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/melissa-etheridge-tickets/madison-wisconsin-orpheum-theatre-madison-2027-04-03-8-pm/concert/18754496 |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Memorial Hall - OH | Anderson Theater At Cincinnati Memorial Hall | https://seatgeek.com/foy-vance-tickets/cincinnati-ohio-anderson-theater-at-cincinnati-memorial-hall-2027-04-12-7-pm/concert/18085807 |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/the-warning-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-01-7-pm/concert/18593400 |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/meshuggah-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-02-7-pm/concert/18724686 |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Bluebird Theatre | Bluebird Theater - Denver | https://seatgeek.com/mei-semones-tickets/denver-colorado-bluebird-theater-denver-2027-05-02-8-pm/concert/18793886 |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Thelma Gaylord Performing Arts Theatre | Thelma Gaylord PAT At Civic Center Music Hall | https://seatgeek.com/lizzy-mcalpine-tickets/oklahoma-city-oklahoma-thelma-gaylord-pat-at-civic-center-music-hall-2027-05-18-7-pm/concert/18619437 |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Criterion Theater - Oklahoma City | The Criterion - OKC | https://seatgeek.com/dylan-gossett-tickets/oklahoma-city-oklahoma-the-criterion-okc-2027-05-20-7-pm/concert/18642116 |

## Conflicts found

- tm-kpop-demon-hunters-2027-hamilton-1avzz_pgknnsz0d (KPop Demon Hunters, 2027-06-26, Hamilton)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/hamilton-canada-td-coliseum-2027-06-26-7-30-pm/concert/18772681
- tm-billy-strings-2027-asheville-g5evz_omwlg3b (Billy Strings, 2027-02-04, Asheville)
  - 100: https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-04-7-30-pm/concert/18540080
- tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr (Gary Allan, 2027-03-13, Peoria)
  - 100: https://seatgeek.com/gary-allan-tickets/peoria-illinois-prairie-home-alliance-theater-at-peoria-civic-center-2027-03-13-8-pm/concert/18561304
- tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp (KPop Demon Hunters, 2027-06-05, Baltimore)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/baltimore-maryland-cfg-bank-arena-2027-06-05-7-30-pm/concert/18772666
- tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp (KPop Demon Hunters, 2027-06-12, Newark)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-12-7-30-pm/concert/18772724
- tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy (KPop Demon Hunters, 2027-06-19, Chicago)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-19-7-30-pm/concert/18772678
- tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s (KPop Demon Hunters, 2027-07-03, Pittsburgh)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-07-03-7-30-pm/concert/18772686

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

| showId | artist | datetime_iso | reason | detail |
| --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | morgan-wallen | 2026-05-08T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | morgan-wallen | 2026-05-09T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbf | morgan-wallen | 2026-07-25T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morgan-wallen-2026-philadelphia-0200635dc72ec234 | morgan-wallen | 2026-07-31T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504538196 | harry-styles | 2026-08-29T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504b581eb | harry-styles | 2026-09-10T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643504d78209 | harry-styles | 2026-09-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505018228 | harry-styles | 2026-09-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505768283 | harry-styles | 2026-10-01T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b006435059882a6 | harry-styles | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643505b782ca | harry-styles | 2026-10-10T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b00643506808378 | harry-styles | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-new-york-3b006435069e8398 | harry-styles | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-foxborough-0100642cc24ebb04 | bts | 2026-08-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-chicago-0400642acc7e5d9b | bts | 2026-08-29T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-inglewood-0a006429b353645f | bts | 2026-09-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | ariana-grande | 2026-07-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f34a4abb | ariana-grande | 2026-07-13T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006319f41b4abf | ariana-grande | 2026-07-16T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-brooklyn-30006325205054e3 | ariana-grande | 2026-07-19T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-0100631aaef23ee8 | ariana-grande | 2026-07-23T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-0100631aca626435 | ariana-grande | 2026-07-26T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-boston-010063289ef611c4 | ariana-grande | 2026-07-25T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-montreal-31006319ddb22b1f | ariana-grande | 2026-07-28T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-montreal-31006319dedc2b4c | ariana-grande | 2026-07-31T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-chicago-04006319ddea2cd5 | ariana-grande | 2026-08-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-chicago-04006325ad9f24a7 | ariana-grande | 2026-08-06T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c8ea13055 | ariana-grande | 2026-08-15T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c937630fa | ariana-grande | 2026-08-16T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c950d310b | ariana-grande | 2026-08-19T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c97193144 | ariana-grande | 2026-08-20T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-3500631c98a031b3 | ariana-grande | 2026-08-23T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4e94ebb | ariana-grande | 2026-08-24T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | ariana-grande | 2026-08-27T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f5075024 | ariana-grande | 2026-08-28T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | ariana-grande | 2026-08-31T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-london-35006324f50f50d8 | ariana-grande | 2026-09-01T18:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-barcelona-653666176 | bad-bunny | 2026-05-22T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-barcelona-1116290311 | bad-bunny | 2026-05-23T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-417009905 | bad-bunny | 2026-05-30T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1848567714 | bad-bunny | 2026-05-31T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1589736692 | bad-bunny | 2026-06-02T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-961888291 | bad-bunny | 2026-06-03T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1852247887 | bad-bunny | 2026-06-06T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1341715816 | bad-bunny | 2026-06-07T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-412370092 | bad-bunny | 2026-06-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-2035589996 | bad-bunny | 2026-06-11T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1378879656 | bad-bunny | 2026-06-14T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-madrid-1566404077 | bad-bunny | 2026-06-15T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | bad-bunny | 2026-06-20T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-d-sseldorf-653946928 | bad-bunny | 2026-06-21T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-arnhem-1578299680 | bad-bunny | 2026-06-23T19:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-arnhem-2018685385 | bad-bunny | 2026-06-24T19:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-london-3500629efc0c8bc1 | bad-bunny | 2026-06-27T17:30:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-london-350062a39074101f | bad-bunny | 2026-06-28T17:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-stockholm-625835491 | bad-bunny | 2026-07-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-stockholm-734104140 | bad-bunny | 2026-07-11T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-warsaw-1844913130 | bad-bunny | 2026-07-14T17:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html | bad-bunny | 2026-07-17T20:45:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-18-luglio-2026-ippodromo-snai-la-maura-milano-13408.html | bad-bunny | 2026-07-18T20:45:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-brussels-1117180915 | bad-bunny | 2026-07-22T00:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-bronx-1d006473d78cfdb8 | jay-z | 2026-07-10T20:00:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a706ep | olivia-rodrigo | 2026-09-25T19:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a70677 | olivia-rodrigo | 2026-09-26T19:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-pittsburgh-1avbz_agkm9wrr7 | olivia-rodrigo | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-washington-1ka8v0pdgacx387 | olivia-rodrigo | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-boston-vv177z_agkv-whjn | olivia-rodrigo | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-columbus-vv1aazkcfgkdl2qzg | bruno-mars | 2026-05-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkev_6oa | bruno-mars | 2026-05-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevq6og | bruno-mars | 2026-05-24T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevqmo2 | bruno-mars | 2026-05-27T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevhmob | bruno-mars | 2026-05-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-168zk8yb-za2d6ed | bruno-mars | 2026-05-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_k | bruno-mars | 2026-06-18 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_6 | bruno-mars | 2026-06-20 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_f | bruno-mars | 2026-06-21 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_k | bruno-mars | 2026-06-26T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_f | bruno-mars | 2026-06-28T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_4 | bruno-mars | 2026-06-29T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vg6pypf | bruno-mars | 2026-07-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16v3zapgk | bruno-mars | 2026-07-04T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz1kbsa6fz | bruno-mars | 2026-07-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vvoue3b | bruno-mars | 2026-07-07T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1kutpbz7 | bruno-mars | 2026-07-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1koyq7f6 | bruno-mars | 2026-07-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_x | bruno-mars | 2026-07-14T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_n | bruno-mars | 2026-07-15T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1aegzbzgksgzoma | bruno-mars | 2026-07-18T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdftyue | bruno-mars | 2026-07-19T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkduy8wh | bruno-mars | 2026-07-22T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdmnywe | bruno-mars | 2026-07-24T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdzq8wy | bruno-mars | 2026-07-25T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdbd8xc | bruno-mars | 2026-07-28T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydo-qcd | bruno-mars | 2026-08-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydoxccx | bruno-mars | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-foxborough-vv1avzk8igkdnsgxb | bruno-mars | 2026-09-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-indianapolis-vv17fzbygklnuhph | bruno-mars | 2026-09-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-tampa-vvg1vz_e944pwc | bruno-mars | 2026-09-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7ox8i | bruno-mars | 2026-09-27T19:00:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_a6pmg6f | bruno-mars | 2026-10-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1izbyhid9od | bruno-mars | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_ehecvin | bruno-mars | 2026-10-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-vancouver-1av7z_egkshmjia | bruno-mars | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-vancouver-1av7z_egkwimwwb | bruno-mars | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-boston-vv1avzkosgkdb5unc | shakira | 2026-07-11T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-atlantic-city-vv17fz_6gkb5efrp | shakira | 2026-07-26T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1k7eo4av | shakira | 2026-09-18T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vas39ay | shakira | 2026-09-19T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vrkvz38 | shakira | 2026-09-20T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v_oqxoe | shakira | 2026-09-25T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vowff-f | shakira | 2026-09-26T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1konkpax | shakira | 2026-09-27T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1kbi4uav | shakira | 2026-10-02T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v4mzjas | shakira | 2026-10-03T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16v73axp9 | shakira | 2026-10-04T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1koifuzg | shakira | 2026-10-09T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz1koecouy | shakira | 2026-10-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16vfpafo8 | shakira | 2026-10-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-santa-clara-1c006331c1a54d19 | ed-sheeran | 2026-07-26T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-toronto-1000632fe9ca4361 | ed-sheeran | 2026-08-22T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-atlanta-0e00632fc0572cc1 | ed-sheeran | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-charlotte-2d006331aac349eb | ed-sheeran | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-atlanta-vvg1zz_dkce1ug | summer-walker | 2026-06-12T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-miami-vvg1vz_d3n-985 | summer-walker | 2026-06-14T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-london-1agzk8mgkdnfpsx | summer-walker | 2026-08-01T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-london-1agzk8ugkeefegp | summer-walker | 2026-08-02T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkuqz8x- | harry-styles | 2026-06-19T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkusb-e- | harry-styles | 2026-06-20T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkug9sdf | harry-styles | 2026-06-23T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmuro6v | harry-styles | 2026-06-26T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmcbo6q | harry-styles | 2026-06-27T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkm2xs6r | harry-styles | 2026-06-29T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmkmofc | harry-styles | 2026-07-01T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkmfmsfv | harry-styles | 2026-07-03T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-harry-styles-2026-london-1aegz_egkm4csfw | harry-styles | 2026-07-04T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-madrid-z698xz2qz16ezdbsgk | bts | 2026-06-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-madrid-z698xz2qz16ez94-rv | bts | 2026-06-27T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-munich-z698xzc2z1konbaqf | bts | 2026-07-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-munich-z698xzc2z1kfj7mgy | bts | 2026-07-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-arlington-z7r9jz1a7ooui | bts | 2026-08-15T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-arlington-z7r9jz1a7oout | bts | 2026-08-16T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-toronto-1avzz_egkiiidcu | bts | 2026-08-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoav | ariana-grande | 2026-06-30T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoaz | ariana-grande | 2026-07-02T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7j6op | ariana-grande | 2026-07-03T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-marseille-z7r9jz1a7baxb | bad-bunny | 2026-07-01T20:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-inglewood-vvg1iz_gncu5jv | jay-z | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lhqy5 | charli-xcx | 2026-09-15T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-toronto-177zv0g6gkluljm | charli-xcx | 2026-09-21T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-boston-vvg17z_gpmbifj | charli-xcx | 2026-09-25T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-atlanta-vvg1zz_g99-nfd | charli-xcx | 2026-10-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-inglewood-vvg10z_g9r7nph | charli-xcx | 2026-10-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-glendale-17k8v0g6g9pu_yt | charli-xcx | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-houston-z7r9jz1a7oixf | summer-walker | 2026-06-21T19:30:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-chicago-vv178zbugkmzvbum | rosalia | 2026-06-21T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-houston-z7r9jz1a7oz43 | rosalia | 2026-06-23T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv170zbugkd8gp9v | rosalia | 2026-06-30T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv1k0zbzfzg7tulc | rosalia | 2026-07-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-san-diego-vvg1izbuda5f5g | rosalia | 2026-07-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-bristow-17a8v0g6urtwfpk | summer-walker | 2026-09-19T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cksbad4 | jay-z | 2026-09-04T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | 2026-07-22T00:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-kansas-city-vv17bz_dgkhumcmx | post-malone | 2026-07-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-ames-vv17bz_dgkbv6aim | post-malone | 2026-07-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-edmonton-1av7z_dgkdhlsdx | post-malone | 2026-07-25T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-edmonton-1aozkodgkd2xd4i | post-malone | 2026-07-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-post-malone-2026-salt-lake-city-g5vzz_dbvwfnk | post-malone | 2026-07-29T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-eugene-vvg1hzbz5kbt3x | zach-bryan | 2026-07-26T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-san-diego-vvg1izbuhfiera | zach-bryan | 2026-08-01T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-san-diego-vvg1izbunnre2z | zach-bryan | 2026-08-02T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-salt-lake-city-g5vzzbm2nlqmp | zach-bryan | 2026-08-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-denver-g5vzzbm515_rn | zach-bryan | 2026-08-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-denver-g5vzzbm51uyri | zach-bryan | 2026-08-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | 2026-08-22T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | 2026-09-05T19:00:00-07:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | 2026-09-18T15:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | 2026-09-19T15:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-toronto-1a8zkcegkegri4f | zach-bryan | 2026-09-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-toronto-1a8zkcegkeuxbbr | zach-bryan | 2026-09-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv1avzkupgkeoeq1t | zach-bryan | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv16vzkuso6za26afg | zach-bryan | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-auburn-university-z7r9jz1a7r4ev | zach-bryan | 2026-10-10T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | 2026-07-30T17:30:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-1a8zk8ygkeelgsk | tame-impala | 2026-07-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-168zk8uopzackd28 | tame-impala | 2026-07-26T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzk8ygkdxncl3 | tame-impala | 2026-07-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzko7gkd9ltgz | tame-impala | 2026-07-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_dq4fyz7 | tame-impala | 2026-08-01T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_7stecj- | tame-impala | 2026-08-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7ksioai | tame-impala | 2026-08-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7s7cobq | tame-impala | 2026-08-06T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-columbus-vv1aazk8ugkebkhue | tame-impala | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | 2026-08-28T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6os55n | tame-impala | 2026-09-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6ov55i | tame-impala | 2026-09-03T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkd-fy4x | tame-impala | 2026-09-06T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkdlltoy | tame-impala | 2026-09-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-portland-vvg1hz_dmh0iyk | tame-impala | 2026-09-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-denver-g5vzz_dkexywp | tame-impala | 2026-09-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-phoenix-1a_zk8ggkdiaazn | tame-impala | 2026-09-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-dallas-vvg1yz_dkfcyvg | tame-impala | 2026-09-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | 2026-09-19T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | 2026-09-20T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cxpcqan | jay-z | 2026-09-05T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-birmingham-1anzkoygkdrzveg | niall-horan | 2026-09-22T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-newcastle-upon-tyne-g5vhz_6jezgkf | niall-horan | 2026-09-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-manchester-1amzkozgkdqek4f | niall-horan | 2026-09-25T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-glasgow-1auzkozgkeyxugy | niall-horan | 2026-09-28T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-sheffield-16gzkozpuza5kedv | niall-horan | 2026-09-29T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdkpykl | niall-horan | 2026-10-02T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdvbgdi | niall-horan | 2026-10-03T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | 2026-10-25T20:15:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-assago-zg9rmiynyzedfa | niall-horan | 2026-10-28T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-casalecchio-di-reno-bologna-zg9rmiynyzedff | niall-horan | 2026-10-29T19:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | 2026-10-31T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-krakow-z698xzqpz1kq7zp-- | niall-horan | 2026-11-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-merksem-antwerpen-z698xzg2z1k1kb9e_ | niall-horan | 2026-11-05T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-detroit-vv17ozbsgki0b7ti | doja-cat | 2026-10-01T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-chicago-vv178zbsgknyfves | doja-cat | 2026-10-04T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-minneapolis-vv17bzbsgknj3vy9 | doja-cat | 2026-10-05T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-kansas-city-vv17bzbsgkwntdvb | doja-cat | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-denver-g5vzzbsefo0an | doja-cat | 2026-10-09T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-west-valley-city-g5vzzbslbgavf | doja-cat | 2026-10-11T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-vancouver-1aozkgygkdosigy | doja-cat | 2026-10-14T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-seattle-vvg1hzbslq8got | doja-cat | 2026-10-16T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-portland-vvg1hzbsnaneis | doja-cat | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-sacramento-g5vyzbsnj9ve1 | doja-cat | 2026-10-21T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-austin-g5dizbsl2m6xd | doja-cat | 2026-11-04T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-dallas-vvg1yzbstqyohd | doja-cat | 2026-11-05T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-san-antonio-g5dizbsnv5jt4 | doja-cat | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-orlando-1aefzbsgklnlnmt | doja-cat | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-atlanta-vvg1zzbsle3ugd | doja-cat | 2026-11-18T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-vancouver-1aozk3agkddnbd1 | sombr | 2026-09-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-seattle-vvg1hz_feci1ir | sombr | 2026-10-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-portland-vvg1hz_fljtdxu | sombr | 2026-10-03T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-sacramento-g5vyz_fli21bj | sombr | 2026-10-07T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-san-jose-g5vyz_fljzy-y | sombr | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-anaheim-vv1fe8v0xoqvz7u1ue | sombr | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-inglewood-vv16azk3azmzauak1v | sombr | 2026-10-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | 2026-10-17T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-dallas-vvg1yz_fn5kifv | sombr | 2026-10-19T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-austin-g5diz_fem5b0f | sombr | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-orlando-1aefz_fgkn1mew3 | sombr | 2026-10-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-chicago-vv1a7zk36gkd2hi7b | sombr | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-detroit-vv1afzk3fgkeg5jlz | sombr | 2026-11-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | 2026-11-13T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-buffalo-k7v17_f0kg7ij1e | sombr | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | 2026-07-30T22:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | 2026-10-01T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-montreal-17g8v0g652qqblc | john-summit | 2026-10-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-washington-1avfz_agklgjntv | john-summit | 2026-10-31T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | 2026-11-05T19:00:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-austin-g5diz_52qgtuz | john-summit | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-fort-worth-vvg1yz_522ahqk | john-summit | 2026-11-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-fort-worth-vvg1yz_53r5bha | john-summit | 2026-11-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-charlotte-g5evz_52qpkue | john-summit | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | 2026-08-22T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | 2026-08-23T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-santa-clara-g5vyz_anmpkqv | karol-g | 2026-08-23T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-seattle-vvg1hz_a1yzbuj | karol-g | 2026-08-27T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-san-antonio-g5diz_ak3mivp | karol-g | 2026-09-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-el-paso-vvg1yz_an5e3ov | karol-g | 2026-09-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-el-paso-vvg1yz_akoajis | karol-g | 2026-09-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-foxborough-vv1avzk3ogkebubpy | karol-g | 2026-09-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-east-rutherford-k7vgf_a6cy2uc | karol-g | 2026-09-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-east-rutherford-k7vgf_anrle2y | karol-g | 2026-09-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-atlanta-vvg1zz_ag0kdf4 | karol-g | 2026-09-24T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-houston-g5diz_akcfr2w | karol-g | 2026-09-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-miami-vvg1vz_a38lpr5 | karol-g | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-miami-vvg1vz_afezyvt | karol-g | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-tampa-vvg1vz_aksr-m3 | karol-g | 2026-10-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-fargo-vv1akzkukgkdkifv9 | foo-fighters | 2026-09-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-regina-1aozku4gkeb8mgg | foo-fighters | 2026-09-15T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-edmonton-1k78vn4_gaujue7 | foo-fighters | 2026-09-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-vancouver-1aozku4gkewuexj | foo-fighters | 2026-09-21T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-las-vegas-1a9zkufgkd3cmyl | foo-fighters | 2026-09-27T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foo-fighters-2026-uncasville-g5vvz_unjqq1q | foo-fighters | 2026-10-04T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-minneapolis-vv1kvovngegageom5 | my-chemical-romance | 2026-08-25T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-denver-g5vzzbwncbsnm | my-chemical-romance | 2026-08-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-san-diego-vvg1izbwykcki4 | my-chemical-romance | 2026-08-31T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-phoenix-1a_zkgygkd3ywvj | my-chemical-romance | 2026-09-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-san-antonio-g5dizbsd0c4y6 | my-chemical-romance | 2026-09-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55mdjk | my-chemical-romance | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55msjp | my-chemical-romance | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55znjb | my-chemical-romance | 2026-10-25T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55ykjr | my-chemical-romance | 2026-10-31T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55bdjv | my-chemical-romance | 2026-11-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | 2026-11-10T12:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | 2026-09-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-saint-louis-vv17bz_fgkuhx1g- | teddy-swims | 2026-09-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-chicago-vv178z_fgkuxeurm | teddy-swims | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-detroit-vv17oz_fgktec1td | teddy-swims | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-columbus-vv17fz_fgkdx0-pn | teddy-swims | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-brooklyn-1adzz_fgknbfkoe | teddy-swims | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-toronto-1avzz_fgku3eucw | teddy-swims | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-montreal-1ad7z_fgkm9lfwl | teddy-swims | 2026-10-07T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-boston-vv177z_fgktnmxtd | teddy-swims | 2026-10-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-philadelphia-1adzz_fgkm5wpjt | teddy-swims | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-washington-16vfz_f0sg7tpdk | teddy-swims | 2026-10-13T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-nashville-g5viz_fxfo1dj | teddy-swims | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-charlotte-g5evz_fumjscw | teddy-swims | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-atlanta-vvg1zz_fuw3nll | teddy-swims | 2026-10-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-tampa-vvg1vz_fdr-qk6 | teddy-swims | 2026-10-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | 2026-10-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-denver-g5vzz_fuokkc4 | teddy-swims | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-seattle-vvg1hz_fujpiyp | teddy-swims | 2026-11-06T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-vancouver-1av7z_fgkbd-_xv | teddy-swims | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-san-francisco-g5vyz_fnhi2ez | teddy-swims | 2026-11-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-inglewood-vv170z_fgkmxw1os | teddy-swims | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-auburn-vvg1hz_eppsgpt | five-finger-death-punch | 2026-09-12T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-ridgefield-vvg1hz_eq8bvhx | five-finger-death-punch | 2026-09-13T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-wheatland-g5vyz_eps2iri | five-finger-death-punch | 2026-09-15T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-mountain-view-g5vyz_epluiuh | five-finger-death-punch | 2026-09-17T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-long-beach-vvg1iz_els87ti | five-finger-death-punch | 2026-09-19T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-west-valley-city-g5vzz_e9-5mgw | five-finger-death-punch | 2026-09-23T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-phoenix-1kk8v0atga5offo | five-finger-death-punch | 2026-09-25T01:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-albuquerque-g5vzz_er_rgel | five-finger-death-punch | 2026-09-26T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-the-woodlands-g5diz_eelg5kq | five-finger-death-punch | 2026-09-27T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-austin-g5diz_eqgevgg | five-finger-death-punch | 2026-09-28T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-fort-worth-vvg1yz_ehes4-b | five-finger-death-punch | 2026-09-30T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-rogers-g5viz_eq6la31 | five-finger-death-punch | 2026-10-02T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-kansas-city-1a-zk8pgkdxix7u | five-finger-death-punch | 2026-10-03T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-biloxi-g5viz_exc4n-g | five-finger-death-punch | 2026-10-05T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-franklin-g5viz_eqoip4h | five-finger-death-punch | 2026-10-08T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-tampa-vvg1vz_eqhp7qi | five-finger-death-punch | 2026-10-10T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-west-palm-beach-vvg1vz_eqw6abn | five-finger-death-punch | 2026-10-11T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-alpharetta-vvg1zz_eq2kn-d | five-finger-death-punch | 2026-10-13T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-raleigh-g5evz_ejp-tdn | five-finger-death-punch | 2026-10-14T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-charlotte-g5evz_eqi_eoi | five-finger-death-punch | 2026-10-16T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-virginia-beach-vv1k7z_eqfg7mvxk | five-finger-death-punch | 2026-10-17T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-greenville-g5evz_excrbbp | five-finger-death-punch | 2026-10-19T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-columbus-vv1aazk8egkdlofxu | five-finger-death-punch | 2026-10-21T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-bristow-1avfz_egki4tnxq | five-finger-death-punch | 2026-10-23T22:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-reading-vvg1fz_1dkrsjw | don-omar | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-boston-vvg17z_1wjhcnw | don-omar | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | 2026-09-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-dallas-vvg1yz_1d_hllv | don-omar | 2026-10-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-orlando-17fov0g61tztiqr | don-omar | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-miami-vvg1vz_1mbpqce | don-omar | 2026-10-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-rosemont-vvg18z_1bhcnvf | don-omar | 2026-10-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-brooklyn-17gzv0g61dlian2 | don-omar | 2026-10-11T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-newark-vvg1fz_1tkglsd | don-omar | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-charlotte-g5evz_1d8lhpj | don-omar | 2026-10-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-washington-17a8v0g61wbnb9b | don-omar | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-atlanta-vvg1zz_1unelae | don-omar | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-el-paso-vvg1yz_1hpge4r | don-omar | 2026-10-26T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | 2026-11-12T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-inglewood-vvg10z_56fvyeu | don-omar | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | 2026-10-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-montreal-1aszkowgke-yptc | blue-october | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-new-york-city-k7v17_67ag7rfqz | blue-october | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | blue-october | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blue-october-2026-charlotte-g5evz_kng4bet | blue-october | 2026-11-18T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-vancouver-1k78vpvbga1v43o | pentatonix | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | 2026-11-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-pentatonix-2026-milwaukee-vvg1jz_296mpvg | pentatonix | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jk-dk | tyla | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jsxep | tyla | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-glasgow-g5dzz_2ebyvny | tyla | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-manchester-17uov0g62k1nnho | tyla | 2026-10-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | 2026-10-22T16:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | 2026-10-27T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-trivium-2026-st-petersburg-vvg1vz_cbh66cw | trivium | 2026-11-05T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-ottawa-1aszkowgkeikunf | sabaton | 2026-09-26T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-thunder-bay-177zv0g65pwqtbn | sabaton | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-winnipeg-1aozkobgkeldvu- | sabaton | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-hollywood-vv1aazko4gkdzwp0r | sabaton | 2026-11-13T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | 2026-09-19T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | 2026-09-25T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-london-g5dzz_1urr0et | beartooth | 2026-10-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-leeds-g5dzz_1wg9kbb | beartooth | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-glasgow-17uov0g61l4m0bs | beartooth | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | 2026-11-22T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-in-flames-2026-ft-lauderdale-vvg1vz_3k_p4ju | in-flames | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | 2026-11-22T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | 2026-11-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | stella-lefty | 2026-11-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-waite-park-vv1akzk3pgkdplazc | tobymac | 2026-09-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | 2026-11-13T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | 2026-11-14T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | 2026-11-21T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-sacramento-g5vyz_d8k3dby | andrea-bocelli | 2026-09-13T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-san-jose-g5vyz_ddjjmmd | andrea-bocelli | 2026-09-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_dnrpn0b | andrea-bocelli | 2026-09-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_ds3kpkv | andrea-bocelli | 2026-09-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-phoenix-16v0z_dq6g7w0ck | andrea-bocelli | 2026-09-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | 2026-09-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | 2026-09-22T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | missio | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | 2026-11-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | 2026-11-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | 2026-09-28T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | 2026-09-30T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnetamw | michelle-branch | 2026-10-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnettzd | michelle-branch | 2026-10-03T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-los-angeles-vvg10z_cl6gfwp | michelle-branch | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-del-mar-vvg1iz_cje3msh | michelle-branch | 2026-10-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | 2026-10-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | 2026-10-11T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | 2026-10-12T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-new-york-g5diz_uurkkpj | michelle-branch | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | 2026-11-12T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-london-g5vhz_g13mdtb | fkj | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-london-g5vhz_g1bafoo | fkj | 2026-10-30T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6g2lzmgt | sylvan-esso | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6gi4rjo9 | sylvan-esso | 2026-10-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgn5_o | sylvan-esso | 2026-10-08T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgp5h6 | sylvan-esso | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-brooklyn-k7vgf_gpzpfnb | sylvan-esso | 2026-10-14T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-portland-vvg17z_gkbpmvl | sylvan-esso | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-boston-vvg17z_g2bjele | sylvan-esso | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-toronto-177zv0g6gkzh0vc | sylvan-esso | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | 2026-10-22T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-chicago-vv178z_agksv90pf | sylvan-esso | 2026-10-23T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-1avoz_6rofpzd5ed | niall-horan | 2026-11-12T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-1avoz_6rofjzd576 | niall-horan | 2026-11-13T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-dublin-17kzv0g6c1fpluo | saint-levant | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | 2026-10-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-trans-siberian-orchestra-2026-youngstown-vv1aazkfagkd2zwpt | trans-siberian-orchestra | 2026-11-22T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | 2026-09-30T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-brisbane-1akzk3fgkd_ud6g | death-cab-for-cutie | 2026-11-15T09:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | 2026-09-26T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-washington-17a8v0g6gphxucm | sienna-spiro | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-philadelphia-vvg1fz_gfaf9pc | sienna-spiro | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-boston-vvg17z_gpsen49 | sienna-spiro | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-brooklyn-k7vgf_gre9jk_ | sienna-spiro | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | 2026-10-28T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | 2026-11-05T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | 2026-11-10T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-boston-vvg17z_g1xnurg | malcolm-todd | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmrwkt | malcolm-todd | 2026-09-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmycf1 | malcolm-todd | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-detroit-vvg1oz_g99edo3 | malcolm-todd | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-nashville-g5viz_g1jq0ud | malcolm-todd | 2026-10-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-maryland-heights-vvg1bz_gclzidq | malcolm-todd | 2026-10-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_gkurbfe | malcolm-todd | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_g91pgfe | malcolm-todd | 2026-10-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-minneapolis-vvg1bz_gcw2bqa | malcolm-todd | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | 2026-10-12T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-salt-lake-city-g5vzz_g2farap | malcolm-todd | 2026-10-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3nanrd | malcolm-todd | 2026-10-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3n1blo | malcolm-todd | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-oakland-g5vyz_gfhhyva | malcolm-todd | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-las-vegas-17ayv0g6ujiqnhu | dinosaur-jr | 2026-10-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-tempe-17k8v0g6ujk40ss | dinosaur-jr | 2026-10-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | 2026-10-12T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-anaheim-vvg10z_uu7ndiz | dinosaur-jr | 2026-10-16T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-los-angeles-vvg10z_ueyxka- | dinosaur-jr | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-san-francisco-g5vyz_ullh3se | dinosaur-jr | 2026-10-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | 2026-10-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-sacramento-g5vyz_u0dqoo1 | dinosaur-jr | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9tuc_ | dinosaur-jr | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-austin-g5diz_usqkioq | dinosaur-jr | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-belfast-1adoz_kgkuhawcy | niall-horan | 2026-11-15T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-belfast-1adoz_6gkmwqvwh | niall-horan | 2026-11-16T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtkw4- | metallica | 2026-10-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfu40 | metallica | 2026-10-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agkns9qkh | metallica | 2026-10-09T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agknswc9w | metallica | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4n | metallica | 2026-10-16T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4i | metallica | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | 2026-10-07T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-edinburgh-1adbz_dgkdivmtc | foy-vance | 2026-10-17T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-stirling-1auzkoegkew3ujs | foy-vance | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_akto7o5 | foy-vance | 2026-10-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_a5f7udr | foy-vance | 2026-10-24T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-manchester-g5vhz_3kr3ers | foy-vance | 2026-10-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-wexford-1avoz_7gksprdxw | foy-vance | 2026-10-27T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-dublin-1abzko8gkdu8sqd | foy-vance | 2026-10-29T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | foy-vance | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-london-g5dzz_audfsuq | the-lemonheads | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-birmingham-g5dzzbgmxafgo | the-lemonheads | 2026-10-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-kenai-vvg1hz_5wlthim | tommy-emmanuel | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-fairbanks-vvg1hz_5i6wuhs | tommy-emmanuel | 2026-10-12T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-dublin-1kkzv0qagauuqvy | tommy-emmanuel | 2026-11-02T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-yacht-rock-revue-2026-huntsville-17fzv0g62kqgox0 | yacht-rock-revue | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-brooklyn-k7vgf_opjosbe | too-many-zooz | 2026-10-31T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-sheffield-g5vhz_5sagy5t | amble | 2026-09-28T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-glasgow-g5dzz_5s1tpu0 | amble | 2026-09-30T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-newcastle-upon-tyne-g5dzz_clsmpcl | amble | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-manchester-17uov0g65bdcgvp | amble | 2026-10-03T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nottingham-g5vhz_5y-lcue | amble | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-cardiff-g5vhz_5sqgbqz | amble | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-london-g5dzz_5sz3vmk | amble | 2026-10-08T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-los-angeles-vv170z_agkrleod6 | amble | 2026-10-24T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nashville-g5viz_gnxglok | amble | 2026-11-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-austin-g5diz_ahr-flp | amble | 2026-11-18T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-pittsburgh-1avbz_fgklj6-n0 | the-red-clay-strays | 2026-10-01T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | 2026-10-03T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0exkqy | the-red-clay-strays | 2026-10-07T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0kf9e_ | the-red-clay-strays | 2026-10-08T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-orlando-1aefz_fgkvf8_5e | the-red-clay-strays | 2026-10-14T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-charleston-g5evz_akknp14 | the-red-clay-strays | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | 2026-11-06T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-valley-center-vvg1iz_5rl2h1n | daughtry | 2026-10-04T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-troy-k7vgf_grfdn3c | daughtry | 2026-10-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-uncasville-g5vvz_gld3qfv | daughtry | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-waterloo-k7vgf_gm6sksu | daughtry | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-atlantic-city-vvg1fz_gskknq7 | daughtry | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-huntington-k7vgf_geicgms | daughtry | 2026-10-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-englewood-k7vgf_uejshyg | daughtry | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-danville-vvg17z_gy_imrz | daughtry | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | 2026-10-28T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | daughtry | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | 2026-10-22T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | 2026-10-24T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-casalecchio-di-reno-bologna-zg9rmiynyzdk1k | fontaines-d-c | 2026-10-26T20:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | 2026-11-12T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-liverpool-1adjz_8gkv_dtbp | fontaines-d-c | 2026-11-20T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-durant-vvg1yz_ggasrcz | riley-green | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | 2026-10-07T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | 2026-10-08T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-latto-2026-petersburg-vvg17z_2r3gq4t | latto | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | 2026-10-12T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | the-neighbourhood | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-west-valley-city-g5vzz_ds6yaft | staind | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-wheatland-g5vyz_dwgijmi | staind | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-ontario-vv170z_dgkwr0_z6 | staind | 2026-10-11T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-tulsa-1aezz_dgkvarp7d | staind | 2026-10-16T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-the-woodlands-g5diz_dbvgqfi | staind | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-austin-g5diz_dykgajg | staind | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | 2026-10-25T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-gossett-2026-chicago-vvg18z_u5xbtr6 | dylan-gossett | 2026-10-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa | warren-zeiders | 2026-10-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-leeds-g5dzzbubyjrus | warren-zeiders | 2026-10-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-manchester-g5vhzbgtrzaec | warren-zeiders | 2026-10-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-bristol-g5dzzbgxgfjht | warren-zeiders | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-birmingham-g5dzzbu22x97x | warren-zeiders | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-london-g5vhzbgx4c4_f | warren-zeiders | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | 2026-10-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | 2026-10-12T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-las-vegas-17ayv0g61m2w1ya | mico | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-san-diego-vvg1iz_1uivzmh | mico | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-austin-g5diz_1wd9gll | mico | 2026-10-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-montreal-16szkfk00zagk68g | mico | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fd0l9ge | karol-g | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fdjam8c | karol-g | 2026-11-08T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-guadalupe-g5dvz_fdjk688 | karol-g | 2026-11-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknv53if | karol-g | 2026-11-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefxra | karol-g | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefwr5 | karol-g | 2026-11-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | 2026-10-30T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | sabaton | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | sabaton | 2026-11-18T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | 2026-11-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | 2026-11-18T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | 2026-11-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkebi9id | morat | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjeux | morat | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmu0 | morat | 2026-11-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteuw | morat | 2026-11-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteut | morat | 2026-11-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmuj | morat | 2026-11-16T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedtmmv | morat | 2026-11-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6tnua- | morat | 2026-11-21T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6ivj5r | morat | 2026-11-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | 2026-10-23T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | 2026-11-13T16:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | 2026-11-17T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hilary-duff-2026-auckland-1ae8z_7gkmdmw55 | hilary-duff | 2026-10-20T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | 2026-10-25T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | 2026-10-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | 2026-11-13T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | 2026-11-19T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | 2026-10-30T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | 2026-11-06T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | 2026-11-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-ciudad-de-mexico-17azv0g65px_l4r | def-leppard | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-tlajomulco-de-zuniga-g5dvz_5361kla | def-leppard | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-saint-louis-vvg1bz_ukkhzgh | rod-wave | 2026-10-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-nashville-g5viz_u63pwep | rod-wave | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-washington-17a8v0g6uelkuww | rod-wave | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-detroit-vvg1oz_udpjh0t | rod-wave | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-pittsburgh-17aov0g6uky4i7y | rod-wave | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-boston-vvg17z_uerk22e | rod-wave | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-chicago-vvg18z_udha5ep | rod-wave | 2026-11-01T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | rod-wave | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | uicideboy | 2026-10-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | uicideboy | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-birmingham-1aezz_6gkra4gmu | uicideboy | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vv1avzkfwgkdcqwfa | steve-lacy | 2026-10-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vvg17z_2dy9pyk | steve-lacy | 2026-10-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-camden-vv17fz_8gkl8lrzy | steve-lacy | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-washington-1a4zkfdgkeiyeai | steve-lacy | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-virginia-beach-vv1avzkf6gkesce9z | steve-lacy | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-raleigh-g5evz_8ci0_um | steve-lacy | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | 2026-11-12T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | steve-lacy | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-hollywood-vvg1iz_8f-wifq | steve-lacy | 2026-11-22T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | 2026-10-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-chicago-vvg18z_1daahef | the-smashing-pumpkins | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-charlotte-g5evz_1dw8jew | the-smashing-pumpkins | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-jacksonville-17fov0g61t4w29c | the-smashing-pumpkins | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-tampa-vvg1vz_1xbgmwh | the-smashing-pumpkins | 2026-10-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-indianapolis-vvg1fz_1xmuiok | the-smashing-pumpkins | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-nashville-g5viz_1bbgqqs | the-smashing-pumpkins | 2026-10-23T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-austin-g5diz_1txjp-0 | the-smashing-pumpkins | 2026-10-26T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-portland-vvg1hz_1meesxh | the-smashing-pumpkins | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-atlanta-vvg1zz_83jdpwc | fuerza-regida | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-birmingham-1aozkfdgkeytw9q | fuerza-regida | 2026-10-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-albuquerque-g5vzz_8cnmbuy | fuerza-regida | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-wheatland-g5vyz_81rrfk3 | fuerza-regida | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | 2026-10-26T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-glasgow-1adbz_fgkn7svza | noah-kahan | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-glasgow-1auzk3agkdn-buh | noah-kahan | 2026-11-06T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-manchester-g5vhz_gxilkd5 | noah-kahan | 2026-11-09T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-manchester-g5vhz_gxiljdj | noah-kahan | 2026-11-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-london-1ku8v0x_gag10y_ | noah-kahan | 2026-11-13T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-london-1ku8v0x_gag57yq | noah-kahan | 2026-11-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-dublin-1avoz_fgkn52bxo | noah-kahan | 2026-11-19T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | noah-kahan | 2026-11-21T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | noah-kahan | 2026-11-22T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | eagles | 2026-11-15T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-orlando-17fov0g613pzs04 | journey | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-greenville-g5evz_1k1vuwb | journey | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-twenty-one-pilots-2026-columbus-vvg1fz_1uqt9_r | twenty-one-pilots | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | lionel-richie | 2026-11-15T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl6xfl | earth-wind-fire | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl5e46 | earth-wind-fire | 2026-10-24T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck11zds | santana | 2026-11-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck1gfdb | santana | 2026-11-06T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck1ub7d | santana | 2026-11-08T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-santana-2026-las-vegas-17ayv0g6ck13z7p | santana | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gorillaz-2026-phoenix-1av0z_agknirbye | gorillaz | 2026-10-24T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-dallas-vvg1yz_kmvonlg | weezer | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-phoenix-1av0z_kgkmn6hu7 | weezer | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl1gke | aerosmith | 2026-10-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl5ikm | aerosmith | 2026-11-02T02:15:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-seattle-vvg1hzbmeehmj0 | mana | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | mana | 2026-11-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-columbus-vv17fz_8gkvoktkm | jonas-brothers | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-lexington-1avbz_8gkb06ivs | jonas-brothers | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | 2026-10-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-buffalo-k7vgf_8deoygx | jonas-brothers | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-detroit-vv17oz_8gksd_91x | jonas-brothers | 2026-10-25T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | jonas-brothers | 2026-11-02T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | jonas-brothers | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | 2026-11-10T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-dallas-vvg1yz_8uftpd5 | jonas-brothers | 2026-11-11T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-san-antonio-g5diz_8uwwbjr | jonas-brothers | 2026-11-15T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | jonas-brothers | 2026-11-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-hollywood-vvg1iz_8duyuu5 | jonas-brothers | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-hollywood-vvg1iz_o7yeh8v | jonas-brothers | 2026-11-20T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-raye-2026-london-g5vhz_frai-ph | raye | 2026-10-23T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | 2026-10-23T15:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | 2026-10-25T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | 2026-10-27T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | 2026-10-28T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | 2026-10-30T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-manchester-g5vhz_okyh0m1 | fontaines-d-c | 2026-11-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-glasgow-1adbz_8gkucuwyw | fontaines-d-c | 2026-11-22T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-anaheim-vvg10z_ueuvpcr | brand-new | 2026-11-08T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | brand-new | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | 2026-10-20T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-saint-louis-17f8v0g65e8csoj | knocked-loose | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | 2026-10-28T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-daly-city-g5vyz_5mdvnwz | knocked-loose | 2026-11-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-denver-g5vzz_g5e32h3 | phoebe-bridgers | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | 2026-10-22T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-seattle-vvg1hz_gkt8bhj | phoebe-bridgers | 2026-10-24T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-vancouver-1778v0g6g1ql6ek | phoebe-bridgers | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_5ehic8t | phoebe-bridgers | 2026-10-28T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_gpqjtlc | phoebe-bridgers | 2026-10-29T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_5eplbfx | phoebe-bridgers | 2026-10-31T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_goubfs2 | phoebe-bridgers | 2026-11-01T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_gomyvhe | phoebe-bridgers | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-albuquerque-g5vzz_5m9qykz | bryson-tiller | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-phoenix-17k8v0g65lc9irs | bryson-tiller | 2026-10-21T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-anaheim-vvg10z_59jfknv | bryson-tiller | 2026-10-23T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-chula-vista-vvg1iz_5qdpyt3 | bryson-tiller | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-inglewood-vvg10z_5eio1ci | bryson-tiller | 2026-10-26T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-concord-g5vyz_5ix0y73 | bryson-tiller | 2026-10-28T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-vancouver-1778v0g65sqi5ae | bryson-tiller | 2026-10-31T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-seattle-vvg1hz_5llgxaj | bryson-tiller | 2026-11-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | 2026-11-17T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-brooklyn-17gzv0g61ux2pkd | arcangel | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | arcangel | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | arcangel | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | 2026-11-15T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | 2026-10-31T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | 2026-10-22T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | 2026-10-28T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-dublin-1avoz_ogkmfynew | stevie-wonder | 2026-11-01T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-london-1adfz_ogkluzbfe | stevie-wonder | 2026-11-03T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-london-1adfz_ogkwbmppe | stevie-wonder | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-manchester-1adjz_ogklby6m_ | stevie-wonder | 2026-11-08T19:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-glasgow-1adbz_ogkw2mz1l | stevie-wonder | 2026-11-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | tom-jones | 2026-11-04T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-washington-17a8v0g619llzuk | katseye | 2026-10-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-belmont-park-17gzv0g61mqmkdg | katseye | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-boston-vvg17z_1eilxli | katseye | 2026-10-29T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-detroit-vvg1oz_1efshc4 | katseye | 2026-11-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-minneapolis-vvg1bz_1syoq0j | katseye | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-austin-g5diz_1lv8_jd | katseye | 2026-11-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | katseye | 2026-11-18T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | ricky-martin | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ty-myers-2026-evansville-vv1aazkowgkd1n5gg | ty-myers | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dan-shay-2026-rogers-g5viz_1x8yivv | dan-shay | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | dan-shay | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-glasgow-17uov0g6uryba3u | beabadoobee | 2026-11-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-cardiff-17uov0g6uhod1tg | beabadoobee | 2026-11-16T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-manchester-g5vhz_u1guca1 | beabadoobee | 2026-11-17T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | 2026-11-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | 2026-11-05T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | dave-matthews-band | 2026-11-07T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | dave-matthews-band | 2026-11-10T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | 2026-11-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | los-tigres-del-norte | 2026-11-14T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-seattle-vvg1hz_52nooej | the-chicks | 2026-10-26T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-hollywood-vvg10z_5ljdml9 | the-chicks | 2026-11-02T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-chicks-2026-hollywood-vvg10z_5ra8fba | the-chicks | 2026-11-05T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | zac-brown-band | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-chicago-vvg18z_gr6ix5f | sleeping-with-sirens | 2026-10-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | 2026-10-27T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | 2026-11-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | sleeping-with-sirens | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaugdpl | jack-johnson | 2026-11-06T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1akzkosgkdpve0m | jack-johnson | 2026-11-07T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaudsje | jack-johnson | 2026-11-08T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1k7yv0qzga2dx6- | jack-johnson | 2026-11-10T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_zu0i | jack-johnson | 2026-11-11T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_bj0s | jack-johnson | 2026-11-12T08:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-sydney-1akzkosgkdq3fwf | jack-johnson | 2026-11-14T05:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6cppkzd52a | jack-johnson | 2026-11-17T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6gkbxcfqh | jack-johnson | 2026-11-18T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-auckland-1a0zkowgkdch7lq | jack-johnson | 2026-11-20T04:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jack-johnson-2026-waipara-1kazv0jzgaua-ts | jack-johnson | 2026-11-22T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gavin-adcock-2026-boston-vv177z_kgkmr1ooo | gavin-adcock | 2026-11-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | 2026-11-13T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-manchester-vv177z_fgkwnh6_i | riley-green | 2026-11-02T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | 2026-10-30T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beck-2026-vancouver-1aozk3a0babze8k | beck | 2026-11-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dermot-kennedy-2026-west-perth-1avgz_agkmqzbyp | dermot-kennedy | 2026-11-14T09:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dermot-kennedy-2026-brisbane-1avgz_agksulpj1 | dermot-kennedy | 2026-11-17T08:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | anuel-aa | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-billy-strings-2026-baltimore-1avfz_6gkm3naew | billy-strings | 2026-10-30T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | cristian-castro | 2026-11-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | barry-manilow | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | barry-manilow | 2026-11-15T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | 2026-10-29T00:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-houston-g5diz_33ccqfw | victoria-monet | 2026-11-01T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-dallas-vvg1yz_3n9clqe | victoria-monet | 2026-11-03T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | 2026-11-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | victoria-monet | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-victoria-monet-2026-philadelphia-vv1aezkfxgkegbvoj | victoria-monet | 2026-11-13T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | jon-pardi | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-oakland-g5vyz_k55sumi | brandi-carlile | 2026-11-08T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdorlne | brandi-carlile | 2026-11-10T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdoyl04 | brandi-carlile | 2026-11-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | brandi-carlile | 2026-11-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | brandi-carlile | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-interpol-2026-cardiff-1auzkungkeif6z0 | interpol | 2026-11-21T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-virginia-beach-vvg17z_gg7kjfl | little-big-town | 2026-11-06T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-durham-g5evz_gplfpyl | little-big-town | 2026-11-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-charlotte-g5evz_g5h5gi9 | little-big-town | 2026-11-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-akron-vvg1fz_ghpckp3 | little-big-town | 2026-11-13T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-columbus-vvg1fz_gptrce6 | little-big-town | 2026-11-14T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-little-big-town-2026-indianapolis-vvg1fz_g5crrzm | little-big-town | 2026-11-15T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | 2026-10-31T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mrffoe | bryan-adams | 2026-10-29T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr5fkv | bryan-adams | 2026-11-02T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | 2026-11-08T06:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-two-door-cinema-club-2026-mt-claremont-1akzkosgkdk8pdq | two-door-cinema-club | 2026-11-15T11:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-medford-vv177z_6gkl3s3mj | air-supply | 2026-11-06T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-national-harbor-17a8v0g6gpn4b8s | air-supply | 2026-11-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-westbury-k7vgf_fkzchcp | air-supply | 2026-11-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-air-supply-2026-red-bank-g5vvz_1bj0ggl | air-supply | 2026-11-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foreigner-2026-reno-1kc8v0otgacbkaa | foreigner | 2026-11-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | 2026-11-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | 2026-11-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | 2026-11-22T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | 2026-11-23T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-akron-vv1aazkobgkdpsd9k | sting | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-akron-vv17fz_agkm57pk- | sting | 2026-11-03T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-pittsburgh-1avbz_kgkwesf_t | sting | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-pittsburgh-1avbz_kgkwscsdv | sting | 2026-11-08T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-wallingford-g5vvz_ajjscmb | sting | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sting-2026-brooklyn-k7v17_a0ag7icyq | sting | 2026-11-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-nashville-g5vizbu4hqfya | three-days-grace | 2026-11-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-peoria-vv1a6zkuppfa-ze27 | three-days-grace | 2026-11-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-tulsa-1aozkupgkdxuamf | three-days-grace | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-kansas-city-vv1akzkujgkeirwar | three-days-grace | 2026-11-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-sacramento-g5vyzbu2whwe8 | three-days-grace | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh | three-days-grace | 2026-11-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-birmingham-1kfyv0o_ga1tsuk | cody-johnson | 2026-11-01T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-glasgow-1auzk8ugkdf-aiv | cody-johnson | 2026-11-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-belfast-1azzkodgkdbmxb7 | cody-johnson | 2026-11-04T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-cody-johnson-2026-dublin-1avoz_73704zd85a | cody-johnson | 2026-11-05T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-raleigh-g5evz_5mdu9qp | motionless-in-white | 2026-11-03T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-port-wentworth-vvg1zz_5lcp7qp | motionless-in-white | 2026-11-04T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-orlando-17fov0g65wwp47r | motionless-in-white | 2026-11-05T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-nashville-g5viz_5no0bwc | motionless-in-white | 2026-11-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-peoria-vvg1jz_5wcknnp | motionless-in-white | 2026-11-09T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-minneapolis-vvg1bz_5wlfjnl | motionless-in-white | 2026-11-11T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-omaha-vvg1bz_5sqsgj6 | motionless-in-white | 2026-11-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-milwaukee-vvg1jz_5myjgaa | motionless-in-white | 2026-11-14T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-motionless-in-white-2026-newark-vvg1fz_5s7fn3l | motionless-in-white | 2026-11-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rawayana-2026-houston-g5diz_kwowtst | rawayana | 2026-11-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-saint-louis-vvg1bz_2r0qtwk | jodeci | 2026-11-05T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-detroit-vvg1oz_2lg-loc | jodeci | 2026-11-07T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-pittsburgh-17aov0g62hhggfi | jodeci | 2026-11-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jodeci-2026-national-harbor-164zk3ffyzacfekc | jodeci | 2026-11-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | 2026-11-06T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-fishers-vvg1fz_1kxwtrx | mercyme | 2026-11-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mercyme-2026-louisville-17aov0g6193qcjg | mercyme | 2026-11-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | 2026-11-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | 2026-11-06T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mon-laferte-2026-san-jose-g5vyz_kmf8y1d | mon-laferte | 2026-11-07T04:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-san-antonio-g5diz_gedaabt | lenny-pearce | 2026-11-06T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-st-petersburg-vvg1vz_gcd9hph | lenny-pearce | 2026-11-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | lenny-pearce | 2026-11-14T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | lenny-pearce | 2026-11-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-lenny-pearce-2026-silver-spring-17a8v0g6gpl1zid | lenny-pearce | 2026-11-21T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | 2026-11-09T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | 2026-11-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | 2026-11-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-karol-g-2026-ciudad-de-mexico-1afzk3vgketlp_s | karol-g | 2026-11-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
