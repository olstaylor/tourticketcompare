#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import math
import json
import sys
from pathlib import Path
from typing import Any


def norm(value: Any) -> str:
    if value is None:
        return ""
    return str(value).strip()


def optional(value: Any) -> str | None:
    v = norm(value)
    return v if v else None


PLACEHOLDER_URL_MARKERS = (
    "example.com",
    "your-affiliate-link",
    "your-link-here",
    "replace-me",
    "placeholder",
    "localhost",
    "127.0.0.1",
)


def optional_real_url(value: Any) -> str | None:
    v = optional(value)
    if v is None:
        return None
    lowered = v.lower()
    if any(marker in lowered for marker in PLACEHOLDER_URL_MARKERS):
        return None
    if not (lowered.startswith("https://") or lowered.startswith("http://")):
        return None
    return v


def stable_sort_key(event: dict[str, Any]) -> tuple[str, ...]:
    return (
        str(event.get("artist_slug") or ""),
        str(event.get("country") or ""),
        str(event.get("city") or ""),
        str(event.get("venue") or ""),
        str(event.get("datetime_iso") or ""),
        str(event.get("id") or ""),
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert a CSV export into public/data/events.json")
    parser.add_argument(
        "--input",
        default="data/events.csv",
        help="CSV input path (default: data/events.csv)",
    )
    parser.add_argument(
        "--output",
        default="public/data/events.json",
        help="JSON output path (default: public/data/events.json)",
    )
    parser.add_argument(
        "--default-artist-slug",
        default="",
        help="If a row is missing artist_slug, fill it with this value.",
    )
    parser.add_argument(
        "--default-artist-name",
        default="",
        help="If a row is missing artist_name, fill it with this value.",
    )
    parser.add_argument(
        "--sort",
        action="store_true",
        help="Sort output for stable diffs (recommended).",
    )
    parser.add_argument(
        "--allow-empty-output",
        action="store_true",
        help="Allow writing an empty events file (blocked by default for safety).",
    )
    parser.add_argument(
        "--allow-large-drop",
        action="store_true",
        help="Allow output count to drop sharply versus existing file.",
    )
    parser.add_argument(
        "--min-retained-ratio",
        type=float,
        default=0.5,
        help="Minimum retained ratio vs existing output before failing (default: 0.5).",
    )
    args = parser.parse_args()

    in_path = Path(args.input)
    out_path = Path(args.output)

    if not in_path.exists():
        print(f"ERROR: missing input CSV: {in_path}", file=sys.stderr)
        return 2

    events: list[dict[str, Any]] = []
    existing_count = 0
    if out_path.exists():
        try:
            existing_data = json.loads(out_path.read_text(encoding="utf-8"))
            if isinstance(existing_data, list):
                existing_count = len(existing_data)
        except json.JSONDecodeError:
            existing_count = 0
    default_artist_slug = norm(args.default_artist_slug)
    default_artist_name = norm(args.default_artist_name)

    # utf-8-sig strips a BOM, which is common with spreadsheet exports.
    with in_path.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            print("ERROR: CSV has no header row.", file=sys.stderr)
            return 2

        for row in reader:
            artist_slug = norm(row.get("artist_slug")) or default_artist_slug
            artist_name = norm(row.get("artist_name")) or default_artist_name

            event: dict[str, Any] = {
                "id": norm(row.get("id")),
                "artist_slug": artist_slug,
                "artist_name": artist_name,
                "city": norm(row.get("city")),
                "country": norm(row.get("country")),
                "venue": norm(row.get("venue")),
                "datetime_iso": norm(row.get("datetime_iso")),
            }

            for k in ("tour_name", "timezone", "status"):
                v = optional(row.get(k))
                if v is not None:
                    event[k] = v

            for k in ("ticketmaster_event_id", "seatgeek_event_id", "vividseats_event_id"):
                v = optional(row.get(k))
                if v is not None:
                    event[k] = v

            for k in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
                v = optional_real_url(row.get(k))
                if v is not None:
                    event[k] = v

            # Skip fully empty rows (common in messy CSV exports)
            if not any(v for v in event.values()):
                continue

            events.append(event)

    if args.sort:
        events.sort(key=stable_sort_key)

    new_count = len(events)
    if new_count == 0 and existing_count > 0 and not args.allow_empty_output:
        print(
            "ERROR: conversion produced 0 events while existing output has data. "
            "Refusing to overwrite to prevent accidental wipe. "
            "Use --allow-empty-output only when intentional.",
            file=sys.stderr,
        )
        return 1

    min_retained_ratio = max(0.0, min(1.0, args.min_retained_ratio))
    if (
        existing_count >= 10
        and new_count > 0
        and not args.allow_large_drop
        and new_count < math.ceil(existing_count * min_retained_ratio)
    ):
        print(
            f"ERROR: conversion would reduce events from {existing_count} to {new_count}. "
            "Refusing large drop by default. Use --allow-large-drop if intentional.",
            file=sys.stderr,
        )
        return 1

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(events, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(events)} events -> {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
