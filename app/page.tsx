import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitCommitHorizontalIcon,
  LayoutDashboardIcon,
  MapPinIcon,
  CheckCircle2,
  CalendarDays,
  Award,
  Code2,
} from "lucide-react"
import { portfolioData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const GITHUB_USERNAME = "mohammadumar-dev"

async function getGitHubLandingData() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return { allTimeCommits: null, projectCommits: {} as Record<string, number> }

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

  const infoRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: `{ user(login: "${GITHUB_USERNAME}") { createdAt ${repoFields} } }` }),
    next: { revalidate: 3600 },
  })
  const infoJson = await infoRes.json()
  const userNode = infoJson?.data?.user ?? {}

  const projectCommits: Record<string, number> = {}
  for (const name of allRepoNames) {
    const key = name.replace(/-/g, "_")
    projectCommits[name] =
      userNode[key]?.defaultBranchRef?.target?.history?.totalCount ?? 0
  }

  const joinYear = new Date(userNode.createdAt as string).getFullYear()
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: thisYear - joinYear + 1 }, (_, i) => joinYear + i)

  const yearlyTotals = await Promise.all(
    years.map((year) =>
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{ user(login: "${GITHUB_USERNAME}") { contributionsCollection(from: "${year}-01-01T00:00:00Z" to: "${year}-12-31T23:59:59Z") { contributionCalendar { totalContributions } } } }`,
        }),
        next: { revalidate: 3600 },
      })
        .then((r) => r.json())
        .then(
          (d) =>
            (d?.data?.user?.contributionsCollection?.contributionCalendar
              ?.totalContributions as number) ?? 0
        )
    )
  )

  const allTimeCommits = yearlyTotals.reduce((sum, n) => sum + n, 0)
  return { allTimeCommits, projectCommits }
}

export default async function LandingPage() {
  const { personal, socials, stats, pillars, skills, projects, experience, certifications } = portfolioData
  const { allTimeCommits, projectCommits } = await getGitHubLandingData()

  const resolvedStats = stats.map((s) =>
    s.label === "GitHub Commits"
      ? { ...s, number: allTimeCommits ? `${allTimeCommits.toLocaleString()}+` : s.number }
      : s
  )

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
          <span className="flex items-center gap-2 font-heading text-sm font-bold tracking-tight">
            <Code2 className="size-4" />
            {personal.name}
          </span>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {portfolioData.nav.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <LayoutDashboardIcon className="size-3.5" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-20 -right-20 size-72 rounded-full bg-blue-500/5 blur-[80px]" />
          <div className="absolute top-40 -left-20 size-72 rounded-full bg-violet-500/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 lg:px-6">
          <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:justify-between">

            {/* Text */}
            <div className="flex flex-col items-start gap-7 md:max-w-xl">
              {/* Availability pill */}
              <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/8 px-3.5 py-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                </span>
                {personal.availability}
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
                  {personal.name}
                </h1>
                <p className="text-lg font-medium text-muted-foreground sm:text-xl">
                  {personal.title}
                </p>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">
                {personal.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                >
                  View Dashboard
                  <ArrowRightIcon className="size-4" />
                </Link>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border bg-card px-3.5 py-2.5 text-sm text-muted-foreground shadow-sm transition-all hover:border-border/80 hover:text-foreground hover:shadow"
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex w-full flex-wrap gap-6 border-t border-border/50 pt-5">
                {resolvedStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="font-heading text-2xl font-bold tabular-nums">{s.number}</span>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</span>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 font-heading text-2xl font-bold">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                    {personal.location.city}
                  </div>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{personal.location.region}, {personal.location.country}</span>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="shrink-0 self-center md:self-auto">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-xl" />
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/30 to-transparent" />
                <div className="relative size-48 overflow-hidden rounded-2xl border border-border/50 shadow-2xl sm:size-56 lg:size-64">
                  <Image
                    src="/me.png"
                    alt={personal.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-1.5 -right-1.5 flex size-8 items-center justify-center rounded-full border-2 border-background bg-green-500 shadow-lg">
                  <span className="size-2 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
          <div className="mb-10 flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">About</p>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <h2 className="font-heading text-2xl font-bold">About Me</h2>
              <div className="flex flex-col gap-3">
                {personal.bio.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                ))}
              </div>
              <div className="rounded-xl border-l-2 border-primary/30 bg-primary/5 px-4 py-3">
                <p className="text-sm italic leading-relaxed">&ldquo;{personal.pullQuote}&rdquo;</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold">What Drives Me</h3>
              <div className="flex flex-col gap-3">
                {pillars.map((p, i) => (
                  <div
                    key={p.title}
                    className="group flex gap-4 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${i === 0 ? "bg-blue-500/10 text-blue-500"
                        : i === 1 ? "bg-violet-500/10 text-violet-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                      {p.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">{p.title}</span>
                      <span className="text-xs leading-relaxed text-muted-foreground">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
          <div className="mb-10 flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Stack</p>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="font-heading mb-8 text-2xl font-bold">Skills & Technologies</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((cat, i) => {
              const colors = [
                { bar: "from-orange-500", dot: "bg-orange-500", icon: "bg-orange-500/10 text-orange-500" },
                { bar: "from-blue-500", dot: "bg-blue-500", icon: "bg-blue-500/10 text-blue-500" },
                { bar: "from-green-500", dot: "bg-green-500", icon: "bg-green-500/10 text-green-500" },
                { bar: "from-indigo-500", dot: "bg-indigo-500", icon: "bg-indigo-500/10 text-indigo-500" },
                { bar: "from-sky-500", dot: "bg-sky-500", icon: "bg-sky-500/10 text-sky-500" },
                { bar: "from-violet-500", dot: "bg-violet-500", icon: "bg-violet-500/10 text-violet-500" },
              ]
              const c = colors[i % colors.length]
              return (
                <div key={cat.label} className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
                  <div className={`h-0.5 bg-gradient-to-r ${c.bar} to-transparent`} />
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className={`flex size-8 items-center justify-center rounded-lg ${c.icon}`}>
                        {cat.icon}
                      </div>
                      <span className="text-sm font-semibold">{cat.label}</span>
                      <Badge variant="secondary" className="ml-auto font-mono text-xs">{cat.count}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span
                          key={s.name}
                          title={s.tip}
                          className="flex items-center gap-1 rounded-lg border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          <span className={`size-1.5 shrink-0 rounded-full ${c.dot}`} />
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
          <div className="mb-10 flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Work</p>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="font-heading mb-8 text-2xl font-bold">Projects</h2>

          {/* Featured */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent" />
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-transparent" />
            <div className="relative p-6 lg:p-8">
              <div className="mb-5 flex items-center gap-2">
                <Badge className="border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px]">
                  {projects.featured.tag}
                </Badge>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-3 lg:max-w-xl">
                  <h3 className="font-heading text-2xl font-bold">{projects.featured.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{projects.featured.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {projects.featured.badges.map((b) => (
                      <Badge key={b} variant="secondary" className="text-xs font-normal">{b}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                    {[
                      ...projects.featured.metrics,
                      { value: projectCommits[projects.featured.repoName] > 0 ? `${projectCommits[projects.featured.repoName].toLocaleString()}` : "—", label: "Commits" },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center gap-0.5 rounded-xl border bg-muted/50 px-4 py-3 text-center">
                        <span className="font-heading text-xl font-bold tabular-nums">{m.value}</span>
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={projects.featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:bg-muted hover:shadow-sm"
                  >
                    <ExternalLinkIcon className="size-4" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.items.map((p) => {
              const accentColor = {
                blue: { bar: "from-blue-500", badge: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
                green: { bar: "from-green-500", badge: "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400" },
                coral: { bar: "from-orange-500", badge: "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400" },
              }[p.accent] ?? { bar: "from-primary", badge: "" }

              return (
                <div key={p.title} className="group flex flex-col gap-3 overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
                  <div className={`h-0.5 bg-gradient-to-r ${accentColor.bar} to-transparent`} />
                  <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div className="flex flex-col gap-1">
                        <Badge className={`w-fit text-[10px] border ${accentColor.badge}`}>{p.category}</Badge>
                        <h3 className="font-heading text-base font-semibold">{p.title}</h3>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg border bg-background p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLinkIcon className="size-3.5" />
                      </a>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    <div className="mt-auto flex flex-col gap-2 border-t pt-3">
                      {projectCommits[p.repoName] > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <GitCommitHorizontalIcon className="size-3.5 shrink-0" />
                          {projectCommits[p.repoName].toLocaleString()} commits
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {p.badges.slice(0, 5).map((b) => (
                          <Badge key={b} variant="outline" className="text-[10px] font-normal">{b}</Badge>
                        ))}
                        {p.badges.length > 5 && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">+{p.badges.length - 5}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <a
              href={projects.allReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all repositories on GitHub
              <ArrowRightIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
          <div className="mb-10 flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Career</p>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="font-heading mb-8 text-2xl font-bold">Experience & Education</h2>

          <div className="flex flex-col gap-0">
            {experience.map((exp, i) => (
              <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`relative mt-1 size-3 shrink-0 rounded-full border-2 ${exp.isCurrent
                      ? "border-primary bg-primary shadow-[0_0_8px_2px] shadow-primary/30"
                      : "border-muted-foreground/40 bg-background"
                    }`} />
                  {i < experience.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-gradient-to-b from-border to-transparent" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">{exp.role}</h3>
                        {exp.isCurrent && (
                          <Badge className="border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 h-4 px-1.5 text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      <a href={exp.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {exp.company}
                        {exp.url !== "#" && <ExternalLinkIcon className="size-2.5" />}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="size-3" />
                      {exp.date}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{exp.desc}</p>
                  {exp.achievement && (
                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-green-500" />
                      <p className="text-xs font-medium">{exp.achievement}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] font-normal">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {certifications.length > 0 && (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {certifications.map((c, i) => {
                const colors = ["from-orange-500 bg-orange-500/10 text-orange-500", "from-blue-500 bg-blue-500/10 text-blue-500", "from-green-500 bg-green-500/10 text-green-500"]
                const [bar, ...rest] = colors[i % colors.length].split(" ")
                return (
                  <div key={c} className="overflow-hidden rounded-xl border bg-card">
                    <div className={`h-0.5 bg-gradient-to-r ${bar} to-transparent`} />
                    <div className="flex items-start gap-3 p-4">
                      <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${rest.join(" ")}`}>
                        <Award className="size-3.5" />
                      </div>
                      <p className="text-xs font-medium leading-snug">{c}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="border-t border-border/50">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-24 text-center lg:px-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Contact</p>
            <h2 className="font-heading mb-4 text-3xl font-bold sm:text-4xl">Let&apos;s Work Together</h2>
            <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
              {personal.availability} Reach out via any channel below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
              >
                <LayoutDashboardIcon className="size-4" />
                Explore Saas Portfolio Dashboard
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-6">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} {personal.name}</span>
          <span className="text-xs text-muted-foreground">Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>

    </div>
  )
}
