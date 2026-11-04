import type { Metadata } from 'next'

import { AboutClosing } from '@/components/about/AboutClosing'
import { AboutEthos } from '@/components/about/AboutEthos'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutInspiration } from '@/components/about/AboutInspiration'
import { AboutStory } from '@/components/about/AboutStory'
import { MotionExperience } from '@/components/motion/MotionExperience'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story, spaces and ethos behind Sarabi, Vagator.',
}

export default function AboutPage() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <AboutHero />
        <AboutStory />
        <AboutEthos />
        <AboutInspiration />
        <AboutClosing />
      </main>
    </>
  )
}
