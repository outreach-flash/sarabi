import Image from 'next/image'
import { images, programs } from '@/lib/content'
import { ButtonLink } from './ui/ButtonLink'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Menu() {
  return (
    <section id="menu" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-reveal>
          <SectionLabel>06 — Menu</SectionLabel>
          <DisplayTitle>
            A taste of <em>Sarabi</em>
          </DisplayTitle>
          <p className="text-[16px] leading-[1.6] font-light text-cream/66">
            Global body, Indian soul, progressive spirit — crafted uniquely for each realm.
          </p>
          <div className="my-[30px] grid gap-[14px]">
            {programs.map((program) => (
              <article key={program.name} className="grid grid-cols-[80px_1fr] gap-[21px] rounded-[16px] border border-line bg-brown/55 p-[21px] px-[22px]">
                <small className="pt-[6px] text-[9.3px] leading-[1.6] font-extrabold tracking-[2.4px] text-olive uppercase">{program.realm}</small>
                <div>
                  <h3 className="font-display text-[17.6px] leading-[1.6] font-bold">{program.name}</h3>
                  <p className="text-[12.8px] leading-[1.6] text-cream/58">{program.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <ButtonLink href="/menu" variant="secondary" icon={false}>
            View the full menu
          </ButtonLink>
        </div>
        <div className="relative self-center" data-reveal>
          <div className="overflow-hidden rounded-[18px] border border-line shadow-[0_0_70px_rgb(253_216_167/0.12)]">
            <div data-parallax>
              <Image
                src={images.cocktails}
                alt="Signature cocktails served at golden hour"
                className="max-h-[650px] min-h-[368px] w-full object-cover"
                sizes="(min-width: 960px) 50vw, 100vw"
              />
            </div>
          </div>
          <div className="absolute right-[13px] bottom-[21px] flex w-[190px] flex-col gap-[10px] rounded-[14px] bg-gold-gradient px-[19px] pt-4 pb-[19px] text-cocoa shadow-[0_0_17px_rgb(253_216_167/0.4)]">
            <b className="font-display text-[15.2px] leading-[1.25] font-bold">Crafted per realm</b>
            <small className="text-[9.3px] leading-[1.6] font-extrabold tracking-[1.85px] uppercase opacity-70">No two menus alike</small>
          </div>
        </div>
      </div>
    </section>
  )
}
