const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Splits an ISO YYYY-MM-DD date into the day number and short month for date badges. */
export function badgeParts(iso: string): { day: string; month: string } {
  const [, month, day] = iso.split('-')
  return { day, month: monthShort[Number(month) - 1] }
}
