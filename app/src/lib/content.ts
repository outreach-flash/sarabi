import type { StaticImageData } from 'next/image'

import bookBand from '@/assets/images/book-band.jpg'
import cocktails from '@/assets/images/cocktails.jpg'
import danceFloor from '@/assets/images/dance-floor.jpg'
import denBar from '@/assets/images/den-bar.jpg'
import firePerformer from '@/assets/images/fire-performer.jpg'
import pond from '@/assets/images/pond.jpg'
import rooftopParty from '@/assets/images/rooftop-party.jpg'
import sundeckSunset from '@/assets/images/sundeck-sunset.jpg'
import sunkenSeating from '@/assets/images/sunken-seating.jpg'

export const whatsappUrl =
  'https://wa.me/918655334751?text=Hello%20Sarabi%2C%20I%27d%20like%20to%20enquire%20about%20a%20table.'
export const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Sarabi%20Vagator%20Goa'
export const mapEmbedUrl = 'https://www.google.com/maps?q=Sarabi+Vagator+Goa&output=embed'
export const phones = ['+91 86553 34751', '+91 86553 34750'] as const
export const address = [
  'H No-285, Survey No-206/1, Plot No-93A',
  'Ozran Beach Road, near Prabhu Villa',
  'Vagator, Goa 403509',
] as const

export const images = {
  danceFloor,
  firePerformer,
  rooftopParty,
  cocktails,
  denBar,
  sundeckSunset,
  pond,
  sunkenSeating,
  bookBand,
} as const

export type SarabiPass = { id: string; label: string; price: number; includes: string[] }

export type SarabiEvent = {
  id: string
  title: string
  image: StaticImageData
  /** ISO YYYY-MM-DD */
  date: string
  doors: string
  showtime: string
  realm: 'Sundeck' | 'Pond' | 'Den' | 'All Realms'
  lineup: string
  genre: string
  inclusions: string[]
  passes: SarabiPass[]
  feePercent: number
  /** Draft placeholder — replace with confirmed event details before launch. */
  draft: true
}

// Draft placeholder events — dates, prices, passes and inclusions are not final.
export const events: SarabiEvent[] = [
  {
    id: 'ember-ritual',
    title: 'Ember Ritual',
    image: firePerformer,
    date: '2026-10-24',
    doors: '8 PM',
    showtime: '9 PM',
    realm: 'Sundeck',
    lineup: 'Fire & Drums Collective',
    genre: 'Fire performance · Percussion',
    inclusions: ['Sundeck entry', 'Welcome sundowner pour'],
    passes: [
      { id: 'general', label: 'General', price: 999, includes: ['Sundeck entry', 'Welcome pour'] },
      { id: 'sundowner', label: 'Sundowner', price: 1999, includes: ['Reserved deck seating', 'Two signature serves'] },
    ],
    feePercent: 5,
    draft: true,
  },
  {
    id: 'mirage-nights',
    title: 'Mirage Nights',
    image: rooftopParty,
    date: '2026-10-25',
    doors: '9 PM',
    showtime: '10 PM',
    realm: 'Den',
    lineup: 'Resident DJs',
    genre: 'House · Disco',
    inclusions: ['Den entry', 'Midnight ritual pour'],
    passes: [
      { id: 'general', label: 'General', price: 799, includes: ['Den entry'] },
      { id: 'vip', label: 'VIP Den', price: 2499, includes: ['Elevated den seating', 'Dedicated server', 'Two pours'] },
    ],
    feePercent: 5,
    draft: true,
  },
  {
    id: 'sarabis-eve',
    title: "Sarabi's Eve",
    image: danceFloor,
    date: '2026-10-31',
    doors: '8 PM',
    showtime: '10 PM',
    realm: 'All Realms',
    lineup: 'All Realms Takeover',
    genre: 'All realms · Till 5 AM',
    inclusions: ['All-realm access', 'Costume welcome pour'],
    passes: [
      { id: 'general', label: 'General', price: 1499, includes: ['All-realm entry'] },
      { id: 'realm-hop', label: 'Realm Hop', price: 2999, includes: ['All-realm entry', 'Three signature serves', 'Midnight bites'] },
    ],
    feePercent: 5,
    draft: true,
  },
  {
    id: 'first-sip-sessions',
    title: 'First Sip Sessions',
    image: cocktails,
    date: '2026-11-01',
    doors: '7 PM',
    showtime: '8 PM',
    realm: 'Pond',
    lineup: 'First Sip Bartenders',
    genre: 'Cocktail ritual',
    inclusions: ['Pond entry', 'First Sip welcome'],
    passes: [
      { id: 'general', label: 'General', price: 899, includes: ['Pond entry', 'Welcome pour'] },
      { id: 'ritual', label: 'Ritual Seat', price: 1799, includes: ['Sunken seating', 'Three First Sip serves'] },
    ],
    feePercent: 5,
    draft: true,
  },
  {
    id: 'pride-rock',
    title: 'Pride Rock Sessions',
    image: denBar,
    date: '2026-11-07',
    doors: '9 PM',
    showtime: '10 PM',
    realm: 'Den',
    lineup: 'Pride Rock Live Act',
    genre: 'Live act · Ceremony',
    inclusions: ['Den entry', 'Ceremony welcome'],
    passes: [
      { id: 'general', label: 'General', price: 999, includes: ['Den entry'] },
      { id: 'pride', label: 'Pride Circle', price: 2299, includes: ['Circle seating', 'Two pours', 'Late-night bites'] },
    ],
    feePercent: 5,
    draft: true,
  },
  {
    id: 'golden-hour-ode',
    title: 'Golden Hour Ode',
    image: sundeckSunset,
    date: '2026-11-14',
    doors: '6:30 PM',
    showtime: 'Sunset',
    realm: 'Sundeck',
    lineup: 'The Gin & Tequila Ode',
    genre: 'Gin & Tequila · Sunset',
    inclusions: ['Sundeck entry', 'Golden hour pour'],
    passes: [
      { id: 'general', label: 'General', price: 899, includes: ['Sundeck entry', 'Golden hour pour'] },
      { id: 'golden', label: 'Golden Table', price: 1999, includes: ['Reserved sunset table', 'Two ode serves'] },
    ],
    feePercent: 5,
    draft: true,
  },
]

export const realms = [
  {
    numeral: 'I',
    name: 'Pond',
    title: 'The Pond',
    tagline: 'Your table in the middle of the water.',
    bar: 'First Sip',
    chapter: 'Earth & Water',
    hour: 'Transition',
    ambient: 'var(--realm-ambient-pond)',
    copy: 'Settle into sunken seating with water all around you and a cocktail in hand. As the first notes of a live set ripple across the Pond, lean back and take it all in. By the encore, you might be the loudest one at the table.',
    cta: 'Reserve at the Pond',
    image: pond,
  },
  {
    numeral: 'II',
    name: 'Den',
    title: 'The Den',
    tagline: 'Meet the wild side of midnight.',
    bar: 'Circle of Spirits',
    chapter: 'Circle of Spirits',
    hour: 'After Midnight',
    ambient: 'var(--realm-ambient-den)',
    copy: 'Beneath the gaze of the lioness, celebrity DJs play to a packed dance floor. Order a round at the carved stone bar, then get back to your people before the next track drops. This is Sarabi’s wildest room, with a tribal luxe signature all its own.',
    cta: 'Reserve at the Den',
    image: denBar,
  },
  {
    numeral: 'III',
    name: 'Sundeck',
    title: 'The Sundeck',
    tagline: 'Where the fields meet the sea.',
    bar: 'The Gin & Tequila Ode',
    chapter: 'First Sip',
    hour: 'Sunset',
    ambient: 'var(--realm-ambient-sundeck)',
    copy: 'From your table, the view stretches across the paddy fields to the endless sea. As the sun dips into the water, the whole horizon turns gold. The music stays mellow, the cocktails keep flowing, and there’s every reason to linger long after sunset.',
    cta: 'Reserve on the Sundeck',
    image: sundeckSunset,
  },
] as const

export const aboutCopy = [
  'Sarabi began with a vision for a different kind of night out in Vagator. Over three years, that vision took shape in sculpted stone, dark rosewood and sunken spaces surrounded by water. Inspired by the quiet power of the lioness, Sarabi brings dining, cocktails and music together across three distinct realms.',
  'On the Sundeck, settle in with a cocktail as mellow music plays and the sun sets over the endless sea beyond the paddy fields. At the Pond, your table sits in the middle of the water, close enough to feel the energy of a live performance. Then there’s the Den, Sarabi’s wildest side, where celebrity DJs take the decks and the dance floor comes alive.',
  'Come for the sunset, make plans around a favourite artist, or let the music decide where the night takes you.',
] as const

export const programs = [
  { realm: 'Pond', name: 'First Sip', copy: 'A nostalgia-driven cocktail program celebrating memory and emotional flavour.' },
  { realm: 'Sundeck', name: 'The Gin & Tequila Ode', copy: 'Botanicals, agave and sunlit hours — a tribute to the open sky.' },
  { realm: 'Den', name: 'Circle of Spirits', copy: 'A Lion King-inspired universe — Simba, Sarabi, Mufasa, Nala and the ancestral pride.' },
] as const

export type GalleryFilter = 'All' | 'Sundeck' | 'Pond' | 'Den' | 'Fire' | 'Live'

export const galleryFilters: GalleryFilter[] = ['All', 'Sundeck', 'Pond', 'Den', 'Fire', 'Live']

export const gallery: Array<{
  filter: GalleryFilter
  image: StaticImageData
  alt: string
}> = [
  { filter: 'All', image: danceFloor, alt: 'Aerial view of the Sarabi dance floor at peak hour' },
  { filter: 'Fire', image: firePerformer, alt: 'Fire performer at Sarabi' },
  { filter: 'Den', image: denBar, alt: 'Stone bar and amber lighting in the Den' },
  { filter: 'Sundeck', image: sundeckSunset, alt: 'Sunset over the Sundeck bar' },
  { filter: 'Pond', image: pond, alt: 'Water and sunken seating at the Pond' },
  { filter: 'Live', image: rooftopParty, alt: 'Rooftop party under city lights' },
]

export const galleryMomentFilters = ['All', 'Performances', 'Nights', 'Food & Drink'] as const
export type GalleryMomentFilter = (typeof galleryMomentFilters)[number]

export const galleryMoments: Array<{
  title: string
  category: Exclude<GalleryMomentFilter, 'All'>
  type: 'Video' | 'Image'
  wide?: boolean
}> = [
  { title: 'Live performances', category: 'Performances', type: 'Video', wide: true },
  { title: 'A night at Sarabi', category: 'Nights', type: 'Image', wide: true },
  { title: 'Food & drink', category: 'Food & Drink', type: 'Image' },
  { title: 'The performance', category: 'Performances', type: 'Image' },
  { title: 'After dark', category: 'Nights', type: 'Image' },
  { title: 'Performance film', category: 'Performances', type: 'Video', wide: true },
  { title: 'At the table', category: 'Food & Drink', type: 'Image', wide: true },
  { title: 'The atmosphere', category: 'Nights', type: 'Image', wide: true },
  { title: 'On stage', category: 'Performances', type: 'Image' },
]

export const menuCategories = [
  {
    id: 'signatures',
    eyebrow: '01 / The Sarabi pour',
    title: 'Signatures',
    description:
      'Signature serves and menu highlights. Add only confirmed item names, descriptions and prices from the approved menu.',
    image: 'Approved signature serve / menu image',
    items: [
      {
        name: 'Signature item placeholder 01',
        description:
          'Short description placeholder. Replace with the approved ingredients, flavour notes or preparation details.',
      },
      {
        name: 'Signature item placeholder 02',
        description:
          'Short description placeholder. Keep the final copy concise and accurate to the supplied menu.',
      },
      {
        name: 'Signature item placeholder 03',
        description:
          'Short description placeholder. Remove this row if the corresponding item is not on the final menu.',
      },
    ],
  },
  {
    id: 'cocktails',
    eyebrow: '02 / The bar',
    title: 'Cocktails',
    description:
      'Explore the cocktail selection. Use approved photography and the final bar menu to populate this section.',
    image: 'Approved cocktail photography',
    items: [1, 2, 3, 4].map((n) => ({
      name: `Cocktail placeholder 0${n}`,
      description: 'Description placeholder — list confirmed ingredients and a short flavour profile.',
    })),
  },
  {
    id: 'kitchen',
    eyebrow: '03 / From the kitchen',
    title: 'Kitchen',
    description:
      'Food menu presented in a clear, readable list. Add dietary tags or item photography only where details and assets are supplied.',
    image: 'Approved food photography',
    items: [1, 2, 3, 4].map((n) => ({
      name: `Kitchen item placeholder 0${n}`,
      description: 'Description placeholder — add approved ingredients and serving details.',
    })),
  },
] as const

export const navLinks = [
  { label: 'Realms', href: '/spaces' },
  { label: 'Events', href: '/#events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/visit' },
] as const

export const menuLinks = [
  { label: 'Discover Sarabi', href: '/#discover' },
  { label: 'The Realms', href: '/spaces' },
  { label: 'The Founders', href: '/#founders' },
  { label: 'Upcoming Events', href: '/#events' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit Sarabi', href: '/visit' },
  { label: 'About', href: '/about' },
  { label: 'Reservations', href: '/#reservations' },
] as const

export const footerColumns = {
  explore: [
    { label: 'Discover Sarabi', href: '/#discover' },
    { label: 'The Realms', href: '/spaces' },
    { label: 'The Founders', href: '/#founders' },
    { label: 'Events', href: '/#events' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Visit Sarabi', href: '/visit' },
    { label: 'About', href: '/about' },
  ],
  visit: [
    { label: 'Vagator, North Goa', href: '/visit' },
    { label: 'Book a Table', href: '/#reservations' },
    { label: 'Event Tickets', href: '/#events' },
  ],
  contact: [{ label: 'WhatsApp Reservations', href: whatsappUrl }],
} as const

export const hours = [
  { label: 'Monday — Thursday', value: '7 PM — 4 AM' },
  { label: 'Friday — Sunday', value: '7 PM — 5 AM' },
] as const

export const tableTypes = [
  {
    id: 'dinner',
    label: 'Dinner & Sundowners',
    windowLabel: '7:00 PM — 10:30 PM',
    /** 24h clock, 30-minute slots */
    window: { start: 19 * 60, end: 22 * 60 + 30 },
    description: 'Dinner at the realms with sundowner pours while the sky turns.',
  },
  {
    id: 'nightclub',
    label: 'Nightclub Table',
    windowLabel: '10:30 PM — 4:00 AM',
    window: { start: 22 * 60 + 30, end: 28 * 60 },
    description: 'A held table in the Den as the night builds toward Pride Rock.',
  },
] as const

// Draft booking terms — confirm deposit, minimum spend and cancellation policy before launch.
export const bookingTerms = {
  deposit: 'A per-guest deposit confirms the table and adjusts against the final bill.',
  minimumSpend: 'Tables carry a minimum spend that varies by realm, day and slot.',
  cancellation: 'Free cancellation until 6 PM the same day; later cancellations forfeit the deposit.',
} as const

export const practicalInfo = [
  { label: 'Menu', value: 'Browse the full menu', href: '/menu' },
  { label: 'Dress code', value: 'Smart casual. Swimwear stays at the pool.' },
  { label: 'Age policy', value: '21+ after 10 PM with a valid ID.' },
  { label: 'Parking', value: 'Valet and street parking along Ozran Beach Road.' },
  { label: 'Booking terms', value: 'Deposit on confirmation · minimum spend varies · free cancellation until 6 PM.' },
] as const

export const founders = [
  {
    name: 'Founder name 01',
    role: 'Co-founder · Draft profile',
    bio: 'Draft biography — replace with the founder’s journey, creative philosophy and the story behind Sarabi’s three-year making.',
    quote: 'A personal note about the devotion, people and places that shaped the mirage.',
  },
  {
    name: 'Founder name 02',
    role: 'Co-founder · Draft profile',
    bio: 'Draft biography — replace with the founder’s perspective on hospitality, tribal-luxe craft and building a destination in Vagator.',
    quote: 'A personal reflection on creating a space where ritual and revelry belong together.',
  },
] as const

export const mapUrl = directionsUrl

export const ethos = [
  {
    number: '01 / ETHOS',
    title: 'The Sarabi philosophy',
    copy: 'Placeholder for the principles and point of view that shape the Sarabi experience. Add only client-approved details.',
  },
  {
    number: '02 / SPACE',
    title: 'Three distinct settings',
    copy: 'Placeholder for the venue’s approach to its spaces and how each contributes to the overall experience.',
  },
  {
    number: '03 / EXPERIENCE',
    title: 'Made for the moment',
    copy: 'Placeholder for the dining, music, performances and hospitality elements confirmed by Sarabi.',
  },
] as const
