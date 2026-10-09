// Inspect schema structure, never ordinary text values such as an event name
// or URL containing "priced". Walk nested properties and schema @type values
// so moving a forbidden Offer/price/availability field cannot evade the gate.
export function hasSchemaProperty(value, pattern) {
  if (Array.isArray(value)) return value.some((item) => hasSchemaProperty(item, pattern));
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).some(([key, item]) => {
    if (pattern.test(key)) return true;
    if (key === "@type") {
      const types = Array.isArray(item) ? item : [item];
      if (types.some((type) => typeof type === "string" && pattern.test(type.split(/[/#:]/).pop()))) return true;
    }
    return hasSchemaProperty(item, pattern);
  });
}
