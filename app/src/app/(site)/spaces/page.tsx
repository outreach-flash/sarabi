import type { Metadata } from 'next'

import { MotionExperience } from '@/components/motion/MotionExperience'
import { CenterCta } from '@/components/pages/ui/CenterCta'
import { ReserveButton } from '@/components/site/ReservationNotice'
import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { realms } from '@/lib/content'
import { SpacesHero } from '@/components/spaces/SpacesHero'
import { SpacesIntro } from '@/components/spaces/SpacesIntro'
import { SpacesNav } from '@/components/spaces/SpacesNav'
import { SpacesRealm } from '@/components/spaces/SpacesRealm'

export const metadata: Metadata = {
  title: 'Spaces',
  description: 'Three distinct spaces — Pond, Den and Sundeck — that make up the Sarabi experience.',
}

export default function SpacesPage() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <SpacesHero />
        <SpacesIntro />
        <SpacesNav />
        {realms.map((realm, index) => (
          <SpacesRealm key={realm.name} realm={realm} index={index} />
        ))}
        <CenterCta
          eyebrow="Make it your night"
          title={
            <>
              Your place at Sarabi <em className="em-accent">is waiting.</em>
            </>
          }
          copy="See what’s coming up at Sarabi or get in touch to plan your visit."
        >
          <ButtonLink href="/#events" size="sm" icon={false}>
            See upcoming events
          </ButtonLink>
          <ReserveButton size="sm" icon={false} variant="secondary">
            Book a table
          </ReserveButton>
        </CenterCta>
      </main>
    </>
  )
}
