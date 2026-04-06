CREATE
OR REPLACE FUNCTION log_product_intention(p_product_id uuid, intention text) RETURNS void LANGUAGE plpgsql AS $ function $ begin if intention not in ('add', 'remove') then raise exception 'Invalid intention: %',
intention;

end if;

insert into
    analytics_daily_product_interest (
        data,
        product_id,
        added_count,
        removed_count
    )
values
    (
        current_date,
        p_product_id,
        case
            when intention = 'add' then 1
            else 0
        end,
        case
            when intention = 'remove' then 1
            else 0
        end
    ) on conflict (data, product_id) do
update
set
    added_count = analytics_daily_product_interest.added_count + case
        when intention = 'add' then 1
        else 0
    end,
    removed_count = analytics_daily_product_interest.removed_count + case
        when intention = 'remove' then 1
        else 0
    end;

end;

$ function $