# Impact Publisher Tag Test (internal)

## Purpose

`/internal/impact-tag-test` is a noindex, token-gated diagnostic route used
to compare the Ticketmaster Impact Publisher Tag and the SeatGeek Impact
Publisher Tag on a single page **without** changing public CTA behaviour.

Ticketmaster production tracking is the known-good baseline. This page is a
diagnostic helper for evaluating SeatGeek coexistence; it is not the source of
truth for production attribution and must not be used to conclude that
Ticketmaster production tracking is broken.

The route is:

- Excluded from navigation, the sitemap, and `robots.txt` (`Disallow: /internal/`).
- Marked `noindex,nofollow` via `<meta>` and `X-Robots-Tag`.
- 404 unless `?token=<value>` matches `env.IMPACT_TAG_TEST_TOKEN`.
- Not linked from any public page.

Production pages are unchanged. The SeatGeek Publisher Tag is loaded **only**
on this route, via a separate global (`window.impactStatSG`) to reduce the risk
of colliding with the existing site-wide Ticketmaster tag (`window.impactStat`).
Do not add SeatGeek globally based on href snapshots alone.

## Attribution interpretation rules

Publisher Tags may transform links at page load, at click time, through visible
query decoration, through a redirect chain, or in a way that is confirmed only
by Impact dashboard reporting. A raw link that does not visibly change in the
2-second snapshot window is therefore **not** enough evidence to conclude that
attribution is failing. Treat the table as a local snapshot aid, then verify
real click handling and dashboard reporting.

Keep the `/api/out` controls as a fallback/reference path. They are expected to
stay untouched by client-side tags and remain useful for comparing the existing
server-side redirect path against raw Publisher Tag behaviour.

## Required environment variable

| Variable | Required | Description |
|---|---|---|
| `IMPACT_TAG_TEST_TOKEN` | yes | Any high-entropy string. The route returns 404 unless the URL `?token=` matches this value byte-for-byte. If the variable is unset or empty, the route is fully inaccessible. |

Set as a Cloudflare Pages environment variable on the appropriate environment
(preview, production, or both). Do not commit the value to the repository.

## Optional environment variables

| Variable | Purpose |
|---|---|
| `IMPACT_SEATGEEK_PUBLISHER_TAG_URL` | Full https URL of the SeatGeek Impact Publisher Tag SDK. Must point to `*.impactcdn.com` or `*.impact.com`. If unset or invalid, the SeatGeek tag is not loaded and the page surfaces a clear warning. Can be overridden for one internal request with `?sgTagUrl=`. |
| `IMPACT_TAG_TEST_SEATGEEK_URL` | Single raw `https://seatgeek.com/...` URL used as the raw-SeatGeek test anchor when no `?sgUrl=` query is supplied. Validated server-side; non-SeatGeek hosts are rejected. |
| `IMPACT_TAG_TEST_SEATGEEK_SHOW_ID` | A `showId` matching an event in `public/data/events.json`. Used to render the `/api/out?showId=...&provider=seatgeek` control link when no `?sgShowId=` query is supplied. |

If the SeatGeek tag URL is not configured and no valid `?sgTagUrl=` override is
provided, the page still renders and runs; only the SeatGeek tag bootstrap is
skipped, with a visible warning.

## Per-request overrides (query parameters)

| Parameter | Effect |
|---|---|
| `token` | **Required.** Validates against `IMPACT_TAG_TEST_TOKEN`. |
| `sgUrl` | Overrides `IMPACT_TAG_TEST_SEATGEEK_URL` for one request. Must be a `https://seatgeek.com/...` URL. |
| `sgTagUrl` | Overrides `IMPACT_SEATGEEK_PUBLISHER_TAG_URL` for one request. Must be an `https://*.impactcdn.com/...` or `https://*.impact.com/...` SDK URL. The route-scoped CSP allows only the validated origin. |
| `sgShowId` | Overrides `IMPACT_TAG_TEST_SEATGEEK_SHOW_ID` for one request. Must match an event id in `events.json`. |

## What the page renders

Four labelled links (each missing one is replaced by a disabled explanatory
note — no fake links are ever rendered):

1. **Raw Ticketmaster direct link** — picked server-side from the first event
   in `events.json` with a valid `ticketmaster_url`.
   `data-provider="ticketmaster"`, `data-test-link="raw-ticketmaster"`.
2. **Raw SeatGeek direct link** — from `?sgUrl=` or
   `IMPACT_TAG_TEST_SEATGEEK_URL`. Validated as `https://seatgeek.com`.
   `data-provider="seatgeek"`, `data-test-link="raw-seatgeek"`.
3. **`/api/out` Ticketmaster control** — `/api/out?showId=<sample>&provider=ticketmaster`.
   `data-provider="ticketmaster"`, `data-test-link="out-ticketmaster"`.
4. **`/api/out` SeatGeek control** — `/api/out?showId=<sgShowId>&provider=seatgeek`,
   if a showId is supplied. The redirect itself only succeeds when SeatGeek and
   Impact SeatGeek program credentials are configured server-side.
   `data-provider="seatgeek"`, `data-test-link="out-seatgeek"`.

Below the links, a diagnostic table renders one row per `[data-test-link]`
anchor with these columns:

| column | meaning |
|---|---|
| `label` | The anchor's visible text. |
| `data-provider` | `ticketmaster` or `seatgeek`. |
| `data-test-link` | `raw-*` (expect transformation) or `out-*` (expect untouched). |
| `initial href host` | Host parsed from the href on `DOMContentLoaded`. |
| `post-load href host` | Host parsed from the href ~2s later. |
| `initial full href` | Full initial href, truncated with the full value in a copyable `<details>`. |
| `post-load full href` | Full post-load href, same truncated/copyable layout. |
| `host changed` | `yes` if the parsed host differs between snapshots. Useful context only; a host change is not required for a pass. |
| `full href changed` | `yes` if the full href string differs between the two snapshots. |
| `recognised params` | List of recognised affiliate query keys detected on the post-load href (see below). |
| `added params` | Generic detector: query parameter names that exist post-load but were not present on the initial href. This helps assess SeatGeek if its tag uses different parameter names. |
| `tracking likely` | `yes` when the full href changed and new query parameter names appeared after load. |
| `diagnostic note` | Local snapshot note based on the rules below. This is not the final attribution verdict. |

Tracked affiliate query keys (case-insensitive match): `irgwc`, `afsrc`,
`clickid`, `camefrom`, `impradid`, `REFERRAL_ID`, `wt.mc_id`, `utm_source`,
`utm_medium`, `ircid`. The Impact Publisher Tag commonly decorates Ticketmaster
links by appending these parameters while keeping the host as
`www.ticketmaster.com`, so a host-only diff is not sufficient to detect a
successful transform. For SeatGeek, the exact parameter names may differ by
account/tag, so the table also lists any new query parameter names that appeared
after load.

Per-row diagnostic-note logic:

- `raw-*` row → `visible transform detected` if the full href changed, any
  recognised affiliate param is present on the post-load href, **or** new query
  parameter names were added after load. Host change is not required.
- `raw-*` row with no visible post-load href change → `no visible href change;
  verify click/dashboard`. This is an inconclusive diagnostic state, not a
  failed attribution verdict, because a Publisher Tag may transform on click or
  require Impact dashboard reporting to confirm attribution.
- `out-*` row → `untouched (expected)` if the href is unchanged, no recognised
  affiliate params are present, and no new query parameter names were added
  (the `/api/out` redirect must not be decorated by either tag); otherwise
  `unexpectedly altered`.
- A row whose anchor was rendered as a disabled note (no href on either
  snapshot) is shown as `disabled (no href)` and is neither pass nor fail.

The helper captures hrefs on `DOMContentLoaded` and again 2 seconds later. It
sends nothing off-device, and its snapshot output is not the source of truth for
Impact attribution.

## Tag loading model

- The Ticketmaster Publisher Tag continues to load globally from
  `public/impact.js`, which is referenced both by the public `index.html` and
  the internal test page. Production behaviour is unchanged.
- The SeatGeek Publisher Tag is bootstrapped only by
  `public/internal/impact-tag-test.js` on this route, using a separate global
  function name (`window.impactStatSG`). If the configured SDK URL is missing
  or not on an `impactcdn.com` / `impact.com` host, no second tag is loaded.

## CSP

The internal route returns a route-scoped Content-Security-Policy. It allows
`https://utt.impactcdn.com` (covers the Ticketmaster Publisher Tag) and, if a
valid SeatGeek tag URL is supplied by `IMPACT_SEATGEEK_PUBLISHER_TAG_URL` or
`?sgTagUrl=`, the exact origin of that URL is appended to `script-src` and
`connect-src`. No `unsafe-inline`, no wildcards.

`public/_headers` and the production CSP in `functions/[[path]].js` are
**unchanged**.

## Browser QA checklist

Run each item in Chrome DevTools (Network + Console + Application > Cookies)
on `/internal/impact-tag-test?token=<value>`:

- [ ] Raw Ticketmaster anchor: initial `href` host is `www.ticketmaster.com`.
      Ticketmaster production tracking is already the known-good baseline, so
      this row is only a control signal on the diagnostic page. Do not treat a
      no-change Ticketmaster snapshot as proof that production Ticketmaster
      tracking is broken.
- [ ] Raw SeatGeek anchor: initial `href` host is `seatgeek.com`. A visible
      href change, recognised tracking param, or added query param is useful
      evidence, but no visible href change after 2 seconds is inconclusive.
      Continue with click-through and Impact dashboard checks.
- [ ] No anchor shows evidence of being transformed by both tags. Each `out-*`
      row should show `untouched (expected)` so `/api/out` remains available as
      the fallback/reference path.
- [ ] `/api/out` Ticketmaster control: `initial href host` is the page origin.
      `post-load href host` is still the page origin, `full href changed=no`,
      `recognised params=none`, and `added params=none` (i.e. neither
      tag rewrote or decorated it).
- [ ] `/api/out` SeatGeek control: same as above. Untouched by either tag.
- [ ] Click each link individually:
  - [ ] Raw Ticketmaster: Network tab shows a redirect chain through the
        Ticketmaster Impact host, then to `ticketmaster.com`. No SeatGeek
        Impact host in the chain. The Ticketmaster Impact account dashboard
        records the click; the SeatGeek dashboard does not.
  - [ ] Raw SeatGeek: the click lands on the correct SeatGeek event page. If
        a redirect chain is visible, it should not include the Ticketmaster
        Impact host. The SeatGeek Impact dashboard records the click; the
        Ticketmaster Impact dashboard does not record that SeatGeek click.
  - [ ] `/api/out` Ticketmaster: request hits `/api/out`, server-side analytics
        write to `DEMAND_DB`, final destination is `ticketmaster.com` (or its
        Impact-branded host when artist-level).
  - [ ] `/api/out` SeatGeek: request hits `/api/out`. Final destination is
        `seatgeek.com` via a server-side Impact tracking URL **if** SeatGeek
        and Impact SeatGeek program credentials are configured; otherwise the
        request returns a safe failure.
- [ ] DevTools Console shows no errors related to either Impact SDK.
- [ ] DevTools Console shows no Content-Security-Policy violations.
- [ ] `Application > Cookies` shows distinct first-party cookies for the two
      tags. If a single cookie name is set with conflicting values by both
      SDKs, mark the test failed and stop — global coexistence is unsafe.
- [ ] In the JS console, `Object.keys(window).filter(k => /ire|impact/i.test(k))`
      shows both `impactStat` and `impactStatSG`. Neither is `undefined` after
      the page settles.
- [ ] Repeat the page load with each tag disabled in turn (via uBlock or by
      unsetting the env variable for that environment) and confirm the
      attribution behaviour matches expectations.

## Production regression checks

After the QA above, confirm that production pages are unchanged:

- [ ] `/` and `/artists/<slug>` still load the Ticketmaster tag only.
- [ ] A real Ticketmaster click from a production artist page still attributes
      to the Ticketmaster Impact account.
- [ ] `/api/out` analytics rows still land in `DEMAND_DB`.

## SeatGeek final pass/fail criterion

The SeatGeek Publisher Tag test passes only when **all** of these are true:

- The raw SeatGeek URL lands on the correct SeatGeek event page.
- The SeatGeek Impact account records the raw SeatGeek click.
- The Ticketmaster Impact account does **not** record that SeatGeek click.
- No double transformation or cross-account attribution occurs.
- `/api/out` anchors are untouched and remain available as the
  fallback/reference path: no host change, no full href change, no recognised
  affiliate params, and no added query params.
- No console or CSP errors appear.
- Cookies set by the two tags do not collide.

Do not fail the SeatGeek test solely because the post-load href snapshot did
not visibly change after 2 seconds. If any final criterion fails, do **not**
add the SeatGeek Publisher Tag globally. Rely on `/api/out` +
`IMPACT_SEATGEEK_PROGRAM_ID` for SeatGeek attribution.
