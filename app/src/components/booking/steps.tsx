import type { ReactNode } from 'react'

export const TOTAL_STEPS = 6

export const fieldClass =
  'w-full rounded-lg border border-line bg-ink/60 px-4 py-3 text-[14px] font-light text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none'

export const choiceCardClass = (selected: boolean) =>
  `flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors ${
    selected ? 'border-gold/60 bg-gold/[0.06]' : 'border-line bg-ink/40 hover:border-gold/30'
  }`

export function StepShell({
  step,
  title,
  headingRef,
  children,
}: {
  step: number
  title: string
  headingRef?: (node: HTMLHeadingElement | null) => void
  children: ReactNode
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="sr-only">{title}</legend>
      <p className="mb-2 text-[10px] font-bold tracking-[2.4px] text-muted uppercase">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mb-5 font-display text-[22px] leading-[1.2] font-bold text-cream focus:outline-none"
      >
        {title}
      </h3>
      {children}
    </fieldset>
  )
}

export function StepNav({
  onBack,
  onContinue,
  backDisabled,
  continueLabel = 'Continue',
  continueDisabled,
}: {
  onBack: () => void
  onContinue: () => void
  backDisabled: boolean
  continueLabel?: string
  continueDisabled: boolean
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className="rounded-full border border-line bg-transparent px-5 py-2.5 font-display text-[11px] font-bold tracking-[1.6px] text-cream/70 uppercase transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        disabled={continueDisabled}
        className="rounded-full bg-gold-gradient px-6 py-2.5 font-display text-[11px] font-bold tracking-[1.6px] text-cocoa uppercase transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {continueLabel}
      </button>
    </div>
  )
}

export const indianMobilePattern = /^(\+91)?[6-9]\d{9}$/

export function isValidIndianMobile(value: string): boolean {
  return indianMobilePattern.test(value.replace(/[\s-]/g, ''))
}

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-[11.5px] font-medium text-[#e8907a]">
      {children}
    </p>
  )
}
