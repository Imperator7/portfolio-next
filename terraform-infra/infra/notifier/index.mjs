import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({
  region: 'ap-southeast-1',
})
const SENDER_EMAIL = process.env.SENDER_EMAIL
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL

export async function handler(event) {
  for (const record of event.Records) {
    if (record.eventName !== 'INSERT' || !record.dynamodb?.NewImage) {
      continue
    }

    const newImage = record.dynamodb.NewImage
    const name = newImage.companyName?.S || 'Anonymous'
    const email = newImage.email?.S || 'No email provided'
    const message = newImage.message?.S || '(Empty message)'

    const command = new SendEmailCommand({
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      Message: {
        Subject: {
          Data: `[Portfolio Contact] New message from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `From: ${name} (${email})\n\nMessage:\n${message}`,
            Charset: 'UTF-8',
          },
        },
      },
    })

    try {
      await ses.send(command)
      console.log(`Notification sent`)
    } catch (error) {
      console.error('SES failure:', error)
      throw error
    }
  }
}
