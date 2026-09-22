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
    <div className="flex flex-col gap-6 items-center border p-8 rounded-2xl">
      <Image
        src={badge.image}
        alt={`${badge.name} certification badge`}
        width={300}
        height={300}
        quality={100}
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-semibold">{badge.name}</h3>
        <p className="text-sm font-light text-neutral-300">
          Provided By {badge.provider}
        </p>

        <a
          href={badge.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-4 py-2 text-sm font-medium rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
        >
          Verify
        </a>
      </div>
    </div>
  )
}
export default Badge
