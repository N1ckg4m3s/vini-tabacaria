create table public.orders (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    total numeric null,
    status text null,
    constraint Order_pkey primary key (id)
) TABLESPACE pg_default;