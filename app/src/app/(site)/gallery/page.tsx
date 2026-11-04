import type { Metadata } from 'next'

import { MotionExperience } from '@/components/motion/MotionExperience'
import { CenterCta } from '@/components/pages/ui/CenterCta'
import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { GalleryCollection } from '@/components/gallery/GalleryCollection'
import { GalleryHero } from '@/components/gallery/GalleryHero'
import { GalleryStory } from '@/components/gallery/GalleryStory'

export const metadata: Metadata = {
  title: 'Performances & Gallery',
  description: 'Performances, nights and moments from the Sarabi experience.',
}

export default function GalleryPage() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <GalleryHero />
        <GalleryCollection />
        <GalleryStory />
        <CenterCta
          eyebrow="Make your own memories"
          title={
            <>
              Be part of the <em className="em-accent">next moment.</em>
            </>
          }
          copy="Discover what’s coming up at Sarabi and plan your visit."
          minH="min-h-[380px] sm:min-h-[400px]"
        >
          <ButtonLink href="/#events" size="sm" icon={false}>
            Explore events ↗
          </ButtonLink>
        </CenterCta>
      </main>
    </>
  )
}
