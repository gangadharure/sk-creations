# S K Creations — Official Website

> Glass • ACP • Façade specialists based in Baner, Pune. Two decades of crafting modern architectural finishes.

A fast, fully static, mobile-first marketing site. **Zero build step** — just HTML, CSS, vanilla JS.

## ✨ Features
- Cinematic hero with looping background video
- Sticky glass-blur navigation
- Animated marquee of service highlights
- Filterable project gallery (ACP / Glazing / Interior / Railings)
- Parallax mid-page video showcase
- Scroll-reveal animations (IntersectionObserver)
- Contact form that pre-fills a WhatsApp message
- Floating WhatsApp FAB
- Fully responsive (mobile hamburger menu)
- SEO + Open-Graph meta tags

## 📁 Structure
```
.
├── index.html        # Markup + content
├── styles.css        # All styling
├── script.js         # Nav, filters, reveal, form
├── assets/
│   └── videos/
│       ├── hero.mp4       (your hero clip)
│       └── showcase.mp4   (mid-page clip)
└── vercel.json       # Vercel deploy config
```

## 🎬 Adding your videos
Drop your MP4 clips into `assets/videos/` with the exact names:
- `hero.mp4` — top of the page (recommended: skyline / glass façade, 1080p, < 10 MB, 15–25 sec loop)
- `showcase.mp4` — middle showcase band

Until you add them, the site falls back to high-quality Unsplash poster images automatically.

## 🚀 Run locally
Just open `index.html` in a browser. Or:
```bash
npx serve .
```

## ☁️ Deploy to Vercel
1. Push to GitHub (see below).
2. Go to https://vercel.com → **New Project** → import this repo.
3. Framework preset: **Other** · Build command: *(none)* · Output directory: `.`
4. Click **Deploy**. Done in ~30 seconds.

Or via CLI:
```bash
npm i -g vercel
vercel
```

## 🔧 Customise
- **Phone / WhatsApp**: search `9999999999` in `index.html` and `script.js` and replace.
- **Email / Address**: see the Contact section in `index.html`.
- **Colours**: edit CSS variables at the top of `styles.css` (`--navy`, `--gold`).
- **Gallery images**: replace the `<img src>` URLs in the gallery `<figure>` tiles.

## 📜 License
© S K Creations. All rights reserved.
