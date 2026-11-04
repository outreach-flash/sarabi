import type { Metadata } from 'next'

import { MotionExperience } from '@/components/motion/MotionExperience'
import { MenuCategory } from '@/components/menu/MenuCategory'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuTabs } from '@/components/menu/MenuTabs'
import { CenterCta } from '@/components/pages/ui/CenterCta'
import { ReserveButton } from '@/components/site/ReservationNotice'
import { ButtonLink } from '@/components/site/ui/ButtonLink'
import { menuCategories } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Signatures, cocktails and kitchen selections at Sarabi.',
}

export default function MenuPage() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <MenuHero />
        <MenuTabs />
        {menuCategories.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
        <CenterCta
          eyebrow="Make a night of it"
          title={
            <>
              Find your table. <em className="em-accent">Stay for the experience.</em>
            </>
          }
          copy="Ready to visit Sarabi? Get in touch or use the confirmed reservation link to plan your evening."
          minH="min-h-[380px] sm:min-h-[500px]"
        >
          <ReserveButton size="sm" icon={false}>
            Book a table
          </ReserveButton>
          <ButtonLink href="/spaces" size="sm" variant="secondary" icon={false}>
            Explore the spaces
          </ButtonLink>
        </CenterCta>
      </main>
    </>
  )
}
