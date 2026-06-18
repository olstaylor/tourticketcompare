# SeatGeek CTA auto-add log

Generated: 2026-06-18T18:35:04.293Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 400
- Ticketmaster-verified events: 265
- Events already carrying a valid SeatGeek URL: 234
- Ticketmaster-verified events already carrying a valid SeatGeek URL: 178
- Ticketmaster-verified events still missing a valid SeatGeek URL before this run: 87
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
- 234 event(s) already carried valid SeatGeek URLs before this run, including 178 Ticketmaster-verified event(s).
- This run queried only the 87 Ticketmaster-verified event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the Ticketmaster-verified events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None
