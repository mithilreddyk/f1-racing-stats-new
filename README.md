# PIT WALL 🏎️

Formula 1 stats for new fans — standings, calendar, race results, and beginner-friendly explanations. No jargon.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Features

- **Driver Standings** — Full WDC table with team color accents, P1 gold glow
- **Constructor Standings** — Team championship in card grid layout
- **Race Schedule** — Full calendar with countdowns and past race winners
- **Race Results** — Per-round results with gaps, points, and status
- **Glossary Tooltips** — ⓘ popovers explain F1 terms in plain English
- **Live Countdown** — Next race countdown (days/hrs/mins/secs)
- **Responsive** — Mobile-first, works at 375px to 4K

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data | [Jolpica API](https://api.jolpi.ca/ergast/f1/) (Ergast mirror) |
| Fonts | Barlow Condensed, Inter, JetBrains Mono via `next/font` |

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub, connect repo to Vercel — zero config. No env vars needed (API is public).

## License

MIT
