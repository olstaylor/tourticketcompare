# SeatGeek CTA auto-add log

Generated: 2026-05-13T20:51:58.658Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Events selected/logged: 3
- Events checked: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 1
- Events skipped: 2
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-harry-styles-2026-new-york-3b006435047f81c1
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --limit 3 --max-api-calls 15 --verbose --resume-from 'tm-harry-styles-2026-new-york-3b006435047f81c1'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 2

## URLs added

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-harry-styles-2026-new-york-3b006435046481aa | Harry Styles | 2026-08-29 | New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-29-8-pm/concert/18027092 |

## Events skipped

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | Morgan Wallen | 2026-05-08 | Indianapolis | no_candidates_returned | - |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | Morgan Wallen | 2026-05-09 | Indianapolis | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None
