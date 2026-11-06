import { ethos, images } from '@/lib/content'
import { AboutEyebrow } from './ui/AboutEyebrow'
import { MediaPanel } from './ui/MediaPanel'

const ethosImages = [images.cocktails, images.bookBand, images.pond] as const
const ethosSpeeds = [0, 0.08, 0.16] as const

export function AboutEthos() {
  return (
    <section
      id="experience"
      className="px-5 pt-[91px] pb-[72px] sm:px-[4%] sm:pt-[115px] sm:pb-24 wide:px-[max(5.5%,calc((100vw-1280px)/2))]"
    >
      <div className="mx-auto mb-14 max-w-[760px] text-center">
        <AboutEyebrow centered>What Defines the Experience</AboutEyebrow>
        <h2 className="type-about-title mt-4 block text-[32px] tracking-[-1.44px] text-cream sm:mt-[17px] sm:flex sm:flex-nowrap sm:justify-center sm:gap-[7px] sm:tracking-[-1.28px] wide:flex-wrap wide:justify-center wide:gap-x-3 wide:text-[57.6px] wide:tracking-[-2.3px] [&_em]:em-accent [&_em]:block sm:[&_em]:inline wide:[&_em]:inline">
          Designed around
          <em>the experience.</em>
        </h2>
        <p className="mx-auto mt-[18px] max-w-[620px] text-[13.6px] leading-[1.7] font-light text-cream/60">
          Three short editorial blocks to communicate Sarabi’s ethos and experience. Replace each placeholder with
          approved brand copy and matching imagery.
        </p>
      </div>
      <div className="mx-auto grid w-[min(1280px,100%)] grid-cols-1 gap-[13px] sm:grid-cols-3 sm:items-start sm:gap-4">
        {ethos.map((card, i) => (
          <article
            key={card.number}
            data-reveal
            data-stack-card
            data-speed={ethosSpeeds[i]}
            style={{ top: `calc(var(--header-h) + ${12 + i * 16}px)` }}
            className="grid min-h-[172px] grid-cols-[36%_64%] overflow-hidden rounded-[13px] border border-gold/15 bg-[rgb(44_23_12/0.72)] max-lg:sticky sm:block sm:min-h-0"
          >
            <MediaPanel
              variant="card"
              image={ethosImages[i]}
              alt={card.title}
              className="min-h-[170px] sm:min-h-[210px]"
            />
            <div className="min-h-[170px] pt-[23px] pr-4 pb-4 pl-4 sm:min-h-[180px] sm:px-6 sm:pt-[31px] sm:pb-6">
              <span className="text-[9.1px] tracking-[2px] text-muted">{card.number}</span>
              <h3 className="mt-3 font-display text-[16px] leading-[1.12] font-bold tracking-[-0.77px] text-cream wide:text-[19.2px]">
                {card.title}
              </h3>
              <p className="mt-3 text-[11.2px] leading-[1.8] font-light text-cream/58 wide:text-[12.5px]">
                {card.copy}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
