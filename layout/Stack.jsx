import Section from '@/components/Section'
import TechStack from '@/components/TechStack'

const Stack = () => {
  const stacks = [
    'react',
    'next',
    'javascript',
    'typescript',
    'node',
    'express',
    'jwt',
    'pug',
    'mongodb',
    'postgres',
    'mongoose',
    'prisma',
    'github action',
    'docker',
  ]
  return (
    <Section>
      <div>
        <h2 className="topic-text mb-16">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 max-w-[80vw] gap-y-4 lg:gap-y-8">
          {stacks.map((tech) => (
            <TechStack tech={tech} key={tech} />
          ))}
        </div>
      </div>
    </Section>
  )
}
export default Stack
