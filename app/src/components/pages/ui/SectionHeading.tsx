import type { ReactNode } from 'react'

import { PageEyebrow } from './PageEyebrow'

export function SectionHeading({
  eyebrow,
  title,
  copy,
  className = '',
}: {
  eyebrow: ReactNode
  title: ReactNode
  copy?: ReactNode
  className?: string
}) {
  return (
    <div className={`sm:flex sm:items-end sm:justify-between sm:gap-[50px] ${className}`} data-reveal>
      <div>
        <PageEyebrow>{eyebrow}</PageEyebrow>
        <h2 className="type-page-title mt-[10px] text-[33px] leading-[1.12] sm:text-[38px] wide:text-[clamp(38px,4vw,56px)] [&_em]:em-accent">
          {title}
        </h2>
      </div>
      {copy ? <p className="type-page-body mt-[18px] max-w-[460px] sm:mt-0">{copy}</p> : null}
    </div>
  )
}
