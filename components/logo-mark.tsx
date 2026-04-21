"use client"

import { cn } from "@/lib/utils"

interface LogoMarkProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
  name?: string
  subtitle?: string
}

const sizeMap = {
  sm: { tile: "size-6", text: "text-[9px]" },
  md: { tile: "size-7", text: "text-[10px]" },
  lg: { tile: "size-9", text: "text-xs" },
}

export function LogoMark({ size = "md", className, showText = false, name, subtitle }: LogoMarkProps) {
  const s = sizeMap[size]
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-lg",
          "bg-gradient-to-br from-primary to-[oklch(0.65_0.22_330)]",
          "shadow-glow-primary",
          s.tile,
        )}
      >
        <span className={cn("font-mono font-bold text-primary-foreground leading-none", s.text)}>
          MU
        </span>
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          {name && <span className="text-sm font-semibold truncate">{name}</span>}
          {subtitle && <span className="text-[10px] text-muted-foreground truncate">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
