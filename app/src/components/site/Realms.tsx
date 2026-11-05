import { RealmsCarousel } from './realms/RealmsCarousel'
import { RealmsSequence } from './realms/RealmsSequence'
import { ReserveButton } from './ReservationNotice'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Realms() {
  return (
    <section id="realms" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[50px] grid gap-[25px] md:grid-cols-[1fr_auto] md:items-end" data-reveal>
          <div>
            <SectionLabel>01 — The Realms</SectionLabel>
            <DisplayTitle>
              Three realms. <em>One</em>
              <br /> extraordinary night.
            </DisplayTitle>
          </div>
          <p className="max-w-[384px] text-[16px] leading-[1.6] font-light text-cream/66">
            Every realm has its own bar identity, its own ritual, its own hour. Move between them — or stay until the mirage fades.
          </p>
        </div>
      </div>

      <RealmsSequence />

      <div className="mx-auto max-w-[1200px] lg:hidden">
        <RealmsCarousel />
      </div>

      <div className="mx-auto mt-[70px] flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <p className="max-w-[460px] font-display text-[clamp(24px,3.4vw,34px)] leading-[1.2] font-bold text-cream">
          One night, three realms — <em className="text-gold-gradient">find yours.</em>
        </p>
        <ReserveButton>Reserve your realm</ReserveButton>
      </div>
    </section>
  )
}
