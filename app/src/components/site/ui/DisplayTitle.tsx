import type { ReactNode } from 'react'

export function DisplayTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`type-display mb-6 text-cream [&_em]:text-gold-gradient ${className}`}>{children}</h2>
  )
}
