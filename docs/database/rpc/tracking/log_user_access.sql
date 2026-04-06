CREATE
OR REPLACE FUNCTION log_user_access(device text) RETURNS void LANGUAGE plpgsql AS $ function $ begin if device not in ('mobile', 'desktop') then raise exception 'Invalid device: %',
device;

end if;

insert into
    analytics_daily_access (data, mobile_access, desktop_access)
values
    (
        current_date,
        case
            when device = 'mobile' then 1
            else 0
        end,
        case
            when device = 'desktop' then 1
            else 0
        end
    ) on conflict (data) do
update
set
    mobile_access = analytics_daily_access.mobile_access + case
        when device = 'mobile' then 1
        else 0
    end,
    desktop_access = analytics_daily_access.desktop_access + case
        when device = 'desktop' then 1
        else 0
    end;

end;

$ function $