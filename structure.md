# 710.az — Project Structure

Directory tree and a short description of what each file does.

---

## Directory tree

```
710az/
├── app/
│   ├── admin/                         # Admin UI — routes at /admin, /admin/login, /admin/products, etc.
│   │   ├── page.tsx                   # Admin dashboard (stats, nav) — /admin
│   │   ├── login/
│   │   │   └── page.tsx               # Admin login UI (client); POSTs to /api/admin/login — /admin/login
│   │   └── products/
│   │       ├── page.tsx               # Products list table + link to new — /admin/products
│   │       ├── ProductForm.tsx         # Shared form (create/edit) for products
│   │       └── new/
│   │           └── page.tsx           # “Add product” page, uses ProductForm — /admin/products/new
│   ├── api/
│   │   └── admin/                     # Admin API only — routes at /api/admin/...
│   │       ├── logout/
│   │       │   └── route.ts            # GET /api/admin/logout — clears admin cookie, redirects to /admin/login
│   │       └── products/
│   │           ├── route.ts           # POST /api/admin/products — create product
│   │           └── [id]/
│   │               └── route.ts       # PUT & DELETE /api/admin/products/[id]
│   ├── layout.tsx                     # Root layout: Navbar, Footer, metadata, lang="az"
│   ├── page.tsx                       # Homepage: hero + YMMSelector
│   ├── globals.css                    # Tailwind import + theme/root CSS
│   ├── favicon.ico                    # Site favicon
│   └── products/
│       ├── page.tsx                   # Products list (server): fetches products/categories, renders ProductsClient
│       ├── ProductsClient.tsx         # Client: category filter + product grid, links to /products/[slug]
│       └── [slug]/
│           └── page.tsx               # Product detail page (server): fetch by slug, 404 if missing
├── components/
│   ├── Navbar.tsx                     # Top nav: logo, Products/category links, cart/account, mobile menu
│   ├── Footer.tsx                     # Footer: brand, shop links, contact (WhatsApp, email)
│   └── ymm/
│       └── YMMSelector.tsx            # Year–Make–Model dropdowns; loads from Supabase; redirects to /products?make=&model=&year=
├── lib/
│   ├── supabase.ts                    # Supabase client (NEXT_PUBLIC_SUPABASE_URL + anon key)
│   └── admin-auth.ts                  # JWT admin auth: signAdminToken, verifyAdminToken, getAdminSession (cookie)
├── types/
│   └── index.ts                       # Shared TS types: Make, Model, Year, Category, Product
├── database/
│   └── schema.sql                    # Full DB schema: tables, RLS, seed (categories + makes)
├── public/
│   ├── vercel.svg
│   ├── next.svg
│   ├── file.svg
│   ├── globe.svg
│   └── window.svg
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── next-env.d.ts
├── postcss.config.mjs
├── biome.json
├── package.json
├── package-lock.json
├── README.md
├── PROGRESS.md
├── Handoff.md
└── structure.md                       # This file
```

---

## What’s inside (by area)

### App Router — public site

- **`app/layout.tsx`** — Root layout: Geist font, `lang="az"`, meta title/description, Navbar, main content area, Footer.
- **`app/page.tsx`** — Home: hero with “710.az” and YMMSelector.
- **`app/globals.css`** — `@import "tailwindcss"`, CSS variables, dark theme.
- **`app/favicon.ico`** — Favicon.

### App Router — products

- **`app/products/page.tsx`** — Server component: reads `searchParams` (e.g. category), fetches products and categories from Supabase, passes them to `ProductsClient`.
- **`app/products/ProductsClient.tsx`** — Client component: category pills, filters list, product grid with links to `/products/[slug]`.
- **`app/products/[slug]/page.tsx`** — Server component: loads product by `slug` from Supabase (with category), returns 404 if not found; renders PDP (breadcrumb, images, price, add to cart, etc.).

### App Router — admin UI (`app/admin/`)

Admin **pages** live under `app/admin/` and are served at `/admin`, `/admin/login`, `/admin/products`, `/admin/products/new`.

- **`app/admin/page.tsx`** — Dashboard: requires admin session; shows product/order/subscriber counts and links (products, categories, banners, orders, etc.). Logout link goes to `/api/admin/logout`.
- **`app/admin/login/page.tsx`** — Login page: email/password form; POSTs to `/api/admin/login`, then redirects to `/admin`.
- **`app/admin/products/page.tsx`** — Products list: table of products (name, category, price, stock, status) with “Add product” and “Edit” links.
- **`app/admin/products/new/page.tsx`** — “Add product” page: fetches categories, renders `AdminProductForm` with no initial product.
- **`app/admin/products/ProductForm.tsx`** — Client form for create/edit: name, slug, category, brand, price, stock, description, viscosity, volume, OEM approvals, is_active, is_featured; submits to POST `/api/admin/products` or PUT `/api/admin/products/[id]`.

### App Router — admin API (`app/api/admin/`)

Admin **API routes** stay under `app/api/admin/` (no pages here).

- **`app/api/admin/logout/route.ts`** — GET `/api/admin/logout`: clears `admin_token` cookie and redirects to `/admin/login`.
- **`app/api/admin/products/route.ts`** — POST `/api/admin/products`: creates one product (body → Supabase insert), protected by admin session.
- **`app/api/admin/products/[id]/route.ts`** — PUT and DELETE `/api/admin/products/[id]`: update or delete product by id; both require admin session.

*(Login API: the login page POSTs to `/api/admin/login`; the handler may live in a separate route file or middleware.)*

### Components

- **`components/Navbar.tsx`** — Fixed top bar: logo “710.az”, desktop nav (Products, Engine Oils, Filters, Fluids), cart/account icons, mobile hamburger + menu.
- **`components/Footer.tsx`** — Three columns: brand blurb, shop links (oils, filters, coolants, brake fluids), contact (WhatsApp, email, location).
- **`components/ymm/YMMSelector.tsx`** — YMM widget: loads makes → models → years from Supabase; “Find Compatible Products” redirects to `/products?make=&model=&year=`.

### Lib & types

- **`lib/supabase.ts`** — Single Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **`lib/admin-auth.ts`** — Admin JWT: sign token (adminId, email), verify token, `getAdminSession()` from `admin_token` cookie.
- **`types/index.ts`** — Exported types for Make, Model, Year, Category, Product (used by YMM and product code).

### Database

- **`database/schema.sql`** — Full PostgreSQL schema for Supabase: tables (makes, models, years, categories, products, ymm_fitment, profiles, garage, orders, order_items, reviews), RLS policies, seed data for categories and makes.

### Config & root files

- **`next.config.ts`** — Next.js config (default).
- **`tsconfig.json`** — TypeScript paths and options.
- **`postcss.config.mjs`** — PostCSS for Tailwind.
- **`biome.json`** — Lint/format rules.
- **`package.json`** — Deps (next, react, @supabase/supabase-js, tailwindcss, etc.) and scripts (dev, build, lint, format).
- **`README.md`** — Project intro, tech stack, branch strategy, link to PROGRESS.
- **`PROGRESS.md`** — Phase 0/1/2/3 checklist and roadmap.
- **`structure.md`** — This structure and file overview.
