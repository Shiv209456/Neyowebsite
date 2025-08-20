-- Create tariffs table for trade information
create table if not exists public.tariffs (
  id uuid primary key default gen_random_uuid(),
  hs_code text not null,
  product_description text not null,
  origin_country text not null,
  destination_country text not null,
  tariff_rate decimal(5,2), -- Percentage
  additional_duties decimal(5,2), -- Additional duties percentage
  trade_agreement text, -- e.g., 'USMCA', 'EU-FTA'
  effective_date date not null,
  expiry_date date,
  source text, -- Data source
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for tariffs (public read access)
alter table public.tariffs enable row level security;

-- Allow public read access to tariffs
create policy "tariffs_select_public"
  on public.tariffs for select
  to public
  using (true);

-- Only authenticated users can manage tariffs (admin functionality)
create policy "tariffs_manage_authenticated"
  on public.tariffs for all
  using (auth.role() = 'authenticated');

-- Create index for efficient tariff lookups
create index if not exists idx_tariffs_hs_code on public.tariffs(hs_code);
create index if not exists idx_tariffs_countries on public.tariffs(origin_country, destination_country);
