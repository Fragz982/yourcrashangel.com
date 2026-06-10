# yourcrashangel — The Accident Translator

Marketing website for **@yourcrashangel**, a personal brand by Angel, a collision estimator in Los Angeles who helps people understand their car accident, estimate, and insurance claim in plain English.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** (scroll-reveal via `useInView`, CSS keyframe hero animations)
- Statically generated (SSG) — no backend required
- Deployable to Vercel or Netlify with zero config

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, SEO metadata
    page.tsx            # Home page (composes all sections)
    globals.css         # Tailwind theme, animations
    checklist/
      page.tsx          # Free "What To Do After A Crash" checklist
  components/
    Navbar.tsx           # Sticky nav with scroll-aware background
    Hero.tsx             # Full-screen hero with headline + CTAs
    Marquee.tsx          # Infinite scrolling rights/pain-points ticker
    FirstFiveMinutes.tsx # 4-step numbered guide
    BeforeAfter.tsx      # Interactive draggable image comparison slider
    ContentCards.tsx      # 3 vertical video cards (9:16) linking to socials
    Reviews.tsx          # 3 testimonial cards (placeholder)
    About.tsx            # Founder bio with avatar placeholder
    FAQ.tsx              # 6-item accordion
    FinalCTA.tsx         # Final call-to-action with Text + Call buttons
    Footer.tsx           # Full footer with disclaimer
    MobileBottomBar.tsx  # Sticky bottom bar (mobile only) with Text + Call
    ScrollReveal.tsx     # Reusable scroll-triggered fade-in component
    Icons.tsx            # All SVG icons (social, UI)
public/
  robots.txt
  sitemap.xml
```

## Customization Guide

### Replace placeholder content

**Photos:**
- **Before/After slider** — In `BeforeAfter.tsx`, replace the gradient placeholder `div`s with real `<Image>` components. Use Next.js `Image` for optimization.
- **Avatar** — In `About.tsx`, replace the "A" circle placeholder with a real photo of Angel.

**Reviews:**
- In `Reviews.tsx`, replace the `[Reviewer Name]` and bracketed review text with real Google reviews. Keep 3 cards or add more.

**Video links:**
- In `ContentCards.tsx`, update the `href` values with real TikTok/Reels/Shorts URLs.

**Social links:**
- Search for `tiktok.com/@yourcrashangel`, `instagram.com/yourcrashangel`, `youtube.com/@yourcrashangel` across the codebase. These appear in: `ContentCards.tsx`, `About.tsx`, `FinalCTA.tsx`, `Footer.tsx`. Update if the URLs differ.

### Open Graph image

Create a 1200x630px OG image and save it as `public/og-image.png`. This is referenced in `layout.tsx` metadata.

### Favicon

Replace `public/favicon.ico` with your brand favicon.

### Domain

After deploying, update these references to your real domain:
- `metadataBase` in `src/app/layout.tsx`
- `<link rel="canonical">` in `src/app/layout.tsx`
- `sitemap.xml` URLs in `public/sitemap.xml`
- `robots.txt` sitemap URL in `public/robots.txt`

## Design Tokens

Defined in `src/app/globals.css` via Tailwind v4 `@theme`:

| Token | Value | Usage |
|-------|-------|-------|
| `accent-orange` | `#ff4d2e` | Primary CTAs, highlights |
| `accent-lime` | `#c7ff3c` | Secondary accent, heading emphasis |
| `background` | `#0a0a0a` | Page background |
| `foreground` | `#fafafa` | Primary text |
| `surface` | `#141414` | Card/section backgrounds |
| `border` | `#262626` | Borders, dividers |
| `muted` | `#71717a` | Secondary text |

Fonts: **Space Grotesk** (display/headings) + **Inter** (body), loaded via `next/font/google`.

## Deploy

### Vercel (recommended)

1. Push to a Git repo (GitHub, GitLab, Bitbucket)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Vercel auto-detects Next.js — no config needed
5. Click Deploy

### Netlify

1. Push to a Git repo
2. Go to [app.netlify.com](https://app.netlify.com)
3. Import the repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Or install `@netlify/plugin-nextjs` for full Next.js support

### Manual / Self-hosted

```bash
npm run build
npm run start    # Starts production server on port 3000
```

## Contact Info (hardcoded)

- Work line: **(213) 279-2992**
- Text: `sms:+12132792992`
- Call: `tel:+12132792992`
- TikTok: `tiktok.com/@yourcrashangel`
- Instagram: `instagram.com/yourcrashangel`
- YouTube: `youtube.com/@yourcrashangel`

## Accessibility

- Semantic HTML (`nav`, `main`, `footer`, `section`, headings in order)
- ARIA labels on interactive elements (slider, buttons, social links)
- `prefers-reduced-motion` support — all animations disabled
- Keyboard-navigable (FAQ accordion, before/after slider supports arrow keys)
- High contrast text on dark background

## SEO

- Title, meta description, Open Graph, Twitter Cards
- Canonical URL
- `robots.txt` + `sitemap.xml`
- Local SEO keywords for "car accident help Los Angeles"
- Semantic heading hierarchy (h1 > h2 > h3)
