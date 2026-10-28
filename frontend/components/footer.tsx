import { ArrowUp, Mail } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { IconLink } from '@/components/ui/icon-button'
import type { Profile } from '@/lib/schemas/content'

export default function Footer({ profile }: { profile: Profile }) {
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="text-body-sm text-faint">
          © {new Date().getFullYear()} {fullName} · Built with Next.js, deployed on AWS
        </p>
        <div className="flex gap-2">
          <IconLink label="Email" href={`mailto:${profile.email}`}>
            <Mail aria-hidden className="size-4" />
          </IconLink>
          <IconLink
            label="GitHub (opens in a new tab)"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden className="size-4" />
          </IconLink>
          <IconLink label="Back to top" href="#top">
            <ArrowUp aria-hidden className="size-4" />
          </IconLink>
        </div>
      </div>
    </footer>
  )
}
