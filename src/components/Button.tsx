import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.css'

type Variant = 'primary' | 'accent' | 'outline' | 'outlineLight' | 'dark' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children: ReactNode
  /** Internal route (react-router). */
  to?: string
  /** External URL, tel:, mailto:, wa.me, etc. */
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  icon?: IconName
  iconAfter?: boolean
  block?: boolean
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  ariaLabel?: string
  external?: boolean
  download?: boolean
}

/**
 * The one button used for every CTA on the site (links to /menu, WhatsApp,
 * tel:, maps, forms). Keeps sizing, focus states and hover motion consistent.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter = false,
  block = false,
  className = '',
  style,
  type = 'button',
  ariaLabel,
  external,
  download,
}: Props) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    block ? styles.block : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconEl = icon ? <Icon name={icon} size={size === 'lg' ? 20 : 18} className={styles.icon} /> : null
  const content = (
    <>
      {iconEl && !iconAfter ? iconEl : null}
      <span className={styles.label}>{children}</span>
      {iconEl && iconAfter ? iconEl : null}
    </>
  )

  const isExternal = external ?? Boolean(href)
  const externalProps = isExternal && href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {}

  if (to) {
    return (
      <Link to={to} className={classes} style={style} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        aria-label={ariaLabel}
        download={download}
        {...externalProps}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style} aria-label={ariaLabel}>
      {content}
    </button>
  )
}

/** WhatsApp-styled CTA — every WhatsApp entry point goes through here. */
export function WhatsAppButton({
  href,
  children = 'Order on WhatsApp',
  variant = 'accent',
  size = 'md',
  block = false,
  className = '',
  ariaLabel,
}: {
  href: string
  children?: ReactNode
  variant?: Variant
  size?: Size
  block?: boolean
  className?: string
  ariaLabel?: string
}) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      block={block}
      className={className}
      icon="whatsapp"
      ariaLabel={ariaLabel}
    >
      {children}
    </Button>
  )
}
