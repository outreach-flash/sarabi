import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { images } from '@/lib/content'

export function SpacesHero() {
  return (
    <section className="flex flex-col items-start bg-[radial-gradient(circle_at_55%_35%,rgb(116_62_33/0.28),transparent_28rem),linear-gradient(#1c0c06,#150a05)] px-4 pt-[130px] pb-[55px] sm:items-center sm:px-8 sm:pt-[145px] sm:pb-[70px] sm:text-center wide:min-h-[1280px] wide:px-[5vw] wide:pb-[100px]">
      <div className="flex w-full flex-col items-start sm:items-center" data-hero-copy>
        <h1 className="type-page-title flex max-w-[850px] flex-col text-[42px] leading-[1.08] sm:text-[44px] sm:leading-[1.05] wide:text-[clamp(52px,5.4vw,86px)]">
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              Three spaces.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="mt-[4px] block max-w-[320px] sm:max-w-none" data-hero-line>
              <em className="em-accent">One extraordinary experience.</em>
            </span>
          </span>
        </h1>
        <p className="type-page-body mx-auto mt-[19px] mb-[22px] max-w-[560px] sm:mt-[25px] sm:mb-[28px]" data-hero-actions>
          Every night at Sarabi moves through three realms — from sunset pours above the fields, to tables set in
          the water, to the wildest dance floor in Vagator. Find the one that fits your night.
        </p>
        <div data-hero-actions>
          <ButtonLink href="#pond" size="sm" icon={false}>
            Explore the realms
          </ButtonLink>
        </div>
      </div>
      <MediaPanel
        image={images.sundeckSunset}
        alt="Golden hour over the Sarabi Sundeck"
        variant="frame"
        scaleReveal
        className="mt-[38px] w-full min-h-[230px] sm:mt-[65px] sm:min-h-[420px] wide:mt-[100px] wide:min-h-[570px]"
      />
    </section>
  )
}
