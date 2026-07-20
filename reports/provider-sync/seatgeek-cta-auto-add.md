# SeatGeek CTA auto-add log

Generated: 2026-07-20T08:14:06.137Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 402
- Ticketmaster-verified events: 301
- Events already carrying a valid SeatGeek URL: 249
- Ticketmaster-verified events already carrying a valid SeatGeek URL: 188
- Ticketmaster-verified events still missing a valid SeatGeek URL before this run: 113
- Events selected/logged by this run: 31
- Events checked by this run: 30
- API calls made: 150
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 31
- no_candidates_returned: 30
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-bad-bunny-2026-d-sseldorf-653946928
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --max-api-calls 150 --resume-from 'tm-bad-bunny-2026-d-sseldorf-653946928'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 30
- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 249 event(s) already carried valid SeatGeek URLs before this run, including 188 Ticketmaster-verified event(s).
- This run queried only the 113 Ticketmaster-verified event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the Ticketmaster-verified events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | Morgan Wallen | 2026-05-08 | Indianapolis | no_candidates_returned | - |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | Morgan Wallen | 2026-05-09 | Indianapolis | no_candidates_returned | - |
| tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | Ariana Grande | 2026-07-12 | Brooklyn | no_candidates_returned | - |
| tm-ariana-grande-2026-brooklyn-30006319f34a4abb | Ariana Grande | 2026-07-13 | Brooklyn | no_candidates_returned | - |
| tm-ariana-grande-2026-brooklyn-30006319f41b4abf | Ariana Grande | 2026-07-16 | Brooklyn | no_candidates_returned | - |
| tm-ariana-grande-2026-boston-0100631aaef23ee8 | Ariana Grande | 2026-07-22 | Boston | no_candidates_returned | - |
| tm-ariana-grande-2026-boston-0100631aca626435 | Ariana Grande | 2026-07-24 | Boston | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c8ea13055 | Ariana Grande | 2026-08-15 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c937630fa | Ariana Grande | 2026-08-16 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c950d310b | Ariana Grande | 2026-08-19 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c97193144 | Ariana Grande | 2026-08-20 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c98a031b3 | Ariana Grande | 2026-08-23 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4e94ebb | Ariana Grande | 2026-08-24 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | Ariana Grande | 2026-08-27 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f5075024 | Ariana Grande | 2026-08-28 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | Ariana Grande | 2026-08-31 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f50f50d8 | Ariana Grande | 2026-09-01 | London | no_candidates_returned | - |
| tm-bad-bunny-2026-barcelona-653666176 | Bad Bunny | 2026-05-22 | Barcelona | no_candidates_returned | - |
| tm-bad-bunny-2026-barcelona-1116290311 | Bad Bunny | 2026-05-23 | Barcelona | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-417009905 | Bad Bunny | 2026-05-30 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1848567714 | Bad Bunny | 2026-05-31 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1589736692 | Bad Bunny | 2026-06-02 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-961888291 | Bad Bunny | 2026-06-03 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1852247887 | Bad Bunny | 2026-06-06 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1341715816 | Bad Bunny | 2026-06-07 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-412370092 | Bad Bunny | 2026-06-10 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-2035589996 | Bad Bunny | 2026-06-11 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1378879656 | Bad Bunny | 2026-06-14 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1566404077 | Bad Bunny | 2026-06-15 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | Bad Bunny | 2026-06-20 | Düsseldorf | no_candidates_returned | - |
| tm-bad-bunny-2026-d-sseldorf-653946928 | Bad Bunny | 2026-06-21 | Düsseldorf | api_call_limit_not_checked | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None
