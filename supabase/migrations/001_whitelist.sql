-- ============================================================
--  THE MINE GATE'S · Solicitudes de whitelist
--  Ejecutar completo en: Supabase → SQL Editor → New query
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.whitelist_applications (
  id uuid primary key default gen_random_uuid(),
  minecraft_username text not null,
  real_name text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete set null,
  constraint whitelist_applications_status_check
    check (status in ('pending', 'approved', 'rejected')),
  constraint whitelist_applications_username_format
    check (minecraft_username ~ '^[A-Za-z0-9_]{3,16}$'),
  constraint whitelist_applications_real_name_length
    check (char_length(btrim(real_name)) between 2 and 80)
);

comment on table public.whitelist_applications is
  'Solicitudes de whitelist enviadas desde la landing. El nombre real solo es visible para el staff autenticado.';
comment on column public.whitelist_applications.minecraft_username is
  'Nombre exacto de Minecraft indicado por el jugador.';
comment on column public.whitelist_applications.real_name is
  'Nombre real del solicitante. Dato privado: nunca se expone al público.';
comment on column public.whitelist_applications.status is
  'pending | approved | rejected. La aprobación de la whitelist del servidor sigue siendo manual.';
comment on column public.whitelist_applications.reviewed_by is
  'Usuario de Supabase Auth que revisó la solicitud.';

-- Una sola solicitud pendiente por usuario (sin distinguir mayúsculas).
create unique index if not exists whitelist_applications_pending_username_idx
  on public.whitelist_applications (lower(minecraft_username))
  where status = 'pending';

create index if not exists whitelist_applications_created_at_idx
  on public.whitelist_applications (created_at desc);

create index if not exists whitelist_applications_status_idx
  on public.whitelist_applications (status);

-- ------------------------------------------------------------
--  Row Level Security
-- ------------------------------------------------------------
alter table public.whitelist_applications enable row level security;

drop policy if exists "anon puede enviar solicitudes" on public.whitelist_applications;
drop policy if exists "staff puede leer solicitudes" on public.whitelist_applications;
drop policy if exists "staff puede revisar solicitudes" on public.whitelist_applications;

-- El público solo puede insertar solicitudes nuevas y siempre como pendientes.
create policy "anon puede enviar solicitudes"
  on public.whitelist_applications
  for insert
  to anon
  with check (
    status = 'pending'
    and reviewed_at is null
    and reviewed_by is null
  );

-- El staff autenticado puede leer todas las solicitudes (incluido el nombre real).
create policy "staff puede leer solicitudes"
  on public.whitelist_applications
  for select
  to authenticated
  using (true);

-- El staff autenticado puede aprobar o rechazar.
create policy "staff puede revisar solicitudes"
  on public.whitelist_applications
  for update
  to authenticated
  using (true)
  with check (status in ('pending', 'approved', 'rejected'));

-- ------------------------------------------------------------
--  Permisos explícitos
-- ------------------------------------------------------------
revoke all on table public.whitelist_applications from anon, authenticated;

grant insert on table public.whitelist_applications to anon;
grant select, update on table public.whitelist_applications to authenticated;
