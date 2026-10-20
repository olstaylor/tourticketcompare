# SeatGeek CTA verification log

Generated: 2026-10-20T21:59:27.211Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1080 (needs_recheck: 757, provenance backfill: 131, stale re-check: 627)
- Events skipped before API checks: 225
- API calls made: 800
- Verified provenance written: 624
- URLs added: 3
- URLs corrected: 0
- URLs cleared: 1
- Provenance un-verified: 6
- Conflicts (ambiguous, untouched): 3
- No qualifying listing: 156
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | riley-green | verify (applied) | 18626523 | https://seatgeek.com/riley-green-tickets/wichita-kansas-intrust-bank-arena-2027-05-07-7-pm/concert/18626523 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | fantasia | verify (applied) | 18629230 | https://seatgeek.com/fantasia-tickets/raleigh-north-carolina-lenovo-center-2027-05-08-8-pm/concert/18629230 | - |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | riley-green | verify (applied) | 18626524 | https://seatgeek.com/riley-green-tickets/rogers-arkansas-walmart-amp-2027-05-08-7-pm/concert/18626524 | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | ha-ash | verify (applied) | 18608845 | https://seatgeek.com/ha-ash-tickets/phoenix-arizona-arizona-financial-theatre-2027-05-08-8-pm/concert/18608845 | - |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | fontaines-d-c | verify (applied) | 18642831 | https://seatgeek.com/fontaines-d-c-tickets/seattle-washington-wamu-theater-2027-05-08-8-pm/concert/18642831 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | carly-rae-jepsen | verify (applied) | 18639027 | https://seatgeek.com/carly-rae-jepsen-tickets/nashville-tennessee-the-truth-nashville-2027-05-10-7-30-pm/concert/18639027 | - |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | saint-levant | verify (applied) | 18550856 | https://seatgeek.com/saint-levant-tickets/seattle-washington-paramount-theatre-wa-2027-05-10-8-pm/concert/18550856 | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | fontaines-d-c | verify (applied) | 18642832 | https://seatgeek.com/fontaines-d-c-tickets/sacramento-channel-24-sacramento-2027-05-11-8-pm/concert/18642832 | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | fontaines-d-c | verify (applied) | 18642833 | https://seatgeek.com/fontaines-d-c-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-05-12-8-pm/concert/18642833 | - |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | saint-levant | verify (applied) | 18551642 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-13-6-pm/concert/18551642 | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | def-leppard | verify (applied) | 18662462 | https://seatgeek.com/def-leppard-tickets/vancouver-canada-rogers-arena-2027-05-14-7-pm/concert/18662462 | - |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | too-many-zooz | verify (applied) | 18612957 | https://seatgeek.com/too-many-zooz-tickets/seattle-washington-neptune-theatre-wa-2027-05-14-8-pm/concert/18612957 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | luke-combs | verify (applied) | 18493403 | https://seatgeek.com/luke-combs-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-15-5-45-pm/concert/18493403 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-houston-g5diz_kkygldl | ha-ash | verify (applied) | 18608855 | https://seatgeek.com/ha-ash-tickets/houston-texas-713-music-hall-2027-05-16-8-pm/concert/18608855 | - |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | def-leppard | verify (applied) | 18662464 | https://seatgeek.com/def-leppard-tickets/edmonton-canada-rogers-place-2027-05-16-7-pm/concert/18662464 | - |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | ha-ash | verify (applied) | 18608856 | https://seatgeek.com/ha-ash-tickets/new-york-new-york-united-palace-theatre-2027-05-19-8-pm/concert/18608856 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | santana | verify (applied) | 18628843 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-19-7-pm/concert/18628843 | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | riley-green | verify (applied) | 18626525 | https://seatgeek.com/riley-green-tickets/tulsa-oklahoma-bok-center-2027-05-20-7-pm/concert/18626525 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | santana | verify (applied) | 18628844 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-20-7-pm/concert/18628844 | - |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | ha-ash | verify (applied) | 18608857 | https://seatgeek.com/ha-ash-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-21-8-pm/concert/18608857 | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | fantasia | verify (applied) | 18629235 | https://seatgeek.com/fantasia-tickets/providence-rhode-island-amica-mutual-pavilion-2027-05-21-8-pm/concert/18629235 | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | riley-green | verify (applied) | 18626526 | https://seatgeek.com/riley-green-tickets/dallas-texas-dos-equis-pavilion-2027-05-21-7-pm/concert/18626526 | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | ha-ash | verify (applied) | 18608864 | https://seatgeek.com/ha-ash-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-05-22-8-pm/concert/18608864 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | santana | verify (applied) | 18628845 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-22-7-pm/concert/18628845 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | santana | verify (applied) | 18628846 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-23-7-pm/concert/18628846 | - |
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
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | niall-horan | verify (applied) | 18235566 | https://seatgeek.com/niall-horan-tickets/vancouver-canada-rogers-arena-2027-05-29-7-30-pm/concert/18235566 | - |
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
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | def-leppard | verify (applied) | 18662434 | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 | - |
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
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | yacht-rock-revue | verify (applied) | 18587856 | https://seatgeek.com/yacht-rock-revue-tickets/chicago-illinois-the-salt-shed-outdoors-2027-06-25-6-30-pm/concert/18587856 | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
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
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | riley-green | verify (applied) | 18626549 | https://seatgeek.com/riley-green-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2027-07-30-7-pm/concert/18626549 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | leon-bridges | verify (applied) | 18662723 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-18-7-30-pm/concert/18662723 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | leon-bridges | verify (applied) | 18662724 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-19-7-30-pm/concert/18662724 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | eros-ramazzotti | verify (applied) | 17481793 | https://seatgeek.com/eros-ramazzotti-tickets/toronto-canada-coca-cola-coliseum-2027-09-24-8-pm/concert/17481793 | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | fontaines-d-c | verify (applied) | 18642838 | https://seatgeek.com/fontaines-d-c-tickets/toronto-canada-scotiabank-arena-2027-09-26-8-pm/concert/18642838 | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | too-many-zooz | verify (applied) | 18613113 | https://seatgeek.com/too-many-zooz-tickets/houston-texas-white-oak-music-hall-downstairs-2027-04-30-7-pm/concert/18613113 | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | a-perfect-circle | verify (applied) | 18632522 | https://seatgeek.com/a-perfect-circle-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-04-30-8-pm/concert/18632522 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | verify (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | the-interrupters | verify (applied) | 18612589 | https://seatgeek.com/the-interrupters-tickets/los-angeles-california-the-wiltern-2027-04-30-5-30-pm/concert/18612589 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | fontaines-d-c | verify (applied) | 18642823 | https://seatgeek.com/fontaines-d-c-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-04-30-8-pm/concert/18642823 | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | josiah-queen | verify (applied) | 18574523 | https://seatgeek.com/josiah-queen-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-04-30-7-pm/concert/18574523 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | john-mayer | verify (applied) | 18659117 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-30-8-pm/concert/18659117 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | leon-bridges | verify (applied) | 18662692 | https://seatgeek.com/leon-bridges-tickets/new-york-new-york-madison-square-garden-2027-05-01-7-pm/concert/18662692 | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | nickelback | verify (applied) | 18664624 | https://seatgeek.com/nickelback-tickets/san-antonio-texas-frost-bank-center-2027-05-01-6-30-pm/concert/18664624 | - |
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | lizzy-mcalpine | verify (applied) | 18619416 | https://seatgeek.com/lizzy-mcalpine-tickets/houston-texas-713-music-hall-2027-05-01-7-pm/concert/18619416 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | fontaines-d-c | verify (applied) | 18642822 | https://seatgeek.com/fontaines-d-c-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-01-8-pm/concert/18642822 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | john-mayer | verify (applied) | 18659119 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-01-8-pm/concert/18659119 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | lizzy-mcalpine | verify (applied) | 18619418 | https://seatgeek.com/lizzy-mcalpine-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-05-04-7-pm/concert/18619418 | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | a-perfect-circle | verify (applied) | 18632524 | https://seatgeek.com/a-perfect-circle-tickets/charlotte-north-carolina-truliant-amphitheater-2027-05-04-7-30-pm/concert/18632524 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | dylan-gossett | verify (applied) | 18642104 | https://seatgeek.com/dylan-gossett-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-05-04-7-pm/concert/18642104 | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | a-perfect-circle | verify (applied) | 18632526 | https://seatgeek.com/a-perfect-circle-tickets/duluth-georgia-gas-south-arena-2027-05-05-8-pm/concert/18632526 | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | fontaines-d-c | verify (applied) | 18642830 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-05-8-pm/concert/18642830 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | john-mayer | verify (applied) | 18659122 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-05-8-pm/concert/18659122 | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | the-warning | verify (applied) | 18590369 | https://seatgeek.com/the-warning-tickets/detroit-michigan-the-fillmore-detroit-2027-05-06-7-pm/concert/18590369 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | riley-green | verify (applied) | 18626522 | https://seatgeek.com/riley-green-tickets/fort-worth-texas-dickies-arena-2027-05-06-7-pm/concert/18626522 | - |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | dylan-gossett | verify (applied) | 18642105 | https://seatgeek.com/dylan-gossett-tickets/madison-wisconsin-the-sylvee-2027-05-06-7-pm/concert/18642105 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | ha-ash | verify (applied) | 18608844 | https://seatgeek.com/ha-ash-tickets/san-jose-california-san-jose-civic-2027-05-06-8-pm/concert/18608844 | - |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | lizzy-mcalpine | verify (applied) | 18619420 | https://seatgeek.com/lizzy-mcalpine-tickets/detroit-michigan-fox-theatre-detroit-2027-05-07-7-pm/concert/18619420 | - |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | fantasia | verify (applied) | 18629225 | https://seatgeek.com/fantasia-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-05-07-8-pm/concert/18629225 | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | carly-rae-jepsen | verify (applied) | 18639026 | https://seatgeek.com/carly-rae-jepsen-tickets/austin-texas-moody-amphitheater-2027-05-07-7-pm/concert/18639026 | - |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | dylan-gossett | verify (applied) | 18642106 | https://seatgeek.com/dylan-gossett-tickets/kansas-city-missouri-uptown-theater-kc-2027-05-07-7-pm/concert/18642106 | - |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | luke-combs | verify (applied) | 18493401 | https://seatgeek.com/luke-combs-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-08-5-45-pm/concert/18493401 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | mei-semones | verify (applied) | 18638032 | https://seatgeek.com/mei-semones-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-05-08-7-pm/concert/18638032 | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | josiah-queen | verify (applied) | 18574530 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-08-7-pm/concert/18574530 | - |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | carly-rae-jepsen | verify (applied) | 18639028 | https://seatgeek.com/carly-rae-jepsen-tickets/houston-texas-713-music-hall-2027-05-08-7-30-pm/concert/18639028 | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | metallica | verify (applied) | 18595110 | https://seatgeek.com/metallica-tickets/vancouver-canada-bc-place-stadium-2027-05-08-6-pm/concert/18595110 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | dylan-gossett | verify (applied) | 18642110 | https://seatgeek.com/dylan-gossett-tickets/la-vista-nebraska-the-astro-theater-la-vista-2027-05-08-7-pm/concert/18642110 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | lizzy-mcalpine | verify (applied) | 18619426 | https://seatgeek.com/lizzy-mcalpine-tickets/indianapolis-indiana-clowes-memorial-hall-2027-05-09-7-pm/concert/18619426 | - |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | hazlett | verify (applied) | 18649795 | https://seatgeek.com/hazlett-tickets/toronto-canada-the-danforth-music-hall-2027-05-09-7-pm/concert/18649795 | - |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | the-warning | verify (applied) | 18590511 | https://seatgeek.com/the-warning-tickets/montreal-canada-mtelus-2027-05-09-8-pm/concert/18590511 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | carly-rae-jepsen | verify (applied) | 18639033 | https://seatgeek.com/carly-rae-jepsen-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-11-8-pm/concert/18639033 | - |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | carly-rae-jepsen | verify (applied) | 18639034 | https://seatgeek.com/carly-rae-jepsen-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-05-12-7-30-pm/concert/18639034 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | lizzy-mcalpine | verify (applied) | 18619429 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-12-7-pm/concert/18619429 | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | saint-levant | verify (applied) | 18551643 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-12-6-pm/concert/18551643 | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | ha-ash | verify (applied) | 18608852 | https://seatgeek.com/ha-ash-tickets/el-paso-texas-el-paso-county-coliseum-2027-05-12-7-pm/concert/18608852 | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | santana | verify (applied) | 18628833 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-12-7-pm/concert/18628833 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | lizzy-mcalpine | verify (applied) | 18637702 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-13-7-pm/concert/18637702 | - |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | metallica | verify (applied) | 18595090 | https://seatgeek.com/metallica-tickets/san-diego-california-snapdragon-stadium-2027-05-13-6-pm/concert/18595090 | - |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | dylan-gossett | verify (applied) | 18642112 | https://seatgeek.com/dylan-gossett-tickets/austin-texas-moody-amphitheater-2027-05-13-7-pm/concert/18642112 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | santana | verify (applied) | 18628834 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-13-7-pm/concert/18628834 | - |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | carly-rae-jepsen | verify (applied) | 18639035 | https://seatgeek.com/carly-rae-jepsen-tickets/washington-district-of-columbia-the-anthem-dc-2027-05-14-7-30-pm/concert/18639035 | - |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | niall-horan | verify (applied) | 18235548 | https://seatgeek.com/niall-horan-tickets/austin-texas-moody-center-atx-2027-05-14-7-30-pm/concert/18235548 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | ha-ash | verify (applied) | 18608853 | https://seatgeek.com/ha-ash-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-14-8-pm/concert/18608853 | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | fantasia | verify (applied) | 18629275 | https://seatgeek.com/fantasia-tickets/chicago-illinois-united-center-2027-05-14-8-pm/concert/18629275 | - |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | dylan-gossett | verify (applied) | 18642115 | https://seatgeek.com/dylan-gossett-tickets/houston-texas-bayou-music-center-2027-05-14-7-pm/concert/18642115 | - |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | the-warning | verify (applied) | 18591883 | https://seatgeek.com/the-warning-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-05-15-8-pm/concert/18591883 | - |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | fantasia | verify (applied) | 18631687 | https://seatgeek.com/fantasia-tickets/detroit-michigan-little-caesars-arena-2027-05-15-8-pm/concert/18631687 | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | carly-rae-jepsen | verify (applied) | 18639037 | https://seatgeek.com/carly-rae-jepsen-tickets/new-york-new-york-madison-square-garden-2027-05-15-7-30-pm/concert/18639037 | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | ha-ash | verify (applied) | 18608854 | https://seatgeek.com/ha-ash-tickets/hidalgo-texas-payne-arena-2027-05-15-8-pm/concert/18608854 | - |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | a-perfect-circle | verify (applied) | 18632533 | https://seatgeek.com/a-perfect-circle-tickets/nashville-tennessee-bridgestone-arena-2027-05-15-8-pm/concert/18632533 | - |
| tm-blondshell-2027-madison-vv1kvyvpc_ga55f1w | blondshell | verify (applied) | 18633499 | https://seatgeek.com/blondshell-tickets/madison-wisconsin-majestic-theatre-wi-2027-05-15-8-pm/concert/18633499 | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | too-many-zooz | verify (applied) | 18646948 | https://seatgeek.com/too-many-zooz-tickets/vancouver-canada-the-pearl-bc-2027-05-15-7-pm/concert/18646948 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-blondshell-2027-detroit-vv1afzkfmgkdgjzny | blondshell | verify (applied) | 18633500 | https://seatgeek.com/blondshell-tickets/detroit-michigan-saint-andrews-hall-2027-05-17-6-pm/concert/18633500 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | carly-rae-jepsen | verify (applied) | 18639041 | https://seatgeek.com/carly-rae-jepsen-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-05-18-7-30-pm/concert/18639041 | - |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | a-perfect-circle | verify (applied) | 18632537 | https://seatgeek.com/a-perfect-circle-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-20-7-30-pm/concert/18632537 | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | carly-rae-jepsen | verify (applied) | 18639045 | https://seatgeek.com/carly-rae-jepsen-tickets/chicago-illinois-the-chicago-theatre-2027-05-21-7-30-pm/concert/18639045 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | a-perfect-circle | verify (applied) | 18632538 | https://seatgeek.com/a-perfect-circle-tickets/chicago-illinois-wintrust-arena-2027-05-22-8-pm/concert/18632538 | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | metallica | verify (applied) | 18595089 | https://seatgeek.com/metallica-tickets/fayetteville-arkansas-razorback-stadium-2027-05-26-6-pm/concert/18595089 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-flans-2027-houston-g5diz_k6-kevr | flans | verify (applied) | 18612653 | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | flans | verify (applied) | 18613121 | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | a-perfect-circle | verify (applied) | 18632551 | https://seatgeek.com/a-perfect-circle-tickets/daly-city-california-cow-palace-daly-city-2027-06-04-7-pm/concert/18632551 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | a-perfect-circle | verify (applied) | 18632556 | https://seatgeek.com/a-perfect-circle-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-06-08-8-pm/concert/18632556 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | def-leppard | verify (applied) | 18662435 | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | def-leppard | verify (applied) | 18662437 | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | a-perfect-circle | verify (applied) | 18632561 | https://seatgeek.com/a-perfect-circle-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-06-13-7-30-pm/concert/18632561 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | lizzy-mcalpine | verify (applied) | 18619440 | https://seatgeek.com/lizzy-mcalpine-tickets/nashville-tennessee-bridgestone-arena-2027-06-16-7-pm/concert/18619440 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | def-leppard | verify (applied) | 18662442 | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | lizzy-mcalpine | verify (applied) | 18619442 | https://seatgeek.com/lizzy-mcalpine-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-18-7-pm/concert/18619442 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | def-leppard | verify (applied) | 18662443 | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | lizzy-mcalpine | verify (applied) | 18619443 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-20-7-pm/concert/18619443 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | lizzy-mcalpine | verify (applied) | 18637280 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-21-7-pm/concert/18637280 | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | def-leppard | verify (applied) | 18662446 | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | lizzy-mcalpine | verify (applied) | 18619444 | https://seatgeek.com/lizzy-mcalpine-tickets/new-york-new-york-madison-square-garden-2027-06-24-7-pm/concert/18619444 | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | lizzy-mcalpine | verify (applied) | 18619445 | https://seatgeek.com/lizzy-mcalpine-tickets/columbia-maryland-merriweather-post-pavilion-2027-06-25-7-pm/concert/18619445 | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | def-leppard | verify (applied) | 18662447 | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | lizzy-mcalpine | verify (applied) | 18619449 | https://seatgeek.com/lizzy-mcalpine-tickets/toronto-canada-scotiabank-arena-2027-06-27-7-pm/concert/18619449 | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | def-leppard | verify (applied) | 18662449 | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 | - |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | lizzy-mcalpine | verify (applied) | 18619452 | https://seatgeek.com/lizzy-mcalpine-tickets/chicago-illinois-united-center-2027-06-29-7-pm/concert/18619452 | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | def-leppard | verify (applied) | 18662452 | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | def-leppard | verify (applied) | 18662454 | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | lizzy-mcalpine | verify (applied) | 18619454 | https://seatgeek.com/lizzy-mcalpine-tickets/austin-texas-moody-center-atx-2027-07-02-7-pm/concert/18619454 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | greta-van-fleet | verify (applied) | 18642002 | https://seatgeek.com/greta-van-fleet-tickets/edmonton-canada-rogers-place-2027-07-07-7-pm/concert/18642002 | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | greta-van-fleet | verify (applied) | 18642003 | https://seatgeek.com/greta-van-fleet-tickets/calgary-canada-scotiabank-saddledome-2027-07-08-7-pm/concert/18642003 | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | lizzy-mcalpine | verify (applied) | 18619456 | https://seatgeek.com/lizzy-mcalpine-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2027-07-09-6-30-pm/concert/18619456 | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | greta-van-fleet | verify (applied) | 18642007 | https://seatgeek.com/greta-van-fleet-tickets/winnipeg-canada-canada-life-centre-2027-07-10-7-pm/concert/18642007 | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | lizzy-mcalpine | verify (applied) | 18619461 | https://seatgeek.com/lizzy-mcalpine-tickets/los-angeles-california-forum-23-2027-07-10-7-pm/concert/18619461 | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | lizzy-mcalpine | verify (applied) | 18619460 | https://seatgeek.com/lizzy-mcalpine-tickets/san-francisco-california-chase-center-2027-07-13-7-pm/concert/18619460 | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | lizzy-mcalpine | verify (applied) | 18619462 | https://seatgeek.com/lizzy-mcalpine-tickets/portland-oregon-moda-center-2027-07-15-7-pm/concert/18619462 | - |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | greta-van-fleet | verify (applied) | 18642013 | https://seatgeek.com/greta-van-fleet-tickets/columbus-ohio-nationwide-arena-2027-07-16-7-pm/concert/18642013 | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | greta-van-fleet | verify (applied) | 18642015 | https://seatgeek.com/greta-van-fleet-tickets/noblesville-indiana-ruoff-music-center-2027-07-17-7-pm/concert/18642015 | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | lizzy-mcalpine | verify (applied) | 18619466 | https://seatgeek.com/lizzy-mcalpine-tickets/seattle-washington-climate-pledge-arena-2027-07-17-7-pm/concert/18619466 | - |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | the-red-clay-strays | verify (applied) | 18639097 | https://seatgeek.com/the-red-clay-strays-tickets/clarkston-michigan-pine-knob-music-theatre-2027-07-31-7-pm/concert/18639097 | - |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | riley-green | verify (applied) | 18626554 | https://seatgeek.com/riley-green-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-31-7-pm/concert/18626554 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | the-red-clay-strays | verify (applied) | 18639104 | https://seatgeek.com/the-red-clay-strays-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-08-12-7-pm/concert/18639104 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | the-red-clay-strays | verify (applied) | 18639110 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-21-6-30-pm/concert/18639110 | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | the-red-clay-strays | verify (applied) | 18639113 | https://seatgeek.com/the-red-clay-strays-tickets/boise-idaho-extramile-arena-2027-08-22-7-pm/concert/18639113 | - |
| tm-kenny-chesney-2027-foxborough-vv1avzkfxgkdu8gfo | kenny-chesney | verify (applied) | 18592017 | https://seatgeek.com/kenny-chesney-tickets/foxborough-massachusetts-gillette-stadium-2027-08-28-4-30-pm/concert/18592017 | - |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | the-red-clay-strays | verify (applied) | 18639117 | https://seatgeek.com/the-red-clay-strays-tickets/rogers-arkansas-walmart-amp-2027-09-09-7-pm/concert/18639117 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | the-red-clay-strays | verify (applied) | 18639125 | https://seatgeek.com/the-red-clay-strays-tickets/austin-texas-moody-center-atx-2027-09-19-7-pm/concert/18639125 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | fontaines-d-c | verify (applied) | 18642843 | https://seatgeek.com/fontaines-d-c-tickets/columbia-maryland-merriweather-post-pavilion-2027-09-30-7-30-pm/concert/18642843 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-hilary-duff-2027-orlando-1axzkfugkdwff3y | hilary-duff | verify (applied) | 18613393 | https://seatgeek.com/hilary-duff-tickets/orlando-florida-kia-center-2027-10-02-7-30-pm/concert/18613393 | - |
| tm-hilary-duff-2027-raleigh-g5evz_kpqg6lj | hilary-duff | verify (applied) | 18613392 | https://seatgeek.com/hilary-duff-tickets/raleigh-north-carolina-lenovo-center-2027-10-04-7-30-pm/concert/18613392 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-hilary-duff-2027-baltimore-1a4zkfwgket7cfe | hilary-duff | verify (applied) | 18613391 | https://seatgeek.com/hilary-duff-tickets/baltimore-maryland-cfg-bank-arena-2027-10-06-7-30-pm/concert/18613391 | - |
| tm-hilary-duff-2027-uncasville-g5vvz_k5dwnjz | hilary-duff | verify (applied) | 18613390 | https://seatgeek.com/hilary-duff-tickets/uncasville-connecticut-mohegan-sun-arena-2027-10-08-7-30-pm/concert/18613390 | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | fontaines-d-c | verify (applied) | 18642849 | https://seatgeek.com/fontaines-d-c-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2027-10-08-8-pm/concert/18642849 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-columbus-vv1kv8vpu8ga1ilbe | hilary-duff | verify (applied) | 18613402 | https://seatgeek.com/hilary-duff-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-10-15-7-30-pm/concert/18613402 | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | fontaines-d-c | verify (applied) | 18642853 | https://seatgeek.com/fontaines-d-c-tickets/inglewood-california-kia-forum-2027-10-15-7-pm/concert/18642853 | - |
| tm-hilary-duff-2027-pittsburgh-1apzkfsgkdqpqgi | hilary-duff | verify (applied) | 18613403 | https://seatgeek.com/hilary-duff-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-10-16-7-30-pm/concert/18613403 | - |
| tm-hilary-duff-2027-fort-worth-vvg1yz_3lpl3yg | hilary-duff | verify (applied) | 18613405 | https://seatgeek.com/hilary-duff-tickets/fort-worth-texas-dickies-arena-2027-11-06-7-30-pm/concert/18613405 | - |
| tm-hilary-duff-2027-tulsa-1aozkfggkd6ydle | hilary-duff | verify (applied) | 18613406 | https://seatgeek.com/hilary-duff-tickets/tulsa-oklahoma-bok-center-2027-11-08-7-30-pm/concert/18613406 | - |
| tm-hilary-duff-2027-milwaukee-vv1a6zkfggkdrdjze | hilary-duff | verify (applied) | 18613414 | https://seatgeek.com/hilary-duff-tickets/milwaukee-wisconsin-fiserv-forum-2027-11-12-7-30-pm/concert/18613414 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-hilary-duff-2027-kansas-city-vv1kvovpuoga1lapx | hilary-duff | verify (applied) | 18613418 | https://seatgeek.com/hilary-duff-tickets/kansas-city-missouri-t-mobile-center-2027-11-15-7-30-pm/concert/18613418 | - |
| tm-hilary-duff-2027-denver-g5vzz_kkrpbyy | hilary-duff | verify (applied) | 18613419 | https://seatgeek.com/hilary-duff-tickets/denver-colorado-ball-arena-2027-11-17-7-30-pm/concert/18613419 | - |
| tm-hilary-duff-2027-anaheim-vv110z_kqbpjub | hilary-duff | verify (applied) | 18613420 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-20-7-30-pm/concert/18613420 | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | hilary-duff | verify (applied) | 18633659 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-21-7-30-pm/concert/18633659 | - |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18477758 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18341697 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18270629 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18212696 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18292564 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18540429 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | verify (applied) | 18029029 | https://seatgeek.com/gorillaz-tickets/salt-lake-city-utah-delta-center-1-2026-10-20-7-30-pm/concert/18029029 | - |
| tm-mico-2026-tucson-z7r9jz1a70ioy | mico | verify (applied) | 18259203 | https://seatgeek.com/mico-tickets/tucson-arizona-la-rosa-tucson-2026-10-20-8-pm/concert/18259203 | - |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | verify (applied) | 18427898 | https://seatgeek.com/brand-new-tickets/newport-kentucky-megacorp-pavilion-2026-10-21-8-pm/concert/18427898 | - |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | verify (applied) | 18299151 | https://seatgeek.com/sylvan-esso-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2026-10-21-8-pm/concert/18299151 | - |
| tm-journey-2026-louisville-z7r9jz1a70f_w | journey | verify (applied) | 18237196 | https://seatgeek.com/journey-tickets/louisville-kentucky-kfc-yum-center-2026-10-22-7-30-pm/concert/18237196 | - |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | verify (applied) | 18319842 | https://seatgeek.com/brand-new-tickets/atlanta-georgia-fox-theatre-atlanta-2026-10-22-8-pm/concert/18319842 | - |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | verify (applied) | 18147861 | https://seatgeek.com/blue-october-tickets/abilene-texas-paramount-theatre-abilene-2026-10-22-7-pm/concert/18147861 | - |
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | verify (applied) | 18345753 | https://seatgeek.com/dinosaur-jr-tickets/portland-oregon-revolution-hall-portland-2026-10-22-8-pm/concert/18345753 | - |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | verify (applied) | 18631381 | https://seatgeek.com/amble-tickets/phoenix-arizona-crescent-ballroom-2026-10-22-8-pm/concert/18631381 | - |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | verify (applied) | 18175691 | https://seatgeek.com/teddy-swims-tickets/sunrise-florida-amerant-bank-arena-2026-10-23-7-pm/concert/18175691 | - |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | verify (applied) | 18257187 | https://seatgeek.com/don-omar-tickets/houston-texas-toyota-center-2026-10-23-8-pm/concert/18257187 | - |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | verify (applied) | 18147862 | https://seatgeek.com/blue-october-tickets/lubbock-texas-the-buddy-holly-hall-helen-devitt-jones-theater-2026-10-23-7-pm/concert/18147862 | - |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | verify (applied) | 18299152 | https://seatgeek.com/sylvan-esso-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-10-23-8-30-pm/concert/18299152 | - |
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | verify (applied) | 18147548 | https://seatgeek.com/weezer-tickets/las-vegas-nevada-t-mobile-arena-2026-10-23-7-pm/concert/18147548 | - |
| tm-kacey-musgraves-2026-oakland-z7r9jz1a70kkf | kacey-musgraves | verify (applied) | 18212698 | https://seatgeek.com/kacey-musgraves-tickets/oakland-california-oakland-arena-2026-10-23-7-30-pm/concert/18212698 | - |
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | verify (applied) | 18292529 | https://seatgeek.com/charli-xcx-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-10-23-8-pm/concert/18292529 | - |
| tm-ed-sheeran-2026-arlington-z7r9jz1a7jw | ed-sheeran | verify (applied) | 17729039 | https://seatgeek.com/ed-sheeran-tickets/arlington-texas-at-t-stadium-2026-10-24-5-30-pm/concert/17729039 | - |
| tm-sombr-2026-sunrise-z7r9jz1a7x8vw | sombr | verify (applied) | 18164919 | https://seatgeek.com/sombr-tickets/sunrise-florida-amerant-bank-arena-2026-10-24-7-pm/concert/18164919 | - |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | verify (applied) | 18147863 | https://seatgeek.com/blue-october-tickets/tulsa-oklahoma-tulsa-theater-2026-10-24-7-pm/concert/18147863 | - |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | verify (applied) | 18526286 | https://seatgeek.com/dylan-scott-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-10-24-8-pm/concert/18526286 | - |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | verify (applied) | 18470196 | https://seatgeek.com/fuerza-regida-tickets/bakersfield-california-dignity-health-arena-2026-10-24-8-30-pm/concert/18470196 | - |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | verify (applied) | 18147864 | https://seatgeek.com/blue-october-tickets/wichita-kansas-orpheum-theatre-wichita-2026-10-25-7-pm/concert/18147864 | - |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | verify (applied) | 18543019 | https://seatgeek.com/fuerza-regida-tickets/bakersfield-california-dignity-health-arena-2026-10-25-8-pm/concert/18543019 | - |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | verify (applied) | 18316792 | https://seatgeek.com/daughtry-tickets/greensburg-pennsylvania-palace-theatre-greensburg-pa-2026-10-26-7-pm/concert/18316792 | - |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | dinosaur-jr | verify (applied) | 18345754 | https://seatgeek.com/dinosaur-jr-tickets/salt-lake-city-utah-rockwell-at-the-complex-2026-10-26-8-pm/concert/18345754 | - |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | verify (applied) | 18475220 | https://seatgeek.com/amble-tickets/seattle-washington-the-showbox-2026-10-26-8-pm/concert/18475220 | - |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | verify (applied) | 18185160 | https://seatgeek.com/teddy-swims-tickets/houston-texas-toyota-center-2026-10-27-7-pm/concert/18185160 | - |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | verify (applied) | 18316793 | https://seatgeek.com/daughtry-tickets/wheeling-west-virginia-capitol-theatre-wheeling-2026-10-27-8-pm/concert/18316793 | - |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | verify (applied) | 18297291 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-riviera-theatre-chicago-2026-10-27-7-30-pm/concert/18297291 | - |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | verify (applied) | 18270635 | https://seatgeek.com/knocked-loose-tickets/mesa-arizona-mesa-amphitheatre-2026-10-27-6-pm/concert/18270635 | - |
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | verify (applied) | 18633256 | https://seatgeek.com/leon-bridges-tickets/miami-florida-zeyzey-miami-2026-10-28-7-pm/concert/18633256 | - |
| tm-sienna-spiro-2026-minneapolis-z7r9jz1a7pko4 | sienna-spiro | verify (applied) | 18297292 | https://seatgeek.com/sienna-spiro-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-10-28-7-30-pm/concert/18297292 | - |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | verify (applied) | 18147865 | https://seatgeek.com/blue-october-tickets/milwaukee-wisconsin-pabst-theater-2026-10-28-7-pm/concert/18147865 | - |
| tm-ella-langley-2026-des-moines-z7r9jz1a7pwkk | ella-langley | verify (applied) | 18324411 | https://seatgeek.com/ella-langley-tickets/des-moines-iowa-casey-s-center-2026-10-29-7-pm/concert/18324411 | - |
| tm-dinosaur-jr-2026-denver-z7r9jz1a7pu0p | dinosaur-jr | verify (applied) | 18345755 | https://seatgeek.com/dinosaur-jr-tickets/denver-colorado-ogden-theatre-2026-10-29-8-pm/concert/18345755 | - |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | verify (applied) | 18350904 | https://seatgeek.com/the-psychedelic-furs-tickets/rocklin-california-platinum-living-amphitheater-at-quarry-park-2026-10-29-7-pm/concert/18350904 | - |
| tm-knocked-loose-2026-los-angeles-z7r9jz1a70yjs | knocked-loose | verify (applied) | 18270638 | https://seatgeek.com/knocked-loose-tickets/los-angeles-california-shrine-la-outdoors-2026-10-29-7-pm/concert/18270638 | - |
| tm-mico-2026-new-york-z7r9jz1a70u7_ | mico | verify (applied) | 18259847 | https://seatgeek.com/mico-tickets/new-york-new-york-webster-hall-2026-10-30-7-30-pm/concert/18259847 | - |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | brand-new | verify (applied) | 18319849 | https://seatgeek.com/brand-new-tickets/grand-prairie-texas-texas-trust-cu-theatre-2026-10-30-8-pm/concert/18319849 | - |
| tm-sienna-spiro-2026-englewood-z7r9jz1a7p-ji | sienna-spiro | verify (applied) | 18297295 | https://seatgeek.com/sienna-spiro-tickets/englewood-colorado-gothic-theatre-2026-10-30-8-pm/concert/18297295 | - |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | verify (applied) | 18250878 | https://seatgeek.com/don-omar-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-10-30-8-pm/concert/18250878 | - |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | verify (applied) | 18253661 | https://seatgeek.com/stella-lefty-tickets/san-francisco-california-bimbos-365-club-2026-10-30-8-pm/concert/18253661 | - |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | verify (applied) | 18250163 | https://seatgeek.com/the-smashing-pumpkins-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-10-30-8-pm/concert/18250163 | - |
| tm-mico-2026-brooklyn-z7r9jz1a70uez | mico | verify (applied) | 18259849 | https://seatgeek.com/mico-tickets/brooklyn-new-york-music-hall-of-williamsburg-2026-10-31-8-pm/concert/18259849 | - |
| tm-ella-langley-2026-saint-paul-z7r9jz1a7ppo7 | ella-langley | verify (applied) | 18325137 | https://seatgeek.com/ella-langley-tickets/saint-paul-minnesota-grand-casino-arena-2026-10-31-7-pm/concert/18325137 | - |
| tm-sienna-spiro-2026-salt-lake-city-z7r9jz1aaef49 | sienna-spiro | verify (applied) | 18297297 | https://seatgeek.com/sienna-spiro-tickets/salt-lake-city-utah-the-grand-at-the-complex-2026-10-31-8-pm/concert/18297297 | - |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | verify (applied) | 17769328 | https://seatgeek.com/doja-cat-tickets/las-vegas-nevada-t-mobile-arena-2026-10-31-7-30-pm/concert/17769328 | - |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | verify (applied) | 18253662 | https://seatgeek.com/stella-lefty-tickets/west-hollywood-california-troubadour-2026-11-01-7-pm/concert/18253662 | - |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | verify (applied) | 18592658 | https://seatgeek.com/the-psychedelic-furs-tickets/menlo-park-california-the-guild-theatre-menlo-park-2026-11-01-8-pm/concert/18592658 | - |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | verify (applied) | 18492128 | https://seatgeek.com/jonas-brothers-tickets/saint-paul-minnesota-grand-casino-arena-2026-11-02-7-30-pm/concert/18492128 | - |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | verify (applied) | 18470201 | https://seatgeek.com/fuerza-regida-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-02-8-30-pm/concert/18470201 | - |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | verify (applied) | 18319855 | https://seatgeek.com/brand-new-tickets/denver-colorado-mission-ballroom-2026-11-02-8-pm/concert/18319855 | - |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | verify (applied) | 18291327 | https://seatgeek.com/stella-lefty-tickets/los-angeles-california-the-fonda-theatre-2026-11-02-8-pm/concert/18291327 | - |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | verify (applied) | 18297301 | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-the-showbox-2026-11-02-8-pm/concert/18297301 | - |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | verify (applied) | 18592656 | https://seatgeek.com/the-psychedelic-furs-tickets/menlo-park-california-the-guild-theatre-menlo-park-2026-11-02-8-pm/concert/18592656 | - |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | verify (applied) | 18345103 | https://seatgeek.com/mico-tickets/providence-rhode-island-fete-music-hall-2026-11-03-8-pm/concert/18345103 | - |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | verify (applied) | 18143695 | https://seatgeek.com/teddy-swims-tickets/salt-lake-city-utah-delta-center-1-2026-11-03-7-pm/concert/18143695 | - |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | verify (applied) | 18253664 | https://seatgeek.com/stella-lefty-tickets/phoenix-arizona-crescent-ballroom-2026-11-03-8-pm/concert/18253664 | - |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | verify (applied) | 18498567 | https://seatgeek.com/fuerza-regida-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-03-8-30-pm/concert/18498567 | - |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | verify (applied) | 18492778 | https://seatgeek.com/missio-tickets/san-francisco-california-brick-and-mortar-music-hall-2026-11-03-8-30-pm/concert/18492778 | - |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | verify (applied) | 18373497 | https://seatgeek.com/michelle-branch-tickets/boston-massachusetts-roadrunner-boston-2026-11-04-8-pm/concert/18373497 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | verify (applied) | 18297302 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-04-8-pm/concert/18297302 | - |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | verify (applied) | 18200018 | https://seatgeek.com/the-red-clay-strays-tickets/baton-rouge-louisiana-raising-cane-s-river-center-2026-11-05-6-30-pm/concert/18200018 | - |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | verify (applied) | 18257241 | https://seatgeek.com/john-summit-tickets/houston-texas-toyota-center-2026-11-05-7-pm/concert/18257241 | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | verify (applied) | 18297303 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-vogue-theatre-bc-1-2026-11-05-8-pm/concert/18297303 | - |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | verify (applied) | 18391931 | https://seatgeek.com/trivium-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-06-6-30-pm/concert/18391931 | - |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | verify (applied) | 18200019 | https://seatgeek.com/the-red-clay-strays-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-11-06-6-30-pm/concert/18200019 | - |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | verify (applied) | 18237194 | https://seatgeek.com/journey-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-06-7-30-pm/concert/18237194 | - |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | verify (applied) | 18147866 | https://seatgeek.com/blue-october-tickets/albany-new-york-hart-theatre-at-the-egg-2026-11-06-7-pm/concert/18147866 | - |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | verify (applied) | 18345772 | https://seatgeek.com/dinosaur-jr-tickets/san-antonio-texas-paper-tiger-san-antonio-2026-11-06-8-pm/concert/18345772 | - |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | verify (applied) | 17938858 | https://seatgeek.com/mana-tickets/houston-texas-toyota-center-2026-11-06-8-30-pm/concert/17938858 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | verify (applied) | 18085658 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-06-8-pm/concert/18085658 | - |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | verify (applied) | 18319859 | https://seatgeek.com/brand-new-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-11-06-8-pm/concert/18319859 | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | verify (applied) | 18391935 | https://seatgeek.com/trivium-tickets/louisville-kentucky-old-forester-s-paristown-hall-2026-11-07-6-35-pm/concert/18391935 | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | verify (applied) | 18147873 | https://seatgeek.com/blue-october-tickets/cleveland-ohio-agora-theatre-2026-11-07-7-pm/concert/18147873 | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | verify (applied) | 17769336 | https://seatgeek.com/doja-cat-tickets/houston-texas-toyota-center-2026-11-07-7-30-pm/concert/17769336 | - |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | verify (applied) | 18531269 | https://seatgeek.com/ye-tickets/arlington-texas-at-t-stadium-2026-11-07-8-pm/concert/18531269 | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | verify (applied) | 18318283 | https://seatgeek.com/sienna-spiro-tickets/portland-oregon-mcmenamins-crystal-ballroom-2026-11-07-8-pm/concert/18318283 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | verify (applied) | 18085660 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-07-8-pm/concert/18085660 | - |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | verify (applied) | 18316805 | https://seatgeek.com/daughtry-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-07-7-pm/concert/18316805 | - |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | verify (applied) | 17732672 | https://seatgeek.com/sabaton-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-08-7-pm/concert/17732672 | - |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | verify (applied) | 18571665 | https://seatgeek.com/jonas-brothers-tickets/houston-texas-toyota-center-2026-11-08-7-30-pm/concert/18571665 | - |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | verify (applied) | 18485941 | https://seatgeek.com/steve-lacy-tickets/sugar-land-texas-smart-financial-centre-2026-11-08-8-pm/concert/18485941 | - |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | verify (applied) | 18085646 | https://seatgeek.com/foy-vance-tickets/san-francisco-california-great-american-music-hall-2026-11-08-7-pm/concert/18085646 | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | verify (applied) | 18506093 | https://seatgeek.com/pentatonix-tickets/bozeman-montana-brick-breeden-fieldhouse-2026-11-09-7-pm/concert/18506093 | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | verify (applied) | 18085699 | https://seatgeek.com/foy-vance-tickets/portland-oregon-aladdin-theater-2026-11-10-7-pm/concert/18085699 | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | verify (applied) | 18391936 | https://seatgeek.com/trivium-tickets/new-haven-connecticut-college-street-music-hall-2026-11-11-6-35-pm/concert/18391936 | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | verify (applied) | 18147874 | https://seatgeek.com/blue-october-tickets/north-tonawanda-new-york-riviera-theatre-north-tonawanda-2026-11-11-7-pm/concert/18147874 | - |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | verify (applied) | 18316812 | https://seatgeek.com/daughtry-tickets/tucson-arizona-fox-tucson-theatre-2026-11-11-7-pm/concert/18316812 | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | verify (applied) | 18373510 | https://seatgeek.com/michelle-branch-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-11-11-7-30-pm/concert/18373510 | - |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | verify (applied) | 18485943 | https://seatgeek.com/steve-lacy-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-11-8-pm/concert/18485943 | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | verify (applied) | 18391943 | https://seatgeek.com/trivium-tickets/new-york-new-york-terminal-5-2026-11-12-6-35-pm/concert/18391943 | - |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | verify (applied) | 18219942 | https://seatgeek.com/journey-tickets/cleveland-ohio-rocket-arena-2026-11-12-7-30-pm/concert/18219942 | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | verify (applied) | 18373511 | https://seatgeek.com/michelle-branch-tickets/milwaukee-wisconsin-pabst-theater-2026-11-12-8-pm/concert/18373511 | - |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | verify (applied) | 18387640 | https://seatgeek.com/foy-vance-tickets/vancouver-canada-hollywood-theatre-vancouver-2026-11-12-7-pm/concert/18387640 | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | verify (applied) | 18157641 | https://seatgeek.com/sombr-tickets/cleveland-ohio-rocket-arena-2026-11-13-7-30-pm/concert/18157641 | - |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | verify (applied) | 18253089 | https://seatgeek.com/beartooth-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-13-6-pm/concert/18253089 | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | verify (applied) | 18322791 | https://seatgeek.com/amble-tickets/atlanta-georgia-terminal-west-2026-11-13-8-pm/concert/18322791 | - |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | verify (applied) | 18185177 | https://seatgeek.com/teddy-swims-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-13-7-pm/concert/18185177 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | verify (applied) | 18391945 | https://seatgeek.com/trivium-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-14-6-35-pm/concert/18391945 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | verify (applied) | 18312360 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-14-8-pm/concert/18312360 | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | verify (applied) | 18185180 | https://seatgeek.com/teddy-swims-tickets/las-vegas-nevada-t-mobile-arena-2026-11-14-7-pm/concert/18185180 | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | verify (applied) | 18391947 | https://seatgeek.com/trivium-tickets/worcester-massachusetts-the-palladium-2026-11-15-6-35-pm/concert/18391947 | - |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | verify (applied) | 18269141 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-webster-hall-2026-11-15-8-pm/concert/18269141 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | verify (applied) | 18312361 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-15-8-pm/concert/18312361 | - |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | verify (applied) | 18310993 | https://seatgeek.com/the-psychedelic-furs-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2026-11-16-8-pm/concert/18310993 | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | verify (applied) | 18253466 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-royale-boston-2026-11-17-8-pm/concert/18253466 | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | verify (applied) | 18253081 | https://seatgeek.com/beartooth-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-18-6-pm/concert/18253081 | - |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | verify (applied) | 18237193 | https://seatgeek.com/journey-tickets/houston-texas-toyota-center-2026-11-18-7-30-pm/concert/18237193 | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | verify (applied) | 18573353 | https://seatgeek.com/trans-siberian-orchestra-tickets/green-bay-wisconsin-resch-center-2026-11-19-2-30-pm/concert/18573353 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | verify (applied) | 18208621 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-19-7-pm/concert/18208621 | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | verify (applied) | 18385717 | https://seatgeek.com/pentatonix-tickets/cleveland-ohio-rocket-arena-2026-11-19-7-pm/concert/18385717 | - |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | verify (applied) | 18572536 | https://seatgeek.com/too-many-zooz-tickets/ottawa-canada-overflow-brewing-company-2026-11-19-7-30-pm/concert/18572536 | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | verify (applied) | 18147875 | https://seatgeek.com/blue-october-tickets/jacksonville-florida-five-jacksonville-2026-11-19-7-pm/concert/18147875 | - |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | verify (applied) | 18092700 | https://seatgeek.com/the-psychedelic-furs-tickets/phoenix-arizona-celebrity-theatre-phoenix-2026-11-19-7-30-pm/concert/18092700 | - |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | verify (applied) | 18391950 | https://seatgeek.com/trivium-tickets/royal-oak-michigan-royal-oak-music-theatre-2026-11-20-6-35-pm/concert/18391950 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | verify (applied) | 18208620 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | verify (applied) | 18147876 | https://seatgeek.com/blue-october-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-20-7-pm/concert/18147876 | - |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | verify (applied) | 18337370 | https://seatgeek.com/dylan-gossett-tickets/apopka-florida-apopka-amphitheater-2026-11-21-6-pm/concert/18337370 | - |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | verify (applied) | 18085728 | https://seatgeek.com/foy-vance-tickets/englewood-colorado-gothic-theatre-2026-11-21-7-pm/concert/18085728 | - |
| tm-ye-2026-glendale-z7r9jz1aav08u | ye | verify (applied) | 18549330 | https://seatgeek.com/ye-tickets/glendale-arizona-state-farm-stadium-2026-11-21-8-30-pm/concert/18549330 | - |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | trans-siberian-orchestra | verify (applied) | 18573367 | https://seatgeek.com/trans-siberian-orchestra-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-22-2-30-pm/concert/18573367 | - |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | trans-siberian-orchestra | verify (applied) | 18499779 | https://seatgeek.com/trans-siberian-orchestra-tickets/salt-lake-city-utah-delta-center-1-2026-11-24-3-pm/concert/18499779 | - |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | trivium | verify (applied) | 18391959 | https://seatgeek.com/trivium-tickets/nashville-tennessee-the-pinnacle-nashville-2026-11-24-6-35-pm/concert/18391959 | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | trivium | verify (applied) | 18391961 | https://seatgeek.com/trivium-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-27-6-35-pm/concert/18391961 | - |
| tm-journey-2026-las-vegas-z7r9jz1a70_7f | journey | verify (applied) | 18237195 | https://seatgeek.com/journey-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-27-7-30-pm/concert/18237195 | - |
| tm-jonas-brothers-2026-las-vegas-z7r9jz1aazwb_ | jonas-brothers | verify (applied) | 18503912 | https://seatgeek.com/jonas-brothers-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-28-7-30-pm/concert/18503912 | - |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | beartooth | verify (applied) | 18253058 | https://seatgeek.com/beartooth-tickets/charleston-south-carolina-the-refinery-charleston-2026-12-02-6-30-pm/concert/18253058 | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | blue-october | verify (applied) | 18147878 | https://seatgeek.com/blue-october-tickets/kansas-city-missouri-the-midland-theatre-mo-2026-12-03-7-pm/concert/18147878 | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | trivium | verify (applied) | 18391971 | https://seatgeek.com/trivium-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-12-03-6-30-pm/concert/18391971 | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | beartooth | verify (applied) | 18253061 | https://seatgeek.com/beartooth-tickets/saint-augustine-florida-st-augustine-amphitheatre-2026-12-04-6-pm/concert/18253061 | - |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | trans-siberian-orchestra | verify (applied) | 18573413 | https://seatgeek.com/trans-siberian-orchestra-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-12-04-7-pm/concert/18573413 | - |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | trans-siberian-orchestra | verify (applied) | 18573414 | https://seatgeek.com/trans-siberian-orchestra-tickets/ontario-california-toyota-arena-ontario-2026-12-05-3-pm/concert/18573414 | - |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | beartooth | verify (applied) | 18235668 | https://seatgeek.com/beartooth-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-05-6-30-pm/concert/18235668 | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | the-red-clay-strays | verify (applied) | 18257194 | https://seatgeek.com/the-red-clay-strays-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-12-05-6-30-pm/concert/18257194 | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | tommy-emmanuel | verify (applied) | 18225197 | https://seatgeek.com/tommy-emmanuel-tickets/durham-north-carolina-carolina-theatre-durham-2026-12-06-8-pm/concert/18225197 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | riley-green | verify (applied) | 18282384 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-06-8-30-pm/concert/18282384 | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | jonas-brothers | verify (applied) | 18471182 | https://seatgeek.com/jonas-brothers-tickets/salt-lake-city-utah-delta-center-1-2026-12-07-7-30-pm/concert/18471182 | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | trivium | verify (applied) | 18391977 | https://seatgeek.com/trivium-tickets/penticton-canada-penticton-trade-convention-centre-2026-12-07-6-35-pm/concert/18391977 | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | beartooth | verify (applied) | 18253063 | https://seatgeek.com/beartooth-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-09-6-30-pm/concert/18253063 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | blue-october | verify (applied) | 18147877 | https://seatgeek.com/blue-october-tickets/little-rock-arkansas-the-hall-little-rock-2026-12-09-7-pm/concert/18147877 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | riley-green | verify (applied) | 18282386 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-10-8-30-pm/concert/18282386 | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | trans-siberian-orchestra | verify (applied) | 18573440 | https://seatgeek.com/trans-siberian-orchestra-tickets/houston-texas-toyota-center-2026-12-11-3-pm/concert/18573440 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | blue-october | verify (applied) | 18147885 | https://seatgeek.com/blue-october-tickets/austin-texas-bass-concert-hall-2026-12-11-7-pm/concert/18147885 | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | brent-faiyaz | verify (applied) | 18619390 | https://seatgeek.com/brent-faiyaz-tickets/los-angeles-california-crypto-com-arena-2026-12-11-8-pm/concert/18619390 | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | sabaton | verify (applied) | 17726761 | https://seatgeek.com/sabaton-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-12-7-pm/concert/17726761 | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | pink-martini | verify (applied) | 18670209 | https://seatgeek.com/pink-martini-tickets/lebanon-new-hampshire-lebanon-opera-house-2026-12-12-7-30-pm/concert/18670209 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | janet-jackson | verify (applied) | 18443314 | https://seatgeek.com/janet-jackson-tickets/sunrise-florida-amerant-bank-arena-2026-12-12-8-pm/concert/18443314 | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | blue-october | verify (applied) | 18142024 | https://seatgeek.com/blue-october-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-12-12-8-pm/concert/18142024 | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | verify (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | atmosphere | verify (applied) | 18609072 | https://seatgeek.com/atmosphere-tickets/west-des-moines-iowa-val-air-ballroom-2027-01-16-6-45-pm/concert/18609072 | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | atmosphere | verify (applied) | 18609074 | https://seatgeek.com/atmosphere-tickets/omaha-nebraska-the-admiral-omaha-2027-01-17-8-pm/concert/18609074 | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | atmosphere | verify (applied) | 18609075 | https://seatgeek.com/atmosphere-tickets/fort-collins-colorado-aggie-theatre-2027-01-19-6-45-pm/concert/18609075 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | alan-walker | verify (applied) | 18595131 | https://seatgeek.com/alan-walker-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-21-7-pm/concert/18595131 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | verify (applied) | 18690599 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-21-8-pm/concert/18690599 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | verify (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | verify (applied) | 18690598 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-22-8-pm/concert/18690598 | - |
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
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | verify (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | verify (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
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
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | verify (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | verify (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | sylvan-esso | verify (applied) | 18299162 | https://seatgeek.com/sylvan-esso-tickets/vancouver-canada-vogue-theatre-bc-1-2027-02-20-8-pm/concert/18299162 | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | tobymac | verify (applied) | 18548806 | https://seatgeek.com/tobymac-tickets/norfolk-virginia-chartway-arena-2027-02-21-6-30-pm/concert/18548806 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | sylvan-esso | verify (applied) | 18299165 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-22-8-30-pm/concert/18299165 | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | dinosaur-jr | verify (applied) | 18540443 | https://seatgeek.com/dinosaur-jr-tickets/orlando-florida-the-plaza-live-2027-02-23-7-30-pm/concert/18540443 | - |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | alan-walker | verify (applied) | 18595139 | https://seatgeek.com/alan-walker-tickets/pittsburgh-pennsylvania-stage-ae-2027-02-23-8-pm/concert/18595139 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
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
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | verify (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | pink-martini | verify (applied) | 18500192 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-06-7-30-pm/concert/18500192 | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | blue-october | verify (applied) | 18262264 | https://seatgeek.com/blue-october-tickets/denver-colorado-mission-ballroom-2027-03-06-8-pm/concert/18262264 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | verify (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | blue-october | verify (applied) | 18306113 | https://seatgeek.com/blue-october-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-07-8-pm/concert/18306113 | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | blondshell | verify (applied) | 18251042 | https://seatgeek.com/blondshell-tickets/seattle-washington-showbox-sodo-2027-03-07-8-pm/concert/18251042 | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | sylvan-esso | verify (applied) | 18299178 | https://seatgeek.com/sylvan-esso-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-08-8-pm/concert/18299178 | - |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | vnv-nation | verify (applied) | 18659523 | https://seatgeek.com/vnv-nation-tickets/nashville-tennessee-exit-in-2027-03-09-8-pm/concert/18659523 | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | chelsea-cutler | verify (applied) | 18639209 | https://seatgeek.com/chelsea-cutler-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-09-7-pm/concert/18639209 | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | the-lemonheads | verify (applied) | 18595335 | https://seatgeek.com/the-lemonheads-tickets/portland-oregon-hawthorne-theatre-2027-03-10-7-pm/concert/18595335 | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | blue-october | verify (applied) | 18343763 | https://seatgeek.com/blue-october-tickets/chicago-illinois-riviera-theatre-chicago-2027-03-11-8-pm/concert/18343763 | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | yuridia | verify (applied) | 18570402 | https://seatgeek.com/yuridia-tickets/sugar-land-texas-smart-financial-centre-2027-03-11-8-pm/concert/18570402 | - |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | sylvan-esso | verify (applied) | 18299183 | https://seatgeek.com/sylvan-esso-tickets/new-orleans-louisiana-tipitina-s-2027-03-11-8-pm/concert/18299183 | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | morat | verify (applied) | 18259792 | https://seatgeek.com/morat-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-03-12-8-pm/concert/18259792 | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | blondshell | verify (applied) | 18251049 | https://seatgeek.com/blondshell-tickets/chicago-illinois-vic-theatre-chicago-2027-03-12-8-pm/concert/18251049 | - |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | fantasia | verify (applied) | 18643133 | https://seatgeek.com/fantasia-tickets/houston-texas-toyota-center-2027-03-12-8-pm/concert/18643133 | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | chelsea-cutler | verify (applied) | 18639214 | https://seatgeek.com/chelsea-cutler-tickets/seattle-washington-showbox-sodo-2027-03-12-7-pm/concert/18639214 | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | tobymac | verify (applied) | 18548874 | https://seatgeek.com/tobymac-tickets/lubbock-texas-united-supermarkets-arena-2027-03-13-7-pm/concert/18548874 | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | morat | verify (applied) | 18259793 | https://seatgeek.com/morat-tickets/sugar-land-texas-smart-financial-centre-2027-03-13-8-pm/concert/18259793 | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | chelsea-cutler | verify (applied) | 18639215 | https://seatgeek.com/chelsea-cutler-tickets/portland-oregon-roseland-theater-2027-03-13-7-pm/concert/18639215 | - |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | vnv-nation | verify (applied) | 17912521 | https://seatgeek.com/vnv-nation-tickets/atlanta-georgia-variety-playhouse-2027-03-14-8-pm/concert/17912521 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | death-cab-for-cutie | verify (applied) | 18604670 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-14-8-pm/concert/18604670 | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | blondshell | verify (applied) | 18251054 | https://seatgeek.com/blondshell-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-14-8-pm/concert/18251054 | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | the-lemonheads | verify (applied) | 18595343 | https://seatgeek.com/the-lemonheads-tickets/englewood-colorado-gothic-theatre-2027-03-14-8-30-pm/concert/18595343 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | death-cab-for-cutie | verify (applied) | 18604671 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-15-8-pm/concert/18604671 | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | rod-stewart | verify (applied) | 18603490 | https://seatgeek.com/rod-stewart-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-16-7-30-pm/concert/18603490 | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | the-lemonheads | verify (applied) | 18595344 | https://seatgeek.com/the-lemonheads-tickets/omaha-nebraska-the-waiting-room-omaha-2027-03-16-7-pm/concert/18595344 | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | death-cab-for-cutie | verify (applied) | 18604673 | https://seatgeek.com/death-cab-for-cutie-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-17-7-pm/concert/18604673 | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | valley | verify (applied) | 18643169 | https://seatgeek.com/valley-tickets/new-york-new-york-webster-hall-2027-03-17-8-pm/concert/18643169 | - |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | niall-horan | verify (applied) | 18235523 | https://seatgeek.com/niall-horan-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-17-7-30-pm/concert/18235523 | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | michelle-branch | verify (applied) | 18650112 | https://seatgeek.com/michelle-branch-tickets/denver-colorado-mission-ballroom-2027-03-17-8-pm/concert/18650112 | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | too-many-zooz | verify (applied) | 18612556 | https://seatgeek.com/too-many-zooz-tickets/colorado-springs-colorado-black-sheep-2027-03-17-8-pm/concert/18612556 | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | vnv-nation | verify (applied) | 18165972 | https://seatgeek.com/vnv-nation-tickets/mesa-arizona-nile-theater-mesa-2027-03-18-8-pm/concert/18165972 | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | yuridia | verify (applied) | 18570410 | https://seatgeek.com/yuridia-tickets/edinburg-texas-bert-ogden-arena-2027-03-19-8-pm/concert/18570410 | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | hans-zimmer | verify (applied) | 18601968 | https://seatgeek.com/hans-zimmer-tickets/kansas-city-missouri-t-mobile-center-2027-03-19-8-pm/concert/18601968 | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | michelle-branch | verify (applied) | 18508844 | https://seatgeek.com/michelle-branch-tickets/columbus-ohio-kemba-live-2027-03-20-8-pm/concert/18508844 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | verify (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | michelle-branch | verify (applied) | 18508847 | https://seatgeek.com/michelle-branch-tickets/royal-oak-michigan-royal-oak-music-theatre-2027-03-21-7-pm/concert/18508847 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | death-cab-for-cutie | verify (applied) | 18604672 | https://seatgeek.com/death-cab-for-cutie-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-24-8-pm/concert/18604672 | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | the-psychedelic-furs | verify (applied) | 18592690 | https://seatgeek.com/the-psychedelic-furs-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-25-8-pm/concert/18592690 | - |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | death-cab-for-cutie | verify (applied) | 18604674 | https://seatgeek.com/death-cab-for-cutie-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-03-26-7-30-pm/concert/18604674 | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | staind | verify (applied) | 18655524 | https://seatgeek.com/staind-tickets/spokane-washington-numerica-veterans-arena-2027-03-26-6-pm/concert/18655524 | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | vnv-nation | verify (applied) | 18662604 | https://seatgeek.com/vnv-nation-tickets/salt-lake-city-utah-the-grand-at-the-complex-2027-03-26-7-30-pm/concert/18662604 | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | yuridia | verify (applied) | 18570411 | https://seatgeek.com/yuridia-tickets/brooklyn-new-york-kings-theatre-brooklyn-2027-03-27-8-pm/concert/18570411 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | verify (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-def-leppard-2027-minneapolis-z7r9jz1aa7eoa | def-leppard | verify (applied) | 18662396 | https://seatgeek.com/def-leppard-tickets/minneapolis-minnesota-target-center-2027-03-27-7-pm/concert/18662396 | - |
| tm-michelle-branch-2027-philadelphia-z7r9jz1aazyqb | michelle-branch | verify (applied) | 18508855 | https://seatgeek.com/michelle-branch-tickets/philadelphia-pennsylvania-franklin-music-hall-2027-03-27-8-30-pm/concert/18508855 | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | death-cab-for-cutie | verify (applied) | 18604675 | https://seatgeek.com/death-cab-for-cutie-tickets/huntsville-alabama-orion-amphitheater-2027-03-27-8-pm/concert/18604675 | - |
| tm-hans-zimmer-2027-salt-lake-city-z7r9jz1aavvqa | hans-zimmer | verify (applied) | 18415275 | https://seatgeek.com/hans-zimmer-tickets/salt-lake-city-utah-delta-center-1-2027-03-27-7-30-pm/concert/18415275 | - |
| tm-vnv-nation-2027-omaha-z7r9jz1a7q0ef | vnv-nation | verify (applied) | 18357653 | https://seatgeek.com/vnv-nation-tickets/omaha-nebraska-slowdown-2027-03-29-8-pm/concert/18357653 | - |
| tm-nickelback-2027-saint-paul-z7r9jz1aa774k | nickelback | verify (applied) | 18655421 | https://seatgeek.com/nickelback-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-30-6-30-pm/concert/18655421 | - |
| tm-dylan-gossett-2027-chattanooga-z7r9jz1aae4bi | dylan-gossett | verify (applied) | 18642078 | https://seatgeek.com/dylan-gossett-tickets/chattanooga-tennessee-the-signal-2027-03-30-7-pm/concert/18642078 | - |
| tm-def-leppard-2027-salt-lake-city-z7r9jz1aa7eo3 | def-leppard | verify (applied) | 18274784 | https://seatgeek.com/def-leppard-tickets/salt-lake-city-utah-delta-center-1-2027-03-31-7-pm/concert/18274784 | - |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | death-cab-for-cutie | verify (applied) | 18604682 | https://seatgeek.com/death-cab-for-cutie-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-04-01-8-pm/concert/18604682 | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | warren-zeiders | verify (applied) | 18649741 | https://seatgeek.com/warren-zeiders-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-04-01-7-pm/concert/18649741 | - |
| tm-vnv-nation-2027-chicago-z7r9jz1a7pupm | vnv-nation | verify (applied) | 18159984 | https://seatgeek.com/vnv-nation-tickets/chicago-illinois-metro-chicago-2027-04-01-8-pm/concert/18159984 | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | riley-green | verify (applied) | 18626511 | https://seatgeek.com/riley-green-tickets/spokane-washington-numerica-veterans-arena-2027-04-01-7-pm/concert/18626511 | - |
| tm-hans-zimmer-2027-los-angeles-z7r9jz1aavvq8 | hans-zimmer | verify (applied) | 18601970 | https://seatgeek.com/hans-zimmer-tickets/los-angeles-california-crypto-com-arena-2027-04-01-7-30-pm/concert/18601970 | - |
| tm-nothing-but-thieves-2027-portland-z7r9jz1a70gfm | nothing-but-thieves | verify (applied) | 18266341 | https://seatgeek.com/nothing-but-thieves-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-01-8-pm/concert/18266341 | - |
| tm-dylan-gossett-2027-fayetteville-z7r9jz1aae4bt | dylan-gossett | verify (applied) | 18642083 | https://seatgeek.com/dylan-gossett-tickets/fayetteville-arkansas-ozark-music-hall-2027-04-02-7-pm/concert/18642083 | - |
| tm-the-psychedelic-furs-2027-nashville-z7r9jz1aavpq_ | the-psychedelic-furs | verify (applied) | 18592665 | https://seatgeek.com/the-psychedelic-furs-tickets/nashville-tennessee-ryman-auditorium-2027-04-02-8-pm/concert/18592665 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | harry-styles | verify (applied) | 18570444 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-02-7-45-pm/concert/18570444 | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | luke-combs | verify (applied) | 18379496 | https://seatgeek.com/luke-combs-tickets/arlington-texas-at-t-stadium-2027-04-03-5-20-pm/concert/18379496 | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | staind | verify (applied) | 18655681 | https://seatgeek.com/staind-tickets/billings-montana-first-interstate-arena-2027-04-03-6-pm/concert/18655681 | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | harry-styles | verify (applied) | 18577793 | https://seatgeek.com/harry-styles-tickets/glendale-arizona-state-farm-stadium-2027-04-03-7-45-pm/concert/18577793 | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | the-psychedelic-furs | verify (applied) | 18592691 | https://seatgeek.com/the-psychedelic-furs-tickets/tallahassee-florida-the-moon-2027-04-07-7-30-pm/concert/18592691 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | the-psychedelic-furs | verify (applied) | 18592671 | https://seatgeek.com/the-psychedelic-furs-tickets/saint-petersburg-florida-jannus-live-2027-04-08-8-pm/concert/18592671 | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | dylan-gossett | verify (applied) | 18642098 | https://seatgeek.com/dylan-gossett-tickets/columbus-ohio-kemba-live-2027-04-08-7-pm/concert/18642098 | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | verify (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | harry-styles | verify (applied) | 18516103 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-09-7-45-pm/concert/18516103 | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | nothing-but-thieves | verify (applied) | 18266350 | https://seatgeek.com/nothing-but-thieves-tickets/denver-colorado-mission-ballroom-2027-04-09-8-pm/concert/18266350 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | verify (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | verify (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2026-huntington-k7vgf_geicgms | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-sienna-spiro-2026-new-york-k7vgf_uedf3n_ | sienna-spiro | verify (applied) | 18317533 | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-10-20-8-pm/concert/18317533 | - |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | add (applied) | 18215205 | https://seatgeek.com/phoebe-bridgers-tickets/salt-lake-city-utah-delta-center-1-2026-10-21-7-30-pm/concert/18215205 | - |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | verify (applied) | 18266693 | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-21-8-pm/concert/18266693 | - |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | verify (applied) | 18128391 | https://seatgeek.com/lil-wayne-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2026-10-23-8-pm/concert/18128391 | - |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | verify (applied) | 18613386 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-23-8-pm/concert/18613386 | - |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | verify (applied) | 18285544 | https://seatgeek.com/zach-top-tickets/lafayette-louisiana-cajundome-2026-10-23-8-pm/concert/18285544 | - |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | verify (applied) | 18266694 | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-23-8-pm/concert/18266694 | - |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | verify (applied) | 18551168 | https://seatgeek.com/jonas-brothers-tickets/toronto-canada-scotiabank-arena-2026-10-24-7-30-pm/concert/18551168 | - |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | verify (applied) | 18266318 | https://seatgeek.com/arcangel-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-10-24-8-pm/concert/18266318 | - |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | verify (applied) | 18128379 | https://seatgeek.com/lil-wayne-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-10-24-8-30-pm/concert/18128379 | - |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | verify (applied) | 18250159 | https://seatgeek.com/the-smashing-pumpkins-tickets/oklahoma-city-oklahoma-paycom-center-2026-10-24-8-pm/concert/18250159 | - |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | verify (applied) | 18613385 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-24-8-pm/concert/18613385 | - |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | verify (applied) | 18370151 | https://seatgeek.com/zach-top-tickets/rogers-arkansas-walmart-amp-2026-10-24-8-pm/concert/18370151 | - |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | verify (applied) | 18266696 | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-24-8-pm/concert/18266696 | - |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | verify (applied) | 18613384 | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-25-2-pm/concert/18613384 | - |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-smashing-pumpkins-2026-austin-g5diz_1txjp-0 | the-smashing-pumpkins | verify (applied) | 18250160 | https://seatgeek.com/the-smashing-pumpkins-tickets/austin-texas-moody-center-atx-2026-10-25-8-pm/concert/18250160 | - |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | verify (applied) | 18004730 | https://seatgeek.com/chris-stapleton-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-26-7-30-pm/concert/18004730 | - |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | verify (applied) | 18266701 | https://seatgeek.com/tom-jones-tickets/los-angeles-california-the-greek-theatre-los-angeles-2026-10-26-8-pm/concert/18266701 | - |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | verify (applied) | 18252688 | https://seatgeek.com/mico-tickets/atlanta-georgia-the-masquerade-heaven-2026-10-27-7-pm/concert/18252688 | - |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | verify (applied) | 18250161 | https://seatgeek.com/the-smashing-pumpkins-tickets/denver-colorado-ball-arena-2026-10-27-8-pm/concert/18250161 | - |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | tom-jones | verify (applied) | 18266703 | https://seatgeek.com/tom-jones-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2026-10-27-8-pm/concert/18266703 | - |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | verify (applied) | 18499209 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-29-8-pm/concert/18499209 | - |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | verify (applied) | 18285545 | https://seatgeek.com/zach-top-tickets/duluth-georgia-gas-south-arena-2026-10-29-8-pm/concert/18285545 | - |
| tm-the-airborne-toxic-event-2026-chicago-z7r9jz1a70iqs | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | conflict | - | - | ambiguous: 4 qualifying SeatGeek events in the window |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | add (applied) | 18266705 | https://seatgeek.com/tom-jones-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2026-10-29-8-pm/concert/18266705 | - |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | verify (applied) | 18473030 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-30-8-pm/concert/18473030 | - |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | verify (applied) | 18285548 | https://seatgeek.com/zach-top-tickets/nashville-tennessee-bridgestone-arena-2026-10-30-8-30-pm/concert/18285548 | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | verify (applied) | 18266706 | https://seatgeek.com/tom-jones-tickets/wheatland-california-hard-rock-live-sacramento-2026-10-31-8-pm/concert/18266706 | - |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | conflict | - | - | ambiguous: 3 qualifying SeatGeek events in the window |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | tom-jones | verify (applied) | 18266707 | https://seatgeek.com/tom-jones-tickets/san-francisco-california-the-masonic-san-francisco-2026-11-01-8-pm/concert/18266707 | - |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | verify (applied) | 18237143 | https://seatgeek.com/journey-tickets/toronto-canada-scotiabank-arena-2026-11-04-7-30-pm/concert/18237143 | - |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | verify (applied) | 18637279 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-06-8-pm/concert/18637279 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | verify (applied) | 18629299 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | verify (applied) | 18645455 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-13-8-pm/concert/18645455 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | verify (applied) | 18686081 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-13-8-pm/concert/18686081 | - |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | a-boogie-wit-da-hoodie | verify (applied) | 18629507 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-14-8-pm/concert/18629507 | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | garth-brooks | verify (applied) | 18686083 | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-14-8-pm/concert/18686083 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | stevie-wonder | verify (applied) | 18570214 | https://seatgeek.com/stevie-wonder-tickets/new-york-new-york-madison-square-garden-2026-11-19-8-pm/concert/18570214 | - |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | arcangel | verify (applied) | 18266331 | https://seatgeek.com/arcangel-tickets/inglewood-california-youtube-theater-2026-11-20-8-pm/concert/18266331 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | stevie-wonder | verify (applied) | 18570213 | https://seatgeek.com/stevie-wonder-tickets/chicago-illinois-united-center-2026-11-21-8-pm/concert/18570213 | - |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | arcangel | verify (applied) | 18266334 | https://seatgeek.com/arcangel-tickets/san-jose-california-san-jose-civic-2026-11-21-8-pm/concert/18266334 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | stevie-wonder | verify (applied) | 18570216 | https://seatgeek.com/stevie-wonder-tickets/washington-district-of-columbia-capital-one-arena-2026-11-23-8-pm/concert/18570216 | - |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | a-boogie-wit-da-hoodie | verify (applied) | 18629264 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/toronto-canada-scotiabank-arena-2026-11-28-8-pm/concert/18629264 | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | lil-wayne | verify (applied) | 18128388 | https://seatgeek.com/lil-wayne-tickets/lexington-kentucky-rupp-arena-2026-12-04-8-30-pm/concert/18128388 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | lil-wayne | verify (applied) | 18649583 | https://seatgeek.com/lil-wayne-tickets/savannah-georgia-enmarket-arena-2026-12-05-7-pm/concert/18649583 | - |
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | a-boogie-wit-da-hoodie | add (applied) | 18662770 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/orlando-florida-central-florida-fairgrounds-2026-12-05-8-pm/concert/18662770 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |

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
| tm-bruno-mars-2026-vancouver-1av7z_egkshvjex | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
