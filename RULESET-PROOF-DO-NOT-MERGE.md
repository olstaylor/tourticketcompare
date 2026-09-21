# Branch protection proof — temporary, do not merge

This file exists only to make `test-mvp` fail on purpose, so that ruleset
`20115269` can be observed refusing a red head. It is deleted with its branch
as soon as the observation is recorded.

It fails `npm run docs:check` (`scripts/validate-docs.mjs`, a `quick`-lane step
inside `test:mvp`) on the deliberately broken relative link below, which is the
smallest failure available that touches no route, no data, no provider surface
and no validator: [this file does not exist](./NO-SUCH-FILE-DELIBERATE.md)

If you are reading this on `main`, the protection test went wrong — revert it.
