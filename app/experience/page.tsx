import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { portfolioData } from "@/lib/data"
import {
  Briefcase,
  GraduationCap,
  Award,
  CalendarDays,
  ExternalLink,
  MapPin,
  CheckCircle2,
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
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent">
        <div className="absolute -top-8 -right-8 size-48 rounded-full bg-primary/5 blur-3xl" />
        <CardContent className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Career</p>
            <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">Experience</h2>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
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
                <span className="font-heading text-base font-bold tabular-nums sm:text-xl">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work experience */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Briefcase className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Work Experience</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col gap-3">
          {workExperience.map((item, i) => (
            <Card key={i} className="relative overflow-hidden transition-shadow hover:shadow-md">
              <div className={`h-0.5 w-full bg-gradient-to-r ${item.isCurrent ? "from-green-500" : "from-blue-500"} to-transparent`} />
              <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-base font-bold">{item.role}</h3>
                      {item.isCurrent && (
                        <Badge className="border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 h-5 px-1.5 text-[10px]">
                          Current
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.company}
                      <ExternalLink className="size-3" />
                    </Link>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      Pune, India · On-site
                    </div>
                  </div>
                </div>

                <Separator />

                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                {item.achievement && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-muted/50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
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
      </div>

      {/* Education */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Education</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        {education.map((item, i) => (
          <Card key={i} className="relative overflow-hidden transition-shadow hover:shadow-md">
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-transparent" />
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-base font-bold">{item.role}</h3>
                    {item.isCurrent && (
                      <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 h-5 px-1.5 text-[10px]">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.company}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:justify-end">
                  <CalendarDays className="size-3.5" />
                  {item.date}
                </div>
              </div>

              <Separator />

              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

              {item.achievement && (
                <div className="flex items-start gap-2.5 rounded-xl bg-muted/50 px-4 py-3">
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
          <Award className="size-3.5 text-muted-foreground" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Certifications</p>
          <div className="h-px flex-1 bg-border" />
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
              <Card key={i} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className={`h-0.5 w-full bg-gradient-to-r ${c.bar} to-transparent`} />
                <CardContent className="flex items-start gap-3 p-4">
                  <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${c.icon}`}>
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
