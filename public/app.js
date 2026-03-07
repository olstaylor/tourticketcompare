const statusEl = document.getElementById("status");
const showsEl = document.getElementById("shows");
const loadingOverlay = document.getElementById("loadingOverlay");
const promoBanner = document.getElementById("promoBanner");
const promoDismiss = document.getElementById("promoDismiss");
const promoCopyBtn = document.getElementById("promoCopyBtn");
const toastEl = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const artistFilter = document.getElementById("artistFilter");
const countryFilter = document.getElementById("countryFilter");
const monthFilter = document.getElementById("monthFilter");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const resultsCount = document.getElementById("resultsCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const stickyActionBar = document.getElementById("stickyActionBar");
const stickyActionLabel = document.getElementById("stickyActionLabel");
const stickyActionNote = document.getElementById("stickyActionNote");
const stickyPrimaryCta = document.getElementById("stickyPrimaryCta");
const stickyCopyBtn = document.getElementById("stickyCopyBtn");
const siteTitleEl = document.getElementById("siteTitle");
const siteSubtitleEl = document.getElementById("siteSubtitle");
const artistDirectoryList = document.getElementById("artistDirectoryList");

const PROMO_CODE = "YONCECAPITAL";
const PROMO_DISMISS_KEY = "promoBannerDismissed";
const SEARCH_KEY = "lastSearchQuery";
const PAGE_SIZE = 15;
let loadingCount = 0;

const EVENTS_URL = "./data/events.json";
const EVENTS_INDEX_URL = "./data/events-index.json";
const EVENTS_ARTIST_BASE_URL = "./data/events";
const ARTISTS_URL = "./data/artists.json";
const SHOWS_API_URL = "/api/shows";
const CLICK_API_URL = "/api/click";
const IS_FILE_PREVIEW = window.location && window.location.protocol === "file:";
// Safety: do not ship "fallback demo dates" that could be mistaken for real tour info.
const FALLBACK_EVENTS = [];
const FALLBACK_ARTISTS = [];

const RESERVED_PATHS = new Set(["api", "sitemap.xml", "robots.txt", "favicon.svg"]);
const DEFAULT_TITLE = "Tour Ticket Compare | Compare Concert Ticket Options by City";
const DEFAULT_DESCRIPTION = "Compare SeatGeek, Vivid Seats, and Ticketmaster options for upcoming stadium tour dates. Choose a city and showtime, then open provider checkout links in one place.";
const DEFAULT_HEADER_TITLE = "Tour Ticket Compare";
const DEFAULT_HEADER_SUBTITLE = "Choose a city, pick a showtime, and compare ticket options across major providers in seconds.";
const PLACEHOLDER_URL_MARKERS = [
  "example.com",
  "your-affiliate-link",
  "your-link-here",
  "replace-me",
  "placeholder",
  "tbd"
];
const PLACEHOLDER_HOST_REGEX = /(^|\.)example\.com$|(^|\.)example$|(^|\.)localhost$|^127\.0\.0\.1$/i;

const PROVIDERS = [
  {
    key: "seatgeek",
    name: "SeatGeek",
    label: "",
    promoAmount: 20,
    promoCode: PROMO_CODE,
    cta: `Open SeatGeek - use code ${PROMO_CODE}`,
    priority: 1
  },
  {
    key: "vividseats",
    name: "Vivid Seats",
    label: "",
    promoAmount: 30,
    promoCode: PROMO_CODE,
    cta: `Open Vivid Seats - use code ${PROMO_CODE}`,
    priority: 2
  },
  {
    key: "ticketmaster",
    name: "Ticketmaster",
    label: "Official tickets",
    promoAmount: 0,
    promoCode: null,
    cta: "Open Ticketmaster",
    priority: 3
  }
];

const STATE = {
  events: [],
  groups: [],
  artists: [],
  artistFeed: null,
  activeArtistSlug: null,
  activeArtistName: "",
  expandedCityKey: null,
  selectedEventId: null,
  visibleCityCount: PAGE_SIZE,
  filters: {
    artist: "all",
    search: "",
    country: "all",
    month: "all",
    sort: "earliest"
  },
  lastNonSearchState: null,
  priceCache: new Map(),
  inFlight: new Map(),
  searchNavIndex: -1
};

function showLoading() {
  loadingCount += 1;
  if (loadingOverlay) loadingOverlay.classList.remove("hidden");
}

function hideLoading() {
  loadingCount = Math.max(0, loadingCount - 1);
  if (loadingOverlay && loadingCount === 0) {
    loadingOverlay.classList.add("hidden");
  }
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  setTimeout(() => toastEl.classList.remove("visible"), 1800);
}

function initPromoBanner() {
  if (!promoBanner || !promoDismiss) return;
  const dismissed = localStorage.getItem(PROMO_DISMISS_KEY);
  if (dismissed === "true") {
    promoBanner.style.display = "none";
    return;
  }
  promoDismiss.addEventListener("click", () => {
    promoBanner.style.display = "none";
    localStorage.setItem(PROMO_DISMISS_KEY, "true");
  });
}

function initPromoCopy() {
  if (!promoCopyBtn) return;
  promoCopyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      showToast("Code copied");
    } catch (err) {
      showToast("Copy failed");
    }
  });
}

function loadSearchFromStorage() {
  const saved = localStorage.getItem(SEARCH_KEY);
  if (saved != null) {
    STATE.filters.search = saved;
  }
}

function persistSearch() {
  localStorage.setItem(SEARCH_KEY, STATE.filters.search);
}

function getInlineEvents() {
  const script = document.getElementById("eventsData");
  if (!script) return null;
  try {
    const raw = script.textContent.trim();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function getInlineArtists() {
  const script = document.getElementById("artistsData");
  if (!script) return null;
  try {
    const raw = script.textContent.trim();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function isEventsArray(value) {
  return Array.isArray(value);
}

function isArtistsArray(value) {
  return Array.isArray(value);
}

async function fetchFirstEventsArray(urls) {
  for (const url of urls) {
    if (typeof url !== "string" || !url.trim()) continue;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (isEventsArray(data)) {
        return data;
      }
    } catch (err) {
      // Try next candidate.
    }
  }
  return null;
}

async function fetchArtistEventsFromApi(artistSlug) {
  if (!artistSlug || IS_FILE_PREVIEW) {
    return { events: null, artistFeed: null, error: null };
  }

  try {
    const apiUrl = `${SHOWS_API_URL}?artistSlug=${encodeURIComponent(artistSlug)}&source=ticketmaster&limit=200`;
    const res = await fetch(apiUrl, {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      throw new Error(`artist_events_http_${res.status}`);
    }
    const payload = await res.json();
    const events = Array.isArray(payload && payload.shows) ? payload.shows : [];
    return {
      events,
      artistFeed: payload && typeof payload.artistFeed === "object" ? payload.artistFeed : null,
      error: null
    };
  } catch (err) {
    return {
      events: null,
      artistFeed: {
        source: "ticketmaster-discovery",
        cacheState: "error",
        error: err && err.message ? err.message : "artist_events_error"
      },
      error: err
    };
  }
}

function resetPagination() {
  STATE.visibleCityCount = PAGE_SIZE;
}

function formatDate(dateISO, timeZone) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  if (timeZone) options.timeZone = timeZone;
  const date = new Date(dateISO);
  return date.toLocaleString(undefined, options);
}

function formatShortDate(dateISO, timeZone) {
  const options = {
    month: "short",
    day: "numeric"
  };
  if (timeZone) options.timeZone = timeZone;
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, options);
}

function formatMonthYear(dateISO, timeZone) {
  const options = {
    month: "long",
    year: "numeric"
  };
  if (timeZone) options.timeZone = timeZone;
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, options);
}

function getMonthKey(dateISO, timeZone) {
  // Stable month key (YYYY-MM) for filters/sorting; avoids parsing localized month labels.
  const options = { year: "numeric", month: "2-digit" };
  if (timeZone) options.timeZone = timeZone;
  const parts = new Intl.DateTimeFormat("en", options).formatToParts(new Date(dateISO));
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  if (!year || !month) return "";
  return `${year}-${month}`;
}

function formatCurrency(value, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency || "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function normalizeText(value) {
  if (!value) return "";
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isLikelyPlaceholderUrl(rawUrl) {
  const source = String(rawUrl || "").toLowerCase();
  if (!source) return true;
  if (PLACEHOLDER_URL_MARKERS.some((token) => source.includes(token))) return true;
  try {
    const parsed = new URL(source);
    return PLACEHOLDER_HOST_REGEX.test(parsed.hostname);
  } catch (err) {
    return true;
  }
}

function isUsableAffiliateUrl(rawUrl) {
  if (typeof rawUrl !== "string") return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    return !isLikelyPlaceholderUrl(trimmed);
  } catch (err) {
    return false;
  }
}

function trackAffiliateClick(payload) {
  if (IS_FILE_PREVIEW) return;
  if (!payload || !isUsableAffiliateUrl(payload.url)) return;

  const body = JSON.stringify({
    eventId: payload.eventId || "",
    artistSlug: payload.artistSlug || "",
    provider: payload.provider || "",
    city: payload.city || "",
    country: payload.country || "",
    surface: payload.surface || "provider-card",
    targetUrl: payload.url,
    clickedAt: new Date().toISOString()
  });

  try {
    const asBlob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon(CLICK_API_URL, asBlob);
    if (sent) return;
  } catch (err) {
    // Fall back to fetch keepalive.
  }

  fetch(CLICK_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => {});
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text, query) {
  const safeText = escapeHtml(text || "");
  const normalizedQuery = String(query || "").trim();
  if (!normalizedQuery) return safeText;
  const pattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
  return safeText.replace(pattern, "<mark class=\"highlight-match\">$1</mark>");
}

function updateSearchClearButton() {
  if (!searchClearBtn) return;
  const hasText = Boolean(searchInput && searchInput.value.trim());
  searchClearBtn.hidden = !hasText;
}

function clearSearchInput() {
  if (!searchInput) return;
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  searchInput.focus();
}

function titleCaseFromSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeArtist(rawArtist) {
  if (!rawArtist || typeof rawArtist !== "object") return null;
  const slug = slugify(rawArtist.slug || rawArtist.artist_slug || "");
  if (!slug) return null;
  const name = String(rawArtist.name || rawArtist.artist_name || titleCaseFromSlug(slug)).trim();
  const description = String(rawArtist.description || "").trim();
  const eventsPath = String(rawArtist.events_path || rawArtist.eventsPath || "").trim();
  return {
    slug,
    name,
    description,
    events_path: eventsPath,
    priority: Number.isFinite(Number(rawArtist.priority)) ? Number(rawArtist.priority) : 999
  };
}

function getArtistEventsUrl(slug) {
  const normalizedSlug = slugify(slug || "");
  if (!normalizedSlug) return null;
  const match = STATE.artists.find((artist) => artist.slug === normalizedSlug);
  if (match && typeof match.events_path === "string" && match.events_path.trim()) {
    return match.events_path;
  }
  return `${EVENTS_ARTIST_BASE_URL}/${encodeURIComponent(normalizedSlug)}.json`;
}

function getRouteArtistSlug() {
  if (!window.location) return null;
  const raw = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!raw) return null;
  if (raw.includes("/")) return null;
  if (raw.includes(".")) return null;
  if (RESERVED_PATHS.has(raw)) return null;
  return slugify(raw);
}

function getArtistMap(events, artists) {
  const map = new Map();
  (artists || []).forEach((artist) => {
    if (!artist || typeof artist !== "object") return;
    const slug = slugify(artist.slug || artist.artist_slug || "");
    const name = String(artist.name || artist.artist_name || "").trim();
    if (!slug) return;
    map.set(slug, name || titleCaseFromSlug(slug));
  });
  events.forEach((event) => {
    if (!event || typeof event !== "object") return;
    const slug = slugify(event.artist_slug || "");
    const name = String(event.artist_name || "").trim();
    if (!slug) return;
    if (name) map.set(slug, name);
    else if (!map.has(slug)) map.set(slug, titleCaseFromSlug(slug));
  });
  return map;
}

function setMetaContent(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", value);
}

function setPageBranding() {
  const artistSlug = STATE.activeArtistSlug;
  const artistName = STATE.activeArtistName;
  const isArtistPage = Boolean(artistSlug);

  if (isArtistPage) {
    const artistMeta = STATE.artists.find((artist) => artist.slug === artistSlug);
    const title = `${artistName} Tour Tickets | Unofficial Fan-Made Comparison`;
    const description = artistMeta && artistMeta.description
      ? `${artistMeta.description} Compare SeatGeek, Vivid Seats, and Ticketmaster listings with transparent status and promo details.`
      : `Unofficial fan-made ${artistName} tour ticket comparison. Compare SeatGeek, Vivid Seats, and Ticketmaster listings with transparent status and promo details.`;
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    if (siteTitleEl) siteTitleEl.textContent = `${artistName} Ticket Comparison`;
    if (siteSubtitleEl) {
      siteSubtitleEl.textContent = `Fan-made, independent comparison page for ${artistName}. Not affiliated with ${artistName}, official tours, or ticketing partners.`;
    }

    const webPageStructuredData = document.getElementById("structuredDataWebPage");
    if (webPageStructuredData) {
      try {
        const parsed = JSON.parse(webPageStructuredData.textContent || "{}");
        parsed.name = title;
        parsed.description = description;
        webPageStructuredData.textContent = JSON.stringify(parsed);
      } catch (err) {
        // no-op
      }
    }
  } else {
    document.title = DEFAULT_TITLE;
    setMetaContent('meta[name="description"]', DEFAULT_DESCRIPTION);
    setMetaContent('meta[property="og:title"]', DEFAULT_TITLE);
    setMetaContent('meta[property="og:description"]', DEFAULT_DESCRIPTION);
    setMetaContent('meta[name="twitter:title"]', DEFAULT_TITLE);
    setMetaContent('meta[name="twitter:description"]', DEFAULT_DESCRIPTION);
    if (siteTitleEl) siteTitleEl.textContent = DEFAULT_HEADER_TITLE;
    if (siteSubtitleEl) siteSubtitleEl.textContent = DEFAULT_HEADER_SUBTITLE;
  }
}

function normalizeEvent(rawEvent) {
  if (!rawEvent || typeof rawEvent !== "object") return null;
  const datetimeIso = rawEvent.datetime_iso || rawEvent.dateTimeISO;
  if (typeof datetimeIso !== "string" || datetimeIso.trim() === "") return null;
  const parsedDate = Date.parse(datetimeIso);
  if (!Number.isFinite(parsedDate)) return null;

  return {
    ...rawEvent,
    id: String(rawEvent.id || "").trim(),
    event_name: String(rawEvent.event_name || rawEvent.name || "").trim(),
    artist_slug: slugify(rawEvent.artist_slug || ""),
    artist_name: String(rawEvent.artist_name || rawEvent.artist || "").trim(),
    city: String(rawEvent.city || "City TBA").trim(),
    country: String(rawEvent.country || "Country TBA").trim(),
    venue: String(rawEvent.venue || "Venue TBA").trim(),
    image_url: String(rawEvent.image_url || rawEvent.image || "").trim(),
    datetime_iso: datetimeIso
  };
}

function isUpcomingEvent(event) {
  const parsed = Date.parse(event.datetime_iso);
  return Number.isFinite(parsed) && parsed >= Date.now();
}

function getAffiliateUrl(event, providerKey) {
  if (!event || !providerKey) return null;
  const map = {
    seatgeek: event.seatgeek_url,
    vividseats: event.vividseats_url,
    ticketmaster: event.ticketmaster_url
  };
  const value = map[providerKey];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed.length) return null;
  return isUsableAffiliateUrl(trimmed) ? trimmed : null;
}

function getAvailableProvidersForEvent(event) {
  if (!event) return PROVIDERS;
  const hasSeatGeek = Boolean(getAffiliateUrl(event, "seatgeek"));
  const hasVividSeats = Boolean(getAffiliateUrl(event, "vividseats"));
  const hasTicketmaster = Boolean(getAffiliateUrl(event, "ticketmaster"));

  if (!hasSeatGeek && !hasVividSeats && hasTicketmaster) {
    return PROVIDERS.filter((provider) => provider.key === "ticketmaster");
  }
  return PROVIDERS;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function citySlug(city, country) {
  return `${slugify(city)}-${slugify(country)}`;
}

function buildGroupKey(city, country) {
  return `${city}|${country}`;
}

function groupEvents(events) {
  const map = new Map();
  events.forEach((event) => {
    const key = buildGroupKey(event.city, event.country);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(event);
  });

  const groups = [];
  map.forEach((groupEvents, key) => {
    const [city, country] = key.split("|");
    groupEvents.sort((a, b) => new Date(a.datetime_iso) - new Date(b.datetime_iso));
    const venues = Array.from(new Set(groupEvents.map((e) => e.venue)));
    const earliest = groupEvents[0].datetime_iso;
    const latest = groupEvents[groupEvents.length - 1].datetime_iso;
    const timezone = groupEvents.find((e) => e.timezone)?.timezone || null;

    groups.push({
      key,
      city,
      country,
      venues,
      earliest,
      latest,
      timezone,
      monthKey: getMonthKey(earliest, timezone),
      monthLabel: formatMonthYear(earliest, timezone),
      showCount: groupEvents.length,
      events: groupEvents,
      slug: citySlug(city, country)
    });
  });

  return groups;
}

function syncSearchInput() {
  if (searchInput) {
    searchInput.value = STATE.filters.search;
  }
  updateSearchClearButton();
}

function focusNextSearchMatch() {
  const cards = Array.from(document.querySelectorAll(".city-card"));
  if (cards.length === 0) return;

  STATE.searchNavIndex = (STATE.searchNavIndex + 1) % cards.length;
  const target = cards[STATE.searchNavIndex];
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "center" });
  const cta = target.querySelector(".city-cta");
  if (cta && typeof cta.focus === "function") {
    cta.focus({ preventScroll: true });
  } else {
    target.focus();
  }
}

function buildFilters(groups) {
  const artistCounts = new Map();
  groups.forEach((group) => {
    group.events.forEach((event) => {
      const slug = slugify(event.artist_slug || "");
      if (!slug) return;
      artistCounts.set(slug, (artistCounts.get(slug) || 0) + 1);
    });
  });

  const artists = [...STATE.artists];
  const knownSlugs = new Set(artists.map((artist) => artist.slug));
  artistCounts.forEach((_count, slug) => {
    if (!knownSlugs.has(slug)) {
      artists.push({
        slug,
        name: titleCaseFromSlug(slug),
        description: "",
        priority: 999
      });
    }
  });
  artists.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  const countries = Array.from(new Set(groups.map((g) => g.country))).sort();
  const monthPairs = new Map();
  groups.forEach((g) => {
    if (g.monthKey) monthPairs.set(g.monthKey, g.monthLabel || g.monthKey);
  });
  const months = Array.from(monthPairs.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, label]) => ({ key, label }));

  if (artistFilter) {
    artistFilter.innerHTML = `<option value="all">All artists</option>` +
      artists.map((artist) => {
        const count = artistCounts.get(artist.slug) || 0;
        return `<option value="${artist.slug}">${escapeHtml(artist.name)} (${count})</option>`;
      }).join("");
    artistFilter.value = STATE.filters.artist;
    artistFilter.disabled = Boolean(STATE.activeArtistSlug);
  }

  if (countryFilter) {
    countryFilter.innerHTML = `<option value="all">All countries</option>` +
      countries.map((c) => `<option value="${c}">${c}</option>`).join("");
    countryFilter.value = STATE.filters.country;
  }

  if (monthFilter) {
    monthFilter.innerHTML = `<option value="all">All months</option>` +
      months.map((m) => `<option value="${m.key}">${m.label}</option>`).join("");
    monthFilter.value = STATE.filters.month;
  }

  if (sortSelect) {
    sortSelect.value = STATE.filters.sort;
  }
}

function applyFilters(groups) {
  const query = normalizeText(STATE.filters.search.trim());
  return groups.filter((group) => {
    const matchesArtist = STATE.filters.artist === "all" ||
      group.events.some((event) => slugify(event.artist_slug || "") === STATE.filters.artist);
    const matchesSearch = !query ||
      normalizeText(group.city).includes(query) ||
      normalizeText(group.country).includes(query) ||
      group.venues.some((v) => normalizeText(v).includes(query));
    const matchesCountry = STATE.filters.country === "all" || group.country === STATE.filters.country;
    const matchesMonth = STATE.filters.month === "all" || group.monthKey === STATE.filters.month;
    return matchesArtist && matchesSearch && matchesCountry && matchesMonth;
  });
}

function sortGroups(groups) {
  const sorted = [...groups];
  switch (STATE.filters.sort) {
    case "city":
      sorted.sort((a, b) => a.city.localeCompare(b.city));
      break;
    case "most-shows":
      sorted.sort((a, b) => b.showCount - a.showCount);
      break;
    case "provider-ready":
      // Conservative proxy for conversion flow without making price claims.
      sorted.sort((a, b) => b.showCount - a.showCount || new Date(a.earliest) - new Date(b.earliest));
      break;
    default:
      sorted.sort((a, b) => new Date(a.earliest) - new Date(b.earliest));
  }
  return sorted;
}

function setCanonicalAndOgUrl() {
  // Avoid hardcoding placeholder domains into metadata.
  if (!window.location || (window.location.protocol !== "http:" && window.location.protocol !== "https:")) return;
  const url = `${window.location.origin}${window.location.pathname}`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", url);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", url);

  ["structuredDataWebsite", "structuredDataWebPage", "structuredDataOrganization"].forEach((id) => {
    const script = document.getElementById(id);
    if (!script) return;
    try {
      const parsed = JSON.parse(script.textContent || "{}");
      parsed.url = url;
      script.textContent = JSON.stringify(parsed);
    } catch (err) {
      // Ignore malformed JSON-LD; page metadata still updates.
    }
  });
}

function updateShareUrl({ citySlugValue, eventId }) {
  if (!window.location || !window.history) return;
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") return;
  const params = new URLSearchParams(window.location.search);
  if (citySlugValue) params.set("city", citySlugValue);
  else params.delete("city");
  if (eventId) params.set("event", eventId);
  else params.delete("event");
  const query = params.toString();
  const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", next);
}

function renderArtistDirectory() {
  if (!artistDirectoryList) return;

  const stats = new Map();
  STATE.groups.forEach((group) => {
    group.events.forEach((event) => {
      const slug = slugify(event.artist_slug || "");
      if (!slug) return;
      if (!stats.has(slug)) {
        stats.set(slug, { shows: 0, cities: new Set() });
      }
      const row = stats.get(slug);
      row.shows += 1;
      row.cities.add(buildGroupKey(event.city, event.country));
    });
  });

  const allArtists = [...STATE.artists];
  const known = new Set(allArtists.map((artist) => artist.slug));
  stats.forEach((_value, slug) => {
    if (!known.has(slug)) {
      allArtists.push({
        slug,
        name: titleCaseFromSlug(slug),
        description: "",
        priority: 999
      });
    }
  });
  allArtists.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  artistDirectoryList.innerHTML = "";
  if (!allArtists.length) return;

  allArtists.forEach((artist) => {
    const artistStats = stats.get(artist.slug) || { shows: 0, cities: new Set() };
    const selectedArtist = STATE.activeArtistSlug || STATE.filters.artist;
    const isActive = selectedArtist && selectedArtist !== "all" && selectedArtist === artist.slug;
    const card = document.createElement("a");
    card.className = "artist-link";
    if (isActive) card.classList.add("active");
    card.setAttribute("data-artist-slug", artist.slug);
    card.href = IS_FILE_PREVIEW ? "#" : `/${artist.slug}`;
    if (isActive) {
      card.setAttribute("aria-current", "page");
    }
    card.innerHTML = `
      <span class="artist-link-name">${escapeHtml(artist.name)}</span>
      <span class="artist-link-meta">${artistStats.shows} shows · ${artistStats.cities.size} cities</span>
    `;
    if (IS_FILE_PREVIEW) {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        STATE.filters.artist = artist.slug;
        if (artistFilter) artistFilter.value = artist.slug;
        resetPagination();
        render();
      });
    }
    artistDirectoryList.appendChild(card);
  });
}

function render() {
  const filtered = applyFilters(STATE.groups);
  const sorted = sortGroups(filtered);
  renderArtistDirectory();
  updateSearchClearButton();

  if (STATE.expandedCityKey && !sorted.some((g) => g.key === STATE.expandedCityKey)) {
    STATE.expandedCityKey = null;
    STATE.selectedEventId = null;
    updateShareUrl({ citySlugValue: null, eventId: null });
  }

  if (STATE.expandedCityKey) {
    const index = sorted.findIndex((g) => g.key === STATE.expandedCityKey);
    if (index >= STATE.visibleCityCount) {
      STATE.visibleCityCount = index + 1;
    }
  }

  const visibleGroups = sorted.slice(0, STATE.visibleCityCount);
  const totalShows = filtered.reduce((acc, group) => acc + group.showCount, 0);
  resultsCount.textContent = `Showing ${visibleGroups.length} of ${filtered.length} cities (${totalShows} shows)`;

  loadMoreBtn.style.display = filtered.length > visibleGroups.length ? "inline-flex" : "none";

  showsEl.innerHTML = "";
  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "provider-empty";
    if (STATE.events.length === 0) {
      const artistFeedState = STATE.artistFeed && STATE.artistFeed.source === "ticketmaster-discovery"
        ? STATE.artistFeed.cacheState
        : "";
      empty.textContent = STATE.activeArtistSlug
        ? (artistFeedState === "error"
            ? `Live Ticketmaster events are unavailable right now for ${STATE.activeArtistName}. Please try again shortly.`
            : artistFeedState === "rate_limited"
              ? `Ticketmaster is temporarily rate-limited for ${STATE.activeArtistName}. Please try again shortly.`
            : artistFeedState === "disabled"
              ? `Live Ticketmaster feed is not configured yet for ${STATE.activeArtistName}.`
              : artistFeedState
                ? `No upcoming Ticketmaster events found right now for ${STATE.activeArtistName}.`
                : `${STATE.activeArtistName} dates are not listed yet. Check back for upcoming shows.`)
        : "Tour dates will be announced soon. Check back for updated listings.";
    } else {
      empty.textContent = "No cities match your search. Try another city, venue, or country.";
    }
    showsEl.appendChild(empty);
    updateStickyActionBar(null, null);
    return;
  }
  visibleGroups.forEach((group) => {
    showsEl.appendChild(renderCityCard(group));
  });

  const selectedGroup = visibleGroups.find((group) => group.key === STATE.expandedCityKey) || null;
  const selectedEvent = selectedGroup
    ? selectedGroup.events.find((event) => event.id === STATE.selectedEventId) || null
    : null;
  updateStickyActionBar(selectedGroup, selectedEvent);
}

function renderCityCard(group) {
  const card = document.createElement("article");
  card.className = "city-card";
  card.dataset.cityKey = group.key;

  const venueLabel = group.venues.length > 1 ? "Multiple venues" : group.venues[0];
  const dateRange = group.showCount > 1
    ? `${formatShortDate(group.earliest, group.timezone)}–${formatShortDate(group.latest, group.timezone)}`
    : formatShortDate(group.earliest, group.timezone);
  const query = STATE.filters.search.trim();
  const cityHtml = highlightMatch(group.city, query);
  const countryHtml = highlightMatch(group.country, query);
  const venueHtml = highlightMatch(venueLabel, query);
  const groupHasAlternativeProviders = group.events.some((event) =>
    Boolean(getAffiliateUrl(event, "seatgeek") || getAffiliateUrl(event, "vividseats"))
  );

  const isExpanded = STATE.expandedCityKey === group.key;

  card.innerHTML = `
    <div class="city-summary">
      <div>
        <div class="city-title">${cityHtml}, ${countryHtml}</div>
        <div class="city-subtitle">${venueHtml} · ${group.showCount} shows · ${dateRange}</div>
        <div class="city-meta">${
          groupHasAlternativeProviders
            ? "Compare provider prices · Discounts available"
            : "Ticketmaster listings available"
        }</div>
      </div>
      <button class="city-cta" type="button" aria-expanded="${isExpanded}">Choose a date</button>
    </div>
    <div class="city-body" aria-hidden="${isExpanded ? "false" : "true"}">
      <div class="showtime-list"></div>
      <div class="provider-panel"></div>
    </div>
  `;

  const cta = card.querySelector(".city-cta");
  const body = card.querySelector(".city-body");
  const list = card.querySelector(".showtime-list");
  const panel = card.querySelector(".provider-panel");

  cta.addEventListener("click", () => toggleCity(group.key));

  card.classList.toggle("expanded", isExpanded);
  if (isExpanded) {
    renderShowtimes(list, group);
    renderProviders(panel, group);
    requestAnimationFrame(() => card.classList.add("expanded"));
  }

  return card;
}

function toggleCity(key) {
  if (STATE.expandedCityKey === key) {
    STATE.expandedCityKey = null;
    STATE.selectedEventId = null;
    updateShareUrl({ citySlugValue: null, eventId: null });
  } else {
    STATE.expandedCityKey = key;
    STATE.selectedEventId = null;
    const group = STATE.groups.find((g) => g.key === key);
    updateShareUrl({ citySlugValue: group ? group.slug : null, eventId: null });
  }
  render();
  if (STATE.expandedCityKey) {
    const card = document.querySelector(`[data-city-key="${STATE.expandedCityKey}"]`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderShowtimes(container, group) {
  container.innerHTML = "";
  group.events.forEach((event) => {
    const row = document.createElement("div");
    row.className = "showtime-row";
    if (STATE.selectedEventId === event.id) {
      row.classList.add("active");
    }
    const eventImage = event.image_url && isUsableAffiliateUrl(event.image_url)
      ? `<img src="${escapeHtml(event.image_url)}" alt="${escapeHtml(event.event_name || event.artist_name || "Event image")}" loading="lazy" decoding="async" class="showtime-image" />`
      : `<div class="showtime-image showtime-image-placeholder" aria-hidden="true"></div>`;
    row.innerHTML = `
      <div class="showtime-left">
        ${eventImage}
        <div>
          <div class="showtime-date">${formatDate(event.datetime_iso, event.timezone)}</div>
          <div class="showtime-meta">${event.event_name ? `${event.event_name} · ` : ""}${event.venue}</div>
        </div>
      </div>
      <button class="showtime-cta" type="button">Compare prices</button>
    `;

    row.querySelector(".showtime-cta").addEventListener("click", () => {
      STATE.selectedEventId = event.id;
      updateShareUrl({ citySlugValue: group.slug, eventId: event.id });
      render();
      requestAnimationFrame(() => {
        const panel = document.querySelector(`[data-city-key="${group.key}"] .provider-panel`);
        if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    container.appendChild(row);
  });
}

function formatLastChecked(isoDate) {
  if (!isoDate) return "Last checked just now";
  const ts = Date.parse(isoDate);
  if (!Number.isFinite(ts)) return "Last checked just now";
  const diffMs = Date.now() - ts;
  if (diffMs < 15 * 1000) return "Last checked just now";
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < hour) return `Last checked ${Math.max(1, Math.floor(diffMs / minute))}m ago`;
  if (diffMs < day) return `Last checked ${Math.max(1, Math.floor(diffMs / hour))}h ago`;
  return `Last checked ${Math.max(1, Math.floor(diffMs / day))}d ago`;
}

function getProviderStateMeta(priceData) {
  if (!priceData) return { key: "checking", label: "Checking" };

  const explicit = String(priceData.cacheState || "").toLowerCase();
  const status = String(priceData.status || "").toLowerCase();
  const fetchedAt = Date.parse(priceData.fetchedAt || "");
  const ageMs = Number.isFinite(fetchedAt) ? Date.now() - fetchedAt : Number.POSITIVE_INFINITY;

  if (explicit === "preview" || status === "preview_mode") return { key: "preview", label: "Preview" };
  if (explicit === "stale" || status === "stale") return { key: "stale", label: "Stale" };
  if (explicit === "rate_limited" || status === "rate_limited") return { key: "rate-limited", label: "Rate-limited" };
  if (status === "unavailable" || status === "error") return { key: "unavailable", label: "Unavailable" };
  if (explicit === "live") {
    return ageMs <= 15000
      ? { key: "live", label: "Live" }
      : { key: "cached", label: "Cached" };
  }
  if (explicit === "cached") return { key: "cached", label: "Cached" };

  if (status === "ok") {
    return ageMs <= 15000
      ? { key: "live", label: "Live" }
      : { key: "cached", label: "Cached" };
  }
  return { key: "cached", label: "Cached" };
}

function renderProviderMeta(priceData) {
  const state = getProviderStateMeta(priceData);
  return `
    <div class="provider-meta-row">
      <span class="provider-state provider-state-${state.key}">${state.label}</span>
      <span class="provider-updated">${formatLastChecked(priceData && priceData.fetchedAt)}</span>
    </div>
  `;
}

function renderProviders(panel, group) {
  panel.innerHTML = "";
  if (!STATE.selectedEventId) {
    panel.innerHTML = `
      <div class="provider-empty">Select a showtime to view provider options.</div>
    `;
    return;
  }

  const event = group.events.find((e) => e.id === STATE.selectedEventId);
  if (!event) return;
  const providersToRender = getAvailableProvidersForEvent(event);
  const isTicketmasterOnly = providersToRender.length === 1 && providersToRender[0].key === "ticketmaster";

  const header = document.createElement("div");
  header.className = "provider-header";
  header.innerHTML = `
    <div>
      <div class="provider-title">Choose your checkout provider for ${event.city} – ${formatShortDate(event.datetime_iso, event.timezone)}</div>
      <div class="provider-subtitle">${
        isTicketmasterOnly
          ? "Currently showing Ticketmaster as the available ticket source for this show."
          : "Promo code applies on SeatGeek and Vivid Seats only. New users, terms and fees apply."
      }</div>
    </div>
    ${isTicketmasterOnly ? "" : '<button class="promo-copy-btn secondary" type="button">Copy promo code</button>'}
  `;
  const copyBtn = header.querySelector("button");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(PROMO_CODE);
        showToast("Code copied");
      } catch (err) {
        showToast("Copy failed");
      }
    });
  }

  panel.appendChild(header);

  const cards = document.createElement("div");
  cards.className = "provider-cards";

  providersToRender.forEach((provider) => {
    const card = document.createElement("div");
    card.className = `provider-card provider-${provider.key}`;
    const cached = getCachedPrice(event.id, provider.name);

    if (!cached) {
      card.innerHTML = `
        <div class="provider-card-head">
          <div>
            <div class="provider-name">${provider.name}</div>
            ${provider.label ? `<div class="provider-label">${provider.label}</div>` : ""}
            ${renderProviderMeta(null)}
            ${provider.promoAmount ? `<div class="promo-pill">$${provider.promoAmount} off with code ${PROMO_CODE}</div>` : ""}
          </div>
          <div class="provider-price">Checking...</div>
        </div>
      `;
      cards.appendChild(card);
      fetchShowPrices(event).then(() => {
        if (STATE.selectedEventId === event.id) {
          render();
        }
      });
      return;
    }

    const displayCurrency = cached.currency || "GBP";
    const resolvedUrl = isUsableAffiliateUrl(cached.url)
      ? cached.url
      : (getAffiliateUrl(event, provider.key) || null);
    const priceLine = cached.price != null
      ? formatCurrency(cached.price, displayCurrency)
      : (resolvedUrl ? "Check live price on provider" : "Live pricing unavailable");
    const withCode = provider.promoAmount && cached.price != null
      ? formatCurrency(Math.max(0, cached.price - provider.promoAmount), displayCurrency)
      : null;
    const ctaHtml = resolvedUrl
      ? `<a href="${resolvedUrl}" class="provider-cta" data-track="affiliate" target="_blank" rel="noopener noreferrer">${provider.cta}</a>`
      : `<button type="button" class="provider-cta is-disabled" disabled>Live link unavailable</button>`;
    const microcopy = resolvedUrl
      ? (cached.price == null
          ? `Check live price on ${provider.name}. Availability may change.`
          : (provider.promoAmount
              ? `Secure checkout on ${provider.name}. Apply ${PROMO_CODE} at checkout (new users, terms apply).`
              : `Secure checkout on ${provider.name}. No promo code available.`))
      : "Live pricing unavailable. Availability may change.";

    card.innerHTML = `
      <div class="provider-card-head">
        <div>
          <div class="provider-name">${provider.name}</div>
          ${provider.label ? `<div class="provider-label">${provider.label}</div>` : ""}
          ${renderProviderMeta(cached)}
          ${provider.promoAmount ? `<div class="promo-pill">$${provider.promoAmount} off with code ${PROMO_CODE}</div>` : ""}
        </div>
        <div class="provider-price">${priceLine}</div>
      </div>
      ${withCode ? `<div class="provider-code">With code: ${withCode}</div>` : ""}
      <div class="provider-actions">
        ${ctaHtml}
        <div class="provider-microcopy">${microcopy}</div>
      </div>
    `;

    const cta = card.querySelector('a[data-track="affiliate"]');
    if (cta) {
      cta.addEventListener("click", () => {
        trackAffiliateClick({
          eventId: event.id,
          artistSlug: event.artist_slug,
          provider: provider.name,
          city: event.city,
          country: event.country,
          surface: "provider-card",
          url: resolvedUrl
        });
      });
    }

    cards.appendChild(card);
  });

  panel.appendChild(cards);
}

function getCachedPrice(eventId, providerName) {
  return STATE.priceCache.get(`${eventId}:${providerName}`);
}

function setCachedPrice(eventId, providerName, data) {
  STATE.priceCache.set(`${eventId}:${providerName}`, data);
}

function normalizeProviderName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function initStickyActions() {
  if (stickyCopyBtn) {
    stickyCopyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(PROMO_CODE);
        showToast("Code copied");
      } catch (err) {
        showToast("Copy failed");
      }
    });
  }

  if (stickyPrimaryCta) {
    stickyPrimaryCta.addEventListener("click", (e) => {
      const href = stickyPrimaryCta.getAttribute("href") || "";
      const disabled = stickyPrimaryCta.getAttribute("aria-disabled") === "true";
      if (disabled || !isUsableAffiliateUrl(href)) {
        e.preventDefault();
        return;
      }
      trackAffiliateClick({
        eventId: stickyPrimaryCta.dataset.eventId || "",
        artistSlug: stickyPrimaryCta.dataset.artistSlug || "",
        provider: stickyPrimaryCta.dataset.provider || "",
        city: stickyPrimaryCta.dataset.city || "",
        country: stickyPrimaryCta.dataset.country || "",
        surface: "sticky-cta",
        url: href
      });
    });
  }
}

function updateStickyActionBar(group, event) {
  if (!stickyActionBar || !stickyActionLabel || !stickyPrimaryCta) return;
  if (!group || !event) {
    stickyActionBar.hidden = true;
    stickyActionBar.classList.remove("active");
    if (stickyCopyBtn) stickyCopyBtn.disabled = true;
    return;
  }

  const availableProviders = getAvailableProvidersForEvent(event);
  const primaryProvider = availableProviders.find((provider) => provider.key === "seatgeek")
    || availableProviders.find((provider) => provider.key === "ticketmaster")
    || availableProviders[0]
    || PROVIDERS[0];
  const cachedPrimary = getCachedPrice(event.id, primaryProvider.name);
  const stickyLabel = `${group.city}, ${group.country} · ${formatShortDate(event.datetime_iso, event.timezone)}`;
  stickyActionLabel.textContent = stickyLabel;
  const stickyHref = isUsableAffiliateUrl(cachedPrimary && cachedPrimary.url)
    ? cachedPrimary.url
    : (getAffiliateUrl(event, primaryProvider.key) || null);
  stickyPrimaryCta.dataset.eventId = event.id;
  stickyPrimaryCta.dataset.artistSlug = event.artist_slug || "";
  stickyPrimaryCta.dataset.provider = primaryProvider.name;
  stickyPrimaryCta.dataset.city = event.city || "";
  stickyPrimaryCta.dataset.country = event.country || "";
  if (stickyHref) {
    stickyPrimaryCta.setAttribute("href", stickyHref);
    stickyPrimaryCta.removeAttribute("aria-disabled");
    stickyPrimaryCta.removeAttribute("tabindex");
    stickyPrimaryCta.classList.remove("is-disabled");
    stickyPrimaryCta.textContent = `View ${primaryProvider.name} tickets`;
    const supportsPromoCode = primaryProvider.promoAmount > 0;
    if (stickyActionNote) {
      stickyActionNote.textContent = supportsPromoCode
        ? `Use code ${PROMO_CODE} at checkout (new users)`
        : `Secure checkout on ${primaryProvider.name}. Availability may change.`;
    }
    if (stickyCopyBtn) stickyCopyBtn.disabled = !supportsPromoCode;
  } else {
    stickyPrimaryCta.setAttribute("aria-disabled", "true");
    stickyPrimaryCta.setAttribute("tabindex", "-1");
    stickyPrimaryCta.classList.add("is-disabled");
    stickyPrimaryCta.removeAttribute("href");
    stickyPrimaryCta.textContent = "Live link unavailable";
    if (stickyActionNote) {
      stickyActionNote.textContent = "Live pricing unavailable. Availability may change.";
    }
    if (stickyCopyBtn) stickyCopyBtn.disabled = true;
  }
  stickyActionBar.hidden = false;
  stickyActionBar.classList.add("active");
}

function hasAllProviderData(eventId) {
  return PROVIDERS.every((provider) => Boolean(getCachedPrice(eventId, provider.name)));
}

function applyApiShowToCache(event, showPayload) {
  const prices = Array.isArray(showPayload && showPayload.prices) ? showPayload.prices : [];
  const pricesMap = new Map();
  prices.forEach((item) => {
    pricesMap.set(normalizeProviderName(item.provider), item);
  });

  PROVIDERS.forEach((provider) => {
    const key = normalizeProviderName(provider.name);
    const fromApi = pricesMap.get(key);
    const fromApiUrl = fromApi && typeof fromApi.url === "string" ? fromApi.url : null;
    const fallbackUrl = getAffiliateUrl(event, provider.key);
    const normalized = {
      provider: provider.name,
      price: fromApi && Number.isFinite(Number(fromApi.price)) ? Number(fromApi.price) : null,
      currency: fromApi && typeof fromApi.currency === "string" ? fromApi.currency : "USD",
      url: isUsableAffiliateUrl(fromApiUrl) ? fromApiUrl : (fallbackUrl || null),
      fetchedAt: fromApi && fromApi.fetchedAt ? fromApi.fetchedAt : new Date().toISOString(),
      status: fromApi && fromApi.status ? fromApi.status : "unavailable",
      cacheState: fromApi && fromApi.cacheState ? fromApi.cacheState : "cached"
    };
    setCachedPrice(event.id, provider.name, normalized);
  });
}

function setUnavailableProviderData(event, options = {}) {
  const status = options.status || "unavailable";
  const cacheState = options.cacheState || "cached";
  PROVIDERS.forEach((provider) => {
    setCachedPrice(event.id, provider.name, {
      provider: provider.name,
      price: null,
      currency: "USD",
      url: getAffiliateUrl(event, provider.key),
      fetchedAt: new Date().toISOString(),
      status,
      cacheState
    });
  });
}

async function fetchShowPrices(event) {
  if (!event || !event.id) return;
  if (hasAllProviderData(event.id)) return;

  if (IS_FILE_PREVIEW) {
    // Local file previews cannot call /api/shows. Keep links usable with explicit preview state.
    setUnavailableProviderData(event, { status: "preview_mode", cacheState: "preview" });
    return;
  }

  const inflightKey = `event:${event.id}`;
  const existing = STATE.inFlight.get(inflightKey);
  if (existing) return existing;

  showLoading();
  const request = (async () => {
    try {
      const params = new URLSearchParams();
      params.set("showId", event.id);
      params.set("includePrices", "true");
      if (event.artist_slug) {
        params.set("artistSlug", event.artist_slug);
      }
      if ((event.id && String(event.id).startsWith("tm-")) || (STATE.artistFeed && STATE.artistFeed.source === "ticketmaster-discovery")) {
        params.set("source", "ticketmaster");
      }
      const url = `${SHOWS_API_URL}?${params.toString()}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Failed to load provider data (${res.status})`);
      const data = await res.json();
      const shows = Array.isArray(data && data.shows) ? data.shows : [];
      const showPayload = shows.find((show) => show.id === event.id) || shows[0] || null;
      if (!showPayload) {
        setUnavailableProviderData(event);
        return;
      }
      applyApiShowToCache(event, showPayload);
    } catch (err) {
      setUnavailableProviderData(event);
    }
  })();

  const finalPromise = request.finally(() => {
    STATE.inFlight.delete(inflightKey);
    hideLoading();
  });

  STATE.inFlight.set(inflightKey, finalPromise);
  return finalPromise;
}

function attachFilterListeners() {
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    const nextValue = e.target.value;
    updateSearchClearButton();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const trimmed = nextValue.trim();
      const wasEmpty = STATE.filters.search.trim() === "";
      STATE.searchNavIndex = -1;

      if (trimmed && wasEmpty) {
        STATE.lastNonSearchState = {
          visibleCityCount: STATE.visibleCityCount,
          expandedCityKey: STATE.expandedCityKey,
          selectedEventId: STATE.selectedEventId,
          filters: {
            artist: STATE.filters.artist,
            country: STATE.filters.country,
            month: STATE.filters.month,
            sort: STATE.filters.sort
          }
        };
        resetPagination();
        STATE.expandedCityKey = null;
        STATE.selectedEventId = null;
        updateShareUrl({ citySlugValue: null, eventId: null });
      }

      if (!trimmed && !wasEmpty && STATE.lastNonSearchState) {
        STATE.visibleCityCount = STATE.lastNonSearchState.visibleCityCount;
        STATE.expandedCityKey = STATE.lastNonSearchState.expandedCityKey;
        STATE.selectedEventId = STATE.lastNonSearchState.selectedEventId;
        STATE.filters.artist = STATE.lastNonSearchState.filters.artist;
        STATE.filters.country = STATE.lastNonSearchState.filters.country;
        STATE.filters.month = STATE.lastNonSearchState.filters.month;
        STATE.filters.sort = STATE.lastNonSearchState.filters.sort;
        if (artistFilter) artistFilter.value = STATE.filters.artist;
        if (countryFilter) countryFilter.value = STATE.filters.country;
        if (monthFilter) monthFilter.value = STATE.filters.month;
        if (sortSelect) sortSelect.value = STATE.filters.sort;

        const group = STATE.groups.find((g) => g.key === STATE.expandedCityKey);
        updateShareUrl({
          citySlugValue: group ? group.slug : null,
          eventId: group && STATE.selectedEventId ? STATE.selectedEventId : null
        });
      }

      STATE.filters.search = trimmed;
      persistSearch();
      render();
    }, 200);
  });

  if (artistFilter) {
    artistFilter.addEventListener("change", (e) => {
      STATE.filters.artist = e.target.value;
      resetPagination();
      STATE.expandedCityKey = null;
      STATE.selectedEventId = null;
      updateShareUrl({ citySlugValue: null, eventId: null });
      render();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      clearSearchInput();
    });
  }

  if (countryFilter) {
    countryFilter.addEventListener("change", (e) => {
      STATE.filters.country = e.target.value;
      resetPagination();
      render();
    });
  }

  if (monthFilter) {
    monthFilter.addEventListener("change", (e) => {
      STATE.filters.month = e.target.value;
      resetPagination();
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      STATE.filters.sort = e.target.value;
      render();
    });
  }

  loadMoreBtn.addEventListener("click", () => {
    STATE.visibleCityCount += PAGE_SIZE;
    render();
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      if (STATE.activeArtistSlug) {
        STATE.filters.artist = STATE.activeArtistSlug;
      } else {
        STATE.filters.artist = "all";
      }
      STATE.filters.search = "";
      STATE.filters.country = "all";
      STATE.filters.month = "all";
      STATE.filters.sort = "earliest";
      if (searchInput) searchInput.value = "";
      if (artistFilter) artistFilter.value = STATE.filters.artist;
      if (countryFilter) countryFilter.value = STATE.filters.country;
      if (monthFilter) monthFilter.value = STATE.filters.month;
      if (sortSelect) sortSelect.value = STATE.filters.sort;
      persistSearch();
      resetPagination();
      STATE.expandedCityKey = null;
      STATE.selectedEventId = null;
      updateShareUrl({ citySlugValue: null, eventId: null });
      render();
    });
  }

  // Lightweight keyboard helpers:
  // - "/" focuses search
  // - "Escape" clears search when search is focused
  // - "Enter" while search is focused jumps to the next visible match
  document.addEventListener("keydown", (e) => {
    if (!searchInput) return;
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    const inTextField = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);

    if (e.key === "/" && !inTextField) {
      e.preventDefault();
      searchInput.focus();
    }

    if (e.key === "Enter" && document.activeElement === searchInput && searchInput.value.trim() !== "") {
      e.preventDefault();
      focusNextSearchMatch();
    }

    if (e.key === "Escape" && document.activeElement === searchInput) {
      clearSearchInput();
      searchInput.blur();
    }
  });
}

function handleDeepLinks() {
  const params = new URLSearchParams(window.location.search);
  const cityParam = params.get("city");
  const eventParam = params.get("event");

  if (eventParam) {
    const event = STATE.events.find((e) => e.id === eventParam);
    if (event) {
      STATE.filters.search = "";
      persistSearch();
      STATE.expandedCityKey = buildGroupKey(event.city, event.country);
      STATE.selectedEventId = event.id;
    }
  } else if (cityParam) {
    const match = STATE.groups.find((g) => g.slug === cityParam);
    if (match) {
      STATE.filters.search = "";
      persistSearch();
      STATE.expandedCityKey = match.key;
      STATE.selectedEventId = null;
    }
  }
}

async function loadEvents() {
  const inlineEvents = getInlineEvents();
  const routeArtistSlug = getRouteArtistSlug();
  const routeArtistEventsUrl = routeArtistSlug ? getArtistEventsUrl(routeArtistSlug) : null;
  STATE.artistFeed = null;

  let loadedEvents = null;
  if (routeArtistSlug && !IS_FILE_PREVIEW) {
    const apiResult = await fetchArtistEventsFromApi(routeArtistSlug);
    if (isEventsArray(apiResult.events)) {
      loadedEvents = apiResult.events;
    }
    if (apiResult.artistFeed) {
      STATE.artistFeed = apiResult.artistFeed;
    }
  }

  if (!isEventsArray(loadedEvents)) {
    const candidateUrls = routeArtistSlug
      ? [
          routeArtistEventsUrl,
          EVENTS_URL
        ]
      : [
          EVENTS_INDEX_URL,
          EVENTS_URL
        ];

    loadedEvents = await fetchFirstEventsArray(candidateUrls);
  }

  if (isEventsArray(loadedEvents)) {
    STATE.events = loadedEvents;
  } else if (isEventsArray(inlineEvents)) {
    STATE.events = inlineEvents;
  } else {
    STATE.events = FALLBACK_EVENTS;
  }

  const normalizedEvents = STATE.events
    .map(normalizeEvent)
    .filter(Boolean)
    .filter(isUpcomingEvent);
  const artistMap = getArtistMap(normalizedEvents, STATE.artists);

  STATE.activeArtistSlug = routeArtistSlug;
  STATE.activeArtistName = routeArtistSlug
    ? (artistMap.get(routeArtistSlug) || titleCaseFromSlug(routeArtistSlug))
    : "";

  if (STATE.activeArtistSlug) {
    STATE.filters.artist = STATE.activeArtistSlug;
  }

  STATE.events = routeArtistSlug
    ? normalizedEvents.filter((event) => event.artist_slug === routeArtistSlug)
    : normalizedEvents;
}

async function loadArtists() {
  const inlineArtists = getInlineArtists();
  try {
    const res = await fetch(ARTISTS_URL);
    if (!res.ok) throw new Error("Failed to load artists");
    const data = await res.json();
    if (isArtistsArray(data)) {
      STATE.artists = data.map(normalizeArtist).filter(Boolean);
      return;
    }
  } catch (err) {
    // Fallback below.
  }

  if (isArtistsArray(inlineArtists)) {
    STATE.artists = inlineArtists.map(normalizeArtist).filter(Boolean);
    return;
  }

  STATE.artists = FALLBACK_ARTISTS;
}

async function init() {
  showLoading();
  try {
    initPromoBanner();
    initPromoCopy();
    initStickyActions();
    loadSearchFromStorage();
    await loadArtists();
    await loadEvents();
  } finally {
    hideLoading();
  }
  setPageBranding();
  setCanonicalAndOgUrl();
  STATE.groups = groupEvents(STATE.events);
  handleDeepLinks();
  if (STATE.filters.search.trim() !== "") {
    STATE.lastNonSearchState = {
      visibleCityCount: STATE.visibleCityCount,
      expandedCityKey: STATE.expandedCityKey,
      selectedEventId: STATE.selectedEventId,
      filters: {
        artist: STATE.filters.artist,
        country: STATE.filters.country,
        month: STATE.filters.month,
        sort: STATE.filters.sort
      }
    };
  }
  buildFilters(STATE.groups);
  syncSearchInput();
  attachFilterListeners();
  if (statusEl) {
    const artistNote = STATE.activeArtistSlug ? ` for ${STATE.activeArtistName}` : "";
    const discoveryFeed = STATE.artistFeed && STATE.artistFeed.source === "ticketmaster-discovery"
      ? STATE.artistFeed
      : null;
    if (IS_FILE_PREVIEW) {
      statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities. Live provider checks are disabled in file preview mode.`;
    } else if (STATE.activeArtistSlug && discoveryFeed) {
      if (discoveryFeed.cacheState === "error") {
        statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities. Ticketmaster Discovery is temporarily unavailable.`;
      } else if (discoveryFeed.cacheState === "rate_limited") {
        statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities. Ticketmaster Discovery is currently rate-limited.`;
      } else if (discoveryFeed.cacheState === "disabled") {
        statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities. Ticketmaster Discovery is not configured.`;
      } else {
        const sourceLabel = discoveryFeed.cacheState === "cached" ? "cached Ticketmaster Discovery results" : "Ticketmaster Discovery API";
        statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities from ${sourceLabel}. Prices load on demand when you compare.`;
      }
    } else {
      statusEl.textContent = `Loaded ${STATE.events.length} upcoming shows${artistNote} across ${STATE.groups.length} cities. Prices load on demand when you compare.`;
    }
  }
  render();
}

init();
