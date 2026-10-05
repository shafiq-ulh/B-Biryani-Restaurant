import { useState, type FormEvent } from 'react'
import { usePageSeo } from '../lib/seo'
import { contactData, links, reviewsData } from '../data/site'
import { waLink, waMessages } from '../lib/whatsapp'
import { Button, WhatsAppButton } from '../components/Button'
import { Icon, Stars } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { LocationSection } from '../components/LocationSection'
import styles from './ContactPage.module.css'

type Fields = { name: string; phone: string; message: string }

const empty: Fields = { name: '', phone: '', message: '' }

/**
 * Contact form without a backend: on submit we compose a WhatsApp message and
 * open it in a new tab, so the restaurant actually receives it. The shape of
 * `Fields` is kept separate from the message text so a real API endpoint can
 * be dropped in later without reworking the UI.
 */
export function ContactPage() {
  usePageSeo({
    title: 'Contact | B Biryani Restaurant — Mingora, Swat',
    description:
      'Contact B Biryani Restaurant at Bypass Swat Chowk, near Fizagat, Mingora. Call +92 303 3343536 or send a WhatsApp message — we usually reply on chat.',
    path: '/contact',
  })

  const [fields, setFields] = useState<Fields>(empty)
  const [error, setError] = useState('')
  const [sentUrl, setSentUrl] = useState('')

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = fields.name.trim()
    const message = fields.message.trim()

    if (message.length < 3) {
      setError('Please tell us how we can help — a few words are enough.')
      return
    }

    const lines = [
      waMessages.contact,
      `Name: ${name || 'Not given'}`,
      fields.phone.trim() && `Phone: ${fields.phone.trim()}`,
      `Message: ${message}`,
    ].filter(Boolean) as string[]

    const url = waLink(lines.join('\n'))
    setSentUrl(url)
    setError('')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* ---------- page header ---------- */}
      <header className="page-head">
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--saffron">Contact</span>
          <h1>Talk to B Biryani</h1>
          <p className="lead">
            Questions about the menu, a big order, or directions — message us on
            WhatsApp or give us a call. We&apos;re at Bypass Swat Chowk, near Fizagat.
          </p>
          <div className="page-head__meta">
            <span className="chip chip--dark">
              <Icon name="phone" size={14} />
              {contactData.phone.display}
            </span>
            <span className="chip chip--dark">
              <Icon name="clock" size={14} />
              {contactData.hours.display}
            </span>
            <span className="chip chip--dark">
              <Icon name="star" size={14} filled />
              {contactData.rating.display} on {contactData.rating.source}
            </span>
          </div>
        </div>
      </header>

      {/* ---------- contact + form ---------- */}
      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.grid}`}>
          {/* --- quick contact --- */}
          <Reveal className={styles.quick}>
            <h2 className={styles.title}>Every way to reach us</h2>

            <div className={styles.cards}>
              <a className={styles.card} href={contactData.phone.tel}>
                <span className={styles.cardIcon}>
                  <Icon name="phone" size={20} />
                </span>
                <span className={styles.cardBody}>
                  <strong>Call us</strong>
                  <span>{contactData.phone.display}</span>
                </span>
                <Icon name="arrow-up-right" size={16} className={styles.cardArrow} />
              </a>

              <a
                className={styles.card}
                href={waLink(waMessages.contact)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.cardIcon}>
                  <Icon name="whatsapp" size={20} />
                </span>
                <span className={styles.cardBody}>
                  <strong>WhatsApp</strong>
                  <span>{contactData.whatsapp.display}</span>
                </span>
                <Icon name="arrow-up-right" size={16} className={styles.cardArrow} />
              </a>

              <a
                className={styles.card}
                href={links.directions}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.cardIcon}>
                  <Icon name="pin" size={20} />
                </span>
                <span className={styles.cardBody}>
                  <strong>Find us</strong>
                  <span>{contactData.address.oneLine}</span>
                </span>
                <Icon name="arrow-up-right" size={16} className={styles.cardArrow} />
              </a>

              <div className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon name="clock" size={20} />
                </span>
                <span className={styles.cardBody}>
                  <strong>Opening hours</strong>
                  <span>{contactData.hours.display}</span>
                </span>
              </div>
            </div>

            <div className={styles.ratingBox}>
              <Stars value={contactData.rating.value} size={20} id="contact" />
              <strong className={styles.ratingValue}>{contactData.rating.display}</strong>
              <span>
                {contactData.rating.reviewsDisplay}+ reviews on {contactData.rating.source} —{' '}
                <a href={links.mapSearch} target="_blank" rel="noreferrer noopener">
                  read them here
                </a>
              </span>
            </div>

            <div className="btn-row">
              <WhatsAppButton href={waLink(waMessages.menu)} size="lg">
                Order on WhatsApp
              </WhatsAppButton>
              <Button href={contactData.phone.tel} variant="outline" icon="phone">
                Call now
              </Button>
            </div>
          </Reveal>

          {/* --- form --- */}
          <Reveal delay={110} className={styles.formWrap}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.formHead}>
                <h2 className={styles.title}>Send us a message</h2>
                <p>
                  This composes your message in WhatsApp and opens it for you to send —
                  nothing is stored on this website.
                </p>
              </div>

              <div className={styles.field}>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Hamza"
                  value={fields.name}
                  onChange={set('name')}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">
                  Phone <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. 0300 0000000"
                  value={fields.phone}
                  onChange={set('phone')}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="I'd like to order biryani for four people tonight…"
                  value={fields.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'message-error' : undefined}
                />
                {error && (
                  <p id="message-error" className={styles.error} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" block icon="whatsapp">
                Send via WhatsApp
              </Button>

              {sentUrl && (
                <p className={styles.sent}>
                  WhatsApp should have opened in a new tab.{' '}
                  <a href={sentUrl} target="_blank" rel="noreferrer noopener">
                    Open it again
                  </a>
                  .
                </p>
              )}

              <p className={styles.privacy}>
                Prefer not to chat? Call {contactData.phone.display} any time during
                opening hours.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------- map ---------- */}
      <LocationSection
        title="Visit B Biryani"
        copy="We're at Bypass Swat Chowk, near Fizagat, in Mingora — use the map for turn-by-turn directions."
      />

      {/* ---------- reviews shortcut ---------- */}
      {reviewsData.reviews.length === 0 && (
        <section className={`section section--tight ${styles.reviewStrip}`}>
          <div className={`container container--narrow ${styles.reviewStripInner}`}>
            <Icon name="star" size={22} filled />
            <p>
              Reviews live on our Google listing so you can see them unfiltered.
              <a href={links.mapSearch} target="_blank" rel="noreferrer noopener">
                See {contactData.rating.reviewsDisplay}+ reviews
                <Icon name="arrow-up-right" size={15} />
              </a>
            </p>
          </div>
        </section>
      )}
    </>
  )
}
