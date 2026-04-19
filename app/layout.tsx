import { Geist_Mono, Manrope, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const jetbrainsMonoHeading = JetBrains_Mono({ subsets: ["latin"], variable: "--font-heading" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", manrope.variable, jetbrainsMonoHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
