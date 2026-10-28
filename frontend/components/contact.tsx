import { Mail, Phone } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import ContactForm from '@/components/contact-form'
import CopyEmailButton from '@/components/copy-email-button'
import ResumeButton from '@/components/resume-button'
import Section from '@/components/ui/section'
import type { Profile } from '@/lib/schemas/content'

// Quiet grey icons; the underline appears on hover.
const rowClasses =
  'flex min-h-11 items-center gap-3 text-body-lg break-all decoration-hairline-strong underline-offset-6 hover:underline'

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <Section
      id="contact"
      title="Let’s connect"
      intro={profile.availability}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-3">
              <a href={`mailto:${profile.email}`} className={rowClasses}>
                <Mail aria-hidden className="size-5 shrink-0 text-muted" />
                {profile.email}
              </a>
              <CopyEmailButton email={profile.email} />
            </li>
            <li>
              <a href={`tel:${profile.phone.replaceAll('-', '')}`} className={rowClasses}>
                <Phone aria-hidden className="size-5 shrink-0 text-muted" />
                {profile.phone}
              </a>
            </li>
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClasses}
              >
                <FaGithub aria-hidden className="size-5 shrink-0 text-muted" />
                github.com/{profile.githubHandle}
              </a>
            </li>
          </ul>
          <div className="self-start">
            <ResumeButton href={profile.resumeUrl} tone="page" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
