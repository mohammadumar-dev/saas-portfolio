import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { portfolioData } from "@/lib/data"
import {
  GitCommitHorizontal,
  ExternalLink,
  Star,
  ArrowUpRight,
  Boxes,
  Code2,
} from "lucide-react"

const GITHUB_USERNAME = "mohammadumar-dev"

async function getProjectCommits(): Promise<Record<string, number>> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return {}

  const allRepoNames = [
    portfolioData.projects.featured.repoName,
    ...portfolioData.projects.items.map((p) => p.repoName),
  ]

  const repoFields = allRepoNames
    .map(
      (name) => `
      ${name.replace(/-/g, "_")}: repository(name: "${name}") {
        defaultBranchRef {
          target { ... on Commit { history { totalCount } } }
        }
      }`
    )
    .join("\n")

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: `{ user(login: "${GITHUB_USERNAME}") { ${repoFields} } }` }),
    next: { revalidate: 3600 },
  })

  const json = await res.json()
  const userNode = json?.data?.user ?? {}
  const commits: Record<string, number> = {}
  for (const name of allRepoNames) {
    commits[name] = userNode[name.replace(/-/g, "_")]?.defaultBranchRef?.target?.history?.totalCount ?? 0
  }
  return commits
}

const accentMap = {
  blue:  { bar: "from-blue-500",   badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",   glow: "group-hover:shadow-blue-500/10",  dot: "bg-blue-500"  },
  green: { bar: "from-green-500",  badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20", glow: "group-hover:shadow-green-500/10", dot: "bg-green-500" },
  coral: { bar: "from-orange-500", badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20", glow: "group-hover:shadow-orange-500/10", dot: "bg-orange-500" },
}

export default async function ProjectsPage() {
  const { projects } = portfolioData
  const projectCommits = await getProjectCommits()

  const { featured } = projects
  const featuredCommits = projectCommits[featured.repoName] ?? 0
  const totalTech = new Set([
    ...featured.badges,
    ...projects.items.flatMap((p) => p.badges),
  ]).size

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Page hero */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent">
        <div className="absolute -top-8 -right-8 size-48 rounded-full bg-primary/5 blur-3xl" />
        <CardContent className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          {/* Text */}
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Portfolio</p>
            <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">Projects</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
              Production-grade software shipped across AI, healthcare &amp; fintech
            </p>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { icon: Boxes, value: `${1 + projects.items.length}`, label: "Projects"     },
                { icon: Code2, value: `${totalTech}+`,                label: "Technologies" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-1 items-center gap-2.5 rounded-xl bg-background/60 px-3 py-2.5 ring-1 ring-border backdrop-blur-sm sm:flex-col sm:items-center sm:gap-1 sm:px-5 sm:py-3"
                >
                  <Icon className="size-3.5 shrink-0 text-muted-foreground sm:size-4" />
                  <div className="flex items-baseline gap-1.5 sm:flex-col sm:items-center sm:gap-0">
                    <span className="font-heading text-base font-bold tabular-nums sm:text-xl">{value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={projects.allReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex-col sm:gap-1 sm:px-5 sm:py-3 sm:text-[11px]"
            >
              <ExternalLink className="size-3.5 sm:size-4" />
              <span className="uppercase tracking-wide">GitHub</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Featured project */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Featured</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent" />
          <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-transparent" />
          <CardContent className="relative flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Badge className="border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px]">
                    {featured.tag}
                  </Badge>
                </div>
                <h3 className="font-heading text-xl font-bold">{featured.title}</h3>
                <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">{featured.desc}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-background hover:bg-muted flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  GitHub
                </Link>
              </div>
            </div>

            <Separator />

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ...featured.metrics.map((m) => ({ value: m.value, label: m.label })),
                { value: featuredCommits ? `${featuredCommits}+` : "—", label: "Commits" },
              ].map((m) => (
                <div key={m.label} className="bg-muted/50 flex flex-col items-center justify-center rounded-xl p-3">
                  <span className="font-heading text-xl font-bold tabular-nums">{m.value}</span>
                  <span className="text-muted-foreground mt-0.5 text-[10px] uppercase tracking-wide">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5">
              {featured.badges.map((b) => (
                <Badge key={b} variant="secondary" className="text-xs">
                  {b}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other projects */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Other Projects</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.items.map((project) => {
            const theme = accentMap[project.accent] ?? accentMap.blue
            const commits = projectCommits[project.repoName] ?? 0

            return (
              <Card
                key={project.title}
                className={`group flex flex-col overflow-hidden transition-all hover:shadow-lg ${theme.glow}`}
              >
                <div className={`h-0.5 w-full bg-gradient-to-r ${theme.bar} to-transparent`} />
                <CardContent className="flex flex-1 flex-col gap-4 p-5">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-[10px] border ${theme.badge}`}>
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="font-heading text-base font-bold">{project.title}</h3>
                    </div>
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border bg-background hover:bg-muted shrink-0 rounded-lg border p-1.5 transition-colors"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>

                  <div className="mt-auto flex flex-col gap-3">
                    <Separator />
                    {/* Commit count */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GitCommitHorizontal className="size-3.5" />
                        <span>{commits ? `${commits} commits` : "—"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Open source</span>
                      </div>
                    </div>
                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.badges.slice(0, 6).map((b) => (
                        <Badge key={b} variant="outline" className="h-5 px-1.5 text-[10px]">
                          {b}
                        </Badge>
                      ))}
                      {project.badges.length > 6 && (
                        <Badge variant="outline" className="h-5 px-1.5 text-[10px] text-muted-foreground">
                          +{project.badges.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  )
}
