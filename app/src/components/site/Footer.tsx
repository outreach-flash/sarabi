import Image from 'next/image'
import Link from 'next/link'
import { footerColumns, hours } from '@/lib/content'
import facebook from '@/assets/icons/facebook.svg'
import instagram from '@/assets/icons/instagram.svg'
import { Brand } from './ui/Brand'

const externalProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank' as const, rel: 'noreferrer' as const } : {}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2 pb-16">
      <div className="text-outline py-[45px] pb-[10px] text-center font-display text-[clamp(57px,16vw,180px)] leading-none font-extrabold tracking-[.1em]">
        SARABI
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-[38px] px-5 py-[35px] pb-[45px] md:grid-cols-[2fr_repeat(3,1fr)] md:px-10">
        <div className="col-span-2 flex flex-col items-start md:col-span-1">
          <Brand />
          <p className="my-[14px] mb-2 max-w-[280px] text-[13.4px] leading-[1.6] font-light text-cream/50">
            A modern tribal-luxe dining and mixology destination across three realms — Pond, Sundeck and Den — in the heart of Vagator, Goa.
          </p>
          <div className="mt-[7px] flex gap-[11px]">
            <Link href="/" aria-label="Instagram" className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line text-cream/75 no-underline">
              <Image src={instagram} alt="Instagram" width={16} height={16} />
            </Link>
            <Link href="/" aria-label="Facebook" className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line text-cream/75 no-underline">
              <Image src={facebook} alt="Facebook" width={16} height={16} />
            </Link>
            <Link href="/#events" className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line font-display text-[8.8px] font-extrabold text-cream/75 no-underline">
              SMS
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h4 className="mb-[18px] text-[9.9px] leading-[1.6] font-extrabold tracking-[3px] text-muted uppercase">Explore</h4>
          {footerColumns.explore.map((link) => (
            <a key={link.label} href={link.href} {...externalProps(link.href)} className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58 no-underline">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-start">
          <h4 className="mb-[18px] text-[9.9px] leading-[1.6] font-extrabold tracking-[3px] text-muted uppercase">Visit</h4>
          <p className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58">Vagator, North Goa</p>
          <p className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58">Mon–Thu · {hours[0].value}</p>
          <p className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58">Fri–Sun · {hours[1].value}</p>
          {footerColumns.visit.map((link) => (
            <a key={link.label} href={link.href} {...externalProps(link.href)} className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58 no-underline">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-start">
          <h4 className="mb-[18px] text-[9.9px] leading-[1.6] font-extrabold tracking-[3px] text-muted uppercase">Contact</h4>
          {footerColumns.contact.map((link) => (
            <a key={link.label} href={link.href} {...externalProps(link.href)} className="mb-[10px] text-[13.4px] leading-[1.6] font-light text-cream/58 no-underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 border-t border-line px-5 py-[21px] text-[10.2px] leading-[1.6] tracking-[1.4px] text-cream/35 md:flex-row md:justify-between md:px-10">
        <span>© 2026 Sarabi, Vagator. All rights reserved.</span>
        <span>Crafted with devotion · Savour the Mirage</span>
      </div>
    </footer>
  )
}
