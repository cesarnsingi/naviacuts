-- ============================================================
-- NA VIA CUTS — Waitlist Schema
-- ============================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Waitlist table
create table if not exists public.waitlist (
  id             uuid         primary key default uuid_generate_v4(),
  full_name      text         not null,
  email          text         not null unique,
  phone          text         not null,
  city           text         not null,
  preferred_lang text         not null default 'pt' check (preferred_lang in ('pt','en')),
  created_at     timestamptz  not null default now()
);

-- Index for fast email lookups (duplicate checks)
create index if not exists waitlist_email_idx on public.waitlist (email);

-- Index for sorting by signup date in admin view
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anonymous inserts (public signup form)
create policy "waitlist: public insert"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Allow anonymous selects (needed for duplicate check)
create policy "waitlist: public select"
  on public.waitlist
  for select
  to anon
  using (true);

-- Allow authenticated users (admins) to read everything
create policy "waitlist: authenticated read"
  on public.waitlist
  for select
  to authenticated
  using (true);

-- ============================================================
-- Useful admin queries
-- ============================================================

-- See all signups ordered by date:
-- select * from waitlist order by created_at desc;

-- Count by city:
-- select city, count(*) as total from waitlist group by city order by total desc;

-- Count by language preference:
-- select preferred_lang, count(*) as total from waitlist group by preferred_lang;

-- Export emails for newsletter:
-- select full_name, email, preferred_lang from waitlist order by created_at;
