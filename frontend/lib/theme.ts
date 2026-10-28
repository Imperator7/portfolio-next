'use client'

import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

/** The browser chrome color for each theme (the page canvas). */
export const THEME_COLORS: Record<Theme, string> = {
  dark: '#0d0f13',
  light: '#e7ebf1',
}

// The theme lives on <html data-theme>, set before paint by the script in
// app/layout.tsx. These read it straight from the DOM (no copied state) and
// re-render when it changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

/** The current theme; 'dark' (the default) on the server. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)
}

/**
 * Sets the theme on <html>, the browser chrome color (the phone's address
 * bar) and the saved choice.
 */
export function applyTheme(theme: Theme) {
  if (theme === 'light') document.documentElement.dataset.theme = 'light'
  else delete document.documentElement.dataset.theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be blocked; the choice then lasts for this page view.
  }
}
