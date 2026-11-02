# SeatGeek CTA auto-add log

Generated: 2026-11-02T20:36:44.661Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4917
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4917
- Events already carrying a valid SeatGeek URL: 2680
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2680
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2237
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20759)
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
- 2680 event(s) already carried valid SeatGeek URLs before this run, including 2680 enrichment-eligible event(s).
- This run queried only the 2237 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-dom-dolla-2026-las-vegas-z7r9jz1a7p3c3 | Dom Dolla | 2026-11-21 | Las Vegas | https://seatgeek.com/dom-dolla-tickets/las-vegas-nevada-liv-nightclub-las-vegas-2026-11-21-10-30-pm/concert/18598936 |

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

Generated: 2026-11-02T20:39:04.649Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4978
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4978
- Events already carrying a valid SeatGeek URL: 2700
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2700
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2278
- Eligible (upcoming, resolvable local date) after pre-API filtering: 35
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 4 of 4 (key 20759)
- Runs needed to check every eligible event once: 4
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
- 2700 event(s) already carried valid SeatGeek URLs before this run, including 2700 enrichment-eligible event(s).
- This run queried only the 2278 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jodeci-2027-san-francisco-g5vyz_2qprnjg | Jodeci | 2027-01-08 | San Francisco | https://seatgeek.com/jodeci-tickets/san-francisco-california-the-masonic-san-francisco-2027-01-08-8-pm/concert/18407226 |
| tm-jodeci-2027-inglewood-vvg1iz_2l8dh94 | Jodeci | 2027-01-09 | Inglewood | https://seatgeek.com/jodeci-tickets/inglewood-california-youtube-theater-2027-01-09-8-pm/concert/18407227 |
| tm-jodeci-2027-el-cajon-vvg1iz_2r2vxq6 | Jodeci | 2027-01-10 | El Cajon | https://seatgeek.com/jodeci-tickets/el-cajon-california-the-magnolia-1-2027-01-10-7-pm/concert/18407231 |
| tm-jodeci-2027-phoenix-17k8v0g62lhiblw | Jodeci | 2027-01-15 | Phoenix | https://seatgeek.com/jodeci-tickets/phoenix-arizona-arizona-financial-theatre-2027-01-15-8-pm/concert/18407229 |
| tm-jodeci-2027-ontario-vvg10z_2n6tniq | Jodeci | 2027-01-16 | Ontario | https://seatgeek.com/jodeci-tickets/ontario-california-toyota-arena-ontario-2027-01-16-8-pm/concert/18407228 |

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

Generated: 2026-11-02T20:39:20.826Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5010
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5010
- Events already carrying a valid SeatGeek URL: 2702
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2702
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2308
- Eligible (upcoming, resolvable local date) after pre-API filtering: 32
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 4 of 4 (key 20759)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 2
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

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2702 event(s) already carried valid SeatGeek URLs before this run, including 2702 enrichment-eligible event(s).
- This run queried only the 2308 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mercyme-2027-canton-vv17fz_fgkw2un6n | MercyMe | 2027-05-01 | Canton | https://seatgeek.com/mercyme-tickets/canton-ohio-canton-civic-center-canton-oh-2027-05-01-7-pm/concert/18692284 |
| tm-mercyme-2027-evansville-vv17fz_fgkwdo5qw | MercyMe | 2027-05-02 | Evansville | https://seatgeek.com/mercyme-tickets/evansville-indiana-ford-center-in-2027-05-02-7-pm/concert/18692285 |

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

Generated: 2026-11-02T20:37:07.165Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4930
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4930
- Events already carrying a valid SeatGeek URL: 2682
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2682
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2248
- Eligible (upcoming, resolvable local date) after pre-API filtering: 13
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20759)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 3
- Events checked by this run: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 2
- Events skipped: 1
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1

## Interpretation

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2682 event(s) already carried valid SeatGeek URLs before this run, including 2682 enrichment-eligible event(s).
- This run queried only the 2248 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-motionless-in-white-2026-newark-vvg1fz_5s7fn3l | Motionless in White | 2026-11-19 | Newark | https://seatgeek.com/motionless-in-white-tickets/newark-new-jersey-prudential-center-2026-11-19-6-30-pm/concert/18281913 |
| tm-motionless-in-white-2026-pittsburgh-17aov0g65mh-tzb | Motionless in White | 2026-11-20 | Pittsburgh | https://seatgeek.com/motionless-in-white-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-20-6-30-pm/concert/18281916 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-motionless-in-white-2027-dubendorf-z698xzu3z16ezmoj16 | Motionless in White | 2027-06-08 | Dübendorf | no_candidates_returned | - |

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

Generated: 2026-11-02T20:39:31.003Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5011
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5011
- Events already carrying a valid SeatGeek URL: 2703
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2703
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2308
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20759)
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
- 2703 event(s) already carried valid SeatGeek URLs before this run, including 2703 enrichment-eligible event(s).
- This run queried only the 2308 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | Omer Adam | 2026-11-03 | Brooklyn | https://seatgeek.com/omer-adam-tickets/brooklyn-new-york-barclays-center-2026-11-03-9-pm/concert/18671901 |

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

Generated: 2026-11-02T20:38:31.262Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4943
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4943
- Events already carrying a valid SeatGeek URL: 2695
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2695
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2248
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20759)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
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

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2695 event(s) already carried valid SeatGeek URLs before this run, including 2695 enrichment-eligible event(s).
- This run queried only the 2248 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | Rawayana | 2026-11-04 | National Harbor | https://seatgeek.com/rawayana-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-04-8-pm/concert/18127549 |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | Rawayana | 2026-11-07 | Chicago | https://seatgeek.com/rawayana-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-07-8-pm/concert/18126546 |
| tm-rawayana-2026-inglewood-vv170z_kgkuw4lc4 | Rawayana | 2026-11-15 | Inglewood | https://seatgeek.com/rawayana-tickets/inglewood-california-kia-forum-2026-11-15-8-pm/concert/18126384 |
| tm-rawayana-2026-houston-g5diz_kwowtst | Rawayana | 2026-11-18 | Houston | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-18-8-pm/concert/18127552 |
| tm-rawayana-2026-houston-g5diz_ad2y7sg | Rawayana | 2026-11-19 | Houston | https://seatgeek.com/rawayana-tickets/houston-texas-713-music-hall-2026-11-19-8-pm/concert/18223585 |
| tm-rawayana-2026-irving-vvg1yz_kyui28o | Rawayana | 2026-11-21 | Irving | https://seatgeek.com/rawayana-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-21-8-pm/concert/18127554 |
| tm-rawayana-2026-orlando-1aefz_kgkuqmj8a | Rawayana | 2026-12-03 | Orlando | https://seatgeek.com/rawayana-tickets/orlando-florida-kia-center-2026-12-03-8-pm/concert/18126388 |
| tm-rawayana-2026-miami-vvg1vz_fh4bcfd | Rawayana | 2026-12-04 | Miami | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-04-8-pm/concert/18659426 |
| tm-rawayana-2026-miami-vvg1vz_kwnj_rj | Rawayana | 2026-12-05 | Miami | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-05-8-pm/concert/18126459 |
| tm-rawayana-2026-miami-vvg1vz_6kilnkl | Rawayana | 2026-12-06 | Miami | https://seatgeek.com/rawayana-tickets/miami-florida-kaseya-center-2026-12-06-8-pm/concert/18132184 |

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

Generated: 2026-11-02T20:36:34.317Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: not confirmed (no status)
- Total events in data: 4916
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4916
- Events already carrying a valid SeatGeek URL: 2679
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2679
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2237
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20759)
- Runs needed to check every eligible event once: 1
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
- 2679 event(s) already carried valid SeatGeek URLs before this run, including 2679 enrichment-eligible event(s).
- This run queried only the 2237 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-shania-twain-2027-scarborough-1agzkfugkdob_wu | Shania Twain | 2027-06-16 | Scarborough | no_candidates_returned | - |
| tm-shania-twain-2027-glasgow-1adbz_fgkuptsoi | Shania Twain | 2027-06-17 | Glasgow | no_candidates_returned | - |
| tm-shania-twain-2027-cardiff-g5vhz_kljqj-d | Shania Twain | 2027-06-22 | Cardiff | no_candidates_returned | - |
| tm-shania-twain-2027-exeter-g5vhz_kjtg0ag | Shania Twain | 2027-06-24 | Exeter | no_candidates_returned | - |
| tm-shania-twain-2027-dublin-1abzk4pgkenqubp | Shania Twain | 2027-06-26 | Dublin | no_candidates_returned | - |
| tm-shania-twain-2027-belfast-1adoz_4gksdrodo | Shania Twain | 2027-06-27 | Belfast | no_candidates_returned | - |
| tm-shania-twain-2027-woodstock-1amzk4agkdk2pnt | Shania Twain | 2027-06-29 | Woodstock | no_candidates_returned | - |

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

Generated: 2026-11-02T20:37:28.884Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4933
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4933
- Events already carrying a valid SeatGeek URL: 2685
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2685
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2248
- Eligible (upcoming, resolvable local date) after pre-API filtering: 3
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20759)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 3
- Events checked by this run: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 3
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

- `URLs added: 3` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2685 event(s) already carried valid SeatGeek URLs before this run, including 2685 enrichment-eligible event(s).
- This run queried only the 2248 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | YG | 2026-11-06 | Honolulu | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-06-8-pm/concert/18392100 |
| tm-yg-2026-honolulu-z7r9jz1aazajy | YG | 2026-11-07 | Honolulu | https://seatgeek.com/yg-tickets/honolulu-hawaii-the-republik-1-2026-11-07-8-pm/concert/18392092 |
| tm-yg-2026-oakland-g5vyz_u2lcdvy | YG | 2026-12-19 | Oakland | https://seatgeek.com/yg-tickets/oakland-california-oakland-arena-2026-12-19-8-pm/concert/18327961 |

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
