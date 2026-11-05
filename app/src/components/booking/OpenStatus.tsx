'use client'

import { useEffect, useState } from 'react'
import { getVenueStatus } from '@/lib/venue-hours'

/** Live venue open/closed line. Renders after mount so SSR and client markup match. */
export function OpenStatus({ prefix = 'Vagator, Goa' }: { prefix?: string }) {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLabel(getVenueStatus(new Date()).label)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      {prefix}
      {label ? ` — ${label}` : ''}
    </>
  )
}
