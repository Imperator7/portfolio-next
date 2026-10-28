import type { SectionId } from '@/data/navigation'
import { cn } from '@/lib/cn'

type SectionProps = {
  id: SectionId
  title: string
  intro?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** A home-page section: title, optional intro beside it, then content. */
export default function Section({ id, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        // The negative scroll margin exactly cancels the top padding, so a
        // jump to #id puts the heading right under the floating buttons
        // (the gap itself is scroll-padding-top in globals.css).
        'mx-auto max-w-content -scroll-mt-section px-4 py-section sm:px-8 lg:-scroll-mt-section-lg lg:px-12 lg:py-section-lg',
        className,
      )}
    >
      <header className="mb-10 grid gap-4 max-sm:mb-6 lg:mb-14 lg:grid-cols-12 lg:items-end lg:gap-8">
        {/* Phones: room on the right for the floating menu button, which a
            jump lands this title level with (see scroll-padding-top). */}
        <h2 id={headingId} className="text-heading-1 text-balance max-sm:pr-16 lg:col-span-7">
          {title}
        </h2>
        {intro && (
          <p className="max-w-prose text-body-lg text-muted lg:col-span-5">{intro}</p>
        )}
      </header>
      {children}
    </section>
  )
}
