import Image from 'next/image'
import type { ReactNode } from 'react'
import Link from 'next/link'

import arrowRightDark from '@/assets/icons/arrow-right-dark.svg'
import arrowRightGold from '@/assets/icons/arrow-right-gold.svg'
import type { StaticImageData } from 'next/image'

export function buttonLinkStyles(variant: 'primary' | 'secondary' = 'primary', size: 'md' | 'sm' = 'md') {
  const base =
    'inline-flex items-center justify-center rounded-full font-display font-bold uppercase no-underline transition-[transform,background,box-shadow] duration-250'
  const sizes = {
    md: 'min-h-[50px] gap-3 px-[30px] py-[14px] text-[12.5px] leading-[1.4] tracking-[1.75px]',
    sm: 'min-h-[42px] gap-[12px] px-[23px] py-[11px] text-[10.7px] leading-none tracking-[1.39px]',
  }
  const styles =
    variant === 'primary'
      ? size === 'sm'
        ? 'border border-transparent bg-gold-gradient text-cocoa shadow-[0_0_12px_rgb(253_216_167/0.17)] hover:-translate-y-0.5 hover:bg-[linear-gradient(137deg,#ffe4bd,#efbd84)]'
        : 'bg-gold-gradient glow-gold text-cocoa hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgb(253_216_167/0.38),0_12px_30px_rgb(0_0_0/0.5)]'
      : size === 'sm'
        ? 'border border-gold/40 text-gold hover:-translate-y-0.5 hover:bg-gold/8'
        : 'border border-gold/35 bg-gold/[0.04] text-gold hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgb(253_216_167/0.38),0_12px_30px_rgb(0_0_0/0.5)]'
  return `${base} ${sizes[size]} ${styles}`
}

export function ButtonLink({
  children,
  href = '#reservations',
  variant = 'primary',
  size = 'md',
  icon = true,
  iconSrc,
  iconFirst = false,
  className = '',
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  icon?: boolean
  iconSrc?: StaticImageData
  iconFirst?: boolean
  className?: string
}) {
  const arrow = iconSrc ?? (variant === 'primary' ? arrowRightDark : arrowRightGold)

  return (
    <Link className={`${buttonLinkStyles(variant, size)} ${className}`} href={href}>
      {icon && iconFirst && <Image src={arrow} alt="" width={14} height={14} />}
      <span>{children}</span>
      {icon && !iconFirst && <Image src={arrow} alt="" width={14} height={14} />}
    </Link>
  )
}
