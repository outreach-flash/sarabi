import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { MediaPanel } from './ui/MediaPanel'

export function AboutHero() {
  return (
    <section
      data-hero
      className="relative bg-[radial-gradient(ellipse_28%_38%_at_74%_35%,rgb(116_62_33/0.35),transparent_55%),linear-gradient(#1c0c06,#150a05)]"
    >
      <div className="relative mx-auto flex w-full flex-col items-center gap-8 px-5 pt-32 pb-14 sm:gap-10 sm:px-[4%] sm:pt-[120px] sm:pb-0 wide:min-h-[843px] wide:flex-row wide:items-center wide:gap-0 wide:px-[5%] wide:py-[120px]">
        <div className="relative z-[2] w-full text-center wide:w-[48%] wide:text-left" data-hero-copy>
          <h1 className="flex flex-col items-center font-display text-[48px] leading-[1.12] font-bold tracking-[-1.92px] text-cream sm:flex-row sm:items-baseline sm:text-[46.1px] sm:tracking-[-1.84px] wide:flex-col wide:items-start wide:text-[clamp(60px,6vw,86.4px)] wide:tracking-[-3.46px] [&_em]:em-accent [&_em]:ml-0 [&_em]:block sm:[&_em]:ml-3 sm:[&_em]:inline wide:[&_em]:ml-0 wide:[&_em]:block">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                A world of its
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                <em>own.</em>
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-[23px] max-w-[255px] text-[13.1px] leading-[1.9] font-light text-cream/68 sm:mx-0 sm:mt-6 sm:max-w-[490px] sm:text-[14.4px]">
            A story-led introduction to Sarabi. Replace this supporting copy with the brand narrative approved by
            the Sarabi team.
          </p>
          <div
            className="mt-[31px] flex flex-col items-center gap-[13px] sm:mt-8 sm:flex-row sm:flex-wrap"
            data-hero-actions
          >
            <ButtonLink href="/#realms" size="sm" className="max-sm:min-h-[54px]">
              Discover the Realms
            </ButtonLink>
            <ButtonLink href="/#events" size="sm" variant="secondary" icon={false}>
              Explore Events
            </ButtonLink>
          </div>
        </div>
        <MediaPanel variant="hero" className="w-full min-h-[290px] sm:min-h-[501px] wide:absolute wide:inset-[15%_5%_15%_46%] wide:min-h-0 wide:w-auto">
          Replace with approved Sarabi brand film / photography
        </MediaPanel>
      </div>
    </section>
  )
}
