import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, ExternalLinkIcon, GitCommitHorizontalIcon, LayoutDashboardIcon, MapPinIcon } from "lucide-react"
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

  // Build repo aliases for GraphQL
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

  // Get user createdAt + project commits in one call
  const infoRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: `{ user(login: "${GITHUB_USERNAME}") { createdAt ${repoFields} } }` }),
    next: { revalidate: 3600 },
  })
  const infoJson = await infoRes.json()
  const userNode = infoJson?.data?.user ?? {}

  // Extract per-project commits
  const projectCommits: Record<string, number> = {}
  for (const name of allRepoNames) {
    const key = name.replace(/-/g, "_")
    projectCommits[name] =
      userNode[key]?.defaultBranchRef?.target?.history?.totalCount ?? 0
  }

  // Fetch all-time contributions year by year
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
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
          <span className="font-heading text-sm font-semibold tracking-tight">
            {personal.name}
          </span>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {portfolioData.nav.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <LayoutDashboardIcon className="size-3.5" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-24 lg:px-6">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="flex flex-col items-start gap-6 md:max-w-xl">
            <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-green-500" />
              {personal.availability}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {personal.name}
              </h1>
              <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
                {personal.title}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {personal.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
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
                  className="flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-8 border-t pt-4 w-full">
              {resolvedStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-heading text-2xl font-bold">{s.number}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 font-heading text-2xl font-bold">
                  <MapPinIcon className="size-4 text-muted-foreground" />
                  {personal.location.city}
                </div>
                <span className="text-xs text-muted-foreground">{personal.location.region}, {personal.location.country}</span>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="shrink-0 self-center md:self-auto">
            <div className="relative size-48 overflow-hidden rounded-2xl border-2 border-border shadow-lg sm:size-56 lg:size-64">
              <Image
                src="/me.png"
                alt={personal.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl font-bold">About Me</h2>
              <div className="flex flex-col gap-3">
                {personal.bio.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                ))}
              </div>
              <blockquote className="mt-2 border-l-2 pl-4 italic text-sm text-muted-foreground">
                "{personal.pullQuote}"
              </blockquote>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold">What Drives Me</h3>
              <div className="flex flex-col gap-4">
                {pillars.map((p) => (
                  <div key={p.title} className="flex gap-3 rounded-lg border bg-card p-4">
                    <div className="mt-0.5 shrink-0 text-primary">{p.icon}</div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{p.title}</span>
                      <span className="text-xs text-muted-foreground">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="font-heading mb-8 text-2xl font-bold">Skills & Technologies</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((cat) => (
              <div key={cat.label} className="rounded-lg border bg-card p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-primary">{cat.icon}</span>
                  <span className="text-sm font-semibold">{cat.label}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">{cat.count}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      title={s.tip}
                      className="rounded border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section id="projects" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="font-heading mb-8 text-2xl font-bold">Projects</h2>
          <div className="mb-6 rounded-xl border bg-card p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">{projects.featured.tag}</Badge>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-3 lg:max-w-xl">
                <h3 className="font-heading text-2xl font-bold">{projects.featured.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{projects.featured.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {projects.featured.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs font-normal">{b}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {projects.featured.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-center gap-0.5 rounded-lg border bg-muted/50 px-3 py-2 text-center">
                      <span className="font-heading text-lg font-bold">{m.value}</span>
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                  {projectCommits[projects.featured.repoName] > 0 && (
                    <div className="flex flex-col items-center gap-0.5 rounded-lg border bg-muted/50 px-3 py-2 text-center col-span-3 sm:col-span-1">
                      <span className="font-heading text-lg font-bold">
                        {projectCommits[projects.featured.repoName].toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">Commits</span>
                    </div>
                  )}
                </div>
                <a
                  href={projects.featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <ExternalLinkIcon className="size-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.items.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 rounded-lg border bg-card p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">{p.category}</span>
                    <h3 className="font-heading text-base font-semibold">{p.title}</h3>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-auto flex flex-wrap gap-1">
                  {p.badges.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs font-normal">{b}</Badge>
                  ))}
                </div>
                {projectCommits[p.repoName] > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground border-t pt-2 mt-1">
                    <GitCommitHorizontalIcon className="size-3.5 shrink-0" />
                    {projectCommits[p.repoName].toLocaleString()} commits
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
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
      <section id="experience" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="font-heading mb-8 text-2xl font-bold">Experience & Education</h2>
          <div className="flex flex-col gap-0">
            {experience.map((exp, i) => (
              <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`size-2.5 rounded-full border-2 mt-1.5 shrink-0 ${exp.isCurrent ? "border-primary bg-primary" : "border-muted-foreground bg-background"}`} />
                  {i < experience.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{exp.role}</h3>
                    {exp.isCurrent && (
                      <Badge variant="secondary" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                      {exp.company}
                    </a>
                    <span>·</span>
                    <span>{exp.date}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{exp.desc}</p>
                  <p className="text-xs font-medium text-foreground">{exp.achievement}</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {certifications.length > 0 && (
            <div className="mt-8 rounded-lg border bg-muted/30 p-5">
              <h3 className="font-heading mb-3 text-sm font-semibold">Certifications</h3>
              <div className="flex flex-col gap-1.5">
                {certifications.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-1 shrink-0 rounded-full bg-primary" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-6">
          <h2 className="font-heading mb-3 text-2xl font-bold">Let's Work Together</h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground">
            {personal.availability} Reach out via any channel below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LayoutDashboardIcon className="size-4" />
              Explore GitHub Dashboard
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-6">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span className="text-xs text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </span>
        </div>
      </footer>

    </div>
  )
}
