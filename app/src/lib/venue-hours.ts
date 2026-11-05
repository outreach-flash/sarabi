import type { SarabiEvent } from './content'

const OPEN_MIN = 19 * 60 // 7 PM
const CLOSE_WEEK = 4 * 60 // 4 AM
const CLOSE_WEEKEND = 5 * 60 // 5 AM

/** Closing minute for a session that starts on `day` (0 = Sunday). */
function closeForStartDay(day: number): number {
  return day === 5 || day === 6 ? CLOSE_WEEKEND : CLOSE_WEEK
}

function formatClose(closeMin: number): string {
  return `until ${closeMin / 60} AM`
}

function getISTParts(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = days.indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export function getVenueStatus(now: Date): { open: boolean; label: string } {
  const { day, minutes } = getISTParts(now)

  // Early morning belongs to the previous night's session.
  const previousDay = (day + 6) % 7
  const previousClose = closeForStartDay(previousDay)
  if (minutes < previousClose) {
    return { open: true, label: `Open now · ${formatClose(previousClose)}` }
  }

  if (minutes >= OPEN_MIN) {
    const close = closeForStartDay(day)
    return { open: true, label: `Open now · ${formatClose(close)}` }
  }

  return { open: false, label: 'Opens tonight at 7 PM' }
}

function todayIST(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** The event dated today, or the next upcoming one. */
export function getTonightsEvent(events: SarabiEvent[], now: Date): SarabiEvent | undefined {
  const today = todayIST(now)
  const upcoming = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  return upcoming[0]
}
