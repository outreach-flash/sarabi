import Image from 'next/image'
import { events } from '@/lib/content'
import arrowRightGoldSm from '@/assets/icons/arrow-right-gold-sm.svg'
import { ButtonLink } from './ui/ButtonLink'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Events() {
  return (
    <section
      id="events"
      className="relative bg-[radial-gradient(circle_at_105%_45%,rgb(150_128_108/0.16),transparent_22%)] px-5 py-20 md:px-10 md:py-[110px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[50px] grid gap-[25px] md:grid-cols-[1fr_auto] md:items-end" data-reveal>
          <div>
            <SectionLabel>04 — Upcoming Events</SectionLabel>
            <DisplayTitle>
              Your next
              <br />
              <em>unforgettable</em> night
            </DisplayTitle>
          </div>
          <ButtonLink href="#events" variant="secondary" iconSrc={arrowRightGoldSm}>
            View all events
          </ButtonLink>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <article key={event.title} className="overflow-hidden rounded-[18px] border border-line bg-[linear-gradient(160deg,#2e180d,#26130a)]" data-reveal>
              <Image
                src={event.image}
                alt=""
                className="aspect-[350/382] w-full object-cover"
                sizes="(min-width: 960px) 25vw, (min-width: 700px) 50vw, 100vw"
              />
              <div className="p-[18px]">
                <small className="text-[9.3px] leading-[1.6] font-bold tracking-[2.4px] text-muted uppercase">{event.realm}</small>
                <h3 className="mt-1 font-display text-[19.2px] leading-[1.2] font-bold">{event.title}</h3>
                <p className="mt-[7px] text-[12.2px] leading-[1.6] font-medium text-cream/50">{event.time}</p>
                <footer className="mt-[22px] flex items-center justify-between font-display text-[10px] leading-[1.6] font-bold tracking-[2px] text-gold uppercase">
                  <b>Book Now</b>
                  <a href="#reservations" className="rounded-full border border-gold/35 bg-gold/10 px-[15px] py-[7px] text-gold no-underline">
                    Get Tickets
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
