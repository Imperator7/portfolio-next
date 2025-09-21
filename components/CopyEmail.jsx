'use client'

import { useState } from 'react'

const CopyEmail = () => {
  const [copied, setCopied] = useState(false)

  const email = 'rungrojr.ball@gmail.com'

  const handleOnClick = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  return (
    <span>
      <span
        className={[
          'underline hover:cursor-pointer',
          copied ? 'text-green-400 underline' : '',
        ].join(' ')}
      >
        <a href={`mailto:${email}`}>{email}</a>
      </span>
      <button
        className="btn font-bold bg-green-500 rounded-xl px-4 mx-4 cursor-pointer"
        onClick={handleOnClick}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </span>
  )
}
export default CopyEmail
