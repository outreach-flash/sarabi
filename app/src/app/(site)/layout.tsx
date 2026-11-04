import { Footer } from '@/components/site/Footer'
import { ReservationNotice } from '@/components/site/ReservationNotice'
import { SiteHeader } from '@/components/site/SiteHeader'
import { StickyBook } from '@/components/site/StickyBook'

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh overflow-hidden bg-ink" id="top">
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[100] -translate-y-[150%] bg-gold px-4 py-3 text-cocoa no-underline focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <Footer />
      <StickyBook />
      <ReservationNotice />
    </div>
  )
}
