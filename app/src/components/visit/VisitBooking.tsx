import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'
import { buttonLinkStyles } from '@/components/site/ui/ButtonLink'
import { whatsappUrl } from '@/lib/content'

export function VisitBooking() {
  return (
    <section className="bg-[radial-gradient(circle_at_50%,rgb(112_55_26/0.28),transparent_45%)] py-[60px] sm:py-[72px] sm:pb-[80px]">
      <div className="page-wrap block sm:flex sm:items-end sm:justify-between sm:gap-[60px] wide:items-center">
        <div data-reveal>
          <PageEyebrow>Reservations</PageEyebrow>
          <h2 className="type-page-title my-[15px] max-w-[650px] text-[34px] leading-[1.12] sm:text-[42px] wide:text-[56px]">
            Make it a night to <em className="em-accent">remember.</em>
          </h2>
          <p className="type-page-body max-w-[700px]">
            Until the online reservation link is confirmed, the Book a Table action opens WhatsApp so you can
            contact Sarabi directly. A message does not confirm a reservation.
          </p>
        </div>
        <div className="mt-[25px] flex flex-wrap gap-[12px] sm:mt-0" data-reveal>
          <a className={buttonLinkStyles('primary', 'sm')} href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>Book a table on WhatsApp ↗</span>
          </a>
          <a className={buttonLinkStyles('secondary', 'sm')} href="tel:+918655334751">
            <span>Call us</span>
          </a>
        </div>
      </div>
    </section>
  )
}
