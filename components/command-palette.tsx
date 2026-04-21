"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
  HomeIcon,
  Download,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const navItems = [
  { title: "Dashboard",  url: "/dashboard",  icon: LayoutDashboardIcon, shortcut: "G D" },
  { title: "About",      url: "/about",      icon: UserIcon,            shortcut: "G A" },
  { title: "Skills",     url: "/skills",     icon: ZapIcon,             shortcut: "G S" },
  { title: "Projects",   url: "/projects",   icon: FolderGitIcon,       shortcut: "G P" },
  { title: "Experience", url: "/experience", icon: BriefcaseIcon,       shortcut: "G E" },
  { title: "Contact",    url: "/contact",    icon: MailIcon,            shortcut: "G C" },
]

const settingsItems = [
  { title: "Settings",  url: "/settings", icon: Settings2Icon   },
  { title: "Get Help",  url: "/help",     icon: CircleHelpIcon  },
  { title: "Profile",   url: "/profile",  icon: UserCircle2Icon },
  { title: "Landing",   url: "/",         icon: HomeIcon        },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const navigate = (url: string) => {
    router.push(url)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
      <CommandInput placeholder="Search pages, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem key={item.url} onSelect={() => navigate(item.url)}>
              <item.icon className="size-4 text-primary" />
              {item.title}
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Other">
          {settingsItems.map((item) => (
            <CommandItem key={item.url} onSelect={() => navigate(item.url)}>
              <item.icon className="size-4" />
              {item.title}
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => {
              window.open("/Shaikh_Mohammad_Umar_Resume.pdf", "_blank")
              setOpen(false)
            }}
          >
            <Download className="size-4" />
            Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
      </Command>
    </CommandDialog>
  )
}
