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
      <div className="relative flex flex-col">
        <h2 className="topic-text">Tech Stack</h2>
        <ul className="relative grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] min-w-[80vw] justify-start max-w-[90vw] lg:max-w-[80vw] gap-x-4 md:gap-x-8 gap-y-4 lg:gap-y-8">
          {stacks.map((tech) => (
            <TechStack tech={tech} key={tech} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
export default Stack
