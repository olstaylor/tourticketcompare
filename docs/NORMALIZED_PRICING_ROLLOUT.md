# Normalized pricing rollout

## Safety invariant

The production `.github/workflows/vividseats-price-snapshots.yml` remains enabled and unchanged during this rollout. It remains the authoritative Vivid Seats Impact API and legacy-D1 writer. No Vivid browser automation is introduced.

## Required configuration

Cloudflare Pages production secrets:

- `PRICING_INGEST_TOKEN`: random value of at least 24 characters.
- `DEMAND_DB`: existing D1 binding.

GitHub Actions secrets:

- `PRICING_INGEST_URL`: production site origin, for example `https://tourticketcompare.com`.
- `PRICING_INGEST_TOKEN`: exact Cloudflare secret value.
- Existing `SEATGEEK_CLIENT_ID`, `SEATGEEK_CLIENT_SECRET`, `IMPACT_VIVIDSEATS_*`, `CLOUDFLARE_API_TOKEN`, and `CLOUDFLARE_ACCOUNT_ID`.

Apply the additive migration before dispatching either normalized workflow:

```bash
npx wrangler d1 execute tourticketcompare-demand --remote --file migrations/0008_normalized_provider_pricing.sql
```

## Vivid dual-write procedure

1. Manually dispatch `Vivid normalized dual-write verification`. It invokes the existing `snapshot-vividseats-prices.mjs --apply` legacy writer unchanged, then submits normalized observations.
2. Confirm legacy rows updated, the adapter Impact request succeeds, ingestion accepts observations, and `check-vivid-parity.mjs` exits zero.
3. Manually verify the displayed Vivid amount and existing `/api/out` affiliate redirect.
4. Keep both the scheduled legacy workflow and legacy read path enabled. A later, owner-approved PR may enable normalized Vivid reads only after repeat successful runs.

Do not disable `vividseats-price-snapshots.yml` in this rollout. The explicit owner step before any future disablement is to review successful manual dual-write/parity evidence plus production UI and outbound-link verification.
