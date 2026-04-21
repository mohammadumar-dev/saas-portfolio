import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import { getAllTimeCommits } from "@/lib/github"

export const revalidate = 86400

export default async function AboutPage() {
  const { personal, socials, pillars, stats } = portfolioData
  const allTimeCommits = await getAllTimeCommits()

  const resolvedStats = stats.map((s) =>
    s.label === "GitHub Commits"
      ? { ...s, number: allTimeCommits ? `${allTimeCommits.toLocaleString()}+` : "—" }
      : s
  )

  const quickLinks = [
    { label: "Skills", href: "/skills", desc: "Tech stack & tools", icon: Layers, color: "from-chart-1" },
    { label: "Projects", href: "/projects", desc: "What I've built", icon: FolderOpen, color: "from-chart-2" },
    { label: "Experience", href: "/experience", desc: "Work & education", icon: BriefcaseBusiness, color: "from-chart-3" },
    { label: "Contact", href: "/contact", desc: "Get in touch", icon: MessageSquare, color: "from-chart-5" },
  ]

  const pillarColors = [
    { bg: "bg-blue-500/10", text: "text-blue-500", glow: "bg-blue-500/10" },
    { bg: "bg-violet-500/10", text: "text-violet-500", glow: "bg-violet-500/10" },
    { bg: "bg-emerald-500/10", text: "text-emerald-500", glow: "bg-emerald-500/10" },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-[oklch(0.65_0.22_330)]/6 blur-3xl" />
        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-[oklch(0.65_0.22_330)]/20 blur-sm" />
            <div className="relative size-28 overflow-hidden rounded-xl ring-2 ring-primary/20 sm:size-32">
              <Image
                src="/me.png"
                alt={personal.name}
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover object-center"
                priority
              />
            </div>
            <span className="absolute bottom-1 right-1 size-3.5 rounded-full border-2 border-card bg-[oklch(0.62_0.17_155)] shadow-sm" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{personal.name}</h1>
                <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] text-[11px]">
                  <span className="mr-1.5 inline-block size-1.5 rounded-full bg-[oklch(0.62_0.17_155)] animate-pulse-dot" />
                  Available for work
                </Badge>
              </div>
              <p className="text-muted-foreground mt-0.5 text-sm">{personal.title}</p>
              <div className="text-muted-foreground mt-2 flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  {personal.location.city}, {personal.location.region}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-primary" />
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
                  className="glass-card flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:border-primary/30 hover:text-primary"
                >
                  {s.icon}
                  <span>{s.label}</span>
                  <ExternalLink className="size-2.5 opacity-40" />
                </Link>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-border/60 bg-card/40 flex shrink-0 flex-row gap-0 divide-x divide-border/60 rounded-xl border backdrop-blur-sm sm:flex-col sm:divide-x-0 sm:divide-y">
            {resolvedStats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col items-center justify-center px-5 py-3 sm:px-6">
                <span className="text-lg font-bold tabular-nums font-mono text-gradient-primary">{stat.number}</span>
                <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio + Pillars */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bio */}
        <Card className="lg:col-span-2 shadow-elevation-1">
          <CardContent className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary font-mono mb-3">About</p>
            <div className="flex flex-col gap-3">
              {personal.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 relative overflow-hidden">
              <div className="absolute top-2 left-3 text-5xl font-bold text-primary/10 leading-none select-none">&ldquo;</div>
              <p className="relative text-sm leading-relaxed italic pl-3">{personal.pullQuote}</p>
            </div>
          </CardContent>
        </Card>

        {/* TL;DR quick facts */}
        <Card className="shadow-elevation-1">
          <CardContent className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary font-mono mb-4">TL;DR</p>
            <div className="flex flex-col gap-3">
              {[
                "Full Stack Developer with 1+ year production experience",
                "Specializes in Java, Spring Boot, React & AI architectures",
                "Computer Science student with 9.091 SGPA",
                "Built systems in healthcare, fintech & enterprise SaaS",
                "Open source contributor & continuous learner",
              ].map((fact, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground leading-snug">{fact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pillars */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">What Drives Me</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar, i) => {
            const c = pillarColors[i % pillarColors.length]
            return (
              <Card key={pillar.title} className="group relative overflow-hidden hover-lift shadow-elevation-1 border-gradient-primary">
                <div className={`pointer-events-none absolute top-0 right-0 size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${c.glow}`} />
                <CardContent className="relative flex flex-col gap-3 p-5">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{pillar.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Explore</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, href, desc, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <Card className="group hover:border-primary/30 hover:shadow-elevation-2 h-full cursor-pointer transition-all duration-200 shadow-elevation-1">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between">
                    <div className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-br ${color} to-transparent bg-opacity-10 border border-border/60 bg-muted group-hover:bg-primary/10 transition-colors`}>
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
