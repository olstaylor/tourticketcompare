# SeatGeek CTA auto-add log

Generated: 2026-10-25T14:41:06.909Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4077
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3186
- Events already carrying a valid SeatGeek URL: 2193
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1681
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1505
- Eligible (upcoming, resolvable local date) after pre-API filtering: 3
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20751)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 3
- Events checked by this run: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 1
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

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2193 event(s) already carried valid SeatGeek URLs before this run, including 1681 enrichment-eligible event(s).
- This run queried only the 1505 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | Anuel AA | 2026-11-06 | Belmont Park | https://seatgeek.com/anuel-aa-tickets/elmont-new-york-ubs-arena-2026-11-06-8-pm/concert/18579489 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-anuel-aa-2027-monterrey-g5dvz_6rcdk4r | Anuel AA | 2027-04-08 | Monterrey | no_candidates_returned | - |
| tm-anuel-aa-2027-zapopan-g5dvz_6raf6md | Anuel AA | 2027-04-15 | Zapopan | no_candidates_returned | - |

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

Generated: 2026-10-25T14:41:55.208Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4095
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3203
- Events already carrying a valid SeatGeek URL: 2198
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1686
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1517
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20751)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 3
- Events skipped: 2
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 2

## Skipped reasons

- conflicting_same_date_city_candidates: 2

## Interpretation

- `URLs added: 3` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2198 event(s) already carried valid SeatGeek URLs before this run, including 1686 enrichment-eligible event(s).
- This run queried only the 1517 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-billy-strings-2027-asheville-g5evz_omwcg3b | Billy Strings | 2027-02-09 | Asheville | https://seatgeek.com/billy-strings-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-02-09-7-30-pm/concert/18540083 |
| tm-billy-strings-2027-duluth-vvg1zz_ointe8l | Billy Strings | 2027-02-13 | Duluth | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-13-7-30-pm/concert/18540092 |
| tm-billy-strings-2027-nashville-g5viz_on5a9pr | Billy Strings | 2027-02-20 | Nashville | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-20-7-30-pm/concert/18540094 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-billy-strings-2027-duluth-vvg1zz_oinx98f | Billy Strings | 2027-02-12 | Duluth | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-12-7-30-pm/concert/18540085 |
| tm-billy-strings-2027-nashville-g5viz_on579po | Billy Strings | 2027-02-19 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-19-7-30-pm/concert/18540093 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-billy-strings-2027-duluth-vvg1zz_oinx98f (Billy Strings, 2027-02-12, Duluth)
  - 100: https://seatgeek.com/billy-strings-tickets/duluth-georgia-gas-south-arena-2027-02-12-3-30-am/concert/18540097
- tm-billy-strings-2027-nashville-g5viz_on579po (Billy Strings, 2027-02-19, Nashville)
  - 100: https://seatgeek.com/billy-strings-tickets/nashville-tennessee-bridgestone-arena-2027-02-19-3-30-am/concert/18542780

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-25T14:40:44.457Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4074
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3183
- Events already carrying a valid SeatGeek URL: 2192
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1680
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1503
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20751)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 4
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

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2192 event(s) already carried valid SeatGeek URLs before this run, including 1680 enrichment-eligible event(s).
- This run queried only the 1503 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | Bon Jovi | 2027-07-15 | East Rutherford | https://seatgeek.com/bon-jovi-tickets/east-rutherford-new-jersey-metlife-stadium-2027-07-15-6-30-pm/concert/18696568 |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | Bon Jovi | 2027-07-21 | Chicago | https://seatgeek.com/bon-jovi-tickets/chicago-illinois-soldier-field-2027-07-21-6-30-pm/concert/18696570 |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | Bon Jovi | 2027-07-28 | Foxborough | https://seatgeek.com/bon-jovi-tickets/foxborough-massachusetts-gillette-stadium-2027-07-28-7-pm/concert/18696567 |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | Bon Jovi | 2027-08-04 | Toronto | https://seatgeek.com/bon-jovi-tickets/toronto-canada-rogers-stadium-toronto-2027-08-04-6-30-pm/concert/18696569 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-bon-jovi-2027-docklands-1aefz_fgkxe60v9 | Bon Jovi | 2027-03-04 | Docklands | no_candidates_returned | - |

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

Generated: 2026-10-25T14:40:45.497Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4074
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3183
- Events already carrying a valid SeatGeek URL: 2192
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1680
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1503
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20751)
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
- 2192 event(s) already carried valid SeatGeek URLs before this run, including 1680 enrichment-eligible event(s).
- This run queried only the 1503 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-25T14:41:22.571Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4079
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3188
- Events already carrying a valid SeatGeek URL: 2195
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1683
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1505
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20751)
- Runs needed to check every eligible event once: 1
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
- 2195 event(s) already carried valid SeatGeek URLs before this run, including 1683 enrichment-eligible event(s).
- This run queried only the 1505 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | Luke Bryan | 2026-12-05 | Mescalero | https://seatgeek.com/luke-bryan-tickets/mescalero-new-mexico-inn-of-the-mountain-gods-resort-and-casino-2026-12-05-8-pm/concert/18571831 |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | Luke Bryan | 2026-12-11 | Las Vegas | https://seatgeek.com/luke-bryan-tickets/las-vegas-nevada-allegiant-stadium-2026-12-11-3-30-am/concert/18211763 |

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

Generated: 2026-10-25T14:40:11.688Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4069
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3178
- Events already carrying a valid SeatGeek URL: 2188
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1676
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1502
- Eligible (upcoming, resolvable local date) after pre-API filtering: 9
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20751)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 9
- no_candidates_returned: 9
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 9

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2188 event(s) already carried valid SeatGeek URLs before this run, including 1676 enrichment-eligible event(s).
- This run queried only the 1502 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-sam-fender-2027-newcastle-upon-tyne-1agzk4fgkd88g8t | Sam Fender | 2027-06-03 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1adfz_fgktpp_oj | Sam Fender | 2027-06-05 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | 2027-06-10 | Cardiff | no_candidates_returned | - |
| tm-sam-fender-2027-london-16nzk4f00zauv12c | Sam Fender | 2027-06-18 | London | no_candidates_returned | - |
| tm-sam-fender-2027-london-1anzk4fgkdp88g6 | Sam Fender | 2027-06-20 | London | no_candidates_returned | - |
| tm-sam-fender-2027-dublin-1avoz_fgkxvywdt | Sam Fender | 2027-07-01 | Dublin | no_candidates_returned | - |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | 2027-07-08 | Edinburgh | no_candidates_returned | - |
| tm-sam-fender-2027-manchester-g5dzz_42lyjlw | Sam Fender | 2027-07-15 | Manchester | no_candidates_returned | - |
| tm-sam-fender-2027-manchester-g5dzz_4k4turs | Sam Fender | 2027-07-17 | Manchester | no_candidates_returned | - |

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
