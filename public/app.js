const statusEl = document.getElementById("status");
const showsEl = document.getElementById("shows");
const loadingOverlay = document.getElementById("loadingOverlay");
const promoBanner = document.getElementById("promoBanner");
const promoDismiss = document.getElementById("promoDismiss");
const promoCopyBtn = document.getElementById("promoCopyBtn");
const toastEl = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");
const monthFilter = document.getElementById("monthFilter");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("resultsCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const PROMO_CODE = "YONCECAPITAL";
const PROMO_DISMISS_KEY = "promoBannerDismissed";
const SEARCH_KEY = "lastSearchQuery";
const PAGE_SIZE = 15;
let loadingCount = 0;

const EVENTS_URL = "./data/events.json";
const FALLBACK_EVENTS = [
  {
    id: "evt-fallback-001",
    artist_slug: "beyonce",
    artist_name: "Beyonce",
    city: "London",
    country: "UK",
    venue: "Wembley Stadium",
    datetime_iso: "2027-06-03T19:30:00Z",
    tour_name: "Beyonce 2027 World Tour",
    seatgeek_event_id: "sg-fallback-001",
    vividseats_event_id: "vs-fallback-001",
    ticketmaster_event_id: "tm-fallback-001",
    seatgeek_url: "https://example.com/seatgeek/event/evt-fallback-001",
    vividseats_url: "https://example.com/vividseats/event/evt-fallback-001",
    ticketmaster_url: "https://example.com/ticketmaster/event/evt-fallback-001"
  }
];

const PROVIDERS = [
  {
    key: "seatgeek",
    name: "SeatGeek",
    label: "",
    promoAmount: 20,
    promoCode: PROMO_CODE,
    cta: `View tickets – code ${PROMO_CODE}`,
    priority: 1
  },
  {
    key: "vividseats",
    name: "Vivid Seats",
    label: "",
    promoAmount: 30,
    promoCode: PROMO_CODE,
    cta: `View tickets – code ${PROMO_CODE}`,
    priority: 2
  },
  {
    key: "ticketmaster",
    name: "Ticketmaster",
    label: "Official tickets",
    promoAmount: 0,
    promoCode: null,
    cta: "View official tickets",
    priority: 3
  }
];

const STATE = {
  events: [],
  groups: [],
  expandedCityKey: null,
  selectedEventId: null,
  visibleCityCount: PAGE_SIZE,
  filters: {
    search: "",
    country: "all",
    month: "all",
    sort: "earliest"
  },
  lastNonSearchState: null,
  priceCache: new Map(),
  inFlight: new Map()
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

function isEventsArray(value) {
  return Array.isArray(value);
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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
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
  return trimmed.length ? trimmed : null;
}

function buildProviderUrl(event, provider) {
  const affiliate = getAffiliateUrl(event, provider.key);
  if (affiliate) return affiliate;
  return `https://example.com/${provider.key}/event/${event.id}`;
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

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function estimateBasePrice(seed) {
  const base = 120 + (seed % 180);
  return Math.round(base / 5) * 5;
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
    const seed = hashString(key);
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
      slug: citySlug(city, country),
      estimatePrice: estimateBasePrice(seed)
    });
  });

  return groups;
}

function syncSearchInput() {
  if (searchInput) {
    searchInput.value = STATE.filters.search;
  }
}

function buildFilters(groups) {
  const countries = Array.from(new Set(groups.map((g) => g.country))).sort();
  const monthPairs = new Map();
  groups.forEach((g) => {
    if (g.monthKey) monthPairs.set(g.monthKey, g.monthLabel || g.monthKey);
  });
  const months = Array.from(monthPairs.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, label]) => ({ key, label }));

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
    const matchesSearch = !query ||
      normalizeText(group.city).includes(query) ||
      normalizeText(group.country).includes(query) ||
      group.venues.some((v) => normalizeText(v).includes(query));
    const matchesCountry = STATE.filters.country === "all" || group.country === STATE.filters.country;
    const matchesMonth = STATE.filters.month === "all" || group.monthKey === STATE.filters.month;
    return matchesSearch && matchesCountry && matchesMonth;
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
    case "best-value":
      sorted.sort((a, b) => a.estimatePrice - b.estimatePrice);
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

function render() {
  const filtered = applyFilters(STATE.groups);
  const sorted = sortGroups(filtered);

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
      empty.textContent = "Tour dates will be announced soon. Check back for updated listings.";
    } else {
      empty.textContent = "No cities match your search. Try another city, venue, or country.";
    }
    showsEl.appendChild(empty);
    return;
  }
  visibleGroups.forEach((group) => {
    showsEl.appendChild(renderCityCard(group));
  });
}

function renderCityCard(group) {
  const card = document.createElement("article");
  card.className = "city-card";
  card.dataset.cityKey = group.key;

  const venueLabel = group.venues.length > 1 ? "Multiple venues" : group.venues[0];
  const dateRange = group.showCount > 1
    ? `${formatShortDate(group.earliest, group.timezone)}–${formatShortDate(group.latest, group.timezone)}`
    : formatShortDate(group.earliest, group.timezone);

  const isExpanded = STATE.expandedCityKey === group.key;

  card.innerHTML = `
    <div class="city-summary">
      <div>
        <div class="city-title">${group.city}, ${group.country}</div>
        <div class="city-subtitle">${venueLabel} · ${group.showCount} shows · ${dateRange}</div>
        <div class="city-meta">Est. from ${formatCurrency(group.estimatePrice)} · Discounts available</div>
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
    row.innerHTML = `
      <div>
        <div class="showtime-date">${formatDate(event.datetime_iso, event.timezone)}</div>
        <div class="showtime-meta">${event.venue}</div>
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

function renderProviders(panel, group) {
  panel.innerHTML = "";
  if (!STATE.selectedEventId) {
    panel.innerHTML = `
      <div class="provider-empty">Select a showtime to compare prices.</div>
    `;
    return;
  }

  const event = group.events.find((e) => e.id === STATE.selectedEventId);
  if (!event) return;

  const header = document.createElement("div");
  header.className = "provider-header";
  header.innerHTML = `
    <div>
      <div class="provider-title">Price comparison for ${event.city} – ${formatShortDate(event.datetime_iso, event.timezone)}</div>
      <div class="provider-subtitle">New users only. Minimum spend may apply. Fees excluded.</div>
    </div>
    <button class="promo-copy-btn secondary" type="button">Copy code</button>
  `;
  header.querySelector("button").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      showToast("Code copied");
    } catch (err) {
      showToast("Copy failed");
    }
  });

  panel.appendChild(header);

  const cards = document.createElement("div");
  cards.className = "provider-cards";

  PROVIDERS.forEach((provider) => {
    const card = document.createElement("div");
    card.className = `provider-card provider-${provider.key}`;
    const cached = getCachedPrice(event.id, provider.name);

    if (!cached) {
      card.innerHTML = `
        <div class="provider-card-head">
          <div>
            <div class="provider-name">${provider.name}</div>
            ${provider.label ? `<div class="provider-label">${provider.label}</div>` : ""}
            ${provider.promoAmount ? `<div class="promo-pill">$${provider.promoAmount} off with code ${PROMO_CODE}</div>` : ""}
          </div>
          <div class="provider-price">Loading…</div>
        </div>
      `;
      cards.appendChild(card);
      fetchPrice(event, provider).then(() => {
        if (STATE.selectedEventId === event.id) {
          render();
        }
      });
      return;
    }

    const priceLine = cached.price != null ? formatCurrency(cached.price) : "Unavailable";
    const resolvedUrl = cached.url || buildProviderUrl(event, provider);
    const withCode = provider.promoAmount && cached.price != null
      ? formatCurrency(Math.max(0, cached.price - provider.promoAmount))
      : null;

    card.innerHTML = `
      <div class="provider-card-head">
        <div>
          <div class="provider-name">${provider.name}</div>
          ${provider.label ? `<div class="provider-label">${provider.label}</div>` : ""}
          ${provider.promoAmount ? `<div class="promo-pill">$${provider.promoAmount} off with code ${PROMO_CODE}</div>` : ""}
        </div>
        <div class="provider-price">${priceLine}</div>
      </div>
      ${withCode ? `<div class="provider-code">With code: ${withCode} <span>Estimated</span></div>` : ""}
      <div class="provider-actions">
        <a href="${resolvedUrl}" class="provider-cta" target="_blank" rel="noopener noreferrer">${provider.cta}</a>
        <div class="provider-microcopy">Secure checkout on ${provider.name}</div>
      </div>
    `;

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

function fetchPrice(event, provider) {
  const cacheKey = `${event.id}:${provider.name}`;
  const cached = STATE.priceCache.get(cacheKey);
  if (cached) return Promise.resolve(cached);

  const existing = STATE.inFlight.get(cacheKey);
  if (existing) return existing;

  showLoading();
  const seed = hashString(event.id + provider.name);
  const latency = 350 + (seed % 400);
  const unavailable = seed % 17 === 0;

  const request = new Promise((resolve) => {
    setTimeout(() => {
      const price = unavailable ? null : estimateBasePrice(seed + 41);
      const result = {
        provider: provider.name,
        price,
        currency: "GBP",
        url: buildProviderUrl(event, provider),
        fetchedAt: new Date().toISOString()
      };
      setCachedPrice(event.id, provider.name, result);
      resolve(result);
    }, latency);
  });

  const finalPromise = request.finally(() => {
    STATE.inFlight.delete(cacheKey);
    hideLoading();
  });

  STATE.inFlight.set(cacheKey, finalPromise);
  return finalPromise;
}

function attachFilterListeners() {
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    const nextValue = e.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const trimmed = nextValue.trim();
      const wasEmpty = STATE.filters.search.trim() === "";

      if (trimmed && wasEmpty) {
        STATE.lastNonSearchState = {
          visibleCityCount: STATE.visibleCityCount,
          expandedCityKey: STATE.expandedCityKey,
          selectedEventId: STATE.selectedEventId,
          filters: {
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
        STATE.filters.country = STATE.lastNonSearchState.filters.country;
        STATE.filters.month = STATE.lastNonSearchState.filters.month;
        STATE.filters.sort = STATE.lastNonSearchState.filters.sort;
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

  // Lightweight keyboard helpers (no UI changes):
  // - "/" focuses search
  // - "Escape" clears search when search is focused
  document.addEventListener("keydown", (e) => {
    if (!searchInput) return;
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    const inTextField = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);

    if (e.key === "/" && !inTextField) {
      e.preventDefault();
      searchInput.focus();
    }

    if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
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
  showLoading();
  const inlineEvents = getInlineEvents();
  try {
    const res = await fetch(EVENTS_URL);
    if (!res.ok) throw new Error("Failed to load events");
    const data = await res.json();
    if (isEventsArray(data)) {
      STATE.events = data;
    } else if (isEventsArray(inlineEvents)) {
      STATE.events = inlineEvents;
    } else {
      STATE.events = FALLBACK_EVENTS;
    }
  } catch (err) {
    if (isEventsArray(inlineEvents)) {
      STATE.events = inlineEvents;
    } else {
      STATE.events = FALLBACK_EVENTS;
    }
  } finally {
    hideLoading();
  }
}

async function init() {
  initPromoBanner();
  initPromoCopy();
  loadSearchFromStorage();
  setCanonicalAndOgUrl();
  await loadEvents();
  STATE.groups = groupEvents(STATE.events);
  handleDeepLinks();
  if (STATE.filters.search.trim() !== "") {
    STATE.lastNonSearchState = {
      visibleCityCount: STATE.visibleCityCount,
      expandedCityKey: STATE.expandedCityKey,
      selectedEventId: STATE.selectedEventId,
      filters: {
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
    statusEl.textContent = `Loaded ${STATE.events.length} shows across ${STATE.groups.length} cities. Prices load on demand when you compare.`;
  }
  render();
}

init();
