# TourTicketCompare Backlog

## Now

- Keep visible UX copy clear, fan-friendly, and commercially useful without overclaiming live comparison.
- Maintain checked event-specific Ticketmaster redirect behavior through `/api/out`.
- Keep guide pages practical and search-focused: fees, resale risk, final totals, timing, and official vs resale tickets.
- Continue validating event data so no fake dates, venues, prices, availability, or placeholder listings reach the public site.

## Next

- Add more verified event data only from official artist, venue, Ticketmaster, or other approved provider sources.
- Improve artist pages with richer buying guidance and empty states where no checked event link exists.
- Add provider-specific price display only after an approved provider supplies displayable pricing with clear usage rights.
- Add structured internal checks for visible copy so risky phrases such as fake savings claims, unsupported price claims, and placeholder wording cannot regress.
- Add production smoke checks for homepage, artist pages, event CTAs, `/api/shows`, and `/api/out`.

## Later

- Build live multi-provider price comparison only when reliable, approved, displayable provider pricing is available.
- Add additional providers only after verified destinations, affiliate handling, and public usage rules are confirmed.
- Add richer event-level SEO only when event date, venue, location, performer, ticket URL, and availability are verified.
- Add automated source-sync tooling for official feeds, with review gates before public display.
- Revisit the parked raw HTML routing issue only when explicitly prioritized.

## Guardrails For Every Task

- Do not add fake prices, fake dates, fake availability, fake venues, fake tours, fake providers, or placeholder listings.
- Do not use Ticketmaster as a public price source unless its pricing is approved and reliable for display.
- Do not scrape unofficial sources.
- Do not expose affiliate credentials or API secrets.
- Do not change `/api/out`, Impact logic, provider URLs, or deployment config unless the task explicitly asks for that area.
- Do not market the site as live price comparison until the feature is actually supported by verified multi-provider data.

## Parking Lot

- Cloudflare raw HTML routing issue for non-root routes.
- Broader deployment architecture cleanup.
- New city pages, tour pages, or event schema.
- Automated Ticketmaster or provider sync.
- Public price comparison UI.

