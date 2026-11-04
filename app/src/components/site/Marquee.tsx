const PHRASE = 'Savour the Mirage · Pond · Sundeck · Den · Global Body, Indian Soul'

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-ink-2 py-4">
      <div className="w-max animate-marquee font-serif text-[16px] leading-[1.6] text-cream/45 italic">
        {PHRASE}
        {'\u00A0\u00A0\u00A0'}
        {PHRASE}
      </div>
    </div>
  )
}
