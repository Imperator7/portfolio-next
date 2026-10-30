'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

type Shot = { src: string; label: string }

/**
 * A featured project's screenshots: the current one large, a row of labelled
 * thumbnails under it. Picking a thumbnail cross-fades the large image; all
 * of them stay mounted, so the switch never waits for a download.
 */
export default function ScreenshotGallery({ name, shots }: { name: string; shots: Shot[] }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex h-full flex-col">
      <div
        data-spotlight
        className="group/shot relative aspect-16/10 overflow-hidden bg-sunken lg:aspect-auto lg:flex-1"
      >
        {shots.map((shot, index) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={index === current ? `${name}: ${shot.label}` : ''}
            aria-hidden={index !== current}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority={index === 0}
            className={cn(
              'object-cover object-top transition-[opacity,scale] duration-700 ease-out-expo',
              index === current
                ? 'opacity-100 group-data-inview/shot:scale-[1.04]'
                : 'scale-[1.02] opacity-0',
            )}
          />
        ))}
      </div>
      <div
        role="group"
        aria-label={`${name} screenshots`}
        className="grid grid-cols-3 gap-1.5 border-t border-hairline p-2 sm:gap-2"
      >
        {shots.map((shot, index) => {
          const active = index === current
          return (
            <button
              key={shot.src}
              type="button"
              aria-pressed={active}
              onClick={() => setCurrent(index)}
              className={cn(
                'group/thumb flex min-h-11 items-center gap-2.5 rounded-sm p-1.5 text-left transition-[background-color,color,translate] duration-300 ease-out-expo hover:-translate-y-0.5 max-sm:flex-col max-sm:items-start max-sm:gap-1.5',
                active ? 'bg-canvas text-ink' : 'text-muted hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'relative block aspect-16/10 w-16 shrink-0 overflow-hidden rounded-[6px] ring-1 transition-[box-shadow] duration-300 max-sm:w-full',
                  active ? 'ring-ink' : 'ring-hairline group-hover/thumb:ring-hairline-strong',
                )}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 4rem, 33vw"
                  className="object-cover object-top"
                />
              </span>
              <span className="px-0.5 text-label font-medium">{shot.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
