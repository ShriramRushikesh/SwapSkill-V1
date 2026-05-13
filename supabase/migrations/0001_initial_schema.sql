create extension if not exists "uuid-ossp";

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  avatar_url text,
  role text check (role in ('student','mentor','startup','tpo')) default 'student',
  bio text,
  college text,
  company text,
  location text,
  linkedin_url text,
  is_verified boolean default false,
  verification_status text check (verification_status in ('pending','approved','rejected')) default 'pending',
  created_at timestamptz default now()
);

create table public.user_skills (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  skill_name text not null,
  type text check (type in ('offer','want')) not null,
  level text check (level in ('beginner','intermediate','expert')) default 'intermediate',
  created_at timestamptz default now()
);

create table public.swap_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  offering text not null,
  looking_for text not null,
  category text,
  mode text check (mode in ('online','offline','both')) default 'online',
  duration_hrs integer default 1,
  is_open boolean default true,
  views integer default 0,
  created_at timestamptz default now()
);

create table public.swap_requests (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.swap_posts(id) on delete cascade,
  requester_id uuid references public.profiles(id) on delete cascade,
  post_owner_id uuid references public.profiles(id) on delete cascade,
  message text,
  status text check (status in ('pending','accepted','rejected','completed','cancelled')) default 'pending',
  created_at timestamptz default now()
);

create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  swap_request_id uuid references public.swap_requests(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete cascade,
  reviewee_id uuid references public.profiles(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create table public.tpo_posts (
  id uuid default uuid_generate_v4() primary key,
  tpo_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  type text check (type in ('internship','job','project','hackathon')) default 'internship',
  skills_required text[] default '{}',
  deadline date,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_skills enable row level security;
alter table public.swap_posts enable row level security;
alter table public.swap_requests enable row level security;
alter table public.reviews enable row level security;
alter table public.tpo_posts enable row level security;
alter table public.notifications enable row level security;

create policy "profiles_read" on public.profiles for select using (true);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

create policy "skills_read" on public.user_skills for select using (true);
create policy "skills_write" on public.user_skills for all using (auth.uid() = user_id);

create policy "posts_read" on public.swap_posts for select using (true);
create policy "posts_write" on public.swap_posts for all using (auth.uid() = user_id);

create policy "requests_read" on public.swap_requests for select using (auth.uid() = requester_id or auth.uid() = post_owner_id);
create policy "requests_insert" on public.swap_requests for insert with check (auth.uid() = requester_id);
create policy "requests_update" on public.swap_requests for update using (auth.uid() = post_owner_id or auth.uid() = requester_id);

create policy "reviews_read" on public.reviews for select using (true);
create policy "reviews_insert" on public.reviews for insert with check (auth.uid() = reviewer_id);

create policy "tpo_read" on public.tpo_posts for select using (true);
create policy "tpo_write" on public.tpo_posts for all using (auth.uid() = tpo_id);

create policy "notif_read" on public.notifications for select using (auth.uid() = user_id);
create policy "notif_update" on public.notifications for update using (auth.uid() = user_id);
create policy "notif_insert" on public.notifications for insert with check (true);

-- Auto create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto create notification on swap request
create or replace function public.handle_swap_request()
returns trigger as $$
begin
  insert into public.notifications (user_id, type, title, body, link)
  values (
    new.post_owner_id,
    'swap_request',
    'New swap request',
    'Someone wants to swap skills with you',
    '/dashboard?tab=swaps'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_swap_request_created
  after insert on public.swap_requests
  for each row execute procedure public.handle_swap_request();

-- Auto notify on request accepted
create or replace function public.handle_request_accepted()
returns trigger as $$
begin
  if new.status = 'accepted' and old.status = 'pending' then
    insert into public.notifications (user_id, type, title, body, link)
    values (
      new.requester_id,
      'request_accepted',
      'Swap request accepted!',
      'Your swap request was accepted. Check your dashboard.',
      '/dashboard?tab=swaps'
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_request_status_change
  after update on public.swap_requests
  for each row execute procedure public.handle_request_accepted();
