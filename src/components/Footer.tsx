import { Link } from 'react-router-dom'
import { contactData, links, navItems, restaurantData } from '../data/site'
import { waLink, waMessages } from '../lib/whatsapp'
import { Logo } from './Logo'
import { Button, WhatsAppButton } from './Button'
import { Icon } from './Icon'
import styles from './Footer.module.css'

const socials = [
  { key: 'instagram', label: 'Instagram', url: contactData.social.instagram },
  { key: 'facebook', label: 'Facebook', url: contactData.social.facebook },
  { key: 'tiktok', label: 'TikTok', url: contactData.social.tiktok },
].filter((s) => s.url) as { key: 'instagram' | 'facebook' | 'tiktok'; label: string; url: string }[]

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ---------- closing CTA band ---------- */}
      <div className={`site-footer__cta ${styles.cta}`}>
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaCopy}>
            <span className="eyebrow eyebrow--saffron">Craving biryani?</span>
            <h2 className={styles.ctaTitle}>
              Order straight from your phone — we&apos;re on WhatsApp.
            </h2>
            <p className={styles.ctaText}>
              Send us a message with what you&apos;d like and our team will take it from
              there. Prefer to talk? Give us a call.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <WhatsAppButton href={waLink(waMessages.menu)} size="lg">
              Order on WhatsApp
            </WhatsAppButton>
            <Button href={contactData.phone.tel} variant="light" size="lg" icon="phone">
              {contactData.phone.display}
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- main footer ---------- */}
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Logo onDark />
          <p className={styles.brandText}>{restaurantData.positioning}</p>
          <a
            className={styles.ratingPill}
            href={links.mapSearch}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon name="star" size={15} filled />
            <strong className="tabular">{contactData.rating.display}</strong>
            <span>{contactData.rating.reviewsDisplay}+ Google reviews</span>
          </a>
          {socials.length > 0 && (
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                >
                  <Icon name={s.key} size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className={styles.col} aria-label="Footer">
          <h3 className={styles.colTitle}>Explore</h3>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Visit us</h3>
          <ul className={styles.links}>
            <li>
              <a href={links.directions} target="_blank" rel="noreferrer noopener">
                {contactData.address.oneLine}
              </a>
            </li>
            <li>
              <span className={styles.label}>Hours</span>
              <span>{contactData.hours.display}</span>
            </li>
          </ul>
          <Button
            href={links.directions}
            variant="outlineLight"
            size="sm"
            icon="pin"
            className={styles.directionsBtn}
          >
            Get directions
          </Button>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Order &amp; contact</h3>
          <ul className={styles.links}>
            <li>
              <a href={contactData.phone.tel}>{contactData.phone.display}</a>
            </li>
            <li>
              <a href={waLink(waMessages.menu)} target="_blank" rel="noreferrer noopener">
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <span className={styles.label}>Rating</span>
              <span>
                {contactData.rating.display} / 5 · {contactData.rating.source}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {restaurantData.legalName} · {contactData.address.locality},{' '}
          {contactData.address.district}, Pakistan
        </p>
        <p className={styles.bottomNote}>Menu items and availability may change — please confirm on WhatsApp.</p>
      </div>
    </footer>
  )
}
