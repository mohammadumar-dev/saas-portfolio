"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/about": "About",
  "/skills": "Skills",
  "/projects": "Projects",
  "/experience": "Experience",
  "/contact": "Contact",
  "/settings": "Settings",
  "/help": "Get Help",
  "/profile": "Profile",
}

const knownPaths = new Set(Object.keys(pageTitles))

export function SiteHeader() {
  const pathname = usePathname()
  const title = knownPaths.has(pathname) ? pageTitles[pathname] : "Not Found — 404"

  const handleCommandK = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center gap-2",
        "glass border-b transition-[width,height] ease-linear",
        "group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
      )}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 size-8 rounded-lg" />
        <Separator orientation="vertical" className="mx-1 h-4 data-vertical:self-auto" />
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>

        <div className="ml-auto flex items-center gap-1">
          {/* ⌘K search pill */}
          <button
            onClick={handleCommandK}
            className={cn(
              "hidden md:flex items-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5",
              "text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            )}
            aria-label="Open command palette"
          >
            <SearchIcon className="size-3" />
            <span>Search</span>
            <kbd className="ml-1 inline-flex h-4 items-center rounded border bg-background px-1 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/muhammed-umar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <GithubIcon />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
