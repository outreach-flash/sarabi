'use client'

import { useEffect, useRef, useState } from 'react'
import { realms } from '@/lib/content'

/**
 * Sticky realm navigator for /spaces, following the MenuTabs pattern. An
 * IntersectionObserver marks the realm currently in view with a gold
 * underline and progress line.
 */
export function SpacesNav() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = realms
      .map((realm) => document.getElementById(realm.name.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = sections.findIndex((section) => section === entry.target)
          if (index >= 0) setCurrent(index)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      const first = sections[0]
      const last = sections[sections.length - 1]
      const start = first.offsetTop
      const end = last.offsetTop + last.offsetHeight - window.innerHeight
      if (end <= start) return
      const value = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
      setProgress(value)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Realms"
      className="sticky top-[var(--header-h)] z-10 flex h-[54px] items-center justify-center gap-[25px] border-y border-line bg-ink/93 backdrop-blur-[14px] sm:h-[64px] sm:gap-[72px]"
    >
      {realms.map((realm, i) => (
        <a
          key={realm.name}
          href={`#${realm.name.toLowerCase()}`}
          className={`relative border-b border-transparent px-[2px] py-[8px] font-display text-[8px] font-bold tracking-[1px] whitespace-nowrap text-cream/52 uppercase no-underline transition-colors hover:border-gold hover:text-gold sm:text-[10px] sm:tracking-[2px] ${
            i === current ? 'border-gold text-gold' : ''
          }`}
        >
          {realm.numeral} {realm.title}
        </a>
      ))}
      <span
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-px bg-gold/70 transition-[width] duration-200"
        style={{ width: `${progress * 100}%` }}
      />
    </nav>
  )
}
