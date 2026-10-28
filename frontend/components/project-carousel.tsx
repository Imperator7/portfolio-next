'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import IconButton from '@/components/ui/icon-button'
import { cn } from '@/lib/cn'

const AUTOPLAY_MS = 3500
const SWIPE_PX = 40
// A pointer has to move this far sideways before it counts as a drag (so
// a click or a tap on a link still works).
const DRAG_START_PX = 6
// Neighbours sit 62% of a card's width to either side.
const STEP = 0.62

type ProjectCarouselProps = {
  /** The cards, already rendered (on the server). */
  slides: React.ReactNode[]
  /** Each card's project name, for the counter and screen readers. */
  names: string[]
}

/**
 * The mini projects as a rotating deck: one card in front, its neighbours
 * turned away on either side in 3D, and the deck turns to the next card
 * every few seconds. Drag it (mouse or finger: the cards follow and it
 * settles on the nearest one when let go), or use the arrows, the dots, a
 * click on a side card or the arrow keys. Any touch or click on the deck restarts
 * the countdown, so it never turns under someone who's looking; it holds
 * while a mouse rests on it or keyboard focus is inside, and never runs for
 * reduced motion. All cards share one grid cell, so the deck is as tall as
 * the tallest card and nothing jumps as it turns.
 */
export default function ProjectCarousel({ slides, names }: ProjectCarouselProps) {
  const count = slides.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped by every touch or click, to restart the countdown even when
  // the card in front doesn't change.
  const [touches, setTouches] = useState(0)
  // How far the deck is being dragged, in cards (0.5 = half way to the
  // next place; null when it isn't being dragged).
  const [drag, setDrag] = useState<number | null>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const pointer = useRef<{ id: number; x: number } | null>(null)
  // Set after a drag, so the click that ends it doesn't open a link.
  const justDragged = useRef(false)

  useEffect(() => {
    if (paused || drag !== null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, paused, drag, touches, count])

  const go = (index: number) => setActive((index + count) % count)

  // One card's width times STEP: how far a drag moves the deck one card.
  const stepPx = () => (deckRef.current?.firstElementChild?.clientWidth ?? 600) * STEP

  const endDrag = (dx: number) => {
    let steps = Math.round(-dx / stepPx())
    // A short flick still turns one card.
    if (steps === 0 && Math.abs(dx) > SWIPE_PX) steps = dx < 0 ? 1 : -1
    go(active + steps)
    setDrag(null)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Mini learning projects"
      className="mt-8"
      // Hover holds it for a mouse only: a tap fires enter but no leave,
      // which would hold a touch screen forever.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onPointerDownCapture={() => setTouches((n) => n + 1)}
      // Likewise only keyboard focus holds it; a tapped button keeps focus.
      onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(active + 1)
        if (e.key === 'ArrowLeft') go(active - 1)
      }}
    >
      {/* Clips the side cards at the page edge (no sideways scroll). */}
      <div className="-mx-4 overflow-x-clip px-4 py-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div
          ref={deckRef}
          className={cn(
            "grid touch-pan-y select-none perspective-[1800px] [grid-template-areas:'deck']",
            drag === null ? 'cursor-grab' : 'cursor-grabbing',
          )}
          // No native image drag or text selection getting in the way.
          onDragStart={(e) => e.preventDefault()}
          onPointerDown={(e) => {
            if (e.button !== 0) return
            pointer.current = { id: e.pointerId, x: e.clientX }
          }}
          onPointerMove={(e) => {
            const start = pointer.current
            if (!start || start.id !== e.pointerId) return
            const dx = e.clientX - start.x
            if (drag === null) {
              if (Math.abs(dx) < DRAG_START_PX) return
              e.currentTarget.setPointerCapture(e.pointerId)
            }
            setDrag(dx / stepPx())
          }}
          onPointerUp={(e) => {
            const start = pointer.current
            pointer.current = null
            if (!start || drag === null) return
            justDragged.current = true
            endDrag(e.clientX - start.x)
          }}
          onPointerCancel={() => {
            pointer.current = null
            if (drag !== null) endDrag(0)
          }}
          onClickCapture={(e) => {
            if (!justDragged.current) return
            justDragged.current = false
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {slides.map((slide, index) => {
            // Shortest way round the loop: -2 … 2 for five cards.
            let offset = index - active
            if (offset > count / 2) offset -= count
            if (offset < -count / 2) offset += count
            const isActive = offset === 0
            // While dragging, every card follows the pointer: its place is
            // fractional, and the transitions are off so it tracks 1:1.
            const place = drag === null ? offset : offset + drag
            const distance = Math.min(Math.abs(place), 2)
            const near = Math.round(distance)

            return (
              <div
                key={names[index]}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${names[index]}`}
                aria-hidden={!isActive}
                className={cn(
                  'relative mx-auto w-full max-w-2xl [grid-area:deck]',
                  drag === null &&
                    'transition-[translate,rotate,scale,opacity,filter] duration-900 ease-out-expo',
                  near > 1 && 'pointer-events-none',
                )}
                style={{
                  zIndex: 10 - near,
                  translate: `${place * STEP * 100}% 0`,
                  rotate: `y ${-place * 28}deg`,
                  scale: `${1 - distance * 0.14}`,
                  // 1 in front, 0.45 one place out, gone at two.
                  opacity: distance <= 1 ? 1 - distance * 0.55 : 0.45 * (2 - distance),
                  filter: `saturate(${1 - Math.min(distance, 1) * 0.6})`,
                }}
              >
                <div inert={!isActive}>{slide}</div>
                {/* A side card's content is inert, so a click on it lands
                    here and turns the deck to it. Pointer only: keyboard
                    users have the arrows and the dots. */}
                {near === 1 && drag === null && (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => go(index)}
                    className="absolute inset-0 cursor-pointer rounded-md"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* The card already shows its name; this tells screen readers. */}
      <p aria-live="polite" className="sr-only">
        {names[active]}, {active + 1} of {count}
      </p>
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* The current card's dot is a long track that fills over the
            countdown, so it's plain which card this is and when the next
            one comes. It restarts on every touch, like the timer. */}
        <div className="flex items-center">
          {names.map((name, index) => {
            const isActive = index === active
            return (
              <button
                key={name}
                type="button"
                aria-label={`Show ${name}`}
                aria-current={isActive}
                onClick={() => go(index)}
                className="group/dot grid h-11 place-items-center px-1.5"
              >
                <span
                  className={cn(
                    'relative h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-out-expo',
                    isActive
                      ? 'w-12 bg-hairline-strong'
                      : 'w-1.5 bg-hairline-strong group-hover/dot:bg-muted',
                  )}
                >
                  {isActive && (
                    <span
                      key={`${active}-${touches}-${paused}`}
                      className={cn(
                        'absolute inset-0 origin-left rounded-full bg-ink motion-reduce:animate-none!',
                        paused && 'scale-x-0',
                      )}
                      style={
                        paused
                          ? undefined
                          : { animation: `grow-x ${AUTOPLAY_MS}ms linear both` }
                      }
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-3">
          <IconButton label="Previous project" onClick={() => go(active - 1)}>
            <ChevronLeft aria-hidden className="size-5" />
          </IconButton>
          <IconButton label="Next project" onClick={() => go(active + 1)}>
            <ChevronRight aria-hidden className="size-5" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
