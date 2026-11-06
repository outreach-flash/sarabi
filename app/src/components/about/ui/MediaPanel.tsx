import Image from 'next/image'
import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

export function MediaPanel({
  children,
  image,
  alt = '',
  variant = 'default',
  className = '',
  parallax = true,
  scaleReveal = false,
}: {
  children?: ReactNode
  image?: StaticImageData
  alt?: string
  variant?: 'default' | 'hero' | 'card' | 'frame'
  className?: string
  /** Set false when another effect (e.g. data-scale-reveal) owns the image's transform. */
  parallax?: boolean
  /** Scrubbed clip-path + scale expansion as the panel scrolls into view. */
  scaleReveal?: boolean
}) {
  const variantClass = {
    default: 'media-panel',
    hero: 'media-panel media-panel-hero',
    card: 'media-panel media-panel-card',
    frame: 'media-panel media-panel-frame',
  }[variant]
  return (
    <div className={`${variantClass} ${className}`} {...(scaleReveal ? { 'data-scale-reveal': true } : {})}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 56.25rem) 100vw, 50vw"
          className="object-cover"
          {...(parallax ? { 'data-parallax': true } : {})}
        />
      ) : (
        <span className="relative text-center text-[9.3px] font-normal tracking-[2.25px] text-gold/62 uppercase">
          {children}
        </span>
      )}
    </div>
  )
}
