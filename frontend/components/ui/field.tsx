import type { ComponentProps, ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/cn'

/*
 * Outlined text fields with a floating label (the Material "outlined" look),
 * in plain Tailwind. The label rests inside the box and floats into the top
 * border on focus or once there's a value. It's driven by CSS alone:
 * `placeholder=" "` makes `:placeholder-shown` mean "empty", so it works with
 * react-hook-form's uncontrolled `register()`, and with browser autofill.
 *
 * The label's background cuts the border like a notch, so it must match the
 * surface the field sits on: `bg-surface` by default, or pass `notchClassName`.
 */

type BaseProps = {
  id: string
  label: string
  error?: string
  /** Background of the label notch; match the surface behind the field. */
  notchClassName?: string
}

function controlClasses(error: string | undefined, className?: string) {
  return cn(
    'peer block w-full rounded-sm border bg-transparent px-4 py-4 text-body leading-6 text-ink outline-none placeholder:text-transparent',
    'transition-[border-color,box-shadow] duration-200 ease-out-expo',
    // Focus thickens the outline to 2px without shifting the layout.
    error
      ? 'border-danger focus:shadow-[inset_0_0_0_1px_var(--color-danger)]'
      : 'border-hairline-strong hover:border-faint focus:border-accent focus:shadow-[inset_0_0_0_1px_var(--color-accent)]',
    className,
  )
}

function Shell({
  id,
  label,
  error,
  notchClassName = 'bg-surface',
  children,
}: BaseProps & { children: ReactNode }) {
  const floated =
    'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-75 peer-autofill:top-0 peer-autofill:-translate-y-1/2 peer-autofill:scale-75'

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute top-4 left-3 max-w-[calc(100%-1.5rem)] origin-left truncate px-1 text-body leading-6',
            'transition-[top,translate,scale,color] duration-200 ease-out-expo',
            floated,
            notchClassName,
            error ? 'text-danger' : 'text-muted peer-focus:text-accent-ink',
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 px-1 text-body-sm text-danger">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

type TextFieldProps = BaseProps & Omit<ComponentProps<'input'>, 'id' | 'placeholder'>

export function TextField({ id, label, error, notchClassName, className, ...props }: TextFieldProps) {
  return (
    <Shell id={id} label={label} error={error} notchClassName={notchClassName}>
      <input
        id={id}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses(error, className)}
        {...props}
      />
    </Shell>
  )
}

type TextAreaFieldProps = BaseProps & Omit<ComponentProps<'textarea'>, 'id' | 'placeholder'>

export function TextAreaField({
  id,
  label,
  error,
  notchClassName,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <Shell id={id} label={label} error={error} notchClassName={notchClassName}>
      <textarea
        id={id}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses(error, cn('resize-y', className))}
        {...props}
      />
    </Shell>
  )
}
