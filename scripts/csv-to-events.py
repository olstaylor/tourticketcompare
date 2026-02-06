#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
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
    args = parser.parse_args()

    in_path = Path(args.input)
    out_path = Path(args.output)

    if not in_path.exists():
        print(f"ERROR: missing input CSV: {in_path}", file=sys.stderr)
        return 2

    events: list[dict[str, Any]] = []
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
                v = optional(row.get(k))
                if v is not None:
                    event[k] = v

            # Skip fully empty rows (common in messy CSV exports)
            if not any(v for v in event.values()):
                continue

            events.append(event)

    if args.sort:
        events.sort(key=stable_sort_key)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(events, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(events)} events -> {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

