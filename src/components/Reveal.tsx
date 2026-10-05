import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Props = {
  as?: ElementType
  children: ReactNode
  /** Stagger delay in ms for grouped elements. */
  delay?: number
  className?: string
  id?: string
}

/**
 * Fade-up reveal on scroll. Content is visible immediately when JavaScript is
 * unavailable or the visitor prefers reduced motion.
 */
export function Reveal({ as: Tag = 'div', children, delay = 0, className = '', id }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(
    () =>
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      id={id}
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
