# SeatGeek CTA verification log

Generated: 2026-11-24T04:25:51.150Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1310 (needs_recheck: 724, provenance backfill: 14, stale re-check: 1216)
- Events skipped before API checks: 912
- API calls made: 800
- Verified provenance written: 674
- URLs added: 0
- URLs corrected: 0
- URLs cleared: 27
- Provenance un-verified: 5
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 60
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | rufus-du-sol | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | chris-tomlin | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | koe-wetzel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Seminole Center' vs 'Seminole Casino Immokalee'; no qualifying replacement found |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | yuridia | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hutchins Concert Hall' vs 'Collins Center for the Arts'; no qualifying replacement found |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | mico | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | grace-potter | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-tori-kelly-2027-anaheim-vv170z_pgkmqbskf | tori-kelly | verify (applied) | 18778541 | https://seatgeek.com/tori-kelly-tickets/anaheim-california-house-of-blues-anaheim-2027-03-19-7-pm/concert/18778541 | - |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | clear (applied) | - | - | stored URL failed: venue mismatch: 'Oriental Theatre-CO' vs 'The Oriental Theater'; no qualifying replacement found |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | melissa-etheridge | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-charlottesville-z7r9jz1aaa-pv | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | jon-pardi | verify (applied) | 18862818 | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2027-04-18-7-pm/concert/18862818 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tori-kelly-2027-toronto-1avzz_pgkvx9zdy | tori-kelly | verify (applied) | 18778583 | https://seatgeek.com/tori-kelly-tickets/toronto-canada-history-2027-04-21-7-pm/concert/18778583 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | hazlett | verify (applied) | 18312117 | https://seatgeek.com/hazlett-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-04-25-7-pm/concert/18312117 | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-tori-kelly-2027-minneapolis-z7r9jz1aaa4uk | tori-kelly | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | clear (applied) | - | - | stored URL failed: venue mismatch: 'Thelma Gaylord Performing Arts Theatre' vs 'Thelma Gaylord PAT At Civic Center Music Hall'; no qualifying replacement found |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
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
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-denver-g5vzz_f11k7mj | lola-young | verify (applied) | 18649718 | https://seatgeek.com/lola-young-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-25-8-pm/concert/18649718 | - |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | fkj | verify (applied) | 18272744 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-25-7-pm/concert/18272744 | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | haiden-henderson | verify (applied) | 18612816 | https://seatgeek.com/haiden-henderson-tickets/toronto-canada-the-mod-club-2027-04-26-7-pm/concert/18612816 | - |
| tm-fkj-2027-vancouver-1778v0g6g4hh0bi | fkj | verify (applied) | 18290231 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-26-7-pm/concert/18290231 | - |
| tm-lola-young-2027-salt-lake-city-g5vzz_fk8daho | lola-young | verify (applied) | 18649720 | https://seatgeek.com/lola-young-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-26-8-pm/concert/18649720 | - |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | hazlett | verify (applied) | 18649783 | https://seatgeek.com/hazlett-tickets/new-york-new-york-irving-plaza-2027-04-27-7-pm/concert/18649783 | - |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | leon-bridges | verify (applied) | 18662696 | https://seatgeek.com/leon-bridges-tickets/toronto-canada-scotiabank-arena-2027-04-27-7-pm/concert/18662696 | - |
| tm-the-neighbourhood-2027-montreal-1ad7z_4gknbo3lq | the-neighbourhood | verify (applied) | 18726919 | https://seatgeek.com/the-neighbourhood-tickets/montreal-canada-centre-bell-2027-04-27-7-pm/concert/18726919 | - |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | the-psychedelic-furs | verify (applied) | 18592682 | https://seatgeek.com/the-psychedelic-furs-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2027-04-27-7-30-pm/concert/18592682 | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | nickelback | verify (applied) | 18664618 | https://seatgeek.com/nickelback-tickets/dallas-texas-american-airlines-center-2027-04-27-6-30-pm/concert/18664618 | - |
| tm-mat-kearney-2027-new-york-vv16dzk44g3zauv5ea | mat-kearney | verify (applied) | 18726039 | https://seatgeek.com/mat-kearney-tickets/new-york-new-york-the-town-hall-new-york-2027-04-27-7-30-pm/concert/18726039 | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | a-perfect-circle | verify (applied) | 18632517 | https://seatgeek.com/a-perfect-circle-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-27-8-pm/concert/18632517 | - |
| tm-fontaines-d-c-2027-detroit-vv17oz_kgksew9wu | fontaines-d-c | verify (applied) | 18642819 | https://seatgeek.com/fontaines-d-c-tickets/detroit-michigan-fox-theatre-detroit-2027-04-27-8-pm/concert/18642819 | - |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | mei-semones | verify (applied) | 18637753 | https://seatgeek.com/mei-semones-tickets/vancouver-canada-commodore-ballroom-2027-04-27-7-pm/concert/18637753 | - |
| tm-the-neighbourhood-2027-kanata-16szk49oizau7kga | the-neighbourhood | verify (applied) | 18726921 | https://seatgeek.com/the-neighbourhood-tickets/kanata-canada-canadian-tire-centre-2027-04-28-7-pm/concert/18726921 | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | a-perfect-circle | verify (applied) | 18632520 | https://seatgeek.com/a-perfect-circle-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-28-7-30-pm/concert/18632520 | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | fontaines-d-c | verify (applied) | 18642820 | https://seatgeek.com/fontaines-d-c-tickets/chicago-illinois-the-salt-shed-outdoors-2027-04-28-7-pm/concert/18642820 | - |
| tm-foreigner-2027-montclair-vv1aezkf_gkded4lx | foreigner | verify (applied) | 18550003 | https://seatgeek.com/foreigner-tickets/montclair-new-jersey-the-wellmont-theater-2027-04-28-8-pm/concert/18550003 | - |
| tm-mat-kearney-2027-portland-vv177z_fgkbwdmul | mat-kearney | verify (applied) | 18725688 | https://seatgeek.com/mat-kearney-tickets/portland-maine-state-theatre-portland-me-2027-04-28-8-pm/concert/18725688 | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | the-warning | verify (applied) | 18590114 | https://seatgeek.com/the-warning-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-28-6-30-pm/concert/18590114 | - |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | mei-semones | verify (applied) | 18637789 | https://seatgeek.com/mei-semones-tickets/seattle-washington-neptune-theatre-wa-2027-04-28-8-pm/concert/18637789 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | john-mayer | verify (applied) | 18659121 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-28-8-pm/concert/18659121 | - |
| tm-lola-young-2027-seattle-vvg1hz_falrsfg | lola-young | verify (applied) | 18649719 | https://seatgeek.com/lola-young-tickets/seattle-washington-wamu-theater-2027-04-28-8-pm/concert/18649719 | - |
| tm-noah-kahan-2027-tampa-vvg1vz_4rlk1ty | noah-kahan | verify (applied) | 18728707 | https://seatgeek.com/noah-kahan-tickets/tampa-florida-raymond-james-stadium-2027-04-29-6-30-pm/concert/18728707 | - |
| tm-riley-green-2027-raleigh-g5evz_ke-2cfw | riley-green | verify (applied) | 18626510 | https://seatgeek.com/riley-green-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-04-29-7-pm/concert/18626510 | - |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | warren-zeiders | verify (applied) | 18649765 | https://seatgeek.com/warren-zeiders-tickets/columbia-south-carolina-township-auditorium-2027-04-29-7-pm/concert/18649765 | - |
| tm-gavin-adcock-2027-salem-vv1avzk4kgkdddflu | gavin-adcock | verify (applied) | 18672827 | https://seatgeek.com/gavin-adcock-tickets/salem-virginia-salem-civic-center-2027-04-29-7-30-pm/concert/18672827 | - |
| tm-mercyme-2027-milwaukee-vv17jz_fgkboydiq | mercyme | verify (applied) | 18692280 | https://seatgeek.com/mercyme-tickets/milwaukee-wisconsin-uw-milwaukee-panther-arena-2027-04-29-7-pm/concert/18692280 | - |
| tm-josiah-queen-2027-anaheim-vv16azkf00fza5k85a | josiah-queen | verify (applied) | 18574521 | https://seatgeek.com/josiah-queen-tickets/anaheim-california-honda-center-2027-04-29-7-pm/concert/18574521 | - |
| tm-def-leppard-2027-glendale-1kk8vp8bga1l7cc | def-leppard | verify (applied) | 18662413 | https://seatgeek.com/def-leppard-tickets/glendale-arizona-desert-diamond-arena-2027-04-29-7-pm/concert/18662413 | - |
| tm-saint-levant-2027-anaheim-vvg10z_cr0rptv | saint-levant | verify (applied) | 18386213 | https://seatgeek.com/saint-levant-tickets/anaheim-california-house-of-blues-anaheim-2027-04-29-7-pm/concert/18386213 | - |
| tm-lola-young-2027-vancouver-16ozk4vpyzau66a6 | lola-young | verify (applied) | 18649726 | https://seatgeek.com/lola-young-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-29-8-pm/concert/18649726 | - |
| tm-mat-kearney-2027-mckees-rocks-1avbz_fgkh6lcsf | mat-kearney | verify (applied) | 18726607 | https://seatgeek.com/mat-kearney-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-30-6-30-pm/concert/18726607 | - |
| tm-riley-green-2027-knoxville-g5viz_3wie3-p | riley-green | verify (applied) | 18626513 | https://seatgeek.com/riley-green-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-30-7-pm/concert/18626513 | - |
| tm-the-neighbourhood-2027-columbus-vv17fz_4gkmetfbq | the-neighbourhood | verify (applied) | 18726908 | https://seatgeek.com/the-neighbourhood-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-04-30-7-pm/concert/18726908 | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | warren-zeiders | verify (applied) | 18649766 | https://seatgeek.com/warren-zeiders-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-30-7-pm/concert/18649766 | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | too-many-zooz | verify (applied) | 18613113 | https://seatgeek.com/too-many-zooz-tickets/houston-texas-white-oak-music-hall-downstairs-2027-04-30-7-pm/concert/18613113 | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | a-perfect-circle | verify (applied) | 18632522 | https://seatgeek.com/a-perfect-circle-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-04-30-8-pm/concert/18632522 | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | verify (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-hazlett-2027-portland-vvg17z_grwzm6s | hazlett | verify (applied) | 18649786 | https://seatgeek.com/hazlett-tickets/portland-maine-state-theatre-portland-me-2027-04-30-8-pm/concert/18649786 | - |
| tm-foreigner-2027-port-chester-g5vvz_ony3-go | foreigner | verify (applied) | 18550006 | https://seatgeek.com/foreigner-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2027-04-30-8-pm/concert/18550006 | - |
| tm-mercyme-2027-springfield-vv1a6zk4agkeirfgx | mercyme | verify (applied) | 18692282 | https://seatgeek.com/mercyme-tickets/springfield-illinois-bank-of-springfield-center-2027-04-30-7-pm/concert/18692282 | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | the-interrupters | verify (applied) | 18612589 | https://seatgeek.com/the-interrupters-tickets/los-angeles-california-the-wiltern-2027-04-30-5-30-pm/concert/18612589 | - |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | fontaines-d-c | verify (applied) | 18642823 | https://seatgeek.com/fontaines-d-c-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-04-30-8-pm/concert/18642823 | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | josiah-queen | verify (applied) | 18574523 | https://seatgeek.com/josiah-queen-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-04-30-7-pm/concert/18574523 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | john-mayer | verify (applied) | 18659117 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-30-8-pm/concert/18659117 | - |
| tm-foy-vance-2027-boston-vv177z_7gksjyniw | foy-vance | verify (applied) | 18084126 | https://seatgeek.com/foy-vance-tickets/boston-massachusetts-the-wilbur-2027-05-01-7-pm/concert/18084126 | - |
| tm-riley-green-2027-greenville-g5evz_k14klik | riley-green | verify (applied) | 18626515 | https://seatgeek.com/riley-green-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-05-01-7-pm/concert/18626515 | - |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | leon-bridges | verify (applied) | 18662692 | https://seatgeek.com/leon-bridges-tickets/new-york-new-york-madison-square-garden-2027-05-01-7-pm/concert/18662692 | - |
| tm-zach-bryan-2027-indianapolis-vv17fz_fgkwtxpko | zach-bryan | verify (applied) | 18686628 | https://seatgeek.com/zach-bryan-tickets/indianapolis-indiana-lucas-oil-stadium-2027-05-01-7-pm/concert/18686628 | - |
| tm-the-neighbourhood-2027-pittsburgh-16vbz_4jkg7tdr9 | the-neighbourhood | verify (applied) | 18726910 | https://seatgeek.com/the-neighbourhood-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-05-01-7-pm/concert/18726910 | - |
| tm-mercyme-2027-canton-vv17fz_fgkw2un6n | mercyme | verify (applied) | 18692284 | https://seatgeek.com/mercyme-tickets/canton-ohio-canton-civic-center-canton-oh-2027-05-01-7-pm/concert/18692284 | - |
| tm-the-psychedelic-furs-2027-northfield-vv17fz_ogkhgkwao | the-psychedelic-furs | verify (applied) | 18592689 | https://seatgeek.com/the-psychedelic-furs-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-01-7-30-pm/concert/18592689 | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | nickelback | verify (applied) | 18664624 | https://seatgeek.com/nickelback-tickets/san-antonio-texas-frost-bank-center-2027-05-01-6-30-pm/concert/18664624 | - |
| tm-mat-kearney-2027-cincinnati-16pzk48jvzacdggk | mat-kearney | verify (applied) | 18725946 | https://seatgeek.com/mat-kearney-tickets/cincinnati-ohio-taft-theatre-2027-05-01-7-30-pm/concert/18725946 | - |
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | lizzy-mcalpine | verify (applied) | 18619416 | https://seatgeek.com/lizzy-mcalpine-tickets/houston-texas-713-music-hall-2027-05-01-7-pm/concert/18619416 | - |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | fontaines-d-c | verify (applied) | 18642822 | https://seatgeek.com/fontaines-d-c-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-01-8-pm/concert/18642822 | - |
| tm-the-interrupters-2027-san-diego-vvg1iz_4zg9ez5 | the-interrupters | verify (applied) | 18703225 | https://seatgeek.com/the-interrupters-tickets/san-diego-california-soma-san-diego-2027-05-01-6-pm/concert/18703225 | - |
| tm-the-dead-south-2027-nashville-g5viz_p3okygx | the-dead-south | verify (applied) | 18754930 | https://seatgeek.com/the-dead-south-tickets/nashville-tennessee-the-truth-nashville-2027-05-01-8-pm/concert/18754930 | - |
| tm-queens-of-the-stone-age-2027-san-diego-vvg1iz_4c-ppva | queens-of-the-stone-age | verify (applied) | 18709210 | https://seatgeek.com/queens-of-the-stone-age-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-01-6-30-pm/concert/18709210 | - |
| tm-zac-brown-band-2027-sparks-1avjz_4gkrmjou6 | zac-brown-band | verify (applied) | 18739090 | https://seatgeek.com/zac-brown-band-tickets/sparks-nevada-nugget-event-center-2027-05-01-7-pm/concert/18739090 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | john-mayer | verify (applied) | 18659119 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-01-8-pm/concert/18659119 | - |
| tm-hazlett-2027-boston-vvg17z_grnbkkr | hazlett | verify (applied) | 18311626 | https://seatgeek.com/hazlett-tickets/boston-massachusetts-paradise-rock-club-2027-05-02-7-pm/concert/18311626 | - |
| tm-the-interrupters-2027-anaheim-vv1fe8vpg33pz72fk7 | the-interrupters | verify (applied) | 18612867 | https://seatgeek.com/the-interrupters-tickets/anaheim-california-house-of-blues-anaheim-2027-05-02-5-pm/concert/18612867 | - |
| tm-foreigner-2027-westbury-k7vgf_ocs3r5v | foreigner | verify (applied) | 18549843 | https://seatgeek.com/foreigner-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2027-05-02-8-pm/concert/18549843 | - |
| tm-mercyme-2027-evansville-vv17fz_fgkwdo5qw | mercyme | verify (applied) | 18692285 | https://seatgeek.com/mercyme-tickets/evansville-indiana-ford-center-in-2027-05-02-7-pm/concert/18692285 | - |
| tm-niall-horan-2027-fort-worth-vvg1yz_1r1jeer | niall-horan | verify (applied) | 18235547 | https://seatgeek.com/niall-horan-tickets/fort-worth-texas-dickies-arena-2027-05-02-7-30-pm/concert/18235547 | - |
| tm-queens-of-the-stone-age-2027-inglewood-vv1k0z_48eg7ij9v | queens-of-the-stone-age | verify (applied) | 18709211 | https://seatgeek.com/queens-of-the-stone-age-tickets/inglewood-california-kia-forum-2027-05-02-6-30-pm/concert/18709211 | - |
| tm-saint-levant-2027-los-angeles-vv1aazkf_gkdotx7a | saint-levant | verify (applied) | 18550851 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-02-7-pm/concert/18550851 | - |
| tm-ha-ash-2027-inglewood-vvg1iz_3teyn4f | ha-ash | verify (applied) | 18608842 | https://seatgeek.com/ha-ash-tickets/inglewood-california-youtube-theater-2027-05-02-8-pm/concert/18608842 | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjir6zj | saint-levant | verify (applied) | 18386205 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-03-7-pm/concert/18386205 | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | lizzy-mcalpine | verify (applied) | 18619418 | https://seatgeek.com/lizzy-mcalpine-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-05-04-7-pm/concert/18619418 | - |
| tm-the-neighbourhood-2027-raleigh-g5evz_4l74bcy | the-neighbourhood | verify (applied) | 18726915 | https://seatgeek.com/the-neighbourhood-tickets/raleigh-north-carolina-lenovo-center-2027-05-04-7-pm/concert/18726915 | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | a-perfect-circle | verify (applied) | 18632524 | https://seatgeek.com/a-perfect-circle-tickets/charlotte-north-carolina-truliant-amphitheater-2027-05-04-7-30-pm/concert/18632524 | - |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | dylan-gossett | verify (applied) | 18642104 | https://seatgeek.com/dylan-gossett-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-05-04-7-pm/concert/18642104 | - |
| tm-zach-bryan-2027-green-bay-vv17jz_fgkshdkie | zach-bryan | verify (applied) | 18686626 | https://seatgeek.com/zach-bryan-tickets/green-bay-wisconsin-lambeau-field-2027-05-04-7-pm/concert/18686626 | - |
| tm-phoebe-bridgers-2027-san-antonio-g5diz_peugmcn | phoebe-bridgers | verify (applied) | 18760649 | https://seatgeek.com/phoebe-bridgers-tickets/san-antonio-texas-frost-bank-center-2027-05-04-7-30-pm/concert/18760649 | - |
| tm-queens-of-the-stone-age-2027-oakland-g5vyz_4k7itnp | queens-of-the-stone-age | verify (applied) | 18709212 | https://seatgeek.com/queens-of-the-stone-age-tickets/oakland-california-oakland-arena-2027-05-04-6-30-pm/concert/18709212 | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjil6zv | saint-levant | verify (applied) | 18386207 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-04-7-pm/concert/18386207 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_kebfbqm | josiah-queen | verify (applied) | 18606512 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-05-7-pm/concert/18606512 | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | a-perfect-circle | verify (applied) | 18632526 | https://seatgeek.com/a-perfect-circle-tickets/duluth-georgia-gas-south-arena-2027-05-05-8-pm/concert/18632526 | - |
| tm-queens-of-the-stone-age-2027-sacramento-g5vyz_4paibie | queens-of-the-stone-age | verify (applied) | 18709213 | https://seatgeek.com/queens-of-the-stone-age-tickets/sacramento-california-golden-1-center-2027-05-05-6-30-pm/concert/18709213 | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | fontaines-d-c | verify (applied) | 18642830 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-05-8-pm/concert/18642830 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | john-mayer | verify (applied) | 18659122 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-05-8-pm/concert/18659122 | - |
| tm-noah-kahan-2027-charlotte-g5evz_4r3uqrt | noah-kahan | verify (applied) | 18728703 | https://seatgeek.com/noah-kahan-tickets/charlotte-north-carolina-bank-of-america-stadium-2027-05-06-6-30-pm/concert/18728703 | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | the-warning | verify (applied) | 18590369 | https://seatgeek.com/the-warning-tickets/detroit-michigan-the-fillmore-detroit-2027-05-06-7-pm/concert/18590369 | - |
| tm-meshuggah-2027-new-orleans-g5viz_49c3t4b | meshuggah | verify (applied) | 18724691 | https://seatgeek.com/meshuggah-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-05-06-6-pm/concert/18724691 | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | riley-green | verify (applied) | 18626522 | https://seatgeek.com/riley-green-tickets/fort-worth-texas-dickies-arena-2027-05-06-7-pm/concert/18626522 | - |
| tm-remi-wolf-2027-austin-g5diz_fncgjpo | remi-wolf | verify (applied) | 18664777 | https://seatgeek.com/remi-wolf-tickets/austin-texas-moody-amphitheater-2027-05-06-7-pm/concert/18664777 | - |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | dylan-gossett | verify (applied) | 18642105 | https://seatgeek.com/dylan-gossett-tickets/madison-wisconsin-the-sylvee-2027-05-06-7-pm/concert/18642105 | - |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | ha-ash | verify (applied) | 18608844 | https://seatgeek.com/ha-ash-tickets/san-jose-california-san-jose-civic-2027-05-06-8-pm/concert/18608844 | - |
| tm-fontaines-d-c-2027-vancouver-1aozk4v0aa_zegf | fontaines-d-c | verify (applied) | 18658881 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-06-8-pm/concert/18658881 | - |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | lizzy-mcalpine | verify (applied) | 18619420 | https://seatgeek.com/lizzy-mcalpine-tickets/detroit-michigan-fox-theatre-detroit-2027-05-07-7-pm/concert/18619420 | - |
| tm-the-neighbourhood-2027-indianapolis-vv1aazk49gkeyee1s | the-neighbourhood | verify (applied) | 18726916 | https://seatgeek.com/the-neighbourhood-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-07-7-pm/concert/18726916 | - |
| tm-harry-styles-2027-toronto-1a8zkftgkdpce50 | harry-styles | verify (applied) | 18579677 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-07-7-45-pm/concert/18579677 | - |
| tm-josiah-queen-2027-cedar-park-g5diz_32hchtd | josiah-queen | verify (applied) | 18574527 | https://seatgeek.com/josiah-queen-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-05-07-7-pm/concert/18574527 | - |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | fantasia | verify (applied) | 18629225 | https://seatgeek.com/fantasia-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-05-07-8-pm/concert/18629225 | - |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | riley-green | verify (applied) | 18626523 | https://seatgeek.com/riley-green-tickets/wichita-kansas-intrust-bank-arena-2027-05-07-7-pm/concert/18626523 | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | carly-rae-jepsen | verify (applied) | 18639026 | https://seatgeek.com/carly-rae-jepsen-tickets/austin-texas-moody-amphitheater-2027-05-07-7-pm/concert/18639026 | - |
| tm-a-perfect-circle-2027-the-woodlands-g5diz_kjdvhi6 | a-perfect-circle | verify (applied) | 18632528 | https://seatgeek.com/a-perfect-circle-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-05-07-8-pm/concert/18632528 | - |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | dylan-gossett | verify (applied) | 18642106 | https://seatgeek.com/dylan-gossett-tickets/kansas-city-missouri-uptown-theater-kc-2027-05-07-7-pm/concert/18642106 | - |
| tm-queens-of-the-stone-age-2027-seattle-vvg1hz_43n59ay | queens-of-the-stone-age | verify (applied) | 18709214 | https://seatgeek.com/queens-of-the-stone-age-tickets/seattle-washington-climate-pledge-arena-2027-05-07-6-30-pm/concert/18709214 | - |
| tm-saint-levant-2027-san-francisco-g5vyz_cj596wt | saint-levant | verify (applied) | 18386214 | https://seatgeek.com/saint-levant-tickets/san-francisco-california-the-masonic-san-francisco-2027-05-07-8-pm/concert/18386214 | - |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | luke-combs | verify (applied) | 18493401 | https://seatgeek.com/luke-combs-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-08-5-45-pm/concert/18493401 | - |
| tm-the-warning-2027-ottawa-1ad7z_3gklmhbs8 | the-warning | verify (applied) | 18591885 | https://seatgeek.com/the-warning-tickets/ottawa-canada-history-ottawa-2027-05-08-7-pm/concert/18591885 | - |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | mei-semones | verify (applied) | 18638032 | https://seatgeek.com/mei-semones-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-05-08-7-pm/concert/18638032 | - |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | gavin-adcock | verify (applied) | 18674403 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-white-oak-music-hall-lawn-2027-05-08-6-pm/concert/18674403 | - |
| tm-harry-styles-2027-toronto-1a8zkftanayze5g | harry-styles | verify (applied) | 18579684 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-08-7-45-pm/concert/18579684 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | josiah-queen | verify (applied) | 18574530 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-08-7-pm/concert/18574530 | - |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | fantasia | verify (applied) | 18629230 | https://seatgeek.com/fantasia-tickets/raleigh-north-carolina-lenovo-center-2027-05-08-8-pm/concert/18629230 | - |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | riley-green | verify (applied) | 18626524 | https://seatgeek.com/riley-green-tickets/rogers-arkansas-walmart-amp-2027-05-08-7-pm/concert/18626524 | - |
| tm-the-neighbourhood-2027-chicago-vv178z_4gknyh4c0 | the-neighbourhood | verify (applied) | 18726918 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2027-05-08-7-pm/concert/18726918 | - |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | carly-rae-jepsen | verify (applied) | 18639028 | https://seatgeek.com/carly-rae-jepsen-tickets/houston-texas-713-music-hall-2027-05-08-7-30-pm/concert/18639028 | - |
| tm-two-door-cinema-club-2027-milwaukee-vv1a6zk47gkemmn1x | two-door-cinema-club | verify (applied) | 18711332 | https://seatgeek.com/two-door-cinema-club-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-05-08-7-30-pm/concert/18711332 | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | metallica | verify (applied) | 18595110 | https://seatgeek.com/metallica-tickets/vancouver-canada-bc-place-stadium-2027-05-08-6-pm/concert/18595110 | - |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | dylan-gossett | verify (applied) | 18642110 | https://seatgeek.com/dylan-gossett-tickets/la-vista-nebraska-the-astro-theater-la-vista-2027-05-08-7-pm/concert/18642110 | - |
| tm-remi-wolf-2027-irving-vvg1yz_frdgzb6 | remi-wolf | verify (applied) | 18664783 | https://seatgeek.com/remi-wolf-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-08-8-pm/concert/18664783 | - |
| tm-calvin-harris-2027-oakland-g5vyz_4drjlsj | calvin-harris | verify (applied) | 18702240 | https://seatgeek.com/calvin-harris-tickets/oakland-california-oakland-arena-2027-05-08-7-30-pm/concert/18702240 | - |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | ha-ash | verify (applied) | 18608845 | https://seatgeek.com/ha-ash-tickets/phoenix-arizona-arizona-financial-theatre-2027-05-08-8-pm/concert/18608845 | - |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | fontaines-d-c | verify (applied) | 18642831 | https://seatgeek.com/fontaines-d-c-tickets/seattle-washington-wamu-theater-2027-05-08-8-pm/concert/18642831 | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | lizzy-mcalpine | verify (applied) | 18619426 | https://seatgeek.com/lizzy-mcalpine-tickets/indianapolis-indiana-clowes-memorial-hall-2027-05-09-7-pm/concert/18619426 | - |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | hazlett | verify (applied) | 18649795 | https://seatgeek.com/hazlett-tickets/toronto-canada-the-danforth-music-hall-2027-05-09-7-pm/concert/18649795 | - |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | the-warning | verify (applied) | 18590511 | https://seatgeek.com/the-warning-tickets/montreal-canada-mtelus-2027-05-09-8-pm/concert/18590511 | - |
| tm-queens-of-the-stone-age-2027-portland-vvg1hz_42zzik2 | queens-of-the-stone-age | verify (applied) | 18709215 | https://seatgeek.com/queens-of-the-stone-age-tickets/portland-oregon-moda-center-2027-05-09-6-30-pm/concert/18709215 | - |
| tm-calvin-harris-2027-oakland-g5vyz_4cwzdxp | calvin-harris | verify (applied) | 18702286 | https://seatgeek.com/calvin-harris-tickets/oakland-california-oakland-arena-2027-05-09-7-30-pm/concert/18702286 | - |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | carly-rae-jepsen | verify (applied) | 18639027 | https://seatgeek.com/carly-rae-jepsen-tickets/nashville-tennessee-the-truth-nashville-2027-05-10-7-30-pm/concert/18639027 | - |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | saint-levant | verify (applied) | 18550856 | https://seatgeek.com/saint-levant-tickets/seattle-washington-paramount-theatre-wa-2027-05-10-8-pm/concert/18550856 | - |
| tm-the-warning-2027-toronto-1avzz_3gkltrh3z | the-warning | verify (applied) | 18591550 | https://seatgeek.com/the-warning-tickets/toronto-canada-history-2027-05-11-7-pm/concert/18591550 | - |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | carly-rae-jepsen | verify (applied) | 18639033 | https://seatgeek.com/carly-rae-jepsen-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-11-8-pm/concert/18639033 | - |
| tm-the-neighbourhood-2027-winnipeg-1av7z_4gknbr6nb | the-neighbourhood | verify (applied) | 18726926 | https://seatgeek.com/the-neighbourhood-tickets/winnipeg-canada-canada-life-centre-2027-05-11-7-pm/concert/18726926 | - |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | fontaines-d-c | verify (applied) | 18642832 | https://seatgeek.com/fontaines-d-c-tickets/sacramento-channel-24-sacramento-2027-05-11-8-pm/concert/18642832 | - |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | carly-rae-jepsen | verify (applied) | 18639034 | https://seatgeek.com/carly-rae-jepsen-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-05-12-7-30-pm/concert/18639034 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | lizzy-mcalpine | verify (applied) | 18619429 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-12-7-pm/concert/18619429 | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | saint-levant | verify (applied) | 18551643 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-12-6-pm/concert/18551643 | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | ha-ash | verify (applied) | 18608852 | https://seatgeek.com/ha-ash-tickets/el-paso-texas-el-paso-county-coliseum-2027-05-12-7-pm/concert/18608852 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | santana | verify (applied) | 18628833 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-12-7-pm/concert/18628833 | - |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | fontaines-d-c | verify (applied) | 18642833 | https://seatgeek.com/fontaines-d-c-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-05-12-8-pm/concert/18642833 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | lizzy-mcalpine | verify (applied) | 18637702 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-13-7-pm/concert/18637702 | - |
| tm-hazlett-2027-chicago-vvg18z_glqlopk | hazlett | verify (applied) | 18311797 | https://seatgeek.com/hazlett-tickets/chicago-illinois-house-of-blues-chicago-2027-05-13-7-pm/concert/18311797 | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | saint-levant | verify (applied) | 18551642 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-13-6-pm/concert/18551642 | - |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | metallica | verify (applied) | 18595090 | https://seatgeek.com/metallica-tickets/san-diego-california-snapdragon-stadium-2027-05-13-6-pm/concert/18595090 | - |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | dylan-gossett | verify (applied) | 18642112 | https://seatgeek.com/dylan-gossett-tickets/austin-texas-moody-amphitheater-2027-05-13-7-pm/concert/18642112 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | santana | verify (applied) | 18628834 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-13-7-pm/concert/18628834 | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fsxrnwp | zach-bryan | verify (applied) | 18686627 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-14-7-pm/concert/18686627 | - |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | gavin-adcock | verify (applied) | 18672973 | https://seatgeek.com/gavin-adcock-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-05-14-7-pm/concert/18672973 | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqzh13 | harry-styles | verify (applied) | 18592380 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-14-7-45-pm/concert/18592380 | - |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | carly-rae-jepsen | verify (applied) | 18639035 | https://seatgeek.com/carly-rae-jepsen-tickets/washington-district-of-columbia-the-anthem-dc-2027-05-14-7-30-pm/concert/18639035 | - |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | niall-horan | verify (applied) | 18235548 | https://seatgeek.com/niall-horan-tickets/austin-texas-moody-center-atx-2027-05-14-7-30-pm/concert/18235548 | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | ha-ash | verify (applied) | 18608853 | https://seatgeek.com/ha-ash-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-14-8-pm/concert/18608853 | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | fantasia | verify (applied) | 18629275 | https://seatgeek.com/fantasia-tickets/chicago-illinois-united-center-2027-05-14-8-pm/concert/18629275 | - |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | dylan-gossett | verify (applied) | 18642115 | https://seatgeek.com/dylan-gossett-tickets/houston-texas-bayou-music-center-2027-05-14-7-pm/concert/18642115 | - |
| tm-the-neighbourhood-2027-calgary-1av7z_4gknld4le | the-neighbourhood | verify (applied) | 18726927 | https://seatgeek.com/the-neighbourhood-tickets/calgary-canada-scotiabank-saddledome-2027-05-14-7-pm/concert/18726927 | - |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | def-leppard | verify (applied) | 18662462 | https://seatgeek.com/def-leppard-tickets/vancouver-canada-rogers-arena-2027-05-14-7-pm/concert/18662462 | - |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | too-many-zooz | verify (applied) | 18612957 | https://seatgeek.com/too-many-zooz-tickets/seattle-washington-neptune-theatre-wa-2027-05-14-8-pm/concert/18612957 | - |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | luke-combs | verify (applied) | 18493403 | https://seatgeek.com/luke-combs-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-15-5-45-pm/concert/18493403 | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fs0cbhd | zach-bryan | verify (applied) | 18686631 | https://seatgeek.com/zach-bryan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-05-15-7-pm/concert/18686631 | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqbl5d | harry-styles | verify (applied) | 18592381 | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-15-7-45-pm/concert/18592381 | - |
| tm-queens-of-the-stone-age-2027-milwaukee-vv1a6zk4kgkdc_par | queens-of-the-stone-age | verify (applied) | 18709222 | https://seatgeek.com/queens-of-the-stone-age-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-05-15-6-30-pm/concert/18709222 | - |
| tm-kings-of-leon-2027-noblesville-vv1aazk4ngkdiu1bn | kings-of-leon | verify (applied) | 18746644 | https://seatgeek.com/kings-of-leon-tickets/noblesville-indiana-ruoff-music-center-2027-05-15-7-30-pm/concert/18746644 | - |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | the-warning | verify (applied) | 18591883 | https://seatgeek.com/the-warning-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-05-15-8-pm/concert/18591883 | - |
| tm-stray-kids-2027-seattle-vvg1hz_pf4iifz | stray-kids | verify (applied) | 18753034 | https://seatgeek.com/stray-kids-tickets/seattle-washington-lumen-field-2027-05-16-7-30-pm/concert/18753034 | - |
| tm-calvin-harris-2027-vancouver-1aozk46gkdf4hov | calvin-harris | verify (applied) | 18674912 | https://seatgeek.com/calvin-harris-tickets/vancouver-canada-rogers-arena-2027-05-16-8-pm/concert/18674912 | - |
| tm-calvin-harris-2027-vancouver-1k78vpfmgagddrz | calvin-harris | verify (applied) | 18708086 | https://seatgeek.com/calvin-harris-tickets/vancouver-canada-rogers-arena-2027-05-17-8-pm/concert/18708086 | - |
| tm-kings-of-leon-2027-grand-rapids-vv1afzk4xgkdurf5s | kings-of-leon | verify (applied) | 18746646 | https://seatgeek.com/kings-of-leon-tickets/grand-rapids-acrisure-amphitheater-2027-05-18-7-30-pm/concert/18746646 | - |
| tm-noah-kahan-2027-santa-clara-g5vyz_4rfk6c7 | noah-kahan | verify (applied) | 18728716 | https://seatgeek.com/noah-kahan-tickets/santa-clara-california-levi-s-stadium-2027-05-19-6-30-pm/concert/18728716 | - |
| tm-stray-kids-2027-vancouver-1aozk4pgkepqkay | stray-kids | verify (applied) | 18753052 | https://seatgeek.com/stray-kids-tickets/vancouver-canada-bc-place-stadium-2027-05-19-7-30-pm/concert/18753052 | - |
| tm-queens-of-the-stone-age-2027-pittsburgh-1apzk44gkedibkp | queens-of-the-stone-age | verify (applied) | 18709228 | https://seatgeek.com/queens-of-the-stone-age-tickets/pittsburgh-pennsylvania-petersen-events-center-2027-05-21-6-30-pm/concert/18709228 | - |
| tm-los-tigres-del-norte-2027-seattle-vvg1hz_4zy3kxo | los-tigres-del-norte | verify (applied) | 18738302 | https://seatgeek.com/los-tigres-del-norte-tickets/seattle-washington-wamu-theater-2027-05-21-8-pm/concert/18738302 | - |
| tm-stray-kids-2027-santa-clara-g5vyz_p1srtgv | stray-kids | verify (applied) | 18753035 | https://seatgeek.com/stray-kids-tickets/santa-clara-california-levi-s-stadium-2027-05-22-7-30-pm/concert/18753035 | - |
| tm-los-tigres-del-norte-2027-portland-vvg1hz_flv5i1r | los-tigres-del-norte | verify (applied) | 18738305 | https://seatgeek.com/los-tigres-del-norte-tickets/portland-oregon-moda-center-2027-05-22-8-pm/concert/18738305 | - |
| tm-stray-kids-2027-san-diego-vvg1iz_plbqdhe | stray-kids | verify (applied) | 18753036 | https://seatgeek.com/stray-kids-tickets/san-diego-california-petco-park-2027-05-25-7-30-pm/concert/18753036 | - |
| tm-kings-of-leon-2027-saratoga-springs-k7vgf_p52u5pn | kings-of-leon | verify (applied) | 18746652 | https://seatgeek.com/kings-of-leon-tickets/saratoga-springs-new-york-albany-med-health-system-at-spac-2027-05-27-7-30-pm/concert/18746652 | - |
| tm-two-door-cinema-club-2027-houston-g5diz_42wndml | two-door-cinema-club | verify (applied) | 18711346 | https://seatgeek.com/two-door-cinema-club-tickets/houston-texas-white-oak-music-hall-downstairs-2027-05-28-6-pm/concert/18711346 | - |
| tm-kings-of-leon-2027-bangor-vv1a8vpbygagbkh_ | kings-of-leon | verify (applied) | 18746654 | https://seatgeek.com/kings-of-leon-tickets/bangor-maine-maine-savings-amphitheater-2027-05-29-7-pm/concert/18746654 | - |
| tm-stray-kids-2027-inglewood-vvg1iz_4slsivl | stray-kids | verify (applied) | 18753032 | https://seatgeek.com/stray-kids-tickets/inglewood-california-sofi-stadium-2027-05-29-7-30-pm/concert/18753032 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd69rc1 | calvin-harris | verify (applied) | 18702246 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-30-8-pm/concert/18702246 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqfu | john-mayer | verify (applied) | 18659133 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-02-8-pm/concert/18659133 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zcf2 | john-mayer | verify (applied) | 18659134 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-04-8-pm/concert/18659134 | - |
| tm-stray-kids-2027-houston-g5diz_p4wwnf8 | stray-kids | verify (applied) | 18753031 | https://seatgeek.com/stray-kids-tickets/houston-texas-reliant-stadium-2027-06-05-7-30-pm/concert/18753031 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf4 | john-mayer | verify (applied) | 18659135 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-05-8-pm/concert/18659135 | - |
| tm-stray-kids-2027-atlanta-vvg1zz_phzq3g7 | stray-kids | verify (applied) | 18753033 | https://seatgeek.com/stray-kids-tickets/atlanta-georgia-mercedes-benz-stadium-2027-06-08-7-30-pm/concert/18753033 | - |
| tm-noah-kahan-2027-detroit-vv1koz_pjag7zyra | noah-kahan | verify (applied) | 18755363 | https://seatgeek.com/noah-kahan-tickets/detroit-michigan-ford-field-2027-06-09-6-30-pm/concert/18755363 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf9 | john-mayer | verify (applied) | 18675251 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-09-8-pm/concert/18675251 | - |
| tm-morgan-wallen-2027-tampa-vvg1vz_p0fzneo | morgan-wallen | verify (applied) | 18760513 | https://seatgeek.com/morgan-wallen-tickets/tampa-florida-raymond-james-stadium-2027-06-11-5-30-pm/concert/18760513 | - |
| tm-stray-kids-2027-miami-vvg1vz_ppnraxv | stray-kids | verify (applied) | 18753043 | https://seatgeek.com/stray-kids-tickets/miami-gardens-florida-hard-rock-stadium-2027-06-11-7-30-pm/concert/18753043 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yuf_ | john-mayer | verify (applied) | 18675252 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-11-8-pm/concert/18675252 | - |
| tm-morgan-wallen-2027-tampa-vvg1vz_pl9zvgh | morgan-wallen | verify (applied) | 18760511 | https://seatgeek.com/morgan-wallen-tickets/tampa-florida-raymond-james-stadium-2027-06-12-5-30-pm/concert/18760511 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yufh | john-mayer | verify (applied) | 18675253 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-06-12-8-pm/concert/18675253 | - |
| tm-stray-kids-2027-orlando-1axzk40gkdehatj | stray-kids | verify (applied) | 18753045 | https://seatgeek.com/stray-kids-tickets/orlando-florida-camping-world-stadium-2027-06-14-7-30-pm/concert/18753045 | - |
| tm-stray-kids-2027-chicago-vv1a7zk4ngkdhgi8m | stray-kids | verify (applied) | 18753046 | https://seatgeek.com/stray-kids-tickets/chicago-illinois-soldier-field-2027-06-18-7-30-pm/concert/18753046 | - |
| tm-riley-green-2027-cincinnati-1kaovp4ygacu9xm | riley-green | verify (applied) | 18738069 | https://seatgeek.com/riley-green-tickets/cincinnati-ohio-the-farmer-music-center-2027-06-24-7-pm/concert/18738069 | - |
| tm-morgan-wallen-2027-foxborough-vv177z_4gkthgswc | morgan-wallen | verify (applied) | 18760514 | https://seatgeek.com/morgan-wallen-tickets/foxborough-massachusetts-gillette-stadium-2027-06-25-7-pm/concert/18760514 | - |
| tm-stray-kids-2027-toronto-1avzz_4gkdmari8 | stray-kids | verify (applied) | 18753050 | https://seatgeek.com/stray-kids-tickets/toronto-canada-rogers-stadium-toronto-2027-06-25-7-30-pm/concert/18753050 | - |
| tm-morgan-wallen-2027-foxborough-vv177z_pgki9euav | morgan-wallen | verify (applied) | 18760512 | https://seatgeek.com/morgan-wallen-tickets/foxborough-massachusetts-gillette-stadium-2027-06-26-7-pm/concert/18760512 | - |
| tm-travis-tritt-2027-kettering-z7r9jz1aaaaf3 | travis-tritt | verify (applied) | 18758688 | https://seatgeek.com/travis-tritt-tickets/kettering-ohio-fraze-pavilion-2027-06-26-8-pm/concert/18758688 | - |
| tm-stray-kids-2027-east-rutherford-k7vgf_pcnx6a9 | stray-kids | verify (applied) | 18753048 | https://seatgeek.com/stray-kids-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-29-7-30-pm/concert/18753048 | - |
| tm-greta-van-fleet-2027-kansas-city-vv1akzk4vgkdr0kg1 | greta-van-fleet | verify (applied) | 18642008 | https://seatgeek.com/greta-van-fleet-tickets/kansas-city-missouri-t-mobile-center-2027-07-13-7-pm/concert/18642008 | - |
| tm-zach-bryan-2027-las-vegas-1avjz_fgkwbrzg6 | zach-bryan | verify (applied) | 18686640 | https://seatgeek.com/zach-bryan-tickets/las-vegas-nevada-allegiant-stadium-2027-07-16-7-pm/concert/18686640 | - |
| tm-fall-out-boy-2027-detroit-vv1afzk4jgkdvw4eb | fall-out-boy | verify (applied) | 18753403 | https://seatgeek.com/fall-out-boy-tickets/detroit-michigan-comerica-park-2027-07-20-5-30-pm/concert/18753403 | - |
| tm-morgan-wallen-2027-orchard-park-vv1fgz_pjac8zdu62 | morgan-wallen | verify (applied) | 18760523 | https://seatgeek.com/morgan-wallen-tickets/orchard-park-new-york-highmark-stadium-ny-2027-07-23-5-30-pm/concert/18760523 | - |
| tm-morgan-wallen-2027-orchard-park-vv16dzk4txkza2vufv | morgan-wallen | verify (applied) | 18760525 | https://seatgeek.com/morgan-wallen-tickets/orchard-park-new-york-highmark-stadium-ny-2027-07-24-5-30-pm/concert/18760525 | - |
| tm-travis-tritt-2027-new-haven-1kaovpq_ga2h4m9 | travis-tritt | verify (applied) | 18757687 | https://seatgeek.com/travis-tritt-tickets/new-haven-kentucky-the-amp-at-log-still-2027-07-31-7-15-pm/concert/18757687 | - |
| tm-fall-out-boy-2027-hershey-vv1aezk40gkd_hdkn | fall-out-boy | verify (applied) | 18753420 | https://seatgeek.com/fall-out-boy-tickets/hershey-pennsylvania-hersheypark-stadium-2027-08-04-5-30-pm/concert/18753420 | - |
| tm-morgan-wallen-2027-columbus-vv1aazk4tgkdvhpe8 | morgan-wallen | verify (applied) | 18760528 | https://seatgeek.com/morgan-wallen-tickets/columbus-ohio-ohio-stadium-2027-08-06-4-30-pm/concert/18760528 | - |
| tm-death-cab-for-cutie-2027-harrisburg-vv1aezk4tgkdmrriv | death-cab-for-cutie | verify (applied) | 18755654 | https://seatgeek.com/death-cab-for-cutie-tickets/harrisburg-pennsylvania-riverfront-park-pa-2027-08-06-7-pm/concert/18755654 | - |
| tm-zach-bryan-2027-boise-g5vzz_fsbnh4h | zach-bryan | verify (applied) | 18686648 | https://seatgeek.com/zach-bryan-tickets/boise-idaho-albertsons-stadium-2027-08-06-7-pm/concert/18686648 | - |
| tm-morgan-wallen-2027-columbus-vv17fz_pgkneyw0- | morgan-wallen | verify (applied) | 18760527 | https://seatgeek.com/morgan-wallen-tickets/columbus-ohio-ohio-stadium-2027-08-07-4-30-pm/concert/18760527 | - |
| tm-fall-out-boy-2027-commerce-city-g5vzz_p3slsmj | fall-out-boy | verify (applied) | 18753426 | https://seatgeek.com/fall-out-boy-tickets/commerce-city-colorado-dick-s-sporting-goods-park-2027-08-10-5-30-pm/concert/18753426 | - |
| tm-morgan-wallen-2027-arlington-z7r9jz1aaa8aa | morgan-wallen | verify (applied) | 18537611 | https://seatgeek.com/morgan-wallen-tickets/arlington-texas-at-t-stadium-2027-08-13-5-30-pm/concert/18537611 | - |
| tm-oasis-2027-foxborough-vv1avzkfggke0ghpz | oasis | verify (applied) | 18589080 | https://seatgeek.com/oasis-tickets/foxborough-massachusetts-gillette-stadium-2027-08-13-7-pm/concert/18589080 | - |
| tm-leon-bridges-2027-seattle-vvg1hz_fqtqa-a | leon-bridges | verify (applied) | 18662716 | https://seatgeek.com/leon-bridges-tickets/seattle-washington-climate-pledge-arena-2027-08-13-7-30-pm/concert/18662716 | - |
| tm-morgan-wallen-2027-arlington-z7r9jz1aaa8a8 | morgan-wallen | verify (applied) | 18758293 | https://seatgeek.com/morgan-wallen-tickets/arlington-texas-at-t-stadium-2027-08-14-5-30-pm/concert/18758293 | - |
| tm-oasis-2027-foxborough-vv1avzkfggke08hpi | oasis | verify (applied) | 18589079 | https://seatgeek.com/oasis-tickets/foxborough-massachusetts-gillette-stadium-2027-08-14-7-pm/concert/18589079 | - |
| tm-travis-tritt-2027-gary-vv1aazk4tgkewapoq | travis-tritt | verify (applied) | 18757703 | https://seatgeek.com/travis-tritt-tickets/gary-indiana-hard-rock-live-northern-indiana-2027-08-14-7-pm/concert/18757703 | - |
| tm-slipknot-2027-phoenix-1a_zkfggkdfoifq | slipknot | verify (applied) | 18626587 | https://seatgeek.com/slipknot-tickets/phoenix-arizona-chase-field-2027-08-18-6-30-pm/concert/18626587 | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga25ajz | oasis | verify (applied) | 18589076 | https://seatgeek.com/oasis-tickets/las-vegas-nevada-allegiant-stadium-2027-08-20-7-pm/concert/18589076 | - |
| tm-morgan-wallen-2027-nashville-z7r9jz1aaa8ak | morgan-wallen | verify (applied) | 18729276 | https://seatgeek.com/morgan-wallen-tickets/nashville-tennessee-nissan-stadium-2027-08-27-5-30-pm/concert/18729276 | - |
| tm-morgan-wallen-2027-nashville-z7r9jz1aaa8a4 | morgan-wallen | verify (applied) | 18755669 | https://seatgeek.com/morgan-wallen-tickets/nashville-tennessee-nissan-stadium-2027-08-28-5-30-pm/concert/18755669 | - |
| tm-intocable-2027-sacramento-g5vyz_pulkwxh | intocable | verify (applied) | 18782555 | https://seatgeek.com/intocable-tickets/sacramento-california-golden-1-center-2027-08-28-8-pm/concert/18782555 | - |
| tm-travis-tritt-2027-kansas-city-vv1akzk4jgkdb4gal | travis-tritt | verify (applied) | 18756203 | https://seatgeek.com/travis-tritt-tickets/kansas-city-missouri-ameristar-casino-hotel-kansas-city-2027-09-11-8-30-pm/concert/18756203 | - |
| tm-the-dead-south-2027-calgary-1aozk4xgkd6z6-j | the-dead-south | verify (applied) | 18754775 | https://seatgeek.com/the-dead-south-tickets/calgary-canada-grey-eagle-event-centre-2027-09-25-8-pm/concert/18754775 | - |
| tm-the-dead-south-2027-edmonton-1aozk4ngkemvpah | the-dead-south | verify (applied) | 18754433 | https://seatgeek.com/the-dead-south-tickets/edmonton-canada-edmonton-expo-centre-2027-09-26-8-pm/concert/18754433 | - |
| tm-travis-tritt-2027-nashville-vv1aazk4jgke0bm2- | travis-tritt | verify (applied) | 18757416 | https://seatgeek.com/travis-tritt-tickets/nashville-indiana-brown-county-music-center-2027-09-30-8-pm/concert/18757416 | - |
| tm-the-dead-south-2027-montreal-1kg8vpbigaujeuh | the-dead-south | verify (applied) | 18754459 | https://seatgeek.com/the-dead-south-tickets/montreal-canada-mtelus-2027-10-01-8-pm/concert/18754459 | - |
| tm-travis-tritt-2027-mount-pleasant-z7r9jz1aaaark | travis-tritt | verify (applied) | 18758683 | https://seatgeek.com/travis-tritt-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-10-01-8-pm/concert/18758683 | - |
| tm-the-dead-south-2027-montreal-1kg8vpbigaujwul | the-dead-south | verify (applied) | 18754460 | https://seatgeek.com/the-dead-south-tickets/montreal-canada-mtelus-2027-10-02-8-pm/concert/18754460 | - |
| tm-the-dead-south-2027-ottawa-1aszk40gkda6px7 | the-dead-south | verify (applied) | 18754933 | https://seatgeek.com/the-dead-south-tickets/ottawa-canada-history-ottawa-2027-10-03-7-pm/concert/18754933 | - |
| tm-the-dead-south-2027-winnipeg-16ozk4nosza5dc55 | the-dead-south | verify (applied) | 18754332 | https://seatgeek.com/the-dead-south-tickets/winnipeg-canada-burton-cummings-theatre-2027-10-07-8-pm/concert/18754332 | - |
| tm-kings-of-leon-2027-cincinnati-1apzk4ngkdmfbs- | kings-of-leon | verify (applied) | 18746687 | https://seatgeek.com/kings-of-leon-tickets/cincinnati-ohio-the-farmer-music-center-2027-10-12-7-30-pm/concert/18746687 | - |
| tm-sting-2027-las-vegas-1ayzk4agkeca9wi | sting | verify (applied) | 18674621 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-14-8-pm/concert/18674621 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec1mvn | sting | verify (applied) | 18674623 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-16-8-pm/concert/18674623 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecg6m7 | sting | verify (applied) | 18674630 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-17-8-pm/concert/18674630 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecumyj | sting | verify (applied) | 18674631 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-20-8-pm/concert/18674631 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec2mbz | sting | verify (applied) | 18674632 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-22-8-pm/concert/18674632 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecoebs | sting | verify (applied) | 18674634 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-10-23-8-pm/concert/18674634 | - |
| tm-sombr-2026-new-york-g5diz_flfogz- | sombr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18175563 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-doja-cat-2026-boston-vv1f7zbs09vyzd227 | doja-cat | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17769352 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18211703 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18570216 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
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
| tm-john-summit-2026-chicago-vvg18z_52-dlqv | john-summit | verify (applied) | 18257264 | https://seatgeek.com/john-summit-tickets/chicago-illinois-united-center-2026-11-25-7-pm/concert/18257264 | - |
| tm-tyla-2026-boston-vvg17z_2pblciw | tyla | verify (applied) | 18404277 | https://seatgeek.com/tyla-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-11-25-8-pm/concert/18404277 | - |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | sabaton | verify (applied) | 17732688 | https://seatgeek.com/sabaton-tickets/waukee-iowa-vibrant-music-hall-2026-11-25-7-pm/concert/17732688 | - |
| tm-sting-2026-hollywood-vvg1vz_8wi3ad6 | sting | verify (applied) | 18507833 | https://seatgeek.com/sting-tickets/hollywood-florida-hard-rock-live-hollywood-2026-11-25-8-pm/concert/18507833 | - |
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
| tm-grace-potter-2026-easton-z7r9jz1aaae7_ | grace-potter | verify (applied) | 18762366 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/easton-maryland-avalon-theatre-2026-12-04-8-pm/concert/18762366 | - |
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
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | los-tigres-del-norte | verify (applied) | 18092802 | https://seatgeek.com/los-tigres-del-norte-tickets/birmingham-alabama-bjcc-concert-hall-2026-12-05-8-pm/concert/18092802 | - |
| tm-jodeci-2026-lake-charles-g5viz_2mnhtb3 | jodeci | verify (applied) | 18407282 | https://seatgeek.com/jodeci-tickets/lake-charles-louisiana-lake-charles-event-center-2026-12-05-8-pm/concert/18407282 | - |
| tm-two-friends-2026-nashville-g5viz_kmfvexe | two-friends | verify (applied) | 18126049 | https://seatgeek.com/two-friends-tickets/nashville-tennessee-the-truth-nashville-2026-12-05-8-pm/concert/18126049 | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | trivium | verify (applied) | 18391974 | https://seatgeek.com/trivium-tickets/san-francisco-california-the-masonic-san-francisco-2026-12-05-6-35-pm/concert/18391974 | - |
| tm-john-summit-2026-oakland-g5vyz_5925f5n | john-summit | verify (applied) | 18274896 | https://seatgeek.com/john-summit-tickets/oakland-california-oakland-arena-2026-12-05-7-pm/concert/18274896 | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | the-neighbourhood | verify (applied) | 18194373 | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-12-05-6-pm/concert/18194373 | - |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | luke-bryan | verify (applied) | 18571831 | https://seatgeek.com/luke-bryan-tickets/mescalero-new-mexico-inn-of-the-mountain-gods-resort-and-casino-2026-12-05-8-pm/concert/18571831 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | barry-manilow | verify (applied) | 17637159 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 | - |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | los-tucanes-de-tijuana | verify (applied) | 18799114 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/catoosa-oklahoma-hard-rock-live-tulsa-2026-12-05-9-pm/concert/18799114 | - |
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
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | beartooth | unverify (applied) | - | - | stored URL failed: venue mismatch: 'The Fillmore New Orleans' vs 'House of Blues - New Orleans'; previously verified record no longer matches |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | pentatonix | verify (applied) | 18427217 | https://seatgeek.com/pentatonix-tickets/raleigh-north-carolina-lenovo-center-2026-12-07-7-pm/concert/18427217 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-gracie-abrams-2026-oakland-g5vyz_5mq0w7n | gracie-abrams | verify (applied) | 18270514 | https://seatgeek.com/gracie-abrams-tickets/oakland-california-oakland-arena-2026-12-07-8-pm/concert/18270514 | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | sabaton | verify (applied) | 17732711 | https://seatgeek.com/sabaton-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-08-7-pm/concert/17732711 | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | trivium | verify (applied) | 18391979 | https://seatgeek.com/trivium-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2026-12-08-6-35-pm/concert/18391979 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | victoria-monet | verify (applied) | 18579791 | https://seatgeek.com/victoria-monet-tickets/inglewood-california-youtube-theater-2026-12-08-8-pm/concert/18579791 | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | trans-siberian-orchestra | verify (applied) | 18573432 | https://seatgeek.com/trans-siberian-orchestra-tickets/allentown-pennsylvania-ppl-center-2026-12-09-7-30-pm/concert/18573432 | - |
| tm-pentatonix-2026-nashville-g5viz_8pdi7wi | pentatonix | verify (applied) | 18427219 | https://seatgeek.com/pentatonix-tickets/nashville-tennessee-bridgestone-arena-2026-12-09-7-pm/concert/18427219 | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | sabaton | verify (applied) | 18126050 | https://seatgeek.com/sabaton-tickets/nashville-tennessee-the-truth-nashville-2026-12-09-7-pm/concert/18126050 | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | trans-siberian-orchestra | verify (applied) | 18573433 | https://seatgeek.com/trans-siberian-orchestra-tickets/austin-texas-moody-center-atx-2026-12-09-7-pm/concert/18573433 | - |
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
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | barry-manilow | verify (applied) | 17637164 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-12-7-pm/concert/17637164 | - |
| tm-two-friends-2026-seattle-vvg1hz_krkthyp | two-friends | verify (applied) | 18633839 | https://seatgeek.com/two-friends-tickets/seattle-washington-wamu-theater-2026-12-12-7-pm/concert/18633839 | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | john-summit | verify (applied) | 18494071 | https://seatgeek.com/john-summit-tickets/los-angeles-california-los-angeles-memorial-coliseum-2026-12-12-7-pm/concert/18494071 | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | eagles | verify (applied) | 18355051 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | trans-siberian-orchestra | verify (applied) | 18573455 | https://seatgeek.com/trans-siberian-orchestra-tickets/duluth-georgia-gas-south-arena-2026-12-13-3-pm/concert/18573455 | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | trans-siberian-orchestra | verify (applied) | 18573458 | https://seatgeek.com/trans-siberian-orchestra-tickets/dallas-texas-american-airlines-center-2026-12-13-3-pm/concert/18573458 | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | pentatonix | verify (applied) | 18427226 | https://seatgeek.com/pentatonix-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-12-13-6-pm/concert/18427226 | - |
| tm-pink-martini-2026-brooklyn-k7vgf_u53h-yh | pink-martini | verify (applied) | 18326350 | https://seatgeek.com/pink-martini-tickets/brooklyn-new-york-brooklyn-paramount-2026-12-13-7-pm/concert/18326350 | - |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | beartooth | verify (applied) | 18253071 | https://seatgeek.com/beartooth-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-12-13-6-pm/concert/18253071 | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | andrea-bocelli | verify (applied) | 18039188 | https://seatgeek.com/andrea-bocelli-tickets/montreal-canada-centre-bell-2026-12-13-8-pm/concert/18039188 | - |
| tm-lord-huron-2026-boston-vvg17z_2wsvfp- | lord-huron | verify (applied) | 18421970 | https://seatgeek.com/lord-huron-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-13-8-pm/concert/18421970 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | blue-october | verify (applied) | 18140941 | https://seatgeek.com/blue-october-tickets/hidalgo-texas-payne-arena-2026-12-13-8-pm/concert/18140941 | - |
| tm-tyla-2026-phoenix-17k8v0g62ljff-n | tyla | verify (applied) | 18404297 | https://seatgeek.com/tyla-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-14-8-pm/concert/18404297 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_53kkqpx | gracie-abrams | verify (applied) | 18270525 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-14-8-pm/concert/18270525 | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | jonas-brothers | verify (applied) | 18503930 | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-pentatonix-2026-austin-g5diz_8kmjslp | pentatonix | verify (applied) | 18427227 | https://seatgeek.com/pentatonix-tickets/austin-texas-moody-center-atx-2026-12-15-7-pm/concert/18427227 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | brandi-carlile | verify (applied) | 18626674 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-15-8-pm/concert/18626674 | - |
| tm-lord-huron-2026-montreal-17g8v0g62wrdz3v | lord-huron | verify (applied) | 18421973 | https://seatgeek.com/lord-huron-tickets/montreal-canada-mtelus-2026-12-15-8-pm/concert/18421973 | - |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | jodeci | verify (applied) | 18407288 | https://seatgeek.com/jodeci-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-12-15-8-pm/concert/18407288 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | verify (applied) | 18794564 | https://seatgeek.com/missio-tickets/boise-idaho-knitting-factory-concert-house-boise-2026-12-15-7-pm/concert/18794564 | - |
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
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-tyla-2026-inglewood-vvg1iz_cjqejmf | tyla | verify (applied) | 18404301 | https://seatgeek.com/tyla-tickets/inglewood-california-youtube-theater-2026-12-16-8-pm/concert/18404301 | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | trans-siberian-orchestra | verify (applied) | 18573467 | https://seatgeek.com/trans-siberian-orchestra-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-12-17-7-pm/concert/18573467 | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | trans-siberian-orchestra | verify (applied) | 18573470 | https://seatgeek.com/trans-siberian-orchestra-tickets/albany-new-york-mvp-arena-2026-12-17-7-30-pm/concert/18573470 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | andrea-bocelli | verify (applied) | 18039167 | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-17-8-pm/concert/18039167 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | brandi-carlile | verify (applied) | 18626680 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-17-8-pm/concert/18626680 | - |
| tm-lady-a-2026-new-york-g5diz_g2zkgbb | lady-a | verify (applied) | 18294956 | https://seatgeek.com/lady-a-tickets/new-york-new-york-beacon-theatre-2026-12-17-8-pm/concert/18294956 | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | blue-october | verify (applied) | 18140982 | https://seatgeek.com/blue-october-tickets/corpus-christi-texas-selena-auditorium-at-the-american-bank-center-2026-12-17-8-pm/concert/18140982 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-victoria-monet-2026-san-francisco-g5vyz_320sgvq | victoria-monet | verify (applied) | 18579810 | https://seatgeek.com/victoria-monet-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-17-8-pm/concert/18579810 | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | trans-siberian-orchestra | verify (applied) | 18573472 | https://seatgeek.com/trans-siberian-orchestra-tickets/hershey-pennsylvania-giant-center-2026-12-18-3-pm/concert/18573472 | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | trivium | verify (applied) | 18391991 | https://seatgeek.com/trivium-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-12-18-6-35-pm/concert/18391991 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | verify (applied) | 18668809 | https://seatgeek.com/pink-martini-tickets/boston-massachusetts-berklee-performance-center-2026-12-18-8-pm/concert/18668809 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | lord-huron | verify (applied) | 18421979 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-18-8-pm/concert/18421979 | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | lady-a | verify (applied) | 18353855 | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | blue-october | verify (applied) | 18141897 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-18-8-pm/concert/18141897 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | cece-winans | verify (applied) | 18361612 | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | gracie-abrams | verify (applied) | 18270524 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-18-8-pm/concert/18270524 | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | trans-siberian-orchestra | verify (applied) | 18573474 | https://seatgeek.com/trans-siberian-orchestra-tickets/orlando-florida-kia-center-2026-12-19-2-30-pm/concert/18573474 | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | trans-siberian-orchestra | verify (applied) | 18573477 | https://seatgeek.com/trans-siberian-orchestra-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-19-2-30-pm/concert/18573477 | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | trivium | verify (applied) | 18391993 | https://seatgeek.com/trivium-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-12-19-6-35-pm/concert/18391993 | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | jonas-brothers | verify (applied) | 18503931 | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 | - |
| tm-lady-a-2026-greensboro-g5evz_g5lge4i | lady-a | verify (applied) | 18295539 | https://seatgeek.com/lady-a-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2026-12-19-7-30-pm/concert/18295539 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | yacht-rock-revue | verify (applied) | 18551886 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-19-8-pm/concert/18551886 | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | a-boogie-wit-da-hoodie | verify (applied) | 18639406 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/hartford-connecticut-peoplesbank-arena-2026-12-19-8-pm/concert/18639406 | - |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | simple-plan | verify (applied) | 18207565 | https://seatgeek.com/simple-plan-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2026-12-19-8-pm/concert/18207565 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | lord-huron | verify (applied) | 18421980 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-19-8-pm/concert/18421980 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | lady-a | verify (applied) | 18295865 | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-alex-warren-2026-las-vegas-1ayzkftgkdvnpgb | alex-warren | verify (applied) | 18590187 | https://seatgeek.com/alex-warren-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-30-8-pm/concert/18590187 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-dom-dolla-2027-miami-z7r9jz1aaavbz | dom-dolla | verify (applied) | 18750432 | https://seatgeek.com/dom-dolla-tickets/miami-florida-factory-town-2026-12-31-10-pm/concert/18750432 | - |
| tm-two-friends-2027-tampa-vvg1vz_fhrt2gz | two-friends | verify (applied) | 18739111 | https://seatgeek.com/two-friends-tickets/tampa-florida-seminole-hard-rock-tampa-2026-12-31-9-pm/concert/18739111 | - |
| tm-alex-warren-2027-las-vegas-1ayzkftgkdvipgh | alex-warren | verify (applied) | 18590188 | https://seatgeek.com/alex-warren-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-31-8-pm/concert/18590188 | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | post-malone | verify (applied) | 18414663 | https://seatgeek.com/post-malone-tickets/salt-lake-city-utah-delta-center-1-2026-12-31-10-pm/concert/18414663 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-lord-huron-2027-sacramento-g5vyz_2wpd5xx | lord-huron | verify (applied) | 18421983 | https://seatgeek.com/lord-huron-tickets/sacramento-channel-24-sacramento-2027-01-01-8-pm/concert/18421983 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | lord-huron | verify (applied) | 18421984 | https://seatgeek.com/lord-huron-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2027-01-02-8-pm/concert/18421984 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | verify (applied) | 18659747 | https://seatgeek.com/pink-martini-tickets/fort-worth-texas-bass-performance-hall-2027-01-08-7-30-pm/concert/18659747 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-grace-potter-2027-rutland-z7r9jz1aaak__ | grace-potter | verify (applied) | 18755494 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/rutland-vermont-paramount-theatre-vt-2027-01-14-7-30-pm/concert/18755494 | - |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | verify (applied) | 18827506 | https://seatgeek.com/missio-tickets/cudahy-wisconsin-x-ray-arcade-2027-01-14-7-30-pm/concert/18827506 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | verify (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | atmosphere | verify (applied) | 18609072 | https://seatgeek.com/atmosphere-tickets/west-des-moines-iowa-val-air-ballroom-2027-01-16-6-45-pm/concert/18609072 | - |
| tm-grace-potter-2027-new-haven-z7r9jz1aaak_o | grace-potter | verify (applied) | 18755495 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/new-haven-connecticut-college-street-music-hall-2027-01-17-7-pm/concert/18755495 | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | atmosphere | verify (applied) | 18609074 | https://seatgeek.com/atmosphere-tickets/omaha-nebraska-the-admiral-omaha-2027-01-17-8-pm/concert/18609074 | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | atmosphere | verify (applied) | 18609075 | https://seatgeek.com/atmosphere-tickets/fort-collins-colorado-aggie-theatre-2027-01-19-6-45-pm/concert/18609075 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | alan-walker | verify (applied) | 18595131 | https://seatgeek.com/alan-walker-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-21-7-pm/concert/18595131 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | verify (applied) | 18690599 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-21-8-pm/concert/18690599 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | verify (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-grace-potter-2027-rome-z7r9jz1aaak_- | grace-potter | verify (applied) | 18755506 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/rome-new-york-rome-capitol-theatre-2027-01-22-7-30-pm/concert/18755506 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | verify (applied) | 18690598 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-22-8-pm/concert/18690598 | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | verify (applied) | 18699569 | https://seatgeek.com/yacht-rock-revue-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-23-8-pm/concert/18699569 | - |
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | air-supply | verify (applied) | 18355670 | https://seatgeek.com/air-supply-tickets/sarasota-florida-van-wezel-performing-arts-hall-2027-01-24-7-pm/concert/18355670 | - |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | pink-martini | verify (applied) | 18668823 | https://seatgeek.com/pink-martini-tickets/bellingham-washington-mount-baker-theatre-2027-01-24-7-pm/concert/18668823 | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | daughtry | verify (applied) | 18632894 | https://seatgeek.com/daughtry-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-25-7-pm/concert/18632894 | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | tommy-emmanuel | verify (applied) | 18690443 | https://seatgeek.com/tommy-emmanuel-tickets/champaign-illinois-virginia-theatre-2027-01-26-7-30-pm/concert/18690443 | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | yacht-rock-revue | verify (applied) | 18618051 | https://seatgeek.com/yacht-rock-revue-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-27-7-30-pm/concert/18618051 | - |
| tm-grace-potter-2027-hershey-vv1aezk4jgkdhztfh | grace-potter | verify (applied) | 18755509 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/hershey-pennsylvania-hershey-theatre-hershey-2027-01-27-7-30-pm/concert/18755509 | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | daughtry | verify (applied) | 18632896 | https://seatgeek.com/daughtry-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-28-7-pm/concert/18632896 | - |
| tm-grace-potter-2027-wilkes-barre-vv1kfz_px4g7sfow | grace-potter | verify (applied) | 18755510 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/wilkes-barre-pennsylvania-f-m-kirby-center-2027-01-28-7-30-pm/concert/18755510 | - |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | alan-walker | verify (applied) | 18621798 | https://seatgeek.com/alan-walker-tickets/nashville-tennessee-the-pinnacle-nashville-2027-01-28-8-pm/concert/18621798 | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | atmosphere | verify (applied) | 18609088 | https://seatgeek.com/atmosphere-tickets/eugene-oregon-mcdonald-theatre-2027-01-28-8-pm/concert/18609088 | - |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | verify (applied) | 18749653 | https://seatgeek.com/tommy-emmanuel-tickets/grand-rapids-michigan-st-cecilia-music-center-2027-01-29-7-30-pm/concert/18749653 | - |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | yacht-rock-revue | verify (applied) | 18621818 | https://seatgeek.com/yacht-rock-revue-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-29-7-30-pm/concert/18621818 | - |
| tm-air-supply-2027-hollywood-vvg1vz_3t_jrbe | air-supply | verify (applied) | 18631706 | https://seatgeek.com/air-supply-tickets/hollywood-florida-hard-rock-live-hollywood-2027-01-29-8-pm/concert/18631706 | - |
| tm-grace-potter-2027-bensalem-z7r9jz1aaak_n | grace-potter | verify (applied) | 18755511 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2027-01-29-7-30-pm/concert/18755511 | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | dylan-scott | verify (applied) | 18603379 | https://seatgeek.com/dylan-scott-tickets/bismarck-north-dakota-bismarck-event-center-2027-01-29-7-30-pm/concert/18603379 | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | blue-october | verify (applied) | 18354266 | https://seatgeek.com/blue-october-tickets/midland-texas-wagner-noel-performing-arts-center-2027-01-29-8-pm/concert/18354266 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-grace-potter-2027-washington-1a4zk4jgkey_jxg | grace-potter | verify (applied) | 18755517 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/washington-district-of-columbia-the-anthem-dc-2027-01-30-7-30-pm/concert/18755517 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-grace-potter-2027-cleveland-z7r9jz1aaak_0 | grace-potter | verify (applied) | 18755519 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/cleveland-ohio-globe-iron-2027-01-31-7-30-pm/concert/18755519 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | verify (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-alan-walker-2027-jacksonville-z7r9jz1aaakpn | alan-walker | verify (applied) | 18757838 | https://seatgeek.com/alan-walker-tickets/jacksonville-florida-five-jacksonville-2027-02-02-8-pm/concert/18757838 | - |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | verify (applied) | 18793748 | https://seatgeek.com/tommy-emmanuel-tickets/albany-new-york-hart-theatre-at-the-egg-2027-02-03-7-pm/concert/18793748 | - |
| tm-grace-potter-2027-lexington-1apzk4tgkd-mqay | grace-potter | verify (applied) | 18755520 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/lexington-kentucky-the-rail-3-2027-02-03-8-pm/concert/18755520 | - |
| tm-cody-jinks-2027-hollywood-vvg1vz_p3xfvoe | cody-jinks | verify (applied) | 18754087 | https://seatgeek.com/cody-jinks-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-03-8-pm/concert/18754087 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | verify (applied) | 18798615 | https://seatgeek.com/tommy-emmanuel-tickets/derry-new-hampshire-tupelo-music-hall-2027-02-04-8-pm/concert/18798615 | - |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | verify (applied) | 18696397 | https://seatgeek.com/valley-tickets/quebec-canada-grizzly-fuzz-2027-02-04-8-pm/concert/18696397 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-cody-jinks-2027-cocoa-z7r9jz1aaakjb | cody-jinks | verify (applied) | 18754085 | https://seatgeek.com/cody-jinks-tickets/cocoa-florida-cocoa-riverfront-park-2027-02-05-6-pm/concert/18754085 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-boyz-ii-men-2027-boston-vv1avzk4egkdp6cdw | boyz-ii-men | verify (applied) | 18739687 | https://seatgeek.com/boyz-ii-men-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-05-8-pm/concert/18739687 | - |
| tm-feid-2027-orlando-1axzk4xgkdpcfe6 | feid | verify (applied) | 18746718 | https://seatgeek.com/feid-tickets/orlando-florida-kia-center-2027-02-05-8-pm/concert/18746718 | - |
| tm-grace-potter-2027-indianapolis-vv1aazk4jgkei1ehm | grace-potter | verify (applied) | 18755524 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-02-05-8-pm/concert/18755524 | - |
| tm-hannah-harper-2027-bloomington-vv1kvyvp_igaglezi | hannah-harper | verify (applied) | 18754636 | https://seatgeek.com/hannah-harper-tickets/bloomington-illinois-bloomington-center-for-the-performing-arts-2027-02-05-7-pm/concert/18754636 | - |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | dropkick-murphys | verify (applied) | 18633525 | https://seatgeek.com/dropkick-murphys-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-05-7-pm/concert/18633525 | - |
| tm-cody-jinks-2027-apopka-z7r9jz1aaakjo | cody-jinks | verify (applied) | 18754088 | https://seatgeek.com/cody-jinks-tickets/apopka-florida-apopka-amphitheater-2027-02-06-6-pm/concert/18754088 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | verify (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-feid-2027-tampa-vvg1vz_p2nz_05 | feid | verify (applied) | 18746719 | https://seatgeek.com/feid-tickets/tampa-florida-benchmark-international-arena-2027-02-06-8-pm/concert/18746719 | - |
| tm-grace-potter-2027-cincinnati-1apzk4igkdfr9ax | grace-potter | verify (applied) | 18755525 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/cincinnati-ohio-taft-theatre-2027-02-06-8-pm/concert/18755525 | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | air-supply | verify (applied) | 18200030 | https://seatgeek.com/air-supply-tickets/wisconsin-dells-wisconsin-crystal-grand-music-theatre-2027-02-06-8-pm/concert/18200030 | - |
| tm-gracie-abrams-2027-austin-g5diz_4uo-e6z | gracie-abrams | verify (applied) | 18738061 | https://seatgeek.com/gracie-abrams-tickets/austin-texas-moody-center-atx-2027-02-06-8-pm/concert/18738061 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-cody-jinks-2027-macon-vvg1zz_pcm9nti | cody-jinks | verify (applied) | 18754089 | https://seatgeek.com/cody-jinks-tickets/macon-georgia-macon-city-auditorium-2027-02-07-8-pm/concert/18754089 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
| tm-grace-potter-2027-grand-rapids-z7r9jz1aaa64j | grace-potter | verify (applied) | 18755527 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/grand-rapids-michigan-the-intersection-2027-02-09-7-30-pm/concert/18755527 | - |
| tm-grace-potter-2027-davenport-z7r9jz1aaak_p | grace-potter | verify (applied) | 18755529 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/davenport-iowa-capitol-theatre-davenport-2027-02-10-7-30-pm/concert/18755529 | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | polyphia | verify (applied) | 18536015 | https://seatgeek.com/polyphia-tickets/san-diego-california-soma-san-diego-2027-02-10-7-30-pm/concert/18536015 | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | don-omar | verify (applied) | 18333383 | https://seatgeek.com/don-omar-tickets/san-diego-california-pechanga-arena-san-diego-2027-02-10-8-pm/concert/18333383 | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | blue-october | verify (applied) | 18245801 | https://seatgeek.com/blue-october-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-02-10-8-pm/concert/18245801 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | dinosaur-jr | verify (applied) | 18540431 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-11-8-pm/concert/18540431 | - |
| tm-feid-2027-miami-vvg1vz_p5_ebxl | feid | verify (applied) | 18746721 | https://seatgeek.com/feid-tickets/miami-florida-kaseya-center-2027-02-11-8-pm/concert/18746721 | - |
| tm-grace-potter-2027-milwaukee-z7r9jz1aaak_j | grace-potter | verify (applied) | 18755534 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/milwaukee-wisconsin-pabst-theater-2027-02-11-7-30-pm/concert/18755534 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595137 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-11-9-pm/concert/18595137 | - |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | nickelback | verify (applied) | 18604483 | https://seatgeek.com/nickelback-tickets/cleveland-ohio-rocket-arena-2027-02-12-6-30-pm/concert/18604483 | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | tobymac | verify (applied) | 18548802 | https://seatgeek.com/tobymac-tickets/sugar-land-texas-smart-financial-centre-2027-02-12-7-pm/concert/18548802 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | dinosaur-jr | verify (applied) | 18540433 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-12-8-pm/concert/18540433 | - |
| tm-valley-2027-chicago-z7r9jz1aavzfy | valley | verify (applied) | 18684172 | https://seatgeek.com/valley-tickets/chicago-illinois-park-west-2027-02-12-7-30-pm/concert/18684172 | - |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | pink-martini | verify (applied) | 18396258 | https://seatgeek.com/pink-martini-tickets/chicago-illinois-chicago-symphony-center-2027-02-12-8-pm/concert/18396258 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | alan-walker | verify (applied) | 18595135 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-12-9-pm/concert/18595135 | - |
| tm-gary-allan-2027-thackerville-z7r9jz1aaaz4v | gary-allan | verify (applied) | 18727084 | https://seatgeek.com/gary-allan-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-02-12-8-pm/concert/18727084 | - |
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | dropkick-murphys | verify (applied) | 18633528 | https://seatgeek.com/dropkick-murphys-tickets/vancouver-canada-pne-forum-vancouver-2027-02-12-7-pm/concert/18633528 | - |
| tm-air-supply-2027-valley-center-vvg1iz_p3nhurb | air-supply | verify (applied) | 18753735 | https://seatgeek.com/air-supply-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-12-8-pm/concert/18753735 | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-los-tigres-del-norte-2027-fort-worth-vvg1yz_4bmn9we | los-tigres-del-norte | verify (applied) | 18738292 | https://seatgeek.com/los-tigres-del-norte-tickets/fort-worth-texas-ariat-arena-2027-02-13-8-30-pm/concert/18738292 | - |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | dropkick-murphys | verify (applied) | 18633535 | https://seatgeek.com/dropkick-murphys-tickets/penticton-canada-penticton-trade-convention-centre-2027-02-13-7-pm/concert/18633535 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | meshuggah | verify (applied) | 18724637 | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | greta-van-fleet | verify (applied) | 18641961 | https://seatgeek.com/greta-van-fleet-tickets/green-bay-wisconsin-resch-center-2027-02-17-7-pm/concert/18641961 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-breaking-benjamin-2027-kalamazoo-z7r9jz1aa7mr3 | breaking-benjamin | verify (applied) | 18742686 | https://seatgeek.com/breaking-benjamin-tickets/kalamazoo-michigan-wings-event-center-2027-02-18-6-30-pm/concert/18742686 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | foreigner | verify (applied) | 18570609 | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 | - |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | air-supply | verify (applied) | 18646927 | https://seatgeek.com/air-supply-tickets/penticton-canada-south-okanagan-events-centre-2027-02-19-6-30-pm/concert/18646927 | - |
| tm-los-tigres-del-norte-2027-lincoln-g5vyz_ph5-cbb | los-tigres-del-norte | verify (applied) | 18757733 | https://seatgeek.com/los-tigres-del-norte-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2027-02-19-7-30-pm/concert/18757733 | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | dinosaur-jr | verify (applied) | 18540442 | https://seatgeek.com/dinosaur-jr-tickets/saint-petersburg-florida-jannus-live-2027-02-20-8-pm/concert/18540442 | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | meshuggah | verify (applied) | 18724639 | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 | - |
| tm-feid-2027-charlotte-g5evz_p1wkize | feid | verify (applied) | 18746722 | https://seatgeek.com/feid-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-20-8-pm/concert/18746722 | - |
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
| tm-feid-2027-boston-vv1a8vpbygagvprx | feid | verify (applied) | 18746720 | https://seatgeek.com/feid-tickets/boston-massachusetts-td-garden-2027-02-23-8-pm/concert/18746720 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-feid-2027-washington-15vfz_ffz04-_ | feid | verify (applied) | 18746730 | https://seatgeek.com/feid-tickets/washington-district-of-columbia-capital-one-arena-2027-02-25-8-pm/concert/18746730 | - |
| tm-grace-potter-2027-kansas-city-z7r9jz1aaak_i | grace-potter | verify (applied) | 18755537 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/kansas-city-missouri-the-truman-2027-02-25-8-pm/concert/18755537 | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | verify (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | verify (applied) | 18723495 | https://seatgeek.com/elevation-worship-tickets/spokane-washington-numerica-veterans-arena-2027-02-25-7-pm/concert/18723495 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | air-supply | verify (applied) | 18753734 | https://seatgeek.com/air-supply-tickets/moose-jaw-canada-temple-gardens-centre-2027-02-26-7-pm/concert/18753734 | - |
| tm-feid-2027-philadelphia-1ayzk4pgkel60vj | feid | verify (applied) | 18746729 | https://seatgeek.com/feid-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-02-26-8-pm/concert/18746729 | - |
| tm-grace-potter-2027-omaha-z7r9jz1aaak_t | grace-potter | verify (applied) | 18755538 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/omaha-nebraska-slowdown-2027-02-26-7-30-pm/concert/18755538 | - |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | chelsea-cutler | verify (applied) | 18802686 | https://seatgeek.com/chelsea-cutler-tickets/austin-texas-emo-s-austin-2027-02-26-8-pm/concert/18802686 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-los-tigres-del-norte-2027-denver-z7r9jz1aaaz8e | los-tigres-del-norte | verify (applied) | 18747096 | https://seatgeek.com/los-tigres-del-norte-tickets/denver-colorado-bellco-theatre-2027-02-27-8-pm/concert/18747096 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | verify (applied) | 18716616 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-28-8-pm/concert/18716616 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-grace-potter-2027-aspen-z7r9jz1aaak_y | grace-potter | verify (applied) | 18755545 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/aspen-colorado-belly-up-aspen-2027-03-01-7-30-pm/concert/18755545 | - |
| tm-remi-wolf-2027-boston-vv1avzk4kgkdrztka | remi-wolf | verify (applied) | 18664755 | https://seatgeek.com/remi-wolf-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-02-8-pm/concert/18664755 | - |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | verify (applied) | 18818916 | https://seatgeek.com/mei-semones-tickets/chicago-illinois-thalia-hall-chicago-2027-03-02-8-pm/concert/18818916 | - |
| tm-grace-potter-2027-santa-fe-z7r9jz1aaak_s | grace-potter | verify (applied) | 18755547 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/santa-fe-new-mexico-lensic-performing-arts-center-2027-03-02-7-30-pm/concert/18755547 | - |
| tm-meshuggah-2027-brooklyn-k7vgf_4lfqrel | meshuggah | verify (applied) | 18724658 | https://seatgeek.com/meshuggah-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-03-6-pm/concert/18724658 | - |
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | greta-van-fleet | verify (applied) | 18611175 | https://seatgeek.com/greta-van-fleet-tickets/cleveland-ohio-rocket-arena-2027-03-03-7-pm/concert/18611175 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-remi-wolf-2027-boston-vv1avzk4kgkdrwrfa | remi-wolf | verify (applied) | 18693829 | https://seatgeek.com/remi-wolf-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-03-8-pm/concert/18693829 | - |
| tm-feid-2027-brooklyn-16dzz_p3og7m3pl | feid | verify (applied) | 18746735 | https://seatgeek.com/feid-tickets/brooklyn-new-york-barclays-center-2027-03-03-8-pm/concert/18746735 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-hannah-harper-2027-anderson-vv17fz_pgkcrhw1m | hannah-harper | verify (applied) | 18759208 | https://seatgeek.com/hannah-harper-tickets/anderson-indiana-paramount-theatre-anderson-2027-03-04-7-pm/concert/18759208 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aa7vv3 | michelle-branch | verify (applied) | 18517280 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-04-7-pm/concert/18517280 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-theory-of-a-deadman-2027-halifax-z7r9jz1aav0ak | theory-of-a-deadman | verify (applied) | 18570534 | https://seatgeek.com/theory-of-a-deadman-tickets/halifax-canada-light-house-arts-centre-2027-03-05-8-pm/concert/18570534 | - |
| tm-meshuggah-2027-new-haven-z7r9jz1aa7t0i | meshuggah | verify (applied) | 18724663 | https://seatgeek.com/meshuggah-tickets/new-haven-connecticut-college-street-music-hall-2027-03-05-7-pm/concert/18724663 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | verify (applied) | 18809189 | https://seatgeek.com/mei-semones-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-05-8-pm/concert/18809189 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | verify (applied) | 18717561 | https://seatgeek.com/blue-october-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-05-8-pm/concert/18717561 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | verify (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-grace-potter-2027-del-mar-rz7hnez1af8to0 | grace-potter | verify (applied) | 18755549 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/del-mar-california-the-sound-del-mar-2027-03-05-8-pm/concert/18755549 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-meshuggah-2027-boston-vv1a8vp4aga5ukxb | meshuggah | verify (applied) | 18724664 | https://seatgeek.com/meshuggah-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-06-7-pm/concert/18724664 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |

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
| tm-katseye-2026-chicago-vvg18z_1mip6i3 | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-two-friends-2026-atlantic-city-1atzk4fgkd6j8cf | two-friends | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-intocable-2026-sugar-land-z7r9jz1a7x9gp | intocable | event is in the past — SeatGeek delists finished shows; nothing to maintain |
