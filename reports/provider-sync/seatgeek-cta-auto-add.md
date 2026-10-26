# SeatGeek CTA auto-add log

Generated: 2026-10-26T17:08:35.874Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4162
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4162
- Events already carrying a valid SeatGeek URL: 2282
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2282
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1880
- Eligible (upcoming, resolvable local date) after pre-API filtering: 32
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 4 (key 20752)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'barry-manilow' --max-api-calls 50 --resume-from 'tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub'
- Accepted venue mismatches: 10
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2282 event(s) already carried valid SeatGeek URLs before this run, including 2282 enrichment-eligible event(s).
- This run queried only the 1880 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | Barry Manilow | 2026-11-05 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-05-7-pm/concert/17637144 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | Barry Manilow | 2026-11-06 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-06-8-pm/concert/17637145 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | Barry Manilow | 2026-11-07 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-07-7-pm/concert/17637146 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | Barry Manilow | 2026-11-12 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-12-7-pm/concert/17637148 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | Barry Manilow | 2026-11-13 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-13-8-pm/concert/17637150 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | Barry Manilow | 2026-11-14 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-14-7-pm/concert/17637151 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | Barry Manilow | 2026-12-03 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-03-7-pm/concert/17637156 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | Barry Manilow | 2026-12-04 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-04-8-pm/concert/17637157 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | Barry Manilow | 2026-12-05 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | Barry Manilow | 2026-12-10 | Las Vegas | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-10-7-pm/concert/17637161 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-05-7-pm/concert/17637144 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-06-8-pm/concert/17637145 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-07-7-pm/concert/17637146 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-12-7-pm/concert/17637148 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-13-8-pm/concert/17637150 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-14-7-pm/concert/17637151 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-03-7-pm/concert/17637156 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-04-8-pm/concert/17637157 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-05-7-pm/concert/17637159 |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | Westgate Las Vegas International Theater | Westgate Las Vegas Resort & Casino | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-12-10-7-pm/concert/17637161 |

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

Generated: 2026-10-26T17:07:30.021Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4130
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4130
- Events already carrying a valid SeatGeek URL: 2272
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2272
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1858
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20752)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 4
- Events skipped: 6
- no_candidates_returned: 6
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'boyz-ii-men' --max-api-calls 50 --resume-from 'tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 6

## Interpretation

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2272 event(s) already carried valid SeatGeek URLs before this run, including 2272 enrichment-eligible event(s).
- This run queried only the 1858 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | Boyz II Men | 2026-12-18 | Norman | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | Boyz II Men | 2026-12-19 | Thackerville | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5lj2s | Boyz II Men | 2027-02-11 | National Harbor | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-11-8-pm/concert/18697996 |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5ij2m | Boyz II Men | 2027-02-12 | National Harbor | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-12-8-pm/concert/18697998 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-boyz-ii-men-2026-waurn-ponds-177yv0g6cqczn9y | Boyz II Men | 2026-11-28 | Waurn Ponds | no_candidates_returned | - |
| tm-boyz-ii-men-2026-auckland-17azv0g6c2evn3t | Boyz II Men | 2026-12-01 | Auckland | no_candidates_returned | - |
| tm-boyz-ii-men-2026-pokolbin-177yv0g6cro9xjr | Boyz II Men | 2026-12-05 | Pokolbin | no_candidates_returned | - |
| tm-boyz-ii-men-2026-mount-cotton-177yv0g6chtbuni | Boyz II Men | 2026-12-06 | Mount Cotton | no_candidates_returned | - |
| tm-boyz-ii-men-2027-boston-vv1avzk4egkdp6cdw | Boyz II Men | 2027-02-05 | Boston | no_candidates_returned | - |
| tm-boyz-ii-men-2027-atlantic-city-vv1kfz_fbxg7mvlj | Boyz II Men | 2027-02-06 | Atlantic City | no_candidates_returned | - |

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

Generated: 2026-10-26T17:12:37.029Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4234
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4234
- Events already carrying a valid SeatGeek URL: 2317
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2317
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1917
- Eligible (upcoming, resolvable local date) after pre-API filtering: 26
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20752)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 2
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'brandi-carlile' --max-api-calls 50 --resume-from 'tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 2

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2317 event(s) already carried valid SeatGeek URLs before this run, including 2317 enrichment-eligible event(s).
- This run queried only the 1917 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | Brandi Carlile | 2026-11-17 | Minneapolis | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-17-8-pm/concert/18626663 |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | Brandi Carlile | 2026-11-18 | Minneapolis | https://seatgeek.com/brandi-carlile-tickets/minneapolis-minnesota-state-theatre-minneapolis-2026-11-18-8-pm/concert/18626661 |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | Brandi Carlile | 2026-11-20 | Louisville | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-20-8-pm/concert/18626665 |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | Brandi Carlile | 2026-11-21 | Louisville | https://seatgeek.com/brandi-carlile-tickets/louisville-kentucky-louisville-palace-2026-11-21-8-pm/concert/18626671 |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | Brandi Carlile | 2026-11-22 | Kansas City | https://seatgeek.com/brandi-carlile-tickets/kansas-city-missouri-uptown-theater-kc-2026-11-22-8-pm/concert/18626672 |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | Brandi Carlile | 2026-12-15 | Port Chester | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-15-8-pm/concert/18626674 |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | Brandi Carlile | 2026-12-16 | Port Chester | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-16-8-pm/concert/18626676 |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | Brandi Carlile | 2026-12-17 | Port Chester | https://seatgeek.com/brandi-carlile-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2026-12-17-8-pm/concert/18626680 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-brandi-carlile-2027-dublin-1abzku4gkdpubm4 | Brandi Carlile | 2027-04-04 | Dublin | no_candidates_returned | - |
| tm-brandi-carlile-2027-glasgow-16dbz_8p8g7is9u | Brandi Carlile | 2027-04-06 | Glasgow | no_candidates_returned | - |

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

Generated: 2026-10-26T17:06:00.658Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4111
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4111
- Events already carrying a valid SeatGeek URL: 2264
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2264
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1847
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20752)
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
- Next resume showId: tm-cristian-castro-2027-orlando-1kfov0fzgac5wgd
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'cristian-castro' --max-api-calls 50 --resume-from 'tm-cristian-castro-2027-orlando-1kfov0fzgac5wgd'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2264 event(s) already carried valid SeatGeek URLs before this run, including 2264 enrichment-eligible event(s).
- This run queried only the 1847 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | Cristian Castro | 2026-11-06 | Glendale | https://seatgeek.com/cristian-castro-tickets/glendale-arizona-desert-diamond-arena-2026-11-06-8-pm/concert/18078145 |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | Cristian Castro | 2026-11-07 | El Paso | https://seatgeek.com/cristian-castro-tickets/el-paso-texas-el-paso-county-coliseum-2026-11-07-8-pm/concert/18078276 |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | Cristian Castro | 2026-11-27 | San Diego | https://seatgeek.com/cristian-castro-tickets/san-diego-california-pechanga-arena-san-diego-2026-11-27-8-pm/concert/18082276 |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | Cristian Castro | 2026-11-28 | Los Angeles | https://seatgeek.com/cristian-castro-tickets/los-angeles-california-peacock-theater-2026-11-28-8-pm/concert/18077764 |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | Cristian Castro | 2027-01-29 | Denver | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 |
| tm-cristian-castro-2027-west-valley-city-g5vzz_aklolqq | Cristian Castro | 2027-01-30 | West Valley City | https://seatgeek.com/cristian-castro-tickets/west-valley-city-utah-maverik-center-2027-01-30-8-pm/concert/18091097 |
| tm-cristian-castro-2027-anaheim-vv1aazkofgkeidrym | Cristian Castro | 2027-02-12 | Anaheim | https://seatgeek.com/cristian-castro-tickets/anaheim-california-honda-center-2027-02-12-8-pm/concert/18091093 |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | Cristian Castro | 2027-02-13 | Palm Desert | https://seatgeek.com/cristian-castro-tickets/thousand-palms-california-acrisure-arena-2027-02-13-8-pm/concert/18295570 |
| tm-cristian-castro-2027-hidalgo-g5diz_a2dt_o4 | Cristian Castro | 2027-02-27 | Hidalgo | https://seatgeek.com/cristian-castro-tickets/hidalgo-texas-payne-arena-2027-02-27-8-pm/concert/18091132 |
| tm-cristian-castro-2027-cedar-park-g5diz_ak4-aew | Cristian Castro | 2027-02-28 | Cedar Park | https://seatgeek.com/cristian-castro-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-02-28-7-pm/concert/18091442 |

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

Generated: 2026-10-26T17:11:33.126Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4208
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4208
- Events already carrying a valid SeatGeek URL: 2309
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2309
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1899
- Eligible (upcoming, resolvable local date) after pre-API filtering: 13
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20752)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-jon-pardi-2027-nampa-z7r9jz1aazeqe
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'jon-pardi' --max-api-calls 50 --resume-from 'tm-jon-pardi-2027-nampa-z7r9jz1aazeqe'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2309 event(s) already carried valid SeatGeek URLs before this run, including 2309 enrichment-eligible event(s).
- This run queried only the 1899 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | Jon Pardi | 2026-10-29 | Biloxi | https://seatgeek.com/jon-pardi-tickets/biloxi-mississippi-mississippi-coast-coliseum-2026-10-29-6-30-pm/concert/18390268 |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | Jon Pardi | 2026-10-30 | Macon | https://seatgeek.com/jon-pardi-tickets/macon-georgia-atrium-health-amphitheater-2026-10-30-7-pm/concert/18391147 |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | Jon Pardi | 2026-11-05 | Laredo | https://seatgeek.com/jon-pardi-tickets/laredo-texas-sames-auto-arena-2026-11-05-7-pm/concert/18390309 |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | Jon Pardi | 2026-11-06 | Corpus Christi | https://seatgeek.com/jon-pardi-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-11-06-7-pm/concert/18390332 |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | Jon Pardi | 2026-11-07 | Round Rock | https://seatgeek.com/jon-pardi-tickets/round-rock-texas-round-rock-amp-2026-11-07-5-30-pm/concert/18391256 |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | Jon Pardi | 2026-11-12 | Cedar Rapids | https://seatgeek.com/jon-pardi-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2026-11-12-7-pm/concert/18390356 |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | Jon Pardi | 2026-11-13 | Peoria | https://seatgeek.com/jon-pardi-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-13-7-pm/concert/18390874 |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | Jon Pardi | 2026-11-14 | Independence | https://seatgeek.com/jon-pardi-tickets/independence-missouri-cable-dahmer-arena-2026-11-14-7-pm/concert/18390529 |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | Jon Pardi | 2027-03-20 | Durant | https://seatgeek.com/jon-pardi-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-20-8-pm/concert/18652960 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-jon-pardi-2026-saint-louis-16e7z_obyg7v9-3 | Jon Pardi | 2026-12-19 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/jon-pardi-tickets/chesterfield-missouri-the-factory-stl-2026-12-19-8-pm/concert/18535011 |

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

Generated: 2026-10-26T17:09:26.380Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4170
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4170
- Events already carrying a valid SeatGeek URL: 2290
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2290
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1880
- Eligible (upcoming, resolvable local date) after pre-API filtering: 8
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20752)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 8
- Events checked by this run: 8
- API calls made: 40
- Rate-limit responses: 0
- URLs added: 8
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

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2290 event(s) already carried valid SeatGeek URLs before this run, including 2290 enrichment-eligible event(s).
- This run queried only the 1880 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | Koe Wetzel | 2026-10-28 | Morrison | https://seatgeek.com/koe-wetzel-tickets/morrison-colorado-red-rocks-amphitheatre-2026-10-28-6-45-pm/concert/18095493 |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | Koe Wetzel | 2026-10-30 | Lubbock | https://seatgeek.com/koe-wetzel-tickets/lubbock-texas-cook-s-garage-2026-10-30-6-45-pm/concert/18095494 |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | Koe Wetzel | 2026-12-02 | Helotes | https://seatgeek.com/koe-wetzel-tickets/helotes-texas-john-t-floore-country-store-2026-12-02-7-pm/concert/18649773 |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | Koe Wetzel | 2026-12-04 | Corpus Christi | https://seatgeek.com/koe-wetzel-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-12-04-7-pm/concert/18649774 |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | Koe Wetzel | 2026-12-05 | Round Rock | https://seatgeek.com/koe-wetzel-tickets/round-rock-texas-round-rock-amp-2026-12-05-7-pm/concert/18649776 |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | Koe Wetzel | 2026-12-09 | Fort Worth | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | Koe Wetzel | 2026-12-10 | Fort Worth | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 |
| tm-koe-wetzel-2026-las-vegas-1ayzkfkgkdtup_a | Koe Wetzel | 2026-12-11 | Las Vegas | https://seatgeek.com/koe-wetzel-tickets/las-vegas-nevada-ph-live-at-planet-hollywood-2026-12-11-8-pm/concert/18471843 |

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

Generated: 2026-10-26T17:06:27.312Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4115
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4115
- Events already carrying a valid SeatGeek URL: 2268
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2268
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1847
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20752)
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
- 2268 event(s) already carried valid SeatGeek URLs before this run, including 2268 enrichment-eligible event(s).
- This run queried only the 1847 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | Treaty Oak Revival | 2026-10-29 | Corpus Christi | https://seatgeek.com/treaty-oak-revival-tickets/corpus-christi-texas-concrete-street-amphitheater-2026-10-29-7-pm/concert/18230902 |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | Treaty Oak Revival | 2026-11-12 | Austin | https://seatgeek.com/treaty-oak-revival-tickets/austin-texas-moody-center-atx-2026-11-12-7-pm/concert/18229329 |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | Treaty Oak Revival | 2026-11-13 | The Woodlands | https://seatgeek.com/treaty-oak-revival-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2026-11-13-7-pm/concert/18229327 |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | Treaty Oak Revival | 2026-11-21 | Tulsa | https://seatgeek.com/treaty-oak-revival-tickets/tulsa-oklahoma-bok-center-2026-11-21-6-pm/concert/18590276 |

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

Generated: 2026-10-26T17:10:30.119Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4195
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4195
- Events already carrying a valid SeatGeek URL: 2300
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2300
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1895
- Eligible (upcoming, resolvable local date) after pre-API filtering: 25
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20752)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-victoria-monet-2026-las-vegas-1avjz_38nr4zdcac
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'victoria-monet' --max-api-calls 50 --resume-from 'tm-victoria-monet-2026-las-vegas-1avjz_38nr4zdcac'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2300 event(s) already carried valid SeatGeek URLs before this run, including 2300 enrichment-eligible event(s).
- This run queried only the 1895 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | Victoria Monet | 2026-11-18 | Chicago | https://seatgeek.com/victoria-monet-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-18-7-pm/concert/18579778 |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | Victoria Monet | 2026-11-21 | Toronto | https://seatgeek.com/victoria-monet-tickets/toronto-canada-coca-cola-coliseum-2026-11-21-8-pm/concert/18579799 |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | Victoria Monet | 2026-11-22 | Pittsburgh | https://seatgeek.com/victoria-monet-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2026-11-22-8-pm/concert/18579779 |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | Victoria Monet | 2026-11-24 | New York | https://seatgeek.com/victoria-monet-tickets/new-york-new-york-the-theater-at-msg-1-2026-11-24-8-pm/concert/18579782 |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | Victoria Monet | 2026-11-27 | Washington | https://seatgeek.com/victoria-monet-tickets/washington-district-of-columbia-the-anthem-dc-2026-11-27-8-pm/concert/18579783 |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | Victoria Monet | 2026-11-30 | Nashville | https://seatgeek.com/victoria-monet-tickets/nashville-tennessee-the-truth-nashville-2026-11-30-8-pm/concert/18579785 |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | Victoria Monet | 2026-12-02 | Austin | https://seatgeek.com/victoria-monet-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-02-8-pm/concert/18579809 |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | Victoria Monet | 2026-12-05 | Phoenix | https://seatgeek.com/victoria-monet-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-05-8-pm/concert/18579787 |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | Victoria Monet | 2026-12-06 | San Diego | https://seatgeek.com/victoria-monet-tickets/san-diego-california-cal-coast-credit-union-open-air-theatre-at-sdsu-2026-12-06-8-pm/concert/18579790 |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | Victoria Monet | 2026-12-08 | Inglewood | https://seatgeek.com/victoria-monet-tickets/inglewood-california-youtube-theater-2026-12-08-8-pm/concert/18579791 |

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
