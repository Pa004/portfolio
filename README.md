# Pablo Domínguez — Portfolio 2025

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
- 🎯 **Custom cursor** — dot + lagged ring with hover/click states
- 📊 **Scroll progress bar** — gradient indicator at top of page
- 🌊 **Smooth scroll** — cinematic feel powered by Lenis
- ✨ **Section reveal animations** — blur + fade on viewport entry (Framer Motion)
- 🃏 **3D card tilt** — perspective tilt with glow follow on hover
- 🌈 **Gradient text** — blue→cyan gradient on all main headings
- 🔲 **Noise texture overlay** — subtle film-grain depth effect
- ⬆️ **Back to top button** — appears after 400px scroll

### Sections
- 🦸 **Hero** — name, typewriter roles, terminal code block, animated particle background
- 👤 **About** — bio, location pills, animated counter stats, areas of interest
- 🛠️ **Skills** — 7 tech categories with tilt cards and colored tags
- 🚀 **Projects** — 4 projects (2 featured, 2 secondary) with Live/Deployed/Academic badges
- 🎓 **Education** — animated timeline with ESPE degree + DataCamp certification
- 📬 **Contact** — email copy-to-clipboard with toast, social links

### Animated backgrounds (per section)
| Section | Background |
|---|---|
| Hero | Particle network |
| About / Skills | Pulsing grid blueprint |
| Projects | Floating color orbs |
| Education | Connected dot particles |
| Contact | Animated wave layers |

### Extras
- 🌍 **Bilingual** — English / Spanish toggle (EN/ES) with full content switch
- 🖥️ **Loading screen** — terminal-style progress animation on first load
- 🐣 **Console easter egg** — ASCII art + contact info in DevTools (F12)
- 🖼️ **OG Image** — auto-generated preview when sharing the link

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + inline styles |
| Animations | Framer Motion + GSAP |
| Smooth scroll | Lenis |
| Fonts | Geist Sans + Geist Mono |
| Deploy | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — global components
│   ├── page.tsx                # Main page — section composition
│   ├── globals.css             # Global styles + Tailwind v4 theme
│   └── opengraph-image.tsx     # Auto-generated OG image
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed navbar with EN/ES toggle + mobile menu
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with terminal + particles
│   │   ├── About.tsx           # Bio + stats + interests
│   │   ├── Skills.tsx          # Tech skills grid
│   │   ├── Projects.tsx        # Featured + secondary project cards
│   │   ├── Education.tsx       # Timeline education + certs
│   │   └── Contact.tsx         # Email + social links
│   └── ui/
│       ├── AvatarIllustration.tsx  # Terminal code block + badge carousel
│       ├── BackToTop.tsx           # Floating back to top button
│       ├── ConsoleEasterEgg.tsx    # DevTools ASCII art
│       ├── CounterStat.tsx         # Animated number counter
│       ├── CustomCursor.tsx        # Custom dot + ring cursor
│       ├── GradientText.tsx        # Blue→cyan gradient text wrapper
│       ├── LoadingScreen.tsx       # First-load terminal animation
│       ├── NoiseOverlay.tsx        # Film-grain texture overlay
│       ├── ParticleCanvas.tsx      # Hero particle network canvas
│       ├── RevealSection.tsx       # Blur + fade viewport reveal
│       ├── ScrollProgress.tsx      # Top progress bar
│       ├── SectionBackground.tsx   # Per-section animated backgrounds
│       ├── SmoothScroll.tsx        # Lenis smooth scroll provider
│       ├── TiltCard.tsx            # 3D perspective tilt card
│       ├── Toast.tsx               # Notification toast
│       └── TypeWriter.tsx          # Typewriter role animation
├── lib/
│   ├── content.ts              # All project data, links and skills
│   └── styles.ts               # Shared inline style objects (glass, gridBg)
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
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
    ├── feat/setup
    ├── feat/navbar
    ├── feat/hero
    ├── feat/skills
    ├── feat/projects
    ├── feat/education
    ├── feat/contact
    ├── feat/tier1-enhancements
    ├── feat/tier2-enhancements
    └── feat/tier3-enhancements
```

---

## 📬 Contact

| | |
|---|---|
| **Email** | pablodo004@gmail.com |
| **GitHub** | [github.com/Pa004](https://github.com/Pa004) |
| **LinkedIn** | [linkedin.com/in/pablo-domínguez-445241385](https://www.linkedin.com/in/pablo-dom%C3%ADnguez-445241385/) |
| **ResearchGate** | [researchgate.net/profile/Pablo-Dominguez-21](https://www.researchgate.net/profile/Pablo-Dominguez-21) |
| **ORCID** | [orcid.org/0009-0000-6400-026X](https://orcid.org/0009-0000-6400-026X) |

---

## 📄 License

MIT © 2025 Pablo Domínguez
