"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { portfolioData } from "@/lib/data"
import { toast } from "sonner"
import {
  SunIcon,
  MoonIcon,
  MonitorIcon,
  Settings2Icon,
  ShieldAlertIcon,
  RotateCcwIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/hooks/use-preferences"

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const accentSwatches = [
  { label: "Indigo",  light: "oklch(0.52 0.22 275)", dark: "oklch(0.68 0.22 280)" },
  { label: "Violet",  light: "oklch(0.52 0.22 300)", dark: "oklch(0.68 0.22 300)" },
  { label: "Blue",    light: "oklch(0.52 0.22 240)", dark: "oklch(0.68 0.22 240)" },
  { label: "Cyan",    light: "oklch(0.52 0.18 200)", dark: "oklch(0.68 0.16 200)" },
  { label: "Emerald", light: "oklch(0.52 0.18 155)", dark: "oklch(0.68 0.15 155)" },
  { label: "Rose",    light: "oklch(0.52 0.22 355)", dark: "oklch(0.68 0.22 355)" },
]

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { personal } = portfolioData
  const { prefs, update, reset } = usePreferences()

  const notifications = prefs.notifications

  const setNotifications = (next: typeof notifications) => {
    update({ ...prefs, notifications: next })
  }

  const handleResetPreferences = () => {
    setTheme("system")
    reset()
    toast.success("Preferences reset to defaults")
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-primary/8 blur-3xl" />
        <div className="relative flex flex-col gap-2 p-6">
          <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
            <Settings2Icon className="mr-1.5 size-3" />
            Preferences
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your appearance and notification preferences</p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="flex flex-col gap-4">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-muted/60 h-10">
          <TabsTrigger value="appearance" className="rounded-lg text-xs">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg text-xs">Notifications</TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg text-xs">Account</TabsTrigger>
          <TabsTrigger value="danger" className="rounded-lg text-xs">Danger</TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance" className="flex flex-col gap-4">
          <Card className="shadow-elevation-1">
            <CardContent className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold mb-1">Theme</p>
                <p className="text-xs text-muted-foreground mb-4">Choose your preferred color scheme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", icon: SunIcon, label: "Light" },
                    { value: "dark", icon: MoonIcon, label: "Dark" },
                    { value: "system", icon: MonitorIcon, label: "System" },
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition-all hover-lift",
                        theme === value
                          ? "border-primary bg-primary/8 text-primary shadow-glow-primary"
                          : "border-border bg-muted/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      <div className={cn("rounded-lg p-2", theme === value ? "bg-primary/15" : "bg-background")}>
                        <Icon className="size-5" />
                      </div>
                      <span className="font-medium">{label}</span>
                      {theme === value && (
                        <span className="text-[10px] font-mono text-primary">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="text-sm font-semibold mb-1">Accent Color</p>
                <p className="text-xs text-muted-foreground mb-4">Visual preview of available accent colors</p>
                <div className="flex flex-wrap gap-3">
                  {accentSwatches.map((swatch) => (
                    <div key={swatch.label} className="flex flex-col items-center gap-1.5">
                      <div
                        className="size-8 rounded-full border-2 border-border transition-all hover:scale-110 hover:border-foreground/40 cursor-pointer"
                        style={{ backgroundColor: resolvedTheme === "dark" ? swatch.dark : swatch.light }}
                      />
                      <span className="text-[10px] text-muted-foreground font-mono">{swatch.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="flex flex-col gap-4">
          <Card className="shadow-elevation-1">
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-1">Notification Preferences</p>
              <p className="text-xs text-muted-foreground mb-6">Manage what updates you receive</p>
              <div className="flex flex-col gap-3">
                {[
                  { key: "email" as const, label: "Email notifications", desc: "Receive project updates via email" },
                  { key: "projects" as const, label: "New projects", desc: "Get notified when I ship new projects" },
                  { key: "blog" as const, label: "Blog posts", desc: "Receive new blog post notifications" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
                    <div>
                      <Label htmlFor={key} className="text-sm font-medium">{label}</Label>
                      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      id={key}
                      checked={notifications[key]}
                      onCheckedChange={(v) => {
                        setNotifications({ ...notifications, [key]: v })
                        toast.success(`${label} ${v ? "enabled" : "disabled"}`)
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="flex flex-col gap-4">
          <Card className="shadow-elevation-1">
            <CardContent className="p-6 flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold mb-1">Profile Information</p>
                <p className="text-xs text-muted-foreground mb-4">Read-only account details</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Name", value: personal.name },
                  { label: "Email", value: personal.email },
                  { label: "Location", value: `${personal.location.city}, ${personal.location.region}` },
                  { label: "Role", value: personal.title },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 rounded-xl border bg-muted/30 p-3">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="text-sm font-semibold mb-3">Connected Accounts</p>
                <div className="flex flex-col gap-2">
                  {[
                    { Icon: GithubIcon, label: "GitHub", user: "@mohammadumar-dev", connected: true },
                    { Icon: LinkedinIcon, label: "LinkedIn", user: "shaikh-mohammad-umar", connected: true },
                  ].map(({ Icon, label, user, connected }) => (
                    <div key={label} className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 p-3">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-muted-foreground" />
                        <div>
                          <span className="text-sm font-medium">{label}</span>
                          <p className="text-xs text-muted-foreground font-mono">{user}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold",
                        connected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
                      )}>
                        {connected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Danger Zone */}
        <TabsContent value="danger" className="flex flex-col gap-4">
          <Card className="shadow-elevation-1 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-destructive/10">
                  <ShieldAlertIcon className="size-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive">Danger Zone</p>
                  <p className="text-xs text-muted-foreground">Irreversible actions — proceed with caution</p>
                </div>
              </div>

              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">Reset all preferences</p>
                    <p className="text-xs text-muted-foreground">Restore theme, notifications, and display settings to defaults</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="shrink-0 gap-1.5"
                    onClick={handleResetPreferences}
                  >
                    <RotateCcwIcon className="size-3.5" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
