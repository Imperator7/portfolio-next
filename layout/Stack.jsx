import Section from '@/components/Section'

const Stack = () => {
  const stacks = [
    'React',
    'Next',
    'Javascript',
    'Typescript',
    'Node',
    'Express',
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
        <h2 className="topic-text">Tech Stack</h2>
        <div>
          {stacks.map((tech) => (
            <p key={tech} className="font-light">
              {tech}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
export default Stack
