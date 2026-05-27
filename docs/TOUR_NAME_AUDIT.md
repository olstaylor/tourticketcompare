# tour_name coverage audit

Source: `public/data/events.json` (272 events) cross-referenced against `public/data/artists.json` (9 artist records). Snapshot taken 2026-05-27. Tracks issue #172 sub-deliverable A.

## How "indexed" is defined here

An artist is treated as "indexed" for the purposes of the `tour_name` warning when their `indexing_status` is anything other than `review_required` or `hidden`. Missing `indexing_status` defaults to indexed. This is the visibility-on-the-site signal — distinct from PR #185's `verified_providers != []` signal, which is about whether an artist-level provider CTA is supportable. The two diverge for Olivia Rodrigo today: she is publicly indexed, but her `verified_providers` is `[]` pending a human-verified Ticketmaster artist URL.

## Per-artist coverage

| Artist slug      | indexing_status                      | Events | tour_name filled | tour_name blank | Missing key | Indexed for warning |
|------------------|--------------------------------------|-------:|-----------------:|----------------:|------------:|---------------------|
| ariana-grande    | indexable_with_substantial_content   |     38 |               38 |               0 |           0 | yes                 |
| bad-bunny        | indexable_with_substantial_content   |     24 |               24 |               0 |           0 | yes                 |
| beyonce          | indexable_with_substantial_content   |      — |                — |               — |           — | yes                 |
| bts              | indexable_with_substantial_content   |     17 |               17 |               0 |           0 | yes                 |
| bruno-mars       | review_required                      |     56 |                0 |              56 |           0 | no                  |
| harry-styles     | indexable_with_substantial_content   |     30 |               30 |               0 |           0 | yes                 |
| jay-z            | indexable_with_substantial_content   |      3 |                3 |               0 |           0 | yes                 |
| morgan-wallen    | indexable_with_substantial_content   |     18 |               18 |               0 |           0 | yes                 |
| olivia-rodrigo   | indexable_with_substantial_content   |     86 |                0 |              86 |           0 | yes                 |

Beyoncé has no rows in `public/data/events.json` at the time of audit; she ships as an artist watchlist entry without verified event records. The validator's tour_name warning therefore has nothing to say about her — there are no events for it to evaluate.

Distinct tour names present (one per indexed artist with coverage): `The Eternal Sunshine Tour` (Ariana Grande); `DeBÍ TiRAR MáS FOToS World Tour` (Bad Bunny); `BTS WORLD TOUR 'ARIRANG'` (BTS); `Together, Together` (Harry Styles); `JAY-Z Yankee Stadium 2026` (Jay-Z); `Still the Problem Tour` (Morgan Wallen).

## Totals

- 272 events.
- 130 events (47.8%) have a non-empty `tour_name`.
- 142 events (52.2%) have a blank `tour_name`.
- 0 events are missing the `tour_name` key.
- Of the blanks, 86 surface as warnings (Olivia Rodrigo) and 56 are silent (Bruno Mars is `review_required`).

## Artists needing manual verification

1. **Olivia Rodrigo (86 blank events)** — 8 of these already carry `verification_status: "needs_recheck"` from PR #177 because their Ticketmaster URLs were short-form and returned HTTP 403 in CI. The remaining 78 events use long-form Ticketmaster URLs whose slug contains `olivia-rodrigo-the-unraveled-tour-…`. Per #172, **the URL slug is evidence, not proof** — the tour title must be confirmed from the event page itself (or another trusted source) before any populate pass. No `tour_name` values are populated in this PR.
2. **Bruno Mars (56 blank events)** — her record is `indexing_status: review_required`, so she is excluded from the validator warning by design. If she is ever moved to `indexable_with_substantial_content`, the warning will start firing for these 56 events and they will need to be populated from a verified source at that time.

No other artists need attention; the six indexed artists with event coverage have 100% `tour_name` fill.

## Validator behaviour added by this audit

In `scripts/validate-events.py`:

- **Hard error** when `tour_name` key is missing from an event, or when the value is present but not a string. (Applies on every run, not just `--for-production`.)
- **Warning** under `--for-production` when `tour_name` is the empty string and the artist is indexed (`indexing_status not in {"review_required", "hidden"}`). Warnings are grouped by artist slug with a sample of event IDs so a single artist with many blanks does not flood output.
- Warnings are written to stderr and do not change the exit code. They surface alongside any errors when validation fails.
- Self-test gains one negative case (`tour_name key missing → required-key error`) and one positive case (`blank tour_name on indexed artist warns but passes`), bringing the suite to 12 negative + 2 positive cases.

## What this audit deliberately does not do

- Does not populate or infer any `tour_name` value on Olivia Rodrigo or any other artist.
- Does not call Ticketmaster, SeatGeek, or any external provider.
- Does not touch `public/data/artists.json`, `public/data/events.json`, `public/data/events/*.json`, provider URLs, `/api/out`, Impact logic, CTA generation, routing, or affiliate behaviour.
- Does not address sub-deliverable B of #172 (the actual populate pass), which is blocked on human verification of each event page.
