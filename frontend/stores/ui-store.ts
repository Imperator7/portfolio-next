import { create } from 'zustand'
import type { SectionId } from '@/data/navigation'

// Shared client state. The section observer writes activeSection and the nav
// reads it; menuOpen is shared so any link or Esc can close the nav. That
// sharing is why these live here, not in useState.
type UiState = {
  menuOpen: boolean
  activeSection: SectionId | null
  toggleMenu: () => void
  openMenu: () => void
  closeMenu: () => void
  setActiveSection: (id: SectionId | null) => void
}

export const useUiStore = create<UiState>()((set) => ({
  menuOpen: false,
  activeSection: null,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  setActiveSection: (activeSection) => set({ activeSection }),
}))
