import { z } from 'zod'

// Mirrors the Lambda's schema behind POST https://api.rungroj.dev/message
// (terraform-infra/infra/lambda/index.mjs). Keep both in sync.
export const ContactSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, 'Tell me your name or company')
      .max(100, 'Keep it under 100 characters'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .max(254, 'That email is too long')
      .pipe(z.email('Enter a valid email address')),
    message: z
      .string()
      .trim()
      .min(1, "Message can't be empty")
      .max(999, 'Keep it under 1,000 characters'),
    company_hp: z.string().optional(),
    turnstileToken: z.string().min(1, 'Please complete the security check'),
  })
  .strict()

export type ContactInput = z.input<typeof ContactSchema>
export type ContactPayload = z.output<typeof ContactSchema>

export const ContactSuccessSchema = z.object({
  ok: z.literal(true),
  message: z.string(),
})

export const ContactErrorSchema = z.object({
  error: z.string(),
})
