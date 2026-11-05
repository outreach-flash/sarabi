import Link from 'next/link'

export function Brand() {
  return (
    <Link className="inline-flex flex-col text-cream no-underline" href="/" aria-label="Sarabi home">
      <strong className="font-display text-[20.8px] leading-none font-extrabold tracking-[6.24px]">SARABI</strong>
      <em className="mt-[5px] font-serif text-[9.9px] leading-none italic tracking-[0.4px] whitespace-nowrap text-gold">India’s First Tribal Luxe Experience</em>
    </Link>
  )
}
