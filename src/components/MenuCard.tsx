import { img } from '../data/images'
import type { MenuItem } from '../data/menu'
import { waLink, waMessages } from '../lib/whatsapp'
import { Icon } from './Icon'
import styles from './MenuCard.module.css'

/**
 * One row/card in the menu grid. Placeholder entries (real menu not supplied
 * yet) are visually marked so nothing invented is ever presented as a dish.
 */
export function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const asset = img(item.image)
  const isPlaceholder = Boolean(item.placeholder)

  const message = isPlaceholder
    ? waMessages.menu
    : waMessages.order(item.name)

  return (
    <article
      className={[styles.card, isPlaceholder ? styles.placeholder : ''].join(' ')}
      aria-label={isPlaceholder ? `${item.name} — awaiting menu details` : item.name}
    >
      <div className={styles.media}>
        <img
          src={asset.src}
          srcSet={asset.srcSet}
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 300px"
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {isPlaceholder && <span className={styles.pending}>Awaiting details</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.price}>{item.price}</span>
        </div>

        {item.description && <p className={styles.desc}>{item.description}</p>}

        <a
          className={styles.order}
          href={waLink(message)}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={isPlaceholder ? 'Ask about today’s menu on WhatsApp' : `Order ${item.name} on WhatsApp`}
        >
          <Icon name="whatsapp" size={16} />
          {isPlaceholder ? "Ask what's available" : 'Order this'}
        </a>
      </div>
    </article>
  )
}
