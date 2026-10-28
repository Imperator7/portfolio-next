import { z } from 'zod'
import { StackItemSchema, type StackRole, type Tech } from '@/lib/schemas/content'

/** "Main expertise" in the hero: what I'm strongest in, grouped so it reads at a glance. */
export const EXPERTISE: { title: string; techs: Tech[] }[] = [
  { title: 'Frontend', techs: ['react', 'next', 'typescript', 'tailwind', 'react-query'] },
  { title: 'Backend', techs: ['node', 'express', 'postgres', 'mongodb'] },
  { title: 'Cloud & DevOps', techs: ['aws', 'terraform', 'github-actions'] },
]

export const stack = z.array(StackItemSchema).parse([
  { tech: 'react', role: 'frontend' },
  { tech: 'next', role: 'frontend' },
  { tech: 'tailwind', role: 'frontend' },
  { tech: 'vue', role: 'frontend' },
  { tech: 'nuxt', role: 'frontend' },
  { tech: 'figma', role: 'frontend' },
  { tech: 'typescript', role: 'languages' },
  { tech: 'javascript', role: 'languages' },
  { tech: 'node', role: 'backend' },
  { tech: 'express', role: 'backend' },
  { tech: 'jwt', role: 'backend' },
  { tech: 'pug', role: 'backend' },
  { tech: 'mongodb', role: 'database' },
  { tech: 'postgres', role: 'database' },
  { tech: 'mongoose', role: 'database' },
  { tech: 'prisma', role: 'database' },
  { tech: 'aws', role: 'devops' },
  { tech: 'terraform', role: 'devops' },
  { tech: 'github-actions', role: 'devops' },
  { tech: 'docker', role: 'devops' },
  { tech: 'vercel', role: 'devops' },
  { tech: 'firebase', role: 'devops' },
  { tech: 'react-query', role: 'tools' },
  { tech: 'zod', role: 'tools' },
  { tech: 'msw', role: 'tools' },
])

export const STACK_ROLES: { role: StackRole; title: string }[] = [
  { role: 'frontend', title: 'Frontend' },
  { role: 'backend', title: 'Backend' },
  { role: 'database', title: 'Databases' },
  { role: 'devops', title: 'Cloud & DevOps' },
  { role: 'languages', title: 'Languages' },
  { role: 'tools', title: 'Data & testing' },
]
