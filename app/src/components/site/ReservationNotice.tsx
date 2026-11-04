'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { mapUrl } from '@/lib/content'
import { RitualMark } from './RitualMark'

const reservationEvent = 'sarabi:reservation-preview'

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
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  icon?: StaticImageData | boolean
  className?: string
}) {
  return (
    <button
      type="button"
      className={`${baseButton} ${buttonSizes[size]} ${variant === 'primary' ? primaryButton : secondaryButton} ${className}`}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(reservationEvent))}
    >
      {typeof icon === 'object' && <Image src={icon} alt="" width={15} height={15} />}
      {children}
      {icon !== false && <ArrowUpRight size={15} aria-hidden="true" />}
    </button>
  )
}

export function ReservationNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const open = () => {
      document.body.style.overflow = 'hidden'
      dialogRef.current?.showModal()
    }
    window.addEventListener(reservationEvent, open)
    return () => window.removeEventListener(reservationEvent, open)
  }, [])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      className="notice-dialog"
      aria-labelledby="reservation-title"
      onClose={() => {
        document.body.style.overflow = ''
      }}
      onCancel={() => {
        document.body.style.overflow = ''
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="relative p-8">
        <button
          className="icon-button absolute top-3 right-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-transparent text-cream transition hover:border-gold hover:text-gold"
          type="button"
          aria-label="Close reservation notice"
          onClick={close}
        >
          <X size={20} />
        </button>
        <RitualMark className="mb-6 w-[4.5rem] text-gold" />
        <span className="type-eyebrow text-gold">Coming in the next release</span>
        <h2 id="reservation-title" className="mt-3 mr-8 mb-4 max-w-[24rem] font-display text-[27.2px] leading-[1.15] font-bold">
          Your table is waiting. Online booking is taking shape.
        </h2>
        <p className="text-[13.6px] leading-[1.6] font-light text-cream/66">
          Table reservations, automatic assignment and Razorpay prepayment are planned for the next development iteration. This landing-page preview does not accept bookings or payments.
        </p>
        <Link className={`${baseButton} ${buttonSizes.md} ${primaryButton} mt-6`} href="/#reservations" onClick={close}>
          Plan your visit
          <ArrowUpRight size={15} />
        </Link>
        <a
          className="mt-4 flex min-h-11 items-center gap-2 py-[0.65rem] text-[12.5px] font-bold tracking-[1.75px] text-gold uppercase no-underline"
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Find Sarabi in Vagator
          <ArrowUpRight size={15} />
        </a>
        <p className="mt-6 border-t border-line pt-4 text-[10.9px] leading-[1.6] tracking-[1.5px] text-cream/35">
          No payment or personal information is collected in this iteration.
        </p>
      </div>
    </dialog>
  )
}
