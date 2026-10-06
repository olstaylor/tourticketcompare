# SeatGeek CTA auto-add log

Generated: 2026-10-06T17:02:16.284Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2619
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2100
- Events already carrying a valid SeatGeek URL: 563
- Enrichment-eligible events already carrying a valid SeatGeek URL: 327
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1773
- Eligible (upcoming, resolvable local date) after pre-API filtering: 27
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20732)
- Runs needed to check every eligible event once: 3
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
- 563 event(s) already carried valid SeatGeek URLs before this run, including 327 enrichment-eligible event(s).
- This run queried only the 1773 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | Dylan Gossett | 2027-04-11 | Grand Rapids | https://seatgeek.com/dylan-gossett-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-11-7-pm/concert/18642102 |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | Dylan Gossett | 2027-05-04 | Indianapolis | https://seatgeek.com/dylan-gossett-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-05-04-7-pm/concert/18642104 |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | Dylan Gossett | 2027-05-06 | Madison | https://seatgeek.com/dylan-gossett-tickets/madison-wisconsin-the-sylvee-2027-05-06-7-pm/concert/18642105 |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | Dylan Gossett | 2027-05-07 | Kansas City | https://seatgeek.com/dylan-gossett-tickets/kansas-city-missouri-uptown-theater-kc-2027-05-07-7-pm/concert/18642106 |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | Dylan Gossett | 2027-05-08 | La Vista | https://seatgeek.com/dylan-gossett-tickets/la-vista-nebraska-the-astro-theater-la-vista-2027-05-08-7-pm/concert/18642110 |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | Dylan Gossett | 2027-05-13 | Austin | https://seatgeek.com/dylan-gossett-tickets/austin-texas-moody-amphitheater-2027-05-13-7-pm/concert/18642112 |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | Dylan Gossett | 2027-05-14 | Houston | https://seatgeek.com/dylan-gossett-tickets/houston-texas-bayou-music-center-2027-05-14-7-pm/concert/18642115 |

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

Generated: 2026-10-06T17:03:18.002Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2631
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2111
- Events already carrying a valid SeatGeek URL: 573
- Enrichment-eligible events already carrying a valid SeatGeek URL: 337
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1774
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20732)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-flans-2027-san-jose-g5vyz_k6lhlxq
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'flans' --max-api-calls 50 --resume-from 'tm-flans-2027-san-jose-g5vyz_k6lhlxq'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 573 event(s) already carried valid SeatGeek URLs before this run, including 337 enrichment-eligible event(s).
- This run queried only the 1774 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | Flans | 2027-02-12 | El Paso | https://seatgeek.com/flans-tickets/el-paso-texas-the-plaza-theatre-performing-arts-center-2027-02-12-8-pm/concert/18612856 |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | Flans | 2027-02-13 | Tucson | https://seatgeek.com/flans-tickets/tucson-arizona-linda-ronstadt-music-hall-2027-02-13-8-pm/concert/18612650 |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | Flans | 2027-02-25 | Atlanta | https://seatgeek.com/flans-tickets/atlanta-georgia-cobb-energy-performing-arts-centre-2027-02-25-8-pm/concert/18612632 |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | Flans | 2027-02-26 | Charlotte | https://seatgeek.com/flans-tickets/charlotte-north-carolina-ovens-auditorium-2027-02-26-8-pm/concert/18612827 |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | Flans | 2027-02-27 | Raleigh | https://seatgeek.com/flans-tickets/raleigh-north-carolina-martin-marietta-center-for-the-performing-arts-memorial-auditorium-2027-02-27-8-pm/concert/18618099 |
| tm-flans-2027-denver-g5vzz_kk90pao | Flans | 2027-03-04 | Denver | https://seatgeek.com/flans-tickets/denver-colorado-paramount-theatre-co-2027-03-04-8-pm/concert/18612819 |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | Flans | 2027-03-12 | San Diego | https://seatgeek.com/flans-tickets/san-diego-california-san-diego-civic-theatre-2027-03-12-8-pm/concert/18612871 |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | Flans | 2027-03-14 | Los Angeles | https://seatgeek.com/flans-tickets/los-angeles-california-orpheum-theatre-los-angeles-2027-03-14-8-pm/concert/18612688 |
| tm-flans-2027-houston-g5diz_k6-kevr | Flans | 2027-05-29 | Houston | https://seatgeek.com/flans-tickets/houston-texas-arena-theatre-houston-2027-05-29-8-pm/concert/18612653 |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | Flans | 2027-05-30 | McAllen | https://seatgeek.com/flans-tickets/mcallen-texas-mcallen-performing-arts-center-2027-05-30-8-pm/concert/18613121 |

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

Generated: 2026-10-06T17:01:31.954Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2584
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2073
- Events already carrying a valid SeatGeek URL: 556
- Enrichment-eligible events already carrying a valid SeatGeek URL: 320
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1753
- Eligible (upcoming, resolvable local date) after pre-API filtering: 32
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 4 (key 20732)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 2
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-staind-2027-san-antonio-g5diz_fkhzhba
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'staind' --max-api-calls 50 --resume-from 'tm-staind-2027-san-antonio-g5diz_fkhzhba'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 2

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 556 event(s) already carried valid SeatGeek URLs before this run, including 320 enrichment-eligible event(s).
- This run queried only the 1753 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | Staind | 2027-03-04 | Manchester | https://seatgeek.com/staind-tickets/manchester-new-hampshire-snhu-arena-2027-03-04-6-pm/concert/18654539 |
| tm-staind-2027-baltimore-11a8vpokayf8vu | Staind | 2027-03-06 | Baltimore | https://seatgeek.com/staind-tickets/baltimore-maryland-cfg-bank-arena-2027-03-06-6-pm/concert/18654540 |
| tm-staind-2027-huntington-1kaovp8iga2ivff | Staind | 2027-03-10 | Huntington | https://seatgeek.com/staind-tickets/huntington-west-virginia-marshall-health-network-arena-2027-03-10-6-pm/concert/18654510 |
| tm-staind-2027-tampa-vvg1vz_f6ermdd | Staind | 2027-03-12 | Tampa | https://seatgeek.com/staind-tickets/tampa-florida-benchmark-international-arena-2027-03-12-6-pm/concert/18654500 |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | Staind | 2027-03-13 | West Palm Beach | https://seatgeek.com/staind-tickets/west-palm-beach-florida-ithink-financial-amphitheatre-2027-03-13-6-pm/concert/18654501 |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | Staind | 2027-03-16 | Birmingham | https://seatgeek.com/staind-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-03-16-6-pm/concert/18654502 |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | Staind | 2027-03-18 | Oklahoma City | https://seatgeek.com/staind-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-18-6-pm/concert/18654504 |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | Staind | 2027-03-19 | Dallas | https://seatgeek.com/staind-tickets/dallas-texas-dos-equis-pavilion-2027-03-19-6-pm/concert/18654503 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-staind-2027-pittsburgh-1avbz_kgkdoccp7 | Staind | 2027-03-08 | Pittsburgh | no_candidates_returned | - |
| tm-staind-2027-reading-vv1aezk4vgkeshnyh | Staind | 2027-03-09 | Reading | no_candidates_returned | - |

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

Generated: 2026-10-06T17:00:30.810Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2552
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2041
- Events already carrying a valid SeatGeek URL: 548
- Enrichment-eligible events already carrying a valid SeatGeek URL: 312
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1729
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20732)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'the-neighbourhood' --max-api-calls 50 --resume-from 'tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 548 event(s) already carried valid SeatGeek URLs before this run, including 312 enrichment-eligible event(s).
- This run queried only the 1729 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | The Neighbourhood | 2026-10-07 | San Francisco | https://seatgeek.com/the-neighbourhood-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-10-07-7-30-pm/concert/17878569 |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | The Neighbourhood | 2026-10-09 | Inglewood | https://seatgeek.com/the-neighbourhood-tickets/inglewood-california-kia-forum-2026-10-09-7-pm/concert/17878570 |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | The Neighbourhood | 2026-11-10 | Atlanta | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | The Neighbourhood | 2026-11-11 | Orlando | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | The Neighbourhood | 2026-11-12 | Miami | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | The Neighbourhood | 2026-11-14 | Nashville | https://seatgeek.com/the-neighbourhood-tickets/nashville-tennessee-the-truth-nashville-2026-11-14-7-30-pm/concert/18126039 |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | The Neighbourhood | 2026-11-16 | Kansas City | https://seatgeek.com/the-neighbourhood-tickets/kansas-city-missouri-t-mobile-center-2026-11-16-7-30-pm/concert/18085139 |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | The Neighbourhood | 2026-11-18 | Chicago | https://seatgeek.com/the-neighbourhood-tickets/chicago-illinois-united-center-2026-11-18-7-30-pm/concert/18140881 |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | The Neighbourhood | 2026-11-19 | Detroit | https://seatgeek.com/the-neighbourhood-tickets/detroit-michigan-little-caesars-arena-2026-11-19-7-30-pm/concert/18085141 |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | The Neighbourhood | 2026-11-21 | Brooklyn | https://seatgeek.com/the-neighbourhood-tickets/brooklyn-new-york-barclays-center-2026-11-21-7-pm/concert/18085142 |

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

Generated: 2026-10-06T17:04:19.777Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2647
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2127
- Events already carrying a valid SeatGeek URL: 583
- Enrichment-eligible events already carrying a valid SeatGeek URL: 347
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1780
- Eligible (upcoming, resolvable local date) after pre-API filtering: 16
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20732)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'warren-zeiders' --max-api-calls 50 --resume-from 'tm-warren-zeiders-2026-glasgow-g5dzzbunoqnqa'
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 583 event(s) already carried valid SeatGeek URLs before this run, including 347 enrichment-eligible event(s).
- This run queried only the 1780 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | Warren Zeiders | 2027-03-25 | Orlando | https://seatgeek.com/warren-zeiders-tickets/orlando-florida-house-of-blues-orlando-2027-03-25-7-pm/concert/18649742 |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | 2027-03-26 | Hollywood | https://seatgeek.com/warren-zeiders-tickets/hollywood-florida-daer-nightclub-at-the-seminole-hard-rock-hotel-casino-2027-03-26-7-pm/concert/18649740 |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | Warren Zeiders | 2027-04-02 | Waukee | https://seatgeek.com/warren-zeiders-tickets/waukee-iowa-vibrant-music-hall-2027-04-02-7-pm/concert/18649743 |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | Warren Zeiders | 2027-04-15 | Grand Rapids | https://seatgeek.com/warren-zeiders-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2027-04-15-7-pm/concert/18649754 |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | Warren Zeiders | 2027-04-17 | Chicago | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | Warren Zeiders | 2027-04-22 | Philadelphia | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | Warren Zeiders | 2027-04-23 | Pittsburgh | https://seatgeek.com/warren-zeiders-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-04-23-7-pm/concert/18649761 |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | Warren Zeiders | 2027-04-24 | Cincinnati | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | Warren Zeiders | 2027-04-29 | Columbia | https://seatgeek.com/warren-zeiders-tickets/columbia-south-carolina-township-auditorium-2027-04-29-7-pm/concert/18649765 |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | Warren Zeiders | 2027-04-30 | Atlanta | https://seatgeek.com/warren-zeiders-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-30-7-pm/concert/18649766 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 |

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
