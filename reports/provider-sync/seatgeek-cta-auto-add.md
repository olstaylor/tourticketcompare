# SeatGeek CTA auto-add log

Generated: 2026-11-17T19:31:13.045Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5673
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5673
- Events already carrying a valid SeatGeek URL: 3166
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3166
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2507
- Eligible (upcoming, resolvable local date) after pre-API filtering: 34
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 4 (key 20774)
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
- Next resume showId: tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'jhene-aiko' --max-api-calls 50 --resume-from 'tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3166 event(s) already carried valid SeatGeek URLs before this run, including 3166 enrichment-eligible event(s).
- This run queried only the 2507 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jhene-aiko-2027-memphis-g5viz_pwsyuuc | Jhene Aiko | 2027-04-16 | Memphis | https://seatgeek.com/jhene-aiko-tickets/memphis-tennessee-fedexforum-2027-04-16-7-30-pm/concert/18783894 |
| tm-jhene-aiko-2027-new-orleans-g5viz_pu7vuyk | Jhene Aiko | 2027-04-17 | New Orleans | https://seatgeek.com/jhene-aiko-tickets/new-orleans-louisiana-smoothie-king-center-2027-04-17-7-30-pm/concert/18783895 |
| tm-jhene-aiko-2027-fort-worth-vvg1yz_pgce3dm | Jhene Aiko | 2027-04-20 | Fort Worth | https://seatgeek.com/jhene-aiko-tickets/fort-worth-texas-ariat-arena-2027-04-20-7-30-pm/concert/18783899 |
| tm-jhene-aiko-2027-austin-g5diz_pvhlinm | Jhene Aiko | 2027-04-22 | Austin | https://seatgeek.com/jhene-aiko-tickets/austin-texas-moody-center-atx-2027-04-22-7-30-pm/concert/18783901 |
| tm-jhene-aiko-2027-denver-g5vzz_pu930ac | Jhene Aiko | 2027-04-27 | Denver | https://seatgeek.com/jhene-aiko-tickets/denver-colorado-ball-arena-2027-04-27-7-30-pm/concert/18783903 |
| tm-jhene-aiko-2027-phoenix-1av0z_pgkmb6tzk | Jhene Aiko | 2027-04-29 | Phoenix | https://seatgeek.com/jhene-aiko-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-29-7-30-pm/concert/18783904 |
| tm-jhene-aiko-2027-anaheim-vv170z_pgks682ex | Jhene Aiko | 2027-05-01 | Anaheim | https://seatgeek.com/jhene-aiko-tickets/anaheim-california-honda-center-2027-05-01-7-30-pm/concert/18783907 |
| tm-jhene-aiko-2027-san-francisco-g5vyz_plmqsld | Jhene Aiko | 2027-05-07 | San Francisco | https://seatgeek.com/jhene-aiko-tickets/san-francisco-california-chase-center-2027-05-07-7-30-pm/concert/18783908 |
| tm-jhene-aiko-2027-sacramento-g5vyz_psayvgp | Jhene Aiko | 2027-05-09 | Sacramento | https://seatgeek.com/jhene-aiko-tickets/sacramento-california-golden-1-center-2027-05-09-7-30-pm/concert/18783909 |
| tm-jhene-aiko-2027-portland-vvg1hz_pr1sldf | Jhene Aiko | 2027-05-12 | Portland | https://seatgeek.com/jhene-aiko-tickets/portland-oregon-moda-center-2027-05-12-7-30-pm/concert/18783913 |

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
