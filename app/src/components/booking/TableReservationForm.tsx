'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { bookingTerms, realms, tableTypes, whatsappUrl } from '@/lib/content'
import { track } from '@/lib/analytics'
import { BookingNotice } from './BookingNotice'
import { ErrorText, StepNav, StepShell, choiceCardClass, fieldClass, isValidIndianMobile } from './steps'

function formatSlot(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24
  const m = minutes % 60
  const period = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

function todayISO(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export type TableReservationFormProps = {
  presetRealm?: string
  presetDate?: string
  onStepChange?: (step: number) => void
  onSubmitted?: () => void
}

export function TableReservationForm({ presetRealm, presetDate, onStepChange, onSubmitted }: TableReservationFormProps) {
  const [step, setStep] = useState(1)
  const [tableTypeId, setTableTypeId] = useState<string>('')
  const [date, setDate] = useState(presetDate ?? '')
  const [partySize, setPartySize] = useState(2)
  const [time, setTime] = useState('')
  const [realm, setRealm] = useState(presetRealm ?? '')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [minDate, setMinDate] = useState('')
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMinDate(todayISO())
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      headingRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const tableType = tableTypes.find((type) => type.id === tableTypeId)
  const slots = useMemo(() => {
    if (!tableType) return []
    const list: string[] = []
    for (let m = tableType.window.start; m <= tableType.window.end; m += 30) list.push(formatSlot(m))
    return list
  }, [tableType])

  const goTo = (next: number) => {
    setStep(next)
    track('booking_step', { flow: 'table', step: next })
    onStepChange?.(next)
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  if (submitted) {
    return <BookingNotice onRestart={() => setSubmitted(false)} />
  }

  const mobileValid = isValidIndianMobile(mobile)
  const nameValid = name.trim().length >= 2
  const dateValid = date.length > 0
  const canContinue =
    step === 1
      ? tableTypeId !== ''
      : step === 2
        ? dateValid
        : step === 3
          ? time !== ''
          : step === 4
            ? true
            : step === 5
              ? nameValid && mobileValid
              : termsAccepted

  const submit = () => {
    track('booking_submit', { flow: 'table' })
    onSubmitted?.()
    setSubmitted(true)
  }

  return (
    <div>
      {step === 1 ? (
        <StepShell step={1} title="Choose your table" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {tableTypes.map((type) => (
              <label key={type.id} className={choiceCardClass(tableTypeId === type.id)}>
                <input
                  type="radio"
                  name="table-type"
                  value={type.id}
                  checked={tableTypeId === type.id}
                  onChange={() => setTableTypeId(type.id)}
                  className="sr-only"
                />
                <span className="font-display text-[15px] font-bold text-cream">{type.label}</span>
                <span className="text-[11px] font-bold tracking-[1.6px] text-gold uppercase">{type.windowLabel}</span>
                <span className="text-[12.5px] leading-[1.6] font-light text-cream/60">{type.description}</span>
              </label>
            ))}
          </div>
          <StepNav backDisabled onBack={() => undefined} onContinue={() => goTo(2)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 2 ? (
        <StepShell step={2} title="Date & party size" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Date</span>
              <input
                type="date"
                value={date}
                min={minDate || undefined}
                onChange={(event) => setDate(event.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Guests</span>
              <input
                type="number"
                min={1}
                max={12}
                value={partySize}
                onChange={(event) => setPartySize(Math.min(12, Math.max(1, Number(event.target.value) || 1)))}
                className={fieldClass}
              />
            </label>
          </div>
          <p className="mt-3 text-[12px] leading-[1.6] font-light text-cream/50">
            13+ guests?{' '}
            <a className="text-gold no-underline" href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp us for groups
            </a>
            .
          </p>
          <StepNav backDisabled={false} onBack={() => goTo(1)} onContinue={() => goTo(3)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 3 ? (
        <StepShell step={3} title="Pick a time" headingRef={(node) => (headingRef.current = node)}>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                aria-pressed={time === slot}
                onClick={() => setTime(slot)}
                className={`rounded-full border px-4 py-2 text-[12px] font-bold tracking-[1px] uppercase transition-colors ${
                  time === slot
                    ? 'border-gold/60 bg-gold/10 text-gold'
                    : 'border-line bg-ink/40 text-cream/60 hover:border-gold/30 hover:text-cream'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[12px] leading-[1.6] font-light text-cream/50">
            Availability is confirmed by our team.
          </p>
          <StepNav backDisabled={false} onBack={() => goTo(2)} onContinue={() => goTo(4)} continueDisabled={!canContinue} />
        </StepShell>
      ) : null}

      {step === 4 ? (
        <StepShell step={4} title="Realm preference (optional)" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-3 sm:grid-cols-3">
            {realms.map((option) => (
              <label key={option.name} className={choiceCardClass(realm === option.name)}>
                <input
                  type="radio"
                  name="realm"
                  value={option.name}
                  checked={realm === option.name}
                  onChange={() => setRealm(option.name)}
                  className="sr-only"
                />
                <span className="font-serif text-[13px] text-gold italic">Realm {option.numeral}</span>
                <span className="font-display text-[15px] font-bold text-cream">{option.name}</span>
                <span className="text-[10px] font-bold tracking-[1.6px] text-cream/50 uppercase">{option.bar}</span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-[12px] leading-[1.6] font-light text-cream/50">No preference? We&rsquo;ll place you where the night is best.</p>
          <StepNav backDisabled={false} onBack={() => goTo(3)} onContinue={() => goTo(5)} continueDisabled={false} />
        </StepShell>
      ) : null}

      {step === 5 ? (
        <StepShell step={5} title="Your details" headingRef={(node) => (headingRef.current = node)}>
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Name</span>
              <input
                type="text"
                value={name}
                autoComplete="name"
                aria-invalid={attempted && !nameValid}
                aria-describedby={attempted && !nameValid ? 'table-name-error' : undefined}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setAttempted(true)}
                className={fieldClass}
              />
              {attempted && !nameValid ? <ErrorText id="table-name-error">Please add your name.</ErrorText> : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold tracking-[2px] text-muted uppercase">Mobile</span>
              <input
                type="tel"
                value={mobile}
                autoComplete="tel"
                placeholder="+91 98XXX XXXXX"
                aria-invalid={attempted && !mobileValid}
                aria-describedby={attempted && !mobileValid ? 'table-mobile-error' : 'table-mobile-hint'}
                onChange={(event) => setMobile(event.target.value)}
                onBlur={() => setAttempted(true)}
                className={fieldClass}
              />
              {attempted && !mobileValid ? (
                <ErrorText id="table-mobile-error">Enter a valid Indian mobile number.</ErrorText>
              ) : (
                <p id="table-mobile-hint" className="mt-1.5 text-[11.5px] font-light text-cream/40">
                  We&rsquo;ll confirm on this number.
                </p>
              )}
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
        <StepShell step={6} title="Review & terms" headingRef={(node) => (headingRef.current = node)}>
          <dl className="border-t border-line">
            {[
              ['Table', tableType?.label ?? '—'],
              ['Date', date || '—'],
              ['Time', time || '—'],
              ['Guests', String(partySize)],
              ['Realm', realm || 'No preference'],
              ['Name', name],
              ['Mobile', mobile],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-[10px]">
                <dt className="text-[10px] font-bold tracking-[2px] text-muted uppercase">{label}</dt>
                <dd className="text-[13.5px] font-light text-cream/85">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 grid gap-1.5 text-[12.5px] leading-[1.6] font-light text-cream/55">
            <li>· {bookingTerms.deposit}</li>
            <li>· {bookingTerms.minimumSpend}</li>
            <li>· {bookingTerms.cancellation}</li>
          </ul>
          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#fdd8a7]"
            />
            <span className="text-[13px] leading-[1.6] font-light text-cream/75">I&rsquo;ve read the terms</span>
          </label>
          <StepNav
            backDisabled={false}
            onBack={() => goTo(5)}
            onContinue={submit}
            continueLabel="Request this table"
            continueDisabled={!canContinue}
          />
        </StepShell>
      ) : null}
    </div>
  )
}
