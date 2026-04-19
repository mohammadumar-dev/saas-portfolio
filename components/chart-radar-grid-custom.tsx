"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardAction,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartRadarGridCustom({ monthly }: { monthly: number[] }) {
  const currentMonth = new Date().getMonth()
  const defaultPhase = currentMonth < 6 ? "1" : "2"
  const [phase, setPhase] = React.useState(defaultPhase)

  const indices = phase === "1" ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11]

  const chartData = indices.map((i) => ({
    month: MONTHS[i],
    contributions: monthly[i] ?? 0,
  }))

  const total = chartData.reduce((sum, d) => sum + d.contributions, 0)
  const phaseLabel = phase === "1" ? "Jan – Jun" : "Jul – Dec"

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Monthly Contributions</CardTitle>
        <CardDescription>
          {phaseLabel} · {total.toLocaleString()} contributions
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={[phase]}
            onValueChange={(v) => { if (v[0]) setPhase(v[0]) }}
            variant="outline"
            size="sm"
            className="flex-wrap"
          >
            <ToggleGroupItem value="1" className="text-xs px-2">Jan – Jun</ToggleGroupItem>
            <ToggleGroupItem value="2" className="text-xs px-2">Jul – Dec</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid radialLines={false} strokeWidth={1} />
            <PolarAngleAxis dataKey="month" tick={{ fontSize: 12 }} />
            <Radar
              dataKey="contributions"
              fill="var(--color-contributions)"
              fillOpacity={0.5}
              stroke="var(--color-contributions)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
