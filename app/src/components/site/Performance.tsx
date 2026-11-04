import Image from 'next/image'
import { images } from '@/lib/content'
import { ButtonLink } from './ui/ButtonLink'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

const tags = ['Live Acts', 'Fire Performances', 'Resident DJs', 'Pride Rock Sessions']

export function Performance() {
  return (
    <section className="relative min-h-[660px] overflow-hidden border-y border-line" data-performance>
      <div className="absolute inset-0" data-performance-bg>
        <Image
          src={images.firePerformer}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,10,5,0.95),rgba(21,10,5,0.65)_52%,rgba(21,10,5,0.3))]" />
      <div className="relative mx-auto max-w-[1200px] px-5 py-[88px] pb-20 lg:px-10" data-reveal>
        <SectionLabel>05 — Performances</SectionLabel>
        <DisplayTitle className="max-w-[510px]">
          A <em>spectacle</em> for the senses
        </DisplayTitle>
        <p className="max-w-[496px] text-[16px] leading-[1.6] font-light text-cream/75">
          Fire and drums under open sky. Sets that build like rituals. Pride Rock comes alive after midnight — part theatre, part ceremony, all Sarabi.
        </p>
        <div className="my-7 mb-8 flex flex-wrap gap-[11px]">
          {tags.map((tag) => (
            <b
              key={tag}
              className="rounded-full border border-gold/35 bg-ink/50 px-[17px] py-[9px] text-[9.6px] leading-[1.6] font-bold tracking-[2.3px] text-gold uppercase backdrop-blur-[3px]"
            >
              {tag}
            </b>
          ))}
        </div>
        <ButtonLink href="#gallery">See the Gallery</ButtonLink>
      </div>
    </section>
  )
}
