import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found — 404",
}

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-heading text-8xl font-bold tracking-tight">404</span>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
