"use client"

import * as React from "react"

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
import { LayoutDashboardIcon, UserIcon, ZapIcon, FolderGitIcon, BriefcaseIcon, MailIcon, Settings2Icon, CircleHelpIcon, UserCircle2Icon, Code2 } from "lucide-react"

const data = {
  user: {
    name: "Mohammad Umar Shaikh",
    email: "mohammadumar.dev@gmail.com",
    avatar: "/me.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "About",
      url: "/about",
      icon: <UserIcon />,
    },
    {
      title: "Skills",
      url: "/skills",
      icon: <ZapIcon />,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: <FolderGitIcon />,
    },
    {
      title: "Experience",
      url: "/experience",
      icon: <BriefcaseIcon />,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: <MailIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <UserCircle2Icon />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <Code2 className="size-5!" />
              <span className="text-base font-semibold">Mohammad Umar Shaikh</span>
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
