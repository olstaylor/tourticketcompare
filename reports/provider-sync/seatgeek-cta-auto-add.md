# SeatGeek CTA auto-add log

Generated: 2026-10-28T16:59:21.893Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4352
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4352
- Events already carrying a valid SeatGeek URL: 2475
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2475
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1877
- Eligible (upcoming, resolvable local date) after pre-API filtering: 24
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20754)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 5
- Events skipped: 5
- no_candidates_returned: 5
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-bryan-adams-2027-wellington-central-1ae8z_fgkxwzsx6
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'bryan-adams' --max-api-calls 50 --resume-from 'tm-bryan-adams-2027-wellington-central-1ae8z_fgkxwzsx6'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 5

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2475 event(s) already carried valid SeatGeek URLs before this run, including 2475 enrichment-eligible event(s).
- This run queried only the 1877 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mrffoe | Bryan Adams | 2026-10-28 | Las Vegas | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-28-8-pm/concert/18424321 |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | Bryan Adams | 2026-10-29 | Las Vegas | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-29-8-pm/concert/18424320 |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | Bryan Adams | 2026-10-30 | Las Vegas | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-30-8-pm/concert/18424322 |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | Bryan Adams | 2026-10-31 | Las Vegas | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-31-8-pm/concert/18424324 |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr5fkv | Bryan Adams | 2026-11-01 | Las Vegas | https://seatgeek.com/bryan-adams-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-01-8-pm/concert/18424326 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | Bryan Adams | 2026-12-13 | Praha 9 | no_candidates_returned | - |
| tm-bryan-adams-2027-brescia-zg9rmiynyzffda | Bryan Adams | 2027-01-31 | Brescia | no_candidates_returned | - |
| tm-bryan-adams-2027-padova-zg9rmiynyzffdv | Bryan Adams | 2027-02-05 | Padova | no_candidates_returned | - |
| tm-bryan-adams-2027-auckland-17azv0g6cjvbo_i | Bryan Adams | 2027-03-10 | Auckland | no_candidates_returned | - |
| tm-bryan-adams-2027-christchurch-17azv0g6cuuuvxf | Bryan Adams | 2027-03-12 | Christchurch | no_candidates_returned | - |

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

Generated: 2026-10-28T16:56:10.689Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4295
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4295
- Events already carrying a valid SeatGeek URL: 2460
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2460
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1835
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20754)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 2
- Events skipped: 3
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 2

## Skipped reasons

- no_candidates_returned: 1
- conflicting_same_date_city_candidates: 2

## Interpretation

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2460 event(s) already carried valid SeatGeek URLs before this run, including 2460 enrichment-eligible event(s).
- This run queried only the 1835 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-illenium-2027-san-francisco-g5vyz_kuqzndv | ILLENIUM | 2027-01-01 | San Francisco | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2027-01-01-8-pm/concert/18723868 |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | ILLENIUM | 2026-12-19 | Las Vegas | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | ILLENIUM | 2026-10-30 | Las Vegas | no_candidates_returned | - |
| tm-illenium-2026-san-francisco-g5vyz_kj0ltb6 | ILLENIUM | 2026-12-30 | San Francisco | conflicting_same_date_city_candidates | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-30-8-pm/concert/18621412 |
| tm-illenium-2027-san-francisco-g5vyz_kjpaqe2 | ILLENIUM | 2026-12-31 | San Francisco | conflicting_same_date_city_candidates | https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-31-8-pm/concert/18621414 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-illenium-2026-san-francisco-g5vyz_kj0ltb6 (ILLENIUM, 2026-12-30, San Francisco)
  - 100: https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-30-8-pm/concert/18620724
- tm-illenium-2027-san-francisco-g5vyz_kjpaqe2 (ILLENIUM, 2026-12-31, San Francisco)
  - 100: https://seatgeek.com/illenium-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-12-31-8-pm/concert/18620692

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-28T16:58:17.994Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4328
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4328
- Events already carrying a valid SeatGeek URL: 2470
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2470
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1858
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20754)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-james-blunt-2027-london-1agzkf6gkdpobqq
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'james-blunt' --max-api-calls 50 --resume-from 'tm-james-blunt-2027-london-1agzkf6gkdpobqq'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2470 event(s) already carried valid SeatGeek URLs before this run, including 2470 enrichment-eligible event(s).
- This run queried only the 1858 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | James Blunt | 2027-02-19 | Forest (Brussels) | no_candidates_returned | - |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | James Blunt | 2027-03-05 | Praha 9 | no_candidates_returned | - |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | James Blunt | 2027-03-16 | Oslo | no_candidates_returned | - |
| tm-james-blunt-2027-leeds-g5vhz_8rglm2f | James Blunt | 2027-03-26 | Leeds | no_candidates_returned | - |
| tm-james-blunt-2027-birmingham-16nzkfo03zag7vec | James Blunt | 2027-03-27 | Birmingham | no_candidates_returned | - |
| tm-james-blunt-2027-newcastle-upon-tyne-g5vhz_8jzh5mu | James Blunt | 2027-03-28 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-james-blunt-2027-dublin-16bzkf7x3zaufauu | James Blunt | 2027-03-30 | Dublin | no_candidates_returned | - |
| tm-james-blunt-2027-belfast-16doz_oxog7v-fd | James Blunt | 2027-03-31 | Belfast | no_candidates_returned | - |
| tm-james-blunt-2027-glasgow-1auzkfkgkdju5kw | James Blunt | 2027-04-02 | Glasgow | no_candidates_returned | - |
| tm-james-blunt-2027-manchester-1amzkfkgkdv2srk | James Blunt | 2027-04-03 | Manchester | no_candidates_returned | - |

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

Generated: 2026-10-28T16:57:15.172Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4314
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4314
- Events already carrying a valid SeatGeek URL: 2470
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2470
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1844
- Eligible (upcoming, resolvable local date) after pre-API filtering: 19
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20754)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'lola-young' --max-api-calls 50 --resume-from 'tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb'
- Accepted venue mismatches: 2
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2470 event(s) already carried valid SeatGeek URLs before this run, including 2470 enrichment-eligible event(s).
- This run queried only the 1844 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | Lola Young | 2027-04-06 | Nashville | https://seatgeek.com/lola-young-tickets/nashville-tennessee-the-pinnacle-nashville-2027-04-06-8-pm/concert/18649730 |
| tm-lola-young-2027-atlanta-vvg1zz_f7qhai6 | Lola Young | 2027-04-07 | Atlanta | https://seatgeek.com/lola-young-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-04-07-8-pm/concert/18649708 |
| tm-lola-young-2027-washington-1a4zk4egkeystl8 | Lola Young | 2027-04-09 | Washington | https://seatgeek.com/lola-young-tickets/washington-district-of-columbia-the-anthem-dc-2027-04-09-8-pm/concert/18649706 |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | Lola Young | 2027-04-10 | Philadelphia | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | Lola Young | 2027-04-12 | New York | https://seatgeek.com/lola-young-tickets/new-york-new-york-radio-city-music-hall-2027-04-12-8-pm/concert/18649709 |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | Lola Young | 2027-04-13 | Boston | https://seatgeek.com/lola-young-tickets/boston-massachusetts-roadrunner-boston-2027-04-13-8-pm/concert/18649732 |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | Lola Young | 2027-04-15 | Toronto | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-15-8-pm/concert/18649734 |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | Lola Young | 2027-04-16 | Toronto | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-16-8-pm/concert/18649736 |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | Lola Young | 2027-04-18 | Detroit | https://seatgeek.com/lola-young-tickets/detroit-michigan-the-fillmore-detroit-2027-04-18-8-pm/concert/18649711 |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | Lola Young | 2027-04-20 | Chicago | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-20-7-30-pm/concert/18649710 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | The Pinnacle - TN | The Pinnacle - Nashville | https://seatgeek.com/lola-young-tickets/nashville-tennessee-the-pinnacle-nashville-2027-04-06-8-pm/concert/18649730 |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | The Met Presented by Highmark | The Met Philadelphia | https://seatgeek.com/lola-young-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-10-8-pm/concert/18649707 |

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

Generated: 2026-10-28T17:00:25.964Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4363
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4363
- Events already carrying a valid SeatGeek URL: 2475
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2475
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1888
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20754)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'megadeth' --max-api-calls 50 --resume-from 'tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2475 event(s) already carried valid SeatGeek URLs before this run, including 2475 enrichment-eligible event(s).
- This run queried only the 1888 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-megadeth-2027-belfast-17czv0g62pvlvd8 | Megadeth | 2027-03-09 | Belfast | no_candidates_returned | - |
| tm-megadeth-2027-london-17uyv0g62ffnale | Megadeth | 2027-03-11 | London | no_candidates_returned | - |
| tm-megadeth-2027-nottingham-17u8v0g62r_1dp- | Megadeth | 2027-03-12 | Nottingham | no_candidates_returned | - |
| tm-megadeth-2027-manchester-17uyv0g62wxq-cs | Megadeth | 2027-03-13 | Manchester | no_candidates_returned | - |
| tm-megadeth-2027-cardiff-17uov0g62hgl_w2 | Megadeth | 2027-03-15 | Cardiff | no_candidates_returned | - |
| tm-megadeth-2027-glasgow-17uov0g62mgifrs | Megadeth | 2027-03-16 | Glasgow | no_candidates_returned | - |
| tm-megadeth-2027-birmingham-17fyv0g62qpke7_ | Megadeth | 2027-03-18 | Birmingham | no_candidates_returned | - |
| tm-megadeth-2027-leeds-g5vhz_2hqzflr | Megadeth | 2027-03-19 | Leeds | no_candidates_returned | - |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | Megadeth | 2027-03-23 | Forest (Brussels) | no_candidates_returned | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | Megadeth | 2027-03-25 | Düsseldorf | no_candidates_returned | - |

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

Generated: 2026-10-28T17:01:29.400Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4380
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4380
- Events already carrying a valid SeatGeek URL: 2484
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2484
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1896
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20754)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-simple-plan-2027-kingston-1a8zk4vgkdbqsjy
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'simple-plan' --max-api-calls 50 --resume-from 'tm-simple-plan-2027-kingston-1a8zk4vgkdbqsjy'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2484 event(s) already carried valid SeatGeek URLs before this run, including 2484 enrichment-eligible event(s).
- This run queried only the 1896 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | Simple Plan | 2026-12-19 | Niagara Falls | https://seatgeek.com/simple-plan-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2026-12-19-8-pm/concert/18207565 |
| tm-simple-plan-2027-vancouver-16v7z_f1bg7wmex | Simple Plan | 2027-01-27 | Vancouver | https://seatgeek.com/simple-plan-tickets/vancouver-canada-rogers-arena-2027-01-27-6-pm/concert/18655536 |
| tm-simple-plan-2027-edmonton-1av7z_kgkmptc0p | Simple Plan | 2027-01-29 | Edmonton | https://seatgeek.com/simple-plan-tickets/edmonton-canada-rogers-place-2027-01-29-6-pm/concert/18656777 |
| tm-simple-plan-2027-calgary-1av7z_kgkd2pi5n | Simple Plan | 2027-01-31 | Calgary | https://seatgeek.com/simple-plan-tickets/calgary-canada-scotiabank-saddledome-2027-01-31-6-pm/concert/18655725 |
| tm-simple-plan-2027-saskatoon-1av7z_kgkmkzc1- | Simple Plan | 2027-02-01 | Saskatoon | https://seatgeek.com/simple-plan-tickets/saskatoon-canada-sasktel-centre-2027-02-01-7-pm/concert/18655541 |
| tm-simple-plan-2027-winnipeg-16ozk4eozza27k28 | Simple Plan | 2027-02-02 | Winnipeg | https://seatgeek.com/simple-plan-tickets/winnipeg-canada-canada-life-centre-2027-02-02-7-pm/concert/18655545 |
| tm-simple-plan-2027-toronto-1a8zk4e0eqizeug | Simple Plan | 2027-02-05 | Toronto | https://seatgeek.com/simple-plan-tickets/toronto-canada-scotiabank-arena-2027-02-05-7-pm/concert/18655543 |
| tm-simple-plan-2027-kitchener-1a8zk4agketqbtj | Simple Plan | 2027-02-06 | Kitchener | https://seatgeek.com/simple-plan-tickets/kitchener-canada-kitchener-memorial-auditorium-complex-2027-02-06-7-pm/concert/18655730 |
| tm-simple-plan-2027-london-1f7zvp8wqzz7ufv6 | Simple Plan | 2027-02-07 | London | https://seatgeek.com/simple-plan-tickets/london-canada-canada-life-place-2027-02-07-7-pm/concert/18655528 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | Simple Plan | 2027-01-27 | Victoria | city_or_metro_match_failed | https://seatgeek.com/simple-plan-tickets/vancouver-canada-rogers-arena-2027-01-27-6-pm/concert/18655536 |

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

Generated: 2026-10-28T17:02:32.572Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4399
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4399
- Events already carrying a valid SeatGeek URL: 2484
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2484
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1915
- Eligible (upcoming, resolvable local date) after pre-API filtering: 19
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20754)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-simply-red-2027-halifax-15dfz_3r_jv8z
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'simply-red' --max-api-calls 50 --resume-from 'tm-simply-red-2027-halifax-15dfz_3r_jv8z'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2484 event(s) already carried valid SeatGeek URLs before this run, including 2484 enrichment-eligible event(s).
- This run queried only the 1915 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | Simply Red | 2027-06-19 | Amsterdam | no_candidates_returned | - |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | Simply Red | 2027-06-20 | Amsterdam | no_candidates_returned | - |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | Simply Red | 2027-06-22 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-simply-red-2027-nurnberg-z698xzc2z16v0aozkf | Simply Red | 2027-06-29 | Nürnberg | no_candidates_returned | - |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | Simply Red | 2027-06-30 | Fulda | no_candidates_returned | - |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | Simply Red | 2027-07-02 | Aurich | no_candidates_returned | - |
| tm-simply-red-2027-hemer-z698xzc2z16v_nfy_4 | Simply Red | 2027-07-03 | Hemer | no_candidates_returned | - |
| tm-simply-red-2027-bonn-z698xzc2z1kpoq9-n | Simply Red | 2027-07-07 | Bonn | no_candidates_returned | - |
| tm-simply-red-2027-halle-westfalen-z698xzc2z1kj7akbg | Simply Red | 2027-07-09 | Halle (Westfalen) | no_candidates_returned | - |
| tm-simply-red-2027-chester-1agzkfsgkduxpco | Simply Red | 2027-08-07 | Chester | no_candidates_returned | - |

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

Generated: 2026-10-28T16:55:37.633Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4290
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4290
- Events already carrying a valid SeatGeek URL: 2458
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2458
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1832
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20754)
- Runs needed to check every eligible event once: 1
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
- 2458 event(s) already carried valid SeatGeek URLs before this run, including 2458 enrichment-eligible event(s).
- This run queried only the 1832 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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
