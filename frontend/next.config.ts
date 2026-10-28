import path from 'node:path'
import type { NextConfig } from 'next'

// The contact form can't be sent without a Turnstile token, and the site key
// is baked into the static build: stop a production build that lacks it.
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
  throw new Error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set (see .env.example).')
}

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder otherwise confuses root detection.
  turbopack: { root: path.resolve(__dirname) },
  // Static export for S3 + CloudFront: no API routes, no server actions.
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts
  // through this PC's LAN address (start it with `npm run dev:lan`). Next
  // otherwise allows only localhost. Has no effect on the static build.
  allowedDevOrigins: ['192.168.1.33', '192.168.*.*'],
}

export default nextConfig
