import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'

export function VisitHero() {
  return (
    <section className="page-wrap block pt-[145px] pb-[55px] sm:grid sm:min-h-[500px] sm:grid-cols-[1fr_0.8fr] sm:items-end sm:gap-[64px] wide:min-h-[540px] wide:pt-[160px] wide:pb-[64px]">
      <div data-hero-copy>
        <PageEyebrow>Find your way to Sarabi</PageEyebrow>
        <h1 className="type-page-title my-[13px] flex flex-col text-[42px] leading-[1.02] sm:my-[18px] sm:text-[54px] wide:text-[clamp(55px,6vw,86px)]">
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              Your table is
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              <em className="em-accent">waiting.</em>
            </span>
          </span>
        </h1>
        <p className="type-page-body max-w-[550px]" data-hero-actions>
          Find us, call us, or book in a few taps. We look forward to welcoming you to Sarabi, Vagator.
        </p>
      </div>
      <aside className="mt-[42px] mb-[12px] max-w-[360px] border-l border-gold/35 pl-[25px] sm:mt-0" data-reveal>
        <em className="font-serif text-[19px] leading-[1.4] text-gold italic">Plan your visit</em>
        <p className="type-page-body mt-[7px]">
          For table enquiries, contact the venue directly on WhatsApp or phone. Your message is an enquiry, not
          a confirmed reservation.
        </p>
      </aside>
    </section>
  )
}
