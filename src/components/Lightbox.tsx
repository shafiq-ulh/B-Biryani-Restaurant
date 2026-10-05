import { useCallback, useEffect, useRef } from 'react'
import type { ImageAsset } from '../data/images'
import { useBodyLock, useEscapeKey } from '../lib/hooks'
import { Icon } from './Icon'
import styles from './Lightbox.module.css'

export type LightboxEntry = { asset: ImageAsset; caption?: string }

/**
 * Full-screen image viewer with keyboard navigation (←/→/Esc) and swipe-free
 * controls kept large enough for thumbs. Mounted only while open.
 */
export function Lightbox({
  entries,
  index,
  onClose,
  onNavigate,
}: {
  entries: LightboxEntry[]
  index: number
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const isOpen = index >= 0 && index < entries.length
  const entry = isOpen ? entries[index] : undefined

  const go = useCallback(
    (delta: number) => {
      if (!entries.length) return
      onNavigate((index + delta + entries.length) % entries.length)
    },
    [entries.length, index, onNavigate]
  )

  useBodyLock(isOpen)
  useEscapeKey(isOpen, onClose)

  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, go])

  if (!isOpen || !entry) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer — ${entry.asset.alt}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.toolbar}>
        <span className={styles.counter}>
          {index + 1} / {entries.length}
        </span>
        <button
          type="button"
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      <button
        type="button"
        className={[styles.nav, styles.prev].join(' ')}
        onClick={() => go(-1)}
        aria-label="Previous photo"
      >
        <Icon name="chevron-left" size={26} />
      </button>

      <figure className={styles.figure}>
        <img
          src={entry.asset.src}
          srcSet={entry.asset.srcSet}
          sizes="92vw"
          width={entry.asset.width}
          height={entry.asset.height}
          alt={entry.asset.alt}
          decoding="async"
        />
        <figcaption className={styles.caption}>
          {entry.caption ?? entry.asset.alt}
        </figcaption>
      </figure>

      <button
        type="button"
        className={[styles.nav, styles.next].join(' ')}
        onClick={() => go(1)}
        aria-label="Next photo"
      >
        <Icon name="chevron-right" size={26} />
      </button>
    </div>
  )
}
