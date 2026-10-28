import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { ButtonLink } from '@/components/ui/button'
import StatusPill from '@/components/ui/status-pill'
import { getProject, projects } from '@/data/projects'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project ? { title: project.name, description: project.tagline } : {}
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const facts = [
    { label: 'Type', value: project.type === 'figma-to-code' ? 'Figma to code' : 'Built from scratch' },
    { label: 'Status', value: project.stage === 'completed' ? 'Completed' : 'In development' },
    { label: 'Stack', value: project.stack.join(', ') },
  ]

  return (
    <main id="main" className="mx-auto max-w-content px-4 pt-24 pb-section sm:px-8 sm:pt-28 lg:px-12">
      <Link
        href="/#work"
        className="group inline-flex min-h-11 items-center gap-1.5 text-button text-muted hover:text-ink"
      >
        <ArrowLeft
          aria-hidden
          className="size-4 transition-transform duration-150 ease-out-expo group-hover:-translate-x-0.5"
        />
        All work
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col items-start gap-4 lg:col-span-8">
          {project.stage === 'in-development' && <StatusPill live>In development</StatusPill>}
          <h1 className="text-heading-1">{project.name}</h1>
          <p className="max-w-prose text-body-lg text-muted">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {project.demoUrl && (
            <ButtonLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live demo
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )}
          <ButtonLink
            variant="outline"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden className="size-4" />
            Code
            <span className="sr-only">(opens in a new tab)</span>
          </ButtonLink>
        </div>
      </header>

      <div className="relative mt-10 aspect-16/9 overflow-hidden rounded-md bg-sunken ring-1 ring-hairline">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          priority
          sizes="(min-width: 1216px) 1216px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <dl className="flex flex-col lg:col-span-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-hairline py-4">
              <dt className="text-body-sm text-faint">{fact.label}</dt>
              <dd className="mt-1 text-body">{fact.value}</dd>
            </div>
          ))}
          {project.extraLinks.length > 0 && (
            <div className="border-t border-hairline py-4">
              <dt className="text-body-sm text-faint">Also try</dt>
              {project.extraLinks.map((link) => (
                <dd key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-body font-medium text-accent-ink hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              ))}
            </div>
          )}
        </dl>

        <div className="flex max-w-prose flex-col gap-10 lg:col-span-7 lg:col-start-6">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title" className="mb-3 text-heading-3">
              Overview
            </h2>
            <p className="text-body-lg text-muted">{project.summary}</p>
          </section>

          <section aria-labelledby="highlights-title">
            <h2 id="highlights-title" className="mb-4 text-heading-3">
              What I built
            </h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-body">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {project.learnings.length > 0 && (
            <section aria-labelledby="learnings-title">
              <h2 id="learnings-title" className="mb-4 text-heading-3">
                What I learned
              </h2>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-body marker:text-faint">
                {project.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <nav aria-label="Next project" className="mt-section border-t border-hairline pt-8">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <span className="text-body-sm text-faint">Next project</span>
          <span className="inline-flex items-center gap-3 font-display text-heading-2 group-hover:text-accent-ink">
            {next.name}
            <ArrowRight
              aria-hidden
              className="size-6 transition-transform duration-150 ease-out-expo group-hover:translate-x-1"
            />
          </span>
        </Link>
      </nav>
    </main>
  )
}
