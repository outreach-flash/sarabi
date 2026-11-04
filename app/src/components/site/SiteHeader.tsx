'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { menuLinks, navLinks } from '@/lib/content'
import { Brand } from './ui/Brand'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isCurrent = (href: string) => !href.startsWith('/#') && pathname.startsWith(href)

  const linkClass = (href: string) =>
    `text-[10px] font-bold tracking-[1.8px] text-cream/75 uppercase no-underline transition-colors hover:text-gold ${
      isCurrent(href) ? 'text-gold' : ''
    }`

  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-[18px] md:px-10">
      <Brand />
      <nav className="hidden gap-[18px] md:flex lg:gap-[26px]" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isCurrent(link.href) ? 'page' : undefined}
            className={linkClass(link.href)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        className="flex flex-col gap-[6px] border-0 bg-transparent p-2 md:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="h-[1.5px] w-[26px] bg-cream" />
        <span className="h-[1.5px] w-[26px] bg-cream" />
        <span className="h-[1.5px] w-[26px] bg-cream" />
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-ink/98 px-5 pt-[18px] pb-[30px] backdrop-blur-[18px] md:px-10"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-start justify-between">
            <Brand />
            <button
              className="border-0 bg-transparent text-[40px] leading-none font-light text-cream"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav className="mt-[12vh] flex flex-col" aria-label="Menu overlay navigation">
            {menuLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
                className="flex items-baseline gap-[22px] border-b border-line py-4 font-display text-[clamp(25px,7vw,42px)] leading-[1.1] font-bold text-cream no-underline"
              >
                <small className="text-[10px] font-bold tracking-[2px] text-muted">0{i + 1}</small>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
