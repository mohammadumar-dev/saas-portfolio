import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioData } from "@/lib/data"
import {
  GitCommitHorizontal,
  ExternalLink,
  Star,
  ArrowUpRight,
  Boxes,
  Code2,
  FolderGitIcon,
} from "lucide-react"
import { getProjectCommits } from "@/lib/github"

export const revalidate = 86400

const accentMap = {
  blue:  { bar: "from-blue-500",   badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",     glow: "group-hover:shadow-blue-500/10",   dot: "bg-blue-500"  },
  green: { bar: "from-green-500",  badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20", glow: "group-hover:shadow-green-500/10",  dot: "bg-green-500" },
  coral: { bar: "from-orange-500", badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20", glow: "group-hover:shadow-orange-500/10", dot: "bg-orange-500" },
}

export default async function ProjectsPage() {
  const { projects } = portfolioData
  const allRepoNames = [
    projects.featured.repoName,
    ...projects.items.map((p) => p.repoName),
  ]
  const projectCommits = await getProjectCommits(allRepoNames)

  const { featured } = projects
  const featuredCommits = projectCommits[featured.repoName] ?? 0
  const totalTech = new Set([
    ...featured.badges,
    ...projects.items.flatMap((p) => p.badges),
  ]).size

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Page hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
              <FolderGitIcon className="mr-1.5 size-3" />
              Portfolio
            </span>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Projects</h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Production-grade software shipped across AI, healthcare &amp; fintech
            </p>
          </div>

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
                  <Icon className="size-3.5 shrink-0 text-primary sm:size-4" />
                  <div className="flex items-baseline gap-1.5 sm:flex-col sm:items-center sm:gap-0">
                    <span className="text-base font-bold tabular-nums font-mono text-gradient-primary sm:text-xl">{value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={projects.allReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 sm:flex-col sm:gap-1 sm:px-5 sm:py-3 sm:text-[11px]"
            >
              <ExternalLink className="size-3.5 sm:size-4" />
              <span className="uppercase tracking-wide">GitHub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured project */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Featured</span>
          <span className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center rounded-full bg-[oklch(0.65_0.22_330)]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[oklch(0.65_0.22_330)]">
            Flagship Project
          </span>
        </div>

        <Card className="relative overflow-hidden hover-lift shadow-elevation-2 transition-all">
          <div className="absolute inset-0 bg-mesh-primary opacity-40" />
          <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 via-primary to-transparent" />
          <CardContent className="relative flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <Badge className="w-fit border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px]">
                  {featured.tag}
                </Badge>
                <h3 className="text-xl font-bold">{featured.title}</h3>
                <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">{featured.desc}</p>
              </div>
              <Link
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium hover:border-primary/30 hover:text-primary transition-all"
              >
                <ExternalLink className="size-3.5" />
                GitHub
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ...featured.metrics.map((m) => ({ value: m.value, label: m.label })),
                { value: featuredCommits ? `${featuredCommits}+` : "—", label: "Commits" },
              ].map((m) => (
                <div key={m.label} className="glass-card flex flex-col items-center justify-center rounded-xl p-3">
                  <span className="text-xl font-bold tabular-nums font-mono text-gradient-primary">{m.value}</span>
                  <span className="text-muted-foreground mt-0.5 text-[10px] uppercase tracking-wide font-mono">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5">
              {featured.badges.map((b) => (
                <Badge key={b} variant="secondary" className="text-xs bg-primary/8 border-primary/15 text-primary/80">
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
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Other Projects</span>
          <span className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
            {projects.items.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.items.map((project) => {
            const theme = accentMap[project.accent] ?? accentMap.blue
            const commits = projectCommits[project.repoName] ?? 0

            return (
              <Card
                key={project.title}
                className={`group flex flex-col overflow-hidden hover-lift shadow-elevation-1 transition-all`}
              >
                <div className={`h-0.5 w-full bg-gradient-to-r ${theme.bar} to-transparent`} />
                <CardContent className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <Badge className={`w-fit text-[10px] border ${theme.badge}`}>
                        {project.category}
                      </Badge>
                      <h3 className="text-base font-bold">{project.title}</h3>
                    </div>
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card shrink-0 rounded-lg p-1.5 hover:border-primary/30 transition-all"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>

                  <div className="mt-auto flex flex-col gap-3 pt-2 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <GitCommitHorizontal className="size-3.5" />
                        <span>{commits ? `${commits} commits` : "—"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Open source</span>
                      </div>
                    </div>
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
