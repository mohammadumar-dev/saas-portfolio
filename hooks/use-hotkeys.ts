"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const GO_ROUTES: Record<string, string> = {
  d: "/dashboard",
  a: "/about",
  s: "/skills",
  p: "/projects",
  e: "/experience",
  c: "/contact",
}

export function useHotkeys() {
  const router = useRouter()
  const pendingG = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!e.key) return
      const target = e.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase() ?? ""
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return

      const key = e.key.toLowerCase()

      if (key === "g" && !e.metaKey && !e.ctrlKey) {
        pendingG.current = true
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => { pendingG.current = false }, 1000)
        return
      }

      if (pendingG.current && GO_ROUTES[key]) {
        e.preventDefault()
        pendingG.current = false
        if (timer.current) clearTimeout(timer.current)
        router.push(GO_ROUTES[key])
        return
      }

      if (key === "d" && !pendingG.current && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "d", bubbles: true, cancelable: true }))
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [router])
}
