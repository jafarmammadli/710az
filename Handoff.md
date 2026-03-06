# 710.az — Full Project Handoff Document
> Give this file to Claude at the start of every new chat session.
> This contains EVERYTHING about the project.

---

## 🧠 Project Summary

**710.az** is an automotive e-commerce platform for Azerbaijan.
- Sells car oils, fluids, filters, and parts online
- Phase 2: physical service center (quick oil change, drive-thru lube)
- "710" = "OIL" flipped upside down — the brand name is an automotive inside joke
- Built by: jafarmammadli (GitHub)
- Dev tools: Cursor + Claude Code

---

## 🔗 Critical Links

| Resource | URL |
|---|---|
| GitHub Repo | https://github.com/jafarmammadli/710az |
| Live Site | https://710az.vercel.app |
| Vercel Dashboard | https://vercel.com/dashboard |
| Supabase Dashboard | https://supabase.com/dashboard |
| Stripe Dashboard | https://dashboard.stripe.com |

---

## 📦 Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Using App Router, NOT pages router |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | Dark theme: gray-950 bg, orange-500 accent |
| Hosting | Vercel | Auto-deploys on push to main |
| Database | Supabase (PostgreSQL) | Frankfurt region |
| Auth | Supabase Auth | Not yet implemented |
| Payments | Stripe | Not yet implemented |
| Search | Meilisearch | Not yet implemented |
| Email | Resend | Not yet implemented |
| Admin Panel | Custom Next.js | In progress |

---

## 🗄️ Supabase Database Schema

### Tables

#### `makes` — Car brands
```sql
id serial primary key
name text not null unique
created_at timestamp default now()
```
**Seeded:** Toyota, Hyundai, Kia, BMW, Mercedes-Benz, Volkswagen, Audi, Nissan, Honda, Chevrolet, Ford, Lexus, Lada, BYD, Haval, Chery, Geely, Peugeot, Renault, Skoda

#### `models` — Car models (linked to makes)
```sql
id serial primary key
make_id integer references makes(id)
name text not null
created_at timestamp default now()
```
**Seeded:** Toyota (10 models), Hyundai (9), Kia (8), BMW (9), Mercedes (8), VW (7), Audi (8), Nissan (7), BYD (6), Chevrolet (7)

#### `years`
```sql
id serial primary key
year integer not null unique
```
**Seeded:** 2000–2025

#### `categories`
```sql
id serial primary key
name text not null unique
slug text not null unique
description text
image_url text
created_at timestamp default now()
```
**Seeded:** Engine Oils, Oil Filters, Air Filters, Cabin Filters, Coolants & Antifreeze, Brake Fluids, Transmission Fluids, Wiper Blades, Spark Plugs, Accessories

#### `products`
```sql
id serial primary key
name text not null
slug text not null unique
description text
brand text
category_id integer references categories(id)
price numeric(10,2)
stock integer default 0
images text[]                    -- array of image URLs
viscosity text                   -- e.g. "5W-30"
volume_liters numeric(5,2)       -- e.g. 4.0
oem_approvals text[]             -- e.g. ["API SN", "BMW LL-04"]
is_featured boolean default false
is_active boolean default true
created_at timestamp default now()
```
**Seeded:** 10 products (Mobil 1, Castrol, Shell, Liqui Moly, Bosch, Mann-Filter)

#### `ymm_fitment` — Links products to specific cars
```sql
id serial primary key
product_id integer references products(id)
make_id integer references makes(id)
model_id integer references models(id)
year_id integer references years(id)
engine_code text
notes text
created_at timestamp default now()
```

#### `profiles` — Extends Supabase auth users
```sql
id uuid primary key references auth.users(id)
full_name text
phone text
created_at timestamp default now()
```

#### `garage` — User's saved vehicles
```sql
id serial primary key
user_id uuid references profiles(id)
make_id integer references makes(id)
model_id integer references models(id)
year_id integer references years(id)
nickname text
vin text
created_at timestamp default now()
```

#### `orders`
```sql
id serial primary key
user_id uuid references profiles(id)
status text default 'pending'    -- pending, paid, shipped, delivered, cancelled
total numeric(10,2)
stripe_payment_id text
shipping_address jsonb
created_at timestamp default now()
```

#### `order_items`
```sql
id serial primary key
order_id integer references orders(id)
product_id integer references products(id)
quantity integer
price_at_purchase numeric(10,2)
```

#### `reviews`
```sql
id serial primary key
product_id integer references products(id)
user_id uuid references profiles(id)
garage_id integer references garage(id)
rating integer (1-5)
comment text
created_at timestamp default now()
```

### Tables NOT YET CREATED (need to add):
```sql
-- banners (homepage promotional banners)
create table banners (
  id serial primary key,
  title text,
  subtitle text,
  image_url text,
  link_url text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamp default now()
);

-- subscribers (email newsletter)
create table subscribers (
  id serial primary key,
  email text not null unique,
  created_at timestamp default now()
);

-- admins (admin panel users)
create table admins (
  id serial primary key,
  email text not null unique,
  password_hash text not null,
  name text,
  created_at timestamp default now()
);
```

### Row Level Security
- Products, categories, makes, models, years, ymm_fitment: **public read**
- Profiles, garage, orders: **users can only access their own data**
- Reviews: **public read, authenticated write**

---

## 📁 Current File Structure

```
710az/
├── app/
│   ├── products/
│   │   ├── [slug]/
│   │   │   └── page.tsx        ✅ Product detail page
│   │   ├── page.tsx            ✅ Products listing page
│   │   └── ProductsClient.tsx  ✅ Client-side filtering component
│   ├── admin/                  ⬜ TO BUILD NEXT
│   ├── globals.css             ✅
│   ├── layout.tsx              ✅
│   └── page.tsx                ✅ Homepage
├── components/
│   ├── ymm/
│   │   └── YMMSelector.tsx     ✅ Year/Make/Model selector
│   ├── Footer.tsx              ✅
│   └── Navbar.tsx              ✅
├── database/
│   └── schema.sql              ✅
├── lib/
│   └── supabase.ts             ✅
├── types/
│   └── index.ts                ✅
├── .env.local                  ✅ (never commit)
├── PROGRESS.md                 ✅
├── HANDOFF.md                  ✅ (this file)
└── README.md                   ⬜
```

---

## 🎨 Design System

- **Background:** `bg-gray-950` (almost black)
- **Cards:** `bg-gray-900 border border-gray-800`
- **Accent:** `orange-500` (buttons, highlights, logo dot)
- **Text primary:** `text-white`
- **Text secondary:** `text-gray-400` / `text-gray-500`
- **Success:** `text-green-400 bg-green-500/10`
- **Error:** `text-red-400 bg-red-500/10`
- **Border radius:** `rounded-xl` or `rounded-2xl`
- **Font:** Geist (Next.js default)
- **Currency symbol:** ₼ (Azerbaijani Manat)

---

## 🔑 Environment Variables

### Local (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_[key]
```

### Vercel (already added to dashboard)
Same two variables above are set in Vercel project settings.

### Still needed (not yet set up):
```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
ADMIN_JWT_SECRET=         # for admin panel auth
```

---

## ✅ What's Been Built

1. **Homepage** — dark hero, "710.az" branding, YMM selector widget
2. **Navbar** — responsive, mobile hamburger menu, links to products/cart/account
3. **Footer** — brand, shop links, contact info
4. **YMM Selector** — cascading Make → Model → Year dropdowns pulling live from Supabase
5. **Products page** — grid of all products with instant client-side category filtering (no page reload)
6. **Product Detail Page** — image, breadcrumb, specs table, price, stock, Add to Cart button (button UI only, no cart logic yet)
7. **Database** — full schema with 11 tables, RLS policies, seeded with real car brands/models/products

---

## 🔜 What's Being Built Next

### Admin Panel (`/admin`) — IN PROGRESS
Non-technical admins need to manage everything without touching code.

**Required sections:**
- `/admin` — Dashboard (stats overview)
- `/admin/login` — Email + password login
- `/admin/products` — Add, edit, delete, toggle products (with photo upload, tags, description, price, stock, category, details)
- `/admin/categories` — Add, edit, delete categories
- `/admin/banners` — Upload banner images, set title/subtitle/link, toggle active, reorder
- `/admin/subscribers` — View, add, remove email subscribers, export CSV
- `/admin/orders` — View orders, update status
- `/admin/admins` — Add/remove admin accounts, change passwords

**Admin auth approach:** JWT-based with a separate `admins` table (NOT Supabase Auth — keep it simple and independent)

---

## 🚧 After Admin Panel (in order):

1. Cart system (add to cart, view cart, update quantities)
2. Customer auth (Supabase Auth — login/register)
3. Stripe checkout (real payments)
4. Email subscribers (newsletter signup + Resend)
5. Meilisearch (instant search bar)
6. "Fits Your Car" badge using YMM fitment data
7. My Garage (save vehicles to account)

---

## ⚠️ Known Issues / Notes

- Next.js 16 requires `searchParams` to be a `Promise` and must be awaited
- Next.js 16 requires `params` in dynamic routes to be a `Promise` and must be awaited
- Supabase join filtering (filtering by related table column) doesn't work directly in `.eq()` — filter client-side after fetching
- Always use `--break-system-packages` for pip installs if needed
- `.env.local` is never committed to GitHub
- Repo is currently PUBLIC — change to private before adding any sensitive business logic

---

## 💡 Business Context

- Azerbaijan imported 91,838 vehicles in 2024 ($1.844B value)
- Hybrid imports up 48.2%, EVs growing (BYD dominant)
- Top e-commerce platforms in AZ: Trendyol, Kontakt.az, Umico.az
- 710.az aims to be the first digital-native auto parts store in Azerbaijan
- Future physical location: quick lube center in Baku (drive-thru, no appointment needed)
- Target: capture organic search traffic for vehicle-specific queries ("2019 Hyundai Elantra 5W-30 oil")
- Currency: Azerbaijani Manat (₼)
- Primary language: Azerbaijani (future: AZ + RU + EN)

---

*Keep this file updated. Add it to every new Claude chat session.*