import { Link } from 'react-router-dom'
import { img } from '../data/images'
import type { FeaturedDish } from '../data/menu'
import { waLink, waMessages } from '../lib/whatsapp'
import { Icon } from './Icon'
import styles from './FoodCard.module.css'

/**
 * Home page dish card: photo + name + category, linking to the matching
 * category in the menu. WhatsApp quick-order available per card.
 */
export function FoodCard({ dish, index = 0 }: { dish: FeaturedDish; index?: number }) {
  const asset = img(dish.image)

  return (
    <article className={styles.card}>
      <Link
        to={`/menu?category=${dish.menuCategory}`}
        className={styles.media}
        aria-label={`View ${dish.name} on the menu`}
      >
        <img
          src={asset.src}
          srcSet={asset.srcSet}
          sizes="(max-width: 640px) 76vw, (max-width: 1000px) 44vw, 300px"
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className={styles.category}>{dish.category}</span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={`/menu?category=${dish.menuCategory}`}>{dish.name}</Link>
        </h3>
        {dish.blurb && <p className={styles.blurb}>{dish.blurb}</p>}
        <a
          className={styles.quick}
          href={waLink(waMessages.order(dish.name))}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Order ${dish.name} on WhatsApp`}
        >
          <Icon name="whatsapp" size={16} />
          Order this
        </a>
      </div>
    </article>
  )
}
