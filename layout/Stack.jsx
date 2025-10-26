import TechStack from '@/components/TechStack'

const stacks = [
  { name: 'react', role: 'frontend', description: 'UI library' },
  { name: 'next', role: 'frontend', description: 'React framework' },
  {
    name: 'javascript',
    role: 'languages',
    description: 'Programming language',
  },
  { name: 'typescript', role: 'languages', description: 'Typed JavaScript' },
  { name: 'node', role: 'backend', description: 'JS runtime' },
  { name: 'express', role: 'backend', description: 'API framework' },
  { name: 'jwt', role: 'backend', description: 'Auth token' },
  { name: 'pug', role: 'backend', description: 'Template engine' },
  { name: 'mongodb', role: 'database', description: 'NoSQL database' },
  { name: 'postgres', role: 'database', description: 'SQL database' },
  { name: 'mongoose', role: 'database', description: 'MongoDB ORM' },
  { name: 'prisma', role: 'database', description: 'Type-safe ORM' },
  { name: 'github action', role: 'devops', description: 'CI/CD workflow' },
  { name: 'docker', role: 'devops', description: 'App container' },
  { name: 'zod', role: 'tools', description: 'Schema validator' },
  { name: 'tailwind', role: 'frontend', description: 'CSS framework' },
  { name: 'figma', role: 'frontend', description: 'Design tool' },
  { name: 'react query', role: 'tools', description: 'Data fetching' },
  { name: 'msw', role: 'tools', description: 'API mocking' },
]

const ROLE_TITLES = {
  frontend: 'Frontend',
  backend: 'Backend',
  languages: 'Languages',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
}

const ROLE_ORDER = [
  'frontend',
  'backend',
  'languages',
  'database',
  'devops',
  'tools',
]

const groupByRole = (items) =>
  items.reduce((acc, item) => {
    acc[item.role] ||= []
    acc[item.role].push(item)
    return acc
  }, {})

const Stack = () => {
  const grouped = groupByRole(stacks)

  return (
    <section className="space-y-10 px-8">
      <h2 className="topic-text">Tech Stack</h2>
      {ROLE_ORDER.map((role) => {
        const items = grouped[role] || []

        return (
          <section key={role}>
            <h2 className="text-3xl font-bold mb-4 text-white">
              {ROLE_TITLES[role]}
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {items.map((s) => (
                <TechStack key={s.name} tech={s.name} />
              ))}
            </ul>
          </section>
        )
      })}
    </section>
  )
}
export default Stack
