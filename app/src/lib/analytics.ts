declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export type AnalyticsEvent =
  | 'booking_open'
  | 'booking_step'
  | 'booking_submit'
  | 'booking_abandon'

/** Pushes to window.dataLayer when a vendor is wired up; otherwise a no-op. */
export function track(name: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: name, ...props })
}
