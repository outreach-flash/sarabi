import type { ReactNode } from 'react'

import { PageEyebrow } from './PageEyebrow'

export function CenterCta({
  eyebrow,
  title,
  copy,
  children,
  minH = 'min-h-[380px] sm:min-h-[450px]',
  className = '',
}: {
  eyebrow: ReactNode
  title: ReactNode
  copy: ReactNode
  children: ReactNode
  minH?: string
  className?: string
}) {
  return (
    <section className={`flex ${minH} flex-col items-center justify-center px-4 pt-[70px] pb-[110px] text-center sm:px-[5vw] ${className}`}>
      <div className="flex flex-col items-center" data-reveal>
        <PageEyebrow centered>{eyebrow}</PageEyebrow>
        <h2 className="type-page-title mt-[18px] mb-[14px] flex flex-col text-[33px] leading-[1.12] sm:text-[38px] wide:text-[clamp(38px,4vw,56px)] [&_em]:em-accent">
          {title}
        </h2>
        <p className="type-page-body max-w-[550px]">{copy}</p>
        <div className="mt-[25px] flex flex-wrap justify-center gap-[12px]">{children}</div>
      </div>
    </section>
  )
}
