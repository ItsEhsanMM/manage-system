import { create } from 'zustand'

type HamburgerMenuStore = {
  isHamburgerMenuOpen: boolean
  toggleHamburgerMenu: () => void
}

export const useHamburgerMenuStore = create<HamburgerMenuStore>(set => ({
  isHamburgerMenuOpen: false,
  toggleHamburgerMenu: () =>
    set(state => ({ isHamburgerMenuOpen: !state.isHamburgerMenuOpen })),
}))