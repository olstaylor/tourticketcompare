#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import json
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "public" / "data" / "events.json"
ARTISTS_PATH = ROOT / "public" / "data" / "artists.json"
INDEX_PATH = ROOT / "public" / "index.html"


def build_fallback_events(events: list) -> list[dict]:
    if not isinstance(events, list):
        return []

    fallback: list[dict] = []
    seen_artists: set[str] = set()
    for event in events:
        if not isinstance(event, dict):
            continue

        artist_slug = str(event.get("artist_slug") or "").strip()
        if artist_slug and artist_slug in seen_artists:
            continue

        fallback.append(
            {
                "id": str(event.get("id") or "").strip() or f"fallback-{len(fallback) + 1}",
                "artist_slug": artist_slug,
                "artist_name": str(event.get("artist_name") or "").strip(),
                "country": str(event.get("country") or "").strip(),
                "city": str(event.get("city") or "").strip(),
                "venue": str(event.get("venue") or "").strip(),
                "datetime_iso": str(event.get("datetime_iso") or event.get("dateTimeISO") or "").strip(),
            }
        )

        if artist_slug:
            seen_artists.add(artist_slug)
        if len(fallback) >= 6:
            break

    return fallback


def replace_script_block(html: str, script_id: str, pretty_json: str) -> str | None:
    pattern = rf'(<script id="{script_id}" type="application/json">)(.*?)(\n\s*</script>)'
    match = re.search(pattern, html, flags=re.S)
    if not match:
        return None
    return html[:match.start(2)] + "\n" + pretty_json + match.group(3) + html[match.end(3):]


def main() -> int:
    if not DATA_PATH.exists():
        print(f"Missing data file: {DATA_PATH}", file=sys.stderr)
        return 1
    if not INDEX_PATH.exists():
        print(f"Missing index file: {INDEX_PATH}", file=sys.stderr)
        return 1

    try:
        events = json.loads(DATA_PATH.read_text())
    except json.JSONDecodeError as exc:
        print(f"Invalid JSON in {DATA_PATH}: {exc}", file=sys.stderr)
        return 1

    artists = []
    if ARTISTS_PATH.exists():
        try:
            loaded = json.loads(ARTISTS_PATH.read_text())
            if isinstance(loaded, list):
                artists = loaded
        except json.JSONDecodeError as exc:
            print(f"Invalid JSON in {ARTISTS_PATH}: {exc}", file=sys.stderr)
            return 1

    fallback_events = build_fallback_events(events)
    html = INDEX_PATH.read_text()

    updated_html = replace_script_block(html, "fallbackArtistsData", json.dumps(artists, indent=2))
    if updated_html is None:
        print("Could not find <script id=\"fallbackArtistsData\"> block in index.html", file=sys.stderr)
        return 1

    updated_html = replace_script_block(updated_html, "fallbackEventsData", json.dumps(fallback_events, indent=2))
    if updated_html is None:
        print("Could not find <script id=\"fallbackEventsData\"> block in index.html", file=sys.stderr)
        return 1

    INDEX_PATH.write_text(updated_html)
    print(f"Synced {len(artists)} artists and {len(fallback_events)} fallback events into public/index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
