import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { images } from '@/lib/content'

export function MenuHero() {
  return (
    <section className="page-wrap flex flex-col items-stretch gap-[30px] pt-[140px] pb-[55px] sm:grid sm:grid-cols-2 sm:items-center sm:gap-[64px] sm:pb-0 wide:min-h-[730px] wide:grid-cols-[0.9fr_1.1fr] wide:pt-[120px]">
      <div data-hero-copy>
        <h1 className="type-page-title flex flex-col text-[43px] leading-[1.08] sm:text-[56px] wide:text-[clamp(56px,6vw,86px)]">
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              The menu.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              <em className="em-accent max-w-[600px]">Made for discovery.</em>
            </span>
          </span>
        </h1>
        <p className="type-page-body mt-[20px] mb-[25px] max-w-[500px]" data-hero-actions>
          Explore the food and drink offering at Sarabi. Browse signatures, cocktails and kitchen selections,
          with each item presented as part of the wider experience.
        </p>
        <div data-hero-actions>
          <ButtonLink href="#signatures" size="sm" icon={false}>
            Explore the menu ↓
          </ButtonLink>
        </div>
      </div>
      <MediaPanel
        variant="frame"
        image={images.cocktails}
        alt="Signature cocktails at Sarabi"
        className="w-full min-h-[250px] sm:min-h-[360px] wide:min-h-[430px]"
      />
    </section>
  )
}
