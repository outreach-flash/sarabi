export const bookingEvent = 'sarabi:booking'
export const bookingDialogEvent = 'sarabi:booking-dialog'

export type BookingDetail = {
  flow: 'table' | 'pass'
  eventId?: string
  realm?: string
  date?: string
}

/** Opens the booking dialog. Replaces the bare reservation-preview event. */
export function openBooking(detail: BookingDetail): void {
  window.dispatchEvent(new CustomEvent<BookingDetail>(bookingEvent, { detail }))
}
