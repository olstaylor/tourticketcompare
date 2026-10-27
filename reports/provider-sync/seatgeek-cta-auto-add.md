# SeatGeek CTA auto-add log

Generated: 2026-10-27T16:08:37.715Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4279
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4279
- Events already carrying a valid SeatGeek URL: 2448
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2448
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1831
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
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
- 2448 event(s) already carried valid SeatGeek URLs before this run, including 2448 enrichment-eligible event(s).
- This run queried only the 1831 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-carin-leon-2027-las-vegas-1avjzbwgkrtxpef | Carin Leon | 2027-09-15 | Las Vegas | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-15-8-pm/concert/17838557 |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdqtn6j | Carin Leon | 2027-09-16 | Las Vegas | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-16-8-pm/concert/18583758 |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrskjz | Carin Leon | 2027-09-17 | Las Vegas | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-17-8-pm/concert/18583757 |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrgsj0 | Carin Leon | 2027-09-18 | Las Vegas | https://seatgeek.com/carin-leon-tickets/las-vegas-nevada-sphere-2027-09-18-8-pm/concert/18583756 |

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

Generated: 2026-10-27T16:09:14.063Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4284
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4284
- Events already carrying a valid SeatGeek URL: 2451
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2451
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1833
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1
- Events checked by this run: 1
- API calls made: 5
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2451 event(s) already carried valid SeatGeek URLs before this run, including 2451 enrichment-eligible event(s).
- This run queried only the 1833 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | Imagine Dragons | 2026-12-05 | Abu Dhabi | city_or_metro_match_failed | https://seatgeek.com/candlelight-coldplay-and-imagine-dragons-tickets/bridgeport-connecticut-bijou-theatre-bridgeport-2026-12-05-8-30-pm/concert/18547570 |

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

Generated: 2026-10-27T16:07:27.753Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4259
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4259
- Events already carrying a valid SeatGeek URL: 2438
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2438
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1821
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 4
- no_candidates_returned: 4
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 2
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 4

## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2438 event(s) already carried valid SeatGeek URLs before this run, including 2438 enrichment-eligible event(s).
- This run queried only the 1821 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-interpol-2027-hidalgo-g5diz_4kwcels | Interpol | 2027-03-19 | Hidalgo | https://seatgeek.com/interpol-tickets/hidalgo-texas-payne-arena-2027-03-19-8-pm/concert/18710343 |
| tm-interpol-2027-memphis-g5viz_4agmgrr | Interpol | 2027-03-22 | Memphis | https://seatgeek.com/interpol-tickets/memphis-tennessee-satellite-music-hall-2027-03-22-7-pm/concert/18710346 |
| tm-interpol-2027-asheville-g5evz_4oz4dpm | Interpol | 2027-03-23 | Asheville | https://seatgeek.com/interpol-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-23-8-pm/concert/18710348 |
| tm-interpol-2027-washington-1a4zk4kgkd5cf0g | Interpol | 2027-03-24 | Washington | https://seatgeek.com/interpol-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-24-7-30-pm/concert/18710355 |
| tm-interpol-2027-philadelphia-vv1aezk4fgkevbabi | Interpol | 2027-03-26 | Philadelphia | https://seatgeek.com/interpol-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-26-8-pm/concert/18710357 |
| tm-interpol-2026-san-diego-vvg1iz_4dkyacm | Interpol | 2026-12-11 | San Diego | https://seatgeek.com/interpol-tickets/san-diego-california-soma-san-diego-2026-12-11-8-pm/concert/18700629 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-interpol-2026-cardiff-1auzkungkeif6z0 | Interpol | 2026-11-21 | Cardiff | no_candidates_returned | - |
| tm-interpol-2026-manchester-1adfzbggkdjtldr | Interpol | 2026-11-24 | Manchester | no_candidates_returned | - |
| tm-interpol-2026-brighton-g5dzzbgwdgxyl | Interpol | 2026-11-27 | Brighton | no_candidates_returned | - |
| tm-interpol-2026-dublin-1abzkuogkdez9hd | Interpol | 2026-11-30 | Dublin | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-interpol-2027-asheville-g5evz_4oz4dpm | Harrah's Cherokee Center - Asheville | Thomas Wolfe Auditorium at Harrah's Cherokee Center | https://seatgeek.com/interpol-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-23-8-pm/concert/18710348 |
| tm-interpol-2027-philadelphia-vv1aezk4fgkevbabi | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/interpol-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-26-8-pm/concert/18710357 |

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

Generated: 2026-10-27T16:06:24.706Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4249
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4249
- Events already carrying a valid SeatGeek URL: 2432
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2432
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1817
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 0
- Events checked by this run: 0
- API calls made: 0
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2432 event(s) already carried valid SeatGeek URLs before this run, including 2432 enrichment-eligible event(s).
- This run queried only the 1817 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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

Generated: 2026-10-27T16:08:01.249Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4274
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4274
- Events already carrying a valid SeatGeek URL: 2443
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2443
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1831
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20753)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 5
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

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2443 event(s) already carried valid SeatGeek URLs before this run, including 2443 enrichment-eligible event(s).
- This run queried only the 1831 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-little-big-town-2026-detroit-vvg1oz_g9neqkq | Little Big Town | 2026-11-20 | Detroit | https://seatgeek.com/little-big-town-tickets/detroit-michigan-fox-theatre-detroit-2026-11-20-7-30-pm/concert/18292640 |
| tm-little-big-town-2026-toronto-177zv0g6g2_mkrp | Little Big Town | 2026-11-22 | Toronto | https://seatgeek.com/little-big-town-tickets/toronto-canada-massey-hall-2026-11-22-8-pm/concert/18292641 |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | Little Big Town | 2026-12-08 | Nashville | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | Little Big Town | 2026-12-09 | Nashville | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | Little Big Town | 2026-12-10 | Nashville | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 |

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

Generated: 2026-10-27T16:09:04.813Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4283
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4283
- Events already carrying a valid SeatGeek URL: 2451
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2451
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1832
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 3
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 1

## Skipped reasons

- conflicting_same_date_city_candidates: 1

## Interpretation

- `URLs added: 3` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2451 event(s) already carried valid SeatGeek URLs before this run, including 2451 enrichment-eligible event(s).
- This run queried only the 1832 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-phish-2027-new-york-g5diz_kv3mvxa | Phish | 2026-12-31 | New York | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-31-7-30-pm/concert/18659385 |
| tm-phish-2027-new-york-g5diz_kv3yvxl | Phish | 2027-01-01 | New York | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-01-7-30-pm/concert/18659382 |
| tm-phish-2027-new-york-g5diz_kv3dvxt | Phish | 2027-01-02 | New York | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2027-01-02-7-30-pm/concert/18659384 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-phish-2026-new-york-g5diz_kv3gvwh | Phish | 2026-12-30 | New York | conflicting_same_date_city_candidates | https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-30-7-30-pm/concert/18659383 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-phish-2026-new-york-g5diz_kv3gvwh (Phish, 2026-12-30, New York)
  - 100: https://seatgeek.com/phish-tickets/new-york-new-york-madison-square-garden-2026-12-30-3-30-am/concert/18659386

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-27T16:09:23.210Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4285
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4285
- Events already carrying a valid SeatGeek URL: 2452
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2452
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1833
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1
- Events checked by this run: 1
- API calls made: 5
- Rate-limit responses: 0
- URLs added: 1
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

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2452 event(s) already carried valid SeatGeek URLs before this run, including 2452 enrichment-eligible event(s).
- This run queried only the 1833 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | RUFUS DU SOL | 2027-01-03 | San Francisco | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 |

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

Generated: 2026-10-27T16:08:10.684Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4275
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4275
- Events already carrying a valid SeatGeek URL: 2444
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2444
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1831
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20753)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1
- Events checked by this run: 1
- API calls made: 5
- Rate-limit responses: 0
- URLs added: 1
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

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2444 event(s) already carried valid SeatGeek URLs before this run, including 2444 enrichment-eligible event(s).
- This run queried only the 1831 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | Shaboozey | 2026-10-27 | Los Angeles | https://seatgeek.com/shaboozey-tickets/los-angeles-california-the-greek-theatre-los-angeles-2026-10-27-7-30-pm/concert/18208375 |

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
