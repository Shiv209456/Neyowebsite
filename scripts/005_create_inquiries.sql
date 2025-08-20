-- Create inquiries table for buyer-seller communication
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  quantity integer,
  target_price decimal(10,2),
  currency text default 'USD',
  status text check (status in ('pending', 'responded', 'negotiating', 'closed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.inquiries enable row level security;

-- Buyers and sellers can view their own inquiries
create policy "inquiries_select_own"
  on public.inquiries for select
  using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- Buyers can create inquiries
create policy "inquiries_insert_buyer"
  on public.inquiries for insert
  with check (auth.uid() = buyer_id);

-- Both parties can update inquiries (for status changes)
create policy "inquiries_update_parties"
  on public.inquiries for update
  using (auth.uid() = buyer_id or auth.uid() = seller_id);
