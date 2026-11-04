import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'

export function GettingHere() {
  return (
    <section className="page-wrap block py-[60px] sm:grid sm:grid-cols-2 sm:gap-[40px] wide:grid-cols-[0.7fr_1.3fr] wide:gap-[64px] wide:py-[80px]">
      <div data-reveal>
        <PageEyebrow>Getting here</PageEyebrow>
        <h2 className="type-page-title mt-[12px] text-[33px] leading-[1.12] sm:text-[38px] wide:text-[clamp(38px,4vw,56px)]">
          See you in <em className="em-accent">Vagator.</em>
        </h2>
      </div>
      <p className="type-page-body mt-[24px] border-l border-line pl-[25px] sm:mt-0 sm:self-center" data-reveal>
        Find Sarabi on Ozran Beach Road, near Prabhu Villa, in Vagator, Goa. Use the directions link above for
        turn-by-turn navigation. Add any venue-approved parking, landmark or arrival instructions here before
        launch.
      </p>
    </section>
  )
}
