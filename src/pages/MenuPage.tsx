import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageSeo } from '../lib/seo'
import { contactData } from '../data/site'
import { menuCategories, menuItems, type MenuItem } from '../data/menu'
import { waLink, waMessages } from '../lib/whatsapp'
import { Button, WhatsAppButton } from '../components/Button'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { MenuCard } from '../components/MenuCard'
import { MenuCategoryFilter } from '../components/MenuCategoryFilter'
import { LocationSection } from '../components/LocationSection'
import styles from './MenuPage.module.css'

export function MenuPage() {
  usePageSeo({
    title: 'Menu | B Biryani Restaurant — Biryani, BBQ & Desi Food in Mingora',
    description:
      'Explore the B Biryani menu: biryani, chicken mandi, karahi, grilled fish, batair, steaks and more in Mingora, Swat. Order on WhatsApp.',
    path: '/menu',
  })

  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? 'all'

  const validIds = useMemo(() => new Set(menuCategories.map((c) => c.id)), [])
  const selected = validIds.has(active) ? active : 'all'

  useEffect(() => {
    if (selected !== active) setParams({ category: selected }, { replace: true })
  }, [active, selected, setParams])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: menuItems.length }
    for (const item of menuItems) map[item.category] = (map[item.category] ?? 0) + 1
    return map
  }, [])

  const shown: MenuItem[] = useMemo(
    () => (selected === 'all' ? menuItems : menuItems.filter((i) => i.category === selected)),
    [selected]
  )

  const selectCategory = (id: string) => setParams(id === 'all' ? {} : { category: id })

  const verifiedCount = menuItems.filter((i) => i.verified).length

  return (
    <>
      {/* ---------- page header ---------- */}
      <header className="page-head">
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--saffron">Food menu</span>
          <h1>Everything on the table at B Biryani</h1>
          <p className="lead">
            Biryani first — then mandi, karahi, grilled fish, batair, steaks and the
            sides that finish the meal. Message us on WhatsApp to order or to ask
            what&apos;s available today.
          </p>
          <div className="page-head__meta">
            <span className="chip chip--dark">
              <Icon name="utensils" size={14} />
              {menuItems.length} menu items
            </span>
            <span className="chip chip--dark">
              <Icon name="flame" size={14} />
              {verifiedCount} confirmed from the listing
            </span>
            <span className="chip chip--dark">
              <Icon name="whatsapp" size={14} />
              Order on WhatsApp
            </span>
          </div>
        </div>
      </header>

      {/* ---------- filter ---------- */}
      <div className="container">
        <MenuCategoryFilter
          categories={menuCategories}
          active={selected}
          counts={counts}
          onChange={selectCategory}
        />
      </div>

      {/* ---------- grid ---------- */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          <div className={styles.gridHead}>
            <h2 className={styles.gridTitle}>
              {menuCategories.find((c) => c.id === selected)?.label}
              <span className={styles.gridCount}>
                {shown.length} {shown.length === 1 ? 'item' : 'items'}
              </span>
            </h2>
          </div>

          <div className={styles.grid} aria-live="polite">
            {shown.map((item, i) => (
              <Reveal key={item.id} delay={(i % 4) * 70}>
                <MenuCard item={item} index={i} />
              </Reveal>
            ))}
          </div>

          {/* ---------- honest availability note ---------- */}
          <aside className={styles.note}>
            <Icon name="sparkle" size={20} />
            <div>
              <strong>Prices &amp; today&apos;s menu</strong>
              <p>
                The restaurant hasn&apos;t published its full price list online yet, so we
                don&apos;t show prices we can&apos;t confirm. Message us and we&apos;ll send
                today&apos;s menu, serving sizes and anything you&apos;d like to know before
                you order.
              </p>
            </div>
            <WhatsAppButton href={waLink(waMessages.menu)} className={styles.noteBtn}>
              Get today&apos;s menu
            </WhatsAppButton>
          </aside>

          <div className={styles.ctaRow}>
            <Button to="/gallery" variant="outline" icon="camera">
              See food photos
            </Button>
            <Button href={contactData.phone.tel} variant="outline" icon="phone">
              Call {contactData.phone.display}
            </Button>
            <WhatsAppButton href={waLink(waMessages.menu)} size="lg">
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <LocationSection
        title="Come eat with us"
        copy="Dine in at Bypass Swat Chowk, near Fizagat — or message us and we'll let you know the fastest way to get your order."
      />
    </>
  )
}
