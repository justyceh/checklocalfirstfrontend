# CheckLocalFirst — Frontend

A community-first local business directory for **Reno, Nevada**. The platform connects residents who want to shop local with small, real Reno-owned businesses. This is **not** a review site and not a replacement for Google or Yelp — it's a discovery tool designed to keep money and loyalty inside the local community.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Fonts | Geist Sans/Mono (body), Playfair Display (headings) |
| Backend | Separate Node/Express API hosted on Render.com |
| Auth | JWT issued by the backend, stored in `localStorage` |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
git clone <repo-url>
cd clffrontend
npm install
```

Create a `.env` file in the project root (copy from a teammate or the section below), then:

```bash
npm run dev   # http://localhost:3000
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://checklocalfirst.onrender.com
```

This is the only required env var. It's public (prefixed `NEXT_PUBLIC_`) so it's safe to expose in the browser. No sensitive keys live in this repo — those belong to the backend.

---

## Commands

```bash
npm run dev     # Start dev server (localhost:3000, hot reload)
npm run build   # Production build
npm run start   # Start production server (run build first)
npm run lint    # ESLint check
```

No test runner is configured yet.

---

## Directory Structure

```
clffrontend/
├── app/                        # Next.js App Router — pages and layouts
│   ├── layout.tsx              # Root layout: loads fonts, wraps Navbar + Footer
│   ├── globals.css             # Global styles and Tailwind imports
│   ├── page.tsx                # Homepage (hero + marketing sections)
│   ├── search/page.tsx         # Search results page
│   ├── businesses/
│   │   ├── page.tsx            # Business directory grid
│   │   └── [slug]/page.tsx     # Individual business detail page
│   ├── dashboard/
│   │   ├── page.tsx            # Protected dashboard (routes by role)
│   │   └── setup/page.tsx      # First-time business onboarding
│   ├── login/page.tsx          # Login form
│   ├── signup/page.tsx         # Signup form (User vs. Business tabs)
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   └── not-found.tsx           # Custom 404 page
│
├── components/                 # Shared React components
│   ├── Navbar.tsx              # Fixed header, auth dropdown, mobile menu
│   ├── Footer.tsx              # Global footer
│   ├── HeroSection.tsx         # Homepage hero with search + category pills
│   ├── SearchBar.tsx           # Keyword + category search (reused on search page)
│   ├── BusinessCard.tsx        # Business listing card
│   ├── ServiceCard.tsx         # Service listing card
│   ├── ServiceResultCard.tsx   # Search result card (service + business info)
│   ├── FeaturedSection.tsx     # Homepage featured businesses
│   ├── TrustSection.tsx        # Homepage value proposition
│   ├── InstructionsSection.tsx # "How it works" section
│   ├── StatSection.tsx         # Homepage statistics
│   ├── FadeIn.tsx              # Scroll-triggered fade-in animation wrapper
│   ├── NotFoundSearch.tsx      # "No results" fallback
│   └── dashboard/              # Dashboard-specific components
│       ├── DashboardShell.tsx  # Auth guard + role router
│       ├── UserDashboard.tsx   # Regular user account view (stub)
│       ├── BusinessDashboard.tsx # Business owner view (edit listing, manage services)
│       ├── ServiceManager.tsx  # Service CRUD interface
│       └── SetupShell.tsx      # Business onboarding flow
│
├── lib/                        # Utilities and shared logic
│   ├── auth.ts                 # Auth helpers: getAuth, saveAuth, clearAuth, getAuthHeaders
│   ├── types.ts                # TypeScript types: Category, Business, BusinessService, etc.
│   ├── constants.ts            # CATEGORIES list and API_BASE_URL
│   └── server-utils.ts         # Photo lookup utility for businesses
│
├── public/
│   └── imgs/                   # Static images (logo, hero background, business photos)
│
├── CONTEXT.MD                  # Full API endpoint reference — read this before touching API calls
├── PREMIUM.md                  # Planned premium features spec
└── UPDATE.MD                   # Recent change log
```

---

## Key Concepts

### Client vs. Server Components

Pages under `app/` are **server components by default** — they can be `async` and fetch data directly. Components under `components/` that use state, effects, or browser APIs must declare `'use client'` at the top of the file.

### Path Alias

`@/` resolves to the repo root. Always use it for imports:

```ts
import { CATEGORIES } from '@/lib/constants';
import { getAuth } from '@/lib/auth';
```

### Styling

- Use **Tailwind utility classes** for layout, spacing, and responsive design.
- Co-locate a `.css` file with the component (e.g., `HeroSection.css`) for complex or background-image-driven styles that are awkward to express in Tailwind.
- Brand colors live in the code as hex values — primary green `#3a6e3f`, background `#f7f7f5`.

---

## Authentication

Auth is JWT-based. The backend issues a token on login; the frontend stores it in `localStorage` under the key `clf_auth`.

**Helpers in `lib/auth.ts`:**

```ts
getAuth()          // returns { token, userId, email, accountType } | null
saveAuth(data)     // persists auth to localStorage
clearAuth()        // removes auth from localStorage (logout)
getAuthHeaders()   // returns { Authorization: 'Bearer <token>' } for fetch calls
```

**Flow:**

1. User signs up at `/signup` (Personal or Business tab)
2. Redirected to `/login`
3. On success, token saved → user routed to `/dashboard` or `/dashboard/setup`
4. Protected pages call `getAuth()` and redirect to `/login` if `null`
5. All protected API calls pass `getAuthHeaders()` in the fetch options

**Account types:** `user` (regular resident) and `business` (business owner). The dashboard routes to a different view based on `accountType`.

---

## API Integration

Base URL comes from env: `process.env.NEXT_PUBLIC_API_BASE_URL`

The full API reference is in [CONTEXT.MD](./CONTEXT.MD). Key endpoints:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/businesses` | All business listings |
| `GET` | `/businesses/:slug` | Single business |
| `GET` | `/businesses/:slug/services` | Services for a business |
| `POST` | `/businesses/:slug/services` | Add service (protected) |
| `PUT` | `/businesses/:slug/services/:id` | Update service (protected) |
| `DELETE` | `/businesses/:slug/services/:id` | Delete service (protected) |
| `PUT` | `/businesses/:slug` | Update business info (protected) |
| `GET` | `/search?q=&category=` | Full-text + category search |
| `GET` | `/categories` | Available categories |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/signup/user` | Create user account |
| `POST` | `/auth/signup/business` | Create business account |
| `POST` | `/auth/logout` | Logout (invalidates session on backend) |
| `GET` | `/users/me` | Current user profile (protected) |
| `PUT` | `/users/me` | Update user profile (protected) |

**Example protected fetch:**

```ts
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
  headers: getAuthHeaders(),
});
```

---

## Categories

The platform uses 8 fixed service categories (defined in `lib/constants.ts`):

- Clothing & Apparel
- Home Decor & Furniture
- Gifts & Specialty
- Art & Design
- Jewelry & Accessories
- Plants & Garden
- Sustainable Living
- Beauty & Wellness

---

