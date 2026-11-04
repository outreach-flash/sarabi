import { menuCategories } from '@/lib/content'

export function MenuTabs() {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-0 z-10 flex h-[54px] items-center justify-center gap-[25px] border-y border-line bg-ink/93 backdrop-blur-[14px] sm:h-[64px] sm:gap-[72px]"
    >
      {menuCategories.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="border-b border-transparent px-[2px] py-[8px] font-display text-[8px] font-bold tracking-[1px] text-cream/52 uppercase no-underline transition-colors hover:border-gold hover:text-gold sm:text-[10px] sm:tracking-[2px]"
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}
