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
} from 'react-icons/si'

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
}

const aliases = {
  postgres: 'postgresql',
  'github action': 'githubactions',
}

const getAlias = (stack) => {
  const alias = aliases[stack]
  if (alias) {
    return alias
  }
  return stack
}

const TechStack = ({ tech }) => {
  const alias = getAlias(tech)
  const Icon = icons[alias]
  const color = brandColor[alias]

  return (
    <div className="flex flex-col font-light px-8 pt-8 pb-4 items-center liquid-glass bg-white/10 backdrop-blur-xs mx-16">
      <Icon aria-hidden className={`${color}`} size={60} />
      <span className="font-bold text-2xl text-nowrap my-4">{tech}</span>
    </div>
  )
}
export default TechStack
