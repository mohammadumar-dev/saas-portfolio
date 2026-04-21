const FALLBACK_PALETTE = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6",
  "#ec4899", "#14b8a6", "#f97316", "#8b5cf6", "#06b6d4",
  "#84cc16", "#e11d48", "#0ea5e9", "#d946ef", "#22c55e",
]

function hashIndex(name: string, max: number): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return hash % max
}

// Only hex colors are valid GitHub language colors — reject anything else to
// prevent CSS injection via the dangerouslySetInnerHTML path in chart.tsx.
const HEX_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/

export function resolveLanguageColor(name: string, apiColor: string | null | undefined): string {
  if (apiColor && HEX_COLOR_RE.test(apiColor) && apiColor !== "#8b8b8b") return apiColor
  return FALLBACK_PALETTE[hashIndex(name, FALLBACK_PALETTE.length)]
}
