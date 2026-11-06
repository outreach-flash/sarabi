import type { ReactNode } from 'react'

export function InfoCard({
  title,
  mark,
  children,
}: {
  title: string
  mark: string
  children: ReactNode
}) {
  return (
    <article className="grid grid-cols-[36px_1fr] gap-[18px] border-t border-line py-[22px]">
      <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full border border-gold/30 font-display text-[8px] font-semibold text-gold">
        {mark}
      </span>
      <div>
        <h3 className="mt-[3px] mb-[8px] font-display text-[11px] leading-[1.2] font-bold tracking-[1.6px] text-gold uppercase">
          {title}
        </h3>
        {children}
      </div>
    </article>
  )
}
