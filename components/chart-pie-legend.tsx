"use client"

import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type LanguageEntry = {
  name: string
  bytes: number
  color: string
}

function toKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "_")
}

export function ChartPieLegend({ data }: { data: LanguageEntry[] }) {
  if (!data.length) {
    return (
      <Card className="flex flex-col shadow-elevation-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Language Distribution</CardTitle>
          <CardDescription>Add a GITHUB_TOKEN to load live data</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    )
  }

  const total = data.reduce((sum, l) => sum + l.bytes, 0)
  const chartData = data.map((l) => ({
    key: toKey(l.name),
    name: l.name,
    value: l.bytes,
    pct: ((l.bytes / total) * 100).toFixed(1),
    fill: l.color,
  }))

  const chartConfig: ChartConfig = {
    value: { label: "Code" },
    ...Object.fromEntries(
      data.map((l) => [toKey(l.name), { label: l.name, color: l.color }])
    ),
  }

  return (
    <Card className="flex flex-col shadow-elevation-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Language Distribution</CardTitle>
        <CardDescription>Across all public repositories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/50 bg-card/95 backdrop-blur-sm shadow-elevation-2"
                  formatter={(_value, name) => (
                    <span className="font-medium font-mono">{name}</span>
                  )}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={2}
              stroke="transparent"
              isAnimationActive
              animationBegin={0}
              animationDuration={600}
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend list */}
        <div className="mt-2 mb-4 flex flex-col gap-1.5 px-2">
          {chartData.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="flex-1 text-xs text-muted-foreground truncate">{entry.name}</span>
              <span className="text-xs font-mono font-semibold tabular-nums text-foreground/80">
                {entry.pct}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
