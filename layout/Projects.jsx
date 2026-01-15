'use client'

import Section from '@/components/Section'
import Project from '../components/Project'

const projects = [
  {
    name: 'Note easy',
    img: 'picture/note-easy.png',
    description:
      'A note-taking application featuring task categorization, sorting options, and full CRUD capabilities for efficient task management.',
    type: 'From Scratch',
    stack: ['Nuxt.js', 'Typescript', 'Tailwind', 'Nuxt-auth-utils', 'Zod'],
    link: 'https://note-easy--note-easy-8ce41.asia-southeast1.hosted.app/auth/login',
    github: 'https://github.com/Imperator7/note-easy',
    stage: 'In Development',
  },
  {
    name: 'Dine Together',
    img: 'picture/group-ordering.png',
    description:
      "An ordering webapp that has 'Incoming Orders' tracker which syncs table-wide data to alert users of items already being incoming.",
    type: 'From Scratch',
    stack: [
      'Next.js',
      'Typescript',
      'Tailwind',
      'React Query',
      'Zod',
      'Mongoose',
      'MongoDB',
    ],
    link: 'https://dinetogether.vercel.app/menu?sessionId=693832a3dca0be8fb74a549e&table=2',
    github: 'https://github.com/Imperator7/Group-ordering',
    stage: 'In Development',
  },
  {
    name: 'Task management',
    img: 'picture/task-management.png',
    description: 'Production-ready task management with optimistic updates',
    type: 'From Scratch',
    stack: ['React.js', 'Typescript', 'Tailwind', 'React Query', 'Zod', 'MSW'],
    link: 'https://task-management-rungroj.vercel.app/',
    github: 'https://github.com/Imperator7/todolist-frontend',
    stage: 'Completed',
  },
  {
    name: 'Space Tourism',
    img: 'picture/space-tourism.png',
    description: 'Responsive website (mobile/tablet/desktop) for space tourism',
    type: 'Figma to Code',
    stack: ['Next.js', 'Typescript', 'Tailwind', 'responsive', 'Figma'],
    link: 'https://space-tour-figma-based.vercel.app/',
    github: 'https://github.com/Imperator7/space-tour-figma-based',
    stage: 'Completed',
  },
  {
    name: 'Portfolio by Next',
    img: 'picture/portfolio.png',
    description: 'portfolio built with Next.js',
    type: 'From Scratch',
    stack: ['Next.js', 'Javascript', 'Tailwind'],
    link: 'https://rungroj-portfolio.vercel.app/',
    github: 'https://github.com/Imperator7/portfolio-next',
    stage: 'Completed',
  },
  {
    name: 'Tic Tac Toe',
    img: 'picture/tictactoe.png',
    description: 'tictactoe game',
    type: 'From Scratch',
    stack: [
      'React.ts',
      'Typescript',
      'Tailwind',
      'responsive',
      'mobile interaction',
    ],
    link: 'https://tictactoe-from-react-docs.vercel.app/',
    github: 'https://github.com/Imperator7/tictactoe-from-react-docs',
    stage: 'Completed',
  },
]

const ProjectsSectionByType = ({ type, projects }) => {
  return (
    <div>
      <h3 className="secondary-topic-text">{type}</h3>
      <div className="flex  flex-row gap-y-8 flex-wrap gap-x-8">
        {projects.map(
          (project) =>
            project.type === type && <Project {...project} key={project.name} />
        )}
      </div>
    </div>
  )
}

const Projects = () => {
  const fromScratchProjects = {
    type: 'From Scratch',
    projects: projects.filter((p) => p.type === 'From Scratch'),
  }
  const figmaToCodeProjects = {
    type: 'Figma to Code',
    projects: projects.filter((p) => p.type === 'Figma to Code'),
  }
  return (
    <Section>
      <div>
        <h2 className="topic-text">Projects</h2>
        <div className="flex flex-col gap-y-8">
          {
            <ProjectsSectionByType
              type={fromScratchProjects.type}
              projects={fromScratchProjects.projects}
            />
          }
          {
            <ProjectsSectionByType
              type={figmaToCodeProjects.type}
              projects={figmaToCodeProjects.projects}
            />
          }
        </div>
      </div>
    </Section>
  )
}
export default Projects
