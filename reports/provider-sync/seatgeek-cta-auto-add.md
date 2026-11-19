# SeatGeek CTA auto-add log

Generated: 2026-11-19T19:17:12.670Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5830
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5830
- Events already carrying a valid SeatGeek URL: 3263
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3263
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2567
- Eligible (upcoming, resolvable local date) after pre-API filtering: 49
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 5 (key 20776)
- Runs needed to check every eligible event once: 5
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-grace-potter-2027-grand-rapids-z7r9jz1aaa64j
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'grace-potter' --max-api-calls 50 --resume-from 'tm-grace-potter-2027-grand-rapids-z7r9jz1aaa64j'
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3263 event(s) already carried valid SeatGeek URLs before this run, including 3263 enrichment-eligible event(s).
- This run queried only the 2567 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Grace Potter | 2027-01-24 | Patchogue | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |
| tm-grace-potter-2027-hershey-vv1aezk4jgkdhztfh | Grace Potter | 2027-01-27 | Hershey | https://seatgeek.com/grace-potter-the-nocturnals-tickets/hershey-pennsylvania-hershey-theatre-hershey-2027-01-27-7-30-pm/concert/18755509 |
| tm-grace-potter-2027-wilkes-barre-vv1kfz_px4g7sfow | Grace Potter | 2027-01-28 | Wilkes Barre | https://seatgeek.com/grace-potter-the-nocturnals-tickets/wilkes-barre-pennsylvania-f-m-kirby-center-2027-01-28-7-30-pm/concert/18755510 |
| tm-grace-potter-2027-bensalem-z7r9jz1aaak_n | Grace Potter | 2027-01-29 | Bensalem | https://seatgeek.com/grace-potter-the-nocturnals-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2027-01-29-7-30-pm/concert/18755511 |
| tm-grace-potter-2027-washington-1a4zk4jgkey_jxg | Grace Potter | 2027-01-30 | Washington | https://seatgeek.com/grace-potter-the-nocturnals-tickets/washington-district-of-columbia-the-anthem-dc-2027-01-30-7-30-pm/concert/18755517 |
| tm-grace-potter-2027-cleveland-z7r9jz1aaak_0 | Grace Potter | 2027-01-31 | Cleveland | https://seatgeek.com/grace-potter-the-nocturnals-tickets/cleveland-ohio-globe-iron-2027-01-31-7-30-pm/concert/18755519 |
| tm-grace-potter-2027-lexington-1apzk4tgkd-mqay | Grace Potter | 2027-02-03 | Lexington | https://seatgeek.com/grace-potter-the-nocturnals-tickets/lexington-kentucky-the-rail-3-2027-02-03-8-pm/concert/18755520 |
| tm-grace-potter-2027-indianapolis-vv1aazk4jgkei1ehm | Grace Potter | 2027-02-05 | Indianapolis | https://seatgeek.com/grace-potter-the-nocturnals-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-02-05-8-pm/concert/18755524 |
| tm-grace-potter-2027-cincinnati-1apzk4igkdfr9ax | Grace Potter | 2027-02-06 | Cincinnati | https://seatgeek.com/grace-potter-the-nocturnals-tickets/cincinnati-ohio-taft-theatre-2027-02-06-8-pm/concert/18755525 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-grace-potter-2027-saint-louis-vv1kbz_pq9g7dnzn | Grace Potter | 2027-02-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/grace-potter-the-nocturnals-tickets/st-louis-missouri-the-pageant-st-louis-2027-02-04-8-pm/concert/18755522 |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Patchogue Theater | Patchogue Theatre for the Performing Arts | https://seatgeek.com/grace-potter-the-nocturnals-tickets/patchogue-new-york-patchogue-theatre-for-the-performing-arts-2027-01-24-7-pm/concert/18755508 |

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

Generated: 2026-11-19T19:18:19.354Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5841
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5841
- Events already carrying a valid SeatGeek URL: 3273
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3273
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2568
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20776)
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
- Next resume showId: tm-hannah-harper-2027-effingham-vv1kjz_p3eg7ds0b
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'hannah-harper' --max-api-calls 50 --resume-from 'tm-hannah-harper-2027-effingham-vv1kjz_p3eg7ds0b'
- Accepted venue mismatches: 2
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3273 event(s) already carried valid SeatGeek URLs before this run, including 3273 enrichment-eligible event(s).
- This run queried only the 2568 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-hannah-harper-2027-bloomington-vv1kvyvp_igaglezi | Hannah Harper | 2027-02-05 | Bloomington | https://seatgeek.com/hannah-harper-tickets/bloomington-illinois-bloomington-center-for-the-performing-arts-2027-02-05-7-pm/concert/18754636 |
| tm-hannah-harper-2027-anderson-vv17fz_pgkcrhw1m | Hannah Harper | 2027-03-04 | Anderson | https://seatgeek.com/hannah-harper-tickets/anderson-indiana-paramount-theatre-anderson-2027-03-04-7-pm/concert/18759208 |
| tm-hannah-harper-2027-danville-vv1a8vpqoga2gqoh | Hannah Harper | 2027-03-06 | Danville | https://seatgeek.com/hannah-harper-tickets/danville-virginia-the-pantheon-at-caesars-virginia-2027-03-06-8-pm/concert/18757846 |
| tm-hannah-harper-2027-philadelphia-g5viz_4q8cis7 | Hannah Harper | 2027-04-02 | Philadelphia | https://seatgeek.com/hannah-harper-tickets/philadelphia-mississippi-ellis-theater-1-2027-04-02-7-30-pm/concert/18750207 |
| tm-hannah-harper-2027-huntsville-1aozk4jgkdjcgyp | Hannah Harper | 2027-04-03 | Huntsville | https://seatgeek.com/hannah-harper-tickets/huntsville-alabama-vbc-mars-music-hall-2027-04-03-7-30-pm/concert/18754832 |
| tm-hannah-harper-2027-greensboro-g5evz_4u2tplb | Hannah Harper | 2027-04-30 | Greensboro | https://seatgeek.com/hannah-harper-tickets/greensboro-north-carolina-piedmont-hall-1-2027-04-30-7-30-pm/concert/18754873 |
| tm-hannah-harper-2027-charlotte-g5evz_4bybnb7 | Hannah Harper | 2027-05-02 | Charlotte | https://seatgeek.com/hannah-harper-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-05-02-7-30-pm/concert/18754499 |
| tm-hannah-harper-2027-jim-thorpe-vv1aezk4jgkdldw-w | Hannah Harper | 2027-05-08 | Jim Thorpe | https://seatgeek.com/hannah-harper-tickets/jim-thorpe-pennsylvania-penns-peak-2027-05-08-8-pm/concert/18754371 |
| tm-hannah-harper-2027-valparaiso-vv17jz_fgkiiacxj | Hannah Harper | 2027-05-15 | Valparaiso | https://seatgeek.com/hannah-harper-tickets/valparaiso-indiana-northwest-health-amphitheater-at-central-park-plaza-2027-05-15-7-pm/concert/18754773 |
| tm-hannah-harper-2027-augusta-vvg1zz_pq1iixu | Hannah Harper | 2027-05-20 | Augusta | https://seatgeek.com/hannah-harper-tickets/augusta-georgia-bell-auditorium-2027-05-20-8-pm/concert/18754463 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-hannah-harper-2027-huntsville-1aozk4jgkdjcgyp | VBC Mars Music Hall | Mars Music Hall at Von Braun Center | https://seatgeek.com/hannah-harper-tickets/huntsville-alabama-vbc-mars-music-hall-2027-04-03-7-30-pm/concert/18754832 |
| tm-hannah-harper-2027-jim-thorpe-vv1aezk4jgkdldw-w | Penn's Peak | Penns Peak | https://seatgeek.com/hannah-harper-tickets/jim-thorpe-pennsylvania-penns-peak-2027-05-08-8-pm/concert/18754371 |

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
