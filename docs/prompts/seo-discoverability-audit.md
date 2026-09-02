# Codex prompt — organic discoverability audit and remediation

A single, self-contained brief to paste into Codex (or any comparable agent with
browser + GitHub access) so it can audit TourTicketCompare's search
discoverability, diagnose it against the code that actually controls each
signal, and ship remediation in reviewable PRs.

## Before you paste it

1. **Grant the connections you want it to use.** Codex has no native Google
   Search Console, Google Analytics, Google Tag Manager or impact.com
   integration. Either give it API credentials in its environment, or drop
   exports in `artifacts/seo-inputs/` (gitignored) using the filenames the
   prompt's *Data intake contract* specifies. The prompt makes it declare what
   it actually reached before it analyses anything, so a missing source
   degrades the report instead of silently becoming invention.
2. **Decide the branch.** The prompt tells it to work on
   `codex/seo-discoverability-<date>` and open one PR per theme. Change that if
   you want a different convention.
3. **Expect it to ask.** Phase 0 ends with a capability report and a short list
   of blocking questions. That checkpoint is deliberate — answer it before
   letting it into Phase 3+.

Repo context it will read on its own: [CLAUDE.md](../../CLAUDE.md),
[SAFE_PUBLISHING_RULES.md](../../SAFE_PUBLISHING_RULES.md),
[ROUTE_INDEXABILITY_POLICY](../ROUTE_INDEXABILITY_POLICY.md),
[CONTENT_RULES](../CONTENT_RULES.md), [COMMERCIAL_FUNNEL](../COMMERCIAL_FUNNEL.md).

---

## ▼ START OF PROMPT — copy from here ▼

You are a senior technical SEO engineer with full-stack ability, working on a
live production site. You have a browser tool, a GitHub connection, and
possibly credentials for Google Search Console, Google Analytics 4, Google Tag
Manager and impact.com. Work autonomously, but stop at the checkpoints below.

## The goal

**Increase the number of qualified organic search entrances to
tourticketcompare.com that go on to produce a monetized outbound provider
click — without publishing a single page, claim, tag or link that breaks the
repository's publishing rules.**

That is one objective, not two. Traffic that cannot convert (queries we cannot
serve, pages with no ticket destination, markets with no affiliate lane) is not
success, and neither is a conversion rate improvement bought by shrinking the
audience. Judge every recommendation against the joint outcome.

Measure it on three instruments, in this order of authority:

1. **Google Search Console** — impressions, clicks, average position and CTR
   per query and per page. The only source of pre-click demand. Authoritative
   for "what are we eligible for and what are we losing".
2. **GA4 / first-party analytics** — organic landing page → `outbound_click`
   (and `provider_cta_view` → click) rate. Authoritative for "did the landing
   page do its job".
3. **impact.com** — actions and commission by campaign. Authoritative for
   "which of those clicks are worth anything". Note that Ticketmaster is a
   plain unmonetized link and can never appear here.

Define baselines from the real data at the start of the engagement. Do not
accept, invent, or carry forward any target number that you did not compute
from one of those three sources.

## The site, in one paragraph

TourTicketCompare is an independent, unofficial fan-facing ticket research site
for major live music tours: verified ticket links, buying guidance, and artist
watchlist pages. Cloudflare Pages + Pages Functions, **no build step** —
`public/` is served as-is, `functions/` is bundled by Cloudflare. All HTML
routes are rendered by `functions/[[path]].js`. Route surface is roughly 1,130
rendered URLs of which ~311 are indexable, across home, index, static, guide,
artist, city, venue and artist-city route types. Indexability is **derived from
data, never listed**: `functions/_route-indexability.js` and
`functions/_artist-indexability.js` hold the gates, and the router, the
sitemap, `llms.txt`, the internal-link audit and the surface monitor all read
those same modules. Read `docs/ARCHITECTURE.md` and
`docs/ROUTE_INDEXABILITY_POLICY.md` before forming any opinion about the index
surface.

## Non-negotiable constraints

Violating any of these invalidates the whole engagement. They are not
negotiable by you, by a clever workaround, or by an argument that it would help
rankings.

1. **Never invent data.** No tour, date, venue, price, availability, provider,
   URL, statistic or citation may appear anywhere — page copy, schema, a
   report, a PR body — unless it comes from a source already in the repository
   or from a source you can cite and I can independently check. If an analysis
   needs a number you do not have, say "unknown, blocked on X".
2. **Read `SAFE_PUBLISHING_RULES.md` and `docs/CONTENT_RULES.md` first and obey
   them literally.** No fake CTAs, no fabricated price comparisons, no claims
   about inventory, no filler written to hit a word count.
3. **Do not modify protected files outside an explicitly agreed scope:**
   `functions/api/out.js`, `functions/_middleware.js`, `functions/[[path]].js`,
   `functions/_route-metadata.js`, `public/_routes.json`,
   `public/data/events.json`, `artists.json`, `catalog.json`, anything under
   `functions/api/impact/`, and Cloudflare dashboard settings. `[[path]].js`
   and `_route-metadata.js` are where much of the SEO surface actually lives —
   so for those two, propose the diff and get my approval before you commit,
   rather than treating them as off-limits.
4. **Never hand-edit a generated file.** `public/data/blog-content.json`,
   `public/data/guides-content.json`, `functions/_guide-routes.generated.js`,
   `functions/_og-cards.generated.js`, `public/og/`,
   `data/content-provenance.json` and the generated blocks in
   `PROJECT_STATUS.md` are all build outputs. Edit the source (`content/blog/*.md`,
   `content/guides/*.md`) and run the generator (`npm run blog:build`,
   `npm run guides:build`, `npm run og:build`, `npm run content:provenance`).
5. **The site has a strict Content-Security-Policy with inline-script SHA-256
   allowlisting** (see the `default-src` header construction in
   `functions/[[path]].js`). Any new inline script, any new third-party tag,
   any new connect/frame origin will be silently blocked unless the CSP is
   updated in the same change. Never loosen the CSP to `unsafe-inline`. If a
   GTM change requires a new origin, say so explicitly and treat it as a
   reviewed change, not a tag-manager afterthought.
6. **No black-hat or grey-hat tactics, ever.** No doorway or near-duplicate
   pages, no keyword-stuffed programmatic expansion, no cloaking, no
   user-agent-conditional content, no schema describing things the page does
   not show, no fake FAQ or review markup, no paid links, no link exchanges, no
   expired-domain or PBN work, no scraping of any provider.
7. **Do not inflate the index count by weakening a gate.** The thresholds in
   `_route-indexability.js` exist because single-date and thin location pages
   restate the artist page. You may propose a threshold change only with
   evidence from GSC that the excluded pages have real, distinct demand — and
   the policy doc must change in the same PR.
8. **Validate before committing.** `npm run test:mvp` is required for anything
   touching automation, provider, redirect or affiliate logic. Otherwise match
   the check to the change: `npm run test:content`, `npm run test:providers`,
   `npm run test:routes`, `npm run test:quick`. Report results honestly —
   "checks passed" or the actual failure output, never "should pass".
9. **Small, isolated PRs.** One theme per PR, each independently revertible,
   each with the evidence for the change in the body. Never bundle a content
   change with a routing change.
10. **Do not create new governance or status documents.** Update the canonical
    ones. Your findings go in the single report file specified below.

---

## Phase 0 — Capability preflight (do this first, output before proceeding)

Establish what you can actually reach. Do not assume; test each one with a real
call and record the result.

| Source | How to test | If unavailable |
|---|---|---|
| Live site | Fetch `https://tourticketcompare.com/` and one artist, city, venue, artist-city and guide URL | Stop — nothing else is meaningful |
| GitHub repo | List branches on the repository | Stop |
| Search Console | Query the Search Analytics API for the property, or open the UI in the browser tool | Request exports (see contract below) |
| GA4 | Query the Data API for the property, or open the UI | Request exports |
| Google Tag Manager | Open the container, list tags/triggers/variables | Report as read-only unknown; do not guess at container contents |
| impact.com | Call the API with `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`, or open the UI | Note that conversion weighting is unavailable |

Also record: the GA4 measurement ID and GTM container ID as they appear in
`public/index.html`, which GSC property types exist (domain vs URL-prefix,
`www` vs apex, `.pages.dev` duplicates), and whether the sitemap is submitted
and its last read date.

**Output of Phase 0:** a capability table with a one-line evidence note per
row, plus every blocking question you need answered. Then stop and wait.

### Data intake contract (when API access is missing)

Ask me to place these in `artifacts/seo-inputs/` (gitignored), and read them
from there. Use exactly these names so your analysis is reproducible:

```
gsc-queries-16mo.csv        Queries × clicks, impressions, CTR, position
gsc-pages-16mo.csv          Pages × clicks, impressions, CTR, position
gsc-query-page-90d.csv      Query + Page pair export (needed for cannibalisation)
gsc-countries-90d.csv       Country breakdown
gsc-devices-90d.csv         Device breakdown
gsc-coverage-export.csv     Index coverage / page indexing export
ga4-landing-pages-90d.csv   Landing page × sessions, engagement, key events
ga4-events-90d.csv          Event name × count, by session default channel group
impact-actions-90d.csv      Actions by campaign/date
```

If a file is absent, every conclusion that depended on it is marked
`BLOCKED — needs <filename>`, and you carry on with the rest.

---

## Phase 1 — Baseline the served reality (browser + repo)

Crawl what Google actually receives, not what the code claims to send. Sample
at minimum: the homepage, 5 index pages, all 9 static/trust routes, 6 guides,
10 artist pages (include an empty-board artist such as one with zero upcoming
dates), 8 city pages, 8 venue pages, 8 artist-city pages (include both the
multi-date indexable case and the single-date `noindex,follow` case), plus
`/robots.txt`, `/sitemap.xml`, `/llms.txt` and a known 404.

For each sampled URL record, as served:

- HTTP status, final URL after redirects, and redirect chain length
- `<title>`, meta description, `<link rel="canonical">`, `<meta name="robots">`
- H1 and heading hierarchy; whether the primary answer is in the initial HTML
  or only after JavaScript (fetch with JS disabled and compare)
- JSON-LD blocks present, their `@type`, and whether they validate against
  Google's Rich Results Test and Schema.org — the codebase emits
  `Organization`, `WebSite`, `WebPage`, `CollectionPage`, `BreadcrumbList`,
  `FAQPage`, `ItemList`, `MusicEvent`, `Place`, `MusicVenue`, `Offer`,
  `Article`, `BlogPosting` and `HowTo`
- Open Graph and Twitter card tags, and whether the referenced OG image loads
- Core Web Vitals (field data from CrUX where available; lab via Lighthouse
  mobile), and the largest render-blocking resources
- Internal links out, and whether the page is reachable from the homepage in
  ≤3 clicks

Then run the repo's own instruments and reconcile them against your crawl:

```
npm run audit:indexable-surface     # rendered vs indexable, with exclusion reasons
npm run audit:internal-links        # orphan and lost-link detection
npm run audit:production-routes     # production HTML vs expected
npm run schema:validate
npm run report:link-coverage
npm run report:web-vitals
```

**Cross-checks that matter most** — each of these is a real failure mode for
this architecture, so test each one explicitly and report pass/fail:

- Every URL in `sitemap.xml` is 200 and `index,follow` as served. Any
  `noindex` URL in the sitemap is a defect.
- Every URL the router marks indexable is in the sitemap. A missing one is a
  lost impression.
- Canonicals are self-referencing on indexable routes and point at the apex
  origin, never at `*.pages.dev`. Confirm the `.pages.dev` production host is
  either blocked from indexing or canonicalises to the apex — this is a
  classic duplicate-index leak on Cloudflare Pages.
- `robots.txt` disallows nothing that the sitemap advertises.
- `lastmod` values come from `data/content-provenance.json` and are not
  uniformly stale or uniformly today. A wrong `lastmod` is worse than none.
- Single-date artist-city pages are `noindex,follow`, self-canonical, absent
  from the sitemap, and **still internally linked** (an unlinked `noindex` can
  never be re-crawled).
- Titles and descriptions are unique across the surface. Report every
  duplicate cluster with counts.
- Every indexable page renders at least one working ticket destination, or
  explain why the gate let it through.

---

## Phase 2 — Demand analysis (this is where the value is)

On-page hygiene is largely already handled here. The real opportunity is in
matching the demand GSC can see against the surface the repository can
legitimately produce. Produce each of the following as a ranked table with the
underlying numbers:

1. **Striking distance.** Queries at average position 5–20 with meaningful
   impressions. For each: the page currently ranking, what that page is missing
   relative to the intent, and the specific, rules-compliant change that would
   close it.
2. **High impressions, low CTR.** Queries where we are visible and not chosen.
   Distinguish a title/description problem from a SERP-feature problem (someone
   else owns the rich result) from an intent mismatch.
3. **Query → page mismatch and cannibalisation.** Queries whose clicks are
   split across two or more of our URLs, and queries landing on a weaker page
   than the one we would choose. Artist vs artist-city vs city vs venue overlap
   is the likely shape here.
4. **Unserved demand.** Query clusters with impressions but no dedicated page —
   and, critically, whether a page for them would be *legitimate* under the
   indexability policy and the data we hold. If serving a cluster would require
   inventing data or a thin page, say so and drop it. Distinguish clearly:
   (a) demand we could serve today with existing verified data, (b) demand that
   needs a new artist onboarded through the gated workflow, (c) demand we
   should not chase.
5. **Decay.** Pages that lost position or dropped out of the index over the
   window. Given that indexability is derived from upcoming dates, expect
   calendar-driven decay — quantify it, and assess whether the roster refill
   rate keeps pace. Cross-reference `npm run roster:forecast`.
6. **Non-branded vs branded split**, and the international picture: countries
   and languages with impressions we serve poorly, weighed against which
   affiliate lanes are even monetizable there (SeatGeek is US-centric; StubHub
   International is a distinct lane from StubHub US/Canada).
7. **Conversion weighting.** Join GSC landing pages to GA4 organic
   `outbound_click` rate and, where possible, impact.com actions. Produce a
   single ranked list of *pages worth improving*, ordered by
   `incremental clicks available × observed monetized click rate`. A page with
   big impressions and no working ticket destination ranks low, deliberately.
8. **Guide and content gaps.** Which of the 18 published guides earn search
   traffic, which do not, and which informational query clusters (fees,
   transfers, resale legitimacy, presale codes, delivery, refunds) are
   winnable given `docs/CONTENT_RULES.md`. Include the existing earned-backlink
   campaign in `docs/BACKLINK_CAMPAIGN.md` — assess whether it is producing
   referring domains, and do not propose anything it forbids.

---

## Phase 3 — Measurement integrity (GA4 / GTM)

Before recommending changes based on analytics, verify the analytics are
trustworthy. The site sends GA4 a deliberate *mirror* of first-party events and
deliberately withholds artist, city, venue, path, referrer and address from
GA4 — read `docs/COMMERCIAL_FUNNEL.md` before you call anything a bug. Check:

- `send_page_view: false` is set on the `gtag config` — confirm what actually
  fires the page view, and that it fires exactly once per navigation on this
  client-routed site.
- `outbound_click` fires on provider CTAs with the intended parameters, and is
  registered as a key event in GA4.
- GTM container: no duplicate GA4 tags, no orphaned triggers, no third-party
  tags that would breach CSP or the privacy stance.
- GSC is verified for every property variant, the sitemap is submitted, and
  Search Console is linked to GA4.
- Bot/self-referral filtering, internal traffic exclusion, and data retention
  set to the maximum available.
- IndexNow pings are running (`npm run indexnow:ping` and its workflow) — and
  note in your report that Google does not participate in IndexNow, so it is
  not a substitute for Search Console coverage.

Report every proposed GTM or GA4 change as a described change for me to apply
in the console, unless I explicitly gave you write access. Do not silently
publish a container version.

---

## Phase 4 — The plan (checkpoint: get approval before Phase 5)

Deliver one file, `reports/seo/<YYYY-MM-DD>-discoverability-audit.md`,
containing:

1. **Executive summary** — five bullets maximum, each with a number.
2. **Capability and evidence table** from Phase 0, including everything blocked.
3. **Baseline** — the metrics you will be judged against, with their source and
   capture date.
4. **Findings**, each with: what is wrong, the evidence (URL, screenshot,
   export row, or command output), the *file or module that controls it*, the
   estimated effect on the goal, and the confidence level. Separate
   **confirmed** from **hypothesis**.
5. **Ranked remediation plan** — scored by expected impact on the joint goal ÷
   effort, grouped into shippable PRs, each PR named and scoped with the
   validation command it must pass.
6. **Explicitly rejected ideas** — what you considered and dropped for rules,
   risk, or a bad effort/impact ratio. I want this section to be substantial;
   it is how I know you understood the constraints.
7. **What I must do myself** — console changes, credentials, editorial
   decisions, artist onboarding runs.
8. **Open questions and unknowns.**

Then stop. Do not open implementation PRs until I approve the plan.

## Phase 5 — Implementation

Work on `codex/seo-discoverability-<YYYY-MM-DD>`. One PR per theme, in the
approved order. For each PR:

- Make the smallest change that achieves the finding.
- Regenerate, never hand-edit, any generated artefact.
- Run the matching validation lane, and `npm run test:mvp` where the rules
  require it. Paste the real output in the PR body.
- PR body states: what changed, why (link the finding), which checks passed,
  what was deliberately not touched, and how we will know in 4–8 weeks whether
  it worked (which GSC/GA4 metric, on which pages).
- If a change touches `functions/[[path]].js` or `functions/_route-metadata.js`,
  post the diff for approval first.
- If implementing a finding turns out to require inventing data, a thin page,
  or a rules exception — stop and tell me. Do not build it and flag it later.

## How to disagree with me

If the goal as stated is wrong — for example if the data shows the constraint
is roster coverage and calendar decay rather than anything on-page, so SEO work
is not the highest-leverage thing here — say that plainly in the executive
summary, with the numbers, and still deliver the full audit. Do not quietly
narrow the scope, and do not pad the plan with low-value work to look thorough.

## ▲ END OF PROMPT — copy to here ▲

---

## Notes for the owner

- **Phase 0 is the load-bearing part.** Most agent SEO audits fail because the
  agent cannot reach Search Console, does not say so, and reconstructs
  plausible-looking query data from the site's own content. The capability
  table plus the `BLOCKED — needs <filename>` convention is what stops that.
- **The report goes in `reports/seo/`**, which does not exist yet and is
  outside the canonical documentation set — `scripts/validate-docs.mjs` skips
  `reports/`, so a generated audit file there will not trip `npm run docs:check`.
- **Nothing in the prompt authorises a change to the indexability gates.** If
  the audit's best idea is "index more pages", that argument has to arrive with
  GSC evidence and a policy-doc change, per constraint 7.
