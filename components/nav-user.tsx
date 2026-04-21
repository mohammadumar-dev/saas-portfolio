"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronUpIcon, UserCircle2Icon, LogOutIcon, Download, SunIcon, MoonIcon, Settings2Icon } from "lucide-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/30 hover:bg-sidebar-accent/60 aria-expanded:bg-sidebar-accent/60 transition-colors"
              />
            }
          >
            <Avatar className="size-8 rounded-lg ring-2 ring-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} className="object-cover object-center" />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-[oklch(0.65_0.22_330)] text-primary-foreground text-xs font-bold">
                MU
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <ChevronUpIcon className="ml-auto size-4 text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            <div className="flex items-center gap-2.5 px-2 py-2">
              <Avatar className="size-9 rounded-lg ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover object-center" />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-[oklch(0.65_0.22_330)] text-primary-foreground text-xs font-bold">
                  MU
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <UserCircle2Icon className="size-4 text-primary" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings2Icon className="size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                const a = document.createElement("a")
                a.href = "/Shaikh_Mohammad_Umar_Resume.pdf"
                a.download = "Shaikh_Mohammad_Umar_Resume.pdf"
                a.click()
              }}>
                <Download className="size-4" />
                Download Resume
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark"
                ? <SunIcon className="size-4" />
                : <MoonIcon className="size-4" />
              }
              Toggle Theme
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push("/")}>
              <LogOutIcon className="size-4 text-destructive" />
              <span className="text-destructive">Exit to Landing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
