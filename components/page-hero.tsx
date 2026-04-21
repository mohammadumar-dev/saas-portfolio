import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricItem {
  label: string
  value: string | number
  icon?: LucideIcon
}

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  metrics?: MetricItem[]
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, description, metrics, actions, className, children }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8",
        "bg-mesh-subtle bg-noise",
        "shadow-elevation-2",
        className,
      )}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-[oklch(0.65_0.22_330)]/6 blur-3xl" />

      <div className="relative flex flex-col gap-4 md:gap-5">
        {eyebrow && (
          <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
            {eyebrow}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>

        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 rounded-lg border bg-background/60 px-3 py-1.5"
              >
                {m.icon && <m.icon className="size-3.5 text-primary shrink-0" />}
                <span className="text-lg font-bold font-mono tabular-nums text-foreground">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        {children}
      </div>
    </div>
  )
}
