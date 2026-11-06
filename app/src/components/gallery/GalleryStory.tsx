import { PageEyebrow } from '@/components/pages/ui/PageEyebrow'

export function GalleryStory() {
  return (
    <section className="page-wrap block py-[55px] sm:grid sm:grid-cols-2 sm:gap-[40px] sm:py-[80px] wide:grid-cols-[0.7fr_1.3fr] wide:gap-[80px]">
      <div className="sm:sticky sm:top-[calc(var(--header-h)+40px)] sm:self-start" data-reveal>
        <PageEyebrow>Cultural inspiration</PageEyebrow>
        <h2 className="type-page-title mt-[12px] text-[34px] leading-[1.12] sm:text-[44px]">
          A story told with <em className="em-accent">care.</em>
        </h2>
      </div>
      <div className="mt-[28px] border-l border-line pl-[28px] sm:mt-0" data-reveal>
        <p className="type-page-body">
          Use this section to introduce Sarabi’s cultural inspiration only after the venue has supplied and
          approved the specific story, references and context. Any cultural details must be accurate,
          respectful and verified before publication.
        </p>
        <strong className="mt-[14px] block text-[10px] font-normal tracking-[1.2px] text-gold/65 uppercase">
          Approved cultural storytelling copy to be supplied by Sarabi.
        </strong>
      </div>
    </section>
  )
}
