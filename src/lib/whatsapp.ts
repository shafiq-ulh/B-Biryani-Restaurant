import { contactData } from '../data/site'

/**
 * Every WhatsApp CTA on the site routes through this helper so the number and
 * message copy stay consistent. Never render the raw wa.me URL in the UI.
 */
export const WHATSAPP_NUMBER = contactData.whatsapp.number

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  menu: 'Assalam o Alaikum, I would like to know more about the menu at B Biryani.',
  order: (item: string) => `Assalam o Alaikum, I would like to order ${item} from B Biryani.`,
  contact: 'Assalam o Alaikum, I would like to contact B Biryani.',
  visit: 'Assalam o Alaikum, I would like to visit B Biryani. Are you open right now?',
} as const
