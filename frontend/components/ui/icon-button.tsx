import { cn } from '@/lib/cn'

const classes =
  'grid size-11 shrink-0 place-items-center rounded-full border border-hairline-strong text-ink transition-colors duration-150 ease-out-expo hover:border-ink hover:bg-surface'

type IconButtonProps = React.ComponentProps<'button'> & { label: string }

export default function IconButton({
  label,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(classes, className)}
      {...props}
    >
      {children}
    </button>
  )
}

type IconLinkProps = React.ComponentProps<'a'> & { label: string }

export function IconLink({ label, className, children, ...props }: IconLinkProps) {
  return (
    <a aria-label={label} title={label} className={cn(classes, className)} {...props}>
      {children}
    </a>
  )
}
