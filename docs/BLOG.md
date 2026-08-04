# Blog and content authoring

How to write, edit, and publish blog posts on TourTicketCompare — from a browser, from a text editor, or from GitHub — without touching code.

Related: [CONTENT_RULES.md](CONTENT_RULES.md) for what may be published, [../SAFE_PUBLISHING_RULES.md](../SAFE_PUBLISHING_RULES.md) for the non-negotiables, [ROUTE_INDEXABILITY_POLICY.md](ROUTE_INDEXABILITY_POLICY.md) for how the indexability gates work elsewhere on the site.

---

## The short version

- **Posts are Markdown files in `content/blog/`.** One file, one post. The filename is the URL slug.
- **`content/blog/` is the source of truth.** `public/data/blog-content.json` is generated from it and should never be hand-edited.
- **Three ways to write:** the browser editor at `/admin`, `npm run blog:new` locally, or GitHub's own file editor. All three produce the same Markdown file.
- **`status: draft` means the post does not exist** — no page, no sitemap entry, no feed item, 404 on the URL. Set `status: published` when it is ready.

---

## Where content lives

| Content | Source | Edit it via |
|---|---|---|
| Blog posts | `content/blog/*.md` | `/admin`, a text editor, or GitHub |
| Topic guides | `public/data/guides-content.json` + `functions/_route-metadata.js` | Hand-edited (not yet migrated to Markdown) |
| Artist facts | `public/data/artists.json` | The gated artist workflows, never by hand |
| Event data | `public/data/events.json` | Automation only |

Only the blog is on the Markdown pipeline today. Migrating the 17 guides onto the same pipeline is a separate, deliberately un-started piece of work.

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

## Publishing

### From the browser (`/admin`)

1. Go to `https://tourticketcompare.com/admin` and sign in with GitHub.
2. Write the post. The form mirrors the front matter above, with a Markdown editor for the body.
3. Save. The editor commits the Markdown file to `main`.
4. `content-build.yml` compiles it, runs the full validation suite, and commits `public/data/blog-content.json`. Cloudflare deploys that commit.

The post is live a few minutes after you save — the compile step is what makes it appear, not the save itself.

### From a text editor

```bash
npm run blog:new -- "Why ticket fees appear so late"   # scaffolds a draft with valid front matter
# write the post, set status: published
npm run blog:build                                     # compile
npm run test:mvp                                       # full validation
git add content/blog public/data/blog-content.json && git commit && git push
```

### From GitHub directly

Create or edit a file under `content/blog/` in GitHub's web editor and commit to `main`. `content-build.yml` does the rest.

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

> **Unresolved security issue — read before creating the OAuth App.**
>
> Sveltia persists the signed-in account, **including the GitHub access token**, in `localStorage` under the key `sveltia-cms.user` (`WM.set` in the vendored bundle is a `localStorage` wrapper; the bundle contains no `sessionStorage` path). `localStorage` is shared by every page on an origin, and `tourticketcompare.com` also serves the public site with Google Tag Manager and Google Analytics on it. A GTM Custom HTML tag, a compromised GTM account, or any XSS anywhere on the apex could therefore read a long-lived token that can push to this repository — and a push to `main` auto-deploys.
>
> The token scope is `public_repo` rather than `repo`, so a leak cannot reach private repositories, but it can still push here. **Do not create the OAuth App until this is resolved** — the editor is inert without it, so nothing is exposed while it stays unconfigured. The durable fix is to serve the editor from its own origin (e.g. `admin.tourticketcompare.com`) so its storage is isolated from the public site. Tracked in `PROJECT_STATUS.md` → Active risks.

The editor is [Sveltia CMS](https://github.com/sveltia/sveltia-cms), vendored into `public/admin/sveltia-cms.js` so no third-party *script* origin appears in the CSP of a page that holds a repository token. (`font-src` does allow `cdn.jsdelivr.net`: the bundle loads Material Symbols from there, and an icon font that fails to load leaves every icon button rendering its ligature name as text. A font cannot execute.) It is inert until a GitHub OAuth App exists.

1. **Create a GitHub OAuth App** at <https://github.com/settings/developers> → *New OAuth App*.
   - Application name: anything, e.g. `TourTicketCompare content editor`
   - Homepage URL: `https://tourticketcompare.com`
   - **Authorization callback URL: `https://tourticketcompare.com/api/admin/callback`** — this must match exactly.
2. **Generate a client secret** and copy both values.
3. **Add two secrets in the Cloudflare Pages dashboard** (Settings → Environment variables → Production, *encrypted*):
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
4. Redeploy (any push to `main` will do) and open `https://tourticketcompare.com/admin`.

Until step 3 is done, `/admin` loads but signing in returns a 503 explaining exactly what is missing. That is deliberate: the editor fails closed.

### How access works

The editor holds no site credential. Signing in issues a token against **your own** GitHub account, so the ability to publish is exactly your write access to the repository. Revoking a person's repository access revokes their ability to publish, with nothing to clean up here.

- `/admin` is `noindex`, disallowed in `robots.txt`, and serves its own tightened Content-Security-Policy.
- `/api/admin/auth` only runs on the canonical host, so a preview or alias origin can never start a sign-in.
- The OAuth `state` is a random 256-bit value in an HttpOnly, `Secure`, `SameSite=Lax` cookie, checked and burned on callback.
- The client secret is used only in a server-to-server exchange and never reaches the browser.
- The access token is passed to the editor window and never stored, logged, or written to D1.

### Updating the editor

```bash
curl -sSL -o public/admin/sveltia-cms.js https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js
```

Strip the trailing `//# sourceMappingURL=` line, then load `/admin` and confirm sign-in and a test save still work before committing. The vendored copy is pinned deliberately: nothing auto-updates a bundle that can commit to the repository.

---

## Commands

```bash
npm run blog:new -- "Post title"   # scaffold content/blog/<slug>.md as a draft
npm run blog:build                 # compile content/blog -> public/data/blog-content.json
npm run blog:check                 # fail if the generated file is stale (CI guard)
npm run blog:self-test             # unit-test the parser and validators
npm run test:mvp                   # full validation suite (includes the two above)
```
