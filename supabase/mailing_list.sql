-- Mailing list table used by the website sign-up form (api/subscribe.ts).
--
-- Run this ONCE in the Supabase dashboard for the project whose URL/key are set
-- in Vercel as SUPABASE_URL / SUPABASE_ANON_KEY:
--   Supabase dashboard -> SQL Editor -> New query -> paste this file -> Run
--
-- To see or export sign-ups later:
--   Supabase dashboard -> Table Editor -> mailing_list -> Export (CSV)

create table if not exists public.mailing_list (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  major_school text not null
);

-- One row per email address, case-insensitive
create unique index if not exists mailing_list_email_unique
  on public.mailing_list (lower(email));

-- Lock the table down: the website's anon key may only INSERT.
-- Reading and editing the list is only possible from the dashboard or a service key.
alter table public.mailing_list enable row level security;

drop policy if exists "website can insert sign-ups" on public.mailing_list;
create policy "website can insert sign-ups"
  on public.mailing_list
  for insert
  to anon
  with check (true);
