# 710.az — Project Progress Tracker

> **Last Updated:** 2026-03-05 (codebase analysis)
> **Repo:** https://github.com/jafarmammadli/710az
> **Status:** 🟢 Phase 1 — E-Commerce Website (in progress)

---

## 🗺️ Project Overview

**What is 710.az?**
An automotive e-commerce platform for Azerbaijan — selling car oils, fluids, filters, and parts. Phase 2 will expand into a physical service center (quick oil change, drive-thru lube).

**Why "710"?** OIL flipped upside down = 710. Memorable, brandable, expandable.

---

## 📦 Tech Stack (Decided)

| Layer | Tool | Status |
|---|---|---|
| Framework | Next.js 16 (App Router) | ✅ In use |
| Hosting | Vercel | ⬜ Not started |
| Database | Supabase (PostgreSQL) | ✅ Client + schema in repo |
| Auth | Supabase Auth | ⬜ Not started |
| Payments | Stripe | ⬜ Not started |
| Search | Meilisearch (self-hosted) | ⬜ Not started |
| CMS/Admin | Payload CMS | ⬜ Not started |
| Email | Resend | ⬜ Not started |
| Styling | Tailwind CSS | ✅ Configured (v4) |
| Dev Environment | Cursor + Claude Code | ✅ Ready |
| Version Control | GitHub (public for now) | ✅ Repo created |

---

## 🔢 Phase Breakdown

```
Phase 0 → Setup & Planning         ✅ Complete
Phase 1 → E-Commerce Website       ← YOU ARE HERE
Phase 2 → Physical Store Integration (O2O)
Phase 3 → Scale & Optimize
```

---

## ✅ PHASE 0 — Setup & Planning

### 0.1 Research & Strategy
- [x] AI-generated market research report completed
- [x] Competitors analyzed (Jiffy Lube, Valvoline, SpeeDee, WLR, STO Filter, etc.)
- [x] Business model decided (e-com first → physical store later)
- [x] Domain: 710.az (decided, cultural/brand reasoning documented)
- [x] Tech stack decided

### 0.2 Project Infrastructure
- [x] GitHub repo created → https://github.com/jafarmammadli/710az
- [x] PROGRESS.md added to repo
- [x] README.md written (basic project description)
- [x] `.gitignore` configured properly for Next.js
- [x] Branch strategy decided (main = production, dev = development)
- [x] Cursor set up locally and connected to repo

### 0.3 Accounts & Services (Create these, they're all free)
- [ ] Vercel account created → vercel.com
- [ ] Supabase project created → supabase.com
- [ ] Stripe account created → stripe.com
- [ ] Resend account created → resend.com
- [ ] Figma account (for UI mockups) → figma.com

---

## 🛒 PHASE 1 — E-Commerce Website

### 1.1 Project Initialization
- [x] Next.js project bootstrapped (Next.js 16, App Router)
- [x] Tailwind CSS configured (v4, PostCSS)
- [x] Folder structure in place (`app/`, `components/`, `lib/`, `types/`, `database/`)
- [x] Environment variables file (`.env.local`) set up (Supabase URL + anon key referenced in `lib/supabase.ts`)
- [ ] Pushed to GitHub successfully
- [ ] Vercel connected to GitHub repo (auto-deploy on push)
- [ ] First live deployment on Vercel

### 1.2 Database Design (Supabase)
- [x] Supabase project created (client in use in app)
- [x] Schema designed for:
  - [x] `products` table (id, name, brand, price, stock, images, category_id, viscosity, etc.) — in `database/schema.sql`
  - [x] `categories` table (oils, filters, fluids, accessories, etc.)
  - [x] `makes` table (car brands: Toyota, Hyundai, BMW...)
  - [x] `models` table (Corolla, Elantra, 3-Series...)
  - [x] `years` table
  - [x] `ymm_fitment` table → links products to make/model/year combos
  - [x] `profiles` table (extends Supabase auth)
  - [x] `orders` table
  - [x] `order_items` table
  - [x] `garage` table (user's saved vehicles)
  - [x] `reviews` table
- [x] Row Level Security (RLS) policies set up (in schema.sql)
- [ ] Test data seeded (at least 20 products) — categories + makes seeded; products seed not in repo

### 1.3 Core Pages (Frontend)
- [x] **Homepage** — Hero with YMM search widget (`app/page.tsx`; no featured products or brands section yet)
- [x] **Category Page** — Grid of products filtered by category (`/products` + `?category=`, `ProductsClient` filter)
- [ ] **Product Detail Page (PDP)** — Not implemented (product cards link to `/products/[slug]` but route missing)
- [ ] **Search Results Page** — Powered by Meilisearch
- [ ] **Cart Page** — Nav/Footer link to `/cart` but no page yet
- [ ] **Checkout Page** — Stripe payment form
- [ ] **Order Confirmation Page**
- [ ] **User Account Page** — Nav link to `/account` but no page yet
- [ ] **Login / Register Page**
- [ ] **404 Page**
- [ ] **About Page** — Brand story, the 710/OIL joke explained

### 1.4 Key Feature: YMM (Year-Make-Model) System
> ⚠️ This is the most critical feature. Without it, this is just a generic shop.
- [x] YMM selector widget built (dropdowns: Year → Make → Model) — `components/ymm/YMMSelector.tsx`, loads makes/models/years from Supabase, redirects to `/products?make=&model=&year=`
- [ ] VIN lookup integrated (optional, stretch goal)
- [ ] "Fits Your Car" badge on product cards
- [ ] Site filters dynamically to only show compatible products (YMM query params not yet used to filter products)
- [ ] User can save their vehicle to "My Garage"
- [x] Azerbaijani vehicle data — 20 makes seeded in schema (Toyota, Hyundai, Kia, BMW, Lada, BYD, Haval, etc.); models table empty, to be populated

### 1.5 Search (Meilisearch)
- [ ] Meilisearch instance set up (Railway.app free tier recommended for hosting)
- [ ] Products indexed in Meilisearch
- [ ] Search bar in navbar — instant results as you type
- [ ] Filters: category, brand, price range, viscosity (for oils)
- [ ] Search works in Azerbaijani AND English

### 1.6 E-Commerce Logic
- [ ] Add to Cart functionality
- [ ] Cart persists on refresh (localStorage or Supabase)
- [ ] Stripe Checkout integration
- [ ] Webhooks set up for order confirmation
- [ ] Stock management (decrement on purchase)
- [ ] Order emails sent via Resend

### 1.7 Admin Panel (Payload CMS)
- [ ] Payload CMS installed and configured
- [ ] Admin can add/edit/delete products
- [ ] Admin can upload product images
- [ ] Admin can manage orders
- [ ] Admin can manage categories
- [ ] Product bulk import (CSV) — for loading 100s of products fast

### 1.8 UI/UX
- [x] Mobile-first responsive design — Navbar with hamburger and mobile menu; responsive product grid
- [ ] Logo designed (710 / OIL ambigram concept) — currently text "710.az" with orange dot
- [x] Color palette decided — dark (gray-950) + orange (orange-500) in use
- [x] Fonts selected — Geist (next/font) in layout
- [ ] Page load speed tested (target: under 2 seconds on mobile)
- [x] Favicon added — `app/favicon.ico`

### 1.9 SEO (Critical for organic traffic)
- [x] Meta titles and descriptions on all pages — root layout has title + description
- [ ] Structured data (schema.org/Product) on PDPs
- [ ] Sitemap.xml generated and submitted to Google
- [ ] robots.txt configured
- [ ] OG images for social sharing
- [x] Azerbaijani language set (`lang="az"`) — in root layout

### 1.10 Phase 1 Launch Checklist
- [ ] All core pages working
- [ ] At least 50 real products listed
- [ ] Payments tested (Stripe test mode → live mode)
- [ ] Site live on 710.az domain
- [ ] SSL certificate active (HTTPS)
- [ ] Basic analytics set up (Vercel Analytics or Google Analytics)
- [ ] Error monitoring set up (Sentry — free tier)

---

## 🏪 PHASE 2 — Physical Store + O2O Integration

> Start planning this when Phase 1 has real traffic and sales.

### 2.1 Service Booking System
- [ ] "Book a Service" page added
- [ ] Time slot booking (calendar UI)
- [ ] Service menu (oil change, filter replacement, fluid top-up)
- [ ] Booking confirmation via WhatsApp/Email
- [ ] Admin view of daily bookings

### 2.2 Digital Vehicle Inspection (DVI)
- [ ] Technician mobile app / tablet interface
- [ ] Photo/video upload of inspected parts
- [ ] Customer receives inspection report via SMS/WhatsApp
- [ ] Customer approves/rejects upsell work digitally

### 2.3 "Buy Online, Install Here" Feature
- [ ] During checkout, user can add "Install at 710 Service Center" option
- [ ] Scheduling integrated into checkout flow
- [ ] Order + appointment linked in database

### 2.4 Loyalty & Retention
- [ ] Service history stored per vehicle
- [ ] Automated WhatsApp reminder when oil change is due (based on km)
- [ ] Loyalty points system

### 2.5 B2B Fleet Portal
- [ ] Separate login for fleet managers
- [ ] Bulk ordering
- [ ] Monthly invoicing
- [ ] Driver-level service authorization limits
- [ ] Fleet health reports

### 2.6 Physical Store Tech
- [ ] License plate recognition (LPR) system research
- [ ] Bay camera / live feed for customers (Oil Cam concept)
- [ ] POS system integrated with online inventory
- [ ] Digital display boards in waiting area

---

## 🚀 PHASE 3 — Scale & Optimize

- [ ] Multi-language support (AZ, RU, EN)
- [ ] Mobile app (React Native — reuses Next.js logic)
- [ ] Supplier API integrations (auto-sync stock levels)
- [ ] AI-powered oil recommendation ("Tell us your car → we recommend the exact oil")
- [ ] Affiliate/referral program for mechanics
- [ ] Performance optimization (CDN for images, caching)
- [ ] Load testing

---

## 📁 Planned Folder Structure

```
710az/
├── app/                        # Next.js App Router
│   ├── (store)/                # Customer-facing pages
│   │   ├── page.tsx            # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx        # All products
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Product detail page
│   │   ├── categories/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── account/
│   │   │   └── page.tsx
│   │   └── search/
│   │       └── page.tsx
│   ├── api/                    # API routes
│   │   ├── stripe/
│   │   ├── products/
│   │   └── ymm/
│   └── layout.tsx              # Root layout
├── components/                 # Reusable UI components
│   ├── ui/                     # Buttons, inputs, modals
│   ├── YMMSelector.tsx         # The critical YMM widget
│   ├── ProductCard.tsx
│   ├── Navbar.tsx
│   ├── Cart.tsx
│   └── SearchBar.tsx
├── lib/                        # Utility functions
│   ├── supabase.ts
│   ├── stripe.ts
│   └── meilisearch.ts
├── types/                      # TypeScript types
│   └── index.ts
├── public/                     # Static assets
│   └── images/
├── .env.local                  # Secret keys (NEVER commit this)
├── .gitignore
├── PROGRESS.md                 # This file
└── README.md
```

---

## 🐛 Issues / Blockers Log

| Date | Issue | Status | Notes |
|---|---|---|---|
| — | — | — | Log problems here as you hit them |

---

## 💡 Ideas Parking Lot

> Things to consider later — don't act on these now.

- "710 Club" subscription (monthly oil delivery)
- Mechanic marketplace (find trusted local mechanics)
- OBD2 scanner integration (read car error codes → recommend products)
- YouTube content ("Tips in 710 style" — educational videos)
- Instagram/TikTok content showing the 710/OIL logo flip

---

## 📊 Key Metrics to Track (Once Live)

- Monthly active users (MAU)
- Conversion rate (visitors → purchases) — target: 2–4%
- Average Order Value (AOV)
- YMM search usage rate
- Top 10 searched vehicles
- Cart abandonment rate
- Page load speed (Core Web Vitals)

---

## 🔑 Important Links

| Resource | URL |
|---|---|
| GitHub Repo | https://github.com/jafarmammadli/710az |
| Vercel Dashboard | (add when created) |
| Supabase Dashboard | (add when created) |
| Stripe Dashboard | (add when created) |
| Market Research Report | (store in /docs folder in repo) |

---

*This file should be updated every single work session. Check boxes as you complete tasks.*
