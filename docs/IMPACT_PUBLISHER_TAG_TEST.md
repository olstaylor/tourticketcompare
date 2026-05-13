# Impact Publisher Tag Test (internal)

## Purpose

`/internal/impact-tag-test` is a noindex, token-gated test route used to compare
the Ticketmaster Impact Publisher Tag and the SeatGeek Impact Publisher Tag on
a single page **without** changing public CTA behaviour.

The route is:

- Excluded from navigation, the sitemap, and `robots.txt` (`Disallow: /internal/`).
- Marked `noindex,nofollow` via `<meta>` and `X-Robots-Tag`.
- 404 unless `?token=<value>` matches `env.IMPACT_TAG_TEST_TOKEN`.
- Not linked from any public page.

Production pages are unchanged. The SeatGeek Publisher Tag is loaded **only**
on this route, via a separate global (`window.impactStatSG`) to reduce the risk
of colliding with the existing site-wide Ticketmaster tag (`window.impactStat`).

## Required environment variable

| Variable | Required | Description |
|---|---|---|
| `IMPACT_TAG_TEST_TOKEN` | yes | Any high-entropy string. The route returns 404 unless the URL `?token=` matches this value byte-for-byte. If the variable is unset or empty, the route is fully inaccessible. |

Set as a Cloudflare Pages environment variable on the appropriate environment
(preview, production, or both). Do not commit the value to the repository.

## Optional environment variables

| Variable | Purpose |
|---|---|
| `IMPACT_SEATGEEK_PUBLISHER_TAG_URL` | Full https URL of the SeatGeek Impact Publisher Tag SDK. Must point to `*.impactcdn.com` or `*.impact.com`. If unset or invalid, the SeatGeek tag is not loaded and the page surfaces a clear warning. |
| `IMPACT_TAG_TEST_SEATGEEK_URL` | Single raw `https://seatgeek.com/...` URL used as the raw-SeatGeek test anchor when no `?sgUrl=` query is supplied. Validated server-side; non-SeatGeek hosts are rejected. |
| `IMPACT_TAG_TEST_SEATGEEK_SHOW_ID` | A `showId` matching an event in `public/data/events.json`. Used to render the `/api/out?showId=...&provider=seatgeek` control link when no `?sgShowId=` query is supplied. |

If the SeatGeek tag URL is not configured, the page still renders and runs;
only the SeatGeek tag bootstrap is skipped, with a visible warning.

## Per-request overrides (query parameters)

| Parameter | Effect |
|---|---|
| `token` | **Required.** Validates against `IMPACT_TAG_TEST_TOKEN`. |
| `sgUrl` | Overrides `IMPACT_TAG_TEST_SEATGEEK_URL` for one request. Must be a `https://seatgeek.com/...` URL. |
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
| `verdict` | Per-row pass/fail based on the rules below. |

Tracked affiliate query keys (case-insensitive match): `irgwc`, `afsrc`,
`clickid`, `camefrom`, `impradid`, `REFERRAL_ID`, `wt.mc_id`, `utm_source`,
`utm_medium`, `ircid`. The Impact Publisher Tag commonly decorates Ticketmaster
links by appending these parameters while keeping the host as
`www.ticketmaster.com`, so a host-only diff is not sufficient to detect a
successful transform. For SeatGeek, the exact parameter names may differ by
account/tag, so the table also lists any new query parameter names that appeared
after load.

Per-row verdict logic:

- `raw-*` row → **pass** if the full href changed, any recognised affiliate
  param is present on the post-load href, **or** new query parameter names were
  added after load; otherwise **fail** (`not transformed`). Host change is not
  required.
- `out-*` row → **pass** if the href is unchanged, no recognised affiliate
  params are present, and no new query parameter names were added (the
  `/api/out` redirect must not be decorated by either tag); otherwise **fail**
  (`unexpectedly altered`).
- A row whose anchor was rendered as a disabled note (no href on either
  snapshot) is shown as `disabled (no href)` and is neither pass nor fail.

The helper captures hrefs on `DOMContentLoaded` and again 2 seconds later. It
sends nothing off-device.

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
`https://utt.impactcdn.com` (covers the Ticketmaster Publisher Tag) and, if
`IMPACT_SEATGEEK_PUBLISHER_TAG_URL` is set, the exact origin of that URL is
appended to `script-src` and `connect-src`. No `unsafe-inline`, no wildcards.

`public/_headers` and the production CSP in `functions/[[path]].js` are
**unchanged**.

## Browser QA checklist

Run each item in Chrome DevTools (Network + Console + Application > Cookies)
on `/internal/impact-tag-test?token=<value>`:

- [ ] Raw Ticketmaster anchor: initial `href` host is `www.ticketmaster.com`.
      After 2s, the diagnostic row shows verdict `transformed`. The host may
      stay `www.ticketmaster.com`; pass is determined by the `affiliate params
      present` column being `yes` (e.g. `clickid`, `irgwc`, `camefrom`,
      `impradid`, `wt.mc_id`), by `full href changed=yes`, or by new query
      params appearing. Confirm via the `<details>` block that the post-load
      href contains Ticketmaster Impact campaign params and not SeatGeek-account
      params.
- [ ] Raw SeatGeek anchor: initial `href` host is `seatgeek.com`. After 2s, the
      verdict shows `transformed` — driven by recognised tracking params,
      `full href changed=yes`, or the generic `added params` detector. The
      host may remain `seatgeek.com`; confirm the change was introduced by the
      SeatGeek tag and not by the Ticketmaster tag.
- [ ] No anchor is transformed by both tags. Each `raw-*` row's verdict is
      `transformed`; each `out-*` row's verdict is `untouched (expected)`.
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
  - [ ] Raw SeatGeek: redirect chain through the SeatGeek Impact host, then
        `seatgeek.com`. No Ticketmaster Impact host in the chain. The SeatGeek
        Impact dashboard records the click; the Ticketmaster dashboard does not.
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

## Pass criterion

A "safe to deploy both tags globally" verdict requires **all** of:

- Each tag transforms only its own provider's anchors.
- No double transformation.
- No cross-account attribution.
- `/api/out` anchors are untouched: no host change, no full href change, no recognised affiliate params, and no added query params.
- No console or CSP errors.
- Cookies set by the two tags do not collide.

If any check fails, do **not** add the SeatGeek Publisher Tag globally. Rely
on `/api/out` + `IMPACT_SEATGEEK_PROGRAM_ID` for SeatGeek attribution.
