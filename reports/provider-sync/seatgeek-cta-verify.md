# SeatGeek CTA verification log

Generated: 2026-10-29T23:09:42.090Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1507 (needs_recheck: 875, provenance backfill: 19, stale re-check: 1126)
- Events skipped before API checks: 392
- API calls made: 800
- Verified provenance written: 426
- URLs added: 11
- URLs corrected: 0
- URLs cleared: 11
- Provenance un-verified: 1
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 337
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | lukas-graham | verify (applied) | 18617618 | https://seatgeek.com/lukas-graham-tickets/tampa-florida-the-ritz-ybor-2027-03-05-6-pm/concert/18617618 | - |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | needtobreathe | verify (applied) | 18621543 | https://seatgeek.com/needtobreathe-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-05-7-pm/concert/18621543 | - |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | greta-van-fleet | verify (applied) | 18641971 | https://seatgeek.com/greta-van-fleet-tickets/boston-massachusetts-td-garden-2027-03-05-7-pm/concert/18641971 | - |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | nickelback | verify (applied) | 18664595 | https://seatgeek.com/nickelback-tickets/newark-new-jersey-prudential-center-2027-03-06-6-30-pm/concert/18664595 | - |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | polyphia | verify (applied) | 18312312 | https://seatgeek.com/polyphia-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-06-7-30-pm/concert/18312312 | - |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | nickelback | verify (applied) | 18664598 | https://seatgeek.com/nickelback-tickets/washington-district-of-columbia-capital-one-arena-2027-03-08-6-30-pm/concert/18664598 | - |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | greta-van-fleet | verify (applied) | 18641973 | https://seatgeek.com/greta-van-fleet-tickets/brooklyn-new-york-barclays-center-2027-03-08-7-pm/concert/18641973 | - |
| tm-nickelback-2027-boston-vv1avzk4egkdzjayi | nickelback | verify (applied) | 18664600 | https://seatgeek.com/nickelback-tickets/boston-massachusetts-td-garden-2027-03-10-6-30-pm/concert/18664600 | - |
| tm-greta-van-fleet-2027-philadelphia-1adzz_kgkv_zy6y | greta-van-fleet | verify (applied) | 18641974 | https://seatgeek.com/greta-van-fleet-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-10-7-pm/concert/18641974 | - |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | rod-stewart | verify (applied) | 18591364 | https://seatgeek.com/rod-stewart-tickets/hollywood-florida-hard-rock-live-hollywood-2027-03-12-8-pm/concert/18591364 | - |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | def-leppard | verify (applied) | 18662381 | https://seatgeek.com/def-leppard-tickets/newark-new-jersey-prudential-center-2027-03-13-7-pm/concert/18662381 | - |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | greta-van-fleet | verify (applied) | 18641983 | https://seatgeek.com/greta-van-fleet-tickets/fort-worth-texas-dickies-arena-2027-03-15-7-pm/concert/18641983 | - |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | def-leppard | verify (applied) | 18662380 | https://seatgeek.com/def-leppard-tickets/boston-massachusetts-td-garden-2027-03-17-7-pm/concert/18662380 | - |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | greta-van-fleet | verify (applied) | 18641986 | https://seatgeek.com/greta-van-fleet-tickets/anaheim-california-honda-center-2027-03-19-7-pm/concert/18641986 | - |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | jon-pardi | verify (applied) | 18652960 | https://seatgeek.com/jon-pardi-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-20-8-pm/concert/18652960 | - |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | def-leppard | verify (applied) | 18662383 | https://seatgeek.com/def-leppard-tickets/washington-district-of-columbia-capital-one-arena-2027-03-21-7-pm/concert/18662383 | - |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | nickelback | verify (applied) | 18664602 | https://seatgeek.com/nickelback-tickets/buffalo-new-york-keybank-center-2027-03-24-6-30-pm/concert/18664602 | - |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | greta-van-fleet | verify (applied) | 18641992 | https://seatgeek.com/greta-van-fleet-tickets/seattle-washington-climate-pledge-arena-2027-03-24-7-pm/concert/18641992 | - |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | def-leppard | verify (applied) | 18662394 | https://seatgeek.com/def-leppard-tickets/chicago-illinois-united-center-2027-03-25-7-pm/concert/18662394 | - |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | nickelback | verify (applied) | 18664604 | https://seatgeek.com/nickelback-tickets/detroit-michigan-little-caesars-arena-2027-03-26-6-30-pm/concert/18664604 | - |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | greta-van-fleet | verify (applied) | 18641999 | https://seatgeek.com/greta-van-fleet-tickets/denver-colorado-ball-arena-2027-03-30-7-pm/concert/18641999 | - |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | nickelback | verify (applied) | 18664631 | https://seatgeek.com/nickelback-tickets/edmonton-canada-rogers-place-2027-04-03-6-30-pm/concert/18664631 | - |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | nickelback | verify (applied) | 18664633 | https://seatgeek.com/nickelback-tickets/calgary-canada-scotiabank-saddledome-2027-04-06-6-30-pm/concert/18664633 | - |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | nickelback | verify (applied) | 18664638 | https://seatgeek.com/nickelback-tickets/vancouver-canada-rogers-arena-2027-04-09-6-30-pm/concert/18664638 | - |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | fkj | verify (applied) | 18272744 | https://seatgeek.com/fkj-tickets/vancouver-canada-commodore-ballroom-2027-04-25-7-pm/concert/18272744 | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | hazlett | verify (applied) | 18311898 | https://seatgeek.com/hazlett-tickets/san-francisco-california-august-hall-2027-06-01-8-pm/concert/18311898 | - |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | the-airborne-toxic-event | verify (applied) | 18251596 | https://seatgeek.com/the-airborne-toxic-event-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-06-03-7-pm/concert/18251596 | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | the-airborne-toxic-event | verify (applied) | 18408894 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-diego-california-humphreys-concerts-by-the-bay-2027-06-05-7-30-pm/concert/18408894 | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | hazlett | verify (applied) | 18312174 | https://seatgeek.com/hazlett-tickets/phoenix-arizona-the-van-buren-2027-06-05-8-pm/concert/18312174 | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | the-airborne-toxic-event | verify (applied) | 18252665 | https://seatgeek.com/the-airborne-toxic-event-tickets/phoenix-arizona-the-van-buren-2027-06-06-7-30-pm/concert/18252665 | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | the-airborne-toxic-event | verify (applied) | 18252184 | https://seatgeek.com/the-airborne-toxic-event-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-06-09-7-pm/concert/18252184 | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | the-airborne-toxic-event | verify (applied) | 18252158 | https://seatgeek.com/the-airborne-toxic-event-tickets/sacramento-california-ace-of-spades-2027-06-15-7-pm/concert/18252158 | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | the-airborne-toxic-event | verify (applied) | 18251563 | https://seatgeek.com/the-airborne-toxic-event-tickets/los-angeles-california-the-wiltern-2027-06-17-7-pm/concert/18251563 | - |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | bon-jovi | verify (applied) | 18696568 | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | bon-jovi | verify (applied) | 18696570 | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 | - |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | bon-jovi | verify (applied) | 18696567 | https://seatgeek.com/bon-jovi-tickets/foxborough-massachusetts-gillette-stadium-2027-07-28-7-pm/concert/18696567 | - |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | the-red-clay-strays | verify (applied) | 18639096 | https://seatgeek.com/the-red-clay-strays-tickets/canandaigua-new-york-constellation-brands-marvin-sands-performing-arts-center-cmac-2027-07-29-7-pm/concert/18639096 | - |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | bon-jovi | verify (applied) | 18696569 | https://seatgeek.com/bon-jovi-tickets/toronto-canada-rogers-stadium-toronto-2027-08-04-6-30-pm/concert/18696569 | - |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | the-red-clay-strays | verify (applied) | 18639123 | https://seatgeek.com/the-red-clay-strays-tickets/corpus-christi-texas-hilliard-center-arena-2027-09-18-7-pm/concert/18639123 | - |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18095493 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | verify (applied) | 18230902 | https://seatgeek.com/treaty-oak-revival-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-10-29-7-pm/concert/18230902 | - |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | verify (applied) | 18235908 | https://seatgeek.com/the-smashing-pumpkins-tickets/salt-lake-city-utah-delta-center-1-2026-10-29-8-pm/concert/18235908 | - |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | verify (applied) | 18095494 | https://seatgeek.com/koe-wetzel-tickets/lubbock-texas-cook-s-garage-2026-10-30-6-45-pm/concert/18095494 | - |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | verify (applied) | 18240069 | https://seatgeek.com/don-omar-tickets/salt-lake-city-utah-delta-center-1-2026-11-01-8-pm/concert/18240069 | - |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | verify (applied) | 18579808 | https://seatgeek.com/victoria-monet-tickets/atlanta-georgia-fox-theatre-atlanta-2026-11-04-8-pm/concert/18579808 | - |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | verify (applied) | 18626682 | https://seatgeek.com/brandi-carlile-tickets/portland-oregon-revolution-hall-portland-2026-11-05-8-pm/concert/18626682 | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | verify (applied) | 18390332 | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | verify (applied) | 18391256 | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 | - |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | verify (applied) | 18556120 | https://seatgeek.com/victoria-monet-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-07-8-pm/concert/18556120 | - |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | verify (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | verify (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | verify (applied) | 18626684 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-14-8-pm/concert/18626684 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | verify (applied) | 18626686 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-15-8-pm/concert/18626686 | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | cristian-castro | verify (applied) | 18082276 | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | cristian-castro | verify (applied) | 18077764 | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | koe-wetzel | verify (applied) | 18649773 | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | victoria-monet | verify (applied) | 18579809 | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | verify (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | koe-wetzel | verify (applied) | 18649774 | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | koe-wetzel | verify (applied) | 18649776 | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | verify (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | verify (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | verify (applied) | 18723495 | https://seatgeek.com/elevation-worship-tickets/spokane-washington-numerica-veterans-arena-2027-02-25-7-pm/concert/18723495 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | the-lemonheads | verify (applied) | 18595324 | https://seatgeek.com/the-lemonheads-tickets/phoenix-arizona-crescent-ballroom-2027-02-27-8-pm/concert/18595324 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | the-lemonheads | verify (applied) | 18595328 | https://seatgeek.com/the-lemonheads-tickets/san-juan-capistrano-california-coach-house-capistrano-2027-02-28-7-pm/concert/18595328 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | verify (applied) | 18716616 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-28-8-pm/concert/18716616 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | verify (applied) | 18717561 | https://seatgeek.com/blue-october-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-05-8-pm/concert/18717561 | - |
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
| tm-mico-2027-columbus-z7r9jz1aa7_pz | mico | verify (applied) | 18702224 | https://seatgeek.com/mico-tickets/columbus-ohio-newport-music-hall-2027-03-10-7-pm/concert/18702224 | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | the-lemonheads | verify (applied) | 18595335 | https://seatgeek.com/the-lemonheads-tickets/portland-oregon-hawthorne-theatre-2027-03-10-7-pm/concert/18595335 | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | blue-october | verify (applied) | 18343763 | https://seatgeek.com/blue-october-tickets/chicago-illinois-riviera-theatre-chicago-2027-03-11-8-pm/concert/18343763 | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | yuridia | verify (applied) | 18570402 | https://seatgeek.com/yuridia-tickets/sugar-land-texas-smart-financial-centre-2027-03-11-8-pm/concert/18570402 | - |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | sylvan-esso | verify (applied) | 18299183 | https://seatgeek.com/sylvan-esso-tickets/new-orleans-louisiana-tipitina-s-2027-03-11-8-pm/concert/18299183 | - |
| tm-the-lemonheads-2027-seattle-z7r9jz1aa79u7 | the-lemonheads | verify (applied) | 18595337 | https://seatgeek.com/the-lemonheads-tickets/seattle-washington-el-corazon-2027-03-11-7-pm/concert/18595337 | - |
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
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | verify (applied) | 18670185 | https://seatgeek.com/pink-martini-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-21-7-30-pm/concert/18670185 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | cece-winans | verify (applied) | 18237649 | https://seatgeek.com/cece-winans-tickets/nashville-tennessee-grand-ole-opry-house-2027-03-21-7-30-pm/concert/18237649 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | death-cab-for-cutie | verify (applied) | 18604672 | https://seatgeek.com/death-cab-for-cutie-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-24-8-pm/concert/18604672 | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | the-psychedelic-furs | verify (applied) | 18592690 | https://seatgeek.com/the-psychedelic-furs-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-25-8-pm/concert/18592690 | - |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | death-cab-for-cutie | verify (applied) | 18604674 | https://seatgeek.com/death-cab-for-cutie-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-03-26-7-30-pm/concert/18604674 | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | staind | verify (applied) | 18655524 | https://seatgeek.com/staind-tickets/spokane-washington-numerica-veterans-arena-2027-03-26-6-pm/concert/18655524 | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | vnv-nation | verify (applied) | 18662604 | https://seatgeek.com/vnv-nation-tickets/salt-lake-city-utah-the-grand-at-the-complex-2027-03-26-7-30-pm/concert/18662604 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | verify (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | yuridia | verify (applied) | 18570411 | https://seatgeek.com/yuridia-tickets/brooklyn-new-york-kings-theatre-brooklyn-2027-03-27-8-pm/concert/18570411 | - |
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
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | earth-wind-fire | verify (applied) | 18664856 | https://seatgeek.com/earth-wind-fire-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-14-7-30-pm/concert/18664856 | - |
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
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | foy-vance | verify (applied) | 18368304 | https://seatgeek.com/foy-vance-tickets/new-york-new-york-sony-hall-2027-04-30-8-pm/concert/18368304 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | verify (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | verify (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | verify (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | verify (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | verify (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | verify (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | verify (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | verify (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | verify (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | too-many-zooz | verify (applied) | 18646948 | https://seatgeek.com/too-many-zooz-tickets/vancouver-canada-the-pearl-bc-2027-05-15-7-pm/concert/18646948 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | verify (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | hazlett | verify (applied) | 18319972 | https://seatgeek.com/hazlett-tickets/san-diego-california-music-box-san-diego-2027-06-04-9-pm/concert/18319972 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | verify (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mrffoe | bryan-adams | clear (applied) | - | - | stored URL failed: SeatGeek /events/18424321 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | verify (applied) | 18292618 | https://seatgeek.com/little-big-town-tickets/san-antonio-texas-majestic-theatre-san-antonio-2026-10-29-7-30-pm/concert/18292618 | - |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | verify (applied) | 18424320 | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-29-8-pm/concert/18424320 | - |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2026-saint-louis-vv1akzk3fgkey5tam | sombr | verify (applied) | 18175587 | https://seatgeek.com/sombr-tickets/saint-louis-missouri-enterprise-center-2026-10-30-7-pm/concert/18175587 | - |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | verify (applied) | 18292620 | https://seatgeek.com/little-big-town-tickets/houston-texas-sarofim-hall-at-the-hobby-center-2026-10-30-7-30-pm/concert/18292620 | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | verify (applied) | 18725500 | https://seatgeek.com/riley-green-tickets/nashville-tennessee-the-pinnacle-nashville-2026-10-30-8-30-pm/concert/18725500 | - |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | verify (applied) | 18424322 | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-30-8-pm/concert/18424322 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | verify (applied) | 18155650 | https://seatgeek.com/billy-strings-tickets/baltimore-maryland-cfg-bank-arena-2026-10-31-7-30-pm/concert/18155650 | - |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | verify (applied) | 18292622 | https://seatgeek.com/little-big-town-tickets/dallas-texas-music-hall-at-fair-park-2026-10-31-7-30-pm/concert/18292622 | - |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | daughtry | verify (applied) | 18316795 | https://seatgeek.com/daughtry-tickets/la-vista-nebraska-the-astro-theater-la-vista-2026-10-31-8-pm/concert/18316795 | - |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | verify (applied) | 18470200 | https://seatgeek.com/fuerza-regida-tickets/west-valley-city-utah-maverik-center-2026-10-31-8-30-pm/concert/18470200 | - |
| tm-knocked-loose-2026-daly-city-g5vyz_5mdvnwz | knocked-loose | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Warehouse at the Cow Palace Arena' vs 'Cow Palace - Daly City'; no qualifying replacement found |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | verify (applied) | 18424324 | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-31-8-pm/concert/18424324 | - |
| tm-the-smashing-pumpkins-2026-portland-vvg1hz_1meesxh | the-smashing-pumpkins | verify (applied) | 18250164 | https://seatgeek.com/the-smashing-pumpkins-tickets/portland-oregon-moda-center-2026-11-01-8-pm/concert/18250164 | - |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr5fkv | bryan-adams | verify (applied) | 18424326 | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-01-8-pm/concert/18424326 | - |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-dublin-1kkzv0qagauuqvy | tommy-emmanuel | verify (applied) | 18147020 | https://seatgeek.com/tommy-emmanuel-tickets/dublin-ireland-vicar-street-2026-11-02-8-pm/concert/18147020 | - |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | verify (applied) | 18298234 | https://seatgeek.com/the-psychedelic-furs-tickets/fresno-california-warnors-theatre-2026-11-04-8-pm/concert/18298234 | - |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | victoria-monet | clear (applied) | - | - | stored URL failed: venue mismatch: 'Skyla Credit Union Amphitheatre' vs 'Ovens Auditorium'; no qualifying replacement found |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | don-omar | verify (applied) | 18250872 | https://seatgeek.com/don-omar-tickets/san-jose-california-sap-center-at-san-jose-2026-11-05-8-pm/concert/18250872 | - |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-little-big-town-2026-durham-g5evz_gplfpyl | little-big-town | verify (applied) | 18292628 | https://seatgeek.com/little-big-town-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2026-11-06-7-30-pm/concert/18292628 | - |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | gavin-adcock | verify (applied) | 18126468 | https://seatgeek.com/gavin-adcock-tickets/reading-pennsylvania-santander-arena-2026-11-07-7-pm/concert/18126468 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | tyla | verify (applied) | 18404273 | https://seatgeek.com/tyla-tickets/oakland-california-fox-theater-oakland-2026-11-13-8-pm/concert/18404273 | - |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | los-tigres-del-norte | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | blue-october | verify (applied) | 18141441 | https://seatgeek.com/blue-october-tickets/wilkes-barre-pennsylvania-f-m-kirby-center-2026-11-14-8-pm/concert/18141441 | - |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | journey | verify (applied) | 18237124 | https://seatgeek.com/journey-tickets/saint-louis-missouri-enterprise-center-2026-11-16-7-30-pm/concert/18237124 | - |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | foy-vance | verify (applied) | 18084164 | https://seatgeek.com/foy-vance-tickets/boise-idaho-knitting-factory-concert-house-boise-2026-11-16-7-pm/concert/18084164 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | jonas-brothers | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-trivium-2026-toronto-177zv0g62er1iat | trivium | verify (applied) | 18391949 | https://seatgeek.com/trivium-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2026-11-18-6-35-pm/concert/18391949 | - |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-toronto-1avzz_8gklvsj7l | missio | verify (applied) | 18492369 | https://seatgeek.com/missio-tickets/toronto-canada-the-garrison-toronto-2026-11-20-6-30-pm/concert/18492369 | - |
| tm-little-big-town-2026-detroit-vvg1oz_g9neqkq | little-big-town | verify (applied) | 18292640 | https://seatgeek.com/little-big-town-tickets/detroit-michigan-fox-theatre-detroit-2026-11-20-7-30-pm/concert/18292640 | - |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2026-chicago-vvg18z_cej4l_d | death-cab-for-cutie | verify (applied) | 18393602 | https://seatgeek.com/death-cab-for-cutie-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-21-8-pm/concert/18393602 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9um | calvin-harris | verify (applied) | 18701919 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-11-21-10-30-pm/concert/18701919 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boston-vv177z_8gklypyp_ | missio | verify (applied) | 18492289 | https://seatgeek.com/missio-tickets/boston-massachusetts-brighton-music-hall-2026-11-22-7-pm/concert/18492289 | - |
| tm-blue-october-2026-atlanta-vvg1zz_6ddzdk3 | blue-october | verify (applied) | 18140880 | https://seatgeek.com/blue-october-tickets/atlanta-georgia-the-tabernacle-atlanta-2026-11-22-8-pm/concert/18140880 | - |
| tm-little-big-town-2026-toronto-177zv0g6g2_mkrp | little-big-town | verify (applied) | 18292641 | https://seatgeek.com/little-big-town-tickets/toronto-canada-massey-hall-2026-11-22-8-pm/concert/18292641 | - |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'Roadrunner-Boston' vs 'TD Garden'; no qualifying replacement found |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-chicago-vv178zbwgkltpkse | sabaton | verify (applied) | 17732693 | https://seatgeek.com/sabaton-tickets/chicago-illinois-the-salt-shed-indoors-2026-11-24-7-pm/concert/17732693 | - |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-john-summit-2026-philadelphia-vvg1fz_5ctejox | john-summit | verify (applied) | 18257265 | https://seatgeek.com/john-summit-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-27-7-pm/concert/18257265 | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-cincinnati-1avbzbwgkn0vsnb | sabaton | verify (applied) | 17732695 | https://seatgeek.com/sabaton-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-11-28-7-pm/concert/17732695 | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2026-houston-g5diz_3mqabzl | gavin-adcock | verify (applied) | 18701462 | https://seatgeek.com/gavin-adcock-tickets/houston-texas-713-music-hall-2026-12-01-7-30-pm/concert/18701462 | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-hamilton-1avzz_4gkrzxgxw | garth-brooks | verify (applied) | 18726838 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-04-8-pm/concert/18726838 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | imagine-dragons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-garth-brooks-2026-hamilton-1avzz_4gkre8jcm | garth-brooks | verify (applied) | 18726837 | https://seatgeek.com/garth-brooks-tickets/hamilton-canada-td-coliseum-2026-12-05-8-pm/concert/18726837 | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | little-big-town | verify (applied) | 18385970 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | little-big-town | verify (applied) | 18385972 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | little-big-town | verify (applied) | 18385974 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 | - |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub | barry-manilow | verify (applied) | 17637163 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-11-8-pm/concert/17637163 | - |
| tm-interpol-2026-san-diego-vvg1iz_4dkyacm | interpol | verify (applied) | 18700629 | https://seatgeek.com/interpol-tickets/san-diego-california-soma-san-diego-2026-12-11-8-pm/concert/18700629 | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | barry-manilow | verify (applied) | 17637164 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-12-7-pm/concert/17637164 | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | barry-manilow | verify (applied) | 17637167 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-17-7-pm/concert/17637167 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | barry-manilow | verify (applied) | 17637169 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-18-8-pm/concert/17637169 | - |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | simple-plan | verify (applied) | 18207565 | https://seatgeek.com/simple-plan-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2026-12-19-8-pm/concert/18207565 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | barry-manilow | verify (applied) | 17637171 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-19-7-pm/concert/17637171 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-phish-2027-new-york-g5diz_kv3mvxa | phish | verify (applied) | 18659385 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-31-7-30-pm/concert/18659385 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-phish-2027-new-york-g5diz_kv3yvxl | phish | verify (applied) | 18659382 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-01-7-30-pm/concert/18659382 | - |
| tm-illenium-2027-san-francisco-g5vyz_kuqzndv | illenium | verify (applied) | 18723868 | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-01-01-8-pm/concert/18723868 | - |
| tm-phish-2027-new-york-g5diz_kv3dvxt | phish | verify (applied) | 18659384 | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-02-7-30-pm/concert/18659384 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | tyla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-vancouver-16v7z_f1bg7wmex | simple-plan | verify (applied) | 18655536 | https://seatgeek.com/simple-plan-tickets/vancouver-canada-rogers-arena-2027-01-27-6-pm/concert/18655536 | - |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-edmonton-1av7z_kgkmptc0p | simple-plan | verify (applied) | 18656777 | https://seatgeek.com/simple-plan-tickets/edmonton-canada-rogers-place-2027-01-29-6-pm/concert/18656777 | - |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-aespa-2027-barcelona-z698xz2qz16v0vckob | aespa | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-calgary-1av7z_kgkd2pi5n | simple-plan | verify (applied) | 18655725 | https://seatgeek.com/simple-plan-tickets/calgary-canada-scotiabank-saddledome-2027-01-31-6-pm/concert/18655725 | - |
| tm-two-door-cinema-club-2027-brussels-z698xzg2z16v4w_s4e | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-saskatoon-1av7z_kgkmkzc1- | simple-plan | verify (applied) | 18655541 | https://seatgeek.com/simple-plan-tickets/saskatoon-canada-sasktel-centre-2027-02-01-7-pm/concert/18655541 | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-winnipeg-16ozk4eozza27k28 | simple-plan | verify (applied) | 18655545 | https://seatgeek.com/simple-plan-tickets/winnipeg-canada-canada-life-centre-2027-02-02-7-pm/concert/18655545 | - |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-oslo-z698xzb_z1k8pbuqa | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-toronto-1a8zk4e0eqizeug | simple-plan | verify (applied) | 18655543 | https://seatgeek.com/simple-plan-tickets/toronto-canada-scotiabank-arena-2027-02-05-7-pm/concert/18655543 | - |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | dropkick-murphys | add (applied) | 18633525 | https://seatgeek.com/dropkick-murphys-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-05-7-pm/concert/18633525 | - |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-kitchener-1a8zk4agketqbtj | simple-plan | verify (applied) | 18655730 | https://seatgeek.com/simple-plan-tickets/kitchener-canada-kitchener-memorial-auditorium-complex-2027-02-06-7-pm/concert/18655730 | - |
| tm-two-door-cinema-club-2027-hamburg-z698xzc2z16v1k_wvn | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-london-1f7zvp8wqzz7ufv6 | simple-plan | verify (applied) | 18655528 | https://seatgeek.com/simple-plan-tickets/london-canada-canada-life-place-2027-02-07-7-pm/concert/18655528 | - |
| tm-dropkick-murphys-2027-del-mar-rz7hnez1afgypv | dropkick-murphys | add (applied) | 18633526 | https://seatgeek.com/dropkick-murphys-tickets/del-mar-california-the-sound-del-mar-2027-02-07-7-pm/concert/18633526 | - |
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
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | dropkick-murphys | add (applied) | 18633528 | https://seatgeek.com/dropkick-murphys-tickets/vancouver-canada-pne-forum-vancouver-2027-02-12-7-pm/concert/18633528 | - |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | dropkick-murphys | add (applied) | 18633535 | https://seatgeek.com/dropkick-murphys-tickets/penticton-canada-penticton-trade-convention-centre-2027-02-13-7-pm/concert/18633535 | - |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | role-model | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | malcolm-todd | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkew6n6r | dropkick-murphys | verify (applied) | 18633542 | https://seatgeek.com/dropkick-murphys-tickets/winnipeg-canada-burton-cummings-theatre-2027-02-18-7-pm/concert/18633542 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkewfq6x | dropkick-murphys | verify (applied) | 18633545 | https://seatgeek.com/dropkick-murphys-tickets/winnipeg-canada-burton-cummings-theatre-2027-02-19-7-pm/concert/18633545 | - |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | john-summit | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-green-bay-z7r9jz1aaeopf | dropkick-murphys | verify (applied) | 18633547 | https://seatgeek.com/dropkick-murphys-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-02-21-7-pm/concert/18633547 | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | five-finger-death-punch | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | charli-xcx | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-fort-wayne-z7r9jz1aaeop4 | dropkick-murphys | verify (applied) | 18633548 | https://seatgeek.com/dropkick-murphys-tickets/fort-wayne-indiana-the-clyde-theatre-fort-wayne-in-2027-02-22-7-pm/concert/18633548 | - |
| tm-dropkick-murphys-2027-grand-rapids-vv1afzkfggketsgvf | dropkick-murphys | verify (applied) | 18633551 | https://seatgeek.com/dropkick-murphys-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-02-24-7-pm/concert/18633551 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-detroit-vv1afzkfggkemn0a8 | dropkick-murphys | verify (applied) | 18633552 | https://seatgeek.com/dropkick-murphys-tickets/detroit-michigan-the-fillmore-detroit-2027-02-26-7-pm/concert/18633552 | - |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-london-1a8zkfugkeybnv7 | dropkick-murphys | verify (applied) | 18633555 | https://seatgeek.com/dropkick-murphys-tickets/london-canada-london-music-hall-2027-02-27-7-pm/concert/18633555 | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | amble | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z1kaejyfv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-toronto-1a8zkfygkdujro2 | dropkick-murphys | verify (applied) | 18633557 | https://seatgeek.com/dropkick-murphys-tickets/toronto-canada-rebel-4-2027-03-01-7-pm/concert/18633557 | - |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hutchins Concert Hall' vs 'Collins Center for the Arts'; no qualifying replacement found |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-oslo-z698xzb_z16v0wbofv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-ottawa-16d7z_kj6g7s2ev | dropkick-murphys | verify (applied) | 18633558 | https://seatgeek.com/dropkick-murphys-tickets/ottawa-canada-history-ottawa-2027-03-02-7-pm/concert/18633558 | - |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-denver-g5vzz_4qmz4qp | the-neighbourhood | verify (applied) | 18726902 | https://seatgeek.com/the-neighbourhood-tickets/denver-colorado-ball-arena-2027-03-02-7-pm/concert/18726902 | - |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgfozegk | dropkick-murphys | verify (applied) | 18633560 | https://seatgeek.com/dropkick-murphys-tickets/quebec-city-canada-theatre-capitole-2027-03-03-7-pm/concert/18633560 | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-atlantic-city-vv1aezk49gkddvprj | rod-stewart | verify (applied) | 18725794 | https://seatgeek.com/rod-stewart-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-06-8-pm/concert/18725794 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-dallas-vvg1yz_4no500h | the-neighbourhood | verify (applied) | 18726900 | https://seatgeek.com/the-neighbourhood-tickets/dallas-texas-american-airlines-center-2027-03-07-7-pm/concert/18726900 | - |
| tm-kaleo-2027-brussels-z698xzg2z16vjkuafp | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-brussels-z698xzg2z16v_0_u-k | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | fantasia | verify (applied) | 18645847 | https://seatgeek.com/fantasia-tickets/fort-worth-texas-dickies-arena-2027-03-13-8-pm/concert/18645847 | - |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-madrid-z698xz2qz1kuvp4rv | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-barcelona-z698xz2qz1koa3fud | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | james-blunt | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-warsaw-z698xzqpz1kbba-jk | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-hidalgo-g5diz_4kwcels | interpol | verify (applied) | 18710343 | https://seatgeek.com/interpol-tickets/hidalgo-texas-payne-arena-2027-03-19-8-pm/concert/18710343 | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-praha-8-z698xzu0z1kauc3vb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-dallas-z7r9jz1aa7sce | interpol | add (applied) | 18710347 | https://seatgeek.com/interpol-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-20-8-pm/concert/18710347 | - |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-memphis-g5viz_4agmgrr | interpol | verify (applied) | 18710346 | https://seatgeek.com/interpol-tickets/memphis-tennessee-satellite-music-hall-2027-03-22-7-pm/concert/18710346 | - |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-zurich-z698xzu3z16vqkfsq4 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-asheville-g5evz_4oz4dpm | interpol | verify (applied) | 18710348 | https://seatgeek.com/interpol-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-23-8-pm/concert/18710348 | - |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-washington-1a4zk4kgkd5cf0g | interpol | verify (applied) | 18710355 | https://seatgeek.com/interpol-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-24-7-30-pm/concert/18710355 | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-vienna-z698xz5rz16vr81eow | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-interpol-2027-philadelphia-vv1aezk4fgkevbabi | interpol | verify (applied) | 18710357 | https://seatgeek.com/interpol-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-26-8-pm/concert/18710357 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | megadeth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kaleo-2027-berlin-z698xzc2z1ku0c686 | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-columbus-vv1aazk4fgkd90ltp | death-cab-for-cutie | verify (applied) | 18715562 | https://seatgeek.com/death-cab-for-cutie-tickets/columbus-ohio-wexner-center-mershon-auditorium-2027-03-29-7-30-pm/concert/18715562 | - |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | kaleo | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | lola-young | verify (applied) | 18649730 | https://seatgeek.com/lola-young-tickets/nashville-tennessee-the-pinnacle-nashville-2027-04-06-8-pm/concert/18649730 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-atlanta-vvg1zz_f7qhai6 | lola-young | verify (applied) | 18649708 | https://seatgeek.com/lola-young-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-07-8-pm/concert/18649708 | - |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_k | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-washington-1a4zk4egkeystl8 | lola-young | verify (applied) | 18649706 | https://seatgeek.com/lola-young-tickets/washington-district-of-columbia-the-anthem-dc-2027-04-09-8-pm/concert/18649706 | - |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | lola-young | verify (applied) | 18649707 | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | lola-young | verify (applied) | 18649709 | https://seatgeek.com/lola-young-tickets/new-york-new-york-radio-city-music-hall-2027-04-12-8-pm/concert/18649709 | - |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | lola-young | verify (applied) | 18649732 | https://seatgeek.com/lola-young-tickets/boston-massachusetts-roadrunner-boston-2027-04-13-8-pm/concert/18649732 | - |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | death-cab-for-cutie | verify (applied) | 18715564 | https://seatgeek.com/death-cab-for-cutie-tickets/charlottesville-virginia-ting-pavilion-2027-04-14-7-30-pm/concert/18715564 | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | lola-young | verify (applied) | 18649734 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-15-8-pm/concert/18649734 | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | lola-young | verify (applied) | 18649736 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-16-8-pm/concert/18649736 | - |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | lola-young | verify (applied) | 18649711 | https://seatgeek.com/lola-young-tickets/detroit-michigan-the-fillmore-detroit-2027-04-18-8-pm/concert/18649711 | - |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | lola-young | verify (applied) | 18649710 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-20-7-30-pm/concert/18649710 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-philadelphia-1adzz_4gkl39a_b | the-neighbourhood | verify (applied) | 18726905 | https://seatgeek.com/the-neighbourhood-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-04-23-7-pm/concert/18726905 | - |
| tm-foy-vance-2027-ardmore-z7r9jz1aa7_fo | foy-vance | add (applied) | 18370696 | https://seatgeek.com/foy-vance-tickets/ardmore-pennsylvania-the-ardmore-music-hall-2027-04-23-8-pm/concert/18370696 | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | calvin-harris | add (applied) | 18674838 | https://seatgeek.com/calvin-harris-tickets/houston-texas-toyota-center-2027-04-23-8-pm/concert/18674838 | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-boston-vv1avzk4_gkdekcqu | the-neighbourhood | verify (applied) | 18726904 | https://seatgeek.com/the-neighbourhood-tickets/boston-massachusetts-td-garden-2027-04-24-7-pm/concert/18726904 | - |
| tm-u2-2027-stockholm-z698xzq2z16v-3vzat | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-montreal-1ad7z_4gknbo3lq | the-neighbourhood | verify (applied) | 18726919 | https://seatgeek.com/the-neighbourhood-tickets/montreal-canada-centre-bell-2027-04-27-7-pm/concert/18726919 | - |
| tm-u2-2027-stockholm-z698xzq2z16v_p7i1a | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-kanata-16szk49oizau7kga | the-neighbourhood | verify (applied) | 18726921 | https://seatgeek.com/the-neighbourhood-tickets/kanata-canada-canadian-tire-centre-2027-04-28-7-pm/concert/18726921 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | add (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | add (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-malmo-z698xzq2z1k-ga_fv | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-columbus-vv17fz_4gkmetfbq | the-neighbourhood | verify (applied) | 18726908 | https://seatgeek.com/the-neighbourhood-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-04-30-7-pm/concert/18726908 | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | simple-minds | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-pittsburgh-16vbz_4jkg7tdr9 | the-neighbourhood | verify (applied) | 18726910 | https://seatgeek.com/the-neighbourhood-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-05-01-7-pm/concert/18726910 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-boston-vvg17z_grnbkkr | hazlett | verify (applied) | 18311626 | https://seatgeek.com/hazlett-tickets/boston-massachusetts-paradise-rock-club-2027-05-02-7-pm/concert/18311626 | - |
| tm-niall-horan-2027-fort-worth-vvg1yz_1r1jeer | niall-horan | verify (applied) | 18235547 | https://seatgeek.com/niall-horan-tickets/fort-worth-texas-dickies-arena-2027-05-02-7-30-pm/concert/18235547 | - |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-los-angeles-vvg10z_cjir6zj | saint-levant | verify (applied) | 18386205 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-03-7-pm/concert/18386205 | - |
| tm-the-neighbourhood-2027-raleigh-g5evz_4l74bcy | the-neighbourhood | verify (applied) | 18726915 | https://seatgeek.com/the-neighbourhood-tickets/raleigh-north-carolina-lenovo-center-2027-05-04-7-pm/concert/18726915 | - |
| tm-hazlett-2027-montreal-17g8v0g62kxoauq | hazlett | verify (applied) | 18649787 | https://seatgeek.com/hazlett-tickets/montreal-canada-beanfield-theatre-2027-05-04-8-pm/concert/18649787 | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjil6zv | saint-levant | verify (applied) | 18386207 | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-04-7-pm/concert/18386207 | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-josiah-queen-2027-fort-worth-vvg1yz_kebfbqm | josiah-queen | verify (applied) | 18606512 | https://seatgeek.com/josiah-queen-tickets/fort-worth-texas-dickies-arena-2027-05-05-7-pm/concert/18606512 | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | add (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-vancouver-1aozk4v0aa_zegf | fontaines-d-c | verify (applied) | 18658881 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-06-8-pm/concert/18658881 | - |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-indianapolis-vv1aazk49gkeyee1s | the-neighbourhood | verify (applied) | 18726916 | https://seatgeek.com/the-neighbourhood-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-07-7-pm/concert/18726916 | - |
| tm-saint-levant-2027-san-francisco-g5vyz_cj596wt | saint-levant | verify (applied) | 18386214 | https://seatgeek.com/saint-levant-tickets/san-francisco-california-the-masonic-san-francisco-2027-05-07-8-pm/concert/18386214 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-chicago-vv178z_4gknyh4c0 | the-neighbourhood | verify (applied) | 18726918 | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2027-05-08-7-pm/concert/18726918 | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-winnipeg-1av7z_4gknbr6nb | the-neighbourhood | verify (applied) | 18726926 | https://seatgeek.com/the-neighbourhood-tickets/winnipeg-canada-canada-life-centre-2027-05-11-7-pm/concert/18726926 | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-chicago-vvg18z_glqlopk | hazlett | verify (applied) | 18311797 | https://seatgeek.com/hazlett-tickets/chicago-illinois-house-of-blues-chicago-2027-05-13-7-pm/concert/18311797 | - |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-calgary-1av7z_4gknld4le | the-neighbourhood | verify (applied) | 18726927 | https://seatgeek.com/the-neighbourhood-tickets/calgary-canada-scotiabank-saddledome-2027-05-14-7-pm/concert/18726927 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-neighbourhood-2027-edmonton-1av7z_4gkl6qbrx | the-neighbourhood | verify (applied) | 18726928 | https://seatgeek.com/the-neighbourhood-tickets/edmonton-canada-rogers-place-2027-05-15-7-pm/concert/18726928 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-kansas-city-vvg1bz_c1yj_ec | hazlett | verify (applied) | 18649797 | https://seatgeek.com/hazlett-tickets/kansas-city-missouri-madrid-theatre-1-2027-05-17-8-pm/concert/18649797 | - |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-charlotte-g5evz_1nj2twb | the-airborne-toxic-event | verify (applied) | 18252642 | https://seatgeek.com/the-airborne-toxic-event-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-05-18-8-pm/concert/18252642 | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-washington-17a8v0g61rlmtti | the-airborne-toxic-event | verify (applied) | 18251758 | https://seatgeek.com/the-airborne-toxic-event-tickets/washington-district-of-columbia-9-30-club-2027-05-20-7-pm/concert/18251758 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-thirty-seconds-to-mars-2027-helsinki-z698xz8kz16v7so3fa | thirty-seconds-to-mars | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | the-airborne-toxic-event | verify (applied) | 18251603 | https://seatgeek.com/the-airborne-toxic-event-tickets/cleveland-ohio-house-of-blues-cleveland-2027-05-24-7-pm/concert/18251603 | - |
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | two-door-cinema-club | verify (applied) | 18711341 | https://seatgeek.com/two-door-cinema-club-tickets/del-mar-california-the-sound-del-mar-2027-05-24-7-30-pm/concert/18711341 | - |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | hazlett | verify (applied) | 18311990 | https://seatgeek.com/hazlett-tickets/seattle-washington-neptune-theatre-wa-2027-05-25-8-pm/concert/18311990 | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | hazlett | verify (applied) | 18388253 | https://seatgeek.com/hazlett-tickets/vancouver-canada-commodore-ballroom-2027-05-26-7-pm/concert/18388253 | - |
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
| tm-u2-2027-amsterdam-z698xzbpz16v7bpzfv | u2 | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | hayley-williams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | rod-stewart | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-nurnberg-z698xzc2z16vv6jt_f | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | jack-johnson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-fulda-z698xzc2z1k86g-_z | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-nurnberg-z698xzc2z16v0aozkf | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2027-halle-westfalen-z698xzc2z16voo4puj | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | simply-red | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | add (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
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
| tm-doja-cat-2026-san-francisco-g5vyzbs0ua9tw | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-inglewood-vv170zbsgkihfzey | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-atlanta-vvg1zz_fxet19l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-sunrise-z7r9jz1a7x8vw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-charlotte-g5evz_fneqevn | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sienna-spiro-2026-toronto-177zv0g6g9hzrkw | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-oakland-g5vyz_gfww-6g | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-san-diego-vvg1iz_gcici-d | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-phoenix-17k8v0g6g538qi9 | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9nqcx | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-houston-g5diz_1ucylhw | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-nashville-g5viz_1mfi-bc | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-nashville-g5viz_141b_9f | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-louisville-z7r9jz1a70f_w | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-baltimore-17a8v0g61kp2ris | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-newark-vvg1fz_197dnkr | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-oakland-z7r9jz1a70kkf | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_awrtnmb | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-kansas-city-vvg1bz_5nc5gbq | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-houston-z7r9jz1a7x73v | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-knoxville-z7r9jz1a7-yuw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-cary-z7r9jz1a7-y8f | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
