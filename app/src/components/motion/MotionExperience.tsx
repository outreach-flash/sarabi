'use client'

import { useEffect } from 'react'

export function MotionExperience() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    async function createMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        const mm = gsap.matchMedia()

        // Hero entrance: kicker + headline lines only — the actions stay put so booking is never delayed.
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (document.querySelector('[data-hero-kicker]')) {
          entrance.from('[data-hero-kicker]', { y: 16, opacity: 0, duration: 0.8 }, 0.15)
        }
        if (document.querySelector('[data-hero-line]')) {
          entrance.from('[data-hero-line]', { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.14 }, 0.25)
        }

        if (document.querySelector('[data-hero-bg]')) {
          gsap.to('[data-hero-bg]', {
            yPercent: 11,
            scale: 1.13,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.8 },
          })
        }
        if (document.querySelector('[data-performance]')) {
          gsap.to('[data-performance-bg]', {
            yPercent: 10,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-performance]', start: 'top bottom', end: 'bottom top', scrub: 0.9 },
          })
        }

        // Discover: a single clip-path image reveal, no pin.
        gsap.utils.toArray<HTMLElement>('[data-clip-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.2,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: element, start: 'top 82%', once: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 42,
            opacity: 0,
            duration: 1.05,
            ease: 'power3.out',
            onComplete: () => gsap.set(element, { clearProps: 'transform,opacity' }),
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
          gsap.fromTo(image,
            { yPercent: -4, scale: 1.12 },
            {
              yPercent: 4,
              scale: 1.03,
              ease: 'none',
              scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
            },
          )
        })

        // Inner-page hero copy drifts up and fades as its hero section scrolls away.
        gsap.utils.toArray<HTMLElement>('[data-hero-copy]').forEach((element) => {
          gsap.to(element, {
            y: -80,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: element.closest('section'),
              start: 'top top',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          })
        })

        // Scrubbed scale-reveal: an inset rounded frame expands to full bleed while
        // the photo inside settles from 1.15 to 1.
        gsap.utils.toArray<HTMLElement>('[data-scale-reveal]').forEach((element) => {
          const inner = element.querySelector('img:not([data-parallax])')
          const boundary = { trigger: element, start: 'top bottom', end: 'top 25%', scrub: 0.7 }
          gsap.fromTo(element,
            { clipPath: 'inset(6% 8% round 24px)' },
            { clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: boundary },
          )
          if (inner) {
            gsap.fromTo(inner, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: boundary })
          }
        })

        // Closing CTAs: a subtle scrubbed scale-in on top of the reveal.
        gsap.utils.toArray<HTMLElement>('[data-scale-in]').forEach((element) => {
          gsap.fromTo(element,
            { scale: 0.95 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top 92%', end: 'top 55%', scrub: 0.5 },
            },
          )
        })

        // Staggered child reveals.
        if (document.querySelector('[data-stagger]')) {
          ScrollTrigger.batch('[data-stagger] > *', {
            start: 'top 88%',
            once: true,
            onEnter: (batch) => {
              gsap.fromTo(batch,
                { y: 36, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', overwrite: true },
              )
            },
          })
        }

        // Desktop-only scroll effects: drift, sticky stacking cards and the realms sequence.
        mm.add('(min-width: 60rem) and (prefers-reduced-motion: no-preference)', () => {
          // Drift: elements tagged with data-speed float by speed × 100% of their own
          // height across their section's scroll — numerals, glows, offset columns.
          gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((element) => {
            const speed = Number(element.dataset.speed ?? 0)
            gsap.fromTo(element,
              { yPercent: -speed * 50 },
              {
                yPercent: speed * 50,
                ease: 'none',
                scrollTrigger: {
                  trigger: element.closest('section'),
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              },
            )
          })

          const sequence = document.querySelector<HTMLElement>('[data-realms-sequence]')
          if (!sequence) return
          // Tells the sequence's IntersectionObserver to leave image opacity to GSAP.
          sequence.setAttribute('data-gsap', '')
          window.dispatchEvent(new Event('sarabi:realms-motion'))

          const wrappers = gsap.utils.toArray<HTMLElement>('[data-realm-image-wrap]', sequence)
          const chapters = gsap.utils.toArray<HTMLElement>('[data-realm-chapter]', sequence)

          // Clip-path now controls visibility — release the wrappers from React's opacity state.
          gsap.set(wrappers, { opacity: 1 })

          wrappers.forEach((wrap) => {
            const img = wrap.querySelector<HTMLElement>('[data-realm-image]')
            if (!img) return
            gsap.fromTo(img,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: { trigger: sequence, start: 'top top', end: 'bottom bottom', scrub: 0.9 },
              },
            )
          })

          for (let i = 1; i < wrappers.length; i += 1) {
            const img = wrappers[i].querySelector<HTMLElement>('[data-realm-image]')
            const boundary = {
              trigger: chapters[i],
              start: 'top bottom',
              end: 'top 15%',
              scrub: true,
            }
            gsap.fromTo(wrappers[i],
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: boundary },
            )
            if (img) {
              gsap.fromTo(img,
                { scale: 1.08 },
                { scale: 1, ease: 'none', scrollTrigger: { ...boundary } },
              )
            }
          }
        })

        // Mobile-only: sticky stacking cards replace the desktop drift.
        mm.add('(max-width: 59.99rem) and (prefers-reduced-motion: no-preference)', () => {
          gsap.utils.toArray<HTMLElement>('[data-stack-card]').forEach((card, index, cards) => {
            const next = cards[index + 1]
            if (!next) return
            gsap.fromTo(card,
              { scale: 1, filter: 'brightness(1)' },
              {
                scale: 0.94,
                filter: 'brightness(0.6)',
                ease: 'none',
                scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
              },
            )
          })
        })
      })

      // Keep triggers correct when the layout shifts (gallery filter, image loads).
      const mainContent = document.getElementById('main-content')
      let resizeTimer: number | undefined
      const resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
      })
      if (mainContent) resizeObserver.observe(mainContent)

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      document.fonts.ready.then(refresh).catch(() => undefined)
      cleanup = () => {
        window.removeEventListener('load', refresh)
        window.clearTimeout(resizeTimer)
        resizeObserver.disconnect()
        context.revert()
      }
    }

    createMotion().catch(() => undefined)
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
