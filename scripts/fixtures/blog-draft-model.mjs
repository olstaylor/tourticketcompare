// Hand-written MOCK response. Never a Claude generation or fact-check.
export function mockMarkdown(payload) {
  const evidence = payload.evidence;
  const artist = evidence.artist;
  const slug = payload.artistSlug;
  const e = evidence.events[0];
  const q = JSON.stringify;
  return `---
title: ${q(`${artist} tickets: choosing the right date`)}
seo_title: ${q(`${artist} ticket choices`.slice(0, 40))}
description: ${q(`Choose a practical ${artist} concert date and compare like-for-like ticket listings, travel plans and delivery details before buying.`.slice(0, 160))}
summary: ${q(`Start with the date that works for the whole group, then match the event and ticket details before comparing checkout totals.`)}
date: ${payload.date}
status: draft
tags:
  - tour-buying
related_artists:
  - ${slug}
related_guides:
  - how-to-read-a-ticket-listing
sources:
  - label: ${q(`Ticketmaster — ${artist}, ${e.venue}, ${e.date}`)}
    url: ${e.sourceUrl}
---

Choosing a concert ticket starts with a date that works, rather than the first listing that catches your attention. For ${artist}, use the [artist date board](/artists/${slug}) to find the concert you mean, then keep that event fixed while checking ticket options. A listing for a different city or evening does not solve the same buying decision, even if the artist name matches.

## Choose a date before comparing tickets

The stored event information includes ${e.date} at ${e.venue} in ${e.city}, supported by the [exact Ticketmaster event page](${e.sourceUrl}). Treat that as a specific date to investigate, then recheck its details before making travel commitments. This example is a starting point for choosing an event, rather than a promise that a particular seat can be purchased.

Start with the constraints that cannot easily move. Check time off work, who is attending, how the group will get home and whether accommodation is needed. Put those alongside the concert date before opening ticket listings. A nearby date can be a poor choice if getting home means an awkward connection; a more distant event may work better if it fits an existing trip. Decide which tradeoffs matter to the group.

Keep a short list of dates that are practical, and remove any that depend on travel arrangements you have not checked. If the trip includes an overnight stay, investigate cancellation terms before committing to accommodation. Read the event page again before booking anything linked to the concert. Do not assume an itinerary will remain workable simply because a show appears on a date board.

## Keep the same ticket details in view

Once the date is fixed, decide what the group needs from the ticket. Write down whether sitting together matters, whether a seated ticket is preferred and any access questions that need an answer from the venue. These are questions to resolve for the exact event. Avoid carrying assumptions about another venue into this decision.

Use the [ticket listing guide](/guides/how-to-read-a-ticket-listing) as a checklist while reading each offer. Match the artist, date, city and venue, then compare the ticket description, quantity and grouping information. If a description is unclear, pause and investigate it before treating the offer as equivalent to another listing. A cheaper-looking starting amount means little when the tickets describe different experiences.

## Separate the concert choice from the purchase route

Open the relevant routes from the artist board and read the provider's own listing. Check whether the purchase route is the event's original seller or a resale listing, and understand what that means for the order you are considering. The route name alone does not answer every question about a specific ticket.

Keep the exact event selected while comparing totals. Read the current order details for fees, delivery and any restrictions, and compare the total you would actually be asked to pay. Where information is missing, ask the provider rather than filling the gap with an assumption. The useful comparison is between clearly described tickets that meet the same needs.

## Resolve delivery and access questions before paying

Before completing a purchase, find the stated delivery method and timing. Consider how that fits the trip, particularly if the group is travelling. If a listing's terms are unclear, seek clarification before committing to the order. Read the relevant terms directly rather than relying on a general description of the marketplace.

Access needs deserve the same attention. Contact the venue through its official channels with questions about the exact performance and the kind of ticket being considered. Check the answer against the ticket description before paying. A general seating preference and an access requirement should both be settled while the buying decision is still open.

## A practical final check

Return to the selected date and read the event name, city and venue together. Check the ticket description, whether the group can attend comfortably, the order total and the stated delivery arrangements. Confirm that any travel plan still fits the event. If an unresolved question would change the decision, stop and get an answer before purchasing.

The purpose of comparing routes is to make a clear choice for the concert the group can actually attend. Keep the [${artist} comparison board](/artists/${slug}) as the starting point, then use each provider's current details to decide whether a listing meets those needs.
`;
}

export function createMockClient() {
  let evidence;
  return { usage: [], request: async (_system, payload) => {
    if (payload.task === 'draft') { evidence = payload.evidence; return { markdown: mockMarkdown(payload) }; }
    return { supported: true, issues: [], claims: [{ claim: 'MOCK audit of stored event identity only', sourceUrl: evidence.events[0].sourceUrl, basis: 'repository' }] };
  } };
}
