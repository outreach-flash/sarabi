import Image from 'next/image'
import Link from 'next/link'

import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { events, programs, realms } from '@/lib/content'
import { badgeParts } from '@/lib/format'

import { RealmReserveButton } from './RealmReserveButton'

type Realm = (typeof realms)[number]

/**
 * One realm section on /spaces. Desktop: a sticky image stage (parallaxed photo,
 * ambient wash, drifting numeral, chapter pill) holds while two text panels —
 * intro + bar program & events — scroll past. Mobile: everything stacks with
 * the image first.
 */
export function SpacesRealm({ realm, index }: { realm: Realm; index: number }) {
  const mirrored = index % 2 === 1
  const program = programs.find((p) => p.realm === realm.name)
  const realmEvents = events.filter((event) => event.realm === realm.name || event.realm === 'All Realms')

  return (
    <section
      id={realm.name.toLowerCase()}
      className="page-wrap scroll-mt-[calc(var(--header-h)+96px)] py-[55px] sm:py-[80px] lg:py-[60px]"
    >
      <div className="flex flex-col gap-[38px] sm:gap-[48px] lg:grid lg:grid-cols-2 lg:items-start lg:gap-[5%]">
        {/* Sticky image stage */}
        <div
          className={`lg:sticky lg:top-[calc(var(--header-h)+80px)] lg:h-[calc(100dvh-var(--header-h)-110px)] ${
            mirrored ? 'lg:order-2' : ''
          }`}
        >
          <div className="relative h-full min-h-[330px] overflow-hidden rounded-[18px] border border-line sm:min-h-[440px] lg:min-h-0">
            <Image
              src={realm.image}
              alt={realm.title}
              fill
              sizes="(min-width: 60rem) 46vw, 100vw"
              className="object-cover"
              data-parallax
            />
            <span className="absolute inset-0" style={{ backgroundImage: realm.ambient }} />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.6),rgba(21,10,5,0.05)_45%,rgba(21,10,5,0.35))]" />
            <span
              data-speed="0.12"
              className="pointer-events-none absolute -bottom-8 left-4 font-display text-[11rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgb(245_236_220/0.3)]"
            >
              {realm.numeral}
            </span>
            <span className="absolute top-5 left-5 rounded-full bg-ink/60 px-3 py-1.5 font-display text-[10px] font-bold tracking-[2.5px] text-cream/85 uppercase backdrop-blur-sm">
              {realm.chapter} · {realm.hour}
            </span>
          </div>
        </div>

        {/* Scrolling text column */}
        <div className={`flex flex-col ${mirrored ? 'lg:order-1' : ''}`}>
          <article className="flex flex-col justify-center lg:min-h-[calc(100dvh-var(--header-h)-110px)] lg:py-16">
            <p className="type-eyebrow mb-[22px] flex items-center gap-[14px] text-muted">
              <span className="h-px w-[35px] flex-none bg-muted" />
              {realm.chapter} · {realm.hour}
            </p>
            <p className="font-serif text-[15px] text-gold italic">Realm {realm.numeral}</p>
            <h2 className="mt-1 font-display text-[clamp(34px,4.6vw,54px)] leading-[1.08] font-bold text-cream">
              {realm.title}
            </h2>
            <p className="mt-2 font-serif text-[clamp(17px,1.6vw,21px)] leading-[1.35] text-cream/85 italic">
              {realm.tagline}
            </p>
            <p className="mt-4 text-[10px] font-bold tracking-[2.7px] text-gold uppercase">{realm.bar}</p>
            <p className="mt-6 max-w-[460px] text-[14.5px] leading-[1.75] font-light text-cream/66">
              {realm.copy}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <RealmReserveButton realm={realm.name} label={realm.cta} />
              <Link
                href="/#events"
                className="flex min-h-[46px] items-center justify-center rounded-full border border-gold/35 bg-gold/[0.04] px-[26px] py-[12px] font-display text-[11.5px] font-bold tracking-[1.75px] text-gold uppercase no-underline transition-transform hover:-translate-y-0.5"
              >
                See events
              </Link>
            </div>
          </article>

          <article
            className="flex flex-col justify-center gap-[26px] border-t border-line pt-[38px] pb-[10px] lg:min-h-[calc(100dvh-var(--header-h)-110px)] lg:border-t-0 lg:pt-16 lg:pb-16"
            data-stagger
          >
            {program ? (
              <div className="rounded-[14px] border border-gold/15 bg-[rgb(44_23_12/0.5)] p-[22px] sm:p-[26px]">
                <span className="type-eyebrow text-[9px] text-muted">At the bar</span>
                <h3 className="mt-3 font-display text-[19px] leading-[1.15] font-bold text-cream">{program.name}</h3>
                <p className="mt-2 text-[12.5px] leading-[1.75] font-light text-cream/60">{program.copy}</p>
              </div>
            ) : null}

            <div>
              <span className="type-eyebrow text-[9px] text-muted">Happening here</span>
              <ul className="mt-[14px] flex flex-col">
                {realmEvents.map((event) => {
                  const badge = badgeParts(event.date)
                  return (
                    <li key={event.id}>
                      <a
                        href={`/#event-${event.id}`}
                        className="group flex items-center gap-[16px] border-b border-line py-[14px] no-underline"
                      >
                        <span className="flex w-[46px] flex-none flex-col items-center gap-[2px] rounded-lg border border-gold/25 bg-gold/[0.06] py-[7px] text-[8px] leading-none font-extrabold tracking-[1.6px] text-gold uppercase">
                          <b className="font-display text-[16px] leading-none font-extrabold tracking-normal">{badge.day}</b>
                          {badge.month}
                        </span>
                        <span className="flex min-w-0 flex-col gap-[3px]">
                          <b className="font-display text-[14.5px] leading-[1.2] font-bold text-cream transition-colors group-hover:text-gold">
                            {event.title}
                          </b>
                          <small className="text-[9.3px] leading-[1.5] font-bold tracking-[2px] text-gold/70 uppercase">
                            {event.genre}
                          </small>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <MediaPanel
              image={realm.detailImage}
              alt={realm.title}
              variant="frame"
              className="min-h-[200px] sm:min-h-[260px]"
            />
          </article>
        </div>
      </div>
    </section>
  )
}
