import { cn } from '@/lib/cn'

/** A muted, dot-separated list of technologies. */
export default function TechList({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  return (
    <ul
      aria-label="Built with"
      className={cn('flex flex-wrap gap-x-2 gap-y-1 text-body-sm text-muted', className)}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-faint">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}
