import Image from 'next/image'
import Link from 'next/link'
import { images, mapUrl, phones, practicalInfo, whatsappUrl } from '@/lib/content'
import { OpenStatus } from '@/components/booking/OpenStatus'
import mapPin from '@/assets/icons/map-pin.svg'
import { ReservationTabs } from './ReservationTabs'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Reservations() {
  return (
    <section id="reservations" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel>09 — Reservations</SectionLabel>
          <DisplayTitle>
            Your table is <em>waiting</em>
          </DisplayTitle>
          <p className="text-[16px] leading-[1.6] font-light text-cream/66">
            Walk-ins are welcomed, but the realms fill fast. Reserve a table or book an event pass — our team confirms every request personally.
          </p>
          <div className="mt-8">
            <ReservationTabs />
          </div>
          <noscript>
            <div className="mt-8 rounded-2xl border border-line bg-brown-2/40 p-6">
              <p className="text-[13.6px] leading-[1.6] font-light text-cream/66">
                The booking form needs JavaScript. Call us at{' '}
                <a className="text-gold no-underline" href={`tel:${phones[0].replace(/\s/g, '')}`}>
                  {phones[0]}
                </a>{' '}
                or{' '}
                <a className="text-gold no-underline" href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>{' '}
                to reserve.
              </p>
            </div>
          </noscript>
        </div>

        <div className="flex flex-col gap-10">
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[18px] border border-line no-underline"
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

          <dl className="border-t border-line">
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Hours</dt>
              <dd className="text-[14.7px] leading-[1.6] font-light text-cream/85">
                <OpenStatus />
                <small className="block text-[12.2px] text-cream/45">Monday — Thursday · 7 PM — 4 AM</small>
                <small className="block text-[12.2px] text-cream/45">Friday — Sunday · 7 PM — 5 AM</small>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Contact</dt>
              <dd className="text-[14.7px] leading-[1.6] font-light text-cream/85">
                {phones.map((phone) => (
                  <a key={phone} className="block text-cream/85 no-underline hover:text-gold" href={`tel:${phone.replace(/\s/g, '')}`}>
                    {phone}
                  </a>
                ))}
                <a className="mt-1 block text-[12.2px] text-gold no-underline" href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp for groups, VIP tables &amp; assistance
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-6 border-b border-line py-[19px]">
              <dt className="text-[9.6px] leading-[1.6] font-extrabold tracking-[2.7px] text-muted uppercase">Good to know</dt>
              <dd>
                <ul className="grid gap-2">
                  {practicalInfo.map((item) => (
                    <li key={item.label} className="text-[12.8px] leading-[1.6] font-light text-cream/70">
                      <b className="mr-2 text-[9.6px] font-extrabold tracking-[2.2px] text-gold uppercase">{item.label}</b>
                      {'href' in item && item.href ? (
                        <Link href={item.href} className="text-cream/85 no-underline hover:text-gold">
                          {item.value}
                        </Link>
                      ) : (
                        item.value
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
