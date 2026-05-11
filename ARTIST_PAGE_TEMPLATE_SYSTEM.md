# Artist Page Template System Specification

## Overview

This document defines a scalable, reusable template system for high-trust artist pages that avoid thin SEO spam and prepare for future provider integrations.

---

## 1. Proposed Artist Page Schema

### Artist Core Data Structure

```json
{
  "slug": "beyonce",
  "name": "Beyoncé",
  "short_description": "Pop and R&B performer known for large-scale arena and stadium productions.",
  "factual_summary": "Beyoncé is an American singer, songwriter, performer, and visual artist whose solo catalog spans R&B, pop, dance, country, and hip-hop influences.",
  "why_demand_is_high": "Demand is typically high because her tours are major cultural events with polished staging, deep catalogs, and broad international audiences.",
  "ticket_buying_notes": "There may not be an active tour at the moment. Use verified ticket platform links below to check current availability directly.",
  "genres": ["Pop", "R&B"],
  "country": "United States",
  "official_website": "https://www.beyonce.com/",
  "image_alt": "Beyoncé artist ticket information",
  "seo_title": "Beyoncé Tickets | Verified Ticket Options",
  "meta_description": "Check verified Beyoncé ticket destinations. No invented tour dates, fake prices, or placeholder provider buttons.",
  "faq": [
    {
      "question": "Where can I see Beyoncé tour dates?",
      "answer": "Check the verified ticket links on this page for current platform information. We only show buttons when the destination can be verified."
    }
  ],
  "related_guides": ["how-to-compare-concert-ticket-prices", "when-is-the-best-time-to-buy-concert-tickets"],
  "provider_status": {
    "ticketmaster": {
      "verified": true,
      "public_enabled": true,
      "last_checked_at": "2026-04-30",
      "destination_type": "artist_page"
    }
  }
}
```

### Page Component Structure

```json
{
  "page_type": "artist_page",
  "sections": [
    {
      "component": "breadcrumb",
      "path": ["Home", "Artists", "Beyoncé"]
    },
    {
      "component": "hero",
      "title": "{artist.name} ticket links and buying guidance",
      "subtitle": "Find checked ticket links for {artist.name} when available, plus practical guidance before you leave for a provider site."
    },
    {
      "component": "verified_event_links",
      "source": "api/shows?artistSlug={slug}&limit=6",
      "empty_state": "No event-specific ticket link is available here yet. We only show ticket buttons when the show and destination can be verified."
    },
    {
      "component": "artist_level_providers",
      "source": "catalog.ticket_links[artist_slug={slug}]",
      "empty_state": "No checked artist-level ticket page is available yet. We hide ticket buttons until we can verify the destination."
    },
    {
      "component": "artist_info",
      "sections": ["About", "Ticket link status", "Why fans check early"]
    },
    {
      "component": "buying_checklist",
      "title": "Ticket buying checklist",
      "items": [
        "Check the final price including fees before paying.",
        "Check the seat location, section, row, and any view restrictions.",
        "Check resale terms and buyer protections if the ticket is listed by a third party.",
        "Check the delivery method and expected transfer timing.",
        "Check refund, cancellation, and event-change terms on the provider site."
      ]
    },
    {
      "component": "page_note",
      "title": "About this page",
      "body": "This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links."
    },
    {
      "component": "related_links",
      "links": [
        { "label": "All artists", "href": "/artists" },
        { "label": "Ticket buying guides", "href": "/guides" },
        { "label": "How it works", "href": "/how-it-works" },
        { "label": "Affiliate disclosure", "href": "/affiliate-disclosure" }
      ]
    },
    {
      "component": "faq",
      "title": "{artist.name} ticket FAQ",
      "items": [
        {
          "question": "Does this page list {artist.name} tour dates?",
          "answer": "No. This page does not publish tour dates unless event details have been verified."
        },
        {
          "question": "Does TourTicketCompare sell {artist.name} tickets?",
          "answer": "No. We link to external ticketing platforms when a destination is verified."
        },
        {
          "question": "Are prices shown here?",
          "answer": "No. Prices should appear only when live provider data is verified and timestamped."
        }
      ]
    },
    {
      "component": "affiliate_disclosure",
      "body": "Affiliate link. We may earn a commission at no extra cost to you. Final prices, fees and availability are confirmed on the ticketing platform."
    }
  ]
}
```

---

## 2. Reusable Component Architecture

### Component Categories

#### A. Layout Components
- **Breadcrumb Navigation** - hierarchical path (Home > Artists > Artist Name)
- **Hero Section** - title + introductory copy
- **Content Section** - bordered panels for grouped information
- **Split Section** - two-column layout for comparisons

#### B. Content Components
- **Info Card** - title + description + optional link
- **Show Card** - event name, date, location, ticket link
- **Provider Card** - provider name, description, CTA button
- **FAQ Item** - collapsible question/answer pair

#### C. Empty State Components
- **Empty Event Grid** - message when no verified events exist
- **Empty Provider Panel** - message when no verified links exist
- **Disabled Feature** - greyed-out section with explanation

#### D. CTA Components
- **Button Link** - primary/secondary action
- **Mini Link** - small inline link (e.g., "All artists", "Guides")
- **Disclosure Note** - affiliate/legal disclaimer text

### Component Implementation Pattern

Each component should support:
1. **Server-side rendering** - HTML injection into template
2. **Client-side hydration** - JavaScript enhancement for interactivity
3. **Progressive enhancement** - works with or without JavaScript
4. **ARIA labels** - semantic HTML for accessibility
5. **CSS class naming** - consistent BEM-like convention

### Composition Pattern

```javascript
// Example: Artist page composed from reusable parts
function renderArtistPage(artist, events, catalog) {
  return [
    renderBreadcrumb([...]),
    renderHero(artist.name, artist.intro),
    renderShowBoard(events, { artistSlug: artist.slug }),
    renderProviderPanel(catalog.ticket_links, artist.slug),
    renderArtistInfo(artist),
    renderBuyingChecklist(),
    renderRelatedLinks([...]),
    renderFaq(artist)
  ].join('')
}
```

---

## 3. Recommended Page Layout

### Visual Hierarchy

```
┌─ Breadcrumb Navigation ──────────────────────────────┐
│ Home > Artists > Beyoncé                             │
└──────────────────────────────────────────────────────┘

┌─ Hero Section ───────────────────────────────────────┐
│ H1: Beyoncé ticket links and buying guidance         │
│ Lead: Find checked ticket links...                   │
└──────────────────────────────────────────────────────┘

┌─ Verified Event Links ───────────────────────────────┐
│ H2: Verified event links                             │
│ [Show Card] [Show Card] [Show Card]                 │
│ [Show Card] [Show Card] [Show Card]                 │
│ [Empty State if no events]                           │
└──────────────────────────────────────────────────────┘

┌─ Artist-Level Providers ─────────────────────────────┐
│ H2: Artist-level ticket pages                        │
│ [Provider Card: Ticketmaster]                        │
│ [Provider Card: SeatGeek] (if verified)              │
│ Disclosure: Affiliate link...                        │
└──────────────────────────────────────────────────────┘

┌─ Split Section ──────────────────────────────────────┐
│ About Beyoncé          │  Ticket Link Status         │
│ [Artist bio...]        │  [Status description...]    │
└──────────────────────────────────────────────────────┘

┌─ Why Fans Check Early ───────────────────────────────┐
│ H2: Why fans check early                             │
│ [Explanation...]                                     │
└──────────────────────────────────────────────────────┘

┌─ Buying Checklist ───────────────────────────────────┐
│ H2: Ticket buying checklist                          │
│ ☐ Check final price including fees                  │
│ ☐ Check seat location...                            │
│ ... (5 items)                                        │
└──────────────────────────────────────────────────────┘

┌─ About This Page ────────────────────────────────────┐
│ H2: About this page                                  │
│ [Disclaimer text...]                                │
└──────────────────────────────────────────────────────┘

┌─ Useful Links ───────────────────────────────────────┐
│ H2: Useful links                                     │
│ [All artists] [Guides] [How it works] [Disclosure]  │
└──────────────────────────────────────────────────────┘

┌─ FAQ ────────────────────────────────────────────────┐
│ H2: Beyoncé ticket FAQ                               │
│ <details> Does this page list tour dates?            │
│ <details> Does TourTicketCompare sell tickets?       │
│ <details> Are prices shown here?                     │
└──────────────────────────────────────────────────────┘
```

### Responsive Design Pattern

- **Mobile**: Single column, full-width cards
- **Tablet**: Single column with wider cards
- **Desktop**: Multi-column grids where appropriate (2-3 cols for show/provider cards)

---

## 4. Empty-State UX

### Principle: Useful Even Without Data

Every empty state should:
1. Explain **why** content is missing
2. Show **what would appear** if data existed
3. Provide **alternative actions** (guides, other artists)
4. Avoid misleading visitors about current tours

### Empty State Scenarios

#### A. No Verified Event Links Yet
```
[Icon: Clock]
"No event-specific ticket link is available here yet. 
We only show ticket buttons when the show and 
destination can be verified."

[Button: Browse other artists]
[Button: Read buying guides]
```

#### B. No Verified Provider Links Yet
```
[Icon: Link]
"No checked artist-level ticket page is available yet. 
We hide ticket buttons until we can verify the 
destination."

[Text: Check back soon or review our buying guides]
```

#### C. Provider Temporarily Unavailable
```
[Icon: Alert]
"Checked ticket links are temporarily unavailable. 
You can still browse artist pages and buying guides."

[Button: Browse guides]
```

#### D. Artist Has No Tour Activity
```
[Icon: Megaphone]
"This artist's tour status may be inactive right now. 
Use the verified links below to check the latest 
on ticketing platforms."

[Button: View provider pages]
```

---

## 5. SEO Recommendations

### Title Tags

**Format**: `{Artist Name} Tickets | {Call to Action}`
- **Example**: `Beyoncé Tickets | Verified Ticket Options`
- **Why**: Artist name + intent + trust signal

**Fallback**: `{Artist Name} Tickets | TourTicketCompare`

### Meta Descriptions

**Format**: `Check verified {Artist} ticket destinations. {Trust statement}.`
- **Example**: `Check verified Beyoncé ticket destinations. No invented tour dates, fake prices, or placeholder provider buttons.`
- **Length**: 150-160 chars
- **Must include**: 
  - Artist name
  - "verified" keyword
  - Trust signal (no fakes/placeholders)

### Structured Data (Schema.org)

#### Artist Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",  // or "MusicGroup" for groups
  "name": "Beyoncé",
  "url": "https://example.com/artists/beyonce",
  "sameAs": ["https://www.beyonce.com/"],
  "description": "American singer, songwriter, performer..."
}
```

#### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Artists",
      "item": "https://example.com/artists"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Beyoncé",
      "item": "https://example.com/artists/beyonce"
    }
  ]
}
```

#### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this page list Beyoncé tour dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This page does not publish tour dates unless event details have been verified..."
      }
    }
  ]
}
```

**Important**: Do NOT use Event schema without verified event data (date, venue, URL). Do NOT claim tour dates, prices, or availability without verification.

### Content SEO Patterns

1. **Natural keyword placement**: "Beyoncé tickets", "verified ticket links", "ticket buying"
2. **Avoid keyword stuffing**: Write for humans first, SEO second
3. **Clear section hierarchy**: H1 (page title) > H2 (sections) > H3 (subsections)
4. **Unique content**: Original buying guidance, not scraped/generated spam
5. **Trust signals**: "verified", "checked", "no invented", "official links"

### Indexability Rules

- **Artist pages**: `index,follow,max-image-preview:large` when substantial content exists
- **Empty artist pages**: `index,follow` (still valuable for artist brand searches)
- **Placeholder/thin pages**: `noindex,follow` (e.g., if only name and one sentence)

---

## 6. Internal Linking Recommendations

### Link Patterns

#### A. Artist Page → Buying Guides
- **Where**: Related section, "Useful links" footer
- **Why**: Reduce bounce rate, increase engagement
- **Examples**:
  - `How to Compare Concert Ticket Prices` (from any artist page)
  - `When to Buy Concert Tickets` (contextual, if tour announced)
  - `Primary vs Resale Concert Tickets` (if resale links available)

#### B. Artist Page → Other Artists
- **Where**: "All artists" link in footer, artist cards in search results
- **Why**: Encourage exploration of artist catalog
- **Examples**:
  - "Browse all artists"
  - "Similar artists" (future: Ariana Grande → other pop artists)

#### C. Artist Page → How It Works
- **Where**: Footer, FAQ section
- **Why**: Explain verification philosophy
- **Examples**:
  - "Learn how we verify ticket links"
  - "Why some tickets buttons are hidden"

#### D. Artist Page → Affiliate Disclosure
- **Where**: Near provider buttons
- **Why**: Transparency, legal compliance
- **Example**: `Affiliate link. We may earn a commission at no extra cost to you.`

#### E. Event Show Card → Artist Page
- **Where**: Show card footer (when artist may be unknown)
- **Example**: "View artist page"

### Internal Link Density

- **Too few links** (< 3): Page feels isolated, low SEO value
- **Ideal** (3-5): Guides, all artists, how it works, disclosure
- **Too many** (> 8): Cluttered, dilutes link juice

### Anchor Text Patterns

✅ **Good**:
- "How to compare concert ticket prices" (descriptive)
- "Ticket buying guides" (topic-focused)
- "All artists" (clear navigation)

❌ **Bad**:
- "Click here" (no context)
- "More info" (generic)
- "Beyoncé" (internal link, same domain, redundant)

---

## 7. Scalability for Future Integrations

### Provider Integration Points

```json
{
  "provider_integrations": [
    {
      "slug": "ticketmaster",
      "name": "Ticketmaster",
      "type": "primary_official",
      "affiliate_program": "Impact",
      "verified": true,
      "public_enabled": true,
      "link_format": "/api/out?provider=ticketmaster&artistSlug={slug}",
      "requires_destination_url": true
    },
    {
      "slug": "seatgeek",
      "name": "SeatGeek",
      "type": "marketplace",
      "affiliate_program": "Impact",
      "verified": false,
      "public_enabled": false,
      "link_format": "/api/out?provider=seatgeek&artistSlug={slug}",
      "requires_destination_url": true
    }
  ]
}
```

### Adding a New Provider

1. **Add to `catalog.json`** providers array
2. **Add ticket links** in `catalog.ticket_links` for artists
3. **Add provider copy** in `public/app.js` providerCopy object
4. **Enable in UI** by setting `public_enabled: true`
5. **Verify link** via manual test or automated check
6. **Enable affiliate** via `affiliate_enabled: true` once verified

### Variant Page Types

Future artist page variants:
- **Touring artist** (Beyoncé, Harry Styles) - show event links
- **Festival-only appearances** (JAY-Z) - link to festival pages
- **Non-touring artist** (producer, songwriter) - artist info only
- **Historical artist** (retired tours) - factual page, no tickets
- **Upcoming artist** (pre-fame) - tracking page, no tickets yet

---

## 8. Trust & Verification Standards

### What Makes a Link "Verified"

✅ **Verified Link**:
- HTTPS URL
- Points to an artist page or event detail page
- Destination exists and is accessible
- Last checked within 30 days
- Matches artist slug and tour date (if applicable)
- No placeholders, localhost, test domains, or examples.com

❌ **Unverified Link**:
- HTTP only
- Points to search results or generic pages
- Destination returns 404 or error
- Last checked > 90 days ago
- Mismatched artist or tour
- Contains placeholder, example, or test text

### Trust Disclosure Pattern

**Always include** near provider buttons:
```
"Affiliate link. We may earn a commission at no extra cost to you.
Final prices, fees and availability are confirmed on the ticketing platform."
```

---

## Implementation Checklist

- [ ] Artist page schema in `catalog.json` complete and validated
- [ ] Reusable component functions refactored
- [ ] Breadcrumb rendering implemented
- [ ] Hero section styled and responsive
- [ ] Event grid with empty state rendered
- [ ] Provider panel with empty state rendered
- [ ] FAQ section with artist-specific questions
- [ ] Related guides linked correctly
- [ ] SEO meta tags injected properly
- [ ] Schema.org JSON-LD generated
- [ ] Internal links validated
- [ ] Empty states tested for all scenarios
- [ ] Mobile responsive tested
- [ ] Accessibility (ARIA) labels added
- [ ] Performance metrics captured (Core Web Vitals)
- [ ] One gold-standard page (Beyoncé) implemented and reviewed

