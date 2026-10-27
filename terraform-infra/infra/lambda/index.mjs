import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { z } from 'zod'
import { ulid } from 'ulid'

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const ContactFormSchema = z
  .object({
    companyName: z.string().trim().min(1).max(100),
    message: z.string().trim().min(1).max(999),
    email: z.string().trim().email().max(254),
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
    body = JSON.parse(event.body)
  } catch {
    return reply(400, { error: 'invalid json in request body' })
  }

  const parsed = ContactFormSchema.safeParse(body)
  if (!parsed.success) return reply(400, { error: 'Invalid input' })

  try {
    await ddb.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          id: ulid(),
          ...parsed.data,
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
