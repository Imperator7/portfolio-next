'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import IconButton from '@/components/ui/icon-button'

// Local UI state for one component: useState, not zustand.
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked; the mailto link next to it still works.
    }
  }

  return (
    <>
      <IconButton label={copied ? 'Email copied' : 'Copy email'} onClick={copy}>
        {copied ? (
          <Check aria-hidden className="size-4 text-success" />
        ) : (
          <Copy aria-hidden className="size-4" />
        )}
      </IconButton>
      <span role="status" className="sr-only">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </>
  )
}
