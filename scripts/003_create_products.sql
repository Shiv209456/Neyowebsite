-- Create products table for seller listings
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text not null,
  price decimal(10,2),
  currency text default 'USD',
  minimum_order_quantity integer default 1,
  unit text, -- e.g., 'pieces', 'kg', 'tons'
  origin_country text,
  hs_code text, -- Harmonized System code for tariff classification
  images text[], -- Array of image URLs
  specifications jsonb, -- Flexible product specifications
  status text check (status in ('draft', 'active', 'inactive', 'sold')) default 'draft',
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Sellers can manage their own products
create policy "products_manage_own"
  on public.products for all
  using (auth.uid() = seller_id);

-- Public can view active products
create policy "products_select_active_public"
  on public.products for select
  using (status = 'active');
