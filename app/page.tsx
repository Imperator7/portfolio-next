'use client'

import LandingProfile from '../components/LandingProfile'
import RightNavbar from '../layout/Navbar/RightNavbar'
import AboutMe from '../layout/AboutMe'
import Stack from '../layout/Stack'
import Projects from '../layout/Projects'
import Contact from '../layout/Contact'

import { useState, useEffect } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  const THRESHOLD = 50 //px to scroll before show right navbar

  const navList = [
    'About me',
    'Projects',
    'Tech stack',
    'Contacts',
    'Download Resume',
  ]

  const onScroll = () => setScrolled(window.scrollY > THRESHOLD)

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black/90 backdrop-blur-ms p-5" id={'top'}>
      <RightNavbar navList={navList} scrolled={scrolled} />
      <section className=" bg-white/60 backdrop-blur-2xl rounded-3xl overflow-hidden">
        <LandingProfile navList={navList}></LandingProfile>
        <div id="About me">
          <AboutMe />
        </div>
        <h3 id="Projects">
          <Projects />
        </h3>
        <h3 id="Tech stack">
          <Stack />
        </h3>
        <h3 id="Contacts">
          <Contact />
        </h3>
      </section>
    </div>
  )
}
