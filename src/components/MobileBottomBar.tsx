import { contactData } from '../data/site'
import { waLink, waMessages } from '../lib/whatsapp'
import { Icon } from './Icon'
import styles from './MobileBottomBar.module.css'

/**
 * Persistent mobile action bar: Call + WhatsApp. The highest-value actions on
 * a phone are always one thumb away. Hidden from 900px up.
 */
export function MobileBottomBar() {
  return (
    <div className={`mobile-bar ${styles.bar}`} role="region" aria-label="Quick actions">
      <a className={styles.call} href={contactData.phone.tel}>
        <Icon name="phone" size={18} />
        <span>Call</span>
      </a>
      <a
        className={styles.whatsapp}
        href={waLink(waMessages.menu)}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon name="whatsapp" size={19} />
        <span>Order on WhatsApp</span>
      </a>
    </div>
  )
}
