import Image from 'next/image'
import { realms } from '@/lib/content'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

export function Realms() {
  return (
    <section id="realms" className="relative px-5 py-20 md:px-10 md:py-[110px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[50px] grid gap-[25px] md:grid-cols-[1fr_auto] md:items-end" data-reveal>
          <div>
            <SectionLabel>01 — The Realms</SectionLabel>
            <DisplayTitle>
              Three realms. <em>One</em>
              <br /> extraordinary night.
            </DisplayTitle>
          </div>
          <p className="max-w-[384px] text-[16px] leading-[1.6] font-light text-cream/66">
            Every realm has its own bar identity, its own ritual, its own hour. Move between them — or stay until the mirage fades.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {realms.map((realm) => (
            <article
              key={realm.name}
              className="relative flex min-h-[420px] items-end overflow-hidden rounded-[18px] border border-line bg-brown md:min-h-[540px]"
              data-reveal
            >
              <Image src={realm.image} alt="" fill sizes="(min-width: 960px) 33vw, (min-width: 700px) 33vw, 100vw" className="object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.94)_4%,rgba(21,10,5,0.14)_55%,rgba(21,10,5,0.08))]" />
              <div className="relative w-full p-[30px]">
                <em className="font-serif text-[14.4px] leading-[1.6] text-gold italic">Realm {realm.numeral}</em>
                <h3 className="mt-1 font-display text-[27.2px] leading-[1.6] font-bold">{realm.name}</h3>
                <small className="text-[9.6px] leading-[1.6] font-bold tracking-[2.7px] text-gold uppercase">{realm.bar}</small>
                <p className="my-[10px] mb-[19px] text-[13.6px] leading-[1.6] font-light text-cream/68">{realm.copy}</p>
                <footer className="flex gap-[21px] border-t border-line pt-4">
                  <a href="#reservations" className="flex items-center gap-[6px] text-[10.2px] leading-[1.6] font-bold tracking-[2.25px] text-gold uppercase no-underline">
                    Reserve here
                  </a>
                  <a href="/spaces" className="flex items-center gap-[6px] text-[10.2px] leading-[1.6] font-bold tracking-[2.25px] text-cream uppercase no-underline">
                    Explore <Image src={arrowUpRight} alt="" width={11} height={11} />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
