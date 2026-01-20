'use client'

import { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { FaArrowUp } from 'react-icons/fa6'

export default function RightNavbar({ navList }) {
  const [scrolled, setScrolled] = useState(false)

  const SCROLL_PIXEL_THRESHOLD = 50

  const onScroll = () => setScrolled(window.scrollY > SCROLL_PIXEL_THRESHOLD)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={[
        'fixed pointer-events-none right-8 z-50 text-white flex flex-col justify-around items-end h-full',
        'transition-transform duration-400',
        scrolled ? '' : 'translate-x-100',
      ].join(' ')}
    >
      <NavLink key={'top'} nav={<FaArrowUp />} link={'top'} />
      {navList.map((nav, i) => (
        <NavLink key={i} nav={nav} position={'right'} />
      ))}
    </div>
  )
}
