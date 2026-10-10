# SeatGeek CTA verification log

Generated: 2026-10-10T11:19:22.061Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 817 (needs_recheck: 543, provenance backfill: 50, stale re-check: 513)
- Events skipped before API checks: 168
- API calls made: 400
- Verified provenance written: 255
- URLs added: 39
- URLs corrected: 0
- URLs cleared: 1
- Provenance un-verified: 1
- Conflicts (ambiguous, untouched): 1
- No qualifying listing: 101
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-baltimore-11a8vpokayf8vu | staind | verify (applied) | 18654540 | https://seatgeek.com/staind-tickets/baltimore-maryland-cfg-bank-arena-2027-03-06-6-pm/concert/18654540 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | chelsea-cutler | add (applied) | 18639209 | https://seatgeek.com/chelsea-cutler-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-09-7-pm/concert/18639209 | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-huntington-1kaovp8iga2ivff | staind | verify (applied) | 18654510 | https://seatgeek.com/staind-tickets/huntington-west-virginia-marshall-health-network-arena-2027-03-10-6-pm/concert/18654510 | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-tampa-vvg1vz_f6ermdd | staind | verify (applied) | 18654500 | https://seatgeek.com/staind-tickets/tampa-florida-benchmark-international-arena-2027-03-12-6-pm/concert/18654500 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | flans | verify (applied) | 18612871 | https://seatgeek.com/flans-tickets/san-diego-california-san-diego-civic-theatre-2027-03-12-8-pm/concert/18612871 | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | chelsea-cutler | add (applied) | 18639214 | https://seatgeek.com/chelsea-cutler-tickets/seattle-washington-showbox-sodo-2027-03-12-7-pm/concert/18639214 | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | stella-lefty | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | staind | verify (applied) | 18654501 | https://seatgeek.com/staind-tickets/west-palm-beach-florida-ithink-financial-amphitheatre-2027-03-13-6-pm/concert/18654501 | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | chelsea-cutler | add (applied) | 18639215 | https://seatgeek.com/chelsea-cutler-tickets/portland-oregon-roseland-theater-2027-03-13-7-pm/concert/18639215 | - |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | the-lemonheads | add (applied) | 18595343 | https://seatgeek.com/the-lemonheads-tickets/englewood-colorado-gothic-theatre-2027-03-14-8-30-pm/concert/18595343 | - |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | flans | verify (applied) | 18612688 | https://seatgeek.com/flans-tickets/los-angeles-california-orpheum-theatre-los-angeles-2027-03-14-8-pm/concert/18612688 | - |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | staind | verify (applied) | 18654502 | https://seatgeek.com/staind-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-03-16-6-pm/concert/18654502 | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | the-lemonheads | add (applied) | 18595344 | https://seatgeek.com/the-lemonheads-tickets/omaha-nebraska-the-waiting-room-omaha-2027-03-16-7-pm/concert/18595344 | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | staind | verify (applied) | 18654504 | https://seatgeek.com/staind-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-18-6-pm/concert/18654504 | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | passenger | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | staind | verify (applied) | 18654503 | https://seatgeek.com/staind-tickets/dallas-texas-dos-equis-pavilion-2027-03-19-6-pm/concert/18654503 | - |
| tm-the-lemonheads-2027-madison-vv17jz_3gkbfxvrj | the-lemonheads | verify (applied) | 18593821 | https://seatgeek.com/the-lemonheads-tickets/madison-wisconsin-majestic-theatre-wi-2027-03-19-8-pm/concert/18593821 | - |
| tm-too-many-zooz-2027-denver-g5vzz_kkf1pnr | too-many-zooz | verify (applied) | 18612771 | https://seatgeek.com/too-many-zooz-tickets/denver-colorado-summit-music-hall-denver-2027-03-19-7-pm/concert/18612771 | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | death-cab-for-cutie | add (applied) | 18604672 | https://seatgeek.com/death-cab-for-cutie-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-24-8-pm/concert/18604672 | - |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | warren-zeiders | verify (applied) | 18649742 | https://seatgeek.com/warren-zeiders-tickets/orlando-florida-house-of-blues-orlando-2027-03-25-7-pm/concert/18649742 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-mobile-g5viz_3tpkkro | the-red-clay-strays | verify (applied) | 18609522 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-26-7-pm/concert/18609522 | - |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | warren-zeiders | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Live' vs 'DAER Nightclub At The Seminole Hard Rock Hotel & Casino'; no qualifying replacement found |
| tm-staind-2027-spokane-z7r9jz1aae_qs | staind | add (applied) | 18655524 | https://seatgeek.com/staind-tickets/spokane-washington-numerica-veterans-arena-2027-03-26-6-pm/concert/18655524 | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fantasia-2027-orlando-1aefz_3gkx--7oo | fantasia | verify (applied) | 18629529 | https://seatgeek.com/fantasia-tickets/orlando-florida-addition-financial-arena-2027-03-27-8-pm/concert/18629529 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k14dqes | the-red-clay-strays | verify (applied) | 18612577 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-27-7-pm/concert/18612577 | - |
| tm-greta-van-fleet-2027-boise-g5vzz_fkffj8x | greta-van-fleet | verify (applied) | 18641996 | https://seatgeek.com/greta-van-fleet-tickets/boise-idaho-extramile-arena-2027-03-27-7-pm/concert/18641996 | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | death-cab-for-cutie | add (applied) | 18604675 | https://seatgeek.com/death-cab-for-cutie-tickets/huntsville-alabama-orion-amphitheater-2027-03-27-8-pm/concert/18604675 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | sienna-spiro | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | death-cab-for-cutie | add (applied) | 18604682 | https://seatgeek.com/death-cab-for-cutie-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-04-01-8-pm/concert/18604682 | - |
| tm-the-psychedelic-furs-2027-waukegan-vv166zkf-0ozagdv5d | the-psychedelic-furs | verify (applied) | 18592664 | https://seatgeek.com/the-psychedelic-furs-tickets/waukegan-illinois-genesee-theatre-2027-04-01-7-30-pm/concert/18592664 | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | warren-zeiders | add (applied) | 18649741 | https://seatgeek.com/warren-zeiders-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-04-01-7-pm/concert/18649741 | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | riley-green | add (applied) | 18626511 | https://seatgeek.com/riley-green-tickets/spokane-washington-numerica-veterans-arena-2027-04-01-7-pm/concert/18626511 | - |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | warren-zeiders | verify (applied) | 18649743 | https://seatgeek.com/warren-zeiders-tickets/waukee-iowa-vibrant-music-hall-2027-04-02-7-pm/concert/18649743 | - |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | jay-wheeler | verify (applied) | 18649608 | https://seatgeek.com/jay-wheeler-tickets/rosemont-illinois-rosemont-theatre-2027-04-02-8-pm/concert/18649608 | - |
| tm-riley-green-2027-seattle-vvg1hz_keoq4yp | riley-green | verify (applied) | 18626514 | https://seatgeek.com/riley-green-tickets/seattle-washington-climate-pledge-arena-2027-04-02-7-pm/concert/18626514 | - |
| tm-lukas-graham-2027-philadelphia-vv1aovpuf-zf9v5 | lukas-graham | verify (applied) | 18617589 | https://seatgeek.com/lukas-graham-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-04-03-8-pm/concert/18617589 | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | staind | add (applied) | 18655681 | https://seatgeek.com/staind-tickets/billings-montana-first-interstate-arena-2027-04-03-6-pm/concert/18655681 | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | jay-wheeler | verify (applied) | 18649609 | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 | - |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | jay-wheeler | verify (applied) | 18649614 | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 | - |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | foy-vance | verify (applied) | 18084515 | https://seatgeek.com/foy-vance-tickets/birmingham-alabama-iron-city-2027-04-07-7-pm/concert/18084515 | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | jay-wheeler | verify (applied) | 18649616 | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 | - |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | the-interrupters | verify (applied) | 18612730 | https://seatgeek.com/the-interrupters-tickets/montreal-canada-mtelus-2027-04-09-7-pm/concert/18612730 | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | add (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | foy-vance | verify (applied) | 18084058 | https://seatgeek.com/foy-vance-tickets/knoxville-tennessee-bijou-theatre-knoxville-2027-04-10-7-pm/concert/18084058 | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | fantasia | verify (applied) | 18629435 | https://seatgeek.com/fantasia-tickets/southaven-mississippi-landers-center-2027-04-10-8-pm/concert/18629435 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | add (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | nothing-but-thieves | verify (applied) | 18266353 | https://seatgeek.com/nothing-but-thieves-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-11-7-30-pm/concert/18266353 | - |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | a-perfect-circle | verify (applied) | 18632504 | https://seatgeek.com/a-perfect-circle-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-13-7-pm/concert/18632504 | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | warren-zeiders | verify (applied) | 18649754 | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | jay-wheeler | verify (applied) | 18649618 | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | a-perfect-circle | verify (applied) | 18632506 | https://seatgeek.com/a-perfect-circle-tickets/calgary-canada-scotiabank-saddledome-2027-04-15-7-30-pm/concert/18632506 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | add (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | add (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | fantasia | verify (applied) | 18629294 | https://seatgeek.com/fantasia-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-16-8-pm/concert/18629294 | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | warren-zeiders | verify (applied) | 18649755 | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | a-perfect-circle | verify (applied) | 18632507 | https://seatgeek.com/a-perfect-circle-tickets/edmonton-canada-rogers-place-2027-04-17-7-30-pm/concert/18632507 | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | a-perfect-circle | verify (applied) | 18632505 | https://seatgeek.com/a-perfect-circle-tickets/winnipeg-canada-canada-life-centre-2027-04-19-7-30-pm/concert/18632505 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | add (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | the-interrupters | verify (applied) | 18613147 | https://seatgeek.com/the-interrupters-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-21-6-pm/concert/18613147 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | warren-zeiders | verify (applied) | 18649760 | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | carly-rae-jepsen | verify (applied) | 18639016 | https://seatgeek.com/carly-rae-jepsen-tickets/inglewood-california-kia-forum-2027-04-22-7-30-pm/concert/18639016 | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | warren-zeiders | verify (applied) | 18649761 | https://seatgeek.com/warren-zeiders-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-04-23-7-pm/concert/18649761 | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | the-psychedelic-furs | verify (applied) | 18592681 | https://seatgeek.com/the-psychedelic-furs-tickets/baltimore-maryland-nevermore-hall-2027-04-23-8-pm/concert/18592681 | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | fantasia | verify (applied) | 18629227 | https://seatgeek.com/fantasia-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-23-8-pm/concert/18629227 | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | warren-zeiders | verify (applied) | 18649764 | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | the-interrupters | verify (applied) | 18613135 | https://seatgeek.com/the-interrupters-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-24-6-30-pm/concert/18613135 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | add (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | a-perfect-circle | verify (applied) | 18632516 | https://seatgeek.com/a-perfect-circle-tickets/detroit-michigan-fox-theatre-detroit-2027-04-25-7-30-pm/concert/18632516 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | add (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | the-psychedelic-furs | verify (applied) | 18592682 | https://seatgeek.com/the-psychedelic-furs-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2027-04-27-7-30-pm/concert/18592682 | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | nickelback | verify (applied) | 18664618 | https://seatgeek.com/nickelback-tickets/dallas-texas-american-airlines-center-2027-04-27-6-30-pm/concert/18664618 | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | a-perfect-circle | verify (applied) | 18632517 | https://seatgeek.com/a-perfect-circle-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-27-8-pm/concert/18632517 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | add (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | a-perfect-circle | verify (applied) | 18632520 | https://seatgeek.com/a-perfect-circle-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-28-7-30-pm/concert/18632520 | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | the-warning | verify (applied) | 18590114 | https://seatgeek.com/the-warning-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-28-6-30-pm/concert/18590114 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | add (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | warren-zeiders | verify (applied) | 18649765 | https://seatgeek.com/warren-zeiders-tickets/columbia-south-carolina-township-auditorium-2027-04-29-7-pm/concert/18649765 | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | warren-zeiders | verify (applied) | 18649766 | https://seatgeek.com/warren-zeiders-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-30-7-pm/concert/18649766 | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | too-many-zooz | verify (applied) | 18613113 | https://seatgeek.com/too-many-zooz-tickets/houston-texas-white-oak-music-hall-downstairs-2027-04-30-7-pm/concert/18613113 | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | a-perfect-circle | verify (applied) | 18632522 | https://seatgeek.com/a-perfect-circle-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-04-30-8-pm/concert/18632522 | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | the-interrupters | verify (applied) | 18612589 | https://seatgeek.com/the-interrupters-tickets/los-angeles-california-the-wiltern-2027-04-30-5-30-pm/concert/18612589 | - |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | fontaines-d-c | verify (applied) | 18642823 | https://seatgeek.com/fontaines-d-c-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-04-30-8-pm/concert/18642823 | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | josiah-queen | verify (applied) | 18574523 | https://seatgeek.com/josiah-queen-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-04-30-7-pm/concert/18574523 | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | nickelback | verify (applied) | 18664624 | https://seatgeek.com/nickelback-tickets/san-antonio-texas-frost-bank-center-2027-05-01-6-30-pm/concert/18664624 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | fontaines-d-c | verify (applied) | 18642822 | https://seatgeek.com/fontaines-d-c-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-01-8-pm/concert/18642822 | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | a-perfect-circle | verify (applied) | 18632524 | https://seatgeek.com/a-perfect-circle-tickets/charlotte-north-carolina-truliant-amphitheater-2027-05-04-7-30-pm/concert/18632524 | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | a-perfect-circle | verify (applied) | 18632526 | https://seatgeek.com/a-perfect-circle-tickets/duluth-georgia-gas-south-arena-2027-05-05-8-pm/concert/18632526 | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | fontaines-d-c | verify (applied) | 18642830 | https://seatgeek.com/fontaines-d-c-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-05-05-8-pm/concert/18642830 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | add (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | add (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | the-warning | verify (applied) | 18590511 | https://seatgeek.com/the-warning-tickets/montreal-canada-mtelus-2027-05-09-8-pm/concert/18590511 | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | saint-levant | verify (applied) | 18551643 | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-12-6-pm/concert/18551643 | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | the-warning | verify (applied) | 18591883 | https://seatgeek.com/the-warning-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-05-15-8-pm/concert/18591883 | - |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | a-perfect-circle | verify (applied) | 18632533 | https://seatgeek.com/a-perfect-circle-tickets/nashville-tennessee-bridgestone-arena-2027-05-15-8-pm/concert/18632533 | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | hilary-duff | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | carly-rae-jepsen | verify (applied) | 18639041 | https://seatgeek.com/carly-rae-jepsen-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-05-18-7-30-pm/concert/18639041 | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | a-perfect-circle | verify (applied) | 18632537 | https://seatgeek.com/a-perfect-circle-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-20-7-30-pm/concert/18632537 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | carly-rae-jepsen | verify (applied) | 18639045 | https://seatgeek.com/carly-rae-jepsen-tickets/chicago-illinois-the-chicago-theatre-2027-05-21-7-30-pm/concert/18639045 | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | a-perfect-circle | verify (applied) | 18632538 | https://seatgeek.com/a-perfect-circle-tickets/chicago-illinois-wintrust-arena-2027-05-22-8-pm/concert/18632538 | - |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | greta-van-fleet | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-metallica-2027-fayetteville-g5viz_om30atl | metallica | verify (applied) | 18595089 | https://seatgeek.com/metallica-tickets/fayetteville-arkansas-razorback-stadium-2027-05-26-6-pm/concert/18595089 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | add (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | gracie-abrams | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-houston-g5diz_k6-kevr | flans | verify (applied) | 18612653 | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | add (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | andrea-bocelli | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | flans | verify (applied) | 18613121 | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | sombr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | a-perfect-circle | verify (applied) | 18632551 | https://seatgeek.com/a-perfect-circle-tickets/daly-city-california-cow-palace-daly-city-2027-06-04-7-pm/concert/18632551 | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | a-perfect-circle | verify (applied) | 18632556 | https://seatgeek.com/a-perfect-circle-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-06-08-8-pm/concert/18632556 | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | tame-impala | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | add (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | def-leppard | verify (applied) | 18662435 | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | def-leppard | verify (applied) | 18662437 | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | a-perfect-circle | verify (applied) | 18632561 | https://seatgeek.com/a-perfect-circle-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-06-13-7-30-pm/concert/18632561 | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | def-leppard | verify (applied) | 18662442 | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | def-leppard | verify (applied) | 18662443 | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | def-leppard | verify (applied) | 18662446 | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 | - |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | def-leppard | verify (applied) | 18662447 | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 | - |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | def-leppard | verify (applied) | 18662449 | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | def-leppard | verify (applied) | 18662452 | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 | - |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | nickelback | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | def-leppard | verify (applied) | 18662454 | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 | - |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | greta-van-fleet | verify (applied) | 18642002 | https://seatgeek.com/greta-van-fleet-tickets/edmonton-canada-rogers-place-2027-07-07-7-pm/concert/18642002 | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | greta-van-fleet | verify (applied) | 18642003 | https://seatgeek.com/greta-van-fleet-tickets/calgary-canada-scotiabank-saddledome-2027-07-08-7-pm/concert/18642003 | - |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | greta-van-fleet | verify (applied) | 18642007 | https://seatgeek.com/greta-van-fleet-tickets/winnipeg-canada-canada-life-centre-2027-07-10-7-pm/concert/18642007 | - |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karol-g-2027-warsaw-z698xzqpz16vfa4vgs | karol-g | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | greta-van-fleet | verify (applied) | 18642013 | https://seatgeek.com/greta-van-fleet-tickets/columbus-ohio-nationwide-arena-2027-07-16-7-pm/concert/18642013 | - |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | greta-van-fleet | verify (applied) | 18642015 | https://seatgeek.com/greta-van-fleet-tickets/noblesville-indiana-ruoff-music-center-2027-07-17-7-pm/concert/18642015 | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | the-red-clay-strays | verify (applied) | 18639097 | https://seatgeek.com/the-red-clay-strays-tickets/clarkston-michigan-pine-knob-music-theatre-2027-07-31-7-pm/concert/18639097 | - |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | riley-green | verify (applied) | 18626554 | https://seatgeek.com/riley-green-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-07-31-7-pm/concert/18626554 | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | harry-styles | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | add (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | the-red-clay-strays | verify (applied) | 18639104 | https://seatgeek.com/the-red-clay-strays-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-08-12-7-pm/concert/18639104 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | add (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | add (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | the-red-clay-strays | verify (applied) | 18639110 | https://seatgeek.com/the-red-clay-strays-tickets/bend-oregon-hayden-homes-amphitheater-2027-08-21-6-30-pm/concert/18639110 | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | the-red-clay-strays | verify (applied) | 18639113 | https://seatgeek.com/the-red-clay-strays-tickets/boise-idaho-extramile-arena-2027-08-22-7-pm/concert/18639113 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | the-red-clay-strays | verify (applied) | 18639117 | https://seatgeek.com/the-red-clay-strays-tickets/rogers-arkansas-walmart-amp-2027-09-09-7-pm/concert/18639117 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | add (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | add (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | the-red-clay-strays | verify (applied) | 18639125 | https://seatgeek.com/the-red-clay-strays-tickets/austin-texas-moody-center-atx-2027-09-19-7-pm/concert/18639125 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | add (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | add (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | add (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | fontaines-d-c | verify (applied) | 18642843 | https://seatgeek.com/fontaines-d-c-tickets/columbia-maryland-merriweather-post-pavilion-2027-09-30-7-30-pm/concert/18642843 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | add (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | add (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | fontaines-d-c | verify (applied) | 18642849 | https://seatgeek.com/fontaines-d-c-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2027-10-08-8-pm/concert/18642849 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | add (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | add (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | fontaines-d-c | verify (applied) | 18642853 | https://seatgeek.com/fontaines-d-c-tickets/inglewood-california-kia-forum-2027-10-15-7-pm/concert/18642853 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | add (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | hilary-duff | verify (applied) | 18633659 | https://seatgeek.com/hilary-duff-tickets/anaheim-california-honda-center-2027-11-21-7-30-pm/concert/18633659 | - |
| tm-harry-styles-2026-new-york-3b00643505b782ca | harry-styles | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18027126 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-harry-styles-2026-new-york-3b00643505d182df | harry-styles | verify (applied) | 18027129 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-10-8-pm/concert/18027129 | - |
| tm-ed-sheeran-2026-indianapolis-050063299afd15f3 | ed-sheeran | verify (applied) | 17738466 | https://seatgeek.com/ed-sheeran-tickets/indianapolis-indiana-lucas-oil-stadium-2026-10-10-5-30-pm/concert/17738466 | - |
| tm-bruno-mars-2026-santa-clara-g5vyz_epx9ygn | bruno-mars | verify (applied) | 18004682 | https://seatgeek.com/bruno-mars-tickets/santa-clara-california-levi-s-stadium-2026-10-10-7-pm/concert/18004682 | - |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkyetuoa | olivia-rodrigo | verify (applied) | 18211679 | https://seatgeek.com/olivia-rodrigo-tickets/chicago-illinois-united-center-2026-10-11-7-pm/concert/18211679 | - |
| tm-bruno-mars-2026-santa-clara-g5vyz_eejsdnx | bruno-mars | verify (applied) | 18013261 | https://seatgeek.com/bruno-mars-tickets/santa-clara-california-levi-s-stadium-2026-10-11-7-pm/concert/18013261 | - |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkmlebgy | olivia-rodrigo | verify (applied) | 18211680 | https://seatgeek.com/olivia-rodrigo-tickets/chicago-illinois-united-center-2026-10-12-7-pm/concert/18211680 | - |
| tm-harry-styles-2026-new-york-3b00643505dd82e6 | harry-styles | verify (applied) | 18027130 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-14-8-pm/concert/18027130 | - |
| tm-bruno-mars-2026-vancouver-16v7zbyrvg7dkhm | bruno-mars | verify (applied) | 18004687 | https://seatgeek.com/bruno-mars-tickets/vancouver-canada-bc-place-stadium-2026-10-14-7-pm/concert/18004687 | - |
| tm-charli-xcx-2026-san-diego-vvg1iz_gpnxmrx | charli-xcx | verify (applied) | 18292521 | https://seatgeek.com/charli-xcx-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-14-8-pm/concert/18292521 | - |
| tm-olivia-rodrigo-2026-boston-vv177z_agksbtqpc | olivia-rodrigo | verify (applied) | 18211681 | https://seatgeek.com/olivia-rodrigo-tickets/boston-massachusetts-td-garden-2026-10-15-7-pm/concert/18211681 | - |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | verify (applied) | 18603387 | https://seatgeek.com/dylan-scott-tickets/dallas-texas-the-bomb-factory-dallas-2026-10-15-8-pm/concert/18603387 | - |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | harry-styles | verify (applied) | 18027131 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-16-8-pm/concert/18027131 | - |
| tm-summer-walker-2026-chicago-vvg18z_uroiect | summer-walker | verify (applied) | 18328041 | https://seatgeek.com/summer-walker-tickets/chicago-illinois-credit-union-1-arena-at-uic-2026-10-16-7-30-pm/concert/18328041 | - |
| tm-bruno-mars-2026-vancouver-1av7z_egkshvjex | bruno-mars | verify (applied) | 18013263 | https://seatgeek.com/bruno-mars-tickets/vancouver-canada-bc-place-stadium-2026-10-16-7-pm/concert/18013263 | - |
| tm-ed-sheeran-2026-charlotte-2d006331aac349eb | ed-sheeran | verify (applied) | 17738470 | https://seatgeek.com/ed-sheeran-tickets/charlotte-north-carolina-bank-of-america-stadium-2026-10-17-5-30-pm/concert/17738470 | - |
| tm-olivia-rodrigo-2026-boston-vv177z_agkv-whjn | olivia-rodrigo | verify (applied) | 18211686 | https://seatgeek.com/olivia-rodrigo-tickets/boston-massachusetts-td-garden-2026-10-17-7-pm/concert/18211686 | - |
| tm-harry-styles-2026-new-york-3b00643506808378 | harry-styles | verify (applied) | 18027135 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-17-8-pm/concert/18027135 | - |
| tm-bruno-mars-2026-vancouver-1av7z_egkshmjia | bruno-mars | verify (applied) | 18013350 | https://seatgeek.com/bruno-mars-tickets/vancouver-canada-bc-place-stadium-2026-10-17-7-pm/concert/18013350 | - |
| tm-charli-xcx-2026-inglewood-vvg10z_g9r7nph | charli-xcx | verify (applied) | 18292522 | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-17-8-pm/concert/18292522 | - |
| tm-olivia-rodrigo-2026-boston-vvg17z_13s_x9k | olivia-rodrigo | verify (applied) | 18224681 | https://seatgeek.com/olivia-rodrigo-tickets/boston-massachusetts-td-garden-2026-10-18-7-pm/concert/18224681 | - |
| tm-charli-xcx-2026-inglewood-vvg10z_g9gehi7 | charli-xcx | verify (applied) | 18292523 | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-18-8-pm/concert/18292523 | - |
| tm-bruno-mars-2026-vancouver-1av7z_egkwimwwb | bruno-mars | verify (applied) | 18016784 | https://seatgeek.com/bruno-mars-tickets/vancouver-canada-bc-place-stadium-2026-10-20-7-pm/concert/18016784 | - |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmby4v9 | olivia-rodrigo | verify (applied) | 18211732 | https://seatgeek.com/olivia-rodrigo-tickets/montreal-canada-centre-bell-2026-10-21-7-pm/concert/18211732 | - |
| tm-harry-styles-2026-new-york-3b0064350690838a | harry-styles | verify (applied) | 18027137 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-21-8-pm/concert/18027137 | - |
| tm-bruno-mars-2026-vancouver-1k78v0fjgacrkay | bruno-mars | verify (applied) | 18107920 | https://seatgeek.com/bruno-mars-tickets/vancouver-canada-bc-place-stadium-2026-10-21-7-pm/concert/18107920 | - |
| tm-charli-xcx-2026-glendale-17k8v0g6g9pu_yt | charli-xcx | verify (applied) | 18292524 | https://seatgeek.com/charli-xcx-tickets/glendale-arizona-desert-diamond-arena-2026-10-21-8-pm/concert/18292524 | - |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmbsav_ | olivia-rodrigo | verify (applied) | 18211735 | https://seatgeek.com/olivia-rodrigo-tickets/montreal-canada-centre-bell-2026-10-22-7-pm/concert/18211735 | - |
| tm-harry-styles-2026-new-york-3b006435069e8398 | harry-styles | verify (applied) | 18027138 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-23-8-pm/concert/18027138 | - |
| tm-jay-z-2026-inglewood-vvg1iz_gncu5jv | jay-z | verify (applied) | 18296599 | https://seatgeek.com/jay-z-tickets/inglewood-california-sofi-stadium-2026-10-23-8-pm/concert/18296599 | - |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | verify (applied) | 18257270 | https://seatgeek.com/john-summit-tickets/hamilton-canada-td-coliseum-2026-10-24-7-pm/concert/18257270 | - |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | harry-styles | verify (applied) | 18027141 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-24-8-pm/concert/18027141 | - |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | verify (applied) | 18526286 | https://seatgeek.com/dylan-scott-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-10-24-8-pm/concert/18526286 | - |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | verify (applied) | 18257271 | https://seatgeek.com/john-summit-tickets/toronto-canada-scotiabank-arena-2026-10-25-7-pm/concert/18257271 | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkmwmykb | olivia-rodrigo | verify (applied) | 18211736 | https://seatgeek.com/olivia-rodrigo-tickets/toronto-canada-scotiabank-arena-2026-10-26-7-pm/concert/18211736 | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | olivia-rodrigo | verify (applied) | 18211738 | https://seatgeek.com/olivia-rodrigo-tickets/toronto-canada-scotiabank-arena-2026-10-27-7-pm/concert/18211738 | - |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | harry-styles | verify (applied) | 18027142 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-28-8-pm/concert/18027142 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | olivia-rodrigo | verify (applied) | 18211687 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-29-7-pm/concert/18211687 | - |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | ed-sheeran | verify (applied) | 17738469 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-29-8-pm/concert/17738469 | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | olivia-rodrigo | verify (applied) | 18211689 | https://seatgeek.com/olivia-rodrigo-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2026-10-30-7-pm/concert/18211689 | - |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | harry-styles | verify (applied) | 18027143 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-30-8-pm/concert/18027143 | - |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | verify (applied) | 17738471 | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-30-8-pm/concert/17738471 | - |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | verify (applied) | 18141400 | https://seatgeek.com/blue-october-tickets/toronto-canada-the-danforth-music-hall-2026-10-31-7-pm/concert/18141400 | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | verify (applied) | 18027147 | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-10-31-8-pm/concert/18027147 | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | verify (applied) | 18373504 | https://seatgeek.com/michelle-branch-tickets/asbury-park-new-jersey-the-stone-pony-2-2026-11-06-7-pm/concert/18373504 | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | verify (applied) | 18211699 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-15-7-pm/concert/18211699 | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | verify (applied) | 18211700 | https://seatgeek.com/olivia-rodrigo-tickets/orlando-florida-kia-center-2026-11-16-7-pm/concert/18211700 | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | verify (applied) | 18175613 | https://seatgeek.com/sombr-tickets/toronto-canada-scotiabank-arena-2026-11-16-7-pm/concert/18175613 | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | tyla | verify (applied) | 18404274 | https://seatgeek.com/tyla-tickets/denver-colorado-fillmore-auditorium-denver-2026-11-20-6-30-pm/concert/18404274 | - |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | foy-vance | verify (applied) | 18085728 | https://seatgeek.com/foy-vance-tickets/englewood-colorado-gothic-theatre-2026-11-21-7-pm/concert/18085728 | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | pentatonix | verify (applied) | 18427238 | https://seatgeek.com/pentatonix-tickets/hamilton-canada-td-coliseum-2026-11-22-6-pm/concert/18427238 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | olivia-rodrigo | verify (applied) | 18211703 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-23-7-pm/concert/18211703 | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | olivia-rodrigo | verify (applied) | 18211705 | https://seatgeek.com/olivia-rodrigo-tickets/nashville-tennessee-bridgestone-arena-2026-11-24-7-pm/concert/18211705 | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | doja-cat | verify (applied) | 17769355 | https://seatgeek.com/doja-cat-tickets/toronto-canada-scotiabank-arena-2026-11-25-7-30-pm/concert/17769355 | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | tyla | verify (applied) | 18404308 | https://seatgeek.com/tyla-tickets/toronto-canada-coca-cola-coliseum-2026-11-26-8-pm/concert/18404308 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | olivia-rodrigo | verify (applied) | 18211742 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-01-7-pm/concert/18211742 | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | olivia-rodrigo | verify (applied) | 18211743 | https://seatgeek.com/olivia-rodrigo-tickets/vancouver-canada-rogers-arena-2026-12-02-7-pm/concert/18211743 | - |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | pink-martini | verify (applied) | 18267277 | https://seatgeek.com/pink-martini-tickets/reno-nevada-grand-sierra-resort-2026-12-03-7-30-pm/concert/18267277 | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | tommy-emmanuel | verify (applied) | 18225197 | https://seatgeek.com/tommy-emmanuel-tickets/durham-north-carolina-carolina-theatre-durham-2026-12-06-8-pm/concert/18225197 | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | olivia-rodrigo | verify (applied) | 18211710 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-07-7-pm/concert/18211710 | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | olivia-rodrigo | verify (applied) | 18211711 | https://seatgeek.com/olivia-rodrigo-tickets/seattle-washington-climate-pledge-arena-2026-12-08-7-pm/concert/18211711 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | olivia-rodrigo | verify (applied) | 18211712 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-11-7-pm/concert/18211712 | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | beartooth | verify (applied) | 18253068 | https://seatgeek.com/beartooth-tickets/denver-colorado-fillmore-auditorium-denver-2026-12-12-5-pm/concert/18253068 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | olivia-rodrigo | verify (applied) | 18211714 | https://seatgeek.com/olivia-rodrigo-tickets/oakland-california-oakland-arena-2026-12-12-7-pm/concert/18211714 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | olivia-rodrigo | verify (applied) | 18211717 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-15-7-pm/concert/18211717 | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | olivia-rodrigo | verify (applied) | 18211719 | https://seatgeek.com/olivia-rodrigo-tickets/sacramento-california-golden-1-center-2026-12-16-7-pm/concert/18211719 | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | andrea-bocelli | verify (applied) | 18039190 | https://seatgeek.com/andrea-bocelli-tickets/hamilton-canada-td-coliseum-2026-12-19-8-pm/concert/18039190 | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | stella-lefty | verify (applied) | 18527909 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-12-7-pm/concert/18527909 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | olivia-rodrigo | verify (applied) | 18211724 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-12-7-pm/concert/18211724 | - |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | stella-lefty | verify (applied) | 18539735 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-history-2027-01-13-7-pm/concert/18539735 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | olivia-rodrigo | verify (applied) | 18211726 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-13-7-pm/concert/18211726 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | olivia-rodrigo | verify (applied) | 18214730 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-16-7-pm/concert/18214730 | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | olivia-rodrigo | verify (applied) | 18211731 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-17-7-pm/concert/18211731 | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | death-cab-for-cutie | verify (applied) | 18603599 | https://seatgeek.com/death-cab-for-cutie-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2027-01-19-8-pm/concert/18603599 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | olivia-rodrigo | verify (applied) | 18224991 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-20-7-pm/concert/18224991 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | olivia-rodrigo | verify (applied) | 18224990 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-21-7-pm/concert/18224990 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | olivia-rodrigo | verify (applied) | 18225825 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-24-7-pm/concert/18225825 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | olivia-rodrigo | verify (applied) | 18227093 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-25-7-pm/concert/18227093 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | olivia-rodrigo | verify (applied) | 18230500 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-28-7-pm/concert/18230500 | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | dylan-scott | verify (applied) | 18603379 | https://seatgeek.com/dylan-scott-tickets/bismarck-north-dakota-bismarck-event-center-2027-01-29-7-30-pm/concert/18603379 | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | olivia-rodrigo | verify (applied) | 18230501 | https://seatgeek.com/olivia-rodrigo-tickets/inglewood-california-intuit-dome-2027-01-29-7-pm/concert/18230501 | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | atmosphere | verify (applied) | 18609092 | https://seatgeek.com/atmosphere-tickets/reno-nevada-grand-sierra-resort-2027-01-29-7-pm/concert/18609092 | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | tobymac | verify (applied) | 18542844 | https://seatgeek.com/tobymac-tickets/huntsville-alabama-propst-arena-at-the-von-braun-center-2027-01-30-7-pm/concert/18542844 | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | blue-october | verify (applied) | 18238718 | https://seatgeek.com/blue-october-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-01-30-8-pm/concert/18238718 | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | alan-walker | verify (applied) | 18590337 | https://seatgeek.com/alan-walker-tickets/charleston-south-carolina-charleston-music-hall-2027-01-31-8-pm/concert/18590337 | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | hilary-duff | verify (applied) | 18070282 | https://seatgeek.com/hilary-duff-tickets/hamilton-canada-td-coliseum-2027-02-02-7-30-pm/concert/18070282 | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | yuridia | verify (applied) | 18570383 | https://seatgeek.com/yuridia-tickets/reno-nevada-grand-sierra-resort-2027-02-06-8-pm/concert/18570383 | - |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | yuridia | verify (applied) | 18570385 | https://seatgeek.com/yuridia-tickets/san-jose-california-sap-center-at-san-jose-2027-02-07-8-pm/concert/18570385 | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | olivia-rodrigo | verify (applied) | 18211656 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-11-7-pm/concert/18211656 | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | blue-october | verify (applied) | 18239347 | https://seatgeek.com/blue-october-tickets/valley-center-california-harrah-s-resort-socal-the-events-center-2027-02-11-8-pm/concert/18239347 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | olivia-rodrigo | verify (applied) | 18211659 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-12-7-pm/concert/18211659 | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | stella-lefty | verify (applied) | 18527897 | https://seatgeek.com/stella-lefty-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-13-7-pm/concert/18527897 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | olivia-rodrigo | verify (applied) | 18211660 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-15-7-pm/concert/18211660 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | olivia-rodrigo | verify (applied) | 18211657 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-16-7-pm/concert/18211657 | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | don-omar | verify (applied) | 18325165 | https://seatgeek.com/don-omar-tickets/toronto-canada-scotiabank-arena-2027-02-17-8-pm/concert/18325165 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | alan-walker | verify (applied) | 18591555 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-18-6-pm/concert/18591555 | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | gracie-abrams | verify (applied) | 18270548 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-18-8-pm/concert/18270548 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | alan-walker | verify (applied) | 18591553 | https://seatgeek.com/alan-walker-tickets/toronto-canada-history-2027-02-19-6-pm/concert/18591553 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | olivia-rodrigo | verify (applied) | 18224685 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-19-7-pm/concert/18224685 | - |
| tm-hans-zimmer-2027-belmont-park-1adzz_3gkmrvuzw | hans-zimmer | verify (applied) | 18601921 | https://seatgeek.com/hans-zimmer-tickets/elmont-new-york-ubs-arena-2027-02-19-7-30-pm/concert/18601921 | - |
| tm-gracie-abrams-2027-toronto-177zv0g65ic_clu | gracie-abrams | verify (applied) | 18270552 | https://seatgeek.com/gracie-abrams-tickets/toronto-canada-scotiabank-arena-2027-02-19-8-pm/concert/18270552 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwdwpi | olivia-rodrigo | verify (applied) | 18224992 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-20-7-pm/concert/18224992 | - |
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | alan-walker | verify (applied) | 18591884 | https://seatgeek.com/alan-walker-tickets/ottawa-canada-history-ottawa-2027-02-21-6-30-pm/concert/18591884 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | olivia-rodrigo | verify (applied) | 18226585 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-23-7-pm/concert/18226585 | - |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | polyphia | verify (applied) | 18312324 | https://seatgeek.com/polyphia-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-02-23-7-30-pm/concert/18312324 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwfupw | olivia-rodrigo | verify (applied) | 18226587 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-24-7-pm/concert/18226587 | - |
| tm-michelle-branch-2027-charleston-g5evz_8w8tpxk | michelle-branch | verify (applied) | 18508823 | https://seatgeek.com/michelle-branch-tickets/charleston-south-carolina-charleston-music-hall-2027-02-25-8-pm/concert/18508823 | - |
| tm-blue-october-2027-vancouver-1778v0g61pgtl-u | blue-october | verify (applied) | 18238922 | https://seatgeek.com/blue-october-tickets/vancouver-canada-commodore-ballroom-2027-02-25-7-pm/concert/18238922 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvw1wpg | olivia-rodrigo | verify (applied) | 18227138 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-27-7-pm/concert/18227138 | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwuqpx | olivia-rodrigo | verify (applied) | 18229435 | https://seatgeek.com/olivia-rodrigo-tickets/brooklyn-new-york-barclays-center-2027-02-28-7-pm/concert/18229435 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | haiden-henderson | verify (applied) | 18613096 | https://seatgeek.com/haiden-henderson-tickets/santa-ana-california-constellation-room-at-the-observatory-2027-04-05-7-pm/concert/18613096 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | haiden-henderson | verify (applied) | 18613093 | https://seatgeek.com/haiden-henderson-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2027-04-09-7-pm/concert/18613093 | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | haiden-henderson | verify (applied) | 18612968 | https://seatgeek.com/haiden-henderson-tickets/atlanta-georgia-the-masquerade-hell-2027-04-14-7-pm/concert/18612968 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | haiden-henderson | verify (applied) | 18613118 | https://seatgeek.com/haiden-henderson-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-18-8-pm/concert/18613118 | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | haiden-henderson | verify (applied) | 18613187 | https://seatgeek.com/haiden-henderson-tickets/washington-district-of-columbia-the-atlantis-2027-04-20-6-30-pm/concert/18613187 | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | haiden-henderson | verify (applied) | 18613099 | https://seatgeek.com/haiden-henderson-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-04-22-8-pm/concert/18613099 | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | haiden-henderson | verify (applied) | 18612878 | https://seatgeek.com/haiden-henderson-tickets/new-york-new-york-irving-plaza-2027-04-23-7-pm/concert/18612878 | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | haiden-henderson | verify (applied) | 18613146 | https://seatgeek.com/haiden-henderson-tickets/boston-massachusetts-big-night-live-2027-04-24-6-pm/concert/18613146 | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | haiden-henderson | verify (applied) | 18612816 | https://seatgeek.com/haiden-henderson-tickets/toronto-canada-the-mod-club-2027-04-26-7-pm/concert/18612816 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | verify (applied) | 18373495 | https://seatgeek.com/michelle-branch-tickets/aspen-colorado-belly-up-aspen-2026-10-10-8-pm/concert/18373495 | - |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | verify (applied) | 18373496 | https://seatgeek.com/michelle-branch-tickets/boulder-colorado-boulder-theater-2026-10-11-8-pm/concert/18373496 | - |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | verify (applied) | 18292579 | https://seatgeek.com/malcolm-todd-tickets/denver-colorado-mission-ballroom-2026-10-11-7-pm/concert/18292579 | - |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | verify (applied) | 18345740 | https://seatgeek.com/dinosaur-jr-tickets/solana-beach-california-belly-up-tavern-2026-10-11-7-30-pm/concert/18345740 | - |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | verify (applied) | 18299136 | https://seatgeek.com/sylvan-esso-tickets/philadelphia-pennsylvania-franklin-music-hall-2026-10-12-8-pm/concert/18299136 | - |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | verify (applied) | 18296767 | https://seatgeek.com/malcolm-todd-tickets/denver-colorado-mission-ballroom-2026-10-12-7-pm/concert/18296767 | - |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | verify (applied) | 18297277 | https://seatgeek.com/sienna-spiro-tickets/nashville-tennessee-ryman-auditorium-2026-10-13-8-pm/concert/18297277 | - |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | verify (applied) | 18175618 | https://seatgeek.com/sombr-tickets/san-diego-california-pechanga-arena-san-diego-2026-10-13-7-pm/concert/18175618 | - |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | verify (applied) | 18175621 | https://seatgeek.com/sombr-tickets/glendale-arizona-desert-diamond-arena-2026-10-14-7-pm/concert/18175621 | - |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | verify (applied) | 18166850 | https://seatgeek.com/karol-g-tickets/arlington-texas-at-t-stadium-2026-10-15-7-pm/concert/18166850 | - |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | verify (applied) | 18175623 | https://seatgeek.com/sombr-tickets/oklahoma-city-oklahoma-paycom-center-2026-10-16-7-pm/concert/18175623 | - |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | verify (applied) | 18175625 | https://seatgeek.com/sombr-tickets/houston-texas-toyota-center-2026-10-17-7-pm/concert/18175625 | - |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | verify (applied) | 18292574 | https://seatgeek.com/malcolm-todd-tickets/vancouver-canada-pne-forum-vancouver-2026-10-18-8-pm/concert/18292574 | - |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | verify (applied) | 18292564 | https://seatgeek.com/malcolm-todd-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-10-19-8-pm/concert/18292564 | - |

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
| tm-rosalia-2026-oakland-g5vyzbumkyr1f | rosalia | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
