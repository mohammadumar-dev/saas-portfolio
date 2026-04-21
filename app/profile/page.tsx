import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioData } from "@/lib/data"
import { SectionCards } from "@/components/section-cards"
import {
  MapPin,
  Mail,
  ExternalLink,
  Download,
  UserCircle2Icon,
  GitCommitHorizontal,
  FolderGit2,
  Zap,
  Briefcase,
} from "lucide-react"

export default async function ProfilePage() {
  const { personal, socials, skills, projects, experience } = portfolioData

  const totalSkills = skills.reduce((sum, g) => sum + g.skills.length, 0)
  const workExp = experience.filter((e) => e.company !== "Savitribai Phule Pune University")

  return (
    <div className="flex flex-col gap-0">
      {/* Cover banner */}
      <div className="relative h-32 overflow-hidden rounded-t-none bg-mesh-primary bg-noise md:h-44 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-[oklch(0.65_0.22_330)]/20" />
        <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 size-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Profile card overlapping banner */}
      <div className="relative -mt-12 px-4 md:px-6 flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 to-[oklch(0.65_0.22_330)]/20 blur-sm" />
              <div className="relative size-20 overflow-hidden rounded-xl ring-4 ring-background md:size-24">
                <Image
                  src="/me.png"
                  alt={personal.name}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <span className="absolute bottom-1 right-1 size-3.5 rounded-full border-2 border-background bg-[oklch(0.62_0.17_155)]" />
            </div>
            <div className="mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight md:text-2xl">{personal.name}</h1>
                <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] text-[10px]">
                  <span className="mr-1.5 size-1.5 rounded-full bg-[oklch(0.62_0.17_155)] animate-pulse-dot inline-block" />
                  Available
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{personal.title}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            <a
              href="/Shaikh_Mohammad_Umar_Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Download className="size-3.5" />
              Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-glow-primary hover:opacity-90 transition-opacity"
            >
              <Mail className="size-3.5" />
              Contact
            </Link>
          </div>
        </div>

        {/* Bio strip */}
        <Card className="shadow-elevation-1">
          <CardContent className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  {personal.location.city}, {personal.location.region}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-primary" />
                  {personal.email}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium hover:border-primary/30 hover:text-primary transition-all"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    <ExternalLink className="size-2.5 opacity-40" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-4 shrink-0">
              {[
                { icon: FolderGit2, label: "Projects", value: `${1 + projects.items.length}+` },
                { icon: Zap, label: "Skills", value: `${totalSkills}+` },
                { icon: Briefcase, label: "Roles", value: workExp.length },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <span className="text-lg font-bold font-mono tabular-nums text-gradient-primary">{value}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live stats */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <GitCommitHorizontal className="size-3.5 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">GitHub Activity</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <SectionCards />
        </div>

        {/* About */}
        <Card className="shadow-elevation-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircle2Icon className="size-4 text-primary" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">Overview</p>
            </div>
            <div className="flex flex-col gap-3">
              {personal.bio.map((paragraph, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pinned skills */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Top Skills</span>
            <span className="h-px flex-1 bg-border" />
            <Link href="/skills" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Java", "Spring Boot", "React", "Next.js", "TypeScript", "Python", "PostgreSQL", "Docker", "Spring AI"].map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-lg border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Recent work */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Recent Work</span>
            <span className="h-px flex-1 bg-border" />
            <Link href="/experience" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {workExp.slice(0, 2).map((item, i) => (
              <Card key={i} className="shadow-elevation-1">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${item.isCurrent ? "bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)]" : "bg-primary/10 text-primary"}`}>
                    <Briefcase className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{item.role}</span>
                      {item.isCurrent && (
                        <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] h-5 px-1.5 text-[10px]">Current</Badge>
                      )}
                    </div>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.company} <ExternalLink className="size-2.5" />
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
