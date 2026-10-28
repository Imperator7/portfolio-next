'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Download, Mail, Menu, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import ThemeToggle from '@/components/theme-toggle'
import { NAV_ITEMS, type SectionId } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { useUiStore } from '@/stores/ui-store'

type FloatingNavProps = { resumeUrl: string; githubUrl: string }

/**
 * A round menu button pinned top-right that expands in place into the site
 * menu. Items cascade in when it opens. Esc, a click outside or choosing a
 * link closes it.
 */
export default function FloatingNav({ resumeUrl, githubUrl }: FloatingNavProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const menuOpen = useUiStore((s) => s.menuOpen)
  const activeSection = useUiStore((s) => s.activeSection)
  const toggleMenu = useUiStore((s) => s.toggleMenu)
  const openMenu = useUiStore((s) => s.openMenu)
  const closeMenu = useUiStore((s) => s.closeMenu)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hoverOpenedAt = useRef(0)

  // With a mouse, the menu opens on hover and closes a beat after the
  // pointer leaves (forgiving small slips). Touch keeps tap-to-open.
  const canHover = () => window.matchMedia('(hover: hover)').matches
  const onPointerEnter = () => {
    if (!canHover()) return
    clearTimeout(closeTimer.current)
    if (!menuOpen) hoverOpenedAt.current = Date.now()
    openMenu()
  }
  // The hover opens the menu just before the click lands; don't let that
  // click close it again straight away.
  const onButtonClick = () => {
    if (menuOpen && Date.now() - hoverOpenedAt.current < 400) return
    toggleMenu()
  }
  const onPointerLeave = () => {
    if (!canHover()) return
    closeTimer.current = setTimeout(closeMenu, 250)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // On a case study, "Projects" is where you are.
  const current = pathname.startsWith('/work') ? 'work' : activeSection

  // Next's <Link> treats a click on the URL you're already at (say /#work,
  // after scrolling elsewhere) as a no-op, so the page wouldn't move. On the
  // home page, scroll to the section ourselves and update the hash; on other
  // pages, let the link navigate home as usual.
  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    closeMenu()
    const section = pathname === '/' ? document.getElementById(id) : null
    if (!section) return
    event.preventDefault()
    // 'auto' follows the CSS scroll-behavior: smooth, or instant with
    // reduced motion.
    section.scrollIntoView({ behavior: 'auto' })
    history.pushState(null, '', `#${id}`)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeMenu()
      buttonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen, closeMenu])

  // Each row fades and slides in a beat after the one above it.
  const stagger = (i: number) => ({
    transitionDelay: menuOpen ? `${120 + i * 50}ms` : '0ms',
  })
  const rowMotion = cn(
    'transition-[opacity,translate] duration-500 ease-out-expo',
    menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
  )

  return (
    <>
    {/* Theme switch: a two-sided pill just left of the menu button. The
        menu panel opens over it, so it fades out (and leaves the tab order)
        while the menu is open. Phones: not up here (the top bar stays a
        single button); it's a row inside the open menu instead. */}
    <div
      inert={menuOpen}
      className={cn(
        'fixed top-3 right-[4.75rem] z-40 rounded-full max-sm:hidden bg-night/85 p-1.5 text-on-night ring-1 ring-glass-line backdrop-blur-xl transition-[opacity,scale] duration-300 ease-out-expo sm:top-6 sm:right-[5.5rem]',
        menuOpen ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100',
      )}
    >
      <ThemeToggle />
    </div>
    <div
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="fixed top-3 right-3 z-50 sm:top-6 sm:right-6"
    >
      <div
        className={cn(
          'overflow-hidden rounded-[1.75rem] bg-night/85 text-on-night shadow-[0_24px_60px_-16px_rgb(0_0_0/0.55)] ring-1 ring-glass-line backdrop-blur-xl transition-[width] duration-500 ease-out-expo',
          menuOpen ? 'w-[min(21rem,calc(100vw-1.5rem))]' : 'w-14',
        )}
      >
        <div className="relative flex items-center justify-end p-1.5">
          {/* Out of the flow, so it never pushes the button out of the closed circle. */}
          <div className="absolute inset-y-0 left-5 flex items-center">
            <p
              className={cn(
                'flex items-center gap-2 text-label whitespace-nowrap text-on-night-muted',
                rowMotion,
              )}
              style={stagger(0)}
              aria-hidden={!menuOpen}
            >
              <span className="relative size-2">
                <span className="absolute inset-0 animate-halo rounded-full bg-live" />
                <span className="relative block size-full rounded-full bg-live shadow-[0_0_8px_var(--color-live)]" />
              </span>
              Open to work
            </p>
          </div>
          <button
            ref={buttonRef}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={onButtonClick}
            className="relative grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-150 ease-out-expo hover:bg-glass"
          >
            {/* Menu and close icons cross-fade with a quarter turn. */}
            <Menu
              aria-hidden
              className={cn(
                'absolute size-5 transition-[opacity,rotate] duration-300 ease-out-expo',
                menuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
              )}
            />
            <X
              aria-hidden
              className={cn(
                'absolute size-5 transition-[opacity,rotate] duration-300 ease-out-expo',
                menuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
              )}
            />
          </button>
        </div>

        {/* 0fr → 1fr grid rows animate the height without measuring it. */}
        <div
          id="site-menu"
          inert={!menuOpen}
          className={cn(
            'grid transition-[grid-template-rows] duration-500 ease-out-expo',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <nav aria-label="Primary" className="min-h-0 w-[min(21rem,calc(100vw-1.5rem))]">
            <ul className="flex flex-col gap-0.5 px-2 pt-1">
              {NAV_ITEMS.map((item, i) => {
                const isCurrent = current === item.id
                return (
                  <li key={item.id} className={rowMotion} style={stagger(i + 1)}>
                    <Link
                      href={`/#${item.id}`}
                      onClick={(event) => jumpTo(event, item.id)}
                      aria-current={isCurrent ? 'location' : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-200 ease-out-expo hover:bg-glass',
                        isCurrent && 'bg-glass',
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-display text-heading-3">
                          {item.label}
                          {isCurrent && (
                            <span aria-hidden className="size-1.5 rounded-full bg-accent-on-night" />
                          )}
                        </span>
                        <span className="block text-label text-on-night-muted">
                          {item.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 -translate-x-2 opacity-0 transition-[opacity,translate] duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Phones only: the theme switch lives here, not in the top bar. */}
            <div
              className={cn(
                'mt-2 flex items-center justify-between gap-3 border-t border-glass-line py-2 pr-2 pl-4 sm:hidden',
                rowMotion,
              )}
              style={stagger(NAV_ITEMS.length + 1)}
            >
              <span className="text-body-sm text-on-night-muted">Theme</span>
              <div className="rounded-full bg-glass p-1">
                <ThemeToggle />
              </div>
            </div>

            <div
              className={cn('mt-2 flex gap-2 border-t border-glass-line p-2 max-sm:mt-0', rowMotion)}
              style={stagger(NAV_ITEMS.length + 2)}
            >
              <a
                href={resumeUrl}
                download
                onClick={closeMenu}
                className="group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-on-night text-button text-night transition-colors duration-200 ease-out-expo hover:bg-on-night-muted"
              >
                <Download
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
                />
                Resume
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                title="GitHub"
                className="grid size-12 place-items-center rounded-2xl bg-glass transition-colors duration-200 ease-out-expo hover:bg-on-night hover:text-night"
              >
                <FaGithub aria-hidden className="size-4.5" />
              </a>
              {/* Goes to the contact section (the form and the address),
                  not straight into a mail app. */}
              <Link
                href="/#contact"
                onClick={(event) => jumpTo(event, 'contact')}
                aria-label="Contact me"
                title="Contact me"
                className="grid size-12 place-items-center rounded-2xl bg-glass transition-colors duration-200 ease-out-expo hover:bg-on-night hover:text-night"
              >
                <Mail aria-hidden className="size-4.5" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}
