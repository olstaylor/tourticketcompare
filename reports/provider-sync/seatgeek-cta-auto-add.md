# SeatGeek CTA auto-add log

Generated: 2026-10-19T22:27:02.232Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 3764
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2941
- Events already carrying a valid SeatGeek URL: 1688
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1230
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1711
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1459
- Skipped before any API call: 384 (past_event: 384)
- Events this run can check (window size): 160
- Rotation: window 6 of 10 (key 20745)
- Runs needed to check every eligible event once: 10
- Events selected/logged by this run: 160
- Events checked by this run: 160
- API calls made: 800
- Rate-limit responses: 0
- URLs added: 132
- Events skipped: 28
- no_candidates_returned: 27
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-riley-green-2027-brandon-g5viz_3t3qkqr
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 800 --resume-from 'tm-riley-green-2027-brandon-g5viz_3t3qkqr'
- Accepted venue mismatches: 0
- Conflicts found: 1

## Skipped reasons

- no_candidates_returned: 27
- conflicting_same_date_city_candidates: 1

## Interpretation

- `URLs added: 132` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1688 event(s) already carried valid SeatGeek URLs before this run, including 1230 enrichment-eligible event(s).
- This run queried only the 1711 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-yacht-rock-revue-2027-atlantic-city-vv1aezkfsgkeedrng | Yacht Rock Revue | 2027-03-05 | Atlantic City | https://seatgeek.com/yacht-rock-revue-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-05-8-pm/concert/18612640 |
| tm-morat-2027-rosemont-vvg18z_1rgckw0 | Morat | 2027-03-05 | Rosemont | https://seatgeek.com/morat-tickets/rosemont-illinois-rosemont-theatre-2027-03-05-8-pm/concert/18252137 |
| tm-chelsea-cutler-2027-san-diego-vvg1iz_ks1c6a3 | Chelsea Cutler | 2027-03-05 | San Diego | https://seatgeek.com/chelsea-cutler-tickets/san-diego-california-the-observatory-north-park-2027-03-05-7-pm/concert/18639204 |
| tm-greta-van-fleet-2027-albany-k7vgf_kbmaa9o | Greta Van Fleet | 2027-03-06 | Albany | https://seatgeek.com/greta-van-fleet-tickets/albany-new-york-mvp-arena-2027-03-06-7-pm/concert/18641972 |
| tm-daughtry-2027-nashville-g5viz_khosea- | Daughtry | 2027-03-06 | Nashville | https://seatgeek.com/daughtry-tickets/nashville-tennessee-the-truth-nashville-2027-03-06-7-pm/concert/18632939 |
| tm-michelle-branch-2027-dallas-vvg1yz_8by9itm | Michelle Branch | 2027-03-06 | Dallas | https://seatgeek.com/michelle-branch-tickets/dallas-texas-house-of-blues-dallas-2027-03-06-7-pm/concert/18508827 |
| tm-fantasia-2027-oakland-g5vyz_krz5jaf | Fantasia | 2027-03-06 | Oakland | https://seatgeek.com/fantasia-tickets/oakland-california-oakland-arena-2027-03-06-8-pm/concert/18629244 |
| tm-tobymac-2027-grand-rapids-vv1afzkfbgkdx_n_v | TobyMac | 2027-03-07 | Grand Rapids | https://seatgeek.com/tobymac-tickets/grand-rapids-michigan-van-andel-arena-2027-03-07-6-30-pm/concert/18542761 |
| tm-def-leppard-2027-detroit-vv1afzk4egkelpgxa | Def Leppard | 2027-03-07 | Detroit | https://seatgeek.com/def-leppard-tickets/detroit-michigan-little-caesars-arena-2027-03-07-7-pm/concert/18662384 |
| tm-needtobreathe-2027-pittsburgh-1apzkfggkd9zzsh | NEEDTOBREATHE | 2027-03-07 | Pittsburgh | https://seatgeek.com/needtobreathe-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-07-7-pm/concert/18621548 |
| tm-hans-zimmer-2027-cincinnati-1avbz_3gkbx_fb1 | Hans Zimmer | 2027-03-07 | Cincinnati | https://seatgeek.com/hans-zimmer-tickets/cincinnati-ohio-heritage-bank-center-2027-03-07-7-30-pm/concert/18601930 |
| tm-polyphia-2027-boston-vvg17z_ge-9vq3 | Polyphia | 2027-03-07 | Boston | https://seatgeek.com/polyphia-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-07-7-30-pm/concert/18312334 |
| tm-jay-wheeler-2027-estero-vvg1vz9zkibwmk | Jay Wheeler | 2027-03-07 | Estero | https://seatgeek.com/jay-wheeler-tickets/estero-florida-hertz-arena-2027-03-07-8-pm/concert/18649623 |
| tm-the-lemonheads-2027-san-francisco-g5vyz_3niolho | The Lemonheads | 2027-03-07 | San Francisco | https://seatgeek.com/the-lemonheads-tickets/san-francisco-california-august-hall-2027-03-07-8-30-pm/concert/18594148 |
| tm-staind-2027-pittsburgh-1avbz_kgkdoccp7 | Staind | 2027-03-08 | Pittsburgh | https://seatgeek.com/staind-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-08-6-pm/concert/18654543 |
| tm-gracie-abrams-2027-montreal-17g8v0g65th0d1g | Gracie Abrams | 2027-03-08 | Montreal | https://seatgeek.com/gracie-abrams-tickets/montreal-canada-centre-bell-2027-03-08-8-pm/concert/18270568 |
| tm-rod-stewart-2027-savannah-vvg1zz_kexgebo | Rod Stewart | 2027-03-08 | Savannah | https://seatgeek.com/rod-stewart-tickets/savannah-georgia-enmarket-arena-2027-03-08-8-pm/concert/18611010 |
| tm-gracie-abrams-2027-montreal-17g8v0g65thpd1k | Gracie Abrams | 2027-03-09 | Montreal | https://seatgeek.com/gracie-abrams-tickets/montreal-canada-centre-bell-2027-03-09-8-pm/concert/18270572 |
| tm-mico-2027-indianapolis-vv1aazk4kgkenppel | Mico | 2027-03-09 | Indianapolis | https://seatgeek.com/mico-tickets/indianapolis-indiana-the-deluxe-at-old-national-centre-2027-03-09-8-pm/concert/18666757 |
| tm-sylvan-esso-2027-dallas-vvg1yz_g8bdfye | Sylvan Esso | 2027-03-09 | Dallas | https://seatgeek.com/sylvan-esso-tickets/dallas-texas-house-of-blues-dallas-2027-03-09-7-pm/concert/18299179 |
| tm-rod-stewart-2027-biloxi-g5viz_kjgqiyx | Rod Stewart | 2027-03-10 | Biloxi | https://seatgeek.com/rod-stewart-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-03-10-7-30-pm/concert/18626760 |
| tm-missio-2027-atlanta-vvg1zz_8mbtifq | Missio | 2027-03-11 | Atlanta | https://seatgeek.com/missio-tickets/atlanta-georgia-the-loft-at-center-stage-2027-03-11-8-pm/concert/18492631 |
| tm-the-red-clay-strays-2027-saskatoon-1av7z_kgkwfc4o1 | The Red Clay Strays | 2027-03-11 | Saskatoon | https://seatgeek.com/the-red-clay-strays-tickets/saskatoon-canada-sasktel-centre-2027-03-11-7-pm/concert/18639081 |
| tm-death-cab-for-cutie-2027-nashville-g5viz_3bvgq-a | Death Cab for Cutie | 2027-03-11 | Nashville | https://seatgeek.com/death-cab-for-cutie-tickets/nashville-tennessee-the-truth-nashville-2027-03-11-8-pm/concert/18604169 |
| tm-michelle-branch-2027-tempe-1av0z_8gkntcuaa | Michelle Branch | 2027-03-11 | Tempe | https://seatgeek.com/michelle-branch-tickets/tempe-arizona-marquee-theatre-tempe-az-2027-03-11-7-30-pm/concert/18508835 |
| tm-nickelback-2027-montreal-15d7z_fqpa0kk | Nickelback | 2027-03-12 | Montreal | https://seatgeek.com/nickelback-tickets/montreal-canada-centre-bell-2027-03-12-6-30-pm/concert/18664626 |
| tm-greta-van-fleet-2027-charlotte-g5evz_kd5pkxs | Greta Van Fleet | 2027-03-12 | Charlotte | https://seatgeek.com/greta-van-fleet-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-03-12-7-pm/concert/18641976 |
| tm-needtobreathe-2027-chattanooga-g5viz_kepfq3l | NEEDTOBREATHE | 2027-03-12 | Chattanooga | https://seatgeek.com/needtobreathe-tickets/chattanooga-tennessee-soldiers-and-sailors-memorial-auditorium-2027-03-12-7-pm/concert/18621553 |
| tm-polyphia-2027-charlotte-g5evz_ojpf6hx | Polyphia | 2027-03-12 | Charlotte | https://seatgeek.com/polyphia-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-12-7-30-pm/concert/18536017 |
| tm-jay-wheeler-2027-atlanta-vvg1zz_f288dbv | Jay Wheeler | 2027-03-12 | Atlanta | https://seatgeek.com/jay-wheeler-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-12-8-pm/concert/18649596 |
| tm-the-red-clay-strays-2027-edmonton-1av7z_kgksqo5v0 | The Red Clay Strays | 2027-03-12 | Edmonton | https://seatgeek.com/the-red-clay-strays-tickets/edmonton-canada-rogers-place-2027-03-12-7-pm/concert/18639082 |
| tm-yacht-rock-revue-2027-nashville-vv17fz_3gktkih3j | Yacht Rock Revue | 2027-03-12 | Nashville | https://seatgeek.com/yacht-rock-revue-tickets/nashville-indiana-brown-county-music-center-2027-03-12-8-pm/concert/18613108 |
| tm-blue-october-2027-des-moines-vvg1bz_1xphcoz | Blue October | 2027-03-12 | Des Moines | https://seatgeek.com/blue-october-tickets/des-moines-iowa-hoyt-sherman-place-2027-03-12-8-pm/concert/18238362 |
| tm-greta-van-fleet-2027-knoxville-g5viz_fat50pa | Greta Van Fleet | 2027-03-13 | Knoxville | https://seatgeek.com/greta-van-fleet-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-03-13-7-pm/concert/18641980 |
| tm-polyphia-2027-orlando-17fov0g6gemc12a | Polyphia | 2027-03-13 | Orlando | https://seatgeek.com/polyphia-tickets/orlando-florida-hard-rock-live-orlando-2027-03-13-7-30-pm/concert/18312347 |
| tm-yacht-rock-revue-2027-nashville-g5viz_k26z3ab | Yacht Rock Revue | 2027-03-13 | Nashville | https://seatgeek.com/yacht-rock-revue-tickets/nashville-tennessee-the-truth-nashville-2027-03-13-8-pm/concert/18613250 |
| tm-jay-wheeler-2027-charlotte-g5evz_f75dxcp | Jay Wheeler | 2027-03-14 | Charlotte | https://seatgeek.com/jay-wheeler-tickets/charlotte-north-carolina-ovens-auditorium-2027-03-14-8-pm/concert/18649599 |
| tm-the-red-clay-strays-2027-winnipeg-1av7z_kgkgyzwh1 | The Red Clay Strays | 2027-03-14 | Winnipeg | https://seatgeek.com/the-red-clay-strays-tickets/winnipeg-canada-canada-life-centre-2027-03-14-7-pm/concert/18639084 |
| tm-tommy-emmanuel-2027-calgary-1k78vpuega13dcp | Tommy Emmanuel | 2027-03-14 | Calgary | https://seatgeek.com/tommy-emmanuel-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-14-8-pm/concert/18634114 |
| tm-greta-van-fleet-2027-tulsa-1aezz_kgkdnv4sg | Greta Van Fleet | 2027-03-16 | Tulsa | https://seatgeek.com/greta-van-fleet-tickets/tulsa-oklahoma-bok-center-2027-03-16-7-pm/concert/18641984 |
| tm-tommy-emmanuel-2027-winnipeg-1k78vpupga1vvti | Tommy Emmanuel | 2027-03-17 | Winnipeg | https://seatgeek.com/tommy-emmanuel-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-17-8-pm/concert/18633853 |
| tm-the-red-clay-strays-2027-uncasville-g5vvz_koktqjf | The Red Clay Strays | 2027-03-18 | Uncasville | https://seatgeek.com/the-red-clay-strays-tickets/uncasville-connecticut-mohegan-sun-arena-2027-03-18-7-pm/concert/18639085 |
| tm-jay-wheeler-2027-washington-1a4zk4egkd30m3a | Jay Wheeler | 2027-03-18 | Washington | https://seatgeek.com/jay-wheeler-tickets/washington-district-of-columbia-dar-constitution-hall-2027-03-18-8-pm/concert/18649600 |
| tm-the-red-clay-strays-2027-allentown-1adzz_kgkmg3bkj | The Red Clay Strays | 2027-03-19 | Allentown | https://seatgeek.com/the-red-clay-strays-tickets/allentown-pennsylvania-ppl-center-2027-03-19-7-pm/concert/18639090 |
| tm-rod-stewart-2027-uncasville-g5vvz_flfx92d | Rod Stewart | 2027-03-19 | Uncasville | https://seatgeek.com/rod-stewart-tickets/uncasville-connecticut-mohegan-sun-arena-2027-03-19-7-30-pm/concert/18683772 |
| tm-def-leppard-2027-nashville-g5viz_f9p6_vj | Def Leppard | 2027-03-19 | Nashville | https://seatgeek.com/def-leppard-tickets/nashville-tennessee-bridgestone-arena-2027-03-19-7-pm/concert/18662382 |
| tm-jay-wheeler-2027-atlantic-city-vv1aezk4vgkduqubi | Jay Wheeler | 2027-03-19 | Atlantic City | https://seatgeek.com/jay-wheeler-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-19-8-pm/concert/18649597 |
| tm-the-interrupters-2027-tempe-16v0z_3j3g7wujq | The Interrupters | 2027-03-19 | Tempe | https://seatgeek.com/the-interrupters-tickets/tempe-arizona-marquee-theatre-tempe-az-2027-03-19-7-pm/concert/18612836 |
| tm-staind-2027-san-antonio-g5diz_fkhzhba | Staind | 2027-03-20 | San Antonio | https://seatgeek.com/staind-tickets/san-antonio-texas-frost-bank-center-2027-03-20-6-pm/concert/18654512 |
| tm-polyphia-2027-dallas-vvg1yz_glmqcu0 | Polyphia | 2027-03-20 | Dallas | https://seatgeek.com/polyphia-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-03-20-7-30-pm/concert/18312313 |
| tm-greta-van-fleet-2027-phoenix-1av0z_kgkbck9ok | Greta Van Fleet | 2027-03-20 | Phoenix | https://seatgeek.com/greta-van-fleet-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-20-7-pm/concert/18641989 |
| tm-staind-2027-denver-g5vzz_f7kx5yq | Staind | 2027-03-22 | Denver | https://seatgeek.com/staind-tickets/denver-colorado-ball-arena-2027-03-22-6-pm/concert/18654511 |
| tm-greta-van-fleet-2027-reno-1avjz_kgkmchefe | Greta Van Fleet | 2027-03-22 | Reno | https://seatgeek.com/greta-van-fleet-tickets/reno-nevada-reno-events-center-2027-03-22-7-pm/concert/18641990 |
| tm-def-leppard-2027-pittsburgh-1apzk4egkdr8ult | Def Leppard | 2027-03-23 | Pittsburgh | https://seatgeek.com/def-leppard-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-23-7-pm/concert/18662390 |
| tm-staind-2027-boise-g5vzz_kb7mfuo | Staind | 2027-03-24 | Boise | https://seatgeek.com/staind-tickets/boise-idaho-extramile-arena-2027-03-24-6-pm/concert/18654515 |
| tm-the-red-clay-strays-2027-mobile-g5viz_k1kuycs | The Red Clay Strays | 2027-03-25 | Mobile | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-25-7-pm/concert/18617428 |
| tm-greta-van-fleet-2027-portland-vvg1hz_kle7js7 | Greta Van Fleet | 2027-03-25 | Portland | https://seatgeek.com/greta-van-fleet-tickets/portland-oregon-moda-center-2027-03-25-7-pm/concert/18641995 |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | 2027-03-26 | Hollywood | https://seatgeek.com/warren-zeiders-tickets/hollywood-florida-daer-nightclub-at-the-seminole-hard-rock-hotel-casino-2027-03-26-7-pm/concert/18649740 |
| tm-nickelback-2027-milwaukee-vv1a6zk4agkd7raaf | Nickelback | 2027-03-27 | Milwaukee | https://seatgeek.com/nickelback-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-27-6-30-pm/concert/18664601 |
| tm-staind-2027-seattle-vvg1hz_km9huyk | Staind | 2027-03-27 | Seattle | https://seatgeek.com/staind-tickets/seattle-washington-climate-pledge-arena-2027-03-27-6-pm/concert/18654516 |
| tm-def-leppard-2027-denver-g5vzz_frfov07 | Def Leppard | 2027-03-29 | Denver | https://seatgeek.com/def-leppard-tickets/denver-colorado-ball-arena-2027-03-29-7-pm/concert/18662397 |
| tm-staind-2027-vancouver-1aozk4egkdceqzp | Staind | 2027-03-29 | Vancouver | https://seatgeek.com/staind-tickets/vancouver-canada-rogers-arena-2027-03-29-6-pm/concert/18654531 |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wdb8 | Saint Levant | 2027-03-30 | Brooklyn | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-30-7-pm/concert/18386179 |
| tm-death-cab-for-cutie-2027-pittsburgh-1apzkfygkd_ubdt | Death Cab for Cutie | 2027-03-30 | Pittsburgh | https://seatgeek.com/death-cab-for-cutie-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-30-8-pm/concert/18604164 |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wsb- | Saint Levant | 2027-03-31 | Brooklyn | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-31-7-pm/concert/18386181 |
| tm-staind-2027-calgary-1av7z_kgkm-emew | Staind | 2027-03-31 | Calgary | https://seatgeek.com/staind-tickets/calgary-canada-scotiabank-saddledome-2027-03-31-6-pm/concert/18654536 |
| tm-staind-2027-edmonton-1av7z_kgkz_xe9- | Staind | 2027-04-01 | Edmonton | https://seatgeek.com/staind-tickets/edmonton-canada-rogers-place-2027-04-01-6-pm/concert/18654538 |
| tm-nickelback-2027-saskatoon-16v7z_ff7g7wwtw | Nickelback | 2027-04-02 | Saskatoon | https://seatgeek.com/nickelback-tickets/saskatoon-canada-sasktel-centre-2027-04-02-6-30-pm/concert/18664632 |
| tm-riley-green-2027-eugene-vvg1hz_3divdk0 | Riley Green | 2027-04-03 | Eugene | https://seatgeek.com/riley-green-tickets/eugene-oregon-matthew-knight-arena-2027-04-03-7-pm/concert/18626512 |
| tm-staind-2027-sioux-falls-vv1akzk4vgkd8j7ov | Staind | 2027-04-06 | Sioux Falls | https://seatgeek.com/staind-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-04-06-6-pm/concert/18654517 |
| tm-staind-2027-fargo-vv17bz_kgkuwy5mz | Staind | 2027-04-07 | Fargo | https://seatgeek.com/staind-tickets/fargo-north-dakota-fargodome-2027-04-07-6-pm/concert/18654522 |
| tm-riley-green-2027-edmonton-1av7z_3gkwgn0bp | Riley Green | 2027-04-08 | Edmonton | https://seatgeek.com/riley-green-tickets/edmonton-canada-rogers-place-2027-04-08-7-pm/concert/18626555 |
| tm-staind-2027-omaha-vv1kvovp8tga5iapt | Staind | 2027-04-09 | Omaha | https://seatgeek.com/staind-tickets/omaha-nebraska-chi-health-center-omaha-2027-04-09-6-pm/concert/18654523 |
| tm-death-cab-for-cutie-2027-uncasville-g5vvz_3vqdtrt | Death Cab for Cutie | 2027-04-09 | Uncasville | https://seatgeek.com/death-cab-for-cutie-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-09-8-pm/concert/18603584 |
| tm-riley-green-2027-calgary-1aozkfygkderjem | Riley Green | 2027-04-09 | Calgary | https://seatgeek.com/riley-green-tickets/calgary-canada-scotiabank-saddledome-2027-04-09-7-pm/concert/18626557 |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | Staind | 2027-04-10 | Kansas City | https://seatgeek.com/staind-tickets/kansas-city-missouri-t-mobile-center-2027-04-10-6-pm/concert/18654526 |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | Riley Green | 2027-04-10 | Saskatoon | https://seatgeek.com/riley-green-tickets/saskatoon-canada-sasktel-centre-2027-04-10-7-pm/concert/18626559 |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | Jay Wheeler | 2027-04-10 | Inglewood | https://seatgeek.com/jay-wheeler-tickets/inglewood-california-youtube-theater-2027-04-10-8-pm/concert/18649617 |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | Josiah Queen | 2027-04-11 | Grand Rapids | https://seatgeek.com/josiah-queen-tickets/grand-rapids-michigan-van-andel-arena-2027-04-11-7-pm/concert/18574503 |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | Staind | 2027-04-11 | Moline | https://seatgeek.com/staind-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-11-6-pm/concert/18654527 |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | Death Cab for Cutie | 2027-04-11 | Portland | https://seatgeek.com/death-cab-for-cutie-tickets/portland-maine-state-theatre-portland-me-2027-04-11-8-pm/concert/18603742 |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | Staind | 2027-04-13 | Grand Rapids | https://seatgeek.com/staind-tickets/grand-rapids-michigan-van-andel-arena-2027-04-13-6-pm/concert/18654528 |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | Staind | 2027-04-14 | Evansville | https://seatgeek.com/staind-tickets/evansville-indiana-ford-center-in-2027-04-14-6-pm/concert/18654530 |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | Josiah Queen | 2027-04-15 | Worcester | https://seatgeek.com/josiah-queen-tickets/worcester-massachusetts-dcu-center-2027-04-15-7-pm/concert/18574500 |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | Josiah Queen | 2027-04-16 | Hershey | https://seatgeek.com/josiah-queen-tickets/hershey-pennsylvania-giant-center-2027-04-16-7-pm/concert/18574510 |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | Def Leppard | 2027-04-16 | North Little Rock | https://seatgeek.com/def-leppard-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-16-7-pm/concert/18662402 |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | Josiah Queen | 2027-04-18 | Duluth | https://seatgeek.com/josiah-queen-tickets/duluth-georgia-gas-south-arena-2027-04-18-7-pm/concert/18574513 |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | Def Leppard | 2027-04-18 | Fort Worth | https://seatgeek.com/def-leppard-tickets/fort-worth-texas-dickies-arena-2027-04-18-7-pm/concert/18662404 |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | Def Leppard | 2027-04-20 | Mobile | https://seatgeek.com/def-leppard-tickets/mobile-alabama-mobile-civic-center-arena-2027-04-20-7-pm/concert/18662407 |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | Def Leppard | 2027-04-22 | Wichita | https://seatgeek.com/def-leppard-tickets/wichita-kansas-intrust-bank-arena-2027-04-22-7-pm/concert/18662406 |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | Fontaines D.C. | 2027-04-22 | Boston | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-22-8-pm/concert/18658875 |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedosqi | Fontaines D.C. | 2027-04-23 | Boston | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-23-8-pm/concert/18642818 |
| tm-josiah-queen-2027-hoffman-estates-vv1a7zkfigkdsnse_ | Josiah Queen | 2027-04-23 | Hoffman Estates | https://seatgeek.com/josiah-queen-tickets/hoffman-estates-illinois-now-arena-2027-04-23-7-pm/concert/18574515 |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | Def Leppard | 2027-04-24 | Lincoln | https://seatgeek.com/def-leppard-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-24-7-pm/concert/18662408 |
| tm-fontaines-d-c-2027-detroit-vv17oz_kgksew9wu | Fontaines D.C. | 2027-04-27 | Detroit | https://seatgeek.com/fontaines-d-c-tickets/detroit-michigan-fox-theatre-detroit-2027-04-27-8-pm/concert/18642819 |
| tm-riley-green-2027-raleigh-g5evz_ke-2cfw | Riley Green | 2027-04-29 | Raleigh | https://seatgeek.com/riley-green-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-04-29-7-pm/concert/18626510 |
| tm-def-leppard-2027-glendale-1kk8vp8bga1l7cc | Def Leppard | 2027-04-29 | Glendale | https://seatgeek.com/def-leppard-tickets/glendale-arizona-desert-diamond-arena-2027-04-29-7-pm/concert/18662413 |
| tm-riley-green-2027-knoxville-g5viz_3wie3-p | Riley Green | 2027-04-30 | Knoxville | https://seatgeek.com/riley-green-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-30-7-pm/concert/18626513 |
| tm-riley-green-2027-greenville-g5evz_k14klik | Riley Green | 2027-05-01 | Greenville | https://seatgeek.com/riley-green-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-05-01-7-pm/concert/18626515 |
| tm-the-psychedelic-furs-2027-northfield-vv17fz_ogkhgkwao | The Psychedelic Furs | 2027-05-01 | Northfield | https://seatgeek.com/the-psychedelic-furs-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-01-7-30-pm/concert/18592689 |
| tm-the-interrupters-2027-anaheim-vv1fe8vpg33pz72fk7 | The Interrupters | 2027-05-02 | Anaheim | https://seatgeek.com/the-interrupters-tickets/anaheim-california-house-of-blues-anaheim-2027-05-02-5-pm/concert/18612867 |
| tm-saint-levant-2027-los-angeles-vv1aazkf_gkdotx7a | Saint Levant | 2027-05-02 | Los Angeles | https://seatgeek.com/saint-levant-tickets/los-angeles-california-the-wiltern-2027-05-02-7-pm/concert/18550851 |
| tm-ha-ash-2027-inglewood-vvg1iz_3teyn4f | Ha*Ash | 2027-05-02 | Inglewood | https://seatgeek.com/ha-ash-tickets/inglewood-california-youtube-theater-2027-05-02-8-pm/concert/18608842 |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | Riley Green | 2027-05-07 | Wichita | https://seatgeek.com/riley-green-tickets/wichita-kansas-intrust-bank-arena-2027-05-07-7-pm/concert/18626523 |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | Fantasia | 2027-05-08 | Raleigh | https://seatgeek.com/fantasia-tickets/raleigh-north-carolina-lenovo-center-2027-05-08-8-pm/concert/18629230 |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | Riley Green | 2027-05-08 | Rogers | https://seatgeek.com/riley-green-tickets/rogers-arkansas-walmart-amp-2027-05-08-7-pm/concert/18626524 |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | Fontaines D.C. | 2027-05-08 | Seattle | https://seatgeek.com/fontaines-d-c-tickets/seattle-washington-wamu-theater-2027-05-08-8-pm/concert/18642831 |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | Ha*Ash | 2027-05-08 | Phoenix | https://seatgeek.com/ha-ash-tickets/phoenix-arizona-arizona-financial-theatre-2027-05-08-8-pm/concert/18608845 |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | Carly Rae Jepsen | 2027-05-10 | Nashville | https://seatgeek.com/carly-rae-jepsen-tickets/nashville-tennessee-the-truth-nashville-2027-05-10-7-30-pm/concert/18639027 |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | Saint Levant | 2027-05-10 | Seattle | https://seatgeek.com/saint-levant-tickets/seattle-washington-paramount-theatre-wa-2027-05-10-8-pm/concert/18550856 |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | Fontaines D.C. | 2027-05-11 | Sacramento | https://seatgeek.com/fontaines-d-c-tickets/sacramento-channel-24-sacramento-2027-05-11-8-pm/concert/18642832 |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | Fontaines D.C. | 2027-05-12 | San Francisco | https://seatgeek.com/fontaines-d-c-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-05-12-8-pm/concert/18642833 |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | Saint Levant | 2027-05-13 | Vancouver | https://seatgeek.com/saint-levant-tickets/vancouver-canada-malkin-bowl-2027-05-13-6-pm/concert/18551642 |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | Def Leppard | 2027-05-14 | Vancouver | https://seatgeek.com/def-leppard-tickets/vancouver-canada-rogers-arena-2027-05-14-7-pm/concert/18662462 |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | Too Many Zooz | 2027-05-14 | Seattle | https://seatgeek.com/too-many-zooz-tickets/seattle-washington-neptune-theatre-wa-2027-05-14-8-pm/concert/18612957 |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | Luke Combs | 2027-05-15 | Kansas City | https://seatgeek.com/luke-combs-tickets/kansas-city-missouri-geha-field-at-arrowhead-stadium-2027-05-15-5-45-pm/concert/18493403 |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | Def Leppard | 2027-05-16 | Edmonton | https://seatgeek.com/def-leppard-tickets/edmonton-canada-rogers-place-2027-05-16-7-pm/concert/18662464 |
| tm-ha-ash-2027-houston-g5diz_kkygldl | Ha*Ash | 2027-05-16 | Houston | https://seatgeek.com/ha-ash-tickets/houston-texas-713-music-hall-2027-05-16-8-pm/concert/18608855 |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | Ha*Ash | 2027-05-19 | New York | https://seatgeek.com/ha-ash-tickets/new-york-new-york-united-palace-theatre-2027-05-19-8-pm/concert/18608856 |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | Santana | 2027-05-19 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-19-7-pm/concert/18628843 |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | Riley Green | 2027-05-20 | Tulsa | https://seatgeek.com/riley-green-tickets/tulsa-oklahoma-bok-center-2027-05-20-7-pm/concert/18626525 |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | Santana | 2027-05-20 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-20-7-pm/concert/18628844 |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | Fantasia | 2027-05-21 | Providence | https://seatgeek.com/fantasia-tickets/providence-rhode-island-amica-mutual-pavilion-2027-05-21-8-pm/concert/18629235 |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | Ha*Ash | 2027-05-21 | Atlanta | https://seatgeek.com/ha-ash-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-21-8-pm/concert/18608857 |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | Riley Green | 2027-05-21 | Dallas | https://seatgeek.com/riley-green-tickets/dallas-texas-dos-equis-pavilion-2027-05-21-7-pm/concert/18626526 |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | Ha*Ash | 2027-05-22 | Miami Beach | https://seatgeek.com/ha-ash-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-05-22-8-pm/concert/18608864 |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | Santana | 2027-05-22 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-22-7-pm/concert/18628845 |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | Santana | 2027-05-23 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-23-7-pm/concert/18628846 |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | Niall Horan | 2027-05-29 | Vancouver | https://seatgeek.com/niall-horan-tickets/vancouver-canada-rogers-arena-2027-05-29-7-30-pm/concert/18235566 |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | A Perfect Circle | 2027-06-01 | Portland | https://seatgeek.com/a-perfect-circle-tickets/portland-oregon-veterans-memorial-coliseum-2-2027-06-01-7-30-pm/concert/18632548 |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | Def Leppard | 2027-06-03 | Oklahoma City | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | FKJ | 2027-06-03 | Philadelphia | https://seatgeek.com/fkj-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-06-03-8-pm/concert/18281671 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-dancing-with-the-stars-2027-tampa-vvg1vz_kbbl4rs | Dancing With The Stars | 2027-03-09 | Tampa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-birmingham-1aezz_kgkwr4ecx | Dancing With The Stars | 2027-03-10 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-orleans-g5viz_kxwz34h | Dancing With The Stars | 2027-03-11 | New Orleans | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | 2027-03-16 | Dallas | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | 2027-03-17 | Tulsa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | 2027-03-19 | Denver | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | 2027-03-23 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | 2027-03-23 | Abbotsford | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | 2027-03-24 | Amsterdam | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | 2027-03-24 | Portland | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | 2027-03-27 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | 2027-03-28 | Amsterdam | no_candidates_returned | - |
| tm-the-warning-2027-birmingham-g5dzz_3jthdkp | The Warning | 2027-03-29 | Birmingham | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | 2027-04-01 | Munich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | 2027-04-02 | Munich | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | 2027-04-02 | Los Angeles | no_candidates_returned | - |
| tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 | Saint Levant | 2027-04-03 | Chicago | conflicting_same_date_city_candidates | https://seatgeek.com/saint-levant-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-04-03-8-pm/concert/18386184 |
| tm-dancing-with-the-stars-2027-phoenix-1av0z_kgkb3yfyn | Dancing With The Stars | 2027-04-04 | Phoenix | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-mobile-g5viz_f1cm1bo | Dancing With The Stars | 2027-04-07 | Mobile | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-greenville-g5evz_kdpl_8w | Dancing With The Stars | 2027-04-08 | Greenville | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-raleigh-g5evz_f60r-5g | Dancing With The Stars | 2027-04-09 | Raleigh | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd | Dancing With The Stars | 2027-04-10 | Charlotte | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-duluth-vvg1zz_km06fsr | Dancing With The Stars | 2027-04-11 | Duluth | no_candidates_returned | - |
| tm-earth-wind-fire-2027-atlanta-vvg1zz_33xgiy_ | Earth, Wind & Fire | 2027-04-23 | Atlanta | no_candidates_returned | - |
| tm-rod-stewart-2027-belfast-1azzkfugkd15ooi | Rod Stewart | 2027-04-27 | Belfast | no_candidates_returned | - |
| tm-earth-wind-fire-2027-knoxville-g5viz_35urusm | Earth, Wind & Fire | 2027-04-28 | Knoxville | no_candidates_returned | - |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | 2027-05-19 | Glasgow | no_candidates_returned | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5pben | Oasis | 2027-05-28 | Glasgow | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 (Saint Levant, 2027-04-03, Chicago)
  - 100: https://seatgeek.com/saint-levant-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-04-03-8-pm/concert/18386191

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
| tm-olivia-rodrigo-2026-pittsburgh-1avbz_agkm9wrr7 | olivia-rodrigo | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-washington-1ka8v0pdgacx387 | olivia-rodrigo | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-olivia-rodrigo-2026-boston-vv177z_agkv-whjn | olivia-rodrigo | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-bts-2026-munich-z698xzc2z1konbaqf | bts | 2026-07-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-munich-z698xzc2z1kfj7mgy | bts | 2026-07-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bts-2026-toronto-1avzz_egkiiidcu | bts | 2026-08-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoav | ariana-grande | 2026-06-30T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7qoaz | ariana-grande | 2026-07-02T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ariana-grande-2026-sunrise-z7r9jz1a7j6op | ariana-grande | 2026-07-03T20:00:00-04:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lhqy5 | charli-xcx | 2026-09-15T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-toronto-177zv0g6gkluljm | charli-xcx | 2026-09-21T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-boston-vvg17z_gpmbifj | charli-xcx | 2026-09-25T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-atlanta-vvg1zz_g99-nfd | charli-xcx | 2026-10-07T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-charli-xcx-2026-inglewood-vvg10z_g9r7nph | charli-xcx | 2026-10-18T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-houston-z7r9jz1a7oixf | summer-walker | 2026-06-21T19:30:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-chicago-vv178zbugkmzvbum | rosalia | 2026-06-21T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-houston-z7r9jz1a7oz43 | rosalia | 2026-06-23T20:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv170zbugkd8gp9v | rosalia | 2026-06-30T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-inglewood-vv1k0zbzfzg7tulc | rosalia | 2026-07-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rosalia-2026-san-diego-vvg1izbuda5f5g | rosalia | 2026-07-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-summer-walker-2026-bristow-17a8v0g6urtwfpk | summer-walker | 2026-09-19T21:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cksbad4 | jay-z | 2026-09-04T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-zach-bryan-2026-toronto-1a8zkcegkegri4f | zach-bryan | 2026-09-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-toronto-1a8zkcegkeuxbbr | zach-bryan | 2026-09-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv1avzkupgkeoeq1t | zach-bryan | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-foxborough-vv16vzkuso6za26afg | zach-bryan | 2026-10-03T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-zach-bryan-2026-auburn-university-z7r9jz1a7r4ev | zach-bryan | 2026-10-10T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-1a8zk8ygkeelgsk | tame-impala | 2026-07-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-toronto-168zk8uopzackd28 | tame-impala | 2026-07-26T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzk8ygkdxncl3 | tame-impala | 2026-07-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-boston-vv1avzko7gkd9ltgz | tame-impala | 2026-07-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_dq4fyz7 | tame-impala | 2026-08-01T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-charlotte-g5evz_7stecj- | tame-impala | 2026-08-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7ksioai | tame-impala | 2026-08-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-nashville-g5viz_7s7cobq | tame-impala | 2026-08-06T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-columbus-vv1aazk8ugkebkhue | tame-impala | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6os55n | tame-impala | 2026-09-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-seattle-vvg1hz_d6ov55i | tame-impala | 2026-09-03T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkd-fy4x | tame-impala | 2026-09-06T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-vancouver-1aozkoegkdlltoy | tame-impala | 2026-09-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-portland-vvg1hz_dmh0iyk | tame-impala | 2026-09-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-denver-g5vzz_dkexywp | tame-impala | 2026-09-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-phoenix-1a_zk8ggkdiaazn | tame-impala | 2026-09-15T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tame-impala-2026-dallas-vvg1yz_dkfcyvg | tame-impala | 2026-09-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jay-z-2026-london-17u8v0g6cxpcqan | jay-z | 2026-09-05T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-birmingham-1anzkoygkdrzveg | niall-horan | 2026-09-22T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-newcastle-upon-tyne-g5vhz_6jezgkf | niall-horan | 2026-09-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-manchester-1amzkozgkdqek4f | niall-horan | 2026-09-25T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-glasgow-1auzkozgkeyxugy | niall-horan | 2026-09-28T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-sheffield-16gzkozpuza5kedv | niall-horan | 2026-09-29T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdkpykl | niall-horan | 2026-10-02T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-london-1agzkoygkdvbgdi | niall-horan | 2026-10-03T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-detroit-vv17ozbsgki0b7ti | doja-cat | 2026-10-01T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-chicago-vv178zbsgknyfves | doja-cat | 2026-10-04T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-minneapolis-vv17bzbsgknj3vy9 | doja-cat | 2026-10-05T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-kansas-city-vv17bzbsgkwntdvb | doja-cat | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-denver-g5vzzbsefo0an | doja-cat | 2026-10-09T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-west-valley-city-g5vzzbslbgavf | doja-cat | 2026-10-11T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-vancouver-1aozkgygkdosigy | doja-cat | 2026-10-14T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-seattle-vvg1hzbslq8got | doja-cat | 2026-10-16T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-doja-cat-2026-portland-vvg1hzbsnaneis | doja-cat | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-vancouver-1aozk3agkddnbd1 | sombr | 2026-09-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-seattle-vvg1hz_feci1ir | sombr | 2026-10-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-portland-vvg1hz_fljtdxu | sombr | 2026-10-03T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-sacramento-g5vyz_fli21bj | sombr | 2026-10-07T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-san-jose-g5vyz_fljzy-y | sombr | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-anaheim-vv1fe8v0xoqvz7u1ue | sombr | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-inglewood-vv16azk3azmzauak1v | sombr | 2026-10-11T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-teddy-swims-2026-saint-louis-vv17bz_fgkuhx1g- | teddy-swims | 2026-09-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-chicago-vv178z_fgkuxeurm | teddy-swims | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-detroit-vv17oz_fgktec1td | teddy-swims | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-columbus-vv17fz_fgkdx0-pn | teddy-swims | 2026-09-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-brooklyn-1adzz_fgknbfkoe | teddy-swims | 2026-10-02T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-toronto-1avzz_fgku3eucw | teddy-swims | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-montreal-1ad7z_fgkm9lfwl | teddy-swims | 2026-10-07T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-boston-vv177z_fgktnmxtd | teddy-swims | 2026-10-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-philadelphia-1adzz_fgkm5wpjt | teddy-swims | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-washington-16vfz_f0sg7tpdk | teddy-swims | 2026-10-13T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-teddy-swims-2026-nashville-g5viz_fxfo1dj | teddy-swims | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-don-omar-2026-reading-vvg1fz_1dkrsjw | don-omar | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-boston-vvg17z_1wjhcnw | don-omar | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-dallas-vvg1yz_1d_hllv | don-omar | 2026-10-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-orlando-17fov0g61tztiqr | don-omar | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-miami-vvg1vz_1mbpqce | don-omar | 2026-10-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-rosemont-vvg18z_1bhcnvf | don-omar | 2026-10-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-brooklyn-17gzv0g61dlian2 | don-omar | 2026-10-11T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-newark-vvg1fz_1tkglsd | don-omar | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-charlotte-g5evz_1d8lhpj | don-omar | 2026-10-15T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-washington-17a8v0g61wbnb9b | don-omar | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-atlanta-vvg1zz_1unelae | don-omar | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jk-dk | tyla | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jsxep | tyla | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-glasgow-g5dzz_2ebyvny | tyla | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-ottawa-1aszkowgkeikunf | sabaton | 2026-09-26T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-thunder-bay-177zv0g65pwqtbn | sabaton | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-winnipeg-1aozkobgkeldvu- | sabaton | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-london-g5dzz_1urr0et | beartooth | 2026-10-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-leeds-g5dzz_1wg9kbb | beartooth | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-glasgow-17uov0g61l4m0bs | beartooth | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-waite-park-vv1akzk3pgkdplazc | tobymac | 2026-09-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-sacramento-g5vyz_d8k3dby | andrea-bocelli | 2026-09-13T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-san-jose-g5vyz_ddjjmmd | andrea-bocelli | 2026-09-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_dnrpn0b | andrea-bocelli | 2026-09-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_ds3kpkv | andrea-bocelli | 2026-09-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-phoenix-16v0z_dq6g7w0ck | andrea-bocelli | 2026-09-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnetamw | michelle-branch | 2026-10-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnettzd | michelle-branch | 2026-10-03T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-los-angeles-vvg10z_cl6gfwp | michelle-branch | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-del-mar-vvg1iz_cje3msh | michelle-branch | 2026-10-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6g2lzmgt | sylvan-esso | 2026-10-05T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-washington-17a8v0g6gi4rjo9 | sylvan-esso | 2026-10-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgn5_o | sylvan-esso | 2026-10-08T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-durham-g5evz_1dgp5h6 | sylvan-esso | 2026-10-10T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-brooklyn-k7vgf_gpzpfnb | sylvan-esso | 2026-10-14T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-portland-vvg17z_gkbpmvl | sylvan-esso | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-boston-vvg17z_g2bjele | sylvan-esso | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-washington-17a8v0g6gphxucm | sienna-spiro | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-philadelphia-vvg1fz_gfaf9pc | sienna-spiro | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-boston-vvg17z_g1xnurg | malcolm-todd | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmrwkt | malcolm-todd | 2026-09-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmycf1 | malcolm-todd | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-detroit-vvg1oz_g99edo3 | malcolm-todd | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-nashville-g5viz_g1jq0ud | malcolm-todd | 2026-10-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-maryland-heights-vvg1bz_gclzidq | malcolm-todd | 2026-10-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_gkurbfe | malcolm-todd | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_g91pgfe | malcolm-todd | 2026-10-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-minneapolis-vvg1bz_gcw2bqa | malcolm-todd | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-salt-lake-city-g5vzz_g2farap | malcolm-todd | 2026-10-14T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3nanrd | malcolm-todd | 2026-10-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-seattle-vvg1hz_g3n1blo | malcolm-todd | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-las-vegas-17ayv0g6ujiqnhu | dinosaur-jr | 2026-10-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-tempe-17k8v0g6ujk40ss | dinosaur-jr | 2026-10-11T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-anaheim-vvg10z_uu7ndiz | dinosaur-jr | 2026-10-16T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-los-angeles-vvg10z_ueyxka- | dinosaur-jr | 2026-10-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtkw4- | metallica | 2026-10-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfu40 | metallica | 2026-10-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agkns9qkh | metallica | 2026-10-09T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agknswc9w | metallica | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4n | metallica | 2026-10-16T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4i | metallica | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-edinburgh-1adbz_dgkdivmtc | foy-vance | 2026-10-17T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-stirling-1auzkoegkew3ujs | foy-vance | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-london-g5dzz_audfsuq | the-lemonheads | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-birmingham-g5dzzbgmxafgo | the-lemonheads | 2026-10-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-kenai-vvg1hz_5wlthim | tommy-emmanuel | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-fairbanks-vvg1hz_5i6wuhs | tommy-emmanuel | 2026-10-12T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-sheffield-g5vhz_5sagy5t | amble | 2026-09-28T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-glasgow-g5dzz_5s1tpu0 | amble | 2026-09-30T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-newcastle-upon-tyne-g5dzz_clsmpcl | amble | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-manchester-17uov0g65bdcgvp | amble | 2026-10-03T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nottingham-g5vhz_5y-lcue | amble | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-cardiff-g5vhz_5sqgbqz | amble | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-london-g5dzz_5sz3vmk | amble | 2026-10-08T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-pittsburgh-1avbz_fgklj6-n0 | the-red-clay-strays | 2026-10-01T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0exkqy | the-red-clay-strays | 2026-10-07T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0kf9e_ | the-red-clay-strays | 2026-10-08T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-orlando-1aefz_fgkvf8_5e | the-red-clay-strays | 2026-10-14T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-charleston-g5evz_akknp14 | the-red-clay-strays | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-valley-center-vvg1iz_5rl2h1n | daughtry | 2026-10-04T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-troy-k7vgf_grfdn3c | daughtry | 2026-10-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-uncasville-g5vvz_gld3qfv | daughtry | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-waterloo-k7vgf_gm6sksu | daughtry | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-atlantic-city-vvg1fz_gskknq7 | daughtry | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-durant-vvg1yz_ggasrcz | riley-green | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-latto-2026-petersburg-vvg17z_2r3gq4t | latto | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-west-valley-city-g5vzz_ds6yaft | staind | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-wheatland-g5vyz_dwgijmi | staind | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-ontario-vv170z_dgkwr0_z6 | staind | 2026-10-11T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-tulsa-1aezz_dgkvarp7d | staind | 2026-10-16T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-the-woodlands-g5diz_dbvgqfi | staind | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa | warren-zeiders | 2026-10-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-leeds-g5dzzbubyjrus | warren-zeiders | 2026-10-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-manchester-g5vhzbgtrzaec | warren-zeiders | 2026-10-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-bristol-g5dzzbgxgfjht | warren-zeiders | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-birmingham-g5dzzbu22x97x | warren-zeiders | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-london-g5vhzbgx4c4_f | warren-zeiders | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-las-vegas-17ayv0g61m2w1ya | mico | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-saint-louis-vvg1bz_ukkhzgh | rod-wave | 2026-10-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-nashville-g5viz_u63pwep | rod-wave | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-washington-17a8v0g6uelkuww | rod-wave | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | uicideboy | 2026-10-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | uicideboy | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vv1avzkfwgkdcqwfa | steve-lacy | 2026-10-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vvg17z_2dy9pyk | steve-lacy | 2026-10-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-camden-vv17fz_8gkl8lrzy | steve-lacy | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-chicago-vvg18z_1daahef | the-smashing-pumpkins | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-charlotte-g5evz_1dw8jew | the-smashing-pumpkins | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-jacksonville-17fov0g61t4w29c | the-smashing-pumpkins | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-atlanta-vvg1zz_83jdpwc | fuerza-regida | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-birmingham-1aozkfdgkeytw9q | fuerza-regida | 2026-10-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-albuquerque-g5vzz_8cnmbuy | fuerza-regida | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-orlando-17fov0g613pzs04 | journey | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-twenty-one-pilots-2026-columbus-vvg1fz_1uqt9_r | twenty-one-pilots | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl6xfl | earth-wind-fire | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-dallas-vvg1yz_kmvonlg | weezer | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-seattle-vvg1hzbmeehmj0 | mana | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-columbus-vv17fz_8gkvoktkm | jonas-brothers | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-lexington-1avbz_8gkb06ivs | jonas-brothers | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
