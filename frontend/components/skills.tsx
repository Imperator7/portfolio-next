import { TECH_META } from '@/components/tech-icon'
import Section from '@/components/ui/section'
import { STACK_ROLES } from '@/data/stack'
import type { StackItem } from '@/lib/schemas/content'

/**
 * Every tool, grouped by where it sits in the stack. Phones get a compact
 * version (smaller icons and names, tighter rows) so the whole stack reads
 * at a glance on one screen.
 */
export default function Skills({ items }: { items: StackItem[] }) {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="What I use day to day, grouped by where it sits in the stack."
    >
      <dl className="border-b border-hairline">
        {STACK_ROLES.map(({ role, title }) => {
          const group = items.filter((item) => item.role === role)
          if (group.length === 0) return null
          return (
            <div
              key={role}
              className="grid gap-3 border-t border-hairline py-6 max-sm:gap-1.5 max-sm:py-2.5 md:grid-cols-12 md:gap-8"
            >
              <dt className="pt-1 text-body-sm text-faint max-sm:pt-0 max-sm:text-label md:col-span-3">{title}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-x-7 gap-y-3 max-sm:gap-x-4 max-sm:gap-y-1.5">
                  {group.map(({ tech }) => {
                    const { label, Icon, color } = TECH_META[tech]
                    return (
                      <li
                        key={tech}
                        className="flex items-center gap-2.5 font-display text-heading-3 max-sm:gap-1.5 max-sm:text-body-sm max-sm:font-medium"
                      >
                        <Icon aria-hidden className="size-6 shrink-0 max-sm:size-4" style={{ color }} />
                        {label}
                      </li>
                    )
                  })}
                </ul>
              </dd>
            </div>
          )
        })}
      </dl>
    </Section>
  )
}
