# B Biryani Restaurant — website

Five-page marketing site for **B Biryani Restaurant** (Bypass Swat Chowk, near Fizagat,
Mingora, Swat, Pakistan). Built with React 19 + TypeScript + Vite.

Focus: help hungry visitors **read the menu, call, order on WhatsApp and find the
restaurant** — quickly, on any phone.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Pages

| Route      | What it does                                                |
| ---------- | ----------------------------------------------------------- |
| `/`        | Hero, featured dishes, about teaser, categories, gallery, rating, map |
| `/menu`    | Filterable menu with `?category=` deep links, honest pricing note |
| `/about`   | Story, how ordering works, signature dishes, rating         |
| `/gallery` | Filterable photo grid with full-screen lightbox (+ video shelf) |
| `/contact` | Call / WhatsApp / address cards, message form, map          |

Any unknown URL renders a designed 404 page. `public/_redirects` and `vercel.json`
provide the SPA fallback for Netlify / Vercel.

## Where to edit things

- **Business facts, phone, hours, rating, SEO copy** → `src/data/site.ts`
  (single source of truth — nothing is hard-coded in components).
- **Menu items and categories** → `src/data/menu.ts`
- **Gallery items and filters** → `src/data/gallery.ts`
- **Image assets, alt text** → `src/data/images.ts` (generated) + `public/images/`
- **Design tokens (colour, type, spacing)** → `src/styles/tokens.css`
- **Document metadata / structured data** → `index.html` + `src/lib/seo.ts`
  (replace `siteMeta.canonical` in `src/data/site.ts` with the production domain).

## Content rules this build follows

These are deliberate — please keep them when editing:

- **No invented facts.** No prices, no delivery claims, no awards, no reviews that
  weren't supplied. Unknown menu entries render as clearly marked placeholders
  ("Menu item" / "Awaiting details") until the real menu is added.
- **No fabricated reviews.** The UI shows the real Google rating (4.5, 264+) and
  links to the listing; `reviewsData.reviews` is empty until approved quotes are
  pasted in.
- **WhatsApp over fake checkout.** Every order CTA opens `wa.me` with a pre-filled
  message (see `src/lib/whatsapp.ts`). The contact form composes the same message —
  there is no backend to wire up later, just replace the submit handler.
- **Map/address, not coordinates.** Directions and the embed are built from the
  street address, so they keep working if the listing moves.
- **Photography is illustrative.** Pexels images (free commercial licence) are
  placeholders; the gallery says so. Swap in the restaurant's own photos by
  replacing files in `public/images` and updating `src/data/images.ts`.

## Structure

```
src/
  components/   Navbar, Footer, MobileBottomBar, Button, Icon, Reveal,
                Logo, FoodCard, MenuCard, MenuCategoryFilter,
                LocationSection, Lightbox
  data/         site.ts, menu.ts, gallery.ts, images.ts
  lib/          whatsapp.ts, seo.ts, hooks.ts
  pages/        HomePage, MenuPage, AboutPage, GalleryPage, ContactPage (+ CSS modules)
  styles/       fonts.css, tokens.css, base.css   (imported by index.css)
```

Global design system lives in `src/index.css` + `src/styles/`; every component and
page styles itself with a co-located CSS module.
