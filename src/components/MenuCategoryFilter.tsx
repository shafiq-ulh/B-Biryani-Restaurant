import type { MenuCategory } from '../data/menu'
import styles from './MenuCategoryFilter.module.css'

/**
 * Horizontal category filter for the menu page. Sticky below the navbar so
 * categories stay reachable while scrolling a long menu.
 */
export function MenuCategoryFilter({
  categories,
  active,
  counts,
  onChange,
  label = 'Filter menu by category',
}: {
  categories: MenuCategory[]
  active: string
  counts: Record<string, number>
  onChange: (id: string) => void
  label?: string
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar} role="group" aria-label={label}>
        {categories.map((cat) => {
          const isActive = cat.id === active
          const count = counts[cat.id] ?? 0
          return (
            <button
              key={cat.id}
              type="button"
              className={[styles.pill, isActive ? styles.pillActive : ''].join(' ')}
              aria-pressed={isActive}
              onClick={() => onChange(cat.id)}
            >
              {cat.label}
              <span className={styles.count}>{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
