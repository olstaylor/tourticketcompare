# SeatGeek CTA auto-add log

Generated: 2026-11-16T20:47:00.830Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5639
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5639
- Events already carrying a valid SeatGeek URL: 3129
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3129
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2510
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20773)
- Runs needed to check every eligible event once: 2
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
- 3129 event(s) already carried valid SeatGeek URLs before this run, including 3129 enrichment-eligible event(s).
- This run queried only the 2510 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-intocable-2026-hidalgo-g5diz_fw-zu9f | Intocable | 2026-11-28 | Hidalgo | https://seatgeek.com/intocable-tickets/hidalgo-texas-payne-arena-2026-11-28-8-pm/concert/18176203 |

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
