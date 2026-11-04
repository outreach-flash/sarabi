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

export const featuredEvents: Array<{
  date: string
  month: string
  title: string
  meta: string
  image: StaticImageData
}> = [
  { date: '24', month: 'Oct', title: 'Ember Ritual', meta: 'Fire & Drums · Sundeck', image: firePerformer },
  { date: '25', month: 'Oct', title: 'Mirage Nights', meta: 'Resident DJs · The Den', image: rooftopParty },
  { date: '31', month: 'Oct', title: "Sarabi's Eve", meta: 'All Realms · Till 5 AM', image: danceFloor },
  { date: '01', month: 'Nov', title: 'First Sip Sessions', meta: 'Cocktail Ritual · Pond', image: cocktails },
  { date: '07', month: 'Nov', title: 'Pride Rock', meta: 'Live Act · The Den', image: denBar },
  { date: '14', month: 'Nov', title: 'Golden Hour Ode', meta: 'Gin & Tequila · Sundeck', image: sundeckSunset },
]

export const realms = [
  {
    numeral: 'I',
    name: 'Sundeck',
    bar: 'The Gin & Tequila Ode',
    copy: 'The abode of the Maasai Mara — open sky, tribal rustic textures, paddy fields on one side and the sea on the other.',
    image: sundeckSunset,
  },
  {
    numeral: 'II',
    name: 'Pond',
    bar: 'First Sip',
    copy: 'A sunken oasis replicating a deserted Tanzanian pond — water gushes softly, trees float above the waterline.',
    image: pond,
  },
  {
    numeral: 'III',
    name: 'Den',
    bar: 'Circle of Spirits',
    copy: 'A primeval lair carved from stone — rosewood, amber shadows, a monolithic rock bar, and Pride Rock after midnight.',
    image: denBar,
  },
] as const

export const events = [
  { realm: 'Sundeck', title: 'Ember Ritual', time: '9 PM onwards', image: firePerformer },
  { realm: 'The Den', title: 'Mirage Nights', time: '10 PM onwards', image: rooftopParty },
  { realm: 'All Realms', title: "Sarabi's Eve", time: '8 PM — 5 AM', image: danceFloor },
  { realm: 'The Den', title: 'Pride Rock Sessions', time: '10 PM onwards', image: denBar },
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
  { label: 'Discover', href: '/#discover' },
  { label: 'Realms', href: '/spaces' },
  { label: 'Founders', href: '/#founders' },
  { label: 'Events', href: '/#events' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit', href: '/visit' },
  { label: 'About', href: '/about' },
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
