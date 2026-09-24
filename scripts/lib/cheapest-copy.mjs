// Which uses of "cheapest" public copy may carry (owner decision, 2026-09-24).
//
// Finding cheaper tickets is why most visitors come, so the copy may name that
// goal. What it may never do is promise the site delivers it: listed prices
// exclude fees, only some providers share prices at all, and a snapshot can be
// hours old, so "we find the cheapest tickets" is a claim the site cannot
// substantiate (SAFE_PUBLISHING_RULES.md → Price Display).
//
// The line is drawn by framing, not by word. Each pattern below is a framing
// that names the reader's goal or gives advice, never a result. The copy guards
// strip only the matched span before their own "cheapest" rule runs, so the
// rest of the sentence is still checked and a promise tacked onto an allowed
// framing ("Looking for the cheapest tickets? We find them.") still has to pass
// every other rule. Any "cheapest" outside these framings still fails.
//
// Adding a framing widens what every guard accepts at once, so add one only
// with the same owner sign-off, and add its fixtures to the self-test below.
export const ALLOWED_CHEAPEST_FRAMINGS = [
  // The reader's goal, asked as a question: "Looking for the cheapest tickets?"
  /\b(?:looking|searching|hunting)\s+for\s+(?:the\s+)?cheapest\b[^.!?\n]*\?/gi,
  // Advice on doing it yourself: "How to find the cheapest tickets for a stadium show"
  /\bhow\s+to\s+(?:find|get|spot)\s+(?:the\s+)?cheapest\b/gi
];

export function withoutAllowedCheapestFramings(text) {
  return ALLOWED_CHEAPEST_FRAMINGS.reduce((scanned, pattern) => scanned.replace(pattern, " "), String(text));
}

// Fixtures shared by every guard's self-test, so the guards cannot disagree
// about what is allowed.
export const CHEAPEST_FIXTURES = {
  allowed: [
    "Looking for the cheapest tickets?",
    "Searching for the cheapest seats for a Friday show?",
    "How to find the cheapest tickets for a stadium show"
  ],
  blocked: [
    "We find the cheapest tickets.",
    "The cheapest way to buy tickets for any show you want to see this year.",
    "Cheapest tickets guaranteed.",
    "Looking for the cheapest tickets? This is the cheapest site.",
    "The cheapest price is on Vivid Seats.",
    "Looking for the cheapest tickets. We have them."
  ]
};

// Returns the fixtures the framings misjudge; empty means they behave. Run by
// scripts/homepage-proposition.test.mjs.
export function cheapestFramingFailures() {
  const failures = [];
  for (const sentence of CHEAPEST_FIXTURES.allowed) {
    if (/\bcheapest\b/i.test(withoutAllowedCheapestFramings(sentence))) failures.push(`should be allowed: ${sentence}`);
  }
  for (const sentence of CHEAPEST_FIXTURES.blocked) {
    if (!/\bcheapest\b/i.test(withoutAllowedCheapestFramings(sentence))) failures.push(`should be blocked: ${sentence}`);
  }
  return failures;
}
