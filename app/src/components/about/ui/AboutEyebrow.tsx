import type { ReactNode } from 'react'

export function AboutEyebrow({
  children,
  centered = false,
  className = '',
}: {
  children: ReactNode
  centered?: boolean
  className?: string
}) {
  return (
    <p
      className={`flex items-center gap-[13px] text-[13.6px] font-light tracking-[3.94px] whitespace-nowrap uppercase text-cream/63 sm:text-[14px] sm:tracking-[4.1px] ${
        centered ? 'justify-center' : ''
      } ${className}`}
    >
      <span className="h-px w-[32px] flex-none bg-muted" aria-hidden="true" />
      {children}
    </p>
  )
}
