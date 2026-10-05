import { useMemo, useState } from 'react'
import { usePageSeo } from '../lib/seo'
import { galleryFilters, galleryItems, type GalleryCategory } from '../data/gallery'
import { img } from '../data/images'
import { waLink, waMessages } from '../lib/whatsapp'
import { WhatsAppButton } from '../components/Button'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { MenuCategoryFilter } from '../components/MenuCategoryFilter'
import { Lightbox, type LightboxEntry } from '../components/Lightbox'
import styles from './GalleryPage.module.css'

type FilterId = (typeof galleryFilters)[number]['id']

export function GalleryPage() {
  usePageSeo({
    title: 'Gallery | B Biryani Restaurant — Food & Restaurant Photos, Mingora',
    description:
      'Photos of biryani, BBQ, mandi, karahi and the restaurant itself at B Biryani, Mingora, Swat. Browse the gallery and order on WhatsApp.',
    path: '/gallery',
  })

  const [filter, setFilter] = useState<FilterId>('all')
  const [openIndex, setOpenIndex] = useState(-1)

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryItems.length }
    for (const item of galleryItems) map[item.category] = (map[item.category] ?? 0) + 1
    map.videos = 0
    return map
  }, [])

  const visible = useMemo(() => {
    if (filter === 'all') return galleryItems
    if (filter === 'videos') return []
    return galleryItems.filter((g) => g.category === (filter as GalleryCategory))
  }, [filter])

  const entries: LightboxEntry[] = useMemo(
    () =>
      visible.map((g) => ({
        asset: img(g.image),
        caption: img(g.image).alt,
      })),
    [visible]
  )

  return (
    <>
      {/* ---------- page header ---------- */}
      <header className="page-head">
        <div className="container page-head__inner">
          <span className="eyebrow eyebrow--saffron">Gallery</span>
          <h1>Plates, fires and the flavours of Swat</h1>
          <p className="lead">
            Photos of the food we serve and the kind of room we run. Tap any photo
            to open it full-screen.
          </p>
          <div className="page-head__meta">
            <span className="chip chip--dark">
              <Icon name="camera" size={14} />
              {galleryItems.length} photos
            </span>
            <span className="chip chip--dark">
              <Icon name="pin" size={14} />
              Mingora, Swat
            </span>
          </div>
        </div>
      </header>

      {/* ---------- filters ---------- */}
      <div className="container">
        <MenuCategoryFilter
          categories={galleryFilters.map((f) => ({ id: f.id, label: f.label }))}
          active={filter}
          counts={counts}
          onChange={(id) => setFilter(id as FilterId)}
          label="Filter photos by category"
        />
      </div>

      {/* ---------- grid ---------- */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          {visible.length === 0 ? (
            <div className={styles.empty}>
              <Icon name="camera" size={30} />
              <h2>No videos yet</h2>
              <p>
                We haven&apos;t been sent any video from the restaurant so far — instead of
                showing something that isn&apos;t ours, we&apos;ve left this shelf empty.
                Photos above tell the story in the meantime.
              </p>
              <WhatsAppButton href={waLink(waMessages.menu)}>
                Ask us for a look inside
              </WhatsAppButton>
            </div>
          ) : (
            <div className={styles.grid}>
              {visible.map((item, i) => {
                const asset = img(item.image)
                return (
                  <Reveal key={item.id} delay={(i % 4) * 60} className={styles.cell}>
                    <button
                      type="button"
                      className={styles.tile}
                      onClick={() => setOpenIndex(i)}
                      aria-label={`Open photo: ${asset.alt}`}
                    >
                      <img
                        src={asset.src}
                        srcSet={asset.srcSet}
                        sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 300px"
                        width={asset.width}
                        height={asset.height}
                        alt={asset.alt}
                        loading={i < 6 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <span className={styles.tileOverlay}>
                        <Icon name="arrow-up-right" size={18} />
                      </span>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          )}

          <p className={styles.photoNote}>
            Photography is illustrative at this stage — we&apos;re waiting on the
            restaurant&apos;s own photos of the food and the room. Want a real look
            inside? Message us on WhatsApp and we&apos;ll send you pictures.
            <WhatsAppButton
              href={waLink(waMessages.menu)}
              variant="outline"
              size="sm"
              className={styles.photoNoteBtn}
            >
              Ask for photos
            </WhatsAppButton>
          </p>
        </div>
      </section>

      <Lightbox
        entries={entries}
        index={openIndex}
        onClose={() => setOpenIndex(-1)}
        onNavigate={setOpenIndex}
      />
    </>
  )
}
