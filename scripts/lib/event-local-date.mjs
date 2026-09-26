// The venue-local date/instant resolver lives in functions/_event-local-date.js
// so the Pages Functions runtime can import it (event identity, future event
// routes) without a second implementation. This re-export keeps the import
// path every provider matcher and report already uses.
export * from "../../functions/_event-local-date.js";
