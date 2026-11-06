import { images } from '@/lib/content'
import { AboutEyebrow } from './ui/AboutEyebrow'
import { MediaPanel } from './ui/MediaPanel'

export function AboutInspiration() {
  return (
    <section id="inspiration" className="px-5 py-[72px] sm:px-[4%] sm:py-28 wide:px-[max(5.5%,calc((100vw-1280px)/2))]">
      <div className="mx-auto flex w-[min(1280px,100%)] flex-col gap-8 sm:grid sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:gap-[5%] wide:gap-[6.25%]">
        <MediaPanel
          image={images.firePerformer}
          alt="A fire performer at Sarabi"
          scaleReveal
          className="w-full min-h-[280px] sm:min-h-[410px]"
        />
        <div className="flex flex-col items-start">
          <AboutEyebrow>The Inspiration</AboutEyebrow>
          <h2 className="type-about-title mt-4 text-[32px] tracking-[-1.44px] text-cream sm:mt-[17px] sm:tracking-[-1.28px] wide:text-[57.6px] wide:tracking-[-2.3px] [&_em]:em-accent [&_em]:block">
            A story told with
            <em>intention.</em>
          </h2>
          <p className="mt-5 text-[14.4px] leading-[2] font-light text-cream/66">
            Use this section only after Sarabi confirms the cultural references it wants to communicate, the
            factual details behind them, and the language it approves for publication.
          </p>
          <p className="mt-5 text-[14.4px] leading-[2] font-light text-cream/66">
            The project brief mentions Maasai inspiration, while the wireframe records that the final cultural
            narrative still requires client confirmation. This placeholder deliberately avoids presenting an
            unapproved interpretation as fact.
          </p>
          <aside className="mt-[22px] border-l-2 border-gold bg-gold/5 p-[15px_19px] text-[11.2px] leading-[1.7] font-light text-cream/55">
            Production copy pending brand-story approval. Do not publish cultural claims, symbolism or origin details
            until verified by the client.
          </aside>
        </div>
      </div>
    </section>
  )
}
