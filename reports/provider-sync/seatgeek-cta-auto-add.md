# SeatGeek CTA auto-add log

Generated: 2026-10-21T21:43:30.077Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 3894
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3050
- Events already carrying a valid SeatGeek URL: 1884
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1429
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1621
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1322
- Skipped before any API call: 400 (past_event: 400)
- Events this run can check (window size): 160
- Rotation: window 3 of 9 (key 20747)
- Runs needed to check every eligible event once: 9
- Events selected/logged by this run: 160
- Events checked by this run: 160
- API calls made: 800
- Rate-limit responses: 0
- URLs added: 101
- Events skipped: 59
- no_candidates_returned: 56
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 800 --resume-from 'tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp'
- Accepted venue mismatches: 3
- Conflicts found: 2

## Skipped reasons

- conflicting_same_date_city_candidates: 2
- no_candidates_returned: 56
- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 101` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1884 event(s) already carried valid SeatGeek URLs before this run, including 1429 enrichment-eligible event(s).
- This run queried only the 1621 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-alan-walker-2027-los-angeles-vvg1iz_3n0r6vh | Alan Walker | 2027-03-06 | Los Angeles | https://seatgeek.com/alan-walker-tickets/los-angeles-california-the-torch-at-la-coliseum-2027-03-06-6-pm/concert/18591776 |
| tm-dinosaur-jr-2027-toronto-1a8zkf4gkdtrlfj | Dinosaur Jr. | 2027-03-07 | Toronto | https://seatgeek.com/dinosaur-jr-tickets/toronto-canada-the-danforth-music-hall-2027-03-07-7-pm/concert/18540457 |
| tm-backstreet-boys-2027-toronto-1a8zk4agkeehx1f | Backstreet Boys | 2027-03-07 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-07-8-pm/concert/18674614 |
| tm-staind-2027-reading-vv1aezk4vgkeshnyh | Staind | 2027-03-09 | Reading | https://seatgeek.com/staind-tickets/reading-pennsylvania-santander-arena-2027-03-09-6-pm/concert/18654544 |
| tm-def-leppard-2027-toronto-1a8zk4egkdrqf1w | Def Leppard | 2027-03-09 | Toronto | https://seatgeek.com/def-leppard-tickets/toronto-canada-scotiabank-arena-2027-03-09-7-pm/concert/18662456 |
| tm-chelsea-cutler-2027-boise-g5vzz_ksxzvbs | Chelsea Cutler | 2027-03-10 | Boise | https://seatgeek.com/chelsea-cutler-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-03-10-7-pm/concert/18639212 |
| tm-needtobreathe-2027-asheville-g5evz_kd9sqw9 | NEEDTOBREATHE | 2027-03-11 | Asheville | https://seatgeek.com/needtobreathe-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-11-7-pm/concert/18621552 |
| tm-tommy-emmanuel-2027-vancouver-1aozkfugkdvinj7 | Tommy Emmanuel | 2027-03-12 | Vancouver | https://seatgeek.com/tommy-emmanuel-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-12-8-pm/concert/18633861 |
| tm-pink-martini-2027-toronto-177zv0g65s2z1n6 | Pink Martini | 2027-03-16 | Toronto | https://seatgeek.com/pink-martini-tickets/toronto-canada-roy-thomson-hall-2027-03-16-8-pm/concert/18281445 |
| tm-polyphia-2027-birmingham-1aozkfbgkdtjfo5 | Polyphia | 2027-03-17 | Birmingham | https://seatgeek.com/polyphia-tickets/birmingham-alabama-avondale-brewing-company-2027-03-17-7-30-pm/concert/18536027 |
| tm-saint-levant-2027-ottawa-1aszkf_gkdi5bcd | Saint Levant | 2027-03-19 | Ottawa | https://seatgeek.com/saint-levant-tickets/ottawa-canada-history-ottawa-2027-03-19-7-pm/concert/18552167 |
| tm-saint-levant-2027-london-1avzz_ogktcpwjw | Saint Levant | 2027-03-20 | London | https://seatgeek.com/saint-levant-tickets/london-canada-london-music-hall-2027-03-20-7-pm/concert/18551699 |
| tm-jay-wheeler-2027-mashantucket-g5vvz_fp_melk | Jay Wheeler | 2027-03-20 | Mashantucket | https://seatgeek.com/jay-wheeler-tickets/mashantucket-connecticut-premier-theater-at-foxwoods-resort-casino-2027-03-20-8-pm/concert/18649598 |
| tm-tommy-emmanuel-2027-ottawa-1aszkfgjd0vzecc | Tommy Emmanuel | 2027-03-20 | Ottawa | https://seatgeek.com/tommy-emmanuel-tickets/ottawa-canada-national-arts-centre-2027-03-20-8-pm/concert/18633859 |
| tm-saint-levant-2027-toronto-1a8zkf_gkdyntyg | Saint Levant | 2027-03-25 | Toronto | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-25-7-pm/concert/18550847 |
| tm-jay-wheeler-2027-reading-vv17fz_kgkblt_5x | Jay Wheeler | 2027-03-25 | Reading | https://seatgeek.com/jay-wheeler-tickets/reading-pennsylvania-santander-arena-2027-03-25-8-pm/concert/18649606 |
| tm-morat-2027-toronto-177zv0g65ag8wpj | Morat | 2027-03-26 | Toronto | https://seatgeek.com/morat-tickets/toronto-canada-history-2027-03-26-7-pm/concert/18252780 |
| tm-the-lemonheads-2027-cincinnati-1avbz_3gkmybpfp | The Lemonheads | 2027-03-26 | Cincinnati | https://seatgeek.com/the-lemonheads-tickets/cincinnati-ohio-live-at-the-ludlow-garage-2027-03-26-7-30-pm/concert/18594482 |
| tm-the-interrupters-2027-atlanta-vvg1zz_3dh5hjb | The Interrupters | 2027-03-30 | Atlanta | https://seatgeek.com/the-interrupters-tickets/atlanta-georgia-the-masquerade-heaven-2027-03-30-6-pm/concert/18613133 |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkp6j5 | Michelle Branch | 2027-03-30 | Toronto | https://seatgeek.com/michelle-branch-tickets/toronto-canada-history-2027-03-30-7-pm/concert/18688593 |
| tm-niall-horan-2027-toronto-177zv0g61h1eoxc | Niall Horan | 2027-03-30 | Toronto | https://seatgeek.com/niall-horan-tickets/toronto-canada-scotiabank-arena-2027-03-30-7-30-pm/concert/18235565 |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkj6jq | Michelle Branch | 2027-03-31 | Toronto | https://seatgeek.com/michelle-branch-tickets/toronto-canada-history-2027-03-31-7-pm/concert/18685627 |
| tm-death-cab-for-cutie-2027-niagara-falls-1avzz_3gkxslrqs | Death Cab for Cutie | 2027-04-03 | Niagara Falls | https://seatgeek.com/death-cab-for-cutie-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-03-8-pm/concert/18604098 |
| tm-death-cab-for-cutie-2027-ottawa-1ad7z_3gkhxejxw | Death Cab for Cutie | 2027-04-04 | Ottawa | https://seatgeek.com/death-cab-for-cutie-tickets/ottawa-canada-history-ottawa-2027-04-04-7-pm/concert/18604166 |
| tm-lukas-graham-2027-toronto-1f7zvpgxaoz786kf | Lukas Graham | 2027-04-06 | Toronto | https://seatgeek.com/lukas-graham-tickets/toronto-canada-the-danforth-music-hall-2027-04-06-7-pm/concert/18618029 |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | Lukas Graham | 2027-04-10 | Minneapolis | https://seatgeek.com/lukas-graham-tickets/minneapolis-minnesota-uptown-theater-minneapolis-2027-04-10-7-pm/concert/18618814 |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | The Psychedelic Furs | 2027-04-10 | Miami Beach | https://seatgeek.com/the-psychedelic-furs-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-10-8-pm/concert/18592673 |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | Josiah Queen | 2027-04-13 | Toronto | https://seatgeek.com/josiah-queen-tickets/toronto-canada-coca-cola-coliseum-2027-04-13-7-pm/concert/18574502 |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | Death Cab for Cutie | 2027-04-16 | Asheville | https://seatgeek.com/death-cab-for-cutie-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-16-8-pm/concert/18603768 |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | The Psychedelic Furs | 2027-04-17 | Asheville | https://seatgeek.com/the-psychedelic-furs-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-17-7-30-pm/concert/18592680 |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | Foy Vance | 2027-04-21 | Toronto | https://seatgeek.com/foy-vance-tickets/toronto-canada-the-danforth-music-hall-2027-04-21-7-pm/concert/18084267 |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | Nothing But Thieves | 2027-04-21 | Toronto | https://seatgeek.com/nothing-but-thieves-tickets/toronto-canada-massey-hall-2027-04-21-8-pm/concert/18266368 |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | A Perfect Circle | 2027-04-22 | Niagara Falls | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-22-7-pm/concert/18632509 |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemjazz | A Perfect Circle | 2027-04-23 | Niagara Falls | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-23-7-pm/concert/18632508 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Psychedelic Furs | 2027-04-28 | Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-foy-vance-2027-boston-vv177z_7gksjyniw | Foy Vance | 2027-05-01 | Boston | https://seatgeek.com/foy-vance-tickets/boston-massachusetts-the-wilbur-2027-05-01-7-pm/concert/18084126 |
| tm-harry-styles-2027-toronto-1a8zkftgkdpce50 | Harry Styles | 2027-05-07 | Toronto | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-07-7-45-pm/concert/18579677 |
| tm-josiah-queen-2027-cedar-park-g5diz_32hchtd | Josiah Queen | 2027-05-07 | Cedar Park | https://seatgeek.com/josiah-queen-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-05-07-7-pm/concert/18574527 |
| tm-a-perfect-circle-2027-the-woodlands-g5diz_kjdvhi6 | A Perfect Circle | 2027-05-07 | The Woodlands | https://seatgeek.com/a-perfect-circle-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-05-07-8-pm/concert/18632528 |
| tm-the-warning-2027-ottawa-1ad7z_3gklmhbs8 | The Warning | 2027-05-08 | Ottawa | https://seatgeek.com/the-warning-tickets/ottawa-canada-history-ottawa-2027-05-08-7-pm/concert/18591885 |
| tm-harry-styles-2027-toronto-1a8zkftanayze5g | Harry Styles | 2027-05-08 | Toronto | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-08-7-45-pm/concert/18579684 |
| tm-the-warning-2027-toronto-1avzz_3gkltrh3z | The Warning | 2027-05-11 | Toronto | https://seatgeek.com/the-warning-tickets/toronto-canada-history-2027-05-11-7-pm/concert/18591550 |
| tm-harry-styles-2027-toronto-1avzz_3gkzqzh13 | Harry Styles | 2027-05-14 | Toronto | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-14-7-45-pm/concert/18592380 |
| tm-harry-styles-2027-toronto-1avzz_3gkzqbl5d | Harry Styles | 2027-05-15 | Toronto | https://seatgeek.com/harry-styles-tickets/toronto-canada-rogers-stadium-toronto-2027-05-15-7-45-pm/concert/18592381 |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | Kenny Chesney | 2027-05-22 | Minneapolis | https://seatgeek.com/kenny-chesney-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-05-22-4-30-pm/concert/18591994 |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | A Perfect Circle | 2027-05-23 | Shakopee | https://seatgeek.com/a-perfect-circle-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-23-7-pm/concert/18632539 |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | Carly Rae Jepsen | 2027-05-25 | Toronto | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-25-7-30-pm/concert/18639055 |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | Carly Rae Jepsen | 2027-05-26 | Toronto | https://seatgeek.com/carly-rae-jepsen-tickets/toronto-canada-history-2027-05-26-6-30-pm/concert/18657110 |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | FKJ | 2027-05-27 | Chicago | https://seatgeek.com/fkj-tickets/chicago-illinois-the-salt-shed-outdoors-2027-05-27-8-pm/concert/18281838 |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | Carly Rae Jepsen | 2027-05-28 | Ottawa | https://seatgeek.com/carly-rae-jepsen-tickets/ottawa-canada-history-ottawa-2027-05-28-7-30-pm/concert/18639058 |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | FKJ | 2027-05-28 | Toronto | https://seatgeek.com/fkj-tickets/toronto-canada-history-2027-05-28-8-pm/concert/18281790 |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | Tommy Emmanuel | 2027-06-02 | Virginia Beach | https://seatgeek.com/tommy-emmanuel-tickets/virginia-beach-virginia-sandler-center-for-the-performing-arts-2027-06-02-7-30-pm/concert/18703617 |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | Riley Green | 2027-06-04 | Orange Beach | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-04-7-pm/concert/18626535 |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | Kenny Chesney | 2027-06-05 | Ames | https://seatgeek.com/kenny-chesney-tickets/ames-iowa-midamerican-energy-field-at-jack-trice-stadium-2027-06-05-4-30-pm/concert/18591993 |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | Riley Green | 2027-06-05 | Orange Beach | https://seatgeek.com/riley-green-tickets/orange-beach-alabama-the-wharf-amphitheater-2027-06-05-7-pm/concert/18638997 |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | Riley Green | 2027-06-11 | Toronto | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-11-7-pm/concert/18626560 |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | Riley Green | 2027-06-12 | Toronto | https://seatgeek.com/riley-green-tickets/toronto-canada-rbc-amphitheatre-2027-06-12-7-pm/concert/18638999 |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | Riley Green | 2027-06-18 | Gilford | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-18-7-pm/concert/18626536 |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | Riley Green | 2027-06-19 | Gilford | https://seatgeek.com/riley-green-tickets/gilford-new-hampshire-banknh-pavilion-2027-06-19-7-pm/concert/18639001 |
| tm-the-red-clay-strays-2027-gilford-vv177z_kgklli63o | The Red Clay Strays | 2027-07-24 | Gilford | https://seatgeek.com/the-red-clay-strays-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-24-7-pm/concert/18639095 |
| tm-greta-van-fleet-2027-gilford-vv177z_kgkni4das | Greta Van Fleet | 2027-07-26 | Gilford | https://seatgeek.com/greta-van-fleet-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-26-7-pm/concert/18642025 |
| tm-greta-van-fleet-2027-toronto-1avzz_kgkswyehx | Greta Van Fleet | 2027-07-29 | Toronto | https://seatgeek.com/greta-van-fleet-tickets/toronto-canada-rbc-amphitheatre-2027-07-29-7-pm/concert/18642028 |
| tm-sienna-spiro-2027-austin-g5diz_47ytekn | Sienna Spiro | 2027-08-05 | Austin | https://seatgeek.com/sienna-spiro-tickets/austin-texas-moody-amphitheater-2027-08-05-7-pm/concert/18702006 |
| tm-sienna-spiro-2027-washington-1avfz_fgksa-bdm | Sienna Spiro | 2027-08-12 | Washington | https://seatgeek.com/sienna-spiro-tickets/washington-district-of-columbia-the-anthem-dc-2027-08-12-7-pm/concert/18702008 |
| tm-sienna-spiro-2027-boston-vv177z_fgkd_e0km | Sienna Spiro | 2027-08-15 | Boston | https://seatgeek.com/sienna-spiro-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-08-15-7-pm/concert/18702018 |
| tm-sienna-spiro-2027-new-york-g5dyz_46da3nv | Sienna Spiro | 2027-08-17 | New York | https://seatgeek.com/sienna-spiro-tickets/new-york-new-york-radio-city-music-hall-2027-08-17-8-pm/concert/18702019 |
| tm-sienna-spiro-2027-detroit-vv1afzk48gkebo40x | Sienna Spiro | 2027-08-23 | Detroit | https://seatgeek.com/sienna-spiro-tickets/detroit-michigan-fox-theatre-detroit-2027-08-23-7-pm/concert/18702024 |
| tm-sienna-spiro-2027-minneapolis-vv17bz_fgktexhi7 | Sienna Spiro | 2027-08-28 | Minneapolis | https://seatgeek.com/sienna-spiro-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-08-28-7-pm/concert/18702033 |
| tm-sienna-spiro-2027-seattle-vvg1hz_4ediyof | Sienna Spiro | 2027-09-02 | Seattle | https://seatgeek.com/sienna-spiro-tickets/seattle-washington-wamu-theater-2027-09-02-7-pm/concert/18702035 |
| tm-sienna-spiro-2027-vancouver-1av7z_fgkxqzaez | Sienna Spiro | 2027-09-04 | Vancouver | https://seatgeek.com/sienna-spiro-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-09-04-7-pm/concert/18702036 |
| tm-sienna-spiro-2027-berkeley-g5vyz_fbwbrn7 | Sienna Spiro | 2027-09-07 | Berkeley | https://seatgeek.com/sienna-spiro-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-09-07-7-pm/concert/18702041 |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | Arcangel | 2026-10-21 | Fairfax | https://seatgeek.com/arcangel-tickets/fairfax-virginia-eaglebank-arena-2026-10-21-8-pm/concert/18266310 |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | Arcangel | 2026-10-22 | Wallingford | https://seatgeek.com/arcangel-tickets/wallingford-connecticut-toyota-oakdale-theatre-2026-10-22-8-pm/concert/18266307 |
| tm-arcangel-2026-brooklyn-17gzv0g61ux2pkd | Arcangel | 2026-10-23 | Brooklyn | https://seatgeek.com/arcangel-tickets/brooklyn-new-york-barclays-center-2026-10-23-8-pm/concert/18266317 |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | Steve Lacy | 2026-10-26 | Miami | https://seatgeek.com/steve-lacy-tickets/miami-florida-fpl-solar-amphitheater-at-bayfront-park-2026-10-26-8-pm/concert/18485930 |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | Arcangel | 2026-10-28 | Boston | https://seatgeek.com/arcangel-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-10-28-8-pm/concert/18266319 |
| tm-mico-2026-washington-17a8v0g61sa7y8c | Mico | 2026-10-29 | Washington | https://seatgeek.com/mico-tickets/washington-district-of-columbia-9-30-club-2026-10-29-7-pm/concert/18251761 |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | Bryson Tiller | 2026-10-29 | Portland | https://seatgeek.com/bryson-tiller-tickets/portland-oregon-veterans-memorial-coliseum-2-2026-10-29-7-30-pm/concert/18280927 |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | The Psychedelic Furs | 2026-10-30 | Napa | https://seatgeek.com/the-psychedelic-furs-tickets/napa-california-uptown-theatre-napa-2026-10-30-8-pm/concert/18091465 |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | Arcangel | 2026-10-31 | Rosemont | https://seatgeek.com/arcangel-tickets/rosemont-illinois-rosemont-theatre-2026-10-31-8-pm/concert/18266320 |
| tm-arcangel-2026-houston-g5diz_53je_pf | Arcangel | 2026-11-05 | Houston | https://seatgeek.com/arcangel-tickets/houston-texas-713-music-hall-2026-11-05-8-pm/concert/18266325 |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | Jonas Brothers | 2026-11-06 | Birmingham | https://seatgeek.com/jonas-brothers-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-11-06-7-30-pm/concert/18503986 |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | Arcangel | 2026-11-06 | Irving | https://seatgeek.com/arcangel-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-06-8-pm/concert/18266326 |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | Journey | 2026-11-07 | Uniondale | https://seatgeek.com/journey-tickets/uniondale-new-york-nassau-coliseum-2026-11-07-7-30-pm/concert/18237083 |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | The Psychedelic Furs | 2026-11-08 | Del Mar | https://seatgeek.com/the-psychedelic-furs-tickets/del-mar-california-the-sound-del-mar-2026-11-08-8-pm/concert/18091775 |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | Sabaton | 2026-11-11 | Phoenix | https://seatgeek.com/sabaton-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-11-7-pm/concert/17732667 |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | Sabaton | 2026-11-14 | Wheatland | https://seatgeek.com/sabaton-tickets/wheatland-california-hard-rock-live-sacramento-2026-11-14-7-pm/concert/17732679 |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | Arcangel | 2026-11-15 | Denver | https://seatgeek.com/arcangel-tickets/denver-colorado-paramount-theatre-co-2026-11-15-8-pm/concert/18266329 |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | Sabaton | 2026-11-17 | Salt Lake City | https://seatgeek.com/sabaton-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-17-7-pm/concert/17732681 |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | Arcangel | 2026-11-18 | Salt Lake City | https://seatgeek.com/arcangel-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2026-11-18-8-pm/concert/18266330 |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | Sabaton | 2026-11-20 | Omaha | https://seatgeek.com/sabaton-tickets/omaha-nebraska-steelhouse-omaha-2026-11-20-7-pm/concert/17732683 |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | Sabaton | 2026-11-21 | Milwaukee | https://seatgeek.com/sabaton-tickets/milwaukee-wisconsin-landmark-credit-union-live-2026-11-21-7-pm/concert/17857308 |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | Sabaton | 2026-11-22 | Minneapolis | https://seatgeek.com/sabaton-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-11-22-7-pm/concert/17732691 |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | Sabaton | 2026-11-25 | Waukee | https://seatgeek.com/sabaton-tickets/waukee-iowa-vibrant-music-hall-2026-11-25-7-pm/concert/17732688 |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | Sabaton | 2026-11-29 | Detroit | https://seatgeek.com/sabaton-tickets/detroit-michigan-the-fillmore-detroit-2026-11-29-7-pm/concert/17732696 |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | Sabaton | 2026-12-01 | Boston | https://seatgeek.com/sabaton-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2026-12-01-7-pm/concert/17732703 |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | Sabaton | 2026-12-02 | Philadelphia | https://seatgeek.com/sabaton-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-02-7-pm/concert/17732700 |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | Sabaton | 2026-12-05 | Virginia Beach | https://seatgeek.com/sabaton-tickets/virginia-beach-virginia-the-dome-13-2026-12-05-7-pm/concert/17732702 |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | Sabaton | 2026-12-06 | National Harbor | https://seatgeek.com/sabaton-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-12-06-7-pm/concert/17732707 |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | Sabaton | 2026-12-08 | Atlanta | https://seatgeek.com/sabaton-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-12-08-7-pm/concert/17732711 |
| tm-atmosphere-2027-kansas-city-vv11bz_k7z0sqj | Atmosphere | 2027-02-04 | Kansas City | https://seatgeek.com/atmosphere-tickets/kansas-city-missouri-voodoo-lounge-at-harrah-s-casino-north-kansas-city-2027-02-04-7-pm/concert/18609098 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-metallica-2027-las-vegas-1a9zko-gke0bqtz | Metallica | 2027-03-11 | Las Vegas | conflicting_same_date_city_candidates | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-11-8-30-pm/concert/18111116 |
| tm-bruno-mars-2027-auckland-1ae8z_ogksqr0wn | Bruno Mars | 2027-03-16 | Auckland | no_candidates_returned | - |
| tm-stella-lefty-2027-manchester-g5dzz_36uppzk | Stella Lefty | 2027-03-19 | Manchester | no_candidates_returned | - |
| tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc | Stella Lefty | 2027-03-22 | Birmingham | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogku9epc3 | Fontaines D.C. | 2027-03-24 | México | no_candidates_returned | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogkxugz79 | Fontaines D.C. | 2027-03-25 | México | no_candidates_returned | - |
| tm-vnv-nation-2027-toronto-1avzzbvgkvjgkmw | VNV Nation | 2027-04-04 | Toronto | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_krfm-83 | Lizzy McAlpine | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdnvnrg | Niall Horan | 2027-05-07 | Ciudad de México | no_candidates_returned | - |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdpr1hq | Niall Horan | 2027-05-08 | Ciudad de México | no_candidates_returned | - |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | 2027-05-11 | Leeds | no_candidates_returned | - |
| tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz | Simple Minds | 2027-05-13 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | 2027-05-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-jay-wheeler-2027-mexico-16fzkfupgza8kga7 | Jay Wheeler | 2027-05-16 | México | no_candidates_returned | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | 2027-05-17 | Leeds | no_candidates_returned | - |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | 2027-05-22 | Leeds | no_candidates_returned | - |
| tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov | Greta Van Fleet | 2027-05-30 | Birmingham | no_candidates_returned | - |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | 2027-06-13 | Milano | no_candidates_returned | - |
| tm-amble-2027-belfast-17czv0g62qetzl- | Amble | 2027-06-23 | Belfast | no_candidates_returned | - |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | 2027-06-30 | Cardiff | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z | Fontaines D.C. | 2027-07-03 | Manchester | no_candidates_returned | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt | Fontaines D.C. | 2027-07-04 | Manchester | no_candidates_returned | - |
| tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj | Pink Martini | 2027-07-04 | Edinburgh | no_candidates_returned | - |
| tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl | Fontaines D.C. | 2027-07-06 | Glasgow | no_candidates_returned | - |
| tm-amble-2027-manchester-g5vhz_8upt3w4 | Amble | 2027-07-08 | Manchester | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gklfny3e | Oasis | 2027-09-11 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrrmy7n | Oasis | 2027-09-12 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx | Passenger | 2027-09-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrnjt4_ | Oasis | 2027-09-18 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkreiyj0 | Oasis | 2027-09-19 | Stevenage | no_candidates_returned | - |
| tm-passenger-2027-exeter-g5vhz_o2o0irs | Passenger | 2027-09-21 | Exeter | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrs3n_k | Oasis | 2027-09-25 | Stevenage | no_candidates_returned | - |
| tm-oasis-2027-stevenage-1adjz_3gkrz1qva | Oasis | 2027-09-26 | Stevenage | no_candidates_returned | - |
| tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 | Eros Ramazzotti | 2027-09-29 | Boston | conflicting_same_date_city_candidates | https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/18663233 |
| tm-steve-lacy-2026-virginia-beach-vv1avzkf6gkesce9z | Steve Lacy | 2026-10-20 | Virginia Beach | no_candidates_returned | - |
| tm-raye-2026-london-g5vhz_frai-ph | RAYE | 2026-10-23 | London | no_candidates_returned | - |
| tm-stevie-wonder-2026-london-1adfz_ogkluzbfe | Stevie Wonder | 2026-11-03 | London | no_candidates_returned | - |
| tm-stevie-wonder-2026-london-1adfz_ogkwbmppe | Stevie Wonder | 2026-11-05 | London | no_candidates_returned | - |
| tm-trivium-2026-st-petersburg-vvg1vz_cbh66cw | Trivium | 2026-11-05 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/trivium-tickets/saint-petersburg-florida-jannus-live-2026-11-05-5-30-pm/concert/18391932 |
| tm-niall-horan-2026-dublin-1avoz_6rofjzd576 | Niall Horan | 2026-11-13 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-london-1ku8v0x_gag10y_ | Noah Kahan | 2026-11-13 | London | no_candidates_returned | - |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteuw | Morat | 2026-11-13 | Ciudad de México | no_candidates_returned | - |
| tm-noah-kahan-2026-london-1ku8v0x_gag57yq | Noah Kahan | 2026-11-14 | London | no_candidates_returned | - |
| tm-niall-horan-2026-belfast-1adoz_kgkuhawcy | Niall Horan | 2026-11-15 | Belfast | no_candidates_returned | - |
| tm-niall-horan-2026-belfast-1adoz_6gkmwqvwh | Niall Horan | 2026-11-16 | Belfast | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1avoz_fgkn52bxo | Noah Kahan | 2026-11-19 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | Noah Kahan | 2026-11-21 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | Noah Kahan | 2026-11-22 | Dublin | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | 2026-12-01 | London | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | 2026-12-02 | London | no_candidates_returned | - |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | 2026-12-05 | Cardiff | no_candidates_returned | - |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | 2026-12-07 | London | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1ka8v0ukgagf72c | Harry Styles | 2026-12-12 | Sydney Olympic Park | no_candidates_returned | - |
| tm-a-perfect-circle-2026-auckland-1ae8z_kgkr16koz | A Perfect Circle | 2026-12-13 | Auckland | no_candidates_returned | - |
| tm-harry-styles-2026-sydney-olympic-park-1apzk8ugkdafgq9 | Harry Styles | 2026-12-13 | Sydney Olympic Park | no_candidates_returned | - |
| tm-polyphia-2026-leeds-g5dzz_gl9y_6t | Polyphia | 2026-12-15 | Leeds | no_candidates_returned | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | 2026-12-16 | Ciudad de México | no_candidates_returned | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | 2027-01-15 | Monterrey | no_candidates_returned | - |
| tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6- | Five Finger Death Punch | 2027-01-23 | London | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-needtobreathe-2027-asheville-g5evz_kd9sqw9 | Harrah's Cherokee Center - Asheville | Thomas Wolfe Auditorium at Harrah's Cherokee Center | https://seatgeek.com/needtobreathe-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-11-7-pm/concert/18621552 |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Paramount in concert with Northwell | The Paramount - Huntington | https://seatgeek.com/the-psychedelic-furs-tickets/huntington-new-york-the-paramount-huntington-2027-04-28-8-pm/concert/18592687 |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/sabaton-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-02-7-pm/concert/17732700 |

## Conflicts found

- tm-metallica-2027-las-vegas-1a9zko-gke0bqtz (Metallica, 2027-03-11, Las Vegas)
  - 100: https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-11-3-30-am/concert/18111108
- tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 (Eros Ramazzotti, 2027-09-29, Boston)
  - 100: https://seatgeek.com/eros-ramazzotti-tickets/boston-massachusetts-boch-center-wang-theatre-2027-09-29-8-pm/concert/17481896

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
| tm-sombr-2026-dallas-vvg1yz_fn5kifv | sombr | 2026-10-19T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-teddy-swims-2026-charlotte-g5evz_fumjscw | teddy-swims | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-tyla-2026-manchester-17uov0g62k1nnho | tyla | 2026-10-19T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-sylvan-esso-2026-toronto-177zv0g6gkzh0vc | sylvan-esso | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-washington-17a8v0g6gphxucm | sienna-spiro | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-philadelphia-vvg1fz_gfaf9pc | sienna-spiro | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sienna-spiro-2026-boston-vvg17z_gpsen49 | sienna-spiro | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-dinosaur-jr-2026-san-francisco-g5vyz_ullh3se | dinosaur-jr | 2026-10-19T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-staind-2026-austin-g5diz_dykgajg | staind | 2026-10-19T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa | warren-zeiders | 2026-10-11T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-leeds-g5dzzbubyjrus | warren-zeiders | 2026-10-12T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-manchester-g5vhzbgtrzaec | warren-zeiders | 2026-10-14T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-bristol-g5dzzbgxgfjht | warren-zeiders | 2026-10-15T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-birmingham-g5dzzbu22x97x | warren-zeiders | 2026-10-16T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-warren-zeiders-2026-london-g5vhzbgx4c4_f | warren-zeiders | 2026-10-18T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-las-vegas-17ayv0g61m2w1ya | mico | 2026-10-18T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-mico-2026-san-diego-vvg1iz_1uivzmh | mico | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-hilary-duff-2026-auckland-1ae8z_7gkmdmw55 | hilary-duff | 2026-10-20T05:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-def-leppard-2026-ciudad-de-mexico-17azv0g65px_l4r | def-leppard | 2026-10-20T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-saint-louis-vvg1bz_ukkhzgh | rod-wave | 2026-10-13T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-nashville-g5viz_u63pwep | rod-wave | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-washington-17a8v0g6uelkuww | rod-wave | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-rod-wave-2026-detroit-vvg1oz_udpjh0t | rod-wave | 2026-10-20T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | uicideboy | 2026-10-12T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | uicideboy | 2026-10-17T22:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vv1avzkfwgkdcqwfa | steve-lacy | 2026-10-13T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-boston-vvg17z_2dy9pyk | steve-lacy | 2026-10-14T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-camden-vv17fz_8gkl8lrzy | steve-lacy | 2026-10-16T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-steve-lacy-2026-washington-1a4zkfdgkeiyeai | steve-lacy | 2026-10-18T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-chicago-vvg18z_1daahef | the-smashing-pumpkins | 2026-10-15T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-charlotte-g5evz_1dw8jew | the-smashing-pumpkins | 2026-10-17T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-jacksonville-17fov0g61t4w29c | the-smashing-pumpkins | 2026-10-18T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-smashing-pumpkins-2026-tampa-vvg1vz_1xbgmwh | the-smashing-pumpkins | 2026-10-19T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-phoebe-bridgers-2026-denver-g5vzz_g5e32h3 | phoebe-bridgers | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bryson-tiller-2026-albuquerque-g5vzz_5m9qykz | bryson-tiller | 2026-10-20T01:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
