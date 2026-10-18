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

## Weekly editorial opportunities

`blog-ideas.yml` runs every Monday at 11:20 UTC and on manual dispatch. It
maintains one issue labelled `automation:blog-ideas`, with up to six ranked
recommendations. It reads committed events, artist eligibility, catalog provider
flags and the Markdown in both editorial collections. It never writes content,
ticket data, affiliate configuration or production data. An editor reviews each
idea and publishes through the existing content PR process.

Preview locally with `npm run blog:ideas`, or use
`npm run blog:ideas -- --json` for structured output. These modes do not contact
GitHub and do not have the issue's suggestion history. The scheduled
`node scripts/propose-blog-ideas.mjs --issue` uses only `GITHUB_TOKEN`, with
`contents: read` and `issues: write`; its first run creates the label and issue.
Later runs update that issue, reopening it if closed. Multiple labelled issues
or damaged history fail clearly rather than starting another report.

Discovery uses these bounded signals:

- At least two verified upcoming dates with a public on-sale in the last
  14 days or next 21 days. The sale must precede the concert; placeholder or
  ambiguous timestamps do not qualify.
- At least two upcoming dates with short explicitly named presale windows opening in the
  next 14 days, or just opened with at least two days remaining. Promotions,
  reserved/preferred tickets, long-running windows and unsafe names are excluded.
  Codes and eligibility rules are never inferred.
- At least three distinct nights at the same venue and city in the next
  90 days, each with two fresh, independently verified provider records.
- An existing artist sale article citing an exact event whose public on-sale
  passed after its last editorial update may be recommended for review and
  updating. Same-day timestamps do not establish an editorial gap.

Evidence requires an indexable, non-demoted artist, a non-held event, a checked
Ticketmaster exact-event source and verification within 30 days. Checked
comparison records additionally require matching URLs, fresh verification and
catalog public flags; production credentials, inventory and prices remain
unproven. `last_verified_at` means a recheck, so it is never treated as a new
announcement. Historical price changes and commercial analytics are not inputs.

The score weights buying intent (up to 26), timeliness (20), evidence (20),
usefulness (14), relevant internal routes (10), longevity (8) and overlap
penalties (up to −8). Scores are editorial rules, not keyword or traffic metrics.
Only scores of 70 or more qualify, with one recommendation per artist per run;
ties use the deadline and stable topic key. Fewer than six, including none, is a
valid result. The initial shortlist needs no external research; missing evidence
is listed so an editor knows what must be verified before writing.

Both published copy and drafts are checked for overlap using artist mentions,
related artists, filenames and title angles. Existing general guides are linked
as context; an artist-specific copy suppresses the new idea. This is deliberately
conservative, and an editor still checks originality. The issue retains 26 weeks
of compact topic keys plus the latest twelve titles: a repeated angle cools down
for 13 weeks, and a different angle for the same artist for four weeks. Re-runs
within the same UTC week update the same history entry. Preserve the hidden
`ttc-blog-ideas:v1` JSON block when editing the issue.

The workflow runs source/content validation and discovery/reporting tests before
updating the issue. Malformed source files, ambiguous issue identity, invalid
history or an active event corpus with no fresh trusted evidence fail the run and
leave the previous issue report unchanged. Automation health monitors this weekly
lane. Ordinary event expiry or a shortage of strong topics produces an explicit
empty shortlist. There are no AI API calls, provider lookups, D1 reads or new paid
services. Test with `npm run blog:ideas:test` (also in `test:mvp`).

## Claude article drafts (manual pilot; weekly mode disabled)

`blog-draft.yml` adds a separate **editorial PR stage** to the existing weekly
opportunities issue; discovery and deployment are unchanged. It never approves,
marks ready or merges an editorial PR. Every generated article explicitly has
`status: draft`, even after automated review passes. A human must decide whether
it is useful and substantiated before publication.

### Integration and budget

The [official Claude Code Action v1](https://github.com/anthropics/claude-code-action)
and its [current configuration](https://github.com/anthropics/claude-code-action/blob/main/docs/usage.md)
were reviewed for this implementation. It supports API-key authentication,
automation prompts and bounded turns, but its general tool-using agent is more
capability than this pilot needs. Instead, the script calls Anthropic's supported
Messages API directly (`POST https://api.anthropic.com/v1/messages`, version
`2023-06-01`) using Node's built-in fetch. No Claude CLI login, Claude GitHub App,
new npm dependency or additional research subscription is required.

The fixed model is `claude-haiku-4-5-20251001`. At most **two requests** are made:
one original draft (4,500 output tokens maximum), then a separate evidence review
(1,500 maximum). Each input is limited to 48,000 UTF-8 bytes including system
instructions. A conservative byte-based token estimate plus framing reserves the
request cost before sending; the combined reservation must fit **US$0.15 per
attempt**, using Haiku 4.5's US$1/M input and US$5/M output list rates. Actual
token usage and estimated dollars are reported in the artifact and successful
PR. This is an application estimate, not a provider billing cap; check current
Anthropic pricing and set a separate small workspace spend limit in Anthropic.
Typical costs should be cents; at the reservation limit five weekly attempts
would be US$0.75. GitHub Actions usage is separate.

There are no API retries, fallback models, tools, web search or paid research
services. Requests time out after 90 seconds and the job after 50 minutes; the
longer job budget covers the existing full-repository test and schema renderers.
Unavailable models/credentials, rate limits, malformed/truncated output,
unsupported claims or failed tests stop the attempt. A live attempt reserves a
unique `automation/blog-draft-YYYY-MM-DD` branch **before** model spending. The
reservation is retained on failure, including ambiguous request/PR timeouts, so
rerunning cannot spend again that UTC week. Do not delete a reservation to retry
without inspecting its run, branch, usage and any existing PR. An open editorial
PR also blocks new drafting, including human PRs detected by changed Markdown
filenames rather than titles; an automated PR created within the last seven days blocks it
even if subsequently closed or merged. Global workflow concurrency prevents
overlapping jobs. Historical PRs suppress repeat artist buying topics.

### Configure and test manually

After the implementation PR is reviewed and merged:

1. Add repository Actions secret **`ANTHROPIC_API_KEY`**, using an Anthropic
   Console API key from the workspace whose credits/budget you want to use.
   There is no extra Anthropic API secret parameter. Never paste the key into
   issue text, article files, workflow inputs or logs. A local Claude Code login
   does not authenticate this job.
2. Keep the existing **`TICKETMASTER_API_KEY`** Actions secret for current
   exact-event checks through the official Discovery API. With no usable key or
   Discovery ID, evidence explicitly says **not checked**; a provider request
   failure or identity mismatch aborts before drafting. No source crawling is
   performed. An API recheck is independent of the stored repository snapshot,
   **not corroboration by another publisher**, and never proves inventory.
3. Allow GitHub Actions to create pull requests. The job uses the existing
   `automation-identity` action and optional Automation App configuration, or
   `GITHUB_TOKEN`. Its permissions are contents/write, PRs/write, issues/read
   and actions/write. Actions/write only dispatches the existing Prelaunch
   Validation workflow because a `GITHUB_TOKEN`-created PR does not trigger PR
   CI automatically. No merge endpoint is used.
4. Run **Blog article draft** with `mode: preview`, issue **1538**. Preview reads
   the current managed issue and current trusted `main`, selects at most one
   candidate and makes no Claude calls. When `TICKETMASTER_API_KEY` is configured,
   preview also performs the same free current-event checks as live mode, without
   reserving the weekly slot. Mismatch errors identify the stored event and fields
   (not raw API response values). Fix or investigate those discrepancies before
   attempting live mode. Preview can run even while a failed live reservation exists.
   This rolling issue must describe the current
   UTC week; rerun discovery if it is stale. The workflow ignores a dispatch's
   selected branch and always checks out `main`.
5. Run `mode: mock` for a repeatable historical integration test of #1538. This
   uses frozen committed evidence and hand-written model responses dated
   2026-10-12 in a disposable copy. **No Claude generation, external fact-check,
   GitHub article PR or publication is proven by this test.** Local equivalent:
   `BLOG_DRAFT_MODE=mock npm run blog:draft`. The artifact includes
   `MOCK-article.md`, evidence, review and test results.
6. Run `mode: live`, issue **1538**, for the first real test while the managed
   recommendations are current. Inspect `blog-draft-report` and the resulting
   draft PR. A real successful run is needed before treating the model output
   quality, account/model access and end-to-end GitHub authentication as proven.

The historical #1538 mocked test selects a Greta Van Fleet date-and-ticket-options
guide for the future 2027 shows, rather than repeating the October presale
windows. Mico lacks sufficient comparable routes; the Malcolm Todd nights have
too little search runway; existing Metallica buying copy suppresses that topic.
Selection recomputes evidence using the existing discovery library and intersects
it with the current issue history. Issue prose is never model instructions.
The discovery score is not a demand or revenue signal. Buying guides need at
least three independently checked comparison dates surviving a 60-day runway
and three cities; night-choice articles need at least three dates surviving
42 days. These include time for review and search discovery. Weak or empty
shortlists produce no article. Search demand and affiliate operation still need
editorial judgement; no monthly-profit estimate is inferred.

### Evidence and human approval

The model receives only selected repository evidence, existing overlapping copy,
approved internal routes and the publishing rules. Fresh Ticketmaster API checks,
when performed, compare artist, exact event identity/URL, venue, city, local date,
timezone and event status. Public-sale/presale timestamps are kept as stored
evidence, not independently verified schedule claims. The initial pilot omits
all sale-window claims, codes, eligibility, package/venue rules, prices and
unsupported numeric assertions to avoid expired or speculative buying promises.

Deterministic checks reject invented citations/links/dates, unsafe Markdown,
duplicate topics, copied paragraphs, prohibited claims and attempts to publish.
A second Claude request reviews every material assertion against the evidence;
its claim audit may cite only supplied URLs and cannot invent an external check.
It is fallible, including omissions from a claim ledger or a false supported
verdict. Natural-language factual accuracy, originality, useful differentiation,
keyword overlap and current ticket-route operation remain **human checks**.
Reports retain the evidence snapshot, captured/check times, Markdown/evidence
hashes, usage and claim review. The PR lists citations, commercial purpose,
original recommendation, tests and outstanding editorial checks. Draft content
cannot render, be indexed or appear in sitemap/RSS/llms.txt.

On the article PR branch, after checking and editing the article:

```bash
# Human: set status: published and the actual publication date in the Markdown.
npm run blog:draft -- --prepare-approved greta-van-fleet-ticket-options
npm run blog:check
npm run test:mvp
npm run schema:validate
git diff --check
# Commit the reviewed Markdown and generated outputs on this PR branch.
```

The preparation command reuses `guides:build`, `blog:build`,
`content:provenance`, the final `guides:build`, and targeted `og:build`. Include
the new `public/og/blog-<slug>.png` and `functions/_og-cards.generated.js` when
publishing. Drafts have no page and need no social asset. Mark the PR ready only
after the generated outputs and normal CI pass, then merge it yourself.
Cloudflare Pages' existing `main` deployment serves the committed compiled JSON;
`content-build.yml` remains the rebuild mechanism for Markdown merges. Including
generated outputs in the reviewed PR makes publication independent of a later
bot rebuild. No second deployment pipeline has been added.

The automated publication test simulates human approval in a disposable copy:
a draft returns 404 and is absent from discovery outputs; the published compiled
article returns 200 with self-canonical, `index,follow`, BlogPosting, sitemap,
RSS, llms.txt and a generated OG card. This verifies the repository publication
contract, **not an actual Cloudflare deployment**.

### Enable weekly drafting only after a real manual test

Both repository Actions variables must explicitly equal `true`:

- **`BLOG_DRAFT_LIVE_PROVEN`**: owner confirms a real manual live draft PR was
  created and its quality/evidence/authentication were reviewed.
- **`BLOG_DRAFT_ENABLED`**: owner opts into weekly drafting. Unset or `false`
  disables it. Both variables are left unset by this implementation.

Optionally set **`BLOG_IDEAS_ISSUE`** to the managed issue number (default 1538).
Automatic mode runs only after the existing **Weekly blog opportunities** workflow
succeeds on upstream `main`, first run attempt only. It does not consume artifacts
or execute code from the triggering run. Set `BLOG_DRAFT_ENABLED=false` to stop
automatic drafting. Enabling it authorises at most one new draft PR per week,
not article approval, merge or unattended publication. Some weeks intentionally
produce nothing, and an outstanding editorial PR pauses the next week.

## Automated data stories

`npm run stories:build` writes a data story from committed event data, with no
AI call, network request or price input. The only story type so far is the
yearly touring map, `/blog/where-the-big-concert-tours-are-playing-in-<year>`:
announced dates on the tours the site tracks, counted by city, venue, country
and month with the same rules as the `/tours/<year>` hub (indexable artist,
upcoming, not cancelled or postponed, venue-local year).

It writes three files:

- `content/blog/<slug>.md`: a new post is `status: draft`. A re-run keeps the
  first `date` and any `status: published` a person set, and adds `updated`, so
  monthly refreshes land on one URL and its links accumulate.
- `reports/data-stories/<slug>/figures.json`: every number in the post.
- `reports/data-stories/<slug>/press-release.md`: a quote-free release draft.
  Nothing sends or posts it; an owner decides whether and where it goes.

The publish gate in `scripts/lib/data-stories.mjs` refuses, writing nothing,
when the year has fewer than 300 shows, 30 artists or 5 countries, when the
newest recheck is over 14 days old, or when fewer than three cities or venues
have 5+ dates. `npm run stories:check` runs the gate alone. Run
`npm run blog:build` after a refresh. Tests: `npm run test:data-stories`.

`npm run stories:build -- --story price-moves` writes
`/blog/how-resale-ticket-prices-moved-this-month`: for each site with a
listed-price lane (Vivid Seats, TicketNetwork, StubHub International), how many
upcoming dates its lowest listed price is lower, higher or within 2% of the
figure about 30 days earlier, from the daily rollup in production D1 (via
wrangler and `CLOUDFLARE_API_TOKEN`, or `--rows <file.json>` with a saved
query result). It prints counts only, never a price; each count compares one
date with itself on one site; sites are listed in a fixed order and never
compared. A site needs 50+ dates across 10+ artists to appear, and no site
clearing that writes nothing. It has no press release.

`npm run stories:build -- --story city-prices` writes
`/blog/same-tour-different-city-ticket-prices`: for the 10 tours with the most
priced cities, one site's lowest listed snapshot for the next date in each
city, with its capture time. It reads the current `provider_pricing_cache`
rows (D1 or `--rows`) and runs them through `attachApprovedMarketplacePrices`
with the `wrangler.toml` flags, so only figures a CTA button would print can
appear, and drops any snapshot over 72 hours old. Each tour uses one site (the
one pricing the most cities, ties in fixed order), one currency and its main
country; sites are never compared, and a city never takes a minimum across its
dates. A tour needs 8+ priced cities and the story needs 5 such tours. Printed
figures rely on the providers' off-site grant
([PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md), "Off-site use") and follow
its conditions.

Out of scope by policy: prices outside the city-prices story, cross-site comparisons
([PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md)), price-timing claims until
the evidence thresholds are met, presale window counts (Ticketmaster's lists mix
VIP packages and card offers), and any claim about the whole concert market.

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
| `author` | no | Defaults to `TourTicketCompare`, and the build rejects any other value: bylines credit the site (see `docs/CONTENT_RULES.md` → Voice and Attribution). The BlogPosting `author` is the Organization node. |
| `related_guides` | no | Guide slugs without the `/guides/` prefix. Must exist. Each guide named here also links back to the post, under "From the blog" (newest three posts per guide). |
| `related_artists` | no | Artist slugs. Must exist in `public/data/artists.json`. Each artist named here also links back to the post from its artist page (newest three posts per artist). The first three named artists that are indexable and have upcoming shows also get a ticket-routes panel above the post body (date board, price guide when live, next indexable city pages; links only, no prices). |
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
| `comparison_providers` | no | Exactly two approved ticket sites (`ticketmaster`, `seatgeek`, `vivid-seats`, `ticketnetwork`, `ticket-liquidator`, `stubhub-international`). Adds a block of up to eight upcoming dates, one per artist, with a checked event link on both sites, each behind the same gate as that site's event-card button. Use it on a guide that compares those two sites. |
| `howto` | no | `name`, `description`, and `steps` of `name`/`text`. Published as HowTo structured data, so only for a guide that genuinely walks through steps the page covers. |

Body rules match the blog's: prose before the first heading becomes the intro, `##` opens a section, a single `#` is rejected, images are rejected, links must be site paths or https URLs. A published guide additionally needs a `## FAQ` section written as `**bold questions**` followed by plain answers — the router turns it into the page's FAQPage structured data.

Guide links to `/guides/…`, `/artists/…` and `/blog/…` are resolved at build time. Any other site path must be in the fixed list `INTERNAL_LINK_EXACT` in `scripts/build-guide-content.mjs` (for example `/compare-concert-ticket-prices`, `/on-sale`, `/currency-converter`). Add a new top-level route there before a guide can link to it.

A guide about a specific ticket site should carry the site's name in its slug (`ticketmaster`, `seatgeek`, `vivid-seats`, `stubhub`, `ticketnetwork` or `stubhub-international`). The router then lists it in the "More on <site>" block of every other guide about that site, and lists theirs on it. `docs/ARCHITECTURE.md` → Derived cross-links has the details.

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
