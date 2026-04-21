"use client"

import { useState, useEffect } from "react"

type Preferences = {
  notifications: {
    email: boolean
    projects: boolean
    blog: boolean
  }
}

const DEFAULTS: Preferences = {
  notifications: { email: false, projects: true, blog: false },
}

const STORAGE_KEY = "portfolio-preferences"

function load(): Preferences {
  if (typeof window === "undefined") return DEFAULTS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS)

  useEffect(() => {
    setPrefs(load())
  }, [])

  function update(next: Preferences) {
    setPrefs(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY)
    setPrefs(DEFAULTS)
  }

  return { prefs, update, reset }
}
