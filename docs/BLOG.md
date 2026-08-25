# Blog and content authoring

How to write, edit, and publish the two editorial collections on TourTicketCompare — **blog posts** and **buying guides** — from a browser, from a text editor, or from GitHub, without touching code.

Related: [CONTENT_RULES.md](CONTENT_RULES.md) for what may be published, [../SAFE_PUBLISHING_RULES.md](../SAFE_PUBLISHING_RULES.md) for the non-negotiables, [ROUTE_INDEXABILITY_POLICY.md](ROUTE_INDEXABILITY_POLICY.md) for how the indexability gates work elsewhere on the site.

---

## The short version

- **Posts and guides are Markdown files**, in `content/blog/` and `content/guides/`. One file, one page. The filename is the URL slug.
- **Those two directories are the source of truth.** `public/data/blog-content.json`, `public/data/guides-content.json` and `functions/_guide-routes.generated.js` are generated from them and must never be hand-edited.
- **Three ways to write:** the browser editor at `/admin`, `npm run blog:new` / `npm run guides:new` locally, or GitHub's own file editor. All three produce the same Markdown file.
- **`status: draft` means the page does not exist** — no route, no sitemap entry, no `llms.txt` line, no feed item, 404 on the URL. Set `status: published` when it is ready.
- **Two dates you never type.** A guide's "Updated" date is derived from a fingerprint of its published copy, and a source's "link checked" date is stamped by the nightly automation. See *Dates and what they claim* below.

---

## Where content lives

| Content | Source | Edit it via |
|---|---|---|
| Blog posts | `content/blog/*.md` | `/admin`, a text editor, or GitHub |
| Topic guides | `content/guides/*.md` | `/admin`, a text editor, or GitHub |
| Artist facts | `public/data/artists.json` | The gated artist workflows, never by hand |
| Event data | `public/data/events.json` | Automation only |

Both editorial collections are on the Markdown pipeline. Artist and event data are not, and are not editable from the CMS by design — they are gated by their own verification workflows.

---

## Writing a post

### Front matter

Every post opens with a YAML block between `---` fences.

```yaml
---
title: Why ticket fees appear so late in checkout
seo_title: Why fees appear late
description: A full sentence, 50-160 characters, written for the search result snippet under the link.
summary: One or two sentences, shown on the blog index card and as the lead paragraph at the top of the post.
date: 2026-08-14
updated: 2026-09-02
status: published
tags:
  - ticket-prices
related_guides:
  - concert-ticket-fees-explained
related_artists:
  - harry-styles
sources:
  - label: Provider fee schedule
    url: https://example.com/fees
---
```

| Key | Required | Notes |
|---|---|---|
| `title` | yes | The page H1. Under 70 characters. |
| `description` | yes | Search snippet. 50-160 characters, enforced. |
| `summary` | yes | Index card text and the page's lead paragraph. |
| `date` | yes | `YYYY-MM-DD`. Publication date. |
| `seo_title` | no | Shorter browser-tab and search title. ` \| TourTicketCompare` is appended, so keep this to 40 characters. Defaults to `title`. |
| `updated` | no | `YYYY-MM-DD`, not earlier than `date`. Only set it when revising a published post. |
| `status` | no | `published` or `draft`. Defaults to `published`; the `/admin` editor and `npm run blog:new` default to `draft`. |
| `tags` | no | Lowercase hyphenated slugs. |
| `author` | no | Defaults to the editorial team byline. |
| `related_guides` | no | Guide slugs without the `/guides/` prefix. Must exist. |
| `related_artists` | no | Artist slugs. Must exist in `public/data/artists.json`. |
| `sources` | no | `label` + https `url` pairs. Rendered as a Sources section and as schema citations. |

### Body

Plain Markdown below the front matter.

- Text before the first heading becomes the intro paragraph.
- `## ` opens a section, `### ` opens a subsection.
- **Do not use a single `#`** — the title is already the page H1, and the build rejects it.
- `**bold**`, `*italic*`, `- ` bullet lists, and `|` tables are supported.
- Links must be site paths (`/guides/...`, `/artists/...`, `/blog/...`, `/about`) or `https://` URLs.
  - Guide, artist, blog-post and blog-tag targets are **resolved** at build time, so a typo fails the build instead of shipping a dead link. A published post may not link to a draft.
  - City and venue targets (`/cities/...`, `/venues/...`) are **shape-checked only**. Those routes are calendar-dependent — they drop below their threshold as dates pass and then 301 to a sensible parent — so resolving them would make the build fail on ordinary event expiry. Prefer linking to the artist page.
- Images are not supported by the renderer and are rejected by the build.

---

## Writing a guide

Guides live in `content/guides/`. Same file shape as a post, different front matter.

```yaml
---
title: How to Compare Event Ticket Prices
h1: How to Compare Event Ticket Prices
description: A full sentence, 50-160 characters, written for the search result snippet.
status: published
date_published: 2026-07-14
sources:
  - name: Rule on Unfair or Deceptive Fees
    publisher: US Federal Trade Commission
    url: https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions
    last_checked: 2026-07-14
howto:
  name: How to Compare Event Ticket Prices
  description: A practical method for comparing live-event ticket totals.
  steps:
    - name: Match the exact event
      text: Confirm event name, date, venue, city, and session on every listing.
---
```

| Key | Required | Notes |
|---|---|---|
| `title` | yes | The search-result headline. ` \| TourTicketCompare` is appended automatically when the two fit in 60 characters, so leave the suffix off. |
| `h1` | yes | The heading on the page and the link text everywhere the guide is listed. Under 70 characters. |
| `description` | yes | Search snippet and page lead. 50-160 characters, enforced. |
| `status` | no | `published` or `draft`. Defaults to `draft`. |
| `date_published` | to publish | `YYYY-MM-DD`. Optional while a guide has never been published; required to publish, and fixed for good once it has. |
| `sources` | 2+ to publish | `name`, `publisher`, https `url`, and `last_checked`. |
| `howto` | no | `name`, `description`, and `steps` of `name`/`text`. Published as HowTo structured data, so only for a guide that genuinely walks through steps the page covers. |

Body rules match the blog's: prose before the first heading becomes the intro, `##` opens a section, a single `#` is rejected, images are rejected, links must be site paths or https URLs. A published guide additionally needs a `## FAQ` section written as `**bold questions**` followed by plain answers — the router turns it into the page's FAQPage structured data.

### Dates and what they claim

Four dates appear around a guide and only two of them are yours to type.

| Date | Who sets it | What it claims |
|---|---|---|
| `date_published` | you, once | The day the guide first went live. Recorded in `data/content-provenance.json` at first publication and immutable afterwards — the build fails if the file and the ledger disagree. |
| "Updated" (`lastmod`) | `npm run content:provenance` | Derived from a fingerprint of the published copy. It moves when the words move, and never because a file was touched, a dependency bumped, or a link was re-checked. Nobody types it, and it is not a CMS field. |
| `last_checked` on a source | you | A person re-read that source and confirmed the guide still describes it correctly. Move it when you have actually re-read the page. |
| "link checked" on a source | the nightly audit | Only that the URL still resolved. Stored in `data/guide-source-link-checks.json`, never in the Markdown, and labelled differently on the page precisely so an automated 200 cannot read as an editorial review. |

### Withdrawing a guide

A published guide is a live URL. Setting it back to `draft`, renaming its file, or deleting it would 404 that URL, so the build refuses all three unless `OLD_GUIDE_REDIRECTS` in `functions/_route-metadata.js` carries an entry sending the old path to a published guide. That is a deliberate code change, outside the CMS — which is also why the Guides collection has its delete button switched off.

`/guides/how-to-compare-concert-ticket-prices` is a further exception: the router keeps a standalone copy of its metadata as a render fallback, so it cannot be drafted, renamed or deleted at all.

## Publishing

### From the browser (`/admin`)

1. Go to `https://admin.tourticketcompare.com/admin` and sign in with GitHub. (The editor is not served from the apex — see the setup section for why.)
2. Write the post. The form mirrors the front matter above, with a Markdown editor for the body.
3. Save. The editor commits the Markdown file to `main`.
4. `content-build.yml` compiles it, refreshes provenance, runs the full validation suite, proves the diff touches nothing but its four generated files, and commits them. Cloudflare deploys that commit.

The page is live a few minutes after you save — the compile step is what makes it appear, not the save itself. If validation fails nothing is committed: the Markdown sits on `main` and the site keeps serving the last good build, with the failure on the Actions run.

### From a text editor

```bash
npm run blog:new -- "Why ticket fees appear so late"   # scaffolds a draft post
npm run guides:new -- "How to check a resale listing"  # scaffolds a draft guide

# write it, then set status: published (and date_published, for a guide)
npm run blog:build && npm run guides:build             # compile
npm run content:provenance                             # derive the Updated date
npm run test:mvp                                       # full validation
git add content public/data data functions/_guide-routes.generated.js && git commit && git push
```

### From GitHub directly

Create or edit a file under `content/blog/` or `content/guides/` in GitHub's web editor and commit to `main`. `content-build.yml` does the rest.

---

## What the build enforces

`npm run blog:build` refuses to write anything if a post breaks a rule. It checks:

- Required front-matter keys are present, and no unknown key is silently ignored.
- Title, search-title, and description lengths fit their search-result budgets.
- Dates are valid ISO dates and `updated` is not before `date`.
- Every `related_guides`, `related_artists`, and guide/artist/blog body link resolves to a real page, and no published post links to a draft. City and venue links are shape-checked only (see above).
- No embedded images.
- No claim the site cannot support — `cheapest`, `lowest price`, `guaranteed availability`, `sold out`, `selling fast`, and similar. This is a blunt substring check on purpose. If it fires on a sentence that was actually fine, rephrase rather than working around it.

`npm run blog:check` (wired into `npm run test:mvp` and PR validation) fails if `public/data/blog-content.json` does not match `content/blog/` — the same staleness guard the event data has.

---

## Indexability

Gates live in `functions/_blog.js` and are shared by the router, sitemap, `llms.txt`, and the RSS feed, so a page cannot disagree with the sitemap about whether it should be indexed.

| Route | Renders when | Indexed when |
|---|---|---|
| `/blog` | always | at least one indexable post exists |
| `/blog/<slug>` | the post is `published` | the body is 300+ words |
| `/blog/tags/<tag>` | at least one published post carries the tag | two or more **indexable** posts carry it |

A post or tag page below its threshold still returns 200 with a self-referencing canonical and stays linked — it is `noindex,follow`, not hidden. It enters the index automatically once it clears the bar. This mirrors how single-date artist-city pages are handled.

`/blog/rss.xml` carries the same posts the sitemap does. Drafts and thin posts are excluded from both.

---

## Setting up the `/admin` editor (one-time, owner)

The editor runs on **its own hostname**, `admin.tourticketcompare.com`, not on the apex. That is a security boundary, not cosmetics.

Sveltia persists the signed-in account — **including the GitHub access token** — in `localStorage` under `sveltia-cms.user` (`WM.set` in the vendored bundle is a `localStorage` wrapper; the bundle has no `sessionStorage` path). `localStorage` is shared by every page on an origin, and the apex serves the public site with Google Tag Manager and Analytics on it. An editor on the apex would put a repository-write credential within reach of any third-party tag or any XSS anywhere on the site — and a push to `main` auto-deploys. A separate hostname gives the editor its own storage partition.

Two rules keep the origins apart, both enforced in `functions/_middleware.js` and asserted by the smoke suite:

- The admin host serves **nothing** except `/admin`, `/admin/*` and `/api/admin/*`. Every other path 301s to the apex, so no public page — and therefore no analytics or tag-manager script — ever runs on that origin. It also serves its own `robots.txt` with `Disallow: /`.
- No other host serves the editor. `/admin` and `/api/admin/*` return 404 on the apex, on preview hosts, and on `*.pages.dev`.

The token scope is `public_repo` rather than `repo`, so even a leaked token cannot reach private repositories. If this repository is ever made private that must change to `repo`, and the storage question should be revisited first.

### Steps

1. **Add the hostname to the Cloudflare Pages project.** Pages → `tourticketcompare` → *Custom domains* → *Set up a custom domain* → `admin.tourticketcompare.com`. Cloudflare adds the DNS record for you when the zone is on Cloudflare. It is the same Pages project — there is nothing extra to deploy.
2. **Create a GitHub OAuth App** at <https://github.com/settings/developers> → *New OAuth App*.
   - Application name: anything, e.g. `TourTicketCompare content editor`
   - Homepage URL: `https://admin.tourticketcompare.com`
   - **Authorization callback URL: `https://admin.tourticketcompare.com/api/admin/callback`** — this must match exactly.
3. **Generate a client secret** and copy both values.
4. **Add two secrets in the Cloudflare Pages dashboard** (Settings → Environment variables → Production, *encrypted*):
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
5. Redeploy (any push to `main` will do) and open `https://admin.tourticketcompare.com/admin`.

Until step 4 is done, the editor loads but signing in returns a 503 explaining exactly what is missing. That is deliberate: it fails closed.

### How access works

The editor holds no site credential. Signing in issues a token against **your own** GitHub account, so the ability to publish is exactly your write access to the repository. Revoking a person's repository access revokes their ability to publish, with nothing to clean up here.

- `/admin` is `noindex`, disallowed by the admin origin's `robots.txt`, and serves its own tightened Content-Security-Policy.
- `/api/admin/auth` runs **only** on the admin host, so a token can never be issued against the apex or a preview origin.
- The OAuth `state` is a random 256-bit value in an HttpOnly, `Secure`, `SameSite=Lax` cookie, checked and burned on callback.
- The client secret is used only in a server-to-server exchange and never reaches the browser.
- The access token is passed to the editor window and never stored, logged, or written to D1 by this site's own code.
- `font-src` allows `cdn.jsdelivr.net`: the bundle loads Material Symbols from there, and an icon font that fails to load leaves every icon button rendering its ligature name as text. A font cannot execute; no third-party *script* origin is permitted.

### Updating the editor

```bash
curl -sSL -o public/admin/sveltia-cms.js https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js
```

Strip the trailing `//# sourceMappingURL=` line, then load `/admin` and confirm sign-in and a test save still work before committing. The vendored copy is pinned deliberately: nothing auto-updates a bundle that can commit to the repository.

---

## Commands

```bash
npm run blog:new -- "Post title"    # scaffold content/blog/<slug>.md as a draft
npm run blog:build                  # compile content/blog -> public/data/blog-content.json
npm run blog:check                  # fail if the generated file is stale (CI guard)
npm run blog:self-test              # unit-test the parser and validators

npm run guides:new -- "Guide title" # scaffold content/guides/<slug>.md as a draft
npm run guides:build                # compile content/guides -> guides-content.json + the route module
npm run guides:check                # fail if either generated file is stale (CI guard)
npm run guides:self-test            # unit-test the validators, the ledger and the emitters
npm run guides:validate             # route/content/redirect/sitemap/llms.txt drift check

npm run content:provenance          # derive every page's Updated date from its copy
npm run content:cms-contract        # every persisted key has a CMS field, and every file round-trips
npm run test:mvp                    # full validation suite (includes all of the above)
```
