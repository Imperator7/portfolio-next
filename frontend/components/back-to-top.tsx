'use client'

import { useSyncExternalStore } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/cn'

// Shown once the hero is mostly scrolled past. Read from the scroll position
// directly (no copied state); re-checked on every scroll and resize.
function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}
const isPastHero = () => window.scrollY > window.innerHeight * 0.8

/**
 * A round button pinned bottom-right that rises in once you've scrolled past
 * the first screen and takes you back to the top.
 */
export default function BackToTop() {
  const visible = useSyncExternalStore(subscribe, isPastHero, () => false)

  return (
    <button
      type="button"
      inert={!visible}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        // The page's opposite color (white on the dark theme, near-black on
        // light), so it stands out over any section it floats above.
        'group fixed right-3 bottom-3 z-30 grid size-12 place-items-center rounded-full bg-ink text-canvas shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)] transition-[opacity,translate,background-color] duration-500 ease-out-expo hover:bg-ink/85 sm:right-6 sm:bottom-6 sm:size-14',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp
        aria-hidden
        className="size-5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
      />
    </button>
  )
}
