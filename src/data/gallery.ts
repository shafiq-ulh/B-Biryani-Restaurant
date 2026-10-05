/* ---------------------------------------------------------------------------
 * Gallery
 * ----------------------------------------------------------------------
 * Each entry references a key in `data/images.ts`. Categories power the
 * filter bar. Photos are sourced from Pexels (licence: free for commercial
 * use) and should be replaced with real B Biryani photography as soon as it
 * is available — see `data/images.ts`.
 *
 * `type: 'video'` entries are supported: add a video later and the "Videos"
 * filter picks it up automatically (there are none today, and the UI shows an
 * honest empty state rather than a fake thumbnail).
 * ------------------------------------------------------------------------ */

import type { ImageKey } from './images'

export type GalleryCategory = 'food' | 'biryani' | 'restaurant' | 'vibe'

export type GalleryItem = {
  id: string
  image: ImageKey
  category: GalleryCategory
  type?: 'image' | 'video'
  /** Show on the home page preview strip. */
  featured?: boolean
}

export const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'biryani', label: 'Biryani' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'vibe', label: 'Vibe' },
  { id: 'videos', label: 'Videos' },
] as const

export const galleryItems: GalleryItem[] = [
  /* --- biryani --- */
  { id: 'g-biryani-1', image: 'biryani-spread', category: 'biryani', featured: true },
  { id: 'g-biryani-2', image: 'biryani-brass', category: 'biryani' },
  { id: 'g-biryani-3', image: 'biryani-claypot', category: 'biryani', featured: true },
  { id: 'g-biryani-4', image: 'biryani-egg', category: 'biryani' },
  { id: 'g-biryani-5', image: 'biryani-papadum', category: 'biryani' },
  { id: 'g-biryani-6', image: 'cta-biryani', category: 'biryani', featured: true },

  /* --- food --- */
  { id: 'g-food-1', image: 'grill-kebab-mix', category: 'food', featured: true },
  { id: 'g-food-2', image: 'karahi-curry', category: 'food' },
  { id: 'g-food-3', image: 'fish-coals', category: 'food', featured: true },
  { id: 'g-food-4', image: 'steak-ribeye', category: 'food' },
  { id: 'g-food-5', image: 'mandi-overhead', category: 'food', featured: true },
  { id: 'g-food-6', image: 'grill-tandoori-mint', category: 'food' },
  { id: 'g-food-7', image: 'bread-naan', category: 'food' },
  { id: 'g-food-8', image: 'rice-meatballs', category: 'food' },
  { id: 'g-food-9', image: 'drink-lassi', category: 'food' },

  /* --- restaurant --- */
  { id: 'g-restaurant-1', image: 'interior-warm', category: 'restaurant', featured: true },
  { id: 'g-restaurant-2', image: 'interior-rustic', category: 'restaurant' },
  { id: 'g-restaurant-3', image: 'interior-candle', category: 'restaurant', featured: true },
  { id: 'g-restaurant-4', image: 'interior-table', category: 'restaurant' },
  { id: 'g-restaurant-5', image: 'interior-seating', category: 'restaurant' },
  { id: 'g-restaurant-6', image: 'interior-cafe', category: 'restaurant' },
  { id: 'g-restaurant-7', image: 'vibe-restaurant-kitchen', category: 'restaurant' },

  /* --- vibe --- */
  { id: 'g-vibe-1', image: 'vibe-mingora-bbq', category: 'vibe', featured: true },
  { id: 'g-vibe-2', image: 'vibe-mingora-kebab', category: 'vibe', featured: true },
  { id: 'g-vibe-3', image: 'vibe-mingora-sweets', category: 'vibe' },
  { id: 'g-vibe-4', image: 'vibe-mingora-bazaar', category: 'vibe' },
  { id: 'g-vibe-5', image: 'vibe-swat-paratha', category: 'vibe' },
  { id: 'g-vibe-6', image: 'vibe-kalam-bazaar', category: 'vibe' },
  { id: 'g-vibe-7', image: 'vibe-karachi-cook', category: 'vibe' },
  { id: 'g-vibe-8', image: 'vibe-street-faisalabad', category: 'vibe' },
  { id: 'g-vibe-9', image: 'vibe-family-meal', category: 'vibe' },
  { id: 'g-vibe-10', image: 'vibe-mountain-meal', category: 'vibe' },
  { id: 'g-vibe-11', image: 'vibe-spread-karachi', category: 'vibe' },
  { id: 'g-vibe-12', image: 'vibe-desi-spread', category: 'vibe' },
]
