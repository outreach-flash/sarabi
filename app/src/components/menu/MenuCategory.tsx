import { MediaPanel } from '@/components/about/ui/MediaPanel'
import { SectionHeading } from '@/components/pages/ui/SectionHeading'
import { menuCategories } from '@/lib/content'

type MenuCategoryData = (typeof menuCategories)[number]

export function MenuCategory({ category }: { category: MenuCategoryData }) {
  const image = 'image' in category ? category.image : undefined
  return (
    <section id={category.id} className="page-wrap scroll-mt-[calc(var(--header-h)+64px)] py-[55px] wide:py-[90px]">
      <SectionHeading
        eyebrow={category.eyebrow}
        title={
          <>
            {category.title}
            <em className="em-accent">.</em>
          </>
        }
        copy={category.description}
      />
      <div className="mt-[32px] flex flex-col gap-[30px] sm:grid sm:grid-cols-[1fr_0.85fr] sm:items-start sm:gap-[45px] wide:gap-[90px]">
        <div className="border-t border-line sm:min-h-[620px] wide:min-h-[760px]" data-stagger>
          {category.items.map((item) => (
            <article
              key={item.name}
              className="flex justify-between gap-[20px] border-b border-line py-[22px]"
            >
              <div>
                <h3 className="font-display text-[15px] leading-none font-semibold text-cream">{item.name}</h3>
                <p className="type-page-body mt-[7px] text-[11px] leading-[1.7] sm:text-[13px]">
                  {item.description}
                </p>
                {category.id !== 'cocktails' ? (
                  <small className="mt-[8px] inline-flex rounded-[30px] border border-gold/20 px-[8px] py-[3px] text-[8px] tracking-[1px] text-gold/65 uppercase">
                    Optional tag
                  </small>
                ) : null}
              </div>
              <em className="em-accent text-[16px]">—</em>
            </article>
          ))}
        </div>
        {image ? (
          <div className="sm:sticky sm:top-[calc(var(--header-h)+88px)]">
            <MediaPanel
              variant="frame"
              image={image}
              alt={category.title}
              className="w-full min-h-[290px] wide:min-h-[530px]"
            />
          </div>
        ) : (
          <MediaPanel variant="frame" className="w-full min-h-[290px] wide:min-h-[530px]">
            Approved food photography
          </MediaPanel>
        )}
      </div>
    </section>
  )
}
