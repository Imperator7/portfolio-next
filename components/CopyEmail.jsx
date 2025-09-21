'use client'

import { useState } from 'react'

const CopyEmail = () => {
  const [clicked, setClicked] = useState(false)

  const email = 'rungrojr.ball@gmail.com'

  const handleOnClick = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setClicked(true)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        setClicked(true)
      } finally {
        document.body.removeChild(ta)
      }
    } finally {
      setTimeout(() => {
        setClicked(false)
      }, 1000)
    }
  }
  return (
    <span
      className={[
        'hover:underline hover:cursor-pointer',
        clicked ? 'text-green-400 underline' : '',
      ].join(' ')}
      onClick={handleOnClick}
    >
      {email}
    </span>
  )
}
export default CopyEmail
