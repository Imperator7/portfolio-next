'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { toast } from 'sonner'
import Button from '@/components/ui/button'
import LocalTime from '@/components/local-time'
import ProgressAvatar from '@/components/progress-avatar'
import { TextAreaField, TextField } from '@/components/ui/field'
import MorphLabel from '@/components/ui/morph-label'
import { useSendMessage } from '@/hooks/use-send-message'
import { useTheme } from '@/lib/theme'
import {
  ContactSchema,
  type ContactInput,
  type ContactPayload,
} from '@/lib/schemas/contact'

const EMPTY: ContactInput = {
  companyName: '',
  email: '',
  message: '',
  company_hp: '',
  turnstileToken: '',
}

const FIELDS = [
  {
    name: 'companyName',
    label: 'Name / Company name',
    autoComplete: 'organization',
  },
  { name: 'email', label: 'Email', autoComplete: 'email', type: 'email' },
  { name: 'message', label: 'Message', multiline: true },
] as const

// Inlined at build time (static export). A missing key fails the build in
// next.config.ts rather than shipping a form that can never be sent.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

const BUTTON_LABELS = ['Send message', 'Sending…', 'Sent!'] as const

/**
 * 0–1 for one field: grows with the text up to `fullAt` characters. With a
 * `cap` below 1 the field stops at the cap until its own rule passes, then
 * jumps to full (an email is complete once it's a real address, however
 * short).
 */
function fieldProgress(
  name: keyof ContactInput,
  value: string,
  fullAt: number,
  cap = 1,
) {
  const length = value.trim().length
  if (!length) return 0
  const passes = ContactSchema.shape[name].safeParse(value).success
  if (cap < 1) return passes ? 1 : Math.min(length / fullAt, cap)
  return Math.min(length / fullAt, 1)
}

export default function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<ContactInput, unknown, ContactPayload>({
    resolver: zodResolver(ContactSchema),
    mode: 'onTouched',
    defaultValues: EMPTY,
  })

  const {
    mutate,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useSendMessage()

  const turnstileRef = useRef<TurnstileInstance>(null)
  // The security check matches the site's theme, not the device's.
  const theme = useTheme()

  // The button shows "Sent!" for a moment, then returns to its idle state.
  useEffect(() => {
    if (!isSuccess) return
    const timer = setTimeout(resetMutation, 3000)
    return () => clearTimeout(timer)
  }, [isSuccess, resetMutation])

  const onSubmit = (values: ContactPayload) => {
    if (values.company_hp && values.company_hp.trim() !== '') {
      reset(EMPTY)
      turnstileRef.current?.reset()
      return
    }

    // The honeypot never leaves the browser.
    const { companyName, email, message, turnstileToken } = values

    mutate({ companyName, email, message, turnstileToken }, {
      onSuccess: () => {
        reset(EMPTY)
        turnstileRef.current?.reset()
        toast.success('Message sent!', {
          description: `Thanks for reaching out. I'll reply to ${values.email} soon.`,
        })
      },
      onError: (error) => {
        setError('root.server', { message: error.message })
        toast.error('Message not sent', { description: error.message })
        setValue('turnstileToken', '')
        turnstileRef.current?.reset()
      },
    })
  }

  // How far along each field is, for the ring round the photo. Each arc
  // grows with what's typed and is full once the field would pass.
  const [companyName = '', email = '', message = ''] = useWatch({
    control,
    name: ['companyName', 'email', 'message'],
  })
  const progress = [
    fieldProgress('companyName', companyName, 3),
    fieldProgress('email', email, 12, 0.8),
    fieldProgress('message', message, 24),
  ] as const

  // An empty field isn't an error until Send has been pressed: leaving one
  // blank on the way through stays calm. Text that's wrong (a half-typed
  // email) still shows its error as soon as the field is left.
  const values = { companyName, email, message }
  const fieldError = (name: keyof typeof values) =>
    isSubmitted || values[name].trim() !== '' ? errors[name]?.message : undefined

  const serverError = errors.root?.server?.message
  const buttonLabel = isPending
    ? 'Sending…'
    : isSuccess
      ? 'Sent!'
      : 'Send message'

  // Ctrl/⌘ + Enter sends from any field, the shortcut chat apps use.
  const onKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      event.currentTarget.requestSubmit()
    }
  }

  return (
    <form
      noValidate
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      onKeyDown={onKeyDown}
      aria-labelledby="contact-form-title"
      // Built like a message being written: a recessed "to" strip naming who
      // reads it, then the fields. One outline is the whole elevation; it
      // firms up while a field has focus. (The fields' label notch matches
      // bg-surface.)
      className="group/msg flex flex-col overflow-hidden rounded-md bg-surface ring-1 ring-hairline-strong transition-[box-shadow] duration-300 ease-out-expo focus-within:ring-ink/45"
    >
      <div className="flex items-center gap-5 border-b border-hairline bg-sunken/60 px-6 py-5 sm:px-8">
        {/* One arc of the ring per field, filling green as it's written. */}
        <ProgressAvatar
          progress={progress}
          sent={isSuccess}
          className="size-16 sm:size-20"
        >
          <Image
            src="/picture/profile.png"
            alt=""
            fill
            sizes="80px"
            // The photo is wide; zoom in on the face.
            className="scale-[2.2] object-cover object-[100%_30%]"
            style={{ transformOrigin: '50% 30%' }}
          />
        </ProgressAvatar>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 id="contact-form-title" className="text-heading-3">
            Leave me a message
          </h3>
          <p className="text-body-sm text-muted">
            <span className="max-sm:hidden">To Rungroj · </span>I usually reply
            within a day
          </p>
        </div>
        {/* No room beside the reply line on phones. */}
        <LocalTime className="ml-auto shrink-0 max-sm:hidden" />
      </div>

      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          {FIELDS.map((field) => {
            const shared = {
              id: field.name,
              label: field.label,
              error: fieldError(field.name),
              ...register(field.name),
            }

            return 'multiline' in field ? (
              <TextAreaField key={field.name} rows={5} {...shared} />
            ) : (
              <TextField
                key={field.name}
                type={'type' in field ? field.type : 'text'}
                autoComplete={field.autoComplete}
                {...shared}
              />
            )
          })}
        </div>
        <div
          className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('company_hp')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Re-created on a theme change (Turnstile can't restyle a live
              widget); the new one verifies again and resends its token. */}
          <Turnstile
            key={theme}
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ theme }}
            onSuccess={(token) => {
              setValue('turnstileToken', token, { shouldValidate: true })
            }}
            onExpire={() => {
              setValue('turnstileToken', '', { shouldValidate: true })
            }}
            onError={() => {
              setValue('turnstileToken', '', { shouldValidate: true })
            }}
          />
          {isSubmitted && errors.turnstileToken && (
            <p role="alert" className="text-body-sm text-danger">
              {errors.turnstileToken.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-3">
          <Button
            type="submit"
            pending={isPending}
            success={isSuccess}
            disabled={isPending || isSuccess}
          >
            {/* The button eases to each label's width; the stretched disc
              follows it, since its width is a percentage of the button. */}
            <MorphLabel labels={BUTTON_LABELS} current={buttonLabel} />
          </Button>
          <p role="alert" className="text-body-sm text-danger empty:hidden">
            {serverError}
          </p>
        </div>
      </div>
    </form>
  )
}
