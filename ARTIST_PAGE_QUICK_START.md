# Artist Page System: Quick Start Guide

## What You're Building

A scalable template system for high-trust artist pages that:
- ✅ Show verified ticket links only (no fake URLs, prices, or dates)
- ✅ Provide buying guidance without selling tickets
- ✅ Work well with zero verified links (empty state)
- ✅ Support multiple providers (Ticketmaster, SeatGeek, Vivid Seats)
- ✅ Optimize for SEO with proper schema and trust signals
- ✅ Scale easily as you add more artists and providers

## Three Essential Documents

### 1. ARTIST_PAGE_TEMPLATE_SYSTEM.md
**The Master Blueprint**: Complete specification covering architecture, schema design, component structure, SEO, and scalability roadmap.

**Start here** if you need to understand the full vision or modify the system.

### 2. ARTIST_PAGE_COMPONENTS.md
**The Component Library**: Reusable building blocks with HTML output examples, CSS classes, mobile patterns, and accessibility guidelines.

**Use this** when building or updating a specific component.

### 3. BEYONCE_REFERENCE_IMPLEMENTATION.md
**The Gold Standard Example**: Complete walkthrough of the Beyoncé page showing exactly how data flows from `catalog.json` through rendering to the final HTML.

**Use this** as a checklist when implementing a new artist page or troubleshooting issues.

---

## Quick Implementation Path

### Step 1: Prepare Artist Data
```json
// In catalog.json, add your artist to the artists array:
{
  "slug": "artist-name-slug",
  "name": "Artist Name",
  "short_description": "One-sentence overview",
  "factual_summary": "2-3 sentences about the artist",
  "why_demand_is_high": "Why fans care about their tours",
  "ticket_buying_notes": "Current tour status or guidance",
  "genres": ["Genre1", "Genre2"],
  "country": "Country",
  "official_website": "https://official-site.com/",
  "seo_title": "Artist Name Tickets | Verified Options",
  "meta_description": "Find verified [Artist] tickets...",
  "faq": [ /* optional custom FAQ */ ]
}
```

### Step 2: Add Provider Links
```json
// In catalog.json, add to ticket_links array:
{
  "link_id": "tm-artist-slug",
  "artist_slug": "artist-name-slug",
  "provider": "ticketmaster",
  "destination_type": "artist_page",
  "verified": true,
  "public_enabled": true,
  "affiliate_enabled": true,
  "last_checked_at": "2026-05-11"
}
```

### Step 3: Test Rendering
1. Visit `https://yoursite.com/artists/artist-name-slug`
2. Verify breadcrumb shows: Home > Artists > Artist Name
3. Verify hero section displays
4. Check provider panel shows Ticketmaster link
5. Verify empty state when no events exist

### Step 4: Verify SEO
1. Check title tag contains artist name + "Tickets"
2. Verify meta description displays
3. Validate Schema.org JSON-LD with validator
4. Check internal links work
5. Test on mobile

### Step 5: Monitor & Update
1. Track which artists get clicks
2. Monitor bounce rates
3. Check for broken provider links monthly
4. Update `last_checked_at` when verifying

---

## Key Principles

### 1. Verify Before Publishing
Don't show a link unless you can confirm it works and goes to the right place.

✅ **Good**: "Last verified 2026-05-11"  
❌ **Bad**: Linking to `/artists/artist` when it's just a placeholder  

### 2. Empty States Are Features
A page with no events is still valuable—it tells fans the artist exists and may tour soon.

✅ **Good**: "No event-specific links available yet. Check back soon or use verified provider links."  
❌ **Bad**: Showing fake "Coming Soon" placeholders

### 3. Trust Beats Traffic
One verified link is worth ten unverified ones. Don't compromise verification to add links.

✅ **Good**: Hiding a provider until destination is verified  
❌ **Bad**: Showing a link to a provider search page instead of artist page

### 4. Internal Linking Drives Engagement
Link to related guides, other artists, and how-it-works pages to reduce bounce rates.

✅ **Good**: "Learn more about comparing prices" link to `/guides/how-to-compare-concert-ticket-prices`  
❌ **Bad**: Isolated artist page with no onward navigation

### 5. Mobile First
30-50% of traffic is mobile. Test everything on phone.

✅ **Good**: Cards stack to 1 column, buttons are touch-sized (48px+)  
❌ **Bad**: Horizontal scrolling, tiny buttons, truncated text

---

## Common Tasks

### Adding a New Artist

1. Update `public/data/catalog.json`:
   ```json
   {
     "slug": "new-artist",
     "name": "New Artist",
     // ... other fields
   }
   ```
2. Add provider links to `ticket_links` array
3. Test at `/artists/new-artist`
4. Verify SEO and empty states

### Updating Provider Status

Change `public_enabled` to control visibility:
```json
{
  "link_id": "sg-artist-example",
  "provider": "seatgeek",
  "verified": true,
  "public_enabled": false  // Hide for now
}
```

### Adding Custom FAQ

Add to artist object in `catalog.json`:
```json
"faq": [
  {
    "question": "Where can I see [Artist] play?",
    "answer": "Check the verified ticket links on this page..."
  }
]
```

### Checking Link Status

1. Open `/artists/artist-slug`
2. Look for "Affiliate link" disclosure near provider buttons
3. Hover over button to see target URL
4. Click and verify it reaches the right provider

### Removing a Bad Link

Set `public_enabled: false` in the link object:
```json
{
  "link_id": "sg-broken-link",
  "artist_slug": "beyonce",
  "verified": false,
  "public_enabled": false  // This hides it
}
```

---

## File Structure

```
tourticketcompare/
├── ARTIST_PAGE_TEMPLATE_SYSTEM.md    (← You are here)
├── ARTIST_PAGE_COMPONENTS.md         (Component reference)
├── BEYONCE_REFERENCE_IMPLEMENTATION.md (Gold standard example)
├── public/
│   └── data/
│       └── catalog.json              (Artist & provider data)
├── functions/
│   ├── [[path]].js                   (Server-side routing & rendering)
│   └── api/
│       └── shows.js                  (Event data API)
└── public/
    └── app.js                        (Client-side rendering)
```

---

## Verification Checklist Template

Use this when adding a new artist:

```
Artist: _________________

□ Artist data complete in catalog.json
□ Genres and country accurate
□ Official website URL verified (HTTPS)
□ Factual summary proofread
□ Demand explanation relevant
□ SEO title compelling and under 60 chars
□ Meta description under 160 chars
□ Provider link destination verified
□ Provider link last_checked_at current
□ Page renders at /artists/{slug}
□ Empty state displays correctly
□ Breadcrumb shows all 3 levels
□ Provider button works and routes correctly
□ Internal links work (Guides, All Artists, etc.)
□ FAQ answers are helpful
□ No spelling errors
□ Mobile layout responsive
□ Title tag shows in browser
□ Schema.org validates
□ No fake or placeholder content
```

---

## Troubleshooting

### Page doesn't load
- [ ] Check slug format (lowercase, hyphens)
- [ ] Verify artist entry exists in catalog.json
- [ ] Check for JSON syntax errors

### Empty state shows but page looks broken
- [ ] This is expected when no events are available
- [ ] Provider panel should still show Ticketmaster link
- [ ] Empty state message should be helpful

### Provider button goes to wrong place
- [ ] Check `destination_type` is "artist_page"
- [ ] Verify provider link URL is correct
- [ ] Test in incognito to bypass caching

### SEO title not updating
- [ ] Check `seo_title` is set in catalog.json
- [ ] Clear browser cache
- [ ] View page source to verify injection

### Mobile layout broken
- [ ] Test on actual phone or device emulation
- [ ] Check that cards stack properly
- [ ] Verify buttons are touch-sized

---

## What's NOT Included

This system intentionally does NOT:
- ❌ Scrape tour dates from social media
- ❌ Display invented prices or fake availability
- ❌ Show placeholder or test URLs
- ❌ Make savings claims without verification
- ❌ Add Event schema without verified dates
- ❌ Use countdown timers or false urgency
- ❌ Hide affiliate relationships
- ❌ Send traffic to generic search results

---

## Next Steps

1. **Read** `ARTIST_PAGE_TEMPLATE_SYSTEM.md` for the full architecture
2. **Reference** `ARTIST_PAGE_COMPONENTS.md` when building components
3. **Study** `BEYONCE_REFERENCE_IMPLEMENTATION.md` to see how it all works
4. **Enhance** catalog.json with more artists following the Beyoncé pattern
5. **Test** each page thoroughly before going live
6. **Monitor** click-through rates and user feedback

---

## Questions?

Refer to:
- **"How do I add an artist?"** → This guide, "Adding a New Artist" section
- **"What should my SEO title be?"** → BEYONCE_REFERENCE_IMPLEMENTATION.md, "SEO Implementation"
- **"How should this component render?"** → ARTIST_PAGE_COMPONENTS.md
- **"What's the architecture?"** → ARTIST_PAGE_TEMPLATE_SYSTEM.md, Section 2

---

**Last Updated**: 2026-05-11  
**Current Version**: 1.0  
**Status**: Production Ready  
**Gold Standard**: Beyoncé Artist Page
