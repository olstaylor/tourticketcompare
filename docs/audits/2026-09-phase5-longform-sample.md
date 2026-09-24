# Phase 5: longform edit (2026-09-24)

Launch-readiness milestone, Phase 5. The brief: refine, don't rewrite. Remove
the AI tells, keep the facts, structure and keyword targeting, lead with the
useful answer, and be specific where the site has real data. Add no invented
experiences, quotes, statistics or first-person claims. Where the owner's voice
is needed, leave a `TODO(Ollie)` slot. Start with 3 articles, then stop for
review.

**Branch:** `milestone/2027-launch-readiness-phase5` (stacked on phase4). The
owner couldn't review the sample (it had no PR), then asked for the rest to be
done: all 18 guides and the 4 published blog posts are now edited, and the
PR's "Files changed" tab shows the diff per article. The 3 drafts in
`content/blog/` are untouched.

**Kept the same in all three:** frontmatter (title, H1, meta description,
sources, `last_checked`, HowTo steps), every H2, every internal link, and the
FAQ questions, so the keyword targeting and FAQ/HowTo structured data keep
their shape. `date_published` is unchanged. `content:provenance` moved
`dateModified` to 2026-09-24 because the copy changed.

**Removed throughout:** every em dash (9, 20 and 11), "Nothing here is
scraped"-style openers, "This guide is about…" meta paragraphs, the summary
conclusion that repeated the intro, bullets that all had the same shape, and
most hedging. "Provider" becomes "ticket site" in reader-facing prose (the
term the Phase 4 interface now uses). "Snapshot" becomes "listed price", to
match the P2 note on the buttons.

## 1. How to Compare Concert Ticket Prices

1,432 → 1,477 words. **One line:** leads with the method in one paragraph,
replaces the "approved, timestamped provider listed-price snapshots" jargon
with what a reader sees on a date, and names the real limits: prices are
checked every few hours and drop off after 24 hours (`DEFAULT_FRESHNESS_HOURS`
in the Vivid Seats and Impact marketplace writers).

- The "why is a price missing" FAQ now lists the real reasons in plain words:
  SeatGeek and Ticketmaster supply no prices to us, a feed had nothing usable,
  the 24-hour limit, or the date isn't matched yet.
- Two "saving" sentences were reworded to "read anything into the price gap",
  to meet the smoke copy guardrail (it allows "saving" only next to an
  uncontracted negative).
- **Left as is:** the HowTo step text in the frontmatter still says
  "timestamped snapshots". It is schema text, not on-page prose; change it
  only if you want the terms to match exactly.
- **TODO(Ollie):** one real example would make section 2 land. For instance,
  a date where two sites' listed prices differed and the cheaper one turned
  out to be a different section or a single seat. It has to be yours; nothing
  in the data says which seats a listed price was for.

## 2. How Resale Ticket Pricing Works

1,251 → 1,079 words. **One line:** cuts the "This guide is about…"
paragraph and the "short version" recap, and adds one factual paragraph on
what the site shows: Vivid Seats, TicketNetwork and StubHub International
buttons carry each site's lowest listed price for the date, with how long ago
we checked.

- Myths are quoted directly ("Prices always drop the week before.") instead
  of introduced with "It is tempting to…".
- The closing disclaimer now says exactly what is checked (the button leads to
  the right event page) and what isn't (sellers and listings).
- The primary-vs-resale link from the removed recap moves into Related guides,
  with its context.
- **TODO(Ollie):** the About page says you built the site after checking
  resale sites one by one. One or two sentences on that, in your words, would
  suit the opening of "Judging whether a listing is worth it".

## 3. How to Avoid Overpaying for Concert Tickets

1,788 → 1,565 words. **One line:** fixes a factual contradiction and
tightens the prose. The intro and the last FAQ said the site "does not compare
live prices" and answered "No" to "does it tell me which provider is cheaper",
but the site now shows each site's lowest listed price side by side for a date.
Both now say what the site shows, and what that does and doesn't tell you.

- The repeated "final checkout total" (15 times) is cut down where the context
  already says it. The checklist table is unchanged apart from punctuation.
- "Hardly anyone sets out to overpay…" becomes an opening that names the three
  causes in its first sentence.
- **TODO(Ollie):** "Pressure and urgency at checkout" would benefit from one
  first-hand line: what you do yourself when a hold timer is running. Leave it
  out if you'd rather keep the guide impersonal.

## The other 15 guides

Lighter edits: most were already clean. Common to all: em dashes removed
(56 across these 15), "This guide explains…" meta paragraphs and
"The short version" recaps removed (the recap was cut from
`ticketnetwork-vs-ticketmaster`, `why-ticket-prices-change` and
`ticketmaster-vs-stubhub`; its one useful link moved into Related guides), the
"Keep comparing with these related guides:" line removed from every guide,
and intros rewritten to lead with the answer.

**Factual corrections (the text no longer matched the site):**
- `when-is-the-best-time-to-buy-concert-tickets` and `why-ticket-prices-change`
  said the site "does not track live prices". They now say it shows each
  site's recent listed price and doesn't track stock or predict prices.
- `ticketmaster-vs-seatgeek-vs-vivid-seats`: the "what we compare" section is
  now in interface terms (listed price, checked every few hours, 24-hour
  limit), and the FAQ no longer says "snapshot … labelled accordingly".
- `concert-ticket-fees-explained`: "listed-price snapshot" → the listed price
  on a date's button.

**Site-specific lines added** (all from code or config, nothing invented):
`ticketnetwork-vs-ticketmaster` and `vivid-seats-vs-ticketmaster` say what
their button shows on a date. `seatgeek-vs-ticketmaster` says neither button
carries a price here, and why.

## Blog (4 published posts)

`updated:` set to 2026-09-24 on all four.

- **how-a-ticket-link-gets-published:** said promotion "is the one part no
  automation is allowed to do" and "discovery tooling … cannot promote one".
  That stopped being true when auto-promote (path D) was added. Now describes
  both paths and the automatic path's real gates (exact SeatGeek and
  Ticketmaster match, music classification, deny list, both pages exist, 5 a
  day, one-command undo).
- **why-some-artist-pages-show-no-dates:** said an empty page shows "no
  ticket buttons at all", but the empty state renders one artist-level "See
  <artist> on <site>" link. It also said dates come only "from a reviewed
  source record" (Ticketmaster-lane dates are machine-matched) and that the
  page always stays indexed (never-dated artists are noindex since Phase 2).
  All three are corrected.
- **what-a-price-snapshot-actually-is** and **why-a-price-here-disappears:**
  both said the age appears only after 12 hours. Since P2 the note always
  says "Checked N hours ago". The button order is now explained the way the
  P4 disclosure states it (sites that pay us first). The recap section in
  the second post is gone. The title and URL of the first keep "snapshot"
  for search.

## Spelling

Consistently British across the set. One fix: `ticketmaster-vs-seatgeek-vs-vivid-seats`
said "loyalty program" and "program terms"; both are now "programme" to match
`vivid-seats-vs-ticketmaster`. Publisher names ("SeatGeek Help Center") are
proper nouns and stay as they are.

## Checks

`npm run guides:build`, `npm run blog:build`, `npm run content:provenance` and
`npm run test:mvp` (87/87) all pass.
