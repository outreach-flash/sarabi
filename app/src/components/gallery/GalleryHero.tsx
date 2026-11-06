import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'
import { images } from '@/lib/content'

export function GalleryHero() {
  return (
    <section className="page-wrap flex flex-col items-start pt-[140px] text-left sm:items-center sm:pt-[165px] sm:text-center">
      <div className="flex w-full flex-col items-start sm:items-center" data-hero-copy>
        <PageEyebrow>The Sarabi experience</PageEyebrow>
        <h1 className="type-page-title my-[13px] text-[42px] leading-[1.02] sm:my-[17px] sm:mb-[12px] sm:text-[54px] wide:text-[clamp(55px,6vw,86px)]">
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              Performances & <em className="em-accent">Gallery.</em>
            </span>
          </span>
        </h1>
        <p className="type-page-body max-w-[780px]" data-hero-actions>
          A closer look at the performances, nights and moments that shape the Sarabi experience. Explore the
          collection through photography and video supplied by the venue.
        </p>
      </div>
      <MediaPanel
        variant="frame"
        image={images.rooftopParty}
        alt="A rooftop party under the lights at Sarabi"
        className="mt-[35px] w-full min-h-[230px] sm:mt-[58px] sm:min-h-[500px]"
      />
    </section>
  )
}
