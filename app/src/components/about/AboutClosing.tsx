import { ReserveButton } from '@/components/site/ReservationNotice'
import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { AboutEyebrow } from './ui/AboutEyebrow'

export function AboutClosing() {
  return (
    <section
      id="visit"
      className="bg-[linear-gradient(#150a05,#1b0b05)] px-5 pt-[93px] pb-[72px] text-center sm:bg-none sm:px-[4%] sm:py-28 wide:px-[max(5.5%,calc((100vw-1280px)/2))]"
    >
      <AboutEyebrow centered>Your Sarabi Experience</AboutEyebrow>
      <h2 className="type-about-title mt-4 block text-[36.8px] tracking-[-1.47px] text-cream sm:mt-[17px] sm:flex sm:flex-wrap sm:justify-center sm:gap-x-3 sm:text-[57.6px] sm:tracking-[-2.3px] [&_em]:em-accent [&_em]:block sm:[&_em]:inline">
        Find your place in
        <em>the story.</em>
      </h2>
      <p className="mx-auto mt-[18px] max-w-[620px] text-[13.6px] leading-[1.7] font-light text-cream/60">
        Explore the three spaces, see what’s coming up, or plan a visit. Choose the next step that suits your night.
      </p>
      <div className="mt-[31px] flex flex-col items-center gap-[13px] sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center">
        <ButtonLink href="/#realms" size="sm" icon={false} className="max-sm:min-w-[216px]">
          Discover the Spaces
        </ButtonLink>
        <ButtonLink href="/#events" size="sm" variant="secondary" icon={false} className="max-sm:min-w-[216px]">
          Explore Events
        </ButtonLink>
        <ReserveButton size="sm" icon={false} className="max-sm:hidden">
          Book a Table
        </ReserveButton>
      </div>
    </section>
  )
}
