import LandingProfile from '../components/LandingProfile'
import RightNavbar from '../layout/Navbar/RightNavbar'
import AboutMe from '../layout/AboutMe'
import Stack from '../layout/Stack'
import Projects from '../layout/Projects'
import Contact from '../layout/Contact'

export default function Home() {
  const navList = [
    'About me',
    'Projects',
    'Tech stack',
    'Contacts',
    'Download Resume',
  ]

  return (
    <div
      className="min-h-screen bg-black/80 backdrop-blur-ms p-2 md:p-4"
      id={'top'}
    >
      <RightNavbar navList={navList} />
      <main
        className={[
          'flex flex-col',
          'bg-black backdrop-blur-2xl rounded-3xl overflow-hidden pb-12',
        ].join(' ')}
      >
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
      </main>
    </div>
  )
}
