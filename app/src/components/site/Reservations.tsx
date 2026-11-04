import Image from 'next/image'
import { images, mapUrl } from '@/lib/content'
import mapPin from '@/assets/icons/map-pin.svg'
import whatsapp from '@/assets/icons/whatsapp.svg'
import { ReserveButton } from './ReservationNotice'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Reservations() {
  return (
    <section id="reservations" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-reveal>
          <SectionLabel>09 — Reservations</SectionLabel>
          <DisplayTitle>
            Your table is <em>waiting</em>
          </DisplayTitle>
          <p className="text-[16px] leading-[1.6] font-light text-cream/66">
            Walk-ins are welcomed, but the realms fill fast. Reserve ahead — our team confirms every request personally.
          </p>
          <dl className="mt-[30px] border-t border-line">
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Find Us</dt>
              <dd className="text-[14.7px] leading-[1.6] font-light text-cream/85">
                Sarabi, Vagator
                <small className="block text-[12.2px] text-cream/45">North Goa, India</small>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Hours</dt>
              <dd className="text-[14.7px] leading-[1.6] font-light text-cream/85">
                Monday — Thursday · 7 PM — 4 AM
                <small className="block text-[12.2px] text-cream/45">Friday — Sunday · 7 PM — 5 AM</small>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Contact</dt>
              <dd className="text-[14.7px] leading-[1.6] font-light text-cream/85">+91</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <ReserveButton icon={whatsapp}>WhatsApp Us</ReserveButton>
            <ReserveButton variant="secondary">Call the Den</ReserveButton>
          </div>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[18px] border border-line no-underline"
          data-reveal
        >
          <Image src={images.rooftopParty} alt="" fill sizes="(min-width: 960px) 50vw, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-ink/58" />
          <div className="relative flex flex-col items-center gap-[6px] text-cream">
            <i className="mb-[10px] grid h-[56px] w-[56px] place-items-center rounded-full bg-gold-gradient shadow-[0_0_0_12px_rgb(253_216_167/0.15),0_0_40px_rgb(253_216_167/0.4)]">
              <Image src={mapPin} alt="" width={22} height={22} />
            </i>
            <b className="font-display text-[20px] leading-[1.6] font-bold">Vagator, North Goa</b>
            <small className="text-[9.9px] leading-[1.6] font-bold tracking-[2.6px] uppercase">Get Directions</small>
          </div>
          <strong className="absolute bottom-[18px] left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-[30px] py-[15px] font-display text-[12.5px] leading-[1.6] font-bold tracking-[1.75px] whitespace-nowrap text-cocoa uppercase shadow-[0_0_26px_rgb(253_216_167/0.3)]">
            Open in Maps
          </strong>
        </a>
      </div>
    </section>
  )
}
