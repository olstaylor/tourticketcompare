# SeatGeek CTA auto-add log

Generated: 2026-11-18T19:11:04.705Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5781
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5781
- Events already carrying a valid SeatGeek URL: 3206
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3206
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2575
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20775)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 5
- Events skipped: 2
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1
- no_candidates_returned: 1

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3206 event(s) already carried valid SeatGeek URLs before this run, including 3206 enrichment-eligible event(s).
- This run queried only the 2575 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-travis-tritt-2027-new-haven-1kaovpq_ga2h4m9 | Travis Tritt | 2027-07-31 | New Haven | https://seatgeek.com/travis-tritt-tickets/new-haven-kentucky-the-amp-at-log-still-2027-07-31-7-15-pm/concert/18757687 |
| tm-travis-tritt-2027-gary-vv1aazk4tgkewapoq | Travis Tritt | 2027-08-14 | Gary | https://seatgeek.com/travis-tritt-tickets/gary-indiana-hard-rock-live-northern-indiana-2027-08-14-7-pm/concert/18757703 |
| tm-travis-tritt-2027-kansas-city-vv1akzk4jgkdb4gal | Travis Tritt | 2027-09-11 | Kansas City | https://seatgeek.com/travis-tritt-tickets/kansas-city-missouri-ameristar-casino-hotel-kansas-city-2027-09-11-8-30-pm/concert/18756203 |
| tm-travis-tritt-2027-nashville-vv1aazk4jgke0bm2- | Travis Tritt | 2027-09-30 | Nashville | https://seatgeek.com/travis-tritt-tickets/nashville-indiana-brown-county-music-center-2027-09-30-8-pm/concert/18757416 |
| tm-travis-tritt-2027-mount-pleasant-z7r9jz1aaaark | Travis Tritt | 2027-10-01 | Mount Pleasant | https://seatgeek.com/travis-tritt-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-10-01-8-pm/concert/18758683 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-travis-tritt-2027-saint-louis-1a-zk4igkdyooqa | Travis Tritt | 2027-09-10 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/travis-tritt-tickets/chesterfield-missouri-the-factory-stl-2027-09-10-8-pm/concert/18757697 |
| tm-travis-tritt-2027-lake-charles-z7r9jz1aaaajp | Travis Tritt | 2027-10-09 | Lake Charles | no_candidates_returned | - |

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
