#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
EVENTS_PATH = ROOT / "public" / "data" / "events.json"
INDEX_PATH = ROOT / "public" / "data" / "events-index.json"
PER_ARTIST_DIR = ROOT / "public" / "data" / "events"
ARTISTS_PATH = ROOT / "public" / "data" / "artists.json"
INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content"

INDEX_FIELDS = (
    "id",
    "artist_slug",
    "artist_name",
    "country",
    "city",
    "venue",
    "datetime_iso",
    "timezone",
    "tour_name",
    "status",
)


def load_events() -> list[dict[str, Any]]:
    data = json.loads(EVENTS_PATH.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{EVENTS_PATH} must contain a JSON array")
    events: list[dict[str, Any]] = []
    for item in data:
        if isinstance(item, dict):
            events.append(item)
    return events


def build_index(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    index: list[dict[str, Any]] = []
    for event in events:
        row = {field: event.get(field) for field in INDEX_FIELDS if field in event}
        index.append(row)
    return index


def group_by_artist(events: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    grouped: dict[str, list[dict[str, Any]]] = {}
    for event in events:
        slug = str(event.get("artist_slug") or "").strip().lower()
        if not slug:
            continue
        grouped.setdefault(slug, []).append(event)
    return grouped


def zero_event_indexable_slugs(grouped: dict[str, list[dict[str, Any]]]) -> list[str]:
    """Indexable artists with no event rows at all.

    Each still gets a partition — an empty array — so the artist route reads a
    small file instead of falling back to parsing the full events.json on
    every request (loadArtistEvents in functions/[[path]].js).
    """
    if not ARTISTS_PATH.exists():
        return []
    artists = json.loads(ARTISTS_PATH.read_text(encoding="utf-8"))
    slugs: list[str] = []
    for artist in artists if isinstance(artists, list) else []:
        if not isinstance(artist, dict) or artist.get("indexing_status") != INDEXABLE_ARTIST_STATUS:
            continue
        slug = str(artist.get("slug") or "").strip().lower()
        if slug and slug not in grouped:
            slugs.append(slug)
    return slugs


def main() -> int:
    parser = argparse.ArgumentParser(description="Split events.json into index and per-artist partitions")
    parser.add_argument(
        "--allow-empty",
        action="store_true",
        help="Allow partitioning an empty events list (blocked by default for safety).",
    )
    args = parser.parse_args()

    if not EVENTS_PATH.exists():
        raise FileNotFoundError(f"Missing {EVENTS_PATH}")

    events = load_events()
    if len(events) == 0 and not args.allow_empty:
        raise ValueError(
            "Refusing to partition empty events list. Use --allow-empty only when intentional."
        )

    INDEX_PATH.write_text(json.dumps(build_index(events), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    PER_ARTIST_DIR.mkdir(parents=True, exist_ok=True)
    for file in PER_ARTIST_DIR.glob("*.json"):
        file.unlink()

    grouped = group_by_artist(events)
    for slug, artist_events in grouped.items():
        target = PER_ARTIST_DIR / f"{slug}.json"
        target.write_text(json.dumps(artist_events, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    empty_slugs = zero_event_indexable_slugs(grouped)
    for slug in empty_slugs:
        (PER_ARTIST_DIR / f"{slug}.json").write_text("[]\n", encoding="utf-8")

    print(
        f"Wrote {INDEX_PATH} and {len(grouped) + len(empty_slugs)} artist files to {PER_ARTIST_DIR}"
        f" ({len(empty_slugs)} empty, for indexable artists with no events)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
