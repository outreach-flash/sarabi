'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { events } from '@/lib/content'
import { getTonightsEvent } from '@/lib/venue-hours'
import { openBooking } from '@/components/booking/openBooking'
import { eventDisplayDate, inr } from '@/components/booking/PassBookingForm'

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const VISIBLE_BY_DEFAULT = 4

export function EventsGrid() {
  const [expanded, setExpanded] = useState(false)
  const [tonightId, setTonightId] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTonightId(getTonightsEvent(events, new Date())?.id ?? null)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const shown = expanded ? events : events.slice(0, VISIBLE_BY_DEFAULT)

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {shown.map((event) => {
          const [, month, day] = event.date.split('-')
          const fromPrice = Math.min(...event.passes.map((pass) => pass.price))
          return (
            <article
              key={event.id}
              id={`event-${event.id}`}
              className="flex scroll-mt-24 flex-col overflow-hidden rounded-[18px] border border-line bg-[linear-gradient(160deg,#2e180d,#26130a)]"
            >
              <div className="relative">
                <Image
                  src={event.image}
                  alt=""
                  className="aspect-[350/240] w-full object-cover"
                  sizes="(min-width: 960px) 25vw, (min-width: 700px) 50vw, 100vw"
                />
                <span className="absolute top-[12px] left-[12px] flex flex-col items-center gap-[2px] rounded-lg bg-gold px-[10px] py-[6px] text-[8.8px] leading-none font-extrabold tracking-[1.76px] text-cocoa uppercase">
                  <b className="font-display text-[18.4px] leading-none font-extrabold tracking-normal">{day}</b>
                  {monthShort[Number(month) - 1]}
                </span>
                {tonightId === event.id ? (
                  <span className="absolute top-[12px] right-[12px] rounded-full bg-ink/85 px-[12px] py-[6px] text-[9px] font-extrabold tracking-[2px] text-gold uppercase backdrop-blur">
                    Tonight
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-[18px]">
                <small className="text-[9.3px] leading-[1.6] font-bold tracking-[2.4px] text-muted uppercase">
                  {event.realm} · {eventDisplayDate(event.date)}
                </small>
                <h3 className="mt-1 font-display text-[19.2px] leading-[1.2] font-bold">{event.title}</h3>
                <p className="mt-[5px] text-[12.2px] leading-[1.5] font-medium text-cream/50">
                  {event.lineup} — {event.genre}
                </p>
                <p className="mt-[7px] text-[12.2px] leading-[1.6] font-medium text-cream/50">
                  Doors {event.doors} · Show {event.showtime}
                </p>
                <ul className="mt-[10px] grid gap-1">
                  {event.inclusions.map((inclusion) => (
                    <li key={inclusion} className="flex items-start gap-2 text-[11.8px] leading-[1.5] font-light text-cream/60">
                      <span className="mt-[7px] h-[3px] w-[3px] flex-none rounded-full bg-gold/70" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                <p className="mt-[14px] flex items-center gap-2 text-[12.5px] font-bold text-gold">
                  From {inr.format(fromPrice)} + fees
                  <span className="rounded-full border border-gold/25 px-[7px] py-[2px] text-[7.5px] font-extrabold tracking-[1.5px] text-gold/70 uppercase">
                    Draft
                  </span>
                </p>
                <div className="mt-[16px] grid gap-2 border-t border-line pt-[14px]">
                  <button
                    type="button"
                    onClick={() => openBooking({ flow: 'pass', eventId: event.id })}
                    className="flex min-h-[42px] cursor-pointer items-center justify-center rounded-full bg-gold-gradient px-4 font-display text-[10.7px] font-bold tracking-[1.39px] text-cocoa uppercase transition-transform hover:-translate-y-0.5"
                  >
                    Book Passes
                  </button>
                  <button
                    type="button"
                    onClick={() => openBooking({ flow: 'table', date: event.date })}
                    className="flex min-h-[40px] cursor-pointer items-center justify-center rounded-full border border-gold/35 bg-gold/[0.04] px-4 font-display text-[10.7px] font-bold tracking-[1.39px] text-gold uppercase transition-transform hover:-translate-y-0.5"
                  >
                    Reserve for This Event
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <div className="mt-10 text-center">
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="cursor-pointer rounded-full border border-gold/35 bg-gold/[0.04] px-[23px] py-[11px] font-display text-[10.7px] font-bold tracking-[1.39px] text-gold uppercase transition-transform hover:-translate-y-0.5"
        >
          {expanded ? 'Show fewer events' : `View all events (${events.length})`}
        </button>
      </div>
    </>
  )
}
