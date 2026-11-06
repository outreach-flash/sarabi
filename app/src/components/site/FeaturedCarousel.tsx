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

const lerp = (from: number, to: number, t: number) => from + (to - from) * t

/**
 * Continuous look for a card at fractional offset `d` from the centre.
 * `reach` is how many cards each side the stage can hold whole: everything
 * within the reach is fully opaque (nothing on the wheel is ever cropped),
 * then the card fades out across one more step so a card travelling during
 * a drag dissolves before it could leave the stage.
 */
function styleFor(d: number, reach: number): { scale: number; blur: number; opacity: number; z: number } {
  const a = Math.abs(d)
  const scale = a <= 1 ? lerp(1.08, 0.94, a) : Math.max(0.86, lerp(0.94, 0.9, Math.min(a - 1, 1)))
  const blur = a <= 1 ? lerp(0, 1, a) : Math.min(3.5, lerp(1, 2, a - 1))
  const opacity = a <= reach ? 1 : a < reach + 0.75 ? 1 - (a - reach) / 0.55 : 0
  return { scale, blur, opacity, z: Math.max(0, 30 - Math.round(a) * 10) }
}

type SeamStep = { index: number; at: number; animate: boolean }

export function FeaturedCarousel() {
  const [active, setActive] = useState(0)
  const [seams, setSeams] = useState<SeamStep[]>([])
  const [dragging, setDragging] = useState(false)
  const [dragPx, setDragPx] = useState(0)
  const [step, setStep] = useState(240)
  const [hub, setHub] = useState(1300)
  const [reach, setReach] = useState(2)
  const stage = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const dragStart = useRef<{ x: number; id: number } | null>(null)
  const seamTimer = useRef<number | undefined>(undefined)
  const suppressClick = useRef(false)

  // Fit the arc to the stage: pick the step angle and hub radius so every
  // visible card sits whole inside the stage. Cards are rotated, so the fit
  // uses each card's rotated bounding box, not its raw width — and the scan
  // keeps real gaps between neighbours on wide stages. ResizeObserver fires
  // once on observe, which is the initial measure.
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const wide = window.matchMedia('(min-width: 60rem)')
    const compute = () => {
      const card = el.querySelector<HTMLElement>('[data-wheel-card]')
      if (!card) return
      const w = card.offsetWidth
      const h = card.offsetHeight
      const xBud = el.clientWidth / 2 - (wide.matches ? 20 : 8)
      const yBud = el.clientHeight / 2 - (wide.matches ? 24 : 16)
      // Cards each side of centre that must sit whole in the stage.
      const m = wide.matches && xBud >= 2.2 * w ? 2 : 1
      const cap = ((wide.matches ? 14 : 26) * Math.PI) / 180
      const scales = [1.08, 0.94, 0.9]
      const bw = (a: number) => w * Math.cos(a) + h * Math.sin(a)
      const bh = (a: number) => h * Math.cos(a) + w * Math.sin(a)
      let theta = ((m === 2 ? 8 : 18) * Math.PI) / 180
      let dist = 320
      for (let halfDeg = 2; halfDeg <= (cap * 360) / Math.PI; halfDeg += 1) {
        const t = (halfDeg * Math.PI) / 360
        let d = Infinity
        let ok = true
        for (let k = 1; k <= m; k++) {
          const a = k * t
          const s = scales[k] ?? 0.9
          const sin = Math.sin(a)
          const rise = 1 - Math.cos(a)
          if (sin < 0.02 || rise < 1e-4) {
            ok = false
            break
          }
          d = Math.min(d, (xBud - (s * bw(a)) / 2) / sin, (yBud - (s * bh(a)) / 2) / rise)
        }
        if (!ok || !Number.isFinite(d) || d < 50) continue
        if (m === 2) {
          const gap01 = d * Math.sin(t) - (scales[0] * w + (scales[1] ?? 0.94) * bw(t)) / 2
          const gap12 = d * Math.sin(2 * t) - ((scales[1] ?? 0.94) * bw(t) + (scales[2] ?? 0.9) * bw(2 * t)) / 2
          if (gap01 < 4 || gap12 < 4) continue
        }
        theta = t
        dist = d
      }
      const radius = dist - h / 2
      el.style.setProperty('--wheel-step', `${(theta * 180) / Math.PI}deg`)
      el.style.setProperty('--wheel-r', `${Math.max(radius, -h / 2 + 40)}px`)
      setStep(dist * theta)
      setHub(dist)
      setReach(m)
    }
    const observer = new ResizeObserver(compute)
    observer.observe(el)
    wide.addEventListener('change', compute)
    return () => {
      observer.disconnect()
      wide.removeEventListener('change', compute)
    }
  }, [])

  // Move the wheel by `steps` (positive = next). Cards whose circular offset
  // jumps by more than one position are crossing the wrap seam: they get a
  // two-phase treatment so the wheel never sweeps a card across the stage.
  // Going next, the seam card is invisible on both sides, so it teleports
  // just off the right edge and wheels in from there. Going previous, the
  // seam card is leaving: it rotates out to the right edge and fades, then
  // rejoins hidden from the left seam.
  const applyActive = (next: number, steps = 0) => {
    const prev = activeRef.current
    activeRef.current = next
    setActive(next)
    if (seamTimer.current !== undefined) {
      window.clearTimeout(seamTimer.current)
      seamTimer.current = undefined
    }
    if (steps === 0) {
      setSeams([])
      return
    }
    const dir = steps > 0 ? 1 : -1
    const created: SeamStep[] = []
    for (let i = 0; i < COUNT; i++) {
      const from = wheelOffset(i, prev)
      const to = wheelOffset(i, next)
      if (Math.abs(to - from) > 1) {
        created.push(dir > 0 ? { index: i, at: to + 1, animate: false } : { index: i, at: from + 1, animate: true })
      }
    }
    if (!created.length) {
      setSeams([])
      return
    }
    setSeams(created)
    if (dir > 0) {
      // One invisible commit off the edge, then transition to the true offset.
      seamTimer.current = window.setTimeout(() => {
        setSeams((current) => current.filter((s) => s.animate))
      }, 0)
    } else {
      // Let the exit animation play out, then pick the card up from the seam.
      seamTimer.current = window.setTimeout(() => {
        setSeams((current) => current.map((s) => ({ ...s, at: -HALF, animate: false })))
        seamTimer.current = window.setTimeout(() => {
          setSeams((current) => current.filter((s) => s.animate))
        }, 0)
      }, 620)
    }
  }

  const rotate = (direction: number) => {
    applyActive((activeRef.current + direction + COUNT) % COUNT, direction)
  }

  const turnTo = (index: number) => {
    const target = ((index % COUNT) + COUNT) % COUNT
    applyActive(target, wheelOffset(target, activeRef.current))
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
      applyActive((current - delta + COUNT) % COUNT, -delta)
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
        className="relative mt-2 h-[540px] w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [--wheel-r:700px] [--wheel-step:19deg] [touch-action:pan-y] md:h-[500px] lg:[--wheel-step:15deg] xl:[margin-left:calc(50%_-_50vw)] xl:w-screen"
      >
        <div aria-hidden="true" className="wheel-halo pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-[380px] rounded-full md:h-[440px] md:w-[440px]" />
        {events.map((event, i) => {
          const d = wheelOffset(i, active)
          const off = d + (dragging ? dragSteps : 0)
          const seam = seams.find((s) => s.index === i)
          const renderOff = seam ? seam.at : off
          const s = styleFor(renderOff, reach)
          const hidden = Math.abs(d) >= reach + 1
          const isCenter = Math.abs(renderOff) < 0.5
          const badge = badgeParts(event.date)
          return (
            <a
              key={event.id}
              data-wheel-card
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
              className={`absolute top-1/2 left-1/2 aspect-[257/352] w-[min(56vw,220px)] [transform-origin:50%_calc(100%_+_var(--wheel-r))] md:w-[250px] lg:w-[210px] xl:w-[235px] ${
                hidden ? 'pointer-events-none' : ''
              } overflow-hidden rounded-[14px] border bg-brown transition-[transform,filter,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCenter
                  ? 'border-gold/55 shadow-[0_0_50px_rgb(253_216_167/0.3),0_20px_40px_-12px_#000]'
                  : 'border-line'
              }`}
              style={{
                transform: `translate(-50%, -50%) rotate(calc(var(--wheel-step) * ${renderOff.toFixed(3)})) translateY(${((s.scale - 1) * hub).toFixed(1)}px) scale(${s.scale})`,
                filter: s.blur > 0.05 ? `blur(${s.blur.toFixed(2)}px)` : undefined,
                opacity: s.opacity,
                zIndex: s.z,
                transition: dragging || (seam && !seam.animate) ? 'none' : undefined,
              }}
            >
              <Image src={event.image} alt="" fill sizes="(min-width: 1280px) 235px, (min-width: 1024px) 210px, (min-width: 700px) 250px, min(56vw, 220px)" className="object-cover" />
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
