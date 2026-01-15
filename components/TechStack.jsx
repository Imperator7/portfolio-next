import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiPug,
  SiMongodb,
  SiPostgresql,
  SiMongoose,
  SiPrisma,
  SiGithubactions,
  SiDocker,
  SiZod,
  SiTailwindcss,
  SiFigma,
  SiReactquery,
  SiMockserviceworker,
  SiVercel,
  SiVuedotjs,
  SiNuxtdotjs,
} from 'react-icons/si'
import { IoLogoFirebase } from 'react-icons/io5'

const icons = {
  react: SiReact,
  next: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  node: SiNodedotjs,
  express: SiExpress,
  jwt: SiJsonwebtokens,
  pug: SiPug,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mongoose: SiMongoose,
  prisma: SiPrisma,
  githubactions: SiGithubactions,
  docker: SiDocker,
  zod: SiZod,
  tailwind: SiTailwindcss,
  figma: SiFigma,
  'react query': SiReactquery,
  msw: SiMockserviceworker,
  vue: SiVuedotjs,
  nuxt: SiNuxtdotjs,
  vercel: SiVercel,
  firebase: IoLogoFirebase,
}

const brandColor = {
  react: 'text-cyan-400',
  next: 'text-white',
  javascript: 'text-yellow-400',
  typescript: 'text-blue-500',
  node: 'text-green-500',
  express: 'text-gray-300',
  jwt: 'text-white',
  pug: 'text-amber-900',
  mongodb: 'text-emerald-500',
  postgresql: 'text-sky-500',
  mongoose: 'text-red-800',
  prisma: 'text-slate-300',
  githubactions: 'text-blue-500',
  docker: 'text-blue-500',
  zod: 'text-sky-800',
  tailwind: 'text-cyan-400',
  figma: 'text-white',
  'react query': 'text-rose-600',
  msw: 'text-orange-600',
  vue: 'text-emerald-600',
  nuxt: 'text-green-400',
  vercel: 'text-black',
  firebase: 'text-amber-400',
}

const aliases = {
  postgres: 'postgresql',
  'github action': 'githubactions',
}

const getAlias = (stack) => aliases[stack] || stack

const TechStack = ({ tech }) => {
  const alias = getAlias(tech)
  const Icon = icons[alias]
  const color = brandColor[alias]

  return (
    <li className="flex flex-col px-8 pt-8 pb-4 items-center liquid-glass bg-white/20 backdrop-blur-xs ">
      <Icon aria-hidden className={`${color}`} size={60} />
      <span className="font-semibold text-2xl text-nowrap my-4 text-white">
        {tech[0].toUpperCase() + tech.slice(1)}
      </span>
    </li>
  )
}
export default TechStack
