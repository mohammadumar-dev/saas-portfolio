import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { portfolioData } from "@/lib/data"
import {
  ExternalLink,
  MapPin,
  Mail,
  ArrowUpRight,
  Layers,
  FolderOpen,
  BriefcaseBusiness,
  MessageSquare,
} from "lucide-react"

const GITHUB_USERNAME = "mohammadumar-dev"

async function getAllTimeCommits(): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  const infoRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: `{ user(login: "${GITHUB_USERNAME}") { createdAt } }` }),
    next: { revalidate: 3600 },
  })
  const infoJson = await infoRes.json()
  const createdAt: string = infoJson?.data?.user?.createdAt
  if (!createdAt) return null

  const joinYear = new Date(createdAt).getFullYear()
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

  return yearlyTotals.reduce((sum, n) => sum + n, 0)
}

export default async function AboutPage() {
  const { personal, socials, pillars, stats } = portfolioData
  const allTimeCommits = await getAllTimeCommits()

  const resolvedStats = stats.map((s) =>
    s.label === "GitHub Commits"
      ? { ...s, number: allTimeCommits ? `${allTimeCommits.toLocaleString()}+` : "—" }
      : s
  )

  const quickLinks = [
    { label: "Skills", href: "/skills", desc: "Tech stack & tools", icon: Layers },
    { label: "Projects", href: "/projects", desc: "What I've built", icon: FolderOpen },
    { label: "Experience", href: "/experience", desc: "Work & education", icon: BriefcaseBusiness },
    { label: "Contact", href: "/contact", desc: "Get in touch", icon: MessageSquare },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Hero card */}
      <Card className="relative overflow-hidden">
        <div className="from-primary/5 via-background to-background absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]" />
        <CardContent className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div className="from-primary/20 to-primary/5 absolute -inset-0.5 rounded-2xl bg-gradient-to-br" />
            <div className="relative size-28 overflow-hidden rounded-xl ring-1 ring-white/10 sm:size-32">
              <Image
                src="/me.png"
                alt={personal.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <span className="border-background absolute bottom-1 right-1 size-3 rounded-full border-2 bg-green-500 shadow-sm" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold tracking-tight">{personal.name}</h1>
                <Badge className="border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-[11px]">
                  Available for work
                </Badge>
              </div>
              <p className="text-muted-foreground mt-0.5 text-sm">{personal.title}</p>
              <div className="text-muted-foreground mt-2 flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {personal.location.city}, {personal.location.region}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {personal.email}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-background/60 hover:bg-muted hover:border-border/80 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all"
                >
                  {s.icon}
                  <span>{s.label}</span>
                  <ExternalLink className="size-2.5 opacity-40" />
                </Link>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-border bg-muted/40 flex shrink-0 flex-row gap-0 divide-x rounded-xl border sm:flex-col sm:divide-x-0 sm:divide-y">
            {resolvedStats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col items-center justify-center px-5 py-3 sm:px-6">
                <span className="font-heading text-lg font-bold tabular-nums">{stat.number}</span>
                <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-3 text-[11px] font-semibold uppercase tracking-widest">About</p>
          <div className="flex flex-col gap-3">
            {personal.bio.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="border-primary/20 bg-primary/5 rounded-lg border-l-2 px-4 py-3">
            <p className="text-sm leading-relaxed italic">&ldquo;{personal.pullQuote}&rdquo;</p>
          </div>
        </CardContent>
      </Card>

      {/* Pillars */}
      <div>
        <p className="text-muted-foreground mb-3 text-[11px] font-semibold uppercase tracking-widest">
          What Drives Me
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Card key={pillar.title} className="group relative overflow-hidden transition-shadow hover:shadow-md">
              <div
                className={`absolute top-0 right-0 size-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100 ${
                  i === 0
                    ? "bg-blue-500/10 opacity-0"
                    : i === 1
                      ? "bg-violet-500/10 opacity-0"
                      : "bg-emerald-500/10 opacity-0"
                }`}
              />
              <CardContent className="relative flex flex-col gap-3 p-5">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    i === 0
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : i === 1
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {pillar.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{pillar.title}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <p className="text-muted-foreground mb-3 text-[11px] font-semibold uppercase tracking-widest">Explore</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, href, desc, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="group hover:border-primary/30 hover:bg-muted/40 h-full cursor-pointer transition-all duration-200 hover:shadow-sm">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between">
                    <div className="bg-muted group-hover:bg-primary/10 flex size-8 items-center justify-center rounded-lg transition-colors">
                      <Icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                    </div>
                    <ArrowUpRight className="text-muted-foreground/40 group-hover:text-primary/60 size-3.5 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
