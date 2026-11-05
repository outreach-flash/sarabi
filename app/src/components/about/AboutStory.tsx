import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { aboutCopy } from '@/lib/content'
import { AboutEyebrow } from './ui/AboutEyebrow'
import { MediaPanel } from './ui/MediaPanel'

export function AboutStory() {
  return (
    <section id="story" className="px-5 py-[72px] sm:px-[4%] sm:py-28 wide:px-[max(5.5%,calc((100vw-1280px)/2))]">
      <div className="mx-auto flex w-[min(1280px,100%)] flex-col gap-8 sm:grid sm:grid-cols-2 sm:items-center sm:gap-[7%] wide:gap-[7.9%]">
        <MediaPanel className="w-full min-h-[300px] sm:min-h-[530px]">Brand story image / video placeholder</MediaPanel>
        <div className="flex flex-col items-start">
          <AboutEyebrow>About Sarabi</AboutEyebrow>
          <h2 className="type-about-title mt-4 text-[36px] tracking-[-1.44px] text-cream sm:mt-[17px] sm:text-[32px] sm:tracking-[-1.28px] wide:text-[57.6px] wide:tracking-[-2.3px] [&_em]:em-accent [&_em]:block">
            India’s First
            <em>Tribal Luxe Experience</em>
          </h2>
          {aboutCopy.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-[14.4px] leading-[2] font-light text-cream/66">
              {paragraph}
            </p>
          ))}
          <ButtonLink href="#experience" variant="secondary" size="sm" icon={false} className="mt-[22px]">
            Explore the Spaces ↗
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
