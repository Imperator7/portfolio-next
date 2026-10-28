import {
  ContactErrorSchema,
  ContactSuccessSchema,
  type ContactPayload,
} from '@/lib/schemas/contact'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.rungroj.dev'

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function sendMessage(payload: ContactPayload) {
  let res: Response
  try {
    res = await fetch(`${API_URL}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiError("Couldn't reach the server. Check your connection and try again.", 0)
  }

  const body: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    // The Lambda answers errors as { error }, not { message }. A 403 means
    // Cloudflare rejected the Turnstile token.
    const parsed = ContactErrorSchema.safeParse(body)
    const message =
      res.status === 429
        ? 'Too many messages right now. Please try again in a minute.'
        : res.status === 403
          ? "The security check didn't pass. Please wait for it to finish and send again."
          : res.status === 400 && parsed.success
            ? 'Some details look invalid. Please check the form and try again.'
            : 'Something went wrong sending your message. Please try again.'
    throw new ApiError(message, res.status)
  }

  const parsed = ContactSuccessSchema.safeParse(body)
  if (!parsed.success) {
    throw new ApiError('Unexpected response from the server.', res.status)
  }
  return parsed.data
}
