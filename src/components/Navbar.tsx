import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { contactData, navItems, links } from '../data/site'
import { waLink, waMessages } from '../lib/whatsapp'
import { useBodyLock, useEscapeKey, useScrolled } from '../lib/hooks'
import { Logo } from './Logo'
import { WhatsAppButton } from './Button'
import { Icon } from './Icon'
import styles from './Navbar.module.css'

/**
 * Sticky site header. Transparent over the home hero, solid once the page
 * scrolls (and on every other route). Becomes a full-screen drawer on mobile.
 */
export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const scrolled = useScrolled(16)
  const [open, setOpen] = useState(false)

  const solid = open || scrolled || !isHome

  useBodyLock(open)
  useEscapeKey(open, () => setOpen(false))

  // Close the drawer whenever the route changes (React-recommended pattern:
  // adjust state during render instead of syncing in an effect).
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    if (open) setOpen(false)
  }

  return (
    <header
      className={[
        styles.header,
        solid && !open ? styles.solid : '',
        open ? styles.open : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={[styles.inner, 'container'].join(' ')}>
        <Logo onDark={!solid || open} />

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.rating}
            href={links.mapSearch}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Rated ${contactData.rating.value} out of 5 on Google — see the listing`}
          >
            <Icon name="star" size={15} filled />
            <span className="tabular">
              {contactData.rating.display}
            </span>
            <span className={styles.ratingCount}>{contactData.rating.reviewsDisplay}+ Google</span>
          </a>

          <WhatsAppButton
            href={waLink(waMessages.menu)}
            size="sm"
            className={styles.headerCta}
            ariaLabel="Order on WhatsApp"
          >
            Order on WhatsApp
          </WhatsAppButton>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* --- mobile drawer --- */}
      <div
        id="mobile-menu"
        className={[styles.drawer, open ? styles.drawerOpen : ''].join(' ')}
        aria-hidden={!open}
      >
        <nav className={styles.drawerNav} aria-label="Mobile">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={{ transitionDelay: open ? `${90 + i * 55}ms` : '0ms' }}
              className={({ isActive }) =>
                [styles.drawerLink, isActive ? styles.drawerLinkActive : ''].join(' ')
              }
            >
              <span className={styles.drawerIndex}>0{i + 1}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.drawerFoot}>
          <WhatsAppButton href={waLink(waMessages.menu)} block size="lg">
            Order on WhatsApp
          </WhatsAppButton>
          <a className={styles.drawerContact} href={contactData.phone.tel}>
            <Icon name="phone" size={17} />
            {contactData.phone.display}
          </a>
          <p className={styles.drawerAddress}>
            {contactData.address.twoLine.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <span className={styles.drawerHours}>
            <Icon name="clock" size={15} />
            {contactData.hours.display}
          </span>
        </div>
      </div>
    </header>
  )
}
