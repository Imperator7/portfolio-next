'use client'

import { useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * A label that cross-fades between a set of texts while its width eases to
 * fit the current one, so the button around it grows and shrinks smoothly
 * instead of jumping. CSS can't transition `width: auto` when the content
 * changes, so the current text is measured and the width set in px.
 */
export default function MorphLabel<T extends string>({
  labels,
  current,
}: {
  labels: readonly T[]
  current: T
}) {
  const wrapper = useRef<HTMLSpanElement>(null)
  const items = useRef(new Map<T, HTMLSpanElement>())

  useLayoutEffect(() => {
    const el = items.current.get(current)
    if (wrapper.current && el) wrapper.current.style.width = `${el.offsetWidth}px`
  }, [current])

  return (
    <span
      ref={wrapper}
      // Clip only sideways, so descenders ("g" in "Sending") aren't cut off.
      className="relative block overflow-x-clip transition-[width] duration-500 ease-out-expo"
    >
      {labels.map((label) => (
        <span
          key={label}
          ref={(el) => {
            if (el) items.current.set(label, el)
            else items.current.delete(label)
          }}
          aria-hidden={label !== current}
          className={cn(
            // w-max: each text is as wide as itself, so it can be measured.
            'block w-max whitespace-nowrap transition-opacity duration-300 ease-out-expo',
            // The current text stays in flow (it sizes the label before the
            // first measurement); the others sit on top of it, faded out.
            label === current ? 'relative opacity-100' : 'absolute top-0 left-0 opacity-0',
          )}
        >
          {label}
        </span>
      ))}
    </span>
  )
}
