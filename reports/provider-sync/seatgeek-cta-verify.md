# SeatGeek CTA verification log

Generated: 2026-11-06T23:31:06.082Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1896 (needs_recheck: 992, provenance backfill: 57, stale re-check: 1399)
- Events skipped before API checks: 564
- API calls made: 800
- Verified provenance written: 709
- URLs added: 7
- URLs corrected: 0
- URLs cleared: 5
- Provenance un-verified: 6
- Conflicts (ambiguous, untouched): 0
- No qualifying listing: 61
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-dylan-gossett-2027-birmingham-1aezz_kgkbdr7ks | dylan-gossett | verify (applied) | 18642092 | https://seatgeek.com/dylan-gossett-tickets/birmingham-alabama-avondale-brewing-company-2027-04-04-7-pm/concert/18642092 | - |
| tm-the-psychedelic-furs-2027-new-orleans-g5viz_ad68eh6 | the-psychedelic-furs | verify (applied) | 18592667 | https://seatgeek.com/the-psychedelic-furs-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-04-04-7-pm/concert/18592667 | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | jay-wheeler | verify (applied) | 18649609 | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | hans-zimmer | verify (applied) | 18601947 | https://seatgeek.com/hans-zimmer-tickets/san-francisco-california-chase-center-2027-04-04-7-30-pm/concert/18601947 | - |
| tm-death-cab-for-cutie-2027-montreal-1ad7z_3gkrplg-n | death-cab-for-cutie | verify (applied) | 18603817 | https://seatgeek.com/death-cab-for-cutie-tickets/montreal-canada-mtelus-2027-04-05-8-pm/concert/18603817 | - |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | haiden-henderson | verify (applied) | 18613096 | https://seatgeek.com/haiden-henderson-tickets/santa-ana-california-constellation-room-at-the-observatory-2027-04-05-7-pm/concert/18613096 | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | hans-zimmer | verify (applied) | 18601953 | https://seatgeek.com/hans-zimmer-tickets/sacramento-california-golden-1-center-2027-04-05-7-30-pm/concert/18601953 | - |
| tm-lukas-graham-2027-toronto-1f7zvpgxaoz786kf | lukas-graham | verify (applied) | 18618029 | https://seatgeek.com/lukas-graham-tickets/toronto-canada-the-danforth-music-hall-2027-04-06-7-pm/concert/18618029 | - |
| tm-staind-2027-sioux-falls-vv1akzk4vgkd8j7ov | staind | verify (applied) | 18654517 | https://seatgeek.com/staind-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-06-6-pm/concert/18654517 | - |
| tm-saint-levant-2027-detroit-vvg1oz_cxteu1p | saint-levant | verify (applied) | 18386182 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-06-7-pm/concert/18386182 | - |
| tm-dylan-gossett-2027-philadelphia-vv17fz_kgkmvqdsy | dylan-gossett | verify (applied) | 18642093 | https://seatgeek.com/dylan-gossett-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-06-7-pm/concert/18642093 | - |
| tm-vnv-nation-2027-montreal-1ad7zbvgklrkbrt | vnv-nation | verify (applied) | 18543174 | https://seatgeek.com/vnv-nation-tickets/montreal-canada-beanfield-theatre-2027-04-06-8-pm/concert/18543174 | - |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | nickelback | verify (applied) | 18664633 | https://seatgeek.com/nickelback-tickets/calgary-canada-scotiabank-saddledome-2027-04-06-6-30-pm/concert/18664633 | - |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | jay-wheeler | verify (applied) | 18649614 | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 | - |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | lola-young | verify (applied) | 18649730 | https://seatgeek.com/lola-young-tickets/nashville-tennessee-the-pinnacle-nashville-2027-04-06-8-pm/concert/18649730 | - |
| tm-the-interrupters-2027-boston-vv1avzkftgkexzmrt | the-interrupters | verify (applied) | 18612664 | https://seatgeek.com/the-interrupters-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-07-6-pm/concert/18612664 | - |
| tm-saint-levant-2027-detroit-vv1koz_opyg7lxkw | saint-levant | verify (applied) | 18550843 | https://seatgeek.com/saint-levant-tickets/detroit-michigan-the-fillmore-detroit-2027-04-07-7-pm/concert/18550843 | - |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | lukas-graham | verify (applied) | 18617565 | https://seatgeek.com/lukas-graham-tickets/detroit-michigan-saint-andrews-hall-2027-04-07-7-pm/concert/18617565 | - |
| tm-staind-2027-fargo-vv17bz_kgkuwy5mz | staind | verify (applied) | 18654522 | https://seatgeek.com/staind-tickets/fargo-north-dakota-fargodome-2027-04-07-6-pm/concert/18654522 | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | the-psychedelic-furs | verify (applied) | 18592691 | https://seatgeek.com/the-psychedelic-furs-tickets/tallahassee-florida-the-moon-2027-04-07-7-30-pm/concert/18592691 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgkjcy | death-cab-for-cutie | verify (applied) | 18604107 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-07-8-pm/concert/18604107 | - |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | foy-vance | verify (applied) | 18084515 | https://seatgeek.com/foy-vance-tickets/birmingham-alabama-iron-city-2027-04-07-7-pm/concert/18084515 | - |
| tm-dylan-gossett-2027-baltimore-1avfz_kgkbht6mj | dylan-gossett | verify (applied) | 18642094 | https://seatgeek.com/dylan-gossett-tickets/baltimore-maryland-the-paramount-baltimore-2027-04-07-7-pm/concert/18642094 | - |
| tm-lola-young-2027-atlanta-vvg1zz_f7qhai6 | lola-young | verify (applied) | 18649708 | https://seatgeek.com/lola-young-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-07-8-pm/concert/18649708 | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | jay-wheeler | verify (applied) | 18649616 | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 | - |
| tm-nothing-but-thieves-2027-phoenix-17k8v0g659aif3n | nothing-but-thieves | verify (applied) | 18266349 | https://seatgeek.com/nothing-but-thieves-tickets/phoenix-arizona-the-van-buren-2027-04-07-8-pm/concert/18266349 | - |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | leon-bridges | verify (applied) | 18662693 | https://seatgeek.com/leon-bridges-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2027-04-07-8-pm/concert/18662693 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-niall-horan-2027-baltimore-17a8v0g61lfcmsv | niall-horan | verify (applied) | 18235529 | https://seatgeek.com/niall-horan-tickets/baltimore-maryland-cfg-bank-arena-2027-04-08-7-30-pm/concert/18235529 | - |
| tm-lukas-graham-2027-indianapolis-vv1kv8vpuvgauq0sn | lukas-graham | verify (applied) | 18618400 | https://seatgeek.com/lukas-graham-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-08-7-30-pm/concert/18618400 | - |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | the-psychedelic-furs | verify (applied) | 18592671 | https://seatgeek.com/the-psychedelic-furs-tickets/saint-petersburg-florida-jannus-live-2027-04-08-8-pm/concert/18592671 | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgfg2c | death-cab-for-cutie | verify (applied) | 18604106 | https://seatgeek.com/death-cab-for-cutie-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-08-8-pm/concert/18604106 | - |
| tm-josiah-queen-2027-tulsa-1aozkf0gkevkv5m | josiah-queen | verify (applied) | 18574499 | https://seatgeek.com/josiah-queen-tickets/tulsa-oklahoma-bok-center-2027-04-08-7-pm/concert/18574499 | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | dylan-gossett | verify (applied) | 18642098 | https://seatgeek.com/dylan-gossett-tickets/columbus-ohio-kemba-live-2027-04-08-7-pm/concert/18642098 | - |
| tm-riley-green-2027-edmonton-1av7z_3gkwgn0bp | riley-green | verify (applied) | 18626555 | https://seatgeek.com/riley-green-tickets/edmonton-canada-rogers-place-2027-04-08-7-pm/concert/18626555 | - |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | hans-zimmer | verify (applied) | 18601965 | https://seatgeek.com/hans-zimmer-tickets/vancouver-canada-rogers-arena-2027-04-08-7-30-pm/concert/18601965 | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | john-mayer | verify (applied) | 18626622 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-08-8-pm/concert/18626622 | - |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | mei-semones | verify (applied) | 18637352 | https://seatgeek.com/mei-semones-tickets/washington-district-of-columbia-9-30-club-2027-04-09-6-pm/concert/18637352 | - |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | the-interrupters | verify (applied) | 18612730 | https://seatgeek.com/the-interrupters-tickets/montreal-canada-mtelus-2027-04-09-7-pm/concert/18612730 | - |
| tm-staind-2027-omaha-vv1kvovp8tga5iapt | staind | verify (applied) | 18654523 | https://seatgeek.com/staind-tickets/omaha-nebraska-chi-health-center-omaha-2027-04-09-6-pm/concert/18654523 | - |
| tm-death-cab-for-cutie-2027-uncasville-g5vvz_3vqdtrt | death-cab-for-cutie | verify (applied) | 18603584 | https://seatgeek.com/death-cab-for-cutie-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-09-8-pm/concert/18603584 | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | haiden-henderson | verify (applied) | 18613093 | https://seatgeek.com/haiden-henderson-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2027-04-09-7-pm/concert/18613093 | - |
| tm-saint-levant-2027-silver-spring-17a8v0g6cjqrj2z | saint-levant | verify (applied) | 18386183 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-09-8-pm/concert/18386183 | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | foy-vance | verify (applied) | 18367917 | https://seatgeek.com/foy-vance-tickets/nashville-tennessee-the-basement-east-2027-04-09-8-pm/concert/18367917 | - |
| tm-lola-young-2027-washington-1a4zk4egkeystl8 | lola-young | verify (applied) | 18649706 | https://seatgeek.com/lola-young-tickets/washington-district-of-columbia-the-anthem-dc-2027-04-09-8-pm/concert/18649706 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | harry-styles | verify (applied) | 18516103 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-09-7-45-pm/concert/18516103 | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | fantasia | verify (applied) | 18629228 | https://seatgeek.com/fantasia-tickets/saint-louis-missouri-enterprise-center-2027-04-09-8-pm/concert/18629228 | - |
| tm-riley-green-2027-calgary-1aozkfygkderjem | riley-green | verify (applied) | 18626557 | https://seatgeek.com/riley-green-tickets/calgary-canada-scotiabank-saddledome-2027-04-09-7-pm/concert/18626557 | - |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | nickelback | verify (applied) | 18664638 | https://seatgeek.com/nickelback-tickets/vancouver-canada-rogers-arena-2027-04-09-6-30-pm/concert/18664638 | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | nothing-but-thieves | verify (applied) | 18266350 | https://seatgeek.com/nothing-but-thieves-tickets/denver-colorado-mission-ballroom-2027-04-09-8-pm/concert/18266350 | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | hans-zimmer | verify (applied) | 18601954 | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | the-interrupters | verify (applied) | 18613159 | https://seatgeek.com/the-interrupters-tickets/toronto-canada-history-2027-04-10-6-pm/concert/18613159 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | josiah-queen | verify (applied) | 18574501 | https://seatgeek.com/josiah-queen-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-04-10-7-pm/concert/18574501 | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | foy-vance | verify (applied) | 18084058 | https://seatgeek.com/foy-vance-tickets/knoxville-tennessee-bijou-theatre-knoxville-2027-04-10-7-pm/concert/18084058 | - |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | staind | verify (applied) | 18654526 | https://seatgeek.com/staind-tickets/kansas-city-missouri-t-mobile-center-2027-04-10-6-pm/concert/18654526 | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | dylan-gossett | verify (applied) | 18642099 | https://seatgeek.com/dylan-gossett-tickets/detroit-michigan-the-fillmore-detroit-2027-04-10-7-pm/concert/18642099 | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | saint-levant | verify (applied) | 18550858 | https://seatgeek.com/saint-levant-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-10-8-pm/concert/18550858 | - |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | the-psychedelic-furs | verify (applied) | 18592673 | https://seatgeek.com/the-psychedelic-furs-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-10-8-pm/concert/18592673 | - |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | lukas-graham | verify (applied) | 18618814 | https://seatgeek.com/lukas-graham-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-04-10-7-pm/concert/18618814 | - |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | lola-young | verify (applied) | 18649707 | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | fantasia | verify (applied) | 18629435 | https://seatgeek.com/fantasia-tickets/southaven-mississippi-landers-center-2027-04-10-8-pm/concert/18629435 | - |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | riley-green | verify (applied) | 18626559 | https://seatgeek.com/riley-green-tickets/saskatoon-canada-sasktel-centre-2027-04-10-7-pm/concert/18626559 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | jay-wheeler | verify (applied) | 18649617 | https://seatgeek.com/jay-wheeler-tickets/inglewood-california-youtube-theater-2027-04-10-8-pm/concert/18649617 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | john-mayer | verify (applied) | 18626621 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 | - |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | the-interrupters | verify (applied) | 18612707 | https://seatgeek.com/the-interrupters-tickets/london-canada-london-music-hall-2027-04-11-6-pm/concert/18612707 | - |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | josiah-queen | verify (applied) | 18574503 | https://seatgeek.com/josiah-queen-tickets/grand-rapids-michigan-van-andel-arena-2027-04-11-7-pm/concert/18574503 | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | lukas-graham | verify (applied) | 18617871 | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 | - |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | staind | verify (applied) | 18654527 | https://seatgeek.com/staind-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-11-6-pm/concert/18654527 | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | dylan-gossett | verify (applied) | 18642102 | https://seatgeek.com/dylan-gossett-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-11-7-pm/concert/18642102 | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | nothing-but-thieves | verify (applied) | 18266353 | https://seatgeek.com/nothing-but-thieves-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-11-7-30-pm/concert/18266353 | - |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | death-cab-for-cutie | verify (applied) | 18603742 | https://seatgeek.com/death-cab-for-cutie-tickets/portland-maine-state-theatre-portland-me-2027-04-11-8-pm/concert/18603742 | - |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | the-psychedelic-furs | verify (applied) | 18592674 | https://seatgeek.com/the-psychedelic-furs-tickets/orlando-florida-hard-rock-live-orlando-2027-04-11-8-pm/concert/18592674 | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | vnv-nation | verify (applied) | 18516864 | https://seatgeek.com/vnv-nation-tickets/millvale-pennsylvania-mr-smalls-theatre-2027-04-11-9-pm/concert/18516864 | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | hans-zimmer | verify (applied) | 18601957 | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | john-mayer | verify (applied) | 18626620 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | niall-horan | verify (applied) | 18235530 | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 | - |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | lola-young | verify (applied) | 18649709 | https://seatgeek.com/lola-young-tickets/new-york-new-york-radio-city-music-hall-2027-04-12-8-pm/concert/18649709 | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | nothing-but-thieves | verify (applied) | 18266356 | https://seatgeek.com/nothing-but-thieves-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-12-7-30-pm/concert/18266356 | - |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | the-interrupters | verify (applied) | 18612605 | https://seatgeek.com/the-interrupters-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-13-6-pm/concert/18612605 | - |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | staind | verify (applied) | 18654528 | https://seatgeek.com/staind-tickets/grand-rapids-michigan-van-andel-arena-2027-04-13-6-pm/concert/18654528 | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | nothing-but-thieves | verify (applied) | 18266354 | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 | - |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | josiah-queen | verify (applied) | 18574502 | https://seatgeek.com/josiah-queen-tickets/toronto-canada-coca-cola-coliseum-2027-04-13-7-pm/concert/18574502 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | death-cab-for-cutie | verify (applied) | 18603805 | https://seatgeek.com/death-cab-for-cutie-tickets/new-york-new-york-radio-city-music-hall-2027-04-13-8-pm/concert/18603805 | - |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | saint-levant | verify (applied) | 18386194 | https://seatgeek.com/saint-levant-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-13-8-pm/concert/18386194 | - |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | lola-young | verify (applied) | 18649732 | https://seatgeek.com/lola-young-tickets/boston-massachusetts-roadrunner-boston-2027-04-13-8-pm/concert/18649732 | - |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | a-perfect-circle | verify (applied) | 18632504 | https://seatgeek.com/a-perfect-circle-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-13-7-pm/concert/18632504 | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | the-interrupters | verify (applied) | 18613142 | https://seatgeek.com/the-interrupters-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-14-6-pm/concert/18613142 | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | haiden-henderson | verify (applied) | 18612968 | https://seatgeek.com/haiden-henderson-tickets/atlanta-georgia-the-masquerade-hell-2027-04-14-7-pm/concert/18612968 | - |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | staind | verify (applied) | 18654530 | https://seatgeek.com/staind-tickets/evansville-indiana-ford-center-in-2027-04-14-6-pm/concert/18654530 | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | earth-wind-fire | verify (applied) | 18664856 | https://seatgeek.com/earth-wind-fire-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-14-7-30-pm/concert/18664856 | - |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | death-cab-for-cutie | verify (applied) | 18715564 | https://seatgeek.com/death-cab-for-cutie-tickets/charlottesville-virginia-ting-pavilion-2027-04-14-7-30-pm/concert/18715564 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | warren-zeiders | verify (applied) | 18649754 | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | nothing-but-thieves | verify (applied) | 18266355 | https://seatgeek.com/nothing-but-thieves-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-15-8-pm/concert/18266355 | - |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | josiah-queen | verify (applied) | 18574500 | https://seatgeek.com/josiah-queen-tickets/worcester-massachusetts-dcu-center-2027-04-15-7-pm/concert/18574500 | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | niall-horan | verify (applied) | 18235538 | https://seatgeek.com/niall-horan-tickets/raleigh-north-carolina-lenovo-center-2027-04-15-7-30-pm/concert/18235538 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | jay-wheeler | verify (applied) | 18649618 | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | lola-young | verify (applied) | 18649734 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-15-8-pm/concert/18649734 | - |
| tm-mercyme-2027-grand-prairie-z7r9jz1aa74jn | mercyme | verify (applied) | 18692264 | https://seatgeek.com/mercyme-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-04-15-7-pm/concert/18692264 | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | a-perfect-circle | verify (applied) | 18632506 | https://seatgeek.com/a-perfect-circle-tickets/calgary-canada-scotiabank-saddledome-2027-04-15-7-30-pm/concert/18632506 | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | carly-rae-jepsen | verify (applied) | 18639050 | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 | - |
| tm-meshuggah-2027-vancouver-z7r9jz1aa7tay | meshuggah | verify (applied) | 18724665 | https://seatgeek.com/meshuggah-tickets/vancouver-canada-pne-forum-vancouver-2027-04-15-7-pm/concert/18724665 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | john-mayer | verify (applied) | 18626619 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 | - |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | the-interrupters | verify (applied) | 18612691 | https://seatgeek.com/the-interrupters-tickets/detroit-michigan-the-fillmore-detroit-2027-04-16-6-pm/concert/18612691 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | josiah-queen | verify (applied) | 18574510 | https://seatgeek.com/josiah-queen-tickets/hershey-pennsylvania-giant-center-2027-04-16-7-pm/concert/18574510 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | nothing-but-thieves | verify (applied) | 18266361 | https://seatgeek.com/nothing-but-thieves-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-04-16-8-pm/concert/18266361 | - |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | death-cab-for-cutie | verify (applied) | 18603768 | https://seatgeek.com/death-cab-for-cutie-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-16-8-pm/concert/18603768 | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | fantasia | verify (applied) | 18629294 | https://seatgeek.com/fantasia-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-16-8-pm/concert/18629294 | - |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | def-leppard | verify (applied) | 18662402 | https://seatgeek.com/def-leppard-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-16-7-pm/concert/18662402 | - |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | saint-levant | verify (applied) | 18384604 | https://seatgeek.com/saint-levant-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-16-8-pm/concert/18384604 | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | the-psychedelic-furs | verify (applied) | 18592676 | https://seatgeek.com/the-psychedelic-furs-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-16-8-pm/concert/18592676 | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | mei-semones | verify (applied) | 18638869 | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | lola-young | verify (applied) | 18649736 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-16-8-pm/concert/18649736 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | carly-rae-jepsen | verify (applied) | 18639051 | https://seatgeek.com/carly-rae-jepsen-tickets/calgary-canada-grey-eagle-event-centre-2027-04-16-7-30-pm/concert/18639051 | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | verify (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | luke-combs | verify (applied) | 18493404 | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | the-interrupters | verify (applied) | 18612762 | https://seatgeek.com/the-interrupters-tickets/chicago-illinois-house-of-blues-chicago-2027-04-17-5-30-pm/concert/18612762 | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | nothing-but-thieves | verify (applied) | 18266362 | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | josiah-queen | verify (applied) | 18574511 | https://seatgeek.com/josiah-queen-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-17-7-pm/concert/18574511 | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | niall-horan | verify (applied) | 18235541 | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 | - |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | the-psychedelic-furs | verify (applied) | 18592680 | https://seatgeek.com/the-psychedelic-furs-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-17-7-30-pm/concert/18592680 | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | fantasia | verify (applied) | 18631704 | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | warren-zeiders | verify (applied) | 18649755 | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | a-perfect-circle | verify (applied) | 18632507 | https://seatgeek.com/a-perfect-circle-tickets/edmonton-canada-rogers-place-2027-04-17-7-30-pm/concert/18632507 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | john-mayer | verify (applied) | 18626618 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 | - |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | josiah-queen | verify (applied) | 18574513 | https://seatgeek.com/josiah-queen-tickets/duluth-georgia-gas-south-arena-2027-04-18-7-pm/concert/18574513 | - |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | lola-young | verify (applied) | 18649711 | https://seatgeek.com/lola-young-tickets/detroit-michigan-the-fillmore-detroit-2027-04-18-8-pm/concert/18649711 | - |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | haiden-henderson | verify (applied) | 18613118 | https://seatgeek.com/haiden-henderson-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-18-8-pm/concert/18613118 | - |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | def-leppard | verify (applied) | 18662404 | https://seatgeek.com/def-leppard-tickets/fort-worth-texas-dickies-arena-2027-04-18-7-pm/concert/18662404 | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | saint-levant | verify (applied) | 18386193 | https://seatgeek.com/saint-levant-tickets/atlanta-georgia-buckhead-theatre-2027-04-18-8-pm/concert/18386193 | - |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | the-warning | verify (applied) | 18591375 | https://seatgeek.com/the-warning-tickets/phoenix-arizona-the-van-buren-2027-04-18-8-pm/concert/18591375 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | john-mayer | verify (applied) | 18626617 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 | - |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | hazlett | verify (applied) | 18311905 | https://seatgeek.com/hazlett-tickets/charlotte-north-carolina-neighborhood-theatre-2027-04-19-8-pm/concert/18311905 | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | a-perfect-circle | verify (applied) | 18632505 | https://seatgeek.com/a-perfect-circle-tickets/winnipeg-canada-canada-life-centre-2027-04-19-7-30-pm/concert/18632505 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | haiden-henderson | verify (applied) | 18613187 | https://seatgeek.com/haiden-henderson-tickets/washington-district-of-columbia-the-atlantis-2027-04-20-6-30-pm/concert/18613187 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | ha-ash | verify (applied) | 18608865 | https://seatgeek.com/ha-ash-tickets/toronto-canada-meridian-hall-2027-04-20-8-pm/concert/18608865 | - |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | def-leppard | verify (applied) | 18662407 | https://seatgeek.com/def-leppard-tickets/mobile-alabama-mobile-civic-center-arena-2027-04-20-7-pm/concert/18662407 | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | saint-levant | verify (applied) | 18386196 | https://seatgeek.com/saint-levant-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2027-04-20-8-pm/concert/18386196 | - |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | hazlett | verify (applied) | 18311798 | https://seatgeek.com/hazlett-tickets/charlottesville-virginia-jefferson-theater-charlottesville-va-2027-04-20-8-pm/concert/18311798 | - |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | lola-young | verify (applied) | 18649710 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-20-7-30-pm/concert/18649710 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | the-interrupters | verify (applied) | 18613147 | https://seatgeek.com/the-interrupters-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-21-6-pm/concert/18613147 | - |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | foy-vance | verify (applied) | 18084267 | https://seatgeek.com/foy-vance-tickets/toronto-canada-the-danforth-music-hall-2027-04-21-7-pm/concert/18084267 | - |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | nothing-but-thieves | verify (applied) | 18266368 | https://seatgeek.com/nothing-but-thieves-tickets/toronto-canada-massey-hall-2027-04-21-8-pm/concert/18266368 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-saint-levant-2027-houston-g5diz_clj5bta | saint-levant | verify (applied) | 18386202 | https://seatgeek.com/saint-levant-tickets/houston-texas-bayou-music-center-2027-04-21-8-pm/concert/18386202 | - |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | meshuggah | verify (applied) | 18724675 | https://seatgeek.com/meshuggah-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-21-7-pm/concert/18724675 | - |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | warren-zeiders | verify (applied) | 18649760 | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 | - |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | ha-ash | verify (applied) | 18608840 | https://seatgeek.com/ha-ash-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-22-8-pm/concert/18608840 | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | haiden-henderson | verify (applied) | 18613099 | https://seatgeek.com/haiden-henderson-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-04-22-8-pm/concert/18613099 | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | a-perfect-circle | verify (applied) | 18632509 | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-22-7-pm/concert/18632509 | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | fontaines-d-c | verify (applied) | 18658875 | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-22-8-pm/concert/18658875 | - |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | def-leppard | verify (applied) | 18662406 | https://seatgeek.com/def-leppard-tickets/wichita-kansas-intrust-bank-arena-2027-04-22-7-pm/concert/18662406 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
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
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | calvin-harris | verify (applied) | 18674838 | https://seatgeek.com/calvin-harris-tickets/houston-texas-toyota-center-2027-04-23-8-pm/concert/18674838 | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | the-warning | verify (applied) | 18590298 | https://seatgeek.com/the-warning-tickets/seattle-washington-moore-theatre-seattle-2027-04-23-8-pm/concert/18590298 | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | fantasia | verify (applied) | 18629227 | https://seatgeek.com/fantasia-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-23-8-pm/concert/18629227 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | haiden-henderson | verify (applied) | 18613146 | https://seatgeek.com/haiden-henderson-tickets/boston-massachusetts-big-night-live-2027-04-24-6-pm/concert/18613146 | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | fontaines-d-c | verify (applied) | 18642821 | https://seatgeek.com/fontaines-d-c-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-04-24-7-pm/concert/18642821 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-the-neighbourhood-2027-boston-vv1avzk4_gkdekcqu | the-neighbourhood | verify (applied) | 18726904 | https://seatgeek.com/the-neighbourhood-tickets/boston-massachusetts-td-garden-2027-04-24-7-pm/concert/18726904 | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | the-psychedelic-furs | verify (applied) | 18592683 | https://seatgeek.com/the-psychedelic-furs-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-04-24-8-pm/concert/18592683 | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | warren-zeiders | verify (applied) | 18649764 | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 | - |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | def-leppard | verify (applied) | 18662408 | https://seatgeek.com/def-leppard-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-24-7-pm/concert/18662408 | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | the-interrupters | verify (applied) | 18613135 | https://seatgeek.com/the-interrupters-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-24-6-30-pm/concert/18613135 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | mei-semones | verify (applied) | 18637391 | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 | - |
| tm-mercyme-2027-canton-vv17fz_fgkw2un6n | mercyme | verify (applied) | 18692284 | https://seatgeek.com/mercyme-tickets/canton-ohio-canton-civic-center-canton-oh-2027-05-01-7-pm/concert/18692284 | - |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | meshuggah | verify (applied) | 18724684 | https://seatgeek.com/meshuggah-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-05-01-7-pm/concert/18724684 | - |
| tm-mercyme-2027-evansville-vv17fz_fgkwdo5qw | mercyme | verify (applied) | 18692285 | https://seatgeek.com/mercyme-tickets/evansville-indiana-ford-center-in-2027-05-02-7-pm/concert/18692285 | - |
| tm-queens-of-the-stone-age-2027-oakland-g5vyz_4k7itnp | queens-of-the-stone-age | verify (applied) | 18709212 | https://seatgeek.com/queens-of-the-stone-age-tickets/oakland-california-oakland-arena-2027-05-04-6-30-pm/concert/18709212 | - |
| tm-queens-of-the-stone-age-2027-sacramento-g5vyz_4paibie | queens-of-the-stone-age | verify (applied) | 18709213 | https://seatgeek.com/queens-of-the-stone-age-tickets/sacramento-california-golden-1-center-2027-05-05-6-30-pm/concert/18709213 | - |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | two-door-cinema-club | verify (applied) | 18711333 | https://seatgeek.com/two-door-cinema-club-tickets/chicago-illinois-riviera-theatre-chicago-2027-05-06-7-30-pm/concert/18711333 | - |
| tm-queens-of-the-stone-age-2027-seattle-vvg1hz_43n59ay | queens-of-the-stone-age | verify (applied) | 18709214 | https://seatgeek.com/queens-of-the-stone-age-tickets/seattle-washington-climate-pledge-arena-2027-05-07-6-30-pm/concert/18709214 | - |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | meshuggah | verify (applied) | 18709209 | https://seatgeek.com/meshuggah-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2027-05-09-7-pm/concert/18709209 | - |
| tm-queens-of-the-stone-age-2027-portland-vvg1hz_42zzik2 | queens-of-the-stone-age | verify (applied) | 18709215 | https://seatgeek.com/queens-of-the-stone-age-tickets/portland-oregon-moda-center-2027-05-09-6-30-pm/concert/18709215 | - |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | remi-wolf | verify (applied) | 18664784 | https://seatgeek.com/remi-wolf-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-10-8-pm/concert/18664784 | - |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | queens-of-the-stone-age | verify (applied) | 18475187 | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | remi-wolf | verify (applied) | 18664787 | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | two-door-cinema-club | verify (applied) | 18711220 | https://seatgeek.com/two-door-cinema-club-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-11-7-30-pm/concert/18711220 | - |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | queens-of-the-stone-age | verify (applied) | 18709238 | https://seatgeek.com/queens-of-the-stone-age-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-12-6-30-pm/concert/18709238 | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | remi-wolf | verify (applied) | 18664791 | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 | - |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | queens-of-the-stone-age | verify (applied) | 18701766 | https://seatgeek.com/queens-of-the-stone-age-tickets/saint-paul-minnesota-grand-casino-arena-2027-05-14-6-30-pm/concert/18701766 | - |
| tm-queens-of-the-stone-age-2027-milwaukee-vv1a6zk4kgkdc_par | queens-of-the-stone-age | verify (applied) | 18709222 | https://seatgeek.com/queens-of-the-stone-age-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-05-15-6-30-pm/concert/18709222 | - |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | remi-wolf | verify (applied) | 18664789 | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 | - |
| tm-blondshell-2027-cleveland-vv1aazk4pgkduzdwy | blondshell | verify (applied) | 18738820 | https://seatgeek.com/blondshell-tickets/cleveland-ohio-the-odeon-concert-club-2027-05-18-8-pm/concert/18738820 | - |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | verify (applied) | 18271150 | https://seatgeek.com/the-airborne-toxic-event-tickets/glenside-pennsylvania-keswick-theatre-2027-05-19-8-pm/concert/18271150 | - |
| tm-remi-wolf-2027-bonner-g5vzz_flaijvz | remi-wolf | verify (applied) | 18664792 | https://seatgeek.com/remi-wolf-tickets/bonner-montana-kettlehouse-amphitheater-2027-05-19-8-pm/concert/18664792 | - |
| tm-jon-pardi-2027-west-valley-city-g5vzz_2evjpcf | jon-pardi | verify (applied) | 18390278 | https://seatgeek.com/jon-pardi-tickets/west-valley-city-utah-maverik-center-2027-05-20-7-pm/concert/18390278 | - |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | hazlett | verify (applied) | 18319961 | https://seatgeek.com/hazlett-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-05-21-7-30-pm/concert/18319961 | - |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | remi-wolf | verify (applied) | 18664793 | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 | - |
| tm-remi-wolf-2027-seattle-vvg1hz_fqhwypl | remi-wolf | verify (applied) | 18664798 | https://seatgeek.com/remi-wolf-tickets/seattle-washington-wamu-theater-2027-05-22-8-pm/concert/18664798 | - |
| tm-air-supply-2027-saint-louis-vv1akzkftgkdvwrkv | air-supply | verify (applied) | 18653998 | https://seatgeek.com/air-supply-tickets/saint-louis-missouri-river-city-casino-2027-05-23-7-pm/concert/18653998 | - |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | two-door-cinema-club | verify (applied) | 18711344 | https://seatgeek.com/two-door-cinema-club-tickets/austin-texas-united-heritage-hall-2027-05-27-8-pm/concert/18711344 | - |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | two-door-cinema-club | verify (applied) | 18711349 | https://seatgeek.com/two-door-cinema-club-tickets/dallas-texas-the-bomb-factory-dallas-2027-05-29-8-pm/concert/18711349 | - |
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | death-cab-for-cutie | verify (applied) | 18715561 | https://seatgeek.com/death-cab-for-cutie-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-08-7-pm/concert/18715561 | - |
| tm-sienna-spiro-2027-nashville-z7r9jz1aa7bjy | sienna-spiro | verify (applied) | 18702009 | https://seatgeek.com/sienna-spiro-tickets/nashville-tennessee-grand-ole-opry-house-2027-08-08-7-pm/concert/18702009 | - |
| tm-rod-stewart-2027-lincoln-g5vyz_4ho4bgw | rod-stewart | verify (applied) | 18726699 | https://seatgeek.com/rod-stewart-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2027-08-14-8-pm/concert/18726699 | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvcqcl | the-red-clay-strays | verify (applied) | 18723980 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-20-6-30-pm/concert/18723980 | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2gaje | oasis | verify (applied) | 18589078 | https://seatgeek.com/oasis-tickets/las-vegas-nevada-allegiant-stadium-2027-08-21-7-pm/concert/18589078 | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2u_jk | oasis | verify (applied) | 18589081 | https://seatgeek.com/oasis-tickets/las-vegas-nevada-allegiant-stadium-2027-08-24-7-pm/concert/18589081 | - |
| tm-kenny-chesney-2027-foxborough-vv177z_3gkt1lkmv | kenny-chesney | verify (applied) | 18608957 | https://seatgeek.com/kenny-chesney-tickets/foxborough-massachusetts-gillette-stadium-2027-08-27-4-30-pm/concert/18608957 | - |
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
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18200018 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18257241 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18243411 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18297303 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18626682 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18140310 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | verify (applied) | 18391931 | https://seatgeek.com/trivium-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-06-6-30-pm/concert/18391931 | - |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | verify (applied) | 18200019 | https://seatgeek.com/the-red-clay-strays-tickets/bossier-city-louisiana-brookshire-grocery-arena-2026-11-06-6-30-pm/concert/18200019 | - |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | verify (applied) | 18237194 | https://seatgeek.com/journey-tickets/wilkes-barre-pennsylvania-mohegan-sun-arena-at-casey-plaza-2026-11-06-7-30-pm/concert/18237194 | - |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | verify (applied) | 18355665 | https://seatgeek.com/air-supply-tickets/easton-pennsylvania-state-theatre-easton-2026-11-06-7-30-pm/concert/18355665 | - |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | verify (applied) | 18147866 | https://seatgeek.com/blue-october-tickets/albany-new-york-hart-theatre-at-the-egg-2026-11-06-7-pm/concert/18147866 | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | verify (applied) | 18390332 | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 | - |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | verify (applied) | 18345772 | https://seatgeek.com/dinosaur-jr-tickets/san-antonio-texas-paper-tiger-san-antonio-2026-11-06-8-pm/concert/18345772 | - |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | verify (applied) | 17938858 | https://seatgeek.com/mana-tickets/houston-texas-toyota-center-2026-11-06-8-30-pm/concert/17938858 | - |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | verify (applied) | 18629796 | https://seatgeek.com/beck-tickets/spokane-washington-first-interstate-center-for-the-arts-2026-11-06-7-30-pm/concert/18629796 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | verify (applied) | 18085658 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-06-8-pm/concert/18085658 | - |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | verify (applied) | 18319859 | https://seatgeek.com/brand-new-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-11-06-8-pm/concert/18319859 | - |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | verify (applied) | 18392100 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-06-8-pm/concert/18392100 | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | verify (applied) | 18391256 | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | verify (applied) | 18391935 | https://seatgeek.com/trivium-tickets/louisville-kentucky-old-forester-s-paristown-hall-2026-11-07-6-35-pm/concert/18391935 | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | verify (applied) | 18147873 | https://seatgeek.com/blue-october-tickets/cleveland-ohio-agora-theatre-2026-11-07-7-pm/concert/18147873 | - |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | verify (applied) | 18243415 | https://seatgeek.com/mercyme-tickets/springfield-missouri-great-southern-bank-arena-2026-11-07-7-pm/concert/18243415 | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | verify (applied) | 17769336 | https://seatgeek.com/doja-cat-tickets/houston-texas-toyota-center-2026-11-07-7-30-pm/concert/17769336 | - |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | verify (applied) | 18531269 | https://seatgeek.com/ye-tickets/arlington-texas-at-t-stadium-2026-11-07-8-pm/concert/18531269 | - |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | verify (applied) | 18556120 | https://seatgeek.com/victoria-monet-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-07-8-pm/concert/18556120 | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | verify (applied) | 18318283 | https://seatgeek.com/sienna-spiro-tickets/portland-oregon-mcmenamins-crystal-ballroom-2026-11-07-8-pm/concert/18318283 | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | verify (applied) | 18085660 | https://seatgeek.com/foy-vance-tickets/los-angeles-california-el-rey-theatre-los-angeles-2026-11-07-8-pm/concert/18085660 | - |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | verify (applied) | 18316805 | https://seatgeek.com/daughtry-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-07-7-pm/concert/18316805 | - |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | verify (applied) | 18392092 | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-07-8-pm/concert/18392092 | - |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | verify (applied) | 17732672 | https://seatgeek.com/sabaton-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-08-7-pm/concert/17732672 | - |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | verify (applied) | 18571665 | https://seatgeek.com/jonas-brothers-tickets/houston-texas-toyota-center-2026-11-08-7-30-pm/concert/18571665 | - |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | verify (applied) | 18485941 | https://seatgeek.com/steve-lacy-tickets/sugar-land-texas-smart-financial-centre-2026-11-08-8-pm/concert/18485941 | - |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | verify (applied) | 18085646 | https://seatgeek.com/foy-vance-tickets/san-francisco-california-great-american-music-hall-2026-11-08-7-pm/concert/18085646 | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | verify (applied) | 18506093 | https://seatgeek.com/pentatonix-tickets/bozeman-montana-brick-breeden-fieldhouse-2026-11-09-7-pm/concert/18506093 | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | verify (applied) | 18085699 | https://seatgeek.com/foy-vance-tickets/portland-oregon-aladdin-theater-2026-11-10-7-pm/concert/18085699 | - |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | verify (applied) | 18194387 | https://seatgeek.com/beck-tickets/portland-oregon-keller-auditorium-2026-11-10-8-pm/concert/18194387 | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | verify (applied) | 18391936 | https://seatgeek.com/trivium-tickets/new-haven-connecticut-college-street-music-hall-2026-11-11-6-35-pm/concert/18391936 | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | verify (applied) | 18147874 | https://seatgeek.com/blue-october-tickets/north-tonawanda-new-york-riviera-theatre-north-tonawanda-2026-11-11-7-pm/concert/18147874 | - |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | verify (applied) | 18316812 | https://seatgeek.com/daughtry-tickets/tucson-arizona-fox-tucson-theatre-2026-11-11-7-pm/concert/18316812 | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | verify (applied) | 18373510 | https://seatgeek.com/michelle-branch-tickets/minneapolis-minnesota-first-avenue-minneapolis-2026-11-11-7-30-pm/concert/18373510 | - |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | verify (applied) | 18485943 | https://seatgeek.com/steve-lacy-tickets/morrison-colorado-red-rocks-amphitheatre-2026-11-11-8-pm/concert/18485943 | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | verify (applied) | 18391943 | https://seatgeek.com/trivium-tickets/new-york-new-york-terminal-5-2026-11-12-6-35-pm/concert/18391943 | - |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | verify (applied) | 18219942 | https://seatgeek.com/journey-tickets/cleveland-ohio-rocket-arena-2026-11-12-7-30-pm/concert/18219942 | - |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | sleeping-with-sirens | verify (applied) | 18327312 | https://seatgeek.com/sleeping-with-sirens-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-12-7-30-pm/concert/18327312 | - |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | foy-vance | verify (applied) | 18387640 | https://seatgeek.com/foy-vance-tickets/vancouver-canada-hollywood-theatre-vancouver-2026-11-12-7-pm/concert/18387640 | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | verify (applied) | 18373511 | https://seatgeek.com/michelle-branch-tickets/milwaukee-wisconsin-pabst-theater-2026-11-12-8-pm/concert/18373511 | - |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | verify (applied) | 18131599 | https://seatgeek.com/gavin-adcock-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-11-13-6-pm/concert/18131599 | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | verify (applied) | 18157641 | https://seatgeek.com/sombr-tickets/cleveland-ohio-rocket-arena-2026-11-13-7-30-pm/concert/18157641 | - |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | verify (applied) | 18253089 | https://seatgeek.com/beartooth-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-13-6-pm/concert/18253089 | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | verify (applied) | 18322791 | https://seatgeek.com/amble-tickets/atlanta-georgia-terminal-west-2026-11-13-8-pm/concert/18322791 | - |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | verify (applied) | 18734186 | https://seatgeek.com/too-many-zooz-tickets/buffalo-new-york-asbury-hall-buffalo-2026-11-13-8-pm/concert/18734186 | - |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | verify (applied) | 18637121 | https://seatgeek.com/black-stone-cherry-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-11-13-8-pm/concert/18637121 | - |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | verify (applied) | 18185177 | https://seatgeek.com/teddy-swims-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-13-7-pm/concert/18185177 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | verify (applied) | 18391945 | https://seatgeek.com/trivium-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-11-14-6-35-pm/concert/18391945 | - |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | verify (applied) | 18131598 | https://seatgeek.com/gavin-adcock-tickets/grand-rapids-michigan-van-andel-arena-2026-11-14-7-pm/concert/18131598 | - |
| tm-jodeci-2026-cleveland-z7r9jz1aaed_7 | jodeci | verify (applied) | 18407250 | https://seatgeek.com/jodeci-tickets/cleveland-ohio-keybank-state-theatre-at-playhouse-square-2026-11-14-8-pm/concert/18407250 | - |
| tm-mercyme-2026-kansas-city-z7r9jz1a70nek | mercyme | verify (applied) | 18243423 | https://seatgeek.com/mercyme-tickets/kansas-city-missouri-t-mobile-center-2026-11-14-7-pm/concert/18243423 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | verify (applied) | 18312360 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-14-8-pm/concert/18312360 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | verify (applied) | 18626684 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-14-8-pm/concert/18626684 | - |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | three-days-grace | verify (applied) | 17895168 | https://seatgeek.com/three-days-grace-tickets/nampa-idaho-ford-idaho-center-2026-11-14-7-pm/concert/17895168 | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | verify (applied) | 18185180 | https://seatgeek.com/teddy-swims-tickets/las-vegas-nevada-t-mobile-arena-2026-11-14-7-pm/concert/18185180 | - |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | verify (applied) | 18240153 | https://seatgeek.com/katseye-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-14-8-pm/concert/18240153 | - |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | los-tigres-del-norte | verify (applied) | 18100396 | https://seatgeek.com/los-tigres-del-norte-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-14-8-pm/concert/18100396 | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | verify (applied) | 18391947 | https://seatgeek.com/trivium-tickets/worcester-massachusetts-the-palladium-2026-11-15-6-35-pm/concert/18391947 | - |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | verify (applied) | 18269141 | https://seatgeek.com/stella-lefty-tickets/new-york-new-york-webster-hall-2026-11-15-8-pm/concert/18269141 | - |
| tm-mercyme-2026-minneapolis-z7r9jz1a70nz6 | mercyme | verify (applied) | 18243425 | https://seatgeek.com/mercyme-tickets/minneapolis-minnesota-target-center-2026-11-15-7-pm/concert/18243425 | - |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | verify (applied) | 18312361 | https://seatgeek.com/rod-wave-tickets/sunrise-florida-amerant-bank-arena-2026-11-15-8-pm/concert/18312361 | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | verify (applied) | 18626686 | https://seatgeek.com/brandi-carlile-tickets/milwaukee-wisconsin-pabst-theater-2026-11-15-8-pm/concert/18626686 | - |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | three-days-grace | verify (applied) | 17895171 | https://seatgeek.com/three-days-grace-tickets/spokane-washington-numerica-veterans-arena-2026-11-15-7-pm/concert/17895171 | - |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | verify (applied) | 18310993 | https://seatgeek.com/the-psychedelic-furs-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2026-11-16-8-pm/concert/18310993 | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | verify (applied) | 18253466 | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-royale-boston-2026-11-17-8-pm/concert/18253466 | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | verify (applied) | 18253081 | https://seatgeek.com/beartooth-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-18-6-pm/concert/18253081 | - |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | verify (applied) | 18237193 | https://seatgeek.com/journey-tickets/houston-texas-toyota-center-2026-11-18-7-30-pm/concert/18237193 | - |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | black-stone-cherry | verify (applied) | 18637126 | https://seatgeek.com/black-stone-cherry-tickets/omaha-nebraska-the-waiting-room-omaha-2026-11-18-8-pm/concert/18637126 | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | verify (applied) | 18573353 | https://seatgeek.com/trans-siberian-orchestra-tickets/green-bay-wisconsin-resch-center-2026-11-19-2-30-pm/concert/18573353 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | verify (applied) | 18208621 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-19-7-pm/concert/18208621 | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | verify (applied) | 18385717 | https://seatgeek.com/pentatonix-tickets/cleveland-ohio-rocket-arena-2026-11-19-7-pm/concert/18385717 | - |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | verify (applied) | 18572536 | https://seatgeek.com/too-many-zooz-tickets/ottawa-canada-overflow-brewing-company-2026-11-19-7-30-pm/concert/18572536 | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | verify (applied) | 18147875 | https://seatgeek.com/blue-october-tickets/jacksonville-florida-five-jacksonville-2026-11-19-7-pm/concert/18147875 | - |
| tm-air-supply-2026-orlando-z7r9jz1aazdae | air-supply | verify (applied) | 18355666 | https://seatgeek.com/air-supply-tickets/orlando-florida-dr-phillips-center-for-performing-arts-2026-11-19-8-pm/concert/18355666 | - |
| tm-jodeci-2026-bensalem-z7r9jz1aaz98b | jodeci | verify (applied) | 18407255 | https://seatgeek.com/jodeci-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-11-19-8-pm/concert/18407255 | - |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | verify (applied) | 18092700 | https://seatgeek.com/the-psychedelic-furs-tickets/phoenix-arizona-celebrity-theatre-phoenix-2026-11-19-7-30-pm/concert/18092700 | - |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | verify (applied) | 18391950 | https://seatgeek.com/trivium-tickets/royal-oak-michigan-royal-oak-music-theatre-2026-11-20-6-35-pm/concert/18391950 | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | verify (applied) | 18208620 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | verify (applied) | 18147876 | https://seatgeek.com/blue-october-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-20-7-pm/concert/18147876 | - |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | los-tigres-del-norte | verify (applied) | 17573295 | https://seatgeek.com/los-tigres-del-norte-tickets/columbus-ohio-palace-theatre-columbus-2026-11-20-8-pm/concert/17573295 | - |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | zac-brown-band | verify (applied) | 18032035 | https://seatgeek.com/zac-brown-band-tickets/des-moines-iowa-casey-s-center-2026-11-20-7-pm/concert/18032035 | - |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | gary-allan | verify (applied) | 18391791 | https://seatgeek.com/gary-allan-tickets/lake-charles-louisiana-grand-event-center-golden-nugget-lake-charles-2026-11-20-8-30-pm/concert/18391791 | - |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | verify (applied) | 18337370 | https://seatgeek.com/dylan-gossett-tickets/apopka-florida-apopka-amphitheater-2026-11-21-6-pm/concert/18337370 | - |
| tm-air-supply-2026-clearwater-z7r9jz1a7paou | air-supply | verify (applied) | 18289135 | https://seatgeek.com/air-supply-tickets/clearwater-florida-ruth-eckerd-hall-2026-11-21-8-pm/concert/18289135 | - |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | verify (applied) | 18085728 | https://seatgeek.com/foy-vance-tickets/englewood-colorado-gothic-theatre-2026-11-21-7-pm/concert/18085728 | - |
| tm-ye-2026-glendale-z7r9jz1aav08u | ye | verify (applied) | 18549330 | https://seatgeek.com/ye-tickets/glendale-arizona-state-farm-stadium-2026-11-21-8-30-pm/concert/18549330 | - |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9um | calvin-harris | verify (applied) | 18701919 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-11-21-10-30-pm/concert/18701919 | - |
| tm-dom-dolla-2026-las-vegas-z7r9jz1a7p3c3 | dom-dolla | verify (applied) | 18598936 | https://seatgeek.com/dom-dolla-tickets/las-vegas-nevada-liv-nightclub-las-vegas-2026-11-21-10-30-pm/concert/18598936 | - |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | trans-siberian-orchestra | verify (applied) | 18573367 | https://seatgeek.com/trans-siberian-orchestra-tickets/colorado-springs-colorado-broadmoor-world-arena-2026-11-22-2-30-pm/concert/18573367 | - |
| tm-air-supply-2026-jacksonville-z7r9jz1a70eoz | air-supply | verify (applied) | 18355667 | https://seatgeek.com/air-supply-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-11-22-7-pm/concert/18355667 | - |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | trans-siberian-orchestra | verify (applied) | 18499779 | https://seatgeek.com/trans-siberian-orchestra-tickets/salt-lake-city-utah-delta-center-1-2026-11-24-3-pm/concert/18499779 | - |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | trivium | verify (applied) | 18391959 | https://seatgeek.com/trivium-tickets/nashville-tennessee-the-pinnacle-nashville-2026-11-24-6-35-pm/concert/18391959 | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | trivium | verify (applied) | 18391961 | https://seatgeek.com/trivium-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-11-27-6-35-pm/concert/18391961 | - |
| tm-jodeci-2026-thackerville-z7r9jz1aaz3ae | jodeci | verify (applied) | 18395809 | https://seatgeek.com/jodeci-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-11-27-8-pm/concert/18395809 | - |
| tm-journey-2026-las-vegas-z7r9jz1a70_7f | journey | verify (applied) | 18237195 | https://seatgeek.com/journey-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-27-7-30-pm/concert/18237195 | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | cristian-castro | verify (applied) | 18082276 | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 | - |
| tm-jodeci-2026-norman-z7r9jz1aaed_m | jodeci | verify (applied) | 18350138 | https://seatgeek.com/jodeci-tickets/norman-oklahoma-riverwind-casino-2026-11-28-8-pm/concert/18350138 | - |
| tm-jonas-brothers-2026-las-vegas-z7r9jz1aazwb_ | jonas-brothers | verify (applied) | 18503912 | https://seatgeek.com/jonas-brothers-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-11-28-7-30-pm/concert/18503912 | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | cristian-castro | verify (applied) | 18077764 | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | phil-wickham | verify (applied) | 18694094 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-11-30-7-pm/concert/18694094 | - |
| tm-lord-huron-2026-nashville-z7r9jz1aazbfy | lord-huron | verify (applied) | 18421956 | https://seatgeek.com/lord-huron-tickets/nashville-tennessee-ryman-auditorium-2026-12-01-8-pm/concert/18421956 | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | phil-wickham | verify (applied) | 18694095 | https://seatgeek.com/phil-wickham-tickets/fontana-california-water-of-life-community-church-2026-12-01-7-pm/concert/18694095 | - |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | beartooth | verify (applied) | 18253058 | https://seatgeek.com/beartooth-tickets/charleston-south-carolina-the-refinery-charleston-2026-12-02-6-30-pm/concert/18253058 | - |
| tm-jodeci-2026-new-orleans-z7r9jz1aazk_o | jodeci | verify (applied) | 18406111 | https://seatgeek.com/jodeci-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2026-12-02-7-30-pm/concert/18406111 | - |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | koe-wetzel | verify (applied) | 18649773 | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | victoria-monet | verify (applied) | 18579809 | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | blue-october | verify (applied) | 18147878 | https://seatgeek.com/blue-october-tickets/kansas-city-missouri-the-midland-theatre-mo-2026-12-03-7-pm/concert/18147878 | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | trivium | verify (applied) | 18391971 | https://seatgeek.com/trivium-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-12-03-6-30-pm/concert/18391971 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | phil-wickham | verify (applied) | 18694097 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-03-7-pm/concert/18694097 | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | beartooth | verify (applied) | 18253061 | https://seatgeek.com/beartooth-tickets/saint-augustine-florida-st-augustine-amphitheatre-2026-12-04-6-pm/concert/18253061 | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | koe-wetzel | verify (applied) | 18649774 | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 | - |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | trans-siberian-orchestra | verify (applied) | 18573413 | https://seatgeek.com/trans-siberian-orchestra-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-12-04-7-pm/concert/18573413 | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | phil-wickham | verify (applied) | 18694096 | https://seatgeek.com/phil-wickham-tickets/san-diego-california-maranatha-chapel-2026-12-04-7-pm/concert/18694096 | - |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | trans-siberian-orchestra | verify (applied) | 18573414 | https://seatgeek.com/trans-siberian-orchestra-tickets/ontario-california-toyota-arena-ontario-2026-12-05-3-pm/concert/18573414 | - |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | beartooth | verify (applied) | 18235668 | https://seatgeek.com/beartooth-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-05-6-30-pm/concert/18235668 | - |
| tm-lord-huron-2026-detroit-z7r9jz1aazpf4 | lord-huron | verify (applied) | 18421959 | https://seatgeek.com/lord-huron-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2026-12-05-6-30-pm/concert/18421959 | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | koe-wetzel | verify (applied) | 18649776 | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 | - |
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | a-boogie-wit-da-hoodie | verify (applied) | 18662770 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/orlando-florida-central-florida-fairgrounds-2026-12-05-8-pm/concert/18662770 | - |
| tm-black-stone-cherry-2026-hartford-z7r9jz1aaea0z | black-stone-cherry | verify (applied) | 18637149 | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-webster-underground-hartford-2026-12-05-8-pm/concert/18637149 | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | the-red-clay-strays | verify (applied) | 18257194 | https://seatgeek.com/the-red-clay-strays-tickets/las-vegas-nevada-mgm-grand-garden-arena-2026-12-05-6-30-pm/concert/18257194 | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | tommy-emmanuel | verify (applied) | 18225197 | https://seatgeek.com/tommy-emmanuel-tickets/durham-north-carolina-carolina-theatre-durham-2026-12-06-8-pm/concert/18225197 | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | phil-wickham | verify (applied) | 18694098 | https://seatgeek.com/phil-wickham-tickets/downey-california-calvary-chapel-of-downey-2026-12-06-6-pm/concert/18694098 | - |
| tm-gary-allan-2026-bakersfield-z7r9jz1aae3j4 | gary-allan | verify (applied) | 18639145 | https://seatgeek.com/gary-allan-tickets/bakersfield-california-historic-bakersfield-fox-theater-2026-12-06-7-pm/concert/18639145 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | riley-green | verify (applied) | 18282384 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-06-8-30-pm/concert/18282384 | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | jonas-brothers | verify (applied) | 18471182 | https://seatgeek.com/jonas-brothers-tickets/salt-lake-city-utah-delta-center-1-2026-12-07-7-30-pm/concert/18471182 | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | trivium | verify (applied) | 18391977 | https://seatgeek.com/trivium-tickets/penticton-canada-penticton-trade-convention-centre-2026-12-07-6-35-pm/concert/18391977 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | little-big-town | verify (applied) | 18385970 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | beartooth | verify (applied) | 18253063 | https://seatgeek.com/beartooth-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-09-6-30-pm/concert/18253063 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | verify (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | little-big-town | verify (applied) | 18385972 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | blue-october | verify (applied) | 18147877 | https://seatgeek.com/blue-october-tickets/little-rock-arkansas-the-hall-little-rock-2026-12-09-7-pm/concert/18147877 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | pink-martini | verify (applied) | 18701980 | https://seatgeek.com/pink-martini-tickets/fairfax-virginia-center-for-the-arts-george-mason-university-2026-12-10-7-30-pm/concert/18701980 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | little-big-town | verify (applied) | 18385974 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | riley-green | verify (applied) | 18282386 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-10-8-30-pm/concert/18282386 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | trans-siberian-orchestra | verify (applied) | 18573440 | https://seatgeek.com/trans-siberian-orchestra-tickets/houston-texas-toyota-center-2026-12-11-3-pm/concert/18573440 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | blue-october | verify (applied) | 18147885 | https://seatgeek.com/blue-october-tickets/austin-texas-bass-concert-hall-2026-12-11-7-pm/concert/18147885 | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | brent-faiyaz | verify (applied) | 18619390 | https://seatgeek.com/brent-faiyaz-tickets/los-angeles-california-crypto-com-arena-2026-12-11-8-pm/concert/18619390 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | black-stone-cherry | verify (applied) | 18637158 | https://seatgeek.com/black-stone-cherry-tickets/columbus-ohio-the-king-of-clubs-oh-2026-12-12-5-30-pm/concert/18637158 | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | sabaton | verify (applied) | 17726761 | https://seatgeek.com/sabaton-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-12-7-pm/concert/17726761 | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | pink-martini | verify (applied) | 18670209 | https://seatgeek.com/pink-martini-tickets/lebanon-new-hampshire-lebanon-opera-house-2026-12-12-7-30-pm/concert/18670209 | - |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | lady-a | verify (applied) | 18295863 | https://seatgeek.com/lady-a-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2026-12-12-7-30-pm/concert/18295863 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | janet-jackson | verify (applied) | 18443314 | https://seatgeek.com/janet-jackson-tickets/sunrise-florida-amerant-bank-arena-2026-12-12-8-pm/concert/18443314 | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | blue-october | verify (applied) | 18142024 | https://seatgeek.com/blue-october-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-12-12-8-pm/concert/18142024 | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | jodeci | verify (applied) | 18407288 | https://seatgeek.com/jodeci-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-12-15-8-pm/concert/18407288 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | verify (applied) | 18668809 | https://seatgeek.com/pink-martini-tickets/boston-massachusetts-berklee-performance-center-2026-12-18-8-pm/concert/18668809 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | lord-huron | verify (applied) | 18421979 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-18-8-pm/concert/18421979 | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | lady-a | verify (applied) | 18353855 | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | a-boogie-wit-da-hoodie | verify (applied) | 18639406 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/hartford-connecticut-peoplesbank-arena-2026-12-19-8-pm/concert/18639406 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | lord-huron | verify (applied) | 18421980 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-19-8-pm/concert/18421980 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | lady-a | verify (applied) | 18295865 | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | post-malone | verify (applied) | 18414663 | https://seatgeek.com/post-malone-tickets/salt-lake-city-utah-delta-center-1-2026-12-31-10-pm/concert/18414663 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | lord-huron | verify (applied) | 18421984 | https://seatgeek.com/lord-huron-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2027-01-02-8-pm/concert/18421984 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | verify (applied) | 18659747 | https://seatgeek.com/pink-martini-tickets/fort-worth-texas-bass-performance-hall-2027-01-08-7-30-pm/concert/18659747 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
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
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | air-supply | verify (applied) | 18355670 | https://seatgeek.com/air-supply-tickets/sarasota-florida-van-wezel-performing-arts-hall-2027-01-24-7-pm/concert/18355670 | - |
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
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | verify (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | verify (applied) | 18696397 | https://seatgeek.com/valley-tickets/quebec-canada-grizzly-fuzz-2027-02-04-8-pm/concert/18696397 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | dropkick-murphys | verify (applied) | 18633525 | https://seatgeek.com/dropkick-murphys-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-05-7-pm/concert/18633525 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | verify (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | air-supply | verify (applied) | 18200030 | https://seatgeek.com/air-supply-tickets/wisconsin-dells-wisconsin-crystal-grand-music-theatre-2027-02-06-8-pm/concert/18200030 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
| tm-dropkick-murphys-2027-del-mar-rz7hnez1afgypv | dropkick-murphys | verify (applied) | 18633526 | https://seatgeek.com/dropkick-murphys-tickets/del-mar-california-the-sound-del-mar-2027-02-07-7-pm/concert/18633526 | - |
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
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | dropkick-murphys | verify (applied) | 18633528 | https://seatgeek.com/dropkick-murphys-tickets/vancouver-canada-pne-forum-vancouver-2027-02-12-7-pm/concert/18633528 | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | blue-october | verify (applied) | 18653247 | https://seatgeek.com/blue-october-tickets/ventura-california-the-majestic-ventura-theater-2027-02-12-8-pm/concert/18653247 | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | dropkick-murphys | verify (applied) | 18633535 | https://seatgeek.com/dropkick-murphys-tickets/penticton-canada-penticton-trade-convention-centre-2027-02-13-7-pm/concert/18633535 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | meshuggah | verify (applied) | 18724637 | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | the-lemonheads | verify (applied) | 18595314 | https://seatgeek.com/the-lemonheads-tickets/miami-florida-las-rosas-2027-02-17-7-pm/concert/18595314 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | greta-van-fleet | verify (applied) | 18641961 | https://seatgeek.com/greta-van-fleet-tickets/green-bay-wisconsin-resch-center-2027-02-17-7-pm/concert/18641961 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | the-lemonheads | verify (applied) | 18595318 | https://seatgeek.com/the-lemonheads-tickets/orlando-florida-the-abbey-orlando-2027-02-19-7-pm/concert/18595318 | - |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | foreigner | verify (applied) | 18570609 | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 | - |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | air-supply | verify (applied) | 18646927 | https://seatgeek.com/air-supply-tickets/penticton-canada-south-okanagan-events-centre-2027-02-19-6-30-pm/concert/18646927 | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | dinosaur-jr | verify (applied) | 18540442 | https://seatgeek.com/dinosaur-jr-tickets/saint-petersburg-florida-jannus-live-2027-02-20-8-pm/concert/18540442 | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | meshuggah | verify (applied) | 18724639 | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 | - |
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
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | greta-van-fleet | verify (applied) | 18611175 | https://seatgeek.com/greta-van-fleet-tickets/cleveland-ohio-rocket-arena-2027-03-03-7-pm/concert/18611175 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-theory-of-a-deadman-2027-halifax-z7r9jz1aav0ak | theory-of-a-deadman | verify (applied) | 18570534 | https://seatgeek.com/theory-of-a-deadman-tickets/halifax-canada-light-house-arts-centre-2027-03-05-8-pm/concert/18570534 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | verify (applied) | 18717561 | https://seatgeek.com/blue-october-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-05-8-pm/concert/18717561 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | verify (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |
| tm-the-neighbourhood-2027-houston-z7r9jz1aa7ypb | the-neighbourhood | verify (applied) | 18726903 | https://seatgeek.com/the-neighbourhood-tickets/houston-texas-toyota-center-2027-03-06-7-pm/concert/18726903 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | pink-martini | verify (applied) | 18500192 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-06-7-30-pm/concert/18500192 | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | blue-october | verify (applied) | 18262264 | https://seatgeek.com/blue-october-tickets/denver-colorado-mission-ballroom-2027-03-06-8-pm/concert/18262264 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | verify (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-remi-wolf-2027-detroit-z7r9jz1aa7k0m | remi-wolf | verify (applied) | 18664757 | https://seatgeek.com/remi-wolf-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-03-07-7-pm/concert/18664757 | - |
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
| tm-interpol-2027-san-antonio-z7r9jz1aa70ja | interpol | verify (applied) | 18710345 | https://seatgeek.com/interpol-tickets/san-antonio-texas-the-espee-2027-03-18-7-30-pm/concert/18710345 | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | vnv-nation | verify (applied) | 18165972 | https://seatgeek.com/vnv-nation-tickets/mesa-arizona-nile-theater-mesa-2027-03-18-8-pm/concert/18165972 | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | yuridia | verify (applied) | 18570410 | https://seatgeek.com/yuridia-tickets/edinburg-texas-bert-ogden-arena-2027-03-19-8-pm/concert/18570410 | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | hans-zimmer | verify (applied) | 18601968 | https://seatgeek.com/hans-zimmer-tickets/kansas-city-missouri-t-mobile-center-2027-03-19-8-pm/concert/18601968 | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | michelle-branch | verify (applied) | 18508844 | https://seatgeek.com/michelle-branch-tickets/columbus-ohio-kemba-live-2027-03-20-8-pm/concert/18508844 | - |
| tm-interpol-2027-dallas-z7r9jz1aa7sce | interpol | verify (applied) | 18710347 | https://seatgeek.com/interpol-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-20-8-pm/concert/18710347 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | verify (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | michelle-branch | verify (applied) | 18508847 | https://seatgeek.com/michelle-branch-tickets/royal-oak-michigan-royal-oak-music-theatre-2027-03-21-7-pm/concert/18508847 | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | verify (applied) | 18670185 | https://seatgeek.com/pink-martini-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-21-7-30-pm/concert/18670185 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | cece-winans | verify (applied) | 18237649 | https://seatgeek.com/cece-winans-tickets/nashville-tennessee-grand-ole-opry-house-2027-03-21-7-30-pm/concert/18237649 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-theory-of-a-deadman-2027-regina-z7r9jz1aavxpg | theory-of-a-deadman | verify (applied) | 18570554 | https://seatgeek.com/theory-of-a-deadman-tickets/regina-canada-conexus-arts-centre-2027-03-22-8-pm/concert/18570554 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | verify (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | verify (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
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
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | verify (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
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
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | two-door-cinema-club | verify (applied) | 18711341 | https://seatgeek.com/two-door-cinema-club-tickets/del-mar-california-the-sound-del-mar-2027-05-24-7-30-pm/concert/18711341 | - |
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
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-sienna-spiro-2027-atlanta-z7r9jz1aa7oab | sienna-spiro | verify (applied) | 18702010 | https://seatgeek.com/sienna-spiro-tickets/atlanta-georgia-fox-theatre-atlanta-2027-08-10-7-pm/concert/18702010 | - |
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
| tm-lenny-pearce-2026-san-antonio-g5diz_gedaabt | lenny-pearce | clear (applied) | - | - | stored URL failed: SeatGeek /events/18305062 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-little-big-town-2026-virginia-beach-vvg17z_gg7kjfl | little-big-town | clear (applied) | - | - | stored URL failed: SeatGeek /events/18292626 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-air-supply-2026-medford-vv177z_6gkl3s3mj | air-supply | clear (applied) | - | - | stored URL failed: SeatGeek /events/18155216 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-austin-g5diz_uux5j8i | lenny-pearce | verify (applied) | 18305061 | https://seatgeek.com/lenny-pearce-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2026-11-06-6-pm/concert/18305061 | - |
| tm-mercyme-2026-park-city-vvg1bz_135gz80 | mercyme | verify (applied) | 18243412 | https://seatgeek.com/mercyme-tickets/park-city-kansas-heartland-credit-union-arena-2026-11-06-7-pm/concert/18243412 | - |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-irving-vvg1yz_g0p_mts | lenny-pearce | verify (applied) | 18305069 | https://seatgeek.com/lenny-pearce-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-07-5-pm/concert/18305069 | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Tipitinas' vs 'Tipitina's - New Orleans'; no qualifying replacement found |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-houston-g5diz_geaxmd2 | lenny-pearce | verify (applied) | 18305070 | https://seatgeek.com/lenny-pearce-tickets/houston-texas-bayou-music-center-2026-11-08-12-30-pm/concert/18305070 | - |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-orlando-17fov0g6g3w_f1c | lenny-pearce | verify (applied) | 18305071 | https://seatgeek.com/lenny-pearce-tickets/orlando-florida-hard-rock-live-orlando-2026-11-10-6-pm/concert/18305071 | - |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-fort-lauderdale-z7r9jz1a7ppo0 | lenny-pearce | verify (applied) | 18283469 | https://seatgeek.com/lenny-pearce-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-11-6-pm/concert/18283469 | - |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | add (applied) | 18250878 | https://seatgeek.com/don-omar-tickets/las-vegas-nevada-michelob-ultra-arena-at-mandalay-bay-resort-casino-2026-11-11-8-pm/concert/18250878 | - |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | fontaines-d-c | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-victoria-monet-2026-philadelphia-vv1aezkfxgkegbvoj | victoria-monet | verify (applied) | 18579771 | https://seatgeek.com/victoria-monet-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-11-12-8-pm/concert/18579771 | - |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | hans-zimmer | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | lenny-pearce | verify (applied) | 18305101 | https://seatgeek.com/lenny-pearce-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-14-12-30-pm/concert/18305101 | - |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-nashville-z7r9jz1a7p0bp | lenny-pearce | add (applied) | 18305074 | https://seatgeek.com/lenny-pearce-tickets/nashville-tennessee-marathon-music-works-2026-11-15-5-30-pm/concert/18305074 | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | lenny-pearce | add (applied) | 18305106 | https://seatgeek.com/lenny-pearce-tickets/norfolk-virginia-the-norva-norfolk-2026-11-17-6-pm/concert/18305106 | - |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-richmond-z7r9jz1a7ptxv | lenny-pearce | add (applied) | 18305105 | https://seatgeek.com/lenny-pearce-tickets/richmond-virginia-the-national-richmond-2026-11-18-6-pm/concert/18305105 | - |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-pittsburgh-z7r9jz1a7pnqd | lenny-pearce | add (applied) | 18305107 | https://seatgeek.com/lenny-pearce-tickets/pittsburgh-pennsylvania-stage-ae-2026-11-19-6-pm/concert/18305107 | - |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-little-big-town-2026-chicago-vvg1jz_gohfssb | little-big-town | verify (applied) | 18292638 | https://seatgeek.com/little-big-town-tickets/chicago-illinois-the-chicago-theatre-2026-11-19-7-30-pm/concert/18292638 | - |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lenny-pearce-2026-new-york-k7vgf_gmumtdg | lenny-pearce | verify (applied) | 18305081 | https://seatgeek.com/lenny-pearce-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-22-12-30-pm/concert/18305081 | - |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | saint-levant | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-highland-z7r9jz1a7paao | los-tucanes-de-tijuana | verify (applied) | 18288551 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2026-11-24-8-pm/concert/18288551 | - |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-fairfax-17a8v0g61bgdzeq | los-tucanes-de-tijuana | verify (applied) | 18251692 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/fairfax-virginia-eaglebank-arena-2026-11-27-8-pm/concert/18251692 | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | bryson-tiller | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-elizabeth-k7vgf_1yuvjm8 | los-tucanes-de-tijuana | verify (applied) | 18252126 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/elizabeth-new-jersey-ritz-theatre-performing-arts-center-2026-11-28-8-pm/concert/18252126 | - |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'NOTO' vs 'Xfinity Mobile Arena'; no qualifying replacement found |
| tm-pink-martini-2026-portland-z7r9jz1aa7u1a | pink-martini | add (applied) | 18701977 | https://seatgeek.com/pink-martini-tickets/portland-oregon-revolution-hall-portland-2026-11-29-8-pm/concert/18701977 | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lord-huron-2026-cincinnati-17aov0g62ysdsyk | lord-huron | verify (applied) | 18421955 | https://seatgeek.com/lord-huron-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-12-02-8-pm/concert/18421955 | - |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2026-new-orleans-g5viz_fhsj6zp | billy-strings | verify (applied) | 18167418 | https://seatgeek.com/billy-strings-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2026-12-04-7-30-pm/concert/18167418 | - |
| tm-los-tucanes-de-tijuana-2026-thackerville-z7r9jz1aaz9fb | los-tucanes-de-tijuana | verify (applied) | 18398232 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-04-8-pm/concert/18398232 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2026-las-vegas-z7r9jz1aavf1f | gary-allan | add (applied) | 18744930 | https://seatgeek.com/gary-allan-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-04-8-30-pm/concert/18744930 | - |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | imagine-dragons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | phoebe-bridgers | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | blondshell | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | polyphia | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jodeci-2026-savannah-vvg1zz_2qcyhff | jodeci | verify (applied) | 18407269 | https://seatgeek.com/jodeci-tickets/savannah-georgia-savannah-civic-center-johnny-mercer-theatre-2026-12-08-8-pm/concert/18407269 | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-es7s | lord-huron | verify (applied) | 18421958 | https://seatgeek.com/lord-huron-tickets/chicago-illinois-the-chicago-theatre-2026-12-08-8-pm/concert/18421958 | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-jk7l | lord-huron | verify (applied) | 18421967 | https://seatgeek.com/lord-huron-tickets/chicago-illinois-the-chicago-theatre-2026-12-09-8-pm/concert/18421967 | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | bryan-adams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | jay-wheeler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |

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
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sting-2026-cincinnati-1apzko9gkelizys | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
