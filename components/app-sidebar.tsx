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
  Code2,
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
            >
              <div className="relative flex size-4 shrink-0 items-center justify-center">
                <div className="absolute size-6 rounded-lg bg-primary" />
                <Code2 className="relative size-3.5 text-primary-foreground" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold">Mohammad Umar</span>
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
