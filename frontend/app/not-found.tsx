import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Page not found' }

/**
 * The 404 page (exported as 404.html for S3 + CloudFront): what happened in
 * one line and the way back, in the site's own type and colors instead of
 * Next's default page.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-svh max-w-content flex-col justify-center gap-6 px-4 py-section sm:px-8 lg:px-12"
    >
      <p className="font-display text-name leading-none text-faint tabular-nums" aria-hidden>
        404
      </p>
      <h1 className="text-heading-1 text-balance">This page doesn&apos;t exist</h1>
      <p className="max-w-prose text-body-lg text-muted">
        The link may be old or mistyped. Everything on the site starts from the home page.
      </p>
      <ButtonLink href="/" className="self-start">
        Back to the home page
      </ButtonLink>
    </main>
  )
}
