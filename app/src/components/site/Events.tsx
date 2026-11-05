import { EventsGrid } from './EventsGrid'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Events() {
  return (
    <section
      id="events"
      className="relative bg-[radial-gradient(circle_at_105%_45%,rgb(150_128_108/0.16),transparent_22%)] px-5 py-20 md:px-10 md:py-[110px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[50px] grid gap-[25px] md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <SectionLabel>03 — Upcoming Events</SectionLabel>
            <DisplayTitle>
              Your next
              <br />
              <em>unforgettable</em> night
            </DisplayTitle>
          </div>
          <p className="max-w-[384px] text-[16px] leading-[1.6] font-light text-cream/66">
            Every event lists its door and show times, what the pass includes and the draft price — no surprises at the gate.
          </p>
        </div>
        <EventsGrid />
      </div>
    </section>
  )
}
