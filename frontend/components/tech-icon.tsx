import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa'
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGithubactions,
  SiJavascript,
  SiJsonwebtokens,
  SiMockserviceworker,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPostgresql,
  SiPrisma,
  SiPug,
  SiReact,
  SiReactquery,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiZod,
} from 'react-icons/si'
import type { Tech } from '@/lib/schemas/content'

type TechMeta = { label: string; Icon: IconType; color: string }

// Brand colors are content, not design tokens: they help recruiters spot a
// logo at a glance. Black-and-white logos (Next.js, Vercel, Express, Prisma)
// use currentColor, so they follow the text in both themes.
// Record<Tech, …> makes a missing entry a type error, not a runtime crash.
export const TECH_META: Record<Tech, TechMeta> = {
  react: { label: 'React', Icon: SiReact, color: '#61dafb' },
  next: { label: 'Next.js', Icon: SiNextdotjs, color: 'currentColor' },
  vue: { label: 'Vue', Icon: SiVuedotjs, color: '#2f9768' },
  nuxt: { label: 'Nuxt', Icon: SiNuxt, color: '#00a35c' },
  tailwind: { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#0ea5e9' },
  figma: { label: 'Figma', Icon: SiFigma, color: '#f24e1e' },
  javascript: { label: 'JavaScript', Icon: SiJavascript, color: '#d4b106' },
  typescript: { label: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  node: { label: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  express: { label: 'Express', Icon: SiExpress, color: 'currentColor' },
  jwt: { label: 'JWT', Icon: SiJsonwebtokens, color: '#d63aff' },
  pug: { label: 'Pug', Icon: SiPug, color: '#a86454' },
  mongodb: { label: 'MongoDB', Icon: SiMongodb, color: '#47a248' },
  postgres: { label: 'PostgreSQL', Icon: SiPostgresql, color: '#4169e1' },
  mongoose: { label: 'Mongoose', Icon: SiMongoose, color: '#e05252' },
  prisma: { label: 'Prisma', Icon: SiPrisma, color: 'currentColor' },
  aws: { label: 'AWS', Icon: FaAws, color: '#e47911' },
  terraform: { label: 'Terraform', Icon: SiTerraform, color: '#a47de8' },
  'github-actions': { label: 'GitHub Actions', Icon: SiGithubactions, color: '#2088ff' },
  docker: { label: 'Docker', Icon: SiDocker, color: '#2496ed' },
  vercel: { label: 'Vercel', Icon: SiVercel, color: 'currentColor' },
  firebase: { label: 'Firebase', Icon: SiFirebase, color: '#f5a00f' },
  zod: { label: 'Zod', Icon: SiZod, color: '#7aa0f0' },
  'react-query': { label: 'TanStack Query', Icon: SiReactquery, color: '#ff4154' },
  msw: { label: 'MSW', Icon: SiMockserviceworker, color: '#ff6a33' },
}
