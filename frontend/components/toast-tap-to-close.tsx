'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

/**
 * A tap or click anywhere on a toast closes it (Sonner only offers the
 * small × and a swipe). Buttons inside the toast keep their own job. The
 * site shows one toast at a time, so closing them all is closing this one.
 */
export default function ToastTapToClose() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('[data-sonner-toast]') || target.closest('button'))
        return
      toast.dismiss()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
