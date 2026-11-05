'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { track } from '@/lib/analytics'
import { bookingDialogEvent, bookingEvent, type BookingDetail } from './openBooking'
import { PassBookingForm } from './PassBookingForm'
import { TableReservationForm } from './TableReservationForm'

export function BookingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const lastStepRef = useRef(1)
  const submittedRef = useRef(false)
  const [detail, setDetail] = useState<BookingDetail | null>(null)

  useEffect(() => {
    const open = (event: Event) => {
      const custom = event as CustomEvent<BookingDetail>
      triggerRef.current = document.activeElement
      submittedRef.current = false
      lastStepRef.current = 1
      setDetail(custom.detail)
      document.body.style.overflow = 'hidden'
      dialogRef.current?.showModal()
      window.dispatchEvent(new CustomEvent(bookingDialogEvent, { detail: { open: true } }))
      track('booking_open', { flow: custom.detail.flow, eventId: custom.detail.eventId, realm: custom.detail.realm })
    }
    window.addEventListener(bookingEvent, open)
    return () => window.removeEventListener(bookingEvent, open)
  }, [])

  const close = () => dialogRef.current?.close()

  const release = () => {
    document.body.style.overflow = ''
    window.dispatchEvent(new CustomEvent(bookingDialogEvent, { detail: { open: false } }))
    if (!submittedRef.current) {
      track('booking_abandon', { flow: detail?.flow, step: lastStepRef.current })
    }
    if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      className="notice-dialog"
      aria-label={detail?.flow === 'pass' ? 'Book a pass' : 'Reserve a table'}
      onClose={release}
      onCancel={release}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="relative p-8">
        <button
          className="icon-button absolute top-3 right-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-transparent text-cream transition hover:border-gold hover:text-gold"
          type="button"
          aria-label="Close booking dialog"
          onClick={close}
        >
          <X size={20} />
        </button>
        {detail ? (
          detail.flow === 'pass' ? (
            <PassBookingForm
              key={`pass-${detail.eventId ?? ''}`}
              presetEventId={detail.eventId}
              onStepChange={(step) => (lastStepRef.current = step)}
              onSubmitted={() => (submittedRef.current = true)}
            />
          ) : (
            <TableReservationForm
              key={`table-${detail.realm ?? ''}-${detail.date ?? ''}`}
              presetRealm={detail.realm}
              presetDate={detail.date}
              onStepChange={(step) => (lastStepRef.current = step)}
              onSubmitted={() => (submittedRef.current = true)}
            />
          )
        ) : null}
      </div>
    </dialog>
  )
}
