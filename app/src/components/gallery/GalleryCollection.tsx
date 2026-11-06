'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'
import { SectionHeading } from '@/components/pages/ui/SectionHeading'
import { galleryMomentFilters, galleryMoments, type GalleryMomentFilter } from '@/lib/content'

type Moment = (typeof galleryMoments)[number]

export function GalleryCollection() {
  const [filter, setFilter] = useState<GalleryMomentFilter>('All')
  const [selected, setSelected] = useState<Moment | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const visible = useMemo(
    () => galleryMoments.filter((item) => filter === 'All' || item.category === filter),
    [filter],
  )

  useEffect(() => {
    if (selected) dialogRef.current?.showModal()
  }, [selected])

  return (
    <section className="page-wrap py-[58px] sm:py-[90px]">
      <SectionHeading
        eyebrow="Inside Sarabi"
        title={
          <>
            Moments worth <em className="em-accent">revisiting.</em>
          </>
        }
        copy="Browse the collection by category. Select an image to view it larger, or tap a video preview to open its media slot."
      />
      <div className="mt-[25px] mb-[20px] flex flex-wrap gap-[10px]" role="group" aria-label="Gallery filters">
        {galleryMomentFilters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-[16px] py-[8px] font-display text-[8px] font-bold tracking-[1px] uppercase transition-colors ${
              filter === item
                ? 'border-transparent bg-gold text-cocoa'
                : 'border-line text-cream/60 hover:text-gold'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 wide:grid-cols-4" data-stagger>
        {visible.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSelected(item)}
            className={`relative flex flex-col overflow-hidden rounded-[5px] border border-line text-left transition-colors hover:border-gold/55 ${
              item.wide ? 'col-span-2 min-h-[280px] sm:min-h-[360px]' : 'col-span-1 min-h-[190px] sm:min-h-[220px]'
            }`}
          >
            <MediaPanel
              variant="frame"
              image={item.image}
              alt={item.title}
              className="media-panel-frame-fill absolute inset-0 min-h-0"
            />
            <span className="absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(21,10,5,0.85),rgba(21,10,5,0.05)_55%)]" />
            <span className="z-[2] mt-auto flex flex-col p-4">
              <strong className="font-display text-[12px] font-semibold text-cream">{item.title}</strong>
              <small className="mt-[4px] text-[9px] text-cream/48">
                {item.category} · {item.type}
              </small>
            </span>
            <i className="absolute right-[14px] bottom-[14px] z-[3] font-display text-[8px] font-bold text-gold uppercase not-italic">
              {item.type === 'Video' ? 'Play' : 'View'}
            </i>
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-label={selected ? selected.title : 'Gallery item'}
        className="h-dvh w-full max-w-none flex-col items-center justify-center bg-[rgb(10_4_2/0.92)] p-[5vw] backdrop-blur-[12px] open:flex"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
      >
        <button
          type="button"
          className="absolute top-[28px] right-[32px] cursor-pointer border-0 bg-transparent font-display text-[10px] font-bold tracking-[1px] text-gold uppercase"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
        {selected ? (
          <>
            <MediaPanel
              variant="frame"
              image={selected.image}
              alt={selected.title}
              parallax={false}
              className="w-[92vw] min-h-[55vh] wide:w-[min(950px,75vw)] wide:min-h-[min(620px,70vh)]"
            />
            <div className="mt-[18px] w-[92vw] sm:absolute sm:bottom-[7vw] sm:left-[9vw] sm:mt-0 sm:w-auto">
              <PageEyebrow>
                {selected.category} · {selected.type}
              </PageEyebrow>
              <h2 className="type-page-title mt-[10px] text-[33px] leading-[1.12] sm:text-[38px]">
                {selected.title}
              </h2>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  )
}
