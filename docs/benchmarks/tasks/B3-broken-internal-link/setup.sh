#!/usr/bin/env bash
# Seeds the broken link for benchmark B3. Run on a clean `bench/B3-<model>-<date>`
# branch cut from the tagged baseline. Never run on main.
set -euo pipefail
f=content/guides/concert-ticket-fees-explained.md
good='](/guides/how-to-compare-concert-ticket-prices)'
bad='](/guides/how-to-compare-concert-prices)'
grep -qF "$good" "$f" || { echo "baseline drifted: expected link not found in $f"; exit 1; }
sed -i "s#$(printf '%s' "$good" | sed 's/[]\/$*.^[]/\\&/g')#$(printf '%s' "$bad" | sed 's/[\/&]/\\&/g')#" "$f"
# The guide build validates internal links itself, so the seeded break is left unbuilt: the
# baseline is red on `npm run guides:check`, and the fix is the model's job.
git add "$f" && git commit -qm "bench B3: seed broken internal link"
echo "seeded. Give the model docs/benchmarks/tasks/B3-broken-internal-link/prompt.md"
