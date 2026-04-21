"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CommandPalette } from "@/components/command-palette"
import { useHotkeys } from "@/hooks/use-hotkeys"

function HotkeyProvider() {
  useHotkeys()
  return null
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/") return <>{children}</>

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="floating" />
      <SidebarInset>
        <SiteHeader />
        <div className="relative flex flex-1 flex-col bg-dots">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
      <CommandPalette />
      <HotkeyProvider />
    </SidebarProvider>
  )
}
