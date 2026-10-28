import { cn } from '@/lib/cn'

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300]

/**
 * An animated success mark: a ring bursts outward and sparks fly off while
 * the circle, then the check, draw themselves in. Inherits its color from
 * `currentColor`; size it with `className` (it fills its box).
 */
export default function SuccessCheck({
  className,
  sparkDistance = 'sm',
}: {
  className?: string
  sparkDistance?: 'sm' | 'lg'
}) {
  return (
    <span aria-hidden className={cn('relative grid size-5 place-items-center', className)}>
      <span className="absolute inset-0 animate-burst rounded-full border-2 border-current" />
      {SPARK_ANGLES.map((angle, i) => (
        <span
          key={angle}
          className={cn(
            'absolute top-1/2 left-1/2 animate-spark rounded-full bg-current',
            sparkDistance === 'lg' ? '-mt-1 -ml-1 size-2' : '-mt-0.5 -ml-0.5 size-1',
          )}
          style={
            {
              '--angle': `${angle}deg`,
              '--spark-distance': sparkDistance === 'lg' ? '40px' : '20px',
              animationDelay: `${80 + i * 15}ms`,
            } as React.CSSProperties
          }
        />
      ))}
      <svg viewBox="0 0 24 24" fill="none" className="size-full animate-pop">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2.5"
          pathLength={1}
          strokeDasharray={1}
          className="origin-center -rotate-90 animate-draw"
        />
        <path
          d="M7.5 12.5l3 3L16.5 9"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          className="animate-draw [animation-delay:300ms]"
        />
      </svg>
    </span>
  )
}
