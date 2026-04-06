create table public.analytics_daily_product_views (
    data date not null default now(),
    product_id uuid not null,
    views integer not null default 0,
    constraint analytics_daily_product_views_pk primary key (data, product_id),
    constraint analytics_daily_product_views_product_id_fkey foreign KEY (product_id) references products (id)
) TABLESPACE pg_default;