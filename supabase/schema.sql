-- FairyMeet Supabase Database Schema

-- 1. Create a table for User Profiles
-- This extends the built-in Supabase auth.users table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text unique,
  aadhaar_number text,
  gender text,
  avatar_url text,
  wallet_balance integer default 0,
  is_active_pass boolean default false,
  pass_expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- 2. Create a table for Messages (Human to Human Chat)
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;

create policy "Users can view their own messages." on public.messages
  for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can insert messages." on public.messages
  for insert with check (auth.uid() = sender_id);

-- 3. Create a table for Razorpay Transactions
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  amount integer not null, -- in subunits (paise)
  currency text default 'INR',
  status text default 'created', -- 'created', 'paid', 'failed'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.transactions enable row level security;

create policy "Users can view their own transactions." on public.transactions
  for select using (auth.uid() = user_id);

-- Note: Inserting into transactions is usually done by the backend (Edge Function) securely.
