/* ---------------------------------------------------------------------------
 * Menu
 * ----------------------------------------------------------------------
 * IMPORTANT: the restaurant's real menu and prices were not supplied, so no
 * dish names, descriptions or prices have been invented.
 *
 * - `verified: true`  → name taken from the restaurant's Google listing.
 * - `placeholder: true` → a clearly marked empty slot for the owner to fill in.
 *
 * To publish the real menu: add `name`, `description` and `price` to each
 * entry (and set the flags to false). Prices are plain strings, so you can
 * write "Rs. 350", "Rs. 350 / plate" or "Market price" — nothing is validated
 * or hidden by the UI.
 * ------------------------------------------------------------------------ */

import type { ImageKey } from './images'

export type MenuCategory = {
  id: string
  label: string
}

export type MenuItem = {
  id: string
  category: MenuCategory['id']
  name: string
  description?: string
  price?: string
  image: ImageKey
  verified?: boolean
  placeholder?: boolean
}

export const menuCategories: MenuCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'biryani', label: 'Biryani' },
  { id: 'mandi', label: 'Mandi' },
  { id: 'bbq', label: 'BBQ / Grilled' },
  { id: 'karahi', label: 'Karahi' },
  { id: 'fish', label: 'Fish' },
  { id: 'batair', label: 'Batair' },
  { id: 'steaks', label: 'Steaks' },
  { id: 'rice-sides', label: 'Rice & Sides' },
  { id: 'drinks', label: 'Drinks' },
]

const PRICE_TBC = 'Price available at restaurant'
const WHATSAPP_HINT = 'Message us on WhatsApp for today’s options and serving sizes.'

export const menuItems: MenuItem[] = [
  /* --- Biryani --- */
  {
    id: 'biryani-signature',
    category: 'biryani',
    name: 'Biryani',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'biryani-brass',
    verified: true,
  },
  { id: 'biryani-2', category: 'biryani', name: 'Menu item', price: PRICE_TBC, image: 'biryani-claypot', placeholder: true },
  { id: 'biryani-3', category: 'biryani', name: 'Menu item', price: PRICE_TBC, image: 'biryani-yogurt', placeholder: true },

  /* --- Mandi --- */
  {
    id: 'mandi-chicken',
    category: 'mandi',
    name: 'Chicken Mandi',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'mandi-plate',
    verified: true,
  },
  { id: 'mandi-2', category: 'mandi', name: 'Menu item', price: PRICE_TBC, image: 'mandi-overhead', placeholder: true },

  /* --- BBQ / Grilled --- */
  { id: 'bbq-1', category: 'bbq', name: 'Menu item', price: PRICE_TBC, image: 'grill-kebab-mix', placeholder: true },
  { id: 'bbq-2', category: 'bbq', name: 'Menu item', price: PRICE_TBC, image: 'grill-tandoori', placeholder: true },

  /* --- Karahi --- */
  {
    id: 'karahi-signature',
    category: 'karahi',
    name: 'Karahi',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'karahi-flames',
    verified: true,
  },
  { id: 'karahi-2', category: 'karahi', name: 'Menu item', price: PRICE_TBC, image: 'karahi-curry', placeholder: true },

  /* --- Fish --- */
  {
    id: 'fish-grilled',
    category: 'fish',
    name: 'Grilled Fish',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'fish-grill',
    verified: true,
  },
  { id: 'fish-2', category: 'fish', name: 'Menu item', price: PRICE_TBC, image: 'fish-plate', placeholder: true },

  /* --- Batair --- */
  {
    id: 'batair-signature',
    category: 'batair',
    name: 'Batair',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'rice-batair',
    verified: true,
  },
  { id: 'batair-2', category: 'batair', name: 'Menu item', price: PRICE_TBC, image: 'rice-meatballs', placeholder: true },

  /* --- Steaks --- */
  {
    id: 'steak-signature',
    category: 'steaks',
    name: 'Steak',
    description: WHATSAPP_HINT,
    price: PRICE_TBC,
    image: 'steak-slate',
    verified: true,
  },
  { id: 'steak-2', category: 'steaks', name: 'Menu item', price: PRICE_TBC, image: 'steak-sizzle', placeholder: true },

  /* --- Rice & Sides --- */
  { id: 'rice-1', category: 'rice-sides', name: 'Menu item', price: PRICE_TBC, image: 'bread-basket', placeholder: true },
  { id: 'rice-2', category: 'rice-sides', name: 'Menu item', price: PRICE_TBC, image: 'bread-assort', placeholder: true },

  /* --- Drinks --- */
  { id: 'drinks-1', category: 'drinks', name: 'Menu item', price: PRICE_TBC, image: 'drink-lassi', placeholder: true },
  { id: 'drinks-2', category: 'drinks', name: 'Menu item', price: PRICE_TBC, image: 'drink-chai', placeholder: true },
]

/**
 * Home page "featured dishes" — the categories published on the listing.
 * `blurb` is optional and intentionally left empty: no verified description
 * was supplied, so no description is invented. Add one here and it renders.
 */
export type FeaturedDish = {
  id: string
  name: string
  category: string
  image: ImageKey
  blurb?: string
  menuCategory: MenuCategory['id']
}

export const featuredDishes: FeaturedDish[] = [
  {
    id: 'biryani',
    name: 'Biryani',
    category: 'Biryani',
    image: 'biryani-spread',
    menuCategory: 'biryani',
  },
  {
    id: 'chicken-mandi',
    name: 'Chicken Mandi',
    category: 'Mandi',
    image: 'mandi-plate',
    menuCategory: 'mandi',
  },
  {
    id: 'grilled-fish',
    name: 'Grilled Fish',
    category: 'BBQ / Grilled',
    image: 'fish-grill',
    menuCategory: 'fish',
  },
  {
    id: 'batair',
    name: 'Batair',
    category: 'Batair',
    image: 'rice-batair',
    menuCategory: 'batair',
  },
  {
    id: 'steak',
    name: 'Steak',
    category: 'Steaks',
    image: 'steak-slate',
    menuCategory: 'steaks',
  },
  {
    id: 'karahi',
    name: 'Karahi',
    category: 'Karahi',
    image: 'karahi-flames',
    menuCategory: 'karahi',
  },
]
