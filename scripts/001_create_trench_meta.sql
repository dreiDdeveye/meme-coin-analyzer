-- Create trench_meta table to store admin-uploaded meta information
create table if not exists public.trench_meta (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  emoji text not null default '🔥',
  description text not null,
  image_url text,
  categories text[] default array[]::text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.trench_meta enable row level security;

-- Allow public read access (everyone can see the trench meta)
create policy "trench_meta_select_public"
  on public.trench_meta for select
  using (true);

-- For now, allow anyone to insert/update/delete (admin auth will be added later)
-- In production, you'd want to restrict this to admin users only
create policy "trench_meta_insert_public"
  on public.trench_meta for insert
  with check (true);

create policy "trench_meta_update_public"
  on public.trench_meta for update
  using (true);

create policy "trench_meta_delete_public"
  on public.trench_meta for delete
  using (true);

-- Create an updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trench_meta_updated_at
  before update on public.trench_meta
  for each row
  execute function public.handle_updated_at();

-- Insert a default trench meta
insert into public.trench_meta (title, emoji, description, categories)
values (
  'AI Meta',
  '🤖',
  'AI and technology-themed tokens dominating the Solana trenches with innovative narratives and strong community backing.',
  array['AI']
)
on conflict do nothing;
