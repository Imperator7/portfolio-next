'use client'

import Section from '@/components/Section'
import Project from '../components/Project'

const projects = [
  {
    name: 'Portfolio by Next',
    img: 'picture/portfolio.png',
    description: 'portfolio built with Next.js',
    type: 'scratch',
    stack: ['Next.js', 'Javascript', 'Tailwind'],
    link: 'https://rungroj-portfolio.vercel.app/',
    github: 'https://github.com/Imperator7/portfolio-next',
  },
  {
    name: 'Tic Tac Toe',
    img: 'picture/tictactoe.png',
    description: 'tictactoe game',
    type: 'scratch',
    stack: [
      'React.ts',
      'Typescript',
      'Tailwind',
      'responsive',
      'mobile interaction',
    ],
    link: 'https://tictactoe-from-react-docs.vercel.app/',
    github: 'https://github.com/Imperator7/tictactoe-from-react-docs',
  },
]

const Projects = () => {
  return (
    <Section>
      <div>
        <h2 className="topic-text">Projects</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-8">
          {projects.map((project) => (
            <Project {...project} key={project.name} />
          ))}
        </div>
      </div>
    </Section>
  )
}
export default Projects
