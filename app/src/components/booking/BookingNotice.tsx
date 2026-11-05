import { ArrowUpRight } from 'lucide-react'
import { phones, whatsappUrl } from '@/lib/content'
import { RitualMark } from '@/components/site/RitualMark'

/** Shown as the final step of both booking flows: nothing is sent or charged yet. */
export function BookingNotice({ onRestart }: { onRestart?: () => void }) {
  return (
    <div>
      <RitualMark className="mb-6 w-[4.5rem] text-gold" />
      <span className="type-eyebrow text-gold">Coming in the next release</span>
      <h3 className="mt-3 mb-4 font-display text-[27.2px] leading-[1.15] font-bold text-cream">
        Your request isn&rsquo;t sent yet — online booking and payment arrive in the next release.
      </h3>
      <p className="text-[13.6px] leading-[1.6] font-light text-cream/66">
        Table reservations, automatic assignment and Razorpay prepayment are planned for the next development iteration. This preview collects nothing and charges nothing.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full bg-gold-gradient px-[30px] py-[14px] font-display text-[12.5px] leading-[1.4] font-bold tracking-[1.75px] text-cocoa uppercase no-underline transition-transform hover:-translate-y-0.5"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp for groups, VIP tables &amp; assistance
          <ArrowUpRight size={15} />
        </a>
        <a
          className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-full border border-gold/35 bg-gold/[0.04] px-[30px] py-[14px] font-display text-[12.5px] leading-[1.4] font-bold tracking-[1.75px] text-gold uppercase no-underline transition-transform hover:-translate-y-0.5"
          href={`tel:${phones[0].replace(/\s/g, '')}`}
        >
          Call {phones[0]}
        </a>
      </div>
      {onRestart ? (
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 border-0 bg-transparent p-0 text-[11px] font-bold tracking-[1.8px] text-gold/80 uppercase underline-offset-4 hover:underline"
        >
          Start a new request
        </button>
      ) : null}
      <p className="mt-6 border-t border-line pt-4 text-[10.9px] leading-[1.6] tracking-[1.5px] text-cream/35">
        No payment or personal information is collected in this iteration.
      </p>
    </div>
  )
}
