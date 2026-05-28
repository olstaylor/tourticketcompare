# SeatGeek All-Artists Coverage Review

> **Superseded diagnostic note (2026-05-14):** A follow-up diagnostic found that this all-artist review's zero-candidate result was not reliable in this environment. Node `fetch` was not honoring the configured HTTP(S) proxy, so SeatGeek API transport failures were collapsed into no-candidate outcomes; the proposal script now configures proxy-aware fetch, paces SeatGeek requests, and retries HTTP 429 responses. Use `reports/seatgeek-proposal-diagnostics.md` and rerun the all-artist proposal workflow before making any apply decision.

Proposal-only all-artist review generated from the existing SeatGeek URL proposal workflow. No event data, CTA rendering, `/api/out`, Ticketmaster behavior, provider URLs, or generic SeatGeek links were changed.

## Source command

```bash
node scripts/propose-seatgeek-urls.mjs
```

## 1. Overall summary

- Generated at: 2026-05-14T09:42:08.244Z
- As-of date: 2026-05-14
- Total future events checked: 128
- Total already covered by SeatGeek: 19
- Total missing SeatGeek URLs: 109
- Selected missing events checked: 109
- SeatGeek API credentials available during run: yes (client secret present: no)
- High-confidence candidates: 0
- Needs-review candidates: 0
- Rejected candidate records: 109
- Rejected event-specific URL candidates: 0
- No-candidate events: 109

> Note: the workflow represents no-candidate rows as rejected placeholder records with `risk_flags: ["no_candidate_found"]`. In this run, all rejected records were no-candidate placeholders, not rejected event-specific SeatGeek URLs.

## 2. Coverage by artist

| Artist | Total future events | Already covered by SeatGeek | Missing SeatGeek URLs | High-confidence | Needs-review | Rejected records | Rejected event-specific URLs | No-candidate events | Recommended action |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Ariana Grande | 38 | 0 | 38 | 0 | 0 | 38 | 0 | 38 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |
| Bad Bunny | 24 | 0 | 24 | 0 | 0 | 24 | 0 | 24 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |
| BTS | 17 | 0 | 17 | 0 | 0 | 17 | 0 | 17 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |
| Harry Styles | 30 | 3 | 27 | 0 | 0 | 27 | 0 | 27 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |
| JAY-Z | 3 | 0 | 3 | 0 | 0 | 3 | 0 | 3 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |
| Morgan Wallen | 16 | 16 | 0 | 0 | 0 | 0 | 0 | 0 | No apply PR recommended from this run; rerun proposal workflow later rather than adding generic SeatGeek links. |

## 3. Candidate sections grouped by artist

No `high_confidence` or `needs_review` SeatGeek URL candidates were returned for any artist. Therefore there are no proposed event-specific SeatGeek URLs to apply or manually validate from this run.

## 4. No-candidate summary

The workflow found no event-specific SeatGeek candidate for the events below. To keep the report readable, each artist row includes counts and up to three examples only.

| Artist | No-candidate events | Example local event IDs | Example dates/cities/venues |
|---|---:|---|---|
| Ariana Grande | 38 | tm-ariana-grande-2026-oakland-1c00631913d14ad8<br>tm-ariana-grande-2026-oakland-1c00631a8fc31891<br>tm-ariana-grande-2026-oakland-1c00632490b77e47 | 2026-06-06 — Oakland — Oakland Arena<br>2026-06-09 — Oakland — Oakland Arena<br>2026-06-10 — Oakland — Oakland Arena |
| Bad Bunny | 24 | tm-bad-bunny-2026-barcelona-653666176<br>tm-bad-bunny-2026-barcelona-1116290311<br>tm-bad-bunny-2026-madrid-417009905 | 2026-05-22 — Barcelona — Estadi Olímpic Lluis Companys<br>2026-05-23 — Barcelona — Estadi Olímpic Lluis Companys<br>2026-05-30 — Madrid — Estadio Riyadh Air Metropolitano |
| BTS | 17 | tm-bts-2026-stanford-1c006429c95ea2b8<br>tm-bts-2026-stanford-1c006429c9dda300<br>tm-bts-2026-stanford-1c006435858268ec | 2026-05-16 — Stanford — Stanford Stadium<br>2026-05-17 — Stanford — Stanford Stadium<br>2026-05-19 — Stanford — Stanford Stadium |
| Harry Styles | 27 | tm-harry-styles-2026-new-york-3b006435047f81c1<br>tm-harry-styles-2026-new-york-3b006435049481d0<br>tm-harry-styles-2026-new-york-3b00643504a381d8 | 2026-09-02 — New York — Madison Square Garden<br>2026-09-04 — New York — Madison Square Garden<br>2026-09-05 — New York — Madison Square Garden |
| JAY-Z | 3 | tm-jay-z-2026-bronx-1d006473d78cfdb8<br>tm-jay-z-2026-bronx-1d006473d9d109cb<br>tm-jay-z-2026-bronx-1d006473db760a7f | 2026-07-10 — Bronx — Yankee Stadium<br>2026-07-11 — Bronx — Yankee Stadium<br>2026-07-12 — Bronx — Yankee Stadium |

## 5. Recommendation

- Recommended first artist/data batch to apply in a separate PR: **none from this run**.
- Rationale: the all-artist workflow returned zero high-confidence candidates and zero needs-review candidates. It also returned zero rejected event-specific SeatGeek URL candidates; every missing event resolved to `no_candidate_found`.
- Commercial-value note: Ariana Grande, BTS, Harry Styles, Bad Bunny, and Jay-Z have meaningful future-event coverage gaps in the current dataset, but this run produced no event-specific SeatGeek URLs for those gaps. Commercial value alone is not enough to justify an apply PR without event-specific candidates.
- Risk-level note: applying any URL from this run would require inventing or substituting generic SeatGeek links, which is explicitly out of scope.
- Follow-up: rerun `node scripts/propose-seatgeek-urls.mjs` later if SeatGeek indexing or credential/feed behavior changes; then prioritize the artist with the largest number of high-confidence, exact date/city/venue matches and the lowest risk flags.

## Safety confirmations

- Event data mutated by workflow: no
- Cloudflare config/data changed by workflow: no
- SeatGeek URLs applied: no
- Generic SeatGeek links added: no
- Ticketmaster behavior changed: no
