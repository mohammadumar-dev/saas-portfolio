import { GitCommitHorizontalIcon, StarIcon, BookMarkedIcon, HistoryIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getGitHubKPIs } from "@/lib/github"

interface KpiCardProps {
  label: string
  value: string | number
  subtext: string
  detail: string
  icon: React.ElementType
  color: string
  badge?: string
}

function KpiCard({ label, value, subtext, detail, icon: Icon, color, badge }: KpiCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-card p-6",
        "shadow-elevation-1 hover-lift hover:shadow-elevation-2 transition-all",
      )}
    >
      {/* Top colored strip */}
      <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r to-transparent", color)} />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full opacity-20 blur-2xl bg-primary/30" />

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">
            {label}
          </span>
          {badge && (
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
              {badge}
            </span>
          )}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
          <Icon className="size-5 text-primary" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-sm font-medium text-foreground/80">{subtext}</span>
        <span className="text-xs text-muted-foreground">{detail}</span>
      </div>
    </div>
  )
}

export async function SectionCards() {
  const stats = await getGitHubKPIs()
  const thisYear = new Date().getFullYear()
  if (!stats) return null

  const cards: KpiCardProps[] = [
    {
      label: "Public Repositories",
      value: stats.publicRepos,
      subtext: `+${stats.reposThisYear} repos in ${thisYear}`,
      detail: "All public GitHub repositories",
      icon: BookMarkedIcon,
      color: "from-chart-1",
      badge: `+${stats.reposThisYear} this year`,
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      subtext: "Starred by the community",
      detail: "Total stars on public repositories",
      icon: StarIcon,
      color: "from-chart-4",
    },
    {
      label: "All-time Commits",
      value: stats.allTimeCommits.toLocaleString(),
      subtext: `Across all years since ${stats.joinYear}`,
      detail: `Active since ${stats.joinYear}`,
      icon: HistoryIcon,
      color: "from-chart-2",
      badge: `Since ${stats.joinYear}`,
    },
    {
      label: `Contributions ${thisYear}`,
      value: stats.commitsThisYear.toLocaleString(),
      subtext: `Commits pushed in ${thisYear}`,
      detail: "GitHub contribution activity",
      icon: GitCommitHorizontalIcon,
      color: "from-chart-3",
      badge: "This year",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  )
}
