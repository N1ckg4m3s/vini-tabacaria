create
or replace function get_weekly_funnel () RETURNS table (
    views BIGINT,
    adds BIGINT,
    orders BIGINT,
    view_to_add FLOAT,
    add_to_order FLOAT,
    total_conversion FLOAT
) LANGUAGE sql as $ $ WITH v AS (
    SELECT
        COALESCE(SUM(views), 0) AS total
    FROM
        analytics_daily_product_views
    WHERE
        data >= CURRENT_DATE - INTERVAL '7 days'
),
a AS (
    SELECT
        COALESCE(SUM(added_count), 0) AS total
    FROM
        analytics_daily_product_interest
    WHERE
        data >= CURRENT_DATE - INTERVAL '7 days'
),
o AS (
    SELECT
        COALESCE(COUNT(*), 0) AS total
    FROM
        orders
    WHERE
        created_at >= CURRENT_DATE - INTERVAL '7 days'
)
SELECT
    v.total,
    a.total,
    o.total,
    a.total :: float / NULLIF(v.total, 0),
    o.total :: float / NULLIF(a.total, 0),
    o.total :: float / NULLIF(v.total, 0)
FROM
    v,
    a,
    o;

$ $;