import { ArrowRight, LoaderCircle } from 'lucide-react'
import SuccessCheck from '@/components/ui/success-check'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'on-photo'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full text-button whitespace-nowrap disabled:pointer-events-none disabled:opacity-60'

// Each variant (and the primary Button, which also animates its padding)
// sets its own transition, so they never fight over transition-property.
const colorTransition = 'transition-colors duration-150 ease-out-expo'

const variants: Record<Variant, string> = {
  // Horizontal padding is set by Button and ButtonLink (it depends on the disc).
  // A gentle silver sheen (accent fading to its hover shade) and a faint top
  // highlight so white fills don't read flat; only a small contact shadow.
  primary:
    'group h-12 bg-accent bg-linear-to-b from-accent to-accent-hover py-1.5 text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(0_0_0/0.25)] hover:-translate-y-0.5',
  outline: cn(
    colorTransition,
    'border border-hairline-strong px-5 py-3 text-ink hover:border-ink hover:bg-surface',
  ),
  'on-photo': cn(
    colorTransition,
    'glass border border-glass-line px-5 py-3 text-on-night hover:bg-on-night hover:text-night',
  ),
}

export const buttonClasses = (variant: Variant, className?: string) =>
  cn(base, variants[variant], className)

/** The soft-tinted disc with an arrow that leads a primary link. */
function ArrowDisc() {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full bg-on-accent/10 text-on-accent"
    >
      <ArrowRight className="size-4 transition-transform duration-150 ease-out-expo group-hover:translate-x-0.5" />
    </span>
  )
}

/**
 * The primary button's disc, which tells the whole send story:
 * idle, a softly tinted disc with an arrow; sending, the
 * disc grows to fill the whole button with the arrow riding its right edge,
 * the arrow flies off and a spinner takes its place; success, the fill turns
 * green and the check draws in. The icon slot sits at the disc's right end,
 * so it travels with the growth.
 */
function StatusDisc({ pending, success }: { pending?: boolean; success?: boolean }) {
  const active = pending || success
  return (
    <span
      aria-hidden
      className={cn(
        'absolute flex items-center justify-end overflow-hidden rounded-full',
        'transition-[width,top,bottom,left,background-color,color] duration-700 ease-out-expo',
        // Idle: a 36px disc inset 6px; busy: the button's full size.
        active ? 'top-0 bottom-0 left-0 w-full' : 'top-1.5 bottom-1.5 left-1.5 w-9',
        // A soft tint of the label color, not a solid dark disc: a light grey
        // circle on the white button that floods it while sending.
        success ? 'bg-success text-white' : 'bg-on-accent/10 text-on-accent',
      )}
    >
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center transition-[margin] duration-700 ease-out-expo *:col-start-1 *:row-start-1',
          // Keeps the icon 6px from the right edge once the fill is full size.
          active ? 'mr-1.5' : 'mr-0',
        )}
      >
        {success ? (
          <SuccessCheck />
        ) : pending ? (
          <>
            {/* Rides the stretch, then launches off the edge. */}
            <ArrowRight className="size-4 animate-launch motion-reduce:hidden" />
            <span className="animate-appear [animation-delay:600ms]">
              <LoaderCircle className="size-4 animate-spin" />
            </span>
          </>
        ) : (
          <ArrowRight className="size-4 transition-transform duration-150 ease-out-expo group-hover:translate-x-0.5" />
        )}
      </span>
    </span>
  )
}

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: Variant
  /** Primary only: stretches the disc and shows a spinner. */
  pending?: boolean
  /** Primary only: turns green with the animated check. */
  success?: boolean
}

export default function Button({
  variant = 'primary',
  pending,
  success,
  className,
  children,
  ...props
}: ButtonProps) {
  if (variant !== 'primary') {
    return (
      <button className={buttonClasses(variant, className)} {...props}>
        {children}
      </button>
    )
  }

  return (
    <button
      className={buttonClasses(
        variant,
        cn(
          // Room for the disc's icon (36px + 6px inset + 10px gap): on the
          // left while idle; while busy the icon rides to the right end of
          // the stretched pill, so the room moves there and the label slides
          // left with it. Same total padding, so only the label changes the width.
          'relative isolate transition-[background-color,padding,translate,box-shadow] duration-700 ease-out-expo',
          pending || success ? 'pr-13 pl-5' : 'pr-5 pl-13',
          // Busy states are disabled for clicks but shouldn't look faded.
          (pending || success) && 'disabled:opacity-100',
          success && 'bg-success! bg-none! hover:bg-success!',
          className,
        ),
      )}
      {...props}
    >
      <StatusDisc pending={pending} success={success} />
      {/* Above the disc, so the label stays readable when it stretches. */}
      <span
        className={cn(
          'relative z-10 transition-colors duration-500 ease-out-expo',
          success && 'text-white',
        )}
      >
        {children}
      </span>
    </button>
  )
}

type ButtonLinkProps = React.ComponentProps<'a'> & { variant?: Variant }

export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, cn(variant === 'primary' && cn(colorTransition, 'pr-5 pl-1.5'), className))} {...props}>
      {variant === 'primary' && <ArrowDisc />}
      {children}
    </a>
  )
}
