"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SkillChipProps {
  name: string
  tip: string
  dot: string
  chipBorder: string
}

export function SkillChip({ name, tip, dot, chipBorder }: SkillChipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div className={`flex cursor-default items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${chipBorder} bg-background`} />
        }
      >
        <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
        {name}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[200px] text-center text-[11px] leading-relaxed">
        {tip}
      </TooltipContent>
    </Tooltip>
  )
}
