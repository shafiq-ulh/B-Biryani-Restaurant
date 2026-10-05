import { useEffect } from 'react'
import { contactData, restaurantData, siteMeta } from '../data/site'

type Meta = {
  title?: string
  description?: string
  path?: string
  image?: string
  /** Structured data objects to attach as JSON-LD for this page. */
  jsonLd?: Record<string, unknown>[]
}

const SCRIPT_IDS = ['seo-jsonld-runtime', 'seo-jsonld-page']

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function syncJsonLd(blocks: Record<string, unknown>[], id: string) {
  document.getElementById(id)?.remove()
  if (!blocks.length) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks)
  document.head.appendChild(script)
}

/** Restaurant / LocalBusiness structured data — only verified fields are used. */
export function restaurantJsonLd(): Record<string, unknown> {
  const a = contactData.address
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurantData.legalName,
    description: siteMeta.description,
    url: siteMeta.canonical,
    telephone: contactData.phone.e164,
    image: `${siteMeta.canonical}og-image.jpg`,
    servesCuisine: [...restaurantData.cuisine],
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.district,
      addressCountry: a.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: contactData.rating.value,
      reviewCount: contactData.rating.count,
      bestRating: 5,
    },
    // No openingHours: only "Open until 12:00 AM" was supplied, and guessing a
    // full weekly schedule would publish incorrect structured data.
    potentialAction: {
      '@type': 'Action',
      name: 'Order on WhatsApp',
      target: contactData.whatsapp.base,
    },
  }
}

/**
 * Per-page document metadata. Keeps title/description/canonical/OG tags and
 * page-level JSON-LD in sync with the route.
 */
export function usePageSeo({ title, description, path, image, jsonLd }: Meta = {}) {
  const jsonLdKey = JSON.stringify(jsonLd ?? [])
  const jsonLdBlocks = jsonLd ?? []

  useEffect(() => {
    const fullTitle = title ?? siteMeta.title
    const desc = description ?? siteMeta.description
    const url = siteMeta.canonical.replace(/\/$/, '') + (path ?? '')

    document.title = fullTitle
    upsertMeta('meta[name="description"]', 'name', 'description', desc)
    upsertLink('canonical', url)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image ?? `${siteMeta.canonical}og-image.jpg`)
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)

    syncJsonLd(jsonLdBlocks, SCRIPT_IDS[1])
    // jsonLdKey serialises the block so a new object with identical content
    // does not retrigger document writes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, jsonLdKey])
}

/** Page-independent structured data (mounted once by App). */
export function useSiteJsonLd() {
  useEffect(() => {
    syncJsonLd([restaurantJsonLd()], SCRIPT_IDS[0])
    return () => document.getElementById(SCRIPT_IDS[0])?.remove()
  }, [])
}
