# SeatGeek CTA auto-add log

Generated: 2026-11-24T21:00:13.415Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6020
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6018
- Events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2278
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20781)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 26
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3740 event(s) already carried valid SeatGeek URLs before this run, including 3740 enrichment-eligible event(s).
- This run queried only the 2278 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-culture-club-2026-bournemouth-17uov0g659y_xj3 | Culture Club | 2026-12-07 | Bournemouth | no_candidates_returned | - |
| tm-culture-club-2026-cardiff-17uov0g65qatjh8 | Culture Club | 2026-12-08 | Cardiff | no_candidates_returned | - |
| tm-culture-club-2026-manchester-g5vhz_g33v7ia | Culture Club | 2026-12-10 | Manchester | no_candidates_returned | - |
| tm-culture-club-2026-liverpool-17uyv0g659ybvks | Culture Club | 2026-12-11 | Liverpool | no_candidates_returned | - |
| tm-culture-club-2026-leeds-g5vhz_59ybb3y | Culture Club | 2026-12-12 | Leeds | no_candidates_returned | - |
| tm-culture-club-2026-newcastle-upon-tyne-g5vhz_59ybf3i | Culture Club | 2026-12-13 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-culture-club-2026-glasgow-17uov0g659z_cry | Culture Club | 2026-12-15 | Glasgow | no_candidates_returned | - |
| tm-culture-club-2026-sheffield-17u8v0g659uvycg | Culture Club | 2026-12-17 | Sheffield | no_candidates_returned | - |
| tm-culture-club-2026-birmingham-17fyv0g659y9xlw | Culture Club | 2026-12-18 | Birmingham | no_candidates_returned | - |
| tm-culture-club-2026-london-17u8v0g659y9_dw | Culture Club | 2026-12-19 | London | no_candidates_returned | - |

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

Generated: 2026-11-24T20:59:24.604Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6004
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6002
- Events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2262
- Eligible (upcoming, resolvable local date) after pre-API filtering: 35
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 2 of 2 (key 20781)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3740 event(s) already carried valid SeatGeek URLs before this run, including 3740 enrichment-eligible event(s).
- This run queried only the 2262 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-powderfinger-2027-melbourne-1apzk49gkdahuzu | Powderfinger | 2027-11-05 | Melbourne | no_candidates_returned | - |
| tm-powderfinger-2027-melbourne-1apzk49gkdawczh | Powderfinger | 2027-11-06 | Melbourne | no_candidates_returned | - |
| tm-powderfinger-2027-new-town-1aefz_4gkmua4ux | Powderfinger | 2027-11-13 | New Town | no_candidates_returned | - |
| tm-powderfinger-2027-new-town-1aefz_4gkwn0f-6 | Powderfinger | 2027-11-14 | New Town | no_candidates_returned | - |
| tm-powderfinger-2027-caversham-1avgz_4gklqcbyy | Powderfinger | 2027-11-20 | Caversham | no_candidates_returned | - |
| tm-powderfinger-2027-caversham-1avgz_4gkm_nd5y | Powderfinger | 2027-11-21 | Caversham | no_candidates_returned | - |
| tm-powderfinger-2027-parkes-1avgz_4gkmmigtv | Powderfinger | 2027-12-04 | Parkes | no_candidates_returned | - |
| tm-powderfinger-2027-parkes-1avgz_4gkrpif0p | Powderfinger | 2027-12-05 | Parkes | no_candidates_returned | - |
| tm-powderfinger-2027-bowen-hills-1avgz_4gkwmdz73 | Powderfinger | 2027-12-10 | Bowen Hills | no_candidates_returned | - |
| tm-powderfinger-2027-bowen-hills-1avgz_4gkue2jyq | Powderfinger | 2027-12-11 | Bowen Hills | no_candidates_returned | - |

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

Generated: 2026-11-24T20:59:37.391Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6010
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6008
- Events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3740
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2268
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20781)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 6
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 6
- no_candidates_returned: 6
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 6

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3740 event(s) already carried valid SeatGeek URLs before this run, including 3740 enrichment-eligible event(s).
- This run queried only the 2268 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-slash-2027-cardiff-g5vhz_kueusb3 | Slash | 2027-06-30 | Cardiff | no_candidates_returned | - |
| tm-slash-2027-scarborough-1adfz_kgkdfwywm | Slash | 2027-07-01 | Scarborough | no_candidates_returned | - |
| tm-slash-2027-dublin-1avoz_kgkslysih | Slash | 2027-07-03 | Dublin | no_candidates_returned | - |
| tm-slash-2027-belfast-1adoz_kgkuhgo_o | Slash | 2027-07-04 | Belfast | no_candidates_returned | - |
| tm-slash-2027-halifax-1adfz_kgks-vju1 | Slash | 2027-07-06 | Halifax | no_candidates_returned | - |
| tm-slash-2027-london-1auzk4v0gjzzeck | Slash | 2027-07-07 | London | no_candidates_returned | - |

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
