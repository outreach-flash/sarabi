import type { ReactNode } from 'react'

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`type-eyebrow mb-[22px] flex items-center gap-[14px] text-muted ${className}`}>
      <span className="h-px w-[35px] flex-none bg-muted" />
      {children}
    </p>
  )
}
