"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
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
      <Card className="flex flex-col">
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

  const chartData = data.map((l) => ({
    key: toKey(l.name),
    name: l.name,
    value: l.bytes,
    fill: l.color,
  }))

  const chartConfig: ChartConfig = {
    value: { label: "Code" },
    ...Object.fromEntries(
      data.map((l) => [toKey(l.name), { label: l.name, color: l.color }])
    ),
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Language Distribution</CardTitle>
        <CardDescription>Across all public repositories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(_value, name) => (
                    <span className="font-medium">{name}</span>
                  )}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              paddingAngle={2}
              stroke="transparent"
            />
            <ChartLegend
              content={() => (
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-2 pt-4">
                  {chartData.map((entry) => (
                    <div key={entry.key} className="flex items-center gap-1.5">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: entry.fill }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
