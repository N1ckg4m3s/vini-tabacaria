create
or replace function get_product_conversion (days integer) returns table (
    product_id uuid,
    product_label text,
    views integer,
    adds integer,
    orders integer,
    conversion numeric
) as $ $ with views as (
    select
        product_id,
        sum(views) as views
    from
        analytics_daily_product_views
    where
        data >= current_date - (days - 1)
    group by
        product_id
),
adds as (
    select
        product_id,
        sum(added_count) as adds
    from
        analytics_daily_product_interest
    where
        data >= current_date - (days - 1)
    group by
        product_id
),
orders as (
    select
        oi.product_id,
        count(distinct oi.order_id) as orders
    from
        order_items oi
        join orders o on o.id = oi.order_id
    where
        o.status = 'completed'
        and o.created_at >= current_date - (days - 1)
    group by
        oi.product_id
)
select
    p.id as product_id,
    -- 🔥 label (marca + nome)
    trim(coalesce(p.marca, '') || ' ' || p.nome) as product_label,
    coalesce(v.views, 0) as views,
    coalesce(a.adds, 0) as adds,
    coalesce(o.orders, 0) as orders,
    case
        when coalesce(v.views, 0) = 0 then 0
        else coalesce(o.orders, 0) :: numeric / v.views
    end as conversion
from
    products p
    left join views v on v.product_id = p.id
    left join adds a on a.product_id = p.id
    left join orders o on o.product_id = p.id;

$ $ language sql;