import Image from 'next/image'
import { images } from '@/lib/content'
import { OpenStatus } from '@/components/booking/OpenStatus'
import { ButtonLink } from './ui/ButtonLink'
import { FeaturedCarousel } from './FeaturedCarousel'

export function Hero() {
  return (
    <section className="relative flex min-h-[970px] items-center bg-ink px-4 pt-[112px] pb-12 md:min-h-[900px] md:px-10" data-hero>
      <div className="absolute inset-0" data-hero-bg>
        <Image
          src={images.danceFloor}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[.34] saturate-[.75]"
        />
      </div>
      <div className="absolute top-[-140px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold/[.14] blur-[45px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,10,5,0.72),rgba(21,10,5,0.05)_28%,rgba(21,10,5,0.18)_60%,#150a05_96%)]" />
      <div className="relative mx-auto w-full max-w-[1100px]">
        <div className="flex flex-col items-center gap-5 lg:mb-[15px]">
          <p
            className="flex items-center gap-[9px] rounded-full border border-gold/35 bg-gold/[.05] px-[18px] py-2 text-[10.2px] leading-[1.6] font-bold tracking-[3.07px] whitespace-nowrap text-gold uppercase"
            data-hero-kicker
          >
            <i className="h-[6px] w-[6px] rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)]" />
            <OpenStatus />
          </p>
          <h1 className="text-center font-display text-[clamp(42px,11vw,74px)] leading-[1.06] font-bold tracking-[-0.02em] text-cream [&_em]:text-gold-gradient">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>India’s First</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                <em>Tribal Luxe Experience</em>
              </span>
            </span>
          </h1>
          <div className="my-[10px] mb-2 flex flex-col items-center gap-4 md:flex-row" data-hero-actions>
            <ButtonLink href="#reservations">Reserve a Table</ButtonLink>
            <ButtonLink href="#events" variant="secondary" icon={false}>
              Explore Tonight
            </ButtonLink>
          </div>
          <p className="text-[11.5px] leading-[1.6] font-semibold tracking-[2.2px] text-cream/45 uppercase">
            Vagator, North Goa · Dinner &amp; Sundowners · Nightlife until late
          </p>
        </div>
        <FeaturedCarousel />
      </div>
    </section>
  )
}
