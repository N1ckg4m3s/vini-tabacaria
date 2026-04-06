create
or replace function get_dashboard_today () RETURNS table (
    today_access INTEGER,
    today_orders INTEGER,
    today_revenue NUMERIC
) LANGUAGE sql as $ $
SELECT
    -- acessos
    (
        SELECT
            COALESCE(
                SUM(
                    COALESCE(mobile_access, 0) + COALESCE(desktop_access, 0)
                ),
                0
            )
        FROM
            analytics_daily_access
        WHERE
            data = CURRENT_DATE
    ),
    -- pedidos
    (
        SELECT
            COALESCE(COUNT(*), 0)
        FROM
            orders
        WHERE
            created_at >= CURRENT_DATE
            AND created_at < CURRENT_DATE + INTERVAL '1 day'
    ),
    -- faturamento
    (
        SELECT
            COALESCE(SUM(total), 0)
        FROM
            orders
        WHERE
            created_at >= CURRENT_DATE
            AND created_at < CURRENT_DATE + INTERVAL '1 day'
    );

$ $;