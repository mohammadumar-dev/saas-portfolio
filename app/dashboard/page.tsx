import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartPieLegend } from "@/components/chart-pie-legend"
import { ChartRadarGridCustom } from "@/components/chart-radar-grid-custom"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { getDashboardData } from "@/lib/github"

export const revalidate = 86400

export default async function Page() {
  const { weekly, monthly, repos, languages } = await getDashboardData()

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive data={weekly} />
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
        <ChartPieLegend data={languages} />
        <ChartRadarGridCustom monthly={monthly} />
      </div>
      <DataTable data={repos} />
    </div>
  )
}
