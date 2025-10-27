-- Example schema for the cozy support space
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  image_url text,
  caption text not null check (char_length(caption) > 0),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Suggested helper to keep anonymous display names
create view if not exists posts_with_profile as
select
  p.id,
  coalesce(pr.display_name, concat('soft-soul-', substr(md5(p.user_id::text), 1, 4))) as display_name,
  p.image_url,
  p.caption,
  p.created_at
from posts p
left join profiles pr on pr.user_id = p.user_id;

-- Recommended policy examples (replace with your Supabase org id)
alter table posts enable row level security;

create policy "users can insert their own posts" on posts
  for insert with check (auth.uid() = user_id);

create policy "anyone can read posts" on posts
  for select using (true);
