import { InfoCard } from '@/components/pages/ui/InfoCard'
import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'
import { buttonLinkStyles } from '@/components/site/ui/ButtonLink'
import { address, directionsUrl, hours, phones, whatsappUrl } from '@/lib/content'

import { MapPanel } from './MapPanel'

export function VisitDetails() {
  return (
    <section className="page-wrap flex flex-col gap-[45px] pt-[25px] pb-[60px] sm:grid sm:grid-cols-2 sm:gap-[42px] sm:pt-[64px] sm:pb-[72px] wide:grid-cols-[0.9fr_1.1fr] wide:gap-[86px] wide:pt-[72px] wide:pb-[96px]">
      <div data-stagger>
        <PageEyebrow>Contact & reservations</PageEyebrow>
        <h2 className="type-page-title mx-[0] my-[14px] mb-[6px] text-[34px] leading-[1.12] sm:text-[42px] wide:text-[56px]">
          Come find <em className="em-accent">us.</em>
        </h2>
        <p className="type-page-body mb-[28px]">Everything you need to plan your visit.</p>
        <InfoCard title="Find Sarabi" mark="01">
          <p className="text-[13px] leading-[1.8] text-cream/67">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <a
            className={`${buttonLinkStyles('secondary', 'sm')} mt-[10px]`}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Get directions ↗</span>
          </a>
        </InfoCard>
        <InfoCard title="Opening hours" mark="02">
          <p className="text-[13px] leading-[1.8] text-cream/67">
            {hours.map((row) => (
              <span key={row.label} className="block">
                {row.label} <b className="font-normal text-cream">{row.value}</b>
              </span>
            ))}
          </p>
          <small className="mt-[4px] block text-[10px] text-cream/38">Hours cross midnight into the following day.</small>
        </InfoCard>
        <InfoCard title="Call the venue" mark="03">
          <p className="text-[13px] leading-[1.8] text-cream/67">
            {phones.map((phone) => (
              <span key={phone} className="block">
                {phone}
              </span>
            ))}
          </p>
          <div className="mt-[8px] flex flex-wrap gap-[12px]">
            <a className={buttonLinkStyles('secondary', 'sm')} href="tel:+918655334751">
              <span>Call Sarabi</span>
            </a>
            <a className={buttonLinkStyles('secondary', 'sm')} href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>WhatsApp ↗</span>
            </a>
          </div>
        </InfoCard>
      </div>
      <div className="order-first sm:order-none sm:sticky sm:top-[calc(var(--header-h)+24px)] sm:self-start">
        <MapPanel />
      </div>
    </section>
  )
}
