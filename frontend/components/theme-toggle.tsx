'use client'

import { useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/cn'
import { applyTheme, getTheme, useTheme, type Theme } from '@/lib/theme'

const THEME_REVEAL_MS = 650

/**
 * Switches the theme with a reveal: the new theme spreads over the page in
 * a circle growing from the point that was pressed (x, y), over
 * THEME_REVEAL_MS. Uses a view transition (CSS in globals.css turns off
 * its default cross-fade); without view transitions, or with reduced
 * motion, the theme just switches.
 */
function setTheme(theme: Theme, x: number, y: number) {
  if (theme === getTheme()) return
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    applyTheme(theme)
    return
  }
  const transition = document.startViewTransition(() => applyTheme(theme))
  // Far enough to cover the corner farthest from the press.
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: THEME_REVEAL_MS,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {
      // Skipped transitions (another one started) still switch the theme.
    })
}

/** The centre of the element an event happened on, for the reveal. */
function centerOf(element: Element) {
  const rect = element.getBoundingClientRect()
  return [rect.left + rect.width / 2, rect.top + rect.height / 2] as const
}

// The thumb travels one button's width (size-11 = 44px).
const TRAVEL_PX = 44
// Movement before a press counts as a drag rather than a tap.
const DRAG_START_PX = 4

const OPTIONS = [
  { theme: 'light', label: 'Light mode', Icon: Sun },
  { theme: 'dark', label: 'Dark mode', Icon: Moon },
] as const

/**
 * A two-sided switch: sun on the left, moon on the right, and a white thumb
 * that slides under the active side, so both choices and the current one are
 * visible at a glance. Each side is its own button with aria-pressed. The
 * thumb can also be dragged (finger or mouse): it follows the pointer and
 * settles on the side it's let go nearer to.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme()
  // The thumb's position while it's dragged, 0 (light) to TRAVEL_PX (dark).
  const [dragX, setDragX] = useState<number | null>(null)
  const press = useRef<{ id: number; x: number; from: number } | null>(null)
  // Set after a drag, so the click that ends it doesn't also flip a side.
  const justDragged = useRef(false)

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn('relative flex touch-none select-none', className)}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        press.current = {
          id: e.pointerId,
          x: e.clientX,
          from: getTheme() === 'dark' ? TRAVEL_PX : 0,
        }
      }}
      onPointerMove={(e) => {
        const start = press.current
        if (!start || start.id !== e.pointerId) return
        const dx = e.clientX - start.x
        if (dragX === null) {
          if (Math.abs(dx) < DRAG_START_PX) return
          e.currentTarget.setPointerCapture(e.pointerId)
        }
        setDragX(Math.min(Math.max(start.from + dx, 0), TRAVEL_PX))
      }}
      onPointerUp={(e) => {
        press.current = null
        if (dragX === null) return
        justDragged.current = true
        setTheme(dragX > TRAVEL_PX / 2 ? 'dark' : 'light', e.clientX, e.clientY)
        setDragX(null)
      }}
      onPointerCancel={() => {
        press.current = null
        setDragX(null)
      }}
      onClickCapture={(e) => {
        if (!justDragged.current) return
        justDragged.current = false
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {/* The thumb: slides between the two sides, or follows a drag. */}
      <span
        aria-hidden
        className={cn(
          'absolute top-0 left-0 size-11 rounded-full bg-on-night shadow-[0_2px_8px_rgb(0_0_0/0.35)]',
          dragX === null && 'transition-transform duration-500 ease-out-expo',
          dragX === null && (theme === 'dark' ? 'translate-x-11' : 'translate-x-0'),
        )}
        style={dragX === null ? undefined : { transform: `translateX(${dragX}px)` }}
      />
      {OPTIONS.map(({ theme: option, label, Icon }) => {
        const active = theme === option
        return (
          <button
            key={option}
            type="button"
            onClick={(e) => setTheme(option, ...centerOf(e.currentTarget))}
            aria-pressed={active}
            aria-label={label}
            title={label}
            className={cn(
              'relative grid size-11 place-items-center rounded-full transition-colors duration-300 ease-out-expo',
              active ? 'text-night' : 'text-on-night-muted hover:text-on-night',
            )}
          >
            <Icon
              aria-hidden
              className={cn(
                'size-4.5 transition-[rotate,scale] duration-500 ease-out-expo',
                active ? 'scale-100 rotate-0' : 'scale-90 -rotate-45',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
