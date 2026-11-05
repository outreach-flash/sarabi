'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { realms } from '@/lib/content'
import { openBooking } from '@/components/booking/openBooking'

/**
 * Mobile/tablet Realms: native snap carousel of the realm cards with a
 * 01 / 03 progress readout and dots. No scroll hijacking.
 */
export function RealmsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll('[data-realm-card]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = cards.indexOf(entry.target)
          if (index >= 0) setActive(index)
        })
      },
      { root: track, threshold: 0.6 },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div
        ref={trackRef}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:-mx-10 md:px-10"
      >
        {realms.map((realm) => (
          <article
            key={realm.name}
            data-realm-card
            className="relative flex w-[min(82vw,420px)] flex-none snap-center flex-col justify-end overflow-hidden rounded-[18px] border border-line bg-brown min-h-[480px] md:min-h-[540px]"
          >
            <Image
              src={realm.image}
              alt=""
              fill
              sizes="(min-width: 700px) 420px, 82vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.96)_8%,rgba(21,10,5,0.8)_52%,rgba(21,10,5,0.1)_82%)]" />
            <div className="relative p-6 sm:p-[30px]">
              <em className="font-serif text-[14.4px] leading-[1.6] text-gold italic">Realm {realm.numeral}</em>
              <h3 className="mt-1 font-display text-[27.2px] leading-[1.3] font-bold">{realm.title}</h3>
              <p className="mt-1 font-serif text-[16px] leading-[1.4] text-cream/85 italic">{realm.tagline}</p>
              <small className="mt-2 block text-[9.6px] leading-[1.6] font-bold tracking-[2.7px] text-gold uppercase">{realm.bar}</small>
              <p className="my-[10px] mb-[19px] text-[13.6px] leading-[1.6] font-light text-cream/68">{realm.copy}</p>
              <footer className="flex flex-wrap gap-x-[21px] gap-y-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => openBooking({ flow: 'table', realm: realm.name })}
                  className="cursor-pointer border-0 bg-transparent p-0 text-[10.2px] whitespace-nowrap leading-[1.6] font-bold tracking-[2.25px] text-gold uppercase"
                >
                  {realm.cta}
                </button>
                <Link
                  href="/spaces"
                  className="flex items-center gap-[6px] text-[10.2px] leading-[1.6] font-bold tracking-[2.25px] text-cream uppercase no-underline"
                >
                  Explore
                </Link>
              </footer>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="font-display text-[12px] font-bold tracking-[3px] text-cream/80 uppercase">
          <b>{String(active + 1).padStart(2, '0')}</b> / 03
        </span>
        <div className="flex gap-2">
          {realms.map((realm, i) => (
            <span
              key={realm.name}
              className={`h-[6px] w-[6px] rounded-full transition-colors ${i === active ? 'bg-gold' : 'bg-cream/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
