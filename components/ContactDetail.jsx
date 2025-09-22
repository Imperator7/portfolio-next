'use client'

import { FaCopy } from 'react-icons/fa'
import MessageIcon from '@/components/icons/MessageIcon'
import { useState } from 'react'

const ContactDetail = () => {
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
    <div>
      <p>
        <span className="font-bold mr-2">Email: </span>
        <span
          className={[
            'group underline hover:cursor-pointer',
            copied ? 'text-green-400 underline' : '',
          ].join(' ')}
        >
          <a href={`mailto:${email}`}>{email}</a>
          <MessageIcon />
        </span>
        <button
          className="btn bg-green-700 mx-4 py-1 px-3 text-base inline-flex items-center gap-2"
          onClick={handleOnClick}
        >
          <span>{copied ? 'Copied!' : 'Copy'}</span>
          <FaCopy />
        </button>
      </p>
      <p>
        <b className="mr-2">Tel:</b> 095-528-4138
      </p>
    </div>
  )
}
export default ContactDetail
