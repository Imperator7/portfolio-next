'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/cn'

const TIME_ZONE = 'Asia/Bangkok'

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// Ticks on each new minute. The snapshot is the formatted time, so it only
// changes (and re-renders) once a minute.
function subscribe(onChange: () => void) {
  let interval: ReturnType<typeof setInterval> | undefined
  const timeout = setTimeout(
    () => {
      onChange()
      interval = setInterval(onChange, 60_000)
    },
    60_000 - (Date.now() % 60_000),
  )
  return () => {
    clearTimeout(timeout)
    clearInterval(interval)
  }
}

const getSnapshot = () => format.format(Date.now())
// The server can't know the visitor's "now": render nothing until hydrated.
const getServerSnapshot = () => null

/**
 * The owner's local time in Bangkok, with a sun by day and a moon by night,
 * so a visitor in another time zone knows when to expect a reply.
 */
export default function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hour = time ? Number(time.slice(0, 2)) : 12
  const daytime = hour >= 7 && hour < 22
  const Icon = daytime ? Sun : Moon

  return (
    <p
      className={cn(
        'flex flex-col items-end gap-0.5 text-right transition-opacity duration-500 ease-out-expo',
        time ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      <span className="flex items-center gap-1.5 text-body-sm font-medium text-ink tabular-nums">
        <Icon aria-hidden className="size-3.5 text-muted" />
        <time>{time ?? '00:00'}</time>
      </span>
      <span className="text-label text-faint">in Bangkok</span>
    </p>
  )
}
