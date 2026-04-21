"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type ContributionWeek = {
  date: string
  contributions: number
}

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ data }: { data: ContributionWeek[] }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("1y")

  React.useEffect(() => {
    if (isMobile) setTimeRange("90d")
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    if (!data.length) return []
    const now = new Date(data[data.length - 1].date)
    const cutoff = new Date(now)
    if (timeRange === "90d") cutoff.setDate(cutoff.getDate() - 90)
    else if (timeRange === "6m") cutoff.setMonth(cutoff.getMonth() - 6)
    else cutoff.setFullYear(cutoff.getFullYear() - 1)
    return data.filter((w) => new Date(w.date) >= cutoff)
  }, [data, timeRange])

  const totalContributions = filteredData.reduce((sum, w) => sum + w.contributions, 0)

  if (!data.length) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
          <CardDescription>Add a GITHUB_TOKEN to load live data</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="@container/card shadow-elevation-1">
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            <span className="font-mono font-semibold tabular-nums text-foreground">
              {totalContributions.toLocaleString()}
            </span>{" "}
            contributions in the selected period
          </span>
          <span className="@[540px]/card:hidden font-mono font-semibold tabular-nums text-foreground">
            {totalContributions.toLocaleString()}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => setTimeRange(value[0] ?? "1y")}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="1y">Last year</ToggleGroupItem>
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y" className="rounded-lg">Last year</SelectItem>
              <SelectItem value="6m" className="rounded-lg">Last 6 months</SelectItem>
              <SelectItem value="90d" className="rounded-lg">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--chart-1)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/50 bg-card/95 backdrop-blur-sm shadow-elevation-2"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="contributions"
              type="monotone"
              fill="url(#fillContributions)"
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
