import Image from 'next/image'
import { founders } from '@/lib/content'
import founder01 from '@/assets/images/founder-01-placeholder.webp'
import founder02 from '@/assets/images/founder-02-placeholder.webp'
import { DisplayTitle } from './ui/DisplayTitle'
import { RitualMark } from './RitualMark'
import { SectionLabel } from './ui/SectionLabel'

const founderImages = [founder01, founder02]

export function Founders() {
  return (
    <section id="founders" className="relative px-5 py-20 md:px-10 md:py-[110px]" aria-labelledby="founders-title">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[50px] grid gap-[25px] md:grid-cols-[1fr_auto] md:items-end" data-reveal>
          <div id="founders-title">
            <SectionLabel>04 — The Founders</SectionLabel>
            <DisplayTitle>
              Two visions.
              <br />
              <em>One mirage.</em>
            </DisplayTitle>
          </div>
          <p className="max-w-[384px] text-[16px] leading-[1.6] font-light text-cream/66">
            Behind every ritual is a pair of hands. Behind Sarabi, two stories of craft, courage and a shared belief in hospitality that lingers.
          </p>
        </div>
        <div className="grid gap-20 md:grid-cols-2 md:gap-12 lg:gap-20">
          {founders.map((founder, index) => (
            <article key={founder.name} className="relative" data-reveal>
              <RitualMark className="absolute -top-[2.4rem] -right-4 w-24 text-gold opacity-45" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[48%/18%] border border-line bg-brown">
                <Image
                  src={founderImages[index]}
                  alt={`Abstract portrait placeholder for founder ${index + 1}`}
                  fill
                  sizes="(min-width: 960px) 45vw, (min-width: 700px) 45vw, 100vw"
                  className="object-cover"
                  data-parallax
                />
                <span className="absolute right-4 bottom-4 left-4 z-[2] border-t border-gold/50 pt-[0.8rem] text-center text-[9.9px] font-bold tracking-[1.6px] text-cream uppercase">
                  Portrait placeholder · Final image to be supplied
                </span>
              </div>
              <div className="pt-7">
                <span className="font-serif text-[14.4px] text-gold italic">Story 0{index + 1}</span>
                <h3 className="mt-2 font-display text-[27.2px] leading-[1.2] font-bold">{founder.name}</h3>
                <p className="mt-2 mb-5 text-[9.9px] font-bold tracking-[2.6px] text-gold uppercase">{founder.role}</p>
                <p className="text-[13.6px] leading-[1.6] font-light text-cream/66">{founder.bio}</p>
                <blockquote className="mt-5 font-serif text-[16px] leading-[1.55] text-cream/85 italic">“{founder.quote}”</blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
