# SeatGeek CTA auto-add log

Generated: 2026-10-11T11:33:01.484Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 3159
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2471
- Events already carrying a valid SeatGeek URL: 969
- Enrichment-eligible events already carrying a valid SeatGeek URL: 677
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1794
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1565
- Skipped before any API call: 298 (past_event: 298)
- Events this run can check (window size): 80
- Rotation: window 18 of 20 (key 20737)
- Runs needed to check every eligible event once: 20
- Events selected/logged by this run: 80
- Events checked by this run: 80
- API calls made: 400
- Rate-limit responses: 0
- URLs added: 69
- Events skipped: 11
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-teddy-swims-2027-manchester-17uyv0g62mo98gp
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 400 --resume-from 'tm-teddy-swims-2027-manchester-17uyv0g62mo98gp'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10
- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 69` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 969 event(s) already carried valid SeatGeek URLs before this run, including 677 enrichment-eligible event(s).
- This run queried only the 1794 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | Gracie Abrams | 2027-03-05 | Washington | https://seatgeek.com/gracie-abrams-tickets/washington-district-of-columbia-capital-one-arena-2027-03-05-8-pm/concert/18270567 |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | Hans Zimmer | 2027-03-05 | Chicago | https://seatgeek.com/hans-zimmer-tickets/chicago-illinois-united-center-2027-03-05-7-30-pm/concert/18601929 |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | Fantasia | 2027-03-05 | Ontario | https://seatgeek.com/fantasia-tickets/ontario-california-toyota-arena-ontario-2027-03-05-8-pm/concert/18629502 |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | NEEDTOBREATHE | 2027-03-06 | Washington | https://seatgeek.com/needtobreathe-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-06-7-pm/concert/18621547 |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | Don Omar | 2027-03-06 | Fort Worth | https://seatgeek.com/don-omar-tickets/fort-worth-texas-dickies-arena-2027-03-06-8-pm/concert/18326519 |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | Metallica | 2027-03-06 | Las Vegas | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-06-8-30-pm/concert/18111114 |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | Lukas Graham | 2027-03-07 | Charlotte | https://seatgeek.com/lukas-graham-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-07-8-pm/concert/18617859 |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | Michelle Branch | 2027-03-07 | Houston | https://seatgeek.com/michelle-branch-tickets/houston-texas-house-of-blues-houston-2027-03-07-7-pm/concert/18508828 |
| tm-morat-2027-boston-vvg17z_1b5nnhl | Morat | 2027-03-07 | Boston | https://seatgeek.com/morat-tickets/boston-massachusetts-agganis-arena-2027-03-07-8-pm/concert/18251537 |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | Don Omar | 2027-03-07 | Austin | https://seatgeek.com/don-omar-tickets/austin-texas-moody-center-atx-2027-03-07-8-pm/concert/18326567 |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | Hans Zimmer | 2027-03-09 | Charlotte | https://seatgeek.com/hans-zimmer-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-03-09-7-30-pm/concert/18601932 |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | Lukas Graham | 2027-03-09 | Silver Spring | https://seatgeek.com/lukas-graham-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-09-8-30-pm/concert/18618370 |
| tm-don-omar-2027-tampa-vvg1vz_uc-buha | Don Omar | 2027-03-10 | Tampa | https://seatgeek.com/don-omar-tickets/tampa-florida-benchmark-international-arena-2027-03-10-8-pm/concert/18325141 |
| tm-hans-zimmer-2027-orlando-1axzkfygkexmgrx | Hans Zimmer | 2027-03-11 | Orlando | https://seatgeek.com/hans-zimmer-tickets/orlando-florida-kia-center-2027-03-11-7-30-pm/concert/18601931 |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | Jay Wheeler | 2027-03-11 | Miami | https://seatgeek.com/jay-wheeler-tickets/miami-florida-kaseya-center-2027-03-11-8-pm/concert/18649595 |
| tm-tobymac-2027-austin-g5diz_oelxrxd | TobyMac | 2027-03-11 | Austin | https://seatgeek.com/tobymac-tickets/austin-texas-moody-center-atx-2027-03-11-7-pm/concert/18543696 |
| tm-don-omar-2027-miami-vvg1vz_uk8ovtf | Don Omar | 2027-03-12 | Miami | https://seatgeek.com/don-omar-tickets/miami-florida-kaseya-center-2027-03-12-8-pm/concert/18325223 |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65pru4zd | Gracie Abrams | 2027-03-12 | Philadelphia | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-12-8-pm/concert/18270573 |
| tm-yuridia-2027-dallas-vvg1yz_32hm5d6 | Yuridia | 2027-03-12 | Dallas | https://seatgeek.com/yuridia-tickets/dallas-texas-dos-equis-pavilion-2027-03-12-8-pm/concert/18570406 |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | Gracie Abrams | 2027-03-13 | Philadelphia | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-13-8-pm/concert/18270574 |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | Hans Zimmer | 2027-03-13 | Miami | https://seatgeek.com/hans-zimmer-tickets/miami-florida-kaseya-center-2027-03-13-8-pm/concert/18601933 |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | Fantasia | 2027-03-13 | Fort Worth | https://seatgeek.com/fantasia-tickets/fort-worth-texas-dickies-arena-2027-03-13-8-pm/concert/18645847 |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | Metallica | 2027-03-13 | Las Vegas | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-13-8-30-pm/concert/18111118 |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | Hans Zimmer | 2027-03-14 | Tampa | https://seatgeek.com/hans-zimmer-tickets/tampa-florida-benchmark-international-arena-2027-03-14-7-30-pm/concert/18601934 |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | Don Omar | 2027-03-14 | Orlando | https://seatgeek.com/don-omar-tickets/orlando-florida-kia-center-2027-03-14-8-pm/concert/18325188 |
| tm-morat-2027-hidalgo-g5diz_1bprewh | Morat | 2027-03-14 | Hidalgo | https://seatgeek.com/morat-tickets/hidalgo-texas-payne-arena-2027-03-14-8-pm/concert/18251579 |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | Yuridia | 2027-03-14 | El Paso | https://seatgeek.com/yuridia-tickets/el-paso-texas-don-haskins-center-2027-03-14-8-pm/concert/18570407 |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | Hans Zimmer | 2027-03-16 | Atlanta | https://seatgeek.com/hans-zimmer-tickets/atlanta-georgia-state-farm-arena-1-2027-03-16-7-30-pm/concert/18601941 |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | Gracie Abrams | 2027-03-16 | Brooklyn | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-16-8-pm/concert/18270579 |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | Gracie Abrams | 2027-03-17 | Brooklyn | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-17-8-pm/concert/18270580 |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | Hans Zimmer | 2027-03-17 | Nashville | https://seatgeek.com/hans-zimmer-tickets/nashville-tennessee-bridgestone-arena-2027-03-17-7-30-pm/concert/18601967 |
| tm-morat-2027-orlando-17fov0g61xg_prh | Morat | 2027-03-18 | Orlando | https://seatgeek.com/morat-tickets/orlando-florida-kia-center-2027-03-18-8-pm/concert/18251530 |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | Niall Horan | 2027-03-19 | Detroit | https://seatgeek.com/niall-horan-tickets/detroit-michigan-little-caesars-arena-2027-03-19-7-30-pm/concert/18235522 |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | Gracie Abrams | 2027-03-19 | Brooklyn | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-19-8-pm/concert/18270584 |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | Death Cab for Cutie | 2027-03-20 | Orlando | https://seatgeek.com/death-cab-for-cutie-tickets/orlando-florida-hard-rock-live-orlando-2027-03-20-8-pm/concert/18603759 |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | Gracie Abrams | 2027-03-20 | Brooklyn | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-20-8-pm/concert/18270586 |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | Morat | 2027-03-20 | Miami | https://seatgeek.com/morat-tickets/miami-florida-kaseya-center-2027-03-20-8-pm/concert/18251573 |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | NEEDTOBREATHE | 2027-03-20 | Houston | https://seatgeek.com/needtobreathe-tickets/houston-texas-713-music-hall-2027-03-20-7-pm/concert/18621563 |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | Hans Zimmer | 2027-03-22 | Fort Worth | https://seatgeek.com/hans-zimmer-tickets/fort-worth-texas-dickies-arena-2027-03-22-7-30-pm/concert/18601942 |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | Niall Horan | 2027-03-23 | Chicago | https://seatgeek.com/niall-horan-tickets/chicago-illinois-united-center-2027-03-23-7-30-pm/concert/18235524 |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | Jay Wheeler | 2027-03-24 | Brooklyn | https://seatgeek.com/jay-wheeler-tickets/brooklyn-new-york-barclays-center-2027-03-24-8-pm/concert/18649607 |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | Michelle Branch | 2027-03-25 | New York | https://seatgeek.com/michelle-branch-tickets/new-york-new-york-beacon-theatre-2027-03-25-8-pm/concert/18508849 |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | Hans Zimmer | 2027-03-25 | Denver | https://seatgeek.com/hans-zimmer-tickets/denver-colorado-ball-arena-2027-03-25-7-30-pm/concert/18601943 |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | Fantasia | 2027-03-26 | Atlanta | https://seatgeek.com/fantasia-tickets/atlanta-georgia-state-farm-arena-1-2027-03-26-8-pm/concert/18629276 |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | Jay Wheeler | 2027-03-27 | Boston | https://seatgeek.com/jay-wheeler-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-27-8-pm/concert/18649625 |
| tm-morat-2027-montreal-17g8v0g65cezfzf | Morat | 2027-03-27 | Montreal | https://seatgeek.com/morat-tickets/montreal-canada-mtelus-2027-03-27-8-pm/concert/18258641 |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | Hans Zimmer | 2027-03-30 | Phoenix | https://seatgeek.com/hans-zimmer-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-30-7-30-pm/concert/18601944 |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | Nothing But Thieves | 2027-03-30 | Vancouver | https://seatgeek.com/nothing-but-thieves-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-30-8-pm/concert/18266338 |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | Nothing But Thieves | 2027-03-31 | Seattle | https://seatgeek.com/nothing-but-thieves-tickets/seattle-washington-paramount-theatre-wa-2027-03-31-8-pm/concert/18266337 |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | Saint Levant | 2027-04-01 | Brooklyn | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-01-7-pm/concert/18550841 |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | Morat | 2027-04-01 | Brooklyn | https://seatgeek.com/morat-tickets/brooklyn-new-york-barclays-center-2027-04-01-8-pm/concert/18252365 |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | Lukas Graham | 2027-04-02 | Boston | https://seatgeek.com/lukas-graham-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-02-7-pm/concert/18617577 |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | Hans Zimmer | 2027-04-02 | Anaheim | https://seatgeek.com/hans-zimmer-tickets/anaheim-california-honda-center-2027-04-02-7-30-pm/concert/18601946 |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | Nothing But Thieves | 2027-04-03 | Oakland | https://seatgeek.com/nothing-but-thieves-tickets/oakland-california-fox-theater-oakland-2027-04-03-8-pm/concert/18266340 |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | The Interrupters | 2027-04-04 | Brooklyn | https://seatgeek.com/the-interrupters-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-04-6-pm/concert/18613085 |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | Niall Horan | 2027-04-04 | Brooklyn | https://seatgeek.com/niall-horan-tickets/brooklyn-new-york-barclays-center-2027-04-04-7-30-pm/concert/18235519 |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | Hans Zimmer | 2027-04-04 | San Francisco | https://seatgeek.com/hans-zimmer-tickets/san-francisco-california-chase-center-2027-04-04-7-30-pm/concert/18601947 |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | Hans Zimmer | 2027-04-05 | Sacramento | https://seatgeek.com/hans-zimmer-tickets/sacramento-california-golden-1-center-2027-04-05-7-30-pm/concert/18601953 |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | Hans Zimmer | 2027-04-08 | Vancouver | https://seatgeek.com/hans-zimmer-tickets/vancouver-canada-rogers-arena-2027-04-08-7-30-pm/concert/18601965 |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | Hans Zimmer | 2027-04-09 | Seattle | https://seatgeek.com/hans-zimmer-tickets/seattle-washington-climate-pledge-arena-2027-04-09-7-30-pm/concert/18601954 |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | Lukas Graham | 2027-04-11 | Chicago | https://seatgeek.com/lukas-graham-tickets/chicago-illinois-house-of-blues-chicago-2027-04-11-6-pm/concert/18617871 |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | Hans Zimmer | 2027-04-11 | Portland | https://seatgeek.com/hans-zimmer-tickets/portland-oregon-moda-center-2027-04-11-7-30-pm/concert/18601957 |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | Niall Horan | 2027-04-12 | Boston | https://seatgeek.com/niall-horan-tickets/boston-massachusetts-td-garden-2027-04-12-7-30-pm/concert/18235530 |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | Nothing But Thieves | 2027-04-13 | Detroit | https://seatgeek.com/nothing-but-thieves-tickets/detroit-michigan-the-fillmore-detroit-2027-04-13-8-pm/concert/18266354 |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | Carly Rae Jepsen | 2027-04-15 | Edmonton | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | Luke Combs | 2027-04-17 | Detroit | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | Nothing But Thieves | 2027-04-17 | Brooklyn | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | Niall Horan | 2027-04-17 | Orlando | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | Fantasia | 2027-04-17 | Hollywood | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-the-warning-2027-glasgow-g5dzz_3cmwwj3 | The Warning | 2027-03-30 | Glasgow | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w | Lizzy McAlpine | 2027-03-31 | London | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p | Lizzy McAlpine | 2027-04-01 | London | no_candidates_returned | - |
| tm-trivium-2027-manchester-1amzkffgkdkmgfp | Trivium | 2027-04-02 | Manchester | no_candidates_returned | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk | Lizzy McAlpine | 2027-04-02 | London | no_candidates_returned | - |
| tm-nothing-but-thieves-2027-hollywood-vvg10z_5blnvha | Nothing But Thieves | 2027-04-04 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/nothing-but-thieves-tickets/los-angeles-california-hollywood-palladium-2027-04-04-8-pm/concert/18266342 |
| tm-sabaton-2027-glasgow-17uov0g6g3si1v4 | Sabaton | 2027-04-09 | Glasgow | no_candidates_returned | - |
| tm-sabaton-2027-birmingham-17fyv0g6gp8gytu | Sabaton | 2027-04-10 | Birmingham | no_candidates_returned | - |
| tm-teddy-swims-2027-glasgow-17uov0g62qlspvu | Teddy Swims | 2027-04-13 | Glasgow | no_candidates_returned | - |
| tm-teddy-swims-2027-manchester-17uyv0g62pcoosz | Teddy Swims | 2027-04-16 | Manchester | no_candidates_returned | - |
| tm-teddy-swims-2027-manchester-17uyv0g62m2z8vc | Teddy Swims | 2027-04-17 | Manchester | no_candidates_returned | - |

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
| tm-ed-sheeran-2026-santa-clara-1c006331c1a54d19 | ed-sheeran | 2026-07-26T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-toronto-1000632fe9ca4361 | ed-sheeran | 2026-08-22T21:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-ed-sheeran-2026-atlanta-0e00632fc0572cc1 | ed-sheeran | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-sombr-2026-vancouver-1aozk3agkddnbd1 | sombr | 2026-09-30T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-seattle-vvg1hz_feci1ir | sombr | 2026-10-02T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-portland-vvg1hz_fljtdxu | sombr | 2026-10-03T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-sacramento-g5vyz_fli21bj | sombr | 2026-10-07T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-san-jose-g5vyz_fljzy-y | sombr | 2026-10-08T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-sombr-2026-anaheim-vv1fe8v0xoqvz7u1ue | sombr | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-don-omar-2026-reading-vvg1fz_1dkrsjw | don-omar | 2026-09-26T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-boston-vvg17z_1wjhcnw | don-omar | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-dallas-vvg1yz_1d_hllv | don-omar | 2026-10-02T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-orlando-17fov0g61tztiqr | don-omar | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-miami-vvg1vz_1mbpqce | don-omar | 2026-10-05T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-don-omar-2026-rosemont-vvg18z_1bhcnvf | don-omar | 2026-10-09T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-death-cab-for-cutie-2026-london-g5dzz_au0cejp | death-cab-for-cutie | 2026-09-25T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-death-cab-for-cutie-2026-london-g5dzz_1kfbxk8 | death-cab-for-cutie | 2026-09-26T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-boston-vvg17z_g1xnurg | malcolm-todd | 2026-09-27T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmrwkt | malcolm-todd | 2026-09-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-toronto-177zv0g6gcmycf1 | malcolm-todd | 2026-09-29T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-detroit-vvg1oz_g99edo3 | malcolm-todd | 2026-10-02T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-nashville-g5viz_g1jq0ud | malcolm-todd | 2026-10-04T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-maryland-heights-vvg1bz_gclzidq | malcolm-todd | 2026-10-05T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_gkurbfe | malcolm-todd | 2026-10-07T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-chicago-vvg18z_g91pgfe | malcolm-todd | 2026-10-08T00:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-malcolm-todd-2026-minneapolis-vvg1bz_gcw2bqa | malcolm-todd | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-dinosaur-jr-2026-las-vegas-17ayv0g6ujiqnhu | dinosaur-jr | 2026-10-10T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtkw4- | metallica | 2026-10-02T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfu40 | metallica | 2026-10-04T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-metallica-2026-las-vegas-1avjz_agkns9qkh | metallica | 2026-10-09T03:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-the-lemonheads-2026-london-g5dzz_audfsuq | the-lemonheads | 2026-10-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-tommy-emmanuel-2026-kenai-vvg1hz_5wlthim | tommy-emmanuel | 2026-10-10T02:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
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
| tm-daughtry-2026-valley-center-vvg1iz_5rl2h1n | daughtry | 2026-10-04T03:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-riley-green-2026-durant-vvg1yz_ggasrcz | riley-green | 2026-10-04T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-latto-2026-petersburg-vvg17z_2r3gq4t | latto | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-west-valley-city-g5vzz_ds6yaft | staind | 2026-10-08T00:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-staind-2026-wheatland-g5vyz_dwgijmi | staind | 2026-10-10T01:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
