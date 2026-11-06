'use client'

import { openBooking } from '@/components/booking/openBooking'

export function RealmReserveButton({
  realm,
  label,
  className = '',
}: {
  realm: string
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => openBooking({ flow: 'table', realm })}
      className={`flex min-h-[46px] cursor-pointer items-center justify-center rounded-full bg-gold-gradient px-[26px] py-[12px] font-display text-[11.5px] font-bold tracking-[1.75px] text-cocoa uppercase transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
    </button>
  )
}
