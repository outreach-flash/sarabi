import { buttonLinkStyles } from '@/components/site/ui/ButtonLink'
import { address, directionsUrl, mapEmbedUrl } from '@/lib/content'

export function MapPanel() {
  return (
    <div
      className="relative order-first min-h-[440px] overflow-hidden rounded-[14px] border border-line sm:order-none sm:min-h-[620px] wide:min-h-[680px]"
      data-reveal
    >
      <iframe
        src={mapEmbedUrl}
        title="Map showing Sarabi, Vagator"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0 [filter:sepia(.35)_saturate(.8)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[rgb(68_34_18/0.12)] mix-blend-multiply" />
      <div className="absolute inset-x-[10px] bottom-[10px] flex items-center justify-between gap-4 rounded-[10px] border border-gold/[0.18] bg-ink/91 p-[13px] backdrop-blur-[14px] sm:inset-x-5 sm:bottom-5 sm:p-[18px] sm:px-[20px]">
        <div className="flex flex-col">
          <strong className="font-display text-[14px] font-semibold text-cream">Sarabi, Vagator</strong>
          <span className="mt-[4px] text-[10px] text-cream/50">
            {address[1]} · {address[2]}
          </span>
        </div>
        <a
          className={buttonLinkStyles('primary', 'sm')}
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Get directions ↗</span>
        </a>
      </div>
    </div>
  )
}
