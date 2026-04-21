"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UserIcon,
  ZapIcon,
  FolderGitIcon,
  BriefcaseIcon,
  MailIcon,
  Settings2Icon,
  CircleHelpIcon,
  UserCircle2Icon,
} from "lucide-react"

const data = {
  user: {
    name: "Mohammad Umar",
    email: "mohammadumar.dev@gmail.com",
    avatar: "/me.png",
  },
  navMain: [
    { title: "Dashboard",  url: "/dashboard",  icon: <LayoutDashboardIcon /> },
    { title: "About",      url: "/about",      icon: <UserIcon />            },
    { title: "Skills",     url: "/skills",     icon: <ZapIcon />             },
    { title: "Projects",   url: "/projects",   icon: <FolderGitIcon />       },
    { title: "Experience", url: "/experience", icon: <BriefcaseIcon />       },
    { title: "Contact",    url: "/contact",    icon: <MailIcon />            },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: <Settings2Icon />    },
    { title: "Get Help", url: "/help",     icon: <CircleHelpIcon />   },
    { title: "Profile",  url: "/profile",  icon: <UserCircle2Icon />  },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Mohammad Umar · Full Stack Developer"
              render={<Link href="/dashboard" />}
              className="h-auto py-2"
            >
              {/* Gradient logo tile */}
              <div className="relative flex shrink-0 size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.65_0.22_330)] shadow-glow-primary">
                <span className="relative text-[10px] font-mono font-bold text-primary-foreground leading-none">
                  MU
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold">Mohammad Umar</span>
                  <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0 text-[9px] font-mono font-semibold text-primary">
                    v1.0
                  </span>
                </div>
                <span className="truncate text-[10px] text-muted-foreground">Full Stack Developer</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
