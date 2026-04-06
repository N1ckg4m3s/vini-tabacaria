create table public.analytics_daily_access (
    data date not null default now(),
    mobile_access integer not null default 0,
    desktop_access integer not null default 0,
    constraint analytics_daily_access_pkey primary key (data),
    constraint analytics_daily_access_data_key unique (data)
) TABLESPACE pg_default;