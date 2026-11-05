'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { realms } from '@/lib/content'
import { openBooking } from '@/components/booking/openBooking'

/**
 * Desktop scrollytelling for the Realms. The left stage is sticky and holds
 * the stacked realm images; the right column scrolls three text chapters.
 * The active image swaps with a plain opacity toggle (reduced motion / no
 * GSAP); MotionExperience layers a scrubbed clip-path crossfade on top when
 * motion is allowed.
 */
export function RealmsSequence() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [chapterActive, setChapterActive] = useState(0)
  const [imageActive, setImageActive] = useState(0)
  const [gsapActive, setGsapActive] = useState(false)

  useEffect(() => {
    const onMotion = () => setGsapActive(true)
    window.addEventListener('sarabi:realms-motion', onMotion)
    return () => window.removeEventListener('sarabi:realms-motion', onMotion)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const chapters = Array.from(root.querySelectorAll('[data-realm-chapter]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = chapters.indexOf(entry.target)
          if (index < 0) return
          setChapterActive(index)
          // When GSAP owns the images, leave their inline styles alone.
          if (!root.hasAttribute('data-gsap')) setImageActive(index)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} data-realms-sequence className="relative hidden lg:block">
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2">
        <div className="relative">
          <div className="sticky top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-hidden rounded-[18px] border border-line bg-brown">
            {realms.map((realm, i) => (
              <div
                key={realm.name}
                data-realm-image-wrap
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: gsapActive ? undefined : imageActive === i ? 1 : 0 }}
              >
                <Image
                  src={realm.image}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                  data-realm-image
                />
              </div>
            ))}
            {realms.map((realm, i) => (
              <div
                key={realm.ambient}
                className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                style={{ opacity: chapterActive === i ? 1 : 0, backgroundImage: realm.ambient }}
              />
            ))}
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,10,5,0.68),rgba(21,10,5,0.05)_45%,rgba(21,10,5,0.42))]" />
            <span
              data-realm-numeral
              className="pointer-events-none absolute -bottom-6 left-4 font-display text-[13rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgb(245_236_220/0.3)] [text-shadow:0_2px_28px_rgb(21_10_5/0.55)]"
            >
              {realms[chapterActive].numeral}
            </span>
            <span className="absolute top-5 right-5 rounded-full bg-ink/60 px-3 py-1.5 font-display text-[12px] font-bold tracking-[3px] text-cream/85 uppercase backdrop-blur-sm">
              <b data-realm-progress>{String(chapterActive + 1).padStart(2, '0')}</b> / 03
            </span>
          </div>
        </div>

        <div>
          {realms.map((realm) => (
            <article
              key={realm.name}
              data-realm-chapter
              className="flex min-h-dvh flex-col justify-center px-8 py-24 xl:px-16"
            >
              <p className="type-eyebrow mb-[22px] flex items-center gap-[14px] text-muted">
                <span className="h-px w-[35px] flex-none bg-muted" />
                {realm.chapter} · {realm.hour}
              </p>
              <p className="font-serif text-[15px] text-gold italic">Realm {realm.numeral}</p>
              <h3 className="mt-1 font-display text-[clamp(38px,4vw,56px)] leading-[1.08] font-bold text-cream">
                {realm.title}
              </h3>
              <p className="mt-2 font-serif text-[clamp(18px,1.7vw,22px)] leading-[1.35] text-cream/85 italic">{realm.tagline}</p>
              <p className="mt-4 text-[10px] font-bold tracking-[2.7px] text-gold uppercase">{realm.bar}</p>
              <p className="mt-6 max-w-[440px] text-[15.5px] leading-[1.75] font-light text-cream/66">
                {realm.copy}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openBooking({ flow: 'table', realm: realm.name })}
                  className="flex min-h-[46px] cursor-pointer items-center justify-center rounded-full bg-gold-gradient px-[26px] py-[12px] font-display text-[11.5px] font-bold tracking-[1.75px] text-cocoa uppercase transition-transform hover:-translate-y-0.5"
                >
                  {realm.cta}
                </button>
                <Link
                  href="/spaces"
                  className="flex min-h-[46px] items-center justify-center rounded-full border border-gold/35 bg-gold/[0.04] px-[26px] py-[12px] font-display text-[11.5px] font-bold tracking-[1.75px] text-gold uppercase no-underline transition-transform hover:-translate-y-0.5"
                >
                  Explore
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
