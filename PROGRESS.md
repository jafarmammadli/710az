# 710.az — Project Progress Tracker

> **Last Updated:** 2026-03-05
> **Repo:** https://github.com/jafarmammadli/710az
> **Status:** 🟡 Phase 0 — Setup & Planning

---

## 🗺️ Project Overview

**What is 710.az?**
An automotive e-commerce platform for Azerbaijan — selling car oils, fluids, filters, and parts. Phase 2 will expand into a physical service center (quick oil change, drive-thru lube).

**Why "710"?** OIL flipped upside down = 710. Memorable, brandable, expandable.

---

## 📦 Tech Stack (Decided)

| Layer | Tool | Status |
|---|---|---|
| Framework | Next.js 14 (App Router) | ⬜ Not started |
| Hosting | Vercel | ⬜ Not started |
| Database | Supabase (PostgreSQL) | ⬜ Not started |
| Auth | Supabase Auth | ⬜ Not started |
| Payments | Stripe | ⬜ Not started |
| Search | Meilisearch (self-hosted) | ⬜ Not started |
| CMS/Admin | Payload CMS | ⬜ Not started |
| Email | Resend | ⬜ Not started |
| Styling | Tailwind CSS | ⬜ Not started |
| Dev Environment | Cursor + Claude Code | ✅ Ready |
| Version Control | GitHub (public for now) | ✅ Repo created |

---

## 🔢 Phase Breakdown

```
Phase 0 → Setup & Planning         ← YOU ARE HERE
Phase 1 → E-Commerce Website
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
- [ ] Cursor set up locally and connected to repo

### 0.3 Accounts & Services (Create these, they're all free)
- [ ] Vercel account created → vercel.com
- [ ] Supabase project created → supabase.com
- [ ] Stripe account created → stripe.com
- [ ] Resend account created → resend.com
- [ ] Figma account (for UI mockups) → figma.com

---

## 🛒 PHASE 1 — E-Commerce Website

### 1.1 Project Initialization
- [ ] Next.js 14 project bootstrapped (`npx create-next-app@latest`)
- [ ] Tailwind CSS configured
- [ ] Folder structure finalized (see structure below)
- [ ] Environment variables file (`.env.local`) set up
- [ ] Pushed to GitHub successfully
- [ ] Vercel connected to GitHub repo (auto-deploy on push)
- [ ] First live deployment on Vercel

### 1.2 Database Design (Supabase)
- [ ] Supabase project created
- [ ] Schema designed for:
  - [ ] `products` table (id, name, brand, price, stock, images, specs)
  - [ ] `categories` table (oils, filters, fluids, accessories)
  - [ ] `makes` table (car brands: Toyota, Hyundai, BMW...)
  - [ ] `models` table (Corolla, Elantra, 3-Series...)
  - [ ] `years` table
  - [ ] `ymm_fitment` table → links products to make/model/year combos
  - [ ] `users` table (extends Supabase auth)
  - [ ] `orders` table
  - [ ] `order_items` table
  - [ ] `garage` table (user's saved vehicles)
  - [ ] `reviews` table
- [ ] Row Level Security (RLS) policies set up
- [ ] Test data seeded (at least 20 products)

### 1.3 Core Pages (Frontend)
- [ ] **Homepage** — Hero with YMM search widget, featured products, brands
- [ ] **Category Page** — Grid of products filtered by category
- [ ] **Product Detail Page (PDP)** — Images, specs, fitment check, add to cart
- [ ] **Search Results Page** — Powered by Meilisearch
- [ ] **Cart Page** — Items, quantities, subtotal
- [ ] **Checkout Page** — Stripe payment form
- [ ] **Order Confirmation Page**
- [ ] **User Account Page** — Order history, saved vehicles (My Garage)
- [ ] **Login / Register Page**
- [ ] **404 Page**
- [ ] **About Page** — Brand story, the 710/OIL joke explained

### 1.4 Key Feature: YMM (Year-Make-Model) System
> ⚠️ This is the most critical feature. Without it, this is just a generic shop.
- [ ] YMM selector widget built (dropdowns: Year → Make → Model)
- [ ] VIN lookup integrated (optional, stretch goal)
- [ ] "Fits Your Car" badge on product cards
- [ ] Site filters dynamically to only show compatible products
- [ ] User can save their vehicle to "My Garage"
- [ ] Azerbaijani vehicle data sourced and imported (top 50+ imported models)

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
- [ ] Mobile-first responsive design (most Azerbaijani users = mobile)
- [ ] Logo designed (710 / OIL ambigram concept)
- [ ] Color palette decided (recommend: dark/black + orange — aggressive auto brand feel)
- [ ] Fonts selected
- [ ] Page load speed tested (target: under 2 seconds on mobile)
- [ ] Favicon added

### 1.9 SEO (Critical for organic traffic)
- [ ] Meta titles and descriptions on all pages
- [ ] Structured data (schema.org/Product) on PDPs
- [ ] Sitemap.xml generated and submitted to Google
- [ ] robots.txt configured
- [ ] OG images for social sharing
- [ ] Azerbaijani language set (`lang="az"`)

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
