create
or replace function get_week_revenue () returns table (day date, total numeric) as $ $
select
    d :: date as day,
    coalesce(sum(o.total), 0) as total
from
    generate_series(
        current_date - interval '6 days',
        current_date,
        interval '1 day'
    ) d
    left join orders o on date(o.created_at) = d
    and o.status = 'completed'
group by
    d
order by
    d;

$ $ language sql;