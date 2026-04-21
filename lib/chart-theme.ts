export const CHART_COLORS = {
  1: "var(--chart-1)",
  2: "var(--chart-2)",
  3: "var(--chart-3)",
  4: "var(--chart-4)",
  5: "var(--chart-5)",
} as const

export const CHART_COLORS_ARRAY = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export const tooltipStyles = {
  className: "glass-strong rounded-xl border-border/50 shadow-elevation-2",
  labelClassName: "font-mono text-xs text-muted-foreground",
  valueClassName: "font-mono font-bold tabular-nums",
}

export const gridStyles = {
  stroke: "var(--border)",
  strokeDasharray: "3 3",
  vertical: false,
}

export const axisStyles = {
  tickLine: false,
  axisLine: false,
  tick: { fontSize: 11, fill: "var(--muted-foreground)" },
}
