# SeatGeek event-URL candidates awaiting event verification — RESOLVED 2026-07-06

**Resolved:** the owner confirmed verification of the 28 underlying
automation-landed events on 2026-07-06 (in-session). Their
`provider_links.ticketmaster.verified` flags were set to `true`
(`last_verified_at: 2026-07-06`) and `npm run seatgeek:enrich:apply` was re-run
with `SEATGEEK_CLIENT_ID`: all **28 high-confidence event-level SeatGeek URLs
were applied** (exact date/city/venue match, score 100, registry
performer-id-confirmed, no conflicts). Coverage moved from 234 to **262 of 402
events** carrying a stored `seatgeek_url`. See
`docs/SEATGEEK_CTA_AUTO_ADD_LOG.md` for the full apply audit.

Applied per artist: Charli xcx 11 (now full event coverage), Ariana Grande 10,
BTS 3, Summer Walker 2, ROSALÍA 1, JAY-Z 1.

Notes carried forward:

- The BTS Arlington 2026-08-16 event is still `needs_recheck` — its stored
  SeatGeek URL stays suppressed until the event itself is re-verified
  (`providerEventPublishable`; `provider_links.seatgeek.verified` remains
  `false`).
- The 87 Ticketmaster-verified events still missing a `seatgeek_url` returned
  zero SeatGeek API candidates in the same run (European/non-US legs SeatGeek
  does not list). Absence of a SeatGeek match is acceptable — the Ticketmaster
  CTA still renders.
- Blank `tour_name`/`event_name` on the automation-landed events is **not**
  resolved by this change and remains open as `BACKLOG.md` item 6.

The original candidate table from the 2026-07-06 proposal run is preserved in
the git history of this file (commit "Document 2026-07-06 credentialed SeatGeek
enrichment run").
