'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { events } from '@/lib/content'
import { badgeParts } from '@/lib/format'
import chevronLeft from '@/assets/icons/chevron-left.svg'
import chevronRight from '@/assets/icons/chevron-right.svg'

const COUNT = events.length
const HALF = Math.floor(COUNT / 2)

/** Circular offset of card `i` from the active card, in the range [-HALF, HALF]. */
function wheelOffset(i: number, active: number): number {
  return (((i - active) % COUNT) + COUNT + HALF) % COUNT - HALF
}

function styleFor(d: number): { scale: number; blur: number; opacity: number; z: number } {
  const abs = Math.abs(d)
  if (abs === 0) return { scale: 1.08, blur: 0, opacity: 1, z: 30 }
  if (abs === 1) return { scale: 0.94, blur: 1.5, opacity: 0.9, z: 20 }
  if (abs === 2) return { scale: 0.9, blur: 2.5, opacity: 0.65, z: 10 }
  return { scale: 0.88, blur: 3, opacity: 0, z: 0 }
}

export function FeaturedCarousel() {
  const [active, setActive] = useState(0)
  const [skipIndex, setSkipIndex] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const [dragPx, setDragPx] = useState(0)
  const [step, setStep] = useState(232)
  const stage = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const dragStart = useRef<{ x: number; id: number } | null>(null)
  const suppressClick = useRef(false)

  // Arc length of one wheel step: radius × angle (desktop 1100px @ 15°, mobile 700px @ 19°).
  useEffect(() => {
    const update = () => setStep(window.matchMedia('(min-width: 60rem)').matches ? 288 : 232)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // The skip only applies to the update that wrapped the wheel; restore transitions
  // right after that commit so later moves animate normally.
  const applyActive = (next: number, skip: number | null = null) => {
    activeRef.current = next
    setSkipIndex(skip)
    setActive(next)
    window.setTimeout(() => setSkipIndex(null), 0)
  }

  const rotate = (direction: number) => {
    const current = activeRef.current
    // The card sitting at the seam (offset ∓HALF) flips to the far side when the
    // wheel wraps — it must not sweep across the stage, so its transition is skipped.
    const seam = direction > 0 ? (current - HALF + COUNT) % COUNT : (current + HALF) % COUNT
    applyActive((current + direction + COUNT) % COUNT, seam)
  }

  const turnTo = (index: number) => {
    applyActive(((index % COUNT) + COUNT) % COUNT)
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragStart.current = { x: event.clientX, id: event.pointerId }
    setDragging(true)
    stage.current?.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.id !== event.pointerId) return
    setDragPx(event.clientX - dragStart.current.x)
  }

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.id !== event.pointerId) return
    const delta = Math.round(dragPx / step)
    const current = activeRef.current
    suppressClick.current = Math.abs(dragPx) > 8
    dragStart.current = null
    setDragging(false)
    setDragPx(0)
    if (delta !== 0) {
      const seam = delta < 0 ? (current - HALF + COUNT) % COUNT : (current + HALF) % COUNT
      applyActive((current - delta + COUNT) % COUNT, seam)
    }
  }

  const dragSteps = dragPx / step

  const onStageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      rotate(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      rotate(-1)
    }
  }

  return (
    <>
      <div
        ref={stage}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured events"
        tabIndex={0}
        onKeyDown={onStageKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className="relative mt-2 h-[540px] overflow-hidden [--wheel-step:19deg] [touch-action:pan-y] md:h-[500px] lg:h-[500px] lg:[--wheel-step:15deg]"
      >
        <div aria-hidden="true" className="wheel-halo pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-[380px] rounded-full md:h-[440px] md:w-[440px]" />
        {events.map((event, i) => {
          const d = wheelOffset(i, active)
          const s = styleFor(d)
          const hidden = Math.abs(d) >= 3
          const isCenter = d === 0
          const badge = badgeParts(event.date)
          return (
            <a
              key={event.id}
              href={`#event-${event.id}`}
              onFocus={() => turnTo(i)}
              onClick={(e) => {
                if (suppressClick.current) {
                  e.preventDefault()
                  suppressClick.current = false
                } else if (!isCenter) {
                  e.preventDefault()
                  turnTo(i)
                }
              }}
              tabIndex={hidden ? -1 : 0}
              aria-hidden={hidden || undefined}
              aria-label={isCenter ? undefined : `Show ${event.title}`}
              className={`absolute top-1/2 left-1/2 aspect-[257/352] w-[min(74vw,300px)] [transform-origin:50%_calc(100%_+_700px)] md:w-[250px] lg:w-[235px] lg:[transform-origin:50%_calc(100%_+_1100px)] ${
                hidden ? 'pointer-events-none' : ''
              } overflow-hidden rounded-[14px] border bg-brown transition-[transform,filter,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCenter
                  ? 'border-gold/55 shadow-[0_0_50px_rgb(253_216_167/0.3),0_20px_40px_-12px_#000]'
                  : 'border-line'
              }`}
              style={{
                transform: `translate(-50%, -50%) rotate(calc(var(--wheel-step) * ${(d + (dragging ? dragSteps : 0)).toFixed(3)})) scale(${s.scale})`,
                filter: s.blur ? `blur(${s.blur}px)` : undefined,
                opacity: s.opacity,
                zIndex: s.z,
                transition: dragging || i === skipIndex ? 'none' : undefined,
              }}
            >
              <Image src={event.image} alt="" fill sizes="(min-width: 960px) 235px, (min-width: 700px) 250px, min(74vw, 300px)" className="object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.94)_4%,rgba(21,10,5,0.14)_55%,rgba(21,10,5,0.08))]" />
              <span className="absolute top-[14px] left-[14px] flex flex-col items-center gap-[3px] rounded-lg bg-gold px-[10px] py-[6px] text-[8.8px] leading-none font-extrabold tracking-[1.76px] text-cocoa uppercase">
                <b className="font-display text-[18.4px] leading-none font-extrabold tracking-normal">{badge.day}</b>
                {badge.month}
              </span>
              <span className="absolute right-4 bottom-4 left-4 flex flex-col gap-[5px] text-cream">
                <b className="font-display text-[15.2px] leading-[1.15] font-bold">{event.title}</b>
                <small className="text-[9.3px] leading-[1.5] font-bold tracking-[2px] text-gold uppercase">
                  {event.genre} · {event.realm}
                </small>
              </span>
            </a>
          )
        })}
      </div>
      <div className="flex items-center justify-between lg:mx-auto lg:max-w-[680px]">
        <button onClick={() => rotate(-1)} aria-label="Previous event" className="rounded-full border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-[1.08]">
          <Image src={chevronLeft} alt="" width={56} height={56} />
        </button>
        <div className="flex items-center gap-[9px]" role="group" aria-label="Choose event">
          {events.map((event, i) => (
            <button
              key={event.id}
              type="button"
              aria-label={`Show ${event.title}`}
              aria-pressed={i === active}
              onClick={() => turnTo(i)}
              className={`h-[7px] w-[7px] rounded-full border-0 p-0 transition-colors duration-300 ${
                i === active ? 'bg-gold shadow-[0_0_10px_rgb(253_216_167/0.5)]' : 'bg-cream/20 hover:bg-cream/40'
              }`}
            />
          ))}
        </div>
        <button onClick={() => rotate(1)} aria-label="Next event" className="rounded-full border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-[1.08]">
          <Image src={chevronRight} alt="" width={56} height={56} />
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {active + 1} of {COUNT} — {events[active].title}
      </p>
      <p className="text-center text-[9.6px] leading-[1.6] font-semibold tracking-[2.7px] text-cream/35 uppercase lg:mx-auto lg:max-w-[680px]">
        Drag, tap or use the arrows to turn
      </p>
    </>
  )
}
