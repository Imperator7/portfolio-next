import { z } from 'zod'

export const TECH = [
  'react',
  'next',
  'vue',
  'nuxt',
  'tailwind',
  'figma',
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
  'aws',
  'terraform',
  'github-actions',
  'docker',
  'vercel',
  'firebase',
  'zod',
  'react-query',
  'msw',
] as const

export const TechSchema = z.enum(TECH)
export type Tech = z.infer<typeof TechSchema>

export const StackRoleSchema = z.enum([
  'frontend',
  'backend',
  'languages',
  'database',
  'devops',
  'tools',
])
export type StackRole = z.infer<typeof StackRoleSchema>

export const StackItemSchema = z.object({
  tech: TechSchema,
  role: StackRoleSchema,
})
export type StackItem = z.infer<typeof StackItemSchema>

const LinkSchema = z.object({ label: z.string().min(1), url: z.url() })

export const ServiceSchema = z.enum([
  'cloudflare',
  'cloudfront',
  's3',
  'acm',
  'api-gateway',
  'lambda',
  'dynamodb',
  'terraform',
])
export type Service = z.infer<typeof ServiceSchema>

/**
 * A security or setup detail shown as a chip on a diagram node, e.g. its TLS
 * certificate or "Block Public Access on". `service` gives the chip that
 * service's icon; without it the chip gets a shield.
 */
const BadgeSchema = z.object({ label: z.string().min(1), service: ServiceSchema.optional() })
export type Badge = z.infer<typeof BadgeSchema>

const ArchitectureLaneSchema = z.object({
  /** What the visitor is doing, e.g. "Opening the site". */
  label: z.string().min(1),
  /** Where the request starts, e.g. "Browser". */
  from: z.string().min(1),
  /** The hostname this lane is reached on, e.g. "api.rungroj.dev". */
  host: z.string().min(1),
  steps: z
    .array(
      z.object({
        service: ServiceSchema,
        role: z.string().min(1),
        badges: z.array(BadgeSchema).default([]),
      }),
    )
    .min(1),
})

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  /** One line a recruiter can read in two seconds. */
  tagline: z.string().min(1).max(140),
  /** The case-study opening paragraph. */
  summary: z.string().min(1),
  image: z.string().startsWith('/'),
  type: z.enum(['from-scratch', 'figma-to-code']),
  stage: z.enum(['completed', 'in-development']),
  featured: z.boolean(),
  stack: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).min(1),
  learnings: z.array(z.string().min(1)).default([]),
  /** Request paths drawn as diagrams on the featured project. */
  /** Where the domain lives; every lane of the diagram branches from it. */
  domain: z.object({ service: ServiceSchema, role: z.string().min(1) }).optional(),
  architecture: z.array(ArchitectureLaneSchema).default([]),
  /** Supporting pieces shown under the diagram (certificates, IaC). */
  foundations: z
    .array(
      z.object({
        service: ServiceSchema,
        role: z.string().min(1),
        badges: z.array(BadgeSchema).default([]),
      }),
    )
    .default([]),
  /** Detailed stack, grouped, for the featured project. */
  builtWith: z
    .array(z.object({ group: z.string().min(1), items: z.array(z.string().min(1)).min(1) }))
    .default([]),
  /** Omitted when the project has no live demo (any more). */
  demoUrl: z.url().optional(),
  repoUrl: z.url(),
  extraLinks: z.array(LinkSchema).default([]),
})
export type Project = z.infer<typeof ProjectSchema>

export const CertificationSchema = z.object({
  name: z.string().min(1),
  provider: z.string().min(1),
  /** About's large value, short enough for one line ("AWS SAA"). */
  shortName: z.string().min(1),
  /** About's label under the value. */
  label: z.string().min(1),
  issued: z.string().min(1),
  image: z.string().startsWith('/'),
  verifyUrl: z.url(),
  /** Primary badges show larger in the hero than secondary ones. */
  emphasis: z.enum(['primary', 'secondary']).default('primary'),
})
export type Certification = z.infer<typeof CertificationSchema>

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  location: z.string(),
  openToWork: z.boolean(),
  availability: z.string(),
  headline: z.string(),
  /** The highlighted end of the headline (the AWS certification). */
  headlineHighlight: z.string(),
  intro: z.string(),
  /** One short paragraph: the story beside the About title. */
  about: z.string().min(1),
  education: z.object({ degree: z.string(), school: z.string() }),
  email: z.email(),
  phone: z.string(),
  githubUrl: z.url(),
  githubHandle: z.string(),
  resumeUrl: z.string().startsWith('/'),
})
export type Profile = z.infer<typeof ProfileSchema>
