# SeatGeek Ariana Grande Candidate Review

Proposal-only review generated from the existing SeatGeek workflow. No event data, CTA rendering, `/api/out`, Ticketmaster behavior, provider URLs, or generic SeatGeek links were changed.

## Source command

```bash
node scripts/propose-seatgeek-urls.mjs --artist "Ariana Grande"
```

## Run summary

- Generated at: 2026-05-14T09:33:30.333Z
- As-of date: 2026-05-14
- Future Ariana Grande events checked: 38
- Events already covered by SeatGeek: 0
- Missing SeatGeek URLs selected and checked: 38 of 38
- SeatGeek API credentials available during run: yes (client secret present: no)
- High-confidence candidates: 0
- Needs-review candidates: 0
- Rejected event-specific candidates: 0
- Events with no candidate found: 38

## 1. high_confidence

No high-confidence SeatGeek URL candidates were returned. Because there are no high-confidence candidates, there are no event-specific SeatGeek URLs to explain for artist/date/city/venue matching.

## 2. needs_review

No needs-review SeatGeek URL candidates were returned.

## 3. reject

No rejected event-specific SeatGeek URL candidates were returned. The rejected records from the workflow were no-candidate placeholders and are listed in the `no_candidate` section instead.

## 4. no_candidate

These Ariana Grande events were checked by the proposal-only workflow, but no SeatGeek URL candidate was returned. No URL should be applied from this report for these rows.

| Date | City | Venue | Local event ID | Reason |
|---|---|---|---|---|
| 2026-06-06 | Oakland | Oakland Arena | tm-ariana-grande-2026-oakland-1c00631913d14ad8 | no_candidate_found |
| 2026-06-09 | Oakland | Oakland Arena | tm-ariana-grande-2026-oakland-1c00631a8fc31891 | no_candidate_found |
| 2026-06-10 | Oakland | Oakland Arena | tm-ariana-grande-2026-oakland-1c00632490b77e47 | no_candidate_found |
| 2026-06-13 | Los Angeles | Crypto.com Arena | tm-ariana-grande-2026-los-angeles-2c00631bd2240c78 | no_candidate_found |
| 2026-06-14 | Los Angeles | Crypto.com Arena | tm-ariana-grande-2026-los-angeles-2c00631bd1f40c75 | no_candidate_found |
| 2026-06-17 | Inglewood | Kia Forum | tm-ariana-grande-2026-inglewood-09006319299f5deb | no_candidate_found |
| 2026-06-19 | Inglewood | Kia Forum | tm-ariana-grande-2026-inglewood-090063192f945f68 | no_candidate_found |
| 2026-06-20 | Inglewood | Kia Forum | tm-ariana-grande-2026-inglewood-09006325c6486b2e | no_candidate_found |
| 2026-06-24 | Austin | Moody Center ATX | tm-ariana-grande-2026-austin-3a00631b9ce923db | no_candidate_found |
| 2026-06-26 | Austin | Moody Center ATX | tm-ariana-grande-2026-austin-3a00631b9e202403 | no_candidate_found |
| 2026-06-27 | Austin | Moody Center ATX | tm-ariana-grande-2026-austin-3a00631b9f022430 | no_candidate_found |
| 2026-07-06 | Atlanta | State Farm Arena | tm-ariana-grande-2026-atlanta-0e00631a8e691e65 | no_candidate_found |
| 2026-07-08 | Atlanta | State Farm Arena | tm-ariana-grande-2026-atlanta-0e00631a8f331ed1 | no_candidate_found |
| 2026-07-09 | Atlanta | State Farm Arena | tm-ariana-grande-2026-atlanta-0e006325bea26298 | no_candidate_found |
| 2026-07-12 | Brooklyn | Barclays Center | tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | no_candidate_found |
| 2026-07-13 | Brooklyn | Barclays Center | tm-ariana-grande-2026-brooklyn-30006319f34a4abb | no_candidate_found |
| 2026-07-16 | Brooklyn | Barclays Center | tm-ariana-grande-2026-brooklyn-30006319f41b4abf | no_candidate_found |
| 2026-07-18 | Brooklyn | Barclays Center | tm-ariana-grande-2026-brooklyn-30006319f49f4acd | no_candidate_found |
| 2026-07-19 | Brooklyn | Barclays Center | tm-ariana-grande-2026-brooklyn-30006325205054e3 | no_candidate_found |
| 2026-07-22 | Boston | TD Garden | tm-ariana-grande-2026-boston-0100631aaef23ee8 | no_candidate_found |
| 2026-07-24 | Boston | TD Garden | tm-ariana-grande-2026-boston-0100631aca626435 | no_candidate_found |
| 2026-07-25 | Boston | TD Garden | tm-ariana-grande-2026-boston-010063289ef611c4 | no_candidate_found |
| 2026-07-28 | Montreal | Centre Bell | tm-ariana-grande-2026-montreal-31006319ddb22b1f | no_candidate_found |
| 2026-07-30 | Montreal | Centre Bell | tm-ariana-grande-2026-montreal-31006319de3a2b37 | no_candidate_found |
| 2026-07-31 | Montreal | Centre Bell | tm-ariana-grande-2026-montreal-31006319dedc2b4c | no_candidate_found |
| 2026-08-03 | Chicago | United Center | tm-ariana-grande-2026-chicago-04006319ddea2cd5 | no_candidate_found |
| 2026-08-05 | Chicago | United Center | tm-ariana-grande-2026-chicago-0400631adf313481 | no_candidate_found |
| 2026-08-06 | Chicago | United Center | tm-ariana-grande-2026-chicago-04006325ad9f24a7 | no_candidate_found |
| 2026-08-15 | London | The O2 | tm-ariana-grande-2026-london-3500631c8ea13055 | no_candidate_found |
| 2026-08-16 | London | The O2 | tm-ariana-grande-2026-london-3500631c937630fa | no_candidate_found |
| 2026-08-19 | London | The O2 | tm-ariana-grande-2026-london-3500631c950d310b | no_candidate_found |
| 2026-08-20 | London | The O2 | tm-ariana-grande-2026-london-3500631c97193144 | no_candidate_found |
| 2026-08-23 | London | The O2 | tm-ariana-grande-2026-london-3500631c98a031b3 | no_candidate_found |
| 2026-08-24 | London | The O2 | tm-ariana-grande-2026-london-35006324f4e94ebb | no_candidate_found |
| 2026-08-27 | London | The O2 | tm-ariana-grande-2026-london-35006324f4fe4f2a | no_candidate_found |
| 2026-08-28 | London | The O2 | tm-ariana-grande-2026-london-35006324f5075024 | no_candidate_found |
| 2026-08-31 | London | The O2 | tm-ariana-grande-2026-london-35006324f4f54ef7 | no_candidate_found |
| 2026-09-01 | London | The O2 | tm-ariana-grande-2026-london-35006324f50f50d8 | no_candidate_found |

## Review decision

- Apply SeatGeek URLs now: no.
- Rationale: the workflow returned zero high-confidence candidates, zero needs-review candidates, and zero rejected event-specific candidates; all checked events landed in `no_candidate`.
- Follow-up: rerun the same proposal-only workflow later if SeatGeek indexing changes or credentials/feed behavior changes. Do not add generic SeatGeek links as substitutes.
