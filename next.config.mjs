/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development"

const nextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/:path*",
        headers: [
          // Prevent browsers from MIME-sniffing the declared content-type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Disallow embedding in iframes — prevents clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers leaking the full URL in the Referer header to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS — enforce HTTPS for 2 years, include subdomains, allow preload
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Disable browser features this app never uses
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // Content Security Policy
          // - default-src 'self': only load resources from the same origin
          // - script-src: Next.js requires 'unsafe-inline' for its runtime chunks
          // - style-src: Tailwind CSS v4 injects <style> tags at runtime
          // - img-src: allow GitHub avatars and the local public folder
          // - font-src 'self': next/font self-hosts Google Fonts at build time
          // - connect-src 'self': no client-side external XHR/fetch
          // - frame-ancestors 'none': belt-and-suspenders with X-Frame-Options
          // - base-uri 'self': prevent <base> tag injection
          // - form-action 'self': no form submissions to external sites
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://avatars.githubusercontent.com",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      // Public static assets — long-lived but revalidatable
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*.jpg",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      // Fonts are immutable — the filename includes a content hash
      {
        source: "/:path*.woff2",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
}

export default nextConfig
