// icons/ExternalLinkIcon.jsx
import React from 'react'

export default function ExternalLinkIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* arrow leaving a box */}
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
      <path d="M5 5h7v2H6v11h11v-6h2v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    </svg>
  )
}
