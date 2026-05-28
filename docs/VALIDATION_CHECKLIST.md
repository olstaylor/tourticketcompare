# Validation Checklist

Run these checks before committing or pushing.

---

## Syntax Checks

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
```

If you modified a named route shim:
```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

---

## Event Data

```bash
python3 scripts/validate-events.py --for-production
```

---

## Smoke Tests

```bash
node scripts/smoke-prelaunch.mjs
```

---

## Code Quality

- [ ] No `console.log`, `TODO`, `FIXME`, or `XXX` comments in functions
- [ ] No conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- [ ] Trailing whitespace removed: `git diff --check`
- [ ] No unintended `.env` or credentials in diff

---

## Data Edits Only

After editing `public/data/*.json`:

```bash
npm run events:sync
```

Then re-run event validation and smoke tests above.

---

## Pre-Commit Summary

```bash
# See all changes
git status
git diff --stat

# Stage intentional changes only
git add <files>

# Run all checks above
# If all pass, commit
```

---

## Before Push

- [ ] Branch is up-to-date: `git pull origin claude/tender-mendel-a5oO7`
- [ ] All checks pass locally
- [ ] Commit message is clear and concise
- [ ] Do not force-push unless explicitly instructed
