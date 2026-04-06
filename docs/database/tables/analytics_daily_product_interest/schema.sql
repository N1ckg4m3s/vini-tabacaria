create table public.analytics_daily_product_interest (
    data date not null default now(),
    product_id uuid not null,
    added_count integer not null default 0,
    removed_count integer not null default 0,
    constraint analytics_daily_product_interest_pkey primary key (data, product_id),
    constraint analytics_daily_product_interest_product_id_fkey foreign KEY (product_id) references products (id)
) TABLESPACE pg_default;