import { Mail } from 'lucide-react'
import { cn } from '@/lib/cn'

// The ring is drawn on a 100 × 100 grid: one unbroken circle.
const R = 45
const C = 2 * Math.PI * R

// Slow easing so a filling arc visibly travels rather than jumps.
const MOTION =
  'transition-[stroke-dasharray,opacity] duration-900 ease-out-expo'

/**
 * A photo inside a ring that fills with green as the message form is filled
 * in. Each field (`progress`, 0–1 each) is worth a third, and the line
 * shows the running total: one unbroken arc from the top, counterclockwise,
 * that grows whichever field is typed in and eases to each new length. When the message is `sent` the ring is full, glows and turns a
 * third of a turn, the photo bounces, and a mail badge pops in at its corner.
 */
export default function ProgressAvatar({
  progress,
  sent,
  children,
  className,
}: {
  progress: readonly [number, number, number]
  sent: boolean
  /** The photo, filling a rounded box. */
  children: React.ReactNode
  className?: string
}) {
  const total = progress.reduce(
    (sum, value) => sum + Math.min(Math.max(value, 0), 1) / 3,
    0,
  )
  // A hair over the circumference when full, so the ends meet with no seam.
  const filled = sent || total >= 0.999 ? C + 1 : C * total

  return (
    <span className={cn('relative shrink-0', className)}>
      <span
        // A new key replays the bounce each time a message is sent.
        key={sent ? 'sent' : 'idle'}
        className={cn(
          'relative block size-full overflow-hidden rounded-full',
          sent && 'animate-thump',
        )}
      >
        {children}
      </span>

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        fill="none"
        className={cn(
          'absolute -inset-2.5 size-[calc(100%+1.25rem)] overflow-visible transition-[rotate,filter] duration-1200 ease-out-expo',
          sent
            ? '-rotate-120 drop-shadow-[0_0_6px_var(--color-live)]'
            : 'rotate-0',
        )}
      >
        <circle
          cx={50}
          cy={50}
          r={R}
          strokeWidth={3.5}
          className="stroke-hairline-strong"
        />
        {/* Mirrored left to right, so the line runs counterclockwise. */}
        <g transform="matrix(-1 0 0 1 100 0)">
          <circle
            cx={50}
            cy={50}
            r={R}
            strokeWidth={3.5}
            strokeDasharray={`${filled} ${C}`}
            style={{ rotate: '-90deg', transformOrigin: '50px 50px' }}
            className={cn(
              'stroke-live',
              MOTION,
              filled > 0 ? 'opacity-100' : 'opacity-0',
            )}
          />
        </g>
      </svg>

      {sent ? (
        <span className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-live text-night ring-3 ring-surface">
          <span
            aria-hidden
            className="absolute inset-0 animate-burst rounded-full border-2 border-live"
          />
          <Mail aria-hidden className="size-3.5 animate-pop" />
        </span>
      ) : null}
    </span>
  )
}
