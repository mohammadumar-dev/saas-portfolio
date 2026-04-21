"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SkillChipProps {
  name: string
  tip: string
  dot: string
  chipBorder: string
  variant?: "outline" | "solid" | "ghost"
  size?: "sm" | "md"
  years?: string
}

export function SkillChip({ name, tip, dot, chipBorder, variant = "outline", size = "sm", years }: SkillChipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div
            className={cn(
              "flex cursor-default items-center gap-1.5 rounded-lg border transition-all hover-lift",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
              variant === "outline" && cn("bg-background/80 hover:bg-background", chipBorder),
              variant === "solid" && "bg-primary/10 border-primary/30 text-primary hover:bg-primary/15",
              variant === "ghost" && "border-transparent bg-transparent hover:bg-muted",
            )}
          />
        }
      >
        <span className={cn("size-1.5 shrink-0 rounded-full", dot)} />
        <span className="font-medium">{name}</span>
        {years && (
          <span className="font-mono text-[10px] text-muted-foreground">{years}</span>
        )}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[200px] rounded-xl border-border/50 bg-card/95 backdrop-blur-sm text-center text-[11px] leading-relaxed shadow-elevation-2"
      >
        {tip}
      </TooltipContent>
    </Tooltip>
  )
}
