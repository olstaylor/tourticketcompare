#!/usr/bin/env bash
set -euo pipefail

# Prebuilds install the CLI only. Authentication happens in the user's codespace.
claude_installer=$(mktemp)
trap 'rm -f "$claude_installer"' EXIT

curl --fail --show-error --silent --location --retry 3 \
  https://claude.ai/install.sh --output "$claude_installer"
bash "$claude_installer" stable
"$HOME/.local/bin/claude" --version
