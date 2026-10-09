# SeatGeek CTA auto-add log

Generated: 2026-10-09T17:14:46.930Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2723
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2184
- Events already carrying a valid SeatGeek URL: 724
- Enrichment-eligible events already carrying a valid SeatGeek URL: 485
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1699
- Eligible (upcoming, resolvable local date) after pre-API filtering: 52
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 6 of 6 (key 20735)
- Runs needed to check every eligible event once: 6
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 724 event(s) already carried valid SeatGeek URLs before this run, including 485 enrichment-eligible event(s).
- This run queried only the 1699 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd | Dancing With The Stars | 2027-04-10 | Charlotte | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-duluth-vvg1zz_km06fsr | Dancing With The Stars | 2027-04-11 | Duluth | no_candidates_returned | - |

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

Generated: 2026-10-09T17:15:48.123Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2763
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2224
- Events already carrying a valid SeatGeek URL: 734
- Enrichment-eligible events already carrying a valid SeatGeek URL: 495
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1729
- Eligible (upcoming, resolvable local date) after pre-API filtering: 40
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 4 of 4 (key 20735)
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
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 734 event(s) already carried valid SeatGeek URLs before this run, including 495 enrichment-eligible event(s).
- This run queried only the 1729 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | Def Leppard | 2027-06-11 | Savannah | https://seatgeek.com/def-leppard-tickets/savannah-georgia-enmarket-arena-2027-06-11-7-pm/concert/18662435 |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | Def Leppard | 2027-06-13 | Tampa | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | Def Leppard | 2027-06-17 | Atlanta | https://seatgeek.com/def-leppard-tickets/atlanta-georgia-state-farm-arena-1-2027-06-17-7-pm/concert/18662442 |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | Def Leppard | 2027-06-19 | Columbus | https://seatgeek.com/def-leppard-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-19-7-pm/concert/18662443 |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | Def Leppard | 2027-06-23 | New York | https://seatgeek.com/def-leppard-tickets/new-york-new-york-madison-square-garden-2027-06-23-7-pm/concert/18662446 |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | Def Leppard | 2027-06-25 | Uncasville | https://seatgeek.com/def-leppard-tickets/uncasville-connecticut-mohegan-sun-arena-2027-06-25-7-pm/concert/18662447 |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | Def Leppard | 2027-06-27 | Philadelphia | https://seatgeek.com/def-leppard-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-27-7-pm/concert/18662449 |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | Def Leppard | 2027-06-30 | Charlotte | https://seatgeek.com/def-leppard-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-06-30-7-pm/concert/18662452 |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | Def Leppard | 2027-07-02 | Indianapolis | https://seatgeek.com/def-leppard-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-07-02-7-pm/concert/18662454 |
| tm-def-leppard-2026-hollywood-vvg1vz_5sqbrak | Def Leppard | 2026-10-15 | Hollywood | https://seatgeek.com/def-leppard-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-15-8-pm/concert/18281739 |

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

Generated: 2026-10-09T17:17:20.877Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2828
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2279
- Events already carrying a valid SeatGeek URL: 742
- Enrichment-eligible events already carrying a valid SeatGeek URL: 503
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1776
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20735)
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
- 742 event(s) already carried valid SeatGeek URLs before this run, including 503 enrichment-eligible event(s).
- This run queried only the 1776 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | Jay Wheeler | 2027-04-02 | Rosemont | https://seatgeek.com/jay-wheeler-tickets/rosemont-illinois-rosemont-theatre-2027-04-02-8-pm/concert/18649608 |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | Jay Wheeler | 2027-04-04 | Denver | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | Jay Wheeler | 2027-04-06 | Irving | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | Jay Wheeler | 2027-04-07 | Houston | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | Jay Wheeler | 2027-04-15 | Orlando | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 |

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

Generated: 2026-10-09T17:17:46.772Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2863
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2303
- Events already carrying a valid SeatGeek URL: 746
- Enrichment-eligible events already carrying a valid SeatGeek URL: 507
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1796
- Eligible (upcoming, resolvable local date) after pre-API filtering: 24
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20735)
- Runs needed to check every eligible event once: 3
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
- 746 event(s) already carried valid SeatGeek URLs before this run, including 507 enrichment-eligible event(s).
- This run queried only the 1796 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | Mico | 2026-11-02 | Boston | https://seatgeek.com/mico-tickets/boston-massachusetts-paradise-rock-club-2026-11-02-7-pm/concert/18251753 |
| tm-mico-2026-montreal-16szkfk00zagk68g | Mico | 2026-11-05 | Montreal | https://seatgeek.com/mico-tickets/montreal-canada-mtelus-2026-11-05-8-pm/concert/18472169 |
| tm-mico-2026-toronto-177zv0g61sycnt1 | Mico | 2026-11-06 | Toronto | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-06-7-pm/concert/18252202 |
| tm-mico-2026-toronto-177zv0g659n9upv | Mico | 2026-11-07 | Toronto | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-07-7-pm/concert/18260543 |

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

Generated: 2026-10-09T17:16:49.219Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2808
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2264
- Events already carrying a valid SeatGeek URL: 737
- Enrichment-eligible events already carrying a valid SeatGeek URL: 498
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1766
- Eligible (upcoming, resolvable local date) after pre-API filtering: 40
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 4 of 4 (key 20735)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 3
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

- `URLs added: 3` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 737 event(s) already carried valid SeatGeek URLs before this run, including 498 enrichment-eligible event(s).
- This run queried only the 1766 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | Nickelback | 2027-04-27 | Dallas | https://seatgeek.com/nickelback-tickets/dallas-texas-american-airlines-center-2027-04-27-6-30-pm/concert/18664618 |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | Nickelback | 2027-05-01 | San Antonio | https://seatgeek.com/nickelback-tickets/san-antonio-texas-frost-bank-center-2027-05-01-6-30-pm/concert/18664624 |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | Nickelback | 2026-12-19 | Durant | https://seatgeek.com/nickelback-tickets/durant-oklahoma-choctaw-grand-theater-2026-12-19-8-pm/concert/18629578 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | 2027-05-22 | Leeds | no_candidates_returned | - |
| tm-nickelback-2027-london-1agzk46gkdjr1bv | Nickelback | 2027-05-25 | London | no_candidates_returned | - |
| tm-nickelback-2027-birmingham-1kfyvp3_gagcomu | Nickelback | 2027-05-28 | Birmingham | no_candidates_returned | - |
| tm-nickelback-2027-dublin-1abzkfmgkepnjt6 | Nickelback | 2027-05-30 | Dublin | no_candidates_returned | - |
| tm-nickelback-2027-glasgow-1auzk46gkexekqz | Nickelback | 2027-06-01 | Glasgow | no_candidates_returned | - |
| tm-nickelback-2027-manchester-1amzk46gkdgpim1 | Nickelback | 2027-06-02 | Manchester | no_candidates_returned | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | 2027-06-23 | Assago | no_candidates_returned | - |

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
