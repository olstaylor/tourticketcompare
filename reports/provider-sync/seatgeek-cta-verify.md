# SeatGeek CTA verification log

Generated: 2026-11-01T22:34:30.257Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 2020 (needs_recheck: 923, provenance backfill: 35, stale re-check: 1586)
- Events skipped before API checks: 491
- API calls made: 800
- Verified provenance written: 498
- URLs added: 16
- URLs corrected: 0
- URLs cleared: 28
- Provenance un-verified: 0
- Conflicts (ambiguous, untouched): 0
- No qualifying listing: 230
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | a-perfect-circle | verify (applied) | 18632537 | https://seatgeek.com/a-perfect-circle-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-20-7-30-pm/concert/18632537 | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | riley-green | verify (applied) | 18626525 | https://seatgeek.com/riley-green-tickets/tulsa-oklahoma-bok-center-2027-05-20-7-pm/concert/18626525 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | santana | verify (applied) | 18628844 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-20-7-pm/concert/18628844 | - |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | niall-horan | verify (applied) | 18235556 | https://seatgeek.com/niall-horan-tickets/phoenix-arizona-mortgage-matchup-center-2027-05-20-7-30-pm/concert/18235556 | - |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | the-airborne-toxic-event | verify (applied) | 18252225 | https://seatgeek.com/the-airborne-toxic-event-tickets/new-york-new-york-irving-plaza-2027-05-21-7-pm/concert/18252225 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | harry-styles | verify (applied) | 18579683 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-21-7-45-pm/concert/18579683 | - |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | ha-ash | verify (applied) | 18608857 | https://seatgeek.com/ha-ash-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-21-8-pm/concert/18608857 | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | fantasia | verify (applied) | 18629235 | https://seatgeek.com/fantasia-tickets/providence-rhode-island-amica-mutual-pavilion-2027-05-21-8-pm/concert/18629235 | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | riley-green | verify (applied) | 18626526 | https://seatgeek.com/riley-green-tickets/dallas-texas-dos-equis-pavilion-2027-05-21-7-pm/concert/18626526 | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | carly-rae-jepsen | verify (applied) | 18639045 | https://seatgeek.com/carly-rae-jepsen-tickets/chicago-illinois-the-chicago-theatre-2027-05-21-7-30-pm/concert/18639045 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | kenny-chesney | verify (applied) | 18591994 | https://seatgeek.com/kenny-chesney-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-05-22-4-30-pm/concert/18591994 | - |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | metallica | verify (applied) | 18595099 | https://seatgeek.com/metallica-tickets/san-antonio-texas-alamodome-2027-05-22-6-pm/concert/18595099 | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | carly-rae-jepsen | verify (applied) | 18639046 | https://seatgeek.com/carly-rae-jepsen-tickets/detroit-michigan-fox-theatre-detroit-2027-05-22-7-30-pm/concert/18639046 | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | harry-styles | verify (applied) | 18579676 | https://seatgeek.com/harry-styles-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-22-7-45-pm/concert/18579676 | - |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | ha-ash | verify (applied) | 18608864 | https://seatgeek.com/ha-ash-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-05-22-8-pm/concert/18608864 | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | fantasia | verify (applied) | 18629280 | https://seatgeek.com/fantasia-tickets/newark-new-jersey-prudential-center-2027-05-22-8-pm/concert/18629280 | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | riley-green | verify (applied) | 18626529 | https://seatgeek.com/riley-green-tickets/lafayette-louisiana-cajundome-2027-05-22-7-pm/concert/18626529 | - |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | the-airborne-toxic-event | verify (applied) | 18252179 | https://seatgeek.com/the-airborne-toxic-event-tickets/boston-massachusetts-orpheum-theatre-boston-2027-05-22-8-pm/concert/18252179 | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | a-perfect-circle | verify (applied) | 18632538 | https://seatgeek.com/a-perfect-circle-tickets/chicago-illinois-wintrust-arena-2027-05-22-8-pm/concert/18632538 | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | santana | verify (applied) | 18628845 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-22-7-pm/concert/18628845 | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | niall-horan | verify (applied) | 18235557 | https://seatgeek.com/niall-horan-tickets/inglewood-california-kia-forum-2027-05-22-7-30-pm/concert/18235557 | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | the-warning | verify (applied) | 18591764 | https://seatgeek.com/the-warning-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-05-23-8-pm/concert/18591764 | - |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | a-perfect-circle | verify (applied) | 18632539 | https://seatgeek.com/a-perfect-circle-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-23-7-pm/concert/18632539 | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | santana | verify (applied) | 18628846 | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-23-7-pm/concert/18628846 | - |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | the-airborne-toxic-event | verify (applied) | 18251603 | https://seatgeek.com/the-airborne-toxic-event-tickets/cleveland-ohio-house-of-blues-cleveland-2027-05-24-7-pm/concert/18251603 | - |
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | two-door-cinema-club | verify (applied) | 18711341 | https://seatgeek.com/two-door-cinema-club-tickets/del-mar-california-the-sound-del-mar-2027-05-24-7-30-pm/concert/18711341 | - |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | carly-rae-jepsen | verify (applied) | 18639055 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-25-7-30-pm/concert/18639055 | - |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | the-airborne-toxic-event | verify (applied) | 18251734 | https://seatgeek.com/the-airborne-toxic-event-tickets/detroit-michigan-saint-andrews-hall-2027-05-25-7-pm/concert/18251734 | - |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | zach-bryan | verify (applied) | 18686630 | https://seatgeek.com/zach-bryan-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-05-25-7-pm/concert/18686630 | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | niall-horan | verify (applied) | 18235559 | https://seatgeek.com/niall-horan-tickets/san-francisco-california-chase-center-2027-05-25-7-30-pm/concert/18235559 | - |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | hazlett | verify (applied) | 18311990 | https://seatgeek.com/hazlett-tickets/seattle-washington-neptune-theatre-wa-2027-05-25-8-pm/concert/18311990 | - |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | carly-rae-jepsen | verify (applied) | 18657110 | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-26-6-30-pm/concert/18657110 | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | metallica | verify (applied) | 18595089 | https://seatgeek.com/metallica-tickets/fayetteville-arkansas-razorback-stadium-2027-05-26-6-pm/concert/18595089 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | hazlett | verify (applied) | 18388253 | https://seatgeek.com/hazlett-tickets/vancouver-canada-commodore-ballroom-2027-05-26-7-pm/concert/18388253 | - |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | the-airborne-toxic-event | verify (applied) | 18252640 | https://seatgeek.com/the-airborne-toxic-event-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-05-27-7-pm/concert/18252640 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | fkj | verify (applied) | 18281838 | https://seatgeek.com/fkj-tickets/chicago-illinois-the-salt-shed-outdoors-2027-05-27-8-pm/concert/18281838 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | niall-horan | verify (applied) | 18235558 | https://seatgeek.com/niall-horan-tickets/seattle-washington-climate-pledge-arena-2027-05-27-7-30-pm/concert/18235558 | - |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | carly-rae-jepsen | verify (applied) | 18639058 | https://seatgeek.com/carly-rae-jepsen-tickets/ottawa-canada-history-ottawa-2027-05-28-7-30-pm/concert/18639058 | - |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | fkj | verify (applied) | 18281790 | https://seatgeek.com/fkj-tickets/toronto-canada-history-2027-05-28-8-pm/concert/18281790 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | harry-styles | verify (applied) | 18579673 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-28-7-45-pm/concert/18579673 | - |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | a-perfect-circle | verify (applied) | 18632545 | https://seatgeek.com/a-perfect-circle-tickets/west-valley-city-utah-maverik-center-2027-05-28-7-30-pm/concert/18632545 | - |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | kenny-chesney | verify (applied) | 18591992 | https://seatgeek.com/kenny-chesney-tickets/pittsburgh-pennsylvania-acrisure-stadium-2027-05-29-4-30-pm/concert/18591992 | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | luke-combs | verify (applied) | 18493413 | https://seatgeek.com/luke-combs-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-05-29-5-20-pm/concert/18493413 | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | metallica | verify (applied) | 18595091 | https://seatgeek.com/metallica-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-29-6-pm/concert/18595091 | - |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | zach-bryan | verify (applied) | 18686629 | https://seatgeek.com/zach-bryan-tickets/atlanta-georgia-mercedes-benz-stadium-2027-05-29-7-pm/concert/18686629 | - |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | carly-rae-jepsen | verify (applied) | 18639059 | https://seatgeek.com/carly-rae-jepsen-tickets/montreal-canada-mtelus-2027-05-29-7-30-pm/concert/18639059 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | harry-styles | verify (applied) | 18579687 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-29-7-45-pm/concert/18579687 | - |
| tm-flans-2027-houston-g5diz_k6-kevr | flans | verify (applied) | 18612653 | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | niall-horan | verify (applied) | 18235566 | https://seatgeek.com/niall-horan-tickets/vancouver-canada-rogers-arena-2027-05-29-7-30-pm/concert/18235566 | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | flans | verify (applied) | 18613121 | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 | - |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | a-perfect-circle | verify (applied) | 18632547 | https://seatgeek.com/a-perfect-circle-tickets/seattle-washington-climate-pledge-arena-2027-05-30-7-30-pm/concert/18632547 | - |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | fkj | verify (applied) | 18281480 | https://seatgeek.com/fkj-tickets/montreal-canada-mtelus-2027-05-31-8-pm/concert/18281480 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | harry-styles | verify (applied) | 18593728 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-05-31-7-45-pm/concert/18593728 | - |
| tm-fkj-2027-boston-vvg17z_5ryet2j | fkj | verify (applied) | 18281797 | https://seatgeek.com/fkj-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-06-01-8-pm/concert/18281797 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | a-perfect-circle | verify (applied) | 18632548 | https://seatgeek.com/a-perfect-circle-tickets/portland-oregon-veterans-memorial-coliseum-2-2027-06-01-7-30-pm/concert/18632548 | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | hazlett | verify (applied) | 18311898 | https://seatgeek.com/hazlett-tickets/san-francisco-california-august-hall-2027-06-01-8-pm/concert/18311898 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | zach-bryan | verify (applied) | 18686638 | https://seatgeek.com/zach-bryan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-02-7-pm/concert/18686638 | - |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | tommy-emmanuel | verify (applied) | 18703617 | https://seatgeek.com/tommy-emmanuel-tickets/virginia-beach-virginia-sandler-center-for-the-performing-arts-2027-06-02-7-30-pm/concert/18703617 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | fkj | verify (applied) | 18281671 | https://seatgeek.com/fkj-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-06-03-8-pm/concert/18281671 | - |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | riley-green | verify (applied) | 18626534 | https://seatgeek.com/riley-green-tickets/brandon-mississippi-brandon-amphitheater-2027-06-03-7-pm/concert/18626534 | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | def-leppard | verify (applied) | 18662428 | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 | - |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | the-airborne-toxic-event | verify (applied) | 18251596 | https://seatgeek.com/the-airborne-toxic-event-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-06-03-7-pm/concert/18251596 | - |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | a-perfect-circle | verify (applied) | 18632549 | https://seatgeek.com/a-perfect-circle-tickets/reno-nevada-grand-sierra-resort-2027-06-03-8-pm/concert/18632549 | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | flans | verify (applied) | 18612662 | https://seatgeek.com/flans-tickets/san-jose-california-san-jose-civic-2027-06-03-8-pm/concert/18612662 | - |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | fkj | verify (applied) | 18281667 | https://seatgeek.com/fkj-tickets/brooklyn-new-york-brooklyn-paramount-2027-06-04-8-pm/concert/18281667 | - |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | riley-green | verify (applied) | 18626535 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-04-7-pm/concert/18626535 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | harry-styles | verify (applied) | 18592375 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-04-7-45-pm/concert/18592375 | - |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | a-perfect-circle | verify (applied) | 18632551 | https://seatgeek.com/a-perfect-circle-tickets/daly-city-california-cow-palace-daly-city-2027-06-04-7-pm/concert/18632551 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | kenny-chesney | verify (applied) | 18591993 | https://seatgeek.com/kenny-chesney-tickets/ames-iowa-midamerican-energy-field-at-jack-trice-stadium-2027-06-05-4-30-pm/concert/18591993 | - |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | metallica | verify (applied) | 18595098 | https://seatgeek.com/metallica-tickets/indianapolis-indiana-lucas-oil-stadium-2027-06-05-6-pm/concert/18595098 | - |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | luke-combs | verify (applied) | 18493415 | https://seatgeek.com/luke-combs-tickets/vancouver-canada-bc-place-stadium-2027-06-05-5-20-pm/concert/18493415 | - |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | riley-green | verify (applied) | 18638997 | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-05-7-pm/concert/18638997 | - |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | def-leppard | verify (applied) | 18662432 | https://seatgeek.com/def-leppard-tickets/milwaukee-wisconsin-fiserv-forum-2027-06-05-7-pm/concert/18662432 | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | harry-styles | verify (applied) | 18592376 | https://seatgeek.com/harry-styles-tickets/chicago-illinois-soldier-field-2027-06-05-7-45-pm/concert/18592376 | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | the-airborne-toxic-event | verify (applied) | 18408894 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-diego-california-humphreys-concerts-by-the-bay-2027-06-05-7-30-pm/concert/18408894 | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | hazlett | verify (applied) | 18312174 | https://seatgeek.com/hazlett-tickets/phoenix-arizona-the-van-buren-2027-06-05-8-pm/concert/18312174 | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | the-airborne-toxic-event | verify (applied) | 18252665 | https://seatgeek.com/the-airborne-toxic-event-tickets/phoenix-arizona-the-van-buren-2027-06-06-7-30-pm/concert/18252665 | - |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | fkj | verify (applied) | 18281742 | https://seatgeek.com/fkj-tickets/washington-district-of-columbia-the-anthem-dc-2027-06-07-7-30-pm/concert/18281742 | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | def-leppard | verify (applied) | 18662434 | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 | - |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | metallica | verify (applied) | 18595100 | https://seatgeek.com/metallica-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-08-6-pm/concert/18595100 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | a-perfect-circle | verify (applied) | 18632556 | https://seatgeek.com/a-perfect-circle-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-06-08-8-pm/concert/18632556 | - |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | def-leppard | verify (applied) | 18662436 | https://seatgeek.com/def-leppard-tickets/louisville-kentucky-kfc-yum-center-2027-06-09-7-pm/concert/18662436 | - |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | fkj | verify (applied) | 18281290 | https://seatgeek.com/fkj-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-06-09-8-pm/concert/18281290 | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | the-airborne-toxic-event | verify (applied) | 18252184 | https://seatgeek.com/the-airborne-toxic-event-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-06-09-7-pm/concert/18252184 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | a-perfect-circle | verify (applied) | 18632558 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-10-8-pm/concert/18632558 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | riley-green | verify (applied) | 18626560 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-11-7-pm/concert/18626560 | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | def-leppard | verify (applied) | 18662435 | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 | - |
| tm-fkj-2027-houston-g5diz_5msvufk | fkj | verify (applied) | 18281428 | https://seatgeek.com/fkj-tickets/houston-texas-bayou-music-center-2027-06-11-8-pm/concert/18281428 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | a-perfect-circle | verify (applied) | 18632560 | https://seatgeek.com/a-perfect-circle-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-06-11-8-pm/concert/18632560 | - |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | kenny-chesney | verify (applied) | 18591995 | https://seatgeek.com/kenny-chesney-tickets/philadelphia-pennsylvania-lincoln-financial-field-2027-06-12-4-30-pm/concert/18591995 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | riley-green | verify (applied) | 18638999 | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-12-7-pm/concert/18638999 | - |
| tm-hazlett-2027-austin-g5diz_kepkpyq | hazlett | verify (applied) | 18311909 | https://seatgeek.com/hazlett-tickets/austin-texas-scoot-inn-2027-06-12-7-pm/concert/18311909 | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | luke-combs | verify (applied) | 18493400 | https://seatgeek.com/luke-combs-tickets/boise-idaho-albertsons-stadium-2027-06-12-5-45-pm/concert/18493400 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | def-leppard | verify (applied) | 18662437 | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | a-perfect-circle | verify (applied) | 18632561 | https://seatgeek.com/a-perfect-circle-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-06-13-7-30-pm/concert/18632561 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | fkj | verify (applied) | 18281495 | https://seatgeek.com/fkj-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-06-14-8-pm/concert/18281495 | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | metallica | verify (applied) | 18595103 | https://seatgeek.com/metallica-tickets/cleveland-ohio-huntington-bank-field-2027-06-15-6-pm/concert/18595103 | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | the-airborne-toxic-event | verify (applied) | 18252158 | https://seatgeek.com/the-airborne-toxic-event-tickets/sacramento-california-ace-of-spades-2027-06-15-7-pm/concert/18252158 | - |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | lizzy-mcalpine | verify (applied) | 18619440 | https://seatgeek.com/lizzy-mcalpine-tickets/nashville-tennessee-bridgestone-arena-2027-06-16-7-pm/concert/18619440 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | def-leppard | verify (applied) | 18662442 | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | the-airborne-toxic-event | verify (applied) | 18251563 | https://seatgeek.com/the-airborne-toxic-event-tickets/los-angeles-california-the-wiltern-2027-06-17-7-pm/concert/18251563 | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | lizzy-mcalpine | verify (applied) | 18619442 | https://seatgeek.com/lizzy-mcalpine-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-18-7-pm/concert/18619442 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | riley-green | verify (applied) | 18626536 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-18-7-pm/concert/18626536 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | kenny-chesney | verify (applied) | 18592002 | https://seatgeek.com/kenny-chesney-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-19-4-30-pm/concert/18592002 | - |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | riley-green | verify (applied) | 18639001 | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-19-7-pm/concert/18639001 | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | def-leppard | verify (applied) | 18662443 | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 | - |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | luke-combs | verify (applied) | 18493411 | https://seatgeek.com/luke-combs-tickets/denver-colorado-empower-field-at-mile-high-2027-06-19-5-45-pm/concert/18493411 | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | metallica | verify (applied) | 18595107 | https://seatgeek.com/metallica-tickets/salt-lake-city-utah-rice-eccles-stadium-2027-06-19-6-pm/concert/18595107 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | lizzy-mcalpine | verify (applied) | 18619443 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-20-7-pm/concert/18619443 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | lizzy-mcalpine | verify (applied) | 18637280 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-21-7-pm/concert/18637280 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | def-leppard | verify (applied) | 18662446 | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | lizzy-mcalpine | verify (applied) | 18619444 | https://seatgeek.com/lizzy-mcalpine-tickets/new-york-new-york-madison-square-garden-2027-06-24-7-pm/concert/18619444 | - |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | riley-green | verify (applied) | 18626537 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-25-7-pm/concert/18626537 | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | lizzy-mcalpine | verify (applied) | 18619445 | https://seatgeek.com/lizzy-mcalpine-tickets/columbia-maryland-merriweather-post-pavilion-2027-06-25-7-pm/concert/18619445 | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | def-leppard | verify (applied) | 18662447 | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 | - |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | yacht-rock-revue | verify (applied) | 18587856 | https://seatgeek.com/yacht-rock-revue-tickets/chicago-illinois-the-salt-shed-outdoors-2027-06-25-6-30-pm/concert/18587856 | - |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | zac-brown-band | verify (applied) | 18571701 | https://seatgeek.com/zac-brown-band-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-06-25-7-pm/concert/18571701 | - |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | riley-green | verify (applied) | 18639003 | https://seatgeek.com/riley-green-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-26-7-pm/concert/18639003 | - |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | kenny-chesney | verify (applied) | 18592003 | https://seatgeek.com/kenny-chesney-tickets/chicago-illinois-soldier-field-2027-06-26-4-30-pm/concert/18592003 | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | luke-combs | verify (applied) | 18493412 | https://seatgeek.com/luke-combs-tickets/san-diego-california-petco-park-2027-06-26-5-45-pm/concert/18493412 | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | lizzy-mcalpine | verify (applied) | 18619449 | https://seatgeek.com/lizzy-mcalpine-tickets/toronto-canada-scotiabank-arena-2027-06-27-7-pm/concert/18619449 | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | def-leppard | verify (applied) | 18662449 | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 | - |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | lizzy-mcalpine | verify (applied) | 18619452 | https://seatgeek.com/lizzy-mcalpine-tickets/chicago-illinois-united-center-2027-06-29-7-pm/concert/18619452 | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | def-leppard | verify (applied) | 18662452 | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | def-leppard | verify (applied) | 18662454 | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | lizzy-mcalpine | verify (applied) | 18619454 | https://seatgeek.com/lizzy-mcalpine-tickets/austin-texas-moody-center-atx-2027-07-02-7-pm/concert/18619454 | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | greta-van-fleet | verify (applied) | 18642001 | https://seatgeek.com/greta-van-fleet-tickets/vancouver-canada-rogers-arena-2027-07-05-7-pm/concert/18642001 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | greta-van-fleet | verify (applied) | 18642002 | https://seatgeek.com/greta-van-fleet-tickets/edmonton-canada-rogers-place-2027-07-07-7-pm/concert/18642002 | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | greta-van-fleet | verify (applied) | 18642003 | https://seatgeek.com/greta-van-fleet-tickets/calgary-canada-scotiabank-saddledome-2027-07-08-7-pm/concert/18642003 | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | lizzy-mcalpine | verify (applied) | 18619456 | https://seatgeek.com/lizzy-mcalpine-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2027-07-09-6-30-pm/concert/18619456 | - |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | kenny-chesney | verify (applied) | 18592004 | https://seatgeek.com/kenny-chesney-tickets/milwaukee-wisconsin-american-family-field-2027-07-10-4-30-pm/concert/18592004 | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | greta-van-fleet | verify (applied) | 18642007 | https://seatgeek.com/greta-van-fleet-tickets/winnipeg-canada-canada-life-centre-2027-07-10-7-pm/concert/18642007 | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | lizzy-mcalpine | verify (applied) | 18619461 | https://seatgeek.com/lizzy-mcalpine-tickets/los-angeles-california-forum-23-2027-07-10-7-pm/concert/18619461 | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | lizzy-mcalpine | verify (applied) | 18619460 | https://seatgeek.com/lizzy-mcalpine-tickets/san-francisco-california-chase-center-2027-07-13-7-pm/concert/18619460 | - |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | bon-jovi | verify (applied) | 18696568 | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 | - |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | riley-green | verify (applied) | 18626571 | https://seatgeek.com/riley-green-tickets/syracuse-new-york-empower-fcu-amphitheater-at-lakeview-2027-07-15-7-pm/concert/18626571 | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | lizzy-mcalpine | verify (applied) | 18619462 | https://seatgeek.com/lizzy-mcalpine-tickets/portland-oregon-moda-center-2027-07-15-7-pm/concert/18619462 | - |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | slipknot | verify (applied) | 18626597 | https://seatgeek.com/slipknot-tickets/washington-district-of-columbia-nationals-park-2027-07-16-6-30-pm/concert/18626597 | - |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | greta-van-fleet | verify (applied) | 18642013 | https://seatgeek.com/greta-van-fleet-tickets/columbus-ohio-nationwide-arena-2027-07-16-7-pm/concert/18642013 | - |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | riley-green | verify (applied) | 18626541 | https://seatgeek.com/riley-green-tickets/allentown-pennsylvania-ppl-center-2027-07-16-7-pm/concert/18626541 | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | leon-bridges | verify (applied) | 18662695 | https://seatgeek.com/leon-bridges-tickets/charlotte-north-carolina-skyla-credit-union-amphitheatre-2027-07-16-7-30-pm/concert/18662695 | - |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | kenny-chesney | verify (applied) | 18592005 | https://seatgeek.com/kenny-chesney-tickets/denver-colorado-empower-field-at-mile-high-2027-07-17-4-30-pm/concert/18592005 | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | greta-van-fleet | verify (applied) | 18642015 | https://seatgeek.com/greta-van-fleet-tickets/noblesville-indiana-ruoff-music-center-2027-07-17-7-pm/concert/18642015 | - |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | leon-bridges | verify (applied) | 18662694 | https://seatgeek.com/leon-bridges-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-07-17-8-pm/concert/18662694 | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | lizzy-mcalpine | verify (applied) | 18619466 | https://seatgeek.com/lizzy-mcalpine-tickets/seattle-washington-climate-pledge-arena-2027-07-17-7-pm/concert/18619466 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | greta-van-fleet | verify (applied) | 18642014 | https://seatgeek.com/greta-van-fleet-tickets/raleigh-north-carolina-lenovo-center-2027-07-20-7-pm/concert/18642014 | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | zach-bryan | verify (applied) | 18686642 | https://seatgeek.com/zach-bryan-tickets/inglewood-california-sofi-stadium-2027-07-20-7-pm/concert/18686642 | - |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | slipknot | verify (applied) | 18626589 | https://seatgeek.com/slipknot-tickets/montreal-canada-parc-jean-drapeau-2027-07-21-6-30-pm/concert/18626589 | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | greta-van-fleet | verify (applied) | 18642019 | https://seatgeek.com/greta-van-fleet-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-21-7-pm/concert/18642019 | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | leon-bridges | verify (applied) | 18662705 | https://seatgeek.com/leon-bridges-tickets/wilmington-north-carolina-live-oak-bank-pavilion-2027-07-21-7-pm/concert/18662705 | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | bon-jovi | verify (applied) | 18696570 | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | riley-green | verify (applied) | 18626543 | https://seatgeek.com/riley-green-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-22-7-pm/concert/18626543 | - |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | slipknot | verify (applied) | 18626595 | https://seatgeek.com/slipknot-tickets/toronto-canada-rogers-stadium-toronto-2027-07-23-6-30-pm/concert/18626595 | - |
| tm-the-red-clay-strays-2027-bangor-vv1f7z_kqaonzdc55 | the-red-clay-strays | verify (applied) | 18639094 | https://seatgeek.com/the-red-clay-strays-tickets/bangor-maine-maine-savings-amphitheater-2027-07-23-7-pm/concert/18639094 | - |
| tm-greta-van-fleet-2027-hershey-vv17fz_kgkdofs3p | greta-van-fleet | verify (applied) | 18642020 | https://seatgeek.com/greta-van-fleet-tickets/hershey-pennsylvania-giant-center-2027-07-23-7-pm/concert/18642020 | - |
| tm-riley-green-2027-bethel-k7vgf_kkxvsto | riley-green | verify (applied) | 18626545 | https://seatgeek.com/riley-green-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-23-7-pm/concert/18626545 | - |
| tm-leon-bridges-2027-columbia-1avfz_fqmqezd586 | leon-bridges | verify (applied) | 18662706 | https://seatgeek.com/leon-bridges-tickets/columbia-maryland-merriweather-post-pavilion-2027-07-23-7-pm/concert/18662706 | - |
| tm-kenny-chesney-2027-kansas-city-vv1akzkfxgkdkijos | kenny-chesney | verify (applied) | 18592006 | https://seatgeek.com/kenny-chesney-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-07-24-4-30-pm/concert/18592006 | - |
| tm-the-red-clay-strays-2027-gilford-vv177z_kgklli63o | the-red-clay-strays | verify (applied) | 18639095 | https://seatgeek.com/the-red-clay-strays-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-24-7-pm/concert/18639095 | - |
| tm-greta-van-fleet-2027-uncasville-g5vvz_kwzs711 | greta-van-fleet | verify (applied) | 18642023 | https://seatgeek.com/greta-van-fleet-tickets/uncasville-connecticut-mohegan-sun-arena-2027-07-24-7-pm/concert/18642023 | - |
| tm-riley-green-2027-mansfield-vv1avzkfwgke0hynm | riley-green | verify (applied) | 18626547 | https://seatgeek.com/riley-green-tickets/mansfield-massachusetts-xfinity-center-ma-2027-07-24-7-pm/concert/18626547 | - |
| tm-leon-bridges-2027-boston-vv177z_kgkikdrri | leon-bridges | verify (applied) | 18662708 | https://seatgeek.com/leon-bridges-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-07-24-8-pm/concert/18662708 | - |
| tm-zach-bryan-2027-seattle-vvg1hz_fytloed | zach-bryan | verify (applied) | 18686643 | https://seatgeek.com/zach-bryan-tickets/seattle-washington-lumen-field-2027-07-24-7-pm/concert/18686643 | - |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | slipknot | verify (applied) | 18626573 | https://seatgeek.com/slipknot-tickets/chicago-illinois-soldier-field-2027-07-25-6-30-pm/concert/18626573 | - |
| tm-greta-van-fleet-2027-gilford-vv177z_kgkni4das | greta-van-fleet | verify (applied) | 18642025 | https://seatgeek.com/greta-van-fleet-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-26-7-pm/concert/18642025 | - |
| tm-zach-bryan-2027-vancouver-1k78vp4fgacgpjm | zach-bryan | verify (applied) | 18711212 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-27-7-pm/concert/18711212 | - |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | slipknot | verify (applied) | 18626575 | https://seatgeek.com/slipknot-tickets/hershey-pennsylvania-hersheypark-stadium-2027-07-28-6-30-pm/concert/18626575 | - |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | bon-jovi | verify (applied) | 18696567 | https://seatgeek.com/bon-jovi-tickets/foxborough-massachusetts-gillette-stadium-2027-07-28-7-pm/concert/18696567 | - |
| tm-greta-van-fleet-2027-laval-1ad7z_kgksakup4 | greta-van-fleet | verify (applied) | 18642026 | https://seatgeek.com/greta-van-fleet-tickets/laval-canada-place-bell-2027-07-28-7-pm/concert/18642026 | - |
| tm-leon-bridges-2027-philadelphia-vv17fz_kgkbngqe2 | leon-bridges | verify (applied) | 18662710 | https://seatgeek.com/leon-bridges-tickets/philadelphia-pennsylvania-td-pavilion-at-the-mann-center-2027-07-28-7-30-pm/concert/18662710 | - |
| tm-zach-bryan-2027-vancouver-1av7z_fgks885w5 | zach-bryan | verify (applied) | 18686647 | https://seatgeek.com/zach-bryan-tickets/vancouver-canada-bc-place-stadium-2027-07-28-7-pm/concert/18686647 | - |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | the-red-clay-strays | verify (applied) | 18639096 | https://seatgeek.com/the-red-clay-strays-tickets/canandaigua-new-york-constellation-brands-marvin-sands-performing-arts-center-cmac-2027-07-29-7-pm/concert/18639096 | - |
| tm-greta-van-fleet-2027-toronto-1avzz_kgkswyehx | greta-van-fleet | verify (applied) | 18642028 | https://seatgeek.com/greta-van-fleet-tickets/toronto-canada-rbc-amphitheatre-2027-07-29-7-pm/concert/18642028 | - |
| tm-riley-green-2027-evansville-vv16azkfwxpza8acgv | riley-green | verify (applied) | 18626548 | https://seatgeek.com/riley-green-tickets/evansville-indiana-ford-center-in-2027-07-29-7-pm/concert/18626548 | - |
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | riley-green | verify (applied) | 18626549 | https://seatgeek.com/riley-green-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2027-07-30-7-pm/concert/18626549 | - |
| tm-kenny-chesney-2027-atlanta-vvg1zz_3x03by9 | kenny-chesney | verify (applied) | 18592008 | https://seatgeek.com/kenny-chesney-tickets/atlanta-georgia-mercedes-benz-stadium-2027-07-31-4-30-pm/concert/18592008 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | the-red-clay-strays | verify (applied) | 18639097 | https://seatgeek.com/the-red-clay-strays-tickets/clarkston-michigan-pine-knob-music-theatre-2027-07-31-7-pm/concert/18639097 | - |
| tm-greta-van-fleet-2027-grand-rapids-vv17oz_kgkwlsfog | greta-van-fleet | verify (applied) | 18642031 | https://seatgeek.com/greta-van-fleet-tickets/grand-rapids-acrisure-amphitheater-2027-07-31-7-pm/concert/18642031 | - |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | riley-green | verify (applied) | 18626554 | https://seatgeek.com/riley-green-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-31-7-pm/concert/18626554 | - |
| tm-zach-bryan-2027-edmonton-16v7z_43bg7l9tm | zach-bryan | verify (applied) | 18711213 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-07-31-6-30-pm/concert/18711213 | - |
| tm-zach-bryan-2027-edmonton-1av7z_fgkw2fvlh | zach-bryan | verify (applied) | 18686646 | https://seatgeek.com/zach-bryan-tickets/edmonton-canada-commonwealth-stadium-edmonton-2027-08-01-6-30-pm/concert/18686646 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | bon-jovi | verify (applied) | 18696569 | https://seatgeek.com/bon-jovi-tickets/toronto-canada-rogers-stadium-toronto-2027-08-04-6-30-pm/concert/18696569 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-sienna-spiro-2027-austin-g5diz_47ytekn | sienna-spiro | verify (applied) | 18702006 | https://seatgeek.com/sienna-spiro-tickets/austin-texas-moody-amphitheater-2027-08-05-7-pm/concert/18702006 | - |
| tm-slipknot-2027-houston-g5diz_kx0z68q | slipknot | verify (applied) | 18626578 | https://seatgeek.com/slipknot-tickets/houston-texas-daikin-park-2027-08-06-6-30-pm/concert/18626578 | - |
| tm-kenny-chesney-2027-east-rutherford-k7vgf_3cwtd0z | kenny-chesney | verify (applied) | 18592014 | https://seatgeek.com/kenny-chesney-tickets/east-rutherford-new-jersey-metlife-stadium-2027-08-07-4-30-pm/concert/18592014 | - |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | slipknot | verify (applied) | 18626584 | https://seatgeek.com/slipknot-tickets/commerce-city-colorado-dick-s-sporting-goods-park-2027-08-09-6-30-pm/concert/18626584 | - |
| tm-oasis-2027-foxborough-vv1avzkftgkehnj-e | oasis | verify (applied) | 18589077 | https://seatgeek.com/oasis-tickets/foxborough-massachusetts-gillette-stadium-2027-08-10-7-pm/concert/18589077 | - |
| tm-sienna-spiro-2027-washington-1avfz_fgksa-bdm | sienna-spiro | verify (applied) | 18702008 | https://seatgeek.com/sienna-spiro-tickets/washington-district-of-columbia-the-anthem-dc-2027-08-12-7-pm/concert/18702008 | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | the-red-clay-strays | verify (applied) | 18639104 | https://seatgeek.com/the-red-clay-strays-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-08-12-7-pm/concert/18639104 | - |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | leon-bridges | verify (applied) | 18662714 | https://seatgeek.com/leon-bridges-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-12-7-pm/concert/18662714 | - |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | slipknot | verify (applied) | 18626585 | https://seatgeek.com/slipknot-tickets/inglewood-california-sofi-stadium-2027-08-13-6-30-pm/concert/18626585 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-kenny-chesney-2027-detroit-vv17oz_8gkmnwpji | kenny-chesney | verify (applied) | 18592016 | https://seatgeek.com/kenny-chesney-tickets/detroit-michigan-ford-field-2027-08-14-4-30-pm/concert/18592016 | - |
| tm-sienna-spiro-2027-philadelphia-vv17fz_fgkuhzdr4 | sienna-spiro | verify (applied) | 18702017 | https://seatgeek.com/sienna-spiro-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-08-14-7-pm/concert/18702017 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-sienna-spiro-2027-boston-vv177z_fgkd_e0km | sienna-spiro | verify (applied) | 18702018 | https://seatgeek.com/sienna-spiro-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-08-15-7-pm/concert/18702018 | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46da3nv | sienna-spiro | verify (applied) | 18702019 | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-radio-city-music-hall-2027-08-17-8-pm/concert/18702019 | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | leon-bridges | verify (applied) | 18662721 | https://seatgeek.com/leon-bridges-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-08-17-7-30-pm/concert/18662721 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46d6wnd | sienna-spiro | verify (applied) | 18703816 | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-radio-city-music-hall-2027-08-18-8-pm/concert/18703816 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | leon-bridges | verify (applied) | 18662723 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-18-7-30-pm/concert/18662723 | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | leon-bridges | verify (applied) | 18662724 | https://seatgeek.com/leon-bridges-tickets/calgary-canada-grey-eagle-event-centre-2027-08-19-7-30-pm/concert/18662724 | - |
| tm-kenny-chesney-2027-charlotte-g5evz_3c19bfo | kenny-chesney | verify (applied) | 18592015 | https://seatgeek.com/kenny-chesney-tickets/charlotte-north-carolina-bank-of-america-stadium-2027-08-21-4-30-pm/concert/18592015 | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | the-red-clay-strays | verify (applied) | 18639110 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-21-6-30-pm/concert/18639110 | - |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | leon-bridges | verify (applied) | 18662725 | https://seatgeek.com/leon-bridges-tickets/bonner-montana-kettlehouse-amphitheater-2027-08-21-8-pm/concert/18662725 | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | the-red-clay-strays | verify (applied) | 18639113 | https://seatgeek.com/the-red-clay-strays-tickets/boise-idaho-extramile-arena-2027-08-22-7-pm/concert/18639113 | - |
| tm-sienna-spiro-2027-detroit-vv1afzk48gkebo40x | sienna-spiro | verify (applied) | 18702024 | https://seatgeek.com/sienna-spiro-tickets/detroit-michigan-fox-theatre-detroit-2027-08-23-7-pm/concert/18702024 | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlgu6j | sienna-spiro | verify (applied) | 18702029 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-the-chicago-theatre-2027-08-25-7-pm/concert/18702029 | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | leon-bridges | verify (applied) | 18662729 | https://seatgeek.com/leon-bridges-tickets/waukee-iowa-vibrant-music-hall-2027-08-25-7-30-pm/concert/18662729 | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | leon-bridges | verify (applied) | 18662730 | https://seatgeek.com/leon-bridges-tickets/indianapolis-indiana-everwise-amphitheater-at-white-river-state-park-2027-08-26-7-30-pm/concert/18662730 | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlcj6o | sienna-spiro | verify (applied) | 18702030 | https://seatgeek.com/sienna-spiro-tickets/chicago-illinois-the-chicago-theatre-2027-08-26-7-pm/concert/18702030 | - |
| tm-kenny-chesney-2027-foxborough-vv1avzkfxgkdu8gfo | kenny-chesney | verify (applied) | 18592017 | https://seatgeek.com/kenny-chesney-tickets/foxborough-massachusetts-gillette-stadium-2027-08-28-4-30-pm/concert/18592017 | - |
| tm-sienna-spiro-2027-minneapolis-vv17bz_fgktexhi7 | sienna-spiro | verify (applied) | 18702033 | https://seatgeek.com/sienna-spiro-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-08-28-7-pm/concert/18702033 | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | verify (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-sienna-spiro-2027-seattle-vvg1hz_4ediyof | sienna-spiro | verify (applied) | 18702035 | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-wamu-theater-2027-09-02-7-pm/concert/18702035 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-sienna-spiro-2027-vancouver-1av7z_fgkxqzaez | sienna-spiro | verify (applied) | 18702036 | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-09-04-7-pm/concert/18702036 | - |
| tm-sienna-spiro-2027-berkeley-g5vyz_fbwbrn7 | sienna-spiro | verify (applied) | 18702041 | https://seatgeek.com/sienna-spiro-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-09-07-7-pm/concert/18702041 | - |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | the-red-clay-strays | verify (applied) | 18639117 | https://seatgeek.com/the-red-clay-strays-tickets/rogers-arkansas-walmart-amp-2027-09-09-7-pm/concert/18639117 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | leon-bridges | verify (applied) | 18662733 | https://seatgeek.com/leon-bridges-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-09-15-7-30-pm/concert/18662733 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | leon-bridges | verify (applied) | 18662735 | https://seatgeek.com/leon-bridges-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-09-17-7-30-pm/concert/18662735 | - |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | the-red-clay-strays | verify (applied) | 18639123 | https://seatgeek.com/the-red-clay-strays-tickets/corpus-christi-texas-hilliard-center-arena-2027-09-18-7-pm/concert/18639123 | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | the-red-clay-strays | verify (applied) | 18639125 | https://seatgeek.com/the-red-clay-strays-tickets/austin-texas-moody-center-atx-2027-09-19-7-pm/concert/18639125 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-leon-bridges-2027-rogers-g5viz_kpps1qm | leon-bridges | verify (applied) | 18662739 | https://seatgeek.com/leon-bridges-tickets/rogers-arkansas-walmart-amp-2027-09-23-7-30-pm/concert/18662739 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | eros-ramazzotti | verify (applied) | 17481793 | https://seatgeek.com/eros-ramazzotti-tickets/toronto-canada-coca-cola-coliseum-2027-09-24-8-pm/concert/17481793 | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | fontaines-d-c | verify (applied) | 18642838 | https://seatgeek.com/fontaines-d-c-tickets/toronto-canada-scotiabank-arena-2027-09-26-8-pm/concert/18642838 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-leon-bridges-2027-phoenix-1a_zk4kgkdlzjqa | leon-bridges | verify (applied) | 18662746 | https://seatgeek.com/leon-bridges-tickets/phoenix-arizona-arizona-financial-theatre-2027-09-29-7-30-pm/concert/18662746 | - |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | fontaines-d-c | verify (applied) | 18642843 | https://seatgeek.com/fontaines-d-c-tickets/columbia-maryland-merriweather-post-pavilion-2027-09-30-7-30-pm/concert/18642843 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-hilary-duff-2027-orlando-1axzkfugkdwff3y | hilary-duff | verify (applied) | 18613393 | https://seatgeek.com/hilary-duff-tickets/orlando-florida-kia-center-2027-10-02-7-30-pm/concert/18613393 | - |
| tm-eros-ramazzotti-2027-new-york-g5dyz_ou7is1y | eros-ramazzotti | verify (applied) | 18551701 | https://seatgeek.com/eros-ramazzotti-tickets/new-york-new-york-radio-city-music-hall-2027-10-02-8-pm/concert/18551701 | - |
| tm-hilary-duff-2027-raleigh-g5evz_kpqg6lj | hilary-duff | verify (applied) | 18613392 | https://seatgeek.com/hilary-duff-tickets/raleigh-north-carolina-lenovo-center-2027-10-04-7-30-pm/concert/18613392 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-eros-ramazzotti-2027-rosemont-vv1a7zk1egkeidoc0 | eros-ramazzotti | verify (applied) | 17481908 | https://seatgeek.com/eros-ramazzotti-tickets/rosemont-illinois-rosemont-theatre-2027-10-05-8-pm/concert/17481908 | - |
| tm-hilary-duff-2027-baltimore-1a4zkfwgket7cfe | hilary-duff | verify (applied) | 18613391 | https://seatgeek.com/hilary-duff-tickets/baltimore-maryland-cfg-bank-arena-2027-10-06-7-30-pm/concert/18613391 | - |
| tm-hilary-duff-2027-uncasville-g5vvz_k5dwnjz | hilary-duff | verify (applied) | 18613390 | https://seatgeek.com/hilary-duff-tickets/uncasville-connecticut-mohegan-sun-arena-2027-10-08-7-30-pm/concert/18613390 | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | fontaines-d-c | verify (applied) | 18642849 | https://seatgeek.com/fontaines-d-c-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2027-10-08-8-pm/concert/18642849 | - |
| tm-eros-ramazzotti-2027-miami-vvg1vzbicfi7sa | eros-ramazzotti | verify (applied) | 17481804 | https://seatgeek.com/eros-ramazzotti-tickets/miami-florida-kaseya-center-2027-10-08-8-pm/concert/17481804 | - |
| tm-hilary-duff-2027-hershey-vv1aezkfugkempa0j | hilary-duff | verify (applied) | 18613394 | https://seatgeek.com/hilary-duff-tickets/hershey-pennsylvania-giant-center-2027-10-09-7-30-pm/concert/18613394 | - |
| tm-hilary-duff-2027-buffalo-k7vgf_k9lboi8 | hilary-duff | verify (applied) | 18613395 | https://seatgeek.com/hilary-duff-tickets/buffalo-new-york-keybank-center-2027-10-11-7-30-pm/concert/18613395 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-columbus-vv1kv8vpu8ga1ilbe | hilary-duff | verify (applied) | 18613402 | https://seatgeek.com/hilary-duff-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-10-15-7-30-pm/concert/18613402 | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | fontaines-d-c | verify (applied) | 18642853 | https://seatgeek.com/fontaines-d-c-tickets/inglewood-california-kia-forum-2027-10-15-7-pm/concert/18642853 | - |
| tm-hilary-duff-2027-pittsburgh-1apzkfsgkdqpqgi | hilary-duff | verify (applied) | 18613403 | https://seatgeek.com/hilary-duff-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-10-16-7-30-pm/concert/18613403 | - |
| tm-eros-ramazzotti-2027-inglewood-vvg1izbiyf5ko0 | eros-ramazzotti | verify (applied) | 17482180 | https://seatgeek.com/eros-ramazzotti-tickets/inglewood-california-youtube-theater-2027-10-16-8-pm/concert/17482180 | - |
| tm-hilary-duff-2027-san-antonio-g5diz_kh8lc6s | hilary-duff | verify (applied) | 18613404 | https://seatgeek.com/hilary-duff-tickets/san-antonio-texas-frost-bank-center-2027-11-05-7-30-pm/concert/18613404 | - |
| tm-hilary-duff-2027-fort-worth-vvg1yz_3lpl3yg | hilary-duff | verify (applied) | 18613405 | https://seatgeek.com/hilary-duff-tickets/fort-worth-texas-dickies-arena-2027-11-06-7-30-pm/concert/18613405 | - |
| tm-hilary-duff-2027-tulsa-1aozkfggkd6ydle | hilary-duff | verify (applied) | 18613406 | https://seatgeek.com/hilary-duff-tickets/tulsa-oklahoma-bok-center-2027-11-08-7-30-pm/concert/18613406 | - |
| tm-hilary-duff-2027-omaha-vv1akzkfggkdletyo | hilary-duff | verify (applied) | 18613409 | https://seatgeek.com/hilary-duff-tickets/omaha-nebraska-chi-health-center-omaha-2027-11-10-7-30-pm/concert/18613409 | - |
| tm-hilary-duff-2027-milwaukee-vv1a6zkfggkdrdjze | hilary-duff | verify (applied) | 18613414 | https://seatgeek.com/hilary-duff-tickets/milwaukee-wisconsin-fiserv-forum-2027-11-12-7-30-pm/concert/18613414 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-hilary-duff-2027-kansas-city-vv1kvovpuoga1lapx | hilary-duff | verify (applied) | 18613418 | https://seatgeek.com/hilary-duff-tickets/kansas-city-missouri-t-mobile-center-2027-11-15-7-30-pm/concert/18613418 | - |
| tm-hilary-duff-2027-denver-g5vzz_kkrpbyy | hilary-duff | verify (applied) | 18613419 | https://seatgeek.com/hilary-duff-tickets/denver-colorado-ball-arena-2027-11-17-7-30-pm/concert/18613419 | - |
| tm-hilary-duff-2027-anaheim-vv110z_kqbpjub | hilary-duff | verify (applied) | 18613420 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-20-7-30-pm/concert/18613420 | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | hilary-duff | verify (applied) | 18633659 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-21-7-30-pm/concert/18633659 | - |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | verify (applied) | 18391950 | https://seatgeek.com/trivium-tickets/royal-oak-michigan-royal-oak-music-theatre-2026-11-20-6-35-pm/concert/18391950 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | verify (applied) | 18208620 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | verify (applied) | 18147876 | https://seatgeek.com/blue-october-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-20-7-pm/concert/18147876 | - |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | los-tigres-del-norte | verify (applied) | 17573295 | https://seatgeek.com/los-tigres-del-norte-tickets/columbus-ohio-palace-theatre-columbus-2026-11-20-8-pm/concert/17573295 | - |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | zac-brown-band | verify (applied) | 18032035 | https://seatgeek.com/zac-brown-band-tickets/des-moines-iowa-casey-s-center-2026-11-20-7-pm/concert/18032035 | - |
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
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | a-boogie-wit-da-hoodie | verify (applied) | 18662770 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/orlando-florida-central-florida-fairgrounds-2026-12-05-8-pm/concert/18662770 | - |
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
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | pink-martini | verify (applied) | 18701980 | https://seatgeek.com/pink-martini-tickets/fairfax-virginia-center-for-the-arts-george-mason-university-2026-12-10-7-30-pm/concert/18701980 | - |
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
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | verify (applied) | 18668809 | https://seatgeek.com/pink-martini-tickets/boston-massachusetts-berklee-performance-center-2026-12-18-8-pm/concert/18668809 | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | a-boogie-wit-da-hoodie | verify (applied) | 18639406 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/hartford-connecticut-peoplesbank-arena-2026-12-19-8-pm/concert/18639406 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | verify (applied) | 18659747 | https://seatgeek.com/pink-martini-tickets/fort-worth-texas-bass-performance-hall-2027-01-08-7-30-pm/concert/18659747 | - |
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
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | verify (applied) | 18699569 | https://seatgeek.com/yacht-rock-revue-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-23-8-pm/concert/18699569 | - |
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
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | verify (applied) | 18696397 | https://seatgeek.com/valley-tickets/quebec-canada-grizzly-fuzz-2027-02-04-8-pm/concert/18696397 | - |
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
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | verify (applied) | 18653247 | https://seatgeek.com/blue-october-tickets/ventura-california-the-majestic-ventura-theater-2027-02-12-8-pm/concert/18653247 | - |
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
| tm-knocked-loose-2026-daly-city-g5vyz_5mdvnwz | knocked-loose | clear (applied) | - | - | stored URL failed: SeatGeek /events/18270643 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-three-days-grace-2026-peoria-vv1a6zkuppfa-ze27 | three-days-grace | verify (applied) | 17895156 | https://seatgeek.com/three-days-grace-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-03-7-pm/concert/17895156 | - |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | three-days-grace | verify (applied) | 17895157 | https://seatgeek.com/three-days-grace-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-11-04-7-pm/concert/17895157 | - |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | victoria-monet | clear (applied) | - | - | stored URL failed: venue mismatch: 'Skyla Credit Union Amphitheatre' vs 'Ovens Auditorium'; no qualifying replacement found |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | add (applied) | 18355665 | https://seatgeek.com/air-supply-tickets/easton-pennsylvania-state-theatre-easton-2026-11-06-7-30-pm/concert/18355665 | - |
| tm-three-days-grace-2026-tulsa-1aozkupgkdxuamf | three-days-grace | verify (applied) | 17895159 | https://seatgeek.com/three-days-grace-tickets/tulsa-oklahoma-bok-center-2026-11-06-7-pm/concert/17895159 | - |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-stamford-g5vvz_axiecx- | air-supply | verify (applied) | 18126968 | https://seatgeek.com/air-supply-tickets/stamford-connecticut-the-palace-theatre-stamford-2026-11-07-8-pm/concert/18126968 | - |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | three-days-grace | verify (applied) | 17895158 | https://seatgeek.com/three-days-grace-tickets/saint-louis-missouri-enterprise-center-2026-11-07-7-pm/concert/17895158 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-three-days-grace-2026-kansas-city-vv1akzkujgkeirwar | three-days-grace | verify (applied) | 17895165 | https://seatgeek.com/three-days-grace-tickets/kansas-city-missouri-t-mobile-center-2026-11-09-7-pm/concert/17895165 | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | three-days-grace | verify (applied) | 17895166 | https://seatgeek.com/three-days-grace-tickets/denver-colorado-ball-arena-2026-11-11-7-pm/concert/17895166 | - |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | add (applied) | 18734186 | https://seatgeek.com/too-many-zooz-tickets/buffalo-new-york-asbury-hall-buffalo-2026-11-13-8-pm/concert/18734186 | - |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | verify (applied) | 18637121 | https://seatgeek.com/black-stone-cherry-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-11-13-8-pm/concert/18637121 | - |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | los-tigres-del-norte | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-westbury-k7vgf_fkzchcp | air-supply | verify (applied) | 18206347 | https://seatgeek.com/air-supply-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2026-11-14-8-pm/concert/18206347 | - |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | three-days-grace | verify (applied) | 17895168 | https://seatgeek.com/three-days-grace-tickets/nampa-idaho-ford-idaho-center-2026-11-14-7-pm/concert/17895168 | - |
| tm-daniel-caesar-2026-honolulu-vvg1iz_fxhtber | daniel-caesar | verify (applied) | 18692471 | https://seatgeek.com/daniel-caesar-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-11-14-8-pm/concert/18692471 | - |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | three-days-grace | verify (applied) | 17895171 | https://seatgeek.com/three-days-grace-tickets/spokane-washington-numerica-veterans-arena-2026-11-15-7-pm/concert/17895171 | - |
| tm-daniel-caesar-2026-honolulu-vvg1iz_fxhniew | daniel-caesar | verify (applied) | 18700620 | https://seatgeek.com/daniel-caesar-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-11-15-8-pm/concert/18700620 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-three-days-grace-2026-sacramento-g5vyzbu2whwe8 | three-days-grace | verify (applied) | 17895172 | https://seatgeek.com/three-days-grace-tickets/sacramento-california-golden-1-center-2026-11-17-7-pm/concert/17895172 | - |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | jonas-brothers | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | black-stone-cherry | verify (applied) | 18637126 | https://seatgeek.com/black-stone-cherry-tickets/omaha-nebraska-the-waiting-room-omaha-2026-11-18-8-pm/concert/18637126 | - |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-orlando-z7r9jz1aazdae | air-supply | verify (applied) | 18355666 | https://seatgeek.com/air-supply-tickets/orlando-florida-dr-phillips-center-for-performing-arts-2026-11-19-8-pm/concert/18355666 | - |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Pop's Concert Venue' vs 'Pop's - Sauget'; no qualifying replacement found |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-clearwater-z7r9jz1a7paou | air-supply | add (applied) | 18289135 | https://seatgeek.com/air-supply-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-21-8-pm/concert/18289135 | - |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Fennec - Main Stage' vs 'The Fennec - Sports, Live Music, Events'; no qualifying replacement found |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2026-jacksonville-z7r9jz1a70eoz | air-supply | add (applied) | 18355667 | https://seatgeek.com/air-supply-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-11-22-7-pm/concert/18355667 | - |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'Roadrunner-Boston' vs 'TD Garden'; no qualifying replacement found |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-lexington-1avbz_kgklcscxl | black-stone-cherry | verify (applied) | 18630042 | https://seatgeek.com/black-stone-cherry-tickets/lexington-kentucky-manchester-music-hall-2026-11-27-8-pm/concert/18630042 | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'NOTO' vs 'Xfinity Mobile Arena'; no qualifying replacement found |
| tm-lord-huron-2026-nashville-z7r9jz1aazbfy | lord-huron | add (applied) | 18421956 | https://seatgeek.com/lord-huron-tickets/nashville-tennessee-ryman-auditorium-2026-12-01-8-pm/concert/18421956 | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | imagine-dragons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lord-huron-2026-detroit-z7r9jz1aazpf4 | lord-huron | verify (applied) | 18421959 | https://seatgeek.com/lord-huron-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-12-05-6-30-pm/concert/18421959 | - |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-hartford-z7r9jz1aaea0z | black-stone-cherry | verify (applied) | 18637149 | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-webster-underground-hartford-2026-12-05-8-pm/concert/18637149 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lady-a-2026-northfield-vvg1fz_gkaw2vw | lady-a | verify (applied) | 18295291 | https://seatgeek.com/lady-a-tickets/northfield-ohio-mgm-northfield-park-center-stage-2026-12-10-7-30-pm/concert/18295291 | - |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lord-huron-2026-albany-k7vgf_2d6r7wd | lord-huron | verify (applied) | 18421968 | https://seatgeek.com/lord-huron-tickets/albany-new-york-palace-theatre-albany-2026-12-11-8-pm/concert/18421968 | - |
| tm-lady-a-2026-gary-vvg1fz_5la2nke | lady-a | verify (applied) | 18295733 | https://seatgeek.com/lady-a-tickets/gary-indiana-hard-rock-live-northern-indiana-2026-12-11-7-pm/concert/18295733 | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | black-stone-cherry | verify (applied) | 18637158 | https://seatgeek.com/black-stone-cherry-tickets/columbus-ohio-the-king-of-clubs-oh-2026-12-12-5-30-pm/concert/18637158 | - |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | lady-a | verify (applied) | 18295863 | https://seatgeek.com/lady-a-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2026-12-12-7-30-pm/concert/18295863 | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lady-a-2026-new-york-g5diz_g2zkgbb | lady-a | verify (applied) | 18294956 | https://seatgeek.com/lady-a-tickets/new-york-new-york-beacon-theatre-2026-12-17-8-pm/concert/18294956 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | lord-huron | add (applied) | 18421979 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-18-8-pm/concert/18421979 | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | lady-a | verify (applied) | 18353855 | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 | - |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lady-a-2026-greensboro-g5evz_g5lge4i | lady-a | verify (applied) | 18295539 | https://seatgeek.com/lady-a-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2026-12-19-7-30-pm/concert/18295539 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | lord-huron | add (applied) | 18421980 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-19-8-pm/concert/18421980 | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | lady-a | add (applied) | 18295865 | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 | - |
| tm-the-avett-brothers-2027-asheville-g5evz_38pztce | the-avett-brothers | verify (applied) | 18580244 | https://seatgeek.com/the-avett-brothers-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2026-12-31-8-pm/concert/18580244 | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | post-malone | add (applied) | 18414663 | https://seatgeek.com/post-malone-tickets/salt-lake-city-utah-delta-center-1-2026-12-31-10-pm/concert/18414663 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | lord-huron | add (applied) | 18421984 | https://seatgeek.com/lord-huron-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2027-01-02-8-pm/concert/18421984 | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lord-huron-2027-los-angeles-vvg10z_2ug7bzu | lord-huron | verify (applied) | 18421996 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-10-8-pm/concert/18421996 | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2ugkfzf | lord-huron | verify (applied) | 18421997 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-11-8-pm/concert/18421997 | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2d_gilx | lord-huron | verify (applied) | 18484690 | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-12-6-30-pm/concert/18484690 | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Ramsey Concert Hall' vs 'Hodgson Concert Hall at the UGA Performing Arts Center'; no qualifying replacement found |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | clear (applied) | - | - | stored URL failed: venue mismatch: 'Mesa Theatre & Club' vs 'Mesa Theater'; no qualifying replacement found |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | air-supply | add (applied) | 18355670 | https://seatgeek.com/air-supply-tickets/sarasota-florida-van-wezel-performing-arts-hall-2027-01-24-7-pm/concert/18355670 | - |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Seminole Center' vs 'Seminole Casino Immokalee'; no qualifying replacement found |
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
| tm-billy-strings-2027-asheville-g5evz_omwlh3- | billy-strings | verify (applied) | 18540081 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-05-7-30-pm/concert/18540081 | - |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2027-asheville-g5evz_omwig3e | billy-strings | verify (applied) | 18540082 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-06-7-30-pm/concert/18540082 | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | air-supply | add (applied) | 18200030 | https://seatgeek.com/air-supply-tickets/wisconsin-dells-wisconsin-crystal-grand-music-theatre-2027-02-06-8-pm/concert/18200030 | - |
| tm-two-door-cinema-club-2027-hamburg-z698xzc2z16v1k_wvn | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-warsaw-z698xzqpz1kf0av8y | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2027-asheville-g5evz_omwii3v | billy-strings | verify (applied) | 18540084 | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-08-7-30-pm/concert/18540084 | - |
| tm-cage-the-elephant-2027-krakow-z698xzqpz16vup4eqe | cage-the-elephant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-kanata-1ad7z_kgkb3adut | simple-plan | verify (applied) | 18655548 | https://seatgeek.com/simple-plan-tickets/kanata-canada-canadian-tire-centre-2027-02-11-7-pm/concert/18655548 | - |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | yuridia | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-calgary-1k78vpuzga1a49u | dropkick-murphys | verify (applied) | 18633536 | https://seatgeek.com/dropkick-murphys-tickets/calgary-canada-grey-eagle-event-centre-2027-02-14-7-pm/concert/18633536 | - |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-amsterdam-z698xzbpz16vffqn4a | theory-of-a-deadman | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5kgq | barry-manilow | verify (applied) | 17637107 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-18-7-pm/concert/17637107 | - |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | foreigner | verify (applied) | 18570609 | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 | - |
| tm-cody-johnson-2027-austin-g5diz_43sxhzn | cody-johnson | verify (applied) | 18710054 | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-19-7-pm/concert/18710054 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5ugn | barry-manilow | verify (applied) | 17637109 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-19-8-pm/concert/17637109 | - |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | bullet-for-my-valentine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-saint-louis-vv1akzk4kgkdiwpu8 | nickelback | verify (applied) | 18664583 | https://seatgeek.com/nickelback-tickets/saint-louis-missouri-enterprise-center-2027-02-20-6-30-pm/concert/18664583 | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | dinosaur-jr | verify (applied) | 18540442 | https://seatgeek.com/dinosaur-jr-tickets/saint-petersburg-florida-jannus-live-2027-02-20-8-pm/concert/18540442 | - |
| tm-cody-johnson-2027-austin-g5diz_46xjfxh | cody-johnson | verify (applied) | 18701505 | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-20-7-pm/concert/18701505 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwupgi | barry-manilow | verify (applied) | 17637108 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-20-7-pm/concert/17637108 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-dawson-creek-z7r9jz1aavmfk | air-supply | verify (applied) | 18646928 | https://seatgeek.com/air-supply-tickets/dawson-creek-canada-ovintiv-events-centre-2027-02-22-7-30-pm/concert/18646928 | - |
| tm-air-supply-2027-calgary-1aozkf0gkev7qvg | air-supply | verify (applied) | 18594382 | https://seatgeek.com/air-supply-tickets/calgary-canada-grey-eagle-event-centre-2027-02-24-7-pm/concert/18594382 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dylan-scott-2027-albuquerque-g5vzz_3mo5e82 | dylan-scott | verify (applied) | 18600938 | https://seatgeek.com/dylan-scott-tickets/albuquerque-new-mexico-kiva-auditorium-at-the-albuquerque-convention-center-2027-02-25-7-30-pm/concert/18600938 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwuugv | barry-manilow | verify (applied) | 17637120 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-25-7-pm/concert/17637120 | - |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwcjgy | barry-manilow | verify (applied) | 17637121 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-26-8-pm/concert/17637121 | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jason-aldean-2027-hollywood-vvg1vz_4r1id24 | jason-aldean | verify (applied) | 18724459 | https://seatgeek.com/jason-aldean-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-27-8-pm/concert/18724459 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2kgd | barry-manilow | verify (applied) | 17637122 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-02-27-7-pm/concert/17637122 | - |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-winnipeg-1aozkftgkdfjy5c | air-supply | verify (applied) | 18593527 | https://seatgeek.com/air-supply-tickets/winnipeg-canada-canada-life-centre-2027-02-28-7-30-pm/concert/18593527 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z1kaejyfv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z16v0wbofv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-las-vegas-1ayzk4agkecv9ix | sting | verify (applied) | 18674616 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-04-8-pm/concert/18674616 | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-montreal-1aszkfugkdv84mc | dropkick-murphys | verify (applied) | 18633565 | https://seatgeek.com/dropkick-murphys-tickets/montreal-canada-l-olympia-olympia-theatre-2027-03-05-7-pm/concert/18633565 | - |
| tm-theory-of-a-deadman-2027-halifax-z7r9jz1aav0ak | theory-of-a-deadman | add (applied) | 18570534 | https://seatgeek.com/theory-of-a-deadman-tickets/halifax-canada-light-house-arts-centre-2027-03-05-8-pm/concert/18570534 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-rama-1avzz_3gkn3a6sv | air-supply | verify (applied) | 18618284 | https://seatgeek.com/air-supply-tickets/rama-canada-casino-rama-resort-2027-03-05-9-pm/concert/18618284 | - |
| tm-air-supply-2027-toronto-1avzz_3gkws1scj | air-supply | verify (applied) | 18594770 | https://seatgeek.com/air-supply-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-06-8-pm/concert/18594770 | - |
| tm-the-neighbourhood-2027-houston-z7r9jz1aa7ypb | the-neighbourhood | add (applied) | 18726903 | https://seatgeek.com/the-neighbourhood-tickets/houston-texas-toyota-center-2027-03-06-7-pm/concert/18726903 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sting-2027-las-vegas-1ayzk4agkecemih | sting | verify (applied) | 18674617 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-06-8-pm/concert/18674617 | - |
| tm-remi-wolf-2027-detroit-z7r9jz1aa7k0m | remi-wolf | verify (applied) | 18664757 | https://seatgeek.com/remi-wolf-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-03-07-7-pm/concert/18664757 | - |
| tm-air-supply-2027-windsor-1avzz_3gki_rnez | air-supply | verify (applied) | 18593816 | https://seatgeek.com/air-supply-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-07-7-pm/concert/18593816 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec79cl | sting | verify (applied) | 18674618 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-07-8-pm/concert/18674618 | - |
| tm-kaleo-2027-brussels-z698xzg2z16vjkuafp | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-brussels-z698xzg2z16v_0_u-k | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-chicago-vv1a7zk4fgkdb7-a0 | remi-wolf | verify (applied) | 18664766 | https://seatgeek.com/remi-wolf-tickets/chicago-illinois-the-salt-shed-indoors-2027-03-09-8-pm/concert/18664766 | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-chicago-vv1a7zk4fgkdbs-1k | remi-wolf | verify (applied) | 18692433 | https://seatgeek.com/remi-wolf-tickets/chicago-illinois-the-salt-shed-indoors-2027-03-10-8-pm/concert/18692433 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurynka | foreigner | verify (applied) | 18723998 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-10-8-pm/concert/18723998 | - |
| tm-sting-2027-las-vegas-1ayzk4agkecamcg | sting | verify (applied) | 18674619 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-10-8-pm/concert/18674619 | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | mico | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-rama-1a8zkfngkeitbvf | theory-of-a-deadman | verify (applied) | 18570545 | https://seatgeek.com/theory-of-a-deadman-tickets/rama-canada-casino-rama-resort-2027-03-12-9-pm/concert/18570545 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk8 | foreigner | verify (applied) | 18723999 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-12-8-pm/concert/18723999 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec6msw | sting | verify (applied) | 18674620 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-12-8-pm/concert/18674620 | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-toronto-1a8zkfngked-56c | theory-of-a-deadman | verify (applied) | 18570546 | https://seatgeek.com/theory-of-a-deadman-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-13-8-pm/concert/18570546 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurwnkf | foreigner | verify (applied) | 18724000 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-13-8-pm/concert/18724000 | - |
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
| tm-theory-of-a-deadman-2027-windsor-1avzz_ogktpe4kz | theory-of-a-deadman | verify (applied) | 18560921 | https://seatgeek.com/theory-of-a-deadman-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-17-7-pm/concert/18560921 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-san-antonio-z7r9jz1aa70ja | interpol | add (applied) | 18710345 | https://seatgeek.com/interpol-tickets/san-antonio-texas-the-espee-2027-03-18-7-30-pm/concert/18710345 | - |
| tm-kaleo-2027-warsaw-z698xzqpz1kbba-jk | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-praha-8-z698xzu0z1kauc3vb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-winnipeg-1av7z_ogkxutibu | theory-of-a-deadman | verify (applied) | 18570549 | https://seatgeek.com/theory-of-a-deadman-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-20-8-pm/concert/18570549 | - |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-regina-z7r9jz1aavxpg | theory-of-a-deadman | verify (applied) | 18570554 | https://seatgeek.com/theory-of-a-deadman-tickets/regina-canada-conexus-arts-centre-2027-03-22-8-pm/concert/18570554 | - |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-zurich-z698xzu3z16vqkfsq4 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-enoch-1aozkfngkdgjwil | theory-of-a-deadman | verify (applied) | 18570557 | https://seatgeek.com/theory-of-a-deadman-tickets/enoch-canada-river-cree-resort-casino-2027-03-24-8-pm/concert/18570557 | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-calgary-1av7z_ogkn_kbte | theory-of-a-deadman | verify (applied) | 18570558 | https://seatgeek.com/theory-of-a-deadman-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-25-8-pm/concert/18570558 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-vienna-z698xz5rz16vr81eow | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | tash-sultana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-sayreville-z7r9jz1aa70_y | interpol | add (applied) | 18710358 | https://seatgeek.com/interpol-tickets/sayreville-new-jersey-starland-ballroom-2027-03-27-8-pm/concert/18710358 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-dawson-creek-z7r9jz1aavxjp | theory-of-a-deadman | verify (applied) | 18570559 | https://seatgeek.com/theory-of-a-deadman-tickets/dawson-creek-canada-ovintiv-events-centre-2027-03-27-8-pm/concert/18570559 | - |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-berlin-z698xzc2z1ku0c686 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-vancouver-1av7z_ogknc7mrb | theory-of-a-deadman | verify (applied) | 18570564 | https://seatgeek.com/theory-of-a-deadman-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-31-8-pm/concert/18570564 | - |
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
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-san-diego-vvg1iz_4c-ppva | queens-of-the-stone-age | verify (applied) | 18709210 | https://seatgeek.com/queens-of-the-stone-age-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-01-6-30-pm/concert/18709210 | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-queens-of-the-stone-age-2027-inglewood-vv1k0z_48eg7ij9v | queens-of-the-stone-age | verify (applied) | 18709211 | https://seatgeek.com/queens-of-the-stone-age-tickets/inglewood-california-kia-forum-2027-05-02-6-30-pm/concert/18709211 | - |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |

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
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-des-moines-z7r9jz1a7pwkk | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-tampa-vvg1vz_km8pku0 | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
