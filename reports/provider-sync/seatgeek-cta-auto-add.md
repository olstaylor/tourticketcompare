# SeatGeek CTA auto-add log

Generated: 2026-11-23T22:20:49.668Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5950
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5948
- Events already carrying a valid SeatGeek URL: 3742
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3741
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2207
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20780)
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
- 3742 event(s) already carried valid SeatGeek URLs before this run, including 3741 enrichment-eligible event(s).
- This run queried only the 2207 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-anthony-santos-2027-newark-vv1aezk4sgkdqnkwj | Anthony Santos | 2027-05-29 | Newark | https://seatgeek.com/anthony-santos-tickets/newark-new-jersey-prudential-center-2027-05-29-8-pm/concert/18842282 |

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

Generated: 2026-11-23T22:21:53.820Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5974
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5972
- Events already carrying a valid SeatGeek URL: 3750
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3749
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2223
- Eligible (upcoming, resolvable local date) after pre-API filtering: 24
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20780)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 11
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 3
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-deftones-2027-ridgefield-vvg1hz_pkr1dlz
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'deftones' --max-api-calls 50 --resume-from 'tm-deftones-2027-ridgefield-vvg1hz_pkr1dlz'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 2
- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3750 event(s) already carried valid SeatGeek URLs before this run, including 3749 enrichment-eligible event(s).
- This run queried only the 2223 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-deftones-2027-dallas-vvg1yz_pojf4p4 | Deftones | 2027-05-05 | Dallas | https://seatgeek.com/deftones-tickets/dallas-texas-dos-equis-pavilion-2027-05-05-7-pm/concert/18760666 |
| tm-deftones-2027-san-antonio-g5diz_p9wbnqa | Deftones | 2027-05-06 | San Antonio | https://seatgeek.com/deftones-tickets/san-antonio-texas-frost-bank-center-2027-05-06-7-pm/concert/18760665 |
| tm-deftones-2027-the-woodlands-g5diz_pp2vhky | Deftones | 2027-05-08 | The Woodlands | https://seatgeek.com/deftones-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-05-08-7-pm/concert/18760667 |
| tm-deftones-2027-albuquerque-g5vzz_ppeinsj | Deftones | 2027-05-10 | Albuquerque | https://seatgeek.com/deftones-tickets/albuquerque-new-mexico-first-financial-credit-union-amphitheater-2027-05-10-7-pm/concert/18760668 |
| tm-deftones-2027-phoenix-1a_zk4pgkexsuym | Deftones | 2027-05-12 | Phoenix | https://seatgeek.com/deftones-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-05-12-7-pm/concert/18760669 |
| tm-deftones-2027-wheatland-g5vyz_poagxh_ | Deftones | 2027-05-16 | Wheatland | https://seatgeek.com/deftones-tickets/wheatland-california-toyota-amphitheatre-2027-05-16-7-pm/concert/18760670 |
| tm-deftones-2027-concord-g5vyz_poavmx7 | Deftones | 2027-05-26 | Concord | https://seatgeek.com/deftones-tickets/concord-california-toyota-pavilion-at-concord-2027-05-26-7-pm/concert/18760672 |
| tm-deftones-2027-auburn-vvg1hz_pp22vor | Deftones | 2027-05-28 | Auburn | https://seatgeek.com/deftones-tickets/auburn-washington-white-river-amphitheatre-2027-05-28-7-pm/concert/18760677 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-deftones-2027-hollywood-vvg1iz_penmg6y | Deftones | 2027-05-18 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/deftones-tickets/los-angeles-california-hollywood-bowl-2027-05-18-7-pm/concert/18760671 |
| tm-deftones-2027-hollywood-vvg1iz_9d2v7ij | Deftones | 2027-05-19 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/deftones-tickets/los-angeles-california-hollywood-bowl-2027-05-19-7-pm/concert/18784681 |
| tm-deftones-2027-ridgefield-vvg1hz_pkr1dlz | Deftones | 2027-05-29 | Ridgefield | api_call_limit_not_checked | - |

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

Generated: 2026-11-23T22:22:23.210Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6028
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6026
- Events already carrying a valid SeatGeek URL: 3753
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3752
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2274
- Eligible (upcoming, resolvable local date) after pre-API filtering: 54
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 3 of 3 (key 20780)
- Runs needed to check every eligible event once: 3
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
- 3753 event(s) already carried valid SeatGeek URLs before this run, including 3752 enrichment-eligible event(s).
- This run queried only the 2274 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-matchbox-twenty-2027-charleston-g5evz_flnltwd | Matchbox Twenty | 2027-08-07 | Charleston | https://seatgeek.com/matchbox-twenty-tickets/charleston-south-carolina-credit-one-stadium-2027-08-07-7-30-pm/concert/18675186 |
| tm-matchbox-twenty-2027-raleigh-g5evz_fkt4tju | Matchbox Twenty | 2027-08-08 | Raleigh | https://seatgeek.com/matchbox-twenty-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-08-08-7-30-pm/concert/18675188 |
| tm-matchbox-twenty-2027-cuyahoga-falls-vv1aazk4agkd8bynd | Matchbox Twenty | 2027-08-11 | Cuyahoga Falls | https://seatgeek.com/matchbox-twenty-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-08-11-7-30-pm/concert/18675192 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-matchbox-twenty-2027-grand-rapids-vv1afzk46gkdo46mj | Matchbox Twenty | 2027-08-12 | Grand Rapids | conflicting_same_date_city_candidates | https://seatgeek.com/matchbox-twenty-tickets/grand-rapids-michigan-acrisure-amphitheater-2027-08-12-7-30-pm/concert/18675193 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-matchbox-twenty-2027-grand-rapids-vv1afzk46gkdo46mj (Matchbox Twenty, 2027-08-12, Grand Rapids)
  - 100: https://seatgeek.com/matchbox-twenty-tickets/grand-rapids-michigan-acrisure-amphitheater-2027-08-12-6-30-pm/concert/18835531

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
