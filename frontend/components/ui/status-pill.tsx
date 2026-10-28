import { cn } from '@/lib/cn'

type StatusPillProps = {
  children: React.ReactNode
  /** Pulsing dot for "live" states (open to work, in development). */
  live?: boolean
  /** Glass styling for use over the hero photo. */
  onPhoto?: boolean
  size?: 'md' | 'lg'
  className?: string
}

/** A steady, glowing green dot with a ring breathing out of it. */
export function LiveDot({ className = 'size-2' }: { className?: string }) {
  return (
    <span aria-hidden className={cn('relative grid shrink-0 place-items-center', className)}>
      <span className="absolute inset-0 animate-halo rounded-full bg-live" />
      <span className="relative size-full rounded-full bg-live shadow-[0_0_8px_var(--color-live)]" />
    </span>
  )
}

export default function StatusPill({
  children,
  live,
  onPhoto,
  size = 'md',
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full select-none',
        size === 'lg'
          ? 'gap-3 px-5 py-2.5 text-body font-semibold'
          : 'gap-2 px-3.5 py-1.5 text-label',
        onPhoto
          ? 'glass text-on-night ring-1 ring-glass-line'
          : live
            ? // White with dark text and the green dot: reads clearly on
              // the dark page; the ring keeps its edge on the light theme.
              'bg-white font-medium text-night ring-1 ring-hairline-strong'
            : 'bg-sunken text-muted',
        className,
      )}
    >
      {live ? (
        <LiveDot className={size === 'lg' ? 'size-2.5' : 'size-2'} />
      ) : (
        <span
          aria-hidden
          className={cn('rounded-full bg-faint', size === 'lg' ? 'size-2.5' : 'size-1.5')}
        />
      )}
      {children}
    </span>
  )
}
