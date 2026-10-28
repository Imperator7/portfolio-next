import About from '@/components/about'
import Contact from '@/components/contact'
import Hero from '@/components/hero'
import SectionObserver from '@/components/section-observer'
import Skills from '@/components/skills'
import Work from '@/components/work'
import { certifications } from '@/data/certifications'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { EXPERTISE, stack } from '@/data/stack'

export default function Home() {
  const heroProject = projects.find((project) => project.featured) ?? projects[0]
  const otherProjects = projects.filter((project) => project !== heroProject)

  return (
    <main id="main">
      <SectionObserver />
      <Hero profile={profile} expertise={EXPERTISE} certifications={certifications} />
      <Work featured={heroProject} others={otherProjects} />
      <Skills items={stack} />
      <About profile={profile} certifications={certifications} />
      <Contact profile={profile} />
    </main>
  )
}
