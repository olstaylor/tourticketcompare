# SeatGeek Proposal Diagnostics

Curated diagnostic run for the SeatGeek proposal workflow. The run used SeatGeek API credentials server-side, redacted credentials from query logs, and did not mutate event data or apply URLs.

## Summary

- Generated at: 2026-05-14T10:10:31.776Z
- As-of date: 2026-05-14
- Diagnostic samples checked: 10
- SeatGeek API credentials available: yes (client secret present: no)
- HTTP(S) proxy configured for Node fetch: yes
- SeatGeek request delay: 350ms, with one retry after HTTP 429 rate-limit responses
- Raw SeatGeek candidate rows returned across all attempts: 9
- Unique SeatGeek candidate URLs/IDs after de-duplication: 9
- Stored positive-control URLs rediscovered: 2 of 2
- Event data changed: no
- SeatGeek URLs applied: no

## Diagnosis

The SeatGeek API did return raw candidates for the diagnostic sample after Node fetch was configured to honor the environment HTTP(S) proxy. The earlier all-zero review was therefore not evidence that SeatGeek had no API candidates; it was caused by transport failures being collapsed into zero-candidate attempts in this environment. The script now also paces requests and retries HTTP 429 responses so rate-limit responses are less likely to be mistaken for no-candidate results during all-artist runs.

The script rediscovered every stored positive-control SeatGeek URL in the diagnostic sample.

## Ariana Grande — Oakland Arena missing SeatGeek URL

- Local event ID: tm-ariana-grande-2026-oakland-1c00631913d14ad8
- Artist: Ariana Grande
- Date: 2026-06-06
- City: Oakland
- Venue: Oakland Arena
- Ticketmaster URL: https://www.ticketmaster.com/ariana-grande-the-eternal-sunshine-tour-oakland-california-06-06-2026/event/1C00631913D14AD8
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Oakland+Arena+Oakland&datetime_local.gte=2026-06-06T00%3A00%3A00&datetime_local.lte=2026-06-06T23%3A59%3A59&taxonomies.name=concert&venue.city=Oakland`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Oakland&datetime_local.gte=2026-06-06T00%3A00%3A00&datetime_local.lte=2026-06-06T23%3A59%3A59&taxonomies.name=concert&venue.city=Oakland`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Oakland+Arena&datetime_local.gte=2026-06-06T00%3A00%3A00&datetime_local.lte=2026-06-06T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Oakland&datetime_local.gte=2026-06-05T00%3A00%3A00&datetime_local.lte=2026-06-07T23%3A59%3A59&taxonomies.name=concert&venue.city=Oakland`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande&datetime_local.gte=2026-06-06T00%3A00%3A00&datetime_local.lte=2026-06-06T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Ariana Grande | 2026-06-06T20:00:00 | Oakland Arena | Oakland | https://seatgeek.com/ariana-grande-tickets/oakland-california-oakland-arena-2026-06-06-8-pm/concert/17700787 | Ariana Grande | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Ariana Grande | 2026-06-06T20:00:00 | Oakland Arena, Oakland | https://seatgeek.com/ariana-grande-tickets/oakland-california-oakland-arena-2026-06-06-8-pm/concert/17700787 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## Ariana Grande — Los Angeles missing SeatGeek URL

- Local event ID: tm-ariana-grande-2026-los-angeles-2c00631bd2240c78
- Artist: Ariana Grande
- Date: 2026-06-13
- City: Los Angeles
- Venue: Crypto.com Arena
- Ticketmaster URL: https://www.ticketmaster.com/ariana-grande-the-eternal-sunshine-tour-los-angeles-california-06-13-2026/event/2C00631BD2240C78
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Crypto.com+Arena+Los+Angeles&datetime_local.gte=2026-06-13T00%3A00%3A00&datetime_local.lte=2026-06-13T23%3A59%3A59&taxonomies.name=concert&venue.city=Los+Angeles`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Los+Angeles&datetime_local.gte=2026-06-13T00%3A00%3A00&datetime_local.lte=2026-06-13T23%3A59%3A59&taxonomies.name=concert&venue.city=Los+Angeles`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Crypto.com+Arena&datetime_local.gte=2026-06-13T00%3A00%3A00&datetime_local.lte=2026-06-13T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Los+Angeles&datetime_local.gte=2026-06-12T00%3A00%3A00&datetime_local.lte=2026-06-14T23%3A59%3A59&taxonomies.name=concert&venue.city=Los+Angeles`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande&datetime_local.gte=2026-06-13T00%3A00%3A00&datetime_local.lte=2026-06-13T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Ariana Grande | 2026-06-13T20:00:00 | Crypto.com Arena | Los Angeles | https://seatgeek.com/ariana-grande-tickets/los-angeles-california-crypto-com-arena-2026-06-13-8-pm/concert/17700791 | Ariana Grande | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Ariana Grande | 2026-06-13T20:00:00 | Crypto.com Arena, Los Angeles | https://seatgeek.com/ariana-grande-tickets/los-angeles-california-crypto-com-arena-2026-06-13-8-pm/concert/17700791 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## Ariana Grande — Brooklyn missing SeatGeek URL

- Local event ID: tm-ariana-grande-2026-brooklyn-30006319f0e94aa7
- Artist: Ariana Grande
- Date: 2026-07-12
- City: Brooklyn
- Venue: Barclays Center
- Ticketmaster URL: https://www.ticketmaster.com/ariana-grande-the-eternal-sunshine-tour-brooklyn-new-york-07-12-2026/event/30006319F0E94AA7
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Barclays+Center+Brooklyn&datetime_local.gte=2026-07-12T00%3A00%3A00&datetime_local.lte=2026-07-12T23%3A59%3A59&taxonomies.name=concert&venue.city=Brooklyn`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Brooklyn&datetime_local.gte=2026-07-12T00%3A00%3A00&datetime_local.lte=2026-07-12T23%3A59%3A59&taxonomies.name=concert&venue.city=Brooklyn`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Barclays+Center&datetime_local.gte=2026-07-12T00%3A00%3A00&datetime_local.lte=2026-07-12T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande+Brooklyn&datetime_local.gte=2026-07-11T00%3A00%3A00&datetime_local.lte=2026-07-13T23%3A59%3A59&taxonomies.name=concert&venue.city=Brooklyn`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Ariana+Grande&datetime_local.gte=2026-07-12T00%3A00%3A00&datetime_local.lte=2026-07-12T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Ariana Grande | 2026-07-12T20:00:00 | Barclays Center | Brooklyn | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-12-8-pm/concert/17700779 | Ariana Grande | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Ariana Grande | 2026-07-12T20:00:00 | Barclays Center, Brooklyn | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-12-8-pm/concert/17700779 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## BTS — Stanford Stadium missing SeatGeek URL

- Local event ID: tm-bts-2026-stanford-1c006429c95ea2b8
- Artist: BTS
- Date: 2026-05-16
- City: Stanford
- Venue: Stanford Stadium
- Ticketmaster URL: https://www.ticketmaster.com/bts-world-tour-arirang-in-stanford-stanford-california-05-16-2026/event/1C006429C95EA2B8
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Stanford+Stadium+Stanford&datetime_local.gte=2026-05-16T00%3A00%3A00&datetime_local.lte=2026-05-16T23%3A59%3A59&taxonomies.name=concert&venue.city=Stanford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Stanford&datetime_local.gte=2026-05-16T00%3A00%3A00&datetime_local.lte=2026-05-16T23%3A59%3A59&taxonomies.name=concert&venue.city=Stanford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Stanford+Stadium&datetime_local.gte=2026-05-16T00%3A00%3A00&datetime_local.lte=2026-05-16T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Stanford&datetime_local.gte=2026-05-15T00%3A00%3A00&datetime_local.lte=2026-05-17T23%3A59%3A59&taxonomies.name=concert&venue.city=Stanford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS&datetime_local.gte=2026-05-16T00%3A00%3A00&datetime_local.lte=2026-05-16T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | BTS | 2026-05-16T19:00:00 | Stanford Stadium | Stanford | https://seatgeek.com/bts-tickets/stanford-california-stanford-stadium-2026-05-16-7-pm/concert/18010310 | BTS | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | BTS | 2026-05-16T19:00:00 | Stanford Stadium, Stanford | https://seatgeek.com/bts-tickets/stanford-california-stanford-stadium-2026-05-16-7-pm/concert/18010310 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## BTS — SoFi Stadium missing SeatGeek URL

- Local event ID: tm-bts-2026-inglewood-0a006429ab3c5ef1
- Artist: BTS
- Date: 2026-09-01
- City: Inglewood
- Venue: SoFi Stadium
- Ticketmaster URL: https://www.ticketmaster.com/bts-world-tour-arirang-in-los-inglewood-california-09-01-2026/event/0A006429AB3C5EF1
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+SoFi+Stadium+Inglewood&datetime_local.gte=2026-09-01T00%3A00%3A00&datetime_local.lte=2026-09-01T23%3A59%3A59&taxonomies.name=concert&venue.city=Inglewood`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Inglewood&datetime_local.gte=2026-09-01T00%3A00%3A00&datetime_local.lte=2026-09-01T23%3A59%3A59&taxonomies.name=concert&venue.city=Inglewood`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+SoFi+Stadium&datetime_local.gte=2026-09-01T00%3A00%3A00&datetime_local.lte=2026-09-01T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+Inglewood&datetime_local.gte=2026-08-31T00%3A00%3A00&datetime_local.lte=2026-09-02T23%3A59%3A59&taxonomies.name=concert&venue.city=Inglewood`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS&datetime_local.gte=2026-09-01T00%3A00%3A00&datetime_local.lte=2026-09-01T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | BTS | 2026-09-01T20:00:00 | SoFi Stadium | Inglewood | https://seatgeek.com/bts-tickets/inglewood-california-sofi-stadium-2026-09-01-8-pm/concert/18010329 | BTS | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | BTS | 2026-09-01T20:00:00 | SoFi Stadium, Inglewood | https://seatgeek.com/bts-tickets/inglewood-california-sofi-stadium-2026-09-01-8-pm/concert/18010329 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## BTS — MetLife Stadium missing SeatGeek URL

- Local event ID: tm-bts-2026-east-rutherford-00006429eb39bb6f
- Artist: BTS
- Date: 2026-08-01
- City: East Rutherford
- Venue: MetLife Stadium
- Ticketmaster URL: https://www.ticketmaster.com/bts-world-tour-arirang-in-east-east-rutherford-new-jersey-08-01-2026/event/00006429EB39BB6F
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+MetLife+Stadium+East+Rutherford&datetime_local.gte=2026-08-01T00%3A00%3A00&datetime_local.lte=2026-08-01T23%3A59%3A59&taxonomies.name=concert&venue.city=East+Rutherford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+East+Rutherford&datetime_local.gte=2026-08-01T00%3A00%3A00&datetime_local.lte=2026-08-01T23%3A59%3A59&taxonomies.name=concert&venue.city=East+Rutherford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+MetLife+Stadium&datetime_local.gte=2026-08-01T00%3A00%3A00&datetime_local.lte=2026-08-01T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS+East+Rutherford&datetime_local.gte=2026-07-31T00%3A00%3A00&datetime_local.lte=2026-08-02T23%3A59%3A59&taxonomies.name=concert&venue.city=East+Rutherford`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=BTS&datetime_local.gte=2026-08-01T00%3A00%3A00&datetime_local.lte=2026-08-01T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | BTS | 2026-08-01T20:00:00 | MetLife Stadium | East Rutherford | https://seatgeek.com/bts-tickets/east-rutherford-new-jersey-metlife-stadium-2026-08-01-8-pm/concert/18010301 | BTS | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | BTS | 2026-08-01T20:00:00 | MetLife Stadium, East Rutherford | https://seatgeek.com/bts-tickets/east-rutherford-new-jersey-metlife-stadium-2026-08-01-8-pm/concert/18010301 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## JAY-Z — Yankee Stadium missing SeatGeek URL

- Local event ID: tm-jay-z-2026-bronx-1d006473d78cfdb8
- Artist: JAY-Z
- Date: 2026-07-10
- City: Bronx
- Venue: Yankee Stadium
- Ticketmaster URL: https://www.ticketmaster.com/jayz-30-bronx-new-york-07-10-2026/event/1D006473D78CFDB8
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 0

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=JAY-Z+Yankee+Stadium+Bronx&datetime_local.gte=2026-07-10T00%3A00%3A00&datetime_local.lte=2026-07-10T23%3A59%3A59&taxonomies.name=concert&venue.city=Bronx`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=JAY-Z+Bronx&datetime_local.gte=2026-07-10T00%3A00%3A00&datetime_local.lte=2026-07-10T23%3A59%3A59&taxonomies.name=concert&venue.city=Bronx`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=JAY-Z+Yankee+Stadium&datetime_local.gte=2026-07-10T00%3A00%3A00&datetime_local.lte=2026-07-10T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=JAY-Z+Bronx&datetime_local.gte=2026-07-09T00%3A00%3A00&datetime_local.lte=2026-07-11T23%3A59%3A59&taxonomies.name=concert&venue.city=Bronx`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=JAY-Z&datetime_local.gte=2026-07-10T00%3A00%3A00&datetime_local.lte=2026-07-10T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

### Candidate scoring decisions

No unique candidates were available to score.

## Harry Styles — Madison Square Garden missing SeatGeek URL

- Local event ID: tm-harry-styles-2026-new-york-3b006435047f81c1
- Artist: Harry Styles
- Date: 2026-09-02
- City: New York
- Venue: Madison Square Garden
- Ticketmaster URL: https://www.ticketmaster.com/harry-styles-together-together-new-york-new-york-09-02-2026/event/3B006435047F81C1
- Stored SeatGeek URL: —
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+Madison+Square+Garden+New+York&datetime_local.gte=2026-09-02T00%3A00%3A00&datetime_local.lte=2026-09-02T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+New+York&datetime_local.gte=2026-09-02T00%3A00%3A00&datetime_local.lte=2026-09-02T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+Madison+Square+Garden&datetime_local.gte=2026-09-02T00%3A00%3A00&datetime_local.lte=2026-09-02T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+New+York&datetime_local.gte=2026-09-01T00%3A00%3A00&datetime_local.lte=2026-09-03T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles&datetime_local.gte=2026-09-02T00%3A00%3A00&datetime_local.lte=2026-09-02T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Harry Styles with Jamie XX | 2026-09-02T20:00:00 | Madison Square Garden | New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-09-02-8-pm/concert/18027093 | Harry Styles, Jamie xx | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Harry Styles with Jamie XX | 2026-09-02T20:00:00 | Madison Square Garden, New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-09-02-8-pm/concert/18027093 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## Harry Styles — Madison Square Garden stored SeatGeek URL control

- Local event ID: tm-harry-styles-2026-new-york-3b0064350404814e
- Artist: Harry Styles
- Date: 2026-08-26
- City: New York
- Venue: Madison Square Garden
- Ticketmaster URL: https://www.ticketmaster.com/harry-styles-together-together-new-york-new-york-08-26-2026/event/3B0064350404814E
- Stored SeatGeek URL: https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-26-8-pm/concert/18027090
- Stored SeatGeek URL rediscovered: yes
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+Madison+Square+Garden+New+York&datetime_local.gte=2026-08-26T00%3A00%3A00&datetime_local.lte=2026-08-26T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+New+York&datetime_local.gte=2026-08-26T00%3A00%3A00&datetime_local.lte=2026-08-26T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+Madison+Square+Garden&datetime_local.gte=2026-08-26T00%3A00%3A00&datetime_local.lte=2026-08-26T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles+New+York&datetime_local.gte=2026-08-25T00%3A00%3A00&datetime_local.lte=2026-08-27T23%3A59%3A59&taxonomies.name=concert&venue.city=New+York`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Harry+Styles&datetime_local.gte=2026-08-26T00%3A00%3A00&datetime_local.lte=2026-08-26T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Harry Styles with Jamie XX | 2026-08-26T20:00:00 | Madison Square Garden | New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-26-8-pm/concert/18027090 | Harry Styles, Jamie xx | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Harry Styles with Jamie XX | 2026-08-26T20:00:00 | Madison Square Garden, New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-26-8-pm/concert/18027090 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## Morgan Wallen — stored SeatGeek URL control

- Local event ID: tm-morgan-wallen-2026-gainesville-2200635d19f97a46
- Artist: Morgan Wallen
- Date: 2026-05-15
- City: Gainesville
- Venue: Ben Hill Griffin Stadium
- Ticketmaster URL: https://www.ticketmaster.com/morgan-wallen-still-the-problem-tour-gainesville-florida-05-15-2026/event/2200635D19F97A46
- Stored SeatGeek URL: https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112
- Stored SeatGeek URL rediscovered: yes
- Unique candidates after de-duplication: 1

### SeatGeek API attempts

#### artist + venue + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Morgan+Wallen+Ben+Hill+Griffin+Stadium+Gainesville&datetime_local.gte=2026-05-15T00%3A00%3A00&datetime_local.lte=2026-05-15T23%3A59%3A59&taxonomies.name=concert&venue.city=Gainesville`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Morgan+Wallen+Gainesville&datetime_local.gte=2026-05-15T00%3A00%3A00&datetime_local.lte=2026-05-15T23%3A59%3A59&taxonomies.name=concert&venue.city=Gainesville`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + venue + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Morgan+Wallen+Ben+Hill+Griffin+Stadium&datetime_local.gte=2026-05-15T00%3A00%3A00&datetime_local.lte=2026-05-15T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist + city + narrow date window

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Morgan+Wallen+Gainesville&datetime_local.gte=2026-05-14T00%3A00%3A00&datetime_local.lte=2026-05-16T23%3A59%3A59&taxonomies.name=concert&venue.city=Gainesville`
- HTTP status: 200
- Raw candidate count before filtering: 0

No raw candidates returned for this attempt.

#### artist only + exact date

- Query: `https://api.seatgeek.com/2/events?client_id=%3Credacted%3E&per_page=10&sort=score.desc&q=Morgan+Wallen&datetime_local.gte=2026-05-15T00%3A00%3A00&datetime_local.lte=2026-05-15T23%3A59%3A59&taxonomies.name=concert`
- HTTP status: 200
- Raw candidate count before filtering: 1

| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |
|---:|---|---|---|---|---|---|---|
| 1 | Morgan Wallen with Thomas Rhett, Gavin Adcock, and Zach John King | 2026-05-15T17:30:00 | Ben Hill Griffin Stadium | Gainesville | https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112 | Morgan Wallen, Thomas Rhett, Gavin Adcock, Zach John King | concert, concert |

### Candidate scoring decisions

| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |
|---|---|---:|---|---|---|---|---|---|
| high_confidence | accepted as high_confidence | 100 | Morgan Wallen with Thomas Rhett, Gavin Adcock, and Zach John King | 2026-05-15T17:30:00 | Ben Hill Griffin Stadium, Gainesville | https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-15-5-30-pm/concert/17873112 | strong artist/performer match, exact local date match, city match, venue match, concert/music taxonomy, event-specific SeatGeek URL | — |

## Recommendation

Rerun the all-artist proposal workflow after this diagnostic fix. The diagnostic sample shows that the API can return raw candidates and that stored positive-control SeatGeek URLs can be rediscovered once Node fetch uses the configured HTTP(S) proxy. Keep the existing strict scoring/classification rules and manually review `needs_review` candidates before any separate apply PR.
