import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  icon?: LucideIcon
  count?: number | string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  count,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-3.5 text-primary" />}
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">
            {eyebrow}
          </span>
          {count !== undefined && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
              {count}
            </span>
          )}
          <span className="h-px flex-1 bg-border" />
        </div>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}
