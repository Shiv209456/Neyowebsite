-- Create categories table for product organization
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  parent_id uuid references public.categories(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for categories (public read access)
alter table public.categories enable row level security;

-- Allow public read access to categories
create policy "categories_select_public"
  on public.categories for select
  to public
  using (true);

-- Only authenticated users can manage categories (admin functionality)
create policy "categories_manage_authenticated"
  on public.categories for all
  using (auth.role() = 'authenticated');
