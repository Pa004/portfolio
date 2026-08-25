# Pablo Domínguez — Portfolio 2026

> Full Stack Developer · Software Engineering student at ESPE · Quito, Ecuador

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://portfolio-ochre-xi-ba44zo6k9y.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## 🌐 Live

**[portfolio-ochre-xi-ba44zo6k9y.vercel.app](https://portfolio-ochre-xi-ba44zo6k9y.vercel.app)**

---

## ✨ Features

### Visual & UX
- 🌓 **Dark / Light mode** — theme toggle with `localStorage` persistence and WCAG 2.2 verified contrast (adaptive indigo palette in light mode)
- 🔦 **Interactive spotlight** — cursor-following radial glow across the Hero section
- 🎯 **Custom cursor** — dot + lagged ring with dynamic hover and click states
- 📊 **Scroll progress bar** — top-of-page gradient indicator
- 🌊 **Smooth scroll** — cinematic inertia powered by Lenis
- ✨ **Section reveal animations** — staggered blur + fade on viewport entry (Framer Motion)
- 🃏 **3D card tilt** — perspective tilt with glow follow on hover (TiltCard)
- 🍱 **Bento Grid layouts** — asymmetric card distribution in Skills and About areas of interest
- 🌈 **Gradient typography** — high-contrast gradient headings
- 🔲 **Noise texture overlay** — subtle film-grain depth effect
- ⬆️ **Back to top button** — floating button appearing after 400px scroll
- ♿ **Reduced motion support** — full compliance with `prefers-reduced-motion` settings

### Sections
- 🦸 **Hero** — name with staggered word-by-word blur reveal, typewriter roles, interactive spotlight, theme-adaptive terminal code block with technology marquee carousel, and particle network canvas
- 👤 **About** — bio, location badges, real-world project & repository metrics counter, and interactive Bento Grid for areas of interest
- 🛠️ **Skills** — asymmetric Bento Grid highlighting Frontend and Backend with specialized category tags
- 🚀 **Projects** — featured and secondary cards with previews, screenshots, live links, repository access, and status badges
- 🎓 **Education** — timeline covering ESPE Software Engineering degree and DataCamp certifications
- 📬 **Contact** — email copy-to-clipboard with Sonner toast notifications and verified social links

### Animated backgrounds (per section)
| Section | Background |
|---|---|
| Hero | Particle network canvas + Cursor spotlight |
| About / Skills | Pulsing blueprint grid |
| Projects | Floating ambient color orbs |
| Education | Connected particle network |
| Contact | Animated layered wave flows |

### Extras
- 🌍 **Bilingual support** — English / Spanish (EN/ES) toggle with full content switch
- 🖥️ **Loading screen** — terminal-style boot progress animation on initial visit
- 🚫 **Custom 404 page** — interactive terminal-themed error route (`/not-found`)
- 🐣 **Console easter egg** — ASCII art greeting and contact details in DevTools (F12)
- 🖼️ **Dynamic OG Image** — automatic metadata preview card generation

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + Adaptive CSS Variables |
| Theming | Next-Themes (Dark / Light) |
| Animations | Framer Motion + GSAP |
| Smooth scroll | Lenis |
| Notifications | Sonner |
| Icons | Tabler Icons React + Lucide Icons |
| Fonts | Geist Sans + Geist Mono |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — theme provider, toaster, global overlays
│   ├── page.tsx                # Main page — section composition & dividers
│   ├── not-found.tsx           # Custom 404 terminal page
│   ├── globals.css             # Theme tokens (light/dark) + Tailwind v4 configuration
│   ├── opengraph-image.tsx     # Dynamic OG image generator
│   └── favicon.ico             # App icon
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed navbar with theme & EN/ES toggles + mobile menu
│   │   └── Footer.tsx          # Footer with social links & copyright
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with spotlight, typewriter & terminal
│   │   ├── About.tsx           # Bio, project metrics & interests bento grid
│   │   ├── Skills.tsx          # Asymmetric bento grid of tech capabilities
│   │   ├── Projects.tsx        # Featured project cards with screenshots & links
│   │   ├── Education.tsx       # Degree & certifications timeline
│   │   └── Contact.tsx         # Email copy & direct social channels
│   └── ui/
│       ├── AvatarIllustration.tsx  # Hero terminal code block + badge marquee carousel
│       ├── BackToTop.tsx           # Floating back-to-top button
│       ├── ConsoleEasterEgg.tsx    # DevTools ASCII art message
│       ├── CounterStat.tsx         # Animated number counter
│       ├── CustomCursor.tsx        # Custom dot + ring interactive cursor
│       ├── GradientText.tsx        # Gradient text wrapper
│       ├── LoadingScreen.tsx       # First-load terminal animation
│       ├── NoiseOverlay.tsx        # Film-grain texture overlay
│       ├── ParticleCanvas.tsx      # Hero particle network canvas
│       ├── RevealSection.tsx       # Viewport entry reveal wrapper
│       ├── ScrollProgress.tsx      # Top scroll progress indicator
│       ├── SectionBackground.tsx   # Per-section animated canvas backgrounds
│       ├── SmoothScroll.tsx        # Lenis smooth scroll provider
│       ├── TiltCard.tsx            # 3D perspective tilt card
│       └── TypeWriter.tsx          # Typewriter role cycling animation
├── hooks/
│   └── useReducedMotion.ts     # Hook to respect OS prefers-reduced-motion
├── lib/
│   ├── content.ts              # Data source for projects, skills, education & links
│   ├── lenis.ts                # Lenis smooth scroll configuration
│   └── styles.ts               # Shared adaptive inline style objects
└── types/
    └── index.ts                # Shared TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Pa004/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 🌿 Branch Strategy

```
main          ← production (auto-deploys to Vercel)
└── dev       ← integration branch
    └── feat/*   ← feature branches branched off dev
```

---

## 📬 Contact

| | |
|---|---|
| **Email** | pablodo004@gmail.com |
| **GitHub** | [github.com/Pa004](https://github.com/Pa004) |
| **LinkedIn** | [linkedin.com/in/pabl004-dev](https://www.linkedin.com/in/pabl004-dev) |
| **ResearchGate** | [researchgate.net/profile/Pablo-Dominguez-21](https://www.researchgate.net/profile/Pablo-Dominguez-21) |
| **ORCID** | [orcid.org/0009-0000-6400-026X](https://orcid.org/0009-0000-6400-026X) |

---

## 📄 License

MIT © 2026 Pablo Domínguez
