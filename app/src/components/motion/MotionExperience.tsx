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
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (document.querySelector('[data-hero-kicker]')) {
          entrance.from('[data-hero-kicker]', { y: 16, opacity: 0, duration: 0.8 }, 0.15)
        }
        entrance
          .from('[data-hero-line]', { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.14 }, 0.25)
          .from('[data-hero-actions]', { y: 20, opacity: 0, duration: 0.85 }, 0.85)

        if (document.querySelector('[data-hero-bg]')) {
          gsap.to('[data-hero-bg]', {
            yPercent: 11,
            scale: 1.13,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.8 },
          })
          gsap.to('[data-hero-copy]', {
            yPercent: -12,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hero]', start: '35% top', end: 'bottom top', scrub: 0.8 },
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
