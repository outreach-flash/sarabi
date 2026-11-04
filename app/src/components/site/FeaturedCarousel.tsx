'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { featuredEvents } from '@/lib/content'
import chevronLeft from '@/assets/icons/chevron-left.svg'
import chevronRight from '@/assets/icons/chevron-right.svg'
import carouselDots from '@/assets/icons/carousel-dots.svg'

export function FeaturedCarousel() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  const moveFeatured = (direction: number) => {
    const next = (featuredIndex + direction + featuredEvents.length) % featuredEvents.length
    setFeaturedIndex(next)
    carousel.current?.children[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <>
      <div
        ref={carousel}
        aria-label="Featured events this week"
        className="scrollbar-none mt-2 grid grid-flow-col gap-[14px] overflow-x-auto pt-9 pb-4 snap-x snap-mandatory auto-cols-[min(74vw,300px)] px-[max(16px,calc((100%_-_280px)/2))] md:auto-cols-[250px] md:px-[max(16px,calc((100%_-_250px)/2))] lg:auto-cols-[235px] lg:px-4"
      >
        {featuredEvents.map((event, i) => (
          <a
            key={event.title}
            href="#events"
            onFocus={() => setFeaturedIndex(i)}
            onClick={() => setFeaturedIndex(i)}
            className={`relative aspect-[257/352] snap-center overflow-hidden rounded-[14px] border bg-brown transition-[border-color,box-shadow,transform] duration-300 ${
              featuredIndex === i
                ? '-translate-y-1 border-gold/55 shadow-[0_0_40px_rgb(253_216_167/0.2),0_20px_40px_-12px_#000]'
                : 'border-line'
            }`}
          >
            <Image src={event.image} alt="" fill sizes="(min-width: 960px) 235px, (min-width: 700px) 250px, min(74vw, 300px)" className="object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.94)_4%,rgba(21,10,5,0.14)_55%,rgba(21,10,5,0.08))]" />
            <span className="absolute top-[14px] left-[14px] flex flex-col items-center gap-[3px] rounded-lg bg-gold px-[10px] py-[6px] text-[8.8px] leading-none font-extrabold tracking-[1.76px] text-cocoa uppercase">
              <b className="font-display text-[18.4px] leading-none font-extrabold tracking-normal">{event.date}</b>
              {event.month}
            </span>
            <span className="absolute right-4 bottom-4 left-4 flex flex-col gap-[5px] text-cream">
              <b className="font-display text-[15.2px] leading-[1.15] font-bold">{event.title}</b>
              <small className="text-[9.3px] leading-[1.5] font-bold tracking-[2px] text-gold uppercase">{event.meta}</small>
            </span>
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between lg:mx-auto lg:max-w-[680px]">
        <button onClick={() => moveFeatured(-1)} aria-label="Previous event" className="rounded-full border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-[1.08]">
          <Image src={chevronLeft} alt="" width={56} height={56} />
        </button>
        <Image src={carouselDots} alt="" width={112} height={44} className="object-contain" />
        <button onClick={() => moveFeatured(1)} aria-label="Next event" className="rounded-full border-0 bg-transparent p-0 transition-transform duration-200 hover:scale-[1.08]">
          <Image src={chevronRight} alt="" width={56} height={56} />
        </button>
      </div>
      <p className="text-center text-[9.6px] leading-[1.6] font-semibold tracking-[2.7px] text-cream/35 uppercase lg:mx-auto lg:max-w-[680px]">
        Tap a poster · Swipe on mobile
      </p>
    </>
  )
}
