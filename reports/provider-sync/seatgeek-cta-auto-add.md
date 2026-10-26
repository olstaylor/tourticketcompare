# SeatGeek CTA auto-add log

Generated: 2026-10-26T22:46:12.951Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 4250
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4250
- Events already carrying a valid SeatGeek URL: 2430
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2430
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1820
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1402
- Skipped before any API call: 531 (past_event: 531)
- Events this run can check (window size): 160
- Rotation: window 8 of 9 (key 20752)
- Runs needed to check every eligible event once: 9
- Events selected/logged by this run: 160
- Events checked by this run: 160
- API calls made: 800
- Rate-limit responses: 0
- URLs added: 113
- Events skipped: 47
- no_candidates_returned: 44
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 800 --resume-from 'tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 3
- no_candidates_returned: 44

## Interpretation

- `URLs added: 113` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2430 event(s) already carried valid SeatGeek URLs before this run, including 2430 enrichment-eligible event(s).
- This run queried only the 1820 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | Andrea Bocelli | 2026-12-17 | New York | https://seatgeek.com/andrea-bocelli-tickets/new-york-new-york-madison-square-garden-2026-12-17-8-pm/concert/18039167 |
| tm-blue-october-2026-houston-g5diz_65lrohi | Blue October | 2026-12-18 | Houston | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-18-8-pm/concert/18141897 |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | Gracie Abrams | 2026-12-18 | Inglewood | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-18-8-pm/concert/18270524 |
| tm-blue-october-2026-houston-g5diz_65lyohs | Blue October | 2026-12-19 | Houston | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-19-8-pm/concert/18141898 |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | Pentatonix | 2026-12-19 | Glendale | https://seatgeek.com/pentatonix-tickets/glendale-arizona-desert-diamond-arena-2026-12-19-7-pm/concert/18427231 |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | Gracie Abrams | 2026-12-19 | Inglewood | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-19-8-pm/concert/18270527 |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | Stevie Wonder | 2026-12-19 | Inglewood | https://seatgeek.com/stevie-wonder-tickets/inglewood-california-intuit-dome-2026-12-19-8-pm/concert/18570218 |
| tm-blue-october-2026-houston-g5diz_1sa9wed | Blue October | 2026-12-20 | Houston | https://seatgeek.com/blue-october-tickets/houston-texas-713-music-hall-2026-12-20-8-pm/concert/18248695 |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0eryu | Gracie Abrams | 2026-12-20 | Inglewood | https://seatgeek.com/gracie-abrams-tickets/inglewood-california-kia-forum-2026-12-20-8-pm/concert/18270529 |
| tm-andrea-bocelli-2026-pittsburgh-1apzk8vgkdk8zer | Andrea Bocelli | 2026-12-21 | Pittsburgh | https://seatgeek.com/andrea-bocelli-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-12-21-8-pm/concert/18039186 |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx | Jonas Brothers | 2026-12-22 | Newark | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-22-7-30-pm/concert/18532484 |
| tm-andrea-bocelli-2026-philadelphia-1ayzk8ygkdwg9ej | Andrea Bocelli | 2026-12-22 | Philadelphia | https://seatgeek.com/andrea-bocelli-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-12-22-8-pm/concert/18039187 |
| tm-pentatonix-2026-inglewood-vv1aazkf7gkdi1gsn | Pentatonix | 2026-12-22 | Inglewood | https://seatgeek.com/pentatonix-tickets/inglewood-california-kia-forum-2026-12-22-7-pm/concert/18427236 |
| tm-stella-lefty-2027-boston-vv168vp7y-kz7ukua | Stella Lefty | 2027-01-17 | Boston | https://seatgeek.com/stella-lefty-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-01-17-8-pm/concert/18527914 |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrjdss | Stella Lefty | 2027-01-19 | Brooklyn | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-19-7-pm/concert/18527915 |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrqdsw | Stella Lefty | 2027-01-20 | Brooklyn | https://seatgeek.com/stella-lefty-tickets/brooklyn-new-york-brooklyn-paramount-2027-01-20-7-pm/concert/18539681 |
| tm-alan-walker-2027-irving-vvg1yz_3nb2d-j | Alan Walker | 2027-01-22 | Irving | https://seatgeek.com/alan-walker-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-01-22-7-pm/concert/18591363 |
| tm-hilary-duff-2027-vancouver-1aozko7gkervl69 | Hilary Duff | 2027-01-22 | Vancouver | https://seatgeek.com/hilary-duff-tickets/vancouver-canada-rogers-arena-2027-01-22-7-30-pm/concert/18070273 |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi | Eagles | 2027-01-22 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-22-8-30-pm/concert/18421047 |
| tm-alan-walker-2027-houston-g5diz_3no4w3_ | Alan Walker | 2027-01-23 | Houston | https://seatgeek.com/alan-walker-tickets/houston-texas-713-music-hall-2027-01-23-7-pm/concert/18591361 |
| tm-stella-lefty-2027-washington-1a4zkffgkdf8c-z | Stella Lefty | 2027-01-23 | Washington | https://seatgeek.com/stella-lefty-tickets/washington-district-of-columbia-the-anthem-dc-2027-01-23-8-pm/concert/18527882 |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpt2sm | Eagles | 2027-01-23 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-23-8-30-pm/concert/18421046 |
| tm-hilary-duff-2027-calgary-1k78v0ojga2h3es | Hilary Duff | 2027-01-26 | Calgary | https://seatgeek.com/hilary-duff-tickets/calgary-canada-scotiabank-saddledome-2027-01-26-7-30-pm/concert/18070275 |
| tm-gracie-abrams-2027-seattle-vvg1hz_1bnjn8f | Gracie Abrams | 2027-01-26 | Seattle | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-26-8-pm/concert/18270533 |
| tm-hilary-duff-2027-edmonton-1k78v0ooga1ytpq | Hilary Duff | 2027-01-27 | Edmonton | https://seatgeek.com/hilary-duff-tickets/edmonton-canada-rogers-place-2027-01-27-7-30-pm/concert/18070276 |
| tm-gracie-abrams-2027-seattle-vvg1hz_5rykvjn | Gracie Abrams | 2027-01-27 | Seattle | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-27-8-pm/concert/18270531 |
| tm-andrea-bocelli-2027-charlotte-g5evz_8mutuyo | Andrea Bocelli | 2027-01-29 | Charlotte | https://seatgeek.com/andrea-bocelli-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-01-29-8-pm/concert/18581438 |
| tm-gracie-abrams-2027-seattle-vvg1hz_5ry97ef | Gracie Abrams | 2027-01-29 | Seattle | https://seatgeek.com/gracie-abrams-tickets/seattle-washington-climate-pledge-arena-2027-01-29-8-pm/concert/18270535 |
| tm-hilary-duff-2027-winnipeg-1av7z_7gknwgxan | Hilary Duff | 2027-01-30 | Winnipeg | https://seatgeek.com/hilary-duff-tickets/winnipeg-canada-canada-life-centre-2027-01-30-7-30-pm/concert/18070916 |
| tm-andrea-bocelli-2027-baltimore-1a4zkffgkepsf12 | Andrea Bocelli | 2027-01-31 | Baltimore | https://seatgeek.com/andrea-bocelli-tickets/baltimore-maryland-cfg-bank-arena-2027-01-31-8-pm/concert/18581441 |
| tm-gracie-abrams-2027-portland-vvg1hz_1byq5cg | Gracie Abrams | 2027-01-31 | Portland | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-01-31-8-pm/concert/18270537 |
| tm-gracie-abrams-2027-portland-vvg1hz_1byqdcd | Gracie Abrams | 2027-02-01 | Portland | https://seatgeek.com/gracie-abrams-tickets/portland-oregon-moda-center-2027-02-01-8-pm/concert/18270540 |
| tm-andrea-bocelli-2027-atlanta-vvg1zz_36bbobm | Andrea Bocelli | 2027-02-02 | Atlanta | https://seatgeek.com/andrea-bocelli-tickets/atlanta-georgia-state-farm-arena-1-2027-02-02-8-pm/concert/18581439 |
| tm-tobymac-2027-tampa-vvg1vz_oe_5n5h | TobyMac | 2027-02-04 | Tampa | https://seatgeek.com/tobymac-tickets/tampa-florida-benchmark-international-arena-2027-02-04-7-pm/concert/18542762 |
| tm-andrea-bocelli-2027-austin-g5diz_3kpl_-e | Andrea Bocelli | 2027-02-04 | Austin | https://seatgeek.com/andrea-bocelli-tickets/austin-texas-moody-center-atx-2027-02-04-8-pm/concert/18581440 |
| tm-greta-van-fleet-2027-tampa-vvg1vz_kmcwtil | Greta Van Fleet | 2027-02-05 | Tampa | https://seatgeek.com/greta-van-fleet-tickets/tampa-florida-benchmark-international-arena-2027-02-05-7-pm/concert/18641947 |
| tm-fantasia-2027-washington-1ka8vpuogaub0mr | Fantasia | 2027-02-05 | Washington | https://seatgeek.com/fantasia-tickets/washington-district-of-columbia-capital-one-arena-2027-02-05-8-pm/concert/18629248 |
| tm-andrea-bocelli-2027-dallas-vvg1yz_33_tj3c | Andrea Bocelli | 2027-02-05 | Dallas | https://seatgeek.com/andrea-bocelli-tickets/dallas-texas-american-airlines-center-2027-02-05-8-pm/concert/18581442 |
| tm-don-omar-2027-sacramento-g5vyz_u1sfm0b | Don Omar | 2027-02-05 | Sacramento | https://seatgeek.com/don-omar-tickets/sacramento-california-golden-1-center-2027-02-05-8-pm/concert/18326389 |
| tm-greta-van-fleet-2027-jacksonville-1aefz_kgkdyuafx | Greta Van Fleet | 2027-02-06 | Jacksonville | https://seatgeek.com/greta-van-fleet-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-06-7-pm/concert/18641952 |
| tm-tobymac-2027-orlando-1axzkf_gkdtkgpv | TobyMac | 2027-02-06 | Orlando | https://seatgeek.com/tobymac-tickets/orlando-florida-kia-center-2027-02-06-7-pm/concert/18542768 |
| tm-alan-walker-2027-washington-1a4zkftgkdat1lk | Alan Walker | 2027-02-06 | Washington | https://seatgeek.com/alan-walker-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-06-8-pm/concert/18591378 |
| tm-dylan-scott-2027-boston-vv1avzkftgkeyygcg | Dylan Scott | 2027-02-06 | Boston | https://seatgeek.com/dylan-scott-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-06-8-pm/concert/18601525 |
| tm-tobymac-2027-estero-vvg1vz_onusnh8 | TobyMac | 2027-02-07 | Estero | https://seatgeek.com/tobymac-tickets/estero-florida-hertz-arena-2027-02-07-6-30-pm/concert/18542782 |
| tm-don-omar-2027-seattle-vvg1hz_u4jzxck | Don Omar | 2027-02-07 | Seattle | https://seatgeek.com/don-omar-tickets/seattle-washington-climate-pledge-arena-2027-02-07-8-pm/concert/18325125 |
| tm-greta-van-fleet-2027-atlanta-vvg1zz_kmneaip | Greta Van Fleet | 2027-02-09 | Atlanta | https://seatgeek.com/greta-van-fleet-tickets/atlanta-georgia-state-farm-arena-1-2027-02-09-7-pm/concert/18641951 |
| tm-alan-walker-2027-boston-vv1a8vpfzgauaajv | Alan Walker | 2027-02-10 | Boston | https://seatgeek.com/alan-walker-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-02-10-7-pm/concert/18591763 |
| tm-andrea-bocelli-2027-orlando-1axzkfigkdrsgpw | Andrea Bocelli | 2027-02-10 | Orlando | https://seatgeek.com/andrea-bocelli-tickets/orlando-florida-kia-center-2027-02-10-8-pm/concert/18581443 |
| tm-greta-van-fleet-2027-nashville-g5viz_kzhjzwy | Greta Van Fleet | 2027-02-10 | Nashville | https://seatgeek.com/greta-van-fleet-tickets/nashville-tennessee-bridgestone-arena-2027-02-10-7-pm/concert/18641949 |
| tm-the-lemonheads-2027-brooklyn-k7vgf_3rtiqkk | The Lemonheads | 2027-02-11 | Brooklyn | https://seatgeek.com/the-lemonheads-tickets/brooklyn-new-york-brooklyn-bowl-ny-2027-02-11-8-pm/concert/18593930 |
| tm-gracie-abrams-2027-chicago-vv1fvzv0pycdz72ag6 | Gracie Abrams | 2027-02-11 | Chicago | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-11-8-pm/concert/18270541 |
| tm-don-omar-2027-fresno-g5vyz_u5k7ws7 | Don Omar | 2027-02-11 | Fresno | https://seatgeek.com/don-omar-tickets/fresno-california-save-mart-center-2027-02-11-8-pm/concert/18325133 |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3nv0vjm | Andrea Bocelli | 2027-02-12 | Hollywood | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-12-8-pm/concert/18581450 |
| tm-greta-van-fleet-2027-rosemont-vv178z_kgkmrjctr | Greta Van Fleet | 2027-02-12 | Rosemont | https://seatgeek.com/greta-van-fleet-tickets/rosemont-illinois-allstate-arena-2027-02-12-7-pm/concert/18641950 |
| tm-gracie-abrams-2027-chicago-vvg18z_5rd-dah | Gracie Abrams | 2027-02-12 | Chicago | https://seatgeek.com/gracie-abrams-tickets/chicago-illinois-united-center-2027-02-12-8-pm/concert/18270544 |
| tm-don-omar-2027-inglewood-vvg10z_u2a3ul3 | Don Omar | 2027-02-12 | Inglewood | https://seatgeek.com/don-omar-tickets/inglewood-california-intuit-dome-2027-02-12-8-pm/concert/18326622 |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3ervkx7 | Andrea Bocelli | 2027-02-13 | Hollywood | https://seatgeek.com/andrea-bocelli-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-13-8-pm/concert/18581451 |
| tm-blue-october-2027-las-vegas-17ayv0g61ppuqbc | Blue October | 2027-02-13 | Las Vegas | https://seatgeek.com/blue-october-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2027-02-13-7-pm/concert/18239352 |
| tm-yuridia-2027-phoenix-1a_zkfxgkecvpec | Yuridia | 2027-02-13 | Phoenix | https://seatgeek.com/yuridia-tickets/phoenix-arizona-arizona-financial-theatre-2027-02-13-8-pm/concert/18570386 |
| tm-gracie-abrams-2027-nashville-g5viz_51oey1w | Gracie Abrams | 2027-02-14 | Nashville | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-14-8-pm/concert/18270545 |
| tm-greta-van-fleet-2027-minneapolis-vv17bz_kgku0ofzs | Greta Van Fleet | 2027-02-15 | Minneapolis | https://seatgeek.com/greta-van-fleet-tickets/minneapolis-minnesota-target-center-2027-02-15-7-pm/concert/18641960 |
| tm-gracie-abrams-2027-nashville-g5viz_5rgv7ra | Gracie Abrams | 2027-02-15 | Nashville | https://seatgeek.com/gracie-abrams-tickets/nashville-tennessee-bridgestone-arena-2027-02-15-8-pm/concert/18270546 |
| tm-alan-walker-2027-montreal-1aszkfngkelr9-v | Alan Walker | 2027-02-16 | Montreal | https://seatgeek.com/alan-walker-tickets/montreal-canada-mtelus-2027-02-16-8-pm/concert/18590510 |
| tm-nickelback-2027-chicago-vv1a7zk4agkexo6el | Nickelback | 2027-02-18 | Chicago | https://seatgeek.com/nickelback-tickets/chicago-illinois-united-center-2027-02-18-6-30-pm/concert/18664573 |
| tm-yuridia-2027-las-vegas-1ayzkfngkdql5vb | Yuridia | 2027-02-18 | Las Vegas | https://seatgeek.com/yuridia-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2027-02-18-8-pm/concert/18570391 |
| tm-fantasia-2027-new-orleans-g5viz_k6css2k | Fantasia | 2027-02-19 | New Orleans | https://seatgeek.com/fantasia-tickets/new-orleans-louisiana-smoothie-king-center-2027-02-19-8-pm/concert/18629243 |
| tm-yuridia-2027-inglewood-vvg1iz_3kmopkh | Yuridia | 2027-02-20 | Inglewood | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-20-8-pm/concert/18570397 |
| tm-hans-zimmer-2027-newark-vv1aezkfygkepjhre | Hans Zimmer | 2027-02-21 | Newark | https://seatgeek.com/hans-zimmer-tickets/newark-new-jersey-prudential-center-2027-02-21-7-30-pm/concert/18601919 |
| tm-nickelback-2027-nashville-g5viz_frya27y | Nickelback | 2027-02-21 | Nashville | https://seatgeek.com/nickelback-tickets/nashville-tennessee-bridgestone-arena-2027-02-21-6-30-pm/concert/18664585 |
| tm-yuridia-2027-inglewood-vvg1iz_33c4njl | Yuridia | 2027-02-21 | Inglewood | https://seatgeek.com/yuridia-tickets/inglewood-california-youtube-theater-2027-02-21-8-pm/concert/18584334 |
| tm-hans-zimmer-2027-philadelphia-1kgzvpgaga1lecy | Hans Zimmer | 2027-02-23 | Philadelphia | https://seatgeek.com/hans-zimmer-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-02-23-7-30-pm/concert/18601920 |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqeia0 | Gracie Abrams | 2027-02-23 | Atlanta | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-23-8-pm/concert/18270553 |
| tm-hans-zimmer-2027-boston-vv1avzkftgkdjvzxr | Hans Zimmer | 2027-02-24 | Boston | https://seatgeek.com/hans-zimmer-tickets/boston-massachusetts-td-garden-2027-02-24-7-30-pm/concert/18601922 |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqiiai | Gracie Abrams | 2027-02-24 | Atlanta | https://seatgeek.com/gracie-abrams-tickets/atlanta-georgia-state-farm-arena-1-2027-02-24-8-pm/concert/18270554 |
| tm-yuridia-2027-fresno-g5vyz_35vhmjx | Yuridia | 2027-02-25 | Fresno | https://seatgeek.com/yuridia-tickets/fresno-california-save-mart-center-2027-02-25-8-pm/concert/18570392 |
| tm-nickelback-2027-hollywood-vvg1vz_fpmhiza | Nickelback | 2027-02-26 | Hollywood | https://seatgeek.com/nickelback-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-26-6-30-pm/concert/18664588 |
| tm-alan-walker-2027-chicago-vv1k8z_3gyg7zohx | Alan Walker | 2027-02-26 | Chicago | https://seatgeek.com/alan-walker-tickets/chicago-illinois-byline-bank-aragon-ballroom-2027-02-26-6-pm/concert/18590319 |
| tm-gracie-abrams-2027-charlotte-g5evz_am0wlwu | Gracie Abrams | 2027-02-26 | Charlotte | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-26-8-pm/concert/18270558 |
| tm-don-omar-2027-rosemont-vvg18z_u5mkrgh | Don Omar | 2027-02-26 | Rosemont | https://seatgeek.com/don-omar-tickets/rosemont-illinois-allstate-arena-2027-02-26-8-pm/concert/18325237 |
| tm-morat-2027-inglewood-vvg10z_1tsiuwe | Morat | 2027-02-26 | Inglewood | https://seatgeek.com/morat-tickets/inglewood-california-intuit-dome-2027-02-26-8-pm/concert/18252820 |
| tm-gracie-abrams-2027-charlotte-g5evz_5ryzbyv | Gracie Abrams | 2027-02-27 | Charlotte | https://seatgeek.com/gracie-abrams-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-02-27-8-pm/concert/18270559 |
| tm-gracie-abrams-2027-boston-vv177z_agkwp_mnl | Gracie Abrams | 2027-03-01 | Boston | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-01-8-pm/concert/18270560 |
| tm-nickelback-2027-atlanta-vvg1zz_f9i_ugh | Nickelback | 2027-03-02 | Atlanta | https://seatgeek.com/nickelback-tickets/atlanta-georgia-state-farm-arena-1-2027-03-02-6-30-pm/concert/18664590 |
| tm-gracie-abrams-2027-boston-vvg17z_5rug2cb | Gracie Abrams | 2027-03-02 | Boston | https://seatgeek.com/gracie-abrams-tickets/boston-massachusetts-td-garden-2027-03-02-8-pm/concert/18270564 |
| tm-don-omar-2027-newark-vvg1fz_u5xkezy | Don Omar | 2027-03-03 | Newark | https://seatgeek.com/don-omar-tickets/newark-new-jersey-prudential-center-2027-03-03-8-pm/concert/18325178 |
| tm-hans-zimmer-2027-detroit-vv17oz_3gky-owzw | Hans Zimmer | 2027-03-03 | Detroit | https://seatgeek.com/hans-zimmer-tickets/detroit-michigan-little-caesars-arena-2027-03-03-7-30-pm/concert/18601918 |
| tm-needtobreathe-2027-brooklyn-k7vgf_kxvnxba | NEEDTOBREATHE | 2027-03-04 | Brooklyn | https://seatgeek.com/needtobreathe-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-04-6-pm/concert/18621542 |
| tm-nickelback-2027-raleigh-g5evz_fh5odfi | Nickelback | 2027-03-04 | Raleigh | https://seatgeek.com/nickelback-tickets/raleigh-north-carolina-lenovo-center-2027-03-04-6-30-pm/concert/18664594 |
| tm-gracie-abrams-2027-washington-1avfz_agksfejeq | Gracie Abrams | 2027-03-04 | Washington | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-04-8-pm/concert/18270566 |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | Lukas Graham | 2027-03-05 | Tampa | https://seatgeek.com/lukas-graham-tickets/tampa-florida-the-ritz-ybor-2027-03-05-6-pm/concert/18617618 |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | Greta Van Fleet | 2027-03-05 | Boston | https://seatgeek.com/greta-van-fleet-tickets/boston-massachusetts-td-garden-2027-03-05-7-pm/concert/18641971 |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | NEEDTOBREATHE | 2027-03-05 | Boston | https://seatgeek.com/needtobreathe-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-05-7-pm/concert/18621543 |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | Nickelback | 2027-03-06 | Newark | https://seatgeek.com/nickelback-tickets/newark-new-jersey-prudential-center-2027-03-06-6-30-pm/concert/18664595 |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | Polyphia | 2027-03-06 | Brooklyn | https://seatgeek.com/polyphia-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-06-7-30-pm/concert/18312312 |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | Nickelback | 2027-03-08 | Washington | https://seatgeek.com/nickelback-tickets/washington-district-of-columbia-capital-one-arena-2027-03-08-6-30-pm/concert/18664598 |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | Greta Van Fleet | 2027-03-08 | Brooklyn | https://seatgeek.com/greta-van-fleet-tickets/brooklyn-new-york-barclays-center-2027-03-08-7-pm/concert/18641973 |
| tm-nickelback-2027-boston-vv1avzk4egkdzjayi | Nickelback | 2027-03-10 | Boston | https://seatgeek.com/nickelback-tickets/boston-massachusetts-td-garden-2027-03-10-6-30-pm/concert/18664600 |
| tm-greta-van-fleet-2027-philadelphia-1adzz_kgkv_zy6y | Greta Van Fleet | 2027-03-10 | Philadelphia | https://seatgeek.com/greta-van-fleet-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-10-7-pm/concert/18641974 |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | Rod Stewart | 2027-03-12 | Hollywood | https://seatgeek.com/rod-stewart-tickets/hollywood-florida-hard-rock-live-hollywood-2027-03-12-8-pm/concert/18591364 |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | Def Leppard | 2027-03-13 | Newark | https://seatgeek.com/def-leppard-tickets/newark-new-jersey-prudential-center-2027-03-13-7-pm/concert/18662381 |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | Greta Van Fleet | 2027-03-15 | Fort Worth | https://seatgeek.com/greta-van-fleet-tickets/fort-worth-texas-dickies-arena-2027-03-15-7-pm/concert/18641983 |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | Def Leppard | 2027-03-17 | Boston | https://seatgeek.com/def-leppard-tickets/boston-massachusetts-td-garden-2027-03-17-7-pm/concert/18662380 |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | Greta Van Fleet | 2027-03-19 | Anaheim | https://seatgeek.com/greta-van-fleet-tickets/anaheim-california-honda-center-2027-03-19-7-pm/concert/18641986 |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | Def Leppard | 2027-03-21 | Washington | https://seatgeek.com/def-leppard-tickets/washington-district-of-columbia-capital-one-arena-2027-03-21-7-pm/concert/18662383 |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | Nickelback | 2027-03-24 | Buffalo | https://seatgeek.com/nickelback-tickets/buffalo-new-york-keybank-center-2027-03-24-6-30-pm/concert/18664602 |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | Greta Van Fleet | 2027-03-24 | Seattle | https://seatgeek.com/greta-van-fleet-tickets/seattle-washington-climate-pledge-arena-2027-03-24-7-pm/concert/18641992 |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | Def Leppard | 2027-03-25 | Chicago | https://seatgeek.com/def-leppard-tickets/chicago-illinois-united-center-2027-03-25-7-pm/concert/18662394 |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | Nickelback | 2027-03-26 | Detroit | https://seatgeek.com/nickelback-tickets/detroit-michigan-little-caesars-arena-2027-03-26-6-30-pm/concert/18664604 |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | 2027-03-26 | Hollywood | https://seatgeek.com/warren-zeiders-tickets/hollywood-florida-daer-nightclub-at-the-seminole-hard-rock-hotel-casino-2027-03-26-7-pm/concert/18649740 |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | Greta Van Fleet | 2027-03-30 | Denver | https://seatgeek.com/greta-van-fleet-tickets/denver-colorado-ball-arena-2027-03-30-7-pm/concert/18641999 |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | Nickelback | 2027-04-03 | Edmonton | https://seatgeek.com/nickelback-tickets/edmonton-canada-rogers-place-2027-04-03-6-30-pm/concert/18664631 |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | Nickelback | 2027-04-06 | Calgary | https://seatgeek.com/nickelback-tickets/calgary-canada-scotiabank-saddledome-2027-04-06-6-30-pm/concert/18664633 |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | Nickelback | 2027-04-09 | Vancouver | https://seatgeek.com/nickelback-tickets/vancouver-canada-rogers-arena-2027-04-09-6-30-pm/concert/18664638 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-beartooth-2026-hollywood-vvg10z_1ikgdyb | Beartooth | 2026-12-18 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/beartooth-tickets/los-angeles-california-hollywood-palladium-2026-12-18-5-30-pm/concert/18253075 |
| tm-five-finger-death-punch-2027-manchester-g5vhz_gnh6q4f | Five Finger Death Punch | 2027-01-16 | Manchester | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes | Five Finger Death Punch | 2027-01-17 | Glasgow | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s | Five Finger Death Punch | 2027-01-22 | Birmingham | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr | Nothing But Thieves | 2027-02-04 | Nottingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-philadelphia-1ayzk4vgkepepvt | Dancing With The Stars | 2027-02-04 | Philadelphia | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-york-g5diz_f1zup-t | Dancing With The Stars | 2027-02-05 | New York | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-washington-1a4zkfsgkew-uk5 | Dancing With The Stars | 2027-02-07 | Washington | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik | Nothing But Thieves | 2027-02-10 | Glasgow | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-boston-vv177z_kgks9d4wi | Dancing With The Stars | 2027-02-11 | Boston | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj | Nothing But Thieves | 2027-02-12 | Manchester | no_candidates_returned | - |
| tm-chelsea-cutler-2027-brooklyn-k7vgf_kze_vgc | Chelsea Cutler | 2027-02-12 | Brooklyn | city_or_metro_match_failed | https://seatgeek.com/chelsea-cutler-tickets/new-york-new-york-brooklyn-1-2027-02-12-7-pm/concert/18639182 |
| tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux | Nothing But Thieves | 2027-02-13 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-newark-vv17fz_kgkbxwhxi | Dancing With The Stars | 2027-02-13 | Newark | no_candidates_returned | - |
| tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt | Charli xcx | 2027-02-15 | Glasgow | no_candidates_returned | - |
| tm-charli-xcx-2027-manchester-1amzkfegkdf5asp | Charli xcx | 2027-02-17 | Manchester | no_candidates_returned | - |
| tm-dylan-gossett-2027-london-g5dzz_8kn_3tz | Dylan Gossett | 2027-02-18 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-rosemont-vv178z_kgku4hpsc | Dancing With The Stars | 2027-02-19 | Rosemont | no_candidates_returned | - |
| tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz | Dylan Gossett | 2027-02-21 | Birmingham | no_candidates_returned | - |
| tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2 | Kacey Musgraves | 2027-02-22 | Glasgow | no_candidates_returned | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct | Sienna Spiro | 2027-02-22 | Edinburgh | no_candidates_returned | - |
| tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt | Kacey Musgraves | 2027-02-24 | Manchester | no_candidates_returned | - |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | 2027-02-24 | London | no_candidates_returned | - |
| tm-kacey-musgraves-2027-london-1adjz_agkmwrf6s | Kacey Musgraves | 2027-02-26 | London | no_candidates_returned | - |
| tm-john-summit-2027-london-1agzk4egkdwrmjf | John Summit | 2027-02-27 | London | no_candidates_returned | - |
| tm-malcolm-todd-2027-birmingham-g5dzz_3nh3wrn | Malcolm Todd | 2027-02-27 | Birmingham | no_candidates_returned | - |
| tm-sienna-spiro-2027-manchester-17uov0g6ghevqqt | Sienna Spiro | 2027-03-01 | Manchester | no_candidates_returned | - |
| tm-sienna-spiro-2027-manchester-17uov0g6gnyji_e | Sienna Spiro | 2027-03-02 | Manchester | no_candidates_returned | - |
| tm-sleeping-with-sirens-2027-london-g5dzz_g5cip1i | Sleeping With Sirens | 2027-03-07 | London | no_candidates_returned | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | Teddy Swims | 2027-03-11 | Berlin | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-austin-g5diz_knamopo | Dancing With The Stars | 2027-03-12 | Austin | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-antonio-g5diz_kdu_auv | Dancing With The Stars | 2027-03-13 | San Antonio | no_candidates_returned | - |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | Fantasia | 2027-03-13 | Fort Worth | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-seattle-vvg1hz_f63jugd | Dancing With The Stars | 2027-03-22 | Seattle | no_candidates_returned | - |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | Sienna Spiro | 2027-03-24 | Berlin | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-sacramento-g5vyz_kzd-r6s | Dancing With The Stars | 2027-03-26 | Sacramento | no_candidates_returned | - |
| tm-the-warning-2027-glasgow-g5dzz_3cmwwj3 | The Warning | 2027-03-30 | Glasgow | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w | Lizzy McAlpine | 2027-03-31 | London | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p | Lizzy McAlpine | 2027-04-01 | London | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-anaheim-vv170z_kgkbh3n6- | Dancing With The Stars | 2027-04-01 | Anaheim | no_candidates_returned | - |
| tm-trivium-2027-manchester-1amzkffgkdkmgfp | Trivium | 2027-04-02 | Manchester | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk | Lizzy McAlpine | 2027-04-02 | London | no_candidates_returned | - |
| tm-the-warning-2027-london-1adjz_3gknpoval | The Warning | 2027-04-02 | London | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-hollywood-vvg10z_5blnvha | Nothing But Thieves | 2027-04-04 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/nothing-but-thieves-tickets/los-angeles-california-hollywood-palladium-2027-04-04-8-pm/concert/18266342 |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | Thirty Seconds to Mars | 2027-04-08 | Madrid | no_candidates_returned | - |
| tm-sabaton-2027-glasgow-17uov0g6g3si1v4 | Sabaton | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | Thirty Seconds to Mars | 2027-04-09 | Valencia | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

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
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | 2026-07-30T22:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | 2026-10-01T19:00:00-05:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-montreal-17g8v0g652qqblc | john-summit | 2026-10-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-tyla-2026-london-g5dzz_29jk-dk | tyla | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-london-g5dzz_29jsxep | tyla | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-glasgow-g5dzz_2ebyvny | tyla | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-manchester-17uov0g62k1nnho | tyla | 2026-10-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | 2026-10-22T16:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-ottawa-1aszkowgkeikunf | sabaton | 2026-09-26T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-thunder-bay-177zv0g65pwqtbn | sabaton | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-winnipeg-1aozkobgkeldvu- | sabaton | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | 2026-09-19T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | 2026-09-25T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-london-g5dzz_1urr0et | beartooth | 2026-10-03T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-leeds-g5dzz_1wg9kbb | beartooth | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-glasgow-17uov0g61l4m0bs | beartooth | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | 2026-09-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tobymac-2026-waite-park-vv1akzk3pgkdplazc | tobymac | 2026-09-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-sacramento-g5vyz_d8k3dby | andrea-bocelli | 2026-09-13T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-san-jose-g5vyz_ddjjmmd | andrea-bocelli | 2026-09-14T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_dnrpn0b | andrea-bocelli | 2026-09-16T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-hollywood-vvg1iz_ds3kpkv | andrea-bocelli | 2026-09-17T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-phoenix-16v0z_dq6g7w0ck | andrea-bocelli | 2026-09-19T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | 2026-09-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | 2026-09-22T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | 2026-09-28T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | 2026-09-30T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnetamw | michelle-branch | 2026-10-02T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-francisco-g5vyz_cnettzd | michelle-branch | 2026-10-03T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-los-angeles-vvg10z_cl6gfwp | michelle-branch | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-del-mar-vvg1iz_cje3msh | michelle-branch | 2026-10-05T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | 2026-10-07T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | 2026-10-11T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | 2026-10-12T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | 2026-10-09T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | 2026-09-30T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | 2026-09-26T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-washington-17a8v0g6gphxucm | sienna-spiro | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-philadelphia-vvg1fz_gfaf9pc | sienna-spiro | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-boston-vvg17z_gpsen49 | sienna-spiro | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-brooklyn-k7vgf_gre9jk_ | sienna-spiro | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-metallica-2026-las-vegas-1a9zko4gkdtkw4- | metallica | 2026-10-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfu40 | metallica | 2026-10-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agkns9qkh | metallica | 2026-10-09T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agknswc9w | metallica | 2026-10-11T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4n | metallica | 2026-10-16T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfq4i | metallica | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | 2026-10-07T23:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | 2026-10-03T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-edinburgh-1adbz_dgkdivmtc | foy-vance | 2026-10-17T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-stirling-1auzkoegkew3ujs | foy-vance | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_akto7o5 | foy-vance | 2026-10-23T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-london-g5dzz_a5f7udr | foy-vance | 2026-10-24T17:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-foy-vance-2026-manchester-g5vhz_3kr3ers | foy-vance | 2026-10-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-london-g5dzz_audfsuq | the-lemonheads | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-birmingham-g5dzzbgmxafgo | the-lemonheads | 2026-10-10T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-kenai-vvg1hz_5wlthim | tommy-emmanuel | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-fairbanks-vvg1hz_5i6wuhs | tommy-emmanuel | 2026-10-12T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-yacht-rock-revue-2026-huntsville-17fzv0g62kqgox0 | yacht-rock-revue | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-sheffield-g5vhz_5sagy5t | amble | 2026-09-28T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-glasgow-g5dzz_5s1tpu0 | amble | 2026-09-30T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-newcastle-upon-tyne-g5dzz_clsmpcl | amble | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-manchester-17uov0g65bdcgvp | amble | 2026-10-03T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-nottingham-g5vhz_5y-lcue | amble | 2026-10-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-cardiff-g5vhz_5sqgbqz | amble | 2026-10-06T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-london-g5dzz_5sz3vmk | amble | 2026-10-08T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-amble-2026-los-angeles-vv170z_agkrleod6 | amble | 2026-10-24T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-pittsburgh-1avbz_fgklj6-n0 | the-red-clay-strays | 2026-10-01T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | 2026-10-03T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0exkqy | the-red-clay-strays | 2026-10-07T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-fort-worth-vvg1yz_f0kf9e_ | the-red-clay-strays | 2026-10-08T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-orlando-1aefz_fgkvf8_5e | the-red-clay-strays | 2026-10-14T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-red-clay-strays-2026-charleston-g5evz_akknp14 | the-red-clay-strays | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-valley-center-vvg1iz_5rl2h1n | daughtry | 2026-10-04T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-troy-k7vgf_grfdn3c | daughtry | 2026-10-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-uncasville-g5vvz_gld3qfv | daughtry | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-waterloo-k7vgf_gm6sksu | daughtry | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-atlantic-city-vvg1fz_gskknq7 | daughtry | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-huntington-k7vgf_geicgms | daughtry | 2026-10-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-englewood-k7vgf_uejshyg | daughtry | 2026-10-21T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-daughtry-2026-danville-vvg17z_gy_imrz | daughtry | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | 2026-10-22T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | 2026-10-24T18:45:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-durant-vvg1yz_ggasrcz | riley-green | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | 2026-10-07T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | 2026-10-08T17:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-latto-2026-petersburg-vvg17z_2r3gq4t | latto | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | 2026-10-12T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-west-valley-city-g5vzz_ds6yaft | staind | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-wheatland-g5vyz_dwgijmi | staind | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-ontario-vv170z_dgkwr0_z6 | staind | 2026-10-11T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-tulsa-1aezz_dgkvarp7d | staind | 2026-10-16T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-the-woodlands-g5diz_dbvgqfi | staind | 2026-10-17T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-austin-g5diz_dykgajg | staind | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | 2026-10-25T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | 2026-10-23T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hilary-duff-2026-auckland-1ae8z_7gkmdmw55 | hilary-duff | 2026-10-20T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | 2026-10-25T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-ciudad-de-mexico-17azv0g65px_l4r | def-leppard | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-tlajomulco-de-zuniga-g5dvz_5361kla | def-leppard | 2026-10-22T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-saint-louis-vvg1bz_ukkhzgh | rod-wave | 2026-10-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-nashville-g5viz_u63pwep | rod-wave | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-washington-17a8v0g6uelkuww | rod-wave | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-detroit-vvg1oz_udpjh0t | rod-wave | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-pittsburgh-17aov0g6uky4i7y | rod-wave | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | uicideboy | 2026-10-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | uicideboy | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-birmingham-1aezz_6gkra4gmu | uicideboy | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vv1avzkfwgkdcqwfa | steve-lacy | 2026-10-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vvg17z_2dy9pyk | steve-lacy | 2026-10-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-camden-vv17fz_8gkl8lrzy | steve-lacy | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-washington-1a4zkfdgkeiyeai | steve-lacy | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-virginia-beach-vv1avzkf6gkesce9z | steve-lacy | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-raleigh-g5evz_8ci0_um | steve-lacy | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | 2026-10-12T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-chicago-vvg18z_1daahef | the-smashing-pumpkins | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-charlotte-g5evz_1dw8jew | the-smashing-pumpkins | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-jacksonville-17fov0g61t4w29c | the-smashing-pumpkins | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-tampa-vvg1vz_1xbgmwh | the-smashing-pumpkins | 2026-10-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-indianapolis-vvg1fz_1xmuiok | the-smashing-pumpkins | 2026-10-21T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-nashville-g5viz_1bbgqqs | the-smashing-pumpkins | 2026-10-23T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-atlanta-vvg1zz_83jdpwc | fuerza-regida | 2026-10-12T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-birmingham-1aozkfdgkeytw9q | fuerza-regida | 2026-10-14T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-albuquerque-g5vzz_8cnmbuy | fuerza-regida | 2026-10-18T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-fuerza-regida-2026-wheatland-g5vyz_81rrfk3 | fuerza-regida | 2026-10-24T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-journey-2026-orlando-17fov0g613pzs04 | journey | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-twenty-one-pilots-2026-columbus-vvg1fz_1uqt9_r | twenty-one-pilots | 2026-10-17T22:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl6xfl | earth-wind-fire | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl5e46 | earth-wind-fire | 2026-10-24T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-gorillaz-2026-phoenix-1av0z_agknirbye | gorillaz | 2026-10-24T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-dallas-vvg1yz_kmvonlg | weezer | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-weezer-2026-phoenix-1av0z_kgkmn6hu7 | weezer | 2026-10-21T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mana-2026-seattle-vvg1hzbmeehmj0 | mana | 2026-10-18T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-columbus-vv17fz_8gkvoktkm | jonas-brothers | 2026-10-16T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-lexington-1avbz_8gkb06ivs | jonas-brothers | 2026-10-17T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | 2026-10-19T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-jonas-brothers-2026-buffalo-k7vgf_8deoygx | jonas-brothers | 2026-10-20T23:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-raye-2026-london-g5vhz_frai-ph | raye | 2026-10-23T19:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | 2026-10-23T15:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | 2026-10-25T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | 2026-10-20T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-knocked-loose-2026-saint-louis-17f8v0g65e8csoj | knocked-loose | 2026-10-22T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-denver-g5vzz_g5e32h3 | phoebe-bridgers | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | 2026-10-22T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-seattle-vvg1hz_gkt8bhj | phoebe-bridgers | 2026-10-24T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-phoebe-bridgers-2026-vancouver-1778v0g6g1ql6ek | phoebe-bridgers | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-albuquerque-g5vzz_5m9qykz | bryson-tiller | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-phoenix-17k8v0g65lc9irs | bryson-tiller | 2026-10-21T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-anaheim-vvg10z_59jfknv | bryson-tiller | 2026-10-23T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-chula-vista-vvg1iz_5qdpyt3 | bryson-tiller | 2026-10-25T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-arcangel-2026-brooklyn-17gzv0g61ux2pkd | arcangel | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | 2026-10-20T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | 2026-10-22T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | 2026-10-24T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-katseye-2026-washington-17a8v0g619llzuk | katseye | 2026-10-23T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ty-myers-2026-evansville-vv1aazkowgkd1n5gg | ty-myers | 2026-10-24T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dan-shay-2026-rogers-g5viz_1x8yivv | dan-shay | 2026-10-24T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
