-- ============================================
-- 710.az Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. CAR MAKES (Toyota, Hyundai, BMW...)
create table makes (
  id serial primary key,
  name text not null unique,
  created_at timestamp default now()
);

-- 2. CAR MODELS (Corolla, Elantra, 3-Series...)
create table models (
  id serial primary key,
  make_id integer references makes(id) on delete cascade,
  name text not null,
  created_at timestamp default now()
);

-- 3. YEARS (2010, 2011... 2025)
create table years (
  id serial primary key,
  year integer not null unique
);

-- Seed years 2000–2025
insert into years (year)
select generate_series(2000, 2025);

-- 4. CATEGORIES (Oils, Filters, Fluids, Accessories...)
create table categories (
  id serial primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp default now()
);

-- 5. PRODUCTS
create table products (
  id serial primary key,
  name text not null,
  slug text not null unique,
  description text,
  brand text,
  category_id integer references categories(id),
  price numeric(10, 2) not null,
  stock integer not null default 0,
  images text[],                        -- array of image URLs
  viscosity text,                       -- e.g. "5W-30" (for oils)
  volume_liters numeric(5, 2),          -- e.g. 1.0, 4.0 (for fluids)
  oem_approvals text[],                 -- e.g. ["VW 504.00", "BMW LL-04"]
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamp default now()
);

-- 6. YMM FITMENT — links products to specific cars
create table ymm_fitment (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  make_id integer references makes(id),
  model_id integer references models(id),
  year_id integer references years(id),
  engine_code text,                     -- optional, e.g. "2.0 TSI"
  notes text,
  created_at timestamp default now()
);

-- 7. USERS (extends Supabase auth)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamp default now()
);

-- 8. MY GARAGE — user's saved vehicles
create table garage (
  id serial primary key,
  user_id uuid references profiles(id) on delete cascade,
  make_id integer references makes(id),
  model_id integer references models(id),
  year_id integer references years(id),
  nickname text,                        -- e.g. "My White Corolla"
  vin text,
  created_at timestamp default now()
);

-- 9. ORDERS
create table orders (
  id serial primary key,
  user_id uuid references profiles(id),
  status text default 'pending',        -- pending, paid, shipped, delivered, cancelled
  total numeric(10, 2) not null,
  stripe_payment_id text,
  shipping_address jsonb,
  created_at timestamp default now()
);

-- 10. ORDER ITEMS
create table order_items (
  id serial primary key,
  order_id integer references orders(id) on delete cascade,
  product_id integer references products(id),
  quantity integer not null,
  price_at_purchase numeric(10, 2) not null
);

-- 11. REVIEWS
create table reviews (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  user_id uuid references profiles(id),
  garage_id integer references garage(id),  -- shows "Verified: 2019 Toyota Corolla owner"
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp default now()
);

-- ============================================
-- SEED: Categories
-- ============================================
insert into categories (name, slug, description) values
  ('Engine Oils', 'engine-oils', 'Synthetic, semi-synthetic and mineral engine oils'),
  ('Oil Filters', 'oil-filters', 'OEM and aftermarket oil filters'),
  ('Air Filters', 'air-filters', 'Engine air filters for all vehicle types'),
  ('Cabin Filters', 'cabin-filters', 'Cabin air and pollen filters'),
  ('Coolants & Antifreeze', 'coolants', 'Engine coolants and antifreeze fluids'),
  ('Brake Fluids', 'brake-fluids', 'DOT 3, DOT 4, DOT 5.1 brake fluids'),
  ('Transmission Fluids', 'transmission-fluids', 'ATF, CVT, manual gearbox fluids'),
  ('Wiper Blades', 'wiper-blades', 'Front and rear wiper blades'),
  ('Spark Plugs', 'spark-plugs', 'Iridium, platinum and copper spark plugs'),
  ('Accessories', 'accessories', 'Car care products and accessories');

-- ============================================
-- SEED: Popular Car Makes in Azerbaijan
-- ============================================
insert into makes (name) values
  ('Toyota'),
  ('Hyundai'),
  ('Kia'),
  ('BMW'),
  ('Mercedes-Benz'),
  ('Volkswagen'),
  ('Audi'),
  ('Nissan'),
  ('Honda'),
  ('Chevrolet'),
  ('Ford'),
  ('Lexus'),
  ('Lada'),
  ('BYD'),
  ('Haval'),
  ('Chery'),
  ('Geely'),
  ('Peugeot'),
  ('Renault'),
  ('Skoda');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Products: anyone can read, only service role can write
alter table products enable row level security;
create policy "Public can read products" on products for select using (true);

-- Categories: anyone can read
alter table categories enable row level security;
create policy "Public can read categories" on categories for select using (true);

-- Makes/Models/Years: anyone can read
alter table makes enable row level security;
create policy "Public can read makes" on makes for select using (true);

alter table models enable row level security;
create policy "Public can read models" on models for select using (true);

alter table years enable row level security;
create policy "Public can read years" on years for select using (true);

alter table ymm_fitment enable row level security;
create policy "Public can read fitment" on ymm_fitment for select using (true);

-- Profiles: users can only read/write their own
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Garage: users can only manage their own vehicles
alter table garage enable row level security;
create policy "Users can manage own garage" on garage for all using (auth.uid() = user_id);

-- Orders: users can only see their own orders
alter table orders enable row level security;
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);

-- Reviews: anyone can read, logged in users can write
alter table reviews enable row level security;
create policy "Public can read reviews" on reviews for select using (true);
create policy "Logged in users can write reviews" on reviews for insert with check (auth.uid() = user_id);