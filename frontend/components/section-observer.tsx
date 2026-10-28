'use client'

import { useEffect } from 'react'
import { NAV_ITEMS, type SectionId } from '@/data/navigation'
import { useUiStore } from '@/stores/ui-store'

/** Writes the section currently in view to the UI store for the header. */
export default function SectionObserver() {
  const setActiveSection = useUiStore((s) => s.setActiveSection)

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const visible = new Set<SectionId>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        // The first nav section in page order that's in the band wins.
        const first = NAV_ITEMS.find((item) => visible.has(item.id))
        setActiveSection(first?.id ?? null)
      },
      // A band across the upper middle of the viewport.
      { rootMargin: '-35% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      setActiveSection(null)
    }
  }, [setActiveSection])

  return null
}
