import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'
import { z } from 'zod'
import { ulid } from 'ulid'
import { randomUUID } from 'crypto'

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const smClient = new SecretsManagerClient({})
const secretName = 'prod/turnstile'

let cachedSecretKey = null

async function getTurnstileSecretKey() {
  if (cachedSecretKey) {
    return cachedSecretKey
  }

  const response = await smClient.send(
    new GetSecretValueCommand({ SecretId: secretName }),
  )

  if (!response.SecretString) {
    throw new Error('SecretString is empty or not in text format')
  }

  const parsed = JSON.parse(response.SecretString)
  cachedSecretKey = parsed.secret_key
  return cachedSecretKey
}

const ContactFormSchema = z
  .object({
    companyName: z.string().trim().min(1).max(100),
    message: z.string().trim().min(1).max(999),
    email: z.string().check(z.trim(), z.email(), z.toLowerCase()).max(254),
    turnstileToken: z.string().min(1),
  })
  .strict()

const reply = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const handler = async (event) => {
  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return reply(400, { error: 'invalid json in request body' })
  }

  const parsed = ContactFormSchema.safeParse(body)
  if (!parsed.success) return reply(400, { error: 'Invalid input' })

  const { turnstileToken, ...messageData } = parsed.data

  try {
    const secretKey = await getTurnstileSecretKey()

    const cfResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: turnstileToken,
          idempotency_key: randomUUID(),
        }),
      },
    )

    const verificationResult = await cfResponse.json()

    if (!verificationResult.success) {
      return reply(403, {
        error: 'Turnstile verification failed',
      })
    }
  } catch (error) {
    console.error(error)
    return reply(500, { error: 'Security verification failed' })
  }

  try {
    await ddb.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: ulid(),
          ...messageData,
          createdAt: new Date().toISOString(),
        },
      }),
    )
  } catch (error) {
    console.error(error)
    return reply(500, { error: 'failed to save message' })
  }

  return reply(200, { ok: true, message: 'message sent' })
}
