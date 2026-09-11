// Single source of truth for the validation lanes.
//
// `test:mvp` is the complete suite and must stay that way: SAFE_PUBLISHING_RULES.md
// gates every sanctioned auto-merge on "test:mvp passing in-job on exactly the
// proposed content", so a step that silently left the suite would weaken those
// exceptions. `test:quick` and `test:units` are not separate suites — they are
// this same ordered list filtered by `lane`, split into a fast pre-commit lane
// (data and route checks) and a script-unit lane (tooling self-tests).
//
// Because every step declares its lane here exactly once, the three lanes cannot
// drift apart and a new step cannot fall out of the pre-commit loop. Adding a
// step is one line below; `npm run test:lanes` checks the manifest is coherent.
//
// Steps run in listed order and stop at the first failure, matching the `&&`
// chains this replaced. Run one step on its own with:
//   npm run test:units -- --only blog

export const STEPS = [
  { id: "docs:check",                             lane: "quick",  run: "npm run docs:check" },
  { id: "blog:self-test",                         lane: "units",  run: "npm run blog:self-test" },
  { id: "blog:check",                             lane: "quick",  run: "npm run blog:check" },
  { id: "guides:self-test",                       lane: "units",  run: "npm run guides:self-test" },
  { id: "guides:check",                           lane: "quick",  run: "npm run guides:check" },
  { id: "guides:validate",                        lane: "quick",  run: "npm run guides:validate" },
  { id: "og:self-test",                           lane: "units",  run: "npm run og:self-test" },
  { id: "og:check",                               lane: "quick",  run: "npm run og:check" },
  { id: "content:cms-contract",                   lane: "quick",  run: "npm run content:cms-contract" },
  { id: "content:provenance:self-test",           lane: "units",  run: "node scripts/sync-content-provenance.mjs --self-test" },
  { id: "content:provenance:check",               lane: "quick",  run: "npm run content:provenance:check" },
  { id: "guides:sources:check:self-test",         lane: "units",  run: "node scripts/check-guide-source-links.mjs --self-test" },
  { id: "events:validate:self-test",              lane: "units",  run: "python3 scripts/validate-events.py --self-test" },
  { id: "audit:links:self-test",                  lane: "units",  run: "node scripts/verify-outbound-links.mjs --self-test" },
  { id: "audit:tm-events:self-test",              lane: "units",  run: "node scripts/audit-tm-events.mjs --self-test" },
  { id: "audit:report:self-test",                 lane: "units",  run: "node scripts/daily-audit-report.mjs --self-test" },
  { id: "data:sync-review:self-test",             lane: "units",  run: "node scripts/report-tm-sync-review.mjs --self-test" },
  { id: "test:bump-guard",                        lane: "quick",  run: "npm run test:bump-guard" },
  { id: "impact:catalog-routes:self-test",        lane: "units",  run: "node scripts/test-impact-catalog-routes.mjs" },
  { id: "impact-providers:sync:self-test",        lane: "units",  run: "npm run impact-providers:sync:self-test" },
  { id: "seatgeek:enrich:self-test",              lane: "units",  run: "npm run seatgeek:enrich:self-test" },
  { id: "seatgeek:verify:self-test",              lane: "units",  run: "npm run seatgeek:verify:self-test" },
  { id: "vividseats:sync:self-test",              lane: "units",  run: "npm run vividseats:sync:self-test" },
  { id: "events:backfill-timezones:self-test",    lane: "units",  run: "npm run events:backfill-timezones:self-test" },
  { id: "impact-providers:prices:self-test",      lane: "units",  run: "npm run impact-providers:prices:self-test" },
  { id: "prices:history:prune:self-test",         lane: "units",  run: "npm run prices:history:prune:self-test" },
  { id: "prices:freshness:self-test",             lane: "units",  run: "node scripts/check-price-snapshot-freshness.mjs --self-test" },
  { id: "automation:health:self-test",            lane: "units",  run: "npm run automation:health:self-test" },
  { id: "pr-validation-heads:self-test",          lane: "units",  run: "node scripts/check-pr-validation-heads.mjs --self-test" },
  { id: "queue:materialize:self-test",           lane: "units",  run: "npm run queue:materialize:self-test" },
  { id: "validate:artist-providers",              lane: "quick",  run: "npm run validate:artist-providers" },
  { id: "validate:cta-provider-state",            lane: "quick",  run: "npm run validate:cta-provider-state" },
  { id: "validate:provider-allowlists",           lane: "quick",  run: "npm run validate:provider-allowlists" },
  { id: "validate:internal-links",                lane: "quick",  run: "npm run validate:internal-links" },
  { id: "audit:indexable-surface:self-test",      lane: "units",  run: "npm run audit:indexable-surface:self-test" },
  { id: "audit:indexable-surface:check",          lane: "quick",  run: "npm run audit:indexable-surface:check" },
  { id: "test:artist-content",                    lane: "quick",  run: "npm run test:artist-content" },
  { id: "test:artist-presentation",               lane: "quick",  run: "npm run test:artist-presentation" },
  { id: "test:artist-cities",                     lane: "quick",  run: "npm run test:artist-cities" },
  { id: "test:location-pages",                    lane: "quick",  run: "npm run test:location-pages" },
  { id: "test:route-indexability",                lane: "quick",  run: "npm run test:route-indexability" },
  { id: "test:route-metadata",                    lane: "quick",  run: "npm run test:route-metadata" },
  { id: "test:homepage-proposition",              lane: "quick",  run: "npm run test:homepage-proposition" },
  { id: "test:renderer-assets",                   lane: "quick",  run: "npm run test:renderer-assets" },
  { id: "test:event-local-date",                  lane: "quick",  run: "npm run test:event-local-date" },
  { id: "test:funnel-analytics",                  lane: "quick",  run: "npm run test:funnel-analytics" },
  { id: "report:commercial-funnel:self-test",     lane: "units",  run: "npm run report:commercial-funnel:self-test" },
  { id: "report:affiliate-performance:self-test", lane: "units",  run: "npm run report:affiliate-performance:self-test" },
  { id: "report:link-coverage:self-test",         lane: "units",  run: "node scripts/report-link-coverage.mjs --self-test" },
  { id: "report:link-coverage:check",             lane: "quick",  run: "npm run report:link-coverage:check" },
  { id: "report:funnel:self-test",                lane: "units",  run: "npm run report:funnel:self-test" },
  { id: "indexnow:ping:self-test",                lane: "units",  run: "npm run indexnow:ping:self-test" },
  { id: "providers:sync:tm:coverage:self-test",   lane: "units",  run: "node scripts/report-tm-discovery-coverage.mjs --self-test" },
  { id: "providers:sync:tm:self-test",            lane: "units",  run: "npm run providers:sync:tm:self-test" },
  { id: "providers:sync:tm:write-pr:self-test",   lane: "units",  run: "npm run providers:sync:tm:write-pr:self-test" },
  { id: "test:tm-ingestion-outcomes",             lane: "quick",  run: "npm run test:tm-ingestion-outcomes" },
  { id: "remediation-review-self-test",           lane: "units",  run: "node scripts/remediation-review-self-test.mjs" },
  { id: "smoke-prelaunch",                        lane: "quick",  run: "node scripts/smoke-prelaunch.mjs" },
  { id: "roster:forecast:self-test",              lane: "units",  run: "node scripts/report-roster-forecast.mjs --self-test" },
  { id: "status:validate:self-test",              lane: "units",  run: "node scripts/validate-status-counts.mjs --self-test" },
  { id: "status:validate",                        lane: "quick",  run: "npm run status:validate" },
];

export const LANES = ["mvp", "quick", "units"];

export const stepsFor = (lane) => (lane === "mvp" ? STEPS : STEPS.filter((step) => step.lane === lane));
