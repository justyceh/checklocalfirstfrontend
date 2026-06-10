# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Stack

- **Next.js 16.2.9** with App Router — see AGENTS.md warning; consult `node_modules/next/dist/docs/` before using unfamiliar APIs
- **React 19.2.4**
- **TypeScript** (strict mode) — path alias `@/*` resolves to the repo root
- **Tailwind CSS v4** via `@tailwindcss/postcss` — the v4 config API differs from v3; no `tailwind.config.js`, configuration lives in CSS and PostCSS

## Architecture

```
app/            # App Router: layouts, pages, global styles
components/     # Shared client components
public/         # Static assets
```

The single root layout (`app/layout.tsx`) loads Geist fonts and wraps all routes. Pages live directly in `app/`. Client components (those that use state, effects, or browser APIs) must be in `components/` with `'use client'` at the top.

Styling splits between Tailwind utility classes for layout/spacing and plain CSS files co-located with components (e.g. `HeroSection.css`) for complex or background-image-driven styles. CSS custom properties in `app/globals.css` define the color theme with automatic dark mode via `prefers-color-scheme`.
