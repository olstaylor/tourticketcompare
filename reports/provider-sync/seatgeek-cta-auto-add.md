# SeatGeek CTA auto-add log

Generated: 2026-10-10T02:18:22.514Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 2895
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2307
- Events already carrying a valid SeatGeek URL: 807
- Enrichment-eligible events already carrying a valid SeatGeek URL: 568
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1739
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 35 (past_event: 35)
- Events this run can check (window size): all eligible
- Rotation: window 1 of 1 (key 20736)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 12
- Events checked by this run: 12
- API calls made: 60
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 12
- no_candidates_returned: 12
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 12

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 807 event(s) already carried valid SeatGeek URLs before this run, including 568 enrichment-eligible event(s).
- This run queried only the 1739 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-bruno-mars-2027-burswood-1aefz_ogklrp4vu | Bruno Mars | 2027-02-14 | Burswood | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_o37vvzdckk | Bruno Mars | 2027-02-19 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknww0xk | Bruno Mars | 2027-02-20 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx7x5 | Bruno Mars | 2027-02-23 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx0x2 | Bruno Mars | 2027-02-24 | Docklands | no_candidates_returned | - |
| tm-bruno-mars-2027-milton-1akzkf3gkdacg5v | Bruno Mars | 2027-02-28 | Milton | no_candidates_returned | - |
| tm-bruno-mars-2027-milton-1avgz_ogklamkhm | Bruno Mars | 2027-03-01 | Milton | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_o3ezszduv6 | Bruno Mars | 2027-03-04 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxvi7 | Bruno Mars | 2027-03-08 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bruno-mars-2027-burswood-1apzkfbgkdn2ves | Bruno Mars | 2027-02-13 | Burswood | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknavvld | Bruno Mars | 2027-03-05 | Sydney Olympic Park | no_candidates_returned | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxoik | Bruno Mars | 2027-03-09 | Sydney Olympic Park | no_candidates_returned | - |

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

| showId | artist | datetime_iso | reason | detail |
| --- | --- | --- | --- | --- |
| tm-bruno-mars-2026-columbus-vv1aazkcfgkdl2qzg | bruno-mars | 2026-05-20T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkev_6oa | bruno-mars | 2026-05-23T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevq6og | bruno-mars | 2026-05-24T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevqmo2 | bruno-mars | 2026-05-27T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevhmob | bruno-mars | 2026-05-28T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-toronto-168zk8yb-za2d6ed | bruno-mars | 2026-05-30T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_k | bruno-mars | 2026-06-18 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_6 | bruno-mars | 2026-06-20 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_f | bruno-mars | 2026-06-21 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_k | bruno-mars | 2026-06-26T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_f | bruno-mars | 2026-06-28T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_4 | bruno-mars | 2026-06-29T18:00:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vg6pypf | bruno-mars | 2026-07-02T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16v3zapgk | bruno-mars | 2026-07-04T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz1kbsa6fz | bruno-mars | 2026-07-05T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vvoue3b | bruno-mars | 2026-07-07T18:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1kutpbz7 | bruno-mars | 2026-07-10T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-madrid-z698xz2qz1koyq7f6 | bruno-mars | 2026-07-11T18:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_x | bruno-mars | 2026-07-14T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_n | bruno-mars | 2026-07-15T19:30:00+02:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1aegzbzgksgzoma | bruno-mars | 2026-07-18T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdftyue | bruno-mars | 2026-07-19T15:30:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkduy8wh | bruno-mars | 2026-07-22T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdmnywe | bruno-mars | 2026-07-24T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdzq8wy | bruno-mars | 2026-07-25T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-london-1anzk8egkdbd8xc | bruno-mars | 2026-07-28T16:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydo-qcd | bruno-mars | 2026-08-22T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydoxccx | bruno-mars | 2026-08-25T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-foxborough-vv1avzk8igkdnsgxb | bruno-mars | 2026-09-06T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-indianapolis-vv17fzbygklnuhph | bruno-mars | 2026-09-09T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-tampa-vvg1vz_e944pwc | bruno-mars | 2026-09-12T23:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7ox8i | bruno-mars | 2026-09-27T19:00:00-06:00 | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_a6pmg6f | bruno-mars | 2026-10-01T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1izbyhid9od | bruno-mars | 2026-10-04T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
| tm-bruno-mars-2026-inglewood-vvg1iz_ehecvin | bruno-mars | 2026-10-07T02:00:00Z | past_event | event is in the past — SeatGeek delists finished shows; no API call spent |
