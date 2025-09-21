'use client'

import Section from '@/components/Section'
import Project from '../components/Project'

const projects = [
  {
    name: 'tic tac toe',
    img: 'tictactoe.png',
    description: 'tictactoe game',
    stack: ['React', 'Typescript', 'Tailwind'],
    link: 'https://tictactoe-from-react-docs.vercel.app/',
  },
]

const Projects = () => {
  return (
    <Section>
      <div>
        <h2 className="topic-text">Projects</h2>
        {projects.map((project, i) => (
          <Project {...project} key={i} />
        ))}
      </div>
    </Section>
  )
}
export default Projects
