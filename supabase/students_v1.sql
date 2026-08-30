create extension if not exists pgcrypto;

create table if not exists public.students_v1 (
  id uuid primary key,
  share_token uuid not null unique default gen_random_uuid(),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists students_v1_share_token_idx on public.students_v1(share_token);

alter table public.students_v1 enable row level security;
-- No public RLS policies on purpose.
-- NEXT accesses this table only through server routes with the Supabase service-role key.
