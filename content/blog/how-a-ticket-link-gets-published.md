---
title: How a ticket link gets published on TourTicketCompare
seo_title: How a ticket link gets published
description: What has to be true before a ticket button appears here — the checks a person makes, the checks automation makes, and what happens when a link stops working.
summary: Some of the checking behind a ticket button here is done by a person in a browser, and some by named automated lanes running under strict gates. Here is which is which, and what happens when a destination breaks.
date: 2026-08-01
updated: 2026-09-03
status: published
tags:
  - how-we-work
  - transparency
related_guides:
  - how-to-avoid-ticket-scams
  - primary-vs-resale-concert-tickets
---

Plenty of ticket sites will send you somewhere before anything has confirmed the destination exists. This site is built the other way round, and it costs it buttons: where there is no checked destination, the page shows an empty state instead of a link. This post sets out what actually stands behind a button, because "verified" is a word worth pinning down before you trust it.

## An artist starts with no buttons at all

When an artist is added here, the page is deliberately inert. It carries the name, a short factual summary, and nothing else — no ticket buttons, no provider logos, no dates. Internally that is a "review required" state, and the page is marked noindex while it is incomplete.

Getting out of that state is the one part of this that no automation is allowed to do. A person opens the proposed destination in a browser and confirms three things: that it loads, that it is the right artist rather than a same-name collision, and that it is the provider's own page rather than a redirect chain pointing somewhere else. Only then does the artist get an entry in the verified-link registry the redirect service reads. Discovery tooling can propose a new artist; it cannot promote one.

## Individual dates are a different pipeline, and machines do publish them

Artist-level links and show dates are separate problems, and it would be dishonest to describe the second the way we describe the first. Dates, and most event-level ticket links, are published by a small set of named automated lanes: new shows discovered from the official listing API, a nightly sync of factual corrections to shows already on file, and one link lane per resale provider.

What makes those lanes safe is not a person at the end of them. It is that each one only writes an unambiguous exact-event match, runs the full validation suite in the same job on exactly the content it is about to publish, and lands the change only if that passes. A match that is ambiguous is reported rather than written. An incomplete fetch from a provider leaves the existing data alone instead of clearing it. What counts as unambiguous is spelled out per provider: for the SeatGeek lane, the instant of the show, the city, the venue and the shape of the destination URL all have to agree with the provider's own record of that event.

The split is deliberate. Deciding that a page belongs to the right artist is a judgement call, so a person makes it. Deciding that a listing is the same show as one already on file is a checkable rule, so a machine applies it — consistently, every night, across far more dates than anyone would re-read by hand.

## Nothing is trusted just because it was published

A stored destination is not a permanent licence to render a button. Every outbound link is rebuilt at request time and put through host, protocol, event-ID and allowlist checks before it is offered, and again when it is followed. If any of that fails, the button does not appear. There is no fallback to a generic search page and no quietly substituted destination — the honest output is no button.

That is also why one provider's link failing does not take the others down with it. Each provider publishes on its own evidence, so a date can carry a checked link from one site, a plain listing link from another, and nothing at all from a third. That asymmetry is the data being reported rather than tidied up.

## Links break, and the site is built to notice

A verified link is a claim about the past, so it gets rechecked. A daily audit walks every stored destination and reports what no longer resolves. It is careful about what counts: a provider's bot protection returning a block is recorded as blocked, not as dead, because an anti-bot response proves nothing about the page. Confirmed failures are written up for a person to act on.

Restoring or clearing a link needs positive evidence in the same way. A stored link is only cleared on a confirmed provider record saying the event is gone or does not match — never on a failed fetch, an auth error, or an empty response that could just be a bad night.

## What this does not cover

Checked means the destination is real and specific to that show. It does not mean the price is good, the seats are there, or the terms suit you — those belong to the provider and change constantly. If a link here is broken or points at the wrong thing, the [contact page](/contact) is the fastest way to say so, and the [editorial policy](/editorial-policy) sets out what gets corrected and how.
