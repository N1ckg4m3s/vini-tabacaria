create table public.products (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    nome text not null,
    marca text null,
    valor numeric(10, 2) null,
    quantidade integer null,
    tipo text not null,
    metadata jsonb not null default '{}' :: jsonb,
    visible boolean not null default true,
    imagem text null,
    constraint products_pkey primary key (id)
) TABLESPACE pg_default;