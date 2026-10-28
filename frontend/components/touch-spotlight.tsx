'use client'

import { useEffect } from 'react'

/**
 * Touch screens can't hover, so here scrolling stands in for it: whatever
 * `[data-spotlight]` element sits in the middle band of the screen gets a
 * `data-inview` attribute, and styles use it the way desktop uses :hover
 * (Tailwind's `group-data-inview/name:` variants, or CSS in globals.css).
 * Does nothing on devices that can hover, so desktop stays as it is.
 */
export default function TouchSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-inview', entry.isIntersecting)
        }
      },
      // The middle 30% of the screen.
      { rootMargin: '-35% 0px -35% 0px' },
    )
    document.querySelectorAll('[data-spotlight]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
