/* ---------------------------------------------------------------------------
 * Single source of truth for every business fact on this website.
 * Edit this file to update contact details, hours, rating or SEO copy.
 * Nothing here is invented: only the information supplied by the restaurant
 * is present. Anything unknown is left as an empty value so the UI can
 * gracefully show a placeholder instead of a false claim.
 * ------------------------------------------------------------------------- */

export const restaurantData = {
  name: 'B Biryani',
  legalName: 'B Biryani Restaurant',
  logoText: 'B Biryani',
  tagline: 'Authentic Desi Flavors, Made to Satisfy.',
  description:
    'From aromatic biryani to hearty desi favorites, discover flavorful food made for every craving.',

  /** Core positioning — used on the home hero and About page. */
  positioning:
    'B Biryani is a restaurant in Mingora, near Fizagat, serving biryani alongside a wider selection of Pakistani and desi food.',

  cuisine: ['Biryani', 'Pakistani', 'Desi Food'],
} as const

export const contactData = {
  address: {
    street: 'Bypass Swat Chowk, near Fizagat',
    locality: 'Mingora',
    district: 'Swat',
    country: 'Pakistan',
    /** Pre-formatted strings used across the site. */
    oneLine: 'Bypass Swat Chowk, near Fizagat, Mingora, Pakistan',
    twoLine: ['Bypass Swat Chowk,', 'Near Fizagat,', 'Mingora, Swat, Pakistan'],
  },

  phone: {
    display: '+92 303 3343536',
    tel: 'tel:+923033343536',
    e164: '+923033343536',
  },

  whatsapp: {
    /** wa.me / chat.whatsapp.com only accepts digits, country code first. */
    number: '923033343536',
    display: '+92 303 3343536',
    base: 'https://wa.me/923033343536',
  },

  hours: {
    /** The only hours information supplied by the restaurant. */
    display: 'Open until 12:00 AM',
    short: 'Open until 12 AM',
    closesAt: '12:00 AM',
    /** Keep empty unless verified: rendered as "Hours to be confirmed". */
    weekly: '',
  },

  rating: {
    value: 4.5,
    display: '4.5',
    reviewsDisplay: '264+',
    /** Numeric rating count for structured data (minimum stated). */
    count: 264,
    source: 'Google',
  },

  location: {
    label: 'Mingora, Swat',
    area: 'Swat',
  },

  /** Social profiles: add a real URL here to switch the icon on. */
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
  },
} as const

/** Where "See us on Google" / review CTAs point (address-based search). */
export const links = {
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Bypass%20Swat%20Chowk%2C%20near%20Fizagat%2C%20Mingora%2C%20Swat%2C%20Pakistan',
  mapSearch:
    'https://www.google.com/maps/search/?api=1&query=B%20Biryani%20Restaurant%20Bypass%20Swat%20Chowk%20near%20Fizagat%20Mingora%20Swat%20Pakistan',
  /** Place-specific embed for the actual Google Business listing (pins the marker). */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1360.948104072105!2d72.3661812011183!3d34.792994197970984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1791197363670!5m2!1sen!2s',
} as const

/* --------------------------------------------------------------------------
 * Reviews
 * ----------------------------------------------------------------------
 * No individual review text was supplied, so none is shown. Copy real,
 * approved reviews into `reviews` below and the cards render automatically.
 *
 *   { name: 'Customer name', rating: 5, date: '2 weeks ago', text: '…' }
 * ------------------------------------------------------------------------ */
export type Review = {
  name: string
  rating: number
  date?: string
  text: string
}

export const reviewsData: { rating: number; reviewsCount: string; reviews: Review[] } = {
  rating: contactData.rating.value,
  reviewsCount: contactData.rating.reviewsDisplay,
  reviews: [],
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
] as const

export const siteMeta = {
  title: 'B Biryani Restaurant | Biryani & Desi Food in Mingora, Swat',
  description:
    'Visit B Biryani near Fizagat, Mingora for biryani and a variety of desi favorites. View the menu, find our location and order via WhatsApp.',
  /** Replace with the production domain before launch (also update index.html). */
  canonical: 'https://bbiryani.example.com/',
  siteName: 'B Biryani Restaurant',
  themeColor: '#171310',
} as const
