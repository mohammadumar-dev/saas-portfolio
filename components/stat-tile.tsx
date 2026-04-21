import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatTileProps {
  label: string
  value: string | number
  icon?: LucideIcon
  delta?: { value: string; positive?: boolean }
  className?: string
  size?: "sm" | "md" | "lg"
}

export function StatTile({ label, value, icon: Icon, delta, className, size = "md" }: StatTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border bg-card p-4 shadow-elevation-1 hover-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono", size === "sm" && "text-[10px]")}>
          {label}
        </span>
        {Icon && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-4 text-primary" />
          </div>
        )}
      </div>
      <span
        className={cn(
          "font-bold tabular-nums tracking-tight text-foreground",
          size === "sm" && "text-2xl",
          size === "md" && "text-3xl",
          size === "lg" && "text-4xl",
        )}
      >
        {value}
      </span>
      {delta && (
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold font-mono",
            delta.positive !== false
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {delta.positive !== false ? "↑" : "↓"} {delta.value}
        </span>
      )}
    </div>
  )
}
