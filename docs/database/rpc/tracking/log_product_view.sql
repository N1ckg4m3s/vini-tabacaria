CREATE
OR REPLACE FUNCTION log_product_view(p_product_id uuid) RETURNS void LANGUAGE plpgsql AS $ function $ begin
insert into
    analytics_daily_product_views (data, product_id, views)
values
    (
        current_date,
        p_product_id,
        1
    ) on conflict (data, product_id) do
update
set
    views = analytics_daily_product_views.views + 1;

end;

$ function $