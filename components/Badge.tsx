import Image from 'next/image'

export interface BadgeData {
  name: string
  provider: string
  image: string
  verifyUrl: string
  issuedBy?: string
}

interface BadgeProps {
  badge: BadgeData
}

const Badge = ({ badge }: BadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-5 border border-neutral-800 bg-neutral-950 p-8 rounded-2xl">
      <Image
        src={badge.image}
        alt={`${badge.name} certification badge`}
        width={220}
        height={220}
        quality={100}
      />

      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="text-xl font-semibold text-neutral-50">{badge.name}</h3>
        <p className="text-sm text-neutral-400">Provided By {badge.provider}</p>
      </div>

      <a
        href={badge.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        Verify
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </a>
    </div>
  )
}
export default Badge
