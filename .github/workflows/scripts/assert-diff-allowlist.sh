#!/usr/bin/env bash
# Fail unless every path the working tree has changed is on the allowlist passed
# as arguments.
#
# Staging the right paths with `git add a b c` is not the same guarantee: it
# controls what goes into the commit, not what the job produced. A generator
# that started writing a fifth file — or a workflow edit that added a writer
# step — would leave that file behind in the working tree, uncommitted and
# unnoticed, and the next job to run `git add -A` on the same runner image would
# ship it. This turns "we only meant to write these" into something the run
# actually proves.
#
# Both tracked modifications and new untracked files count. Deletions count too:
# a generator that removed a file it was not allowed to touch is exactly as
# serious as one that wrote it.
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "::error::assert-diff-allowlist.sh needs at least one allowed path"
  exit 1
fi

# -z gives NUL-separated, unquoted paths, so a filename with a space or a
# non-ASCII character is compared literally rather than as git's quoted form.
mapfile -d '' changed < <(git status --porcelain=v1 -z --untracked-files=all | \
  while IFS= read -r -d '' entry; do
    # Each record is "XY <path>"; a rename also carries an origin path in the
    # following record, which this loop reads as its own entry.
    printf '%s\0' "${entry:3}"
  done)

violations=()
for path in "${changed[@]}"; do
  [ -n "$path" ] || continue
  allowed=false
  for candidate in "$@"; do
    if [ "$path" = "$candidate" ]; then
      allowed=true
      break
    fi
  done
  if [ "$allowed" = false ]; then
    violations+=("$path")
  fi
done

if [ "${#violations[@]}" -gt 0 ]; then
  echo "::error::this job may only change the following path(s):"
  for candidate in "$@"; do echo "    $candidate"; done
  echo "::error::but the working tree also changed:"
  for path in "${violations[@]}"; do echo "    $path"; done
  echo "Nothing has been committed. Either the generator wrote something it should not, or this workflow's allowlist is out of date — and widening it needs a SAFE_PUBLISHING_RULES.md change, not a quiet edit here."
  exit 1
fi

echo "diff allowlist OK: ${#changed[@]} changed path(s), all allowlisted."
