# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:46:29.400Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3886
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3043
- Events already carrying a valid SeatGeek URL: 1777
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1322
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1721
- Eligible (upcoming, resolvable local date) after pre-API filtering: 8
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20747)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 8
- Events checked by this run: 8
- API calls made: 40
- Rate-limit responses: 0
- URLs added: 5
- Events skipped: 3
- no_candidates_returned: 3
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 3

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1777 event(s) already carried valid SeatGeek URLs before this run, including 1322 enrichment-eligible event(s).
- This run queried only the 1721 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | 2026-10-21 | Inglewood | https://seatgeek.com/beabadoobee-tickets/inglewood-california-kia-forum-2026-10-21-8-pm/concert/18329618 |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | 2026-10-24 | San Diego | https://seatgeek.com/beabadoobee-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-24-8-pm/concert/18329621 |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | 2026-10-26 | Oakland | https://seatgeek.com/beabadoobee-tickets/oakland-california-oakland-arena-2026-10-26-8-pm/concert/18329620 |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | 2026-10-28 | Vancouver | https://seatgeek.com/beabadoobee-tickets/vancouver-canada-rogers-arena-2026-10-28-8-pm/concert/18329623 |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | 2026-10-29 | Seattle | https://seatgeek.com/beabadoobee-tickets/seattle-washington-climate-pledge-arena-2026-10-29-8-pm/concert/18329624 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-beabadoobee-2026-glasgow-17uov0g6uryba3u | beabadoobee | 2026-11-14 | Glasgow | no_candidates_returned | - |
| tm-beabadoobee-2026-cardiff-17uov0g6uhod1tg | beabadoobee | 2026-11-16 | Cardiff | no_candidates_returned | - |
| tm-beabadoobee-2026-manchester-g5vhz_u1guca1 | beabadoobee | 2026-11-17 | Manchester | no_candidates_returned | - |

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

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:45:35.367Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3872
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3035
- Events already carrying a valid SeatGeek URL: 1772
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1317
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20747)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 7
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1772 event(s) already carried valid SeatGeek URLs before this run, including 1317 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | Dan + Shay | 2026-10-22 | Dallas | https://seatgeek.com/dan-shay-tickets/dallas-texas-dos-equis-pavilion-2026-10-22-7-pm/concert/18250827 |
| tm-dan-shay-2026-rogers-g5viz_1x8yivv | Dan + Shay | 2026-10-23 | Rogers | https://seatgeek.com/dan-shay-tickets/rogers-arkansas-walmart-amp-2026-10-23-7-pm/concert/18250830 |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | Dan + Shay | 2026-10-24 | Maryland Heights | https://seatgeek.com/dan-shay-tickets/maryland-heights-missouri-hollywood-casino-amphitheatre-mo-2026-10-24-7-pm/concert/18250831 |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | Dan + Shay | 2026-10-29 | Denver | https://seatgeek.com/dan-shay-tickets/denver-colorado-ball-arena-2026-10-29-7-pm/concert/18250833 |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | Dan + Shay | 2026-11-05 | Phoenix | https://seatgeek.com/dan-shay-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2026-11-05-7-pm/concert/18250836 |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | Dan + Shay | 2026-11-06 | Anaheim | https://seatgeek.com/dan-shay-tickets/anaheim-california-honda-center-2026-11-06-7-pm/concert/18250837 |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | Dan + Shay | 2026-11-07 | Mountain View | https://seatgeek.com/dan-shay-tickets/mountain-view-california-shoreline-amphitheatre-2026-11-07-7-pm/concert/18250838 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

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

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:47:10.608Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3893
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3049
- Events already carrying a valid SeatGeek URL: 1783
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1328
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1721
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20747)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1783 event(s) already carried valid SeatGeek URLs before this run, including 1328 enrichment-eligible event(s).
- This run queried only the 1721 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | Dave Matthews Band | 2026-11-06 | Nashville | https://seatgeek.com/dave-matthews-band-tickets/nashville-tennessee-bridgestone-arena-2026-11-06-7-30-pm/concert/18474895 |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | Dave Matthews Band | 2026-11-07 | Chicago | https://seatgeek.com/dave-matthews-band-tickets/chicago-illinois-united-center-2026-11-07-7-30-pm/concert/18474896 |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | Dave Matthews Band | 2026-11-09 | Providence | https://seatgeek.com/dave-matthews-band-tickets/providence-rhode-island-amica-mutual-pavilion-2026-11-09-7-30-pm/concert/18474897 |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | Dave Matthews Band | 2026-11-10 | Baltimore | https://seatgeek.com/dave-matthews-band-tickets/baltimore-maryland-cfg-bank-arena-2026-11-10-7-30-pm/concert/18474899 |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | Dave Matthews Band | 2026-11-12 | New York | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-12-7-30-pm/concert/18474900 |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | Dave Matthews Band | 2026-11-13 | New York | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-13-7-30-pm/concert/18474898 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

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

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:43:50.136Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3855
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3020
- Events already carrying a valid SeatGeek URL: 1757
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1302
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 18
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20747)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 8
- Events checked by this run: 8
- API calls made: 40
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 2
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 2

## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1757 event(s) already carried valid SeatGeek URLs before this run, including 1302 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | KATSEYE | 2026-11-11 | Dallas | https://seatgeek.com/katseye-tickets/dallas-texas-american-airlines-center-2026-11-11-8-pm/concert/18240151 |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | KATSEYE | 2026-11-17 | Seattle | https://seatgeek.com/katseye-tickets/seattle-washington-climate-pledge-arena-2026-11-17-8-pm/concert/18240158 |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | KATSEYE | 2026-11-19 | Oakland | https://seatgeek.com/katseye-tickets/oakland-california-oakland-arena-2026-11-19-8-pm/concert/18240159 |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | KATSEYE | 2026-11-21 | Los Angeles | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-21-8-pm/concert/18240162 |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | KATSEYE | 2026-11-22 | Los Angeles | https://seatgeek.com/katseye-tickets/los-angeles-california-crypto-com-arena-2026-11-22-8-pm/concert/18258420 |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | KATSEYE | 2026-11-24 | Phoenix | https://seatgeek.com/katseye-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-24-8-pm/concert/18240163 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61mujevj | KATSEYE | 2026-11-27 | Ciudad de México | no_candidates_returned | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61m2a3xe | KATSEYE | 2026-11-28 | Ciudad de México | no_candidates_returned | - |

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

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:44:19.409Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3860
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3024
- Events already carrying a valid SeatGeek URL: 1761
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1306
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20747)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 4
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1761 event(s) already carried valid SeatGeek URLs before this run, including 1306 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | Ricky Martin | 2026-10-30 | Las Vegas | https://seatgeek.com/ricky-martin-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-10-30-8-pm/concert/18370911 |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | Ricky Martin | 2026-10-31 | Las Vegas | https://seatgeek.com/ricky-martin-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2026-10-31-8-pm/concert/18370916 |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | Ricky Martin | 2026-11-06 | Lincoln | https://seatgeek.com/ricky-martin-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2026-11-06-8-pm/concert/18318163 |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | Ricky Martin | 2026-11-08 | Temecula | https://seatgeek.com/ricky-martin-tickets/temecula-california-pechanga-resort-casino-2026-11-08-7-30-pm/concert/18325393 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

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

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-21T15:44:48.999Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3864
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3028
- Events already carrying a valid SeatGeek URL: 1765
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1310
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20747)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 4
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1765 event(s) already carried valid SeatGeek URLs before this run, including 1310 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-ty-myers-2026-evansville-vv1aazkowgkd1n5gg | Ty Myers | 2026-10-23 | Evansville | https://seatgeek.com/ty-myers-tickets/evansville-indiana-ford-center-in-2026-10-23-7-30-pm/concert/18142342 |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | Ty Myers | 2026-10-24 | Pikeville | https://seatgeek.com/ty-myers-tickets/pikeville-kentucky-appalachian-wireless-arena-2026-10-24-7-30-pm/concert/18142343 |
| tm-ty-myers-2026-austin-g5diz_kuopazl | Ty Myers | 2026-11-20 | Austin | https://seatgeek.com/ty-myers-tickets/austin-texas-moody-center-atx-2026-11-20-7-30-pm/concert/18142345 |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | Ty Myers | 2026-11-21 | Fort Worth | https://seatgeek.com/ty-myers-tickets/fort-worth-texas-dickies-arena-2026-11-21-7-30-pm/concert/18142347 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

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

- None
