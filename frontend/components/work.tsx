import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Highlights from '@/components/highlights'
import ProjectCarousel from '@/components/project-carousel'
import Section from '@/components/ui/section'
import StatusPill from '@/components/ui/status-pill'
import TechList from '@/components/ui/tech-list'
import type { Project } from '@/lib/schemas/content'

/** One mini project as a card in the rotating deck: screenshot on top. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md bg-surface ring-1 ring-hairline-strong shadow-[0_24px_60px_-28px_rgb(0_0_0/0.6)]">
      {/* Screenshots range from 1.7:1 to 2.6:1 (Note easy and Task
          management are short strips), so each is shown whole rather than
          cropped: contained in a 2:1 frame over a blurred copy of itself,
          which fills any spare space with the app's own colors. */}
      <div className="relative aspect-2/1 overflow-hidden border-b border-hairline bg-sunken">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          className="scale-110 object-cover opacity-70 blur-2xl"
        />
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          className="object-contain p-3 drop-shadow-[0_8px_20px_rgb(0_0_0/0.25)] sm:p-4"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-3 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-heading-3">{project.name}</h4>
          {project.stage === 'in-development' && <StatusPill live>In development</StatusPill>}
          {project.type === 'figma-to-code' && <StatusPill>Figma to code</StatusPill>}
        </div>
        <p className="max-w-prose text-body text-muted">{project.tagline}</p>
        <TechList items={project.stack} />
        <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-1 text-button">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-accent-ink underline decoration-hairline-strong underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current"
            >
              Live demo
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">of {project.name} (opens in a new tab)</span>
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 hover:underline"
          >
            <FaGithub aria-hidden className="size-4" />
            Code
            <span className="sr-only">for {project.name} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  )
}

type WorkProps = { featured: Project[]; others: Project[] }

/** Right below the hero: the featured projects first, then everything else. */
export default function Work({ featured, others }: WorkProps) {
  return (
    <Section
      id="work"
      // Non-breaking "I build": phones wrap it "How I build / projects"
      // instead of stranding "How I" on a line of its own.
      title={'How I build projects'}
      intro="Two apps live on AWS, built in Terraform and deployed by GitHub Actions, then what I built on the way here."
    >
      <div className="flex flex-col gap-8 lg:gap-12">
        {featured.map((project) => (
          <Highlights key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-16 lg:mt-24">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-heading-2">Mini learning projects</h3>
          <p className="text-body text-muted tabular-nums">
            {others.length} projects
          </p>
        </div>
        <p className="mt-2 max-w-prose text-body text-muted">
          A group ordering app in progress, practice apps with real-world patterns, and a
          Figma-to-code build.
        </p>
        <ProjectCarousel
          names={others.map((project) => project.name)}
          slides={others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        />
      </div>
    </Section>
  )
}
