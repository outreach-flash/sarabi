import Image from 'next/image'
import Link from 'next/link'
import calendar from '@/assets/icons/calendar.svg'

export function StickyBook() {
  return (
    <Link
      href="/#reservations"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-[11px] bg-gold-gradient px-4 py-[15px] font-display text-[11.5px] leading-[1.6] font-extrabold tracking-[2.53px] whitespace-nowrap text-cocoa uppercase no-underline shadow-[0_-10px_17px_rgb(0_0_0/0.5)] lg:right-7 lg:bottom-7 lg:left-auto lg:rounded-full lg:px-6"
    >
      <Image src={calendar} alt="" width={15} height={15} />
      Book a Table
    </Link>
  )
}
