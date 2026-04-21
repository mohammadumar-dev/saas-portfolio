"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Portfolio</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-0.5">
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.url
            return (
              <SidebarMenuItem key={item.title} className="relative">
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-primary" />
                )}
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={active}
                  render={<Link href={item.url} />}
                  className={cn(
                    "transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground",
                  )}
                >
                  <span className={cn("transition-colors", active ? "text-primary" : "text-muted-foreground")}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Download Resume"
              className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border border-primary/20 font-medium"
              render={
                <a
                  href="/Shaikh_Mohammad_Umar_Resume.pdf"
                  download="Shaikh_Mohammad_Umar_Resume.pdf"
                />
              }
            >
              <Download className="size-4" />
              <span>Download Resume</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
