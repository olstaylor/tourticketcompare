# Artist Page Reusable Components Reference

This document describes the reusable component building blocks for artist pages.

## Component Inventory

### 1. Navigation & Structure

#### Breadcrumb Component
```
breadcrumb([
  { label: "Home", href: "/" },
  { label: "Artists", href: "/artists" },
  { label: "Beyoncé", current: true }
])
```

**Output**: `<nav class="breadcrumbs"><ol><li><a>Home</a></li>...</ol></nav>`

**Usage**: Top of every artist page  
**ARIA**: `aria-label="Breadcrumb"`, `aria-current="page"` on last item  
**Mobile**: Scrolls horizontally if needed

---

### 2. Hero Section

#### Artist Page Title & Intro
```
hero({
  title: "Beyoncé ticket links and buying guidance",
  subtitle: "Find checked ticket links for Beyoncé when available, plus practical guidance before you leave for a provider site.",
  icon: "artist" // optional
})
```

**Output**: 
```html
<section class="hero-panel">
  <h1>Beyoncé ticket links and buying guidance</h1>
  <p class="lead">Find checked ticket links...</p>
</section>
```

**Pattern**: All artist pages use "{Artist Name} ticket links and buying guidance"  
**Lead text**: Consistently describes checked links + guidance  
**Style**: Large, prominent, typically full-width with subtle background

---

### 3. Event & Provider Sections

#### Show Board / Event Grid
```
showBoard({
  artistSlug: "beyonce",
  limit: 6,
  emptyState: "No event-specific ticket link is available here yet..."
})
```

**Output Structure**:
```html
<section class="section-grid show-board">
  <div class="section-intro">
    <h2>Verified event links</h2>
    <p>Each card shows one checked event date...</p>
  </div>
  <div class="card-grid show-card-grid" data-show-grid="true">
    <article class="info-card show-card">...</article>
    <!-- or empty state -->
  </div>
</section>
```

**Key Features**:
- Server-renders initial cards from events data
- Client-side hydration fetches latest from `/api/shows`
- Empty state when no events match
- Responsive: 1 col mobile, 2-3 cols desktop

#### Show Card Component
```
showCard({
  event_name: "Beyoncé - Arena Tour",
  dateTimeISO: "2026-06-15T20:00:00Z",
  city: "Los Angeles",
  venue: "Crypto.com Arena",
  ticketmaster_url: "https://www.ticketmaster.com/event/...",
  id: "show-12345"
})
```

**Output**:
```html
<article class="info-card show-card">
  <h3>Beyoncé - Arena Tour</h3>
  <p class="card-status">Mon, Jun 15, 2026</p>
  <p class="muted">Los Angeles · Crypto.com Arena</p>
  <a class="button button-primary" href="/api/out?showId=...">
    View event ticket link
  </a>
  <p class="disclosure-note">
    External ticketing sites set prices, fees, availability, and checkout terms.
  </p>
</article>
```

**Empty Show Card**:
```html
<article class="info-card show-card">
  <h3>Beyoncé - Stadium Show</h3>
  <p class="card-status">Sat, Aug 20, 2026</p>
  <p class="muted">New York · MetLife Stadium</p>
  <p class="disclosure-note">
    No event-specific ticket link is available for this date yet.
  </p>
</article>
```

#### Provider Panel
```
providerPanel({
  artistSlug: "beyonce",
  links: [
    { provider: "Ticketmaster", verified: true, affiliate: true }
  ],
  emptyState: "No checked artist-level ticket page is available yet..."
})
```

**Output with Links**:
```html
<section class="provider-panel">
  <h2>Artist-level ticket pages</h2>
  <p class="muted">These links go to provider artist pages. Event-specific links appear only on dated show cards when verified.</p>
  <div class="provider-actions">
    <article class="provider-card">
      <h3>Ticketmaster</h3>
      <p>This is an artist-level page, not a date-specific event link...</p>
      <a class="button button-primary" href="/api/out?...">
        Open Ticketmaster artist page
      </a>
    </article>
  </div>
  <p class="disclosure-note">
    Affiliate link. We may earn a commission at no extra cost to you.
  </p>
  <p class="disclosure-note">
    Final prices, fees and availability are confirmed on the ticketing platform.
  </p>
</section>
```

**Output - Empty**:
```html
<section class="provider-panel">
  <h2>Artist-level ticket pages</h2>
  <p class="muted">
    No checked artist-level ticket page is available yet. 
    We hide ticket buttons until we can verify the destination.
  </p>
</section>
```

---

### 4. Information Sections

#### Split Section (Two Column)
```
splitSection({
  left: {
    title: "About Beyoncé",
    content: artist.factual_summary
  },
  right: {
    title: "Ticket link status",
    content: artist.ticket_buying_notes
  }
})
```

**Output**:
```html
<section class="split-section">
  <div>
    <h2>About Beyoncé</h2>
    <p>Beyoncé is an American singer...</p>
  </div>
  <div>
    <h2>Ticket link status</h2>
    <p>There may not be an active tour...</p>
    <p class="disclosure-note">We do not sell tickets directly...</p>
  </div>
</section>
```

**Responsive**: Stacks on mobile, side-by-side on desktop

#### Info Panel (Single Column)
```
infoPanel({
  title: "Why fans check early",
  content: artist.why_demand_is_high
})
```

**Output**:
```html
<section class="nested-panel">
  <h2>Why fans check early</h2>
  <p>Demand is typically high because her tours...</p>
</section>
```

#### Checklist Component
```
checklist({
  title: "Ticket buying checklist",
  items: [
    "Check the final price including fees before paying.",
    "Check the seat location, section, row, and any view restrictions.",
    "Check resale terms and buyer protections if the ticket is listed by a third party.",
    "Check the delivery method and expected transfer timing.",
    "Check refund, cancellation, and event-change terms on the provider site."
  ]
})
```

**Output**:
```html
<section class="nested-panel">
  <h2>Ticket buying checklist</h2>
  <ul class="check-list">
    <li>Check the final price including fees before paying.</li>
    <!-- ... -->
  </ul>
</section>
```

---

### 5. FAQ Section

#### FAQ Component
```
faq({
  title: "Beyoncé ticket FAQ",
  items: [
    {
      question: "Does this page list Beyoncé tour dates?",
      answer: "No. This page does not publish tour dates unless event details have been verified..."
    },
    {
      question: "Does TourTicketCompare sell Beyoncé tickets?",
      answer: "No. TourTicketCompare does not sell tickets directly..."
    },
    {
      question: "Are prices shown here?",
      answer: "No. Prices should appear only when live provider data is verified..."
    }
  ]
})
```

**Output**:
```html
<section class="nested-panel faq-panel">
  <h2>Beyoncé ticket FAQ</h2>
  <details>
    <summary>Does this page list Beyoncé tour dates?</summary>
    <p>No. This page does not publish tour dates...</p>
  </details>
  <!-- ... more items ... -->
</section>
```

**Features**:
- `<details>` for progressive disclosure
- Always include 3 standard questions + optional artist-specific FAQ
- All questions use artist name (not "this artist")

---

### 6. Related & Navigation

#### Mini Link Grid
```
miniLinks([
  { label: "All artists", href: "/artists" },
  { label: "Ticket buying guides", href: "/guides" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" }
])
```

**Output**:
```html
<section class="nested-panel">
  <h2>Useful links</h2>
  <div class="mini-link-grid">
    <a href="/artists" class="mini-link">All artists</a>
    <a href="/guides" class="mini-link">Ticket buying guides</a>
    <!-- ... -->
  </div>
</section>
```

#### Related Guides (Future)
```
relatedGuides([
  "how-to-compare-concert-ticket-prices",
  "when-is-the-best-time-to-buy-concert-tickets"
])
```

**Output** (Future enhancement):
```html
<section class="nested-panel">
  <h2>Related guides</h2>
  <ul>
    <li><a href="/guides/how-to-compare-concert-ticket-prices">
      How to Compare Concert Ticket Prices
    </a></li>
    <!-- ... -->
  </ul>
</section>
```

---

## Component Composition Pattern

### Artist Page Construction

```javascript
// Beyoncé page structure (all components)
function renderArtistPage(artist, events, catalog) {
  return [
    renderBreadcrumb([
      { label: "Home", href: "/" },
      { label: "Artists", href: "/artists" },
      { label: artist.name }
    ]),
    
    renderHero({
      title: `${artist.name} ticket links and buying guidance`,
      subtitle: `Find checked ticket links for ${artist.name} when available, plus practical guidance before you leave for a provider site.`
    }),
    
    renderShowBoard({
      artistSlug: artist.slug,
      limit: 6
    }),
    
    renderProviderPanel({
      artistSlug: artist.slug
    }),
    
    renderSplitSection({
      left: {
        title: `About ${artist.name}`,
        content: artist.factual_summary
      },
      right: {
        title: "Ticket link status",
        content: artist.ticket_buying_notes
      }
    }),
    
    renderInfoPanel({
      title: "Why fans check early",
      content: artist.why_demand_is_high
    }),
    
    renderChecklist({
      title: "Ticket buying checklist",
      items: [/* ... */]
    }),
    
    renderInfoPanel({
      title: "About this page",
      content: "This page does not list unverified tour dates..."
    }),
    
    renderMiniLinks([/* ... */]),
    
    renderFaq({
      title: `${artist.name} ticket FAQ`,
      items: artist.faq || [/* defaults */]
    })
  ]
}
```

---

## CSS Class Reference

### Layout Classes
- `.breadcrumbs` - navigation breadcrumb
- `.hero-panel` - full-width hero section
- `.section-grid` - grid layout with intro header
- `.nested-panel` - contained info panel
- `.split-section` - two-column layout
- `.card-grid` - responsive grid for cards
- `.provider-actions` - grid for provider cards

### Card Classes
- `.artist-card` - artist listing card
- `.info-card` - generic info card
- `.show-card` - event show card
- `.provider-card` - provider option card

### Content Classes
- `.lead` - large intro paragraph
- `.muted` - secondary text color
- `.card-status` - status badge/metadata
- `.disclosure-note` - affiliate/legal note
- `.check-list` - checklist with checkmark styling
- `.empty-state` - empty state message

### Button Classes
- `.button` - base button style
- `.button-primary` - primary action (filled)
- `.button-secondary` - secondary action (outline)
- `.mini-link` - small inline link
- `.text-link` - basic text link

---

## Mobile Responsive Patterns

### Grid Breakpoints
- **Mobile** (< 640px): 1 column
- **Tablet** (640px - 1024px): 1-2 columns
- **Desktop** (> 1024px): 2-3 columns

### Show Card Grid
```css
.card-grid.show-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  grid-template-columns: 1fr;
}
```

### Provider Cards
```css
.provider-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 640px) {
  grid-template-columns: 1fr;
}
```

---

## Accessibility Guidelines

### ARIA Labels
- Breadcrumb: `aria-label="Breadcrumb"` on `<nav>`
- Current page: `aria-current="page"` on last breadcrumb item
- Show grid: `aria-labelledby="artistShowBoard"` on grid container
- FAQ: `<details>` and `<summary>` for progressive disclosure
- Empty state: Clear message describing what would appear

### Semantic HTML
- Use `<article>` for cards
- Use `<section>` for grouped content
- Use `<details>` + `<summary>` for expandable content
- Use `<nav>` for breadcrumb navigation
- Use heading hierarchy (H1 > H2 > H3)

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for body text)
- Links have underline or other visual indicator
- Status badges have sufficient contrast

---

## Performance Optimization

### Server-Side Rendering
- Breadcrumb: rendered immediately
- Hero: rendered immediately
- Show cards: top 3-6 rendered on server, rest loaded client-side
- Provider panel: rendered immediately
- Info sections: rendered immediately
- FAQ: rendered immediately (with `<details>` for progressive disclosure)

### Client-Side Hydration
- Show grid loads full list via `/api/shows?artistSlug={slug}&limit=50`
- Cards not on server are appended dynamically
- Empty state shown while loading
- Error state shown if fetch fails

### Caching Strategy
- Catalog data: cached for 5 minutes (public, max-age=300)
- Show data: cached for 1 hour (public, max-age=3600)
- Artist page: cached for 5 minutes (updated frequently)

