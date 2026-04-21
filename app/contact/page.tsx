export const dynamic = "force-static"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { portfolioData } from "@/lib/data"
import { CopyButton } from "@/components/copy-button"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ArrowUpRight,
  MailIcon,
} from "lucide-react"

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: portfolioData.personal.email,
    copyValue: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    desc: "Best way to reach me",
    color: { bar: "from-primary", icon: "bg-primary/10 text-primary" },
  },
  {
    icon: Phone,
    label: "Phone",
    value: portfolioData.personal.phone,
    copyValue: portfolioData.personal.phone,
    href: `tel:${portfolioData.personal.phone}`,
    desc: "Available on WhatsApp too",
    color: { bar: "from-[oklch(0.62_0.17_155)]", icon: "bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)]" },
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${portfolioData.personal.location.city}, ${portfolioData.personal.location.region}, IN`,
    copyValue: "Pune, Maharashtra, India",
    href: "https://maps.google.com/?q=Pune,Maharashtra,India",
    desc: "Open to remote & hybrid",
    color: { bar: "from-orange-500", icon: "bg-orange-500/10 text-orange-500" },
  },
]

const socialLinks = [
  {
    icon: GithubIcon,
    label: "GitHub",
    username: "@mohammadumar-dev",
    href: "https://github.com/mohammadumar-dev",
    color: { bar: "from-slate-500", icon: "bg-slate-500/10 text-slate-600 dark:text-slate-400" },
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    username: "shaikh-mohammad-umar",
    href: "https://www.linkedin.com/in/shaikh-mohammad-umar",
    color: { bar: "from-blue-600", icon: "bg-blue-600/10 text-blue-600 dark:text-blue-400" },
  },
  {
    icon: XIcon,
    label: "X / Twitter",
    username: "@_s_h_a_i_k_h_",
    href: "https://x.com/_s_h_a_i_k_h_",
    color: { bar: "from-neutral-600", icon: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400" },
  },
]

export default function ContactPage() {
  const { personal } = portfolioData

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-primary bg-noise">
        <div className="pointer-events-none absolute -top-10 -right-10 size-52 rounded-full bg-primary/8 blur-3xl" />
        <div className="relative flex flex-col gap-3 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-[oklch(0.62_0.17_155)]/30 bg-[oklch(0.62_0.17_155)]/10 text-[oklch(0.62_0.17_155)] text-[10px]">
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-[oklch(0.62_0.17_155)] animate-pulse-dot" />
              Available for work
            </Badge>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gradient-brand md:text-3xl">Get in Touch</h1>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {personal.availability} Whether it&apos;s a full-time role, a consulting project, or just a technical conversation — I&apos;m all ears.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5 text-primary" />
            <span>IST (UTC+5:30) · Pune, India · Usually responds within 24 hrs</span>
          </div>
        </div>
      </div>

      {/* Contact methods */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Direct Contact</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <Card key={method.label} className="group h-full overflow-hidden hover-lift shadow-elevation-1 transition-all">
                <div className={`h-0.5 w-full bg-gradient-to-r ${method.color.bar} to-transparent`} />
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <div className={`flex size-10 items-center justify-center rounded-xl ${method.color.icon}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex items-center gap-1">
                      <CopyButton value={method.copyValue} label={method.label} />
                      <Link
                        href={method.href}
                        target={method.label === "Location" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex size-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      >
                        <ArrowUpRight className="size-3.5 text-muted-foreground/60" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">{method.label}</p>
                    <p className="mt-0.5 text-sm font-semibold break-all">{method.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{method.desc}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Social links */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Social Profiles</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                <Card className="group h-full overflow-hidden hover-lift shadow-elevation-1 transition-all">
                  <div className={`h-0.5 w-full bg-gradient-to-r ${social.color.bar} to-transparent`} />
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${social.color.icon}`}>
                      <Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{social.label}</p>
                      <p className="truncate text-xs text-muted-foreground font-mono">{social.username}</p>
                    </div>
                    <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-primary bg-noise">
        <div className="relative flex flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:text-left sm:py-8">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gradient-brand">Ready to collaborate?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drop me an email and I&apos;ll get back to you within a day.
            </p>
          </div>
          <Link
            href={`mailto:${personal.email}`}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 hover-lift"
          >
            <MailIcon className="size-4" />
            Send an Email
          </Link>
        </div>
      </div>

    </div>
  )
}
