import type { ReactNode } from 'react'

export function PageEyebrow({
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
      className={`flex items-center gap-[13px] text-[11px] leading-[1.7] font-light tracking-[3px] whitespace-nowrap uppercase text-cream/52 ${
        centered ? 'justify-center' : ''
      } ${className}`}
    >
      {!centered && <span className="h-px w-[32px] flex-none bg-muted" aria-hidden="true" />}
      {children}
    </p>
  )
}
