#!/usr/bin/env python3
"""sync-ticketmaster-events.py — provider-sync scaffolding (dry-run only).

Foundation scaffold for Ticketmaster-based event recognition. This version:

  - reads data/provider-identities.json, public/data/artists.json, and
    public/data/events.json (read-only);
  - reports, per artist, whether a real sync run would be allowed and which
    checks it would apply to candidate event rows;
  - makes NO network calls, writes NO files, and refuses to run without
    --dry-run.

Future PRs (see docs/PROVIDER_SYNC.md -> Implementation sequence) will add the
live TM Discovery API dry-run and a separately gated write-to-PR mode. Until
then this script is intentionally inert.

Usage:
  python3 scripts/sync-ticketmaster-events.py --artist <slug> --dry-run
  python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run
"""

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = ROOT / "data" / "provider-identities.json"
ARTISTS_PATH = ROOT / "public" / "data" / "artists.json"
EVENTS_PATH = ROOT / "public" / "data" / "events.json"

# Checks a real sync run will apply to every candidate row pulled from the
# TM Discovery API. Rows failing any check are WITHHELD for human review —
# never written. Kept here so the dry-run report and the future implementation
# share one definition.
PLANNED_ROW_CHECKS = [
    "venue present (withhold if missing)",
    "date/time present (withhold if missing)",
    "URL hostname in the existing Ticketmaster host allowlist (withhold otherwise; allowlist is never expanded by sync)",
    "not a duplicate of an existing event id/URL in events.json (withhold duplicates)",
    "not a travel/hotel/VIP-package or non-event listing (withhold for review)",
    "attraction match strength: row's attraction ID equals the registry's verified ticketmaster_attraction_id (withhold weak/name-only matches)",
    "no price or availability claims carried into site data",
    "row would pass scripts/validate-events.py --for-production before any future write",
]


def load_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"ERROR: missing required file: {path}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {path}: {exc}", file=sys.stderr)
        sys.exit(1)


def eligibility(entry, artist):
    """Return (eligible, reasons) for a registry entry against artists.json."""
    reasons = []
    if artist is None:
        reasons.append("slug not present in public/data/artists.json")
        return False, reasons
    if artist.get("indexing_status") != "indexable_with_substantial_content":
        reasons.append(f"indexing_status is {artist.get('indexing_status')!r} (must be indexable)")
    if "ticketmaster" not in (artist.get("verified_providers") or []):
        reasons.append("artist has no verified ticketmaster provider")
    if not entry.get("sync_enabled"):
        reasons.append("sync_enabled is false in data/provider-identities.json")
    if entry.get("review_status") != "verified":
        reasons.append(f"review_status is {entry.get('review_status')!r} (must be 'verified')")
    if not entry.get("ticketmaster_attraction_id"):
        reasons.append("ticketmaster_attraction_id is not populated (one-time human verification required)")
    return not reasons, reasons


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    target = parser.add_mutually_exclusive_group(required=True)
    target.add_argument("--artist", metavar="SLUG", help="report on a single artist slug")
    target.add_argument("--all-approved", action="store_true", help="report on every registry entry")
    parser.add_argument("--dry-run", action="store_true", help="required; this scaffold has no other mode")
    args = parser.parse_args()

    if not args.dry_run:
        print(
            "ERROR: this scaffold only supports --dry-run. Write mode does not exist yet\n"
            "and, when it does, it will be explicitly gated and PR-based\n"
            "(docs/PROVIDER_SYNC.md -> Rules for all current and future sync scripts).",
            file=sys.stderr,
        )
        sys.exit(2)

    registry = load_json(REGISTRY_PATH)
    artists = {a["slug"]: a for a in load_json(ARTISTS_PATH)}
    events = load_json(EVENTS_PATH)
    event_counts = {}
    for event in events:
        slug = event.get("artist_slug")
        event_counts[slug] = event_counts.get(slug, 0) + 1

    entries = registry.get("artists", [])
    if args.artist:
        entries = [e for e in entries if e.get("slug") == args.artist]
        if not entries:
            print(f"ERROR: slug {args.artist!r} not found in {REGISTRY_PATH}", file=sys.stderr)
            sys.exit(1)

    print("sync-ticketmaster-events (dry-run scaffold) — no network calls, no writes\n")
    eligible_count = 0
    for entry in entries:
        slug = entry["slug"]
        ok, reasons = eligibility(entry, artists.get(slug))
        status = "ELIGIBLE for future sync" if ok else "NOT ELIGIBLE"
        print(f"[{slug}] {status}")
        print(f"  existing events in events.json: {event_counts.get(slug, 0)}")
        print(f"  ticketmaster_attraction_id: {entry.get('ticketmaster_attraction_id')}")
        print(f"  review_status: {entry.get('review_status')}  sync_enabled: {entry.get('sync_enabled')}")
        if entry.get("notes"):
            print(f"  notes: {entry['notes']}")
        for reason in reasons:
            print(f"  blocked: {reason}")
        print()
        if ok:
            eligible_count += 1

    print("Planned per-row checks for a real sync run (rows failing any are withheld for human review):")
    for check in PLANNED_ROW_CHECKS:
        print(f"  - {check}")
    print(
        f"\nSummary: {eligible_count}/{len(entries)} entries would be processed by a real dry-run sync."
        "\nNothing was written. Live API calls arrive in a later PR (docs/PROVIDER_SYNC.md)."
    )


if __name__ == "__main__":
    main()
