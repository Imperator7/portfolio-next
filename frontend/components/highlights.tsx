import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe,
  MousePointerClick,
  ShieldCheck,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { SERVICE_META, ServiceIcon } from '@/components/service-icon'
import StatusPill from '@/components/ui/status-pill'
import { cn } from '@/lib/cn'
import type { Badge, Project, Service } from '@/lib/schemas/content'

/** One box in the diagram: the service's icon, its name and its job. */
function Node({
  service,
  role,
  badges = [],
}: {
  service: Service
  role: string
  badges?: Badge[]
}) {
  return (
    <div className="flow-node flex flex-1 items-center gap-3 rounded-sm border border-hairline bg-canvas p-3">
      <ServiceIcon service={service} />
      <div className="min-w-0">
        <p className="text-body-sm font-semibold">
          {SERVICE_META[service].label}
        </p>
        <p className="text-label text-muted">{role}</p>
        {/* Security and setup details: certificates, OAC, Block Public
            Access, remote state. */}
        {badges.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface py-0.5 pr-2.5 pl-1 text-label font-medium"
              >
                {badge.service ? (
                  <ServiceIcon
                    service={badge.service}
                    className="size-4 rounded-[3px]"
                  />
                ) : (
                  <ShieldCheck
                    aria-hidden
                    className="size-4 shrink-0 text-success"
                  />
                )}
                {badge.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Connector({ step = 0 }: { step?: number }) {
  return (
    <span
      aria-hidden
      className="flow-arrow grid shrink-0 place-items-center text-faint"
      style={{ '--step': step } as React.CSSProperties}
    >
      <ArrowDown className="size-4 lg:hidden" />
      <ArrowRight className="hidden size-4 lg:block" />
    </span>
  )
}

/**
 * A detail block that opens and closes. Native <details>, so it works with
 * the keyboard and without JS; globals.css animates the height. While closed,
 * `preview` gives a one-line taste of what's inside.
 */
function DetailCard({
  title,
  preview,
  defaultOpen = false,
  children,
}: {
  title: string
  preview: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <details
      open={defaultOpen}
      data-spotlight
      className="disclosure group rounded-md border border-hairline bg-canvas/40"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 rounded-md p-5 max-sm:p-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <h4 className="text-heading-3">{title}</h4>
          {/* The preview folds away as the card opens. */}
          <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity,margin] duration-500 ease-out-expo group-open:mt-0 group-open:grid-rows-[0fr] group-open:opacity-0 mt-3">
            <div className="overflow-hidden">{preview}</div>
          </div>
        </div>
        <span
          aria-hidden
          className="disclosure-hint grid size-10 shrink-0 place-items-center rounded-full border border-hairline-strong text-muted transition-[rotate,border-color,color] duration-500 ease-out-expo group-hover:border-ink group-hover:text-ink group-open:rotate-180"
        >
          <ChevronDown className="size-5" />
        </span>
      </summary>
      <div className="px-5 pb-6 max-sm:px-3.5 max-sm:pb-4 sm:px-6">{children}</div>
    </details>
  )
}

/** The featured project and how it's built; leads the Projects section. */
export default function Highlights({ project }: { project: Project }) {
  // Every service in the diagram, once each, for the closed card's preview.
  const services = [
    ...new Set<Service>([
      ...(project.domain ? [project.domain.service] : []),
      ...project.architecture.flatMap((lane) =>
        lane.steps.map((step) => step.service),
      ),
      ...project.foundations.map((item) => item.service),
      ...[...project.architecture.flatMap((lane) => lane.steps), ...project.foundations]
        .flatMap((node) => node.badges)
        .flatMap((badge) => (badge.service ? [badge.service] : [])),
    ]),
  ]

  return (
    <article
      aria-labelledby="hero-project-title"
      className="overflow-hidden rounded-md border border-hairline bg-surface"
    >
      <div className="grid lg:grid-cols-12">
        <div className="flex flex-col items-start gap-4 p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <StatusPill live>Live</StatusPill>
          <h3 id="hero-project-title" className="text-heading-1">
            {project.name}
          </h3>
          <p className="text-body-lg text-muted">{project.tagline}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-2 text-button">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-accent-ink underline decoration-hairline-strong underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current"
            >
              Live site
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 hover:underline"
            >
              <FaGithub aria-hidden className="size-4" />
              Code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div
          data-spotlight
          className="group/shot relative aspect-16/10 overflow-hidden border-t border-hairline bg-sunken lg:col-span-7 lg:aspect-auto lg:border-t-0 lg:border-l"
        >
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-top transition-[scale] duration-1000 ease-out-expo group-data-inview/shot:scale-[1.04]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-hairline p-3 sm:p-6 lg:p-8">
        {project.architecture.length > 0 && (
          <DetailCard
            title="How it works"
            defaultOpen={false}
            preview={
              <div className="flex flex-wrap items-center gap-3">
                <ul aria-label="Services" className="flex flex-wrap gap-1.5">
                  {services.map((service) => (
                    <li key={service}>
                      <ServiceIcon
                        service={service}
                        className="size-7 rounded-[5px]"
                      />
                      <span className="sr-only">
                        {SERVICE_META[service].label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-body-sm text-muted">
                  {project.architecture.length} request paths ·{' '}
                  {services.length} services
                </p>
              </div>
            }
          >
            <div className="flex flex-col gap-8">
              <div>
                {project.domain && (
                  <div>
                    <p className="mb-3 text-body-sm font-medium text-muted">
                      Domain
                    </p>
                    <div className="flex lg:max-w-md">
                      <Node
                        service={project.domain.service}
                        role={project.domain.role}
                      />
                    </div>
                  </div>
                )}
                {/* Each lane branches off the domain like a tree: a line down
                  the left, a tick into each lane's hostname. */}
                <div className={cn(project.domain && 'ml-5 max-sm:ml-3 lg:ml-8')}>
                  {project.architecture.map((lane, index) => {
                    const last = index === project.architecture.length - 1
                    return (
                      // On touch screens, a lane in the middle of the screen
                      // plays its request: arrows and boxes light up in order.
                      <div
                        key={lane.label}
                        data-spotlight
                        className={cn(
                          'relative',
                          project.domain && 'pt-8 pl-5 max-sm:pl-3 lg:pl-8',
                        )}
                      >
                        {project.domain && (
                          <>
                            <span
                              aria-hidden
                              className={cn(
                                'absolute top-0 left-0 w-px bg-hairline-strong',
                                last ? 'h-[2.75rem]' : 'h-full',
                              )}
                            />
                            <span
                              aria-hidden
                              className="absolute top-[2.75rem] left-0 h-px w-3.5 bg-hairline-strong max-sm:w-2 lg:w-6"
                            />
                          </>
                        )}
                        <p className="mb-3 flex flex-wrap items-center gap-2 text-body-sm font-medium text-muted">
                          <span className="rounded-full border border-hairline-strong bg-canvas px-2.5 py-0.5 font-mono text-label text-ink">
                            {lane.host}
                          </span>
                          {lane.label}
                        </p>
                        <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
                          <li className="flex items-center gap-2 rounded-sm px-1 py-2 text-body-sm font-medium text-muted lg:w-32 lg:shrink-0">
                            {lane.from === 'Browser' ? (
                              <Globe aria-hidden className="size-5 shrink-0" />
                            ) : (
                              <MousePointerClick
                                aria-hidden
                                className="size-5 shrink-0"
                              />
                            )}
                            {lane.from}
                          </li>
                          {lane.steps.map((step, stepIndex) => (
                            <Fragment key={step.service}>
                              <Connector step={stepIndex * 2} />
                              <li
                                className="flex flex-1"
                                style={{ '--step': stepIndex * 2 + 1 } as React.CSSProperties}
                              >
                                <Node
                                  service={step.service}
                                  role={step.role}
                                  badges={step.badges}
                                />
                              </li>
                            </Fragment>
                          ))}
                        </ol>
                      </div>
                    )
                  })}
                </div>
              </div>

              {project.foundations.length > 0 && (
                <div>
                  <p className="mb-3 text-body-sm font-medium text-muted">
                    Behind it all
                  </p>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {project.foundations.map((item) => (
                      <li key={item.service} className="flex">
                        <Node service={item.service} role={item.role} badges={item.badges} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DetailCard>
        )}

        {project.builtWith.length > 0 && (
          <DetailCard
            title="Built with"
            preview={
              <p className="text-body-sm text-muted">
                {project.builtWith.map((group) => group.group).join(' · ')}
              </p>
            }
          >
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.builtWith.map((group) => (
                <div key={group.group}>
                  <dt className="text-body-sm font-medium text-muted">
                    {group.group}
                  </dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-sunken px-3 py-1 text-body-sm font-medium"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </DetailCard>
        )}
      </div>
    </article>
  )
}
