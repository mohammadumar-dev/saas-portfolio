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
} from "lucide-react"
import { portfolioData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { LogoMark } from "@/components/logo-mark"
import { getAllTimeCommits, getProjectCommits } from "@/lib/github"

export const revalidate = 86400

export default async function LandingPage() {
  const { personal, socials, stats, pillars, skills, projects, experience, certifications } = portfolioData
  const allRepoNames = [
    projects.featured.repoName,
    ...projects.items.map((p) => p.repoName),
  ]
  const [allTimeCommits, projectCommits] = await Promise.all([
    getAllTimeCommits(),
    getProjectCommits(allRepoNames),
  ])

  const resolvedStats = stats.map((s) =>
    s.label === "GitHub Commits"
      ? { ...s, number: allTimeCommits ? `${allTimeCommits.toLocaleString()}+` : s.number }
      : s
  )

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-0">
            <LogoMark size="sm" showText name={personal.name} />
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {portfolioData.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90"
          >
            <LayoutDashboardIcon className="size-3.5" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-noise">
        {/* Background stack */}
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh-primary opacity-70" />

        {/* Extra glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-20 -right-20 size-72 rounded-full bg-[oklch(0.72_0.16_200)]/8 blur-[80px]" />
          <div className="absolute top-40 -left-20 size-72 rounded-full bg-[oklch(0.65_0.22_330)]/8 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 lg:px-6">
          <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:justify-between">

            {/* Text block */}
            <div className="flex flex-col items-start gap-7 md:max-w-xl">
              {/* Availability pill */}
              <div className="flex items-center gap-2 rounded-full border border-[oklch(0.62_0.17_155)]/25 bg-[oklch(0.62_0.17_155)]/8 px-4 py-1.5 text-xs font-medium text-[oklch(0.62_0.17_155)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[oklch(0.62_0.17_155)] opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-[oklch(0.62_0.17_155)]" />
                </span>
                {personal.availability}
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
                  {personal.name}
                </h1>
                <p className="text-lg font-semibold text-gradient-brand sm:text-xl">
                  {personal.title}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {personal.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 hover-lift"
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
                    className="glass-card flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover-lift"
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>

              {/* Stats as mini-cards */}
              <div className="flex w-full flex-wrap gap-3 border-t border-border/50 pt-5">
                {resolvedStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5 rounded-xl border bg-card/60 px-4 py-3 backdrop-blur-sm">
                    <span className="text-2xl font-bold tabular-nums font-mono text-gradient-primary">{s.number}</span>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-mono">{s.label}</span>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5 rounded-xl border bg-card/60 px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-1 text-2xl font-bold font-mono text-gradient-primary">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                    {personal.location.city}
                  </div>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-mono">{personal.location.region}</span>
                </div>
              </div>
            </div>

            {/* Avatar with decorative treatment */}
            <div className="shrink-0 self-center md:self-auto">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/25 via-[oklch(0.65_0.22_330)]/15 to-transparent blur-xl" />
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/40 to-[oklch(0.65_0.22_330)]/20" />
                <div className="relative size-48 overflow-hidden rounded-2xl border border-primary/20 shadow-elevation-3 sm:size-56 lg:size-64">
                  <Image
                    src="/me.png"
                    alt={personal.name}
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-2 -right-2 flex size-9 items-center justify-center rounded-full border-2 border-background bg-[oklch(0.62_0.17_155)] shadow-lg">
                  <span className="size-2.5 rounded-full bg-white" />
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
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">About</span>
            <span className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-bold tracking-tight">About Me</h2>
              <div className="flex flex-col gap-3">
                {personal.bio.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">{para}</p>
                ))}
              </div>
              <div className="rounded-xl border-l-2 border-primary/40 bg-primary/5 px-4 py-3 relative overflow-hidden">
                <div className="absolute top-1 left-2 text-4xl font-bold text-primary/10 leading-none select-none">&ldquo;</div>
                <p className="relative text-sm italic leading-relaxed">{personal.pullQuote}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">What Drives Me</h3>
              <div className="flex flex-col gap-3">
                {pillars.map((p, i) => (
                  <div
                    key={p.title}
                    className="group flex gap-4 rounded-xl border bg-card p-4 transition-all hover-lift shadow-elevation-1"
                  >
                    <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${
                        i === 0 ? "bg-blue-500/10 text-blue-500"
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
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Stack</span>
            <span className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Skills & Technologies</h2>
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
                <div key={cat.label} className="overflow-hidden rounded-xl border bg-card hover-lift shadow-elevation-1 transition-all">
                  <div className={`h-0.5 bg-gradient-to-r ${c.bar} to-transparent`} />
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2.5">
                      <div className={`flex size-8 items-center justify-center rounded-lg ${c.icon}`}>
                        {cat.icon}
                      </div>
                      <span className="text-sm font-semibold">{cat.label}</span>
                      <Badge variant="secondary" className="ml-auto font-mono text-xs bg-primary/8 text-primary">{cat.count}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span
                          key={s.name}
                          title={s.tip}
                          className="flex items-center gap-1 rounded-lg border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Work</span>
            <span className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Projects</h2>

          {/* Featured */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border bg-card shadow-elevation-2">
            <div className="absolute inset-0 bg-mesh-primary opacity-30" />
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 via-primary to-transparent" />
            <div className="relative p-6 lg:p-8">
              <div className="mb-5 flex items-center gap-2">
                <Badge className="border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px]">
                  {projects.featured.tag}
                </Badge>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-3 lg:max-w-xl">
                  <h3 className="text-2xl font-bold">{projects.featured.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{projects.featured.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {projects.featured.badges.map((b) => (
                      <Badge key={b} variant="secondary" className="text-xs bg-primary/8 border-primary/15 text-primary/80">{b}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                    {[
                      ...projects.featured.metrics,
                      { value: projectCommits[projects.featured.repoName] > 0 ? `${projectCommits[projects.featured.repoName].toLocaleString()}` : "—", label: "Commits" },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center gap-0.5 rounded-xl glass-card px-4 py-3 text-center">
                        <span className="text-xl font-bold tabular-nums font-mono text-gradient-primary">{m.value}</span>
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={projects.featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl glass-card px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover-lift"
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
                <div key={p.title} className="group flex flex-col gap-3 overflow-hidden rounded-xl border bg-card hover-lift shadow-elevation-1 transition-all">
                  <div className={`h-0.5 bg-gradient-to-r ${accentColor.bar} to-transparent`} />
                  <div className="flex flex-1 flex-col gap-3 px-5 pb-5">
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div className="flex flex-col gap-1">
                        <Badge className={`w-fit text-[10px] border ${accentColor.badge}`}>{p.category}</Badge>
                        <h3 className="text-base font-semibold">{p.title}</h3>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 glass-card rounded-lg p-1.5 transition-all hover:border-primary/30"
                      >
                        <ExternalLinkIcon className="size-3.5" />
                      </a>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    <div className="mt-auto flex flex-col gap-2 border-t border-border/60 pt-3">
                      {projectCommits[p.repoName] > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
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
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Career</span>
            <span className="h-px flex-1 bg-border/50" />
          </div>
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Experience & Education</h2>

          <div className="flex flex-col gap-0 relative">
            {/* Timeline rail */}
            <div className="absolute left-[5px] top-2 bottom-8 w-0.5 bg-gradient-to-b from-primary/40 via-border to-transparent hidden sm:block" />

            {experience.map((exp, i) => (
              <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`relative mt-1 size-3 shrink-0 rounded-full border-2 z-10 ${exp.isCurrent
                      ? "border-primary bg-primary/30 shadow-[0_0_8px_2px] shadow-primary/30"
                      : "border-border bg-card"
                    }`} />
                </div>
                <div className="flex flex-1 flex-col gap-3 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">{exp.role}</h3>
                        {exp.isCurrent && (
                          <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] h-4 px-1.5 text-[10px]">
                            Current
                          </Badge>
                        )}
                      </div>
                      <a href={exp.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
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
                    <div className="flex items-start gap-2 rounded-lg bg-[oklch(0.62_0.17_155)]/5 border border-[oklch(0.62_0.17_155)]/15 px-3 py-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[oklch(0.62_0.17_155)]" />
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
                const colors = [
                  { bar: "from-orange-500", icon: "bg-orange-500/10 text-orange-500" },
                  { bar: "from-blue-500",   icon: "bg-blue-500/10 text-blue-500" },
                  { bar: "from-green-500",  icon: "bg-green-500/10 text-green-500" },
                ]
                const col = colors[i % colors.length]
                return (
                  <div key={c} className="overflow-hidden rounded-xl border bg-card shadow-elevation-1 hover-lift transition-all">
                    <div className={`h-0.5 bg-gradient-to-r ${col.bar} to-transparent`} />
                    <div className="flex items-start gap-3 p-4">
                      <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${col.icon}`}>
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
        <div className="relative overflow-hidden bg-noise">
          <div className="pointer-events-none absolute inset-0 bg-mesh-primary opacity-50" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-24 text-center lg:px-6">
            <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Contact</span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gradient-brand sm:text-4xl">
              Let&apos;s Work Together
            </h2>
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
                  className="glass-card flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover-lift"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 hover-lift"
              >
                <LayoutDashboardIcon className="size-4" />
                Explore SaaS Portfolio Dashboard
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between lg:px-6">
          <LogoMark size="sm" showText name={personal.name} subtitle="Full Stack Developer" />
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <span className="text-xs text-muted-foreground">Built with Next.js, Tailwind CSS &amp; shadcn/ui</span>
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} {personal.name}</span>
          </div>
        </div>
        {/* Ghost wordmark */}
        <div className="overflow-hidden pb-0">
          <p className="text-center text-[6rem] font-bold leading-none tracking-tight text-foreground/[0.03] select-none pointer-events-none sm:text-[10rem] lg:text-[14rem]">
            UMAR
          </p>
        </div>
      </footer>

    </div>
  )
}
