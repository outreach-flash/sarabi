import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { AboutEyebrow } from './ui/AboutEyebrow'
import { MediaPanel } from './ui/MediaPanel'

export function AboutStory() {
  return (
    <section id="story" className="px-5 py-[72px] sm:px-[4%] sm:py-28 wide:px-[max(5.5%,calc((100vw-1280px)/2))]">
      <div className="mx-auto flex w-[min(1280px,100%)] flex-col gap-8 sm:grid sm:grid-cols-2 sm:items-center sm:gap-[7%] wide:gap-[7.9%]">
        <MediaPanel className="w-full min-h-[300px] sm:min-h-[530px]">Brand story image / video placeholder</MediaPanel>
        <div className="flex flex-col items-start">
          <AboutEyebrow>The Story</AboutEyebrow>
          <h2 className="type-about-title mt-4 text-[36px] tracking-[-1.44px] text-cream sm:mt-[17px] sm:text-[32px] sm:tracking-[-1.28px] wide:text-[57.6px] wide:tracking-[-2.3px] [&_em]:em-accent [&_em]:block">
            More than a place.
            <em>A feeling.</em>
          </h2>
          <p className="mt-5 text-[14.4px] leading-[2] font-light text-cream/66">
            This is the opening brand-story section. Use it to explain what Sarabi is, what guests can expect, and
            the idea behind the venue. The final copy should come directly from Sarabi’s approved brand narrative.
          </p>
          <p className="mt-5 text-[14.4px] leading-[2] font-light text-cream/66">
            Keep the story concise and specific. Avoid unverified origin stories, cultural claims, awards, or
            credentials until the client has supplied and approved the supporting information.
          </p>
          <ButtonLink href="#experience" variant="secondary" size="sm" icon={false} className="mt-[22px]">
            Explore the Spaces ↗
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
