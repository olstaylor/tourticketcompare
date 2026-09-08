# Venue images

Why this site carries photographs of buildings and not of people, and what has
to be true before a photo is published.

Implemented by [`scripts/build-venue-images.mjs`](../scripts/build-venue-images.mjs)
over [`data/venue-images.json`](../data/venue-images.json). **Change the registry
and this document together.**

Live counts belong in `PROJECT_STATUS.md`, not here.

---

## The rule

**Venue exteriors only. No photographs of people — artists least of all.**

Two separate permissions are needed to publish a photograph of a person
commercially, and a licence only settles one of them:

1. **Copyright**, held by the photographer. A Creative Commons licence or public
   domain status settles this.
2. **Personality rights** (the right of publicity, and false endorsement under
   the Lanham Act), held by the subject. A CC licence does not touch these.
   Wikimedia Commons says so directly in
   [Commons:Photographs of identifiable people](https://commons.wikimedia.org/wiki/Commons:Photographs_of_identifiable_people):
   the licence means the *copyright owner* has waived certain rights, and
   commercial use of a photo of an identifiable person "usually requires
   consent" regardless.

This site is commercial — it carries affiliate links and earns commission — and
it tells every visitor, on every page, that it is "independent, unofficial — not
affiliated with any artist, venue, promoter, or ticketing platform." An artist's
photograph beside a "Check prices" affiliate button argues the opposite of that
disclaimer, and it is the exact fact pattern a false-endorsement claim is built
from. The stock alternative is no better: Getty and Shutterstock license
celebrity photography as **editorial use only**, which excludes use that helps
sell something.

Buildings have no personality rights. That is the whole reason this lane exists
and stops where it does.

## What disqualifies a photo

Rejections are as much a part of the review as acceptances. A candidate is
rejected when it shows:

- **An identifiable member of the public in the foreground.** Distant, incidental
  pedestrians in a street scene are fine; a face the viewer reads as a subject is
  not.
- **Artist or tour advertising on the building.** A tour poster on the facade
  puts an artist's name and image on an affiliate page and implies exactly the
  association the disclaimer denies. Two otherwise good photos were rejected on
  this ground alone.
- **Superseded branding.** A photo of the right building under a former name
  reads as the wrong building to a visitor who came looking for the current one.
- **Anything that is not that venue.** Keyword search is unreliable — an early
  pass returned a photo of Chicago's Rizal Center for the United Center. Every
  photo is looked at before it enters the registry.

## What every entry must carry

`scripts/build-venue-images.mjs --check` fails the build unless each entry has:

| Field | Why |
|---|---|
| `alt` | Written from looking at the photo, long enough to describe it. A restatement of the venue name describes no image. |
| `credit.author` | CC BY and CC BY-SA require attribution. This is a licence term, not decoration. |
| `credit.licence` | Must permit commercial reuse: CC0, public domain, CC BY, or CC BY-SA. A non-commercial licence is rejected outright. |
| `credit.licence_url` | So the reader can check the terms. |
| `credit.source_url` | The Commons file page the photo came from. |
| `source_image_url` | A direct `upload.wikimedia.org` file URL, so the origin is auditable. |

The check also fails on a binary in `public/img/venues/` with no registry entry,
because that is an unattributed image sitting on the public site, and on a
manifest whose credit has drifted from the registry, because that would
attribute the wrong photographer.

## Share-alike

Resizing is an adaptation, so the published derivative of a **CC BY-SA** source
carries the same licence. The credit line names the licence on the page, which
is what that obligation requires here. It does not make the surrounding page
share-alike — a page that includes a work is a collection, not an adaptation of
it.

## How the pipeline runs

```
data/venue-images.json                curated by a human, one entry per photo
  -> npm run venues:images:fetch      downloads, resizes to 960px wide WebP
  -> public/img/venues/<slug>.webp    the published derivative (committed)
  -> functions/_venue-images.generated.js   read by the router
```

Both outputs are generated; never hand-edit either. The binaries are **committed
rather than fetched at deploy time** deliberately: the source is someone else's
site, so a build should not depend on their uptime, and an upstream re-upload
must not be able to change what this site serves without review.
`--check` runs in CI and touches no network.

## Rendering

One photo per venue page, directly under the lead. It is **not** lazy-loaded:
there is exactly one image and it sits high on the page, so it is the likely LCP
element and deferring it would delay the paint the metric measures. `width` and
`height` always come from the real file, so the space is reserved and the page
does not shift.

A venue with no reviewed photo renders no figure at all — not a placeholder, not
an empty frame.

## Artist and city images

Neither exists, and artist photography is not a backlog item — it is ruled out
above. If city photography is ever wanted, it inherits this document's rules
whole: buildings and skylines, no identifiable people, full attribution, and a
look at every candidate before it ships.
