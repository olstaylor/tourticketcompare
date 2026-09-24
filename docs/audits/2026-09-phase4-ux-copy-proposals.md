# Phase 4: UX, trust and copy (2026-09-24)

Launch-readiness milestone, Phase 4. The brief: make the comparison module
understandable in five seconds, put a plain-English "how we make money" near
the buttons, check mobile navigation, CTA hierarchy and empty states, and
**propose** microcopy as before/after rather than apply it.

This page has two parts:

- **Part 1:** layout and hierarchy changes. No wording changed.
- **Part 2:** every wording change, as before/after. The owner approved all
  of P1–P11; they shipped in [#1128](https://github.com/olstaylor/tourticketcompare/pull/1128) on 2026-09-24.

Every "after" was checked against the code and data. Where a current sentence
says something the site cannot back up, the proposal says so.

---

## Part 1 — layout and hierarchy changes already made (no copy changed)

| Change | Where | Effect |
|---|---|---|
| On phones, the month jump becomes one horizontally scrollable row, and the date filters become a compact two-column grid with search full width. Every control stays. | `public/styles.css` (last block), `?v=20260924a` | Olivia Rodrigo at 390×844: first date card moves from **1,663 px to 1,341 px** down the page. No horizontal overflow. |
| Home hero: "Find a show" is now a secondary button. The search button above it is the single primary action. | `functions/[[path]].js` home template | There were two equal-weight orange buttons stacked on mobile. |

Test results for these changes: `test:mvp` 87/87. The homepage-proposition
parity test is unaffected, because only the class changed and the label did not.

**Checked and left as it is:** the mobile header with its Menu button, the
no-JavaScript board (the month links still work), card button sizes (44 px
minimum), and the empty states on city and venue pages. The Phase 2 and 3
fixes to history panels and page weight are already in.

**Deliberately not changed:** the developer comments in the page `<head>` (see
the Phase 0 audit, UX #10). They document CSP and Google Tag Manager decisions,
visitors never see them, and stripping them per request would add CPU to every
page.

---

## Part 2 — copy proposals (applied 2026-09-24)

The owner approved P1–P11 as written. All are applied on this branch, with the
`public/app.js` fallback kept in parity. One deviation: P6 ends "check the
final total on the **ticket** site", because on the homepage "the site" reads
as this site, and the homepage-proposition test requires each total sentence
to name where the total is confirmed.

A second adjustment, made in the pre-merge review: P1's "lowest listed price
on each" is used only when every button on the card shows a price. SeatGeek
and Ticketmaster never carry one, so on a mixed card the line reads "lowest
listed price where shown". As approved, most cards would have claimed a price
on buttons that have none.

### The comparison module in five seconds

A visitor should be able to answer three questions without reading: what is
being compared, where the numbers come from, and when they were checked.
Today those answers are split between a count line above the buttons and a
dense note below them. P1–P3 put each answer in one place.

**P1. The line above each card's buttons**

| | Copy |
|---|---|
| Before | Compare 6 checked ticket sites for this date |
| After | 6 ticket sites for this date · lowest listed price on each |

Why: it says what the numbers on the buttons are. With one site it would read
"1 ticket site for this date", and the "lowest listed price" clause appears
only when at least one button shows a price.
Where: `ctaCountLabel` in `functions/[[path]].js` (and `showCtaCountLabel` in
`public/app.js` for parity).

**P2. The note under a priced card's buttons**

| | Copy |
|---|---|
| Before | Listed-price snapshots, not live availability. Vivid Seats (24 Sep 2026, 06:47 UTC) · TicketNetwork (24 Sep 2026, 10:02 UTC). Prices may change and may exclude fees. |
| After | Checked 5 hours ago (Vivid Seats) and 2 hours ago (TicketNetwork). Listed prices, not your final total: the site adds fees at checkout. |

Why: relative time answers "when" at a glance. It changes a display rule:
today relative age appears only after 12 hours, and this proposal shows it
always. The absolute UTC time stays in a `title` tooltip and in `datetime`
markup. "Not live availability" is covered by "listed prices" and by P3.
Risk: none to the price gates. The display window, the 12-hour stale label and
the schema offers are unchanged.
Where: `renderServerPriceNotes` in `functions/[[path]].js`.

**P3. The board introduction under "Upcoming dates" (artist and artist-city pages)**

| | Copy |
|---|---|
| Before | Each date below comes from a reviewed source record. Pick yours, then compare the ticket sites that cover it. |
| After | Pick a date. Each button is a ticket site that sells it, with that site's lowest listed price when we have one. We check prices every few hours; the site shows your final total. |

Why: one sentence each for what, where and when. **"Reviewed" is not accurate
for every date.** Dates added automatically by the Ticketmaster lane carry
`machine_high_confidence` and have not been reviewed by a person, so the word
goes.

### How we make money

**P4. One disclosure, the same everywhere, next to the buttons.** Today the
site has five different phrasings: artist board, comparison hub, trust page,
home, and the footer. One of them makes a claim the site can't check ("this
never affects your price"), and **none mentions that the button order favours
sites that pay us**. The router renders SeatGeek first, then Vivid Seats and
the Impact marketplace lanes, with the unpaid Ticketmaster link last
(`serverShowCtaSpecs`).

| | Copy |
|---|---|
| Before (artist board) | Some links earn us a commission — this never affects your price. |
| Before (hub) | Some outbound links are affiliate links. We don't sell tickets, can't guarantee availability, and won't tell you one provider is always cheaper. |
| Before (footer) | Some links are affiliate links; we may earn a commission at no extra cost to you. … |
| After (one component) | **How we make money:** when you buy through some of these buttons, the ticket site pays us a commission. We add no fee of our own. Sites that pay us are listed first; Ticketmaster, which doesn't, is listed last when we have its link. [Affiliate disclosure] |

Placement: once above the first card on artist, artist-city, city and venue
pages and the comparison hub. City pages currently carry it only in the
footer. The footer keeps a one-line link.
Why: plain English, true as written, and it states the ordering. If you'd
rather change the ordering than disclose it, that's a code change instead
(rank buttons by price, or alphabetically). Say which.

### Ticketmaster button

**P5.** The price slot on the Ticketmaster button

| | Copy |
|---|---|
| Before | Ticketmaster · Check prices |
| After | Ticketmaster · See tickets |

Why: Ticketmaster never shows a price here, because it is a link source and not
a price lane. "Check prices" on every button implies Ticketmaster is being
compared like the others. The resale buttons keep "Check prices" when they
have no snapshot.

### Home

**P6. Hero sub-copy** (the text is shared by three files; the parity test
keeps them in step)

| | Copy |
|---|---|
| Before | Choose an artist and date, see current listed prices from ticket sites where available, then check the final total with the provider. |
| After | Choose an artist and date, see recent listed prices from ticket sites where we have them, then check the final total on the site. |

Why: prices can be up to 24 hours old, so "current" overstates it.

**P7. Search placeholder**

| | Copy |
|---|---|
| Before | Search by artist, city, country, venue, or tour (cut off at 390 px as "…venue, o") |
| After | Artist, city or venue |

The accessible label keeps the full wording.

### City and venue pages

**P8. Provenance line**

| | Copy |
|---|---|
| Before | By Ollie Taylor · Editorial policy · Most recently checked event record: Jul 7, 2026 · Report an incorrect date |
| After | By Ollie Taylor · Editorial policy · Dates re-checked against Ticketmaster daily · Report an incorrect date |

Why: the date comes from the newest `last_verified_at` among the page's
records, and many records never had that field advanced after ingestion. So a
page whose prices were checked this morning announces a date from July. The
nightly field-sync and daily audit do re-check every listed date against
Ticketmaster, so the "after" is true without a date that goes stale.

### Artist pages

**P9. Lead paragraph (example: Olivia Rodrigo on this branch's data)**

| | Copy |
|---|---|
| Before | We track 84 upcoming Olivia Rodrigo dates across 25 cities and 6 countries, Sep 25, 2026 to May 10, 2027. 26 of the venues host more than one night, so check the date on the card before you buy. 78 of the 84 have a checked ticket link; the rest are listed without one until we've followed where they lead. |
| After | 84 upcoming dates in 25 cities and 6 countries, Sep 25, 2026 – May 10, 2027. 26 venues host more than one night, so check the date before you buy. 78 of the 84 have a checked ticket link. |

Why: the same facts in about half the words. The link-coverage clause is
generated from the data and is accurate as it stands (it reads "every date"
only when that is true). The proposal only shortens it.

**P10. The fact strip: drop the cards that repeat the lead**

| | Content |
|---|---|
| Before | Dates tracked 84 · Cities 25 · Countries 6 · Next date Fri, Sep 25, 2026, Hartford · Last date Mon, May 10, 2027 · Checked ticket links 78 of 84 dates |
| After | Next date Fri, Sep 25, 2026, Hartford · Checked ticket links 78 of 84 dates |

Why: five of the six cards restate the lead, and even "Checked ticket links"
repeats P9's last sentence, so "Next date" is the only card that adds
anything. "Say each fact once" is already the rule for city and venue pages.
The strip could keep just "Next date", or keep both cards shown above if you
want the link count scannable. It saves about 120 px on mobile, so the first
date card moves up again.

**P11. Empty board for an artist that has never had a date** (Beyoncé and
three others; these pages are now noindex until a date lands)

| | Copy |
|---|---|
| Before | Lead: "No upcoming Beyoncé dates are listed right now. Dates appear here once our source lists them, and ticket buttons once their links pass our checks." Board: "Dates appear here once our source confirms them." Box: "No upcoming dates listed / We have no upcoming Beyoncé dates on file, and we can't say whether any are coming. / When our source lists a Beyoncé date, it appears here, with a ticket button once its link has passed our checks. / An empty board is normal between tours…" |
| After | Lead: "No Beyoncé dates yet." Box: "No dates yet / When Ticketmaster lists a Beyoncé date it appears here, with its ticket links. An empty page is normal between tours — here's why." (plus the existing email signup and artist-page button) |

Why: it currently says the same thing three times. "Ticketmaster" replaces
"our source" because Ticketmaster is where dates are ingested from.

---

## Spelling convention

Longform (guides and blog) is consistently British: organiser, programme,
cancelled. Interface strings are mostly neutral. The only British/American
split found is in code identifiers and schema.org property names
(`organization`), which must stay as they are. **Nothing to change.** New
interface copy above is written to read correctly in either convention.

---

## After approval

Each approved item is a small change in `functions/[[path]].js`, with the
matching `public/app.js` fallback string where a smoke parity assertion pins
it. Smoke assertions that quote the old wording are updated in the same commit
(three pin P2's current note, the artist-board disclosure and the empty-state
heading). `content:provenance` will advance the trust pages whose copy changes.
