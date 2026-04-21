export const dynamic = "force-static"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CircleHelpIcon,
  KeyboardIcon,
  BookOpenIcon,
  DatabaseIcon,
  MailIcon,
  LayoutDashboardIcon,
  FolderGitIcon,
  ZapIcon,
  UserIcon,
  BriefcaseIcon,
  SearchIcon,
} from "lucide-react"

const shortcuts = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["G", "D"], description: "Go to Dashboard" },
  { keys: ["G", "A"], description: "Go to About" },
  { keys: ["G", "S"], description: "Go to Skills" },
  { keys: ["G", "P"], description: "Go to Projects" },
  { keys: ["G", "E"], description: "Go to Experience" },
  { keys: ["G", "C"], description: "Go to Contact" },
  { keys: ["D"], description: "Toggle dark/light theme" },
]

const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in Java, Spring Boot, Python, React, Next.js, TypeScript, PostgreSQL, and multi-agent AI architectures. Check the Skills page for the full breakdown.",
  },
  {
    q: "Are you available for freelance projects?",
    a: "Yes! I'm open to select freelance and consulting engagements alongside full-time opportunities. Reach out via the Contact page.",
  },
  {
    q: "Where does the GitHub data come from?",
    a: "The dashboard fetches live data from the GitHub REST and GraphQL APIs. Contribution counts, repository stats, and language distributions are fetched server-side and cached for 1 hour.",
  },
  {
    q: "How do I download your resume?",
    a: "You can download my resume from the sidebar (Download Resume button), from the user menu in the bottom-left corner, or by using ⌘K and searching 'resume'.",
  },
  {
    q: "What is the tech stack for this portfolio?",
    a: "Built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, and Recharts. Deployed on Vercel with GitHub Actions CI. All source code is on GitHub.",
  },
  {
    q: "Can I use this portfolio as a template?",
    a: "Yes! The source code is open source. Feel free to fork and adapt it — attribution is appreciated but not required.",
  },
  {
    q: "How do I navigate between sections quickly?",
    a: "Use the ⌘K command palette to jump to any page instantly. You can also use the keyboard shortcuts listed below.",
  },
  {
    q: "What's your typical response time?",
    a: "I usually respond to emails within 24 hours on business days. For urgent matters, WhatsApp is the fastest way to reach me.",
  },
]

const quickLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon, desc: "GitHub stats & activity" },
  { label: "Projects", href: "/projects", icon: FolderGitIcon, desc: "What I've built" },
  { label: "Skills", href: "/skills", icon: ZapIcon, desc: "Tech stack overview" },
  { label: "Contact", href: "/contact", icon: MailIcon, desc: "Get in touch" },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-2 bg-mesh-subtle bg-noise">
        <div className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="relative flex flex-col gap-4 p-6 sm:p-8">
          <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
            <CircleHelpIcon className="mr-1.5 size-3" />
            Help & Documentation
          </span>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">How can we help?</h1>
          <p className="text-muted-foreground text-sm max-w-md">
            Find answers to common questions, learn keyboard shortcuts, and explore the portfolio.
          </p>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/50 px-4 py-2.5 max-w-sm text-sm text-muted-foreground">
            <SearchIcon className="size-4 shrink-0" />
            <span>Search with ⌘K...</span>
            <kbd className="ml-auto inline-flex h-5 items-center rounded border bg-background px-1.5 font-mono text-[10px]">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Quick Navigation</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, href, icon: Icon, desc }) => (
            <Link key={href} href={href}>
              <Card className="group hover:border-primary/30 hover:shadow-elevation-2 h-full cursor-pointer transition-all duration-200 shadow-elevation-1">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/8 group-hover:bg-primary/15 transition-colors">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <KeyboardIcon className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">Keyboard Shortcuts</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <Card className="shadow-elevation-1">
          <CardContent className="p-5">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {shortcuts.map(({ keys, description }) => (
                <div key={description} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">
                  <span className="text-sm text-muted-foreground">{description}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((key, i) => (
                      <kbd
                        key={i}
                        className="inline-flex h-6 min-w-6 items-center justify-center rounded border bg-background px-1.5 font-mono text-[11px] font-semibold text-foreground shadow-sm"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <BookOpenIcon className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground font-mono">FAQ</span>
          <span className="h-px flex-1 bg-border" />
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary">
            {faqs.length} questions
          </span>
        </div>
        <Card className="shadow-elevation-1">
          <CardContent className="p-0">
            <Accordion className="w-full rounded-none border-none">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={i}
                  className={i === 0 ? "border-b" : i === faqs.length - 1 ? "" : "border-b"}
                >
                  <AccordionTrigger className="px-5 py-4 text-sm font-medium hover:no-underline text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Still stuck */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-elevation-1 bg-mesh-subtle bg-noise">
        <div className="relative flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <MailIcon className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold">Still need help?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Couldn&apos;t find what you were looking for? Reach out directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 hover-lift"
          >
            Contact Me
          </Link>
        </div>
      </div>

    </div>
  )
}
