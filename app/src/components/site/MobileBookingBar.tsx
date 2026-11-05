'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { events } from '@/lib/content'
import { getTonightsEvent } from '@/lib/venue-hours'
import { bookingDialogEvent, openBooking } from '@/components/booking/openBooking'

export function MobileBookingBar() {
  const pathname = usePathname()
  const [heroVisible, setHeroVisible] = useState(true)
  const [formVisible, setFormVisible] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tonightId, setTonightId] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTonightId(getTonightsEvent(events, new Date())?.id ?? null)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('[data-hero], #main-content > section:first-of-type')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const form = document.querySelector('[data-booking-form]')
    if (!form) {
      const id = requestAnimationFrame(() => {
        setFormVisible(false)
      })
      return () => cancelAnimationFrame(id)
    }
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(form)
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const onDialog = (event: Event) => {
      setDialogOpen(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open))
    }
    window.addEventListener(bookingDialogEvent, onDialog)
    return () => window.removeEventListener(bookingDialogEvent, onDialog)
  }, [])

  const visible = !heroVisible && !formVisible && !dialogOpen

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-ink/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {pathname === '/' ? (
        <a
          href="#reservations"
          className="flex min-h-[46px] items-center justify-center rounded-full bg-gold-gradient px-3 font-display text-[10.5px] leading-[1.3] font-extrabold tracking-[1.8px] whitespace-nowrap text-cocoa uppercase no-underline"
        >
          Reserve Table
        </a>
      ) : (
        <button
          type="button"
          onClick={() => openBooking({ flow: 'table' })}
          className="flex min-h-[46px] cursor-pointer items-center justify-center rounded-full bg-gold-gradient px-3 font-display text-[10.5px] leading-[1.3] font-extrabold tracking-[1.8px] whitespace-nowrap text-cocoa uppercase"
        >
          Reserve Table
        </button>
      )}
      <Link
        href={tonightId ? `/#event-${tonightId}` : '/#events'}
        className="flex min-h-[46px] items-center justify-center rounded-full border border-gold/35 bg-gold/[0.04] px-3 font-display text-[10.5px] leading-[1.3] font-extrabold tracking-[1.8px] whitespace-nowrap text-gold uppercase no-underline"
      >
        Tonight&rsquo;s Event
      </Link>
    </div>
  )
}
