#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
URL_RE = re.compile(r"^https?://", re.IGNORECASE)
ALLOWED_STATUSES = {"draft", "announced", "on-sale", "past"}
PLACEHOLDER_MARKERS = (
    "example.com",
    "your-affiliate-link",
    "your-link-here",
    "replace-me",
    "placeholder",
)
PLACEHOLDER_PATTERNS = tuple(re.compile(pattern, re.IGNORECASE) for pattern in (
    r"(?:^|[/?#=&._-])tbd(?:$|[/?#=&._-])",
))


def parse_iso(dt: str) -> bool:
    # Accept common ISO forms including trailing Z.
    try:
        datetime.fromisoformat(dt.replace("Z", "+00:00"))
        return True
    except Exception:
        return False


def is_http_url(value: Any) -> bool:
    if value is None:
        return True
    if not isinstance(value, str):
        return False
    v = value.strip()
    if v == "":
        return True
    return bool(URL_RE.match(v))


def is_placeholder_url(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    v = value.strip().lower()
    if v == "":
        return False
    return any(marker in v for marker in PLACEHOLDER_MARKERS) or any(
        pattern.search(v) for pattern in PLACEHOLDER_PATTERNS
    )


def load_provider_metadata() -> dict:
    catalog_path = Path("public/data/catalog.json")
    if not catalog_path.exists():
        return {}
    try:
        catalog = json.loads(catalog_path.read_text())
        providers = {}
        for provider in catalog.get("providers", []):
            slug = provider.get("slug")
            if slug:
                providers[slug] = provider
        return providers
    except Exception:
        return {}


def validate_provider_gates(event: Any, providers: dict) -> list:
    errors = []
    if not isinstance(event, dict):
        return errors

    provider_links = event.get("provider_links")
    if not isinstance(provider_links, dict):
        return errors

    for provider_slug, link in provider_links.items():
        if not isinstance(link, dict):
            continue

        if provider_slug not in providers:
            errors.append(f"provider_links.{provider_slug}: unknown provider")
            continue

        provider = providers[provider_slug]
        prefix = f"provider_links.{provider_slug}"

        if not provider.get("public_enabled"):
            if link.get("verified"):
                errors.append(f"{prefix}: verified link but provider public_enabled=false")

        if not provider.get("pricing_display_allowed"):
            for price_field in ("price", "price_min", "price_max"):
                if price_field in event and event.get(price_field):
                    errors.append(f"{prefix}: price claim but pricing_display_allowed=false")
                    break

        if not provider.get("available_display_allowed"):
            status = link.get("availability_status")
            if status and status not in ("not_checked", ""):
                errors.append(f"{prefix}: availability claim '{status}' but available_display_allowed=false")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate public/data/events.json")
    parser.add_argument(
        "--path",
        default="public/data/events.json",
        help="Path to events JSON (default: public/data/events.json)",
    )
    parser.add_argument(
        "--require-affiliate-urls",
        action="store_true",
        help="Fail if any event is missing provider affiliate URLs.",
    )
    parser.add_argument(
        "--reject-placeholder-urls",
        action="store_true",
        help="Fail if affiliate URLs contain known placeholder/example markers.",
    )
    parser.add_argument(
        "--min-events",
        type=int,
        default=0,
        help="Fail if event count is below this threshold (default: 0).",
    )
    parser.add_argument(
        "--validate-provider-gates",
        action="store_true",
        help="Validate that events do not claim unsupported provider capabilities.",
    )
    parser.add_argument(
        "--for-production",
        action="store_true",
        help="Enable strict launch checks: min-events>=1 and reject placeholders. Missing URLs are allowed and render unavailable.",
    )
    args = parser.parse_args()

    if args.for_production:
        args.reject_placeholder_urls = True
        args.validate_provider_gates = True
        if args.min_events < 1:
            args.min_events = 1

    providers = load_provider_metadata()
    path = Path(args.path)
    if not path.exists():
        print(f"ERROR: missing file: {path}", file=sys.stderr)
        return 2

    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {path}: {exc}", file=sys.stderr)
        return 2

    if not isinstance(data, list):
        print("ERROR: events.json must be a JSON array.", file=sys.stderr)
        return 2

    if len(data) < args.min_events:
        print(
            f"ERROR: events.json has {len(data)} events, below required minimum of {args.min_events}.",
            file=sys.stderr,
        )
        return 1

    # Empty is allowed (pre-announcement mode).
    if len(data) == 0:
        print("OK: 0 events (empty list).")
        return 0

    errors: list[str] = []
    ids: set[str] = set()

    required_fields = [
        "id",
        "artist_slug",
        "artist_name",
        "city",
        "country",
        "venue",
        "datetime_iso",
    ]

    for i, event in enumerate(data):
        prefix = f"event[{i}]"
        if not isinstance(event, dict):
            errors.append(f"{prefix}: must be an object")
            continue

        for field in required_fields:
            value = event.get(field)
            if not isinstance(value, str) or value.strip() == "":
                errors.append(f"{prefix}.{field}: required string")

        event_id = event.get("id")
        if isinstance(event_id, str) and event_id.strip():
            if event_id in ids:
                errors.append(f"{prefix}.id: duplicate id '{event_id}'")
            ids.add(event_id)

        slug = event.get("artist_slug")
        if isinstance(slug, str) and slug.strip() and not SLUG_RE.match(slug.strip()):
            errors.append(f"{prefix}.artist_slug: invalid slug '{slug}' (use lowercase-hyphenated)")

        dt = event.get("datetime_iso")
        if isinstance(dt, str) and dt.strip() and not parse_iso(dt.strip()):
            errors.append(f"{prefix}.datetime_iso: invalid ISO datetime '{dt}'")

        status = event.get("status")
        if status is not None:
            if not isinstance(status, str) or status.strip() == "":
                errors.append(f"{prefix}.status: must be a non-empty string if present")
            elif status.strip() not in ALLOWED_STATUSES:
                allowed = ", ".join(sorted(ALLOWED_STATUSES))
                errors.append(f"{prefix}.status: invalid '{status}' (allowed: {allowed})")

        tz = event.get("timezone")
        if tz is not None:
            if not isinstance(tz, str) or tz.strip() == "":
                errors.append(f"{prefix}.timezone: must be a non-empty string if present")
            elif "/" not in tz.strip():
                errors.append(f"{prefix}.timezone: expected IANA-like value (e.g., Europe/London), got '{tz}'")

        for url_field in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
            if not is_http_url(event.get(url_field)):
                errors.append(f"{prefix}.{url_field}: must be http(s) URL or empty")
            elif args.reject_placeholder_urls and is_placeholder_url(event.get(url_field)):
                errors.append(f"{prefix}.{url_field}: placeholder/example URL is not allowed")

        if args.require_affiliate_urls:
            for url_field in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
                value = event.get(url_field)
                if not isinstance(value, str) or value.strip() == "":
                    errors.append(f"{prefix}.{url_field}: required when --require-affiliate-urls is set")

        if args.validate_provider_gates and providers:
            gate_errors = validate_provider_gates(event, providers)
            errors.extend(f"{prefix}: {err}" if not err.startswith("provider_links") else err for err in gate_errors)

    if errors:
        print("VALIDATION FAILED:", file=sys.stderr)
        for e in errors:
            print(f"- {e}", file=sys.stderr)
        return 1

    print(f"OK: {len(data)} events validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
