# SeatGeek CTA verification log

Generated: 2026-10-26T23:02:19.454Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1463 (needs_recheck: 806, provenance backfill: 11, stale re-check: 1143)
- Events skipped before API checks: 333
- API calls made: 800
- Verified provenance written: 450
- URLs added: 17
- URLs corrected: 0
- URLs cleared: 3
- Provenance un-verified: 10
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 305
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | verify (applied) | 18095493 | https://seatgeek.com/koe-wetzel-tickets/morrison-colorado-red-rocks-amphitheatre-2026-10-28-6-45-pm/concert/18095493 | - |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | brand-new | verify (applied) | 18319848 | https://seatgeek.com/brand-new-tickets/independence-missouri-cable-dahmer-arena-2026-10-28-8-pm/concert/18319848 | - |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | verify (applied) | 18390268 | https://seatgeek.com/jon-pardi-tickets/biloxi-mississippi-mississippi-coast-coliseum-2026-10-29-6-30-pm/concert/18390268 | - |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | verify (applied) | 18230902 | https://seatgeek.com/treaty-oak-revival-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-10-29-7-pm/concert/18230902 | - |
| tm-the-airborne-toxic-event-2026-chicago-z7r9jz1a70iqs | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | verify (applied) | 18391147 | https://seatgeek.com/jon-pardi-tickets/macon-georgia-atrium-health-amphitheater-2026-10-30-7-pm/concert/18391147 | - |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | verify (applied) | 18095494 | https://seatgeek.com/koe-wetzel-tickets/lubbock-texas-cook-s-garage-2026-10-30-6-45-pm/concert/18095494 | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | add (applied) | 18240069 | https://seatgeek.com/don-omar-tickets/salt-lake-city-utah-delta-center-1-2026-11-01-8-pm/concert/18240069 | - |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | add (applied) | 18579808 | https://seatgeek.com/victoria-monet-tickets/atlanta-georgia-fox-theatre-atlanta-2026-11-04-8-pm/concert/18579808 | - |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | verify (applied) | 18390309 | https://seatgeek.com/jon-pardi-tickets/laredo-texas-sames-auto-arena-2026-11-05-7-pm/concert/18390309 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | verify (applied) | 17637144 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-05-7-pm/concert/17637144 | - |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | add (applied) | 18626682 | https://seatgeek.com/brandi-carlile-tickets/portland-oregon-revolution-hall-portland-2026-11-05-8-pm/concert/18626682 | - |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | anuel-aa | verify (applied) | 18579489 | https://seatgeek.com/anuel-aa-tickets/elmont-new-york-ubs-arena-2026-11-06-8-pm/concert/18579489 | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | verify (applied) | 18390332 | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 | - |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | cristian-castro | verify (applied) | 18078145 | https://seatgeek.com/cristian-castro-tickets/glendale-arizona-desert-diamond-arena-2026-11-06-8-pm/concert/18078145 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | barry-manilow | verify (applied) | 17637145 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-06-8-pm/concert/17637145 | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | verify (applied) | 18391256 | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 | - |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | add (applied) | 18556120 | https://seatgeek.com/victoria-monet-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-07-8-pm/concert/18556120 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | verify (applied) | 18078276 | https://seatgeek.com/cristian-castro-tickets/el-paso-texas-el-paso-county-coliseum-2026-11-07-8-pm/concert/18078276 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | verify (applied) | 17637146 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-07-7-pm/concert/17637146 | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | verify (applied) | 18229329 | https://seatgeek.com/treaty-oak-revival-tickets/austin-texas-moody-center-atx-2026-11-12-7-pm/concert/18229329 | - |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | verify (applied) | 18390356 | https://seatgeek.com/jon-pardi-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2026-11-12-7-pm/concert/18390356 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | barry-manilow | verify (applied) | 17637148 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-12-7-pm/concert/17637148 | - |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | treaty-oak-revival | verify (applied) | 18229327 | https://seatgeek.com/treaty-oak-revival-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2026-11-13-7-pm/concert/18229327 | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | jon-pardi | verify (applied) | 18390874 | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-13-7-pm/concert/18390874 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | barry-manilow | verify (applied) | 17637150 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-13-8-pm/concert/17637150 | - |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | jon-pardi | verify (applied) | 18390529 | https://seatgeek.com/jon-pardi-tickets/independence-missouri-cable-dahmer-arena-2026-11-14-7-pm/concert/18390529 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | add (applied) | 18626684 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-14-8-pm/concert/18626684 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | barry-manilow | verify (applied) | 17637151 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-14-7-pm/concert/17637151 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | add (applied) | 18626686 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-15-8-pm/concert/18626686 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | brandi-carlile | verify (applied) | 18626663 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-17-8-pm/concert/18626663 | - |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | victoria-monet | verify (applied) | 18579778 | https://seatgeek.com/victoria-monet-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-18-7-pm/concert/18579778 | - |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | brandi-carlile | verify (applied) | 18626661 | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-18-8-pm/concert/18626661 | - |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | brandi-carlile | verify (applied) | 18626665 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-20-8-pm/concert/18626665 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | treaty-oak-revival | verify (applied) | 18590276 | https://seatgeek.com/treaty-oak-revival-tickets/tulsa-oklahoma-bok-center-2026-11-21-6-pm/concert/18590276 | - |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | victoria-monet | verify (applied) | 18579799 | https://seatgeek.com/victoria-monet-tickets/toronto-canada-coca-cola-coliseum-2026-11-21-8-pm/concert/18579799 | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | brandi-carlile | verify (applied) | 18626671 | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-21-8-pm/concert/18626671 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | victoria-monet | verify (applied) | 18579779 | https://seatgeek.com/victoria-monet-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-11-22-8-pm/concert/18579779 | - |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | brandi-carlile | verify (applied) | 18626672 | https://seatgeek.com/brandi-carlile-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-22-8-pm/concert/18626672 | - |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | victoria-monet | verify (applied) | 18579782 | https://seatgeek.com/victoria-monet-tickets/new-york-new-york-the-theater-at-msg-1-2026-11-24-8-pm/concert/18579782 | - |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | victoria-monet | verify (applied) | 18579783 | https://seatgeek.com/victoria-monet-tickets/washington-district-of-columbia-the-anthem-dc-2026-11-27-8-pm/concert/18579783 | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | cristian-castro | verify (applied) | 18082276 | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | cristian-castro | verify (applied) | 18077764 | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | victoria-monet | verify (applied) | 18579785 | https://seatgeek.com/victoria-monet-tickets/nashville-tennessee-the-truth-nashville-2026-11-30-8-pm/concert/18579785 | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | koe-wetzel | verify (applied) | 18649773 | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | victoria-monet | verify (applied) | 18579809 | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | barry-manilow | verify (applied) | 17637156 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-03-7-pm/concert/17637156 | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | koe-wetzel | verify (applied) | 18649774 | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | barry-manilow | verify (applied) | 17637157 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-04-8-pm/concert/17637157 | - |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | koe-wetzel | verify (applied) | 18649776 | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 | - |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | luke-bryan | verify (applied) | 18571831 | https://seatgeek.com/luke-bryan-tickets/mescalero-new-mexico-inn-of-the-mountain-gods-resort-and-casino-2026-12-05-8-pm/concert/18571831 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | barry-manilow | verify (applied) | 17637159 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 | - |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | victoria-monet | verify (applied) | 18579787 | https://seatgeek.com/victoria-monet-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-05-8-pm/concert/18579787 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | victoria-monet | verify (applied) | 18579790 | https://seatgeek.com/victoria-monet-tickets/san-diego-california-cal-coast-credit-union-open-air-theatre-at-sdsu-2026-12-06-8-pm/concert/18579790 | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | victoria-monet | verify (applied) | 18579791 | https://seatgeek.com/victoria-monet-tickets/inglewood-california-youtube-theater-2026-12-08-8-pm/concert/18579791 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | add (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | barry-manilow | verify (applied) | 17637161 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-10-7-pm/concert/17637161 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | luke-bryan | clear (applied) | - | - | stored URL failed: event instants differ by -12.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-koe-wetzel-2026-las-vegas-1ayzkfkgkdtup_a | koe-wetzel | verify (applied) | 18471843 | https://seatgeek.com/koe-wetzel-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2026-12-11-8-pm/concert/18471843 | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | brandi-carlile | verify (applied) | 18626674 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-15-8-pm/concert/18626674 | - |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | brandi-carlile | verify (applied) | 18626676 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-16-8-pm/concert/18626676 | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | andrea-bocelli | verify (applied) | 18039167 | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-17-8-pm/concert/18039167 | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | brandi-carlile | verify (applied) | 18626680 | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-17-8-pm/concert/18626680 | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | blue-october | verify (applied) | 18141897 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-18-8-pm/concert/18141897 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | gracie-abrams | verify (applied) | 18270524 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-18-8-pm/concert/18270524 | - |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-houston-g5diz_65lyohs | blue-october | verify (applied) | 18141898 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-19-8-pm/concert/18141898 | - |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | pentatonix | verify (applied) | 18427231 | https://seatgeek.com/pentatonix-tickets/glendale-arizona-desert-diamond-arena-2026-12-19-7-pm/concert/18427231 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | gracie-abrams | verify (applied) | 18270527 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-19-8-pm/concert/18270527 | - |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | stevie-wonder | verify (applied) | 18570218 | https://seatgeek.com/stevie-wonder-tickets/inglewood-california-intuit-dome-2026-12-19-8-pm/concert/18570218 | - |
| tm-blue-october-2026-houston-g5diz_1sa9wed | blue-october | verify (applied) | 18248695 | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-20-8-pm/concert/18248695 | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0eryu | gracie-abrams | verify (applied) | 18270529 | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-20-8-pm/concert/18270529 | - |
| tm-andrea-bocelli-2026-pittsburgh-1apzk8vgkdk8zer | andrea-bocelli | verify (applied) | 18039186 | https://seatgeek.com/andrea-bocelli-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-21-8-pm/concert/18039186 | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx | jonas-brothers | verify (applied) | 18532484 | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-22-7-30-pm/concert/18532484 | - |
| tm-andrea-bocelli-2026-philadelphia-1ayzk8ygkdwg9ej | andrea-bocelli | verify (applied) | 18039187 | https://seatgeek.com/andrea-bocelli-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-22-8-pm/concert/18039187 | - |
| tm-pentatonix-2026-inglewood-vv1aazkf7gkdi1gsn | pentatonix | verify (applied) | 18427236 | https://seatgeek.com/pentatonix-tickets/inglewood-california-kia-forum-2026-12-22-7-pm/concert/18427236 | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | add (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-boston-vv168vp7y-kz7ukua | stella-lefty | verify (applied) | 18527914 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-01-17-8-pm/concert/18527914 | - |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrjdss | stella-lefty | verify (applied) | 18527915 | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-19-7-pm/concert/18527915 | - |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrqdsw | stella-lefty | verify (applied) | 18539681 | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-20-7-pm/concert/18539681 | - |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-alan-walker-2027-irving-vvg1yz_3nb2d-j | alan-walker | verify (applied) | 18591363 | https://seatgeek.com/alan-walker-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-01-22-7-pm/concert/18591363 | - |
| tm-hilary-duff-2027-vancouver-1aozko7gkervl69 | hilary-duff | verify (applied) | 18070273 | https://seatgeek.com/hilary-duff-tickets/vancouver-canada-rogers-arena-2027-01-22-7-30-pm/concert/18070273 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi | eagles | verify (applied) | 18421047 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-22-8-30-pm/concert/18421047 | - |
| tm-stella-lefty-2027-washington-1a4zkffgkdf8c-z | stella-lefty | verify (applied) | 18527882 | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-anthem-dc-2027-01-23-8-pm/concert/18527882 | - |
| tm-alan-walker-2027-houston-g5diz_3no4w3_ | alan-walker | verify (applied) | 18591361 | https://seatgeek.com/alan-walker-tickets/houston-texas-713-music-hall-2027-01-23-7-pm/concert/18591361 | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpt2sm | eagles | verify (applied) | 18421046 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-23-8-30-pm/concert/18421046 | - |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-calgary-1k78v0ojga2h3es | hilary-duff | verify (applied) | 18070275 | https://seatgeek.com/hilary-duff-tickets/calgary-canada-scotiabank-saddledome-2027-01-26-7-30-pm/concert/18070275 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_1bnjn8f | gracie-abrams | verify (applied) | 18270533 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-26-8-pm/concert/18270533 | - |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-edmonton-1k78v0ooga1ytpq | hilary-duff | verify (applied) | 18070276 | https://seatgeek.com/hilary-duff-tickets/edmonton-canada-rogers-place-2027-01-27-7-30-pm/concert/18070276 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5rykvjn | gracie-abrams | verify (applied) | 18270531 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-27-8-pm/concert/18270531 | - |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-charlotte-g5evz_8mutuyo | andrea-bocelli | verify (applied) | 18581438 | https://seatgeek.com/andrea-bocelli-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-01-29-8-pm/concert/18581438 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5ry97ef | gracie-abrams | verify (applied) | 18270535 | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-29-8-pm/concert/18270535 | - |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-winnipeg-1av7z_7gknwgxan | hilary-duff | verify (applied) | 18070916 | https://seatgeek.com/hilary-duff-tickets/winnipeg-canada-canada-life-centre-2027-01-30-7-30-pm/concert/18070916 | - |
| tm-cristian-castro-2027-west-valley-city-g5vzz_aklolqq | cristian-castro | verify (applied) | 18091097 | https://seatgeek.com/cristian-castro-tickets/west-valley-city-utah-maverik-center-2027-01-30-8-pm/concert/18091097 | - |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-baltimore-1a4zkffgkepsf12 | andrea-bocelli | verify (applied) | 18581441 | https://seatgeek.com/andrea-bocelli-tickets/baltimore-maryland-cfg-bank-arena-2027-01-31-8-pm/concert/18581441 | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byq5cg | gracie-abrams | verify (applied) | 18270537 | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-01-31-8-pm/concert/18270537 | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byqdcd | gracie-abrams | verify (applied) | 18270540 | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-02-01-8-pm/concert/18270540 | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-atlanta-vvg1zz_36bbobm | andrea-bocelli | verify (applied) | 18581439 | https://seatgeek.com/andrea-bocelli-tickets/atlanta-georgia-state-farm-arena-1-2027-02-02-8-pm/concert/18581439 | - |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-tampa-vvg1vz_oe_5n5h | tobymac | verify (applied) | 18542762 | https://seatgeek.com/tobymac-tickets/tampa-florida-benchmark-international-arena-2027-02-04-7-pm/concert/18542762 | - |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-austin-g5diz_3kpl_-e | andrea-bocelli | verify (applied) | 18581440 | https://seatgeek.com/andrea-bocelli-tickets/austin-texas-moody-center-atx-2027-02-04-8-pm/concert/18581440 | - |
| tm-greta-van-fleet-2027-tampa-vvg1vz_kmcwtil | greta-van-fleet | verify (applied) | 18641947 | https://seatgeek.com/greta-van-fleet-tickets/tampa-florida-benchmark-international-arena-2027-02-05-7-pm/concert/18641947 | - |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-washington-1ka8vpuogaub0mr | fantasia | verify (applied) | 18629248 | https://seatgeek.com/fantasia-tickets/washington-district-of-columbia-capital-one-arena-2027-02-05-8-pm/concert/18629248 | - |
| tm-andrea-bocelli-2027-dallas-vvg1yz_33_tj3c | andrea-bocelli | verify (applied) | 18581442 | https://seatgeek.com/andrea-bocelli-tickets/dallas-texas-american-airlines-center-2027-02-05-8-pm/concert/18581442 | - |
| tm-don-omar-2027-sacramento-g5vyz_u1sfm0b | don-omar | verify (applied) | 18326389 | https://seatgeek.com/don-omar-tickets/sacramento-california-golden-1-center-2027-02-05-8-pm/concert/18326389 | - |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-orlando-1axzkf_gkdtkgpv | tobymac | verify (applied) | 18542768 | https://seatgeek.com/tobymac-tickets/orlando-florida-kia-center-2027-02-06-7-pm/concert/18542768 | - |
| tm-greta-van-fleet-2027-jacksonville-1aefz_kgkdyuafx | greta-van-fleet | verify (applied) | 18641952 | https://seatgeek.com/greta-van-fleet-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-06-7-pm/concert/18641952 | - |
| tm-alan-walker-2027-washington-1a4zkftgkdat1lk | alan-walker | verify (applied) | 18591378 | https://seatgeek.com/alan-walker-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-06-8-pm/concert/18591378 | - |
| tm-dylan-scott-2027-boston-vv1avzkftgkeyygcg | dylan-scott | verify (applied) | 18601525 | https://seatgeek.com/dylan-scott-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-06-8-pm/concert/18601525 | - |
| tm-polyphia-2027-las-vegas-169zkfppazau15va | polyphia | verify (applied) | 18536013 | https://seatgeek.com/polyphia-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-02-06-6-30-pm/concert/18536013 | - |
| tm-blue-october-2027-phoenix-17k8v0g61ltk12k | blue-october | verify (applied) | 18239522 | https://seatgeek.com/blue-october-tickets/phoenix-arizona-the-van-buren-2027-02-06-8-pm/concert/18239522 | - |
| tm-tobymac-2027-estero-vvg1vz_onusnh8 | tobymac | verify (applied) | 18542782 | https://seatgeek.com/tobymac-tickets/estero-florida-hertz-arena-2027-02-07-6-30-pm/concert/18542782 | - |
| tm-hilary-duff-2027-halifax-1ad7z_7gkm3f7fo | hilary-duff | verify (applied) | 18070285 | https://seatgeek.com/hilary-duff-tickets/halifax-canada-scotiabank-centre-2027-02-07-7-30-pm/concert/18070285 | - |
| tm-blue-october-2027-los-angeles-vvg10z_1ri5jq_ | blue-october | verify (applied) | 18238353 | https://seatgeek.com/blue-october-tickets/los-angeles-california-the-wiltern-2027-02-07-7-pm/concert/18238353 | - |
| tm-don-omar-2027-seattle-vvg1hz_u4jzxck | don-omar | verify (applied) | 18325125 | https://seatgeek.com/don-omar-tickets/seattle-washington-climate-pledge-arena-2027-02-07-8-pm/concert/18325125 | - |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-allentown-15dzz_frakkqv | nickelback | verify (applied) | 18664577 | https://seatgeek.com/nickelback-tickets/allentown-pennsylvania-ppl-center-2027-02-08-6-30-pm/concert/18664577 | - |
| tm-daughtry-2027-sacramento-g5vyz_k60xnfe | daughtry | verify (applied) | 18632909 | https://seatgeek.com/daughtry-tickets/sacramento-channel-24-sacramento-2027-02-08-7-pm/concert/18632909 | - |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-atlanta-vvg1zz_kmneaip | greta-van-fleet | verify (applied) | 18641951 | https://seatgeek.com/greta-van-fleet-tickets/atlanta-georgia-state-farm-arena-1-2027-02-09-7-pm/concert/18641951 | - |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2027-asheville-g5evz_omwcg3b | billy-strings | verify (applied) | 18540083 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-09-7-30-pm/concert/18540083 | - |
| tm-alan-walker-2027-philadelphia-vv1aezkfxgkdmhfsx | alan-walker | verify (applied) | 18591283 | https://seatgeek.com/alan-walker-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-09-8-pm/concert/18591283 | - |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-grand-rapids-vv1afzk4agkd4fpse | nickelback | verify (applied) | 18664576 | https://seatgeek.com/nickelback-tickets/grand-rapids-michigan-van-andel-arena-2027-02-10-6-30-pm/concert/18664576 | - |
| tm-alan-walker-2027-boston-vv1a8vpfzgauaajv | alan-walker | verify (applied) | 18591763 | https://seatgeek.com/alan-walker-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-10-7-pm/concert/18591763 | - |
| tm-andrea-bocelli-2027-orlando-1axzkfigkdrsgpw | andrea-bocelli | verify (applied) | 18581443 | https://seatgeek.com/andrea-bocelli-tickets/orlando-florida-kia-center-2027-02-10-8-pm/concert/18581443 | - |
| tm-chelsea-cutler-2027-philadelphia-vv1aovpuygauryej | chelsea-cutler | verify (applied) | 18639181 | https://seatgeek.com/chelsea-cutler-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-02-10-8-pm/concert/18639181 | - |
| tm-greta-van-fleet-2027-nashville-g5viz_kzhjzwy | greta-van-fleet | verify (applied) | 18641949 | https://seatgeek.com/greta-van-fleet-tickets/nashville-tennessee-bridgestone-arena-2027-02-10-7-pm/concert/18641949 | - |
| tm-daughtry-2027-denver-g5vzz_knzyqbr | daughtry | verify (applied) | 18632910 | https://seatgeek.com/daughtry-tickets/denver-colorado-paramount-theatre-co-2027-02-10-7-pm/concert/18632910 | - |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-charleston-1avbz_kgkb6hkqy | the-red-clay-strays | verify (applied) | 18639078 | https://seatgeek.com/the-red-clay-strays-tickets/charleston-west-virginia-charleston-coliseum-convention-center-2027-02-11-7-pm/concert/18639078 | - |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-pensacola-g5viz_o9zokbz | tobymac | verify (applied) | 18542754 | https://seatgeek.com/tobymac-tickets/pensacola-florida-pensacola-bay-center-2027-02-11-7-pm/concert/18542754 | - |
| tm-the-lemonheads-2027-brooklyn-k7vgf_3rtiqkk | the-lemonheads | verify (applied) | 18593930 | https://seatgeek.com/the-lemonheads-tickets/brooklyn-new-york-brooklyn-bowl-ny-2027-02-11-8-pm/concert/18593930 | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5lj2s | boyz-ii-men | verify (applied) | 18697996 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-11-8-pm/concert/18697996 | - |
| tm-gracie-abrams-2027-chicago-vv1fvzv0pycdz72ag6 | gracie-abrams | verify (applied) | 18270541 | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-11-8-pm/concert/18270541 | - |
| tm-polyphia-2027-anaheim-vvg10z_gea9xhx | polyphia | verify (applied) | 18312311 | https://seatgeek.com/polyphia-tickets/anaheim-california-house-of-blues-anaheim-2027-02-11-6-30-pm/concert/18312311 | - |
| tm-don-omar-2027-fresno-g5vyz_u5k7ws7 | don-omar | verify (applied) | 18325133 | https://seatgeek.com/don-omar-tickets/fresno-california-save-mart-center-2027-02-11-8-pm/concert/18325133 | - |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3nv0vjm | andrea-bocelli | verify (applied) | 18581450 | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-12-8-pm/concert/18581450 | - |
| tm-greta-van-fleet-2027-rosemont-vv178z_kgkmrjctr | greta-van-fleet | verify (applied) | 18641950 | https://seatgeek.com/greta-van-fleet-tickets/rosemont-illinois-allstate-arena-2027-02-12-7-pm/concert/18641950 | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5ij2m | boyz-ii-men | verify (applied) | 18697998 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-12-8-pm/concert/18697998 | - |
| tm-gracie-abrams-2027-chicago-vvg18z_5rd-dah | gracie-abrams | verify (applied) | 18270544 | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-12-8-pm/concert/18270544 | - |
| tm-stella-lefty-2027-salt-lake-city-g5vzz_okzttv5 | stella-lefty | verify (applied) | 18527918 | https://seatgeek.com/stella-lefty-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-02-12-8-pm/concert/18527918 | - |
| tm-don-omar-2027-inglewood-vvg10z_u2a3ul3 | don-omar | verify (applied) | 18326622 | https://seatgeek.com/don-omar-tickets/inglewood-california-intuit-dome-2027-02-12-8-pm/concert/18326622 | - |
| tm-cristian-castro-2027-anaheim-vv1aazkofgkeidrym | cristian-castro | verify (applied) | 18091093 | https://seatgeek.com/cristian-castro-tickets/anaheim-california-honda-center-2027-02-12-8-pm/concert/18091093 | - |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-columbus-vv1aazk4agkduqw0h | nickelback | verify (applied) | 18664574 | https://seatgeek.com/nickelback-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-02-13-6-30-pm/concert/18664574 | - |
| tm-billy-strings-2027-duluth-vvg1zz_ointe8l | billy-strings | verify (applied) | 18540092 | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-13-7-30-pm/concert/18540092 | - |
| tm-missio-2027-philadelphia-vv17fz_8gkn83pvw | missio | verify (applied) | 18492961 | https://seatgeek.com/missio-tickets/philadelphia-pennsylvania-the-foundry-philadelphia-2027-02-13-8-pm/concert/18492961 | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3ervkx7 | andrea-bocelli | verify (applied) | 18581451 | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-13-8-pm/concert/18581451 | - |
| tm-fantasia-2027-atlantic-city-vv1aezkfmgkegjgo6 | fantasia | verify (applied) | 18629442 | https://seatgeek.com/fantasia-tickets/atlantic-city-new-jersey-boardwalk-hall-2027-02-13-8-pm/concert/18629442 | - |
| tm-greta-van-fleet-2027-omaha-vv17bz_kgkmgzcnp | greta-van-fleet | verify (applied) | 18641959 | https://seatgeek.com/greta-van-fleet-tickets/omaha-nebraska-chi-health-center-omaha-2027-02-13-7-pm/concert/18641959 | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkes0irs | pink-martini | verify (applied) | 18472526 | https://seatgeek.com/pink-martini-tickets/minneapolis-minnesota-pantages-theatre-minneapolis-2027-02-13-8-pm/concert/18472526 | - |
| tm-blue-october-2027-las-vegas-17ayv0g61ppuqbc | blue-october | verify (applied) | 18239352 | https://seatgeek.com/blue-october-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2027-02-13-7-pm/concert/18239352 | - |
| tm-yuridia-2027-phoenix-1a_zkfxgkecvpec | yuridia | verify (applied) | 18570386 | https://seatgeek.com/yuridia-tickets/phoenix-arizona-arizona-financial-theatre-2027-02-13-8-pm/concert/18570386 | - |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkesphrg | pink-martini | verify (applied) | 18472525 | https://seatgeek.com/pink-martini-tickets/minneapolis-minnesota-pantages-theatre-minneapolis-2027-02-14-2-pm/concert/18472525 | - |
| tm-gracie-abrams-2027-nashville-g5viz_51oey1w | gracie-abrams | verify (applied) | 18270545 | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-14-8-pm/concert/18270545 | - |
| tm-polyphia-2027-san-francisco-g5vyz_gra3gjr | polyphia | verify (applied) | 18312310 | https://seatgeek.com/polyphia-tickets/san-francisco-california-the-masonic-san-francisco-2027-02-14-7-30-pm/concert/18312310 | - |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-minneapolis-vv17bz_kgku0ofzs | greta-van-fleet | verify (applied) | 18641960 | https://seatgeek.com/greta-van-fleet-tickets/minneapolis-minnesota-target-center-2027-02-15-7-pm/concert/18641960 | - |
| tm-gracie-abrams-2027-nashville-g5viz_5rgv7ra | gracie-abrams | verify (applied) | 18270546 | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-15-8-pm/concert/18270546 | - |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-indianapolis-vv1aazk4agkdzn6zd | nickelback | verify (applied) | 18664572 | https://seatgeek.com/nickelback-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-02-16-6-30-pm/concert/18664572 | - |
| tm-alan-walker-2027-montreal-1aszkfngkelr9-v | alan-walker | verify (applied) | 18590510 | https://seatgeek.com/alan-walker-tickets/montreal-canada-mtelus-2027-02-16-8-pm/concert/18590510 | - |
| tm-dinosaur-jr-2027-silver-spring-164zkf4pnzau65fa | dinosaur-jr | verify (applied) | 18540432 | https://seatgeek.com/dinosaur-jr-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-02-16-8-pm/concert/18540432 | - |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-alan-walker-2027-montreal-1aszkfngkely6-x | alan-walker | verify (applied) | 18684023 | https://seatgeek.com/alan-walker-tickets/montreal-canada-mtelus-2027-02-17-8-pm/concert/18684023 | - |
| tm-polyphia-2027-seattle-vvg1hz_oxmv1cx | polyphia | verify (applied) | 18536016 | https://seatgeek.com/polyphia-tickets/seattle-washington-paramount-theatre-wa-2027-02-17-7-30-pm/concert/18536016 | - |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-columbus-vv1aazkfbgkdjr-4o | tobymac | verify (applied) | 18542766 | https://seatgeek.com/tobymac-tickets/columbus-ohio-nationwide-arena-2027-02-18-7-pm/concert/18542766 | - |
| tm-nickelback-2027-chicago-vv1a7zk4agkexo6el | nickelback | verify (applied) | 18664573 | https://seatgeek.com/nickelback-tickets/chicago-illinois-united-center-2027-02-18-6-30-pm/concert/18664573 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yuridia-2027-las-vegas-1ayzkfngkdql5vb | yuridia | verify (applied) | 18570391 | https://seatgeek.com/yuridia-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2027-02-18-8-pm/concert/18570391 | - |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-fairfax-1a4zkf_gkd7dmjf | tobymac | verify (applied) | 18542848 | https://seatgeek.com/tobymac-tickets/fairfax-virginia-eaglebank-arena-2027-02-19-7-pm/concert/18542848 | - |
| tm-greta-van-fleet-2027-louisville-1avbz_kgkbymb5h | greta-van-fleet | verify (applied) | 18641962 | https://seatgeek.com/greta-van-fleet-tickets/louisville-kentucky-kfc-yum-center-2027-02-19-7-pm/concert/18641962 | - |
| tm-polyphia-2027-salt-lake-city-g5vzz_ojsblfw | polyphia | verify (applied) | 18312320 | https://seatgeek.com/polyphia-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-02-19-7-30-pm/concert/18312320 | - |
| tm-needtobreathe-2027-waukee-1ae7z_3gktpcjjf | needtobreathe | verify (applied) | 18621527 | https://seatgeek.com/needtobreathe-tickets/waukee-iowa-vibrant-music-hall-2027-02-19-7-30-pm/concert/18621527 | - |
| tm-fantasia-2027-new-orleans-g5viz_k6css2k | fantasia | verify (applied) | 18629243 | https://seatgeek.com/fantasia-tickets/new-orleans-louisiana-smoothie-king-center-2027-02-19-8-pm/concert/18629243 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kgjhjj | blue-october | verify (applied) | 18261216 | https://seatgeek.com/blue-october-tickets/sacramento-channel-24-sacramento-2027-02-19-8-pm/concert/18261216 | - |
| tm-sylvan-esso-2027-seattle-vvg1hz_g92don0 | sylvan-esso | verify (applied) | 18299159 | https://seatgeek.com/sylvan-esso-tickets/seattle-washington-paramount-theatre-wa-2027-02-19-7-pm/concert/18299159 | - |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tobymac-2027-fairfax-1a4zkf_gkdgvwvn | tobymac | verify (applied) | 18542849 | https://seatgeek.com/tobymac-tickets/fairfax-virginia-eaglebank-arena-2027-02-20-7-pm/concert/18542849 | - |
| tm-daughtry-2027-rockford-16e7z_kkfg7v38v | daughtry | verify (applied) | 18632923 | https://seatgeek.com/daughtry-tickets/rockford-illinois-hard-rock-live-rockford-2027-02-20-7-pm/concert/18632923 | - |
| tm-greta-van-fleet-2027-pittsburgh-1avbz_kgkmosrsz | greta-van-fleet | verify (applied) | 18641964 | https://seatgeek.com/greta-van-fleet-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-02-20-7-pm/concert/18641964 | - |
| tm-needtobreathe-2027-minneapolis-vv1akzkfwgkdmqcn1 | needtobreathe | verify (applied) | 18621530 | https://seatgeek.com/needtobreathe-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-02-20-7-pm/concert/18621530 | - |
| tm-mico-2027-charlotte-g5evz_fqqay6k | mico | verify (applied) | 18667445 | https://seatgeek.com/mico-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-02-20-8-pm/concert/18667445 | - |
| tm-billy-strings-2027-nashville-g5viz_on5a9pr | billy-strings | verify (applied) | 18540094 | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-20-7-30-pm/concert/18540094 | - |
| tm-stella-lefty-2027-chicago-vv1a7zkf3ovc9zec5 | stella-lefty | verify (applied) | 18527904 | https://seatgeek.com/stella-lefty-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-20-8-pm/concert/18527904 | - |
| tm-fantasia-2027-biloxi-g5viz_kxokyjj | fantasia | verify (applied) | 18629249 | https://seatgeek.com/fantasia-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-02-20-8-pm/concert/18629249 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kvkgjw | blue-october | verify (applied) | 18239942 | https://seatgeek.com/blue-october-tickets/sacramento-channel-24-sacramento-2027-02-20-8-pm/concert/18239942 | - |
| tm-yuridia-2027-inglewood-vvg1iz_3kmopkh | yuridia | verify (applied) | 18570397 | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-20-8-pm/concert/18570397 | - |
| tm-daughtry-2027-gary-vv1aazkfygkesuefr | daughtry | verify (applied) | 18632924 | https://seatgeek.com/daughtry-tickets/gary-indiana-hard-rock-live-northern-indiana-2027-02-21-6-pm/concert/18632924 | - |
| tm-hans-zimmer-2027-newark-vv1aezkfygkepjhre | hans-zimmer | verify (applied) | 18601919 | https://seatgeek.com/hans-zimmer-tickets/newark-new-jersey-prudential-center-2027-02-21-7-30-pm/concert/18601919 | - |
| tm-nickelback-2027-nashville-g5viz_frya27y | nickelback | verify (applied) | 18664585 | https://seatgeek.com/nickelback-tickets/nashville-tennessee-bridgestone-arena-2027-02-21-6-30-pm/concert/18664585 | - |
| tm-don-omar-2027-montreal-17g8v0g6ucxtixy | don-omar | verify (applied) | 18325136 | https://seatgeek.com/don-omar-tickets/montreal-canada-centre-bell-2027-02-21-8-pm/concert/18325136 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yuridia-2027-inglewood-vvg1iz_33c4njl | yuridia | verify (applied) | 18584334 | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-21-8-pm/concert/18584334 | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-houston-g5diz_3mypste | the-lemonheads | verify (applied) | 18594767 | https://seatgeek.com/the-lemonheads-tickets/houston-texas-white-oak-music-hall-upstairs-2027-02-22-7-30-pm/concert/18594767 | - |
| tm-daughtry-2027-detroit-vv1kezvpg_ga5zp8l | daughtry | verify (applied) | 18632929 | https://seatgeek.com/daughtry-tickets/detroit-michigan-the-fillmore-detroit-2027-02-23-8-pm/concert/18632929 | - |
| tm-hans-zimmer-2027-philadelphia-1kgzvpgaga1lecy | hans-zimmer | verify (applied) | 18601920 | https://seatgeek.com/hans-zimmer-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-02-23-7-30-pm/concert/18601920 | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqeia0 | gracie-abrams | verify (applied) | 18270553 | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-23-8-pm/concert/18270553 | - |
| tm-hans-zimmer-2027-boston-vv1avzkftgkdjvzxr | hans-zimmer | verify (applied) | 18601922 | https://seatgeek.com/hans-zimmer-tickets/boston-massachusetts-td-garden-2027-02-24-7-30-pm/concert/18601922 | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqiiai | gracie-abrams | verify (applied) | 18270554 | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-24-8-pm/concert/18270554 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | add (applied) | 18723495 | https://seatgeek.com/elevation-worship-tickets/spokane-washington-numerica-veterans-arena-2027-02-25-7-pm/concert/18723495 | - |
| tm-yuridia-2027-fresno-g5vyz_35vhmjx | yuridia | verify (applied) | 18570392 | https://seatgeek.com/yuridia-tickets/fresno-california-save-mart-center-2027-02-25-8-pm/concert/18570392 | - |
| tm-nickelback-2027-hollywood-vvg1vz_fpmhiza | nickelback | verify (applied) | 18664588 | https://seatgeek.com/nickelback-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-26-6-30-pm/concert/18664588 | - |
| tm-alan-walker-2027-chicago-vv1k8z_3gyg7zohx | alan-walker | verify (applied) | 18590319 | https://seatgeek.com/alan-walker-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-26-6-pm/concert/18590319 | - |
| tm-gracie-abrams-2027-charlotte-g5evz_am0wlwu | gracie-abrams | verify (applied) | 18270558 | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-26-8-pm/concert/18270558 | - |
| tm-don-omar-2027-rosemont-vvg18z_u5mkrgh | don-omar | verify (applied) | 18325237 | https://seatgeek.com/don-omar-tickets/rosemont-illinois-allstate-arena-2027-02-26-8-pm/concert/18325237 | - |
| tm-morat-2027-inglewood-vvg10z_1tsiuwe | morat | verify (applied) | 18252820 | https://seatgeek.com/morat-tickets/inglewood-california-intuit-dome-2027-02-26-8-pm/concert/18252820 | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-charlotte-g5evz_5ryzbyv | gracie-abrams | verify (applied) | 18270559 | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-27-8-pm/concert/18270559 | - |
| tm-cristian-castro-2027-hidalgo-g5diz_a2dt_o4 | cristian-castro | verify (applied) | 18091132 | https://seatgeek.com/cristian-castro-tickets/hidalgo-texas-payne-arena-2027-02-27-8-pm/concert/18091132 | - |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-cristian-castro-2027-cedar-park-g5diz_ak4-aew | cristian-castro | verify (applied) | 18091442 | https://seatgeek.com/cristian-castro-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-02-28-7-pm/concert/18091442 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-boston-vv177z_agkwp_mnl | gracie-abrams | verify (applied) | 18270560 | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-01-8-pm/concert/18270560 | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-atlanta-vvg1zz_f9i_ugh | nickelback | verify (applied) | 18664590 | https://seatgeek.com/nickelback-tickets/atlanta-georgia-state-farm-arena-1-2027-03-02-6-30-pm/concert/18664590 | - |
| tm-gracie-abrams-2027-boston-vvg17z_5rug2cb | gracie-abrams | verify (applied) | 18270564 | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-02-8-pm/concert/18270564 | - |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-don-omar-2027-newark-vvg1fz_u5xkezy | don-omar | verify (applied) | 18325178 | https://seatgeek.com/don-omar-tickets/newark-new-jersey-prudential-center-2027-03-03-8-pm/concert/18325178 | - |
| tm-hans-zimmer-2027-detroit-vv17oz_3gky-owzw | hans-zimmer | verify (applied) | 18601918 | https://seatgeek.com/hans-zimmer-tickets/detroit-michigan-little-caesars-arena-2027-03-03-7-30-pm/concert/18601918 | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-needtobreathe-2027-brooklyn-k7vgf_kxvnxba | needtobreathe | verify (applied) | 18621542 | https://seatgeek.com/needtobreathe-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-04-6-pm/concert/18621542 | - |
| tm-nickelback-2027-raleigh-g5evz_fh5odfi | nickelback | verify (applied) | 18664594 | https://seatgeek.com/nickelback-tickets/raleigh-north-carolina-lenovo-center-2027-03-04-6-30-pm/concert/18664594 | - |
| tm-gracie-abrams-2027-washington-1avfz_agksfejeq | gracie-abrams | verify (applied) | 18270566 | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-04-8-pm/concert/18270566 | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | lukas-graham | verify (applied) | 18617618 | https://seatgeek.com/lukas-graham-tickets/tampa-florida-the-ritz-ybor-2027-03-05-6-pm/concert/18617618 | - |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | needtobreathe | verify (applied) | 18621543 | https://seatgeek.com/needtobreathe-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-05-7-pm/concert/18621543 | - |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | greta-van-fleet | verify (applied) | 18641971 | https://seatgeek.com/greta-van-fleet-tickets/boston-massachusetts-td-garden-2027-03-05-7-pm/concert/18641971 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | nickelback | verify (applied) | 18664595 | https://seatgeek.com/nickelback-tickets/newark-new-jersey-prudential-center-2027-03-06-6-30-pm/concert/18664595 | - |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | polyphia | verify (applied) | 18312312 | https://seatgeek.com/polyphia-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-06-7-30-pm/concert/18312312 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | nickelback | verify (applied) | 18664598 | https://seatgeek.com/nickelback-tickets/washington-district-of-columbia-capital-one-arena-2027-03-08-6-30-pm/concert/18664598 | - |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | greta-van-fleet | verify (applied) | 18641973 | https://seatgeek.com/greta-van-fleet-tickets/brooklyn-new-york-barclays-center-2027-03-08-7-pm/concert/18641973 | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-boston-vv1avzk4egkdzjayi | nickelback | verify (applied) | 18664600 | https://seatgeek.com/nickelback-tickets/boston-massachusetts-td-garden-2027-03-10-6-30-pm/concert/18664600 | - |
| tm-greta-van-fleet-2027-philadelphia-1adzz_kgkv_zy6y | greta-van-fleet | verify (applied) | 18641974 | https://seatgeek.com/greta-van-fleet-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-10-7-pm/concert/18641974 | - |
| tm-mico-2027-columbus-z7r9jz1aa7_pz | mico | add (applied) | 18702224 | https://seatgeek.com/mico-tickets/columbus-ohio-newport-music-hall-2027-03-10-7-pm/concert/18702224 | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | rod-stewart | verify (applied) | 18591364 | https://seatgeek.com/rod-stewart-tickets/hollywood-florida-hard-rock-live-hollywood-2027-03-12-8-pm/concert/18591364 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | def-leppard | verify (applied) | 18662381 | https://seatgeek.com/def-leppard-tickets/newark-new-jersey-prudential-center-2027-03-13-7-pm/concert/18662381 | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | greta-van-fleet | verify (applied) | 18641983 | https://seatgeek.com/greta-van-fleet-tickets/fort-worth-texas-dickies-arena-2027-03-15-7-pm/concert/18641983 | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | def-leppard | verify (applied) | 18662380 | https://seatgeek.com/def-leppard-tickets/boston-massachusetts-td-garden-2027-03-17-7-pm/concert/18662380 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | greta-van-fleet | verify (applied) | 18641986 | https://seatgeek.com/greta-van-fleet-tickets/anaheim-california-honda-center-2027-03-19-7-pm/concert/18641986 | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | jon-pardi | verify (applied) | 18652960 | https://seatgeek.com/jon-pardi-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-20-8-pm/concert/18652960 | - |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | def-leppard | verify (applied) | 18662383 | https://seatgeek.com/def-leppard-tickets/washington-district-of-columbia-capital-one-arena-2027-03-21-7-pm/concert/18662383 | - |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | nickelback | verify (applied) | 18664602 | https://seatgeek.com/nickelback-tickets/buffalo-new-york-keybank-center-2027-03-24-6-30-pm/concert/18664602 | - |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | greta-van-fleet | verify (applied) | 18641992 | https://seatgeek.com/greta-van-fleet-tickets/seattle-washington-climate-pledge-arena-2027-03-24-7-pm/concert/18641992 | - |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | def-leppard | verify (applied) | 18662394 | https://seatgeek.com/def-leppard-tickets/chicago-illinois-united-center-2027-03-25-7-pm/concert/18662394 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | nickelback | verify (applied) | 18664604 | https://seatgeek.com/nickelback-tickets/detroit-michigan-little-caesars-arena-2027-03-26-6-30-pm/concert/18664604 | - |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | warren-zeiders | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Live' vs 'DAER Nightclub At The Seminole Hard Rock Hotel & Casino'; no qualifying replacement found |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | greta-van-fleet | verify (applied) | 18641999 | https://seatgeek.com/greta-van-fleet-tickets/denver-colorado-ball-arena-2027-03-30-7-pm/concert/18641999 | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | nickelback | verify (applied) | 18664631 | https://seatgeek.com/nickelback-tickets/edmonton-canada-rogers-place-2027-04-03-6-30-pm/concert/18664631 | - |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | nickelback | verify (applied) | 18664633 | https://seatgeek.com/nickelback-tickets/calgary-canada-scotiabank-saddledome-2027-04-06-6-30-pm/concert/18664633 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_k | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | nickelback | verify (applied) | 18664638 | https://seatgeek.com/nickelback-tickets/vancouver-canada-rogers-arena-2027-04-09-6-30-pm/concert/18664638 | - |
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
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | fkj | verify (applied) | 18272744 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-25-7-pm/concert/18272744 | - |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | add (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | add (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | add (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | add (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-thirty-seconds-to-mars-2027-helsinki-z698xz8kz16v7so3fa | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | add (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
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
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | hazlett | verify (applied) | 18311898 | https://seatgeek.com/hazlett-tickets/san-francisco-california-august-hall-2027-06-01-8-pm/concert/18311898 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | the-airborne-toxic-event | verify (applied) | 18251596 | https://seatgeek.com/the-airborne-toxic-event-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-06-03-7-pm/concert/18251596 | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | the-airborne-toxic-event | verify (applied) | 18408894 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-diego-california-humphreys-concerts-by-the-bay-2027-06-05-7-30-pm/concert/18408894 | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | hazlett | verify (applied) | 18312174 | https://seatgeek.com/hazlett-tickets/phoenix-arizona-the-van-buren-2027-06-05-8-pm/concert/18312174 | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | the-airborne-toxic-event | verify (applied) | 18252665 | https://seatgeek.com/the-airborne-toxic-event-tickets/phoenix-arizona-the-van-buren-2027-06-06-7-30-pm/concert/18252665 | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | the-airborne-toxic-event | verify (applied) | 18252184 | https://seatgeek.com/the-airborne-toxic-event-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-06-09-7-pm/concert/18252184 | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | add (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | the-airborne-toxic-event | verify (applied) | 18252158 | https://seatgeek.com/the-airborne-toxic-event-tickets/sacramento-california-ace-of-spades-2027-06-15-7-pm/concert/18252158 | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | the-airborne-toxic-event | verify (applied) | 18251563 | https://seatgeek.com/the-airborne-toxic-event-tickets/los-angeles-california-the-wiltern-2027-06-17-7-pm/concert/18251563 | - |
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
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | bon-jovi | verify (applied) | 18696568 | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 | - |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | bon-jovi | verify (applied) | 18696570 | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 | - |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | santana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | santana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | bon-jovi | verify (applied) | 18696567 | https://seatgeek.com/bon-jovi-tickets/foxborough-massachusetts-gillette-stadium-2027-07-28-7-pm/concert/18696567 | - |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | the-red-clay-strays | verify (applied) | 18639096 | https://seatgeek.com/the-red-clay-strays-tickets/canandaigua-new-york-constellation-brands-marvin-sands-performing-arts-center-cmac-2027-07-29-7-pm/concert/18639096 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | bon-jovi | verify (applied) | 18696569 | https://seatgeek.com/bon-jovi-tickets/toronto-canada-rogers-stadium-toronto-2027-08-04-6-30-pm/concert/18696569 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | add (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ng- | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_a | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | the-red-clay-strays | verify (applied) | 18639123 | https://seatgeek.com/the-red-clay-strays-tickets/corpus-christi-texas-hilliard-center-arena-2027-09-18-7-pm/concert/18639123 | - |
| tm-sombr-2026-orlando-1aefz_fgkn1mew3 | sombr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18175580 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-teddy-swims-2026-tampa-vvg1vz_fdr-qk6 | teddy-swims | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18185159 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jonas-brothers-2026-detroit-vv17oz_8gksd_91x | jonas-brothers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18503885 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-rod-wave-2026-boston-vvg17z_uerk22e | rod-wave | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18320058 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-katseye-2026-belmont-park-17gzv0g61mqmkdg | katseye | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18259103 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sleeping-with-sirens-2026-chicago-vvg18z_gr6ix5f | sleeping-with-sirens | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18312229 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18147864 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-smashing-pumpkins-2026-austin-g5diz_1txjp-0 | the-smashing-pumpkins | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18250160 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18543019 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-chicks-2026-seattle-vvg1hz_52nooej | the-chicks | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18268866 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | verify (applied) | 18316792 | https://seatgeek.com/daughtry-tickets/greensburg-pennsylvania-palace-theatre-greensburg-pa-2026-10-26-7-pm/concert/18316792 | - |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | verify (applied) | 18004730 | https://seatgeek.com/chris-stapleton-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-26-7-30-pm/concert/18004730 | - |
| tm-mico-2026-nashville-g5viz_1mfi-bc | mico | verify (applied) | 18252761 | https://seatgeek.com/mico-tickets/nashville-tennessee-brooklyn-bowl-nashville-2026-10-26-8-pm/concert/18252761 | - |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | dinosaur-jr | verify (applied) | 18345754 | https://seatgeek.com/dinosaur-jr-tickets/salt-lake-city-utah-rockwell-at-the-complex-2026-10-26-8-pm/concert/18345754 | - |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | kacey-musgraves | verify (applied) | 18210169 | https://seatgeek.com/kacey-musgraves-tickets/seattle-washington-climate-pledge-arena-2026-10-26-7-30-pm/concert/18210169 | - |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | verify (applied) | 18475220 | https://seatgeek.com/amble-tickets/seattle-washington-the-showbox-2026-10-26-8-pm/concert/18475220 | - |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | verify (applied) | 18266701 | https://seatgeek.com/tom-jones-tickets/los-angeles-california-the-greek-theatre-los-angeles-2026-10-26-8-pm/concert/18266701 | - |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | the-chicks | verify (applied) | 18268868 | https://seatgeek.com/the-chicks-tickets/seattle-washington-benaroya-hall-2026-10-26-8-30-pm/concert/18268868 | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | olivia-rodrigo | verify (applied) | 18211738 | https://seatgeek.com/olivia-rodrigo-tickets/toronto-canada-scotiabank-arena-2026-10-27-7-pm/concert/18211738 | - |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | verify (applied) | 18252688 | https://seatgeek.com/mico-tickets/atlanta-georgia-the-masquerade-heaven-2026-10-27-7-pm/concert/18252688 | - |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | verify (applied) | 18336796 | https://seatgeek.com/sleeping-with-sirens-tickets/pittsburgh-pennsylvania-stage-ae-2026-10-27-7-pm/concert/18336796 | - |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | cece-winans | verify (applied) | 18090034 | https://seatgeek.com/cece-winans-tickets/orlando-florida-addition-financial-arena-2026-10-27-7-pm/concert/18090034 | - |
| tm-sombr-2026-charlotte-g5evz_fneqevn | sombr | verify (applied) | 18175581 | https://seatgeek.com/sombr-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-10-27-7-30-pm/concert/18175581 | - |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | verify (applied) | 18185160 | https://seatgeek.com/teddy-swims-tickets/houston-texas-toyota-center-2026-10-27-7-pm/concert/18185160 | - |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | verify (applied) | 18316793 | https://seatgeek.com/daughtry-tickets/wheeling-west-virginia-capitol-theatre-wheeling-2026-10-27-8-pm/concert/18316793 | - |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | verify (applied) | 18320059 | https://seatgeek.com/rod-wave-tickets/brooklyn-new-york-barclays-center-2026-10-27-8-30-pm/concert/18320059 | - |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | verify (applied) | 18297291 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-riviera-theatre-chicago-2026-10-27-7-30-pm/concert/18297291 | - |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | verify (applied) | 18270635 | https://seatgeek.com/knocked-loose-tickets/mesa-arizona-mesa-amphitheatre-2026-10-27-6-pm/concert/18270635 | - |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | verify (applied) | 18250161 | https://seatgeek.com/the-smashing-pumpkins-tickets/denver-colorado-ball-arena-2026-10-27-8-pm/concert/18250161 | - |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | doja-cat | verify (applied) | 17769323 | https://seatgeek.com/doja-cat-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-27-7-30-pm/concert/17769323 | - |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | verify (applied) | 18222764 | https://seatgeek.com/amble-tickets/vancouver-canada-orpheum-theatre-vancouver-2026-10-27-8-pm/concert/18222764 | - |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | verify (applied) | 18553061 | https://seatgeek.com/fuerza-regida-tickets/fresno-california-save-mart-center-2026-10-27-8-pm/concert/18553061 | - |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | tom-jones | verify (applied) | 18266703 | https://seatgeek.com/tom-jones-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2026-10-27-8-pm/concert/18266703 | - |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | verify (applied) | 18200014 | https://seatgeek.com/the-red-clay-strays-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2026-10-28-6-30-pm/concert/18200014 | - |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | cece-winans | verify (applied) | 18089897 | https://seatgeek.com/cece-winans-tickets/north-charleston-south-carolina-north-charleston-coliseum-2026-10-28-7-pm/concert/18089897 | - |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | journey | verify (applied) | 18237115 | https://seatgeek.com/journey-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-10-28-7-30-pm/concert/18237115 | - |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | harry-styles | verify (applied) | 18027142 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-28-8-pm/concert/18027142 | - |
| tm-sombr-2026-nashville-g5viz_fja3nq8 | sombr | verify (applied) | 18175584 | https://seatgeek.com/sombr-tickets/nashville-tennessee-bridgestone-arena-2026-10-28-7-pm/concert/18175584 | - |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | gorillaz | verify (applied) | 18102850 | https://seatgeek.com/gorillaz-tickets/oakland-california-oakland-arena-2026-10-28-7-pm/concert/18102850 | - |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | verify (applied) | 18470197 | https://seatgeek.com/fuerza-regida-tickets/fresno-california-save-mart-center-2026-10-28-8-30-pm/concert/18470197 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | verify (applied) | 18138592 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-28-8-30-pm/concert/18138592 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | olivia-rodrigo | verify (applied) | 18211687 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-29-7-pm/concert/18211687 | - |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | verify (applied) | 18141892 | https://seatgeek.com/blue-october-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-10-29-7-pm/concert/18141892 | - |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | verify (applied) | 18316794 | https://seatgeek.com/daughtry-tickets/nashville-indiana-brown-county-music-center-2026-10-29-7-pm/concert/18316794 | - |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | cece-winans | verify (applied) | 18090040 | https://seatgeek.com/cece-winans-tickets/tampa-florida-yuengling-center-2026-10-29-7-pm/concert/18090040 | - |
| tm-journey-2026-providence-vvg17z_1fuwpyc | journey | verify (applied) | 18237117 | https://seatgeek.com/journey-tickets/providence-rhode-island-amica-mutual-pavilion-2026-10-29-7-30-pm/concert/18237117 | - |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | ed-sheeran | verify (applied) | 17738469 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-29-8-pm/concert/17738469 | - |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | verify (applied) | 18499209 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-29-8-pm/concert/18499209 | - |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | verify (applied) | 18285545 | https://seatgeek.com/zach-top-tickets/duluth-georgia-gas-south-arena-2026-10-29-8-pm/concert/18285545 | - |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | verify (applied) | 18235908 | https://seatgeek.com/the-smashing-pumpkins-tickets/salt-lake-city-utah-delta-center-1-2026-10-29-8-pm/concert/18235908 | - |
| tm-doja-cat-2026-phoenix-1av0zbsgknh-n_z | doja-cat | verify (applied) | 17769324 | https://seatgeek.com/doja-cat-tickets/phoenix-arizona-mortgage-matchup-center-2026-10-29-7-30-pm/concert/17769324 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | olivia-rodrigo | verify (applied) | 18211689 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-30-7-pm/concert/18211689 | - |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | verify (applied) | 18257238 | https://seatgeek.com/john-summit-tickets/university-park-pennsylvania-bryce-jordan-center-2026-10-30-7-pm/concert/18257238 | - |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | verify (applied) | 18141081 | https://seatgeek.com/blue-october-tickets/detroit-michigan-the-fillmore-detroit-2026-10-30-7-pm/concert/18141081 | - |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | cece-winans | verify (applied) | 18089908 | https://seatgeek.com/cece-winans-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-10-30-7-pm/concert/18089908 | - |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | verify (applied) | 18326820 | https://seatgeek.com/dylan-gossett-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-10-30-8-pm/concert/18326820 | - |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | harry-styles | verify (applied) | 18027143 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-30-8-pm/concert/18027143 | - |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | verify (applied) | 17738471 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-30-8-pm/concert/17738471 | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | steve-lacy | verify (applied) | 18485935 | https://seatgeek.com/steve-lacy-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2026-10-30-8-pm/concert/18485935 | - |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | ella-langley | verify (applied) | 18324412 | https://seatgeek.com/ella-langley-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-30-7-pm/concert/18324412 | - |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | verify (applied) | 18473030 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-30-8-pm/concert/18473030 | - |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | verify (applied) | 18240166 | https://seatgeek.com/katseye-tickets/montreal-canada-centre-bell-2026-10-30-8-pm/concert/18240166 | - |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | mana | verify (applied) | 17938857 | https://seatgeek.com/mana-tickets/rosemont-illinois-allstate-arena-2026-10-30-8-pm/concert/17938857 | - |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | verify (applied) | 18285548 | https://seatgeek.com/zach-top-tickets/nashville-tennessee-bridgestone-arena-2026-10-30-8-30-pm/concert/18285548 | - |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | verify (applied) | 18493234 | https://seatgeek.com/missio-tickets/san-diego-california-voodoo-room-at-the-house-of-blues-san-diego-2-2026-10-30-6-30-pm/concert/18493234 | - |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | gorillaz | verify (applied) | 18102851 | https://seatgeek.com/gorillaz-tickets/portland-oregon-moda-center-2026-10-30-7-pm/concert/18102851 | - |
| tm-knocked-loose-2026-san-diego-vvg1iz_5_l1ogs | knocked-loose | verify (applied) | 18270641 | https://seatgeek.com/knocked-loose-tickets/san-diego-california-petco-park-2026-10-30-7-pm/concert/18270641 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | verify (applied) | 18138594 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-30-8-30-pm/concert/18138594 | - |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | verify (applied) | 18141400 | https://seatgeek.com/blue-october-tickets/toronto-canada-the-danforth-music-hall-2026-10-31-7-pm/concert/18141400 | - |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | verify (applied) | 18200016 | https://seatgeek.com/the-red-clay-strays-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-10-31-6-30-pm/concert/18200016 | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | verify (applied) | 18027147 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-31-8-pm/concert/18027147 | - |
| tm-sombr-2026-kansas-city-vv1kbz_fjfg7wetj | sombr | verify (applied) | 18175588 | https://seatgeek.com/sombr-tickets/kansas-city-missouri-t-mobile-center-2026-10-31-7-pm/concert/18175588 | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | steve-lacy | verify (applied) | 18613494 | https://seatgeek.com/steve-lacy-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2026-10-31-8-pm/concert/18613494 | - |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | verify (applied) | 18551080 | https://seatgeek.com/ye-tickets/houston-texas-reliant-stadium-2026-10-31-8-pm/concert/18551080 | - |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | gorillaz | verify (applied) | 18102856 | https://seatgeek.com/gorillaz-tickets/seattle-washington-climate-pledge-arena-2026-10-31-7-30-pm/concert/18102856 | - |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | verify (applied) | 18266706 | https://seatgeek.com/tom-jones-tickets/wheatland-california-hard-rock-live-sacramento-2026-10-31-8-pm/concert/18266706 | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | verify (applied) | 18138595 | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-31-8-30-pm/concert/18138595 | - |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | latto | verify (applied) | 18618942 | https://seatgeek.com/latto-tickets/las-vegas-nevada-on-the-record-2026-10-31-10-pm/concert/18618942 | - |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | verify (applied) | 18222450 | https://seatgeek.com/amble-tickets/detroit-michigan-saint-andrews-hall-2026-11-01-7-pm/concert/18222450 | - |
| tm-sombr-2026-minneapolis-vv1akzk3agkeivme6 | sombr | verify (applied) | 18175591 | https://seatgeek.com/sombr-tickets/minneapolis-minnesota-target-center-2026-11-01-7-pm/concert/18175591 | - |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | verify (applied) | 18316800 | https://seatgeek.com/daughtry-tickets/des-moines-iowa-hoyt-sherman-place-2026-11-01-7-pm/concert/18316800 | - |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | verify (applied) | 18240168 | https://seatgeek.com/katseye-tickets/hamilton-canada-td-coliseum-2026-11-01-8-pm/concert/18240168 | - |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | jonas-brothers | verify (applied) | 18503891 | https://seatgeek.com/jonas-brothers-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-01-7-30-pm/concert/18503891 | - |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | rod-wave | verify (applied) | 18414825 | https://seatgeek.com/rod-wave-tickets/chicago-illinois-united-center-2026-11-01-8-pm/concert/18414825 | - |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | mana | verify (applied) | 17416937 | https://seatgeek.com/mana-tickets/detroit-michigan-little-caesars-arena-2026-11-01-8-pm/concert/17416937 | - |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | missio | verify (applied) | 18492941 | https://seatgeek.com/missio-tickets/los-angeles-california-teragram-ballroom-2026-11-01-7-30-pm/concert/18492941 | - |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | verify (applied) | 18266707 | https://seatgeek.com/tom-jones-tickets/san-francisco-california-the-masonic-san-francisco-2026-11-01-8-pm/concert/18266707 | - |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | verify (applied) | 18223885 | https://seatgeek.com/amble-tickets/toronto-canada-history-2026-11-02-7-pm/concert/18223885 | - |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | verify (applied) | 18251753 | https://seatgeek.com/mico-tickets/boston-massachusetts-paradise-rock-club-2026-11-02-7-pm/concert/18251753 | - |
| tm-journey-2026-detroit-vvg1oz_13slngw | journey | verify (applied) | 18237116 | https://seatgeek.com/journey-tickets/detroit-michigan-little-caesars-arena-2026-11-02-7-30-pm/concert/18237116 | - |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | knocked-loose | verify (applied) | 18270644 | https://seatgeek.com/knocked-loose-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-02-6-30-pm/concert/18270644 | - |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | steve-lacy | verify (applied) | 18485939 | https://seatgeek.com/steve-lacy-tickets/nashville-tennessee-nashville-municipal-auditorium-2026-11-02-8-pm/concert/18485939 | - |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | verify (applied) | 18222746 | https://seatgeek.com/amble-tickets/ottawa-canada-bronson-centre-2026-11-03-7-pm/concert/18222746 | - |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | knocked-loose | verify (applied) | 18270647 | https://seatgeek.com/knocked-loose-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-03-5-30-pm/concert/18270647 | - |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | verify (applied) | 18175592 | https://seatgeek.com/sombr-tickets/milwaukee-wisconsin-fiserv-forum-2026-11-03-7-pm/concert/18175592 | - |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | verify (applied) | 18140945 | https://seatgeek.com/blue-october-tickets/portland-maine-state-theatre-portland-me-2026-11-03-8-pm/concert/18140945 | - |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | verify (applied) | 18320066 | https://seatgeek.com/rod-wave-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-03-8-30-pm/concert/18320066 | - |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | verify (applied) | 18503893 | https://seatgeek.com/jonas-brothers-tickets/kansas-city-missouri-t-mobile-center-2026-11-03-7-30-pm/concert/18503893 | - |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | verify (applied) | 18316801 | https://seatgeek.com/daughtry-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-03-8-pm/concert/18316801 | - |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | verify (applied) | 18250182 | https://seatgeek.com/the-smashing-pumpkins-tickets/calgary-canada-scotiabank-saddledome-2026-11-03-8-pm/concert/18250182 | - |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | verify (applied) | 18237143 | https://seatgeek.com/journey-tickets/toronto-canada-scotiabank-arena-2026-11-04-7-30-pm/concert/18237143 | - |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | dinosaur-jr | verify (applied) | 18345766 | https://seatgeek.com/dinosaur-jr-tickets/houston-texas-house-of-blues-houston-2026-11-04-7-pm/concert/18345766 | - |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | verify (applied) | 18238532 | https://seatgeek.com/tobymac-tickets/columbia-missouri-mizzou-arena-2026-11-05-7-pm/concert/18238532 | - |
| tm-mico-2026-montreal-16szkfk00zagk68g | mico | verify (applied) | 18472169 | https://seatgeek.com/mico-tickets/montreal-canada-mtelus-2026-11-05-8-pm/concert/18472169 | - |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | knocked-loose | verify (applied) | 18270649 | https://seatgeek.com/knocked-loose-tickets/austin-texas-moody-amphitheater-2026-11-05-7-pm/concert/18270649 | - |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | verify (applied) | 18503892 | https://seatgeek.com/jonas-brothers-tickets/nashville-tennessee-bridgestone-arena-2026-11-05-7-30-pm/concert/18503892 | - |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | steve-lacy | verify (applied) | 18485937 | https://seatgeek.com/steve-lacy-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-05-8-pm/concert/18485937 | - |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | verify (applied) | 18427192 | https://seatgeek.com/pentatonix-tickets/tacoma-washington-tacoma-dome-2026-11-05-7-pm/concert/18427192 | - |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | verify (applied) | 18250183 | https://seatgeek.com/the-smashing-pumpkins-tickets/vancouver-canada-rogers-arena-2026-11-05-8-pm/concert/18250183 | - |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | verify (applied) | 18175596 | https://seatgeek.com/sombr-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-11-06-7-pm/concert/18175596 | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | verify (applied) | 18373504 | https://seatgeek.com/michelle-branch-tickets/asbury-park-new-jersey-the-stone-pony-2-2026-11-06-7-pm/concert/18373504 | - |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | verify (applied) | 18222463 | https://seatgeek.com/amble-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-06-7-pm/concert/18222463 | - |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | verify (applied) | 18252202 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-06-7-pm/concert/18252202 | - |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | verify (applied) | 18252621 | https://seatgeek.com/stella-lefty-tickets/dallas-texas-cambridge-room-at-house-of-blues-dallas-1-2026-11-06-7-pm/concert/18252621 | - |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | verify (applied) | 18239020 | https://seatgeek.com/tobymac-tickets/evansville-indiana-ford-center-in-2026-11-06-7-pm/concert/18239020 | - |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | verify (applied) | 18529124 | https://seatgeek.com/dylan-scott-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2026-11-06-8-pm/concert/18529124 | - |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | verify (applied) | 17732671 | https://seatgeek.com/sabaton-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2026-11-06-7-pm/concert/17732671 | - |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | verify (applied) | 18320065 | https://seatgeek.com/rod-wave-tickets/columbia-south-carolina-colonial-life-arena-2026-11-06-8-30-pm/concert/18320065 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | verify (applied) | 18637279 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-06-8-pm/concert/18637279 | - |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | verify (applied) | 18250170 | https://seatgeek.com/the-smashing-pumpkins-tickets/seattle-washington-climate-pledge-arena-2026-11-06-8-pm/concert/18250170 | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | verify (applied) | 18223366 | https://seatgeek.com/amble-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-07-7-pm/concert/18223366 | - |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | verify (applied) | 18260543 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-07-7-pm/concert/18260543 | - |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | verify (applied) | 18252613 | https://seatgeek.com/stella-lefty-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2026-11-07-7-pm/concert/18252613 | - |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | verify (applied) | 17732669 | https://seatgeek.com/sabaton-tickets/houston-texas-713-music-hall-2026-11-07-7-pm/concert/17732669 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | verify (applied) | 18629299 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 | - |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | verify (applied) | 18485938 | https://seatgeek.com/steve-lacy-tickets/austin-texas-moody-amphitheater-2026-11-07-8-pm/concert/18485938 | - |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | karan-aujla | verify (applied) | 18592286 | https://seatgeek.com/karan-aujla-tickets/sacramento-california-golden-1-center-2026-11-07-8-pm/concert/18592286 | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | verify (applied) | 18391933 | https://seatgeek.com/trivium-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-11-08-5-30-pm/concert/18391933 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | verify (applied) | 18175600 | https://seatgeek.com/sombr-tickets/columbus-ohio-nationwide-arena-2026-11-08-7-pm/concert/18175600 | - |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | verify (applied) | 18238331 | https://seatgeek.com/tobymac-tickets/greensboro-north-carolina-first-horizon-coliseum-2026-11-08-7-pm/concert/18238331 | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | verify (applied) | 18141852 | https://seatgeek.com/blue-october-tickets/nashville-indiana-brown-county-music-center-2026-11-08-7-30-pm/concert/18141852 | - |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | verify (applied) | 18200020 | https://seatgeek.com/the-red-clay-strays-tickets/jonesboro-arkansas-first-national-bank-arena-2026-11-08-6-30-pm/concert/18200020 | - |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | verify (applied) | 17938859 | https://seatgeek.com/mana-tickets/austin-texas-moody-center-atx-2026-11-08-8-30-pm/concert/17938859 | - |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | verify (applied) | 18316806 | https://seatgeek.com/daughtry-tickets/napa-california-uptown-theatre-napa-2026-11-08-7-pm/concert/18316806 | - |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | verify (applied) | 18250171 | https://seatgeek.com/the-smashing-pumpkins-tickets/san-jose-california-sap-center-at-san-jose-2026-11-08-8-pm/concert/18250171 | - |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | verify (applied) | 18320069 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-09-8-30-pm/concert/18320069 | - |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | verify (applied) | 18503896 | https://seatgeek.com/jonas-brothers-tickets/oklahoma-city-oklahoma-paycom-center-2026-11-09-7-30-pm/concert/18503896 | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | verify (applied) | 18297308 | https://seatgeek.com/sienna-spiro-tickets/san-francisco-california-castro-theatre-2026-11-09-8-pm/concert/18297308 | - |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | karan-aujla | verify (applied) | 18592285 | https://seatgeek.com/karan-aujla-tickets/los-angeles-california-crypto-com-arena-2026-11-09-8-pm/concert/18592285 | - |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | verify (applied) | 18391934 | https://seatgeek.com/trivium-tickets/silver-spring-maryland-the-fillmore-silver-spring-2026-11-10-6-35-pm/concert/18391934 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | verify (applied) | 18085136 | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 | - |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | verify (applied) | 18373509 | https://seatgeek.com/michelle-branch-tickets/chicago-illinois-house-of-blues-chicago-2026-11-10-8-pm/concert/18373509 | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | verify (applied) | 18222479 | https://seatgeek.com/amble-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2026-11-10-8-pm/concert/18222479 | - |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | verify (applied) | 18414835 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-10-8-pm/concert/18414835 | - |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | verify (applied) | 18427194 | https://seatgeek.com/pentatonix-tickets/casper-wyoming-ford-wyoming-center-2026-11-10-7-pm/concert/18427194 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | verify (applied) | 18297309 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-the-wiltern-2026-11-10-8-pm/concert/18297309 | - |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | verify (applied) | 18316807 | https://seatgeek.com/daughtry-tickets/anaheim-california-city-national-grove-of-anaheim-2026-11-10-7-pm/concert/18316807 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | verify (applied) | 18222468 | https://seatgeek.com/amble-tickets/washington-district-of-columbia-9-30-club-2026-11-11-7-pm/concert/18222468 | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | verify (applied) | 18085138 | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 | - |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | verify (applied) | 18492221 | https://seatgeek.com/missio-tickets/denver-colorado-marquis-theater-denver-2026-11-11-7-pm/concert/18492221 | - |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | verify (applied) | 18394805 | https://seatgeek.com/the-psychedelic-furs-tickets/riverside-california-fox-performing-arts-center-2026-11-11-7-pm/concert/18394805 | - |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | verify (applied) | 18250172 | https://seatgeek.com/the-smashing-pumpkins-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-11-8-pm/concert/18250172 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | verify (applied) | 18405684 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-11-8-pm/concert/18405684 | - |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | verify (applied) | 18319858 | https://seatgeek.com/brand-new-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-11-8-pm/concert/18319858 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | verify (applied) | 18175603 | https://seatgeek.com/sombr-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-12-7-pm/concert/18175603 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | verify (applied) | 18085137 | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 | - |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | verify (applied) | 18141374 | https://seatgeek.com/blue-october-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-11-12-8-pm/concert/18141374 | - |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | verify (applied) | 18427193 | https://seatgeek.com/pentatonix-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-12-7-pm/concert/18427193 | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | verify (applied) | 18404272 | https://seatgeek.com/tyla-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-12-8-pm/concert/18404272 | - |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | verify (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | karan-aujla | verify (applied) | 18592287 | https://seatgeek.com/karan-aujla-tickets/dallas-texas-american-airlines-center-2026-11-13-8-pm/concert/18592287 | - |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | verify (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | verify (applied) | 18706524 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-15-2-pm/concert/18706524 | - |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | karan-aujla | verify (applied) | 18592290 | https://seatgeek.com/karan-aujla-tickets/atlanta-georgia-state-farm-arena-1-2026-11-16-8-pm/concert/18592290 | - |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | karan-aujla | verify (applied) | 18592288 | https://seatgeek.com/karan-aujla-tickets/new-york-new-york-madison-square-garden-2026-11-18-8-pm/concert/18592288 | - |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | karan-aujla | verify (applied) | 18592289 | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2026-11-20-8-pm/concert/18592289 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | verify (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | cece-winans | verify (applied) | 18361599 | https://seatgeek.com/cece-winans-tickets/seattle-washington-wamu-theater-2026-12-10-7-pm/concert/18361599 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | cece-winans | verify (applied) | 18361639 | https://seatgeek.com/cece-winans-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-15-7-pm/concert/18361639 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | cece-winans | verify (applied) | 18361612 | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | eagles | verify (applied) | 18701672 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-08-7-pm/concert/18701672 | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | eagles | verify (applied) | 18701674 | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-09-8-30-pm/concert/18701674 | - |
| tm-chelsea-cutler-2027-charleston-g5evz_kbudulq | chelsea-cutler | verify (applied) | 18639170 | https://seatgeek.com/chelsea-cutler-tickets/charleston-south-carolina-charleston-music-hall-2027-02-01-8-pm/concert/18639170 | - |
| tm-chelsea-cutler-2027-toronto-1avzz_kgkstt7dw | chelsea-cutler | verify (applied) | 18639184 | https://seatgeek.com/chelsea-cutler-tickets/toronto-canada-history-2027-02-16-7-pm/concert/18639184 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt | backstreet-boys | verify (applied) | 18652782 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-21-8-pm/concert/18652782 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | verify (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7-cha | backstreet-boys | verify (applied) | 18657825 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-26-8-pm/concert/18657825 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-needtobreathe-2027-cincinnati-1kaovpgtgauok5q | needtobreathe | verify (applied) | 18621538 | https://seatgeek.com/needtobreathe-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-02-27-7-pm/concert/18621538 | - |
| tm-daughtry-2027-bethlehem-vv1aovpg_ga5ljzy | daughtry | verify (applied) | 18632933 | https://seatgeek.com/daughtry-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-02-27-8-pm/concert/18632933 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7xqhp | backstreet-boys | verify (applied) | 18657827 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-27-8-pm/concert/18657827 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |

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
| tm-ed-sheeran-2026-arlington-z7r9jz1a7jw | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-doja-cat-2026-inglewood-vv170zbsgkihfzey | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-atlanta-vvg1zz_fxet19l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-sunrise-z7r9jz1a7x8vw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-new-york-k7vgf_uedf3n_ | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-montreal-17g8v0g6gp5n0pn | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-oakland-g5vyz_gfww-6g | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-san-diego-vvg1iz_gcici-d | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-oakland-z7r9jz1a70kkf | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-kansas-city-vvg1bz_5nc5gbq | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-houston-z7r9jz1a7x73v | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-knoxville-z7r9jz1a7-yuw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-cary-z7r9jz1a7-y8f | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
