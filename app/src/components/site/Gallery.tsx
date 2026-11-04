'use client'

import Image from 'next/image'
import { useState } from 'react'
import { gallery, galleryFilters, type GalleryFilter } from '@/lib/content'
import { ButtonLink } from './ui/ButtonLink'
import { DisplayTitle } from './ui/DisplayTitle'
import { SectionLabel } from './ui/SectionLabel'

const itemSpans = [
  '',
  'md:row-span-2',
  '',
  '',
  '',
  'lg:col-span-2',
]

export function Gallery() {
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('All')

  return (
    <section
      id="gallery"
      className="relative bg-[radial-gradient(circle_at_110%_96%,rgb(107_113_76/0.14),transparent_22%)] px-5 py-20 md:px-10 md:py-[110px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionLabel>07 — Gallery</SectionLabel>
          <DisplayTitle>
            Inside <em>Sarabi</em>
          </DisplayTitle>
        </div>
        <div className="my-8 mb-7 flex flex-wrap gap-[9px]" aria-label="Filter gallery" data-reveal>
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setGalleryFilter(filter)}
              className={`rounded-full border px-[18px] py-[9px] font-display text-[9.9px] leading-none font-bold tracking-[2px] uppercase transition ${
                galleryFilter === filter
                  ? 'border-transparent bg-gold-gradient text-cocoa shadow-[0_0_11px_rgb(253_216_167/0.4)]'
                  : 'border-line bg-transparent text-cream/60'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:auto-rows-[280px] md:grid-cols-2 lg:grid-cols-3">
          {gallery
            .filter((item) => galleryFilter === 'All' || item.filter === galleryFilter)
            .map((item, i) => (
              <figure
                key={item.alt}
                className={`relative min-h-[230px] overflow-hidden rounded-[16px] border border-line md:min-h-0 ${itemSpans[i] ?? ''}`}
                data-reveal
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 960px) 33vw, (min-width: 700px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[600ms] hover:scale-[1.04]"
                />
              </figure>
            ))}
        </div>
        <div className="mt-10 flex justify-center" data-reveal>
          <ButtonLink href="/gallery" variant="secondary" icon={false}>
            See the full gallery
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
