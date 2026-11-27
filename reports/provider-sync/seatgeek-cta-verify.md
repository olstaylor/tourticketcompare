# SeatGeek CTA verification log

Generated: 2026-11-27T02:02:56.549Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1905 (needs_recheck: 730, provenance backfill: 9, stale re-check: 1828)
- Events skipped before API checks: 933
- API calls made: 800
- Verified provenance written: 702
- URLs added: 9
- URLs corrected: 0
- URLs cleared: 11
- Provenance un-verified: 1
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 63
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | chris-tomlin | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | stevie-wonder | verify (applied) | 18881094 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-08-8-pm/concert/18881094 | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | stevie-wonder | verify (applied) | 18881096 | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-09-8-pm/concert/18881096 | - |
| tm-illenium-2026-vail-z7r9jz1aaapj3 | illenium | add (applied) | 18667727 | https://seatgeek.com/illenium-tickets/vail-colorado-dobson-ice-arena-2026-12-11-6-pm/concert/18667727 | - |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | victoria-monet | clear (applied) | - | - | stored URL failed: venue mismatch: 'Paramount Theatre' vs 'WaMu Theater'; no qualifying replacement found |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | add (applied) | 18889023 | https://seatgeek.com/missio-tickets/chicago-illinois-beat-kitchen-2027-01-13-8-pm/concert/18889023 | - |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Ramsey Concert Hall' vs 'Hodgson Concert Hall at the UGA Performing Arts Center'; no qualifying replacement found |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | clear (applied) | - | - | stored URL failed: venue mismatch: 'Rose Marie and John Beston Hall' vs 'Nazareth College Arts Center'; no qualifying replacement found |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | add (applied) | 18908049 | https://seatgeek.com/valley-tickets/regina-canada-casino-regina-2027-02-18-8-pm/concert/18908049 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | verify (applied) | 18939610 | https://seatgeek.com/mei-semones-tickets/toronto-canada-the-concert-hall-toronto-2027-02-27-7-pm/concert/18939610 | - |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | dylan-scott | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-detroit-z7r9jz1aaap_a | dinosaur-jr | verify (applied) | 18540455 | https://seatgeek.com/dinosaur-jr-tickets/detroit-michigan-the-majestic-theatre-mi-2027-03-06-7-pm/concert/18540455 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | add (applied) | 18884522 | https://seatgeek.com/mico-tickets/lawrence-kansas-the-granada-2-2027-03-06-8-pm/concert/18884522 | - |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | the-rankin-family | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-travis-tritt-2027-fort-worth-z7r9jz1aaaoud | travis-tritt | add (applied) | 18758679 | https://seatgeek.com/travis-tritt-tickets/fort-worth-texas-billy-bob-s-texas-2027-03-19-10-pm/concert/18758679 | - |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | foreigner | add (applied) | 18888690 | https://seatgeek.com/foreigner-tickets/irvine-california-orange-county-great-park-2027-03-27-5-15-pm/concert/18888690 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-warren-zeiders-2027-catoosa-z7r9jz1aa7fa8 | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-charlottesville-z7r9jz1aaa-pv | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-melissa-etheridge-2027-chandler-1a_zk4ngkdm2bwk | melissa-etheridge | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | add (applied) | 18875357 | https://seatgeek.com/mat-kearney-tickets/portsmouth-new-hampshire-the-historic-theater-at-the-music-hall-2027-04-26-7-pm/concert/18875357 | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tori-kelly-2027-minneapolis-z7r9jz1aaa4uk | tori-kelly | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | add (applied) | 18716288 | https://seatgeek.com/haiden-henderson-tickets/seattle-washington-el-corazon-2027-05-11-8-pm/concert/18716288 | - |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | mumford-sons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | fall-out-boy | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-ventura-z7r9jz1aaakg7 | mat-kearney | add (applied) | 18821176 | https://seatgeek.com/mat-kearney-tickets/ventura-california-ventura-music-hall-2027-08-23-8-pm/concert/18821176 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dermot-kennedy-2027-birmingham-1aozkozgkdjgv_k | dermot-kennedy | verify (applied) | 18147756 | https://seatgeek.com/dermot-kennedy-tickets/birmingham-alabama-avondale-brewing-company-2027-08-29-6-30-pm/concert/18147756 | - |
| tm-u2-2027-toronto-1a8zk4mgkdfgnhr | u2 | verify (applied) | 18869412 | https://seatgeek.com/u2-tickets/toronto-canada-rogers-stadium-toronto-2027-09-07-7-30-pm/concert/18869412 | - |
| tm-u2-2027-toronto-1a8zk4mgkdbl1ra | u2 | verify (applied) | 18869413 | https://seatgeek.com/u2-tickets/toronto-canada-rogers-stadium-toronto-2027-09-09-7-30-pm/concert/18869413 | - |
| tm-the-dead-south-2027-thunder-bay-1avzz_4gkumrenk | the-dead-south | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | hans-zimmer | verify (applied) | 18601954 | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | the-interrupters | verify (applied) | 18613159 | https://seatgeek.com/the-interrupters-tickets/toronto-canada-history-2027-04-10-6-pm/concert/18613159 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa40k | billy-strings | verify (applied) | 18755215 | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-10-7-30-pm/concert/18755215 | - |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | josiah-queen | verify (applied) | 18574501 | https://seatgeek.com/josiah-queen-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-04-10-7-pm/concert/18574501 | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | foy-vance | verify (applied) | 18084058 | https://seatgeek.com/foy-vance-tickets/knoxville-tennessee-bijou-theatre-knoxville-2027-04-10-7-pm/concert/18084058 | - |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | staind | verify (applied) | 18654526 | https://seatgeek.com/staind-tickets/kansas-city-missouri-t-mobile-center-2027-04-10-6-pm/concert/18654526 | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | dylan-gossett | verify (applied) | 18642099 | https://seatgeek.com/dylan-gossett-tickets/detroit-michigan-the-fillmore-detroit-2027-04-10-7-pm/concert/18642099 | - |
| tm-mercyme-2027-trenton-k7vgf_fedotss | mercyme | verify (applied) | 18692260 | https://seatgeek.com/mercyme-tickets/trenton-new-jersey-cure-insurance-arena-2027-04-10-7-pm/concert/18692260 | - |
| tm-alex-warren-2027-orlando-1aefz_pgkm4kktv | alex-warren | verify (applied) | 18773516 | https://seatgeek.com/alex-warren-tickets/orlando-florida-kia-center-2027-04-10-7-30-pm/concert/18773516 | - |
| tm-jhene-aiko-2027-atlanta-vvg1zz_puzair5 | jhene-aiko | verify (applied) | 18783889 | https://seatgeek.com/jhene-aiko-tickets/atlanta-georgia-state-farm-arena-1-2027-04-10-7-30-pm/concert/18783889 | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | saint-levant | verify (applied) | 18550858 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-10-8-pm/concert/18550858 | - |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | the-psychedelic-furs | verify (applied) | 18592673 | https://seatgeek.com/the-psychedelic-furs-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-10-8-pm/concert/18592673 | - |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | lukas-graham | verify (applied) | 18618814 | https://seatgeek.com/lukas-graham-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-04-10-7-pm/concert/18618814 | - |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | verify (applied) | 18844961 | https://seatgeek.com/mei-semones-tickets/carrboro-north-carolina-cat-s-cradle-carrboro-2027-04-10-8-pm/concert/18844961 | - |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | lola-young | verify (applied) | 18649707 | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 | - |
| tm-marc-anthony-2027-reading-vv17fz_fgkxhnllx | marc-anthony | verify (applied) | 18753478 | https://seatgeek.com/marc-anthony-tickets/reading-pennsylvania-santander-arena-2027-04-10-8-pm/concert/18753478 | - |
| tm-santana-2027-atlantic-city-vv17fz_pgkwmc5tp | santana | verify (applied) | 18784720 | https://seatgeek.com/santana-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-10-8-pm/concert/18784720 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | fantasia | verify (applied) | 18629435 | https://seatgeek.com/fantasia-tickets/southaven-mississippi-landers-center-2027-04-10-8-pm/concert/18629435 | - |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | riley-green | verify (applied) | 18626559 | https://seatgeek.com/riley-green-tickets/saskatoon-canada-sasktel-centre-2027-04-10-7-pm/concert/18626559 | - |
| tm-vnv-nation-2027-baltimore-1avfzbvgklmrqky | vnv-nation | verify (applied) | 18809274 | https://seatgeek.com/vnv-nation-tickets/baltimore-maryland-baltimore-soundstage-2027-04-10-9-pm/concert/18809274 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | jay-wheeler | verify (applied) | 18649617 | https://seatgeek.com/jay-wheeler-tickets/inglewood-california-youtube-theater-2027-04-10-8-pm/concert/18649617 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | john-mayer | verify (applied) | 18626621 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 | - |
| tm-los-tigres-del-norte-2027-los-angeles-z7r9jz1aa7mao | los-tigres-del-norte | verify (applied) | 18739614 | https://seatgeek.com/los-tigres-del-norte-tickets/los-angeles-california-crypto-com-arena-2027-04-10-8-pm/concert/18739614 | - |
| tm-feid-2027-san-francisco-g5vyz_p1g3qkq | feid | verify (applied) | 18746753 | https://seatgeek.com/feid-tickets/san-francisco-california-chase-center-2027-04-10-8-pm/concert/18746753 | - |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | the-interrupters | verify (applied) | 18612707 | https://seatgeek.com/the-interrupters-tickets/london-canada-london-music-hall-2027-04-11-6-pm/concert/18612707 | - |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | josiah-queen | verify (applied) | 18574503 | https://seatgeek.com/josiah-queen-tickets/grand-rapids-michigan-van-andel-arena-2027-04-11-7-pm/concert/18574503 | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | lukas-graham | verify (applied) | 18617871 | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 | - |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | staind | verify (applied) | 18654527 | https://seatgeek.com/staind-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-11-6-pm/concert/18654527 | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | dylan-gossett | verify (applied) | 18642102 | https://seatgeek.com/dylan-gossett-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-11-7-pm/concert/18642102 | - |
| tm-mercyme-2027-johnson-city-z7r9jz1aa7mot | mercyme | verify (applied) | 18692262 | https://seatgeek.com/mercyme-tickets/johnson-city-tennessee-freedom-hall-civic-center-2027-04-11-7-pm/concert/18692262 | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | nothing-but-thieves | verify (applied) | 18266353 | https://seatgeek.com/nothing-but-thieves-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-11-7-30-pm/concert/18266353 | - |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | death-cab-for-cutie | verify (applied) | 18603742 | https://seatgeek.com/death-cab-for-cutie-tickets/portland-maine-state-theatre-portland-me-2027-04-11-8-pm/concert/18603742 | - |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | the-psychedelic-furs | verify (applied) | 18592674 | https://seatgeek.com/the-psychedelic-furs-tickets/orlando-florida-hard-rock-live-orlando-2027-04-11-8-pm/concert/18592674 | - |
| tm-melissa-etheridge-2027-charleston-g5evz_pcyahcw | melissa-etheridge | verify (applied) | 18754417 | https://seatgeek.com/melissa-etheridge-tickets/charleston-south-carolina-charleston-music-hall-2027-04-11-8-pm/concert/18754417 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | hans-zimmer | verify (applied) | 18601957 | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | john-mayer | verify (applied) | 18626620 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 | - |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | mana | verify (applied) | 18758285 | https://seatgeek.com/mana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-04-11-8-pm/concert/18758285 | - |
| tm-feid-2027-san-jose-g5vyz_p5keuz1 | feid | verify (applied) | 18746754 | https://seatgeek.com/feid-tickets/san-jose-california-sap-center-at-san-jose-2027-04-11-8-pm/concert/18746754 | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6cd | billy-strings | verify (applied) | 18755216 | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-12-7-30-pm/concert/18755216 | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | niall-horan | verify (applied) | 18235530 | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 | - |
| tm-alex-warren-2027-tampa-vvg1vz_prcolqy | alex-warren | verify (applied) | 18773518 | https://seatgeek.com/alex-warren-tickets/tampa-florida-benchmark-international-arena-2027-04-12-7-30-pm/concert/18773518 | - |
| tm-jhene-aiko-2027-orlando-1kfovpjagau4wx9 | jhene-aiko | verify (applied) | 18783893 | https://seatgeek.com/jhene-aiko-tickets/orlando-florida-kia-center-2027-04-12-7-30-pm/concert/18783893 | - |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | lola-young | verify (applied) | 18649709 | https://seatgeek.com/lola-young-tickets/new-york-new-york-radio-city-music-hall-2027-04-12-8-pm/concert/18649709 | - |
| tm-calvin-harris-2027-toronto-1a8zk4fgkevlxcb | calvin-harris | verify (applied) | 18674913 | https://seatgeek.com/calvin-harris-tickets/toronto-canada-scotiabank-arena-2027-04-12-8-pm/concert/18674913 | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | nothing-but-thieves | verify (applied) | 18266356 | https://seatgeek.com/nothing-but-thieves-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-12-7-30-pm/concert/18266356 | - |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | the-interrupters | verify (applied) | 18612605 | https://seatgeek.com/the-interrupters-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-13-6-pm/concert/18612605 | - |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | staind | verify (applied) | 18654528 | https://seatgeek.com/staind-tickets/grand-rapids-michigan-van-andel-arena-2027-04-13-6-pm/concert/18654528 | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaab04 | billy-strings | verify (applied) | 18755220 | https://seatgeek.com/billy-strings-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-13-7-30-pm/concert/18755220 | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | nothing-but-thieves | verify (applied) | 18266354 | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 | - |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | josiah-queen | verify (applied) | 18574502 | https://seatgeek.com/josiah-queen-tickets/toronto-canada-coca-cola-coliseum-2027-04-13-7-pm/concert/18574502 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-earth-wind-fire-2027-pompano-beach-z7r9jz1aaazue | earth-wind-fire | verify (applied) | 18755932 | https://seatgeek.com/earth-wind-fire-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-04-13-7-30-pm/concert/18755932 | - |
| tm-alex-warren-2027-jacksonville-1aefz_pgkwxdf59 | alex-warren | verify (applied) | 18773515 | https://seatgeek.com/alex-warren-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-13-7-30-pm/concert/18773515 | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | death-cab-for-cutie | verify (applied) | 18603805 | https://seatgeek.com/death-cab-for-cutie-tickets/new-york-new-york-radio-city-music-hall-2027-04-13-8-pm/concert/18603805 | - |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | saint-levant | verify (applied) | 18386194 | https://seatgeek.com/saint-levant-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-13-8-pm/concert/18386194 | - |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | lola-young | verify (applied) | 18649732 | https://seatgeek.com/lola-young-tickets/boston-massachusetts-roadrunner-boston-2027-04-13-8-pm/concert/18649732 | - |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | verify (applied) | 18850714 | https://seatgeek.com/haiden-henderson-tickets/nashville-tennessee-the-basement-east-2027-04-13-8-pm/concert/18850714 | - |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | a-perfect-circle | verify (applied) | 18632504 | https://seatgeek.com/a-perfect-circle-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-13-7-pm/concert/18632504 | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | the-interrupters | verify (applied) | 18613142 | https://seatgeek.com/the-interrupters-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-14-6-pm/concert/18613142 | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | haiden-henderson | verify (applied) | 18612968 | https://seatgeek.com/haiden-henderson-tickets/atlanta-georgia-the-masquerade-hell-2027-04-14-7-pm/concert/18612968 | - |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | staind | verify (applied) | 18654530 | https://seatgeek.com/staind-tickets/evansville-indiana-ford-center-in-2027-04-14-6-pm/concert/18654530 | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | earth-wind-fire | verify (applied) | 18664856 | https://seatgeek.com/earth-wind-fire-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-14-7-30-pm/concert/18664856 | - |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | death-cab-for-cutie | verify (applied) | 18715564 | https://seatgeek.com/death-cab-for-cutie-tickets/charlottesville-virginia-ting-pavilion-2027-04-14-7-30-pm/concert/18715564 | - |
| tm-jhene-aiko-2027-sunrise-z7r9jz1aaa4az | jhene-aiko | verify (applied) | 18760709 | https://seatgeek.com/jhene-aiko-tickets/sunrise-florida-amerant-bank-arena-2027-04-14-7-30-pm/concert/18760709 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | warren-zeiders | verify (applied) | 18649754 | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | nothing-but-thieves | verify (applied) | 18266355 | https://seatgeek.com/nothing-but-thieves-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-15-8-pm/concert/18266355 | - |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | josiah-queen | verify (applied) | 18574500 | https://seatgeek.com/josiah-queen-tickets/worcester-massachusetts-dcu-center-2027-04-15-7-pm/concert/18574500 | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | niall-horan | verify (applied) | 18235538 | https://seatgeek.com/niall-horan-tickets/raleigh-north-carolina-lenovo-center-2027-04-15-7-30-pm/concert/18235538 | - |
| tm-alex-warren-2027-knoxville-g5viz_pcmddpz | alex-warren | verify (applied) | 18773526 | https://seatgeek.com/alex-warren-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-15-7-30-pm/concert/18773526 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | jay-wheeler | verify (applied) | 18649618 | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | lola-young | verify (applied) | 18649734 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-15-8-pm/concert/18649734 | - |
| tm-mercyme-2027-grand-prairie-z7r9jz1aa74jn | mercyme | verify (applied) | 18692264 | https://seatgeek.com/mercyme-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-04-15-7-pm/concert/18692264 | - |
| tm-marc-anthony-2027-newark-vv1aezk44gkdq27w- | marc-anthony | verify (applied) | 18753479 | https://seatgeek.com/marc-anthony-tickets/newark-new-jersey-prudential-center-2027-04-15-8-pm/concert/18753479 | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | a-perfect-circle | verify (applied) | 18632506 | https://seatgeek.com/a-perfect-circle-tickets/calgary-canada-scotiabank-saddledome-2027-04-15-7-30-pm/concert/18632506 | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | carly-rae-jepsen | verify (applied) | 18639050 | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 | - |
| tm-meshuggah-2027-vancouver-z7r9jz1aa7tay | meshuggah | verify (applied) | 18724665 | https://seatgeek.com/meshuggah-tickets/vancouver-canada-pne-forum-vancouver-2027-04-15-7-pm/concert/18724665 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | john-mayer | verify (applied) | 18626619 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 | - |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | the-interrupters | verify (applied) | 18612691 | https://seatgeek.com/the-interrupters-tickets/detroit-michigan-the-fillmore-detroit-2027-04-16-6-pm/concert/18612691 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | josiah-queen | verify (applied) | 18574510 | https://seatgeek.com/josiah-queen-tickets/hershey-pennsylvania-giant-center-2027-04-16-7-pm/concert/18574510 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-mat-kearney-2027-durham-z7r9jz1aa7tga | mat-kearney | verify (applied) | 18725770 | https://seatgeek.com/mat-kearney-tickets/durham-north-carolina-carolina-theatre-durham-2027-04-16-7-30-pm/concert/18725770 | - |
| tm-alex-warren-2027-louisville-1avbz_pgkm-pfx2 | alex-warren | verify (applied) | 18773527 | https://seatgeek.com/alex-warren-tickets/louisville-kentucky-kfc-yum-center-2027-04-16-7-30-pm/concert/18773527 | - |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | nothing-but-thieves | verify (applied) | 18266361 | https://seatgeek.com/nothing-but-thieves-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-04-16-8-pm/concert/18266361 | - |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | death-cab-for-cutie | verify (applied) | 18603768 | https://seatgeek.com/death-cab-for-cutie-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-16-8-pm/concert/18603768 | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | fantasia | verify (applied) | 18629294 | https://seatgeek.com/fantasia-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-16-8-pm/concert/18629294 | - |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | def-leppard | verify (applied) | 18662402 | https://seatgeek.com/def-leppard-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-16-7-pm/concert/18662402 | - |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | saint-levant | verify (applied) | 18384604 | https://seatgeek.com/saint-levant-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-16-8-pm/concert/18384604 | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | the-psychedelic-furs | verify (applied) | 18592676 | https://seatgeek.com/the-psychedelic-furs-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-16-8-pm/concert/18592676 | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | mei-semones | verify (applied) | 18638869 | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | lola-young | verify (applied) | 18649736 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-16-8-pm/concert/18649736 | - |
| tm-calvin-harris-2027-montreal-1ad7z_fxfqwzdua5 | calvin-harris | verify (applied) | 18674911 | https://seatgeek.com/calvin-harris-tickets/montreal-canada-centre-bell-2027-04-16-8-pm/concert/18674911 | - |
| tm-los-tigres-del-norte-2027-atlantic-city-vv17fz_4gkmu5cz_ | los-tigres-del-norte | verify (applied) | 18738298 | https://seatgeek.com/los-tigres-del-norte-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-16-8-30-pm/concert/18738298 | - |
| tm-jhene-aiko-2027-memphis-g5viz_pwsyuuc | jhene-aiko | verify (applied) | 18783894 | https://seatgeek.com/jhene-aiko-tickets/memphis-tennessee-fedexforum-2027-04-16-7-30-pm/concert/18783894 | - |
| tm-travis-tritt-2027-oxford-z7r9jz1a7jao6 | travis-tritt | verify (applied) | 18758661 | https://seatgeek.com/travis-tritt-tickets/oxford-alabama-oxford-performing-arts-center-2027-04-16-7-30-pm/concert/18758661 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | carly-rae-jepsen | verify (applied) | 18639051 | https://seatgeek.com/carly-rae-jepsen-tickets/calgary-canada-grey-eagle-event-centre-2027-04-16-7-30-pm/concert/18639051 | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | verify (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | luke-combs | verify (applied) | 18493404 | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | the-interrupters | verify (applied) | 18612762 | https://seatgeek.com/the-interrupters-tickets/chicago-illinois-house-of-blues-chicago-2027-04-17-5-30-pm/concert/18612762 | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | nothing-but-thieves | verify (applied) | 18266362 | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | josiah-queen | verify (applied) | 18574511 | https://seatgeek.com/josiah-queen-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-17-7-pm/concert/18574511 | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | niall-horan | verify (applied) | 18235541 | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 | - |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | the-psychedelic-furs | verify (applied) | 18592680 | https://seatgeek.com/the-psychedelic-furs-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-17-7-30-pm/concert/18592680 | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjcaeyp | billy-strings | verify (applied) | 18755189 | https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-17-7-30-pm/concert/18755189 | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | fantasia | verify (applied) | 18631704 | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-calvin-harris-2027-hamilton-1a8zk4agkd5cdnl | calvin-harris | verify (applied) | 18674914 | https://seatgeek.com/calvin-harris-tickets/hamilton-canada-td-coliseum-2027-04-17-8-pm/concert/18674914 | - |
| tm-mercyme-2027-cedar-park-g5diz_fiumntg | mercyme | verify (applied) | 18692268 | https://seatgeek.com/mercyme-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-04-17-7-pm/concert/18692268 | - |
| tm-cody-johnson-2027-kansas-city-z7r9jz1aaaf8f | cody-johnson | verify (applied) | 18773455 | https://seatgeek.com/cody-johnson-tickets/kansas-city-missouri-t-mobile-center-2027-04-17-7-pm/concert/18773455 | - |
| tm-tori-kelly-2027-philadelphia-z7r9jz1aaafa- | tori-kelly | verify (applied) | 18827093 | https://seatgeek.com/tori-kelly-tickets/philadelphia-pennsylvania-franklin-music-hall-2027-04-17-8-pm/concert/18827093 | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | warren-zeiders | verify (applied) | 18649755 | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 | - |
| tm-los-tigres-del-norte-2027-hartford-z7r9jz1aaaz18 | los-tigres-del-norte | verify (applied) | 18747975 | https://seatgeek.com/los-tigres-del-norte-tickets/hartford-connecticut-peoplesbank-arena-2027-04-17-8-30-pm/concert/18747975 | - |
| tm-jhene-aiko-2027-new-orleans-g5viz_pu7vuyk | jhene-aiko | verify (applied) | 18783895 | https://seatgeek.com/jhene-aiko-tickets/new-orleans-louisiana-smoothie-king-center-2027-04-17-7-30-pm/concert/18783895 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-marc-anthony-2027-chicago-vv1a7zk48gkervqur | marc-anthony | verify (applied) | 18753480 | https://seatgeek.com/marc-anthony-tickets/chicago-illinois-united-center-2027-04-17-8-pm/concert/18753480 | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | a-perfect-circle | verify (applied) | 18632507 | https://seatgeek.com/a-perfect-circle-tickets/edmonton-canada-rogers-place-2027-04-17-7-30-pm/concert/18632507 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | john-mayer | verify (applied) | 18626618 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 | - |
| tm-feid-2027-las-vegas-z7r9jz1aaad3d | feid | verify (applied) | 18746759 | https://seatgeek.com/feid-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-17-8-pm/concert/18746759 | - |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | josiah-queen | verify (applied) | 18574513 | https://seatgeek.com/josiah-queen-tickets/duluth-georgia-gas-south-arena-2027-04-18-7-pm/concert/18574513 | - |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | lola-young | verify (applied) | 18649711 | https://seatgeek.com/lola-young-tickets/detroit-michigan-the-fillmore-detroit-2027-04-18-8-pm/concert/18649711 | - |
| tm-mercyme-2027-bossier-city-g5viz_fdsgolb | mercyme | verify (applied) | 18692269 | https://seatgeek.com/mercyme-tickets/bossier-city-louisiana-brookshire-grocery-arena-2027-04-18-6-30-pm/concert/18692269 | - |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | haiden-henderson | verify (applied) | 18613118 | https://seatgeek.com/haiden-henderson-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-18-8-pm/concert/18613118 | - |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | def-leppard | verify (applied) | 18662404 | https://seatgeek.com/def-leppard-tickets/fort-worth-texas-dickies-arena-2027-04-18-7-pm/concert/18662404 | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | saint-levant | verify (applied) | 18386193 | https://seatgeek.com/saint-levant-tickets/atlanta-georgia-buckhead-theatre-2027-04-18-8-pm/concert/18386193 | - |
| tm-mat-kearney-2027-charlotte-g5evz_ftdyo7x | mat-kearney | verify (applied) | 18725925 | https://seatgeek.com/mat-kearney-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-18-8-pm/concert/18725925 | - |
| tm-alex-warren-2027-saint-louis-vv17bz_pgkm394lj | alex-warren | verify (applied) | 18773530 | https://seatgeek.com/alex-warren-tickets/saint-louis-missouri-enterprise-center-2027-04-18-7-30-pm/concert/18773530 | - |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | the-warning | verify (applied) | 18591375 | https://seatgeek.com/the-warning-tickets/phoenix-arizona-the-van-buren-2027-04-18-8-pm/concert/18591375 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | john-mayer | verify (applied) | 18626617 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 | - |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | hazlett | verify (applied) | 18311905 | https://seatgeek.com/hazlett-tickets/charlotte-north-carolina-neighborhood-theatre-2027-04-19-8-pm/concert/18311905 | - |
| tm-the-dead-south-2027-silver-spring-1avfz_4gktp2lu0 | the-dead-south | verify (applied) | 18754695 | https://seatgeek.com/the-dead-south-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-19-8-pm/concert/18754695 | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | a-perfect-circle | verify (applied) | 18632505 | https://seatgeek.com/a-perfect-circle-tickets/winnipeg-canada-canada-life-centre-2027-04-19-7-30-pm/concert/18632505 | - |
| tm-meshuggah-2027-salt-lake-city-g5vzz_4r3jsmh | meshuggah | verify (applied) | 18724672 | https://seatgeek.com/meshuggah-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-19-6-30-pm/concert/18724672 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | haiden-henderson | verify (applied) | 18613187 | https://seatgeek.com/haiden-henderson-tickets/washington-district-of-columbia-the-atlantis-2027-04-20-6-30-pm/concert/18613187 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | ha-ash | verify (applied) | 18608865 | https://seatgeek.com/ha-ash-tickets/toronto-canada-meridian-hall-2027-04-20-8-pm/concert/18608865 | - |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | def-leppard | verify (applied) | 18662407 | https://seatgeek.com/def-leppard-tickets/mobile-alabama-mobile-civic-center-arena-2027-04-20-7-pm/concert/18662407 | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | saint-levant | verify (applied) | 18386196 | https://seatgeek.com/saint-levant-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2027-04-20-8-pm/concert/18386196 | - |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | hazlett | verify (applied) | 18311798 | https://seatgeek.com/hazlett-tickets/charlottesville-virginia-jefferson-theater-charlottesville-va-2027-04-20-8-pm/concert/18311798 | - |
| tm-sam-fender-2027-boston-vv1k7z_pbvg7sogy | sam-fender | verify (applied) | 18760793 | https://seatgeek.com/sam-fender-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-20-8-pm/concert/18760793 | - |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | lola-young | verify (applied) | 18649710 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-20-7-30-pm/concert/18649710 | - |
| tm-jhene-aiko-2027-fort-worth-vvg1yz_pgce3dm | jhene-aiko | verify (applied) | 18783899 | https://seatgeek.com/jhene-aiko-tickets/fort-worth-texas-ariat-arena-2027-04-20-7-30-pm/concert/18783899 | - |
| tm-alex-warren-2027-des-moines-z7r9jz1aaaoat | alex-warren | verify (applied) | 18773531 | https://seatgeek.com/alex-warren-tickets/des-moines-iowa-casey-s-center-2027-04-20-7-45-pm/concert/18773531 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | the-interrupters | verify (applied) | 18613147 | https://seatgeek.com/the-interrupters-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-21-6-pm/concert/18613147 | - |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | foy-vance | verify (applied) | 18084267 | https://seatgeek.com/foy-vance-tickets/toronto-canada-the-danforth-music-hall-2027-04-21-7-pm/concert/18084267 | - |
| tm-billy-strings-2027-greenville-g5evz_perum8k | billy-strings | verify (applied) | 18755188 | https://seatgeek.com/billy-strings-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-04-21-7-30-pm/concert/18755188 | - |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | nothing-but-thieves | verify (applied) | 18266368 | https://seatgeek.com/nothing-but-thieves-tickets/toronto-canada-massey-hall-2027-04-21-8-pm/concert/18266368 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb | lola-young | verify (applied) | 18662116 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-21-7-30-pm/concert/18662116 | - |
| tm-melissa-etheridge-2027-wichita-vv1kbz_pfvg7sw9z | melissa-etheridge | verify (applied) | 18754513 | https://seatgeek.com/melissa-etheridge-tickets/wichita-kansas-orpheum-theatre-wichita-2027-04-21-7-30-pm/concert/18754513 | - |
| tm-saint-levant-2027-houston-g5diz_clj5bta | saint-levant | verify (applied) | 18386202 | https://seatgeek.com/saint-levant-tickets/houston-texas-bayou-music-center-2027-04-21-8-pm/concert/18386202 | - |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | meshuggah | verify (applied) | 18724675 | https://seatgeek.com/meshuggah-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-21-7-pm/concert/18724675 | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | verify (applied) | 18844674 | https://seatgeek.com/mei-semones-tickets/san-diego-california-music-box-san-diego-2027-04-21-8-pm/concert/18844674 | - |
| tm-journey-2027-stateline-1kayvp_vgacrke8 | journey | verify (applied) | 18757753 | https://seatgeek.com/journey-tickets/stateline-nevada-tahoe-blue-event-center-2027-04-21-8-pm/concert/18757753 | - |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | warren-zeiders | verify (applied) | 18649760 | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 | - |
| tm-phoebe-bridgers-2027-tampa-vvg1vz_pnorv0s | phoebe-bridgers | verify (applied) | 18760643 | https://seatgeek.com/phoebe-bridgers-tickets/tampa-florida-benchmark-international-arena-2027-04-22-7-30-pm/concert/18760643 | - |
| tm-travis-tritt-2027-macon-vvg1zz_k1bu6z9 | travis-tritt | verify (applied) | 18105539 | https://seatgeek.com/travis-tritt-tickets/macon-georgia-macon-city-auditorium-2027-04-22-7-30-pm/concert/18105539 | - |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | ha-ash | verify (applied) | 18608840 | https://seatgeek.com/ha-ash-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-22-8-pm/concert/18608840 | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | haiden-henderson | verify (applied) | 18613099 | https://seatgeek.com/haiden-henderson-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-04-22-8-pm/concert/18613099 | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | a-perfect-circle | verify (applied) | 18632509 | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-22-7-pm/concert/18632509 | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | fontaines-d-c | verify (applied) | 18658875 | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-22-8-pm/concert/18658875 | - |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | def-leppard | verify (applied) | 18662406 | https://seatgeek.com/def-leppard-tickets/wichita-kansas-intrust-bank-arena-2027-04-22-7-pm/concert/18662406 | - |
| tm-mercyme-2027-tulsa-1aezz_fgkbolkrk | mercyme | verify (applied) | 18692271 | https://seatgeek.com/mercyme-tickets/tulsa-oklahoma-bok-center-2027-04-22-7-pm/concert/18692271 | - |
| tm-mat-kearney-2027-washington-1a4zk49gkdhkrsu | mat-kearney | verify (applied) | 18726087 | https://seatgeek.com/mat-kearney-tickets/washington-district-of-columbia-lincoln-theatre-dc-2027-04-22-8-pm/concert/18726087 | - |
| tm-sam-fender-2027-new-york-g5dyz_pnxxsdo | sam-fender | verify (applied) | 18760794 | https://seatgeek.com/sam-fender-tickets/new-york-new-york-radio-city-music-hall-2027-04-22-8-pm/concert/18760794 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-jhene-aiko-2027-austin-g5diz_pvhlinm | jhene-aiko | verify (applied) | 18783901 | https://seatgeek.com/jhene-aiko-tickets/austin-texas-moody-center-atx-2027-04-22-7-30-pm/concert/18783901 | - |
| tm-saint-levant-2027-dallas-vvg1yz_cxxtz4x | saint-levant | verify (applied) | 18386201 | https://seatgeek.com/saint-levant-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-04-22-8-pm/concert/18386201 | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | carly-rae-jepsen | verify (applied) | 18639016 | https://seatgeek.com/carly-rae-jepsen-tickets/inglewood-california-kia-forum-2027-04-22-7-30-pm/concert/18639016 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | haiden-henderson | verify (applied) | 18612878 | https://seatgeek.com/haiden-henderson-tickets/new-york-new-york-irving-plaza-2027-04-23-7-pm/concert/18612878 | - |
| tm-the-neighbourhood-2027-philadelphia-1adzz_4gkl39a_b | the-neighbourhood | verify (applied) | 18726905 | https://seatgeek.com/the-neighbourhood-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-04-23-7-pm/concert/18726905 | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | warren-zeiders | verify (applied) | 18649761 | https://seatgeek.com/warren-zeiders-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-04-23-7-pm/concert/18649761 | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | the-psychedelic-furs | verify (applied) | 18592681 | https://seatgeek.com/the-psychedelic-furs-tickets/baltimore-maryland-nevermore-hall-2027-04-23-8-pm/concert/18592681 | - |
| tm-josiah-queen-2027-hoffman-estates-vv1a7zkfigkdsnse_ | josiah-queen | verify (applied) | 18574515 | https://seatgeek.com/josiah-queen-tickets/hoffman-estates-illinois-now-arena-2027-04-23-7-pm/concert/18574515 | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemjazz | a-perfect-circle | verify (applied) | 18632508 | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-23-7-pm/concert/18632508 | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedosqi | fontaines-d-c | verify (applied) | 18642818 | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-23-8-pm/concert/18642818 | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | verify (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | leon-bridges | verify (applied) | 18662691 | https://seatgeek.com/leon-bridges-tickets/fort-worth-texas-dickies-arena-2027-04-23-7-pm/concert/18662691 | - |
| tm-foy-vance-2027-ardmore-z7r9jz1aa7_fo | foy-vance | verify (applied) | 18370696 | https://seatgeek.com/foy-vance-tickets/ardmore-pennsylvania-the-ardmore-music-hall-2027-04-23-8-pm/concert/18370696 | - |
| tm-mercyme-2027-lincoln-vv17bz_fgktuaum7 | mercyme | verify (applied) | 18692274 | https://seatgeek.com/mercyme-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-23-7-pm/concert/18692274 | - |
| tm-los-tigres-del-norte-2027-duluth-vvg1zz_fq51ps_ | los-tigres-del-norte | verify (applied) | 18738682 | https://seatgeek.com/los-tigres-del-norte-tickets/duluth-georgia-gas-south-arena-2027-04-23-8-pm/concert/18738682 | - |
| tm-mat-kearney-2027-atlantic-city-vv1aezk48gkd-q-0n | mat-kearney | verify (applied) | 18726580 | https://seatgeek.com/mat-kearney-tickets/atlantic-city-new-jersey-music-box-at-the-borgata-2027-04-23-8-pm/concert/18726580 | - |
| tm-marc-anthony-2027-charlotte-g5evz_flstq5b | marc-anthony | verify (applied) | 18753487 | https://seatgeek.com/marc-anthony-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-23-8-pm/concert/18753487 | - |
| tm-alex-warren-2027-winnipeg-1av7z_pgkwqqal2 | alex-warren | verify (applied) | 18773537 | https://seatgeek.com/alex-warren-tickets/winnipeg-canada-canada-life-centre-2027-04-23-7-30-pm/concert/18773537 | - |
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | calvin-harris | verify (applied) | 18674838 | https://seatgeek.com/calvin-harris-tickets/houston-texas-toyota-center-2027-04-23-8-pm/concert/18674838 | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | the-warning | verify (applied) | 18590298 | https://seatgeek.com/the-warning-tickets/seattle-washington-moore-theatre-seattle-2027-04-23-8-pm/concert/18590298 | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | fantasia | verify (applied) | 18629227 | https://seatgeek.com/fantasia-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-23-8-pm/concert/18629227 | - |
| tm-feid-2027-san-diego-vvg1iz_p2x3bok | feid | verify (applied) | 18746761 | https://seatgeek.com/feid-tickets/san-diego-california-pechanga-arena-san-diego-2027-04-23-8-pm/concert/18746761 | - |
| tm-journey-2027-stateline-1kayvp_vgacljep | journey | verify (applied) | 18757750 | https://seatgeek.com/journey-tickets/stateline-nevada-tahoe-blue-event-center-2027-04-23-8-pm/concert/18757750 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | haiden-henderson | verify (applied) | 18613146 | https://seatgeek.com/haiden-henderson-tickets/boston-massachusetts-big-night-live-2027-04-24-6-pm/concert/18613146 | - |
| tm-noah-kahan-2027-athens-z7r9jz1aa7wgt | noah-kahan | verify (applied) | 18728706 | https://seatgeek.com/noah-kahan-tickets/athens-georgia-sanford-stadium-2027-04-24-6-30-pm/concert/18728706 | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | fontaines-d-c | verify (applied) | 18642821 | https://seatgeek.com/fontaines-d-c-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-04-24-7-pm/concert/18642821 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-the-neighbourhood-2027-boston-vv1avzk4_gkdekcqu | the-neighbourhood | verify (applied) | 18726904 | https://seatgeek.com/the-neighbourhood-tickets/boston-massachusetts-td-garden-2027-04-24-7-pm/concert/18726904 | - |
| tm-billy-strings-2027-greensboro-g5evz_pjyy_fv | billy-strings | verify (applied) | 18755196 | https://seatgeek.com/billy-strings-tickets/greensboro-north-carolina-first-horizon-coliseum-2027-04-24-7-30-pm/concert/18755196 | - |
| tm-phoebe-bridgers-2027-miami-vvg1vz_phkzg-0 | phoebe-bridgers | verify (applied) | 18760644 | https://seatgeek.com/phoebe-bridgers-tickets/miami-florida-kaseya-center-2027-04-24-7-30-pm/concert/18760644 | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | the-psychedelic-furs | verify (applied) | 18592683 | https://seatgeek.com/the-psychedelic-furs-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-04-24-8-pm/concert/18592683 | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | warren-zeiders | verify (applied) | 18649764 | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 | - |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | def-leppard | verify (applied) | 18662408 | https://seatgeek.com/def-leppard-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-24-7-pm/concert/18662408 | - |
| tm-mercyme-2027-moline-vv17bz_fgkwrzpms | mercyme | verify (applied) | 18692276 | https://seatgeek.com/mercyme-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-24-7-pm/concert/18692276 | - |
| tm-los-tigres-del-norte-2027-charlotte-g5evz_fqspq1u | los-tigres-del-norte | verify (applied) | 18738300 | https://seatgeek.com/los-tigres-del-norte-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-24-8-pm/concert/18738300 | - |
| tm-sam-fender-2027-toronto-1avzz_pgkl1qlzt | sam-fender | verify (applied) | 18760801 | https://seatgeek.com/sam-fender-tickets/toronto-canada-scotiabank-arena-2027-04-24-8-pm/concert/18760801 | - |
| tm-tori-kelly-2027-louisville-1avbz_pgksxzvfu | tori-kelly | verify (applied) | 18778568 | https://seatgeek.com/tori-kelly-tickets/louisville-kentucky-louisville-palace-2027-04-24-8-pm/concert/18778568 | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | the-interrupters | verify (applied) | 18613135 | https://seatgeek.com/the-interrupters-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-24-6-30-pm/concert/18613135 | - |
| tm-jhene-aiko-2027-houston-z7r9jz1aaa4ay | jhene-aiko | verify (applied) | 18783926 | https://seatgeek.com/jhene-aiko-tickets/houston-texas-toyota-center-2027-04-24-7-30-pm/concert/18783926 | - |
| tm-calvin-harris-2027-fort-worth-vvg1yz_flvwxhm | calvin-harris | verify (applied) | 18674837 | https://seatgeek.com/calvin-harris-tickets/fort-worth-texas-ariat-arena-2027-04-24-8-pm/concert/18674837 | - |
| tm-carin-leon-2027-sparks-1avjz_pgkrt9h7o | carin-leon | verify (applied) | 18782513 | https://seatgeek.com/carin-leon-tickets/sparks-nevada-nugget-event-center-2027-04-24-7-pm/concert/18782513 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | mei-semones | verify (applied) | 18637391 | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 | - |
| tm-mercyme-2027-grand-rapids-vv17oz_fgkmddfhb | mercyme | verify (applied) | 18692277 | https://seatgeek.com/mercyme-tickets/grand-rapids-michigan-van-andel-arena-2027-04-25-7-pm/concert/18692277 | - |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | a-perfect-circle | verify (applied) | 18632516 | https://seatgeek.com/a-perfect-circle-tickets/detroit-michigan-fox-theatre-detroit-2027-04-25-7-30-pm/concert/18632516 | - |
| tm-marc-anthony-2027-tampa-vvg1vz_fqozpda | marc-anthony | verify (applied) | 18753486 | https://seatgeek.com/marc-anthony-tickets/tampa-florida-benchmark-international-arena-2027-04-25-8-pm/concert/18753486 | - |
| tm-alex-warren-2027-madison-z7r9jz1aaaoaw | alex-warren | verify (applied) | 18773538 | https://seatgeek.com/alex-warren-tickets/madison-wisconsin-kohl-center-2027-04-25-7-45-pm/concert/18773538 | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | saint-levant | verify (applied) | 18386203 | https://seatgeek.com/saint-levant-tickets/denver-colorado-summit-music-hall-denver-2027-04-25-8-pm/concert/18386203 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-alex-warren-2027-grand-rapids-vv17oz_pgkrvt515 | alex-warren | verify (applied) | 18773541 | https://seatgeek.com/alex-warren-tickets/grand-rapids-michigan-van-andel-arena-2027-04-26-7-30-pm/concert/18773541 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-noah-kahan-2027-birmingham-1aezz_4gkwloexg | noah-kahan | verify (applied) | 18728708 | https://seatgeek.com/noah-kahan-tickets/birmingham-alabama-protective-stadium-2027-04-27-6-30-pm/concert/18728708 | - |
| tm-phoebe-bridgers-2027-orlando-1axzk4jgkenbxsj | phoebe-bridgers | verify (applied) | 18760645 | https://seatgeek.com/phoebe-bridgers-tickets/orlando-florida-kia-center-2027-04-27-7-30-pm/concert/18760645 | - |
| tm-tori-kelly-2027-indianapolis-vv17fz_pgkswj0w7 | tori-kelly | verify (applied) | 18778566 | https://seatgeek.com/tori-kelly-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-27-7-30-pm/concert/18778566 | - |
| tm-sam-fender-2027-milwaukee-z7r9jz1aaaozy | sam-fender | verify (applied) | 18760809 | https://seatgeek.com/sam-fender-tickets/milwaukee-wisconsin-the-rave-eagles-club-2027-04-27-8-pm/concert/18760809 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-jhene-aiko-2027-denver-g5vzz_pu930ac | jhene-aiko | verify (applied) | 18783903 | https://seatgeek.com/jhene-aiko-tickets/denver-colorado-ball-arena-2027-04-27-7-30-pm/concert/18783903 | - |
| tm-alex-warren-2027-columbus-vv17fz_pgkrmanar | alex-warren | verify (applied) | 18773543 | https://seatgeek.com/alex-warren-tickets/columbus-ohio-nationwide-arena-2027-04-28-7-30-pm/concert/18773543 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | verify (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-tori-kelly-2027-milwaukee-z7r9jz1aaa4u3 | tori-kelly | verify (applied) | 18778953 | https://seatgeek.com/tori-kelly-tickets/milwaukee-wisconsin-pabst-theater-2027-04-28-7-pm/concert/18778953 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | verify (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
| tm-marc-anthony-2027-san-antonio-g5diz_fdkjtum | marc-anthony | verify (applied) | 18753491 | https://seatgeek.com/marc-anthony-tickets/san-antonio-texas-frost-bank-center-2027-04-29-7-pm/concert/18753491 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-sam-fender-2027-morrison-z7r9jz1aaaaoe | sam-fender | verify (applied) | 18760802 | https://seatgeek.com/sam-fender-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-29-8-pm/concert/18760802 | - |
| tm-jhene-aiko-2027-phoenix-1av0z_pgkmb6tzk | jhene-aiko | verify (applied) | 18783904 | https://seatgeek.com/jhene-aiko-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-29-7-30-pm/concert/18783904 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-alex-warren-2027-hamilton-1avzz_pgkiu_f3b | alex-warren | verify (applied) | 18773542 | https://seatgeek.com/alex-warren-tickets/hamilton-canada-td-coliseum-2027-04-30-7-30-pm/concert/18773542 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-the-dead-south-2027-lexington-1avbz_4gku2y0tx | the-dead-south | verify (applied) | 18738211 | https://seatgeek.com/the-dead-south-tickets/lexington-kentucky-the-rail-3-2027-04-30-8-pm/concert/18738211 | - |
| tm-tori-kelly-2027-chicago-vv178z_pgkrb2cst | tori-kelly | verify (applied) | 18778569 | https://seatgeek.com/tori-kelly-tickets/chicago-illinois-house-of-blues-chicago-2027-04-30-7-pm/concert/18778569 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-jhene-aiko-2027-las-vegas-z7r9jz1aaa41z | jhene-aiko | verify (applied) | 18783929 | https://seatgeek.com/jhene-aiko-tickets/las-vegas-nevada-t-mobile-arena-2027-04-30-7-30-pm/concert/18783929 | - |
| tm-remi-wolf-2027-berkeley-g5vyz_pmrwpif | remi-wolf | verify (applied) | 18785269 | https://seatgeek.com/remi-wolf-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-04-30-8-pm/concert/18785269 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | verify (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-alex-warren-2027-kanata-1aszk4jgkdqmz4o | alex-warren | verify (applied) | 18773545 | https://seatgeek.com/alex-warren-tickets/kanata-canada-canadian-tire-centre-2027-05-01-7-30-pm/concert/18773545 | - |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | meshuggah | verify (applied) | 18724684 | https://seatgeek.com/meshuggah-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-05-01-7-pm/concert/18724684 | - |
| tm-foreigner-2027-uncasville-g5vvz_pubgaoy | foreigner | verify (applied) | 18780602 | https://seatgeek.com/foreigner-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-01-8-pm/concert/18780602 | - |
| tm-cody-johnson-2027-evansville-vv1aazk4ngkd4mac1 | cody-johnson | verify (applied) | 18773456 | https://seatgeek.com/cody-johnson-tickets/evansville-indiana-ford-center-in-2027-05-01-7-pm/concert/18773456 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-jhene-aiko-2027-anaheim-vv170z_pgks682ex | jhene-aiko | verify (applied) | 18783907 | https://seatgeek.com/jhene-aiko-tickets/anaheim-california-honda-center-2027-05-01-7-30-pm/concert/18783907 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-sam-fender-2027-tempe-1av0z_pgkrzfigp | sam-fender | verify (applied) | 18760799 | https://seatgeek.com/sam-fender-tickets/tempe-arizona-mullett-arena-2027-05-01-8-pm/concert/18760799 | - |
| tm-alex-warren-2027-quebec-1ad7z_pgkmtnafk | alex-warren | verify (applied) | 18773549 | https://seatgeek.com/alex-warren-tickets/quebec-canada-videotron-centre-2027-05-02-7-30-pm/concert/18773549 | - |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | verify (applied) | 18847838 | https://seatgeek.com/haiden-henderson-tickets/minneapolis-minnesota-7th-street-entry-2027-05-02-8-pm/concert/18847838 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-sam-fender-2027-los-angeles-vv170z_pgklllved | sam-fender | verify (applied) | 18760800 | https://seatgeek.com/sam-fender-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-05-03-8-pm/concert/18760800 | - |
| tm-noah-kahan-2027-nashville-z7r9jz1aa7wuk | noah-kahan | verify (applied) | 18723384 | https://seatgeek.com/noah-kahan-tickets/nashville-tennessee-nissan-stadium-2027-05-04-6-30-pm/concert/18723384 | - |
| tm-alex-warren-2027-albany-k7vgf_prpg3o4 | alex-warren | verify (applied) | 18773550 | https://seatgeek.com/alex-warren-tickets/albany-new-york-mvp-arena-2027-05-04-7-30-pm/concert/18773550 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-alex-warren-2027-belmont-park-1adzz_pgkmwcbz2 | alex-warren | verify (applied) | 18773552 | https://seatgeek.com/alex-warren-tickets/elmont-new-york-ubs-arena-2027-05-05-7-45-pm/concert/18773552 | - |
| tm-carly-rae-jepsen-2027-irving-vvg1yz_kwbaerl | carly-rae-jepsen | verify (applied) | 18639025 | https://seatgeek.com/carly-rae-jepsen-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-05-7-30-pm/concert/18639025 | - |
| tm-tori-kelly-2027-kansas-city-z7r9jz1aaaffz | tori-kelly | verify (applied) | 18778957 | https://seatgeek.com/tori-kelly-tickets/kansas-city-missouri-the-truman-2027-05-05-7-pm/concert/18778957 | - |
| tm-def-leppard-2027-san-francisco-g5vyz_f5oof-x | def-leppard | verify (applied) | 18662417 | https://seatgeek.com/def-leppard-tickets/san-francisco-california-chase-center-2027-05-05-7-pm/concert/18662417 | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | verify (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-two-friends-2027-indianapolis-vv1aazk40gkd83bu9 | two-friends | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18756186 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | two-door-cinema-club | verify (applied) | 18711333 | https://seatgeek.com/two-door-cinema-club-tickets/chicago-illinois-riviera-theatre-chicago-2027-05-06-7-30-pm/concert/18711333 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | verify (applied) | 18863054 | https://seatgeek.com/mei-semones-tickets/columbus-ohio-ace-of-cups-2027-05-07-7-pm/concert/18863054 | - |
| tm-meshuggah-2027-atlanta-vvg1zz_4ptwc-- | meshuggah | verify (applied) | 18724693 | https://seatgeek.com/meshuggah-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-07-7-pm/concert/18724693 | - |
| tm-alex-warren-2027-baltimore-1avfz_pgkrfpurm | alex-warren | verify (applied) | 18773555 | https://seatgeek.com/alex-warren-tickets/baltimore-maryland-cfg-bank-arena-2027-05-07-7-45-pm/concert/18773555 | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | verify (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | verify (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-remi-wolf-2027-houston-g5diz_f9ubux3 | remi-wolf | verify (applied) | 18664782 | https://seatgeek.com/remi-wolf-tickets/houston-texas-713-music-hall-2027-05-07-8-pm/concert/18664782 | - |
| tm-two-friends-2027-milwaukee-vv1a6zk4n0kbize5e | two-friends | verify (applied) | 18757860 | https://seatgeek.com/two-friends-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-05-07-8-pm/concert/18757860 | - |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | def-leppard | verify (applied) | 18662420 | https://seatgeek.com/def-leppard-tickets/sacramento-california-golden-1-center-2027-05-07-7-pm/concert/18662420 | - |
| tm-calvin-harris-2027-oakland-g5vyz_fh6tm8u | calvin-harris | verify (applied) | 18674847 | https://seatgeek.com/calvin-harris-tickets/oakland-california-oakland-arena-2027-05-07-7-30-pm/concert/18674847 | - |
| tm-jhene-aiko-2027-san-francisco-g5vyz_plmqsld | jhene-aiko | verify (applied) | 18783908 | https://seatgeek.com/jhene-aiko-tickets/san-francisco-california-chase-center-2027-05-07-7-30-pm/concert/18783908 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd | john-mayer | verify (applied) | 18659139 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-07-8-pm/concert/18659139 | - |
| tm-sam-fender-2027-seattle-vvg1hz_pmbc1yg | sam-fender | verify (applied) | 18760796 | https://seatgeek.com/sam-fender-tickets/seattle-washington-wamu-theater-2027-05-07-8-pm/concert/18760796 | - |
| tm-marc-anthony-2027-glendale-z7r9jz1aaakad | marc-anthony | verify (applied) | 18753495 | https://seatgeek.com/marc-anthony-tickets/glendale-arizona-desert-diamond-arena-2027-05-07-8-pm/concert/18753495 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | verify (applied) | 18844643 | https://seatgeek.com/too-many-zooz-tickets/san-diego-california-music-box-san-diego-2027-05-07-9-pm/concert/18844643 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-kings-of-leon-2027-bristow-1ka8vp__gaurfu5 | kings-of-leon | verify (applied) | 18746638 | https://seatgeek.com/kings-of-leon-tickets/bristow-virginia-jiffy-lube-live-2027-05-08-7-30-pm/concert/18746638 | - |
| tm-alex-warren-2027-uncasville-g5vvz_piu1phv | alex-warren | verify (applied) | 18773556 | https://seatgeek.com/alex-warren-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-08-7-30-pm/concert/18773556 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | verify (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | verify (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-tori-kelly-2027-denver-g5vzz_pmqeaxk | tori-kelly | verify (applied) | 18778574 | https://seatgeek.com/tori-kelly-tickets/denver-colorado-summit-music-hall-denver-2027-05-08-7-pm/concert/18778574 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-two-friends-2027-minneapolis-vv1akzk4jgkehfygr | two-friends | verify (applied) | 18757536 | https://seatgeek.com/two-friends-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-08-9-pm/concert/18757536 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwfa | john-mayer | verify (applied) | 18659118 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-08-8-pm/concert/18659118 | - |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | meshuggah | verify (applied) | 18709209 | https://seatgeek.com/meshuggah-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2027-05-09-7-pm/concert/18709209 | - |
| tm-noah-kahan-2027-norman-z7r9jz1aa7wuw | noah-kahan | verify (applied) | 18728705 | https://seatgeek.com/noah-kahan-tickets/norman-oklahoma-gaylord-family-oklahoma-memorial-stadium-2027-05-09-6-30-pm/concert/18728705 | - |
| tm-tori-kelly-2027-salt-lake-city-g5vzz_pw0n4ot | tori-kelly | verify (applied) | 18778576 | https://seatgeek.com/tori-kelly-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-05-09-7-pm/concert/18778576 | - |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | def-leppard | verify (applied) | 18662421 | https://seatgeek.com/def-leppard-tickets/seattle-washington-climate-pledge-arena-2027-05-09-7-pm/concert/18662421 | - |
| tm-jhene-aiko-2027-sacramento-g5vyz_psayvgp | jhene-aiko | verify (applied) | 18783909 | https://seatgeek.com/jhene-aiko-tickets/sacramento-california-golden-1-center-2027-05-09-7-30-pm/concert/18783909 | - |
| tm-marc-anthony-2027-anaheim-vv170z_fgkmcohlk | marc-anthony | verify (applied) | 18753494 | https://seatgeek.com/marc-anthony-tickets/anaheim-california-honda-center-2027-05-09-8-pm/concert/18753494 | - |
| tm-sam-fender-2027-vancouver-16ozk4ekdza2k2ve | sam-fender | verify (applied) | 18760797 | https://seatgeek.com/sam-fender-tickets/vancouver-canada-rogers-arena-2027-05-09-8-pm/concert/18760797 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | remi-wolf | verify (applied) | 18664784 | https://seatgeek.com/remi-wolf-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-10-8-pm/concert/18664784 | - |
| tm-alex-warren-2027-raleigh-g5evz_pmr-wuh | alex-warren | verify (applied) | 18773557 | https://seatgeek.com/alex-warren-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-05-11-7-40-pm/concert/18773557 | - |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | queens-of-the-stone-age | verify (applied) | 18475187 | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | remi-wolf | verify (applied) | 18664787 | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | two-door-cinema-club | verify (applied) | 18711220 | https://seatgeek.com/two-door-cinema-club-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-11-7-30-pm/concert/18711220 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-noah-kahan-2027-houston-g5diz_4wkxf3f | noah-kahan | verify (applied) | 18728704 | https://seatgeek.com/noah-kahan-tickets/houston-texas-reliant-stadium-2027-05-12-6-30-pm/concert/18728704 | - |
| tm-kings-of-leon-2027-philadelphia-vv1aezk4xgkdfbii2 | kings-of-leon | verify (applied) | 18746640 | https://seatgeek.com/kings-of-leon-tickets/philadelphia-pennsylvania-td-pavilion-at-the-mann-center-2027-05-12-7-30-pm/concert/18746640 | - |
| tm-alex-warren-2027-charleston-g5evz_pwy4cww | alex-warren | verify (applied) | 18773559 | https://seatgeek.com/alex-warren-tickets/charleston-south-carolina-credit-one-stadium-2027-05-12-7-30-pm/concert/18773559 | - |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | queens-of-the-stone-age | verify (applied) | 18709238 | https://seatgeek.com/queens-of-the-stone-age-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-12-6-30-pm/concert/18709238 | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | remi-wolf | verify (applied) | 18664791 | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 | - |
| tm-jhene-aiko-2027-portland-vvg1hz_pr1sldf | jhene-aiko | verify (applied) | 18783913 | https://seatgeek.com/jhene-aiko-tickets/portland-oregon-moda-center-2027-05-12-7-30-pm/concert/18783913 | - |
| tm-tori-kelly-2027-vancouver-1av7z_pgkwlyauw | tori-kelly | verify (applied) | 18778581 | https://seatgeek.com/tori-kelly-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-05-12-7-pm/concert/18778581 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwf6 | john-mayer | verify (applied) | 18659120 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-12-8-pm/concert/18659120 | - |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | verify (applied) | 18694629 | https://seatgeek.com/haiden-henderson-tickets/portland-oregon-hawthorne-theatre-2027-05-12-8-pm/concert/18694629 | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | verify (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | verify (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-marc-anthony-2027-denver-g5vzz_fdioiid | marc-anthony | verify (applied) | 18753497 | https://seatgeek.com/marc-anthony-tickets/denver-colorado-ball-arena-2027-05-13-8-pm/concert/18753497 | - |
| tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw | jhene-aiko | verify (applied) | 18783915 | https://seatgeek.com/jhene-aiko-tickets/seattle-washington-climate-pledge-arena-2027-05-13-7-30-pm/concert/18783915 | - |
| tm-tori-kelly-2027-seattle-z7r9jz1aaafgn | tori-kelly | verify (applied) | 18778959 | https://seatgeek.com/tori-kelly-tickets/seattle-washington-showbox-sodo-2027-05-13-7-pm/concert/18778959 | - |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | queens-of-the-stone-age | verify (applied) | 18701766 | https://seatgeek.com/queens-of-the-stone-age-tickets/saint-paul-minnesota-grand-casino-arena-2027-05-14-6-30-pm/concert/18701766 | - |
| tm-kings-of-leon-2027-cuyahoga-falls-vv16azk4nouzac7agu | kings-of-leon | verify (applied) | 18746642 | https://seatgeek.com/kings-of-leon-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-14-7-30-pm/concert/18746642 | - |
| tm-alex-warren-2027-noblesville-vv17fz_pgkmuvbx2 | alex-warren | verify (applied) | 18773562 | https://seatgeek.com/alex-warren-tickets/noblesville-indiana-ruoff-music-center-2027-05-14-7-30-pm/concert/18773562 | - |
| tm-travis-tritt-2027-northfield-vv1kfz_pfzg7zdfa | travis-tritt | verify (applied) | 18757257 | https://seatgeek.com/travis-tritt-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-14-8-pm/concert/18757257 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | verify (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-interpol-2027-los-angeles-vvg1iz_pmocxuu | interpol | verify (applied) | 18780190 | https://seatgeek.com/interpol-tickets/los-angeles-california-bmo-stadium-2027-05-14-6-pm/concert/18780190 | - |
| tm-megadeth-2027-albuquerque-g5vzz_pwxigv1 | megadeth | verify (applied) | 18778362 | https://seatgeek.com/megadeth-tickets/albuquerque-new-mexico-first-financial-credit-union-amphitheater-2027-05-14-7-pm/concert/18778362 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | verify (applied) | 18809827 | https://seatgeek.com/haiden-henderson-tickets/san-francisco-california-brick-and-mortar-music-hall-2027-05-14-8-pm/concert/18809827 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zufa | john-mayer | verify (applied) | 18659129 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-14-8-pm/concert/18659129 | - |
| tm-calvin-harris-2027-seattle-vvg1hz_fjlgmb1 | calvin-harris | verify (applied) | 18674849 | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-14-8-pm/concert/18674849 | - |
| tm-tori-kelly-2027-portland-z7r9jz1aaafff | tori-kelly | verify (applied) | 18778961 | https://seatgeek.com/tori-kelly-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-05-14-7-pm/concert/18778961 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | verify (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-noah-kahan-2027-austin-z7r9jz1aa7wob | noah-kahan | verify (applied) | 18728715 | https://seatgeek.com/noah-kahan-tickets/austin-texas-darrell-k-royal-texas-memorial-stadium-2027-05-15-6-30-pm/concert/18728715 | - |
| tm-two-friends-2027-chicago-vv1a7zkfwgkdmtcgf | two-friends | verify (applied) | 18612569 | https://seatgeek.com/two-friends-tickets/chicago-illinois-huntington-bank-pavilion-at-northerly-island-2027-05-15-6-30-pm/concert/18612569 | - |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | fantasia | verify (applied) | 18631687 | https://seatgeek.com/fantasia-tickets/detroit-michigan-little-caesars-arena-2027-05-15-8-pm/concert/18631687 | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | carly-rae-jepsen | verify (applied) | 18639037 | https://seatgeek.com/carly-rae-jepsen-tickets/new-york-new-york-madison-square-garden-2027-05-15-7-30-pm/concert/18639037 | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | ha-ash | verify (applied) | 18608854 | https://seatgeek.com/ha-ash-tickets/hidalgo-texas-payne-arena-2027-05-15-8-pm/concert/18608854 | - |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | a-perfect-circle | verify (applied) | 18632533 | https://seatgeek.com/a-perfect-circle-tickets/nashville-tennessee-bridgestone-arena-2027-05-15-8-pm/concert/18632533 | - |
| tm-blondshell-2027-madison-vv1kvyvpc_ga55f1w | blondshell | verify (applied) | 18633499 | https://seatgeek.com/blondshell-tickets/madison-wisconsin-majestic-theatre-wi-2027-05-15-8-pm/concert/18633499 | - |
| tm-the-neighbourhood-2027-edmonton-1av7z_4gkl6qbrx | the-neighbourhood | verify (applied) | 18726928 | https://seatgeek.com/the-neighbourhood-tickets/edmonton-canada-rogers-place-2027-05-15-7-pm/concert/18726928 | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | too-many-zooz | verify (applied) | 18646948 | https://seatgeek.com/too-many-zooz-tickets/vancouver-canada-the-pearl-bc-2027-05-15-7-pm/concert/18646948 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | santana | verify (applied) | 18628836 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-15-7-pm/concert/18628836 | - |
| tm-megadeth-2027-phoenix-1av0z_pgknttpbb | megadeth | verify (applied) | 18778361 | https://seatgeek.com/megadeth-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-05-15-7-pm/concert/18778361 | - |
| tm-jhene-aiko-2027-vancouver-1av7z_pgkwqspc7 | jhene-aiko | verify (applied) | 18783923 | https://seatgeek.com/jhene-aiko-tickets/vancouver-canada-rogers-arena-2027-05-15-7-30-pm/concert/18783923 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqf5 | john-mayer | verify (applied) | 18659130 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-15-8-pm/concert/18659130 | - |
| tm-calvin-harris-2027-seattle-vvg1hz_48c3k9c | calvin-harris | verify (applied) | 18708080 | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-15-8-pm/concert/18708080 | - |
| tm-queens-of-the-stone-age-2027-rosemont-vv1kvzvpfygacy0ah | queens-of-the-stone-age | verify (applied) | 18709223 | https://seatgeek.com/queens-of-the-stone-age-tickets/rosemont-illinois-allstate-arena-2027-05-16-6-30-pm/concert/18709223 | - |
| tm-alex-warren-2027-birmingham-1aezz_pgkmbd7bp | alex-warren | verify (applied) | 18773565 | https://seatgeek.com/alex-warren-tickets/birmingham-alabama-coca-cola-amphitheater-2027-05-16-7-30-pm/concert/18773565 | - |
| tm-ha-ash-2027-houston-g5diz_kkygldl | ha-ash | verify (applied) | 18608855 | https://seatgeek.com/ha-ash-tickets/houston-texas-713-music-hall-2027-05-16-8-pm/concert/18608855 | - |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | def-leppard | verify (applied) | 18662464 | https://seatgeek.com/def-leppard-tickets/edmonton-canada-rogers-place-2027-05-16-7-pm/concert/18662464 | - |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | remi-wolf | verify (applied) | 18664789 | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 | - |
| tm-niall-horan-2027-denver-g5vzz_1lspoiu | niall-horan | verify (applied) | 18235553 | https://seatgeek.com/niall-horan-tickets/denver-colorado-ball-arena-2027-05-16-7-30-pm/concert/18235553 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | santana | verify (applied) | 18628837 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-16-7-pm/concert/18628837 | - |
| tm-marc-anthony-2027-san-francisco-g5vyz_4uwqlns | marc-anthony | verify (applied) | 18753501 | https://seatgeek.com/marc-anthony-tickets/san-francisco-california-chase-center-2027-05-16-8-pm/concert/18753501 | - |
| tm-blondshell-2027-detroit-vv1afzkfmgkdgjzny | blondshell | verify (applied) | 18633500 | https://seatgeek.com/blondshell-tickets/detroit-michigan-saint-andrews-hall-2027-05-17-6-pm/concert/18633500 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-hazlett-2027-kansas-city-vvg1bz_c1yj_ec | hazlett | verify (applied) | 18649797 | https://seatgeek.com/hazlett-tickets/kansas-city-missouri-madrid-theatre-1-2027-05-17-8-pm/concert/18649797 | - |
| tm-two-door-cinema-club-2027-seattle-vvg1hz_4ppr1wj | two-door-cinema-club | verify (applied) | 18711331 | https://seatgeek.com/two-door-cinema-club-tickets/seattle-washington-paramount-theatre-wa-2027-05-17-7-30-pm/concert/18711331 | - |
| tm-queens-of-the-stone-age-2027-indianapolis-vv1aazk4fgkd2j1lw | queens-of-the-stone-age | verify (applied) | 18709226 | https://seatgeek.com/queens-of-the-stone-age-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-18-6-30-pm/concert/18709226 | - |
| tm-the-warning-2027-brooklyn-k7vgf_3iu7xhd | the-warning | verify (applied) | 18591270 | https://seatgeek.com/the-warning-tickets/brooklyn-new-york-brooklyn-paramount-2027-05-18-7-pm/concert/18591270 | - |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | carly-rae-jepsen | verify (applied) | 18639041 | https://seatgeek.com/carly-rae-jepsen-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-05-18-7-30-pm/concert/18639041 | - |
| tm-metallica-2027-el-paso-vvg1yz_3zjrn4d | metallica | verify (applied) | 18595088 | https://seatgeek.com/metallica-tickets/el-paso-texas-sun-bowl-stadium-2027-05-18-6-pm/concert/18595088 | - |
| tm-the-airborne-toxic-event-2027-charlotte-g5evz_1nj2twb | the-airborne-toxic-event | verify (applied) | 18252642 | https://seatgeek.com/the-airborne-toxic-event-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-05-18-8-pm/concert/18252642 | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | verify (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-blondshell-2027-cleveland-vv1aazk4pgkduzdwy | blondshell | verify (applied) | 18738820 | https://seatgeek.com/blondshell-tickets/cleveland-ohio-the-odeon-concert-club-2027-05-18-8-pm/concert/18738820 | - |
| tm-niall-horan-2027-west-valley-city-g5vzz_1xafaiw | niall-horan | verify (applied) | 18235554 | https://seatgeek.com/niall-horan-tickets/west-valley-city-utah-maverik-center-2027-05-18-7-30-pm/concert/18235554 | - |
| tm-megadeth-2027-chula-vista-vvg1iz_pjb5pwc | megadeth | verify (applied) | 18778358 | https://seatgeek.com/megadeth-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-05-18-7-pm/concert/18778358 | - |
| tm-queens-of-the-stone-age-2027-columbus-vv1kv8vp4agacm7ii | queens-of-the-stone-age | verify (applied) | 18709227 | https://seatgeek.com/queens-of-the-stone-age-tickets/columbus-ohio-nationwide-arena-2027-05-19-6-30-pm/concert/18709227 | - |
| tm-a-perfect-circle-2027-elizabethtown-1avbz_pgkucnyj0 | a-perfect-circle | verify (applied) | 18784729 | https://seatgeek.com/a-perfect-circle-tickets/elizabethtown-kentucky-steelgrove-amphitheater-2027-05-19-7-pm/concert/18784729 | - |
| tm-carly-rae-jepsen-2027-boston-vv177z_kgklscrut | carly-rae-jepsen | verify (applied) | 18639042 | https://seatgeek.com/carly-rae-jepsen-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-19-7-30-pm/concert/18639042 | - |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | verify (applied) | 18271150 | https://seatgeek.com/the-airborne-toxic-event-tickets/glenside-pennsylvania-keswick-theatre-2027-05-19-8-pm/concert/18271150 | - |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | ha-ash | verify (applied) | 18608856 | https://seatgeek.com/ha-ash-tickets/new-york-new-york-united-palace-theatre-2027-05-19-8-pm/concert/18608856 | - |
| tm-jhene-aiko-2027-west-valley-city-g5vzz_ps36muq | jhene-aiko | verify (applied) | 18783917 | https://seatgeek.com/jhene-aiko-tickets/west-valley-city-utah-maverik-center-2027-05-19-7-30-pm/concert/18783917 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | santana | verify (applied) | 18628843 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-19-7-pm/concert/18628843 | - |
| tm-remi-wolf-2027-bonner-g5vzz_flaijvz | remi-wolf | verify (applied) | 18664792 | https://seatgeek.com/remi-wolf-tickets/bonner-montana-kettlehouse-amphitheater-2027-05-19-8-pm/concert/18664792 | - |
| tm-megadeth-2027-inglewood-vv16azk4ev7zauakk1 | megadeth | verify (applied) | 18778360 | https://seatgeek.com/megadeth-tickets/inglewood-california-kia-forum-2027-05-19-7-pm/concert/18778360 | - |
| tm-two-door-cinema-club-2027-sacramento-g5vyz_46svaa8 | two-door-cinema-club | verify (applied) | 18711334 | https://seatgeek.com/two-door-cinema-club-tickets/sacramento-california-channel-24-sacramento-2027-05-19-8-pm/concert/18711334 | - |
| tm-the-airborne-toxic-event-2027-washington-17a8v0g61rlmtti | the-airborne-toxic-event | verify (applied) | 18251758 | https://seatgeek.com/the-airborne-toxic-event-tickets/washington-district-of-columbia-9-30-club-2027-05-20-7-pm/concert/18251758 | - |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | a-perfect-circle | verify (applied) | 18632537 | https://seatgeek.com/a-perfect-circle-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-20-7-30-pm/concert/18632537 | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | riley-green | verify (applied) | 18626525 | https://seatgeek.com/riley-green-tickets/tulsa-oklahoma-bok-center-2027-05-20-7-pm/concert/18626525 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-jon-pardi-2027-west-valley-city-g5vzz_2evjpcf | jon-pardi | verify (applied) | 18390278 | https://seatgeek.com/jon-pardi-tickets/west-valley-city-utah-maverik-center-2027-05-20-7-pm/concert/18390278 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | santana | verify (applied) | 18628844 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-20-7-pm/concert/18628844 | - |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | niall-horan | verify (applied) | 18235556 | https://seatgeek.com/niall-horan-tickets/phoenix-arizona-mortgage-matchup-center-2027-05-20-7-30-pm/concert/18235556 | - |
| tm-calvin-harris-2027-anaheim-vv1aazk44gkdgr8bi | calvin-harris | verify (applied) | 18709501 | https://seatgeek.com/calvin-harris-tickets/anaheim-california-honda-center-2027-05-20-8-pm/concert/18709501 | - |
| tm-two-door-cinema-club-2027-oakland-g5vyz_48x4wje | two-door-cinema-club | verify (applied) | 18711335 | https://seatgeek.com/two-door-cinema-club-tickets/oakland-california-fox-theater-oakland-2027-05-20-8-pm/concert/18711335 | - |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | the-airborne-toxic-event | verify (applied) | 18252225 | https://seatgeek.com/the-airborne-toxic-event-tickets/new-york-new-york-irving-plaza-2027-05-21-7-pm/concert/18252225 | - |
| tm-two-friends-2027-detroit-z7r9jz1aaa6pk | two-friends | verify (applied) | 18758783 | https://seatgeek.com/two-friends-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-05-21-7-30-pm/concert/18758783 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | harry-styles | verify (applied) | 18579683 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-21-7-45-pm/concert/18579683 | - |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | ha-ash | verify (applied) | 18608857 | https://seatgeek.com/ha-ash-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-21-8-pm/concert/18608857 | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | fantasia | verify (applied) | 18629235 | https://seatgeek.com/fantasia-tickets/providence-rhode-island-amica-mutual-pavilion-2027-05-21-8-pm/concert/18629235 | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | riley-green | verify (applied) | 18626526 | https://seatgeek.com/riley-green-tickets/dallas-texas-dos-equis-pavilion-2027-05-21-7-pm/concert/18626526 | - |
| tm-travis-tritt-2027-waterloo-k7vgf_29lrc4r | travis-tritt | verify (applied) | 18757506 | https://seatgeek.com/travis-tritt-tickets/waterloo-new-york-the-vine-at-del-lago-resort-and-casino-2027-05-21-8-pm/concert/18757506 | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | carly-rae-jepsen | verify (applied) | 18639045 | https://seatgeek.com/carly-rae-jepsen-tickets/chicago-illinois-the-chicago-theatre-2027-05-21-7-30-pm/concert/18639045 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-noah-kahan-2027-las-vegas-1avjz_4gkrmeou0 | noah-kahan | verify (applied) | 18728719 | https://seatgeek.com/noah-kahan-tickets/las-vegas-nevada-allegiant-stadium-2027-05-21-6-30-pm/concert/18728719 | - |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | hazlett | verify (applied) | 18319961 | https://seatgeek.com/hazlett-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-05-21-7-30-pm/concert/18319961 | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_fqlbaqn | calvin-harris | verify (applied) | 18674853 | https://seatgeek.com/calvin-harris-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-21-7-pm/concert/18674853 | - |
| tm-megadeth-2027-ridgefield-vvg1hz_pj4m0zq | megadeth | verify (applied) | 18778363 | https://seatgeek.com/megadeth-tickets/ridgefield-washington-cascades-amphitheater-2027-05-21-7-pm/concert/18778363 | - |
| tm-jhene-aiko-2027-los-angeles-g5eyz_pusyoov | jhene-aiko | verify (applied) | 18783918 | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-21-7-30-pm/concert/18783918 | - |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | remi-wolf | verify (applied) | 18664793 | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 | - |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | kenny-chesney | verify (applied) | 18591994 | https://seatgeek.com/kenny-chesney-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-05-22-4-30-pm/concert/18591994 | - |
| tm-queens-of-the-stone-age-2027-detroit-vv1kezvp4_gagidyd | queens-of-the-stone-age | verify (applied) | 18709231 | https://seatgeek.com/queens-of-the-stone-age-tickets/detroit-michigan-little-caesars-arena-2027-05-22-6-30-pm/concert/18709231 | - |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | metallica | verify (applied) | 18595099 | https://seatgeek.com/metallica-tickets/san-antonio-texas-alamodome-2027-05-22-6-pm/concert/18595099 | - |
| tm-travis-tritt-2027-charles-town-1a4zk4ngkdpzfky | travis-tritt | verify (applied) | 18756742 | https://seatgeek.com/travis-tritt-tickets/charles-town-west-virginia-hollywood-casino-at-charles-town-races-2027-05-22-7-pm/concert/18756742 | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | carly-rae-jepsen | verify (applied) | 18639046 | https://seatgeek.com/carly-rae-jepsen-tickets/detroit-michigan-fox-theatre-detroit-2027-05-22-7-30-pm/concert/18639046 | - |
| tm-two-friends-2027-ottawa-1aszk4xgkdbc6bg | two-friends | verify (applied) | 18757902 | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-22-7-30-pm/concert/18757902 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | harry-styles | verify (applied) | 18579676 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-22-7-45-pm/concert/18579676 | - |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | ha-ash | verify (applied) | 18608864 | https://seatgeek.com/ha-ash-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-05-22-8-pm/concert/18608864 | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | fantasia | verify (applied) | 18629280 | https://seatgeek.com/fantasia-tickets/newark-new-jersey-prudential-center-2027-05-22-8-pm/concert/18629280 | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | riley-green | verify (applied) | 18626529 | https://seatgeek.com/riley-green-tickets/lafayette-louisiana-cajundome-2027-05-22-7-pm/concert/18626529 | - |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | the-airborne-toxic-event | verify (applied) | 18252179 | https://seatgeek.com/the-airborne-toxic-event-tickets/boston-massachusetts-orpheum-theatre-boston-2027-05-22-8-pm/concert/18252179 | - |
| tm-bryan-adams-2027-niagara-falls-16vzz_p36g7nu6g | bryan-adams | verify (applied) | 18754879 | https://seatgeek.com/bryan-adams-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-05-22-8-pm/concert/18754879 | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | a-perfect-circle | verify (applied) | 18632538 | https://seatgeek.com/a-perfect-circle-tickets/chicago-illinois-wintrust-arena-2027-05-22-8-pm/concert/18632538 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | santana | verify (applied) | 18628845 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-22-7-pm/concert/18628845 | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_4dbvmwb | calvin-harris | verify (applied) | 18702242 | https://seatgeek.com/calvin-harris-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-22-7-pm/concert/18702242 | - |
| tm-megadeth-2027-auburn-vvg1hz_ph-ktdl | megadeth | verify (applied) | 18778359 | https://seatgeek.com/megadeth-tickets/auburn-washington-white-river-amphitheatre-2027-05-22-7-pm/concert/18778359 | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | niall-horan | verify (applied) | 18235557 | https://seatgeek.com/niall-horan-tickets/inglewood-california-kia-forum-2027-05-22-7-30-pm/concert/18235557 | - |
| tm-jhene-aiko-2027-los-angeles-g5eyz_9ditouk | jhene-aiko | verify (applied) | 18841805 | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-22-7-30-pm/concert/18841805 | - |
| tm-remi-wolf-2027-seattle-vvg1hz_fqhwypl | remi-wolf | verify (applied) | 18664798 | https://seatgeek.com/remi-wolf-tickets/seattle-washington-wamu-theater-2027-05-22-8-pm/concert/18664798 | - |
| tm-two-friends-2027-ottawa-1ad7z_pgkgxjwbt | two-friends | verify (applied) | 18774332 | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-23-6-30-pm/concert/18774332 | - |
| tm-kings-of-leon-2027-clarkston-vv1afzk4pgkdf_fbn | kings-of-leon | verify (applied) | 18746648 | https://seatgeek.com/kings-of-leon-tickets/clarkston-michigan-pine-knob-music-theatre-2027-05-23-7-30-pm/concert/18746648 | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | the-warning | verify (applied) | 18591764 | https://seatgeek.com/the-warning-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-23-8-pm/concert/18591764 | - |
| tm-air-supply-2027-saint-louis-vv1akzkftgkdvwrkv | air-supply | verify (applied) | 18653998 | https://seatgeek.com/air-supply-tickets/saint-louis-missouri-river-city-casino-2027-05-23-7-pm/concert/18653998 | - |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | a-perfect-circle | verify (applied) | 18632539 | https://seatgeek.com/a-perfect-circle-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-23-7-pm/concert/18632539 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | santana | verify (applied) | 18628846 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-23-7-pm/concert/18628846 | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_45bbb-k | calvin-harris | verify (applied) | 18702292 | https://seatgeek.com/calvin-harris-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-23-7-pm/concert/18702292 | - |
| tm-queens-of-the-stone-age-2027-boston-vv1avzk43gkdss-xl | queens-of-the-stone-age | verify (applied) | 18709234 | https://seatgeek.com/queens-of-the-stone-age-tickets/boston-massachusetts-td-garden-2027-05-24-6-30-pm/concert/18709234 | - |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | the-airborne-toxic-event | verify (applied) | 18251603 | https://seatgeek.com/the-airborne-toxic-event-tickets/cleveland-ohio-house-of-blues-cleveland-2027-05-24-7-pm/concert/18251603 | - |
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | two-door-cinema-club | verify (applied) | 18711341 | https://seatgeek.com/two-door-cinema-club-tickets/del-mar-california-the-sound-del-mar-2027-05-24-7-30-pm/concert/18711341 | - |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | carly-rae-jepsen | verify (applied) | 18639055 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-25-7-30-pm/concert/18639055 | - |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | the-airborne-toxic-event | verify (applied) | 18251734 | https://seatgeek.com/the-airborne-toxic-event-tickets/detroit-michigan-saint-andrews-hall-2027-05-25-7-pm/concert/18251734 | - |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | zach-bryan | verify (applied) | 18686630 | https://seatgeek.com/zach-bryan-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-05-25-7-pm/concert/18686630 | - |
| tm-kings-of-leon-2027-bridgeport-g5vvz_pclhssb | kings-of-leon | verify (applied) | 18746650 | https://seatgeek.com/kings-of-leon-tickets/bridgeport-connecticut-hartford-healthcare-amphitheater-2027-05-25-7-30-pm/concert/18746650 | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | niall-horan | verify (applied) | 18235559 | https://seatgeek.com/niall-horan-tickets/san-francisco-california-chase-center-2027-05-25-7-30-pm/concert/18235559 | - |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | hazlett | verify (applied) | 18311990 | https://seatgeek.com/hazlett-tickets/seattle-washington-neptune-theatre-wa-2027-05-25-8-pm/concert/18311990 | - |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | carly-rae-jepsen | verify (applied) | 18657110 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-26-6-30-pm/concert/18657110 | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | metallica | verify (applied) | 18595089 | https://seatgeek.com/metallica-tickets/fayetteville-arkansas-razorback-stadium-2027-05-26-6-pm/concert/18595089 | - |
| tm-noah-kahan-2027-madison-z7r9jz1aa7w8x | noah-kahan | verify (applied) | 18728720 | https://seatgeek.com/noah-kahan-tickets/madison-wisconsin-camp-randall-stadium-2027-05-26-6-30-pm/concert/18728720 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-megadeth-2027-morrison-z7r9jz1aaa3_o | megadeth | verify (applied) | 18778371 | https://seatgeek.com/megadeth-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-26-7-pm/concert/18778371 | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | hazlett | verify (applied) | 18388253 | https://seatgeek.com/hazlett-tickets/vancouver-canada-commodore-ballroom-2027-05-26-7-pm/concert/18388253 | - |
| tm-calvin-harris-2027-inglewood-vv1f0z_48vcazd8d1 | calvin-harris | verify (applied) | 18708087 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-26-8-pm/concert/18708087 | - |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | the-airborne-toxic-event | verify (applied) | 18252640 | https://seatgeek.com/the-airborne-toxic-event-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-05-27-7-pm/concert/18252640 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | fkj | verify (applied) | 18281838 | https://seatgeek.com/fkj-tickets/chicago-illinois-the-salt-shed-outdoors-2027-05-27-8-pm/concert/18281838 | - |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | two-door-cinema-club | verify (applied) | 18711344 | https://seatgeek.com/two-door-cinema-club-tickets/austin-texas-united-heritage-hall-2027-05-27-8-pm/concert/18711344 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | niall-horan | verify (applied) | 18235558 | https://seatgeek.com/niall-horan-tickets/seattle-washington-climate-pledge-arena-2027-05-27-7-30-pm/concert/18235558 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk4fgkebghyq | calvin-harris | verify (applied) | 18674854 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-27-8-pm/concert/18674854 | - |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | carly-rae-jepsen | verify (applied) | 18639058 | https://seatgeek.com/carly-rae-jepsen-tickets/ottawa-canada-history-ottawa-2027-05-28-7-30-pm/concert/18639058 | - |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | fkj | verify (applied) | 18281790 | https://seatgeek.com/fkj-tickets/toronto-canada-history-2027-05-28-8-pm/concert/18281790 | - |
| tm-megadeth-2027-tinley-park-vv1a7zk4tgkdt6btl | megadeth | verify (applied) | 18778375 | https://seatgeek.com/megadeth-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-05-28-7-pm/concert/18778375 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | harry-styles | verify (applied) | 18579673 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-28-7-45-pm/concert/18579673 | - |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | a-perfect-circle | verify (applied) | 18632545 | https://seatgeek.com/a-perfect-circle-tickets/west-valley-city-utah-maverik-center-2027-05-28-7-30-pm/concert/18632545 | - |
| tm-two-friends-2027-washington-1a4zk4t-ngzze8d | two-friends | verify (applied) | 18757168 | https://seatgeek.com/two-friends-tickets/washington-district-of-columbia-echostage-2027-05-28-10-pm/concert/18757168 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd68xic | calvin-harris | verify (applied) | 18699754 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-28-8-pm/concert/18699754 | - |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | kenny-chesney | verify (applied) | 18591992 | https://seatgeek.com/kenny-chesney-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-29-4-30-pm/concert/18591992 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo7 | noah-kahan | verify (applied) | 18728723 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-05-29-6-pm/concert/18728723 | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | luke-combs | verify (applied) | 18493413 | https://seatgeek.com/luke-combs-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-05-29-5-20-pm/concert/18493413 | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | metallica | verify (applied) | 18595091 | https://seatgeek.com/metallica-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-29-6-pm/concert/18595091 | - |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | zach-bryan | verify (applied) | 18686629 | https://seatgeek.com/zach-bryan-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-29-7-pm/concert/18686629 | - |
| tm-cody-johnson-2027-gilford-vv177z_pgksxdnvq | cody-johnson | verify (applied) | 18784858 | https://seatgeek.com/cody-johnson-tickets/gilford-new-hampshire-banknh-pavilion-2027-05-29-7-pm/concert/18784858 | - |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | carly-rae-jepsen | verify (applied) | 18639059 | https://seatgeek.com/carly-rae-jepsen-tickets/montreal-canada-mtelus-2027-05-29-7-30-pm/concert/18639059 | - |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | def-leppard | verify (applied) | 18662426 | https://seatgeek.com/def-leppard-tickets/san-antonio-texas-frost-bank-center-2027-05-29-7-pm/concert/18662426 | - |
| tm-two-friends-2027-boston-vv1avzk4xgkddw012 | two-friends | verify (applied) | 18757722 | https://seatgeek.com/two-friends-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-29-8-pm/concert/18757722 | - |
| tm-megadeth-2027-shakopee-1ae7z_pgkcukysu | megadeth | verify (applied) | 18778376 | https://seatgeek.com/megadeth-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-29-7-pm/concert/18778376 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | harry-styles | verify (applied) | 18579687 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-29-7-45-pm/concert/18579687 | - |
| tm-flans-2027-houston-g5diz_k6-kevr | flans | verify (applied) | 18612653 | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 | - |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | two-door-cinema-club | verify (applied) | 18711349 | https://seatgeek.com/two-door-cinema-club-tickets/dallas-texas-the-bomb-factory-dallas-2027-05-29-8-pm/concert/18711349 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | niall-horan | verify (applied) | 18235566 | https://seatgeek.com/niall-horan-tickets/vancouver-canada-rogers-arena-2027-05-29-7-30-pm/concert/18235566 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd6fcij | calvin-harris | verify (applied) | 18702244 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-29-8-pm/concert/18702244 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wof | noah-kahan | verify (applied) | 18728725 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-05-30-6-pm/concert/18728725 | - |
| tm-kings-of-leon-2027-bethel-k7vgf_pkjzmnn | kings-of-leon | verify (applied) | 18746656 | https://seatgeek.com/kings-of-leon-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-05-30-7-30-pm/concert/18746656 | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | flans | verify (applied) | 18613121 | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 | - |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | a-perfect-circle | verify (applied) | 18632547 | https://seatgeek.com/a-perfect-circle-tickets/seattle-washington-climate-pledge-arena-2027-05-30-7-30-pm/concert/18632547 | - |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | fkj | verify (applied) | 18281480 | https://seatgeek.com/fkj-tickets/montreal-canada-mtelus-2027-05-31-8-pm/concert/18281480 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | harry-styles | verify (applied) | 18593728 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-31-7-45-pm/concert/18593728 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo4 | noah-kahan | verify (applied) | 18728724 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-06-01-6-pm/concert/18728724 | - |
| tm-fkj-2027-boston-vvg17z_5ryet2j | fkj | verify (applied) | 18281797 | https://seatgeek.com/fkj-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-06-01-8-pm/concert/18281797 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | a-perfect-circle | verify (applied) | 18632548 | https://seatgeek.com/a-perfect-circle-tickets/portland-oregon-veterans-memorial-coliseum-2-2027-06-01-7-30-pm/concert/18632548 | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | hazlett | verify (applied) | 18311898 | https://seatgeek.com/hazlett-tickets/san-francisco-california-august-hall-2027-06-01-8-pm/concert/18311898 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo9 | noah-kahan | verify (applied) | 18728726 | https://seatgeek.com/noah-kahan-tickets/boston-massachusetts-fenway-park-2027-06-02-6-pm/concert/18728726 | - |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | zach-bryan | verify (applied) | 18686638 | https://seatgeek.com/zach-bryan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-02-7-pm/concert/18686638 | - |
| tm-megadeth-2027-grand-rapids-vv17oz_pgkmgtnqb | megadeth | verify (applied) | 18778377 | https://seatgeek.com/megadeth-tickets/grand-rapids-michigan-acrisure-amphitheater-2027-06-02-7-pm/concert/18778377 | - |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | tommy-emmanuel | verify (applied) | 18703617 | https://seatgeek.com/tommy-emmanuel-tickets/virginia-beach-virginia-sandler-center-for-the-performing-arts-2027-06-02-7-30-pm/concert/18703617 | - |
| tm-kings-of-leon-2027-toronto-16vzz_poyg7venm | kings-of-leon | verify (applied) | 18746695 | https://seatgeek.com/kings-of-leon-tickets/toronto-canada-rbc-amphitheatre-2027-06-02-7-30-pm/concert/18746695 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthyfka | jack-johnson | verify (applied) | 18738901 | https://seatgeek.com/jack-johnson-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-06-02-8-pm/concert/18738901 | - |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | fkj | verify (applied) | 18281671 | https://seatgeek.com/fkj-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-06-03-8-pm/concert/18281671 | - |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | riley-green | verify (applied) | 18626534 | https://seatgeek.com/riley-green-tickets/brandon-mississippi-brandon-amphitheater-2027-06-03-7-pm/concert/18626534 | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | def-leppard | verify (applied) | 18662428 | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 | - |
| tm-stray-kids-2027-arlington-z7r9jz1aaaapu | stray-kids | verify (applied) | 18633460 | https://seatgeek.com/stray-kids-tickets/arlington-texas-at-t-stadium-2027-06-03-7-30-pm/concert/18633460 | - |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | the-airborne-toxic-event | verify (applied) | 18251596 | https://seatgeek.com/the-airborne-toxic-event-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-06-03-7-pm/concert/18251596 | - |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | a-perfect-circle | verify (applied) | 18632549 | https://seatgeek.com/a-perfect-circle-tickets/reno-nevada-grand-sierra-resort-2027-06-03-8-pm/concert/18632549 | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | flans | verify (applied) | 18612662 | https://seatgeek.com/flans-tickets/san-jose-california-san-jose-civic-2027-06-03-8-pm/concert/18612662 | - |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthbfkc | jack-johnson | verify (applied) | 18738900 | https://seatgeek.com/jack-johnson-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-06-03-8-pm/concert/18738900 | - |
| tm-two-friends-2027-philadelphia-vv1aovp_fga1qsqx | two-friends | verify (applied) | 18757690 | https://seatgeek.com/two-friends-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-06-04-7-pm/concert/18757690 | - |
| tm-megadeth-2027-clarkston-vv17oz_pgks8s9m3 | megadeth | verify (applied) | 18778380 | https://seatgeek.com/megadeth-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-04-7-pm/concert/18778380 | - |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | fkj | verify (applied) | 18281667 | https://seatgeek.com/fkj-tickets/brooklyn-new-york-brooklyn-paramount-2027-06-04-8-pm/concert/18281667 | - |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | riley-green | verify (applied) | 18626535 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-04-7-pm/concert/18626535 | - |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5-7_e | billy-strings | verify (applied) | 18755199 | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-04-7-30-pm/concert/18755199 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | harry-styles | verify (applied) | 18592375 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-04-7-45-pm/concert/18592375 | - |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | a-perfect-circle | verify (applied) | 18632551 | https://seatgeek.com/a-perfect-circle-tickets/daly-city-california-cow-palace-daly-city-2027-06-04-7-pm/concert/18632551 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | kenny-chesney | verify (applied) | 18591993 | https://seatgeek.com/kenny-chesney-tickets/ames-iowa-midamerican-energy-field-at-jack-trice-stadium-2027-06-05-4-30-pm/concert/18591993 | - |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | metallica | verify (applied) | 18595098 | https://seatgeek.com/metallica-tickets/indianapolis-indiana-lucas-oil-stadium-2027-06-05-6-pm/concert/18595098 | - |
| tm-noah-kahan-2027-columbus-vv17fz_4gkshkqmo | noah-kahan | verify (applied) | 18728731 | https://seatgeek.com/noah-kahan-tickets/columbus-ohio-ohio-stadium-2027-06-05-6-30-pm/concert/18728731 | - |
| tm-two-friends-2027-brooklyn-z7r9jz1aaa6pa | two-friends | verify (applied) | 18758786 | https://seatgeek.com/two-friends-tickets/brooklyn-new-york-under-the-k-bridge-2027-06-05-7-pm/concert/18758786 | - |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | luke-combs | verify (applied) | 18493415 | https://seatgeek.com/luke-combs-tickets/vancouver-canada-bc-place-stadium-2027-06-05-5-20-pm/concert/18493415 | - |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | riley-green | verify (applied) | 18638997 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-05-7-pm/concert/18638997 | - |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | def-leppard | verify (applied) | 18662432 | https://seatgeek.com/def-leppard-tickets/milwaukee-wisconsin-fiserv-forum-2027-06-05-7-pm/concert/18662432 | - |
| tm-kings-of-leon-2027-shakopee-16-zk40-tza2vg27 | kings-of-leon | verify (applied) | 18746658 | https://seatgeek.com/kings-of-leon-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-06-05-7-pm/concert/18746658 | - |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5x7_7 | billy-strings | verify (applied) | 18755203 | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-05-7-30-pm/concert/18755203 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | harry-styles | verify (applied) | 18592376 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-05-7-45-pm/concert/18592376 | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | the-airborne-toxic-event | verify (applied) | 18408894 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-diego-california-humphreys-concerts-by-the-bay-2027-06-05-7-30-pm/concert/18408894 | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | hazlett | verify (applied) | 18312174 | https://seatgeek.com/hazlett-tickets/phoenix-arizona-the-van-buren-2027-06-05-8-pm/concert/18312174 | - |
| tm-kings-of-leon-2027-tinley-park-vv1kvzvpbygacp7l6 | kings-of-leon | verify (applied) | 18746660 | https://seatgeek.com/kings-of-leon-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-06-06-7-30-pm/concert/18746660 | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | the-airborne-toxic-event | verify (applied) | 18252665 | https://seatgeek.com/the-airborne-toxic-event-tickets/phoenix-arizona-the-van-buren-2027-06-06-7-30-pm/concert/18252665 | - |
| tm-megadeth-2027-burgettstown-1avbz_pgkwkmpmi | megadeth | verify (applied) | 18778386 | https://seatgeek.com/megadeth-tickets/burgettstown-pennsylvania-the-pavilion-at-star-lake-2027-06-07-7-pm/concert/18778386 | - |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | fkj | verify (applied) | 18281742 | https://seatgeek.com/fkj-tickets/washington-district-of-columbia-the-anthem-dc-2027-06-07-7-30-pm/concert/18281742 | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | def-leppard | verify (applied) | 18662434 | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 | - |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | metallica | verify (applied) | 18595100 | https://seatgeek.com/metallica-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-08-6-pm/concert/18595100 | - |
| tm-megadeth-2027-bristow-1avfz_pgknmlaeb | megadeth | verify (applied) | 18778388 | https://seatgeek.com/megadeth-tickets/bristow-virginia-jiffy-lube-live-2027-06-08-7-pm/concert/18778388 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | a-perfect-circle | verify (applied) | 18632556 | https://seatgeek.com/a-perfect-circle-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-06-08-8-pm/concert/18632556 | - |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | def-leppard | verify (applied) | 18662436 | https://seatgeek.com/def-leppard-tickets/louisville-kentucky-kfc-yum-center-2027-06-09-7-pm/concert/18662436 | - |
| tm-two-friends-2027-columbus-z7r9jz1aaa6ux | two-friends | verify (applied) | 18758787 | https://seatgeek.com/two-friends-tickets/columbus-ohio-kemba-live-2027-06-09-7-pm/concert/18758787 | - |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | fkj | verify (applied) | 18281290 | https://seatgeek.com/fkj-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-06-09-8-pm/concert/18281290 | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | the-airborne-toxic-event | verify (applied) | 18252184 | https://seatgeek.com/the-airborne-toxic-event-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-06-09-7-pm/concert/18252184 | - |
| tm-noah-kahan-2027-detroit-vv1koz_kr3g7cdve | noah-kahan | verify (applied) | 18728732 | https://seatgeek.com/noah-kahan-tickets/detroit-michigan-ford-field-2027-06-10-6-30-pm/concert/18728732 | - |
| tm-two-friends-2027-pittsburgh-z7r9jz1aaa6p7 | two-friends | verify (applied) | 18758794 | https://seatgeek.com/two-friends-tickets/pittsburgh-pennsylvania-stage-ae-2027-06-10-6-30-pm/concert/18758794 | - |
| tm-megadeth-2027-toronto-1avzz_pgksfsdba | megadeth | verify (applied) | 18778436 | https://seatgeek.com/megadeth-tickets/toronto-canada-rbc-amphitheatre-2027-06-10-7-pm/concert/18778436 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | a-perfect-circle | verify (applied) | 18632558 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-10-8-pm/concert/18632558 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | riley-green | verify (applied) | 18626560 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-11-7-pm/concert/18626560 | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | def-leppard | verify (applied) | 18662435 | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 | - |
| tm-two-friends-2027-newport-z7r9jz1aaa8fi | two-friends | verify (applied) | 18758795 | https://seatgeek.com/two-friends-tickets/newport-kentucky-megacorp-pavilion-2027-06-11-7-pm/concert/18758795 | - |
| tm-intocable-2027-miami-vvg1vz_pmzxge8 | intocable | verify (applied) | 18781154 | https://seatgeek.com/intocable-tickets/miami-florida-james-l-knight-center-2027-06-11-8-pm/concert/18781154 | - |
| tm-fkj-2027-houston-g5diz_5msvufk | fkj | verify (applied) | 18281428 | https://seatgeek.com/fkj-tickets/houston-texas-bayou-music-center-2027-06-11-8-pm/concert/18281428 | - |
| tm-cody-jinks-2027-modesto-g5vyz_4lc0uvr | cody-jinks | verify (applied) | 18754095 | https://seatgeek.com/cody-jinks-tickets/modesto-california-fruit-yard-amphitheater-2027-06-11-7-pm/concert/18754095 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | a-perfect-circle | verify (applied) | 18632560 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-11-8-pm/concert/18632560 | - |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | kenny-chesney | verify (applied) | 18591995 | https://seatgeek.com/kenny-chesney-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-06-12-4-30-pm/concert/18591995 | - |
| tm-noah-kahan-2027-orchard-park-vv17gz_4gksqg3zl | noah-kahan | verify (applied) | 18728735 | https://seatgeek.com/noah-kahan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-12-6-pm/concert/18728735 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | riley-green | verify (applied) | 18638999 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-12-7-pm/concert/18638999 | - |
| tm-hazlett-2027-austin-g5diz_kepkpyq | hazlett | verify (applied) | 18311909 | https://seatgeek.com/hazlett-tickets/austin-texas-scoot-inn-2027-06-12-7-pm/concert/18311909 | - |
| tm-megadeth-2027-mansfield-vv177z_pgkmjh1ou | megadeth | verify (applied) | 18778390 | https://seatgeek.com/megadeth-tickets/mansfield-massachusetts-xfinity-center-ma-2027-06-12-7-pm/concert/18778390 | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | luke-combs | verify (applied) | 18493400 | https://seatgeek.com/luke-combs-tickets/boise-idaho-albertsons-stadium-2027-06-12-5-45-pm/concert/18493400 | - |
| tm-two-friends-2027-cleveland-z7r9jz1aaa6c3 | two-friends | verify (applied) | 18758798 | https://seatgeek.com/two-friends-tickets/cleveland-ohio-jacobs-pavilion-at-nautica-2027-06-12-8-pm/concert/18758798 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6hbhj | kpop-demon-hunters | verify (applied) | 18839590 | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-13-2-pm/concert/18839590 | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | def-leppard | verify (applied) | 18662437 | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 | - |
| tm-megadeth-2027-camden-vv17fz_pgkmjnhj7 | megadeth | verify (applied) | 18778391 | https://seatgeek.com/megadeth-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-06-13-7-pm/concert/18778391 | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | a-perfect-circle | verify (applied) | 18632561 | https://seatgeek.com/a-perfect-circle-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-06-13-7-30-pm/concert/18632561 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | fkj | verify (applied) | 18281495 | https://seatgeek.com/fkj-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-06-14-8-pm/concert/18281495 | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | metallica | verify (applied) | 18595103 | https://seatgeek.com/metallica-tickets/cleveland-ohio-huntington-bank-field-2027-06-15-6-pm/concert/18595103 | - |
| tm-noah-kahan-2027-montreal-1aszk4pgkdjhrvf | noah-kahan | verify (applied) | 18728737 | https://seatgeek.com/noah-kahan-tickets/montreal-canada-parc-jean-drapeau-2027-06-15-6-30-pm/concert/18728737 | - |
| tm-megadeth-2027-new-york-g5diz_prtfsjt | megadeth | verify (applied) | 18778392 | https://seatgeek.com/megadeth-tickets/new-york-new-york-madison-square-garden-2027-06-15-7-pm/concert/18778392 | - |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbznja | kpop-demon-hunters | verify (applied) | 18838896 | https://seatgeek.com/kpop-demon-hunters-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-15-7-30-pm/concert/18838896 | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | the-airborne-toxic-event | verify (applied) | 18252158 | https://seatgeek.com/the-airborne-toxic-event-tickets/sacramento-california-ace-of-spades-2027-06-15-7-pm/concert/18252158 | - |
| tm-cody-jinks-2027-central-point-vvg1hz_pkp9lkp | cody-jinks | verify (applied) | 18754098 | https://seatgeek.com/cody-jinks-tickets/central-point-oregon-bi-mart-amphitheater-2027-06-15-7-pm/concert/18754098 | - |
| tm-two-friends-2027-raleigh-g5evz_p5qexa6 | two-friends | verify (applied) | 18756563 | https://seatgeek.com/two-friends-tickets/raleigh-north-carolina-the-ritz-raleigh-2027-06-16-7-pm/concert/18756563 | - |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbhbjx | kpop-demon-hunters | verify (applied) | 18772671 | https://seatgeek.com/kpop-demon-hunters-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-16-7-30-pm/concert/18772671 | - |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | lizzy-mcalpine | verify (applied) | 18619440 | https://seatgeek.com/lizzy-mcalpine-tickets/nashville-tennessee-bridgestone-arena-2027-06-16-7-pm/concert/18619440 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | def-leppard | verify (applied) | 18662442 | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 | - |
| tm-two-friends-2027-north-charleston-g5evz_p3scbo8 | two-friends | verify (applied) | 18757437 | https://seatgeek.com/two-friends-tickets/north-charleston-south-carolina-firefly-distillery-2027-06-17-7-pm/concert/18757437 | - |
| tm-megadeth-2027-charlotte-g5evz_pjm1iz7 | megadeth | verify (applied) | 18778393 | https://seatgeek.com/megadeth-tickets/charlotte-north-carolina-truliant-amphitheater-2027-06-17-7-pm/concert/18778393 | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | the-airborne-toxic-event | verify (applied) | 18251563 | https://seatgeek.com/the-airborne-toxic-event-tickets/los-angeles-california-the-wiltern-2027-06-17-7-pm/concert/18251563 | - |
| tm-cody-jinks-2027-eugene-z7r9jz1aaa837 | cody-jinks | verify (applied) | 18754104 | https://seatgeek.com/cody-jinks-tickets/eugene-oregon-cuthbert-amphitheater-2027-06-17-7-pm/concert/18754104 | - |
| tm-noah-kahan-2027-east-rutherford-k7vgf_4me3p-- | noah-kahan | verify (applied) | 18728736 | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-18-6-30-pm/concert/18728736 | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | lizzy-mcalpine | verify (applied) | 18619442 | https://seatgeek.com/lizzy-mcalpine-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-18-7-pm/concert/18619442 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | riley-green | verify (applied) | 18626536 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-18-7-pm/concert/18626536 | - |
| tm-megadeth-2027-alpharetta-vvg1zz_pnf8blb | megadeth | verify (applied) | 18778394 | https://seatgeek.com/megadeth-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-06-18-7-pm/concert/18778394 | - |
| tm-travis-tritt-2027-durham-g5evz_p2pdn7v | travis-tritt | verify (applied) | 18756343 | https://seatgeek.com/travis-tritt-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-06-18-7-30-pm/concert/18756343 | - |
| tm-two-friends-2027-charlotte-g5evz_pnwhvow | two-friends | verify (applied) | 18756441 | https://seatgeek.com/two-friends-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-06-18-8-pm/concert/18756441 | - |
| tm-cody-jinks-2027-spokane-vvg1hz_pqqx4vc | cody-jinks | verify (applied) | 18754105 | https://seatgeek.com/cody-jinks-tickets/spokane-washington-gesa-pavilion-2027-06-18-7-pm/concert/18754105 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | kenny-chesney | verify (applied) | 18592002 | https://seatgeek.com/kenny-chesney-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-19-4-30-pm/concert/18592002 | - |
| tm-noah-kahan-2027-east-rutherford-k7vgf_pevlzwu | noah-kahan | verify (applied) | 18755182 | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-19-6-30-pm/concert/18755182 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | riley-green | verify (applied) | 18639001 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-19-7-pm/concert/18639001 | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | def-leppard | verify (applied) | 18662443 | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 | - |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | luke-combs | verify (applied) | 18493411 | https://seatgeek.com/luke-combs-tickets/denver-colorado-empower-field-at-mile-high-2027-06-19-5-45-pm/concert/18493411 | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | metallica | verify (applied) | 18595107 | https://seatgeek.com/metallica-tickets/salt-lake-city-utah-rice-eccles-stadium-2027-06-19-6-pm/concert/18595107 | - |
| tm-two-friends-2027-atlanta-vvg1zz_phfqf4s | two-friends | verify (applied) | 18757120 | https://seatgeek.com/two-friends-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-06-19-8-pm/concert/18757120 | - |
| tm-stray-kids-2027-chicago-vv167zk4yjazaue56a | stray-kids | verify (applied) | 18792968 | https://seatgeek.com/stray-kids-tickets/chicago-illinois-soldier-field-2027-06-19-7-30-pm/concert/18792968 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-kpop-demon-hunters-2027-chicago-vv178z_pgkra4jvj | kpop-demon-hunters | verify (applied) | 18838894 | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-20-2-pm/concert/18838894 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | lizzy-mcalpine | verify (applied) | 18619443 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-20-7-pm/concert/18619443 | - |
| tm-megadeth-2027-the-woodlands-g5diz_penjw6e | megadeth | verify (applied) | 18778400 | https://seatgeek.com/megadeth-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-06-20-7-pm/concert/18778400 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | lizzy-mcalpine | verify (applied) | 18637280 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-21-7-pm/concert/18637280 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-stray-kids-2027-baltimore-z7r9jz1aaaapm | stray-kids | verify (applied) | 18731347 | https://seatgeek.com/stray-kids-tickets/baltimore-maryland-m-t-bank-stadium-2027-06-22-7-30-pm/concert/18731347 | - |
| tm-megadeth-2027-irving-vvg1yz_psnfnkd | megadeth | verify (applied) | 18778402 | https://seatgeek.com/megadeth-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-06-22-7-pm/concert/18778402 | - |
| tm-cody-jinks-2027-billings-z7r9jz1aaa6e_ | cody-jinks | verify (applied) | 18754110 | https://seatgeek.com/cody-jinks-tickets/billings-montana-downtown-billings-skatepark-2027-06-22-7-pm/concert/18754110 | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | def-leppard | verify (applied) | 18662446 | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 | - |
| tm-megadeth-2027-austin-g5diz_pevm_m_ | megadeth | verify (applied) | 18778404 | https://seatgeek.com/megadeth-tickets/austin-texas-germania-insurance-amphitheater-2027-06-23-6-pm/concert/18778404 | - |
| tm-kpop-demon-hunters-2027-indianapolis-vv1aazk40gkes_m63 | kpop-demon-hunters | verify (applied) | 18772668 | https://seatgeek.com/kpop-demon-hunters-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-06-23-7-30-pm/concert/18772668 | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | lizzy-mcalpine | verify (applied) | 18619444 | https://seatgeek.com/lizzy-mcalpine-tickets/new-york-new-york-madison-square-garden-2027-06-24-7-pm/concert/18619444 | - |
| tm-two-friends-2027-houston-z7r9jz1aaa6pd | two-friends | verify (applied) | 18758799 | https://seatgeek.com/two-friends-tickets/houston-texas-ductwork-houston-2027-06-24-9-pm/concert/18758799 | - |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | riley-green | verify (applied) | 18626537 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-25-7-pm/concert/18626537 | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | lizzy-mcalpine | verify (applied) | 18619445 | https://seatgeek.com/lizzy-mcalpine-tickets/columbia-maryland-merriweather-post-pavilion-2027-06-25-7-pm/concert/18619445 | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | def-leppard | verify (applied) | 18662447 | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 | - |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | yacht-rock-revue | verify (applied) | 18587856 | https://seatgeek.com/yacht-rock-revue-tickets/chicago-illinois-the-salt-shed-outdoors-2027-06-25-6-30-pm/concert/18587856 | - |
| tm-death-cab-for-cutie-2027-milwaukee-vv17jz_4gkdidvax | death-cab-for-cutie | verify (applied) | 18738391 | https://seatgeek.com/death-cab-for-cutie-tickets/milwaukee-wisconsin-bmo-pavilion-2027-06-25-7-pm/concert/18738391 | - |
| tm-two-friends-2027-austin-g5diz_pmgcpjv | two-friends | verify (applied) | 18757699 | https://seatgeek.com/two-friends-tickets/austin-texas-moody-amphitheater-2027-06-25-8-pm/concert/18757699 | - |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | riley-green | verify (applied) | 18639003 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-26-7-pm/concert/18639003 | - |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | kenny-chesney | verify (applied) | 18592003 | https://seatgeek.com/kenny-chesney-tickets/chicago-illinois-soldier-field-2027-06-26-4-30-pm/concert/18592003 | - |
| tm-two-friends-2027-irving-vvg1yz_phht2we | two-friends | verify (applied) | 18757520 | https://seatgeek.com/two-friends-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-06-26-7-pm/concert/18757520 | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | luke-combs | verify (applied) | 18493412 | https://seatgeek.com/luke-combs-tickets/san-diego-california-petco-park-2027-06-26-5-45-pm/concert/18493412 | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | lizzy-mcalpine | verify (applied) | 18619449 | https://seatgeek.com/lizzy-mcalpine-tickets/toronto-canada-scotiabank-arena-2027-06-27-7-pm/concert/18619449 | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | def-leppard | verify (applied) | 18662449 | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 | - |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgagectc | kpop-demon-hunters | verify (applied) | 18772683 | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-29-7-30-pm/concert/18772683 | - |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | lizzy-mcalpine | verify (applied) | 18619452 | https://seatgeek.com/lizzy-mcalpine-tickets/chicago-illinois-united-center-2027-06-29-7-pm/concert/18619452 | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | def-leppard | verify (applied) | 18662452 | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 | - |
| tm-two-friends-2027-toronto-1a8zk49gkesrne- | two-friends | verify (applied) | 18725838 | https://seatgeek.com/two-friends-tickets/toronto-canada-rbc-amphitheatre-2027-06-30-7-pm/concert/18725838 | - |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgag7qt4 | kpop-demon-hunters | verify (applied) | 18772726 | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-30-7-30-pm/concert/18772726 | - |
| tm-two-friends-2027-bala-1avzz_4gkztkppc | two-friends | verify (applied) | 18756748 | https://seatgeek.com/two-friends-tickets/bala-canada-kee-to-bala-2027-07-01-8-pm/concert/18756748 | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | def-leppard | verify (applied) | 18662454 | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | lizzy-mcalpine | verify (applied) | 18619454 | https://seatgeek.com/lizzy-mcalpine-tickets/austin-texas-moody-center-atx-2027-07-02-7-pm/concert/18619454 | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-foreigner-2027-milwaukee-vv1a6zk4agkd5heh6 | foreigner | verify (applied) | 18673558 | https://seatgeek.com/foreigner-tickets/milwaukee-wisconsin-bmo-pavilion-2027-07-02-8-pm/concert/18673558 | - |
| tm-zach-top-2027-george-vvg1hz_p3_wpdn | zach-top | verify (applied) | 18753255 | https://seatgeek.com/zach-top-tickets/george-washington-gorge-amphitheatre-2027-07-02-6-pm/concert/18753255 | - |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | greta-van-fleet | verify (applied) | 18642001 | https://seatgeek.com/greta-van-fleet-tickets/vancouver-canada-rogers-arena-2027-07-05-7-pm/concert/18642001 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-kpop-demon-hunters-2027-charlotte-g5evz_p39bkd- | kpop-demon-hunters | verify (applied) | 18772689 | https://seatgeek.com/kpop-demon-hunters-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-07-07-7-30-pm/concert/18772689 | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | greta-van-fleet | verify (applied) | 18642002 | https://seatgeek.com/greta-van-fleet-tickets/edmonton-canada-rogers-place-2027-07-07-7-pm/concert/18642002 | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | greta-van-fleet | verify (applied) | 18642003 | https://seatgeek.com/greta-van-fleet-tickets/calgary-canada-scotiabank-saddledome-2027-07-08-7-pm/concert/18642003 | - |
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | death-cab-for-cutie | verify (applied) | 18715561 | https://seatgeek.com/death-cab-for-cutie-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-08-7-pm/concert/18715561 | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | lizzy-mcalpine | verify (applied) | 18619456 | https://seatgeek.com/lizzy-mcalpine-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2027-07-09-6-30-pm/concert/18619456 | - |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | kenny-chesney | verify (applied) | 18592004 | https://seatgeek.com/kenny-chesney-tickets/milwaukee-wisconsin-american-family-field-2027-07-10-4-30-pm/concert/18592004 | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | greta-van-fleet | verify (applied) | 18642007 | https://seatgeek.com/greta-van-fleet-tickets/winnipeg-canada-canada-life-centre-2027-07-10-7-pm/concert/18642007 | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | lizzy-mcalpine | verify (applied) | 18619461 | https://seatgeek.com/lizzy-mcalpine-tickets/los-angeles-california-forum-23-2027-07-10-7-pm/concert/18619461 | - |
| tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0 | fall-out-boy | verify (applied) | 18753400 | https://seatgeek.com/fall-out-boy-tickets/arlington-texas-globe-life-field-2027-07-13-5-30-pm/concert/18753400 | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | lizzy-mcalpine | verify (applied) | 18619460 | https://seatgeek.com/lizzy-mcalpine-tickets/san-francisco-california-chase-center-2027-07-13-7-pm/concert/18619460 | - |
| tm-kpop-demon-hunters-2027-sunrise-z7r9jz1aaa4-e | kpop-demon-hunters | verify (applied) | 18744717 | https://seatgeek.com/kpop-demon-hunters-tickets/sunrise-florida-amerant-bank-arena-2027-07-14-7-30-pm/concert/18744717 | - |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | bon-jovi | verify (applied) | 18696568 | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 | - |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | riley-green | verify (applied) | 18626571 | https://seatgeek.com/riley-green-tickets/syracuse-new-york-empower-fcu-amphitheater-at-lakeview-2027-07-15-7-pm/concert/18626571 | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | lizzy-mcalpine | verify (applied) | 18619462 | https://seatgeek.com/lizzy-mcalpine-tickets/portland-oregon-moda-center-2027-07-15-7-pm/concert/18619462 | - |
| tm-fall-out-boy-2027-atlanta-vvg1zz_pkn5gmk | fall-out-boy | verify (applied) | 18753402 | https://seatgeek.com/fall-out-boy-tickets/atlanta-georgia-truist-park-2027-07-16-5-30-pm/concert/18753402 | - |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ay | morgan-wallen | verify (applied) | 18760516 | https://seatgeek.com/morgan-wallen-tickets/athens-georgia-sanford-stadium-2027-07-16-5-30-pm/concert/18760516 | - |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | slipknot | verify (applied) | 18626597 | https://seatgeek.com/slipknot-tickets/washington-district-of-columbia-nationals-park-2027-07-16-6-30-pm/concert/18626597 | - |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | greta-van-fleet | verify (applied) | 18642013 | https://seatgeek.com/greta-van-fleet-tickets/columbus-ohio-nationwide-arena-2027-07-16-7-pm/concert/18642013 | - |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | riley-green | verify (applied) | 18626541 | https://seatgeek.com/riley-green-tickets/allentown-pennsylvania-ppl-center-2027-07-16-7-pm/concert/18626541 | - |
| tm-foreigner-2027-bangor-vv177z_pgkzwgr47 | foreigner | verify (applied) | 18778525 | https://seatgeek.com/foreigner-tickets/bangor-maine-maine-savings-amphitheater-2027-07-16-7-pm/concert/18778525 | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | leon-bridges | verify (applied) | 18662695 | https://seatgeek.com/leon-bridges-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-07-16-7-30-pm/concert/18662695 | - |
| tm-travis-tritt-2027-bossier-city-g5viz_p2n3lzw | travis-tritt | verify (applied) | 18756251 | https://seatgeek.com/travis-tritt-tickets/bossier-city-louisiana-horseshoe-casino-riverdome-2027-07-16-8-pm/concert/18756251 | - |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ke | morgan-wallen | verify (applied) | 18760515 | https://seatgeek.com/morgan-wallen-tickets/athens-georgia-sanford-stadium-2027-07-17-5-30-pm/concert/18760515 | - |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | kenny-chesney | verify (applied) | 18592005 | https://seatgeek.com/kenny-chesney-tickets/denver-colorado-empower-field-at-mile-high-2027-07-17-4-30-pm/concert/18592005 | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | greta-van-fleet | verify (applied) | 18642015 | https://seatgeek.com/greta-van-fleet-tickets/noblesville-indiana-ruoff-music-center-2027-07-17-7-pm/concert/18642015 | - |
| tm-foreigner-2027-gilford-vv177z_pgkichxsp | foreigner | verify (applied) | 18778524 | https://seatgeek.com/foreigner-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-17-7-pm/concert/18778524 | - |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | leon-bridges | verify (applied) | 18662694 | https://seatgeek.com/leon-bridges-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-07-17-8-pm/concert/18662694 | - |
| tm-the-dead-south-2027-denver-z7r9jz1aaa6vm | the-dead-south | verify (applied) | 18760505 | https://seatgeek.com/the-dead-south-tickets/denver-colorado-levitt-pavilion-denver-2027-07-17-6-30-pm/concert/18760505 | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | lizzy-mcalpine | verify (applied) | 18619466 | https://seatgeek.com/lizzy-mcalpine-tickets/seattle-washington-climate-pledge-arena-2027-07-17-7-pm/concert/18619466 | - |
| tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c | fall-out-boy | verify (applied) | 18753401 | https://seatgeek.com/fall-out-boy-tickets/washington-district-of-columbia-nationals-park-2027-07-18-5-30-pm/concert/18753401 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-foreigner-2027-bethel-k7vgf_ps6zwby | foreigner | verify (applied) | 18778526 | https://seatgeek.com/foreigner-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-18-7-pm/concert/18778526 | - |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | greta-van-fleet | verify (applied) | 18642014 | https://seatgeek.com/greta-van-fleet-tickets/raleigh-north-carolina-lenovo-center-2027-07-20-7-pm/concert/18642014 | - |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqm-6ap | kpop-demon-hunters | verify (applied) | 18772702 | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-20-7-30-pm/concert/18772702 | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | zach-bryan | verify (applied) | 18686642 | https://seatgeek.com/zach-bryan-tickets/inglewood-california-sofi-stadium-2027-07-20-7-pm/concert/18686642 | - |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | slipknot | verify (applied) | 18626589 | https://seatgeek.com/slipknot-tickets/montreal-canada-parc-jean-drapeau-2027-07-21-6-30-pm/concert/18626589 | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | greta-van-fleet | verify (applied) | 18642019 | https://seatgeek.com/greta-van-fleet-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-21-7-pm/concert/18642019 | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | leon-bridges | verify (applied) | 18662705 | https://seatgeek.com/leon-bridges-tickets/wilmington-north-carolina-live-oak-bank-pavilion-2027-07-21-7-pm/concert/18662705 | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | bon-jovi | verify (applied) | 18696570 | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 | - |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqmd65i | kpop-demon-hunters | verify (applied) | 18772728 | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-21-7-30-pm/concert/18772728 | - |
| tm-fall-out-boy-2027-toronto-1a8zk40gkdutc4w | fall-out-boy | verify (applied) | 18753404 | https://seatgeek.com/fall-out-boy-tickets/toronto-canada-rogers-stadium-toronto-2027-07-22-5-30-pm/concert/18753404 | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | riley-green | verify (applied) | 18626543 | https://seatgeek.com/riley-green-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-22-7-pm/concert/18626543 | - |

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
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-doja-cat-2026-miami-vvg1vzbs0fdfw5 | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-tampa-vvg1vzbslmpvjz | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-charlotte-g5evzbsemdalv | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-baltimore-1avfzbsgknfre1x | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-washington-1a4zkgygkdpgprp | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-boston-vv1avzk36gkdfnkex | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-philadelphia-1kgzv0xbga5zeae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-newark-vv1aezk3fgkdhlmuf | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-new-york-g5diz_flffpzi | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-atlanta-vvg1zz_527ymui | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-miami-vvg1vz_51zozkr | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-miami-vvg1vz_5ctzbz1 | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-vvg18z_52-bljx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-vvg18z_52-dlqv | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-uncasville-g5vvz_6nrigot | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-uncasville-g5vvz_6n-zpjb | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-teddy-swims-2026-sacramento-g5vyz_fmsnbtg | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-phoenix-1av0z_fgkbna4b9 | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-boston-vv177z_kgkw31n77 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-orlando-1aefz_kgknmxmnk | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-atlanta-vvg1zz_6ddzdk3 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-louisville-1apzkf7gker9zih | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-buffalo-k7vgf_8kru5hf | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-pittsburgh-1apzkfdgkdrcd8b | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-seattle-vvg1hz_2qgz489 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-chicago-vvg18z_2o77qju | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-boston-vvg17z_2pblciw | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-laval-17g8v0g6cubsshb | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-toronto-177zv0g62er1iat | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-chicago-vvg18z_cnmg_i8 | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-madison-vvg1jz_cbaz-zj | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-boston-vvg17z_1njiezr | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-chicago-vvg18z_1nj0ag4 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-toronto-1avzz_8gklvsj7l | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-boston-vv177z_8gklypyp_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-chicago-vvg18z_cej4l_d | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-red-clay-strays-2026-atlanta-vvg1zz_7rkxyy- | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-salt-lake-city-z7r9jz1aaef49 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-chicago-vv178zbwgkltpkse | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | eagles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-dallas-vvg1yz_14w7vrn | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-denver-g5vzz_1kxjfbe | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-anaheim-vvg10z_1q4chn3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | lionel-richie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1cz73 | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck18f79 | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1oi7r | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1fb7i | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-jonas-brothers-2026-austin-g5diz_8vesk58 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-san-francisco-g5vyz_8sbxulz | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-sacramento-g5vyz_8sde9yz | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-glendale-z7r9jz1aav08u | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-austin-g5diz_kuopazl | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-detroit-vv1kezv0jiga2jpfm | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-zac-brown-band-2026-lincoln-vv16kzk8wakzacfeeu | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-rosemont-vv1a7zk8sgkdldbon | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-tampa-vvg1vz_3nvhqgr | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-boston-vv1avzkfpgkdybxe- | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-detroit-vv1afzkfegkdcyvij | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-milwaukee-vv1kjz_3f4g7vnwv | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-chicago-vvg1jz_gohfssb | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-detroit-vvg1oz_g9neqkq | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-toronto-177zv0g6g2_mkrp | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-marc-anthony-2026-las-vegas-1a9zk3vgkdfccwq | marc-anthony | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-marc-anthony-2026-las-vegas-1a9zk3vgkdf2mwm | marc-anthony | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9um | calvin-harris | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-stamford-g5vvz_axiecx- | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-orlando-z7r9jz1aazdae | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-clearwater-z7r9jz1a7paou | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-jacksonville-z7r9jz1a70eoz | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | black-stone-cherry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-cincinnati-1apzko9gkelizys | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7nwya | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7lcyc | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7twrb | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7tury | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7iure | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v1ako_v_zaccg27 | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v1ako_v_za5cgcc | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-orlando-1aefz_fgklnyeh_ | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-hollywood-vvg1vz_8wi3ad6 | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-san-diego-vvg1izbuciwp5c | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-phoenix-1a_zku0gkemfp-f | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-inglewood-vv1aazkupgkerzcmz | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dom-dolla-2026-las-vegas-z7r9jz1a7p3c3 | dom-dolla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-motionless-in-white-2026-albany-k7vgf_5wspmvj | motionless-in-white | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-motionless-in-white-2026-portland-vvg17z_5r6traw | motionless-in-white | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-motionless-in-white-2026-pittsburgh-17aov0g65mh-tzb | motionless-in-white | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-inglewood-vv170z_kgkuw4lc4 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-houston-g5diz_ad2y7sg | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-irving-vvg1yz_kyui28o | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-chicago-vvg1jz_2brfg7b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-indianapolis-vvg1fz_2rfzpki | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-cincinnati-17aov0g62qly9ie | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-cleveland-z7r9jz1aaed_7 | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-bristol-g5viz_25fd7l0 | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-jersey-city-vvg1fz_2hzjb2j | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-bensalem-z7r9jz1aaz98b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-baltimore-17a8v0g62qqx1z6 | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-louisville-17aov0g629rlldo | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-memphis-g5viz_2h5lx5n | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-park-city-vvg1bz_135gz80 | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-oklahoma-city-vvg1yz_13ofzsb | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-kansas-city-z7r9jz1a70nek | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-minneapolis-z7r9jz1a70nz6 | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-dodge-city-vvg1bz_gx9hm-8 | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-biloxi-g5viz_889usjk | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-austin-g5diz_uux5j8i | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-irving-vvg1yz_g0p_mts | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-houston-g5diz_geaxmd2 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-orlando-17fov0g6g3w_f1c | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-fort-lauderdale-z7r9jz1a7ppo0 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-nashville-z7r9jz1a7p0bp | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-richmond-z7r9jz1a7ptxv | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-pittsburgh-z7r9jz1a7pnqd | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-new-york-k7vgf_gmumtdg | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tucanes-de-tijuana-2026-highland-z7r9jz1a7paao | los-tucanes-de-tijuana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | rufus-du-sol | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-two-friends-2026-atlantic-city-1atzk4fgkd6j8cf | two-friends | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-intocable-2026-sugar-land-z7r9jz1a7x9gp | intocable | event is in the past — SeatGeek delists finished shows; nothing to maintain |
