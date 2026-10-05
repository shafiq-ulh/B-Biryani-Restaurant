import { Link } from 'react-router-dom'
import { usePageSeo } from '../lib/seo'
import { contactData, links, restaurantData, reviewsData, siteMeta } from '../data/site'
import { featuredDishes, menuCategories, menuItems } from '../data/menu'
import { galleryItems } from '../data/gallery'
import { img } from '../data/images'
import { waLink, waMessages } from '../lib/whatsapp'
import { Button, WhatsAppButton } from '../components/Button'
import { Icon, Stars } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { FoodCard } from '../components/FoodCard'
import { LocationSection } from '../components/LocationSection'
import styles from './HomePage.module.css'

const hero = img('hero-biryani')
const aboutImage = img('vibe-mingora-bbq')

export function HomePage() {
  usePageSeo({ path: '/' })

  const counts: Record<string, number> = { all: menuItems.length }
  for (const item of menuItems) counts[item.category] = (counts[item.category] ?? 0) + 1

  const preview = galleryItems.filter((g) => g.featured).slice(0, 6)

  return (
    <>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <img
            src={hero.src}
            srcSet={hero.srcSet}
            sizes="100vw"
            width={hero.width}
            height={hero.height}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <Reveal className={styles.heroCopy}>
            <span className="eyebrow eyebrow--saffron">
              Mingora, Swat · Near Fizagat
            </span>
            <h1 className={styles.heroTitle}>{restaurantData.tagline}</h1>
            <p className={styles.heroLead}>{restaurantData.description}</p>

            <div className="btn-row">
              <Button to="/menu" size="lg" icon="utensils">
                View the menu
              </Button>
              <WhatsAppButton
                href={waLink(waMessages.menu)}
                size="lg"
                variant="light"
              >
                Order on WhatsApp
              </WhatsAppButton>
            </div>

            <div className={styles.heroMeta}>
              <span className="chip chip--dark">
                <Icon name="star" size={14} filled />
                <strong className="tabular">{contactData.rating.display}</strong>
                {contactData.rating.reviewsDisplay}+ on Google
              </span>
              <span className="chip chip--dark">
                <Icon name="clock" size={14} />
                {contactData.hours.display}
              </span>
              <span className="chip chip--dark">
                <Icon name="pin" size={14} />
                {contactData.address.oneLine}
              </span>
            </div>
          </Reveal>
        </div>

        <a className={styles.heroScroll} href="#signature" aria-label="Scroll to popular dishes">
          <span>Explore</span>
          <Icon name="chevron-down" size={18} />
        </a>
      </section>

      {/* ================= FEATURED DISHES ================= */}
      <section className="section" id="signature">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div className="section-heading__copy">
              <span className="eyebrow">From our kitchen</span>
              <h2 className="section-heading__title">Dishes people come back for</h2>
              <p className="lead">
                Biryani is the headline, but the grill, karahi, mandi and desi plates keep
                the table full. Tap a dish to order it on WhatsApp.
              </p>
            </div>
            <Button to="/menu" variant="outline" iconAfter icon="arrow-right">
              See the full menu
            </Button>
          </div>

          <div className={styles.dishGrid}>
            {featuredDishes.map((dish, i) => (
              <Reveal key={dish.id} delay={(i % 3) * 90}>
                <FoodCard dish={dish} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT TEASER ================= */}
      <section className={`section section--dark ${styles.about}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <Reveal className={styles.aboutMedia}>
            <div className="frame">
              <img
                src={aboutImage.src}
                srcSet={aboutImage.srcSet}
                sizes="(max-width: 900px) 100vw, 46vw"
                width={aboutImage.width}
                height={aboutImage.height}
                alt={aboutImage.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className={styles.aboutBadge}>
              <Icon name="flame" size={18} />
              Biryani · Karahi · BBQ
            </span>
          </Reveal>

          <Reveal delay={120} className={styles.aboutCopy}>
            <span className="eyebrow eyebrow--saffron">Why B Biryani</span>
            <h2>
              A Mingora table for biryani, BBQ and everything in between
            </h2>
            <p className="lead">
              {restaurantData.positioning} Whether you&apos;re grabbing a quick plate or
              feeding the whole family, order ahead on WhatsApp or walk in — we&apos;re
              open until midnight.
            </p>

            <ul className={styles.aboutPoints}>
              <li>
                <Icon name="check" size={17} />
                Biryani, mandi, karahi, grill and desi favourites in one place
              </li>
              <li>
                <Icon name="check" size={17} />
                WhatsApp ordering — no app, no checkout, just message us
              </li>
              <li>
                <Icon name="check" size={17} />
                Rated {contactData.rating.display} by {contactData.rating.reviewsDisplay}+ guests
                on Google
              </li>
            </ul>

            <div className="btn-row">
              <Button to="/about" variant="light" iconAfter icon="arrow-right">
                Our story
              </Button>
              <Button to="/gallery" variant="outlineLight">
                See the gallery
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MENU CATEGORIES ================= */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Explore the menu</span>
            <h2 className="section-heading__title">What are you in the mood for?</h2>
          </div>

          <div className={styles.catGrid}>
            {menuCategories
              .filter((c) => c.id !== 'all' && (counts[c.id] ?? 0) > 0)
              .map((cat, i) => (
                <Reveal key={cat.id} delay={(i % 5) * 70}>
                  <Link className={styles.catCard} to={`/menu?category=${cat.id}`}>
                    <span className={styles.catLabel}>{cat.label}</span>
                    <span className={styles.catCount}>
                      {counts[cat.id]} {counts[cat.id] === 1 ? 'item' : 'items'}
                    </span>
                    <Icon name="arrow-up-right" size={17} className={styles.catIcon} />
                  </Link>
                </Reveal>
              ))}
          </div>

          <div className={styles.catFoot}>
            <Button to="/menu" iconAfter icon="arrow-right">
              Browse all categories
            </Button>
          </div>
        </div>
      </section>

      {/* ================= GALLERY PREVIEW ================= */}
      <section className={`section section--cream ${styles.gallery}`}>
        <div className="container">
          <div className="section-heading section-heading--split">
            <div className="section-heading__copy">
              <span className="eyebrow">Gallery</span>
              <h2 className="section-heading__title">A look inside the kitchen</h2>
              <p className="lead">
                A preview of the plates and the flavours — open the gallery for the
                full set of photos.
              </p>
            </div>
            <Button to="/gallery" variant="outline" iconAfter icon="arrow-right">
              Open the gallery
            </Button>
          </div>

          <div className={styles.galleryGrid}>
            {preview.map((item, i) => {
              const asset = img(item.image)
              return (
                <Reveal
                  key={item.id}
                  delay={(i % 3) * 80}
                  className={[styles.galleryCell, i % 5 === 0 ? styles.galleryTall : ''].join(' ')}
                >
                  <Link to="/gallery" className={styles.galleryLink}>
                    <img
                      src={asset.src}
                      srcSet={asset.srcSet}
                      sizes="(max-width: 700px) 50vw, 32vw"
                      width={asset.width}
                      height={asset.height}
                      alt={asset.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.galleryOverlay}>
                      <Icon name="camera" size={18} />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className={`section section--dark ${styles.reviews}`}>
        <div className={`container ${styles.reviewsInner}`}>
          <Reveal className={styles.reviewsScore}>
            <span className="eyebrow eyebrow--saffron">Guest rating</span>
            <div className={styles.scoreRow}>
              <span className={styles.score}>{contactData.rating.display}</span>
              <div className={styles.scoreMeta}>
                <Stars value={contactData.rating.value} size={22} id="home" />
                <span>
                  {contactData.rating.reviewsDisplay}+ reviews on {contactData.rating.source}
                </span>
              </div>
            </div>
            <p className="lead">
              See what guests are saying on the restaurant&apos;s Google listing.
            </p>
            <Button
              href={links.mapSearch}
              variant="light"
              icon="arrow-up-right"
              iconAfter
            >
              See us on Google
            </Button>
          </Reveal>

          <div className={styles.reviewCards}>
            {reviewsData.reviews.length > 0 ? (
              reviewsData.reviews.map((r) => (
                <Reveal key={r.name + r.text.slice(0, 12)} className={styles.reviewCard}>
                  <Stars value={r.rating} id={r.name} />
                  <p>“{r.text}”</p>
                  <footer>
                    <strong>{r.name}</strong>
                    {r.date && <span>{r.date}</span>}
                  </footer>
                </Reveal>
              ))
            ) : (
              <div className={styles.reviewEmpty}>
                <p>
                  Individual reviews aren&apos;t published here — we only share what the
                  restaurant has approved. The live rating above comes straight from
                  Google.
                </p>
                <a href={links.mapSearch} target="_blank" rel="noreferrer noopener">
                  Read all {contactData.rating.reviewsDisplay}+ reviews
                  <Icon name="arrow-up-right" size={15} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <LocationSection />

      {/* ================= CLOSING CTA (mobile-friendly) ================= */}
      <section className={`section section--tight ${styles.close}`}>
        <div className={`container container--narrow ${styles.closeInner}`}>
          <Reveal>
            <h2>Hungry right now?</h2>
            <p className="lead">
              Send us a message and tell us what you&apos;d like — we&apos;ll take care of
              the rest.
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <WhatsAppButton href={waLink(waMessages.menu)} size="lg">
                Order on WhatsApp
              </WhatsAppButton>
              <Button href={contactData.phone.tel} variant="outline" size="lg" icon="phone">
                Call {contactData.phone.display}
              </Button>
            </div>
            <p className={styles.closeNote}>
              {siteMeta.siteName} · {contactData.address.oneLine}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
