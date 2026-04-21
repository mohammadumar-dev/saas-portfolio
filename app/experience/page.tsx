export const dynamic = "force-static"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioData } from "@/lib/data"
import {
  Briefcase,
  GraduationCap,
  Award,
  CalendarDays,
  ExternalLink,
  MapPin,
  CheckCircle2,
  BriefcaseIcon,
} from "lucide-react"

const workExperience = portfolioData.experience.filter(
  (e) => e.company !== "Savitribai Phule Pune University"
)
const education = portfolioData.experience.filter(
  (e) => e.company === "Savitribai Phule Pune University"
)

const totalMonths = (() => {
  const start = new Date("2024-08-01")
  const now = new Date()
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
})()

export default function ExperiencePage() {
  const { certifications } = portfolioData

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
              <BriefcaseIcon className="mr-1.5 size-3" />
              Career
            </span>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Experience</h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Work history, education &amp; certifications
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { value: `${totalMonths}mo`, label: "Experience" },
              { value: workExperience.length.toString(),   label: "Roles"        },
              { value: certifications.length.toString(),   label: "Certs"        },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-1 flex-col items-center justify-center rounded-xl bg-background/60 px-3 py-2.5 ring-1 ring-border backdrop-blur-sm sm:px-5 sm:py-3"
              >
                <span className="text-base font-bold tabular-nums font-mono text-gradient-primary sm:text-xl">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work experience */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Briefcase className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Work Experience</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="relative flex flex-col gap-4">
          {/* Timeline rail */}
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/40 via-border to-transparent hidden sm:block" />

          {workExperience.map((item, i) => (
            <div key={i} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="relative hidden sm:flex shrink-0 mt-5 flex-col items-center">
                <div className={`relative flex size-4 shrink-0 items-center justify-center rounded-full border-2 z-10 ${item.isCurrent ? "border-[oklch(0.62_0.17_155)] bg-[oklch(0.62_0.17_155)]/20" : "border-border bg-card"}`}>
                  {item.isCurrent && <div className="size-1.5 rounded-full bg-[oklch(0.62_0.17_155)] animate-pulse-dot" />}
                </div>
              </div>

              <Card className="flex-1 relative overflow-hidden hover-lift shadow-elevation-1 transition-all">
                <div className={`h-0.5 w-full bg-gradient-to-r ${item.isCurrent ? "from-[oklch(0.62_0.17_155)]" : "from-blue-500"} to-transparent`} />
                <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold">{item.role}</h3>
                        {item.isCurrent && (
                          <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] h-5 px-1.5 text-[10px]">
                            <span className="mr-1 size-1 rounded-full bg-[oklch(0.62_0.17_155)] animate-pulse-dot inline-block" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.company}
                        <ExternalLink className="size-3" />
                      </Link>
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5 text-primary" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 text-primary" />
                        Pune, India · On-site
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border/60" />

                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                  {item.achievement && (
                    <div className="flex items-start gap-2.5 rounded-xl bg-[oklch(0.62_0.17_155)]/5 border border-[oklch(0.62_0.17_155)]/15 px-4 py-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[oklch(0.62_0.17_155)]" />
                      <p className="text-sm font-medium">{item.achievement}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-primary/8 border-primary/15">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Education</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {education.map((item, i) => (
          <Card key={i} className="relative overflow-hidden hover-lift shadow-elevation-1 border-gradient-primary transition-all">
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-transparent" />
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold">{item.role}</h3>
                    {item.isCurrent && (
                      <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 h-5 px-1.5 text-[10px]">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:justify-end">
                  <CalendarDays className="size-3.5 text-violet-500" />
                  {item.date}
                </div>
              </div>

              <div className="h-px bg-border/60" />

              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

              {item.achievement && (
                <div className="flex items-start gap-2.5 rounded-xl bg-violet-500/5 border border-violet-500/15 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-500" />
                  <p className="text-sm font-medium">{item.achievement}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Award className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Certifications</span>
          <span className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
            {certifications.length} certs
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {certifications.map((cert, i) => {
            const colors = [
              { bar: "from-orange-500", icon: "bg-orange-500/10 text-orange-500" },
              { bar: "from-blue-500",   icon: "bg-blue-500/10 text-blue-500"     },
              { bar: "from-green-500",  icon: "bg-green-500/10 text-green-500"   },
            ]
            const c = colors[i % colors.length]
            return (
              <Card key={i} className="group overflow-hidden hover-lift shadow-elevation-1 transition-all">
                <div className={`h-0.5 w-full bg-gradient-to-r ${c.bar} to-transparent`} />
                <CardContent className="flex items-start gap-3 p-4">
                  <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${c.icon}`}>
                    <Award className="size-4" />
                  </div>
                  <p className="text-sm font-medium leading-snug">{cert}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  )
}
