// Splits the free-text highlights field into an array of short chip labels.
// Prefers the middot separator ("3000 sq.ft · Corner plot"), then falls back
// to commas or line breaks so the field stays forgiving of how a user types.
// The result is capped so a very long list never breaks the fixed-size layout.
const MAX_CHIPS = 6;

export function splitHighlights(text) {
  if (!text) return [];

  let parts = text
    .split("\u00B7")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    parts = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (parts.length <= 1) {
    parts = text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (parts.length === 0) return [];

  if (parts.length > MAX_CHIPS) {
    const visible = parts.slice(0, MAX_CHIPS - 1);
    const remaining = parts.length - visible.length;
    visible.push(`+${remaining} more`);
    return visible;
  }

  return parts;
}
