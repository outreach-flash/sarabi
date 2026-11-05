'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { events } from '@/lib/content'
import { track } from '@/lib/analytics'
import { BookingNotice } from './BookingNotice'
import { ErrorText, StepNav, StepShell, choiceCardClass, fieldClass, isValidIndianMobile } from './steps'

export const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function eventDisplayDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return `${dayShort[new Date(year, month - 1, day).getDay()]}, ${day} ${monthShort[month - 1]}`
}

export type PassBookingFormProps = {
  presetEventId?: string
  onStepChange?: (step: number) => void
  onSubmitted?: () => void
}

export function PassBookingForm({ presetEventId, onStepChange, onSubmitted }: PassBookingFormProps) {
  const [step, setStep] = useState(1)
  const [eventId, setEventId] = useState(presetEventId ?? events[0]?.id ?? '')
  const [passId, setPassId] = useState('')
  const [quantity, setQuantity] = useState(2)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      headingRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const event = events.find((item) => item.id === eventId) ?? events[0]
  const pass = event?.passes.find((item) => item.id === passId)

  const totals = useMemo(() => {
    if (!event || !pass) return null
    const subtotal = pass.price * quantity
    const fees = Math.round((subtotal * event.feePercent) / 100)
    return { subtotal, fees, total: subtotal + fees }
  }, [event, pass, quantity])

  const goTo = (next: number) => {
    setStep(next)
    track('booking_step', { flow: 'pass', step: next })
    onStepChange?.(next)
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  if (submitted) {
    return <BookingNotice onRestart={() => setSubmitted(false)} />
  }

  const mobileValid = isValidIndianMobile(mobile)
  const nameValid = name.trim().length >= 2
  const canContinue =
    step === 1
      ? eventId !== ''
      : step === 2
        ? passId !== ''
        : step === 3
          ? quantity >= 1 && quantity <= 10
          : step === 4
            ? true
            : step === 5
              ? nameValid && mobileValid
              : true

  const submit = () => {
    track('booking_submit', { flow: 'pass', eventId })
    onSubmitted?.()
    setSubmitted(true)
  }

  return (
    <div>
      {step === 1 ? (
        <StepShell step={1} title="Choose your night" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-3">
            {events.map((item) => (
              <label key={item.id} className={choiceCardClass(eventId === item.id)}>
                <input
                  type="radio"
                  name="pass-event"
                  value={item.id}
                  checked={eventId === item.id}
                  onChange={() => {
                    setEventId(item.id)
                    setPassId('')
                  }}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-[15px] font-bold text-cream">{item.title}</span>
                  <span className="text-[11px] font-bold tracking-[1.4px] text-gold uppercase">
                    {eventDisplayDate(item.date)} · {item.realm}
                  </span>
                </span>
                <span className="text-[12.5px] font-light text-cream/60">
                  {item.lineup} — {item.genre}
                </span>
              </label>
            ))}
          </div>
          <StepNav backDisabled onBack={() => undefined} onContinue={() => goTo(2)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 2 ? (
        <StepShell step={2} title="Choose your pass" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {event?.passes.map((item) => (
              <label key={item.id} className={choiceCardClass(passId === item.id)}>
                <input
                  type="radio"
                  name="pass-type"
                  value={item.id}
                  checked={passId === item.id}
                  onChange={() => setPassId(item.id)}
                  className="sr-only"
                />
                <span className="font-display text-[15px] font-bold text-cream">{item.label}</span>
                <span className="font-serif text-[19px] text-gold italic">{inr.format(item.price)}</span>
                <span className="text-[12px] leading-[1.6] font-light text-cream/60">{item.includes.join(' · ')}</span>
              </label>
            ))}
          </div>
          <StepNav backDisabled={false} onBack={() => goTo(1)} onContinue={() => goTo(3)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 3 ? (
        <StepShell step={3} title="How many passes?" headingRef={(node) => (headingRef.current = node)}>
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="One fewer pass"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-[18px] text-cream transition-colors hover:border-gold/40"
            >
              −
            </button>
            <span aria-live="polite" className="min-w-[3ch] text-center font-display text-[28px] font-bold text-cream">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="One more pass"
              onClick={() => setQuantity((value) => Math.min(10, value + 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-[18px] text-cream transition-colors hover:border-gold/40"
            >
              +
            </button>
          </div>
          <p className="mt-3 text-[12px] leading-[1.6] font-light text-cream/50">Up to 10 passes per request.</p>
          <StepNav backDisabled={false} onBack={() => goTo(2)} onContinue={() => goTo(4)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 4 ? (
        <StepShell step={4} title="Your total" headingRef={(node) => (headingRef.current = node)}>
          <dl className="border-t border-line">
            <div className="flex justify-between border-b border-line py-[12px]">
              <dt className="text-[13px] font-light text-cream/60">
                {pass?.label} × {quantity}
              </dt>
              <dd className="text-[13.5px] font-bold text-cream">{totals ? inr.format(totals.subtotal) : '—'}</dd>
            </div>
            <div className="flex justify-between border-b border-line py-[12px]">
              <dt className="text-[13px] font-light text-cream/60">Fees ({event?.feePercent}%)</dt>
              <dd className="text-[13.5px] font-bold text-cream">{totals ? inr.format(totals.fees) : '—'}</dd>
            </div>
            <div className="flex justify-between py-[14px]">
              <dt className="font-display text-[13px] font-bold tracking-[1.6px] text-gold uppercase">Total</dt>
              <dd className="font-display text-[19px] font-bold text-cream">{totals ? inr.format(totals.total) : '—'}</dd>
            </div>
          </dl>
          <StepNav backDisabled={false} onBack={() => goTo(3)} onContinue={() => goTo(5)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 5 ? (
        <StepShell step={5} title="Guest details" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Name</span>
              <input
                type="text"
                value={name}
                autoComplete="name"
                aria-invalid={attempted && !nameValid}
                aria-describedby={attempted && !nameValid ? 'pass-name-error' : undefined}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setAttempted(true)}
                className={fieldClass}
              />
              {attempted && !nameValid ? <ErrorText id="pass-name-error">Please add your name.</ErrorText> : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Mobile</span>
              <input
                type="tel"
                value={mobile}
                autoComplete="tel"
                placeholder="+91 98XXX XXXXX"
                aria-invalid={attempted && !mobileValid}
                aria-describedby={attempted && !mobileValid ? 'pass-mobile-error' : undefined}
                onChange={(event) => setMobile(event.target.value)}
                onBlur={() => setAttempted(true)}
                className={fieldClass}
              />
              {attempted && !mobileValid ? <ErrorText id="pass-mobile-error">Enter a valid Indian mobile number.</ErrorText> : null}
            </label>
          </div>
          <StepNav
            backDisabled={false}
            onBack={() => goTo(4)}
            onContinue={() => {
              setAttempted(true)
              if (canContinue) goTo(6)
            }}
            continueDisabled={false}
          />
        </StepShell>
      ) : null}

      {step === 6 ? (
        <StepShell step={6} title="Payment" headingRef={(node) => (headingRef.current = node)}>
          <dl className="border-t border-line">
            {[
              ['Event', `${event?.title} · ${event ? eventDisplayDate(event.date) : ''}`],
              ['Pass', pass?.label ?? '—'],
              ['Quantity', String(quantity)],
              ['Total', totals ? inr.format(totals.total) : '—'],
              ['Guest', `${name} · ${mobile}`],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-[10px]">
                <dt className="text-[10px] font-bold tracking-[2px] text-muted uppercase">{label}</dt>
                <dd className="text-[13.5px] font-light text-cream/85">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[12.5px] leading-[1.6] font-light text-cream/55">
            Online payment arrives in the next release — the Pay button stays disabled and nothing is charged today.
          </p>
          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-full border border-line px-6 py-3 font-display text-[12px] font-bold tracking-[1.6px] text-cream/30 uppercase"
          >
            Pay {totals ? inr.format(totals.total) : ''} — disabled in this release
          </button>
          <StepNav backDisabled={false} onBack={() => goTo(5)} onContinue={submit} continueLabel="Complete request" continueDisabled={false} />
        </StepShell>
      ) : null}
    </div>
  )
}
