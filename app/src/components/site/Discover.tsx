import Image from 'next/image'
import { aboutCopy, images } from '@/lib/content'
import { ButtonLink } from './ui/ButtonLink'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Discover() {
  return (
    <section id="discover" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-reveal>
          <SectionLabel>02 — About Sarabi</SectionLabel>
          <DisplayTitle>
            India’s First <br />
            <em>Tribal Luxe Experience</em>
          </DisplayTitle>
          <div className="grid gap-4 text-[16px] leading-[1.6] font-light text-cream/66">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="my-[34px] mb-[32px] border-l-2 border-muted pl-5 font-serif text-[16px] leading-[1.6] text-cream/85 italic">
            “Sarabi is my devotion — three years of sculpting, breaking, rebuilding and believing.”
            <cite className="mt-[10px] block text-[9.9px] leading-[1.6] font-bold tracking-[2.6px] text-gold uppercase not-italic">
              — Khushank Arora, Founder
            </cite>
          </blockquote>
          <ButtonLink href="#realms" variant="secondary">
            Discover the Realms
          </ButtonLink>
        </div>
        <div className="relative self-center">
          <div className="overflow-hidden rounded-[18px] border border-line shadow-[0_0_70px_rgb(253_216_167/0.12)]">
            <div data-clip-reveal>
              <Image
                src={images.sunkenSeating}
                alt="Sunken seating carved into dark stone at Sarabi, Vagator"
                className="max-h-[650px] min-h-[368px] w-full object-cover"
                sizes="(min-width: 960px) 50vw, 100vw"
              />
            </div>
          </div>
          <div className="absolute right-[13px] bottom-[21px] flex w-[190px] flex-col gap-[10px] rounded-[14px] bg-gold-gradient px-[19px] pt-4 pb-[19px] text-cocoa shadow-[0_0_17px_rgb(253_216_167/0.4)]">
            <b className="font-display text-[15.2px] leading-[1.25] font-bold">Every threshold ceremonial</b>
            <small className="text-[9.3px] leading-[1.6] font-extrabold tracking-[1.85px] uppercase opacity-70">12,000 sq ft of atmosphere</small>
          </div>
        </div>
      </div>
    </section>
  )
}
