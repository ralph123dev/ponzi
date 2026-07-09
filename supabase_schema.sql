-- Réinitialisation propre
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.deposits;
drop table if exists public.profiles;

-- 1. Table des profils avec solde initial (Bonus)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  balance numeric default 500, -- Bonus de 500 FCFA
  has_deposited boolean default false,
  total_gains numeric default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Table des dépôts (pour validation unique du TXID)
create table public.deposits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  amount numeric not null,
  currency text not null,
  txid text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Sécurité
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

alter table public.deposits enable row level security;
create policy "Users can view own deposits" on public.deposits for select using (auth.uid() = user_id);
create policy "Users can insert own deposits" on public.deposits for insert with check (auth.uid() = user_id);

-- 4. Fonction d'inscription (Automatique)
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, balance)
  values (new.id, new.raw_user_meta_data->>'full_name', 500);
  return new;
end;
$$ language plpgsql security definer;

-- 5. Déclencheur
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
