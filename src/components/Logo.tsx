import { Link } from 'react-router-dom'
import { restaurantData } from '../data/site'
import styles from './Logo.module.css'

/**
 * Text wordmark: a saffron monogram + the restaurant name. No graphic logo was
 * supplied, so the identity is typographic (Fraunces for the name).
 */
export function Logo({
  to = '/',
  onDark = false,
  size = 'md',
  onClick,
}: {
  to?: string
  onDark?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={[styles.logo, onDark ? styles.onDark : '', styles[size]].join(' ')}
      aria-label={`${restaurantData.legalName} — home`}
    >
      <span className={styles.mark} aria-hidden="true">
        B
      </span>
      <span className={styles.words}>
        <span className={styles.name}>B Biryani</span>
        <span className={styles.sub}>Restaurant · Mingora</span>
      </span>
    </Link>
  )
}
