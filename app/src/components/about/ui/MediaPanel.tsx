import Image from 'next/image'
import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

export function MediaPanel({
  children,
  image,
  variant = 'default',
  className = '',
}: {
  children: ReactNode
  image?: StaticImageData
  variant?: 'default' | 'hero' | 'card' | 'frame'
  className?: string
}) {
  const variantClass = {
    default: 'media-panel',
    hero: 'media-panel media-panel-hero',
    card: 'media-panel media-panel-card',
    frame: 'media-panel media-panel-frame',
  }[variant]
  return (
    <div className={`${variantClass} ${className}`}>
      {image ? (
        <Image src={image} alt="" fill sizes="(max-width: 56.25rem) 100vw, 50vw" className="object-cover" />
      ) : (
        <span className="relative text-center text-[9.3px] font-normal tracking-[2.25px] text-gold/62 uppercase">
          {children}
        </span>
      )}
    </div>
  )
}
