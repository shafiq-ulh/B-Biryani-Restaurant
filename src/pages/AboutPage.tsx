import { usePageSeo } from '../lib/seo'
import { contactData, links, restaurantData } from '../data/site'
import { featuredDishes } from '../data/menu'
import { img } from '../data/images'
import { waLink, waMessages } from '../lib/whatsapp'
import { Button, WhatsAppButton } from '../components/Button'
import { Icon, Stars } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { FoodCard } from '../components/FoodCard'
import { LocationSection } from '../components/LocationSection'
import styles from './AboutPage.module.css'

const roomImage = img('interior-warm')
const kitchenImage = img('vibe-restaurant-kitchen')

const steps = [
  {
    title: 'Message us on WhatsApp',
    text: 'Tell us what you\'d like — a biryani, a platter for the family, or simply "what do you recommend?"',
  },
  {
    title: 'We reply with the details',
    text: 'Our team confirms what\'s available, serving sizes and anything else you need to know.',
  },
  {
    title: 'Visit us in Mingora',
    text: 'Find the table at Bypass Swat Chowk, near Fizagat — or sort out the rest of the details in the chat.',
  },
]

export function AboutPage() {
  usePageSeo({
    title: 'About | B Biryani Restaurant in Mingora, Swat',
    description:
      'B Biryani is a restaurant in Mingora, near Fizagat, serving biryani alongside Pakistani and desi favourites. See what we cook and how to order.',
    path: '/about',
  })

  return (
    <>
      {/* ---------- page header ---------- */}
      <header className="page-head">
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--saffron">About us</span>
          <h1>A neighbourhood restaurant built around biryani</h1>
          <p className="lead">{restaurantData.description}</p>
          <div className="page-head__meta">
            <span className="chip chip--dark">
              <Icon name="pin" size={14} />
              {contactData.location.label}
            </span>
            <span className="chip chip--dark">
              <Icon name="star" size={14} filled />
              {contactData.rating.display} on {contactData.rating.source}
            </span>
            <span className="chip chip--dark">
              <Icon name="clock" size={14} />
              {contactData.hours.display}
            </span>
          </div>
        </div>
      </header>

      {/* ---------- story ---------- */}
      <section className="section">
        <div className={`container ${styles.storyGrid}`}>
          <Reveal className={styles.storyMedia}>
            <div className="frame">
              <img
                src={roomImage.src}
                srcSet={roomImage.srcSet}
                sizes="(max-width: 900px) 100vw, 44vw"
                width={roomImage.width}
                height={roomImage.height}
                alt={roomImage.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={`frame ${styles.storyMediaSmall}`}>
              <img
                src={kitchenImage.src}
                srcSet={kitchenImage.srcSet}
                sizes="(max-width: 900px) 50vw, 22vw"
                width={kitchenImage.width}
                height={kitchenImage.height}
                alt={kitchenImage.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          <Reveal delay={110} className={styles.storyCopy}>
            <span className="eyebrow">Our story</span>
            <h2>{restaurantData.positioning}</h2>
            <p>
              We keep the focus where it belongs: food that tastes like home, served
              without fuss. The menu travels from biryani — the dish we&apos;re named
              after — through mandi, grilled fish, karahi, batair and steaks, so
              there&apos;s something for every kind of appetite at one table.
            </p>
            <p>
              You&apos;ll find us where Mingora meets Fizagat, easy to reach from
              anywhere in Swat. Drop us a message before you come and we&apos;ll let you
              know what&apos;s on.
            </p>

            <ul className={styles.cuisineList}>
              {restaurantData.cuisine.map((c) => (
                <li key={c}>
                  <Icon name="check" size={15} />
                  {c}
                </li>
              ))}
            </ul>

            <div className="btn-row">
              <Button to="/menu" icon="utensils" iconAfter>
                View the menu
              </Button>
              <WhatsAppButton href={waLink(waMessages.contact)}>
                Talk to us
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- how to order ---------- */}
      <section className={`section section--dark ${styles.steps}`}>
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow eyebrow--saffron">Ordering is simple</span>
            <h2 className="section-heading__title">Three messages away from dinner</h2>
          </div>

          <div className={styles.stepGrid}>
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 110} className={styles.step}>
                <span className={styles.stepIndex}>0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>

          <div className={styles.stepCta}>
            <WhatsAppButton href={waLink(waMessages.menu)} size="lg">
              Start a WhatsApp chat
            </WhatsAppButton>
            <Button href={contactData.phone.tel} variant="outlineLight" size="lg" icon="phone">
              {contactData.phone.display}
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- signature dishes ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div className="section-heading__copy">
              <span className="eyebrow">On the menu</span>
              <h2 className="section-heading__title">The dishes we&apos;re known for</h2>
              <p className="lead">
                These names come straight from the restaurant&apos;s listing — the rest of
                the menu is one tap away.
              </p>
            </div>
            <Button to="/menu" variant="outline" iconAfter icon="arrow-right">
              Full menu
            </Button>
          </div>

          <div className={styles.dishGrid}>
            {featuredDishes.slice(0, 3).map((dish, i) => (
              <Reveal key={dish.id} delay={i * 90}>
                <FoodCard dish={dish} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- rating ---------- */}
      <section className={`section section--tight ${styles.rating}`}>
        <div className={`container ${styles.ratingInner}`}>
          <Reveal className={styles.ratingScore}>
            <Stars value={contactData.rating.value} size={26} id="about" />
            <span className={styles.ratingNumber}>{contactData.rating.display}</span>
            <span className={styles.ratingLabel}>
              {contactData.rating.reviewsDisplay}+ reviews on {contactData.rating.source}
            </span>
          </Reveal>
          <Reveal delay={90} className={styles.ratingCopy}>
            <p>
              Guests leave their feedback on our Google listing — it&apos;s the most
              honest picture of what a visit to B Biryani is like.
            </p>
            <Button href={links.mapSearch} variant="dark" iconAfter icon="arrow-up-right">
              See the Google listing
            </Button>
          </Reveal>
        </div>
      </section>

      <LocationSection
        title="Where to find us"
        copy="B Biryani sits at Bypass Swat Chowk, near Fizagat in Mingora — right where Swat comes together."
      />
    </>
  )
}
