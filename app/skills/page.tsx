export const dynamic = "force-static"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { portfolioData } from "@/lib/data"
import { SkillChip } from "@/components/skill-chip"
import { ZapIcon } from "lucide-react"

const coreStack = [
  { name: "Java",        level: "Expert",     pct: 95, color: "orange" },
  { name: "Spring Boot", level: "Expert",     pct: 92, color: "green"  },
  { name: "Python",      level: "Advanced",   pct: 78, color: "blue"   },
  { name: "React",       level: "Advanced",   pct: 82, color: "cyan"   },
  { name: "Next.js",     level: "Advanced",   pct: 80, color: "slate"  },
  { name: "TypeScript",  level: "Advanced",   pct: 80, color: "blue"   },
  { name: "PostgreSQL",  level: "Advanced",   pct: 76, color: "indigo" },
  { name: "Docker",      level: "Proficient", pct: 65, color: "sky"    },
  { name: "Spring AI",   level: "Proficient", pct: 62, color: "violet" },
]

const colorMap: Record<string, {
  card: string; bar: string; badge: string; dot: string
}> = {
  orange: { card: "border-orange-500/20 bg-orange-500/5",  bar: "bg-orange-500",  badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",  dot: "bg-orange-500" },
  green:  { card: "border-green-500/20 bg-green-500/5",    bar: "bg-green-500",   badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",    dot: "bg-green-500"  },
  blue:   { card: "border-blue-500/20 bg-blue-500/5",      bar: "bg-blue-500",    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",      dot: "bg-blue-500"   },
  cyan:   { card: "border-cyan-500/20 bg-cyan-500/5",      bar: "bg-cyan-500",    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",      dot: "bg-cyan-500"   },
  slate:  { card: "border-slate-400/20 bg-slate-500/5",    bar: "bg-slate-500",   badge: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-400/20",   dot: "bg-slate-500"  },
  indigo: { card: "border-indigo-500/20 bg-indigo-500/5",  bar: "bg-indigo-500",  badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20", dot: "bg-indigo-500" },
  sky:    { card: "border-sky-500/20 bg-sky-500/5",        bar: "bg-sky-500",     badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",         dot: "bg-sky-500"    },
  violet: { card: "border-violet-500/20 bg-violet-500/5",  bar: "bg-violet-500",  badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20", dot: "bg-violet-500" },
}

const groupTheme: Record<string, { accent: string; iconBg: string; iconText: string; dot: string; chipBorder: string }> = {
  "Languages":         { accent: "from-orange-500",  iconBg: "bg-orange-500/10",  iconText: "text-orange-500",  dot: "bg-orange-500",  chipBorder: "border-orange-500/20 hover:bg-orange-500/10"  },
  "Backend & APIs":    { accent: "from-blue-500",    iconBg: "bg-blue-500/10",    iconText: "text-blue-500",    dot: "bg-blue-500",    chipBorder: "border-blue-500/20 hover:bg-blue-500/10"    },
  "Frontend & UI":     { accent: "from-green-500",   iconBg: "bg-green-500/10",   iconText: "text-green-500",   dot: "bg-green-500",   chipBorder: "border-green-500/20 hover:bg-green-500/10"   },
  "Databases & ORM":   { accent: "from-indigo-500",  iconBg: "bg-indigo-500/10",  iconText: "text-indigo-500",  dot: "bg-indigo-500",  chipBorder: "border-indigo-500/20 hover:bg-indigo-500/10"  },
  "DevOps & Cloud":    { accent: "from-sky-500",     iconBg: "bg-sky-500/10",     iconText: "text-sky-500",     dot: "bg-sky-500",     chipBorder: "border-sky-500/20 hover:bg-sky-500/10"     },
  "AI & Advanced":     { accent: "from-violet-500",  iconBg: "bg-violet-500/10",  iconText: "text-violet-500",  dot: "bg-violet-500",  chipBorder: "border-violet-500/20 hover:bg-violet-500/10"  },
}

export default function SkillsPage() {
  const { skills } = portfolioData
  const totalSkills = skills.reduce((sum, g) => sum + g.skills.length, 0)

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Page hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-[oklch(0.65_0.22_330)]/6 blur-2xl" />
        <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
              <ZapIcon className="mr-1.5 size-3" />
              Skills & Expertise
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Full Stack Technology Map</h1>
            <p className="text-muted-foreground text-sm max-w-md">Technologies I use to build production-grade software</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:shrink-0">
            {[
              { value: skills.length, label: "Categories" },
              { value: `${totalSkills}+`, label: "Technologies" },
              { value: "1+yr", label: "Production" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center rounded-xl bg-background/60 px-3 py-2.5 ring-1 ring-border backdrop-blur-sm sm:px-4 sm:py-3">
                <span className="text-lg font-bold tabular-nums font-mono text-gradient-primary sm:text-xl">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core stack */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Core Stack</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] text-muted-foreground">Primary production technologies</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {coreStack.map((tech) => {
            const c = colorMap[tech.color]
            return (
              <div
                key={tech.name}
                className={`group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all hover-lift hover:shadow-elevation-2 ${c.card}`}
              >
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold truncate">{tech.name}</span>
                    <Badge className={`shrink-0 text-[10px] px-1.5 py-0 h-5 border ${c.badge}`}>
                      {tech.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/60">
                      <div
                        className={`h-full rounded-full transition-all ${c.bar}`}
                        style={{ width: `${tech.pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{tech.pct}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Skill groups */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Full Breakdown</span>
          <span className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
            {skills.length} categories
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const t = groupTheme[group.label] ?? {
              accent: "from-primary", iconBg: "bg-muted", iconText: "text-foreground",
              dot: "bg-foreground", chipBorder: "border-border hover:bg-muted",
            }
            return (
              <Card key={group.label} className="group relative flex flex-col overflow-hidden hover-lift shadow-elevation-1 transition-all">
                <div className={`h-0.5 w-full bg-gradient-to-r ${t.accent} to-transparent`} />
                <CardContent className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-xl ring-1 ring-inset ring-current/10 ${t.iconBg} ${t.iconText}`}>
                      {group.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold leading-none">{group.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{group.count} technologies</p>
                    </div>
                    <div className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold font-mono ${t.iconBg} ${t.iconText}`}>
                      {group.count}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <SkillChip
                        key={skill.name}
                        name={skill.name}
                        tip={skill.tip}
                        dot={t.dot}
                        chipBorder={t.chipBorder}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Learning now */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Currently Exploring</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { name: "Rust", desc: "Systems programming & WebAssembly", pct: 10, color: "from-orange-500", badge: "bg-orange-500/10 text-orange-500" },
            { name: "Go (Golang)", desc: "Microservices & cloud-native APIs", pct: 15, color: "from-cyan-500", badge: "bg-cyan-500/10 text-cyan-500" },
            { name: "LLM Fine-tuning", desc: "Custom model training & PEFT techniques", pct: 12, color: "from-violet-500", badge: "bg-violet-500/10 text-violet-500" },
          ].map((item) => (
            <div key={item.name} className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{item.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold ${item.badge}`}>
                  Learning
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/60">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} to-transparent`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{item.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
