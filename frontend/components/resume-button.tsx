'use client'

import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import SuccessCheck from '@/components/ui/success-check'
import { cn } from '@/lib/cn'

/**
 * The resume button: an outline pill, animated (glass over the hero photo,
 * `tone="page"` elsewhere). On hover or
 * focus a white fill sweeps in from the left, the text turns dark, the pill
 * lifts a touch, and the download arrow drops out and lands back in place.
 * After a click it confirms: the fill turns green, the arrow becomes a
 * check that pops in, and the label reads "Downloaded" for a moment.
 */
// The hero sits on the always-dark photo; the page flips with the theme.
const TONES = {
  photo: {
    idle: 'text-on-night ring-glass-line backdrop-blur-xl hover:text-night focus-visible:text-night',
    opening: 'text-night ring-glass-line',
    base: 'bg-glass',
    sweep: 'bg-on-night',
  },
  // The same frosted pill as on the photo, built from ink so it flips with
  // the theme: in dark mode it matches the hero's glass exactly.
  page: {
    idle: 'text-ink ring-ink/32 backdrop-blur-xl hover:text-canvas focus-visible:text-canvas',
    opening: 'text-canvas ring-ink/32',
    base: 'bg-ink/14',
    sweep: 'bg-ink',
  },
} as const

// Touch only: how long the fill takes to cross the pill before the PDF
// opens. Kept under a second so the browser still counts the open as part
// of the tap (Safari blocks pop-ups that come later).
const OPEN_DELAY_MS = 700

type Done = false | 'opening' | 'downloaded' | 'opened'

const DONE_LABELS = { opening: 'Opening…', downloaded: 'Downloaded', opened: 'Opened' } as const

export default function ResumeButton({
  href,
  label = 'Resume (PDF)',
  tone = 'photo',
  className,
}: {
  href: string
  label?: string
  tone?: keyof typeof TONES
  /** Extra classes, e.g. a smaller size on phones. */
  className?: string
}) {
  const colors = TONES[tone]
  // Local to this button, so useState rather than a store. "opening" and
  // "opened" are the touch-screen path (see onClick).
  const [done, setDone] = useState<Done>(false)
  // Touch only: the PDF's tab is open and we're waiting for the visitor to
  // come back before celebrating.
  const [awaitingReturn, setAwaitingReturn] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const opening = done === 'opening'
  const celebrating = done === 'downloaded' || done === 'opened'

  useEffect(() => () => clearTimeout(openTimer.current), [])

  useEffect(() => {
    if (!celebrating) return
    const timer = setTimeout(() => setDone(false), done === 'opened' ? 4000 : 2500)
    return () => clearTimeout(timer)
  }, [celebrating, done])

  // The success animation would otherwise play behind the PDF's tab and be
  // over by the time they're back, so it starts when this page is visible
  // again. If the browser opened the tab in the background instead (the page
  // never hid), it plays right away.
  useEffect(() => {
    if (!awaitingReturn) return
    const play = () => {
      setAwaitingReturn(false)
      setDone('opened')
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    const fallback = setTimeout(() => {
      if (document.visibilityState === 'visible') play()
    }, 800)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimeout(fallback)
    }
  }, [awaitingReturn])

  // Phones and tablets (iOS Safari in particular) ignore `download` for PDFs
  // and open them in the same tab, taking the visitor off the portfolio. On
  // touch screens the fill first sweeps across as a short "Opening…" bar,
  // then the PDF opens in a new tab. If the browser blocks that tab, the
  // PDF opens in this one instead, so the tap always does something.
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(hover: none)').matches) {
      setDone('downloaded')
      return
    }
    event.preventDefault()
    if (done) return
    setDone('opening')
    openTimer.current = setTimeout(() => {
      // No 'noopener' feature here: with it, window.open always returns
      // null and a blocked tab can't be told apart. The opener is cut by hand.
      const tab = window.open(href, '_blank')
      if (tab) {
        tab.opener = null
        setAwaitingReturn(true)
      } else {
        window.location.assign(href)
      }
    }, OPEN_DELAY_MS)
  }

  return (
    <a
      href={href}
      download
      onClick={onClick}
      aria-busy={opening}
      className={cn(
        'group relative isolate inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full px-5 py-3 text-button whitespace-nowrap ring-1 transition-[color,translate,scale,box-shadow] duration-500 ease-out-expo active:scale-[0.97]',
        celebrating
          ? 'text-white ring-success'
          : opening
            ? colors.opening
            : cn(colors.idle, 'hover:-translate-y-0.5 focus-visible:-translate-y-0.5'),
        className,
      )}
    >
      <span aria-hidden className={cn('absolute inset-0 -z-30', colors.base)} />
      {/* The sweep: a white layer scaled from 0 to full width. While opening
          on touch it crosses slowly and evenly, like a progress bar. */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -z-20 origin-left scale-x-0 transition-transform',
          colors.sweep,
          opening
            ? 'scale-x-100! duration-700 ease-in-out'
            : 'duration-500 ease-out-expo',
          !done && 'group-hover:scale-x-100 group-focus-visible:scale-x-100',
        )}
      />
      {/* Success: a green layer that grows out from the icon. */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 bg-success transition-[clip-path] duration-700 ease-out-expo',
          celebrating
            ? '[clip-path:circle(150%_at_1.75rem_50%)]'
            : '[clip-path:circle(0%_at_1.75rem_50%)]',
        )}
      />

      <span
        aria-hidden
        className={cn('relative grid size-4 place-items-center', !celebrating && 'overflow-hidden')}
      >
        {celebrating ? (
          <SuccessCheck />
        ) : (
          <>
            {/* The arrow drops through the bottom of its box and re-enters
                from the top; while opening it keeps dropping. */}
            <Download
              className={cn(
                'size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-5 group-focus-visible:translate-y-5',
                opening && 'translate-y-5!',
              )}
            />
            <Download
              className={cn(
                'absolute size-4 -translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0',
                opening && 'translate-y-0!',
              )}
            />
          </>
        )}
      </span>
      <span className="grid">
        {/* Both labels share one grid cell so the pill keeps its width. */}
        <span
          className={cn(
            'col-start-1 row-start-1 transition-[opacity,translate] duration-300 ease-out-expo',
            done ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100',
          )}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={cn(
            'col-start-1 row-start-1 justify-self-center transition-[opacity,translate] duration-300 ease-out-expo',
            done ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          {DONE_LABELS[done || 'downloaded']}
        </span>
      </span>
      <span role="status" className="sr-only">
        {done === 'opening'
          ? 'Opening the resume'
          : done === 'opened'
            ? 'Resume opened in a new tab'
            : done
              ? 'Resume download started'
              : ''}
      </span>
    </a>
  )
}
