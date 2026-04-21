"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  value: string
  label?: string
  className?: string
  size?: "sm" | "default"
}

export function CopyButton({ value, label, className, size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    toast.success(label ? `${label} copied!` : "Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("shrink-0 transition-colors", size === "sm" ? "size-7 rounded-md" : "size-9 rounded-lg", className)}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      {copied
        ? <CheckIcon className="size-3.5 text-success" />
        : <CopyIcon className="size-3.5" />
      }
    </Button>
  )
}
