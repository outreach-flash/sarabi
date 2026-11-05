'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { openBooking } from '@/components/booking/openBooking'

const baseButton =
  'inline-flex cursor-pointer items-center justify-center gap-3 rounded-full font-display leading-[1.4] font-bold tracking-[1.75px] uppercase transition-[transform,box-shadow] duration-250'
const buttonSizes = {
  md: 'min-h-[50px] px-[30px] py-[14px] text-[12.5px]',
  sm: 'min-h-[42px] gap-[12px] px-[23px] py-[11px] text-[10.7px] tracking-[1.39px]',
}
const primaryButton =
  'bg-gold-gradient glow-gold text-cocoa hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgb(253_216_167/0.38),0_12px_30px_rgb(0_0_0/0.5)]'
const secondaryButton =
  'border border-gold/35 bg-gold/[0.04] text-gold hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgb(253_216_167/0.38),0_12px_30px_rgb(0_0_0/0.5)]'

export function ReserveButton({
  children,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  flow = 'table',
  eventId,
  realm,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  icon?: StaticImageData | boolean
  className?: string
  flow?: 'table' | 'pass'
  eventId?: string
  realm?: string
}) {
  return (
    <button
      type="button"
      className={`${baseButton} ${buttonSizes[size]} ${variant === 'primary' ? primaryButton : secondaryButton} ${className}`}
      aria-haspopup="dialog"
      onClick={() => openBooking({ flow, eventId, realm })}
    >
      {typeof icon === 'object' && <Image src={icon} alt="" width={15} height={15} />}
      {children}
      {icon !== false && <ArrowUpRight size={15} aria-hidden="true" />}
    </button>
  )
}
