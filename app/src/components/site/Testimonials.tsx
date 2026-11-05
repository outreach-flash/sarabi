import Image from 'next/image'
import { images } from '@/lib/content'
import { ReserveButton } from './ReservationNotice'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

const testimonialSources = ['Google Review', 'Instagram Guest', 'TripAdvisor Review']

export function Testimonials() {
  return (
    <section className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <SectionLabel className="justify-center">08 — Testimonials</SectionLabel>
          <DisplayTitle>
            Don’t just take <em>our</em>
            <br /> word for it
          </DisplayTitle>
        </div>
        <div className="mt-[45px] grid gap-5 md:grid-cols-3">
          {testimonialSources.map((source) => (
            <figure
              key={source}
              className="rounded-[18px] border border-line bg-[linear-gradient(160deg,#2e180d,#26130a)] p-[32px] px-[29px]"
            >
              <b className="font-serif text-[48px] leading-none text-gold [text-shadow:0_0_20px_rgb(253_216_167/0.5)]">“</b>
              <blockquote className="my-[18px] mb-[22px] font-serif text-[16px] leading-[1.55] text-cream/40 italic">
                Client testimonial to be supplied — approved review will appear here before launch.
              </blockquote>
              <figcaption className="border-t border-dashed border-gold/35 pt-4 text-[9.9px] leading-[1.6] font-bold tracking-[2.38px] text-gold uppercase">
                {source}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="my-[30px] mb-9 text-center text-[10.9px] leading-[1.6] tracking-[1.5px] text-cream/35">
          Real, approved guest reviews only — no placeholders go live.
        </p>
        <div className="relative flex min-h-[330px] flex-col items-start justify-center gap-8 overflow-hidden rounded-[22px] border border-gold/35 p-[35px]">
          <Image src={images.bookBand} alt="" fill sizes="100vw" className="object-cover" />
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,10,5,0.96),rgba(21,10,5,0.55))]" />
          <h3 className="relative max-w-[420px] font-display text-[27.2px] leading-[1.15] font-bold [&_em]:font-serif [&_em]:font-normal [&_em]:text-gold-gradient">
            Make your own memories — <em>book tonight.</em>
          </h3>
          <ReserveButton className="relative">Book a Table</ReserveButton>
        </div>
      </div>
    </section>
  )
}
