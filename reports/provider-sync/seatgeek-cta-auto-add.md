# SeatGeek CTA auto-add log

Generated: 2026-10-11T16:33:04.258Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3250
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2549
- Events already carrying a valid SeatGeek URL: 1006
- Enrichment-eligible events already carrying a valid SeatGeek URL: 705
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1844
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20737)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 7
- no_candidates_returned: 7
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 7

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1006 event(s) already carried valid SeatGeek URLs before this run, including 705 enrichment-eligible event(s).
- This run queried only the 1844 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdxsfp_ | Fuerza Regida | 2027-01-31 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdn9bgh | Fuerza Regida | 2027-02-01 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacn3ld | Fuerza Regida | 2027-02-03 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgauwxey | Fuerza Regida | 2027-02-04 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnxl1 | Fuerza Regida | 2027-02-05 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnwlg | Fuerza Regida | 2027-02-06 | Ciudad de México | no_candidates_returned | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgaclelp | Fuerza Regida | 2027-02-07 | Ciudad de México | no_candidates_returned | - |

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

Generated: 2026-10-11T16:33:42.406Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3271
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2555
- Events already carrying a valid SeatGeek URL: 1012
- Enrichment-eligible events already carrying a valid SeatGeek URL: 711
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1844
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20737)
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
- 1012 event(s) already carried valid SeatGeek URLs before this run, including 711 enrichment-eligible event(s).
- This run queried only the 1844 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | Mei Semones | 2027-04-09 | Washington | https://seatgeek.com/mei-semones-tickets/washington-district-of-columbia-9-30-club-2027-04-09-6-pm/concert/18637352 |
| tm-mei-semones-2027-houston-g5diz_kenctep | Mei Semones | 2027-04-16 | Houston | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | Mei Semones | 2027-04-24 | San Francisco | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | Mei Semones | 2027-04-27 | Vancouver | https://seatgeek.com/mei-semones-tickets/vancouver-canada-commodore-ballroom-2027-04-27-7-pm/concert/18637753 |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | Mei Semones | 2027-04-28 | Seattle | https://seatgeek.com/mei-semones-tickets/seattle-washington-neptune-theatre-wa-2027-04-28-8-pm/concert/18637789 |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | Mei Semones | 2027-05-08 | Pittsburgh | https://seatgeek.com/mei-semones-tickets/pittsburgh-pennsylvania-spirit-hall-pittsburgh-2027-05-08-7-pm/concert/18638032 |

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

Generated: 2026-10-11T16:29:59.843Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3178
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2488
- Events already carrying a valid SeatGeek URL: 985
- Enrichment-eligible events already carrying a valid SeatGeek URL: 684
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1804
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20737)
- Runs needed to check every eligible event once: 2
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
- 985 event(s) already carried valid SeatGeek URLs before this run, including 684 enrichment-eligible event(s).
- This run queried only the 1804 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | Rod Wave | 2026-11-01 | Chicago | https://seatgeek.com/rod-wave-tickets/chicago-illinois-united-center-2026-11-01-8-pm/concert/18414825 |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | Rod Wave | 2026-11-03 | Charlotte | https://seatgeek.com/rod-wave-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-03-8-30-pm/concert/18320066 |
| tm-rod-wave-2026-columbia-g5evz_udquqas | Rod Wave | 2026-11-06 | Columbia | https://seatgeek.com/rod-wave-tickets/columbia-south-carolina-colonial-life-arena-2026-11-06-8-30-pm/concert/18320065 |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | Rod Wave | 2026-11-09 | Orlando | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-09-8-30-pm/concert/18320069 |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | Rod Wave | 2026-11-10 | Orlando | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-10-8-pm/concert/18414835 |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | Rod Wave | 2026-11-18 | Atlanta | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-18-8-30-pm/concert/18320070 |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | Rod Wave | 2026-11-19 | Atlanta | https://seatgeek.com/rod-wave-tickets/atlanta-georgia-state-farm-arena-1-2026-11-19-8-pm/concert/18414834 |

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

Generated: 2026-10-11T16:31:42.356Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3209
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2516
- Events already carrying a valid SeatGeek URL: 1000
- Enrichment-eligible events already carrying a valid SeatGeek URL: 699
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1817
- Eligible (upcoming, resolvable local date) after pre-API filtering: 22
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20737)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-steve-lacy-2026-seattle-vvg1hz_8pk8e2l
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'steve-lacy' --max-api-calls 50 --resume-from 'tm-steve-lacy-2026-seattle-vvg1hz_8pk8e2l'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1000 event(s) already carried valid SeatGeek URLs before this run, including 699 enrichment-eligible event(s).
- This run queried only the 1817 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | Steve Lacy | 2026-10-31 | Atlanta | https://seatgeek.com/steve-lacy-tickets/atlanta-georgia-synovus-bank-amphitheatre-at-chastain-park-2026-10-31-8-pm/concert/18613494 |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | Steve Lacy | 2026-11-02 | Nashville | https://seatgeek.com/steve-lacy-tickets/nashville-tennessee-nashville-municipal-auditorium-2026-11-02-8-pm/concert/18485939 |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | Steve Lacy | 2026-11-05 | Irving | https://seatgeek.com/steve-lacy-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-05-8-pm/concert/18485937 |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | Steve Lacy | 2026-11-07 | Austin | https://seatgeek.com/steve-lacy-tickets/austin-texas-moody-amphitheater-2026-11-07-8-pm/concert/18485938 |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | Steve Lacy | 2026-11-13 | Las Vegas | https://seatgeek.com/steve-lacy-tickets/las-vegas-nevada-the-cosmopolitan-of-las-vegas-2026-11-13-8-pm/concert/18485946 |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | Steve Lacy | 2026-11-17 | Phoenix | https://seatgeek.com/steve-lacy-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-17-8-pm/concert/18485948 |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | Steve Lacy | 2026-11-19 | San Diego | https://seatgeek.com/steve-lacy-tickets/san-diego-california-petco-park-2026-11-19-8-pm/concert/18485949 |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | Steve Lacy | 2026-11-24 | San Francisco | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-24-8-pm/concert/18485954 |
| tm-steve-lacy-2026-san-francisco-g5vyz_8bk7kme | Steve Lacy | 2026-11-25 | San Francisco | https://seatgeek.com/steve-lacy-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-25-8-pm/concert/18613496 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-steve-lacy-2026-hollywood-vvg1iz_8f-wifq | Steve Lacy | 2026-11-21 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/steve-lacy-tickets/los-angeles-california-hollywood-bowl-2026-11-21-8-pm/concert/18485953 |

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

Generated: 2026-10-11T16:32:20.770Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3229
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2532
- Events already carrying a valid SeatGeek URL: 1006
- Enrichment-eligible events already carrying a valid SeatGeek URL: 705
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1827
- Eligible (upcoming, resolvable local date) after pre-API filtering: 16
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20737)
- Runs needed to check every eligible event once: 2
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
- 1006 event(s) already carried valid SeatGeek URLs before this run, including 705 enrichment-eligible event(s).
- This run queried only the 1827 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | The Smashing Pumpkins | 2026-11-03 | Calgary | https://seatgeek.com/the-smashing-pumpkins-tickets/calgary-canada-scotiabank-saddledome-2026-11-03-8-pm/concert/18250182 |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | The Smashing Pumpkins | 2026-11-05 | Vancouver | https://seatgeek.com/the-smashing-pumpkins-tickets/vancouver-canada-rogers-arena-2026-11-05-8-pm/concert/18250183 |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | The Smashing Pumpkins | 2026-11-06 | Seattle | https://seatgeek.com/the-smashing-pumpkins-tickets/seattle-washington-climate-pledge-arena-2026-11-06-8-pm/concert/18250170 |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | The Smashing Pumpkins | 2026-11-08 | San Jose | https://seatgeek.com/the-smashing-pumpkins-tickets/san-jose-california-sap-center-at-san-jose-2026-11-08-8-pm/concert/18250171 |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | The Smashing Pumpkins | 2026-11-11 | Phoenix | https://seatgeek.com/the-smashing-pumpkins-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-11-8-pm/concert/18250172 |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | The Smashing Pumpkins | 2026-11-12 | Inglewood | https://seatgeek.com/the-smashing-pumpkins-tickets/inglewood-california-kia-forum-2026-11-12-8-pm/concert/18250173 |

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

Generated: 2026-10-11T16:30:38.633Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3185
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2494
- Events already carrying a valid SeatGeek URL: 991
- Enrichment-eligible events already carrying a valid SeatGeek URL: 690
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1804
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20737)
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
- 991 event(s) already carried valid SeatGeek URLs before this run, including 690 enrichment-eligible event(s).
- This run queried only the 1804 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-uicideboy-2026-albuquerque-g5vzz_6ro72lp | $uicideboy$ | 2026-10-11 | Albuquerque | https://seatgeek.com/uicideboy-tickets/albuquerque-new-mexico-first-financial-credit-union-amphitheater-2026-10-11-6-30-pm/concert/18165458 |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | $uicideboy$ | 2026-10-13 | Austin | https://seatgeek.com/uicideboy-tickets/austin-texas-germania-insurance-amphitheater-2026-10-13-6-30-pm/concert/18155892 |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | $uicideboy$ | 2026-10-14 | New Orleans | https://seatgeek.com/uicideboy-tickets/new-orleans-louisiana-smoothie-king-center-2026-10-14-6-30-pm/concert/18155895 |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | $uicideboy$ | 2026-10-16 | Atlanta | https://seatgeek.com/uicideboy-tickets/atlanta-georgia-lakewood-amphitheatre-2026-10-16-6-30-pm/concert/18155896 |
| tm-uicideboy-2026-tampa-vvg1vz_6rke2ej | $uicideboy$ | 2026-10-17 | Tampa | https://seatgeek.com/uicideboy-tickets/tampa-florida-midflorida-credit-union-amphitheatre-2026-10-17-6-30-pm/concert/18155899 |
| tm-uicideboy-2026-birmingham-1aezz_6gkra4gmu | $uicideboy$ | 2026-10-20 | Birmingham | https://seatgeek.com/uicideboy-tickets/birmingham-alabama-coca-cola-amphitheater-2026-10-20-6-30-pm/concert/18155901 |

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
