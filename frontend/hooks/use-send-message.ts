'use client'

import { useMutation } from '@tanstack/react-query'
import { sendMessage } from '@/lib/api/contact'
import { contactKeys } from '@/lib/query-keys'

// The send button's animation (stretch, launch, spinner) needs about this
// long to play, so a fast response still shows the spinner before the check.
const MIN_SEND_MS = 1400

export function useSendMessage() {
  return useMutation({
    mutationKey: contactKeys.send(),
    mutationFn: async (payload: Parameters<typeof sendMessage>[0]) => {
      const [result] = await Promise.all([
        sendMessage(payload),
        new Promise((resolve) => setTimeout(resolve, MIN_SEND_MS)),
      ])
      return result
    },
  })
}
