#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from urllib.parse import unquote, urlparse
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


def parse_url(value: Any):
    if not isinstance(value, str):
        return None
    raw = value.strip()
    if raw == "":
        return None
    try:
        parsed = urlparse(raw)
    except Exception:
        return None
    if not parsed.scheme or not parsed.netloc:
        return None
    return parsed


def is_seatgeek_event_url(value: Any) -> tuple[bool, str]:
    if value is None or (isinstance(value, str) and value.strip() == ""):
        return True, ""
    if not isinstance(value, str):
        return False, "must be empty or a SeatGeek event URL string"

    raw = value.strip()
    parsed = parse_url(raw)
    if parsed is None:
        return False, "must be a valid absolute URL"
    if parsed.scheme.lower() != "https":
        return False, "must use https"

    host = (parsed.hostname or "").lower()
    if host not in {"seatgeek.com", "www.seatgeek.com"}:
        return False, "host must be seatgeek.com or www.seatgeek.com"

    if is_placeholder_url(raw):
        return False, "placeholder/example URL is not allowed"

    path = unquote(parsed.path or "/").strip()
    normalized_path = path.rstrip("/")
    if normalized_path in {"", "/"}:
        return False, "must not be the SeatGeek homepage"

    first_segment = normalized_path.split("/")[1].lower() if normalized_path.startswith("/") and len(normalized_path.split("/")) > 1 else ""
    if first_segment in {"search", "venues", "venue", "performers", "performer", "artists", "artist", "concert-tickets", "tickets"}:
        return False, "must be an event-specific SeatGeek URL, not a generic search/artist/venue URL"

    # SeatGeek event pages for concerts use paths ending in /concert/<numeric id>.
    # Accept a small set of event-category segments so validation remains event-page
    # oriented without requiring a single artist-specific URL shape.
    if not re.search(r"/(concert|sports|theater|theatre)/\d+$", normalized_path, re.IGNORECASE):
        return False, "must look like an event URL ending in /concert/<id> or another event category with a numeric id"

    return True, ""


def provider_link_value(event: dict[str, Any], provider: str, field: str) -> Any:
    provider_links = event.get("provider_links")
    if not isinstance(provider_links, dict):
        return None
    provider_data = provider_links.get(provider)
    if not isinstance(provider_data, dict):
        return None
    return provider_data.get(field)


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
        "--for-production",
        action="store_true",
        help="Enable strict launch checks: min-events>=1 and reject placeholders. Missing URLs are allowed and render unavailable.",
    )
    parser.add_argument(
        "--artists-path",
        default="public/data/artists.json",
        help="Path to artists JSON, used for the --for-production artist-reference checks (default: public/data/artists.json).",
    )
    args = parser.parse_args()

    if args.for_production:
        args.reject_placeholder_urls = True
        if args.min_events < 1:
            args.min_events = 1

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

    # Artist-reference integrity (events must point at a real artist record).
    # Enforced only under --for-production so default runs stay lenient.
    artist_names: dict[str, Any] = {}
    if args.for_production:
        artists_path = Path(args.artists_path)
        if not artists_path.exists():
            print(f"ERROR: missing artists file: {artists_path}", file=sys.stderr)
            return 2
        try:
            artists_data = json.loads(artists_path.read_text())
        except json.JSONDecodeError as exc:
            print(f"ERROR: invalid JSON in {artists_path}: {exc}", file=sys.stderr)
            return 2
        if not isinstance(artists_data, list):
            print(f"ERROR: {artists_path} must be a JSON array.", file=sys.stderr)
            return 2
        for artist in artists_data:
            if not isinstance(artist, dict):
                continue
            artist_slug = artist.get("slug")
            if isinstance(artist_slug, str) and artist_slug.strip():
                artist_names[artist_slug.strip()] = artist.get("name")

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

        if args.for_production and isinstance(slug, str) and slug.strip():
            slug_value = slug.strip()
            id_label = event_id.strip() if isinstance(event_id, str) and event_id.strip() else f"index {i}"
            if slug_value not in artist_names:
                errors.append(
                    f"{prefix}.artist_slug: '{slug_value}' (event id '{id_label}') "
                    f"has no matching artist record in {args.artists_path}"
                )
            else:
                expected_name = artist_names[slug_value]
                event_artist_name = event.get("artist_name")
                if (
                    isinstance(expected_name, str)
                    and expected_name.strip()
                    and isinstance(event_artist_name, str)
                    and event_artist_name.strip()
                    and event_artist_name.strip() != expected_name.strip()
                ):
                    errors.append(
                        f"{prefix}.artist_name: '{event_artist_name.strip()}' "
                        f"(event id '{id_label}', artist_slug '{slug_value}') "
                        f"does not match artist record name '{expected_name.strip()}' in {args.artists_path}"
                    )

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

        seatgeek_url = event.get("seatgeek_url")
        seatgeek_ok, seatgeek_error = is_seatgeek_event_url(seatgeek_url)
        if not seatgeek_ok:
            errors.append(f"{prefix}.seatgeek_url: {seatgeek_error}")

        provider_seatgeek_url = provider_link_value(event, "seatgeek", "url")
        if provider_seatgeek_url not in (None, ""):
            provider_ok, provider_error = is_seatgeek_event_url(provider_seatgeek_url)
            if not provider_ok:
                errors.append(f"{prefix}.provider_links.seatgeek.url: {provider_error}")
            top_level = seatgeek_url.strip() if isinstance(seatgeek_url, str) else ""
            provider_level = provider_seatgeek_url.strip() if isinstance(provider_seatgeek_url, str) else ""
            if top_level and provider_level and top_level != provider_level:
                errors.append(f"{prefix}.provider_links.seatgeek.url: must match top-level seatgeek_url when both are present")
            elif provider_level and not top_level:
                errors.append(f"{prefix}.provider_links.seatgeek.url: must also be present in top-level seatgeek_url before public CTA use")

        provider_seatgeek_verified = provider_link_value(event, "seatgeek", "verified")
        if isinstance(seatgeek_url, str) and seatgeek_url.strip() and provider_seatgeek_url in (None, "") and provider_seatgeek_verified is True:
            errors.append(f"{prefix}.provider_links.seatgeek.verified: cannot be true when provider_links.seatgeek.url is empty and top-level seatgeek_url is used")
        if provider_seatgeek_url not in (None, "") and provider_seatgeek_verified is True and isinstance(seatgeek_url, str) and seatgeek_url.strip() and provider_seatgeek_url.strip() != seatgeek_url.strip():
            errors.append(f"{prefix}.provider_links.seatgeek.verified: cannot be true for a URL that differs from top-level seatgeek_url")

        if args.require_affiliate_urls:
            for url_field in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
                value = event.get(url_field)
                if not isinstance(value, str) or value.strip() == "":
                    errors.append(f"{prefix}.{url_field}: required when --require-affiliate-urls is set")

    if errors:
        print("VALIDATION FAILED:", file=sys.stderr)
        for e in errors:
            print(f"- {e}", file=sys.stderr)
        return 1

    print(f"OK: {len(data)} events validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
