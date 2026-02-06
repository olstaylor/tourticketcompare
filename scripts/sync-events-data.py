#!/usr/bin/env python3
from pathlib import Path
import json
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "public" / "data" / "events.json"
INDEX_PATH = ROOT / "public" / "index.html"


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

    pretty = json.dumps(events, indent=2)
    html = INDEX_PATH.read_text()

    pattern = r'(<script id="eventsData" type="application/json">)(.*?)(\n\s*</script>)'
    match = re.search(pattern, html, flags=re.S)
    if not match:
        print("Could not find <script id=\"eventsData\"> block in index.html", file=sys.stderr)
        return 1

    new_html = html[:match.start(2)] + "\n" + pretty + match.group(3) + html[match.end(3):]
    INDEX_PATH.write_text(new_html)
    print("Synced events into public/index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
