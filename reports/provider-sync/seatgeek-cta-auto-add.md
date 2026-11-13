# SeatGeek CTA auto-add log

Generated: 2026-11-13T18:10:56.743Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5492
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5492
- Events already carrying a valid SeatGeek URL: 3073
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3073
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2419
- Eligible (upcoming, resolvable local date) after pre-API filtering: 25
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20770)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 2
- Events skipped: 8
- no_candidates_returned: 4
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-kpop-demon-hunters-2027-dublin-1avoz_pgksg3dqw
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'kpop-demon-hunters' --max-api-calls 50 --resume-from 'tm-kpop-demon-hunters-2027-dublin-1avoz_pgksg3dqw'
- Accepted venue mismatches: 0
- Conflicts found: 4

## Skipped reasons

- conflicting_same_date_city_candidates: 4
- no_candidates_returned: 4

## Interpretation

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3073 event(s) already carried valid SeatGeek URLs before this run, including 3073 enrichment-eligible event(s).
- This run queried only the 2419 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqm-6ap | KPop Demon Hunters | 2027-07-20 | Dallas | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-20-7-30-pm/concert/18772702 |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqmd65i | KPop Demon Hunters | 2027-07-21 | Dallas | https://seatgeek.com/kpop-demon-hunters-tickets/dallas-texas-american-airlines-center-2027-07-21-7-30-pm/concert/18772728 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu | KPop Demon Hunters | 2027-07-10 | Atlanta | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/atlanta-georgia-state-farm-arena-1-2027-07-10-2-pm/concert/18772692 |
| tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 | KPop Demon Hunters | 2027-07-17 | Orlando | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-7-30-pm/concert/18772697 |
| tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 | KPop Demon Hunters | 2027-07-24 | Phoenix | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-7-30-pm/concert/18772701 |
| tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih | KPop Demon Hunters | 2027-08-14 | Tacoma | conflicting_same_date_city_candidates | https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-2-pm/concert/18772720 |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz16v0ozyff | KPop Demon Hunters | 2027-09-08 | Amsterdam | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz1krbj60f | KPop Demon Hunters | 2027-09-09 | Amsterdam | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-fornebu-z698xzb_z1k-p0apk | KPop Demon Hunters | 2027-09-25 | Fornebu | no_candidates_returned | - |
| tm-kpop-demon-hunters-2027-brussels-z698xzg2z1kup-z3o | KPop Demon Hunters | 2027-10-02 | Brussels | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu (KPop Demon Hunters, 2027-07-10, Atlanta)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/atlanta-georgia-state-farm-arena-1-2027-07-10-7-30-pm/concert/18772694
- tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 (KPop Demon Hunters, 2027-07-17, Orlando)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/orlando-florida-kia-center-2027-07-17-1-pm/concert/18772696
- tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 (KPop Demon Hunters, 2027-07-24, Phoenix)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/phoenix-arizona-mortgage-matchup-center-2027-07-24-2-pm/concert/18772699
- tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih (KPop Demon Hunters, 2027-08-14, Tacoma)
  - 100: https://seatgeek.com/kpop-demon-hunters-tickets/tacoma-washington-tacoma-dome-2027-08-14-7-30-pm/concert/18772721

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-11-13T18:12:01.399Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5502
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5502
- Events already carrying a valid SeatGeek URL: 3083
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3083
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2419
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20770)
- Runs needed to check every eligible event once: 1
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
- 3083 event(s) already carried valid SeatGeek URLs before this run, including 3083 enrichment-eligible event(s).
- This run queried only the 2419 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-rankin-family-2027-edmonton-1k78vpbmga2hetj | The Rankin Family | 2027-03-12 | Edmonton | https://seatgeek.com/the-rankin-family-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-03-12-7-30-pm/concert/18761493 |
| tm-the-rankin-family-2027-calgary-1k78vpbmgac53nm | The Rankin Family | 2027-03-13 | Calgary | https://seatgeek.com/the-rankin-family-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-13-7-30-pm/concert/18761494 |
| tm-the-rankin-family-2027-winnipeg-1aozk4ngkerkp1s | The Rankin Family | 2027-03-15 | Winnipeg | https://seatgeek.com/the-rankin-family-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-15-7-30-pm/concert/18761503 |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | The Rankin Family | 2027-03-17 | Thunder Bay | https://seatgeek.com/the-rankin-family-tickets/thunder-bay-canada-thunder-bay-community-auditorium-2027-03-17-7-30-pm/concert/18761505 |
| tm-the-rankin-family-2027-ottawa-1aszk4ngkdjouzs | The Rankin Family | 2027-03-24 | Ottawa | https://seatgeek.com/the-rankin-family-tickets/ottawa-canada-national-arts-centre-2027-03-24-7-30-pm/concert/18761508 |
| tm-the-rankin-family-2027-niagara-falls-1a8zk40gkdzuhrm | The Rankin Family | 2027-03-27 | Niagara Falls | https://seatgeek.com/the-rankin-family-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-03-27-8-pm/concert/18761514 |
| tm-the-rankin-family-2027-montreal-1aszk40gkdkmkar | The Rankin Family | 2027-03-29 | Montreal | https://seatgeek.com/the-rankin-family-tickets/montreal-canada-beanfield-theatre-2027-03-29-7-30-pm/concert/18761516 |
| tm-the-rankin-family-2027-moncton-1aszk4pgkeuypli | The Rankin Family | 2027-03-30 | Moncton | https://seatgeek.com/the-rankin-family-tickets/moncton-canada-molson-canadian-centre-at-casino-new-brunswick-2027-03-30-7-30-pm/concert/18761517 |
| tm-the-rankin-family-2027-halifax-16szk4poezacdevv | The Rankin Family | 2027-04-01 | Halifax | https://seatgeek.com/the-rankin-family-tickets/halifax-canada-scotiabank-centre-2027-04-01-7-30-pm/concert/18761518 |
| tm-the-rankin-family-2027-sydney-1aszk4pgkd5nkwf | The Rankin Family | 2027-04-03 | Sydney | https://seatgeek.com/the-rankin-family-tickets/sydney-canada-centre-200-2027-04-03-7-pm/concert/18761519 |

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
