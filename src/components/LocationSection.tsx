import { contactData, links, restaurantData } from '../data/site'
import { waLink, waMessages } from '../lib/whatsapp'
import { Button, WhatsAppButton } from './Button'
import { Icon, Stars } from './Icon'
import styles from './LocationSection.module.css'

/**
 * "Visit us" block — address, hours, rating, map embed and directions.
 * Shared by the Home and Contact pages. The map embed points at the real
 * Google Business listing, so the pin lands on the restaurant itself.
 */
export function LocationSection({
  title = 'Find us in Mingora',
  copy = 'We’re at Bypass Swat Chowk, near Fizagat — a short drive from anywhere in Swat.',
}: {
  title?: string
  copy?: string
}) {
  const a = contactData.address

  return (
    <section className={`section section--cream ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.info}>
          <span className="eyebrow">Visit the restaurant</span>
          <h2 className={styles.title}>{title}</h2>
          <p className="lead">{copy}</p>

          <ul className={styles.details}>
            <li>
              <Icon name="pin" size={19} />
              <span>
                <strong>Address</strong>
                {a.twoLine.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </li>
            <li>
              <Icon name="clock" size={19} />
              <span>
                <strong>Hours</strong>
                <span>{contactData.hours.display}</span>
              </span>
            </li>
            <li>
              <Icon name="phone" size={19} />
              <span>
                <strong>Phone</strong>
                <a href={contactData.phone.tel}>{contactData.phone.display}</a>
              </span>
            </li>
            <li>
              <Icon name="star" size={19} />
              <span>
                <strong>
                  {contactData.rating.display} on {contactData.rating.source}
                </strong>
                <span className={styles.ratingLine}>
                  <Stars value={contactData.rating.value} id="loc" />
                  <span>{contactData.rating.reviewsDisplay}+ reviews</span>
                </span>
              </span>
            </li>
          </ul>

          <div className="btn-row">
            <Button href={links.directions} variant="dark" icon="arrow-up-right" iconAfter>
              Get directions
            </Button>
            <Button href={contactData.phone.tel} variant="outline" icon="phone">
              Call us
            </Button>
            <WhatsAppButton href={waLink(waMessages.visit)} variant="accent">
              Ask on WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div className={styles.mapWrap}>
          <div className={styles.mapCard}>
            <iframe
              className={styles.map}
              src={links.mapEmbed}
              title={`Map showing ${restaurantData.legalName} at ${a.oneLine}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <div className={styles.mapFooter}>
              <Icon name="pin" size={17} />
              <span>{a.oneLine}</span>
              <a href={links.mapSearch} target="_blank" rel="noreferrer noopener">
                Open in Google Maps
                <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
