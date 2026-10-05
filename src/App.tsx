import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { MobileBottomBar } from './components/MobileBottomBar'
import { Button } from './components/Button'
import { useSiteJsonLd, usePageSeo } from './lib/seo'
import { siteMeta } from './data/site'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { AboutPage } from './pages/AboutPage'
import { GalleryPage } from './pages/GalleryPage'
import { ContactPage } from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function NotFoundPage() {
  usePageSeo({ title: `Page not found | ${siteMeta.title}`, path: '/404' })
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center' }}>
        <span className="eyebrow eyebrow--plain">404</span>
        <h1 style={{ marginBlock: '0.75rem 1rem' }}>This page couldn&apos;t be found.</h1>
        <p className="lead" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
          The link may be old. Head back to the home page or browse the menu.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Button to="/" icon="arrow-left">
            Back to home
          </Button>
          <Button to="/menu" variant="outline">
            View the menu
          </Button>
        </div>
        <p style={{ marginTop: '2.5rem', fontSize: 'var(--fs-sm)' }}>
          Or <Link to="/contact">contact us</Link> — we&apos;ll help you find what you need.
        </p>
      </div>
    </section>
  )
}

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className={isHome ? 'is-hero' : ''}>
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  )
}

export default function App() {
  useSiteJsonLd()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
