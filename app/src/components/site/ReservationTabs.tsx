'use client'

import { useState } from 'react'
import { events } from '@/lib/content'
import { openBooking } from '@/components/booking/openBooking'
import { TableReservationForm } from '@/components/booking/TableReservationForm'
import { eventDisplayDate } from '@/components/booking/PassBookingForm'

type Tab = 'table' | 'pass'

const tabButtonClass = (active: boolean) =>
  `flex-1 cursor-pointer rounded-full px-4 py-3 font-display text-[11px] font-bold tracking-[1.6px] uppercase transition-colors ${
    active ? 'bg-gold-gradient text-cocoa' : 'border border-line text-cream/60 hover:border-gold/40 hover:text-gold'
  }`

export function ReservationTabs() {
  const [tab, setTab] = useState<Tab>('table')

  return (
    <div>
      <div role="tablist" aria-label="Reservation options" className="flex gap-2">
        <button
          type="button"
          role="tab"
          id="reservation-tab-table"
          aria-selected={tab === 'table'}
          aria-controls="reservation-panel-table"
          onClick={() => setTab('table')}
          className={tabButtonClass(tab === 'table')}
        >
          Reserve a Table
        </button>
        <button
          type="button"
          role="tab"
          id="reservation-tab-pass"
          aria-selected={tab === 'pass'}
          aria-controls="reservation-panel-pass"
          onClick={() => setTab('pass')}
          className={tabButtonClass(tab === 'pass')}
        >
          Book a Pass
        </button>
      </div>

      <div
        role="tabpanel"
        id="reservation-panel-table"
        aria-labelledby="reservation-tab-table"
        hidden={tab !== 'table'}
        className="mt-6 rounded-2xl border border-line bg-brown-2/40 p-6"
      >
        {tab === 'table' ? (
          <div data-booking-form>
            <TableReservationForm />
          </div>
        ) : null}
      </div>

      <div
        role="tabpanel"
        id="reservation-panel-pass"
        aria-labelledby="reservation-tab-pass"
        hidden={tab !== 'pass'}
        className="mt-6 rounded-2xl border border-line bg-brown-2/40 p-6"
      >
        {tab === 'pass' ? (
          <div>
            <p className="mb-4 text-[13px] leading-[1.6] font-light text-cream/60">
              Pick a night — the pass flow opens with your event preselected.
            </p>
            <div className="grid gap-3">
              {events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => openBooking({ flow: 'pass', eventId: event.id })}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line bg-ink/40 px-4 py-3 text-left transition-colors hover:border-gold/40"
                >
                  <span>
                    <span className="block font-display text-[15px] font-bold text-cream">{event.title}</span>
                    <span className="block text-[11px] font-bold tracking-[1.4px] text-gold uppercase">
                      {eventDisplayDate(event.date)} · {event.realm}
                    </span>
                  </span>
                  <span className="rounded-full bg-gold-gradient px-4 py-2 font-display text-[10px] font-bold tracking-[1.4px] whitespace-nowrap text-cocoa uppercase">
                    Book Passes
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
