import type { Metadata } from 'next'

import { MotionExperience } from '@/components/motion/MotionExperience'
import { GettingHere } from '@/components/visit/GettingHere'
import { VisitBooking } from '@/components/visit/VisitBooking'
import { VisitDetails } from '@/components/visit/VisitDetails'
import { VisitHero } from '@/components/visit/VisitHero'

export const metadata: Metadata = {
  title: 'Visit',
  description: 'Find Sarabi on Ozran Beach Road, Vagator — hours, directions and reservations.',
}

export default function VisitPage() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <VisitHero />
        <VisitDetails />
        <VisitBooking />
        <GettingHere />
      </main>
    </>
  )
}
