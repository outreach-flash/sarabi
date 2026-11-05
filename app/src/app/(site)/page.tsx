import { MotionExperience } from '@/components/motion/MotionExperience'
import { Discover } from '@/components/site/Discover'
import { Events } from '@/components/site/Events'
import { Founders } from '@/components/site/Founders'
import { Gallery } from '@/components/site/Gallery'
import { Hero } from '@/components/site/Hero'
import { Marquee } from '@/components/site/Marquee'
import { Menu } from '@/components/site/Menu'
import { Performance } from '@/components/site/Performance'
import { Realms } from '@/components/site/Realms'
import { Reservations } from '@/components/site/Reservations'
import { Testimonials } from '@/components/site/Testimonials'

export default function Home() {
  return (
    <>
      <MotionExperience />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Realms />
        <Discover />
        <Events />
        <Founders />
        <Performance />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservations />
      </main>
    </>
  )
}
