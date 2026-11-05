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

        // The Realms signature sequence: scrubbed clip-path crossfades between realm
        // images with a subtle scale settle and yPercent parallax. Desktop, motion allowed.
        mm.add('(min-width: 60rem) and (prefers-reduced-motion: no-preference)', () => {
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
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      document.fonts.ready.then(refresh).catch(() => undefined)
      cleanup = () => {
        window.removeEventListener('load', refresh)
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
